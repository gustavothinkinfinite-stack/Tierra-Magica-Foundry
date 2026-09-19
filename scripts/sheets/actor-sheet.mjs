import { TM_CONFIG } from "../config.mjs";

export class TierraMagicaActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["tierra-magica", "sheet", "actor"],
      width: 860,
      height: 760,
      resizable: true,
      tabs: [{ navSelector: ".tm-tabs", contentSelector: ".tm-sheet-body", initial: "summary" }],
      dragDrop: [{ dragSelector: ".item", dropSelector: null }]
    });
  }

  get template() {
    return `systems/tierra-magica/templates/actor/${this.actor.type}-sheet.hbs`;
  }

  async getData(options = {}) {
    const context = await super.getData(options);
    context.system = this.actor.system;
    context.config = TM_CONFIG;
    context.editable = this.isEditable;
    context.isCharacter = this.actor.type === "character";
    context.itemGroups = this.#groupItems(this.actor.items);
    context.enrichedBiography = await TextEditor.enrichHTML(this.actor.system.biography ?? "", {
      async: true,
      secrets: this.actor.isOwner,
      relativeTo: this.actor
    });
    context.enrichedNotes = await TextEditor.enrichHTML(this.actor.system.notes ?? "", {
      async: true,
      secrets: this.actor.isOwner,
      relativeTo: this.actor
    });
    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find("[data-action='roll-attribute']").click((event) => {
      this.actor.rollAttribute(event.currentTarget.dataset.key);
    });
    html.find("[data-action='roll-skill']").click((event) => {
      this.actor.rollSkill(event.currentTarget.dataset.key);
    });
    html.find("[data-action='roll-initiative']").click(() => this.actor.rollInitiativeCheck());
    html.find("[data-action='item-create']").click((event) => this.#createItem(event));
    html.find("[data-action='item-edit']").click((event) => this.#getItem(event)?.sheet.render(true));
    html.find("[data-action='item-delete']").click((event) => this.#deleteItem(event));
    html.find("[data-action='item-attack']").click((event) => this.actor.rollWeapon(this.#getItem(event)));
    html.find("[data-action='item-damage']").click((event) => this.actor.rollDamage(this.#getItem(event)));
    html.find("[data-action='item-spell']").click((event) => this.actor.rollSpell(this.#getItem(event)));
  }

  #groupItems(items) {
    const groups = Object.fromEntries(Object.keys(TM_CONFIG.itemTypes).map((type) => [type, []]));
    for (const item of items) groups[item.type]?.push(item);
    return groups;
  }

  #getItem(event) {
    const row = event.currentTarget.closest(".item");
    return this.actor.items.get(row?.dataset.itemId);
  }

  async #createItem(event) {
    event.preventDefault();
    const type = event.currentTarget.dataset.type;
    const name = `Nuevo ${TM_CONFIG.itemTypes[type] ?? "objeto"}`;
    const [item] = await this.actor.createEmbeddedDocuments("Item", [{ name, type }]);
    item?.sheet.render(true);
  }

  async #deleteItem(event) {
    event.preventDefault();
    const item = this.#getItem(event);
    if (!item) return;
    const confirmed = await Dialog.confirm({
      title: "Eliminar objeto",
      content: `<p>¿Eliminar <strong>${foundry.utils.escapeHTML(item.name)}</strong>?</p>`
    });
    if (confirmed) await item.delete();
  }
}
