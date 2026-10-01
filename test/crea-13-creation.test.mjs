import test from "node:test";
import assert from "node:assert/strict";
import { TM_CONFIG } from "../scripts/config.mjs";
import { validateInitialAttributes } from "../scripts/rules/creation.mjs";
import { buildAllCrea13Fixtures, unpricedDeviceAudit } from "./fixtures/crea-13-builds.mjs";

const builds=buildAllCrea13Fixtures();

test("CREA-13 13A: los siete fixtures pasan legalidad global de creación",()=>{
  assert.equal(builds.length,7);
  for(const {profile,actor,validation} of builds){
    assert.equal(validation.valid,true,profile.id+" "+profile.label+": "+JSON.stringify(validation.issues));
    assert.equal(validateInitialAttributes(actor.system.attributes).valid,true,profile.id+" atributos");
    assert.ok(validation.budget.pdSpent<=25,profile.id+" PD");
    assert.ok(validation.budget.prSpent<=3,profile.id+" PR");
    assert.ok(validation.budget.peiSpent<=2000,profile.id+" PEI");
    assert.equal(actor.items.filter((item)=>item.type==="ancestry").length,1,profile.id+" ancestry");
    assert.equal(actor.items.filter((item)=>item.type==="origin").length,1,profile.id+" origin");
    assert.equal(actor.items.filter((item)=>item.type==="background").length,1,profile.id+" background");
    assert.ok(actor.items.filter((item)=>item.type==="discipline").length<=3,profile.id+" disciplinas");
  }
});

test("CREA-13 13A: cada fixture de nivel 1 tiene como máximo una Habilidad Experta",()=>{
  for(const {profile,actor} of builds){
    const experts=Object.entries(actor.system.skills).filter(([,skill])=>Number(skill.rank)>=3);
    assert.ok(experts.length<=1,profile.id+" expertos: "+experts.map(([key])=>key).join(","));
    for(const [key,skill] of Object.entries(actor.system.skills)){
      assert.ok(key in TM_CONFIG.skills,profile.id+" habilidad desconocida "+key);
      assert.ok(Number(skill.rank)>=0 && Number(skill.rank)<=3,profile.id+" rango nivel 1 "+key);
    }
  }
});

test("CREA-13 13A: toda adquisición presupuestada del fixture tuvo preflight válido",()=>{
  for(const {profile,validation} of builds){
    const invalid=validation.acquisitionAudit.filter((entry)=>!entry.valid);
    assert.deepEqual(invalid,[],profile.id+" adquisiciones inválidas");
  }
});

test("CREA-13 13A: el Vinculado paga Familiar Mágico con los 3 PR y no con PD",()=>{
  const bonded=builds.find((entry)=>entry.profile.key==="bonded");
  const trait=bonded.actor.items.find((item)=>item.type==="trait" && item.name==="Familiar Mágico");
  assert.ok(trait);
  assert.equal(trait.system.acquisition.paid.resource,"pr");
  assert.equal(trait.system.acquisition.paid.amount,3);
  assert.equal(bonded.validation.budget.prSpent,3);
});

test("CREA-13 13A: Canalizador y Vinculado poseen las Disciplinas de todos sus hechizos",()=>{
  for(const key of ["channeler","bonded"]){
    const build=builds.find((entry)=>entry.profile.key===key);
    const disciplines=new Set(build.actor.items.filter((item)=>item.type==="discipline").map((item)=>item.system.slug));
    for(const spell of build.actor.items.filter((item)=>item.type==="spell")){
      assert.equal(disciplines.has(spell.system.discipline),true,build.profile.id+" "+spell.name);
    }
  }
});

test("CREA-13 13A: equipo con precio exacto consume PEI real",()=>{
  const soldier=builds.find((entry)=>entry.profile.key==="soldier");
  const explorer=builds.find((entry)=>entry.profile.key==="explorer");
  assert.equal(soldier.validation.budget.peiSpent,1350);
  assert.equal(explorer.validation.budget.peiSpent,1950);
});

test("CREA-13 13A: dispositivos sin precio quedan identificados como contenido no comprable, no gratuito",()=>{
  const devices=unpricedDeviceAudit();
  assert.ok(devices.length>=4);
  for(const device of devices){
    assert.notEqual(device.priceStatus,"exact",device.name);
    assert.equal(device.priceCopper,null,device.name);
  }
});
