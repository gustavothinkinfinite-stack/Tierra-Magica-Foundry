import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const read=(path)=>readFile(resolve(root,path),"utf8");

test("release exige una única versión entre manifest y package",async()=>{
  const manifest=JSON.parse(await read("system.json"));
  const pkg=JSON.parse(await read("package.json"));
  assert.equal(manifest.version,pkg.version);
  assert.match(manifest.version,/^\d+\.\d+\.\d+$/);
  assert.doesNotMatch(manifest.description,/candidato|no publicado|sin release|pendiente de publicación/i,
    "La descripción pública del sistema debe ser neutra antes de crear un tag.");
});

test("el candidato 1.12 mantiene el inventario y el estado editorial coherentes",async()=>{
  const manifest=JSON.parse(await read("system.json"));
  if(manifest.version!=="1.12.0") return;
  const readme=await read("README.md");
  const changelog=await read("CHANGELOG.md");
  const sources=await read("docs/FUENTES_CANONICAS.md");
  assert.match(readme,/Estado de desarrollo 1\.12\.0/);
  assert.match(readme,/23 Actores/);
  assert.match(readme,/44 archivos WebP/);
  assert.match(changelog,/1\.12\.0 — PREPARADA · NO PUBLICADA/);
  assert.match(sources,/habilidades y estadísticas originales/);
});

test("compendios se reconstruyen desde cero y verifican documentos reales",async()=>{
  const source=await read("tools/build-packs.mjs");
  assert.match(source,/rm\(sourceRoot,\{recursive:true,force:true\}\)/);
  assert.match(source,/rm\(outputRoot,\{recursive:true,force:true\}\)/);
  assert.match(source,/_key:"!items!"/);
  assert.match(source,/extractPack\(outputDir,verifyDir/);
  assert.match(source,/unpacked\.length!==entries\.length/);
});

test("staging de release excluye desarrollo y fija URLs publicadas",async()=>{
  const stage=await read("tools/stage-release.mjs");
  for(const entry of ["assets","lang","packs","scripts","styles","templates","system.json","template.json"]){
    assert.match(stage,new RegExp('"'+entry.replace(".","\\.")+'"'));
  }
  const runtimeBlock=stage.slice(stage.indexOf("const runtimeEntries=["),stage.indexOf("];",stage.indexOf("const runtimeEntries=["))+2);
  for(const forbidden of ['"docs"','"test"','"tools"','"package.json"']){
    assert.equal(runtimeBlock.includes(forbidden),false);
  }
  assert.match(stage,/releases\/latest\/download\/system\.json/);
  assert.match(stage,/releases\/download\/v/);
});

test("workflow bloquea versión incoherente y publica ZIP más manifest",async()=>{
  const workflow=await read(".github/workflows/release.yml");
  assert.match(workflow,/system\.json \(\$VERSION\) y package\.json/);
  assert.match(workflow,/EXPECTED_TAG="v\$VERSION"/);
  assert.match(workflow,/git ls-remote --exit-code --tags/);
  assert.match(workflow,/npm run audit:crafting/);
  assert.match(workflow,/npm run validate/);
  assert.match(workflow,/unzip -t tierra-magica\.zip/);
  assert.match(workflow,/npm run stage:release/);
  assert.match(workflow,/tierra-magica\.zip/);
  assert.match(workflow,/package\/tierra-magica\/system\.json/);
  assert.match(workflow,/releases\/latest\/download\/system\.json/);
  assert.match(workflow,/tierra-magica\/packs\/bestiary\//);
  assert.match(workflow,/bestiary\?\.type/);
});
