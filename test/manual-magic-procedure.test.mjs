import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const manualUrl=new URL("../docs/Tierra_Magica_Manual_Maestro.md",import.meta.url);

function magicSection(manual){
  const start=manual.indexOf("## 11. Magia");
  const end=manual.indexOf("## 12. Grimorio canónico",start);
  assert.ok(start>=0);
  assert.ok(end>start);
  return manual.slice(start,end);
}

test("el Manual explica el lanzamiento mágico completo paso a paso",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const magic=magicSection(manual);

  for(const heading of [
    "### Competencia operativa",
    "### Acción, Reacción y Ritual",
    "### Lanzar un hechizo Directo, paso a paso",
    "#### 1. Declara el hechizo",
    "#### 2. Comprueba que el lanzamiento sea válido",
    "#### 3. Comprueba y paga el Maná",
    "#### 4. Abre la ventana de Reacciones mágicas",
    "#### 5. Determina si hace falta una tirada",
    "#### 6. Determina Atributo, Habilidad y oposición",
    "#### 7. Tira y compara",
    "#### 8. Aplica el efecto",
    "#### 9. Si es Sostenido, registra el Sostenimiento",
    "### Sobrecarga, paso a paso",
    "### Origen Remoto",
    "### Hechizos reactivos",
    "### Contramagia",
    "### Rituales y combate",
    "### Ejemplo completo: tres turnos de un canalizador",
    "### Resumen rápido del lanzamiento mágico"
  ]) assert.equal(magic.includes(heading),true,heading);

  assert.match(magic,/2d10 \+ Atributo relevante \+ Canalización/);
  assert.match(magic,/2d10 \+ Atributo relevante \+ Ritualismo/);
  assert.match(magic,/2d10 \+ VOL \+ Canalización contra DF 17/);
  assert.match(magic,/DF de Ilusión = 11 \+ Atributo usado al lanzar \+ bono de Canalización/);
});

test("la secuencia mágica compromete recursos antes de la resolución y no devuelve Maná por fallo",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const magic=magicSection(manual);

  const declare=magic.indexOf("#### 1. Declara el hechizo");
  const validate=magic.indexOf("#### 2. Comprueba que el lanzamiento sea válido");
  const pay=magic.indexOf("#### 3. Comprueba y paga el Maná");
  const reactions=magic.indexOf("#### 4. Abre la ventana de Reacciones mágicas");
  const roll=magic.indexOf("#### 7. Tira y compara");
  const effect=magic.indexOf("#### 8. Aplica el efecto");
  assert.ok(declare<validate && validate<pay && pay<reactions && reactions<roll && roll<effect);

  assert.match(magic,/El Maná se gasta aunque después:/);
  assert.match(magic,/No existe devolución universal de Maná por fallo/);
  assert.match(magic,/una declaración inválida que no supera las comprobaciones previas/i);
  assert.match(magic,/no debe consumir recursos/i);
});

test("el Manual cubre objetivo, área, daño, curación, influencia, ilusión y Sostenimiento",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const magic=magicSection(manual);

  for(const heading of [
    "### Hechizos con objetivo único",
    "### Hechizos multiobjetivo",
    "### Hechizos de área",
    "### Daño mágico, Protección y Penetración",
    "### Curación mágica",
    "### Influencia mental",
    "### Ilusiones",
    "### Sostenimiento"
  ]) assert.equal(magic.includes(heading),true,heading);

  assert.match(magic,/un área usa \*\*una sola resolución de lanzamiento\*\*/i);
  assert.match(magic,/un Actor sólo recibe una vez la misma resolución/i);
  assert.match(magic,/Recuperar Vida no reduce Trauma automáticamente/i);
  assert.match(magic,/límite normal es \*\*1 efecto Sostenido demandante\*\*/);
  assert.match(magic,/Doble Sostenimiento.*permite 2/);
});

test("Sobrecarga no sustituye la tirada ofensiva normal",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const magic=magicSection(manual);

  assert.match(magic,/falta \*\*exactamente 1 Maná\*\*/);
  assert.match(magic,/gasta \*\*todo el Maná restante\*\*/);
  assert.match(magic,/si tiene éxito, el lanzamiento continúa y se resuelve normalmente/i);
  assert.match(magic,/no significa impactar automáticamente/i);
  assert.match(magic,/todavía se resuelve su oposición normal/i);
});

test("el ejemplo mágico demuestra fallo por Barrera, Sostenimiento y Sobrecarga",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const magic=magicSection(manual);
  const start=magic.indexOf("### Ejemplo completo: tres turnos de un canalizador");
  const end=magic.indexOf("### Resumen rápido del lanzamiento mágico",start);
  const example=magic.slice(start,end);

  for(const term of [
    "Proyectil Ígneo",
    "Barrera Cinética",
    "Piel Alterada",
    "Onda de Choque",
    "10",
    "7",
    "3",
    "0",
    "Exhausta"
  ]) assert.equal(example.includes(term),true,term);

  assert.match(example,/Defensa 13 pasa a \*\*15\*\*/);
  assert.match(example,/total \*\*14\*\*/);
  assert.match(example,/no recupera los 3 Maná/i);
  assert.match(example,/entra en su único espacio normal de Sostenimiento/i);
  assert.match(example,/total \*\*17\*\*/);
  assert.match(example,/daño final es \*\*3\*\*/i);
});
