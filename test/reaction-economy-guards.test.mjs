import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";
import { installReactionEconomyGuards } from "../scripts/rules/reaction-economy-guards.mjs";

globalThis.ui = { notifications: { warn: () => null } };
globalThis.Hooks = { on: () => null };

class ActorStub {
  constructor() {
    this.name = "Prueba";
    this.system = {
      turn: { reaction: false },
      status: { incapacitated: false },
      resources: { health: { value: 10 } }
    };
    this.calls = [];
  }
  async parry() { this.calls.push("parry"); await new Promise((resolve) => setTimeout(resolve, 5)); return { ok: true }; }
  async useCounterspell() { this.calls.push("counterspell"); await new Promise((resolve) => setTimeout(resolve, 5)); return { ok: true }; }
  async receiveCharge() { this.calls.push("charge"); return { ok: true }; }
  async interceptAttack() { this.calls.push("intercept"); return { ok: true }; }
  async linkedFamiliarAction() { this.calls.push("familiar"); return { ok: true }; }
  async triggerFamiliarReaction() { this.calls.push("familiar-reactive"); return { ok: true }; }
}

installReactionEconomyGuards(ActorStub);

test("dos Reacciones concurrentes se resuelven sin lock transversal", async () => {
  const actor = new ActorStub();
  const [first, second] = await Promise.all([actor.parry(), actor.useCounterspell()]);
  assert.ok(first);
  assert.ok(second);
  assert.deepEqual(actor.calls.sort(), ["counterspell","parry"]);
  assert.equal(actor.system.turn.reaction, false);
});

test("una Reacción se ejecuta aunque el marcador figure gastado", async () => {
  const actor = new ActorStub();
  assert.ok(await actor.receiveCharge());
  assert.ok(await actor.interceptAttack());
  assert.deepEqual(actor.calls, ["charge","intercept"]);
});

test("Incapacitado sigue bloqueando Reacciones", async () => {
  const actor = new ActorStub();
  actor.system.status.incapacitated = true;
  assert.equal(await actor.parry(), null);
  assert.deepEqual(actor.calls, []);
});

test("la capa de Reacción ya no usa reservas ni exclusión mutua", async () => {
  const source = await readFile(new URL("../scripts/rules/reaction-economy-guards.mjs", import.meta.url), "utf8");
  assert.equal(source.includes("reserveTurnResourceAuthoritatively"), false);
  assert.equal(source.includes("commitTurnResourceReservation"), false);
  assert.equal(source.includes("reactionLocks"), false);
  assert.equal(source.includes("ya gastó su Reacción"), false);
  assert.equal(source.includes("resetCurrentCombatantTurn"), true);
});
