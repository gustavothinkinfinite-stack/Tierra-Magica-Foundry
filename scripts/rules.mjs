export function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function clamp(value, minimum, maximum) {
  return Math.min(Math.max(toNumber(value), toNumber(minimum)), toNumber(maximum));
}

export function signed(value) {
  const number = toNumber(value);
  return number >= 0 ? `+${number}` : `${number}`;
}

export function skillTotal({ ability = 0, value = 0, bonus = 0 } = {}) {
  return toNumber(ability) + toNumber(value) + toNumber(bonus);
}

export function defense(base, ability, extra = 0) {
  return toNumber(base, 10) + toNumber(ability) + toNumber(extra);
}

export function degreeOfSuccess(total, dc, natural = 0) {
  let degree = total >= dc + 10 ? 3 : total >= dc ? 2 : total <= dc - 10 ? 0 : 1;
  if (natural === 20) degree = Math.min(3, degree + 1);
  if (natural === 1) degree = Math.max(0, degree - 1);
  return ["Fallo crítico", "Fallo", "Éxito", "Éxito crítico"][degree];
}

export function experienceForNextLevel(level, thresholds = []) {
  const safeLevel = Math.max(1, Math.floor(toNumber(level, 1)));
  return thresholds[safeLevel + 1] ?? thresholds.at(-1) ?? 0;
}

export function inventoryLoad(items = []) {
  return items.reduce((total, item) => {
    const quantity = Math.max(0, toNumber(item.system?.quantity, 1));
    return total + Math.max(0, toNumber(item.system?.weight)) * quantity;
  }, 0);
}

export function characteristicPoints(attributes = {}) {
  return Object.values(attributes).reduce((total, attribute) => total + toNumber(attribute?.value), 0);
}
