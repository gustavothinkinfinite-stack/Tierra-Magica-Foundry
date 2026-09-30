import { detectGrantCycles } from "./acquisition.mjs";
import { identityKey, stableSlug } from "./identity.mjs";
import { validateRuleElement } from "./rule-elements.mjs";

export function validateCatalog(catalog = [], { knownTypes = [], skillDefinitions = {} } = {}) {
  const issues = [];
  const seen = new Map();
  const known = new Set(knownTypes);

  for (const item of catalog) {
    const slug = stableSlug(item.system, item.name);
    const key = identityKey(item.type, slug);
    if (!key) issues.push({ code: "catalog-identity", item: item.name, message: "Entrada sin identidad estable." });
    if (known.size && !known.has(item.type)) issues.push({ code: "catalog-type", item: item.name, message: "Tipo desconocido: " + item.type + "." });
    if (seen.has(key)) issues.push({ code: "catalog-duplicate", item: item.name, message: "Identidad duplicada: " + key + "." });
    else if (key) seen.set(key, item);

    for (const rule of item.system?.rules ?? []) {
      const validation = validateRuleElement(rule, { skillDefinitions });
      if (!validation.valid) issues.push(...validation.issues.map((issue) => ({ ...issue, item: item.name })));
      if (rule?.key === "GrantItem") {
        const target = identityKey(rule.itemType, rule.slug);
        if (target && !catalog.some((entry) => identityKey(entry.type, stableSlug(entry.system, entry.name)) === target)) {
          issues.push({ code: "catalog-grant-target", item: item.name, message: "GrantItem apunta a contenido inexistente: " + target + "." });
        }
      }
    }

    if (item.type === "spell" && item.system?.discipline) {
      const target = identityKey("discipline", item.system.discipline);
      if (!catalog.some((entry) => identityKey(entry.type, stableSlug(entry.system, entry.name)) === target)) {
        issues.push({ code: "catalog-discipline", item: item.name, message: "Disciplina inexistente: " + item.system.discipline + "." });
      }
    }
  }

  for (const cycle of detectGrantCycles(catalog)) {
    issues.push({ code: "catalog-grant-cycle", message: "Ciclo GrantItem: " + cycle.join(" -> ") + "." });
  }

  return { valid: !issues.length, issues };
}
