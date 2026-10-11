import test from "node:test";
import assert from "node:assert/strict";
import { executeGatheringRequest } from "../scripts/rules/gathering-service.mjs";
import { DEFAULT_GATHERING_RESOURCES } from "../scripts/rules/gathering.mjs";

function fixture({total=20,token=true}={}){
  const gm={id:"gm",isGM:true,viewedScene:"scene1"};
  const player={id:"player",isGM:false,viewedScene:"scene1"};
  const flags={};
  const items=[];
  let messages=0,rolls=0;
  const actor={
    id:"actor1",uuid:"Actor.actor1",type:"character",name:"Explorador",
    isOwner:true,items,
    system:{attributes:{per:{value:3}},skills:{survival:{bonus:2}}},
    canUserModify:user=>user.id==="player"||user.id==="gm",
    getRollData:()=>({}),
    getFlag:(scope,key)=>flags[key],
    setFlag:async(scope,key,value)=>{flags[key]=structuredClone(value)},
    createEmbeddedDocuments:async(type,docs)=>{
      assert.equal(type,"Item");assert.equal(docs.length,1);
      const source=docs[0];
      const item={type:source.type,system:{...source.system},flags:source.flags,
        getFlag:(scope,key)=>item.flags?.[scope]?.[key],
        update:async changes=>{item.system.quantity=changes["system.quantity"];}};
      items.push(item);
      return [item];
    }
  };
  const scene={
    id:"scene1",tokens:token?[{actorId:"actor1"}]:[],
    getFlag:()=> "forest"
  };
  globalThis.game={
    user:gm,users:[gm,player],time:{worldTime:100},
    scenes:new Map([["scene1",scene]]),
    settings:{get:(scope,key)=>scope==="core"?"public":{entries:DEFAULT_GATHERING_RESOURCES}}
  };
  globalThis.foundry={utils:{escapeHTML:s=>String(s)}};
  globalThis.ChatMessage={getSpeaker:()=>({alias:actor.name})};
  globalThis.Roll=class{
    constructor(formula){this.formula=formula;rolls++;}
    async evaluate(){this.total=total;this.dice=[{results:[{result:3},{result:4}]}];return this;}
    async toMessage(){messages++;return {id:"message1"}}
  };
  return {actor,player,items,flags,scene,counts:()=>({rolls,messages})};
}

test("DJ resuelve, otorga y apila sin duplicar mediante reintentos",async()=>{
  const {actor,items,counts}=fixture();
  const req={sceneId:"scene1",resourceId:"tm-hongos-silvestres"};
  const first=await executeGatheringRequest(actor,req,"player");
  assert.equal(first.ok,true);
  assert.equal(first.quantity,4);
  assert.equal(items.length,1);
  assert.equal(items[0].system.quantity,4);
  const replay=await executeGatheringRequest(actor,req,"player");
  assert.equal(replay.ok,false);
  assert.equal(items.length,1);
  assert.equal(counts().rolls,1);
  game.time.worldTime+=7200;
  const second=await executeGatheringRequest(actor,req,"player");
  assert.equal(second.ok,true);
  assert.equal(items.length,1);
  assert.equal(items[0].system.quantity,8);
  assert.equal(counts().messages,2);
});
test("un jugador no puede recolectar sin token, ni un recurso oculto por ID",async()=>{
  const {actor}=fixture({token:false});
  const result=await executeGatheringRequest(actor,{sceneId:"scene1",resourceId:"tm-hongos-silvestres"},"player");
  assert.equal(result.ok,false);
  assert.match(result.error,/token/);
});
test("un fallo registra el intento sin crear materiales",async()=>{
  const {actor,items}=fixture({total:1});
  const result=await executeGatheringRequest(actor,{sceneId:"scene1",resourceId:"tm-hierbas-medicinales"},"player");
  assert.equal(result.ok,true);assert.equal(result.quantity,0);assert.equal(items.length,0);
});
