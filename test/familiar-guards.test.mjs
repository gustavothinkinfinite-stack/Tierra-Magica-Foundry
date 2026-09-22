import test from "node:test";
import assert from "node:assert/strict";
import { installFamiliarGuards } from "../scripts/rules/familiar-guards.mjs";

const warnings = [];
globalThis.ui = { notifications: { warn: (message) => { warnings.push(message); return message; } } };
globalThis.foundry = { utils: { escapeHTML: (value) => String(value) } };
globalThis.ChatMessage = { getSpeaker: ({ actor }) => ({ actor: actor.uuid }), create: async (data) => data };

class FakeActor {
  constructor({ uuid, name, type = "character", system = {}, items = [] }) { Object.assign(this, { uuid, name, type, system, items }); this.updates = []; }
  prepareDerivedData() {}
  async update(changes) {
    this.updates.push(changes);
    for (const [path, value] of Object.entries(changes)) {
      const keys = path.split(".").slice(1); let target = this.system;
      while (keys.length > 1) { const key = keys.shift(); target[key] ??= {}; target = target[key]; }
      target[keys[0]] = value;
    }
    return changes;
  }
  async useSpell(spell, options) { return { spell, options }; }
}
installFamiliarGuards(FakeActor);

const technique = (name) => ({ type: "technique", name });
const owner = (items = []) => new FakeActor({ uuid: "Actor.owner", name: "Dueño", items, system: { turn: { action: true, reaction: true }, resources: { health: { value: 10, max: 10 }, mana: { value: 9, max: 9 } }, status: { trauma: 0 } } });
const familiar = ({ ownerUuid = "Actor.owner", health = 5, bondLevel = 3 } = {}) => new FakeActor({ uuid: "Actor.familiar", name: "Familiar", type: "familiar", system: { details: { ownerUuid }, familiar: { bondLevel, incapacitated: false }, turn: { action: true, reaction: true }, resources: { health: { value: health, max: 5 }, mana: { value: 6, max: 6 } }, status: { trauma: 0 } } });

test("Familiar no hereda Maná ni economía de turno propia", () => {
  const pet = familiar(); pet.prepareDerivedData();
  assert.equal(pet.system.resources.mana.value, 0); assert.equal(pet.system.resources.mana.max, 0);
  assert.equal(pet.system.turn.action, false); assert.equal(pet.system.turn.reaction, false);
});

test("Acción Vinculada vacía, ajena o incapacitada no consume Reacción", async () => {
  for (const [pet, order] of [[familiar(), "   "], [familiar({ ownerUuid: "Actor.other" }), "Atacar"], [familiar({ health: 0 }), "Atacar"]]) {
    const pc = owner(); await pc.linkedFamiliarAction(pet, order); assert.equal(pc.system.turn.reaction, true); assert.equal(pc.updates.length, 0);
  }
});

test("orden persistente vacía no consume Acción", async () => {
  const pc = owner(); await pc.commandFamiliar(familiar(), ""); assert.equal(pc.system.turn.action, true); assert.equal(pc.updates.length, 0);
});

test("Sentidos Compartidos exige Técnica y Vínculo II y no duplica Acción", async () => {
  const pet = familiar({ bondLevel: 2 }); const without = owner(); await without.useFamiliarSense(pet); assert.equal(without.system.turn.action, true);
  const pc = owner([technique("Sentidos Compartidos")]); await pc.useFamiliarSense(pet); assert.equal(pc.system.turn.action, false);
  const count = pc.updates.length; await pc.useFamiliarSense(pet); assert.equal(pc.updates.length, count);
});

test("Origen Remoto exige Técnica y Vínculo III y conserva al dueño como lanzador", async () => {
  const spell = { type: "spell", name: "Prueba" }; const pet = familiar({ bondLevel: 3 });
  const without = owner(); assert.equal(typeof await without.castFromFamiliar(pet, spell), "string");
  const pc = owner([technique("Origen Remoto")]); const result = await pc.castFromFamiliar(pet, spell);
  assert.equal(result.spell, spell); assert.equal(result.options.remoteOrigin, pet); assert.equal(pet.system.resources.mana.value, 6);
});

test("Vida 0 incapacita Familiar sin aplicar Trauma de personaje", async () => {
  const pet = familiar({ health: 1 }); await pet.adjustResource("health", -1);
  assert.equal(pet.system.resources.health.value, 0); assert.equal(pet.system.status.incapacitated, true); assert.equal(pet.system.familiar.incapacitated, true); assert.equal(pet.system.status.trauma, 0);
});

test("Coordinación Reactiva no encadena una segunda Reacción", async () => {
  const pc = owner([technique("Coordinación Reactiva")]); const pet = familiar({ bondLevel: 3 });
  await pc.setFamiliarReactiveTrigger(pet, "cuando alguien cruce la puerta"); await pc.triggerFamiliarReaction(pet, "avisar y distraer"); assert.equal(pc.system.turn.reaction, false);
  const count = pc.updates.length; await pc.triggerFamiliarReaction(pet, "repetir"); assert.equal(pc.updates.length, count);
});
