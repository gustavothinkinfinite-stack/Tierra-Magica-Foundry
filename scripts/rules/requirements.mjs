function number(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function itemSlug(item) {
  return String(item?.system?.slug ?? "").trim().toLowerCase();
}

function actorItems(actor) {
  if (Array.isArray(actor?.items)) return actor.items;
  if (actor?.items && typeof actor.items.values === "function") return [...actor.items.values()];
  return [];
}

function leafResult(valid, issue = null) {
  return { valid, evaluable: !issue?.unknown, issues: issue ? [issue] : [] };
}

export function evaluateRequirement(requirement, actor, context = {}) {
  if (!requirement || (typeof requirement === "object" && !Object.keys(requirement).length)) {
    return { valid: true, evaluable: true, issues: [] };
  }

  if (Array.isArray(requirement)) return evaluateRequirements({ all: requirement }, actor, context);

  if (Array.isArray(requirement.all)) {
    const results = requirement.all.map((entry) => evaluateRequirement(entry, actor, context));
    return {
      valid: results.every((result) => result.valid),
      evaluable: results.every((result) => result.evaluable),
      issues: results.flatMap((result) => result.issues)
    };
  }

  if (Array.isArray(requirement.any)) {
    const results = requirement.any.map((entry) => evaluateRequirement(entry, actor, context));
    if (results.some((result) => result.valid)) return { valid: true, evaluable: true, issues: [] };
    return {
      valid: false,
      evaluable: results.some((result) => result.evaluable),
      issues: results.flatMap((result) => result.issues)
    };
  }

  if (requirement.not) {
    const result = evaluateRequirement(requirement.not, actor, context);
    if (!result.evaluable) return result;
    return result.valid
      ? leafResult(false, { code: "requirement-not", message: "Se cumple una condición expresamente prohibida." })
      : { valid: true, evaluable: true, issues: [] };
  }

  const type = String(requirement.type ?? "").trim();
  if (type === "skill") {
    const skill = actor?.system?.skills?.[requirement.key] ?? actor?.skills?.[requirement.key];
    if (!skill) return leafResult(false, { code: "requirement-skill", message: "Habilidad inexistente: " + requirement.key });
    const basis = requirement.basis === "effective" ? "effective" : "base";
    const current = basis === "effective"
      ? number(skill.effectiveRank ?? skill.rank)
      : number(skill.baseRank ?? skill.rank);
    const minimum = number(requirement.rank ?? requirement.minRank);
    return current >= minimum
      ? leafResult(true)
      : leafResult(false, { code: "requirement-skill", message: "Rango insuficiente en " + requirement.key + "." });
  }

  if (type === "level") {
    const current = number(actor?.system?.details?.level ?? actor?.level, 1);
    const minimum = number(requirement.minimum ?? requirement.value, 1);
    return current >= minimum
      ? leafResult(true)
      : leafResult(false, { code: "requirement-level", message: "Nivel insuficiente." });
  }

  if (type === "item") {
    const targetType = String(requirement.itemType ?? "");
    const targetSlug = String(requirement.slug ?? "").toLowerCase();
    const present = actorItems(actor).some((item) =>
      item.type === targetType && itemSlug(item) === targetSlug && item.id !== context.excludeItemId
    );
    return present
      ? leafResult(true)
      : leafResult(false, { code: "requirement-item", message: "Falta " + targetType + ":" + targetSlug + "." });
  }

  if (type === "attribute") {
    const attr = actor?.system?.attributes?.[requirement.key] ?? actor?.attributes?.[requirement.key];
    if (!attr) return leafResult(false, { code: "requirement-attribute", message: "Atributo inexistente: " + requirement.key });
    const basis = requirement.basis === "effective" ? "effective" : "base";
    const current = basis === "effective"
      ? number(attr.effectiveValue ?? attr.value ?? attr.baseValue)
      : number(attr.baseValue ?? attr.value);
    const minimum = number(requirement.minimum ?? requirement.value);
    return current >= minimum
      ? leafResult(true)
      : leafResult(false, { code: "requirement-attribute", message: "Atributo insuficiente en " + requirement.key + "." });
  }

  return leafResult(false, {
    code: "requirement-unknown",
    message: "Tipo de requisito desconocido: " + (type || "(vacío)") + ".",
    unknown: true
  });
}

export function evaluateRequirements(requirements, actor, context = {}) {
  if (!requirements || (Array.isArray(requirements) && requirements.length === 0)) {
    return { valid: true, evaluable: true, issues: [] };
  }
  return evaluateRequirement(requirements, actor, context);
}
