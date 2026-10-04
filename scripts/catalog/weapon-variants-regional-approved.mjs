import { STARTER_CONTENT } from "../content.mjs";

export const APPROVED_REGIONAL_VARIANTS = Object.freeze({
  "Hoja de Auraval":{ profile:"Espada larga", region:"Valdoria" },
  "Sable del Camino Real":{ profile:"Sable", region:"Valdoria" },
  "Lanza de Guardia Valdoriana":{ profile:"Lanza", region:"Valdoria" },
  "Espada de Vigilia":{ profile:"Espada larga", region:"Valdoria" },

  "Hacha del Espinazo":{ profile:"Hacha", region:"Kharum" },
  "Martillo de Kar-Dur":{ profile:"Martillo de guerra", region:"Kharum" },
  "Pico de Forjador Kharum":{ profile:"Martillo de guerra", region:"Kharum" },
  "Alabarda del Espinazo":{ profile:"Alabarda", region:"Kharum" },
  "Gran martillo de Forja":{ profile:"Gran martillo", region:"Kharum" },
  "Ballesta de Kar-Dur":{ profile:"Ballesta", region:"Kharum" },

  "Hacha de abordaje de Bronce":{ profile:"Hacha", region:"Liga de Bronce" },
  "Sable de Cobravia":{ profile:"Sable", region:"Liga de Bronce" },
  "Pistola de Cobravia":{ profile:"Pistola temprana", region:"Liga de Bronce" },
  "Carabina de Bronce":{ profile:"Rifle temprano", region:"Liga de Bronce" },
  "Rifle de Taller":{ profile:"Rifle temprano", region:"Liga de Bronce" },

  "Arco de Verdelinde":{ profile:"Arco largo", region:"Erelia" },
  "Hoja de bosque de Erelia":{ profile:"Espada corta", region:"Erelia" },
  "Lanza del Bosque Profundo":{ profile:"Lanza", region:"Erelia" },
  "Hacha de guardabosques":{ profile:"Hacha", region:"Erelia" },

  "Arco de los Altos Valles":{ profile:"Arco largo", region:"Lysendra" },
  "Espada académica de Lys":{ profile:"Espada larga", region:"Lysendra" },
  "Estoque de Lys":{ profile:"Sable", region:"Lysendra" },
  "Bastón de custodio de Lys":{ profile:"Maza", region:"Lysendra" },

  "Sable solar de Heliara":{ profile:"Sable", region:"Solenar" },
  "Lanza del Sol":{ profile:"Lanza", region:"Solenar" },
  "Alfanje de las Mesetas":{ profile:"Espada larga", region:"Solenar" },
  "Arco del Desierto de Vidrio":{ profile:"Arco corto", region:"Solenar" }
});

const canonicalByName = new Map(STARTER_CONTENT.weapon.map((entry)=>[entry.name,entry]));

export function approvedRegionalVariantSources() {
  return Object.entries(APPROVED_REGIONAL_VARIANTS).map(([name,{profile:profileName,region}])=>{
    const profile=canonicalByName.get(profileName);
    if(!profile) throw new Error("Perfil canónico inexistente para variante regional: "+name+" -> "+profileName);
    return {
      name,
      type:"weapon",
      system:{
        ...structuredClone(profile.system),
        description:
          "Variante regional de "+region+". Usa exactamente el perfil mecánico canónico de "+profileName+
          ". Su procedencia aporta identidad, disponibilidad narrativa y tradición de fabricación, no un bono numérico universal.",
        tags:["catalog-expanded","profile-variant","regional","cat-07"],
        catalogProfile:profileName,
        catalogRegion:region
      }
    };
  });
}
