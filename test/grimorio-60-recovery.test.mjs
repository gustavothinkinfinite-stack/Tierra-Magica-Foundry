import test from "node:test";
import assert from "node:assert/strict";

const gmA={id:"gm-a",active:true,isGM:true};
const gmB={id:"gm-b",active:false,isGM:true};
const player={id:"player",active:true,isGM:false};

function actor(uuid="Actor.recovery"){
  const flags={};
  return {
    uuid,id:uuid,name:"Actor de recuperación",type:"character",
    system:{
      derived:{movement:6},
      resources:{health:{value:10,max:16}},
      status:{incapacitated:false,trauma:0},
      turn:{action:true,reaction:true,movementSpent:0,extraMovement:0},
      combat:{}
    },
    canUserModify(user){return Boolean(user?.isGM)||user?.id==="player";},
    getFlag(scope,key){return flags[scope]?.[key];},
    async setFlag(scope,key,value){
      flags[scope] ??= {};
      flags[scope][key]=structuredClone(value);
      return value;
    },
    async update(changes){
      for(const [path,value] of Object.entries(changes)){
        const keys=path.split(".");
        if(keys[0]==="system") keys.shift();
        let node=this.system;
        while(keys.length>1){
          const key=keys.shift();
          node[key] ??= {};
          node=node[key];
        }
        node[keys[0]]=value;
      }
      return changes;
    },
    _flags:flags
  };
}

globalThis.game={user:player,users:[gmA,gmB,player],socket:null};

const authorityA=await import("../scripts/rules/state-authority.mjs?recovery-a");
const authorityB=await import("../scripts/rules/state-authority.mjs?recovery-b");
const { resetActorTurnForCombat }=await import("../scripts/rules/turn-economy.mjs");

test("recarga de módulo: una reserva persistida sigue bloqueando la Acción",async()=>{
  const target=actor("Actor.reload");
  globalThis.game.user=player;

  const first=await authorityA.reserveTurnResourceAuthoritatively(target,"action");
  assert.equal(first.ok,true);
  assert.equal(first.claimed,true);
  assert.ok(target.getFlag("tierra-magica","turnReservations")?.action?.id);

  const afterReload=await authorityB.reserveTurnResourceAuthoritatively(target,"action");
  assert.equal(afterReload.ok,true);
  assert.equal(afterReload.claimed,false);
  assert.equal(afterReload.reason,"reserved");
  assert.equal(target.system.turn.action,true);
});

test("cambio de proceso de autoridad: una reserva válida puede confirmarse tras recarga si conserva su id",async()=>{
  const target=actor("Actor.commit-after-reload");
  globalThis.game.user=player;

  const reserved=await authorityA.reserveTurnResourceAuthoritatively(target,"reaction");
  assert.equal(reserved.claimed,true);

  const committed=await authorityB.commitTurnResourceReservation(target,"reaction",reserved.reservationId);
  assert.equal(committed.ok,true);
  assert.equal(committed.committed,true);
  assert.equal(target.system.turn.reaction,false);
  assert.equal(target.getFlag("tierra-magica","turnReservations")?.reaction,undefined);
});

test("cambio de DJ: el nuevo DJ ve la reserva huérfana y puede marcarla como gastada",async()=>{
  const target=actor("Actor.gm-handoff-spend");
  globalThis.game.user=player;
  const reserved=await authorityA.reserveTurnResourceAuthoritatively(target,"action");
  assert.equal(reserved.claimed,true);

  gmA.active=false;
  gmB.active=true;
  globalThis.game.user=gmB;

  const blocked=await authorityB.reserveTurnResourceAuthoritatively(target,"action");
  assert.equal(blocked.claimed,false);
  assert.equal(blocked.reason,"reserved");

  const recovery=await authorityB.adjudicateStaleTurnReservation(target,"action","spend");
  assert.equal(recovery.ok,true);
  assert.equal(recovery.resolved,true);
  assert.equal(recovery.decision,"spend");
  assert.equal(target.system.turn.action,false);
  assert.equal(target.getFlag("tierra-magica","turnReservations")?.action,undefined);

  gmA.active=true;
  gmB.active=false;
});

test("reinicio completo: el DJ puede liberar una reserva huérfana sin gastar el recurso",async()=>{
  const target=actor("Actor.gm-handoff-release");
  globalThis.game.user=player;
  const reserved=await authorityA.reserveTurnResourceAuthoritatively(target,"reaction");
  assert.equal(reserved.claimed,true);

  gmA.active=false;
  gmB.active=true;
  globalThis.game.user=gmB;

  const recovery=await authorityB.adjudicateStaleTurnReservation(target,"reaction","release");
  assert.equal(recovery.ok,true);
  assert.equal(recovery.resolved,true);
  assert.equal(recovery.decision,"release");
  assert.equal(target.system.turn.reaction,true);
  assert.equal(target.getFlag("tierra-magica","turnReservations")?.reaction,undefined);

  gmA.active=true;
  gmB.active=false;
});

test("seguridad de recuperación: un jugador no puede adjudicar una reserva huérfana",async()=>{
  const target=actor("Actor.recovery-security");
  globalThis.game.user=player;
  const reserved=await authorityA.reserveTurnResourceAuthoritatively(target,"action");
  assert.equal(reserved.claimed,true);

  const denied=await authorityB.adjudicateStaleTurnReservation(target,"action","release");
  assert.equal(denied.ok,false);
  assert.match(denied.error,/Sólo un DJ/i);
  assert.ok(target.getFlag("tierra-magica","turnReservations")?.action);

  await authorityA.releaseTurnResourceReservation(target,"action",reserved.reservationId);
});

test("nuevo turno limpia reservas persistidas antes de conceder nueva economía",async()=>{
  const target=actor("Actor.new-turn-clear");
  globalThis.game.user=player;
  const reserved=await authorityA.reserveTurnResourceAuthoritatively(target,"action");
  assert.equal(reserved.claimed,true);
  target.system.turn.action=false;

  globalThis.game.user=gmA;
  target.getFlag=((original)=>function(scope,key){
    if(scope==="tierra-magica" && key==="lastTurnReset") return this._lastTurnReset ?? null;
    return original.call(this,scope,key);
  })(target.getFlag);
  const originalSetFlag=target.setFlag.bind(target);
  target.setFlag=async function(scope,key,value){
    if(scope==="tierra-magica" && key==="lastTurnReset"){
      this._lastTurnReset=structuredClone(value);
      return value;
    }
    return originalSetFlag(scope,key,value);
  };

  const reset=await resetActorTurnForCombat(target,{id:"combat",round:1},{id:"combatant"});
  assert.equal(reset,true);
  assert.equal(target.system.turn.action,true);
  assert.equal(target.system.turn.reaction,true);
  assert.deepEqual(target.getFlag("tierra-magica","turnReservations"),{});
});

test("una reserva persistente no se libera por el mero paso del tiempo",async()=>{
  const target=actor("Actor.no-timeout");
  globalThis.game.user=player;
  const reserved=await authorityA.reserveTurnResourceAuthoritatively(target,"action");
  assert.equal(reserved.claimed,true);

  const flag=target.getFlag("tierra-magica","turnReservations");
  flag.action.createdAt=1;
  await target.setFlag("tierra-magica","turnReservations",flag);

  const freshProcess=await import("../scripts/rules/state-authority.mjs?recovery-c");
  const blocked=await freshProcess.reserveTurnResourceAuthoritatively(target,"action");
  assert.equal(blocked.claimed,false);
  assert.equal(blocked.reason,"reserved");

  await authorityA.releaseTurnResourceReservation(target,"action",reserved.reservationId);
});
