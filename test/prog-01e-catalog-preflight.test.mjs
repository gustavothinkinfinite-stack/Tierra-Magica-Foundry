import test from "node:test";
import assert from "node:assert/strict";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import { preflightAcquisition } from "../scripts/rules/acquisition.mjs";

const catalog=coreCatalog();
function entry(name,type){
  return catalog.find(item=>item.name===name&&item.type===type);
}
function actor(level=1,items=[]){
  const skills=Object.fromEntries(
    ["channeling","martialWeapons","investigation","arcana","medicine"].map(k=>[k,{rank:3}])
  );
  return {type:"character",system:{details:{level},creation:{status:"complete",revision:0},skills},items};
}

test("PROG-01E: los hechizos, técnicas y disciplinas citados existen en el catálogo real",()=>{
  for(const [type,names] of [
    ["discipline",["Evocación"]],
    ["spell",["Proyectil Ígneo","Luz Arcana","Barrera Cinética","Onda de Choque","Aguja Gélida","Arco Fulminante","Martillo Cinético","Pantalla Cinética","Rayo de Ruptura","Tormenta Arcana"]],
    ["technique",["Parada","Golpe Potente","Recibir Carga","Intercepción","Barrido","Contraataque","Estocada Perforante","Contramagia","Doble Sostenimiento"]]
  ]){
    for(const name of names) assert.ok(entry(name,type),type+": "+name);
  }
});

test("PROG-01E: adquisición real rechaza la ausencia de coste de progresión en Rasgos",()=>{
  const innate=entry("Visión en la Oscuridad","trait");
  const familiar=entry("Familiar Mágico","trait");
  assert.ok(innate);
  assert.ok(familiar);
  const denied=preflightAcquisition({actor:actor(5),candidate:innate,stage:"progression"});
  assert.equal(denied.valid,false);
  assert.ok(denied.issues.some(issue=>issue.code==="cost"));
  const allowed=preflightAcquisition({actor:actor(5),candidate:familiar,stage:"progression"});
  assert.equal(allowed.cost?.resource,"pd");
  assert.equal(allowed.cost?.amount,6);
});

test("PROG-01E: el preflight distingue creación de progresión de una Disciplina",()=>{
  const evocation=entry("Evocación","discipline");
  assert.ok(evocation);
  const stage=preflightAcquisition({actor:actor(5),candidate:evocation,stage:"progression"});
  assert.ok(!stage.issues.some(issue=>issue.code==="cost"),JSON.stringify(stage.issues));
});

test("PROG-01E: los grados altos preservan sus requisitos del catálogo",()=>{
  for(const name of ["Tormenta Arcana","Pantalla Cinética"]){
    const item=entry(name,"spell");
    assert.ok(item);
    assert.ok(Array.isArray(item.system.costs));
    assert.ok(item.system.costs.some(cost=>cost.context==="progression"||cost.context==="any"));
  }
});
