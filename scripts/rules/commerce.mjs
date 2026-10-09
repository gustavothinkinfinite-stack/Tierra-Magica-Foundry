// Reglas operativas de comercio: no modifica precios ni rarezas canónicas.
export const COMMERCE_TIERS = Object.freeze([
  { id: "village", level: 1, label: "Aldea / pueblo" },
  { id: "town", level: 2, label: "Villa / mercado regional" },
  { id: "city", level: 3, label: "Ciudad" },
  { id: "metropolis", level: 4, label: "Metrópolis / enclave excepcional" }
]);

export const COMMERCE_SPECIALTIES = Object.freeze([
  { id: "general", label: "Mercader general" },
  { id: "smith", label: "Herrero / armero" },
  { id: "alchemy", label: "Alquimista" },
  { id: "engineering", label: "Ingeniero" },
  { id: "arcane", label: "Comerciante arcano" }
]);

export const COMMERCE_ITEM_TYPES = Object.freeze(["weapon", "armor", "shield", "equipment", "device"]);

const allowedTier = new Map(COMMERCE_TIERS.map((tier) => [tier.id, tier.level]));
const allowedSpecialty = new Set(COMMERCE_SPECIALTIES.map((specialty) => specialty.id));

function nonnegative(value) {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : null;
}

function positive(value) {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

export function tierLevel(id) {
  return allowedTier.get(String(id ?? "")) ?? 1;
}

export function offerAvailabilityTier(item) {
  const availability = String(item?.system?.physical?.availability ?? item?.system?.availability ?? "common").toLowerCase();
  const base = {
    common: 1, ordinary: 1, uncommon: 2, specialized: 2,
    rare: 3, exceptional: 4, unique: 4, legendary: 4, restricted: 4
  }[availability] ?? 4; // Valores desconocidos no se comercializan como "comunes" silenciosamente.
  const magic = item?.system?.enchantment?.enabled === true ||
    (Array.isArray(item?.system?.runic?.imprints) && item.system.runic.imprints.length > 0);
  return Math.max(base, magic ? 3 : 1);
}

export function normalizeCommerce(raw = {}) {
  const mode = ["merchant", "chest"].includes(raw?.mode) ? raw.mode : "disabled";
  const specialty = allowedSpecialty.has(raw?.specialty) ? raw.specialty : "general";
  const tier = allowedTier.has(raw?.tier) ? raw.tier : "village";
  const offers = Array.isArray(raw?.offers) ? raw.offers : [];
  return {
    mode, specialty, tier,
    offers: offers.filter((row) => row && typeof row === "object" &&
      typeof row.id === "string" && row.id.length > 0 &&
      typeof row.uuid === "string" && row.uuid.length > 0
    ).slice(0, 250).map((row) => ({
      id: row.id,
      uuid: row.uuid,
      name: String(row.name ?? "Objeto"),
      img: String(row.img ?? "icons/svg/item-bag.svg"),
      type: String(row.type ?? ""),
      specialty: allowedSpecialty.has(row.specialty) ? row.specialty : specialty,
      stock: nonnegative(row.stock) ?? 0,
      minTier: [1, 2, 3, 4].includes(Number(row.minTier)) ? Number(row.minTier) : 4,
      priceCopper: nonnegative(row.priceCopper),
      priceQuantity: positive(row.priceQuantity) ?? 1,
      priceStatus: row.priceStatus === "exact" ? "exact" : "unset"
    }))
  };
}

export function createCommerceOffer(item, specialty = "general") {
  if (!item?.uuid || !COMMERCE_ITEM_TYPES.includes(item.type)) {
    throw new Error("Sólo se admiten objetos físicos de Tierra Mágica con UUID persistente.");
  }
  const price = item.system?.physical ?? item.system ?? {};
  const id = globalThis.foundry?.utils?.randomID?.() ??
    ("offer-" + Math.random().toString(36).slice(2));
  return {
    id, uuid: item.uuid, name: item.name, img: item.img,
    type: item.type,
    specialty: allowedSpecialty.has(specialty) ? specialty : "general",
    stock: 1, minTier: offerAvailabilityTier(item),
    priceCopper: price.priceStatus === "exact" ? nonnegative(price.priceCopper) : null, // precio fijado al agregar la oferta
    priceQuantity: positive(price.priceQuantity) ?? 1,
    priceStatus: price.priceStatus === "exact" ? "exact" : "unset"
  };
}

export function quoteCommerce(config, offer, item, quantity = 1) {
  if (!["merchant", "chest"].includes(config?.mode)) return { ok: false, error: "El establecimiento está cerrado." };
  if (!offer || !item || !COMMERCE_ITEM_TYPES.includes(item.type) ||
      offer.uuid !== item.uuid || offer.type !== item.type) {
    return { ok: false, error: "La referencia del objeto no es válida." };
  }
  const count = positive(quantity);
  if (count === null || count > 1000) return { ok: false, error: "Cantidad inválida." };
  if (count > offer.stock) return { ok: false, error: "No hay existencias suficientes." };
  if (tierLevel(config.tier) < offer.minTier && config.mode === "merchant") {
    return { ok: false, error: "Objeto no autorizado para el nivel comercial del establecimiento." };
  }
  if (config.mode === "merchant" && offer.specialty !== config.specialty) {
    return { ok: false, error: "El objeto no pertenece a la especialidad de este comerciante." };
  }
  if (config.mode === "chest") return { ok: true, quantity: count, cost: 0 };
  const source = item.system?.physical ?? item.system ?? {};
  const price = offer.priceCopper === null
    ? (source.priceStatus === "exact" ? nonnegative(source.priceCopper) : null)
    : nonnegative(offer.priceCopper);
  const baseQuantity = offer.priceCopper === null
    ? positive(source.priceQuantity)
    : positive(offer.priceQuantity);
  if (price === null || baseQuantity === null) {
    return { ok: false, error: "Este objeto carece de un precio exacto autorizado." };
  }
  const total = Math.ceil(price * count / baseQuantity);
  if (!Number.isSafeInteger(total)) return { ok: false, error: "Precio fuera de rango." };
  return { ok: true, quantity: count, cost: total };
}
