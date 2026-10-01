import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");

test("REV-CREA-11-001 mantiene Manual y decisiones CREA-10/11 sincronizados",async()=>{
  const manual=await readFile(resolve(root,"docs/Tierra_Magica_Manual_Maestro.md"),"utf8");
  assert.equal(manual.includes("Familiar Mágico 2;"),false);
  assert.equal(manual.includes("Durante la creación inicial hay un máximo de **2 Especializaciones por Habilidad madre**"),true);
  assert.equal(manual.includes("Truco, Menor y Básico requieren Entrenado; Avanzado requiere Experto; Maestro requiere Maestro; Legendario requiere Gran Maestro"),true);
  assert.equal(manual.includes("| Daga | 3 | 0 | 0 | 6 p |"),true);
  assert.equal(manual.includes("| Armadura ligera | 1 | 0 | 1 o 5 p |"),true);
  assert.equal(manual.includes("| Cierre Restaurador | Restauración | Básico | 3 | Recupera 4 Vida"),true);
  assert.equal(manual.includes("| Visión Arcana | Percepción | Menor | 2 | PER; DF 10 cuando exista incertidumbre; duración Escena. |"),true);
  assert.equal(manual.includes("Regeneración | Restauración | Avanzado | 6 | Método Ritual"),true);
});

test("REV-CREA-11-001 deja derivados pendientes fuera de alcance",async()=>{
  const revision=await readFile(resolve(root,"docs/REV-CREA-11-001_SINCRONIZACION_POST_CIERRE.md"),"utf8");
  for(const term of ["Piel Alterada","FUE mínima","Movimiento cuantificado","Sangrado"]) assert.equal(revision.includes(term),true);
});
