import test from "node:test";
import assert from "node:assert/strict";
import {readFile,readdir} from "node:fs/promises";
import {resolve} from "node:path";
import {APPROVED_ORIGINAL_CREATURES,fiveApprovedCreatureCatalog} from "../scripts/catalog/approved-creatures-v1.mjs";
import {NPC_REFERENCE_PROFILES,npcReferenceCatalog} from "../scripts/catalog/npc-catalog.mjs";
import {originalBestiaryCatalog} from "../scripts/catalog/original-bestiary.mjs";
import {bestiaryArtFiles,resolveBestiaryArt} from "../scripts/catalog/npc-art.mjs";
import {deriveActorState} from "../scripts/rules/derived-state.mjs";

const slugs=["ciervo-astral","arana-de-campanario","jabali-igneo","garza-de-cristal","sabueso-espectral"];

test("cinco originales distintos de todos los perfiles anteriores",()=>{
 assert.equal(APPROVED_ORIGINAL_CREATURES.length,5);
 assert.deepEqual(APPROVED_ORIGINAL_CREATURES.map(s=>s.slug),slugs);
 const entries=fiveApprovedCreatureCatalog();
 const prior=new Set([...npcReferenceCatalog(),...originalBestiaryCatalog()].map(x=>x.name));
 assert.equal(new Set(entries.map(x=>x.name)).size,5);
 assert.ok(entries.every(x=>!prior.has(x.name)&&x.type==="npc"));
 assert.equal(NPC_REFERENCE_PROFILES.length,11,"los perfiles canónicos no cambian");
});

test("fichas completas con derivados y ataques reales sin progresión de PJ",()=>{
 for(const entry of fiveApprovedCreatureCatalog()){
  const p=entry.system.npcProfile;
  assert.equal(p.enabled,true);
  const derived=deriveActorState({actorType:"npc",system:entry.system});
  for(const [key,field] of [["life","healthMax"],["defense","defense"],
    ["mentalDefense","mentalDefense"],["maneuverDefense","maneuverDefense"],
    ["protection","protection"],["movement","movement"],["initiative","initiativeModifier"]]){
    assert.equal(derived[field],p[key],entry.name+" "+field);
  }
  assert.equal(derived.bodyDefense,p.bodyDefense);
  assert.equal(entry.system.resources.health.value,p.life);
  assert.ok(p.life>0&&p.defense>=10&&p.movement>0);
  assert.equal(entry.system.resources.mana.max,0);
  assert.equal(p.attacks.length,1);
  assert.ok(Number.isInteger(p.attacks[0].bonus)&&Number.isInteger(p.attacks[0].damage));
  assert.equal(entry.prototypeToken.actorLink,false);
  assert.ok(entry.system.biography.includes("Ecología"));
  assert.ok(entry.system.notes.includes("Gancho de aventura"));
  assert.match(p.source,/propuesta mecánica/);
 }
});

test("cada don tiene una Acción, alcance y límite explícitos; no genera efectos automáticos",()=>{
 for(const actor of fiveApprovedCreatureCatalog()){
  const p=actor.system.npcProfile;
  assert.equal(p.abilities.length,1,actor.name);
  const [don]=p.abilities;
  assert.equal(don.actionCost,1);
  assert.equal(don.activation,"Acción");
  assert.equal(don.manaCost,0);
  assert.ok(Number.isInteger(don.rangeSpaces)&&don.rangeSpaces>0);
  assert.ok(don.detectionSkills.length>=1);
  assert.ok(don.detectionDifficulty>=10&&don.detectionDifficulty<=16);
  assert.ok(don.limitations.length>40);
  assert.ok(don.resolution.includes("DJ"));
  assert.equal(actor.items,undefined);
  assert.equal(actor.effects,undefined);
 }
});

test("la Araña es un constructo, Garza mantiene amenaza baja, Jabalí no quema automáticamente",()=>{
 const docs=fiveApprovedCreatureCatalog();
 const spider=docs.find(x=>x.name==="Araña de Campanario");
 assert.equal(spider.system.npcProfile.bodyDefense,null);
 assert.equal(spider.prototypeToken.width,2);
 const heron=docs.find(x=>x.name==="Garza de Cristal");
 assert.equal(heron.system.npcProfile.attacks[0].damage,3);
 assert.equal(heron.prototypeToken.width,1);
 const boar=docs.find(x=>x.name==="Jabalí Ígneo");
 assert.match(boar.system.npcProfile.abilities[0].limitations,/no causa daño directo/);
 assert.equal(boar.system.npcProfile.attacks[0].damage,8);
});

test("hay diez WebP binarios reales y cada token tiene canal alfa en el archivo",async()=>{
 const folder=resolve("assets/bestiary");
 const names=new Set(await readdir(folder));
 for(const slug of slugs){
  const files=bestiaryArtFiles(slug);
  assert.ok(files,slug);
  for(const name of [files.portrait,files.token]){
   assert.ok(names.has(name),name);
   const bytes=await readFile(resolve(folder,name));
   assert.ok(bytes.length>5000,name);
   assert.equal(bytes.toString("ascii",0,4),"RIFF",name);
   assert.equal(bytes.toString("ascii",8,12),"WEBP",name);
  }
  const both=new Set([files.portrait,files.token]);
  const actor=fiveApprovedCreatureCatalog({availableArtFiles:both}).find(x=>x.name===APPROVED_ORIGINAL_CREATURES.find(s=>s.slug===slug).name);
  assert.equal(actor.img,"systems/tierra-magica/assets/bestiary/"+files.portrait);
  assert.equal(actor.prototypeToken.texture.src,"systems/tierra-magica/assets/bestiary/"+files.token);
  const single=new Set([files.token]);
  assert.equal(resolveBestiaryArt(slug,single),null);
 }
});

test("la compilación incorpora el catálogo cinco veces y no habilita lanzamiento automático",async()=>{
 const build=await readFile(resolve("tools/build-packs.mjs"),"utf8");
 const release=await readFile(resolve(".github/workflows/release.yml"),"utf8");
 assert.match(build,/\.\.\.fiveApprovedCreatureCatalog\(\{availableArtFiles\}\)/);
 assert.match(release,/release\/v\*/);
 const manifest=JSON.parse(await readFile(resolve("system.json"),"utf8"));
 assert.equal(manifest.packs.find(x=>x.name==="bestiary").type,"Actor");
});
