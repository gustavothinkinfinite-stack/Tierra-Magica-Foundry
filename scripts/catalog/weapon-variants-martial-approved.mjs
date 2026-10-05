import { STARTER_CONTENT } from "../content.mjs";

export const APPROVED_MARTIAL_VARIANTS = Object.freeze({
  "Espada bastarda":"Espada larga",
  "Espada ancha":"Espada larga",
  "Espada de caballería":"Espada larga",
  "Espada de infantería":"Espada larga",
  "Espada de oficial":"Espada larga",
  "Espada de abordaje":"Espada larga",
  "Alfanje":"Espada larga",
  "Cimitarra":"Espada larga",
  "Shamshir":"Espada larga",
  "Kilij":"Espada larga",
  "Kopis":"Espada larga",
  "Falchion":"Espada larga",
  "Estoque":"Espada larga",
  "Rapiera militar":"Espada larga",
  "Montante corto":"Espada larga",

  "Hacha de batalla":"Hacha",
  "Hacha barbada":"Hacha",
  "Hacha de abordaje":"Hacha",
  "Hacha de jinete":"Hacha",
  "Hacha de infantería":"Hacha",
  "Francisca":"Hacha",

  "Maza de armas":"Maza",
  "Maza con aletas":"Maza",
  "Mangual":"Maza",
  "Mangual militar":"Maza",
  "Bastón de guerra":"Maza",
  "Bastón ferrado":"Maza",

  "Lucerna corta":"Martillo de guerra",
  "Martillo de caballería":"Martillo de guerra",
  "Pico de guerra":"Martillo de guerra",
  "Bec de corbin corto":"Martillo de guerra",
  "Martillo-pico":"Martillo de guerra",

  "Lanza corta":"Lanza",
  "Lanza de guerra":"Lanza",
  "Lanza de caballería":"Lanza",
  "Partisana":"Lanza",
  "Ranseur":"Lanza",
  "Tridente":"Lanza",
  "Horca militar":"Lanza",
  "Guja corta":"Lanza"
});

const canonicalByName = new Map(STARTER_CONTENT.weapon.map((entry)=>[entry.name,entry]));

export function approvedMartialVariantSources() {
  return Object.entries(APPROVED_MARTIAL_VARIANTS).map(([name,profileName])=>{
    const profile=canonicalByName.get(profileName);
    if(!profile) throw new Error("Perfil canónico inexistente para variante marcial: "+name+" -> "+profileName);
    return {
      name,
      type:"weapon",
      system:{
        ...structuredClone(profile.system),
        description:
          "Variante marcial de catálogo. Usa exactamente el perfil mecánico canónico de "+profileName+
          ". El nombre histórico, regional o funcional no concede modificadores adicionales.",
        tags:["catalog-expanded","profile-variant","cat-04"],
        catalogProfile:profileName
      }
    };
  });
}
