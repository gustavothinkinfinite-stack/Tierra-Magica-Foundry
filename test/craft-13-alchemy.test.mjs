import test from "node:test";
import assert from "node:assert/strict";
import {
  ALCHEMY_FORMULAS,
  actorKnowsFormula,
  alchemyFormulaProfile,
  formulaPreparationIssues,
  formulaUsePlan
} from "../scripts/rules/alchemy.mjs";

function applyChanges(document,changes){
  for(const [path,value] of Object.entries(changes)){
    const keys=path.split(".");
    if(keys[0]==="system") keys.shift();
    let node=document.system;
    while(keys.length>1){
      const key=keys.shift();
      node[key] ??= {};
      node=node[key];
    }
    node[keys[0]]=value;
  }
}

globalThis.ui={notifications:{
  warn:()=>null,
  info:()=>null
}};
globalThis.foundry={utils:{
  escapeHTML:(value)=>String(value),
  deepClone:(value)=>structuredClone(value)
}};
globalThis.ChatMessage={
  getSpeaker:({actor})=>({actor:actor?.id}),
  create:async(data)=>data
};
globalThis.game={user:{isGM:false},settings:{get:()=> "publicroll"}};

globalThis.Actor=class{
  constructor(data={}){
    this.id=data.id??"actor";
    this.uuid="Actor."+this.id;
    this.name=data.name??"Actor";
    this.type=data.type??"character";
    this.system=data.system??{};
    this.items=data.items??[];
  }
  async update(changes){applyChanges(this,changes);return changes;}
  prepareDerivedData(){}
};

const {TierraMagicaActor}=await import("../scripts/documents/actor.mjs");
const {installFormulaGuards}=await import("../scripts/rules/formula-guards.mjs");
installFormulaGuards(TierraMagicaActor);

function formula(name,{quantity=1,known=false,system={}}={}){
  return {
    id:name.toLowerCase().replaceAll(" ","-"),
    type:"formula",
    name,
    system:{quantity,known,...system},
    async update(changes){applyChanges(this,changes);return changes;}
  };
}

function actor(items=[]){
  return new TierraMagicaActor({
    id:"alchemist",
    name:"Alquimista",
    items,
    system:{
      attributes:{vig:{value:2},vol:{value:2}},
      skills:{alchemy:{rank:3}},
      resources:{health:{value:5,max:10},mana:{value:2,max:8}},
      recovery:{healthCap:10,healthUsed:false,manaUsed:false},
      alchemy:{saturatedFamilies:[]},
      creation:{status:"complete"}
    }
  });
}

test("POISON-01A: las once Fórmulas canónicas conservan perfiles cerrados",()=>{
  assert.equal(Object.keys(ALCHEMY_FORMULAS).length,11);
  assert.deepEqual(
    [ALCHEMY_FORMULAS["balsamo-restaurador"].priceCopper,ALCHEMY_FORMULAS["balsamo-restaurador"].materialCopper,ALCHEMY_FORMULAS["balsamo-restaurador"].timeMinutes],
    [50,25,120]
  );
  assert.deepEqual(
    [ALCHEMY_FORMULAS["bomba-incendiaria"].priceCopper,ALCHEMY_FORMULAS["bomba-incendiaria"].materialCopper,ALCHEMY_FORMULAS["bomba-incendiaria"].timeMinutes],
    [300,150,480]
  );
  assert.equal(ALCHEMY_FORMULAS["neutralizante-comun"].family,"antitoxica");
});

test("CRAFT-13G: conocimiento personal y dosis físicas son estados separados",()=>{
  const known=formula("Poción Restauradora",{quantity:0,known:true});
  const dose=formula("Poción Restauradora",{quantity:2,known:false});
  const a=actor([known,dose]);
  assert.equal(actorKnowsFormula(a,dose),true);

  known.system.known=false;
  assert.equal(actorKnowsFormula(a,dose),false);
  assert.equal(formulaUsePlan(a,dose).valid,true);
});

test("CRAFT-13G: Neutralizante consume una dosis y aplica Saturación Antitóxica",async()=>{
  const neutralizer=formula("Neutralizante Común",{quantity:2,system:{saturating:true,family:"antitoxica"}});
  const a=actor([neutralizer]);

  const first=await a.useFormula(neutralizer);
  assert.ok(first);
  assert.equal(neutralizer.system.quantity,1);
  assert.deepEqual(a.system.alchemy.saturatedFamilies,["antitoxica"]);

  const blocked=await a.useFormula(neutralizer);
  assert.equal(blocked,null);
  assert.equal(neutralizer.system.quantity,1);
});

test("CRAFT-13G: Fórmulas contextuales también consumen dosis y respetan Saturación",async()=>{
  const tonic=formula("Tónico de Vigor",{quantity:1,system:{saturating:true,family:"potenciador"}});
  const toxin=formula("Toxina Debilitante",{quantity:1});
  const a=actor([tonic,toxin]);

  assert.ok(await a.useFormula(tonic));
  assert.equal(tonic.system.quantity,0);
  assert.ok(a.system.alchemy.saturatedFamilies.includes("potenciador"));

  assert.ok(await a.useFormula(toxin));
  assert.equal(toxin.system.quantity,0);
  assert.deepEqual(a.system.alchemy.saturatedFamilies,["potenciador"]);
});

test("CRAFT-13G: Respiro limpia Saturación pero no recupera Vida ni Maná",async()=>{
  const a=actor([]);
  a.system.alchemy.saturatedFamilies=["restaurativa","antitoxica"];
  const hp=a.system.resources.health.value;
  const mana=a.system.resources.mana.value;
  await a.rest("breather");
  assert.deepEqual(a.system.alchemy.saturatedFamilies,[]);
  assert.equal(a.system.resources.health.value,hp);
  assert.equal(a.system.resources.mana.value,mana);
});

test("CRAFT-13G: preparación rutinaria exige conocimiento, rango, Especialización e instalación",()=>{
  const recipe=formula("Poción de Recuperación Arcana",{known:true,quantity:0});
  const specialization={id:"spec",type:"specialization",name:"Reactivos",system:{skill:"alchemy"}};
  const a=actor([recipe,specialization]);

  assert.deepEqual(formulaPreparationIssues(a,recipe,{
    specialization:"Reactivos",
    availableInstallation:"professional"
  }),[]);

  recipe.system.known=false;
  const issues=formulaPreparationIssues(a,recipe,{
    specialization:"Reactivos",
    availableInstallation:"professional"
  });
  assert.ok(issues.some((row)=>row.code==="formula-knowledge"));
});

test("CRAFT-13G: perfil por nombre no inventa datos para una Fórmula no catalogada",()=>{
  assert.equal(alchemyFormulaProfile("Poción Restauradora").ref,"REF-ALQ-02");
  assert.equal(alchemyFormulaProfile("Fórmula inexistente"),null);
});


test("POISON-01A: catálogo amplía Toxinas sin formulaciones reales",()=>{
  const soporific=ALCHEMY_FORMULAS["somnifero-de-bruma"];
  const paralytic=ALCHEMY_FORMULAS["paralizante-de-aguja"];
  const lethal=ALCHEMY_FORMULAS["veneno-del-ultimo-pulso"];
  assert.deepEqual([soporific.route,soporific.resistanceDf,soporific.poisonEffectKey],["Sangre",14,"soporific"]);
  assert.deepEqual([paralytic.route,paralytic.resistanceDf,paralytic.poisonEffectKey],["Sangre",16,"paralyzing"]);
  assert.deepEqual([lethal.route,lethal.resistanceDf,lethal.poisonDamage],["Sangre",18,8]);
  assert.equal(lethal.rank,4);
  assert.equal(lethal.installation,"specialized");
});
