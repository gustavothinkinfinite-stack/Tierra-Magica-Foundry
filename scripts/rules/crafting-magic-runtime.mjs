import { withActorResourceLock } from "./resource-mutation.mjs";
import {
  enchantmentProfile,
  imprintActivationProfile,
  sealRearmQuote,
  validateAttunement,
  validateEnchantedActivation,
  validateImprintActivation,
  validateRunicConfiguration,
  validateTrapConfiguration
} from "./crafting-magic.mjs";

const number=(value,fallback=0)=>{
  const parsed=Number(value);
  return Number.isFinite(parsed)?parsed:fallback;
};
const text=(value)=>String(value??"").trim();
const clone=(value)=>globalThis.foundry?.utils?.deepClone?foundry.utils.deepClone(value):structuredClone(value);

function warn(message) {
  if(globalThis.ui?.notifications?.warn) return ui.notifications.warn(message);
  return {ok:false,error:message};
}

function sameActorItem(actor,item) {
  return Boolean(actor && item && (item.parent===actor || (actor.id && item.parent?.id===actor.id)));
}

function trimClaims(source,maximum=64) {
  const entries=Object.entries(source&&typeof source==="object"?source:{});
  return Object.fromEntries(entries.slice(Math.max(0,entries.length-maximum)));
}

async function chat(actor,title,body) {
  if(!globalThis.ChatMessage?.create) return null;
  const escape=globalThis.foundry?.utils?.escapeHTML ?? ((value)=>String(value));
  return ChatMessage.create({
    speaker:ChatMessage.getSpeaker?.({actor}) ?? {},
    content:"<div class='tm-chat-card'><strong>"+escape(title)+"</strong><p>"+escape(body)+"</p></div>"
  });
}

function runicImprint(host,id) {
  return (Array.isArray(host?.system?.runic?.imprints)?host.system.runic.imprints:[])
    .find((row)=>String(row.id)===String(id)) ?? null;
}

function socketedStone(actor,imprint) {
  if(imprint?.mode!=="stone" || !imprint?.stoneUuid) return null;
  return [...(actor?.items??[])].find((item)=>String(item.uuid)===String(imprint.stoneUuid)) ?? null;
}

function activeSustainedCount(actor) {
  const spellIds=Array.isArray(actor?.system?.magic?.sustainedSpellIds)?actor.system.magic.sustainedSpellIds:[];
  const objectIds=Array.isArray(actor?.system?.magic?.sustainedObjectIds)?actor.system.magic.sustainedObjectIds:[];
  return new Set([...spellIds,...objectIds]).size;
}

function sustainedLimit(actor) {
  const hasDouble=[...(actor?.items??[])].some((item)=>
    item?.type==="technique" && String(item.system?.slug??item.name??"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")==="doble-sostenimiento"
  );
  return hasDouble?2:1;
}

async function claimAutomaticEvent(targetActor,eventId,sourceUuid) {
  if(!targetActor || !text(eventId)) return {ok:false,error:"La activación automática requiere objetivo y un identificador único del evento físico."};
  return withActorResourceLock(targetActor,async()=>{
    const current=targetActor.system?.magic?.automaticEventClaims??{};
    if(current[eventId]) {
      return {ok:false,error:"Ese mismo evento físico indivisible ya alimentó una trampa o Sello ordinario contra este objetivo.",claimedBy:current[eventId]};
    }
    const next=trimClaims({...current,[eventId]:String(sourceUuid)},63);
    next[eventId]=String(sourceUuid);
    await targetActor.update({"system.magic.automaticEventClaims":next},{tmValidated:true,tmCraftingMagic:true});
    return {ok:true,previous:clone(current)};
  });
}

async function rollbackAutomaticEvent(targetActor,previous) {
  try {
    await targetActor.update({"system.magic.automaticEventClaims":previous},{tmValidated:true,tmCraftingMagic:true});
  } catch {}
}

export function installCraftingMagicGuards(ActorClass) {
  ActorClass.prototype.attuneMagicItem=async function(item,{elapsedMinutes=60,functionKnown=true}={}){
    if(!sameActorItem(this,item)) return warn("El objeto debe estar bajo control del Actor para Sintonizarlo.");
    return withActorResourceLock(this,async()=>{
      const validation=validateAttunement(this,item,{elapsedMinutes,functionKnown});
      if(!validation.valid) return warn(validation.issues.map((issue)=>issue.message).join(" "));
      await item.update({
        "system.enchantment.attunedActorUuid":this.uuid,
        "system.enchantment.reserve.value":0
      },{tmValidated:true,tmCraftingMagic:true});
      await chat(this,"Sintonización — "+item.name,"Vínculo establecido. La Reserva Encantada comienza en 0.");
      return {ok:true,cost:validation.cost,reserve:0};
    });
  };

  ActorClass.prototype.unattuneMagicItem=async function(item){
    if(!sameActorItem(this,item)) return warn("El objeto no pertenece al Actor.");
    return withActorResourceLock(this,async()=>{
      if(String(item.system?.enchantment?.attunedActorUuid??"")!==String(this.uuid)) {
        return {ok:true,changed:false};
      }
      await item.update({
        "system.enchantment.attunedActorUuid":"",
        "system.enchantment.reserve.value":0
      },{tmValidated:true,tmCraftingMagic:true});
      return {ok:true,changed:true};
    });
  };

  ActorClass.prototype.socketImprintStone=async function(host,stone,{
    channelIds=[],
    elapsedMinutes=10,
    underPressure=false
  }={}){
    if(!sameActorItem(this,host)||!sameActorItem(this,stone)) return warn("Host y Piedra deben pertenecer al mismo Actor.");
    if(underPressure===true || number(elapsedMinutes)<10) return warn("Insertar una Piedra requiere 10 minutos sin presión.");
    if(stone.system?.imprintStone?.enabled!==true) return warn("El Item no es una Piedra de Impronta.");
    if(text(stone.system?.imprintStone?.socketedHostUuid)) return warn("La Piedra ya está insertada en otro Engarce.");
    const key=String(stone.system.imprintStone.imprintKey??"");
    const profile=imprintActivationProfile(key);
    if(!profile || profile.grade!==Math.floor(number(stone.system.imprintStone.grade))) return warn("La Piedra no posee una Impronta/Grado coherentes.");

    return withActorResourceLock(this,async()=>{
      const runic=clone(host.system?.runic??{capacityPrepared:0,channels:[],imprints:[]});
      const ids=[...new Set(channelIds.map(String))];
      if(ids.length!==profile.cru) return warn("La Piedra no ocupa la CRu requerida.");
      const occupied=new Set((runic.imprints??[]).flatMap((row)=>Array.isArray(row.channelIds)?row.channelIds.map(String):[]));
      for(const id of ids) {
        const channel=(runic.channels??[]).find((row)=>String(row.id)===id);
        if(!channel || channel.type!=="socket") return warn("La Piedra requiere Engarces existentes.");
        if(occupied.has(id)) return warn("Uno de los Engarces ya está ocupado.");
      }
      const imprint={
        id:"stone-"+String(stone.id??stone.uuid),
        key,
        mode:"stone",
        channelIds:ids,
        stoneUuid:String(stone.uuid)
      };
      const next={...runic,imprints:[...(runic.imprints??[]),imprint]};
      const source={type:host.type,system:{...host.system,runic:next}};
      const validation=validateRunicConfiguration(source,next);
      if(!validation.valid) return warn(validation.issues.map((issue)=>issue.message).join(" "));

      const previousRunic=clone(host.system?.runic);
      try {
        await host.update({"system.runic":next},{tmValidated:true,tmCraftingMagic:true});
        await stone.update({"system.imprintStone.socketedHostUuid":String(host.uuid)},{tmValidated:true,tmCraftingMagic:true});
      } catch(error) {
        try { await host.update({"system.runic":previousRunic},{tmValidated:true,tmCraftingRollback:true}); } catch {}
        return {ok:false,error:"No fue posible insertar la Piedra de forma atómica.",cause:String(error?.message??error)};
      }
      return {ok:true,imprint};
    });
  };

  ActorClass.prototype.extractImprintStone=async function(host,stone,{elapsedMinutes=10,underPressure=false}={}){
    if(!sameActorItem(this,host)||!sameActorItem(this,stone)) return warn("Host y Piedra deben pertenecer al mismo Actor.");
    if(underPressure===true || number(elapsedMinutes)<10) return warn("Extraer una Piedra requiere 10 minutos sin presión.");
    return withActorResourceLock(this,async()=>{
      const runic=clone(host.system?.runic??{capacityPrepared:0,channels:[],imprints:[]});
      const found=(runic.imprints??[]).find((row)=>row.mode==="stone" && String(row.stoneUuid)===String(stone.uuid));
      if(!found) return {ok:true,changed:false};
      const next={...runic,imprints:runic.imprints.filter((row)=>row!==found)};
      const previousRunic=clone(host.system?.runic);
      try {
        await host.update({"system.runic":next},{tmValidated:true,tmCraftingMagic:true});
        await stone.update({"system.imprintStone.socketedHostUuid":""},{tmValidated:true,tmCraftingMagic:true});
      } catch(error) {
        try { await host.update({"system.runic":previousRunic},{tmValidated:true,tmCraftingRollback:true}); } catch {}
        return {ok:false,error:"No fue posible extraer la Piedra de forma atómica.",cause:String(error?.message??error)};
      }
      return {ok:true,changed:true};
    });
  };

  ActorClass.prototype.useRunicImprint=async function(host,imprintId,context={}){
    if(!sameActorItem(this,host)) return warn("La Impronta debe encontrarse en un objeto del Actor.");
    return withActorResourceLock(this,async()=>{
      const configuration=validateRunicConfiguration({type:host.type,system:host.system},host.system?.runic??{});
      if(!configuration.valid) return warn(configuration.issues.map((issue)=>issue.message).join(" "));
      const imprint=runicImprint(host,imprintId);
      if(!imprint) return warn("La Impronta seleccionada no existe en el Host.");
      if(imprint.mode==="stone") {
        const stone=socketedStone(this,imprint);
        if(!stone || String(stone.system?.imprintStone?.socketedHostUuid)!==String(host.uuid) ||
           String(stone.system?.imprintStone?.imprintKey)!==String(imprint.key)) {
          return warn("La Piedra de Impronta ya no está físicamente insertada en ese Host.");
        }
      }

      const validation=validateImprintActivation({
        actor:this,
        item:host,
        imprint,
        resolutionId:context.resolutionId,
        resolutionHostItemUuid:context.resolutionHostItemUuid,
        usesHostWeaponProfile:context.usesHostWeaponProfile,
        voluntaryStateCost:context.voluntaryStateCost,
        activeStackingGroups:context.activeStackingGroups
      });
      if(!validation.valid) return warn(validation.issues.map((issue)=>issue.message).join(" "));
      const profile=validation.profile;
      const mana=Math.max(0,number(this.system.resources?.mana?.value));
      const updates={"system.resources.mana.value":mana-profile.manaCost};

      if(profile.activation==="action") updates["system.turn.action"]=false;
      else if(profile.activation==="reaction") updates["system.turn.reaction"]=false;
      else if(profile.activation==="linked") {
        const current=this.system.magic?.linkedImprintClaims??{};
        const next=trimClaims({...current,[String(context.resolutionId)]:String(host.uuid)+":"+String(imprint.id)},63);
        next[String(context.resolutionId)]=String(host.uuid)+":"+String(imprint.id);
        updates["system.magic.linkedImprintClaims"]=next;
      }
      await this.update(updates,{tmValidated:true,tmCraftingMagic:true});
      return {ok:true,profile,effect:clone(profile.effect??{}),manaRemaining:mana-profile.manaCost};
    });
  };

  ActorClass.prototype.activateEnchantedItem=async function(item){
    if(!sameActorItem(this,item)) return warn("El objeto encantado debe estar bajo control del Actor.");
    return withActorResourceLock(this,async()=>{
      if(item.system?.enchantment?.seal===true) return warn("Un Sello de Custodia se descarga por su disparador; no se activa como objeto Sintonizado.");
      const validation=validateEnchantedActivation(this,item);
      if(!validation.valid) return warn(validation.issues.map((issue)=>issue.message).join(" "));
      const enchant=item.system.enchantment;
      const spell=enchant.boundSpell;
      if(!spell) return warn("Este Encantamiento no posee una activación de Hechizo Vinculado.");
      const cost=Math.max(0,Math.floor(number(spell.manaCost)));
      const reserve=Math.max(0,Math.floor(number(enchant.reserve?.value)));
      const actorUpdates={};
      const activation=String(spell.activation??"Acción").toLowerCase();
      if(activation.includes("reacción")||activation.includes("reaction")) actorUpdates["system.turn.reaction"]=false;
      else actorUpdates["system.turn.action"]=false;

      if(spell.sustained===true) {
        const active=Array.isArray(this.system.magic?.sustainedObjectIds)?[...this.system.magic.sustainedObjectIds]:[];
        if(!active.includes(item.id) && activeSustainedCount(this)>=sustainedLimit(this)) {
          return warn("El Hechizo Vinculado excedería el límite normal de Sostenimiento.");
        }
        if(!active.includes(item.id)) actorUpdates["system.magic.sustainedObjectIds"]=[...active,item.id];
      }

      await item.update({"system.enchantment.reserve.value":reserve-cost},{tmValidated:true,tmCraftingMagic:true});
      try {
        await this.update(actorUpdates,{tmValidated:true,tmCraftingMagic:true});
      } catch(error) {
        try { await item.update({"system.enchantment.reserve.value":reserve},{tmValidated:true,tmCraftingRollback:true}); } catch {}
        return {ok:false,error:"No fue posible comprometer Acción/Reacción tras gastar RE; se intentó revertir la reserva.",cause:String(error?.message??error)};
      }

      const profile=enchantmentProfile(enchant.grade);
      await chat(this,item.name+" — Hechizo Vinculado","Consume "+cost+" RE. La tirada, si existe, usa 2d10 + "+profile.power+"; una DF derivada usa "+(11+profile.power)+".");
      return {
        ok:true,
        spell:clone(spell),
        power:profile.power,
        derivedDf:11+profile.power,
        reserveRemaining:reserve-cost
      };
    });
  };

  ActorClass.prototype.stopSustainedEnchantment=async function(itemId){
    const current=Array.isArray(this.system.magic?.sustainedObjectIds)?[...this.system.magic.sustainedObjectIds]:[];
    if(!current.includes(itemId)) return {ok:true,changed:false};
    await this.update({"system.magic.sustainedObjectIds":current.filter((id)=>id!==itemId)},{tmValidated:true,tmCraftingMagic:true});
    return {ok:true,changed:true};
  };

  ActorClass.prototype.triggerCraftedTrap=async function(trap,{targetActor=null,eventId="",reactive=false,prepared=false}={}){
    if(!sameActorItem(this,trap)) return warn("La trampa debe pertenecer/controlarse desde este Actor.");
    const validation=validateTrapConfiguration(trap.system?.trap??{});
    if(!validation.valid) return warn(validation.issues.map((issue)=>issue.message).join(" "));
    if(trap.system.trap.state!=="armed") return warn("La trampa no está Armada.");

    const manual=trap.system.trap.triggerType==="manual";
    if(manual) {
      return withActorResourceLock(this,async()=>{
        if(reactive) {
          if(!prepared) return warn("Un disparo manual reactivo requiere Preparar antes de gastar la Reacción.");
          if(this.system.turn?.reaction===false) return warn("La Reacción ya fue gastada.");
          await this.update({"system.turn.reaction":false},{tmValidated:true,tmCraftingMagic:true});
        } else {
          if(this.system.turn?.action===false) return warn("La Acción ya fue gastada.");
          await this.update({"system.turn.action":false},{tmValidated:true,tmCraftingMagic:true});
        }
        await trap.update({"system.trap.state":"discharged"},{tmValidated:true,tmCraftingMagic:true});
        return {ok:true,load:clone(trap.system.trap.load),precision:number(trap.system.trap.precision),mechanismDf:number(trap.system.trap.mechanismDf)};
      });
    }

    const claim=await claimAutomaticEvent(targetActor,eventId,trap.uuid);
    if(!claim.ok) return warn(claim.error);
    try {
      await trap.update({"system.trap.state":"discharged"},{tmValidated:true,tmCraftingMagic:true});
    } catch(error) {
      await rollbackAutomaticEvent(targetActor,claim.previous);
      return {ok:false,error:"No fue posible descargar la trampa; se revirtió la reclamación del evento.",cause:String(error?.message??error)};
    }
    return {ok:true,load:clone(trap.system.trap.load),precision:number(trap.system.trap.precision),mechanismDf:number(trap.system.trap.mechanismDf)};
  };

  ActorClass.prototype.triggerCustodySeal=async function(seal,{targetActor=null,eventId="",providedBypassKey=""}={}){
    if(!sameActorItem(this,seal)) return warn("El Sello debe estar bajo control de este Actor/instalación.");
    const enchant=seal.system?.enchantment??{};
    if(enchant.seal!==true || enchant.sealState!=="charged") return warn("El Sello no está Cargado.");
    if(enchant.sealBypassKey && String(providedBypassKey)===String(enchant.sealBypassKey)) {
      return {ok:true,bypassed:true,discharged:false};
    }
    const claim=await claimAutomaticEvent(targetActor,eventId,seal.uuid);
    if(!claim.ok) return warn(claim.error);

    const recharge=sealRearmQuote({
      enchantmentMaterialCopper:enchant.materialCostCopper,
      enchantmentTimeMinutes:enchant.timeMinutes
    });
    const chargedValue=Math.max(0,Math.floor(number(enchant.chargedReferenceValueCopper,seal.system?.priceCopper)));
    const dischargedValue=Math.max(0,chargedValue-2*recharge.materialCopper);
    try {
      await seal.update({
        "system.enchantment.sealState":"discharged",
        "system.priceCopper":dischargedValue
      },{tmValidated:true,tmCraftingMagic:true});
    } catch(error) {
      await rollbackAutomaticEvent(targetActor,claim.previous);
      return {ok:false,error:"No fue posible descargar el Sello; se revirtió la reclamación del evento.",cause:String(error?.message??error)};
    }
    return {
      ok:true,
      discharged:true,
      power:enchantmentProfile(enchant.grade)?.power??0,
      boundSpell:clone(enchant.boundSpell),
      valueCopper:dischargedValue
    };
  };
}
