export function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}
export function clamp(value, minimum, maximum) {
  return Math.min(Math.max(toNumber(value), toNumber(minimum)), toNumber(maximum));
}
export function rankBonus(rank, table = [0,1,2,4,6,8]) {
  return table[clamp(Math.floor(toNumber(rank)), 0, table.length - 1)] ?? 0;
}
export function defenseBonus(rank, table = [0,0,1,2,3,4]) {
  return table[clamp(Math.floor(toNumber(rank)), 0, table.length - 1)] ?? 0;
}
export function rollFormula(mode = "normal", modifier = 0) {
  const mod = toNumber(modifier);
  const dice = mode === "advantage" ? "3d10kh2" : mode === "disadvantage" ? "3d10kl2" : "2d10";
  return dice + (mod >= 0 ? " + " : " - ") + Math.abs(mod);
}
export function classifyResult(total, df) {
  const margin = toNumber(total) - toNumber(df);
  if (margin < 0) return { success: false, degree: "Fallo", margin };
  if (margin >= 10) return { success: true, degree: "Dominante", margin };
  if (margin >= 5) return { success: true, degree: "Claro", margin };
  return { success: true, degree: "Ajustado", margin };
}
export function keptDice(roll) {
  const die = roll?.dice?.[0];
  if (!die) return [];
  const active = die.results?.filter((r) => r.active !== false && !r.discarded).map((r) => r.result) ?? [];
  return active.slice(-2);
}
export function extraordinaryTag(roll) {
  const dice = keptDice(roll);
  if (dice.length !== 2) return "";
  if (dice[0] === 10 && dice[1] === 10) return "Hazaña";
  if (dice[0] === 1 && dice[1] === 1) return "Pifia";
  return "";
}
export function finalDamage(base, attribute, bonus, protection, penetration = 0) {
  const effectiveProtection = Math.max(0, toNumber(protection) - toNumber(penetration));
  return Math.max(0, toNumber(base) + toNumber(attribute) + toNumber(bonus) - effectiveProtection);
}
export function severeThreshold(vigor) {
  return 5 + toNumber(vigor);
}
