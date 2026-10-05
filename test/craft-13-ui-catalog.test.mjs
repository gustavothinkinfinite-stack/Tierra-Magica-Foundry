import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  CRAFTING_REFERENCE_CATALOG,
  craftingProjectSourceFromReference,
  craftingReference,
  craftingReferenceGroups
} from "../scripts/rules/crafting-catalog.mjs";
import {
  prepareCraftingProject,
  previewCraftingProject
} from "../scripts/rules/crafting-transactions.mjs";

function applyChanges(document,changes){
  for(const [path,value] of Object.entries(changes)){
    const keys=path.split(".");
    if(keys[0]==="system") keys.shift();
    let node=document.system;
    while(keys.length>1){
      const key=keys.shift();
      node[key] ??= {};
      node=node[key];
    }
    node[keys[0]]=structuredClone(value);
  }
}

test("CRAFT-13H: catálogo expone exactamente las 41 referencias CRAFT-11 sin duplicados",()=>{
  assert.equal(CRAFTING_REFERENCE_CATALOG.length,41);
  assert.equal(new Set(CRAFTING_REFERENCE_CATALOG.map((row)=>row.ref)).size,41);
  assert.deepEqual(
    craftingReferenceGroups().map((group)=>[group.category,group.entries.length]),
    [
      ["Equipo compuesto",8],
      ["Alquimia",8],
      ["Runas y magia",5],
      ["Trampas y construcciones",6],
      ["Ingeniería",7],
      ["Servicios",5],
      ["Investigación",2]
    ]
  );
});

test("CRAFT-13H: cifras de referencia conservan casos canónicos representativos",()=>{
  assert.deepEqual(
    (({materialCopper,timeMinutes,valueCopper})=>({materialCopper,timeMinutes,valueCopper}))(craftingReference("REF-EQ-04")),
    {materialCopper:6000,timeMinutes:9600,valueCopper:12000}
  );
  assert.deepEqual(
    (({materialCopper,timeMinutes,valueCopper})=>({materialCopper,timeMinutes,valueCopper}))(craftingReference("REF-ING-07")),
    {materialCopper:2100,timeMinutes:6000,valueCopper:4200}
  );
  assert.equal(craftingReference("REF-SRV-05").timeMinutes,40);
  assert.equal(craftingReference("REF-INV-01").timeMinutes,34*480);
});

test("CRAFT-13H: referencia guiada no falsifica VR Común con el valor final compuesto",()=>{
  const source=craftingProjectSourceFromReference("REF-EQ-01");
  assert.equal(source.system.source.profileRef,"REF-EQ-01");
  assert.equal(source.system.economy.referenceValueCopper,0);
  assert.equal(source.system.ledger.estimatedMaterialsCopper,200);
  assert.equal(source.system.target.resultName,"Espada de Guardia de Kharum");
});

test("CRAFT-13H: Fórmula crea snapshot de dosis pero no conocimiento personal",()=>{
  const catalog=[{
    name:"Poción Restauradora",
    type:"formula",
    system:{slug:"pocion-restauradora",known:true,quantity:0,priceCopper:80}
  }];
  const source=craftingProjectSourceFromReference("REF-ALQ-02",{catalog});
  assert.equal(source.system.target.resultData.type,"formula");
  assert.equal(source.system.target.resultData.system.known,false);
  assert.equal(source.system.target.resultData.system.quantity,1);
  assert.equal(source.system.economy.referenceValueCopper,80);
  assert.equal(source.system.ledger.estimatedMaterialsCopper,40);
  assert.equal(source.system.professional.skill,"alchemy");
});

test("CRAFT-13H: referencias de Investigación crean la primera etapa CRAFT-10 sin puntos abstractos",()=>{
  const source=craftingProjectSourceFromReference("REF-INV-02");
  assert.equal(source.system.operation,"research");
  assert.equal(source.system.research.noveltyClass,"reconstruction");
  assert.equal(source.system.research.complexity,"complex");
  assert.equal(source.system.research.questions.length,2);
  assert.equal(source.system.research.validations.length,1);
  assert.equal(source.system.time.requiredMinutes,3*480);
  assert.equal(source.system.research.projectedMaterialCopper,200);
  assert.equal(source.system.research.projectedBaseMinutes,480);
  assert.equal("progressPoints" in source.system.research,false);
});

test("CRAFT-13H: preview y Preparar usan validación transaccional, no edición manual de estado",async()=>{
  const source=craftingProjectSourceFromReference("REF-INV-01");
  const actor={
    id:"actor",
    uuid:"Actor.actor",
    system:{skills:{engineering:{rank:4}}},
    items:new Map()
  };
  const project={
    id:"project",
    uuid:"Actor.actor.Item.project",
    name:source.name,
    type:"project",
    parent:actor,
    system:structuredClone(source.system),
    async update(changes){applyChanges(this,changes);return changes;}
  };
  actor.items.set(project.id,project);

  const preview=await previewCraftingProject(project);
  assert.equal(preview.valid,true);
  assert.equal(preview.expectedMaterialCopper,0);
  assert.equal(project.system.state,"draft");

  const prepared=await prepareCraftingProject(project,{expectedRevision:0});
  assert.equal(prepared.ok,true);
  assert.equal(project.system.state,"ready");
  assert.equal(project.system.execution.revision,1);
});

test("CRAFT-13H: la ficha expone catálogo, preview, VI, reparación, recuperación y flujo",async()=>{
  const itemSheet=await readFile(new URL("../templates/item/item-sheet.hbs",import.meta.url),"utf8");
  const actorSheet=await readFile(new URL("../templates/actor/character-sheet.hbs",import.meta.url),"utf8");
  const actorLogic=await readFile(new URL("../scripts/sheets/actor-sheet.mjs",import.meta.url),"utf8");
  const itemLogic=await readFile(new URL("../scripts/sheets/item-sheet.mjs",import.meta.url),"utf8");
  const entry=await readFile(new URL("../scripts/tierra-magica.mjs",import.meta.url),"utf8");

  for(const marker of [
    "CRAFT-11 · referencia","Previsualización","Asignaciones de VI","Capas afectadas",
    "Recuperación prevista","Flujo de Proyecto","project-research-resolve"
  ]) assert.equal(itemSheet.includes(marker),true,marker);
  assert.equal(actorSheet.includes('type="project"'),true);
  assert.equal(actorLogic.includes("craftingReferenceGroups"),true);
  assert.equal(actorLogic.includes("craftingProjectSourceFromReference"),true);
  assert.equal(itemLogic.includes("previewCraftingProject"),true);
  assert.equal(entry.includes("prepare: prepareCraftingProjectAuthoritatively"),true);
});
