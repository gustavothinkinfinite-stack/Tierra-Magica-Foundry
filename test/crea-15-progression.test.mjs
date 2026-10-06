import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  pdTotalForLevel,
  nextAttributeUpgradeCost,
  canAffordDevelopmentPd,
  deriveDevelopmentBudget,
  validateInitialAttributes
} from "../scripts/rules/creation.mjs";

const templateUrl=new URL("../templates/actor/character-sheet.hbs",import.meta.url);
const actorUrl=new URL("../scripts/documents/actor.mjs",import.meta.url);
const systemUrl=new URL("../scripts/tierra-magica.mjs",import.meta.url);

test("CREA-15: progresión de nivel mantiene la economía canónica 1–20",()=>{
  assert.equal(pdTotalForLevel(1),25);
  assert.equal(pdTotalForLevel(2),29);
  assert.equal(pdTotalForLevel(9),57);
  assert.equal(pdTotalForLevel(15),81);
  assert.equal(pdTotalForLevel(20),101);
});

test("CREA-15: mejoras ordinarias de Atributo usan los costes por paso canónicos",()=>{
  assert.equal(nextAttributeUpgradeCost(0),4);
  assert.equal(nextAttributeUpgradeCost(1),6);
  assert.equal(nextAttributeUpgradeCost(2),9);
  assert.equal(nextAttributeUpgradeCost(3),13);
  assert.equal(nextAttributeUpgradeCost(4),18);
  assert.equal(nextAttributeUpgradeCost(5),null);
  assert.equal(nextAttributeUpgradeCost(6),null);
});

test("CREA-15: una mejora respeta PD ya gastados fuera de Habilidades",()=>{
  const actor={
    type:"character",
    system:{
      details:{level:2},
      skills:{test:{rank:2}},
      attributes:{
        fue:{creationValue:1,baseValue:1},
        agi:{creationValue:1,baseValue:1},
        vig:{creationValue:1,baseValue:1},
        int:{creationValue:1,baseValue:1},
        per:{creationValue:1,baseValue:1},
        vol:{creationValue:1,baseValue:1},
        pre:{creationValue:1,baseValue:1}
      }
    },
    items:[
      {system:{acquisition:{mode:"purchased",stage:"progression",paid:{resource:"pd",amount:25,known:true}}}}
    ]
  };
  const result=canAffordDevelopmentPd(actor,4,{skillKeys:["test"]});
  assert.equal(result.budget.pdTotal,29);
  assert.equal(result.budget.pdSpent,28);
  assert.equal(result.budget.pdAvailable,1);
  assert.equal(result.valid,false);
});

test("CREA-15: la ficha no permite editar libremente nivel o Atributos post-creación",async()=>{
  const template=await readFile(templateUrl,"utf8");
  assert.equal(template.includes('data-field="system.details.level"'),false);
  assert.equal(template.includes('name="system.attributes.{{key}}.baseValue"'),false);
  assert.match(template,/data-action="advance-level"/);
  assert.match(template,/data-action="upgrade-attribute"/);
  assert.match(template,/creationWizard\.isStep4/);
  assert.match(template,/creation\.isRebuilding/);
});

test("CREA-15: el Actor contiene las puertas autoritativas de progresión",async()=>{
  const source=await readFile(actorUrl,"utf8");
  assert.match(source,/async advanceLevel\(\)/);
  assert.match(source,/async upgradeAttribute\(key\)/);
  assert.match(source,/canAffordDevelopmentPd\(this, pdDelta/);
  assert.match(source,/\["building", "rebuilding"\]\.includes\(creationStatus\)/);
  assert.match(source,/Nivel 20 es el máximo ordinario/);
});


test("CREA-15: PEI sobrante desaparece al cerrar creación",()=>{
  const actor={
    type:"character",
    system:{
      details:{level:1},
      creation:{status:"complete"},
      skills:{},
      attributes:{}
    },
    items:[
      {system:{acquisition:{mode:"purchased",stage:"creation",paid:{resource:"pei",amount:1050,known:true}}}}
    ]
  };
  const budget=deriveDevelopmentBudget(actor,{skillKeys:[]});
  assert.equal(budget.peiSpent,1050);
  assert.equal(budget.peiAvailable,0);
});

test("CREA-15: reconstrucción admite progresión pagada sin confundirla con aumentos gratuitos",()=>{
  const attributes={
    fue:{creationValue:3,baseValue:4},
    agi:{creationValue:2,baseValue:2},
    vig:{creationValue:2,baseValue:2},
    int:{creationValue:2,baseValue:2},
    per:{creationValue:2,baseValue:2},
    vol:{creationValue:1,baseValue:1},
    pre:{creationValue:1,baseValue:1}
  };
  assert.equal(validateInitialAttributes(attributes).valid,false);
  assert.equal(validateInitialAttributes(attributes,{allowProgression:true}).valid,true);
});


test("CREA-15: compras de desarrollo no se reembolsan borrando Items con creación cerrada",async()=>{
  const source=await readFile(systemUrl,"utf8");
  assert.match(source,/Hooks\.on\("preDeleteItem"/);
  assert.match(source,/actor\.system\.creation\?\.status === "complete"/);
  assert.match(source,/requiere una reconstrucción autorizada/);
});
