// Foundry T.M. — resolución pura de impacto físico.
// Centraliza mitigación y evita que Penetración genere Protección negativa.
const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export function resolveWeaponImpact(weapon, attacker, target, { damageBonus = 0, penetrationBonus = 0 } = {}) {
  if (!weapon || weapon.type !== "weapon") throw new TypeError("Se requiere un arma válida.");
  if (!attacker?.system || !target?.system) throw new TypeError("Atacante y objetivo deben ser Actores válidos.");

  const attributeKey = String(weapon.system?.damageAttribute ?? "").trim();
  const attribute = attributeKey ? Math.max(0, number(attacker.system.attributes?.[attributeKey]?.value)) : 0;
  const base = Math.max(0, number(weapon.system?.damage));
  const rawProtection = Math.max(0, number(target.system.derived?.protection));
  const penetration = Math.max(0, number(weapon.system?.penetration) + number(penetrationBonus));
  const effectiveProtection = Math.max(0, rawProtection - penetration);
  const rawDamage = Math.max(0, base + attribute + number(damageBonus));
  const damage = Math.max(0, rawDamage - effectiveProtection);
  const severeThreshold = Math.max(0, number(target.system.derived?.severeThreshold));

  return {
    attributeKey,
    attribute,
    base,
    rawDamage,
    protection: rawProtection,
    penetration,
    effectiveProtection,
    damage,
    severe: damage > 0 && severeThreshold > 0 && damage >= severeThreshold
  };
}

export function attackHits(total, defense) {
  const attack = number(total, Number.NaN);
  const df = number(defense, Number.NaN);
  return Number.isFinite(attack) && Number.isFinite(df) && attack >= df;
}
