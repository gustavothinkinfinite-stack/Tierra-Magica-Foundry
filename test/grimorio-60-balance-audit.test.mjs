import test from "node:test";
import assert from "node:assert/strict";
import { STARTER_CONTENT } from "../scripts/content.mjs";
import { GRIMORIO_AUDIT_CANDIDATES, GRIMORIO_SPATIAL_CLOSURE_PROPOSALS, AUDIT_REFERENCE_TARGETS } from "./fixtures/grimorio-60-audit.mjs";

function outcomes2d10(mode="normal") {
  const values=[];
  if(mode==="normal"){
    for(let a=1;a<=10;a+=1) for(let b=1;b<=10;b+=1) values.push(a+b);
    return values;
  }
  for(let a=1;a<=10;a+=1) for(let b=1;b<=10;b+=1) for(let c=1;c<=10;c+=1){
    const dice=[a,b,c].sort((x,y)=>x-y);
    values.push(mode==="advantage" ? dice[1]+dice[2] : dice[0]+dice[1]);
  }
  return values;
}

function successProbability({bonus=0,df,mode="normal"}={}) {
  const outcomes=outcomes2d10(mode);
  return outcomes.filter((sum)=>sum+bonus>=df).length/outcomes.length;
}

function finalDamage({damage=0,penetration=0,protection=0}={}) {
  return Math.max(0,damage-Math.max(0,protection-penetration));
}

function expectedDamage({bonus,defense,damage,penetration=0,protection=0,mode="normal"}) {
  return successProbability({bonus,df:defense,mode})*finalDamage({damage,penetration,protection});
}

test("auditoría probabilística usa enumeración exacta para normal, Ventaja y Desventaja",()=>{
  assert.equal(outcomes2d10("normal").length,100);
  assert.equal(outcomes2d10("advantage").length,1000);
  assert.equal(outcomes2d10("disadvantage").length,1000);
  const normal=successProbability({bonus:7,df:14});
  const advantage=successProbability({bonus:7,df:14,mode:"advantage"});
  const disadvantage=successProbability({bonus:7,df:14,mode:"disadvantage"});
  assert.equal(normal,0.85);
  assert.ok(advantage>normal);
  assert.ok(disadvantage<normal);
});

test("benchmark nivel 1: magia ofensiva no desplaza el daño individual de armas especializadas",()=>{
  const soldier=AUDIT_REFERENCE_TARGETS.find((entry)=>entry.name==="Soldado");
  const spell=STARTER_CONTENT.spell.find((entry)=>entry.name==="Proyectil Ígneo").system;
  const sword=STARTER_CONTENT.weapon.find((entry)=>entry.name==="Espada larga").system;
  const rifle=STARTER_CONTENT.weapon.find((entry)=>entry.name==="Rifle temprano").system;

  const projectile=expectedDamage({bonus:7,defense:soldier.defense,damage:spell.damage,penetration:spell.penetration,protection:soldier.protection});
  const swordDamage=expectedDamage({bonus:7,defense:soldier.defense,damage:sword.damage+3,penetration:sword.penetration,protection:soldier.protection});
  const rifleDamage=expectedDamage({bonus:7,defense:soldier.defense,damage:rifle.damage,penetration:rifle.penetration,protection:soldier.protection});

  assert.ok(projectile<swordDamage);
  assert.ok(projectile<rifleDamage);
  assert.ok(Math.abs(projectile-2.55)<1e-12);
  assert.ok(Math.abs(swordDamage-4.25)<1e-12);
  assert.ok(Math.abs(rifleDamage-5.95)<1e-12);
});

test("Onda de Choque y Arco Fulminante conservan eficiencia multiobjetivo equivalente",()=>{
  const targets=["Bandido","Guardia","Soldado"].map((name)=>AUDIT_REFERENCE_TARGETS.find((entry)=>entry.name===name));
  const onda=STARTER_CONTENT.spell.find((entry)=>entry.name==="Onda de Choque").system;
  const arco=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Arco Fulminante");

  const expected=(spell)=>targets.reduce((sum,target)=>sum+expectedDamage({
    bonus:7,defense:target.defense,damage:spell.damage,penetration:spell.penetration,protection:target.protection
  }),0);
  const ondaEfficiency=expected(onda)/onda.manaCost;
  const arcoEfficiency=expected(arco)/arco.mana;

  assert.ok(Math.abs(ondaEfficiency-arcoEfficiency)<0.01);
  assert.ok(Math.abs(ondaEfficiency-1.3125)<1e-12);
});

test("los nuevos daños individuales pagan más Maná cuando igualan o superan Proyectil Ígneo",()=>{
  const projectile=STARTER_CONTENT.spell.find((entry)=>entry.name==="Proyectil Ígneo").system;
  const direct=GRIMORIO_AUDIT_CANDIDATES.filter((entry)=>entry.role==="single-damage-control");
  for(const spell of direct){
    if(spell.damage>=projectile.damage && spell.penetration>=projectile.penetration){
      assert.ok(spell.mana>projectile.manaCost,spell.name);
    }
  }
});

test("Restauración no supera Cierre Restaurador en creación neta eficiente de Vida",()=>{
  const closureRate=4/3;
  const candidates=GRIMORIO_AUDIT_CANDIDATES.filter((entry)=>entry.discipline==="restoration");
  for(const spell of candidates){
    if(spell.netHealing===0) continue;
    if(spell.role==="multiple-healing"){
      assert.ok((spell.healing*spell.maxTargets)/spell.mana<=closureRate,spell.name);
    } else if(spell.role==="periodic-healing"){
      assert.ok((spell.healingPerPulse*spell.pulses)/spell.mana<=closureRate,spell.name);
      assert.equal(spell.canHealAtZero,false,spell.name);
      assert.equal(spell.reapplyExtraPulse,false,spell.name);
    } else if(Number.isFinite(spell.healing)) {
      assert.ok(spell.healing/spell.mana<=closureRate,spell.name);
    }
  }
});

test("ninguna propuesta de Influencia reintroduce Dominación o pérdida repetida de Acción",()=>{
  const influence=GRIMORIO_AUDIT_CANDIDATES.filter((entry)=>entry.discipline==="influence");
  for(const spell of influence){
    assert.notEqual(spell.actionDenial,true,spell.name);
    assert.notEqual(spell.forcedAction,true,spell.name);
    assert.notEqual(spell.combatEndsAutomatically,true,spell.name);
  }
});

test("la progresión de ataque mental queda registrada como riesgo y Mente Anclada reduce la probabilidad",()=>{
  const stages=[
    {attack:7,mental:14},
    {attack:10,mental:15},
    {attack:13,mental:16}
  ];
  const probabilities=stages.map((stage)=>successProbability({bonus:stage.attack,df:stage.mental}));
  const anchored=stages.map((stage)=>successProbability({bonus:stage.attack,df:stage.mental+2}));
  assert.deepEqual(probabilities,[0.85,0.94,0.99]);
  assert.deepEqual(anchored,[0.72,0.85,0.94]);
  assert.ok(probabilities[2]>0.95); // señal de auditoría: no autoriza hard control.
});

test("ilusiones usan DF estática y nunca una tirada pescable como potencia persistente",()=>{
  const illusions=GRIMORIO_AUDIT_CANDIDATES.filter((entry)=>String(entry.role).includes("illusion") && entry.name!=="Revelación Sensorial");
  for(const spell of illusions){
    if(spell.name==="Duplicado Ilusorio") continue;
    assert.equal(spell.illusionDf,"static",spell.name);
  }
  const equalSpecialists=successProbability({bonus:7,df:18});
  const revealed=successProbability({bonus:7,df:18,mode:"advantage"});
  assert.equal(equalSpecialists,0.55);
  assert.ok(Math.abs(revealed-0.785)<1e-12);
});

test("teletransporte y conexiones espaciales no amplifican Origen Remoto",()=>{
  for(const name of ["Paso Breve","Trasposición","Umbral","Portal"]){
    const system=STARTER_CONTENT.spell.find((entry)=>entry.name===name).system;
    assert.equal(system.remoteOriginCompatible,false,name);
  }
  for(const name of ["Salto Vinculado","Gran Traslación"]){
    const spell=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name===name);
    assert.equal(spell.remoteOriginCompatible,false,name);
  }
});

test("invocaciones demandantes ocupan Sostenimiento y no conceden obediencia automática",()=>{
  const minor=STARTER_CONTENT.spell.find((entry)=>entry.name==="Llamada Menor").system;
  const major=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Llamada Mayor");
  assert.equal(minor.sustained,true);
  assert.equal(major.sustained,true);
  assert.equal(major.automaticObedience,false);
});

test("adaptaciones no crean acciones, ataques o beneficios de escudo adicionales",()=>{
  const limb=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Miembro Efímero");
  assert.equal(limb.extraAction,false);
  assert.equal(limb.extraAttack,false);
  assert.equal(limb.extraShieldBenefit,false);
  const flexible=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Morfología Flexible");
  assert.equal(flexible.automaticGrappleEscape,false);
});


test("Objeto Efímero no reemplaza munición ni herramientas especializadas",()=>{
  const spell=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Objeto Efímero");
  assert.equal(spell.ammunition,false);
  assert.equal(spell.satisfiesSpecializedToolRequirement,false);
  assert.equal(spell.commercialValue,false);
});

test("Transmutación Corpórea no apila una segunda categoría funcional sobre Potencia Sobrenatural",()=>{
  const spell=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Transmutación Corpórea");
  assert.equal(spell.maxScaleChange,1);
  assert.equal(spell.extraScaleInteraction,false);
});

test("una ofensiva desde Origen Remoto también rompe Invisibilidad",()=>{
  const spell=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Invisibilidad");
  assert.equal(spell.breaksAfterOffense,true);
  assert.equal(spell.breaksAfterRemoteOffense,true);
});

test("enumeración defensiva impide doble cinética y doble cobertura",()=>{
  const sources=[
    {name:"Escudo frontal",bonus:1,group:"shield"},
    {name:"Guardia",bonus:2,group:"guard",action:true},
    {name:"Barrera Cinética",bonus:2,group:"kinetic",reaction:true},
    {name:"Escudo de campo",bonus:2,group:"kinetic",reaction:true},
    {name:"Cobertura",bonus:2,group:"cover"},
    {name:"Pantalla Cinética",bonus:2,group:"cover",sustained:true},
    {name:"Duplicado Ilusorio",bonus:2,group:"illusion-defense",sustained:true}
  ];
  let maximum=0;
  let maximumSelection=[];
  for(let mask=0;mask<(1<<sources.length);mask+=1){
    const selected=sources.filter((_,index)=>(mask&(1<<index))!==0);
    const groups=new Set();
    let valid=true;
    let actionCount=0,reactionCount=0,sustainedCount=0,total=0;
    for(const source of selected){
      if(groups.has(source.group)){ valid=false; break; }
      groups.add(source.group);
      if(source.action) actionCount+=1;
      if(source.reaction) reactionCount+=1;
      if(source.sustained) sustainedCount+=1;
      total+=source.bonus;
    }
    if(!valid || actionCount>1 || reactionCount>1 || sustainedCount>2) continue;
    if(total>maximum){maximum=total;maximumSelection=selected.map((entry)=>entry.name);}
  }
  assert.equal(maximum,9);
  assert.ok(maximumSelection.includes("Guardia"));
  assert.ok(maximumSelection.some((name)=>["Barrera Cinética","Escudo de campo"].includes(name)));
  assert.ok(!maximumSelection.includes("Cobertura") || !maximumSelection.includes("Pantalla Cinética"));
});


test("catálogo auditado contiene exactamente 60 hechizos y conserva la distribución decidida",()=>{
  const canonical=STARTER_CONTENT.spell.map((entry)=>({
    name:entry.name,
    discipline:entry.system.discipline,
    grade:entry.system.grade,
    mana:entry.system.manaCost
  }));
  const all=[...canonical,...GRIMORIO_AUDIT_CANDIDATES];
  assert.equal(all.length,60);
  const counts=Object.fromEntries(["evocation","alteration","restoration","perception","influence","conjuration"]
    .map((discipline)=>[discipline,all.filter((entry)=>entry.discipline===discipline).length]));
  assert.deepEqual(counts,{evocation:10,alteration:10,restoration:9,perception:11,influence:10,conjuration:10});
});

test("todos los costes de Maná permanecen dentro de la banda de su Grado",()=>{
  const canonical=STARTER_CONTENT.spell.map((entry)=>({
    name:entry.name,grade:entry.system.grade,mana:entry.system.manaCost
  }));
  const all=[...canonical,...GRIMORIO_AUDIT_CANDIDATES];
  const valid=(entry)=>{
    if(entry.grade==="minor") return entry.mana===2;
    if(entry.grade==="basic") return entry.mana>=3 && entry.mana<=4;
    if(entry.grade==="advanced") return entry.mana>=5 && entry.mana<=7;
    if(entry.grade==="master") return entry.mana>=8 && entry.mana<=11;
    if(entry.grade==="legendary") return entry.mana>=12;
    return false;
  };
  for(const entry of all) assert.equal(valid(entry),true,entry.name+" queda fuera de la banda de Maná de "+entry.grade);
});

test("Martillo Cinético usa Defensa Corporal y no una Defensa normal fácil de inflar",()=>{
  const spell=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Martillo Cinético");
  assert.equal(spell.defense,"body");
});

test("los rituales candidatos usan el Método real del motor y no un booleano paralelo",()=>{
  for(const name of ["Renovación Integral","Llamada Mayor","Gran Traslación"]){
    const spell=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name===name);
    assert.equal(spell.method,"ritual",name);
    assert.equal(Object.hasOwn(spell,"ritual"),false,name);
  }
});

test("formas mágicas con vuelo no sustituyen un Rasgo permanente",()=>{
  const winged=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Morfología Alada");
  const transmutation=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Transmutación Corpórea");
  assert.equal(winged.maxDuration,"scene");
  assert.equal(transmutation.maxDuration,"scene");
});

test("protecciones mentales mágicas equivalentes no se apilan hasta +4",()=>{
  const valor=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Valor Inspirado");
  const anchor=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Mente Anclada");
  assert.equal(valor.mentalDefenseBonus,2);
  assert.equal(anchor.mentalDefenseBonus,2);
  assert.equal(valor.stackingGroup,"mental-ward");
  assert.equal(anchor.stackingGroup,"mental-ward");
});

test("Restauración Funcional suspende una penalización pero no reconstruye una función ausente",()=>{
  const spell=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Restauración Funcional");
  assert.equal(spell.repairsWound,false);
  assert.equal(spell.maxSuppressedPenalties,1);
  assert.equal(spell.restoresMissingFunction,false);
});

test("Jaula Dimensional eleva una única resolución espacial a DF mínima 18",()=>{
  const spell=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Jaula Dimensional");
  assert.equal(spell.spatialMinDifficulty,18);
  assert.equal(spell.secondaryResistance,false);
});

test("Objeto Efímero no puede acumular una colección paralela por relanzamiento",()=>{
  const spell=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Objeto Efímero");
  assert.equal(spell.sustained,true);
  assert.equal(spell.sameSpellReplaces,true);
  assert.equal(spell.maxDuration,"scene");
});

test("las ilusiones persistentes usan una DF determinista ligada a competencia y no una tirada pescable",()=>{
  const names=["Imagen Menor","Velo Sensorial","Espejismo","Invisibilidad","Dominio Fantasmagórico"];
  for(const name of names){
    const spell=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name===name);
    assert.equal(spell.illusionDf,"11+attribute+channeling",name);
  }
});

test("los candidatos multiobjetivo declaran contrato estructurado sin contar dos veces al lanzador",()=>{
  for(const name of ["Arco Fulminante","Círculo Restaurador"]){
    const spell=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name===name);
    assert.equal(spell.targetMode,"multiple",name);
    assert.equal(spell.maxTargets,3,name);
    assert.equal(spell.requiresTarget,true,name);
  }
  const jump=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Salto Vinculado");
  assert.equal(jump.targetMode,"multiple");
  assert.equal(jump.includesCaster,true);
  assert.equal(jump.maxTargets,2);
  assert.equal(jump.requiresTarget,true);
});


test("ilusiones sostenidas y Velo Social no permanecen indefinidamente",()=>{
  for(const name of ["Imagen Menor","Velo Sensorial","Espejismo","Duplicado Ilusorio","Invisibilidad","Dominio Fantasmagórico","Velo Social"]){
    const spell=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name===name);
    assert.equal(spell.maxDuration,"scene",name);
  }
});

test("Fascinación y Temor son presiones breves, no control persistente",()=>{
  for(const name of ["Fascinación","Temor"]){
    const spell=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name===name);
    assert.equal(spell.proposedDuration,"hasta fin del siguiente turno del objetivo",name);
    assert.notEqual(spell.actionDenial,true,name);
  }
});

test("cierre espacial propuesto separa intercambio, paso local, salto grupal y Portal",()=>{
  const swap=GRIMORIO_SPATIAL_CLOSURE_PROPOSALS["Trasposición"];
  const threshold=GRIMORIO_SPATIAL_CLOSURE_PROPOSALS["Umbral"];
  const jump=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Salto Vinculado");
  assert.equal(swap.status,"proposed-not-canon");
  assert.equal(threshold.status,"proposed-not-canon");
  assert.equal(swap.role,"position-swap");
  assert.equal(swap.willingOnly,true);
  assert.equal(threshold.role,"local-threshold");
  assert.equal(threshold.maxTraversals,1);
  assert.equal(jump.role,"transport");
  assert.equal(jump.includesCaster,true);
  assert.equal(jump.maxTargets,2);
});


test("rituales mayores conservan sus requisitos adicionales además de la competencia operativa",()=>{
  const renewal=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Renovación Integral");
  assert.deepEqual(renewal.skillRequirements,[{skill:"medicine",minRank:3}]);

  const summon=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Llamada Mayor");
  assert.equal(summon.requiresSummoningLink,true);
  assert.equal(summon.automaticObedience,false);
  assert.equal(summon.usesInvocationControlModes,true);

  const travel=GRIMORIO_AUDIT_CANDIDATES.find((entry)=>entry.name==="Gran Traslación");
  assert.equal(travel.requiresTwoAnchors,true);
  assert.equal(travel.includesCaster,true);
  assert.equal(travel.maxTargets,8);
  assert.equal(travel.willingOnly,true);
});
