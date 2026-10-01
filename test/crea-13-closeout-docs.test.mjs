import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const read=(path)=>readFile(resolve(root,path),"utf8");

test("cierre post-CREA-13 elimina próximos hitos obsoletos",async()=>{
  const readme=await read("README.md");
  const sources=await read("docs/FUENTES_CANONICAS.md");
  assert.equal(readme.includes("CREA-12 queda como próxima tarea prevista"),false);
  assert.equal(sources.includes("CREA-12, próxima tarea prevista"),false);
  assert.match(readme,/CREA-12 y CREA-13 están cerradas e integradas/);
  assert.match(readme,/No existe una fase \*\*CREA-14\*\* definida/);
  assert.match(sources,/No existe una fase CREA-14 definida/);
});

test("Manual Maestro permanece como fuente activa única en los documentos de cierre",async()=>{
  const readme=await read("README.md");
  const sources=await read("docs/FUENTES_CANONICAS.md");
  const audit=await read("docs/AUDITORIA_INTEGRAL_FINAL_1.0.md");
  for(const text of [readme,sources,audit]) assert.match(text,/docs\/Tierra_Magica_Manual_Maestro\.md/);
  assert.equal(audit.includes("La fuente mecánica canónica continúa siendo `docs/Foundry_TM_Manual_1.0_Playtest.md`"),false);
});

test("CREA-13 sigue registrada como integrada aunque el sistema avance a 1.1.0",async()=>{
  const closeout=await read("docs/CREA-13_VALIDACION_GLOBAL.md");
  const changelog=await read("CHANGELOG.md");
  const system=JSON.parse(await read("system.json"));
  const pkg=JSON.parse(await read("package.json"));

  assert.match(closeout,/CERRADA E INTEGRADA/);
  assert.match(closeout,/59883673c3b9d215b7b108f7078e9bbff1f5505f/);
  assert.match(changelog,/cierre documental post-CREA-13/);
  assert.match(changelog,/Sin cambios de motor ni incremento de versión/);
  assert.equal(system.version,"1.1.0");
  assert.equal(pkg.version,"1.1.0");
});
