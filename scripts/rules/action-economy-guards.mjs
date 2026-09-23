// Foundry T.M. — autoridad transversal para la Acción de activaciones ejecutables.
// Sólo consume después de una resolución válida; las validaciones fallidas no queman el turno.

async function runAction(actor, operation) {
  if (!(actor.system.turn?.action ?? true)) {
    ui.notifications.warn(actor.name + " ya gastó su Acción.");
    return null;
  }

  const result = await operation();
  if (!result) return result;

  // La operación ya fue validada y ejecutada. El guard se instala por fuera de los
  // guards específicos para que éstos sigan siendo autoridad de objetivos, recursos
  // y requisitos, mientras esta capa es autoridad únicamente de economía de turno.
  await actor.update({ "system.turn.action": false });
  return result;
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
