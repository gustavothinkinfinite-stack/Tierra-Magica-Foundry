export const TM_CONFIG = {
  attributes: {
    fue: "Fuerza", agi: "Agilidad", vig: "Vigor", int: "Intelecto",
    per: "Percepción", vol: "Voluntad", pre: "Presencia"
  },
  skills: {
    athletics: { label: "Atletismo", group: "Físicas" },
    acrobatics: { label: "Acrobacia", group: "Físicas" },
    stealth: { label: "Sigilo", group: "Físicas" },
    survival: { label: "Supervivencia", group: "Exploración" },
    nature: { label: "Naturaleza", group: "Exploración" },
    investigation: { label: "Investigación", group: "Exploración" },
    persuasion: { label: "Persuasión", group: "Sociales" },
    deception: { label: "Engaño", group: "Sociales" },
    intimidation: { label: "Intimidación", group: "Sociales" },
    empathy: { label: "Empatía", group: "Sociales" },
    history: { label: "Historia", group: "Conocimiento" },
    religion: { label: "Religión", group: "Conocimiento" },
    medicine: { label: "Medicina", group: "Conocimiento" },
    arcana: { label: "Arcana", group: "Conocimiento" },
    crafting: { label: "Artesanía", group: "Técnicas" },
    engineering: { label: "Ingeniería", group: "Técnicas" },
    alchemy: { label: "Alquimia", group: "Técnicas" },
    thievery: { label: "Latrocinio", group: "Técnicas" },
    lightWeapons: { label: "Armas Ligeras", group: "Combate" },
    martialWeapons: { label: "Armas Marciales", group: "Combate" },
    heavyWeapons: { label: "Armas Pesadas", group: "Combate" },
    rangedWeapons: { label: "Armas a Distancia", group: "Combate" },
    channeling: { label: "Canalización", group: "Magia" },
    ritualism: { label: "Ritualismo", group: "Magia" },
    handling: { label: "Manejo", group: "Operación" },
    piloting: { label: "Pilotaje", group: "Operación" }
  },
  rankBonuses: [0, 1, 2, 4, 6, 8],
  rankLabels: ["Sin entrenamiento", "Aprendiz", "Entrenado", "Experto", "Maestro", "Gran Maestro"],
  rankCosts: [0, 1, 3, 7, 13, 21],
  defensiveRankBonuses: [0, 0, 1, 2, 3, 4],
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
  techniqueGrades: { basic: "Básica", advanced: "Avanzada", master: "Maestra", legendary: "Legendaria" },
  traitCategories: { innate: "Innato", acquired: "Adquirido", bond: "Vincular", conditional: "Condicional" },
  availability: { common: "Común", professional: "Profesional", restricted: "Restringida", rare: "Rara", exceptional: "Excepcional" },
  qualities: { defective: "Defectuoso", common: "Común", superior: "Superior", exceptional: "Excepcional" },
  itemTypes: {
    weapon: "Arma", armor: "Armadura", shield: "Escudo", equipment: "Equipo", spell: "Hechizo",
    technique: "Técnica", trait: "Rasgo", specialization: "Especialización", formula: "Fórmula", ritual: "Ritual", device: "Dispositivo"
  }
};
TM_CONFIG.skillLabels = Object.fromEntries(Object.entries(TM_CONFIG.skills).map(([k,v]) => [k, v.label]));
