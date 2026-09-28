import { formatCurrency } from "../rules/currency.mjs";

export class TierraMagicaItem extends Item {
  prepareDerivedData() {
    super.prepareDerivedData();
    const status = this.system.priceStatus ?? "unset";
    this.system.priceDisplay = status === "exact"
      ? formatCurrency(this.system.priceCopper)
      : status === "variable" ? "Precio variable" : "Sin precio establecido";
  }
}
