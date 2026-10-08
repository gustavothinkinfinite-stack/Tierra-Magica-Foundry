// La economía de turno se controla en mesa. Foundry ejecuta cada operación
// sin bloquearla por Acción/Reacción gastada y conserva sus validaciones propias.
// Acción y Reacción son indicadores manuales, no candados automáticos.

export async function runAction(actor, operation) {
  if (actor.system?.status?.incapacitated || Number(actor.system?.resources?.health?.value) <= 0) {
    globalThis.ui?.notifications?.warn?.(actor.name + " está Incapacitado y no puede ejecutar una Acción.");
    return null;
  }
  return operation();
}

async function runReactionOperation(_actor, operation) {
  return operation();
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

  // Ataques mantienen validación de objetivos, defensas y daño,
  // pero no consultan ni modifican el indicador de Acción.
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
  // Guardia y familiares ejecutan directamente sus reglas específicas.
  // La Acción requerida se registra manualmente.
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
