// Foundry T.M. — exclusión mutua transversal para Reacciones ejecutables.
// Las reglas especializadas conservan propiedad, disparadores y gasto; esta capa sólo
// impide que dos rutas asíncronas reutilicen simultáneamente la misma Reacción.

import { resetCurrentCombatantTurn } from "./turn-economy.mjs";

const reactionLocks = new WeakSet();
const REACTION_GUARD = Symbol("tierraMagicaReactionGuard");
let turnHookInstalled = false;

export async function runReaction(actor, operation) {
  if (!(actor.system.turn?.reaction ?? true)) {
    ui.notifications.warn(actor.name + " ya gastó su Reacción.");
    return null;
  }
  if (reactionLocks.has(actor)) {
    ui.notifications.warn(actor.name + " ya está resolviendo su Reacción.");
    return null;
  }

  reactionLocks.add(actor);
  try {
    return await operation();
  } finally {
    reactionLocks.delete(actor);
  }
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
  installTurnTransitionHook();
}
