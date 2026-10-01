const clone=(value)=>JSON.parse(JSON.stringify(value));
const clamp=(value,min,max)=>Math.min(max,Math.max(min,Number(value)||0));

export function seededRandom(seed=1){
  let state=(Number(seed)>>>0)||0x9e3779b9;
  return ()=>{
    state^=state<<13; state>>>=0;
    state^=state>>>17; state>>>=0;
    state^=state<<5; state>>>=0;
    return state/0x100000000;
  };
}

export function pick(random,values){
  return values[Math.floor(random()*values.length)];
}

export function createFuzzState({doubleSustain=false}={}){
  return {
    health:16,healthMax:16,allyHealth:16,allyHealthMax:16,
    mana:15,manaMax:15,
    fatigue:0,trauma:0,incapacitated:false,
    action:true,reaction:true,movement:6,movementSpent:0,
    doubleSustain:Boolean(doubleSustain),sustained:[],
    invisible:false,matrixPulses:0,
    saturatedFamilies:[],
    doses:{restorative:3,arcane:3},
    recovery:{healthUsed:false,manaUsed:false},
    deviceEnergy:8,deviceEnergyMax:8,
    kineticDefense:false,
    round:1,
    summons:{minor:false,major:false},
    counters:{accepted:0,rejected:0}
  };
}

function reject(state,reason){
  state.counters.rejected+=1;
  return {accepted:false,reason};
}
function accept(state,kind,meta={}){
  state.counters.accepted+=1;
  return {accepted:true,kind,...meta};
}
function spendEconomy(state,activation="Acción"){
  const reaction=String(activation).toLowerCase()==="reacción";
  if(state.incapacitated || state.health<=0) return false;
  if(reaction){
    if(!state.reaction) return false;
    state.reaction=false;
  }else{
    if(!state.action) return false;
    state.action=false;
  }
  return true;
}
function canSpendEconomy(state,activation="Acción"){
  if(state.incapacitated || state.health<=0) return false;
  return String(activation).toLowerCase()==="reacción" ? state.reaction : state.action;
}
function applySustain(state,id){
  const limit=state.doubleSustain?2:1;
  const existing=state.sustained.filter((entry)=>entry!==id);
  const retained=existing.slice(Math.max(0,existing.length-(limit-1)));
  state.sustained=[...retained,id];
  if(id!=="Invisibilidad") state.invisible=state.sustained.includes("Invisibilidad");
  state.summons.minor=state.sustained.includes("Llamada Menor");
  state.summons.major=state.sustained.includes("Llamada Mayor");
}
function clearSustainSideEffects(state){
  state.invisible=state.sustained.includes("Invisibilidad");
  state.summons.minor=state.sustained.includes("Llamada Menor");
  state.summons.major=state.sustained.includes("Llamada Mayor");
  if(!state.sustained.includes("Matriz Vital")) state.matrixPulses=0;
}

export function damage(state,amount){
  const previous=state.health;
  state.health=clamp(previous-Math.max(0,amount),0,state.healthMax);
  if(previous>0 && state.health===0){
    state.incapacitated=true;
    if(state.trauma===0) state.trauma=1;
    state.matrixPulses=0;
    state.sustained=state.sustained.filter((id)=>id!=="Matriz Vital");
    clearSustainSideEffects(state);
  }
  return accept(state,"damage",{amount:previous-state.health});
}

export function ordinaryHeal(state,amount){
  const previous=state.health;
  state.health=clamp(state.health+Math.max(0,amount),0,state.healthMax);
  if(state.health>0) state.incapacitated=false;
  return accept(state,"heal",{amount:state.health-previous});
}

export function beginTurn(state){
  state.round+=1;
  state.movementSpent=state.incapacitated?state.movement:0;
  state.action=!state.incapacitated;
  state.reaction=!state.incapacitated;
  state.kineticDefense=false;
  return accept(state,"beginTurn");
}

export function move(state,amount){
  const n=Math.max(0,Math.floor(Number(amount)||0));
  if(state.incapacitated || state.movementSpent+n>state.movement) return reject(state,"movement");
  if(n===0) return reject(state,"zero-movement");
  state.movementSpent+=n;
  return accept(state,"move",{amount:n});
}

export function guard(state){
  if(!canSpendEconomy(state,"Acción")) return reject(state,"action");
  spendEconomy(state,"Acción");
  return accept(state,"guard");
}

export function familiarLinkedAction(state){
  if(!canSpendEconomy(state,"Reacción")) return reject(state,"reaction");
  spendEconomy(state,"Reacción");
  return accept(state,"familiar-linked");
}

export function commandFamiliar(state){
  if(!canSpendEconomy(state,"Acción")) return reject(state,"action");
  spendEconomy(state,"Acción");
  return accept(state,"familiar-command");
}

function paySpell(state,cost){
  const mana=Math.max(0,Number(cost)||0);
  if(state.mana>=mana){
    state.mana-=mana;
    return {ok:true,overload:false};
  }
  if(mana-state.mana===1 && state.mana>=1 && state.fatigue<3){
    state.mana=0;
    state.fatigue=state.fatigue>=2?3:2;
    return {ok:true,overload:true};
  }
  return {ok:false,overload:false};
}

export function castSpell(state,spell,{success=true,remote=false,offensive=false}={}){
  const activation=spell.activation??"Acción";
  if(remote && spell.remoteOriginCompatible===false) return reject(state,"remote-origin");
  if(!canSpendEconomy(state,activation)) return reject(state,"economy");
  const snapshotMana=state.mana;
  const snapshotFatigue=state.fatigue;
  const payment=paySpell(state,spell.mana??spell.manaCost??0);
  if(!payment.ok){
    state.mana=snapshotMana;
    state.fatigue=snapshotFatigue;
    return reject(state,"mana");
  }
  spendEconomy(state,activation);

  if(payment.overload && !success){
    // La Sobrecarga fallida ya pagó Maná y Fatiga, pero no crea efecto.
    return accept(state,"cast-failed-overload",{spell:spell.name,overload:true});
  }
  if(!success) return accept(state,"cast-failed",{spell:spell.name,overload:payment.overload});

  if(spell.sustained) applySustain(state,spell.name);
  if(spell.name==="Invisibilidad") state.invisible=true;
  if(spell.name==="Matriz Vital"){
    state.matrixPulses=state.health>0?3:0;
    if(state.matrixPulses===0){
      state.sustained=state.sustained.filter((id)=>id!=="Matriz Vital");
      clearSustainSideEffects(state);
    }
  }
  if(offensive && state.invisible){
    state.sustained=state.sustained.filter((id)=>id!=="Invisibilidad");
    state.invisible=false;
  }
  return accept(state,"cast",{spell:spell.name,overload:payment.overload});
}

export function matrixPulse(state){
  if(state.matrixPulses<=0 || !state.sustained.includes("Matriz Vital")) return reject(state,"no-matrix");
  if(state.health<=0){
    state.matrixPulses=0;
    state.sustained=state.sustained.filter((id)=>id!=="Matriz Vital");
    clearSustainSideEffects(state);
    return reject(state,"zero-health");
  }
  const before=state.health;
  state.health=clamp(state.health+2,0,state.healthMax);
  state.matrixPulses-=1;
  if(state.matrixPulses<=0){
    state.sustained=state.sustained.filter((id)=>id!=="Matriz Vital");
    clearSustainSideEffects(state);
  }
  return accept(state,"matrix-pulse",{amount:state.health-before});
}

export function transferVital(state,amount){
  const n=Math.min(3,Math.max(0,Math.floor(Number(amount)||0)));
  if(n<=0 || state.health-n<1 || state.allyHealth>=state.allyHealthMax) return reject(state,"transfer");
  if(!canSpendEconomy(state,"Acción") || state.mana<4) return reject(state,"transfer-cost");
  const effective=Math.min(n,state.allyHealthMax-state.allyHealth);
  if(effective<=0) return reject(state,"transfer-cap");
  state.mana-=4;
  spendEconomy(state,"Acción");
  state.health-=effective;
  state.allyHealth+=effective;
  return accept(state,"transfer",{amount:effective});
}

export function usePotion(state,family){
  if(!canSpendEconomy(state,"Acción")) return reject(state,"action");
  const key=family==="arcana"?"arcane":"restorative";
  if((state.doses[key]??0)<=0) return reject(state,"dose");
  if(state.saturatedFamilies.includes(family)) return reject(state,"saturation");

  spendEconomy(state,"Acción");
  state.doses[key]-=1;
  state.saturatedFamilies=[...new Set([...state.saturatedFamilies,family])];
  if(family==="arcana") state.mana=clamp(state.mana+3,0,state.manaMax);
  else ordinaryHeal(state,4);
  return accept(state,"potion",{family});
}

export function breather(state){
  state.saturatedFamilies=[];
  return accept(state,"breather");
}

export function rest(state){
  if(!state.recovery.healthUsed){
    ordinaryHeal(state,5);
    state.recovery.healthUsed=true;
  }
  if(!state.recovery.manaUsed){
    state.mana=clamp(state.mana+4,0,state.manaMax);
    state.recovery.manaUsed=true;
  }
  return accept(state,"rest");
}

export function fullRest(state){
  state.health=state.healthMax;
  state.mana=state.manaMax;
  state.fatigue=0;
  state.incapacitated=false;
  state.recovery.healthUsed=false;
  state.recovery.manaUsed=false;
  return accept(state,"full-rest");
}

export function useDevice(state,{activation="Acción",consumption=2,flow=2,kinetic=false}={}){
  if(!canSpendEconomy(state,activation)) return reject(state,"device-economy");
  const cost=Math.max(0,Number(consumption)||0);
  if(cost>flow || cost>state.deviceEnergy) return reject(state,"device-energy");
  spendEconomy(state,activation);
  state.deviceEnergy-=cost;
  if(kinetic) state.kineticDefense=true;
  return accept(state,"device");
}

export function rechargeDeviceForFixture(state,amount){
  // Sólo para preparar semillas de prueba; no es una acción jugable.
  state.deviceEnergy=clamp(state.deviceEnergy+Math.max(0,amount),0,state.deviceEnergyMax);
}

export function assertFuzzInvariants(state){
  const issues=[];
  if(state.health<0 || state.health>state.healthMax) issues.push("health");
  if(state.allyHealth<0 || state.allyHealth>state.allyHealthMax) issues.push("ally-health");
  if(state.mana<0 || state.mana>state.manaMax) issues.push("mana");
  if(state.deviceEnergy<0 || state.deviceEnergy>state.deviceEnergyMax) issues.push("device-energy");
  if(!Number.isInteger(state.fatigue) || state.fatigue<0 || state.fatigue>3) issues.push("fatigue");
  if(!Number.isInteger(state.trauma) || state.trauma<0 || state.trauma>3) issues.push("trauma");
  if(state.movementSpent<0 || state.movementSpent>state.movement) issues.push("movement");
  if(new Set(state.sustained).size!==state.sustained.length) issues.push("sustain-duplicate");
  if(state.sustained.length>(state.doubleSustain?2:1)) issues.push("sustain-limit");
  if(new Set(state.saturatedFamilies).size!==state.saturatedFamilies.length) issues.push("saturation-duplicate");
  if(state.health===0 && !state.incapacitated) issues.push("zero-not-incapacitated");
  if(state.matrixPulses>0 && (state.health<=0 || !state.sustained.includes("Matriz Vital"))) issues.push("matrix-invalid");
  if(state.summons.minor!==state.sustained.includes("Llamada Menor")) issues.push("minor-summon");
  if(state.summons.major!==state.sustained.includes("Llamada Mayor")) issues.push("major-summon");
  if(state.invisible!==state.sustained.includes("Invisibilidad")) issues.push("invisibility-state");
  return issues;
}

export function snapshot(state){
  return clone(state);
}
