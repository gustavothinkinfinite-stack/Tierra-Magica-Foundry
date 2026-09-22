import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("los rituales no convierten recursos declarados en recursos existentes", async () => {
  const source = await readFile(new URL("../scripts/rules/ritual-guards.mjs", import.meta.url), "utf8");
  const entry = await readFile(new URL("../scripts/tierra-magica.mjs", import.meta.url), "utf8");
  assert.equal(entry.includes('import { installRitualGuards } from "./rules/ritual-guards.mjs"'), true);
  assert.equal(entry.includes("installRitualGuards(TierraMagicaActor)"), true);
  assert.equal(source.includes("assistantMana > 0 || flowRequired > 0 || Boolean(components)"), true);
  assert.equal(source.includes("await Dialog.confirm({"), true);
  assert.equal(source.includes("if (!confirmed) return null"), true);
  assert.equal(source.indexOf("if (!confirmed) return null") < source.indexOf("return original.call(this, item, options)"), true);
});

test("la guarda no inventa descuento de recursos ajenos", async () => {
  const source = await readFile(new URL("../scripts/rules/ritual-guards.mjs", import.meta.url), "utf8");
  assert.equal(source.includes("adjustResource"), false);
  assert.equal(source.includes("resources.mana.value"), false);
  assert.equal(source.includes("Foundry no los crea ni los descuenta automáticamente"), true);
});
