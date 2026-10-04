import test from "node:test";
import assert from "node:assert/strict";

import {
  advanceCraftingProjectWork,
  completeCraftingProject,
  craftingLotAvailableCopper,
  releaseCraftingProjectMaterials,
  reserveCraftingProjectMaterials
} from "../scripts/rules/crafting-transactions.mjs";
import { deriveManufacturedSystem } from "../scripts/rules/crafting-enhancements.mjs";

function applyChanges(document, changes) {
  for (const [path, value] of Object.entries(changes)) {
    const keys = path.split(".");
    if (keys[0] === "system") keys.shift();
    let node = document.system;
    while (keys.length > 1) {
      const key = keys.shift();
      node[key] ??= {};
      node = node[key];
    }
    node[keys[0]] = structuredClone(value);
  }
}

let serialId = 0;

class StubItem {
  constructor({ id, name, type, system, parent = null }) {
    this.id = id ?? "item-" + (++serialId);
    this.name = name ?? this.id;
    this.type = type;
    this.system = structuredClone(system ?? {});
    this.parent = parent;
    this.uuid = parent ? parent.uuid + ".Item." + this.id : "Item." + this.id;
    this.flags = {};
    this.isOwner = true;
  }
  async update(changes) {
    applyChanges(this, changes);
    return changes;
  }
  toObject() {
    return { _id:this.id, name:this.name, type:this.type, system:structuredClone(this.system) };
  }
  getFlag(scope, key) {
    return this.flags?.[scope]?.[key];
  }
  async setFlag(scope, key, value) {
    this.flags[scope] ??= {};
    this.flags[scope][key] = structuredClone(value);
    return value;
  }
  canUserModify() { return true; }
}

class StubActor {
  constructor(id = "actor") {
    this.id = id;
    this.uuid = "Actor." + id;
    this.type = "character";
    this.system = { skills:{ crafting:{ rank:5 } } };
    this.items = new Map();
    this.isOwner = true;
  }
  add(item) {
    item.parent = this;
    item.uuid = this.uuid + ".Item." + item.id;
    this.items.set(item.id, item);
    return item;
  }
  async createEmbeddedDocuments(type, sources) {
    assert.equal(type, "Item");
    return sources.map((source) => {
      const item = new StubItem({
        id: source._id ?? "created-" + (++serialId),
        name: source.name,
        type: source.type,
        system: source.system,
        parent:this
      });
      this.items.set(item.id, item);
      return item;
    });
  }
  async deleteEmbeddedDocuments(type, ids) {
    assert.equal(type, "Item");
    for (const id of ids) this.items.delete(id);
    return ids;
  }
}

function lot(actor, {
  id = "lot",
  vi = 100,
  reservations = {},
  compatibility = ["forja"],
  materialProfileKey = "",
  resourceGrade = "ordinary",
  preparation = "prepared"
} = {}) {
  return actor.add(new StubItem({
    id,
    name:"Lote " + id,
    type:"equipment",
    system:{
      condition:"operative",
      craftingLot:{
        enabled:true,
        category:"metal",
        resourceGrade,
        compatibility,
        materialProfileKey,
        preparation,
        inputValueCopper:vi,
        reservations
      }
    }
  }));
}

function project(actor, {
  id = "project",
  operation = "fabricate",
  state = "ready",
  material = null,
  materialCopper = 50,
  estimatedMaterialsCopper = materialCopper,
  requiredMinutes = 60,
  completedMinutes = 0,
  targetItemUuid = "",
  resultData = null,
  referenceValueCopper = 100,
  quality = "common",
  workMaterialGrade = "ordinary",
  specialMaterials = [],
  modifications = [],
  enhancement = {mode:"modification",replaceMaterialId:"",replaceModificationKey:"",fineMachiningMaterialId:""},
  repair = {affectedMaterialIds:[],ordinaryReplacementMaterialIds:[],specialReplacements:[]},
  components = [],
  timeMode = operation === "modify" ? "fixed" : "derived",
  baseMinutes = Math.max(requiredMinutes, 10),
  adjustedBaseMinutes = Math.max(requiredMinutes, 10),
  requiredRank = 2,
  professionalSkill = "crafting",
  requiredInstallation = "adequate",
  availableInstallation = "adequate",
  allocationCompatibility = "forja"
} = {}) {
  const entries = material && materialCopper > 0 ? [{
    id:"alloc-" + id,
    kind:"material-allocation",
    resource:"materials",
    amountCopper:materialCopper,
    quantity:0,
    sourceUuid:material.uuid,
    compatibility:allocationCompatibility,
    note:""
  }] : [];
  return actor.add(new StubItem({
    id,
    name:"Proyecto " + id,
    type:"project",
    system:{
      schemaVersion:5,
      modelVersion:1,
      operation,
      state,
      source:{ recipeUuid:"Item.recipe", profileRef:"REF", sourceRevision:"1" },
      target:{
        itemUuid:targetItemUuid,
        resultType:resultData?.type ?? "equipment",
        resultName:resultData?.name ?? "Resultado",
        resultData:resultData ?? {}
      },
      economy:{
        referenceValueCopper,
        priceStatus:"exact",
        fixedPriceCopper:referenceValueCopper,
        quality,
        workMaterialGrade,
        affectedValueCopper:referenceValueCopper
      },
      specialMaterials,
      modifications,
      enhancement,
      repair,
      components,
      time:{
        mode:timeMode,
        baseMinutes,
        adjustedBaseMinutes,
        requiredMinutes,
        completedMinutes
      },
      professional:{
        skill:professionalSkill,
        specialization:"",
        baseRank:2,
        requiredRank,
        baseInstallation:"adequate",
        requiredInstallation,
        availableInstallation,
        stableProcedure:true,
        materialsReady:true,
        essentialToolReady:true
      },
      assistants:{ work:0, technical:0 },
      execution:{
        accelerated:false,
        accelerationOutcome:"none",
        reductionFactors:[],
        stage:"Trabajo",
        revision:0,
        committed:false,
        completionToken:""
      },
      consequences:[],
      ledger:{
        estimatedMaterialsCopper,
        committedMaterialsCopper:0,
        recoveredMaterialsCopper:0,
        entries
      }
    }
  }));
}

function manufacturedItem(actor,{
  id="manufactured",
  name="Objeto manufacturado",
  type="weapon",
  referenceValueCopper=100,
  baseTimeMinutes=120,
  baseRank=2,
  baseInstallation="adequate",
  quality="common",
  modifications=[],
  specialMaterials=[],
  system={}
}={}) {
  const source={
    name,
    type,
    system:{
      damage:type==="weapon"?5:undefined,
      penetration:type==="weapon"?0:undefined,
      strengthMin:["weapon","armor","shield"].includes(type)?1:undefined,
      reload:type==="weapon"?0:undefined,
      block:type==="shield"?2:undefined,
      movementPenalty:type==="shield"?-1:undefined,
      skill:type==="weapon"?"martialWeapons":undefined,
      properties:"",
      condition:"operative",
      quantity:1,
      ...system
    }
  };
  for(const key of Object.keys(source.system)) if(source.system[key]===undefined) delete source.system[key];
  const derived=deriveManufacturedSystem(source,{
    referenceValueCopper,
    baseTimeMinutes,
    baseRank,
    baseInstallation,
    quality,
    modifications,
    specialMaterials
  });
  assert.equal(derived.valid,true);
  return actor.add(new StubItem({id,name,type,system:derived.system}));
}

function resolverFor(actor) {
  const map = new Map([[actor.uuid, actor]]);
  for (const item of actor.items.values()) map.set(item.uuid, item);
  return async (uuid) => map.get(uuid) ?? actor.items.values().find((item) => item.uuid === uuid) ?? null;
}

globalThis.foundry = { utils:{
  deepClone:(value)=>structuredClone(value),
  randomID:()=> "token-" + (++serialId)
}};

test("CRAFT-13C: reservar VI compromete Lote y activa Proyecto sin consumir todavía",async()=>{
  const actor=new StubActor("reserve");
  const material=lot(actor,{vi:100});
  const craft=project(actor,{material,materialCopper:60,referenceValueCopper:120});
  const result=await reserveCraftingProjectMaterials(craft,{expectedRevision:0,resolver:resolverFor(actor)});
  assert.equal(result.ok,true);
  assert.equal(craft.system.state,"active");
  assert.equal(craft.system.execution.committed,true);
  assert.equal(craft.system.ledger.committedMaterialsCopper,60);
  assert.equal(material.system.craftingLot.inputValueCopper,100);
  assert.equal(material.system.craftingLot.reservations[craft.uuid].amountCopper,60);
  assert.equal(craftingLotAvailableCopper(material),40);
});



test("CRAFT-13C: VI incompatible no puede pagar el CM",async()=>{
  const actor=new StubActor("compatibility");
  const material=lot(actor,{vi:100});
  material.system.craftingLot.compatibility=["madera"];
  const craft=project(actor,{material,materialCopper:50});
  const result=await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  assert.equal(result.ok,false);
  assert.match(result.error,/compatible/);
  assert.equal(craft.system.state,"ready");
  assert.deepEqual(material.system.craftingLot.reservations,{});
});

test("CRAFT-13C: reserva obsoleta no muta inventario",async()=>{
  const actor=new StubActor("stale");
  const material=lot(actor,{vi:100});
  const craft=project(actor,{material,materialCopper:60,referenceValueCopper:120});
  const result=await reserveCraftingProjectMaterials(craft,{expectedRevision:99,resolver:resolverFor(actor)});
  assert.equal(result.ok,false);
  assert.equal(result.stale,true);
  assert.deepEqual(material.system.craftingLot.reservations,{});
  assert.equal(craft.system.state,"ready");
});

test("CRAFT-13C: liberar o cancelar devuelve la reserva sin crear VI",async()=>{
  const actor=new StubActor("release");
  const material=lot(actor,{vi:100});
  const craft=project(actor,{material,materialCopper:60,referenceValueCopper:120});
  await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  const released=await releaseCraftingProjectMaterials(craft,{expectedRevision:1,resolver:resolverFor(actor)});
  assert.equal(released.ok,true);
  assert.equal(craft.system.state,"ready");
  assert.equal(material.system.craftingLot.inputValueCopper,100);
  assert.deepEqual(material.system.craftingLot.reservations,{});

  await reserveCraftingProjectMaterials(craft,{expectedRevision:2,resolver:resolverFor(actor)});
  const cancelled=await releaseCraftingProjectMaterials(craft,{expectedRevision:3,cancel:true,resolver:resolverFor(actor)});
  assert.equal(cancelled.state,"cancelled");
  assert.equal(material.system.craftingLot.inputValueCopper,100);
});

test("CRAFT-13C: trabajo real avanza en minutos y no sobrepasa el requerido",async()=>{
  const actor=new StubActor("work");
  const material=lot(actor,{vi:100});
  const craft=project(actor,{material,materialCopper:50,requiredMinutes:60});
  await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  const one=await advanceCraftingProjectWork(craft,25,{expectedRevision:1});
  assert.equal(one.minutesApplied,25);
  assert.equal(one.remainingMinutes,35);
  const two=await advanceCraftingProjectWork(craft,100,{expectedRevision:2});
  assert.equal(two.minutesApplied,35);
  assert.equal(craft.system.time.completedMinutes,60);
});

test("CRAFT-13C: fabricar consume VI una vez, crea resultado y cierre idempotente",async()=>{
  const actor=new StubActor("fabricate");
  const material=lot(actor,{vi:100});
  const craft=project(actor,{
    material,
    materialCopper:50,
    requiredMinutes:60,
    resultData:{
      name:"Espada terminada",
      type:"weapon",
      system:{
        priceStatus:"exact",
        priceCopper:200,
        quality:"common",
        condition:"operative",
        craftingLot:{enabled:false,category:"",compatibility:[],inputValueCopper:0,reservations:{}}
      }
    }
  });
  const resolver=resolverFor(actor);
  await reserveCraftingProjectMaterials(craft,{resolver});
  await advanceCraftingProjectWork(craft,60,{expectedRevision:1});
  const result=await completeCraftingProject(craft,{expectedRevision:2,resolver});
  assert.equal(result.ok,true);
  assert.equal(craft.system.state,"completed");
  assert.equal(material.system.craftingLot.inputValueCopper,50);
  assert.deepEqual(material.system.craftingLot.reservations,{});
  const output=[...actor.items.values()].find((item)=>item.name==="Espada terminada");
  assert.ok(output);
  assert.equal(output.system.provenance.sourceUuid,craft.uuid);

  const again=await completeCraftingProject(craft,{expectedRevision:3,resolver:resolverFor(actor)});
  assert.equal(again.ok,true);
  assert.equal(again.alreadyCompleted,true);
  assert.equal(material.system.craftingLot.inputValueCopper,50);
  assert.equal([...actor.items.values()].filter((item)=>item.name==="Espada terminada").length,1);
});

test("CRAFT-13C: reparar consume BRA reservada y devuelve el mismo objeto a Operativo",async()=>{
  const actor=new StubActor("repair");
  const material=lot(actor,{vi:100});
  const target=actor.add(new StubItem({
    id:"armor",
    name:"Armadura dañada",
    type:"armor",
    system:{condition:"damaged",priceCopper:1000,quality:"common"}
  }));
  const craft=project(actor,{
    operation:"repair",
    material,
    materialCopper:30,
    estimatedMaterialsCopper:30,
    requiredMinutes:30,
    targetItemUuid:target.uuid,
    referenceValueCopper:300
  });
  const resolver=resolverFor(actor);
  await reserveCraftingProjectMaterials(craft,{resolver});
  await advanceCraftingProjectWork(craft,30,{expectedRevision:1});
  const result=await completeCraftingProject(craft,{expectedRevision:2,resolver});
  assert.equal(result.ok,true);
  assert.equal(target.system.condition,"operative");
  assert.equal(material.system.craftingLot.inputValueCopper,70);
});

test("CRAFT-13C: desmantelar crea VI, no moneda, y elimina el objeto original",async()=>{
  const actor=new StubActor("dismantle");
  const target=actor.add(new StubItem({
    id:"sword",
    name:"Espada dañada",
    type:"weapon",
    system:{condition:"damaged",priceStatus:"exact",priceCopper:200,quality:"common"}
  }));
  const craft=project(actor,{
    operation:"dismantle",
    material:null,
    materialCopper:0,
    estimatedMaterialsCopper:0,
    requiredMinutes:10,
    completedMinutes:0,
    targetItemUuid:target.uuid,
    referenceValueCopper:200
  });
  const resolver=resolverFor(actor);
  await reserveCraftingProjectMaterials(craft,{resolver});
  await advanceCraftingProjectWork(craft,10,{expectedRevision:1});
  const result=await completeCraftingProject(craft,{expectedRevision:2,resolver});
  assert.equal(result.ok,true);
  assert.equal(actor.items.has("sword"),false);
  const recovered=[...actor.items.values()].find((item)=>item.system?.craftingLot?.enabled);
  assert.ok(recovered);
  assert.equal(recovered.system.craftingLot.inputValueCopper,30);
  assert.equal(recovered.system.priceStatus,"unset");
  assert.equal(craft.system.ledger.recoveredMaterialsCopper,30);
});

test("CRAFT-13C: no completa antes de terminar el trabajo",async()=>{
  const actor=new StubActor("unfinished");
  const material=lot(actor,{vi:100});
  const craft=project(actor,{material,materialCopper:50,requiredMinutes:60});
  const resolver=resolverFor(actor);
  await reserveCraftingProjectMaterials(craft,{resolver});
  const result=await completeCraftingProject(craft,{expectedRevision:1,resolver});
  assert.equal(result.ok,false);
  assert.equal(result.remainingMinutes,60);
  assert.equal(material.system.craftingLot.inputValueCopper,100);
});

test("CRAFT-13C: autoridad GM serializa dos Proyectos contra el mismo Lote",async()=>{
  const actor=new StubActor("authority");
  const material=lot(actor,{vi:100});
  const one=project(actor,{id:"one",material,materialCopper:60,referenceValueCopper:120});
  const two=project(actor,{id:"two",material,materialCopper:60,referenceValueCopper:120});

  const gm={id:"gm",active:true,isGM:true};
  globalThis.game={user:gm,users:[gm]};
  globalThis.fromUuid=async(uuid)=>{
    if(uuid===actor.uuid) return actor;
    return [...actor.items.values()].find((item)=>item.uuid===uuid) ?? null;
  };

  const { executeAuthorityRequestForAudit }=await import("../scripts/rules/state-authority.mjs");
  const [a,b]=await Promise.all([
    executeAuthorityRequestForAudit({
      requestId:"craft-a",
      requesterId:"gm",
      action:"craft-reserve",
      payload:{projectUuid:one.uuid,expectedRevision:0}
    }),
    executeAuthorityRequestForAudit({
      requestId:"craft-b",
      requesterId:"gm",
      action:"craft-reserve",
      payload:{projectUuid:two.uuid,expectedRevision:0}
    })
  ]);

  assert.equal([a,b].filter((entry)=>entry.ok).length,1);
  assert.equal(material.system.craftingLot.inputValueCopper,100);
  assert.equal(Object.keys(material.system.craftingLot.reservations).length,1);
  assert.equal(Object.values(material.system.craftingLot.reservations)[0].amountCopper,60);
});

test("CRAFT-13C: CM subcotizado no puede comprometer menos VI que la fórmula canónica",async()=>{
  const actor=new StubActor("underquote");
  const material=lot(actor,{vi:100});
  const craft=project(actor,{
    material,
    materialCopper:40,
    estimatedMaterialsCopper:40,
    referenceValueCopper:100
  });
  const result=await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  assert.equal(result.ok,false);
  assert.equal(result.expectedCopper,50);
  assert.equal(material.system.craftingLot.inputValueCopper,100);
  assert.deepEqual(material.system.craftingLot.reservations,{});
});

test("CRAFT-13C: el rango real del Actor no se sustituye por el rango declarado en Proyecto",async()=>{
  const actor=new StubActor("rank");
  actor.system.skills.crafting.rank=1;
  const material=lot(actor,{vi:100});
  const craft=project(actor,{material,materialCopper:50,referenceValueCopper:100});
  const result=await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  assert.equal(result.ok,false);
  assert.ok(result.issues.some((issue)=>issue.code==="rank"));
  assert.deepEqual(material.system.craftingLot.reservations,{});
});

test("CRAFT-13C: factores temporales libres no entran en una transacción",async()=>{
  const actor=new StubActor("free-reduction");
  const material=lot(actor,{vi:100});
  const craft=project(actor,{material,materialCopper:50,referenceValueCopper:100});
  craft.system.execution.reductionFactors=[0.5];
  craft.system.time.requiredMinutes=30;
  const result=await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  assert.equal(result.ok,false);
  assert.match(result.error,/fuente mecánica estructurada/);
  assert.deepEqual(material.system.craftingLot.reservations,{});
});

test("CRAFT-13C: componente separado se reserva por cantidad y no aumenta el VI ordinario",async()=>{
  const actor=new StubActor("component-reserve");
  const material=lot(actor,{vi:100});
  const component=actor.add(new StubItem({
    id:"gem",
    name:"Gema preparada",
    type:"equipment",
    system:{quantity:2,craftingReservations:{}}
  }));
  const craft=project(actor,{
    material,
    materialCopper:50,
    referenceValueCopper:100,
    components:[{
      id:"gem-component",
      name:"Gema preparada",
      itemUuid:component.uuid,
      valueCopper:100,
      quantity:1,
      separable:true,
      recoveredSeparately:false,
      countedInGenericRecovery:false
    }]
  });
  const resolver=resolverFor(actor);
  const result=await reserveCraftingProjectMaterials(craft,{resolver});
  assert.equal(result.ok,true);
  assert.equal(craft.system.ledger.committedMaterialsCopper,50);
  assert.equal(material.system.craftingLot.reservations[craft.uuid].amountCopper,50);
  assert.equal(component.system.quantity,2);
  assert.equal(component.system.craftingReservations[craft.uuid].quantity,1);

  const released=await releaseCraftingProjectMaterials(craft,{expectedRevision:1,resolver});
  assert.equal(released.ok,true);
  assert.equal(component.system.quantity,2);
  assert.deepEqual(component.system.craftingReservations,{});
});

test("CRAFT-13C: completar consume el componente físico exactamente una vez",async()=>{
  const actor=new StubActor("component-consume");
  const material=lot(actor,{vi:100});
  const component=actor.add(new StubItem({
    id:"core",
    name:"Núcleo preparado",
    type:"equipment",
    system:{quantity:2,craftingReservations:{}}
  }));
  const craft=project(actor,{
    material,
    materialCopper:50,
    referenceValueCopper:100,
    requiredMinutes:10,
    components:[{
      id:"core-component",
      name:"Núcleo preparado",
      itemUuid:component.uuid,
      valueCopper:500,
      quantity:1,
      separable:true,
      recoveredSeparately:false,
      countedInGenericRecovery:false
    }],
    resultData:{
      name:"Dispositivo terminado",
      type:"device",
      system:{
        priceStatus:"exact",
        priceCopper:100,
        quality:"common",
        condition:"operative",
        quantity:1,
        craftingLot:{enabled:false,category:"",compatibility:[],inputValueCopper:0,reservations:{}},
        craftingReservations:{}
      }
    }
  });
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,10,{expectedRevision:1});
  const completed=await completeCraftingProject(craft,{expectedRevision:2,resolver});
  assert.equal(completed.ok,true);
  assert.equal(component.system.quantity,1);
  assert.deepEqual(component.system.craftingReservations,{});

  const again=await completeCraftingProject(craft,{expectedRevision:3,resolver:resolverFor(actor)});
  assert.equal(again.alreadyCompleted,true);
  assert.equal(component.system.quantity,1);
});

test("CRAFT-13C: dos Proyectos no pueden reservar la misma unidad de componente",async()=>{
  const actor=new StubActor("component-race");
  const materialA=lot(actor,{id:"lot-a",vi:50});
  const materialB=lot(actor,{id:"lot-b",vi:50});
  const component=actor.add(new StubItem({
    id:"unique-core",
    name:"Núcleo único",
    type:"equipment",
    system:{quantity:1,craftingReservations:{}}
  }));
  const componentRow={
    id:"unique-component",
    name:"Núcleo único",
    itemUuid:component.uuid,
    valueCopper:1000,
    quantity:1,
    separable:true,
    recoveredSeparately:false,
    countedInGenericRecovery:false
  };
  const one=project(actor,{id:"component-one",material:materialA,materialCopper:50,referenceValueCopper:100,components:[componentRow]});
  const two=project(actor,{id:"component-two",material:materialB,materialCopper:50,referenceValueCopper:100,components:[{...componentRow,id:"unique-component-2"}]});
  const resolver=resolverFor(actor);

  const first=await reserveCraftingProjectMaterials(one,{resolver});
  const second=await reserveCraftingProjectMaterials(two,{resolver});
  assert.equal(first.ok,true);
  assert.equal(second.ok,false);
  assert.equal(component.system.craftingReservations[one.uuid].quantity,1);
  assert.equal(component.system.craftingReservations[two.uuid],undefined);
});

test("CRAFT-13C: componente separado sin Item físico bloquea el compromiso",async()=>{
  const actor=new StubActor("component-missing");
  const material=lot(actor,{vi:50});
  const craft=project(actor,{
    material,
    materialCopper:50,
    referenceValueCopper:100,
    components:[{
      id:"missing",
      name:"Componente inexistente",
      itemUuid:"",
      valueCopper:100,
      quantity:1,
      separable:true,
      recoveredSeparately:false,
      countedInGenericRecovery:false
    }]
  });
  const result=await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  assert.equal(result.ok,false);
  assert.match(result.error,/Item físico/);
  assert.deepEqual(material.system.craftingLot.reservations,{});
});

test("CRAFT-13D: ascenso Común -> Superior consume sólo +25% VR y puede ocupar la CapM generada",async()=>{
  const actor=new StubActor("quality-upgrade");
  const target=manufacturedItem(actor,{id:"sword-quality",name:"Espada",referenceValueCopper:100,baseTimeMinutes:120});
  const material=lot(actor,{id:"ordinary-upgrade",vi:100});
  const craft=project(actor,{
    id:"quality-project",
    operation:"modify",
    material,
    materialCopper:25,
    estimatedMaterialsCopper:25,
    referenceValueCopper:100,
    quality:"superior",
    modifications:[{id:"maintain",key:"maintainable",choice:"",scope:"",part:""}],
    enhancement:{mode:"quality",replaceMaterialId:"",fineMachiningMaterialId:""},
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:60,
    requiredMinutes:60,
    requiredRank:3,
    requiredInstallation:"professional",
    availableInstallation:"professional"
  });
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,60,{expectedRevision:1});
  const completed=await completeCraftingProject(craft,{expectedRevision:2,resolver});
  assert.equal(completed.ok,true);
  assert.equal(target.system.quality,"superior");
  assert.equal(target.system.priceCopper,150);
  assert.equal(target.system.manufacture.capMUsed,1);
  assert.equal(target.system.manufacture.effects.repairTimeMultiplier,0.5);
  assert.equal(material.system.craftingLot.inputValueCopper,75);
});

test("CRAFT-13D: modificación posterior usa CapM libre, cobra por punto y no reaplica estadísticas",async()=>{
  const actor=new StubActor("post-mod");
  const target=manufacturedItem(actor,{
    id:"exceptional-sword",
    name:"Espada excepcional",
    quality:"exceptional",
    referenceValueCopper:100,
    baseTimeMinutes:120
  });
  const material=lot(actor,{id:"mod-material",vi:100});
  const craft=project(actor,{
    id:"mod-project",
    operation:"modify",
    material,
    materialCopper:20,
    estimatedMaterialsCopper:20,
    referenceValueCopper:100,
    quality:"exceptional",
    modifications:[{id:"strike",key:"optimizedStrike",choice:"",scope:"",part:"metal"}],
    enhancement:{mode:"modification",replaceMaterialId:"",fineMachiningMaterialId:""},
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:60,
    requiredMinutes:60,
    requiredRank:4,
    requiredInstallation:"specialized",
    availableInstallation:"specialized"
  });
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,60,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  assert.equal(target.system.damage,6);
  assert.equal(target.system.manufacture.capMUsed,2);
  assert.equal(target.system.priceCopper,250);

  const duplicate=project(actor,{
    id:"duplicate-mod-project",
    operation:"modify",
    material:lot(actor,{id:"dup-material",vi:100}),
    materialCopper:20,
    estimatedMaterialsCopper:20,
    referenceValueCopper:100,
    quality:"exceptional",
    modifications:[{id:"strike-again",key:"optimizedStrike",choice:"",scope:"",part:"metal"}],
    enhancement:{mode:"modification",replaceMaterialId:"",fineMachiningMaterialId:""},
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:60,
    requiredMinutes:60,
    requiredRank:4,
    requiredInstallation:"specialized",
    availableInstallation:"specialized"
  });
  const rejected=await reserveCraftingProjectMaterials(duplicate,{resolver:resolverFor(actor)});
  assert.equal(rejected.ok,false);
  assert.match(rejected.error,/dos veces/);
  assert.equal(target.system.damage,6);
});

test("CRAFT-13D: Mecanizado fino sólo descuenta una modificación declarada sobre la parte metálica",async()=>{
  const actor=new StubActor("fine-machining");
  const precision={
    id:"precision",
    name:"Aleación de precisión",
    profileKey:"kharumPrecisionAlloy",
    grade:"rare",
    coverage:"major",
    part:"mecanismo metálico",
    supplementCopper:25,
    sourceItemUuid:""
  };
  const target=manufacturedItem(actor,{
    id:"precision-weapon",
    name:"Arma de precisión",
    quality:"exceptional",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    specialMaterials:[precision]
  });
  const material=lot(actor,{id:"fine-mod-material",vi:100});
  const craft=project(actor,{
    id:"fine-project",
    operation:"modify",
    material,
    materialCopper:10,
    estimatedMaterialsCopper:10,
    referenceValueCopper:100,
    quality:"exceptional",
    workMaterialGrade:"rare",
    modifications:[{id:"fine-strike",key:"optimizedStrike",choice:"",scope:"",part:"metal"}],
    enhancement:{mode:"modification",replaceMaterialId:"",fineMachiningMaterialId:"precision"},
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:60,
    requiredMinutes:60,
    requiredRank:5,
    requiredInstallation:"exceptional",
    availableInstallation:"exceptional"
  });
  const resolver=resolverFor(actor);
  const reserved=await reserveCraftingProjectMaterials(craft,{resolver});
  assert.equal(reserved.ok,true);
  assert.equal(reserved.materialCopper,10);
});

test("CRAFT-13D: incorporar Material Especial exige Lote preparado del mismo Perfil y paga sólo su SM",async()=>{
  const actor=new StubActor("material-install");
  const target=manufacturedItem(actor,{id:"material-target",name:"Mecanismo",type:"equipment",referenceValueCopper:100,baseTimeMinutes:120,system:{category:"Herramienta de precisión"}});
  const specialLot=lot(actor,{
    id:"precision-lot",
    vi:50,
    compatibility:["material:kharumPrecisionAlloy"],
    materialProfileKey:"kharumPrecisionAlloy",
    preparation:"prepared"
  });
  const row={
    id:"precision-installed",
    name:"Aleación de precisión de Kharum",
    profileKey:"kharumPrecisionAlloy",
    grade:"rare",
    coverage:"major",
    part:"mecanismo metálico",
    supplementCopper:25,
    sourceItemUuid:specialLot.uuid
  };
  const craft=project(actor,{
    id:"material-project",
    operation:"modify",
    material:specialLot,
    materialCopper:25,
    estimatedMaterialsCopper:25,
    allocationCompatibility:"material:kharumPrecisionAlloy",
    referenceValueCopper:100,
    quality:"common",
    workMaterialGrade:"rare",
    specialMaterials:[row],
    enhancement:{mode:"material",replaceMaterialId:"",fineMachiningMaterialId:""},
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:60,
    requiredMinutes:60,
    requiredRank:3,
    requiredInstallation:"professional",
    availableInstallation:"professional"
  });
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,60,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  assert.equal(specialLot.system.craftingLot.inputValueCopper,25);
  assert.equal(target.system.manufacture.specialMaterials.length,1);
  assert.equal(target.system.manufacture.specialMaterials[0].profileKey,"kharumPrecisionAlloy");
  assert.equal(target.system.priceCopper,150);
});

test("CRAFT-13D: Lote bruto no puede integrarse como Material Especial preparado",async()=>{
  const actor=new StubActor("raw-material");
  const target=manufacturedItem(actor,{id:"raw-target",type:"equipment",referenceValueCopper:100,baseTimeMinutes:120,system:{category:"Herramienta"}});
  const raw=lot(actor,{
    id:"raw-lot",
    vi:50,
    compatibility:["material:kharumPrecisionAlloy"],
    materialProfileKey:"kharumPrecisionAlloy",
    preparation:"raw"
  });
  const craft=project(actor,{
    id:"raw-project",
    operation:"modify",
    material:raw,
    materialCopper:25,
    estimatedMaterialsCopper:25,
    allocationCompatibility:"material:kharumPrecisionAlloy",
    referenceValueCopper:100,
    quality:"common",
    workMaterialGrade:"rare",
    specialMaterials:[{
      id:"raw-part",name:"Aleación",profileKey:"kharumPrecisionAlloy",grade:"rare",coverage:"major",part:"mecanismo metálico",
      supplementCopper:25,sourceItemUuid:raw.uuid
    }],
    enhancement:{mode:"material",replaceMaterialId:"",fineMachiningMaterialId:""},
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:60,
    requiredMinutes:60,
    requiredRank:3,
    requiredInstallation:"professional",
    availableInstallation:"professional"
  });
  const rejected=await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  assert.equal(rejected.ok,false);
  assert.match(rejected.error,/Preparado/);
  assert.equal(raw.system.craftingLot.inputValueCopper,50);
});

test("CRAFT-13D: cambiar Material Dominante sigue bloqueado como modificación menor",async()=>{
  const actor=new StubActor("dominant-change");
  const target=manufacturedItem(actor,{
    id:"dominant-target",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    specialMaterials:[{
      id:"steel",name:"Acero de Kharum",profileKey:"kharumSteel",grade:"specialized",coverage:"dominant",supplementCopper:25,sourceItemUuid:""
    }]
  });
  const replacement=lot(actor,{
    id:"replacement-dominant",
    vi:100,
    compatibility:["material:custom-dominant"],
    materialProfileKey:"custom-dominant"
  });
  const craft=project(actor,{
    id:"dominant-project",
    operation:"modify",
    material:replacement,
    materialCopper:25,
    estimatedMaterialsCopper:25,
    allocationCompatibility:"material:custom-dominant",
    referenceValueCopper:100,
    quality:"common",
    workMaterialGrade:"specialized",
    specialMaterials:[{
      id:"new-dominant",name:"Otro material",profileKey:"custom-dominant",grade:"specialized",coverage:"dominant",supplementCopper:25,sourceItemUuid:replacement.uuid
    }],
    enhancement:{mode:"material",replaceMaterialId:"steel",fineMachiningMaterialId:""},
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:60,
    requiredMinutes:60,
    requiredRank:2,
    requiredInstallation:"adequate",
    availableInstallation:"adequate"
  });
  const rejected=await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  assert.equal(rejected.ok,false);
  assert.match(rejected.error,/Dominante/);
});

test("CRAFT-13D: fabricación inicial aplica Calidad + Material + CapM una sola vez",async()=>{
  const actor=new StubActor("compound-fabrication");
  const specialLot=lot(actor,{
    id:"steel-lot",
    vi:200,
    compatibility:["forja","material:kharumSteel"],
    materialProfileKey:"kharumSteel",
    preparation:"prepared"
  });
  const craft=project(actor,{
    id:"compound-project",
    operation:"fabricate",
    material:specialLot,
    materialCopper:150,
    estimatedMaterialsCopper:150,
    allocationCompatibility:"material:kharumSteel",
    referenceValueCopper:100,
    quality:"exceptional",
    workMaterialGrade:"specialized",
    specialMaterials:[{
      id:"steel",name:"Acero de Kharum",profileKey:"kharumSteel",grade:"specialized",coverage:"dominant",
      supplementCopper:25,sourceItemUuid:specialLot.uuid
    }],
    modifications:[{id:"strike",key:"optimizedStrike",choice:"",scope:"",part:"metal"}],
    resultData:{
      name:"Espada compuesta",
      type:"weapon",
      system:{damage:5,penetration:0,strengthMin:1,reload:0,skill:"martialWeapons",properties:"Versátil",quantity:1}
    },
    baseMinutes:120,
    adjustedBaseMinutes:240,
    requiredMinutes:240,
    requiredRank:4,
    requiredInstallation:"specialized",
    availableInstallation:"specialized"
  });
  // La misma asignación debe declarar todas las compatibilidades usadas por el Lote.
  craft.system.ledger.entries[0].compatibility="material:kharumSteel";
  specialLot.system.craftingLot.compatibility=["material:kharumSteel"];
  const resolver=resolverFor(actor);
  const reserved=await reserveCraftingProjectMaterials(craft,{resolver});
  assert.equal(reserved.ok,true);
  await advanceCraftingProjectWork(craft,240,{expectedRevision:1});
  const completed=await completeCraftingProject(craft,{expectedRevision:2,resolver});
  assert.equal(completed.ok,true);
  const output=[...actor.items.values()].find((item)=>item.name==="Espada compuesta");
  assert.ok(output);
  assert.equal(output.system.damage,6);
  assert.equal(output.system.quality,"exceptional");
  assert.equal(output.system.priceCopper,300);
  assert.equal(output.system.manufacture.capMUsed,2);
  assert.deepEqual(output.system.manufacture.effects.materialProperties,["kharum-tenacity"]);
});

test("CRAFT-13D: desmantelar separa VI ordinario de VI especial y no recicla VRQ",async()=>{
  const actor=new StubActor("special-salvage");
  const target=manufacturedItem(actor,{
    id:"special-sword",
    name:"Espada especial",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"exceptional",
    specialMaterials:[{
      id:"steel",name:"Acero de Kharum",profileKey:"kharumSteel",grade:"specialized",coverage:"dominant",supplementCopper:25,sourceItemUuid:""
    }]
  });
  const craft=project(actor,{
    id:"special-salvage-project",
    operation:"dismantle",
    material:null,
    materialCopper:0,
    estimatedMaterialsCopper:0,
    referenceValueCopper:100,
    targetItemUuid:target.uuid,
    requiredMinutes:30,
    baseMinutes:120,
    adjustedBaseMinutes:30,
    timeMode:"fixed",
    requiredRank:2,
    requiredInstallation:"adequate",
    availableInstallation:"adequate"
  });
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,30,{expectedRevision:1});
  const completed=await completeCraftingProject(craft,{expectedRevision:2,resolver});
  assert.equal(completed.ok,true);
  assert.equal(completed.recoveredMaterialsCopper,37);
  const lots=[...actor.items.values()].filter((item)=>item.system?.craftingLot?.enabled);
  const ordinary=lots.find((item)=>!item.system.craftingLot.materialProfileKey);
  const special=lots.find((item)=>item.system.craftingLot.materialProfileKey==="kharumSteel");
  assert.equal(ordinary.system.craftingLot.inputValueCopper,25);
  assert.equal(special.system.craftingLot.inputValueCopper,12);
  assert.equal(special.system.craftingLot.compatibility[0],"material:kharumSteel");
});

test("CRAFT-13D: Mantenible reduce a la mitad el tiempo de reparación sin abaratar BRA",async()=>{
  const actor=new StubActor("maintainable-repair");
  const target=manufacturedItem(actor,{
    id:"maintainable-target",
    name:"Arma mantenible",
    referenceValueCopper:100,
    baseTimeMinutes:480,
    quality:"superior",
    modifications:[{key:"maintainable"}]
  });
  target.system.condition="damaged";
  const material=lot(actor,{id:"repair-material",vi:100});
  const craft=project(actor,{
    id:"repair-maintainable-project",
    operation:"repair",
    material,
    materialCopper:15,
    estimatedMaterialsCopper:15,
    referenceValueCopper:100,
    quality:"superior",
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:480,
    adjustedBaseMinutes:180,
    requiredMinutes:90,
    requiredRank:3,
    requiredInstallation:"professional",
    availableInstallation:"professional"
  });
  craft.system.economy.affectedValueCopper=150;
  const resolver=resolverFor(actor);
  const reserved=await reserveCraftingProjectMaterials(craft,{resolver});
  assert.equal(reserved.ok,true);
  await advanceCraftingProjectWork(craft,90,{expectedRevision:1});
  const completed=await completeCraftingProject(craft,{expectedRevision:2,resolver});
  assert.equal(completed.ok,true);
  assert.equal(target.system.condition,"operative");
  assert.equal(material.system.craftingLot.inputValueCopper,85);
});

test("CRAFT-13D: si el estado cambia tras reservar, la reparación no usa el coste antiguo",async()=>{
  const actor=new StubActor("repair-revalidate");
  const target=manufacturedItem(actor,{
    id:"repair-revalidate-target",
    referenceValueCopper:100,
    baseTimeMinutes:480,
    quality:"superior"
  });
  target.system.condition="damaged";
  const material=lot(actor,{id:"repair-revalidate-material",vi:100});
  const craft=project(actor,{
    id:"repair-revalidate-project",
    operation:"repair",
    material,
    materialCopper:15,
    estimatedMaterialsCopper:15,
    referenceValueCopper:100,
    quality:"superior",
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:480,
    adjustedBaseMinutes:180,
    requiredMinutes:180,
    requiredRank:3,
    requiredInstallation:"professional",
    availableInstallation:"professional"
  });
  craft.system.economy.affectedValueCopper=150;
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,180,{expectedRevision:1});
  target.system.condition="disabled";
  const rejected=await completeCraftingProject(craft,{expectedRevision:2,resolver});
  assert.equal(rejected.ok,false);
  assert.match(rejected.error,/(coste canónico cambió|tiempo base de reparación)/);
  assert.equal(material.system.craftingLot.inputValueCopper,100);
  assert.equal(material.system.craftingLot.reservations[craft.uuid].amountCopper,15);
});

test("CRAFT-13D: sustituir una Modificación libera su CapM antes de validar la nueva",async()=>{
  const actor=new StubActor("replace-modification");
  const target=manufacturedItem(actor,{
    id:"replace-mod-target",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"exceptional",
    modifications:[{key:"maintainable"}]
  });
  const material=lot(actor,{id:"replace-mod-material",vi:100});
  const craft=project(actor,{
    id:"replace-mod-project",
    operation:"modify",
    material,
    materialCopper:20,
    estimatedMaterialsCopper:20,
    referenceValueCopper:100,
    quality:"exceptional",
    modifications:[{id:"strike",key:"optimizedStrike",choice:"",scope:"",part:"metal"}],
    enhancement:{
      mode:"modification",
      replaceMaterialId:"",
      replaceModificationKey:"maintainable",
      fineMachiningMaterialId:""
    },
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:60,
    requiredMinutes:60,
    requiredRank:4,
    requiredInstallation:"specialized",
    availableInstallation:"specialized"
  });
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,60,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  assert.equal(target.system.damage,6);
  assert.equal(target.system.manufacture.capMUsed,2);
  assert.equal(target.system.manufacture.modifications.some((row)=>row.key==="maintainable"),false);
  assert.equal(target.system.manufacture.effects.repairTimeMultiplier,1);
});

test("CRAFT-13D: retirar una Modificación sin reemplazo libera CapM, cuesta 0 VI y 10% del tiempo base",async()=>{
  const actor=new StubActor("remove-modification");
  const target=manufacturedItem(actor,{
    id:"remove-mod-target",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"superior",
    modifications:[{key:"maintainable"}]
  });
  const craft=project(actor,{
    id:"remove-mod-project",
    operation:"modify",
    material:null,
    materialCopper:0,
    estimatedMaterialsCopper:0,
    referenceValueCopper:100,
    quality:"superior",
    modifications:[],
    enhancement:{
      mode:"modification",
      replaceMaterialId:"",
      replaceModificationKey:"maintainable",
      fineMachiningMaterialId:""
    },
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:30,
    requiredMinutes:30,
    requiredRank:3,
    requiredInstallation:"professional",
    availableInstallation:"professional"
  });
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,30,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  assert.equal(target.system.manufacture.capMUsed,0);
  assert.equal(target.system.manufacture.modifications.length,0);
  assert.equal(target.system.manufacture.effects.repairTimeMultiplier,1);
});

test("CRAFT-13D: BRA especial incluye sólo la capa material realmente afectada",async()=>{
  const actor=new StubActor("repair-special-layer");
  const target=manufacturedItem(actor,{
    id:"repair-special-target",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"common",
    specialMaterials:[{
      id:"steel",
      name:"Acero de Kharum",
      profileKey:"kharumSteel",
      grade:"specialized",
      coverage:"dominant",
      supplementCopper:25,
      sourceItemUuid:""
    }]
  });
  target.system.condition="damaged";
  const material=lot(actor,{id:"ordinary-repair",vi:50});
  const craft=project(actor,{
    id:"repair-special-project",
    operation:"repair",
    material,
    materialCopper:15,
    estimatedMaterialsCopper:15,
    referenceValueCopper:100,
    quality:"common",
    workMaterialGrade:"specialized",
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:30,
    requiredMinutes:30,
    requiredRank:2,
    requiredInstallation:"adequate",
    availableInstallation:"adequate",
    repair:{
      affectedMaterialIds:["steel"],
      ordinaryReplacementMaterialIds:[],
      specialReplacements:[]
    }
  });
  craft.system.economy.affectedValueCopper=150;
  const resolver=resolverFor(actor);
  const reserved=await reserveCraftingProjectMaterials(craft,{resolver});
  assert.equal(reserved.ok,true);
  await advanceCraftingProjectWork(craft,30,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  assert.equal(target.system.condition,"operative");
  assert.equal(target.system.priceCopper,150);
  assert.equal(target.system.manufacture.specialMaterials.length,1);
  assert.deepEqual(target.system.manufacture.effects.materialProperties,["kharum-tenacity"]);
});

test("CRAFT-13D: reemplazar con material ordinario repara pero elimina la propiedad especial y recalcula VRT",async()=>{
  const actor=new StubActor("repair-ordinary-replacement");
  const target=manufacturedItem(actor,{
    id:"repair-ordinary-target",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"common",
    specialMaterials:[{
      id:"steel",
      name:"Acero de Kharum",
      profileKey:"kharumSteel",
      grade:"specialized",
      coverage:"dominant",
      supplementCopper:25,
      sourceItemUuid:""
    }]
  });
  target.system.condition="damaged";
  const material=lot(actor,{id:"ordinary-replacement-lot",vi:50});
  const craft=project(actor,{
    id:"repair-ordinary-project",
    operation:"repair",
    material,
    materialCopper:15,
    estimatedMaterialsCopper:15,
    referenceValueCopper:100,
    quality:"common",
    workMaterialGrade:"ordinary",
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:30,
    requiredMinutes:30,
    requiredRank:2,
    requiredInstallation:"adequate",
    availableInstallation:"adequate",
    repair:{
      affectedMaterialIds:["steel"],
      ordinaryReplacementMaterialIds:["steel"],
      specialReplacements:[]
    }
  });
  craft.system.economy.affectedValueCopper=150;
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,30,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  assert.equal(target.system.condition,"operative");
  assert.equal(target.system.priceCopper,100);
  assert.equal(target.system.manufacture.specialMaterials.length,0);
  assert.deepEqual(target.system.manufacture.effects.materialProperties,[]);
});

test("CRAFT-13D: preservar una parte especial reemplazada exige Lote preparado del mismo Perfil",async()=>{
  const actor=new StubActor("repair-special-replacement");
  const target=manufacturedItem(actor,{
    id:"repair-replacement-target",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"common",
    specialMaterials:[{
      id:"steel",
      name:"Acero de Kharum",
      profileKey:"kharumSteel",
      grade:"specialized",
      coverage:"dominant",
      supplementCopper:25,
      sourceItemUuid:""
    }]
  });
  target.system.condition="damaged";
  const specialLot=lot(actor,{
    id:"repair-steel-lot",
    vi:30,
    compatibility:["material:kharumSteel"],
    materialProfileKey:"kharumSteel",
    preparation:"prepared"
  });
  const craft=project(actor,{
    id:"repair-special-replacement-project",
    operation:"repair",
    material:specialLot,
    materialCopper:15,
    estimatedMaterialsCopper:15,
    allocationCompatibility:"material:kharumSteel",
    referenceValueCopper:100,
    quality:"common",
    workMaterialGrade:"specialized",
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:30,
    requiredMinutes:30,
    requiredRank:2,
    requiredInstallation:"adequate",
    availableInstallation:"adequate",
    repair:{
      affectedMaterialIds:["steel"],
      ordinaryReplacementMaterialIds:[],
      specialReplacements:[{id:"replacement",materialId:"steel",sourceItemUuid:specialLot.uuid}]
    }
  });
  craft.system.economy.affectedValueCopper=150;
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,30,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  assert.equal(target.system.manufacture.specialMaterials[0].profileKey,"kharumSteel");
  assert.equal(target.system.manufacture.specialMaterials[0].sourceItemUuid,specialLot.uuid);
  assert.equal(specialLot.system.craftingLot.inputValueCopper,15);
});

test("CRAFT-13D: no puede inflarse BRA con una capa especial que no fue afectada",async()=>{
  const actor=new StubActor("repair-bra-exploit");
  const target=manufacturedItem(actor,{
    id:"repair-bra-target",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"common",
    specialMaterials:[{
      id:"steel",
      name:"Acero de Kharum",
      profileKey:"kharumSteel",
      grade:"specialized",
      coverage:"dominant",
      supplementCopper:25,
      sourceItemUuid:""
    }]
  });
  target.system.condition="damaged";
  const material=lot(actor,{id:"repair-bra-lot",vi:50});
  const craft=project(actor,{
    id:"repair-bra-project",
    operation:"repair",
    material,
    materialCopper:15,
    estimatedMaterialsCopper:15,
    referenceValueCopper:100,
    quality:"common",
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:30,
    requiredMinutes:30,
    requiredRank:2,
    requiredInstallation:"adequate",
    availableInstallation:"adequate",
    repair:{affectedMaterialIds:[],ordinaryReplacementMaterialIds:[],specialReplacements:[]}
  });
  craft.system.economy.affectedValueCopper=150;
  const rejected=await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  assert.equal(rejected.ok,false);
  assert.ok(rejected.issues?.some((issue)=>issue.code==="repair-bra"));
  assert.equal(material.system.craftingLot.inputValueCopper,50);
});

test("CRAFT-13D: Defectuosa no puede usarse como fabricación barata",async()=>{
  const actor=new StubActor("defective-fabrication");
  const material=lot(actor,{id:"defective-lot",vi:100});
  const craft=project(actor,{
    id:"defective-project",
    operation:"fabricate",
    material,
    materialCopper:25,
    estimatedMaterialsCopper:25,
    referenceValueCopper:100,
    quality:"defective",
    resultData:{
      name:"Objeto defectuoso forzado",
      type:"equipment",
      system:{category:"Herramienta",quantity:1,properties:""}
    }
  });
  const rejected=await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  assert.equal(rejected.ok,false);
  assert.equal(rejected.error,"El Proyecto contiene incidencias estructurales.");
  assert.ok(rejected.issues.some((issue)=>issue.code==="quality"));
  assert.equal(material.system.craftingLot.inputValueCopper,100);
});



test("CRAFT-13E: Matriz Rúnica reserva VI compatible y persiste CRu sin tocar CapM",async()=>{
  const actor=new StubActor("runic-matrix");
  actor.system.skills.arcana={rank:3};
  const target=manufacturedItem(actor,{
    id:"runic-host",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"superior"
  });
  const material=lot(actor,{id:"matrix-lot",vi:100,compatibility:["runic-matrix"]});
  const craft=project(actor,{
    id:"matrix-project",
    operation:"modify",
    material,
    materialCopper:50,
    estimatedMaterialsCopper:50,
    allocationCompatibility:"runic-matrix",
    referenceValueCopper:100,
    quality:"superior",
    enhancement:{
      mode:"runicMatrix",
      runicCapacityTarget:1,
      runicChannelTypes:["socket"]
    },
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:120,
    requiredMinutes:120,
    requiredRank:3,
    professionalSkill:"crafting",
    requiredInstallation:"professional",
    availableInstallation:"professional"
  });
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,120,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  assert.equal(target.system.runic.capacityPrepared,1);
  assert.equal(target.system.runic.channels[0].type,"socket");
  assert.equal(target.system.manufacture.capMUsed,0);
  assert.equal(target.system.priceCopper,250);
});

test("CRAFT-13E: Runa inscrita exige VI compatible y ocupa Canal de Inscripción",async()=>{
  const actor=new StubActor("rune-inscription");
  actor.system.skills.ritualism={rank:3};
  actor.system.skills.arcana={rank:2};
  const target=manufacturedItem(actor,{
    id:"rune-host",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"superior"
  });
  target.system.runic={
    capacityPrepared:1,
    matrixMaterialCopper:50,
    addedValueCopper:100,
    channels:[{id:"cru-1",type:"inscription"}],
    imprints:[]
  };
  target.system.priceCopper+=100;
  const material=lot(actor,{id:"rune-lot",vi:150,compatibility:["imprint:arcaneEdgeI"]});
  const craft=project(actor,{
    id:"rune-project",
    operation:"modify",
    material,
    materialCopper:100,
    estimatedMaterialsCopper:100,
    allocationCompatibility:"imprint:arcaneEdgeI",
    referenceValueCopper:100,
    quality:"superior",
    enhancement:{
      mode:"rune",
      imprintKey:"arcaneEdgeI",
      imprintMode:"inscribed",
      imprintChannelIds:["cru-1"]
    },
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:240,
    requiredMinutes:240,
    requiredRank:3,
    professionalSkill:"ritualism",
    requiredInstallation:"professional",
    availableInstallation:"professional"
  });
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,240,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  assert.equal(target.system.runic.imprints.length,1);
  assert.equal(target.system.runic.imprints[0].key,"arcaneEdgeI");
  assert.equal(target.system.runic.addedValueCopper,300);
  assert.equal(target.system.priceCopper,450);
});

test("CRAFT-13E: Encantamiento I nace con RE 0 y paga CE compatible",async()=>{
  const actor=new StubActor("enchantment-one");
  actor.system.skills.ritualism={rank:4};
  actor.system.skills.arcana={rank:3};
  const target=manufacturedItem(actor,{
    id:"enchanted-host",
    type:"equipment",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"superior",
    system:{category:"Accesorio"}
  });
  const spell=actor.add(new StubItem({
    id:"barrier-spell",
    name:"Barrera Cinética",
    type:"spell",
    system:{slug:"barrera-cinetica",method:"direct",grade:"basic",manaCost:3,activation:"Reacción",sustained:false,difficulty:12}
  }));
  const material=lot(actor,{id:"enchant-lot",vi:600,compatibility:["enchantment:1"]});
  const craft=project(actor,{
    id:"enchant-project",
    operation:"modify",
    material,
    materialCopper:500,
    estimatedMaterialsCopper:500,
    allocationCompatibility:"enchantment:1",
    referenceValueCopper:100,
    quality:"superior",
    enhancement:{
      mode:"enchantment",
      enchantmentGrade:1,
      enchantmentPatternKey:"barrier-pattern",
      enchantmentFunctionalKey:"barrier-defense",
      boundSpell:{sourceUuid:spell.uuid}
    },
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:1440,
    requiredMinutes:1440,
    requiredRank:4,
    professionalSkill:"ritualism",
    requiredInstallation:"specialized",
    availableInstallation:"specialized"
  });
  const resolver=resolverFor(actor);
  const reserved=await reserveCraftingProjectMaterials(craft,{resolver});
  assert.equal(reserved.ok,true);
  await advanceCraftingProjectWork(craft,1440,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  assert.equal(target.system.enchantment.grade,1);
  assert.equal(target.system.enchantment.reserve.value,0);
  assert.equal(target.system.enchantment.reserve.max,6);
  assert.equal(target.system.enchantment.attunedActorUuid,"");
  assert.equal(target.system.priceCopper,1150);
});

test("CRAFT-13E: Encantamiento III no acepta CE compuesto sólo por Lotes ordinarios",async()=>{
  const actor=new StubActor("enchantment-three-grade");
  actor.system.skills.ritualism={rank:5};
  actor.system.skills.arcana={rank:4};
  const target=manufacturedItem(actor,{
    id:"enchant-three-host",
    type:"equipment",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"exceptional",
    system:{category:"Soporte apropiado"}
  });
  const spell=actor.add(new StubItem({
    id:"rupture-spell",
    name:"Rayo de Ruptura",
    type:"spell",
    system:{slug:"rayo-de-ruptura",method:"direct",grade:"master",manaCost:10,activation:"Acción",sustained:false,damage:8,penetration:4}
  }));
  const material=lot(actor,{
    id:"ordinary-enchant-lot",
    vi:5000,
    compatibility:["enchantment:3"],
    resourceGrade:"ordinary"
  });
  const craft=project(actor,{
    id:"enchant-three-project",
    operation:"modify",
    material,
    materialCopper:4000,
    estimatedMaterialsCopper:4000,
    allocationCompatibility:"enchantment:3",
    referenceValueCopper:100,
    quality:"exceptional",
    enhancement:{
      mode:"enchantment",
      enchantmentGrade:3,
      enchantmentPatternKey:"rupture-pattern",
      enchantmentFunctionalKey:"rupture-ray",
      enchantmentSupportAppropriate:true,
      enchantmentHasRareComponent:true,
      boundSpell:{sourceUuid:spell.uuid}
    },
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:9600,
    requiredMinutes:9600,
    requiredRank:5,
    professionalSkill:"ritualism",
    requiredInstallation:"exceptional",
    availableInstallation:"exceptional"
  });
  const rejected=await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  assert.equal(rejected.ok,false);
  assert.match(rejected.error,/Raro o Excepcional/);
});

test("CRAFT-13E: Fabricar rechaza CRu o Encantamiento preinstalados sin Proyecto propio",async()=>{
  const actor=new StubActor("magic-free-bypass");
  const material=lot(actor,{id:"free-magic-lot",vi:100});
  const runic=project(actor,{
    id:"free-runic-project",
    operation:"fabricate",
    material,
    materialCopper:50,
    estimatedMaterialsCopper:50,
    referenceValueCopper:100,
    resultData:{
      name:"Arma con CRu gratis",
      type:"weapon",
      system:{
        damage:5,penetration:0,strengthMin:1,reload:0,skill:"martialWeapons",properties:"",
        runic:{capacityPrepared:1,channels:[{id:"x",type:"socket"}],imprints:[]}
      }
    },
    baseMinutes:120,
    adjustedBaseMinutes:120,
    requiredMinutes:120
  });
  let rejected=await reserveCraftingProjectMaterials(runic,{resolver:resolverFor(actor)});
  assert.equal(rejected.ok,false);
  assert.match(rejected.error,/CRu o Improntas preinstaladas/);

  const enchant=project(actor,{
    id:"free-enchant-project",
    operation:"fabricate",
    material,
    materialCopper:50,
    estimatedMaterialsCopper:50,
    referenceValueCopper:100,
    resultData:{
      name:"Objeto encantado gratis",
      type:"equipment",
      system:{
        category:"General",
        enchantment:{grade:1,patternKey:"x",functionalKey:"x",reserve:{value:6,max:6}}
      }
    },
    baseMinutes:120,
    adjustedBaseMinutes:120,
    requiredMinutes:120
  });
  rejected=await reserveCraftingProjectMaterials(enchant,{resolver:resolverFor(actor)});
  assert.equal(rejected.ok,false);
  assert.match(rejected.error,/Encantamientos preinstalados/);
});


test("CRAFT-13E: reparación física no cobra Encantamiento si su matriz no fue afectada",async()=>{
  const actor=new StubActor("repair-enchant-physical");
  const target=manufacturedItem(actor,{
    id:"enchanted-repair-target",
    type:"equipment",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"common",
    system:{category:"General"}
  });
  target.system.enchantment={
    grade:1,
    patternKey:"barrier",
    functionalKey:"barrier-defense",
    materialCostCopper:500,
    timeMinutes:1440,
    addedValueCopper:1000,
    reserve:{value:0,max:6},
    attunedActorUuid:"",
    seal:false,
    boundSpell:{slug:"barrera-cinetica",method:"direct",grade:"basic",manaCost:3}
  };
  target.system.priceCopper=1100;
  target.system.condition="damaged";
  const material=lot(actor,{id:"physical-repair-lot",vi:50,compatibility:["forja"]});
  const craft=project(actor,{
    id:"physical-repair-project",
    operation:"repair",
    material,
    materialCopper:10,
    estimatedMaterialsCopper:10,
    allocationCompatibility:"forja",
    referenceValueCopper:100,
    quality:"common",
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:30,
    requiredMinutes:30,
    requiredRank:2,
    professionalSkill:"crafting",
    requiredInstallation:"adequate",
    availableInstallation:"adequate",
    repair:{
      affectedMaterialIds:[],
      ordinaryReplacementMaterialIds:[],
      specialReplacements:[],
      runicMatrixAffected:false,
      enchantmentMatrixAffected:false
    }
  });
  craft.system.economy.affectedValueCopper=100;
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,30,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  assert.equal(target.system.enchantment.grade,1);
  assert.equal(target.system.priceCopper,1100);
});

test("CRAFT-13E: reparar matriz de Encantamiento usa VRF afectado y requisitos del Grado",async()=>{
  const actor=new StubActor("repair-enchant-matrix");
  actor.system.skills.ritualism={rank:4};
  actor.system.skills.arcana={rank:3};
  const target=manufacturedItem(actor,{
    id:"enchant-matrix-target",
    type:"equipment",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"superior",
    system:{category:"General"}
  });
  target.system.enchantment={
    grade:1,
    patternKey:"barrier",
    functionalKey:"barrier-defense",
    materialCostCopper:500,
    timeMinutes:1440,
    addedValueCopper:1000,
    reserve:{value:0,max:6},
    attunedActorUuid:"",
    seal:false,
    boundSpell:{slug:"barrera-cinetica",method:"direct",grade:"basic",manaCost:3}
  };
  target.system.priceCopper=1150;
  target.system.condition="damaged";
  const material=lot(actor,{id:"enchant-repair-lot",vi:200,compatibility:["enchantment:1"]});
  const craft=project(actor,{
    id:"enchant-repair-project",
    operation:"repair",
    material,
    materialCopper:115,
    estimatedMaterialsCopper:115,
    allocationCompatibility:"enchantment:1",
    referenceValueCopper:100,
    quality:"superior",
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:45,
    requiredMinutes:45,
    requiredRank:4,
    professionalSkill:"ritualism",
    requiredInstallation:"specialized",
    availableInstallation:"specialized",
    repair:{
      affectedMaterialIds:[],
      ordinaryReplacementMaterialIds:[],
      specialReplacements:[],
      runicMatrixAffected:false,
      enchantmentMatrixAffected:true
    }
  });
  craft.system.economy.affectedValueCopper=1150;
  const resolver=resolverFor(actor);
  const reserved=await reserveCraftingProjectMaterials(craft,{resolver});
  assert.equal(reserved.ok,true);
  await advanceCraftingProjectWork(craft,45,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  assert.equal(target.system.condition,"operative");
});

test("CRAFT-13E: no puede inflarse BRA con valor encantado si la matriz no fue afectada",async()=>{
  const actor=new StubActor("repair-enchant-bra-exploit");
  const target=manufacturedItem(actor,{
    id:"enchant-bra-target",
    type:"equipment",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"common",
    system:{category:"General"}
  });
  target.system.enchantment={
    grade:1,
    patternKey:"barrier",
    functionalKey:"barrier-defense",
    materialCostCopper:500,
    timeMinutes:1440,
    addedValueCopper:1000,
    reserve:{value:0,max:6},
    attunedActorUuid:"",
    seal:false
  };
  target.system.condition="damaged";
  const material=lot(actor,{id:"enchant-bra-lot",vi:200,compatibility:["forja"]});
  const craft=project(actor,{
    id:"enchant-bra-project",
    operation:"repair",
    material,
    materialCopper:110,
    estimatedMaterialsCopper:110,
    referenceValueCopper:100,
    quality:"common",
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:30,
    requiredMinutes:30,
    requiredRank:2,
    professionalSkill:"crafting",
    requiredInstallation:"adequate",
    availableInstallation:"adequate",
    repair:{
      affectedMaterialIds:[],
      ordinaryReplacementMaterialIds:[],
      specialReplacements:[],
      runicMatrixAffected:false,
      enchantmentMatrixAffected:false
    }
  });
  craft.system.economy.affectedValueCopper=1100;
  const rejected=await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  assert.equal(rejected.ok,false);
  assert.ok(rejected.issues?.some((issue)=>issue.code==="repair-bra"));
});

test("CRAFT-13E: desmantelar recupera VI integrado rúnico/encantado a tasa canónica sin devolver precisión ritual",async()=>{
  const actor=new StubActor("magic-salvage");
  const target=manufacturedItem(actor,{
    id:"magic-salvage-target",
    type:"equipment",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"common",
    system:{category:"General"}
  });
  target.system.runic={
    capacityPrepared:1,
    matrixMaterialCopper:50,
    addedValueCopper:300,
    channels:[{id:"c1",type:"inscription"}],
    imprints:[{id:"r1",key:"arcaneEdgeI",mode:"inscribed",channelIds:["c1"],stoneUuid:""}]
  };
  target.system.enchantment={
    grade:1,
    patternKey:"barrier",
    functionalKey:"barrier-defense",
    materialCostCopper:500,
    timeMinutes:1440,
    addedValueCopper:1000,
    reserve:{value:0,max:6},
    attunedActorUuid:"",
    seal:false
  };
  target.system.priceCopper=1400;
  const craft=project(actor,{
    id:"magic-salvage-project",
    operation:"dismantle",
    material:null,
    materialCopper:0,
    estimatedMaterialsCopper:0,
    referenceValueCopper:100,
    quality:"common",
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:30,
    requiredMinutes:30,
    requiredRank:2,
    requiredInstallation:"adequate",
    availableInstallation:"adequate"
  });
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,30,{expectedRevision:1});
  const completed=await completeCraftingProject(craft,{expectedRevision:2,resolver});
  assert.equal(completed.ok,true);
  assert.equal(completed.recoveredMaterialsCopper,187);
  const lots=[...actor.items.values()].filter((entry)=>entry.system?.craftingLot?.enabled);
  assert.equal(lots.find((entry)=>entry.system.craftingLot.category==="runico-recuperado").system.craftingLot.inputValueCopper,37);
  assert.equal(lots.find((entry)=>entry.system.craftingLot.category==="encantamiento-recuperado").system.craftingLot.inputValueCopper,125);
  assert.deepEqual(lots.find((entry)=>entry.system.craftingLot.category==="encantamiento-recuperado").system.craftingLot.compatibility,[]);
});

test("CRAFT-13E: una Piedra insertada debe extraerse antes de desmantelar el Host",async()=>{
  const actor=new StubActor("socket-salvage");
  const target=manufacturedItem(actor,{
    id:"socket-host",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"superior"
  });
  target.system.runic={
    capacityPrepared:1,
    matrixMaterialCopper:50,
    addedValueCopper:100,
    channels:[{id:"socket-1",type:"socket"}],
    imprints:[{id:"stone-one",key:"runicGuardI",mode:"stone",channelIds:["socket-1"],stoneUuid:"Actor.socket-salvage.Item.stone"}]
  };
  const craft=project(actor,{
    id:"socket-salvage-project",
    operation:"dismantle",
    material:null,
    materialCopper:0,
    estimatedMaterialsCopper:0,
    referenceValueCopper:100,
    quality:"superior",
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:30,
    requiredMinutes:30,
    requiredRank:3,
    requiredInstallation:"professional",
    availableInstallation:"professional"
  });
  const rejected=await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  assert.equal(rejected.ok,false);
  assert.match(rejected.error,/Piedras de Impronta deben extraerse/);
});


test("CRAFT-13E: Soporte Dedicado III no puede fabricarse con VR/tiempo triviales",async()=>{
  const actor=new StubActor("cheap-dedicated-support");
  const material=lot(actor,{id:"support-material",vi:1000});
  const craft=project(actor,{
    id:"cheap-support-project",
    operation:"fabricate",
    material,
    materialCopper:50,
    estimatedMaterialsCopper:50,
    referenceValueCopper:100,
    quality:"common",
    resultData:{
      name:"Talismán III barato",
      type:"equipment",
      system:{
        category:"Soporte mágico",
        magicSupport:{grade:3}
      }
    },
    baseMinutes:120,
    adjustedBaseMinutes:120,
    requiredMinutes:120,
    requiredRank:5,
    professionalSkill:"crafting",
    requiredInstallation:"exceptional",
    availableInstallation:"exceptional"
  });
  const rejected=await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  assert.equal(rejected.ok,false);
  assert.match(rejected.error,/VR base canónico/);
});

test("CRAFT-13E: Soporte Dedicado I usa VR 2 o, CM 1 o y una Jornada",async()=>{
  const actor=new StubActor("dedicated-support-one");
  const material=lot(actor,{id:"support-one-material",vi:150,compatibility:["soporte-magico"]});
  const craft=project(actor,{
    id:"support-one-project",
    operation:"fabricate",
    material,
    materialCopper:100,
    estimatedMaterialsCopper:100,
    allocationCompatibility:"soporte-magico",
    referenceValueCopper:200,
    quality:"common",
    resultData:{
      name:"Broche Dedicado I",
      type:"equipment",
      system:{
        category:"Soporte mágico",
        magicSupport:{grade:1}
      }
    },
    baseMinutes:480,
    adjustedBaseMinutes:480,
    requiredMinutes:480,
    requiredRank:3,
    professionalSkill:"crafting",
    requiredInstallation:"professional",
    availableInstallation:"professional"
  });
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,480,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  const output=[...actor.items.values()].find((entry)=>entry.name==="Broche Dedicado I");
  assert.ok(output);
  assert.equal(output.system.magicSupport.grade,1);
  assert.equal(output.system.priceCopper,200);
  assert.equal(output.system.manufacture.capMUsed,0);
  assert.equal(output.system.runic?.capacityPrepared??0,0);
});

test("CRAFT-13E: Piedra de Impronta no puede comprarse Calidad para obtener CapM/CRu",async()=>{
  const actor=new StubActor("stone-quality-exploit");
  const material=lot(actor,{id:"stone-quality-material",vi:500});
  const craft=project(actor,{
    id:"stone-quality-project",
    operation:"fabricate",
    material,
    materialCopper:300,
    estimatedMaterialsCopper:300,
    referenceValueCopper:400,
    quality:"superior",
    resultData:{
      name:"Piedra Lumen Superior",
      type:"equipment",
      system:{
        category:"Piedra de Impronta",
        imprintStone:{enabled:true,grade:1,imprintKey:"lumenI",socketedHostUuid:""}
      }
    },
    baseMinutes:480,
    adjustedBaseMinutes:720,
    requiredMinutes:720,
    requiredRank:3,
    requiredInstallation:"professional",
    availableInstallation:"professional"
  });
  const rejected=await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  assert.equal(rejected.ok,false);
  assert.match(rejected.error,/receta fija/);
});

test("CRAFT-13E: Piedra I exige Ritualismo, Arcana, Artesanía, instalación y VI compatible",async()=>{
  const actor=new StubActor("stone-professional");
  actor.system.skills.ritualism={rank:3};
  actor.system.skills.arcana={rank:1};
  actor.system.skills.crafting={rank:3};
  const material=lot(actor,{id:"stone-matrix",vi:200,compatibility:["imprint-stone:1"]});
  const craft=project(actor,{
    id:"stone-professional-project",
    operation:"fabricate",
    material,
    materialCopper:200,
    estimatedMaterialsCopper:200,
    allocationCompatibility:"imprint-stone:1",
    referenceValueCopper:400,
    quality:"common",
    resultData:{
      name:"Piedra Lumen I",
      type:"equipment",
      system:{
        category:"Piedra de Impronta",
        imprintStone:{enabled:true,grade:1,imprintKey:"lumenI",socketedHostUuid:""}
      }
    },
    baseMinutes:480,
    adjustedBaseMinutes:480,
    requiredMinutes:480,
    requiredRank:3,
    professionalSkill:"ritualism",
    requiredInstallation:"professional",
    availableInstallation:"professional"
  });
  const resolver=resolverFor(actor);
  const denied=await reserveCraftingProjectMaterials(craft,{resolver});
  assert.equal(denied.ok,false);
  assert.ok(denied.issues?.some((issue)=>issue.code==="magic-arcana-rank"));
  assert.equal(material.system.craftingLot.inputValueCopper,200);

  actor.system.skills.arcana.rank=2;
  const reserved=await reserveCraftingProjectMaterials(craft,{resolver});
  assert.equal(reserved.ok,true);
  await advanceCraftingProjectWork(craft,480,{expectedRevision:1});
  const completed=await completeCraftingProject(craft,{expectedRevision:2,resolver});
  assert.equal(completed.ok,true);
  const stone=[...actor.items.values()].find((entry)=>entry.name==="Piedra Lumen I");
  assert.ok(stone);
  assert.equal(stone.system.imprintStone.grade,1);
  assert.equal(material.system.craftingLot.inputValueCopper,0);
});

test("CRAFT-13E: Piedra no acepta VI genérico sin compatibilidad de matriz",async()=>{
  const actor=new StubActor("stone-compatibility");
  actor.system.skills.ritualism={rank:3};
  actor.system.skills.arcana={rank:2};
  actor.system.skills.crafting={rank:3};
  const material=lot(actor,{id:"ordinary-metal",vi:200,compatibility:["forja"]});
  const craft=project(actor,{
    id:"stone-compatibility-project",
    operation:"fabricate",
    material,
    materialCopper:200,
    estimatedMaterialsCopper:200,
    allocationCompatibility:"forja",
    referenceValueCopper:400,
    quality:"common",
    resultData:{
      name:"Piedra Brasa I",
      type:"equipment",
      system:{category:"Piedra de Impronta",imprintStone:{enabled:true,grade:1,imprintKey:"emberI",socketedHostUuid:""}}
    },
    baseMinutes:480,
    adjustedBaseMinutes:480,
    requiredMinutes:480,
    requiredRank:3,
    professionalSkill:"ritualism",
    requiredInstallation:"professional",
    availableInstallation:"professional"
  });
  const denied=await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  assert.equal(denied.ok,false);
  assert.match(denied.error,/compatibilidad requerida/);
  assert.equal(material.system.craftingLot.inputValueCopper,200);
});

test("CRAFT-13E: borrar una Runa libera CRu, no devuelve VI y reduce sólo su valor añadido",async()=>{
  const actor=new StubActor("rune-erase");
  const target=manufacturedItem(actor,{
    id:"rune-erase-target",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"superior"
  });
  target.system.runic={
    capacityPrepared:1,
    matrixMaterialCopper:50,
    addedValueCopper:300,
    channels:[{id:"cru-1",type:"inscription"}],
    imprints:[{id:"rune-one",key:"arcaneEdgeI",mode:"inscribed",channelIds:["cru-1"],stoneUuid:""}]
  };
  target.system.priceCopper=450;
  const craft=project(actor,{
    id:"rune-erase-project",
    operation:"modify",
    material:null,
    materialCopper:0,
    estimatedMaterialsCopper:0,
    referenceValueCopper:100,
    quality:"superior",
    enhancement:{mode:"runeErase",imprintId:"rune-one"},
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:60,
    requiredMinutes:60,
    requiredRank:2,
    professionalSkill:"crafting",
    requiredInstallation:"adequate",
    availableInstallation:"adequate"
  });
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,60,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  assert.equal(target.system.runic.capacityPrepared,1);
  assert.equal(target.system.runic.imprints.length,0);
  assert.equal(target.system.runic.addedValueCopper,100);
  assert.equal(target.system.priceCopper,250);
  assert.equal(craft.system.ledger.recoveredMaterialsCopper,0);
});

test("CRAFT-13E: Utilitario puede coexistir con Encantamiento principal sin crear un segundo principal",async()=>{
  const actor=new StubActor("utility-coexist");
  actor.system.skills.ritualism={rank:3};
  actor.system.skills.arcana={rank:2};
  const target=manufacturedItem(actor,{
    id:"utility-coexist-target",
    type:"equipment",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"superior"
  });
  target.system.enchantment={
    grade:1,
    patternKey:"barrier",
    functionalKey:"barrier-defense",
    passiveKey:"",
    utilityKey:"",
    supportAppropriate:false,
    hasRareComponent:false,
    materialCostCopper:500,
    timeMinutes:1440,
    addedValueCopper:1000,
    reserve:{value:0,max:6},
    attunedActorUuid:"",
    seal:false,
    sealState:"charged",
    sealTriggerType:"",
    sealBypassKey:"",
    rechargeBlocked:false,
    chargedReferenceValueCopper:0,
    boundSpell:null
  };
  target.system.priceCopper=1150;
  const material=lot(actor,{id:"utility-material",vi:100,compatibility:["enchantment:utility"]});
  const craft=project(actor,{
    id:"utility-coexist-project",
    operation:"modify",
    material,
    materialCopper:100,
    estimatedMaterialsCopper:100,
    allocationCompatibility:"enchantment:utility",
    referenceValueCopper:100,
    quality:"superior",
    enhancement:{mode:"enchantment",enchantmentGrade:0,enchantmentUtilityKey:"dry"},
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:480,
    requiredMinutes:480,
    requiredRank:3,
    professionalSkill:"ritualism",
    requiredInstallation:"professional",
    availableInstallation:"professional"
  });
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,480,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  assert.equal(target.system.enchantment.grade,1);
  assert.equal(target.system.enchantment.functionalKey,"barrier-defense");
  assert.equal(target.system.enchantment.utilityKey,"dry");
  assert.equal(target.system.enchantment.addedValueCopper,1200);
  assert.equal(target.system.priceCopper,1350);
});

test("CRAFT-13E: Encantamiento principal puede añadirse a un objeto que ya posee Utilitario",async()=>{
  const actor=new StubActor("principal-after-utility");
  actor.system.skills.ritualism={rank:4};
  actor.system.skills.arcana={rank:3};
  actor.system.skills.crafting={rank:3};
  const target=manufacturedItem(actor,{
    id:"principal-after-utility-target",
    type:"equipment",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"superior"
  });
  target.system.enchantment={
    grade:0,
    patternKey:"",
    functionalKey:"",
    passiveKey:"",
    utilityKey:"clean",
    supportAppropriate:false,
    hasRareComponent:false,
    materialCostCopper:0,
    timeMinutes:0,
    addedValueCopper:200,
    reserve:{value:0,max:0},
    attunedActorUuid:"",
    seal:false,
    sealState:"charged",
    sealTriggerType:"",
    sealBypassKey:"",
    rechargeBlocked:false,
    chargedReferenceValueCopper:0,
    boundSpell:null
  };
  target.system.priceCopper=350;
  const material=lot(actor,{id:"principal-material",vi:500,compatibility:["enchantment:1"]});
  const craft=project(actor,{
    id:"principal-after-utility-project",
    operation:"modify",
    material,
    materialCopper:500,
    estimatedMaterialsCopper:500,
    allocationCompatibility:"enchantment:1",
    referenceValueCopper:100,
    quality:"superior",
    enhancement:{
      mode:"enchantment",
      enchantmentGrade:1,
      enchantmentPatternKey:"ward-pattern",
      enchantmentFunctionalKey:"ward-functional",
      enchantmentUtilityKey:""
    },
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:1440,
    requiredMinutes:1440,
    requiredRank:4,
    professionalSkill:"ritualism",
    requiredInstallation:"specialized",
    availableInstallation:"specialized"
  });
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,1440,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  assert.equal(target.system.enchantment.utilityKey,"clean");
  assert.equal(target.system.enchantment.grade,1);
  assert.equal(target.system.enchantment.functionalKey,"ward-functional");
  assert.equal(target.system.enchantment.addedValueCopper,1200);
  assert.equal(target.system.priceCopper,1350);
});

test("CRAFT-13E: Golpe mecánico de trampa debe copiar Daño/Pen de la carga física reservada",async()=>{
  const actor=new StubActor("trap-physical-load");
  actor.system.skills.thievery={rank:2};
  const material=lot(actor,{id:"trap-frame-material",vi:50,compatibility:["forja"]});
  const spear=actor.add(new StubItem({
    id:"spear-load",
    name:"Lanza de carga",
    type:"weapon",
    system:{quantity:1,damage:5,penetration:0,condition:"operative",craftingReservations:{}}
  }));
  const component={
    id:"spear-component",
    name:"Lanza de carga",
    itemUuid:spear.uuid,
    valueCopper:200,
    quantity:1,
    separable:true,
    recoveredSeparately:false,
    countedInGenericRecovery:false
  };
  const resultData={
    name:"Golpe oculto Estándar",
    type:"equipment",
    system:{
      category:"Trampa",
      trap:{
        enabled:true,
        frame:"standard",
        precision:4,
        mechanismDf:12,
        triggerType:"contact",
        physicalTriggerKey:"plate-a",
        automatic:true,
        state:"unarmed",
        baseTimeMinutes:120,
        concealment:{grade:"visible",detectionDf:0,environmentAllows:true,environmentMethod:false},
        deactivationMethod:"AGI + Latrocinio",
        bypassKey:"",
        bypassDescription:"",
        load:{
          kind:"mechanical-strike",
          profileRef:"Lanza de carga",
          componentUuid:spear.uuid,
          maneuverEffect:"",
          damage:4,
          penetration:0,
          area:"",
          geometryRef:""
        }
      }
    }
  };
  const craft=project(actor,{
    id:"trap-physical-project",
    operation:"fabricate",
    material,
    materialCopper:50,
    estimatedMaterialsCopper:50,
    allocationCompatibility:"forja",
    referenceValueCopper:100,
    quality:"common",
    components:[component],
    resultData,
    baseMinutes:120,
    adjustedBaseMinutes:120,
    requiredMinutes:120,
    requiredRank:2,
    professionalSkill:"thievery",
    requiredInstallation:"adequate",
    availableInstallation:"adequate"
  });
  const resolver=resolverFor(actor);
  const denied=await reserveCraftingProjectMaterials(craft,{resolver});
  assert.equal(denied.ok,false);
  assert.match(denied.error,/coincidir exactamente/);
  assert.equal(spear.system.quantity,1);

  craft.system.target.resultData.system.trap.load.damage=5;
  const reserved=await reserveCraftingProjectMaterials(craft,{resolver});
  assert.equal(reserved.ok,true);
  await advanceCraftingProjectWork(craft,120,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  assert.equal(spear.system.quantity,0);
  const trap=[...actor.items.values()].find((entry)=>entry.name==="Golpe oculto Estándar");
  assert.ok(trap);
  assert.equal(trap.system.trap.state,"armed");
  assert.equal(trap.system.trap.load.damage,5);
});

test("CRAFT-13E: Ocultación de trampa cobra materiales/tiempo y exige Latrocinio suficiente",async()=>{
  const actor=new StubActor("trap-concealment");
  actor.system.skills.thievery={rank:1};
  const material=lot(actor,{id:"trap-hidden-material",vi:60,compatibility:["forja"]});
  const resultData={
    name:"Alarma Oculta",
    type:"equipment",
    system:{
      category:"Trampa",
      trap:{
        enabled:true,
        frame:"standard",
        precision:4,
        mechanismDf:12,
        triggerType:"contact",
        physicalTriggerKey:"cord-a",
        automatic:true,
        state:"unarmed",
        baseTimeMinutes:120,
        concealment:{grade:"hidden",detectionDf:12,environmentAllows:true,environmentMethod:false},
        deactivationMethod:"AGI + Latrocinio",
        bypassKey:"lift-cord",
        bypassDescription:"Levantar primero el cordel de seguridad.",
        load:{kind:"alarm",profileRef:"",componentUuid:"",maneuverEffect:"",damage:0,penetration:0,area:"",geometryRef:""}
      }
    }
  };
  const craft=project(actor,{
    id:"trap-hidden-project",
    operation:"fabricate",
    material,
    materialCopper:60,
    estimatedMaterialsCopper:60,
    allocationCompatibility:"forja",
    referenceValueCopper:100,
    quality:"common",
    resultData,
    baseMinutes:150,
    adjustedBaseMinutes:150,
    requiredMinutes:150,
    requiredRank:2,
    professionalSkill:"thievery",
    requiredInstallation:"adequate",
    availableInstallation:"adequate"
  });
  const resolver=resolverFor(actor);
  let denied=await reserveCraftingProjectMaterials(craft,{resolver});
  assert.equal(denied.ok,false);
  assert.equal(denied.skill,"thievery");
  assert.equal(denied.expectedRank,2);

  actor.system.skills.thievery.rank=2;
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
  await advanceCraftingProjectWork(craft,150,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver})).ok,true);
  const trap=[...actor.items.values()].find((entry)=>entry.name==="Alarma Oculta");
  assert.ok(trap);
  assert.equal(trap.system.trap.precision,4);
  assert.equal(trap.system.trap.mechanismDf,12);
  assert.equal(trap.system.trap.concealment.detectionDf,12);
  assert.equal(trap.system.trap.concealment.materialCopper,10);
  assert.equal(trap.system.trap.concealment.additionalTimeMinutes,30);
  assert.equal(material.system.craftingLot.inputValueCopper,0);
});

test("CRAFT-13E: Supervivencia sólo sustituye Latrocinio en trampa Simple de campaña compatible",async()=>{
  const actor=new StubActor("survival-trap");
  actor.system.skills.survival={rank:1};
  const material=lot(actor,{id:"survival-trap-material",vi:10,compatibility:["forja"]});
  const resultData={
    name:"Alarma de campaña",
    type:"equipment",
    system:{
      category:"Trampa",
      trap:{
        enabled:true,
        frame:"simple",
        precision:2,
        mechanismDf:10,
        triggerType:"tripwire",
        physicalTriggerKey:"cord-natural",
        automatic:true,
        state:"unarmed",
        baseTimeMinutes:30,
        concealment:{grade:"disguised",detectionDf:10,environmentAllows:true,environmentMethod:true},
        deactivationMethod:"AGI + Latrocinio",
        bypassKey:"",
        bypassDescription:"",
        load:{kind:"alarm",profileRef:"",componentUuid:"",maneuverEffect:"",damage:0,penetration:0,area:"",geometryRef:""}
      }
    }
  };
  const craft=project(actor,{
    id:"survival-trap-project",
    operation:"fabricate",
    material,
    materialCopper:10,
    estimatedMaterialsCopper:10,
    allocationCompatibility:"forja",
    referenceValueCopper:20,
    quality:"common",
    resultData,
    baseMinutes:40,
    adjustedBaseMinutes:40,
    requiredMinutes:40,
    requiredRank:1,
    professionalSkill:"survival",
    requiredInstallation:"improvised",
    availableInstallation:"improvised"
  });
  const resolver=resolverFor(actor);
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver})).ok,true);
});

test("CRAFT-13E: Supervivencia no fabrica Armazones Estándar aunque tenga rango alto",async()=>{
  const actor=new StubActor("survival-standard-trap");
  actor.system.skills.survival={rank:5};
  const material=lot(actor,{id:"survival-standard-material",vi:50,compatibility:["forja"]});
  const resultData={
    name:"Alarma Estándar indebida",
    type:"equipment",
    system:{
      category:"Trampa",
      trap:{
        enabled:true,
        frame:"standard",
        precision:4,
        mechanismDf:12,
        triggerType:"contact",
        physicalTriggerKey:"plate",
        automatic:true,
        state:"unarmed",
        baseTimeMinutes:120,
        concealment:{grade:"visible",detectionDf:0,environmentAllows:true,environmentMethod:false},
        load:{kind:"alarm",damage:0,penetration:0}
      }
    }
  };
  const craft=project(actor,{
    id:"survival-standard-project",
    operation:"fabricate",
    material,
    materialCopper:50,
    estimatedMaterialsCopper:50,
    referenceValueCopper:100,
    resultData,
    baseMinutes:120,
    adjustedBaseMinutes:120,
    requiredMinutes:120,
    requiredRank:5,
    professionalSkill:"survival",
    requiredInstallation:"adequate",
    availableInstallation:"adequate"
  });
  const denied=await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)});
  assert.equal(denied.ok,false);
  assert.match(denied.error,/Latrocinio/);
});

test("CRAFT-13E: rearmar trampa alquímica exige y consume una nueva dosis física",async()=>{
  const actor=new StubActor("alchemy-trap-rearm");
  const target=manufacturedItem(actor,{
    id:"alchemy-trap-target",
    type:"equipment",
    referenceValueCopper:100,
    baseTimeMinutes:120,
    quality:"common"
  });
  target.system.trap={
    enabled:true,
    frame:"standard",
    precision:4,
    mechanismDf:12,
    triggerType:"contact",
    physicalTriggerKey:"plate-alchemy",
    automatic:true,
    state:"discharged",
    baseTimeMinutes:120,
    concealment:{grade:"visible",detectionDf:0,environmentAllows:true,environmentMethod:false},
    deactivationMethod:"AGI + Latrocinio",
    bypassKey:"",
    bypassDescription:"",
    load:{
      kind:"alchemy",
      profileRef:"bomba-incendiaria",
      componentUuid:"Actor.old.Item.spent-dose",
      maneuverEffect:"",
      damage:6,
      penetration:1,
      area:"small",
      geometryRef:""
    }
  };

  const craft=project(actor,{
    id:"alchemy-trap-rearm-project",
    operation:"modify",
    material:null,
    materialCopper:0,
    estimatedMaterialsCopper:0,
    referenceValueCopper:100,
    quality:"common",
    enhancement:{mode:"trapRearm"},
    targetItemUuid:target.uuid,
    timeMode:"fixed",
    baseMinutes:120,
    adjustedBaseMinutes:30,
    requiredMinutes:30,
    requiredRank:2,
    professionalSkill:"crafting",
    requiredInstallation:"adequate",
    availableInstallation:"adequate"
  });
  const resolver=resolverFor(actor);
  const denied=await reserveCraftingProjectMaterials(craft,{resolver});
  assert.equal(denied.ok,false);
  assert.match(denied.error,/nueva dosis/);

  const dose=actor.add(new StubItem({
    id:"incendiary-dose",
    name:"Bomba Incendiaria",
    type:"formula",
    system:{slug:"bomba-incendiaria",quantity:1,craftingReservations:{}}
  }));
  craft.system.components=[{
    id:"dose-component",
    name:"Bomba Incendiaria",
    itemUuid:dose.uuid,
    valueCopper:0,
    quantity:1,
    separable:false,
    recoveredSeparately:false,
    countedInGenericRecovery:false
  }];
  assert.equal((await reserveCraftingProjectMaterials(craft,{resolver:resolverFor(actor)})).ok,true);
  await advanceCraftingProjectWork(craft,30,{expectedRevision:1});
  assert.equal((await completeCraftingProject(craft,{expectedRevision:2,resolver:resolverFor(actor)})).ok,true);
  assert.equal(dose.system.quantity,0);
  assert.equal(target.system.trap.state,"armed");
  assert.equal(target.system.trap.load.componentUuid,dose.uuid);
});

