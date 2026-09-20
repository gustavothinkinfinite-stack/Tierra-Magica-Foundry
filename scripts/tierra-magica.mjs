import { TM_CONFIG } from "./config.mjs";
import { TierraMagicaActor } from "./documents/actor.mjs";
import { TierraMagicaItem } from "./documents/item.mjs";
import { TierraMagicaActorSheet } from "./sheets/actor-sheet.mjs";
import { TierraMagicaItemSheet } from "./sheets/item-sheet.mjs";

Hooks.once("init", async () => {
  console.info("Tierra Mágica | Iniciando sistema");

  await loadTemplates([
    "systems/tierra-magica/templates/actor/parts/actor-sheet.hbs",
    "systems/tierra-magica/templates/actor/parts/item-section.hbs"
  ]);

  CONFIG.TM = TM_CONFIG;
  CONFIG.Actor.documentClass = TierraMagicaActor;
  CONFIG.Item.documentClass = TierraMagicaItem;

  game.settings.register("tierra-magica", "schemaVersion", {
    name: "Versión de datos",
    scope: "world",
    config: false,
    type: String,
    default: "0.1.0"
  });

  Actors.unregisterSheet("core", ActorSheet, { types: ["character", "npc", "familiar"] });
  Actors.registerSheet("tierra-magica", TierraMagicaActorSheet, {
    types: ["character", "npc", "familiar"],
    makeDefault: true,
    label: "Ficha de Tierra Mágica"
  });

  Items.unregisterSheet("core", ItemSheet, { types: ["weapon", "armor", "equipment", "spell", "talent", "familiarBenefit"] });
  Items.registerSheet("tierra-magica", TierraMagicaItemSheet, {
    types: ["weapon", "armor", "equipment", "spell", "talent", "familiarBenefit"],
    makeDefault: true,
    label: "Objeto de Tierra Mágica"
  });
});

Hooks.on("preCreateActor", (actor, data) => {
  const source = actor.toObject();
  const updates = {};
  if (!source.img || source.img === "icons/svg/mystery-man.svg") updates.img = "systems/tierra-magica/assets/icons/actor.svg";
  if (!source.prototypeToken?.texture?.src || source.prototypeToken.texture.src === "icons/svg/mystery-man.svg") {
    updates["prototypeToken.texture.src"] = "systems/tierra-magica/assets/icons/actor.svg";
  }
  if (["character", "familiar"].includes(actor.type)) updates["prototypeToken.actorLink"] = true;
  actor.updateSource(updates);
});

Hooks.on("preCreateItem", (item) => {
  if (!item.img || item.img === "icons/svg/item-bag.svg") {
    item.updateSource({ img: `systems/tierra-magica/assets/icons/${item.type}.svg` });
  }
});

Hooks.once("ready", async () => {
  if (game.user.isGM && game.settings.get("tierra-magica", "schemaVersion") !== "0.2.0") {
    await migrateWorldTo020();
  }
  console.info("Tierra Mágica | Sistema listo");
});

async function migrateWorldTo020() {
  const abilityMap = {
    strength: "might", dexterity: "agility", agility: "agility", fortitude: "might",
    intelligence: "intellect", perception: "will", willpower: "will", power: "presence"
  };
  for (const actor of game.actors) {
    const old = actor.system.attributes ?? {};
    if (old.strength) continue;
    const attributes = Object.fromEntries(Object.entries(abilityMap).map(([next, previous]) => [
      next, { value: Number(old[previous]?.value ?? 3) }
    ]));
    const ancestry = String(actor.system.details?.ancestry ?? "human").toLowerCase() === "humano" ? "human" : "human";
    await actor.update({
      "system.attributes": attributes,
      "system.details.ancestry": ancestry,
      "system.details.class": "unclassed",
      "system.resources.destiny": { value: 1, max: 6 }
    });
  }
  await game.settings.set("tierra-magica", "schemaVersion", "0.2.0");
  ui.notifications.info("Tierra Mágica actualizó las fichas a las reglas 0.2.0.");
}
