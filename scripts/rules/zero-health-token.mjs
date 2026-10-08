// Marcador visual de 0 Vida. No altera Trauma, muerte, Derribado ni turnos.
// Se aplica exclusivamente al Token y evita confundir Incapacitado con Muerto.
export const ZERO_HEALTH_STATUS_ID="tm-incapacitado";
export const ZERO_HEALTH_STATUS_ICON="systems/tierra-magica/assets/icons/incapacitado.svg";
const pending=new Set();

export function shouldMarkIncapacitated(actor) {
  const life=actor?.system?.resources?.health?.value;
  return Number.isFinite(Number(life)) && life!==null && life!=="" && Number(life)<=0 &&
    ["character","npc","familiar"].includes(actor.type);
}

export function registerZeroHealthStatus(config) {
  if(!config?.statusEffects) return;
  config.statusEffects[ZERO_HEALTH_STATUS_ID]={
    id:ZERO_HEALTH_STATUS_ID,
    name:"Incapacitado — 0 Vida",
    img:ZERO_HEALTH_STATUS_ICON,
    hud:false
  };
}

// No comparte el estado de un Actor base con otros tokens no vinculados.
export async function syncZeroHealthToken(tokenDoc,{enabled=true}={}){
  const actor=tokenDoc?.actor;
  if(!actor?.toggleStatusEffect || !actor?.statuses) return false;
  const desired=Boolean(enabled && shouldMarkIncapacitated(actor));
  const active=actor.statuses.has(ZERO_HEALTH_STATUS_ID);
  if(desired===active) return false;
  const id=String(tokenDoc?.uuid??actor.uuid??actor.id??"");
  if(!id||pending.has(id)) return false;
  pending.add(id);
  try{
    await actor.toggleStatusEffect(ZERO_HEALTH_STATUS_ID,{active:desired,overlay:true});
    return true;
  }finally{pending.delete(id);}
}

export function installZeroHealthTokenHooks(hooks,{gameApi=()=>globalThis.game,canvasApi=()=>globalThis.canvas}={}){
  const enabled=()=>Boolean(gameApi()?.settings?.get?.("tierra-magica","zeroHealthTokenIndicator"));
  // Sólo el DJ activo coordina la escritura, evitando duplicados multicliente.
  const authorized=()=>{
    const game=gameApi(),user=game?.user;
    if(!user?.isGM) return false;
    const active=[...(game?.users??[])].filter(u=>u?.isGM&&u?.active)
      .sort((a,b)=>String(a.id??"").localeCompare(String(b.id??"")));
    return active.length===0 || active[0].id===user.id;
  };
  const currentTokens=()=>canvasApi()?.tokens?.placeables??[];
  const forToken=async(tokenDoc)=>{
    if(!authorized()) return;
    try{await syncZeroHealthToken(tokenDoc,{enabled:enabled()});}
    catch(error){console.warn("Foundry T.M. | No se pudo sincronizar el estado 0 Vida.",error);}
  };
  const syncAll=async()=>{
    if(!authorized()) return;
    for(const token of currentTokens())await forToken(token.document??token);
  };
  hooks.on("canvasReady",()=>void syncAll());
  hooks.on("createToken",(token)=>void forToken(token));
  hooks.on("updateActor",(actor)=>{
    if(!authorized())return;
    const tokens=currentTokens().filter(token=>{
      const doc=token.document??token;
      return doc.actor===actor || doc.actor?.uuid===actor.uuid ||
        (doc.actor?.id===actor.id && doc.actor?.token===actor.token);
    });
    // Una modificación de Vida del Actor enlazado actualiza todos sus Tokens.
    for(const token of tokens)void forToken(token.document??token);
  });
  return {syncAll,forToken};
}
