import test from "node:test";
import assert from "node:assert/strict";
import { runCommerceReceiptRecoveryFlow } from "../scripts/commerce/commerce-ui.mjs";
import { createCommerceReceiptBackup } from "../scripts/commerce/commerce-runtime.mjs";

function setup(receipts = {}) {
  const gm = { id: "gm", active: true, isGM: true };
  const users = [gm];
  users.get = (id) => id === "gm" ? gm : null;
  globalThis.game = { user: gm, users };
  const actor = {
    id: "merchant", uuid: "Actor.shop", type: "npc",
    flags: { commerceReceipts: structuredClone(receipts) },
    getFlag(scope, key) { return structuredClone(this.flags[key]); },
    async setFlag(scope, key, value) { this.flags[key] = structuredClone(value); }
  };
  return { actor, gm };
}

function upload(json) {
  return { size: new TextEncoder().encode(json).length, async text() { return json; } };
}

test("recuperación desde interfaz cancela sin escribir tras una previsualización válida", async () => {
  const original = setup({ "gm:old": { state: "completed", fingerprint: "fp", at: 1, result: { ok: true } } });
  const file = upload(createCommerceReceiptBackup(original.actor));
  const current = setup();
  let confirmations = 0;
  const outcome = await runCommerceReceiptRecoveryFlow(current.actor, file, {
    confirm: async (preview) => { confirmations++; assert.equal(preview.missing, 1); return false; }
  });
  assert.equal(outcome.cancelled, true);
  assert.equal(confirmations, 1);
  assert.deepEqual(current.actor.flags.commerceReceipts, {});
});

test("conflictos bloquean la confirmación y preservan todos los recibos locales", async () => {
  const source = setup({
    "gm:same": { state: "pending", fingerprint: "source", at: 1 },
    "gm:missing": { state: "archived", fingerprint: "missing", at: 1 }
  });
  const file = upload(createCommerceReceiptBackup(source.actor));
  const current = setup({ "gm:same": { state: "pending", fingerprint: "different", at: 1 } });
  let asked = false;
  const outcome = await runCommerceReceiptRecoveryFlow(current.actor, file, {
    confirm: async () => { asked = true; return true; }
  });
  assert.equal(outcome.blocked, true);
  assert.equal(outcome.preview.conflicts, 1);
  assert.equal(asked, false);
  assert.equal(current.actor.flags.commerceReceipts["gm:missing"], undefined);
});

test("confirmación del DJ incorpora sólo marcadores, sin reproducir un recibo completado", async () => {
  const source = setup({ "gm:closed": {
    state: "completed", fingerprint: "stored", at: 2, result: { ok: true }
  } });
  const file = upload(createCommerceReceiptBackup(source.actor));
  const current = setup();
  const outcome = await runCommerceReceiptRecoveryFlow(current.actor, file, {
    confirm: async () => true
  });
  assert.equal(outcome.ok, true);
  assert.equal(outcome.recovered, 1);
  assert.deepEqual(current.actor.flags.commerceReceipts["gm:closed"], {
    state: "archived", fingerprint: "stored", at: 2
  });
  const again = await runCommerceReceiptRecoveryFlow(current.actor, file, {
    confirm: () => { throw Error("No debería pedir confirmación sin faltantes"); }
  });
  assert.equal(again.ok, true);
  assert.equal(again.recovered, 0);
});

test("archivo ausente, alterado, demasiado grande y sin confirmación se rechazan", async () => {
  const { actor } = setup();
  assert.equal((await runCommerceReceiptRecoveryFlow(actor, null)).ok, false);
  assert.equal((await runCommerceReceiptRecoveryFlow(actor,
    { size: 2_000_001, text: async () => "{}" })).ok, false);
  assert.equal((await runCommerceReceiptRecoveryFlow(actor,
    { size: 3, text: async () => "x".repeat(2_000_001) })).ok, false);
  assert.equal((await runCommerceReceiptRecoveryFlow(actor, upload("{invalid"))).ok, false);

  const source = setup({ "gm:old": { state: "archived", fingerprint: "saved", at: 1 } });
  const backup = upload(createCommerceReceiptBackup(source.actor));
  const live = setup();
  const unconfirmed = await runCommerceReceiptRecoveryFlow(live.actor, backup);
  assert.equal(unconfirmed.ok, false);
  assert.deepEqual(live.actor.flags.commerceReceipts, {});
});

test("el usuario no DJ nunca puede iniciar la recuperación visual", async () => {
  const original = setup({ "gm:old": { state: "archived", fingerprint: "saved", at: 1 } });
  const file = upload(createCommerceReceiptBackup(original.actor));
  const current = setup();
  game.user = { id: "other", isGM: false, active: true };
  const result = await runCommerceReceiptRecoveryFlow(current.actor, file, {
    confirm: async () => true
  });
  assert.equal(result.ok, false);
  assert.deepEqual(current.actor.flags.commerceReceipts, {});
});
