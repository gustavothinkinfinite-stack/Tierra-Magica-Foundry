import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CANONICAL_ITEM_PRICES,
  combineCurrency,
  formatCurrency,
  planActorCurrencyMigration,
  saleValueCopper,
  splitCurrency
} from "../scripts/rules/currency.mjs";

test("CREA-09 descompone y recompone el saldo con una única fuente en cobres", () => {
  assert.deepEqual(splitCurrency(237), { totalCopper: 237, gold: 2, silver: 3, copper: 7 });
  assert.equal(combineCurrency({ gold: 2, silver: 3, copper: 7 }), 237);
  assert.equal(formatCurrency(237), "2 o 3 p 7 c");
  assert.equal(formatCurrency(200), "2 o");
  assert.equal(formatCurrency(0), "0 c");
});

test("CREA-09 rechaza denominaciones negativas o fraccionarias", () => {
  assert.equal(combineCurrency({ gold: 1, silver: -1, copper: 0 }), null);
  assert.equal(combineCurrency({ gold: 0, silver: 0, copper: 1.5 }), null);
});

test("la reventa parcial redondea una sola vez hacia abajo", () => {
  assert.equal(saleValueCopper({ priceCopper: 50, priceQuantity: 12, quantity: 6, rate: 0.25 }), 6);
  assert.equal(saleValueCopper({ priceCopper: 30, priceQuantity: 1, quantity: 2, rate: 0.25 }), 15);
  assert.equal(
    saleValueCopper({ priceCopper: 30, priceQuantity: 1, quantity: 1, rate: 0.25 }) * 2 <=
      saleValueCopper({ priceCopper: 30, priceQuantity: 1, quantity: 2, rate: 0.25 }),
    true
  );
});

test("crowns legados nunca reciben una equivalencia automática", () => {
  const plan = planActorCurrencyMigration({ crowns: 100, gold: null, silver: null, copper: null });
  assert.equal(plan.totalCopper, 0);
  assert.equal(plan.pending, true);
  assert.equal(plan.preserveLegacy.crowns, 100);
  assert.equal(plan.reason, "crowns");
});

test("crowns sigue pendiente aunque el nuevo template aporte totalCopper 0 por defecto", () => {
  const plan = planActorCurrencyMigration({ totalCopper: 0, migrationVersion: 1, crowns: 100, gold: null, silver: null, copper: null });
  assert.equal(plan.totalCopper, 0);
  assert.equal(plan.pending, true);
  assert.equal(plan.reason, "crowns");
});

test("denominaciones legadas claras migran exactamente", () => {
  const plan = planActorCurrencyMigration({ gold: 2, silver: 3, copper: 7 });
  assert.equal(plan.totalCopper, 237);
  assert.equal(plan.pending, false);
});

test("un saldo canónico existente prevalece y crowns no se suma", () => {
  const plan = planActorCurrencyMigration({ totalCopper: 237, crowns: 100 });
  assert.equal(plan.totalCopper, 237);
  assert.equal(plan.pending, false);
  assert.equal(plan.preserveLegacy.crowns, 100);
});

test("los precios de calibración de CREA-08 se expresan exactamente en cobres", () => {
  assert.equal(CANONICAL_ITEM_PRICES["Rifle temprano"].priceCopper, 1800);
  assert.equal(CANONICAL_ITEM_PRICES["Pistola repetidora"].priceCopper, 3500);
  assert.equal(CANONICAL_ITEM_PRICES["Malla"].priceCopper, 1000);
  assert.deepEqual(CANONICAL_ITEM_PRICES["Flechas"], { priceCopper: 20, priceQuantity: 20 });
});
