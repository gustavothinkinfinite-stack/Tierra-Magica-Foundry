import assert from "node:assert/strict";
import test from "node:test";
import { TM_CONFIG } from "../scripts/config.mjs";
import { STARTER_CONTENT } from "../scripts/content.mjs";

test("configura los siete Atributos del Manual v0.1", () => {
  assert.deepEqual(Object.keys(TM_CONFIG.attributes), ["fue","agi","vig","int","per","vol","pre"]);
});

test("incluye la lista de habilidades del manual", () => {
  assert.equal(Object.keys(TM_CONFIG.skills).length, 26);
  assert.equal(TM_CONFIG.skills.medicine.label, "Medicina");
  assert.equal(TM_CONFIG.skills.channeling.label, "Canalización");
  assert.equal(TM_CONFIG.skills.rangedWeapons.label, "Armas a Distancia");
});

test("incluye equipo y hechizos de calibración", () => {
  assert.ok(STARTER_CONTENT.weapon.some((i) => i.name === "Rifle temprano"));
  assert.ok(STARTER_CONTENT.armor.some((i) => i.name === "Placa"));
  assert.ok(STARTER_CONTENT.shield.some((i) => i.name === "Escudo estándar"));
  assert.ok(STARTER_CONTENT.spell.some((i) => i.name === "Regeneración"));
  assert.ok(STARTER_CONTENT.technique.some((i) => i.name === "Golpe Potente"));
});
