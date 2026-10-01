import test from "node:test";
import assert from "node:assert/strict";

const gm={id:"gm",active:true,isGM:true};
const player={id:"player",active:true,isGM:false};
const users=[gm,player];
const actors=new Map();
const responses=[];

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

function flaggedDocument(base){
  const flags={};
  return {
    ...base,
    getFlag(scope,key){return flags[scope]?.[key];},
    async setFlag(scope,key,value){
      flags[scope] ??= {};
      flags[scope][key]=structuredClone(value);
      return value;
    },
    _flags:flags
  };
}

function actor({uuid="Actor.idem",health=12,movement=6,owners=["player"]}={}){
  const items=new Map();
  const value=flaggedDocument({
    uuid,id:uuid,name:"Actor idempotente",type:"character",
    system:{
      derived:{healthMax:16,movement},
      resources:{health:{value:health,max:16}},
      recovery:{healthCap:16},
      status:{incapacitated:false,trauma:0},
      turn:{action:true,reaction:true,movementSpent:0,extraMovement:0},
      combat:{}
    },
    items:{
      get(id){return items.get(id) ?? null;},
      set(id,item){items.set(id,item);}
    },
    canUserModify(user){return Boolean(user?.isGM)||owners.includes(user?.id);},
    async update(changes){applyChanges(this,changes);return changes;}
  });
  actors.set(uuid,value);
  return value;
}

function device(owner,{id="device",energy=8,flow=3}={}){
  const item=flaggedDocument({
    id,uuid:owner.uuid+".Item."+id,name:"Dispositivo",type:"device",
    system:{condition:"operative",energy:{value:energy,max:energy},flow},
    canUserModify(user){return Boolean(user?.isGM)||user?.id==="player";},
    async update(changes){applyChanges(this,changes);return changes;}
  });
  owner.items.set(id,item);
  return item;
}

const listeners=[];
globalThis.game={
  user:gm,
  users,
  socket:{
    on(_channel,handler){listeners.push(handler);},
    emit(_channel,message){responses.push(structuredClone(message));}
  }
};
globalThis.fromUuid=async(uuid)=>actors.get(uuid) ?? null;

const authorityA=await import("../scripts/rules/state-authority.mjs?idempotency-a");
authorityA.installStateAuthorityBridge();

function request({id,action,payload,requesterId="player"}){
  return {
    scope:"state-authority",
    kind:"request",
    requestId:id,
    requesterId,
    action,
    payload
  };
}

test("socket duplicado concurrente: el mismo requestId aplica daño una sola vez",async()=>{
  const target=actor({uuid:"Actor.damage",health:12});
  const msg=request({
    id:"req-damage-1",
    action:"apply-health-damage",
    payload:{targetUuid:target.uuid,amount:5}
  });

  responses.length=0;
  await Promise.all(listeners.map((handler)=>Promise.all([handler(msg),handler(msg)])));

  assert.equal(target.system.resources.health.value,7);
  const matching=responses.filter((entry)=>entry.requestId==="req-damage-1" && entry.kind==="response");
  assert.equal(matching.length,2);
  assert.deepEqual(matching[0].result,matching[1].result);
  assert.equal(matching[0].result.applied,5);

  const receipt=target.getFlag("tierra-magica","authorityReceipts")?.["player:req-damage-1"];
  assert.equal(receipt.state,"completed");
  assert.equal(receipt.result.applied,5);
});

test("reenvío posterior: un requestId completado devuelve el recibo sin repetir daño",async()=>{
  const target=actor({uuid:"Actor.replay",health:12});
  const msg=request({
    id:"req-replay-1",
    action:"apply-health-damage",
    payload:{targetUuid:target.uuid,amount:4}
  });

  const first=await authorityA.executeAuthorityRequestForAudit(msg);
  const afterFirst=target.system.resources.health.value;
  const second=await authorityA.executeAuthorityRequestForAudit(msg);

  assert.equal(first.ok,true);
  assert.deepEqual(second,first);
  assert.equal(afterFirst,8);
  assert.equal(target.system.resources.health.value,8);
});

test("reinicio de autoridad: una instancia nueva respeta el recibo persistente",async()=>{
  const target=actor({uuid:"Actor.restart",health:10});
  const msg=request({
    id:"req-restart-1",
    action:"apply-health-damage",
    payload:{targetUuid:target.uuid,amount:3}
  });

  const first=await authorityA.executeAuthorityRequestForAudit(msg);
  assert.equal(first.ok,true);
  assert.equal(target.system.resources.health.value,7);

  const authorityB=await import("../scripts/rules/state-authority.mjs?idempotency-b");
  const replay=await authorityB.executeAuthorityRequestForAudit(msg);
  assert.deepEqual(replay,first);
  assert.equal(target.system.resources.health.value,7);
});

test("colisión: el mismo requestId no puede reutilizarse con otro payload",async()=>{
  const target=actor({uuid:"Actor.collision",health:12});
  const original=request({
    id:"req-collision",
    action:"apply-health-damage",
    payload:{targetUuid:target.uuid,amount:2}
  });
  const altered=request({
    id:"req-collision",
    action:"apply-health-damage",
    payload:{targetUuid:target.uuid,amount:6}
  });

  assert.equal((await authorityA.executeAuthorityRequestForAudit(original)).ok,true);
  assert.equal(target.system.resources.health.value,10);

  const collision=await authorityA.executeAuthorityRequestForAudit(altered);
  assert.equal(collision.ok,false);
  assert.match(collision.error,/Colisión de requestId/i);
  assert.equal(target.system.resources.health.value,10);
});

test("journal pending: una caída entre journal y resultado bloquea el reenvío",async()=>{
  const target=actor({uuid:"Actor.pending-journal",health:12});
  const msg=request({
    id:"req-pending",
    action:"apply-health-damage",
    payload:{targetUuid:target.uuid,amount:5}
  });
  const fingerprint=JSON.stringify({
    action:"apply-health-damage",
    payload:{amount:5,targetUuid:target.uuid},
    requesterId:"player"
  });
  await target.setFlag("tierra-magica","authorityReceipts",{
    "player:req-pending":{
      state:"pending",
      fingerprint,
      startedAt:1,
      journalAt:1
    }
  });

  const authorityC=await import("../scripts/rules/state-authority.mjs?idempotency-c");
  const result=await authorityC.executeAuthorityRequestForAudit(msg);
  assert.equal(result.ok,false);
  assert.equal(result.pending,true);
  assert.match(result.error,/no se repetirá automáticamente/i);
  assert.equal(target.system.resources.health.value,12);
});

test("Movimiento: duplicar el mismo requestId no gasta dos veces",async()=>{
  const target=actor({uuid:"Actor.move",movement:6});
  const msg=request({
    id:"req-move",
    action:"spend-movement",
    payload:{actorUuid:target.uuid,amount:4,consumeReaction:false}
  });

  const [a,b]=await Promise.all([
    authorityA.executeAuthorityRequestForAudit(msg),
    authorityA.executeAuthorityRequestForAudit(msg)
  ]);
  assert.deepEqual(a,b);
  assert.equal(a.spent,true);
  assert.equal(target.system.turn.movementSpent,4);
});

test("Energía: duplicar el mismo requestId consume una sola activación",async()=>{
  const owner=actor({uuid:"Actor.device"});
  const source=device(owner,{id:"coil",energy:8,flow:3});
  const msg=request({
    id:"req-energy",
    action:"consume-device-energy",
    payload:{actorUuid:owner.uuid,sourceItemId:"coil",consumption:3,flowBonus:0}
  });

  const first=await authorityA.executeAuthorityRequestForAudit(msg);
  assert.equal(first.ok,true);
  assert.equal(source.system.energy.value,5);

  const authorityD=await import("../scripts/rules/state-authority.mjs?idempotency-d");
  const replay=await authorityD.executeAuthorityRequestForAudit(msg);
  assert.deepEqual(replay,first);
  assert.equal(source.system.energy.value,5);
});

test("Reserva de Acción: duplicar la petición devuelve la misma reserva en vez de crear otra",async()=>{
  const target=actor({uuid:"Actor.reserve"});
  const msg=request({
    id:"req-reserve",
    action:"reserve-turn-resource",
    payload:{actorUuid:target.uuid,resource:"action"}
  });

  const [first,duplicate]=await Promise.all([
    authorityA.executeAuthorityRequestForAudit(msg),
    authorityA.executeAuthorityRequestForAudit(msg)
  ]);
  assert.equal(first.claimed,true);
  assert.deepEqual(duplicate,first);
  assert.equal(
    target.getFlag("tierra-magica","turnReservations")?.action?.id,
    first.reservationId
  );
});

test("requestId iguales de usuarios distintos no colisionan entre sí",async()=>{
  const target=actor({uuid:"Actor.user-scope",health:12,owners:["player","other"]});
  const other={id:"other",active:true,isGM:false};
  users.push(other);

  const first=request({
    id:"shared-id",
    requesterId:"player",
    action:"apply-health-damage",
    payload:{targetUuid:target.uuid,amount:2}
  });
  const second=request({
    id:"shared-id",
    requesterId:"other",
    action:"apply-health-damage",
    payload:{targetUuid:target.uuid,amount:3}
  });

  const a=await authorityA.executeAuthorityRequestForAudit(first);
  const b=await authorityA.executeAuthorityRequestForAudit(second);
  assert.equal(a.ok,true);
  assert.equal(b.ok,true);
  assert.equal(target.system.resources.health.value,7);
});
