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
    context.skillModifiers = (Array.isArray(this.item.system.skillModifiers) ? this.item.system.skillModifiers : [])
      .map((modifier, index) => ({
        index,
        skill: modifier?.skill ?? "",
        value: Number(modifier?.value ?? 0) || 0,
        label: modifier?.label ?? ""
      }));
    context.enrichedDescription = await TextEditor.enrichHTML(this.item.system.description ?? "", {
      async: true, secrets: this.item.isOwner, relativeTo: this.item
    });
    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find("[data-action='skill-modifier-add']").click(() => this.#addSkillModifier());
    html.find("[data-action='skill-modifier-delete']").click((event) => this.#deleteSkillModifier(event));
    html.find("[data-action='skill-modifier-field']").change((event) => this.#updateSkillModifier(event));
  }

  async #addSkillModifier() {
    const modifiers = foundry.utils.deepClone(
      Array.isArray(this.item.system.skillModifiers) ? this.item.system.skillModifiers : []
    );
    modifiers.push({ skill: "", value: 0, label: "" });
    await this.item.update({ "system.skillModifiers": modifiers });
  }

  async #deleteSkillModifier(event) {
    const index = Number(event.currentTarget.dataset.index);
    if (!Number.isInteger(index)) return;
    const modifiers = foundry.utils.deepClone(
      Array.isArray(this.item.system.skillModifiers) ? this.item.system.skillModifiers : []
    );
    modifiers.splice(index, 1);
    await this.item.update({ "system.skillModifiers": modifiers });
  }

  async #updateSkillModifier(event) {
    const index = Number(event.currentTarget.dataset.index);
    const field = event.currentTarget.dataset.field;
    if (!Number.isInteger(index) || !["skill", "value", "label"].includes(field)) return;

    const modifiers = foundry.utils.deepClone(
      Array.isArray(this.item.system.skillModifiers) ? this.item.system.skillModifiers : []
    );
    if (!modifiers[index]) return;

    modifiers[index][field] = field === "value"
      ? Number(event.currentTarget.value) || 0
      : event.currentTarget.value;

    await this.item.update({ "system.skillModifiers": modifiers });
  }
}
