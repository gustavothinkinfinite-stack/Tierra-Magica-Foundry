export const PENDING_WEAPON_BLOCKERS = Object.freeze({
  "thrown-routing": Object.freeze([
    "Daga de lanzamiento",
    "Kunai de campaña",
    "Cuchillo arrojadizo",
    "Hacha de mano",
    "Tomahawk",
    "Chakram",
    "Dardo de guerra"
  ]),
  "flexible-control": Object.freeze([
    "Cadena corta de combate",
    "Látigo",
    "Látigo reforzado"
  ]),
  "multi-shot-or-spread": Object.freeze([
    "Ballesta repetidora",
    "Ballesta doble",
    "Pistola de dos cañones",
    "Pistola de cuatro cañones",
    "Rifle de dos cañones",
    "Trabuco",
    "Trabuco de abordaje",
    "Escopeta temprana",
    "Escopeta de dos cañones",
    "Trabuco portuario"
  ]),
  "special-material": Object.freeze([
    "Cuchillo de Vidrio",
    "Lanza de cristal"
  ]),
  "craft-device-boundary": Object.freeze([
    "Pistola arcano-industrial",
    "Pistola de cristal",
    "Pistola de descarga",
    "Rifle arcano-industrial",
    "Fusil de cristal",
    "Hoja resonante",
    "Espada de acumulador",
    "Sable de descarga",
    "Hoja de cristal",
    "Estoque de cristal",
    "Hacha de impulso",
    "Martillo cinético",
    "Martillo resonante",
    "Lanza conductora",
    "Alabarda conductora",
    "Pistola de acumulador",
    "Carabina de acumulador",
    "Rifle de resonancia",
    "Rifle de cristal",
    "Fusil de descarga",
    "Proyector cinético",
    "Lanzador de arpones mecánico",
    "Ballesta asistida",
    "Ballesta de acumulador",
    "Cañón portátil experimental"
  ])
});

export const PENDING_WEAPON_DEPENDENCIES = Object.freeze({
  "thrown-routing":{
    owner:"combat",
    dependency:"Cerrar un modo de ataque a distancia independiente de system.skill para que Armas Ligeras arrojadizas no activen Parada como si fueran cuerpo a cuerpo.",
    conflictsWithCraft13:true
  },
  "flexible-control":{
    owner:"combat",
    dependency:"Definir si las armas flexibles poseen Alcance, Enganche, Desarmar u otra propiedad expresa sin crear control gratuito.",
    conflictsWithCraft13:false
  },
  "multi-shot-or-spread":{
    owner:"combat",
    dependency:"Definir varios cañones, repetición física, dispersión/perdigones y sus costes sin conceder ataques adicionales implícitos.",
    conflictsWithCraft13:false
  },
  "special-material":{
    owner:"crafting",
    dependency:"Cerrar el efecto del vidrio/cristal especial sobre precio, fabricación, reparación y propiedades antes de convertirlo en estadística de arma.",
    conflictsWithCraft13:true
  },
  "craft-device-boundary":{
    owner:"crafting",
    dependency:"Resolver la frontera Weapon/Device, Energía, Caudal, Estabilidad, mantenimiento y fabricación arcano-industrial con CRAFT-13.",
    conflictsWithCraft13:true
  }
});

const blockerByName = new Map(
  Object.entries(PENDING_WEAPON_BLOCKERS)
    .flatMap(([blocker,names])=>names.map((name)=>[name,blocker]))
);

export function pendingWeaponBlocker(name) {
  return blockerByName.get(name) ?? "";
}

export function pendingWeaponCatalog() {
  return [...blockerByName.entries()].map(([name,blocker])=>({
    name,
    blocker,
    ...PENDING_WEAPON_DEPENDENCIES[blocker]
  }));
}

export const PENDING_WEAPON_COUNTS = Object.freeze(
  Object.fromEntries([
    ...Object.entries(PENDING_WEAPON_BLOCKERS).map(([key,names])=>[key,names.length]),
    ["total",blockerByName.size]
  ])
);
