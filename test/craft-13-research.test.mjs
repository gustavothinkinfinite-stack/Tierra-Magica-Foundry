import test from "node:test";
import assert from "node:assert/strict";
import {
  applyResearchStageResult,
  minimumResearchNovelty,
  researchExecutionIssues,
  researchStageQuote,
  validateResearchProject
} from "../scripts/rules/crafting-research.mjs";
import {
  advanceCraftingProjectWork,
  reserveCraftingProjectMaterials,
  resolveResearchProjectStage
} from "../scripts/rules/crafting-transactions.mjs";

function applyChanges(document,changes){
  for(const [path,value] of Object.entries(changes)){
    const keys=path.split(".");
    if(keys[0]==="system") keys.shift();
    let node=document.system;
    while(keys.length>1){
      const key=keys.shift();
      node[key] ??= {};
      node=node[key];
    }
    node[keys[0]]=value;
  }
}

function research(overrides={}){
  return {
    concept:"Reproducir un mecanismo estable sin añadir propiedades.",
    intendedProfile:"Mecanismo reproducible",
    analogueRef:"REF-TEST",
    viability:"possible",
    viabilityConditions:[],
    noveltyClass:"adaptation",
    complexity:"standard",
    principalSkill:"investigation",
    auxiliarySkills:[],
    projectedMaterialCopper:100,
    projectedBaseMinutes:480,
    questions:[{
      id:"q1",text:"¿Qué tolerancia necesita el mecanismo?",skill:"investigation",
      status:"open",materialExperiment:false,corrective:false,attemptKey:"",blockedAttemptKey:""
    }],
    validations:[{
      id:"v1",text:"Funcionamiento continuo",skill:"investigation",status:"pending",consumptive:false
    }],
    risks:[],
    history:[],
    flags:{
      reconstructsExistingDesign:false,
      combinesStableSubsystems:false,
      createsNewProperty:false,
      breaksCanonicalLimit:false
    },
    stage:"questions",
    activeQuestionId:"q1",
    activeValidationId:"",
    prototypeStatus:"none",
    provisionalPlan:false,
    replicaStatus:"none",
    resumeStage:"",
    resumeValidationId:"",
    stableResultType:"plan",
    ...overrides
  };
}

test("CRAFT-13G: la Clase mínima no puede rebajarse por redacción",()=>{
  assert.equal(minimumResearchNovelty({}),"adaptation");
  assert.equal(minimumResearchNovelty({reconstructsExistingDesign:true}),"reconstruction");
  assert.equal(minimumResearchNovelty({combinesStableSubsystems:true}),"combination");
  assert.equal(minimumResearchNovelty({createsNewProperty:true}),"innovation");
  assert.equal(minimumResearchNovelty({breaksCanonicalLimit:true}),"frontier");

  const forged=research({
    noveltyClass:"adaptation",
    flags:{reconstructsExistingDesign:false,combinesStableSubsystems:false,createsNewProperty:true,breaksCanonicalLimit:false}
  });
  const checked=validateResearchProject(forged);
  assert.equal(checked.valid,false);
  assert.ok(checked.issues.some((row)=>row.code==="research-novelty-understated"));
});

test("CRAFT-13G: costes, tiempos y DF de CRAFT-10 son exactos",()=>{
  const question=researchStageQuote(research());
  assert.deepEqual(
    {material:question.materialCopper,time:question.timeMinutes,df:question.df,skill:question.skill},
    {material:0,time:480,df:12,skill:"investigation"}
  );

  const physicalQuestion=researchStageQuote(research({
    questions:[{id:"q1",text:"Ensayo físico",skill:"engineering",status:"open",materialExperiment:true,corrective:false,attemptKey:"",blockedAttemptKey:""}]
  }));
  assert.equal(physicalQuestion.materialCopper,10);

  const prototype=researchStageQuote(research({stage:"prototype"}));
  assert.deepEqual(
    {material:prototype.materialCopper,time:prototype.timeMinutes,df:prototype.df},
    {material:125,time:720,df:14}
  );

  const frontier=research({
    noveltyClass:"frontier",
    complexity:"master",
    flags:{reconstructsExistingDesign:false,combinesStableSubsystems:false,createsNewProperty:false,breaksCanonicalLimit:true},
    questions:[
      {id:"q1",text:"A",status:"resolved",skill:"engineering"},
      {id:"q2",text:"B",status:"resolved",skill:"engineering"},
      {id:"q3",text:"C",status:"resolved",skill:"engineering"},
      {id:"q4",text:"D",status:"resolved",skill:"engineering"}
    ],
    validations:[
      {id:"v1",text:"A",status:"pending"},{id:"v2",text:"B",status:"pending"},{id:"v3",text:"C",status:"pending"}
    ],
    stage:"prototype",
    history:[
      {stage:"questions",subjectId:"q1",result:"success",materialCopper:0,timeMinutes:2400,df:20},
      {stage:"questions",subjectId:"q2",result:"success",materialCopper:0,timeMinutes:2400,df:20},
      {stage:"questions",subjectId:"q3",result:"success",materialCopper:0,timeMinutes:2400,df:20},
      {stage:"questions",subjectId:"q4",result:"success",materialCopper:0,timeMinutes:2400,df:20}
    ]
  });
  assert.equal(researchStageQuote(frontier).df,20);
});

test("CRAFT-13G: un Bloqueo no permite repetir la misma condición material",()=>{
  const first=applyResearchStageResult(research(),{result:"failure",attemptKey:"muestra-a"});
  assert.equal(first.valid,true);
  assert.equal(first.research.questions[0].status,"blocked");

  const spam=applyResearchStageResult(first.research,{result:"success",attemptKey:"muestra-a"});
  assert.equal(spam.valid,false);
  assert.match(spam.issue,/Bloqueo/);

  const changed=applyResearchStageResult(first.research,{result:"success",attemptKey:"muestra-b"});
  assert.equal(changed.valid,true);
  assert.equal(changed.research.stage,"prototype");
});

test("CRAFT-13G: Hazaña de Prototipo no estabiliza ni salta Validación/Réplica",()=>{
  const q=applyResearchStageResult(research(),{result:"hazana",attemptKey:"archivo-a"});
  assert.equal(q.valid,true);
  const proto=applyResearchStageResult(q.research,{result:"hazana"});
  assert.equal(proto.valid,true);
  assert.equal(proto.research.prototypeStatus,"experimental");
  assert.equal(proto.research.stage,"validation");
  assert.equal(proto.research.replicaStatus,"none");
});

test("CRAFT-13G: fallo de Prototipo/Validación/Réplica exige Pregunta Correctiva",()=>{
  const q=applyResearchStageResult(research(),{result:"success",attemptKey:"archivo-a"});
  assert.equal(applyResearchStageResult(q.research,{result:"failure"}).valid,false);

  const failed=applyResearchStageResult(q.research,{
    result:"failure",
    correctiveQuestionText:"¿Por qué vibra bajo carga?"
  });
  assert.equal(failed.valid,true);
  assert.equal(failed.research.stage,"questions");
  assert.equal(failed.research.resumeStage,"prototype");
  assert.ok(failed.research.questions.some((row)=>row.corrective));
});

test("CRAFT-13G: procedimiento sólo queda Estable tras Validación, Plano provisional y Réplica",()=>{
  let state=applyResearchStageResult(research(),{result:"success",attemptKey:"archivo-a"}).research;
  state=applyResearchStageResult(state,{result:"success"}).research;
  assert.equal(state.stage,"validation");
  state=applyResearchStageResult(state,{result:"success"}).research;
  assert.equal(state.stage,"provisional");
  state=applyResearchStageResult(state,{result:"success"}).research;
  assert.equal(state.provisionalPlan,true);
  assert.equal(state.stage,"replica");
  state=applyResearchStageResult(state,{result:"success"}).research;
  assert.equal(state.stage,"stable");
  assert.equal(state.replicaStatus,"stable");
  assert.ok(state.history.some((row)=>row.stage==="replica" && row.result==="success"));
});

test("CRAFT-13G: no puede falsificarse una Pregunta resuelta sin historial autorizado",()=>{
  const forged=research({
    stage:"prototype",
    activeQuestionId:"",
    questions:[{id:"q1",text:"Pregunta",skill:"investigation",status:"resolved"}]
  });
  const checked=validateResearchProject(forged);
  assert.equal(checked.valid,false);
  assert.ok(checked.issues.some((row)=>row.code==="research-history-question"));
});

test("CRAFT-13G: el Proyecto genérico debe coincidir con coste, tiempo y Habilidad de la etapa",()=>{
  const r=research();
  assert.deepEqual(researchExecutionIssues(r,{
    time:{baseMinutes:480,adjustedBaseMinutes:480,requiredMinutes:480},
    ledger:{estimatedMaterialsCopper:0},
    professional:{skill:"investigation"}
  }),[]);
  const issues=researchExecutionIssues(r,{
    time:{baseMinutes:60,adjustedBaseMinutes:60,requiredMinutes:60},
    ledger:{estimatedMaterialsCopper:1},
    professional:{skill:"alchemy"}
  });
  assert.ok(issues.some((row)=>row.code==="research-time"));
  assert.ok(issues.some((row)=>row.code==="research-material"));
  assert.ok(issues.some((row)=>row.code==="research-stage-skill"));
});

function projectSystem(){
  return {
    modelVersion:1,
    operation:"research",
    state:"ready",
    source:{recipeUuid:"",profileRef:"",sourceRevision:""},
    target:{itemUuid:"",resultType:"equipment",resultName:"",resultData:{}},
    economy:{
      referenceValueCopper:0,priceStatus:"unset",fixedPriceCopper:0,
      quality:"common",workMaterialGrade:"ordinary",affectedValueCopper:0
    },
    specialMaterials:[],
    modifications:[],
    enhancement:{mode:"modification"},
    repair:{},
    research:research(),
    components:[],
    time:{mode:"fixed",baseMinutes:480,adjustedBaseMinutes:480,requiredMinutes:480,completedMinutes:0},
    professional:{
      skill:"investigation",specialization:"",baseRank:0,requiredRank:1,
      baseInstallation:"improvised",requiredInstallation:"improvised",availableInstallation:"adequate",
      stableProcedure:false,materialsReady:false,essentialToolReady:true
    },
    assistants:{work:0,technical:0},
    execution:{accelerated:false,accelerationOutcome:"none",reductionFactors:[],stage:"",revision:0,committed:false,completionToken:""},
    consequences:[],
    ledger:{estimatedMaterialsCopper:0,committedMaterialsCopper:0,recoveredMaterialsCopper:0,entries:[]}
  };
}

test("CRAFT-13G: una Pregunta usa reserva/tiempo transaccional y prepara la siguiente etapa",async()=>{
  const actor={
    id:"researcher",
    uuid:"Actor.researcher",
    system:{skills:{investigation:{rank:2}}},
    items:[]
  };
  const project={
    id:"project",
    uuid:"Actor.researcher.Item.project",
    type:"project",
    parent:actor,
    system:projectSystem(),
    async update(changes){applyChanges(this,changes);return changes;}
  };

  const reserved=await reserveCraftingProjectMaterials(project,{expectedRevision:0});
  assert.equal(reserved.ok,true);
  assert.equal(project.system.state,"active");
  assert.equal(project.system.execution.revision,1);

  const worked=await advanceCraftingProjectWork(project,480,{expectedRevision:1});
  assert.equal(worked.ok,true);
  assert.equal(worked.remainingMinutes,0);
  assert.equal(project.system.execution.revision,2);

  const resolved=await resolveResearchProjectStage(project,{
    expectedRevision:2,
    result:"success",
    attemptKey:"archivo-a"
  });
  assert.equal(resolved.ok,true);
  assert.equal(resolved.research.stage,"prototype");
  assert.equal(project.system.state,"draft");
  assert.equal(project.system.time.requiredMinutes,720);
  assert.equal(project.system.ledger.estimatedMaterialsCopper,125);
  assert.equal(project.system.ledger.entries.length,0);
  assert.equal(project.system.execution.revision,3);
});
