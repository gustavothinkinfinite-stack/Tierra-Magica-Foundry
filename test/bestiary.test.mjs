import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import { NPC_REFERENCE_PROFILES, npcReferenceCatalog } from "../scripts/catalog/npc-catalog.mjs";
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
  const tokens=source.matchAll(/{{([#\\/])\\s*(if|unless|each|with)\\b[^}]*}}/g);
  for (const token of tokens) {
    if (token[1]==="#") stack.push(token[2]);
    else assert.equal(stack.pop(),token[2],"secuencia de bloques HBS");
  }
  assert.equal(stack.length,0,"todos los condicionales HBS están cerrados");
});
