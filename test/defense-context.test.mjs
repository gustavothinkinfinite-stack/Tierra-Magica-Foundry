import test from "node:test";
import assert from "node:assert/strict";
import { deriveActorState } from "../scripts/rules/derived-state.mjs";
import { resolveActorDefense, resolveActorProtection } from "../scripts/rules/defense-context.mjs";

function system(overrides = {}) {
  return {
    attributes: {
      agi: { value: 2 },
      vig: { value: 2 },
      vol: { value: 2 },
      per: { value: 2 }
    },
    combat: { defensiveRank: 2, ...(overrides.combat ?? {}) },
    movement: { base: 6 },
    magic: { sustainedSpellIds: overrides.sustainedSpellIds ?? [] },
    modifiers: { manual: {} }
  };
}

test("Guardia se prepara una vez; Parada y Barrera sólo entran en contexto", () => {
  const s = system({ combat: { guardActive:true, parryActive:true, kineticBarrierActive:true } });
  const derived = deriveActorState({ system:s });
  const actor = { system:{ derived } };
  assert.equal(derived.defense, 16);
  assert.equal(resolveActorDefense(actor).total, 18);
  assert.equal(resolveActorDefense(actor, { kineticBarrier:false }).total, 16);
  assert.equal(resolveActorDefense(actor, { kineticBarrier:false, parryable:true }).total, 18);
  assert.equal(resolveActorDefense(actor, { kineticBarrier:true, parryable:true }).total, 20);
});

test("escudo frontal no infla Defensa preparada ni se aplica sin orientación confirmada", () => {
  const s = system();
  const items=[{id:"shield",name:"Escudo",type:"shield",system:{equipped:true,passiveDefense:2,frontalOnly:true}}];
  const derived=deriveActorState({system:s,items});
  const actor={system:{derived}};
  assert.equal(derived.defense,14);
  assert.equal(resolveActorDefense(actor,{frontal:false,kineticBarrier:false}).total,14);
  assert.equal(resolveActorDefense(actor,{frontal:true,kineticBarrier:false}).total,16);
});

test("Piel Alterada es contextual y usa el mayor valor frente a armadura, no la suma", () => {
  const skin={id:"skin",name:"Piel Alterada",type:"spell",system:{slug:"piel-alterada"}};
  const lightArmor={id:"armor",name:"Cuero",type:"armor",system:{equipped:true,protection:1}};
  const heavyArmor={id:"heavy",name:"Placas",type:"armor",system:{equipped:true,protection:5}};

  const lightDerived=deriveActorState({system:system({sustainedSpellIds:["skin"]}),items:[skin,lightArmor]});
  const light={system:{derived:lightDerived}};
  assert.equal(lightDerived.protection,1);
  assert.equal(resolveActorProtection(light).total,1);
  assert.equal(resolveActorProtection(light,{alteredSkinCompatible:true}).total,2);

  const heavyDerived=deriveActorState({system:system({sustainedSpellIds:["skin"]}),items:[skin,heavyArmor]});
  const heavy={system:{derived:heavyDerived}};
  assert.equal(heavyDerived.protection,5);
  assert.equal(resolveActorProtection(heavy,{alteredSkinCompatible:true}).total,5);
});
