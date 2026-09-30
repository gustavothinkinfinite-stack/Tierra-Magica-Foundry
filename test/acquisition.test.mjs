import test from "node:test";
import assert from "node:assert/strict";
import { selectCatalogCost, preflightAcquisition, detectGrantCycles, budgetSpentByResource } from "../scripts/rules/acquisition.mjs";

test("context selects legal cost and rebuilding requires declared price context",()=>{
  const costs=[{context:"creation",resource:"pr",amount:3},{context:"progression",resource:"pd",amount:6}];
  assert.equal(selectCatalogCost(costs,{stage:"creation"}).resource,"pr");
  assert.equal(selectCatalogCost(costs,{stage:"progression"}).amount,6);
  assert.equal(selectCatalogCost(costs,{stage:"rebuilding"}),null);
  assert.equal(selectCatalogCost(costs,{stage:"rebuilding",priceContext:"creation"}).resource,"pr");
});

test("preflight blocks duplicate unique Item and self-benefit cannot satisfy preexisting requirements",()=>{
  const actor={system:{creation:{revision:4},skills:{medicine:{rank:1}}},items:[
    {id:"a",type:"discipline",name:"Restauración",system:{slug:"restauracion"}}
  ]};
  const candidate={type:"discipline",name:"Otra etiqueta",system:{
    slug:"restauracion",
    costs:[{context:"creation",resource:"pd",amount:2}],
    requirements:{type:"skill",key:"medicine",rank:2,basis:"base"}
  }};
  const p=preflightAcquisition({actor,candidate,stage:"creation",expectedRevision:4});
  assert.equal(p.valid,false);
  assert.ok(p.issues.some((i)=>i.code==="duplicate"));
  assert.ok(p.issues.some((i)=>i.code==="requirement-skill"));
});

test("grant cycles are detected",()=>{
  const catalog=[
    {type:"trait",name:"A",system:{slug:"a",rules:[{key:"GrantItem",itemType:"trait",slug:"b"}]}},
    {type:"trait",name:"B",system:{slug:"b",rules:[{key:"GrantItem",itemType:"trait",slug:"a"}]}}
  ];
  assert.equal(detectGrantCycles(catalog).length,1);
});

test("actual paid acquisition, not catalog price, drives budgets",()=>{
  const items=[
    {system:{acquisition:{mode:"purchased",stage:"creation",paid:{resource:"pd",amount:3,known:true}}}},
    {system:{acquisition:{mode:"granted",stage:"creation",paid:{resource:"pd",amount:0,known:true}}}}
  ];
  assert.equal(budgetSpentByResource(items).pd,3);
});
