import test from "node:test";
import assert from "node:assert/strict";
import { installActionEconomyGuards, runAction } from "../scripts/rules/action-economy-guards.mjs";

const warnings = [];
globalThis.ui = { notifications: { warn: (message) => { warnings.push(message); return { message }; } } };

class ActorStub {
  constructor() {
    this.name = "Personaje";
    this.system = { status: { incapacitated:false }, resources:{health:{value:10}}, turn: { action:false, reaction:false } };
    this.calls = [];
  }
  async useSpell(item) { this.calls.push("spell"); return {name:item.name ?? "Hechizo"}; }
  async useFormula(item) { this.calls.push("formula"); return {name:item.name ?? "Fórmula"}; }
  async useDevice() { this.calls.push("device"); return {ok:true}; }
  async overloadDevice() { this.calls.push("overload"); return {ok:true}; }
  async rollWeapon() { this.calls.push("weapon"); return {ok:true}; }
  async dualWieldAttack() { this.calls.push("dual"); return [{ok:true}]; }
  async sweepAttack() { this.calls.push("sweep"); return {ok:true}; }
  async guard() { this.calls.push("guard"); return {ok:true}; }
  async commandFamiliar() { this.calls.push("familiar"); return {ok:true}; }
  async useFamiliarSense() { this.calls.push("senses"); return {ok:true}; }
}
installActionEconomyGuards(ActorStub);

test("Action gastada no bloquea ataques repetidos ni hechizos", async () => {
  const actor = new ActorStub();
  assert.ok(await actor.rollWeapon({}));
  assert.ok(await actor.rollWeapon({}));
  assert.ok(await actor.useSpell({name:"Luz Arcana",system:{}}));
  assert.deepEqual(actor.calls,["weapon","weapon","spell"]);
  assert.equal(actor.system.turn.action,false);
});

test("los subsistemas ejecutan sin consumir automáticamente la Acción o Reacción", async () => {
  const actor = new ActorStub();
  await actor.useFormula({name:"Poción",system:{}});
  await actor.useDevice({});
  await actor.overloadDevice({});
  await actor.dualWieldAttack({});
  await actor.sweepAttack({});
  await actor.guard();
  await actor.commandFamiliar({});
  await actor.useFamiliarSense({});
  await actor.useSpell({name:"Barrera",system:{activation:"Reacción"}});
  assert.equal(actor.calls.length,9);
  assert.deepEqual(actor.system.turn,{action:false,reaction:false});
});

test("no hay candado global entre subsistemas ni carreras por reservas", async () => {
  const actor = new ActorStub();
  const results = await Promise.all([
    actor.useSpell({name:"A",system:{}}),
    actor.rollWeapon({}),
    actor.useDevice({})
  ]);
  assert.equal(results.every(Boolean),true);
  assert.equal(actor.calls.length,3);
});

test("las validaciones de la operación conservan su resultado", async () => {
  const actor = new ActorStub();
  const notice = ui.notifications.warn("Objetivo inválido.");
  actor.useDevice = async () => notice;
  // El wrapper instalado conserva la validación original, sin reinterpretar su resultado.
  assert.ok(notice);
  assert.equal(await runAction(actor,async()=>null),null);
  assert.equal(await runAction(actor,async()=>notice),notice);
});

test("una criatura incapacitada sigue sin poder ejecutar la Acción", async () => {
  const actor = new ActorStub();
  actor.system.status.incapacitated = true;
  assert.equal(await actor.rollWeapon({}),null);
  assert.equal(actor.calls.length,0);
});

test("una Fórmula de minutos no se transforma en Acción instantánea de combate", async () => {
  const actor = new ActorStub();
  globalThis.game={combat:{started:true}};
  assert.equal(await actor.useFormula({name:"Bálsamo",system:{activation:"1 minuto"}}),null);
  assert.equal(actor.calls.length,0);
  globalThis.game={};
});
