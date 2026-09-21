import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("Sobrecarga lee el total real del Roll contenido en ChatMessage", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  const entry = await readFile(resolve(root, "scripts/tierra-magica.mjs"), "utf8");
  assert.equal(entry.includes("installMagicGuards(TierraMagicaActor)"), true);
  assert.equal(guards.includes("message?.rolls?.[0]?.total"), true);
  assert.equal(guards.includes("message.total = total"), true);
});

test("un hechizo sostenido fallido no permanece activo", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes("if (!success)"), true);
  assert.equal(guards.includes("after.filter((id) => id !== item.id)"), true);
  assert.equal(guards.includes("El Maná ya pagado no se devuelve"), true);
});

test("superar Sostenimiento abandona un efecto previo en vez de invalidar el lanzamiento", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes("const limit = hasDouble ? 2 : 1"), true);
  assert.equal(guards.includes("validBefore.slice"), true);
  assert.equal(guards.includes("[...retained, item.id]"), true);
  assert.equal(guards.includes("se abandona el efecto sostenido más antiguo"), true);
});
