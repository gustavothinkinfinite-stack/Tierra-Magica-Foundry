import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pendingDamageRequest, primaryActiveGm, validatePendingDamageRequest } from "../scripts/rules/damage-delivery.mjs";

test("una solicitud de daño pendiente sólo acepta objetivo y daño positivos", () => {
  assert.equal(pendingDamageRequest({ targetUuid: "", damage: 4 }), null);
  assert.equal(pendingDamageRequest({ targetUuid: "Actor.X", damage: 0 }), null);
  assert.equal(pendingDamageRequest({ targetUuid: "Actor.X", damage: -5 }), null);
  const request = pendingDamageRequest({ targetUuid: "Actor.X", damage: 7, source: "Espada", attacker: "Heroína" });
  assert.deepEqual(request, {
    targetUuid: "Actor.X", damage: 7, source: "Espada", attacker: "Heroína", resolved: false
  });
});

test("una solicitud resuelta no puede volver a aplicarse", () => {
  assert.equal(validatePendingDamageRequest({ targetUuid: "Actor.X", damage: 4, resolved: true }), null);
  assert.equal(validatePendingDamageRequest(null), null);
  assert.equal(validatePendingDamageRequest({ targetUuid: "Actor.X", damage: Number.NaN }), null);
});

test("sólo un DJ activo determinista queda encargado de aprobar", () => {
  const users = [
    { id: "z", active: true, isGM: true },
    { id: "a", active: true, isGM: true },
    { id: "0", active: true, isGM: false },
    { id: "b", active: false, isGM: true }
  ];
  assert.equal(primaryActiveGm(users).id, "a");
  assert.equal(primaryActiveGm(users.filter((u) => !u.isGM)), null);
});

test("el flujo multijugador no usa sockets ni concede actualización del PNJ al atacante", async () => {
  const actor = await readFile(new URL("../scripts/documents/actor.mjs", import.meta.url), "utf8");
  const bootstrap = await readFile(new URL("../scripts/tierra-magica.mjs", import.meta.url), "utf8");
  assert.equal(actor.includes("pendingDamageRequest"), true);
  assert.equal(actor.includes("pendiente de aprobación del DJ"), true);
  assert.equal(bootstrap.includes('data.tmApproveDamage'), true);
  assert.equal(bootstrap.includes('message.setFlag("tierra-magica", "pendingDamage"'), true);
  assert.equal(bootstrap.includes("game.socket"), false);
  assert.equal(bootstrap.includes("fromUuid(current.targetUuid)"), true);
});
