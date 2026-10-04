import { STARTER_CONTENT } from "../content.mjs";

export const APPROVED_HEAVY_VARIANTS = Object.freeze({
  "Zweihänder":"Mandoble",
  "Espadón":"Mandoble",
  "Montante":"Mandoble",
  "Claymore":"Mandoble",
  "Flamberge":"Mandoble",
  "Gran falchion":"Mandoble",
  "Gran machete de guerra":"Mandoble",

  "Hacha danesa":"Gran hacha",
  "Hacha de verdugo":"Gran hacha",
  "Hacha doble":"Gran hacha",
  "Hacha larga de guerra":"Gran hacha",

  "Martillo de asedio":"Gran martillo",
  "Gran maza":"Gran martillo",
  "Maza de dos manos":"Gran martillo",
  "Pico pesado":"Gran martillo",
  "Mayal de dos manos":"Gran martillo",
  "Cadena de guerra pesada":"Gran martillo",

  "Lucerna":"Alabarda",
  "Bec de corbin":"Alabarda",
  "Alabarda de guerra":"Alabarda",
  "Guja":"Alabarda",
  "Guja pesada":"Alabarda",
  "Bardiche":"Alabarda",
  "Voulge":"Alabarda",
  "Pollaxe":"Alabarda",
  "Martillo de asta":"Alabarda",
  "Lanza pesada":"Alabarda",
  "Pica":"Alabarda",
  "Pica larga":"Alabarda",
  "Tridente pesado":"Alabarda"
});

const canonicalByName = new Map(STARTER_CONTENT.weapon.map((entry)=>[entry.name,entry]));

export function approvedHeavyVariantSources() {
  return Object.entries(APPROVED_HEAVY_VARIANTS).map(([name,profileName])=>{
    const profile=canonicalByName.get(profileName);
    if(!profile) throw new Error("Perfil canónico inexistente para variante pesada: "+name+" -> "+profileName);
    return {
      name,
      type:"weapon",
      system:{
        ...structuredClone(profile.system),
        description:
          "Variante pesada de catálogo. Usa exactamente el perfil mecánico canónico de "+profileName+
          ". Su nombre o geometría no altera por sí solos Daño, Penetración, FUE mínima, Alcance ni economía de acciones.",
        tags:["catalog-expanded","profile-variant","cat-05"],
        catalogProfile:profileName
      }
    };
  });
}
