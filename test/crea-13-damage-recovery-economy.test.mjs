import test from "node:test";
import assert from "node:assert/strict";
import { applyBoundedHealing } from "../scripts/rules/healing-delivery.mjs";
import { installFamiliarGuards } from "../scripts/rules/familiar-guards.mjs";
import { installFormulaGuards } from "../scripts/rules/formula-guards.mjs";
import { installActionEconomyGuards } from "../scripts/rules/action-economy-guards.mjs";
import { reconcileActorResources } from "../scripts/rules/resource-reconciliation.mjs";
import { movementRemaining, resetActorTurnForCombat } from "../scripts/rules/turn-economy.mjs";

const warnings=[];
globalThis.ui={notifications:{
  warn:(message)=>{warnings.push(String(message)); return null;},
  info:(message)=>message
}};
globalThis.foundry={utils:{escapeHTML:(value)=>String(value)}};
globalThis.ChatMessage={
  getSpeaker:({actor})=>({actor:actor?.uuid ?? actor?.id ?? actor?.name}),
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

globalThis.Actor=class {
  constructor(data={}){
    this.id=data.id ?? data.uuid ?? data.name ?? "actor";
    this.uuid=data.uuid ?? "Actor."+this.id;
    this.name=data.name ?? "Actor";
    this.type=data.type ?? "character";
    this.system=data.system ?? {};
    this.items=data.items ?? [];
    this.isOwner=true;
    this._flags=new Map();
  }
  prepareDerivedData(){}
  canUserModify(){return true;}
  async update(changes){applyChanges(this,changes); return changes;}
  getFlag(scope,key){return this._flags.get(scope+"."+key) ?? null;}
  async setFlag(scope,key,value){this._flags.set(scope+"."+key,value); return value;}
};

const { TierraMagicaActor }=await import("../scripts/documents/actor.mjs");
installFamiliarGuards(TierraMagicaActor);
installFormulaGuards(TierraMagicaActor);
installActionEconomyGuards(TierraMagicaActor);

function character(overrides={}){
  const system={
    details:{level:1},
    attributes:{
      fue:{value:1},agi:{value:2},vig:{value:2},int:{value:2},per:{value:2},vol:{value:3},pre:{value:1}
    },
    skills:{channeling:{rank:2}},
    resources:{health:{value:10,max:14},mana:{value:9,max:15}},
    derived:{healthMax:14,manaMax:15,movement:6},
    recovery:{healthCap:14,healthUsed:false,manaUsed:false},
    alchemy:{saturatedFamilies:[]},
    status:{trauma:0,fatigue:0,incapacitated:false},
    turn:{action:true,reaction:true,movementSpent:0,extraMovement:0},
    combat:{},
    magic:{sustainedSpellIds:[]},
    creation:{status:"complete"}
  };
  const actor=new TierraMagicaActor({id:"c13",name:"C13",type:"character",system,items:[]});
  for(const [path,value] of Object.entries(overrides)) applyChanges(actor,{[path]:value});
  return actor;
}

function item(data){
  return {
    ...data,
    system:{...(data.system ?? {})},
    async update(changes){applyChanges(this,changes); return changes;}
  };
}

test("CREA-13 13D: 0 Vida aplica una sola vez Trauma y curar por encima de 0 sólo retira Incapacitado",async()=>{
  const actor=character({
    "system.resources.health.value":3,
    "system.recovery.healthCap":8,
    "system.magic.sustainedSpellIds":["spell-a","spell-b"]
  });
  await actor.adjustResource("health",-3);
  assert.equal(actor.system.resources.health.value,0);
  assert.equal(actor.system.status.incapacitated,true);
  assert.equal(actor.system.status.trauma,1);
  assert.deepEqual(actor.system.magic.sustainedSpellIds,[]);

  await actor.adjustResource("health",-5);
  assert.equal(actor.system.resources.health.value,0);
  assert.equal(actor.system.status.trauma,1);

  assert.equal(await applyBoundedHealing(actor,4),4);
  assert.equal(actor.system.resources.health.value,4);
  assert.equal(actor.system.status.incapacitated,false);
  assert.equal(actor.system.status.trauma,1);
});

test("CREA-13 13D: Respiro, Descanso y Completo respetan lesión, usos, Maná y Trauma",async()=>{
  const actor=character({
    "system.resources.health.value":0,
    "system.resources.mana.value":3,
    "system.recovery.healthCap":6,
    "system.status.incapacitated":true,
    "system.status.trauma":1,
    "system.status.fatigue":2,
    "system.turn.action":false,
    "system.turn.reaction":false,
    "system.alchemy.saturatedFamilies":["restaurativa"]
  });

  await actor.rest("breather");
  assert.deepEqual(actor.system.alchemy.saturatedFamilies,[]);
  assert.equal(actor.system.resources.health.value,0);
  assert.equal(actor.system.resources.mana.value,3);
  assert.equal(actor.system.status.incapacitated,true);

  await actor.rest("rest");
  assert.equal(actor.system.resources.health.value,4); // VIG 2 + 2
  assert.equal(actor.system.resources.mana.value,7);   // VOL 3 + 1
  assert.equal(actor.system.recovery.healthUsed,true);
  assert.equal(actor.system.recovery.manaUsed,true);
  assert.equal(actor.system.status.incapacitated,false);
  assert.equal(actor.system.status.trauma,1);
  assert.equal(actor.system.turn.action,false);
  assert.equal(actor.system.turn.reaction,false);

  await actor.rest("rest");
  assert.equal(actor.system.resources.health.value,4);
  assert.equal(actor.system.resources.mana.value,7);

  await actor.rest("full");
  assert.equal(actor.system.resources.health.value,6);
  assert.equal(actor.system.resources.mana.value,15);
  assert.equal(actor.system.recovery.healthUsed,false);
  assert.equal(actor.system.recovery.manaUsed,false);
  assert.equal(actor.system.status.fatigue,0);
  assert.equal(actor.system.status.trauma,1);
  assert.equal(actor.system.turn.action,false);
  assert.equal(actor.system.turn.reaction,false);
});

test("CREA-13 13D: healthCap limita recuperación pero nunca convierte un descanso en daño",async()=>{
  const actor=character({
    "system.resources.health.value":10,
    "system.recovery.healthCap":8
  });
  await actor.rest("rest");
  assert.equal(actor.system.resources.health.value,10);
  await actor.rest("full");
  assert.equal(actor.system.resources.health.value,10);
});

test("CREA-13 13D: Saturación bloquea segunda dosis sin gastar consumible y Respiro reabre la familia",async()=>{
  const actor=character({
    "system.resources.health.value":5,
    "system.recovery.healthCap":10
  });
  const potion=item({
    id:"potion",type:"formula",name:"Poción Restauradora",
    system:{quantity:2,saturating:true,family:"restaurativa",effect:"Recupera 4 Vida."}
  });

  const first=await actor.useFormula(potion);
  assert.ok(first);
  assert.equal(actor.system.resources.health.value,9);
  assert.equal(potion.system.quantity,1);
  assert.deepEqual(actor.system.alchemy.saturatedFamilies,["restaurativa"]);
  assert.equal(actor.system.turn.action,true);

  actor.system.turn.action=true;
  const blocked=await actor.useFormula(potion);
  assert.equal(blocked,null);
  assert.equal(actor.system.turn.action,true);
  assert.equal(potion.system.quantity,1);
  assert.equal(actor.system.resources.health.value,9);

  await actor.rest("breather");
  assert.deepEqual(actor.system.alchemy.saturatedFamilies,[]);
  assert.equal(actor.system.resources.health.value,9);
  assert.equal(actor.system.resources.mana.value,9);

  const second=await actor.useFormula(potion);
  assert.ok(second);
  assert.equal(actor.system.resources.health.value,10);
  assert.equal(potion.system.quantity,0);
  assert.equal(actor.system.turn.action,true);
});

test("CREA-13 13D: Sobrecarga conserva coste de Maná/Fatiga, con Acción manual",async()=>{
  const spell={
    id:"spell-overload",type:"spell",name:"Prueba de Sobrecarga",
    system:{
      method:"direct",grade:"basic",manaCost:3,requirements:null,
      difficulty:12,defense:"df",discipline:"evocation",attribute:"int",sustained:false
    }
  };

  const invalid=character({"system.resources.mana.value":1});
  invalid.rollCheck=async()=>{throw new Error("no debe tirar");};
  assert.equal(await invalid.useSpell(spell),null);
  assert.equal(invalid.system.resources.mana.value,1);
  assert.equal(invalid.system.status.fatigue,0);
  assert.equal(invalid.system.turn.action,true);

  const failed=character({"system.resources.mana.value":2});
  let calls=0;
  failed.rollCheck=async()=>{calls+=1; return {total:16,rolls:[{total:16}]};};
  const result=await failed.useSpell(spell);
  assert.equal(result.tmSpellAborted,true);
  assert.equal(result.tmActionResolved,true);
  assert.equal(calls,1);
  assert.equal(failed.system.resources.mana.value,0);
  assert.equal(failed.system.status.fatigue,2);
  assert.equal(failed.system.turn.action,true);
});

test("CREA-13 13D: Sobrecarga exitosa conserva las dos resoluciones independientes ratificadas",async()=>{
  const actor=character({"system.resources.mana.value":2});
  const totals=[17,14];
  const labels=[];
  actor.rollCheck=async(options)=>{
    labels.push(options.label);
    const total=totals.shift();
    return {total,rolls:[{total}]};
  };
  const spell={
    id:"spell-overload-ok",type:"spell",name:"Prueba estable",
    system:{
      method:"direct",grade:"basic",manaCost:3,requirements:null,
      difficulty:12,defense:"df",discipline:"evocation",attribute:"int",sustained:false
    }
  };
  const result=await actor.useSpell(spell);
  assert.ok(result);
  assert.equal(labels.length,2);
  assert.match(labels[0],/^Sobrecarga:/);
  assert.match(labels[1],/^Hechizo:/);
  assert.equal(actor.system.resources.mana.value,0);
  assert.equal(actor.system.status.fatigue,2);
  assert.equal(actor.system.turn.action,true);
});

test("CREA-13 13D: curarse durante un turno iniciado a 0 Vida no devuelve economía retroactiva",async()=>{
  const actor=character({
    "system.resources.health.value":0,
    "system.recovery.healthCap":8,
    "system.status.incapacitated":true
  });
  const combat={id:"combat-13d",round:1};
  const combatant={id:"combatant-13d"};

  assert.equal(await resetActorTurnForCombat(actor,combat,combatant),true);
  assert.equal(actor.system.turn.action,false);
  assert.equal(actor.system.turn.reaction,false);
  assert.equal(actor.system.turn.movementSpent,6);

  await applyBoundedHealing(actor,4);
  assert.equal(actor.system.status.incapacitated,false);
  assert.equal(actor.system.resources.health.value,4);
  assert.equal(actor.system.turn.action,false);
  assert.equal(actor.system.turn.reaction,false);
  assert.equal(movementRemaining(actor),0);

  assert.equal(await resetActorTurnForCombat(actor,{id:"combat-13d",round:2},combatant),true);
  assert.equal(actor.system.turn.action,true);
  assert.equal(actor.system.turn.reaction,true);
  assert.equal(actor.system.turn.movementSpent,0);
  assert.equal(movementRemaining(actor),6);
});

test("CREA-13 13D: Familiar cae y se recupera sin Trauma, sin Maná propio y sin economía independiente",async()=>{
  const familiar=new TierraMagicaActor({
    id:"fam",uuid:"Actor.fam",name:"Familiar",type:"familiar",items:[],
    system:{
      details:{},
      attributes:{vig:{value:2},vol:{value:2},agi:{value:2},per:{value:2}},
      skills:{},
      resources:{health:{value:2,max:5},mana:{value:5,max:5}},
      derived:{healthMax:5,manaMax:0,movement:6},
      recovery:{healthCap:5},
      status:{trauma:0,incapacitated:false},
      familiar:{incapacitated:false},
      turn:{action:false,reaction:false,movementSpent:0,extraMovement:0},
      combat:{},magic:{sustainedSpellIds:[]},creation:{status:"complete"}
    }
  });

  await familiar.adjustResource("health",-2);
  assert.equal(familiar.system.resources.health.value,0);
  assert.equal(familiar.system.status.incapacitated,true);
  assert.equal(familiar.system.familiar.incapacitated,true);
  assert.equal(familiar.system.status.trauma,0);

  await applyBoundedHealing(familiar,2);
  assert.equal(familiar.system.resources.health.value,2);
  assert.equal(familiar.system.status.incapacitated,false);
  assert.equal(familiar.system.familiar.incapacitated,false);
  assert.equal(familiar.system.status.trauma,0);

  await reconcileActorResources(familiar);
  assert.equal(familiar.system.resources.mana.value,0);
  assert.equal(await resetActorTurnForCombat(familiar,{id:"combat-fam",round:1},{id:"cf"}),false);
  assert.equal(familiar.system.turn.action,false);
  assert.equal(familiar.system.turn.reaction,false);
});
