import assert from "node:assert/strict";
import test from "node:test";
import { TM_CONFIG } from "../scripts/config.mjs";
import { STARTER_CONTENT } from "../scripts/content.mjs";

test("incluye las diez razas con valores del libro", () => {
  assert.equal(Object.keys(TM_CONFIG.ancestries).length, 10);
  assert.deepEqual(
    { health: TM_CONFIG.ancestries.orc.health, mana: TM_CONFIG.ancestries.orc.mana, perkEvery: TM_CONFIG.ancestries.orc.perkEvery },
    { health: 7, mana: 5, perkEvery: 3 }
  );
  assert.equal(TM_CONFIG.ancestries.minotaur.health, 10);
  assert.equal(TM_CONFIG.ancestries.cursed.mana, 12);
});

test("incluye profesiones y clases de familiar", () => {
  assert.equal(TM_CONFIG.classes.combatant.hitDie, "1d8");
  assert.equal(TM_CONFIG.classes.mystic.hitDie, "1d4");
  assert.equal(TM_CONFIG.classes.technician.hitDie, "1d6");
  assert.equal(Object.keys(TM_CONFIG.familiarClasses).length, 8);
});

test("la biblioteca inicial contiene material jugable", () => {
  assert.ok(STARTER_CONTENT.spell.length >= 15);
  assert.ok(STARTER_CONTENT.talent.length >= 15);
  assert.ok(STARTER_CONTENT.familiarBenefit.length >= 10);
});
