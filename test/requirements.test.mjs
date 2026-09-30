import test from "node:test";
import assert from "node:assert/strict";
import { evaluateRequirements } from "../scripts/rules/requirements.mjs";

const actor={
  system:{
    details:{level:9},
    skills:{medicine:{rank:2,effectiveRank:4}},
    attributes:{fue:{baseValue:2,effectiveValue:3}}
  },
  items:[{id:"d1",type:"discipline",system:{slug:"restauracion"}}]
};

test("structured requirements support all/any/not and item identity",()=>{
  const result=evaluateRequirements({all:[
    {type:"level",minimum:9},
    {type:"item",itemType:"discipline",slug:"restauracion"},
    {any:[{type:"skill",key:"medicine",rank:2},{type:"attribute",key:"fue",minimum:5}]},
    {not:{type:"item",itemType:"trait",slug:"forbidden"}}
  ]},actor);
  assert.equal(result.valid,true);
});

test("acquisition skill requirements use base rank when requested",()=>{
  assert.equal(evaluateRequirements({type:"skill",key:"medicine",rank:3,basis:"base"},actor).valid,false);
  assert.equal(evaluateRequirements({type:"skill",key:"medicine",rank:3,basis:"effective"},actor).valid,true);
});

test("unknown requirement never passes silently",()=>{
  const result=evaluateRequirements({type:"script",code:"true"},actor);
  assert.equal(result.valid,false);
  assert.equal(result.evaluable,false);
});
