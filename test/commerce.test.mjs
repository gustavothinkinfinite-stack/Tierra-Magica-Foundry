import test from "node:test";
import assert from "node:assert/strict";
import {
  COMMERCE_TIERS, COMMERCE_SPECIALTIES, createCommerceOffer,
  normalizeCommerce, offerAvailabilityTier, quoteCommerce, tierLevel
} from "../scripts/rules/commerce.mjs";

const item = (overrides = {}) => ({
  uuid: "Compendium.tierra-magica.equipment.Item.a",
  documentName: "Item", type: "armor", name: "Armadura de prueba", img: "armor.webp",
  system: { stacking: "unique", physical: {
    availability: "common", priceCopper: 100, priceQuantity: 1, priceStatus: "exact"
  } },
  ...overrides
});

function fixture({ mode = "merchant", tier = "village", specialty = "smith", stock = 2, minTier = 1 } = {}) {
  const source = item();
  const offer = { ...createCommerceOffer(source, specialty), stock, minTier };
  const config = normalizeCommerce({ mode, tier, specialty, offers: [offer] });
  return { source, config, offer: config.offers[0] };
}

test("especialidad y mercado son ejes independientes", () => {
  assert.equal(COMMERCE_TIERS.length, 4);
  assert.equal(COMMERCE_SPECIALTIES.length, 5);
  assert.equal(tierLevel("metropolis"), 4);
  assert.equal(tierLevel("village"), 1);
});

test("el nivel de disponibilidad procede del objeto, sin rebajar valores desconocidos", () => {
  assert.equal(offerAvailabilityTier(item()), 1);
  assert.equal(offerAvailabilityTier(item({ system: { physical: { availability: "rare" } } })), 3);
  assert.equal(offerAvailabilityTier(item({ system: { physical: { availability: "mystery" } } })), 4);
  assert.equal(offerAvailabilityTier(item({ system: {
    physical: { availability: "common" }, enchantment: { grade: 1, patternKey: 'enchant-test' }
  } })), 3);
});

test("una armadura de metrópolis no puede comprarse en herrería de aldea", () => {
  const { config, offer, source } = fixture({ minTier: 4 });
  const village = quoteCommerce(config, offer, source, 1);
  assert.equal(village.ok, false);
  config.tier = "metropolis";
  const metropolis = quoteCommerce(config, offer, source, 1);
  assert.deepEqual(metropolis, { ok: true, quantity: 1, cost: 100 });
});

test("la familia comercial no se omite cambiando el mercado", () => {
  const { config, offer, source } = fixture({ tier: "metropolis" });
  config.specialty = "alchemy";
  assert.equal(quoteCommerce(config, offer, source, 1).ok, false);
});

test("cofre entrega sin dinero y permite objetos raros asignados por DJ", () => {
  const { config, offer, source } = fixture({ mode: "chest", minTier: 4 });
  assert.deepEqual(quoteCommerce(config, offer, source, 2), { ok: true, quantity: 2, cost: 0 });
});

test("evita stock negativo, fracciones y precio no autorizado", () => {
  const { config, offer, source } = fixture();
  assert.equal(quoteCommerce(config, offer, source, 3).ok, false);
  assert.equal(quoteCommerce(config, offer, source, 1.5).ok, false);
  assert.equal(quoteCommerce(config, offer, source, -1).ok, false);
  const missing = item({ system: { physical: { priceStatus: "unset", priceCopper: 0, priceQuantity: 1 } } });
  offer.priceCopper = null;
  assert.equal(quoteCommerce(config, offer, missing, 1).ok, false);
});

test("precio de munición por lote se redondea hacia arriba, impidiendo compras fraccionadas gratis", () => {
  const { config, offer } = fixture({ stock: 20 });
  const source = item({ system: { physical: { priceStatus: "exact", priceCopper: 20, priceQuantity: 20 } } });
  offer.priceCopper = 20;
  offer.priceQuantity = 20;
  assert.equal(quoteCommerce(config, offer, source, 1).cost, 1);
  assert.equal(quoteCommerce(config, offer, source, 20).cost, 20);
});

test("no se acepta un UUID distinto al de la oferta ni un tipo diferente", () => {
  const { config, offer } = fixture();
  assert.equal(quoteCommerce(config, offer, item({ uuid: "Item.fake" }), 1).ok, false);
  assert.equal(quoteCommerce(config, offer, item({ type: "spell" }), 1).ok, false);
});

test("normaliza configuración inválida hacia la opción restrictiva", () => {
  const normalized = normalizeCommerce({
    mode: "free-for-all", tier: "unknown", specialty: "wizard",
    offers: [{ id: "x", uuid: "Item.y", type: "armor", stock: -3, minTier: 99, priceCopper: -100 }]
  });
  assert.equal(normalized.mode, "disabled");
  assert.equal(normalized.tier, "village");
  assert.equal(normalized.offers[0].stock, 0);
  assert.equal(normalized.offers[0].minTier, 4);
  assert.equal(normalized.offers[0].priceCopper, null);
});
