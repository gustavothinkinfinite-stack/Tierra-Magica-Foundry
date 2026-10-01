import { budgetSpentByResource } from "./acquisition.mjs";
import { skillsPdCost } from "./skills.mjs";

export const ATTRIBUTE_UPGRADE_COSTS = Object.freeze({ 0: 4, 1: 6, 2: 9, 3: 13, 4: 18 });
export const INITIAL_ATTRIBUTE_BASE = 1;
export const INITIAL_ATTRIBUTE_INCREASES = 6;
export const INITIAL_ATTRIBUTE_MAX = 3;

function number(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function pdTotalForLevel(level) {
  return 25 + Math.max(0, Math.floor(number(level, 1)) - 1) * 4;
}

export function attributeProgressionCost(attributes = {}) {
  let total = 0;
  for (const attribute of Object.values(attributes)) {
    const from = Math.max(0, Math.floor(number(attribute?.creationValue ?? attribute?.baseValue ?? attribute?.value, 1)));
    const to = Math.max(from, Math.floor(number(attribute?.baseValue ?? attribute?.value, from)));
    for (let value = from; value < to; value += 1) total += ATTRIBUTE_UPGRADE_COSTS[value] ?? 0;
  }
  return total;
}

export function validateInitialAttributes(attributes = {}) {
  const issues = [];
  const entries = Object.entries(attributes ?? {});
  let increases = 0;
  if (entries.length !== 7) {
    issues.push({ code: "attribute-count", message: "La creación requiere exactamente siete Atributos." });
  }
  for (const [key, attribute] of entries) {
    const rawCreation = number(attribute?.creationValue ?? attribute?.baseValue ?? attribute?.value, INITIAL_ATTRIBUTE_BASE);
    const creationValue = Math.floor(rawCreation);
    const baseValue = Math.floor(number(attribute?.baseValue ?? attribute?.value, creationValue));
    if (!Number.isInteger(rawCreation) || creationValue < INITIAL_ATTRIBUTE_BASE || creationValue > INITIAL_ATTRIBUTE_MAX) {
      issues.push({ code: "attribute-creation-range", attribute: key, message: key + " debe quedar entre 1 y 3 durante creación." });
    }
    increases += Math.max(0, creationValue - INITIAL_ATTRIBUTE_BASE);
    if (baseValue !== creationValue) {
      issues.push({ code: "attribute-creation-base-mismatch", attribute: key, message: key + " no puede comprar progresión de Atributo antes de cerrar creación." });
    }
  }
  if (increases !== INITIAL_ATTRIBUTE_INCREASES) {
    issues.push({ code: "attribute-creation-pool", increases, message: "Deben repartirse exactamente 6 aumentos gratuitos de Atributo." });
  }
  return { valid: !issues.length, issues, increases };
}

function actorItems(actor) {
  if (Array.isArray(actor?.items)) return actor.items;
  if (actor?.items && typeof actor.items.values === "function") return [...actor.items.values()];
  return [];
}

export function deriveDevelopmentBudget(actor, { skillKeys = null } = {}) {
  const level = number(actor?.system?.details?.level, 1);
  const keys = skillKeys ?? Object.keys(actor?.system?.skills ?? {});
  const skills = skillsPdCost(actor?.system?.skills ?? {}, keys);
  const attributes = attributeProgressionCost(actor?.system?.attributes ?? {});
  const itemSpend = budgetSpentByResource(actorItems(actor));
  const pdSpent = skills + attributes + itemSpend.pd;
  const pdTotal = pdTotalForLevel(level);
  return {
    pdTotal,
    pdSpent,
    pdAvailable: pdTotal - pdSpent,
    prTotal: 3,
    prSpent: itemSpend.pr,
    prAvailable: 3 - itemSpend.pr,
    peiTotal: 2000,
    peiSpent: itemSpend.pei,
    peiAvailable: 2000 - itemSpend.pei,
    skillsPdCost: skills,
    attributePdCost: attributes
  };
}

export function validateCreationState(actor, { skillKeys = null } = {}) {
  const issues = [];
  if (actor?.type && actor.type !== "character") return { valid: true, issues, budget: null };
  const items = actorItems(actor);
  for (const type of ["ancestry", "origin", "background"]) {
    const count = items.filter((item) => item.type === type).length;
    if (count !== 1) issues.push({ code: "identity-" + type, message: "Se requiere exactamente un " + type + "." });
  }

  if ((actor?.system?.creation?.status ?? "complete") === "building") {
    issues.push(...validateInitialAttributes(actor?.system?.attributes ?? {}).issues);
  }

  const initialDisciplines = items.filter((item) =>
    item.type === "discipline" && (
      item.system?.acquisition?.stage === "creation" ||
      (!item.system?.acquisition && (actor?.system?.creation?.status ?? "") === "building")
    )
  ).length;
  if (initialDisciplines > 3) {
    issues.push({ code: "discipline-creation-limit", message: "Durante creación puede haber como máximo 3 Disciplinas." });
  }

  for (const item of items) {
    for (const rule of item.system?.rules ?? []) {
      if (rule?.key !== "ChoiceSet" || rule.optional) continue;
      const key = String(rule.choiceKey ?? "");
      if (!key || item.system?.choices?.[key] === undefined || item.system?.choices?.[key] === null || item.system?.choices?.[key] === "") {
        issues.push({ code: "choice-unresolved", message: item.name + " tiene una elección obligatoria sin resolver." });
      }
    }
  }

  const budget = deriveDevelopmentBudget(actor, { skillKeys });
  if (budget.pdAvailable < 0) issues.push({ code: "pd-over", message: "Los PD gastados superan los disponibles." });
  if (budget.prAvailable < 0) issues.push({ code: "pr-over", message: "Los PR gastados superan los disponibles." });
  if (budget.peiAvailable < 0) issues.push({ code: "pei-over", message: "El PEI gastado supera 2.000 c-equivalentes." });

  return { valid: !issues.length, issues, budget };
}

export function completionUpdates(actor, { reserveCopper = 200 } = {}) {
  const alreadyGranted = Boolean(actor?.system?.creation?.initialReserveGranted);
  const currentCopper = Math.max(0, Math.floor(number(actor?.system?.currency?.totalCopper)));
  return {
    "system.creation.status": "complete",
    "system.creation.equipmentBudgetCopper": 0,
    "system.creation.initialReserveGranted": true,
    "system.currency.totalCopper": currentCopper + (alreadyGranted ? 0 : reserveCopper)
  };
}
