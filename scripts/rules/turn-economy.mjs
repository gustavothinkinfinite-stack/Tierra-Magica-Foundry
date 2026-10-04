import {
  clearTurnResourceReservations,
  spendActorMovementAuthoritatively,
  withAuthoritativeTurnState
} from "./state-authority.mjs";

const TURN_FLAG = "lastTurnReset";

const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const actorIncapacitated = (actor) =>
  Boolean(actor?.system?.status?.incapacitated) ||
  number(actor?.system?.resources?.health?.value, 1) <= 0;

export function combatTurnStamp(combat, combatant) {
  if (!combat?.id || !combatant?.id) return null;
  const round = Number(combat.round);
  if (!Number.isInteger(round) || round < 1) return null;
  return { combatId: combat.id, combatantId: combatant.id, round };
}

export function movementAllowance(actor) {
  if (!actor || !["character", "npc"].includes(actor.type) || actorIncapacitated(actor)) return 0;
  const prepared = Math.max(0, number(actor.system?.derived?.movement));
  const extra = Math.max(0, number(actor.system?.turn?.extraMovement));
  return prepared + extra;
}

export function movementRemaining(actor) {
  const allowance = movementAllowance(actor);
  const spent = Math.max(0, number(actor?.system?.turn?.movementSpent));
  return Math.max(0, allowance - spent);
}

export async function spendActorMovement(actor, amount, companionUpdates = {}) {
  if (!actor || !["character", "npc"].includes(actor.type) || actorIncapacitated(actor)) return false;
  const extras = companionUpdates && typeof companionUpdates === "object" ? companionUpdates : {};
  const extraKeys = Object.keys(extras);
  const consumeReaction = extraKeys.length === 1 &&
    extraKeys[0] === "system.turn.reaction" &&
    extras["system.turn.reaction"] === false;
  if (extraKeys.length && !consumeReaction) return false;

  const result = await spendActorMovementAuthoritatively(actor, amount, { consumeReaction });
  if (!result?.ok && result?.error) globalThis.ui?.notifications?.warn?.(result.error);
  return result?.ok === true && result.spent === true;
}

export async function resetActorTurnForCombat(actor, combat, combatant) {
  return withAuthoritativeTurnState(actor, async () => {
    if (!actor || !["character", "npc"].includes(actor.type)) return false;
    const stamp = combatTurnStamp(combat, combatant);
    if (!stamp) return false;

    const previous = actor.getFlag?.("tierra-magica", TURN_FLAG) ?? null;
  if (previous?.combatId === stamp.combatId) {
    const previousRound = Number(previous.round) || 0;
    // Un Actor recibe su economía sólo una vez por ronda. Esto impide que
    // combatientes duplicados o rebobinar el turno creen recursos adicionales.
    if (stamp.round <= previousRound) return false;
  }

  // Movimiento es cuantificado: se reinicia el gasto, no un interruptor booleano.
  // Guardia, Parada y sus ventanas asociadas caducan antes de conceder la nueva economía.
  await clearTurnResourceReservations(actor);
  const incapacitated = actorIncapacitated(actor);
  const movementSpent = incapacitated ? Math.max(0, number(actor.system?.derived?.movement)) : 0;
  await actor.update({
    "system.turn.movementSpent": movementSpent,
    "system.turn.extraMovement": 0,
    "system.turn.action": !incapacitated,
    "system.turn.reaction": !incapacitated,
    "system.combat.guardActive": false,
    "system.combat.parryActive": false,
    "system.combat.parrySucceeded": false,
    "system.combat.counterattackUsed": false,
    "system.combat.parryBonus": 2,
    "system.combat.parrySourceItemId": "",
    "system.combat.kineticBarrierActive": false,
    "system.combat.kineticDefenseSource": "",
    "system.magic.preparedTrap": { trapUuid:"", triggerKey:"" }
  });
    await actor.setFlag?.("tierra-magica", TURN_FLAG, stamp);
    return true;
  });
}

export async function resetCurrentCombatantTurn(combat) {
  const combatant = combat?.combatant ?? null;
  return resetActorTurnForCombat(combatant?.actor ?? null, combat, combatant);
}
