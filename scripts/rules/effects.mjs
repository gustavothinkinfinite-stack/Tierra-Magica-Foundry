import { normalizeSlug } from "./identity.mjs";

export function effectStackingKey({ slug, sourceActorUuid = "", sourceItemUuid = "" } = {}) {
  return [normalizeSlug(slug), String(sourceActorUuid), String(sourceItemUuid)].join("|");
}

export function effectSourceData({
  name,
  slug,
  sourceActorUuid = "",
  sourceItemUuid = "",
  rules = [],
  duration = "",
  expiry = "manual",
  active = true
} = {}) {
  return {
    name: String(name ?? "Efecto"),
    type: "effect",
    system: {
      slug: normalizeSlug(slug || name),
      sourceActorUuid: String(sourceActorUuid),
      sourceItemUuid: String(sourceItemUuid),
      stackingKey: effectStackingKey({ slug: slug || name, sourceActorUuid, sourceItemUuid }),
      duration,
      expiry,
      active: Boolean(active),
      rules: Array.isArray(rules) ? rules : []
    }
  };
}
