import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("Familiares no heredan una segunda economía de PJ", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/familiar-guards.mjs"), "utf8");
  const entry = await readFile(resolve(root, "scripts/tierra-magica.mjs"), "utf8");
  assert.equal(entry.includes("installFamiliarGuards(TierraMagicaActor)"), true);
  assert.equal(guards.includes("this.system.resources.mana.value = 0"), true);
  assert.equal(guards.includes("this.system.resources.mana.max = 0"), true);
  assert.equal(guards.includes("this.system.turn.action = false"), true);
  assert.equal(guards.includes("this.system.turn.reaction = false"), true);
});

test("Trauma automático a 0 Vida queda limitado a personajes", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/familiar-guards.mjs"), "utf8");
  assert.equal(guards.includes('this.type === "character" && number(this.system.status?.trauma) === 0'), true);
  assert.equal(guards.includes("zeroTraumaApplied"), false);
  assert.equal(guards.includes('this.type === "familiar") updates["system.familiar.incapacitated"] = true'), true);
});

test("orden persistente no se presenta como ataque táctico gratuito", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/familiar-guards.mjs"), "utf8");
  assert.equal(guards.includes("no concede ataques repetidos"), true);
  assert.equal(guards.includes("requieren Acción Vinculada"), true);
});

test("Origen Remoto valida propiedad, estado y Vínculo III", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/familiar-guards.mjs"), "utf8");
  assert.equal(guards.includes("validFamiliar(this, familiar)"), true);
  assert.equal(guards.includes("bondLevel, 1) < 3"), true);
  assert.equal(guards.includes("no concede conocimiento, percepción ni línea de efecto"), true);
  assert.equal(guards.includes("const result = await this.useSpell(spell)"), true);
});
