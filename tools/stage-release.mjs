import { access, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root=resolve(import.meta.dirname,"..");
const stageRoot=resolve(root,"package","tierra-magica");
const sourceManifest=JSON.parse(await readFile(resolve(root,"system.json"),"utf8"));
const packageJson=JSON.parse(await readFile(resolve(root,"package.json"),"utf8"));

if(sourceManifest.version!==packageJson.version){
  throw new Error("system.json y package.json deben declarar la misma versión.");
}
if(!/^\d+\.\d+\.\d+$/.test(sourceManifest.version)){
  throw new Error("La versión debe usar formato semántico X.Y.Z.");
}
if(/candidato|no publicado|sin release|pendiente de publicación/i.test(String(sourceManifest.description??""))){
  throw new Error("La descripción pública no debe contener marcas de versión provisional.");
}

const runtimeEntries=[
  "assets",
  "lang",
  "packs",
  "scripts",
  "styles",
  "templates",
  "system.json",
  "template.json",
  "README.md",
  "CHANGELOG.md"
];

await rm(resolve(root,"package"),{recursive:true,force:true});
await mkdir(stageRoot,{recursive:true});

for(const entry of runtimeEntries){
  const source=resolve(root,entry);
  await access(source);
  await cp(source,resolve(stageRoot,entry),{recursive:true});
}

const repoUrl=String(sourceManifest.url??"").replace(/\/$/,"");
if(!/^https:\/\/github\.com\/[^/]+\/[^/]+$/.test(repoUrl)){
  throw new Error("system.json.url debe identificar el repositorio público de GitHub.");
}

const releaseManifest={
  ...sourceManifest,
  manifest:repoUrl+"/releases/latest/download/system.json",
  download:repoUrl+"/releases/download/v"+sourceManifest.version+"/tierra-magica.zip"
};
await writeFile(
  resolve(stageRoot,"system.json"),
  JSON.stringify(releaseManifest,null,2)+"\n",
  "utf8"
);

console.log("Release staged: v"+sourceManifest.version);
console.log("Manifest: "+releaseManifest.manifest);
console.log("Download: "+releaseManifest.download);
