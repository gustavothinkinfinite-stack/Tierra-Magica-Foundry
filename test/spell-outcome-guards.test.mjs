import test from "node:test";
import assert from "node:assert/strict";
import { installSpellOutcomeGuards, spellRollTotal, spellSucceeded } from "../scripts/rules/spell-outcome-guards.mjs";

test("extracts totals from Foundry ChatMessage roll shapes", () => {
  assert.equal(spellRollTotal({ rolls: [{ total: 15 }] }), 15);
  assert.equal(spellRollTotal({ roll: { total: 14 } }), 14);
  assert.equal(spellRollTotal({ total: 13 }), 13);
});

test("uses target defense when the spell declares one", () => {
  globalThis.game = { user: { targets: new Set([{ actor: { system: { derived: { mentalDefense: 16 } } } }]) } };
  const item = { system: { defense: "mental", difficulty: 12 } };
  assert.equal(spellSucceeded({}, item, { rolls: [{ total: 15 }] }), false);
  assert.equal(spellSucceeded({}, item, { rolls: [{ total: 16 }] }), true);
});

test("failed sustained casting is removed but successful casting remains", async () => {
  globalThis.game = { user: { targets: new Set() } };
  class ActorStub {
    constructor(total) { this.total = total; this.stopped = []; }
    async useSpell() { return { rolls: [{ total: this.total }] }; }
    async stopSustainedSpell(id) { this.stopped.push(id); }
  }
  installSpellOutcomeGuards(ActorStub);
  const spell = { id: "s1", type: "spell", system: { sustained: true, difficulty: 14 } };
  const failed = new ActorStub(13); await failed.useSpell(spell); assert.deepEqual(failed.stopped, ["s1"]);
  const success = new ActorStub(14); await success.useSpell(spell); assert.deepEqual(success.stopped, []);
});

test("outcome remains bound to the target declared before the asynchronous roll", async () => {
  const originalTarget = { system: { derived: { mentalDefense: 18 } } };
  const easierTarget = { system: { derived: { mentalDefense: 10 } } };
  globalThis.game = { user: { targets: new Set([{ actor: originalTarget }]) } };
  class ActorStub {
    constructor() { this.stopped = []; }
    async useSpell() { globalThis.game.user.targets = new Set([{ actor: easierTarget }]); return { rolls: [{ total: 14 }] }; }
    async stopSustainedSpell(id) { this.stopped.push(id); }
  }
  installSpellOutcomeGuards(ActorStub);
  const actor = new ActorStub();
  await actor.useSpell({ id: "bound", type: "spell", system: { sustained: true, defense: "mental" } });
  assert.deepEqual(actor.stopped, ["bound"]);
});

test("Cierre Restaurador heals only the declared owned target and respects healthCap", async () => {
  const target = {
    uuid: "Actor.target", isOwner: true,
    system: { resources: { health: { value: 5, max: 20 } }, recovery: { healthCap: 7 }, derived: {} },
    async update(change) { this.system.resources.health.value = change["system.resources.health.value"]; }
  };
  globalThis.game = { user: { targets: new Set([{ actor: target }]) } };
  class ActorStub { constructor() { this.name = "Maga"; } async useSpell() { return { rolls: [{ total: 20 }] }; } }
  installSpellOutcomeGuards(ActorStub);
  await new ActorStub().useSpell({ name: "Cierre Restaurador", type: "spell", system: { difficulty: 12 } });
  assert.equal(target.system.resources.health.value, 7);
});

test("failed Cierre Restaurador never heals", async () => {
  const target = { uuid: "Actor.target", isOwner: true, system: { resources: { health: { value: 5, max: 20 } }, recovery: { healthCap: 20 }, derived: {} }, async update() { throw new Error("must not heal"); } };
  globalThis.game = { user: { targets: new Set([{ actor: target }]) } };
  class ActorStub { async useSpell() { return { rolls: [{ total: 3 }] }; } }
  installSpellOutcomeGuards(ActorStub);
  await new ActorStub().useSpell({ name: "Cierre Restaurador", type: "spell", system: { difficulty: 12 } });
});

test("non-sustained spells never mutate sustained state", async () => {
  globalThis.game = { user: { targets: new Set() } };
  class ActorStub { async useSpell() { return { rolls: [{ total: 1 }] }; } async stopSustainedSpell() { throw new Error("must not be called"); } }
  installSpellOutcomeGuards(ActorStub);
  await new ActorStub().useSpell({ id: "s2", type: "spell", system: { sustained: false, difficulty: 20 } });
});
