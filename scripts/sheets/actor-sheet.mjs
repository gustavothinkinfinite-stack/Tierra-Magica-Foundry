import { TM_CONFIG } from "../config.mjs";
import { STARTER_CONTENT } from "../content.mjs";
import { toNumber } from "../rules.mjs";

export class TierraMagicaActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["tierra-magica", "sheet", "actor"],
      width: 920,
      height: 800,
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
    context.isNpc = this.actor.type === "npc";
    context.isFamiliar = this.actor.type === "familiar";
    context.itemGroups = this.#groupItems(this.actor.items);
    const xp = toNumber(this.actor.system.details?.experience?.value);
    const xpMax = toNumber(this.actor.system.details?.experience?.max);
    context.experiencePercent = xpMax > 0 ? Math.min(100, Math.round((xp / xpMax) * 100)) : 100;
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
    html.find("[data-action='roll-attribute']").click((event) => {
      this.actor.rollAttribute(event.currentTarget.dataset.key, { configure: event.shiftKey });
    });
    html.find("[data-action='roll-skill']").click((event) => {
      this.actor.rollSkill(event.currentTarget.dataset.key, { configure: event.shiftKey });
    });
    html.find("[data-action='roll-initiative']").click((event) => {
      this.actor.rollInitiativeCheck({ configure: event.shiftKey });
    });
    html.find("[data-action='resource-change']").click((event) => {
      this.actor.adjustResource(event.currentTarget.dataset.resource, event.currentTarget.dataset.amount);
    });
    html.find("[data-action='rest-short']").click(() => this.actor.rest(false));
    html.find("[data-action='rest-complete']").click(() => this.actor.rest(true));
    html.find("[data-action='character-builder']").click(() => this.#openCharacterBuilder());
    html.find("[data-action='create-familiar']").click(() => this.#createFamiliar());
    html.find("[data-action='content-browser']").click((event) => this.#openContentBrowser(event.currentTarget.dataset.type));
    html.find("[data-action='item-create']").click((event) => this.#createItem(event));
    html.find("[data-action='item-edit']").click((event) => this.#getItem(event)?.sheet.render(true));
    html.find("[data-action='item-delete']").click((event) => this.#deleteItem(event));
    html.find("[data-action='item-toggle']").click((event) => this.#toggleItem(event));
    html.find("[data-action='item-attack']").click((event) => {
      this.actor.rollWeapon(this.#getItem(event), { configure: event.shiftKey });
    });
    html.find("[data-action='item-damage']").click((event) => this.actor.rollDamage(this.#getItem(event)));
    html.find("[data-action='item-spell']").click((event) => this.actor.useSpell(this.#getItem(event)));
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

  async #toggleItem(event) {
    const item = this.#getItem(event);
    if (item) await item.update({ "system.equipped": !item.system.equipped });
  }

  async #openCharacterBuilder() {
    const optionTags = (options, selected) => Object.entries(options)
      .map(([value, label]) => `<option value="${value}" ${value === selected ? "selected" : ""}>${label}</option>`)
      .join("");
    const result = await Dialog.prompt({
      title: "Creación guiada de personaje",
      content: `<p>Este proceso configura la raza, profesión, características iniciales, Vida, Maná, Destino y 50 monedas de oro.</p>
        <div class="form-group"><label>Raza</label><select name="ancestry">${optionTags(TM_CONFIG.ancestryOptions, this.actor.system.details.ancestry)}</select></div>
        <div class="form-group"><label>Profesión</label><select name="class">${optionTags(TM_CONFIG.classOptions, this.actor.system.details.class)}</select></div>
        <div class="form-group"><label>Características</label><select name="generation"><option value="points">30 puntos sugeridos</option><option value="roll">2d6 y conservar el mayor</option></select></div>
        <p class="notes">Después podés ajustar cada característica manualmente. Este proceso reemplaza los valores actuales.</p>`,
      label: "Crear personaje",
      callback: (html) => ({
        ancestryKey: html.find("[name='ancestry']").val(),
        classKey: html.find("[name='class']").val(),
        generation: html.find("[name='generation']").val()
      }),
      rejectClose: false
    });
    if (!result) return;
    await this.actor.applyCharacterCreation(result);
    ui.notifications.info(`${this.actor.name} fue configurado para Tierra Mágica.`);
  }

  async #createFamiliar() {
    const familiar = await Actor.create({
      name: `Familiar de ${this.actor.name}`,
      type: "familiar",
      system: { details: { ownerName: this.actor.name, ownerUuid: this.actor.uuid } }
    });
    familiar?.sheet.render(true);
  }

  async #openContentBrowser(type) {
    const entries = STARTER_CONTENT[type] ?? [];
    if (!entries.length) return;
    const options = entries.map((entry, index) => `<option value="${index}">${foundry.utils.escapeHTML(entry.name)}</option>`).join("");
    const selected = await Dialog.prompt({
      title: `Agregar ${TM_CONFIG.itemTypes[type] ?? "contenido"}`,
      content: `<div class="form-group"><label>Contenido del libro</label><select name="entry">${options}</select></div>`,
      label: "Agregar a la ficha",
      callback: (html) => Number(html.find("[name='entry']").val()),
      rejectClose: false
    });
    if (selected === null || selected === undefined) return;
    const entry = foundry.utils.deepClone(entries[selected]);
    const [item] = await this.actor.createEmbeddedDocuments("Item", [{ ...entry, type }]);
    item?.sheet.render(true);
  }
}
