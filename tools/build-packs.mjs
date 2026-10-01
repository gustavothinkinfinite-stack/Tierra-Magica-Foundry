import { compilePack } from "@foundryvtt/foundryvtt-cli";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";

const root = resolve(import.meta.dirname, "..");
const sourceRoot = resolve(root, ".pack-source");
const outputRoot = resolve(root, "packs");

const groups = {
  "character-options": new Set(["ancestry","origin","background","specialization","technique","trait"]),
  "magic": new Set(["discipline","spell","ritual"]),
  "equipment": new Set(["weapon","armor","shield","equipment","device"]),
  "production": new Set(["formula"])
};

const idFor = (type, slug) => createHash("sha256").update(type + ":" + slug).digest("hex").slice(0,16);

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
  console.log("Built "+pack+" ("+entries.length+" Items)");
}
