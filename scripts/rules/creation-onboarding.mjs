// Ayuda al jugador en Creación. Textos narrativos resumidos del Manual Maestro;
// las propiedades y costes mecánicos se leen siempre de los Items canónicos.
export const CREATION_ANCESTRY_LORE = Object.freeze({
  "Humano": "Los Hijos del Camino, vinculados a Aster: no tienen una función predestinada. Su flexibilidad se refleja en Don sin Forma.",
  "Enano": "Los Hijos de la Piedra de Khorun: un pueblo marcado por la Primera Forja, la piedra, el metal y la perseverancia.",
  "Elfo": "Los Hijos de la Savia de Eïra: pueblos de una misma ascendencia primordial con diversas culturas e historia propia.",
  "Orco": "Los Hijos del Colmillo de Varkor: fuerza y determinación. Ser orco no impone violencia, profesión ni moral.",
  "Goblin": "Goblinoide pequeño, rápido y adaptable; los Hijos del Ojo destacan la oportunidad y la astucia.",
  "Hobgoblin": "Goblinoide mediano de los Hijos del Ojo. Las tradiciones de disciplina organizada son culturales, no un bono racial.",
  "Bugbear": "Goblinoide mediano de los Hijos del Ojo, de gran complexión para carga y fuerza bruta.",
  "Terio/Anihombre": "Los Hijos de la Sangre de Eïra: humanoides con ascendencia animal. No son humanos transformados ni licántropos.",
  "Hada": "Feérico pequeño de los Hijos de la Hoja: su naturaleza mágica permite desplazarse por el aire con límites.",
  "Sátiro": "Feérico de los Hijos de la Hoja, asociado a anatomía caprina, terreno natural irregular y cuernos.",
  "Dríade": "Feérico vinculado a los árboles: puede sentir el estado de su vegetación vinculada y enraizarse.",
  "Silfo": "Feérico de afinidad natural con el viento y las corrientes de aire; no vuela indefinidamente por nacimiento.",
  "Ankar": "Guardián del Umbral creado por Vaelun para custodiar el tránsito de las almas. Humanoide esbelto de rasgos cánidos; no es un Terio Chacal.",
  "Cristálido de Matriz Mixta": "Pueblo de cuerpos parcialmente cristalinos ligado a minerales arcanos y a la Primera Forja; percibe conducción de energía mágica por contacto.",
  "Verdante": "Pueblo vegetal móvil y consciente de Eïra, distinto de las Dríades; se adapta a diversos biomas.",
  "Micelio": "Pueblo consciente de origen fúngico surgido de redes de hongos y micelio; percibe señales químicas y puede comunicarse mediante redes compatibles.",
  "Coralio": "Pueblo anfibio nacido de antiguos arrecifes transformados por la Primera Semilla, conectado con entornos marinos."
});
export const CREATION_ATTRIBUTE_HELP = Object.freeze({
  "fue": "Potencia física, carga y fuerza aplicada.",
  "agi": "Coordinación, equilibrio, sigilo y parte de la Defensa.",
  "vig": "Resistencia, salud, fatiga y supervivencia.",
  "int": "Razonamiento, conocimientos, ingeniería y comprensión mágica.",
  "per": "Sentidos, observación e iniciativa.",
  "vol": "Resistencia mental, concentración y reserva de Maná.",
  "pre": "Influencia social, liderazgo y comunicación."
});
export const CREATION_STEP_GUIDES = Object.freeze([
  {
    "number": 1,
    "title": "¿Qué sos?",
    "description": "La Ascendencia describe qué tipo de ser es tu personaje. Aporta capacidades propias de su pueblo, como sentidos, movimiento o resistencia. No determina su profesión ni su personalidad.",
    "tip": "Antes de elegir, abrí las descripciones y compará las capacidades. El paquete racial es gratuito: no gasta PD ni PR."
  },
  {
    "number": 2,
    "title": "¿De dónde venís?",
    "description": "El Origen cuenta en qué cultura o región te criaste. Da familiaridad cultural, idiomas y una Faceta de Origen.",
    "tip": "Una Faceta describe lo que conocés de ese lugar; no regala rangos de Habilidad. Los idiomas se anotan automáticamente."
  },
  {
    "number": 3,
    "title": "¿A qué te dedicabas?",
    "description": "El Trasfondo relata la experiencia previa de tu personaje: por ejemplo, taller, comercio, navegación o expediciones.",
    "tip": "Elegí exactamente dos Facetas distintas. Una puede ser una Lengua de trabajo. Es experiencia narrativa, no un bono numérico."
  },
  {
    "number": 4,
    "title": "¿Cuáles son tus fortalezas?",
    "description": "Todos los Atributos comienzan en 1. Repartí seis aumentos gratis entre los siete; ninguno puede superar 3 al crear el personaje.",
    "tip": "1 es normal, 2 es notable y 3 es excepcional. Un personaje que estudia podría priorizar Intelecto; uno resistente, Vigor."
  },
  {
    "number": 5,
    "title": "¿Qué aprendiste a hacer?",
    "description": "Usá hasta 25 Puntos de Desarrollo (PD) para entrenar Habilidades y comprar Especializaciones, Técnicas, Disciplinas y Hechizos.",
    "tip": "Primero subí las Habilidades que necesites. Después agregá opciones cuyos requisitos cumplas. No hace falta gastar los 25 PD."
  },
  {
    "number": 6,
    "title": "¿Qué te hace singular?",
    "description": "Los Rasgos ofrecen capacidades innatas, adquiridas o vínculos especiales. Tenés 3 Puntos de Rasgo (PR), separados de los PD.",
    "tip": "Revisá la descripción y el coste antes de añadir uno. Podés conservar PR; los dones raciales no consumen este presupuesto general."
  },
  {
    "number": 7,
    "title": "¿Qué llevás al comenzar?",
    "description": "Podés comprar equipo inicial con 20 oros de presupuesto de equipo (PEI): armas, protecciones, herramientas y dispositivos permitidos.",
    "tip": "El saldo PEI que no gastes no se convierte en monedas. Al cerrar creación recibís aparte una reserva líquida de 2 oros."
  },
  {
    "number": 8,
    "title": "¿Está todo listo para jugar?",
    "description": "Revisá identidad, Atributos, Habilidades, Rasgos, Equipo e idiomas. Al finalizar se desbloquean las pestañas normales de juego.",
    "tip": "La ficha marca lo obligatorio pendiente. Las decisiones opcionales sin gastar no impiden comenzar; revisá que tu concepto esté representado."
  }
]);

export function creationStepGuide(step) {
  return CREATION_STEP_GUIDES[Math.max(0,Math.min(7,Number(step||1)-1))];
}

export function creationChoicePresentation(entry) {
  const item=entry?.system??{};
  const name=String(entry?.name??"");
  const type=String(entry?.type??"");
  const details=[];
  let introduction="";
  let hint="";
  if(type==="ancestry"){
    introduction=CREATION_ANCESTRY_LORE[name]||String(item.description??"");
    const sizes={small:"Pequeña",medium:"Mediana",large:"Grande"};
    details.push("Escala: "+(sizes[item.scale]??"según linaje"));
    details.push("Movimiento: "+String(item.movementBase??6));
    if(item.movementModes) details.push("Movimiento especial: "+item.movementModes);
    if(Number(item.naturalProtection)>0) details.push("Protección Natural: "+item.naturalProtection);
    details.push(...(Array.isArray(item.racialFeatures)?item.racialFeatures:[]));
    hint=String(item.selectionNotes??"")||"Las capacidades de esta Ascendencia se aplican al personaje y no gastan sus 25 PD ni 3 PR.";
  } else if(type==="origin"){
    introduction="Una procedencia cultural: "+String(item.familiarity??"");
    details.push("Idiomas iniciales: "+String(item.languageProfile??"Común de Concordia"));
    if(item.facetOptions) details.push("Elegí una Faceta después: "+item.facetOptions);
    hint="El Origen no concede bonificaciones numéricas ni rangos de Habilidad.";
  } else if(type==="background"){
    introduction="Tu experiencia antes de aventurarte: "+String(item.familiarity??"");
    if(item.facetOptions)details.push("Facetas disponibles: "+item.facetOptions);
    hint="Después elegirás dos Facetas distintas. Podés sustituir una por un idioma de trabajo; no recibís rangos gratuitos.";
  } else {
    introduction=String(item.description??item.effect??"");
    const costs=Array.isArray(item.costs)?item.costs:[];
    for(const cost of costs){
      if(!cost||cost.resource==="none"||Number(cost.amount)===0) continue;
      const scope=String(cost.context??"any");
      if(scope!=="creation"&&scope!=="any")continue;
      details.push("Coste de creación: "+cost.amount+" "+String(cost.resource??"").toUpperCase());
    }
    if(type==="spell"){
      if(item.discipline)details.push("Disciplina: "+item.discipline);
      if(item.manaCost!=null)details.push("Lanzar cuesta "+item.manaCost+" Maná.");
    }
    if(["weapon","armor","shield","equipment","device"].includes(type)&&item.priceStatus==="exact"&&Number.isFinite(Number(item.priceCopper))){
      details.push("Precio: "+item.priceCopper+" cobres");
    }
    if(item.requirementsText)details.push("Requisitos: "+String(item.requirementsText));
    hint=type==="trait"?"Los Rasgos consumen PR, no PD. Revisá las condiciones de uso.": "Comprobá que cumplís los requisitos antes de elegir.";
  }
  return {name,type,introduction,details,hint};
}

export function escapeCreationHtml(value) {
  return String(value??"").replace(/[&<>"']/g,(character)=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  })[character]);
}

export function creationChoiceBrowserHtml(entries, type) {
  const safe=escapeCreationHtml;
  const label={
    ancestry:"Ascendencia",origin:"Origen",background:"Trasfondo",trait:"Rasgo",
    spell:"Hechizo",specialization:"Especialización",discipline:"Disciplina",
    technique:"Técnica",formula:"Fórmula",ritual:"Ritual",weapon:"Arma",
    armor:"Armadura",shield:"Escudo",equipment:"Equipo",device:"Dispositivo"
  }[type]??"opción";
  const cards=entries.map((entry,index)=>{
    const info=creationChoicePresentation(entry);
    const detail=info.details.map((item)=>"<li>"+safe(item)+"</li>").join("");
    return "<label class='tm-creation-choice-card'>"+
      "<input type='radio' name='entry' value='"+index+"' />"+
      "<span class='tm-creation-choice-text'><strong>"+safe(info.name)+"</strong>"+
      "<span class='tm-creation-choice-intro'>"+safe(info.introduction)+"</span>"+
      (detail?"<details><summary>Ver capacidades, idiomas o costes</summary><ul>"+detail+"</ul></details>":"")+
      "<small>"+safe(info.hint)+"</small></span></label>";
  }).join("");
  return "<section class='tm-creation-choice-browser'><p>Leé las opciones antes de elegir. Esta selección se aplicará a tu personaje.</p>"+
    "<div class='tm-creation-choice-list' role='radiogroup' aria-label='Elegir "+safe(label)+"'>"+
    cards+"</div></section>";
}
