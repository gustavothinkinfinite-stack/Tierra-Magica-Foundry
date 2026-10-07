const number=(value,fallback=0)=>{
  const parsed=Number(value);
  return Number.isFinite(parsed)?parsed:fallback;
};
const nonNegative=(value)=>Math.max(0,number(value));
const copperCeil=(value)=>{
  const amount=nonNegative(value);
  return amount<=0?0:Math.ceil(amount-Number.EPSILON);
};
const minutes=(value)=>Math.max(0,number(value));
const text=(value)=>String(value??"").trim();

export const TRAP_FRAMES=Object.freeze({
  simple:Object.freeze({key:"simple",label:"Simple",referenceValueCopper:20,baseTimeMinutes:30,precision:2,mechanismDf:10,primaryRank:1,installation:"improvised",maxDamage:0,maxPenetration:0}),
  standard:Object.freeze({key:"standard",label:"Estándar",referenceValueCopper:100,baseTimeMinutes:120,precision:4,mechanismDf:12,primaryRank:2,installation:"adequate",maxDamage:5,maxPenetration:1}),
  complex:Object.freeze({key:"complex",label:"Complejo",referenceValueCopper:400,baseTimeMinutes:480,precision:6,mechanismDf:14,primaryRank:3,installation:"professional",maxDamage:8,maxPenetration:2}),
  masterwork:Object.freeze({key:"masterwork",label:"Magistral",referenceValueCopper:1200,baseTimeMinutes:1440,precision:8,mechanismDf:16,primaryRank:4,installation:"specialized",maxDamage:null,maxPenetration:null}),
  extraordinary:Object.freeze({key:"extraordinary",label:"Extraordinario",referenceValueCopper:3000,baseTimeMinutes:0,precision:10,mechanismDf:18,primaryRank:5,installation:"exceptional",maxDamage:null,maxPenetration:null})
});

export const TRAP_TRIGGERS=Object.freeze([
  "manual","contact","tripwire","opening","weight-release","delay","physical-remote","multi-physical"
]);
export const TRAP_LOAD_KINDS=Object.freeze(["alarm","maneuver","mechanical-strike","alchemy","environment"]);
export const TRAP_MANEUVER_EFFECTS=Object.freeze(["trip","grab"]);
export const TRAP_CONCEALMENT=Object.freeze({
  visible:Object.freeze({key:"visible",label:"Visible",detectionDf:0,rank:0,materialRate:0,timeRate:0,flatMinutes:0}),
  disguised:Object.freeze({key:"disguised",label:"Disimulada",detectionDf:10,rank:1,materialRate:0,timeRate:0,flatMinutes:10}),
  hidden:Object.freeze({key:"hidden",label:"Oculta",detectionDf:12,rank:2,materialRate:0.10,timeRate:0.25,flatMinutes:0}),
  expert:Object.freeze({key:"expert",label:"Experta",detectionDf:14,rank:3,materialRate:0.25,timeRate:0.50,flatMinutes:0}),
  master:Object.freeze({key:"master",label:"Maestra",detectionDf:16,rank:4,materialRate:0.50,timeRate:1.00,flatMinutes:0}),
  exceptional:Object.freeze({key:"exceptional",label:"Excepcional",detectionDf:18,rank:5,materialRate:1.00,timeRate:1.50,flatMinutes:0})
});

export const RUNE_CHANNEL_TYPES=Object.freeze(["inscription","socket"]);
export const SEAL_TRIGGER_TYPES=Object.freeze(["contact","opening","threshold"]);

export const UTILITY_ENCHANTMENTS=Object.freeze({
  dry:Object.freeze({key:"dry",label:"Seco"}),
  clean:Object.freeze({key:"clean",label:"Pulcro"}),
  tempered:Object.freeze({key:"tempered",label:"Templado"}),
  courtesyLight:Object.freeze({key:"courtesyLight",label:"Luz de Cortesía"}),
  chroma:Object.freeze({key:"chroma",label:"Croma"})
});

export const PASSIVE_ENCHANTMENTS=Object.freeze({
  firmnessAmulet:Object.freeze({
    key:"firmnessAmulet",label:"Amuleto de Firmeza",grade:1,group:"mental-fear-defense",roles:Object.freeze(["body"]),
    effect:Object.freeze({mentalDefenseBonus:2,context:"miedo sobrenatural o Intimidación compatible"})
  }),
  fallBrooch:Object.freeze({
    key:"fallBrooch",label:"Broche de Caída",grade:1,group:"fall-reduction",roles:Object.freeze(["body"]),
    effect:Object.freeze({fallSpacesReduction:1,minimum:0})
  }),
  revelationLenses:Object.freeze({
    key:"revelationLenses",label:"Lentes de Revelación",grade:2,group:"revelation-sensory",roles:Object.freeze(["optics"]),
    effect:Object.freeze({advantage:true,context:"ilusiones, ocultación mágica, invisibilidad y manipulación sensorial compatibles"})
  }),
  stabilityTalisman:Object.freeze({
    key:"stabilityTalisman",label:"Talismán de Estabilidad",grade:2,group:"magical-displacement-stability",roles:Object.freeze(["body"]),
    effect:Object.freeze({displacementReduction:1,minimum:0,usesPerScene:1,context:"desplazamiento mágico involuntario"})
  })
});

export const IMPRINTS=Object.freeze({
  lumenI:Object.freeze({key:"lumenI",label:"Lumen I",grade:1,cru:1,activation:"action",manaCost:1,group:"light-utilitarian",effect:Object.freeze({light:true,duration:"scene"})}),
  emberI:Object.freeze({key:"emberI",label:"Brasa I",grade:1,cru:1,activation:"action",manaCost:1,group:"heat-utilitarian",effect:Object.freeze({heatIgnition:true})}),
  arcaneEdgeI:Object.freeze({key:"arcaneEdgeI",label:"Filo Arcano I",grade:1,cru:1,activation:"linked",manaCost:2,group:"damage-manufacture",weaponHost:true,effect:Object.freeze({damageBonus:1})}),
  runicNeedleI:Object.freeze({key:"runicNeedleI",label:"Aguja Rúnica I",grade:1,cru:1,activation:"linked",manaCost:2,group:"penetration-manufacture",weaponHost:true,effect:Object.freeze({penetrationBonus:1,penetrationMax:3})}),
  runicGuardI:Object.freeze({key:"runicGuardI",label:"Guardia Rúnica I",grade:1,cru:1,activation:"reaction",manaCost:2,group:"barrier-defense",effect:Object.freeze({defenseBonus:1})}),
  runicAnchorI:Object.freeze({key:"runicAnchorI",label:"Ancla Rúnica I",grade:1,cru:1,activation:"reaction",manaCost:1,group:"maneuver-defense",effect:Object.freeze({maneuverDefenseBonus:2})}),
  thermalWardI:Object.freeze({key:"thermalWardI",label:"Resguardo Térmico I",grade:1,cru:1,activation:"reaction",manaCost:2,group:"thermal-reduction",effect:Object.freeze({thermalDamageReduction:2,damageTypes:Object.freeze(["fire","cold"])})}),
  matterSilenceI:Object.freeze({key:"matterSilenceI",label:"Silencio de Materia I",grade:1,cru:1,activation:"action",manaCost:1,group:"silent",effect:Object.freeze({silenceOwnObject:true,duration:"scene"})}),
  craftClarityI:Object.freeze({key:"craftClarityI",label:"Claridad de Oficio I",grade:1,cru:1,activation:"linked",manaCost:2,group:"professional-advantage",effect:Object.freeze({professionalAdvantage:true})}),
  runicBarrierII:Object.freeze({key:"runicBarrierII",label:"Barrera Rúnica II",grade:2,cru:2,activation:"reaction",manaCost:3,group:"barrier-defense",effect:Object.freeze({defenseBonus:2})}),
  penetratingEdgeII:Object.freeze({key:"penetratingEdgeII",label:"Filo Penetrante II",grade:2,cru:2,activation:"linked",manaCost:3,group:"damage-penetration-manufacture",weaponHost:true,effect:Object.freeze({damageBonus:1,penetrationBonus:1,penetrationMax:3})}),
  thermalWardII:Object.freeze({key:"thermalWardII",label:"Resguardo Térmico II",grade:2,cru:2,activation:"reaction",manaCost:3,group:"thermal-reduction",effect:Object.freeze({thermalDamageReduction:4,damageTypes:Object.freeze(["fire","cold"])})}),
  runicStabilityII:Object.freeze({key:"runicStabilityII",label:"Estabilidad Rúnica II",grade:2,cru:2,activation:"reaction",manaCost:2,group:"state-deterioration",effect:Object.freeze({deteriorationStepsReduced:1})}),
  kineticImpulseII:Object.freeze({key:"kineticImpulseII",label:"Impulso Cinético II",grade:2,cru:2,activation:"linked",manaCost:3,group:"kinetic-displacement",weaponHost:true,effect:Object.freeze({displacement:1,maxTargetScaleDelta:0})})
});

export const MAGIC_SUPPORTS=Object.freeze({
  1:Object.freeze({grade:1,referenceValueCopper:200,materialCopper:100,timeMinutes:480,craftingRank:3,installation:"professional"}),
  2:Object.freeze({grade:2,referenceValueCopper:500,materialCopper:250,timeMinutes:1440,craftingRank:4,installation:"specialized"}),
  3:Object.freeze({grade:3,referenceValueCopper:1000,materialCopper:500,timeMinutes:2400,craftingRank:5,installation:"exceptional"})
});

export const ENCHANTMENT_GRADES=Object.freeze({
  1:Object.freeze({grade:1,attunement:1,reserveMax:6,power:4,materialRate:0.25,materialMinimumCopper:500,timeRate:0.5,timeMinimumMinutes:1440,minQuality:"superior"}),
  2:Object.freeze({grade:2,attunement:2,reserveMax:10,power:6,materialRate:0.5,materialMinimumCopper:1500,timeRate:1,timeMinimumMinutes:3840,minQuality:"exceptional"}),
  3:Object.freeze({grade:3,attunement:3,reserveMax:14,power:8,materialRate:1,materialMinimumCopper:4000,timeRate:2,timeMinimumMinutes:9600,minQuality:"exceptional"})
});

const QUALITY_ORDER=Object.freeze(["defective","common","superior","exceptional"]);
const RUNIC_CAPACITY_BY_QUALITY=Object.freeze({defective:0,common:0,superior:1,exceptional:2});
const MANUFACTURE_GROUPS=Object.freeze({
  optimizedStrike:"damage-manufacture",
  penetratingProfile:"penetration-manufacture",
  silent:"silent"
});

function qualityIndex(value){
  return QUALITY_ORDER.indexOf(String(value));
}

export function trapFrameProfile(frame=""){
  return TRAP_FRAMES[String(frame)]??null;
}

export function trapRearmQuote(baseTimeMinutes=0){
  return {timeMinutes:Math.max(10,minutes(baseTimeMinutes)*0.25)};
}

export function trapConcealmentProfile(grade="visible"){
  return TRAP_CONCEALMENT[String(grade)]??null;
}

export function trapConcealmentQuote({
  frameReferenceValueCopper=0,
  frameBaseTimeMinutes=0,
  grade="visible"
}={}){
  const profile=trapConcealmentProfile(grade);
  if(!profile) return {valid:false,error:"Grado de Ocultación desconocido."};
  const baseTime=minutes(frameBaseTimeMinutes);
  if(profile.timeRate>0 && baseTime<=0) {
    return {valid:false,error:"La Ocultación porcentual necesita un tiempo base de Armazón definido."};
  }
  return {
    valid:true,
    grade:profile.key,
    detectionDf:profile.detectionDf,
    requiredRank:profile.rank,
    materialCopper:copperCeil(nonNegative(frameReferenceValueCopper)*profile.materialRate),
    additionalTimeMinutes:profile.flatMinutes+(baseTime*profile.timeRate)
  };
}


export function validateTrapConfiguration(trap={}){
  const issues=[];
  if(trap?.enabled!==true) return {valid:true,issues:[]};
  const frame=trapFrameProfile(trap.frame);
  if(!frame) issues.push({code:"trap-frame",message:"Armazón de trampa desconocido."});
  if(frame) {
    if(Math.floor(number(trap.precision))!==frame.precision) issues.push({code:"trap-precision",message:"La Precisión pertenece al Armazón y no puede editarse como potencia de carga.",expected:frame.precision});
    if(Math.floor(number(trap.mechanismDf))!==frame.mechanismDf) issues.push({code:"trap-mechanism-df",message:"La DF de Mecanismo debe coincidir con el Armazón.",expected:frame.mechanismDf});
  }
  if(!TRAP_TRIGGERS.includes(String(trap.triggerType??""))) {
    issues.push({code:"trap-trigger",message:"Disparador de trampa no permitido por CRAFT-06."});
  }
  if(String(trap.triggerType)==="manual" && trap.automatic===true) {
    issues.push({code:"trap-manual-automatic",message:"Un disparador manual no puede declararse automático."});
  }
  if(trap.automatic===true && !text(trap.physicalTriggerKey)) {
    issues.push({code:"trap-physical-trigger",message:"Una trampa automática debe declarar la condición física observable que la activa."});
  }
  const concealment=trap.concealment??{grade:"visible",detectionDf:0};
  const concealProfile=trapConcealmentProfile(concealment.grade??"visible");
  if(!concealProfile) {
    issues.push({code:"trap-concealment",message:"Grado de Ocultación desconocido."});
  } else if(Math.floor(number(concealment.detectionDf))!==concealProfile.detectionDf) {
    issues.push({code:"trap-detection-df",message:"La DF de Detección pertenece a la Ocultación y no puede editarse como potencia.",expected:concealProfile.detectionDf});
  }
  if(concealProfile?.key!=="visible" && concealment.environmentAllows===false) {
    issues.push({code:"trap-concealment-environment",message:"El entorno declarado no permite ese grado de Ocultación."});
  }
  const load=trap.load??{};
  if(!TRAP_LOAD_KINDS.includes(String(load.kind??""))) {
    issues.push({code:"trap-load-kind",message:"La carga de trampa no pertenece al catálogo cerrado de CRAFT-06."});
  }
  if(load.kind==="alarm" && (Math.max(0,number(load.damage))>0 || Math.max(0,number(load.penetration))>0)) {
    issues.push({code:"trap-alarm-damage",message:"Una Alarma no posee Daño ni Penetración propios."});
  }
  if(load.kind==="maneuver") {
    if(!TRAP_MANEUVER_EFFECTS.includes(String(load.maneuverEffect??""))) {
      issues.push({code:"trap-maneuver-effect",message:"Una carga de Maniobra debe declarar Derribar o Agarrar."});
    }
    if(Math.max(0,number(load.damage))>0 || Math.max(0,number(load.penetration))>0) {
      issues.push({code:"trap-maneuver-damage",message:"Una Maniobra mecánica usa Derribar/Agarrar y no declara Daño o Penetración gratuitos."});
    }
  }
  if(load.kind==="mechanical-strike" && frame) {
    const damage=Math.max(0,Math.floor(number(load.damage)));
    const pen=Math.max(0,Math.floor(number(load.penetration)));
    if(!text(load.profileRef)) issues.push({code:"trap-mechanical-profile",message:"Un Golpe mecánico debe señalar el arma/carga física cuyo perfil reutiliza."});
    if(!text(load.componentUuid)) issues.push({code:"trap-mechanical-component",message:"Un Golpe mecánico debe señalar la carga física real integrada en el Armazón."});
    if(frame.key==="simple" && damage>0) issues.push({code:"trap-simple-damage",message:"Un Armazón Simple no admite carga dañina automática."});
    if(Number.isFinite(frame.maxDamage) && damage>frame.maxDamage) issues.push({code:"trap-damage",message:"El daño de la carga excede el límite del Armazón."});
    if(Number.isFinite(frame.maxPenetration) && pen>frame.maxPenetration) issues.push({code:"trap-penetration",message:"La Penetración de la carga excede el límite del Armazón."});
  }
  if(load.kind==="alchemy") {
    if(!text(load.profileRef)) issues.push({code:"trap-alchemy-profile",message:"Una carga alquímica debe reutilizar un Perfil/Fórmula existente."});
    if(!text(load.componentUuid)) issues.push({code:"trap-alchemy-component",message:"La preparación alquímica consumida debe existir como componente físico."});
    if(Math.max(0,number(load.damage))>0 || Math.max(0,number(load.penetration))>0) {
      issues.push({code:"trap-alchemy-inline-power",message:"Daño/Pen de una carga alquímica pertenecen a su Fórmula, no al Armazón."});
    }
  }
  if(load.kind==="environment") {
    if(!text(load.geometryRef)) issues.push({code:"trap-environment-geometry",message:"Una carga ambiental debe señalar la geometría/efecto físico que realmente resuelve el peligro."});
    if(Math.max(0,number(load.damage))>0 || Math.max(0,number(load.penetration))>0) {
      issues.push({code:"trap-environment-inline-power",message:"Una caída o peligro ambiental usa su resolución física y no Daño/Pen impresos por el Armazón."});
    }
  }
  if(load.kind==="environment" && !text(load.geometryRef)) {
    issues.push({code:"trap-environment-geometry",message:"Una carga ambiental debe declarar la geometría física que produce el efecto."});
  }
  return {valid:issues.length===0,issues};
}

export function maxRunicCapacityForQuality(quality="common"){
  return RUNIC_CAPACITY_BY_QUALITY[String(quality)]??0;
}

export function runicMatrixQuote({referenceValueCopper=0,baseTimeMinutes=0,points=1}={}){
  const p=Math.max(0,Math.floor(number(points)));
  return {
    points:p,
    materialCopper:copperCeil(Math.max(50*p,nonNegative(referenceValueCopper)*0.20*p)),
    timeMinutes:Math.max(120*p,minutes(baseTimeMinutes)*0.25*p)
  };
}

export function runeInscriptionQuote({referenceValueCopper=0,baseTimeMinutes=0,grade=1}={}){
  const g=Math.max(1,Math.min(2,Math.floor(number(grade,1))));
  if(g===1) return {
    grade:1,
    materialCopper:copperCeil(Math.max(100,nonNegative(referenceValueCopper)*0.20)),
    timeMinutes:Math.max(240,minutes(baseTimeMinutes)*0.25)
  };
  return {
    grade:2,
    materialCopper:copperCeil(Math.max(200,nonNegative(referenceValueCopper)*0.40)),
    timeMinutes:Math.max(480,minutes(baseTimeMinutes)*0.50)
  };
}

export function imprintStoneCraftProfile(grade=1){
  const g=Math.floor(number(grade,0));
  if(g===1) return {grade:1,referenceValueCopper:400,materialCopper:200,timeMinutes:480};
  if(g===2) return {grade:2,referenceValueCopper:1000,materialCopper:500,timeMinutes:1440};
  return null;
}

export function validateRunicConfiguration(itemSource={},runic=itemSource?.system?.runic??{}){
  const issues=[];
  const quality=String(itemSource?.system?.quality??"common");
  const maximum=maxRunicCapacityForQuality(quality);
  const prepared=Math.max(0,Math.floor(number(runic.capacityPrepared)));
  if(prepared>maximum) issues.push({code:"runic-capacity-quality",message:"La CRu preparada excede la Calidad del soporte.",prepared,maximum});
  const channels=Array.isArray(runic.channels)?runic.channels:[];
  if(channels.length!==prepared) issues.push({code:"runic-channel-count",message:"Cada punto de CRu preparado debe estar configurado como Canal de Inscripción o Engarce."});
  const channelIds=new Set();
  for(const row of channels){
    const id=text(row?.id);
    if(!id || channelIds.has(id)) issues.push({code:"runic-channel-id",message:"Los Canales rúnicos requieren identificadores únicos."});
    if(id) channelIds.add(id);
    if(!RUNE_CHANNEL_TYPES.includes(String(row?.type??""))) issues.push({code:"runic-channel-type",message:"Tipo de Canal rúnico desconocido."});
  }
  const imprints=Array.isArray(runic.imprints)?runic.imprints:[];
  const occupied=new Set();
  const groups=new Map();
  for(const row of imprints){
    const profile=IMPRINTS[String(row?.key??"")];
    if(!profile){
      issues.push({code:"imprint-profile",message:"Impronta desconocida.",imprintId:text(row?.id)});
      continue;
    }
    const ids=Array.isArray(row?.channelIds)?row.channelIds.map(text).filter(Boolean):[];
    if(ids.length!==profile.cru) issues.push({code:"imprint-cru",message:"La Impronta no ocupa la CRu exigida por su Grado.",imprintId:text(row?.id)});
    for(const id of ids){
      if(!channelIds.has(id)) issues.push({code:"imprint-channel-missing",message:"La Impronta ocupa un Canal que no existe.",channelId:id});
      if(occupied.has(id)) issues.push({code:"imprint-channel-occupied",message:"Un Canal rúnico no puede alojar dos Improntas.",channelId:id});
      occupied.add(id);
      const channel=channels.find((entry)=>text(entry.id)===id);
      const expected=row?.mode==="stone"?"socket":"inscription";
      if(channel && channel.type!==expected) issues.push({code:"imprint-channel-mode",message:"Runa y Piedra deben ocupar el tipo de Canal correspondiente.",channelId:id});
    }
    if(row?.mode==="stone" && !text(row?.stoneUuid)) issues.push({code:"imprint-stone",message:"Una Piedra insertada debe señalar su Item físico."});
    if(row?.mode==="inscribed" && text(row?.stoneUuid)) issues.push({code:"imprint-inscribed-stone",message:"Una Runa inscrita no puede recuperar o referenciar una Piedra."});
    if(groups.has(profile.group)) issues.push({code:"imprint-equivalent",message:"Dos Improntas equivalentes no se acumulan en el mismo soporte.",conflictsWith:groups.get(profile.group)});
    else groups.set(profile.group,text(row?.id)||profile.key);
  }

  const manufactured=Array.isArray(itemSource?.system?.manufacture?.modifications)?itemSource.system.manufacture.modifications:[];
  const manufactureGroups=new Set(manufactured.map((row)=>MANUFACTURE_GROUPS[String(row?.key??"")]).filter(Boolean));
  for(const row of imprints){
    const profile=IMPRINTS[String(row?.key??"")];
    if(!profile) continue;
    if(profile.key==="penetratingEdgeII" && (manufactureGroups.has("damage-manufacture")||manufactureGroups.has("penetration-manufacture"))) {
      issues.push({code:"imprint-equivalent-manufacture",message:"Filo Penetrante II no se acumula con manufactura equivalente del arma."});
    } else if(manufactureGroups.has(profile.group)) {
      issues.push({code:"imprint-equivalent-manufacture",message:"La Impronta no se acumula con una propiedad de manufactura equivalente."});
    }
  }

  return {valid:issues.length===0,issues,capacityPrepared:prepared,maximum};
}

export function imprintActivationProfile(key=""){
  return IMPRINTS[String(key)]??null;
}

export function validateImprintActivation({actor,item,imprint,resolutionId="",resolutionHostItemUuid="",usesHostWeaponProfile=false,voluntaryStateCost=false,reactionTriggerValid=false,activeStackingGroups=[]}={}){
  const issues=[];
  const profile=IMPRINTS[String(imprint?.key??"")];
  if(!profile) return {valid:false,issues:[{code:"imprint-profile",message:"Impronta desconocida."}]};
  const mana=Math.max(0,number(actor?.system?.resources?.mana?.value));
  if(mana<profile.manaCost) issues.push({code:"imprint-mana",message:"Maná personal insuficiente; las Improntas no usan Sobrecarga."});
  if(profile.activation==="reaction") {
    if(actor?.system?.turn?.reaction===false) issues.push({code:"imprint-reaction",message:"La Reacción ya fue gastada."});
    if(reactionTriggerValid!==true) issues.push({code:"imprint-reaction-trigger",message:"Una Impronta de Reacción necesita un disparador reactivo válido."});
  }
  if(profile.activation==="linked"){
    if(!text(resolutionId)) issues.push({code:"imprint-resolution",message:"Una Impronta Vinculada requiere identificar la resolución que modifica."});
    const claims=actor?.system?.magic?.linkedImprintClaims??{};
    if(text(resolutionId) && claims[resolutionId]) issues.push({code:"imprint-linked-duplicate",message:"Sólo una Impronta Vinculada puede afectar una misma resolución."});
    if(profile.weaponHost){
      if(text(resolutionHostItemUuid)!==text(item?.uuid) || usesHostWeaponProfile!==true) {
        issues.push({code:"imprint-host-profile",message:"La Impronta Vinculada del arma sólo modifica una resolución que use el perfil del arma anfitriona."});
      }
    }
  }
  const activeGroups=new Set(Array.isArray(activeStackingGroups)?activeStackingGroups.map(String):[]);
  if(profile.group==="barrier-defense" && actor?.system?.combat?.kineticBarrierActive) activeGroups.add("barrier-defense");
  if(activeGroups.has(profile.group)) {
    issues.push({code:"imprint-stacking",message:"La Impronta es equivalente a un efecto ya activo y no se acumula."});
  }
  if(profile.key==="runicStabilityII" && voluntaryStateCost===true) {
    issues.push({code:"imprint-voluntary-state-cost",message:"Estabilidad Rúnica II no mitiga un deterioro pagado como coste voluntario de Sobrecarga/Carga forzada."});
  }
  return {valid:issues.length===0,issues,profile};
}

export function magicSupportProfile(grade=0){
  return MAGIC_SUPPORTS[Math.floor(number(grade))]??null;
}

export function utilityEnchantmentProfile(key=""){
  return UTILITY_ENCHANTMENTS[String(key)]??null;
}

export function passiveEnchantmentProfile(key=""){
  return PASSIVE_ENCHANTMENTS[String(key)]??null;
}

export function validateUtilityEnchantment(key=""){
  const profile=utilityEnchantmentProfile(key);
  return profile
    ? {valid:true,issues:[],profile}
    : {valid:false,issues:[{code:"utility-enchantment-profile",message:"El Encantamiento Utilitario no pertenece al catálogo cerrado de CRAFT-08."}]};
}

export function enchantmentProfile(grade=0){
  return ENCHANTMENT_GRADES[Math.floor(number(grade))]??null;
}

export function enchantmentCostQuote({referenceValueCopper=0,baseTimeMinutes=0,grade=1}={}){
  const profile=enchantmentProfile(grade);
  if(!profile) return {valid:false,error:"Grado de Encantamiento no permitido."};
  const materialCopper=copperCeil(Math.max(profile.materialMinimumCopper,nonNegative(referenceValueCopper)*profile.materialRate));
  const timeMinutes=Math.max(profile.timeMinimumMinutes,minutes(baseTimeMinutes)*profile.timeRate);
  return {
    valid:true,
    grade:profile.grade,
    materialCopper,
    timeMinutes,
    addedValueCopper:2*materialCopper,
    attunement:profile.attunement,
    reserveMax:profile.reserveMax,
    power:profile.power
  };
}

export function utilityEnchantmentQuote(){
  return {materialCopper:100,timeMinutes:480,addedValueCopper:200};
}

export function sealRearmQuote({enchantmentMaterialCopper=0,enchantmentTimeMinutes=0}={}){
  return {
    materialCopper:copperCeil(nonNegative(enchantmentMaterialCopper)*0.25),
    timeMinutes:Math.max(240,minutes(enchantmentTimeMinutes)*0.25)
  };
}

export function validateEnchantmentSupport(itemSource={},enchantment={}){
  const issues=[];
  const grade=Math.floor(number(enchantment.grade));
  if(grade===0) return {valid:true,issues:[]};
  const profile=enchantmentProfile(grade);
  if(!profile) return {valid:false,issues:[{code:"enchantment-grade",message:"Grado de Encantamiento desconocido."}]};
  const quality=String(itemSource?.system?.quality??"common");
  const dedicated=Math.max(0,Math.floor(number(itemSource?.system?.magicSupport?.grade)));
  if(dedicated===0 && qualityIndex(quality)<qualityIndex(profile.minQuality)) {
    issues.push({code:"enchantment-support-quality",message:"La Calidad del soporte es insuficiente para este Grado de Encantamiento."});
  }
  if(dedicated>0 && dedicated<grade) issues.push({code:"enchantment-dedicated-grade",message:"El Soporte Mágico Dedicado no admite este Grado."});
  if(grade===3 && enchantment.supportAppropriate!==true) issues.push({code:"enchantment-grade3-support",message:"Encantamiento III exige soporte físicamente apropiado para el Patrón."});
  if(grade===3 && enchantment.hasRareComponent!==true) issues.push({code:"enchantment-grade3-component",message:"Encantamiento III exige un componente arcano Raro/Excepcional compatible."});
  if(!text(enchantment.patternKey) && !text(enchantment.boundSpell?.slug) && !text(enchantment.passiveKey)) {
    issues.push({code:"enchantment-pattern",message:"Un Encantamiento mecánico debe declarar Patrón, Hechizo Vinculado o Perfil pasivo identificable."});
  }
  const passive=passiveEnchantmentProfile(enchantment.passiveKey);
  if(text(enchantment.passiveKey) && !passive) {
    issues.push({code:"enchantment-passive-profile",message:"El Encantamiento Pasivo no pertenece al catálogo cerrado de CRAFT-08."});
  }
  if(passive && passive.grade!==grade) {
    issues.push({code:"enchantment-passive-grade",message:"El Perfil pasivo no corresponde al Grado de Encantamiento declarado.",expectedGrade:passive.grade});
  }
  if(passive && dedicated<passive.grade) {
    const role=String(itemSource?.system?.magicSupport?.role??"");
    if(!passive.roles.includes(role)) {
      issues.push({code:"enchantment-passive-support",message:"El soporte físico no corresponde al Perfil pasivo catalogado.",expectedRoles:[...passive.roles]});
    }
  }
  if(passive && enchantment.boundSpell) {
    issues.push({code:"enchantment-payload",message:"Un mismo Encantamiento autónomo no combina Pasivo Sintonizado y Hechizo Vinculado."});
  }
  if(passive && enchantment.seal===true) {
    issues.push({code:"seal-passive",message:"Un Sello de una carga no puede usar un Pasivo Sintonizado como carga persistente."});
  }
  if(passive && text(enchantment.functionalKey) && text(enchantment.functionalKey)!==passive.group) {
    issues.push({code:"enchantment-passive-functional",message:"La equivalencia funcional del Pasivo no coincide con su Perfil catalogado.",expectedFunctionalKey:passive.group});
  }
  if(text(enchantment.patternKey) && !text(enchantment.boundSpell?.slug) && !passive && !text(enchantment.functionalKey)) {
    issues.push({code:"enchantment-functional-key",message:"Un Patrón mecánico no catalogado debe declarar su equivalencia funcional para impedir duplicados por cambio de nombre."});
  }
  if(enchantment.boundSpell){
    const spell=enchantment.boundSpell;
    if(String(spell.method??"direct")!=="direct") issues.push({code:"enchantment-ritual",message:"Un Ritual no puede vincularse mediante el procedimiento estándar."});
    if(String(spell.grade??"basic")==="legendary") issues.push({code:"enchantment-legendary",message:"Un hechizo Legendario no puede vincularse mediante el procedimiento estándar."});
    const gradeOrder={minor:0,basic:1,advanced:2,master:3,legendary:4};
    const maxByEnchant={1:1,2:2,3:3};
    if((gradeOrder[String(spell.grade??"basic")]??99)>maxByEnchant[grade]) issues.push({code:"enchantment-spell-grade",message:"El Hechizo Vinculado excede el Grado del Encantamiento."});
  }
  if(enchantment.seal===true && grade>2) issues.push({code:"seal-grade",message:"Un Sello de Custodia estándar sólo admite Encantamiento I o II."});
  if(enchantment.seal===true && enchantment.boundSpell?.sustained===true) {
    issues.push({code:"seal-sustained",message:"Un Sello de Custodia estándar no puede liberar un efecto Sostenido demandante."});
  }
  if(enchantment.seal===true && !SEAL_TRIGGER_TYPES.includes(String(enchantment.sealTriggerType??""))) {
    issues.push({code:"seal-trigger",message:"El Sello debe usar un disparador físico/mágico estándar explícito."});
  }
  if(text(enchantment.sealBypassKey) && enchantment.seal!==true) {
    issues.push({code:"seal-key-orphan",message:"Una llave/marca de Bypass sólo pertenece a un Sello de Custodia."});
  }
  return {valid:issues.length===0,issues};
}

export function attunementCapacityForActor(actor){
  if(actor?.type==="character") return 3;
  return Math.max(0,Math.floor(number(actor?.system?.magic?.attunementCapacity)));
}

export function enchantmentIdentityKeys(item){
  const enchant=item?.system?.enchantment??{};
  const keys=[];
  if(text(enchant.patternKey)) keys.push("pattern:"+text(enchant.patternKey).toLowerCase());
  if(text(enchant.boundSpell?.slug)) keys.push("spell:"+text(enchant.boundSpell.slug).toLowerCase());
  if(text(enchant.functionalKey)) keys.push("functional:"+text(enchant.functionalKey).toLowerCase());
  if(text(enchant.passiveKey)) keys.push("passive:"+text(enchant.passiveKey).toLowerCase());
  return [...new Set(keys)];
}

export function validateAttunement(actor,item,{elapsedMinutes=60,functionKnown=true}={}){
  const issues=[];
  const enchant=item?.system?.enchantment??{};
  const profile=enchantmentProfile(enchant.grade);
  if(!profile) issues.push({code:"attunement-enchantment",message:"El objeto no posee un Encantamiento sintonizable válido."});
  if(enchant.seal===true) issues.push({code:"attunement-seal",message:"Un Sello de Custodia no se Sintoniza."});
  if(String(item?.system?.condition??"operative")!=="operative") issues.push({code:"attunement-condition",message:"El objeto debe estar Operativo para establecer Sintonización."});
  if(nonNegative(elapsedMinutes)<60) issues.push({code:"attunement-time",message:"Establecer Sintonización requiere 1 hora."});
  if(functionKnown!==true) issues.push({code:"attunement-knowledge",message:"La criatura debe conocer al menos la función general del objeto."});
  const actorUuid=text(actor?.uuid);
  if(text(enchant.attunedActorUuid) && text(enchant.attunedActorUuid)!==actorUuid) issues.push({code:"attunement-owner",message:"El objeto ya está Sintonizado con otra criatura."});

  const capacity=attunementCapacityForActor(actor);
  const other=[...(actor?.items??[])].filter?.((entry)=>entry!==item && text(entry?.system?.enchantment?.attunedActorUuid)===actorUuid) ?? [];
  const used=other.reduce((sum,entry)=>sum+(enchantmentProfile(entry?.system?.enchantment?.grade)?.attunement??0),0);
  if(profile && used+profile.attunement>capacity) issues.push({code:"attunement-capacity",message:"La Sintonización excede la capacidad disponible.",used,capacity});

  const candidateKeys=new Set(enchantmentIdentityKeys(item));
  for(const entry of other){
    const shared=enchantmentIdentityKeys(entry).find((key)=>candidateKeys.has(key));
    if(shared) {
      issues.push({code:"attunement-duplicate",message:"No pueden Sintonizarse duplicados funcionales para multiplicar la reserva del mismo efecto.",conflictsWith:entry.uuid,key:shared});
      break;
    }
  }
  return {valid:issues.length===0,issues,capacity,used,cost:profile?.attunement??0};
}

export function attunedPassiveEnchantments(actor){
  const actorUuid=text(actor?.uuid);
  const results=[];
  for(const item of [...(actor?.items??[])]) {
    const enchant=item?.system?.enchantment??{};
    if(text(enchant.attunedActorUuid)!==actorUuid) continue;
    if(String(item?.system?.condition??"operative")!=="operative") continue;
    const passive=passiveEnchantmentProfile(enchant.passiveKey);
    if(!passive) continue;
    results.push({
      item,
      itemUuid:text(item?.uuid),
      key:passive.key,
      group:passive.group,
      grade:passive.grade,
      effect:structuredClone(passive.effect)
    });
  }
  return results;
}

export function validateEnchantedActivation(actor,item){
  const issues=[];
  const enchant=item?.system?.enchantment??{};
  const profile=enchantmentProfile(enchant.grade);
  if(!profile) return {valid:false,issues:[{code:"enchantment-grade",message:"Encantamiento inválido."}]};
  if(text(enchant.attunedActorUuid)!==text(actor?.uuid)) issues.push({code:"enchantment-attunement",message:"Sólo la criatura Sintonizada puede activar el Encantamiento o usar su Pasivo."});
  if(String(item?.system?.condition??"operative")!=="operative") issues.push({code:"enchantment-condition",message:"El objeto debe estar Operativo para activar su Encantamiento."});
  const spell=enchant.boundSpell??null;
  if(spell){
    const cost=Math.max(0,Math.floor(number(spell.manaCost)));
    const reserve=Math.max(0,Math.floor(number(enchant.reserve?.value)));
    if(reserve<cost) issues.push({code:"enchantment-reserve",message:"Reserva Encantada insuficiente; RE no admite Sobrecarga."});
    const activation=String(spell.activation??"Acción").toLowerCase();
    if(activation.includes("reacción")||activation.includes("reaction")){
      } else if(actor?.system?.turn?.action===false) {
      issues.push({code:"enchantment-action",message:"La Acción ya fue gastada."});
    }
  }
  return {valid:issues.length===0,issues,profile};
}

export function integratedMagicRecoveryCopper({
  condition="operative",
  materialCopper=0
}={}) {
  const rates=Object.freeze({
    operative:0.25,
    damaged:0.15,
    disabled:0.10,
    ruined:0.05,
    destroyed:0
  });
  const rate=rates[String(condition)]??0;
  return Math.floor(nonNegative(materialCopper)*rate+Number.EPSILON);
}

export function isAutomaticPhysicalEventClaimed(actor,eventId){
  const key=text(eventId);
  if(!key) return false;
  return Boolean(actor?.system?.magic?.automaticEventClaims?.[key]);
}
