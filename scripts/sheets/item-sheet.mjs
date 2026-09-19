import { TM_CONFIG } from "../config.mjs";

export class TierraMagicaItemSheet extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["tierra-magica", "sheet", "item"],
      width: 560,
      height: 620,
      resizable: true
    });
  }

  get template() {
    return "systems/tierra-magica/templates/item/item-sheet.hbs";
  }

  async getData(options = {}) {
    const context = await super.getData(options);
    context.system = this.item.system;
    context.config = TM_CONFIG;
    context.isWeapon = this.item.type === "weapon";
    context.isArmor = this.item.type === "armor";
    context.isEquipment = this.item.type === "equipment";
    context.isSpell = this.item.type === "spell";
    context.isTalent = this.item.type === "talent";
    context.typeLabel = TM_CONFIG.itemTypes[this.item.type] ?? this.item.type;
    context.enrichedDescription = await TextEditor.enrichHTML(this.item.system.description ?? "", {
      async: true,
      secrets: this.item.isOwner,
      relativeTo: this.item
    });
    return context;
  }
}
