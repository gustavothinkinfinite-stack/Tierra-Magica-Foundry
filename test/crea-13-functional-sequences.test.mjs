import test from "node:test";
import assert from "node:assert/strict";
import { TM_CONFIG } from "../scripts/config.mjs";
import { prepareRuleElements } from "../scripts/rules/rule-elements.mjs";
import { deriveActorState, resolveDerivedSelector } from "../scripts/rules/derived-state.mjs";
import { resolveWeaponImpact } from "../scripts/rules/combat-impact.mjs";
import { healingAmount, applyBoundedHealing } from "../scripts/rules/healing-delivery.mjs";
import { movementRemaining, spendActorMovement } from "../scripts/rules/turn-economy.mjs";
import { spellTargetOutcomes } from "../scripts/rules/magic-guards.mjs";
import { resolveSpellImpacts } from "../scripts/rules/spell-impact.mjs";
import { installFormulaGuards } from "../scripts/rules/formula-guards.mjs";
import { installActionEconomyGuards } from "../scripts/rules/action-economy-guards.mjs";
import { installReactionEconomyGuards } from "../scripts/rules/reaction-economy-guards.mjs";
import { installFamiliarGuards } from "../scripts/rules/familiar-guards.mjs";
import { buildAllCrea13Fixtures } from "./fixtures/crea-13-builds.mjs";

const clone=(value)=>JSON.parse(JSON.stringify(value));
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

function applySystemChanges(actor,changes){
  for(const [path,value] of Object.entries(changes)){
    const keys=path.split(".");
    if(keys[0]==="system") keys.shift();
    let target=actor.system;
    while(keys.length>1){
      const key=keys.shift();
      target[key] ??= {};
      target=target[key];
    }
    target[keys[0]]=value;
  }
}

globalThis.Actor=class {
  constructor(data={}){
    this.name=data.name ?? "Actor";
    this.id=data.id ?? data.uuid ?? this.name;
    this.uuid=data.uuid ?? "Actor."+this.id;
    this.type=data.type ?? "character";
    this.system=data.system ?? {};
    this.items=data.items ?? [];
    this.isOwner=true;
  }
  prepareDerivedData(){}
  canUserModify(){return true;}
  async update(changes){applySystemChanges(this,changes); return changes;}
};

const { TierraMagicaActor }=await import("../scripts/documents/actor.mjs");
installFormulaGuards(TierraMagicaActor);
installActionEconomyGuards(TierraMagicaActor);

function build(key){
  return buildAllCrea13Fixtures().find((entry)=>entry.profile.key===key);
}

function equip(actor){
  for(const item of actor.items){
    if(["weapon","armor","shield"].includes(item.type)) item.system.equipped=true;
  }
}

function prepare(actor){
  const prepared=prepareRuleElements(actor.items,{skillDefinitions:TM_CONFIG.skills});
  const derived=deriveActorState({
    actorType:actor.type,
    system:actor.system,
    items:actor.items,
    rulePreparation:prepared,
    defensiveRankBonuses:TM_CONFIG.defensiveRankBonuses
  });
  actor.system.derived=derived;
  return derived;
}

function itemDocument(source){
  const item=clone(source);
  item.update=async function(changes){
    for(const [path,value] of Object.entries(changes)){
      const keys=path.split(".");
      if(keys[0]==="system") keys.shift();
      let target=this.system;
      while(keys.length>1){
        const key=keys.shift();
        target[key] ??= {};
        target=target[key];
      }
      target[keys[0]]=value;
    }
    return changes;
  };
  return item;
}

test("CREA-13 13C C13-01 Soldado: defensa contextual y daño físico usan la misma preparación",()=>{
  const {actor}=build("soldier");
  equip(actor);
  actor.system.combat.guardActive=true;
  actor.system.combat.parryActive=true;
  const derived=prepare(actor);

  assert.equal(derived.defense,17); // 15 base + Guardia 2
  assert.equal(resolveDerivedSelector(derived,"defense",{frontal:true,parryable:true}).total,20);
  assert.equal(resolveDerivedSelector(derived,"defense",{frontal:false,parryable:false}).total,17);

  const sword=actor.items.find((item)=>item.name==="Espada larga");
  const target={system:{derived:{
    protection:1,severeThreshold:7,
    contextual:{protection:[]},
    breakdowns:{protection:{contributions:[{value:1,equipmentType:"armor"}]}}
  }}};
  const impact=resolveWeaponImpact(sword,actor,target);
  assert.equal(impact.rawDamage,8);
  assert.equal(impact.damage,7);
  assert.equal(impact.severe,true);
});

test("CREA-13 13C C13-02 Ingeniera: dispositivo consume Energía y Caudal con Acción manual",async()=>{
  const source=build("engineer").actor;
  const actor=new TierraMagicaActor({
    id:source.id,name:source.name,type:"character",system:clone(source.system),items:[]
  });
  actor.system.turn={action:true,reaction:true};
  actor.system.resources.health.value=1;

  const device=itemDocument({
    id:"c13-device",
    type:"device",
    name:"Herramienta motorizada de prueba",
    system:{
      condition:"operative",
      energy:{value:4,max:4},
      flow:2,
      consumption:2,
      effect:"Acciona un mecanismo de campo."
    }
  });

  const first=await actor.useDevice(device);
  assert.ok(first);
  assert.equal(device.system.energy.value,2);
  assert.equal(actor.system.turn.action,true);

  actor.system.turn.action=true;
  const second=await actor.useDevice(device);
  assert.ok(second);
  assert.equal(device.system.energy.value,0);
  assert.equal(actor.system.turn.action,true);

  actor.system.turn.action=true;
  const third=await actor.useDevice(device);
  assert.equal(third,null);
  assert.equal(device.system.energy.value,0);
  assert.equal(actor.system.turn.action,true);
});

test("CREA-13 13C C13-03 Sanador: la recuperación respeta máximo y límite de lesión sin alterar Trauma",async()=>{
  const buildData=build("healer");
  const derived=prepare(buildData.actor);
  const target={
    system:{
      derived:{healthMax:derived.healthMax},
      resources:{health:{value:6,max:999}},
      recovery:{healthCap:10},
      status:{trauma:1}
    },
    async update(changes){applySystemChanges(this,changes);}
  };
  assert.equal(healingAmount(target,4),4);
  assert.equal(await applyBoundedHealing(target,4),4);
  assert.equal(target.system.resources.health.value,10);
  assert.equal(target.system.status.trauma,1);
  assert.equal(healingAmount(target,4),0);
});

test("CREA-13 13C C13-04 Exploradora: Movimiento fraccionado y rifle no añaden FUE al daño",async()=>{
  const {actor}=build("explorer");
  equip(actor);
  const derived=prepare(actor);
  const mover={
    type:"character",
    system:{derived:{movement:derived.movement},turn:{movementSpent:0,extraMovement:0},status:{incapacitated:false},resources:{health:{value:10}}},
    async update(changes){applySystemChanges(this,changes);}
  };
  assert.equal(movementRemaining(mover),6);
  assert.equal(await spendActorMovement(mover,2.5),true);
  assert.equal(movementRemaining(mover),3.5);
  assert.equal(await spendActorMovement(mover,3.5),true);
  assert.equal(movementRemaining(mover),0);
  assert.equal(await spendActorMovement(mover,0.1),false);

  const rifle=actor.items.find((item)=>item.name==="Rifle temprano");
  const target={system:{derived:{
    protection:3,severeThreshold:7,
    contextual:{protection:[]},
    breakdowns:{protection:{contributions:[{value:3,equipmentType:"armor"}]}}
  }}};
  const impact=resolveWeaponImpact(rifle,actor,target);
  assert.equal(impact.attributeKey,"");
  assert.equal(impact.rawDamage,7);
  assert.equal(impact.penetration,3);
  assert.equal(impact.damage,7);
});

test("CREA-13 13C C13-05 Alquimista: conocimiento no equivale a dosis y una dosis explícita se consume una sola vez",async()=>{
  const source=build("alchemist").actor;
  const actor=new TierraMagicaActor({
    id:source.id,name:source.name,type:"character",system:clone(source.system),items:[]
  });
  actor.system.turn={action:true,reaction:true};
  actor.system.resources.health.value=1;

  const formula=itemDocument(source.items.find((item)=>item.name==="Toxina Debilitante"));
  assert.equal(formula.system.quantity,0);
  assert.equal(await actor.useFormula(formula),null);
  assert.equal(actor.system.turn.action,true);
  assert.equal(formula.system.quantity,0);

  formula.system.quantity=1;
  const used=await actor.useFormula(formula);
  assert.ok(used);
  assert.equal(formula.system.quantity,0);
  assert.equal(actor.system.turn.action,true);

  actor.system.turn.action=true;
  assert.equal(await actor.useFormula(formula),null);
  assert.equal(formula.system.quantity,0);
  assert.equal(actor.system.turn.action,true);
});

test("CREA-13 13C C13-06 Canalizador: ataque mágico, Sostenimiento y Protección contextual permanecen coherentes",()=>{
  const {actor}=build("channeler");
  const projectile=actor.items.find((item)=>item.name==="Proyectil Ígneo");
  const target={
    id:"target",
    system:{derived:{
      defense:14,
      protection:1,
      severeThreshold:7,
      contextual:{defense:[],protection:[]},
      breakdowns:{protection:{contributions:[{value:1,equipmentType:"armor"}]}}
    }}
  };
  const outcomes=spellTargetOutcomes(projectile,[target],14);
  assert.equal(outcomes.length,1);
  assert.equal(outcomes[0].success,true);
  const [impact]=resolveSpellImpacts(projectile,[target]);
  assert.equal(impact.damage,6);
  assert.equal(impact.severe,false);

  const skin=actor.items.find((item)=>item.name==="Piel Alterada");
  actor.system.magic.sustainedSpellIds=[skin.id];
  const derived=prepare(actor);
  assert.equal(derived.protection,0);
  assert.equal(resolveDerivedSelector(derived,"protection",{alteredSkinCompatible:true}).total,2);
  assert.equal(resolveDerivedSelector(derived,"protection",{alteredSkinCompatible:false}).total,0);
});

test("CREA-13 13C transversal: Barrera Cinética y Familiar se ejecutan sin bloqueo de Reacción",async()=>{
  class ReactiveActor {
    constructor(){
      this.name="Canalizador";
      this.system={turn:{action:true,reaction:true},status:{incapacitated:false},resources:{health:{value:10}}};
      this.calls=[];
    }
    async update(changes){applySystemChanges(this,changes);}
    async useSpell(){this.calls.push("barrier"); await new Promise((resolve)=>setTimeout(resolve,10)); return {ok:true};}
    async useFormula(){return null;}
    async useDevice(){return null;}
    async overloadDevice(){return null;}
    async rollWeapon(){return null;}
    async dualWieldAttack(){return null;}
    async sweepAttack(){return null;}
    async linkedFamiliarAction(){this.calls.push("familiar"); await new Promise((resolve)=>setTimeout(resolve,10)); this.system.turn.reaction=false; return {ok:true};}
  }
  installActionEconomyGuards(ReactiveActor);
  installReactionEconomyGuards(ReactiveActor);
  const actor=new ReactiveActor();
  const barrier={system:{activation:"Reacción"}};
  const [a,b]=await Promise.all([actor.useSpell(barrier),actor.linkedFamiliarAction()]);
  assert.equal(actor.calls.length,2);
  assert.equal(actor.system.turn.reaction,false); // el stub de Familiar actualiza el indicador por sí solo
  assert.equal([a,b].filter(Boolean).length,2);
});

test("CREA-13 13C C13-07 Vinculado: Acción Vinculada deja indicador manual y no crea turno del Familiar",async()=>{
  class BondActor {
    constructor({uuid,name,type="character",system={},items=[]}){
      Object.assign(this,{uuid,name,type,system,items});
    }
    prepareDerivedData(){}
    async update(changes){applySystemChanges(this,changes); return changes;}
  }
  installFamiliarGuards(BondActor);

  const ownerBuild=build("bonded").actor;
  const owner=new BondActor({
    uuid:"Actor.owner",name:ownerBuild.name,items:ownerBuild.items,
    system:{turn:{action:true,reaction:true},resources:{health:{value:10,max:14},mana:{value:12,max:12}},status:{trauma:0},derived:{healthMax:14,manaMax:12}}
  });
  const familiar=new BondActor({
    uuid:"Actor.familiar",name:"Familiar",type:"familiar",
    system:{
      details:{ownerUuid:"Actor.owner"},
      familiar:{bondLevel:1,incapacitated:false,currentOrder:"",orderType:"none",controlMode:"autonomous"},
      turn:{action:true,reaction:true},
      resources:{health:{value:5,max:5},mana:{value:0,max:0}},
      status:{trauma:0,incapacitated:false},
      derived:{healthMax:5,manaMax:0}
    }
  });
  familiar.prepareDerivedData();
  assert.equal(familiar.system.turn.action,false);
  assert.equal(familiar.system.turn.reaction,false);

  const message=await owner.linkedFamiliarAction(familiar,"distraer al atacante");
  assert.ok(message);
  assert.equal(owner.system.turn.reaction,true);
  assert.equal(owner.system.turn.action,true);
  assert.equal(familiar.system.familiar.currentOrder,"distraer al atacante");
  assert.equal(familiar.system.familiar.orderType,"linked");
  assert.equal(familiar.system.turn.action,false);
  assert.equal(familiar.system.turn.reaction,false);
});
