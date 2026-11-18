import test from "node:test";
import assert from "node:assert/strict";
import { executeCommerceExchange } from "../scripts/commerce/commerce-runtime.mjs";

function environment({ mode = "merchant", stock = 2, money = 500, price = 30, priceQuantity = 1, stacking = "unique", failCreation = false, availability, offerAvailabilityStatus, initialReceipts = {} } = {}) {
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

test("rotación de 128 recibos cerrados conserva todas las operaciones pendientes", async () => {
  const initialReceipts = Object.fromEntries([
    ["gm:unresolved-old", { state: "pending",
      fingerprint: JSON.stringify(["gm", "Actor.shop", "Actor.buyer", "offer", 1]), at: 1 }],
    ...Array.from({ length: 145 }, (_, index) =>
      ["gm:historical-" + index, { state: "completed", result: { ok: true }, at: index + 2 }])
  ]);
  const env = environment({ stock: 2, initialReceipts });
  const result = await executeCommerceExchange(env.request("fresh"));
  assert.equal(result.ok, true);
  const receipts = env.merchant.flags.commerceReceipts;
  assert.equal(receipts["gm:unresolved-old"].state, "pending");
  assert.equal(receipts["gm:fresh"].state, "completed");
  assert.equal(Object.values(receipts).filter((row) => row.state === "completed").length, 128);
  assert.equal(Object.values(receipts).filter((row) => row.state === "pending").length, 1);
  const duplicate = await executeCommerceExchange(env.request("unresolved-old"));
  assert.equal(duplicate.ok, false);
  assert.match(duplicate.error, /pendiente/i);
  assert.equal(env.items.length, 1, "no se duplica la entrega durante conciliación manual");
  assert.equal(env.getStock(), 1);
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
