import assert from "node:assert/strict";
import test from "node:test";
import {
  contentBrowserEntries,
  contentBrowserEntryById,
  contentBrowserTypeOptions,
  filterContentBrowserEntries
} from "../scripts/ui/content-browser-model.mjs";

const entries=contentBrowserEntries();

test("CONTENT-01A expone en un único navegador todos los tipos canónicos disponibles",()=>{
  const types=new Set(entries.map((entry)=>entry.type));
  for(const type of [
    "weapon","armor","shield","equipment","device","spell","ritual","formula",
    "technique","trait","specialization","ancestry","origin","background","discipline"
  ]) assert.equal(types.has(type),true,"Falta tipo "+type);

  const counts=Object.fromEntries(contentBrowserTypeOptions(entries).map((row)=>[row.type,row.count]));
  assert.equal(counts.weapon,200);
  assert.equal(counts.armor,94);
  assert.equal(counts.shield,54);
  assert.equal(counts.equipment,25);
});

test("CONTENT-01A busca sin depender de mayúsculas ni tildes",()=>{
  const fire=filterContentBrowserEntries(entries,{query:"proyectil igneo"});
  assert.equal(fire.some((entry)=>entry.type==="spell"&&entry.name==="Proyectil Ígneo"),true);

  const ancestry=filterContentBrowserEntries(entries,{query:"humano",type:"ancestry"});
  assert.equal(ancestry.some((entry)=>entry.name==="Humano"),true);
});

test("CONTENT-01A filtra por tipo sin mezclar contenido",()=>{
  const spells=filterContentBrowserEntries(entries,{type:"spell"});
  assert.equal(spells.length>0,true);
  assert.equal(spells.every((entry)=>entry.type==="spell"),true);
});

test("CONTENT-01A prepara una previsualización mecánica desde el mismo source del catálogo",()=>{
  const longbow=entries.find((entry)=>entry.type==="weapon"&&entry.name==="Arco largo");
  assert.ok(longbow);
  assert.equal(longbow.details.some((row)=>row.label==="Penetración"&&row.value==="1"),true);
  assert.equal(contentBrowserEntryById(entries,longbow.id)?.source.system.slug,longbow.source.system.slug);
});
