import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pdTotalForLevel, ATTRIBUTE_UPGRADE_COSTS } from "../scripts/rules/creation.mjs";

const manualUrl=new URL("../docs/Tierra_Magica_Manual_Maestro.md",import.meta.url);

function section(manual,startHeading,endHeading){
  const start=manual.indexOf(startHeading);
  const end=manual.indexOf(endHeading,start);
  assert.ok(start>=0,startHeading);
  assert.ok(end>start,endHeading);
  return manual.slice(start,end);
}

test("el Manual conserva una creación de nivel 1 completa y secuenciada",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const creation=section(manual,"## 3. Creación de personaje paso a paso","## 4. Desarrollo y subida de nivel");

  for(const text of [
    "6 aumentos gratuitos de Atributo",
    "**25 PD**",
    "**3 PR**",
    "**PEI 20 o = 2.000 c**",
    "### Paso 1 — Concepto, Ascendencia, Origen y Trasfondo",
    "### Paso 2 — Atributos",
    "### Paso 3 — Presupuesto profesional: 25 PD",
    "#### Cómo gastar los 25 PD",
    "### Paso 4 — Rasgos: 3 PR",
    "### Paso 5 — Familiar, si corresponde",
    "### Paso 6 — Equipo inicial, PEI y Reserva",
    "### Paso 7 — Valores derivados",
    "### Paso 9 — Lista de comprobación final",
    "### Ejemplo completo de creación de nivel 1"
  ]) assert.equal(creation.includes(text),true,text);

  assert.match(creation,/Grimorio canónico contiene \*\*60 hechizos\*\*/);
  assert.equal(creation.includes("contiene 18 hechizos"),false);
  assert.match(creation,/Familiar Mágico cuesta 3 PR durante creación/);
  assert.match(creation,/progresión, su coste canónico es \*\*6 PD\*\*/);
});

test("el ejemplo de creación gasta exactamente 25 PD y 3 PR",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const creation=section(manual,"### Ejemplo completo de creación de nivel 1","## 4. Desarrollo y subida de nivel");

  assert.match(creation,/\*\*14 PD\*\*/);
  assert.match(creation,/PD acumulados hasta aquí: \*\*18\*\*/);
  assert.match(creation,/Total final: \*\*18 \+ 7 = 25 PD\*\*/);
  assert.match(creation,/Total: \*\*3 PR\*\*/);
  assert.match(creation,/Vida máxima = 10 \+ 2×VIG = \*\*14\*\*/);
  assert.match(creation,/Maná máximo = 6 \+ 3×VOL = \*\*12\*\*/);
  assert.match(creation,/umbral informativo de Daño Grave = 5 \+ VIG = \*\*7\*\*/);
});

test("el Manual explica los PD acumulativos y coincide con la fórmula implementada",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const development=section(manual,"## 4. Desarrollo y subida de nivel","## 5. Rasgos y Puntos de Rasgo");

  assert.match(development,/PD totales = 25 \+ 4 × \(nivel - 1\)/);
  assert.match(development,/Los PD son acumulativos/);
  assert.equal(pdTotalForLevel(1),25);
  assert.equal(pdTotalForLevel(2),29);
  assert.equal(pdTotalForLevel(9),57);
  assert.equal(pdTotalForLevel(15),81);
  assert.equal(pdTotalForLevel(20),101);

  for(const [level,total] of [[1,25],[2,29],[9,57],[15,81],[20,101]]){
    assert.match(development,new RegExp("\\| "+level+" \\| "+total+" \\|"));
  }
});

test("las puertas de rango y costes de mejora quedan explícitos",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const development=section(manual,"## 4. Desarrollo y subida de nivel","## 5. Rasgos y Puntos de Rasgo");

  assert.match(development,/niveles 2–8: Experto es el máximo permitido/);
  assert.match(development,/niveles 9–14: puede alcanzarse Maestro/);
  assert.match(development,/niveles 15–20: puede alcanzarse Gran Maestro/);
  assert.match(development,/Experto → Maestro: 6 PD/);
  assert.match(development,/Maestro → Gran Maestro: 8 PD/);
  assert.match(development,/Gran Maestro requiere al menos una Especialización coherente/);
});

test("progresión de Atributos coincide con los costes canónicos y no regala recursos",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const development=section(manual,"## 4. Desarrollo y subida de nivel","## 5. Rasgos y Puntos de Rasgo");

  assert.deepEqual(ATTRIBUTE_UPGRADE_COSTS,{0:4,1:6,2:9,3:13,4:18});
  assert.match(development,/3 → 4 \| 13 PD/);
  assert.match(development,/4 → 5 \| 18 PD/);
  assert.match(development,/13 \+ 18 = 31 PD/);
  assert.match(development,/Aumentar un máximo no recupera el recurso actual/);
  assert.match(development,/Vida actual no aumenta sólo por haber subido el máximo/);
});

test("subir de nivel no crea economías paralelas",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const development=section(manual,"## 4. Desarrollo y subida de nivel","## 5. Rasgos y Puntos de Rasgo");

  for(const term of [
    "PR;",
    "PEI;",
    "dinero;",
    "Atributos;",
    "rangos de Habilidad;",
    "Especializaciones;",
    "Técnicas;",
    "Disciplinas;",
    "Hechizos;",
    "Rasgos;",
    "equipo;",
    "Vida o Maná actuales."
  ]) assert.equal(development.includes(term),true,term);

  assert.match(development,/Los \*\*3 PR no se renuevan al subir de nivel\*\*/);
  assert.match(development,/Familiar Mágico: 3 PR en creación o 6 PD mediante progresión posterior/);
  assert.match(development,/El \*\*PEI 20 o\*\* pertenece únicamente a la creación inicial/);
});

test("ejemplo nivel 1 a 2 consume exactamente los 4 PD nuevos",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const development=section(manual,"### Ejemplo de subida de nivel: nivel 1 → nivel 2","### Ejemplo de ahorro para un Atributo");

  assert.match(development,/25 PD gastados de 25/);
  assert.match(development,/pasa a \*\*29 PD\*\*/);
  assert.match(development,/tiene \*\*4 PD disponibles\*\*/);
  assert.match(development,/paga \*\*2 PD\*\*/);
  assert.match(development,/Onda de Choque.*\*\*2 PD\*\*/);
  assert.match(development,/termina con \*\*29 PD gastados de 29\*\*/);
});
