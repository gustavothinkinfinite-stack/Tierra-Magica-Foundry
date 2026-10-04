import { STARTER_CONTENT } from "../content.mjs";

export const APPROVED_SHIELD_VARIANTS = Object.freeze({
  "Rodela pequeña":{profile:"Broquel"},
  "Broquel de duelo":{profile:"Broquel"},
  "Broquel de infantería":{profile:"Broquel"},
  "Broquel redondo":{profile:"Broquel"},
  "Broquel de jinete":{profile:"Broquel"},
  "Broquel de abordaje":{profile:"Broquel"},
  "Escudo de antebrazo":{profile:"Broquel"},
  "Broquel con umbo":{profile:"Broquel"},
  "Broquel de guardia":{profile:"Broquel"},
  "Broquel de Auraval":{profile:"Broquel",region:"Valdoria"},
  "Broquel de Kar-Dur":{profile:"Broquel",region:"Kharum"},
  "Broquel de Cobravia":{profile:"Broquel",region:"Liga de Bronce"},
  "Broquel de Verdelinde":{profile:"Broquel",region:"Erelia"},
  "Broquel académico de Lys":{profile:"Broquel",region:"Lysendra"},
  "Broquel solar de Heliara":{profile:"Broquel",region:"Solenar"},

  "Escudo redondo":{profile:"Escudo estándar"},
  "Escudo cometa":{profile:"Escudo estándar"},
  "Escudo calefactor":{profile:"Escudo estándar"},
  "Escudo oval":{profile:"Escudo estándar"},
  "Escudo de caballería":{profile:"Escudo estándar"},
  "Escudo de infantería":{profile:"Escudo estándar"},
  "Escudo de abordaje":{profile:"Escudo estándar"},
  "Escudo de guardia":{profile:"Escudo estándar"},
  "Escudo de campaña":{profile:"Escudo estándar"},
  "Escudo de madera forrada":{profile:"Escudo estándar"},
  "Escudo de cuero tensado":{profile:"Escudo estándar"},
  "Rodela de guerra":{profile:"Escudo estándar"},
  "Escudo del Camino Real":{profile:"Escudo estándar",region:"Valdoria"},
  "Escudo del Espinazo":{profile:"Escudo estándar",region:"Kharum"},
  "Escudo portuario de Bronce":{profile:"Escudo estándar",region:"Liga de Bronce"},
  "Escudo forestal de Erelia":{profile:"Escudo estándar",region:"Erelia"},
  "Escudo de custodio de Lys":{profile:"Escudo estándar",region:"Lysendra"},
  "Escudo del Sol":{profile:"Escudo estándar",region:"Solenar"},

  "Escudo torre":{profile:"Escudo pesado"},
  "Pavés":{profile:"Escudo pesado"},
  "Escudo torre de asedio":{profile:"Escudo pesado"},
  "Escudo de muro":{profile:"Escudo pesado"},
  "Escudo de legionario pesado":{profile:"Escudo pesado"},
  "Escudo de guardia pesada":{profile:"Escudo pesado"},
  "Escudo de brecha":{profile:"Escudo pesado"},
  "Escudo de fortaleza":{profile:"Escudo pesado"},
  "Escudo de formación":{profile:"Escudo pesado"},
  "Escudo rectangular pesado":{profile:"Escudo pesado"},
  "Escudo de campaña pesado":{profile:"Escudo pesado"},
  "Pavés de ballestero":{profile:"Escudo pesado"},
  "Escudo torre valdoriano":{profile:"Escudo pesado",region:"Valdoria"},
  "Pavés de Kar-Dur":{profile:"Escudo pesado",region:"Kharum"},
  "Escudo de muelle pesado de Cobravia":{profile:"Escudo pesado",region:"Liga de Bronce"},
  "Escudo de frontera Ereliana":{profile:"Escudo pesado",region:"Erelia"},
  "Escudo de Guardia Lysendrina":{profile:"Escudo pesado",region:"Lysendra"},
  "Pavés solar de Heliara":{profile:"Escudo pesado",region:"Solenar"}
});

const canonicalByName=new Map(STARTER_CONTENT.shield.map((entry)=>[entry.name,entry]));

export function approvedShieldVariantSources(){
  return Object.entries(APPROVED_SHIELD_VARIANTS).map(([name,config])=>{
    const profile=canonicalByName.get(config.profile);
    if(!profile) throw new Error("Perfil canónico de escudo inexistente: "+name+" -> "+config.profile);
    const region=config.region ?? "general";
    return {
      name,
      type:"shield",
      system:{
        ...structuredClone(profile.system),
        description:
          (region==="general" ? "Variante de escudo. " : "Variante regional de "+region+". ")+
          "Usa exactamente el perfil mecánico canónico de "+config.profile+
          ". Su forma o procedencia no conceden cobertura, Defensa, Bloqueos, Movimiento ni Reacciones adicionales.",
        tags:["catalog-expanded","profile-variant","shield-catalog",...(region==="general"?[]:["regional"])],
        catalogProfile:config.profile,
        catalogRegion:region
      }
    };
  });
}
