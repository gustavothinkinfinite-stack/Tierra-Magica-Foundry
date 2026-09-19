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

  Actors.unregisterSheet("core", ActorSheet, { types: ["character", "npc"] });
  Actors.registerSheet("tierra-magica", TierraMagicaActorSheet, {
    types: ["character", "npc"],
    makeDefault: true,
    label: "Ficha de Tierra Mágica"
  });

  Items.unregisterSheet("core", ItemSheet, { types: ["weapon", "armor", "equipment", "spell", "talent"] });
  Items.registerSheet("tierra-magica", TierraMagicaItemSheet, {
    types: ["weapon", "armor", "equipment", "spell", "talent"],
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
  if (actor.type === "character") updates["prototypeToken.actorLink"] = true;
  actor.updateSource(updates);
});

Hooks.on("preCreateItem", (item) => {
  if (!item.img || item.img === "icons/svg/item-bag.svg") {
    item.updateSource({ img: `systems/tierra-magica/assets/icons/${item.type}.svg` });
  }
});

Hooks.once("ready", () => {
  console.info("Tierra Mágica | Sistema listo");
});
