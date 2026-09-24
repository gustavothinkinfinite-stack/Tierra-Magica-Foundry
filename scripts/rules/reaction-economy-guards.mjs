// Foundry T.M. — exclusión mutua transversal para Reacciones ejecutables.
// Las reglas especializadas conservan propiedad, disparadores y gasto; esta capa sólo
// impide que dos rutas asíncronas reutilicen simultáneamente la misma Reacción.

const reactionLocks = new WeakSet();
const REACTION_GUARD = Symbol("tierraMagicaReactionGuard");

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

export function installReactionEconomyGuards(ActorClass) {
  wrapReactionMethod(ActorClass, "parry");
  wrapReactionMethod(ActorClass, "useCounterspell");
  wrapReactionMethod(ActorClass, "receiveCharge");
  wrapReactionMethod(ActorClass, "interceptAttack");
}
