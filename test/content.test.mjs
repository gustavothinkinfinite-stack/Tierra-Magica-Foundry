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

test("contenido 1.0 cubre economía y subsistemas finales",()=>{assert.equal(STARTER_CONTENT.armor.find(i=>i.name==="Placas").system.priceCopper,4000);assert.equal(STARTER_CONTENT.armor.find(i=>i.name==="Placas").system.priceStatus,"exact");assert.equal(STARTER_CONTENT.shield.find(i=>i.name==="Escudo pesado").system.block,2);assert.ok(STARTER_CONTENT.formula.some(i=>i.name==="Bálsamo Restaurador"));assert.ok(STARTER_CONTENT.ritual.some(i=>i.name==="Portal Estable"));assert.ok(STARTER_CONTENT.device.some(i=>i.name==="Celda arcana menor"));assert.equal(STARTER_CONTENT.technique.find(i=>i.name==="Estocada Perforante").system.effect,"-1 ataque, -1 daño, Pen +2.");});

test("tabla auditada conserva identidades de armas sin inflación de Penetración",()=>{const by=(n)=>STARTER_CONTENT.weapon.find(i=>i.name===n).system;assert.deepEqual([by("Hacha").damage,by("Hacha").penetration],[6,0]);assert.deepEqual([by("Maza").damage,by("Maza").penetration],[5,1]);assert.deepEqual([by("Gran martillo").damage,by("Gran martillo").penetration],[7,2]);assert.deepEqual([by("Rifle temprano").damage,by("Rifle temprano").penetration],[7,3]);});

test("pociones auditadas respetan Saturación y límites de recuperación",()=>{const hp=STARTER_CONTENT.formula.find(i=>i.name==="Poción Restauradora").system;const mp=STARTER_CONTENT.formula.find(i=>i.name==="Poción de Recuperación Arcana").system;assert.equal(hp.saturating,true);assert.equal(hp.family,"restaurativa");assert.match(hp.effect,/4 Vida/);assert.equal(mp.saturating,true);assert.equal(mp.family,"arcana");assert.match(mp.effect,/3 Maná/);});

test("CREA-10 estructura Método y requisitos de Habilidad sin inferencias temáticas",()=>{
  const regeneration=STARTER_CONTENT.spell.find(i=>i.name==="Regeneración").system;
  const closure=STARTER_CONTENT.spell.find(i=>i.name==="Cierre Restaurador").system;
  const arcaneSight=STARTER_CONTENT.spell.find(i=>i.name==="Visión Arcana").system;
  assert.equal(regeneration.method,"ritual");
  assert.deepEqual(regeneration.skillRequirements,[{skill:"medicine",minRank:2}]);
  assert.equal(closure.requirements,"");
  assert.equal(arcaneSight.requirements,"");
});


test("auditoría mágica: invocación sostenida y tránsito espacial no amplifican Origen Remoto",()=>{
  const spell=(name)=>STARTER_CONTENT.spell.find((item)=>item.name===name).system;
  assert.equal(spell("Llamada Menor").sustained,true);
  assert.equal(spell("Llamada Menor").duration,"Sostenida");
  for(const name of ["Paso Breve","Trasposición","Umbral","Portal"]) {
    assert.equal(spell(name).remoteOriginCompatible,false,name);
  }
  assert.notEqual(spell("Proyectil Ígneo").remoteOriginCompatible,false);
});


test("Cierre Restaurador declara su objetivo antes de pagar Maná",()=>{
  const spell=STARTER_CONTENT.spell.find(i=>i.name==="Cierre Restaurador").system;
  assert.equal(spell.requiresTarget,true);
  assert.equal(spell.targetMode,"single");
});


test("grimorio canónico contiene 60 hechizos y el cierre espacial aprobado",()=>{
  assert.equal(STARTER_CONTENT.spell.length,60);
  const names=new Set(STARTER_CONTENT.spell.map((entry)=>entry.name));
  assert.equal(names.size,60);
  for(const name of ["Arco Fulminante","Renovación Integral","Dominio Fantasmagórico","Mente Anclada","Gran Traslación"]){
    assert.equal(names.has(name),true,name);
  }

  const by=(name)=>STARTER_CONTENT.spell.find((entry)=>entry.name===name).system;
  assert.equal(by("Trasposición").requiresTarget,true);
  assert.equal(by("Trasposición").targetMode,"single");
  assert.match(by("Trasposición").effect,/Intercambia la posición/);
  assert.match(by("Umbral").effect,/barrera continua de hasta 2 espacios/);
  assert.equal(by("Salto Vinculado").targetMode,"multiple");
  assert.equal(by("Salto Vinculado").maxTargets,2);
  assert.equal(by("Gran Traslación").maxTargets,8);
  assert.equal(by("Gran Traslación").method,"ritual");
});

test("protecciones mentales diferidas no atacan al protegido durante el lanzamiento",()=>{
  const interdiccion=STARTER_CONTENT.spell.find((entry)=>entry.name==="Interdicción").system;
  const aura=STARTER_CONTENT.spell.find((entry)=>entry.name==="Aura de Autoridad").system;
  assert.notEqual(interdiccion.defense,"mental");
  assert.notEqual(aura.defense,"mental");
  assert.match(interdiccion.effect,/Defensa Mental del atacante/);
  assert.match(aura.effect,/Defensa Mental de esa criatura/);
});
