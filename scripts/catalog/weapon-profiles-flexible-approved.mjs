export const APPROVED_FLEXIBLE_PROFILES = Object.freeze({
  "Cadena corta de combate": Object.freeze({
    family:"Armas flexibles ligeras",
    skillSuggestion:"lightWeapons",
    specializationSuggestion:"",
    system:Object.freeze({
      skill:"lightWeapons",
      attackAttribute:"agi",
      damageAttribute:"fue",
      damage:4,
      penetration:0,
      strengthMin:0,
      priceCopper:100,
      priceQuantity:1,
      priceStatus:"exact",
      properties:"Flexible, Impactante"
    })
  }),
  "Látigo": Object.freeze({
    family:"Armas flexibles ligeras",
    skillSuggestion:"lightWeapons",
    specializationSuggestion:"",
    system:Object.freeze({
      skill:"lightWeapons",
      attackAttribute:"agi",
      damageAttribute:"fue",
      damage:2,
      penetration:0,
      strengthMin:0,
      priceCopper:50,
      priceQuantity:1,
      priceStatus:"exact",
      properties:"Flexible"
    })
  }),
  "Látigo reforzado": Object.freeze({
    family:"Armas flexibles ligeras",
    skillSuggestion:"lightWeapons",
    specializationSuggestion:"",
    system:Object.freeze({
      skill:"lightWeapons",
      attackAttribute:"agi",
      damageAttribute:"fue",
      damage:3,
      penetration:0,
      strengthMin:0,
      priceCopper:100,
      priceQuantity:1,
      priceStatus:"exact",
      properties:"Flexible, Impactante"
    })
  })
});

export function approvedFlexibleProfileSources() {
  return Object.entries(APPROVED_FLEXIBLE_PROFILES).map(([name,profile])=>({
    name,
    type:"weapon",
    system:{
      ...structuredClone(profile.system),
      description:
        "Perfil flexible CAT-10. La propiedad Flexible describe construcción y puede sostener un método narrativo de maniobra, pero no concede alcance adicional, Enganche, Desarmar mejorado, Defensa ni ataques extra.",
      tags:["catalog-expanded","canonical-profile","cat-10"],
      catalogFamily:profile.family
    }
  }));
}
