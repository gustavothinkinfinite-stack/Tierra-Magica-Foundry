import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { craftingProjectSourceFromReference } from "../scripts/rules/crafting-catalog.mjs";
import {
  executeAuthorityRequestForAudit,
  prepareCraftingProjectAuthoritatively
} from "../scripts/rules/state-authority.mjs";
import { installCraftingMagicGuards } from "../scripts/rules/crafting-magic-runtime.mjs";
import { installFormulaGuards } from "../scripts/rules/formula-guards.mjs";

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
    node[keys[0]]=structuredClone(value);
  }
}

const gm={id:"gm",active:true,isGM:true};
const player={id:"player",active:true,isGM:false};
const other={id:"other",active:true,isGM:false};
const documents=new Map();

globalThis.ui={notifications:{
  warn:(message)=>({ok:false,error:String(message)}),
  info:(message)=>message
}};
globalThis.foundry={utils:{
  randomID:()=>"audit-"+Math.random().toString(36).slice(2),
  deepClone:(value)=>structuredClone(value),
  escapeHTML:(value)=>String(value)
}};
globalThis.ChatMessage={
  getSpeaker:({actor})=>({actor:actor?.id}),
  create:async(data)=>data
};
globalThis.game={user:gm,users:[gm,player,other]};
globalThis.fromUuid=async(uuid)=>documents.get(String(uuid))??null;

function flagged(base){
  const flags={};
  return {
    ...base,
    getFlag(scope,key){return flags[scope]?.[key];},
    async setFlag(scope,key,value){
      flags[scope] ??= {};
      flags[scope][key]=structuredClone(value);
      return value;
    }
  };
}

function itemCollection(){
  const values=[];
  values.get=(id)=>values.find((item)=>String(item.id)===String(id))??null;
  return values;
}

function projectActor(id="project-owner"){
  const items=itemCollection();
  const actor=flagged({
    id,
    uuid:"Actor."+id,
    type:"character",
    system:{
      creation:{status:"complete"},
      skills:{engineering:{rank:4},investigation:{rank:4},crafting:{rank:5}},
      resources:{health:{value:10,max:10}},
      status:{incapacitated:false}
    },
    items,
    isOwner:true,
    canUserModify(user){return Boolean(user?.isGM)||["player","other"].includes(user?.id);},
    async update(changes){applyChanges(this,changes);return changes;}
  });
  documents.set(actor.uuid,actor);
  return actor;
}

function makeProject(actor,ref,id){
  const source=craftingProjectSourceFromReference(ref,{catalog:[]});
  const project=flagged({
    id,
    uuid:actor.uuid+".Item."+id,
    name:source.name,
    type:"project",
    parent:actor,
    system:structuredClone(source.system),
    isOwner:true,
    canUserModify(user){return Boolean(user?.isGM)||["player","other"].includes(user?.id);},
    async update(changes){applyChanges(this,changes);return changes;}
  });
  actor.items.push(project);
  documents.set(project.uuid,project);
  return project;
}

function request({id,requesterId,action,payload}){
  return {scope:"state-authority",kind:"request",requestId:id,requesterId,action,payload};
}

test("CRAFT-13I autoridad: un propietario no puede autoaprobar Borrador ni adjudicar Investigación",async()=>{
  const actor=projectActor("authority-project");
  const project=makeProject(actor,"REF-INV-01","research");

  const deniedPrepare=await executeAuthorityRequestForAudit(request({
    id:"player-prepare",
    requesterId:"player",
    action:"craft-prepare",
    payload:{projectUuid:project.uuid,expectedRevision:0}
  }));
  assert.equal(deniedPrepare.ok,false);
  assert.match(deniedPrepare.error,/Sólo un DJ/);
  assert.equal(project.system.state,"draft");

  const gmPrepare=await executeAuthorityRequestForAudit(request({
    id:"gm-prepare",
    requesterId:"gm",
    action:"craft-prepare",
    payload:{projectUuid:project.uuid,expectedRevision:0}
  }));
  assert.equal(gmPrepare.ok,true);
  assert.equal(project.system.state,"ready");

  const deniedResearch=await executeAuthorityRequestForAudit(request({
    id:"player-research",
    requesterId:"player",
    action:"craft-research-resolve",
    payload:{projectUuid:project.uuid,expectedRevision:1,result:"hazana",attemptKey:"inventado"}
  }));
  assert.equal(deniedResearch.ok,false);
  assert.match(deniedResearch.error,/Sólo un DJ/);
});

test("CRAFT-13I autoridad local: Preparar funciona sin socket cuando el usuario actual es DJ",async()=>{
  const actor=projectActor("local-prepare");
  const project=makeProject(actor,"REF-INV-02","research-local");
  globalThis.game.user=gm;
  const result=await prepareCraftingProjectAuthoritatively(project);
  assert.equal(result.ok,true);
  assert.equal(project.system.state,"ready");
  globalThis.game.user=gm;
});

class MagicActor {
  constructor(id){
    this.id=id;
    this.uuid="Actor."+id;
    this.name=id;
    this.type="character";
    this.items=itemCollection();
    this.system={
      magic:{sustainedSpellIds:[],sustainedObjectIds:[],linkedImprintClaims:{},automaticEventClaims:{},preparedTrap:{trapUuid:"",triggerKey:""}},
      resources:{mana:{value:10,max:10},health:{value:10,max:10}},
      turn:{action:true,reaction:true},
      status:{incapacitated:false}
    };
    this.isOwner=true;
    this._flags={};
    documents.set(this.uuid,this);
  }
  canUserModify(user){return Boolean(user?.isGM)||["player","other"].includes(user?.id);}
  getFlag(scope,key){return this._flags[scope]?.[key];}
  async setFlag(scope,key,value){this._flags[scope]??={};this._flags[scope][key]=structuredClone(value);return value;}
  async update(changes){applyChanges(this,changes);return changes;}
  add(item){
    item.parent=this;
    item.uuid=this.uuid+".Item."+item.id;
    this.items.push(item);
    documents.set(item.uuid,item);
    return item;
  }
}
installCraftingMagicGuards(MagicActor);

function magicItem(actor,{id,grade=1,functionalKey="",reserve=6,boundSpell=null}={}){
  return actor.add({
    id,
    name:id,
    type:"equipment",
    system:{
      condition:"operative",
      enchantment:{
        grade,
        patternKey:"",
        functionalKey,
        passiveKey:"",
        utilityKey:"",
        reserve:{value:reserve,max:grade===2?10:6},
        attunedActorUuid:"",
        seal:false,
        boundSpell
      }
    },
    async update(changes){applyChanges(this,changes);return changes;}
  });
}

test("CRAFT-13I multiusuario: Sintonización concurrente revalida capacidad en la autoridad del DJ",async()=>{
  const actor=new MagicActor("attunement-race");
  const one=magicItem(actor,{id:"one",grade:2,functionalKey:"effect-a",reserve:0});
  const two=magicItem(actor,{id:"two",grade:2,functionalKey:"effect-b",reserve:0});

  const [a,b]=await Promise.all([
    executeAuthorityRequestForAudit(request({
      id:"attune-a",requesterId:"player",action:"craft-magic-runtime",
      payload:{actorUuid:actor.uuid,operation:"attune",itemUuid:one.uuid,elapsedMinutes:60,functionKnown:true}
    })),
    executeAuthorityRequestForAudit(request({
      id:"attune-b",requesterId:"other",action:"craft-magic-runtime",
      payload:{actorUuid:actor.uuid,operation:"attune",itemUuid:two.uuid,elapsedMinutes:60,functionKnown:true}
    }))
  ]);

  assert.equal([a,b].filter((row)=>row?.ok).length,1);
  assert.equal([one,two].filter((item)=>item.system.enchantment.attunedActorUuid===actor.uuid).length,1);
  assert.equal(one.system.enchantment.reserve.value+two.system.enchantment.reserve.value,0);
});

test("CRAFT-13I multiusuario: dos clientes no pueden gastar la misma ventana de Acción/RE encantada",async()=>{
  const actor=new MagicActor("re-race");
  const item=magicItem(actor,{
    id:"brooch",
    grade:1,
    functionalKey:"barrier-defense",
    reserve:6,
    boundSpell:{slug:"barrera-cinetica",manaCost:3,activation:"Acción",sustained:false}
  });
  item.system.enchantment.attunedActorUuid=actor.uuid;

  const [a,b]=await Promise.all([
    executeAuthorityRequestForAudit(request({
      id:"re-a",requesterId:"player",action:"craft-magic-runtime",
      payload:{actorUuid:actor.uuid,operation:"activate-enchantment",itemUuid:item.uuid}
    })),
    executeAuthorityRequestForAudit(request({
      id:"re-b",requesterId:"other",action:"craft-magic-runtime",
      payload:{actorUuid:actor.uuid,operation:"activate-enchantment",itemUuid:item.uuid}
    }))
  ]);

  assert.equal([a,b].filter((row)=>row?.ok).length,1);
  assert.equal(item.system.enchantment.reserve.value,3);
  assert.equal(actor.system.turn.action,false);
});

function trap(actor,id,key){
  return actor.add({
    id,name:id,type:"equipment",
    system:{
      condition:"operative",
      trap:{
        enabled:true,frame:"standard",precision:4,mechanismDf:12,
        triggerType:"contact",physicalTriggerKey:key,automatic:true,state:"armed",baseTimeMinutes:120,
        concealment:{grade:"visible",detectionDf:0,environmentAllows:true,environmentMethod:false},
        deactivationMethod:"AGI + Latrocinio",bypassKey:"",bypassDescription:"",
        load:{kind:"alarm",profileRef:"",componentUuid:"",maneuverEffect:"",damage:0,penetration:0,area:"",geometryRef:""}
      }
    },
    async update(changes){applyChanges(this,changes);return changes;}
  });
}

test("CRAFT-13I multiusuario: un mismo evento físico concurrente sólo descarga una trampa ordinaria",async()=>{
  const owner=new MagicActor("trap-owner");
  const target=new MagicActor("trap-target");
  const one=trap(owner,"trap-one","plate-a");
  const two=trap(owner,"trap-two","plate-b");

  const [a,b]=await Promise.all([
    executeAuthorityRequestForAudit(request({
      id:"trap-a",requesterId:"player",action:"craft-magic-runtime",
      payload:{actorUuid:owner.uuid,operation:"trigger-trap",trapUuid:one.uuid,targetActorUuid:target.uuid,eventId:"event-1",eventType:"contact",physicalTriggerKey:"plate-a"}
    })),
    executeAuthorityRequestForAudit(request({
      id:"trap-b",requesterId:"other",action:"craft-magic-runtime",
      payload:{actorUuid:owner.uuid,operation:"trigger-trap",trapUuid:two.uuid,targetActorUuid:target.uuid,eventId:"event-1",eventType:"contact",physicalTriggerKey:"plate-b"}
    }))
  ]);
  assert.equal([a,b].filter((row)=>row?.ok).length,1);
  assert.equal([one,two].filter((entry)=>entry.system.trap.state==="discharged").length,1);
  assert.equal(Object.keys(target.system.magic.automaticEventClaims).length,1);
});

class FormulaActor {
  constructor(id){
    this.id=id;
    this.uuid="Actor."+id;
    this.name=id;
    this.type="character";
    this.items=itemCollection();
    this.system={alchemy:{saturatedFamilies:[]}};
    this.isOwner=true;
    this._flags={};
    documents.set(this.uuid,this);
  }
  canUserModify(user){return Boolean(user?.isGM)||["player","other"].includes(user?.id);}
  getFlag(scope,key){return this._flags[scope]?.[key];}
  async setFlag(scope,key,value){this._flags[scope]??={};this._flags[scope][key]=structuredClone(value);return value;}
  async update(changes){applyChanges(this,changes);return changes;}
  async useFormula(){return {ok:true};}
  add(item){item.parent=this;item.uuid=this.uuid+".Item."+item.id;this.items.push(item);documents.set(item.uuid,item);return item;}
}
installFormulaGuards(FormulaActor);

test("CRAFT-13I multiusuario: una dosis contextual sólo puede consumirse una vez",async()=>{
  const actor=new FormulaActor("formula-race");
  const dose=actor.add({
    id:"tonic",name:"Tónico de Vigor",type:"formula",
    system:{quantity:1,saturating:true,family:"potenciador",effect:"Ventaja contextual"},
    async update(changes){applyChanges(this,changes);return changes;}
  });
  const [a,b]=await Promise.all([
    executeAuthorityRequestForAudit(request({
      id:"formula-a",requesterId:"player",action:"formula-use",
      payload:{actorUuid:actor.uuid,itemUuid:dose.uuid}
    })),
    executeAuthorityRequestForAudit(request({
      id:"formula-b",requesterId:"other",action:"formula-use",
      payload:{actorUuid:actor.uuid,itemUuid:dose.uuid}
    }))
  ]);
  assert.equal([a,b].filter((row)=>row?.ok).length,1);
  assert.equal(dose.system.quantity,0);
  assert.deepEqual(actor.system.alchemy.saturatedFamilies,["potenciador"]);
});

test("CRAFT-13I: wiring final no deja Preparar/Investigación como mutaciones sólo de UI",async()=>{
  const authority=await readFile(new URL("../scripts/rules/state-authority.mjs",import.meta.url),"utf8");
  const itemSheet=await readFile(new URL("../scripts/sheets/item-sheet.mjs",import.meta.url),"utf8");
  const actor=await readFile(new URL("../scripts/documents/actor.mjs",import.meta.url),"utf8");
  assert.equal((authority.match(/if \(action === "craft-prepare"\) return prepareCraftingProject/g)||[]).length,2);
  assert.match(authority,/\["craft-prepare","craft-research-resolve"\].*!requesterIsGm/s);
  assert.match(itemSheet,/canResolveResearch:Boolean\(game\.user\?\.isGM\)/);
  assert.match(actor,/resolvedRollTotal\(roll\) >= 17/);
  assert.equal((actor.match(/resolvedRollTotal\(roll\) >= 16/g)||[]).length,2);
});
