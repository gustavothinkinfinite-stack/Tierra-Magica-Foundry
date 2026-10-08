import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { resolve, relative } from "node:path";
import Handlebars from "handlebars";

// Node-side compile catches the same syntax failures as Foundry's HBS parser.
// Parsing does not require Foundry-specific helper implementations.
const root = resolve(import.meta.dirname, "..");
const templateRoot = resolve(root, "templates");

async function hbsFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files=[];
  for (const entry of entries) {
    const path=resolve(directory,entry.name);
    if (entry.isDirectory()) files.push(...await hbsFiles(path));
    else if (entry.isFile() && entry.name.endsWith(".hbs")) files.push(path);
  }
  return files;
}

test("all Foundry Handlebars templates compile without parse errors", async () => {
  const files=await hbsFiles(templateRoot);
  assert.ok(files.length>5, "no se encontraron las plantillas esperadas");
  for (const path of files) {
    const input=await readFile(path,"utf8");
    assert.doesNotThrow(
      () => Handlebars.precompile(input),
      "Error Handlebars en "+relative(root,path)
    );
  }
});

test("the shared Actor sheet partial has a closing pair of braces",async () => {
  const input=await readFile(resolve(templateRoot,"actor/parts/actor-sheet.hbs"),"utf8");
  assert.ok(input.includes('{{> "systems/tierra-magica/templates/actor/parts/derived-diagnostics.hbs"}}'));
  assert.equal(input.includes('{{> "systems/tierra-magica/templates/actor/parts/derived-diagnostics.hbs"}\n'),false);
});
