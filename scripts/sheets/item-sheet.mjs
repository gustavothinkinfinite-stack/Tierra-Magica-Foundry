import { TM_CONFIG } from "../config.mjs";
import { formatCurrency } from "../rules/currency.mjs";

const ItemSheetV1 = foundry.appv1.sheets.ItemSheet;
const PHYSICAL_TYPES = new Set(["weapon", "armor", "shield", "equipment", "formula", "device"]);

function requirementLeaves(requirements) {
  if (!requirements) return [];
  if (Array.isArray(requirements.all)) return requirements.all;
  return [requirements];
}

export class TierraMagicaItemSheet extends ItemSheetV1 {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["tierra-magica", "sheet", "item"],
      width: 660,
      height: 760,
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
    context.isPhysical = PHYSICAL_TYPES.has(this.item.type);
    context.typeLabel = TM_CONFIG.itemTypes[this.item.type] ?? this.item.type;
    context.priceDisplay = context.isPhysical
      ? this.item.system.priceStatus === "exact"
        ? formatCurrency(this.item.system.priceCopper)
        : this.item.system.priceStatus === "variable" ? "Precio variable" : "Sin precio establecido"
      : "";

    context.deviceEnergySources = { "": "Reserva propia" };
    if (this.item.type === "device" && this.item.parent?.items) {
      for (const candidate of this.item.parent.items) {
        if (candidate.id === this.item.id || candidate.type !== "device") continue;
        if (Number(candidate.system?.energy?.max ?? 0) <= 0) continue;
        context.deviceEnergySources[candidate.id] = candidate.name;
      }
    }

    const rules = Array.isArray(this.item.system.rules) ? this.item.system.rules : [];
    context.skillModifiers = rules
      .map((rule, index) => ({ rule, index }))
      .filter(({ rule }) => rule?.key === "FlatModifier" && String(rule.selector ?? "").startsWith("skill."))
      .map(({ rule, index }) => ({
        index,
        skill: String(rule.selector).slice(6),
        value: Number(rule.value ?? 0) || 0,
        label: rule.label ?? ""
      }));

    context.skillRequirements = requirementLeaves(this.item.system.requirements)
      .map((requirement, index) => ({ requirement, index }))
      .filter(({ requirement }) => requirement?.type === "skill")
      .map(({ requirement, index }) => ({
        index,
        skill: requirement.key ?? "",
        minRank: Number(requirement.rank ?? 0) || 0,
        basis: requirement.basis ?? "base"
      }));

    context.costs = (Array.isArray(this.item.system.costs) ? this.item.system.costs : []).map((cost, index) => ({
      index,
      context: cost?.context ?? "any",
      resource: cost?.resource ?? "none",
      amount: Number(cost?.amount ?? 0) || 0
    }));
    context.costContexts = { any:"Siempre", creation:"Creación", progression:"Progresión" };
    context.acquisitionDisplay = this.item.parent
      ? this.item.system.acquisition
        ? (TM_CONFIG.acquisitionModes[this.item.system.acquisition.mode] ?? this.item.system.acquisition.mode) +
          " · " + (TM_CONFIG.paidResources[this.item.system.acquisition.paid?.resource] ?? this.item.system.acquisition.paid?.resource ?? "—") +
          " " + (this.item.system.acquisition.paid?.amount ?? 0)
        : "Sin adquisición estructurada"
      : "Catálogo / mundo: todavía no adquirido";

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
    html.find("[data-action='skill-requirement-add']").click(() => this.#addSkillRequirement());
    html.find("[data-action='skill-requirement-delete']").click((event) => this.#deleteSkillRequirement(event));
    html.find("[data-action='skill-requirement-field']").change((event) => this.#updateSkillRequirement(event));
    html.find("[data-action='cost-add']").click(() => this.#addCost());
    html.find("[data-action='cost-delete']").click((event) => this.#deleteCost(event));
    html.find("[data-action='cost-field']").change((event) => this.#updateCost(event));
  }

  #rules() {
    return foundry.utils.deepClone(Array.isArray(this.item.system.rules) ? this.item.system.rules : []);
  }

  async #addSkillModifier() {
    const rules = this.#rules();
    rules.push({ id:"rule-" + Date.now(), key:"FlatModifier", selector:"skill.athletics", value:0, label:"" });
    await this.item.update({ "system.rules": rules }, { tmValidated:true });
  }

  async #deleteSkillModifier(event) {
    const index = Number(event.currentTarget.dataset.index);
    if (!Number.isInteger(index)) return;
    const rules = this.#rules();
    rules.splice(index, 1);
    await this.item.update({ "system.rules": rules }, { tmValidated:true });
  }

  async #updateSkillModifier(event) {
    const index = Number(event.currentTarget.dataset.index);
    const field = event.currentTarget.dataset.field;
    if (!Number.isInteger(index) || !["skill", "value", "label"].includes(field)) return;
    const rules = this.#rules();
    const rule = rules[index];
    if (!rule || rule.key !== "FlatModifier") return;
    if (field === "skill") rule.selector = "skill." + event.currentTarget.value;
    else if (field === "value") rule.value = Number(event.currentTarget.value) || 0;
    else rule.label = event.currentTarget.value;
    await this.item.update({ "system.rules": rules }, { tmValidated:true });
  }

  #requirementLeaves() {
    return foundry.utils.deepClone(requirementLeaves(this.item.system.requirements));
  }

  async #addSkillRequirement() {
    const leaves = this.#requirementLeaves();
    leaves.push({ type:"skill", key:"athletics", rank:2, basis:"base", scope:"acquisition" });
    await this.item.update({ "system.requirements": { all:leaves } }, { tmValidated:true });
  }

  async #deleteSkillRequirement(event) {
    const index = Number(event.currentTarget.dataset.index);
    if (!Number.isInteger(index)) return;
    const leaves = this.#requirementLeaves();
    leaves.splice(index, 1);
    await this.item.update({ "system.requirements": leaves.length ? { all:leaves } : null }, { tmValidated:true });
  }

  async #updateSkillRequirement(event) {
    const index = Number(event.currentTarget.dataset.index);
    const field = event.currentTarget.dataset.field;
    if (!Number.isInteger(index) || !["skill", "minRank", "basis"].includes(field)) return;
    const leaves = this.#requirementLeaves();
    const requirement = leaves[index];
    if (!requirement || requirement.type !== "skill") return;
    if (field === "skill") requirement.key = event.currentTarget.value;
    else if (field === "minRank") requirement.rank = Math.max(0, Math.min(5, Math.floor(Number(event.currentTarget.value) || 0)));
    else requirement.basis = event.currentTarget.value === "effective" ? "effective" : "base";
    await this.item.update({ "system.requirements": { all:leaves } }, { tmValidated:true });
  }

  async #addCost() {
    const costs = foundry.utils.deepClone(Array.isArray(this.item.system.costs) ? this.item.system.costs : []);
    costs.push({ context:"any", resource:"none", amount:0 });
    await this.item.update({ "system.costs":costs }, { tmValidated:true });
  }

  async #deleteCost(event) {
    const index = Number(event.currentTarget.dataset.index);
    if (!Number.isInteger(index)) return;
    const costs = foundry.utils.deepClone(Array.isArray(this.item.system.costs) ? this.item.system.costs : []);
    costs.splice(index,1);
    await this.item.update({ "system.costs":costs }, { tmValidated:true });
  }

  async #updateCost(event) {
    const index = Number(event.currentTarget.dataset.index);
    const field = event.currentTarget.dataset.field;
    if (!Number.isInteger(index) || !["context","resource","amount"].includes(field)) return;
    const costs = foundry.utils.deepClone(Array.isArray(this.item.system.costs) ? this.item.system.costs : []);
    if (!costs[index]) return;
    costs[index][field] = field === "amount" ? Math.max(0, Number(event.currentTarget.value) || 0) : event.currentTarget.value;
    await this.item.update({ "system.costs":costs }, { tmValidated:true });
  }
}
