export const UNIQUE_ITEM_TYPES = new Set([
  "ancestry", "origin", "background", "discipline", "specialization", "technique", "trait", "spell"
]);

export function normalizeSlug(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function identityKey(type, slug) {
  const normalizedType = String(type ?? "").trim();
  const normalizedSlug = normalizeSlug(slug);
  return normalizedType && normalizedSlug ? normalizedType + ":" + normalizedSlug : "";
}

export function contentIdentityKey(item = {}) {
  const type = String(item.type ?? "").trim();
  const slug = stableSlug(item.system ?? {}, item.name);
  if (type === "specialization") {
    const skill = String(item.system?.skill ?? "").trim();
    return type && skill && slug ? type + ":" + skill + ":" + slug : identityKey(type, slug);
  }
  return identityKey(type, slug);
}

export function stableSlug(system = {}, name = "") {
  return normalizeSlug(system.slug) || normalizeSlug(name);
}

export function isUniqueMechanicalType(type) {
  return UNIQUE_ITEM_TYPES.has(String(type ?? ""));
}

export function duplicateIdentity(items = [], candidate = {}, { ignoreId = null } = {}) {
  const key = contentIdentityKey(candidate);
  if (!key || !isUniqueMechanicalType(candidate.type)) return null;
  return items.find((item) => {
    if (ignoreId && item.id === ignoreId) return false;
    return contentIdentityKey(item) === key;
  }) ?? null;
}

export function validateIdentity(item = {}) {
  const issues = [];
  const type = String(item.type ?? "").trim();
  const slug = stableSlug(item.system ?? {}, item.name);
  if (!type) issues.push({ code: "identity-type", message: "Falta el tipo de Item." });
  if (!slug) issues.push({ code: "identity-slug", message: "Falta un slug mecánico estable." });
  return { valid: !issues.length, type, slug, key: contentIdentityKey(item), issues };
}
