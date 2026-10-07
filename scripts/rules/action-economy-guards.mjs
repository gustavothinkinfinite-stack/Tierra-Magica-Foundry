// Foundry T.M. — economía de Acción permisiva.
//
// Foundry NO bloquea ni consume automáticamente Acción/Reacción. Los marcadores de
// turno son ayudas de mesa y se gestionan manualmente. Esta capa conserva únicamente
// validaciones que no pertenecen a la economía (por ejemplo Incapacitado o tiempos
// de activación incompatibles con una Acción de combate).

import { runReaction } from "./reaction-economy-guards.mjs";

export async function runAction(actor, operation) {
  if (actor.system.status?.incapacitated || Number(actor.system.resources?.health?.value) <= 0) {
    ui.notifications.warn(actor.name + " está Incapacitado y no puede ejecutar una Acción.");
    return null;
  }
  return operation();
}

async function runReactionOperation(actor, operation) {
  return runReaction(actor, operation);
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
    if (String(item?.system?.activation ?? "").trim().toLowerCase() === "reacción") {
      return runReactionOperation(this, () => originalUseSpell.call(this, item, ...args));
    }
    return runAction(this, () => originalUseSpell.call(this, item, ...args));
  };

  ActorClass.prototype.useFormula = async function (item, options = {}) {
    if (options?.tmAuthority === true) return originalUseFormula.call(this, item, options);
    const activation=String(item?.system?.activation ?? "").trim().toLowerCase();
    if (activation.includes("reacción") || activation.includes("reaction")) {
      return runReactionOperation(this, () => originalUseFormula.call(this, item, options));
    }
    if (activation.includes("minuto") && globalThis.game?.combat?.started) {
      ui.notifications.warn(item.name + " requiere " + (item.system.activation || "tiempo prolongado") + "; no se resuelve como una sola Acción de combate.");
      return null;
    }
    if (!activation || activation.includes("acción") || activation.includes("action")) {
      return runAction(this, () => originalUseFormula.call(this, item, options));
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
