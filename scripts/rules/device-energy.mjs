const number=(value,fallback=0)=>{
  const parsed=Number(value);
  return Number.isFinite(parsed)?parsed:fallback;
};

function actorItem(actor,id){
  if(!id) return null;
  if(typeof actor?.items?.get==="function") return actor.items.get(id) ?? null;
  return Array.from(actor?.items ?? []).find((item)=>item?.id===id || item?._id===id) ?? null;
}

function condition(item){
  return String(item?.system?.condition ?? "operative");
}

function energyValue(item){
  return Math.max(0,number(item?.system?.energy?.value));
}

function energyMax(item){
  return Math.max(0,number(item?.system?.energy?.max));
}

function numericStability(item){
  const raw=Number(item?.system?.stability);
  if(Number.isFinite(raw)) return Math.max(0,raw);
  const maximum=energyMax(item);
  if(maximum===4) return 1;
  if(maximum===8) return 2;
  if(maximum===16) return 4;
  return 0;
}

function linkMode(item){
  const value=String(item?.system?.energyLinkMode ?? "single");
  return ["single","bank","coupler"].includes(value)?value:"single";
}

function uniqueIds(values=[]){
  return [...new Set((Array.isArray(values)?values:[]).map((value)=>String(value??"").trim()).filter(Boolean))];
}

function individualAccumulator(item){
  if(!item || item.type!=="device") return false;
  if(linkMode(item)!=="single") return false;
  if(String(item.system?.energySourceItemId??"").trim()) return false;
  return energyMax(item)>0;
}

export function deviceEnergyStability(item){
  return numericStability(item);
}

export function deviceChargingFlow(item){
  const explicit=Math.max(0,number(item?.system?.chargingFlow));
  if(explicit>0) return explicit;
  if(energyMax(item)>0) return Math.max(0,number(item?.system?.flow));
  return 0;
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
  if(condition(source)==="disabled"){
    return {valid:false,source,external:source!==device,energy:0,flow:0,issue:source.name+" está Deshabilitado y no puede aportar Energía."};
  }
  if(sourceId && source===device){
    return {valid:true,source:device,external:false,energy:energyValue(device),flow:Math.max(0,number(device.system?.flow)),issue:""};
  }
  return {
    valid:true,
    source,
    external:source!==device,
    energy:energyValue(source),
    flow:Math.max(0,number(source.system?.flow)),
    issue:""
  };
}

export function resolveDeviceEnergySupply(actor,device){
  const direct=resolveDeviceEnergySource(actor,device);
  if(!direct.valid) return {...direct,mode:"single",sources:[],baseFlow:0};

  const root=direct.source;
  const mode=linkMode(root);
  if(mode==="single"){
    return {
      valid:true,
      source:root,
      root,
      external:root!==device,
      mode,
      sources:[root],
      energy:energyValue(root),
      baseFlow:Math.max(0,number(root.system?.flow)),
      flow:Math.max(0,number(root.system?.flow)),
      issue:""
    };
  }

  const ids=uniqueIds(root.system?.energySourceItemIds);
  if(ids.length!==2){
    return {valid:false,source:root,root,external:true,mode,sources:[],energy:0,baseFlow:0,flow:0,issue:root.name+" requiere exactamente dos acumuladores individuales."};
  }
  const sources=ids.map((id)=>actorItem(actor,id));
  if(sources.some((item)=>!individualAccumulator(item))){
    return {valid:false,source:root,root,external:true,mode,sources:[],energy:0,baseFlow:0,flow:0,issue:"Banco/Acoplador sólo puede usar dos acumuladores individuales; no se permite encadenar infraestructura."};
  }
  if(sources.some((item)=>condition(item)==="disabled")){
    return {valid:false,source:root,root,external:true,mode,sources,energy:0,baseFlow:0,flow:0,issue:"Un acumulador Deshabilitado no puede formar parte de la fuente activa."};
  }

  const energy=sources.reduce((sum,item)=>sum+energyValue(item),0);
  const baseFlow=Math.max(...sources.map((item)=>Math.max(0,number(item.system?.flow))));
  const flow=mode==="coupler"?Math.min(5,baseFlow+1):baseFlow;
  return {valid:true,source:root,root,external:true,mode,sources,energy,baseFlow,flow,issue:""};
}

export function planDeviceEnergyConsumption(supply,consumption,{flowBonus=0}={}){
  if(!supply?.valid) return {valid:false,issue:supply?.issue || "Fuente de Energía inválida.",draws:[]};
  const amount=Math.max(0,number(consumption));
  const bonus=Math.max(0,number(flowBonus));
  if(amount>supply.flow+bonus){
    return {valid:false,issue:"Caudal insuficiente.",draws:[],energyCost:0,couplerSurcharge:0};
  }
  const couplerSurcharge=supply.mode==="coupler" && amount>supply.baseFlow ? 1 : 0;
  const energyCost=amount+couplerSurcharge;
  if(energyCost>supply.energy){
    return {valid:false,issue:"Energía insuficiente.",draws:[],energyCost,couplerSurcharge};
  }

  let remaining=energyCost;
  const draws=[];
  for(const source of supply.sources){
    if(remaining<=0) break;
    const take=Math.min(energyValue(source),remaining);
    if(take>0) draws.push({item:source,itemId:String(source.id??source._id??""),amount:take});
    remaining-=take;
  }
  if(remaining>0) return {valid:false,issue:"La reserva agregada cambió antes de completar el consumo.",draws:[],energyCost,couplerSurcharge};
  return {valid:true,issue:"",draws,energyCost,couplerSurcharge};
}

function chargingSource(actor,item){
  if(!item || item.type!=="device") return {valid:false,issue:"Fuente de carga inválida."};
  if(condition(item)==="disabled") return {valid:false,issue:item.name+" está Deshabilitado y no puede descargar."};

  const explicitFlow=Math.max(0,number(item.system?.chargingFlow));
  const linkedId=String(item.system?.energySourceItemId??"").trim();
  if(explicitFlow>0 && linkedId){
    const provider=actorItem(actor,linkedId);
    if(!provider || !individualAccumulator(provider)) return {valid:false,issue:item.name+" no posee una fuente energética real compatible."};
    if(condition(provider)==="disabled") return {valid:false,issue:provider.name+" está Deshabilitado y no puede alimentar la carga."};
    return {
      valid:true,
      infrastructure:item,
      provider,
      flow:Math.min(explicitFlow,Math.max(0,number(provider.system?.flow))),
      energy:energyValue(provider)
    };
  }

  if(!individualAccumulator(item)) return {valid:false,issue:item.name+" no es un acumulador individual válido como fuente de carga."};
  return {valid:true,infrastructure:item,provider:item,flow:deviceChargingFlow(item),energy:energyValue(item)};
}

export function planDeviceChargeInterval(actor,sourceItems,receiverItems,{forced=false}={}){
  const sources=Array.from(sourceItems??[]);
  const receivers=Array.from(receiverItems??[]);
  if(!sources.length) return {valid:false,issue:"Debe existir al menos una fuente de carga.",sourceDraws:[],receiverAdds:[]};
  if(!receivers.length) return {valid:false,issue:"Debe existir al menos un acumulador receptor.",sourceDraws:[],receiverAdds:[]};
  if(forced && receivers.length!==1) return {valid:false,issue:"La Carga forzada sólo puede resolver un acumulador por intervalo.",sourceDraws:[],receiverAdds:[]};

  const sourceRows=[];
  const providerRows=new Map();
  for(const item of sources){
    const row=chargingSource(actor,item);
    if(!row.valid) return {valid:false,issue:row.issue,sourceDraws:[],receiverAdds:[]};
    const providerId=String(row.provider.id??row.provider._id??"");
    const prior=providerRows.get(providerId) ?? {
      item:row.provider,
      itemId:providerId,
      energy:energyValue(row.provider),
      flow:0
    };
    const providerFlow=Math.max(0,number(row.provider.system?.flow));
    prior.flow=Math.min(providerFlow || Number.POSITIVE_INFINITY,prior.flow+row.flow);
    if(!Number.isFinite(prior.flow)) prior.flow=row.flow;
    providerRows.set(providerId,prior);
    sourceRows.push(row);
  }

  const receiverIds=new Set(receivers.map((item)=>String(item?.id??item?._id??"")));
  if([...providerRows.keys()].some((id)=>receiverIds.has(id))) {
    return {valid:false,issue:"Un acumulador no puede ser fuente y receptor de la misma transferencia.",sourceDraws:[],receiverAdds:[]};
  }

  const providerState=[...providerRows.values()].map((row)=>({...row,remainingEnergy:row.energy,remainingFlow:row.flow}));
  const receiverAdds=[];
  const sourceDraws=new Map();

  for(const receiver of receivers){
    if(!individualAccumulator(receiver)) return {valid:false,issue:receiver?.name+" no es un acumulador individual receptor válido.",sourceDraws:[],receiverAdds:[]};
    const receiverCondition=condition(receiver);
    if(receiverCondition==="disabled") return {valid:false,issue:receiver.name+" está Deshabilitado y no puede recibir carga.",sourceDraws:[],receiverAdds:[]};
    if(forced && receiverCondition!=="operative") return {valid:false,issue:"La Carga forzada exige un acumulador Operativo.",sourceDraws:[],receiverAdds:[]};

    const stability=numericStability(receiver);
    if(stability<=0) return {valid:false,issue:receiver.name+" no posee Estabilidad numérica válida.",sourceDraws:[],receiverAdds:[]};
    const free=Math.max(0,energyMax(receiver)-energyValue(receiver));
    const receiverCap=Math.min(free,stability*(forced?2:1));
    let need=receiverCap;

    for(const provider of providerState){
      if(need<=0) break;
      const take=Math.min(need,provider.remainingFlow,provider.remainingEnergy);
      if(take<=0) continue;
      provider.remainingFlow-=take;
      provider.remainingEnergy-=take;
      need-=take;
      sourceDraws.set(provider.itemId,(sourceDraws.get(provider.itemId)??0)+take);
    }

    const added=receiverCap-need;
    receiverAdds.push({item:receiver,itemId:String(receiver.id??receiver._id??""),amount:added});
  }

  return {
    valid:true,
    issue:"",
    forced:forced===true,
    sourceDraws:[...sourceDraws.entries()].map(([itemId,amount])=>({item:providerRows.get(itemId).item,itemId,amount})),
    receiverAdds,
    transferred:receiverAdds.reduce((sum,row)=>sum+row.amount,0)
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
