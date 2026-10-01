import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL("../" + path, import.meta.url), "utf8");

test("0 Vida centraliza Incapacitado y Trauma en adjustResource", async () => {
  const source = await read("scripts/rules/familiar-guards.mjs");
  assert.match(source, /previous > 0 && next === 0/);
  assert.match(source, /system\.status\.incapacitated/);
  assert.match(source, /this\.type === "character"[\s\S]*system\.status\.trauma/);
});

test("curar por encima de 0 retira Incapacitado sin borrar Trauma", async () => {
  const source = await read("scripts/rules/familiar-guards.mjs");
  const recovery = source.slice(source.indexOf("} else if (next > 0)"), source.indexOf("return this.update(updates)"));
  assert.match(recovery, /system\.status\.incapacitated/);
  assert.equal(recovery.includes("system.status.trauma"), false);
});

test("Descanso y Descanso Completo usan la autoridad acotada de recuperación y no borran Trauma", async () => {
  const source = await read("scripts/documents/actor.mjs");
  const start = source.indexOf('async rest(kind = "rest")');
  const rest = source.slice(start, source.indexOf("  #buildSkillBreakdown", start));
  assert.match(rest, /boundedHealthRecoveryUpdates/);
  assert.match(rest, /healingCap\(this\)/);
  assert.equal(rest.includes("status.trauma"), false);
});

test("Respiro no recupera Vida ni Maná y sólo limpia Saturación", async () => {
  const source = await read("scripts/documents/actor.mjs");
  const breather = source.slice(source.indexOf('if (kind === "breather")'), source.indexOf('} else if (kind === "rest")'));
  assert.match(breather, /saturatedFamilies/);
  assert.equal(breather.includes("resources.health.value"), false);
  assert.equal(breather.includes("resources.mana.value"), false);
});

test("Descanso normal limita cada recuperación a una vez antes del Completo", async () => {
  const source = await read("scripts/documents/actor.mjs");
  assert.match(source, /if \(!recovery\.healthUsed\)/);
  assert.match(source, /system\.recovery\.healthUsed.*true/);
  assert.match(source, /if \(!recovery\.manaUsed\)/);
  assert.match(source, /system\.recovery\.manaUsed.*true/);
  assert.match(source, /system\.recovery\.healthUsed.*false/);
  assert.match(source, /system\.recovery\.manaUsed.*false/);
});

test("economía de turno no revive funcionalmente a un actor a 0 Vida", async () => {
  const source = await read("scripts/rules/turn-economy.mjs");
  assert.match(source, /actorIncapacitated/);
  assert.match(source, /resources\?\.health\?\.value/);
  assert.match(source, /movementAllowance\(actor\)/);
  assert.match(source, /"system\.turn\.movementSpent": 0/);
  for (const field of ["action", "reaction"]) {
    assert.match(source, new RegExp('"system\\.turn\\.' + field + '": !incapacitated'));
  }
});
