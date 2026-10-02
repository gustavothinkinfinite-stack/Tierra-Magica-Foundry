import test from "node:test";
import assert from "node:assert/strict";
import {
  maneuverMargin,
  pushDistance,
  disarmDefense,
  disarmOutcome,
  fallControlDifficulty,
  fallControlReduction,
  resolveFallDamage,
  intimidationOutcome
} from "../scripts/rules/combat-situations.mjs";

test("margen de maniobra usa Ajustado Claro y Dominante",()=>{
  assert.deepEqual(maneuverMargin(13,14),{success:false,margin:-1,degree:"failure"});
  assert.deepEqual(maneuverMargin(14,14),{success:true,margin:0,degree:"adjusted"});
  assert.deepEqual(maneuverMargin(19,14),{success:true,margin:5,degree:"clear"});
  assert.deepEqual(maneuverMargin(24,14),{success:true,margin:10,degree:"dominant"});
});

test("Empujar desplaza 1/2/3 espacios y respeta Escala",()=>{
  assert.equal(pushDistance(14,14).spaces,1);
  assert.equal(pushDistance(19,14).spaces,2);
  assert.equal(pushDistance(24,14).spaces,3);
  assert.equal(pushDistance(14,14,{scaleDifference:1}).spaces,0);
  assert.equal(pushDistance(19,14,{scaleDifference:1}).spaces,1);
  assert.equal(pushDistance(30,14,{scaleDifference:2}).spaces,0);
  assert.equal(pushDistance(13,14).spaces,0);
});

test("Desarmar protege agarre a dos manos y no arranca objetos asegurados",()=>{
  assert.equal(disarmDefense(14),14);
  assert.equal(disarmDefense(14,{twoHanded:true}),16);
  assert.equal(disarmDefense(14,{secured:true}),Infinity);
  assert.equal(disarmOutcome(14,14).result,"dropped");
  assert.equal(disarmOutcome(19,14).result,"adjacent");
  assert.equal(disarmOutcome(24,14,{freeHand:true}).result,"seized");
  assert.equal(disarmOutcome(99,14,{secured:true,freeHand:true}).result,"secured");
});

test("caída: el primer espacio no daña y cada espacio posterior suma 2",()=>{
  assert.equal(resolveFallDamage(0).damage,0);
  assert.equal(resolveFallDamage(1).damage,0);
  assert.equal(resolveFallDamage(2).damage,2);
  assert.equal(resolveFallDamage(4).damage,6);
  assert.equal(resolveFallDamage(8).damage,14);
  assert.equal(resolveFallDamage(12).damage,22);
});

test("Acrobacia de caída escala DF y reduce 1/2/3 espacios por margen",()=>{
  assert.equal(fallControlDifficulty(1),null);
  assert.equal(fallControlDifficulty(2),10);
  assert.equal(fallControlDifficulty(3),12);
  assert.equal(fallControlDifficulty(8),22);
  assert.equal(fallControlDifficulty(20),24);
  assert.equal(fallControlReduction(21,22),0);
  assert.equal(fallControlReduction(22,22),1);
  assert.equal(fallControlReduction(27,22),2);
  assert.equal(fallControlReduction(32,22),3);
});

test("caída aplica sólo Protección especial explícitamente compatible",()=>{
  assert.deepEqual(resolveFallDamage(6,{controlledReduction:1,environmentalReduction:1,specialProtection:2}),{
    spaces:6,effectiveSpaces:4,rawDamage:6,specialProtection:2,damage:4
  });
});

test("Intimidación usa el mismo umbral de éxito contra Defensa Mental",()=>{
  assert.equal(intimidationOutcome(15,15).success,true);
  assert.equal(intimidationOutcome(14,15).success,false);
});
