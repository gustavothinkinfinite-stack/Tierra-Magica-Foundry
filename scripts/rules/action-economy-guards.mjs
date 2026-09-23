// Foundry T.M. — autoridad transversal para la Acción de activaciones ejecutables.
// Sólo consume después de una resolución válida; las validaciones fallidas no queman el turno.
// Un único bloqueo por Actor impide reutilizar la Acción concurrentemente entre subsistemas.

const actionLocks = new WeakSet();

export async function runAction(actor, operation) {
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

    // La operación ya fue validada y ejecutada. Los guards específicos conservan
    // autoridad sobre objetivos, recursos y requisitos; esta capa sólo gobierna
    // la economía y la exclusión mutua de la Acción.
    await actor.update({ "system.turn.action": false });
    return result;
  } finally {
    actionLocks.delete(actor);
  }
}

export function installActionEconomyGuards(ActorClass) {
  const originalUseSpell = ActorClass.prototype.useSpell;
  const originalUseFormula = ActorClass.prototype.useFormula;
  const originalUseDevice = ActorClass.prototype.useDevice;
  const originalOverloadDevice = ActorClass.prototype.overloadDevice;

  ActorClass.prototype.useSpell = async function (...args) {
    return runAction(this, () => originalUseSpell.apply(this, args));
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
}
