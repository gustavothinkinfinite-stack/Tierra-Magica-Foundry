import test from "node:test";
import assert from "node:assert/strict";
import { installActionEconomyGuards } from "../scripts/rules/action-economy-guards.mjs";

globalThis.ui = { notifications: { warn: () => null } };

class ActorStub {
  constructor() {
    this.name = "Prueba";
    this.system = { turn: { action: true } };
    this.calls = 0;
  }
  async update(changes) {
    if (Object.hasOwn(changes, "system.turn.action")) this.system.turn.action = changes["system.turn.action"];
  }
  async useSpell() { this.calls += 1; await new Promise((resolve) => setTimeout(resolve, 10)); return { ok: true }; }
  async useFormula() { this.calls += 1; return { ok: true }; }
  async useDevice() { this.calls += 1; return { ok: true }; }
  async overloadDevice() { this.calls += 1; return { ok: true }; }
}

installActionEconomyGuards(ActorStub);

test("una activación válida consume exactamente la Acción", async () => {
  const actor = new ActorStub();
  const result = await actor.useFormula();
  assert.ok(result);
  assert.equal(actor.calls, 1);
  assert.equal(actor.system.turn.action, false);
  assert.equal(await actor.useDevice(), null);
  assert.equal(actor.calls, 1);
});

test("una resolución inválida no consume la Acción", async () => {
  class InvalidActor extends ActorStub {}
  InvalidActor.prototype.useFormula = async function () { this.calls += 1; return null; };
  installActionEconomyGuards(InvalidActor);
  const actor = new InvalidActor();
  assert.equal(await actor.useFormula(), null);
  assert.equal(actor.system.turn.action, true);
});

test("dos activaciones concurrentes no pueden gastar la misma Acción", async () => {
  const actor = new ActorStub();
  const [first, second] = await Promise.all([actor.useSpell(), actor.useSpell()]);
  assert.equal(actor.calls, 1);
  assert.equal(actor.system.turn.action, false);
  assert.equal([first, second].filter(Boolean).length, 1);
});
