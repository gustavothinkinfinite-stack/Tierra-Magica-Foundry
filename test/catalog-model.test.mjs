import test from "node:test";
import assert from "node:assert/strict";
import { validateCatalog } from "../scripts/rules/catalog.mjs";
import { constructionCatalog, CATALOG_COUNTS } from "../scripts/catalog/core-catalog.mjs";

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


test("CREA-14: catálogo de identidad coincide con los pueblos y perfiles vigentes",()=>{
  const catalog=constructionCatalog();
  const ancestries=catalog.filter((entry)=>entry.type==="ancestry").map((entry)=>entry.name);
  assert.equal(CATALOG_COUNTS.ancestries,17);
  assert.equal(CATALOG_COUNTS.origins,10);
  assert.equal(CATALOG_COUNTS.backgrounds,14);
  for(const required of [
    "Humano","Enano","Elfo","Orco","Goblin","Hobgoblin","Bugbear","Terio/Anihombre",
    "Hada","Sátiro","Dríade","Silfo","Ankar","Cristálido de Matriz Mixta","Verdante","Micelio","Coralio"
  ]) assert.ok(ancestries.includes(required),required);
  assert.equal(ancestries.includes("Troll"),false);
  assert.equal(ancestries.includes("Ogro"),false);

  for(const origin of catalog.filter((entry)=>entry.type==="origin")){
    assert.ok(String(origin.system.languageProfile).includes("Común de Concordia"));
    assert.equal(String(origin.system.facetOptions).split(";").filter(Boolean).length,3);
  }
  for(const background of catalog.filter((entry)=>entry.type==="background")){
    assert.equal(String(background.system.facetOptions).split(";").filter(Boolean).length,3);
  }
});
