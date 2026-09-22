import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("las fórmulas contextuales consumen dosis y respetan Saturación", async () => {
  const source = await readFile(new URL("../scripts/rules/formula-guards.mjs", import.meta.url), "utf8");
  const entry = await readFile(new URL("../scripts/tierra-magica.mjs", import.meta.url), "utf8");
  assert.equal(entry.includes('import { installFormulaGuards } from "./rules/formula-guards.mjs"'), true);
  assert.equal(entry.includes("installFormulaGuards(TierraMagicaActor)"), true);
  assert.equal(source.includes('if (quantity <= 0)'), true);
  assert.equal(source.includes('saturated.includes(family)'), true);
  assert.equal(source.includes('"system.quantity": quantity - 1'), true);
  assert.equal(source.includes('"system.alchemy.saturatedFamilies"'), true);
});

test("las fórmulas automatizadas conservan la ruta existente", async () => {
  const source = await readFile(new URL("../scripts/rules/formula-guards.mjs", import.meta.url), "utf8");
  assert.equal(source.includes("if (AUTOMATED.has(item.name)) return original.call(this, item)"), true);
});
