import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const manualUrl=new URL("../docs/Tierra_Magica_Manual_Maestro.md",import.meta.url);

test("el Manual contiene un procedimiento completo de combate paso a paso",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const start=manual.indexOf("## 8. Combate");
  const end=manual.indexOf("## 9. Armas, armaduras y escudos",start);
  assert.ok(start>=0);
  assert.ok(end>start);
  const combat=manual.slice(start,end);

  for(const heading of [
    "### Cómo comienza un combate",
    "### Estructura de un turno, paso a paso",
    "### Qué puedes hacer con tu Acción",
    "### Ataque con arma, paso a paso",
    "### Defensas: qué representan y cuándo se usan",
    "### Reacciones de combate",
    "### Parada y Contraataque",
    "### Guardia",
    "### Preparar",
    "### Retrasar",
    "### Maniobras: Derribar, Empujar y Agarrar",
    "### Magia durante el combate",
    "### Primeros Auxilios, fórmulas, dispositivos y Familiares",
    "### 0 Vida, Daño Grave y final de un combate",
    "### Ejemplo completo: tres rondas",
    "### Resumen rápido del flujo"
  ]) assert.equal(combat.includes(heading),true,heading);

  assert.match(combat,/2d10 \+ PER \+ modificadores/);
  assert.match(combat,/\*\*Movimiento\*\*/);
  assert.match(combat,/\*\*1 Acción\*\*/);
  assert.match(combat,/\*\*1 Reacción\*\*/);
  assert.match(combat,/2d10 \+ Atributo pertinente \+ Habilidad de arma \+ modificadores >= Defensa/);
  assert.match(combat,/Protección efectiva = max\(0, Protección - Penetración\)/);
  assert.match(combat,/Defensa Corporal/);
  assert.match(combat,/Defensa Mental/);
  assert.match(combat,/Defensa de Maniobra/);
});

test("la guía de combate conserva las reacciones y límites esenciales del núcleo",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const start=manual.indexOf("## 8. Combate");
  const end=manual.indexOf("## 9. Armas, armaduras y escudos",start);
  const combat=manual.slice(start,end);

  for(const term of [
    "**Parada**",
    "**Bloqueo con escudo**",
    "**Intercepción**",
    "**Recibir Carga**",
    "**Contraataque**",
    "**Tirador Preparado**",
    "**Contramagia**",
    "**Barrera Cinética**",
    "**Escudo de campo**",
    "**Acción Vinculada / Coordinación Reactiva**"
  ]) assert.equal(combat.includes(term),true,term);

  assert.match(combat,/no provoca un Ataque de Oportunidad universal/i);
  assert.match(combat,/No hay una ronda universal de sorpresa/i);
  assert.match(combat,/sin crear una Acción adicional/i);
  assert.match(combat,/no conceden turnos extra/i);
});

test("el ejemplo de tres rondas demuestra iniciativa, daño, Parada, Contraataque y Guardia",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const start=manual.indexOf("### Ejemplo completo: tres rondas");
  const end=manual.indexOf("### Resumen rápido del flujo",start);
  const example=manual.slice(start,end);

  for(const term of [
    "Iniciativa 15",
    "Vida 12",
    "Vida 6",
    "Parada",
    "Contraataque",
    "Guardia",
    "Golpe Potente",
    "0 Vida",
    "Incapacitado"
  ]) assert.equal(example.includes(term),true,term);

  assert.match(example,/Daño final: \*\*7 - 1 = 6\*\*/);
  assert.match(example,/Defensa pasa temporalmente de 14 a \*\*16\*\*/);
  assert.match(example,/daño final \*\*8\*\*/i);
});
