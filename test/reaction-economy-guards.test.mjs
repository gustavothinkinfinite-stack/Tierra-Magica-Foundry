import test from "node:test";
import assert from "node:assert/strict";
import { installReactionEconomyGuards } from "../scripts/rules/reaction-economy-guards.mjs";

globalThis.ui = { notifications: { warn: () => null } };

class ActorStub {
  constructor() {
    this.name = "Prueba";
    this.system = { turn: { reaction: true } };
    this.calls = [];
  }
  async parry() {
    this.calls.push("parry");
    await new Promise((resolve) => setTimeout(resolve, 10));
    this.system.turn.reaction = false;
    return { ok: true };
  }
  async useCounterspell() {
    this.calls.push("counterspell");
    await new Promise((resolve) => setTimeout(resolve, 10));
    this.system.turn.reaction = false;
    return { ok: true };
  }
  async receiveCharge() { this.calls.push("charge"); this.system.turn.reaction = false; return { ok: true }; }
  async interceptAttack() { this.calls.push("intercept"); this.system.turn.reaction = false; return { ok: true }; }
}

installReactionEconomyGuards(ActorStub);

test("dos Reacciones concurrentes de subsistemas distintos no reutilizan el recurso", async () => {
  const actor = new ActorStub();
  const [first, second] = await Promise.all([actor.parry(), actor.useCounterspell()]);
  assert.equal(actor.calls.length, 1);
  assert.equal(actor.system.turn.reaction, false);
  assert.equal([first, second].filter(Boolean).length, 1);
});

test("una Reacción ya gastada se bloquea antes de entrar a la regla especializada", async () => {
  const actor = new ActorStub();
  actor.system.turn.reaction = false;
  assert.equal(await actor.receiveCharge(), null);
  assert.deepEqual(actor.calls, []);
});

test("una resolución inválida libera el bloqueo sin inventar gasto", async () => {
  class InvalidActor extends ActorStub {}
  InvalidActor.prototype.parry = async function () { this.calls.push("invalid"); return null; };
  installReactionEconomyGuards(InvalidActor);
  const actor = new InvalidActor();
  assert.equal(await actor.parry(), null);
  assert.equal(actor.system.turn.reaction, true);
  const result = await actor.useCounterspell();
  assert.ok(result);
  assert.equal(actor.system.turn.reaction, false);
});
