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

// Bitácora separada de revisión, sin convertir pending en completed ni
// permitir repeticiones. Cada entrada es append-only y no admite reemplazos.
const REVIEW_KEY = "commercePendingReviews";
const REVIEW_LIMIT = 250_000;
export async function recordCommercePendingReview(actor, key, { note, checks = [] } = {}) {
  if (!game.user?.isGM || currentGm()?.id !== game.user.id) {
    return failure("Sólo el DJ activo principal puede registrar revisiones.");
  }
  if (!actor?.uuid || actor.type !== "npc" ||
      typeof key !== "string" || !key || key.length > 200) {
    return failure("Actor o identificador inválido.");
  }
  if (typeof note !== "string" || !note.trim() || note.trim().length > 2000 ||
      !Array.isArray(checks) || checks.length > 4 ||
      checks.some((x) => !["money", "items", "stock", "backup"].includes(x)) ||
      new Set(checks).size !== checks.length) {
    return failure("Nota o comprobaciones de revisión inválidas.");
  }
  return exclusive(async () => {
    const receipt = snapshotReceipts(actor)[key];
    if (receipt?.state !== "pending" || typeof receipt.fingerprint !== "string") {
      return failure("El recibo dejó de estar pendiente.");
    }
    const previous = actor.getFlag?.("tierra-magica", REVIEW_KEY);
    if (previous !== undefined && previous !== null &&
        (typeof previous !== "object" || Array.isArray(previous))) {
      return failure("La bitácora de revisiones no tiene un formato válido.");
    }
    const rows = previous ? { ...previous } : {};
    if (!validateReviewEntries(rows)) {
      return failure("La bitácora contiene identificadores duplicados o secuencias inválidas.");
    }
    const existing = Array.isArray(rows[key]) ? rows[key] : [];
    if (Object.hasOwn(rows, key) && !Array.isArray(rows[key])) {
      return failure("La secuencia de revisión existente es inválida.");
    }
    const event = {
      id: uid(),
      at: Date.now(),
      gmId: game.user.id,
      receiptFingerprint: receipt.fingerprint,
      status: "reviewed-still-pending",
      checks: [...checks],
      note: note.trim()
    };
    const next = Object.fromEntries([
      ...Object.entries(rows).filter(([id]) => id !== key),
      [key, [...existing, event]]
    ]);
    if (!validateReviewEntries(next)) {
      return failure("La nueva revisión repite un ID, altera la huella o rompe el orden.");
    }
    if (JSON.stringify(next).length > REVIEW_LIMIT) {
      return failure("La bitácora alcanzó el límite: exportá respaldos antes de añadir revisiones.");
    }
    await actor.setFlag("tierra-magica", REVIEW_KEY, next);
    return { ok: true, key, entryId: event.id, entries: next[key].length, pending: true };
  }).catch((error) => failure(error?.message ?? error));
}

export function commercePendingReviewHistory(actor, key) {
  const rows = actor?.getFlag?.("tierra-magica", REVIEW_KEY);
  const events = rows && typeof rows === "object" && !Array.isArray(rows) &&
    Array.isArray(rows[key]) ? rows[key] : [];
  return structuredClone(events);
}

// Respaldo independiente de revisiones. La suma de control detecta cambios
// accidentales; NO autentica a quien produjo o modificó el archivo.
const REVIEW_BACKUP_FORMAT = "tierra-magica-commerce-pending-reviews";
const REVIEW_BACKUP_MAX = 1_000_000;
const forbiddenReviewKeys = new Set(["__proto__", "constructor", "prototype"]);
function validateReviewEntries(rows) {
  if (!rows || typeof rows !== "object" || Array.isArray(rows)) return false;
  const seenIds = new Set();
  for (const [key, events] of Object.entries(rows)) {
    if (!key || key.length > 200 || forbiddenReviewKeys.has(key) ||
        !Array.isArray(events) || events.length > 10000) return false;
    let previousAt = -1;
    let fingerprint = null;
    for (const entry of events) {
      if (!entry || typeof entry !== "object" || Array.isArray(entry) ||
          typeof entry.id !== "string" || !entry.id || entry.id.length > 200 ||
          seenIds.has(entry.id) ||
          !Number.isSafeInteger(entry.at) || entry.at < 0 || entry.at < previousAt ||
          typeof entry.gmId !== "string" || !entry.gmId || entry.gmId.length > 200 ||
          typeof entry.receiptFingerprint !== "string" ||
          !entry.receiptFingerprint || entry.receiptFingerprint.length > 8192 ||
          (fingerprint !== null && entry.receiptFingerprint !== fingerprint) ||
          entry.status !== "reviewed-still-pending" ||
          typeof entry.note !== "string" || !entry.note.trim() ||
          entry.note.length > 2000 || !Array.isArray(entry.checks) ||
          entry.checks.length > 4 ||
          entry.checks.some((check) => !["money", "items", "stock", "backup"].includes(check)) ||
          new Set(entry.checks).size !== entry.checks.length) return false;
      seenIds.add(entry.id);
      previousAt = entry.at;
      fingerprint = entry.receiptFingerprint;
    }
  }
  return true;
}
export function createCommercePendingReviewBackup(actor) {
  if (!actor?.uuid || typeof actor.getFlag !== "function") {
    throw new Error("Se requiere un Actor persistente para respaldar revisiones.");
  }
  const raw = actor.getFlag("tierra-magica", REVIEW_KEY);
  const reviews = structuredClone(raw ?? {});
  if (!validateReviewEntries(reviews)) {
    throw new Error("La bitácora contiene entradas inválidas y no puede exportarse.");
  }
  const payload = { format: REVIEW_BACKUP_FORMAT, version: 1,
    actorUuid: actor.uuid, reviews };
  const serialized = JSON.stringify(payload);
  if (serialized.length > REVIEW_BACKUP_MAX) {
    throw new Error("La bitácora supera el tamaño permitido para este respaldo.");
  }
  const json = JSON.stringify({
    ...payload, checksum: receiptBackupChecksum(serialized)
  }, null, 2);
  if (json.length > REVIEW_BACKUP_MAX) {
    throw new Error("El archivo de respaldo supera el límite permitido.");
  }
  return json;
}
export function inspectCommercePendingReviewBackup(json, actor = null) {
  if (typeof json !== "string" || json.length > REVIEW_BACKUP_MAX) {
    return failure("El respaldo es demasiado grande o no contiene texto JSON.");
  }
  let parsed;
  try { parsed = JSON.parse(json); }
  catch { return failure("El respaldo de revisiones no contiene JSON válido."); }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed) ||
      parsed.format !== REVIEW_BACKUP_FORMAT || parsed.version !== 1 ||
      typeof parsed.actorUuid !== "string" || !parsed.actorUuid ||
      typeof parsed.checksum !== "string" || !validateReviewEntries(parsed.reviews)) {
    return failure("Formato o entradas del respaldo de revisiones inválidos.");
  }
  const { checksum, ...payload } = parsed;
  if (checksum !== receiptBackupChecksum(JSON.stringify(payload))) {
    return failure("La suma de control de las revisiones no coincide.");
  }
  if (actor && actor.uuid !== parsed.actorUuid) {
    return failure("El respaldo de revisiones pertenece a otro Actor.");
  }
  return { ok: true, actorUuid: parsed.actorUuid,
    operations: Object.keys(parsed.reviews).length,
    entries: Object.values(parsed.reviews).reduce((total, events) => total + events.length, 0),
    checksum };
}

// Conciliación de revisiones: sólo se admite agregar una continuación exacta
// de un historial local existente. Si diverge un evento, se rechaza TODO.
export function previewCommercePendingReviewReconciliation(actor, json) {
  if (!actor?.uuid || actor.type !== "npc" || typeof actor.getFlag !== "function") {
    return failure("Se requiere un NPC persistente para conciliar revisiones.");
  }
  const inspected = inspectCommercePendingReviewBackup(json, actor);
  if (!inspected.ok) return inspected;
  const incoming = JSON.parse(json).reviews;
  const current = actor.getFlag("tierra-magica", REVIEW_KEY) ?? {};
  if (!validateReviewEntries(current)) return failure("La bitácora actual contiene entradas inválidas.");
  const receipts = snapshotReceipts(actor);
  const conflicts = [];
  const missing = [];
  let matching = 0;
  for (const [key, events] of Object.entries(incoming)) {
    if (!events.length) continue;
    const receipt = Object.hasOwn(receipts, key) ? receipts[key] : undefined;
    if (receipt?.state !== "pending" || typeof receipt.fingerprint !== "string" ||
        events.some((event) => event.receiptFingerprint !== receipt.fingerprint)) {
      conflicts.push(key);
      continue;
    }
    const live = Object.hasOwn(current, key) ? current[key] : [];
    const overlap = Math.min(live.length, events.length);
    if (Array.from({ length: overlap }, (_, i) => i).some((i) =>
      JSON.stringify(live[i]) !== JSON.stringify(events[i]))) {
      conflicts.push(key);
      continue;
    }
    matching += overlap;
    if (events.length > live.length) {
      missing.push({ key, count: events.length - live.length });
    }
  }
  return { ok: true, actorUuid: actor.uuid, matching,
    missing: missing.reduce((sum, row) => sum + row.count, 0),
    missingOperations: missing.length, conflicts: conflicts.length,
    conflictKeys: conflicts, safeToMergeAutomatically: false };
}

// La revalidación ocurre en la misma cola que compras y anotaciones. Nunca
// se recuperan eventos sin un recibo pending compatible y confirmación del DJ.
export async function recoverCommercePendingReviews(actor, json, { confirm = false } = {}) {
  if (!game.user?.isGM || currentGm()?.id !== game.user.id) {
    return failure("Sólo el DJ activo principal puede recuperar revisiones.");
  }
  if (confirm !== true) return failure("La recuperación exige confirmación explícita.");
  return exclusive(async () => {
    const preview = previewCommercePendingReviewReconciliation(actor, json);
    if (!preview.ok) return preview;
    if (preview.conflicts) return failure("Existen conflictos: ninguna revisión fue modificada.");
    if (!preview.missing) return { ok: true, recovered: 0 };
    const incoming = JSON.parse(json).reviews;
    const previous = actor.getFlag("tierra-magica", REVIEW_KEY) ?? {};
    const merged = Object.fromEntries(Object.entries(previous));
    for (const [key, events] of Object.entries(incoming)) {
      if (!events.length) continue;
      const live = Object.hasOwn(merged, key) ? merged[key] : [];
      if (events.length > live.length) {
        merged[key] = [...live, ...structuredClone(events.slice(live.length))];
      }
    }
    if (!validateReviewEntries(merged) ||
        JSON.stringify(merged).length > REVIEW_LIMIT) {
      return failure("La recuperación supera el límite de bitácora o contiene datos inválidos.");
    }
    await actor.setFlag("tierra-magica", REVIEW_KEY, merged);
    return { ok: true, recovered: preview.missing };
  }).catch((error) => failure(error?.message ?? error));
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

const RECEIPT_BACKUP_MAX = 2_000_000;
function validReceiptBackupEntries(receipts) {
  if (!receipts || typeof receipts !== "object" || Array.isArray(receipts)) return false;
  return Object.entries(receipts).every(([key, receipt]) =>
    key.length > 0 && key.length <= 200 && !forbiddenReviewKeys.has(key) &&
    receipt && typeof receipt === "object" && !Array.isArray(receipt) &&
    ["pending", "completed", "archived"].includes(receipt.state) &&
    typeof receipt.fingerprint === "string" &&
    receipt.fingerprint.length > 0 && receipt.fingerprint.length <= 8192 &&
    (receipt.at === undefined ||
      (Number.isSafeInteger(receipt.at) && receipt.at >= 0)));
}
export function inspectCommerceReceiptBackup(json) {
  if (typeof json !== "string" || json.length > RECEIPT_BACKUP_MAX) {
    return failure("El respaldo comercial supera el límite de 2 MB o no contiene texto.");
  }
  let backup;
  try { backup = JSON.parse(json); }
  catch { return { ok: false, error: "El respaldo no contiene JSON válido." }; }
  if (!backup || backup.format !== "tierra-magica-commerce-receipts" ||
      backup.version !== 1 || typeof backup.actorUuid !== "string" ||
      !backup.actorUuid || backup.actorUuid.length > 500 ||
      !validReceiptBackupEntries(backup.receipts) ||
      typeof backup.checksum !== "string") {
    return { ok: false, error: "Formato o recibos del respaldo comercial inválidos." };
  }
  const { checksum, ...payload } = backup;
  if (receiptBackupChecksum(JSON.stringify(payload)) !== checksum) {
    return { ok: false, error: "La suma de control del respaldo no coincide." };
  }
  return { ok: true, actorUuid: payload.actorUuid,
    entries: Object.keys(payload.receipts).length, checksum };
}

// Etapa preparatoria de historial escalable: segmentos PORTÁTILES de respaldo.
// No se eliminan lápidas del Actor y los segmentos NO son una base autorizada
// para deduplicar transacciones o importar recibos automáticamente.
const ARCHIVE_FORMAT = "tierra-magica-commerce-receipt-archive-part";
export function createCommerceReceiptArchiveParts(actor, { targetCharacters = 100_000 } = {}) {
  if (!actor?.uuid || typeof actor.getFlag !== "function") {
    throw new Error("Se requiere un Actor persistente para segmentar recibos.");
  }
  if (!Number.isSafeInteger(targetCharacters) ||
      targetCharacters < 5_000 || targetCharacters > 200_000) {
    throw new Error("El tamaño objetivo de segmento es inválido.");
  }
  const receipts = snapshotReceipts(actor);
  if (!validReceiptBackupEntries(receipts)) {
    throw new Error("El historial contiene recibos inválidos: no se segmentó.");
  }
  const segments = [];
  let current = [];
  let size = 2; // "{}"
  for (const [key, receipt] of Object.entries(receipts)) {
    const serializedRow = JSON.stringify(key) + ":" + JSON.stringify(receipt);
    const extra = serializedRow.length + (current.length ? 1 : 0);
    if (extra + 2 > targetCharacters) {
      throw new Error("Un recibo individual supera el tamaño del segmento.");
    }
    if (current.length && size + extra > targetCharacters) {
      segments.push(Object.fromEntries(current));
      current = [];
      size = 2;
    }
    current.push([key, receipt]);
    size += serializedRow.length + (current.length > 1 ? 1 : 0);
  }
  if (current.length || segments.length === 0) {
    segments.push(Object.fromEntries(current));
  }
  const archiveId = receiptBackupChecksum(JSON.stringify(receipts)) +
    "-" + JSON.stringify(receipts).length;
  return segments.map((rows, index) => {
    const payload = { format: ARCHIVE_FORMAT, version: 1,
      actorUuid: actor.uuid, archiveId, part: index + 1,
      totalParts: segments.length, receipts: rows };
    const checksum = receiptBackupChecksum(JSON.stringify(payload));
    return JSON.stringify({ ...payload, checksum }, null, 2);
  });
}

export function inspectCommerceReceiptArchiveParts(parts, actor = null) {
  if (!Array.isArray(parts) || parts.length < 1 || parts.length > 1000) {
    return failure("Se requiere un conjunto de segmentos válido.");
  }
  let actorUuid = null;
  let archiveId = null;
  let total = null;
  const seenParts = new Set();
  const seenKeys = new Set();
  const receiptsByPart = new Map();
  for (const json of parts) {
    if (typeof json !== "string" || json.length > 250_000) {
      return failure("Un segmento tiene un tamaño o formato inválido.");
    }
    let document;
    try { document = JSON.parse(json); }
    catch { return failure("Un segmento no contiene JSON válido."); }
    if (!document || document.format !== ARCHIVE_FORMAT ||
        document.version !== 1 || typeof document.actorUuid !== "string" ||
        !document.actorUuid || typeof document.archiveId !== "string" ||
        !/^[0-9a-f]{8}-[0-9]+$/.test(document.archiveId) ||
        !Number.isSafeInteger(document.part) ||
        !Number.isSafeInteger(document.totalParts) ||
        document.totalParts < 1 || document.totalParts > 1000 ||
        document.part < 1 || document.part > document.totalParts ||
        !validReceiptBackupEntries(document.receipts) ||
        typeof document.checksum !== "string") {
      return failure("Un segmento contiene datos inválidos.");
    }
    const { checksum, ...payload } = document;
    if (checksum !== receiptBackupChecksum(JSON.stringify(payload))) {
      return failure("La suma de control de un segmento no coincide.");
    }
    if (actorUuid === null) {
      actorUuid = document.actorUuid;
      archiveId = document.archiveId;
      total = document.totalParts;
    }
    if (document.actorUuid !== actorUuid || document.archiveId !== archiveId ||
        document.totalParts !== total || seenParts.has(document.part)) {
      return failure("Segmentos duplicados o pertenecientes a conjuntos distintos.");
    }
    seenParts.add(document.part);
    receiptsByPart.set(document.part, document.receipts);
    for (const key of Object.keys(document.receipts)) {
      if (seenKeys.has(key)) return failure("Un recibo se repite entre segmentos.");
      seenKeys.add(key);
    }
  }
  if (seenParts.size !== total) return failure("Faltan segmentos del respaldo.");
  const complete = Object.fromEntries(
    Array.from({ length: total }, (_, index) =>
      Object.entries(receiptsByPart.get(index + 1) ?? {})).flat()
  );
  const serialized = JSON.stringify(complete);
  const expectedId = receiptBackupChecksum(serialized) + "-" + serialized.length;
  if (archiveId !== expectedId) {
    return failure("El conjunto no coincide con la huella global del archivo.");
  }
  if (actor && actor.uuid !== actorUuid) {
    return failure("Los segmentos corresponden a otro Actor.");
  }
  return { ok: true, actorUuid, archiveId, parts: total,
    receipts: seenKeys.size, readOnly: true };
}

// Consulta de auditoría contra un archivo segmentado completo. Las piezas son
// evidencia histórica de un snapshot, NUNCA autoridad para habilitar compras.
// La ausencia en el archivo tampoco demuestra que un ID no fue utilizado.
export function lookupCommerceArchivedReceipt(actor, parts, key) {
  if (!actor?.uuid || typeof actor.getFlag !== "function" ||
      typeof key !== "string" || !key || key.length > 200 ||
      forbiddenReviewKeys.has(key)) {
    return failure("Actor o identificador histórico inválido.");
  }
  const verified = inspectCommerceReceiptArchiveParts(parts, actor);
  if (!verified.ok) return verified;
  let archived = null;
  // Buscar sólo después de validar el lote entero y su huella global.
  for (const json of parts) {
    const receipts = JSON.parse(json).receipts;
    if (Object.hasOwn(receipts, key)) {
      archived = receipts[key];
      break;
    }
  }
  const liveRows = snapshotReceipts(actor);
  const live = Object.hasOwn(liveRows, key) ? liveRows[key] : null;
  const archivedState = archived?.state ?? null;
  const liveState = live?.state ?? null;
  const sameFingerprint = archived && live
    ? archived.fingerprint === live.fingerprint : null;
  const stateCompatible = archived && live
    ? (archived.state === live.state ||
        (["completed", "archived"].includes(archived.state) &&
         ["completed", "archived"].includes(live.state))) : null;
  const conflict = Boolean(archived && live &&
    (!sameFingerprint || !stateCompatible));
  return {
    ok: true,
    actorUuid: verified.actorUuid,
    archiveId: verified.archiveId,
    key,
    archivePresent: archived !== null,
    archiveState: archivedState,
    actorPresent: live !== null,
    actorState: liveState,
    matchingFingerprint: sameFingerprint,
    compatibleState: stateCompatible,
    conflict,
    canAuthorizeReplay: false,
    requiresManualReview: conflict || Boolean(archived && !live),
    warning: "Archivo de sólo lectura: la ausencia en el respaldo no autoriza repetir una transacción."
  };
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
    const live = Object.prototype.hasOwnProperty.call(current, key)
      ? current[key] : undefined;
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
  const protectedKey = (key) => ["commerce", "commerceReceipts", "commercePendingReviews",
    "-=commerce", "-=commerceReceipts", "-=commercePendingReviews"].some((name) =>
    key === name || key.startsWith(name + "."));
  const isProtectedPath = (key) =>
    ["commerce", "commerceReceipts", "commercePendingReviews"].some((name) =>
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
