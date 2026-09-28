export const CURRENCY_MIGRATION_VERSION = 1;
export const INITIAL_RESERVE_COPPER = 200;
export const CREATION_PEI_COPPER = 2000;

const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object ?? {}, key);

export function isValidCopper(value) {
  const number = Number(value);
  return Number.isSafeInteger(number) && number >= 0;
}

export function normalizeCopper(value, fallback = 0) {
  return isValidCopper(value) ? Number(value) : fallback;
}

export function splitCurrency(totalCopper) {
  const total = normalizeCopper(totalCopper);
  return {
    totalCopper: total,
    gold: Math.floor(total / 100),
    silver: Math.floor((total % 100) / 10),
    copper: total % 10
  };
}

export function combineCurrency({ gold = 0, silver = 0, copper = 0 } = {}) {
  const values = [gold, silver, copper].map(Number);
  if (values.some((value) => !Number.isSafeInteger(value) || value < 0)) return null;
  const total = values[0] * 100 + values[1] * 10 + values[2];
  return Number.isSafeInteger(total) ? total : null;
}

export function formatCurrency(totalCopper) {
  const { gold, silver, copper } = splitCurrency(totalCopper);
  const parts = [];
  if (gold) parts.push(gold + " o");
  if (silver) parts.push(silver + " p");
  if (copper || !parts.length) parts.push(copper + " c");
  return parts.join(" ");
}

export function saleValueCopper({ priceCopper, priceQuantity = 1, quantity = 1, rate = 1 } = {}) {
  const price = normalizeCopper(priceCopper, Number.NaN);
  const baseQuantity = Number(priceQuantity);
  const soldQuantity = Number(quantity);
  const multiplier = Number(rate);
  if (!Number.isSafeInteger(price) || price < 0) return null;
  if (!Number.isSafeInteger(baseQuantity) || baseQuantity <= 0) return null;
  if (!Number.isSafeInteger(soldQuantity) || soldQuantity < 0) return null;
  if (!Number.isFinite(multiplier) || multiplier < 0) return null;
  return Math.floor((price * soldQuantity * multiplier) / baseQuantity);
}

export const CANONICAL_ITEM_PRICES = Object.freeze({
  "Cuchillo": { priceCopper: 30, priceQuantity: 1 },
  "Daga": { priceCopper: 60, priceQuantity: 1 },
  "Espada corta": { priceCopper: 100, priceQuantity: 1 },
  "Espada larga": { priceCopper: 200, priceQuantity: 1 },
  "Sable": { priceCopper: 150, priceQuantity: 1 },
  "Hacha": { priceCopper: 250, priceQuantity: 1 },
  "Maza": { priceCopper: 100, priceQuantity: 1 },
  "Martillo de guerra": { priceCopper: 300, priceQuantity: 1 },
  "Lanza": { priceCopper: 50, priceQuantity: 1 },
  "Alabarda": { priceCopper: 300, priceQuantity: 1 },
  "Espadón": { priceCopper: 400, priceQuantity: 1 },
  "Mandoble": { priceCopper: 400, priceQuantity: 1 },
  "Gran hacha": { priceCopper: 500, priceQuantity: 1 },
  "Gran martillo": { priceCopper: 500, priceQuantity: 1 },
  "Cuchillo arrojadizo": { priceCopper: 40, priceQuantity: 1 },
  "Arco corto": { priceCopper: 100, priceQuantity: 1 },
  "Arco largo": { priceCopper: 200, priceQuantity: 1 },
  "Ballesta": { priceCopper: 300, priceQuantity: 1 },
  "Ballesta pesada": { priceCopper: 500, priceQuantity: 1 },
  "Pistola temprana": { priceCopper: 1000, priceQuantity: 1 },
  "Rifle temprano": { priceCopper: 1800, priceQuantity: 1 },
  "Pistola repetidora": { priceCopper: 3500, priceQuantity: 1 },
  "Rifle repetidor": { priceCopper: 4500, priceQuantity: 1 },
  "Armadura ligera": { priceCopper: 150, priceQuantity: 1 },
  "Armadura reforzada": { priceCopper: 400, priceQuantity: 1 },
  "Malla": { priceCopper: 1000, priceQuantity: 1 },
  "Armadura pesada": { priceCopper: 1600, priceQuantity: 1 },
  "Placa": { priceCopper: 4000, priceQuantity: 1 },
  "Placas": { priceCopper: 4000, priceQuantity: 1 },
  "Broquel": { priceCopper: 50, priceQuantity: 1 },
  "Escudo estándar": { priceCopper: 150, priceQuantity: 1 },
  "Escudo pesado": { priceCopper: 300, priceQuantity: 1 },
  "Flechas": { priceCopper: 20, priceQuantity: 20 },
  "Virotes": { priceCopper: 30, priceQuantity: 20 },
  "Munición de arma de fuego": { priceCopper: 50, priceQuantity: 12 },
  "Kit de Artesano": { priceCopper: 100, priceQuantity: 1 },
  "Kit de Ingeniería de campo": { priceCopper: 200, priceQuantity: 1 },
  "Kit de Minería": { priceCopper: 100, priceQuantity: 1 },
  "Kit Médico": { priceCopper: 200, priceQuantity: 1 },
  "Kit de Alquimia de campo": { priceCopper: 200, priceQuantity: 1 },
  "Kit de Infiltración": { priceCopper: 100, priceQuantity: 1 },
  "Kit Cartográfico": { priceCopper: 100, priceQuantity: 1 },
  "Kit de Navegación": { priceCopper: 200, priceQuantity: 1 },
  "Kit de Campaña": { priceCopper: 100, priceQuantity: 1 },
  "Kit de Escalada": { priceCopper: 100, priceQuantity: 1 },
  "Kit de Escribanía": { priceCopper: 50, priceQuantity: 1 },
  "Kit Mercantil": { priceCopper: 100, priceQuantity: 1 },
  "Kit Académico": { priceCopper: 200, priceQuantity: 1 },
  "Instrumental Arcano de campo": { priceCopper: 200, priceQuantity: 1 },
  "Kit de mantenimiento de armas de fuego": { priceCopper: 100, priceQuantity: 1 },
  "Gancho de escalada": { priceCopper: 30, priceQuantity: 1 },
  "Palanca": { priceCopper: 20, priceQuantity: 1 },
  "Pico": { priceCopper: 20, priceQuantity: 1 },
  "Pala": { priceCopper: 20, priceQuantity: 1 },
  "Caja pequeña asegurada": { priceCopper: 50, priceQuantity: 1 },
  "Catalejo": { priceCopper: 100, priceQuantity: 1 },
  "Estuche impermeable de documentos/mapas": { priceCopper: 50, priceQuantity: 1 },
  "Provisiones de viaje — 7 días": { priceCopper: 20, priceQuantity: 1 },
  "Combustible de iluminación — 5 noches": { priceCopper: 20, priceQuantity: 1 },
  "Repuesto de Kit Médico": { priceCopper: 50, priceQuantity: 5 },
  "Repuesto de materiales de escritura": { priceCopper: 20, priceQuantity: 1 }
});

function legacyNumber(value) {
  if (value === null || value === undefined || value === "") return { present: false, valid: true, value: 0 };
  const number = Number(value);
  return {
    present: true,
    valid: Number.isSafeInteger(number) && number >= 0,
    value: number
  };
}

export function planActorCurrencyMigration(currency = {}) {
  const total = legacyNumber(currency.totalCopper);
  const crowns = legacyNumber(currency.crowns);
  const gold = legacyNumber(currency.gold);
  const silver = legacyNumber(currency.silver);
  const copper = legacyNumber(currency.copper);
  const legacy = {};
  if (crowns.present) legacy.crowns = currency.crowns;
  if (gold.present) legacy.gold = currency.gold;
  if (silver.present) legacy.silver = currency.silver;
  if (copper.present) legacy.copper = currency.copper;

  if (total.present && total.valid) {
    return { totalCopper: total.value, pending: false, preserveLegacy: legacy, reason: "canonical" };
  }

  if (![crowns, gold, silver, copper].every((entry) => entry.valid)) {
    return { totalCopper: 0, pending: true, preserveLegacy: legacy, reason: "invalid-legacy" };
  }

  if (crowns.present && crowns.value > 0) {
    const hasOther = (gold.present && gold.value > 0) || (silver.present && silver.value > 0) || (copper.present && copper.value > 0);
    return { totalCopper: 0, pending: true, preserveLegacy: legacy, reason: hasOther ? "ambiguous-crowns" : "crowns" };
  }

  if (gold.present || silver.present || copper.present) {
    const combined = combineCurrency({ gold: gold.value, silver: silver.value, copper: copper.value });
    return { totalCopper: combined ?? 0, pending: combined === null, preserveLegacy: legacy, reason: combined === null ? "invalid-legacy" : "legacy-denominations" };
  }

  return { totalCopper: 0, pending: false, preserveLegacy: legacy, reason: "empty" };
}

export function canonicalItemPrice(name) {
  return CANONICAL_ITEM_PRICES[name] ?? null;
}

export function planItemPriceMigration(itemLike = {}) {
  const system = itemLike.system ?? {};
  if (isValidCopper(system.priceCopper) && ["exact", "variable", "unset"].includes(system.priceStatus)) {
    return null;
  }
  const canonical = canonicalItemPrice(itemLike.name);
  const legacyPrice = hasOwn(system, "price") ? system.price : null;
  if (canonical) {
    return {
      priceCopper: canonical.priceCopper,
      priceQuantity: canonical.priceQuantity,
      priceStatus: "exact",
      legacyPrice
    };
  }
  return { priceCopper: 0, priceQuantity: 1, priceStatus: "unset", legacyPrice };
}

export function installCurrencyRules(ActorClass) {
  ActorClass.prototype.getCurrencyTotal = function () {
    return normalizeCopper(this.system.currency?.totalCopper);
  };

  ActorClass.prototype.setCurrencyTotal = async function (value) {
    const number = Number(value);
    if (!Number.isSafeInteger(number) || number < 0) {
      return ui.notifications.warn("La moneda debe ser un número entero de cobres igual o mayor que 0.");
    }
    await this.update({ "system.currency.totalCopper": number });
    return number;
  };

  ActorClass.prototype.setCurrencyBreakdown = async function (parts) {
    const total = combineCurrency(parts);
    if (total === null) return ui.notifications.warn("Oro, plata y cobre deben ser enteros no negativos.");
    return this.setCurrencyTotal(total);
  };

  ActorClass.prototype.adjustCurrency = async function (delta) {
    const amount = Number(delta);
    if (!Number.isSafeInteger(amount)) return ui.notifications.warn("La operación monetaria debe expresarse en cobres enteros.");
    const previous = this.getCurrencyTotal();
    const next = previous + amount;
    if (!Number.isSafeInteger(next) || next < 0) return ui.notifications.warn("Fondos insuficientes o cantidad monetaria inválida.");
    await this.update({ "system.currency.totalCopper": next });
    return { previous, delta: amount, next };
  };

  ActorClass.prototype.grantInitialReserve = async function () {
    if (this.type !== "character") return ui.notifications.warn("La Reserva inicial sólo corresponde a personajes.");
    if (this._tmGrantingInitialReserve) return null;
    this._tmGrantingInitialReserve = true;
    try {
      if (this.system.currency?.initialReserveGranted) return ui.notifications.info("La Reserva inicial ya fue concedida.");
      const previous = this.getCurrencyTotal();
      const next = previous + INITIAL_RESERVE_COPPER;
      await this.update({
        "system.currency.totalCopper": next,
        "system.currency.initialReserveGranted": true
      });
      return { previous, delta: INITIAL_RESERVE_COPPER, next };
    } finally {
      this._tmGrantingInitialReserve = false;
    }
  };

  ActorClass.prototype.spendCreationPei = async function (amount) {
    if (this.type !== "character" || this.system.creation?.equipmentBudgetActive !== true) {
      return ui.notifications.warn("El PEI no está activo para este personaje.");
    }
    const cost = Number(amount);
    if (!Number.isSafeInteger(cost) || cost < 0) return ui.notifications.warn("El coste de PEI debe expresarse en cobres enteros.");
    const current = normalizeCopper(this.system.creation?.equipmentBudgetCopper, CREATION_PEI_COPPER);
    if (cost > current) return ui.notifications.warn("PEI insuficiente.");
    await this.update({ "system.creation.equipmentBudgetCopper": current - cost });
    return current - cost;
  };

  ActorClass.prototype.closeCreationEquipment = async function () {
    if (this.type !== "character") return ui.notifications.warn("Sólo los personajes usan el cierre estándar de creación.");
    if (this.system.creation?.equipmentBudgetActive !== true) return ui.notifications.info("El PEI ya está cerrado.");
    await this.update({
      "system.creation.equipmentBudgetCopper": 0,
      "system.creation.equipmentBudgetActive": false
    });
    return this.grantInitialReserve();
  };

  ActorClass.prototype.resolveLegacyCrowns = async function ({ copperPerCrown } = {}) {
    const crowns = Number(this.system.currency?.legacy?.crowns);
    const factor = Number(copperPerCrown);
    if (!Number.isSafeInteger(crowns) || crowns <= 0) return ui.notifications.warn("No existe un valor legado de crowns pendiente.");
    if (!Number.isSafeInteger(factor) || factor <= 0) return ui.notifications.warn("La equivalencia debe ser un número entero positivo de cobres por crown.");
    if (this.getCurrencyTotal() > 0) return ui.notifications.warn("El Actor ya posee saldo canónico. No se sumará crowns automáticamente.");
    const total = crowns * factor;
    if (!Number.isSafeInteger(total)) return ui.notifications.warn("La conversión excede el rango numérico seguro.");
    await this.update({
      "system.currency.totalCopper": total,
      "system.currency.migrationPending": false,
      "system.currency.legacyResolution": "converted",
      "system.currency.legacyCopperPerCrown": factor
    });
    return total;
  };

  ActorClass.prototype.archiveLegacyCrowns = async function () {
    if (!this.system.currency?.migrationPending) return;
    await this.update({
      "system.currency.migrationPending": false,
      "system.currency.legacyResolution": "archived"
    });
  };
}

function actorMigrationUpdates(actor) {
  const sourceCurrency = actor?._source?.system?.currency ?? {};
  if (Number(sourceCurrency.migrationVersion) >= CURRENCY_MIGRATION_VERSION && isValidCopper(sourceCurrency.totalCopper)) return null;
  const plan = planActorCurrencyMigration(sourceCurrency);
  const updates = {
    "system.currency.totalCopper": plan.totalCopper,
    "system.currency.migrationVersion": CURRENCY_MIGRATION_VERSION,
    "system.currency.migrationPending": plan.pending,
    "system.currency.legacy": plan.preserveLegacy,
    "system.currency.initialReserveGranted": Boolean(sourceCurrency.initialReserveGranted)
  };
  for (const field of ["crowns", "gold", "silver", "copper"]) {
    if (hasOwn(sourceCurrency, field)) updates["system.currency.-=" + field] = null;
  }
  return updates;
}

function itemMigrationUpdates(item) {
  const source = item?._source?.system ?? item?.system ?? {};
  if (isValidCopper(source.priceCopper) && ["exact", "variable", "unset"].includes(source.priceStatus)) return null;
  const plan = planItemPriceMigration({ name: item.name, system: source });
  const updates = {
    "system.priceCopper": plan.priceCopper,
    "system.priceQuantity": plan.priceQuantity,
    "system.priceStatus": plan.priceStatus,
    "system.legacyPrice": plan.legacyPrice
  };
  if (hasOwn(source, "price")) updates["system.-=price"] = null;
  return updates;
}

export async function migrateWorldCurrency() {
  if (!globalThis.game?.user?.isGM) return { actors: 0, items: 0, pending: 0 };
  let actors = 0;
  let items = 0;
  let pending = 0;

  for (const actor of game.actors ?? []) {
    const updates = actorMigrationUpdates(actor);
    if (updates) {
      await actor.update(updates);
      actors += 1;
      if (updates["system.currency.migrationPending"]) pending += 1;
    }
    for (const item of actor.items ?? []) {
      const itemUpdates = itemMigrationUpdates(item);
      if (!itemUpdates) continue;
      await item.update(itemUpdates);
      items += 1;
    }
  }

  for (const item of game.items ?? []) {
    const updates = itemMigrationUpdates(item);
    if (!updates) continue;
    await item.update(updates);
    items += 1;
  }

  return { actors, items, pending };
}
