import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("Contramagia conserva resolución contextual y exige la Técnica, sin bloquear por Reacción gastada", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-reaction-guards.mjs"), "utf8");
  const entry = await readFile(resolve(root, "scripts/tierra-magica.mjs"), "utf8");
  assert.equal(entry.includes("installMagicReactionGuards(TierraMagicaActor)"), true);
  assert.equal(guards.includes('normalizeSlug(entry.system?.slug || entry.name) === "contramagia"'), true);
  assert.equal(guards.includes('this.system.turn?.reaction ?? true'), false);
  assert.equal(guards.includes('"system.turn.reaction": false'), false);
  assert.equal(guards.includes("no cancela automáticamente el hechizo"), true);
  assert.equal(guards.includes("no crea una DF universal"), true);
});

test("Contramagia no crea estados apilables ni restaura Reacción", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-reaction-guards.mjs"), "utf8");
  assert.equal(guards.includes("counterspellActive"), false);
  assert.equal(guards.includes('"system.turn.reaction": true'), false);
  assert.equal(guards.includes("rollCheck"), false);
});
