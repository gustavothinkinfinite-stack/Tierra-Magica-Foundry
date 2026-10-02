import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { STARTER_CONTENT } from "../scripts/content.mjs";

const manualUrl=new URL("../docs/Tierra_Magica_Manual_Maestro.md",import.meta.url);

function section(manual,startHeading,endHeading){
  const start=manual.indexOf(startHeading);
  const end=manual.indexOf(endHeading,start);
  assert.ok(start>=0,startHeading);
  assert.ok(end>start,endHeading);
  return manual.slice(start,end);
}

test("el capítulo de equipo explica uso práctico además de tablas",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const equipment=section(manual,"## 9. Armas, armaduras y escudos","## 10. Vida, heridas, Trauma y recuperación");

  for(const heading of [
    "### Cómo leer un arma",
    "### Propiedades de armas",
    "### Armas canónicas",
    "### Munición y Recarga",
    "### Armaduras",
    "### Escudos",
    "### Equipo de aventura y herramientas",
    "### Kits profesionales",
    "### Raciones, provisiones y combustible",
    "### Consumibles, pociones y fórmulas",
    "### Dispositivos arcano-industriales",
    "### Llevar, guardar y acceder al equipo",
    "### Comprar y vender equipo",
    "### Ejemplo de preparación para una expedición"
  ]) assert.equal(equipment.includes(heading),true,heading);
});

test("tablas de armas, armaduras y escudos conservan el catálogo canónico",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const equipment=section(manual,"## 9. Armas, armaduras y escudos","## 10. Vida, heridas, Trauma y recuperación");

  for(const weapon of STARTER_CONTENT.weapon){
    assert.equal(equipment.includes("| "+weapon.name+" |"),true,weapon.name);
    assert.equal(equipment.includes("| "+weapon.name+" | "+weapon.system.damage+" | "+weapon.system.penetration+" |"),true,weapon.name+" damage/pen");
  }
  for(const armor of STARTER_CONTENT.armor){
    assert.equal(equipment.includes("| "+armor.name+" | "+armor.system.protection+" |"),true,armor.name);
  }
  for(const shield of STARTER_CONTENT.shield){
    assert.equal(equipment.includes("| "+shield.name+" |"),true,shield.name);
  }
});

test("propiedades descriptivas no generan bonos universales no implementados",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const equipment=section(manual,"## 9. Armas, armaduras y escudos","## 10. Vida, heridas, Trauma y recuperación");

  assert.match(equipment,/\*\*Ágil\*\*.*No concede actualmente un bono universal/s);
  assert.match(equipment,/\*\*Versátil\*\*.*No posee actualmente un modo alternativo universal de daño/s);
  assert.match(equipment,/\*\*Impactante\*\*.*No añade daño o Derribo automáticamente/s);
  assert.match(equipment,/\*\*Potencia N\*\*.*No se suma como un \+N adicional/s);
  assert.match(equipment,/\*\*Repetición\*\*.*no concede ataques adicionales/s);
});

test("munición y Recarga tienen unidades comerciales y consumo explícito",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const equipment=section(manual,"## 9. Armas, armaduras y escudos","## 10. Vida, heridas, Trauma y recuperación");

  assert.match(equipment,/consume normalmente \*\*1 unidad de munición\*\*/);
  assert.match(equipment,/20 flechas = \*\*2 p\*\*/);
  assert.match(equipment,/20 virotes = \*\*3 p\*\*/);
  assert.match(equipment,/12 disparos ordinarios de arma de fuego = \*\*5 p\*\*/);
  assert.match(equipment,/\*\*Recarga N\*\* consume Acciones, no Movimiento/);
});

test("raciones y combustible quedan cuantificados sin inventar hambre universal",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const equipment=section(manual,"## 9. Armas, armaduras y escudos","## 10. Vida, heridas, Trauma y recuperación");

  assert.match(equipment,/Provisiones 7 días — 2 p/);
  assert.match(equipment,/siete raciones diarias de comida conservable/);
  assert.match(equipment,/una jornada ordinaria consume 1 ración/);
  assert.match(equipment,/no incluye automáticamente agua potable/);
  assert.match(equipment,/no recupera Vida, Maná ni Fatiga/);
  assert.match(equipment,/no utiliza una tabla universal de hambre o sed/);
  assert.match(equipment,/Combustible de iluminación 5 noches — 2 p/);
});

test("Kits habilitan trabajo pero no conceden bonus universal",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const equipment=section(manual,"## 9. Armas, armaduras y escudos","## 10. Vida, heridas, Trauma y recuperación");

  assert.match(equipment,/herramientas reutilizables/);
  assert.match(equipment,/no una reserva infinita de consumibles/);
  assert.match(equipment,/no concede un bono universal/);
  assert.match(equipment,/Repuesto médico, 5 usos \| 5 p/);
});

test("consumibles conservan dosis, Saturación y precios no establecidos",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const equipment=section(manual,"## 9. Armas, armaduras y escudos","## 10. Vida, heridas, Trauma y recuperación");

  for(const formula of STARTER_CONTENT.formula){
    assert.equal(equipment.includes("| "+formula.name+" |"),true,formula.name);
  }
  assert.match(equipment,/usar una dosis consume esa dosis/);
  assert.match(equipment,/una dosis no puede utilizarse dos veces/);
  assert.match(equipment,/precios monetarios permanecen \*\*sin establecer\*\*/);
});

test("el Manual no crea una fórmula universal de inventario o carga",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const equipment=section(manual,"## 9. Armas, armaduras y escudos","## 10. Vida, heridas, Trauma y recuperación");

  assert.match(equipment,/no utiliza una fórmula universal de peso, espacios de inventario o capacidad de carga/i);
  assert.match(equipment,/equipo personal razonable para su Escala y FUE/);
  assert.match(equipment,/no se resuelve inventando una penalización numérica universal/);
});

test("Economía remite al capítulo práctico y conserva unidades de suministros",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const economy=section(manual,"## 19. Economía, disponibilidad y equipo","## 20. Pueblos, herencias, culturas y orígenes");

  assert.match(economy,/reglas de \*\*uso práctico\*\*/i);
  assert.match(economy,/Provisiones personales 7 días \(7 raciones\) 2 p/);
  assert.match(economy,/Combustible de iluminación personal 5 noches 2 p/);
});
