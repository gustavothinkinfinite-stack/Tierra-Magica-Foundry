import test from "node:test";
import assert from "node:assert/strict";
import { deriveActorState } from "../scripts/rules/derived-state.mjs";
import { resolveActorDefense, resolveActorProtection } from "../scripts/rules/defense-context.mjs";
import { prepareRuleElements } from "../scripts/rules/rule-elements.mjs";
import { resourceReconciliationUpdates } from "../scripts/rules/resource-reconciliation.mjs";
import { migrateActorSource } from "../scripts/rules/data-model-migration.mjs";

const clone = (value) => JSON.parse(JSON.stringify(value));

function baseSystem() {
  return {
    schemaVersion: 2,
    attributes: {
      fue:{value:2}, agi:{value:2}, vig:{value:3},
      int:{value:1}, per:{value:4}, vol:{value:2}, pre:{value:1}
    },
    combat: {
      defensiveRank:2,
      guardActive:false,
      parryActive:false,
      parrySucceeded:false,
      counterattackUsed:false,
      kineticBarrierActive:false
    },
    movement:{base:6},
    magic:{sustainedSpellIds:[]},
    modifiers:{manual:{
      defensiveBonus:{id:"manual-defense",selector:"defensiveBonus",value:0,label:"Ajuste manual de Defensa"},
      protection:{id:"manual-protection",selector:"protection",value:0,label:"Ajuste manual de Protección"},
      movement:{id:"manual-movement",selector:"movement",value:0,label:"Ajuste manual de Movimiento"},
      initiativeModifier:{id:"manual-initiative",selector:"initiativeModifier",value:0,label:"Ajuste manual de Iniciativa"}
    }},
    resources:{
      health:{value:16,max:999},
      mana:{value:12,max:999}
    },
    status:{trauma:0,fatigue:0,bleeding:0,conditions:"",incapacitated:false}
  };
}

function fixture() {
  return {
    type:"character",
    system:baseSystem(),
    items:[
      {
        id:"armor", name:"Armadura de placas", type:"armor",
        system:{equipped:false,protection:5}
      },
      {
        id:"shield", name:"Escudo pesado", type:"shield",
        system:{equipped:false,passiveDefense:2,frontalOnly:true}
      },
      {
        id:"skin", name:"Piel Alterada", type:"spell",
        system:{slug:"piel-alterada",rules:[]}
      },
      {
        id:"trait", name:"Constitución robusta", type:"trait",
        system:{rules:[{key:"FlatModifier",selector:"healthMax",value:2,label:"Constitución robusta"}]}
      },
      {
        id:"effect", name:"Impulso táctico", type:"effect",
        system:{
          active:false,
          rules:[
            {key:"FlatModifier",selector:"defense",value:1,label:"Impulso táctico"},
            {key:"FlatModifier",selector:"movement",value:-1,label:"Carga táctica"}
          ]
        }
      }
    ]
  };
}

function prepare(source) {
  const rulePreparation=prepareRuleElements(source.items,{
    skillDefinitions:{},
    baseRollOptions:[]
  });
  const derived=deriveActorState({
    actorType:source.type,
    system:source.system,
    items:source.items,
    rulePreparation
  });
  source.system.derived=derived;
  // Foundry conserva estos campos sólo como espejo preparado para sus barras.
  source.system.resources.health.max=derived.healthMax;
  source.system.resources.mana.max=derived.manaMax;
  return derived;
}

function actorOf(source) {
  return {system:source.system};
}

function persistAndReopen(source) {
  const persisted=clone({
    type:source.type,
    system:source.system,
    items:source.items
  });
  delete persisted.system.derived;
  return persisted;
}

function applyResourceReconciliation(source) {
  const actor={
    type:source.type,
    _source:{system:{resources:{
      health:{value:source.system.resources.health.value},
      mana:{value:source.system.resources.mana.value}
    }}},
    system:source.system
  };
  const updates=resourceReconciliationUpdates(actor);
  for(const [path,value] of Object.entries(updates)){
    const keys=path.split(".").slice(1);
    let target=source.system;
    while(keys.length>1){
      const key=keys.shift();
      target[key] ??= {};
      target=target[key];
    }
    target[keys[0]]=value;
  }
  return updates;
}

test("CREA-12 3F: secuencia cruzada mantiene una sola autoridad de derivados",()=>{
  const source=fixture();

  // 1. Preparación base + Item permanente.
  let derived=prepare(source);
  assert.equal(derived.healthMax,18); // 10 + 2×VIG(3) + rasgo(2)
  assert.equal(derived.defense,14);
  assert.equal(derived.protection,0);
  assert.equal(derived.movement,6);
  assert.equal(source.system.resources.health.max,18);
  assert.equal(source.system.resources.health.value,16);

  // 2. Equipar armadura sólo cambia Protección.
  source.items.find((item)=>item.id==="armor").system.equipped=true;
  derived=prepare(source);
  assert.equal(derived.protection,5);
  assert.equal(derived.defense,14);
  assert.equal(derived.healthMax,18);

  // 3. Equipar escudo frontal no falsea el total universal.
  source.items.find((item)=>item.id==="shield").system.equipped=true;
  derived=prepare(source);
  assert.equal(derived.defense,14);
  assert.equal(resolveActorDefense(actorOf(source),{frontal:false,kineticBarrier:false}).total,14);
  assert.equal(resolveActorDefense(actorOf(source),{frontal:true,kineticBarrier:false}).total,16);

  // 4. Activar un Effect Item repercute simultáneamente en Defensa y Movimiento.
  source.items.find((item)=>item.id==="effect").system.active=true;
  derived=prepare(source);
  assert.equal(derived.defense,15);
  assert.equal(derived.movement,5);
  assert.equal(resolveActorDefense(actorOf(source),{frontal:true,kineticBarrier:false}).total,17);

  // 5. Aumentar un máximo no rellena el recurso actual.
  source.items.push({
    id:"vitality",name:"Vigor prestado",type:"effect",
    system:{active:true,rules:[{key:"FlatModifier",selector:"healthMax",value:4,label:"Vigor prestado"}]}
  });
  derived=prepare(source);
  assert.equal(derived.healthMax,22);
  assert.deepEqual(applyResourceReconciliation(source),{});
  assert.equal(source.system.resources.health.value,16);

  // Simulamos curación legítima mientras el máximo aumentado está vigente.
  source.system.resources.health.value=21;

  // 6. Cambiar Atributo y retirar fuente reduce máximo y recorta el actual.
  source.system.attributes.vig.value=1;
  source.items=source.items.filter((item)=>item.id!=="vitality");
  derived=prepare(source);
  assert.equal(derived.healthMax,14);
  assert.deepEqual(applyResourceReconciliation(source),{"system.resources.health.value":14});
  assert.equal(source.system.resources.health.value,14);

  // 7. Estados defensivos se combinan sin convertirse en autoridades paralelas.
  source.system.combat.guardActive=true;
  source.system.combat.parryActive=true;
  source.system.combat.kineticBarrierActive=true;
  derived=prepare(source);
  assert.equal(derived.defense,17); // base 14 + Effect 1 + Guardia 2
  assert.equal(resolveActorDefense(actorOf(source),{
    frontal:true,parryable:true,kineticBarrier:true
  }).total,23);
  assert.equal(resolveActorDefense(actorOf(source),{
    frontal:false,parryable:false,kineticBarrier:false
  }).total,17);

  // 8. Quitar estados devuelve exactamente al resultado derivado anterior.
  source.system.combat.guardActive=false;
  source.system.combat.parryActive=false;
  source.system.combat.kineticBarrierActive=false;
  derived=prepare(source);
  assert.equal(derived.defense,15);

  // 9. Magia sostenida condicional no altera Protección universal con armadura superior.
  source.system.magic.sustainedSpellIds=["skin"];
  derived=prepare(source);
  assert.equal(derived.protection,5);
  assert.equal(resolveActorProtection(actorOf(source),{alteredSkinCompatible:true}).total,5);

  // 10. Desequipar armadura revela Piel Alterada sólo cuando el contexto la habilita.
  source.items.find((item)=>item.id==="armor").system.equipped=false;
  derived=prepare(source);
  assert.equal(derived.protection,0);
  assert.equal(resolveActorProtection(actorOf(source),{alteredSkinCompatible:false}).total,0);
  assert.equal(resolveActorProtection(actorOf(source),{alteredSkinCompatible:true}).total,2);

  // 11. Desactivar magia y Effect elimina sus contribuciones sin residuos.
  source.system.magic.sustainedSpellIds=[];
  source.items.find((item)=>item.id==="effect").system.active=false;
  source.system.attributes.agi.value=3;
  derived=prepare(source);
  assert.equal(derived.protection,0);
  assert.equal(derived.movement,6);
  assert.equal(derived.defense,15); // 11 + AGI 3 + Bono Defensivo 1
  assert.equal(derived.healthMax,14);

  // 12. Retirar el Item permanente vuelve a la fórmula pura y fuerza reconciliación.
  source.items=source.items.filter((item)=>item.id!=="trait");
  derived=prepare(source);
  assert.equal(derived.healthMax,12);
  assert.deepEqual(applyResourceReconciliation(source),{"system.resources.health.value":12});
  assert.equal(source.system.resources.health.value,12);
});

test("CREA-12 3F: guardar y reabrir reconstruye el mismo estado sin persistir derived",()=>{
  const source=fixture();

  // Construimos un estado no trivial antes de guardar.
  source.items.find((item)=>item.id==="shield").system.equipped=true;
  source.items.find((item)=>item.id==="effect").system.active=true;
  source.system.magic.sustainedSpellIds=["skin"];
  source.system.attributes.agi.value=3;
  source.system.attributes.vig.value=2;
  source.system.combat.guardActive=true;
  source.system.resources.health.value=15;

  const before=prepare(source);
  const beforeSnapshot={
    healthMax:before.healthMax,
    manaMax:before.manaMax,
    defense:before.defense,
    protection:before.protection,
    movement:before.movement,
    initiativeModifier:before.initiativeModifier,
    frontal:resolveActorDefense(actorOf(source),{frontal:true,kineticBarrier:false}).total,
    skin:resolveActorProtection(actorOf(source),{alteredSkinCompatible:true}).total
  };

  const reopened=persistAndReopen(source);
  assert.equal("derived" in reopened.system,false);
  const migrated=migrateActorSource(reopened);
  assert.equal(migrated.system.schemaVersion,3);
  assert.deepEqual(migrateActorSource(migrated),migrated); // la migración vigente se aplica una vez y luego es idempotente
  // Simula un espejo max obsoleto en disco: no debe dominar la reapertura.
  migrated.system.resources.health.max=999;
  migrated.system.resources.mana.max=999;

  const after=prepare(migrated);
  const afterSnapshot={
    healthMax:after.healthMax,
    manaMax:after.manaMax,
    defense:after.defense,
    protection:after.protection,
    movement:after.movement,
    initiativeModifier:after.initiativeModifier,
    frontal:resolveActorDefense(actorOf(migrated),{frontal:true,kineticBarrier:false}).total,
    skin:resolveActorProtection(actorOf(migrated),{alteredSkinCompatible:true}).total
  };

  assert.deepEqual(afterSnapshot,beforeSnapshot);
  assert.equal(migrated.system.resources.health.max,after.healthMax);
  assert.equal(migrated.system.resources.mana.max,after.manaMax);
  assert.equal(migrated.system.resources.health.value,15);
});

test("CREA-12 3F: desactivar y reactivar Effects tras reapertura es reversible",()=>{
  const source=fixture();
  const effect=source.items.find((item)=>item.id==="effect");

  effect.system.active=true;
  const activeBefore=prepare(source);
  assert.equal(activeBefore.defense,15);
  assert.equal(activeBefore.movement,5);

  let reopened=persistAndReopen(source);
  reopened.items.find((item)=>item.id==="effect").system.active=false;
  const inactive=prepare(reopened);
  assert.equal(inactive.defense,14);
  assert.equal(inactive.movement,6);

  reopened=persistAndReopen(reopened);
  reopened.items.find((item)=>item.id==="effect").system.active=true;
  const activeAgain=prepare(reopened);
  assert.equal(activeAgain.defense,15);
  assert.equal(activeAgain.movement,5);
});
