import { TM_CONFIG } from "./config.mjs";
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
import { installActionEconomyGuards } from "./rules/action-economy-guards.mjs";
import { installReactionEconomyGuards } from "./rules/reaction-economy-guards.mjs";
import { primaryActiveGm, validatePendingDamageRequest } from "./rules/damage-delivery.mjs";
import { applyBoundedHealing, validatePendingHealingRequest } from "./rules/healing-delivery.mjs";
import { installCurrencyRules, migrateWorldCurrency } from "./rules/currency.mjs";
import { migrateWorldSkills } from "./rules/skills.mjs";
import { normalizeSlug } from "./rules/identity.mjs";
import { preflightAcquisition, acquisitionFromCost } from "./rules/acquisition.mjs";
import { deriveDevelopmentBudget } from "./rules/creation.mjs";
import { migrateWorldData, TM_SCHEMA_VERSION } from "./rules/data-model-migration.mjs";
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
installActionEconomyGuards(TierraMagicaActor);
installReactionEconomyGuards(TierraMagicaActor);
installCurrencyRules(TierraMagicaActor);

Hooks.once("init", async () => {
  console.info("Foundry T.M. | Iniciando Tierra Mágica v1.0.17");
  CONFIG.TM = TM_CONFIG;
  CONFIG.Actor.documentClass = TierraMagicaActor;
  CONFIG.Item.documentClass = TierraMagicaItem;
  await loadTemplates(["systems/tierra-magica/templates/actor/parts/actor-sheet.hbs", "systems/tierra-magica/templates/actor/parts/item-section.hbs"]);
  Actors.unregisterSheet("core", ActorSheet, { types: ["character", "npc", "familiar"] });
  Actors.registerSheet("tierra-magica", TierraMagicaActorSheet, { types: ["character", "npc", "familiar"], makeDefault: true, label: "Foundry T.M." });
  const itemTypes = Object.keys(TM_CONFIG.itemTypes);
  Items.unregisterSheet("core", ItemSheet, { types: itemTypes });
  Items.registerSheet("tierra-magica", TierraMagicaItemSheet, { types: itemTypes, makeDefault: true, label: "Foundry T.M." });
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

  if (options.tmValidated || item.type === "effect") return;
  const actor = item.parent;
  if (!actor || actor.type !== "character") return;

  const candidate = item.toObject();
  candidate.system.slug = slug;
  const status = actor.system.creation?.status ?? "complete";
  const stage = status === "building" ? "creation" : status === "rebuilding" ? "rebuilding" : "progression";
  const physical = ["weapon","armor","shield","equipment","formula","device"].includes(item.type);

  if (physical && stage !== "creation") {
    ui.notifications.warn("El equipo adquirido después de creación debe pasar por la operación de compra para descontar moneda.");
    return false;
  }

  if (physical) {
    const amount = Math.max(0, Number(candidate.system.priceCopper ?? 0) || 0);
    const acquisition = acquisitionFromCost({ resource:"pei", amount }, { stage:"creation" });
    const budget = deriveDevelopmentBudget(actor, { skillKeys:Object.keys(TM_CONFIG.skills) });
    if (amount > budget.peiAvailable) {
      ui.notifications.warn("PEI insuficiente para adquirir " + item.name + ".");
      return false;
    }
    item.updateSource({ "system.acquisition": acquisition });
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

Hooks.on("preUpdateItem", (item, changes, options = {}) => {
  if (item.parent?.type === "character" && !options.tmValidated) {
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

function normalizeStoredNumber(value, { fallback = 0, minimum = 0, maximum = Number.POSITIVE_INFINITY } = {}) {
  const values = Array.isArray(value) ? value : [value];
  const candidates = values.filter((entry) => entry !== null && entry !== undefined && entry !== "").map(Number).filter((entry) => Number.isFinite(entry) && entry >= minimum && entry <= maximum);
  return candidates.length ? Math.max(...candidates) : fallback;
}

async function retireLegacyMechanicalFields() {
  if (!game.user.isGM) return 0; let repaired = 0;
  for (const actor of game.actors) {
    const source = actor.toObject().system ?? {}; const updates = {};
    if (Object.prototype.hasOwnProperty.call(source.recovery ?? {}, "zeroTraumaApplied")) updates["system.recovery.-=zeroTraumaApplied"] = null;
    if (actor.type === "familiar") for (const key of ["sharedSenses", "enhancedCommunication", "remoteOrigin"]) if (Object.prototype.hasOwnProperty.call(source.familiar ?? {}, key)) updates["system.familiar.-=" + key] = null;
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
  const repaired = await repairCharacterSheet031Data(); const retired = await retireLegacyMechanicalFields();
  const currencyMigration = await migrateWorldCurrency();
  const skillMigration = await migrateWorldSkills(TM_CONFIG.skills);
  const catalog = coreCatalog();
  const catalogValidation = validateCatalog(catalog, {
    knownTypes: Object.keys(TM_CONFIG.itemTypes),
    skillDefinitions: TM_CONFIG.skills
  });
  const dataMigration = await migrateWorldData({ catalog });
  game.tierraMagica = {
    ...(game.tierraMagica ?? {}),
    catalog,
    catalogValidation,
    schemaVersion: TM_SCHEMA_VERSION
  };
  if (repaired) ui.notifications.info("Tierra Mágica: se repararon " + repaired + " ficha(s) afectadas por el guardado de v0.3.1.");
  if (retired) ui.notifications.info("Tierra Mágica: se retiraron campos mecánicos históricos de " + retired + " actor(es).");
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
  if (dataMigration.actors || dataMigration.items || dataMigration.identities) {
    ui.notifications.info(
      "Tierra Mágica: CREA-11 migró " + dataMigration.actors + " Actor(es), " +
      dataMigration.items + " Item(s) y vinculó " + dataMigration.identities + " identidad(es) inequívoca(s)."
    );
  }
  if (!catalogValidation.valid) {
    console.warn("Foundry T.M. | CREA-11 catálogo con incidencias", catalogValidation.issues);
    ui.notifications.warn("Tierra Mágica: el catálogo CREA-11 contiene " + catalogValidation.issues.length + " incidencia(s); revisa la consola.");
  }

});

Hooks.on("renderChatMessage", (message, html) => {
  const request = validatePendingDamageRequest(message.getFlag("tierra-magica", "pendingDamage"));
  if (!request || !game.user?.isGM) return;
  const primary = primaryActiveGm(game.users ?? []); if (!primary || primary.id !== game.user.id) return;
  const root = html?.[0] ?? html; const card = root?.querySelector?.(".tm-chat-card");
  if (!card || card.querySelector("[data-tm-approve-damage]")) return;
  const button = document.createElement("button"); button.type = "button"; button.dataset.tmApproveDamage = "true";
  button.textContent = "Aplicar " + request.damage + " daño"; button.title = "Aplicación explícita por el DJ. No concede permisos al jugador atacante.";
  button.addEventListener("click", async () => {
    button.disabled = true; const current = validatePendingDamageRequest(message.getFlag("tierra-magica", "pendingDamage")); if (!current) return;
    const target = await fromUuid(current.targetUuid);
    if (!target || typeof target.adjustResource !== "function") { ui.notifications.warn("Tierra Mágica: el objetivo de esta solicitud ya no está disponible."); button.disabled = false; return; }
    if (!(target.canUserModify?.(game.user, "update") ?? target.isOwner ?? false)) { ui.notifications.warn("Tierra Mágica: el DJ activo no puede modificar el objetivo."); button.disabled = false; return; }
    await target.adjustResource("health", -current.damage); await message.setFlag("tierra-magica", "pendingDamage", { ...current, resolved: true }); button.textContent = "Daño aplicado";
  });
  card.append(button);
});

Hooks.on("renderChatMessage", (message, html) => {
  const request = validatePendingHealingRequest(message.getFlag("tierra-magica", "pendingHealing"));
  if (!request || !game.user?.isGM) return;
  const primary = primaryActiveGm(game.users ?? []); if (!primary || primary.id !== game.user.id) return;
  const root = html?.[0] ?? html; const card = root?.querySelector?.(".tm-chat-card");
  if (!card || card.querySelector("[data-tm-approve-healing]")) return;
  const button = document.createElement("button"); button.type = "button"; button.dataset.tmApproveHealing = "true";
  button.textContent = "Aplicar hasta " + request.healing + " Vida"; button.title = "Curación explícita por el DJ, limitada por Vida máxima y límite de lesión.";
  button.addEventListener("click", async () => {
    button.disabled = true; const current = validatePendingHealingRequest(message.getFlag("tierra-magica", "pendingHealing")); if (!current) return;
    const target = await fromUuid(current.targetUuid);
    if (!target || typeof target.update !== "function") { ui.notifications.warn("Tierra Mágica: el objetivo de esta curación ya no está disponible."); button.disabled = false; return; }
    if (!(target.canUserModify?.(game.user, "update") ?? target.isOwner ?? false)) { ui.notifications.warn("Tierra Mágica: el DJ activo no puede modificar el objetivo."); button.disabled = false; return; }
    const applied = await applyBoundedHealing(target, current.healing);
    await message.setFlag("tierra-magica", "pendingHealing", { ...current, resolved: true }); button.textContent = applied ? "Curación aplicada: " + applied : "Sin Vida recuperable";
  });
  card.append(button);
});
