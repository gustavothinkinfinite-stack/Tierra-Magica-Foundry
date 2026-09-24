import test from "node:test";
import assert from "node:assert/strict";
import { applyBoundedHealing, healingAmount, pendingHealingRequest, validatePendingHealingRequest } from "../scripts/rules/healing-delivery.mjs";

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
