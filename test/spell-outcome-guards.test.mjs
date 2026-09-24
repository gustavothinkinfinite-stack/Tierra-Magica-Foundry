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
  const failed = new ActorStub(13);
  await failed.useSpell(spell);
  assert.deepEqual(failed.stopped, ["s1"]);
  const success = new ActorStub(14);
  await success.useSpell(spell);
  assert.deepEqual(success.stopped, []);
});

test("non-sustained spells never mutate sustained state", async () => {
  globalThis.game = { user: { targets: new Set() } };
  class ActorStub {
    async useSpell() { return { rolls: [{ total: 1 }] }; }
    async stopSustainedSpell() { throw new Error("must not be called"); }
  }
  installSpellOutcomeGuards(ActorStub);
  await new ActorStub().useSpell({ id: "s2", type: "spell", system: { sustained: false, difficulty: 20 } });
});
