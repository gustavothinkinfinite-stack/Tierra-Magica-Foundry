import test from "node:test";
import assert from "node:assert/strict";
import { resolveDeviceEnergySource } from "../scripts/rules/device-energy.mjs";
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

function device({id,name,energy=0,max=energy,flow=0,consumption=0,activation="Acción",source=""}){
  return {
    id,type:"device",name,
    system:{
      condition:"operative",overloadAllowed:true,
      energy:{value:energy,max},energySourceItemId:source,
      flow,consumption,activation,effect:"Prueba"
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

test("13F: Escudo de campo vinculado consume la Celda y usa Reacción, no Acción",async()=>{
  const cell=device({id:"cell",name:"Celda arcana menor",energy:4,flow:2});
  const shield=device({id:"shield",name:"Escudo de campo",flow:2,consumption:2,activation:"Reacción",source:"cell"});
  const a=actor([cell,shield]);
  const result=await a.useDevice(shield);
  assert.ok(result);
  assert.equal(cell.system.energy.value,2);
  assert.equal(shield.system.energy.value,0);
  assert.equal(a.system.turn.reaction,false);
  assert.equal(a.system.turn.action,true);
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
  assert.equal([one,two].filter(Boolean).length,1);
  assert.equal(source.system.energy.value,0);
  assert.equal(Number(a.system.turn.action===false)+Number(a.system.turn.reaction===false),1);
});

test("13F: Sobrecarga exitosa de dispositivo externo gasta la fuente y daña el consumidor",async()=>{
  const source=device({id:"source",name:"Celda",energy:4,flow:1});
  const consumer=device({id:"consumer",name:"Motor",consumption:2,source:"source"});
  const a=actor([source,consumer]);
  a.rollCheck=async()=>({total:16});
  const result=await a.overloadDevice(consumer);
  assert.equal(result.total,16);
  assert.equal(source.system.energy.value,2);
  assert.equal(consumer.system.condition,"damaged");
  assert.equal(source.system.condition,"operative");
  assert.equal(a.system.turn.action,false);
});