// Serialización local de mutaciones de recursos por Actor.
// Evita escrituras "last write wins" cuando daño, curación, descanso, magia o alquimia
// intentan modificar Vida/Maná simultáneamente desde rutas asíncronas del mismo cliente.

const actorResourceQueues = new WeakMap();

export async function withActorResourceLock(actor, operation) {
  if (!actor || (typeof actor !== "object" && typeof actor !== "function")) return operation();
  const previous = actorResourceQueues.get(actor) ?? Promise.resolve();
  let release;
  const current = new Promise((resolve) => { release = resolve; });
  actorResourceQueues.set(actor, current);
  await previous;
  try {
    return await operation();
  } finally {
    release();
    if (actorResourceQueues.get(actor) === current) actorResourceQueues.delete(actor);
  }
}
