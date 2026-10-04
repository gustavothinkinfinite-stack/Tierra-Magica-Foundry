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
