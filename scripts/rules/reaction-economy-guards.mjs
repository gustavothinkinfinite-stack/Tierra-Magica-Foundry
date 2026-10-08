// Control manual de Reacciones. No bloquear Parada, Contramagia,
// familiares ni técnicas por el indicador del turno; se preservan las
// validaciones específicas y el reinicio de efectos al cambiar de turno.

import { resetCurrentCombatantTurn } from "./turn-economy.mjs";

const REACTION_GUARD = Symbol("tierraMagicaReactionGuard");
let turnHookInstalled = false;

export async function runReaction(_actor, operation) {
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
