import test from "node:test";
import assert from "node:assert/strict";
import { TM_CONFIG } from "../scripts/config.mjs";
import { buildAllCrea13Fixtures } from "./fixtures/crea-13-builds.mjs";
import { migrateActorSource, migrateItemSource } from "../scripts/rules/data-model-migration.mjs";
import { prepareRuleElements } from "../scripts/rules/rule-elements.mjs";
import { deriveActorState, resolveDerivedSelector } from "../scripts/rules/derived-state.mjs";
import { reconcileActorResources } from "../scripts/rules/resource-reconciliation.mjs";
import { installFamiliarGuards } from "../scripts/rules/familiar-guards.mjs";
import { resolveDeviceEnergySource } from "../scripts/rules/device-energy.mjs";

const clone=(value)=>JSON.parse(JSON.stringify(value));

function prepare(actor){
  const prepared=prepareRuleElements(actor.items,{skillDefinitions:TM_CONFIG.skills});
  const derived=deriveActorState({
    actorType:actor.type,
    system:actor.system,
    items:actor.items,
    rulePreparation:prepared,
    defensiveRankBonuses:TM_CONFIG.defensiveRankBonuses
  });
  return {prepared,derived};
}

function equipRelevant(actor){
  for(const item of actor.items){
    if(["weapon","armor","shield"].includes(item.type)) item.system.equipped=true;
  }
}

function persistedSnapshot(actor){
  const saved=clone(actor);
  delete saved.system.derived;
  for(const skill of Object.values(saved.system.skills ?? {})){
    for(const key of ["baseRank","grantedRank","effectiveRank","rankBonus","label","rankLabel","pdCost","breakdown","bonus"]) delete skill[key];
  }
  return saved;
}

function reopen(snapshot){
  const actor=migrateActorSource(clone(snapshot));
  actor.items=(snapshot.items ?? []).map((item)=>migrateItemSource(item,{embedded:true}));
  return actor;
}

function stableDerived(derived){
  return clone({
    healthMax:derived.healthMax,
    manaMax:derived.manaMax,
    severeThreshold:derived.severeThreshold,
    defensiveBonus:derived.defensiveBonus,
    defense:derived.defense,
    maneuverDefense:derived.maneuverDefense,
    mentalDefense:derived.mentalDefense,
    bodyDefense:derived.bodyDefense,
    protection:derived.protection,
    movement:derived.movement,
    initiativeModifier:derived.initiativeModifier,
    breakdowns:derived.breakdowns,
    contextual:derived.contextual,
    equipmentIssues:derived.equipmentIssues
  });
}

test("CREA-13 13E: los siete fixtures sobreviven guardar/reabrir sin drift de derivados",()=>{
  for(const build of buildAllCrea13Fixtures()){
    const actor=build.actor;
    equipRelevant(actor);

    if(build.profile.key==="channeler"){
      const skin=actor.items.find((item)=>item.name==="Piel Alterada");
      actor.system.magic.sustainedSpellIds=[skin.id];
    }
    actor.system.alchemy ??= {saturatedFamilies:[]};
    if(build.profile.key==="alchemist") actor.system.alchemy.saturatedFamilies=["restaurativa"];

    const before=prepare(actor);
    const snapshot=persistedSnapshot(actor);
    const reopened=reopen(snapshot);
    const after=prepare(reopened);

    assert.deepEqual(stableDerived(after.derived),stableDerived(before.derived),build.profile.id+" derivados");
    assert.deepEqual(after.prepared,before.prepared,build.profile.id+" Rule Elements");
    assert.deepEqual(reopened.system.magic?.sustainedSpellIds ?? [],snapshot.system.magic?.sustainedSpellIds ?? [],build.profile.id+" sostenimiento");
    assert.deepEqual(reopened.system.alchemy?.saturatedFamilies ?? [],snapshot.system.alchemy?.saturatedFamilies ?? [],build.profile.id+" saturación");
  }
});

test("CREA-13 13E: migrar dos veces un snapshot actual es idempotente",()=>{
  for(const build of buildAllCrea13Fixtures()){
    const once=reopen(persistedSnapshot(build.actor));
    const twice=reopen(persistedSnapshot(once));
    assert.deepEqual(twice,once,build.profile.id);
  }
});

test("CREA-13 13E: equipar → desequipar → equipar vuelve exactamente al mismo derivado",()=>{
  for(const key of ["soldier","engineer","explorer","bonded"]){
    const actor=buildAllCrea13Fixtures().find((entry)=>entry.profile.key===key).actor;
    const physical=actor.items.filter((item)=>["armor","shield"].includes(item.type));
    for(const item of physical) item.system.equipped=true;
    const on1=stableDerived(prepare(actor).derived);

    for(const item of physical) item.system.equipped=false;
    const off=stableDerived(prepare(actor).derived);

    for(const item of physical) item.system.equipped=true;
    const on2=stableDerived(prepare(actor).derived);

    assert.deepEqual(on2,on1,key+" on→off→on");
    if(physical.length) assert.notDeepEqual(off,on1,key+" debe cambiar al desequipar");
  }
});

test("CREA-13 13E: Piel Alterada sostenida → detenida → sostenida no acumula Protección ni procedencia",()=>{
  const actor=buildAllCrea13Fixtures().find((entry)=>entry.profile.key==="channeler").actor;
  const skin=actor.items.find((item)=>item.name==="Piel Alterada");

  actor.system.magic.sustainedSpellIds=[skin.id];
  const on1=prepare(actor).derived;
  assert.equal(resolveDerivedSelector(on1,"protection",{alteredSkinCompatible:true}).total,2);
  assert.equal(on1.contextual.protection.filter((entry)=>entry.sourceItemName==="Piel Alterada").length,1);

  actor.system.magic.sustainedSpellIds=[];
  const off=prepare(actor).derived;
  assert.equal(resolveDerivedSelector(off,"protection",{alteredSkinCompatible:true}).total,0);
  assert.equal(off.contextual.protection.filter((entry)=>entry.sourceItemName==="Piel Alterada").length,0);

  actor.system.magic.sustainedSpellIds=[skin.id];
  const on2=prepare(actor).derived;
  assert.deepEqual(stableDerived(on2),stableDerived(on1));
  assert.equal(on2.contextual.protection.filter((entry)=>entry.sourceItemName==="Piel Alterada").length,1);
});

test("CREA-13 13E: efecto activo → inactivo → activo no duplica Rule Elements",()=>{
  const effect={
    id:"effect-13e",name:"Efecto reversible",type:"effect",
    system:{
      active:true,
      rules:[
        {id:"def",key:"FlatModifier",selector:"defense",value:2,label:"Defensa temporal"},
        {id:"opt",key:"RollOption",option:"effect:reversible"}
      ]
    }
  };
  const actor=buildAllCrea13Fixtures().find((entry)=>entry.profile.key==="healer").actor;
  actor.items.push(effect);

  const on1=prepare(actor);
  assert.equal(on1.derived.defense,14);
  assert.equal(on1.prepared.modifiers.filter((entry)=>entry.sourceItemId==="effect-13e").length,1);
  assert.equal(on1.prepared.rollOptions.filter((entry)=>entry==="effect:reversible").length,1);

  effect.system.active=false;
  const off=prepare(actor);
  assert.equal(off.derived.defense,12);
  assert.equal(off.prepared.modifiers.some((entry)=>entry.sourceItemId==="effect-13e"),false);
  assert.equal(off.prepared.rollOptions.includes("effect:reversible"),false);

  effect.system.active=true;
  const on2=prepare(actor);
  assert.deepEqual(on2,on1);
});

test("CREA-13 13E: re-preparar repetidamente el mismo estado es determinista",()=>{
  for(const build of buildAllCrea13Fixtures()){
    equipRelevant(build.actor);
    const first=prepare(build.actor);
    for(let i=0;i<5;i+=1){
      const next=prepare(build.actor);
      assert.deepEqual(next,first,build.profile.id+" preparación "+(i+2));
    }
  }
});

test("CREA-13 13E: bajar y restaurar máximos no duplica recurso al reconciliar tras reabrir",async()=>{
  const source=buildAllCrea13Fixtures().find((entry)=>entry.profile.key==="channeler").actor;
  source.system.resources.health.value=10;
  source.system.resources.mana.value=12;
  source.system.derived={healthMax:14,manaMax:15};

  const snapshot=persistedSnapshot(source);
  const reopened=reopen(snapshot);
  reopened.system.derived={healthMax:8,manaMax:6};
  reopened._source={system:{resources:{health:{value:10},mana:{value:12}}}};
  reopened.update=async function(changes){
    for(const [path,value] of Object.entries(changes)){
      const keys=path.split(".").slice(1);
      let node=this.system;
      while(keys.length>1){const key=keys.shift(); node[key] ??= {}; node=node[key];}
      node[keys[0]]=value;
      if(path==="system.resources.health.value") this._source.system.resources.health.value=value;
      if(path==="system.resources.mana.value") this._source.system.resources.mana.value=value;
    }
  };

  assert.equal(await reconcileActorResources(reopened),true);
  assert.equal(reopened.system.resources.health.value,8);
  assert.equal(reopened.system.resources.mana.value,6);

  reopened.system.derived={healthMax:14,manaMax:15};
  assert.equal(await reconcileActorResources(reopened),false);
  assert.equal(reopened.system.resources.health.value,8);
  assert.equal(reopened.system.resources.mana.value,6);
});

test("CREA-13 13E: Familiar reabierto vuelve a imponer Maná 0 y ausencia de economía propia",async()=>{
  function applyChanges(document,changes){
    for(const [path,value] of Object.entries(changes)){
      const keys=path.split(".").slice(1);
      let node=document.system;
      while(keys.length>1){const key=keys.shift(); node[key] ??= {}; node=node[key];}
      node[keys[0]]=value;
    }
  }
  class FakeActor{
    constructor(data){Object.assign(this,data);}
    prepareDerivedData(){}
    async update(changes){applyChanges(this,changes);}
  }
  installFamiliarGuards(FakeActor);

  const saved={
    id:"f13e",uuid:"Actor.f13e",name:"Familiar persistido",type:"familiar",items:[],
    system:{
      schemaVersion:2,
      details:{ownerUuid:"Actor.owner"},
      attributes:{agi:{value:2},vig:{value:2},vol:{value:3},per:{value:2}},
      movement:{base:6},
      combat:{defensiveRank:0},
      magic:{sustainedSpellIds:[]},
      modifiers:{manual:{}},
      resources:{health:{value:4,max:5},mana:{value:5,max:9}},
      status:{trauma:0,incapacitated:false},
      familiar:{incapacitated:false},
      turn:{action:true,reaction:true,movementSpent:0,extraMovement:0}
    }
  };
  const reopened=migrateActorSource(saved);
  const actor=new FakeActor(reopened);
  actor.system.derived=deriveActorState({actorType:"familiar",system:actor.system});
  actor.prepareDerivedData();
  actor._source={system:{resources:{health:{value:4},mana:{value:5}}}};

  assert.equal(actor.system.turn.action,false);
  assert.equal(actor.system.turn.reaction,false);
  assert.equal(actor.system.derived.manaMax,0);
  assert.equal(await reconcileActorResources(actor),true);
  assert.equal(actor.system.resources.mana.value,0);
});


test("CREA-13 13F: el vínculo dispositivo → acumulador persiste y no se sustituye por otra fuente",()=>{
  const cell={
    id:"cell",name:"Celda",type:"device",
    system:{schemaVersion:2,energy:{value:4,max:4},flow:2,consumption:0,energySourceItemId:""}
  };
  const other={
    id:"other",name:"Núcleo",type:"device",
    system:{schemaVersion:2,energy:{value:16,max:16},flow:5,consumption:0,energySourceItemId:""}
  };
  const shield={
    id:"shield",name:"Escudo de campo",type:"device",
    system:{schemaVersion:2,energy:{value:0,max:0},flow:2,consumption:2,activation:"Reacción",kineticDefense:true,energySourceItemId:"cell"}
  };
  const reopened={
    items:[cell,other,shield].map((entry)=>migrateItemSource(clone(entry),{embedded:true}))
  };
  const power=resolveDeviceEnergySource(reopened,reopened.items.find((entry)=>entry.id==="shield"));
  assert.equal(power.valid,true);
  assert.equal(power.source.id,"cell");
  assert.equal(power.flow,2);
  assert.equal(power.energy,4);
  assert.equal(power.source.id==="other",false);
});
