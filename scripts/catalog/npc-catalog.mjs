import { resolveBestiaryArt } from "./npc-art.mjs";

// Transcripción estructurada de «23. PNJ y criaturas — Perfiles de referencia»
// del Manual Maestro. Los campos no definidos permanecen identificados como tales.
// No se escalan perfiles con nivel, PD o PR de jugadores.
export const NPC_REFERENCE_PROFILES = Object.freeze([
  { slug:"civil", name:"Civil", role:"PNJ", life:12, defense:12, bodyDefense:12, mentalDefense:12, maneuverDefense:12, protection:0, movement:6, initiative:1, attacks:[], notes:"Ataque contextual: el Manual no fija bonificador ni daño." },
  { slug:"bandido", name:"Bandido", role:"PNJ", life:12, defense:13, bodyDefense:12, mentalDefense:12, maneuverDefense:13, protection:1, movement:6, initiative:2, attacks:[{name:"Espada corta",bonus:4,damage:6},{name:"Arco corto",bonus:4,damage:6}] },
  { slug:"guardia", name:"Guardia", role:"PNJ", life:14, defense:14, bodyDefense:13, mentalDefense:12, maneuverDefense:14, protection:2, movement:6, initiative:2, attacks:[{name:"Lanza",bonus:4,damage:7,penetration:1,notes:"Alcance"}] },
  { slug:"soldado", name:"Soldado", role:"PNJ", life:14, defense:14, bodyDefense:13, mentalDefense:13, maneuverDefense:15, protection:3, movement:6, initiative:3, attacks:[{name:"Arma marcial",bonus:5,damage:"7–8",penetration:1,notes:"El Manual deja el daño dentro de este intervalo; elegir según arma."}] },
  { slug:"veterano", name:"Veterano", role:"PNJ", life:16, defense:16, bodyDefense:14, mentalDefense:14, maneuverDefense:17, protection:3, movement:6, initiative:4, attacks:[{name:"Ataque",bonus:7,damage:8,penetration:1}] },
  { slug:"tirador", name:"Tirador", role:"PNJ", life:12, defense:14, bodyDefense:12, mentalDefense:13, maneuverDefense:13, protection:1, movement:6, initiative:4, attacks:[{name:"Rifle",bonus:7,damage:7,penetration:3}] },
  { slug:"canalizador-hostil", name:"Canalizador hostil", role:"PNJ", life:12, defense:13, bodyDefense:12, mentalDefense:15, maneuverDefense:12, protection:0, protectionRange:[0,1], movement:6, initiative:3, mana:15, channelingBonus:6, attacks:[], notes:"Protección 0–1 según equipo. El Manual especifica Canalización +6, pero no un hechizo ni ataque concreto." },
  { slug:"lobo", name:"Lobo", role:"Bestia", life:10, defense:14, bodyDefense:13, mentalDefense:11, maneuverDefense:13, protection:0, movement:8, initiative:4, attacks:[{name:"Mordida",bonus:5,damage:5}] },
  { slug:"ogro", name:"Ogro", role:"Gigante", life:28, defense:11, bodyDefense:16, mentalDefense:11, maneuverDefense:17, protection:2, movement:6, initiative:1, attacks:[{name:"Garrote",bonus:7,damage:11,penetration:1}] },
  { slug:"centinela-de-bronce", name:"Centinela de Bronce", role:"Constructo", life:22, defense:12, bodyDefense:null, mentalDefense:12, maneuverDefense:16, protection:5, movement:4, initiative:1, attacks:[{name:"Golpe",bonus:6,damage:8,penetration:2}], notes:"Defensa Corporal — (no aplicable); la Defensa Mental 12 sólo se usa frente a efectos capaces de afectar al constructo." },
  { slug:"troll-dominante", name:"Troll dominante", role:"Gigante", life:32, defense:13, bodyDefense:17, mentalDefense:13, maneuverDefense:18, protection:4, movement:6, initiative:3, attacks:[{name:"Garra",bonus:7,damage:9,penetration:1},{name:"Martillo",bonus:7,damage:11,penetration:2}], notes:"El Manual indica que puede incluir Barrido, empuje reactivo, descarga y dos Reacciones entre sus turnos; no se activan automáticamente sin perfil específico." }
]);

const finite = (value) => typeof value === "number" && Number.isFinite(value);

// Conserva el dato «—» del Centinela y el intervalo de Protección del Canalizador.
export function npcReferenceCatalog({ availableArtFiles = new Set() } = {}) {
  return NPC_REFERENCE_PROFILES.map((entry) => {
    const art=resolveBestiaryArt(entry.slug, availableArtFiles);
    const profile = {
      enabled:true,
      source:"Manual Maestro §23 — PNJ y criaturas",
      life:entry.life,
      defense:entry.defense,
      bodyDefense:entry.bodyDefense,
      mentalDefense:entry.mentalDefense,
      maneuverDefense:entry.maneuverDefense,
      protection:entry.protection,
      protectionRange:entry.protectionRange ?? [],
      movement:entry.movement,
      initiative:entry.initiative,
      // El Manual no cuantifica Maná para otros perfiles: 0 es sólo
      // el valor operativo por defecto, no una afirmación del canon.
      mana:finite(entry.mana) ? entry.mana : 0,
      manaSpecified:finite(entry.mana),
      channelingBonus:finite(entry.channelingBonus) ? entry.channelingBonus : null,
      attacks:entry.attacks.map((attack) => ({
        name:attack.name,
        bonus:attack.bonus,
        damage:attack.damage,
        penetration:attack.penetration ?? 0,
        notes:attack.notes ?? ""
      })),
      notes:entry.notes ?? ""
    };
    return {
      name:entry.name,
      type:"npc",
      img:art?.portrait ?? "systems/tierra-magica/assets/icons/actor.svg",
      system:{
        details:{role:entry.role,threat:"",concept:"Perfil de referencia del Manual Maestro"},
        npcProfile:profile,
        resources:{health:{value:entry.life,max:entry.life},mana:{value:profile.mana,max:profile.mana}}
      },
      prototypeToken:{actorLink:false,name:entry.name,...(art ? {texture:{src:art.token}} : {})}
    };
  });
}
