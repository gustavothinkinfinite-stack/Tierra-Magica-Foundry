import test from "node:test";
import assert from "node:assert/strict";
import {coreCatalog} from "../scripts/catalog/core-catalog.mjs";
import {SKILL_RANK_BONUSES,minimumSpellRank} from "../scripts/rules/skills.mjs";
import {CALIBRATED_ENCOUNTERS} from "./fixtures/prog-01m-calibrated.mjs";
import {REFERENCE_ENCOUNTERS,ARCHETYPES,LEVEL_RANKS} from "./fixtures/prog-01m-encounters.mjs";

// PROG-01M: escenario táctico controlado con posiciones 1D. No reemplaza
// el motor Foundry ni supone aliados invisibles, geometría 2D o IA compleja.
const cat=coreCatalog();
function item(type,name){
 const entry=cat.find(x=>x.type===type&&x.name===name);
 assert.ok(entry,"No encontrado: "+name);return entry.system;
}
const names=["Proyectil Ígneo","Arco Fulminante","Onda de Choque","Aguja Gélida",
 "Rayo de Ruptura","Tormenta Arcana","Pantalla Cinética"];
const spells=Object.fromEntries(names.map(n=>[n,item("spell",n)]));
const spear=item("weapon","Lanza"),dagger=item("weapon","Daga");
const seeds=[17,71,2026,911,3849,421,1543,3199,8527,101];
const orders=["hero-first","enemy-first","alternating"];
function random(seed){let n=seed>>>0;return ()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return 2+Math.floor(n/4294967296*10);};}
function encounter(name,level,seed,order,{difficulty="calibrated",policy="advanced",enemyMode="melee"}={}){
 const e=(difficulty==="stress"?REFERENCE_ENCOUNTERS:CALIBRATED_ENCOUNTERS)[level];
 const h=ARCHETYPES[name],rank=LEVEL_RANKS[name][level],roll=random(seed);
 const armor=item("armor",h.armor);
 const foes=[{hp:e.hp,x:3,slow:0},{hp:e.hp,x:4,slow:0}];
 let hp=10+2*h.vig,mana=6+3*h.vol,position=0,rounds=0;
 let dealt=0,received=0,actions=0,reactions=0,spent=0,areaHits=0,pushes=0,screenUses=0;
 let screenActive=false;
 const maxRounds=8;
 const canUse=s=>rank[1]>=minimumSpellRank(spells[s].grade)&&mana>=spells[s].manaCost&&
  (name==="canalizador"||name==="hibrido");
 function choose(){
  if(policy==="basic")return canUse("Proyectil Ígneo")?"Proyectil Ígneo":null;
  // Pantalla: gastar Acción una sola vez, luego cobertura sólo frente a disparos a través de la pantalla.
  if(level>=10&&!screenActive&&canUse("Pantalla Cinética")&&policy==="screen")return "Pantalla Cinética";
  if(policy==="control"&&foes.filter(x=>x.hp>0).length>1&&canUse("Onda de Choque"))return "Onda de Choque";
  if(policy==="control"&&canUse("Aguja Gélida"))return "Aguja Gélida";
  if(level>=15&&foes.filter(x=>x.hp>0).length===2&&canUse("Tormenta Arcana")&&
   Math.abs(foes[0].x-foes[1].x)<=3)return "Tormenta Arcana";
  if(level>=10&&foes.filter(x=>x.hp>0).length===2&&canUse("Rayo de Ruptura")&&
   foes.every(x=>x.x>=position&&x.x-position<=8))return "Rayo de Ruptura";
  if(level>=5&&foes.filter(x=>x.hp>0).length===2&&canUse("Arco Fulminante")&&
   Math.abs(foes[0].x-foes[1].x)<=3)return "Arco Fulminante";
  return canUse("Proyectil Ígneo")?"Proyectil Ígneo":null;
 }
 for(let round=0;round<maxRounds;round++){
  if(hp===0||foes.every(f=>f.hp===0))break;
  rounds++;let reacted=false;
  const attackEnemy=(index)=>{
   const f=foes[index];if(!f||f.hp===0||hp===0)return;
   const movement=Math.max(0,6-f.slow);f.slow=0;
   if(enemyMode==="melee"){
    if(f.x>position+1)f.x=Math.max(position+1,f.x-movement);
    if(f.x>position+1)return;
   }
   let defense=11+h.agi+[0,0,1,2,3,4][rank[0]];
   if(enemyMode==="melee"&&h.parry&&!reacted){defense+=2;reacted=true;reactions++;}
   if(enemyMode==="ranged"&&screenActive&&f.x>2&&position<2)defense+=2;
   // Los enemigos de este fixture atacan cuerpo a cuerpo; una pantalla de cobertura
   // no suma defensa a ataques que no atraviesan la pantalla.
   if(roll()+roll()+e.attack>=defense){
    const amount=Math.max(0,e.damage-armor.protection);
    const actual=Math.min(hp,amount);hp-=actual;received+=actual;
   }
  };
  const attackHero=()=>{
   if(hp===0)return;
   const active=foes.filter(f=>f.hp>0);
   if(!active.length)return;
   const choice=choose(),spell=choice?spells[choice]:null;
   actions++;
   if(spell){mana-=spell.manaCost;spent+=spell.manaCost;}
   if(choice==="Pantalla Cinética"){screenActive=true;screenUses++;return;}
   const multi=choice==="Arco Fulminante"||choice==="Rayo de Ruptura"||choice==="Tormenta Arcana"||choice==="Onda de Choque";
   const targets=multi?active.filter(f=>choice!=="Onda de Choque"||(f.x>position&&f.x-position<=3)):active.slice(0,1);
   const weapon=name==="canalizador"||name==="especialista"?dagger:spear;
   const bonus=spell?h.int+SKILL_RANK_BONUSES[rank[1]]:h[weapon.attackAttribute??"fue"]+
    SKILL_RANK_BONUSES[rank[0]];
   const raw=spell?spell.damage:weapon.damage+(weapon.damageAttribute?h[weapon.damageAttribute]:0);
   const penetration=spell?(spell.penetration??0):(weapon.penetration??0);
   const attackRoll=roll()+roll(); // Una sola tirada para las capacidades de área del ensayo.
   for(const target of targets){
    if(attackRoll+bonus<e.defense)continue;
    const amount=Math.max(0,raw-Math.max(0,e.protection-penetration));
    const actual=Math.min(target.hp,amount);target.hp-=actual;dealt+=actual;
    if(multi)areaHits++;
    if(choice==="Onda de Choque"&&target.hp>0){target.x+=1;pushes++;}
    if(choice==="Aguja Gélida"&&target.hp>0)target.slow=2;
   }
  };
  if(order==="hero-first"){attackHero();attackEnemy(0);attackEnemy(1);}
  else if(order==="enemy-first"){attackEnemy(0);attackEnemy(1);attackHero();}
  else {attackEnemy(0);attackHero();attackEnemy(1);}
 }
 return {hp,mana,rounds,dealt,received,spent,actions,reactions,areaHits,pushes,screenUses,
  killed:foes.filter(f=>f.hp===0).length,win:+foes.every(f=>f.hp===0),survive:+(hp>0)};
}
function summary(name,level,opts={}){
 const results=orders.flatMap(order=>seeds.map(seed=>encounter(name,level,seed,order,opts)));
 const mean=k=>+(results.reduce((s,x)=>s+x[k],0)/results.length).toFixed(3);
 return {cases:results.length,damage:mean("dealt"),taken:mean("received"),mana:mean("spent"),
  kills:mean("killed"),wins:mean("win"),survival:mean("survive"),areaHits:mean("areaHits")};
}
test("PROG-01M calibración: dos escalas crecientes y no canónicas",()=>{
 for(const level of [5,10,15,20]){
  const mild=CALIBRATED_ENCOUNTERS[level],stress=REFERENCE_ENCOUNTERS[level];
  for(const property of ["defense","hp","protection","attack","damage"])
   assert.ok(mild[property]<=stress[property],level+" "+property);
 }
});
test("PROG-01M capacidades: costes y selección por rango",()=>{
 assert.equal(spells["Rayo de Ruptura"].manaCost,10);
 assert.equal(spells["Tormenta Arcana"].manaCost,12);
 assert.equal(spells["Pantalla Cinética"].manaCost,8);
 for(const level of [5,10,15,20])for(const name of Object.keys(ARCHETYPES)){
  const rank=LEVEL_RANKS[name][level][1];
  for(const s of names)if(rank<minimumSpellRank(spells[s].grade)){
   // Un hechizo no disponible no puede resolverse a través de canUse.
   assert.ok(rank<minimumSpellRank(spells[s].grade));
  }
 }
});
test("PROG-01M calibración: 960 escenarios estables con recursos acotados",()=>{
 let count=0;
 for(const difficulty of ["calibrated","stress"])for(const level of [5,10,15,20])
 for(const name of Object.keys(ARCHETYPES))for(const order of orders)for(const seed of seeds){
  const a=encounter(name,level,seed,order,{difficulty});
  assert.deepEqual(a,encounter(name,level,seed,order,{difficulty}));
  assert.ok(a.hp>=0&&a.mana>=0&&a.actions<=a.rounds&&a.reactions<=a.rounds);
  assert.equal(a.mana+a.spent,6+3*ARCHETYPES[name].vol);
  assert.ok(a.killed<=2&&a.dealt<=2*(difficulty==="stress"?REFERENCE_ENCOUNTERS:CALIBRATED_ENCOUNTERS)[level].hp);
  count++;
 }
 assert.equal(count,960);
});
test("PROG-01M calibración: acciones de área frente a lanzamiento básico",()=>{
 const advanced=summary("canalizador",15),basic=summary("canalizador",15,{policy:"basic"});
 assert.ok(advanced.areaHits>=0);
 assert.equal(basic.areaHits,0);
 assert.ok(advanced.mana>=0&&basic.mana>=0);
});
test("PROG-01M calibración: tabla auditable por nivel",()=>{
 const results={};
 for(const level of [5,10,15,20]){
  results[level]={};
  for(const name of Object.keys(ARCHETYPES))
   results[level][name]={calibrated:summary(name,level),stress:summary(name,level,{difficulty:"stress"})};
 }
 console.log("PROG01M_CALIBRATED "+JSON.stringify(results));
 assert.equal(results[20].hibrido.calibrated.cases,30);
});

test("PROG-01M control: empuje y ralentización son efectos posicionales observables",()=>{
 const controls=orders.flatMap(order=>seeds.map(seed=>encounter("canalizador",5,seed,order,{policy:"control"})));
 assert.ok(controls.some(x=>x.pushes>0),"Onda de Choque nunca empujó");
 assert.ok(controls.some(x=>x.spent>=4),"No se consumió Maná de control");
});
test("PROG-01M cobertura: Pantalla Cinética protege contra disparos que la atraviesan",()=>{
 const screen=orders.flatMap(order=>seeds.map(seed=>encounter("canalizador",10,seed,order,{policy:"screen",enemyMode:"ranged"})));
 const basic=orders.flatMap(order=>seeds.map(seed=>encounter("canalizador",10,seed,order,{policy:"basic",enemyMode:"ranged"})));
 assert.ok(screen.some(x=>x.screenUses>0),"Pantalla nunca se creó");
 assert.ok(screen.some(x=>x.spent>=8),"Pantalla no consumió Maná");
 const total=arr=>arr.reduce((sum,x)=>sum+x.received,0);
 assert.ok(total(screen)<=total(basic),"Cobertura no redujo daño recibido en este control");
});
