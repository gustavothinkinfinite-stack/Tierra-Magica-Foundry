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

test("PROG-01E: compra secuencial de Familiar impide la segunda adquisición",()=>{
  const familiar=entry("Familiar Mágico","trait");
  const first=preflightAcquisition({actor:actor(5),candidate:familiar,stage:"progression"});
  assert.equal(first.valid,true,JSON.stringify(first.issues));
  assert.equal(first.acquisition?.paid?.resource,"pd");
  assert.equal(first.acquisition?.paid?.amount,6);
  const owned={...familiar,id:"familiar-001",system:{...familiar.system,acquisition:first.acquisition}};
  const repeated=preflightAcquisition({
    actor:actor(5,[owned]),candidate:familiar,stage:"progression"
  });
  assert.equal(repeated.valid,false);
  assert.ok(repeated.issues.some(issue=>issue.code==="duplicate"));
});

test("PROG-01E: sin coste posterior no se puede comprar un Rasgo innato",()=>{
  for(const name of ["Sentido Agudo","Visión en la Oscuridad","Corpulento","Masivo"]){
    const item=entry(name,"trait");
    assert.ok(item,name);
    const result=preflightAcquisition({
      actor:actor(10),candidate:item,stage:"progression"
    });
    assert.equal(result.valid,false,name);
    assert.ok(result.issues.some(issue=>issue.code==="cost"),name);
  }
});

test("PROG-01E: el preflight rechaza revisión obsoleta de construcción",()=>{
  const familiar=entry("Familiar Mágico","trait");
  const result=preflightAcquisition({
    actor:actor(5),candidate:familiar,stage:"progression",expectedRevision:7
  });
  assert.equal(result.valid,false);
  assert.ok(result.issues.some(issue=>issue.code==="revision"));
});

test("PROG-01E: Contraataque exige Parada adquirida previamente",()=>{
  const counter=entry("Contraataque","technique");
  const parry=entry("Parada","technique");
  assert.ok(counter);
  assert.ok(parry);
  const without=preflightAcquisition({actor:actor(5),candidate:counter,stage:"progression"});
  assert.equal(without.valid,false);
  assert.ok(without.issues.some(issue=>issue.code==="requirement-item"),JSON.stringify(without.issues));
  const parryOwned={...parry,id:"owned-parry",system:{...parry.system}};
  const withParry=preflightAcquisition({
    actor:actor(5,[parryOwned]),candidate:counter,stage:"progression"
  });
  assert.equal(withParry.valid,true,JSON.stringify(withParry.issues));
  assert.equal(withParry.cost?.amount,3);
});

test("PROG-01F: compras de técnicas de Familiar verifican Rasgo, propietario y grado",()=>{
  const trait=entry("Familiar Mágico","trait");
  const owned={...trait,id:"trait-owned",system:{...trait.system}};
  const previous=globalThis.game;
  try {
    for(const [name,required] of [["Sentidos Compartidos",2],["Comunicación Mejorada",2],["Origen Remoto",3],["Coordinación Reactiva",3]]){
      const candidate=entry(name,"technique");
      assert.ok(candidate,name);
      const pc=actor(10,[owned]);
      pc.uuid="Actor.owner";
      globalThis.game={actors:{contents:[]}};
      const noPet=preflightAcquisition({actor:pc,candidate,stage:"progression"});
      assert.equal(noPet.valid,false,name+" sin Familiar");
      assert.ok(noPet.issues.some(issue=>issue.code==="requirement-familiar-bond"));
      globalThis.game={actors:{contents:[{type:"familiar",system:{details:{ownerUuid:"Actor.other"},familiar:{bondLevel:4}}}]}};
      const alien=preflightAcquisition({actor:pc,candidate,stage:"progression"});
      assert.equal(alien.valid,false,name+" Familiar ajeno");
      globalThis.game={actors:{contents:[{type:"familiar",system:{details:{ownerUuid:pc.uuid},familiar:{bondLevel:required-1}}}]}};
      const low=preflightAcquisition({actor:pc,candidate,stage:"progression"});
      assert.equal(low.valid,false,name+" Vínculo insuficiente");
      globalThis.game={actors:{contents:[{type:"familiar",system:{details:{ownerUuid:pc.uuid},familiar:{bondLevel:required}}}]}};
      const granted=preflightAcquisition({actor:pc,candidate,stage:"progression"});
      assert.equal(granted.valid,true,name+" requisito completo: "+JSON.stringify(granted.issues));
      const withoutTrait=preflightAcquisition({actor:{...pc,items:[]},candidate,stage:"progression"});
      assert.equal(withoutTrait.valid,false,name+" sin Rasgo");
      assert.ok(withoutTrait.issues.some(issue=>issue.code==="requirement-item"));
    }
  } finally {
    globalThis.game=previous;
  }
});
