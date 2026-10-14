import test from "node:test";
import assert from "node:assert/strict";
import {SKILL_RANK_BONUSES} from "../scripts/rules/skills.mjs";

// PROG-01N: expedición experimental, no canon. Tiempo en unidades ficticias.
const levels=[5,10,15,20],seeds=[17,71,2026,911,3849,421,1543,3199,8527,101];
const chars={
 marcial:{fue:3,int:1,pre:2,athletics:[2,3,3,4],survival:[2,3,3,4]},
 canalizador:{fue:1,int:3,pre:1,arcana:[2,2,2,3],investigation:[2,2,2,3]},
 hibrido:{fue:3,int:2,pre:1,athletics:[2,3,3,3],survival:[2,2,2,3]},
 especialista:{fue:1,int:3,pre:3,investigation:[3,4,5,5],arcana:[2,3,3,4],persuasion:[2,3,3,3],survival:[3,3,4,4]}
};
const scenes=[
 {id:"camino",challenges:[
  {id:"paso",options:[["marcial","athletics","fue"],["hibrido","athletics","fue"],["especialista","survival","int"]]},
  {id:"rastro",options:[["especialista","investigation","int"],["canalizador","investigation","int"]]}]},
 {id:"ruinas",challenges:[
  {id:"sello",options:[["canalizador","arcana","int"],["especialista","arcana","int"]]},
  {id:"documentos",options:[["especialista","investigation","int"],["canalizador","investigation","int"]]}]},
 {id:"enclave",challenges:[
  {id:"acuerdo",options:[["especialista","persuasion","pre"],["marcial","survival","fue"]]},
  {id:"salida",options:[["marcial","survival","fue"],["hibrido","survival","fue"],["especialista","survival","int"]]}]}
];
function die(seed){let v=seed>>>0;return ()=>{v=(Math.imul(v,1664525)+1013904223)>>>0;return 1+Math.floor(v/4294967296*10);};}
function expedition(level,seed,{policy="adapt",supplyPolicy="protect",excluded=null}={}){
 const state={time:0,supplies:5,complications:0,actions:0,completed:[],pending:[],lostOpportunities:0,
  scenes:[],contributions:Object.fromEntries(Object.keys(chars).map(n=>[n,{actions:0,successes:0}]))};
 for(const [sceneIndex,scene] of scenes.entries()){
  const report={id:scene.id,before:{time:state.time,supplies:state.supplies,pending:state.pending.length},events:[]};
  // La dificultad de logística futura depende de los obstáculos sin resolver.
  const penalty=Math.min(2,state.pending.length);
  for(const [challengeIndex,challenge] of scene.challenges.entries()){
   let solved=false;
   const tried=new Set();
   for(let attempt=0;attempt<2&&!solved;attempt++){
    const options=challenge.options.filter(([who])=>!tried.has(who)&&who!==excluded);
    const selected=policy==="fixed"?options[0]:options.slice().sort((a,b)=>{
     const i=levels.indexOf(level),ca=chars[a[0]],cb=chars[b[0]];
     const bonus=x=>chars[x[0]][x[2]]+SKILL_RANK_BONUSES[chars[x[0]][x[1]]?.[i]??0];
     return bonus(b)-bonus(a);
    })[0];
    if(!selected)break;
    const [who,skill,attr]=selected;tried.add(who);
    const paid=supplyPolicy==="protect"&&attempt===1&&state.supplies>0?1:0;
    state.supplies-=paid;
    const roll=die((seed*101+sceneIndex*30011+challengeIndex*4201+attempt*9811)>>>0);
    const rank=chars[who][skill]?.[levels.indexOf(level)]??0;
    const total=roll()+roll()+chars[who][attr]+SKILL_RANK_BONUSES[rank];
    const success=total>=17+penalty;
    state.time++;state.actions++;state.contributions[who].actions++;
    if(success){solved=true;state.contributions[who].successes++;}
    else {state.complications++;state.time+=paid?0:1;}
    report.events.push({challenge:challenge.id,actor:who,attempt,total,success,paid});
   }
   if(solved)state.completed.push(challenge.id);
   else {state.pending.push(challenge.id);state.lostOpportunities++;}
  }
  // Una complicación no resuelta afecta a la escena posterior.
  report.after={time:state.time,supplies:state.supplies,pending:state.pending.length};
  state.scenes.push(report);
 }
 return state;
}
test("PROG-01N expedición: continuidad de estado en tres escenas",()=>{
 for(const level of levels)for(const seed of seeds)for(const policy of ["adapt","fixed"]){
  const x=expedition(level,seed,{policy});
  assert.deepEqual(x,expedition(level,seed,{policy}));
  assert.equal(x.scenes.length,3);
  assert.equal(x.completed.length+x.pending.length,6);
  assert.equal(new Set([...x.completed,...x.pending]).size,6);
  assert.equal(x.lostOpportunities,x.pending.length);
  assert.ok(x.supplies>=0&&x.supplies<=5&&x.time>=x.actions);
  for(let i=1;i<x.scenes.length;i++){
   assert.deepEqual(x.scenes[i].before,x.scenes[i-1].after);
  }
  assert.equal(x.complications,x.scenes.flatMap(s=>s.events).filter(e=>!e.success).length);
  assert.equal(x.supplies+x.scenes.flatMap(s=>s.events).reduce((n,e)=>n+e.paid,0),5);
 }
});
test("PROG-01N expedición: recursos y decisiones afectan coste persistente",()=>{
 let switched=0;
 for(const level of levels)for(const seed of seeds){
  const protectedRun=expedition(level,seed),unprotected=expedition(level,seed,{supplyPolicy:"save"});
  assert.equal(protectedRun.completed.length,unprotected.completed.length);
  assert.ok(protectedRun.time<=unprotected.time);
  if(protectedRun.time<unprotected.time)switched++;
 }
 assert.ok(switched>0);
});
test("PROG-01N expedición: matriz de tiempo, suministros y oportunidades",()=>{
 const matrix={};
 for(const level of levels){
  matrix[level]={};
  for(const policy of ["adapt","fixed"]){
   const rows=seeds.map(seed=>expedition(level,seed,{policy}));
   const avg=fn=>+(rows.reduce((s,x)=>s+fn(x),0)/rows.length).toFixed(2);
   matrix[level][policy]={time:avg(x=>x.time),supplies:avg(x=>x.supplies),
    complications:avg(x=>x.complications),missed:avg(x=>x.lostOpportunities),
    completed:avg(x=>x.completed.length),
    contributions:Object.fromEntries(Object.keys(chars).map(name=>[name,{
     actions:avg(x=>x.contributions[name].actions),successes:avg(x=>x.contributions[name].successes)}]))};
  }
 }
 console.log("PROG01N_EXPEDITION "+JSON.stringify(matrix));
});

test("PROG-01N marginal: ablación pareada de los cuatro integrantes",()=>{
 const matrix={};
 for(const level of levels){
  matrix[level]={};
  for(const policy of ["adapt","fixed"]){
   const baseline=seeds.map(seed=>expedition(level,seed,{policy}));
   const measures=rows=>{
    const avg=field=>+(rows.reduce((total,x)=>total+x[field],0)/rows.length).toFixed(2);
    return {time:avg("time"),supplies:avg("supplies"),
     missed:avg("lostOpportunities"),completed:+rows.reduce((total,x)=>total+x.completed.length,0)/rows.length};
   };
   const full=measures(baseline),without={};
   for(const name of Object.keys(chars)){
    const runs=seeds.map(seed=>expedition(level,seed,{policy,excluded:name}));
    const aggregate=measures(runs);
    without[name]={...aggregate,deltaTime:+(aggregate.time-full.time).toFixed(2),
     deltaSupplies:+(aggregate.supplies-full.supplies).toFixed(2),
     deltaMissed:+(aggregate.missed-full.missed).toFixed(2),
     deltaCompleted:+(aggregate.completed-full.completed).toFixed(2)};
    for(const state of runs){
     assert.equal(state.contributions[name].actions,0,"El excluido no puede actuar");
     assert.equal(state.completed.length+state.pending.length,6);
     assert.ok(state.supplies>=0);
     assert.ok(state.time>=state.actions);
     assert.ok(state.scenes.every(scene=>scene.events.every(ev=>ev.actor!==name)));
    }
   }
   matrix[level][policy]={full,without};
  }
 }
 console.log("PROG01N_MARGINAL "+JSON.stringify(matrix));
});
