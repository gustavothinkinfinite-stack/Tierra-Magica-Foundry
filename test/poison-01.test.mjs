import assert from "node:assert/strict";
import test from "node:test";
import { STARTER_CONTENT } from "../scripts/content.mjs";
import {
  POISON_PERSISTENCE_THRESHOLDS,
  initialPoisonCoating,
  isWeaponCompatiblePoison,
  poisonApplicationIsValid,
  poisonCoatingIssues,
  poisonPersistenceLabel,
  resolvePoisonPersistence
} from "../scripts/rules/poisons.mjs";

const formula=(name,quantity=1)=>{
  const source=STARTER_CONTENT.formula.find((entry)=>entry.name===name);
  return {
    name:source.name,
    type:"formula",
    uuid:"Actor.A.Item."+name,
    system:{...structuredClone(source.system),quantity}
  };
};
const weapon={name:"Daga",type:"weapon",system:{slug:"daga"}};

test("POISON-01B: Persistencia usa exactamente 50/25/12/6/3",()=>{
  assert.deepEqual(POISON_PERSISTENCE_THRESHOLDS,[50,25,12,6,3]);
});

test("POISON-01B: venenos de Sangre catalogados pueden recubrir armas",()=>{
  for(const name of ["Toxina Debilitante","Somnífero de Bruma","Paralizante de Aguja","Veneno del Último Pulso"]){
    const dose=formula(name);
    assert.equal(isWeaponCompatiblePoison(dose),true,name);
    assert.deepEqual(poisonCoatingIssues(dose,weapon),[],name);
  }
  assert.ok(poisonCoatingIssues(formula("Toxina Debilitante",0),weapon).some((row)=>row.code==="quantity"));
});

test("POISON-01B: una aplicación válida de Vía Sangre exige daño real",()=>{
  assert.equal(poisonApplicationIsValid({damageApplied:1,route:"Sangre"}),true);
  assert.equal(poisonApplicationIsValid({damageApplied:0,route:"Sangre"}),false);
  assert.equal(poisonApplicationIsValid({damageApplied:3,route:"Oral"}),false);
});

test("POISON-01B: primer chequeo de retención es 50% y un fallo agota el recubrimiento",()=>{
  const coating=initialPoisonCoating(formula("Toxina Debilitante"));
  assert.equal(poisonPersistenceLabel(coating),"Persistencia 50%");
  const kept=resolvePoisonPersistence(coating,50);
  assert.equal(kept.retained,true);
  assert.equal(kept.threshold,50);
  assert.equal(kept.coating.persistenceIndex,1);
  assert.equal(poisonPersistenceLabel(kept.coating),"Persistencia 25%");

  const lost=resolvePoisonPersistence(coating,51);
  assert.equal(lost.retained,false);
  assert.equal(lost.coating.active,false);
});

test("POISON-01B: sobrevivir todos los umbrales permite una última aplicación y luego agota",()=>{
  let coating=initialPoisonCoating(formula("Paralizante de Aguja"));
  for(const threshold of [50,25,12,6,3]){
    const result=resolvePoisonPersistence(coating,threshold);
    assert.equal(result.retained,true);
    coating=result.coating;
  }
  assert.equal(poisonPersistenceLabel(coating),"Última aplicación");
  const final=resolvePoisonPersistence(coating,1);
  assert.equal(final.retained,false);
  assert.equal(final.threshold,null);
  assert.equal(final.coating.active,false);
  assert.equal(final.coating.applications,6);
});
