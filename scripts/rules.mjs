export function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function abilityModifier(score) {
  return Math.floor((toNumber(score, 10) - 10) / 2);
}

export function rankBonus(rank, level = 1, proficiency = 2) {
  const safeRank = Math.max(0, Math.min(4, toNumber(rank)));
  if (safeRank === 0) return 0;
  return toNumber(level, 1) + toNumber(proficiency, 2) + (safeRank - 1) * 2;
}

export function skillTotal({ modifier = 0, rank = 0, level = 1, proficiency = 2, bonus = 0 } = {}) {
  return toNumber(modifier) + rankBonus(rank, level, proficiency) + toNumber(bonus);
}

export function defense(base, modifier, extra = 0) {
  return toNumber(base, 10) + toNumber(modifier) + toNumber(extra);
}

export function clamp(value, minimum, maximum) {
  return Math.min(Math.max(toNumber(value), toNumber(minimum)), toNumber(maximum));
}

export function signed(value) {
  const number = toNumber(value);
  return number >= 0 ? `+${number}` : `${number}`;
}
