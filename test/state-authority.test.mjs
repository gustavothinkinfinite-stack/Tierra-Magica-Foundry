import test from "node:test";
import assert from "node:assert/strict";

function applyChanges(document, changes) {
  for (const [path, value] of Object.entries(changes)) {
    const keys = path.split(".");
    if (keys[0] === "system") keys.shift();
    let node = document.system;
    while (keys.length > 1) {
      const key = keys.shift();
      node[key] ??= {};
      node = node[key];
    }
    node[keys[0]] = value;
  }
}

globalThis.game = { user:{ id:"local" }, users:[] };

const {
  claimKineticBarrier,
  consumeDeviceEnergyAuthoritatively
} = await import("../scripts/rules/state-authority.mjs");

test("CREA-13 cierre: reclamar defensa cinética local la consume exactamente una vez", async () => {
  const target = {
    id:"target",
    name:"Objetivo",
    system:{combat:{kineticBarrierActive:true,kineticDefenseSource:"Barrera Cinética"}},
    async update(changes){ applyChanges(this,changes); return changes; }
  };

  const first = await claimKineticBarrier(target);
  const second = await claimKineticBarrier(target);
  assert.equal(first.ok,true);
  assert.equal(first.claimed,true);
  assert.equal(second.ok,true);
  assert.equal(second.claimed,false);
  assert.equal(target.system.combat.kineticBarrierActive,false);
  assert.equal(target.system.combat.kineticDefenseSource,"");
});

test("CREA-13 cierre: dos consumos locales concurrentes no duplican una reserva", async () => {
  const source = {
    id:"cell",
    name:"Celda",
    type:"device",
    system:{condition:"operative",energy:{value:2},flow:2},
    async update(changes){
      await new Promise((resolve)=>setTimeout(resolve,5));
      applyChanges(this,changes);
      return changes;
    }
  };
  const actor={id:"actor",items:[source]};
  const [a,b]=await Promise.all([
    consumeDeviceEnergyAuthoritatively(actor,source,2),
    consumeDeviceEnergyAuthoritatively(actor,source,2)
  ]);
  assert.equal([a,b].filter((entry)=>entry.ok).length,1);
  assert.equal(source.system.energy.value,0);
});

test("CREA-13 cierre: la autoridad compartida declara arbitraje por DJ activo", async () => {
  const source = await import("node:fs/promises").then(({readFile}) =>
    readFile(new URL("../scripts/rules/state-authority.mjs", import.meta.url), "utf8")
  );
  assert.match(source,/system\.tierra-magica/);
  assert.match(source,/primaryActiveGm/);
  assert.match(source,/consume-device-energy/);
  assert.match(source,/claim-kinetic/);
  assert.match(source,/Se requiere un DJ activo/);
});
