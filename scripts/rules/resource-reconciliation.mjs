const RESOURCE_DERIVED_KEYS = Object.freeze({
  health: "healthMax",
  mana: "manaMax"
});

const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

function sourceResourceValue(actor, resource) {
  const source = actor?._source?.system?.resources?.[resource]?.value;
  if (source !== undefined) return number(source);
  return number(actor?.system?.resources?.[resource]?.value);
}

export function resourceMaximum(actor, resource) {
  const derivedKey = RESOURCE_DERIVED_KEYS[resource];
  if (!derivedKey) return 0;
  return Math.max(0, number(actor?.system?.derived?.[derivedKey]));
}

export function resourceReconciliationUpdates(actor) {
  if (!actor?.system) return {};
  const updates = {};

  for (const resource of Object.keys(RESOURCE_DERIVED_KEYS)) {
    if (!actor.system.resources?.[resource]) continue;
    const maximum = resourceMaximum(actor, resource);
    const previous = sourceResourceValue(actor, resource);
    const next = Math.max(0, Math.min(previous, maximum));
    if (next !== previous) updates["system.resources." + resource + ".value"] = next;

    if (resource === "health" && previous > 0 && next === 0) {
      updates["system.status.incapacitated"] = true;
      if (actor.type === "familiar") updates["system.familiar.incapacitated"] = true;
      if (actor.type === "character" && number(actor.system.status?.trauma) === 0) {
        updates["system.status.trauma"] = 1;
      }
    }
  }

  return updates;
}

const reconcilingActors = new WeakSet();

export async function reconcileActorResources(actor) {
  if (!actor?.system || reconcilingActors.has(actor)) return false;
  const updates = resourceReconciliationUpdates(actor);
  if (!Object.keys(updates).length) return false;

  reconcilingActors.add(actor);
  try {
    await actor.update(updates, { tmResourceReconcile: true });
    return true;
  } finally {
    reconcilingActors.delete(actor);
  }
}

function sameOriginatingUser(userId) {
  const current = globalThis.game?.user?.id;
  return !userId || !current || userId === current;
}

export function installResourceReconciliationHooks(HooksApi = globalThis.Hooks) {
  if (!HooksApi?.on) return;

  HooksApi.on("updateActor", (actor, _changes, options = {}, userId = null) => {
    if (options.tmResourceReconcile || !sameOriginatingUser(userId)) return;
    return reconcileActorResources(actor);
  });

  for (const hook of ["createItem", "updateItem", "deleteItem"]) {
    HooksApi.on(hook, (item, _changesOrOptions = {}, optionsOrUserId = {}, maybeUserId = null) => {
      const actor = item?.parent;
      if (!actor?.system) return;
      const options = hook === "updateItem" ? optionsOrUserId : _changesOrOptions;
      const userId = hook === "updateItem" ? maybeUserId : optionsOrUserId;
      if (options?.tmResourceReconcile || !sameOriginatingUser(userId)) return;
      return reconcileActorResources(actor);
    });
  }
}
