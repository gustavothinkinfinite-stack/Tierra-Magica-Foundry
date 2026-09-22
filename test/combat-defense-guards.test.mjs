import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("el integrador defensivo aplica Guardia Parada y Contraataque", async () => {
  const source = await readFile(new URL("../scripts/rules/combat-defense-guards.mjs", import.meta.url), "utf8");
  const entry = await readFile(new URL("../scripts/tierra-magica.mjs", import.meta.url), "utf8");
  assert.equal(entry.includes('import { installCombatDefenseGuards } from "./rules/combat-defense-guards.mjs"'), true);
  assert.equal(entry.includes("installCombatDefenseGuards(TierraMagicaActor)"), true);
  assert.equal(source.includes('this.system.derived.defense = number(this.system.derived.defense, 0) + 2'), true);
  assert.equal(source.includes('"system.turn.action": false, "system.combat.guardActive": true'), true);
  assert.equal(source.includes('"system.turn.reaction": false'), true);
  assert.equal(source.includes('"system.combat.parryActive": true'), true);
  assert.equal(source.includes('if (!this.system.combat?.parrySucceeded)'), true);
  assert.equal(source.includes('"system.combat.counterattackUsed": true'), true);
});

test("la Parada se consume y sólo habilita Contraataque cuando cambia impacto por fallo", async () => {
  const source = await readFile(new URL("../scripts/rules/combat-defense-guards.mjs", import.meta.url), "utf8");
  assert.equal(source.includes("total >= baseDefense && total < baseDefense + 2"), true);
  assert.equal(source.includes('"system.combat.parryActive": false'), true);
  assert.equal(source.includes('"system.combat.parrySucceeded": succeeded'), true);
});

test("Combate Dual aplica Parada sólo al primer ataque de la secuencia", async () => {
  const source = await readFile(new URL("../scripts/rules/combat-defense-guards.mjs", import.meta.url), "utf8");
  assert.equal(source.includes("ActorClass.prototype.dualWieldAttack = async function"), true);
  assert.equal(source.includes("const parryThisAttack = index === 0"), true);
  assert.equal(source.includes("baseDefense + (parryThisAttack ? 2 : 0)"), true);
  assert.equal(source.includes("if (parryThisAttack) await closeParry"), true);
});

test("Barrido conserva una tirada pero resuelve Defensa y Parada por objetivo", async () => {
  const source = await readFile(new URL("../scripts/rules/combat-defense-guards.mjs", import.meta.url), "utf8");
  assert.equal(source.includes("ActorClass.prototype.sweepAttack = async function"), true);
  assert.equal(source.includes("df: null, modifier: -2"), true);
  assert.equal(source.includes("baseDefenses[index] + (target.system?.combat?.parryActive ? 2 : 0)"), true);
  assert.equal(source.includes("attackHits(total, defenses[i])"), true);
  assert.equal(source.includes("await closeParry(target, total, baseDefenses[i])"), true);
});
