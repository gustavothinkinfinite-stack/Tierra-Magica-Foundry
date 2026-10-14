import test from "node:test";
import assert from "node:assert/strict";
import {SKILL_RANK_BONUSES} from "../scripts/rules/skills.mjs";

// PROG-01N: dos rutas para retos mixtos, consecuencias logísticas no canónicas.
const levels=[5,10,15,20],seeds=[17,71,2026,911,3849,421,1543,3199,8527,101];
const profiles={
 marcial:{fue:3,int:1,pre:2,athletics:[2,3,3,4],survival:[2,3,3,4],martialWeapons:[3,4,5,5]},
 canalizador:{fue:1,int:3,pre:1,arcana:[2,2,2,3],channeling:[3,4,5,5]},
 hibrido:{fue:3,int:2,pre:1,athletics:[2,3,3,3],survival:[2,2,2,3],channeling:[3,3,4,4],martialWeapons:[3,4,5,5]},
 especialista:{fue:1,int:3,pre:3,investigation:[3,4,5,5],arcana:[2,3,3,4],persuasion:[2,3,3,3],survival:[3,3,4,4]}
};
const challenges=[
 {id:"pasarela",scene:"desfiladero",kind:"movilidad",routes:[
  {actor:"marcial",checks:[["athletics","fue"]]},
  {actor:"hibrido",checks:[["athletics","fue"],["survival","fue"]]},
  {actor:"especialista",checks:[["survival","int"]]}]},
 {id:"puerta-energizada",scene:"ruinas",kind:"magia-mixta",routes:[
  {actor:"hibrido",checks:[["martialWeapons","fue"],["channeling","int"]]},
  {actor:"canalizador",checks:[["channeling","int"]]},
  {actor:"marcial",checks:[["martialWeapons","fue"]]}]},
 {id:"emboscada-ambiental",scene:"bosque",kind:"supervivencia",routes:[
  {actor:"hibrido",checks:[["survival","fue"],["martialWeapons","fue"]]},
  {actor:"marcial",checks:[["survival","fue"]]},
  {actor:"especialista",checks:[["survival","int"]]}]},
 {id:"registro",scene:"archivo",kind:"investigación",routes:[
  {actor:"especialista",checks:[["investigation","int"]]},
  {actor:"canalizador",checks:[["arcana","int"]]}]},
 {id:"mediación",scene:"enclave",kind:"social",routes:[
  {actor:"especialista",checks:[["persuasion","pre"]]},
  {actor:"marcial",checks:[["survival","fue"]]}]}
];
function dice(seed){let n=seed>>>0;return ()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return 1+Math.floor(n/4294967296*10);};}
function expedition(level,seed,{excluded=null,policy="adaptive"}={}){
 const state={time:0,supplies:5,complications:0,abandoned:[],completed:[],lostOpportunities:0,
  abandonmentTime:0,abandonmentSupplies:0,actions:0,
  byActor:Object.fromEntries(Object.keys(profiles).map(k=>[k,0])),events:[]};
 for(const [index,challenge] of challenges.entries()){
  const routes=challenge.routes.filter(x=>x.actor!==excluded);
  const rankIndex=levels.indexOf(level);
  const modifier=route=>route.checks.reduce((sum,[skill,attr])=>{
   const p=profiles[route.actor];return sum+p[attr]+SKILL_RANK_BONUSES[p[skill]?.[rankIndex]??0];
  },0)/route.checks.length;
  routes.sort((a,b)=>policy==="adaptive"?modifier(b)-modifier(a):0);
  let success=false;
  const available=routes.slice(0,2);
  for(const [attempt,route] of available.entries()){
   state.actions++;state.time++;state.byActor[route.actor]++;
   const checks=route.checks.map(([skill,attr],checkIndex)=>{
    const p=profiles[route.actor],roll=dice((seed*101+index*30011+attempt*1871+checkIndex*1301)>>>0);
    return roll()+roll()+p[attr]+SKILL_RANK_BONUSES[p[skill]?.[rankIndex]??0]>=16;
   });
   success=checks.every(Boolean);
   state.events.push({challenge:challenge.id,actor:route.actor,success,checks});
   if(success)break;
   state.complications++;state.time++;
  }
  if(success)state.completed.push(challenge.id);
  else {
   // Precio explícito por abandonar: desvío de dos unidades de tiempo,
   // una oportunidad de misión perdida y hasta un suministro disponible.
   state.abandoned.push(challenge.id);state.lostOpportunities++;
   state.time+=2;state.abandonmentTime+=2;
   const lost=Math.min(1,state.supplies);
   state.supplies-=lost;state.abandonmentSupplies+=lost;
  }
 }
 return state;
}
test("PROG-01N ampliado: 200 expediciones pareadas y penalización explícita",()=>{
 let count=0;
 for(const level of levels)for(const seed of seeds)for(const excluded of [null,...Object.keys(profiles)]){
  const x=expedition(level,seed,{excluded});
  assert.deepEqual(x,expedition(level,seed,{excluded}));
  assert.equal(x.completed.length+x.abandoned.length,challenges.length);
  assert.equal(new Set([...x.completed,...x.abandoned]).size,challenges.length);
  assert.equal(x.abandonmentTime,2*x.abandoned.length);
  assert.equal(x.lostOpportunities,x.abandoned.length);
  assert.equal(x.abandonmentSupplies,Math.min(5,x.abandoned.length));
  assert.equal(x.supplies+x.abandonmentSupplies,5);
  assert.ok(x.time>=x.actions+x.abandonmentTime);
  if(excluded)assert.equal(x.byActor[excluded],0);
  count++;
 }
 assert.equal(count,200);
});
test("PROG-01N ampliado: registrar aportes marginales sin suponer equilibrio",()=>{
 const matrix={};
 for(const level of levels){
  const full=seeds.map(seed=>expedition(level,seed));
  const mean=(rows,key)=>+(rows.reduce((n,x)=>n+x[key],0)/rows.length).toFixed(2);
  matrix[level]={full:{completed:mean(full,"lostOpportunities"),time:mean(full,"time"),supplies:mean(full,"supplies")},without:{}};
  for(const name of Object.keys(profiles)){
   const rows=seeds.map(seed=>expedition(level,seed,{excluded:name}));
   matrix[level].without[name]={lost:mean(rows,"lostOpportunities"),time:mean(rows,"time"),
    supplies:mean(rows,"supplies"),deltaLost:+(mean(rows,"lostOpportunities")-mean(full,"lostOpportunities")).toFixed(2)};
  }
 }
 console.log("PROG01N_VERSATILITY "+JSON.stringify(matrix));
});
