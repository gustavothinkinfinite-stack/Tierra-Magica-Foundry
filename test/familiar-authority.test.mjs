import test from "node:test";
import assert from "node:assert/strict";
import { installFamiliarGuards } from "../scripts/rules/familiar-guards.mjs";

const warnings = [];
globalThis.ui = { notifications: { warn: (message) => { warnings.push(message); return message; } } };
globalThis.foundry = { utils: { escapeHTML: (value) => String(value) } };
globalThis.ChatMessage = { getSpeaker: ({ actor }) => ({ actor: actor.uuid }), create: async (data) => data };

class LegacyActor {
  constructor({ uuid = "Actor.owner", type = "character", system = {}, items = [] } = {}) {
    Object.assign(this, { uuid, name: uuid, type, system, items });
    this.updates = [];
  }
  prepareDerivedData() {}
  async update(changes) { this.updates.push(changes); return changes; }
  async linkedFamiliarAction() { throw new Error("legacy linkedFamiliarAction executed"); }
  async commandFamiliar() { throw new Error("legacy commandFamiliar executed"); }
  async useFamiliarSense() { throw new Error("legacy useFamiliarSense executed"); }
  async castFromFamiliar() { throw new Error("legacy castFromFamiliar executed"); }
  async adjustResource() { throw new Error("legacy adjustResource executed"); }
  async useSpell(spell, options) { return { spell, options }; }
}

const legacy = {
  linkedFamiliarAction: LegacyActor.prototype.linkedFamiliarAction,
  commandFamiliar: LegacyActor.prototype.commandFamiliar,
  useFamiliarSense: LegacyActor.prototype.useFamiliarSense,
  castFromFamiliar: LegacyActor.prototype.castFromFamiliar,
  adjustResource: LegacyActor.prototype.adjustResource
};

installFamiliarGuards(LegacyActor);

test("familiar-guards sustituye todas las rutas mecánicas históricas", () => {
  for (const [name, oldMethod] of Object.entries(legacy)) {
    assert.notEqual(LegacyActor.prototype[name], oldMethod, `${name} debe quedar bajo autoridad canónica`);
  }
});

test("la autoridad canónica rechaza un Familiar ajeno antes de consumir economía", async () => {
  const owner = new LegacyActor({ system: { turn: { action: true, reaction: true } } });
  const foreign = new LegacyActor({
    uuid: "Actor.pet",
    type: "familiar",
    system: { details: { ownerUuid: "Actor.other" }, familiar: { bondLevel: 4 }, resources: { health: { value: 5, max: 5 } } }
  });
  await owner.linkedFamiliarAction(foreign, "Atacar");
  await owner.commandFamiliar(foreign, "Vigilar");
  assert.equal(owner.updates.length, 0);
  assert.equal(owner.system.turn.action, true);
  assert.equal(owner.system.turn.reaction, true);
});
