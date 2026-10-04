import test from "node:test";
import assert from "node:assert/strict";

import {
  advanceCraftingProjectWork,
  completeCraftingProject,
  craftingLotAvailableCopper,
  releaseCraftingProjectMaterials,
  reserveCraftingProjectMaterials
} from "../scripts/rules/crafting-transactions.mjs";

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
  reservations = {}
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
        compatibility:["forja"],
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
  specialMaterials = []
} = {}) {
  const entries = material && materialCopper > 0 ? [{
    id:"alloc-" + id,
    kind:"material-allocation",
    resource:"materials",
    amountCopper:materialCopper,
    quantity:0,
    sourceUuid:material.uuid,
    compatibility:"forja",
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
        quality:"common",
        workMaterialGrade:"ordinary",
        affectedValueCopper:referenceValueCopper
      },
      specialMaterials,
      components:[],
      time:{
        mode:"derived",
        baseMinutes:Math.max(requiredMinutes, 10),
        adjustedBaseMinutes:Math.max(requiredMinutes, 10),
        requiredMinutes,
        completedMinutes
      },
      professional:{
        skill:"crafting",
        specialization:"",
        baseRank:2,
        requiredRank:2,
        baseInstallation:"adequate",
        requiredInstallation:"adequate",
        availableInstallation:"adequate",
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

