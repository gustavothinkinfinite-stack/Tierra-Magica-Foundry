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

const freshTurn = {
  "system.turn.movement": true,
  "system.turn.action": true,
  "system.turn.reaction": true,
  "system.combat.guardActive": false,
  "system.combat.parryActive": false,
  "system.combat.parrySucceeded": false,
  "system.combat.counterattackUsed": false
};

test("restores turn economy and expires turn-scoped defenses once per new round", async () => {
  const a = actor();
  assert.equal(await resetActorTurnForCombat(a, combat(1), combatant), true);
  assert.deepEqual(a.updates[0], freshTurn);
  assert.equal(await resetActorTurnForCombat(a, combat(1), combatant), false);
  assert.equal(a.updates.length, 1);
  assert.equal(await resetActorTurnForCombat(a, combat(2), combatant), true);
  assert.deepEqual(a.updates[1], freshTurn);
});

test("stale Guardia, Parada and Contraataque state cannot survive into a fresh turn", async () => {
  const a = actor("character", { combatId: "combat-1", combatantId: "c1", round: 1 });
  assert.equal(await resetActorTurnForCombat(a, combat(2), combatant), true);
  assert.equal(a.updates[0]["system.combat.guardActive"], false);
  assert.equal(a.updates[0]["system.combat.parryActive"], false);
  assert.equal(a.updates[0]["system.combat.parrySucceeded"], false);
  assert.equal(a.updates[0]["system.combat.counterattackUsed"], false);
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
