import test from "node:test";
import assert from "node:assert/strict";
import {
  reconcileActorResources,
  resourceMaximum,
  resourceReconciliationUpdates
} from "../scripts/rules/resource-reconciliation.mjs";
import { deriveActorState } from "../scripts/rules/derived-state.mjs";

function actor({
  type="character",
  health=10,
  mana=5,
  healthMax=12,
  manaMax=9,
  sourceHealth=health,
  sourceMana=mana,
  trauma=0
} = {}) {
  return {
    type,
    _source:{system:{resources:{health:{value:sourceHealth},mana:{value:sourceMana}}}},
    system:{
      resources:{
        health:{value:health,max:999},
        mana:{value:mana,max:999}
      },
      derived:{healthMax,manaMax},
      status:{trauma,incapacitated:false},
      familiar:{incapacitated:false}
    },
    updates:[],
    async update(changes,options){
      this.updates.push({changes,options});
    }
  };
}

test("el máximo derivado tiene autoridad sobre un .max persistido obsoleto",()=>{
  const a=actor({healthMax:14,manaMax:11});
  assert.equal(resourceMaximum(a,"health"),14);
  assert.equal(resourceMaximum(a,"mana"),11);
  assert.notEqual(resourceMaximum(a,"health"),a.system.resources.health.max);
});

test("bajar un máximo recorta el actual, pero subirlo no concede recurso",()=>{
  const reduced=actor({sourceHealth:15,health:15,healthMax:12,sourceMana:8,mana:8,manaMax:6});
  assert.deepEqual(resourceReconciliationUpdates(reduced),{
    "system.resources.health.value":12,
    "system.resources.mana.value":6
  });

  const increased=actor({sourceHealth:8,health:8,healthMax:16,sourceMana:4,mana:4,manaMax:12});
  assert.deepEqual(resourceReconciliationUpdates(increased),{});
});

test("si una reducción legítima lleva Vida a 0 conserva las consecuencias canónicas",()=>{
  const a=actor({sourceHealth:3,health:3,healthMax:0,trauma:0});
  assert.deepEqual(resourceReconciliationUpdates(a),{
    "system.resources.health.value":0,
    "system.status.incapacitated":true,
    "system.status.trauma":1
  });
});

test("Familiar deriva Maná máximo 0 y la reconciliación persiste ese límite",()=>{
  const system={
    attributes:{agi:{value:2},vig:{value:2},vol:{value:4},per:{value:2}},
    combat:{defensiveRank:0},
    movement:{base:6},
    magic:{sustainedSpellIds:[]},
    modifiers:{manual:{}}
  };
  const derived=deriveActorState({actorType:"familiar",system});
  assert.equal(derived.manaMax,0);
  const familiar=actor({type:"familiar",sourceMana:7,mana:7,manaMax:derived.manaMax});
  assert.deepEqual(resourceReconciliationUpdates(familiar),{"system.resources.mana.value":0});
});

test("reconciliar persiste sólo cuando hace falta y marca su propia actualización",async()=>{
  const a=actor({sourceHealth:20,health:20,healthMax:12});
  assert.equal(await reconcileActorResources(a),true);
  assert.equal(a.updates.length,1);
  assert.equal(a.updates[0].changes["system.resources.health.value"],12);
  assert.equal(a.updates[0].options.tmResourceReconcile,true);

  const stable=actor({sourceHealth:8,health:8,healthMax:12});
  assert.equal(await reconcileActorResources(stable),false);
  assert.equal(stable.updates.length,0);
});


test("dos reducciones encadenadas no dejan el recurso por encima del último máximo", async () => {
  const a=actor({sourceHealth:20,health:20,healthMax:12});
  let releaseFirst;
  const firstGate=new Promise((resolve)=>{releaseFirst=resolve;});
  let calls=0;
  a.update=async function(changes,options){
    calls+=1;
    this.updates.push({changes,options});
    if(calls===1) await firstGate;
    if(Object.prototype.hasOwnProperty.call(changes,"system.resources.health.value")){
      this._source.system.resources.health.value=changes["system.resources.health.value"];
      this.system.resources.health.value=changes["system.resources.health.value"];
    }
  };

  const first=reconcileActorResources(a);
  await Promise.resolve();
  a.system.derived.healthMax=8;
  const overlapping=await reconcileActorResources(a);
  assert.equal(overlapping,false);
  releaseFirst();
  assert.equal(await first,true);
  assert.deepEqual(a.updates.map((entry)=>entry.changes["system.resources.health.value"]),[12,8]);
});
