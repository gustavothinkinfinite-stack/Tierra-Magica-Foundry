const QUALITY = Object.freeze({
  defective: Object.freeze({ valueMultiplier: 0.5, materialMultiplier: null, timeMultiplier: 1, rankShift: 0, minRank: 0, installationShift: 0, capM: 0 }),
  common: Object.freeze({ valueMultiplier: 1, materialMultiplier: 0.5, timeMultiplier: 1, rankShift: 0, minRank: 0, installationShift: 0, capM: 0 }),
  superior: Object.freeze({ valueMultiplier: 1.5, materialMultiplier: 0.75, timeMultiplier: 1.5, rankShift: 1, minRank: 3, installationShift: 1, capM: 1 }),
  exceptional: Object.freeze({ valueMultiplier: 2.5, materialMultiplier: 1.25, timeMultiplier: 2, rankShift: 2, minRank: 4, installationShift: 2, capM: 2 })
});

const MATERIAL_GRADE = Object.freeze({
  ordinary: Object.freeze({ supplementMultiplier: 0, rankShift: 0, minRank: 0, installationShift: 0, timeMultiplier: 1 }),
  specialized: Object.freeze({ supplementMultiplier: 0.25, rankShift: 0, minRank: 2, installationShift: 0, timeMultiplier: 1 }),
  rare: Object.freeze({ supplementMultiplier: 0.5, rankShift: 1, minRank: 0, installationShift: 1, timeMultiplier: 1.25 }),
  exceptional: Object.freeze({ supplementMultiplier: 1, rankShift: 2, minRank: 0, installationShift: 2, timeMultiplier: 1.5 })
});

const MATERIAL_COVERAGE = Object.freeze({
  component: 0.25,
  major: 0.5,
  dominant: 1
});

const CONDITION = Object.freeze({
  operative: Object.freeze({ valueMultiplier: 1, repairMaterial: 0, repairTime: 0, salvage: 0.25, specialSalvage: 0.5 }),
  damaged: Object.freeze({ valueMultiplier: 0.6, repairMaterial: 0.1, repairTime: 0.25, salvage: 0.15, specialSalvage: 0.3 }),
  disabled: Object.freeze({ valueMultiplier: 0.4, repairMaterial: 0.25, repairTime: 0.5, salvage: 0.1, specialSalvage: 0.2 }),
  ruined: Object.freeze({ valueMultiplier: 0.2, repairMaterial: 0.5, repairTime: 0.75, salvage: 0.05, specialSalvage: 0.1 }),
  destroyed: Object.freeze({ valueMultiplier: 0, repairMaterial: null, repairTime: null, salvage: 0, specialSalvage: 0 })
});

const INSTALLATIONS = Object.freeze(["improvised", "adequate", "professional", "specialized", "exceptional"]);

function number(value, fallback = 0) {
  const result = Number(value);
  return Number.isFinite(result) ? result : fallback;
}

function nonNegative(value) {
  return Math.max(0, number(value));
}

function integerCopper(value, mode = "ceil") {
  const amount = nonNegative(value);
  if (mode === "floor") return Math.floor(amount + Number.EPSILON);
  if (mode === "round") return Math.round(amount);
  return Math.ceil(amount - Number.EPSILON);
}

function qualityProfile(quality = "common") {
  const profile = QUALITY[String(quality)];
  if (!profile) throw new RangeError("Calidad desconocida: " + quality);
  return profile;
}

function materialProfile(grade = "ordinary") {
  const profile = MATERIAL_GRADE[String(grade)];
  if (!profile) throw new RangeError("Grado de Material desconocido: " + grade);
  return profile;
}

function conditionProfile(condition = "operative") {
  const profile = CONDITION[String(condition)];
  if (!profile) throw new RangeError("Estado desconocido: " + condition);
  return profile;
}

export const CRAFTING_QUALITY = QUALITY;
export const CRAFTING_MATERIAL_GRADE = MATERIAL_GRADE;
export const CRAFTING_MATERIAL_COVERAGE = MATERIAL_COVERAGE;
export const CRAFTING_CONDITION = CONDITION;
export const CRAFTING_INSTALLATIONS = INSTALLATIONS;

export function qualityValueCopper(referenceValueCopper, quality = "common") {
  return nonNegative(referenceValueCopper) * qualityProfile(quality).valueMultiplier;
}

export function qualityMaterialCostCopper(referenceValueCopper, quality = "common") {
  const multiplier = qualityProfile(quality).materialMultiplier;
  if (multiplier === null) {
    throw new RangeError("Defectuosa no es una opción universal de fabricación con descuento.");
  }
  return integerCopper(nonNegative(referenceValueCopper) * multiplier, "ceil");
}

export function specialMaterialSupplementCopper(referenceValueCopper, {
  grade = "ordinary",
  coverage = "dominant"
} = {}) {
  const profile = materialProfile(grade);
  const coverageMultiplier = MATERIAL_COVERAGE[String(coverage)];
  if (coverageMultiplier === undefined) throw new RangeError("Cobertura de Material desconocida: " + coverage);
  return integerCopper(nonNegative(referenceValueCopper) * profile.supplementMultiplier * coverageMultiplier, "ceil");
}

export function totalCraftMaterialCostCopper({
  referenceValueCopper,
  quality = "common",
  specialMaterialSupplementsCopper = [],
  separatedComponentsCopper = []
} = {}) {
  const qualityCost = qualityMaterialCostCopper(referenceValueCopper, quality);
  const supplements = [...specialMaterialSupplementsCopper, ...separatedComponentsCopper]
    .reduce((sum, value) => sum + integerCopper(value, "ceil"), 0);
  return qualityCost + supplements;
}

export function totalReferenceValueCopper({
  referenceValueCopper,
  quality = "common",
  specialMaterialSupplementsCopper = [],
  addedValueCopper = 0
} = {}) {
  const materialAddedValue = specialMaterialSupplementsCopper
    .reduce((sum, value) => sum + 2 * integerCopper(value, "ceil"), 0);
  return qualityValueCopper(referenceValueCopper, quality) + materialAddedValue + nonNegative(addedValueCopper);
}

export function quickSaleCopper(applicableValueCopper) {
  return integerCopper(nonNegative(applicableValueCopper) * 0.25, "floor");
}

export function directSaleReferenceCopper(applicableValueCopper) {
  return integerCopper(nonNegative(applicableValueCopper) * 0.5, "floor");
}

export function saleValueForConditionCopper(totalValueCopper, condition = "operative", {
  mode = "quick"
} = {}) {
  const applicable = nonNegative(totalValueCopper) * conditionProfile(condition).valueMultiplier;
  return mode === "direct" ? directSaleReferenceCopper(applicable) : quickSaleCopper(applicable);
}

export function adjustedBaseTimeMinutes(baseMinutes, {
  quality = "common",
  materialGrade = "ordinary"
} = {}) {
  const qualityTime = qualityProfile(quality).timeMultiplier;
  const materialTime = materialProfile(materialGrade).timeMultiplier;
  return nonNegative(baseMinutes) * qualityTime * materialTime;
}

export function applyUniversalTimeReductions(adjustedBaseMinutes, {
  workAssistants = 0,
  accelerated = false,
  reductionFactors = []
} = {}) {
  const tba = nonNegative(adjustedBaseMinutes);
  const assistants = Math.max(0, Math.floor(number(workAssistants)));
  let factor = assistants >= 2 ? 0.5 : assistants === 1 ? 0.75 : 1;
  if (accelerated) factor *= 0.5;
  for (const raw of reductionFactors) {
    const reductionFactor = number(raw, 1);
    if (reductionFactor <= 0 || reductionFactor > 1) throw new RangeError("Cada factor de reducción debe estar en (0, 1].");
    factor *= reductionFactor;
  }
  factor = Math.max(0.25, factor);
  return tba * factor;
}

export function failedAccelerationTotalMinutes(adjustedBaseMinutes) {
  return nonNegative(adjustedBaseMinutes) * 1.25;
}

export function repairQuote({
  condition,
  affectedValueCopper,
  affectedTimeMinutes
} = {}) {
  const profile = conditionProfile(condition);
  if (profile.repairMaterial === null || profile.repairTime === null || condition === "operative") {
    return {
      repairableByUniversalRule: false,
      materialCopper: 0,
      timeMinutes: 0
    };
  }
  return {
    repairableByUniversalRule: true,
    materialCopper: integerCopper(nonNegative(affectedValueCopper) * profile.repairMaterial, "ceil"),
    timeMinutes: Math.max(10, nonNegative(affectedTimeMinutes) * profile.repairTime)
  };
}

export function salvageQuote({
  condition,
  referenceValueCopper,
  specialMaterialSupplementsCopper = [],
  recoveredSeparatedComponentsCopper = 0,
  fabricationTimeMinutes = 0
} = {}) {
  const profile = conditionProfile(condition);
  const ordinary = integerCopper(nonNegative(referenceValueCopper) * profile.salvage, "floor");
  const special = specialMaterialSupplementsCopper.reduce(
    (sum, supplement) => sum + integerCopper(nonNegative(supplement) * profile.specialSalvage, "floor"),
    0
  );
  return {
    valueInMaterialsCopper: ordinary + special + integerCopper(recoveredSeparatedComponentsCopper, "floor"),
    ordinaryCopper: ordinary,
    specialCopper: special,
    separatedComponentsCopper: integerCopper(recoveredSeparatedComponentsCopper, "floor"),
    timeMinutes: Math.max(10, nonNegative(fabricationTimeMinutes) * 0.25)
  };
}

function installationIndex(value = "improvised") {
  const index = INSTALLATIONS.indexOf(String(value));
  if (index < 0) throw new RangeError("Instalación desconocida: " + value);
  return index;
}

export function projectRequirements({
  baseRank = 0,
  baseInstallation = "improvised",
  quality = "common",
  materialGrade = "ordinary"
} = {}) {
  const q = qualityProfile(quality);
  const m = materialProfile(materialGrade);
  const rank = Math.min(5, Math.max(number(baseRank), number(baseRank) + q.rankShift + m.rankShift, q.minRank, m.minRank));
  const installation = Math.min(4, installationIndex(baseInstallation) + q.installationShift + m.installationShift);
  return {
    rank,
    installation: INSTALLATIONS[installation]
  };
}

export function validateProjectPrerequisites({
  actorRank = 0,
  availableInstallation = "improvised",
  requiredRank = 0,
  requiredInstallation = "improvised",
  hasStableProcedure = true,
  materialsReady = true,
  essentialToolReady = true
} = {}) {
  const issues = [];
  if (number(actorRank) < number(requiredRank)) {
    issues.push({ code: "rank", message: "Rango insuficiente para el Proyecto." });
  }
  if (installationIndex(availableInstallation) < installationIndex(requiredInstallation)) {
    issues.push({ code: "installation", message: "Instalación insuficiente para el procedimiento declarado." });
  }
  if (!hasStableProcedure) issues.push({ code: "procedure", message: "Falta Plano, Fórmula o procedimiento estable." });
  if (!materialsReady) issues.push({ code: "materials", message: "Faltan materiales o componentes esenciales." });
  if (!essentialToolReady) issues.push({ code: "tool", message: "Falta una herramienta o Kit esencial." });
  return { valid: issues.length === 0, issues };
}

const PROJECT_OPERATIONS = Object.freeze(["fabricate","repair","dismantle","modify","research"]);
const PROJECT_STATES = Object.freeze(["draft","ready","active","blocked","completed","cancelled"]);
const PROJECT_TIME_MODES = Object.freeze(["derived","fixed"]);
const PROJECT_PRICE_STATUSES = Object.freeze(["exact","variable","unset"]);
const PROJECT_QUALITIES = Object.freeze(["common","superior","exceptional"]);
const PROJECT_MATERIAL_GRADES = Object.freeze(Object.keys(MATERIAL_GRADE));

export const CRAFTING_PROJECT_OPERATIONS = PROJECT_OPERATIONS;
export const CRAFTING_PROJECT_STATES = PROJECT_STATES;
export const CRAFTING_PROJECT_TIME_MODES = PROJECT_TIME_MODES;

function stringValue(value) {
  return value === null || value === undefined ? "" : String(value);
}

function enumValue(value, allowed, fallback) {
  const candidate = stringValue(value);
  return allowed.includes(candidate) ? candidate : fallback;
}

function booleanValue(value) {
  return value === true;
}

function normalizedId(value, prefix, index) {
  const text = stringValue(value).trim();
  return text || prefix + "-" + (index + 1);
}

function normalizeSpecialMaterials(rows = []) {
  return (Array.isArray(rows) ? rows : []).map((row, index) => ({
    id: normalizedId(row?.id, "material", index),
    name: stringValue(row?.name),
    grade: enumValue(row?.grade, PROJECT_MATERIAL_GRADES, "ordinary"),
    coverage: enumValue(row?.coverage, Object.keys(MATERIAL_COVERAGE), "component"),
    supplementCopper: integerCopper(row?.supplementCopper, "ceil"),
    sourceItemUuid: stringValue(row?.sourceItemUuid)
  }));
}

function normalizeComponents(rows = []) {
  return (Array.isArray(rows) ? rows : []).map((row, index) => ({
    id: normalizedId(row?.id, "component", index),
    name: stringValue(row?.name),
    itemUuid: stringValue(row?.itemUuid),
    valueCopper: integerCopper(row?.valueCopper, "ceil"),
    quantity: Math.max(1, Math.floor(number(row?.quantity, 1))),
    separable: booleanValue(row?.separable),
    recoveredSeparately: booleanValue(row?.recoveredSeparately),
    countedInGenericRecovery: booleanValue(row?.countedInGenericRecovery)
  }));
}

function normalizeConsequences(rows = []) {
  return (Array.isArray(rows) ? rows : []).map((row, index) => ({
    id: normalizedId(row?.id, "consequence", index),
    label: stringValue(row?.label),
    trigger: stringValue(row?.trigger),
    effect: stringValue(row?.effect),
    declared: row?.declared !== false
  }));
}

function normalizeLedgerEntries(rows = []) {
  return (Array.isArray(rows) ? rows : []).map((row, index) => ({
    id: normalizedId(row?.id, "ledger", index),
    kind: stringValue(row?.kind || "note"),
    resource: stringValue(row?.resource || "materials"),
    amountCopper: integerCopper(row?.amountCopper, "round"),
    quantity: nonNegative(row?.quantity),
    sourceUuid: stringValue(row?.sourceUuid),
    compatibility: stringValue(row?.compatibility),
    note: stringValue(row?.note)
  }));
}

export function normalizeCraftingProject(source = {}) {
  const economy = source?.economy ?? {};
  const time = source?.time ?? {};
  const professional = source?.professional ?? {};
  const assistants = source?.assistants ?? {};
  const execution = source?.execution ?? {};
  const ledger = source?.ledger ?? {};

  return {
    modelVersion: Math.max(1, Math.floor(number(source?.modelVersion, 1))),
    operation: enumValue(source?.operation, PROJECT_OPERATIONS, "fabricate"),
    state: enumValue(source?.state, PROJECT_STATES, "draft"),
    source: {
      recipeUuid: stringValue(source?.source?.recipeUuid),
      profileRef: stringValue(source?.source?.profileRef),
      sourceRevision: stringValue(source?.source?.sourceRevision)
    },
    target: {
      itemUuid: stringValue(source?.target?.itemUuid),
      resultType: stringValue(source?.target?.resultType || "equipment"),
      resultName: stringValue(source?.target?.resultName),
      resultData: source?.target?.resultData && typeof source.target.resultData === "object" && !Array.isArray(source.target.resultData)
        ? structuredClone(source.target.resultData)
        : {}
    },
    economy: {
      referenceValueCopper: integerCopper(economy.referenceValueCopper, "ceil"),
      priceStatus: enumValue(economy.priceStatus, PROJECT_PRICE_STATUSES, "unset"),
      fixedPriceCopper: integerCopper(economy.fixedPriceCopper, "ceil"),
      quality: enumValue(economy.quality, PROJECT_QUALITIES, "common"),
      workMaterialGrade: enumValue(economy.workMaterialGrade, PROJECT_MATERIAL_GRADES, "ordinary"),
      affectedValueCopper: integerCopper(economy.affectedValueCopper, "ceil")
    },
    specialMaterials: normalizeSpecialMaterials(source?.specialMaterials),
    components: normalizeComponents(source?.components),
    time: {
      mode: enumValue(time.mode, PROJECT_TIME_MODES, "derived"),
      baseMinutes: nonNegative(time.baseMinutes),
      adjustedBaseMinutes: nonNegative(time.adjustedBaseMinutes),
      requiredMinutes: nonNegative(time.requiredMinutes),
      completedMinutes: nonNegative(time.completedMinutes)
    },
    professional: {
      skill: stringValue(professional.skill || "crafting"),
      specialization: stringValue(professional.specialization),
      baseRank: Math.max(0, Math.min(5, Math.floor(number(professional.baseRank)))),
      requiredRank: Math.max(0, Math.min(5, Math.floor(number(professional.requiredRank)))),
      baseInstallation: enumValue(professional.baseInstallation, INSTALLATIONS, "improvised"),
      requiredInstallation: enumValue(professional.requiredInstallation, INSTALLATIONS, "improvised"),
      stableProcedure: booleanValue(professional.stableProcedure),
      materialsReady: booleanValue(professional.materialsReady),
      essentialToolReady: booleanValue(professional.essentialToolReady)
    },
    assistants: {
      work: Math.max(0, Math.floor(number(assistants.work))),
      technical: Math.max(0, Math.floor(number(assistants.technical)))
    },
    execution: {
      accelerated: booleanValue(execution.accelerated),
      reductionFactors: (Array.isArray(execution.reductionFactors) ? execution.reductionFactors : [])
        .map((value) => number(value, 1))
        .filter((value) => value > 0 && value <= 1),
      stage: stringValue(execution.stage),
      revision: Math.max(0, Math.floor(number(execution.revision))),
      committed: booleanValue(execution.committed),
      completionToken: stringValue(execution.completionToken)
    },
    consequences: normalizeConsequences(source?.consequences),
    ledger: {
      estimatedMaterialsCopper: integerCopper(ledger.estimatedMaterialsCopper, "ceil"),
      committedMaterialsCopper: integerCopper(ledger.committedMaterialsCopper, "ceil"),
      recoveredMaterialsCopper: integerCopper(ledger.recoveredMaterialsCopper, "floor"),
      entries: normalizeLedgerEntries(ledger.entries)
    }
  };
}

export function craftingProjectRemainingMinutes(project = {}) {
  const normalized = normalizeCraftingProject(project);
  return Math.max(0, normalized.time.requiredMinutes - normalized.time.completedMinutes);
}

export function validateCraftingProject(project = {}) {
  const issues = [];
  const rawOperation = stringValue(project?.operation);
  const rawState = stringValue(project?.state);
  const rawQuality = stringValue(project?.economy?.quality);
  const rawMaterialGrade = stringValue(project?.economy?.workMaterialGrade);
  const rawTimeMode = stringValue(project?.time?.mode);

  if (!PROJECT_OPERATIONS.includes(rawOperation)) {
    issues.push({ code:"operation", message:"Tipo de operación de Proyecto desconocido." });
  }
  if (!PROJECT_STATES.includes(rawState)) {
    issues.push({ code:"state", message:"Estado de Proyecto desconocido." });
  }
  if (!PROJECT_QUALITIES.includes(rawQuality)) {
    issues.push({ code:"quality", message:"La Calidad de Proyecto debe ser Común, Superior o Excepcional." });
  }
  if (!PROJECT_MATERIAL_GRADES.includes(rawMaterialGrade)) {
    issues.push({ code:"material-grade", message:"Grado de Material de trabajo desconocido." });
  }
  if (!PROJECT_TIME_MODES.includes(rawTimeMode)) {
    issues.push({ code:"time-mode", message:"Modo temporal de Proyecto desconocido." });
  }

  const normalized = normalizeCraftingProject(project);
  if (normalized.time.mode === "derived" && normalized.time.adjustedBaseMinutes > 0) {
    const floor = normalized.time.adjustedBaseMinutes * 0.25;
    if (normalized.time.requiredMinutes + Number.EPSILON < floor) {
      issues.push({ code:"time-floor", message:"El tiempo requerido no puede quedar por debajo de 25% del TBA." });
    }
  }

  for (const component of normalized.components) {
    if (component.recoveredSeparately && component.countedInGenericRecovery) {
      issues.push({
        code:"double-recovery",
        message:"Un componente recuperado por separado no puede contarse también en recuperación genérica.",
        componentId:component.id
      });
    }
  }

  for (const entry of normalized.ledger.entries) {
    if (entry.resource.toLowerCase() === "pei") {
      issues.push({ code:"pei", message:"PEI no puede entrar en el ledger de un Proyecto de fabricación.", entryId:entry.id });
    }
  }

  if (normalized.state === "completed" && !normalized.execution.completionToken.trim()) {
    issues.push({ code:"completion-token", message:"Un Proyecto completado necesita identificador de cierre para evitar doble ejecución." });
  }

  const ids = [
    ...normalized.specialMaterials.map((row) => row.id),
    ...normalized.components.map((row) => row.id),
    ...normalized.consequences.map((row) => row.id),
    ...normalized.ledger.entries.map((row) => row.id)
  ];
  if (new Set(ids).size !== ids.length) {
    issues.push({ code:"duplicate-id", message:"Los registros internos del Proyecto deben tener identificadores únicos." });
  }

  return { valid: issues.length === 0, issues, project: normalized };
}

export function projectStateTransitionAllowed(from, to) {
  const transitions = {
    draft: new Set(["ready","cancelled"]),
    ready: new Set(["draft","active","cancelled"]),
    active: new Set(["blocked","completed","cancelled"]),
    blocked: new Set(["active","cancelled"]),
    completed: new Set(),
    cancelled: new Set()
  };
  return transitions[enumValue(from, PROJECT_STATES, "draft")]?.has(String(to)) ?? false;
}

