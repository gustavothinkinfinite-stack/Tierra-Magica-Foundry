import test from "node:test";
import assert from "node:assert/strict";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";

// PROG-01L-2: dos bandidos activos; posiciones abstractas 1D y muro infranqueable
// para ataques directos hasta alcanzar una casilla con línea de visión.
// Control determinista (no motor Foundry ni IA de enemigos).
const catalog=coreCatalog();
const find=(type,name)=>catalog.find(x=>x.type===type&&x.name===name);
const lance=find("weapon","Lanza"),bolt=find("spell","Proyectil Ígneo"),barrier=find("spell","Barrera Cinética");
const bandit={hp:12,defense:13,protection:1,attack:4,damage:6};
const heroes={
 marcial:{hp:14,mana:12,agi:2,per:1,fue:3,int:1,arms:4,channel:0,parry:true,spell:false,barrier:false},
 canalizador:{hp:12,mana:15,agi:2,per:2,fue:1,int:3,arms:0,channel:4,parry:false,spell:true,barrier:true},
 hibrido:{hp:14,mana:12,agi:2,per:1,fue:3,int:2,arms:4,channel:2,parry:true,spell:true,barrier:false},
 especialista:{hp:14,mana:9,agi:1,per:2,fue:1,int:3,arms:0,channel:0,parry:false,spell:false,barrier:false}
};
const dice={hero:[10,8,12,9,11,10],foes:[[12,10,8,11,9,12],[9,12,11,8,10,9]]};
function simulate(hero,{layout="open",policy="best"}={}){
 const state={life:hero.hp,mana:hero.mana,foes:[{hp:12,x:3},{hp:12,x:5}],x:0,
  rounds:0,actions:0,reactions:0,moves:0,spent:0,damage:0,received:0,
  downed:0,trauma:0,log:[]};
 const hasSight=()=>layout!=="blocked"||state.x>=2;
 for(let round=0;round<6;round++){
  if(state.life<=0||state.foes.every(f=>f.hp===0))break;
  state.rounds++;
  // Iniciativa de referencia: enemigo A, héroe, enemigo B. Empate resuelto previamente.
  const acted={hero:false};
  const foesAttack=(index)=>{
   const f=state.foes[index];if(f.hp===0||state.life===0)return;
   const dist=Math.abs(f.x-state.x);
   if(dist>1)f.x=Math.max(state.x+1,f.x-6);
   if(Math.abs(f.x-state.x)>1)return;
   let defense=11+hero.agi+(hero.arms===4?2:0);
   let reaction="none";
   if(!acted.reacted){
    if(hero.parry){defense+=2;reaction="parry";}
    else if(hero.barrier&&state.mana>=barrier.system.manaCost){
     state.mana-=barrier.system.manaCost;state.spent+=barrier.system.manaCost;
     defense+=2;reaction="barrier";
    }
   }
   if(reaction!=="none"){acted.reacted=true;state.reactions++;}
   const total=dice.foes[index][round]+bandit.attack;
   if(total>=defense){
    state.life=Math.max(0,state.life-bandit.damage);state.received+=bandit.damage;
    if(state.life===0&&state.trauma===0)state.trauma=1;
   }
   state.log.push({round:round+1,who:"foe"+index,total,reaction,life:state.life});
  };
  const heroAct=()=>{
   if(state.life<=0)return;
   let target=state.foes.find(f=>f.hp>0);
   if(!target)return;
   const availableSpell=hero.spell&&state.mana>=bolt.system.manaCost&&hasSight();
   let cast=policy==="spell" ? availableSpell : policy==="weapon" ? false :
    availableSpell&&hero.channel>hero.arms;
   if(!cast && Math.abs(target.x-state.x)>1){
    const distance=Math.min(6,Math.max(0,target.x-state.x-1));
    state.x+=distance;state.moves+=distance;
   }
   target=state.foes.find(f=>f.hp>0);
   if(!target)return;
   if(cast&&!hasSight())cast=false;
   if(!cast&&Math.abs(target.x-state.x)>1)return;
   if(cast){state.mana-=bolt.system.manaCost;state.spent+=bolt.system.manaCost;}
   state.actions++;
   const bonus=cast?hero.int+hero.channel:hero.fue+hero.arms;
   const total=dice.hero[round]+bonus;
   if(total>=bandit.defense){
    const raw=cast?bolt.system.damage:lance.system.damage+hero.fue;
    const penetration=cast?bolt.system.penetration:lance.system.penetration;
    const dealt=Math.max(0,raw-Math.max(0,bandit.protection-penetration));
    target.hp=Math.max(0,target.hp-dealt);state.damage+=dealt;
   }
   state.log.push({round:round+1,who:"hero",cast,total,foes:state.foes.map(f=>f.hp)});
  };
  foesAttack(0);heroAct();foesAttack(1);
 }
 state.downed=state.foes.filter(f=>f.hp===0).length;
 return state;
}
test("PROG-01L-2: dependencias de catálogo",()=>{
 assert.ok(lance&&bolt&&barrier);
 assert.equal(lance.system.damage,5);
 assert.equal(bolt.system.manaCost,3);
});
for(const [name,hero]of Object.entries(heroes)){
 for(const layout of ["open","blocked"]){
  test("PROG-01L-2: seis rondas y dos oponentes — "+name+" "+layout,()=>{
   const r=simulate(hero,{layout});
   assert.ok(r.rounds>=1&&r.rounds<=6);
   assert.ok(r.actions<=r.rounds);
   assert.ok(r.reactions<=r.rounds);
   assert.ok(r.moves<=6*r.rounds);
   assert.equal(hero.mana-r.mana,r.spent);
   assert.ok(r.life>=0&&r.mana>=0);
   assert.equal(r.trauma,r.life===0?1:0);
   assert.ok(r.downed>=0&&r.downed<=2);
   assert.equal(r.log.filter(x=>x.who==="hero").length,r.actions);
  });
 }
}
test("PROG-01L-2: coste de oportunidad híbrido (estrategias y cobertura de línea)",()=>{
 const melee=simulate(heroes.hibrido,{policy:"weapon"});
 const magic=simulate(heroes.hibrido,{policy:"spell"});
 assert.equal(melee.spent,0);
 assert.ok(magic.spent>0);
 const blocked=simulate(heroes.canalizador,{layout:"blocked",policy:"spell"});
 assert.ok(blocked.actions<=blocked.rounds);
});
test("PROG-01L-2: resumen acumulado reproducible de las cuatro rutas",()=>{
 const rows=Object.entries(heroes).map(([name,hero])=>({name,...simulate(hero)}));
 assert.equal(rows.length,4);
 for(const row of rows){
  assert.ok(Number.isInteger(row.damage));
  assert.ok(Number.isInteger(row.received));
  assert.ok(row.damage>=0&&row.received>=0);
 }
});
