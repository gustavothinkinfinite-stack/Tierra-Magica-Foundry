import { TM_CONFIG } from "../config.mjs";
import { STARTER_CONTENT } from "../content.mjs";
import { toNumber } from "../rules.mjs";

export class TierraMagicaActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["tierra-magica", "sheet", "actor"],
      width: 980,
      height: 840,
      resizable: true,
      tabs: [{ navSelector: ".tm-tabs", contentSelector: ".tm-sheet-body", initial: "summary" }],
      dragDrop: [{ dragSelector: ".item", dropSelector: null }]
    });
  }

  get template() {
    return "systems/tierra-magica/templates/actor/" + this.actor.type + "-sheet.hbs";
  }

  async getData(options = {}) {
    const context = await super.getData(options);
    context.system = this.actor.system;
    context.config = TM_CONFIG;
    context.editable = this.isEditable;
    context.isCharacter = this.actor.type === "character";
    context.isNpc = this.actor.type === "npc";
    context.isFamiliar = this.actor.type === "familiar";
    context.itemGroups = this.#groupItems(this.actor.items);
    context.enrichedBiography = await TextEditor.enrichHTML(this.actor.system.biography ?? "", {
      async: true, secrets: this.actor.isOwner, relativeTo: this.actor
    });
    context.enrichedNotes = await TextEditor.enrichHTML(this.actor.system.notes ?? "", {
      async: true, secrets: this.actor.isOwner, relativeTo: this.actor
    });
    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find("[data-action='roll-attribute']").click(async (event) => {
      const key = event.currentTarget.dataset.key;
      if (event.shiftKey) return this.#configureAttributeRoll(key);
      return this.actor.rollAttribute(key);
    });
    html.find("[data-action='roll-skill']").click((event) => this.actor.configureAndRollSkill(event.currentTarget.dataset.key));
    html.find("[data-action='roll-initiative']").click(() => this.actor.rollInitiativeCheck());
    html.find("[data-action='resource-change']").click((event) => this.actor.adjustResource(event.currentTarget.dataset.resource, event.currentTarget.dataset.amount));
    html.find("[data-action='rest']").click((event) => this.actor.rest(event.currentTarget.dataset.kind));

    html.find("[data-action='item-create']").click((event) => this.#createItem(event.currentTarget.dataset.type));
    html.find("[data-action='content-browser']").click((event) => this.#openContentBrowser(event.currentTarget.dataset.type));
    html.find("[data-action='item-edit']").click((event) => this.#getItem(event)?.sheet.render(true));
    html.find("[data-action='item-delete']").click((event) => this.#deleteItem(event));
    html.find("[data-action='item-toggle']").click((event) => this.#toggleItem(event));
    html.find("[data-action='item-attack']").click((event) => this.actor.rollWeapon(this.#getItem(event)));
    html.find("[data-action='item-damage']").click((event) => this.actor.rollDamage(this.#getItem(event)));
    html.find("[data-action='item-spell']").click((event) => this.actor.useSpell(this.#getItem(event)));
    html.find("[data-action='create-familiar']").click(() => this.#createFamiliar());
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

  async #createItem(type) {
    if (!type) return;
    const [item] = await this.actor.createEmbeddedDocuments("Item", [{
      name: "Nuevo " + (TM_CONFIG.itemTypes[type] ?? "objeto"),
      type
    }]);
    item?.sheet.render(true);
  }

  async #deleteItem(event) {
    const item = this.#getItem(event);
    if (!item) return;
    const confirmed = await Dialog.confirm({
      title: "Eliminar",
      content: "<p>¿Eliminar <strong>" + foundry.utils.escapeHTML(item.name) + "</strong>?</p>"
    });
    if (confirmed) await item.delete();
  }

  async #toggleItem(event) {
    const item = this.#getItem(event);
    if (item) await item.update({ "system.equipped": !item.system.equipped });
  }

  async #openContentBrowser(type) {
    const entries = STARTER_CONTENT[type] ?? [];
    if (!entries.length) return ui.notifications.warn("No hay contenido de referencia para esta categoría.");
    const options = entries.map((entry, index) =>
      "<option value='" + index + "'>" + foundry.utils.escapeHTML(entry.name) + "</option>"
    ).join("");
    const selected = await Dialog.prompt({
      title: "Agregar " + (TM_CONFIG.itemTypes[type] ?? "contenido"),
      content: "<div class='form-group'><label>Contenido del Manual v0.1</label><select name='entry'>" + options + "</select></div>",
      label: "Agregar",
      callback: (html) => Number(html.find("[name='entry']").val()),
      rejectClose: false
    });
    if (selected === null || selected === undefined) return;
    const source = foundry.utils.deepClone(entries[selected]);
    const [item] = await this.actor.createEmbeddedDocuments("Item", [{ ...source, type }]);
    item?.sheet.render(true);
  }

  async #configureAttributeRoll(key) {
    const result = await Dialog.prompt({
      title: "Tirada de " + (TM_CONFIG.attributes[key] ?? key),
      content:
        "<div class='form-group'><label>Modo</label><select name='mode'><option value='normal'>Normal</option><option value='advantage'>Ventaja</option><option value='disadvantage'>Desventaja</option></select></div>" +
        "<div class='form-group'><label>DF</label><input name='df' type='number' placeholder='Sin DF'/></div>" +
        "<div class='form-group'><label>Modificador</label><input name='modifier' type='number' value='0'/></div>",
      label: "Tirar",
      callback: (html) => ({
        mode: html.find("[name='mode']").val(),
        df: html.find("[name='df']").val(),
        modifier: toNumber(html.find("[name='modifier']").val())
      }),
      rejectClose: false
    });
    if (!result) return;
    return this.actor.rollAttribute(key, result);
  }

  async #createFamiliar() {
    const familiar = await Actor.create({
      name: "Familiar de " + this.actor.name,
      type: "familiar",
      system: { details: { ownerName: this.actor.name, ownerUuid: this.actor.uuid } }
    });
    familiar?.sheet.render(true);
  }
}
