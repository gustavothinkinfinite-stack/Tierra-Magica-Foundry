import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("la ficha no serializa dos veces los campos visualmente repetidos", async () => {
  const source = await readFile(resolve(root, "templates/actor/character-sheet.hbs"), "utf8");
  assert.equal(source.includes('name="system.details.level"'), false);
  assert.equal(source.includes('name="system.details.pdSpent"'), false);
  assert.equal(source.includes('name="system.skills.{{key}}.rank"'), false);
  assert.equal((source.match(/data-action="set-skill-rank"/g) ?? []).length, 2);
  assert.equal((source.match(/data-field="system.details.level"/g) ?? []).length, 2);
  assert.equal((source.match(/data-field="system.details.pdSpent"/g) ?? []).length, 2);
});

test("la ficha v0.2 carga recursos visuales e interacciones principales", async () => {
  const source = await readFile(resolve(root, "templates/actor/character-sheet.hbs"), "utf8");
  const manifest = JSON.parse(await readFile(resolve(root, "system.json"), "utf8"));
  assert.equal(source.includes("tm-character-sheet-v02"), true);
  assert.equal(source.includes('data-action="toggle-turn"'), true);
  assert.equal(source.includes('data-action="reset-turn"'), true);
  assert.equal(source.includes('data-action="open-familiar"'), true);
  assert.equal(manifest.styles.includes("styles/character-sheet-v02.css"), true);
  await Promise.all([
    "styles/character-sheet-v02.css",
    "assets/ui/character-sheet-arcane.svg"
  ].map((file) => access(resolve(root, file))));
});

test("el modelo base incluye la economía de turno", async () => {
  const templates = JSON.parse(await readFile(resolve(root, "template.json"), "utf8"));
  assert.deepEqual(templates.Actor.templates.base.turn, {
    movement: true,
    action: true,
    reaction: true
  });
});
