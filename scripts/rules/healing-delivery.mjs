import { resourceMaximum } from "./resource-reconciliation.mjs";

function number(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function healingCap(actor) {
  const maximum = resourceMaximum(actor, "health");
  const configured = number(actor?.system?.recovery?.healthCap, maximum);
  return Math.max(0, Math.min(maximum, configured));
}

export function healingAmount(actor, requested) {
  const current = Math.max(0, number(actor?.system?.resources?.health?.value));
  return Math.max(0, Math.min(Math.max(0, number(requested)), healingCap(actor) - current));
}

export function pendingHealingRequest({ targetUuid, healing, source = "", caster = "" } = {}) {
  const amount = Math.max(0, Math.floor(number(healing)));
  if (!targetUuid || amount <= 0) return null;
  return { targetUuid: String(targetUuid), healing: amount, source: String(source), caster: String(caster), resolved: false };
}

export function validatePendingHealingRequest(request) {
  if (!request || request.resolved === true) return null;
  const healing = Math.max(0, Math.floor(number(request.healing)));
  if (!request.targetUuid || healing <= 0) return null;
  return { targetUuid: String(request.targetUuid), healing, source: String(request.source ?? ""), caster: String(request.caster ?? ""), resolved: false };
}

export function boundedHealthRecoveryUpdates(actor, requested) {
  const amount = healingAmount(actor, requested);
  if (amount <= 0) return { amount: 0, updates: {} };
  const current = Math.max(0, number(actor.system?.resources?.health?.value));
  const next = current + amount;
  const updates = { "system.resources.health.value": next };
  if (next > 0) {
    updates["system.status.incapacitated"] = false;
    if (actor?.type === "familiar") updates["system.familiar.incapacitated"] = false;
  }
  return { amount, updates };
}

export async function applyBoundedHealing(actor, requested) {
  const recovery = boundedHealthRecoveryUpdates(actor, requested);
  if (recovery.amount <= 0) return 0;
  await actor.update(recovery.updates);
  return recovery.amount;
}
