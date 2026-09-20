import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
