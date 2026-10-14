import test from "node:test";
import assert from "node:assert/strict";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";

// PROG-01L-4: presupuestos de equipo diferenciados (no cambio de canon).
// Mantiene semillas/orden del ensayo anterior y documenta límites de alcance.
const catalog=coreCatalog();
const get=(type,name)=>{
  const item=catalog.find(x=>x.type===type&&x.name===name);
  assert.ok(item, "Falta "+type+": "+name);
  return item.system;
};
const configurations={
  marcial:{fue:3,agi:2,vig:2,per:1,int:1,weaponRank:3,channelRank:0,
    weapon:"Lanza",armor:"Armadura pesada",shield:null,spell:null},
  canalizador:{fue:1,agi:2,vig:1,per:2,int:3,weaponRank:0,channelRank:3,
    weapon:"Daga",armor:"Armadura reforzada",shield:null,spell:"Proyectil Ígneo"},
  hibrido:{fue:3,agi:2,vig:2,per:1,int:2,weaponRank:3,channelRank:2,
    weapon:"Lanza",armor:"Malla",shield:null,spell:"Proyectil Ígneo"},
  especialista:{fue:1,agi:1,vig:2,per:2,int:3,weaponRank:0,channelRank:0,
    weapon:"Daga",armor:"Malla",shield:null,spell:null}
};
const rankBonus=[0,1,2,4,6,8];
const defenseBonus=[0,0,1,2,3,4];
const diceSeeds=[17,71,2026,911,3849,421,1543,3199,8527,101];
const turnOrders=["hero-first","alternating","enemy-first"];
function random(seed){let n=seed>>>0;return ()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};}
function roll(next){return 2+Math.floor(next()*10)+Math.floor(next()*10);}
function loadout(profile){
  const weapon=get("weapon",profile.weapon),armor=get("armor",profile.armor);
  const spell=profile.spell?get("spell",profile.spell):null;
  return {weapon,armor,spell,spent:weapon.priceCopper+armor.priceCopper};
}
function encounter(profile,{seed,order,policy="specialized"}){
  const kit=loadout(profile),rnd=random(seed);
  const enemies=[{hp:12,position:3},{hp:12,position:5}];
  const state={hp:10+2*profile.vig,mana:6+3*(profile.manaVol??(profile===configurations.canalizador?3:profile===configurations.hibrido?2:profile===configurations.marcial?2:1)),
    dealt:0,taken:0,manaSpent:0,actions:0,rounds:0,kills:0};
  let playerPosition=0;
  for(let round=0;round<6;round++){
    if(state.hp===0||enemies.every(x=>x.hp===0))break;
    state.rounds++;
    let reactionUsed=false;
    function enemyAction(index){
      const foe=enemies[index];
      if(state.hp===0||foe.hp===0)return;
      if(foe.position>playerPosition+1)foe.position=playerPosition+1;
      if(Math.abs(foe.position-playerPosition)>1)return;
      let defense=11+profile.agi+defenseBonus[profile.weaponRank];
      if(!reactionUsed&&profile.weaponRank>=2&&profile.weapon==="Lanza"){
        defense+=2;reactionUsed=true;
      }
      const total=roll(rnd)+4;
      if(total>=defense){
        const amount=Math.max(0,6-kit.armor.protection);
        state.taken+=Math.min(state.hp,amount);
        state.hp=Math.max(0,state.hp-amount);
      }
    }
    function playerAction(){
      if(state.hp===0)return;
      const foe=enemies.find(x=>x.hp>0);
      if(!foe)return;
      const cast=policy!=="weapon"&&kit.spell&&state.mana>=kit.spell.manaCost
        &&(policy==="spell"||profile.channelRank>profile.weaponRank);
      if(!cast&&foe.position>playerPosition+1)
        playerPosition=Math.min(foe.position-1,playerPosition+6);
      if(!cast&&Math.abs(foe.position-playerPosition)>1)return;
      state.actions++;
      if(cast){state.mana-=kit.spell.manaCost;state.manaSpent+=kit.spell.manaCost;}
      const attribute=cast?profile.int:profile[kit.weapon.attackAttribute??"fue"];
      const bonus=cast?rankBonus[profile.channelRank]:rankBonus[profile.weaponRank];
      if(roll(rnd)+attribute+bonus<13)return;
      const raw=cast?kit.spell.damage:kit.weapon.damage+
        (kit.weapon.damageAttribute?profile[kit.weapon.damageAttribute]:0);
      const penetration=cast?kit.spell.penetration:kit.weapon.penetration;
      const amount=Math.max(0,raw-Math.max(0,1-(penetration??0)));
      const effective=Math.min(amount,foe.hp);
      state.dealt+=effective;foe.hp=Math.max(0,foe.hp-amount);
    }
    if(order==="hero-first"){playerAction();enemyAction(0);enemyAction(1);}
    else if(order==="enemy-first"){enemyAction(0);enemyAction(1);playerAction();}
    else {enemyAction(0);playerAction();enemyAction(1);}
  }
  state.kills=enemies.filter(x=>x.hp===0).length;
  return state;
}
function aggregate(profile,policy="specialized"){
  const results=[];
  for(const order of turnOrders)for(const seed of diceSeeds)
    results.push(encounter(profile,{seed,order,policy}));
  const avg=field=>Number((results.reduce((a,x)=>a+x[field],0)/results.length).toFixed(3));
  return {cases:results.length,meanEffectiveDamage:avg("dealt"),meanDamageTaken:avg("taken"),
    meanManaSpent:avg("manaSpent"),meanKills:avg("kills"),
    survivors:results.filter(x=>x.hp>0).length,wins:results.filter(x=>x.kills===2).length};
}
test("PROG-01L-4: cuatro equipos legales por PEI, FUE mínima y arma a dos manos",()=>{
  for(const [name,profile]of Object.entries(configurations)){
    const kit=loadout(profile);
    assert.ok(kit.spent<=2000,name+" PEI excedido");
    assert.ok(profile.fue>=kit.weapon.strengthMin||kit.weapon.strengthMin==null,name+" arma");
    assert.ok(profile.fue>=kit.armor.strengthMin,name+" armadura");
    assert.equal(profile.shield,null,name+" no empuña escudo incompatible");
  }
});
test("PROG-01L-4: comparación de 30 escenas por equipo y política",()=>{
  for(const [name,profile]of Object.entries(configurations)){
    const a=aggregate(profile),b=aggregate(profile);
    assert.deepEqual(a,b,name+" no reproducible");
    assert.equal(a.cases,30);
    assert.ok(a.meanEffectiveDamage>=0&&a.meanEffectiveDamage<=24);
    assert.ok(a.survivors>=0&&a.survivors<=30);
    assert.ok(a.wins>=0&&a.wins<=30);
  }
});
test("PROG-01L-4: comparar al híbrido con lanza y con magia",()=>{
  const physical=aggregate(configurations.hibrido,"weapon");
  const magical=aggregate(configurations.hibrido,"spell");
  assert.equal(physical.meanManaSpent,0);
  assert.ok(magical.meanManaSpent>0);
});
test("PROG-01L-4: resistencia mejora al cambiar malla por armadura pesada sin superar PEI",()=>{
  const profile=configurations.marcial;
  const heavy=aggregate(profile);
  const mail=aggregate({...profile,armor:"Malla"});
  assert.ok(heavy.meanDamageTaken<=mail.meanDamageTaken);
});
test("PROG-01L-4: registrar métricas de equipos diferenciados",()=>{
  const rows=Object.fromEntries(Object.entries(configurations).map(([name,p])=>
    [name,{equipment:{weapon:p.weapon,armor:p.armor,spentCopper:loadout(p).spent},
      result:aggregate(p)}]));
  assert.equal(Object.keys(rows).length,4);
  console.log("PROG01L4_AGGREGATES "+JSON.stringify(rows));
});
