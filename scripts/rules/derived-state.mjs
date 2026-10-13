import { defenseBonus } from "../rules.mjs";
import { normalizeSlug } from "./identity.mjs";
import { modifiersForSelector } from "./rule-elements.mjs";
import { ancestryDefenseBonuses } from "./ancestry-situational.mjs";

const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeSelector = (selector) => selector === "initiative" ? "initiativeModifier" : String(selector ?? "");

function contribution({
  selector,
  value,
  label,
  sourceItemId = null,
  sourceItemName = "",
  sourceType = "rule",
  ruleId = null,
  contextual = false,
  context = null,
  stacking = "add",
  equipmentType = null
}) {
  return {
    selector: normalizeSelector(selector),
    value: number(value),
    label: String(label ?? selector ?? "Modificador"),
    sourceItemId,
    sourceItemName: String(sourceItemName ?? ""),
    sourceType,
    ruleId,
    contextual: Boolean(contextual),
    context,
    stacking,
    equipmentType
  };
}

function selectorContributions(prepared, selector) {
  const canonical = normalizeSelector(selector);
  const selectors = canonical === "initiativeModifier"
    ? ["initiativeModifier", "initiative"]
    : [canonical];

  return selectors.flatMap((key) => modifiersForSelector(prepared, key)).map((entry) => contribution({
    selector: canonical,
    value: entry.value,
    label: entry.label,
    sourceItemId: entry.sourceItemId,
    sourceItemName: entry.sourceItemName,
    sourceType: "rule",
    ruleId: entry.ruleId
  }));
}

function total(contributions = []) {
  return contributions.reduce((sum, entry) => sum + number(entry.value), 0);
}

function breakdown({ base, formula, contributions = [], contextual = [] }) {
  const applied = contributions.filter((entry) => !entry.contextual);
  return {
    base: number(base),
    formula: String(formula ?? ""),
    contributions: applied,
    contextual,
    modifier: total(applied),
    total: number(base) + total(applied)
  };
}

function highestEquipped(items, type, field) {
  const candidates = items
    .filter((item) => item?.type === type && item?.system?.equipped)
    .map((item) => ({
      item,
      value: Math.max(0, number(item.system?.[field]))
    }))
    .filter((entry) => entry.value > 0)
    .sort((a, b) => b.value - a.value);
  return candidates[0] ?? null;
}

function structuredManualContributions(system, selector) {
  const canonical = normalizeSelector(selector);
  const manual = system?.modifiers?.manual;
  if (!manual || typeof manual !== "object") return [];
  return Object.values(manual)
    .filter((entry) => normalizeSelector(entry?.selector) === canonical && number(entry?.value) !== 0)
    .map((entry) => contribution({
      selector: canonical,
      value: entry.value,
      label: entry.label ?? "Ajuste manual",
      sourceType: "manual",
      ruleId: entry.id ?? null
    }));
}

function legacyContribution(selector, value, label) {
  const numeric = number(value);
  return numeric ? [contribution({
    selector,
    value: numeric,
    label,
    sourceType: "legacy-manual"
  })] : [];
}

function manualOrLegacy(system, selector, legacyValue, legacyLabel) {
  const structured = structuredManualContributions(system, selector);
  return structured.length ? structured : legacyContribution(selector, legacyValue, legacyLabel);
}

function sustainedSpell(items, system, slug) {
  const active = new Set(Array.isArray(system.magic?.sustainedSpellIds) ? system.magic.sustainedSpellIds : []);
  return items.find((item) =>
    item?.type === "spell" &&
    active.has(item.id) &&
    normalizeSlug(item.system?.slug || item.name) === slug
  ) ?? null;
}

function contextMatches(requirement, context) {
  if (!requirement) return true;
  if (typeof requirement === "string") return context?.[requirement] === true;
  if (Array.isArray(requirement)) return requirement.every((key) => context?.[key] === true);
  if (typeof requirement === "object") {
    if (Array.isArray(requirement.all) && !requirement.all.every((key) => context?.[key] === true)) return false;
    if (Array.isArray(requirement.any) && requirement.any.length && !requirement.any.some((key) => context?.[key] === true)) return false;
    return true;
  }
  return false;
}

export function deriveActorState({
  actorType = "character",
  system = {},
  items = [],
  rulePreparation = {},
  defensiveRankBonuses = [0, 0, 1, 2, 3, 4]
} = {}) {
  // Un perfil de referencia de PNJ contiene valores completos del Manual
  // Maestro. No son compras de personaje, ni derivan Defensa/Vida del nivel.
  if (actorType === "npc" && system.npcProfile?.enabled === true) {
    const profile=system.npcProfile;
    const profileNumber=(key,fallback=0)=>Math.max(0,number(profile[key],fallback));
    const fromProfile=(selector,key,description,minimum=0)=>{
      const result=breakdown({
        base:profileNumber(key),
        formula:description,
        contributions:selectorContributions(rulePreparation,selector)
      });
      result.total=Math.max(minimum,result.total);
      return result;
    };
    const health=fromProfile("healthMax","life","Perfil de PNJ — Manual Maestro §23",1);
    const mana=fromProfile("manaMax","mana","Reserva de PNJ (0 si no especificada)");
    const maneuver=fromProfile("maneuverDefense","maneuverDefense","Perfil de PNJ — Manual Maestro §23");
    const mental=fromProfile("mentalDefense","mentalDefense","Perfil de PNJ — Manual Maestro §23");
    const unavailableBody=profile.bodyDefense === null;
    const body=unavailableBody
      ? {base:null,formula:"No aplicable (—) en el Manual Maestro",contributions:[],contextual:[],modifier:0,total:null}
      : fromProfile("bodyDefense","bodyDefense","Perfil de PNJ — Manual Maestro §23");
    const protection=fromProfile("protection","protection","Protección efectiva de perfil (no añadir armadura otra vez)");
    const movement=fromProfile("movement","movement","Perfil de PNJ — Manual Maestro §23",1);
    const initiative=fromProfile("initiativeModifier","initiative","Perfil de PNJ — Manual Maestro §23");
    const defenseContributions=selectorContributions(rulePreparation,"defense");
    if (system.combat?.guardActive) defenseContributions.push(contribution({
      selector:"defense",value:2,label:"Guardia",sourceType:"state"
    }));
    if (system.combat?.kineticBarrierActive) defenseContributions.push(contribution({
      selector:"defense",value:2,label:String(system.combat.kineticDefenseSource || "Barrera Cinética"),
      sourceType:"state",contextual:true,context:"kineticBarrier"
    }));
    if (system.combat?.parryActive) defenseContributions.push(contribution({
      selector:"defense",value:Math.max(2,Math.min(3,number(system.combat.parryBonus,2))),
      label:"Parada",sourceType:"state",contextual:true,context:"parryable"
    }));
    const defense=breakdown({
      base:profileNumber("defense"),formula:"Perfil de PNJ — Manual Maestro §23",
      contributions:defenseContributions,
      contextual:defenseContributions.filter((c)=>c.contextual)
    });
    // El capítulo 23 no da el umbral de Daño Grave de estos perfiles.
    // Se mantiene el cálculo general existente, sin elevarlo a dato del bestiario.
    const severe=breakdown({
      base:5+number(system.attributes?.vig?.value,1),
      formula:"5 + VIG (umbral general; no definido en tabla de PNJ)"
    });
    const defensive=breakdown({base:0,formula:"Incluido en la Defensa del perfil"});
    return {
      healthMax:health.total,manaMax:mana.total,severeThreshold:severe.total,
      defensiveBonus:0,defense:defense.total,maneuverDefense:maneuver.total,
      mentalDefense:mental.total,bodyDefense:body.total,protection:protection.total,
      movement:movement.total,initiativeModifier:initiative.total,initiative:initiative.total,
      martialDefense:0,equippedShield:0,
      unavailableDefenses:unavailableBody?["bodyDefense"]:[],
      breakdowns:{
        healthMax:health,manaMax:mana,severeThreshold:severe,defensiveBonus:defensive,
        defense,maneuverDefense:maneuver,mentalDefense:mental,bodyDefense:body,
        protection,movement,initiativeModifier:initiative
      },
      contextual:{defense:defenseContributions.filter((c)=>c.contextual),protection:[]},
      equipmentIssues:[]
    };
  }

  if (actorType === "familiar") {
    const familiar = system.familiar ?? {};
    const profileHealth = Math.max(1, Math.floor(number(familiar.lifeMax, 10)));
    const profileDefense = Math.max(1, Math.floor(number(familiar.defense, 12)));
    const profileResistance = Math.max(0, Math.floor(number(familiar.resistance, 2)));
    const profileWill = Math.max(0, Math.floor(number(familiar.will, 2)));
    const profilePerception = Math.max(0, Math.floor(number(familiar.perception, 2)));
    const profileProtection = Math.max(0, Math.floor(number(familiar.protection, 0)));
    const profileMovement = Math.max(1, Math.floor(number(system.movement?.base, 6)));

    const health = breakdown({
      base: profileHealth,
      formula: "Perfil de Familiar",
      contributions: selectorContributions(rulePreparation, "healthMax")
    });
    const defense = breakdown({
      base: profileDefense,
      formula: "Defensa del Perfil de Familiar",
      contributions: selectorContributions(rulePreparation, "defense")
    });
    const maneuver = breakdown({
      base: profileDefense,
      formula: "Defensa del Perfil de Familiar",
      contributions: selectorContributions(rulePreparation, "maneuverDefense")
    });
    const mental = breakdown({
      base: 11 + profileWill,
      formula: "11 + VOL simplificada",
      contributions: selectorContributions(rulePreparation, "mentalDefense")
    });
    const body = breakdown({
      base: 11 + profileResistance,
      formula: "11 + RES simplificada",
      contributions: selectorContributions(rulePreparation, "bodyDefense")
    });
    const protection = breakdown({
      base: profileProtection,
      formula: "Protección del Perfil de Familiar",
      contributions: selectorContributions(rulePreparation, "protection")
    });
    const movement = breakdown({
      base: profileMovement,
      formula: "Movimiento del Perfil de Familiar",
      contributions: selectorContributions(rulePreparation, "movement")
    });
    movement.total = Math.max(1, movement.total);
    const initiative = breakdown({
      base: profilePerception,
      formula: "PER simplificada",
      contributions: selectorContributions(rulePreparation, "initiativeModifier")
    });
    const severe = breakdown({
      base: Math.max(1, Math.ceil(profileHealth / 2)),
      formula: "Referencia de perfil simplificado"
    });
    const defensive = breakdown({ base:0, formula:"Sin Bono Defensivo separado" });
    const mana = breakdown({ base:0, formula:"Sin reserva de Maná propia" });

    return {
      healthMax: Math.max(1, health.total),
      manaMax: 0,
      severeThreshold: severe.total,
      defensiveBonus: 0,
      defense: defense.total,
      maneuverDefense: maneuver.total,
      mentalDefense: mental.total,
      bodyDefense: body.total,
      protection: Math.max(0, protection.total),
      movement: movement.total,
      initiativeModifier: initiative.total,
      initiative: initiative.total,
      martialDefense: 0,
      equippedShield: 0,
      breakdowns: {
        healthMax: health,
        manaMax: mana,
        severeThreshold: severe,
        defensiveBonus: defensive,
        defense,
        maneuverDefense: maneuver,
        mentalDefense: mental,
        bodyDefense: body,
        protection,
        movement,
        initiativeModifier: initiative
      },
      contextual: { defense:[], protection:[] },
      equipmentIssues: []
    };
  }

  const ancestry = items.find((item) => item?.type === "ancestry") ?? null;
  const ancestryScale = String(ancestry?.system?.choices?.scale || ancestry?.system?.scale || system.traits?.size || "");
  const ancestryMovement = Math.max(1, number(ancestry?.system?.movementBase, system.movement?.base ?? 6));
  const ancestryNaturalProtection = Math.max(0, number(ancestry?.system?.naturalProtection));
  const ancestryProfile = ancestry ? {
    name: String(ancestry.name ?? "Ascendencia"),
    scale: ancestryScale,
    movementBase: ancestryMovement,
    movementModes: String(ancestry.system?.movementModes ?? ""),
    naturalProtection: ancestryNaturalProtection,
    features: Array.isArray(ancestry.system?.racialFeatures) ? ancestry.system.racialFeatures.map(String) : [],
    selectionNotes: String(ancestry.system?.selectionNotes ?? "")
  } : null;

  const attributes = system.attributes ?? {};
  const vig = number(attributes.vig?.value, 1);
  const agi = number(attributes.agi?.value, 1);
  const vol = number(attributes.vol?.value, 1);
  const per = number(attributes.per?.value, 1);

  const martialRank = Math.max(0, Math.min(5, Math.floor(number(system.combat?.defensiveRank))));
  const martialDefense = defenseBonus(martialRank, defensiveRankBonuses);

  const defensiveBonusContributions = [
    contribution({
      selector: "defensiveBonus",
      value: martialDefense,
      label: "Entrenamiento marcial",
      sourceType: "base"
    }),
    ...selectorContributions(rulePreparation, "defensiveBonus"),
    ...manualOrLegacy(system, "defensiveBonus", system.combat?.defenseBonus, "Modificador manual legado")
  ];

  const defensiveBonusValue = total(defensiveBonusContributions);
  const armor = highestEquipped(items, "armor", "protection");
  const shield = highestEquipped(items, "shield", "passiveDefense");

  const healthContributions = selectorContributions(rulePreparation, "healthMax");
  const manaContributions = selectorContributions(rulePreparation, "manaMax");
  const defenseContributions = selectorContributions(rulePreparation, "defense");
  const maneuverContributions = selectorContributions(rulePreparation, "maneuverDefense");
  const mentalContributions = selectorContributions(rulePreparation, "mentalDefense");
  const bodyContributions = selectorContributions(rulePreparation, "bodyDefense");
  const protectionContributions = selectorContributions(rulePreparation, "protection");
  const movementContributions = selectorContributions(rulePreparation, "movement");
  const initiativeContributions = selectorContributions(rulePreparation, "initiativeModifier");
  // Una defensa racial situacional no altera permanentemente la cifra de
  // la ficha. Se suma cuando el contexto del ataque cumple su condición.
  const ancestryDefensiveContext=(selector)=>ancestryDefenseBonuses(items,selector).map((bonus)=>contribution({
    selector,value:bonus.value,label:bonus.label,sourceItemId:ancestry?.id??null,
    sourceItemName:ancestry?.name??"",sourceType:"ancestry",contextual:true,
    context:bonus.context
  }));
  const mentalContextual=ancestryDefensiveContext("mentalDefense");
  const bodyContextual=ancestryDefensiveContext("bodyDefense");

  const equipmentIssues = [];
  const fue = number(attributes.fue?.value, 1);

  if (armor) {
    const minimum = Math.max(0, number(armor.item.system?.strengthMin));
    const deficit = Math.max(0, minimum - fue);
    if (deficit >= 1) {
      movementContributions.push(contribution({
        selector: "movement",
        value: -1,
        label: "Armadura por debajo de FUE mínima",
        sourceItemId: armor.item.id ?? null,
        sourceItemName: armor.item.name ?? "",
        sourceType: "equipment",
        equipmentType: "armor"
      }));
      equipmentIssues.push(deficit === 1 ? {
        code: "armor-strength-deficit",
        message: armor.item.name + ": FUE un punto por debajo del mínimo; Carga Pesada y Desventaja en acciones físicas relevantes.",
        itemId: armor.item.id ?? null,
        itemName: armor.item.name ?? "",
        severity: "warning"
      } : {
        code: "armor-strength-incompetent",
        message: armor.item.name + ": FUE dos o más puntos por debajo del mínimo; no puede usarse competentemente en combate sin una capacidad específica.",
        itemId: armor.item.id ?? null,
        itemName: armor.item.name ?? "",
        severity: "warning"
      });
    }
  }

  if (shield && number(shield.item.system?.movementPenalty) !== 0) {
    movementContributions.push(contribution({
      selector: "movement",
      value: number(shield.item.system.movementPenalty),
      label: "Penalización de escudo",
      sourceItemId: shield.item.id ?? null,
      sourceItemName: shield.item.name ?? "",
      sourceType: "equipment",
      equipmentType: "shield"
    }));
  }

  if (system.combat?.guardActive) {
    defenseContributions.push(contribution({
      selector: "defense",
      value: 2,
      label: "Guardia",
      sourceType: "state"
    }));
  }

  if (system.combat?.kineticBarrierActive) {
    defenseContributions.push(contribution({
      selector: "defense",
      value: 2,
      label: String(system.combat?.kineticDefenseSource || "Barrera Cinética"),
      sourceType: "state",
      contextual: true,
      context: "kineticBarrier"
    }));
  }

  if (system.combat?.parryActive) {
    defenseContributions.push(contribution({
      selector: "defense",
      value: Math.max(2, Math.min(3, number(system.combat?.parryBonus, 2))),
      label: "Parada",
      sourceType: "state",
      contextual: true,
      context: "parryable"
    }));
  }

  if (shield) {
    defenseContributions.push(contribution({
      selector: "defense",
      value: shield.value,
      label: "Defensa pasiva de escudo",
      sourceItemId: shield.item.id ?? null,
      sourceItemName: shield.item.name ?? "",
      sourceType: "equipment",
      equipmentType: "shield",
      contextual: Boolean(shield.item.system?.frontalOnly),
      context: shield.item.system?.frontalOnly ? "frontal" : null
    }));
  }

  if (armor) {
    protectionContributions.push(contribution({
      selector: "protection",
      value: armor.value,
      label: "Armadura equipada",
      sourceItemId: armor.item.id ?? null,
      sourceItemName: armor.item.name ?? "",
      sourceType: "equipment",
      equipmentType: "armor"
    }));
  }

  if (ancestryNaturalProtection > 0) {
    const armorProtection = armor?.value ?? 0;
    const ancestryContribution = Math.max(0, ancestryNaturalProtection - armorProtection);
    if (ancestryContribution > 0) {
      protectionContributions.push(contribution({
        selector: "protection",
        value: ancestryContribution,
        label: (ancestry?.name ?? "Ascendencia") + ": Protección Natural",
        sourceItemId: ancestry?.id ?? null,
        sourceItemName: ancestry?.name ?? "",
        sourceType: "ancestry",
        equipmentType: "natural"
      }));
    }
  }

  const alteredSkin = sustainedSpell(items, system, "piel-alterada");
  if (alteredSkin) {
    protectionContributions.push(contribution({
      selector: "protection",
      value: 2,
      label: "Piel Alterada",
      sourceItemId: alteredSkin.id ?? null,
      sourceItemName: alteredSkin.name ?? "Piel Alterada",
      sourceType: "spell",
      contextual: true,
      context: "alteredSkinCompatible",
      stacking: "max-with-armor"
    }));
  }

  protectionContributions.push(...manualOrLegacy(
    system,
    "protection",
    system.combat?.protectionBonus,
    "Protección manual legada"
  ));
  movementContributions.push(...manualOrLegacy(
    system,
    "movement",
    system.combat?.movementBonus,
    "Movimiento manual legado"
  ));
  initiativeContributions.push(...manualOrLegacy(
    system,
    "initiativeModifier",
    system.combat?.initiativeBonus,
    "Iniciativa manual legada"
  ));

  const health = breakdown({
    base: 10 + vig * 2,
    formula: "10 + 2 × VIG",
    contributions: healthContributions
  });
  const manaDisabled = actorType === "familiar";
  const mana = breakdown({
    base: manaDisabled ? 0 : 6 + vol * 3,
    formula: manaDisabled ? "Sin reserva de Maná propia" : "6 + 3 × VOL",
    contributions: manaDisabled ? [] : manaContributions
  });
  const severe = breakdown({
    base: 5 + vig,
    formula: "5 + VIG"
  });
  const defensive = breakdown({
    base: 0,
    formula: "Bono Defensivo",
    contributions: defensiveBonusContributions
  });

  const defenseContextual = defenseContributions.filter((entry) => entry.contextual);
  const defense = breakdown({
    base: 11 + agi + defensiveBonusValue,
    formula: "11 + AGI + Bono Defensivo",
    contributions: defenseContributions,
    contextual: defenseContextual
  });

  const maneuver = breakdown({
    base: 11 + agi + defensiveBonusValue,
    formula: "11 + AGI + Bono Defensivo",
    contributions: maneuverContributions
  });
  const mental = breakdown({
    base: 11 + vol,
    formula: "11 + VOL",
    contributions: mentalContributions,
    contextual: mentalContextual
  });
  const body = breakdown({
    base: 11 + vig,
    formula: "11 + VIG",
    contributions: bodyContributions,
    contextual: bodyContextual
  });

  const protectionContextual = protectionContributions.filter((entry) => entry.contextual);
  const protection = breakdown({
    base: 0,
    formula: "Protección general",
    contributions: protectionContributions,
    contextual: protectionContextual
  });

  const movementBase = ancestry ? ancestryMovement : Math.max(1, number(system.movement?.base, 6));
  const movement = breakdown({
    base: movementBase,
    formula: "Movimiento base",
    contributions: movementContributions
  });
  movement.total = Math.max(1, movement.total);

  const initiative = breakdown({
    base: per,
    formula: "PER + modificadores",
    contributions: initiativeContributions
  });

  return {
    healthMax: Math.max(0, health.total),
    manaMax: Math.max(0, mana.total),
    severeThreshold: Math.max(0, severe.total),
    defensiveBonus: defensive.total,
    defense: defense.total,
    maneuverDefense: maneuver.total,
    mentalDefense: mental.total,
    bodyDefense: body.total,
    protection: Math.max(0, protection.total),
    movement: movement.total,
    initiativeModifier: initiative.total,
    ancestryProfile,

    // Compatibilidad temporal durante CREA-12.
    initiative: initiative.total,
    martialDefense,
    equippedShield: shield?.value ?? 0,

    breakdowns: {
      healthMax: health,
      manaMax: mana,
      severeThreshold: severe,
      defensiveBonus: defensive,
      defense,
      maneuverDefense: maneuver,
      mentalDefense: mental,
      bodyDefense: body,
      protection,
      movement,
      initiativeModifier: initiative
    },
    contextual: {
      defense: defenseContextual,
      protection: protectionContextual,
      mentalDefense: mentalContextual,
      bodyDefense: bodyContextual
    },
    equipmentIssues
  };
}

export function resolveDerivedSelector(derived, selector, context = {}) {
  const canonical = normalizeSelector(selector);
  if (derived?.unavailableDefenses?.includes(canonical)) {
    return {selector:canonical,base:null,contextual:[],total:Number.NaN,unavailable:true};
  }
  const base = number(derived?.[canonical]);
  const contextual = Array.isArray(derived?.contextual?.[canonical])
    ? derived.contextual[canonical]
    : [];
  const applicable = contextual.filter((entry) => contextMatches(entry?.context, context));

  let resolved = base;
  for (const entry of applicable) {
    if (entry.stacking === "max-with-armor" && canonical === "protection") {
      const existingProtection = (derived?.breakdowns?.protection?.contributions ?? [])
        .filter((source) => ["armor", "natural"].includes(source?.equipmentType))
        .reduce((highest, source) => Math.max(highest, number(source.value)), 0);
      resolved += Math.max(0, number(entry.value) - existingProtection);
      continue;
    }
    resolved += number(entry.value);
  }

  return {
    selector: canonical,
    base,
    contextual: applicable,
    total: resolved
  };
}
