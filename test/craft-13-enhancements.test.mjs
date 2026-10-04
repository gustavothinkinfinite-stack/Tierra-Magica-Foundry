import test from "node:test";
import assert from "node:assert/strict";

import {
  CRAFTING_MATERIAL_PROFILES,
  CRAFTING_MODIFICATIONS,
  deriveManufacturedSystem,
  materialInstallationQuote,
  modificationInstallationQuote,
  modificationRemovalQuote,
  modificationPoints,
  qualityCapacity,
  qualityUpgradeQuote,
  requirementsForManufacture,
  validateModificationSelection,
  validateSpecialMaterials
} from "../scripts/rules/crafting-enhancements.mjs";

const weapon=(overrides={})=>({
  name:"Espada larga",
  type:"weapon",
  system:{
    damage:5,
    penetration:0,
    strengthMin:1,
    reload:0,
    skill:"martialWeapons",
    properties:"Versátil",
    priceCopper:200,
    quality:"common",
    ...overrides
  }
});

test("CRAFT-13D: CapM pertenece exclusivamente a la Calidad",()=>{
  assert.equal(qualityCapacity("common"),0);
  assert.equal(qualityCapacity("superior"),1);
  assert.equal(qualityCapacity("exceptional"),2);
  assert.equal(CRAFTING_MODIFICATIONS.optimizedStrike.capM,2);
  assert.equal(CRAFTING_MATERIAL_PROFILES.kharumPrecisionAlloy.propertyKey,"fine-machining");
});

test("CRAFT-13D: ascensos de Calidad usan sólo las cuatro transiciones canónicas",()=>{
  assert.deepEqual(
    qualityUpgradeQuote({fromQuality:"common",toQuality:"superior",referenceValueCopper:200,baseTimeMinutes:480}),
    {valid:true,materialCopper:50,timeMinutes:240,capMGained:1}
  );
  assert.deepEqual(
    qualityUpgradeQuote({fromQuality:"common",toQuality:"exceptional",referenceValueCopper:200,baseTimeMinutes:480}),
    {valid:true,materialCopper:150,timeMinutes:480,capMGained:2}
  );
  assert.equal(qualityUpgradeQuote({fromQuality:"superior",toQuality:"common",referenceValueCopper:200,baseTimeMinutes:480}).valid,false);
  assert.equal(qualityUpgradeQuote({fromQuality:"defective",toQuality:"superior",referenceValueCopper:200,baseTimeMinutes:480}).valid,false);
  assert.deepEqual(
    qualityUpgradeQuote({fromQuality:"common",toQuality:"superior",referenceValueCopper:100,baseTimeMinutes:60}),
    {valid:true,materialCopper:25,timeMinutes:30,capMGained:1}
  );
});

test("CRAFT-13D: modificación posterior cobra por CapM y mecanizado fino aplica sólo su tarifa",()=>{
  assert.deepEqual(
    modificationInstallationQuote({points:2,referenceValueCopper:200,baseTimeMinutes:480}),
    {materialCopper:40,timeMinutes:240,points:2,fineMachining:false}
  );
  assert.deepEqual(
    modificationInstallationQuote({points:2,referenceValueCopper:200,baseTimeMinutes:480,fineMachining:true}),
    {materialCopper:20,timeMinutes:144,points:2,fineMachining:true}
  );
});

test("CRAFT-13D: retirar una Modificación libera CapM sin generar VI",()=>{
  assert.deepEqual(modificationRemovalQuote({baseTimeMinutes:120}),{materialCopper:0,timeMinutes:30});
  assert.deepEqual(modificationRemovalQuote({baseTimeMinutes:480}),{materialCopper:0,timeMinutes:48});
});

test("CRAFT-13D: incorporar una parte Mayor usa SM y 50% del tiempo; Dominante se bloquea",()=>{
  assert.deepEqual(
    materialInstallationQuote({referenceValueCopper:200,grade:"rare",coverage:"major",baseTimeMinutes:480}),
    {valid:true,materialCopper:50,timeMinutes:240}
  );
  const dominant=materialInstallationQuote({referenceValueCopper:200,grade:"specialized",coverage:"dominant",baseTimeMinutes:480});
  assert.equal(dominant.valid,false);
  assert.match(dominant.error,/Dominante/);
});

test("CRAFT-13D: una Calidad no admite CapM comprado por encima de su límite",()=>{
  const result=validateModificationSelection(weapon(),{
    quality:"superior",
    modifications:[{key:"optimizedStrike"}]
  });
  assert.equal(result.valid,false);
  assert.ok(result.issues.some((issue)=>issue.code==="capm"));
});

test("CRAFT-13D: compatibilidad impide Pen 4, Recarga 0 y modificaciones imposibles",()=>{
  const rifle=weapon({penetration:3,reload:1,skill:"rangedWeapons",properties:"Recarga 1, 2 manos"});
  const pen=validateModificationSelection(rifle,{quality:"exceptional",modifications:[{key:"penetratingProfile"}]});
  assert.ok(pen.issues.some((issue)=>issue.code==="modification-compatibility"));

  const reload=validateModificationSelection(rifle,{quality:"exceptional",modifications:[{key:"refinedReload"}]});
  assert.ok(reload.issues.some((issue)=>issue.code==="modification-compatibility"));

  const compact=validateModificationSelection(rifle,{quality:"superior",modifications:[{key:"compact"}]});
  assert.ok(compact.issues.some((issue)=>issue.code==="modification-compatibility"));
});

test("CRAFT-13D: propiedades equivalentes de Material y Modificación no se apilan",()=>{
  const result=validateModificationSelection({
    name:"Armadura",
    type:"armor",
    system:{strengthMin:1,properties:""}
  },{
    quality:"superior",
    modifications:[{key:"silent"}],
    specialMaterials:[{
      id:"voices",
      name:"Madera de las Mil Voces",
      profileKey:"thousandVoicesWood",
      grade:"rare",
      coverage:"major",
      part:"revestimiento corporal",
      supplementCopper:50
    }]
  });
  assert.equal(result.valid,false);
  assert.ok(result.issues.some((issue)=>issue.code==="equivalent-property"));
});

test("CRAFT-13D: un objeto sólo admite un Material Dominante y cada Perfil respeta cobertura mínima",()=>{
  const twoDominant=validateSpecialMaterials([
    {id:"a",profileKey:"kharumSteel",grade:"specialized",coverage:"dominant"},
    {id:"b",profileKey:"unknown",grade:"rare",coverage:"dominant"}
  ]);
  assert.equal(twoDominant.valid,false);
  assert.ok(twoDominant.issues.some((issue)=>issue.code==="dominant-material"));

  const underCoverage=validateSpecialMaterials([
    {id:"steel",profileKey:"kharumSteel",grade:"specialized",coverage:"major",part:"estructura"}
  ]);
  assert.ok(underCoverage.issues.some((issue)=>issue.code==="material-coverage-minimum"));
});

test("CRAFT-13D: Material Especial no dominante exige una parte funcional real",()=>{
  const result=validateSpecialMaterials([{
    id:"lens",
    name:"Cristal",
    profileKey:"refinedArcaneCrystal",
    grade:"specialized",
    coverage:"component",
    supplementCopper:7
  }]);
  assert.equal(result.valid,false);
  assert.ok(result.issues.some((issue)=>issue.code==="material-functional-part"));
});

test("CRAFT-13D: material sin Perfil conocido no inventa propiedad mecánica",()=>{
  const result=deriveManufacturedSystem(weapon(),{
    referenceValueCopper:200,
    baseTimeMinutes:480,
    baseRank:3,
    baseInstallation:"professional",
    quality:"common",
    specialMaterials:[{
      id:"creature",
      name:"Escama desconocida",
      profileKey:"creature-scale-profile",
      grade:"rare",
      coverage:"component",
      part:"placa funcional",
      supplementCopper:25
    }]
  });
  assert.equal(result.valid,true);
  assert.deepEqual(result.manufacture.effects.materialProperties,[]);
});

test("CRAFT-13D: estadísticas se recalculan desde el perfil base y no se suman al reejecutar",()=>{
  const first=deriveManufacturedSystem(weapon(),{
    referenceValueCopper:200,
    baseTimeMinutes:480,
    baseRank:3,
    baseInstallation:"professional",
    quality:"exceptional",
    modifications:[{key:"optimizedStrike"}]
  });
  assert.equal(first.valid,true);
  assert.equal(first.system.damage,6);
  assert.equal(first.manufacture.capMUsed,2);
  assert.equal(first.system.priceCopper,500);

  const second=deriveManufacturedSystem({name:"Espada larga",type:"weapon",system:first.system},{
    referenceValueCopper:200,
    baseTimeMinutes:480,
    baseRank:3,
    baseInstallation:"professional",
    quality:"exceptional",
    modifications:[{key:"optimizedStrike"}],
    existingManufacture:first.manufacture
  });
  assert.equal(second.valid,true);
  assert.equal(second.system.damage,6);
});

test("CRAFT-13D: Perfil penetrante y Recarga refinada respetan sus techos mecánicos",()=>{
  const pen=deriveManufacturedSystem(weapon({penetration:2}),{
    referenceValueCopper:200,baseTimeMinutes:480,quality:"exceptional",
    modifications:[{key:"penetratingProfile"}]
  });
  assert.equal(pen.system.penetration,3);

  const reload=deriveManufacturedSystem(weapon({reload:2,skill:"rangedWeapons"}),{
    referenceValueCopper:200,baseTimeMinutes:480,quality:"exceptional",
    modifications:[{key:"refinedReload"}]
  });
  assert.equal(reload.system.reload,1);
});

test("CRAFT-13D: Bloqueo afinado y Bastidor móvil sólo alteran el perfil permitido",()=>{
  const shield={
    name:"Escudo pesado",
    type:"shield",
    system:{block:2,strengthMin:2,movementPenalty:-1,properties:"Bloqueo +2; Movimiento -1"}
  };
  const tuned=deriveManufacturedSystem(shield,{
    referenceValueCopper:300,baseTimeMinutes:480,quality:"superior",
    modifications:[{key:"tunedBlock"}]
  });
  assert.equal(tuned.valid,true);
  assert.equal(tuned.system.block,3);
  assert.equal(tuned.system.movementPenalty,-1);

  const mobile=deriveManufacturedSystem(shield,{
    referenceValueCopper:300,baseTimeMinutes:480,quality:"exceptional",
    modifications:[{key:"mobileFrame"}]
  });
  assert.equal(mobile.valid,true);
  assert.equal(mobile.system.block,2);
  assert.equal(mobile.system.movementPenalty,0);
});

test("CRAFT-13D: VRT suma VRQ y dos veces cada SM",()=>{
  const result=deriveManufacturedSystem(weapon(),{
    referenceValueCopper:200,
    baseTimeMinutes:480,
    quality:"exceptional",
    specialMaterials:[{
      id:"steel",
      name:"Acero de Kharum",
      profileKey:"kharumSteel",
      grade:"specialized",
      coverage:"dominant",
      supplementCopper:50
    }]
  });
  assert.equal(result.valid,true);
  assert.equal(result.system.priceCopper,600);
  assert.equal(result.manufacture.totalReferenceValueCopper,600);
  assert.deepEqual(result.manufacture.effects.materialProperties,["kharum-tenacity"]);
});

test("CRAFT-13D: requisitos de Calidad y Material se acumulan hasta sus techos",()=>{
  const result=requirementsForManufacture({
    baseRank:3,
    baseInstallation:"professional",
    quality:"superior",
    specialMaterials:[{grade:"rare"}]
  });
  assert.equal(result.materialGrade,"rare");
  assert.equal(result.rank,5);
  assert.equal(result.installation,"exceptional");
});

test("CRAFT-13D: puntos de modificación se derivan del catálogo, no del precio",()=>{
  assert.equal(modificationPoints([{key:"maintainable"},{key:"silent"}]),2);
  assert.equal(modificationPoints([{key:"optimizedStrike"}]),2);
  assert.equal(modificationPoints([{key:"madeUp"}]),0);
});

test("CRAFT-13D: Equilibrada para Parada persiste +3 sin alterar el daño",()=>{
  const result=deriveManufacturedSystem(weapon(),{
    referenceValueCopper:200,
    baseTimeMinutes:480,
    quality:"superior",
    modifications:[{key:"balancedParry"}]
  });
  assert.equal(result.valid,true);
  assert.equal(result.manufacture.effects.parryDefenseBonus,3);
  assert.equal(result.system.damage,5);
});

