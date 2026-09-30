import test from "node:test";
import assert from "node:assert/strict";
import { validateCatalog } from "../scripts/rules/catalog.mjs";

test("catalog rejects duplicate slugs, broken grant targets and missing spell disciplines",()=>{
  const catalog=[
    {type:"discipline",name:"Restauración",system:{slug:"restauracion",rules:[]}},
    {type:"discipline",name:"Restauración 2",system:{slug:"restauracion",rules:[]}},
    {type:"spell",name:"X",system:{slug:"x",discipline:"evocation",rules:[]}},
    {type:"trait",name:"Y",system:{slug:"y",rules:[{key:"GrantItem",itemType:"equipment",slug:"missing"}]}}
  ];
  const result=validateCatalog(catalog,{knownTypes:["discipline","spell","trait","equipment"],skillDefinitions:{}});
  assert.equal(result.valid,false);
  assert.ok(result.issues.some((i)=>i.code==="catalog-duplicate"));
  assert.ok(result.issues.some((i)=>i.code==="catalog-discipline"));
  assert.ok(result.issues.some((i)=>i.code==="catalog-grant-target"));
});
