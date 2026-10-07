import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";
import { installActionEconomyGuards } from "../scripts/rules/action-economy-guards.mjs";

const activeNotifications = new Set();
globalThis.ui = {
  notifications: {
    warn: () => {
      const notification = {};
      activeNotifications.add(notification);
      return notification;
    },
    info: () => {
      const notification = {};
      activeNotifications.add(notification);
      return notification;
    },
    has: (notification) => activeNotifications.has(notification)
  }
};

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


test("la Acción usa reserva distribuida además del bloqueo local", async () => {
  const source = await readFile(new URL("../scripts/rules/action-economy-guards.mjs", import.meta.url), "utf8");
  assert.equal(source.includes('reserveTurnResourceAuthoritatively(actor, "action")'), true);
  assert.equal(source.includes('commitTurnResourceReservation(actor, "action"'), true);
  assert.equal(source.includes('releaseTurnResourceReservation(actor, "action"'), true);
});


test("CRAFT-13I: una Fórmula de 1 minuto no se convierte en una sola Acción de combate", async () => {
  const actor = new ActorStub();
  globalThis.game={combat:{started:true}};
  const result=await actor.useFormula({name:"Bálsamo Restaurador",system:{activation:"1 minuto"}});
  assert.equal(result,null);
  assert.equal(actor.calls,0);
  assert.equal(actor.system.turn.action,true);
  globalThis.game={};
});

test("CRAFT-13I: una aplicación contextual no inventa coste de Acción universal", async () => {
  const actor = new ActorStub();
  globalThis.game={};
  const result=await actor.useFormula({name:"Toxina Debilitante",system:{activation:"Primera aplicación válida"}});
  assert.ok(result);
  assert.equal(actor.calls,1);
  assert.equal(actor.system.turn.action,true);
});


test("un Notification de validación no consume ni bloquea la Acción", async () => {
  class NotificationActor {
    constructor() {
      this.name = "Prueba aviso";
      this.system = { turn: { action: true, reaction: true } };
      this.calls = 0;
    }
    async update(changes) {
      if (Object.hasOwn(changes, "system.turn.action")) this.system.turn.action = changes["system.turn.action"];
      if (Object.hasOwn(changes, "system.turn.reaction")) this.system.turn.reaction = changes["system.turn.reaction"];
    }
    async useDevice() {
      this.calls += 1;
      return ui.notifications.warn("La activación no es válida.");
    }
  }

  installActionEconomyGuards(NotificationActor);
  const actor = new NotificationActor();
  const first = await actor.useDevice({});
  assert.equal(first, null);
  assert.equal(actor.calls, 1);
  assert.equal(actor.system.turn.action, true);

  const second = await actor.useDevice({});
  assert.equal(second, null);
  assert.equal(actor.calls, 2);
  assert.equal(actor.system.turn.action, true);
});

test("una resolución explícita tmActionResolved sí consume la Acción", async () => {
  class ExplicitResolutionActor {
    constructor() {
      this.name = "Prueba resolución";
      this.system = { turn: { action: true, reaction: true } };
    }
    async update(changes) {
      if (Object.hasOwn(changes, "system.turn.action")) this.system.turn.action = changes["system.turn.action"];
    }
    async useDevice() { return { tmActionResolved: true }; }
  }

  installActionEconomyGuards(ExplicitResolutionActor);
  const actor = new ExplicitResolutionActor();
  assert.ok(await actor.useDevice({}));
  assert.equal(actor.system.turn.action, false);
});
