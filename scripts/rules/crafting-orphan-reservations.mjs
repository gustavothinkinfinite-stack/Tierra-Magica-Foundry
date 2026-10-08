// CRAFT: recuperación GM de reservas huérfanas tras eliminar un Proyecto.
// No altera VI ni cantidad, nunca libera reservas que aún tengan un Proyecto.
const isObject=(v)=>v&&typeof v==="object"&&!Array.isArray(v);
const clone=(v)=>structuredClone(v??{});
const n=(v)=>Math.max(0,Math.floor(Number(v)||0));
function normalizedReservations(value){
  const result={};
  const visit=(v,path=[])=>{
    if(!isObject(v))return;
    for(const [k,entry] of Object.entries(v)){
      if(!isObject(entry))continue;
      if(Object.hasOwn(entry,"amountCopper")||Object.hasOwn(entry,"quantity")){
        const match=String(entry.projectUuid??"").match(/\.Item\.([^.]+)$/);
        const key=k.startsWith("p_")?k:match?"p_"+match[1].replace(/[^a-zA-Z0-9_-]/g,"_"):
          "legacy_"+[...path,k].join("_").replace(/[^a-zA-Z0-9_-]/g,"_");
        if(!Object.hasOwn(result,key))result[key]=clone(entry);
      }else visit(entry,[...path,k]);
    }
  };
  visit(value);
  return result;
}
function projectIdentity(key,entry){
  const uuid=String(entry?.projectUuid??"");
  const id=uuid.match(/\.Item\.([^.]+)$/)?.[1];
  return id??(key.startsWith("p_")?key.slice(2):null);
}
const itemsOf=(actor)=>Array.from(actor?.items?.values?.()??actor?.items??[]);
export function orphanCraftingReservationPlan(actor){
  if(!actor?.id||actor.type!=="character")return {valid:false,error:"Se requiere un Actor de personaje."};
  const items=itemsOf(actor);
  const ids=new Set(items.filter(item=>item.type==="project").map(item=>String(item.id)));
  const actorUuid=String(actor.uuid??"");
  const operations=[],unverifiable=[];
  for(const item of items){
    if(item.type==="project")continue;
    for(const [field,label] of [["craftingLot.reservations","VI"],["craftingReservations","Componentes"]]){
      const current=field==="craftingReservations"?item.system?.craftingReservations:item.system?.craftingLot?.reservations;
      if(!isObject(current)||!Object.keys(current).length)continue;
      const normalized=normalizedReservations(current),next=clone(normalized);
      const deleted=[];
      for(const [key,entry] of Object.entries(normalized)){
        const projectId=projectIdentity(key,entry);
        const recordedActor=String(entry.actorUuid??"");
        if(!projectId||recordedActor&&actorUuid&&recordedActor!==actorUuid){
          unverifiable.push({item:item.name,key,field});
          continue;
        }
        // Nunca liberar una reserva cuyo Proyecto aún existe, activo o no.
        if(ids.has(projectId))continue;
        delete next[key];
        deleted.push({key,projectId,amount:n(entry.amountCopper),quantity:n(entry.quantity)});
      }
      if(deleted.length)operations.push({item,field,label,before:clone(current),after:next,deleted});
    }
  }
  return {valid:true,operations,unverifiable,orphanReservations:operations.reduce((n,row)=>n+row.deleted.length,0)};
}
const repairing=new WeakSet();
export async function repairOrphanCraftingReservations(actor,{isGM=globalThis.game?.user?.isGM,confirm=false}={}){
  if(!isGM)return {ok:false,error:"Sólo el DJ puede reparar reservas huérfanas."};
  if(!confirm)return {ok:false,error:"Requiere confirmación explícita del DJ."};
  if(repairing.has(actor))return {ok:false,error:"Ya hay una reparación de reservas en curso."};
  repairing.add(actor);
  const snapshots=[];
  try{
    const plan=orphanCraftingReservationPlan(actor);
    if(!plan.valid)return {ok:false,error:plan.error};
    for(const operation of plan.operations){
      snapshots.push(operation);
      const path="system."+operation.field;
      await operation.item.update({[path]:operation.after},{tmValidated:true,tmCrafting:true,tmOrphanRepair:true});
    }
    return {ok:true,released:plan.orphanReservations,lots:plan.operations.length,unverifiable:plan.unverifiable};
  }catch(error){
    for(const operation of snapshots.reverse()){
      try{await operation.item.update({["system."+operation.field]:operation.before},{tmValidated:true,tmCrafting:true,tmOrphanRepair:true});}
      catch(rollbackError){console.error("Foundry T.M. | Rollback de reservas incompleto.",rollbackError);}
    }
    return {ok:false,error:"No fue posible completar la reparación de reservas: "+String(error?.message??error)};
  }finally{repairing.delete(actor);}
}
