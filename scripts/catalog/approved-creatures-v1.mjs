import { resolveBestiaryArt } from "./npc-art.mjs";

// Tierra Mágica: fichas mecánicas NUEVAS para cinco criaturas visualmente aprobadas.
// No transcribir ni sustituir criaturas del Manual Maestro §23.
// El don es una descripción narrativa de 1 Acción: sin estados, hechizos ni daño automático.
export const APPROVED_ORIGINAL_CREATURES = Object.freeze([
  {
    slug:"ciervo-astral",name:"Ciervo Astral",role:"Bestia mágica menor",size:"large",
    life:14,defense:14,bodyDefense:14,mentalDefense:13,maneuverDefense:14,
    protection:0,movement:8,initiative:4,
    threat:"Favorable si se lo acorrala; encuentro de exploración",
    habitat:"Bosques antiguos, pasos de montaña y cabeceras de ríos.",
    concept:"Cérvido nocturno de astas que concentran reflejos estelares. Es huidizo y territorial solo cerca de sus crías.",
    appearance:"Pelaje gris claro, pupilas pálidas y astas cristalinas de luminiscencia azul; no tiene alas ni teletransportación.",
    ecology:"Se alimenta de brotes y minerales de las laderas; retorna a claros elevados durante noches despejadas.",
    signs:"Astillas traslúcidas caídas de las astas, marcas de pezuña en laderas inaccesibles y reflejos azulados en corteza húmeda.",
    countermeasures:"Avanzar sin perseguir crías, ocultar fuentes intensas de luz y cercar rutas naturales sin magia.",
    hook:"Las señales luminosas en el camino de un convoy ocultan un paso de montaña seguro; cazadores de trofeos amenazan la zona.",
    attacks:[{name:"Cornamenta",bonus:5,damage:6,penetration:0,damageType:"perforante",notes:"Ataque físico; no otorga carga ni empuje automático."}],
    abilities:[{
      slug:"sendero-de-astas",name:"Sendero de Astas",kind:"innata-sobrenatural",activation:"Acción",
      actionCost:1,manaCost:0,rangeSpaces:4,duration:"Unos segundos",
      detectionDifficulty:12,detectionSkills:["PER + Supervivencia","PER + Investigación"],
      description:"Las astas reflejan un trazado tenue sobre el suelo en hasta 4 espacios; indica por dónde pasó el ciervo durante la escena. No revela destinos futuros.",
      limitations:"No ilumina todo el bosque, no crea un mapa verdadero, no modifica Movimiento, no cura ni transporta criaturas.",
      resolution:"El DJ describe las huellas de luz; identificar su origen admite DF 12 si hay incertidumbre."
    }]
  },
  {
    slug:"arana-de-campanario",name:"Araña de Campanario",role:"Constructo arcano-industrial",size:"large",
    life:18,defense:13,bodyDefense:null,mentalDefense:12,maneuverDefense:15,
    protection:3,movement:6,initiative:3,
    threat:"Equilibrada en ruinas verticales; Favorable en terreno despejado",
    habitat:"Campanarios abandonados, relojes viejos, arcos de piedra y bóvedas de metal.",
    concept:"Antiguo mecanismo arácnido de custodia, ensamblado con campanas de bronce, patas articuladas y un núcleo resonante.",
    appearance:"Caparazón de hierro ennegrecido y bronce, ojos minerales y pequeñas campanas que emiten fulgor azul.",
    ecology:"No se reproduce ni come: persiste mediante piezas recuperadas de mecanismos antiguos y energía residual.",
    signs:"Cables tensados a alturas improbables, polvo vibrando antes de cada repique y campanillas colgadas en arcos derruidos.",
    countermeasures:"Inmovilizar articulaciones, explorar rutas sin campanas y retirar fuentes de resonancia. No atribuirle consciencia humana.",
    hook:"Las campanas de un monasterio vacío vuelven a sonar; un mecanismo de guardia confunde a los visitantes con intrusos.",
    attacks:[{name:"Pinza articulada",bonus:5,damage:7,penetration:1,damageType:"perforante",notes:"Ataque mecánico; ninguna inmovilización automática."}],
    abilities:[{
      slug:"repique-hueco",name:"Repique Hueco",kind:"resonancia-de-constructo",activation:"Acción",
      actionCost:1,manaCost:0,rangeSpaces:6,duration:"Un repique breve",
      detectionDifficulty:14,detectionSkills:["PER + Investigación","PER + Ingeniería"],
      description:"Hace sonar una de sus campanas; el eco parece proceder de otro arco o de una torre próxima dentro de 6 espacios.",
      limitations:"No ensordece, no paraliza, no da Desventaja automática y no controla la voluntad. Requiere propagación acústica.",
      resolution:"Engaño espacial auditivo; el DJ adjudica observación y origen real con DF 14."
    }]
  },
  {
    slug:"jabali-igneo",name:"Jabalí Ígneo",role:"Bestia mágica menor",size:"large",
    life:20,defense:12,bodyDefense:16,mentalDefense:11,maneuverDefense:15,
    protection:2,movement:7,initiative:2,
    threat:"Equilibrada por su fuerza en terreno estrecho",
    habitat:"Turberas calientes, humedales volcánicos, bordes de hornos naturales y campos cenicientos.",
    concept:"Jabalí de gran tamaño con piel endurecida, pelos chamuscados y grietas de calor bajo el lomo.",
    appearance:"Colmillos largos, ojos ámbar, barro pegado a cerdas negras y brasas rojizas tenues en cicatrices del pelaje.",
    ecology:"Omnívoro que hoza raíces y tubérculos de suelo cálido; arremete para defender su alimento y las crías.",
    signs:"Surcos de hocico, huellas tibias en barro frío, vegetación seca y olor a turba caliente.",
    countermeasures:"Evitar quedar entre madre y crías, utilizar terreno firme y barreras, no ofrecer persecuciones en línea recta.",
    hook:"Las acequias de una granja se calientan de noche: el animal excava raíces cerca de un canal de vapor agrietado.",
    attacks:[{name:"Colmillos",bonus:6,damage:8,penetration:1,damageType:"perforante",notes:"Embestida narrativa; no causa Derribado o desplazamiento automático."}],
    abilities:[{
      slug:"resuello-de-brasa",name:"Resuello de Brasa",kind:"innata-sobrenatural",activation:"Acción",
      actionCost:1,manaCost:0,rangeSpaces:2,duration:"Un resoplido",
      detectionDifficulty:12,detectionSkills:["PER + Supervivencia","PER + Investigación"],
      description:"Expele vaho y algunas chispas calientes a muy corta distancia, capaces de prender yesca completamente expuesta a discreción del DJ.",
      limitations:"No es una bola de fuego, no causa daño directo a criaturas, no inflige Quemadura ni genera área de combate.",
      resolution:"El DJ evalúa si hay combustible adecuado; cualquier daño posterior se resuelve con reglas existentes."
    }]
  },
  {
    slug:"garza-de-cristal",name:"Garza de Cristal",role:"Bestia mágica menor",size:"medium",
    life:9,defense:15,bodyDefense:11,mentalDefense:13,maneuverDefense:15,
    protection:0,movement:7,initiative:5,
    threat:"Favorable; encuentro de investigación, no de exterminio",
    habitat:"Estanques de acueductos antiguos, arroyos transparentes y marismas protegidas.",
    concept:"Ave zancuda real con plumaje blanco y superficies cristalinas que refractan el sol y la luna.",
    appearance:"Cuello largo, plumas blancas y azul pálido, pico oscuro, patas delgadas y destellos finos entre las alas.",
    ecology:"Se alimenta de peces e insectos; el reflejo de sus plumas permite ocultar el nido entre aguas someras.",
    signs:"Destellos en bancos de niebla, escamas de peces apenas movidas, plumas translúcidas entre carrizos.",
    countermeasures:"Observar desde la sombra, evitar redes que dañen alas y reconocer reflejos falsos antes de aproximarse.",
    hook:"Un mensajero se extravía siguiendo una luz al amanecer; el ave protege su nido en un acueducto inestable.",
    attacks:[{name:"Picotazo",bonus:4,damage:3,penetration:0,damageType:"perforante",notes:"Autodefensa; no tiene poder ofensivo de luz."}],
    abilities:[{
      slug:"refraccion-de-orilla",name:"Refracción de Orilla",kind:"innata-sobrenatural",activation:"Acción",
      actionCost:1,manaCost:0,rangeSpaces:3,duration:"Unos segundos",
      detectionDifficulty:13,detectionSkills:["PER + Investigación","PER + Supervivencia"],
      description:"Dobla un reflejo cercano al agua, haciendo que parezca haber otra garza a pocos espacios de la verdadera.",
      limitations:"No crea materia, no se vuelve invisible y no otorga Defensa adicional ni inmunidad a ataques.",
      resolution:"El DJ permite investigar la reflexión con DF 13 cuando exista cobertura acuática e incertidumbre."
    }]
  },
  {
    slug:"sabueso-espectral",name:"Sabueso Espectral",role:"Bestia mágica menor",size:"medium",
    life:14,defense:14,bodyDefense:13,mentalDefense:12,maneuverDefense:14,
    protection:1,movement:8,initiative:4,
    threat:"Favorable aislado; Equilibrada si guía una manada",
    habitat:"Caminos rurales, bosques cubiertos de bruma y ruinas donde hubo rituales de rastreo.",
    concept:"Cánido material, de pelaje oscuro y marcas luminosas que parecen vapor; no es un no muerto ni atraviesa paredes.",
    appearance:"Orejas altas, ojos azules, pelo largo negro, una columna de runas discretas y vaho celeste sobre el lomo.",
    ecology:"Carnívoro rastreador que sigue rastros de sangre y olores residuales; a veces es adoptado por cazadores.",
    signs:"Huellas de patas reales en barro, marcas de garras y condensación fría que desaparece con el viento.",
    countermeasures:"Cruzar agua corriente, romper rastros olorosos y evitar persecuciones sin cobertura; se le puede alimentar o distraer.",
    hook:"Cada noche un sabueso negro ronda un molino cerrado, atraído por un rastro arcano procedente de un antiguo crimen.",
    attacks:[{name:"Mordida",bonus:6,damage:6,penetration:0,damageType:"perforante",notes:"Mordida natural; no induce Miedo ni desgarro persistente."}],
    abilities:[{
      slug:"rastro-velado",name:"Rastro Velado",kind:"innata-sobrenatural",activation:"Acción",
      actionCost:1,manaCost:0,rangeSpaces:4,duration:"Una breve concentración",
      detectionDifficulty:13,detectionSkills:["PER + Supervivencia","PER + Investigación"],
      description:"Percibe olores y residuos arcanos que permanecen en una ruta reciente de la escena, en hasta 4 espacios; indica una dirección, nunca una identidad exacta.",
      limitations:"No ve a través de paredes, no persigue a otra dimensión, no garantiza éxito y no detecta cualquier magia arbitrariamente.",
      resolution:"El DJ valora tiempo transcurrido, clima y continuidad del rastro; DF 13 para reconocer las señales del sabueso."
    }]
  }
]);

const esc=(s)=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
const para=(label,value)=>"<p><strong>"+esc(label)+":</strong> "+esc(value)+"</p>";
export function fiveApprovedCreatureCatalog({availableArtFiles=new Set()}={}) {
  return APPROVED_ORIGINAL_CREATURES.map((spec)=>{
    const art=resolveBestiaryArt(spec.slug,availableArtFiles);
    const base={
      enabled:true,
      source:"Bestiario original Tierra Mágica — propuesta mecánica de cinco criaturas con arte aprobado",
      life:spec.life,defense:spec.defense,bodyDefense:spec.bodyDefense,
      mentalDefense:spec.mentalDefense,maneuverDefense:spec.maneuverDefense,
      protection:spec.protection,protectionRange:[],movement:spec.movement,
      initiative:spec.initiative,mana:0,manaSpecified:false,channelingBonus:null,
      attacks:spec.attacks.map(({name,bonus,damage,penetration,notes})=>({name,bonus,damage,penetration,notes})),
      abilities:spec.abilities.map(a=>structuredClone(a)),
      notes:"Perfil original de pruebas; no modifica el Manual Maestro. "+spec.countermeasures
    };
    return {
      name:spec.name,type:"npc",
      img:art?.portrait??"systems/tierra-magica/assets/icons/actor.svg",
      system:{
        details:{role:spec.role,threat:spec.threat,concept:spec.concept},
        traits:{size:spec.size,languages:"",senses:"Sentidos naturales y alteración menor",notes:spec.concept},
        biography:para("Apariencia",spec.appearance)+para("Hábitat",spec.habitat)+
          para("Ecología",spec.ecology)+para("Rastros",spec.signs)+para("Contramedidas",spec.countermeasures),
        notes:para("Gancho de aventura",spec.hook)+
          para("Dirección de juego","La capacidad especial se resuelve manualmente. No concede Acciones, penalizadores ni condiciones automáticas."),
        npcProfile:base,
        resources:{health:{value:spec.life,max:spec.life},mana:{value:0,max:0}}
      },
      prototypeToken:{actorLink:false,name:spec.name,width:spec.size==="large"?2:1,height:spec.size==="large"?2:1,
        ...(art?{texture:{src:art.token}}:{})}
    };
  });
}
