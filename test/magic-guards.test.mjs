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

test("magia contextual no inventa tirada sin incertidumbre y oposición sí la exige", async () => {
  const { spellNeedsCheck } = await import("../scripts/rules/magic-guards.mjs");
  assert.equal(spellNeedsCheck({system:{checkMode:"contextual",defense:"df"}}), false);
  assert.equal(spellNeedsCheck({system:{checkMode:"automatic",defense:"mental"}}), true);
  assert.equal(spellNeedsCheck({system:{checkMode:"required",defense:"df"}}), true);
  assert.equal(spellNeedsCheck({system:{checkMode:"contextual",defense:"mental"}}), true);
  assert.equal(spellNeedsCheck({system:{checkMode:"contextual",defense:"body"}}), true);
  assert.equal(spellNeedsCheck({system:{checkMode:"contextual",defense:"normal"}}), true);
});

test("omitir la tirada final no omite la Sobrecarga", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes('startsWith("Hechizo:")'), true);
  assert.equal(guards.includes("actorRollCheck.call(this, options)"), true);
  assert.equal(guards.includes("tmAutomaticSpell"), true);
});

test("un hechizo sostenido fallido no permanece activo", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes("if (!success)"), true);
  assert.equal(guards.includes("after.filter((id) => id !== item.id)"), true);
  assert.equal(guards.includes("el Maná ya pagado no se devuelve"), true);
});

test("superar Sostenimiento abandona un efecto previo en vez de invalidar el lanzamiento", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes("const limit = hasDouble ? 2 : 1"), true);
  assert.equal(guards.includes("validBefore.slice"), true);
  assert.equal(guards.includes("[...retained, item.id]"), true);
  assert.equal(guards.includes("se abandona el efecto sostenido más antiguo"), true);
});

test("ruta real valida objetivos antes de gastar recursos y resuelve áreas por Defensa", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes("validateSpellTargets(item, selectedTokens"), true);
  assert.equal(guards.indexOf("validateSpellTargets(item, selectedTokens") < guards.indexOf("originalUseSpell.call(this, item)"), true);
  assert.equal(guards.includes('spellAreaKind(item) === "area" && needsCheck'), true);
  assert.equal(guards.includes("spellDfFor(item, target)"), true);
  assert.equal(guards.includes("resolveSpellImpacts(item, hitTargets)"), true);
  assert.equal(guards.includes("todavía no modifica Vida automáticamente"), true);
});

test("Origen Remoto fija un token de origen sin inventar alcance narrativo", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes("options.remoteOrigin"), true);
  assert.equal(guards.includes("getActiveTokens?.()[0]"), true);
  assert.equal(guards.includes("no concede percepción, conocimiento del objetivo ni línea de efecto"), true);
});
