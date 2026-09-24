import test from "node:test";
import assert from "node:assert/strict";
import { installActionEconomyGuards } from "../scripts/rules/action-economy-guards.mjs";

globalThis.ui = { notifications: { warn: () => null } };

class ActorStub {
  constructor() {
    this.name = "Prueba";
    this.system = { turn: { action: true, reaction: true } };
    this.calls = 0;
  }
  async update(changes) {
    if (Object.hasOwn(changes, "system.turn.action")) this.system.turn.action = changes["system.turn.action"];
    if (Object.hasOwn(changes, "system.turn.reaction")) this.system.turn.reaction = changes["system.turn.reaction"];
  }
  async useSpell() { this.calls += 1; await new Promise((resolve) => setTimeout(resolve, 10)); return { ok: true }; }
  async useFormula() { this.calls += 1; return { ok: true }; }
  async useDevice() { this.calls += 1; return { ok: true }; }
  async overloadDevice() { this.calls += 1; return { ok: true }; }
  async guard() { this.calls += 1; await new Promise((resolve) => setTimeout(resolve, 10)); this.system.turn.action = false; return { ok: true }; }
  async commandFamiliar() { this.calls += 1; this.system.turn.action = false; return { ok: true }; }
  async useFamiliarSense() { this.calls += 1; this.system.turn.action = false; return { ok: true }; }
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
  const spell = { system: {} };
  const [first, second] = await Promise.all([actor.useSpell(spell), actor.useSpell(spell)]);
  assert.equal(actor.calls, 1);
  assert.equal(actor.system.turn.action, false);
  assert.equal([first, second].filter(Boolean).length, 1);
});

test("un hechizo de Reacción consume Reacción pero conserva la Acción", async () => {
  const actor = new ActorStub();
  const barrier = { system: { activation: "Reacción" } };
  const result = await actor.useSpell(barrier);
  assert.ok(result);
  assert.equal(actor.calls, 1);
  assert.equal(actor.system.turn.reaction, false);
  assert.equal(actor.system.turn.action, true);
  assert.equal(await actor.useSpell(barrier), null);
  assert.equal(actor.calls, 1);
});

test("un hechizo de Reacción inválido no consume la Reacción", async () => {
  class InvalidReactionActor extends ActorStub {}
  InvalidReactionActor.prototype.useSpell = async function () { this.calls += 1; return null; };
  installActionEconomyGuards(InvalidReactionActor);
  const actor = new InvalidReactionActor();
  const barrier = { system: { activation: "Reacción" } };
  assert.equal(await actor.useSpell(barrier), null);
  assert.equal(actor.system.turn.reaction, true);
  assert.equal(actor.system.turn.action, true);
});


test("Guardia y magia concurrentes no reutilizan la misma Acción", async () => {
  const actor = new ActorStub();
  const [guard, spell] = await Promise.all([actor.guard(), actor.useSpell({ system: {} })]);
  assert.equal(actor.calls, 1);
  assert.equal(actor.system.turn.action, false);
  assert.equal([guard, spell].filter(Boolean).length, 1);
});

test("orden al Familiar y consumible concurrentes no reutilizan la misma Acción", async () => {
  const actor = new ActorStub();
  const [order, formula] = await Promise.all([actor.commandFamiliar({}), actor.useFormula({})]);
  assert.equal(actor.calls, 1);
  assert.equal(actor.system.turn.action, false);
  assert.equal([order, formula].filter(Boolean).length, 1);
});


test("dos hechizos reactivos concurrentes no duplican gasto ni beneficio", async () => {
  const actor = new ActorStub();
  const barrier = { system: { activation: "Reacción" } };
  const [first, second] = await Promise.all([actor.useSpell(barrier), actor.useSpell(barrier)]);
  assert.equal(actor.calls, 1);
  assert.equal(actor.system.turn.reaction, false);
  assert.equal(actor.system.turn.action, true);
  assert.equal([first, second].filter(Boolean).length, 1);
});
