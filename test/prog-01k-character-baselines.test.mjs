import test from "node:test";
import assert from "node:assert/strict";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import { validateInitialAttributes, deriveDevelopmentBudget } from "../scripts/rules/creation.mjs";
import { validateSkillProgression } from "../scripts/rules/skills.mjs";
import { TM_CONFIG } from "../scripts/config.mjs";

const catalog=coreCatalog();
const item=(type,name)=> {
  const result=catalog.find(entry=>entry.type===type&&entry.name===name);
  assert.ok(result,"Falta entrada "+type+"/"+name);
  return result;
};
const costs={skill:[0,1,3,7,13,21]};
const common={
  ancestry:"Hobgoblin",origin:"Valdoriano",originFacet:"servicio cívico y milicias",
  background:"Servicio Militar o Guardia",backgroundFacets:["guardias y rondas","logística militar"],
  languages:["Común de Concordia","Valdoriano"],
  comparisonWeapon:"Lanza",comparisonPriceCopper:50,
  traits:["Sentido Agudo","Anfibio","Afinidad Sobrenatural"]
};
// Sin equipamento protector: experimento de control, no inventario aventurero completo.
const profiles={
  marcial:{attributes:{fue:3,agi:2,vig:2,int:1,per:1,vol:2,pre:2},
    skills:{martialWeapons:3,athletics:2,acrobatics:2,survival:2,stealth:2},
    purchases:[["technique","Parada"],["technique","Golpe Potente"],["technique","Recibir Carga"]],
    expected:{pd:25,attackSkillBonus:4,defenseBonus:2}},
  canalizador:{attributes:{fue:1,agi:2,vig:1,int:3,per:2,vol:3,pre:1},
    skills:{channeling:3,arcana:2,investigation:2,nature:2,survival:1},
    purchases:[["discipline","Evocación"],["spell","Proyectil Ígneo"],["spell","Luz Arcana"],["spell","Barrera Cinética"],["specialization","Archivística"]],
    expected:{pd:25,attackSkillBonus:0,defenseBonus:0}},
  hibrido:{attributes:{fue:3,agi:2,vig:2,int:2,per:1,vol:2,pre:1},
    skills:{martialWeapons:3,channeling:2,athletics:2,survival:2,stealth:1},
    purchases:[["discipline","Evocación"],["spell","Proyectil Ígneo"],["technique","Parada"],["technique","Golpe Potente"]],
    expected:{pd:25,attackSkillBonus:4,defenseBonus:2}},
  especialista:{attributes:{fue:1,agi:1,vig:2,int:3,per:2,vol:1,pre:3},
    skills:{investigation:3,medicine:2,history:2,nature:2,persuasion:2,survival:2,arcana:2},
    purchases:[],expected:{pd:25,attackSkillBonus:0,defenseBonus:0}}
};
const skillBonuses=[0,1,2,4,6,8];
for(const [name,profile]of Object.entries(profiles)){
  test("PROG-01K: ficha comparativa nivel 1 "+name,()=>{
    const attrs=Object.fromEntries(Object.entries(profile.attributes).map(([key,value])=>[key,{creationValue:value,baseValue:value}]));
    assert.equal(validateInitialAttributes(attrs).valid,true);
    assert.equal(Object.values(profile.attributes).reduce((a,b)=>a+b,0),13);
    const skills=Object.fromEntries(Object.entries(profile.skills).map(([key,rank])=>[key,{rank}]));
    const acquired=profile.purchases.map(([type,title])=>{
      const candidate=item(type,title);
      const cost=candidate.system.costs.find(entry=>entry.context==="creation"||entry.context==="any");
      assert.ok(cost?.resource==="pd",name+" "+title+" sin coste PD");
      return {...candidate,system:{...candidate.system,acquisition:{mode:"purchased",stage:"creation",paid:{resource:"pd",amount:cost.amount,known:true}}}};
    });
    const pc={type:"character",system:{details:{level:1},creation:{status:"complete"},attributes:attrs,skills},items:acquired};
    const budget=deriveDevelopmentBudget(pc,{skillKeys:Object.keys(TM_CONFIG.skills)});
    assert.equal(budget.pdSpent,profile.expected.pd);
    assert.equal(budget.pdAvailable,0);
    const check=validateSkillProgression({skills,skillDefinitions:TM_CONFIG.skills,
      level:1,pdSpent:budget.pdSpent,pdTotal:budget.pdTotal,
      specializationSkillKeys:profile.purchases.some(([type])=>type==="specialization")?["investigation"]:[],
      creationActive:true});
    assert.equal(check.valid,true,JSON.stringify(check.issues));
    const weapon=item("weapon",common.comparisonWeapon);
    assert.equal(weapon.system.priceCopper,common.comparisonPriceCopper);
    assert.equal(weapon.system.skill,"martialWeapons");
    for(const selected of [common.ancestry,common.origin,common.background])
      assert.ok(catalog.some(candidate=>candidate.name===selected),selected);
    for(const trait of common.traits) item("trait",trait);
    const martialRank=profile.skills.martialWeapons??0;
    const defenseBonus=[0,0,1,2,3,4][martialRank];
    assert.equal(skillBonuses[martialRank],profile.expected.attackSkillBonus);
    assert.equal(defenseBonus,profile.expected.defenseBonus);
    assert.equal(10+2*profile.attributes.vig,profile.attributes.vig*2+10);
    assert.equal(6+3*profile.attributes.vol,6+3*profile.attributes.vol);
  });
}
