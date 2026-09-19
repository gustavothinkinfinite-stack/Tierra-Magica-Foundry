import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = async (file) => JSON.parse(await readFile(resolve(root, file), "utf8"));

test("el manifiesto describe un sistema instalable", async () => {
  const manifest = await readJson("system.json");
  assert.equal(manifest.id, "tierra-magica");
  assert.equal(manifest.compatibility.verified, "14");
  assert.ok(manifest.esmodules.length > 0);
  assert.ok(manifest.styles.length > 0);

  const referencedFiles = [
    ...manifest.esmodules,
    ...manifest.styles,
    ...manifest.languages.map((language) => language.path)
  ];
  await Promise.all(referencedFiles.map((file) => access(resolve(root, file))));
});

test("las plantillas definen actores y objetos iniciales", async () => {
  const templates = await readJson("template.json");
  assert.deepEqual(templates.Actor.types, ["character", "npc"]);
  assert.deepEqual(templates.Item.types, ["weapon", "armor", "equipment", "spell", "talent"]);
  assert.equal(templates.Actor.templates.base.resources.health.max, 10);
});
