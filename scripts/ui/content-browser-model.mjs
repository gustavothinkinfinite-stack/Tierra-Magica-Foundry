import { coreCatalog } from "../catalog/core-catalog.mjs";
import { TM_CONFIG } from "../config.mjs";

const TYPE_ORDER=[
  "weapon","armor","shield","equipment","device",
  "spell","ritual","formula","technique","trait","specialization",
  "ancestry","origin","background","discipline","project","effect"
];

function plainText(value=""){
  return String(value??"")
    .replace(/<[^>]*>/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function normalizeSearch(value=""){
  return plainText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .toLowerCase();
}

function formatCopper(value){
  const copper=Number(value);
  if(!Number.isFinite(copper)||copper<0) return "";
  const oro=Math.floor(copper/100);
  const plata=Math.floor((copper%100)/10);
  const cobre=copper%10;
  const parts=[];
  if(oro) parts.push(oro+" o");
  if(plata) parts.push(plata+" p");
  if(cobre||!parts.length) parts.push(cobre+" c");
  return parts.join(" ");
}

function addDetail(details,label,value){
  if(value===null||value===undefined||value==="") return;
  details.push({label,value:String(value)});
}

function entryDetails(entry){
  const system=entry.system??{};
  const details=[];
  switch(entry.type){
    case "weapon":
      addDetail(details,"Habilidad",TM_CONFIG.skillLabels[system.skill]??system.skill);
      addDetail(details,"Daño",system.damage);
      addDetail(details,"Penetración",system.penetration);
      if(Number(system.strengthMin??0)>0) addDetail(details,"FUE mínima",system.strengthMin);
      if(Number(system.rangeOptimal??0)>0) addDetail(details,"Alcance óptimo",system.rangeOptimal+" espacios");
      if(Number(system.reload??0)>0) addDetail(details,"Recarga",system.reload);
      if(Number(system.power??0)>0) addDetail(details,"Potencia",system.power);
      addDetail(details,"Propiedades",system.properties);
      break;
    case "armor":
      addDetail(details,"Protección",system.protection);
      addDetail(details,"FUE mínima",system.strengthMin??0);
      addDetail(details,"Propiedades",system.properties);
      break;
    case "shield":
      addDetail(details,"Defensa pasiva",system.passiveDefense);
      addDetail(details,"Bloqueo",system.block);
      addDetail(details,"FUE mínima",system.strengthMin??0);
      addDetail(details,"Propiedades",system.properties);
      break;
    case "equipment":
      addDetail(details,"Categoría",system.category);
      addDetail(details,"Propiedades",system.properties);
      break;
    case "device":
      addDetail(details,"Categoría",system.category);
      addDetail(details,"Energía",Number(system.energy?.max??0)>0 ? (system.energy?.max+" E") : "");
      addDetail(details,"Caudal",system.flow);
      addDetail(details,"Estabilidad",system.stability);
      addDetail(details,"Activación",system.activation);
      break;
    case "spell":
      addDetail(details,"Disciplina",TM_CONFIG.disciplines[system.discipline]??system.discipline);
      addDetail(details,"Grado",system.grade);
      addDetail(details,"Maná",system.manaCost);
      addDetail(details,"Activación",system.activation);
      addDetail(details,"Alcance",system.range);
      if(Number(system.damage??0)>0) addDetail(details,"Daño",system.damage);
      if(Number(system.penetration??0)>0) addDetail(details,"Penetración",system.penetration);
      break;
    case "ritual":
      addDetail(details,"Grado",system.grade);
      addDetail(details,"DF",system.difficulty);
      addDetail(details,"Tiempo",system.time);
      addDetail(details,"Participantes",system.participants);
      break;
    case "formula":
      addDetail(details,"Grado",system.grade);
      addDetail(details,"Preparación",system.preparation);
      addDetail(details,"Activación",system.activation);
      addDetail(details,"Dosis",system.dose);
      addDetail(details,"Efecto",system.effect);
      break;
    case "technique":
      addDetail(details,"Grado",TM_CONFIG.techniqueGrades[system.grade]??system.grade);
      addDetail(details,"Activación",system.activation);
      addDetail(details,"Coste",system.cost);
      addDetail(details,"Objetivo",system.target);
      addDetail(details,"Efecto",system.effect);
      break;
    case "trait":
      addDetail(details,"Categoría",TM_CONFIG.traitCategories[system.category]??system.category);
      addDetail(details,"Efecto",system.effect);
      break;
    case "specialization":
      addDetail(details,"Habilidad",TM_CONFIG.skillLabels[system.skill]??system.skill);
      addDetail(details,"Efecto",system.effect);
      break;
    case "origin":
      addDetail(details,"Familiaridad",system.familiarity);
      addDetail(details,"Idiomas",system.languageProfile);
      addDetail(details,"Facetas",system.facetOptions);
      break;
    case "background":
      addDetail(details,"Familiaridad",system.familiarity);
      addDetail(details,"Facetas",system.facetOptions);
      break;
    case "discipline":
      addDetail(details,"Disciplina",TM_CONFIG.disciplines[system.discipline]??system.discipline);
      break;
    case "ancestry":
      addDetail(details,"Notas",system.selectionNotes);
      break;
  }
  if(["weapon","armor","shield","equipment","device","formula"].includes(entry.type) && system.priceStatus==="exact"){
    addDetail(details,"Precio",formatCopper(system.priceCopper));
  }
  return details;
}

function searchableParts(entry){
  const system=entry.system??{};
  return [
    entry.name,
    TM_CONFIG.itemTypes[entry.type]??entry.type,
    system.description,
    system.category,
    system.properties,
    system.skill,
    TM_CONFIG.skillLabels[system.skill],
    system.discipline,
    TM_CONFIG.disciplines[system.discipline],
    ...(Array.isArray(system.tags)?system.tags:[])
  ];
}

export function contentBrowserEntries(catalog=coreCatalog()){
  return catalog
    .map((entry)=>({
      id:String(entry.type)+":"+String(entry.system?.slug??entry.name),
      name:String(entry.name??""),
      type:String(entry.type??""),
      typeLabel:TM_CONFIG.itemTypes[entry.type]??entry.type,
      description:plainText(entry.system?.description??entry.system?.effect??""),
      searchKey:normalizeSearch(searchableParts(entry).filter(Boolean).join(" ")),
      details:entryDetails(entry),
      source:entry
    }))
    .sort((a,b)=>{
      const ai=TYPE_ORDER.indexOf(a.type), bi=TYPE_ORDER.indexOf(b.type);
      const ao=ai<0?999:ai, bo=bi<0?999:bi;
      return ao-bo || a.name.localeCompare(b.name,"es");
    });
}

export function contentBrowserTypeOptions(entries=contentBrowserEntries()){
  const counts=new Map();
  for(const entry of entries) counts.set(entry.type,(counts.get(entry.type)??0)+1);
  return [...counts.entries()]
    .sort(([a],[b])=>{
      const ai=TYPE_ORDER.indexOf(a), bi=TYPE_ORDER.indexOf(b);
      return (ai<0?999:ai)-(bi<0?999:bi) || a.localeCompare(b);
    })
    .map(([type,count])=>({type,label:TM_CONFIG.itemTypes[type]??type,count}));
}

export function filterContentBrowserEntries(entries,{query="",type=""}={}){
  const q=normalizeSearch(query);
  return entries.filter((entry)=>
    (!type||entry.type===type) &&
    (!q||entry.searchKey.includes(q))
  );
}

export function contentBrowserEntryById(entries,id){
  return entries.find((entry)=>entry.id===id)??null;
}
