import { STARTER_CONTENT } from "../content.mjs";

export const APPROVED_ARMOR_VARIANTS = Object.freeze({
  "Gambesón":{profile:"Armadura ligera"},
  "Aketón":{profile:"Armadura ligera"},
  "Jubón acolchado":{profile:"Armadura ligera"},
  "Chaqueta acolchada":{profile:"Armadura ligera"},
  "Cota de cuero":{profile:"Armadura ligera"},
  "Chaleco de cuero":{profile:"Armadura ligera"},
  "Cuero de cazador":{profile:"Armadura ligera"},
  "Cuero de explorador":{profile:"Armadura ligera"},
  "Casaca de guardia ligera":{profile:"Armadura ligera"},
  "Peto de cuero ligero":{profile:"Armadura ligera"},
  "Armadura de viajero":{profile:"Armadura ligera"},
  "Armadura de montañés":{profile:"Armadura ligera"},
  "Cuero de jinete":{profile:"Armadura ligera"},
  "Vestidura de campaña acolchada":{profile:"Armadura ligera"},
  "Chaqueta de escaramuzador":{profile:"Armadura ligera"},

  "Gambesón reforzado":{profile:"Armadura reforzada"},
  "Cuero hervido":{profile:"Armadura reforzada"},
  "Cota de cuero reforzada":{profile:"Armadura reforzada"},
  "Brigantina ligera":{profile:"Armadura reforzada"},
  "Jack de placas":{profile:"Armadura reforzada"},
  "Casaca claveteada":{profile:"Armadura reforzada"},
  "Coselete de láminas":{profile:"Armadura reforzada"},
  "Coraza de escamas ligera":{profile:"Armadura reforzada"},
  "Lamelar ligera":{profile:"Armadura reforzada"},
  "Chaqueta de anillas":{profile:"Armadura reforzada"},
  "Armadura de guardia":{profile:"Armadura reforzada"},
  "Coraza de frontera":{profile:"Armadura reforzada"},
  "Peto segmentado ligero":{profile:"Armadura reforzada"},
  "Casaca de combate reforzada":{profile:"Armadura reforzada"},
  "Armadura de mercenario":{profile:"Armadura reforzada"},

  "Cota de malla":{profile:"Malla"},
  "Camisa de malla":{profile:"Malla"},
  "Haubergeon":{profile:"Malla"},
  "Hauberk":{profile:"Malla"},
  "Loriga de malla":{profile:"Malla"},
  "Malla de caballería":{profile:"Malla"},
  "Malla de infantería":{profile:"Malla"},
  "Malla de guardia":{profile:"Malla"},
  "Malla de campaña":{profile:"Malla"},
  "Malla corta":{profile:"Malla"},
  "Malla con faldón":{profile:"Malla"},
  "Malla de viaje":{profile:"Malla"},

  "Brigantina pesada":{profile:"Armadura pesada"},
  "Lamelar pesada":{profile:"Armadura pesada"},
  "Coraza de escamas":{profile:"Armadura pesada"},
  "Malla con placas":{profile:"Armadura pesada"},
  "Coraza segmentada":{profile:"Armadura pesada"},
  "Armadura de placas parciales":{profile:"Armadura pesada"},
  "Armadura de caballería pesada":{profile:"Armadura pesada"},
  "Armadura de guardia pesada":{profile:"Armadura pesada"},
  "Coraza de guerra":{profile:"Armadura pesada"},
  "Arnés parcial":{profile:"Armadura pesada"},
  "Armadura de infantería pesada":{profile:"Armadura pesada"},
  "Armadura de frontera pesada":{profile:"Armadura pesada"},

  "Arnés completo":{profile:"Placas"},
  "Armadura de placas completa":{profile:"Placas"},
  "Placas de campaña":{profile:"Placas"},
  "Placas de caballería":{profile:"Placas"},
  "Placas de infantería":{profile:"Placas"},
  "Placas de guardia":{profile:"Placas"},
  "Arnés de guerra":{profile:"Placas"},
  "Arnés de campo":{profile:"Placas"},
  "Armadura articulada de placas":{profile:"Placas"},
  "Coraza de placas completa":{profile:"Placas"},
  "Placas de comandante":{profile:"Placas"},

  "Coselete de Auraval":{profile:"Armadura reforzada",region:"Valdoria"},
  "Malla de Guardia Valdoriana":{profile:"Malla",region:"Valdoria"},
  "Armadura de Vigilia":{profile:"Armadura pesada",region:"Valdoria"},
  "Placas del Camino Real":{profile:"Placas",region:"Valdoria"},

  "Gambesón de galería Kharum":{profile:"Armadura ligera",region:"Kharum"},
  "Brigantina de Kar-Dur":{profile:"Armadura reforzada",region:"Kharum"},
  "Malla del Espinazo":{profile:"Malla",region:"Kharum"},
  "Placas del Bastión Kharum":{profile:"Placas",region:"Kharum"},

  "Casaca portuaria de Cobravia":{profile:"Armadura ligera",region:"Liga de Bronce"},
  "Brigantina cobravia":{profile:"Armadura reforzada",region:"Liga de Bronce"},
  "Malla de muelle de Bronce":{profile:"Malla",region:"Liga de Bronce"},
  "Arnés de Taller de la Liga":{profile:"Armadura pesada",region:"Liga de Bronce"},

  "Cuero de Verdelinde":{profile:"Armadura ligera",region:"Erelia"},
  "Coraza forestal reforzada":{profile:"Armadura reforzada",region:"Erelia"},
  "Malla de guardabosques de Erelia":{profile:"Malla",region:"Erelia"},
  "Arnés de frontera Ereliana":{profile:"Armadura pesada",region:"Erelia"},

  "Jubón de campo de Lys":{profile:"Armadura ligera",region:"Lysendra"},
  "Coselete académico de Lys":{profile:"Armadura reforzada",region:"Lysendra"},
  "Malla de custodio de Lys":{profile:"Malla",region:"Lysendra"},
  "Placas de Custodia Lysendrina":{profile:"Placas",region:"Lysendra"},

  "Casaca de caravana solenaria":{profile:"Armadura ligera",region:"Solenar"},
  "Coraza de peregrino de Heliara":{profile:"Armadura reforzada",region:"Solenar"},
  "Malla del Sol":{profile:"Malla",region:"Solenar"},
  "Placas de Guardia de Heliara":{profile:"Placas",region:"Solenar"}
});

const canonicalByName=new Map(STARTER_CONTENT.armor.map((entry)=>[entry.name,entry]));

export function approvedArmorVariantSources(){
  return Object.entries(APPROVED_ARMOR_VARIANTS).map(([name,config])=>{
    const profile=canonicalByName.get(config.profile);
    if(!profile) throw new Error("Perfil canónico de armadura inexistente: "+name+" -> "+config.profile);
    const region=config.region ?? "general";
    return {
      name,
      type:"armor",
      system:{
        ...structuredClone(profile.system),
        description:
          (region==="general"
            ? "Variante de armadura."
            : "Variante regional de "+region+".")+
          " Usa exactamente el perfil mecánico canónico de "+config.profile+
          ". Su construcción, estilo o procedencia no modifican Protección, FUE mínima ni precio sin una regla expresa.",
        tags:["catalog-expanded","profile-variant","armor-catalog",...(region==="general"?[]:["regional"])],
        catalogProfile:config.profile,
        catalogRegion:region
      }
    };
  });
}
