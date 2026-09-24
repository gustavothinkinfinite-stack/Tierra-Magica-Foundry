function number(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function healingCap(actor) {
  const health = actor?.system?.resources?.health ?? {};
  const maximum = Math.max(0, number(health.max));
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

export async function applyBoundedHealing(actor, requested) {
  const amount = healingAmount(actor, requested);
  if (amount <= 0) return 0;
  const current = Math.max(0, number(actor.system?.resources?.health?.value));
  await actor.update({ "system.resources.health.value": current + amount });
  return amount;
}
