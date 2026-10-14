import test from "node:test";
import assert from "node:assert/strict";
import { TM_CONFIG } from "../scripts/config.mjs";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import { pdTotalForLevel } from "../scripts/rules/creation.mjs";
import { validateSkillProgression, minimumSpellRank } from "../scripts/rules/skills.mjs";

// Comprobaciones independientes de PROG-01I: puertas de habilidad y de magia.
// Cada rango es el rango ACUMULADO a un punto de control, no una compra adicional.
const paths={
 marcial:[
 [1,{martialWeapons:3,athletics:2,acrobatics:2,survival:2,stealth:2},25,false],
 [5,{martialWeapons:3,athletics:2,acrobatics:2,survival:2,stealth:2,heavyWeapons:2,rangedWeapons:2,handling:1},41,true],
 [10,{martialWeapons:4,athletics:3,acrobatics:2,survival:3,stealth:2,heavyWeapons:2,rangedWeapons:2,handling:2},60,true],
 [15,{martialWeapons:5,athletics:3,acrobatics:3,survival:3,stealth:3,heavyWeapons:2,rangedWeapons:2,handling:3},80,true],
 [20,{martialWeapons:5,athletics:4,acrobatics:3,survival:4,stealth:3,heavyWeapons:3,rangedWeapons:3,handling:3},100,true]],
 canalizador:[
 [1,{channeling:3,arcana:2,investigation:2,nature:2,survival:1},25,true],
 [5,{channeling:3,arcana:2,investigation:2,nature:2,survival:2},38,true],
 [10,{channeling:4,arcana:2,investigation:2,nature:2,survival:2},57,true],
 [15,{channeling:5,arcana:2,investigation:2,nature:3,survival:2},77,true],
 [20,{channeling:5,arcana:3,investigation:3,nature:4,survival:2},96,true]],
 hibrido:[
 [1,{martialWeapons:3,channeling:2,athletics:2,survival:2,stealth:1},25,false],
 [5,{martialWeapons:3,channeling:3,athletics:2,survival:2,stealth:2,acrobatics:2},40,false],
 [10,{martialWeapons:4,channeling:3,athletics:3,survival:2,stealth:2,acrobatics:2},59,true],
 [15,{martialWeapons:5,channeling:4,athletics:3,survival:2,stealth:2,acrobatics:2},78,true],
 [20,{martialWeapons:5,channeling:4,athletics:3,survival:3,stealth:2,acrobatics:3,nature:2},95,true]],
 especialista:[
 [1,{investigation:3,medicine:2,history:2,nature:2,persuasion:2,survival:2,arcana:2},25,false],
 [5,{investigation:3,medicine:3,history:3,nature:2,persuasion:2,survival:3,arcana:2,empathy:2},41,true],
 [10,{investigation:4,medicine:3,history:3,nature:3,persuasion:3,survival:3,arcana:3,empathy:2},59,true],
 [15,{investigation:5,medicine:4,history:3,nature:3,persuasion:3,survival:4,arcana:3,empathy:2},79,true],
 [20,{investigation:5,medicine:4,history:4,nature:4,persuasion:3,survival:4,arcana:4,empathy:2},97,true]]
};
for(const [name,stages] of Object.entries(paths)){
 test("PROG-01M: puertas de rangos 1/5/10/15/20 — "+name,()=>{
   let previous={};
   for(const [level,ranks,spent,hasSpec] of stages){
     assert.equal(pdTotalForLevel(level),25+4*(level-1));
     for(const [skill,rank] of Object.entries(ranks)){
       assert.ok(TM_CONFIG.skills[skill],name+" habilidad "+skill);
       assert.ok(rank>=(previous[skill]??0),name+" retroceso "+skill+" nivel "+level);
     }
     const skills=Object.fromEntries(Object.entries(ranks).map(([key,rank])=>[key,{rank}]));
     const specializationSkillKeys=hasSpec?[name==="especialista"||name==="canalizador"?"investigation":"martialWeapons"]:[];
     const result=validateSkillProgression({
       skills,skillDefinitions:TM_CONFIG.skills,level,pdSpent:spent,
       pdTotal:pdTotalForLevel(level),specializationSkillKeys,
       creationActive:level===1
     });
     assert.equal(result.valid,true,name+" nivel "+level+": "+JSON.stringify(result.issues));
     previous=ranks;
   }
 });
}
test("PROG-01M: grados de Evocación exigen Canalización suficiente por tramo",()=>{
 const catalog=coreCatalog();
 const spells=[
 ["Proyectil Ígneo",1,3],["Arco Fulminante",5,3],
 ["Aguja Gélida",5,3],["Pantalla Cinética",10,4],
 ["Rayo de Ruptura",10,4],["Tormenta Arcana",15,5]
 ];
 for(const [name,level,rank] of spells){
   const item=catalog.find(x=>x.type==="spell"&&x.name===name);
   assert.ok(item,"No se encontró "+name);
   assert.ok(rank>=minimumSpellRank(item.system.grade),
     name+" nivel "+level+" requiere "+minimumSpellRank(item.system.grade)+" pero tiene "+rank);
 }
});
test("PROG-01M: puertas reales rechazan Gran Maestro prematuro y sin especialización",()=>{
 const skills={martialWeapons:{rank:5}};
 const args={skills,skillDefinitions:TM_CONFIG.skills,pdSpent:21,pdTotal:101};
 const early=validateSkillProgression({...args,level:10,specializationSkillKeys:["martialWeapons"]});
 assert.ok(early.issues.some(x=>x.code==="rank-level"));
 const missing=validateSkillProgression({...args,level:15});
 assert.ok(missing.issues.some(x=>x.code==="grand-master-specialization"));
 const legal=validateSkillProgression({...args,level:15,specializationSkillKeys:["martialWeapons"]});
 assert.equal(legal.valid,true,JSON.stringify(legal.issues));
});
