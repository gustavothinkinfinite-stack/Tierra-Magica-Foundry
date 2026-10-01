const number=(value,fallback=0)=>{
  const parsed=Number(value);
  return Number.isFinite(parsed)?parsed:fallback;
};

function actorItem(actor,id){
  if(!id) return null;
  if(typeof actor?.items?.get==="function") return actor.items.get(id) ?? null;
  return Array.from(actor?.items ?? []).find((item)=>item?.id===id || item?._id===id) ?? null;
}

export function resolveDeviceEnergySource(actor,device){
  if(!device || device.type!=="device"){
    return {valid:false,source:null,external:false,energy:0,flow:0,issue:"Dispositivo inválido."};
  }
  const sourceId=String(device.system?.energySourceItemId ?? "").trim();
  const source=sourceId ? actorItem(actor,sourceId) : device;
  if(!source){
    return {valid:false,source:null,external:true,energy:0,flow:0,issue:device.name+" no tiene disponible la fuente de Energía vinculada."};
  }
  if(source.type!=="device"){
    return {valid:false,source:null,external:true,energy:0,flow:0,issue:"La fuente de Energía vinculada a "+device.name+" no es un dispositivo/acumulador válido."};
  }
  if(String(source.system?.condition ?? "operative") === "disabled"){
    return {valid:false,source,external:source!==device,energy:0,flow:0,issue:source.name+" está Deshabilitado y no puede aportar Energía."};
  }
  if(sourceId && source===device){
    return {valid:true,source:device,external:false,energy:Math.max(0,number(device.system?.energy?.value)),flow:Math.max(0,number(device.system?.flow)),issue:""};
  }
  return {
    valid:true,
    source,
    external:source!==device,
    energy:Math.max(0,number(source.system?.energy?.value)),
    flow:Math.max(0,number(source.system?.flow)),
    issue:""
  };
}

const sourceQueues=new WeakMap();

export async function withDeviceEnergyLock(source,operation){
  if(!source || (typeof source!=="object" && typeof source!=="function")) return operation();
  const previous=sourceQueues.get(source) ?? Promise.resolve();
  let release;
  const current=new Promise((resolve)=>{release=resolve;});
  sourceQueues.set(source,current);
  await previous;
  try{
    return await operation();
  }finally{
    release();
    if(sourceQueues.get(source)===current) sourceQueues.delete(source);
  }
}
