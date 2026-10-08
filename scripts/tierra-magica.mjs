import { hasCraftingReservationsForProject } from "./rules/crafting-orphan-reservations.mjs";
import { installZeroHealthTokenHooks, registerZeroHealthStatus } from "./rules/zero-health-token.mjs";
import { TM_CONFIG } from "./config.mjs";
import { damageTypeRegistry } from "./rules/damage-types.mjs";
import { TierraMagicaActor } from "./documents/actor.mjs";
import { TierraMagicaItem } from "./documents/item.mjs";
import { TierraMagicaActorSheet } from "./sheets/actor-sheet.mjs";
import { TierraMagicaItemSheet } from "./sheets/item-sheet.mjs";
import { installFamiliarGuards } from "./rules/familiar-guards.mjs";
import { installMagicGuards } from "./rules/magic-guards.mjs";
import { installMagicReactionGuards } from "./rules/magic-reaction-guards.mjs";
import { installSpellOutcomeGuards } from "./rules/spell-outcome-guards.mjs";
import { installCombatDefenseGuards } from "./rules/combat-defense-guards.mjs";
import { installReactiveTechniqueGuards } from "./rules/reactive-technique-guards.mjs";
import { installFormulaGuards } from "./rules/formula-guards.mjs";
import { installRitualGuards } from "./rules/ritual-guards.mjs";
import { installCraftingMagicGuards } from "./rules/crafting-magic-runtime.mjs";
import { installActionEconomyGuards } from "./rules/action-economy-guards.mjs";
import { installReactionEconomyGuards } from "./rules/reaction-economy-guards.mjs";
import { primaryActiveGm, validatePendingDamageRequest } from "./rules/damage-delivery.mjs";
import { validatePendingHealingRequest } from "./rules/healing-delivery.mjs";
import { installCurrencyRules, migrateWorldCurrency } from "./rules/currency.mjs";
import { migrateWorldSkills } from "./rules/skills.mjs";
import { normalizeSlug } from "./rules/identity.mjs";
import { preflightAcquisition, preflightPhysicalPurchase, isPhysicalPurchaseType } from "./rules/acquisition.mjs";
import { deriveDevelopmentBudget } from "./rules/creation.mjs";
import { migrateWorldData, TM_SCHEMA_VERSION } from "./rules/data-model-migration.mjs";
import { installResourceReconciliationHooks, reconcileActorResources } from "./rules/resource-reconciliation.mjs";
import {
  advanceCraftingProjectAuthoritatively,
  approvePendingDamageAuthoritatively,
  approvePendingHealingAuthoritatively,
  cancelCraftingProjectAuthoritatively,
  completeCraftingProjectAuthoritatively,
  prepareCraftingProjectAuthoritatively,
  installStateAuthorityBridge,
  clearTurnResourceReservations,
  releaseCraftingProjectAuthoritatively,
  reserveCraftingProjectAuthoritatively,
  resolveResearchProjectStageAuthoritatively
} from "./rules/state-authority.mjs";
import { validateCatalog } from "./rules/catalog.mjs";
import { coreCatalog } from "./catalog/core-catalog.mjs";

installFamiliarGuards(TierraMagicaActor);
installMagicGuards(TierraMagicaActor);
installMagicReactionGuards(TierraMagicaActor);
installSpellOutcomeGuards(TierraMagicaActor);
installCombatDefenseGuards(TierraMagicaActor);
installReactiveTechniqueGuards(TierraMagicaActor);
installFormulaGuards(TierraMagicaActor);
installRitualGuards(TierraMagicaActor);
installCraftingMagicGuards(TierraMagicaActor);
installActionEconomyGuards(TierraMagicaActor);
installReactionEconomyGuards(TierraMagicaActor);
installCurrencyRules(TierraMagicaActor);
installResourceReconciliationHooks(Hooks);
installZeroHealthTokenHooks(Hooks);

function forcedDeletion() {
  const ForcedDeletion = globalThis.foundry?.data?.operators?.ForcedDeletion;
  if (typeof ForcedDeletion !== "function") throw new Error("Foundry ForcedDeletion no está disponible.");
  return new ForcedDeletion();
}

Hooks.once("init", async () => {
  console.info("Foundry T.M. | Iniciando Tierra Mágica v" + String(game.system?.version ?? "?"));
  game.settings.register("tierra-magica", "customDamageTypes", {
    name: "Tipos de daño personalizados",
    hint: "Añade tipos de daño del mundo como id=Nombre, separados por comas o saltos de línea. Ejemplo: solar=Solar, vacio=Vacío. Requiere recargar.",
    scope: "world",
    config: true,
    type: String,
    default: "",
    requiresReload: true
  });
  game.settings.register("tierra-magica", "zeroHealthTokenIndicator", {
    name:"Mostrar indicador de Incapacitado a 0 Vida",
    hint:"Muestra un icono sobre los tokens cuya Vida es 0. No significa muerte, inconsciencia ni Derribado; es sólo la señal visual de Incapacitado. Puede desactivarse aquí.",
    scope:"world",
    config:true,
    type:Boolean,
    default:true,
    requiresReload:true
  });
  registerZeroHealthStatus(CONFIG);
  TM_CONFIG.damageTypes = damageTypeRegistry(game.settings.get("tierra-magica", "customDamageTypes"));
  CONFIG.TM = TM_CONFIG;
  CONFIG.Actor.documentClass = TierraMagicaActor;
  CONFIG.Item.documentClass = TierraMagicaItem;
  await foundry.applications.handlebars.loadTemplates([
    "systems/tierra-magica/templates/actor/parts/actor-sheet.hbs",
    "systems/tierra-magica/templates/actor/parts/item-section.hbs",
    "systems/tierra-magica/templates/actor/parts/derived-diagnostics.hbs"
  ]);
  foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet, { types: ["character", "npc", "familiar"] });
  foundry.documents.collections.Actors.registerSheet("tierra-magica", TierraMagicaActorSheet, { types: ["character", "npc", "familiar"], makeDefault: true, label: "Foundry T.M." });
  const itemTypes = Object.keys(TM_CONFIG.itemTypes);
  foundry.documents.collections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet, { types: itemTypes });
  foundry.documents.collections.Items.registerSheet("tierra-magica", TierraMagicaItemSheet, { types: itemTypes, makeDefault: true, label: "Foundry T.M." });
});

Hooks.on("preCreateActor", (actor) => {
  const source = actor.toObject(); const updates = {};
  if (!source.img || source.img === "icons/svg/mystery-man.svg") updates.img = "systems/tierra-magica/assets/icons/actor.svg";
  if (["character", "familiar"].includes(actor.type)) updates["prototypeToken.actorLink"] = true;
  actor.updateSource(updates);
});

Hooks.on("preCreateItem", (item, data, options = {}) => {
  if (!item.img || item.img === "icons/svg/item-bag.svg") {
    const fallback = item.type === "shield" ? "armor" : ["weapon","armor","equipment","spell"].includes(item.type) ? item.type : "equipment";
    item.updateSource({ img: "systems/tierra-magica/assets/icons/" + fallback + ".svg" });
  }

  const slug = normalizeSlug(item.system?.slug || item.name);
  item.updateSource({
    "system.slug": slug,
    "system.schemaVersion": TM_SCHEMA_VERSION
  });

  if (item.type === "project" && !options.tmValidated) {
    item.updateSource({
      "system.state":"draft",
      "system.execution.revision":0,
      "system.execution.committed":false,
      "system.execution.completionToken":"",
      "system.ledger.committedMaterialsCopper":0,
      "system.ledger.recoveredMaterialsCopper":0
    });
    return;
  }
  if (options.tmValidated || item.type === "effect") return;
  const actor = item.parent;
  if (!actor || actor.type !== "character") return;

  const candidate = item.toObject();
  candidate.system.slug = slug;
  const status = actor.system.creation?.status ?? "complete";
  const stage = status === "building" ? "creation" : status === "rebuilding" ? "rebuilding" : "progression";
  const physical = isPhysicalPurchaseType(item.type);

  if (physical && stage !== "creation") {
    ui.notifications.warn("El equipo adquirido después de creación debe pasar por la operación de compra para descontar moneda.");
    return false;
  }

  if (physical) {
    const preflight = preflightPhysicalPurchase({
      actor,
      candidate,
      stage:"creation",
      expectedRevision:actor.system.creation?.revision
    });
    if (!preflight.valid) {
      ui.notifications.warn(preflight.issues.map((issue) => issue.message).join(" "));
      return false;
    }
    const budget = deriveDevelopmentBudget(actor, { skillKeys:Object.keys(TM_CONFIG.skills) });
    const amount = Math.max(0, Number(preflight.cost?.amount ?? 0) || 0);
    if (amount > budget.peiAvailable) {
      ui.notifications.warn("PEI insuficiente para adquirir " + item.name + ".");
      return false;
    }
    item.updateSource({ "system.acquisition": preflight.acquisition });
    return;
  }

  const priceContext = stage === "rebuilding" ? "creation" : null;
  const preflight = preflightAcquisition({
    actor,
    candidate,
    stage,
    priceContext,
    expectedRevision: actor.system.creation?.revision
  });
  if (!preflight.valid) {
    ui.notifications.warn(preflight.issues.map((issue) => issue.message).join(" "));
    return false;
  }

  const budget = deriveDevelopmentBudget(actor, { skillKeys:Object.keys(TM_CONFIG.skills) });
  const amount = Math.max(0, Number(preflight.cost?.amount ?? 0) || 0);
  const resource = preflight.cost?.resource;
  const available = resource === "pd" ? budget.pdAvailable
    : resource === "pr" ? budget.prAvailable
    : Number.POSITIVE_INFINITY;
  if (amount > available) {
    ui.notifications.warn("Presupuesto insuficiente para adquirir " + item.name + ".");
    return false;
  }
  item.updateSource({ "system.acquisition": preflight.acquisition });
});

Hooks.on("createItem", async (item, options = {}) => {
  const actor = item.parent;
  if (!actor || actor.type !== "character" || options.tmValidated || item.type === "project") return;
  await actor.update({ "system.creation.revision": Number(actor.system.creation?.revision ?? 0) + 1 });
});

Hooks.on("preDeleteItem", (item, options = {}) => {
  const actor = item.parent;
  if (!actor || actor.type !== "character" || options.tmValidated) return;
  if (item.type === "project" && (item.system?.execution?.committed || item.system?.state === "active" || hasCraftingReservationsForProject(item))) {
    ui.notifications.warn("Cancela o libera el Proyecto antes de eliminarlo; posee materiales reservados.");
    return false;
  }
  const reservations = item.system?.craftingLot?.reservations;
  const componentReservations = item.system?.craftingReservations;
  const activeTargetProject = actor.items?.find?.((entry) =>
    entry.type === "project" &&
    entry.system?.state === "active" &&
    String(entry.system?.target?.itemUuid ?? "") === String(item.uuid ?? "")
  );
  if (activeTargetProject) {
    ui.notifications.warn("No puede eliminarse un objeto mientras es objetivo de un Proyecto activo.");
    return false;
  }
  if (String(item.system?.enchantment?.attunedActorUuid ?? "")) {
    ui.notifications.warn("Desintoniza el objeto antes de eliminarlo; eliminarlo no puede borrar silenciosamente un vínculo activo.");
    return false;
  }
  if (String(item.system?.imprintStone?.socketedHostUuid ?? "")) {
    ui.notifications.warn("Extrae la Piedra de Impronta de su Engarce antes de eliminarla.");
    return false;
  }
  if (Array.isArray(item.system?.runic?.imprints) && item.system.runic.imprints.some((row) => row?.mode === "stone")) {
    ui.notifications.warn("Extrae las Piedras de Impronta antes de eliminar el Host.");
    return false;
  }
  if (
    (reservations && typeof reservations === "object" && Object.keys(reservations).length) ||
    (componentReservations && typeof componentReservations === "object" && Object.keys(componentReservations).length)
  ) {
    ui.notifications.warn("No puede eliminarse un Item reservado por un Proyecto activo.");
    return false;
  }
  if (item.type === "effect") return;
  if (item.type==="formula" && item.system?.known===true && actor.system.creation?.status==="complete") {
    ui.notifications.warn("Olvidar una Fórmula conocida requiere reconstrucción autorizada; borrar el documento no devuelve PD.");
    return false;
  }
  const developmental = new Set(["ancestry","origin","background","discipline","specialization","technique","trait","spell"]);
  if (!developmental.has(item.type)) return;
  if (actor.system.creation?.status === "complete") {
    ui.notifications.warn("Retirar " + item.name + " requiere una reconstrucción autorizada; eliminar el documento no devuelve recursos.");
    return false;
  }
});

Hooks.on("preUpdateItem", (item, changes, options = {}) => {
  if (item.parent?.type === "character" && !options.tmValidated) {
    const touches = (path) => foundry.utils.hasProperty(changes, path) ||
      Object.keys(changes).some((key) => key === path || key.startsWith(path + "."));

    if (!game.user?.isGM && (
      touches("system.craftingLot") ||
      touches("system.craftingReservations")
    )) {
      ui.notifications.warn("Los Lotes, VI, compatibilidades y reservas de crafting sólo cambian mediante operaciones autorizadas.");
      return false;
    }

    if (!game.user?.isGM && (
      touches("system.trap") ||
      touches("system.runic") ||
      touches("system.imprintStone") ||
      touches("system.magicSupport") ||
      touches("system.enchantment")
    )) {
      ui.notifications.warn("Trampas, CRu, Improntas, Engarces, Encantamientos, Sintonización y RE sólo cambian mediante operaciones autorizadas.");
      return false;
    }

    if (!game.user?.isGM && Number(item.system?.manufacture?.referenceValueCopper ?? 0) > 0) {
      const manufacturedPaths = [
        "system.manufacture",
        "system.quality",
        "system.priceCopper",
        "system.priceStatus",
        "system.damage",
        "system.penetration",
        "system.strengthMin",
        "system.reload",
        "system.block",
        "system.movementPenalty"
      ];
      if (manufacturedPaths.some(touches)) {
        ui.notifications.warn("Calidad, Materiales y estadísticas manufacturadas sólo cambian mediante un Proyecto autorizado.");
        return false;
      }
    }

    if (!game.user?.isGM && item.type==="formula" && touches("system.known")) {
      ui.notifications.warn("El conocimiento personal de una Fórmula sólo cambia mediante adquisición/desarrollo autorizado.");
      return false;
    }

    if (!game.user?.isGM && touches("system.quantity")) {
      const reservations = item.system?.craftingReservations;
      if (reservations && typeof reservations === "object" && Object.keys(reservations).length) {
        ui.notifications.warn("No puede alterarse la cantidad de un componente reservado por un Proyecto.");
        return false;
      }
    }

    if (item.type === "project" && !game.user?.isGM) {
      const transactionPaths = [
        "system.state",
        "system.time.completedMinutes",
        "system.execution",
        "system.ledger.committedMaterialsCopper",
        "system.ledger.recoveredMaterialsCopper",
        "system.research.history",
        "system.research.prototypeStatus",
        "system.research.provisionalPlan",
        "system.research.replicaStatus",
        "system.research.resumeStage",
        "system.research.resumeValidationId"
      ];
      if (transactionPaths.some(touches)) {
        ui.notifications.warn("Estado, avance y ledger transaccional del Proyecto requieren autoridad del sistema.");
        return false;
      }
      if (String(item.system?.state ?? "draft") !== "draft" && touches("system")) {
        ui.notifications.warn("Un Proyecto aprobado ya no puede reescribirse; libéralo o cancélalo mediante el flujo de crafting.");
        return false;
      }
    }
    const protectedPaths = ["system.acquisition", "system.costs", "system.rules", "system.requirements", "system.schemaVersion"];
    const touchesProtected = protectedPaths.some((path) => foundry.utils.hasProperty(changes, path));
    if (touchesProtected && !game.user?.isGM) {
      ui.notifications.warn("Los campos mecánicos estructurados de un Item adquirido no se editan directamente.");
      return false;
    }
  }
  if (item.type !== "specialization" || !item.parent || item.parent.type !== "character") return;
  const actor = item.parent;
  const skill = foundry.utils.getProperty(changes, "system.skill") ?? item.system.skill;
  const name = changes.name ?? item.name;
  if (!skill) return;
  if (!TM_CONFIG.skills[skill]) {
    ui.notifications.warn("La Especialización debe pertenecer a una de las 26 Habilidades canónicas.");
    return false;
  }
  if (Number(actor.system.skills?.[skill]?.rank ?? 0) < 2) {
    ui.notifications.warn("Una Especialización requiere la Habilidad madre Entrenada.");
    return false;
  }
  const peers = actor.items.filter((entry) =>
    entry.type === "specialization" && entry.id !== item.id && entry.system.skill === skill
  );
  if (peers.some((entry) => entry.name.trim().toLowerCase() === String(name).trim().toLowerCase())) {
    ui.notifications.warn("La misma Especialización no puede adquirirse dos veces para una Habilidad.");
    return false;
  }
  if (actor.system.creation?.status !== "complete" && peers.length >= 2) {
    ui.notifications.warn("Durante creación hay un máximo de 2 Especializaciones por Habilidad madre.");
    return false;
  }
  if (Number(foundry.utils.getProperty(changes, "system.pdCost") ?? item.system.pdCost) !== 1) {
    foundry.utils.setProperty(changes, "system.pdCost", 1);
  }
});

Hooks.on("preUpdateActor", (actor, changes, options = {}) => {
  if (options.tmValidated || game.user?.isGM) return;
  const touches = (path) => foundry.utils.hasProperty(changes, path) ||
    Object.keys(changes).some((key) => key === path || key.startsWith(path + "."));
  if (
    touches("system.magic.attunementCapacity") ||
    touches("system.magic.linkedImprintClaims") ||
    touches("system.magic.automaticEventClaims") ||
    touches("system.magic.sustainedObjectIds") ||
    touches("system.magic.preparedTrap")
  ) {
    ui.notifications.warn("Sintonización, Preparar, reclamaciones de Impronta/evento y Sostenimiento de objetos son estado mecánico protegido.");
    return false;
  }
});

function normalizeStoredNumber(value, { fallback = 0, minimum = 0, maximum = Number.POSITIVE_INFINITY } = {}) {
  const values = Array.isArray(value) ? value : [value];
  const candidates = values.filter((entry) => entry !== null && entry !== undefined && entry !== "").map(Number).filter((entry) => Number.isFinite(entry) && entry >= minimum && entry <= maximum);
  return candidates.length ? Math.max(...candidates) : fallback;
}

async function retireLegacyMechanicalFields() {
  if (!game.user.isGM) return 0; let repaired = 0;
  for (const actor of game.actors) {
    const source = actor.toObject().system ?? {}; const updates = {};
    if (Object.prototype.hasOwnProperty.call(source.recovery ?? {}, "zeroTraumaApplied")) updates["system.recovery.zeroTraumaApplied"] = forcedDeletion();
    if (actor.type === "familiar") for (const key of ["sharedSenses", "enhancedCommunication", "remoteOrigin"]) if (Object.prototype.hasOwnProperty.call(source.familiar ?? {}, key)) updates["system.familiar." + key] = forcedDeletion();
    if (!Object.keys(updates).length) continue; await actor.update(updates); repaired += 1;
  }
  return repaired;
}

async function repairCharacterSheet031Data() {
  if (!game.user.isGM) return 0; let repaired = 0;
  for (const actor of game.actors) {
    if (actor.type !== "character") continue;
    const source = actor.toObject().system ?? {}; const updates = {};
    if (Array.isArray(source.details?.level)) updates["system.details.level"] = normalizeStoredNumber(source.details.level, { fallback: 1, minimum: 1, maximum: 20 });
    if (Array.isArray(source.details?.pdSpent)) updates["system.details.pdSpent"] = normalizeStoredNumber(source.details.pdSpent, { fallback: 0, minimum: 0 });
    for (const [key, skill] of Object.entries(source.skills ?? {})) if (Array.isArray(skill?.rank)) updates["system.skills." + key + ".rank"] = normalizeStoredNumber(skill.rank, { fallback: 0, minimum: 0, maximum: 5 });
    if (!Object.keys(updates).length) continue; await actor.update(updates); repaired += 1;
  }
  return repaired;
}

Hooks.once("ready", async () => {
  console.info("Foundry T.M. | Sistema listo");
  installStateAuthorityBridge();
  const repaired = await repairCharacterSheet031Data(); const retired = await retireLegacyMechanicalFields();
  const currencyMigration = await migrateWorldCurrency();
  const skillMigration = await migrateWorldSkills(TM_CONFIG.skills);
  const catalog = coreCatalog();
  const catalogValidation = validateCatalog(catalog, {
    knownTypes: Object.keys(TM_CONFIG.itemTypes),
    skillDefinitions: TM_CONFIG.skills
  });
  const dataMigration = await migrateWorldData({ catalog });
  let resourceReconciliations = 0;
  let orphanTurnReservations = 0;
  if (game.user.isGM) {
    for (const actor of game.actors) {
      const reservations = actor.getFlag?.("tierra-magica", "turnReservations");
      if (reservations && typeof reservations === "object" && Object.keys(reservations).length) {
        await clearTurnResourceReservations(actor);
        orphanTurnReservations += 1;
      }
      if (await reconcileActorResources(actor)) resourceReconciliations += 1;
    }
  }
  game.tierraMagica = {
    ...(game.tierraMagica ?? {}),
    catalog,
    catalogValidation,
    schemaVersion: TM_SCHEMA_VERSION,
    crafting: {
      prepare: prepareCraftingProjectAuthoritatively,
      reserve: reserveCraftingProjectAuthoritatively,
      release: releaseCraftingProjectAuthoritatively,
      cancel: cancelCraftingProjectAuthoritatively,
      work: advanceCraftingProjectAuthoritatively,
      complete: completeCraftingProjectAuthoritatively,
      resolveResearch: resolveResearchProjectStageAuthoritatively
    }
  };
  if (repaired) ui.notifications.info("Tierra Mágica: se repararon " + repaired + " ficha(s) afectadas por el guardado de v0.3.1.");
  if (retired) ui.notifications.info("Tierra Mágica: se retiraron campos mecánicos históricos de " + retired + " actor(es).");
  if (orphanTurnReservations) ui.notifications.info("Tierra Mágica: se liberaron reservas huérfanas de Acción/Reacción en " + orphanTurnReservations + " Actor(es).");
  if (currencyMigration.actors || currencyMigration.items) {
    ui.notifications.info("Tierra Mágica: CREA-09 migró " + currencyMigration.actors + " Actor(es) y " + currencyMigration.items + " Item(s) al modelo monetario canónico.");
  }
  if (currencyMigration.pending) {
    ui.notifications.warn("Tierra Mágica: " + currencyMigration.pending + " Actor(es) conservan crowns legados y requieren una equivalencia explícita antes de convertirlos.");
  }
  if (skillMigration.actors || skillMigration.items || skillMigration.legacy) {
    ui.notifications.info(
      "Tierra Mágica: CREA-10 normalizó Habilidades en " + skillMigration.actors +
      " Actor(es), " + skillMigration.items + " Item(s) y preservó " + skillMigration.legacy + " clave(s) legada(s)."
    );
  }
  if (dataMigration.actors || dataMigration.items || dataMigration.identities || dataMigration.ancestryProfiles) {
    ui.notifications.info(
      "Tierra Mágica: migración de datos actualizó " + dataMigration.actors + " Actor(es), " +
      dataMigration.items + " Item(s), vinculó " + dataMigration.identities + " identidad(es) y sincronizó " +
      (dataMigration.ancestryProfiles ?? 0) + " paquete(s) racial(es)."
    );
  }
  if (resourceReconciliations) {
    ui.notifications.info("Tierra Mágica: CREA-12 reconcilió Vida/Maná en " + resourceReconciliations + " Actor(es) contra sus máximos derivados.");
  }
  if (!catalogValidation.valid) {
    console.warn("Foundry T.M. | CREA-11 catálogo con incidencias", catalogValidation.issues);
    ui.notifications.warn("Tierra Mágica: el catálogo CREA-11 contiene " + catalogValidation.issues.length + " incidencia(s); revisa la consola.");
  }

});

Hooks.on("renderChatMessageHTML", (message, html) => {
  const request = validatePendingDamageRequest(message.getFlag("tierra-magica", "pendingDamage"));
  if (!request || !game.user?.isGM) return;
  const primary = primaryActiveGm(game.users ?? []); if (!primary || primary.id !== game.user.id) return;
  const card = html?.querySelector?.(".tm-chat-card");
  if (!card || card.querySelector("[data-tm-approve-damage]")) return;
  const button = document.createElement("button"); button.type = "button"; button.dataset.tmApproveDamage = "true";
  button.textContent = "Aplicar " + request.damage + " daño"; button.title = "Aplicación explícita por el DJ. No concede permisos al jugador atacante.";
  button.addEventListener("click", async () => {
    button.disabled = true; const current = validatePendingDamageRequest(message.getFlag("tierra-magica", "pendingDamage")); if (!current) return;
    const result = await approvePendingDamageAuthoritatively(message);
    if (!result.ok) { ui.notifications.warn("Tierra Mágica: " + result.error); button.disabled = false; return; }
    button.textContent = result.alreadyResolved ? "Daño ya resuelto" : "Daño aplicado";
  });
  card.append(button);
});

Hooks.on("renderChatMessageHTML", (message, html) => {
  const request = validatePendingHealingRequest(message.getFlag("tierra-magica", "pendingHealing"));
  if (!request || !game.user?.isGM) return;
  const primary = primaryActiveGm(game.users ?? []); if (!primary || primary.id !== game.user.id) return;
  const card = html?.querySelector?.(".tm-chat-card");
  if (!card || card.querySelector("[data-tm-approve-healing]")) return;
  const button = document.createElement("button"); button.type = "button"; button.dataset.tmApproveHealing = "true";
  button.textContent = "Aplicar hasta " + request.healing + " Vida"; button.title = "Curación explícita por el DJ, limitada por Vida máxima y límite de lesión.";
  button.addEventListener("click", async () => {
    button.disabled = true; const current = validatePendingHealingRequest(message.getFlag("tierra-magica", "pendingHealing")); if (!current) return;
    const result = await approvePendingHealingAuthoritatively(message);
    if (!result.ok) { ui.notifications.warn("Tierra Mágica: " + result.error); button.disabled = false; return; }
    button.textContent = result.alreadyResolved ? "Curación ya resuelta" : (result.applied ? "Curación aplicada: " + result.applied : "Sin Vida recuperable");
  });
  card.append(button);
});
