import test from "node:test";
import assert from "node:assert/strict";
import {SKILL_RANK_BONUSES} from "../scripts/rules/skills.mjs";
import {coreCatalog} from "../scripts/catalog/core-catalog.mjs";
import {ARCHETYPES,LEVEL_RANKS} from "./fixtures/prog-01m-encounters.mjs";
import {CALIBRATED_ENCOUNTERS} from "./fixtures/prog-01m-calibrated.mjs";

// PROG-01M: control pareado abstracto. Apoyos son OBJETIVOS DE ESCENARIO,
// nunca bonificaciones de reglas ni capacidades gratuitas del especialista.
const items=coreCatalog();
function entry(type,name){const x=items.find(y=>y.type===type&&y.name===name);assert.ok(x,name);return x.system;}
const lance=entry("weapon","Lanza"),fire=entry("spell","Proyectil Ígneo"),mail=entry("armor","Malla");
const seeds=[17,71,2026,911,3849,421,1543,3199,8527,101];
function rng(seed){let n=seed>>>0;return ()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return 2+Math.floor(n/4294967296*10);};}
const bonus=[0,0,1,2,3,4];
function duel(name,level,seed,policy="weapon"){
 const h=ARCHETYPES[name],rank=LEVEL_RANKS[name][level],e=CALIBRATED_ENCOUNTERS[level],roll=rng(seed);
 let hp=10+2*h.vig,mana=6+3*h.vol,foe=e.hp,damage=0,received=0,spent=0;
 for(let round=0;round<8&&foe>0&&hp>0;round++){
  const casting=policy==="magic"&&name==="hibrido"&&mana>=fire.manaCost;
  if(casting){mana-=fire.manaCost;spent+=fire.manaCost;}
  const attack=roll()+roll()+(casting?h.int+SKILL_RANK_BONUSES[rank[1]]:h.fue+SKILL_RANK_BONUSES[rank[0]]);
  if(attack>=e.defense){
   const base=casting?fire.damage:lance.damage+h.fue;
   const pen=casting?fire.penetration:lance.penetration;
   const actual=Math.min(foe,Math.max(0,base-Math.max(0,e.protection-pen)));
   foe-=actual;damage+=actual;
  }
  if(foe===0)break;
  const defense=11+h.agi+bonus[rank[0]]+2; // Parada conocida en ambos perfiles.
  if(roll()+roll()+e.attack>=defense){
   const actual=Math.min(hp,Math.max(0,e.damage-mail.protection));
   hp-=actual;received+=actual;
  }
 }
 return {hp,mana,foe,damage,received,spent,win:+(foe===0),survive:+(hp>0)};
}
const ranks={
  5:{investigation:3,medicine:3,persuasion:2},
  10:{investigation:4,medicine:3,persuasion:3},
  15:{investigation:5,medicine:4,persuasion:3},
  20:{investigation:5,medicine:4,persuasion:3}
};
function cooperative(level,seed,withSpecialist=true){
 const roll=rng(seed);
 let success=0,failed=0,spentActions=0;
 // Tres objetivos narrativos explícitos: información, estabilizar recurso del
 // grupo, negociar paso. El éxito se mide como 2d10 + atributo + habilidad.
 // El resultado NO modifica el daño ni sana Vida: evita inventar reglas.
 const tasks=[
  {key:"investigation",attribute:3,df:17},
  {key:"medicine",attribute:3,df:17},
  {key:"persuasion",attribute:3,df:17}
 ];
 for(const task of tasks){
  spentActions++;
  const skillRank=withSpecialist?ranks[level][task.key]:0;
  const attribute=withSpecialist?task.attribute:1;
  const result=roll()+roll()+attribute+SKILL_RANK_BONUSES[skillRank];
  if(result>=task.df)success++;else failed++;
 }
 return {success,failed,spentActions};
}
test("PROG-01M control: equipo idéntico admisible para marcial e híbrido",()=>{
 assert.equal(mail.priceCopper+lance.priceCopper,1050);
 assert.ok(mail.strengthMin<=ARCHETYPES.marcial.fue);
 assert.ok(mail.strengthMin<=ARCHETYPES.hibrido.fue);
 for(const level of [5,10,15,20])for(const seed of seeds){
  assert.deepEqual(duel("marcial",level,seed),duel("hibrido",level,seed));
 }
});
test("PROG-01M control: el híbrido puede gastar Maná para cambiar de ruta",()=>{
 let uses=0;
 for(const level of [5,10,15,20])for(const seed of seeds){
  const a=duel("hibrido",level,seed,"weapon"),b=duel("hibrido",level,seed,"magic");
  assert.equal(a.spent,0);
  assert.ok(b.spent>=0);
  if(b.spent>0)uses++;
 }
 assert.ok(uses>0);
});
test("PROG-01M control: desafíos cooperativos valoran habilidad en vez de daño",()=>{
 let specialistSuccess=0,untrainedSuccess=0;
 for(const level of [5,10,15,20])for(const seed of seeds){
  const a=cooperative(level,seed,true),b=cooperative(level,seed,false);
  assert.equal(a.spentActions,3);
  assert.equal(a.success+a.failed,3);
  specialistSuccess+=a.success;untrainedSuccess+=b.success;
 }
 assert.ok(specialistSuccess>untrainedSuccess);
 console.log("PROG01M_COOP "+JSON.stringify({specialistSuccess,untrainedSuccess,cases:120}));
});
test("PROG-01M control: resumen pareado por nivel",()=>{
 const summary={};
 for(const level of [5,10,15,20]){
  const rows=seeds.map(seed=>({martial:duel("marcial",level,seed),hybridWeapon:duel("hibrido",level,seed),hybridMagic:duel("hibrido",level,seed,"magic")}));
  const mean=(key,metric)=>+(rows.reduce((s,x)=>s+x[key][metric],0)/rows.length).toFixed(2);
  summary[level]={martialDamage:mean("martial","damage"),hybridWeaponDamage:mean("hybridWeapon","damage"),
   hybridMagicDamage:mean("hybridMagic","damage"),hybridMagicMana:mean("hybridMagic","spent"),
   specialistTaskSuccess:seeds.reduce((s,seed)=>s+cooperative(level,seed).success,0)};
  assert.equal(summary[level].martialDamage,summary[level].hybridWeaponDamage);
 }
 console.log("PROG01M_PAIRED "+JSON.stringify(summary));
});
