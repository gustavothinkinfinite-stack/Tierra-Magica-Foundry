import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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

test("la ficha usa una ruta atómica y no ofrece un segundo botón explotable de daño", async () => {
  const actorSource = await readFile(new URL("../scripts/documents/actor.mjs", import.meta.url), "utf8");
  const sheetSource = await readFile(new URL("../templates/actor/parts/item-section.hbs", import.meta.url), "utf8");
  assert.equal(actorSource.includes("uniqueTargets.length !== 1"), true);
  assert.equal(actorSource.includes("attackHits(total, targetDf)"), true);
  assert.equal(actorSource.includes('target.adjustResource("health", -impact.damage)'), true);
  assert.equal(actorSource.includes("El daño físico se resuelve únicamente como parte del ataque"), true);
  assert.equal(sheetSource.includes('data-action="item-damage"'), false);
});

test("técnicas ofensivas no duplican modificadores ni eluden restricciones", async () => {
  const actorSource = await readFile(new URL("../scripts/documents/actor.mjs", import.meta.url), "utf8");
  assert.equal(actorSource.includes('name === "Golpe Potente"'), true);
  assert.equal(actorSource.includes('{ modifier: -2, damageBonus: 2, technique: name }'), true);
  assert.equal(actorSource.includes('name === "Estocada Perforante"'), true);
  assert.equal(actorSource.includes('{ modifier: -1, damageBonus: -1, penetrationBonus: 2, technique: name }'), true);
  assert.equal(actorSource.includes("Barrido requiere uno o dos objetivos válidos."), true);
  assert.equal(actorSource.includes("const roll = await this.rollCheck({\n      label: \"Barrido"), true);
  assert.equal(actorSource.includes("Combate Dual requiere dos armas distintas."), true);
  assert.equal(actorSource.includes("/Ligera/i.test"), true);
  assert.equal(actorSource.includes("for (const [index, weapon] of [primary, secondary].entries())"), true);
});

test("la ficha expone Técnicas ofensivas y selecciona la segunda arma sin duplicar lógica", async () => {
  const sheetLogic = await readFile(new URL("../scripts/sheets/actor-sheet.mjs", import.meta.url), "utf8");
  const sheetTemplate = await readFile(new URL("../templates/actor/parts/item-section.hbs", import.meta.url), "utf8");
  assert.equal(sheetTemplate.includes('data-action="item-combat-technique"'), true);
  for (const name of ["Golpe Potente", "Estocada Perforante", "Barrido", "Combate Dual"]) assert.equal(sheetLogic.includes(name), true);
  assert.equal(sheetLogic.includes('item.id !== weapon.id && item.system.equipped'), true);
  assert.equal(sheetLogic.includes('/Ligera/i.test'), true);
  assert.equal(sheetLogic.includes('this.actor.dualWieldAttack(weapon, this.actor.items.get(secondaryId))'), true);
  assert.equal(sheetLogic.includes('this.actor.sweepAttack(weapon)'), true);
  assert.equal(sheetLogic.includes('this.actor.useCombatTechnique("Golpe Potente", weapon)'), true);
});

test("Guardia Parada y Contraataque respetan Acción/Reacción y no encadenan", async () => {
  const actorSource = await readFile(new URL("../scripts/documents/actor.mjs", import.meta.url), "utf8");
  const sheetSource = await readFile(new URL("../scripts/sheets/actor-sheet.mjs", import.meta.url), "utf8");
  const template = await readFile(new URL("../templates/actor/character-sheet.hbs", import.meta.url), "utf8");
  assert.equal(actorSource.includes('async guard()'), true);
  assert.equal(actorSource.includes('"system.turn.action": false, "system.combat.guardActive": true'), true);
  assert.equal(actorSource.includes('async parry()'), true);
  assert.equal(actorSource.includes('"system.turn.reaction": false, "system.combat.parryActive": true'), true);
  assert.equal(actorSource.includes('async counterattack(item)'), true);
  assert.equal(actorSource.includes('if (!this.system.combat?.parryActive)'), true);
  assert.equal(actorSource.includes('if (this.system.combat?.counterattackUsed)'), true);
  assert.equal(actorSource.includes('"system.combat.parryActive": false, "system.combat.counterattackUsed": true'), true);
  assert.equal(sheetSource.includes('"system.combat.guardActive": false'), true);
  assert.equal(sheetSource.includes('"system.combat.parryActive": false'), true);
  assert.equal(sheetSource.includes('"system.combat.counterattackUsed": false'), true);
  for (const action of ["combat-guard", "combat-parry", "combat-counterattack"]) assert.equal(template.includes('data-action="' + action + '"'), true);
});

test("Guardia modifica Defensa y Parada sólo habilita Contraataque cuando cambia el resultado", async () => {
  const actorSource = await readFile(new URL("../scripts/documents/actor.mjs", import.meta.url), "utf8");
  assert.equal(actorSource.includes('const guardDefense = s.combat?.guardActive ? 2 : 0'), true);
  assert.equal(actorSource.includes('defense: 11 + agi + martialDefense + shield + extraDefense + guardDefense'), true);
  assert.equal(actorSource.includes('const targetDf = baseDefense + (parryActive ? 2 : 0)'), true);
  assert.equal(actorSource.includes('const parrySucceeded = parryActive && attackHits(total, baseDefense) && !hit'), true);
  assert.equal(actorSource.includes('"system.combat.parryActive": false'), true);
  assert.equal(actorSource.includes('"system.combat.parrySucceeded": parrySucceeded'), true);
  assert.equal(actorSource.includes('if (!this.system.combat?.parrySucceeded)'), true);
});
