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


test("schema v1 migra Movimiento y bonos manuales sin reabrir CREA-11",()=>{
  const source={type:"character",system:{
    schemaVersion:1,
    creation:{status:"building",revision:7,equipmentBudgetCopper:1234,initialReserveGranted:true,legacyWarnings:[]},
    combat:{defensiveRank:2,defenseBonus:2,protectionBonus:1,movementBonus:-2,initiativeBonus:3},
    turn:{movement:false,action:false,reaction:true},
    attributes:{fue:{value:2,baseValue:2,creationValue:2}}
  }};
  const migrated=migrateActorSource(source);
  assert.equal(migrated.system.schemaVersion,TM_SCHEMA_VERSION);
  assert.equal(migrated.system.creation.status,"building");
  assert.equal(migrated.system.creation.revision,7);
  assert.equal(migrated.system.movement.base,6);
  assert.equal(migrated.system.turn.movementSpent,4);
  assert.equal(migrated.system.turn.extraMovement,0);
  assert.equal("movement" in migrated.system.turn,false);
  assert.equal(migrated.system.modifiers.manual.defensiveBonus.value,2);
  assert.equal(migrated.system.modifiers.manual.protection.value,1);
  assert.equal(migrated.system.modifiers.manual.movement.value,-2);
  assert.equal(migrated.system.modifiers.manual.initiativeModifier.value,3);
  assert.equal("defenseBonus" in migrated.system.combat,false);
  assert.equal("movementBonus" in migrated.system.combat,false);
  assert.deepEqual(migrateActorSource(migrated),migrated);
});

test("schema actual preserva el Movimiento histórico de Familiares como autoridad base",()=>{
  const source={type:"familiar",system:{
    schemaVersion:1,
    familiar:{movement:9,protection:1},
    combat:{defensiveRank:0},
    turn:{movement:true,action:false,reaction:false}
  }};
  const migrated=migrateActorSource(source);
  assert.equal(migrated.system.movement.base,9);
  assert.equal("movement" in migrated.system.familiar,false);
  assert.equal(migrated.system.turn.movementSpent,0);
});


test("schema v2 migra dispositivos al modelo de fuente energética sin reinterpretar ediciones explícitas",()=>{
  const legacyShield={name:"Escudo de campo",type:"device",system:{
    schemaVersion:2,slug:"escudo-de-campo",energy:{value:0,max:0},flow:2,consumption:2
  }};
  const migratedShield=migrateItemSource(legacyShield,{embedded:true});
  assert.equal(migratedShield.system.schemaVersion,TM_SCHEMA_VERSION);
  assert.equal(migratedShield.system.energySourceItemId,"");
  assert.equal(migratedShield.system.activation,"Reacción");
  assert.equal(migratedShield.system.kineticDefense,true);
  assert.deepEqual(migrateItemSource(migratedShield,{embedded:true}),migratedShield);

  const explicit={name:"Escudo de campo",type:"device",system:{
    schemaVersion:2,slug:"escudo-de-campo",energy:{value:3,max:3},flow:2,consumption:2,
    energySourceItemId:"custom-source",activation:"Acción",kineticDefense:false
  }};
  const preserved=migrateItemSource(explicit,{embedded:true});
  assert.equal(preserved.system.energySourceItemId,"custom-source");
  assert.equal(preserved.system.activation,"Acción");
  assert.equal(preserved.system.kineticDefense,false);

  const generic={name:"Herramienta",type:"device",system:{schemaVersion:2,slug:"herramienta",energy:{value:2,max:2},flow:1,consumption:1}};
  const migratedGeneric=migrateItemSource(generic,{embedded:true});
  assert.equal(migratedGeneric.system.energySourceItemId,"");
  assert.equal(migratedGeneric.system.activation,"Acción");
  assert.equal(migratedGeneric.system.kineticDefense,false);
});


test("schema v3 migra invocaciones y compatibilidad de Origen Remoto sin reinterpretar hechizos ajenos",()=>{
  const summon=migrateItemSource({name:"Llamada Menor",type:"spell",system:{
    schemaVersion:3,slug:"llamada-menor",sustained:false,duration:"Instantánea"
  }},{embedded:true});
  assert.equal(summon.system.schemaVersion,TM_SCHEMA_VERSION);
  assert.equal(summon.system.sustained,true);
  assert.equal(summon.system.duration,"Sostenida");
  assert.equal(summon.system.remoteOriginCompatible,true);

  for (const [name,slug] of [["Paso Breve","paso-breve"],["Trasposición","trasposicion"],["Umbral","umbral"],["Portal","portal"]]) {
    const migrated=migrateItemSource({name,type:"spell",system:{schemaVersion:3,slug,remoteOriginCompatible:true}},{embedded:true});
    assert.equal(migrated.system.remoteOriginCompatible,false,name);
    assert.deepEqual(migrateItemSource(migrated,{embedded:true}),migrated);
  }

  const ordinary=migrateItemSource({name:"Proyectil Ígneo",type:"spell",system:{
    schemaVersion:3,slug:"proyectil-igneo"
  }},{embedded:true});
  assert.equal(ordinary.system.remoteOriginCompatible,true);
});
