export const TM_CONFIG = {
  abilities: {
    strength: "Fuerza",
    dexterity: "Destreza",
    agility: "Agilidad",
    fortitude: "Fortaleza",
    intelligence: "Inteligencia",
    perception: "Percepción",
    willpower: "Voluntad",
    power: "Poder"
  },
  skills: {
    athletics: { label: "Atletismo", ability: "agility" },
    climbing: { label: "Escalar", ability: "agility" },
    riding: { label: "Montar", ability: "dexterity" },
    intimidation: { label: "Intimidar", ability: "power" },
    leadership: { label: "Liderazgo", ability: "power" },
    persuasion: { label: "Persuasión", ability: "intelligence" },
    awareness: { label: "Advertir", ability: "perception" },
    search: { label: "Buscar", ability: "perception" },
    tracking: { label: "Rastrear", ability: "perception" },
    animals: { label: "Animales", ability: "perception" },
    science: { label: "Ciencia", ability: "intelligence" },
    herbalism: { label: "Herbolaria", ability: "intelligence" },
    history: { label: "Historia", ability: "intelligence" },
    medicine: { label: "Medicina", ability: "intelligence" },
    memorize: { label: "Memorizar", ability: "intelligence" },
    occultism: { label: "Ocultismo", ability: "intelligence" },
    appraisal: { label: "Tasación", ability: "intelligence" },
    composure: { label: "Frialdad", ability: "power" },
    resistPain: { label: "Resistir el dolor", ability: "willpower" },
    disguise: { label: "Disfraz", ability: "dexterity" },
    lockpicking: { label: "Cerrajería", ability: "dexterity" },
    hiding: { label: "Ocultarse", ability: "agility" },
    pickpocket: { label: "Robo", ability: "dexterity" },
    stealth: { label: "Sigilo", ability: "agility" },
    trapping: { label: "Trampería", ability: "dexterity" },
    poisons: { label: "Venenos", ability: "intelligence" },
    art: { label: "Arte", ability: "power" },
    dance: { label: "Baile", ability: "agility" },
    smithing: { label: "Forja", ability: "dexterity" },
    navigation: { label: "Navegación", ability: "intelligence" },
    engineering: { label: "Ingeniería", ability: "dexterity" },
    streetwise: { label: "Callejeo", ability: "perception" },
    empathy: { label: "Empatía", ability: "perception" },
    subterfuge: { label: "Subterfugio", ability: "intelligence" },
    hunting: { label: "Cazar", ability: "perception" },
    lipReading: { label: "Leer labios", ability: "perception" },
    runes: { label: "Runas", ability: "intelligence" }
  },
  ancestries: {
    elf: { label: "Elfo", health: 4, mana: 10, perkEvery: 4, movement: 5, traits: "Élfico, druídico y común" },
    dwarf: { label: "Enano", health: 6, mana: 3, perkEvery: 2, movement: 0, traits: "Maestría en forja y construcción" },
    goblin: { label: "Goblin", health: 3, mana: 3, perkEvery: 1, movement: 0, traits: "Ingenio y adaptación" },
    fairy: { label: "Hada", health: 6, mana: 7, perkEvery: 4, movement: 0, traits: "Élfico, druídico y guardián del bosque" },
    human: { label: "Humano", health: 5, mana: 5, perkEvery: 1, movement: 0, traits: "Adaptable y flexible" },
    lycanthrope: { label: "Licántropo", health: 6, mana: 5, perkEvery: 5, movement: 5, traits: "El Cambio y rasgo animal" },
    cursed: { label: "Maldito", health: 3, mana: 12, perkEvery: 4, movement: 0, traits: "Atributo de Caído" },
    minotaur: { label: "Minotauro", health: 10, mana: 3, perkEvery: 5, movement: 5, traits: "Tamaño grande" },
    orc: { label: "Orco", health: 7, mana: 5, perkEvery: 3, movement: 0, traits: "Berserker y especialidad con hacha" },
    rakshasa: { label: "Rakshasa", health: 5, mana: 7, perkEvery: 4, movement: 5, traits: "Afinidad mágica" }
  },
  classes: {
    combatant: { label: "Combatiente", hitDie: "1d8", hitDieAverage: 5, summary: "Entrenado en artes de combate; gana estilos y Letalidad." },
    mystic: { label: "Místico", hitDie: "1d4", hitDieAverage: 3, summary: "Canaliza magia, voluntad y conocimientos ocultos." },
    technician: { label: "Técnico", hitDie: "1d6", hitDieAverage: 4, summary: "Domina oficios, mecanismos y conocimientos aplicados." },
    unclassed: { label: "Sin clase", hitDie: "5", hitDieAverage: 5, summary: "Persona sin una profesión aventurera definida." }
  },
  familiarClasses: {
    humanoid: { label: "Humanoide", limit: 3 },
    elemental: { label: "Elemental", limit: 2 },
    beast: { label: "Bestia", limit: 3 },
    uniform: { label: "Uniforme", limit: 1 },
    animal: { label: "Animal", limit: 1 },
    construct: { label: "Constructo", limit: 2 },
    dragonoid: { label: "Dragonoide", limit: 4 },
    insectoid: { label: "Insectoide", limit: 0 }
  },
  ranks: {
    0: "Sin entrenamiento", 1: "Aprendiz", 2: "Competente", 3: "Experto", 4: "Maestro"
  },
  itemTypes: {
    weapon: "Arma", armor: "Armadura", equipment: "Equipo", spell: "Hechizo",
    talent: "Perk o estilo", familiarBenefit: "Beneficio de familiar"
  },
  xpThresholds: [0, 0, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5400]
};

TM_CONFIG.skillLabels = Object.fromEntries(
  Object.entries(TM_CONFIG.skills).map(([key, value]) => [key, value.label])
);
TM_CONFIG.ancestryOptions = Object.fromEntries(
  Object.entries(TM_CONFIG.ancestries).map(([key, value]) => [key, value.label])
);
TM_CONFIG.classOptions = Object.fromEntries(
  Object.entries(TM_CONFIG.classes).map(([key, value]) => [key, value.label])
);
TM_CONFIG.familiarClassOptions = Object.fromEntries(
  Object.entries(TM_CONFIG.familiarClasses).map(([key, value]) => [key, value.label])
);
