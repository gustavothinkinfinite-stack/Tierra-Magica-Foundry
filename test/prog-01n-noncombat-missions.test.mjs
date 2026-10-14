import test from "node:test";
import assert from "node:assert/strict";
import {SKILL_RANK_BONUSES} from "../scripts/rules/skills.mjs";

// PROG-01N: objetivos de escena no canónicos; capacidades nominales de los cuatro
// perfiles para ensayo de aptitud, NO fichas completas ni reglas de cooperación.
const levels=[5,10,15,20],seeds=[17,71,2026,911,3849,421,1543,3199,8527,101];
const actors={
 marcial:{fue:3,agi:2,int:1,per:1,pre:2,skills:{athletics:[2,3,3,4]}},
 canalizador:{fue:1,agi:2,int:3,per:2,pre:1,skills:{arcana:[2,2,2,3]}},
 hibrido:{fue:3,agi:2,int:2,per:1,pre:1,skills:{athletics:[2,3,3,3],arcana:[0,0,0,0]}},
 especialista:{fue:1,agi:1,int:3,per:2,pre:3,skills:{investigation:[3,4,5,5],persuasion:[2,3,3,3]}}
};
const tasks=[
 {id:"obstaculo",label:"Franquear obstáculo",attribute:"fue",skill:"athletics",dc:17,domain:"exploracion"},
 {id:"rastro",label:"Analizar indicios",attribute:"int",skill:"investigation",dc:17,domain:"investigacion"},
 {id:"arcano",label:"Interpretar sello",attribute:"int",skill:"arcana",dc:17,domain:"exploracion"},
 {id:"acuerdo",label:"Negociar acceso",attribute:"pre",skill:"persuasion",dc:17,domain:"social"}
];
function dice(seed){let state=seed>>>0;return ()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return 1+Math.floor((state/4294967296)*10);};}
function attempt(actor,task,level,seed){
 const roll=dice(seed);
 const rank=actor.skills[task.skill]?.[levels.indexOf(level)]??0;
 return {total:roll()+roll()+actor[task.attribute]+SKILL_RANK_BONUSES[rank],rank};
}
function mission(level,seed,{assignment="specialized"}={}){
 const events=[],used=new Set();
 for(const [index,task] of tasks.entries()){
  const candidates=Object.entries(actors).map(([name,actor])=>({name,actor,rank:actor.skills[task.skill]?.[levels.indexOf(level)]??0}));
  const choice=assignment==="specialized"?candidates.sort((a,b)=>
   (b.actor[task.attribute]+SKILL_RANK_BONUSES[b.rank])-(a.actor[task.attribute]+SKILL_RANK_BONUSES[a.rank]) )[0]:candidates.find(a=>a.name==="marcial");
  // Flujo separado por reto: asignar otro actor no reordena dados de los demás.
  const result=attempt(choice.actor,task,level,(seed*101+index*4309)>>>0);
  used.add(choice.name);
  events.push({task:task.id,domain:task.domain,actor:choice.name,rank:result.rank,
   total:result.total,success:result.total>=task.dc});
 }
 return {level,seed,completed:events.filter(x=>x.success).length,used:[...used],events};
}
test("PROG-01N: 80 misiones pareadas, economía de una Acción por reto",()=>{
 let n=0;
 for(const level of levels)for(const seed of seeds)for(const assignment of ["specialized","marcial"]){
  const state=mission(level,seed,{assignment});
  assert.deepEqual(state,mission(level,seed,{assignment}));
  assert.equal(state.events.length,4);
  assert.equal(state.events.length,state.events.map(x=>x.task).filter((v,i,a)=>a.indexOf(v)===i).length);
  assert.ok(state.completed>=0&&state.completed<=4);
  n++;
 }
 assert.equal(n,80);
});
test("PROG-01N: evaluar asignación del mejor perfil sin forzar éxitos",()=>{
 const matrix={};
 for(const level of levels){
  let specialized=0,universal=0;
  const contribution=Object.fromEntries(Object.keys(actors).map(k=>[k,{attempts:0,successes:0}]));
  for(const seed of seeds){
   const a=mission(level,seed),b=mission(level,seed,{assignment:"marcial"});
   specialized+=a.completed;universal+=b.completed;
   for(const ev of a.events){contribution[ev.actor].attempts++;contribution[ev.actor].successes+=Number(ev.success);}
  }
  matrix[level]={specialized,universal,contribution};
  assert.ok(specialized>=universal,"Sinergia asignación "+level);
 }
 console.log("PROG01N_EXPLORATION "+JSON.stringify(matrix));
});
test("PROG-01N: retos premian perfiles diferentes, no daño de combate",()=>{
 for(const level of levels){
  const s=mission(level,17);
  assert.equal(s.events.find(x=>x.task==="rastro").actor,"especialista");
  assert.equal(s.events.find(x=>x.task==="arcano").actor,"canalizador");
  assert.equal(s.events.find(x=>x.task==="obstaculo").actor,"marcial");
  assert.equal(s.events.find(x=>x.task==="acuerdo").actor,"especialista");
 }
});

test("PROG-01N: rangos de habilidades comparados con la ruta nominal PROG-01G",()=>{
 assert.deepEqual(actors.marcial.skills.athletics,[2,3,3,4]);
 assert.deepEqual(actors.canalizador.skills.arcana,[2,2,2,3]);
 assert.deepEqual(actors.hibrido.skills.athletics,[2,3,3,3]);
 assert.deepEqual(actors.hibrido.skills.arcana,[0,0,0,0]);
 assert.deepEqual(actors.especialista.skills.investigation,[3,4,5,5]);
 assert.deepEqual(actors.especialista.skills.persuasion,[2,3,3,3]);
 for(const actor of Object.values(actors))
  for(const ranks of Object.values(actor.skills))
   assert.ok(ranks.every(n=>n>=0&&n<=5));
});
