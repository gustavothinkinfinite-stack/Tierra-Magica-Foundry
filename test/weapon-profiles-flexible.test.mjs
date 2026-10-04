import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import {
  APPROVED_FLEXIBLE_PROFILES,
  approvedFlexibleProfileSources
} from "../scripts/catalog/weapon-profiles-flexible-approved.mjs";
import { weaponCatalogMaster, WEAPON_CATALOG_COUNTS } from "../scripts/catalog/weapon-catalog-master.mjs";
import { PENDING_WEAPON_COUNTS, pendingWeaponBlocker } from "../scripts/catalog/weapon-catalog-pending.mjs";

const expected=Object.freeze({
  "Cadena corta de combate":{damage:4,penetration:0,strengthMin:0,priceCopper:100,properties:"Flexible, Impactante"},
  "Látigo":{damage:2,penetration:0,strengthMin:0,priceCopper:50,properties:"Flexible"},
  "Látigo reforzado":{damage:3,penetration:0,strengthMin:0,priceCopper:100,properties:"Flexible, Impactante"}
});

test("CAT-10 define exactamente tres perfiles canónicos flexibles",()=>{
  assert.equal(Object.keys(APPROVED_FLEXIBLE_PROFILES).length,3);
  const sources=approvedFlexibleProfileSources();
  assert.equal(sources.length,3);
  for(const item of sources){
    const e=expected[item.name];
    assert.ok(e,item.name);
    assert.equal(item.system.skill,"lightWeapons",item.name);
    assert.equal(item.system.attackAttribute,"agi",item.name);
    assert.equal(item.system.damageAttribute,"fue",item.name);
    for(const [key,value] of Object.entries(e)) assert.deepEqual(item.system[key],value,item.name+" · "+key);
    assert.equal(/Alcance/i.test(item.system.properties),false,item.name);
    assert.equal(item.system.tags.includes("canonical-profile"),true,item.name);
  }
});

test("CAT-10 deja 29 perfiles canónicos, 200 armas runtime y 44 pendientes",()=>{
  const catalog=weaponCatalogMaster();
  assert.equal(catalog.filter((entry)=>entry.status==="canonical").length,29);
  assert.equal(catalog.filter((entry)=>entry.promotion==="pending-audit").length,44);
  assert.deepEqual(WEAPON_CATALOG_COUNTS,{canonical:29,proposed:215,total:244});
  assert.equal(PENDING_WEAPON_COUNTS.total,44);

  const weapons=coreCatalog().filter((entry)=>entry.type==="weapon");
  assert.equal(weapons.length,200);
  for(const name of Object.keys(expected)){
    assert.ok(weapons.find((entry)=>entry.name===name),name);
    assert.equal(pendingWeaponBlocker(name),"",name);
  }
});

test("CAT-10 Flexible no concede Alcance ni bonus automático de maniobra",()=>{
  const manual=fs.readFileSync(new URL("../docs/Tierra_Magica_Manual_Maestro.md",import.meta.url),"utf8");
  assert.match(manual,/\*\*Flexible\*\*/);
  assert.match(manual,/Flexible no equivale a Alcance/);
  assert.match(manual,/no concede Ventaja, modificadores, alcance extra/);
  for(const name of Object.keys(expected)) assert.equal(manual.includes("| "+name+" |"),true,name);
});
