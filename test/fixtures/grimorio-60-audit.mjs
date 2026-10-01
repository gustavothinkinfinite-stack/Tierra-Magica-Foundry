// Snapshot de auditoría del grimorio ampliado.
// NO es catálogo canónico: permite probar las 42 propuestas sin incorporarlas a STARTER_CONTENT.
export const GRIMORIO_AUDIT_CANDIDATES = Object.freeze([
  // Evocación
  {name:"Luz Arcana",discipline:"evocation",grade:"minor",mana:2,role:"utility"},
  {name:"Aguja Gélida",discipline:"evocation",grade:"advanced",mana:5,role:"single-damage-control",damage:5,penetration:1,defense:"normal",movementPenalty:2,stackingKey:"slow"},
  {name:"Arco Fulminante",discipline:"evocation",grade:"advanced",mana:6,role:"multiple-damage",damage:4,penetration:1,defense:"normal",requiresTarget:true,maxTargets:3,targetMode:"multiple"},
  {name:"Martillo Cinético",discipline:"evocation",grade:"advanced",mana:5,role:"single-damage-control",damage:3,penetration:0,defense:"body",push:true},
  {name:"Pantalla Cinética",discipline:"evocation",grade:"master",mana:8,role:"defense",sustained:true,defenseBonus:2,stackingGroup:"cover"},
  {name:"Rayo de Ruptura",discipline:"evocation",grade:"master",mana:10,role:"area-damage",damage:8,penetration:4,defense:"normal",friendlyFire:true},
  {name:"Tormenta Arcana",discipline:"evocation",grade:"legendary",mana:12,role:"area-damage",damage:8,penetration:2,defense:"normal",friendlyFire:true},

  // Alteración
  {name:"Respiración Adaptada",discipline:"alteration",grade:"minor",mana:2,role:"adaptation",sustained:true},
  {name:"Adherencia",discipline:"alteration",grade:"basic",mana:3,role:"mobility",sustained:true},
  {name:"Morfología Flexible",discipline:"alteration",grade:"basic",mana:4,role:"adaptation",sustained:true,automaticGrappleEscape:false},
  {name:"Miembro Efímero",discipline:"alteration",grade:"advanced",mana:5,role:"adaptation",sustained:true,extraAction:false,extraAttack:false,extraShieldBenefit:false},
  {name:"Cuerpo Mineral",discipline:"alteration",grade:"advanced",mana:6,role:"defense",sustained:true,protection:3,movementPenalty:2,stackingGroup:"armor-equivalent"},
  {name:"Fase Parcial",discipline:"alteration",grade:"advanced",mana:7,role:"mobility",sustained:false},
  {name:"Morfología Alada",discipline:"alteration",grade:"master",mana:8,role:"mobility",sustained:true,maxDuration:"scene"},
  {name:"Transmutación Corpórea",discipline:"alteration",grade:"legendary",mana:12,role:"adaptation",sustained:true,maxDuration:"scene",fixedForm:true,maxMajorAdaptations:2,maxScaleChange:1,extraScaleInteraction:false},

  // Restauración
  {name:"Conservación Orgánica",discipline:"restoration",grade:"minor",mana:2,role:"utility",healing:0,proposedDuration:"24 horas"},
  {name:"Transferencia Vital",discipline:"restoration",grade:"basic",mana:4,role:"healing-transfer",maxTransfer:3,netHealing:0,minCasterHealth:1},
  {name:"Círculo Restaurador",discipline:"restoration",grade:"advanced",mana:6,role:"multiple-healing",healing:2,requiresTarget:true,maxTargets:3,targetMode:"multiple"},
  {name:"Restauración Funcional",discipline:"restoration",grade:"advanced",mana:7,role:"injury-support",sustained:true,maxDuration:"scene",repairsWound:false,maxSuppressedPenalties:1,restoresMissingFunction:false},
  {name:"Matriz Vital",discipline:"restoration",grade:"master",mana:9,role:"periodic-healing",healingPerPulse:2,pulses:3,canHealAtZero:false,reapplyExtraPulse:false,sustained:true},
  {name:"Renovación Integral",discipline:"restoration",grade:"legendary",mana:14,role:"ritual-healing",method:"ritual",healing:10,graveWounds:2,reducesTrauma:false,resurrection:false},

  // Percepción / Ilusión
  {name:"Imagen Menor",discipline:"perception",grade:"minor",mana:2,role:"illusion",sustained:true,maxDuration:"scene",illusionDf:"11+attribute+channeling"},
  {name:"Velo Sensorial",discipline:"perception",grade:"basic",mana:3,role:"illusion",sustained:true,maxDuration:"scene",illusionDf:"11+attribute+channeling"},
  {name:"Espejismo",discipline:"perception",grade:"basic",mana:4,role:"illusion",sustained:true,maxDuration:"scene",illusionDf:"11+attribute+channeling"},
  {name:"Revelación Sensorial",discipline:"perception",grade:"advanced",mana:5,role:"counter-illusion",illusionCheckAdvantage:true},
  {name:"Duplicado Ilusorio",discipline:"perception",grade:"advanced",mana:6,role:"defense-illusion",sustained:true,maxDuration:"scene",defenseBonus:2,visionDependent:true,secondaryAttackNegationRoll:false},
  {name:"Invisibilidad",discipline:"perception",grade:"master",mana:9,role:"illusion",sustained:true,maxDuration:"scene",breaksAfterOffense:true,breaksAfterRemoteOffense:true,indetectable:false,illusionDf:"11+attribute+channeling"},
  {name:"Dominio Fantasmagórico",discipline:"perception",grade:"legendary",mana:13,role:"illusion-area",sustained:true,maxDuration:"scene",illusionDf:"11+attribute+channeling",physicalForce:false},
  {name:"Sintonía Emocional",discipline:"perception",grade:"minor",mana:2,role:"information",mindReading:false,lieDetection:false},

  // Influencia
  {name:"Valor Inspirado",discipline:"influence",grade:"basic",mana:3,role:"mental-defense",sustained:true,maxDuration:"scene",mentalDefenseBonus:2,scope:"fear",stackingGroup:"mental-ward"},
  {name:"Fascinación",discipline:"influence",grade:"basic",mana:4,role:"attention",defense:"mental",proposedDuration:"hasta fin del siguiente turno del objetivo",actionDenial:false},
  {name:"Temor",discipline:"influence",grade:"basic",mana:4,role:"emotion",defense:"mental",proposedDuration:"hasta fin del siguiente turno del objetivo",forcedAction:false,actionDenial:false},
  {name:"Concordia",discipline:"influence",grade:"advanced",mana:5,role:"social-area",defense:"mental",proposedDuration:"scene",combatEndsAutomatically:false,actionDenial:false},
  {name:"Velo Social",discipline:"influence",grade:"advanced",mana:5,role:"social-stealth",sustained:true,maxDuration:"scene",grantsInvisibility:false},
  {name:"Interdicción",discipline:"influence",grade:"advanced",mana:6,role:"mental-defense",defense:"mental",sustained:true,maxDuration:"scene",imposesDisadvantage:true,actionDenial:false,endsWhenProtectedDamages:true},
  {name:"Aura de Autoridad",discipline:"influence",grade:"master",mana:9,role:"mental-defense-area",defense:"mental",sustained:true,maxDuration:"scene",imposesDisadvantage:true,actionDenial:false,endsPerTargetWhenCasterDamages:true},
  {name:"Mente Anclada",discipline:"influence",grade:"basic",mana:3,role:"mental-defense",activation:"Reacción",mentalDefenseBonus:2,singleDeclaredEffect:true,stackingGroup:"mental-ward"},

  // Conjuración
  {name:"Objeto Efímero",discipline:"conjuration",grade:"minor",mana:2,role:"utility",sustained:true,maxDuration:"scene",commercialValue:false,complexMechanism:false,ammunition:false,satisfiesSpecializedToolRequirement:false,sameSpellReplaces:true},
  {name:"Salto Vinculado",discipline:"conjuration",grade:"advanced",mana:7,role:"transport",requiresTarget:true,maxTargets:3,targetMode:"multiple",remoteOriginCompatible:false},
  {name:"Jaula Dimensional",discipline:"conjuration",grade:"master",mana:9,role:"spatial-control",sustained:true,spatialMinDifficulty:18,secondaryResistance:false},
  {name:"Llamada Mayor",discipline:"conjuration",grade:"master",mana:10,role:"summon",method:"ritual",sustained:true,automaticObedience:false},
  {name:"Gran Traslación",discipline:"conjuration",grade:"legendary",mana:14,role:"transport-ritual",method:"ritual",remoteOriginCompatible:false}
]);

export const GRIMORIO_SPATIAL_CLOSURE_PROPOSALS = Object.freeze({
  "Trasposición": {
    status:"proposed-not-canon",
    role:"position-swap",
    activation:"Acción",
    range:"8 espacios",
    difficulty:14,
    willingOnly:true,
    effect:"Intercambia la posición del lanzador con una criatura voluntaria dentro de alcance. Ambas posiciones deben ser válidas; no concede Movimiento adicional ni permite destino letal o inválido.",
    remoteOriginCompatible:false
  },
  "Umbral": {
    status:"proposed-not-canon",
    role:"local-threshold",
    activation:"Acción",
    difficulty:18,
    maxBarrierThickness:2,
    maxTraversals:1,
    effect:"Abre un paso espacial local a través de una barrera continua de hasta 2 espacios de espesor; una criatura voluntaria puede atravesarlo una vez antes de que se cierre. No conecta Anclas ni crea un Portal persistente.",
    remoteOriginCompatible:false
  }
});

export const AUDIT_REFERENCE_TARGETS = Object.freeze([
  {name:"Bandido",defense:13,mental:12,body:12,protection:1},
  {name:"Guardia",defense:14,mental:12,body:13,protection:2},
  {name:"Soldado",defense:14,mental:13,body:13,protection:3},
  {name:"Veterano",defense:16,mental:14,body:14,protection:3},
  {name:"Centinela de Bronce",defense:12,mental:12,body:null,protection:5},
  {name:"Troll dominante",defense:13,mental:13,body:17,protection:4}
]);
