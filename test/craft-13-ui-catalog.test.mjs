import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  CRAFTING_REFERENCE_CATALOG,
  CRAFTING_COMMON_EQUIPMENT_RECIPES,
  craftingProjectSourceFromReference,
  craftingReference,
  craftingReferenceGroups
} from "../scripts/rules/crafting-catalog.mjs";
import {
  prepareCraftingProject,
  previewCraftingProject
} from "../scripts/rules/crafting-transactions.mjs";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import { CANONICAL_EQUIPMENT } from "../scripts/catalog/equipment-canonical.mjs";
import { equipmentCatalogMaster } from "../scripts/catalog/equipment-catalog-master.mjs";

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

test("CRAFT: catálogo reúne las 41 referencias CRAFT-11 y 21 recetas ordinarias CRAFT-03",()=>{
  assert.equal(CRAFTING_REFERENCE_CATALOG.length,62);
  assert.equal(new Set(CRAFTING_REFERENCE_CATALOG.map((row)=>row.ref)).size,62);
  assert.deepEqual(
    craftingReferenceGroups().map((group)=>[group.category,group.entries.length]),
    [
      ["Equipo compuesto",8],
      ["Alquimia",8],
      ["Runas y magia",5],
      ["Trampas y construcciones",6],
      ["Ingeniería",7],
      ["Servicios",5],
      ["Investigación",2],
      ["Equipo común",21]
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

test("CRAFT-13H: la ficha de Proyecto prioriza receta, requisitos, tiempo y ejecución",async()=>{
  const itemSheet=await readFile(new URL("../templates/item/item-sheet.hbs",import.meta.url),"utf8");
  const actorSheet=await readFile(new URL("../templates/actor/character-sheet.hbs",import.meta.url),"utf8");
  const actorLogic=await readFile(new URL("../scripts/sheets/actor-sheet.mjs",import.meta.url),"utf8");
  const itemLogic=await readFile(new URL("../scripts/sheets/item-sheet.mjs",import.meta.url),"utf8");
  const entry=await readFile(new URL("../scripts/tierra-magica.mjs",import.meta.url),"utf8");

  for(const marker of [
    "¿Qué querés hacer?","Antes de comenzar","Te falta resolver","Recursos disponibles",
    "Materiales asignados","Comprobar y preparar","Iniciar trabajo","Datos técnicos del Proyecto",
    "Recuperación prevista","project-research-resolve","project-start"
  ]) assert.equal(itemSheet.includes(marker),true,marker);

  assert.equal(itemSheet.includes("CRAFT-11 · referencia"),false);
  assert.equal(itemSheet.includes("Asignaciones de VI"),false);
  assert.equal(itemSheet.includes("Flujo de Proyecto"),false);
  assert.equal(itemSheet.includes("tm-project-advanced"),true);
  assert.equal(itemSheet.includes("{{#unless isProject}}"),true);
  assert.equal(actorSheet.includes('type="project"'),true);
  assert.equal(actorLogic.includes("craftingReferenceGroups"),true);
  assert.equal(actorLogic.includes("craftingProjectSourceFromReference"),true);
  assert.equal(itemLogic.includes("previewCraftingProject"),true);
  assert.equal(itemLogic.includes("projectIssueDisplay"),true);
  assert.equal(itemLogic.includes("projectIssueLeaves"),true);
  assert.equal(itemLogic.includes("async #startProject"),true);
  assert.equal(itemLogic.includes("craftingLot?.compatibility"),true);
  assert.equal(entry.includes("prepare: prepareCraftingProjectAuthoritatively"),true);
});


test("CRAFT común: 21 recetas del Manual usan sólo equipos exactos y CM universal",()=>{
  assert.equal(CRAFTING_COMMON_EQUIPMENT_RECIPES.length,21);
  const equipment=new Map(CANONICAL_EQUIPMENT.map((item)=>[item.name,item]));
  for(const row of CRAFTING_COMMON_EQUIPMENT_RECIPES){
    const canon=equipment.get(row.name);
    assert.ok(canon,row.name);
    assert.equal(row.execution,"equipment",row.name);
    assert.equal(row.operation,"fabricate",row.name);
    assert.equal(row.valueCopper,canon.priceCopper,row.name);
    assert.equal(row.materialCopper,Math.ceil(canon.priceCopper/2),row.name);
    assert.ok(row.timeMinutes>0,row.name);
    assert.ok(row.rank>=1 && row.rank<=3,row.name);
  }
  const allNames=new Set(CRAFTING_COMMON_EQUIPMENT_RECIPES.map((row)=>row.name));
  for(const missing of ["Materiales de escritura","Repuesto médico, 5 usos","Provisiones 7 días","Combustible de iluminación 5 noches"]){
    assert.equal(allNames.has(missing),false,missing);
  }
  for(const proposal of equipmentCatalogMaster().filter((entry)=>entry.status==="proposal")){
    assert.equal(allNames.has(proposal.name),false,proposal.name);
  }
});

test("CRAFT común: proyectos presentan Item canónico completo, coste y tiempo correctos",async()=>{
  const catalog=coreCatalog();
  for(const entry of CRAFTING_COMMON_EQUIPMENT_RECIPES){
    const source=craftingProjectSourceFromReference(entry.ref,{catalog});
    assert.ok(source,entry.ref);
    assert.equal(source.type,"project");
    assert.equal(source.system.operation,"fabricate");
    assert.equal(source.system.source.sourceRevision,"craft-03");
    assert.equal(source.system.target.resultData.type,"equipment");
    assert.equal(source.system.target.resultData.name,entry.name);
    const equipment=catalog.find((row)=>row.name===entry.name && row.type==="equipment");
    assert.deepEqual(source.system.target.resultData.system,equipment.system,entry.name);
    assert.equal(source.system.economy.referenceValueCopper,entry.valueCopper);
    assert.equal(source.system.economy.priceStatus,"exact");
    assert.equal(source.system.ledger.estimatedMaterialsCopper,entry.materialCopper);
    assert.equal(source.system.time.requiredMinutes,entry.timeMinutes);
    assert.equal(source.system.professional.baseRank,entry.rank);
    assert.equal(source.system.professional.baseInstallation,entry.installation);
    assert.equal(source.system.professional.stableProcedure,!entry.needsPlan);
  }
});

test("CRAFT común: sin catálogo canónico o con precio adulterado no crea un proyecto ficticio",()=>{
  const known=CRAFTING_COMMON_EQUIPMENT_RECIPES[0];
  assert.equal(craftingProjectSourceFromReference(known.ref,{catalog:[]}),null);
  assert.equal(craftingProjectSourceFromReference(known.ref,{catalog:[{
    name:known.name,type:"equipment",
    system:{slug:known.name.toLowerCase().replaceAll(" ","-"),priceCopper:999,priceStatus:"exact"}
  }]}),null);
});

test("CRAFT común: vista previa de herramienta ordinaria utiliza economía y tiempos ejecutables",async()=>{
  const source=craftingProjectSourceFromReference("REF-COM-01",{catalog:coreCatalog()});
  const actor={
    id:"craftsperson",uuid:"Actor.craftsperson",type:"character",
    system:{creation:{status:"complete"},skills:{crafting:{rank:2}}},items:new Map()
  };
  const project={
    id:"project",uuid:"Actor.craftsperson.Item.project",name:source.name,type:"project",
    parent:actor,system:structuredClone(source.system)
  };
  actor.items.set(project.id,project);
  const preview=await previewCraftingProject(project);
  assert.equal(preview.valid,false); // Aún faltan insumos y la verificación de herramientas/instalación.
  assert.equal(preview.expectedMaterialCopper,15);
  assert.equal(preview.missingMaterialCopper,15);
  assert.ok(preview.issues.some((issue)=>issue.code==="material-allocation"));
  assert.equal(project.system.state,"draft");
});
