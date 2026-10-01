import { defenseBonus, severeThreshold } from "../rules.mjs";
import { modifiersForSelector } from "./rule-elements.mjs";

const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeSelector = (selector) => selector === "initiative" ? "initiativeModifier" : String(selector ?? "");

function contribution({
  selector,
  value,
  label,
  sourceItemId = null,
  sourceItemName = "",
  sourceType = "rule",
  ruleId = null,
  contextual = false,
  context = null
}) {
  return {
    selector: normalizeSelector(selector),
    value: number(value),
    label: String(label ?? selector ?? "Modificador"),
    sourceItemId,
    sourceItemName: String(sourceItemName ?? ""),
    sourceType,
    ruleId,
    contextual: Boolean(contextual),
    context
  };
}

function selectorContributions(prepared, selector) {
  const canonical = normalizeSelector(selector);
  const selectors = canonical === "initiativeModifier"
    ? ["initiativeModifier", "initiative"]
    : [canonical];

  return selectors.flatMap((key) => modifiersForSelector(prepared, key)).map((entry) => contribution({
    selector: canonical,
    value: entry.value,
    label: entry.label,
    sourceItemId: entry.sourceItemId,
    sourceItemName: entry.sourceItemName,
    sourceType: "rule",
    ruleId: entry.ruleId
  }));
}

function total(contributions = []) {
  return contributions.reduce((sum, entry) => sum + number(entry.value), 0);
}

function breakdown({ base, formula, contributions = [], contextual = [] }) {
  const applied = contributions.filter((entry) => !entry.contextual);
  return {
    base: number(base),
    formula: String(formula ?? ""),
    contributions: applied,
    contextual,
    modifier: total(applied),
    total: number(base) + total(applied)
  };
}

function highestEquipped(items, type, field) {
  const candidates = items
    .filter((item) => item?.type === type && item?.system?.equipped)
    .map((item) => ({
      item,
      value: Math.max(0, number(item.system?.[field]))
    }))
    .filter((entry) => entry.value > 0)
    .sort((a, b) => b.value - a.value);
  return candidates[0] ?? null;
}

function structuredManualContributions(system, selector) {
  const canonical = normalizeSelector(selector);
  const manual = system?.modifiers?.manual;
  if (!manual || typeof manual !== "object") return [];
  return Object.values(manual)
    .filter((entry) => normalizeSelector(entry?.selector) === canonical && number(entry?.value) !== 0)
    .map((entry) => contribution({
      selector: canonical,
      value: entry.value,
      label: entry.label ?? "Ajuste manual",
      sourceType: "manual",
      ruleId: entry.id ?? null
    }));
}

function legacyContribution(selector, value, label) {
  const numeric = number(value);
  return numeric ? [contribution({
    selector,
    value: numeric,
    label,
    sourceType: "legacy-manual"
  })] : [];
}

function manualOrLegacy(system, selector, legacyValue, legacyLabel) {
  const structured = structuredManualContributions(system, selector);
  return structured.length ? structured : legacyContribution(selector, legacyValue, legacyLabel);
}

export function deriveActorState({
  system = {},
  items = [],
  rulePreparation = {},
  defensiveRankBonuses = [0, 0, 1, 2, 3, 4]
} = {}) {
  const attributes = system.attributes ?? {};
  const vig = number(attributes.vig?.value, 1);
  const agi = number(attributes.agi?.value, 1);
  const vol = number(attributes.vol?.value, 1);
  const per = number(attributes.per?.value, 1);

  const martialRank = Math.max(0, Math.min(5, Math.floor(number(system.combat?.defensiveRank))));
  const martialDefense = defenseBonus(martialRank, defensiveRankBonuses);

  const defensiveBonusContributions = [
    contribution({
      selector: "defensiveBonus",
      value: martialDefense,
      label: "Entrenamiento marcial",
      sourceType: "base"
    }),
    ...selectorContributions(rulePreparation, "defensiveBonus"),
    ...manualOrLegacy(system, "defensiveBonus", system.combat?.defenseBonus, "Modificador manual legado")
  ];

  const defensiveBonusValue = total(defensiveBonusContributions);

  const armor = highestEquipped(items, "armor", "protection");
  const shield = highestEquipped(items, "shield", "passiveDefense");

  const healthContributions = selectorContributions(rulePreparation, "healthMax");
  const manaContributions = selectorContributions(rulePreparation, "manaMax");
  const defenseContributions = selectorContributions(rulePreparation, "defense");
  const maneuverContributions = selectorContributions(rulePreparation, "maneuverDefense");
  const mentalContributions = selectorContributions(rulePreparation, "mentalDefense");
  const bodyContributions = selectorContributions(rulePreparation, "bodyDefense");
  const protectionContributions = selectorContributions(rulePreparation, "protection");
  const movementContributions = selectorContributions(rulePreparation, "movement");
  const initiativeContributions = selectorContributions(rulePreparation, "initiativeModifier");

  if (shield) {
    defenseContributions.push(contribution({
      selector: "defense",
      value: shield.value,
      label: "Defensa pasiva de escudo",
      sourceItemId: shield.item.id ?? null,
      sourceItemName: shield.item.name ?? "",
      sourceType: "equipment",
      contextual: Boolean(shield.item.system?.frontalOnly),
      context: shield.item.system?.frontalOnly ? "frontal" : null
    }));
  }

  if (armor) {
    protectionContributions.push(contribution({
      selector: "protection",
      value: armor.value,
      label: "Armadura equipada",
      sourceItemId: armor.item.id ?? null,
      sourceItemName: armor.item.name ?? "",
      sourceType: "equipment"
    }));
  }

  protectionContributions.push(...manualOrLegacy(
    system,
    "protection",
    system.combat?.protectionBonus,
    "Protección manual legada"
  ));
  movementContributions.push(...manualOrLegacy(
    system,
    "movement",
    system.combat?.movementBonus,
    "Movimiento manual legado"
  ));
  initiativeContributions.push(...manualOrLegacy(
    system,
    "initiativeModifier",
    system.combat?.initiativeBonus,
    "Iniciativa manual legada"
  ));

  const health = breakdown({
    base: 10 + vig * 2,
    formula: "10 + 2 × VIG",
    contributions: healthContributions
  });
  const mana = breakdown({
    base: 6 + vol * 3,
    formula: "6 + 3 × VOL",
    contributions: manaContributions
  });
  const defensive = breakdown({
    base: 0,
    formula: "Bono Defensivo",
    contributions: defensiveBonusContributions
  });

  const defenseContextual = defenseContributions.filter((entry) => entry.contextual);
  const defense = breakdown({
    base: 11 + agi + defensiveBonusValue,
    formula: "11 + AGI + Bono Defensivo",
    contributions: defenseContributions,
    contextual: defenseContextual
  });

  const maneuver = breakdown({
    base: 11 + agi + defensiveBonusValue,
    formula: "11 + AGI + Bono Defensivo",
    contributions: maneuverContributions
  });
  const mental = breakdown({
    base: 11 + vol,
    formula: "11 + VOL",
    contributions: mentalContributions
  });
  const body = breakdown({
    base: 11 + vig,
    formula: "11 + VIG",
    contributions: bodyContributions
  });

  const protectionContextual = protectionContributions.filter((entry) => entry.contextual);
  const protection = breakdown({
    base: 0,
    formula: "Protección general",
    contributions: protectionContributions,
    contextual: protectionContextual
  });

  const movementBase = Math.max(1, number(system.movement?.base, 6));
  const movement = breakdown({
    base: movementBase,
    formula: "Movimiento base",
    contributions: movementContributions
  });
  movement.total = Math.max(1, movement.total);

  const initiative = breakdown({
    base: per,
    formula: "PER + modificadores",
    contributions: initiativeContributions
  });

  return {
    healthMax: health.total,
    manaMax: mana.total,
    severeThreshold: severeThreshold(vig),
    defensiveBonus: defensive.total,
    defense: defense.total,
    maneuverDefense: maneuver.total,
    mentalDefense: mental.total,
    bodyDefense: body.total,
    protection: Math.max(0, protection.total),
    movement: movement.total,
    initiativeModifier: initiative.total,

    // Compatibilidad temporal durante CREA-12.
    initiative: initiative.total,
    martialDefense,
    equippedShield: shield?.value ?? 0,

    breakdowns: {
      healthMax: health,
      manaMax: mana,
      defensiveBonus: defensive,
      defense,
      maneuverDefense: maneuver,
      mentalDefense: mental,
      bodyDefense: body,
      protection,
      movement,
      initiativeModifier: initiative
    },
    contextual: {
      defense: defenseContextual,
      protection: protectionContextual
    }
  };
}

export function resolveDerivedSelector(derived, selector, context = {}) {
  const canonical = normalizeSelector(selector);
  const base = number(derived?.[canonical]);
  const contextual = Array.isArray(derived?.contextual?.[canonical])
    ? derived.contextual[canonical]
    : [];

  const applicable = contextual.filter((entry) => {
    if (!entry?.context) return true;
    if (entry.context === "frontal") return context.frontal === true;
    return false;
  });

  return {
    selector: canonical,
    base,
    contextual: applicable,
    total: base + total(applicable)
  };
}
