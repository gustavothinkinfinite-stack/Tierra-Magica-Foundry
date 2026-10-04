import { STARTER_CONTENT } from "../content.mjs";

export const WEAPON_CATALOG_VERSION = "1.0-draft";

const CANONICAL_SPECIALIZATION = Object.freeze({
  "Daga":"Cuchillos y dagas",
  "Espada corta":"Espadas ligeras",
  "Sable":"Espadas ligeras",
  "Espada larga":"Espadas",
  "Hacha":"Hachas",
  "Maza":"Mazas y martillos",
  "Martillo de guerra":"Mazas y martillos",
  "Lanza":"Lanzas",
  "Alabarda":"Armas de asta pesadas",
  "Mandoble":"Grandes hojas",
  "Gran hacha":"Grandes hojas",
  "Gran martillo":"Grandes contundentes",
  "Arco corto":"Arcos",
  "Arco largo":"Arcos",
  "Ballesta":"Ballestas",
  "Ballesta pesada":"Ballestas",
  "Pistola temprana":"Armas de fuego cortas",
  "Rifle temprano":"Armas de fuego largas",
  "Pistola repetidora":"Armas de fuego cortas",
  "Rifle repetidor":"Armas de fuego largas"
});

const proposalGroups = [
  {
    family:"Cuchillos y dagas", skillSuggestion:"lightWeapons", specializationSuggestion:"Cuchillos y dagas",
    referenceProfile:"Daga", technology:"mundane", region:"general",
    names:["Cuchillo de combate","Cuchillo de monte","Cuchillo de marinero","Estilete","Puñal ancho","Daga de parada","Daga de misericordia","Daga curva","Daga de abordaje","Garra de combate","Katar"]
  },
  {
    family:"Armas ligeras arrojadizas", skillSuggestion:"lightWeapons", specializationSuggestion:"Armas ligeras arrojadizas",
    referenceProfile:"Daga", technology:"mundane", region:"general",
    names:["Daga de lanzamiento","Kunai de campaña","Cuchillo arrojadizo","Hacha de mano","Tomahawk","Chakram","Dardo de guerra"]
  },
  {
    family:"Espadas ligeras", skillSuggestion:"lightWeapons", specializationSuggestion:"Espadas ligeras",
    referenceProfile:"Espada corta", technology:"mundane", region:"general",
    names:["Espada de caza","Gladio","Falcata corta","Kukri","Machete","Seax","Estoque corto","Rapier","Espadín","Espada de duelo"]
  },
  {
    family:"Ligeras contundentes y flexibles", skillSuggestion:"lightWeapons", specializationSuggestion:"Cuchillos y dagas",
    referenceProfile:"Espada corta", technology:"mundane", region:"general",
    reviewFlags:["specialization"],
    names:["Hachuela","Garrote corto","Cachiporra","Porra reforzada","Martillo ligero","Pico de combate corto","Hoz de guerra","Tonfa reforzada","Bastón corto","Cadena corta de combate","Látigo","Látigo reforzado"]
  },

  {
    family:"Espadas marciales", skillSuggestion:"martialWeapons", specializationSuggestion:"Espadas",
    referenceProfile:"Espada larga", technology:"mundane", region:"general",
    names:["Espada bastarda","Espada ancha","Espada de caballería","Espada de infantería","Espada de oficial","Espada de abordaje","Alfanje","Cimitarra","Shamshir","Kilij","Kopis","Falchion","Estoque","Rapiera militar","Montante corto"]
  },
  {
    family:"Hachas marciales", skillSuggestion:"martialWeapons", specializationSuggestion:"Hachas",
    referenceProfile:"Hacha", technology:"mundane", region:"general",
    names:["Hacha de batalla","Hacha barbada","Hacha de abordaje","Hacha de jinete","Hacha de infantería","Francisca"]
  },
  {
    family:"Mazas y martillos marciales", skillSuggestion:"martialWeapons", specializationSuggestion:"Mazas y martillos",
    referenceProfile:"Martillo de guerra", technology:"mundane", region:"general",
    names:["Maza de armas","Maza con aletas","Lucerna corta","Martillo de caballería","Pico de guerra","Bec de corbin corto","Mangual","Mangual militar","Bastón de guerra","Bastón ferrado","Martillo-pico"]
  },
  {
    family:"Lanzas marciales", skillSuggestion:"martialWeapons", specializationSuggestion:"Lanzas",
    referenceProfile:"Lanza", technology:"mundane", region:"general",
    names:["Lanza corta","Lanza de guerra","Lanza de caballería","Partisana","Ranseur","Tridente","Horca militar","Guja corta"]
  },

  {
    family:"Grandes hojas", skillSuggestion:"heavyWeapons", specializationSuggestion:"Grandes hojas",
    referenceProfile:"Mandoble", technology:"mundane", region:"general",
    names:["Zweihänder","Espadón","Montante","Claymore","Flamberge","Gran falchion","Gran machete de guerra","Hacha danesa","Hacha de verdugo","Hacha doble","Hacha larga de guerra"]
  },
  {
    family:"Grandes contundentes", skillSuggestion:"heavyWeapons", specializationSuggestion:"Grandes contundentes",
    referenceProfile:"Gran martillo", technology:"mundane", region:"general",
    names:["Martillo de asedio","Gran maza","Maza de dos manos","Pico pesado","Mayal de dos manos","Cadena de guerra pesada"]
  },
  {
    family:"Armas de asta pesadas", skillSuggestion:"heavyWeapons", specializationSuggestion:"Armas de asta pesadas",
    referenceProfile:"Alabarda", technology:"mundane", region:"general",
    names:["Lucerna","Bec de corbin","Alabarda de guerra","Guja","Guja pesada","Bardiche","Voulge","Pollaxe","Martillo de asta","Lanza pesada","Pica","Pica larga","Tridente pesado"]
  },

  {
    family:"Arcos", skillSuggestion:"rangedWeapons", specializationSuggestion:"Arcos",
    referenceProfile:"Arco corto", technology:"mundane", region:"general",
    names:["Arco de caza","Arco compuesto","Arco recurvo","Arco de guerra","Arco corto montado","Arco naval","Honda","Honda de guerra","Fustíbalo"]
  },
  {
    family:"Arcos largos", skillSuggestion:"rangedWeapons", specializationSuggestion:"Arcos",
    referenceProfile:"Arco largo", technology:"mundane", region:"general",
    names:["Arco largo de guerra","Arco de precisión"]
  },
  {
    family:"Proyectiles arrojados", skillSuggestion:"rangedWeapons", specializationSuggestion:"Arcos",
    referenceProfile:"Arco corto", technology:"mundane", region:"general",
    reviewFlags:["skill","specialization","referenceProfile"],
    names:["Jabalina","Jabalina pesada","Azagaya"]
  },
  {
    family:"Ballestas", skillSuggestion:"rangedWeapons", specializationSuggestion:"Ballestas",
    referenceProfile:"Ballesta", technology:"mundane", region:"general",
    names:["Ballesta de mano","Ballesta ligera","Ballesta de caza","Ballesta militar","Ballesta de estribo","Ballesta de palanca","Ballesta de abordaje","Ballesta de precisión"]
  },
  {
    family:"Ballestas pesadas y repetidoras", skillSuggestion:"rangedWeapons", specializationSuggestion:"Ballestas",
    referenceProfile:"Ballesta pesada", technology:"mundane", region:"general",
    names:["Ballesta de torno","Arbalesta","Ballesta de asedio portátil","Ballesta repetidora","Ballesta doble"]
  },

  {
    family:"Armas de fuego cortas", skillSuggestion:"rangedWeapons", specializationSuggestion:"Armas de fuego cortas",
    referenceProfile:"Pistola temprana", technology:"firearm", region:"general",
    names:["Pistola de chispa","Pistola de rueda","Pistola de duelo","Pistola militar","Pistola de caballería","Pistola de abordaje","Pistola de bolsillo","Pistola de dos cañones","Pistola de cuatro cañones"]
  },
  {
    family:"Armas de fuego cortas repetidoras", skillSuggestion:"rangedWeapons", specializationSuggestion:"Armas de fuego cortas",
    referenceProfile:"Pistola repetidora", technology:"firearm", region:"general",
    names:["Pistola pepperbox","Revólver temprano","Revólver pesado","Revólver de oficial","Pistola de precisión"]
  },
  {
    family:"Pistolas arcano-industriales", skillSuggestion:"rangedWeapons", specializationSuggestion:"Armas de fuego cortas",
    referenceProfile:"Pistola repetidora", technology:"arcano-industrial", region:"general",
    implementation:"review-device-boundary",
    names:["Pistola arcano-industrial","Pistola de cristal","Pistola de descarga"]
  },
  {
    family:"Armas de fuego largas tempranas", skillSuggestion:"rangedWeapons", specializationSuggestion:"Armas de fuego largas",
    referenceProfile:"Rifle temprano", technology:"firearm", region:"general",
    names:["Mosquete","Arcabuz","Carabina","Carabina de caballería","Fusil de infantería","Rifle de caza","Rifle largo","Rifle de precisión","Rifle pesado","Rifle de dos cañones","Trabuco","Trabuco de abordaje","Escopeta temprana","Escopeta de dos cañones"]
  },
  {
    family:"Armas de fuego largas repetidoras", skillSuggestion:"rangedWeapons", specializationSuggestion:"Armas de fuego largas",
    referenceProfile:"Rifle repetidor", technology:"firearm", region:"general",
    names:["Rifle de palanca","Rifle de cerrojo temprano","Carabina repetidora","Rifle repetidor pesado"]
  },
  {
    family:"Rifles arcano-industriales", skillSuggestion:"rangedWeapons", specializationSuggestion:"Armas de fuego largas",
    referenceProfile:"Rifle repetidor", technology:"arcano-industrial", region:"general",
    implementation:"review-device-boundary",
    names:["Rifle arcano-industrial","Fusil de cristal"]
  },

  {
    family:"Armas valdorianas", skillSuggestion:"martialWeapons", specializationSuggestion:"Espadas",
    referenceProfile:"Espada larga", technology:"mundane", region:"Valdoria",
    reviewFlags:["per-item-profile"],
    names:["Hoja de Auraval","Sable del Camino Real","Lanza de Guardia Valdoriana","Espada de Vigilia"]
  },
  {
    family:"Armas kharumitas", skillSuggestion:"heavyWeapons", specializationSuggestion:"Armas de asta pesadas",
    referenceProfile:"Alabarda", technology:"mundane", region:"Kharum",
    reviewFlags:["per-item-profile"],
    names:["Hacha del Espinazo","Martillo de Kar-Dur","Pico de Forjador Kharum","Alabarda del Espinazo","Gran martillo de Forja","Ballesta de Kar-Dur"]
  },
  {
    family:"Armas de la Liga de Bronce", skillSuggestion:"rangedWeapons", specializationSuggestion:"Armas de fuego largas",
    referenceProfile:"Rifle temprano", technology:"mixed", region:"Liga de Bronce",
    reviewFlags:["per-item-profile"],
    names:["Hacha de abordaje de Bronce","Sable de Cobravia","Pistola de Cobravia","Carabina de Bronce","Rifle de Taller","Trabuco portuario"]
  },
  {
    family:"Armas erelianas", skillSuggestion:"martialWeapons", specializationSuggestion:"Lanzas",
    referenceProfile:"Lanza", technology:"mundane", region:"Erelia",
    reviewFlags:["per-item-profile"],
    names:["Arco de Verdelinde","Hoja de bosque de Erelia","Lanza del Bosque Profundo","Hacha de guardabosques"]
  },
  {
    family:"Armas lysendrinas", skillSuggestion:"martialWeapons", specializationSuggestion:"Espadas",
    referenceProfile:"Espada larga", technology:"mundane", region:"Lysendra",
    reviewFlags:["per-item-profile"],
    names:["Arco de los Altos Valles","Espada académica de Lys","Estoque de Lys","Bastón de custodio de Lys"]
  },
  {
    family:"Armas solenarias", skillSuggestion:"martialWeapons", specializationSuggestion:"Espadas",
    referenceProfile:"Sable", technology:"mundane", region:"Solenar",
    reviewFlags:["per-item-profile"],
    names:["Sable solar de Heliara","Lanza del Sol","Alfanje de las Mesetas","Arco del Desierto de Vidrio"]
  },
  {
    family:"Armas orientales de vidrio", skillSuggestion:"lightWeapons", specializationSuggestion:"Cuchillos y dagas",
    referenceProfile:"Daga", technology:"special-material", region:"Desierto de Vidrio",
    reviewFlags:["per-item-profile","material-profile"],
    names:["Cuchillo de Vidrio","Lanza de cristal"]
  },

  {
    family:"Armas de filo arcano-industriales", skillSuggestion:"martialWeapons", specializationSuggestion:"Espadas",
    referenceProfile:"Espada larga", technology:"arcano-industrial", region:"general",
    implementation:"review-device-boundary",
    reviewFlags:["energy-model"],
    names:["Hoja resonante","Espada de acumulador","Sable de descarga","Hoja de cristal","Estoque de cristal","Hacha de impulso"]
  },
  {
    family:"Armas de impacto arcano-industriales", skillSuggestion:"martialWeapons", specializationSuggestion:"Mazas y martillos",
    referenceProfile:"Martillo de guerra", technology:"arcano-industrial", region:"general",
    implementation:"review-device-boundary",
    reviewFlags:["energy-model"],
    names:["Martillo cinético","Martillo resonante"]
  },
  {
    family:"Armas de asta arcano-industriales", skillSuggestion:"heavyWeapons", specializationSuggestion:"Armas de asta pesadas",
    referenceProfile:"Alabarda", technology:"arcano-industrial", region:"general",
    implementation:"review-device-boundary",
    reviewFlags:["energy-model"],
    names:["Lanza conductora","Alabarda conductora"]
  },
  {
    family:"Armas cortas arcano-industriales", skillSuggestion:"rangedWeapons", specializationSuggestion:"Armas de fuego cortas",
    referenceProfile:"Pistola repetidora", technology:"arcano-industrial", region:"general",
    implementation:"review-device-boundary",
    reviewFlags:["energy-model"],
    names:["Pistola de acumulador"]
  },
  {
    family:"Armas largas arcano-industriales", skillSuggestion:"rangedWeapons", specializationSuggestion:"Armas de fuego largas",
    referenceProfile:"Rifle repetidor", technology:"arcano-industrial", region:"general",
    implementation:"review-device-boundary",
    reviewFlags:["energy-model"],
    names:["Carabina de acumulador","Rifle de resonancia","Rifle de cristal","Fusil de descarga","Proyector cinético","Lanzador de arpones mecánico","Ballesta asistida","Ballesta de acumulador","Cañón portátil experimental"]
  }
];

function canonicalEntries() {
  return STARTER_CONTENT.weapon.map((entry)=>({
    name:entry.name,
    status:"canonical",
    type:"weapon",
    family:"Catálogo canónico",
    skillSuggestion:entry.system.skill,
    specializationSuggestion:CANONICAL_SPECIALIZATION[entry.name] ?? "",
    referenceProfile:entry.name,
    technology:entry.name.includes("Pistola") || entry.name.includes("Rifle") ? "firearm" : "mundane",
    region:"general",
    availability:entry.system.availability ?? "common",
    implementation:"runtime",
    reviewFlags:[],
    mechanics:{
      attackAttribute:entry.system.attackAttribute ?? "",
      damageAttribute:entry.system.damageAttribute ?? "",
      damage:entry.system.damage,
      penetration:entry.system.penetration,
      strengthMin:entry.system.strengthMin ?? null,
      rangeOptimal:entry.system.rangeOptimal ?? 0,
      reload:entry.system.reload ?? 0,
      power:entry.system.power ?? 0,
      priceCopper:entry.system.priceCopper,
      properties:entry.system.properties ?? ""
    }
  }));
}

function proposedEntries() {
  return proposalGroups.flatMap((group)=>group.names.map((name)=>({
    name,
    status:"proposal",
    type:"weapon",
    family:group.family,
    skillSuggestion:group.skillSuggestion,
    specializationSuggestion:group.specializationSuggestion,
    referenceProfile:group.referenceProfile,
    technology:group.technology,
    region:group.region,
    availability:group.availability ?? "review",
    implementation:group.implementation ?? "profile-variant",
    reviewFlags:[...(group.reviewFlags ?? [])],
    mechanics:null
  })));
}

export function weaponCatalogMaster() {
  return [...canonicalEntries(), ...proposedEntries()];
}

export const WEAPON_CATALOG_COUNTS = Object.freeze({
  canonical: STARTER_CONTENT.weapon.length,
  proposed: proposalGroups.reduce((sum,group)=>sum+group.names.length,0),
  total: STARTER_CONTENT.weapon.length + proposalGroups.reduce((sum,group)=>sum+group.names.length,0)
});

export const WEAPON_PROPOSAL_GROUPS = Object.freeze(
  proposalGroups.map((group)=>Object.freeze({...group,names:Object.freeze([...group.names])}))
);
