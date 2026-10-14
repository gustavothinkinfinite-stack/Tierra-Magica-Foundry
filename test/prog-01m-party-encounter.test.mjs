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
function run(level,seed,{cooperation=true,threatPolicy="most-exposed"}={}){
 const roll=dice(seed),e=CALIBRATED_ENCOUNTERS[level];
 const names=["marcial","canalizador","hibrido","especialista"];
 const party=names.map(name=>{
  const h=ARCHETYPES[name],skills=LEVEL_RANKS[name][level];
  return {name,h,skills,hp:10+2*h.vig,mana:6+3*h.vol,defense:11+h.agi+[0,0,1,2,3,4][skills[0]],x:0,
   actions:0,reactions:0,moves:0,initiative:roll()+roll()+h.per};
 });
 const foes=Array.from({length:2},(_,i)=>({id:i,hp:e.hp,x:3+i,initiative:roll()+roll()+2}));
 const objectives={information:false,triage:false,negotiation:false};
 let progress=0,damage=0,damageTaken=0,turns=0,spells=0,parries=0;
 const targetOrder=()=>party.filter(p=>p.hp>0).sort((a,b)=>threatPolicy==="most-exposed"?
   a.hp-b.hp||a.name.localeCompare(b.name):b.defense-a.defense||a.name.localeCompare(b.name));
 const combatants=[...party.map(p=>({kind:"hero",entity:p})),...foes.map(f=>({kind:"foe",entity:f}))]
  .sort((a,b)=>b.entity.initiative-a.entity.initiative||
   (a.kind===b.kind?(a.entity.name??String(a.entity.id)).localeCompare(b.entity.name??String(b.entity.id)):
    a.kind==="hero"?-1:1));
 for(let round=0;round<8;round++){
  if(foes.every(f=>f.hp===0)||party.every(p=>p.hp===0))break;
  turns++;
  const reactionAvailable=new Set(party.filter(p=>p.hp>0).map(p=>p.name));
  for(const actor of combatants){
   if(foes.every(f=>f.hp===0)||party.every(p=>p.hp===0))break;
   if(actor.kind==="foe"){
    const f=actor.entity;if(f.hp===0)continue;
    const victim=targetOrder()[0];if(!victim)continue;
    if(f.x>victim.x+1)f.x=Math.max(victim.x+1,f.x-6);
    if(Math.abs(f.x-victim.x)>1)continue;
    let defense=victim.defense;
    if(victim.h.parry&&reactionAvailable.has(victim.name)){
     defense+=2;reactionAvailable.delete(victim.name);victim.reactions++;parries++;
    }
    if(roll()+roll()+e.attack>=defense){
     const protection=victim.name==="marcial"?4:victim.name==="canalizador"?2:3;
     const dealt=Math.min(victim.hp,Math.max(0,e.damage-protection));
     victim.hp-=dealt;damageTaken+=dealt;
    }
   }else{
    const p=actor.entity;if(p.hp===0)continue;
    p.actions++;
    const tasks=Object.entries(objectives).filter(([_,done])=>!done);
    if(cooperation&&p.name==="especialista"&&tasks.length){
     const [task]=tasks[0];
     const index={information:0,triage:1,negotiation:2}[task];
     const attr=index===2?3:3;
     const total=roll()+roll()+attr+SKILL_RANK_BONUSES[ranks[level][index]];
     if(total>=17){objectives[task]=true;progress++;}
     continue;
    }
    const f=foes.find(x=>x.hp>0);if(!f)continue;
    const cast=p.name==="canalizador"&&p.mana>=3;
    if(cast){p.mana-=3;spells++;}
    if(!cast&&Math.abs(f.x-p.x)>1){const step=Math.min(6,Math.max(0,f.x-p.x-1));p.x+=step;p.moves+=step;}
    if(!cast&&Math.abs(f.x-p.x)>1)continue;
    const bonus=cast?p.h.int+SKILL_RANK_BONUSES[p.skills[1]]:
      p.h.fue+SKILL_RANK_BONUSES[p.skills[0]];
    if(roll()+roll()+bonus>=e.defense){
     const raw=cast?6:5+p.h.fue;
     const penetration=cast?2:0;
     const dealt=Math.min(f.hp,Math.max(0,raw-Math.max(0,e.protection-penetration)));
     f.hp-=dealt;damage+=dealt;
    }
   }
  }
 }
 return {level,seed,turns,objectives,progress,damage,damageTaken,spells,parries,
  survivors:party.filter(p=>p.hp>0).length,foesDefeated:foes.filter(f=>f.hp===0).length,
  totalActions:party.reduce((s,p)=>s+p.actions,0),party:party.map(({name,hp,mana,actions,reactions,moves,initiative})=>
    ({name,hp,mana,actions,reactions,moves,initiative}))};
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
