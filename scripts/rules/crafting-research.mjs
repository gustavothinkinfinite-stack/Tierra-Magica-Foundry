const number=(value,fallback=0)=>{
  const parsed=Number(value);
  return Number.isFinite(parsed)?parsed:fallback;
};
const text=(value)=>String(value??"").trim();
const bool=(value)=>value===true;
const clone=(value)=>structuredClone(value);

export const RESEARCH_NOVELTY=Object.freeze(["adaptation","reconstruction","combination","innovation","frontier"]);
export const RESEARCH_COMPLEXITY=Object.freeze(["simple","standard","complex","master","extraordinary"]);
export const RESEARCH_VIABILITY=Object.freeze(["unassessed","possible","conditional","impossible"]);
export const RESEARCH_STAGES=Object.freeze(["questions","prototype","validation","provisional","replica","stable"]);
export const RESEARCH_RESULTS=Object.freeze(["success","failure","pifia","hazana"]);

const NOVELTY=Object.freeze({
  adaptation:{questions:1,df:0,validations:1},
  reconstruction:{questions:2,df:0,validations:1},
  combination:{questions:2,df:2,validations:2},
  innovation:{questions:3,df:2,validations:2},
  frontier:{questions:4,df:4,validations:3}
});
const COMPLEXITY=Object.freeze({
  simple:{df:10,questionMinutes:120},
  standard:{df:12,questionMinutes:480},
  complex:{df:14,questionMinutes:1440},
  master:{df:16,questionMinutes:2400},
  extraordinary:{df:18,questionMinutes:4800}
});
const CLASS_INDEX=Object.freeze(Object.fromEntries(RESEARCH_NOVELTY.map((key,index)=>[key,index])));

function enumValue(value,allowed,fallback){
  return allowed.includes(value)?value:fallback;
}
function normalizedId(value,prefix,index){
  const id=text(value);
  return id||prefix+"-"+(index+1);
}
function normalizeQuestion(row,index){
  return {
    id:normalizedId(row?.id,"question",index),
    text:text(row?.text),
    skill:text(row?.skill),
    status:enumValue(row?.status,["open","resolved","blocked"],"open"),
    materialExperiment:bool(row?.materialExperiment),
    corrective:bool(row?.corrective),
    attemptKey:text(row?.attemptKey),
    blockedAttemptKey:text(row?.blockedAttemptKey)
  };
}
function normalizeValidation(row,index){
  return {
    id:normalizedId(row?.id,"validation",index),
    text:text(row?.text),
    skill:text(row?.skill),
    status:enumValue(row?.status,["pending","passed","failed"],"pending"),
    consumptive:bool(row?.consumptive)
  };
}
function normalizeCondition(row,index){
  return {
    id:normalizedId(row?.id,"condition",index),
    text:text(row?.text),
    met:bool(row?.met)
  };
}

export function minimumResearchNovelty(flags={}){
  if(bool(flags.breaksCanonicalLimit)) return "frontier";
  if(bool(flags.createsNewProperty)) return "innovation";
  if(bool(flags.combinesStableSubsystems)) return "combination";
  if(bool(flags.reconstructsExistingDesign)) return "reconstruction";
  return "adaptation";
}

export function researchNoveltyProfile(value){
  const key=enumValue(value,RESEARCH_NOVELTY,"adaptation");
  return {key,...NOVELTY[key]};
}

export function researchComplexityProfile(value){
  const key=enumValue(value,RESEARCH_COMPLEXITY,"standard");
  return {key,...COMPLEXITY[key]};
}

export function normalizeResearchProject(source={}){
  const novelty=enumValue(source?.noveltyClass,RESEARCH_NOVELTY,"adaptation");
  const complexity=enumValue(source?.complexity,RESEARCH_COMPLEXITY,"standard");
  const viability=enumValue(source?.viability,RESEARCH_VIABILITY,"unassessed");
  const stage=enumValue(source?.stage,RESEARCH_STAGES,"questions");
  const questions=(Array.isArray(source?.questions)?source.questions:[]).map(normalizeQuestion);
  const validations=(Array.isArray(source?.validations)?source.validations:[]).map(normalizeValidation);
  const conditions=(Array.isArray(source?.viabilityConditions)?source.viabilityConditions:[]).map(normalizeCondition);
  return {
    concept:text(source?.concept),
    intendedProfile:text(source?.intendedProfile),
    analogueRef:text(source?.analogueRef),
    viability,
    viabilityConditions:conditions,
    noveltyClass:novelty,
    complexity,
    principalSkill:text(source?.principalSkill||"investigation"),
    auxiliarySkills:[...new Set((Array.isArray(source?.auxiliarySkills)?source.auxiliarySkills:[]).map(text).filter(Boolean))],
    projectedMaterialCopper:Math.max(0,Math.ceil(number(source?.projectedMaterialCopper))),
    projectedBaseMinutes:Math.max(0,number(source?.projectedBaseMinutes)),
    questions,
    validations,
    risks:(Array.isArray(source?.risks)?source.risks:[]).map(text).filter(Boolean),
    history:(Array.isArray(source?.history)?source.history:[]).map((row)=>({
      stage:text(row?.stage),
      subjectId:text(row?.subjectId),
      result:text(row?.result),
      attemptKey:text(row?.attemptKey),
      materialCopper:Math.max(0,Math.ceil(number(row?.materialCopper))),
      timeMinutes:Math.max(0,number(row?.timeMinutes)),
      df:row?.df===null||row?.df===undefined?null:number(row.df)
    })),
    flags:{
      reconstructsExistingDesign:bool(source?.flags?.reconstructsExistingDesign),
      combinesStableSubsystems:bool(source?.flags?.combinesStableSubsystems),
      createsNewProperty:bool(source?.flags?.createsNewProperty),
      breaksCanonicalLimit:bool(source?.flags?.breaksCanonicalLimit)
    },
    stage,
    activeQuestionId:text(source?.activeQuestionId),
    activeValidationId:text(source?.activeValidationId),
    prototypeStatus:enumValue(source?.prototypeStatus,["none","experimental","failed"],"none"),
    provisionalPlan:bool(source?.provisionalPlan),
    replicaStatus:enumValue(source?.replicaStatus,["none","stable","failed"],"none"),
    resumeStage:enumValue(source?.resumeStage,["","prototype","validation","replica"],""),
    resumeValidationId:text(source?.resumeValidationId),
    stableResultType:enumValue(source?.stableResultType,["plan","formula","pattern","finding"],"plan")
  };
}

export function researchStageQuote(source={}){
  const research=normalizeResearchProject(source);
  const novelty=researchNoveltyProfile(research.noveltyClass);
  const complexity=researchComplexityProfile(research.complexity);
  const cmp=research.projectedMaterialCopper;
  const tbp=research.projectedBaseMinutes;

  if(research.stage==="questions"){
    const question=research.questions.find((row)=>row.id===research.activeQuestionId);
    if(!question) return {valid:false,issue:"La etapa de Investigación no identifica una Pregunta activa."};
    return {
      valid:true,stage:"questions",subjectId:question.id,
      materialCopper:question.materialExperiment?Math.max(10,Math.ceil(cmp*0.10)):0,
      timeMinutes:complexity.questionMinutes,
      df:complexity.df+novelty.df,
      skill:question.skill||research.principalSkill,
      requiresRoll:true
    };
  }
  if(research.stage==="prototype"){
    if(cmp<=0||tbp<=0) return {valid:false,issue:"Prototipo exige CMP y TBP proyectados mayores que 0."};
    return {
      valid:true,stage:"prototype",subjectId:"",
      materialCopper:Math.ceil(cmp*1.25),
      timeMinutes:tbp*1.5,
      df:complexity.df+(research.noveltyClass==="frontier"?4:2),
      skill:research.principalSkill,
      requiresRoll:true
    };
  }
  if(research.stage==="validation"){
    const validation=research.validations.find((row)=>row.id===research.activeValidationId);
    if(!validation) return {valid:false,issue:"La etapa de Validación no identifica una condición activa."};
    return {
      valid:true,stage:"validation",subjectId:validation.id,
      materialCopper:validation.consumptive?Math.max(10,Math.ceil(cmp*0.05)):0,
      timeMinutes:Math.max(60,tbp*0.25),
      df:complexity.df,
      skill:validation.skill||research.principalSkill,
      requiresRoll:true
    };
  }
  if(research.stage==="provisional"){
    if(tbp<=0) return {valid:false,issue:"Plano provisional exige TBP proyectado mayor que 0."};
    return {
      valid:true,stage:"provisional",subjectId:"",
      materialCopper:0,timeMinutes:Math.max(120,tbp*0.25),df:null,skill:research.principalSkill,requiresRoll:false
    };
  }
  if(research.stage==="replica"){
    if(cmp<=0||tbp<=0) return {valid:false,issue:"Réplica exige CMP y TBP proyectados mayores que 0."};
    return {
      valid:true,stage:"replica",subjectId:"",
      materialCopper:cmp,timeMinutes:tbp,df:complexity.df,skill:research.principalSkill,requiresRoll:true
    };
  }
  if(research.stage==="stable"){
    return {valid:true,stage:"stable",subjectId:"",materialCopper:0,timeMinutes:0,df:null,requiresRoll:false};
  }
  return {valid:false,issue:"Etapa de Investigación desconocida."};
}

export function validateResearchProject(source={}){
  const research=normalizeResearchProject(source);
  const issues=[];
  const novelty=researchNoveltyProfile(research.noveltyClass);
  const minimum=minimumResearchNovelty(research.flags);

  if(!research.concept) issues.push({code:"research-concept",message:"La Investigación debe declarar un Concepto exacto."});
  if(!research.principalSkill) issues.push({code:"research-principal",message:"La Investigación debe declarar una Disciplina Principal."});
  if(CLASS_INDEX[research.noveltyClass]<CLASS_INDEX[minimum]){
    issues.push({code:"research-novelty-understated",message:"La Clase de novedad está por debajo del mínimo exigido por el objetivo.",minimum});
  }

  const questionTexts=new Set();
  for(const question of research.questions){
    const key=question.text.toLowerCase();
    if(!question.text) issues.push({code:"research-question-empty",questionId:question.id,message:"Toda Pregunta debe ser concreta."});
    if(key&&questionTexts.has(key)) issues.push({code:"research-question-duplicate",questionId:question.id,message:"Las Preguntas mínimas deben ser distintas."});
    if(key) questionTexts.add(key);
  }
  if(research.questions.filter((row)=>!row.corrective).length<novelty.questions){
    issues.push({code:"research-question-count",message:"La Clase exige más Preguntas de Investigación distintas.",minimum:novelty.questions});
  }

  const validationTexts=new Set();
  for(const validation of research.validations){
    const key=validation.text.toLowerCase();
    if(!validation.text) issues.push({code:"research-validation-empty",validationId:validation.id,message:"Toda condición de Validación debe ser concreta."});
    if(key&&validationTexts.has(key)) issues.push({code:"research-validation-duplicate",validationId:validation.id,message:"Las Validaciones deben representar condiciones distintas."});
    if(key) validationTexts.add(key);
  }
  if(["prototype","validation","provisional","replica","stable"].includes(research.stage) && research.validations.length<novelty.validations){
    issues.push({code:"research-validation-count",message:"Las condiciones de Validación deben declararse antes del Prototipo.",minimum:novelty.validations});
  }

  if(research.viability==="impossible" && ["prototype","validation","provisional","replica","stable"].includes(research.stage)){
    issues.push({code:"research-impossible",message:"Actualmente imposible no puede superarse mediante tiradas de desarrollo."});
  }
  if(research.viability==="unassessed" && ["prototype","validation","provisional","replica","stable"].includes(research.stage)){
    issues.push({code:"research-viability",message:"La Viabilidad debe adjudicarse antes de entrar en Prototipo."});
  }
  if(research.viability==="conditional" &&
    research.viabilityConditions.some((row)=>!row.met) &&
    ["prototype","validation","provisional","replica","stable"].includes(research.stage)){
    issues.push({code:"research-conditions",message:"Faltan condiciones explícitas de Viabilidad."});
  }

  if(["prototype","validation","provisional","replica","stable"].includes(research.stage)){
    const unresolved=research.questions.filter((row)=>row.status!=="resolved");
    if(unresolved.length) issues.push({code:"research-questions-unresolved",message:"No puede avanzar mientras existan Preguntas/Bloqueos sin resolver."});
  }
  if(["validation","provisional","replica","stable"].includes(research.stage) && research.prototypeStatus!=="experimental"){
    issues.push({code:"research-prototype",message:"Validar exige un Prototipo Experimental funcional."});
  }
  if(["provisional","replica","stable"].includes(research.stage) && research.validations.some((row)=>row.status!=="passed")){
    issues.push({code:"research-validations-pending",message:"Plano provisional exige completar todas las Validaciones declaradas."});
  }
  if(["replica","stable"].includes(research.stage) && !research.provisionalPlan){
    issues.push({code:"research-provisional",message:"La Réplica exige un Plano provisional."});
  }
  if(research.stage==="stable" && research.replicaStatus!=="stable"){
    issues.push({code:"research-replica",message:"Sólo una Réplica exitosa estabiliza el procedimiento."});
  }

  const successful=(stage,subjectId="")=>research.history.some((row)=>
    row.stage===stage &&
    (!subjectId || row.subjectId===subjectId) &&
    ["success","hazana"].includes(row.result)
  );
  for(const question of research.questions){
    if(question.status==="resolved" && !successful("questions",question.id)){
      issues.push({code:"research-history-question",questionId:question.id,message:"Una Pregunta resuelta necesita una resolución autorizada en el historial."});
    }
  }
  if(research.prototypeStatus==="experimental" && !successful("prototype")){
    issues.push({code:"research-history-prototype",message:"Experimental requiere un Prototipo resuelto con éxito."});
  }
  for(const validation of research.validations){
    if(validation.status==="passed" && !successful("validation",validation.id)){
      issues.push({code:"research-history-validation",validationId:validation.id,message:"Una Validación superada necesita historial autorizado."});
    }
  }
  if(research.provisionalPlan && !successful("provisional")){
    issues.push({code:"research-history-provisional",message:"El Plano provisional necesita la etapa documental completada."});
  }
  if(research.replicaStatus==="stable" && !successful("replica")){
    issues.push({code:"research-history-replica",message:"Un procedimiento Estable necesita Réplica exitosa registrada."});
  }

  const quote=researchStageQuote(research);
  if(!quote.valid && research.stage!=="stable") issues.push({code:"research-stage-quote",message:quote.issue});
  return {valid:issues.length===0,issues,research,quote};
}

function nextQuestionId(research){
  return research.questions.find((row)=>row.status!=="resolved")?.id ?? "";
}
function nextValidationId(research){
  return research.validations.find((row)=>row.status!=="passed")?.id ?? "";
}
function addCorrective(research,textValue,resumeStage,resumeValidationId=""){
  const questionText=text(textValue);
  if(!questionText) return {valid:false,issue:"El fallo exige declarar una Pregunta Correctiva específica."};
  const id="corrective-"+(research.questions.length+1);
  research.questions.push({
    id,text:questionText,skill:research.principalSkill,status:"open",materialExperiment:false,corrective:true,
    attemptKey:"",blockedAttemptKey:""
  });
  research.stage="questions";
  research.activeQuestionId=id;
  research.resumeStage=resumeStage;
  research.resumeValidationId=resumeValidationId;
  return {valid:true};
}

export function applyResearchStageResult(source={},{
  result="success",
  attemptKey="",
  correctiveQuestionText=""
}={}){
  const checked=validateResearchProject(source);
  if(!checked.valid) return {valid:false,issues:checked.issues,research:checked.research};
  const research=clone(checked.research);
  const outcome=enumValue(result,RESEARCH_RESULTS,"success");
  const resolvedQuote=checked.quote?.valid ? clone(checked.quote) : null;

  if(research.stage==="questions"){
    const question=research.questions.find((row)=>row.id===research.activeQuestionId);
    if(!question) return {valid:false,issue:"No existe Pregunta activa.",research};
    const key=text(attemptKey);
    if(!key) return {valid:false,issue:"Resolver una Pregunta exige identificar la evidencia/método de este intento.",research};
    if(question.status==="blocked" && key===question.blockedAttemptKey){
      return {valid:false,issue:"Un Bloqueo no puede repetirse sin cambiar evidencia, muestra, método, instalación, instrumento, colaborador, material o Concepto.",research};
    }
    question.attemptKey=key;
    if(["success","hazana"].includes(outcome)){
      question.status="resolved";
      question.blockedAttemptKey="";
      const remaining=nextQuestionId(research);
      if(remaining){
        research.activeQuestionId=remaining;
      }else if(research.resumeStage){
        const resume=research.resumeStage;
        research.stage=resume;
        if(resume==="validation" && research.resumeValidationId){
          const validation=research.validations.find((row)=>row.id===research.resumeValidationId);
          if(validation) validation.status="pending";
          research.activeValidationId=research.resumeValidationId;
        }
        research.resumeStage="";
        research.resumeValidationId="";
        research.activeQuestionId="";
      }else{
        research.stage="prototype";
        research.activeQuestionId="";
      }
    }else{
      question.status="blocked";
      question.blockedAttemptKey=key;
    }
  } else if(research.stage==="prototype"){
    if(["success","hazana"].includes(outcome)){
      research.prototypeStatus="experimental";
      research.stage="validation";
      research.activeValidationId=nextValidationId(research);
    }else{
      research.prototypeStatus="failed";
      const added=addCorrective(research,correctiveQuestionText,"prototype");
      if(!added.valid) return {...added,research};
    }
  } else if(research.stage==="validation"){
    const validation=research.validations.find((row)=>row.id===research.activeValidationId);
    if(!validation) return {valid:false,issue:"No existe Validación activa.",research};
    if(["success","hazana"].includes(outcome)){
      validation.status="passed";
      const next=nextValidationId(research);
      if(next){
        research.activeValidationId=next;
      }else{
        research.activeValidationId="";
        research.stage="provisional";
      }
    }else{
      validation.status="failed";
      const added=addCorrective(research,correctiveQuestionText,"validation",validation.id);
      if(!added.valid) return {...added,research};
    }
  } else if(research.stage==="provisional"){
    research.provisionalPlan=true;
    research.stage="replica";
  } else if(research.stage==="replica"){
    if(["success","hazana"].includes(outcome)){
      research.replicaStatus="stable";
      research.stage="stable";
    }else{
      research.replicaStatus="failed";
      const added=addCorrective(research,correctiveQuestionText,"replica");
      if(!added.valid) return {...added,research};
    }
  } else if(research.stage==="stable"){
    return {valid:false,issue:"El procedimiento ya está Estable.",research};
  }

  if(resolvedQuote){
    research.history.push({
      stage:resolvedQuote.stage,
      subjectId:resolvedQuote.subjectId||"",
      result:outcome,
      attemptKey:text(attemptKey),
      materialCopper:resolvedQuote.materialCopper,
      timeMinutes:resolvedQuote.timeMinutes,
      df:resolvedQuote.df
    });
  }

  const nextCheck=validateResearchProject(research);
  return {
    valid:nextCheck.valid,
    issues:nextCheck.issues,
    research:nextCheck.research,
    quote:nextCheck.quote,
    outcome
  };
}

export function researchExecutionIssues(researchSource,projectSource={}){
  const checked=validateResearchProject(researchSource);
  const issues=[...checked.issues];
  if(!checked.quote?.valid || checked.research.stage==="stable") return issues;
  const quote=checked.quote;
  const time=projectSource?.time??{};
  const ledger=projectSource?.ledger??{};
  if(Math.abs(Math.max(0,number(time.baseMinutes))-quote.timeMinutes)>Number.EPSILON){
    issues.push({code:"research-time",field:"baseMinutes",message:"El tiempo de la etapa no coincide con CRAFT-10.",expectedMinutes:quote.timeMinutes});
  }
  if(Math.abs(Math.max(0,number(time.adjustedBaseMinutes))-quote.timeMinutes)>Number.EPSILON){
    issues.push({code:"research-time",field:"adjustedBaseMinutes",message:"El tiempo de la etapa no coincide con CRAFT-10.",expectedMinutes:quote.timeMinutes});
  }
  if(Math.abs(Math.max(0,number(time.requiredMinutes))-quote.timeMinutes)>Number.EPSILON){
    issues.push({code:"research-time",field:"requiredMinutes",message:"El tiempo de la etapa no coincide con CRAFT-10.",expectedMinutes:quote.timeMinutes});
  }
  if(String(projectSource?.professional?.skill??"")!==String(quote.skill??"")){
    issues.push({code:"research-stage-skill",message:"La Habilidad principal del Proyecto no coincide con la etapa activa.",expectedSkill:quote.skill});
  }
  if(Math.max(0,Math.ceil(number(ledger.estimatedMaterialsCopper)))!==quote.materialCopper){
    issues.push({code:"research-material",message:"El coste material de la etapa no coincide con CRAFT-10.",expectedCopper:quote.materialCopper});
  }
  return issues;
}
