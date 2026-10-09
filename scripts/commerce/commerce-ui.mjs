import { formatCurrency } from "../rules/currency.mjs";
import {
  COMMERCE_TIERS, COMMERCE_SPECIALTIES, COMMERCE_ITEM_TYPES,
  createCommerceOffer, normalizeCommerce, tierLevel
} from "../rules/commerce.mjs";
import { installCommerceRuntime, requestCommerceExchange } from "./commerce-runtime.mjs";

const esc = (value) => foundry.utils.escapeHTML(String(value ?? ""));
const modeText = (mode) => mode === "chest" ? "Cofre / botín gratis" : "Comerciante";
const tierOptions = (value) => COMMERCE_TIERS.map((row) =>
  '<option value="' + row.id + '"' + (row.id === value ? " selected" : "") + '>' + esc(row.label) + "</option>"
).join("");
const specialtyOptions = (value) => COMMERCE_SPECIALTIES.map((row) =>
  '<option value="' + row.id + '"' + (row.id === value ? " selected" : "") + '>' + esc(row.label) + "</option>"
).join("");
const minTierOptions = (value) => COMMERCE_TIERS.map((row) =>
  '<option value="' + row.level + '"' + (row.level === value ? " selected" : "") + '>' + esc(row.label) + "</option>"
).join("");

function offerEditorRows(config) {
  if (!config.offers.length) return '<p>No hay productos. Arrastrá un objeto del compendio o añadí su UUID.</p>';
  return config.offers.map((item) =>
    '<div class="tm-commerce-edit-row" data-offer="' + esc(item.id) + '">' +
    '<img src="' + esc(item.img) + '" alt="" />' +
    '<div class="tm-commerce-edit-name"><strong>' + esc(item.name) + '</strong><small>' + esc(item.type) + "</small></div>" +
    '<label>Existencias<input class="tm-c-stock" type="number" min="0" step="1" value="' + item.stock + '"></label>' +
    '<label>Precio en cobres<input class="tm-c-price" type="number" min="0" step="1" value="' + (item.priceCopper ?? "") + '" placeholder="Sin precio"></label>' +
    '<label>Precio por unidades<input class="tm-c-per" type="number" min="1" step="1" value="' + item.priceQuantity + '"></label>' +
    '<label>Nivel mínimo<select class="tm-c-min">' + minTierOptions(item.minTier) + "</select></label>" +
    '<label>Familia comercial<select class="tm-c-category">' + specialtyOptions(item.specialty) + "</select></label>" +
    '<button type="button" class="tm-c-remove" data-remove="' + esc(item.id) + '" title="Retirar oferta">×</button>' +
    "</div>"
  ).join("");
}

function readEditor(html, draft) {
  draft.mode = String(html.find("[name='commerce-mode']").val() ?? "disabled");
  draft.tier = String(html.find("[name='commerce-tier']").val() ?? "village");
  draft.specialty = String(html.find("[name='commerce-specialty']").val() ?? "general");
  html.find(".tm-commerce-edit-row").each((_, element) => {
    const row = html.find(element);
    const item = draft.offers.find((entry) => entry.id === element.dataset.offer);
    if (!item) return;
    const stock = row.find(".tm-c-stock").val();
    const price = row.find(".tm-c-price").val();
    item.stock = Number(stock);
    item.priceCopper = String(price ?? "").trim() === "" ? null : Number(price);
    item.priceQuantity = Number(row.find(".tm-c-per").val());
    item.minTier = Number(row.find(".tm-c-min").val());
    item.specialty = String(row.find(".tm-c-category").val());
  });
}

export function configureCommerce(actor) {
  if (!game.user?.isGM || actor?.type !== "npc") return;
  const draft = normalizeCommerce(actor.getFlag("tierra-magica", "commerce"));
  const content =
    '<section class="tm-commerce-editor">' +
    '<p>Seleccioná los objetos exactos del catálogo. Cofre: entrega gratis; comerciante: descuenta cobres.</p>' +
    '<div class="tm-commerce-settings">' +
    '<label>Función<select name="commerce-mode">' +
      '<option value="disabled"' + (draft.mode === "disabled" ? " selected" : "") + '>NPC sin comercio</option>' +
      '<option value="merchant"' + (draft.mode === "merchant" ? " selected" : "") + '>Comerciante</option>' +
      '<option value="chest"' + (draft.mode === "chest" ? " selected" : "") + '>Cofre / botín</option>' +
    '</select></label>' +
    '<label>Especialidad<select name="commerce-specialty">' + specialtyOptions(draft.specialty) + "</select></label>" +
    '<label>Nivel del mercado<select name="commerce-tier">' + tierOptions(draft.tier) + "</select></label>" +
    "</div>" +
    '<h3>Ofertas y contenido</h3>' +
    '<div class="tm-commerce-items">' + offerEditorRows(draft) + "</div>" +
    '<div class="tm-commerce-add">' +
    '<input type="text" name="commerce-uuid" placeholder="UUID de Item de Mundo o Compendio" />' +
    '<button type="button" data-commerce-add>Agregar</button>' +
    "</div>" +
    '<small>También podés arrastrar un Item del Compendio o del directorio de Objetos sobre esta ventana. La lista de objetos es siempre explícita; ningún mercado genera equipo raro automáticamente.</small>' +
    "</section>";

  const dialog = new Dialog({
    title: "Establecimiento · " + actor.name,
    content,
    buttons: {
      save: {
        label: "Guardar establecimiento",
        callback: async (html) => {
          readEditor(html, draft);
          const normalized = normalizeCommerce(draft);
          if (normalized.offers.length !== draft.offers.length ||
              draft.offers.some((row) =>
                !Number.isSafeInteger(row.stock) || row.stock < 0 ||
                row.priceCopper !== null && (!Number.isSafeInteger(row.priceCopper) || row.priceCopper < 0) ||
                !Number.isSafeInteger(row.priceQuantity) || row.priceQuantity < 1
              )) {
            return ui.notifications.warn("Revisá las cantidades y precios: deben ser enteros no negativos.");
          }
          await actor.setFlag("tierra-magica", "commerce", normalized);
          ui.notifications.info("Establecimiento actualizado: " + actor.name);
        }
      },
      cancel: { label: "Cancelar" }
    },
    default: "save",
    render: (html) => {
      const list = html.find(".tm-commerce-items");
      const refresh = () => list.html(offerEditorRows(draft));
      async function add(uuid) {
        readEditor(html, draft);
        const item = await fromUuid(String(uuid ?? "").trim());
        if (!item || item.documentName !== "Item" || !COMMERCE_ITEM_TYPES.includes(item.type)) {
          return ui.notifications.warn("Seleccioná un Item físico de Tierra Mágica con UUID válido.");
        }
        if (draft.offers.some((row) => row.uuid === item.uuid)) {
          return ui.notifications.warn("Ya se encuentra en la lista. Modificá las existencias.");
        }
        draft.offers.push(createCommerceOffer(item, draft.specialty));
        refresh();
        html.find("[name='commerce-uuid']").val("");
      }
      html.find("[data-commerce-add]").on("click", async () => {
        const uuid = html.find("[name='commerce-uuid']").val();
        try { await add(uuid); }
        catch (error) { ui.notifications.error(error.message); }
      });
      list.on("click", "[data-remove]", (event) => {
        readEditor(html, draft);
        draft.offers = draft.offers.filter((row) => row.id !== event.currentTarget.dataset.remove);
        refresh();
      });
      html.find(".tm-commerce-editor").on("dragover", (event) => {
        event.preventDefault();
      }).on("drop", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.originalEvent?.stopPropagation?.();
        try {
          const original = event.originalEvent ?? event;
          const data = TextEditor.getDragEventData(original);
          if (data?.type !== "Item") return;
          if (data.uuid) await add(data.uuid);
          else {
            const item = await Item.fromDropData(data);
            if (item) await add(item.uuid);
          }
        } catch (error) {
          ui.notifications.warn("No se pudo añadir el objeto: " + error.message);
        }
      });
    }
  }, { width: 1030, height: 780, resizable: true });
  dialog.render(true);
}

function buyerOptions() {
  return [...game.actors].filter((actor) =>
    actor.type === "character" && actor.system?.creation?.status === "complete" &&
    (game.user.isGM || actor.testUserPermission(game.user, "OWNER"))
  );
}

export function openCommerce(actor) {
  if (actor?.type !== "npc") return;
  const config = normalizeCommerce(actor.getFlag("tierra-magica", "commerce"));
  if (config.mode === "disabled") {
    if (game.user.isGM) configureCommerce(actor);
    return;
  }
  const buyers = buyerOptions();
  if (!buyers.length) return ui.notifications.warn("No tenés un personaje terminado y controlable para comerciar.");
  const name = esc(actor.name);
  const rows = config.offers.map((offer) => {
    const allowed = config.mode === "chest" ||
      (tierLevel(config.tier) >= offer.minTier && offer.specialty === config.specialty);
    const available = allowed && offer.stock > 0;
    const price = config.mode === "chest"
      ? "Gratis" : offer.priceCopper === null ? "Precio no definido"
      : formatCurrency(Math.ceil(offer.priceCopper / offer.priceQuantity)) + " por unidad aprox.";
    const eligible = available && (config.mode === "chest" || offer.priceCopper !== null);
    const reason = !allowed ? "No disponible en este nivel/especialidad"
      : offer.stock === 0 ? "Agotado" : "";
    return '<div class="tm-commerce-line">' +
      '<img src="' + esc(offer.img) + '" alt="" />' +
      '<div><strong>' + esc(offer.name) + '</strong><small>Stock: ' + offer.stock +
      (reason ? " · " + reason : "") + "</small></div>" +
      '<div class="tm-commerce-price">' + esc(price) + "</div>" +
      '<input type="number" data-count="' + esc(offer.id) + '" min="1" max="' + offer.stock +
      '" step="1" value="1"' + (eligible ? "" : " disabled") + " />" +
      '<button type="button" data-trade="' + esc(offer.id) + '"' +
      (eligible ? "" : " disabled") + ">" +
      (config.mode === "chest" ? "Tomar" : "Comprar") + "</button></div>";
  }).join("");
  const content = '<div class="tm-commerce-shop"><p>' +
    esc(modeText(config.mode)) + (config.mode === "merchant"
      ? " · " + esc(COMMERCE_TIERS.find((v) => v.id === config.tier)?.label ?? "") +
        " · " + esc(COMMERCE_SPECIALTIES.find((v) => v.id === config.specialty)?.label ?? "")
      : "") + "</p>" +
    '<label>Personaje que recibe <select name="commerce-buyer">' +
    buyers.map((buyer) => '<option value="' + esc(buyer.uuid) + '"' +
      (game.user.character?.id === buyer.id ? " selected" : "") + '>' + esc(buyer.name) + "</option>").join("") +
    "</select></label>" +
    '<div class="tm-commerce-lines">' + (rows || "<p>Sin existencias configuradas.</p>") + "</div></div>";
  const dialog = new Dialog({
    title: name + " · " + modeText(config.mode),
    content,
    buttons: {
      close: { label: "Cerrar" },
      ...(game.user.isGM ? { manage: {
        label: "Configurar",
        callback: () => configureCommerce(actor)
      } } : {})
    },
    default: "close",
    render: (html) => {
      html.find("[data-trade]").on("click", async (event) => {
        const button = html.find(event.currentTarget);
        const offerId = String(event.currentTarget.dataset.trade);
        const quantity = Number(html.find("[data-count='" + offerId + "']").val());
        const buyerUuid = String(html.find("[name='commerce-buyer']").val());
        html.find("[data-trade]").prop("disabled", true);
        try {
          const result = await requestCommerceExchange({ merchantUuid: actor.uuid, buyerUuid, offerId, quantity });
          if (!result.ok) {
            ui.notifications.warn(result.error ?? "No se completó la operación.");
            html.find("[data-trade]").prop("disabled", false);
          } else {
            ui.notifications.info((result.mode === "chest" ? "Retirado: " : "Comprado: ") +
              result.quantity + " × " + result.itemName +
              (result.cost ? " · " + formatCurrency(result.cost) : ""));
            dialog.close();
            openCommerce(actor);
          }
        } catch (error) {
          ui.notifications.error(error.message);
          button.prop("disabled", false);
        }
      });
    }
  }, { width: 820, height: 690, resizable: true });
  dialog.render(true);
}

export async function createStarterCommerceActors() {
  if (!game.user?.isGM) return ui.notifications.warn("Sólo el DJ puede crear establecimientos.");
  const presets = [
    ["Herrero de pueblo", "merchant", "smith", "village"],
    ["Mercader de caminos", "merchant", "general", "town"],
    ["Alquimista de ciudad", "merchant", "alchemy", "city"],
    ["Ingeniero de la Liga de Bronce", "merchant", "engineering", "city"],
    ["Mercader arcano metropolitano", "merchant", "arcane", "metropolis"],
    ["Cofre de botín", "chest", "general", "village"]
  ];
  const created = [];
  for (const [name, mode, specialty, tier] of presets) {
    const actor = await Actor.create({
      name, type: "npc", ownership: { default: 2 },
      prototypeToken: { actorLink: true }
    });
    await actor.setFlag("tierra-magica", "commerce", { mode, specialty, tier, offers: [] });
    created.push(actor);
  }
  ui.notifications.info("Creados " + created.length + " establecimientos sin stock. Abrí las fichas para configurar.");
  return created;
}

function attachNpcSheetButton(sheet, html) {
  if (sheet.actor?.type !== "npc") return;
  const header = html.find(".tm-sheet-header");
  if (!header.length || header.find(".tm-commerce-toolbar").length) return;
  const toolbar = jQuery('<div class="tm-commerce-toolbar"></div>');
  const open = jQuery('<button type="button">Abrir comercio / cofre</button>');
  open.on("click", () => openCommerce(sheet.actor));
  toolbar.append(open);
  if (game.user?.isGM) {
    const config = jQuery('<button type="button">Configurar establecimiento</button>');
    config.on("click", () => configureCommerce(sheet.actor));
    toolbar.append(config);
  }
  header.append(toolbar);
}

function wrapTokenInteraction() {
  const prototype = CONFIG.Token?.objectClass?.prototype ?? globalThis.Token?.prototype;
  const original = prototype?._onClickLeft2;
  if (typeof original !== "function" || original._tmCommerceWrapped) return;
  const wrapped = function (event) {
    const config = this.actor?.type === "npc"
      ? normalizeCommerce(this.actor.getFlag("tierra-magica", "commerce")) : null;
    if (config && config.mode !== "disabled" &&
        !(game.user?.isGM && (event?.shiftKey || event?.nativeEvent?.shiftKey))) {
      openCommerce(this.actor);
      return;
    }
    return original.call(this, event);
  };
  wrapped._tmCommerceWrapped = true;
  prototype._onClickLeft2 = wrapped;
}

export function installCommerceInterface() {
  Hooks.on("renderActorSheet", attachNpcSheetButton);
  Hooks.once("ready", () => {
    installCommerceRuntime();
    wrapTokenInteraction();
    game.tierraMagica = {
      ...(game.tierraMagica ?? {}),
      commerce: {
        open: openCommerce,
        configure: configureCommerce,
        createStarterActors: createStarterCommerceActors,
        transact: requestCommerceExchange
      }
    };
  });
}
