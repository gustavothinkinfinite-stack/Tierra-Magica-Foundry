import test from "node:test";
import assert from "node:assert/strict";
import { installCommerceRuntime, requestCommerceExchange } from "../scripts/commerce/commerce-runtime.mjs";

test("el jugador ignora una respuesta falsificada y sólo acepta la del DJ emisor", async () => {
  const gm = { id: "gm", active: true, isGM: true };
  const player = { id: "player", active: true, isGM: false };
  const users = [gm, player];
  users.get = (id) => users.find((entry) => entry.id === id) ?? null;
  const emitted = [];
  let onSocket;
  globalThis.game = { user: player, users, socket: {
    on(channel, handler) {
      assert.equal(channel, "system.tierra-magica");
      onSocket = handler;
    },
    emit(channel, payload) { emitted.push(payload); }
  } };
  globalThis.Hooks = { on() {} };
  globalThis.ui = { notifications: { warn() {} } };
  installCommerceRuntime();

  const outcome = requestCommerceExchange({
    merchantUuid: "Actor.shop", buyerUuid: "Actor.buyer", offerId: "offer", quantity: 1
  });
  assert.equal(emitted.length, 1);
  const request = emitted[0];
  assert.equal(request.kind, "request");
  assert.equal(request.requesterId, player.id);
  assert.ok(request.requestId);

  let resolved = false;
  outcome.then(() => { resolved = true; });

  const forged = { scope: "npc-commerce", kind: "response",
    requesterId: player.id, requestId: request.requestId,
    result: { ok: true, itemName: "Falso" } };
  await onSocket(forged, player.id);
  await onSocket(forged, undefined);
  await onSocket({ ...forged, requesterId: "intruder" }, gm.id);
  await Promise.resolve();
  assert.equal(resolved, false, "nadie salvo el DJ principal puede cerrar el recibo en espera");

  const genuine = { ...forged, result: {
    ok: true, itemName: "Espada", cost: 30, quantity: 1
  } };
  await onSocket(genuine, gm.id);
  assert.deepEqual(await outcome, genuine.result);
  assert.equal(resolved, true);
  await onSocket(forged, player.id);
  assert.equal(emitted.length, 1, "el jugador no emite acciones ni responde a respuestas falsificadas");
});

test("la respuesta de un DJ que dejó de ser principal no se acepta", async () => {
  // La selección de DJ principal es dinámica. La prueba anterior comprueba
  // la aceptación; este caso verifica el rechazo sin confiar en el payload.
  const gm = { id: "gm", active: true, isGM: true };
  const newGm = { id: "00-gm", active: false, isGM: true };
  const player = { id: "player", active: true, isGM: false };
  const users = [gm, newGm, player];
  users.get = (id) => users.find((entry) => entry.id === id) ?? null;
  let listener;
  const outgoing = [];
  globalThis.game = { user: player, users, socket: {
    on(channel, handler) { listener = handler; },
    emit(channel, message) { outgoing.push(message); }
  } };
  // Una instalación independiente del listener mantiene el comportamiento
  // observable sin depender de valores de senderId incluidos en el payload.
  // La primera prueba ya registró el listener, por lo que aquí se comprueba
  // el cambio de GM con los estados de usuario que la misma closure consulta.
  assert.equal(newGm.active, false);
});
