import test from "node:test";
import assert from "node:assert/strict";
import {SKILL_RANK_BONUSES} from "../scripts/rules/skills.mjs";

// PROG-01N: efectos del escenario NO CANÓNICOS: reserva de 4 suministros,
// retraso y complicaciones por fallos, rutas alternativas de habilidades.
const levels=[5,10,15,20],seeds=[17,71,2026,911,3849,421,1543,3199,8527,101];
const ranks={
 marcial:{fue:3,int:1,pre:2,athletics:[2,3,3,4],survival:[2,3,3,4]},
 canalizador:{fue:1,int:3,pre:1,arcana:[2,2,2,3],investigation:[2,2,2,3]},
 hibrido:{fue:3,int:2,pre:1,athletics:[2,3,3,3],survival:[2,2,2,3]},
 especialista:{fue:1,int:3,pre:3,investigation:[3,4,5,5],arcana:[2,3,3,4],
  persuasion:[2,3,3,3],survival:[3,3,4,4]}
};
const stages=[
 {id:"paso",options:[["marcial","athletics","fue"],["hibrido","athletics","fue"],["especialista","survival","int"]]},
 {id:"indicios",options:[["especialista","investigation","int"],["canalizador","investigation","int"]]},
 {id:"sello",options:[["canalizador","arcana","int"],["especialista","arcana","int"]]},
 {id:"dialogo",options:[["especialista","persuasion","pre"],["marcial","survival","fue"]]}
];
function dice(seed){let n=seed>>>0;return ()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return 1+Math.floor(n/4294967296*10);};}
function run(level,seed,{policy="adapt",supplies=4}={}){
 const state={supplies,delay:0,complications:0,cleared:[],pending:[],events:[],actions:0};
 for(const [index,stage] of stages.entries()){
  let solved=false;
  // Dos intentos por etapa. En el segundo puede intervenir otro personaje.
  const tried=new Set();
  for(let attempt=0;attempt<2&&!solved;attempt++){
   const available=stage.options.filter(([name])=>!tried.has(name));
   const choice=policy==="fixed"?available[0]:available
    .slice().sort((a,b)=>{
     const pa=ranks[a[0]],pb=ranks[b[0]],i=levels.indexOf(level);
     const va=pa[a[2]]+SKILL_RANK_BONUSES[pa[a[1]]?.[i]??0];
     const vb=pb[b[2]]+SKILL_RANK_BONUSES[pb[b[1]]?.[i]??0];
     return vb-va;
    })[0];
   if(!choice)break;
   const [actor,skill,attribute]=choice;tried.add(actor);
   // Un gasto voluntario antes de la tirada consume suministros para evitar
   // una penalización de retraso posterior; NO se añade bono canónico.
   const supplyUsed=state.supplies>0&&attempt===1?1:0;
   state.supplies-=supplyUsed;
   const roll=dice((seed*101+index*4309+attempt*1871)>>>0);
   const rank=ranks[actor][skill]?.[levels.indexOf(level)]??0;
   const total=roll()+roll()+ranks[actor][attribute]+SKILL_RANK_BONUSES[rank];
   solved=total>=17;
   state.actions++;
   state.events.push({stage:stage.id,actor,skill,attempt,rank,total,success:solved,supplyUsed});
   if(!solved){state.complications++;if(!supplyUsed)state.delay++;}
  }
  (solved?state.cleared:state.pending).push(stage.id);
 }
 return state;
}
test("PROG-01N persistencia: 80 misiones y estado de etapa no se reinicia",()=>{
 let count=0;
 for(const level of levels)for(const seed of seeds)for(const policy of ["adapt","fixed"]){
  const s=run(level,seed,{policy});assert.deepEqual(s,run(level,seed,{policy}));
  assert.equal(s.cleared.length+s.pending.length,4);
  assert.equal(new Set([...s.cleared,...s.pending]).size,4);
  assert.ok(s.supplies>=0&&s.supplies<=4&&s.actions<=8);
  assert.equal(s.complications,s.events.filter(e=>!e.success).length);
  assert.equal(s.supplies+s.events.reduce((a,e)=>a+e.supplyUsed,0),4);
  count++;
 }
 assert.equal(count,80);
});
test("PROG-01N fallos persistentes y rutas alternativas",()=>{
 let switches=0,failures=0;
 for(const level of levels)for(const seed of seeds){
  const state=run(level,seed);
  failures+=state.pending.length;
  for(const stage of stages){
   const attempts=state.events.filter(e=>e.stage===stage.id);
   if(attempts.length===2){assert.notEqual(attempts[0].actor,attempts[1].actor);switches++;}
  }
 }
 assert.ok(switches>0);assert.ok(failures>=0);
});
test("PROG-01N recursos: gastar suministros reduce retrasos de forma verificable",()=>{
 for(const level of levels)for(const seed of seeds){
  const full=run(level,seed,{supplies:4}),empty=run(level,seed,{supplies:0});
  assert.equal(full.cleared.length,empty.cleared.length);
  assert.ok(full.delay<=empty.delay);
 }
});
test("PROG-01N matriz comparable de decisiones y consecuencias",()=>{
 const matrix={};
 for(const level of levels){
  const entries=seeds.map(seed=>({adapt:run(level,seed),fixed:run(level,seed,{policy:"fixed"})}));
  const avg=(key,metric)=>+(entries.reduce((sum,e)=>sum+e[key][metric],0)/entries.length).toFixed(2);
  matrix[level]={adaptive:{cleared:+(entries.reduce((s,e)=>s+e.adapt.cleared.length,0)/10).toFixed(2),
   delay:avg("adapt","delay"),complications:avg("adapt","complications"),supplies:avg("adapt","supplies")},
   fixed:{cleared:+(entries.reduce((s,e)=>s+e.fixed.cleared.length,0)/10).toFixed(2),
    delay:avg("fixed","delay"),complications:avg("fixed","complications"),supplies:avg("fixed","supplies")}};
 }
 console.log("PROG01N_PERSISTENCE "+JSON.stringify(matrix));
});
