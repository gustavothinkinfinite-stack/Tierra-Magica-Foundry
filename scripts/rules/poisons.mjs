import { normalizeSlug } from "./identity.mjs";

export const POISON_PERSISTENCE_THRESHOLDS=Object.freeze([50,25,12,6,3]);

const number=(value,fallback=0)=>{
  const parsed=Number(value);
  return Number.isFinite(parsed)?parsed:fallback;
};

export function isWeaponCompatiblePoison(formula){
  if(!formula || formula.type!=="formula") return false;
  return formula.system?.poison===true &&
    formula.system?.weaponCompatible===true &&
    normalizeSlug(formula.system?.route||"")==="sangre";
}

export function poisonCoatingIssues(formula,weapon){
  const issues=[];
  if(!formula || formula.type!=="formula") issues.push({code:"formula",message:"La dosis seleccionada no es una Fórmula."});
  if(!weapon || weapon.type!=="weapon") issues.push({code:"weapon",message:"El recubrimiento requiere un arma."});
  if(formula?.system?.poison!==true) issues.push({code:"poison",message:"La Fórmula no está catalogada como veneno."});
  if(formula?.system?.weaponCompatible!==true || normalizeSlug(formula?.system?.route||"")!=="sangre"){
    issues.push({code:"route",message:"La Fórmula no posee una Vía de Sangre compatible con recubrimiento de arma."});
  }
  if(Math.max(0,Math.floor(number(formula?.system?.quantity)))<=0){
    issues.push({code:"quantity",message:"No hay una dosis preparada para aplicar."});
  }
  return issues;
}

export function initialPoisonCoating(formula){
  if(!formula || formula.type!=="formula") throw new Error("Fórmula de veneno inválida.");
  return {
    active:true,
    formulaSlug:normalizeSlug(formula.system?.slug||formula.name),
    formulaName:String(formula.name??"Veneno"),
    sourceFormulaUuid:String(formula.uuid??""),
    persistenceIndex:0,
    applications:0
  };
}

export function poisonApplicationIsValid({damageApplied=0,route="Sangre"}={}){
  return normalizeSlug(route)==="sangre" && number(damageApplied)>0;
}

export function resolvePoisonPersistence(coating,roll){
  const current={
    active:coating?.active===true,
    formulaSlug:String(coating?.formulaSlug??""),
    formulaName:String(coating?.formulaName??""),
    sourceFormulaUuid:String(coating?.sourceFormulaUuid??""),
    persistenceIndex:Math.max(0,Math.floor(number(coating?.persistenceIndex))),
    applications:Math.max(0,Math.floor(number(coating?.applications)))
  };
  if(!current.active) return {retained:false,threshold:null,roll:null,coating:current};

  const threshold=POISON_PERSISTENCE_THRESHOLDS[current.persistenceIndex]??null;
  const applications=current.applications+1;

  // Si ya sobrevivió todos los umbrales, esta última aplicación agota el residuo.
  if(threshold===null){
    return {
      retained:false,
      threshold:null,
      roll:null,
      coating:{...current,active:false,applications}
    };
  }

  const result=Math.max(1,Math.min(100,Math.floor(number(roll,101))));
  const retained=result<=threshold;
  return {
    retained,
    threshold,
    roll:result,
    coating:retained
      ? {...current,persistenceIndex:current.persistenceIndex+1,applications}
      : {...current,active:false,applications}
  };
}

export function poisonPersistenceLabel(coating){
  if(coating?.active!==true) return "Sin veneno";
  const threshold=POISON_PERSISTENCE_THRESHOLDS[Math.max(0,Math.floor(number(coating?.persistenceIndex)))]??null;
  return threshold===null ? "Última aplicación" : "Persistencia "+threshold+"%";
}
