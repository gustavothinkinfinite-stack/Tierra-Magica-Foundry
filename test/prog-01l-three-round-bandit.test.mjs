import test from "node:test";
import assert from "node:assert/strict";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";

// PROG-01L: tres rondas fijas, no Monte Carlo ni IA táctica.
// Dos combatientes, distancia inicial 3, movimiento 6; ambos se perciben.
// Bandido: Manual Maestro, Vida 12, Defensa 13, Protección 1, ataque +4, daño 6.
const catalog=coreCatalog();
const weapon=catalog.find(x=>x.type==="weapon"&&x.name==="Lanza");
const projectile=catalog.find(x=>x.type==="spell"&&x.name==="Proyectil Ígneo");
const barrier=catalog.find(x=>x.type==="spell"&&x.name==="Barrera Cinética");
const rolls={player:[10,9,11],enemy:[11,10,12],initiativePlayer:11,initiativeEnemy:10};
const bandit={hp:12,defense:13,protection:1,attack:4,damage:6,per:2};
const builds={
  marcial:{hp:14,mana:12,agi:2,per:1,fue:3,int:1,weaponBonus:4,channelBonus:0,parry:true,spell:false,barrier:false},
  canalizador:{hp:12,mana:15,agi:2,per:2,fue:1,int:3,weaponBonus:0,channelBonus:4,parry:false,spell:true,barrier:true},
  hibrido:{hp:14,mana:12,agi:2,per:1,fue:3,int:2,weaponBonus:4,channelBonus:2,parry:true,spell:true,barrier:false},
  especialista:{hp:14,mana:9,agi:1,per:2,fue:1,int:3,weaponBonus:0,channelBonus:0,parry:false,spell:false,barrier:false}
};

function simulate(build,{strategy="weapon",defensePolicy="active"}={}){
  const state={hp:build.hp,mana:build.mana,enemyHp:bandit.hp,rounds:0,
    attacks:0,enemyAttacks:0,spentMana:0,damageDealt:0,damageTaken:0,
    reactions:0,initiativeWins:0,movement:0,trauma:0,log:[]};
  const playerFirst=rolls.initiativePlayer+build.per>rolls.initiativeEnemy+bandit.per;
  if(playerFirst)state.initiativeWins++;
  let distance=3;
  for(let round=0;round<3;round++){
    if(state.hp<=0||state.enemyHp<=0)break;
    state.rounds++;
    let reactionAvailable=true;
    const player=()=>{
      if(state.hp<=0||state.enemyHp<=0)return;
      if(strategy==="weapon"&&distance>1){
        const move=Math.min(6,distance-1);
        distance-=move;state.movement+=move;
      }
      const casting=strategy==="spell"&&build.spell&&state.mana>=projectile.system.manaCost;
      if(casting){
        state.mana-=projectile.system.manaCost;
        state.spentMana+=projectile.system.manaCost;
      }
      const canAttack=casting||distance<=1;
      if(!canAttack)return;
      state.attacks++;
      const modifier=casting?build.int+build.channelBonus:build.fue+build.weaponBonus;
      const total=rolls.player[round]+modifier;
      if(total>=bandit.defense){
        const damage=casting
          ?Math.max(0,projectile.system.damage-Math.max(0,bandit.protection-projectile.system.penetration))
          :Math.max(0,weapon.system.damage+build.fue-bandit.protection);
        state.enemyHp=Math.max(0,state.enemyHp-damage);state.damageDealt+=damage;
      }
      state.log.push({round,side:"player",casting,total,enemyHp:state.enemyHp,mana:state.mana});
    };
    const enemy=()=>{
      if(state.hp<=0||state.enemyHp<=0)return;
      if(distance>1){
        const move=Math.min(6,distance-1);distance-=move;
      }
      state.enemyAttacks++;
      let defense=11+build.agi+(build.weaponBonus===4?2:0);
      let reaction="none";
      if(reactionAvailable&&defensePolicy==="active"){
        if(build.parry&&distance<=1){defense+=2;reaction="parry";}
        else if(build.barrier&&state.mana>=barrier.system.manaCost){
          state.mana-=barrier.system.manaCost;state.spentMana+=barrier.system.manaCost;
          defense+=2;reaction="barrier";
        }
        if(reaction!=="none"){reactionAvailable=false;state.reactions++;}
      }
      const total=rolls.enemy[round]+bandit.attack;
      if(total>=defense){const damage=bandit.damage;state.hp=Math.max(0,state.hp-damage);state.damageTaken+=damage;}
      if(state.hp===0&&state.trauma===0)state.trauma=1;
      state.log.push({round,side:"bandit",total,defense,reaction,hp:state.hp,mana:state.mana});
    };
    if(playerFirst){player();enemy();}else{enemy();player();}
  }
  return state;
}

test("PROG-01L: datos de catálogo y economía de magia",()=>{
  assert.ok(weapon&&projectile&&barrier);
  assert.equal(weapon.system.damage,5);
  assert.equal(projectile.system.manaCost,3);
  assert.equal(projectile.system.damage,6);
  assert.equal(projectile.system.penetration,2);
  assert.equal(barrier.system.manaCost,3);
});
test("PROG-01L: tres rondas incluyen orden de iniciativa, movimiento, acción y reacción",()=>{
  const x=simulate(builds.marcial);
  assert.equal(x.initiativeWins,0); // empate 12 vs 12: decisión de mesa
  assert.equal(x.rounds,2);
  assert.equal(x.enemyHp,0);
  assert.equal(x.movement,0);
  assert.equal(x.damageDealt,14);
  assert.equal(x.reactions,2);
  assert.equal(x.damageTaken,0);
});
for(const [name,build]of Object.entries(builds)){
  test("PROG-01L: resultado determinista sin desbordar recursos "+name,()=>{
    const x=simulate(build,{strategy:name==="canalizador"?"spell":"weapon"});
    assert.ok(x.rounds>=1&&x.rounds<=3);
    assert.ok(x.hp>=0&&x.hp<=build.hp);
    assert.ok(x.enemyHp>=0&&x.enemyHp<=bandit.hp);
    assert.ok(x.mana>=0&&x.mana<=build.mana);
    assert.equal(x.spentMana,build.mana-x.mana);
    assert.ok(x.reactions<=x.rounds);
    assert.equal(x.trauma,x.hp===0?1:0);
  });
}
test("PROG-01L: híbrido puede elegir magia pero consume Maná",()=>{
  const weaponRoute=simulate(builds.hibrido);
  const magicRoute=simulate(builds.hibrido,{strategy:"spell"});
  assert.equal(weaponRoute.spentMana,0);
  assert.ok(magicRoute.spentMana>0);
  assert.ok(magicRoute.mana<weaponRoute.mana);
});
test("PROG-01L: Barrera Cinética consume Maná y una Reacción cuando ocurre el disparador",()=>{
  const active=simulate(builds.canalizador,{strategy:"spell",defensePolicy:"active"});
  const passive=simulate(builds.canalizador,{strategy:"spell",defensePolicy:"none"});
  assert.ok(active.reactions>0);
  assert.ok(active.spentMana>=passive.spentMana);
});
