// Foundry T.M. — resolución segura de impacto mágico ofensivo.
// No modifica actores automáticamente: calcula resultados para que el DJ/jugador los confirme.

const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export function spellImpact({ damage = 0, bonus = 0, penetration = 0, protection = 0, severeThreshold = Infinity } = {}) {
  const base = Math.max(0, number(damage));
  const extra = number(bonus);
  const pen = Math.max(0, number(penetration));
  const prot = Math.max(0, number(protection));
  const effectiveProtection = Math.max(0, prot - pen);
  const final = Math.max(0, base + extra - effectiveProtection);
  return {
    base,
    bonus: extra,
    penetration: pen,
    protection: prot,
    effectiveProtection,
    damage: final,
    severe: final > 0 && final >= number(severeThreshold, Infinity)
  };
}

export function uniqueSpellTargets(targets = []) {
  const seen = new Set();
  const result = [];
  for (const token of targets ?? []) {
    const actor = token?.actor ?? token;
    const key = actor?.uuid ?? actor?.id;
    if (!actor || !key || seen.has(key)) continue;
    seen.add(key);
    result.push(actor);
  }
  return result;
}

export function resolveSpellImpacts(item, targets = [], { bonus = 0 } = {}) {
  if (!item || item.type !== "spell") return [];
  return uniqueSpellTargets(targets).map((actor) => ({
    actor,
    ...spellImpact({
      damage: item.system?.damage,
      bonus,
      penetration: item.system?.penetration,
      protection: actor.system?.derived?.protection,
      severeThreshold: actor.system?.derived?.severeThreshold
    })
  }));
}

export function offensiveSpellNeedsTargets(item) {
  if (!item || item.type !== "spell") return false;
  return number(item.system?.damage) > 0 || ["normal", "mental", "body"].includes(String(item.system?.defense ?? ""));
}
