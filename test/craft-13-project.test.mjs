import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { TM_CONFIG } from "../scripts/config.mjs";
import {
  craftingProjectRemainingMinutes,
  normalizeCraftingProject,
  projectStateTransitionAllowed,
  validateCraftingProject
} from "../scripts/rules/crafting.mjs";

function validProject(overrides = {}) {
  return {
    modelVersion:1,
    operation:"fabricate",
    state:"draft",
    source:{ recipeUuid:"Item.recipe", profileRef:"REF-EQ-01", sourceRevision:"1" },
    target:{ itemUuid:"", resultType:"weapon", resultName:"Espada" },
    economy:{
      referenceValueCopper:200,
      priceStatus:"exact",
      fixedPriceCopper:200,
      quality:"common",
      workMaterialGrade:"ordinary",
      affectedValueCopper:0
    },
    specialMaterials:[],
    components:[],
    time:{ mode:"derived", baseMinutes:480, adjustedBaseMinutes:480, requiredMinutes:480, completedMinutes:120 },
    professional:{
      skill:"crafting",
      specialization:"Forja y metal",
      baseRank:2,
      requiredRank:2,
      baseInstallation:"adequate",
      requiredInstallation:"adequate",
      stableProcedure:true,
      materialsReady:true,
      essentialToolReady:true
    },
    assistants:{ work:0, technical:0 },
    execution:{ accelerated:false, reductionFactors:[], stage:"Trabajo", revision:0, committed:false, completionToken:"" },
    consequences:[],
    ledger:{ estimatedMaterialsCopper:100, committedMaterialsCopper:0, recoveredMaterialsCopper:0, entries:[] },
    ...overrides
  };
}

test("CRAFT-13B: Proyecto normaliza un snapshot persistente sin crear puntos abstractos",()=>{
  const project=normalizeCraftingProject(validProject());
  assert.equal(project.operation,"fabricate");
  assert.equal(project.time.baseMinutes,480);
  assert.equal(project.time.completedMinutes,120);
  assert.equal(craftingProjectRemainingMinutes(project),360);
  assert.equal(Object.prototype.hasOwnProperty.call(project,"progressPoints"),false);
});

test("CRAFT-13B: Defectuosa no es Calidad válida para un Proyecto universal",()=>{
  const project=validProject();
  project.economy.quality="defective";
  const result=validateCraftingProject(project);
  assert.equal(result.valid,false);
  assert.ok(result.issues.some((issue)=>issue.code==="quality"));
});

test("CRAFT-13B: modo derivado conserva el piso del 25% TBA",()=>{
  const project=validProject();
  project.time.adjustedBaseMinutes=480;
  project.time.requiredMinutes=119;
  const result=validateCraftingProject(project);
  assert.equal(result.valid,false);
  assert.ok(result.issues.some((issue)=>issue.code==="time-floor"));

  project.time.mode="fixed";
  assert.equal(validateCraftingProject(project).issues.some((issue)=>issue.code==="time-floor"),false);
});

test("CRAFT-13B: PEI nunca puede registrarse como recurso de crafting",()=>{
  const project=validProject();
  project.ledger.entries=[{ id:"x", kind:"reserve", resource:"pei", amountCopper:100 }];
  const result=validateCraftingProject(project);
  assert.equal(result.valid,false);
  assert.ok(result.issues.some((issue)=>issue.code==="pei"));
});

test("CRAFT-13B: un componente separado no puede recuperarse dos veces",()=>{
  const project=validProject();
  project.components=[{
    id:"core",
    name:"Núcleo",
    valueCopper:100,
    quantity:1,
    separable:true,
    recoveredSeparately:true,
    countedInGenericRecovery:true
  }];
  const result=validateCraftingProject(project);
  assert.equal(result.valid,false);
  assert.ok(result.issues.some((issue)=>issue.code==="double-recovery"));
});

test("CRAFT-13B: el cierre exige token transaccional y los estados terminales no reabren",()=>{
  const project=validProject({ state:"completed" });
  const invalid=validateCraftingProject(project);
  assert.ok(invalid.issues.some((issue)=>issue.code==="completion-token"));

  project.execution.completionToken="craft-close-001";
  assert.equal(validateCraftingProject(project).valid,true);
  assert.equal(projectStateTransitionAllowed("active","completed"),true);
  assert.equal(projectStateTransitionAllowed("completed","active"),false);
  assert.equal(projectStateTransitionAllowed("cancelled","active"),false);
});

test("CRAFT-13B: template y configuración registran Project como Item no físico",async()=>{
  const template=JSON.parse(await readFile(new URL("../template.json",import.meta.url),"utf8"));
  assert.ok(template.Item.types.includes("project"));
  assert.equal(template.Item.project.operation,"fabricate");
  assert.equal(template.Item.project.state,"draft");
  assert.equal(template.Item.project.time.mode,"derived");
  assert.equal(template.Item.project.professional.stableProcedure,false);
  assert.equal(TM_CONFIG.itemTypes.project,"Proyecto");
  assert.equal(TM_CONFIG.craftingProjectOperations.repair,"Reparar");
});

test("CRAFT-13B: crear Proyecto queda fuera de adquisición y de revisión de creación",async()=>{
  const source=await readFile(new URL("../scripts/tierra-magica.mjs",import.meta.url),"utf8");
  assert.match(source,/item\.type === "project" && !options\.tmValidated/);
  assert.match(source,/"system\.state":"draft"/);
  assert.match(source,/options\.tmValidated \|\| item\.type === "effect"/);
  assert.match(source,/options\.tmValidated \|\| item\.type === "project"/);
});

test("CRAFT-13C: TBA y requisitos no pueden declararse por debajo del mínimo derivado",()=>{
  const project=validProject();
  project.economy.quality="superior";
  project.professional.baseRank=2;
  project.professional.requiredRank=2;
  project.professional.baseInstallation="adequate";
  project.professional.requiredInstallation="adequate";
  project.time.baseMinutes=480;
  project.time.adjustedBaseMinutes=480;
  project.time.requiredMinutes=480;
  const result=validateCraftingProject(project);
  assert.equal(result.valid,false);
  assert.ok(result.issues.some((issue)=>issue.code==="rank-understated"));
  assert.ok(result.issues.some((issue)=>issue.code==="installation-understated"));
  assert.ok(result.issues.some((issue)=>issue.code==="tba-understated"));
});

test("CRAFT-13C: Aceleración declarada no reduce tiempo hasta estar resuelta",()=>{
  const project=validProject();
  project.execution.accelerated=true;
  project.execution.accelerationOutcome="pending";
  project.time.requiredMinutes=240;
  const result=validateCraftingProject(project);
  assert.equal(result.valid,false);
  assert.ok(result.issues.some((issue)=>issue.code==="acceleration-pending"));
});

test("CRAFT-13C: Suplemento Material se recalcula y no admite subcotización",()=>{
  const project=validProject();
  project.economy.referenceValueCopper=400;
  project.economy.workMaterialGrade="rare";
  project.specialMaterials=[{
    id:"rare-metal",
    name:"Metal raro",
    grade:"rare",
    coverage:"major",
    supplementCopper:99,
    sourceItemUuid:"Item.material"
  }];
  project.professional.requiredRank=3;
  project.professional.requiredInstallation="professional";
  project.time.adjustedBaseMinutes=600;
  project.time.requiredMinutes=600;
  const result=validateCraftingProject(project);
  assert.equal(result.valid,false);
  const issue=result.issues.find((entry)=>entry.code==="material-supplement");
  assert.ok(issue);
  assert.equal(issue.expectedCopper,100);
});

test("CRAFT-13C: creación de Proyecto empieza siempre en Borrador y reservas no se editan directamente",async()=>{
  const source=await readFile(new URL("../scripts/tierra-magica.mjs",import.meta.url),"utf8");
  assert.match(source,/item\.type === "project"[\s\S]*"system\.state":"draft"/);
  assert.match(source,/touches\("system\.craftingLot"\)/);
  assert.match(source,/craftingReservations/);
  assert.match(source,/Cancela o libera el Proyecto antes de eliminarlo/);
  assert.match(source,/Un Proyecto aprobado ya no puede reescribirse/);
});

