// Foundry T.M. — taxonomía extensible y mitigación tipada de daño.
export const BUILTIN_DAMAGE_TYPES = Object.freeze({
  slashing: "Cortante",
  piercing: "Perforante",
  bludgeoning: "Contundente",
  fire: "Fuego",
  cold: "Frío / Hielo",
  lightning: "Eléctrico",
  kinetic: "Cinético",
  arcane: "Arcano",
  divine: "Divino",
  toxic: "Tóxico",
  corrosive: "Corrosivo",
  special: "Especial"
});

export const DAMAGE_MODES = Object.freeze({
  lethal: "Letal",
  nonlethal: "No letal"
});

const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export function normalizeDamageType(value = "") {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeDamageMode(value = "lethal") {
  return String(value ?? "").toLowerCase() === "nonlethal" ? "nonlethal" : "lethal";
}

export function parseCustomDamageTypes(value = "") {
  const result = {};
  const entries = String(value ?? "").split(/[\n,;]+/);
  for (const entry of entries) {
    const raw = entry.trim();
    if (!raw) continue;
    const separator = raw.includes("=") ? "=" : raw.includes(":") ? ":" : "";
    const [rawId, ...labelParts] = separator ? raw.split(separator) : [raw];
    const id = normalizeDamageType(rawId);
    if (!id) continue;
    const explicitLabel = labelParts.join(separator).trim();
    const fallbackLabel = rawId.trim().replace(/[-_]+/g, " ");
    result[id] = explicitLabel || fallbackLabel || id;
  }
  return result;
}

export function damageTypeRegistry(custom = "") {
  return Object.freeze({ ...BUILTIN_DAMAGE_TYPES, ...parseCustomDamageTypes(custom) });
}

export function damageTypeLabel(type, registry = BUILTIN_DAMAGE_TYPES) {
  const id = normalizeDamageType(type);
  return registry?.[id] ?? (String(type ?? "").trim() || "Sin tipo");
}

function normalizedMap(value = {}) {
  const result = {};
  if (!value || typeof value !== "object" || Array.isArray(value)) return result;
  for (const [rawType, rawAmount] of Object.entries(value)) {
    const type = normalizeDamageType(rawType);
    const amount = Math.max(0, number(rawAmount));
    if (type && amount > 0) result[type] = amount;
  }
  return result;
}

export function normalizeDamageTraits(value = {}) {
  const immunities = new Set(
    Array.isArray(value?.immunities)
      ? value.immunities.map(normalizeDamageType).filter(Boolean)
      : []
  );
  return {
    resistances: normalizedMap(value?.resistances),
    immunities: [...immunities],
    vulnerabilities: normalizedMap(value?.vulnerabilities)
  };
}

export function mergeDamageTraits(...sources) {
  const result = { resistances: {}, immunities: [], vulnerabilities: {} };
  const immunities = new Set();
  for (const source of sources) {
    const normalized = normalizeDamageTraits(source);
    for (const [type, amount] of Object.entries(normalized.resistances)) {
      result.resistances[type] = Math.max(result.resistances[type] ?? 0, amount);
    }
    for (const [type, amount] of Object.entries(normalized.vulnerabilities)) {
      result.vulnerabilities[type] = Math.max(result.vulnerabilities[type] ?? 0, amount);
    }
    for (const type of normalized.immunities) immunities.add(type);
  }
  result.immunities = [...immunities];
  return result;
}

export function actorDamageTraits(actor) {
  return mergeDamageTraits(actor?.system?.damageTraits, actor?.system?.derived?.damageTraits);
}

export function resolveTypedDamage({
  damage = 0,
  damageType = "special",
  damageMode = "lethal",
  traits = {}
} = {}) {
  const type = normalizeDamageType(damageType) || "special";
  const mode = normalizeDamageMode(damageMode);
  const safeDamage = Math.max(0, number(damage));
  const normalized = normalizeDamageTraits(traits);
  const immune = normalized.immunities.includes(type);
  const resistance = Math.max(0, number(normalized.resistances[type]));
  const vulnerability = Math.max(0, number(normalized.vulnerabilities[type]));
  const finalDamage = immune ? 0 : Math.max(0, safeDamage + vulnerability - resistance);
  return {
    damageType: type,
    damageMode: mode,
    preTypedDamage: safeDamage,
    resistance,
    vulnerability,
    immune,
    damage: finalDamage
  };
}
