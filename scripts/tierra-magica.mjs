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

Hooks.once("init", async () => {
  console.info("Foundry T.M. | Iniciando Tierra Mágica v1.0.13");

  CONFIG.TM = TM_CONFIG;
  CONFIG.Actor.documentClass = TierraMagicaActor;
  CONFIG.Item.documentClass = TierraMagicaItem;

  await loadTemplates([
    "systems/tierra-magica/templates/actor/parts/actor-sheet.hbs",
    "systems/tierra-magica/templates/actor/parts/item-section.hbs"
  ]);

  Actors.unregisterSheet("core", ActorSheet, { types: ["character", "npc", "familiar"] });
  Actors.registerSheet("tierra-magica", TierraMagicaActorSheet, {
    types: ["character", "npc", "familiar"],
    makeDefault: true,
    label: "Foundry T.M."
  });

  const itemTypes = ["weapon", "armor", "shield", "equipment", "spell", "technique", "trait", "specialization", "formula", "ritual", "device"];
  Items.unregisterSheet("core", ItemSheet, { types: itemTypes });
  Items.registerSheet("tierra-magica", TierraMagicaItemSheet, {
    types: itemTypes,
    makeDefault: true,
    label: "Foundry T.M."
  });
});

Hooks.on("preCreateActor", (actor) => {
  const source = actor.toObject();
  const updates = {};
  if (!source.img || source.img === "icons/svg/mystery-man.svg") updates.img = "systems/tierra-magica/assets/icons/actor.svg";
  if ([ "character", "familiar" ].includes(actor.type)) updates["prototypeToken.actorLink"] = true;
  actor.updateSource(updates);
});

Hooks.on("preCreateItem", (item) => {
  if (!item.img || item.img === "icons/svg/item-bag.svg") {
    const fallback = item.type === "shield" ? "armor" : ["weapon","armor","equipment","spell"].includes(item.type) ? item.type : "equipment";
    item.updateSource({ img: "systems/tierra-magica/assets/icons/" + fallback + ".svg" });
  }
});

function normalizeStoredNumber(value, { fallback = 0, minimum = 0, maximum = Number.POSITIVE_INFINITY } = {}) {
  const values = Array.isArray(value) ? value : [value];
  const candidates = values
    .filter((entry) => entry !== null && entry !== undefined && entry !== "")
    .map((entry) => Number(entry))
    .filter((entry) => Number.isFinite(entry) && entry >= minimum && entry <= maximum);
  if (!candidates.length) return fallback;
  return Math.max(...candidates);
}

async function retireLegacyMechanicalFields() {
  if (!game.user.isGM) return 0;
  let repaired = 0;
  for (const actor of game.actors) {
    const source = actor.toObject().system ?? {};
    const updates = {};
    if (Object.prototype.hasOwnProperty.call(source.recovery ?? {}, "zeroTraumaApplied")) updates["system.recovery.-=zeroTraumaApplied"] = null;
    if (actor.type === "familiar") {
      for (const key of ["sharedSenses", "enhancedCommunication", "remoteOrigin"]) {
        if (Object.prototype.hasOwnProperty.call(source.familiar ?? {}, key)) updates["system.familiar.-=" + key] = null;
      }
    }
    if (!Object.keys(updates).length) continue;
    await actor.update(updates);
    repaired += 1;
  }
  return repaired;
}

async function repairCharacterSheet031Data() {
  if (!game.user.isGM) return 0;
  let repaired = 0;

  for (const actor of game.actors) {
    if (actor.type !== "character") continue;
    const source = actor.toObject().system ?? {};
    const updates = {};

    if (Array.isArray(source.details?.level)) {
      updates["system.details.level"] = normalizeStoredNumber(source.details.level, { fallback: 1, minimum: 1, maximum: 20 });
    }
    if (Array.isArray(source.details?.pdSpent)) {
      updates["system.details.pdSpent"] = normalizeStoredNumber(source.details.pdSpent, { fallback: 0, minimum: 0 });
    }

    for (const [key, skill] of Object.entries(source.skills ?? {})) {
      if (!Array.isArray(skill?.rank)) continue;
      updates["system.skills." + key + ".rank"] = normalizeStoredNumber(skill.rank, { fallback: 0, minimum: 0, maximum: 5 });
    }

    if (!Object.keys(updates).length) continue;
    await actor.update(updates);
    repaired += 1;
  }

  return repaired;
}

Hooks.once("ready", async () => {
  console.info("Foundry T.M. | Sistema listo");
  const repaired = await repairCharacterSheet031Data();
  const retired = await retireLegacyMechanicalFields();
  if (repaired) {
    ui.notifications.info("Tierra Mágica: se repararon " + repaired + " ficha(s) afectadas por el guardado de v0.3.1.");
  }
  if (retired) ui.notifications.info("Tierra Mágica: se retiraron campos mecánicos históricos de " + retired + " actor(es).");
});

Hooks.on("renderChatMessage", (message, html) => {
  const request = validatePendingDamageRequest(message.getFlag("tierra-magica", "pendingDamage"));
  if (!request || !game.user?.isGM) return;
  const primary = primaryActiveGm(game.users ?? []);
  if (!primary || primary.id !== game.user.id) return;

  const root = html?.[0] ?? html;
  const card = root?.querySelector?.(".tm-chat-card");
  if (!card || card.querySelector("[data-tm-approve-damage]")) return;

  const button = document.createElement("button");
  button.type = "button";
  button.dataset.tmApproveDamage = "true";
  button.textContent = "Aplicar " + request.damage + " daño";
  button.title = "Aplicación explícita por el DJ. No concede permisos al jugador atacante.";
  button.addEventListener("click", async () => {
    button.disabled = true;
    const current = validatePendingDamageRequest(message.getFlag("tierra-magica", "pendingDamage"));
    if (!current) return;

    const target = await fromUuid(current.targetUuid);
    if (!target || typeof target.adjustResource !== "function") {
      ui.notifications.warn("Tierra Mágica: el objetivo de esta solicitud ya no está disponible.");
      button.disabled = false;
      return;
    }
    if (!(target.canUserModify?.(game.user, "update") ?? target.isOwner ?? false)) {
      ui.notifications.warn("Tierra Mágica: el DJ activo no puede modificar el objetivo.");
      button.disabled = false;
      return;
    }

    await target.adjustResource("health", -current.damage);
    await message.setFlag("tierra-magica", "pendingDamage", { ...current, resolved: true });
    button.textContent = "Daño aplicado";
  });
  card.append(button);
});
