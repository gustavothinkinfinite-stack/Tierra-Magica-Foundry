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
  const traits = [
    {
      name:"Sentido Agudo", category:"innate", cost:1,
      description:"Elige un sentido ordinario. +1 a pruebas de PER sólo cuando distinguir detalles sutiles mediante ese sentido sea determinante; no mejora iniciativa, ataques ni otros sentidos."
    },
    {
      name:"Visión en la Oscuridad", category:"innate", cost:2,
      description:"Distingue formas, movimiento, obstáculos y criaturas en oscuridad mundana completa hasta 6 espacios como con luz tenue. No distingue color o detalle fino, no atraviesa ocultación y no vence oscuridad sobrenatural."
    },
    {
      name:"Anfibio", category:"innate", cost:1,
      description:"Puede respirar aire y agua ordinarios. No concede Movimiento de nado ni inmunidad a presión, temperatura, corrientes, contaminación, toxinas o deshidratación."
    },
    {
      name:"Trepador Natural", category:"innate", cost:1,
      description:"En superficies físicamente trepables con apoyos razonables, cada espacio de escalada cuesta 1 Movimiento. Superficies peligrosas o sin apoyos pueden seguir exigiendo Atletismo y equipo."
    },
    {
      name:"Cola Prensil", category:"innate", cost:1,
      description:"Órgano posterior capaz de sujetar y manipular objetos ligeros usando la Acción normal correspondiente. No concede Acción, ataque, recarga ni beneficio adicional de escudo."
    },
    {
      name:"Miembros Extra", category:"innate", cost:2,
      description:"Un par adicional de miembros manipuladores funcionales. Puede sostener y manipular hasta dos objetos adicionales; no concede Acciones, Reacciones, ataques, Bloqueos, recargas, Carga ni beneficios de varios escudos."
    },
    {
      name:"Corpulento", category:"innate", cost:2,
      description:"+4 Vida máxima. No aumenta VIG, FUE, Escala, Defensa Corporal, umbral de Daño Grave ni Carga; no se acumula con Masivo.",
      rules:[{ key:"FlatModifier", selector:"healthMax", value:4, label:"Corpulento" }]
    },
    {
      name:"Masivo", category:"innate", cost:3,
      description:"+8 Vida máxima. No aumenta VIG, FUE, Escala, Defensa Corporal, umbral de Daño Grave ni Carga; no se acumula con Corpulento.",
      rules:[{ key:"FlatModifier", selector:"healthMax", value:8, label:"Masivo" }]
    },
    {
      name:"Vínculo Divino", category:"bond", cost:2,
      description:"Registra una deidad o poder divino reconocido y un juramento concreto. Concede acceso a la Fuente Divina apropiada; no concede Habilidades, Disciplina, Hechizos, Maná ni milagros gratuitos."
    },
    {
      name:"Pacto Externo", category:"bond", cost:2,
      description:"Registra entidad o categoría externa, Condición y Precio. Concede acceso a la Fuente Externa asociada; no concede Don, Hechizos, Maná, daño o Defensa adicionales sin un perfil expresamente costeado."
    },
    {
      name:"Prótesis Mayor", category:"acquired", cost:2,
      description:"Prótesis integrada que sustituye una extremidad u órgano funcional importante y permite sus funciones ordinarias. Funciones extraordinarias se pagan como equipo, Proyecto o capacidad separada."
    },
    {
      name:"Afinidad Sobrenatural", category:"innate", cost:1,
      description:"Elige una afinidad sobrenatural estrecha. +1 a PER sólo para advertir manifestaciones directamente perceptibles de esa afinidad; no concede identificación, Arcana, Fuente, Disciplina, Hechizos o Maná."
    },
    {
      name:"Resistencia Ambiental", category:"innate", cost:1,
      description:"Grado Menor: elige una exposición ambiental concreta y obtiene +1 a VIG para resistirla. La versión Significativa de 2 PR se adquiere como entrada separada y reemplaza este beneficio."
    },
    {
      name:"Resistencia Ambiental Significativa", category:"innate", cost:2,
      description:"Elige una exposición ambiental concreta y obtiene Ventaja en pruebas de VIG para resistirla. Reemplaza, no acumula, el grado Menor."
    },
    {
      name:"Vuelo Natural", category:"innate", cost:4,
      description:"Vuelo sostenido hasta el Movimiento normal con anatomía capaz de sostenerlo. No concede Movimiento, Acción o Reacción extra; Carga Pesada o Excesiva lo impide. Excepcional: no comprable con los 3 PR estándar."
    }
  ];
  for (const trait of traits) {
    entries.push(baseEntry("trait",trait.name,{
      category:trait.category,
      tags:["crea-14","canonical","standard-creation"],
      costs:[{ context:"creation", resource:"pr", amount:trait.cost }],
      description:trait.description,
      rules:trait.rules ?? []
    }));
  }
  entries.push(baseEntry("trait","Familiar Mágico",{
    category:"bond",
    tags:["crea-04","crea-05","crea-14","canonical","creation-locked"],
    costs:[
      { context:"creation", resource:"pr", amount:3 },
      { context:"progression", resource:"pd", amount:6 }
    ],
    description:"Rasgo Mayor Vincular de 3 PR. CREA-14 mantiene temporalmente bloqueada su adquisición inicial hasta publicar la plantilla numérica universal del Familiar."
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
  specializations: Object.values(SPECIALIZATIONS).reduce((sum, list) => sum + list.length, 0),
  traits: 16
});
