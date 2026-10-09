import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
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
    "ARQUITECTURA_POLITICA_CIUDADES_REVISION_v1.md",
    "AUDITORIA_FINAL_CIUDADES_MANUAL_v1.md",
    "AUDITORIA_INTEGRAL_FINAL_1.0.md",
    "CANON_CIUDADES.md",
    "CANON_CIUDADES_PRINCIPALES_v1.md",
    "CATALOGO_MAESTRO_ARMAS_v1.md",
    "CIUDADES_PRINCIPALES_MANUAL_COMPACTO_v1.md",
    "CIUDADES_PRINCIPALES_REVISION_v1.md",
    "COMERCIO_NPC_COFRES.md",
    "CRONOLOGIA_EDRIA_CANON_v1.md",
    "CRONOLOGIA_URBANA_CANON_v1.md",
    "CRONOLOGIA_URBANA_PROPUESTA_v1.md",
    "EQP-01_EQUIPO_AVENTURA_HERRAMIENTAS.md",
    "ESC-01_CATALOGO_MAESTRO_ESCUDOS.md",
    "FUENTES_CANONICAS.md",
    "README.md",
    "RED_URBANA_EDRIA_REVISION_v1.md",
    "REFERENCIA_RAPIDA_GLOSARIO_1.0.md",
    "Tierra_Magica_Manual_Maestro.md"
  ].sort());
  assert.deepEqual(dirs,["archive","visual"].sort());
});

test("archivo documental está separado por función",async()=>{
  const entries=await readdir(resolve(docsRoot,"archive"),{withFileTypes:true});
  const dirs=entries.filter((entry)=>entry.isDirectory()).map((entry)=>entry.name).sort();
  assert.deepEqual(dirs,["audits","catalogos","crafting","creacion","fuentes_externas","historico","releases"].sort());
  assert.equal((await stat(resolve(docsRoot,"archive","README.md"))).isFile(),true);
});


async function textFiles(dir){
  const entries=await readdir(dir,{withFileTypes:true});
  const files=[];
  for(const entry of entries){
    const full=resolve(dir,entry.name);
    if(entry.isDirectory()) files.push(...await textFiles(full));
    else if(/\.(?:md|mjs|js|json|yml|yaml|txt)$/.test(entry.name)) files.push(full);
  }
  return files;
}

test("no quedan referencias a las antiguas rutas documentales",async()=>{
  const files=[
    resolve(root,"README.md"),
    resolve(root,"CHANGELOG.md"),
    ...await textFiles(resolve(root,"docs")),
    ...await textFiles(resolve(root,"test"))
  ];
  const stale=/docs\/(?:audits\/|CRAFT-|CREA-(?:12|13|14|15)|CAT-(?:0[2-9]|1[01]|SYNC)|DOC-CAT-|REV-CREA-11|RELEASE_READINESS_|Foundry_TM_Manual_1\.0_Playtest|AUDITORIA_MANUAL_MAESTRO_1\.0\.11)/g;
  const hits=[];
  for(const file of files){
    const content=await readFile(file,"utf8");
    if(stale.test(content)) hits.push(file.replace(root+"/",""));
    stale.lastIndex=0;
  }
  assert.deepEqual(hits,[]);
});
