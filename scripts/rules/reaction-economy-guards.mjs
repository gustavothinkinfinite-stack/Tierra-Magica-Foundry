// Foundry T.M. — exclusión mutua transversal para Reacciones ejecutables.
// Las reglas especializadas conservan propiedad, disparadores y gasto; esta capa sólo
// impide que dos rutas asíncronas reutilicen simultáneamente la misma Reacción.

import { resetCurrentCombatantTurn } from "./turn-economy.mjs";
import {
  commitTurnResourceReservation,
  releaseTurnResourceReservation,
  reserveTurnResourceAuthoritatively
} from "./state-authority.mjs";

const reactionLocks = new WeakSet();
const REACTION_GUARD = Symbol("tierraMagicaReactionGuard");
let turnHookInstalled = false;

function isNotificationResult(result) {
  if (!result) return false;
  try {
    return Boolean(globalThis.ui?.notifications?.has?.(result));
  } catch {
    return false;
  }
}

function reactionWasResolved(result) {
  if (!result) return false;
  if (result?.tmReactionResolved === true) return true;
  if (result?.tmReactionResolved === false) return false;
  if (isNotificationResult(result)) return false;
  return true;
}

export async function runReaction(actor, operation) {
  if (actor.system.status?.incapacitated || Number(actor.system.resources?.health?.value) <= 0) {
    ui.notifications.warn(actor.name + " está Incapacitado y no puede ejecutar una Reacción.");
    return null;
  }
  if (!(actor.system.turn?.reaction ?? true)) {
    ui.notifications.warn(actor.name + " ya gastó su Reacción.");
    return null;
  }
  if (reactionLocks.has(actor)) {
    ui.notifications.warn(actor.name + " tiene otra Reacción pendiente de resolución. Completala o cancelala antes de iniciar otra.");
    return null;
  }

  reactionLocks.add(actor);
  let reservation = null;
  try {
    reservation = await reserveTurnResourceAuthoritatively(actor, "reaction");
    if (!reservation?.ok) {
      ui.notifications.warn(reservation?.error ?? actor.name + " no pudo reservar su Reacción.");
      return null;
    }
    if (!reservation.claimed) {
      ui.notifications.warn(actor.name + (reservation.reason === "reserved"
        ? " tiene otra Reacción pendiente de resolución. Completala o cancelala antes de iniciar otra."
        : " ya gastó su Reacción."));
      return null;
    }

    const result = await operation();
    if (!reactionWasResolved(result)) {
      await releaseTurnResourceReservation(actor, "reaction", reservation.reservationId);
      return null;
    }
    const committed = await commitTurnResourceReservation(actor, "reaction", reservation.reservationId);
    if (!committed?.ok) ui.notifications.warn(committed?.error ?? "No se pudo confirmar el gasto de Reacción.");
    return result;
  } catch (error) {
    if (reservation?.claimed) await releaseTurnResourceReservation(actor, "reaction", reservation.reservationId);
    throw error;
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
  wrapReactionMethod(ActorClass, "linkedFamiliarAction");
  wrapReactionMethod(ActorClass, "triggerFamiliarReaction");
  installTurnTransitionHook();
}
