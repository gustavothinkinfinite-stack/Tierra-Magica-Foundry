import { npcReferenceCatalog } from "./npc-catalog.mjs";
import { resolveBestiaryArt } from "./npc-art.mjs";

// Criaturas de diseño original: propuestas editoriales, NO transcripciones
// del Manual Maestro. Los valores copiados del lobo conservan su procedencia.
export const ORIGINAL_BESTIARY_PROFILES = Object.freeze([
  Object.freeze({
    slug:"lobo-del-eco-muerto",
    name:"Lobo del Eco Muerto",
    role:"Bestia mágica menor",
    source:"Bestiario original — propuesta editorial fase 2 (pendiente de canon)",
    concept:"Cánido nocturno de resonancia mágica menor; engaña mediante ecos de sonidos aprendidos.",
    threat:"Favorable con preparación; Equilibrada en emboscada (contextual)",
    habitat:"Bosques templados, linderos agrícolas y ruinas rurales.",
    behavior:"Acecha al ganado, reproduce llamadas y se retira ante una resistencia organizada.",
    abilities:Object.freeze([
      Object.freeze({
        slug:"eco-robado",
        name:"Eco Robado",
        kind:"innata-sobrenatural",
        activation:"Acción",
        actionCost:1,
        manaCost:0,
        rangeSpaces:4,
        memoryHours:24,
        duration:"Un sonido breve (unos segundos)",
        detectionDifficulty:14,
        detectionSkills:["PER + Investigación","PER + Supervivencia"],
        description:"Reproduce un sonido breve oído durante las últimas 24 horas (balido, silbido, llamada corta o golpe). Puede parecer originarse en un punto a un máximo de 4 espacios, siempre que exista recorrido acústico posible. Identificar una anomalía no revela automáticamente la ubicación del lobo.",
        limitations:"No inventa sonidos, no mantiene conversaciones, no crea voces simultáneas ni controla la voluntad. No atraviesa barreras acústicas, no impone movimiento, miedo o Desventaja automática.",
        resolution:"Resolución narrativa por el DJ; no crea efectos activos ni realiza tiradas automáticas."
      })
    ])
  })
]);

export function originalBestiaryCatalog({availableArtFiles = new Set()} = {}) {
  // Hereda solo números operativos y mordida del lobo ordinario del Manual §23.
  const ordinaryWolf=npcReferenceCatalog().find((entry)=>entry.name==="Lobo");
  if(!ordinaryWolf) throw new Error("Falta perfil canónico de Lobo.");
  return ORIGINAL_BESTIARY_PROFILES.map((spec)=>{
    const actor=structuredClone(ordinaryWolf);
    const art=resolveBestiaryArt(spec.slug,availableArtFiles);
    actor.name=spec.name;
    actor.img=art?.portrait ?? "systems/tierra-magica/assets/icons/actor.svg";
    actor.system.details={
      role:spec.role,
      threat:spec.threat,
      concept:spec.concept
    };
    actor.system.traits={size:"medium",languages:"",senses:"Oído y olfato naturales",notes:"Cánido vivo, no espíritu ni no muerto."};
    actor.system.biography="<p><strong>Lobo del Eco Muerto.</strong> Cánido nocturno de pelaje gris ceniza, ojos pálidos y resonancia azul tenue bajo la mandíbula. Escucha las señales del ganado y reproduce llamadas breves para separar a sus presas.</p>"+
      "<p><strong>Ecología:</strong> bosques templados, linderos agrícolas y ruinas rurales; depredador solitario. Evita confrontaciones prolongadas y se retira si pierde la ventaja.</p>"+
      "<p><strong>Señales:</strong> silbidos imposibles, balidos fuera del corral, huellas de lobo, pelos gris azulado y rastros de mordidas comunes.</p>"+
      "<p><strong>Contramedidas:</strong> cambiar llamadas, vigilar en parejas, iluminar espacios despejados y seguir sus rastros.</p>";
    actor.system.notes="<p><strong>Propuesta editorial pendiente de canon.</strong> No sustituye al lobo común. Eco Robado se resuelve narrativamente: 1 Acción, 4 espacios, sonidos de hasta 24 h, DF 14 para reconocer anomalías. No produce miedo, movimiento forzoso ni acciones extra.</p>"+
      "<p><strong>Aventura:</strong> La voz detrás del corral. Investigar pérdidas de ganado; seguir huellas hasta conducciones rurales; cazar, capturar o ahuyentar al animal.</p>";
    actor.system.npcProfile={
      ...actor.system.npcProfile,
      source:spec.source,
      attacks:actor.system.npcProfile.attacks.map((attack)=>({
        ...attack, damageType:"perforante",damageMode:"letal",
        notes:"Mordida natural; daño Perforante, modo Letal, aplicación manual."
      })),
      abilities:spec.abilities.map((ability)=>structuredClone(ability)),
      notes:spec.habitat+" "+spec.behavior+
        " Origen de la alteración mágica todavía incierto. "+
        "Las estadísticas de combate proceden del Lobo del Manual Maestro §23; "+
        "Eco Robado es una propuesta original pendiente de validación canónica."
    };
    actor.prototypeToken={
      actorLink:false,
      name:spec.name,
      ...(art?{texture:{src:art.token}}:{})
    };
    return actor;
  });
}
