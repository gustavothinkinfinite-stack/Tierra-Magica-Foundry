import test from "node:test";
import assert from "node:assert/strict";
import {
  movementAllowance,
  movementRemaining,
  resetActorTurnForCombat,
  spendActorMovement
} from "../scripts/rules/turn-economy.mjs";

function actor(type = "character", previous = null, {
  movement = 6,
  movementSpent = 0,
  extraMovement = 0,
  health = 10,
  incapacitated = false
} = {}) {
  return {
    type,
    previous,
    updates: [],
    system: {
      derived: { movement },
      turn: { movementSpent, extraMovement, action: true, reaction: true },
      resources: { health: { value: health } },
      status: { incapacitated },
      combat: {}
    },
    getFlag() { return this.previous; },
    async update(data) {
      this.updates.push(data);
      for (const [path, value] of Object.entries(data)) {
        const keys = path.split(".").slice(1);
        let target = this.system;
        while (keys.length > 1) {
          const key = keys.shift();
          target[key] ??= {};
          target = target[key];
        }
        target[keys[0]] = value;
      }
    },
    async setFlag(_scope, _key, value) { this.previous = value; }
  };
}

const combatant = { id: "c1" };
const combat = (round) => ({ id: "combat-1", round });

const freshTurn = {
  "system.turn.movementSpent": 0,
  "system.turn.extraMovement": 0,
  "system.turn.action": true,
  "system.turn.reaction": true,
  "system.combat.guardActive": false,
  "system.combat.parryActive": false,
  "system.combat.parrySucceeded": false,
  "system.combat.counterattackUsed": false,
  "system.combat.kineticBarrierActive": false
};

test("restores quantified turn economy and expires turn-scoped defenses once per new round", async () => {
  const a = actor();
  assert.equal(await resetActorTurnForCombat(a, combat(1), combatant), true);
  assert.deepEqual(a.updates[0], freshTurn);
  assert.equal(await resetActorTurnForCombat(a, combat(1), combatant), false);
  assert.equal(a.updates.length, 1);
  assert.equal(await resetActorTurnForCombat(a, combat(2), combatant), true);
  assert.deepEqual(a.updates[1], freshTurn);
});

test("movement may be divided without losing the unused remainder", async () => {
  const a = actor("character", null, { movement: 6 });
  assert.equal(movementAllowance(a), 6);
  assert.equal(movementRemaining(a), 6);
  assert.equal(await spendActorMovement(a, 2), true);
  assert.equal(movementRemaining(a), 4);
  assert.equal(await spendActorMovement(a, 3), true);
  assert.equal(movementRemaining(a), 1);
  assert.equal(await spendActorMovement(a, 2), false);
  assert.equal(movementRemaining(a), 1);
});

test("extra movement belongs to turn economy, not the Actor base movement", async () => {
  const a = actor("character", null, { movement: 5, extraMovement: 3, movementSpent: 4 });
  assert.equal(movementAllowance(a), 8);
  assert.equal(movementRemaining(a), 4);
  await resetActorTurnForCombat(a, combat(1), combatant);
  assert.equal(a.system.turn.extraMovement, 0);
  assert.equal(a.system.turn.movementSpent, 0);
});

test("incapacitated Actors have no movement allowance", async () => {
  const a = actor("character", null, { movement: 8, incapacitated: true });
  assert.equal(movementAllowance(a), 0);
  assert.equal(movementRemaining(a), 0);
  assert.equal(await spendActorMovement(a, 1), false);
  await resetActorTurnForCombat(a, combat(1), combatant);
  assert.equal(a.updates[0]["system.turn.action"], false);
  assert.equal(a.updates[0]["system.turn.reaction"], false);
  assert.equal(a.updates[0]["system.turn.movementSpent"], 8);

  // Recuperarse durante este mismo turno no concede Movimiento retroactivo.
  a.system.status.incapacitated = false;
  a.system.resources.health.value = 1;
  assert.equal(movementRemaining(a), 0);
});

test("stale Guardia, Parada and Contraataque state cannot survive into a fresh turn", async () => {
  const a = actor("character", { combatId: "combat-1", combatantId: "c1", round: 1 });
  assert.equal(await resetActorTurnForCombat(a, combat(2), combatant), true);
  assert.equal(a.updates[0]["system.combat.guardActive"], false);
  assert.equal(a.updates[0]["system.combat.parryActive"], false);
  assert.equal(a.updates[0]["system.combat.parrySucceeded"], false);
  assert.equal(a.updates[0]["system.combat.counterattackUsed"], false);
  assert.equal(a.updates[0]["system.combat.kineticBarrierActive"], false);
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
