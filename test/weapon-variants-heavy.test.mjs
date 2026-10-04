import assert from "node:assert/strict";
import test from "node:test";
import { STARTER_CONTENT } from "../scripts/content.mjs";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import {
  APPROVED_HEAVY_VARIANTS,
  approvedHeavyVariantSources
} from "../scripts/catalog/weapon-variants-heavy-approved.mjs";

const canonical=new Map(STARTER_CONTENT.weapon.map((entry)=>[entry.name,entry]));
const fields=["skill","attackAttribute","damageAttribute","damage","penetration","strengthMin","rangeOptimal","reload","power","priceCopper","properties"];

test("CAT-05 aprueba exactamente 30 variantes pesadas",()=>{
  const variants=approvedHeavyVariantSources();
  assert.equal(variants.length,30);
  assert.equal(Object.keys(APPROVED_HEAVY_VARIANTS).length,30);

  for(const item of variants){
    const profile=canonical.get(APPROVED_HEAVY_VARIANTS[item.name]);
    assert.ok(profile,item.name);
    for(const field of fields){
      assert.deepEqual(item.system[field] ?? null,profile.system[field] ?? null,item.name+" · "+field);
    }
  }
});

test("CAT-05 integra las variantes pesadas y eleva las armas runtime a 120",()=>{
  const weapons=coreCatalog().filter((entry)=>entry.type==="weapon");
  assert.equal(weapons.length,120);

  for(const name of Object.keys(APPROVED_HEAVY_VARIANTS)){
    const item=weapons.find((entry)=>entry.name===name);
    assert.ok(item,name);
    assert.equal(item.system.tags.includes("cat-05"),true,name);
  }
});
