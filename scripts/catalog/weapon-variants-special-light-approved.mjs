import { STARTER_CONTENT } from "../content.mjs";

export const APPROVED_SPECIAL_LIGHT_VARIANTS = Object.freeze({
  "Estilete":"Daga",
  "Daga de parada":"Daga",
  "Daga de misericordia":"Daga",
  "Garra de combate":"Daga",
  "Katar":"Daga",
  "Pico de combate corto":"Daga",
  "Hachuela":"Espada corta",
  "Hoz de guerra":"Espada corta"
});

const canonicalByName = new Map(STARTER_CONTENT.weapon.map((entry)=>[entry.name,entry]));

export function approvedSpecialLightVariantSources() {
  return Object.entries(APPROVED_SPECIAL_LIGHT_VARIANTS).map(([name,profileName])=>{
    const profile=canonicalByName.get(profileName);
    if(!profile) throw new Error("Perfil canónico inexistente para variante: "+name+" -> "+profileName);
    return {
      name,
      type:"weapon",
      system:{
        ...structuredClone(profile.system),
        description:
          "Variante ligera auditada. Usa exactamente el perfil mecánico canónico de "+profileName+
          ". Su forma no concede Penetración, Parada, Enganche ni otro modificador adicional sin una regla expresa.",
        tags:["catalog-expanded","profile-variant","cat-03"],
        catalogProfile:profileName
      }
    };
  });
}
