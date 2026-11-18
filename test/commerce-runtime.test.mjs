import test from "node:test";
import assert from "node:assert/strict";
import { COMMERCE_RECEIPT_LEDGER_LIMIT, commerceReceiptLedgerStats, commercePendingReceiptReport, createCommercePendingDossier, recordCommercePendingReview, commercePendingReviewHistory, createCommercePendingReviewBackup, inspectCommercePendingReviewBackup, createCommerceReceiptBackup, inspectCommerceReceiptBackup, previewCommerceReceiptReconciliation, recoverCommerceReceiptMarkers, executeCommerceExchange } from "../scripts/commerce/commerce-runtime.mjs";

function environment({ mode = "merchant", stock = 2, money = 500, price = 30, priceQuantity = 1, stacking = "unique", failCreation = false, failDebitAfterWrite = false, failItemAfterWrite = false, failStockAfterWrite = false, availability, offerAvailabilityStatus, initialReceipts = {} } = {}) {
  const gm = { id: "gm", isGM: true, active: true };
  const users = [gm];
  users.get = (id) => id === gm.id ? gm : null;
  globalThis.game = { user: gm, users };
  const source = {
    documentName: "Item", uuid: "Item.source", name: "Espada",
    type: "weapon", img: "test.svg",
    system: { stacking, physical: {
      quantity: 1, priceStatus: price === null ? "unset" : "exact",
      priceCopper: price ?? 0, priceQuantity,
      ...(availability ? { availability } : {})
    }},
    toObject() {
      return { _id: "catalog-id", name: this.name, type: this.type, system: structuredClone(this.system) };
    }
  };
  let stockValue = stock;
  const merchant = {
    type: "npc", uuid: "Actor.shop",
    flags: {
      commerce: { mode, tier: "metropolis", specialty: "smith", offers: [
        { id: "offer", uuid: source.uuid, name: source.name, type: source.type,
          stock, minTier: 1, specialty: "smith", priceCopper: price, priceQuantity,
          ...(offerAvailabilityStatus ? { availabilityStatus: offerAvailabilityStatus } : {}) }
      ] },
      commerceReceipts: structuredClone(initialReceipts)
    },
    getFlag(scope, key) { return structuredClone(this.flags[key]); },
    async setFlag(scope, key, data) {
      this.flags[key] = structuredClone(data);
      if (key === "commerce") {
        stockValue = data.offers[0].stock;
        if (failStockAfterWrite) throw new Error("Stock persistido, promesa falló");
      }
      return this;
    }
  };
  const items = [];
  const buyer = {
    type: "character", uuid: "Actor.buyer",
    system: { currency: { totalCopper: money }, creation: { status: "complete" } },
    testUserPermission() { return true; },
    async update(changes) {
      this.system.currency.totalCopper = changes["system.currency.totalCopper"];
      if (failDebitAfterWrite) throw new Error("Cobro persistido, promesa falló");
      return this;
    },
    async createEmbeddedDocuments(kind, rows, options) {
      if (failCreation) throw new Error("Error de inventario simulado");
      assert.equal(kind, "Item");
      assert.equal(options.tmValidated, true);
      assert.equal(rows[0]._id, undefined);
      const item = { ...rows[0], async delete() {
        const pos = items.indexOf(item);
        if (pos >= 0) items.splice(pos, 1);
      }};
      items.push(item);
      if (failItemAfterWrite) throw new Error("Objeto creado, promesa falló");
      return [item];
    }
  };
  const documents = new Map([[merchant.uuid, merchant], [buyer.uuid, buyer], [source.uuid, source]]);
  globalThis.fromUuid = async (uuid) => documents.get(uuid) ?? null;
  return {
    buyer, merchant, items, getStock: () => stockValue,
    request: (requestId, quantity = 1) => ({
      requestId, requesterId: "gm", merchantUuid: merchant.uuid,
      buyerUuid: buyer.uuid, offerId: "offer", quantity
    })
  };
}

test("compra: descuenta cobres, entrega una unidad y agota stock exactamente", async () => {
  const env = environment({ stock: 1 });
  const result = await executeCommerceExchange(env.request("operation-1"));
  assert.equal(result.ok, true);
  assert.equal(result.cost, 30);
  assert.equal(env.buyer.system.currency.totalCopper, 470);
  assert.equal(env.getStock(), 0);
  assert.equal(env.items.length, 1);
  assert.equal(env.items[0].system.quantity, 1);
  assert.equal(env.items[0].system.acquisition.paid.amount, 30);
});

test("repetir requestId devuelve recibo, no duplica item ni pagos", async () => {
  const env = environment({ stock: 2 });
  const first = await executeCommerceExchange(env.request("same-id"));
  const second = await executeCommerceExchange(env.request("same-id"));
  assert.deepEqual(second, first);
  assert.equal(env.getStock(), 1);
  assert.equal(env.items.length, 1);
  assert.equal(env.buyer.system.currency.totalCopper, 470);
});

test("rotación de 128 recibos cerrados conserva todas las operaciones pendientes", async () => {
  const initialReceipts = Object.fromEntries([
    ["gm:unresolved-old", { state: "pending",
      fingerprint: JSON.stringify(["gm", "Actor.shop", "Actor.buyer", "offer", 1]), at: 1 }],
    ...Array.from({ length: 145 }, (_, index) =>
      ["gm:historical-" + index, { state: "completed", fingerprint: JSON.stringify(["gm", "Actor.shop", "Actor.buyer", "offer", 1]), result: { ok: true }, at: index + 2 }])
  ]);
  const env = environment({ stock: 2, initialReceipts });
  const result = await executeCommerceExchange(env.request("fresh"));
  assert.equal(result.ok, true);
  const receipts = env.merchant.flags.commerceReceipts;
  assert.equal(receipts["gm:unresolved-old"].state, "pending");
  assert.equal(receipts["gm:fresh"].state, "completed");
  assert.equal(Object.values(receipts).filter((row) => row.state === "completed").length, 128);
  assert.equal(Object.values(receipts).filter((row) => row.state === "archived").length, 18);
  assert.equal(Object.values(receipts).filter((row) => row.state === "pending").length, 1);
  const historicalReplay = await executeCommerceExchange(env.request("historical-0"));
  assert.equal(historicalReplay.ok, false);
  assert.match(historicalReplay.error, /histórica/i);
  assert.equal(receipts["gm:historical-0"].state, "archived");
  const duplicate = await executeCommerceExchange(env.request("unresolved-old"));
  assert.equal(duplicate.ok, false);
  assert.match(duplicate.error, /pendiente/i);
  assert.equal(env.items.length, 1, "no se duplica la entrega durante conciliación manual");
  assert.equal(env.getStock(), 1);
  assert.equal(env.buyer.system.currency.totalCopper, 470);
});

test("las lápidas históricas sobreviven a otra compra y no se reactivan", async () => {
  const fingerprint = JSON.stringify(["gm", "Actor.shop", "Actor.buyer", "offer", 1]);
  const env = environment({ initialReceipts: {
    "gm:archived-old": { state: "archived", fingerprint, at: 1 },
    "gm:completed-old": { state: "completed", fingerprint, result: { ok: true }, at: 2 }
  } });
  assert.equal((await executeCommerceExchange(env.request("newer"))).ok, true);
  assert.equal(env.merchant.flags.commerceReceipts["gm:archived-old"].state, "archived");
  const duplicate = await executeCommerceExchange(env.request("archived-old"));
  assert.equal(duplicate.ok, false);
  assert.equal(env.items.length, 1);
  assert.equal(env.getStock(), 1);
  assert.equal(env.buyer.system.currency.totalCopper, 470);
});

test("el Director puede consultar los recibos tras reconstruir el Actor sin eliminarlos", async () => {
  const env = environment({ stock: 2, initialReceipts: {
    "gm:manual": { state: "pending", fingerprint: "manual", at: 1 },
    "gm:closed": { state: "completed", fingerprint: "closed", result: { ok: true }, at: 2 },
    "gm:old": { state: "archived", fingerprint: "old", at: 0 }
  } });
  const before = structuredClone(env.merchant.flags.commerceReceipts);
  const restoredActor = {
    getFlag(scope, key) { return structuredClone(before); }
  };
  const stats = commerceReceiptLedgerStats(restoredActor);
  assert.deepEqual({ pending: stats.pending, recent: stats.recent,
    archived: stats.archived, total: stats.total },
    { pending: 1, recent: 1, archived: 1, total: 3 });
  assert.equal(stats.serializedCharacters, JSON.stringify(before).length);
  assert.deepEqual(env.merchant.flags.commerceReceipts, before,
    "el diagnóstico no altera recibos ni resuelve pendientes");
  const absent = commerceReceiptLedgerStats({ getFlag: () => undefined });
  assert.deepEqual(absent, { pending: 0, recent: 0, archived: 0,
    total: 0, serializedCharacters: 2, limitCharacters: COMMERCE_RECEIPT_LEDGER_LIMIT });
});

test("el informe de pendientes es de sólo lectura, ordenado y acotado", () => {
  const fingerprint = JSON.stringify(["gm", "Actor.shop", "Actor.buyer", "offer", 2]);
  const records = {
    "gm:late": { state: "pending", fingerprint, at: 20 },
    "gm:early": { state: "pending", fingerprint, at: 1 },
    "gm:completed": { state: "completed", fingerprint, at: 0, result: { ok: true } },
    "gm:archived": { state: "archived", fingerprint, at: 0 },
    "gm:legacy": { state: "pending", fingerprint: "unknown", at: "malformed" }
  };
  const env = environment({ initialReceipts: records });
  const original = structuredClone(env.merchant.flags.commerceReceipts);
  const report = commercePendingReceiptReport(env.merchant, { limit: 2 });
  assert.equal(report.total, 3);
  assert.equal(report.shown, 2);
  assert.deepEqual(report.rows.map((row) => row.key), ["gm:legacy", "gm:early"]);
  assert.equal(report.rows[0].requesterId, null);
  assert.equal(report.rows[0].at, null);
  assert.deepEqual(report.rows[1], {
    key: "gm:early", at: 1, requesterId: "gm", merchantUuid: "Actor.shop",
    buyerUuid: "Actor.buyer", offerId: "offer", quantity: 2
  });
  const all = commercePendingReceiptReport(env.merchant, { limit: 1000 });
  assert.equal(all.rows.length, 3);
  assert.deepEqual(env.merchant.flags.commerceReceipts, original);
  assert.equal(env.getStock(), 2);
  assert.equal(env.buyer.system.currency.totalCopper, 500);
  assert.equal(env.items.length, 0);
});

test("informe de pendientes vacío o con huellas malformadas nunca altera el Actor", () => {
  const env = environment({ initialReceipts: {
    "gm:malformed": { state: "pending", fingerprint: JSON.stringify(["gm"]), at: 0 },
    "gm:nothing": { state: "pending", at: 8 },
    "gm:done": { state: "completed", fingerprint: "ok", at: 2 }
  } });
  const before = structuredClone(env.merchant.flags.commerceReceipts);
  const report = commercePendingReceiptReport(env.merchant);
  assert.equal(report.total, 2);
  assert.ok(report.rows.every((row) => row.buyerUuid === null));
  assert.deepEqual(env.merchant.flags.commerceReceipts, before);
  assert.deepEqual(commercePendingReceiptReport({ getFlag: () => undefined }),
    { total: 0, shown: 0, rows: [] });
});

test("expediente pendiente registra fotografía actual sin cerrar ni inventar efectos", async () => {
  const fp = JSON.stringify(["gm", "Actor.shop", "Actor.buyer", "offer", 1]);
  const env = environment({ money: 470, stock: 1, initialReceipts: {
    "gm:review": { state: "pending", fingerprint: fp, at: 100 },
    "gm:closed": { state: "completed", fingerprint: fp, at: 101 }
  } });
  const before = structuredClone(env.merchant.flags);
  const report = await createCommercePendingDossier(env.merchant, "gm:review");
  assert.equal(report.ok, true);
  assert.equal(report.dossier.state, "pending");
  assert.equal(report.dossier.request.buyerUuid, "Actor.buyer");
  assert.equal(report.dossier.snapshot.currentCopper, 470);
  assert.equal(report.dossier.snapshot.currentStock, 1);
  assert.equal(report.dossier.snapshot.buyerFound, true);
  assert.equal(report.dossier.snapshot.candidateItems, null,
    "Inventario no consultable no se considera vacío");
  assert.ok(report.dossier.warning.includes("no prueba"));
  assert.deepEqual(env.merchant.flags, before);
  assert.equal(env.items.length, 0);
  assert.equal((await createCommercePendingDossier(env.merchant, "gm:closed")).ok, false);
  assert.equal((await createCommercePendingDossier(env.merchant, "gm:missing")).ok, false);
});

test("expediente identifica candidatos de inventario sin afirmar que corresponden al recibo", async () => {
  const fp = JSON.stringify(["gm", "Actor.shop", "Actor.buyer", "offer", 1]);
  const env = environment({ initialReceipts: {
    "gm:review": { state: "pending", fingerprint: fp, at: 100 }
  } });
  env.buyer.items = [
    { id: "i1", name: "Espada", system: { quantity: 1, acquisition: {
      sources: [{ kind: "commerce", uuid: "Actor.shop", itemUuid: "Item.source" }]
    } } },
    { id: "i2", name: "Otro", system: { acquisition: {
      sources: [{ kind: "commerce", uuid: "Actor.other", itemUuid: "Item.source" }]
    } } }
  ];
  const report = await createCommercePendingDossier(env.merchant, "gm:review");
  assert.deepEqual(report.dossier.snapshot.candidateItems,
    [{ id: "i1", name: "Espada", quantity: 1 }]);
  assert.equal(env.buyer.items.length, 2);
});

test("expediente hereda huellas ilegibles sin suponer identidad ni cobro", async () => {
  const env = environment({ initialReceipts: {
    "gm:legacy": { state: "pending", fingerprint: "corrupt" }
  } });
  const report = await createCommercePendingDossier(env.merchant, "gm:legacy");
  assert.equal(report.ok, true);
  assert.equal(report.dossier.request, null);
  assert.equal(report.dossier.snapshot.currentCopper, null);
  assert.equal(report.dossier.snapshot.candidateItems, null);
  assert.equal(env.merchant.flags.commerceReceipts["gm:legacy"].state, "pending");
});

test("la revisión del DJ es append-only y no desbloquea operaciones pendientes", async () => {
  const fingerprint = JSON.stringify(["gm", "Actor.shop", "Actor.buyer", "offer", 1]);
  const env = environment({ initialReceipts: {
    "gm:manual": { state: "pending", fingerprint, at: 100 }
  } });
  const initial = structuredClone(env.merchant.flags.commerceReceipts);
  const a = await recordCommercePendingReview(env.merchant, "gm:manual",
    { note: "  Verificados cobres actuales  ", checks: ["money"] });
  const b = await recordCommercePendingReview(env.merchant, "gm:manual",
    { note: "Examiné objetos y existencias", checks: ["items", "stock"] });
  assert.equal(a.ok, true);
  assert.equal(b.ok, true);
  assert.notEqual(a.entryId, b.entryId);
  assert.equal(b.entries, 2);
  const history = commercePendingReviewHistory(env.merchant, "gm:manual");
  assert.deepEqual(history.map((x) => x.note),
    ["Verificados cobres actuales", "Examiné objetos y existencias"]);
  assert.deepEqual(history.map((x) => x.status),
    ["reviewed-still-pending", "reviewed-still-pending"]);
  assert.deepEqual(env.merchant.flags.commerceReceipts, initial);
  assert.equal(env.buyer.system.currency.totalCopper, 500);
  assert.equal(env.items.length, 0);
  assert.equal(env.getStock(), 2);
  history[0].note = "alterado localmente";
  assert.equal(commercePendingReviewHistory(env.merchant, "gm:manual")[0].note,
    "Verificados cobres actuales");
  const replay = await executeCommerceExchange(env.request("manual"));
  assert.equal(replay.ok, false);
  assert.match(replay.error, /pendiente/i);
});

test("revisión inválida, recibo cerrado y usuario no DJ no escriben bitácora", async () => {
  const fingerprint = JSON.stringify(["gm", "Actor.shop", "Actor.buyer", "offer", 1]);
  const env = environment({ initialReceipts: {
    "gm:open": { state: "pending", fingerprint },
    "gm:closed": { state: "archived", fingerprint }
  } });
  const invalid = [
    ["gm:open", { note: "" }],
    ["gm:open", { note: "ok", checks: ["unknown"] }],
    ["gm:open", { note: "ok", checks: ["money", "money"] }],
    ["gm:closed", { note: "ok" }],
    ["gm:missing", { note: "ok" }]
  ];
  for (const [key, details] of invalid) {
    assert.equal((await recordCommercePendingReview(env.merchant, key, details)).ok, false);
  }
  game.user = { id: "player", isGM: false, active: true };
  assert.equal((await recordCommercePendingReview(env.merchant, "gm:open",
    { note: "sin autorización" })).ok, false);
  assert.equal(env.merchant.flags.commercePendingReviews, undefined);
  assert.deepEqual(commercePendingReviewHistory(env.merchant, "gm:open"), []);
});

test("respaldo independiente de revisiones conserva historial y no escribe nada", async () => {
  const fp = JSON.stringify(["gm", "Actor.shop", "Actor.buyer", "offer", 1]);
  const env = environment({ initialReceipts: {
    "gm:old": { state: "pending", fingerprint: fp, at: 1 }
  } });
  assert.equal((await recordCommercePendingReview(env.merchant, "gm:old",
    { note: "Revisadas monedas", checks: ["money"] })).ok, true);
  assert.equal((await recordCommercePendingReview(env.merchant, "gm:old",
    { note: "Revisadas existencias", checks: ["stock"] })).ok, true);
  const before = structuredClone(env.merchant.flags);
  const backup = createCommercePendingReviewBackup(env.merchant);
  const inspected = inspectCommercePendingReviewBackup(backup, env.merchant);
  assert.equal(inspected.ok, true);
  assert.equal(inspected.operations, 1);
  assert.equal(inspected.entries, 2);
  assert.equal(JSON.parse(backup).reviews["gm:old"].length, 2);
  assert.equal(JSON.parse(backup).format, "tierra-magica-commerce-pending-reviews");
  assert.equal(JSON.parse(backup).version, 1);
  assert.deepEqual(env.merchant.flags, before);
  assert.equal(env.merchant.flags.commerceReceipts["gm:old"].state, "pending");
  assert.equal(env.buyer.system.currency.totalCopper, 500);
  assert.equal(env.getStock(), 2);
  assert.equal(env.items.length, 0);
});

test("verificación de revisiones rechaza modificación, otros actores y datos inválidos", async () => {
  const fp = JSON.stringify(["gm", "Actor.shop", "Actor.buyer", "offer", 1]);
  const env = environment({ initialReceipts: {
    "gm:old": { state: "pending", fingerprint: fp }
  } });
  await recordCommercePendingReview(env.merchant, "gm:old",
    { note: "Original", checks: ["backup"] });
  const backup = createCommercePendingReviewBackup(env.merchant);
  const altered = JSON.parse(backup);
  altered.reviews["gm:old"][0].note = "Alterado";
  assert.equal(inspectCommercePendingReviewBackup(JSON.stringify(altered)).ok, false);
  assert.equal(inspectCommercePendingReviewBackup(backup, { uuid: "Actor.other" }).ok, false);
  assert.equal(inspectCommercePendingReviewBackup("no json").ok, false);
  assert.equal(inspectCommercePendingReviewBackup("x".repeat(1_000_001)).ok, false);
  assert.equal(inspectCommercePendingReviewBackup(backup).ok, true);
  env.merchant.flags.commercePendingReviews["gm:old"][0].checks.push("unknown");
  assert.throws(() => createCommercePendingReviewBackup(env.merchant), /inválidas/);
});

test("respaldo de revisiones vacío es válido y no genera entradas", () => {
  const env = environment();
  const backup = createCommercePendingReviewBackup(env.merchant);
  assert.deepEqual({ ...inspectCommercePendingReviewBackup(backup, env.merchant) },
    { ok: true, actorUuid: "Actor.shop", operations: 0, entries: 0,
      checksum: JSON.parse(backup).checksum });
  assert.equal(env.merchant.flags.commercePendingReviews, undefined);
});

test("historial saturado rechaza compras sin podar archivo ni tocar dinero o stock", async () => {
  const initialReceipts = {
    "gm:archived-large": {
      state: "archived",
      fingerprint: "x".repeat(COMMERCE_RECEIPT_LEDGER_LIMIT),
      at: 1
    }
  };
  const env = environment({ initialReceipts, stock: 2 });
  const before = structuredClone(env.merchant.flags.commerceReceipts);
  const response = await executeCommerceExchange(env.request("new-after-limit"));
  assert.equal(response.ok, false);
  assert.match(response.error, /Historial comercial al límite/);
  assert.equal(env.buyer.system.currency.totalCopper, 500);
  assert.equal(env.getStock(), 2);
  assert.equal(env.items.length, 0);
  assert.deepEqual(env.merchant.flags.commerceReceipts, before,
    "nunca se purga el marcador histórico para permitir otra compra");
});

test("una compra normal no se bloquea por la reserva preventiva", async () => {
  const env = environment({ stock: 2 });
  assert.equal((await executeCommerceExchange(env.request("normal-with-space"))).ok, true);
  assert.equal(env.getStock(), 1);
  assert.equal(env.buyer.system.currency.totalCopper, 470);
});

test("respaldo local conserva pendientes, cerrados y archivados sin modificar Actor", () => {
  const initialReceipts = {
    "gm:pending-1": { state: "pending", fingerprint: "pending", at: 1 },
    "gm:completed-1": { state: "completed", fingerprint: "completed", result: { ok: true }, at: 2 },
    "gm:archived-1": { state: "archived", fingerprint: "archived", at: 3 }
  };
  const env = environment({ initialReceipts });
  const prior = structuredClone(env.merchant.flags.commerceReceipts);
  const backup = createCommerceReceiptBackup(env.merchant);
  const inspected = inspectCommerceReceiptBackup(backup);
  assert.deepEqual(inspected, {
    ok: true, actorUuid: "Actor.shop", entries: 3, checksum: JSON.parse(backup).checksum
  });
  assert.deepEqual(JSON.parse(backup).receipts, prior);
  assert.deepEqual(env.merchant.flags.commerceReceipts, prior);
  assert.equal(env.buyer.system.currency.totalCopper, 500);
  assert.equal(env.getStock(), 2);
  assert.equal(env.items.length, 0);
});

test("respaldo alterado o incompleto no supera la verificación y no se importa", () => {
  const env = environment({ initialReceipts: {
    "gm:old": { state: "archived", fingerprint: "original", at: 1 }
  } });
  const json = createCommerceReceiptBackup(env.merchant);
  assert.equal(inspectCommerceReceiptBackup("{bad json").ok, false);
  const changed = JSON.parse(json);
  changed.receipts["gm:old"].fingerprint = "manipulado";
  assert.equal(inspectCommerceReceiptBackup(JSON.stringify(changed)).ok, false);
  assert.equal(inspectCommerceReceiptBackup(JSON.stringify({ format: "otro" })).ok, false);
  assert.equal(JSON.parse(json).receipts["gm:old"].fingerprint, "original");
  assert.equal(env.merchant.flags.commerceReceipts["gm:old"].fingerprint, "original");
});

test("conciliación de respaldo identifica faltantes, conflictos y registros locales sin escribir", () => {
  const saved = environment({ initialReceipts: {
    "gm:igual": { state: "completed", fingerprint: "igual", result: { ok: true }, at: 10 },
    "gm:antiguo": { state: "archived", fingerprint: "antiguo", at: 2 },
    "gm:disputa": { state: "pending", fingerprint: "original", at: 3 },
    "gm:faltante": { state: "archived", fingerprint: "faltante", at: 1 }
  } });
  const backup = createCommerceReceiptBackup(saved.merchant);
  const live = environment({ initialReceipts: {
    "gm:igual": { state: "archived", fingerprint: "igual", at: 10 },
    "gm:antiguo": { state: "completed", fingerprint: "antiguo", result: { ok: true }, at: 2 },
    "gm:disputa": { state: "pending", fingerprint: "otra", at: 3 },
    "gm:solo-actual": { state: "archived", fingerprint: "local", at: 4 }
  } });
  const original = structuredClone(live.merchant.flags.commerceReceipts);
  const result = previewCommerceReceiptReconciliation(live.merchant, backup);
  assert.equal(result.ok, true);
  assert.deepEqual({ matching: result.matching, missing: result.missing,
    conflicts: result.conflicts, onlyCurrent: result.onlyCurrent },
    { matching: 2, missing: 1, conflicts: 1, onlyCurrent: 1 });
  assert.deepEqual(result.missingKeys, ["gm:faltante"]);
  assert.deepEqual(result.conflictKeys, ["gm:disputa"]);
  assert.equal(result.safeToMergeAutomatically, false);
  assert.deepEqual(live.merchant.flags.commerceReceipts, original);
  assert.equal(live.buyer.system.currency.totalCopper, 500);
  assert.equal(live.getStock(), 2);
  assert.equal(live.items.length, 0);
});

test("conciliación rechaza respaldo corrupto o perteneciente a otro Actor", () => {
  const source = environment({ initialReceipts: {
    "gm:una": { state: "pending", fingerprint: "una", at: 1 }
  } });
  const backup = createCommerceReceiptBackup(source.merchant);
  const other = { uuid: "Actor.another", getFlag: () => ({}) };
  assert.equal(previewCommerceReceiptReconciliation(other, backup).ok, false);
  const broken = JSON.parse(backup);
  broken.receipts["gm:una"].fingerprint = "alterado";
  assert.equal(previewCommerceReceiptReconciliation(source.merchant, JSON.stringify(broken)).ok, false);
  assert.equal(previewCommerceReceiptReconciliation(source.merchant, "invalid").ok, false);
});

test("recuperación explícita añade sólo marcadores ausentes y bloquea replays", async () => {
  const initial = environment({ initialReceipts: {
    "gm:historical": { state: "completed", fingerprint:
      JSON.stringify(["gm", "Actor.shop", "Actor.buyer", "offer", 1]),
      result: { ok: true }, at: 1 },
    "gm:pending-old": { state: "pending", fingerprint: "manual", at: 2 }
  } });
  const backup = createCommerceReceiptBackup(initial.merchant);
  const live = environment({ stock: 2 });
  const missingConfirm = await recoverCommerceReceiptMarkers(live.merchant, backup);
  assert.equal(missingConfirm.ok, false);
  assert.deepEqual(live.merchant.flags.commerceReceipts, {});
  const recovered = await recoverCommerceReceiptMarkers(live.merchant, backup, { confirm: true });
  assert.deepEqual(recovered, { ok: true, recovered: 2, conflicts: 0 });
  assert.equal(live.merchant.flags.commerceReceipts["gm:historical"].state, "archived");
  assert.equal(live.merchant.flags.commerceReceipts["gm:pending-old"].state, "pending");
  const replay = await executeCommerceExchange(live.request("historical"));
  assert.equal(replay.ok, false);
  assert.equal(live.items.length, 0);
  assert.equal(live.getStock(), 2);
  assert.equal(live.buyer.system.currency.totalCopper, 500);
  assert.deepEqual(await recoverCommerceReceiptMarkers(live.merchant, backup, { confirm: true }),
    { ok: true, recovered: 0, conflicts: 0 });
});

test("recuperación ante conflicto rechaza el lote entero sin sobrescribir", async () => {
  const from = environment({ initialReceipts: {
    "gm:conflict": { state: "pending", fingerprint: "old", at: 1 },
    "gm:missing": { state: "archived", fingerprint: "missing", at: 2 }
  } });
  const backup = createCommerceReceiptBackup(from.merchant);
  const live = environment({ initialReceipts: {
    "gm:conflict": { state: "pending", fingerprint: "different", at: 1 }
  } });
  const before = structuredClone(live.merchant.flags.commerceReceipts);
  const result = await recoverCommerceReceiptMarkers(live.merchant, backup, { confirm: true });
  assert.equal(result.ok, false);
  assert.deepEqual(live.merchant.flags.commerceReceipts, before);
  assert.equal(live.merchant.flags.commerceReceipts["gm:missing"], undefined);
});

test("recuperación de marcadores rechaza a jugadores y respaldos de otro Actor", async () => {
  const source = environment({ initialReceipts: {
    "gm:old": { state: "archived", fingerprint: "old", at: 1 }
  } });
  const backup = createCommerceReceiptBackup(source.merchant);
  const other = { ...source.merchant, uuid: "Actor.other" };
  assert.equal((await recoverCommerceReceiptMarkers(other, backup, { confirm: true })).ok, false);
  const initial = structuredClone(source.merchant.flags.commerceReceipts);
  game.user = { id: "player", isGM: false, active: true };
  assert.equal((await recoverCommerceReceiptMarkers(source.merchant, backup, { confirm: true })).ok, false);
  assert.deepEqual(source.merchant.flags.commerceReceipts, initial);
});

test("dos compras concurrentes de la última unidad son serializadas", async () => {
  const env = environment({ stock: 1 });
  const [a, b] = await Promise.all([
    executeCommerceExchange(env.request("one")),
    executeCommerceExchange(env.request("two"))
  ]);
  assert.equal([a, b].filter((r) => r.ok).length, 1);
  assert.equal(env.getStock(), 0);
  assert.equal(env.items.length, 1);
  assert.equal(env.buyer.system.currency.totalCopper, 470);
});

test("cofre entrega gratis y deja intacto el dinero", async () => {
  const env = environment({ mode: "chest", price: null, stock: 2 });
  const result = await executeCommerceExchange(env.request("loot-1"));
  assert.equal(result.ok, true);
  assert.equal(result.cost, 0);
  assert.equal(env.buyer.system.currency.totalCopper, 500);
  assert.equal(env.getStock(), 1);
  assert.equal(env.items[0].system.acquisition.mode, "granted");
});

test("fallo de creación restaura monedas y mantiene stock", async () => {
  const env = environment({ stock: 1, failCreation: true });
  const result = await executeCommerceExchange(env.request("fails"));
  assert.equal(result.ok, false);
  assert.equal(env.buyer.system.currency.totalCopper, 500);
  assert.equal(env.getStock(), 1);
  assert.equal(env.items.length, 0);
});

test("cobro aplicado antes de arrojar error conserva recibo pendiente, nunca duplica", async () => {
  const env = environment({ failDebitAfterWrite: true });
  const first = await executeCommerceExchange(env.request("debit-uncertain"));
  assert.equal(first.ok, false);
  assert.match(first.error, /resultado incierto/i);
  assert.equal(env.buyer.system.currency.totalCopper, 470);
  assert.equal(env.items.length, 0);
  assert.equal(env.getStock(), 2);
  assert.equal(env.merchant.flags.commerceReceipts["gm:debit-uncertain"].state, "pending");
  const again = await executeCommerceExchange(env.request("debit-uncertain"));
  assert.equal(again.ok, false);
  assert.match(again.error, /pendiente/i);
  assert.equal(env.buyer.system.currency.totalCopper, 470);
});

test("objeto creado antes de arrojar error no es entregado por segunda vez", async () => {
  const env = environment({ failItemAfterWrite: true });
  const first = await executeCommerceExchange(env.request("item-uncertain"));
  assert.equal(first.ok, false);
  assert.equal(env.items.length, 1);
  assert.equal(env.getStock(), 2);
  assert.equal(env.merchant.flags.commerceReceipts["gm:item-uncertain"].state, "pending");
  const second = await executeCommerceExchange(env.request("item-uncertain"));
  assert.equal(second.ok, false);
  assert.equal(env.items.length, 1);
  assert.equal(env.buyer.system.currency.totalCopper, 500,
    "el rollback del débito confirmado sigue intentando reembolso");
});

test("stock descontado antes del error no se descuenta una segunda vez", async () => {
  const env = environment({ failStockAfterWrite: true });
  const first = await executeCommerceExchange(env.request("stock-uncertain"));
  assert.equal(first.ok, false);
  assert.equal(env.getStock(), 1);
  assert.equal(env.items.length, 0, "se elimina el Item conocido mediante rollback");
  assert.equal(env.buyer.system.currency.totalCopper, 500);
  assert.equal(env.merchant.flags.commerceReceipts["gm:stock-uncertain"].state, "pending");
  const second = await executeCommerceExchange(env.request("stock-uncertain"));
  assert.equal(second.ok, false);
  assert.equal(env.getStock(), 1);
});

test("no se compra sin fondos ni se cobra por encima de existencias", async () => {
  const env = environment({ stock: 1, money: 20 });
  const response = await executeCommerceExchange(env.request("poor"));
  assert.equal(response.ok, false);
  assert.equal(env.items.length, 0);
  assert.equal(env.getStock(), 1);
  assert.equal(env.buyer.system.currency.totalCopper, 20);
});

test("venta Restringida rechazada por el motor no muta dinero, stock ni recibos", async () => {
  const env = environment({ availability: "restricted", offerAvailabilityStatus: "common" });
  const response = await executeCommerceExchange(env.request("restricted-source"));
  assert.equal(response.ok, false);
  assert.match(response.error, /Restringido/);
  assert.equal(env.buyer.system.currency.totalCopper, 500);
  assert.equal(env.getStock(), 2);
  assert.equal(env.items.length, 0);
  assert.deepEqual(env.merchant.flags.commerceReceipts, {},
    "un rechazo anterior al pago no crea recibo de compra");
});

test("oferta antigua Restringida conserva veto de compra aunque el Item diga Común", async () => {
  const env = environment({ availability: "common", offerAvailabilityStatus: "restricted" });
  const response = await executeCommerceExchange(env.request("restricted-offer"));
  assert.equal(response.ok, false);
  assert.equal(env.buyer.system.currency.totalCopper, 500);
  assert.equal(env.getStock(), 2);
  assert.equal(env.items.length, 0);
});

test("cofre entrega objeto Restringido sin convertirlo en compraventa", async () => {
  const env = environment({ mode: "chest", availability: "restricted", offerAvailabilityStatus: "restricted" });
  const response = await executeCommerceExchange(env.request("restricted-chest"));
  assert.equal(response.ok, true);
  assert.equal(response.cost, 0);
  assert.equal(env.buyer.system.currency.totalCopper, 500);
  assert.equal(env.getStock(), 1);
  assert.equal(env.items.length, 1);
  assert.equal(env.items[0].system.acquisition.mode, "granted");
});

test("compra de un lote entrega quantity real y cobra el importe del lote", async () => {
  const env = environment({ stock: 25, price: 20, priceQuantity: 20, stacking: "stackable" });
  const result = await executeCommerceExchange(env.request("ammo-pack", 20));
  assert.equal(result.ok, true);
  assert.equal(result.cost, 20);
  assert.equal(env.buyer.system.currency.totalCopper, 480);
  assert.equal(env.getStock(), 5);
  assert.equal(env.items.length, 1);
  assert.equal(env.items[0].system.quantity, 20);
  assert.equal(env.items[0].system.acquisition.paid.amount, 20);
});
