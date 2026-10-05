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

test("las fórmulas automatizadas usan identidad estable por slug", async () => {
  const source = await readFile(new URL("../scripts/rules/formula-guards.mjs", import.meta.url), "utf8");
  assert.equal(source.includes("normalizeSlug(item.system?.slug || item.name)"), true);
  assert.equal(source.includes("AUTOMATED.has(slug)"), true);
  assert.equal(source.includes("AUTOMATED.has(item.name)"), false);
});

test("renombrar una fórmula automatizada no cambia su ruta mecánica", async () => {
  class FormulaActor {
    constructor(){ this.calls=0; this.isOwner=true; }
    async update(){ return true; }
    async useFormula(item){ this.calls+=1; return {item}; }
  }
  const { installFormulaGuards } = await import("../scripts/rules/formula-guards.mjs");
  installFormulaGuards(FormulaActor);
  const actor=new FormulaActor();
  const item={type:"formula",name:"Mi remedio personal",system:{slug:"pocion-restauradora",quantity:1}};
  const result=await actor.useFormula(item);
  assert.ok(result);
  assert.equal(actor.calls,1);
});


test("CREA-13: aprender una Fórmula no crea una dosis preparada implícita", async () => {
  const source = await readFile(new URL("../scripts/rules/formula-guards.mjs", import.meta.url), "utf8");
  const actor = await readFile(new URL("../scripts/documents/actor.mjs", import.meta.url), "utf8");
  assert.equal(source.includes("number(item.system?.quantity, 0)"), true);
  assert.equal(actor.includes("toNumber(item.system.quantity, 0)"), true);
  assert.equal(source.includes("quantity, 1"), false);
  assert.equal(actor.includes("item.system.quantity, 1"), false);
});
