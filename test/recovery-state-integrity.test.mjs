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

test("Descanso Completo respeta healthCap y no borra Trauma", async () => {
  const source = await read("scripts/documents/actor.mjs");
  const full = source.slice(source.indexOf('} else if (kind === "full")'), source.indexOf("await this.update(updates)", source.indexOf('} else if (kind === "full")')));
  assert.match(full, /recovery\.healthCap/);
  assert.equal(full.includes("status.trauma"), false);
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
  assert.match(source, /health\?\.value\) <= 0/);
  for (const field of ["movement", "action", "reaction"]) {
    assert.match(source, new RegExp('"system\\.turn\\.' + field + '": !incapacitated'));
  }
});
