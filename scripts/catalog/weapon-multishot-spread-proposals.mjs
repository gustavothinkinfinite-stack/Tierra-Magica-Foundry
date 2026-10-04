export const MULTISHOT_SPREAD_DESIGN_PROPOSALS = Object.freeze({
  "Ballesta repetidora": Object.freeze({
    candidate:{skill:"rangedWeapons",attackAttribute:"per",damage:5,penetration:1,rangeOptimal:20,priceCopper:800,properties:"Repetición, 2 manos"},
    unresolved:["estado de munición/cargador","beneficio real de Repetición","recarga entre cargadores"]
  }),
  "Ballesta doble": Object.freeze({
    candidate:{skill:"rangedWeapons",attackAttribute:"per",damage:6,penetration:1,reload:1,rangeOptimal:20,priceCopper:500,properties:"Doble mecanismo, 2 manos"},
    unresolved:["estado independiente de los dos mecanismos","momento de Recarga"]
  }),
  "Pistola de dos cañones": Object.freeze({
    candidate:{skill:"rangedWeapons",attackAttribute:"per",damage:6,penetration:2,reload:2,rangeOptimal:12,priceCopper:1400,properties:"Doble mecanismo"},
    unresolved:["estado independiente de cañones","momento de Recarga"]
  }),
  "Pistola de cuatro cañones": Object.freeze({
    candidate:{skill:"rangedWeapons",attackAttribute:"per",damage:6,penetration:1,rangeOptimal:12,priceCopper:2000,properties:"Repetición"},
    unresolved:["estado de cuatro cañones","rotación/selección de cañón","recarga del conjunto"]
  }),
  "Rifle de dos cañones": Object.freeze({
    candidate:{skill:"rangedWeapons",attackAttribute:"per",damage:7,penetration:3,reload:2,rangeOptimal:30,priceCopper:2500,properties:"Doble mecanismo, 2 manos"},
    unresolved:["estado independiente de cañones","momento de Recarga"]
  }),
  "Trabuco": Object.freeze({
    candidate:{skill:"rangedWeapons",attackAttribute:"per",damage:7,penetration:0,reload:2,rangeOptimal:6,priceCopper:800,properties:"Dispersión"},
    unresolved:["si Dispersión es sólo descriptiva o afecta múltiples objetivos","consumo de munición"]
  }),
  "Trabuco de abordaje": Object.freeze({
    candidate:{skill:"rangedWeapons",attackAttribute:"per",damage:7,penetration:0,reload:2,rangeOptimal:5,priceCopper:800,properties:"Dispersión"},
    unresolved:["si Dispersión es sólo descriptiva o afecta múltiples objetivos","consumo de munición"]
  }),
  "Escopeta temprana": Object.freeze({
    candidate:{skill:"rangedWeapons",attackAttribute:"per",damage:7,penetration:1,reload:2,rangeOptimal:10,priceCopper:1200,properties:"Dispersión, 2 manos"},
    unresolved:["si Dispersión es sólo descriptiva o afecta múltiples objetivos","consumo de munición"]
  }),
  "Escopeta de dos cañones": Object.freeze({
    candidate:{skill:"rangedWeapons",attackAttribute:"per",damage:7,penetration:1,rangeOptimal:10,priceCopper:1800,properties:"Dispersión, Doble mecanismo, 2 manos"},
    unresolved:["estado independiente de cañones","si Dispersión afecta múltiples objetivos","recarga del conjunto"]
  }),
  "Trabuco portuario": Object.freeze({
    candidate:{skill:"rangedWeapons",attackAttribute:"per",damage:7,penetration:0,reload:2,rangeOptimal:6,priceCopper:900,properties:"Dispersión"},
    region:"Liga de Bronce",
    unresolved:["si Dispersión es sólo descriptiva o afecta múltiples objetivos","consumo de munición"]
  })
});

export const MULTISHOT_SPREAD_POLICY = Object.freeze({
  status:"design-only",
  runtime:false,
  rules:[
    "Una Acción de ataque nunca obtiene varios ataques sólo por varios cañones.",
    "Dispersión no puede convertirse en área, cono, Ventaja o daño múltiple sin regla expresa.",
    "Doble mecanismo y Repetición requieren estado de carga antes de producir una ventaja mecánica.",
    "Los valores candidatos no son canónicos hasta promoción explícita y actualización del Manual Maestro."
  ]
});
