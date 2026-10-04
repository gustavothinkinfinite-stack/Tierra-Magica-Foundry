import {
  adjustedBaseTimeMinutes,
  applyUniversalTimeReductions,
  craftingProjectRemainingMinutes,
  failedAccelerationTotalMinutes,
  normalizeCraftingProject,
  qualityValueCopper,
  repairQuote,
  salvageQuote,
  totalCraftMaterialCostCopper,
  validateCraftingProject,
  validateProjectPrerequisites
} from "./crafting.mjs";
import {
  deriveManufacturedSystem,
  materialInstallationQuote,
  materialProfile,
  modificationInstallationQuote,
  modificationRemovalQuote,
  modificationPoints,
  qualityCapacity,
  qualityUpgradeQuote,
  requirementsForManufacture,
  validateModificationSelection,
  validateSpecialMaterials
} from "./crafting-enhancements.mjs";
import {
  enchantmentCostQuote,
  enchantmentProfile,
  imprintActivationProfile,
  imprintStoneCraftProfile,
  maxRunicCapacityForQuality,
  runicMatrixQuote,
  runeInscriptionQuote,
  sealRearmQuote,
  trapFrameProfile,
  trapRearmQuote,
  utilityEnchantmentQuote,
  validateEnchantmentSupport,
  validateRunicConfiguration,
  validateTrapConfiguration
} from "./crafting-magic.mjs";

const PHYSICAL_TYPES = new Set(["weapon","armor","shield","equipment","formula","device"]);

const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const nonNegative = (value) => Math.max(0, number(value));

function clone(value) {
  if (globalThis.foundry?.utils?.deepClone) return foundry.utils.deepClone(value);
  return structuredClone(value);
}

function projectKey(project) {
  return String(project?.uuid ?? project?.id ?? "");
}

function actorKey(actor) {
  return String(actor?.uuid ?? actor?.id ?? "");
}

function randomToken() {
  return globalThis.foundry?.utils?.randomID?.() ??
    ("craft-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2));
}

function sameParent(document, actor) {
  if (!document || !actor) return false;
  if (document.parent === actor) return true;
  return Boolean(document.parent?.id && actor.id && document.parent.id === actor.id);
}

function lotData(item) {
  const data = item?.system?.craftingLot ?? {};
  const reservations = data.reservations && typeof data.reservations === "object" && !Array.isArray(data.reservations)
    ? { ...data.reservations }
    : {};
  return {
    enabled: data.enabled === true,
    category: String(data.category ?? ""),
    resourceGrade: String(data.resourceGrade ?? "ordinary"),
    compatibility: Array.isArray(data.compatibility) ? data.compatibility.map(String) : [],
    materialProfileKey: String(data.materialProfileKey ?? ""),
    preparation: String(data.preparation ?? "prepared"),
    inputValueCopper: Math.max(0, Math.floor(number(data.inputValueCopper))),
    reservations
  };
}

function reservationAmount(entry) {
  return Math.max(0, Math.floor(number(entry?.amountCopper)));
}

export function craftingLotReservedCopper(item, { excludingProject = "" } = {}) {
  const lot = lotData(item);
  return Object.entries(lot.reservations).reduce((sum, [key, reservation]) => {
    if (excludingProject && key === excludingProject) return sum;
    return sum + reservationAmount(reservation);
  }, 0);
}

export function craftingLotAvailableCopper(item, { project = null } = {}) {
  const key = projectKey(project);
  const lot = lotData(item);
  return Math.max(0, lot.inputValueCopper - craftingLotReservedCopper(item, { excludingProject:key }));
}

export function craftingProjectMaterialAllocations(project) {
  const normalized = normalizeCraftingProject(project?.system ?? project);
  const bySource = new Map();
  for (const entry of normalized.ledger.entries) {
    if (entry.kind !== "material-allocation" || entry.resource !== "materials") continue;
    const sourceUuid = String(entry.sourceUuid ?? "").trim();
    const amountCopper = Math.max(0, Math.floor(number(entry.amountCopper)));
    const compatibility = String(entry.compatibility ?? "").trim();
    if (!sourceUuid || !amountCopper) continue;
    const previous = bySource.get(sourceUuid) ?? { sourceUuid, compatibilities:[], amountCopper:0 };
    previous.amountCopper += amountCopper;
    if (compatibility && !previous.compatibilities.includes(compatibility)) previous.compatibilities.push(compatibility);
    bySource.set(sourceUuid, previous);
  }
  return [...bySource.values()];
}

function componentReservationData(item) {
  const data = item?.system?.craftingReservations;
  return data && typeof data === "object" && !Array.isArray(data) ? { ...data } : {};
}

function componentReservationQuantity(entry) {
  return Math.max(0, Math.floor(number(entry?.quantity)));
}

export function craftingComponentReservedQuantity(item, { excludingProject = "" } = {}) {
  return Object.entries(componentReservationData(item)).reduce((sum, [key, reservation]) => {
    if (excludingProject && key === excludingProject) return sum;
    return sum + componentReservationQuantity(reservation);
  }, 0);
}

export function craftingComponentAvailableQuantity(item, { project = null } = {}) {
  const quantity = Math.max(0, Math.floor(number(item?.system?.quantity, 1)));
  return Math.max(0, quantity - craftingComponentReservedQuantity(item, { excludingProject:projectKey(project) }));
}

export function craftingProjectComponentAllocations(project) {
  const normalized = normalizeCraftingProject(project?.system ?? project);
  if (!["fabricate","repair","modify"].includes(normalized.operation)) return [];
  const grouped = new Map();
  for (const component of normalized.components) {
    const sourceUuid = String(component.itemUuid ?? "").trim();
    const quantity = Math.max(1, Math.floor(number(component.quantity, 1)));
    if (!sourceUuid) {
      grouped.set("__missing__:" + component.id, {
        sourceUuid:"",
        quantity,
        componentIds:[component.id],
        name:component.name
      });
      continue;
    }
    const previous = grouped.get(sourceUuid) ?? {
      sourceUuid,
      quantity:0,
      componentIds:[],
      name:component.name
    };
    previous.quantity += quantity;
    previous.componentIds.push(component.id);
    grouped.set(sourceUuid, previous);
  }
  return [...grouped.values()];
}

async function resolveOwnedItem(actor, uuid, resolver = globalThis.fromUuid) {
  if (!uuid || typeof resolver !== "function") return null;
  const item = await resolver(uuid);
  if (!item || !sameParent(item, actor)) return null;
  return item;
}

function expectedRevisionMatches(project, expectedRevision) {
  if (expectedRevision === null || expectedRevision === undefined) return true;
  return Math.floor(number(project?.system?.execution?.revision)) === Math.floor(number(expectedRevision));
}

async function rollbackUpdates(snapshots = []) {
  for (const snapshot of [...snapshots].reverse()) {
    try {
      await snapshot.document.update(snapshot.updates, { tmValidated:true, tmCraftingRollback:true });
    } catch (error) {
      console.error("Foundry T.M. | CRAFT-13C rollback incompleto", error);
    }
  }
}

function reservationRecord(project, amountCopper) {
  return {
    projectUuid: projectKey(project),
    actorUuid: actorKey(project?.parent),
    amountCopper,
    createdAt: Date.now()
  };
}

function itemSource(item) {
  return typeof item?.toObject === "function"
    ? item.toObject()
    : { name:item?.name ?? "", type:item?.type ?? "", system:clone(item?.system ?? {}) };
}

function baseItemSource(target, manufacture) {
  const source=itemSource(target);
  source.system ??= {};
  for (const [key,value] of Object.entries(manufacture.baseStats ?? {})) source.system[key]=clone(value);
  return source;
}

function currentManufacture(target, model) {
  const stored=target?.system?.manufacture ?? {};
  const quality=String(target?.system?.quality ?? "common");
  const referenceValueCopper=Math.max(0,Math.floor(number(stored.referenceValueCopper,
    quality==="common" ? number(target?.system?.priceCopper) : number(model?.economy?.referenceValueCopper))));
  return {
    referenceValueCopper,
    baseTimeMinutes:Math.max(0,number(stored.baseTimeMinutes,model?.time?.baseMinutes)),
    baseRank:Math.max(0,Math.floor(number(stored.baseRank,model?.professional?.baseRank))),
    baseInstallation:String(stored.baseInstallation ?? model?.professional?.baseInstallation ?? "improvised"),
    baseStats:stored.baseStats && typeof stored.baseStats==="object" ? clone(stored.baseStats) : {},
    modifications:Array.isArray(stored.modifications) ? clone(stored.modifications) : [],
    specialMaterials:Array.isArray(stored.specialMaterials) ? clone(stored.specialMaterials) : [],
    dominantMaterialId:String(stored.dominantMaterialId ?? ""),
    quality
  };
}


function analyzeRepairMaterialLayers(model, manufacture, condition) {
  const installed=Array.isArray(manufacture.specialMaterials)?clone(manufacture.specialMaterials):[];
  const byId=new Map(installed.map((row)=>[String(row.id),row]));
  const affected=new Set(model.repair?.affectedMaterialIds ?? []);
  const ordinary=new Set(model.repair?.ordinaryReplacementMaterialIds ?? []);
  const specialReplacements=Array.isArray(model.repair?.specialReplacements)?model.repair.specialReplacements:[];
  const issues=[];

  for(const id of affected) {
    if(!byId.has(id)) issues.push({code:"repair-material-unknown",materialId:id,message:"La reparación declara afectado un Material Especial que el objeto ya no posee."});
  }
  for(const id of ordinary) {
    if(!affected.has(id)) issues.push({code:"repair-ordinary-not-affected",materialId:id,message:"Un reemplazo ordinario sólo puede aplicarse a una parte especial declarada como afectada."});
  }

  const specialByMaterial=new Map();
  for(const row of specialReplacements) {
    const materialId=String(row.materialId ?? "");
    if(!materialId || !affected.has(materialId)) {
      issues.push({code:"repair-special-not-affected",materialId,message:"Un reemplazo especial sólo puede aplicarse a una parte declarada como afectada."});
      continue;
    }
    if(specialByMaterial.has(materialId)) {
      issues.push({code:"repair-special-duplicate",materialId,message:"La misma parte especial no puede recibir dos reemplazos."});
      continue;
    }
    if(ordinary.has(materialId)) {
      issues.push({code:"repair-replacement-conflict",materialId,message:"Una parte no puede reemplazarse a la vez con material ordinario y especial."});
      continue;
    }
    if(!String(row.sourceItemUuid ?? "").trim()) {
      issues.push({code:"repair-special-source",materialId,message:"El reemplazo especial debe señalar un Lote físico compatible."});
      continue;
    }
    specialByMaterial.set(materialId,row);
  }

  const vrq=qualityValueCopper(manufacture.referenceValueCopper,manufacture.quality);
  let affectedSpecialValueCopper=0;
  for(const id of affected) {
    const row=byId.get(id);
    if(row) affectedSpecialValueCopper+=2*Math.max(0,Math.floor(number(row.supplementCopper)));
  }
  const expectedBraCopper=vrq+affectedSpecialValueCopper;
  if(model.economy.affectedValueCopper!==expectedBraCopper) {
    issues.push({
      code:"repair-bra",
      message:"La BRA no coincide con VRQ más las capas de Material Especial realmente afectadas.",
      expectedCopper:expectedBraCopper
    });
  }

  const preservedAffected=installed.filter((row)=>affected.has(String(row.id)) && !ordinary.has(String(row.id)));
  const req=requirementsForManufacture({
    baseRank:manufacture.baseRank,
    baseInstallation:manufacture.baseInstallation,
    quality:manufacture.quality,
    specialMaterials:preservedAffected
  });
  issues.push(...enhancementRequirementsMatch(model,req));
  const grades=["ordinary","specialized","rare","exceptional"];
  if(grades.indexOf(model.economy.workMaterialGrade)<grades.indexOf(req.materialGrade)) {
    issues.push({code:"repair-material-grade",message:"El grado de trabajo está por debajo de la parte especial que se pretende preservar.",expectedGrade:req.materialGrade});
  }

  const replacementRequirements=[];
  for(const [materialId,row] of specialByMaterial) {
    const installedMaterial=byId.get(materialId);
    if(!installedMaterial) continue;
    const requiredCopper=repairQuote({
      condition,
      affectedValueCopper:2*Math.max(0,Math.floor(number(installedMaterial.supplementCopper))),
      affectedTimeMinutes:0
    }).materialCopper;
    replacementRequirements.push({
      materialId,
      sourceItemUuid:String(row.sourceItemUuid),
      profileKey:String(installedMaterial.profileKey ?? ""),
      requiredCopper
    });
  }

  return {
    valid:issues.length===0,
    issues,
    installed,
    affected,
    ordinary,
    specialReplacements,
    replacementRequirements,
    expectedBraCopper,
    remainingMaterials:installed.filter((row)=>!ordinary.has(String(row.id))),
    requirements:req
  };
}

async function validateRepairReplacementSources(project, plan, allocations, resolver) {
  if(!plan?.replacementRequirements?.length) return {ok:true};
  const grouped=new Map();
  for(const row of plan.replacementRequirements) {
    const prior=grouped.get(row.sourceItemUuid) ?? {amountCopper:0,profileKeys:new Set(),materialIds:[]};
    prior.amountCopper+=row.requiredCopper;
    prior.profileKeys.add(row.profileKey);
    prior.materialIds.push(row.materialId);
    grouped.set(row.sourceItemUuid,prior);
  }

  for(const [sourceUuid,requirement] of grouped) {
    if(requirement.profileKeys.size!==1) {
      return {ok:false,error:"Un mismo Lote de reparación no puede representar varios Perfiles de Material.",sourceUuid};
    }
    const item=await resolveOwnedItem(project.parent,sourceUuid,resolver);
    if(!item) return {ok:false,error:"El Lote especial de reparación ya no existe.",sourceUuid};
    const lot=lotData(item);
    const profileKey=[...requirement.profileKeys][0];
    if(!lot.enabled) return {ok:false,error:item.name+" no está marcado como Lote de fabricación.",sourceUuid};
    if(lot.preparation!=="prepared") return {ok:false,error:item.name+" debe estar Preparado para reemplazar una parte especial.",sourceUuid};
    if(lot.materialProfileKey!==profileKey) {
      return {ok:false,error:item.name+" no preserva el Perfil de Material requerido ("+profileKey+").",sourceUuid};
    }
    const allocation=allocations.find((row)=>row.sourceUuid===sourceUuid);
    const compatibility="material:"+profileKey;
    if(!allocation || allocation.amountCopper<requirement.amountCopper) {
      return {ok:false,error:"La reserva del Lote especial no cubre la fracción material de la reparación.",sourceUuid,expectedCopper:requirement.amountCopper};
    }
    if(!lot.compatibility.includes(compatibility) || !allocation.compatibilities.includes(compatibility)) {
      return {ok:false,error:"El Lote especial de reparación no declara la compatibilidad requerida.",sourceUuid,compatibility};
    }
  }
  return {ok:true};
}

function expectedStageRequiredMinutes(stageBaseMinutes, model, { reductionFactors = [] } = {}) {
  const base=Math.max(0,number(stageBaseMinutes));
  if(model.execution.accelerated && ["failure","pifia"].includes(model.execution.accelerationOutcome)) {
    return failedAccelerationTotalMinutes(base);
  }
  return applyUniversalTimeReductions(base,{
    workAssistants:model.assistants.work,
    accelerated:model.execution.accelerated && model.execution.accelerationOutcome==="success",
    reductionFactors:[...model.execution.reductionFactors,...reductionFactors]
  });
}

function enhancementRequirementsMatch(model, requirements) {
  const issues=[];
  if(model.professional.requiredRank < requirements.rank) {
    issues.push({code:"rank-understated",message:"El rango declarado no alcanza el requisito real de la mejora.",expectedRank:requirements.rank});
  }
  const installations=["improvised","adequate","professional","specialized","exceptional"];
  if(installations.indexOf(model.professional.requiredInstallation) < installations.indexOf(requirements.installation)) {
    issues.push({code:"installation-understated",message:"La instalación declarada no alcanza el requisito real de la mejora.",expectedInstallation:requirements.installation});
  }
  return issues;
}


function actorSkillRank(actor,key) {
  return Math.max(0,Math.floor(number(actor?.system?.skills?.[key]?.rank)));
}

function installationIndexLocal(value) {
  return ["improvised","adequate","professional","specialized","exceptional"].indexOf(String(value));
}

function magicProfessionalIssues(model, actor, {
  primarySkill,
  primaryRank,
  arcanaRank=0,
  craftingRank=0,
  installation="improvised"
}={}) {
  const issues=[];
  if(String(model.professional.skill)!==String(primarySkill)) {
    issues.push({code:"magic-primary-skill",message:"La Habilidad principal declarada no corresponde al procedimiento mágico.",expectedSkill:primarySkill});
  }
  if(model.professional.requiredRank<primaryRank) {
    issues.push({code:"magic-primary-rank",message:"El rango principal declarado está por debajo del requisito canónico.",expectedRank:primaryRank});
  }
  if(actorSkillRank(actor,primarySkill)<primaryRank) {
    issues.push({code:"magic-primary-actor-rank",message:"El Actor no alcanza el rango principal requerido.",skill:primarySkill,expectedRank:primaryRank});
  }
  if(actorSkillRank(actor,"arcana")<arcanaRank) {
    issues.push({code:"magic-arcana-rank",message:"Arcana no alcanza el requisito auxiliar del procedimiento.",expectedRank:arcanaRank});
  }
  if(actorSkillRank(actor,"crafting")<craftingRank) {
    issues.push({code:"magic-crafting-rank",message:"Artesanía no alcanza el requisito auxiliar del procedimiento.",expectedRank:craftingRank});
  }
  if(installationIndexLocal(model.professional.requiredInstallation)<installationIndexLocal(installation)) {
    issues.push({code:"magic-installation-declared",message:"La instalación declarada está por debajo del requisito mágico.",expectedInstallation:installation});
  }
  if(installationIndexLocal(model.professional.availableInstallation)<installationIndexLocal(installation)) {
    issues.push({code:"magic-installation-available",message:"La instalación disponible no alcanza el requisito mágico.",expectedInstallation:installation});
  }
  return issues;
}

function currentRunic(target) {
  const data=target?.system?.runic??{};
  return {
    capacityPrepared:Math.max(0,Math.floor(number(data.capacityPrepared))),
    matrixMaterialCopper:Math.max(0,Math.floor(number(data.matrixMaterialCopper))),
    addedValueCopper:Math.max(0,Math.floor(number(data.addedValueCopper))),
    channels:Array.isArray(data.channels)?clone(data.channels):[],
    imprints:Array.isArray(data.imprints)?clone(data.imprints):[]
  };
}

function currentEnchantment(target) {
  const data=target?.system?.enchantment??{};
  return {
    grade:Math.max(0,Math.floor(number(data.grade))),
    patternKey:String(data.patternKey??""),
    functionalKey:String(data.functionalKey??""),
    passiveKey:String(data.passiveKey??""),
    utilityKey:String(data.utilityKey??""),
    supportAppropriate:data.supportAppropriate===true,
    hasRareComponent:data.hasRareComponent===true,
    materialCostCopper:Math.max(0,Math.floor(number(data.materialCostCopper))),
    timeMinutes:Math.max(0,number(data.timeMinutes)),
    addedValueCopper:Math.max(0,Math.floor(number(data.addedValueCopper))),
    reserve:{
      value:Math.max(0,Math.floor(number(data.reserve?.value))),
      max:Math.max(0,Math.floor(number(data.reserve?.max)))
    },
    attunedActorUuid:String(data.attunedActorUuid??""),
    seal:data.seal===true,
    sealState:String(data.sealState??"charged"),
    sealTriggerType:String(data.sealTriggerType??""),
    sealBypassKey:String(data.sealBypassKey??""),
    rechargeBlocked:data.rechargeBlocked===true,
    chargedReferenceValueCopper:Math.max(0,Math.floor(number(data.chargedReferenceValueCopper))),
    boundSpell:data.boundSpell && typeof data.boundSpell==="object" ? clone(data.boundSpell) : null
  };
}

async function analyzeMagicModifyProject(project,model,resolver,target,current,baseSource) {
  const mode=String(model.enhancement.mode);
  const actor=project.parent;
  let materialCopper=0;
  let stageBaseMinutes=0;
  let magicUpdates={};
  let issues=[];

  if(mode==="runicMatrix") {
    if(model.specialMaterials.length||model.modifications.length) return {ok:false,error:"Preparar CRu no instala simultáneamente Materiales ni Modificaciones."};
    const runic=currentRunic(target);
    const targetCapacity=Math.max(0,Math.floor(number(model.enhancement.runicCapacityTarget)));
    const maximum=maxRunicCapacityForQuality(current.quality);
    if(targetCapacity<=runic.capacityPrepared || targetCapacity>maximum) {
      return {ok:false,error:"La CRu objetivo debe aumentar la capacidad preparada sin superar la Calidad.",current:runic.capacityPrepared,maximum};
    }
    const added=targetCapacity-runic.capacityPrepared;
    if(model.enhancement.runicChannelTypes.length!==added || model.enhancement.runicChannelTypes.some((type)=>!["inscription","socket"].includes(type))) {
      return {ok:false,error:"Cada CRu nueva debe configurarse exactamente como Canal de Inscripción o Engarce."};
    }
    const quote=runicMatrixQuote({referenceValueCopper:current.referenceValueCopper,baseTimeMinutes:current.baseTimeMinutes,points:added});
    materialCopper=quote.materialCopper;
    stageBaseMinutes=quote.timeMinutes;
    const requirements=targetCapacity===1
      ? {primarySkill:"crafting",primaryRank:3,arcanaRank:2,craftingRank:3,installation:"professional"}
      : {primarySkill:"crafting",primaryRank:4,arcanaRank:3,craftingRank:4,installation:"specialized"};
    issues=magicProfessionalIssues(model,actor,requirements);
    const channels=[...runic.channels,...model.enhancement.runicChannelTypes.map((type,index)=>({
      id:"cru-"+(runic.channels.length+index+1),
      type
    }))];
    const nextRunic={
      ...runic,
      capacityPrepared:targetCapacity,
      matrixMaterialCopper:runic.matrixMaterialCopper+materialCopper,
      addedValueCopper:runic.addedValueCopper+2*materialCopper,
      channels
    };
    const validation=validateRunicConfiguration({...baseSource,system:{...baseSource.system,quality:current.quality,runic:nextRunic}},nextRunic);
    if(!validation.valid) issues.push(...validation.issues);
    magicUpdates={
      "system.runic":nextRunic,
      "system.priceCopper":Math.max(0,Math.floor(number(target.system?.priceCopper)))+2*materialCopper,
      "system.priceStatus":"exact"
    };
  } else if(mode==="rune") {
    if(model.specialMaterials.length||model.modifications.length) return {ok:false,error:"Inscribir una Runa no instala simultáneamente otras mejoras."};
    const runic=currentRunic(target);
    const profile=imprintActivationProfile(model.enhancement.imprintKey);
    if(!profile) return {ok:false,error:"La Impronta declarada no existe en el catálogo CRAFT-07."};
    if(model.enhancement.imprintMode!=="inscribed") return {ok:false,error:"El Proyecto de Runa sólo crea una inscripción permanente; las Piedras se insertan aparte."};
    const channelIds=[...new Set(model.enhancement.imprintChannelIds.map(String))];
    if(channelIds.length!==profile.cru) return {ok:false,error:"La Impronta no ocupa la cantidad correcta de CRu."};
    const occupied=new Set(runic.imprints.flatMap((row)=>Array.isArray(row.channelIds)?row.channelIds.map(String):[]));
    for(const id of channelIds) {
      const channel=runic.channels.find((row)=>String(row.id)===id);
      if(!channel || channel.type!=="inscription") return {ok:false,error:"La Runa requiere Canales de Inscripción existentes."};
      if(occupied.has(id)) return {ok:false,error:"Uno de los Canales de Inscripción ya está ocupado."};
    }
    const quote=runeInscriptionQuote({referenceValueCopper:current.referenceValueCopper,baseTimeMinutes:current.baseTimeMinutes,grade:profile.grade});
    materialCopper=quote.materialCopper;
    stageBaseMinutes=quote.timeMinutes;
    const requirements=profile.grade===1
      ? {primarySkill:"ritualism",primaryRank:3,arcanaRank:2,craftingRank:2,installation:"professional"}
      : {primarySkill:"ritualism",primaryRank:4,arcanaRank:3,craftingRank:3,installation:"specialized"};
    issues=magicProfessionalIssues(model,actor,requirements);
    const nextRunic={
      ...runic,
      addedValueCopper:runic.addedValueCopper+2*materialCopper,
      imprints:[...runic.imprints,{
        id:"rune-"+String(project.id??project.uuid??runic.imprints.length+1),
        key:profile.key,
        mode:"inscribed",
        channelIds,
        stoneUuid:""
      }]
    };
    const validation=validateRunicConfiguration({...baseSource,system:{...baseSource.system,quality:current.quality,runic:nextRunic}},nextRunic);
    if(!validation.valid) issues.push(...validation.issues);
    magicUpdates={
      "system.runic":nextRunic,
      "system.priceCopper":Math.max(0,Math.floor(number(target.system?.priceCopper)))+2*materialCopper,
      "system.priceStatus":"exact"
    };
  } else if(mode==="enchantment") {
    if(model.specialMaterials.length||model.modifications.length) return {ok:false,error:"Encantar no instala simultáneamente Modificaciones o Materiales Especiales por esta operación."};
    const existing=currentEnchantment(target);
    const grade=Math.max(0,Math.floor(number(model.enhancement.enchantmentGrade)));
    const utilityKey=String(model.enhancement.enchantmentUtilityKey??"").trim();
    if(grade===0 && !utilityKey) return {ok:false,error:"Debe declararse un Grado de Encantamiento o un Encantamiento Utilitario."};
    let next={...existing};
    if(grade===0) {
      if(existing.utilityKey) return {ok:false,error:"El objeto ya posee un Encantamiento Utilitario."};
      const quote=utilityEnchantmentQuote();
      materialCopper=quote.materialCopper;
      stageBaseMinutes=quote.timeMinutes;
      issues=magicProfessionalIssues(model,actor,{primarySkill:"ritualism",primaryRank:3,arcanaRank:2,craftingRank:0,installation:"professional"});
      next={...existing,utilityKey,addedValueCopper:existing.addedValueCopper+quote.addedValueCopper};
    } else {
      if(existing.grade>0) return {ok:false,error:"Un objeto ordinario sólo admite un Encantamiento autónomo estándar."};
      const quote=enchantmentCostQuote({referenceValueCopper:current.referenceValueCopper,baseTimeMinutes:current.baseTimeMinutes,grade});
      if(!quote.valid) return {ok:false,error:quote.error};
      materialCopper=quote.materialCopper;
      stageBaseMinutes=quote.timeMinutes;
      const req=grade===1
        ? {primarySkill:"ritualism",primaryRank:4,arcanaRank:3,craftingRank:3,installation:"specialized"}
        : {primarySkill:"ritualism",primaryRank:5,arcanaRank:4,craftingRank:4,installation:"exceptional"};
      issues=magicProfessionalIssues(model,actor,req);
      next={
        ...existing,
        grade,
        patternKey:String(model.enhancement.enchantmentPatternKey??""),
        functionalKey:String(model.enhancement.enchantmentFunctionalKey??""),
        passiveKey:String(model.enhancement.enchantmentPassiveKey??""),
        supportAppropriate:model.enhancement.enchantmentSupportAppropriate===true,
        hasRareComponent:model.enhancement.enchantmentHasRareComponent===true,
        materialCostCopper:quote.materialCopper,
        timeMinutes:quote.timeMinutes,
        addedValueCopper:existing.addedValueCopper+quote.addedValueCopper,
        reserve:{value:0,max:quote.reserveMax},
        attunedActorUuid:"",
        seal:model.enhancement.enchantmentSeal===true,
        sealState:"charged",
        sealTriggerType:String(model.enhancement.sealTriggerType??""),
        sealBypassKey:String(model.enhancement.sealBypassKey??""),
        rechargeBlocked:false,
        boundSpell:model.enhancement.boundSpell?clone(model.enhancement.boundSpell):null
      };
      const support=validateEnchantmentSupport({...baseSource,system:{...baseSource.system,quality:current.quality}},next);
      if(!support.valid) issues.push(...support.issues);
    }
    const added=next.addedValueCopper-existing.addedValueCopper;
    const fullPrice=Math.max(0,Math.floor(number(target.system?.priceCopper)))+added;
    next.chargedReferenceValueCopper=next.seal?fullPrice:0;
    magicUpdates={"system.enchantment":next,"system.priceCopper":fullPrice,"system.priceStatus":"exact"};
  } else if(mode==="trapRearm") {
    const trap=clone(target.system?.trap??{});
    if(trap.enabled!==true || trap.state!=="discharged") return {ok:false,error:"Sólo una trampa descargada puede rearmarse."};
    const quote=trapRearmQuote(trap.baseTimeMinutes||trapFrameProfile(trap.frame)?.baseTimeMinutes||current.baseTimeMinutes);
    materialCopper=0;
    stageBaseMinutes=quote.timeMinutes;
    const req=requirementsForManufacture({
      baseRank:current.baseRank,
      baseInstallation:current.baseInstallation,
      quality:current.quality,
      specialMaterials:current.specialMaterials
    });
    issues=enhancementRequirementsMatch(model,req);
    magicUpdates={"system.trap.state":"armed"};
  } else if(mode==="sealRearm") {
    const enchant=currentEnchantment(target);
    if(!enchant.seal || enchant.sealState!=="discharged") return {ok:false,error:"Sólo un Sello de Custodia descargado puede rearmarse."};
    const profile=enchantmentProfile(enchant.grade);
    if(!profile || enchant.grade>2) return {ok:false,error:"El Sello no posee un Grado rearmable estándar."};
    const quote=sealRearmQuote({enchantmentMaterialCopper:enchant.materialCostCopper,enchantmentTimeMinutes:enchant.timeMinutes});
    materialCopper=quote.materialCopper;
    stageBaseMinutes=quote.timeMinutes;
    const req=enchant.grade===1
      ? {primarySkill:"ritualism",primaryRank:4,arcanaRank:3,craftingRank:3,installation:"specialized"}
      : {primarySkill:"ritualism",primaryRank:5,arcanaRank:4,craftingRank:4,installation:"exceptional"};
    issues=magicProfessionalIssues(model,actor,req);
    magicUpdates={
      "system.enchantment.sealState":"charged",
      "system.priceCopper":enchant.chargedReferenceValueCopper||Math.max(0,Math.floor(number(target.system?.priceCopper)))
    };
  } else {
    return null;
  }

  if(issues.length) return {ok:false,error:"No se cumplen los requisitos o límites de la mejora mágica.",issues};
  const requiredMinutes=expectedStageRequiredMinutes(stageBaseMinutes,model);
  if(Math.abs(model.time.adjustedBaseMinutes-stageBaseMinutes)>Number.EPSILON) {
    return {ok:false,error:"El tiempo base de la mejora mágica no coincide con su fórmula canónica.",expectedMinutes:stageBaseMinutes};
  }
  if(model.time.requiredMinutes+Number.EPSILON<requiredMinutes) {
    return {ok:false,error:"El tiempo requerido de la mejora mágica está por debajo del mínimo canónico.",expectedMinutes:requiredMinutes};
  }
  return {ok:true,target,current,materialCopper,stageBaseMinutes,requiredMinutes,magicUpdates,magicMode:mode};
}

async function analyzeModifyProject(project, model, resolver) {
  const target=await resolveOwnedItem(project.parent,model.target.itemUuid,resolver);
  if(!target || !PHYSICAL_TYPES.has(target.type)) return {ok:false,error:"El objeto a modificar ya no está disponible."};
  const current=currentManufacture(target,model);
  if(current.referenceValueCopper<=0) return {ok:false,error:"Modificar requiere un VR Común identificable."};
  if(model.economy.referenceValueCopper!==current.referenceValueCopper) {
    return {ok:false,error:"El VR Común del Proyecto no coincide con el objeto objetivo.",expectedCopper:current.referenceValueCopper};
  }
  if(current.baseTimeMinutes<=0) return {ok:false,error:"Modificar requiere el tiempo base de la receta original."};
  if(Math.abs(model.time.baseMinutes-current.baseTimeMinutes)>Number.EPSILON) {
    return {ok:false,error:"El tiempo base del Proyecto no coincide con la receta persistida.",expectedMinutes:current.baseTimeMinutes};
  }

  const baseSource=baseItemSource(target,current);
  const mode=String(model.enhancement.mode);
  if(["runicMatrix","rune","enchantment","trapRearm","sealRearm"].includes(mode)) {
    return analyzeMagicModifyProject(project,model,resolver,target,current,baseSource);
  }
  let nextQuality=current.quality;
  let nextModifications=clone(current.modifications);
  let nextMaterials=clone(current.specialMaterials);
  let materialCopper=0;
  let stageBaseMinutes=0;
  let fineMachining=false;

  if(mode==="quality") {
    if(model.specialMaterials.length) return {ok:false,error:"Un ascenso de Calidad no incorpora simultáneamente un Material Especial nuevo."};
    const quote=qualityUpgradeQuote({
      fromQuality:current.quality,
      toQuality:model.economy.quality,
      referenceValueCopper:current.referenceValueCopper,
      baseTimeMinutes:current.baseTimeMinutes
    });
    if(!quote.valid) return {ok:false,error:quote.error};
    const existingKeys=new Set(current.modifications.map((row)=>String(row.key)));
    if(model.modifications.some((row)=>existingKeys.has(String(row.key)))) {
      return {ok:false,error:"El ascenso no puede reinstalar una Modificación que el objeto ya posee."};
    }
    const addedPoints=modificationPoints(model.modifications);
    if(addedPoints>quote.capMGained) {
      return {ok:false,error:"El ascenso sólo incluye la CapM generada por la nueva Calidad.",capMGained:quote.capMGained};
    }
    nextQuality=model.economy.quality;
    nextModifications=[...nextModifications,...clone(model.modifications)];
    materialCopper=quote.materialCopper;
    stageBaseMinutes=quote.timeMinutes;
  } else if(mode==="modification") {
    if(model.economy.quality!==current.quality) return {ok:false,error:"Instalar o retirar una Modificación posterior no cambia la Calidad."};
    if(model.specialMaterials.length) return {ok:false,error:"Una operación de Modificación no incorpora simultáneamente Material Especial."};
    const existingKeys=new Set(current.modifications.map((row)=>String(row.key)));
    const replaceKey=String(model.enhancement.replaceModificationKey ?? "");
    if(!model.modifications.length && !replaceKey) return {ok:false,error:"No se declaró una Modificación para instalar ni una Modificación existente para retirar."};
    if(replaceKey) {
      if(!existingKeys.has(replaceKey)) {
        return {ok:false,error:"La Modificación que se pretende sustituir ya no existe en el objeto."};
      }
      nextModifications=nextModifications.filter((row)=>String(row.key)!==replaceKey);
      existingKeys.delete(replaceKey);
    }
    if(model.modifications.some((row)=>existingKeys.has(String(row.key)))) {
      return {ok:false,error:"La misma Modificación no puede instalarse dos veces."};
    }

    if(model.enhancement.fineMachiningMaterialId) {
      const sourceMaterial=current.specialMaterials.find((row)=>String(row.id)===model.enhancement.fineMachiningMaterialId);
      const profile=materialProfile(sourceMaterial?.profileKey);
      const coverage=String(sourceMaterial?.coverage ?? "");
      if(profile?.key!=="kharumPrecisionAlloy" || !["major","dominant"].includes(coverage)) {
        return {ok:false,error:"Mecanizado fino requiere la Aleación de precisión de Kharum instalada en una parte Mayor o Dominante."};
      }
      if(model.modifications.some((row)=>String(row.part)!=="metal")) {
        return {ok:false,error:"Mecanizado fino sólo reduce una Modificación declarada sobre la parte metálica que usa la aleación."};
      }
      fineMachining=true;
    }

    nextModifications=[...nextModifications,...clone(model.modifications)];
    const points=modificationPoints(model.modifications);
    if(points===0 && replaceKey) {
      const quote=modificationRemovalQuote({baseTimeMinutes:current.baseTimeMinutes});
      materialCopper=quote.materialCopper;
      stageBaseMinutes=quote.timeMinutes;
      fineMachining=false;
    } else {
      const quote=modificationInstallationQuote({
        points,
        referenceValueCopper:current.referenceValueCopper,
        baseTimeMinutes:current.baseTimeMinutes,
        fineMachining
      });
      materialCopper=quote.materialCopper;
      stageBaseMinutes=quote.timeMinutes;
    }
  } else if(mode==="material") {
    if(model.economy.quality!==current.quality) return {ok:false,error:"Incorporar Material Especial no cambia simultáneamente la Calidad."};
    if(model.modifications.length) return {ok:false,error:"Una sustitución material no instala simultáneamente Modificaciones de CapM."};
    if(model.specialMaterials.length!==1) return {ok:false,error:"Cada Proyecto de incorporación material instala una parte especial identificable."};
    const incoming=clone(model.specialMaterials[0]);
    const quote=materialInstallationQuote({
      referenceValueCopper:current.referenceValueCopper,
      grade:incoming.grade,
      coverage:incoming.coverage,
      baseTimeMinutes:current.baseTimeMinutes
    });
    if(!quote.valid) return {ok:false,error:quote.error};
    if(model.enhancement.replaceMaterialId) {
      const replaced=nextMaterials.find((row)=>String(row.id)===model.enhancement.replaceMaterialId);
      if(!replaced) return {ok:false,error:"El Material que se pretende sustituir ya no existe en el objeto."};
      if(String(replaced.coverage)==="dominant") return {ok:false,error:"Cambiar el Material Dominante exige reconstrucción o receta específica."};
      if(String(replaced.coverage)!==String(incoming.coverage)) {
        return {ok:false,error:"La sustitución material debe conservar la cobertura física de la parte reemplazada."};
      }
      nextMaterials=nextMaterials.filter((row)=>String(row.id)!==model.enhancement.replaceMaterialId);
    }
    nextMaterials.push(incoming);
    materialCopper=quote.materialCopper;
    stageBaseMinutes=quote.timeMinutes;
  } else {
    return {ok:false,error:"Modo de mejora desconocido."};
  }

  const materialValidation=validateSpecialMaterials(nextMaterials);
  if(!materialValidation.valid) return {ok:false,error:"La combinación de Materiales Especiales no es válida.",issues:materialValidation.issues};
  const selection=validateModificationSelection(baseSource,{
    quality:nextQuality,
    modifications:nextModifications,
    specialMaterials:nextMaterials
  });
  if(!selection.valid) return {ok:false,error:"La combinación final de Calidad, Material y Modificaciones no es válida.",issues:selection.issues};

  const req=requirementsForManufacture({
    baseRank:current.baseRank,
    baseInstallation:current.baseInstallation,
    quality:nextQuality,
    specialMaterials:nextMaterials
  });
  const requirementIssues=enhancementRequirementsMatch(model,req);
  if(requirementIssues.length) return {ok:false,error:"Los requisitos de la mejora están subdeclarados.",issues:requirementIssues};
  const grades=["ordinary","specialized","rare","exceptional"];
  if(grades.indexOf(model.economy.workMaterialGrade)<grades.indexOf(req.materialGrade)) {
    return {ok:false,error:"El grado de Material de trabajo está por debajo del objeto que se está modificando.",expectedGrade:req.materialGrade};
  }

  const requiredMinutes=expectedStageRequiredMinutes(stageBaseMinutes,model);
  if(Math.abs(model.time.adjustedBaseMinutes-stageBaseMinutes)>Number.EPSILON) {
    return {ok:false,error:"El TBA de la mejora no coincide con su fórmula canónica.",expectedMinutes:stageBaseMinutes};
  }
  if(model.time.requiredMinutes+Number.EPSILON<requiredMinutes) {
    return {ok:false,error:"El tiempo requerido de la mejora está por debajo del mínimo canónico.",expectedMinutes:requiredMinutes};
  }

  const derived=deriveManufacturedSystem(baseSource,{
    referenceValueCopper:current.referenceValueCopper,
    baseTimeMinutes:current.baseTimeMinutes,
    baseRank:current.baseRank,
    baseInstallation:current.baseInstallation,
    quality:nextQuality,
    modifications:nextModifications,
    specialMaterials:nextMaterials,
    existingManufacture:{
      ...current,
      baseStats:Object.keys(current.baseStats).length ? current.baseStats : undefined
    }
  });
  if(!derived.valid) return {ok:false,error:"No puede derivarse el estado final de manufactura.",issues:derived.issues};

  return {
    ok:true,
    target,
    current,
    materialCopper,
    stageBaseMinutes,
    requiredMinutes,
    fineMachining,
    nextQuality,
    nextModifications,
    nextMaterials,
    derived
  };
}

async function expectedProjectMaterialCopper(project, model, resolver) {
  if (model.operation === "fabricate") {
    if(model.economy.quality==="defective") {
      return {ok:false,error:"Defectuosa no es una opción universal de fabricación con descuento."};
    }
    const source=model.target.resultData && typeof model.target.resultData==="object"
      ? clone(model.target.resultData)
      : null;
    if(!source || !PHYSICAL_TYPES.has(String(source.type ?? model.target.resultType))) {
      return {ok:false,error:"Fabricar requiere un snapshot estructurado de Item físico."};
    }
    source.type=String(source.type ?? model.target.resultType);
    source.system ??= {};

    const runic=source.system.runic ?? {};
    const enchant=source.system.enchantment ?? {};
    if(Math.max(0,Math.floor(number(runic.capacityPrepared)))>0 || (Array.isArray(runic.imprints) && runic.imprints.length)) {
      return {ok:false,error:"Fabricar no puede recibir CRu o Improntas preinstaladas; deben pagarse mediante Proyectos rúnicos."};
    }
    if(Math.max(0,Math.floor(number(enchant.grade)))>0 || String(enchant.utilityKey??"").trim()) {
      return {ok:false,error:"Fabricar no puede recibir Encantamientos preinstalados; deben pagarse mediante Proyecto de Encantamiento."};
    }

    if(source.system.imprintStone?.enabled===true) {
      const stoneProfile=imprintStoneCraftProfile(source.system.imprintStone.grade);
      if(model.economy.referenceValueCopper!==stoneProfile.referenceValueCopper) {
        return {ok:false,error:"La Piedra de Impronta debe usar su VR canónico.",expectedCopper:stoneProfile.referenceValueCopper};
      }
      if(model.time.baseMinutes+Number.EPSILON<stoneProfile.timeMinutes) {
        return {ok:false,error:"La Piedra de Impronta no puede fabricarse por debajo de su tiempo canónico.",expectedMinutes:stoneProfile.timeMinutes};
      }
      if(!imprintActivationProfile(source.system.imprintStone.imprintKey)) {
        return {ok:false,error:"La Piedra debe contener una Impronta catalogada."};
      }
      const imprint=imprintActivationProfile(source.system.imprintStone.imprintKey);
      if(imprint.grade!==stoneProfile.grade) {
        return {ok:false,error:"El Grado de la Piedra no coincide con la Impronta contenida."};
      }
    }

    if(source.system.trap?.enabled===true) {
      const trapValidation=validateTrapConfiguration(source.system.trap);
      if(!trapValidation.valid) return {ok:false,error:"La configuración de trampa no es válida.",issues:trapValidation.issues};
      const frame=trapFrameProfile(source.system.trap.frame);
      if(!frame) return {ok:false,error:"Armazón de trampa desconocido."};
      if(model.economy.referenceValueCopper<frame.referenceValueCopper) {
        return {ok:false,error:"El VR del Proyecto está por debajo del Armazón declarado.",expectedCopper:frame.referenceValueCopper};
      }
      if(frame.baseTimeMinutes>0 && model.time.baseMinutes+Number.EPSILON<frame.baseTimeMinutes) {
        return {ok:false,error:"El tiempo del Proyecto está por debajo del Armazón declarado.",expectedMinutes:frame.baseTimeMinutes};
      }
      const loadKind=String(source.system.trap.load?.kind??"");
      if(["mechanical-strike","alchemy"].includes(loadKind) && !model.components.length) {
        return {ok:false,error:"Una carga mecánica o alquímica debe existir como componente físico separado del Armazón."};
      }
    }

    const derived=deriveManufacturedSystem(source,{
      referenceValueCopper:model.economy.referenceValueCopper,
      baseTimeMinutes:model.time.baseMinutes,
      baseRank:model.professional.baseRank,
      baseInstallation:model.professional.baseInstallation,
      quality:model.economy.quality,
      modifications:model.modifications,
      specialMaterials:model.specialMaterials
    });
    if(!derived.valid) return {ok:false,error:"La combinación de Calidad, Materiales y Modificaciones de fabricación no es válida.",issues:derived.issues};
    return {
      ok:true,
      materialCopper:totalCraftMaterialCostCopper({
        referenceValueCopper:model.economy.referenceValueCopper,
        quality:model.economy.quality,
        specialMaterialSupplementsCopper:model.specialMaterials.map((row)=>row.supplementCopper)
      }),
      derived
    };
  }

  if (model.operation === "repair") {
    const target = await resolveOwnedItem(project.parent, model.target.itemUuid, resolver);
    if (!target || !PHYSICAL_TYPES.has(target.type)) return { ok:false, error:"El objeto a reparar ya no está disponible." };
    if(model.specialMaterials.length) {
      return {ok:false,error:"La reparación de Material Especial usa repair.specialReplacements; no instala Materiales nuevos mediante specialMaterials."};
    }
    const manufacture=target.system?.manufacture ?? {};
    const storedVr=Math.max(0,Math.floor(number(manufacture.referenceValueCopper)));
    if(storedVr>0) {
      const targetQuality=String(target.system?.quality ?? "common");
      if(model.economy.referenceValueCopper!==storedVr) {
        return {ok:false,error:"El VR Común de reparación no coincide con el objeto.",expectedCopper:storedVr};
      }
      if(model.economy.quality!==targetQuality) {
        return {ok:false,error:"Reparar debe preservar la Calidad real del objeto.",expectedQuality:targetQuality};
      }

      const current={
        referenceValueCopper:storedVr,
        baseTimeMinutes:Math.max(0,number(manufacture.baseTimeMinutes,model.time.baseMinutes)),
        baseRank:Math.max(0,Math.floor(number(manufacture.baseRank,model.professional.baseRank))),
        baseInstallation:String(manufacture.baseInstallation ?? model.professional.baseInstallation ?? "improvised"),
        baseStats:manufacture.baseStats && typeof manufacture.baseStats==="object" ? clone(manufacture.baseStats) : {},
        modifications:Array.isArray(manufacture.modifications)?clone(manufacture.modifications):[],
        specialMaterials:Array.isArray(manufacture.specialMaterials)?clone(manufacture.specialMaterials):[],
        dominantMaterialId:String(manufacture.dominantMaterialId ?? ""),
        quality:targetQuality
      };
      const condition=String(target.system?.condition ?? "operative");
      const layerPlan=analyzeRepairMaterialLayers(model,current,condition);
      if(!layerPlan.valid) {
        return {ok:false,error:"La BRA o las capas especiales de reparación no coinciden con el objeto.",issues:layerPlan.issues};
      }

      const grades=["ordinary","specialized","rare","exceptional"];
      const affectedPreserved=layerPlan.installed.filter((row)=>
        layerPlan.affected.has(String(row.id)) && !layerPlan.ordinary.has(String(row.id)));
      const materialGrade=affectedPreserved.reduce((highest,row)=>
        grades.indexOf(String(row?.grade??"ordinary"))>grades.indexOf(highest)?String(row.grade):highest,"ordinary");

      const fullTba=adjustedBaseTimeMinutes(
        current.baseTimeMinutes,
        {quality:targetQuality,materialGrade}
      );
      const quote=repairQuote({
        condition,
        affectedValueCopper:layerPlan.expectedBraCopper,
        affectedTimeMinutes:fullTba
      });
      if(!quote.repairableByUniversalRule) return {ok:false,error:"El estado objetivo no admite reparación universal."};
      const maintainable=number(manufacture?.effects?.repairTimeMultiplier,1);
      let required=expectedStageRequiredMinutes(quote.timeMinutes,model,{
        reductionFactors:maintainable<1?[Math.max(0.25,maintainable)]:[]
      });
      if(maintainable<1) required=Math.max(10,required);
      if(model.time.mode!=="fixed") return {ok:false,error:"La reparación de un objeto manufacturado usa el tiempo fijo derivado de su estado."};
      if(Math.abs(model.time.adjustedBaseMinutes-quote.timeMinutes)>Number.EPSILON) {
        return {ok:false,error:"El tiempo base de reparación no coincide con BRA/estado.",expectedMinutes:quote.timeMinutes};
      }
      if(model.time.requiredMinutes+Number.EPSILON<required) {
        return {ok:false,error:"El tiempo de reparación está por debajo del mínimo canónico.",expectedMinutes:required};
      }
      return {
        ok:true,
        materialCopper:quote.materialCopper,
        repairTimeMinutes:required,
        target,
        repairPlan:layerPlan,
        currentManufacture:current
      };
    }

    if((model.repair?.affectedMaterialIds?.length ?? 0) ||
       (model.repair?.ordinaryReplacementMaterialIds?.length ?? 0) ||
       (model.repair?.specialReplacements?.length ?? 0)) {
      return {ok:false,error:"Un objeto sin historial de manufactura no puede declarar capas especiales de reparación."};
    }
    const quote = repairQuote({
      condition:String(target.system?.condition ?? "operative"),
      affectedValueCopper:model.economy.affectedValueCopper,
      affectedTimeMinutes:Math.max(0,number(model.time.adjustedBaseMinutes))
    });
    if (!quote.repairableByUniversalRule) return { ok:false, error:"El estado objetivo no admite reparación universal." };
    return { ok:true, materialCopper:quote.materialCopper, repairTimeMinutes:quote.timeMinutes };
  }

  if (model.operation === "dismantle") {
    const target=await resolveOwnedItem(project.parent,model.target.itemUuid,resolver);
    if(!target || !PHYSICAL_TYPES.has(target.type)) return {ok:false,error:"El objeto a desmantelar ya no está disponible."};
    const manufacture=target.system?.manufacture ?? {};
    const storedVr=Math.max(0,Math.floor(number(manufacture.referenceValueCopper)));
    const storedBase=Math.max(0,number(manufacture.baseTimeMinutes));
    if(storedVr>0 && storedBase>0) {
      if(model.economy.referenceValueCopper!==storedVr) {
        return {ok:false,error:"El VR Común de desmantelamiento no coincide con el objeto.",expectedCopper:storedVr};
      }
      const quote=salvageQuote({
        condition:String(target.system?.condition ?? "operative"),
        referenceValueCopper:storedVr,
        specialMaterialSupplementsCopper:[],
        recoveredSeparatedComponentsCopper:0,
        fabricationTimeMinutes:storedBase
      });
      const required=expectedStageRequiredMinutes(quote.timeMinutes,model);
      if(model.time.mode!=="fixed") return {ok:false,error:"Desmantelar un objeto manufacturado usa el tiempo fijo del 25% de su fabricación base."};
      if(Math.abs(model.time.adjustedBaseMinutes-quote.timeMinutes)>Number.EPSILON) {
        return {ok:false,error:"El tiempo base de desmantelamiento no coincide con el 25% canónico.",expectedMinutes:quote.timeMinutes};
      }
      if(model.time.requiredMinutes+Number.EPSILON<required) {
        return {ok:false,error:"El tiempo de desmantelamiento está por debajo del mínimo canónico.",expectedMinutes:required};
      }
    }
    return { ok:true, materialCopper:0 };
  }
  if (model.operation === "modify") return analyzeModifyProject(project,model,resolver);
  return { ok:true, materialCopper:model.ledger.estimatedMaterialsCopper };
}
async function validateSpecialMaterialSources(project, model, allocations, resolver) {
  if(!model.specialMaterials.length) return {ok:true};
  const materialValidation=validateSpecialMaterials(model.specialMaterials);
  if(!materialValidation.valid) return {ok:false,error:"Los Materiales Especiales declarados no tienen un Perfil válido.",issues:materialValidation.issues};

  const requiredBySource=new Map();
  for(const row of model.specialMaterials) {
    if(!row.sourceItemUuid) return {ok:false,error:"Todo Material Especial debe señalar el Lote físico que aporta su SM.",materialId:row.id};
    const previous=requiredBySource.get(row.sourceItemUuid) ?? { amountCopper:0, profileKeys:new Set(), rows:[] };
    previous.amountCopper+=row.supplementCopper;
    previous.profileKeys.add(row.profileKey);
    previous.rows.push(row.id);
    requiredBySource.set(row.sourceItemUuid,previous);
  }

  for(const [sourceUuid,requirement] of requiredBySource) {
    if(requirement.profileKeys.size!==1) {
      return {ok:false,error:"Un mismo Lote no puede representar varios Perfiles de Material en una sola reserva.",sourceUuid};
    }
    const item=await resolveOwnedItem(project.parent,sourceUuid,resolver);
    if(!item) return {ok:false,error:"El Lote de Material Especial ya no existe.",sourceUuid};
    const lot=lotData(item);
    const profileKey=[...requirement.profileKeys][0];
    if(!lot.enabled) return {ok:false,error:item.name+" no está marcado como Lote de fabricación.",sourceUuid};
    if(lot.preparation!=="prepared") return {ok:false,error:item.name+" debe estar Preparado antes de integrarse en equipo.",sourceUuid};
    if(lot.materialProfileKey!==profileKey) {
      return {ok:false,error:item.name+" no corresponde al Perfil de Material "+profileKey+".",sourceUuid};
    }
    const allocation=allocations.find((row)=>row.sourceUuid===sourceUuid);
    if(!allocation || allocation.amountCopper<requirement.amountCopper) {
      return {ok:false,error:"La reserva de VI del Material Especial no cubre su SM.",sourceUuid,expectedCopper:requirement.amountCopper};
    }
    const compatibility="material:"+profileKey;
    if(!lot.compatibility.includes(compatibility) || !allocation.compatibilities.includes(compatibility)) {
      return {ok:false,error:"El Lote especial no declara la compatibilidad de su Perfil para este Proyecto.",sourceUuid,compatibility};
    }
  }
  return {ok:true};
}

export async function reserveCraftingProjectMaterials(project, {
  expectedRevision = null,
  resolver = globalThis.fromUuid
} = {}) {
  if (!project || project.type !== "project" || !project.parent) {
    return { ok:false, error:"El Proyecto no está embebido en un Actor válido." };
  }
  if (!expectedRevisionMatches(project, expectedRevision)) {
    return { ok:false, error:"El Proyecto cambió desde la última lectura.", stale:true };
  }

  const validation = validateCraftingProject(project.system);
  if (!validation.valid) return { ok:false, error:"El Proyecto contiene incidencias estructurales.", issues:validation.issues };
  const model = validation.project;
  if (model.state !== "ready") return { ok:false, error:"Sólo un Proyecto Preparado puede comprometer materiales." };
  if (model.execution.committed) return { ok:true, committed:true, alreadyCommitted:true, revision:model.execution.revision };
  if (model.execution.reductionFactors.length) {
    return { ok:false, error:"Las reducciones especiales de tiempo requieren una fuente mecánica estructurada; CRAFT-13C no acepta factores libres." };
  }

  const actor = project.parent;
  const prerequisite = validateProjectPrerequisites({
    actorRank:Number(actor.system?.skills?.[model.professional.skill]?.rank ?? 0),
    availableInstallation:model.professional.availableInstallation,
    requiredRank:model.professional.requiredRank,
    requiredInstallation:model.professional.requiredInstallation,
    hasStableProcedure:model.professional.stableProcedure,
    materialsReady:model.professional.materialsReady,
    essentialToolReady:model.professional.essentialToolReady
  });
  if (!prerequisite.valid) {
    return { ok:false, error:"No se cumplen los requisitos reales del Proyecto.", issues:prerequisite.issues };
  }

  const expectedMaterials = await expectedProjectMaterialCopper(project, model, resolver);
  if (!expectedMaterials.ok) return expectedMaterials;
  if (model.ledger.estimatedMaterialsCopper !== expectedMaterials.materialCopper) {
    return {
      ok:false,
      error:"El material estimado no coincide con el coste canónico del Proyecto.",
      expectedCopper:expectedMaterials.materialCopper
    };
  }

  const allocations = craftingProjectMaterialAllocations(project);
  const specialMaterialSources=await validateSpecialMaterialSources(project,model,allocations,resolver);
  if(!specialMaterialSources.ok) return specialMaterialSources;
  if(model.operation==="repair" && expectedMaterials.repairPlan) {
    const repairSources=await validateRepairReplacementSources(project,expectedMaterials.repairPlan,allocations,resolver);
    if(!repairSources.ok) return repairSources;
  }
  const requested = allocations.reduce((sum, entry) => sum + entry.amountCopper, 0);
  if (requested !== model.ledger.estimatedMaterialsCopper) {
    return { ok:false, error:"Las asignaciones de Lotes deben coincidir exactamente con el material estimado del Proyecto." };
  }

  const resolved = [];
  for (const allocation of allocations) {
    const item = await resolveOwnedItem(actor, allocation.sourceUuid, resolver);
    if (!item || !PHYSICAL_TYPES.has(item.type)) {
      return { ok:false, error:"Un Lote asignado ya no existe en el inventario del Actor." };
    }
    const lot = lotData(item);
    if (!lot.enabled) return { ok:false, error:item.name + " no está marcado como Lote de fabricación." };
    if (!allocation.compatibilities.length) {
      return { ok:false, error:"Cada asignación de VI debe declarar la compatibilidad exigida por el Proyecto.", sourceUuid:allocation.sourceUuid };
    }
    const incompatible = allocation.compatibilities.find((key) => !lot.compatibility.includes(key));
    if (incompatible) {
      return { ok:false, error:item.name + " no es compatible con " + incompatible + ".", sourceUuid:allocation.sourceUuid };
    }
    const available = craftingLotAvailableCopper(item, { project });
    if (allocation.amountCopper > available) {
      return { ok:false, error:item.name + " no posee VI libre suficiente.", sourceUuid:allocation.sourceUuid, available };
    }
    resolved.push({ allocation, item, lot });
  }

  const componentAllocations = craftingProjectComponentAllocations(project);
  const resolvedComponents = [];
  for (const allocation of componentAllocations) {
    if (!allocation.sourceUuid) {
      return { ok:false, error:"Todo componente separado debe señalar un Item físico del inventario.", componentIds:allocation.componentIds };
    }
    const item = await resolveOwnedItem(actor, allocation.sourceUuid, resolver);
    if (!item || !PHYSICAL_TYPES.has(item.type)) {
      return { ok:false, error:"Un componente separado ya no existe en el inventario del Actor.", sourceUuid:allocation.sourceUuid };
    }
    const available = craftingComponentAvailableQuantity(item, { project });
    if (allocation.quantity > available) {
      return {
        ok:false,
        error:item.name + " no posee cantidad libre suficiente para el Proyecto.",
        sourceUuid:allocation.sourceUuid,
        available
      };
    }
    resolvedComponents.push({ allocation, item });
  }

  const snapshots = [];
  try {
    for (const row of resolved) {
      const before = clone(row.lot.reservations);
      const next = clone(row.lot.reservations);
      next[projectKey(project)] = reservationRecord(project, row.allocation.amountCopper);
      snapshots.push({
        document:row.item,
        updates:{ "system.craftingLot.reservations":before }
      });
      await row.item.update({ "system.craftingLot.reservations":next }, { tmValidated:true, tmCrafting:true });
    }

    for (const row of resolvedComponents) {
      const before = componentReservationData(row.item);
      const next = clone(before);
      next[projectKey(project)] = {
        projectUuid:projectKey(project),
        actorUuid:actorKey(project.parent),
        quantity:row.allocation.quantity,
        createdAt:Date.now()
      };
      snapshots.push({
        document:row.item,
        updates:{ "system.craftingReservations":before }
      });
      await row.item.update({ "system.craftingReservations":next }, { tmValidated:true, tmCrafting:true });
    }

    await project.update({
      "system.state":"active",
      "system.execution.committed":true,
      "system.execution.revision":model.execution.revision + 1,
      "system.ledger.committedMaterialsCopper":requested
    }, { tmValidated:true, tmCrafting:true });

    return {
      ok:true,
      committed:true,
      materialCopper:requested,
      revision:model.execution.revision + 1
    };
  } catch (error) {
    await rollbackUpdates(snapshots);
    return { ok:false, error:"No fue posible comprometer todos los materiales de forma atómica.", cause:String(error?.message ?? error) };
  }
}

export async function releaseCraftingProjectMaterials(project, {
  expectedRevision = null,
  cancel = false,
  resolver = globalThis.fromUuid
} = {}) {
  if (!project || project.type !== "project" || !project.parent) return { ok:false, error:"Proyecto inválido." };
  if (!expectedRevisionMatches(project, expectedRevision)) return { ok:false, error:"El Proyecto cambió desde la última lectura.", stale:true };

  const model = normalizeCraftingProject(project.system);
  if (["completed","cancelled"].includes(model.state)) {
    return { ok:true, released:false, terminal:true, revision:model.execution.revision };
  }

  const actor = project.parent;
  const allocations = craftingProjectMaterialAllocations(project);
  const snapshots = [];
  try {
  for (const allocation of allocations) {
    const item = await resolveOwnedItem(actor, allocation.sourceUuid, resolver);
    if (!item) continue;
    const lot = lotData(item);
    if (!lot.reservations[projectKey(project)]) continue;
    const next = clone(lot.reservations);
    delete next[projectKey(project)];
    snapshots.push({ document:item, updates:{ "system.craftingLot.reservations":clone(lot.reservations) } });
    await item.update({ "system.craftingLot.reservations":next }, { tmValidated:true, tmCrafting:true });
  }

  const componentAllocations = craftingProjectComponentAllocations(project);
  for (const allocation of componentAllocations) {
    const item = await resolveOwnedItem(actor, allocation.sourceUuid, resolver);
    if (!item) continue;
    const reservations = componentReservationData(item);
    if (!reservations[projectKey(project)]) continue;
    const next = clone(reservations);
    delete next[projectKey(project)];
    snapshots.push({ document:item, updates:{ "system.craftingReservations":clone(reservations) } });
    await item.update({ "system.craftingReservations":next }, { tmValidated:true, tmCrafting:true });
  }

  const nextState = cancel ? "cancelled" : "ready";
  await project.update({
    "system.state":nextState,
    "system.execution.committed":false,
    "system.execution.revision":model.execution.revision + 1,
    "system.ledger.committedMaterialsCopper":0
  }, { tmValidated:true, tmCrafting:true });
  return { ok:true, released:true, state:nextState, revision:model.execution.revision + 1 };
  } catch (error) {
    await rollbackUpdates(snapshots);
    return { ok:false, error:"No fue posible liberar todas las reservas de forma atómica.", cause:String(error?.message ?? error) };
  }
}

export async function advanceCraftingProjectWork(project, minutes, {
  expectedRevision = null
} = {}) {
  if (!project || project.type !== "project") return { ok:false, error:"Proyecto inválido." };
  if (!expectedRevisionMatches(project, expectedRevision)) return { ok:false, error:"El Proyecto cambió desde la última lectura.", stale:true };
  const model = normalizeCraftingProject(project.system);
  if (model.state !== "active" || !model.execution.committed) {
    return { ok:false, error:"El Proyecto debe estar En curso y con sus materiales comprometidos." };
  }
  const amount = nonNegative(minutes);
  if (!amount) return { ok:false, error:"El avance debe representar tiempo de trabajo real mayor que cero." };
  const before = model.time.completedMinutes;
  const after = Math.min(model.time.requiredMinutes, before + amount);
  await project.update({
    "system.time.completedMinutes":after,
    "system.execution.revision":model.execution.revision + 1
  }, { tmValidated:true, tmCrafting:true });
  return {
    ok:true,
    minutesApplied:after - before,
    completedMinutes:after,
    remainingMinutes:Math.max(0, model.time.requiredMinutes - after),
    revision:model.execution.revision + 1
  };
}

function resultSource(project) {
  const raw = project?.system?.target?.resultData;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const source = clone(raw);
  delete source._id;
  delete source.id;
  return source;
}

async function consumeReservations(project, resolver) {
  const actor = project.parent;
  const allocations = craftingProjectMaterialAllocations(project);
  const snapshots = [];

  for (const allocation of allocations) {
    const item = await resolveOwnedItem(actor, allocation.sourceUuid, resolver);
    if (!item) return { ok:false, error:"Un Lote comprometido ya no existe.", snapshots };
    const lot = lotData(item);
    const reservation = lot.reservations[projectKey(project)];
    if (!reservation || reservationAmount(reservation) !== allocation.amountCopper) {
      return { ok:false, error:"La reserva de un Lote ya no coincide con el Proyecto.", snapshots };
    }
    if (allocation.amountCopper > lot.inputValueCopper) {
      return { ok:false, error:"Un Lote comprometido ya no posee VI suficiente.", snapshots };
    }
  }

  const componentAllocations = craftingProjectComponentAllocations(project);
  for (const allocation of componentAllocations) {
    const item = await resolveOwnedItem(actor, allocation.sourceUuid, resolver);
    if (!item) return { ok:false, error:"Un componente comprometido ya no existe.", snapshots };
    const reservations = componentReservationData(item);
    const reservation = reservations[projectKey(project)];
    if (!reservation || componentReservationQuantity(reservation) !== allocation.quantity) {
      return { ok:false, error:"La reserva física de un componente ya no coincide con el Proyecto.", snapshots };
    }
    if (allocation.quantity > Math.max(0, Math.floor(number(item.system?.quantity, 1)))) {
      return { ok:false, error:"Un componente comprometido ya no posee cantidad suficiente.", snapshots };
    }
  }

  try {
    for (const allocation of allocations) {
      const item = await resolveOwnedItem(actor, allocation.sourceUuid, resolver);
      const lot = lotData(item);
      const previousReservations = clone(lot.reservations);
      const nextReservations = clone(lot.reservations);
      delete nextReservations[projectKey(project)];
      snapshots.push({
        document:item,
        updates:{
          "system.craftingLot.inputValueCopper":lot.inputValueCopper,
          "system.craftingLot.reservations":previousReservations
        }
      });
      await item.update({
        "system.craftingLot.inputValueCopper":lot.inputValueCopper - allocation.amountCopper,
        "system.craftingLot.reservations":nextReservations
      }, { tmValidated:true, tmCrafting:true });
    }

    for (const allocation of componentAllocations) {
      const item = await resolveOwnedItem(actor, allocation.sourceUuid, resolver);
      const previousReservations = componentReservationData(item);
      const nextReservations = clone(previousReservations);
      delete nextReservations[projectKey(project)];
      const previousQuantity = Math.max(0, Math.floor(number(item.system?.quantity, 1)));
      snapshots.push({
        document:item,
        updates:{
          "system.quantity":previousQuantity,
          "system.craftingReservations":previousReservations
        }
      });
      await item.update({
        "system.quantity":previousQuantity - allocation.quantity,
        "system.craftingReservations":nextReservations
      }, { tmValidated:true, tmCrafting:true });
    }
    return { ok:true, snapshots };
  } catch (error) {
    await rollbackUpdates(snapshots);
    return { ok:false, error:"Falló el consumo de Lotes comprometidos.", cause:String(error?.message ?? error), snapshots:[] };
  }
}

async function fabricationOutcome(project) {
  const actor = project.parent;
  const source = resultSource(project);
  if (!source || !PHYSICAL_TYPES.has(String(source.type ?? ""))) {
    return { ok:false, error:"Fabricar requiere un snapshot estructurado de Item físico en target.resultData." };
  }
  const model=normalizeCraftingProject(project.system);
  const derived=deriveManufacturedSystem(source,{
    referenceValueCopper:model.economy.referenceValueCopper,
    baseTimeMinutes:model.time.baseMinutes,
    baseRank:model.professional.baseRank,
    baseInstallation:model.professional.baseInstallation,
    quality:model.economy.quality,
    modifications:model.modifications,
    specialMaterials:model.specialMaterials
  });
  if(!derived.valid) return {ok:false,error:"La manufactura final no supera la validación de Calidad/CapM/Materiales.",issues:derived.issues};

  source.name = String(source.name ?? project.system.target?.resultName ?? "Resultado fabricado");
  source.system = derived.system;
  source.system.condition = "operative";
  source.system.acquisition = null;
  source.system.provenance = {
    ...(source.system.provenance ?? {}),
    sourceUuid:project.uuid,
    sourceSchemaVersion:Number(project.system?.schemaVersion ?? 0) || 0,
    sourceRevision:String(project.system?.execution?.revision ?? 0)
  };
  const created = await actor.createEmbeddedDocuments("Item", [source], { tmValidated:true, tmCrafting:true });
  const item = created?.[0] ?? null;
  if (!item) return { ok:false, error:"Foundry no creó el resultado de fabricación." };
  return {
    ok:true,
    output:item,
    rollback:async()=>{ try { await actor.deleteEmbeddedDocuments("Item", [item.id], { tmValidated:true, tmCraftingRollback:true }); } catch {} }
  };
}

async function modificationOutcome(project,resolver) {
  const model=normalizeCraftingProject(project.system);
  const analysis=await analyzeModifyProject(project,model,resolver);
  if(!analysis.ok) return analysis;
  const target=analysis.target;
  const previous={};
  const updates={};
  if(analysis.magicUpdates) {
    for(const [path,value] of Object.entries(analysis.magicUpdates)) {
      const relative=String(path).replace(/^system\./,"").split(".");
      let currentValue=target.system;
      for(const part of relative) currentValue=currentValue?.[part];
      previous[path]=clone(currentValue);
      updates[path]=clone(value);
    }
  } else {
    const keys=["quality","priceCopper","priceStatus","properties","damage","penetration","strengthMin","reload","block","movementPenalty","manufacture"];
    for(const key of keys) {
      if(Object.prototype.hasOwnProperty.call(analysis.derived.system,key) || key==="manufacture") {
        previous["system."+key]=clone(target.system?.[key]);
        updates["system."+key]=clone(analysis.derived.system[key]);
      }
    }
  }
  try {
    await target.update(updates,{tmValidated:true,tmCrafting:true});
  } catch(error) {
    return {ok:false,error:"No fue posible aplicar la mejora al objeto.",cause:String(error?.message??error)};
  }
  return {
    ok:true,
    output:target,
    rollback:async()=>{ try { await target.update(previous,{tmValidated:true,tmCraftingRollback:true}); } catch {} }
  };
}

async function repairOutcome(project, resolver) {
  const actor = project.parent;
  const target = await resolveOwnedItem(actor, String(project.system.target?.itemUuid ?? ""), resolver);
  if (!target || !PHYSICAL_TYPES.has(target.type)) return { ok:false, error:"El objeto a reparar ya no está disponible." };
  const previousCondition = String(target.system?.condition ?? "operative");
  if (previousCondition === "operative") return { ok:false, error:"El objeto ya está Operativo." };
  if (previousCondition === "destroyed") return { ok:false, error:"Destruido no admite reparación universal." };

  const model=normalizeCraftingProject(project.system);
  const analysis=await expectedProjectMaterialCopper(project,model,resolver);
  if(!analysis.ok) return analysis;

  const previous={ "system.condition":previousCondition };
  const updates={ "system.condition":"operative" };

  if(analysis.repairPlan && analysis.currentManufacture) {
    const plan=analysis.repairPlan;
    const current=analysis.currentManufacture;
    const replacementSources=new Map(
      plan.specialReplacements.map((row)=>[String(row.materialId),String(row.sourceItemUuid)])
    );
    const nextMaterials=plan.remainingMaterials.map((row)=>{
      const sourceItemUuid=replacementSources.get(String(row.id));
      return sourceItemUuid ? { ...clone(row), sourceItemUuid } : clone(row);
    });

    const baseSource=baseItemSource(target,current);
    const derived=deriveManufacturedSystem(baseSource,{
      referenceValueCopper:current.referenceValueCopper,
      baseTimeMinutes:current.baseTimeMinutes,
      baseRank:current.baseRank,
      baseInstallation:current.baseInstallation,
      quality:current.quality,
      modifications:current.modifications,
      specialMaterials:nextMaterials,
      existingManufacture:current
    });
    if(!derived.valid) {
      return {ok:false,error:"La reparación no puede derivar un estado manufacturado coherente tras sustituir sus capas.",issues:derived.issues};
    }

    const keys=["quality","priceCopper","priceStatus","properties","damage","penetration","strengthMin","reload","block","movementPenalty","manufacture"];
    for(const key of keys) {
      if(Object.prototype.hasOwnProperty.call(derived.system,key) || key==="manufacture") {
        previous["system."+key]=clone(target.system?.[key]);
        updates["system."+key]=clone(derived.system[key]);
      }
    }
  }

  try {
    await target.update(updates, { tmValidated:true, tmCrafting:true });
  } catch(error) {
    return {ok:false,error:"No fue posible aplicar la reparación al objeto.",cause:String(error?.message??error)};
  }

  return {
    ok:true,
    output:target,
    rollback:async()=>{ try { await target.update(previous, { tmValidated:true, tmCraftingRollback:true }); } catch {} }
  };
}

async function dismantleOutcome(project, resolver) {
  const actor = project.parent;
  const target = await resolveOwnedItem(actor, String(project.system.target?.itemUuid ?? ""), resolver);
  if (!target || !PHYSICAL_TYPES.has(target.type)) return { ok:false, error:"El objeto a desmantelar ya no está disponible." };

  const targetSource = typeof target.toObject === "function" ? target.toObject() : clone(target);
  const condition = String(target.system?.condition ?? "operative");
  const projectModel = normalizeCraftingProject(project.system);
  const manufacture=target.system?.manufacture ?? {};
  const referenceValueCopper=Math.max(0,Math.floor(number(manufacture.referenceValueCopper,projectModel.economy.referenceValueCopper)));
  const fabricationTimeMinutes=Math.max(0,number(manufacture.baseTimeMinutes,projectModel.time.baseMinutes));
  const installedMaterials=Array.isArray(manufacture.specialMaterials) ? manufacture.specialMaterials : [];

  const ordinaryQuote=salvageQuote({
    condition,
    referenceValueCopper,
    specialMaterialSupplementsCopper:[],
    recoveredSeparatedComponentsCopper:0,
    fabricationTimeMinutes
  });

  const specialRecoveries=[];
  for(const material of installedMaterials) {
    const quote=salvageQuote({
      condition,
      referenceValueCopper:0,
      specialMaterialSupplementsCopper:[Math.max(0,number(material.supplementCopper))],
      recoveredSeparatedComponentsCopper:0,
      fabricationTimeMinutes:0
    });
    if(quote.specialCopper>0) specialRecoveries.push({material,amountCopper:quote.specialCopper});
  }

  const createdIds=[];
  const createdItems=[];
  const createRecovery=async(source)=>{
    const created=await actor.createEmbeddedDocuments("Item",[source],{tmValidated:true,tmCrafting:true});
    const item=created?.[0]??null;
    if(!item) throw new Error("Foundry no creó el Lote recuperado.");
    createdIds.push(item.id);
    createdItems.push(item);
    return item;
  };

  try {
    if(ordinaryQuote.ordinaryCopper>0) {
      await createRecovery({
        name:"Material ordinario recuperado de "+target.name,
        type:"equipment",
        system:{
          category:"Material recuperado",
          quantity:1,
          weight:0,
          equipped:false,
          availability:"common",
          quality:"common",
          properties:"VI ordinario recuperado por desmantelamiento.",
          priceCopper:0,
          priceQuantity:1,
          priceStatus:"unset",
          condition:"operative",
          craftingLot:{
            enabled:true,
            category:"recuperado",
            compatibility:[],
            materialProfileKey:"",
            preparation:"prepared",
            inputValueCopper:ordinaryQuote.ordinaryCopper,
            reservations:{}
          },
          craftingReservations:{},
          provenance:{
            sourceUuid:target.uuid,
            sourceSchemaVersion:Number(target.system?.schemaVersion ?? 0)||0,
            sourceRevision:"dismantled"
          }
        }
      });
    }

    for(const recovery of specialRecoveries) {
      const profileKey=String(recovery.material.profileKey??"");
      await createRecovery({
        name:(recovery.material.name||profileKey||"Material especial")+" recuperado",
        type:"equipment",
        system:{
          category:"Material especial recuperado",
          quantity:1,
          weight:0,
          equipped:false,
          availability:"common",
          quality:"common",
          properties:"VI especial recuperado; conserva sólo el Perfil de Material identificado.",
          priceCopper:0,
          priceQuantity:1,
          priceStatus:"unset",
          condition:"operative",
          craftingLot:{
            enabled:true,
            category:"material-especial",
            compatibility:profileKey?["material:"+profileKey]:[],
            materialProfileKey:profileKey,
            preparation:"prepared",
            inputValueCopper:recovery.amountCopper,
            reservations:{}
          },
          craftingReservations:{},
          provenance:{
            sourceUuid:target.uuid,
            sourceSchemaVersion:Number(target.system?.schemaVersion ?? 0)||0,
            sourceRevision:"dismantled-special"
          }
        }
      });
    }

    await actor.deleteEmbeddedDocuments("Item", [target.id], { tmValidated:true, tmCrafting:true });
  } catch (error) {
    if(createdIds.length) {
      try { await actor.deleteEmbeddedDocuments("Item",createdIds,{tmValidated:true,tmCraftingRollback:true}); } catch {}
    }
    return { ok:false, error:"No fue posible cerrar el desmantelamiento.", cause:String(error?.message ?? error) };
  }

  const recoveredMaterialsCopper=ordinaryQuote.ordinaryCopper+
    specialRecoveries.reduce((sum,row)=>sum+row.amountCopper,0);
  return {
    ok:true,
    output:createdItems[0]??null,
    recoveredMaterialsCopper,
    recoveredItemUuids:createdItems.map((item)=>item.uuid),
    rollback:async()=>{
      try {
        if(createdIds.length) await actor.deleteEmbeddedDocuments("Item",createdIds,{tmValidated:true,tmCraftingRollback:true});
        await actor.createEmbeddedDocuments("Item", [targetSource], { keepId:true, tmValidated:true, tmCraftingRollback:true });
      } catch {}
    }
  };
}

export async function completeCraftingProject(project, {
  expectedRevision = null,
  resolver = globalThis.fromUuid
} = {}) {
  if (!project || project.type !== "project" || !project.parent) return { ok:false, error:"Proyecto inválido." };
  if (!expectedRevisionMatches(project, expectedRevision)) return { ok:false, error:"El Proyecto cambió desde la última lectura.", stale:true };

  const validation = validateCraftingProject(project.system);
  if (!validation.valid) return { ok:false, error:"El Proyecto contiene incidencias estructurales.", issues:validation.issues };
  const model = validation.project;

  if (model.state === "completed" && model.execution.completionToken) {
    return { ok:true, completed:true, alreadyCompleted:true, completionToken:model.execution.completionToken };
  }
  if (model.state !== "active" || !model.execution.committed) {
    return { ok:false, error:"El Proyecto debe estar En curso con materiales comprometidos." };
  }
  if (craftingProjectRemainingMinutes(model) > 0) {
    return { ok:false, error:"El Proyecto todavía tiene trabajo pendiente.", remainingMinutes:craftingProjectRemainingMinutes(model) };
  }
  if (!["fabricate","repair","dismantle","modify"].includes(model.operation)) {
    return { ok:false, error:"Esta fase sólo completa Fabricar, Reparar, Desmantelar y Modificar." };
  }

  const closingCheck = await expectedProjectMaterialCopper(project, model, resolver);
  if (!closingCheck.ok) return closingCheck;
  if (closingCheck.materialCopper !== model.ledger.committedMaterialsCopper) {
    return {
      ok:false,
      error:"El coste canónico cambió desde la reserva; libera o replantea el Proyecto antes de completar.",
      expectedCopper:closingCheck.materialCopper,
      committedCopper:model.ledger.committedMaterialsCopper
    };
  }

  const consumed = await consumeReservations(project, resolver);
  if (!consumed.ok) return consumed;

  let outcome;
  try {
    if (model.operation === "fabricate") outcome = await fabricationOutcome(project);
    else if (model.operation === "repair") outcome = await repairOutcome(project, resolver);
    else if (model.operation === "modify") outcome = await modificationOutcome(project,resolver);
    else outcome = await dismantleOutcome(project, resolver);
  } catch (error) {
    outcome = { ok:false, error:"Falló la resolución material del Proyecto.", cause:String(error?.message ?? error) };
  }

  if (!outcome.ok) {
    await rollbackUpdates(consumed.snapshots);
    return outcome;
  }

  const completionToken = randomToken();
  try {
    await project.update({
      "system.state":"completed",
      "system.execution.committed":false,
      "system.execution.revision":model.execution.revision + 1,
      "system.execution.completionToken":completionToken,
      "system.ledger.recoveredMaterialsCopper":Math.max(
        model.ledger.recoveredMaterialsCopper,
        Math.floor(number(outcome.recoveredMaterialsCopper))
      )
    }, { tmValidated:true, tmCrafting:true });
  } catch (error) {
    await outcome.rollback?.();
    await rollbackUpdates(consumed.snapshots);
    return { ok:false, error:"No fue posible cerrar el Proyecto; se intentó revertir la operación.", cause:String(error?.message ?? error) };
  }

  return {
    ok:true,
    completed:true,
    completionToken,
    outputUuid:outcome.output?.uuid ?? "",
    recoveredMaterialsCopper:Math.floor(number(outcome.recoveredMaterialsCopper))
  };
}
