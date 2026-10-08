import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {resolve} from "node:path";
import {safeActorSheetRenderOptions} from "../scripts/sheets/actor-sheet-render-options.mjs";

test("legacy ActorSheet render never merges read-only TokenDocuments",()=>{
  const token=Object.defineProperty({
    documentName:"Token",toObject:()=>({_id:"123"}),actorId:"ACTOR123"
  },"_id",{value:"123",writable:false,enumerable:true});
  Object.freeze(token);
  const options={token,focus:true,renderContext:"sheet"};
  const safe=safeActorSheetRenderOptions(options);
  assert.equal(Object.hasOwn(safe,"token"),false);
  assert.equal(safe.focus,true);
  assert.equal(safe.renderContext,"sheet");
  assert.equal(options.token,token,"caller options remain unchanged");
  assert.equal(token._id,"123");
});

test("legacy actor sheet sanitizer preserves normal options",()=>{
  const ordinary={focus:true,position:{left:100}};
  assert.equal(safeActorSheetRenderOptions(ordinary),ordinary);
  assert.deepEqual(safeActorSheetRenderOptions(null),{});
  const raw={token:"TOKEN_ID"};
  assert.equal(safeActorSheetRenderOptions(raw),raw);
});

test("ActorSheetV1 uses the render options guard",async()=>{
  const code=await readFile(resolve("scripts/sheets/actor-sheet.mjs"),"utf8");
  assert.match(code,/render\(force = false, options = \{\}\)/);
  assert.match(code,/super\.render\(force, safeActorSheetRenderOptions\(options\)\)/);
});
