import { normalizeSlug } from "./identity.mjs";

const J=480;
const rows=[
["REF-EQ-01","Equipo compuesto","Espada de Guardia de Kharum","fabricate","guided",200,1440,400,"crafting",4,"Forja y metal","specialized","weapon","Espada larga Superior de Kharum, Equilibrada para Parada; Daño 5, Pen 0, FUE 1."],
["REF-EQ-02","Equipo compuesto","Espada Rúnica de Guardia de Kharum","fabricate","guided",350,1920,700,"crafting",4,"Forja y metal","specialized","weapon","REF-EQ-01 + CRu 1 + Filo Arcano I; requiere además Ritualismo Experto y Arcana Entrenada."],
["REF-EQ-03","Equipo compuesto","Malla Superior Silenciosa","fabricate","guided",750,3600,1500,"crafting",3,"Forja y metal","professional","armor","Malla Superior; CapM 1 ocupada por Silenciosa; Protección 3, FUE 1."],
["REF-EQ-04","Equipo compuesto","Placas Excepcionales de Kharum Aligeradas","fabricate","guided",6000,9600,12000,"crafting",5,"Forja y metal","exceptional","armor","Placas Excepcionales, Acero de Kharum Dominante y Aligerada; Protección 5, FUE mínima 2."],
["REF-EQ-05","Equipo compuesto","Placas Excepcionales con Doble Engarce","fabricate","guided",6600,12000,13200,"crafting",5,"Forja y metal","exceptional","armor","Placas Excepcionales con CRu 2 como dos Engarces I; no incluye Piedras."],
["REF-EQ-06","Equipo compuesto","Arco Largo de Madera Tratada de Erelia","fabricate","guided",150,960,300,"crafting",2,"Carpintería","adequate","weapon","Arco largo normal más Estabilidad ambiental; Daño 5, Potencia 3."],
["REF-EQ-07","Equipo compuesto","Catalejo de Vidrio del Desierto","fabricate","guided",63,1800,126,"crafting",4,"Vidrio y cristal","specialized","equipment","Catalejo con Refracción liminal; auxiliar Ingeniería Aprendiz."],
["REF-EQ-08","Equipo compuesto","Kit de Alquimia Superior preparado para campo","fabricate","guided",150,1440,300,"crafting",3,"Vidrio y cristal","professional","equipment","Kit Superior con Preparada para campo para Bálsamo Restaurador."],

["REF-ALQ-01","Alquimia","Bálsamo Restaurador","fabricate","formula",25,120,50,"alchemy",2,"Medicinales","adequate","formula","+4 Vida; Saturación Restaurativa."],
["REF-ALQ-02","Alquimia","Poción Restauradora","fabricate","formula",40,120,80,"alchemy",2,"Medicinales","adequate","formula","+4 Vida; Saturación Restaurativa."],
["REF-ALQ-03","Alquimia","Poción de Recuperación Arcana","fabricate","formula",75,240,150,"alchemy",3,"Reactivos","professional","formula","+3 Maná; Saturación Arcana."],
["REF-ALQ-04","Alquimia","Tónico de Vigor","fabricate","formula",40,240,80,"alchemy",3,"Potenciadores","professional","formula","Ventaja en una prueba compatible de VIG; Saturación Potenciador."],
["REF-ALQ-05","Alquimia","Supresor del Dolor","fabricate","formula",40,240,80,"alchemy",3,"Medicinales","professional","formula","Ignora una Desventaja por dolor compatible; Saturación Analgésica."],
["REF-ALQ-06","Alquimia","Neutralizante Común","fabricate","formula",50,240,100,"alchemy",3,"Toxinas","professional","formula","Nueva resistencia con Ventaja contra toxina compatible; Saturación Antitóxica."],
["REF-ALQ-07","Alquimia","Toxina Debilitante","fabricate","formula",75,480,150,"alchemy",3,"Toxinas","professional","formula","VIG DF14; fallo: Desventaja física; una aplicación válida consume la dosis."],
["REF-ALQ-08","Alquimia","Bomba Incendiaria","fabricate","formula",150,480,300,"alchemy",3,"Explosivos","professional","formula","Área pequeña; Daño 6, Pen 1; una activación consume la bomba."],
["REF-ALQ-09","Alquimia","Somnífero de Bruma","fabricate","formula",60,480,120,"alchemy",3,"Toxinas","professional","formula","VIG DF14; Somnolencia y posible sueño en exposición posterior; Vía Sangre."],
["REF-ALQ-10","Alquimia","Paralizante de Aguja","fabricate","formula",110,480,220,"alchemy",3,"Toxinas","professional","formula","VIG DF16; parálisis breve seguida de Movimiento reducido; Vía Sangre."],
["REF-ALQ-11","Alquimia","Veneno del Último Pulso","fabricate","formula",200,960,400,"alchemy",4,"Toxinas","specialized","formula","VIG DF18; fallo: 8 Vida internos tras Latencia; Vía Sangre."],

["REF-RUN-01","Runas y magia","Piedra de Lumen I","fabricate","guided",200,480,400,"ritualism",3,"","professional","equipment","Piedra I; CRu 1; Acción, 1 Maná; luz durante una Escena."],
["REF-RUN-02","Runas y magia","Daga Excepcional de Filo Penetrante II","fabricate","guided",375,1200,750,"crafting",4,"Forja y metal","specialized","weapon","Daga Excepcional + CRu 2 + Filo Penetrante II; Ritualismo Maestro y Arcana Experta."],
["REF-MAG-01","Runas y magia","Broche de Barrera","fabricate","guided",600,1920,1200,"ritualism",4,"","specialized","equipment","Soporte Dedicado I + Encantamiento I; Sintonización 1; RE 6 / PE +4."],
["REF-MAG-02","Runas y magia","Brazal de Aguja Gélida","fabricate","guided",1750,5280,3500,"ritualism",5,"","exceptional","equipment","Soporte Dedicado II + Encantamiento II; Sintonización 2; RE 10 / PE +6."],
["REF-MAG-03","Runas y magia","Capa de Invisibilidad","fabricate","guided",4500,12000,9000,"ritualism",5,"","exceptional","equipment","Soporte Dedicado III + Encantamiento III; Sintonización 3; RE 14 / PE +8."],

["REF-TRP-01","Trampas y construcciones","Alarma de perímetro Disimulada","fabricate","guided",10,40,null,"thievery",1,"","improvised","equipment","Armazón Simple; DF Detección 10; puede usar Supervivencia Aprendiz en la excepción canónica."],
["REF-TRP-02","Trampas y construcciones","Cable de derribo Oculto","fabricate","guided",60,150,null,"thievery",2,"Trampas y seguridad física","adequate","equipment","Armazón Estándar; Ataque +4 vs Maniobra; Derribado; DF Detección/Mecanismo 12."],
["REF-TRP-03","Trampas y construcciones","Golpe oculto con Lanza","fabricate","guided",85,390,null,"thievery",2,"Trampas y seguridad física","adequate","equipment","Armazón Estándar + Lanza física; Daño 5, Pen 0; un disparo y rearme."],
["REF-TRP-04","Trampas y construcciones","Pozo oculto de 4 espacios","fabricate","guided",60,1590,null,"thievery",2,"Trampas y seguridad física","adequate","equipment","3 Jornadas de excavación + Armazón/Ocultación; caída 4 espacios, Daño 6."],
["REF-CON-01","Trampas y construcciones","Barricada de cobertura","fabricate","guided",50,120,null,"crafting",1,"","improvised","equipment","Aproximadamente 1 espacio de frente; +2 Defensa sólo con geometría de cobertura parcial."],
["REF-CON-02","Trampas y construcciones","Pasarela/Puente corto","fabricate","guided",100,240,null,"crafting",2,"Carpintería","improvised","equipment","Cruza hasta aproximadamente 2 espacios bajo carga razonable; Ingeniería Aprendiz si soporte no trivial."],

["REF-ING-01","Ingeniería","Acumulador estándar","fabricate","guided",250,960,500,"engineering",3,"Acumuladores arcanos","professional","device","8 E / C3 / Est2."],
["REF-ING-02","Ingeniería","Estación de carga de taller","fabricate","guided",500,1440,1000,"engineering",3,"Acumuladores arcanos","professional","device","Caudal de Carga 4; requiere fuente energética real."],
["REF-ING-03","Ingeniería","Escudo de campo completo","fabricate","guided",850,2400,1700,"engineering",3,"Acumuladores arcanos","professional","device","Escudo + acumulador; Reacción, 2 E/C2, +2 Defensa; hasta 4 activaciones."],
["REF-ING-04","Ingeniería","Autómata auxiliar de taller","fabricate","guided",1250,3840,2500,"engineering",4,"Autómatas","specialized","device","Ayuda técnica o de trabajo en función registrada; no posee turno propio."],
["REF-ING-05","Ingeniería","Banco portátil de dos Celdas menores","fabricate","guided",400,1440,800,"engineering",3,"Acumuladores arcanos","professional","device","Hasta 8 E totales, Caudal 2; el Banco no suma Caudal."],
["REF-ING-06","Ingeniería","Acoplador con dos acumuladores estándar","fabricate","guided",1000,3840,2000,"engineering",4,"Acumuladores arcanos","specialized","device","Hasta 16 E; Caudal efectivo 4; usar C4 paga +1 E; no encadenable."],
["REF-ING-07","Ingeniería","Rifle perforador de precisión","fabricate","guided",2100,6000,4200,"crafting",4,"Forja y metal","specialized","weapon","Rifle de Aleación de precisión + Cámara + acumulador; base Daño 7 Pen 3, Cámara Pen 5."],

["REF-SRV-01","Servicios","Reparar Placas Comunes Dañadas","repair","guided",400,1200,null,"crafting",3,"Forja y metal","professional","armor","BRA de Placas Comunes Dañadas; restaura estado Operativo y perfil original."],
["REF-SRV-02","Servicios","Reparar Acumulador estándar Dañado","repair","guided",50,240,null,"engineering",3,"Acumuladores arcanos","professional","device","Restaura Operativo; no rellena Energía."],
["REF-SRV-03","Servicios","Espada larga Común a Superior Equilibrada","modify","guided",50,480,300,"crafting",4,"Forja y metal","specialized","weapon","Ascenso a Superior + Equilibrada para Parada; Parada +3 con esa arma."],
["REF-SRV-04","Servicios","Añadir CRu 1 + Filo Arcano I a una Espada larga Superior","modify","guided",150,480,null,"crafting",4,"Forja y metal","specialized","weapon","Añade Matriz CRu 1 + Filo Arcano I; requiere Arcana Entrenada y Ritualismo Experto."],
["REF-SRV-05","Servicios","Recarga comercial de Acumulador estándar vacío","modify","reference-only",null,40,null,"engineering",0,"","improvised","device","8 E; precio de servicio 8 c; requiere fuente real. Se ejecuta por el motor de Energía, no como modificación material."],

["REF-INV-01","Investigación","Reconstruir el Plano de una Pistola repetidora","research","research",null,16320,null,"engineering",0,"Armamento","improvised","equipment","Reconstrucción Magistral; CMP 17 o 5 p; TBP 8 Jornadas; secuencia base 34 Jornadas."],
["REF-INV-02","Investigación","Reconstruir el Patrón de una Piedra de Impronta I","research","research",null,4320,null,"ritualism",0,"","improvised","equipment","Reconstrucción Compleja; CMP 2 o; TBP 1 Jornada; secuencia base aproximada 9 Jornadas."]
];

export const CRAFTING_REFERENCE_CATALOG=Object.freeze(rows.map((row)=>Object.freeze({
  ref:row[0],category:row[1],name:row[2],operation:row[3],execution:row[4],
  materialCopper:row[5],timeMinutes:row[6],valueCopper:row[7],
  skill:row[8],rank:row[9],specialization:row[10],installation:row[11],resultType:row[12],summary:row[13]
})));

const BY_REF=new Map(CRAFTING_REFERENCE_CATALOG.map((entry)=>[entry.ref,entry]));

export function craftingReference(value){
  return BY_REF.get(String(value??"").trim().toUpperCase())??null;
}

export function craftingReferenceOptions(){
  return Object.fromEntries(CRAFTING_REFERENCE_CATALOG.map((entry)=>[
    entry.ref,
    entry.ref+" · "+entry.name
  ]));
}

export function craftingReferenceGroups(){
  const groups=new Map();
  for(const entry of CRAFTING_REFERENCE_CATALOG){
    if(!groups.has(entry.category)) groups.set(entry.category,[]);
    groups.get(entry.category).push(entry);
  }
  return [...groups.entries()].map(([category,entries])=>({category,entries}));
}

function clone(value){
  return structuredClone(value);
}

function baseSystem(entry){
  return {
    operation:entry.operation,
    state:"draft",
    source:{recipeUuid:"",profileRef:entry.ref,sourceRevision:"craft-11"},
    target:{itemUuid:"",resultType:entry.resultType,resultName:entry.name,resultData:{}},
    economy:{
      referenceValueCopper:0,
      priceStatus:"unset",
      fixedPriceCopper:0,
      quality:"common",
      workMaterialGrade:"ordinary",
      affectedValueCopper:0
    },
    specialMaterials:[],
    modifications:[],
    enhancement:{mode:"modification"},
    repair:{affectedMaterialIds:[],ordinaryReplacementMaterialIds:[],specialReplacements:[],runicMatrixAffected:false,enchantmentMatrixAffected:false},
    components:[],
    time:{
      mode:["modify","repair","research"].includes(entry.operation)?"fixed":"derived",
      baseMinutes:entry.timeMinutes??0,
      adjustedBaseMinutes:entry.timeMinutes??0,
      requiredMinutes:entry.timeMinutes??0,
      completedMinutes:0
    },
    professional:{
      skill:entry.skill,
      specialization:entry.specialization,
      baseRank:entry.rank,
      requiredRank:entry.rank,
      baseInstallation:entry.installation,
      requiredInstallation:entry.installation,
      availableInstallation:"improvised",
      stableProcedure:false,
      materialsReady:false,
      essentialToolReady:false
    },
    assistants:{work:0,technical:0},
    execution:{accelerated:false,accelerationOutcome:"none",reductionFactors:[],stage:"",revision:0,committed:false,completionToken:""},
    consequences:[],
    ledger:{
      estimatedMaterialsCopper:entry.materialCopper??0,
      committedMaterialsCopper:0,
      recoveredMaterialsCopper:0,
      entries:[]
    }
  };
}

function catalogItem(catalog,name,type){
  const slug=normalizeSlug(name);
  return (Array.isArray(catalog)?catalog:[]).find((entry)=>
    entry?.type===type && normalizeSlug(entry.system?.slug||entry.name)===slug
  )??null;
}

function formulaSystem(entry,catalog){
  const system=baseSystem(entry);
  const source=catalogItem(catalog,entry.name,"formula");
  if(source){
    system.target.resultData=clone(source);
    system.target.resultData.system ??= {};
    system.target.resultData.system.known=false;
    system.target.resultData.system.quantity=1;
  }
  system.economy.referenceValueCopper=entry.valueCopper??0;
  system.economy.fixedPriceCopper=entry.valueCopper??0;
  system.time.mode="derived";
  system.professional.stableProcedure=true;
  return system;
}

function researchSystem(entry){
  const system=baseSystem(entry);
  const firstMinutes=entry.ref==="REF-INV-01"?5*J:3*J;
  const cmp=entry.ref==="REF-INV-01"?1750:200;
  const tbp=entry.ref==="REF-INV-01"?8*J:J;
  const complexity=entry.ref==="REF-INV-01"?"master":"complex";
  const principal=entry.ref==="REF-INV-01"?"engineering":"ritualism";
  const stableResultType=entry.ref==="REF-INV-01"?"plan":"pattern";
  const q1=entry.ref==="REF-INV-01"
    ?"Reconstruir el principio funcional de la muestra."
    :"Reconstruir la estructura del Patrón de la Impronta.";
  const q2=entry.ref==="REF-INV-01"
    ?"Reconstruir tolerancias y secuencia reproducible."
    :"Reconstruir condiciones de inscripción y soporte.";
  system.time={mode:"fixed",baseMinutes:firstMinutes,adjustedBaseMinutes:firstMinutes,requiredMinutes:firstMinutes,completedMinutes:0};
  system.professional={
    ...system.professional,
    skill:principal,
    baseRank:0,requiredRank:0,
    baseInstallation:"improvised",requiredInstallation:"improvised",availableInstallation:"improvised",
    stableProcedure:false,materialsReady:true,essentialToolReady:true
  };
  system.ledger.estimatedMaterialsCopper=0;
  system.research={
    concept:entry.name,
    intendedProfile:entry.ref==="REF-INV-01"?"Plano reproducible de Pistola repetidora":"Patrón reproducible de la Impronta concreta",
    analogueRef:entry.ref,
    viability:"possible",
    viabilityConditions:[],
    noveltyClass:"reconstruction",
    complexity,
    principalSkill:principal,
    auxiliarySkills:entry.ref==="REF-INV-01"?[]:["arcana","crafting"],
    projectedMaterialCopper:cmp,
    projectedBaseMinutes:tbp,
    questions:[
      {id:"q1",text:q1,skill:principal,status:"open",materialExperiment:false,corrective:false,attemptKey:"",blockedAttemptKey:""},
      {id:"q2",text:q2,skill:principal,status:"open",materialExperiment:false,corrective:false,attemptKey:"",blockedAttemptKey:""}
    ],
    validations:[{id:"v1",text:"Validación en una condición distinta y relevante.",skill:principal,status:"pending",consumptive:false}],
    risks:[],
    history:[],
    flags:{reconstructsExistingDesign:true,combinesStableSubsystems:false,createsNewProperty:false,breaksCanonicalLimit:false},
    stage:"questions",
    activeQuestionId:"q1",
    activeValidationId:"",
    prototypeStatus:"none",
    provisionalPlan:false,
    replicaStatus:"none",
    resumeStage:"",
    resumeValidationId:"",
    stableResultType
  };
  return system;
}

export function craftingProjectSourceFromReference(ref,{catalog=[]}={}){
  const entry=craftingReference(ref);
  if(!entry) return null;
  const system=entry.execution==="formula"
    ? formulaSystem(entry,catalog)
    : entry.execution==="research"
      ? researchSystem(entry)
      : baseSystem(entry);
  return {
    name:"Proyecto — "+entry.name,
    type:"project",
    system
  };
}

export function craftingReferenceGuidance(ref){
  const entry=craftingReference(ref);
  if(!entry) return null;
  const notes=[];
  if(entry.execution==="guided"){
    notes.push("Referencia compuesta/guiada: vincula el objetivo, componentes y capas mecánicas antes de Preparar.");
  }
  if(entry.execution==="reference-only"){
    notes.push("Referencia de servicio: su resolución pertenece a otro motor y no debe fingirse como fabricación material.");
  }
  if(entry.execution==="formula"){
    notes.push("Borrador ejecutable cuando el Actor conoce la Fórmula, posee Especialización/instalación y asigna sus materiales.");
  }
  if(entry.execution==="research"){
    notes.push("Borrador CRAFT-10 con Preguntas, CMP/TBP y primera etapa ya estructurados.");
  }
  return {entry,notes};
}
