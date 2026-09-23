import { TM_CONFIG } from "./config.mjs";
import { TierraMagicaActor } from "./documents/actor.mjs";
import { TierraMagicaItem } from "./documents/item.mjs";
import { TierraMagicaActorSheet } from "./sheets/actor-sheet.mjs";
import { TierraMagicaItemSheet } from "./sheets/item-sheet.mjs";
import { installFamiliarGuards } from "./rules/familiar-guards.mjs";
import { installMagicGuards } from "./rules/magic-guards.mjs";
import { installMagicReactionGuards } from "./rules/magic-reaction-guards.mjs";
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
  for (const actor of game.actors ?? []) {
    const updates = {};
    const turn = actor.system?.turn ?? {};
    if (Object.prototype.hasOwnProperty.call(turn, "movementRemaining")) updates["system.turn.-=movementRemaining"] = null;
    const combat = actor.system?.combat ?? {};
    if (Object.prototype.hasOwnProperty.call(combat, "parrySucceeded") && typeof combat.parrySucceeded !== "boolean") updates["system.combat.parrySucceeded"] = Boolean(combat.parrySucceeded);
    if (Object.keys(updates).length) {
      await actor.update(updates);
      repaired += 1;
    }
  }
  return repaired;
}

Hooks.once("ready", async () => {
  await retireLegacyMechanicalFields();
});

Hooks.on("renderChatMessage", (message, html) => {
  const request = message.flags?.["tierra-magica"]?.pendingDamage;
  if (!request) return;
  const root = html?.[0] ?? html;
  const button = root?.querySelector?.("[data-action='tm-approve-damage']");
  if (!button) return;
  button.disabled = !game.user.isGM;
  button.addEventListener("click", async () => {
    if (!game.user.isGM || !primaryActiveGm()) return;
    const validated = validatePendingDamageRequest(request);
    if (!validated) return ui.notifications.warn("Solicitud de daño inválida o desactualizada.");
    const target = await fromUuid(validated.targetUuid);
    if (!target?.adjustResource) return ui.notifications.warn("No se encontró un objetivo válido para aplicar el daño.");
    await target.adjustResource("health", -validated.damage);
    await message.update({ "flags.tierra-magica.pendingDamage.applied": true });
    button.disabled = true;
  });
});
