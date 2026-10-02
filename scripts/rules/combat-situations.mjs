import { classifyResult } from "../rules.mjs";
// Foundry T.M. — reglas puras para maniobras y caídas.
// Mantiene cuantificados los casos ambientales sin acoplarlos a una interfaz concreta.

const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export function maneuverMargin(total, defense) {
  const attack = number(total, Number.NaN);
  const target = number(defense, Number.NaN);
  if (!Number.isFinite(attack) || !Number.isFinite(target)) {
    return { success:false, margin:null, degree:"Fallo" };
  }
  return classifyResult(attack, target);
}

export function pushDistance(total, defense, { scaleDifference = 0 } = {}) {
  const outcome = maneuverMargin(total, defense);
  if (!outcome.success) return { ...outcome, spaces:0 };
  const delta = Math.trunc(number(scaleDifference));
  if (delta >= 2) return { ...outcome, spaces:0, blockedByScale:true };

  let spaces = outcome.degree === "Dominante" ? 3 : outcome.degree === "Claro" ? 2 : 1;
  if (delta === 1) spaces = Math.max(1, spaces - 1);
  return { ...outcome, spaces, blockedByScale:false };
}

export function disarmDefense(baseDefense, { twoHanded = false, secured = false } = {}) {
  if (secured) return Number.POSITIVE_INFINITY;
  return Math.max(0, number(baseDefense)) + (twoHanded ? 2 : 0);
}

export function disarmOutcome(total, baseDefense, {
  twoHanded = false,
  secured = false,
  freeHand = false
} = {}) {
  const defense = disarmDefense(baseDefense, { twoHanded, secured });
  if (!Number.isFinite(defense)) {
    return { success:false, defense, margin:null, degree:"Fallo", result:"secured" };
  }
  const outcome = maneuverMargin(total, defense);
  if (!outcome.success) return { ...outcome, defense, result:"none" };
  if (outcome.degree === "Dominante" && freeHand) return { ...outcome, defense, result:"seized" };
  if (outcome.degree === "Claro" || outcome.degree === "Dominante") return { ...outcome, defense, result:"adjacent" };
  return { ...outcome, defense, result:"dropped" };
}

export function fallControlDifficulty(spaces) {
  const distance = Math.max(0, Math.floor(number(spaces)));
  if (distance <= 1) return null;
  return Math.min(24, 10 + 2 * Math.max(0, distance - 2));
}

export function fallControlReduction(total, difficulty) {
  const df = number(difficulty, Number.NaN);
  const roll = number(total, Number.NaN);
  if (!Number.isFinite(df) || !Number.isFinite(roll) || roll < df) return 0;
  const margin = roll - df;
  if (margin >= 10) return 3;
  if (margin >= 5) return 2;
  return 1;
}

export function resolveFallDamage(spaces, {
  controlledReduction = 0,
  environmentalReduction = 0,
  specialProtection = 0
} = {}) {
  const distance = Math.max(0, Math.floor(number(spaces)));
  const reduction = Math.max(0, Math.floor(number(controlledReduction))) +
    Math.max(0, Math.floor(number(environmentalReduction)));
  const effectiveSpaces = Math.max(0, distance - reduction);
  const rawDamage = 2 * Math.max(0, effectiveSpaces - 1);
  const protection = Math.max(0, number(specialProtection));
  return {
    spaces:distance,
    effectiveSpaces,
    rawDamage,
    specialProtection:protection,
    damage:Math.max(0, rawDamage - protection)
  };
}

export function intimidationOutcome(total, mentalDefense) {
  return maneuverMargin(total, mentalDefense);
}
