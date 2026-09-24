const TURN_FLAG = "lastTurnReset";

export function combatTurnStamp(combat, combatant) {
  if (!combat?.id || !combatant?.id) return null;
  const round = Number(combat.round);
  if (!Number.isInteger(round) || round < 1) return null;
  return { combatId: combat.id, combatantId: combatant.id, round };
}

export async function resetActorTurnForCombat(actor, combat, combatant) {
  if (!actor || !["character", "npc"].includes(actor.type)) return false;
  const stamp = combatTurnStamp(combat, combatant);
  if (!stamp) return false;

  const previous = actor.getFlag?.("tierra-magica", TURN_FLAG) ?? null;
  if (previous?.combatId === stamp.combatId) {
    const previousRound = Number(previous.round) || 0;
    // An actor receives its economy only once per round. This also prevents
    // duplicate combatants and GM turn rewinds from farming extra actions.
    if (stamp.round <= previousRound) return false;
  }

  // Turn-scoped defenses expire before the fresh economy is granted. Guardia
  // explicitly lasts until the start of the actor's next turn; Parada and its
  // success/counterattack window cannot be banked into a later turn.
  const incapacitated = Boolean(actor.system?.status?.incapacitated) || Number(actor.system?.resources?.health?.value) <= 0;
  await actor.update({
    "system.turn.movement": !incapacitated,
    "system.turn.action": !incapacitated,
    "system.turn.reaction": !incapacitated,
    "system.combat.guardActive": false,
    "system.combat.parryActive": false,
    "system.combat.parrySucceeded": false,
    "system.combat.counterattackUsed": false,
    "system.combat.kineticBarrierActive": false
  });
  await actor.setFlag?.("tierra-magica", TURN_FLAG, stamp);
  return true;
}

export async function resetCurrentCombatantTurn(combat) {
  const combatant = combat?.combatant ?? null;
  return resetActorTurnForCombat(combatant?.actor ?? null, combat, combatant);
}
