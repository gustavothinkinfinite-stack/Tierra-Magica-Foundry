import { primaryActiveGm } from "../rules/damage-delivery.mjs";
import { COMMERCE_ITEM_TYPES, normalizeCommerce, quoteCommerce } from "../rules/commerce.mjs";

const CHANNEL = "system.tierra-magica";
const SCOPE = "npc-commerce";
const RECEIPTS_KEY = "commerceReceipts";
// Límite operativo preventivo de caracteres serializados en el flag del Actor.
// Nunca se purgan identificadores para hacer espacio: se detiene el comercio.
export const COMMERCE_RECEIPT_LEDGER_LIMIT = 1_000_000;
const COMMERCE_RECEIPT_RESERVE = 4096;
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

// Diagnóstico de sólo lectura: los marcadores de protección no se podan
// sin un archivo externo confiable. El DJ puede vigilar su crecimiento.
export function commerceReceiptLedgerStats(actor) {
  const rows = snapshotReceipts(actor);
  const values = Object.values(rows);
  return {
    pending: values.filter((row) => row?.state === "pending").length,
    recent: values.filter((row) => row?.state === "completed").length,
    archived: values.filter((row) => row?.state === "archived").length,
    total: values.length,
    serializedCharacters: JSON.stringify(rows).length,
    limitCharacters: COMMERCE_RECEIPT_LEDGER_LIMIT
  };
}

// Informe de solo lectura para que el DJ identifique solicitudes pendientes.
// La huella contiene únicamente referencias de la solicitud, no demuestra
// qué mutaciones llegaron a persistirse ni autoriza un cierre automático.
export function commercePendingReceiptReport(actor, { limit = 25 } = {}) {
  const size = Number.isSafeInteger(limit) ? Math.max(0, Math.min(limit, 100)) : 25;
  const receipts = snapshotReceipts(actor);
  const timestamp = (row) =>
    Number.isFinite(row?.at) && row.at >= 0 ? row.at : 0;
  const entries = Object.entries(receipts)
    .filter(([, receipt]) => receipt?.state === "pending")
    .sort((a, b) => timestamp(a[1]) - timestamp(b[1]) ||
      a[0].localeCompare(b[0]));
  const rows = entries.slice(0, size).map(([key, receipt]) => {
    let decoded;
    try {
      const parsed = JSON.parse(receipt.fingerprint);
      if (Array.isArray(parsed) && parsed.length === 5 &&
          parsed.slice(0, 4).every((value) => typeof value === "string") &&
          Number.isSafeInteger(parsed[4]) && parsed[4] > 0) {
        decoded = parsed;
      }
    } catch { /* los registros heredados pueden carecer de huella decodificable */ }
    return {
      key,
      at: Number.isFinite(receipt.at) && receipt.at >= 0 ? receipt.at : null,
      requesterId: decoded?.[0] ?? null,
      merchantUuid: decoded?.[1] ?? null,
      buyerUuid: decoded?.[2] ?? null,
      offerId: decoded?.[3] ?? null,
      quantity: decoded?.[4] ?? null
    };
  });
  return { total: entries.length, shown: rows.length, rows };
}

// Expediente informativo: fotografía del estado ACTUAL, no reconstrucción de
// cómo quedó la operación. No cierra el recibo ni decide reparaciones.
export async function createCommercePendingDossier(actor, key) {
  if (!actor?.uuid || !key || typeof key !== "string") {
    return { ok: false, error: "Actor o identificador de operación inválido." };
  }
  const receipt = snapshotReceipts(actor)[key];
  if (receipt?.state !== "pending") {
    return { ok: false, error: "El recibo no existe o no está pendiente." };
  }
  // El expediente consulta directamente la operación solicitada, sin truncado.
  let request = null;
  try {
    const parts = JSON.parse(receipt.fingerprint);
    if (Array.isArray(parts) && parts.length === 5 &&
        parts.slice(0, 4).every((v) => typeof v === "string") &&
        Number.isSafeInteger(parts[4]) && parts[4] > 0) {
      request = { requesterId: parts[0], merchantUuid: parts[1],
        buyerUuid: parts[2], offerId: parts[3], quantity: parts[4] };
    }
  } catch { /* Las huellas heredadas pueden ser ilegibles. */ }
  const config = actor.getFlag?.("tierra-magica", "commerce");
  const offer = request && Array.isArray(config?.offers)
    ? config.offers.find((entry) => entry.id === request.offerId) : null;
  let buyer = null;
  try {
    if (request?.buyerUuid && typeof globalThis.fromUuid === "function") {
      buyer = await globalThis.fromUuid(request.buyerUuid);
    }
  } catch { /* No afirmar que el personaje no existe si falló la consulta. */ }
  const inventory = buyer?.items?.contents ?? buyer?.items;
  const candidates = inventory && typeof inventory[Symbol.iterator] === "function"
    ? [...inventory].filter((item) =>
        item?.system?.acquisition?.sources?.some?.((source) =>
          source?.kind === "commerce" && source.uuid === actor.uuid &&
          (!offer?.uuid || source.itemUuid === offer.uuid)))
        .slice(0, 100).map((item) => ({ id: item.id ?? null,
          name: item.name ?? null, quantity: item.system?.quantity ?? null }))
    : null;
  const money = buyer?.system?.currency?.totalCopper;
  const dossier = {
    format: "tierra-magica-commerce-pending-dossier", version: 1,
    actorUuid: actor.uuid, key, state: "pending",
    recordedAt: Number.isFinite(receipt.at) ? receipt.at : null,
    request,
    snapshot: {
      buyerFound: Boolean(buyer && buyer.type === "character"),
      currentCopper: Number.isSafeInteger(money) ? money : null,
      offerFound: Boolean(offer),
      currentStock: Number.isSafeInteger(offer?.stock) ? offer.stock : null,
      candidateItems: candidates
    },
    checklist: [
      "Verificar el historial monetario antes y después del intento",
      "Inspeccionar inventario y procedencia, comparando con otros intercambios",
      "Contrastar existencias y registros anteriores del comerciante",
      "Conservar respaldo de los recibos y documentar la decisión del DJ"
    ],
    warning: "Los valores son una fotografía actual, no prueba de cobro, entrega ni estado final. No se altera el recibo."
  };
  return { ok: true, dossier };
}

// Copia portátil, de sólo lectura. La suma de control detecta corrupción
// accidental; no es firma digital ni autoriza purgar el Actor.
function receiptBackupChecksum(serialized) {
  let hash = 2166136261;
  for (let index = 0; index < serialized.length; index += 1) {
    hash = Math.imul(hash ^ serialized.charCodeAt(index), 16777619) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

export function createCommerceReceiptBackup(actor) {
  if (!actor?.uuid || typeof actor.getFlag !== "function") {
    throw new Error("Se requiere un Actor persistente para respaldar recibos.");
  }
  const receipts = structuredClone(snapshotReceipts(actor));
  const payload = { format: "tierra-magica-commerce-receipts",
    version: 1, actorUuid: actor.uuid, receipts };
  const serialized = JSON.stringify(payload);
  return JSON.stringify({ ...payload, checksum: receiptBackupChecksum(serialized) }, null, 2);
}

export function inspectCommerceReceiptBackup(json) {
  let backup;
  try { backup = JSON.parse(json); }
  catch { return { ok: false, error: "El respaldo no contiene JSON válido." }; }
  if (!backup || backup.format !== "tierra-magica-commerce-receipts" ||
      backup.version !== 1 || typeof backup.actorUuid !== "string" ||
      !backup.actorUuid || !backup.receipts || Array.isArray(backup.receipts) ||
      typeof backup.receipts !== "object" || typeof backup.checksum !== "string") {
    return { ok: false, error: "Formato de respaldo de comercio no válido." };
  }
  const { checksum, ...payload } = backup;
  if (receiptBackupChecksum(JSON.stringify(payload)) !== checksum) {
    return { ok: false, error: "La suma de control del respaldo no coincide." };
  }
  const valid = Object.entries(payload.receipts).every(([key, receipt]) =>
    key && receipt && typeof receipt === "object" &&
    ["pending", "completed", "archived"].includes(receipt.state) &&
    typeof receipt.fingerprint === "string");
  if (!valid) return { ok: false, error: "El respaldo contiene recibos inválidos." };
  return { ok: true, actorUuid: payload.actorUuid,
    entries: Object.keys(payload.receipts).length, checksum };
}

// Previsualización de conciliación, estrictamente de sólo lectura. No habilita
// importación, sobreescritura ni eliminación de recibos del Actor.
export function previewCommerceReceiptReconciliation(actor, json) {
  if (!actor?.uuid || typeof actor.getFlag !== "function") {
    return { ok: false, error: "Se requiere un Actor persistente para comparar el respaldo." };
  }
  const inspected = inspectCommerceReceiptBackup(json);
  if (!inspected.ok) return inspected;
  if (inspected.actorUuid !== actor.uuid) {
    return { ok: false, error: "El respaldo pertenece a otro Actor; no puede conciliarse aquí." };
  }
  const backup = JSON.parse(json);
  const current = snapshotReceipts(actor);
  const incoming = backup.receipts;
  const missing = [];
  const matching = [];
  const conflicts = [];
  for (const [key, receipt] of Object.entries(incoming)) {
    const live = current[key];
    if (!live) { missing.push(key); continue; }
    // Una lápida y su recibo completo representan el mismo identificador,
    // pero ninguna discrepancia en la huella o el estado pendiente se ignora.
    const sameFingerprint = live.fingerprint === receipt.fingerprint;
    const sameState = live.state === receipt.state ||
      (["completed", "archived"].includes(live.state) &&
       ["completed", "archived"].includes(receipt.state));
    if (sameFingerprint && sameState) matching.push(key);
    else conflicts.push(key);
  }
  const onlyCurrent = Object.keys(current).filter((key) =>
    !Object.prototype.hasOwnProperty.call(incoming, key));
  return {
    ok: true, actorUuid: actor.uuid,
    backedUp: inspected.entries,
    matching: matching.length, missing: missing.length,
    conflicts: conflicts.length, onlyCurrent: onlyCurrent.length,
    missingKeys: missing, conflictKeys: conflicts,
    safeToMergeAutomatically: false
  };
}

// Recuperación explícita por DJ de marcadores ausentes, nunca de cobros/items.
// Se vuelve a evaluar dentro de la misma cola de transacciones para impedir
// carreras entre una compra y el respaldo. Los conflictos bloquean TODO el lote.
export async function recoverCommerceReceiptMarkers(actor, json, { confirm = false } = {}) {
  if (!game.user?.isGM || currentGm()?.id !== game.user.id) {
    return failure("Sólo el DJ activo principal puede recuperar identificadores.");
  }
  if (confirm !== true) return failure("La recuperación requiere confirmación explícita del DJ.");
  return exclusive(async () => {
    const preview = previewCommerceReceiptReconciliation(actor, json);
    if (!preview.ok) return preview;
    if (preview.conflicts !== 0) {
      return failure("El respaldo contiene conflictos: no se modificó ningún recibo.");
    }
    const live = snapshotReceipts(actor);
    const backup = JSON.parse(json).receipts;
    const missing = preview.missingKeys;
    const additions = missing.map((key) => {
      const row = backup[key];
      // El resultado de una compra histórica NO se reproduce ni restaura como
      // recibo completado: sólo se conserva su veto a una repetición.
      const safeRow = row.state === "pending"
        ? { state: "pending", fingerprint: row.fingerprint, at: row.at }
        : { state: "archived", fingerprint: row.fingerprint, at: row.at };
      return [key, safeRow];
    });
    const merged = Object.fromEntries([...Object.entries(live), ...additions]);
    if (JSON.stringify(merged).length + COMMERCE_RECEIPT_RESERVE > COMMERCE_RECEIPT_LEDGER_LIMIT) {
      return failure("El respaldo supera el límite de recibos: recuperación cancelada sin cambios.");
    }
    if (!missing.length) return { ok: true, recovered: 0, conflicts: 0 };
    await actor.setFlag("tierra-magica", RECEIPTS_KEY, merged);
    return { ok: true, recovered: missing.length, conflicts: 0 };
  }).catch((error) => failure(error?.message ?? error));
}

async function storeReceipt(actor, key, receipt) {
  const now = Date.now();
  const rows = { ...snapshotReceipts(actor), [key]: { ...receipt, at: now } };
  // Las operaciones pendientes requieren conciliación manual y nunca se
  // descartan automáticamente por rotación del historial de compras cerradas.
  const entries = Object.entries(rows);
  const unresolved = entries.filter(([, row]) => row?.state === "pending");
  // Sólo conservamos el detalle de las 128 operaciones completadas recientes.
  // Los identificadores antiguos quedan como lápidas persistentes: descartarlos
  // permitiría volver a cobrar o entregar al repetir un requestId histórico.
  const closed = entries.filter(([, row]) => row?.state !== "pending");
  const recent = closed.filter(([, row]) => row?.state !== "archived")
    .sort((a, b) => Number(b[1]?.at ?? 0) - Number(a[1]?.at ?? 0));
  const archived = [
    ...closed.filter(([, row]) => row?.state === "archived"),
    ...recent.slice(128).map(([id, row]) => [id, {
      state: "archived", fingerprint: row?.fingerprint, at: row?.at
    }])
  ];
  await actor.setFlag("tierra-magica", RECEIPTS_KEY,
    Object.fromEntries([...unresolved, ...recent.slice(0, 128), ...archived]));
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
  const existingReceipts = snapshotReceipts(merchant);
  const prior = existingReceipts[key];
  if (prior) {
    if (prior.fingerprint !== fingerprint) return failure("El identificador de la transacción ya fue utilizado.");
    if (prior.state === "pending") return failure("Operación pendiente de revisión del DJ: no se repite automáticamente.");
    if (prior.state === "archived") return failure("Operación histórica ya registrada: no se repite automáticamente.");
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

  // Preflight: un flag saturado no debe seguir creciendo ni perder lápidas.
  // Se reserva margen para el recibo final, antes de dinero, entrega o stock.
  const ledgerSize = JSON.stringify(existingReceipts).length;
  if (ledgerSize + key.length + fingerprint.length + COMMERCE_RECEIPT_RESERVE > COMMERCE_RECEIPT_LEDGER_LIMIT) {
    return failure("Historial comercial al límite: operación detenida sin modificar dinero ni inventario. Avisá al DJ para revisar y respaldar el historial; no borres recibos.");
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
    // Una operación puede aplicar su mutación y recién entonces fallar su
    // promesa. Incluso si el rollback aparentemente funciona, no podemos
    // demostrar que todas las escrituras quedaron revertidas. El recibo
    // permanece pendiente para impedir un replay hasta conciliarlo con el DJ.
    const details = rollbackErrors.length ? " Fallaron reversiones: " + rollbackErrors.join(", ") + "." : "";
    console.error("Foundry T.M. | Comercio con resultado incierto; recibo pendiente", error, rollbackErrors);
    return failure("Compra/retirada de resultado incierto: " + String(error?.message ?? error) +
      ". Recibo pendiente: revisión manual del DJ obligatoria antes de reintentar." + details);
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

// Foundry admite tanto paths aplanados como objetos anidados y claves "-="
// de eliminación. Ninguna de esas formas debe permitir a jugadores alterar
// inventarios y recibos comerciales de NPC en el cliente.
export function changesProtectedCommerceFlags(changes) {
  if (!changes || typeof changes !== "object") return false;
  const protectedKey = (key) => ["commerce", "commerceReceipts",
    "-=commerce", "-=commerceReceipts"].some((name) =>
    key === name || key.startsWith(name + "."));
  const isProtectedPath = (key) =>
    ["commerce", "commerceReceipts"].some((name) =>
      key === "flags.tierra-magica." + name ||
      key.startsWith("flags.tierra-magica." + name + ".") ||
      key === "flags.tierra-magica.-=" + name ||
      key.startsWith("flags.tierra-magica.-=" + name + "."));
  for (const [key, value] of Object.entries(changes)) {
    if (isProtectedPath(key)) return true;
    const nestedScope = key === "flags" ? value?.["tierra-magica"]
      : key === "flags.tierra-magica" ? value : null;
    if (nestedScope && typeof nestedScope === "object" &&
        Object.keys(nestedScope).some(protectedKey)) return true;
    if (key === "flags" && value && typeof value === "object" &&
        Object.keys(value).some((path) =>
          path.startsWith("tierra-magica.") &&
          protectedKey(path.slice("tierra-magica.".length)))) return true;
  }
  return false;
}

export function installCommerceRuntime() {
  if (installed || !game.socket?.on) return;
  // Ningún usuario jugador puede reconfigurar las ofertas ni los recibos de un NPC,
  // incluso si el DJ le dio propiedad sobre el Actor.
  Hooks.on("preUpdateActor", (actor, changes) => {
    if (game.user?.isGM || actor?.type !== "npc") return;
    if (changesProtectedCommerceFlags(changes)) {
      ui.notifications.warn("Sólo el DJ modifica el stock y los recibos de un establecimiento.");
      return false;
    }
  });
  installed = true;
  // En los eventos relanzados por Foundry, el segundo argumento es el
  // usuario autenticado por el servidor. Los IDs escritos en el mensaje no
  // demuestran identidad; sin ese dato se rechaza el evento (fail closed).
  game.socket.on(CHANNEL, async (message, senderId) => {
    if (message?.scope !== SCOPE || typeof senderId !== "string" || !senderId) return;
    if (message.kind === "response") {
      if (senderId === currentGm()?.id && message.requesterId === game.user?.id) {
        pending.get(message.requestId)?.(message.result ?? failure("Respuesta comercial inválida."));
      }
      return;
    }
    if (message.kind !== "request" || currentGm()?.id !== game.user?.id) return;
    if (message.requesterId !== senderId) {
      console.warn("Foundry T.M. | Solicitud comercial con identidad de socket discordante.");
      return;
    }
    const requester = game.users.get(senderId);
    // El DJ ejecuta sus propias compras directamente; un mensaje remoto que
    // afirma venir de un DJ o usuario ausente no es una compra de jugador.
    if (!requester?.active || requester.isGM) return;
    const result = await executeCommerceExchange({ ...message, requesterId: senderId });
    game.socket.emit(CHANNEL, {
      scope: SCOPE, kind: "response",
      requestId: message.requestId, requesterId: senderId, result
    });
  });
}
