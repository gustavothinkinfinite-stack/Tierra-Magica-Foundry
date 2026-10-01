import test from "node:test";
import assert from "node:assert/strict";
import { deriveDevelopmentBudget, validateCreationState, completionUpdates, pdTotalForLevel, validateInitialAttributes } from "../scripts/rules/creation.mjs";

const emptySkills=Object.fromEntries(["a","b"].map((k)=>[k,{rank:0}]));

test("PD total follows 25 + 4 per level after first",()=>{
  assert.equal(pdTotalForLevel(1),25);
  assert.equal(pdTotalForLevel(20),101);
});

test("creation budgets combine skill and acquired Item spend without charging grants",()=>{
  const actor={type:"character",system:{details:{level:1},skills:emptySkills,attributes:{
    fue:{creationValue:1,baseValue:1}
  }},items:[
    {type:"ancestry",system:{slug:"humano",acquisition:{mode:"legacy",stage:"legacy",paid:{resource:"none",amount:0,known:true}}}},
    {type:"origin",system:{slug:"valdoriano",acquisition:{mode:"legacy",stage:"legacy",paid:{resource:"none",amount:0,known:true}}}},
    {type:"background",system:{slug:"vida-de-taller",acquisition:{mode:"legacy",stage:"legacy",paid:{resource:"none",amount:0,known:true}}}},
    {type:"technique",system:{slug:"x",acquisition:{mode:"purchased",stage:"creation",paid:{resource:"pd",amount:2,known:true}}}},
    {type:"equipment",system:{slug:"kit",acquisition:{mode:"granted",stage:"creation",paid:{resource:"pei",amount:0,known:true}}}}
  ]};
  const budget=deriveDevelopmentBudget(actor,{skillKeys:["a","b"]});
  assert.equal(budget.pdSpent,2);
  assert.equal(budget.pdAvailable,23);
  assert.equal(validateCreationState(actor,{skillKeys:["a","b"]}).valid,true);
});

test("initial reserve is idempotent",()=>{
  const actor={system:{creation:{initialReserveGranted:false},currency:{totalCopper:50}}};
  const first=completionUpdates(actor);
  assert.equal(first["system.currency.totalCopper"],250);
  actor.system.creation.initialReserveGranted=true;
  actor.system.currency.totalCopper=250;
  assert.equal(completionUpdates(actor)["system.currency.totalCopper"],250);
});


test("atributos iniciales usan exactamente 6 aumentos y máximo 3 sin gastar PD",()=>{
  const attributes={
    fue:{creationValue:3,baseValue:3},
    agi:{creationValue:3,baseValue:3},
    vig:{creationValue:2,baseValue:2},
    int:{creationValue:2,baseValue:2},
    per:{creationValue:1,baseValue:1},
    vol:{creationValue:1,baseValue:1},
    pre:{creationValue:1,baseValue:1}
  };
  const validation=validateInitialAttributes(attributes);
  assert.equal(validation.valid,true);
  assert.equal(validation.increases,6);
  assert.equal(deriveDevelopmentBudget({system:{details:{level:1},skills:emptySkills,attributes},items:[]},{skillKeys:["a","b"]}).attributePdCost,0);

  attributes.pre.creationValue=4;
  attributes.pre.baseValue=4;
  assert.ok(validateInitialAttributes(attributes).issues.some((i)=>i.code==="attribute-creation-range"));
});

test("cierre de creación bloquea reparto incompleto y más de 3 Disciplinas iniciales",()=>{
  const attributes={
    fue:{creationValue:3,baseValue:3},
    agi:{creationValue:3,baseValue:3},
    vig:{creationValue:2,baseValue:2},
    int:{creationValue:1,baseValue:1},
    per:{creationValue:1,baseValue:1},
    vol:{creationValue:1,baseValue:1},
    pre:{creationValue:1,baseValue:1}
  };
  const baseItems=[
    {type:"ancestry",system:{acquisition:{stage:"creation",paid:{resource:"none",amount:0,known:true}}}},
    {type:"origin",system:{acquisition:{stage:"creation",paid:{resource:"none",amount:0,known:true}}}},
    {type:"background",system:{acquisition:{stage:"creation",paid:{resource:"none",amount:0,known:true}}}}
  ];
  let actor={type:"character",system:{creation:{status:"building"},details:{level:1},skills:emptySkills,attributes},items:baseItems};
  let result=validateCreationState(actor,{skillKeys:["a","b"]});
  assert.ok(result.issues.some((i)=>i.code==="attribute-creation-pool"));

  attributes.int.creationValue=2; attributes.int.baseValue=2;
  actor={...actor,items:[...baseItems,...["a","b","c","d"].map((slug)=>({type:"discipline",system:{slug,acquisition:{stage:"creation",paid:{resource:"pd",amount:0,known:true}}}}))]};
  result=validateCreationState(actor,{skillKeys:["a","b"]});
  assert.ok(result.issues.some((i)=>i.code==="discipline-creation-limit"));
});
