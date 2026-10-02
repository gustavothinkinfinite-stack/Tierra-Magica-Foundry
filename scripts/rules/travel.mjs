import { classifyResult } from "../rules.mjs";

export const TRAVEL_BASE_KM_PER_DAY = Object.freeze({
  foot:24,
  horse:40,
  wagon:24
});

export const TRAVEL_TERRAIN_MULTIPLIER = Object.freeze({
  road:1,
  trail:0.75,
  rough:0.5,
  severe:0.25
});

export const TRAVEL_PACE_MULTIPLIER = Object.freeze({
  cautious:0.75,
  normal:1,
  fast:1.25
});

export const TRAVEL_TERRAIN_DF = Object.freeze({
  road:null,
  trail:12,
  rough:14,
  severe:17
});

export const FORAGE_DF = Object.freeze({
  abundant:10,
  ordinary:13,
  scarce:16,
  hostile:19
});

const finite=(value,fallback=0)=>{
  const parsed=Number(value);
  return Number.isFinite(parsed)?parsed:fallback;
};

export function dailyTravelDistanceKm({
  mode="foot",
  terrain="road",
  pace="normal",
  weatherSteps=0
}={}){
  const base=TRAVEL_BASE_KM_PER_DAY[mode];
  if(!base) throw new RangeError("Modo de viaje desconocido.");

  const terrainKeys=["road","trail","rough","severe"];
  const terrainIndex=terrainKeys.indexOf(terrain);
  if(terrainIndex<0) throw new RangeError("Terreno de viaje desconocido.");

  const weather=Math.max(0,Math.min(3,Math.floor(finite(weatherSteps))));
  const effectiveTerrain=terrainKeys[Math.min(terrainKeys.length-1,terrainIndex+weather)];
  const terrainMultiplier=TRAVEL_TERRAIN_MULTIPLIER[effectiveTerrain];

  const paceMultiplier=TRAVEL_PACE_MULTIPLIER[pace];
  if(!paceMultiplier) throw new RangeError("Ritmo de viaje desconocido.");

  const passable=!(mode==="wagon" && effectiveTerrain==="severe");
  return {
    mode,
    terrain,
    effectiveTerrain,
    pace,
    passable,
    baseKm:base,
    km:passable ? base*terrainMultiplier*paceMultiplier : 0
  };
}

export function travelCheckDifficulty({terrain="road",weatherSteps=0,magicalOrExtreme=0}={}){
  const terrainKeys=["road","trail","rough","severe"];
  const idx=terrainKeys.indexOf(terrain);
  if(idx<0) throw new RangeError("Terreno de viaje desconocido.");

  const weather=Math.max(0,Math.min(3,Math.floor(finite(weatherSteps))));
  const effectiveTerrain=terrainKeys[Math.min(terrainKeys.length-1,idx+weather)];
  const base=TRAVEL_TERRAIN_DF[effectiveTerrain];

  if(base===null && finite(magicalOrExtreme)<=0) return null;
  return Math.max(10,(base ?? 10)+Math.max(0,Math.floor(finite(magicalOrExtreme))));
}

export function resolveTravelCheck(total,difficulty){
  if(difficulty===null || difficulty===undefined){
    return {required:false,success:true,degree:"Rutina",margin:null};
  }
  const result=classifyResult(finite(total,Number.NaN),finite(difficulty,Number.NaN));
  return {required:true,...result};
}

export function forcedMarchDifficulty(extraBlocks=1){
  const blocks=Math.max(1,Math.floor(finite(extraBlocks,1)));
  return 14+2*(blocks-1);
}

export function forcedMarchExtraKm(standardDayKm,extraBlocks=1){
  const km=Math.max(0,finite(standardDayKm));
  const blocks=Math.max(0,Math.floor(finite(extraBlocks)));
  return km*0.25*blocks;
}

export function forageDifficulty(abundance="ordinary"){
  const df=FORAGE_DF[abundance];
  if(!df) throw new RangeError("Abundancia desconocida.");
  return df;
}

export function forageRations(total,difficulty){
  const result=classifyResult(finite(total,Number.NaN),finite(difficulty,Number.NaN));
  if(!result.success) return {...result,rations:0};
  const rations=result.degree==="Dominante"?4:result.degree==="Claro"?2:1;
  return {...result,rations};
}
