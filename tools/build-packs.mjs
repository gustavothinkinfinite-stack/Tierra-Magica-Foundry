import { compilePack, extractPack } from "@foundryvtt/foundryvtt-cli";
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import { npcReferenceCatalog } from "../scripts/catalog/npc-catalog.mjs";
import { originalBestiaryCatalog } from "../scripts/catalog/original-bestiary.mjs";
import { fiveApprovedCreatureCatalog } from "../scripts/catalog/approved-creatures-v1.mjs";
import { APPROVED_BESTIARY_ART_SLUGS, bestiaryArtFiles } from "../scripts/catalog/npc-art.mjs";

const root = resolve(import.meta.dirname, "..");
const sourceRoot = resolve(root, ".pack-source");
const outputRoot = resolve(root, "packs");
const verifyRoot = resolve(root, ".pack-verify");

const groups = {
  "character-options": new Set(["ancestry","origin","background","specialization","technique","trait"]),
  "magic": new Set(["discipline","spell","ritual"]),
  "equipment": new Set(["weapon","armor","shield","equipment","device"]),
  "production": new Set(["formula"])
};

const idFor = (type, slug) => createHash("sha256").update(type + ":" + slug).digest("hex").slice(0,16);

await rm(sourceRoot,{recursive:true,force:true});
await rm(outputRoot,{recursive:true,force:true});
await rm(verifyRoot,{recursive:true,force:true});
await mkdir(sourceRoot,{recursive:true});
await mkdir(outputRoot,{recursive:true});

for (const [pack, types] of Object.entries(groups)) {
  const sourceDir=resolve(sourceRoot,pack);
  const outputDir=resolve(outputRoot,pack);
  await mkdir(sourceDir,{recursive:true});
  const entries=coreCatalog().filter((entry)=>types.has(entry.type));
  for (const entry of entries) {
    const document={
      _id:idFor(entry.type,entry.system.slug),
      _key:"!items!"+idFor(entry.type,entry.system.slug),
      name:entry.name,
      type:entry.type,
      img:entry.img ?? "icons/svg/item-bag.svg",
      system:entry.system,
      effects:[],
      folder:null,
      sort:0,
      ownership:{default:0},
      flags:{}
    };
    await writeFile(resolve(sourceDir,document._id+".json"),JSON.stringify(document,null,2)+"\n","utf8");
  }
  await compilePack(sourceDir,outputDir,{log:false});
  const verifyDir=resolve(verifyRoot,pack);
  await extractPack(outputDir,verifyDir,{log:false,clean:true});
  const unpacked=(await readdir(verifyDir)).filter((name)=>name.endsWith(".json"));
  if(unpacked.length!==entries.length){
    throw new Error("Compendio "+pack+" inválido: esperaba "+entries.length+" Items y contiene "+unpacked.length+".");
  }
  console.log("Built "+pack+" ("+entries.length+" Items)");
}
await rm(verifyRoot,{recursive:true,force:true});

// Compendio de Actor separado: los NPC no son Items, ni siguen presupuestos PJ.
const actorPack="bestiary";
// El paquete solamente apunta a arte verdaderamente presente en la release.
const artDir=resolve(root,"assets/bestiary");
const availableArtFiles=new Set((await readdir(artDir).catch((error)=>{
  if(error.code==="ENOENT") return [];
  throw error;
})).filter((name)=>name!== "README.md"));
const expectedArtFiles=new Set(APPROVED_BESTIARY_ART_SLUGS.flatMap((slug)=>{
  const files=bestiaryArtFiles(slug);
  return [files.portrait,files.token];
}));
for(const name of availableArtFiles) {
  if(!expectedArtFiles.has(name)) throw new Error("Arte del Bestiario no registrado o provisional: "+name);
  const bytes=await readFile(resolve(artDir,name));
  if(bytes.length<128 || bytes.toString("ascii",0,4)!=="RIFF" || bytes.toString("ascii",8,12)!=="WEBP") {
    throw new Error("Arte del Bestiario no es WebP válido: "+name);
  }
}
for(const slug of APPROVED_BESTIARY_ART_SLUGS) {
  const files=bestiaryArtFiles(slug);
  if(availableArtFiles.has(files.portrait)!==availableArtFiles.has(files.token)) {
    throw new Error("El retrato y el token deben publicarse juntos: "+slug);
  }
}
const actorEntries=[
  ...npcReferenceCatalog({availableArtFiles}),
  ...originalBestiaryCatalog({availableArtFiles}),
  ...fiveApprovedCreatureCatalog({availableArtFiles})
];
const actorSource=resolve(sourceRoot,actorPack);
const actorOutput=resolve(outputRoot,actorPack);
await mkdir(actorSource,{recursive:true});
for (const entry of actorEntries) {
  const slug=entry.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const id=idFor("npc",slug);
  const document={
    _id:id,
    _key:"!actors!"+id,
    name:entry.name,
    type:"npc",
    img:entry.img,
    system:entry.system,
    prototypeToken:entry.prototypeToken,
    items:[],
    effects:[],
    folder:null,
    sort:0,
    ownership:{default:0},
    flags:{"tierra-magica":{
      source:entry.system.npcProfile.abilities?.length ? "original-bestiary-proposal" : "manual-maestro-23",
      referenceSlug:slug,
      ...(entry.system.npcProfile.abilities?.length ? {canonicalStatus:"propuesta-pendiente"} : {})
    }}
  };
  await writeFile(resolve(actorSource,id+".json"),JSON.stringify(document,null,2)+"\n","utf8");
}
await compilePack(actorSource,actorOutput,{log:false});
const actorVerify=resolve(verifyRoot,actorPack);
await extractPack(actorOutput,actorVerify,{log:false,clean:true});
const extractedActors=(await readdir(actorVerify)).filter((name)=>name.endsWith(".json"));
if(extractedActors.length!==actorEntries.length) {
  throw new Error("Bestiario inválido: esperaba "+actorEntries.length+
    " Actors y contiene "+extractedActors.length+".");
}
console.log("Built "+actorPack+" ("+actorEntries.length+" Actors)");
await rm(actorVerify,{recursive:true,force:true});
