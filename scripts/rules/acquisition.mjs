import { contentIdentityKey, duplicateIdentity, identityKey, stableSlug } from "./identity.mjs";
import { evaluateRequirements } from "./requirements.mjs";

export const PAID_RESOURCES = Object.freeze(["pd", "pr", "pei", "currency", "none"]);
export const ACQUISITION_MODES = Object.freeze(["purchased", "granted", "package", "legacy"]);

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
  expectedRevision = null
} = {}) {
  const issues = [];
  const actorItems = Array.isArray(actor?.items) ? actor.items : actor?.items && typeof actor.items.values === "function" ? [...actor.items.values()] : [];
  const duplicate = duplicateIdentity(actorItems, candidate);
  if (duplicate) issues.push({ code: "duplicate", message: "El Actor ya posee " + contentIdentityKey(candidate) + "." });

  const singular = new Set(["ancestry", "origin", "background"]);
  if (singular.has(candidate?.type) && actorItems.some((item) => item.type === candidate.type)) {
    issues.push({ code: "cardinality", message: "El Actor ya posee un Item singular de tipo " + candidate.type + "." });
  }

  const requirements = candidate?.system?.requirements;
  const requirementResult = evaluateRequirements(requirements, actor, { excludeItemId: candidate?.id ?? null });
  if (!requirementResult.valid) issues.push(...requirementResult.issues);

  const currentRevision = number(actor?.system?.creation?.revision);
  if (expectedRevision !== null && number(expectedRevision) !== currentRevision) {
    issues.push({ code: "revision", message: "La construcción cambió desde el preflight; debe revalidarse." });
  }

  const cost = selectCatalogCost(candidate?.system?.costs, { stage, priceContext });
  if (!cost && stage !== "legacy") issues.push({ code: "cost", message: "No existe un coste legal para este contexto." });

  return {
    valid: !issues.length,
    issues,
    cost,
    acquisition: cost ? acquisitionFromCost(cost, { stage: stage === "rebuilding" ? priceContext : stage }) : null,
    revision: currentRevision
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
