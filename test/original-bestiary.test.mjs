import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import { originalBestiaryCatalog, ORIGINAL_BESTIARY_PROFILES } from "../scripts/catalog/original-bestiary.mjs";
import { npcReferenceCatalog } from "../scripts/catalog/npc-catalog.mjs";
import { bestiaryArtFiles } from "../scripts/catalog/npc-art.mjs";
import { deriveActorState } from "../scripts/rules/derived-state.mjs";

const echoWolf=()=>originalBestiaryCatalog()[0];

test("Lobo del Eco Muerto es un Actor de PNJ original y no sustituye al Lobo",()=>{
  assert.equal(ORIGINAL_BESTIARY_PROFILES.length,1);
  const ordinaryWolf=npcReferenceCatalog().find((a)=>a.name==="Lobo");
  const original=echoWolf();
  assert.equal(original.name,"Lobo del Eco Muerto");
  assert.equal(original.type,"npc");
  assert.equal(original.system.details.role,"Bestia mágica menor");
  assert.equal(ordinaryWolf.name,"Lobo");
  assert.equal(ordinaryWolf.system.npcProfile.abilities,undefined);
  assert.match(original.system.npcProfile.source,/pendiente de canon/);
  assert.equal(original.prototypeToken.actorLink,false);
  assert.equal(original.prototypeToken.texture,undefined);
  assert.notEqual(original.prototypeToken.name,ordinaryWolf.prototypeToken.name);
});

test("las cifras base mantienen el lobo canónico del Manual Maestro",()=>{
  const ordinaryWolf=npcReferenceCatalog().find((a)=>a.name==="Lobo");
  const wolf=echoWolf();
  for(const key of ["life","defense","bodyDefense","mentalDefense","maneuverDefense",
    "protection","movement","initiative","mana"]){
    assert.equal(wolf.system.npcProfile[key],ordinaryWolf.system.npcProfile[key],key);
  }
  assert.deepEqual(wolf.system.npcProfile.attacks.map(({name,bonus,damage,penetration})=>
    ({name,bonus,damage,penetration})),ordinaryWolf.system.npcProfile.attacks.map(({name,bonus,damage,penetration})=>({name,bonus,damage,penetration})));
  const derived=deriveActorState({actorType:"npc",system:wolf.system});
  assert.equal(derived.healthMax,10);
  assert.equal(derived.defense,14);
  assert.equal(derived.movement,8);
  assert.equal(derived.initiativeModifier,4);
});

test("Eco Robado es una capacidad limitada sin automatización de acciones extra",()=>{
  const wolf=echoWolf();
  const [echo]=wolf.system.npcProfile.abilities;
  assert.equal(wolf.system.npcProfile.abilities.length,1);
  assert.equal(echo.name,"Eco Robado");
  assert.equal(echo.actionCost,1);
  assert.equal(echo.manaCost,0);
  assert.equal(echo.rangeSpaces,4);
  assert.equal(echo.memoryHours,24);
  assert.equal(echo.detectionDifficulty,14);
  assert.deepEqual(echo.detectionSkills,["PER + Investigación","PER + Supervivencia"]);
  assert.match(echo.limitations,/controla la voluntad/);
  assert.equal(wolf.system.resources.mana.max,0);
  assert.equal(wolf.system.npcProfile.attacks.length,1);
});

test("retrato y token de Eco Muerto son distintos a los del lobo común y se exigen juntos",()=>{
  const files=bestiaryArtFiles("lobo-del-eco-muerto");
  assert.ok(files);
  assert.notEqual(files.portrait,bestiaryArtFiles("lobo").portrait);
  const portraitOnly=originalBestiaryCatalog({availableArtFiles:new Set([files.portrait])})[0];
  assert.equal(portraitOnly.img,"systems/tierra-magica/assets/icons/actor.svg");
  assert.equal(portraitOnly.prototypeToken.texture,undefined);
  const withArt=originalBestiaryCatalog({availableArtFiles:new Set([files.portrait,files.token])})[0];
  assert.match(withArt.img,/lobo-del-eco-muerto-retrato.webp$/);
  assert.match(withArt.prototypeToken.texture.src,/lobo-del-eco-muerto-token.webp$/);
});

test("el compendio incluye el original con estado editorial separado y la ficha describe su don",async()=>{
  const builder=await readFile(resolve("tools/build-packs.mjs"),"utf8");
  const template=await readFile(resolve("templates/actor/parts/actor-sheet.hbs"),"utf8");
  const schema=JSON.parse(await readFile(resolve("template.json"),"utf8"));
  assert.match(builder,/\.\.\.originalBestiaryCatalog\(\{availableArtFiles\}\)/);
  assert.match(builder,/original-bestiary-proposal/);
  assert.ok(Array.isArray(schema.Actor.npc.npcProfile.abilities));
  assert.match(template,/Capacidades sobrenaturales/);
  assert.match(template,/ability\.detectionDifficulty/);
  assert.doesNotMatch(template,/data-action="use-npc-ability"/);
});
