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

test("contenido 1.0 cubre economía y subsistemas finales",()=>{assert.equal(STARTER_CONTENT.armor.find(i=>i.name==="Placas").system.price,85);assert.equal(STARTER_CONTENT.shield.find(i=>i.name==="Escudo pesado").system.block,2);assert.ok(STARTER_CONTENT.formula.some(i=>i.name==="Bálsamo Restaurador"));assert.ok(STARTER_CONTENT.ritual.some(i=>i.name==="Portal Estable"));assert.ok(STARTER_CONTENT.device.some(i=>i.name==="Celda arcana menor"));assert.equal(STARTER_CONTENT.technique.find(i=>i.name==="Estocada Perforante").system.effect,"-1 ataque, -1 daño, Pen +2.");});
