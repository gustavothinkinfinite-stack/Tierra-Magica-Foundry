import assert from "node:assert/strict";
import test from "node:test";
import {
  clamp, rankBonus, defenseBonus, rollFormula, classifyResult, extraordinaryTag, finalDamage, severeThreshold, toNumber
} from "../scripts/rules.mjs";

test("rangos de habilidad usan la progresión del Manual v0.1", () => {
  assert.equal(rankBonus(0), 0);
  assert.equal(rankBonus(1), 1);
  assert.equal(rankBonus(2), 2);
  assert.equal(rankBonus(3), 4);
  assert.equal(rankBonus(4), 6);
  assert.equal(rankBonus(5), 8);
});

test("bono defensivo marcial usa +0/+0/+1/+2/+3/+4", () => {
  assert.deepEqual([0,1,2,3,4,5].map((r) => defenseBonus(r)), [0,0,1,2,3,4]);
});

test("fórmulas de Ventaja y Desventaja conservan dos dados", () => {
  assert.equal(rollFormula("normal", 3), "2d10 + 3");
  assert.equal(rollFormula("advantage", 3), "3d10kh2 + 3");
  assert.equal(rollFormula("disadvantage", -2), "3d10kl2 - 2");
});

test("grados de resultado solo se calculan cuando una regla los necesita", () => {
  assert.deepEqual(classifyResult(14, 14), { success: true, degree: "Ajustado", margin: 0 });
  assert.equal(classifyResult(19, 14).degree, "Claro");
  assert.equal(classifyResult(24, 14).degree, "Dominante");
  assert.equal(classifyResult(13, 14).success, false);
});

test("daño, protección, penetración y umbral grave", () => {
  assert.equal(finalDamage(7, 0, 0, 5, 3), 5);
  assert.equal(finalDamage(5, 2, 0, 3, 0), 4);
  assert.equal(severeThreshold(3), 8);
});

test("utilidades numéricas", () => {
  assert.equal(toNumber("4"), 4);
  assert.equal(toNumber("x", 7), 7);
  assert.equal(clamp(15, 0, 10), 10);
});

test("Hazaña/Pifia 1.0 usan suma natural y éxito/fallo",()=>{const mk=(a,b)=>({dice:[{results:[{result:a,active:true},{result:b,active:true}]}]});assert.equal(extraordinaryTag(mk(9,9),{success:true}),"Hazaña");assert.equal(extraordinaryTag(mk(10,8),{success:false}),"");assert.equal(extraordinaryTag(mk(1,3),{success:false}),"Pifia");assert.equal(extraordinaryTag(mk(1,3),{success:true}),"");});
