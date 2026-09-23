// Foundry T.M. — exclusión mutua transversal para Reacciones ejecutables.
// Las reglas especializadas conservan propiedad, disparadores y gasto; esta capa sólo
// impide que dos rutas asíncronas reutilicen simultáneamente la misma Reacción.

const reactionLocks = new WeakSet();

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

export function installReactionEconomyGuards(ActorClass) {
  const originalParry = ActorClass.prototype.parry;
  const originalCounterspell = ActorClass.prototype.useCounterspell;
  const originalReceiveCharge = ActorClass.prototype.receiveCharge;
  const originalInterceptAttack = ActorClass.prototype.interceptAttack;

  if (originalParry) ActorClass.prototype.parry = async function (...args) {
    return runReaction(this, () => originalParry.apply(this, args));
  };
  if (originalCounterspell) ActorClass.prototype.useCounterspell = async function (...args) {
    return runReaction(this, () => originalCounterspell.apply(this, args));
  };
  if (originalReceiveCharge) ActorClass.prototype.receiveCharge = async function (...args) {
    return runReaction(this, () => originalReceiveCharge.apply(this, args));
  };
  if (originalInterceptAttack) ActorClass.prototype.interceptAttack = async function (...args) {
    return runReaction(this, () => originalInterceptAttack.apply(this, args));
  };
}
