export const APPROVED_PROJECTILE_PROFILES = Object.freeze({
  "Honda": Object.freeze({
    family:"Proyectiles",
    skillSuggestion:"rangedWeapons",
    specializationSuggestion:"",
    system:Object.freeze({
      skill:"rangedWeapons",
      attackAttribute:"agi",
      damageAttribute:"fue",
      damage:3,
      penetration:0,
      rangeOptimal:12,
      priceCopper:20,
      priceQuantity:1,
      priceStatus:"exact",
      properties:"Proyectil"
    })
  }),
  "Honda de guerra": Object.freeze({
    family:"Proyectiles",
    skillSuggestion:"rangedWeapons",
    specializationSuggestion:"",
    system:Object.freeze({
      skill:"rangedWeapons",
      attackAttribute:"agi",
      damageAttribute:"fue",
      damage:4,
      penetration:0,
      rangeOptimal:18,
      priceCopper:50,
      priceQuantity:1,
      priceStatus:"exact",
      properties:"Proyectil, Impactante"
    })
  }),
  "Fustíbalo": Object.freeze({
    family:"Proyectiles",
    skillSuggestion:"rangedWeapons",
    specializationSuggestion:"",
    system:Object.freeze({
      skill:"rangedWeapons",
      attackAttribute:"agi",
      damageAttribute:"fue",
      damage:5,
      penetration:0,
      rangeOptimal:25,
      priceCopper:80,
      priceQuantity:1,
      priceStatus:"exact",
      properties:"Proyectil, Impactante, 2 manos"
    })
  }),
  "Azagaya": Object.freeze({
    family:"Proyectiles arrojados",
    skillSuggestion:"rangedWeapons",
    specializationSuggestion:"",
    system:Object.freeze({
      skill:"rangedWeapons",
      attackAttribute:"agi",
      damageAttribute:"fue",
      damage:3,
      penetration:0,
      strengthMin:0,
      rangeOptimal:12,
      priceCopper:20,
      priceQuantity:1,
      priceStatus:"exact",
      properties:"Arrojadiza"
    })
  }),
  "Jabalina": Object.freeze({
    family:"Proyectiles arrojados",
    skillSuggestion:"rangedWeapons",
    specializationSuggestion:"",
    system:Object.freeze({
      skill:"rangedWeapons",
      attackAttribute:"agi",
      damageAttribute:"fue",
      damage:4,
      penetration:0,
      strengthMin:0,
      rangeOptimal:10,
      priceCopper:30,
      priceQuantity:1,
      priceStatus:"exact",
      properties:"Arrojadiza"
    })
  }),
  "Jabalina pesada": Object.freeze({
    family:"Proyectiles arrojados",
    skillSuggestion:"rangedWeapons",
    specializationSuggestion:"",
    system:Object.freeze({
      skill:"rangedWeapons",
      attackAttribute:"agi",
      damageAttribute:"fue",
      damage:5,
      penetration:0,
      strengthMin:1,
      rangeOptimal:8,
      priceCopper:50,
      priceQuantity:1,
      priceStatus:"exact",
      properties:"Arrojadiza"
    })
  })
});

export function approvedProjectileProfileSources() {
  return Object.entries(APPROVED_PROJECTILE_PROFILES).map(([name,profile])=>({
    name,
    type:"weapon",
    system:{
      ...structuredClone(profile.system),
      description:
        "Perfil de proyectil CAT-09. Usa Armas a Distancia y AGI para atacar. " +
        (profile.system.damageAttribute === "fue" ? "Añade FUE al daño conforme a su perfil. " : "") +
        "No concede ataques adicionales, Recarga, Repetición ni una maniobra especial por su nombre.",
      tags:["catalog-expanded","canonical-profile","cat-09"],
      catalogFamily:profile.family
    }
  }));
}
