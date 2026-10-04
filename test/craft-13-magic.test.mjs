import test from "node:test";
import assert from "node:assert/strict";

import {
  ENCHANTMENT_GRADES,
  IMPRINTS,
  attunementCapacityForActor,
  enchantmentCostQuote,
  enchantmentIdentityKeys,
  imprintStoneCraftProfile,
  maxRunicCapacityForQuality,
  passiveEnchantmentProfile,
  runicMatrixQuote,
  runeInscriptionQuote,
  sealRearmQuote,
  trapConcealmentQuote,
  trapFrameProfile,
  trapRearmQuote,
  utilityEnchantmentProfile,
  utilityEnchantmentQuote,
  validateAttunement,
  validateEnchantmentSupport,
  validateImprintActivation,
  validateRunicConfiguration,
  validateTrapConfiguration,
  validateUtilityEnchantment
} from "../scripts/rules/crafting-magic.mjs";

const item=(overrides={})=>({
  uuid:"Actor.a.Item.item",
  type:"weapon",
  system:{
    quality:"exceptional",
    condition:"operative",
    manufacture:{modifications:[]},
    runic:{capacityPrepared:0,channels:[],imprints:[]},
    enchantment:{grade:0,reserve:{value:0,max:0},attunedActorUuid:""},
    ...overrides
  }
});

const actor=(overrides={})=>({
  id:"a",
  uuid:"Actor.a",
  type:"character",
  system:{
    resources:{mana:{value:9}},
    turn:{action:true,reaction:true},
    combat:{kineticBarrierActive:false},
    magic:{attunementCapacity:3,linkedImprintClaims:{},automaticEventClaims:{}},
    ...overrides
  },
  items:[]
});

test("CRAFT-13E: CRu es autoridad separada de CapM aunque hoy comparta progresión",()=>{
  assert.equal(maxRunicCapacityForQuality("common"),0);
  assert.equal(maxRunicCapacityForQuality("superior"),1);
  assert.equal(maxRunicCapacityForQuality("exceptional"),2);
});

test("CRAFT-13E: Matriz Rúnica cobra 20% VR y 25% tiempo por CRu con mínimos por punto",()=>{
  assert.deepEqual(
    runicMatrixQuote({referenceValueCopper:100,baseTimeMinutes:120,points:1}),
    {points:1,materialCopper:50,timeMinutes:120}
  );
  assert.deepEqual(
    runicMatrixQuote({referenceValueCopper:1000,baseTimeMinutes:480,points:2}),
    {points:2,materialCopper:400,timeMinutes:240}
  );
});

test("CRAFT-13E: inscripción I/II usa costes y mínimos canónicos",()=>{
  assert.deepEqual(
    runeInscriptionQuote({referenceValueCopper:100,baseTimeMinutes:120,grade:1}),
    {grade:1,materialCopper:100,timeMinutes:240}
  );
  assert.deepEqual(
    runeInscriptionQuote({referenceValueCopper:100,baseTimeMinutes:120,grade:2}),
    {grade:2,materialCopper:200,timeMinutes:480}
  );
});

test("CRAFT-13E: Piedras I/II conservan receta fija y no son Cristales de Resonancia",()=>{
  assert.deepEqual(imprintStoneCraftProfile(1),{grade:1,referenceValueCopper:400,materialCopper:200,timeMinutes:480});
  assert.deepEqual(imprintStoneCraftProfile(2),{grade:2,referenceValueCopper:1000,materialCopper:500,timeMinutes:1440});
  assert.equal(imprintStoneCraftProfile(0),null);
  assert.equal(imprintStoneCraftProfile(3),null);
});

test("CRAFT-13E: CRu preparada exige un Canal por punto y respeta su tipo",()=>{
  const host=item({
    runic:{
      capacityPrepared:2,
      channels:[{id:"a",type:"inscription"},{id:"b",type:"socket"}],
      imprints:[{id:"r",key:"arcaneEdgeI",mode:"inscribed",channelIds:["a"],stoneUuid:""}]
    }
  });
  assert.equal(validateRunicConfiguration(host).valid,true);

  const bad=item({
    runic:{
      capacityPrepared:2,
      channels:[{id:"a",type:"socket"}],
      imprints:[{id:"r",key:"arcaneEdgeI",mode:"inscribed",channelIds:["a"],stoneUuid:""}]
    }
  });
  const result=validateRunicConfiguration(bad);
  assert.equal(result.valid,false);
  assert.ok(result.issues.some((issue)=>issue.code==="runic-channel-count"));
  assert.ok(result.issues.some((issue)=>issue.code==="imprint-channel-mode"));
});

test("CRAFT-13E: Runa y Piedra equivalentes no ocupan el mismo soporte para doble beneficio",()=>{
  const host=item({
    runic:{
      capacityPrepared:2,
      channels:[{id:"a",type:"inscription"},{id:"b",type:"socket"}],
      imprints:[
        {id:"r",key:"arcaneEdgeI",mode:"inscribed",channelIds:["a"],stoneUuid:""},
        {id:"p",key:"arcaneEdgeI",mode:"stone",channelIds:["b"],stoneUuid:"Item.stone"}
      ]
    }
  });
  const result=validateRunicConfiguration(host);
  assert.equal(result.valid,false);
  assert.ok(result.issues.some((issue)=>issue.code==="imprint-equivalent"));
});

test("CRAFT-13E: Impronta equivalente a manufactura no se acumula",()=>{
  const host=item({
    manufacture:{modifications:[{key:"optimizedStrike"}]},
    runic:{
      capacityPrepared:1,
      channels:[{id:"a",type:"inscription"}],
      imprints:[{id:"r",key:"arcaneEdgeI",mode:"inscribed",channelIds:["a"],stoneUuid:""}]
    }
  });
  const result=validateRunicConfiguration(host);
  assert.equal(result.valid,false);
  assert.ok(result.issues.some((issue)=>issue.code==="imprint-equivalent-manufacture"));
});

test("CRAFT-13E: sólo una Vinculada puede reclamar la misma resolución y debe usar el arma Host",()=>{
  const a=actor();
  const host=item();
  const imprint={id:"r",key:"arcaneEdgeI"};
  let result=validateImprintActivation({
    actor:a,item:host,imprint,
    resolutionId:"attack-1",
    resolutionHostItemUuid:host.uuid,
    usesHostWeaponProfile:true
  });
  assert.equal(result.valid,true);
  assert.deepEqual(result.profile.effect,{damageBonus:1});

  a.system.magic.linkedImprintClaims["attack-1"]="otra";
  result=validateImprintActivation({
    actor:a,item:host,imprint,
    resolutionId:"attack-1",
    resolutionHostItemUuid:host.uuid,
    usesHostWeaponProfile:true
  });
  assert.ok(result.issues.some((issue)=>issue.code==="imprint-linked-duplicate"));

  delete a.system.magic.linkedImprintClaims["attack-1"];
  result=validateImprintActivation({
    actor:a,item:host,imprint,
    resolutionId:"spell-1",
    resolutionHostItemUuid:"Actor.a.Item.spell",
    usesHostWeaponProfile:false
  });
  assert.ok(result.issues.some((issue)=>issue.code==="imprint-host-profile"));
});

test("CRAFT-13E: Improntas usan Maná personal sin Sobrecarga y compiten con Barrera activa",()=>{
  const a=actor({resources:{mana:{value:1}},combat:{kineticBarrierActive:false}});
  let result=validateImprintActivation({actor:a,item:item(),imprint:{key:"arcaneEdgeI"},resolutionId:"a",resolutionHostItemUuid:"Actor.a.Item.item",usesHostWeaponProfile:true});
  assert.ok(result.issues.some((issue)=>issue.code==="imprint-mana"));

  a.system.resources.mana.value=9;
  a.system.combat.kineticBarrierActive=true;
  result=validateImprintActivation({actor:a,item:item(),imprint:{key:"runicBarrierII"}});
  assert.ok(result.issues.some((issue)=>issue.code==="imprint-stacking"));
});

test("CRAFT-13E: Estabilidad Rúnica II no mitiga deterioro pagado voluntariamente",()=>{
  const result=validateImprintActivation({
    actor:actor(),
    item:item(),
    imprint:{key:"runicStabilityII"},
    voluntaryStateCost:true
  });
  assert.ok(result.issues.some((issue)=>issue.code==="imprint-voluntary-state-cost"));
});

test("CRAFT-13E: Encantamientos I/II/III calculan CE, RE, PE y tiempo sin mezclar recursos",()=>{
  assert.deepEqual(
    enchantmentCostQuote({referenceValueCopper:100,baseTimeMinutes:480,grade:1}),
    {valid:true,grade:1,materialCopper:500,timeMinutes:1440,addedValueCopper:1000,attunement:1,reserveMax:6,power:4}
  );
  assert.equal(enchantmentCostQuote({referenceValueCopper:4000,baseTimeMinutes:480,grade:2}).materialCopper,2000);
  assert.equal(ENCHANTMENT_GRADES[3].reserveMax,14);
  assert.deepEqual(utilityEnchantmentQuote(),{materialCopper:100,timeMinutes:480,addedValueCopper:200});
});

test("CRAFT-13E: Utilitarios y Pasivos usan catálogos cerrados, no claves libres",()=>{
  assert.equal(utilityEnchantmentProfile("dry").label,"Seco");
  assert.equal(validateUtilityEnchantment("courtesyLight").valid,true);
  assert.equal(validateUtilityEnchantment("free-combat-bonus").valid,false);

  const passive=passiveEnchantmentProfile("firmnessAmulet");
  assert.equal(passive.grade,1);
  assert.equal(passive.group,"mental-fear-defense");
  assert.equal(passive.effect.mentalDefenseBonus,2);

  const host=item({quality:"superior",magicSupport:{grade:0,role:"body"}});
  assert.equal(validateEnchantmentSupport(host,{
    grade:1,
    passiveKey:"firmnessAmulet",
    functionalKey:"mental-fear-defense",
    seal:false
  }).valid,true);
  assert.ok(validateEnchantmentSupport(host,{
    grade:1,
    passiveKey:"invented-passive",
    functionalKey:"damage-manufacture",
    seal:false
  }).issues.some((issue)=>issue.code==="enchantment-passive-profile"));
});

test("CRAFT-13E: Pasivo exige soporte físico compatible y no comparte Encantamiento con Hechizo Vinculado",()=>{
  const optics=item({quality:"exceptional",magicSupport:{grade:0,role:"optics"}});
  assert.equal(validateEnchantmentSupport(optics,{
    grade:2,
    passiveKey:"revelationLenses",
    functionalKey:"revelation-sensory",
    seal:false
  }).valid,true);

  const body=item({quality:"exceptional",magicSupport:{grade:0,role:"body"}});
  const wrong=validateEnchantmentSupport(body,{
    grade:2,
    passiveKey:"revelationLenses",
    functionalKey:"revelation-sensory",
    seal:false
  });
  assert.ok(wrong.issues.some((issue)=>issue.code==="enchantment-passive-support"));

  const mixed=validateEnchantmentSupport(body,{
    grade:1,
    passiveKey:"firmnessAmulet",
    functionalKey:"mental-fear-defense",
    boundSpell:{slug:"barrera-cinetica",method:"direct",grade:"basic"},
    seal:false
  });
  assert.ok(mixed.issues.some((issue)=>issue.code==="enchantment-payload"));
});

test("CRAFT-13E: soporte Común no puede Encantarse I salvo Soporte Dedicado",()=>{
  const ordinary=item({quality:"common",manufacture:{referenceValueCopper:100}});
  const enchant={grade:1,patternKey:"barrier",functionalKey:"barrier-defense",supportAppropriate:false,hasRareComponent:false,seal:false};
  assert.ok(validateEnchantmentSupport(ordinary,enchant).issues.some((issue)=>issue.code==="enchantment-support-quality"));

  const dedicated=item({quality:"common",magicSupport:{grade:1},manufacture:{referenceValueCopper:100}});
  assert.equal(validateEnchantmentSupport(dedicated,enchant).valid,true);
});

test("CRAFT-13E: Encantamiento III exige soporte apropiado y componente Raro/Excepcional",()=>{
  const host=item();
  const base={grade:3,patternKey:"rupture",functionalKey:"rupture-ray",seal:false};
  let result=validateEnchantmentSupport(host,{...base,supportAppropriate:false,hasRareComponent:false});
  assert.ok(result.issues.some((issue)=>issue.code==="enchantment-grade3-support"));
  assert.ok(result.issues.some((issue)=>issue.code==="enchantment-grade3-component"));
  result=validateEnchantmentSupport(host,{...base,supportAppropriate:true,hasRareComponent:true});
  assert.equal(result.valid,true);
});

test("CRAFT-13E: Rituales, Legendarios y Sello III quedan fuera del procedimiento estándar",()=>{
  const host=item();
  assert.ok(validateEnchantmentSupport(host,{
    grade:2,patternKey:"ritual",boundSpell:{slug:"gran-rito",method:"ritual",grade:"advanced"},seal:false
  }).issues.some((issue)=>issue.code==="enchantment-ritual"));
  assert.ok(validateEnchantmentSupport(host,{
    grade:3,patternKey:"legend",boundSpell:{slug:"legend",method:"direct",grade:"legendary"},supportAppropriate:true,hasRareComponent:true,seal:false
  }).issues.some((issue)=>issue.code==="enchantment-legendary"));
  assert.ok(validateEnchantmentSupport(host,{
    grade:3,patternKey:"seal",functionalKey:"seal",supportAppropriate:true,hasRareComponent:true,seal:true,sealTriggerType:"contact"
  }).issues.some((issue)=>issue.code==="seal-grade"));
});

test("CRAFT-13E: una marca/llave mágica es Bypass, no un disparador-sensor",()=>{
  const host=item();
  const result=validateEnchantmentSupport(host,{
    grade:1,
    patternKey:"seal",
    functionalKey:"ward",
    seal:true,
    sealTriggerType:"magic-key",
    sealBypassKey:"marca-azul"
  });
  assert.ok(result.issues.some((issue)=>issue.code==="seal-trigger"));
});

test("CRAFT-13E: Sello sólo admite disparadores cerrados y rearme 25% CE/tiempo",()=>{
  const host=item();
  const bad=validateEnchantmentSupport(host,{
    grade:1,patternKey:"seal",functionalKey:"ward",seal:true,sealTriggerType:"hostile-intent"
  });
  assert.ok(bad.issues.some((issue)=>issue.code==="seal-trigger"));
  assert.deepEqual(sealRearmQuote({enchantmentMaterialCopper:500,enchantmentTimeMinutes:1440}),{materialCopper:125,timeMinutes:360});
});

test("CRAFT-13E: trampa deriva Precisión/DF del Armazón y limita la carga",()=>{
  const standard=trapFrameProfile("standard");
  assert.equal(standard.precision,4);
  const valid=validateTrapConfiguration({
    enabled:true,frame:"standard",precision:4,mechanismDf:12,triggerType:"contact",physicalTriggerKey:"placa-a",automatic:true,
    load:{kind:"mechanical-strike",profileRef:"Lanza",componentUuid:"Actor.a.Item.lanza",damage:5,penetration:1}
  });
  assert.equal(valid.valid,true);
  const invalid=validateTrapConfiguration({
    enabled:true,frame:"standard",precision:8,mechanismDf:18,triggerType:"contact",physicalTriggerKey:"placa-a",automatic:true,
    load:{kind:"mechanical-strike",profileRef:"Lanza",componentUuid:"Actor.a.Item.lanza",damage:8,penetration:3}
  });
  assert.ok(invalid.issues.some((issue)=>issue.code==="trap-precision"));
  assert.ok(invalid.issues.some((issue)=>issue.code==="trap-damage"));
  assert.ok(invalid.issues.some((issue)=>issue.code==="trap-penetration"));
  assert.deepEqual(trapRearmQuote(120),{timeMinutes:30});
});

test("CRAFT-13E: Ocultación mantiene DF, tiempo y materiales separados de Precisión",()=>{
  assert.deepEqual(
    trapConcealmentQuote({frameReferenceValueCopper:100,frameBaseTimeMinutes:120,grade:"hidden"}),
    {valid:true,grade:"hidden",detectionDf:12,requiredRank:2,materialCopper:10,additionalTimeMinutes:30}
  );
  assert.deepEqual(
    trapConcealmentQuote({frameReferenceValueCopper:100,frameBaseTimeMinutes:120,grade:"disguised"}),
    {valid:true,grade:"disguised",detectionDf:10,requiredRank:1,materialCopper:0,additionalTimeMinutes:10}
  );
  const invalid=validateTrapConfiguration({
    enabled:true,
    frame:"standard",
    precision:4,
    mechanismDf:12,
    triggerType:"contact",
    physicalTriggerKey:"plate-a",
    automatic:true,
    concealment:{grade:"hidden",detectionDf:14,environmentAllows:true},
    load:{kind:"alarm",damage:0,penetration:0}
  });
  assert.ok(invalid.issues.some((issue)=>issue.code==="trap-detection-df"));
  assert.equal(invalid.issues.some((issue)=>issue.code==="trap-precision"),false);
});

test("CRAFT-13E: carga de trampa fuera del catálogo cerrado se rechaza",()=>{
  const invalid=validateTrapConfiguration({
    enabled:true,
    frame:"standard",
    precision:4,
    mechanismDf:12,
    triggerType:"contact",
    physicalTriggerKey:"plate-a",
    automatic:true,
    load:{kind:"free-power",damage:99,penetration:9}
  });
  assert.equal(invalid.valid,false);
  assert.ok(invalid.issues.some((issue)=>issue.code==="trap-load-kind"));
});

test("CRAFT-13E: carga de Maniobra sólo admite Derribar o Agarrar",()=>{
  const invalid=validateTrapConfiguration({
    enabled:true,
    frame:"standard",
    precision:4,
    mechanismDf:12,
    triggerType:"contact",
    physicalTriggerKey:"plate-a",
    automatic:true,
    load:{kind:"maneuver",maneuverEffect:"teleport"}
  });
  assert.ok(invalid.issues.some((issue)=>issue.code==="trap-maneuver-effect"));
});

test("CRAFT-13E: Impronta de Reacción exige disparador reactivo válido",()=>{
  const denied=validateImprintActivation({
    actor:actor(),
    item:item(),
    imprint:{key:"runicGuardI"},
    reactionTriggerValid:false
  });
  assert.ok(denied.issues.some((issue)=>issue.code==="imprint-reaction-trigger"));
  const valid=validateImprintActivation({
    actor:actor(),
    item:item(),
    imprint:{key:"runicGuardI"},
    reactionTriggerValid:true
  });
  assert.equal(valid.valid,true);
});

test("CRAFT-13E: Capacidad de Sintonización es 3 sólo para personaje completo salvo Perfil expreso",()=>{
  assert.equal(attunementCapacityForActor(actor()),3);
  assert.equal(attunementCapacityForActor({type:"familiar",system:{magic:{attunementCapacity:0}}}),0);
  assert.equal(attunementCapacityForActor({type:"familiar",system:{magic:{attunementCapacity:1}}}),1);
});

test("CRAFT-13E: Sintonizar exige hora, Operativo y función conocida; comienza en RE 0",()=>{
  const a=actor();
  const enchanted=item({
    enchantment:{
      grade:1,
      patternKey:"barrier-pattern",
      functionalKey:"barrier-defense",
      reserve:{value:6,max:6},
      attunedActorUuid:"",
      seal:false
    }
  });
  a.items=[enchanted];
  let result=validateAttunement(a,enchanted,{elapsedMinutes:30,functionKnown:true});
  assert.ok(result.issues.some((issue)=>issue.code==="attunement-time"));
  result=validateAttunement(a,enchanted,{elapsedMinutes:60,functionKnown:false});
  assert.ok(result.issues.some((issue)=>issue.code==="attunement-knowledge"));
  result=validateAttunement(a,enchanted,{elapsedMinutes:60,functionKnown:true});
  assert.equal(result.valid,true);
  assert.equal(result.cost,1);
});

test("CRAFT-13E: duplicados por Patrón, Hechizo o equivalencia funcional no multiplican RE",()=>{
  const a=actor();
  const first=item({
    enchantment:{
      grade:1,patternKey:"p1",functionalKey:"barrier-defense",boundSpell:{slug:"barrera-cinetica"},
      reserve:{value:6,max:6},attunedActorUuid:a.uuid,seal:false
    }
  });
  const second=item({
    enchantment:{
      grade:1,patternKey:"p2",functionalKey:"barrier-defense",boundSpell:{slug:"otro"},
      reserve:{value:0,max:6},attunedActorUuid:"",seal:false
    }
  });
  a.items=[first,second];
  const result=validateAttunement(a,second,{elapsedMinutes:60,functionKnown:true});
  assert.ok(result.issues.some((issue)=>issue.code==="attunement-duplicate"));
  assert.ok(enchantmentIdentityKeys(first).includes("functional:barrier-defense"));
});
