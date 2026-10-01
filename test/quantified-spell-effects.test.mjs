import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("los lanzamientos automáticos válidos cuentan como éxito para efectos posteriores", async () => {
  const { spellSucceeded } = await import("../scripts/rules/spell-outcome-guards.mjs");
  assert.equal(spellSucceeded({}, { system: {} }, { tmAutomaticSpell: true }), true);
});

test("Proyectil Ígneo tiene una sola autoridad de daño", async () => {
  const magic = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  const outcome = await readFile(resolve(root, "scripts/rules/spell-outcome-guards.mjs"), "utf8");
  assert.equal(magic.includes("resolveSpellImpacts(item, hitTargets, { protectionContext:"), true);
  assert.equal(outcome.includes("resolveSpellImpact"), false);
  assert.equal(outcome.includes("pendingDamageRequest"), false);
});

test("Barrera Cinética concede +2 Defensa y expira tras el ataque declarado", async () => {
  const combat = await readFile(resolve(root, "scripts/rules/combat-defense-guards.mjs"), "utf8");
  const magic = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  const outcome = await readFile(resolve(root, "scripts/rules/spell-outcome-guards.mjs"), "utf8");
  const turn = await readFile(resolve(root, "scripts/rules/turn-economy.mjs"), "utf8");
  const derived = await readFile(resolve(root, "scripts/rules/derived-state.mjs"), "utf8");
  const authority = await readFile(resolve(root, "scripts/rules/state-authority.mjs"), "utf8");
  assert.equal(outcome.includes('"system.combat.kineticBarrierActive": true'), true);
  assert.equal(derived.includes('kineticDefenseSource || "Barrera Cinética"'), true);
  assert.equal(derived.includes('context: "kineticBarrier"'), true);
  assert.equal(combat.includes("const kineticThisAttack = kineticPending && index === 0"), true);
  assert.equal(magic.includes('kineticBarrier: true'), true);
  assert.equal(turn.includes('"system.combat.kineticBarrierActive": false'), true);
  assert.equal(turn.includes('"system.combat.kineticDefenseSource": ""'), true);
  assert.equal(combat.includes("claimKineticBarrier"), true);
  assert.equal(magic.includes("claimKineticBarrier"), true);
  assert.equal(authority.includes('"system.combat.kineticDefenseSource": ""'), true);
});

test("Piel Alterada no se convierte incorrectamente en Protección universal", async () => {
  const content = await readFile(resolve(root, "scripts/content.mjs"), "utf8");
  const derived = await readFile(resolve(root, "scripts/rules/derived-state.mjs"), "utf8");
  assert.match(content, /Piel Alterada[\s\S]*?Protección 2 contra categoría coherente; no acumula con armadura/);
  assert.equal(derived.includes('context: "alteredSkinCompatible"'), true);
  assert.equal(derived.includes('stacking: "max-with-armor"'), true);
});

test("Potencia Sobrenatural no inventa bonos numéricos de FUE, daño o Defensa", async () => {
  const content = await readFile(resolve(root, "scripts/content.mjs"), "utf8");
  assert.match(content, /Potencia Sobrenatural[\s\S]*?no aumenta FUE\/daño\/Defensa/);
});
