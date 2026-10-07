import { normalizeSlug } from "./identity.mjs";

const profile=(data)=>Object.freeze({...data});

export const ALCHEMY_FORMULAS=Object.freeze({
  "balsamo-restaurador":profile({
    ref:"REF-ALQ-01",name:"Bálsamo Restaurador",grade:"common",knowledgePd:1,
    priceCopper:50,materialCopper:25,timeMinutes:120,rank:2,specialization:"Medicinales",installation:"adequate",
    route:"Tópica",activation:"1 minuto",duration:"Instantánea",saturating:true,family:"restaurativa",
    effectKind:"health",effectAmount:4
  }),
  "pocion-restauradora":profile({
    ref:"REF-ALQ-02",name:"Poción Restauradora",grade:"common",knowledgePd:1,
    priceCopper:80,materialCopper:40,timeMinutes:120,rank:2,specialization:"Medicinales",installation:"adequate",
    route:"Oral",activation:"Acción",duration:"Instantánea",saturating:true,family:"restaurativa",
    effectKind:"health",effectAmount:4
  }),
  "pocion-de-recuperacion-arcana":profile({
    ref:"REF-ALQ-03",name:"Poción de Recuperación Arcana",grade:"refined",knowledgePd:1,
    priceCopper:150,materialCopper:75,timeMinutes:240,rank:3,specialization:"Reactivos",installation:"professional",
    route:"Oral",activation:"Acción",duration:"Instantánea",saturating:true,family:"arcana",
    effectKind:"mana",effectAmount:3
  }),
  "tonico-de-vigor":profile({
    ref:"REF-ALQ-04",name:"Tónico de Vigor",grade:"refined",knowledgePd:1,
    priceCopper:80,materialCopper:40,timeMinutes:240,rank:3,specialization:"Potenciadores",installation:"professional",
    route:"Oral",activation:"1 minuto",duration:"Escena / hasta prueba compatible",saturating:true,family:"potenciador",
    effectKind:"contextual"
  }),
  "supresor-del-dolor":profile({
    ref:"REF-ALQ-05",name:"Supresor del Dolor",grade:"refined",knowledgePd:1,
    priceCopper:80,materialCopper:40,timeMinutes:240,rank:3,specialization:"Medicinales",installation:"professional",
    route:"Oral",activation:"Acción",duration:"Escena",saturating:true,family:"analgesica",
    effectKind:"contextual"
  }),
  "neutralizante-comun":profile({
    ref:"REF-ALQ-06",name:"Neutralizante Común",grade:"refined",knowledgePd:1,
    priceCopper:100,materialCopper:50,timeMinutes:240,rank:3,specialization:"Toxinas",installation:"professional",
    route:"Preparada para toxina compatible",activation:"Acción cuando la vía lo permite",duration:"Hasta siguiente resistencia compatible de la Escena",
    saturating:true,family:"antitoxica",effectKind:"contextual"
  }),
  "toxina-debilitante":profile({
    ref:"REF-ALQ-07",name:"Toxina Debilitante",grade:"complex",knowledgePd:2,
    priceCopper:150,materialCopper:75,timeMinutes:480,rank:3,specialization:"Toxinas",installation:"professional",
    route:"Sangre",activation:"Primera aplicación válida",duration:"Escena",saturating:false,family:"",
    effectKind:"contextual"
  }),
  "bomba-incendiaria":profile({
    ref:"REF-ALQ-08",name:"Bomba Incendiaria",grade:"complex",knowledgePd:2,
    priceCopper:300,materialCopper:150,timeMinutes:480,rank:3,specialization:"Explosivos",installation:"professional",
    route:"Colocación/lanzamiento",activation:"Colocación o lanzamiento",duration:"Instantánea",saturating:false,family:"",
    damage:6,damageType:"fire",damageMode:"lethal",penetration:1,effectKind:"contextual"
  })
});

export function alchemyFormulaProfile(value){
  const slug=typeof value==="string"
    ? normalizeSlug(value)
    : normalizeSlug(value?.system?.slug || value?.name || "");
  return ALCHEMY_FORMULAS[slug] ?? null;
}

export function actorKnowsFormula(actor,value){
  const target=alchemyFormulaProfile(value);
  const slug=target ? normalizeSlug(target.name) :
    normalizeSlug(typeof value==="string"?value:(value?.system?.slug||value?.name||""));
  if(!slug) return false;
  return Array.from(actor?.items??[]).some((item)=>
    item?.type==="formula" &&
    item?.system?.known===true &&
    normalizeSlug(item.system?.slug||item.name)===slug
  );
}

export function formulaUsePlan(actor,item){
  if(!item || item.type!=="formula") return {valid:false,issue:"Fórmula inválida."};
  const quantity=Math.max(0,Math.floor(Number(item.system?.quantity)||0));
  if(quantity<=0) return {valid:false,issue:"No hay una dosis preparada de "+item.name+"."};

  const canonical=alchemyFormulaProfile(item);
  const saturating=canonical?.saturating ?? item.system?.saturating===true;
  const family=normalizeSlug(canonical?.family || item.system?.family || "");
  const saturated=(Array.isArray(actor?.system?.alchemy?.saturatedFamilies)
    ? actor.system.alchemy.saturatedFamilies
    : []).map((value)=>normalizeSlug(value));

  if(saturating && family && saturated.includes(family)){
    return {valid:false,issue:(actor?.name||"El objetivo")+" ya está Saturado por la familia "+family+"."};
  }

  return {
    valid:true,
    issue:"",
    quantityBefore:quantity,
    quantityAfter:quantity-1,
    family,
    saturating:Boolean(saturating&&family),
    effectKind:canonical?.effectKind ?? "contextual",
    effectAmount:Math.max(0,Number(canonical?.effectAmount)||0),
    profile:canonical
  };
}

export function formulaPreparationIssues(actor,formula,{specialization="",availableInstallation="improvised"}={}){
  const issues=[];
  const profile=alchemyFormulaProfile(formula);
  if(!profile){
    issues.push({code:"formula-profile",message:"La Fórmula no pertenece al catálogo estable conocido por 13G."});
    return issues;
  }
  if(!actorKnowsFormula(actor,formula)){
    issues.push({code:"formula-knowledge",message:"Poseer una dosis o documento no equivale a conocer personalmente la Fórmula."});
  }
  const rank=Math.max(0,Number(actor?.system?.skills?.alchemy?.rank)||0);
  if(rank<profile.rank) issues.push({code:"formula-rank",message:"Alquimia insuficiente para la preparación rutinaria.",expectedRank:profile.rank});
  if(String(specialization).trim().toLowerCase()!==profile.specialization.toLowerCase()){
    issues.push({code:"formula-specialization",message:"La preparación requiere la Especialización "+profile.specialization+"."});
  }
  const ownsSpecialization=Array.from(actor?.items??[]).some((item)=>
    item?.type==="specialization" &&
    String(item.system?.skill??"")==="alchemy" &&
    String(item.name??"").trim().toLowerCase()===profile.specialization.toLowerCase()
  );
  if(!ownsSpecialization){
    issues.push({code:"formula-specialization-owned",message:"El Actor no posee la Especialización "+profile.specialization+"."});
  }
  const installations=["improvised","adequate","professional","specialized","exceptional"];
  if(installations.indexOf(String(availableInstallation))<installations.indexOf(profile.installation)){
    issues.push({code:"formula-installation",message:"Instalación insuficiente para la Fórmula.",expectedInstallation:profile.installation});
  }
  return issues;
}
