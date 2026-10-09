import test from "node:test";
import assert from "node:assert/strict";
import {readFile,readdir} from "node:fs/promises";
import {resolve} from "node:path";
import {SECOND_BATCH_ORIGINAL_CREATURES,secondBatchCreatureCatalog} from "../scripts/catalog/approved-creatures-v2.mjs";
import {APPROVED_ORIGINAL_CREATURES,fiveApprovedCreatureCatalog} from "../scripts/catalog/approved-creatures-v1.mjs";
import {npcReferenceCatalog,NPC_REFERENCE_PROFILES} from "../scripts/catalog/npc-catalog.mjs";
import {originalBestiaryCatalog} from "../scripts/catalog/original-bestiary.mjs";
import {bestiaryArtFiles,resolveBestiaryArt} from "../scripts/catalog/npc-art.mjs";
import {deriveActorState} from "../scripts/rules/derived-state.mjs";

const slugs=["zorro-carmesi","carnero-del-alba-dorada","lagarto-de-cristal","cuervo-de-cobre","nutria-encantada"];

test("segunda tanda original tiene cinco actores distintos y 22 actores únicos en total",()=>{
 assert.deepEqual(SECOND_BATCH_ORIGINAL_CREATURES.map(spec=>spec.slug),slugs);
 assert.equal(SECOND_BATCH_ORIGINAL_CREATURES.length,5);
 assert.equal(APPROVED_ORIGINAL_CREATURES.length,5);
 assert.equal(NPC_REFERENCE_PROFILES.length,11);
 const all=[...npcReferenceCatalog(),...originalBestiaryCatalog(),...fiveApprovedCreatureCatalog(),...secondBatchCreatureCatalog()];
 assert.equal(all.length,22);
 assert.equal(new Set(all.map(actor=>actor.name)).size,22);
 assert.ok(all.every(actor=>actor.type==="npc"&&actor.system.npcProfile.enabled));
});

test("cinco fichas completas y valores derivados sin presupuesto de PJ",()=>{
 for(const actor of secondBatchCreatureCatalog()){
   const p=actor.system.npcProfile;
   const derived=deriveActorState({actorType:"npc",system:actor.system});
   for(const [source,target] of [
     ["life","healthMax"],["defense","defense"],["bodyDefense","bodyDefense"],
     ["mentalDefense","mentalDefense"],["maneuverDefense","maneuverDefense"],
     ["protection","protection"],["movement","movement"],["initiative","initiativeModifier"]
   ]) assert.equal(derived[target],p[source],actor.name+" "+source);
   assert.equal(actor.system.resources.health.value,p.life);
   assert.equal(actor.system.resources.health.max,p.life);
   assert.equal(actor.system.resources.mana.value,0);
   assert.ok(actor.system.details.threat);
   assert.ok(actor.system.details.concept);
   assert.ok(actor.system.biography.includes("Ecología"));
   assert.ok(actor.system.biography.includes("Rastros"));
   assert.ok(actor.system.notes.includes("Gancho de aventura"));
   assert.equal(p.attacks.length,1);
   assert.ok(Number.isInteger(p.attacks[0].damage)&&p.attacks[0].damage>0);
   assert.equal(actor.prototypeToken.actorLink,false);
   assert.match(p.source,/propuestas para prueba/);
   assert.equal(actor.prototypeToken.texture,undefined);
 }
});

test("habilidades con coste 1 Acción, sin magia sin límites ni efectos automatizados",()=>{
 const ids=new Set();
 for(const actor of secondBatchCreatureCatalog()){
   const p=actor.system.npcProfile;
   assert.equal(p.abilities.length,1,actor.name);
   const [ability]=p.abilities;
   assert.ok(!ids.has(ability.slug),ability.slug);
   ids.add(ability.slug);
   assert.equal(ability.actionCost,1);
   assert.equal(ability.activation,"Acción");
   assert.equal(ability.manaCost,0);
   assert.ok(ability.rangeSpaces>=2&&ability.rangeSpaces<=4);
   assert.ok(ability.detectionDifficulty>=12&&ability.detectionDifficulty<=14);
   assert.ok(ability.detectionSkills.length>=2);
   assert.ok(ability.limitations.length>=60);
   assert.match(ability.resolution,/DJ/);
   assert.equal(actor.system.resources.mana.max,0);
   assert.equal(actor.effects,undefined);
 }
 assert.equal(ids.size,5);
});

test("Carnero usa token grande y el Cuervo es vivo, no constructo",()=>{
 const actors=secondBatchCreatureCatalog();
 const ram=actors.find(a=>a.name==="Carnero del Alba Dorada");
 assert.equal(ram.prototypeToken.width,2);
 assert.equal(ram.prototypeToken.height,2);
 const raven=actors.find(a=>a.name==="Cuervo de Cobre");
 assert.equal(raven.prototypeToken.width,1);
 assert.match(raven.system.details.concept,/sin ser un autómata/);
 const otter=actors.find(a=>a.name==="Nutria Encantada");
 assert.match(otter.system.npcProfile.abilities[0].limitations,/no empuja/);
});

test("10 WebPs con retratos y tokens alfa válidos, vinculados en pares",async()=>{
 const files=new Set(await readdir(resolve("assets/bestiary")));
 for(const spec of SECOND_BATCH_ORIGINAL_CREATURES){
   const pair=bestiaryArtFiles(spec.slug);
   assert.ok(pair,spec.name);
   for(const name of [pair.portrait,pair.token]){
     assert.ok(files.has(name),name);
     const bytes=await readFile(resolve("assets/bestiary",name));
     assert.ok(bytes.length>30000,name);
     assert.equal(bytes.toString("ascii",0,4),"RIFF");
     assert.equal(bytes.toString("ascii",8,12),"WEBP");
     if(name.endsWith("-token.webp")){
       assert.equal(bytes.toString("ascii",12,16),"VP8X",name+" uses extended WebP with alpha");
       assert.ok(bytes[20]&0x10,name+" should preserve transparent circular corners");
     }
   }
   const chosen=new Set([pair.portrait,pair.token]);
   const actor=secondBatchCreatureCatalog({availableArtFiles:chosen}).find(a=>a.name===spec.name);
   assert.equal(actor.img,"systems/tierra-magica/assets/bestiary/"+pair.portrait);
   assert.equal(actor.prototypeToken.texture.src,"systems/tierra-magica/assets/bestiary/"+pair.token);
   assert.equal(resolveBestiaryArt(spec.slug,new Set([pair.token])),null);
   assert.equal(resolveBestiaryArt(spec.slug,new Set([pair.portrait])),null);
 }
});

test("preparación de v1.12 valida 42 imágenes sin crear workflow de publicación",async()=>{
 const source=await readFile(resolve("tools/build-packs.mjs"),"utf8");
 const preview=await readFile(resolve(".github/workflows/prepare-package-preview.yml"),"utf8");
 const manifest=JSON.parse(await readFile(resolve("system.json"),"utf8"));
 assert.match(source,/\.\.\.secondBatchCreatureCatalog\(\{availableArtFiles\}\)/);
 assert.match(preview,/eq 42/);
 assert.match(preview,/nutria-encantada-token\.webp/);
 assert.match(preview,/upload-artifact/);
 assert.doesNotMatch(preview,/action-gh-release/);
 assert.equal(manifest.version,"1.12.0");
 assert.equal(manifest.packs.find(p=>p.name==="bestiary").type,"Actor");
});
