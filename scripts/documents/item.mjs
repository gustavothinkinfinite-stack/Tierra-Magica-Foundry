import { formatCurrency } from "../rules/currency.mjs";
import { normalizeSlug } from "../rules/identity.mjs";

const PHYSICAL_TYPES = new Set(["weapon", "armor", "shield", "equipment", "formula", "device"]);

function firstPdCost(costs = []) {
  const row = (Array.isArray(costs) ? costs : []).find((cost) => cost.resource === "pd");
  return Number(row?.amount ?? 0) || 0;
}

export class TierraMagicaItem extends Item {
  prepareDerivedData() {
    super.prepareDerivedData();

    this.system.slug = normalizeSlug(this.system.slug || this.name);
    this.system.identityKey = this.type + ":" + this.system.slug;

    if (PHYSICAL_TYPES.has(this.type)) {
      const status = this.system.priceStatus ?? "unset";
      this.system.priceDisplay = status === "exact"
        ? formatCurrency(this.system.priceCopper)
        : status === "variable" ? "Precio variable" : "Sin precio establecido";
    } else {
      this.system.priceDisplay = "";
    }

    // Compatibilidad visual temporal: no son fuentes autoritativas.
    if (["technique", "specialization", "formula", "ritual", "spell"].includes(this.type)) {
      this.system.pdCost = firstPdCost(this.system.costs);
    }
    if (this.type === "trait") {
      const creation = (this.system.costs ?? []).find((cost) => cost.context === "creation" && cost.resource === "pr");
      this.system.traitCost = Number(creation?.amount ?? 0) || 0;
    }
  }
}
