import test from "node:test";
import assert from "node:assert/strict";
import { prepareRuleElements, validateRuleElement } from "../scripts/rules/rule-elements.mjs";

const skills={medicine:{},survival:{}};

test("rule preparation is pure and produces auditable modifiers",()=>{
  const items=[{id:"i1",name:"Rasgo",type:"trait",system:{rules:[
    {key:"RollOption",option:"self:trait:resistant"},
    {key:"FlatModifier",selector:"skill.medicine",value:1,label:"Entrenamiento"},
    {key:"UpgradeSkillRank",skill:"survival",rank:2}
  ]}}];
  const prepared=prepareRuleElements(items,{skillDefinitions:skills});
  assert.deepEqual(prepared.rollOptions,["self:trait:resistant"]);
  assert.equal(prepared.modifiers[0].sourceItemId,"i1");
  assert.equal(prepared.skillRankUpgrades.survival,2);
});

test("ChoiceSet and GrantItem validate but do not mutate prepared actor",()=>{
  const items=[{id:"x",name:"Origen",type:"origin",system:{rules:[
    {key:"ChoiceSet",choiceKey:"culture"},
    {key:"GrantItem",itemType:"equipment",slug:"kit",lifecycle:"once"}
  ]}}];
  const prepared=prepareRuleElements(items,{skillDefinitions:skills});
  assert.equal(prepared.modifiers.length,0);
  assert.equal(prepared.issues.length,0);
});

test("unknown rule element is invalid",()=>{
  assert.equal(validateRuleElement({key:"Eval"},{skillDefinitions:skills}).valid,false);
});
