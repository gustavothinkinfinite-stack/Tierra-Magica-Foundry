import assert from "node:assert/strict";
import test from "node:test";
import { STARTER_CONTENT } from "../scripts/content.mjs";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import {
  APPROVED_SPECIAL_LIGHT_VARIANTS,
  approvedSpecialLightVariantSources
} from "../scripts/catalog/weapon-variants-special-light-approved.mjs";

const canonical=new Map(STARTER_CONTENT.weapon.map((entry)=>[entry.name,entry]));

test("CAT-03 aprueba 8 variantes ligeras especiales sin mecánicas nuevas",()=>{
  const variants=approvedSpecialLightVariantSources();
  assert.equal(variants.length,8);
  assert.equal(Object.keys(APPROVED_SPECIAL_LIGHT_VARIANTS).length,8);

  for(const item of variants){
    const profile=canonical.get(APPROVED_SPECIAL_LIGHT_VARIANTS[item.name]);
    assert.ok(profile,item.name);
    assert.equal(item.system.damage,profile.system.damage,item.name);
    assert.equal(item.system.penetration,profile.system.penetration,item.name);
    assert.equal(item.system.skill,profile.system.skill,item.name);
    assert.equal(item.system.priceCopper,profile.system.priceCopper,item.name);
    assert.equal(item.system.properties,profile.system.properties,item.name);
    assert.match(item.system.description,/no concede Penetración, Parada, Enganche/);
  }
});

test("CAT-03 integra las 8 variantes en el Compendio runtime",()=>{
  const weapons=coreCatalog().filter((entry)=>entry.type==="weapon");
  for(const name of Object.keys(APPROVED_SPECIAL_LIGHT_VARIANTS)){
    const item=weapons.find((entry)=>entry.name===name);
    assert.ok(item,name);
    assert.equal(item.system.tags.includes("cat-03"),true,name);
  }
});
