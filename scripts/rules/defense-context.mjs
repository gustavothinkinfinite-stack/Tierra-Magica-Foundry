import { resolveDerivedSelector } from "./derived-state.mjs";

const DEFENSE_SELECTORS = Object.freeze({
  normal: "defense",
  maneuver: "maneuverDefense",
  mental: "mentalDefense",
  body: "bodyDefense"
});

export function resolveActorDefense(actor, {
  kind = "normal",
  frontal = false,
  parryable = false,
  kineticBarrier = true
} = {}) {
  const selector = DEFENSE_SELECTORS[kind] ?? "defense";
  return resolveDerivedSelector(actor?.system?.derived ?? {}, selector, {
    frontal: frontal === true,
    parryable: parryable === true,
    kineticBarrier: kineticBarrier === true
  });
}

export function resolveActorProtection(actor, {
  alteredSkinCompatible = false
} = {}) {
  return resolveDerivedSelector(actor?.system?.derived ?? {}, "protection", {
    alteredSkinCompatible: alteredSkinCompatible === true
  });
}
