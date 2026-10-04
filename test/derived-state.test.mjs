import test from "node:test";
import assert from "node:assert/strict";
import { deriveActorState, resolveDerivedSelector } from "../scripts/rules/derived-state.mjs";

const baseSystem = () => ({
  attributes: {
    agi: { value: 2 },
    vig: { value: 3 },
    vol: { value: 2 },
    per: { value: 4 }
  },
  combat: {
    defensiveRank: 2,
    defenseBonus: 0,
    protectionBonus: 0,
    movementBonus: 0,
    initiativeBonus: 0
  },
  movement: { base: 6 }
});

test("CREA-12 deriva fórmulas base desde una sola autoridad", () => {
  const derived = deriveActorState({ system: baseSystem() });
  assert.equal(derived.healthMax, 16);
  assert.equal(derived.manaMax, 12);
  assert.equal(derived.severeThreshold, 8);
  assert.equal(derived.defensiveBonus, 1);
  assert.equal(derived.defense, 14);
  assert.equal(derived.maneuverDefense, 14);
  assert.equal(derived.mentalDefense, 13);
  assert.equal(derived.bodyDefense, 14);
  assert.equal(derived.movement, 6);
  assert.equal(derived.initiativeModifier, 4);
});

test("FlatModifier alimenta derivados y conserva procedencia", () => {
  const rulePreparation = {
    modifiers: [
      { selector:"healthMax", value:2, label:"Constitución robusta", sourceItemId:"t1", sourceItemName:"Rasgo", ruleId:"r1" },
      { selector:"defense", value:1, label:"Protección arcana", sourceItemId:"s1", sourceItemName:"Hechizo", ruleId:"r2" },
      { selector:"initiative", value:2, label:"Alerta", sourceItemId:"x1", sourceItemName:"Efecto", ruleId:"r3" }
    ]
  };
  const derived = deriveActorState({ system:baseSystem(), rulePreparation });
  assert.equal(derived.healthMax, 18);
  assert.equal(derived.defense, 15);
  assert.equal(derived.initiativeModifier, 6);
  assert.equal(derived.breakdowns.healthMax.contributions[0].sourceItemId, "t1");
  assert.equal(derived.breakdowns.initiativeModifier.contributions[0].sourceItemName, "Efecto");
});

test("armadura entra en el registro común y sólo usa la protección equipada mayor", () => {
  const items = [
    { id:"a1", name:"Ligera", type:"armor", system:{ equipped:true, protection:1 } },
    { id:"a2", name:"Placa", type:"armor", system:{ equipped:true, protection:5 } },
    { id:"a3", name:"Reserva", type:"armor", system:{ equipped:false, protection:9 } }
  ];
  const derived = deriveActorState({ system:baseSystem(), items });
  assert.equal(derived.protection, 5);
  assert.equal(derived.breakdowns.protection.contributions.length, 1);
  assert.equal(derived.breakdowns.protection.contributions[0].sourceItemId, "a2");
});

test("escudo frontal queda contextual y no infla la Defensa preparada", () => {
  const items = [
    { id:"s1", name:"Escudo pesado", type:"shield", system:{ equipped:true, passiveDefense:2, frontalOnly:true } }
  ];
  const derived = deriveActorState({ system:baseSystem(), items });
  assert.equal(derived.defense, 14);
  assert.equal(derived.contextual.defense.length, 1);
  assert.equal(resolveDerivedSelector(derived, "defense", { frontal:false }).total, 14);
  assert.equal(resolveDerivedSelector(derived, "defense", { frontal:true }).total, 16);
});

test("modificadores manuales estructurados pasan por el mismo motor", () => {
  const system = baseSystem();
  system.modifiers = { manual: {
    defensiveBonus: { id:"manual-defense", selector:"defensiveBonus", value:2, label:"Ajuste de Defensa" },
    protection: { id:"manual-protection", selector:"protection", value:1, label:"Ajuste de Protección" },
    movement: { id:"manual-movement", selector:"movement", value:-1, label:"Ajuste de Movimiento" },
    initiativeModifier: { id:"manual-initiative", selector:"initiativeModifier", value:3, label:"Ajuste de Iniciativa" }
  } };
  const derived = deriveActorState({ system });
  assert.equal(derived.defensiveBonus, 3);
  assert.equal(derived.defense, 16);
  assert.equal(derived.maneuverDefense, 16);
  assert.equal(derived.protection, 1);
  assert.equal(derived.movement, 5);
  assert.equal(derived.initiativeModifier, 7);
  assert.equal(derived.breakdowns.defensiveBonus.contributions.some((entry) => entry.sourceType === "manual"), true);
});

test("campos manuales legados siguen siendo compatibles antes de migrar", () => {
  const system = baseSystem();
  system.combat.movementBonus = -2;
  assert.equal(deriveActorState({ system }).movement, 4);
});


test("Familiares comparten motor pero no obtienen reserva propia de Maná", () => {
  const system=baseSystem();
  system.attributes.vol.value=5;
  const derived=deriveActorState({actorType:"familiar",system});
  assert.equal(derived.manaMax,0);
  assert.equal(derived.breakdowns.manaMax.formula,"Sin reserva de Maná propia");
});

test("modificadores negativos nunca producen máximos de recurso inferiores a 0", () => {
  const rulePreparation={modifiers:[
    {selector:"healthMax",value:-999,label:"Prueba"},
    {selector:"manaMax",value:-999,label:"Prueba"}
  ]};
  const derived=deriveActorState({system:baseSystem(),rulePreparation});
  assert.equal(derived.healthMax,0);
  assert.equal(derived.manaMax,0);
});


test("Daño Grave expone fórmula auditable en breakdowns", () => {
  const derived=deriveActorState({system:baseSystem()});
  assert.equal(derived.severeThreshold,8);
  assert.equal(derived.breakdowns.severeThreshold.formula,"5 + VIG");
  assert.equal(derived.breakdowns.severeThreshold.base,8);
  assert.equal(derived.breakdowns.severeThreshold.total,8);
});


test("CREA-14: Familiar usa el Perfil Inicial simplificado y no las fórmulas de PJ", () => {
  const system={
    attributes:{
      agi:{value:9},vig:{value:9},vol:{value:9},per:{value:9}
    },
    movement:{base:5},
    familiar:{
      lifeMax:12,
      defense:12,
      protection:1,
      perception:2,
      resistance:3,
      will:2,
      attackBonus:3,
      damage:3
    }
  };
  const derived=deriveActorState({actorType:"familiar",system});
  assert.equal(derived.healthMax,12);
  assert.equal(derived.manaMax,0);
  assert.equal(derived.defense,12);
  assert.equal(derived.maneuverDefense,12);
  assert.equal(derived.protection,1);
  assert.equal(derived.bodyDefense,14);
  assert.equal(derived.mentalDefense,13);
  assert.equal(derived.movement,5);
  assert.equal(derived.initiativeModifier,2);
  assert.equal(derived.breakdowns.healthMax.formula,"Perfil de Familiar");
});
