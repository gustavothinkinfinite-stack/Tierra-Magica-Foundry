import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import {
  APPROVED_PROJECTILE_PROFILES,
  approvedProjectileProfileSources
} from "../scripts/catalog/weapon-profiles-projectile-approved.mjs";
import { weaponCatalogMaster, WEAPON_CATALOG_COUNTS } from "../scripts/catalog/weapon-catalog-master.mjs";
import { PENDING_WEAPON_COUNTS, pendingWeaponBlocker } from "../scripts/catalog/weapon-catalog-pending.mjs";

const expected=Object.freeze({
  "Honda":{damage:3,penetration:0,rangeOptimal:12,priceCopper:20,properties:"Proyectil"},
  "Honda de guerra":{damage:4,penetration:0,rangeOptimal:18,priceCopper:50,properties:"Proyectil, Impactante"},
  "Fustíbalo":{damage:5,penetration:0,rangeOptimal:25,priceCopper:80,properties:"Proyectil, Impactante, 2 manos"},
  "Azagaya":{damage:3,penetration:0,strengthMin:0,rangeOptimal:12,priceCopper:20,properties:"Arrojadiza"},
  "Jabalina":{damage:4,penetration:0,strengthMin:0,rangeOptimal:10,priceCopper:30,properties:"Arrojadiza"},
  "Jabalina pesada":{damage:5,penetration:0,strengthMin:1,rangeOptimal:8,priceCopper:50,properties:"Arrojadiza"}
});

test("CAT-09 define exactamente seis perfiles canónicos de proyectil",()=>{
  assert.equal(Object.keys(APPROVED_PROJECTILE_PROFILES).length,6);
  const sources=approvedProjectileProfileSources();
  assert.equal(sources.length,6);

  for(const item of sources){
    const e=expected[item.name];
    assert.ok(e,item.name);
    assert.equal(item.system.skill,"rangedWeapons",item.name);
    assert.equal(item.system.attackAttribute,"agi",item.name);
    assert.equal(item.system.damageAttribute,"fue",item.name);
    for(const [key,value] of Object.entries(e)) assert.deepEqual(item.system[key],value,item.name+" · "+key);
    assert.equal(item.system.reload ?? 0,0,item.name);
    assert.equal(item.system.power ?? 0,0,item.name);
    assert.equal(item.system.tags.includes("canonical-profile"),true,item.name);
  }
});

test("CAT-09 conserva sus seis perfiles canónicos tras expansiones posteriores",()=>{
  const catalog=weaponCatalogMaster();
  const canonical=catalog.filter((entry)=>entry.status==="canonical");
  const pending=catalog.filter((entry)=>entry.promotion==="pending-audit");
  assert.ok(canonical.length>=26);
  assert.ok(pending.length<=47);
  assert.equal(WEAPON_CATALOG_COUNTS.total,244);
  assert.ok(WEAPON_CATALOG_COUNTS.canonical>=26);
  assert.ok(PENDING_WEAPON_COUNTS.total<=47);

  for(const name of Object.keys(expected)){
    const row=canonical.find((entry)=>entry.name===name);
    assert.ok(row,name);
    assert.equal(row.referenceProfile,name,name);
    assert.equal(row.mechanics.damage,expected[name].damage,name);
    assert.equal(pendingWeaponBlocker(name),"",name);
  }
});

test("CAT-09 conserva sus perfiles dentro de un Compendio de al menos 197 armas",()=>{
  const weapons=coreCatalog().filter((entry)=>entry.type==="weapon");
  assert.ok(weapons.length>=197);
  for(const name of Object.keys(expected)){
    const item=weapons.find((entry)=>entry.name===name);
    assert.ok(item,name);
    assert.equal(item.system.tags.includes("cat-09"),true,name);
  }
});

test("CAT-09 queda consolidado en el Manual Maestro",()=>{
  const manual=fs.readFileSync(new URL("../docs/Tierra_Magica_Manual_Maestro.md",import.meta.url),"utf8");
  for(const name of Object.keys(expected)) assert.equal(manual.includes("| "+name+" |"),true,name);
  assert.match(manual,/\*\*Proyectil\*\*/);
  assert.match(manual,/\*\*Arrojadiza\*\*/);
  assert.match(manual,/### Proyectiles convencionales/);
  assert.match(manual,/Armas a Distancia/);
});
