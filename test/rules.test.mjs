import assert from "node:assert/strict";
import test from "node:test";
import {
  characteristicPoints, clamp, defense, degreeOfSuccess, experienceForNextLevel,
  inventoryLoad, signed, skillTotal, toNumber
} from "../scripts/rules.mjs";

test("calcula habilidades con característica, valor y bono", () => {
  assert.equal(skillTotal({ ability: 4, value: 8, bonus: 2 }), 14);
  assert.equal(skillTotal({ ability: 3, value: 0, bonus: -2 }), 1);
});

test("calcula defensas del sistema", () => {
  assert.equal(defense(10, 4, 2), 16);
});

test("resuelve grados de éxito y extremos naturales", () => {
  assert.equal(degreeOfSuccess(25, 15, 12), "Éxito crítico");
  assert.equal(degreeOfSuccess(15, 15, 10), "Éxito");
  assert.equal(degreeOfSuccess(14, 15, 10), "Fallo");
  assert.equal(degreeOfSuccess(5, 15, 10), "Fallo crítico");
  assert.equal(degreeOfSuccess(14, 15, 20), "Éxito");
  assert.equal(degreeOfSuccess(15, 15, 1), "Fallo");
});

test("usa la progresión de experiencia del libro", () => {
  const thresholds = [0, 0, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5400];
  assert.equal(experienceForNextLevel(1, thresholds), 300);
  assert.equal(experienceForNextLevel(9, thresholds), 5400);
});

test("calcula puntos de características y carga", () => {
  assert.equal(characteristicPoints({ one: { value: 4 }, two: { value: 3 } }), 7);
  assert.equal(inventoryLoad([{ system: { quantity: 2, weight: 1.5 } }]), 3);
});

test("normaliza números y presentación", () => {
  assert.equal(toNumber("4"), 4);
  assert.equal(toNumber("x", 7), 7);
  assert.equal(clamp(15, 0, 10), 10);
  assert.equal(signed(3), "+3");
  assert.equal(signed(-2), "-2");
});
