import {
  CRAFTING_MATERIAL_COVERAGE,
  CRAFTING_QUALITY,
  projectRequirements,
  qualityValueCopper,
  specialMaterialSupplementCopper,
  totalReferenceValueCopper
} from "./crafting.mjs";

const PHYSICAL_TYPES = new Set(["weapon","armor","shield","equipment","device"]);
const COVERAGE_ORDER = Object.freeze({ component:0, major:1, dominant:2 });

const MODIFICATIONS = Object.freeze({
  maintainable:Object.freeze({ key:"maintainable", label:"Mantenible", capM:1, group:"repair-time" }),
  modular:Object.freeze({ key:"modular", label:"Modular", capM:1, group:"modular" }),
  compact:Object.freeze({ key:"compact", label:"Compacta", capM:1, group:"compact" }),
  secureRetention:Object.freeze({ key:"secureRetention", label:"Retención segura", capM:1, group:"disarm-defense" }),
  balancedParry:Object.freeze({ key:"balancedParry", label:"Equilibrada para Parada", capM:1, group:"parry-defense" }),
  stabilized:Object.freeze({ key:"stabilized", label:"Estabilizada", capM:1, group:"stationary-attack" }),
  silent:Object.freeze({ key:"silent", label:"Silenciosa", capM:1, group:"silent" }),
  articulated:Object.freeze({ key:"articulated", label:"Articulada", capM:1, group:"understrength" }),
  tunedBlock:Object.freeze({ key:"tunedBlock", label:"Bloqueo afinado", capM:1, group:"block-defense" }),
  specializedTool:Object.freeze({ key:"specializedTool", label:"Herramienta especializada", capM:1, group:"specialized-tool" }),
  fieldPrepared:Object.freeze({ key:"fieldPrepared", label:"Preparada para campo", capM:1, group:"field-prepared" }),
  lightened:Object.freeze({ key:"lightened", label:"Aligerada", capM:2, group:"strength-min-reduction" }),
  optimizedStrike:Object.freeze({ key:"optimizedStrike", label:"Golpe optimizado", capM:2, group:"damage-manufacture" }),
  penetratingProfile:Object.freeze({ key:"penetratingProfile", label:"Perfil penetrante", capM:2, group:"penetration-manufacture" }),
  refinedReload:Object.freeze({ key:"refinedReload", label:"Mecanismo de recarga refinado", capM:2, group:"reload-manufacture" }),
  mobileFrame:Object.freeze({ key:"mobileFrame", label:"Bastidor móvil", capM:2, group:"shield-movement" })
});

const MATERIAL_PROFILES = Object.freeze({
  kharumSteel:Object.freeze({
    key:"kharumSteel", label:"Acero de Kharum", family:"metal", grade:"specialized",
    minimumCoverage:"dominant", propertyKey:"kharum-tenacity", group:"structural-degradation"
  }),
  ereliaTreatedWood:Object.freeze({
    key:"ereliaTreatedWood", label:"Madera tratada de Erelia", family:"wood", grade:"specialized",
    minimumCoverage:"major", propertyKey:"environmental-stability", group:"environmental-stability"
  }),
  refinedArcaneCrystal:Object.freeze({
    key:"refinedArcaneCrystal", label:"Cristal arcano refinado", family:"arcane-crystal", grade:"specialized",
    minimumCoverage:"component", propertyKey:"arcane-conductor", group:"arcane-conductor"
  }),
  kharumPrecisionAlloy:Object.freeze({
    key:"kharumPrecisionAlloy", label:"Aleación de precisión de Kharum", family:"metal", grade:"rare",
    minimumCoverage:"major", propertyKey:"fine-machining", group:"fine-machining"
  }),
  desertGlass:Object.freeze({
    key:"desertGlass", label:"Vidrio del Desierto", family:"glass-mineral", grade:"rare",
    minimumCoverage:"component", propertyKey:"liminal-refraction", group:"liminal-refraction"
  }),
  thousandVoicesWood:Object.freeze({
    key:"thousandVoicesWood", label:"Madera de las Mil Voces", family:"wood", grade:"rare",
    minimumCoverage:"major", propertyKey:"acoustic-damping", group:"silent"
  }),
  founderRecovered:Object.freeze({
    key:"founderRecovered", label:"Material de los Fundadores recuperado", family:"technical-variable", grade:"exceptional",
    minimumCoverage:"component", propertyKey:"", group:""
  })
});

const QUALITY_TRANSITIONS = Object.freeze({
  "defective>common":Object.freeze({ material:0.25, time:0.5 }),
  "common>superior":Object.freeze({ material:0.25, time:0.5 }),
  "superior>exceptional":Object.freeze({ material:0.5, time:0.5 }),
  "common>exceptional":Object.freeze({ material:0.75, time:1 })
});

const number=(value,fallback=0)=>{
  const parsed=Number(value);
  return Number.isFinite(parsed)?parsed:fallback;
};

const copperCeil=(value)=>Math.ceil(Math.max(0,number(value))-Number.EPSILON);
const minutes=(value)=>Math.max(0,number(value));
const clone=(value)=>globalThis.foundry?.utils?.deepClone?foundry.utils.deepClone(value):structuredClone(value);
const text=(value)=>String(value??"").trim();

function propertiesText(system={}) {
  return String(system.properties??"").toLowerCase();
}
function isTool(system={}) {
  return /herramienta|kit/i.test(String(system.category??"")) || /herramienta|kit/i.test(String(system.properties??""));
}
function hasPropertyText(system,pattern) {
  return pattern.test(propertiesText(system));
}
function normalizedModification(row={}) {
  return {
    key:text(row.key),
    choice:text(row.choice),
    scope:text(row.scope),
    part:text(row.part)
  };
}
function normalizedMaterial(row={}) {
  return {
    id:text(row.id),
    name:text(row.name),
    profileKey:text(row.profileKey),
    grade:text(row.grade||"ordinary"),
    coverage:text(row.coverage||"component"),
    supplementCopper:copperCeil(row.supplementCopper),
    sourceItemUuid:text(row.sourceItemUuid),
    part:text(row.part)
  };
}
function modificationCompatibility(itemSource,mod) {
  const type=String(itemSource?.type??"");
  const system=itemSource?.system??{};
  const props=propertiesText(system);
  switch(mod.key) {
    case "maintainable":
      return PHYSICAL_TYPES.has(type);
    case "modular":
      return ["weapon","equipment","device"].includes(type);
    case "compact":
      return (type==="weapon" || (type==="equipment" && isTool(system))) &&
        !/pesada|alcance|2 manos/.test(props);
    case "secureRetention":
      return type==="weapon" || (type==="equipment" && isTool(system));
    case "balancedParry":
      return type==="weapon" && String(system.skill??"")!=="rangedWeapons";
    case "stabilized":
      return type==="weapon" && String(system.skill??"")==="rangedWeapons" && !/arrojad/.test(props);
    case "silent":
      return type==="armor" || (type==="equipment" && mod.scope==="body");
    case "articulated":
      return type==="armor" && number(system.strengthMin)>0;
    case "tunedBlock":
      return type==="shield" && number(system.block)>0;
    case "specializedTool":
    case "fieldPrepared":
      return type==="equipment" && isTool(system) && Boolean(mod.choice);
    case "lightened":
      return ["weapon","armor","shield"].includes(type) && number(system.strengthMin)>0;
    case "optimizedStrike":
      return type==="weapon" && number(system.damage)>0;
    case "penetratingProfile":
      return type==="weapon" && number(system.penetration)>=0 && number(system.penetration)<=2;
    case "refinedReload":
      return type==="weapon" && number(system.reload)>=2;
    case "mobileFrame":
      return type==="shield" && number(system.movementPenalty)<0;
    default:
      return false;
  }
}

export const CRAFTING_MODIFICATIONS=MODIFICATIONS;
export const CRAFTING_MATERIAL_PROFILES=MATERIAL_PROFILES;

export function qualityCapacity(quality="common") {
  return Math.max(0,Math.floor(number(CRAFTING_QUALITY[String(quality)]?.capM)));
}

export function qualityUpgradeQuote({
  fromQuality="common",
  toQuality="common",
  referenceValueCopper=0,
  baseTimeMinutes=0
}={}) {
  const key=String(fromQuality)+">"+String(toQuality);
  const transition=QUALITY_TRANSITIONS[key];
  if(!transition) return {valid:false,materialCopper:0,timeMinutes:0,error:"Transición de Calidad no permitida por CRAFT-04."};
  return {
    valid:true,
    materialCopper:copperCeil(number(referenceValueCopper)*transition.material),
    timeMinutes:minutes(baseTimeMinutes)*transition.time,
    capMGained:Math.max(0,qualityCapacity(toQuality)-qualityCapacity(fromQuality))
  };
}

export function modificationInstallationQuote({
  points=0,
  referenceValueCopper=0,
  baseTimeMinutes=0,
  fineMachining=false
}={}) {
  const p=Math.max(0,Math.floor(number(points)));
  const materialRate=fineMachining?0.05:0.10;
  const timeRate=fineMachining?0.15:0.25;
  return {
    materialCopper:copperCeil(number(referenceValueCopper)*materialRate*p),
    timeMinutes:Math.max(p?60:0,minutes(baseTimeMinutes)*timeRate*p),
    points:p,
    fineMachining:fineMachining===true
  };
}

export function modificationRemovalQuote({
  baseTimeMinutes=0
}={}) {
  return {
    materialCopper:0,
    timeMinutes:Math.max(30,minutes(baseTimeMinutes)*0.10)
  };
}

export function materialInstallationQuote({
  referenceValueCopper=0,
  grade="ordinary",
  coverage="component",
  baseTimeMinutes=0
}={}) {
  if(coverage==="dominant") {
    return {valid:false,materialCopper:0,timeMinutes:0,error:"Cambiar el Material Dominante exige reconstrucción o receta específica."};
  }
  const fraction=coverage==="major"?0.5:0.25;
  return {
    valid:true,
    materialCopper:specialMaterialSupplementCopper(referenceValueCopper,{grade,coverage}),
    timeMinutes:Math.max(60,minutes(baseTimeMinutes)*fraction)
  };
}

export function validateSpecialMaterials(rows=[],{allowUnknownProfiles=true}={}) {
  const materials=(Array.isArray(rows)?rows:[]).map(normalizedMaterial);
  const issues=[];
  let dominant=0;
  const groups=new Map();
  for(const row of materials) {
    if(!row.profileKey) {
      issues.push({code:"material-profile-missing",materialId:row.id,message:"Todo Material Especial debe declarar un Perfil de Material identificable."});
    }
    if(!(row.coverage in COVERAGE_ORDER)) {
      issues.push({code:"material-coverage",materialId:row.id,message:"Cobertura material desconocida."});
      continue;
    }
    if(row.coverage==="dominant") dominant+=1;
    if(row.coverage!=="dominant" && !row.part) {
      issues.push({code:"material-functional-part",materialId:row.id,message:"Un Material Especial no dominante debe identificar la parte funcional que ocupa."});
    }
    const profile=MATERIAL_PROFILES[row.profileKey];
    if(!profile) {
      if(!allowUnknownProfiles && row.profileKey) issues.push({code:"material-profile",materialId:row.id,message:"Perfil de Material no reconocido."});
      continue;
    }
    if(row.grade!==profile.grade) {
      issues.push({code:"material-grade-profile",materialId:row.id,message:"El Grado no coincide con el Perfil de Material."});
    }
    if(COVERAGE_ORDER[row.coverage]<COVERAGE_ORDER[profile.minimumCoverage]) {
      issues.push({code:"material-coverage-minimum",materialId:row.id,message:"La cobertura no alcanza el mínimo del Perfil de Material."});
    }
    if(profile.group) {
      const prior=groups.get(profile.group);
      if(prior) issues.push({code:"equivalent-material",materialId:row.id,message:"Dos Materiales intentan aportar la misma propiedad mecánica.",conflictsWith:prior});
      else groups.set(profile.group,row.id);
    }
  }
  if(dominant>1) issues.push({code:"dominant-material",message:"Un objeto sólo puede poseer un Material Dominante."});
  return {valid:issues.length===0,issues,materials};
}

export function validateModificationSelection(itemSource,{
  quality="common",
  modifications=[],
  specialMaterials=[]
}={}) {
  const mods=(Array.isArray(modifications)?modifications:[]).map(normalizedModification);
  const issues=[];
  const seen=new Set();
  const groups=new Map();
  let used=0;

  const materialCheck=validateSpecialMaterials(specialMaterials);
  issues.push(...materialCheck.issues);
  for(const material of materialCheck.materials) {
    const profile=MATERIAL_PROFILES[material.profileKey];
    if(profile?.group) groups.set(profile.group,"material:"+material.id);
  }

  for(const mod of mods) {
    const profile=MODIFICATIONS[mod.key];
    if(!profile) {
      issues.push({code:"modification",key:mod.key,message:"Modificación desconocida."});
      continue;
    }
    if(seen.has(mod.key)) {
      issues.push({code:"duplicate-modification",key:mod.key,message:"La misma Modificación no puede instalarse dos veces."});
      continue;
    }
    seen.add(mod.key);
    used+=profile.capM;
    if(!modificationCompatibility(itemSource,mod)) {
      issues.push({code:"modification-compatibility",key:mod.key,message:profile.label+" no es compatible con este objeto o le falta una elección requerida."});
    }
    if(profile.group && groups.has(profile.group)) {
      issues.push({code:"equivalent-property",key:mod.key,message:profile.label+" es equivalente a otra propiedad ya presente y no se acumula.",conflictsWith:groups.get(profile.group)});
    } else if(profile.group) groups.set(profile.group,"modification:"+mod.key);
  }

  const capacity=qualityCapacity(quality);
  if(used>capacity) issues.push({code:"capm",message:"Las Modificaciones exceden la CapM de la Calidad.",used,capacity});
  return {valid:issues.length===0,issues,modifications:mods,capMUsed:used,capM:capacity};
}

export function manufacturingBaseStats(itemSource={}) {
  const system=itemSource.system??itemSource??{};
  const result={ properties:String(system.properties??"") };
  for(const key of ["damage","penetration","strengthMin","reload","block","movementPenalty"]) {
    if(Object.prototype.hasOwnProperty.call(system,key)) result[key]=number(system[key]);
  }
  return result;
}

function appendProperty(properties,label) {
  const parts=String(properties??"").split(/[;,]/).map((v)=>v.trim()).filter(Boolean);
  if(!parts.some((v)=>v.toLowerCase()===label.toLowerCase())) parts.push(label);
  return parts.join(", ");
}

export function deriveManufacturedSystem(itemSource,{
  referenceValueCopper=0,
  baseTimeMinutes=0,
  baseRank=0,
  baseInstallation="improvised",
  quality="common",
  modifications=[],
  specialMaterials=[],
  existingManufacture=null
}={}) {
  const source=clone(itemSource);
  const system=source.system??source;
  const baseStats=existingManufacture?.baseStats && Object.keys(existingManufacture.baseStats).length
    ? clone(existingManufacture.baseStats)
    : manufacturingBaseStats(source);
  const validation=validateModificationSelection(source,{quality,modifications,specialMaterials});
  if(!validation.valid) return {valid:false,issues:validation.issues};

  for(const [key,value] of Object.entries(baseStats)) system[key]=clone(value);
  const effects={
    repairTimeMultiplier:1,
    parryDefenseBonus:2,
    blockDefenseBonus:number(system.block),
    stationaryAttackBonus:0,
    disarmDefenseBonus:0,
    silent:false,
    articulated:false,
    modularFamilies:[],
    specializedToolOperations:[],
    fieldPreparedOperations:[],
    materialProperties:[]
  };

  for(const mod of validation.modifications) {
    switch(mod.key) {
      case "maintainable": effects.repairTimeMultiplier=0.5; break;
      case "modular": if(mod.choice) effects.modularFamilies.push(mod.choice); break;
      case "compact": system.properties=appendProperty(system.properties,"Ocultable"); break;
      case "secureRetention": effects.disarmDefenseBonus=1; break;
      case "balancedParry": effects.parryDefenseBonus=3; break;
      case "stabilized": effects.stationaryAttackBonus=1; break;
      case "silent": effects.silent=true; break;
      case "articulated": effects.articulated=true; break;
      case "tunedBlock": system.block=Math.max(number(system.block),3); effects.blockDefenseBonus=3; break;
      case "specializedTool": if(mod.choice) effects.specializedToolOperations.push(mod.choice); break;
      case "fieldPrepared": if(mod.choice) effects.fieldPreparedOperations.push(mod.choice); break;
      case "lightened": system.strengthMin=Math.max(0,number(system.strengthMin)-1); break;
      case "optimizedStrike": system.damage=number(system.damage)+1; break;
      case "penetratingProfile": system.penetration=Math.min(3,number(system.penetration)+1); break;
      case "refinedReload": system.reload=Math.max(1,number(system.reload)-1); break;
      case "mobileFrame": system.movementPenalty=0; break;
    }
  }

  const mats=validation.modifications?validateSpecialMaterials(specialMaterials).materials:[];
  const dominant=mats.find((row)=>row.coverage==="dominant")?.id??"";
  for(const row of mats) {
    const profile=MATERIAL_PROFILES[row.profileKey];
    if(profile?.propertyKey) effects.materialProperties.push(profile.propertyKey);
    if(profile?.group==="silent") effects.silent=true;
  }
  const supplements=mats.map((row)=>specialMaterialSupplementCopper(referenceValueCopper,{grade:row.grade,coverage:row.coverage}));
  const totalValue=totalReferenceValueCopper({
    referenceValueCopper,
    quality,
    specialMaterialSupplementsCopper:supplements
  });

  system.quality=quality;
  system.priceCopper=copperCeil(totalValue);
  system.priceStatus="exact";
  system.manufacture={
    referenceValueCopper:copperCeil(referenceValueCopper),
    baseTimeMinutes:minutes(baseTimeMinutes),
    baseRank:Math.max(0,Math.min(5,Math.floor(number(baseRank)))),
    baseInstallation:String(baseInstallation||"improvised"),
    baseStats,
    modifications:validation.modifications,
    specialMaterials:mats.map((row)=>({
      ...row,
      supplementCopper:specialMaterialSupplementCopper(referenceValueCopper,{grade:row.grade,coverage:row.coverage})
    })),
    dominantMaterialId:dominant,
    capMUsed:validation.capMUsed,
    totalReferenceValueCopper:copperCeil(totalValue),
    effects
  };
  return {valid:true,system,manufacture:system.manufacture,totalReferenceValueCopper:copperCeil(totalValue)};
}

export function modificationPoints(modifications=[]) {
  return (Array.isArray(modifications)?modifications:[]).reduce((sum,row)=>sum+(MODIFICATIONS[text(row?.key)]?.capM??0),0);
}

export function materialProfile(profileKey="") {
  return MATERIAL_PROFILES[String(profileKey)]??null;
}

export function modificationProfile(key="") {
  return MODIFICATIONS[String(key)]??null;
}

export function requirementsForManufacture({
  baseRank=0,
  baseInstallation="improvised",
  quality="common",
  specialMaterials=[]
}={}) {
  const order=["ordinary","specialized","rare","exceptional"];
  let grade="ordinary";
  for(const row of Array.isArray(specialMaterials)?specialMaterials:[]) {
    const candidate=String(row?.grade??"ordinary");
    if(order.indexOf(candidate)>order.indexOf(grade)) grade=candidate;
  }
  return {
    materialGrade:grade,
    ...projectRequirements({baseRank,baseInstallation,quality,materialGrade:grade})
  };
}
