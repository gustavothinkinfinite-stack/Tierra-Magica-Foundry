import { TM_CONFIG } from "../config.mjs";

export class TierraMagicaItemSheet extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["tierra-magica", "sheet", "item"],
      width: 620,
      height: 700,
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
    context.editable = this.isEditable;
    for (const type of Object.keys(TM_CONFIG.itemTypes)) {
      context["is" + type.charAt(0).toUpperCase() + type.slice(1)] = this.item.type === type;
    }
    context.typeLabel = TM_CONFIG.itemTypes[this.item.type] ?? this.item.type;
    context.enrichedDescription = await TextEditor.enrichHTML(this.item.system.description ?? "", {
      async: true, secrets: this.item.isOwner, relativeTo: this.item
    });
    return context;
  }
}
