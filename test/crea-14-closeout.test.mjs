import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";

const manualUrl=new URL("../docs/Tierra_Magica_Manual_Maestro.md",import.meta.url);
const closeoutUrl=new URL("../docs/archive/creacion/CREA-14_CIERRE_AUTOSUFICIENCIA_CREACION.md",import.meta.url);

test("CREA-14: el Manual contiene todas las piezas de creación autosuficiente",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  for(const term of [
    "### Paso 1 — Concepto, Ascendencia, Origen y Trasfondo",
    "### Paso 4 — Rasgos: 3 PR",
    "### Paso 5 — Familiar, si corresponde",
    "### Paso 6 — Equipo inicial, PEI y Reserva",
    "### Paso 7 — Valores derivados",
    "### Ejemplo completo de creación de nivel 1",
    "Común de Concordia",
    "Faceta de Origen",
    "Compra libre",
    "Perfiles Iniciales",
    "Bono Defensivo"
  ]) assert.equal(manual.includes(term),true,term);

  assert.equal(manual.includes("Ejemplo guiado de creación de nivel 1 — cierre CREA-14 en curso"),false);
  assert.equal(manual.includes("bloqueado temporalmente para creación estándar"),false);
});

test("CREA-14: catálogo de identidad tiene cobertura cerrada",()=>{
  const catalog=coreCatalog();
  assert.equal(catalog.filter((entry)=>entry.type==="ancestry").length,17);
  assert.equal(catalog.filter((entry)=>entry.type==="origin").length,10);
  assert.equal(catalog.filter((entry)=>entry.type==="background").length,14);
  const familiar=catalog.find((entry)=>entry.type==="trait" && entry.name==="Familiar Mágico");
  assert.ok(familiar);
  assert.equal(familiar.system.tags.includes("creation-locked"),false);
  assert.equal(familiar.system.tags.includes("standard-creation"),true);
});

test("CREA-14: documento de cierre queda marcado como cerrado",async()=>{
  const closeout=await readFile(closeoutUrl,"utf8");
  assert.match(closeout,/Estado:\*\* CERRADO/);
  assert.match(closeout,/\*\*CREA-14 queda cerrado\.\*\*/);
});
