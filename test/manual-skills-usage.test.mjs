import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { TM_CONFIG } from "../scripts/config.mjs";

const manualUrl=new URL("../docs/Tierra_Magica_Manual_Maestro.md",import.meta.url);

function skillGuide(manual){
  const start=manual.indexOf("### Cómo se usan las Habilidades");
  const end=manual.indexOf("### Gastar PD en Especializaciones",start);
  assert.ok(start>=0);
  assert.ok(end>start);
  return manual.slice(start,end);
}

test("la guía práctica cubre exactamente las 26 Habilidades canónicas",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const guide=skillGuide(manual);
  const definitions=Object.values(TM_CONFIG.skills);
  assert.equal(definitions.length,26);

  const attributeAbbr={fue:"FUE",agi:"AGI",vig:"VIG",int:"INT",per:"PER",vol:"VOL",pre:"PRE"};
  for(const definition of definitions){
    assert.equal(guide.includes("#### "+definition.label),true,definition.label);
    const attribute=attributeAbbr[definition.suggestedAttribute];
    assert.match(guide,new RegExp("\\*\\*Atributo sugerido:\\*\\* "+attribute+"(?:\\.|,|\\n)"),definition.label+" / "+attribute);
  }
});

test("uso de Habilidades conserva motor universal, Sin Entrenar y límites de Especialización",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const guide=skillGuide(manual);

  assert.match(guide,/2d10 \+ Atributo pertinente \+ Habilidad \+ modificadores >= DF/);
  assert.match(guide,/Sin Entrenar.*rango 0 y bono \+0/s);
  assert.match(guide,/No se reemplaza una carencia de formación con una tirada extremadamente alta/);
  assert.match(guide,/Especialización.*no concede un bono numérico universal/s);
  assert.match(guide,/No se suma automáticamente \+1, Ventaja ni un segundo bono/);
  assert.match(guide,/El método se declara antes de tirar/);
});

test("las Habilidades sociales preservan agencia y separan lectura, mentira y presión",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const guide=skillGuide(manual);

  assert.match(guide,/Persuasión, Engaño e Intimidación no son control mental/);
  assert.match(guide,/Empatía \*\*no es un detector de mentiras\*\*/);
  assert.match(guide,/PRE \+ Intimidación contra Defensa Mental/);
  assert.match(guide,/Engaño[\s\S]*PER \+ Empatía[\s\S]*INT \+ Investigación/);
  assert.match(guide,/Persuasión no convierte una petición imposible en razonable/);
});

test("la guía separa competencias de exploración, conocimiento y técnica",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const guide=skillGuide(manual);

  assert.match(guide,/Rastrear no produce coordenadas perfectas/);
  assert.match(guide,/Investigar no crea pistas que no existen/);
  assert.match(guide,/Un Dominante no vuelve omnisciente al personaje/);
  assert.match(guide,/Encontrar una trampa oculta suele usar Investigación; desactivarla suele usar Latrocinio/);
  assert.match(guide,/Ingeniería permite saber \*\*qué\*\* debe hacerse; fabricar o reparar físicamente puede requerir además Artesanía/);
  assert.match(guide,/Conocer Alquimia o conocer una Fórmula \*\*no significa poseer una dosis preparada\*\*/);
});

test("las Habilidades de combate y magia remiten a los subsistemas correctos",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const guide=skillGuide(manual);

  for(const label of ["Armas Ligeras","Armas Marciales","Armas Pesadas","Armas a Distancia"]){
    assert.equal(guide.includes("#### "+label),true,label);
  }
  assert.match(guide,/2d10 \+ Atributo pertinente \+ Armas Ligeras \+ modificadores contra Defensa/);
  assert.match(guide,/Estar adyacente a un enemigo no impone por sí solo una penalización universal a todo ataque a distancia/);
  assert.match(guide,/Canalización representa control mágico directo/);
  assert.match(guide,/Canalización por sí sola no concede:/);
  assert.match(guide,/Ritualismo representa preparación y ejecución del Método Ritual/);
  assert.match(guide,/Ritualismo no convierte un Ritual en una Acción de combate/);
});

test("Manejo y Pilotaje quedan diferenciados por tipo de control",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const guide=skillGuide(manual);

  assert.match(guide,/Manejo cubre control inmediato de monturas, vehículos terrestres y maquinaria móvil/);
  assert.match(guide,/Pilotaje cubre transporte complejo dependiente de trayectoria, instrumental o infraestructura/);
  assert.match(guide,/Manejo no sustituye Pilotaje/);
  assert.match(guide,/Pilotaje no sustituye Ingeniería/);
});

test("la tabla de fronteras ofrece casos concretos sin habilitar reroll por cambiar de Habilidad",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const guide=skillGuide(manual);

  for(const row of [
    "| Seguir huellas en el terreno | Supervivencia |",
    "| Buscar sistemáticamente una habitación | Investigación |",
    "| Detectar nerviosismo en un sospechoso | Empatía |",
    "| Hacer creíble una mentira | Engaño |",
    "| Desactivar la trampa encontrada | Latrocinio |",
    "| Diagnosticar una máquina | Ingeniería |",
    "| Reparar físicamente una pieza ordinaria | Artesanía |",
    "| Comprender un fenómeno mágico | Arcana |",
    "| Producir un hechizo Directo | Canalización |",
    "| Ejecutar un Ritual mágico | Ritualismo |"
  ]) assert.equal(guide.includes(row),true,row);

  assert.match(guide,/no permite repetir gratuitamente una prueba fallida/i);
});
