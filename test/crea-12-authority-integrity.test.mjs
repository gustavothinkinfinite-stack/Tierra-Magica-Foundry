import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root=resolve(new URL("..",import.meta.url).pathname);

async function scriptFiles(dir){
  const entries=await readdir(dir,{withFileTypes:true});
  const out=[];
  for(const entry of entries){
    const path=resolve(dir,entry.name);
    if(entry.isDirectory()) out.push(...await scriptFiles(path));
    else if(entry.isFile() && entry.name.endsWith(".mjs")) out.push(path);
  }
  return out;
}

async function scan(pattern){
  const files=await scriptFiles(resolve(root,"scripts"));
  const hits=[];
  for(const path of files){
    const source=await readFile(path,"utf8");
    if(pattern.test(source)) hits.push(path.slice(root.length+1));
    pattern.lastIndex=0;
  }
  return hits;
}

test("CREA-12 3F: rutas de juego no mutan campos derivados individuales",async()=>{
  const hits=await scan(/system\.derived\.[A-Za-z0-9_]+\s*=/g);
  assert.deepEqual(hits,[]);
});

test("CREA-12 3F: .max persistido sólo se escribe como espejo preparado",async()=>{
  const health=await scan(/resources\.health\.max/g);
  const mana=await scan(/resources\.mana\.max/g);
  assert.deepEqual(health,["scripts/documents/actor.mjs"]);
  assert.deepEqual(mana,["scripts/documents/actor.mjs"]);
});

test("CREA-12 3F: movimiento binario legado sólo existe en migración",async()=>{
  const hits=await scan(/system\.turn\.movement(?!Spent)/g);
  assert.deepEqual(hits,["scripts/rules/data-model-migration.mjs"]);
});

test("CREA-12 3F: bonos combat.* legados quedan confinados a migración/compatibilidad",async()=>{
  const files=await scriptFiles(resolve(root,"scripts"));
  const hits=[];
  const patterns=[
    /combat\??\.defenseBonus/g,
    /combat\??\.protectionBonus/g,
    /combat\??\.movementBonus/g,
    /combat\??\.initiativeBonus/g
  ];
  for(const path of files){
    const source=await readFile(path,"utf8");
    if(patterns.some((pattern)=>{const match=pattern.test(source);pattern.lastIndex=0;return match;})){
      hits.push(path.slice(root.length+1));
    }
  }
  assert.deepEqual(hits.sort(),[
    "scripts/rules/data-model-migration.mjs",
    "scripts/rules/derived-state.mjs"
  ]);
});
