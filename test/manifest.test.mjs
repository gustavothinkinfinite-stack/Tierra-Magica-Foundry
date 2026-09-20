import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = async (file) => JSON.parse(await readFile(resolve(root, file), "utf8"));

test("el manifiesto describe Foundry T.M. 0.8.0", async () => {
  const manifest = await readJson("system.json");
  assert.equal(manifest.id, "tierra-magica");
  assert.equal(manifest.version, "0.8.0");
  assert.equal(manifest.compatibility.verified, "14");
  assert.equal(manifest.initiative.startsWith("2d10"), true);
  await Promise.all([...manifest.esmodules, ...manifest.styles, ...manifest.languages.map((l) => l.path)]
    .map((file) => access(resolve(root, file))));
});

test("el esquema contiene actores y tipos de objeto del manual", async () => {
  const templates = await readJson("template.json");
  assert.deepEqual(templates.Actor.types, ["character", "npc", "familiar"]);
  assert.deepEqual(templates.Item.types, ["weapon", "armor", "shield", "equipment", "spell", "technique", "trait", "specialization"]);
  assert.equal(Object.keys(templates.Actor.templates.base.attributes).length, 7);
  assert.equal(Object.keys(templates.Actor.templates.base.skills).length, 26);
  assert.deepEqual(templates.Item.templates.base.skillModifiers, []);
  assert.equal(templates.Item.templates.base.skillModifiersActive, true);
  assert.equal(templates.Item.spell.skillModifiersActive, false);
  await Promise.all(templates.Actor.types.map((type) => access(resolve(root, "templates/actor/" + type + "-sheet.hbs"))));
});
