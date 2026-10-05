import { STARTER_CONTENT } from "../content.mjs";

export const APPROVED_WEAPON_PROFILE_VARIANTS = Object.freeze({
  "Cuchillo de combate":"Daga",
  "Cuchillo de monte":"Daga",
  "Cuchillo de marinero":"Daga",
  "Puñal ancho":"Daga",
  "Daga curva":"Daga",
  "Daga de abordaje":"Daga",

  "Espada de caza":"Espada corta",
  "Gladio":"Espada corta",
  "Falcata corta":"Espada corta",
  "Kukri":"Espada corta",
  "Machete":"Espada corta",
  "Seax":"Espada corta",

  "Estoque corto":"Sable",
  "Rapier":"Sable",
  "Espadín":"Sable",
  "Espada de duelo":"Sable",

  "Garrote corto":"Espada corta",
  "Cachiporra":"Espada corta",
  "Porra reforzada":"Espada corta",
  "Martillo ligero":"Espada corta",
  "Tonfa reforzada":"Espada corta",
  "Bastón corto":"Espada corta"
});

const canonicalByName = new Map(STARTER_CONTENT.weapon.map((entry)=>[entry.name,entry]));

export function approvedWeaponVariantSources() {
  return Object.entries(APPROVED_WEAPON_PROFILE_VARIANTS).map(([name,profileName])=>{
    const profile=canonicalByName.get(profileName);
    if(!profile) throw new Error("Perfil canónico inexistente para variante: "+name+" -> "+profileName);
    return {
      name,
      type:"weapon",
      system:{
        ...structuredClone(profile.system),
        description:
          "Variante de catálogo. Usa exactamente el perfil mecánico canónico de "+profileName+
          "; el nombre, forma y tradición no conceden modificadores adicionales.",
        tags:["catalog-expanded","profile-variant"],
        catalogProfile:profileName
      }
    };
  });
}
