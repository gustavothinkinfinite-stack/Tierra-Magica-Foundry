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
  return { base, bonus: extra, penetration: pen, protection: prot, effectiveProtection, damage: final,
    severe: final > 0 && final >= number(severeThreshold, Infinity) };
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

export function spellAreaKind(item) {
  const raw = item?.system?.area;
  if (raw == null || raw === false || raw === "" || raw === 0 || raw === "0") return "none";
  return "area";
}

export function validateSpellTargets(item, targets = [], { caster = null, allowFriendly = true } = {}) {
  if (!item || item.type !== "spell") return { ok:false, reason:"not-spell", targets:[] };
  const selected = uniqueSpellTargets(targets);
  const needs = offensiveSpellNeedsTargets(item);
  if (needs && selected.length === 0) return { ok:false, reason:"target-required", targets:[] };
  if (spellAreaKind(item) === "none" && selected.length > 1) return { ok:false, reason:"single-target", targets:selected };
  if (!allowFriendly && caster) {
    const disposition = caster?.token?.disposition ?? caster?.prototypeToken?.disposition;
    const friendly = selected.find((actor) => {
      const targetDisposition = actor?.token?.disposition ?? actor?.prototypeToken?.disposition;
      return disposition != null && targetDisposition != null && disposition === targetDisposition;
    });
    if (friendly) return { ok:false, reason:"friendly-target", targets:selected };
  }
  return { ok:true, reason:null, targets:selected };
}

export function resolveSpellImpacts(item, targets = [], { bonus = 0 } = {}) {
  if (!item || item.type !== "spell") return [];
  return uniqueSpellTargets(targets).map((actor) => ({ actor,
    ...spellImpact({ damage:item.system?.damage, bonus, penetration:item.system?.penetration,
      protection:actor.system?.derived?.protection, severeThreshold:actor.system?.derived?.severeThreshold })
  }));
}

export function offensiveSpellNeedsTargets(item) {
  if (!item || item.type !== "spell") return false;
  return number(item.system?.damage) > 0 || ["normal", "mental", "body"].includes(String(item.system?.defense ?? ""));
}
