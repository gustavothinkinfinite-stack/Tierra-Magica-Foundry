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
