import { TM_CONFIG } from "../config.mjs";
import { toNumber } from "../rules.mjs";
import { normalizeSlug } from "../rules/identity.mjs";
import { combineCurrency, formatCurrency, splitCurrency, CREATION_PEI_COPPER } from "../rules/currency.mjs";

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
    const currencyTotal = this.actor.getCurrencyTotal?.() ?? 0;
    const currencyParts = splitCurrency(currencyTotal);
    context.currency = {
      ...currencyParts,
      display: formatCurrency(currencyTotal),
      migrationPending: Boolean(this.actor.system.currency?.migrationPending),
      legacyCrowns: this.actor.system.currency?.legacy?.crowns ?? null,
      hasLegacyCrowns: Number(this.actor.system.currency?.legacy?.crowns) > 0,
      initialReserveGranted: Boolean(this.actor.system.creation?.initialReserveGranted)
    };
    const creationStatus = this.actor.system.creation?.status ?? "complete";
    const peiRemaining = Math.max(0, toNumber(this.actor.system.derived?.peiAvailable,
      this.actor.system.creation?.equipmentBudgetCopper ?? CREATION_PEI_COPPER));
    context.creationPei = {
      active: this.actor.type === "character" && ["building","rebuilding"].includes(creationStatus),
      remaining: peiRemaining,
      display: this.actor.type === "character" ? formatCurrency(peiRemaining) : ""
    };
    context.creation = {
      status: creationStatus,
      statusLabel: TM_CONFIG.creationStatuses[creationStatus] ?? creationStatus,
      revision: toNumber(this.actor.system.creation?.revision),
      isBuilding: creationStatus === "building",
      isComplete: creationStatus === "complete",
      isRebuilding: creationStatus === "rebuilding",
      reserveGranted: Boolean(this.actor.system.creation?.initialReserveGranted),
      warnings: Array.isArray(this.actor.system.creation?.legacyWarnings) ? this.actor.system.creation.legacyWarnings : []
    };
    const sustainedIds = Array.isArray(this.actor.system.magic?.sustainedSpellIds) ? this.actor.system.magic.sustainedSpellIds : [];
    context.sustainedSpells = sustainedIds.map((id) => this.actor.items.get(id)).filter(Boolean);

    const skillIssueLabels = {
      "rank-level": "Hay una Habilidad por encima del rango permitido por nivel.",
      "level-one-expert-limit": "A nivel 1 sólo puede existir una Habilidad Experta.",
      "grand-master-specialization": "Una Habilidad Gran Maestro carece de la Especialización requerida.",
      "skills-over-budget": "Los rangos de Habilidad superan los PD profesionales disponibles.",
      "pd-spent-below-skills": "PD gastados es menor que el coste mínimo invertido en Habilidades.",
      "specialization-parent-rank": "Una Especialización tiene su Habilidad madre por debajo de Entrenado.",
      "specialization-creation-limit": "Hay más de 2 Especializaciones de una misma Habilidad durante creación.",
      "specialization-duplicate": "Hay una Especialización duplicada para la misma Habilidad."
    };
    const skillIssues = Array.isArray(this.actor.system.derived?.skillIssues)
      ? this.actor.system.derived.skillIssues.map((issue) => skillIssueLabels[issue.code] ?? issue.code)
      : [];
    context.development = {
      pdTotal: toNumber(this.actor.system.derived?.pdTotal, 25),
      pdSpent: toNumber(this.actor.system.derived?.pdSpent),
      pdAvailable: toNumber(this.actor.system.derived?.pdAvailable, 25),
      prTotal: toNumber(this.actor.system.derived?.prTotal, 3),
      prSpent: toNumber(this.actor.system.derived?.prSpent),
      prAvailable: toNumber(this.actor.system.derived?.prAvailable, 3),
      peiTotal: toNumber(this.actor.system.derived?.peiTotal, CREATION_PEI_COPPER),
      peiSpent: toNumber(this.actor.system.derived?.peiSpent),
      peiAvailable: toNumber(this.actor.system.derived?.peiAvailable, CREATION_PEI_COPPER),
      skillsPdCost: toNumber(this.actor.system.derived?.skillsPdCost),
      skillIssues,
      skillBuildActive: creationStatus !== "complete",
      ruleIssues: Array.isArray(this.actor.system.derived?.ruleIssues) ? this.actor.system.derived.ruleIssues : []
    };
    context.identityItems = {
      ancestry: context.itemGroups.ancestry?.[0] ?? null,
      origin: context.itemGroups.origin?.[0] ?? null,
      background: context.itemGroups.background?.[0] ?? null
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
    html.find("[data-action='currency-denomination']").change((event) => this.#updateCurrencyBreakdown(event));
    html.find("[data-action='currency-add']").click(() => this.#adjustCurrencyDialog(1));
    html.find("[data-action='currency-spend']").click(() => this.#adjustCurrencyDialog(-1));
    html.find("[data-action='grant-initial-reserve']").click(() => this.actor.grantInitialReserve());
    html.find("[data-action='close-creation-equipment']").click(() => this.actor.closeCreationEquipment());
    html.find("[data-action='resolve-legacy-crowns']").click(() => this.#resolveLegacyCrowns());
    html.find("[data-action='archive-legacy-crowns']").click(() => this.#archiveLegacyCrowns());
    html.find("[data-action='complete-creation']").click(() => this.actor.completeCreation());
    html.find("[data-action='begin-rebuild']").click(() => this.actor.beginRebuild());

    html.find("[data-action='set-skill-rank']").change(async (event) => {
      const key = event.currentTarget.dataset.key;
      const rank = Math.min(5, Math.max(0, Math.floor(toNumber(event.currentTarget.value))));
      await this.actor.setSkillRank(key, rank);
      event.currentTarget.value = String(toNumber(this.actor.system.skills?.[key]?.rank));
    });
    html.find("[data-action='close-skill-build']").click(() => this.actor.closeSkillBuild());
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
      "system.turn.reaction": true,
      "system.combat.guardActive": false,
      "system.combat.parryActive": false,
      "system.combat.parrySucceeded": false,
      "system.combat.counterattackUsed": false
    }));
    html.find("[data-action='combat-guard']").click(() => this.actor.guard());
    html.find("[data-action='combat-parry']").click(() => this.actor.parry());
    html.find("[data-action='combat-counterattack']").click(async (event) => {
      const weapons = this.actor.items.filter((item) => item.type === "weapon" && item.system.equipped);
      if (!weapons.length) return ui.notifications.warn("No hay un arma equipada para Contraataque.");
      const weaponId = await Dialog.prompt({
        title: "Contraataque",
        content: "<div class='form-group'><label>Arma</label><select name='weapon'>" +
          weapons.map((item) => "<option value='" + item.id + "'>" + foundry.utils.escapeHTML(item.name) + "</option>").join("") +
          "</select></div>",
        label: "Contraatacar",
        callback: (html) => String(html.find("[name='weapon']").val() ?? ""),
        rejectClose: false
      });
      if (weaponId) return this.actor.counterattack(this.actor.items.get(weaponId));
    });
    html.find("[data-action='open-familiar']").click(() => this.#openFamiliar());
    html.find("[data-action='familiar-linked-action']").click(async () => {
      const familiar = this.#linkedFamiliar();
      if (!familiar) return ui.notifications.warn("No hay Familiar vinculado.");
      const result = await Dialog.prompt({title:"Acción Vinculada",content:"<div class='form-group'><label>Acción táctica</label><input name='order' type='text'/></div>",label:"Ejecutar",callback:(html)=>({order:String(html.find("[name='order']").val() ?? "")}),rejectClose:false});
      if (result) return this.actor.linkedFamiliarAction(familiar, result.order);
    });
    html.find("[data-action='familiar-command']").click(async () => {
      const familiar = this.#linkedFamiliar();
      if (!familiar) return ui.notifications.warn("No hay Familiar vinculado.");
      const result = await Dialog.prompt({title:"Dar orden al Familiar",content:"<div class='form-group'><label>Nueva orden</label><input name='order' type='text'/></div>",label:"Ordenar",callback:(html)=>({order:String(html.find("[name='order']").val() ?? "")}),rejectClose:false});
      if (result) return this.actor.commandFamiliar(familiar, result.order);
    });
    html.find("[data-action='familiar-call']").click(() => { const familiar=this.#linkedFamiliar(); if (familiar) return this.actor.callFamiliar(familiar); });
    html.find("[data-action='familiar-senses']").click(() => { const familiar=this.#linkedFamiliar(); if (familiar) return this.actor.useFamiliarSense(familiar); });

    html.find("[data-action='item-create']").click((event) => this.#createItem(event.currentTarget.dataset.type));
    html.find("[data-action='content-browser']").click((event) => this.#openContentBrowser(event.currentTarget.dataset.type));
    html.find("[data-action='item-edit']").click((event) => this.#getItem(event)?.sheet.render(true));
    html.find("[data-action='item-delete']").click((event) => this.#deleteItem(event));
    html.find("[data-action='item-toggle']").click((event) => this.#toggleItem(event));
    html.find("[data-action='item-attack']").click((event) => this.actor.rollWeapon(this.#getItem(event)));
    html.find("[data-action='item-combat-technique']").click((event) => this.#useWeaponTechnique(event));
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

  async #updateCurrencyBreakdown(event) {
    const panel = event.currentTarget.closest(".tm-currency");
    if (!panel) return;
    const read = (key) => Number(panel.querySelector("[data-denomination='" + key + "']")?.value ?? 0);
    const total = combineCurrency({ gold: read("gold"), silver: read("silver"), copper: read("copper") });
    if (total === null) return ui.notifications.warn("Oro, plata y cobre deben ser enteros no negativos.");
    return this.actor.setCurrencyTotal(total);
  }

  async #adjustCurrencyDialog(direction) {
    const result = await Dialog.prompt({
      title: direction > 0 ? "Añadir moneda" : "Gastar moneda",
      content:
        "<div class='form-group'><label>Oro</label><input name='gold' type='number' min='0' step='1' value='0'/></div>" +
        "<div class='form-group'><label>Plata</label><input name='silver' type='number' min='0' step='1' value='0'/></div>" +
        "<div class='form-group'><label>Cobre</label><input name='copper' type='number' min='0' step='1' value='0'/></div>",
      label: direction > 0 ? "Añadir" : "Gastar",
      callback: (html) => combineCurrency({
        gold: Number(html.find("[name='gold']").val()),
        silver: Number(html.find("[name='silver']").val()),
        copper: Number(html.find("[name='copper']").val())
      }),
      rejectClose: false
    });
    if (result === null || result === undefined) return;
    return this.actor.adjustCurrency(direction * result);
  }

  async #resolveLegacyCrowns() {
    const crowns = Number(this.actor.system.currency?.legacy?.crowns);
    if (!Number.isSafeInteger(crowns) || crowns <= 0) return ui.notifications.warn("No hay crowns legados pendientes.");
    const factor = await Dialog.prompt({
      title: "Migrar crowns legados",
      content:
        "<p>Dato legado preservado: <strong>" + crowns + " crowns</strong>. CREA-09 no define una equivalencia automática.</p>" +
        "<div class='form-group'><label>Valor de 1 crown en cobres</label><input name='factor' type='number' min='1' step='1'/></div>" +
        "<p>La conversión sólo se aplicará después de tu confirmación explícita.</p>",
      label: "Convertir",
      callback: (html) => Number(html.find("[name='factor']").val()),
      rejectClose: false
    });
    if (!Number.isSafeInteger(factor) || factor <= 0) return;
    return this.actor.resolveLegacyCrowns({ copperPerCrown: factor });
  }

  async #archiveLegacyCrowns() {
    const crowns = Number(this.actor.system.currency?.legacy?.crowns);
    if (!Number.isSafeInteger(crowns) || crowns <= 0) return;
    const confirmed = await Dialog.confirm({
      title: "Archivar crowns legados",
      content: "<p>Se conservará el dato histórico de " + crowns + " crowns, pero no se convertirá en saldo actual. Esta operación no añade dinero.</p>"
    });
    if (confirmed) return this.actor.archiveLegacyCrowns();
  }

  async #useWeaponTechnique(event) {
    const weapon = this.#getItem(event);
    if (!weapon) return;
    const owned = new Map(this.actor.items
      .filter((item) => item.type === "technique")
      .map((item) => [normalizeSlug(item.system?.slug || item.name), item]));
    const options = [];
    if (owned.has("golpe-potente")) options.push(["powerful", owned.get("golpe-potente").name]);
    if (owned.has("estocada-perforante")) options.push(["piercing", owned.get("estocada-perforante").name]);
    if (owned.has("barrido")) options.push(["sweep", owned.get("barrido").name]);
    if (owned.has("combate-dual")) options.push(["dual", owned.get("combate-dual").name]);
    if (!options.length) return ui.notifications.warn("El personaje no posee Técnicas ofensivas compatibles.");

    const selected = await Dialog.prompt({
      title: "Técnica con " + weapon.name,
      content: "<div class='form-group'><label>Técnica</label><select name='technique'>" +
        options.map(([value, label]) => "<option value='" + value + "'>" + foundry.utils.escapeHTML(label) + "</option>").join("") +
        "</select></div>",
      label: "Continuar",
      callback: (html) => String(html.find("[name='technique']").val() ?? ""),
      rejectClose: false
    });
    if (!selected) return;
    if (selected === "powerful") return this.actor.useCombatTechnique("golpe-potente", weapon);
    if (selected === "piercing") return this.actor.useCombatTechnique("estocada-perforante", weapon);
    if (selected === "sweep") return this.actor.sweepAttack(weapon);
    if (selected !== "dual") return;

    const candidates = this.actor.items.filter((item) =>
      item.type === "weapon" && item.id !== weapon.id && item.system.equipped &&
      /Ligera/i.test(String(item.system.properties ?? ""))
    );
    if (!candidates.length) return ui.notifications.warn("No hay una segunda arma Ligera/compatible equipada.");
    const secondaryId = await Dialog.prompt({
      title: "Combate Dual",
      content: "<div class='form-group'><label>Segunda arma</label><select name='secondary'>" +
        candidates.map((item) => "<option value='" + item.id + "'>" + foundry.utils.escapeHTML(item.name) + "</option>").join("") +
        "</select></div>",
      label: "Atacar",
      callback: (html) => String(html.find("[name='secondary']").val() ?? ""),
      rejectClose: false
    });
    if (!secondaryId) return;
    return this.actor.dualWieldAttack(weapon, this.actor.items.get(secondaryId));
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
        description: definition.description ?? "",
        rank: toNumber(skill.rank),
        pdCost: TM_CONFIG.rankCosts[toNumber(skill.rank)] ?? 0,
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
    const data = {
      name: "Nuevo " + (TM_CONFIG.itemTypes[type] ?? "objeto"),
      type,
      system: {
        costs: [{ context:"any", resource:"none", amount:0 }],
        slug: ""
      }
    };
    const item = this.actor.acquireItem ? await this.actor.acquireItem(data) : (await this.actor.createEmbeddedDocuments("Item", [data]))?.[0];
    item?.sheet?.render(true);
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
    const entries = (game.tierraMagica?.catalog ?? []).filter((entry) => entry.type === type);
    if (!entries.length) return ui.notifications.warn("No hay contenido estructurado disponible para esta categoría.");
    const options = entries.map((entry, index) =>
      "<option value='" + index + "'>" + foundry.utils.escapeHTML(entry.name) + "</option>"
    ).join("");
    const selected = await Dialog.prompt({
      title: "Agregar " + (TM_CONFIG.itemTypes[type] ?? "contenido"),
      content: "<div class='form-group'><label>Catálogo canónico CREA-11</label><select name='entry'>" + options + "</select></div>",
      label: "Agregar",
      callback: (html) => Number(html.find("[name='entry']").val()),
      rejectClose: false
    });
    if (selected === null || selected === undefined) return;
    const source = foundry.utils.deepClone(entries[selected]);
    const resolved = await this.#resolveCatalogChoices(source);
    if (!resolved) return;

    const singular = ["ancestry","origin","background"].includes(type);
    const existing = singular ? this.actor.items.find((item) => item.type === type) : null;
    if (existing) {
      if (this.actor.system.creation?.status === "complete") {
        return ui.notifications.warn("Reemplazar " + (TM_CONFIG.itemTypes[type] ?? type) + " requiere una reconstrucción autorizada.");
      }
      const confirmed = await Dialog.confirm({
        title: "Sustituir " + (TM_CONFIG.itemTypes[type] ?? type),
        content: "<p>¿Sustituir <strong>" + foundry.utils.escapeHTML(existing.name) + "</strong> por <strong>" + foundry.utils.escapeHTML(source.name) + "</strong>?</p>"
      });
      if (!confirmed) return;
      const backup = existing.toObject();
      await existing.delete({ tmValidated:true });
      const replacement = await this.actor.acquireItem(source);
      if (!replacement) {
        await this.actor.createEmbeddedDocuments("Item", [backup], { tmValidated:true });
        return;
      }
      replacement.sheet?.render(true);
      return;
    }

    const item = this.actor.acquireItem ? await this.actor.acquireItem(source) : (await this.actor.createEmbeddedDocuments("Item", [source]))?.[0];
    item?.sheet?.render(true);
  }

  async #resolveCatalogChoices(source) {
    source.system ??= {};
    source.system.choices ??= {};
    for (const rule of Array.isArray(source.system.rules) ? source.system.rules : []) {
      if (rule?.key !== "ChoiceSet") continue;
      const key = String(rule.choiceKey ?? "");
      if (!key || source.system.choices[key] !== undefined) continue;
      const options = (Array.isArray(rule.options) ? rule.options : []).map((option) =>
        typeof option === "object"
          ? { value:String(option.value ?? ""), label:String(option.label ?? option.value ?? "") }
          : { value:String(option), label:String(option) }
      ).filter((option) => option.value);
      if (!options.length) {
        if (rule.optional) continue;
        ui.notifications.warn("La elección " + key + " de " + source.name + " no tiene opciones estructuradas.");
        return null;
      }
      const choice = await Dialog.prompt({
        title: "Elección — " + source.name,
        content: "<div class='form-group'><label>" + foundry.utils.escapeHTML(rule.label ?? key) +
          "</label><select name='choice'>" +
          (rule.optional ? "<option value=''>— Ninguna —</option>" : "") +
          options.map((option) => "<option value='" + foundry.utils.escapeHTML(option.value) + "'>" +
            foundry.utils.escapeHTML(option.label) + "</option>").join("") +
          "</select></div>",
        label: "Confirmar",
        callback: (html) => String(html.find("[name='choice']").val() ?? ""),
        rejectClose: false
      });
      if (!choice && !rule.optional) return null;
      if (choice) source.system.choices[key] = choice;
    }
    return source;
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

  #linkedFamiliar() {
    return game.actors.find((actor) => actor.type === "familiar" && actor.system.details?.ownerUuid === this.actor.uuid) ?? null;
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

    const trait = this.actor.items.find((item) =>
      item.type === "trait" && normalizeSlug(item.system?.slug || item.name) === "familiar-magico"
    );
    if (!trait) return ui.notifications.warn("El personaje necesita el Rasgo Familiar Mágico para crear el vínculo.");

    const bondId = "bond-" + foundry.utils.randomID();
    const familiar = await Actor.create({
      name: "Familiar de " + this.actor.name,
      type: "familiar",
      system: { details: {
        ownerName: this.actor.name,
        ownerUuid: this.actor.uuid,
        bondId,
        sourceItemUuid: trait.uuid
      } }
    });
    familiar?.sheet.render(true);
  }
}
