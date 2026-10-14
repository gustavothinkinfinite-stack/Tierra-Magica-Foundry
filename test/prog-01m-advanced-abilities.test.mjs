import test from "node:test";
import assert from "node:assert/strict";
import {coreCatalog} from "../scripts/catalog/core-catalog.mjs";
import {REFERENCE_ENCOUNTERS,LEVEL_RANKS} from "./fixtures/prog-01m-encounters.mjs";
import {minimumSpellRank,SKILL_RANK_BONUSES} from "../scripts/rules/skills.mjs";

// Cotas ofensivas: sin afirmar que áreas/líneas siempre incluyen dos objetivos.
// No cambia reglas ni confunde daños esperados con resultados de encuentros completos.
const catalog=coreCatalog();
const spell=name=>{const x=catalog.find(x=>x.type==="spell"&&x.name===name);assert.ok(x,name);return x.system;};
const scenarios={
 5:["Proyectil Ígneo","Arco Fulminante","Aguja Gélida","Onda de Choque"],
 10:["Proyectil Ígneo","Arco Fulminante","Rayo de Ruptura","Pantalla Cinética"],
 15:["Proyectil Ígneo","Rayo de Ruptura","Tormenta Arcana","Pantalla Cinética"],
 20:["Proyectil Ígneo","Rayo de Ruptura","Tormenta Arcana","Pantalla Cinética"]
};
function chance(bonus,defense){
 let hits=0;for(let a=1;a<=10;a++)for(let b=1;b<=10;b++)
  if(a+b+bonus>=defense)hits++;
 return hits/100;
}
function expectedAgainst(sp,level,rank,targets){
 const e=REFERENCE_ENCOUNTERS[level];
 assert.ok(sp.damage>=0);
 const hit=chance(3+SKILL_RANK_BONUSES[rank],e.defense);
 const damage=Math.max(0,sp.damage-Math.max(0,e.protection-(sp.penetration??0)));
 return {hit,damage,expected:Number((hit*damage*targets).toFixed(3))};
}
test("PROG-01M avanzado: repertorio catalogado y puertas de Canalización",()=>{
 for(const [level,names] of Object.entries(scenarios)){
  const rank=LEVEL_RANKS.canalizador[level][1];
  for(const name of names){
   const sp=spell(name);
   assert.ok(rank>=minimumSpellRank(sp.grade),level+" "+name);
   assert.ok(sp.manaCost>0);
  }
 }
});
test("PROG-01M avanzado: penetración reduce protección y mantiene daño no negativo",()=>{
 for(const level of [5,10,15,20]){
  const basic=spell("Proyectil Ígneo");
  const rank=LEVEL_RANKS.canalizador[level][1];
  const single=expectedAgainst(basic,level,rank,1);
  assert.ok(single.expected>=0);
  assert.ok(single.hit>=0&&single.hit<=1);
  if(level>=10){
   const ray=expectedAgainst(spell("Rayo de Ruptura"),level,rank,1);
   assert.ok(ray.damage>=single.damage,level+" comparación de daño por impacto");
  }
 }
});
test("PROG-01M avanzado: ataques a dos objetivos son cotas condicionadas a geometría",()=>{
 for(const [level,name] of [[5,"Arco Fulminante"],[10,"Rayo de Ruptura"],[15,"Tormenta Arcana"],[20,"Tormenta Arcana"]]){
  const sp=spell(name),rank=LEVEL_RANKS.canalizador[level][1];
  const one=expectedAgainst(sp,level,rank,1);
  const two=expectedAgainst(sp,level,rank,2);
  assert.equal(two.expected,Number((2*one.expected).toFixed(3)));
  assert.ok(two.expected>=one.expected);
 }
});
test("PROG-01M avanzado: no contar Pantalla Cinética como daño",()=>{
 const screen=spell("Pantalla Cinética");
 assert.equal(screen.sustained,true);
 assert.equal(screen.damage??0,0);
 assert.ok(screen.effect.includes("+2 Defensa"));
});
