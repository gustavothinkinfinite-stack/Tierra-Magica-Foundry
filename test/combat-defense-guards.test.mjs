import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("el integrador defensivo usa la autoridad contextual común", async () => {
  const source = await readFile(new URL("../scripts/rules/combat-defense-guards.mjs", import.meta.url), "utf8");
  const entry = await readFile(new URL("../scripts/tierra-magica.mjs", import.meta.url), "utf8");
  assert.equal(entry.includes('import { installCombatDefenseGuards } from "./rules/combat-defense-guards.mjs"'), true);
  assert.equal(entry.includes("installCombatDefenseGuards(TierraMagicaActor)"), true);
  assert.equal(source.includes('from "./defense-context.mjs"'), true);
  assert.equal(source.includes("resolveActorDefense(target"), true);
  assert.equal(source.includes("prepareDerivedData"), false);
  assert.equal(source.includes("this.system.derived.defense ="), false);
});

test("Guardia persiste estado pero no muta derived manualmente", async () => {
  const source = await readFile(new URL("../scripts/rules/combat-defense-guards.mjs", import.meta.url), "utf8");
  assert.equal(source.includes('"system.turn.action": false, "system.combat.guardActive": true'), true);
  assert.equal(source.includes("guardDefense"), false);
});

test("Parada se reclama antes del ataque parable y mide si cambió impacto por fallo", async () => {
  const source = await readFile(new URL("../scripts/rules/combat-defense-guards.mjs", import.meta.url), "utf8");
  assert.equal(source.includes('if (!ownsTechnique(this, "Parada"))'), true);
  assert.equal(source.includes("claimParryAuthoritatively(target)"), true);
  assert.equal(source.includes("const parryBonus = parryPending ? 2 : 0"), true);
  assert.equal(source.includes("total >= baseDefense"), true);
  assert.equal(source.includes("total < parryDefense"), true);
  assert.equal(source.includes("resolveParryAuthoritatively(target, succeeded)"), true);
});

test("Combate Dual aplica Barrera sólo al primer ataque y Parada al primer ataque parable", async () => {
  const source = await readFile(new URL("../scripts/rules/combat-defense-guards.mjs", import.meta.url), "utf8");
  assert.equal(source.includes("const kineticThisAttack = kineticPending && index === 0"), true);
  assert.equal(source.includes("const parryThisAttack = parryPending && !isRangedWeapon(weapon)"), true);
  assert.equal(source.includes("attackDefense(target, weapon"), true);
  assert.equal(source.includes("await closeClaimedParry(target, total, baseDefense, defense)"), true);
});

test("Barrido resuelve contexto defensivo por objetivo", async () => {
  const source = await readFile(new URL("../scripts/rules/combat-defense-guards.mjs", import.meta.url), "utf8");
  assert.equal(source.includes("const resolutions = targets.map((target)"), true);
  assert.equal(source.includes("attackHits(total, resolved.defense)"), true);
  assert.equal(source.includes("resolved.parry"), true);
  assert.equal(source.includes("claims.get(key)"), true);
  assert.equal(source.includes("parryClaims.get(key)"), true);
  assert.equal(source.includes("const kineticBonus = kinetic ? 2 : 0"), true);
});

test("magia no usa Parada y resuelve Defensa normal por el mismo motor", async () => {
  const magic = await readFile(new URL("../scripts/rules/magic-guards.mjs", import.meta.url), "utf8");
  assert.equal(magic.includes('resolveActorDefense(target, { kind: "normal", kineticBarrier: false, parryable: false, frontal: false })'), true);
  assert.equal(magic.includes("claimKineticBarrier"), true);
  assert.equal(magic.includes("parryActive"), false);
  assert.equal(magic.includes("claimParryAuthoritatively"), false);
});


test("Contraataque reutiliza el wrapper contextual y no salta consumo de Barrera", async () => {
  const source = await readFile(new URL("../scripts/rules/combat-defense-guards.mjs", import.meta.url), "utf8");
  assert.equal(source.includes('return this.rollWeapon(item, { technique: "Contraataque", tmReactionAttack: true })'), true);
  assert.equal(source.includes('return originalRollWeapon.call(this, item, { technique: "Contraataque", tmReactionAttack: true })'), false);
});
