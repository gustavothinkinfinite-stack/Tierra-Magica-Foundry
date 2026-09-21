import { TM_CONFIG } from "../config.mjs";
import { STARTER_CONTENT } from "../content.mjs";
import { toNumber } from "../rules.mjs";

export class TierraMagicaActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["tierra-magica", "sheet", "actor"],
      width: 1180,
      height: 900,
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
    context.itemCounts = Object.fromEntries(Object.entries(context.itemGroups).map(([type, items]) => [type, items.length]));
    context.skillGroups = this.#groupSkills(this.actor.system.skills ?? {});
    context.healthPercent = this.#resourcePercent(this.actor.system.resources?.health);
    context.manaPercent = this.#resourcePercent(this.actor.system.resources?.mana);
    const sustainedIds = Array.isArray(this.actor.system.magic?.sustainedSpellIds) ? this.actor.system.magic.sustainedSpellIds : [];
    context.sustainedSpells = sustainedIds.map((id) => this.actor.items.get(id)).filter(Boolean);

    const level = Math.max(1, Math.floor(toNumber(this.actor.system.details?.level, 1)));
    const pdSpent = Math.max(0, toNumber(this.actor.system.details?.pdSpent));
    context.development = {
      pdTotal: 25 + Math.max(0, level - 1) * 4,
      pdSpent,
      pdAvailable: 25 + Math.max(0, level - 1) * 4 - pdSpent
    };

    context.turn = {
      movement: this.actor.system.turn?.movement ?? true,
      action: this.actor.system.turn?.action ?? true,
      reaction: this.actor.system.turn?.reaction ?? true
    };

    context.familiar = game.actors.find((actor) =>
      actor.type === "familiar" && actor.system.details?.ownerUuid === this.actor.uuid
    ) ?? null;

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

    html.find("[data-action='set-skill-rank']").change((event) => {
      const key = event.currentTarget.dataset.key;
      const rank = Math.min(5, Math.max(0, Math.floor(toNumber(event.currentTarget.value))));
      return this.actor.update({ ["system.skills." + key + ".rank"]: rank });
    });
    html.find("[data-action='set-skill-temporary']").change((event) => {
      const key = event.currentTarget.dataset.key;
      return this.actor.update({ ["system.skills." + key + ".temporary"]: toNumber(event.currentTarget.value) });
    });
    html.find("[data-action='set-skill-other']").change((event) => {
      const key = event.currentTarget.dataset.key;
      return this.actor.update({ ["system.skills." + key + ".other"]: toNumber(event.currentTarget.value) });
    });
    html.find("[data-action='clear-skill-temporaries']").click(() => {
      const updates = {};
      for (const key of Object.keys(TM_CONFIG.skills)) updates["system.skills." + key + ".temporary"] = 0;
      return this.actor.update(updates);
    });
    html.find("[data-action='skill-source-open']").click((event) => {
      const itemId = event.currentTarget.dataset.itemId;
      this.actor.items.get(itemId)?.sheet.render(true);
    });
    html.find("[data-action='set-numeric-field']").change((event) => {
      const field = event.currentTarget.dataset.field;
      if (!field) return;
      const minimum = event.currentTarget.min === "" ? Number.NEGATIVE_INFINITY : toNumber(event.currentTarget.min);
      const maximum = event.currentTarget.max === "" ? Number.POSITIVE_INFINITY : toNumber(event.currentTarget.max);
      const value = Math.min(maximum, Math.max(minimum, toNumber(event.currentTarget.value)));
      return this.actor.update({ [field]: value });
    });
    html.find("[data-action='toggle-turn']").click((event) => {
      const key = event.currentTarget.dataset.key;
      if (!["movement", "action", "reaction"].includes(key)) return;
      const current = this.actor.system.turn?.[key] ?? true;
      return this.actor.update({ ["system.turn." + key]: !current });
    });
    html.find("[data-action='reset-turn']").click(() => this.actor.update({
      "system.turn.movement": true,
      "system.turn.action": true,
      "system.turn.reaction": true
    }));
    html.find("[data-action='open-familiar']").click(() => this.#openFamiliar());

    html.find("[data-action='item-create']").click((event) => this.#createItem(event.currentTarget.dataset.type));
    html.find("[data-action='content-browser']").click((event) => this.#openContentBrowser(event.currentTarget.dataset.type));
    html.find("[data-action='item-edit']").click((event) => this.#getItem(event)?.sheet.render(true));
    html.find("[data-action='item-delete']").click((event) => this.#deleteItem(event));
    html.find("[data-action='item-toggle']").click((event) => this.#toggleItem(event));
    html.find("[data-action='item-attack']").click((event) => this.actor.rollWeapon(this.#getItem(event)));
    html.find("[data-action='item-damage']").click((event) => this.actor.rollDamage(this.#getItem(event)));
    html.find("[data-action='item-spell']").click((event) => this.actor.useSpell(this.#getItem(event)));
    html.find("[data-action='item-formula']").click((event) => this.actor.useFormula(this.#getItem(event)));
    html.find("[data-action='item-device']").click((event) => this.actor.useDevice(this.#getItem(event)));
    html.find("[data-action='item-device-overload']").click((event) => this.actor.overloadDevice(this.#getItem(event)));
    html.find("[data-action='item-ritual']").click(async (event) => {
      const item = this.#getItem(event);
      if (!item) return;
      const result = await Dialog.prompt({
        title: "Realizar ritual: " + item.name,
        content: "<div class='form-group'><label>Maná total declarado por asistentes</label><input name='assistantMana' type='number' min='0' value='0'/></div><p>Máximo por asistente: " + toNumber(item.system.manaAssistantMax) + " · asistentes útiles: " + toNumber(item.system.usefulAssistants) + "</p>",
        label: "Realizar",
        callback: (html) => ({ assistantMana: toNumber(html.find("[name='assistantMana']").val()) }),
        rejectClose: false
      });
      if (result) return this.actor.performRitual(item, result);
    });
    html.find("[data-action='stop-sustained']").click((event) => this.actor.stopSustainedSpell(event.currentTarget.dataset.itemId));
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

  #groupSkills(skills) {
    const iconByGroup = {
      "Físicas": "fa-person-running",
      "Exploración": "fa-compass",
      "Sociales": "fa-comments",
      "Conocimiento": "fa-book-open",
      "Técnicas": "fa-gears",
      "Combate": "fa-swords",
      "Magia": "fa-wand-sparkles",
      "Operación": "fa-horse"
    };
    const groups = new Map();
    for (const [key, definition] of Object.entries(TM_CONFIG.skills)) {
      const group = definition.group ?? "Otras";
      if (!groups.has(group)) groups.set(group, {
        label: group,
        icon: iconByGroup[group] ?? "fa-circle",
        skills: []
      });
      const skill = skills[key] ?? { rank: 0, bonus: 0 };
      const breakdown = skill.breakdown ?? {
        rank: toNumber(skill.bonus),
        specialization: 0,
        equipment: 0,
        technique: 0,
        magic: 0,
        trait: 0,
        itemOther: 0,
        temporary: toNumber(skill.temporary),
        other: toNumber(skill.other),
        total: toNumber(skill.bonus),
        sources: []
      };
      const signed = (value) => {
        const number = toNumber(value);
        return (number >= 0 ? "+" : "") + number;
      };
      groups.get(group).skills.push({
        key,
        label: definition.label,
        rank: toNumber(skill.rank),
        bonus: toNumber(skill.bonus),
        bonusDisplay: signed(skill.bonus),
        temporary: toNumber(skill.temporary),
        other: toNumber(skill.other),
        breakdown,
        modifierSummary: [
          { key: "rank", label: "Rango", value: breakdown.rank, display: signed(breakdown.rank) },
          { key: "specialization", label: "Especialización", value: breakdown.specialization, display: signed(breakdown.specialization) },
          { key: "equipment", label: "Equipo", value: breakdown.equipment, display: signed(breakdown.equipment) },
          { key: "technique", label: "Técnica", value: breakdown.technique, display: signed(breakdown.technique) },
          { key: "magic", label: "Magia", value: breakdown.magic, display: signed(breakdown.magic) },
          { key: "trait", label: "Rasgo", value: breakdown.trait, display: signed(breakdown.trait) }
        ],
        sources: (breakdown.sources ?? []).map((source) => ({
          ...source,
          display: signed(source.value)
        })),
        linkedSpecializations: this.actor.items
          .filter((item) => item.type === "specialization" && item.system.skill === key)
          .map((item) => ({ id: item.id, name: item.name }))
      });
    }
    return [...groups.values()];
  }

  #resourcePercent(resource) {
    const maximum = Math.max(0, toNumber(resource?.max));
    if (!maximum) return 0;
    return Math.max(0, Math.min(100, Math.round((toNumber(resource?.value) / maximum) * 100)));
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

  async #openFamiliar() {
    const familiar = game.actors.find((actor) =>
      actor.type === "familiar" && actor.system.details?.ownerUuid === this.actor.uuid
    );
    if (familiar) return familiar.sheet.render(true);
    return this.#createFamiliar();
  }

  async #createFamiliar() {
    const existing = game.actors.find((actor) =>
      actor.type === "familiar" && actor.system.details?.ownerUuid === this.actor.uuid
    );
    if (existing) return existing.sheet.render(true);

    const familiar = await Actor.create({
      name: "Familiar de " + this.actor.name,
      type: "familiar",
      system: { details: { ownerName: this.actor.name, ownerUuid: this.actor.uuid } }
    });
    familiar?.sheet.render(true);
  }
}
