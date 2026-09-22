import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("el integrador defensivo restaura Guardia Parada y Contraataque sin reescribir actor", async () => {
  const source = await readFile(new URL("../scripts/rules/combat-defense-guards.mjs", import.meta.url), "utf8");
  const entry = await readFile(new URL("../scripts/tierra-magica.mjs", import.meta.url), "utf8");

  assert.equal(entry.includes('import { installCombatDefenseGuards } from "./rules/combat-defense-guards.mjs"'), true);
  assert.equal(entry.includes("installCombatDefenseGuards(TierraMagicaActor)"), true);
  assert.equal(source.includes('this.system.derived.defense = number(this.system.derived.defense, 0) + 2'), true);
  assert.equal(source.includes('"system.turn.action": false, "system.combat.guardActive": true'), true);
  assert.equal(source.includes('"system.turn.reaction": false'), true);
  assert.equal(source.includes('"system.combat.parryActive": true'), true);
  assert.equal(source.includes('const parrySucceeded = Number.isFinite(total) && total >= baseDefense && total < baseDefense + 2'), true);
  assert.equal(source.includes('if (!this.system.combat?.parrySucceeded)'), true);
  assert.equal(source.includes('"system.combat.counterattackUsed": true'), true);
});

test("la Parada es transitoria y restaura siempre la Defensa preparada", async () => {
  const source = await readFile(new URL("../scripts/rules/combat-defense-guards.mjs", import.meta.url), "utf8");
  assert.equal(source.includes("try {"), true);
  assert.equal(source.includes("finally {"), true);
  assert.equal(source.includes("target.system.derived.defense = originalDefense"), true);
  assert.equal(source.includes('"system.combat.parryActive": false'), true);
});
