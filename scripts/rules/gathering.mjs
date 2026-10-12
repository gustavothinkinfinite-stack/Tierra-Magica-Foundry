import { classifyResult } from "../rules.mjs";

export const GATHERING_SETTING = "gatheringCatalog";
export const GATHERING_INTERVAL_SECONDS = 7200;
export const GATHERING_BIOMES = Object.freeze({
  forest:"Bosque", swamp:"Pantano", mountain:"Montaña", cave:"Caverna",
  ruins:"Ruinas", coast:"Costa", plains:"Llanura", arcane:"Zona arcana"
});
export const GATHERING_SKILLS = Object.freeze(["survival","nature","investigation","arcana"]);
export const GATHERING_ATTRIBUTES = Object.freeze(["fue","agi","vig","int","per","vol","pre"]);
const entry = (id,name,biome,skill,df,amounts,description) =>
  ({id,name,biome,skill,attribute:skill==="arcana"?"int":skill==="nature"?"int":"per",
    df,amounts,description,hidden:false,sourceUuid:""});
// Ejemplos operativos; no establecen nuevas reglas o precios canónicos.
export const DEFAULT_GATHERING_RESOURCES = Object.freeze([
  entry("tm-hongos-silvestres","Hongos silvestres","forest","survival",10,[1,2,4],"Ingredientes naturales sin propiedades alquímicas automáticas."),
  entry("tm-frutos-bosque","Frutos del bosque","forest","survival",10,[1,2,4],"Frutos recolectados, no raciones de viaje automáticas."),
  entry("tm-hierbas-medicinales","Hierbas medicinales","forest","survival",14,[1,2,3],"Materia prima; no equivale a una preparación medicinal."),
  entry("tm-musgo-arcano","Musgo arcano","arcane","arcana",18,[1,1,2],"Recurso fantástico sin equivalencia de VI o coste mágico automático.")
]);

const integer = (value,lo,hi,fallback) => {
  if(value===""||value===null||value===undefined) return fallback;
  const n=Number(value);
  return Number.isInteger(n)&&n>=lo&&n<=hi?n:NaN;
};
export function normalizeGatheringResource(value,skills=GATHERING_SKILLS){
  if(!value||typeof value!=="object") throw new Error("Recurso inválido.");
  const id=String(value.id??"").trim();
  const name=String(value.name??"").trim();
  const biome=String(value.biome??"");
  const skill=String(value.skill??"");
  const attribute=String(value.attribute??"");
  const df=integer(value.df,8,30,NaN);
  const amounts=(Array.isArray(value.amounts)?value.amounts:[]).map(x=>integer(x,0,100,NaN));
  const sourceUuid=String(value.sourceUuid??"").trim();
  if(!/^[a-zA-Z0-9_-]{3,80}$/.test(id)||!name||name.length>120||
    !GATHERING_BIOMES[biome]||!skills.includes(skill)||!GATHERING_ATTRIBUTES.includes(attribute)||
    !Number.isFinite(df)||amounts.length!==3||amounts.some(n=>!Number.isFinite(n))||
    sourceUuid.length>250) throw new Error("Recurso con identidad, entorno, habilidad, DF o cantidades inválidas.");
  if(amounts[0]>amounts[1]||amounts[1]>amounts[2]) throw new Error("Las cantidades deben crecer con el grado de éxito.");
  return {id,name,biome,skill,attribute,df,amounts,sourceUuid,
    hidden:value.hidden===true,description:String(value.description??"").slice(0,700)};
}
export function gatheringResourcesForBiome(catalog,biome,{showHidden=false,skills=GATHERING_SKILLS}={}){
  return (Array.isArray(catalog)?catalog:[])
    .map(value=>{try{return normalizeGatheringResource(value,skills)}catch{return null}})
    .filter(value=>value&&value.biome===biome&&(showHidden||!value.hidden));
}
// La interfaz muestra únicamente las búsquedas habilitadas en este bioma.
// El DJ puede asignar cualquiera de las habilidades canónicas a un hallazgo oculto.
export function gatheringSearchChoices(catalog,biome,{skills=GATHERING_SKILLS}={}){
  const available=gatheringResourcesForBiome(catalog,biome,{showHidden:true,skills});
  const known=available.filter(resource=>!resource.hidden);
  const hiddenSkills=new Set(available.filter(resource=>resource.hidden).map(resource=>resource.skill));
  const explorationSkills=skills.filter(skill=>hiddenSkills.has(skill));
  return {known,explorationSkills};
}

export function gatheringOutcome(resource,total){
  const check=classifyResult(total,resource.df);
  const index=check.degree==="Dominante"?2:check.degree==="Claro"?1:0;
  return {...check,quantity:check.success?resource.amounts[index]:0};
}
export function gatheringAttemptKey(sceneId,resourceId){
  return String(sceneId)+":"+String(resourceId);
}
export function gatheringCooldownRemaining(attempts,key,worldTime,interval=GATHERING_INTERVAL_SECONDS){
  if(!Object.prototype.hasOwnProperty.call(attempts??{},key)) return 0;
  const last=Number(attempts[key]);
  const now=Number(worldTime);
  if(!Number.isFinite(last)||!Number.isFinite(now)) return interval;
  if(now<last) return interval;
  return Math.max(0,interval-(now-last));
}
