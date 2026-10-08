import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import {
  CANONICAL_EQUIPMENT,
  canonicalEquipmentSources
} from "../scripts/catalog/equipment-canonical.mjs";
import {
  EQUIPMENT_CATALOG_COUNTS,
  EQUIPMENT_MUNDANE_GROUPS,
  PENDING_EQUIPMENT_SPECIAL,
  equipmentCatalogMaster
} from "../scripts/catalog/equipment-catalog-master.mjs";
import { normalizeSlug } from "../scripts/rules/identity.mjs";

test("EQP-01 crea un catálogo maestro de 100 equipos",()=>{
  assert.deepEqual(EQUIPMENT_CATALOG_COUNTS,{
    canonical:25,
    mundaneProposals:65,
    specialProposals:10,
    total:100
  });

  const catalog=equipmentCatalogMaster();
  assert.equal(catalog.length,100);
  assert.equal(catalog.filter((entry)=>entry.status==="canonical").length,25);
  assert.equal(catalog.filter((entry)=>entry.promotion==="pending-price-audit").length,65);
  assert.equal(catalog.filter((entry)=>entry.promotion==="pending-audit").length,10);

  const slugs=catalog.map((entry)=>normalizeSlug(entry.name));
  assert.equal(new Set(slugs).size,100);
});

test("EQP-01 implementa exactamente los 25 objetos ya canónicos del Manual",()=>{
  const sources=canonicalEquipmentSources();
  assert.equal(sources.length,25);
  assert.equal(CANONICAL_EQUIPMENT.length,25);

  const expectedPrices=new Map([
    ["Gancho de escalada",30],
    ["Palanca",20],
    ["Pico o pala",20],
    ["Caja pequeña asegurada",50],
    ["Catalejo",100],
    ["Estuche impermeable de documentos/mapas",50],
    ["Materiales de escritura",20],
    ["Repuesto médico, 5 usos",50],
    ["Kit Artesano",100],
    ["Kit Ingeniería de campo",200],
    ["Kit Minería",100],
    ["Kit Médico",200],
    ["Kit Alquimia de campo",200],
    ["Kit Infiltración",100],
    ["Kit Cartográfico",100],
    ["Kit Navegación",200],
    ["Kit Campaña",100],
    ["Kit Escalada",100],
    ["Kit Escribanía",50],
    ["Kit Mercantil",100],
    ["Kit Académico",200],
    ["Kit Instrumental Arcano de campo",200],
    ["Kit Mantenimiento de armas de fuego",100],
    ["Provisiones 7 días",20],
    ["Combustible de iluminación 5 noches",20]
  ]);

  for(const item of sources){
    assert.equal(item.type,"equipment",item.name);
    assert.equal(item.system.priceCopper,expectedPrices.get(item.name),item.name);
    assert.equal(item.system.priceStatus,"exact",item.name);
    assert.equal(item.system.tags.includes("canonical"),true,item.name);
    assert.equal(item.system.tags.includes("eqp-01"),true,item.name);
    assert.ok(item.system.category,item.name);
    assert.ok(item.system.description,item.name);
  }
});

test("EQP-01 conserva 25 equipos canónicos, más lotes operativos propuestos separados",()=>{
  const equipment=coreCatalog().filter((entry)=>entry.type==="equipment");
  assert.equal(equipment.filter(item=>item.system?.tags?.includes("eqp-01")).length,25);
  assert.equal(equipment.filter(item=>item.system?.tags?.includes("crafting-lot")).length,13);
  assert.equal(equipment.length,38);

  for(const item of CANONICAL_EQUIPMENT){
    assert.ok(equipment.find((entry)=>entry.name===item.name),item.name);
  }

  for(const row of equipmentCatalogMaster().filter((entry)=>entry.status==="proposal")){
    assert.equal(equipment.some((entry)=>entry.name===row.name),false,row.name);
  }
});

test("EQP-01 las 65 propuestas mundanas quedan sin precio inventado",()=>{
  const proposals=equipmentCatalogMaster().filter((entry)=>entry.promotion==="pending-price-audit");
  assert.equal(proposals.length,65);
  assert.equal(proposals.every((entry)=>entry.technology==="mundane"),true);
  assert.equal(proposals.every((entry)=>entry.priceCopper===null),true);
  assert.equal(proposals.every((entry)=>entry.priceStatus==="review"),true);
  assert.equal(proposals.every((entry)=>entry.blocker==="price-and-usage-audit"),true);
  assert.equal(EQUIPMENT_MUNDANE_GROUPS.length,7);
});

test("EQP-01 reserva 10 equipos especiales fuera del runtime",()=>{
  assert.equal(Object.keys(PENDING_EQUIPMENT_SPECIAL).length,10);
  const pending=equipmentCatalogMaster().filter((entry)=>entry.promotion==="pending-audit");
  assert.equal(pending.length,10);
  assert.equal(pending.filter((entry)=>entry.blocker==="craft-device-boundary").length,7);
  assert.equal(pending.filter((entry)=>entry.blocker==="special-material-or-magic").length,3);
});

test("EQP-01 conserva en el Manual la regla de que herramientas y Kits no dan bonus universal",()=>{
  const manual=fs.readFileSync(new URL("../docs/Tierra_Magica_Manual_Maestro.md",import.meta.url),"utf8");
  assert.match(manual,/no concede un bono universal/);
  assert.match(manual,/Un Kit representa \*\*herramientas reutilizables\*\*/);
  assert.match(manual,/Gancho de escalada/);
  assert.match(manual,/Kit Cartográfico/);
  assert.match(manual,/Provisiones 7 días/);
  assert.match(manual,/Combustible de iluminación 5 noches/);
});
