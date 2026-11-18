import test from "node:test";
import assert from "node:assert/strict";
import { installCommerceRuntime } from "../scripts/commerce/commerce-runtime.mjs";

const gm = { id: "gm", active: true, isGM: true };
const player = { id: "player", active: true, isGM: false };
const users = [gm, player];
users.get = (id) => users.find((row) => row.id === id) ?? null;
const messages = [];
let socketHandler;
globalThis.game = {
  user: gm, users,
  socket: {
    on(channel, handler) {
      assert.equal(channel, "system.tierra-magica");
      socketHandler = handler;
    },
    emit(channel, message) { messages.push(message); }
  }
};
globalThis.Hooks = { on() {} };
globalThis.ui = { notifications: { warn() {} } };

const source = {
  documentName: "Item", uuid: "Item.source", name: "Espada", type: "weapon",
  system: { stacking: "unique", physical: { priceStatus: "exact", priceCopper: 30, priceQuantity: 1 } },
  toObject() { return { name: "Espada", type: "weapon", system: structuredClone(this.system) }; }
};
const merchant = {
  uuid: "Actor.shop", type: "npc",
  flags: { commerce: {
    mode: "merchant", tier: "metropolis", specialty: "smith",
    offers: [{ id: "offer", uuid: source.uuid, name: "Espada", type: "weapon",
      stock: 3, minTier: 1, specialty: "smith", priceCopper: 30, priceQuantity: 1 }]
  }, commerceReceipts: {} },
  getFlag(scope, key) { return structuredClone(this.flags[key]); },
  async setFlag(scope, key, value) { this.flags[key] = structuredClone(value); }
};
const items = [];
const buyer = {
  uuid: "Actor.buyer", type: "character",
  system: { creation: { status: "complete" }, currency: { totalCopper: 200 } },
  testUserPermission(user) { return user.id === "player"; },
  async update(changes) { this.system.currency.totalCopper = changes["system.currency.totalCopper"]; },
  async createEmbeddedDocuments(name, rows) {
    assert.equal(name, "Item");
    const item = { ...rows[0], async delete() { items.splice(items.indexOf(item), 1); } };
    items.push(item);
    return [item];
  }
};
globalThis.fromUuid = async (uuid) =>
  ({ [source.uuid]: source, [merchant.uuid]: merchant, [buyer.uuid]: buyer })[uuid] ?? null;
installCommerceRuntime();

const request = (id, requesterId = "player") => ({
  scope: "npc-commerce", kind: "request", requestId: id, requesterId,
  merchantUuid: merchant.uuid, buyerUuid: buyer.uuid, offerId: "offer", quantity: 1
});

test("socket rechaza remitente ausente, suplantado o DJ autodeclarado", async () => {
  assert.equal(typeof socketHandler, "function");
  await socketHandler(request("no-sender"), undefined);
  await socketHandler(request("spoof-gm", "gm"), "player");
  await socketHandler(request("spoof-player", "player"), "gm");
  await socketHandler(request("wrong-person", "gm"), "player");
  await socketHandler(request("nonexistent", "ghost"), "ghost");
  assert.equal(messages.length, 0);
  assert.equal(items.length, 0);
  assert.equal(buyer.system.currency.totalCopper, 200);
  assert.equal(merchant.flags.commerce.offers[0].stock, 3);
  assert.deepEqual(merchant.flags.commerceReceipts, {});
});

test("socket autentificado ejecuta compra de jugador una sola vez", async () => {
  await socketHandler(request("trusted-player"), "player");
  assert.equal(messages.length, 1);
  assert.equal(messages[0].result.ok, true);
  assert.equal(messages[0].requesterId, "player");
  assert.equal(items.length, 1);
  assert.equal(buyer.system.currency.totalCopper, 170);
  assert.equal(merchant.flags.commerce.offers[0].stock, 2);
  await socketHandler(request("trusted-player"), "player");
  assert.equal(messages.length, 2);
  assert.deepEqual(messages[1].result, messages[0].result);
  assert.equal(items.length, 1);
});

test("respuestas sin emisor DJ autenticado no pueden alterar un recibo", async () => {
  // El DJ receptor no tiene solicitudes locales pendientes: no debe emitir
  // respuesta ni ejecutar acciones aunque reciba una respuesta falsificada.
  const before = messages.length;
  await socketHandler({ scope: "npc-commerce", kind: "response",
    requesterId: "gm", requestId: "unregistered", result: { ok: true } }, "player");
  await socketHandler({ scope: "npc-commerce", kind: "response",
    requesterId: "gm", requestId: "unregistered", result: { ok: true } }, undefined);
  assert.equal(messages.length, before);
  assert.equal(items.length, 1);
});
