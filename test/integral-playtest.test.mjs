import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL("../" + path, import.meta.url), "utf8");

test("partida integral: Acción es una autoridad compartida entre ataque, magia, alquimia y dispositivos", async () => {
  const source = await read("scripts/rules/action-economy-guards.mjs");
  for (const route of ["useSpell", "useFormula", "useDevice", "overloadDevice", "rollWeapon", "dualWieldAttack", "sweepAttack"]) {
    assert.equal(source.includes("ActorClass.prototype." + route), true, route);
  }
  assert.match(source, /const actionLocks = new WeakSet/);
});

test("partida integral: Reacción es compartida por defensas, magia reactiva y familiar", async () => {
  const reaction = await read("scripts/rules/reaction-economy-guards.mjs");
  const familiar = await read("scripts/rules/familiar-guards.mjs");
  assert.match(reaction, /reactionLocks/);
  assert.match(familiar, /system\.turn\.reaction/);
  assert.match(familiar, /no puede encadenar otra respuesta reactiva/);
});

test("partida integral: cambio de turno restaura economía y no concede turno independiente al Familiar", async () => {
  const turn = await read("scripts/rules/turn-economy.mjs");
  assert.match(turn, /\["character", "npc"\]\.includes\(actor\.type\)/);
  for (const field of ["movement", "action", "reaction"]) assert.match(turn, new RegExp('"system\\.turn\\.' + field + '": !incapacitated'));
  for (const field of ["guardActive", "parryActive", "parrySucceeded", "counterattackUsed", "kineticBarrierActive"]) assert.match(turn, new RegExp('"system\\.combat\\.' + field + '": false'));
});

test("partida integral: 0 Vida incapacita y sólo PJ recibe Trauma automático", async () => {
  const familiar = await read("scripts/rules/familiar-guards.mjs");
  assert.match(familiar, /previous > 0 && next === 0/);
  assert.match(familiar, /this\.type === "character"[\s\S]*trauma[\s\S]*=== 0/);
  assert.match(familiar, /this\.type === "familiar"[\s\S]*familiar\.incapacitated/);
});

test("partida integral: Respiro limpia Saturación pero no recupera Vida ni Maná", async () => {
  const actor = await read("scripts/documents/actor.mjs");
  const breather = actor.slice(actor.indexOf('if (kind === "breather")'), actor.indexOf('} else if (kind === "rest")'));
  assert.match(breather, /saturatedFamilies/);
  assert.equal(breather.includes("resources.health.value"), false);
  assert.equal(breather.includes("resources.mana.value"), false);
});

test("partida integral: Descanso y descanso completo respetan topes y reinician sólo recursos declarados", async () => {
  const actor = await read("scripts/documents/actor.mjs");
  assert.match(actor, /Math\.min\(toNumber\(hp\.max\), toNumber\(hp\.value\) \+ toNumber\(this\.system\.attributes\.vig\.value\) \+ 2\)/);
  assert.match(actor, /Math\.min\(toNumber\(mp\.max\), toNumber\(mp\.value\) \+ toNumber\(this\.system\.attributes\.vol\.value\) \+ 1\)/);
  assert.match(actor, /updates\["system\.status\.fatigue"\] = 0/);
});

test("partida integral: alquimia no permite duplicar dosis ni saltarse Saturación", async () => {
  const formula = await read("scripts/rules/formula-guards.mjs");
  assert.match(formula, /quantity <= 0/);
  assert.match(formula, /saturated\.includes\(family\)/);
  assert.match(formula, /quantity - 1/);
});

test("partida integral: dispositivo valida Caudal y Energía antes del consumo", async () => {
  const actor = await read("scripts/documents/actor.mjs");
  assert.match(actor, /if \(consumption > flow\)/);
  assert.match(actor, /if \(consumption > energy\)/);
  assert.match(actor, /"system\.energy\.value": energy - consumption/);
  assert.match(actor, /success && consumption/);
});

test("partida integral: daño físico y mágico desembocan en adjustResource health", async () => {
  const actor = await read("scripts/documents/actor.mjs");
  const magic = await read("scripts/rules/magic-guards.mjs");
  assert.match(actor, /adjustResource\("health", -impact\.damage\)/);
  assert.match(magic, /adjustResource\("health", -impact\.damage\)/);
});

test("partida integral: no hay autoridad duplicada específica de Proyectil Ígneo", async () => {
  const outcome = await read("scripts/rules/spell-outcome-guards.mjs");
  assert.equal(outcome.includes("resolveSpellImpact"), false);
  assert.equal(outcome.includes("pendingDamageRequest"), false);
});


test("exploit: incapacitado no recupera Acción, Movimiento ni Reacción al avanzar turno", async () => {
  const turn = await read("scripts/rules/turn-economy.mjs");
  assert.match(turn, /const incapacitated = Boolean\(actor\.system\?\.status\?\.incapacitated\) \|\| Number\(actor\.system\?\.resources\?\.health\?\.value\) <= 0/);
  for (const field of ["movement", "action", "reaction"]) assert.match(turn, new RegExp('"system\\.turn\\.' + field + '": !incapacitated'));
});

test("exploit: Acción y Reacción rechazan actores incapacitados antes de entrar al subsistema", async () => {
  const action = await read("scripts/rules/action-economy-guards.mjs");
  const reaction = await read("scripts/rules/reaction-economy-guards.mjs");
  assert.match(action, /status\?\.incapacitated[\s\S]*health\?\.value[\s\S]*Incapacitado/);
  assert.match(reaction, /status\?\.incapacitated[\s\S]*health\?\.value[\s\S]*Incapacitado/);
});
