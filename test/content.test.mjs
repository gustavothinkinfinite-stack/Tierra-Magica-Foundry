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
  assert.ok(STARTER_CONTENT.armor.some((i) => i.name === "Placas"));
  assert.ok(STARTER_CONTENT.shield.some((i) => i.name === "Escudo estándar"));
  assert.ok(STARTER_CONTENT.spell.some((i) => i.name === "Regeneración"));
  assert.ok(STARTER_CONTENT.technique.some((i) => i.name === "Golpe Potente"));
});

test("contenido 1.0 cubre economía y subsistemas finales",()=>{assert.equal(STARTER_CONTENT.armor.find(i=>i.name==="Placas").system.price,85);assert.equal(STARTER_CONTENT.shield.find(i=>i.name==="Escudo pesado").system.block,2);assert.ok(STARTER_CONTENT.formula.some(i=>i.name==="Bálsamo Restaurador"));assert.ok(STARTER_CONTENT.ritual.some(i=>i.name==="Portal Estable"));assert.ok(STARTER_CONTENT.device.some(i=>i.name==="Celda arcana menor"));assert.equal(STARTER_CONTENT.technique.find(i=>i.name==="Estocada Perforante").system.effect,"-1 ataque, -1 daño, Pen +2.");});

test("tabla auditada conserva identidades de armas sin inflación de Penetración",()=>{const by=(n)=>STARTER_CONTENT.weapon.find(i=>i.name===n).system;assert.deepEqual([by("Hacha").damage,by("Hacha").penetration],[6,0]);assert.deepEqual([by("Maza").damage,by("Maza").penetration],[5,1]);assert.deepEqual([by("Gran martillo").damage,by("Gran martillo").penetration],[7,2]);assert.deepEqual([by("Rifle temprano").damage,by("Rifle temprano").penetration],[7,3]);});

test("pociones auditadas respetan Saturación y límites de recuperación",()=>{const hp=STARTER_CONTENT.formula.find(i=>i.name==="Poción Restauradora").system;const mp=STARTER_CONTENT.formula.find(i=>i.name==="Poción de Recuperación Arcana").system;assert.equal(hp.saturating,true);assert.equal(hp.family,"restaurativa");assert.match(hp.effect,/4 Vida/);assert.equal(mp.saturating,true);assert.equal(mp.family,"arcana");assert.match(mp.effect,/3 Maná/);});
