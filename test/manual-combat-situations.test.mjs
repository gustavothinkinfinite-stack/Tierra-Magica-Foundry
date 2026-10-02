import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const manualUrl=new URL("../docs/Tierra_Magica_Manual_Maestro.md",import.meta.url);

function section(manual,startHeading,endHeading){
  const start=manual.indexOf(startHeading);
  const end=manual.indexOf(endHeading,start);
  assert.ok(start>=0,startHeading);
  assert.ok(end>start,endHeading);
  return manual.slice(start,end);
}

test("el Manual define las cuatro maniobras universales con consecuencias explícitas",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const scale=section(manual,"## 7. Escala y maniobras","## 8. Combate");

  for(const heading of ["### Derribar","### Empujar","### Agarrar","### Desarmar"]){
    assert.equal(scale.includes(heading),true,heading);
  }
  assert.match(scale,/Defensa de Maniobra.*11 \+ AGI \+ Bono Defensivo aplicable/s);
  assert.match(scale,/Derribar, Empujar, Agarrar y Desarmar son \*\*Acciones universales\*\*/);
  assert.match(scale,/Derribada:[\s\S]*2 puntos de Movimiento/);
  assert.match(scale,/margen Ajustado 0–4: desplaza \*\*1 espacio\*\*/);
  assert.match(scale,/margen Claro 5–9: desplaza \*\*2 espacios\*\*/);
  assert.match(scale,/margen Dominante 10\+: desplaza \*\*3 espacios\*\*/);
  assert.match(scale,/DF de Presa = 11 \+ FUE del atacante \+ bono reducido de Atletismo/);
  assert.match(scale,/dos manos concede \*\*\+2 Defensa de Maniobra\*\*/);
  assert.match(scale,/Recoger del suelo un objeto accesible.*\*\*2 puntos de Movimiento\*\*/s);
});

test("Intimidar en combate presiona sin convertirse en control mental",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const combat=section(manual,"## 8. Combate","## 9. Armas, armaduras, equipo y suministros");

  assert.match(combat,/### Intimidar o Amenazar en combate/);
  assert.match(combat,/PRE \+ Intimidación contra Defensa Mental/);
  assert.match(combat,/próxima prueba hostil.*sufre Desventaja/s);
  for(const forbidden of ["elimina la Acción","obliga a huir","obliga a rendirse","fuerza una traición"]){
    assert.equal(combat.includes(forbidden),true,forbidden);
  }
  assert.match(combat,/no puede ser sometida una y otra vez a la misma amenaza/i);
});

test("armadura y cuerpo a cuerpo no crean penalizaciones mágicas importadas de otros sistemas",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const armor=section(manual,"## 9. Armas, armaduras, equipo y suministros","## 10. Vida, heridas, Trauma y recuperación");
  const magic=section(manual,"## 11. Magia","## 12. Grimorio canónico");

  assert.match(armor,/Llevar armadura no provoca fallo mágico/i);
  assert.match(armor,/no usa una restricción universal de “mago sin armadura”/i);
  assert.match(magic,/Estar frente a frente con un enemigo no penaliza el lanzamiento por sí solo/i);
  assert.match(magic,/no provoca un Ataque de Oportunidad universal/i);
  assert.match(magic,/no impone Desventaja automática/i);
  assert.match(magic,/tampoco posee componentes verbales, somáticos o de mano libre \*\*universales\*\*/i);
  assert.match(magic,/Estar Agarrado no impide automáticamente lanzar magia/i);
});

test("recibir daño no usa concentración universal pero Incapacitado corta Sostenimientos",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const magic=section(manual,"## 11. Magia","## 12. Grimorio canónico");

  assert.match(magic,/Recibir daño no exige una tirada universal de “concentración”/i);
  assert.match(magic,/no rompe automáticamente un Sostenimiento/i);
  assert.match(magic,/Incapacitada o Inconsciente no puede mantener efectos Sostenidos demandantes/i);
  assert.match(magic,/terminan inmediatamente/i);
  assert.match(magic,/deben lanzarse de nuevo/i);
});

test("daño por caída tiene fórmula, Acrobacia y tratamiento de Protección",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const health=section(manual,"## 10. Vida, heridas, Trauma y recuperación","## 11. Magia");

  assert.match(health,/### Caídas/);
  assert.match(health,/Daño de caída = 2 × \(espacios efectivos de caída - 1\)/);
  assert.match(health,/DF = min\(24, 10 \+ 2 × max\(0, espacios de caída - 2\)\)/);
  assert.match(health,/éxito Ajustado: -1 espacio/);
  assert.match(health,/éxito Claro: -2 espacios/);
  assert.match(health,/éxito Dominante: -3 espacios/);
  assert.match(health,/Protección de una armadura ordinaria \*\*no reduce el daño de caída\*\*/);
  assert.match(health,/12 espacios \| 22/);
});
