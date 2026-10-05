import { STARTER_CONTENT } from "../content.mjs";

export const APPROVED_RANGED_VARIANTS = Object.freeze({
  "Arco de caza":"Arco corto",
  "Arco compuesto":"Arco corto",
  "Arco recurvo":"Arco corto",
  "Arco corto montado":"Arco corto",
  "Arco naval":"Arco corto",
  "Arco de guerra":"Arco largo",
  "Arco largo de guerra":"Arco largo",
  "Arco de precisión":"Arco largo",

  "Ballesta de mano":"Ballesta",
  "Ballesta ligera":"Ballesta",
  "Ballesta de caza":"Ballesta",
  "Ballesta militar":"Ballesta",
  "Ballesta de estribo":"Ballesta",
  "Ballesta de palanca":"Ballesta",
  "Ballesta de abordaje":"Ballesta",
  "Ballesta de precisión":"Ballesta",
  "Ballesta de torno":"Ballesta pesada",
  "Arbalesta":"Ballesta pesada",
  "Ballesta de asedio portátil":"Ballesta pesada",

  "Pistola de chispa":"Pistola temprana",
  "Pistola de rueda":"Pistola temprana",
  "Pistola de duelo":"Pistola temprana",
  "Pistola militar":"Pistola temprana",
  "Pistola de caballería":"Pistola temprana",
  "Pistola de abordaje":"Pistola temprana",
  "Pistola de bolsillo":"Pistola temprana",
  "Pistola pepperbox":"Pistola repetidora",
  "Revólver temprano":"Pistola repetidora",
  "Revólver pesado":"Pistola repetidora",
  "Revólver de oficial":"Pistola repetidora",
  "Pistola de precisión":"Pistola repetidora",

  "Mosquete":"Rifle temprano",
  "Arcabuz":"Rifle temprano",
  "Carabina":"Rifle temprano",
  "Carabina de caballería":"Rifle temprano",
  "Fusil de infantería":"Rifle temprano",
  "Rifle de caza":"Rifle temprano",
  "Rifle largo":"Rifle temprano",
  "Rifle de precisión":"Rifle temprano",
  "Rifle pesado":"Rifle temprano",
  "Rifle de palanca":"Rifle repetidor",
  "Rifle de cerrojo temprano":"Rifle repetidor",
  "Carabina repetidora":"Rifle repetidor",
  "Rifle repetidor pesado":"Rifle repetidor"
});

const canonicalByName = new Map(STARTER_CONTENT.weapon.map((entry)=>[entry.name,entry]));

export function approvedRangedVariantSources() {
  return Object.entries(APPROVED_RANGED_VARIANTS).map(([name,profileName])=>{
    const profile=canonicalByName.get(profileName);
    if(!profile) throw new Error("Perfil canónico inexistente para variante a distancia: "+name+" -> "+profileName);
    return {
      name,
      type:"weapon",
      system:{
        ...structuredClone(profile.system),
        description:
          "Variante de arma a distancia. Usa exactamente el perfil mecánico canónico de "+profileName+
          ". El nombre no añade cargador, perdigones, ráfaga, cañón adicional, alcance ni Cadencia fuera del perfil.",
        tags:["catalog-expanded","profile-variant","cat-06"],
        catalogProfile:profileName
      }
    };
  });
}
