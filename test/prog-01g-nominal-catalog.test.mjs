import test from "node:test";
import assert from "node:assert/strict";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import { TM_CONFIG } from "../scripts/config.mjs";
import { pdTotalForLevel } from "../scripts/rules/creation.mjs";
import { preflightAcquisition } from "../scripts/rules/acquisition.mjs";

const catalog=coreCatalog();
const find=(type,name)=>catalog.find(x=>x.type===type&&x.name===name);
const groups={
  marcial:[
    {level:1,items:[["technique","Parada",2],["technique","Golpe Potente",2],["technique","Recibir Carga",2]]},
    {level:5,items:[["technique","Intercepción",2],["technique","Barrido",3],["technique","Contraataque",3]]},
    {level:10,items:[["technique","Estocada Perforante",3]]}
  ],
  canalizador:[
    {level:1,items:[["discipline","Evocación",2],["spell","Proyectil Ígneo",2],["spell","Luz Arcana",1],["spell","Barrera Cinética",2]]},
    {level:5,items:[["spell","Arco Fulminante",3],["spell","Aguja Gélida",3],["spell","Martillo Cinético",3],["spell","Onda de Choque",2]]},
    {level:10,items:[["spell","Pantalla Cinética",5],["spell","Rayo de Ruptura",5],["technique","Contramagia",3]]},
    {level:15,items:[["spell","Tormenta Arcana",8]]},
    {level:20,items:[["technique","Doble Sostenimiento",5]]}
  ],
  hibrido:[
    {level:1,items:[["discipline","Evocación",2],["spell","Proyectil Ígneo",2],["technique","Parada",2],["technique","Golpe Potente",2]]},
    {level:5,items:[["spell","Barrera Cinética",2],["spell","Luz Arcana",1],["technique","Estocada Perforante",3]]},
    {level:10,items:[["spell","Arco Fulminante",3],["spell","Aguja Gélida",3],["spell","Onda de Choque",2]]},
    {level:15,items:[["spell","Pantalla Cinética",5]]},
    {level:20,items:[["technique","Barrido",3],["technique","Contraataque",3]]}
  ],
  especialista:[
    {level:1,items:[]},
    {level:5,items:[["specialization","Archivística",1]]}
  ]
};

for(const [profile,stages] of Object.entries(groups)){
  test("PROG-01G: catálogo y costes nominales del perfil "+profile,()=>{
    const bought=new Set();
    for(const stage of stages){
      assert.ok(pdTotalForLevel(stage.level)>=25);
      for(const [type,name,pd] of stage.items){
        const item=find(type,name);
        assert.ok(item,profile+": falta "+type+" "+name);
        const key=type+":"+item.system.slug;
        assert.ok(!bought.has(key),profile+": repetición "+key);
        bought.add(key);
        const cost=item.system.costs.find(c=>c.context==="progression")
          ?? item.system.costs.find(c=>c.context==="any");
        assert.ok(cost,profile+": sin coste de progresión "+key);
        assert.equal(cost.resource,"pd",profile+": recurso "+key);
        assert.equal(cost.amount,pd,profile+": coste "+key);
      }
    }
  });
}

test("PROG-01G: una Disciplina exige Canalización Entrenada al adquirirla",()=>{
  const evocation=find("discipline","Evocación");
  assert.ok(evocation);
  const pc=rank=>({
    type:"character",items:[],
    system:{details:{level:5},creation:{status:"complete",revision:0},skills:{channeling:{rank}}}
  });
  const denied=preflightAcquisition({actor:pc(1),candidate:evocation,stage:"progression"});
  assert.equal(denied.valid,false);
  assert.ok(denied.issues.some(x=>x.code==="requirement-skill"));
  const allowed=preflightAcquisition({actor:pc(2),candidate:evocation,stage:"progression"});
  assert.equal(allowed.valid,true,JSON.stringify(allowed.issues));
});

test("PROG-01G: habilidades nominales de los cuatro perfiles existen",()=>{
  for(const key of ["martialWeapons","heavyWeapons","rangedWeapons","handling","athletics","acrobatics","survival","stealth","channeling","arcana","investigation","nature","medicine","history","persuasion","empathy"]){
    assert.ok(TM_CONFIG.skills[key],"Habilidad no registrada: "+key);
  }
});

test("PROG-01H: cada compra nominal pasa preflight secuencial con Items ya adquiridos",()=>{
  const rankByProfile={
    marcial:{martialWeapons:3,athletics:2,acrobatics:2,survival:2,stealth:2},
    canalizador:{channeling:3,arcana:2,investigation:2,nature:2,survival:1},
    hibrido:{martialWeapons:3,channeling:2,athletics:2,survival:2,stealth:1},
    especialista:{investigation:3,medicine:2,history:2,nature:2,persuasion:2,survival:2,arcana:2}
  };
  for(const [profile,stages] of Object.entries(groups)){
    const owned=[];
    for(const stage of stages){
      const ranks={...rankByProfile[profile]};
      if(profile==="hibrido"&&stage.level>=5) ranks.channeling=3;
      if(profile==="hibrido"&&stage.level>=15) ranks.channeling=4;
      if(profile==="canalizador"&&stage.level>=10) ranks.channeling=4;
      if(profile==="canalizador"&&stage.level>=15) ranks.channeling=5;
      const pc={
        type:"character",uuid:"Actor."+profile,items:owned,
        system:{details:{level:stage.level},creation:{status:"complete",revision:0},
          skills:Object.fromEntries(Object.entries(ranks).map(([key,rank])=>[key,{rank}]))}
      };
      for(const [type,name,expectedPd] of stage.items){
        const candidate=find(type,name);
        const result=preflightAcquisition({actor:pc,candidate,stage:"progression"});
        assert.equal(result.valid,true,profile+" nivel "+stage.level+" "+name+": "+JSON.stringify(result.issues));
        assert.equal(result.cost?.amount,expectedPd);
        owned.push({...candidate,id:"prog-h-"+profile+"-"+owned.length,
          system:{...candidate.system,acquisition:result.acquisition}});
      }
    }
  }
});
