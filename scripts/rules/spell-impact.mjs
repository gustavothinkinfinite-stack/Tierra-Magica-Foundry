// Foundry T.M. — resolución pura de impactos mágicos deterministas.
const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const actorOf = (target) => target?.actor ?? target ?? null;
const targetKey = (target) => {
  const actor = actorOf(target);
  return actor?.uuid ?? actor?.id ?? target?.uuid ?? target?.id ?? null;
};

export function spellImpact({ damage = 0, bonus = 0, penetration = 0, protection = 0, severeThreshold = 0 } = {}) {
  const base = Math.max(0, number(damage));
  const safeBonus = Math.max(0, number(bonus));
  const safeProtection = Math.max(0, number(protection));
  const safePenetration = Math.max(0, number(penetration));
  const effectiveProtection = Math.max(0, safeProtection - safePenetration);
  const finalDamage = Math.max(0, base + safeBonus - effectiveProtection);
  const threshold = Math.max(0, number(severeThreshold));
  return {
    base,
    bonus: safeBonus,
    penetration: safePenetration,
    protection: safeProtection,
    effectiveProtection,
    damage: finalDamage,
    severe: finalDamage > 0 && threshold > 0 && finalDamage >= threshold
  };
}

export function resolveSpellImpact(spell, target) {
  if (!spell || spell.type !== "spell") throw new TypeError("Se requiere un hechizo válido.");
  const actor = actorOf(target);
  if (!actor?.system) throw new TypeError("El objetivo debe ser un Actor válido.");
  return spellImpact({
    damage: spell.system?.damage,
    bonus: spell.system?.damageBonus,
    penetration: spell.system?.penetration,
    protection: actor.system.derived?.protection,
    severeThreshold: actor.system.derived?.severeThreshold
  });
}

export function resolveSpellImpacts(spell, targets = []) {
  return uniqueSpellTargets(targets).map((target) => {
    const actor = actorOf(target);
    return { actor, ...resolveSpellImpact(spell, actor) };
  });
}

export function uniqueSpellTargets(targets = []) {
  const seen = new Set();
  const result = [];
  for (const target of targets ?? []) {
    const actor = actorOf(target);
    if (!actor) continue;
    const key = targetKey(target) ?? actor;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(actor);
  }
  return result;
}

export function spellAreaKind(spell) {
  const area = String(spell?.system?.area ?? "").trim();
  return area ? "area" : "single";
}

export function offensiveSpellNeedsTargets(spell) {
  if (!spell || spell.type !== "spell") return false;
  if (Math.max(0, number(spell.system?.damage)) > 0) return true;
  return ["normal", "mental", "body"].includes(String(spell.system?.defense ?? ""));
}

function dispositionOf(target) {
  return target?.document?.disposition ?? target?.disposition ?? actorOf(target)?.prototypeToken?.disposition ?? null;
}

export function validateSpellTargets(spell, targets = [], { caster = null, allowFriendly = true } = {}) {
  const unique = uniqueSpellTargets(targets);
  if (offensiveSpellNeedsTargets(spell) && unique.length === 0) return { ok: false, reason: "target-required", targets: unique };
  if (spellAreaKind(spell) !== "area" && unique.length > 1) return { ok: false, reason: "single-target", targets: unique };
  if (!allowFriendly && caster) {
    const casterDisposition = dispositionOf(caster);
    if (casterDisposition != null && unique.some((target) => dispositionOf(target) === casterDisposition)) {
      return { ok: false, reason: "friendly-target", targets: unique };
    }
  }
  return { ok: true, reason: null, targets: unique };
}
