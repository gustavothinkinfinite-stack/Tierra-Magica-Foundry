import test from "node:test";
import assert from "node:assert/strict";
import { SKILL_RANK_BONUSES, minimumSpellRank } from "../scripts/rules/skills.mjs";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";

// PROG-01M: curvas exactas 2d10, frente al Bandido canónico de Defensa 13.
// NO representa enemigos balanceados para niveles 5–20. Conserva atributos de nivel 1.
const catalog=coreCatalog();
const spear=catalog.find(x=>x.type==="weapon"&&x.name==="Lanza");
const bolt=catalog.find(x=>x.type==="spell"&&x.name==="Proyectil Ígneo");
const stages={
 marcial:{attributes:{fue:3,int:1,agi:2,vig:2,vol:2},levels:[[5,3,0],[10,4,0],[15,5,0],[20,5,0]]},
 canalizador:{attributes:{fue:1,int:3,agi:2,vig:1,vol:3},levels:[[5,0,3],[10,0,4],[15,0,5],[20,0,5]]},
 hibrido:{attributes:{fue:3,int:2,agi:2,vig:2,vol:2},levels:[[5,3,3],[10,4,3],[15,5,4],[20,5,4]]},
 especialista:{attributes:{fue:1,int:3,agi:1,vig:2,vol:1},levels:[[5,0,0],[10,0,0],[15,0,0],[20,0,0]]}
};
function probability(bonus,defense){
 let hits=0;
 for(let d1=1;d1<=10;d1++)for(let d2=1;d2<=10;d2++)
  if(d1+d2+bonus>=defense)hits++;
 return hits/100;
}
function metrics(profile,level,arms,channel){
 const a=profile.attributes;
 const physical=probability(a.fue+SKILL_RANK_BONUSES[arms],13);
 const magic=channel>=minimumSpellRank(bolt.system.grade)?
  probability(a.int+SKILL_RANK_BONUSES[channel],13):null;
 const spearDamage=Math.max(0,spear.system.damage+a.fue-1);
 const magicDamage=Math.max(0,bolt.system.damage-Math.max(0,1-bolt.system.penetration));
 return {level,physical,magic,
  physicalExpected:Number((physical*spearDamage).toFixed(3)),
  magicExpected:magic===null?null:Number((magic*magicDamage).toFixed(3)),
  defense:11+a.agi+[0,0,1,2,3,4][arms],
  hp:10+2*a.vig,mana:6+3*a.vol};
}
test("PROG-01M: datos ofensivos canónicos y límites de la curva",()=>{
 assert.ok(spear&&bolt);
 assert.equal(spear.system.damage,5);
 assert.equal(bolt.system.damage,6);
 assert.equal(bolt.system.manaCost,3);
 assert.equal(probability(99,13),1);
 assert.equal(probability(-99,13),0);
});
for(const [name,profile]of Object.entries(stages)){
 test("PROG-01M: cuatro niveles de referencia, métricas exactas — "+name,()=>{
  let prev=-1;
  const results=[];
  for(const [level,arms,channel] of profile.levels){
   const row=metrics(profile,level,arms,channel);
   assert.ok(row.physical>=prev,name+" nivel "+level+" ataque marcial decreciente");
   prev=row.physical;
   assert.ok(row.magic===null||(row.magic>=0&&row.magic<=1));
   assert.ok(row.defense>=11);
   results.push(row);
  }
  assert.equal(results.length,4);
  if(name==="marcial"||name==="hibrido")
   assert.equal(results[3].physical,1);
  console.log("PROG01M_CURVE "+name+" "+JSON.stringify(results));
 });
}
test("PROG-01M: coincidencia física marcial/híbrido y divergencia mágica",()=>{
 for(let i=0;i<4;i++){
  const [lm,am,cm]=stages.marcial.levels[i];
  const [lh,ah,ch]=stages.hibrido.levels[i];
  const m=metrics(stages.marcial,lm,am,cm);
  const h=metrics(stages.hibrido,lh,ah,ch);
  assert.equal(m.physical,h.physical);
  assert.equal(m.physicalExpected,h.physicalExpected);
  assert.equal(m.defense,h.defense);
  assert.equal(m.magic,null);
  assert.ok(h.magic!==null);
 }
});
