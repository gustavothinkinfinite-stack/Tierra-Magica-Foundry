import test from "node:test";
import assert from "node:assert/strict";
import { readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root=resolve(fileURLToPath(new URL("..",import.meta.url)));
const docsRoot=resolve(root,"docs");

test("docs raíz contiene sólo documentación activa más el archivo",async()=>{
  const entries=await readdir(docsRoot,{withFileTypes:true});
  const files=entries.filter((entry)=>entry.isFile()).map((entry)=>entry.name).sort();
  const dirs=entries.filter((entry)=>entry.isDirectory()).map((entry)=>entry.name).sort();

  assert.deepEqual(files,[
    "ARM-01_CATALOGO_MAESTRO_ARMADURAS.md",
    "AUDITORIA_INTEGRAL_FINAL_1.0.md",
    "CATALOGO_MAESTRO_ARMAS_v1.md",
    "EQP-01_EQUIPO_AVENTURA_HERRAMIENTAS.md",
    "ESC-01_CATALOGO_MAESTRO_ESCUDOS.md",
    "FUENTES_CANONICAS.md",
    "README.md",
    "REFERENCIA_RAPIDA_GLOSARIO_1.0.md",
    "Tierra_Magica_Manual_Maestro.md"
  ].sort());
  assert.deepEqual(dirs,["archive"]);
});

test("archivo documental está separado por función",async()=>{
  const entries=await readdir(resolve(docsRoot,"archive"),{withFileTypes:true});
  const dirs=entries.filter((entry)=>entry.isDirectory()).map((entry)=>entry.name).sort();
  assert.deepEqual(dirs,["audits","catalogos","crafting","creacion","historico","releases"].sort());
  assert.equal((await stat(resolve(docsRoot,"archive","README.md"))).isFile(),true);
});
