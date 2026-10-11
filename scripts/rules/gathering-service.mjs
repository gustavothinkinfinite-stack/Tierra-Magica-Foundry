import { rollFormula, extraordinaryTag } from "../rules.mjs";
import { TM_CONFIG } from "../config.mjs";
import {
  GATHERING_SETTING,GATHERING_INTERVAL_SECONDS,DEFAULT_GATHERING_RESOURCES,
  GATHERING_SKILLS,GATHERING_BIOMES,gatheringResourcesForBiome,gatheringAttemptKey,
  gatheringCooldownRemaining,gatheringOutcome
} from "./gathering.mjs";

const PHYSICAL_TYPES=new Set(["equipment","weapon","armor","shield","device"]);
const fail=(error)=>({ok:false,error});
const escape=(value)=>globalThis.foundry?.utils?.escapeHTML?.(String(value)) ?? String(value).replace(/[&<>"']/g,"");
const entries=()=>game.settings.get("tierra-magica",GATHERING_SETTING)?.entries ?? DEFAULT_GATHERING_RESOURCES;

export function registerGatheringSettings(){
  game.settings.register("tierra-magica",GATHERING_SETTING,{
    name:"Catálogo de recursos de búsqueda",scope:"world",config:false,type:Object,
    default:{entries:DEFAULT_GATHERING_RESOURCES.map(x=>({...x}))}
  });
}
export function gatheringCatalog(){return entries()}
export function sceneGatheringBiome(scene){
  return String(scene?.getFlag?.("tierra-magica","gatheringBiome")??"");
}
async function grantResource(actor,resource,quantity){
  let source=null;
  if(resource.sourceUuid){
    source=await fromUuid(resource.sourceUuid);
    if(source?.documentName!=="Item"||!PHYSICAL_TYPES.has(source.type))
      throw new Error("El objeto fuente ya no es un Item físico válido.");
  }
  const existing=Array.from(actor.items??[]).find(item=>
    item.getFlag?.("tierra-magica","gatheringResourceId")===resource.id &&
    PHYSICAL_TYPES.has(item.type) &&
    String(item.getFlag?.("tierra-magica","gatheringSourceUuid")??"")===resource.sourceUuid
  );
  if(existing){
    const previous=Number(existing.system?.quantity??1);
    if(!Number.isSafeInteger(previous)||previous<0||previous+quantity>99999)
      throw new Error("Cantidad de inventario inválida o excesiva.");
    await existing.update({"system.quantity":previous+quantity},{tmValidated:true,tmGathering:true});
    return existing;
  }
  const data=source?.toObject?.() ?? {
    name:resource.name,type:"equipment",
    system:{category:"Recolección",description:resource.description,stacking:"quantity",
      priceCopper:0,priceStatus:"unset"}
  };
  delete data._id;delete data.folder;delete data.ownership;delete data.sort;
  data.system={...(data.system??{}),quantity};
  data.flags={...(data.flags??{}),"tierra-magica":{
    ...(data.flags?.["tierra-magica"]??{}),
    gatheringResourceId:resource.id,gatheringSourceUuid:resource.sourceUuid
  }};
  const made=await actor.createEmbeddedDocuments("Item",[data],{tmValidated:true,tmGathering:true});
  if(!made?.length) throw new Error("No se pudo agregar el recurso al inventario.");
  return made[0];
}

// Solo el DJ principal ejecuta esta operación, invocado por state-authority.
export async function executeGatheringRequest(actor,payload={},requesterId=""){
  if(!game.user?.isGM) return fail("La recolección requiere arbitraje del DJ.");
  const requester=Array.from(game.users??[]).find(user=>String(user.id)===String(requesterId));
  if(!requester||!actor||actor.type!=="character"||!actor.uuid||
    (!requester.isGM&&!actor.canUserModify?.(requester,"update")))
    return fail("El solicitante no controla un personaje válido.");
  const scene=game.scenes?.get?.(String(payload.sceneId??""));
  if(!scene) return fail("La escena de búsqueda no está disponible.");
  if(!requester.isGM){
    const viewed=String(requester.viewedScene?.id??requester.viewedScene??"");
    if(viewed&&viewed!==scene.id) return fail("El personaje no está en la escena activa del jugador.");
    const tokenPresent=Array.from(scene.tokens??[]).some(token=>token.actorId===actor.id);
    if(!tokenPresent) return fail("Se necesita un token del personaje en la escena.");
  }
  const biome=sceneGatheringBiome(scene);
  const available=gatheringResourcesForBiome(entries(),biome,{showHidden:true,skills:Object.keys(TM_CONFIG.skills)});
  let resource;
  let attemptId;
  if(payload.resourceId==="__explore__"){
    if(!Object.hasOwn(TM_CONFIG.skills,String(payload.skillKey??""))) return fail("Habilidad exploratoria inválida.");
    const secret=available.filter(value=>value.hidden&&value.skill===payload.skillKey);
    if(!secret.length) return fail("No hay hallazgos exploratorios configurados para esta búsqueda.");
    resource=secret[Math.floor(Math.random()*secret.length)];
    attemptId="explore-"+payload.skillKey;
  }else{
    resource=available.find(value=>value.id===payload.resourceId&&!value.hidden);
    if(!resource) return fail("Ese recurso no está disponible en la escena.");
    attemptId=resource.id;
  }
  const skill=actor.system?.skills?.[resource.skill];
  if(!skill) return fail("El personaje no posee la definición de Habilidad requerida.");
  const worldTime=Number(game.time?.worldTime);
  if(!Number.isFinite(worldTime)) return fail("No se puede leer el tiempo mundial de Foundry.");
  const key=gatheringAttemptKey(scene.id,attemptId);
  const attempts=actor.getFlag?.("tierra-magica","gatheringAttempts")??{};
  const remaining=gatheringCooldownRemaining(attempts,key,worldTime);
  if(remaining>0) return fail("Se requiere avanzar el tiempo mundial antes de repetir esta búsqueda ("+
    Math.ceil(remaining/60)+" min restantes).");
  const attribute=Number(actor.system?.attributes?.[resource.attribute]?.value??0);
  const skillBonus=Number(skill.bonus);
  if(!Number.isFinite(attribute)||!Number.isFinite(skillBonus)) return fail("Modificadores de Habilidad inválidos.");
  const roll=await new Roll(rollFormula("normal",attribute+skillBonus),actor.getRollData()).evaluate();
  const outcome=gatheringOutcome(resource,roll.total);
  const extraordinary=extraordinaryTag(roll);

  // Registrar el intento ANTES de otorgar el recurso. Si la entrega falla, se revierte.
  // El puente de autoridad serializa los intentos de cada Actor y conserva recibos idempotentes.
  const updatedAttempts={...attempts,[key]:worldTime};
  await actor.setFlag("tierra-magica","gatheringAttempts",updatedAttempts);
  try{
    if(outcome.quantity>0) await grantResource(actor,resource,outcome.quantity);
  }catch(error){
    await actor.setFlag("tierra-magica","gatheringAttempts",attempts);
    return fail("No se entregó el recurso: "+String(error?.message??error));
  }

  const visibleName=outcome.success?resource.name:(payload.resourceId==="__explore__"?"Recurso desconocido":resource.name);
  const card="<div class='tm-chat-card'><strong>Recolección · "+escape(actor.name)+
    "</strong><p>"+escape(TM_CONFIG.attributes[resource.attribute])+" + "+
    escape(TM_CONFIG.skills[resource.skill]?.label)+" · "+escape(GATHERING_BIOMES[biome]??biome)+
    " · DF "+resource.df+"</p><p>"+escape(outcome.degree)+
    " (margen "+outcome.margin+"). "+(outcome.quantity?
    "Obtenido: "+outcome.quantity+" × "+escape(visibleName):"Sin recursos obtenidos.")+
    "</p>"+(extraordinary?"<p>"+escape(extraordinary)+"</p>":"")+"</div>";
  try{
    await roll.toMessage({speaker:ChatMessage.getSpeaker({actor}),flavor:card,
      rollMode:game.settings.get("core","rollMode")});
  }catch(error){console.error("Foundry T.M. | Registro de recolección",error)}
  return {ok:true,success:outcome.success,degree:outcome.degree,quantity:outcome.quantity,
    resourceName:visibleName,total:roll.total,df:resource.df};
}
