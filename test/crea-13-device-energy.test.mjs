import test from "node:test";
import assert from "node:assert/strict";
import {
  planDeviceChargeInterval,
  planDeviceEnergyConsumption,
  resolveDeviceEnergySource,
  resolveDeviceEnergySupply
} from "../scripts/rules/device-energy.mjs";
import { installActionEconomyGuards } from "../scripts/rules/action-economy-guards.mjs";

const warnings=[];
globalThis.ui={notifications:{
  warn:(message)=>{warnings.push(String(message)); return null;},
  info:(message)=>message
}};
globalThis.foundry={utils:{escapeHTML:(value)=>String(value)}};
globalThis.ChatMessage={
  getSpeaker:({actor})=>({actor:actor?.id ?? actor?.name}),
  create:async(data)=>data
};
globalThis.game={user:{targets:new Set()}};

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
    node[keys[0]]=value;
  }
}

function device({
  id,name,energy=0,max=energy,flow=0,chargingFlow=0,stability=0,
  consumption=0,activation="Acción",source="",sourceIds=[],linkMode="single",
  kineticDefense=false,condition="operative",quality="common"
}){
  return {
    id,type:"device",name,
    system:{
      condition,quality,overloadAllowed:true,
      energy:{value:energy,max},energySourceItemId:source,energySourceItemIds:sourceIds,
      energyLinkMode:linkMode,flow,chargingFlow,stability,consumption,activation,kineticDefense,effect:"Prueba"
    },
    async update(changes){applyChanges(this,changes);return changes;}
  };
}

globalThis.Actor=class {
  constructor(data={}){
    this.id=data.id ?? "actor";
    this.name=data.name ?? "Actor";
    this.type="character";
    this.system=data.system ?? {};
    this.items=data.items ?? [];
  }
  async update(changes){applyChanges(this,changes);return changes;}
  prepareDerivedData(){}
};

const { TierraMagicaActor }=await import("../scripts/documents/actor.mjs");
installActionEconomyGuards(TierraMagicaActor);

function actor(items=[]){
  return new TierraMagicaActor({
    id:"engineer",name:"Ingeniera",items,
    system:{
      turn:{action:true,reaction:true},
      attributes:{int:{value:3}},
      skills:{engineering:{rank:3}},
      resources:{health:{value:10,max:10},mana:{value:0,max:0}},
      status:{incapacitated:false}
    }
  });
}

test("13F: una fuente explícita aporta Energía/Caudal y fuentes no vinculadas no se suman",()=>{
  const cell=device({id:"cell",name:"Celda",energy:4,flow:2});
  const other=device({id:"other",name:"Núcleo",energy:16,flow:5});
  const shield=device({id:"shield",name:"Escudo",flow:99,consumption:2,activation:"Reacción",source:"cell"});
  const a=actor([cell,other,shield]);
  const power=resolveDeviceEnergySource(a,shield);
  assert.equal(power.valid,true);
  assert.equal(power.source,cell);
  assert.equal(power.energy,4);
  assert.equal(power.flow,2);
  assert.equal(power.external,true);
});

test("13F: Escudo de campo consume Energía y respeta la Reacción manual",async()=>{
  const cell=device({id:"cell",name:"Celda arcana menor",energy:4,flow:2});
  const shield=device({id:"shield",name:"Escudo de campo",flow:2,consumption:2,activation:"Reacción",source:"cell",kineticDefense:true});
  const a=actor([cell,shield]);
  const result=await a.useDevice(shield);
  assert.ok(result);
  assert.equal(cell.system.energy.value,2);
  assert.equal(shield.system.energy.value,0);
  assert.equal(a.system.turn.reaction,true);
  assert.equal(a.system.turn.action,true);
  assert.equal(a.system.combat.kineticBarrierActive,true);
  assert.equal(a.system.combat.kineticDefenseSource,"Escudo de campo");
});

test("13F: un acumulador insuficiente bloquea aunque exista otro acumulador mejor no vinculado",async()=>{
  const weak=device({id:"weak",name:"Fuente débil",energy:8,flow:1});
  const strong=device({id:"strong",name:"Fuente fuerte",energy:16,flow:5});
  const consumer=device({id:"consumer",name:"Propulsor",consumption:2,source:"weak"});
  const a=actor([weak,strong,consumer]);
  const result=await a.useDevice(consumer);
  assert.equal(result,null);
  assert.equal(weak.system.energy.value,8);
  assert.equal(strong.system.energy.value,16);
  assert.equal(a.system.turn.action,true);
});

test("13F: una fuente ausente bloquea sin caer a reserva propia ni gastar economía",async()=>{
  const consumer=device({id:"consumer",name:"Escudo",energy:9,flow:9,consumption:2,source:"missing",activation:"Reacción"});
  const a=actor([consumer]);
  const result=await a.useDevice(consumer);
  assert.equal(result,null);
  assert.equal(consumer.system.energy.value,9);
  assert.equal(a.system.turn.reaction,true);
  assert.equal(a.system.turn.action,true);
});

test("13F: dos activaciones concurrentes sobre una sola reserva no duplican Energía",async()=>{
  const source=device({id:"source",name:"Celda única",energy:2,flow:2});
  const actionDevice=device({id:"action",name:"Herramienta",consumption:2,source:"source",activation:"Acción"});
  const reactionDevice=device({id:"reaction",name:"Escudo",consumption:2,source:"source",activation:"Reacción"});
  const a=actor([source,actionDevice,reactionDevice]);
  const [one,two]=await Promise.all([a.useDevice(actionDevice),a.useDevice(reactionDevice)]);
  // Dos intentos no pueden consumir más Energía de la que existe.
  // Ningún candado de turno participa de esta protección.
  assert.ok([one,two].filter(Boolean).length<=1);
  assert.equal(source.system.energy.value,0);
  assert.equal(a.system.turn.action,true);
  assert.equal(a.system.turn.reaction,true);
});

test("13F: Sobrecarga exitosa de dispositivo externo gasta la fuente y daña el consumidor",async()=>{
  const source=device({id:"source",name:"Celda",energy:4,flow:1});
  const consumer=device({id:"consumer",name:"Motor",consumption:2,source:"source"});
  const a=actor([source,consumer]);
  a.rollCheck=async()=>({rolls:[{total:16}]});
  const result=await a.overloadDevice(consumer);
  assert.equal(result.rolls[0].total,16);
  assert.equal(source.system.energy.value,2);
  assert.equal(consumer.system.condition,"damaged");
  assert.equal(source.system.condition,"operative");
  assert.equal(a.system.turn.action,true);
});

test("13F: Escudo de campo y Barrera Cinética comparten una sola ventana +2",async()=>{
  const source=device({id:"source",name:"Celda",energy:4,flow:2});
  const shield=device({id:"shield",name:"Escudo de campo",consumption:2,activation:"Reacción",source:"source",kineticDefense:true});
  const a=actor([source,shield]);
  a.system.combat={kineticBarrierActive:true,kineticDefenseSource:"Barrera Cinética"};
  a.system.turn.reaction=true;

  const before=(await import("../scripts/rules/derived-state.mjs")).deriveActorState({system:a.system,items:a.items});
  assert.equal((await import("../scripts/rules/derived-state.mjs")).resolveDerivedSelector(before,"defense",{kineticBarrier:true}).total-before.defense,2);

  const result=await a.useDevice(shield);
  assert.ok(result);
  const after=(await import("../scripts/rules/derived-state.mjs")).deriveActorState({system:a.system,items:a.items});
  assert.equal((await import("../scripts/rules/derived-state.mjs")).resolveDerivedSelector(after,"defense",{kineticBarrier:true}).total-after.defense,2);
  assert.equal(after.contextual.defense.filter((entry)=>entry.context==="kineticBarrier").length,1);
  assert.equal(after.contextual.defense[0].label,"Escudo de campo");
});


test("13F: un acumulador Deshabilitado no puede alimentar una activación",async()=>{
  const source=device({id:"source",name:"Celda averiada",energy:4,flow:2});
  source.system.condition="disabled";
  const consumer=device({id:"consumer",name:"Herramienta",consumption:1,source:"source"});
  const a=actor([source,consumer]);
  const result=await a.useDevice(consumer);
  assert.equal(result,null);
  assert.equal(source.system.energy.value,4);
  assert.equal(a.system.turn.action,true);
});

test("13F: Banco simple suma Energía pero conserva el mayor Caudal individual",()=>{
  const one=device({id:"one",name:"Celda A",energy:4,max:4,flow:2,stability:1});
  const two=device({id:"two",name:"Celda B",energy:4,max:4,flow:2,stability:1});
  const bank=device({id:"bank",name:"Banco",linkMode:"bank",sourceIds:["one","two"]});
  const consumer=device({id:"consumer",name:"Herramienta",consumption:2,source:"bank"});
  const a=actor([one,two,bank,consumer]);
  const supply=resolveDeviceEnergySupply(a,consumer);
  assert.equal(supply.valid,true);
  assert.equal(supply.energy,8);
  assert.equal(supply.baseFlow,2);
  assert.equal(supply.flow,2);
});

test("13F: Acoplador da sólo +1 Caudal, techo 5, y usar ese +1 cuesta 1 E adicional",async()=>{
  const one=device({id:"one",name:"Estándar A",energy:8,max:8,flow:3,stability:2});
  const two=device({id:"two",name:"Estándar B",energy:8,max:8,flow:3,stability:2});
  const coupler=device({id:"coupler",name:"Acoplador",linkMode:"coupler",sourceIds:["one","two"]});
  const consumer=device({id:"consumer",name:"Módulo C4",consumption:4,source:"coupler"});
  const a=actor([one,two,coupler,consumer]);
  const supply=resolveDeviceEnergySupply(a,consumer);
  assert.equal(supply.baseFlow,3);
  assert.equal(supply.flow,4);
  const plan=planDeviceEnergyConsumption(supply,4);
  assert.equal(plan.valid,true);
  assert.equal(plan.couplerSurcharge,1);
  assert.equal(plan.energyCost,5);

  const result=await a.useDevice(consumer);
  assert.ok(result);
  assert.equal(one.system.energy.value+two.system.energy.value,11);
});

test("13F: Acopladores y Bancos no pueden encadenarse como acumuladores individuales",()=>{
  const one=device({id:"one",name:"Celda A",energy:4,max:4,flow:2,stability:1});
  const two=device({id:"two",name:"Celda B",energy:4,max:4,flow:2,stability:1});
  const bank=device({id:"bank",name:"Banco",linkMode:"bank",sourceIds:["one","two"]});
  const coupler=device({id:"coupler",name:"Acoplador",linkMode:"coupler",sourceIds:["bank","two"]});
  const consumer=device({id:"consumer",name:"Módulo",consumption:3,source:"coupler"});
  const a=actor([one,two,bank,coupler,consumer]);
  const supply=resolveDeviceEnergySupply(a,consumer);
  assert.equal(supply.valid,false);
  assert.match(supply.issue,/encadenar infraestructura/);
});

test("13F: varias fuentes no multiplican Estabilidad del receptor en el mismo intervalo",()=>{
  const one=device({id:"one",name:"Fuente A",energy:4,max:4,flow:2,stability:1});
  const two=device({id:"two",name:"Fuente B",energy:4,max:4,flow:2,stability:1});
  const target=device({id:"target",name:"Estándar vacío",energy:0,max:8,flow:3,stability:2});
  const a=actor([one,two,target]);
  const plan=planDeviceChargeInterval(a,[one,two],[target]);
  assert.equal(plan.valid,true);
  assert.equal(plan.transferred,2);
  assert.equal(plan.receiverAdds[0].amount,2);
});

test("13F: una fuente reparte su Caudal de Carga total entre todos los receptores",()=>{
  const source=device({id:"source",name:"Núcleo fuente",energy:16,max:16,flow:5,chargingFlow:3,stability:4});
  const aTarget=device({id:"a",name:"Receptor A",energy:0,max:8,flow:3,stability:2});
  const bTarget=device({id:"b",name:"Receptor B",energy:0,max:8,flow:3,stability:2});
  const a=actor([source,aTarget,bTarget]);
  const plan=planDeviceChargeInterval(a,[source],[aTarget,bTarget]);
  assert.equal(plan.valid,true);
  assert.equal(plan.transferred,3);
  assert.equal(plan.receiverAdds[0].amount,2);
  assert.equal(plan.receiverAdds[1].amount,1);
  assert.equal(plan.sourceDraws[0].amount,3);
});

test("13F: Estación de carga no crea Energía y queda limitada por su fuente real",()=>{
  const provider=device({id:"provider",name:"Acumulador proveedor",energy:8,max:8,flow:3,stability:2});
  const station=device({id:"station",name:"Estación",energy:0,max:0,flow:0,chargingFlow:4,source:"provider"});
  const target=device({id:"target",name:"Núcleo receptor",energy:0,max:16,flow:5,stability:4});
  const a=actor([provider,station,target]);
  const plan=planDeviceChargeInterval(a,[station],[target]);
  assert.equal(plan.valid,true);
  assert.equal(plan.transferred,3);
  assert.equal(plan.sourceDraws[0].item,provider);
});

test("13F: recarga estable transfiere 1:1 y nunca supera Estabilidad ni Energía máxima",async()=>{
  const source=device({id:"source",name:"Fuente",energy:8,max:8,flow:4,chargingFlow:4,stability:2});
  const target=device({id:"target",name:"Celda casi llena",energy:3,max:4,flow:2,stability:1});
  const a=actor([source,target]);
  const result=await a.chargeDeviceEnergyInterval([source],[target]);
  assert.equal(result.ok,true);
  assert.equal(result.transferred,1);
  assert.equal(source.system.energy.value,7);
  assert.equal(target.system.energy.value,4);
});

test("13F: Carga forzada exitosa usa hasta 2x Estabilidad y deteriora intrínsecamente",async()=>{
  const source=device({id:"source",name:"Núcleo",energy:8,max:8,flow:5,stability:4});
  const target=device({id:"target",name:"Estándar",energy:0,max:8,flow:3,stability:2});
  const a=actor([source,target]);
  a.rollCheck=async()=>({rolls:[{total:16}]});
  const result=await a.chargeDeviceEnergyInterval([source],[target],{forced:true});
  assert.equal(result.ok,true);
  assert.equal(result.transferred,4);
  assert.equal(source.system.energy.value,4);
  assert.equal(target.system.energy.value,4);
  assert.equal(target.system.condition,"damaged");
});

test("13F: Carga forzada fallida no transfiere Energía y Deshabilita el receptor",async()=>{
  const source=device({id:"source",name:"Núcleo",energy:8,max:8,flow:5,stability:4});
  const target=device({id:"target",name:"Estándar",energy:0,max:8,flow:3,stability:2});
  const a=actor([source,target]);
  a.rollCheck=async()=>({total:15});
  const result=await a.chargeDeviceEnergyInterval([source],[target],{forced:true});
  assert.equal(result.ok,true);
  assert.equal(result.transferred,0);
  assert.equal(source.system.energy.value,8);
  assert.equal(target.system.energy.value,0);
  assert.equal(target.system.condition,"disabled");
});

test("13F: un acumulador Dañado no puede usar Carga forzada",async()=>{
  const source=device({id:"source",name:"Núcleo",energy:8,max:8,flow:5,stability:4});
  const target=device({id:"target",name:"Estándar dañado",energy:0,max:8,flow:3,stability:2,condition:"damaged"});
  const a=actor([source,target]);
  let rolled=false;
  a.rollCheck=async()=>{rolled=true;return {total:20};};
  const result=await a.chargeDeviceEnergyInterval([source],[target],{forced:true});
  assert.equal(result,null);
  assert.equal(rolled,false);
  assert.equal(source.system.energy.value,8);
});

test("13F: Sobrecarga sólo existe si falta exactamente 1 Caudal y no puede repetirse Dañado",async()=>{
  const source=device({id:"source",name:"Celda",energy:8,max:8,flow:2,stability:1});
  const normal=device({id:"normal",name:"Motor normal",consumption:2,source:"source"});
  const a=actor([source,normal]);
  let rolled=false;
  a.rollCheck=async()=>{rolled=true;return {total:20};};
  assert.equal(await a.overloadDevice(normal),null);
  assert.equal(rolled,false);

  const stressed=device({id:"stressed",name:"Motor dañado",consumption:3,source:"source",condition:"damaged"});
  a.items.push(stressed);
  assert.equal(await a.overloadDevice(stressed),null);
  assert.equal(source.system.energy.value,8);
});

test("13F: Calidad no aumenta Energía, Caudal ni Estabilidad por sí sola",()=>{
  const source=device({id:"source",name:"Celda excepcional",energy:4,max:4,flow:2,stability:1,quality:"exceptional"});
  const consumer=device({id:"consumer",name:"Carga",consumption:2,source:"source"});
  const a=actor([source,consumer]);
  const supply=resolveDeviceEnergySupply(a,consumer);
  assert.equal(supply.energy,4);
  assert.equal(supply.flow,2);
  assert.equal(source.system.stability,1);
});

