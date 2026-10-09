import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { constructionCatalog } from "../scripts/catalog/core-catalog.mjs";
import { TM_CONFIG } from "../scripts/config.mjs";
import {
  ANCESTRY_SITUATIONAL_BONUSES,
  TRAIT_SITUATIONAL_BONUSES,
  actorSituationalBonuses,
  ancestrySituationalBonuses,
  actorAncestrySituationalBonuses,
  availableAncestryCheckBonuses,
  resolveAncestryCheckBonuses,
  ancestryCheckChoicesHtml
} from "../scripts/rules/ancestry-situational.mjs";
import { deriveActorState, resolveDerivedSelector } from "../scripts/rules/derived-state.mjs";
import { resolveActorDefense } from "../scripts/rules/defense-context.mjs";
import { prepareRuleElements } from "../scripts/rules/rule-elements.mjs";

const ancestries=constructionCatalog().filter(item=>item.type==="ancestry");
const racial=name=>ancestries.find(item=>item.name===name);
const system=()=>({
  attributes:Object.fromEntries(Object.keys(TM_CONFIG.attributes).map(key=>[key,{value:2,baseValue:2}])),
  combat:{defensiveRank:0},movement:{base:6},
  modifiers:{manual:{}}
});

test("los 17 paquetes raciales preservan Escala, Movimiento y rasgos narrativos",()=>{
  assert.equal(ancestries.length,17);
  for(const ancestry of ancestries){
    assert.ok(Array.isArray(ancestry.system.racialFeatures) && ancestry.system.racialFeatures.length>0,ancestry.name);
    assert.ok(ancestry.system.movementBase>0,ancestry.name);
    assert.deepEqual(ancestry.system.situationalBonuses,ANCESTRY_SITUATIONAL_BONUSES[ancestry.name]??[]);
    for(const bonus of ancestrySituationalBonuses(ancestry)){
      assert.equal(typeof bonus.id,"string");
      assert.ok(Number(bonus.value)>0);
      assert.ok(bonus.condition.length>25);
    }
  }
  assert.equal(racial("Hada").system.movementBase,5);
  assert.equal(racial("Coralio").system.naturalProtection,1);
  assert.equal(racial("Enano").system.movementBase,5);
});

test("un Elfo NO obtiene PER permanente; Sentidos Élficos suma +1 sólo con contexto confirmado",()=>{
  const elf=racial("Elfo");
  const base=system();
  const state=deriveActorState({system:base,items:[elf]});
  assert.equal(base.attributes.per.value,2);
  assert.equal(state.initiativeModifier,2);
  assert.equal(resolveAncestryCheckBonuses([elf],"per",[]).total,0);
  const enabled=resolveAncestryCheckBonuses([elf],"per",["sentidos-elficos"]);
  assert.equal(enabled.total,1);
  assert.equal(enabled.applied[0].label,"Sentidos Élficos");
  assert.equal(resolveAncestryCheckBonuses([elf],"fue",["sentidos-elficos"]).total,0);
  assert.equal(resolveAncestryCheckBonuses([elf],"per",["bono-inexistente"]).total,0);
  assert.equal(state.initiativeModifier,2);
});

test("VIG y FUE raciales se calculan sólo para sus casos explícitos",()=>{
  const enano=racial("Enano"),orco=racial("Orco"),verdante=racial("Verdante");
  assert.equal(resolveAncestryCheckBonuses([enano],"vig",["sangre-metal-vig"]).total,1);
  assert.equal(resolveAncestryCheckBonuses([enano],"per",["sangre-metal-vig"]).total,0);
  assert.equal(resolveAncestryCheckBonuses([orco],"fue",["complexion-orca"]).total,1);
  assert.equal(resolveAncestryCheckBonuses([orco],"vig",["complexion-orca"]).total,0);
  assert.equal(resolveAncestryCheckBonuses([verdante],"vig",["adaptacion-bioma"]).total,1);
  assert.match(availableAncestryCheckBonuses([verdante],"vig")[0].condition,/variante registrada/);
  assert.equal(resolveAncestryCheckBonuses([verdante],"vig",[]).total,0);
});

test("Goblin, Hobgoblin y Bugbear registran Ojo para la Oportunidad como 1/escena sin alterar base",()=>{
  for(const name of ["Goblin","Hobgoblin","Bugbear"]){
    const ancestry=racial(name);
    assert.equal(resolveAncestryCheckBonuses([ancestry],"agi",["ojo-oportunidad"]).total,1,name);
    assert.equal(resolveAncestryCheckBonuses([ancestry],"int",[]).total,0,name);
    assert.match(ancestrySituationalBonuses(ancestry)[0].condition,/Una vez por Escena/);
  }
});

test("Micelio y Coralio usan PER contextual; Ankar y Enano defienden sólo amenazas pertinentes",()=>{
  for(const [name,id] of [["Micelio","quimiosensibilidad"],["Coralio","sentido-corriente"]]){
    assert.equal(resolveAncestryCheckBonuses([racial(name)],"per",[id]).total,1,name);
    assert.equal(resolveAncestryCheckBonuses([racial(name)],"agi",[id]).total,0,name);
  }
  const ankar=deriveActorState({system:system(),items:[racial("Ankar")]});
  assert.equal(ankar.mentalDefense,13);
  assert.equal(resolveDerivedSelector(ankar,"mentalDefense").total,13);
  assert.equal(resolveDerivedSelector(ankar,"mentalDefense",{racialSoul:true}).total,14);
  assert.equal(resolveDerivedSelector(ankar,"mentalDefense",{racialToxins:true}).total,13);
  assert.equal(resolveActorDefense({system:{derived:ankar}},{kind:"mental",racialSoul:true}).total,14);
  const dwarf=deriveActorState({system:system(),items:[racial("Enano")]});
  assert.equal(dwarf.bodyDefense,13);
  assert.equal(resolveActorDefense({system:{derived:dwarf}},{kind:"body",racialToxins:true}).total,14);
  assert.equal(resolveActorDefense({system:{derived:dwarf}},{kind:"body",racialSoul:true}).total,13);
  assert.equal(dwarf.breakdowns.bodyDefense.total,13);
});

test("los personajes anteriores a esta revisión recuperan ventajas sin migrar sus Atributos",()=>{
  const old={type:"ancestry",name:"Elfo",system:{racialFeatures:racial("Elfo").system.racialFeatures,situationalBonuses:[]}};
  assert.equal(actorAncestrySituationalBonuses([old]).length,1);
  assert.equal(resolveAncestryCheckBonuses([old],"per",["sentidos-elficos"]).total,1);
  const browser=ancestryCheckChoicesHtml([old],"per");
  assert.match(browser,/Sentidos Élficos/);
  assert.match(browser,/checkbox/);
  assert.match(browser,/circunstanciales/);
  assert.equal(actorAncestrySituationalBonuses([]).length,0);
});

test("los ítems físicos no equipados NO aplican mejoras de habilidades ni atributos derivados",()=>{
  const rules=[
    {key:"FlatModifier",selector:"skill.survival",value:3,label:"Kit"},
    {key:"FlatModifier",selector:"healthMax",value:4,label:"Protección"},
  ];
  const item={id:"e1",type:"equipment",name:"Kit",system:{equipped:false,rules}};
  const trait={id:"t1",type:"trait",name:"Rasgo",system:{rules:[{key:"FlatModifier",selector:"healthMax",value:2}]}};
  const offEffect={id:"f1",type:"effect",name:"Efecto",system:{active:false,rules:[{key:"FlatModifier",selector:"skill.survival",value:8}]}};
  const prepared=prepareRuleElements([item,trait,offEffect],{skillDefinitions:TM_CONFIG.skills});
  assert.equal(prepared.modifiers.find(x=>x.selector==="skill.survival"),undefined);
  const onlyHealth=prepared.modifiers.filter(x=>x.selector==="healthMax");
  assert.equal(onlyHealth.length,1);
  assert.equal(onlyHealth[0].sourceItemName,"Rasgo");
  const equipped=prepareRuleElements([{...item,system:{...item.system,equipped:true}},trait,offEffect],{skillDefinitions:TM_CONFIG.skills});
  assert.equal(equipped.modifiers.find(x=>x.selector==="skill.survival").value,3);
  assert.equal(equipped.modifiers.filter(x=>x.selector==="healthMax").length,2);
});

test("Origen y Trasfondo son narrativos, sin modificadores numéricos invisibles",()=>{
  for(const type of ["origin","background"]){
    for(const item of constructionCatalog().filter(entry=>entry.type===type)){
      const prepared=prepareRuleElements([item],{skillDefinitions:TM_CONFIG.skills});
      assert.equal(prepared.modifiers.length,0,item.name);
      assert.equal(Object.keys(prepared.skillRankUpgrades).length,0,item.name);
    }
  }
});

test("la ficha enseña bonificaciones condicionales y pide confirmación antes de aplicarlas",async()=>{
  const actor=await readFile(new URL("../scripts/documents/actor.mjs",import.meta.url),"utf8");
  const sheet=await readFile(new URL("../scripts/sheets/actor-sheet.mjs",import.meta.url),"utf8");
  const template=await readFile(new URL("../templates/actor/character-sheet.hbs",import.meta.url),"utf8");
  assert.match(actor,/resolveAncestryCheckBonuses\(\[\.\.\.this\.items\],attributeKey,situationalBonusIds\)/);
  assert.match(actor,/ancestryBonus\.total/);
  assert.match(actor,/ancestryCheckChoicesHtml/);
  assert.match(sheet,/this\.actor\.availableAncestryBonuses\(key\)/);
  assert.match(sheet,/ancestryCheckChoicesHtml/);
  assert.match(template,/creationGuide\.ancestryConditionalBonuses/);
});


test("Rasgos con +1 circunstancial se ofrecen para elegir, no como atributo permanente",()=>{
  const traits=constructionCatalog().filter(item=>item.type==="trait");
  for(const name of ["Sentido Agudo","Afinidad Sobrenatural","Resistencia Ambiental"]){
    const trait=traits.find(item=>item.name===name);
    assert.ok(trait,name);
    assert.deepEqual(trait.system.situationalBonuses,TRAIT_SITUATIONAL_BONUSES[name]);
    const attr=name==="Resistencia Ambiental"?"vig":"per";
    const option=trait.system.situationalBonuses[0];
    assert.equal(resolveAncestryCheckBonuses([trait],attr,[option.id]).total,1);
    assert.equal(resolveAncestryCheckBonuses([trait],"agi",[option.id]).total,0);
    assert.equal(resolveAncestryCheckBonuses([trait],attr,[]).total,0);
  }
  const significant=traits.find(item=>item.name==="Resistencia Ambiental Significativa");
  assert.deepEqual(significant.system.situationalBonuses,[]);
  assert.match(significant.system.description,/Ventaja/);
});

test("Bonos situacionales de Elfo y Sentido Agudo se muestran por fuente sin alterar PER base",()=>{
  const elf=racial("Elfo");
  const sense=constructionCatalog().find(item=>item.type==="trait"&&item.name==="Sentido Agudo");
  const all=actorSituationalBonuses([elf,sense]);
  assert.deepEqual(all.map(row=>row.id),["sentidos-elficos","rasgo-sentido-agudo"]);
  assert.equal(resolveAncestryCheckBonuses([elf,sense],"per",[]).total,0);
  assert.equal(resolveAncestryCheckBonuses([elf,sense],"per",["sentidos-elficos"]).total,1);
  assert.equal(resolveAncestryCheckBonuses([elf,sense],"per",["rasgo-sentido-agudo"]).total,1);
  const html=ancestryCheckChoicesHtml([elf,sense],"per");
  assert.match(html,/Sentidos Élficos/);
  assert.match(html,/Sentido Agudo/);
  assert.match(html,/Ascendencia y Rasgos/);
});

test("Medallones muestran +1* contextual pero mantienen el número de atributo sin cambios",async()=>{
  const sheet=await readFile(new URL("../templates/actor/character-sheet.hbs",import.meta.url),"utf8");
  const controller=await readFile(new URL("../scripts/sheets/actor-sheet.mjs",import.meta.url),"utf8");
  assert.match(sheet,/tm-v12-context-badge/);
  assert.match(sheet,/ancestryAttributeBonuses\.per\.description/);
  assert.match(sheet,/system\.attributes\.per\.value/);
  assert.match(controller,/const bonuses=situationalBonuses\.filter/);
});
