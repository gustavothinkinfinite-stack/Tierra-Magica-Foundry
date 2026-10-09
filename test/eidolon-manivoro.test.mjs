import test from "node:test";
import assert from "node:assert/strict";
import {readFile,readdir} from "node:fs/promises";
import {resolve} from "node:path";
import {eidolonManivoroCatalog,EIDOLON_MANIVORO_BASE,EIDOLON_VARIANTS} from "../scripts/catalog/eidolon-manivoro.mjs";
import {npcReferenceCatalog} from "../scripts/catalog/npc-catalog.mjs";
import {originalBestiaryCatalog} from "../scripts/catalog/original-bestiary.mjs";
import {fiveApprovedCreatureCatalog} from "../scripts/catalog/approved-creatures-v1.mjs";
import {secondBatchCreatureCatalog} from "../scripts/catalog/approved-creatures-v2.mjs";
import {deriveActorState} from "../scripts/rules/derived-state.mjs";
import {bestiaryArtFiles,APPROVED_BESTIARY_ART_SLUGS} from "../scripts/catalog/npc-art.mjs";

test("Eidolon es Actor nuevo y las 23 criaturas mantienen identidad propia",()=>{
  const all=[...npcReferenceCatalog(),...originalBestiaryCatalog(),...fiveApprovedCreatureCatalog(),
    ...secondBatchCreatureCatalog(),...eidolonManivoroCatalog()];
  assert.equal(all.length,23);
  assert.equal(new Set(all.map(a=>a.name)).size,23);
  assert.equal(npcReferenceCatalog().length,11);
  const eidolon=all.at(-1);
  assert.equal(eidolon.name,"Eidolon Manívoro");
  assert.equal(eidolon.type,"npc");
  assert.equal(eidolon.prototypeToken.actorLink,false);
  assert.match(eidolon.system.npcProfile.source,/no canon del Manual Maestro/);
});

test("estadísticas aprobadas, defensa mental y Maná derivan de perfil NPC libre",()=>{
  const actor=eidolonManivoroCatalog()[0];
  const profile=actor.system.npcProfile;
  const derived=deriveActorState({actorType:"npc",system:actor.system});
  for(const [source,target] of [
    ["life","healthMax"],["defense","defense"],["bodyDefense","bodyDefense"],
    ["mentalDefense","mentalDefense"],["maneuverDefense","maneuverDefense"],
    ["protection","protection"],["movement","movement"],["initiative","initiativeModifier"],
    ["mana","manaMax"]
  ]) assert.equal(derived[target],profile[source],source);
  assert.equal(profile.life,18);
  assert.equal(profile.mentalDefense,16);
  assert.equal(profile.mana,8);
  assert.equal(actor.system.resources.mana.value,8);
  assert.equal(profile.channelingBonus,3);
  assert.equal(profile.attacks.length,1);
  assert.deepEqual([profile.attacks[0].bonus,profile.attacks[0].damage,profile.attacks[0].penetration],[6,6,0]);
});

test("tres poderes diferenciados: 1 Acción por uso, no automatizan drenaje, miedo ni control",()=>{
  const [actor]=eidolonManivoroCatalog(),p=actor.system.npcProfile;
  assert.deepEqual(p.abilities.map(a=>a.slug),["rostro-prestado","sorbo-de-mana","susurro-invasivo"]);
  assert.deepEqual(p.abilities.map(a=>a.manaCost),[1,0,2]);
  assert.ok(p.abilities.every(a=>a.actionCost===1&&a.activation==="Acción"));
  assert.equal(p.abilities[0].detectionDifficulty,15);
  assert.deepEqual([p.abilities[1].attackBonus,p.abilities[1].opposedDefense],[5,"Defensa Mental"]);
  assert.deepEqual([p.abilities[1].maxDrain,p.abilities[1].maxRecovery],[2,1]);
  assert.equal(p.abilities[2].targets,1);
  assert.match(p.abilities[2].limitations,/Dominación total/);
  assert.equal(actor.effects,undefined);
  assert.equal(actor.items,undefined);
  assert.match(actor.system.notes,/manualmente/);
});

test("retrato y token circular con alfa son WebP válidos y se vinculan solo como pareja",async()=>{
  assert.equal(APPROVED_BESTIARY_ART_SLUGS.length,22);
  const pair=bestiaryArtFiles(EIDOLON_MANIVORO_BASE.slug);
  const names=new Set(await readdir(resolve("assets/bestiary")));
  for(const name of [pair.portrait,pair.token]){
    assert.ok(names.has(name),name);
    const image=await readFile(resolve("assets/bestiary",name));
    assert.ok(image.length>5000);
    assert.equal(image.toString("ascii",0,4),"RIFF");
    assert.equal(image.toString("ascii",8,12),"WEBP");
    if(name.endsWith("-token.webp")){
      assert.equal(image.toString("ascii",12,16),"VP8X");
      assert.ok(image[20]&0x10,"token with transparent corners");
    }
  }
  const both=eidolonManivoroCatalog({availableArtFiles:new Set([pair.portrait,pair.token])})[0];
  assert.equal(both.img,"systems/tierra-magica/assets/bestiary/"+pair.portrait);
  assert.equal(both.prototypeToken.texture.src,"systems/tierra-magica/assets/bestiary/"+pair.token);
  const onlyOne=eidolonManivoroCatalog({availableArtFiles:new Set([pair.token])})[0];
  assert.equal(onlyOne.prototypeToken.texture,undefined);
});

test("plantilla modular editada por DJ sin nivel y ficha no confunde oposición con Identificación DF",async()=>{
  assert.deepEqual(Object.keys(EIDOLON_VARIANTS),["menor","base","mayor"]);
  assert.deepEqual(EIDOLON_VARIANTS.base.mana,[6,10]);
  const template=await readFile(resolve("templates/actor/parts/actor-sheet.hbs"),"utf8");
  const sheet=await readFile(resolve("scripts/sheets/actor-sheet.mjs"),"utf8");
  assert.match(template,/{{#if ability.opposedDefense}}/);
  assert.match(template,/{{#if ability.detectionDifficulty}}/);
  assert.match(template,/data-action="add-npc-ability"/);
  assert.match(template,/data-action="remove-npc-ability"/);
  assert.match(template,/name="system.npcProfile.abilities.{{index}}.description"/);
  assert.match(sheet,/#editNpcAbilities\("add"\)/);
  assert.match(sheet,/this.actor.update\(\{"system.npcProfile.abilities":abilities\}\)/);
});

test("compilación 23 Actors y candidato v1.12 sin publicación",async()=>{
  const builder=await readFile(resolve("tools/build-packs.mjs"),"utf8");
  const workflow=await readFile(resolve(".github/workflows/prepare-package-preview.yml"),"utf8");
  const manifest=JSON.parse(await readFile(resolve("system.json"),"utf8"));
  assert.match(builder,/\.\.\.eidolonManivoroCatalog\(\{availableArtFiles\}\)/);
  assert.match(workflow,/eq 44/);
  assert.match(workflow,/eidolon-manivoro-token\.webp/);
  assert.doesNotMatch(workflow,/action-gh-release/);
  assert.equal(manifest.version,"1.12.0");
  assert.equal(manifest.packs.find(pack=>pack.name==="bestiary").type,"Actor");
});
