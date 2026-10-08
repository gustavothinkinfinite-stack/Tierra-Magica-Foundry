import test from "node:test";
import assert from "node:assert/strict";
import { installReactionEconomyGuards } from "../scripts/rules/reaction-economy-guards.mjs";

globalThis.ui = { notifications: { warn: () => null } };

class ActorStub {
  constructor() {
    this.name="Personaje";
    this.calls=[];
    this.system={status:{incapacitated:false},resources:{health:{value:10}},turn:{reaction:false}};
  }
  async parry(){this.calls.push("parry");return {ok:true};}
  async useCounterspell(){this.calls.push("counterspell");return {ok:true};}
  async receiveCharge(){this.calls.push("charge");return {ok:true};}
  async interceptAttack(){this.calls.push("intercept");return {ok:true};}
  async linkedFamiliarAction(){this.calls.push("familiar");return {ok:true};}
  async triggerFamiliarReaction(){this.calls.push("familiar-reactive");return {ok:true};}
}
installReactionEconomyGuards(ActorStub);

test("Reacción gastada no bloquea Parada, Contramagia ni habilidades reactivas",async()=>{
  const actor=new ActorStub();
  assert.ok(await actor.parry());
  assert.ok(await actor.useCounterspell());
  assert.ok(await actor.receiveCharge());
  assert.ok(await actor.interceptAttack());
  assert.deepEqual(actor.calls,["parry","counterspell","charge","intercept"]);
  assert.equal(actor.system.turn.reaction,false);
});

test("las habilidades del Familiar no reciben candado transversal",async()=>{
  const actor=new ActorStub();
  assert.ok(await actor.linkedFamiliarAction());
  assert.ok(await actor.triggerFamiliarReaction());
  assert.ok(await actor.linkedFamiliarAction());
  assert.equal(actor.calls.length,3);
});

test("Reacciones concurrentes se resuelven sin reserva de turno global",async()=>{
  const actor=new ActorStub();
  const [a,b]=await Promise.all([actor.parry(),actor.useCounterspell()]);
  assert.ok(a);assert.ok(b);
  assert.deepEqual(actor.calls,["parry","counterspell"]);
});

test("la incapacidad sigue impidiendo Reacciones",async()=>{
  const actor=new ActorStub();
  actor.system.status.incapacitated=true;
  assert.equal(await actor.parry(),null);
  assert.deepEqual(actor.calls,[]);
});
