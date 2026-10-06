import { BUILTIN_DAMAGE_TYPES, DAMAGE_MODES } from "./rules/damage-types.mjs";

export const TM_CONFIG = {
  attributes: {
    fue: "Fuerza", agi: "Agilidad", vig: "Vigor", int: "Intelecto",
    per: "Percepción", vol: "Voluntad", pre: "Presencia"
  },
  skillGroupOrder: ["Físicas", "Exploración", "Sociales", "Conocimiento", "Técnicas", "Combate", "Magia", "Operación"],
  skills: {
    athletics: { label: "Atletismo", group: "Físicas", suggestedAttribute: "fue", description: "Fuerza, resistencia y desplazamiento físico." },
    acrobatics: { label: "Acrobacia", group: "Físicas", suggestedAttribute: "agi", description: "Equilibrio, coordinación y control corporal." },
    stealth: { label: "Sigilo", group: "Físicas", suggestedAttribute: "agi", description: "Evitar detección mediante ocultación y movimiento discreto." },
    survival: { label: "Supervivencia", group: "Exploración", suggestedAttribute: "per", description: "Subsistencia, orientación y rastreo en entornos hostiles." },
    nature: { label: "Naturaleza", group: "Exploración", suggestedAttribute: "int", description: "Flora, fauna, ecosistemas y fenómenos naturales." },
    investigation: { label: "Investigación", group: "Exploración", suggestedAttribute: "int", description: "Búsqueda, contraste y correlación de evidencias." },
    persuasion: { label: "Persuasión", group: "Sociales", suggestedAttribute: "pre", description: "Negociación e influencia cooperativa." },
    deception: { label: "Engaño", group: "Sociales", suggestedAttribute: "pre", description: "Mentira, suplantación y falsedad deliberada." },
    intimidation: { label: "Intimidación", group: "Sociales", suggestedAttribute: "pre", description: "Amenaza, presión y coerción." },
    empathy: { label: "Empatía", group: "Sociales", suggestedAttribute: "per", description: "Lectura emocional y dinámica interpersonal." },
    history: { label: "Historia", group: "Conocimiento", suggestedAttribute: "int", description: "Acontecimientos, instituciones y contextos del pasado." },
    religion: { label: "Religión", group: "Conocimiento", suggestedAttribute: "int", description: "Teología, ritos, cultos y organizaciones religiosas." },
    medicine: { label: "Medicina", group: "Conocimiento", suggestedAttribute: "int", description: "Diagnóstico, estabilización y tratamiento clínico." },
    arcana: { label: "Arcana", group: "Conocimiento", suggestedAttribute: "int", description: "Teoría mágica, Trama, anomalías y artefactos." },
    crafting: { label: "Artesanía", group: "Técnicas", suggestedAttribute: "agi", description: "Manufactura, reparación y técnicas de oficio." },
    engineering: { label: "Ingeniería", group: "Técnicas", suggestedAttribute: "int", description: "Diseño, sistemas, máquinas e infraestructura." },
    alchemy: { label: "Alquimia", group: "Técnicas", suggestedAttribute: "int", description: "Reactivos, formulación y manipulación de sustancias." },
    thievery: { label: "Latrocinio", group: "Técnicas", suggestedAttribute: "agi", description: "Cerraduras, seguridad física, trampas y sustracción." },
    lightWeapons: { label: "Armas Ligeras", group: "Combate", suggestedAttribute: "agi", description: "Uso de armamento ligero de mano o arrojadizo." },
    martialWeapons: { label: "Armas Marciales", group: "Combate", suggestedAttribute: "fue", description: "Armamento cuerpo a cuerpo de guerra ordinario." },
    heavyWeapons: { label: "Armas Pesadas", group: "Combate", suggestedAttribute: "fue", description: "Armamento de gran masa, tamaño o alcance." },
    rangedWeapons: { label: "Armas a Distancia", group: "Combate", suggestedAttribute: "per", description: "Arcos, ballestas, armas de fuego y proyectiles." },
    channeling: { label: "Canalización", group: "Magia", suggestedAttribute: "int", description: "Control mágico directo.", hasSpecializations: false },
    ritualism: { label: "Ritualismo", group: "Magia", suggestedAttribute: "int", description: "Procedimientos mágicos rituales.", hasSpecializations: false },
    handling: { label: "Manejo", group: "Operación", suggestedAttribute: "agi", description: "Monturas, vehículos terrestres y maquinaria móvil." },
    piloting: { label: "Pilotaje", group: "Operación", suggestedAttribute: "agi", description: "Transporte complejo, navegación operativa e instrumental." }
  },
  rankBonuses: [0, 1, 2, 4, 6, 8],
  rankLabels: ["Sin entrenamiento", "Aprendiz", "Entrenado", "Experto", "Maestro", "Gran Maestro"],
  rankCosts: [0, 1, 3, 7, 13, 21],
  defensiveRankBonuses: [0, 0, 1, 2, 3, 4],
  spellMethods: { direct: "Directo", ritual: "Ritual" },
  difficulty: {
    8: "Muy favorable bajo presión", 10: "Sencilla", 12: "Moderada", 14: "Demandante",
    16: "Difícil", 18: "Muy difícil", 20: "Extraordinaria", 22: "Heroica", 24: "Sobrenatural"
  },
  sizes: { tiny: "Diminuta", small: "Pequeña", medium: "Mediana", large: "Grande", huge: "Enorme", colossal: "Colosal" },
  fatigue: ["Fresco", "Fatigado", "Exhausto", "Colapsado"],
  trauma: ["Sin Trauma", "Grave", "Crítico", "Terminal"],
  disciplines: {
    evocation: "Evocación", alteration: "Alteración", restoration: "Restauración",
    perception: "Percepción", influence: "Influencia", conjuration: "Conjuración"
  },
  sources: { soul: "Alma", divine: "Divina", environmental: "Ambiental", external: "Externa" },
  damageTypes: { ...BUILTIN_DAMAGE_TYPES },
  damageModes: { ...DAMAGE_MODES },
  techniqueGrades: { basic: "Básica", advanced: "Avanzada", master: "Maestra", legendary: "Legendaria" },
  traitCategories: { innate: "Innato", acquired: "Adquirido", bond: "Vincular", conditional: "Condicional" },
  availability: { common: "Común", professional: "Profesional", restricted: "Restringida", rare: "Rara", exceptional: "Excepcional" },
  qualities: { defective: "Defectuoso", common: "Común", superior: "Superior", exceptional: "Excepcional" },
  priceStatuses: { exact: "Precio exacto", variable: "Precio variable", unset: "Sin precio establecido" },
  itemTypes: {
    weapon: "Arma", armor: "Armadura", shield: "Escudo", equipment: "Equipo", spell: "Hechizo",
    technique: "Técnica", trait: "Rasgo", specialization: "Especialización", formula: "Fórmula", ritual: "Ritual", device: "Dispositivo",
    ancestry: "Ascendencia", origin: "Origen", background: "Trasfondo", discipline: "Disciplina", effect: "Efecto", project: "Proyecto"
  },
  craftingProjectOperations: {
    fabricate: "Fabricar", repair: "Reparar", dismantle: "Desmantelar", modify: "Modificar", research: "Investigar"
  },
  craftingProjectStates: {
    draft: "Borrador", ready: "Preparado", active: "En curso", blocked: "Bloqueado", completed: "Completado", cancelled: "Cancelado"
  },
  craftingProjectTimeModes: { derived: "Derivado del TBA", fixed: "Tiempo fijo del procedimiento" },
  craftingAccelerationOutcomes: {
    none: "Sin Aceleración", pending: "Pendiente", success: "Éxito", failure: "Fallo", pifia: "Pifia"
  },
  craftingInstallations: {
    improvised: "Improvisada", adequate: "Adecuada", professional: "Profesional", specialized: "Especializada", exceptional: "Excepcional"
  },
  craftingMaterialGrades: {
    ordinary: "Ordinario", specialized: "Especializado", rare: "Raro", exceptional: "Excepcional"
  },
  craftingQualities: { common: "Común", superior: "Superior", exceptional: "Excepcional" },
  creationStatuses: { building: "En creación", complete: "Completa", rebuilding: "Reconstrucción" },
  acquisitionModes: { purchased: "Comprado", granted: "Concedido", package: "Paquete", legacy: "Legado" },
  paidResources: { pd: "PD", pr: "PR", pei: "PEI", currency: "Moneda", none: "Sin coste" },
  stackingModes: { unique: "Único", multiple: "Múltiple", quantity: "Cantidad" },
  effectExpiry: { manual: "Manual", endOfTurn: "Fin de turno", startOfTurn: "Inicio de turno", scene: "Escena", rest: "Descanso", fullRest: "Reposo completo", sustained: "Sostenido" }
};
TM_CONFIG.skillLabels = Object.fromEntries(Object.entries(TM_CONFIG.skills).map(([k,v]) => [k, v.label]));
TM_CONFIG.weaponSkillLabels = Object.fromEntries(["lightWeapons","martialWeapons","heavyWeapons","rangedWeapons"].map((key) => [key, TM_CONFIG.skills[key].label]));
TM_CONFIG.rankOptionLabels = Object.fromEntries(TM_CONFIG.rankLabels.map((label, rank) => [rank, label + " · +" + TM_CONFIG.rankBonuses[rank] + " · " + TM_CONFIG.rankCosts[rank] + " PD"]));
