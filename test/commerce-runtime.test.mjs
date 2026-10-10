import test from "node:test";
import assert from "node:assert/strict";
import { executeCommerceExchange } from "../scripts/commerce/commerce-runtime.mjs";

function environment({ mode = "merchant", stock = 2, money = 500, price = 30, priceQuantity = 1, stacking = "unique", failCreation = false } = {}) {
  const gm = { id: "gm", isGM: true, active: true };
  const users = [gm];
  users.get = (id) => id === gm.id ? gm : null;
  globalThis.game = { user: gm, users };
  const source = {
    documentName: "Item", uuid: "Item.source", name: "Espada",
    type: "weapon", img: "test.svg",
    system: { stacking, physical: {
      quantity: 1, priceStatus: price === null ? "unset" : "exact",
      priceCopper: price ?? 0, priceQuantity
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
          stock, minTier: 1, specialty: "smith", priceCopper: price, priceQuantity }
      ] },
      commerceReceipts: {}
    },
    getFlag(scope, key) { return structuredClone(this.flags[key]); },
    async setFlag(scope, key, data) {
      this.flags[key] = structuredClone(data);
      if (key === "commerce") stockValue = data.offers[0].stock;
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

test("no se compra sin fondos ni se cobra por encima de existencias", async () => {
  const env = environment({ stock: 1, money: 20 });
  const response = await executeCommerceExchange(env.request("poor"));
  assert.equal(response.ok, false);
  assert.equal(env.items.length, 0);
  assert.equal(env.getStock(), 1);
  assert.equal(env.buyer.system.currency.totalCopper, 20);
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
