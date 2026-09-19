import assert from "node:assert/strict";
import test from "node:test";
import { abilityModifier, clamp, defense, rankBonus, signed, skillTotal, toNumber } from "../scripts/rules.mjs";

test("calcula modificadores al estilo d20", () => {
  assert.equal(abilityModifier(8), -1);
  assert.equal(abilityModifier(10), 0);
  assert.equal(abilityModifier(18), 4);
});

test("los grados suman nivel, competencia y dominio", () => {
  assert.equal(rankBonus(0, 5, 2), 0);
  assert.equal(rankBonus(1, 5, 2), 7);
  assert.equal(rankBonus(2, 5, 2), 9);
  assert.equal(rankBonus(4, 5, 2), 13);
});

test("calcula habilidades y defensas", () => {
  assert.equal(skillTotal({ modifier: 3, rank: 2, level: 4, proficiency: 2, bonus: 1 }), 12);
  assert.equal(defense(10, 3, 2), 15);
});

test("normaliza números y presentación", () => {
  assert.equal(toNumber("4"), 4);
  assert.equal(toNumber("x", 7), 7);
  assert.equal(clamp(15, 0, 10), 10);
  assert.equal(signed(3), "+3");
  assert.equal(signed(-2), "-2");
});
