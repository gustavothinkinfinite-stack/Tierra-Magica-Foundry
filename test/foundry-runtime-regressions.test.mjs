import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const read=(path)=>readFile(resolve(root,path),"utf8");

test("Foundry: documentTypes del manifiesto coincide exactamente con template.json",async()=>{
  const manifest=JSON.parse(await read("system.json"));
  const template=JSON.parse(await read("template.json"));
  assert.deepEqual(Object.keys(manifest.documentTypes.Actor),template.Actor.types);
  assert.deepEqual(Object.keys(manifest.documentTypes.Item),template.Item.types);
});

test("Foundry: prepareDerivedData del Actor no invoca helpers privados durante super()",async()=>{
  const source=await read("scripts/documents/actor.mjs");
  const start=source.indexOf("  prepareDerivedData() {");
  const end=source.indexOf("\n  async rollAttribute",start);
  assert.notEqual(start,-1);
  assert.notEqual(end,-1);
  const prepare=source.slice(start,end);
  assert.equal(prepare.includes("this.#"),false);
  assert.match(prepare,/this\._buildSkillBreakdown\(/);
});

test("Foundry: el wrapper de Familiar conserva prepareDerivedData sin introducir una segunda implementación",async()=>{
  const source=await read("scripts/rules/familiar-guards.mjs");
  assert.match(source,/const originalPrepare = ActorClass\.prototype\.prepareDerivedData/);
  assert.match(source,/originalPrepare\.call\(this\)/);
});


test("Foundry: reconstrucción usa precios de creación al adquirir contenido desde la ficha",async()=>{
  const source=await read("scripts/documents/actor.mjs");
  assert.match(source,/resolvedPriceContext = priceContext \?\? \(resolvedStage === "rebuilding" \? "creation" : null\)/);
  assert.match(source,/priceContext: resolvedPriceContext/);
});

test("Foundry: Reserva inicial tiene una sola autoridad persistida en creation",async()=>{
  const currency=await read("scripts/rules/currency.mjs");
  const model=JSON.parse(await read("template.json"));
  assert.equal(model.Actor.character.creation.initialReserveGranted,false);
  assert.match(currency,/this\.system\.creation\?\.initialReserveGranted/);
  assert.match(currency,/"system\.creation\.initialReserveGranted": true/);
  assert.equal(currency.includes('"system.currency.initialReserveGranted": true'),false);
});

test("Foundry: migraciones runtime no usan claves de borrado legacy -=...",async()=>{
  for(const path of [
    "scripts/rules/currency.mjs",
    "scripts/rules/data-model-migration.mjs",
    "scripts/rules/skills.mjs",
    "scripts/tierra-magica.mjs"
  ]){
    const source=await read(path);
    assert.equal(source.includes("-="),false,path);
  }
});

test("Foundry: globals deprecados v13 usados por el sistema están namespaced",async()=>{
  const actorSheet=await read("scripts/sheets/actor-sheet.mjs");
  const itemSheet=await read("scripts/sheets/item-sheet.mjs");
  const main=await read("scripts/tierra-magica.mjs");
  assert.match(actorSheet,/foundry\.appv1\.sheets\.ActorSheet/);
  assert.match(itemSheet,/foundry\.appv1\.sheets\.ItemSheet/);
  assert.match(actorSheet,/foundry\.applications\.ux\.TextEditor\.implementation/);
  assert.match(itemSheet,/foundry\.applications\.ux\.TextEditor\.implementation/);
  assert.match(main,/foundry\.applications\.handlebars\.loadTemplates/);
  assert.match(main,/foundry\.documents\.collections\.Actors/);
  assert.match(main,/foundry\.documents\.collections\.Items/);
  assert.equal(main.includes('Hooks.on("renderChatMessage",'),false);
  assert.match(main,/Hooks\.on\("renderChatMessageHTML"/);
});
