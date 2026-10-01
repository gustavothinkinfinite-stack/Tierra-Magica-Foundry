import test from "node:test";
import assert from "node:assert/strict";
import { spendActorMovement, resetActorTurnForCombat } from "../scripts/rules/turn-economy.mjs";
import { applyBoundedHealing } from "../scripts/rules/healing-delivery.mjs";
import { installFamiliarGuards } from "../scripts/rules/familiar-guards.mjs";

const delay=(ms=5)=>new Promise((resolve)=>setTimeout(resolve,ms));

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

globalThis.ui={notifications:{
  warn:()=>null,
  info:()=>null
}};
globalThis.foundry={utils:{escapeHTML:(value)=>String(value)}};
globalThis.ChatMessage={
  getSpeaker:({actor})=>({actor:actor?.id ?? actor?.name}),
  create:async(data)=>data
};
globalThis.game={user:{targets:new Set(),isGM:true,id:"gm"},users:[]};

globalThis.Actor=class {
  constructor(data={}){
    this.id=data.id ?? "actor";
    this.uuid=data.uuid ?? "Actor."+this.id;
    this.name=data.name ?? "Actor";
    this.type=data.type ?? "character";
    this.system=data.system ?? {};
    this.items=data.items ?? [];
    this.isOwner=true;
  }
  prepareDerivedData(){}
  canUserModify(){return true;}
  async update(changes){
    await delay();
    applyChanges(this,changes);
    return changes;
  }
};

const { TierraMagicaActor }=await import("../scripts/documents/actor.mjs");
installFamiliarGuards(TierraMagicaActor);

function resourceActor({health=10,healthMax=16,mana=7,manaMax=15}={}){
  const actor=new TierraMagicaActor({
    id:"resource",
    name:"Actor de concurrencia",
    system:{
      attributes:{fue:{value:2},agi:{value:2},vig:{value:3},int:{value:3},per:{value:2},vol:{value:3},pre:{value:2}},
      skills:{channeling:{rank:2},ritualism:{rank:3}},
      derived:{healthMax,manaMax},
      resources:{health:{value:health,max:healthMax},mana:{value:mana,max:manaMax}},
      recovery:{healthUsed:false,manaUsed:false,healthCap:healthMax},
      status:{trauma:0,incapacitated:false,fatigue:0},
      magic:{sustainedSpellIds:[]},
      alchemy:{saturatedFamilies:[]},
      turn:{action:true,reaction:true}
    },
    items:[]
  });
  actor.rollCheck=async()=>({total:18,rolls:[{total:18}]});
  return actor;
}

test("Promise.all: dos desplazamientos no reutilizan el mismo Movimiento disponible",async()=>{
  const actor={
    type:"character",
    system:{
      derived:{movement:6},
      turn:{movementSpent:0,extraMovement:0,action:true,reaction:true},
      status:{incapacitated:false},
      resources:{health:{value:10}}
    },
    async update(changes){await delay();applyChanges(this,changes);}
  };

  const [first,second]=await Promise.all([
    spendActorMovement(actor,4),
    spendActorMovement(actor,4)
  ]);

  assert.equal([first,second].filter(Boolean).length,1);
  assert.equal(actor.system.turn.movementSpent,4);
});

test("Promise.all: un mismo turno sólo se reinicia una vez aunque dos hooks compitan",async()=>{
  const actor={
    type:"character",
    previous:null,
    system:{
      derived:{movement:6},
      turn:{movementSpent:5,extraMovement:0,action:false,reaction:false},
      status:{incapacitated:false},
      resources:{health:{value:10}},
      combat:{guardActive:true}
    },
    getFlag(){return this.previous;},
    async setFlag(_scope,_key,value){await delay();this.previous=value;},
    async update(changes){await delay();applyChanges(this,changes);}
  };
  const combat={id:"combat",round:4};
  const combatant={id:"c1"};

  const results=await Promise.all([
    resetActorTurnForCombat(actor,combat,combatant),
    resetActorTurnForCombat(actor,combat,combatant)
  ]);

  assert.equal(results.filter(Boolean).length,1);
  assert.equal(actor.system.turn.action,true);
  assert.equal(actor.system.turn.reaction,true);
  assert.equal(actor.system.turn.movementSpent,0);
});

test("Promise.all: dos impactos simultáneos acumulan daño en vez de perder una escritura",async()=>{
  const actor=resourceActor({health:10,healthMax:16});

  await Promise.all([
    actor.adjustResource("health",-4),
    actor.adjustResource("health",-4)
  ]);

  assert.equal(actor.system.resources.health.value,2);
  assert.equal(actor.system.status.trauma,0);
});

test("Promise.all: dos curaciones acotadas recalculan el tope después de la primera",async()=>{
  const actor=resourceActor({health:10,healthMax:16});

  const amounts=await Promise.all([
    applyBoundedHealing(actor,4),
    applyBoundedHealing(actor,4)
  ]);

  assert.deepEqual(amounts,[4,2]);
  assert.equal(actor.system.resources.health.value,16);
});

test("Promise.all: daño y curación comparten una única serialización de Vida",async()=>{
  const actor=resourceActor({health:10,healthMax:16});

  await Promise.all([
    actor.adjustResource("health",-7),
    applyBoundedHealing(actor,4)
  ]);

  assert.equal(actor.system.resources.health.value,7);
  assert.equal(actor.system.status.incapacitated,false);
});

test("Promise.all: dos rituales no pueden pagar dos veces con la misma reserva de Maná",async()=>{
  const actor=resourceActor({mana:7,manaMax:15});
  const ritual={
    type:"ritual",name:"Ritual concurrente",
    system:{manaDirector:5,usefulAssistants:0,manaAssistantMax:0,difficulty:10,attribute:"int",flowRequired:0}
  };

  const results=await Promise.all([
    actor.performRitual(ritual),
    actor.performRitual(ritual)
  ]);

  assert.equal(results.filter(Boolean).length,1);
  assert.equal(actor.system.resources.mana.value,2);
});

test("Promise.all: Sobrecarga y Descanso producen uno de los órdenes seriales legales, nunca Maná gratis",async()=>{
  const actor=resourceActor({mana:2,manaMax:15});
  const spell={
    id:"spell",type:"spell",name:"Prueba",
    system:{grade:"basic",manaCost:3,discipline:"evocation",attribute:"int",requirements:null,sustained:false}
  };

  await Promise.all([
    actor.useSpell(spell),
    actor.rest("rest")
  ]);

  // useSpell entra primero al lock: Sobrecarga deja 0 y el Descanso posterior recupera VOL+1 = 4.
  assert.equal(actor.system.resources.mana.value,4);
  assert.equal(actor.system.status.fatigue,2);
  assert.equal(actor.system.recovery.manaUsed,true);
});

test("Promise.all: Poción Arcana y Descanso no pueden sobrescribir el Maná con una combinación imposible",async()=>{
  const actor=resourceActor({mana:2,manaMax:15});
  const potion={
    type:"formula",name:"Poción de Recuperación Arcana",
    system:{slug:"pocion-de-recuperacion-arcana",quantity:1,saturating:true,family:"arcana",effect:"Recupera 3 Maná"}
  };
  potion.update=async function(changes){await delay();applyChanges(this,changes);};

  await Promise.all([
    actor.useFormula(potion),
    actor.rest("rest")
  ]);

  // Poción primero: 2 -> 5; Descanso después: 5 -> 9.
  assert.equal(actor.system.resources.mana.value,9);
  assert.equal(potion.system.quantity,0);
  assert.equal(actor.system.recovery.manaUsed,true);
  assert.deepEqual(actor.system.alchemy.saturatedFamilies,["arcana"]);
});
