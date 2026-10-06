import { normalizeSlug } from "./identity.mjs";

export const TM_SCHEMA_VERSION = 5;

const SPELL_PD = Object.freeze({ trick: 1, minor: 1, basic: 2, advanced: 3, master: 5, legendary: 8 });
const TECHNIQUE_PD = Object.freeze({ basic: 2, advanced: 3, master: 5, legendary: 8 });

function clone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function number(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function forcedDeletion() {
  const ForcedDeletion = globalThis.foundry?.data?.operators?.ForcedDeletion;
  if (typeof ForcedDeletion !== "function") throw new Error("Foundry ForcedDeletion no está disponible.");
  return new ForcedDeletion();
}

function manualModifier(id, selector, value, label) {
  return {
    id,
    selector,
    value: number(value),
    label,
    sourceType: "manual"
  };
}

function migrateActorSourceV2(actor) {
  const system = actor.system ??= {};
  const combat = system.combat ??= {};
  const legacyMovementBonus = number(combat.movementBonus);
  const familiarMovement = actor.type === "familiar" ? number(system.familiar?.movement, 6) : 6;
  const movementBase = Math.max(1, number(system.movement?.base, familiarMovement));

  system.movement = {
    ...(system.movement && typeof system.movement === "object" ? system.movement : {}),
    base: movementBase
  };

  system.turn ??= {};
  if (!Number.isFinite(Number(system.turn.movementSpent))) {
    system.turn.movementSpent = system.turn.movement === false
      ? Math.max(1, movementBase + legacyMovementBonus)
      : 0;
  } else {
    system.turn.movementSpent = Math.max(0, number(system.turn.movementSpent));
  }
  system.turn.extraMovement = Math.max(0, number(system.turn.extraMovement));
  delete system.turn.movement;

  system.modifiers ??= {};
  const manual = system.modifiers.manual && typeof system.modifiers.manual === "object" && !Array.isArray(system.modifiers.manual)
    ? clone(system.modifiers.manual)
    : {};
  const defaults = {
    defensiveBonus: manualModifier("manual-defense", "defensiveBonus", combat.defenseBonus, "Ajuste manual de Defensa"),
    protection: manualModifier("manual-protection", "protection", combat.protectionBonus, "Ajuste manual de Protección"),
    movement: manualModifier("manual-movement", "movement", combat.movementBonus, "Ajuste manual de Movimiento"),
    initiativeModifier: manualModifier("manual-initiative", "initiativeModifier", combat.initiativeBonus, "Ajuste manual de Iniciativa")
  };
  for (const [key, entry] of Object.entries(defaults)) {
    manual[key] = {
      ...entry,
      ...(manual[key] && typeof manual[key] === "object" ? manual[key] : {})
    };
  }
  system.modifiers.manual = manual;

  delete combat.defenseBonus;
  delete combat.protectionBonus;
  delete combat.movementBonus;
  delete combat.initiativeBonus;
  if (actor.type === "familiar" && system.familiar) delete system.familiar.movement;

  system.schemaVersion = TM_SCHEMA_VERSION;
  return actor;
}

function normalizedCosts(item) {
  if (Array.isArray(item?.system?.costs) && item.system.costs.length) return clone(item.system.costs);
  if (item?.type === "specialization") return [{ context: "any", resource: "pd", amount: 1 }];
  if (item?.type === "technique") {
    const amount = TECHNIQUE_PD[item.system?.grade] ?? Math.max(0, number(item.system?.pdCost));
    return [{ context: "any", resource: "pd", amount }];
  }
  if (item?.type === "spell") {
    const amount = SPELL_PD[item.system?.grade] ?? Math.max(0, number(item.system?.pdCost));
    return [{ context: "any", resource: "pd", amount }];
  }
  if (item?.type === "trait") {
    const rank = Math.max(1, Math.min(3, Math.floor(number(item.system?.traitCost, 1))));
    return [
      { context: "creation", resource: "pr", amount: rank },
      { context: "progression", resource: "pd", amount: rank * 2 }
    ];
  }
  if (["formula", "ritual"].includes(item?.type) && Number.isFinite(Number(item.system?.pdCost))) {
    return [{ context: "any", resource: "pd", amount: Math.max(0, number(item.system.pdCost)) }];
  }
  if (["ancestry", "origin", "background"].includes(item?.type)) return [{ context: "any", resource: "none", amount: 0 }];
  if (item?.type === "discipline") return [{ context: "any", resource: "pd", amount: 2 }];
  return [];
}

function migratedRequirements(system) {
  if (system?.requirements && typeof system.requirements === "object") return clone(system.requirements);
  const skillRequirements = Array.isArray(system?.skillRequirements) ? system.skillRequirements : [];
  if (!skillRequirements.length) return null;
  return {
    all: skillRequirements.map((entry) => ({
      type: "skill",
      key: entry.skill,
      rank: Math.max(0, Math.min(5, Math.floor(number(entry.minRank)))),
      basis: "base",
      scope: "acquisition"
    }))
  };
}

function migrateItemSourceV3(item) {
  const system = item.system ??= {};
  if (item.type === "device") {
    const slug = normalizeSlug(system.slug || item.name);
    const hasSource = Object.prototype.hasOwnProperty.call(system, "energySourceItemId");
    const hasActivation = Object.prototype.hasOwnProperty.call(system, "activation");
    const hasKinetic = Object.prototype.hasOwnProperty.call(system, "kineticDefense");

    if (!hasSource) system.energySourceItemId = "";
    if (!hasActivation) system.activation = slug === "escudo-de-campo" ? "Reacción" : "Acción";
    if (!hasKinetic) system.kineticDefense = slug === "escudo-de-campo";
  }
  system.schemaVersion = 3;
  return item;
}

function migrateItemSourceV4(item) {
  const system = item.system ??= {};
  if (item.type === "spell") {
    const slug = normalizeSlug(system.slug || item.name);
    const remoteBlocked = ["paso-breve", "trasposicion", "umbral", "portal"].includes(slug);
    if (remoteBlocked) system.remoteOriginCompatible = false;
    else if (!Object.prototype.hasOwnProperty.call(system, "remoteOriginCompatible")) system.remoteOriginCompatible = true;
    if (slug === "llamada-menor") {
      system.sustained = true;
      if (!String(system.duration ?? "").trim() || String(system.duration).trim() === "Instantánea") {
        system.duration = "Sostenida";
      }
    }
  }
  system.schemaVersion = 4;
  return item;
}

function migrateItemSourceV5(item) {
  const system = item.system ??= {};
  if (item.type === "spell") {
    const slug = normalizeSlug(system.slug || item.name);
    if (!["single","multiple","self"].includes(String(system.targetMode ?? "").toLowerCase())) system.targetMode = "single";
    system.maxTargets = Math.max(1, Math.floor(number(system.maxTargets, 1)));
    system.requiresTarget = Boolean(system.requiresTarget);

    if (slug === "cierre-restaurador") {
      system.targetMode = "single";
      system.maxTargets = 1;
      system.requiresTarget = true;
    }

    if (slug === "trasposicion") {
      system.targetMode = "single";
      system.maxTargets = 1;
      system.requiresTarget = true;
      system.remoteOriginCompatible = false;
      system.range = "8 espacios";
      system.effect = "Intercambia la posición del lanzador con una criatura voluntaria dentro de alcance. Ambas posiciones deben ser válidas; no concede Movimiento adicional ni permite un destino inválido o inmediatamente letal.";
    }

    if (slug === "umbral") {
      system.targetMode = "single";
      system.maxTargets = 1;
      system.requiresTarget = false;
      system.remoteOriginCompatible = false;
      system.effect = "Abre un paso espacial local a través de una barrera continua de hasta 2 espacios de espesor. Una criatura voluntaria puede atravesarlo una vez antes de que se cierre; no conecta Anclas ni crea un Portal persistente.";
    }
  }
  system.schemaVersion = TM_SCHEMA_VERSION;
  return item;
}

function migratedRules(system) {
  const existing = Array.isArray(system?.rules) ? clone(system.rules) : [];
  const converted = [];
  for (const modifier of Array.isArray(system?.skillModifiers) ? system.skillModifiers : []) {
    const value = number(modifier?.value);
    if (!modifier?.skill || !value) continue;
    converted.push({
      id: "legacy-skill-" + converted.length,
      key: "FlatModifier",
      selector: "skill." + modifier.skill,
      value,
      label: String(modifier.label ?? "Modificador legado")
    });
  }
  const signatures = new Set(existing.map((rule) => JSON.stringify(rule)));
  for (const rule of converted) if (!signatures.has(JSON.stringify(rule))) existing.push(rule);
  return existing;
}

export function migrateItemSource(source, { embedded = false } = {}) {
  const item = clone(source ?? {});
  item.system ??= {};
  const system = item.system;
  const currentVersion = number(system.schemaVersion);
  if (currentVersion >= TM_SCHEMA_VERSION) return item;
  if (currentVersion >= 4) return migrateItemSourceV5(item);
  if (currentVersion >= 3) return migrateItemSourceV5(migrateItemSourceV4(item));
  if (currentVersion >= 1) return migrateItemSourceV5(migrateItemSourceV4(migrateItemSourceV3(item)));

  const oldRequirements = typeof system.requirements === "string" ? system.requirements : "";
  const oldSkillRequirements = clone(system.skillRequirements ?? []);
  const oldSkillModifiers = clone(system.skillModifiers ?? []);

  system.schemaVersion = TM_SCHEMA_VERSION;
  system.slug = normalizeSlug(system.slug || item.name);
  system.tags = Array.isArray(system.tags) ? system.tags : [];
  system.costs = normalizedCosts(item);
  system.requirementsText = String(system.requirementsText ?? oldRequirements ?? "");
  system.requirements = migratedRequirements(system);
  system.rules = migratedRules(system);
  system.choices = system.choices && typeof system.choices === "object" && !Array.isArray(system.choices) ? system.choices : {};
  system.provenance = system.provenance && typeof system.provenance === "object" ? system.provenance : {
    sourceUuid: "",
    sourceSchemaVersion: 0,
    sourceRevision: ""
  };
  system.stacking = String(system.stacking ?? (["weapon", "armor", "shield", "equipment", "formula", "device"].includes(item.type) ? "multiple" : "unique"));
  system.acquisition = embedded
    ? (system.acquisition ?? { mode: "legacy", stage: "legacy", sources: [], paid: { resource: "none", amount: 0, known: false } })
    : null;
  system.legacy ??= {};
  if (oldSkillRequirements.length) system.legacy.skillRequirements = oldSkillRequirements;
  if (oldSkillModifiers.length) system.legacy.skillModifiers = oldSkillModifiers;
  return migrateItemSourceV5(migrateItemSourceV4(migrateItemSourceV3(item)));
}

export function migrateActorSource(source) {
  const actor = clone(source ?? {});
  actor.system ??= {};
  const system = actor.system;
  const currentVersion = number(system.schemaVersion);
  if (currentVersion >= TM_SCHEMA_VERSION) return actor;
  if (currentVersion >= 1) return migrateActorSourceV2(actor);

  const oldCreation = clone(system.creation ?? {});
  const oldCurrency = clone(system.currency ?? {});
  const details = system.details ??= {};
  const legacyIdentityText = {
    ancestry: String(details.ancestry ?? ""),
    origin: String(details.origin ?? ""),
    background: String(details.background ?? "")
  };

  system.schemaVersion = TM_SCHEMA_VERSION;
  system.creation = {
    status: "complete",
    revision: Math.max(0, Math.floor(number(oldCreation.revision))),
    equipmentBudgetCopper: 0,
    initialReserveGranted: Boolean(oldCreation.initialReserveGranted ?? oldCurrency.initialReserveGranted),
    legacyWarnings: Array.isArray(oldCreation.legacyWarnings) ? oldCreation.legacyWarnings : [],
    legacyBuildFlags: {
      skillBuildActive: oldCreation.skillBuildActive,
      equipmentBudgetActive: oldCreation.equipmentBudgetActive,
      equipmentBudgetCopper: oldCreation.equipmentBudgetCopper
    }
  };

  if (actor.type === "character" && Object.values(legacyIdentityText).some(Boolean)) {
    system.creation.legacyWarnings.push("Identidad histórica conservada como texto hasta poder vincularla inequívocamente a Items canónicos.");
  }

  system.legacyIdentityText = system.legacyIdentityText ?? legacyIdentityText;
  system.legacyDevelopment = system.legacyDevelopment ?? {
    pdSpent: details.pdSpent,
    prSpent: details.prSpent
  };

  for (const attribute of Object.values(system.attributes ?? {})) {
    const value = number(attribute?.baseValue ?? attribute?.value, 1);
    attribute.creationValue = number(attribute?.creationValue, value);
    attribute.baseValue = value;
    attribute.value = value;
  }

  if (actor.type === "familiar") {
    system.details ??= {};
    const existingBond = String(system.details.bondId ?? "");
    system.details.bondId = existingBond || (system.details.ownerUuid ? "legacy-bond-" + String(actor._id ?? actor.id ?? "").replace(/[^A-Za-z0-9_-]/g, "") : "");
    system.details.sourceItemUuid = String(system.details.sourceItemUuid ?? "");
  }

  return migrateActorSourceV2(actor);
}

export function ancestryProfileUpdates(source, catalog = [], { actorSize = "" } = {}) {
  if (!source || source.type !== "ancestry" || !Array.isArray(catalog) || !catalog.length) return {};
  const slug = normalizeSlug(source.system?.slug || source.name);
  const canonical = catalog.find((entry) =>
    entry?.type === "ancestry" &&
    normalizeSlug(entry.system?.slug || entry.name) === slug
  );
  if (!canonical) return {};

  const current = source.system ?? {};
  const target = canonical.system ?? {};
  const updates = {};
  const copyField = (field, fallback) => {
    const wanted = target[field] ?? fallback;
    const have = current[field] ?? fallback;
    if (JSON.stringify(have) !== JSON.stringify(wanted)) updates["system." + field] = clone(wanted);
  };

  copyField("scale", "");
  copyField("movementBase", 6);
  copyField("movementModes", "");
  copyField("naturalProtection", 0);
  copyField("racialFeatures", []);
  copyField("selectionNotes", "");
  copyField("requirementsText", "");
  copyField("rules", []);

  // Terios históricos anteriores al perfil estructurado no tenían ChoiceSet.
  // Conserva la elección previa de la ficha cuando es una Escala racial válida.
  const wantedChoices = clone(current.choices && typeof current.choices === "object" && !Array.isArray(current.choices)
    ? current.choices
    : {});
  const canonicalScaleChoice = (target.rules ?? []).find((rule) => rule?.key === "ChoiceSet" && rule.choiceKey === "scale");
  if (canonicalScaleChoice && !wantedChoices.scale && ["small","medium"].includes(String(actorSize))) {
    wantedChoices.scale = String(actorSize);
  }
  if (JSON.stringify(current.choices ?? {}) !== JSON.stringify(wantedChoices)) {
    updates["system.choices"] = wantedChoices;
  }
  return updates;
}

export async function migrateWorldData({ catalog = [] } = {}) {
  if (!globalThis.game?.user?.isGM) return { actors: 0, items: 0, identities: 0, ancestryProfiles: 0 };
  let actors = 0, items = 0, identities = 0, ancestryProfiles = 0;

  for (const actor of game.actors ?? []) {
    const source = actor.toObject();
    if (number(source.system?.schemaVersion) < TM_SCHEMA_VERSION) {
      const migrated = migrateActorSource(source);
      const updates = {
        system: migrated.system,
        "system.currency.initialReserveGranted": forcedDeletion(),
        "system.creation.skillBuildActive": forcedDeletion(),
        "system.creation.equipmentBudgetActive": forcedDeletion(),
        "system.turn.movement": forcedDeletion(),
        "system.combat.defenseBonus": forcedDeletion(),
        "system.combat.protectionBonus": forcedDeletion(),
        "system.combat.movementBonus": forcedDeletion(),
        "system.combat.initiativeBonus": forcedDeletion()
      };
      if (actor.type === "familiar") updates["system.familiar.movement"] = forcedDeletion();
      await actor.update(updates);
      actors += 1;
    }

    for (const item of actor.items ?? []) {
      let itemSource = item.toObject();
      if (number(itemSource.system?.schemaVersion) < TM_SCHEMA_VERSION) {
        const migrated = migrateItemSource(itemSource, { embedded: true });
        await item.update({
          system: migrated.system,
          "system.skillRequirements": forcedDeletion(),
          "system.skillModifiers": forcedDeletion()
        }, { tmValidated: true });
        items += 1;
        itemSource = item.toObject();
      }

      const ancestryUpdates = ancestryProfileUpdates(itemSource, catalog, {
        actorSize: actor.system?.traits?.size
      });
      if (Object.keys(ancestryUpdates).length) {
        await item.update(ancestryUpdates, { tmValidated: true });
        ancestryProfiles += 1;
      }
    }

    if (actor.type !== "character" || !catalog.length) continue;
    const legacy = actor.system?.legacyIdentityText ?? {};
    for (const type of ["ancestry", "origin", "background"]) {
      if (actor.items?.some?.((item) => item.type === type)) continue;
      const text = String(legacy[type] ?? "").trim();
      if (!text) continue;
      const matches = catalog.filter((entry) => entry.type === type && String(entry.name).trim().toLowerCase() === text.toLowerCase());
      if (matches.length !== 1) continue;
      const data = migrateItemSource(matches[0], { embedded: true });
      data.system.acquisition = { mode: "legacy", stage: "legacy", sources: [], paid: { resource: "none", amount: 0, known: true } };
      await actor.createEmbeddedDocuments("Item", [data]);
      identities += 1;
    }
  }

  for (const item of game.items ?? []) {
    let source = item.toObject();
    if (number(source.system?.schemaVersion) < TM_SCHEMA_VERSION) {
      const migrated = migrateItemSource(source, { embedded: false });
      await item.update({
        system: migrated.system,
        "system.skillRequirements": forcedDeletion(),
        "system.skillModifiers": forcedDeletion()
      }, { tmValidated: true });
      items += 1;
      source = item.toObject();
    }

    const ancestryUpdates = ancestryProfileUpdates(source, catalog);
    if (Object.keys(ancestryUpdates).length) {
      await item.update(ancestryUpdates, { tmValidated: true });
      ancestryProfiles += 1;
    }
  }

  return { actors, items, identities, ancestryProfiles };
}
