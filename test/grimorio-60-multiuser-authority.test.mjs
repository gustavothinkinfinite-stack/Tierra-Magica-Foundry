import test from "node:test";
import assert from "node:assert/strict";

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

const gm={id:"gm",active:true,isGM:true};
const playerA={id:"player-a",active:true,isGM:false};
const playerB={id:"player-b",active:true,isGM:false};
const outsider={id:"outsider",active:true,isGM:false};
const users=[gm,playerA,playerB,outsider];
const listeners=[];
const actors=new Map();

globalThis.game={
  user:playerA,
  users,
  socket:{
    on(_channel,handler){listeners.push(handler);},
    emit(_channel,message){
      if(message?.kind==="request"){
        queueMicrotask(async()=>{
          const previous=globalThis.game.user;
          globalThis.game.user=gm;
          await Promise.all(listeners.map((handler)=>handler(message)));
          globalThis.game.user=previous;
        });
        return;
      }
      if(message?.kind==="response"){
        queueMicrotask(async()=>{
          const previous=globalThis.game.user;
          globalThis.game.user=users.find((user)=>user.id===message.requesterId) ?? previous;
          await Promise.all(listeners.map((handler)=>handler(message)));
          globalThis.game.user=previous;
        });
      }
    }
  }
};
globalThis.fromUuid=async(uuid)=>actors.get(uuid) ?? null;

const {
  installStateAuthorityBridge,
  applyHealthDamageAuthoritatively,
  applyHealthHealingAuthoritatively,
  approvePendingDamageAuthoritatively,
  approvePendingHealingAuthoritatively,
  claimCounterattackAuthoritatively,
  claimParryAuthoritatively,
  resolveParryAuthoritatively,
  reserveTurnResourceAuthoritatively,
  commitTurnResourceReservation,
  releaseTurnResourceReservation,
  spendActorMovementAuthoritatively
}=await import("../scripts/rules/state-authority.mjs");

installStateAuthorityBridge();

function actor({uuid="Actor.target",health=10,max=16,cap=max,owners=["player-a","player-b"]}={}){
  const value={
    uuid,id:uuid,name:"Objetivo compartido",type:"npc",
    system:{
      derived:{healthMax:max,movement:6},
      resources:{health:{value:health,max}},
      recovery:{healthCap:cap},
      status:{incapacitated:false,trauma:0},
      turn:{action:true,reaction:true,movementSpent:0,extraMovement:0}
    },
    canUserModify(user){return Boolean(user?.isGM)||owners.includes(user?.id);},
    async update(changes){await delay();applyChanges(this,changes);return changes;}
  };
  actors.set(uuid,value);
  return value;
}

function message({id,flagName,request}){
  let flag=request;
  return {
    id,
    getFlag(scope,key){
      assert.equal(scope,"tierra-magica");
      assert.equal(key,flagName);
      return flag;
    },
    async setFlag(scope,key,value){
      assert.equal(scope,"tierra-magica");
      assert.equal(key,flagName);
      await delay();
      flag=value;
      return value;
    }
  };
}

test("multiusuario: dos clientes propietarios acumulan daño en la cola única del DJ",async()=>{
  const target=actor({health:10});
  globalThis.game.user=playerA;
  const first=applyHealthDamageAuthoritatively(target,4);
  globalThis.game.user=playerB;
  const second=applyHealthDamageAuthoritatively(target,4);

  const results=await Promise.all([first,second]);
  assert.equal(results.every((result)=>result.ok),true);
  assert.equal(target.system.resources.health.value,2);
  assert.deepEqual(results.map((result)=>result.applied),[4,4]);
});

test("multiusuario: daño y curación de clientes distintos terminan en un orden serial legal",async()=>{
  const target=actor({uuid:"Actor.mixed",health:10,max:16,cap:16});
  globalThis.game.user=playerA;
  const damage=applyHealthDamageAuthoritatively(target,7);
  globalThis.game.user=playerB;
  const healing=applyHealthHealingAuthoritatively(target,4);

  const results=await Promise.all([damage,healing]);
  assert.equal(results.every((result)=>result.ok),true);
  assert.equal(target.system.resources.health.value,7);
  assert.equal(target.system.status.incapacitated,false);
});

test("seguridad: un cliente sin permisos no puede usar el socket para modificar Vida",async()=>{
  const target=actor({uuid:"Actor.secure",health:10,owners:["player-a"]});
  globalThis.game.user=outsider;
  const result=await applyHealthDamageAuthoritatively(target,5);
  assert.equal(result.ok,false);
  assert.match(result.error,/no posee permisos/i);
  assert.equal(target.system.resources.health.value,10);
});

test("aprobación pendiente: doble clic concurrente aplica el mismo daño una sola vez",async()=>{
  const target=actor({uuid:"Actor.pending-damage",health:12,owners:[]});
  const pending=message({
    id:"Message.damage",
    flagName:"pendingDamage",
    request:{targetUuid:target.uuid,damage:5,source:"Rifle",attacker:"Exploradora",resolved:false}
  });
  globalThis.game.user=gm;

  const results=await Promise.all([
    approvePendingDamageAuthoritatively(pending),
    approvePendingDamageAuthoritatively(pending)
  ]);

  assert.equal(target.system.resources.health.value,7);
  assert.equal(results.filter((result)=>result.resolved===true && result.alreadyResolved===false).length,1);
  assert.equal(results.filter((result)=>result.alreadyResolved===true).length,1);
  assert.equal(pending.getFlag("tierra-magica","pendingDamage").resolved,true);
});

test("aprobación pendiente: dos mensajes distintos contra el mismo PNJ se acumulan sin perder daño",async()=>{
  const target=actor({uuid:"Actor.two-messages",health:12,owners:[]});
  const one=message({
    id:"Message.one",flagName:"pendingDamage",
    request:{targetUuid:target.uuid,damage:4,source:"Espada",attacker:"A",resolved:false}
  });
  const two=message({
    id:"Message.two",flagName:"pendingDamage",
    request:{targetUuid:target.uuid,damage:3,source:"Arco",attacker:"B",resolved:false}
  });
  globalThis.game.user=gm;

  const results=await Promise.all([
    approvePendingDamageAuthoritatively(one),
    approvePendingDamageAuthoritatively(two)
  ]);

  assert.equal(results.every((result)=>result.ok),true);
  assert.equal(target.system.resources.health.value,5);
  assert.equal(one.getFlag("tierra-magica","pendingDamage").resolved,true);
  assert.equal(two.getFlag("tierra-magica","pendingDamage").resolved,true);
});

test("aprobación pendiente: curación duplicada se consume una vez y recalcula el límite",async()=>{
  const target=actor({uuid:"Actor.pending-heal",health:5,max:20,cap:7,owners:[]});
  const pending=message({
    id:"Message.heal",flagName:"pendingHealing",
    request:{targetUuid:target.uuid,healing:4,source:"Cierre Restaurador",caster:"Maga",resolved:false}
  });
  globalThis.game.user=gm;

  const results=await Promise.all([
    approvePendingHealingAuthoritatively(pending),
    approvePendingHealingAuthoritatively(pending)
  ]);

  assert.equal(target.system.resources.health.value,7);
  assert.equal(results.filter((result)=>result.resolved===true && result.alreadyResolved===false).length,1);
  assert.equal(results.filter((result)=>result.alreadyResolved===true).length,1);
  assert.equal(results.find((result)=>result.resolved===true)?.applied,2);
});

test("autoridad de Vida conserva 0 Vida, Incapacitado y Trauma exactamente una vez",async()=>{
  const target=actor({uuid:"Actor.zero",health:5,max:16,owners:["player-a","player-b"]});
  target.type="character";
  globalThis.game.user=playerA;
  const first=applyHealthDamageAuthoritatively(target,4);
  globalThis.game.user=playerB;
  const second=applyHealthDamageAuthoritatively(target,4);

  await Promise.all([first,second]);
  assert.equal(target.system.resources.health.value,0);
  assert.equal(target.system.status.incapacitated,true);
  assert.equal(target.system.status.trauma,1);
});


test("defensa compartida: dos atacantes concurrentes no pueden consumir la misma Parada dos veces",async()=>{
  const target=actor({uuid:"Actor.parry",health:12,owners:[]});
  target.system.combat={parryActive:true,parrySucceeded:false,counterattackUsed:false};
  globalThis.game.user=gm;

  const claims=await Promise.all([
    claimParryAuthoritatively(target),
    claimParryAuthoritatively(target)
  ]);

  assert.equal(claims.filter((result)=>result.ok && result.claimed).length,1);
  assert.equal(claims.filter((result)=>result.ok && !result.claimed).length,1);
  assert.equal(target.system.combat.parryActive,false);

  const closed=await resolveParryAuthoritatively(target,true);
  assert.equal(closed.ok,true);
  assert.equal(target.system.combat.parrySucceeded,true);
  assert.equal(target.system.combat.counterattackUsed,false);
});


test("defensa compartida: una Parada exitosa habilita un solo Contraataque entre clientes",async()=>{
  const target=actor({uuid:"Actor.counterattack",health:12,owners:["player-a","player-b"]});
  target.system.combat={parryActive:false,parrySucceeded:true,counterattackUsed:false};

  globalThis.game.user=playerA;
  const first=claimCounterattackAuthoritatively(target);
  globalThis.game.user=playerB;
  const second=claimCounterattackAuthoritatively(target);

  const claims=await Promise.all([first,second]);
  assert.equal(claims.filter((result)=>result.ok && result.claimed).length,1);
  assert.equal(claims.filter((result)=>result.ok && !result.claimed).length,1);
  assert.equal(target.system.combat.parrySucceeded,false);
  assert.equal(target.system.combat.counterattackUsed,true);
});


test("economía compartida: dos clientes no pueden reservar la misma Acción",async()=>{
  const target=actor({uuid:"Actor.action-economy",owners:["player-a","player-b"]});

  globalThis.game.user=playerA;
  const first=reserveTurnResourceAuthoritatively(target,"action");
  globalThis.game.user=playerB;
  const second=reserveTurnResourceAuthoritatively(target,"action");
  const claims=await Promise.all([first,second]);

  assert.equal(claims.filter((result)=>result.ok && result.claimed).length,1);
  assert.equal(claims.filter((result)=>result.ok && !result.claimed).length,1);

  const winner=claims[0].claimed ? {user:playerA,result:claims[0]} : {user:playerB,result:claims[1]};
  globalThis.game.user=winner.user;
  const committed=await commitTurnResourceReservation(target,"action",winner.result.reservationId);
  assert.equal(committed.ok,true);
  assert.equal(target.system.turn.action,false);
});

test("economía compartida: cancelar una Acción inválida libera la reserva para otro cliente",async()=>{
  const target=actor({uuid:"Actor.action-release",owners:["player-a","player-b"]});
  globalThis.game.user=playerA;
  const claim=await reserveTurnResourceAuthoritatively(target,"action");
  assert.equal(claim.claimed,true);
  assert.equal((await releaseTurnResourceReservation(target,"action",claim.reservationId)).ok,true);
  assert.equal(target.system.turn.action,true);

  globalThis.game.user=playerB;
  const retry=await reserveTurnResourceAuthoritatively(target,"action");
  assert.equal(retry.claimed,true);
  await releaseTurnResourceReservation(target,"action",retry.reservationId);
});

test("economía compartida: Acción y Reacción siguen siendo recursos independientes",async()=>{
  const target=actor({uuid:"Actor.action-reaction",owners:["player-a","player-b"]});
  globalThis.game.user=playerA;
  const action=reserveTurnResourceAuthoritatively(target,"action");
  globalThis.game.user=playerB;
  const reaction=reserveTurnResourceAuthoritatively(target,"reaction");
  const [a,r]=await Promise.all([action,reaction]);
  assert.equal(a.claimed,true);
  assert.equal(r.claimed,true);

  globalThis.game.user=playerA;
  await releaseTurnResourceReservation(target,"action",a.reservationId);
  globalThis.game.user=playerB;
  await releaseTurnResourceReservation(target,"reaction",r.reservationId);
});

test("economía compartida: dos movimientos de 4 no reutilizan un remanente de 6",async()=>{
  const target=actor({uuid:"Actor.movement-race",owners:["player-a","player-b"]});

  globalThis.game.user=playerA;
  const first=spendActorMovementAuthoritatively(target,4);
  globalThis.game.user=playerB;
  const second=spendActorMovementAuthoritatively(target,4);
  const results=await Promise.all([first,second]);

  assert.equal(results.filter((result)=>result.ok && result.spent).length,1);
  assert.equal(target.system.turn.movementSpent,4);
});

test("economía compartida: dos movimientos compatibles sí pueden dividir el remanente",async()=>{
  const target=actor({uuid:"Actor.movement-split",owners:["player-a","player-b"]});

  globalThis.game.user=playerA;
  const first=spendActorMovementAuthoritatively(target,3);
  globalThis.game.user=playerB;
  const second=spendActorMovementAuthoritatively(target,3);
  const results=await Promise.all([first,second]);

  assert.equal(results.every((result)=>result.ok && result.spent),true);
  assert.equal(target.system.turn.movementSpent,6);
});

test("economía compartida: Intercepción no puede robar una Reacción reservada por otro cliente",async()=>{
  const target=actor({uuid:"Actor.intercept-race",owners:["player-a","player-b"]});

  globalThis.game.user=playerA;
  const reservation=await reserveTurnResourceAuthoritatively(target,"reaction");
  assert.equal(reservation.claimed,true);

  globalThis.game.user=playerB;
  const blocked=await spendActorMovementAuthoritatively(target,2,{consumeReaction:true});
  assert.equal(blocked.ok,true);
  assert.equal(blocked.spent,false);
  assert.equal(blocked.reason,"reaction-reserved");
  assert.equal(target.system.turn.reaction,true);
  assert.equal(target.system.turn.movementSpent,0);

  globalThis.game.user=playerA;
  const allowed=await spendActorMovementAuthoritatively(target,2,{consumeReaction:true});
  assert.equal(allowed.ok,true);
  assert.equal(allowed.spent,true);
  assert.equal(target.system.turn.reaction,false);
  assert.equal(target.system.turn.movementSpent,2);
  assert.equal((await commitTurnResourceReservation(target,"reaction",reservation.reservationId)).ok,true);
});

test("seguridad: un cliente sin permisos no puede reservar Acción ni gastar Movimiento",async()=>{
  const target=actor({uuid:"Actor.turn-secure",owners:["player-a"]});
  globalThis.game.user=outsider;

  const action=await reserveTurnResourceAuthoritatively(target,"action");
  const movement=await spendActorMovementAuthoritatively(target,2);
  assert.equal(action.ok,false);
  assert.match(action.error,/no posee permisos/i);
  assert.equal(movement.ok,false);
  assert.match(movement.error,/no posee permisos/i);
  assert.equal(target.system.turn.action,true);
  assert.equal(target.system.turn.movementSpent,0);
});
