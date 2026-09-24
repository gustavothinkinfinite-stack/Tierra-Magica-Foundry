// Foundry T.M. — autoridad transversal para la Acción de activaciones ejecutables.
// Sólo consume después de una resolución válida; las validaciones fallidas no queman el turno.
// Un único bloqueo por Actor impide reutilizar la Acción concurrentemente entre subsistemas.

import { runReaction } from "./reaction-economy-guards.mjs";

const actionLocks = new WeakSet();
const reactionLocksByActor = new WeakSet();

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
  try {
    const result = await operation();
    if (!result) return result;
    await actor.update({ "system.turn.action": false });
    return result;
  } finally {
    actionLocks.delete(actor);
  }
}

async function runReactionSpell(actor, operation) {
  // runReaction ya aporta la exclusión transversal con Parada/Contramagia/Familiar.
  // Este bloqueo local además impide dos lanzamientos reactivos simultáneos antes
  // de que el primero alcance a persistir el gasto de Reacción.
  if (reactionLocksByActor.has(actor)) {
    ui.notifications.warn(actor.name + " ya está resolviendo un hechizo de Reacción.");
    return null;
  }
  reactionLocksByActor.add(actor);
  try {
    return await runReaction(actor, async () => {
      const result = await operation();
      if (!result) return result;
      await actor.update({ "system.turn.reaction": false });
      return result;
    });
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
      return runReactionSpell(this, () => originalUseSpell.call(this, item, ...args));
    }
    return runAction(this, () => originalUseSpell.call(this, item, ...args));
  };
  ActorClass.prototype.useFormula = async function (...args) {
    return runAction(this, () => originalUseFormula.apply(this, args));
  };
  ActorClass.prototype.useDevice = async function (...args) {
    return runAction(this, () => originalUseDevice.apply(this, args));
  };
  ActorClass.prototype.overloadDevice = async function (...args) {
    return runAction(this, () => originalOverloadDevice.apply(this, args));
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
