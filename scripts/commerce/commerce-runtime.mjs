import { primaryActiveGm } from "../rules/damage-delivery.mjs";
import { COMMERCE_ITEM_TYPES, normalizeCommerce, quoteCommerce } from "../rules/commerce.mjs";

const CHANNEL = "system.tierra-magica";
const SCOPE = "npc-commerce";
const RECEIPTS_KEY = "commerceReceipts";
const pending = new Map();
let installed = false;
let queue = Promise.resolve();

const failure = (error) => ({ ok: false, error: String(error ?? "Transacción rechazada.") });
const currentGm = () => primaryActiveGm(game.users ?? []);
const uid = () => globalThis.foundry?.utils?.randomID?.() ??
  ("transaction-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2));

function exclusive(operation) {
  const run = queue.catch(() => undefined).then(operation);
  queue = run.catch(() => undefined);
  return run;
}

function snapshotReceipts(actor) {
  const rows = actor.getFlag?.("tierra-magica", RECEIPTS_KEY);
  return rows && typeof rows === "object" ? { ...rows } : {};
}

async function storeReceipt(actor, key, receipt) {
  const now = Date.now();
  const rows = { ...snapshotReceipts(actor), [key]: { ...receipt, at: now } };
  const latest = Object.entries(rows)
    .sort((a, b) => Number(b[1]?.at ?? 0) - Number(a[1]?.at ?? 0))
    .slice(0, 128);
  await actor.setFlag("tierra-magica", RECEIPTS_KEY, Object.fromEntries(latest));
}

function authenticatedOwner(actor, user) {
  return Boolean(user?.isGM || actor?.testUserPermission?.(user, "OWNER"));
}

async function doExchange(data) {
  const requestId = String(data?.requestId ?? "");
  const requesterId = String(data?.requesterId ?? "");
  const merchantUuid = String(data?.merchantUuid ?? "");
  const buyerUuid = String(data?.buyerUuid ?? "");
  const offerId = String(data?.offerId ?? "");
  const quantity = Number(data?.quantity);
  if (!requestId || requestId.length > 100 || !requesterId || !merchantUuid ||
      !buyerUuid || !offerId || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 1000) {
    return failure("Solicitud comercial inválida.");
  }

  const requester = game.users.get(requesterId);
  if (!requester?.active) return failure("Usuario solicitante desconectado.");
  const merchant = await fromUuid(merchantUuid);
  const buyer = await fromUuid(buyerUuid);
  if (!merchant || merchant.type !== "npc" || !buyer || buyer.type !== "character") {
    return failure("El comerciante o el personaje ya no existen.");
  }
  if (!authenticatedOwner(buyer, requester)) return failure("El jugador no controla este personaje.");
  if (buyer.system?.creation?.status !== "complete") {
    return failure("Los intercambios sólo están disponibles tras completar la creación del personaje.");
  }
  const key = requesterId + ":" + requestId;
  const fingerprint = JSON.stringify([requesterId, merchantUuid, buyerUuid, offerId, quantity]);
  const prior = snapshotReceipts(merchant)[key];
  if (prior) {
    if (prior.fingerprint !== fingerprint) return failure("El identificador de la transacción ya fue utilizado.");
    if (prior.state === "pending") return failure("Operación pendiente de revisión del DJ: no se repite automáticamente.");
    return prior.result ?? failure("Recibo incompleto.");
  }

  const config = normalizeCommerce(merchant.getFlag("tierra-magica", "commerce"));
  const index = config.offers.findIndex((row) => row.id === offerId);
  if (index < 0) return failure("Esta oferta ya no existe.");
  const offer = config.offers[index];
  if (!COMMERCE_ITEM_TYPES.includes(offer.type)) return failure("Objeto no comercializable.");
  const source = await fromUuid(offer.uuid);
  if (!source || source.documentName !== "Item") return failure("El objeto del catálogo ya no existe.");
  const quote = quoteCommerce(config, offer, source, quantity);
  if (!quote.ok) return quote;
  if (quantity > 1 && source.system?.stacking === "unique") {
    return failure("Este objeto es único por entrada; adquirilo de a una unidad.");
  }

  const previousMoney = Number(buyer.system?.currency?.totalCopper);
  if (!Number.isSafeInteger(previousMoney) || previousMoney < quote.cost) {
    return failure("El personaje no tiene fondos suficientes.");
  }

  // Registrar la solicitud antes de la primera mutación: ante caída no duplicar botín ni monedas.
  await storeReceipt(merchant, key, { state: "pending", fingerprint });
  let debited = false;
  let createdItem = null;
  try {
    if (quote.cost > 0) {
      await buyer.update({ "system.currency.totalCopper": previousMoney - quote.cost }, { tmCommerce: true });
      debited = true;
    }
    const itemData = source.toObject();
    delete itemData._id;
    delete itemData.folder;
    delete itemData.ownership;
    itemData.system ??= {};
    // El template "physical" de Foundry fusiona estos campos en system, no en system.physical.
    itemData.system.quantity = quantity;
    itemData.system.equipped = false;
    itemData.system.acquisition = {
      mode: config.mode === "chest" ? "granted" : "purchased",
      stage: "progression",
      sources: [{ kind: "commerce", uuid: merchant.uuid, itemUuid: source.uuid }],
      paid: { resource: quote.cost ? "currency" : "none", amount: quote.cost, known: true }
    };
    itemData.system.provenance ??= {};
    itemData.system.provenance.sourceUuid = source.uuid;
    const created = await buyer.createEmbeddedDocuments("Item", [itemData], { tmValidated: true, tmCommerce: true });
    if (!created?.length) throw new Error("No se entregó el objeto al inventario.");
    createdItem = created[0];

    const updated = normalizeCommerce(merchant.getFlag("tierra-magica", "commerce"));
    const liveOffer = updated.offers.find((row) => row.id === offerId);
    // Una edición del DJ no puede aumentar el stock entre validación y decremento.
    if (!liveOffer || liveOffer.uuid !== offer.uuid || liveOffer.stock < quantity) {
      throw new Error("El inventario del establecimiento cambió durante la operación.");
    }
    liveOffer.stock -= quantity;
    await merchant.setFlag("tierra-magica", "commerce", updated);
  } catch (error) {
    const rollbackErrors = [];
    if (createdItem) {
      try { await createdItem.delete({ tmValidated: true, tmCommerce: true }); }
      catch (rollbackError) { rollbackErrors.push("objeto: " + rollbackError.message); }
    }
    if (debited) {
      try {
        const current = Number(buyer.system?.currency?.totalCopper);
        if (!Number.isSafeInteger(current) || current < 0 || !Number.isSafeInteger(current + quote.cost)) {
          throw new Error("total no recuperable");
        }
        await buyer.update({ "system.currency.totalCopper": current + quote.cost }, { tmCommerce: true });
      } catch (rollbackError) { rollbackErrors.push("monedas: " + rollbackError.message); }
    }
    const result = failure("Compra/retirada cancelada: " + String(error?.message ?? error) +
      (rollbackErrors.length ? ". Recuperación manual requerida: " + rollbackErrors.join(", ") : ""));
    await storeReceipt(merchant, key, { state: "completed", fingerprint, result });
    return result;
  }

  const result = { ok: true, itemName: offer.name, quantity, cost: quote.cost, mode: config.mode };
  // Si falla escribir el recibo final, permanece el recibo pending: jamás reentregar automáticamente.
  try { await storeReceipt(merchant, key, { state: "completed", fingerprint, result }); }
  catch (error) {
    console.error("Foundry T.M. | No se pudo cerrar el recibo de comercio", error);
    return failure("Objeto entregado y existencias actualizadas, pero el recibo quedó pendiente. Avisá al DJ.");
  }
  return result;
}

export async function executeCommerceExchange(data) {
  if (!game.user?.isGM || currentGm()?.id !== game.user.id) {
    return failure("Se requiere el DJ activo principal.");
  }
  try { return await exclusive(() => doExchange(data)); }
  catch (error) {
    console.error("Foundry T.M. | Transacción de comercio", error);
    return failure(error?.message ?? error);
  }
}

export async function requestCommerceExchange({ merchantUuid, buyerUuid, offerId, quantity = 1 }) {
  const gm = currentGm();
  if (!gm) return failure("Se necesita un DJ conectado para retirar o comprar objetos.");
  const request = {
    requestId: uid(), requesterId: game.user.id, merchantUuid, buyerUuid, offerId, quantity
  };
  if (gm.id === game.user.id) return executeCommerceExchange(request);
  if (!game.socket?.emit) return failure("Sin conexión para una transacción compartida.");
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      pending.delete(request.requestId);
      resolve(failure("No respondió el DJ. Revisá el inventario antes de volver a intentar."));
    }, 12000);
    pending.set(request.requestId, (result) => {
      clearTimeout(timer);
      pending.delete(request.requestId);
      resolve(result);
    });
    game.socket.emit(CHANNEL, { scope: SCOPE, kind: "request", ...request });
  });
}

export function installCommerceRuntime() {
  if (installed || !game.socket?.on) return;
  // Ningún usuario jugador puede reconfigurar las ofertas ni los recibos de un NPC,
  // incluso si el DJ le dio propiedad sobre el Actor.
  Hooks.on("preUpdateActor", (actor, changes) => {
    if (game.user?.isGM || actor?.type !== "npc") return;
    const keys = Object.keys(changes ?? {});
    if (keys.some((key) => key === "flags.tierra-magica.commerce" ||
      key.startsWith("flags.tierra-magica.commerce.") ||
      key === "flags.tierra-magica.commerceReceipts" ||
      key.startsWith("flags.tierra-magica.commerceReceipts.")) ||
      foundry.utils.hasProperty(changes, "flags.tierra-magica.commerce") ||
      foundry.utils.hasProperty(changes, "flags.tierra-magica.commerceReceipts")) {
      ui.notifications.warn("Sólo el DJ modifica el stock y los recibos de un establecimiento.");
      return false;
    }
  });
  installed = true;
  game.socket.on(CHANNEL, async (message) => {
    if (message?.scope !== SCOPE) return;
    if (message.kind === "response") {
      if (message.requesterId === game.user?.id) {
        pending.get(message.requestId)?.(message.result ?? failure("Respuesta comercial inválida."));
      }
      return;
    }
    if (message.kind !== "request" || currentGm()?.id !== game.user?.id) return;
    const result = await executeCommerceExchange(message);
    game.socket.emit(CHANNEL, {
      scope: SCOPE, kind: "response",
      requestId: message.requestId, requesterId: message.requesterId, result
    });
  });
}
