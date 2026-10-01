import { STARTER_CONTENT } from "../content.mjs";
import { migrateItemSource, TM_SCHEMA_VERSION } from "../rules/data-model-migration.mjs";
import { normalizeSlug } from "../rules/identity.mjs";

const ANCESTRIES = [
  "Humano","Elfo","Enano","Orco","Troll","Ogro","Goblin","Terio Cánido","Terio Félido","Terio Quelonio"
];

const ORIGINS = [
  "Valdoriano","Broncino","Lysendrino","Ereliano","Solenario","Kharumita",
  "Libre de Nacariel","Vigilia Alta","Risco de Ceniza","Puerto Umbral"
];

const BACKGROUNDS = [
  "Vida de Taller","Trabajo Industrial","Minería y Prospección","Comercio y Mercado","Vida de Mar",
  "Servicio Militar o Guardia","Expedición y Cartografía","Vida Académica","Servicio Sanitario",
  "Administración y Escribanía","Contratista de Rutas Libres","Vida Caravanera",
  "Peregrinación y Hospedería","Vida de Frontera"
];

const DISCIPLINES = [
  ["Evocación","evocation"],["Alteración","alteration"],["Restauración","restoration"],
  ["Percepción","perception"],["Influencia","influence"],["Conjuración","conjuration"]
];

const SPECIALIZATIONS = {
  athletics:["Escalada","Natación","Carrera y resistencia"],
  acrobatics:["Equilibrio","Caídas y aterrizajes","Maniobras aéreas"],
  stealth:["Movimiento silencioso","Infiltración urbana","Camuflaje natural"],
  survival:["Bosque","Montaña","Desierto","Regiones frías"],
  nature:["Botánica","Zoología","Ecosistemas mágicos"],
  investigation:["Archivística","Investigación forense","Criptoanálisis y correlación"],
  persuasion:["Negociación","Diplomacia","Oratoria"],
  deception:["Suplantación","Disfraz","Coartadas e identidades de cobertura"],
  intimidation:["Coacción física","Presión social","Interrogatorio"],
  empathy:["Lectura emocional","Conducta bajo presión","Dinámicas sociales"],
  history:["Historia antigua","Historia política","Historia militar"],
  religion:["Teología comparada","Ritos y liturgia","Cultos y organizaciones religiosas"],
  medicine:["Cirugía","Traumatología","Toxicología"],
  arcana:["Teoría de la Trama","Anomalías y zonas de saturación","Entidades externas","Artefactos mágicos"],
  crafting:["Forja y metal","Carpintería","Cuero y textiles","Vidrio y cristal"],
  engineering:["Vapor","Autómatas","Armamento","Acumuladores arcanos"],
  alchemy:["Medicinales","Potenciadores","Toxinas","Reactivos","Explosivos"],
  thievery:["Cerraduras y mecanismos","Trampas y seguridad física","Carterismo y sustracción discreta"],
  lightWeapons:["Cuchillos y dagas","Espadas ligeras","Armas ligeras arrojadizas"],
  martialWeapons:["Espadas","Hachas","Mazas y martillos","Lanzas"],
  heavyWeapons:["Grandes hojas","Grandes contundentes","Armas de asta pesadas"],
  rangedWeapons:["Arcos","Ballestas","Armas de fuego cortas","Armas de fuego largas"],
  handling:["Monturas","Vehículos terrestres","Maquinaria móvil"],
  piloting:["Dirigibles","Embarcaciones","Vehículos ferroviarios"]
};

function baseEntry(type, name, extra = {}) {
  return {
    name,
    type,
    system: {
      schemaVersion: TM_SCHEMA_VERSION,
      slug: normalizeSlug(name),
      description: "",
      tags: [],
      costs: [{ context:"any", resource:"none", amount:0 }],
      requirementsText: "",
      requirements: null,
      rules: [],
      choices: {},
      provenance: { sourceUuid:"", sourceSchemaVersion:TM_SCHEMA_VERSION, sourceRevision:"crea-11" },
      acquisition: null,
      stacking: "unique",
      legacy: {},
      ...extra
    }
  };
}

export function constructionCatalog() {
  const entries = [];
  for (const name of ANCESTRIES) {
    entries.push(baseEntry("ancestry", name, {
      tags:["crea-06","canonical"],
      description:"Paquete de Ascendencia canónico. El texto literal completo de sus efectos se conserva fuera de este catálogo cuando no está materialmente disponible; CREA-11 no lo reconstruye por inferencia."
    }));
  }
  for (const name of ORIGINS) {
    entries.push(baseEntry("origin", name, {
      tags:["crea-07","canonical"],
      description:"Origen canónico: Familiaridad Cultural + Perfil Lingüístico + una Faceta. Las elecciones variables se almacenan en system.choices."
    }));
  }
  for (const name of BACKGROUNDS) {
    entries.push(baseEntry("background", name, {
      tags:["crea-07","canonical"],
      description:"Trasfondo canónico: Familiaridad Práctica principal + dos Facetas. No concede rangos de Habilidad por sí mismo."
    }));
  }
  for (const [name, slug] of DISCIPLINES) {
    entries.push(baseEntry("discipline", name, {
      slug,
      tags:["crea-02","canonical"],
      costs:[{ context:"any", resource:"pd", amount:2 }],
      requirements:{
        all:[{ type:"skill", key:"channeling", rank:2, basis:"base", scope:"acquisition" }]
      },
      description:"Disciplina mágica binaria. Requiere Canalización Entrenada; máximo inicial 3."
    }));
  }
  for (const [skill, names] of Object.entries(SPECIALIZATIONS)) {
    for (const name of names) {
      entries.push(baseEntry("specialization", name, {
        skill,
        tags:["crea-01","canonical"],
        costs:[{ context:"any", resource:"pd", amount:1 }],
        requirements:{
          all:[{ type:"skill", key:skill, rank:2, basis:"base", scope:"acquisition" }]
        },
        description:"Especialización binaria de "+skill+"; no concede bono numérico universal."
      }));
    }
  }
  entries.push(baseEntry("trait","Familiar Mágico",{
    category:"bond",
    tags:["crea-04","crea-05","canonical"],
    costs:[
      { context:"creation", resource:"pr", amount:3 },
      { context:"progression", resource:"pd", amount:6 }
    ],
    description:"Rasgo Mayor Vincular que habilita un Familiar activo conforme a CREA-05."
  }));
  return entries;
}

export function legacyStarterCatalog() {
  const entries=[];
  for (const [type, list] of Object.entries(STARTER_CONTENT)) {
    for (const raw of list ?? []) entries.push(migrateItemSource({ name:raw.name, type, system:raw.system ?? {} }, { embedded:false }));
  }
  return entries;
}

export function coreCatalog() {
  return [...constructionCatalog(), ...legacyStarterCatalog()];
}

export const CATALOG_COUNTS = Object.freeze({
  ancestries: ANCESTRIES.length,
  origins: ORIGINS.length,
  backgrounds: BACKGROUNDS.length,
  disciplines: DISCIPLINES.length,
  specializations: Object.values(SPECIALIZATIONS).reduce((sum, list) => sum + list.length, 0)
});
