// Foundry T.M. — entrega segura de daño cuando el atacante no posee el Actor objetivo.
// La solicitud no concede permisos: sólo describe una aplicación pendiente que un DJ activo debe aprobar.

const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export function pendingDamageRequest({ targetUuid = "", damage = 0, source = "", attacker = "" } = {}) {
  const uuid = String(targetUuid ?? "").trim();
  const amount = Math.max(0, number(damage));
  if (!uuid || amount <= 0) return null;
  return {
    targetUuid: uuid,
    damage: amount,
    source: String(source ?? "").trim().slice(0, 120),
    attacker: String(attacker ?? "").trim().slice(0, 120),
    resolved: false
  };
}

export function validatePendingDamageRequest(value) {
  if (!value || typeof value !== "object" || value.resolved === true) return null;
  return pendingDamageRequest(value);
}

export function primaryActiveGm(users = []) {
  const active = [...users]
    .filter((user) => user?.active && user?.isGM)
    .sort((a, b) => String(a.id ?? "").localeCompare(String(b.id ?? "")));
  return active[0] ?? null;
}
