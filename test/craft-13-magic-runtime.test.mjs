import test from "node:test";
import assert from "node:assert/strict";

import { installCraftingMagicGuards } from "../scripts/rules/crafting-magic-runtime.mjs";

function applyChanges(document, changes) {
  for (const [path, value] of Object.entries(changes)) {
    const keys=path.split(".");
    if(keys[0]==="system") keys.shift();
    let node=document.system;
    while(keys.length>1) {
      const key=keys.shift();
      node[key] ??= {};
      node=node[key];
    }
    node[keys[0]]=structuredClone(value);
  }
}

class StubItem {
  constructor({id,name,type="equipment",system={}}) {
    this.id=id;
    this.name=name??id;
    this.type=type;
    this.system=structuredClone(system);
    this.parent=null;
    this.uuid="Item."+id;
  }
  async update(changes) {
    applyChanges(this,changes);
    return changes;
  }
}

class StubActor {
  constructor(id="actor") {
    this.id=id;
    this.uuid="Actor."+id;
    this.type="character";
    this.system={
      resources:{mana:{value:9}},
      turn:{action:true,reaction:true},
      combat:{kineticBarrierActive:false},
      magic:{
        attunementCapacity:3,
        sustainedSpellIds:[],
        sustainedObjectIds:[],
        linkedImprintClaims:{},
        automaticEventClaims:{},
        preparedTrap:{trapUuid:"",triggerKey:""}
      }
    };
    this.items=[];
  }
  add(item) {
    item.parent=this;
    item.uuid=this.uuid+".Item."+item.id;
    this.items.push(item);
    return item;
  }
  async update(changes) {
    applyChanges(this,changes);
    return changes;
  }
}

globalThis.foundry={utils:{
  deepClone:(value)=>structuredClone(value),
  escapeHTML:(value)=>String(value)
}};
globalThis.ui={notifications:{
  warn:(message)=>({ok:false,error:String(message)})
}};

installCraftingMagicGuards(StubActor);

function enchanted(actor,{
  id="enchanted",
  grade=1,
  reserve=6,
  spell={slug:"barrera-cinetica",manaCost:3,activation:"Reacción",sustained:false}
}={}) {
  return actor.add(new StubItem({
    id,
    system:{
      condition:"operative",
      enchantment:{
        grade,
        patternKey:spell.slug,
        functionalKey:spell.slug,
        reserve:{value:reserve,max:grade===1?6:grade===2?10:14},
        attunedActorUuid:actor.uuid,
        seal:false,
        boundSpell:spell
      }
    }
  }));
}

test("CRAFT-13E runtime: Sintonizar siempre inicia RE en 0 y Desintonizar vuelve a vaciarla",async()=>{
  const actor=new StubActor("attune");
  const item=actor.add(new StubItem({
    id:"amulet",
    system:{
      condition:"operative",
      enchantment:{
        grade:1,
        patternKey:"firmness",
        functionalKey:"mental-fear-defense",
        reserve:{value:6,max:6},
        attunedActorUuid:"",
        seal:false
      }
    }
  }));
  const result=await actor.attuneMagicItem(item,{elapsedMinutes:60,functionKnown:true});
  assert.equal(result.ok,true);
  assert.equal(item.system.enchantment.attunedActorUuid,actor.uuid);
  assert.equal(item.system.enchantment.reserve.value,0);

  item.system.enchantment.reserve.value=4;
  const removed=await actor.unattuneMagicItem(item);
  assert.equal(removed.ok,true);
  assert.equal(item.system.enchantment.attunedActorUuid,"");
  assert.equal(item.system.enchantment.reserve.value,0);
});

test("CRAFT-13E runtime: Impronta usa Maná personal y una Vinculada no puede repetirse en la misma resolución",async()=>{
  const actor=new StubActor("imprint");
  actor.system.resources.mana.value=5;
  const host=actor.add(new StubItem({
    id:"sword",
    type:"weapon",
    system:{
      quality:"superior",
      condition:"operative",
      manufacture:{modifications:[]},
      runic:{
        capacityPrepared:1,
        channels:[{id:"c1",type:"inscription"}],
        imprints:[{id:"r1",key:"arcaneEdgeI",mode:"inscribed",channelIds:["c1"],stoneUuid:""}]
      }
    }
  }));
  const first=await actor.useRunicImprint(host,"r1",{
    resolutionId:"attack-42",
    resolutionHostItemUuid:host.uuid,
    usesHostWeaponProfile:true
  });
  assert.equal(first.ok,true);
  assert.equal(first.effect.damageBonus,1);
  assert.equal(actor.system.resources.mana.value,3);
  assert.ok(actor.system.magic.linkedImprintClaims["attack-42"]);

  const second=await actor.useRunicImprint(host,"r1",{
    resolutionId:"attack-42",
    resolutionHostItemUuid:host.uuid,
    usesHostWeaponProfile:true
  });
  assert.equal(second.ok,false);
  assert.match(second.error,/Sólo una Impronta Vinculada/);
  assert.equal(actor.system.resources.mana.value,3);
});

test("CRAFT-13E runtime: insertar y extraer Piedra exige Engarce y conserva el Item físico",async()=>{
  const actor=new StubActor("stone");
  const host=actor.add(new StubItem({
    id:"host",
    type:"weapon",
    system:{
      quality:"superior",
      condition:"operative",
      manufacture:{modifications:[]},
      runic:{
        capacityPrepared:1,
        channels:[{id:"socket-1",type:"socket"}],
        imprints:[]
      }
    }
  }));
  const stone=actor.add(new StubItem({
    id:"stone",
    system:{
      condition:"operative",
      imprintStone:{enabled:true,grade:1,imprintKey:"runicGuardI",socketedHostUuid:""}
    }
  }));

  const inserted=await actor.socketImprintStone(host,stone,{channelIds:["socket-1"],elapsedMinutes:10,underPressure:false,toolsReady:true});
  assert.equal(inserted.ok,true);
  assert.equal(stone.system.imprintStone.socketedHostUuid,host.uuid);
  assert.equal(host.system.runic.imprints[0].stoneUuid,stone.uuid);

  const extracted=await actor.extractImprintStone(host,stone,{elapsedMinutes:10,underPressure:false,toolsReady:true});
  assert.equal(extracted.ok,true);
  assert.equal(stone.system.imprintStone.socketedHostUuid,"");
  assert.equal(host.system.runic.imprints.length,0);
});

test("CRAFT-13E runtime: Piedra sin herramientas apropiadas no puede insertarse ni extraerse",async()=>{
  const actor=new StubActor("stone-tools");
  const host=actor.add(new StubItem({
    id:"host-tools",
    type:"weapon",
    system:{
      quality:"superior",
      condition:"operative",
      manufacture:{modifications:[]},
      runic:{capacityPrepared:1,channels:[{id:"socket-1",type:"socket"}],imprints:[]}
    }
  }));
  const stone=actor.add(new StubItem({
    id:"stone-tools-item",
    system:{condition:"operative",imprintStone:{enabled:true,grade:1,imprintKey:"runicGuardI",socketedHostUuid:""}}
  }));
  const denied=await actor.socketImprintStone(host,stone,{channelIds:["socket-1"],elapsedMinutes:10,underPressure:false,toolsReady:false});
  assert.equal(denied.ok,false);
  assert.match(denied.error,/herramientas apropiadas/);
  assert.equal(host.system.runic.imprints.length,0);
});

test("CRAFT-13E runtime: Preparar y disparar trampa manual no bloquea por marcadores de turno",async()=>{
  const actor=new StubActor("prepared-trap");
  const trap=actor.add(new StubItem({
    id:"manual-trap",
    system:{
      condition:"operative",
      trap:{
        enabled:true,
        frame:"standard",
        precision:4,
        mechanismDf:12,
        triggerType:"manual",
        physicalTriggerKey:"",
        automatic:false,
        state:"armed",
        baseTimeMinutes:120,
        load:{kind:"alarm",profileRef:"",componentUuid:"",maneuverEffect:"",damage:0,penetration:0}
      }
    }
  }));

  const fake=await actor.triggerCraftedTrap(trap,{reactive:true,preparedTriggerKey:"door-opens"});
  assert.equal(fake.ok,false);
  assert.equal(actor.system.turn.action,true);
  assert.equal(actor.system.turn.reaction,true);
  assert.equal(trap.system.trap.state,"armed");

  const prepared=await actor.prepareManualTrapReaction(trap,{triggerKey:"door-opens"});
  assert.equal(prepared.ok,true);
  assert.equal(actor.system.turn.action,true);
  assert.equal(actor.system.magic.preparedTrap.trapUuid,trap.uuid);

  const wrong=await actor.triggerCraftedTrap(trap,{reactive:true,preparedTriggerKey:"window-opens"});
  assert.equal(wrong.ok,false);
  assert.equal(actor.system.turn.reaction,true);
  assert.equal(trap.system.trap.state,"armed");

  const fired=await actor.triggerCraftedTrap(trap,{reactive:true,preparedTriggerKey:"door-opens"});
  assert.equal(fired.ok,true);
  assert.equal(actor.system.turn.reaction,true);
  assert.deepEqual(actor.system.magic.preparedTrap,{trapUuid:"",triggerKey:""});
  assert.equal(trap.system.trap.state,"discharged");
});

test("CRAFT-13E runtime: Pasivos sólo se exponen al Actor realmente Sintonizado y con objeto Operativo",()=>{
  const actor=new StubActor("passive-owner");
  const item=actor.add(new StubItem({
    id:"firmness",
    system:{
      condition:"operative",
      enchantment:{
        grade:1,
        patternKey:"",
        functionalKey:"mental-fear-defense",
        passiveKey:"firmnessAmulet",
        reserve:{value:0,max:6},
        attunedActorUuid:actor.uuid,
        seal:false
      }
    }
  }));
  let passives=actor.attunedPassiveEnchantments();
  assert.equal(passives.length,1);
  assert.equal(passives[0].effect.mentalDefenseBonus,2);
  item.system.condition="damaged";
  passives=actor.attunedPassiveEnchantments();
  assert.equal(passives.length,0);
});

test("CRAFT-13E runtime: Hechizo Vinculado gasta RE sin bloquear por Acción/Reacción",async()=>{
  const actor=new StubActor("bound-spell");
  actor.system.resources.mana.value=7;
  const item=enchanted(actor,{spell:{slug:"barrera-cinetica",manaCost:3,activation:"Reacción",sustained:false}});
  const result=await actor.activateEnchantedItem(item);
  assert.equal(result.ok,true);
  assert.equal(item.system.enchantment.reserve.value,3);
  assert.equal(actor.system.resources.mana.value,7);
  assert.equal(actor.system.turn.reaction,true);
  assert.equal(result.power,4);
  assert.equal(result.derivedDf,15);
});

test("CRAFT-13E runtime: Sostenido de objeto compite con un Sostenido personal antes de gastar RE",async()=>{
  const actor=new StubActor("sustain");
  actor.system.magic.sustainedSpellIds=["spell-active"];
  const item=enchanted(actor,{
    id:"cloak",
    grade:3,
    reserve:14,
    spell:{slug:"invisibilidad",manaCost:9,activation:"Acción",sustained:true}
  });
  const result=await actor.activateEnchantedItem(item);
  assert.equal(result.ok,false);
  assert.match(result.error,/límite normal de Sostenimiento/);
  assert.equal(item.system.enchantment.reserve.value,14);
  assert.equal(actor.system.turn.action,true);
});

test("CRAFT-13E runtime: Bypass físico registrado evita la descarga automática sin identificar aliados",async()=>{
  const owner=new StubActor("trap-bypass-owner");
  const target=new StubActor("trap-bypass-target");
  const trap=owner.add(new StubItem({
    id:"bypass-trap",
    system:{
      condition:"operative",
      trap:{
        enabled:true,
        frame:"standard",
        precision:4,
        mechanismDf:12,
        triggerType:"contact",
        physicalTriggerKey:"plate-a",
        automatic:true,
        state:"armed",
        baseTimeMinutes:120,
        concealment:{grade:"visible",detectionDf:0,environmentAllows:true},
        bypassKey:"release-pin",
        load:{kind:"alarm",profileRef:"",componentUuid:"",maneuverEffect:"",damage:0,penetration:0}
      }
    }
  }));
  const bypassed=await owner.triggerCraftedTrap(trap,{
    targetActor:target,
    eventId:"event-bypass",
    eventType:"contact",
    physicalTriggerKey:"plate-a",
    providedBypassKey:"release-pin"
  });
  assert.equal(bypassed.ok,true);
  assert.equal(bypassed.bypassed,true);
  assert.equal(trap.system.trap.state,"armed");
  assert.deepEqual(target.system.magic.automaticEventClaims,{});
});

test("CRAFT-13E runtime: un mismo evento indivisible sólo alimenta una trampa o Sello ordinario",async()=>{
  const owner=new StubActor("owner");
  const target=new StubActor("target");
  const trap=owner.add(new StubItem({
    id:"trap",
    system:{
      condition:"operative",
      trap:{
        enabled:true,
        frame:"standard",
        precision:4,
        mechanismDf:12,
        triggerType:"contact",
        physicalTriggerKey:"plate-a",
        automatic:true,
        state:"armed",
        baseTimeMinutes:120,
        load:{kind:"mechanical-strike",profileRef:"Lanza",componentUuid:"Actor.owner.Item.lanza",damage:5,penetration:1}
      }
    }
  }));
  const seal=owner.add(new StubItem({
    id:"seal",
    system:{
      condition:"operative",
      priceCopper:1200,
      enchantment:{
        grade:1,
        patternKey:"seal-pattern",
        functionalKey:"ward",
        materialCostCopper:500,
        timeMinutes:1440,
        reserve:{value:0,max:6},
        attunedActorUuid:"",
        seal:true,
        sealState:"charged",
        sealTriggerType:"contact",
        sealBypassKey:"",
        chargedReferenceValueCopper:1200,
        boundSpell:{slug:"aguja",manaCost:3,activation:"Acción"}
      }
    }
  }));

  const first=await owner.triggerCraftedTrap(trap,{
    targetActor:target,
    eventId:"door-open-1",
    eventType:"contact",
    physicalTriggerKey:"plate-a"
  });
  assert.equal(first.ok,true);
  assert.equal(trap.system.trap.state,"discharged");

  const second=await owner.triggerCustodySeal(seal,{targetActor:target,eventId:"door-open-1",eventType:"contact"});
  assert.equal(second.ok,false);
  assert.match(second.error,/mismo evento físico indivisible/);
  assert.equal(seal.system.enchantment.sealState,"charged");
});

test("CRAFT-13E runtime: descargar Sello reduce su valor por el coste de rearme consumido",async()=>{
  const owner=new StubActor("seal-owner");
  const target=new StubActor("seal-target");
  const seal=owner.add(new StubItem({
    id:"seal",
    system:{
      condition:"operative",
      priceCopper:1200,
      enchantment:{
        grade:1,
        patternKey:"seal-pattern",
        functionalKey:"ward",
        materialCostCopper:500,
        timeMinutes:1440,
        reserve:{value:0,max:6},
        attunedActorUuid:"",
        seal:true,
        sealState:"charged",
        sealTriggerType:"contact",
        sealBypassKey:"",
        chargedReferenceValueCopper:1200,
        boundSpell:{slug:"aguja",manaCost:3,activation:"Acción"}
      }
    }
  }));
  const result=await owner.triggerCustodySeal(seal,{targetActor:target,eventId:"threshold-2",eventType:"contact"});
  assert.equal(result.ok,true);
  assert.equal(seal.system.enchantment.sealState,"discharged");
  assert.equal(seal.system.priceCopper,950);
});


test("CRAFT-13E runtime: una trampa automática no puede dispararse desde un evento físico distinto",async()=>{
  const owner=new StubActor("wrong-trigger-owner");
  const target=new StubActor("wrong-trigger-target");
  const trap=owner.add(new StubItem({
    id:"tripwire",
    system:{
      condition:"operative",
      trap:{
        enabled:true,
        frame:"standard",
        precision:4,
        mechanismDf:12,
        triggerType:"tripwire",
        physicalTriggerKey:"wire-west",
        automatic:true,
        state:"armed",
        baseTimeMinutes:120,
        load:{kind:"mechanical-strike",profileRef:"Lanza",componentUuid:"Actor.wrong-trigger-owner.Item.lanza",damage:5,penetration:1}
      }
    }
  }));
  const wrong=await owner.triggerCraftedTrap(trap,{
    targetActor:target,
    eventId:"door-open-9",
    eventType:"opening",
    physicalTriggerKey:"door-west"
  });
  assert.equal(wrong.ok,false);
  assert.equal(trap.system.trap.state,"armed");
  assert.deepEqual(target.system.magic.automaticEventClaims,{});
});


test("CRAFT-13E runtime: el motor mágico no escribe Acción/Reacción automáticamente",async()=>{
  const source=await readFile(new URL("../scripts/rules/crafting-magic-runtime.mjs", import.meta.url),"utf8");
  assert.equal(source.includes('"system.turn.action":false'),false);
  assert.equal(source.includes('"system.turn.reaction":false'),false);
  assert.equal(source.includes("La Acción ya fue gastada."),false);
  assert.equal(source.includes("La Reacción ya fue gastada."),false);
});
