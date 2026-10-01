import { TM_CONFIG } from "../../scripts/config.mjs";
import { coreCatalog } from "../../scripts/catalog/core-catalog.mjs";
import { acquisitionFromCost, preflightAcquisition } from "../../scripts/rules/acquisition.mjs";
import { deriveDevelopmentBudget, validateCreationState } from "../../scripts/rules/creation.mjs";
import { normalizeSlug } from "../../scripts/rules/identity.mjs";
import {
  minimumSpellRank,
  spellOperationalSkill,
  validateSkillProgression
} from "../../scripts/rules/skills.mjs";

const catalog = coreCatalog();
const clone = (value) => JSON.parse(JSON.stringify(value));

function attributes(values) {
  return Object.fromEntries(Object.keys(TM_CONFIG.attributes).map((key) => {
    const value = Number(values[key] ?? 1);
    return [key, { creationValue:value, baseValue:value, value }];
  }));
}

function skills(ranks = {}) {
  return Object.fromEntries(Object.keys(TM_CONFIG.skills).map((key) => [
    key,
    { rank:Number(ranks[key] ?? 0), temporary:0, other:0 }
  ]));
}

function catalogItem(type, name = null, predicate = null) {
  const found = catalog.find((entry) =>
    entry.type === type &&
    (!name || entry.name === name) &&
    (!predicate || predicate(entry))
  );
  if (!found) throw new Error("Contenido CREA-13 inexistente: " + type + ":" + (name ?? "(selector)"));
  return clone(found);
}

function baseActor(profile) {
  return {
    id: profile.id,
    name: profile.label,
    type: "character",
    system: {
      schemaVersion: 2,
      creation: { status:"building", revision:0, initialReserveGranted:false },
      details: { level:1 },
      attributes: attributes(profile.attributes),
      skills: skills(profile.skills),
      resources: {
        health:{value:1,max:1},
        mana:{value:1,max:1}
      },
      movement:{base:6},
      combat:{
        defensiveRank:Number(profile.defensiveRank ?? 0),
        guardActive:false,parryActive:false,parrySucceeded:false,
        counterattackUsed:false,kineticBarrierActive:false
      },
      magic:{sustainedSpellIds:[]},
      modifiers:{manual:{}},
      status:{trauma:0,fatigue:0,bleeding:0,conditions:"",incapacitated:false},
      currency:{totalCopper:0}
    },
    items: []
  };
}

function paidPhysicalPreflight(actor, candidate) {
  const status = candidate.system?.priceStatus;
  const price = Number(candidate.system?.priceCopper);
  if (status !== "exact" || !Number.isSafeInteger(price) || price < 0) {
    return {
      valid:false,
      issues:[{code:"physical-price",message:candidate.name+" no tiene precio exacto utilizable para Compra libre."}],
      acquisition:null,
      cost:null
    };
  }
  const identity = preflightAcquisition({
    actor,
    candidate:{...candidate,system:{...candidate.system,costs:[{context:"any",resource:"none",amount:0}]}},
    stage:"creation",
    expectedRevision:actor.system.creation.revision
  });
  return {
    ...identity,
    cost:{context:"creation",resource:"pei",amount:price},
    acquisition:acquisitionFromCost(
      {context:"creation",resource:"pei",amount:price},
      {mode:"purchased",stage:"creation"}
    )
  };
}

function acquire(actor, candidate, audit) {
  const physical = ["weapon","armor","shield","equipment","device"].includes(candidate.type) &&
    !(candidate.system?.costs?.length);
  const preflight = physical
    ? paidPhysicalPreflight(actor,candidate)
    : preflightAcquisition({
        actor,
        candidate,
        stage:"creation",
        expectedRevision:actor.system.creation.revision
      });

  audit.push({
    type:candidate.type,
    name:candidate.name,
    valid:preflight.valid,
    cost:preflight.cost ?? null,
    issues:preflight.issues ?? []
  });
  if (!preflight.valid) return false;

  candidate.id ??= actor.id + "-" + candidate.type + "-" + normalizeSlug(candidate.system?.slug || candidate.name);
  candidate.system.acquisition = preflight.acquisition;
  actor.items.push(candidate);
  actor.system.creation.revision += 1;
  return true;
}

function acquireIdentity(actor, audit) {
  for (const type of ["ancestry","origin","background"]) {
    if (!acquire(actor,catalogItem(type),audit)) return false;
  }
  return true;
}

function acquireSpecialization(actor, skill, audit) {
  return acquire(actor,catalogItem("specialization",null,(entry)=>entry.system?.skill===skill),audit);
}

function auditSpellLegality(actor) {
  const issues=[];
  const disciplines=new Set(actor.items.filter((item)=>item.type==="discipline").map((item)=>item.system?.slug));
  for (const spell of actor.items.filter((item)=>item.type==="spell")) {
    const discipline=String(spell.system?.discipline ?? "");
    if (discipline && !disciplines.has(discipline)) {
      issues.push({code:"spell-discipline",spell:spell.name,message:spell.name+" carece de su Disciplina."});
    }
    const skill=spellOperationalSkill(spell.system?.method);
    const rank=Number(actor.system.skills?.[skill]?.rank ?? 0);
    const minimum=minimumSpellRank(spell.system?.grade);
    if (rank<minimum) {
      issues.push({code:"spell-operational-rank",spell:spell.name,skill,rank,minimum,message:spell.name+" excede el rango operativo de "+skill+"."});
    }
  }
  return issues;
}

function validateFixture(actor, acquisitionAudit) {
  const budget=deriveDevelopmentBudget(actor,{skillKeys:Object.keys(TM_CONFIG.skills)});
  const specializations=actor.items
    .filter((item)=>item.type==="specialization")
    .map((item)=>({skill:item.system.skill,name:item.name}));
  const skillValidation=validateSkillProgression({
    skills:actor.system.skills,
    skillDefinitions:TM_CONFIG.skills,
    level:1,
    pdSpent:budget.pdSpent,
    pdTotal:budget.pdTotal,
    specializations,
    creationActive:true
  });
  const creation=validateCreationState(actor,{skillKeys:Object.keys(TM_CONFIG.skills)});
  const spellIssues=auditSpellLegality(actor);
  const acquisitionIssues=acquisitionAudit.flatMap((entry)=>entry.issues);
  const issues=[...creation.issues,...skillValidation.issues,...spellIssues,...acquisitionIssues];
  return {
    valid:issues.length===0,
    issues,
    budget,
    skillValidation,
    acquisitionAudit
  };
}

const PROFILES = Object.freeze([
  {
    id:"C13-01",key:"soldier",label:"Soldado",
    attributes:{fue:3,agi:2,vig:3,int:1,per:1,vol:1,pre:2},
    skills:{martialWeapons:3,athletics:2,intimidation:2,medicine:1},
    specialization:"martialWeapons",defensiveRank:3,
    items:[
      ["technique","Parada"],["technique","Golpe Potente"],["technique","Intercepción"],
      ["weapon","Espada larga"],["armor","Malla"],["shield","Escudo estándar"]
    ]
  },
  {
    id:"C13-02",key:"engineer",label:"Ingeniera",
    attributes:{fue:1,agi:2,vig:2,int:3,per:2,vol:2,pre:1},
    skills:{engineering:3,crafting:2,investigation:2,arcana:2},
    specialization:"engineering",
    items:[["weapon","Daga"],["armor","Armadura ligera"]]
  },
  {
    id:"C13-03",key:"healer",label:"Sanador",
    attributes:{fue:1,agi:1,vig:2,int:2,per:2,vol:3,pre:2},
    skills:{medicine:3,empathy:2,nature:2,religion:2},
    specialization:"medicine",
    items:[["formula","Poción Restauradora"],["formula","Neutralizante Común"],["weapon","Daga"]]
  },
  {
    id:"C13-04",key:"explorer",label:"Exploradora",
    attributes:{fue:2,agi:3,vig:2,int:1,per:3,vol:1,pre:1},
    skills:{rangedWeapons:3,survival:2,stealth:2,athletics:2},
    specialization:"rangedWeapons",
    items:[
      ["technique","Tirador Preparado"],["technique","Recarga Experta"],
      ["weapon","Rifle temprano"],["armor","Armadura ligera"]
    ]
  },
  {
    id:"C13-05",key:"alchemist",label:"Alquimista",
    attributes:{fue:1,agi:2,vig:2,int:3,per:2,vol:2,pre:1},
    skills:{alchemy:3,medicine:2,nature:2,crafting:2},
    specialization:"alchemy",
    items:[
      ["formula","Poción Restauradora"],["formula","Poción de Recuperación Arcana"],
      ["formula","Toxina Debilitante"],["formula","Bomba Incendiaria"],
      ["weapon","Daga"]
    ]
  },
  {
    id:"C13-06",key:"channeler",label:"Canalizador",
    attributes:{fue:1,agi:1,vig:2,int:3,per:2,vol:3,pre:1},
    skills:{channeling:3,ritualism:2,arcana:2},
    disciplines:["evocation","alteration"],
    items:[
      ["spell","Proyectil Ígneo"],["spell","Barrera Cinética"],["spell","Piel Alterada"],
      ["weapon","Daga"]
    ]
  },
  {
    id:"C13-07",key:"bonded",label:"Vinculado",
    attributes:{fue:1,agi:2,vig:2,int:1,per:3,vol:2,pre:2},
    skills:{survival:2,empathy:2,channeling:2,rangedWeapons:2},
    specialization:"rangedWeapons",
    disciplines:["conjuration"],
    items:[
      ["spell","Llamada Menor"],["trait","Familiar Mágico"],
      ["weapon","Arco corto"],["armor","Armadura ligera"]
    ]
  }
]);

function disciplineBySlug(slug) {
  return catalogItem("discipline",null,(entry)=>entry.system?.slug===slug);
}

export function buildCrea13Fixture(key) {
  const profile=PROFILES.find((entry)=>entry.key===key);
  if (!profile) throw new Error("Fixture CREA-13 desconocido: "+key);
  const actor=baseActor(profile);
  const acquisitionAudit=[];
  acquireIdentity(actor,acquisitionAudit);

  if (profile.specialization) acquireSpecialization(actor,profile.specialization,acquisitionAudit);
  for (const slug of profile.disciplines ?? []) acquire(actor,disciplineBySlug(slug),acquisitionAudit);
  for (const [type,name] of profile.items ?? []) acquire(actor,catalogItem(type,name),acquisitionAudit);

  return {
    profile,
    actor,
    validation:validateFixture(actor,acquisitionAudit)
  };
}

export function buildAllCrea13Fixtures() {
  return PROFILES.map((profile)=>buildCrea13Fixture(profile.key));
}

export function unpricedDeviceAudit() {
  return catalog
    .filter((entry)=>entry.type==="device")
    .map((entry)=>({
      name:entry.name,
      slug:normalizeSlug(entry.system?.slug || entry.name),
      priceStatus:entry.system?.priceStatus ?? "unset",
      priceCopper:entry.system?.priceCopper ?? null
    }));
}
