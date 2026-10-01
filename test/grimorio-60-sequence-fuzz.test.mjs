import test from "node:test";
import assert from "node:assert/strict";
import { STARTER_CONTENT } from "../scripts/content.mjs";
import { GRIMORIO_AUDIT_CANDIDATES } from "./fixtures/grimorio-60-audit.mjs";
import {
  seededRandom,pick,createFuzzState,snapshot,assertFuzzInvariants,
  beginTurn,damage,move,guard,familiarLinkedAction,commandFamiliar,
  castSpell,castClosure,matrixPulse,transferVital,usePotion,breather,rest,fullRest,useDevice
} from "./helpers/grimorio-fuzz-model.mjs";

const canonicalSpells=STARTER_CONTENT.spell.map((entry)=>({
  name:entry.name,
  ...entry.system,
  mana:entry.system.manaCost
}));
const spells=[...canonicalSpells,...GRIMORIO_AUDIT_CANDIDATES];

function comparable(state){
  const copy=snapshot(state);
  delete copy.counters;
  return copy;
}

function offensive(spell){
  return Number(spell.damage)>0 ||
    ["emotion","attention","social-area","mental-defense-area"].includes(String(spell.role??""));
}

function executeRandomOperation(state,random,coverage){
  const operations=[
    "beginTurn","beginTurn",
    "damage","damage",
    "cast","cast","castRemote",
    "closure",
    "potionHp","potionMana",
    "breather","rest","fullRest",
    "deviceAction","deviceReaction",
    "linked","command","guard",
    "move","matrix","transfer"
  ];
  const op=pick(random,operations);
  coverage.attempted[op]=(coverage.attempted[op]??0)+1;
  const before=comparable(state);
  let result;

  if(op==="beginTurn") result=beginTurn(state);
  else if(op==="damage") result=damage(state,1+Math.floor(random()*12));
  else if(op==="cast" || op==="castRemote"){
    const spell=pick(random,spells);
    const success=random()<0.72;
    result=castSpell(state,spell,{
      success,
      remote:op==="castRemote",
      offensive:offensive(spell)
    });
    if(result.reason==="remote-origin") coverage.remoteBlocked+=1;
  }
  else if(op==="closure") result=castClosure(state,{success:random()<0.8});
  else if(op==="potionHp") result=usePotion(state,"restaurativa");
  else if(op==="potionMana") result=usePotion(state,"arcana");
  else if(op==="breather") result=breather(state);
  else if(op==="rest") result=rest(state);
  else if(op==="fullRest") result=fullRest(state);
  else if(op==="deviceAction") result=useDevice(state,{activation:"Acción",consumption:2,flow:2});
  else if(op==="deviceReaction") result=useDevice(state,{activation:"Reacción",consumption:2,flow:2,kinetic:true});
  else if(op==="linked") result=familiarLinkedAction(state);
  else if(op==="command") result=commandFamiliar(state);
  else if(op==="guard") result=guard(state);
  else if(op==="move") result=move(state,1+Math.floor(random()*7));
  else if(op==="matrix") result=matrixPulse(state);
  else if(op==="transfer") result=transferVital(state,1+Math.floor(random()*3));
  else throw new Error("Operación de fuzz desconocida: "+op);

  if(result.accepted) coverage.accepted[op]=(coverage.accepted[op]??0)+1;
  else coverage.rejected[op]=(coverage.rejected[op]??0)+1;

  const after=comparable(state);

  // Una operación rechazada no debe gastar recursos ni alterar el estado.
  if(!result.accepted){
    assert.deepEqual(after,before,"rechazo mutó estado: "+op+" / "+String(result.reason));
  }

  // Recursos sólo pueden aumentar en sus rutas declaradas.
  const hpGain=after.health-before.health;
  const allyGain=after.allyHealth-before.allyHealth;
  const manaGain=after.mana-before.mana;
  const energyGain=after.deviceEnergy-before.deviceEnergy;

  const hpRecoveryOps=new Set(["closure","potionHp","rest","fullRest","matrix"]);
  const manaRecoveryOps=new Set(["potionMana","rest","fullRest"]);
  if(hpGain>0) assert.ok(hpRecoveryOps.has(op),"Vida creada por "+op);
  if(allyGain>0) assert.equal(op,"transfer","Vida de aliado creada por "+op);
  if(manaGain>0) assert.ok(manaRecoveryOps.has(op),"Maná creado por "+op);
  assert.ok(energyGain<=0,"Energía de dispositivo creada por "+op);

  if(after.action && !before.action) assert.equal(op,"beginTurn","Acción regenerada por "+op);
  if(after.reaction && !before.reaction) assert.equal(op,"beginTurn","Reacción regenerada por "+op);
  if(after.movementSpent<before.movementSpent) assert.equal(op,"beginTurn","Movimiento regenerado por "+op);
  if(after.fatigue<before.fatigue) assert.equal(op,"fullRest","Fatiga reducida por "+op);
  assert.ok(after.trauma>=before.trauma,"Trauma reducido por "+op);
  assert.ok(after.doses.restorative<=before.doses.restorative,"Dosis restaurativa creada por "+op);
  assert.ok(after.doses.arcane<=before.doses.arcane,"Dosis arcana creada por "+op);

  const issues=assertFuzzInvariants(state);
  assert.deepEqual(issues,[],"invariantes rotas tras "+op+": "+issues.join(", "));

  return {op,result};
}

test("fuzz determinista: 204.800 transiciones cruzan magia, equipo, alquimia, Familiar y descansos",()=>{
  const coverage={attempted:{},accepted:{},rejected:{},remoteBlocked:0};
  const seeds=256;
  const steps=800;

  for(let seed=1;seed<=seeds;seed+=1){
    const random=seededRandom(seed*0x9e3779b1);
    const state=createFuzzState({doubleSustain:seed%3===0});

    // Variamos reservas iniciales para forzar Sobrecarga, escasez y topes.
    state.mana=1+Math.floor(random()*state.manaMax);
    state.health=1+Math.floor(random()*state.healthMax);
    state.allyHealth=1+Math.floor(random()*state.allyHealthMax);
    state.deviceEnergy=Math.floor(random()*(state.deviceEnergyMax+1));

    for(let step=0;step<steps;step+=1) executeRandomOperation(state,random,coverage);
  }

  const total=Object.values(coverage.attempted).reduce((sum,value)=>sum+value,0);
  assert.equal(total,seeds*steps);
  assert.ok(coverage.remoteBlocked>100,"el fuzz no ejercitó suficientes bloqueos de Origen Remoto");

  for(const required of ["cast","castRemote","closure","potionHp","potionMana","deviceAction","deviceReaction","linked","command","guard","matrix","transfer"]){
    assert.ok((coverage.attempted[required]??0)>1000,"cobertura insuficiente: "+required);
  }
});

test("secuencia dirigida: Matriz Vital termina a 0 Vida y nunca revive por pulso",()=>{
  const state=createFuzzState({doubleSustain:true});
  state.mana=15;
  let result=castSpell(state,{name:"Matriz Vital",mana:9,sustained:true},{success:true});
  assert.equal(result.accepted,true);
  assert.equal(state.matrixPulses,3);
  assert.ok(state.sustained.includes("Matriz Vital"));

  damage(state,99);
  assert.equal(state.health,0);
  assert.equal(state.matrixPulses,0);
  assert.equal(state.sustained.includes("Matriz Vital"),false);

  const before=comparable(state);
  result=matrixPulse(state);
  assert.equal(result.accepted,false);
  assert.deepEqual(comparable(state),before);
});

test("secuencia dirigida: invocaciones respetan 1/2 Sostenimientos y relanzar no duplica criatura",()=>{
  const normal=createFuzzState();
  normal.mana=15;
  assert.equal(castSpell(normal,{name:"Llamada Menor",mana:4,sustained:true},{success:true}).accepted,true);
  beginTurn(normal);
  assert.equal(castSpell(normal,{name:"Llamada Menor",mana:4,sustained:true},{success:true}).accepted,true);
  assert.deepEqual(normal.sustained,["Llamada Menor"]);
  assert.equal(normal.summons.minor,true);

  const dual=createFuzzState({doubleSustain:true});
  dual.mana=15;
  castSpell(dual,{name:"Llamada Menor",mana:4,sustained:true},{success:true});
  beginTurn(dual);
  castSpell(dual,{name:"Llamada Mayor",mana:10,sustained:true},{success:true});
  assert.deepEqual(new Set(dual.sustained),new Set(["Llamada Menor","Llamada Mayor"]));
  assert.equal(dual.summons.minor,true);
  assert.equal(dual.summons.major,true);
  assert.equal(dual.sustained.length,2);
});

test("secuencia dirigida: Origen Remoto bloqueado no gasta Acción, Maná ni Invisibilidad",()=>{
  const state=createFuzzState({doubleSustain:true});
  state.mana=15;
  castSpell(state,{name:"Invisibilidad",mana:9,sustained:true},{success:true});
  beginTurn(state);
  const before=comparable(state);
  const blocked=castSpell(state,{name:"Paso Breve",mana:4,remoteOriginCompatible:false},{
    success:true,remote:true,offensive:false
  });
  assert.equal(blocked.accepted,false);
  assert.equal(blocked.reason,"remote-origin");
  assert.deepEqual(comparable(state),before);
  assert.equal(state.invisible,true);
});

test("secuencia dirigida: una ofensiva remota compatible rompe Invisibilidad aunque falle",()=>{
  const state=createFuzzState({doubleSustain:true});
  state.mana=15;
  castSpell(state,{name:"Invisibilidad",mana:9,sustained:true},{success:true});
  assert.equal(state.invisible,true);
  beginTurn(state);

  const failed=castSpell(state,{
    name:"Proyectil Ígneo",mana:3,remoteOriginCompatible:true,damage:5
  },{success:false,remote:true,offensive:true});

  assert.equal(failed.accepted,true);
  assert.equal(state.invisible,false);
  assert.equal(state.sustained.includes("Invisibilidad"),false);
});

test("secuencia dirigida: Saturación impide encadenar recuperación arcana sin Respiro",()=>{
  const state=createFuzzState();
  state.mana=3;
  const first=usePotion(state,"arcana");
  assert.equal(first.accepted,true);
  assert.equal(state.mana,6);
  assert.equal(state.doses.arcane,2);
  beginTurn(state);

  const before=comparable(state);
  const second=usePotion(state,"arcana");
  assert.equal(second.accepted,false);
  assert.equal(second.reason,"saturation");
  assert.deepEqual(comparable(state),before);

  breather(state);
  beginTurn(state);
  const third=usePotion(state,"arcana");
  assert.equal(third.accepted,true);
  assert.equal(state.mana,9);
  assert.equal(state.doses.arcane,1);
});

test("secuencia dirigida: Transferencia Vital conserva Vida neta y nunca baja al lanzador de 1",()=>{
  const state=createFuzzState();
  state.health=5;
  state.allyHealth=10;
  state.mana=15;
  const beforeTotal=state.health+state.allyHealth;
  const result=transferVital(state,3);
  assert.equal(result.accepted,true);
  assert.equal(state.health+state.allyHealth,beforeTotal);
  assert.equal(state.health,2);

  beginTurn(state);
  state.health=2;
  const before=comparable(state);
  const blocked=transferVital(state,2);
  assert.equal(blocked.accepted,false);
  assert.deepEqual(comparable(state),before);
});

test("secuencia dirigida: Acción y Reacción no reaparecen entre turnos por mezclar subsistemas",()=>{
  const state=createFuzzState();
  state.mana=15;
  state.deviceEnergy=8;

  const spell=castSpell(state,{name:"Proyectil Ígneo",mana:3},{success:true,offensive:true});
  assert.equal(spell.accepted,true);
  assert.equal(state.action,false);

  assert.equal(useDevice(state,{activation:"Acción",consumption:2,flow:2}).accepted,false);
  assert.equal(commandFamiliar(state).accepted,false);
  assert.equal(guard(state).accepted,false);

  const shield=useDevice(state,{activation:"Reacción",consumption:2,flow:2,kinetic:true});
  assert.equal(shield.accepted,true);
  assert.equal(state.reaction,false);
  assert.equal(familiarLinkedAction(state).accepted,false);

  beginTurn(state);
  assert.equal(state.action,true);
  assert.equal(state.reaction,true);
});
