import assert from "node:assert/strict";
import test from "node:test";
import {
  contentBrowserEntries,
  contentBrowserEntryById,
  contentBrowserTypeOptions,
  filterContentBrowserEntries
} from "../scripts/ui/content-browser-model.mjs";
import {
  contentBrowserWorldSource,
  createContentBrowserWorldItem,
  findContentBrowserWorldDuplicates
} from "../scripts/ui/content-browser-world.mjs";

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


test("CONTENT-01B prepara una copia de mundo sin mutar la entrada canónica",()=>{
  const dagger=entries.find((entry)=>entry.type==="weapon"&&entry.name==="Daga");
  const before=JSON.stringify(dagger.source);
  const source=contentBrowserWorldSource(dagger);
  assert.equal(source.name,"Daga");
  assert.equal(source.type,"weapon");
  assert.equal(source.system.slug,"daga");
  assert.equal(source.system.acquisition,null);
  assert.equal(JSON.stringify(dagger.source),before);
});

test("CONTENT-01B detecta duplicados por tipo + slug aunque cambie el nombre visible",()=>{
  const dagger=entries.find((entry)=>entry.type==="weapon"&&entry.name==="Daga");
  const world=[
    {name:"Daga renombrada",type:"weapon",system:{slug:"daga"}},
    {name:"Daga",type:"equipment",system:{slug:"daga"}}
  ];
  const duplicates=findContentBrowserWorldDuplicates(dagger,world);
  assert.equal(duplicates.length,1);
  assert.equal(duplicates[0].type,"weapon");
});

test("CONTENT-01B bloquea duplicado accidental antes de invocar Document.create",async()=>{
  const dagger=entries.find((entry)=>entry.type==="weapon"&&entry.name==="Daga");
  let creates=0;
  class FakeItem {
    static async create(){
      creates+=1;
      return {};
    }
  }
  const result=await createContentBrowserWorldItem(dagger,{
    worldItems:[{name:"Daga",type:"weapon",system:{slug:"daga"}}],
    documentClass:FakeItem
  });
  assert.equal(result.ok,false);
  assert.equal(result.reason,"duplicate");
  assert.equal(creates,0);
});

test("CONTENT-01B permite una copia adicional sólo mediante la ruta explícita",async()=>{
  const dagger=entries.find((entry)=>entry.type==="weapon"&&entry.name==="Daga");
  let createdSource=null;
  class FakeItem {
    static async create(source){
      createdSource=source;
      return {name:source.name,type:source.type,system:source.system};
    }
  }
  const result=await createContentBrowserWorldItem(dagger,{
    worldItems:[{name:"Daga",type:"weapon",system:{slug:"daga"}}],
    documentClass:FakeItem,
    allowDuplicate:true
  });
  assert.equal(result.ok,true);
  assert.equal(createdSource.name,"Daga (copia)");
  assert.equal(createdSource.type,"weapon");
  assert.equal(createdSource.system.slug,"daga");
});
