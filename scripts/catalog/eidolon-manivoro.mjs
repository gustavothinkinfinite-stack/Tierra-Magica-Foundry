import {resolveBestiaryArt} from "./npc-art.mjs";

// Eidolon Manívoro: ficha y retrato/token aprobados.
// Mecánicas originales de prueba. Nunca se presentan como Manual Maestro.
export const EIDOLON_MANIVORO_BASE = Object.freeze({
  slug:"eidolon-manivoro",name:"Eidolon Manívoro",
  role:"Entidad umbría / depredador arcano",
  threat:"Equilibrada si se la identifica; Peligrosa en una emboscada nocturna",
  concept:"Imitador de sombras que roba Maná e induce percepciones falsas.",
  life:18,defense:15,bodyDefense:12,mentalDefense:16,maneuverDefense:15,
  protection:1,movement:8,initiative:5,mana:8,channelingBonus:3,
  attacks:[{
    name:"Garra Umbría",bonus:6,damage:6,penetration:0,
    damageType:"cortante",damageMode:"letal",
    notes:"Cuerpo a cuerpo; la garra no drena Maná."
  }],
  abilities:[
    {
      slug:"rostro-prestado",name:"Rostro Prestado",kind:"innata-sobrenatural",
      activation:"Acción",actionCost:1,manaCost:1,rangeSpaces:0,
      duration:"Hasta una Escena",
      detectionDifficulty:15,detectionSkills:["PER + Investigación"],
      description:"Copia aproximadamente rostro, silueta, vestimenta aparente y voz de una persona que haya observado un minuto. Si hay sospecha, PER + Investigación DF 15 puede revelar contradicciones.",
      limitations:"No copia recuerdos, conocimientos, olor, equipo ni poderes; no puede mantener varias formas a la vez. El contacto físico y la iluminación intensa sostenida revelan fallas.",
      resolution:"El DJ resuelve las contradicciones; no se generan efectos activos automáticos.",
      target:"Propio",maxActiveInstances:1
    },
    {
      slug:"sorbo-de-mana",name:"Sorbo de Maná",kind:"innata-sobrenatural",
      activation:"Acción",actionCost:1,manaCost:0,rangeSpaces:1,
      duration:"Instantánea",detectionDifficulty:null,detectionSkills:[],
      description:"Objetivo único a 1 espacio; prueba innata propuesta 2d10 + PRE 2 + Canalización 3 (= +5) contra Defensa Mental. En éxito sustrae hasta 2 Maná actual de la víctima y recupera hasta 1 Maná propio, sin superar su máximo, sólo si drenó Maná.",
      limitations:"No drena objetivos con Maná 0, no daña Vida, Trauma, Maná máximo o Acciones y no permite superar la reserva máxima propia.",
      resolution:"El DJ actualiza ambas reservas manualmente. Mecánica original aprobada para prueba, no integrada en la automatización.",
      target:"Una criatura con Maná",attackBonus:5,opposedDefense:"Defensa Mental",maxDrain:2,maxRecovery:1
    },
    {
      slug:"susurro-invasivo",name:"Susurro Invasivo",kind:"innata-sobrenatural",
      activation:"Acción",actionCost:1,manaCost:2,rangeSpaces:4,
      duration:"Hasta el final del siguiente turno del objetivo",
      detectionDifficulty:null,detectionSkills:[],
      description:"Un objetivo que oiga la voz a 4 espacios o menos; prueba propuesta 2d10 + PRE 2 + Canalización 3 (= +5) contra Defensa Mental. En éxito percibe una voz, silueta o advertencia falsa, temporalmente, pero conserva sus decisiones.",
      limitations:"No es Dominación total ni obliga a traicionar, atacar, moverse, perder Acción o borrar recuerdos; requiere vía acústica y afecta un solo objetivo.",
      resolution:"El DJ describe la percepción falseada y el jugador sigue eligiendo sus acciones.",
      target:"Una criatura que escuche",attackBonus:5,opposedDefense:"Defensa Mental",targets:1
    }
  ]
});

export const EIDOLON_VARIANTS=Object.freeze({
  menor:{life:[10,14],defense:[13,15],bodyDefense:[11,13],mentalDefense:[14,16],maneuverDefense:[13,15],protection:[0,1],movement:[7,8],initiative:[3,5],mana:[4,6]},
  base:{life:[16,22],defense:[14,16],bodyDefense:[12,14],mentalDefense:[15,17],maneuverDefense:[14,16],protection:[1,2],movement:[8,8],initiative:[4,6],mana:[6,10]},
  mayor:{life:[24,32],defense:[15,17],bodyDefense:[13,15],mentalDefense:[16,18],maneuverDefense:[15,17],protection:[2,3],movement:[8,9],initiative:[5,7],mana:[10,15]}
});

export function eidolonManivoroCatalog({availableArtFiles=new Set()}={}) {
  const spec=EIDOLON_MANIVORO_BASE;
  const art=resolveBestiaryArt(spec.slug,availableArtFiles);
  return [{
    name:spec.name,type:"npc",
    img:art?.portrait ?? "systems/tierra-magica/assets/icons/actor.svg",
    system:{
      details:{role:spec.role,threat:spec.threat,concept:spec.concept},
      traits:{size:"medium",languages:"",senses:"Oído y percepción arcana cercana, descriptiva",
        notes:"No tiene incorporeidad general ni vuelo ilimitado."},
      biography:[
        "<p><strong>Apariencia:</strong> Entidad nocturna de sombras con alas de velo deshilachado y rasgos humanos mutables. No tiene un cuerpo fijo ni una forma única.</p>",
        "<p><strong>Ecología:</strong> Depredador arcano que se alimenta de Maná actual. Acecha a practicantes de magia en talleres, estaciones y barrios viejos.</p>",
        "<p><strong>Conducta:</strong> Observa, imita a personas, separa a una víctima y la drena; evita confrontaciones abiertas.</p>",
        "<p><strong>Rastros:</strong> Faroles erráticos, sombras desfasadas, reflejos contradictorios y declaraciones de haber visto a alguien en dos sitios.</p>",
        "<p><strong>Movilidad:</strong> Se desliza y planea a ras de suelo. Movimiento 8 no permite atravesar muros ni vuelo ilimitado.</p>"
      ].join(""),
      notes:[
        "<p><strong>Debilidad 1 — Luz intensa sostenida:</strong> La apariencia imitada se deshace al final de su siguiente turno bajo iluminación intensa continua; no causa daño de luz automáticamente.</p>",
        "<p><strong>Debilidad 2 — Reflejo incongruente:</strong> Un espejo pulido muestra una silueta incompleta y permite detectar contradicciones; prueba de Investigación DF 15 cuando sea necesario.</p>",
        "<p><strong>Aventura:</strong> El aprendiz que volvió dos veces: un profesor visto en el taller por la noche estaba en otra ciudad; sus alumnos amanecen sin Maná.</p>",
        "<p><strong>Ficha modular:</strong> los valores y capacidades de esta entrada son editables por el DJ. Variantes menor, base y mayor en la documentación editorial.</p>",
        "<p><strong>Interacciones nuevas:</strong> el drenaje de Maná y la influencia mental se resuelven manualmente; no se activan desde el chat ni producen consecuencias automáticas.</p>"
      ].join(""),
      resources:{health:{value:spec.life,max:spec.life},mana:{value:spec.mana,max:spec.mana}},
      npcProfile:{
        enabled:true,
        source:"Bestiario original: Eidolon Manívoro — arte y ficha aprobados, mecánicas nuevas en prueba, no canon del Manual Maestro",
        life:spec.life,defense:spec.defense,bodyDefense:spec.bodyDefense,
        mentalDefense:spec.mentalDefense,maneuverDefense:spec.maneuverDefense,
        protection:spec.protection,protectionRange:[],movement:spec.movement,
        initiative:spec.initiative,mana:spec.mana,manaSpecified:true,
        channelingBonus:spec.channelingBonus,
        attacks:structuredClone(spec.attacks),abilities:structuredClone(spec.abilities),
        notes:"Cada poder usa 1 Acción y se resuelve manualmente. Sorbo de Maná: PRE 2 + Canalización 3 = +5 contra Defensa Mental; nunca por debajo de 0 Maná ni por encima del máximo. Susurro no controla voluntad ni quita Acciones. Luz y reflejos ofrecen contramedidas."
      }
    },
    prototypeToken:{actorLink:false,name:spec.name,...(art?{texture:{src:art.token}}:{})}
  }];
}
