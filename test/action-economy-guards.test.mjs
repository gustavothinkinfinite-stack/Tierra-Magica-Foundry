import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";
import { installActionEconomyGuards } from "../scripts/rules/action-economy-guards.mjs";

globalThis.ui = { notifications: { warn: () => null } };

class ActorStub {
  constructor() {
    this.name = "Prueba";
    this.system = {
      turn: { action: false, reaction: false },
      status: { incapacitated: false },
      resources: { health: { value: 10 } }
    };
    this.calls = 0;
  }
  async useSpell() { this.calls += 1; await new Promise((resolve) => setTimeout(resolve, 5)); return { ok: true }; }
  async useFormula() { this.calls += 1; return { ok: true }; }
  async useDevice() { this.calls += 1; return { ok: true }; }
  async overloadDevice() { this.calls += 1; return { ok: true }; }
  async rollWeapon() { this.calls += 1; return { ok: true }; }
  async dualWieldAttack() { this.calls += 1; return { ok: true }; }
  async sweepAttack() { this.calls += 1; return { ok: true }; }
  async guard() { this.calls += 1; return { ok: true }; }
  async commandFamiliar() { this.calls += 1; return { ok: true }; }
  async useFamiliarSense() { this.calls += 1; return { ok: true }; }
}

installActionEconomyGuards(ActorStub);

test("una Acción se ejecuta aunque el marcador figure gastado", async () => {
  const actor = new ActorStub();
  assert.ok(await actor.useDevice({}));
  assert.ok(await actor.rollWeapon({}));
  assert.equal(actor.calls, 2);
  assert.equal(actor.system.turn.action, false);
});

test("dos activaciones concurrentes no se bloquean entre sí", async () => {
  const actor = new ActorStub();
  const [first, second] = await Promise.all([
    actor.useSpell({ system: {} }),
    actor.useSpell({ system: {} })
  ]);
  assert.ok(first);
  assert.ok(second);
  assert.equal(actor.calls, 2);
});

test("un hechizo de Reacción se ejecuta aunque el marcador figure gastado", async () => {
  const actor = new ActorStub();
  const barrier = { system: { activation: "Reacción" } };
  assert.ok(await actor.useSpell(barrier));
  assert.ok(await actor.useSpell(barrier));
  assert.equal(actor.calls, 2);
  assert.equal(actor.system.turn.reaction, false);
});

test("Incapacitado sigue siendo una restricción mecánica real", async () => {
  const actor = new ActorStub();
  actor.system.status.incapacitated = true;
  assert.equal(await actor.useDevice({}), null);
  assert.equal(actor.calls, 0);
});

test("CRAFT-13I: una Fórmula de 1 minuto no se convierte en una sola Acción de combate", async () => {
  const actor = new ActorStub();
  globalThis.game={combat:{started:true}};
  const result=await actor.useFormula({name:"Bálsamo Restaurador",system:{activation:"1 minuto"}});
  assert.equal(result,null);
  assert.equal(actor.calls,0);
  globalThis.game={};
});

test("CRAFT-13I: una aplicación contextual no inventa coste de Acción universal", async () => {
  const actor = new ActorStub();
  globalThis.game={};
  const result=await actor.useFormula({name:"Toxina Debilitante",system:{activation:"Primera aplicación válida"}});
  assert.ok(result);
  assert.equal(actor.calls,1);
});

test("la capa de Acción ya no usa reservas distribuidas ni locks de economía", async () => {
  const source = await readFile(new URL("../scripts/rules/action-economy-guards.mjs", import.meta.url), "utf8");
  assert.equal(source.includes("reserveTurnResourceAuthoritatively"), false);
  assert.equal(source.includes("commitTurnResourceReservation"), false);
  assert.equal(source.includes("actionLocks"), false);
  assert.equal(source.includes("ya gastó su Acción"), false);
});
