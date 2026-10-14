import test from "node:test";
import assert from "node:assert/strict";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";

const catalog=coreCatalog();
const get=(type,name)=>{
 const item=catalog.find(x=>x.type===type&&x.name===name);
 assert.ok(item,"Falta "+type+" "+name);return item.system;
};
const spear=get("weapon","Lanza"), fire=get("spell","Proyectil Ígneo");
const armorNames=["Armadura ligera","Armadura reforzada","Malla"];
const armors=armorNames.map(name=>({name,...get("armor",name)}));
const heroes={
 marcial:{hp:14,mana:12,agi:2,per:1,fue:3,int:1,arms:4,channel:0,parry:true,magic:false},
 canalizador:{hp:12,mana:15,agi:2,per:2,fue:1,int:3,arms:0,channel:4,parry:false,magic:true},
 hibrido:{hp:14,mana:12,agi:2,per:1,fue:3,int:2,arms:4,channel:2,parry:true,magic:true},
 especialista:{hp:14,mana:9,agi:1,per:2,fue:1,int:3,arms:0,channel:0,parry:false,magic:false}
};
const seeds=[17,71,2026,911,3849,421,1543,3199,8527,101];
function rng(seed){let s=seed>>>0;return ()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};}
function roll(next){return 2+Math.floor(next()*10)+Math.floor(next()*10);}
function simulate(hero,{seed,order,armor,blocking=false,policy="best"}){
 const next=rng(seed),foes=[{hp:12,x:3},{hp:12,x:5}];
 const st={hp:hero.hp,mana:hero.mana,damage:0,received:0,effectiveDamage:0,
  spent:0,rounds:0,downs:0,trauma:0,actions:0,reactions:0,roundOrder:order,seed};
 let x=0;
 for(let round=0;round<6;round++){
  if(st.hp===0||foes.every(f=>f.hp===0))break;
  st.rounds++;
  let reacted=false;
  const enemy=i=>{
   const foe=foes[i];if(foe.hp<=0||st.hp<=0)return;
   if(foe.x>x+1)foe.x=x+1;
   if(Math.abs(foe.x-x)>1)return;
   let defense=11+hero.agi+(hero.arms===4?2:0);
   if(!reacted&&hero.parry){defense+=2;reacted=true;st.reactions++;}
   // Conservador: los lanzadores no gastan Barrera aquí, para aislar diferencias de armadura y orden.
   if(roll(next)+4>=defense){
    const dmg=Math.max(0,6-armor.protection);
    st.received+=dmg;
    st.hp=Math.max(0,st.hp-dmg);
    if(st.hp===0)st.trauma=1;
   }
  };
  const player=()=>{
   if(st.hp<=0)return;
   const foe=foes.find(f=>f.hp>0);if(!foe)return;
   const canCast=hero.magic&&st.mana>=fire.manaCost&&!blocking;
   const cast=policy==="spell"?canCast:policy==="weapon"?false:canCast&&hero.channel>hero.arms;
   if(!cast&&Math.abs(foe.x-x)>1)x=Math.min(foe.x-1,x+6);
   if(!cast&&Math.abs(foe.x-x)>1)return;
   if(cast){st.mana-=fire.manaCost;st.spent+=fire.manaCost;}
   st.actions++;
   const attack=roll(next)+(cast?hero.int+hero.channel:hero.fue+hero.arms);
   if(attack>=13){
    const raw=cast?fire.damage:spear.damage+hero.fue;
    const pen=cast?fire.penetration:spear.penetration;
    const damage=Math.max(0,raw-Math.max(0,1-pen));
    const effective=Math.min(damage,foe.hp);
    st.damage+=damage;st.effectiveDamage+=effective;
    foe.hp=Math.max(0,foe.hp-damage);
   }
  };
  if(order==="hero-first"){player();enemy(0);enemy(1);}
  else if(order==="enemy-first"){enemy(0);enemy(1);player();}
  else {enemy(0);player();enemy(1);}
 }
 st.downs=foes.filter(f=>f.hp===0).length;
 return st;
}
const sets=[];
for(const armor of armors)for(const order of ["hero-first","alternating","enemy-first"])
 for(const seed of seeds)sets.push({armor,order,seed});
function summarize(profile,policy="best"){
 const results=sets.map(set=>simulate(profile,{...set,policy}));
 const mean=key=>Number((results.reduce((sum,row)=>sum+row[key],0)/results.length).toFixed(3));
 return {cases:results.length,avgEffectiveDamage:mean("effectiveDamage"),avgDamageReceived:mean("received"),
  avgManaSpent:mean("spent"),avgEnemiesDown:mean("downs"),survivalRate:mean("hp"),
  survived:results.filter(x=>x.hp>0).length,won:results.filter(x=>x.downs===2).length};
}
test("PROG-01L-3: equipamiento legal de catálogo, sin incompatibilidad escudo/lanza",()=>{
 assert.equal(spear.priceCopper,50);
 assert.equal(spear.strengthMin,1);
 assert.equal(fire.manaCost,3);
 for(const armor of armors){
  assert.ok(armor.priceCopper+spear.priceCopper<=2000);
  for(const hero of Object.values(heroes)) assert.ok(hero.fue>=armor.strengthMin);
  assert.ok([1,2,3].includes(armor.protection));
 }
});
test("PROG-01L-3: 90 escenarios por arquetipo con dados repetibles y orden alternativo",()=>{
 assert.equal(sets.length,90);
 for(const [name,hero] of Object.entries(heroes)){
  const a=sets.map(set=>simulate(hero,set));
  const b=sets.map(set=>simulate(hero,set));
  assert.deepEqual(a,b,name);
  for(const result of a){
   assert.ok(result.hp>=0&&result.mana>=0);
   assert.ok(result.actions<=result.rounds);
   assert.ok(result.reactions<=result.rounds);
   assert.ok(result.downs<=2);
   assert.equal(result.spent,hero.mana-result.mana);
   assert.equal(result.trauma,result.hp===0?1:0);
   assert.ok(result.effectiveDamage<=result.damage);
  }
 }
});
test("PROG-01L-3: igualdad marcial/híbrido con política exclusivamente marcial",()=>{
 const martial=sets.map(set=>simulate(heroes.marcial,{...set,policy:"weapon"}));
 const hybrid=sets.map(set=>simulate(heroes.hibrido,{...set,policy:"weapon"}));
 assert.deepEqual(martial,hybrid);
});
test("PROG-01L-3: orden y protección cambian resultados de al menos un perfil",()=>{
 const profile=heroes.marcial;
 const light=seeds.map(seed=>simulate(profile,{seed,order:"enemy-first",armor:armors[0]}));
 const mail=seeds.map(seed=>simulate(profile,{seed,order:"enemy-first",armor:armors[2]}));
 assert.ok(mail.reduce((n,x)=>n+x.received,0)<light.reduce((n,x)=>n+x.received,0));
 const first=seeds.map(seed=>simulate(profile,{seed,order:"hero-first",armor:armors[0]}));
 assert.notDeepEqual(first,light);
});
test("PROG-01L-3: agregados por arquetipo",()=>{
 const rows=Object.fromEntries(Object.entries(heroes).map(([name,p])=>[name,summarize(p)]));
 assert.equal(rows.marcial.cases,90);
 assert.deepEqual(rows.marcial,rows.hibrido);
 for(const row of Object.values(rows)){
  assert.ok(row.survived>=0&&row.survived<=90);
  assert.ok(row.won>=0&&row.won<=90);
 }
});
