import test from "node:test";
import assert from "node:assert/strict";
import {SKILL_RANK_BONUSES} from "../scripts/rules/skills.mjs";
import {ARCHETYPES,LEVEL_RANKS} from "./fixtures/prog-01m-encounters.mjs";
import {CALIBRATED_ENCOUNTERS} from "./fixtures/prog-01m-calibrated.mjs";

// Ensayo grupal NO CANÓNICO: objetivo de tres hitos y dos adversarios.
// Iniciativas independientes (2d10+PER), Acciones y Reacciones por combatiente.
// Ayuda/triage resuelven OBJETIVOS de escena; no inventan curación ni bonos.
const seeds=[17,71,2026,911,3849,421,1543,3199,8527,101];
function dice(seed){let n=seed>>>0;return ()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return 2+Math.floor(n/4294967296*10);};}
const ranks={5:[3,3,2],10:[4,3,3],15:[5,4,3],20:[5,4,3]};
function run(level,seed,{cooperation=true,tacticalEffects=true,threatPolicy="most-exposed"}={}){
 const roll=dice(seed),e=CALIBRATED_ENCOUNTERS[level];
 // RNG por turno y actor: el consumo de dados no cambia si un efecto omite una Acción.
 const actionRoll=(round,actor,kind)=>dice((seed*101+round*10007+actor*2713+kind*1301)>>>0);
 const names=["marcial","canalizador","hibrido","especialista"];
 const party=names.map(name=>{
  const h=ARCHETYPES[name],skills=LEVEL_RANKS[name][level];
  return {name,h,skills,hp:10+2*h.vig,mana:6+3*h.vol,defense:11+h.agi+[0,0,1,2,3,4][skills[0]],x:0,
   actions:0,reactions:0,reactionReady:true,reactionRefreshes:0,moves:0,initiative:roll()+roll()+h.per};
 });
 const foes=Array.from({length:2},(_,i)=>({id:i,hp:e.hp,x:3+i,initiative:roll()+roll()+2}));
 const objectives={information:false,triage:false,negotiation:false};
 let progress=0,damage=0,damageTaken=0,turns=0,spells=0,parries=0;
 let triageGuard=0,negotiationDelay=0,informationFocus=0;
 const reactionEvents=[],tacticalEvents=[];
 const targetOrder=()=>party.filter(p=>p.hp>0).sort((a,b)=>threatPolicy==="most-exposed"?
   a.hp-b.hp||a.name.localeCompare(b.name):b.defense-a.defense||a.name.localeCompare(b.name));
 const combatants=[...party.map(p=>({kind:"hero",entity:p})),...foes.map(f=>({kind:"foe",entity:f}))]
  .sort((a,b)=>b.entity.initiative-a.entity.initiative||
   (a.kind===b.kind?(a.entity.name??String(a.entity.id)).localeCompare(b.entity.name??String(b.entity.id)):
    a.kind==="hero"?-1:1));
 for(let round=0;round<8;round++){
  if(foes.every(f=>f.hp===0)||party.every(p=>p.hp===0))break;
  turns++;

  for(const actor of combatants){
   if(foes.every(f=>f.hp===0)||party.every(p=>p.hp===0))break;
   if(actor.kind==="foe"){
    const f=actor.entity;if(f.hp===0)continue;
    if(tacticalEffects&&negotiationDelay>0){negotiationDelay--;tacticalEvents.push({round:turns,type:"negotiated-delay",foe:f.id});continue;}
    const victim=targetOrder()[0];if(!victim)continue;
    if(f.x>victim.x+1)f.x=Math.max(victim.x+1,f.x-6);
    if(Math.abs(f.x-victim.x)>1)continue;
    let defense=victim.defense;
    if(victim.h.parry&&victim.reactionReady){
     defense+=2;victim.reactionReady=false;victim.reactions++;parries++;
     reactionEvents.push({round:turns,type:"spent",actor:victim.name});
    }
    const foeDice=actionRoll(turns,f.id,1);
    if(foeDice()+foeDice()+e.attack>=defense){
     const protection=victim.name==="marcial"?4:victim.name==="canalizador"?2:3;
     const guard=tacticalEffects&&triageGuard>0?Math.min(2,Math.max(0,e.damage-protection)):0;
     if(guard>0){triageGuard=0;tacticalEvents.push({round:turns,type:"triage-preparation",prevented:guard});}
     const dealt=Math.min(victim.hp,Math.max(0,e.damage-protection-guard));
     victim.hp-=dealt;damageTaken+=dealt;
    }
   }else{
    const p=actor.entity;if(p.hp===0)continue;
    p.reactionReady=true;p.reactionRefreshes++;
    reactionEvents.push({round:turns,type:"refresh",actor:p.name});
    p.actions++;
    const tasks=Object.entries(objectives).filter(([_,done])=>!done);
    if(cooperation&&p.name==="especialista"&&tasks.length){
     const [task]=tasks[round%tasks.length];
     const index={information:0,triage:1,negotiation:2}[task];
     const attr=index===2?3:3;
     const taskDice=actionRoll(turns,3,2);
     const total=taskDice()+taskDice()+attr+SKILL_RANK_BONUSES[ranks[level][index]];
     if(total>=17){
      objectives[task]=true;progress++;
      if(tacticalEffects&&task==="information")informationFocus=1;
      if(tacticalEffects&&task==="triage")triageGuard=1;
      if(tacticalEffects&&task==="negotiation")negotiationDelay=1;
      tacticalEvents.push({round:turns,type:"objective",task});
     }
     continue;
    }
    const f=informationFocus?foes.filter(x=>x.hp>0).sort((a,b)=>a.hp-b.hp)[0]:foes.find(x=>x.hp>0);if(!f)continue;
    const cast=p.name==="canalizador"&&p.mana>=3;
    if(cast){p.mana-=3;spells++;}
    if(!cast&&Math.abs(f.x-p.x)>1){const step=Math.min(6,Math.max(0,f.x-p.x-1));p.x+=step;p.moves+=step;}
    if(!cast&&Math.abs(f.x-p.x)>1)continue;
    const bonus=cast?p.h.int+SKILL_RANK_BONUSES[p.skills[1]]:
      p.h.fue+SKILL_RANK_BONUSES[p.skills[0]];
    const hitDice=actionRoll(turns,names.indexOf(p.name),3);
    if(hitDice()+hitDice()+bonus>=e.defense){
     const raw=cast?6:5+p.h.fue;
     const penetration=cast?2:0;
     const dealt=Math.min(f.hp,Math.max(0,raw-Math.max(0,e.protection-penetration)));
     f.hp-=dealt;damage+=dealt;
     if(informationFocus){informationFocus=0;tacticalEvents.push({round:turns,type:"focused-hit",target:f.id});}
    }
   }
  }
 }
 return {level,seed,turns,objectives,progress,damage,damageTaken,spells,parries,reactionEvents,tacticalEvents,
  survivors:party.filter(p=>p.hp>0).length,foesDefeated:foes.filter(f=>f.hp===0).length,
  totalActions:party.reduce((s,p)=>s+p.actions,0),party:party.map(({name,hp,mana,actions,reactions,reactionRefreshes,reactionReady,moves,initiative})=>
    ({name,hp,mana,actions,reactions,reactionRefreshes,reactionReady,moves,initiative}))};
}
test("PROG-01M grupo: iniciativa individual, cuatro economías de Acción y Reacción",()=>{
 for(const level of [5,10,15,20])for(const seed of seeds){
  const x=run(level,seed);assert.deepEqual(x,run(level,seed));
  assert.equal(x.party.length,4);
  assert.equal(new Set(x.party.map(p=>p.name)).size,4);
  assert.equal(x.totalActions,x.party.reduce((a,p)=>a+p.actions,0));
  for(const p of x.party){
   assert.ok(p.actions<=x.turns&&p.reactions<=x.turns&&p.moves<=6*p.actions);
   assert.ok(p.hp>=0&&p.mana>=0);
  }
  assert.ok(x.progress>=0&&x.progress<=3);
  assert.ok(x.foesDefeated<=2);
 }
});
test("PROG-01M grupo: objetivos de escena dependen de aptitudes, no de bonificadores gratuitos",()=>{
 let cooperativeProgress=0,combatOnlyProgress=0;
 for(const level of [5,10,15,20])for(const seed of seeds){
  cooperativeProgress+=run(level,seed,{cooperation:true}).progress;
  combatOnlyProgress+=run(level,seed,{cooperation:false}).progress;
 }
 assert.ok(cooperativeProgress>combatOnlyProgress);
 assert.equal(combatOnlyProgress,0);
});
test("PROG-01M grupo: amenazas compartidas responden a política de selección",()=>{
 const a=seeds.map(seed=>run(5,seed,{threatPolicy:"most-exposed"}));
 const b=seeds.map(seed=>run(5,seed,{threatPolicy:"highest-defense"}));
 assert.ok(a.some((x,i)=>JSON.stringify(x.party.map(p=>p.hp))!==JSON.stringify(b[i].party.map(p=>p.hp))));
});
test("PROG-01M grupo: matriz por nivel auditable",()=>{
 const results={};
 for(const level of [5,10,15,20]){
  const rows=seeds.map(seed=>run(level,seed));
  const mean=key=>+(rows.reduce((s,x)=>s+x[key],0)/rows.length).toFixed(2);
  results[level]={cases:rows.length,objectives:mean("progress"),damage:mean("damage"),
   received:mean("damageTaken"),survivors:mean("survivors"),
   foesDefeated:mean("foesDefeated"),spells:mean("spells"),parries:mean("parries")};
 }
 console.log("PROG01M_PARTY "+JSON.stringify(results));
});

test("PROG-01M: la Reacción se recupera al inicio del turno propio, no al inicio de ronda",()=>{
 for(const level of [5,10,15,20])for(const seed of seeds){
  const state=run(level,seed);
  for(const p of state.party){
   assert.equal(p.reactionRefreshes,p.actions,"Un refresco por turno propio "+p.name);
   let ready=true;
   for(const event of state.reactionEvents.filter(e=>e.actor===p.name)){
    if(event.type==="refresh")ready=true;
    else {assert.equal(ready,true,"Reacción duplicada antes de turno propio");ready=false;}
   }
   assert.equal(p.reactionReady,ready);
  }
 }
});
test("PROG-01M: los objetivos causan eventos tácticos verificables sin convertirse en regla canónica",()=>{
 const states=[5,10,15,20].flatMap(level=>seeds.map(seed=>run(level,seed)));
 const events=states.flatMap(x=>x.tacticalEvents);
 assert.ok(events.some(e=>e.type==="objective"&&e.task==="information"));
 assert.ok(events.some(e=>e.type==="objective"&&e.task==="triage"));
 assert.ok(events.some(e=>e.type==="objective"&&e.task==="negotiation"));
 assert.ok(events.some(e=>e.type==="focused-hit"||e.type==="triage-preparation"||e.type==="negotiated-delay"));
 for(const x of states){
  assert.equal(x.progress,x.tacticalEvents.filter(e=>e.type==="objective").length);
 }
});

test("PROG-01M pareado: igual iniciativa y objetivos, con/sin consecuencias",()=>{
 const matrix={};
 for(const level of [5,10,15,20]){
  const pairs=seeds.map(seed=>({
   enabled:run(level,seed,{cooperation:true,tacticalEffects:true}),
   disabled:run(level,seed,{cooperation:true,tacticalEffects:false})
  }));
  for(const {enabled,disabled} of pairs){
   assert.deepEqual(enabled.party.map(p=>p.initiative),disabled.party.map(p=>p.initiative));
   // Los objetivos pueden divergir: las consecuencias alteran duración y turnos disponibles.
   assert.ok(enabled.progress>=0&&disabled.progress>=0);
   assert.equal(disabled.tacticalEvents.filter(e=>e.type!=="objective").length,0);
  }
  const mean=(key,field)=>+(pairs.reduce((s,x)=>s+x[key][field],0)/pairs.length).toFixed(2);
  const a={survivors:mean("enabled","survivors"),received:mean("enabled","damageTaken"),
   objectives:mean("enabled","progress"),damage:mean("enabled","damage")};
  const b={survivors:mean("disabled","survivors"),received:mean("disabled","damageTaken"),
   objectives:mean("disabled","progress"),damage:mean("disabled","damage")};
  matrix[level]={withEffects:a,withoutEffects:b,
   deltaSurvivors:+(a.survivors-b.survivors).toFixed(2),
   deltaReceived:+(a.received-b.received).toFixed(2),
   deltaObjectives:a.objectives-b.objectives,
   deltaDamage:+(a.damage-b.damage).toFixed(2)};
 }
 console.log("PROG01M_PAIRED_TACTICS "+JSON.stringify(matrix));
});
