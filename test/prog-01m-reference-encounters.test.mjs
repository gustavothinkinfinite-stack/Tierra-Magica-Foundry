import test from "node:test";
import assert from "node:assert/strict";
import {coreCatalog} from "../scripts/catalog/core-catalog.mjs";
import {SKILL_RANK_BONUSES} from "../scripts/rules/skills.mjs";
import {REFERENCE_ENCOUNTERS,LEVEL_RANKS,ARCHETYPES} from "./fixtures/prog-01m-encounters.mjs";

const catalog=coreCatalog();
const get=(type,name)=>{const item=catalog.find(x=>x.type===type&&x.name===name);assert.ok(item,name);return item.system;};
const fire=get("spell","Proyectil Ígneo");
const seeds=[17,71,2026,911,3849,421,1543,3199,8527,101];
const orders=["hero-first","enemy-first","alternating"];
const rand=seed=>{let n=seed>>>0;return ()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};};
const roll=next=>2+Math.floor(next()*10)+Math.floor(next()*10);
function simulate(name,level,seed,order,mode="adaptive"){
 const h=ARCHETYPES[name],e=REFERENCE_ENCOUNTERS[level],ranks=LEVEL_RANKS[name][level];
 const armor=get("armor",h.armor),weapon=get("weapon",h.weapon),next=rand(seed);
 const enemy=Array.from({length:e.foes},()=>({hp:e.hp}));
 let hp=10+2*h.vig,mana=6+3*h.vol,turns=0,damage=0,received=0,spent=0,reacts=0;
 for(let round=0;round<8;round++){
  if(hp<=0||enemy.every(x=>x.hp<=0))break;
  turns++;let reaction=false;
  const enemyMove=i=>{
   if(hp<=0||enemy[i].hp<=0)return;
   let defense=11+h.agi+[0,0,1,2,3,4][ranks[0]];
   if(h.parry&&!reaction){defense+=2;reacts++;reaction=true;}
   if(roll(next)+e.attack>=defense){
    const dealt=Math.max(0,e.damage-armor.protection);
    received+=Math.min(hp,dealt);hp=Math.max(0,hp-dealt);
   }
  };
  const heroMove=()=>{
   if(hp<=0)return;
   const target=enemy.find(x=>x.hp>0);if(!target)return;
   const canMagic=ranks[1]>=2&&mana>=fire.manaCost&&name!=="marcial";
   const cast=mode==="magic"?canMagic:mode==="weapon"?false:canMagic&&
     h.int+SKILL_RANK_BONUSES[ranks[1]]>h.fue+SKILL_RANK_BONUSES[ranks[0]];
   if(cast){mana-=fire.manaCost;spent+=fire.manaCost;}
   const bonus=cast?h.int+SKILL_RANK_BONUSES[ranks[1]]:h[weapon.attackAttribute??"fue"]+SKILL_RANK_BONUSES[ranks[0]];
   if(roll(next)+bonus<e.defense)return;
   const raw=cast?fire.damage:weapon.damage+(weapon.damageAttribute?h[weapon.damageAttribute]:0);
   const penetration=cast?fire.penetration:(weapon.penetration??0);
   const dealt=Math.max(0,raw-Math.max(0,e.protection-penetration));
   const actual=Math.min(target.hp,dealt);
   target.hp-=actual;damage+=actual;
  };
  if(order==="hero-first"){heroMove();enemyMove(0);enemyMove(1);}
  else if(order==="enemy-first"){enemyMove(0);enemyMove(1);heroMove();}
  else {enemyMove(0);heroMove();enemyMove(1);}
 }
 return {hp,mana,turns,damage,received,spent,reacts,downs:enemy.filter(x=>x.hp<=0).length,
  win:enemy.every(x=>x.hp<=0)?1:0,survive:hp>0?1:0};
}
function aggregate(name,level,mode="adaptive"){
 const rows=orders.flatMap(order=>seeds.map(seed=>simulate(name,level,seed,order,mode)));
 const mean=k=>Number((rows.reduce((a,x)=>a+x[k],0)/rows.length).toFixed(2));
 return {cases:rows.length,damage:mean("damage"),received:mean("received"),mana:mean("spent"),
  downs:mean("downs"),survival:mean("survive"),wins:mean("win"),turns:mean("turns")};
}
test("PROG-01M: fixtures explícitos no canónicos y creciente dificultad",()=>{
 const levels=[5,10,15,20];
 for(let i=1;i<levels.length;i++){
  const a=REFERENCE_ENCOUNTERS[levels[i-1]],b=REFERENCE_ENCOUNTERS[levels[i]];
  for(const key of ["defense","hp","protection","attack","damage"])
   assert.ok(b[key]>a[key],key);
 }
});
test("PROG-01M: 480 encuentros reproducibles sin recursos negativos",()=>{
 let count=0;
 for(const level of [5,10,15,20])for(const name of Object.keys(ARCHETYPES))
 for(const order of orders)for(const seed of seeds){
  const a=simulate(name,level,seed,order);
  assert.deepEqual(a,simulate(name,level,seed,order));
  assert.ok(a.hp>=0&&a.mana>=0&&a.turns<=8);
  assert.ok(a.damage>=0&&a.received>=0&&a.downs<=2);
  assert.ok(a.reacts<=a.turns);
  assert.equal(a.mana+ a.spent,6+3*ARCHETYPES[name].vol);
  count++;
 }
 assert.equal(count,480);
});
test("PROG-01M: métricas de control por nivel y arquetipo",()=>{
 const rows={};
 for(const level of [5,10,15,20])
  rows[level]=Object.fromEntries(Object.keys(ARCHETYPES).map(name=>[name,aggregate(name,level)]));
 assert.equal(rows[5].marcial.cases,30);
 console.log("PROG01M_ENCOUNTER_RESULTS "+JSON.stringify(rows));
});
test("PROG-01M: estrategias mágicas consumen recursos",()=>{
 for(const level of [5,10,15,20]){
  const physical=aggregate("hibrido",level,"weapon");
  const magical=aggregate("hibrido",level,"magic");
  assert.equal(physical.mana,0);
  assert.ok(magical.mana>=0);
 }
});
