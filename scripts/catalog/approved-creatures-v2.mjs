import { resolveBestiaryArt } from "./npc-art.mjs";

// Tierra Mágica — segunda tanda visual aprobada.
// Cifras nuevas, propuestas para prueba de mesa; no transcriben el Manual Maestro.
// Habilidades descriptivas: se resuelven por el DJ, sin automatizar efectos.
export const SECOND_BATCH_ORIGINAL_CREATURES = Object.freeze([
  {
    slug:"zorro-carmesi",name:"Zorro Carmesí",role:"Bestia mágica menor",size:"small",
    life:9,defense:15,bodyDefense:11,mentalDefense:12,maneuverDefense:14,
    protection:0,movement:8,initiative:5,
    threat:"Favorable; peligro de cacería y rastreo, no de fuerza bruta",
    habitat:"Brezales montañosos, prados rocosos, caminos rurales entre bosques.",
    concept:"Zorro de pelaje rojizo envuelto en hebras de bruma carmesí; es un animal material y escurridizo, no un elemental.",
    appearance:"Orejas puntiagudas, pelo cobrizo realista y cola grande rodeada por filamentos rojos de resonancia tenue.",
    ecology:"Cazador de roedores y aves pequeñas; se acerca a gallineros cuando escasea el alimento. Activo al anochecer.",
    signs:"Pequeñas huellas de zorro en tierra húmeda, pelos rojizos y una neblina rosada que desaparece con el viento.",
    countermeasures:"Usar rastros olfativos y barreras físicas, observar el viento y no confundir bruma luminosa con fuego real.",
    hook:"Los granjeros creen que una llama vaga entre sus gallineros; el zorro busca alimento mientras cazadores furtivos persiguen su piel.",
    attacks:[{name:"Mordida",bonus:4,damage:4,penetration:0,damageType:"perforante",notes:"Mordida ordinaria; no aplica Quemadura ni miedo."}],
    abilities:[{
      slug:"cola-de-bruma",name:"Cola de Bruma",kind:"innata-sobrenatural",activation:"Acción",
      actionCost:1,manaCost:0,rangeSpaces:3,duration:"Unos segundos",
      detectionDifficulty:13,detectionSkills:["PER + Supervivencia","PER + Investigación"],
      description:"Deja una estela de vaho carmesí sobre el terreno que puede confundir la dirección aparente de un rastro reciente a hasta 3 espacios.",
      limitations:"No es fuego, humo que ciegue, invisibilidad, teletransporte ni camuflaje mecánico; no concede bonificaciones o Desventaja automáticas.",
      resolution:"El DJ resuelve la interpretación de las señales con DF 13 cuando resulte pertinente."
    }]
  },
  {
    slug:"carnero-del-alba-dorada",name:"Carnero del Alba Dorada",role:"Bestia mágica menor",size:"large",
    life:18,defense:13,bodyDefense:15,mentalDefense:11,maneuverDefense:14,
    protection:2,movement:6,initiative:2,
    threat:"Equilibrada en pasos estrechos; Favorable con cobertura y distancia",
    habitat:"Cumbres, cornisas de piedra dorada y caminos de alta montaña.",
    concept:"Carnero robusto de lana blanca y cuernos de aspecto pétreo atravesados por filamentos dorados de luz mineral.",
    appearance:"Carnero grande de lana densa y cuernos enrollados, semejantes a roca con pequeñas vetas luminosas.",
    ecology:"Herbívoro de montaña; lame sales minerales. Defiende su rebaño en gargantas cuando no puede retirarse.",
    signs:"Rasguños de pezuñas junto a salientes, lana enganchada a arbustos y polvo mineral brillante en rocas.",
    countermeasures:"No enfrentarlo sobre bordes de precipicio; abrir una vía de retirada y evitar colocarse entre adultos y crías.",
    hook:"Un puente de peregrinos se agrieta antes del alba y los carneros se agrupan en un paso viejo. ¿Perciben fallas de piedra que los ingenieros omitieron?",
    attacks:[{name:"Topetazo",bonus:6,damage:8,penetration:1,damageType:"contundente",notes:"Choque físico. No aplica Derribado ni empuje automático."}],
    abilities:[{
      slug:"resonancia-del-alba",name:"Resonancia del Alba",kind:"innata-sobrenatural",activation:"Acción",
      actionCost:1,manaCost:0,rangeSpaces:3,duration:"Unos segundos",
      detectionDifficulty:13,detectionSkills:["PER + Investigación","PER + Supervivencia"],
      description:"Al golpear suavemente la roca, sus cuernos vibran y hacen visibles grietas preexistentes en piedra cercana, hasta 3 espacios.",
      limitations:"No rompe roca, no conoce rutas seguras de forma infalible, no da bonificaciones de ataque y no crea derrumbes.",
      resolution:"El DJ describe las fracturas realmente presentes; reconocer su naturaleza admite DF 13."
    }]
  },
  {
    slug:"lagarto-de-cristal",name:"Lagarto de Cristal",role:"Bestia mágica menor",size:"medium",
    life:13,defense:15,bodyDefense:13,mentalDefense:11,maneuverDefense:15,
    protection:2,movement:6,initiative:3,
    threat:"Favorable si se controla el terreno; defensivo en roquedales",
    habitat:"Ruinas templadas, canteras abandonadas, laderas secas y oquedades minerales.",
    concept:"Reptil de escamas pétreas y crestas cristalinas azul pálido, adaptado a roquedales arcanamente alterados.",
    appearance:"Lagarto de cuerpo ancho y cola larga, placas de mineral gris y cristales azulados en el lomo.",
    ecology:"Insectívoro y oportunista; absorbe calor en piedras soleadas. No excava minas ni produce gemas explotables.",
    signs:"Roces de escamas minerales, cristales frágiles desprendidos y pequeños insectos agrupados bajo piedras calientes.",
    countermeasures:"Separarlo de la roca continua, aproximarse sin vibraciones bruscas y ofrecer salidas entre los escombros.",
    hook:"Unos canteros dicen que las piedras 'escuchan' sus golpes; el lagarto anida sobre una cámara con el suelo inestable.",
    attacks:[{name:"Mordida",bonus:5,damage:5,penetration:0,damageType:"perforante",notes:"Mordida ordinaria sin veneno ni cristalización."}],
    abilities:[{
      slug:"eco-de-cristal",name:"Eco de Cristal",kind:"innata-sobrenatural",activation:"Acción",
      actionCost:1,manaCost:0,rangeSpaces:3,duration:"Una vibración breve",
      detectionDifficulty:13,detectionSkills:["PER + Investigación","PER + Supervivencia"],
      description:"Las crestas vibran cuando hay golpes o pasos recientes transmitidos por piedra continua en hasta 3 espacios; orienta hacia la vibración.",
      limitations:"No detecta identidades, intenciones ni movimiento sin contacto con la roca; no ve a través de paredes y no concede Percepción infalible.",
      resolution:"El DJ determina si la vibración se transmitió y permite interpretar sus señales con DF 13."
    }]
  },
  {
    slug:"cuervo-de-cobre",name:"Cuervo de Cobre",role:"Bestia mágica menor",size:"small",
    life:8,defense:15,bodyDefense:11,mentalDefense:13,maneuverDefense:14,
    protection:0,movement:8,initiative:5,
    threat:"Favorable; exploración urbana y complicación social",
    habitat:"Murallas antiguas, torres con campanas, ciudades y caminos comerciales.",
    concept:"Córvido de plumas negras con reflejos cobrizos; colecciona dijes y engranajes ligeros, sin ser un autómata.",
    appearance:"Ave negra de pico largo y ojos ámbar, con pequeñas cadenas y piezas de metal ligero entre el plumaje.",
    ecology:"Omnívoro oportunista e inteligente como un cuervo; imita ruidos metálicos que oye en plazas y mercados.",
    signs:"Dijes desaparecidos, marcas de garras en cornisas y tintineos en sitios donde no sopla viento.",
    countermeasures:"Revisar tejados, proteger objetos brillantes y diferenciar repiques naturales de mecanismos inestables.",
    hook:"Una torre de vigilancia suena sin campana y se pierden llaves del archivo municipal; un cuervo está reuniendo piezas para su nido.",
    attacks:[{name:"Picotazo",bonus:4,damage:3,penetration:0,damageType:"perforante",notes:"Ataque defensivo. No desarma ni roba objetos automáticamente."}],
    abilities:[{
      slug:"trino-de-metal",name:"Trino de Metal",kind:"innata-sobrenatural",activation:"Acción",
      actionCost:1,manaCost:0,rangeSpaces:4,duration:"Un tintineo breve",
      detectionDifficulty:13,detectionSkills:["PER + Investigación","PER + Ingeniería"],
      description:"Emite una nota que hace vibrar brevemente piezas metálicas pequeñas y sueltas dentro de 4 espacios, siempre que exista una trayectoria acústica.",
      limitations:"No mueve armas equipadas, no abre cerraduras, no detecta metales ocultos infaliblemente, no inflige daño ni desarma.",
      resolution:"El DJ indica qué piezas ligeras pudieron resonar; reconocer el origen admite DF 13."
    }]
  },
  {
    slug:"nutria-encantada",name:"Nutria Encantada",role:"Bestia mágica menor",size:"medium",
    life:11,defense:14,bodyDefense:12,mentalDefense:12,maneuverDefense:14,
    protection:0,movement:7,initiative:4,
    threat:"Favorable; encuentro de río y protección ambiental",
    habitat:"Riberas limpias, esteros, canales de agua antigua y molinos.",
    concept:"Nutria viva con hilachas de luz acuática tenue entre el pelaje; protege madrigueras cercanas al agua.",
    appearance:"Pelaje marrón mojado, bigotes largos, ojos azul pálido y pequeños remolinos luminosos sobre el agua.",
    ecology:"Depredador de peces y crustáceos. Las alteraciones de corriente le advierten de depredadores y contaminación.",
    signs:"Piedras pulidas en la orilla, peces agrupados fuera de su cauce y pequeñas espirales de espuma azulada.",
    countermeasures:"Evitar contaminar el cauce, buscar el remolino real bajo la luz y no acorralarla cerca del nido.",
    hook:"Los molineros denuncian peces muertos y una nutria que parece guiar viajeros río arriba; un vertido antiguo llega a sus madrigueras.",
    attacks:[{name:"Mordida",bonus:4,damage:4,penetration:0,damageType:"perforante",notes:"Mordida de autodefensa; sin veneno ni condición adicional."}],
    abilities:[{
      slug:"hilo-de-corriente",name:"Hilo de Corriente",kind:"innata-sobrenatural",activation:"Acción",
      actionCost:1,manaCost:0,rangeSpaces:3,duration:"Un remolino breve",
      detectionDifficulty:12,detectionSkills:["PER + Supervivencia","PER + Investigación"],
      description:"Marca durante unos segundos el recorrido de una corriente superficial ya existente en hasta 3 espacios de agua conectada.",
      limitations:"No crea ni controla agua, no empuja criaturas, no permite respirar bajo el agua ni anula una corriente peligrosa.",
      resolution:"El DJ muestra la dirección de flujo que realmente existe; interpretar anomalías admite DF 12."
    }]
  }
]);

const escapeHtml=(x)=>String(x).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
const paragraph=(label,value)=>"<p><strong>"+escapeHtml(label)+":</strong> "+escapeHtml(value)+"</p>";

export function secondBatchCreatureCatalog({availableArtFiles=new Set()}={}) {
  return SECOND_BATCH_ORIGINAL_CREATURES.map((spec)=>{
    const art=resolveBestiaryArt(spec.slug,availableArtFiles);
    const profile={
      enabled:true,
      source:"Bestiario original Tierra Mágica — segunda tanda de arte aprobado, mecánicas propuestas para prueba",
      life:spec.life,defense:spec.defense,bodyDefense:spec.bodyDefense,
      mentalDefense:spec.mentalDefense,maneuverDefense:spec.maneuverDefense,
      protection:spec.protection,protectionRange:[],movement:spec.movement,
      initiative:spec.initiative,mana:0,manaSpecified:false,channelingBonus:null,
      attacks:spec.attacks.map(({name,bonus,damage,penetration,notes})=>({name,bonus,damage,penetration,notes})),
      abilities:spec.abilities.map((ability)=>structuredClone(ability)),
      notes:"Criatura original con imágenes aprobadas y estadísticas propuestas, sin modificación del Manual Maestro. "+spec.countermeasures
    };
    return {
      name:spec.name,type:"npc",
      img:art?.portrait??"systems/tierra-magica/assets/icons/actor.svg",
      system:{
        details:{role:spec.role,threat:spec.threat,concept:spec.concept},
        traits:{size:spec.size,languages:"",senses:"Sentidos naturales y adaptación arcana menor",notes:spec.concept},
        biography:paragraph("Apariencia",spec.appearance)+paragraph("Hábitat",spec.habitat)+
          paragraph("Ecología",spec.ecology)+paragraph("Rastros",spec.signs)+
          paragraph("Contramedidas",spec.countermeasures),
        notes:paragraph("Gancho de aventura",spec.hook)+paragraph("Reglas de mesa",
          "La capacidad innata requiere la Acción indicada y resolución manual del DJ. No crea efectos activos ni concede acciones o penalizadores automáticos."),
        npcProfile:profile,
        resources:{health:{value:spec.life,max:spec.life},mana:{value:0,max:0}}
      },
      prototypeToken:{actorLink:false,name:spec.name,
        width:spec.size==="large"?2:1,height:spec.size==="large"?2:1,
        ...(art?{texture:{src:art.token}}:{})}
    };
  });
}
