import { contentIdentityKey, duplicateIdentity, identityKey, stableSlug } from "./identity.mjs";
import { evaluateRequirements } from "./requirements.mjs";

export const PAID_RESOURCES = Object.freeze(["pd", "pr", "pei", "currency", "none"]);
export const ACQUISITION_MODES = Object.freeze(["purchased", "granted", "package", "legacy"]);
export const PHYSICAL_PURCHASE_TYPES = Object.freeze(["weapon", "armor", "shield", "equipment", "device"]);

export function isPhysicalPurchaseType(type) {
  return PHYSICAL_PURCHASE_TYPES.includes(String(type ?? ""));
}

function number(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function selectCatalogCost(costs = [], { stage = "creation", priceContext = null } = {}) {
  const context = stage === "rebuilding" ? priceContext : stage;
  if (!["creation", "progression"].includes(context)) return null;
  const list = Array.isArray(costs) ? costs : [];
  return list.find((cost) => cost.context === context)
    ?? list.find((cost) => cost.context === "any")
    ?? null;
}

export function normalizeAcquisition(acquisition = {}) {
  const mode = ACQUISITION_MODES.includes(acquisition.mode) ? acquisition.mode : "legacy";
  const resource = PAID_RESOURCES.includes(acquisition?.paid?.resource) ? acquisition.paid.resource : "none";
  return {
    mode,
    stage: String(acquisition.stage ?? (mode === "legacy" ? "legacy" : "creation")),
    sources: Array.isArray(acquisition.sources) ? acquisition.sources : [],
    paid: {
      resource,
      amount: Math.max(0, number(acquisition?.paid?.amount)),
      known: acquisition?.paid?.known !== false
    }
  };
}

export function acquisitionFromCost(cost, { mode = "purchased", stage = "creation", sources = [] } = {}) {
  const resource = PAID_RESOURCES.includes(cost?.resource) ? cost.resource : "none";
  return normalizeAcquisition({
    mode,
    stage,
    sources,
    paid: { resource, amount: Math.max(0, number(cost?.amount)), known: true }
  });
}

export function budgetSpentByResource(items = []) {
  const totals = { pd: 0, pr: 0, pei: 0, currency: 0 };
  for (const item of items) {
    const acq = item?.system?.acquisition;
    if (!acq) continue;
    const normalized = normalizeAcquisition(acq);
    if (!normalized.paid.known || !(normalized.paid.resource in totals)) continue;
    totals[normalized.paid.resource] += normalized.paid.amount;
  }
  return totals;
}

export function preflightAcquisition({
  actor,
  candidate,
  stage = "creation",
  priceContext = null,
  expectedRevision = null,
  mode = "purchased",
  sources = []
} = {}) {
  const issues = [];
  const actorItems = Array.isArray(actor?.items) ? actor.items : actor?.items && typeof actor.items.values === "function" ? [...actor.items.values()] : [];
  const actualStage = stage === "rebuilding" ? priceContext : stage;
  const duplicate = duplicateIdentity(actorItems, candidate);
  if (duplicate) issues.push({ code: "duplicate", message: "El Actor ya posee " + contentIdentityKey(candidate) + "." });

  const singular = new Set(["ancestry", "origin", "background"]);
  if (singular.has(candidate?.type) && actorItems.some((item) => item.type === candidate.type)) {
    issues.push({ code: "cardinality", message: "El Actor ya posee un Item singular de tipo " + candidate.type + "." });
  }

  if (candidate?.type === "discipline" && actualStage === "creation") {
    const initialDisciplines = actorItems.filter((item) =>
      item.type === "discipline" && (
        item.system?.acquisition?.stage === "creation" ||
        (!item.system?.acquisition && (actor?.system?.creation?.status ?? "") === "building")
      )
    ).length;
    if (initialDisciplines >= 3) {
      issues.push({ code: "discipline-creation-limit", message: "Durante creación puede adquirirse un máximo de 3 Disciplinas." });
    }
  }

  const requirements = candidate?.system?.requirements;
  const requirementResult = evaluateRequirements(requirements, actor, { excludeItemId: candidate?.id ?? null });
  if (!requirementResult.valid) issues.push(...requirementResult.issues);

  const choices = candidate?.system?.choices ?? {};
  for (const rule of Array.isArray(candidate?.system?.rules) ? candidate.system.rules : []) {
    if (rule?.key !== "ChoiceSet" || rule.optional) continue;
    const key = String(rule.choiceKey ?? "");
    if (!key || choices[key] === undefined || choices[key] === null || choices[key] === "") {
      issues.push({ code: "choice-unresolved", message: "Falta resolver la elección " + (key || "(sin clave)") + "." });
    }
  }

  const currentRevision = number(actor?.system?.creation?.revision);
  if (expectedRevision !== null && number(expectedRevision) !== currentRevision) {
    issues.push({ code: "revision", message: "La construcción cambió desde el preflight; debe revalidarse." });
  }

  const freeMode = ["granted", "package"].includes(mode);
  const cost = freeMode
    ? { context: actualStage ?? "any", resource: "none", amount: 0 }
    : selectCatalogCost(candidate?.system?.costs, { stage, priceContext });
  if (!cost && stage !== "legacy" && mode !== "legacy") issues.push({ code: "cost", message: "No existe un coste legal para este contexto." });

  return {
    valid: !issues.length,
    issues,
    cost,
    acquisition: mode === "legacy"
      ? normalizeAcquisition({ mode:"legacy", stage:"legacy", sources, paid:{ resource:"none", amount:0, known:false } })
      : cost ? acquisitionFromCost(cost, { mode, stage: actualStage ?? stage, sources }) : null,
    revision: currentRevision
  };
}

export function preflightPhysicalPurchase({
  actor,
  candidate,
  stage = "creation",
  priceContext = null,
  expectedRevision = null,
  mode = "purchased",
  sources = []
} = {}) {
  const issues = [];
  if (!isPhysicalPurchaseType(candidate?.type)) {
    issues.push({ code: "physical-type", message: "El Item no pertenece a una categoría de compra física." });
  }

  const price = Number(candidate?.system?.priceCopper);
  if (candidate?.system?.priceStatus !== "exact" || !Number.isSafeInteger(price) || price < 0) {
    issues.push({ code: "physical-price", message: (candidate?.name ?? "El objeto") + " no tiene un precio exacto utilizable para Compra libre." });
  }

  const identity = preflightAcquisition({
    actor,
    candidate: {
      ...candidate,
      system: {
        ...(candidate?.system ?? {}),
        costs: [{ context: "any", resource: "none", amount: 0 }]
      }
    },
    stage,
    priceContext,
    expectedRevision,
    mode,
    sources
  });
  issues.push(...identity.issues.filter((issue) => issue.code !== "cost"));

  const actualStage = stage === "rebuilding" ? (priceContext ?? "progression") : stage;
  const freeMode = ["granted", "package"].includes(mode);
  const resource = freeMode ? "none" : actualStage === "creation" ? "pei" : "currency";
  const cost = { context: actualStage ?? "creation", resource, amount: freeMode ? 0 : Math.max(0, number(price)) };

  return {
    valid: !issues.length,
    issues,
    cost,
    acquisition: !issues.length ? acquisitionFromCost(cost, { mode, stage: actualStage ?? stage, sources }) : null,
    revision: identity.revision
  };
}

export function detectGrantCycles(catalog = []) {
  const graph = new Map();
  for (const item of catalog) {
    const from = identityKey(item.type, stableSlug(item.system, item.name));
    if (!from) continue;
    const grants = (item.system?.rules ?? [])
      .filter((rule) => rule?.key === "GrantItem")
      .map((rule) => identityKey(rule.itemType, rule.slug))
      .filter(Boolean);
    graph.set(from, grants);
  }

  const visiting = new Set();
  const visited = new Set();
  const cycles = [];
  const stack = [];

  function walk(node) {
    if (visiting.has(node)) {
      const at = stack.indexOf(node);
      cycles.push([...stack.slice(at), node]);
      return;
    }
    if (visited.has(node)) return;
    visiting.add(node); stack.push(node);
    for (const next of graph.get(node) ?? []) if (graph.has(next)) walk(next);
    stack.pop(); visiting.delete(node); visited.add(node);
  }

  for (const node of graph.keys()) walk(node);
  return cycles;
}
