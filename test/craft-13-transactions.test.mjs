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
  enhancement = {mode:"modification",replaceMaterialId:"",fineMachiningMaterialId:""},
  components = [],
  timeMode = operation === "modify" ? "fixed" : "derived",
  baseMinutes = Math.max(requiredMinutes, 10),
  adjustedBaseMinutes = Math.max(requiredMinutes, 10),
  requiredRank = 2,
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
      components,
      time:{
        mode:timeMode,
        baseMinutes,
        adjustedBaseMinutes,
        requiredMinutes,
        completedMinutes
      },
      professional:{
        skill:"crafting",
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
      id:"raw-part",name:"Aleación",profileKey:"kharumPrecisionAlloy",grade:"rare",coverage:"major",
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
  assert.match(rejected.error,/coste canónico cambió/);
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

