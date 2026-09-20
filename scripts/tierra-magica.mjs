import { TM_CONFIG } from "./config.mjs";
import { TierraMagicaActor } from "./documents/actor.mjs";
import { TierraMagicaItem } from "./documents/item.mjs";
import { TierraMagicaActorSheet } from "./sheets/actor-sheet.mjs";
import { TierraMagicaItemSheet } from "./sheets/item-sheet.mjs";

Hooks.once("init", async () => {
  console.info("Foundry T.M. | Iniciando Tierra Mágica v0.3.0");

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

  const itemTypes = ["weapon", "armor", "shield", "equipment", "spell", "technique", "trait", "specialization"];
  Items.unregisterSheet("core", ItemSheet, { types: itemTypes });
  Items.registerSheet("tierra-magica", TierraMagicaItemSheet, {
    types: itemTypes,
    makeDefault: true,
    label: "Objeto Foundry T.M."
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

Hooks.once("ready", () => {
  console.info("Foundry T.M. | Sistema listo");
});
