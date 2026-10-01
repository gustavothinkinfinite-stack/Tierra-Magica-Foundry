import test from "node:test";
import assert from "node:assert/strict";
import { TM_CONFIG } from "../scripts/config.mjs";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import { deriveActorState, resolveDerivedSelector } from "../scripts/rules/derived-state.mjs";
import { prepareRuleElements } from "../scripts/rules/rule-elements.mjs";
import { buildAllCrea13Fixtures } from "./fixtures/crea-13-builds.mjs";

const clone=(value)=>JSON.parse(JSON.stringify(value));

function equipRelevant(actor){
  for(const item of actor.items){
    if(["weapon","armor","shield"].includes(item.type)) item.system.equipped=true;
  }
}

function prepare(actor){
  const rulePreparation=prepareRuleElements(actor.items,{skillDefinitions:TM_CONFIG.skills});
  return deriveActorState({
    actorType:actor.type,
    system:actor.system,
    items:actor.items,
    rulePreparation,
    defensiveRankBonuses:TM_CONFIG.defensiveRankBonuses
  });
}

const expected={
  soldier:{healthMax:16,manaMax:9,severeThreshold:8,defensiveBonus:2,defense:15,maneuverDefense:15,mentalDefense:12,bodyDefense:14,protection:3,movement:6,initiativeModifier:1},
  engineer:{healthMax:14,manaMax:12,severeThreshold:7,defensiveBonus:0,defense:13,maneuverDefense:13,mentalDefense:13,bodyDefense:13,protection:1,movement:6,initiativeModifier:2},
  healer:{healthMax:14,manaMax:15,severeThreshold:7,defensiveBonus:0,defense:12,maneuverDefense:12,mentalDefense:14,bodyDefense:13,protection:0,movement:6,initiativeModifier:2},
  explorer:{healthMax:14,manaMax:9,severeThreshold:7,defensiveBonus:0,defense:14,maneuverDefense:14,mentalDefense:12,bodyDefense:13,protection:1,movement:6,initiativeModifier:3},
  alchemist:{healthMax:14,manaMax:12,severeThreshold:7,defensiveBonus:0,defense:13,maneuverDefense:13,mentalDefense:13,bodyDefense:13,protection:0,movement:6,initiativeModifier:2},
  channeler:{healthMax:14,manaMax:15,severeThreshold:7,defensiveBonus:0,defense:12,maneuverDefense:12,mentalDefense:14,bodyDefense:13,protection:0,movement:6,initiativeModifier:2},
  bonded:{healthMax:14,manaMax:12,severeThreshold:7,defensiveBonus:0,defense:13,maneuverDefense:13,mentalDefense:13,bodyDefense:13,protection:1,movement:6,initiativeModifier:3}
};

test("CREA-13 13B: los siete fixtures producen derivados canónicos con equipo equipado",()=>{
  for(const build of buildAllCrea13Fixtures()){
    equipRelevant(build.actor);
    const derived=prepare(build.actor);
    for(const [key,value] of Object.entries(expected[build.profile.key])){
      assert.equal(derived[key],value,build.profile.id+" "+key);
    }
    for(const key of ["healthMax","manaMax","severeThreshold","defensiveBonus","defense","maneuverDefense","mentalDefense","bodyDefense","protection","movement","initiativeModifier"]){
      assert.ok(derived.breakdowns[key],build.profile.id+" breakdown "+key);
    }
  }
});

test("CREA-13 13B: equipar y desequipar armadura/escudo es reversible y conserva procedencia",()=>{
  const soldier=buildAllCrea13Fixtures().find((entry)=>entry.profile.key==="soldier").actor;
  equipRelevant(soldier);
  let derived=prepare(soldier);
  assert.equal(derived.protection,3);
  assert.equal(resolveDerivedSelector(derived,"defense",{frontal:true}).total,16);
  assert.ok(derived.breakdowns.protection.contributions.some((entry)=>entry.sourceType==="equipment"&&entry.sourceItemName==="Malla"));
  assert.ok(derived.contextual.defense.some((entry)=>entry.sourceType==="equipment"&&entry.sourceItemName==="Escudo estándar"));

  soldier.items.find((item)=>item.type==="armor").system.equipped=false;
  soldier.items.find((item)=>item.type==="shield").system.equipped=false;
  derived=prepare(soldier);
  assert.equal(derived.protection,0);
  assert.equal(resolveDerivedSelector(derived,"defense",{frontal:true}).total,15);
  assert.equal(derived.breakdowns.protection.contributions.some((entry)=>entry.equipmentType==="armor"),false);
  assert.equal(derived.contextual.defense.some((entry)=>entry.equipmentType==="shield"),false);
});

test("CREA-13 13B: Piel Alterada sigue contextual y no infla Protección universal",()=>{
  const actor=buildAllCrea13Fixtures().find((entry)=>entry.profile.key==="channeler").actor;
  const skin=actor.items.find((item)=>item.name==="Piel Alterada");
  actor.system.magic.sustainedSpellIds=[skin.id];
  const derived=prepare(actor);
  assert.equal(derived.protection,0);
  assert.equal(resolveDerivedSelector(derived,"protection",{alteredSkinCompatible:false}).total,0);
  assert.equal(resolveDerivedSelector(derived,"protection",{alteredSkinCompatible:true}).total,2);
  assert.ok(derived.contextual.protection.some((entry)=>entry.sourceItemName==="Piel Alterada"));
});

test("CREA-13 13B: FUE mínima y Escudo pesado modifican Movimiento desde equipo estructurado",()=>{
  const catalog=coreCatalog();
  const base=buildAllCrea13Fixtures().find((entry)=>entry.profile.key==="engineer").actor;
  base.items=base.items.filter((item)=>!["armor","shield"].includes(item.type));

  const heavyArmor=clone(catalog.find((entry)=>entry.type==="armor"&&entry.name==="Armadura pesada"));
  heavyArmor.id="test-heavy-armor"; heavyArmor.system.equipped=true;
  base.items.push(heavyArmor);
  let derived=prepare(base);
  assert.equal(derived.protection,4);
  assert.equal(derived.movement,5);
  assert.ok(derived.equipmentIssues.some((issue)=>issue.code==="armor-strength-deficit"));
  assert.ok(derived.breakdowns.movement.contributions.some((entry)=>entry.sourceItemName==="Armadura pesada"&&entry.value===-1));

  heavyArmor.system.equipped=false;
  const heavyShield=clone(catalog.find((entry)=>entry.type==="shield"&&entry.name==="Escudo pesado"));
  heavyShield.id="test-heavy-shield"; heavyShield.system.equipped=true;
  base.items.push(heavyShield);
  derived=prepare(base);
  assert.equal(derived.movement,5);
  assert.equal(resolveDerivedSelector(derived,"defense",{frontal:true}).total,15);
  assert.ok(derived.breakdowns.movement.contributions.some((entry)=>entry.sourceItemName==="Escudo pesado"&&entry.value===-1));

  heavyShield.system.equipped=false;
  derived=prepare(base);
  assert.equal(derived.movement,6);
  assert.equal(resolveDerivedSelector(derived,"defense",{frontal:true}).total,13);
});
