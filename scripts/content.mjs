export const STARTER_CONTENT = {
  weapon: [
    { name: "Daga", system: { skill: "lightWeapons", attackAttribute: "agi", damage: 3, penetration: 0, strengthMin: 0, severe: "Perforación", properties: "Ligera, Ocultable" } },
    { name: "Espada corta", system: { skill: "lightWeapons", attackAttribute: "agi", damageAttribute: "fue", damage: 4, penetration: 0, severe: "Sangrado", properties: "Ligera" } },
    { name: "Espada larga", system: { skill: "martialWeapons", attackAttribute: "fue", damageAttribute: "fue", damage: 5, penetration: 0, strengthMin: 1, severe: "Sangrado", properties: "Versátil" } },
    { name: "Hacha", system: { skill: "martialWeapons", attackAttribute: "fue", damageAttribute: "fue", damage: 6, penetration: 0, strengthMin: 2, severe: "Sangrado", properties: "Impactante" } },
    { name: "Martillo de guerra", system: { skill: "martialWeapons", attackAttribute: "fue", damageAttribute: "fue", damage: 6, penetration: 2, strengthMin: 2, severe: "Fractura", properties: "Impactante" } },
    { name: "Lanza", system: { skill: "martialWeapons", attackAttribute: "fue", damageAttribute: "fue", damage: 5, penetration: 0, strengthMin: 1, severe: "Perforación Profunda", properties: "Alcance, 2 manos" } },
    { name: "Gran hacha", system: { skill: "heavyWeapons", attackAttribute: "fue", damageAttribute: "fue", damage: 8, penetration: 0, strengthMin: 3, severe: "Sangrado Grave", properties: "Pesada" } },
    { name: "Ballesta", system: { skill: "rangedWeapons", attackAttribute: "per", damage: 6, penetration: 1, rangeOptimal: 20, severe: "Perforación", properties: "Recarga" } },
    { name: "Rifle temprano", system: { skill: "rangedWeapons", attackAttribute: "per", damage: 7, penetration: 3, rangeOptimal: 25, severe: "Perforación Profunda", properties: "Recarga, 2 manos" } },
    { name: "Rifle repetidor", system: { skill: "rangedWeapons", attackAttribute: "per", damage: 7, penetration: 3, rangeOptimal: 25, severe: "Perforación Profunda", properties: "Repetición, 2 manos" } }
  ],
  armor: [
    { name: "Armadura ligera", system: { protection: 1, strengthMin: 0 } },
    { name: "Armadura reforzada", system: { protection: 2, strengthMin: 1 } },
    { name: "Malla", system: { protection: 3, strengthMin: 1 } },
    { name: "Armadura pesada", system: { protection: 4, strengthMin: 2 } },
    { name: "Placa", system: { protection: 5, strengthMin: 3 } }
  ],
  shield: [
    { name: "Broquel", system: { passiveDefense: 0, block: 2, strengthMin: 0, properties: "Ligero y móvil" } },
    { name: "Escudo estándar", system: { passiveDefense: 1, block: 3, strengthMin: 0, properties: "Protección general" } },
    { name: "Escudo pesado", system: { passiveDefense: 2, block: 4, strengthMin: 2, frontalOnly: true, properties: "Movimiento -1; requiere orientación" } }
  ],
  spell: [
    { name: "Proyectil Ígneo", system: { discipline: "evocation", manaCost: 3, attribute: "int", defense: "normal", damage: 5, penetration: 1, range: "Medio", requirements: "" } },
    { name: "Descarga Eléctrica", system: { discipline: "evocation", manaCost: 4, attribute: "int", defense: "normal", damage: 5, penetration: 1, range: "Cercano", requirements: "" } },
    { name: "Onda de Choque", system: { discipline: "evocation", manaCost: 4, attribute: "int", defense: "normal", damage: 4, penetration: 0, range: "Área corta", requirements: "" } },
    { name: "Paso Ligero", system: { discipline: "alteration", manaCost: 2, attribute: "int", defense: "df", difficulty: 10, requirements: "" } },
    { name: "Potencia Sobrenatural", system: { discipline: "alteration", manaCost: 4, attribute: "int", defense: "df", difficulty: 12, sustained: true, requirements: "" } },
    { name: "Cierre Restaurador", system: { discipline: "restoration", manaCost: 3, attribute: "int", defense: "df", difficulty: 10, requirements: "Medicina" } },
    { name: "Estabilización Vital", system: { discipline: "restoration", manaCost: 2, attribute: "int", defense: "df", difficulty: 10, requirements: "Medicina" } },
    { name: "Regeneración", system: { discipline: "restoration", manaCost: 6, attribute: "int", defense: "df", difficulty: 16, requirements: "Medicina" } },
    { name: "Visión Arcana", system: { discipline: "perception", manaCost: 2, attribute: "per", defense: "df", difficulty: 10, requirements: "Arcana" } },
    { name: "Sugestión", system: { discipline: "influence", manaCost: 5, attribute: "pre", defense: "mental", requirements: "" } },
    { name: "Trasposición", system: { discipline: "conjuration", manaCost: 6, attribute: "int", defense: "df", difficulty: 14, range: "8 espacios", requirements: "" } }
  ],
  technique: [
    { name: "Golpe Potente", system: { grade: "basic", pdCost: 2, requirements: "Habilidad de arma Entrenada", effect: "+2 daño; -2 Defensa hasta tu próximo turno." } },
    { name: "Recibir Carga", system: { grade: "basic", pdCost: 2, requirements: "Arma de Alcance", effect: "Reacción cuando un enemigo entra mediante carga o movimiento rápido." } },
    { name: "Media Asta", system: { grade: "basic", pdCost: 2, requirements: "Arma de Alcance", effect: "Elimina la Desventaja de arma de Alcance contra objetivos en Contacto." } },
    { name: "Disparo Preciso", system: { grade: "advanced", pdCost: 3, requirements: "Armas a Distancia Experto", effect: "Al Apuntar, permite Ataque Dirigido sin la Desventaja normal." } },
    { name: "Cubrir Aliado", system: { grade: "basic", pdCost: 2, requirements: "Escudo", effect: "Aplicar Bloqueo con escudo a aliado adyacente mediante Reacción." } },
    { name: "Presa Entrenada", system: { grade: "basic", pdCost: 2, requirements: "Atletismo Entrenado", effect: "+1 a DF de Agarre." } },
    { name: "Proyección", system: { grade: "advanced", pdCost: 3, requirements: "Presa Entrenada", effect: "Desde Agarre, acción para dejar Derribado al objetivo mediante prueba apropiada." } }
  ]
};
