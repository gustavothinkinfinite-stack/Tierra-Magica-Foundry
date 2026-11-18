import { formatCurrency } from "../rules/currency.mjs";
import {
  COMMERCE_TIERS, COMMERCE_SPECIALTIES, COMMERCE_ITEM_TYPES,
  createCommerceOffer, normalizeCommerce, tierLevel
} from "../rules/commerce.mjs";
import { commerceReceiptLedgerStats, commercePendingReceiptReport, createCommercePendingDossier, recordCommercePendingReview, commercePendingReviewHistory, createCommercePendingReviewBackup, inspectCommercePendingReviewBackup, previewCommercePendingReviewReconciliation, recoverCommercePendingReviews, createCommerceReceiptBackup, inspectCommerceReceiptBackup, previewCommerceReceiptReconciliation, recoverCommerceReceiptMarkers, installCommerceRuntime, requestCommerceExchange } from "./commerce-runtime.mjs";

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
    '<div class="tm-commerce-edit-name"><strong>' + esc(item.name) + '</strong><small>' + esc(item.type) + (item.availabilityStatus === "unspecified" ? " · Disponibilidad sin clasificar (mínimo comercial provisional)" : " · Disponibilidad: " + esc(item.availabilityStatus)) + "</small></div>" +
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

// Flujo comprobable fuera del DOM: ninguna ruta llama a la recuperación
// sin revisión previa, ausencia de conflictos y confirmación real del DJ.
export async function runCommerceReceiptRecoveryFlow(actor, file, { confirm } = {}) {
  if (!game.user?.isGM) return { ok: false, error: "Sólo el DJ puede examinar respaldos." };
  if (!file || typeof file.text !== "function") {
    return { ok: false, error: "Seleccioná un archivo JSON de respaldo." };
  }
  if (!Number.isSafeInteger(file.size) || file.size < 0 || file.size > 2_000_000) {
    return { ok: false, error: "El archivo supera el límite de 2 MB o tiene tamaño inválido." };
  }
  const json = await file.text();
  if (typeof json !== "string" || json.length > 2_000_000) {
    return { ok: false, error: "El respaldo supera el tamaño admitido." };
  }
  const preview = previewCommerceReceiptReconciliation(actor, json);
  if (!preview.ok) return preview;
  if (preview.conflicts) return { ok: false, blocked: true, preview };
  if (!preview.missing) return { ok: true, recovered: 0, preview };
  if (typeof confirm !== "function") {
    return { ok: false, error: "Se requiere confirmación explícita del DJ." };
  }
  const approved = await confirm(preview);
  if (approved !== true) return { ok: false, cancelled: true, preview };
  const result = await recoverCommerceReceiptMarkers(actor, json, { confirm: true });
  return { ...result, preview };
}

export function configureCommerce(actor) {
  if (!game.user?.isGM || actor?.type !== "npc") return;
  const draft = normalizeCommerce(actor.getFlag("tierra-magica", "commerce"));
  const ledger = commerceReceiptLedgerStats(actor);
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
    '<p>Historial de operaciones: ' + ledger.recent + ' recientes, ' + ledger.pending +
      ' pendientes y ' + ledger.archived + ' archivadas (' + ledger.serializedCharacters +
      ' de ' + ledger.limitCharacters + ' caracteres de capacidad preventiva). ' +
      (ledger.serializedCharacters >= ledger.limitCharacters - 4096
        ? 'ATENCIÓN: el historial está próximo al límite y puede impedir nuevas compras. '
        : '') +
      'Las archivadas y pendientes se conservan para impedir duplicados; no eliminarlas manualmente.</p>' +
    '<button type="button" data-commerce-pending>Examinar operaciones pendientes</button>' +
    '<label>Identificador pendiente <input type="text" data-commerce-case-key placeholder="usuario:identificador" /></label>' +
    '<button type="button" data-commerce-case>Exportar expediente de conciliación (JSON)</button>' +
    '<button type="button" data-commerce-review>Registrar revisión sin cerrar el recibo</button>' +
    '<button type="button" data-commerce-review-backup>Exportar respaldo de revisiones (JSON)</button>' +
    '<label>Examinar respaldo de revisiones <input type="file" accept=".json,application/json" data-commerce-review-restore-file /></label>' +
    '<button type="button" data-commerce-review-restore>Comparar y recuperar revisiones faltantes</button>' +
    '<button type="button" data-commerce-backup>Exportar copia de recibos (JSON)</button>' +
    '<label>Examinar respaldo de recibos <input type="file" accept=".json,application/json" data-commerce-restore-file /></label>' +
    '<button type="button" data-commerce-restore>Comparar respaldo y recuperar marcadores faltantes</button>' +
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
      presets: {
        label: "Importar 5 comerciantes + cofre",
        callback: async () => {
          const confirmed = await Dialog.confirm({
            title: "Crear establecimientos de ejemplo",
            content: "<p>Se importarán desde el Compendio hasta seis NPC preconfigurados, sin stock, conservando los que ya existan. ¿Continuar?</p>"
          });
          if (confirmed) await createStarterCommerceActors();
        }
      },
      cancel: { label: "Cancelar" }
    },
    default: "save",
    render: (html) => {
      html.find("[data-commerce-pending]").on("click", async () => {
        try {
          if (!game.user?.isGM) throw new Error("Sólo el DJ puede consultar operaciones pendientes.");
          const report = commercePendingReceiptReport(actor);
          const rows = report.rows.map((entry) => {
            const timestamp = entry.at === null ? "Fecha no registrada"
              : new Date(entry.at).toLocaleString("es-AR");
            const details = entry.requesterId === null
              ? "Huella no interpretable: revisar el respaldo original"
              : "Jugador: " + esc(entry.requesterId) +
                " · Personaje: " + esc(entry.buyerUuid) +
                " · Oferta: " + esc(entry.offerId) +
                " · Cantidad: " + entry.quantity;
            return "<li><strong>" + esc(entry.key) + "</strong> — " +
              esc(timestamp) + "<div>" + details + "</div></li>";
          }).join("");
          await Dialog.prompt({
            title: "Operaciones pendientes · " + actor.name,
            content: "<p>Recibos pendientes: " + report.total +
              " (mostrando " + report.shown + "). No volver a ejecutar la compra " +
              "ni borrar el recibo sin conciliar dinero, objeto y stock.</p>" +
              (report.total ? "<ol>" + rows + "</ol>" : "<p>No hay operaciones pendientes.</p>") +
              "<p>Consulta de sólo lectura: no resuelve ninguna operación.</p>",
            callback: () => undefined
          });
        } catch (error) { ui.notifications.error(error.message); }
      });
      html.find("[data-commerce-review]").on("click", async () => {
        try {
          if (!game.user?.isGM) throw new Error("Sólo el DJ puede registrar revisiones.");
          const key = String(html.find("[data-commerce-case-key]").val() ?? "").trim();
          const dossier = await createCommercePendingDossier(actor, key);
          if (!dossier.ok) throw new Error(dossier.error);
          const previous = commercePendingReviewHistory(actor, key).length;
          await Dialog.prompt({
            title: "Registrar revisión pendiente",
            content: "<p>Operación: <strong>" + esc(key) + "</strong>. Revisiones previas: " +
              previous + ". El recibo seguirá bloqueado como pendiente.</p>" +
              '<label>Observaciones del DJ (obligatorias, máximo 2000 caracteres)' +
              '<textarea name="tm-review-note" maxlength="2000" rows="4"></textarea></label>' +
              '<p>Marcar únicamente evidencias efectivamente examinadas:</p>' +
              '<label><input type="checkbox" name="tm-review-check" value="money">Monedas</label>' +
              '<label><input type="checkbox" name="tm-review-check" value="items">Objetos</label>' +
              '<label><input type="checkbox" name="tm-review-check" value="stock">Existencias</label>' +
              '<label><input type="checkbox" name="tm-review-check" value="backup">Respaldo</label>',
            callback: async (form) => {
              const note = String(form.find('[name="tm-review-note"]').val() ?? "");
              const checks = form.find('[name="tm-review-check"]:checked')
                .map((_, node) => node.value).get();
              const result = await recordCommercePendingReview(actor, key, { note, checks });
              if (!result.ok) {
                ui.notifications.error(result.error);
                return;
              }
              ui.notifications.info("Revisión registrada; recibo pendiente sin cambios.");
            }
          });
        } catch (error) { ui.notifications.error(error.message); }
      });
      html.find("[data-commerce-case]").on("click", async () => {
        try {
          if (!game.user?.isGM) throw new Error("Sólo el DJ puede exportar expedientes.");
          const key = String(html.find("[data-commerce-case-key]").val() ?? "").trim();
          const result = await createCommercePendingDossier(actor, key);
          if (!result.ok) throw new Error(result.error);
          if (typeof globalThis.saveDataToFile !== "function") {
            throw new Error("La función de descarga de Foundry no está disponible.");
          }
          const safeName = String(actor.id ?? "npc").replace(/[^a-zA-Z0-9_-]/g, "-");
          globalThis.saveDataToFile(JSON.stringify(result.dossier, null, 2),
            "application/json", "tierra-magica-conciliacion-" + safeName + ".json");
          ui.notifications.info("Expediente de conciliación preparado. El recibo continúa pendiente.");
        } catch (error) { ui.notifications.error(error.message); }
      });
      html.find("[data-commerce-review-restore]").on("click", async () => {
        try {
          if (!game.user?.isGM) throw new Error("Sólo el DJ puede recuperar revisiones.");
          const file = html.find("[data-commerce-review-restore-file]")[0]?.files?.[0];
          if (!file || !Number.isSafeInteger(file.size) || file.size > 1_000_000) {
            throw new Error("Seleccioná un respaldo JSON de revisiones de hasta 1 MB.");
          }
          const json = await file.text();
          const preview = previewCommercePendingReviewReconciliation(actor, json);
          if (!preview.ok) throw new Error(preview.error);
          if (preview.conflicts) {
            ui.notifications.warn("Recuperación bloqueada: " + preview.conflicts +
              " operaciones tienen conflictos.");
            return;
          }
          if (!preview.missing) {
            ui.notifications.info("No hay revisiones faltantes que recuperar.");
            return;
          }
          const approved = await Dialog.confirm({
            title: "Confirmar recuperación de revisiones",
            content: "<p>Se agregarán " + preview.missing + " revisiones a " +
              preview.missingOperations + " operaciones pendientes del Actor " +
              esc(actor.name) + ".</p>" +
              "<p><strong>Confirmá el origen del archivo.</strong> La suma de control " +
              "no demuestra autenticidad. Los recibos seguirán pendientes y " +
              "no se modificarán monedas, objetos ni existencias.</p>"
          });
          if (!approved) return;
          const result = await recoverCommercePendingReviews(actor, json, { confirm: true });
          if (!result.ok) throw new Error(result.error);
          ui.notifications.info("Revisiones recuperadas: " + result.recovered +
            ". Los recibos siguen pendientes.");
        } catch (error) { ui.notifications.error(error.message); }
      });
      html.find("[data-commerce-review-backup]").on("click", () => {
        try {
          if (!game.user?.isGM) throw new Error("Sólo el DJ puede exportar revisiones.");
          const backup = createCommercePendingReviewBackup(actor);
          const verification = inspectCommercePendingReviewBackup(backup, actor);
          if (!verification.ok) throw new Error(verification.error);
          if (typeof globalThis.saveDataToFile !== "function") {
            throw new Error("La descarga de Foundry no está disponible.");
          }
          const safeName = String(actor.id ?? "npc").replace(/[^a-zA-Z0-9_-]/g, "-");
          globalThis.saveDataToFile(backup, "application/json",
            "tierra-magica-revisiones-" + safeName + ".json");
          ui.notifications.info("Respaldo de revisiones verificado. La bitácora no se modificó.");
        } catch (error) { ui.notifications.error(error.message); }
      });
      html.find("[data-commerce-backup]").on("click", () => {
        try {
          if (!game.user?.isGM) throw new Error("Sólo el DJ puede exportar este historial.");
          const backup = createCommerceReceiptBackup(actor);
          const check = inspectCommerceReceiptBackup(backup);
          if (!check.ok || check.actorUuid !== actor.uuid) {
            throw new Error(check.error ?? "No se pudo verificar el respaldo.");
          }
          if (typeof globalThis.saveDataToFile !== "function") {
            throw new Error("La función de descarga de Foundry no está disponible.");
          }
          const safeName = String(actor.id ?? "npc").replace(/[^a-zA-Z0-9_-]/g, "-");
          globalThis.saveDataToFile(backup, "application/json",
            "tierra-magica-recibos-" + safeName + ".json");
          ui.notifications.info("Copia de recibos preparada. Conservá el archivo en un lugar seguro; el Actor no se modificó.");
        } catch (error) { ui.notifications.error(error.message); }
      });
      html.find("[data-commerce-restore]").on("click", async () => {
        try {
          const file = html.find("[data-commerce-restore-file]")[0]?.files?.[0];
          const result = await runCommerceReceiptRecoveryFlow(actor, file, {
            confirm: async (preview) => {
              const summary = "<p>Actor: " + esc(actor.name) + "</p>" +
                "<p>Coincidentes: " + preview.matching +
                " · Faltantes: " + preview.missing +
                " · Conflictos: " + preview.conflicts +
                " · Sólo en Actor: " + preview.onlyCurrent + "</p>" +
                "<p>Se recuperan sólo identificadores ausentes, sin devolver monedas ni objetos.</p>";
              return Dialog.confirm({
                title: "Confirmar recuperación de identificadores",
                content: summary +
                  "<p><strong>Verificá el origen del archivo.</strong> La suma de control no acredita quién lo creó. " +
                  "Los recibos pendientes seguirán pendientes de revisión manual.</p>"
              });
            }
          });
          if (result.blocked) {
            ui.notifications.warn("Conciliación bloqueada: " + result.preview.conflicts +
              " conflictos. No se modificaron recibos.");
            return;
          }
          if (result.cancelled) return;
          if (!result.ok) throw new Error(result.error ?? "La recuperación fue rechazada.");
          ui.notifications.info(result.recovered
            ? "Identificadores recuperados: " + result.recovered + ". No se ejecutaron compras ni entregas."
            : "No hay marcadores faltantes para recuperar.");
        } catch (error) { ui.notifications.error(error.message); }
      });
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
          const data = foundry.applications.ux.TextEditor.implementation.getDragEventData(original);
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
    const restricted = config.mode === "merchant" && offer.availabilityStatus === "restricted";
    const available = allowed && !restricted && offer.stock > 0;
    const price = config.mode === "chest"
      ? "Gratis" : offer.priceCopper === null ? "Precio no definido"
      : formatCurrency(offer.priceCopper) + " / " + offer.priceQuantity + " ud.";
    const eligible = available && (config.mode === "chest" || offer.priceCopper !== null);
    const reason = restricted ? "Restringido: venta automática no autorizada"
      : !allowed ? "No disponible en este nivel/especialidad"
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
  if (!game.user?.isGM) return ui.notifications.warn("Sólo el DJ puede importar establecimientos.");
  const pack = game.packs.get("tierra-magica.commerce");
  if (!pack) return ui.notifications.warn("Falta el compendio Tierra Mágica — Comerciantes y Cofres. Actualizá el sistema de prueba.");
  const index = await pack.getIndex();
  let created = 0;
  for (const row of index) {
    const template = await pack.getDocument(row._id);
    if (!template || template.type !== "npc") continue;
    const templateId = template.getFlag("tierra-magica", "commercePresetId");
    if (!templateId) continue;
    if ([...game.actors].some((entry) =>
      entry.getFlag("tierra-magica", "commercePresetId") === templateId)) continue;
    const source = template.toObject();
    delete source._id;
    source.prototypeToken ??= {};
    source.prototypeToken.actorLink = true;
    source.prototypeToken.disposition = 0;
    source.ownership = { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER };
    await Actor.create(source);
    created += 1;
  }
  ui.notifications.info("Comerciantes y cofres importados: " + created +
    ". Los ya presentes se conservaron sin duplicarse.");
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
