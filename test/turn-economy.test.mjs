import test from "node:test";
import assert from "node:assert/strict";
import { resetActorTurnForCombat } from "../scripts/rules/turn-economy.mjs";

function actor(type = "character", previous = null) {
  return {
    type,
    previous,
    updates: [],
    getFlag() { return this.previous; },
    async update(data) { this.updates.push(data); },
    async setFlag(_scope, _key, value) { this.previous = value; }
  };
}

const combatant = { id: "c1" };
const combat = (round) => ({ id: "combat-1", round });

test("restores movement, action and reaction once when an actor enters a new round", async () => {
  const a = actor();
  assert.equal(await resetActorTurnForCombat(a, combat(1), combatant), true);
  assert.deepEqual(a.updates[0], {
    "system.turn.movement": true,
    "system.turn.action": true,
    "system.turn.reaction": true
  });
  assert.equal(await resetActorTurnForCombat(a, combat(1), combatant), false);
  assert.equal(a.updates.length, 1);
  assert.equal(await resetActorTurnForCombat(a, combat(2), combatant), true);
  assert.equal(a.updates.length, 2);
});

test("turn rewind and duplicate combatants cannot farm resources in the same or an older round", async () => {
  const a = actor("character", { combatId: "combat-1", combatantId: "c1", round: 3 });
  assert.equal(await resetActorTurnForCombat(a, combat(3), { id: "duplicate" }), false);
  assert.equal(await resetActorTurnForCombat(a, combat(2), combatant), false);
  assert.equal(a.updates.length, 0);
});

test("a new combat may grant a fresh first turn", async () => {
  const a = actor("npc", { combatId: "old-combat", combatantId: "c1", round: 9 });
  assert.equal(await resetActorTurnForCombat(a, { id: "new-combat", round: 1 }, combatant), true);
});

test("familiars do not receive an independent turn economy", async () => {
  const a = actor("familiar");
  assert.equal(await resetActorTurnForCombat(a, combat(1), combatant), false);
  assert.equal(a.updates.length, 0);
});

test("invalid or not-started combats do not reset resources", async () => {
  const a = actor();
  assert.equal(await resetActorTurnForCombat(a, { id: "combat-1", round: 0 }, combatant), false);
  assert.equal(await resetActorTurnForCombat(a, { id: "combat-1", round: null }, combatant), false);
  assert.equal(a.updates.length, 0);
});
