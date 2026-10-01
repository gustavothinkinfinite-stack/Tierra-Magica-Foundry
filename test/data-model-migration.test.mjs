import test from "node:test";
import assert from "node:assert/strict";
import { migrateActorSource, migrateItemSource, TM_SCHEMA_VERSION } from "../scripts/rules/data-model-migration.mjs";

test("actor migration preserves legacy identity, reserve and attribute values",()=>{
  const source={type:"character",system:{
    details:{ancestry:"Humano",origin:"Valdoriano",background:"Vida de Taller",pdSpent:10,prSpent:2},
    creation:{skillBuildActive:true,equipmentBudgetActive:true,equipmentBudgetCopper:1500},
    currency:{totalCopper:200,initialReserveGranted:true},
    attributes:{fue:{value:3}}
  }};
  const migrated=migrateActorSource(source);
  assert.equal(migrated.system.schemaVersion,TM_SCHEMA_VERSION);
  assert.equal(migrated.system.creation.status,"complete");
  assert.equal(migrated.system.creation.initialReserveGranted,true);
  assert.equal(migrated.system.legacyIdentityText.ancestry,"Humano");
  assert.equal(migrated.system.attributes.fue.creationValue,3);
  assert.equal(migrated.system.attributes.fue.baseValue,3);
  assert.deepEqual(migrateActorSource(migrated),migrated);
});

test("item migration preserves text and converts structured skill data once",()=>{
  const source={name:"Regeneración",type:"spell",system:{
    grade:"advanced",
    requirements:"Acceso ritual",
    skillRequirements:[{skill:"medicine",minRank:2}],
    skillModifiers:[{skill:"medicine",value:1,label:"Prueba"}]
  }};
  const migrated=migrateItemSource(source,{embedded:true});
  assert.equal(migrated.system.slug,"regeneracion");
  assert.equal(migrated.system.requirementsText,"Acceso ritual");
  assert.equal(migrated.system.requirements.all[0].key,"medicine");
  assert.equal(migrated.system.rules[0].key,"FlatModifier");
  assert.equal(migrated.system.acquisition.mode,"legacy");
  assert.equal(migrated.system.acquisition.paid.known,false);
  assert.deepEqual(migrateItemSource(migrated,{embedded:true}),migrated);
});
