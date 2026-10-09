import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import { NPC_REFERENCE_PROFILES, npcReferenceCatalog } from "../scripts/catalog/npc-catalog.mjs";
import { APPROVED_BESTIARY_ART_SLUGS, PENDING_BESTIARY_ART_SLUGS, bestiaryArtFiles, resolveBestiaryArt } from "../scripts/catalog/npc-art.mjs";
import { deriveActorState, resolveDerivedSelector } from "../scripts/rules/derived-state.mjs";

test("Bestiario contiene exactamente los 11 perfiles del Manual Maestro §23", () => {
  const actors=npcReferenceCatalog();
  assert.equal(actors.length,11);
  assert.equal(new Set(actors.map((a)=>a.name)).size,11);
  assert.ok(actors.every((a)=>a.type==="npc" && a.system.npcProfile.enabled));
  assert.ok(actors.every((a)=>a.prototypeToken.actorLink===false));
});

test("perfiles derivados preservan los números directos en lugar de fórmulas de PJ", () => {
  for (const [index, actor] of npcReferenceCatalog().entries()) {
    const canonical=NPC_REFERENCE_PROFILES[index];
    const derived=deriveActorState({actorType:"npc",system:actor.system});
    for (const [key,field] of [
      ["life","healthMax"],["defense","defense"],["mentalDefense","mentalDefense"],
      ["maneuverDefense","maneuverDefense"],["protection","protection"],
      ["movement","movement"],["initiative","initiativeModifier"]
    ]) assert.equal(derived[field],canonical[key],actor.name+" "+field);
    if (canonical.bodyDefense !== null) assert.equal(derived.bodyDefense,canonical.bodyDefense);
  }
});

test("Centinela no transforma el guion del Manual en Defensa Corporal 0", () => {
  const centinela=npcReferenceCatalog().find((a)=>a.name==="Centinela de Bronce");
  const derived=deriveActorState({actorType:"npc",system:centinela.system});
  assert.equal(derived.bodyDefense,null);
  assert.ok(Number.isNaN(resolveDerivedSelector(derived,"bodyDefense").total));
});

test("Canalizador conserva las incertidumbres del perfil sin inventar conjuros", () => {
  const caster=npcReferenceCatalog().find((a)=>a.name==="Canalizador hostil");
  const profile=caster.system.npcProfile;
  assert.equal(profile.mana,15);
  assert.equal(profile.channelingBonus,6);
  assert.deepEqual(profile.protectionRange,[0,1]);
  assert.equal(profile.attacks.length,0);
  assert.equal(caster.system.details.threat,"");
});

test("Troll conserva opciones potenciales sin acciones extra activadas de oficio", () => {
  const troll=npcReferenceCatalog().find((a)=>a.name==="Troll dominante");
  assert.equal(troll.system.npcProfile.attacks.length,2);
  assert.match(troll.system.npcProfile.notes,/puede incluir/);
  assert.equal(troll.system.npcProfile.reactions,undefined);
});

test("ficha NPC oculta la creación de PJ y mantiene ataque e iniciativa", async () => {
  const source=await readFile(resolve("templates/actor/parts/actor-sheet.hbs"),"utf8");
  const js=await readFile(resolve("scripts/sheets/actor-sheet.mjs"),"utf8");
  assert.match(source,/tm-npc-reference/);
  assert.match(source,/roll-npc-attack/);
  assert.match(source,/npcBodyDefenseApplicable/);
  assert.match(js,/npcBodyDefenseApplicable/);
  assert.match(js,/rollNpcAttack/);
  const stack=[];
  const tokens=source.matchAll(new RegExp("{{([#/])\\s*(if|unless|each|with)\\b[^}]*}}","g"));
  for (const token of tokens) {
    if (token[1]==="#") stack.push(token[2]);
    else assert.equal(stack.pop(),token[2],"secuencia de bloques HBS");
  }
  assert.equal(stack.length,0,"todos los condicionales HBS están cerrados");
});

test("cada pareja de arte aprobada asigna retrato y token reales a su Actor", () => {
  assert.equal(APPROVED_BESTIARY_ART_SLUGS.length,21);
  const allFiles=new Set(APPROVED_BESTIARY_ART_SLUGS.flatMap((slug)=>Object.values(bestiaryArtFiles(slug))));
  const actors=npcReferenceCatalog({availableArtFiles:allFiles});
  for(const actor of actors){
    const slug=NPC_REFERENCE_PROFILES.find((entry)=>entry.name===actor.name).slug;
    if(PENDING_BESTIARY_ART_SLUGS.includes(slug)){
      assert.equal(actor.img,"systems/tierra-magica/assets/icons/actor.svg");
      assert.equal(actor.prototypeToken.texture,undefined);
      continue;
    }
    assert.equal(actor.img,"systems/tierra-magica/assets/bestiary/"+slug+"-retrato.webp",actor.name);
    assert.equal(actor.prototypeToken.texture.src,"systems/tierra-magica/assets/bestiary/"+slug+"-token.webp",actor.name);
    assert.equal(actor.prototypeToken.actorLink,false);
  }
});

test("una imagen suelta nunca activa una referencia rota ni promociona al Tirador", () => {
  const first=bestiaryArtFiles("lobo");
  assert.equal(resolveBestiaryArt("lobo",new Set([first.portrait])),null);
  assert.equal(resolveBestiaryArt("lobo",new Set([first.token])),null);
  assert.equal(resolveBestiaryArt("tirador",new Set(["tirador-retrato.webp","tirador-token.webp"])),null);
  const actor=npcReferenceCatalog({availableArtFiles:new Set([first.portrait])})
    .find((entry)=>entry.name==="Lobo");
  assert.equal(actor.img,"systems/tierra-magica/assets/icons/actor.svg");
});

test("el compilador valida las parejas WebP antes de enlazarlas", async () => {
  const source=await readFile(resolve("tools/build-packs.mjs"),"utf8");
  const installer=await readFile(resolve("tools/install-bestiary-art.mjs"),"utf8");
  assert.match(source,/npcReferenceCatalog\(\{availableArtFiles\}\)/);
  assert.match(source,/WEBP/);
  assert.match(source,/portrait\)!==availableArtFiles\.has/);
  assert.match(installer,/APPROVED_BESTIARY_ART_SLUGS/);
  assert.match(installer,/copyFile/);
});
