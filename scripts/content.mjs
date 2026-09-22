export const STARTER_CONTENT = {
 weapon:[
  {name:"Daga",system:{skill:"lightWeapons",attackAttribute:"agi",damage:3,penetration:0,strengthMin:0,price:5,properties:"Ligera, Ocultable"}},
  {name:"Espada corta",system:{skill:"lightWeapons",attackAttribute:"agi",damageAttribute:"fue",damage:4,penetration:0,strengthMin:0,price:12,properties:"Ligera"}},
  {name:"Sable",system:{skill:"lightWeapons",attackAttribute:"agi",damageAttribute:"fue",damage:4,penetration:0,strengthMin:0,price:18,properties:"Ágil"}},
  {name:"Espada larga",system:{skill:"martialWeapons",attackAttribute:"fue",damageAttribute:"fue",damage:5,penetration:0,strengthMin:1,price:20,properties:"Versátil"}},
  {name:"Hacha",system:{skill:"martialWeapons",attackAttribute:"fue",damageAttribute:"fue",damage:6,penetration:0,strengthMin:2,price:18,properties:"Impactante"}},
  {name:"Maza",system:{skill:"martialWeapons",attackAttribute:"fue",damageAttribute:"fue",damage:5,penetration:1,strengthMin:1,price:16,properties:"Impactante"}},
  {name:"Martillo de guerra",system:{skill:"martialWeapons",attackAttribute:"fue",damageAttribute:"fue",damage:6,penetration:2,strengthMin:2,price:24,properties:"Impactante"}},
  {name:"Lanza",system:{skill:"martialWeapons",attackAttribute:"fue",damageAttribute:"fue",damage:5,penetration:0,strengthMin:1,price:12,properties:"Alcance, 2 manos"}},
  {name:"Alabarda",system:{skill:"heavyWeapons",attackAttribute:"fue",damageAttribute:"fue",damage:7,penetration:1,strengthMin:2,price:30,properties:"Alcance, Pesada, 2 manos"}},
  {name:"Mandoble",system:{skill:"heavyWeapons",attackAttribute:"fue",damageAttribute:"fue",damage:7,penetration:0,strengthMin:2,price:32,properties:"Pesada, 2 manos"}},
  {name:"Gran hacha",system:{skill:"heavyWeapons",attackAttribute:"fue",damageAttribute:"fue",damage:8,penetration:0,strengthMin:3,price:34,properties:"Pesada, 2 manos"}},
  {name:"Gran martillo",system:{skill:"heavyWeapons",attackAttribute:"fue",damageAttribute:"fue",damage:7,penetration:2,strengthMin:3,price:40,properties:"Pesada, 2 manos"}},
  {name:"Arco corto",system:{skill:"rangedWeapons",attackAttribute:"agi",damageAttribute:"fue",damage:4,penetration:0,power:2,rangeOptimal:15,price:15,properties:"Potencia 2"}},
  {name:"Arco largo",system:{skill:"rangedWeapons",attackAttribute:"agi",damageAttribute:"fue",damage:5,penetration:0,power:3,rangeOptimal:30,price:25,properties:"Potencia 3, 2 manos"}},
  {name:"Ballesta",system:{skill:"rangedWeapons",attackAttribute:"per",damage:6,penetration:1,reload:1,rangeOptimal:25,price:22,properties:"Recarga 1"}},
  {name:"Ballesta pesada",system:{skill:"rangedWeapons",attackAttribute:"per",damage:8,penetration:2,reload:2,rangeOptimal:35,price:35,properties:"Recarga 2, 2 manos"}},
  {name:"Pistola temprana",system:{skill:"rangedWeapons",attackAttribute:"per",damage:6,penetration:2,reload:2,rangeOptimal:15,price:30,properties:"Recarga 2"}},
  {name:"Rifle temprano",system:{skill:"rangedWeapons",attackAttribute:"per",damage:7,penetration:3,reload:2,rangeOptimal:40,price:45,properties:"Recarga 2, 2 manos"}},
  {name:"Pistola repetidora",system:{skill:"rangedWeapons",attackAttribute:"per",damage:6,penetration:1,rangeOptimal:20,price:50,properties:"Repetición"}},
  {name:"Rifle repetidor",system:{skill:"rangedWeapons",attackAttribute:"per",damage:7,penetration:2,rangeOptimal:35,price:65,properties:"Repetición, 2 manos"}}
 ],
 armor:[
  {name:"Armadura ligera",system:{protection:1,strengthMin:0,price:12}},{name:"Armadura reforzada",system:{protection:2,strengthMin:0,price:25}},
  {name:"Malla",system:{protection:3,strengthMin:1,price:40}},{name:"Armadura pesada",system:{protection:4,strengthMin:2,price:60}},{name:"Placas",system:{protection:5,strengthMin:3,price:85}}
 ],
 shield:[
  {name:"Broquel",system:{passiveDefense:1,block:0,strengthMin:0,price:10,properties:"Sin Bloqueo especial"}},
  {name:"Escudo estándar",system:{passiveDefense:1,block:2,strengthMin:0,price:18,frontalOnly:true,properties:"Bloqueo +2"}},
  {name:"Escudo pesado",system:{passiveDefense:2,block:2,strengthMin:2,price:30,frontalOnly:true,properties:"Bloqueo +2; Movimiento -1"}}
 ],
 spell:[
  {name:"Proyectil Ígneo",system:{discipline:"evocation",grade:"basic",manaCost:3,attribute:"int",defense:"normal",damage:5,penetration:1,range:"Medio"}},
  {name:"Onda de Choque",system:{discipline:"evocation",grade:"basic",manaCost:4,attribute:"int",defense:"normal",damage:4,penetration:0,range:"Área corta",area:"Frontal corta"}},
  {name:"Barrera Cinética",system:{discipline:"evocation",grade:"basic",manaCost:3,attribute:"int",activation:"Reacción",effect:"+2 Defensa contra el ataque declarado."}},
  {name:"Potencia Sobrenatural",system:{discipline:"alteration",grade:"basic",manaCost:4,attribute:"int",sustained:true,effect:"Interactúa como una categoría de Escala mayor; no aumenta FUE/daño/Defensa."}},
  {name:"Piel Alterada",system:{discipline:"alteration",grade:"basic",manaCost:4,attribute:"int",sustained:true,effect:"Protección 2 contra categoría coherente; no acumula con armadura."}},
  {name:"Cierre Restaurador",system:{discipline:"restoration",grade:"basic",manaCost:3,attribute:"int",requirements:"Medicina",effect:"Recupera 4 Vida y detiene Sangrado ordinario compatible."}},
  {name:"Regeneración",system:{discipline:"restoration",grade:"advanced",manaCost:6,attribute:"int",difficulty:16,requirements:"Medicina",effect:"Repara Herida Grave orgánica compatible."}},
  {name:"Reconstrucción",system:{discipline:"restoration",grade:"master",manaCost:10,attribute:"int",difficulty:20,requirements:"Medicina",effect:"Reconstrucción extraordinaria; no resurrección."}},
  {name:"Visión Arcana",system:{discipline:"perception",grade:"minor",manaCost:2,attribute:"per",difficulty:10,duration:"Escena",requirements:"Arcana"}},
  {name:"Vínculo de Rastreo",system:{discipline:"perception",grade:"basic",manaCost:4,attribute:"per",difficulty:14,effect:"Aproximado; no GPS."}},
  {name:"Visión Remota",system:{discipline:"perception",grade:"advanced",manaCost:7,attribute:"per",difficulty:18,requirements:"Lugar conocido o ancla"}},
  {name:"Calma",system:{discipline:"influence",grade:"basic",manaCost:3,attribute:"pre",defense:"mental"}},
  {name:"Sugestión",system:{discipline:"influence",grade:"advanced",manaCost:5,attribute:"pre",defense:"mental",effect:"Instrucción plausible; no Dominación/suicidio/traición fundamental automática."}},
  {name:"Llamada Menor",system:{discipline:"conjuration",grade:"basic",manaCost:4,attribute:"int",difficulty:14,effect:"Entidad menor compatible; no obediencia automática."}},
  {name:"Paso Breve",system:{discipline:"conjuration",grade:"basic",manaCost:4,attribute:"int",difficulty:12,range:"3 espacios",effect:"Destino visible, válido y desocupado."}},
  {name:"Trasposición",system:{discipline:"conjuration",grade:"advanced",manaCost:6,attribute:"int",difficulty:14,range:"8 espacios"}},
  {name:"Umbral",system:{discipline:"conjuration",grade:"advanced",manaCost:7,attribute:"int",difficulty:18}},
  {name:"Portal",system:{discipline:"conjuration",grade:"master",manaCost:10,attribute:"int",difficulty:21,requirements:"Anclas compatibles"}}
 ],
 technique:[
  {name:"Parada",system:{grade:"basic",pdCost:2,activation:"Reacción",effect:"+2 Defensa contra ataque cuerpo a cuerpo parable."}},
  {name:"Golpe Potente",system:{grade:"basic",pdCost:2,effect:"-2 ataque; +2 daño."}},
  {name:"Recibir Carga",system:{grade:"basic",pdCost:2,activation:"Reacción",requirements:"Arma de Alcance"}},
  {name:"Tirador Preparado",system:{grade:"basic",pdCost:2,activation:"Acción + Reacción",effect:"Disparo reactivo; expira al inicio del siguiente turno."}},
  {name:"Recarga Experta",system:{grade:"basic",pdCost:2,effect:"Reduce Recarga en 1 Acción respetando límites físicos."}},
  {name:"Combate Dual",system:{grade:"advanced",pdCost:3,effect:"Dos ataques -2 con armas Ligeras/compatibles; modificador de ataque completo solo en uno."}},
  {name:"Barrido",system:{grade:"advanced",pdCost:3,effect:"Una tirada -2 contra hasta dos objetivos válidos."}},
  {name:"Estocada Perforante",system:{grade:"advanced",pdCost:3,effect:"-1 ataque, -1 daño, Pen +2."}},
  {name:"Contraataque",system:{grade:"advanced",pdCost:3,requirements:"Parada",effect:"Ataque inmediato dentro de la misma Reacción tras Parada exitosa."}},
  {name:"Contramagia",system:{grade:"advanced",pdCost:3,activation:"Reacción",effect:"Interferencia compatible antes de resolver; no cancelación universal."}},
  {name:"Doble Sostenimiento",system:{grade:"master",pdCost:5,effect:"Mantiene dos efectos Sostenidos demandantes."}},
  {name:"Sentidos Compartidos",system:{grade:"basic",pdCost:2,requirements:"Familiar Mágico; Vínculo II",activation:"Acción",effect:"Percibe temporalmente mediante los sentidos reales del Familiar."}},
  {name:"Comunicación Mejorada",system:{grade:"basic",pdCost:2,requirements:"Familiar Mágico; Vínculo II",effect:"Permite conceptos complejos dentro del alcance válido del vínculo."}},
  {name:"Origen Remoto",system:{grade:"advanced",pdCost:3,requirements:"Familiar Mágico; Vínculo III",effect:"Permite usar la posición del Familiar como origen compatible; Maná, tirada y Sostenimiento siguen siendo del personaje."}},
  {name:"Coordinación Reactiva",system:{grade:"advanced",pdCost:3,requirements:"Familiar Mágico; Vínculo III",effect:"Define un disparador simple y observable para una respuesta; no genera Reacciones adicionales ni cadenas reactivas."}}
 ],
 formula:[
  {name:"Bálsamo Restaurador",system:{grade:"common",pdCost:1,saturating:true,family:"restaurativa",effect:"Recupera 4 Vida; no Trauma/Herida Grave.",price:12}},
  {name:"Poción Restauradora",system:{grade:"common",pdCost:1,route:"Oral",saturating:true,family:"restaurativa",effect:"Acción: recupera 4 Vida, hasta el máximo y respetando límites de lesión; no reduce Trauma ni repara Heridas Graves.",price:12}},
  {name:"Poción de Recuperación Arcana",system:{grade:"refined",pdCost:1,route:"Oral",saturating:true,family:"arcana",effect:"Acción: recupera 3 Maná, hasta el máximo; no elimina Fatiga ni consecuencias de Sobrecarga.",price:15}},
  {name:"Tónico de Vigor",system:{grade:"refined",pdCost:1,saturating:true,family:"potenciador",effect:"Ventaja en una prueba de VIG por esfuerzo prolongado.",price:10}},
  {name:"Supresor del Dolor",system:{grade:"refined",pdCost:1,saturating:true,family:"analgésica",effect:"Ignora una Desventaja causada por dolor compatible; no repara lesión.",price:15}},
  {name:"Neutralizante Común",system:{grade:"refined",pdCost:1,effect:"Nueva resistencia con Ventaja contra toxina compatible.",price:10}},
  {name:"Toxina Debilitante",system:{grade:"complex",pdCost:2,route:"Sangre",effect:"VIG DF14; fallo: Desventaja en acciones físicas dependientes de fuerza muscular.",price:18}},
  {name:"Bomba Incendiaria",system:{grade:"complex",pdCost:2,effect:"Área pequeña; Daño 6 Pen 1; resolución de colocación.",price:20}}
 ],
 ritual:[
  {name:"Círculo de Protección",system:{grade:"basic",pdCost:2,difficulty:15,time:"30 minutos",usefulAssistants:2,manaDirector:3,manaAssistantMax:1,effect:"Barrera contra categoría sobrenatural definida."}},
  {name:"Vínculo de Localización",system:{grade:"advanced",pdCost:3,difficulty:18,time:"2 horas",usefulAssistants:2,manaDirector:5,effect:"Dirección/región aproximada; no GPS."}},
  {name:"Portal Estable",system:{grade:"master",pdCost:5,difficulty:21,time:"8 horas",usefulAssistants:4,manaDirector:8,manaAssistantMax:2,flowRequired:3,effect:"Conexión temporal entre dos Anclas compatibles."}}
 ],
 device:[
  {name:"Celda arcana menor",system:{energy:{value:4,max:4},flow:2,stability:"stable",consumption:0}},
  {name:"Acumulador estándar",system:{energy:{value:8,max:8},flow:3,stability:"stable",consumption:0}},
  {name:"Núcleo pesado",system:{energy:{value:16,max:16},flow:5,stability:"sensitive",consumption:0}},
  {name:"Escudo de campo",system:{flow:2,stability:"stable",consumption:2,effect:"Reacción: +2 Defensa; no acumula con Barrera Cinética equivalente."}}
 ]
};
