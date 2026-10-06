import { normalizeDamageType } from "./damage-types.mjs";

export const RULE_ELEMENT_KEYS = Object.freeze([
  "FlatModifier", "RollOption", "UpgradeSkillRank", "ChoiceSet", "GrantItem",
  "DamageResistance", "DamageImmunity", "DamageVulnerability"
]);

export const CORE_SELECTORS = new Set([
  "defensiveBonus",
  "defense",
  "maneuverDefense",
  "mentalDefense",
  "bodyDefense",
  "healthMax",
  "manaMax",
  "movement",
  "protection",
  "initiativeModifier",
  // Alias transitorio durante CREA-12.
  "initiative"
]);

function number(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function selectorKnown(selector, skillDefinitions = {}) {
  if (CORE_SELECTORS.has(selector)) return true;
  if (!String(selector ?? "").startsWith("skill.")) return false;
  return Boolean(skillDefinitions[String(selector).slice(6)]);
}

function predicateSatisfied(predicate, options, item) {
  if (!predicate) return true;
  if (typeof predicate === "string") {
    if (predicate === "item:equipped") return Boolean(item?.system?.equipped);
    return options.has(predicate);
  }
  if (Array.isArray(predicate.all)) return predicate.all.every((entry) => predicateSatisfied(entry, options, item));
  if (Array.isArray(predicate.any)) return predicate.any.some((entry) => predicateSatisfied(entry, options, item));
  if (predicate.not) return !predicateSatisfied(predicate.not, options, item);
  return false;
}

export function validateRuleElement(rule, { skillDefinitions = {} } = {}) {
  const issues = [];
  const key = String(rule?.key ?? "");
  if (!RULE_ELEMENT_KEYS.includes(key)) {
    issues.push({ code: "rule-unknown", message: "Rule Element desconocido: " + (key || "(vacío)") + "." });
    return { valid: false, issues };
  }

  if (key === "FlatModifier") {
    if (!selectorKnown(rule.selector, skillDefinitions)) issues.push({ code: "rule-selector", message: "Selector desconocido: " + rule.selector + "." });
    if (!Number.isFinite(Number(rule.value))) issues.push({ code: "rule-value", message: "FlatModifier necesita un valor numérico." });
  }
  if (key === "RollOption" && !String(rule.option ?? "").trim()) issues.push({ code: "rule-option", message: "RollOption necesita una opción." });
  if (key === "UpgradeSkillRank") {
    if (!skillDefinitions[rule.skill]) issues.push({ code: "rule-skill", message: "Habilidad desconocida: " + rule.skill + "." });
    const rank = Number(rule.rank);
    if (!Number.isInteger(rank) || rank < 0 || rank > 5) issues.push({ code: "rule-rank", message: "UpgradeSkillRank necesita rango 0–5." });
  }
  if (key === "ChoiceSet" && !String(rule.choiceKey ?? "").trim()) issues.push({ code: "rule-choice", message: "ChoiceSet necesita choiceKey estable." });
  if (key === "GrantItem") {
    if (!String(rule.itemType ?? "").trim() || !String(rule.slug ?? "").trim()) issues.push({ code: "rule-grant", message: "GrantItem necesita itemType y slug." });
    if (rule.lifecycle && !["linked", "once"].includes(rule.lifecycle)) issues.push({ code: "rule-grant-lifecycle", message: "lifecycle debe ser linked u once." });
  }
  if (["DamageResistance", "DamageImmunity", "DamageVulnerability"].includes(key)) {
    if (!normalizeDamageType(rule.damageType)) issues.push({ code: "rule-damage-type", message: key + " necesita damageType estable." });
  }
  if (["DamageResistance", "DamageVulnerability"].includes(key)) {
    const value = Number(rule.value);
    if (!Number.isFinite(value) || value < 0) issues.push({ code: "rule-damage-value", message: key + " necesita un valor numérico no negativo." });
  }
  return { valid: !issues.length, issues };
}

export function prepareRuleElements(items = [], {
  skillDefinitions = {},
  baseRollOptions = []
} = {}) {
  const rollOptions = new Set(baseRollOptions);
  const modifiers = [];
  const skillRankUpgrades = new Map();
  const damageResistances = {};
  const damageVulnerabilities = {};
  const damageImmunities = new Set();
  const issues = [];

  for (const item of items) {
    if (item?.type === "effect" && item?.system?.active === false) continue;
    const rules = Array.isArray(item?.system?.rules) ? item.system.rules : [];

    for (const rule of rules) {
      const validation = validateRuleElement(rule, { skillDefinitions });
      if (!validation.valid) {
        issues.push(...validation.issues.map((issue) => ({ ...issue, itemId: item.id, itemName: item.name })));
        continue;
      }
      if (rule.key !== "RollOption") continue;
      if (!predicateSatisfied(rule.predicate, rollOptions, item)) continue;
      rollOptions.add(String(rule.option));
    }
  }

  for (const item of items) {
    if (item?.type === "effect" && item?.system?.active === false) continue;
    const rules = Array.isArray(item?.system?.rules) ? item.system.rules : [];
    for (const rule of rules) {
      const validation = validateRuleElement(rule, { skillDefinitions });
      if (!validation.valid || !predicateSatisfied(rule.predicate, rollOptions, item)) continue;

      if (rule.key === "FlatModifier") {
        modifiers.push({
          selector: String(rule.selector),
          value: number(rule.value),
          label: String(rule.label ?? item.name ?? rule.selector),
          sourceItemId: item.id ?? null,
          sourceItemName: item.name ?? "",
          ruleId: rule.id ?? null
        });
      } else if (rule.key === "UpgradeSkillRank") {
        const current = skillRankUpgrades.get(rule.skill) ?? 0;
        skillRankUpgrades.set(rule.skill, Math.max(current, number(rule.rank)));
      } else if (rule.key === "DamageResistance") {
        const type = normalizeDamageType(rule.damageType);
        damageResistances[type] = Math.max(damageResistances[type] ?? 0, Math.max(0, number(rule.value)));
      } else if (rule.key === "DamageVulnerability") {
        const type = normalizeDamageType(rule.damageType);
        damageVulnerabilities[type] = Math.max(damageVulnerabilities[type] ?? 0, Math.max(0, number(rule.value)));
      } else if (rule.key === "DamageImmunity") {
        damageImmunities.add(normalizeDamageType(rule.damageType));
      }
    }
  }

  return {
    rollOptions: [...rollOptions],
    modifiers,
    skillRankUpgrades: Object.fromEntries(skillRankUpgrades),
    damageTraits: {
      resistances: damageResistances,
      immunities: [...damageImmunities].filter(Boolean),
      vulnerabilities: damageVulnerabilities
    },
    issues
  };
}

export function modifiersForSelector(prepared, selector) {
  return (prepared?.modifiers ?? []).filter((entry) => entry.selector === selector);
}

export function modifierTotal(prepared, selector) {
  return modifiersForSelector(prepared, selector).reduce((sum, entry) => sum + number(entry.value), 0);
}
