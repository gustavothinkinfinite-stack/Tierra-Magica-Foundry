import test from "node:test";
import assert from "node:assert/strict";
import { applyBoundedHealing, boundedHealthRecoveryUpdates, healingAmount, pendingHealingRequest, validatePendingHealingRequest } from "../scripts/rules/healing-delivery.mjs";

function actor(value, max, cap = max) {
  return { system: { resources: { health: { value, max } }, recovery: { healthCap: cap } }, async update(change) { this.system.resources.health.value = change["system.resources.health.value"]; } };
}

test("healing is capped by both injury cap and maximum health", async () => {
  assert.equal(healingAmount(actor(5, 20, 7), 4), 2);
  assert.equal(healingAmount(actor(19, 20, 30), 4), 1);
  const target = actor(5, 20, 7);
  assert.equal(await applyBoundedHealing(target, 4), 2);
  assert.equal(target.system.resources.health.value, 7);
});

test("healing cannot become damage or exceed a closed cap", async () => {
  const target = actor(10, 20, 8);
  assert.equal(await applyBoundedHealing(target, 4), 0);
  assert.equal(target.system.resources.health.value, 10);
  assert.equal(healingAmount(target, -5), 0);
});

test("pending healing requests reject zero, malformed and resolved replay", () => {
  assert.equal(pendingHealingRequest({ targetUuid: "A", healing: 0 }), null);
  const request = pendingHealingRequest({ targetUuid: "A", healing: 4, source: "Cierre Restaurador" });
  assert.equal(validatePendingHealingRequest(request)?.healing, 4);
  assert.equal(validatePendingHealingRequest({ ...request, resolved: true }), null);
  assert.equal(validatePendingHealingRequest({ targetUuid: "", healing: 4 }), null);
});


test("CREA-13 13D: recuperar Vida por encima de 0 limpia Incapacitado sin borrar Trauma", async () => {
  const target = {
    type:"character",
    system:{
      derived:{healthMax:14},
      resources:{health:{value:0,max:14}},
      recovery:{healthCap:8},
      status:{incapacitated:true,trauma:1}
    },
    async update(changes){
      for(const [path,value] of Object.entries(changes)){
        const keys=path.split(".").slice(1);
        let node=this.system;
        while(keys.length>1){const key=keys.shift(); node[key] ??= {}; node=node[key];}
        node[keys[0]]=value;
      }
    }
  };
  assert.equal(await applyBoundedHealing(target,4),4);
  assert.equal(target.system.resources.health.value,4);
  assert.equal(target.system.status.incapacitated,false);
  assert.equal(target.system.status.trauma,1);
});

test("CREA-13 13D: la recuperación no inflige daño cuando healthCap está por debajo de la Vida actual", () => {
  const target=actor(10,20,8);
  const recovery=boundedHealthRecoveryUpdates(target,4);
  assert.equal(recovery.amount,0);
  assert.deepEqual(recovery.updates,{});
});
