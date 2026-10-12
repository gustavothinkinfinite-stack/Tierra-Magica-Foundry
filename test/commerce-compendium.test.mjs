import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { COMMERCE_ACTOR_PRESETS, commerceActorCatalog } from "../scripts/catalog/commerce-actors.mjs";
import { normalizeCommerce, tierLevel } from "../scripts/rules/commerce.mjs";

test("compendio entrega 5 comerciantes y 1 cofre, cada uno con identificación estable", () => {
  const entries = commerceActorCatalog();
  assert.equal(entries.length, 6);
  assert.equal(entries.filter((entry) => entry.flags["tierra-magica"].commerce.mode === "merchant").length, 5);
  assert.equal(entries.filter((entry) => entry.flags["tierra-magica"].commerce.mode === "chest").length, 1);
  assert.equal(new Set(COMMERCE_ACTOR_PRESETS.map((entry) => entry.slug)).size, entries.length);
});

test("cada Actor es un PNJ vinculado y neutral, visible por jugadores y sin inventario inventado", () => {
  for (const entry of commerceActorCatalog()) {
    assert.equal(entry.type, "npc");
    assert.equal(entry.prototypeToken.actorLink, true, entry.name);
    assert.equal(entry.prototypeToken.disposition, 0, entry.name);
    assert.equal(entry.ownership.default, 2, entry.name);
    const flags = entry.flags["tierra-magica"];
    assert.equal(flags.commercePresetId.length > 0, true);
    assert.deepEqual(flags.commerce.offers, []);
    assert.equal(normalizeCommerce(flags.commerce).mode, flags.commerce.mode);
  }
});

test("el herrero rural y el comerciante arcano metropolitano no comparten nivel de acceso", () => {
  const entries = commerceActorCatalog();
  const smith = entries.find((entry) => entry.flags["tierra-magica"].commercePresetId === "herrero-pueblo");
  const arcane = entries.find((entry) => entry.flags["tierra-magica"].commercePresetId === "comerciante-arcano");
  assert.equal(tierLevel(smith.flags["tierra-magica"].commerce.tier), 1);
  assert.equal(tierLevel(arcane.flags["tierra-magica"].commerce.tier), 4);
});

test("manifest declara exactamente un compendio de Comerciantes y Cofres de tipo Actor", async () => {
  const manifest = JSON.parse(await readFile(new URL("../system.json", import.meta.url), "utf8"));
  const packs = manifest.packs.filter((row) => row.name === "commerce");
  assert.equal(packs.length, 1);
  assert.equal(packs[0].type, "Actor");
  assert.equal(packs[0].path, "packs/commerce");
  assert.equal(manifest.styles.includes("styles/commerce.css"), true);
});
