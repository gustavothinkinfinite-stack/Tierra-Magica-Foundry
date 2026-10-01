import { primaryActiveGm, validatePendingDamageRequest } from "./damage-delivery.mjs";
import { validatePendingHealingRequest } from "./healing-delivery.mjs";
import { resourceMaximum } from "./resource-reconciliation.mjs";

const CHANNEL = "system.tierra-magica";
const SCOPE = "state-authority";
const pendingRequests = new Map();
const authorityQueues = new Map();
const turnReservations = new Map();
let bridgeInstalled = false;

const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const activeUsers = () => Array.from(globalThis.game?.users ?? []);
const currentUser = () => globalThis.game?.user ?? null;
const runtimeSocketAvailable = () => Boolean(globalThis.game?.socket?.emit && globalThis.game?.socket?.on);

function canModify(document) {
  const user = currentUser();
  if (typeof document?.canUserModify === "function") return Boolean(document.canUserModify(user, "update"));
  if (document && "isOwner" in document) return Boolean(document.isOwner);
  // Stubs/pruebas sin capa de permisos de Foundry: la presencia de update es la autoridad local.
  return typeof document?.update === "function";
}

function requestId() {
  const generated = globalThis.foundry?.utils?.randomID?.();
  if (generated) return generated;
  return "tm-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
}

async function serial(key, operation) {
  const previous = authorityQueues.get(key) ?? Promise.resolve();
  let release;
  const current = new Promise((resolve) => { release = resolve; });
  authorityQueues.set(key, current);
  await previous;
  try {
    return await operation();
  } finally {
    release();
    if (authorityQueues.get(key) === current) authorityQueues.delete(key);
  }
}

async function actorFromUuid(uuid) {
  if (!uuid || typeof globalThis.fromUuid !== "function") return null;
  return globalThis.fromUuid(uuid);
}

function actorAuthorityKey(actor) {
  return String(actor?.uuid ?? actor?.id ?? actor?.name ?? "");
}

function requesterMayModify(actor, requesterId = "") {
  const requester = activeUsers().find((user) => String(user?.id ?? "") === String(requesterId ?? "")) ?? currentUser();
  return Boolean(requester?.isGM) ||
    (typeof actor?.canUserModify === "function" ? Boolean(actor.canUserModify(requester, "update")) : Boolean(actor?.isOwner ?? typeof actor?.update === "function"));
}

function actorIncapacitated(actor) {
  return Boolean(actor?.system?.status?.incapacitated) || number(actor?.system?.resources?.health?.value, 1) <= 0;
}

function turnReservationKey(actor, resource) {
  return actorAuthorityKey(actor) + ":" + resource;
}

function currentTurnReservation(actor, resource) {
  return turnReservations.get(turnReservationKey(actor, resource)) ?? null;
}

async function reserveTurnResource(actor, resource, requesterId = "") {
  if (!["action", "reaction"].includes(resource)) return { ok:false, claimed:false, error:"Recurso de turno desconocido." };
  if (!actor?.system || typeof actor.update !== "function") return { ok:false, claimed:false, error:"El Actor de economía ya no está disponible." };
  if (!requesterMayModify(actor, requesterId)) return { ok:false, claimed:false, error:"El solicitante no posee permisos para usar la economía del Actor." };

  return serial("turn-state:" + actorAuthorityKey(actor), async () => {
    if (actorIncapacitated(actor)) return { ok:true, claimed:false, reason:"incapacitated" };
    if (!(actor.system.turn?.[resource] ?? true)) return { ok:true, claimed:false, reason:"spent" };
    if (currentTurnReservation(actor, resource)) return { ok:true, claimed:false, reason:"reserved" };
    const reservationId = requestId();
    turnReservations.set(turnReservationKey(actor, resource), {
      id:reservationId,
      requesterId:String(requesterId ?? ""),
      createdAt:Date.now()
    });
    return { ok:true, claimed:true, reservationId };
  });
}

async function finishTurnReservation(actor, resource, reservationId, requesterId = "", { commit = false } = {}) {
  if (!["action", "reaction"].includes(resource)) return { ok:false, error:"Recurso de turno desconocido." };
  if (!actor?.system || typeof actor.update !== "function") return { ok:false, error:"El Actor de economía ya no está disponible." };
  return serial("turn-state:" + actorAuthorityKey(actor), async () => {
    const reservation = currentTurnReservation(actor, resource);
    if (!reservation || reservation.id !== String(reservationId ?? "")) return { ok:false, error:"La reserva de economía ya no es válida." };
    if (reservation.requesterId && String(requesterId ?? "") !== reservation.requesterId) return { ok:false, error:"La reserva de economía pertenece a otro usuario." };
    if (commit && (actor.system.turn?.[resource] ?? true)) {
      await actor.update({ ["system.turn." + resource]: false });
    }
    turnReservations.delete(turnReservationKey(actor, resource));
    return { ok:true, committed:commit === true };
  });
}

async function spendMovement(actor, amount, requesterId = "", { consumeReaction = false } = {}) {
  if (!actor?.system || typeof actor.update !== "function") return { ok:false, spent:false, error:"El Actor de Movimiento ya no está disponible." };
  if (!requesterMayModify(actor, requesterId)) return { ok:false, spent:false, error:"El solicitante no posee permisos para mover el Actor." };
  if (!["character", "npc"].includes(actor.type)) return { ok:true, spent:false, reason:"type" };

  const requested = number(amount, Number.NaN);
  if (!Number.isFinite(requested) || requested < 0) return { ok:true, spent:false, reason:"amount" };

  return serial("turn-state:" + actorAuthorityKey(actor), async () => {
    if (actorIncapacitated(actor)) return { ok:true, spent:false, reason:"incapacitated" };
    if (consumeReaction) {
      if (!(actor.system.turn?.reaction ?? true)) return { ok:true, spent:false, reason:"reaction" };
      const reservation = currentTurnReservation(actor, "reaction");
      if (reservation?.requesterId && reservation.requesterId !== String(requesterId ?? "")) {
        return { ok:true, spent:false, reason:"reaction-reserved" };
      }
    }
    const prepared = Math.max(0, number(actor.system?.derived?.movement));
    const extra = Math.max(0, number(actor.system?.turn?.extraMovement));
    const spentBefore = Math.max(0, number(actor.system?.turn?.movementSpent));
    const remaining = Math.max(0, prepared + extra - spentBefore);
    if (requested > remaining) return { ok:true, spent:false, reason:"movement", remaining };
    if (requested === 0 && !consumeReaction) return { ok:true, spent:false, reason:"zero" };

    const updates = { "system.turn.movementSpent": spentBefore + requested };
    if (consumeReaction) updates["system.turn.reaction"] = false;
    await actor.update(updates);
    return { ok:true, spent:true, movementBefore:spentBefore, movementAfter:spentBefore + requested, remainingAfter:remaining - requested };
  });
}

function healthMutationUpdates(target, next, previous) {
  const updates = { "system.resources.health.value": next };
  if (previous > 0 && next === 0) {
    updates["system.status.incapacitated"] = true;
    if (target.type === "familiar") updates["system.familiar.incapacitated"] = true;
    if (target.type === "character" && number(target.system.status?.trauma) === 0) updates["system.status.trauma"] = 1;
  } else if (next > 0) {
    updates["system.status.incapacitated"] = false;
    if (target.type === "familiar") updates["system.familiar.incapacitated"] = false;
  }
  return updates;
}

function healingLimit(target) {
  const maximum = resourceMaximum(target, "health");
  const configured = number(target.system?.recovery?.healthCap, maximum);
  return Math.max(0, Math.min(maximum, configured));
}

async function mutateHealth(target, { damage = 0, healing = 0 } = {}) {
  if (!target?.system || typeof target.update !== "function") return { ok:false, error:"El objetivo de Vida ya no está disponible." };
  if (!canModify(target)) return { ok:false, error:"El DJ activo no puede modificar la Vida del objetivo." };

  return serial("health:" + (target.uuid ?? target.id ?? target.name), async () => {
    const maximum = resourceMaximum(target, "health");
    const previous = Math.max(0, number(target.system.resources?.health?.value));
    let next = previous;
    let applied = 0;

    const damageAmount = Math.max(0, number(damage));
    const healingAmount = Math.max(0, number(healing));
    if (damageAmount > 0) {
      next = Math.max(0, previous - damageAmount);
      applied = previous - next;
    } else if (healingAmount > 0) {
      next = Math.min(healingLimit(target), previous + healingAmount);
      applied = Math.max(0, next - previous);
    }

    next = Math.min(maximum, next);
    if (next !== previous) await target.update(healthMutationUpdates(target, next, previous));
    return { ok:true, healthBefore:previous, healthAfter:next, applied };
  });
}

async function executeAuthorityAction(action, payload = {}, requesterId = "") {
  if (action === "reserve-turn-resource" || action === "commit-turn-resource" || action === "release-turn-resource" || action === "spend-movement") {
    const actor = await actorFromUuid(String(payload.actorUuid ?? ""));
    if (!actor) return { ok:false, error:"El Actor de economía ya no está disponible." };

    if (action === "reserve-turn-resource") return reserveTurnResource(actor, String(payload.resource ?? ""), requesterId);
    if (action === "commit-turn-resource") {
      return finishTurnReservation(actor, String(payload.resource ?? ""), String(payload.reservationId ?? ""), requesterId, { commit:true });
    }
    if (action === "release-turn-resource") {
      return finishTurnReservation(actor, String(payload.resource ?? ""), String(payload.reservationId ?? ""), requesterId, { commit:false });
    }
    return spendMovement(actor, payload.amount, requesterId, { consumeReaction:payload.consumeReaction === true });
  }

  if (action === "claim-kinetic") {
    const target = await actorFromUuid(String(payload.targetUuid ?? ""));
    if (!target?.system || typeof target.update !== "function") {
      return { ok:false, error:"El objetivo de la defensa cinética ya no está disponible." };
    }
    if (!canModify(target)) return { ok:false, error:"El DJ activo no puede modificar el objetivo de la defensa cinética." };

    return serial("kinetic:" + target.uuid, async () => {
      const active = Boolean(target.system.combat?.kineticBarrierActive);
      const source = String(target.system.combat?.kineticDefenseSource || "Defensa cinética");
      if (!active) return { ok:true, claimed:false, source:"" };
      await target.update({
        "system.combat.kineticBarrierActive": false,
        "system.combat.kineticDefenseSource": ""
      });
      return { ok:true, claimed:true, source };
    });
  }

  if (action === "claim-parry") {
    const target = await actorFromUuid(String(payload.targetUuid ?? ""));
    if (!target?.system || typeof target.update !== "function") return { ok:false, error:"El objetivo de Parada ya no está disponible." };
    if (!canModify(target)) return { ok:false, error:"El DJ activo no puede modificar el estado de Parada." };
    return serial("parry:" + (target.uuid ?? target.id ?? target.name), async () => {
      if (!target.system.combat?.parryActive) return { ok:true, claimed:false };
      await target.update({
        "system.combat.parryActive": false,
        "system.combat.parrySucceeded": false,
        "system.combat.counterattackUsed": false
      });
      return { ok:true, claimed:true };
    });
  }

  if (action === "resolve-parry") {
    const target = await actorFromUuid(String(payload.targetUuid ?? ""));
    if (!target?.system || typeof target.update !== "function") return { ok:false, error:"El objetivo de Parada ya no está disponible." };
    if (!canModify(target)) return { ok:false, error:"El DJ activo no puede cerrar el estado de Parada." };
    return serial("parry:" + (target.uuid ?? target.id ?? target.name), async () => {
      await target.update({
        "system.combat.parryActive": false,
        "system.combat.parrySucceeded": payload.succeeded === true,
        "system.combat.counterattackUsed": false
      });
      return { ok:true, succeeded:payload.succeeded === true };
    });
  }

  if (action === "claim-counterattack") {
    const target = await actorFromUuid(String(payload.targetUuid ?? ""));
    if (!target?.system || typeof target.update !== "function") return { ok:false, error:"El Actor de Contraataque ya no está disponible." };
    const requester = activeUsers().find((user) => String(user?.id ?? "") === String(requesterId ?? "")) ?? currentUser();
    const requesterMayUpdate = Boolean(requester?.isGM) ||
      (typeof target.canUserModify === "function" ? Boolean(target.canUserModify(requester, "update")) : Boolean(target.isOwner));
    if (!requesterMayUpdate) return { ok:false, error:"El solicitante no posee permisos para consumir Contraataque." };

    return serial("counterattack:" + (target.uuid ?? target.id ?? target.name), async () => {
      if (!target.system.combat?.parrySucceeded) return { ok:true, claimed:false, reason:"parry" };
      if (target.system.combat?.counterattackUsed) return { ok:true, claimed:false, reason:"used" };
      await target.update({
        "system.combat.parryActive": false,
        "system.combat.parrySucceeded": false,
        "system.combat.counterattackUsed": true
      });
      return { ok:true, claimed:true };
    });
  }

  if (action === "apply-health-damage" || action === "apply-health-healing") {
    const target = await actorFromUuid(String(payload.targetUuid ?? ""));
    if (!target) return { ok:false, error:"El objetivo de Vida ya no está disponible." };
    const requester = activeUsers().find((user) => String(user?.id ?? "") === String(requesterId ?? "")) ?? currentUser();
    const requesterMayUpdate = Boolean(requester?.isGM) ||
      (typeof target.canUserModify === "function" ? Boolean(target.canUserModify(requester, "update")) : Boolean(target.isOwner));
    if (!requesterMayUpdate) return { ok:false, error:"El solicitante no posee permisos para modificar directamente la Vida del objetivo." };
    if (action === "apply-health-damage") return mutateHealth(target, { damage:payload.amount });
    return mutateHealth(target, { healing:payload.amount });
  }

  if (action === "consume-device-energy") {
    const actor = await actorFromUuid(String(payload.actorUuid ?? ""));
    const source = actor?.items?.get?.(String(payload.sourceItemId ?? "")) ?? null;
    if (!actor || !source || source.type !== "device" || typeof source.update !== "function") {
      return { ok:false, error:"La fuente de Energía ya no está disponible en el Actor." };
    }
    if (!canModify(source)) return { ok:false, error:"El DJ activo no puede modificar la fuente de Energía." };

    const consumption = Math.max(0, number(payload.consumption));
    const flowBonus = Math.max(0, number(payload.flowBonus));
    return serial("energy:" + source.uuid, async () => {
      if (String(source.system?.condition ?? "operative") === "disabled") {
        return { ok:false, error:source.name + " está Deshabilitado y no puede aportar Energía." };
      }
      const energy = Math.max(0, number(source.system?.energy?.value));
      const flow = Math.max(0, number(source.system?.flow));
      if (consumption > flow + flowBonus) {
        return { ok:false, error:"Caudal insuficiente en " + source.name + "." };
      }
      if (consumption > energy) {
        return { ok:false, error:source.name + " no tiene Energía suficiente para esta activación." };
      }
      if (consumption) await source.update({ "system.energy.value": energy - consumption });
      return { ok:true, energyBefore:energy, energyAfter:energy - consumption, flow };
    });
  }

  return { ok:false, error:"Operación de autoridad desconocida." };
}

async function requestPrimaryGm(action, payload) {
  const gm = primaryActiveGm(activeUsers());
  if (!gm) return { ok:false, error:"Se requiere un DJ activo para resolver esta mutación compartida con seguridad." };
  if (gm.id === currentUser()?.id) return executeAuthorityAction(action, payload, currentUser()?.id ?? "");
  if (!runtimeSocketAvailable()) return { ok:false, error:"No está disponible el canal de autoridad del sistema." };

  installStateAuthorityBridge();
  const id = requestId();
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      pendingRequests.delete(id);
      resolve({ ok:false, error:"El DJ activo no respondió a la operación compartida." });
    }, 8000);
    pendingRequests.set(id, (result) => {
      clearTimeout(timeout);
      pendingRequests.delete(id);
      resolve(result);
    });
    game.socket.emit(CHANNEL, {
      scope:SCOPE,
      kind:"request",
      requestId:id,
      requesterId:currentUser()?.id ?? "",
      action,
      payload
    });
  });
}

export function installStateAuthorityBridge() {
  if (bridgeInstalled || !runtimeSocketAvailable()) return false;
  bridgeInstalled = true;
  game.socket.on(CHANNEL, async (message) => {
    if (message?.scope !== SCOPE) return;

    if (message.kind === "response") {
      if (message.requesterId !== currentUser()?.id) return;
      pendingRequests.get(message.requestId)?.(message.result ?? { ok:false, error:"Respuesta de autoridad inválida." });
      return;
    }

    if (message.kind !== "request") return;
    const gm = primaryActiveGm(activeUsers());
    if (!gm || gm.id !== currentUser()?.id) return;

    const result = await executeAuthorityAction(message.action, message.payload, message.requesterId);
    game.socket.emit(CHANNEL, {
      scope:SCOPE,
      kind:"response",
      requestId:message.requestId,
      requesterId:message.requesterId,
      result
    });
  });
  return true;
}

export function canResolveSharedMutation(document = null) {
  if (!runtimeSocketAvailable()) return !document || canModify(document);
  return Boolean(primaryActiveGm(activeUsers()));
}

export async function reserveTurnResourceAuthoritatively(actor, resource) {
  const kind = String(resource ?? "").trim().toLowerCase();
  if (!["action", "reaction"].includes(kind)) return { ok:false, claimed:false, error:"Recurso de turno desconocido." };

  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, claimed:false, error:"Se requiere un DJ activo para reservar la economía de turno." };
    if (!actor?.uuid) return { ok:false, claimed:false, error:"El Actor no posee UUID para arbitrar su economía." };
    return requestPrimaryGm("reserve-turn-resource", { actorUuid:actor.uuid, resource:kind });
  }
  return reserveTurnResource(actor, kind, currentUser()?.id ?? "");
}

export async function commitTurnResourceReservation(actor, resource, reservationId) {
  const kind = String(resource ?? "").trim().toLowerCase();
  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, error:"Se requiere un DJ activo para confirmar la economía de turno." };
    if (!actor?.uuid) return { ok:false, error:"El Actor no posee UUID para arbitrar su economía." };
    return requestPrimaryGm("commit-turn-resource", { actorUuid:actor.uuid, resource:kind, reservationId:String(reservationId ?? "") });
  }
  return finishTurnReservation(actor, kind, String(reservationId ?? ""), currentUser()?.id ?? "", { commit:true });
}

export async function releaseTurnResourceReservation(actor, resource, reservationId) {
  const kind = String(resource ?? "").trim().toLowerCase();
  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, error:"Se requiere un DJ activo para liberar la economía de turno." };
    if (!actor?.uuid) return { ok:false, error:"El Actor no posee UUID para arbitrar su economía." };
    return requestPrimaryGm("release-turn-resource", { actorUuid:actor.uuid, resource:kind, reservationId:String(reservationId ?? "") });
  }
  return finishTurnReservation(actor, kind, String(reservationId ?? ""), currentUser()?.id ?? "", { commit:false });
}

export async function spendActorMovementAuthoritatively(actor, amount, { consumeReaction = false } = {}) {
  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, spent:false, error:"Se requiere un DJ activo para gastar Movimiento compartido." };
    if (!actor?.uuid) return { ok:false, spent:false, error:"El Actor no posee UUID para arbitrar su Movimiento." };
    return requestPrimaryGm("spend-movement", {
      actorUuid:actor.uuid,
      amount:number(amount, Number.NaN),
      consumeReaction:consumeReaction === true
    });
  }
  return spendMovement(actor, amount, currentUser()?.id ?? "", { consumeReaction });
}

export function clearTurnResourceReservations(actor) {
  turnReservations.delete(turnReservationKey(actor, "action"));
  turnReservations.delete(turnReservationKey(actor, "reaction"));
}

export async function withAuthoritativeTurnState(actor, operation) {
  return serial("turn-state:" + actorAuthorityKey(actor), operation);
}

export async function claimKineticBarrier(target) {
  if (!target?.system?.combat?.kineticBarrierActive) return { ok:true, claimed:false, source:"" };

  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, claimed:false, error:"Se requiere un DJ activo para consumir la defensa cinética con seguridad." };
    if (!target.uuid) return { ok:false, claimed:false, error:"El objetivo no posee UUID para arbitrar la defensa cinética." };
    return requestPrimaryGm("claim-kinetic", { targetUuid:target.uuid });
  }

  if (!canModify(target)) return { ok:false, claimed:false, error:"No hay permisos para consumir la defensa cinética." };
  return serial("kinetic-local:" + (target.uuid ?? target.id ?? target.name), async () => {
    if (!target.system?.combat?.kineticBarrierActive) return { ok:true, claimed:false, source:"" };
    const source = String(target.system.combat?.kineticDefenseSource || "Defensa cinética");
    await target.update({
      "system.combat.kineticBarrierActive": false,
      "system.combat.kineticDefenseSource": ""
    });
    return { ok:true, claimed:true, source };
  });
}

export async function claimParryAuthoritatively(target) {
  if (!target?.system?.combat?.parryActive) return { ok:true, claimed:false };
  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, claimed:false, error:"Se requiere un DJ activo para consumir Parada con seguridad." };
    if (!target?.uuid) return { ok:false, claimed:false, error:"El objetivo no posee UUID para arbitrar Parada." };
    return requestPrimaryGm("claim-parry", { targetUuid:target.uuid });
  }
  if (!canModify(target)) return { ok:false, claimed:false, error:"No hay permisos para consumir Parada." };
  return serial("parry-local:" + (target.uuid ?? target.id ?? target.name), async () => {
    if (!target.system?.combat?.parryActive) return { ok:true, claimed:false };
    await target.update({
      "system.combat.parryActive": false,
      "system.combat.parrySucceeded": false,
      "system.combat.counterattackUsed": false
    });
    return { ok:true, claimed:true };
  });
}

export async function resolveParryAuthoritatively(target, succeeded) {
  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, error:"Se requiere un DJ activo para cerrar Parada con seguridad." };
    if (!target?.uuid) return { ok:false, error:"El objetivo no posee UUID para arbitrar Parada." };
    return requestPrimaryGm("resolve-parry", { targetUuid:target.uuid, succeeded:succeeded === true });
  }
  if (!canModify(target)) return { ok:false, error:"No hay permisos para cerrar Parada." };
  return serial("parry-local:" + (target.uuid ?? target.id ?? target.name), async () => {
    await target.update({
      "system.combat.parryActive": false,
      "system.combat.parrySucceeded": succeeded === true,
      "system.combat.counterattackUsed": false
    });
    return { ok:true, succeeded:succeeded === true };
  });
}

export async function claimCounterattackAuthoritatively(target) {
  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, claimed:false, error:"Se requiere un DJ activo para consumir Contraataque con seguridad." };
    if (!target?.uuid) return { ok:false, claimed:false, error:"El Actor no posee UUID para arbitrar Contraataque." };
    return requestPrimaryGm("claim-counterattack", { targetUuid:target.uuid });
  }

  if (!canModify(target)) return { ok:false, claimed:false, error:"No hay permisos para consumir Contraataque." };
  return serial("counterattack-local:" + (target.uuid ?? target.id ?? target.name), async () => {
    if (!target.system?.combat?.parrySucceeded) return { ok:true, claimed:false, reason:"parry" };
    if (target.system?.combat?.counterattackUsed) return { ok:true, claimed:false, reason:"used" };
    await target.update({
      "system.combat.parryActive": false,
      "system.combat.parrySucceeded": false,
      "system.combat.counterattackUsed": true
    });
    return { ok:true, claimed:true };
  });
}

export async function applyHealthDamageAuthoritatively(target, damage) {
  const amount = Math.max(0, number(damage));
  if (!amount) return { ok:true, healthBefore:number(target?.system?.resources?.health?.value), healthAfter:number(target?.system?.resources?.health?.value), applied:0 };

  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, error:"Se requiere un DJ activo para aplicar daño compartido con seguridad." };
    if (!target?.uuid) return { ok:false, error:"El objetivo no posee UUID para arbitrar su Vida." };
    return requestPrimaryGm("apply-health-damage", { targetUuid:target.uuid, amount });
  }
  return mutateHealth(target, { damage:amount });
}

export async function applyHealthHealingAuthoritatively(target, healing) {
  const amount = Math.max(0, number(healing));
  if (!amount) return { ok:true, healthBefore:number(target?.system?.resources?.health?.value), healthAfter:number(target?.system?.resources?.health?.value), applied:0 };

  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, error:"Se requiere un DJ activo para aplicar curación compartida con seguridad." };
    if (!target?.uuid) return { ok:false, error:"El objetivo no posee UUID para arbitrar su Vida." };
    return requestPrimaryGm("apply-health-healing", { targetUuid:target.uuid, amount });
  }
  return mutateHealth(target, { healing:amount });
}

export async function approvePendingDamageAuthoritatively(message) {
  const primary = primaryActiveGm(activeUsers());
  if (!currentUser()?.isGM || !primary || primary.id !== currentUser()?.id) return { ok:false, error:"Sólo el DJ activo principal puede aprobar daño pendiente." };
  const messageId = String(message?.id ?? message?._id ?? "");
  if (!messageId) return { ok:false, error:"La solicitud de daño no posee identidad persistente." };
  return serial("pending-damage:" + messageId, async () => {
    const request = validatePendingDamageRequest(message.getFlag?.("tierra-magica", "pendingDamage"));
    if (!request) return { ok:true, resolved:false, alreadyResolved:true, applied:0 };
    const target = await actorFromUuid(request.targetUuid);
    if (!target) return { ok:false, error:"El objetivo de esta solicitud ya no está disponible." };
    const result = await applyHealthDamageAuthoritatively(target, request.damage);
    if (!result.ok) return result;
    await message.setFlag?.("tierra-magica", "pendingDamage", { ...request, resolved:true });
    return { ...result, resolved:true, alreadyResolved:false };
  });
}

export async function approvePendingHealingAuthoritatively(message) {
  const primary = primaryActiveGm(activeUsers());
  if (!currentUser()?.isGM || !primary || primary.id !== currentUser()?.id) return { ok:false, error:"Sólo el DJ activo principal puede aprobar curación pendiente." };
  const messageId = String(message?.id ?? message?._id ?? "");
  if (!messageId) return { ok:false, error:"La solicitud de curación no posee identidad persistente." };
  return serial("pending-healing:" + messageId, async () => {
    const request = validatePendingHealingRequest(message.getFlag?.("tierra-magica", "pendingHealing"));
    if (!request) return { ok:true, resolved:false, alreadyResolved:true, applied:0 };
    const target = await actorFromUuid(request.targetUuid);
    if (!target) return { ok:false, error:"El objetivo de esta curación ya no está disponible." };
    const result = await applyHealthHealingAuthoritatively(target, request.healing);
    if (!result.ok) return result;
    await message.setFlag?.("tierra-magica", "pendingHealing", { ...request, resolved:true });
    return { ...result, resolved:true, alreadyResolved:false };
  });
}

export async function consumeDeviceEnergyAuthoritatively(actor, source, consumption, { flowBonus = 0 } = {}) {
  const amount = Math.max(0, number(consumption));
  if (!amount) {
    return {
      ok:true,
      energyBefore:Math.max(0, number(source?.system?.energy?.value)),
      energyAfter:Math.max(0, number(source?.system?.energy?.value)),
      flow:Math.max(0, number(source?.system?.flow))
    };
  }

  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, error:"Se requiere un DJ activo para serializar el consumo de Energía." };
    if (!actor?.uuid || !source?.id) return { ok:false, error:"La fuente de Energía no posee identidad persistente." };
    return requestPrimaryGm("consume-device-energy", {
      actorUuid:actor.uuid,
      sourceItemId:source.id,
      consumption:amount,
      flowBonus:Math.max(0, number(flowBonus))
    });
  }

  if (!canModify(source)) return { ok:false, error:"No hay permisos para consumir la fuente de Energía." };
  return serial("energy-local:" + (source.uuid ?? source.id ?? source.name), async () => {
    if (String(source.system?.condition ?? "operative") === "disabled") {
      return { ok:false, error:source.name + " está Deshabilitado y no puede aportar Energía." };
    }
    const energy = Math.max(0, number(source.system?.energy?.value));
    const flow = Math.max(0, number(source.system?.flow));
    const bonus = Math.max(0, number(flowBonus));
    if (amount > flow + bonus) return { ok:false, error:"Caudal insuficiente en " + source.name + "." };
    if (amount > energy) return { ok:false, error:source.name + " no tiene Energía suficiente para esta activación." };
    await source.update({ "system.energy.value": energy - amount });
    return { ok:true, energyBefore:energy, energyAfter:energy - amount, flow };
  });
}
