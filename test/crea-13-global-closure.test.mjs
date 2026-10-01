import test from "node:test";
import assert from "node:assert/strict";
import { TM_CONFIG } from "../scripts/config.mjs";
import { TM_SCHEMA_VERSION } from "../scripts/rules/data-model-migration.mjs";
import { prepareRuleElements } from "../scripts/rules/rule-elements.mjs";
import { deriveActorState } from "../scripts/rules/derived-state.mjs";
import { buildAllCrea13Fixtures } from "./fixtures/crea-13-builds.mjs";
import { CREA13_ARCHETYPES, CREA13_REQUIRED_PILLARS } from "./fixtures/crea-13-archetypes.mjs";

function prepare(actor){
  const rules=prepareRuleElements(actor.items,{skillDefinitions:TM_CONFIG.skills});
  return {
    rules,
    derived:deriveActorState({
      actorType:actor.type,
      system:actor.system,
      items:actor.items,
      rulePreparation:rules,
      defensiveRankBonuses:TM_CONFIG.defensiveRankBonuses
    })
  };
}

test("CREA-13 13F: siete perfiles cierran legalidad, schema, derivados y cobertura",()=>{
  const builds=buildAllCrea13Fixtures();
  assert.equal(builds.length,7);

  const covered=new Set();
  for(const build of builds){
    assert.equal(build.validation.valid,true,build.profile.id+" creación");
    assert.equal(build.actor.system.schemaVersion,TM_SCHEMA_VERSION,build.profile.id+" schema actor");
    for(const item of build.actor.items){
      assert.equal(item.system.schemaVersion,TM_SCHEMA_VERSION,build.profile.id+" "+item.name+" schema item");
    }

    const {rules,derived}=prepare(build.actor);
    assert.deepEqual(rules.issues,[],build.profile.id+" Rule Elements");
    for(const key of [
      "healthMax","manaMax","severeThreshold","defense","maneuverDefense",
      "mentalDefense","bodyDefense","protection","movement","initiativeModifier"
    ]){
      assert.equal(Number.isFinite(Number(derived[key])),true,build.profile.id+" "+key);
    }
    assert.ok(derived.healthMax>=0,build.profile.id+" Vida");
    assert.ok(derived.manaMax>=0,build.profile.id+" Maná");
    assert.ok(derived.movement>=1,build.profile.id+" Movimiento");

  }

  for(const archetype of CREA13_ARCHETYPES){
    for(const tag of archetype.coverage ?? []) covered.add(tag);
  }
  for(const pillar of CREA13_REQUIRED_PILLARS){
    assert.equal(covered.has(pillar),true,"cobertura global "+pillar);
  }
});

test("CREA-13 13F: ningún fixture depende de campos mecánicos retirados",()=>{
  const forbidden=[
    ["combat","defenseBonus"],
    ["combat","protectionBonus"],
    ["combat","movementBonus"],
    ["combat","initiativeBonus"],
    ["turn","movement"]
  ];
  for(const build of buildAllCrea13Fixtures()){
    for(const [group,key] of forbidden){
      assert.equal(Object.prototype.hasOwnProperty.call(build.actor.system?.[group] ?? {},key),false,build.profile.id+" "+group+"."+key);
    }
  }
});

test("CREA-13 13F: las reservas actuales nunca son usadas como autoridad de máximo en los fixtures",()=>{
  for(const build of buildAllCrea13Fixtures()){
    const {derived}=prepare(build.actor);
    build.actor.system.resources.health.max=999;
    build.actor.system.resources.mana.max=999;
    const preparedAgain=prepare(build.actor).derived;
    assert.equal(preparedAgain.healthMax,derived.healthMax,build.profile.id+" Vida máxima");
    assert.equal(preparedAgain.manaMax,derived.manaMax,build.profile.id+" Maná máximo");
  }
});
