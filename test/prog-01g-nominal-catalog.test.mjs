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
