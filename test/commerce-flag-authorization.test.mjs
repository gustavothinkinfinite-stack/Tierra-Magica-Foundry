import test from "node:test";
import assert from "node:assert/strict";
import { changesProtectedCommerceFlags, installCommerceRuntime } from "../scripts/commerce/commerce-runtime.mjs";

test("detecta las cuatro formas de modificar comercio o recibos", () => {
  const forbidden = [
    { "flags.tierra-magica.commerce": { offers: [] } },
    { "flags.tierra-magica.commerce.offers": [] },
    { "flags.tierra-magica.commerceReceipts": {} },
    { "flags.tierra-magica.commerceReceipts.gm:operation": null },
    { flags: { "tierra-magica": { commerce: { offers: [] } } } },
    { flags: { "tierra-magica": { commerceReceipts: {} } } },
    { "flags.tierra-magica": { commerce: { offers: [] } } },
    { flags: { "tierra-magica.commerce": { offers: [] } } },
    { "flags.tierra-magica.-=commerce": null },
    { flags: { "tierra-magica": { "-=commerceReceipts": null } } }
  ];
  for (const changes of forbidden) assert.equal(changesProtectedCommerceFlags(changes), true,
    JSON.stringify(changes));
});

test("no bloquea otras flags o modificaciones normales de un Actor", () => {
  const permitted = [
    {}, { name: "NPC renombrado" },
    { flags: { "tierra-magica": { npcProfile: { name: "Guardián" } } } },
    { "flags.tierra-magica.npcProfile": { name: "Guardián" } },
    { flags: { someModule: { commerce: "no es Tierra Mágica" } } },
    { "flags.tierra-magica": { npcProfile: {} } }
  ];
  for (const changes of permitted) assert.equal(changesProtectedCommerceFlags(changes), false,
    JSON.stringify(changes));
});

test("preUpdateActor del jugador rechaza mutaciones protegidas y permite otras", () => {
  let hook;
  let warnings = 0;
  globalThis.game = { user: { isGM: false }, socket: {
    on() {}
  } };
  globalThis.Hooks = { on(name, callback) { if (name === "preUpdateActor") hook = callback; } };
  globalThis.ui = { notifications: { warn() { warnings++; } } };
  installCommerceRuntime();
  assert.equal(typeof hook, "function");
  assert.equal(hook({ type: "npc" }, {
    flags: { "tierra-magica": { commerceReceipts: { "gm:tx": {} } } }
  }), false);
  assert.equal(warnings, 1);
  assert.equal(hook({ type: "npc" }, { name: "Herrero" }), undefined);
  assert.equal(hook({ type: "character" }, { "flags.tierra-magica.commerce": {} }), undefined);
  assert.equal(warnings, 1);
});
