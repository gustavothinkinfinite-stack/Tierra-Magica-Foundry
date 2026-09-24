// Foundry T.M. — resolución pura de impactos mágicos deterministas.
const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export function resolveSpellImpact(spell, target) {
  if (!spell || spell.type !== "spell") throw new TypeError("Se requiere un hechizo válido.");
  if (!target?.system) throw new TypeError("El objetivo debe ser un Actor válido.");
  const base = Math.max(0, number(spell.system?.damage));
  const protection = Math.max(0, number(target.system.derived?.protection));
  const penetration = Math.max(0, number(spell.system?.penetration));
  const effectiveProtection = Math.max(0, protection - penetration);
  const damage = Math.max(0, base - effectiveProtection);
  const severeThreshold = Math.max(0, number(target.system.derived?.severeThreshold));
  return { base, protection, penetration, effectiveProtection, damage, severe: damage > 0 && severeThreshold > 0 && damage >= severeThreshold };
}
