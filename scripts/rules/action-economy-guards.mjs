// Foundry T.M. — autoridad transversal para la Acción de activaciones ejecutables.
// Sólo consume después de una resolución válida; las validaciones fallidas no queman el turno.
// Un único bloqueo por Actor impide reutilizar la Acción concurrentemente entre subsistemas.

import { runReaction } from "./reaction-economy-guards.mjs";
import {
  commitTurnResourceReservation,
  releaseTurnResourceReservation,
  reserveTurnResourceAuthoritatively
} from "./state-authority.mjs";

const actionLocks = new WeakSet();
const reactionLocksByActor = new WeakSet();

function isNotificationResult(result) {
  if (!result) return false;
  try {
    return Boolean(globalThis.ui?.notifications?.has?.(result));
  } catch {
    return false;
  }
}

function actionWasResolved(result) {
  if (!result) return false;
  if (result?.tmActionResolved === true) return true;
  if (result?.tmActionResolved === false) return false;
  // Foundry v14 devuelve un objeto Notification desde ui.notifications.warn/info.
  // Ese objeto confirma que hubo un aviso, no que la Acción se haya resuelto.
  if (isNotificationResult(result)) return false;
  return true;
}

export async function runAction(actor, operation) {
  if (actor.system.status?.incapacitated || Number(actor.system.resources?.health?.value) <= 0) {
    ui.notifications.warn(actor.name + " está Incapacitado y no puede ejecutar una Acción.");
    return null;
  }
  if (!(actor.system.turn?.action ?? true)) {
    ui.notifications.warn(actor.name + " ya gastó su Acción.");
    return null;
  }
  if (actionLocks.has(actor)) {
    ui.notifications.warn(actor.name + " ya está resolviendo su Acción.");
    return null;
  }

  actionLocks.add(actor);
  let reservation = null;
  try {
    reservation = await reserveTurnResourceAuthoritatively(actor, "action");
    if (!reservation?.ok) {
      ui.notifications.warn(reservation?.error ?? actor.name + " no pudo reservar su Acción.");
      return null;
    }
    if (!reservation.claimed) {
      ui.notifications.warn(actor.name + (reservation.reason === "reserved"
        ? " tiene otra Acción pendiente de resolución. Completala o cancelala antes de iniciar otra."
        : " ya gastó su Acción."));
      return null;
    }

    const result = await operation();
    if (!actionWasResolved(result)) {
      await releaseTurnResourceReservation(actor, "action", reservation.reservationId);
      return null;
    }
    const committed = await commitTurnResourceReservation(actor, "action", reservation.reservationId);
    if (!committed?.ok) ui.notifications.warn(committed?.error ?? "No se pudo confirmar el gasto de Acción.");
    return result;
  } catch (error) {
    if (reservation?.claimed) await releaseTurnResourceReservation(actor, "action", reservation.reservationId);
    throw error;
  } finally {
    actionLocks.delete(actor);
  }
}

async function runReactionOperation(actor, operation) {
  // runReaction ya aporta la exclusión transversal con Parada/Contramagia/Familiar.
  // Este bloqueo local además impide dos lanzamientos reactivos simultáneos antes
  // de que el primero alcance a persistir el gasto de Reacción.
  if (reactionLocksByActor.has(actor)) {
    ui.notifications.warn(actor.name + " ya está resolviendo una Reacción.");
    return null;
  }
  reactionLocksByActor.add(actor);
  try {
    return await runReaction(actor, operation);
  } finally {
    reactionLocksByActor.delete(actor);
  }
}

export function installActionEconomyGuards(ActorClass) {
  const originalUseSpell = ActorClass.prototype.useSpell;
  const originalUseFormula = ActorClass.prototype.useFormula;
  const originalUseDevice = ActorClass.prototype.useDevice;
  const originalOverloadDevice = ActorClass.prototype.overloadDevice;
  const originalRollWeapon = ActorClass.prototype.rollWeapon;
  const originalDualWieldAttack = ActorClass.prototype.dualWieldAttack;
  const originalSweepAttack = ActorClass.prototype.sweepAttack;
  const originalGuard = ActorClass.prototype.guard;
  const originalCommandFamiliar = ActorClass.prototype.commandFamiliar;
  const originalUseFamiliarSense = ActorClass.prototype.useFamiliarSense;

  ActorClass.prototype.useSpell = async function (item, ...args) {
    // Los hechizos cuya ficha declara activación de Reacción pertenecen a esa economía,
    // no a la Acción. Esto incluye Barrera Cinética y futuras reacciones explícitas,
    // sin inferir activaciones nuevas por nombre o descripción.
    if (String(item?.system?.activation ?? "").trim().toLowerCase() === "reacción") {
      return runReactionOperation(this, () => originalUseSpell.call(this, item, ...args));
    }
    return runAction(this, () => originalUseSpell.call(this, item, ...args));
  };
  ActorClass.prototype.useFormula = async function (item, options = {}) {
    if (options?.tmAuthority === true) return originalUseFormula.call(this, item, options);
    const activation=String(item?.system?.activation ?? "").trim().toLowerCase();
    if (!activation) return runAction(this, () => originalUseFormula.call(this, item, options));
    if (activation.includes("reacción") || activation.includes("reaction")) {
      return runReactionOperation(this, () => originalUseFormula.call(this, item, options));
    }
    if (activation.includes("acción") || activation.includes("action")) {
      return runAction(this, () => originalUseFormula.call(this, item, options));
    }
    if (activation.includes("minuto") && globalThis.game?.combat?.started) {
      ui.notifications.warn(item.name + " requiere " + (item.system.activation || "tiempo prolongado") + "; no se resuelve como una sola Acción de combate.");
      return null;
    }
    return originalUseFormula.call(this, item, options);
  };
  ActorClass.prototype.useDevice = async function (item, ...args) {
    if (String(item?.system?.activation ?? "").trim().toLowerCase() === "reacción") {
      return runReactionOperation(this, () => originalUseDevice.call(this, item, ...args));
    }
    return runAction(this, () => originalUseDevice.call(this, item, ...args));
  };
  ActorClass.prototype.overloadDevice = async function (item, ...args) {
    if (String(item?.system?.activation ?? "").trim().toLowerCase() === "reacción") {
      return runReactionOperation(this, () => originalOverloadDevice.call(this, item, ...args));
    }
    return runAction(this, () => originalOverloadDevice.call(this, item, ...args));
  };

  // Combate ya valida y persiste el gasto internamente. Esta envoltura añade la
  // exclusión mutua compartida con magia/alquimia/dispositivos, cerrando el caso
  // de doble clic cruzado sin cambiar costes ni el orden de validación existente.
  ActorClass.prototype.rollWeapon = async function (item, options = {}) {
    if (options?.tmReactionAttack) return originalRollWeapon.call(this, item, options);
    return runAction(this, () => originalRollWeapon.call(this, item, options));
  };
  ActorClass.prototype.dualWieldAttack = async function (...args) {
    return runAction(this, () => originalDualWieldAttack.apply(this, args));
  };
  ActorClass.prototype.sweepAttack = async function (...args) {
    return runAction(this, () => originalSweepAttack.apply(this, args));
  };
  // Estas rutas también consumen la Acción y deben compartir el mismo bloqueo
  // transversal; de lo contrario un doble clic cruzado puede ejecutarlas a la vez.
  if (originalGuard) ActorClass.prototype.guard = async function (...args) {
    return runAction(this, () => originalGuard.apply(this, args));
  };
  if (originalCommandFamiliar) ActorClass.prototype.commandFamiliar = async function (...args) {
    return runAction(this, () => originalCommandFamiliar.apply(this, args));
  };
  if (originalUseFamiliarSense) ActorClass.prototype.useFamiliarSense = async function (...args) {
    return runAction(this, () => originalUseFamiliarSense.apply(this, args));
  };
}
