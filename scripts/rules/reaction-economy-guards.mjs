// Foundry T.M. — economía de Reacción permisiva.
//
// La Reacción sigue existiendo como regla, pero Foundry no bloquea ni consume
// automáticamente su marcador. El tablero puede registrar el gasto manualmente.

import { resetCurrentCombatantTurn } from "./turn-economy.mjs";

const REACTION_GUARD = Symbol("tierraMagicaReactionGuard");
let turnHookInstalled = false;

export async function runReaction(actor, operation) {
  if (actor.system.status?.incapacitated || Number(actor.system.resources?.health?.value) <= 0) {
    ui.notifications.warn(actor.name + " está Incapacitado y no puede ejecutar una Reacción.");
    return null;
  }
  return operation();
}

function wrapReactionMethod(ActorClass, methodName) {
  const original = ActorClass.prototype[methodName];
  if (!original || original[REACTION_GUARD]) return;

  const guarded = async function (...args) {
    return runReaction(this, () => original.apply(this, args));
  };
  Object.defineProperty(guarded, REACTION_GUARD, { value: true });
  ActorClass.prototype[methodName] = guarded;
}

function installTurnTransitionHook() {
  if (turnHookInstalled || !globalThis.Hooks?.on) return;
  turnHookInstalled = true;
  Hooks.on("updateCombat", async (combat, changed) => {
    if (!("turn" in changed) && !("round" in changed)) return;
    if (!game.user?.isGM) return;
    const primaryGm = Array.from(game.users ?? [])
      .filter((user) => user.active && user.isGM)
      .sort((a, b) => String(a.id).localeCompare(String(b.id)))[0];
    if (!primaryGm || primaryGm.id !== game.user.id) return;
    await resetCurrentCombatantTurn(combat);
  });
}

export function installReactionEconomyGuards(ActorClass) {
  wrapReactionMethod(ActorClass, "parry");
  wrapReactionMethod(ActorClass, "useCounterspell");
  wrapReactionMethod(ActorClass, "receiveCharge");
  wrapReactionMethod(ActorClass, "interceptAttack");
  wrapReactionMethod(ActorClass, "linkedFamiliarAction");
  wrapReactionMethod(ActorClass, "triggerFamiliarReaction");
  installTurnTransitionHook();
}
