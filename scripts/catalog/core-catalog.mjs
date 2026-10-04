import { STARTER_CONTENT } from "../content.mjs";
import { migrateItemSource, TM_SCHEMA_VERSION } from "../rules/data-model-migration.mjs";
import { normalizeSlug } from "../rules/identity.mjs";
import { approvedWeaponVariantSources } from "./weapon-variants-approved.mjs";
import { approvedSpecialLightVariantSources } from "./weapon-variants-special-light-approved.mjs";

const ANCESTRIES = [
  ["Humano","Familia humana; Don sin Forma se registra mediante sus Rasgos elegidos."],
  ["Enano","Paquete Enano: Escala Pequeña, Movimiento 5, Cuerpo de Piedra y Sangre de Metal."],
  ["Elfo","Paquete Élfico: Escala Mediana, Movimiento 6, Sentidos Élficos y Resonancia de la Savia."],
  ["Orco","Paquete Orco: Escala Mediana, Movimiento 6, Complexión Orca y Voluntad del Colmillo."],
  ["Goblin","Variante goblinoide Pequeña con Ojo para la Oportunidad y Escurridizo."],
  ["Hobgoblin","Variante goblinoide Mediana con Ojo para la Oportunidad; la disciplina organizada es cultural."],
  ["Bugbear","Variante goblinoide Mediana con Ojo para la Oportunidad y Complexión Bugbear."],
  ["Terio/Anihombre","Familia Teria. Debe anotarse Linaje, Variedad y Adaptaciones del paquete racial."],
  ["Hada","Variante Feérica Pequeña con Movimiento terrestre 5 y Movimiento aéreo inicial 6 limitado."],
  ["Sátiro","Variante Feérica Mediana con Paso de Cabra y cuernos naturales."],
  ["Dríade","Variante Feérica Mediana con Vínculo Arbóreo y Enraizar."],
  ["Silfo","Variante Feérica Mediana con Cuerpo del Viento."],
  ["Ankar","Paquete Ankar: Sentido del Umbral y Custodia del Alma."],
  ["Cristálido de Matriz Mixta","Paquete Cristálido básico: Matriz Mixta, Resonancia Arcana y Conductor Vivo."],
  ["Verdante","Paquete Verdante. Debe anotarse la Adaptación de Bioma elegida."],
  ["Micelio","Paquete Micelio: Sustento Fúngico, Quimiosensibilidad y Enlace Micelial."],
  ["Coralio","Paquete Coralio: anfibio, Movimiento terrestre 5/acuático 6, Esqueleto Coralino y Sentido de Corriente."]
];

const ORIGINS = [
  {
    name:"Valdoriano", language:"Valdoriano",
    familiarity:"Vida cotidiana, instituciones y geografía ordinaria de Valdoria.",
    facets:["Fueros y administración","Servicio cívico y milicias","Caballería y vida regional"]
  },
  {
    name:"Broncino", language:"Broncino",
    familiarity:"Vida cotidiana, instituciones y geografía ordinaria de la Liga de Bronce.",
    facets:["Mercados y contratos","Industria y talleres","Trabajo organizado y gremios"]
  },
  {
    name:"Lysendrino", language:"Lysendrino",
    familiarity:"Vida cotidiana, instituciones y geografía ordinaria de Lysendra.",
    facets:["Academias y rivalidades","Archivos y bibliotecas","Laboratorios y debate técnico"]
  },
  {
    name:"Ereliano", language:"Ereliano",
    familiarity:"Vida cotidiana, instituciones y geografía ordinaria de Erelia.",
    facets:["Autonomía local","Ríos y bosques","Exploración y gestión del territorio"]
  },
  {
    name:"Solenario", language:"Solenario",
    familiarity:"Vida cotidiana, instituciones y geografía ordinaria de Solenar.",
    facets:["Hospitalidad y peregrinación","Caravanas y rutas","Contratos y santuarios"]
  },
  {
    name:"Kharumita", language:"Kharumita",
    familiarity:"Vida cotidiana, instituciones y geografía ordinaria de Kharum.",
    facets:["Talleres y genealogías","Obras públicas","Ingeniería y tradición comunitaria"]
  },
  {
    name:"Libre de Nacariel", language:"Nacarielense",
    familiarity:"Vida cotidiana, instituciones portuarias y geografía ordinaria de Nacariel.",
    facets:["Navegación y seguros","Contratos portuarios","Comercio exterior"]
  },
  {
    name:"Vigilia Alta", language:"Lysendrino",
    familiarity:"Vida cotidiana, instituciones y rutas de Vigilia Alta.",
    facets:["Dirigibles y rutas aéreas","Astronomía","Islas flotantes y observación"]
  },
  {
    name:"Risco de Ceniza", language:"Valdoriano",
    familiarity:"Vida cotidiana de la frontera minera de Risco de Ceniza.",
    facets:["Minería arcana","Compañías y concesiones","Vida de frontera peligrosa"]
  },
  {
    name:"Puerto Umbral", language:"Solenario",
    familiarity:"Vida cotidiana del puerto fronterizo de Puerto Umbral.",
    facets:["Expediciones oceánicas","Mercenarios y guardias","Contrabando y rutas de frontera"]
  }
];

const BACKGROUNDS = [
  {name:"Vida de Taller", familiarity:"Trabajo cotidiano en un taller.", facets:["Herramientas y mantenimiento","Materiales y proveedores","Gremios y encargos"]},
  {name:"Trabajo Industrial", familiarity:"Planta, fábrica o instalación productiva.", facets:["Vapor y maquinaria","Seguridad y turnos","Logística de planta"]},
  {name:"Minería y Prospección", familiarity:"Minas, canteras y campamentos de prospección.", facets:["Vetas y terreno","Seguridad de mina","Concesiones y campamentos"]},
  {name:"Comercio y Mercado", familiarity:"Compra, venta y abastecimiento.", facets:["Mercados mayoristas","Contratos y crédito","Proveedores y rutas"]},
  {name:"Vida de Mar", familiarity:"Trabajo cotidiano a bordo o en muelles.", facets:["Cubierta y guardias","Puertos y mareas","Carga y mantenimiento"]},
  {name:"Servicio Militar o Guardia", familiarity:"Disciplina, patrulla y cadena de mando.", facets:["Guardias y rondas","Logística militar","Reglamentos y fortificaciones"]},
  {name:"Expedición y Cartografía", familiarity:"Campamentos, rutas y registro de terreno.", facets:["Mapas y notas de campo","Campamentos y suministros","Permisos y expediciones"]},
  {name:"Vida Académica", familiarity:"Instituciones de estudio e investigación.", facets:["Archivos y bibliotecas","Laboratorios y seminarios","Redes académicas"]},
  {name:"Servicio Sanitario", familiarity:"Hospitales, clínicas o puestos de socorro.", facets:["Triage y admisión","Instrumental y suministros","Organización de sala"]},
  {name:"Administración y Escribanía", familiarity:"Oficinas, registros y documentación.", facets:["Formularios y archivos","Permisos y licencias","Correspondencia y protocolo"]},
  {name:"Contratista de Rutas Libres", familiarity:"Contratos de exploración, escolta o recuperación.", facets:["Negociación de contratos","Permisos y reclamaciones","Logística de misión"]},
  {name:"Vida Caravanera", familiarity:"Viajes prolongados con convoyes.", facets:["Campamentos y animales","Rutas y puestos","Mercancías y seguridad"]},
  {name:"Peregrinación y Hospedería", familiarity:"Santuarios, caminos de peregrinos y alojamiento.", facets:["Hospitalidad","Calendarios y rutas sagradas","Administración de viajeros"]},
  {name:"Vida de Frontera", familiarity:"Asentamientos con recursos escasos y amenazas cercanas.", facets:["Reparaciones improvisadas","Puestos y alarmas","Intercambio entre comunidades"]}
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
      provenance: { sourceUuid:"", sourceSchemaVersion:TM_SCHEMA_VERSION, sourceRevision:"crea-14" },
      acquisition: null,
      stacking: "unique",
      legacy: {},
      ...extra
    }
  };
}

export function constructionCatalog() {
  const entries = [];
  for (const [name, description] of ANCESTRIES) {
    entries.push(baseEntry("ancestry", name, {
      tags:["crea-14","canonical","standard-creation"],
      description,
      requirementsText:"Aplicar el paquete racial correspondiente del Manual Maestro. Registrar cualquier elección interna necesaria."
    }));
  }
  for (const origin of ORIGINS) {
    entries.push(baseEntry("origin", origin.name, {
      tags:["crea-14","canonical","standard-creation"],
      familiarity:origin.familiarity,
      languageProfile:"Común de Concordia + " + origin.language,
      facetOptions:origin.facets.join("; "),
      selectedFacet:"",
      description:
        "Origen canónico. Familiaridad Cultural: " + origin.familiarity +
        " Perfil Lingüístico: Común de Concordia + " + origin.language +
        ". Elige una Faceta de Origen: " + origin.facets.join("; ") +
        ". No concede rangos de Habilidad ni bonos numéricos.",
      rules:[{key:"RollOption",option:"origin:"+normalizeSlug(origin.name)}]
    }));
  }
  for (const background of BACKGROUNDS) {
    entries.push(baseEntry("background", background.name, {
      tags:["crea-14","canonical","standard-creation"],
      familiarity:background.familiarity,
      facetOptions:background.facets.join("; "),
      selectedFacets:"",
      description:
        "Trasfondo canónico. Familiaridad Práctica: " + background.familiarity +
        " Elige dos Facetas: " + background.facets.join("; ") +
        ". Una de las dos puede sustituirse por Lengua de trabajo para aprender una lengua regional adicional. No concede rangos de Habilidad ni bonos numéricos.",
      rules:[{key:"RollOption",option:"background:"+normalizeSlug(background.name)}]
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
    tags:["crea-04","crea-05","crea-14","canonical","standard-creation"],
    costs:[
      { context:"creation", resource:"pr", amount:3 },
      { context:"progression", resource:"pd", amount:6 }
    ],
    description:"Rasgo Mayor Vincular de 3 PR. Disponible en creación con Vínculo I y uno de cuatro perfiles iniciales: Compañero, Explorador, Guardián o Místico. No concede Maná ni economía de turno adicional al propietario."
  }));
  return entries;
}

export function legacyStarterCatalog() {
  const entries=[];
  for (const [type, list] of Object.entries(STARTER_CONTENT)) {
    for (const raw of list ?? []) entries.push(migrateItemSource({ name:raw.name, type, system:raw.system ?? {} }, { embedded:false }));
  }
  for (const raw of [...approvedWeaponVariantSources(), ...approvedSpecialLightVariantSources()]) {
    entries.push(migrateItemSource(raw,{embedded:false}));
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
