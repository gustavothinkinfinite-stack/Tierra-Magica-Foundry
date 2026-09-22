import test from "node:test";
import assert from "node:assert/strict";
import { attackHits, resolveWeaponImpact } from "../scripts/rules/combat-impact.mjs";

const actor = (attributes = {}, derived = {}) => ({ system: { attributes, derived } });
const weapon = (system = {}) => ({ type: "weapon", system });

test("impacto aplica atributo, protección y penetración una sola vez", () => {
  const result = resolveWeaponImpact(
    weapon({ damage: 4, damageAttribute: "fue", penetration: 2 }),
    actor({ fue: { value: 3 } }),
    actor({}, { protection: 5, severeThreshold: 8 })
  );
  assert.equal(result.rawDamage, 7);
  assert.equal(result.effectiveProtection, 3);
  assert.equal(result.damage, 4);
  assert.equal(result.severe, false);
});

test("penetración excesiva nunca aumenta el daño por encima de Protección 0", () => {
  const result = resolveWeaponImpact(
    weapon({ damage: 5, damageAttribute: "fue", penetration: 99 }),
    actor({ fue: { value: 2 } }),
    actor({}, { protection: 3, severeThreshold: 7 })
  );
  assert.equal(result.effectiveProtection, 0);
  assert.equal(result.damage, 7);
  assert.equal(result.severe, true);
});

test("valores negativos no crean curación ni penetración beneficiosa", () => {
  const result = resolveWeaponImpact(
    weapon({ damage: -10, damageAttribute: "fue", penetration: -4 }),
    actor({ fue: { value: -3 } }),
    actor({}, { protection: 2, severeThreshold: 6 }),
    { damageBonus: -20, penetrationBonus: -3 }
  );
  assert.equal(result.rawDamage, 0);
  assert.equal(result.penetration, 0);
  assert.equal(result.damage, 0);
  assert.equal(result.severe, false);
});

test("el umbral grave se evalúa después de mitigación", () => {
  const result = resolveWeaponImpact(
    weapon({ damage: 10, penetration: 0 }),
    actor(),
    actor({}, { protection: 4, severeThreshold: 7 })
  );
  assert.equal(result.damage, 6);
  assert.equal(result.severe, false);
});

test("ataque impacta al igualar Defensa y rechaza totales inválidos", () => {
  assert.equal(attackHits(15, 15), true);
  assert.equal(attackHits(14, 15), false);
  assert.equal(attackHits(undefined, 15), false);
  assert.equal(attackHits(20, undefined), false);
});

test("rechaza resolver daño con documentos incompatibles", () => {
  assert.throws(() => resolveWeaponImpact({ type: "spell", system: {} }, actor(), actor()), TypeError);
  assert.throws(() => resolveWeaponImpact(weapon({ damage: 4 }), null, actor()), TypeError);
});
