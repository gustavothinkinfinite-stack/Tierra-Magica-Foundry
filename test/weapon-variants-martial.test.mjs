import assert from "node:assert/strict";
import test from "node:test";
import { STARTER_CONTENT } from "../scripts/content.mjs";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import {
  APPROVED_MARTIAL_VARIANTS,
  approvedMartialVariantSources
} from "../scripts/catalog/weapon-variants-martial-approved.mjs";

const canonical=new Map(STARTER_CONTENT.weapon.map((entry)=>[entry.name,entry]));
const fields=["skill","attackAttribute","damageAttribute","damage","penetration","strengthMin","rangeOptimal","reload","power","priceCopper","properties"];

test("CAT-04 aprueba exactamente 40 variantes marciales",()=>{
  const variants=approvedMartialVariantSources();
  assert.equal(variants.length,40);
  assert.equal(Object.keys(APPROVED_MARTIAL_VARIANTS).length,40);
  for(const item of variants){
    const profile=canonical.get(APPROVED_MARTIAL_VARIANTS[item.name]);
    assert.ok(profile,item.name);
    for(const field of fields){
      assert.deepEqual(item.system[field] ?? null,profile.system[field] ?? null,item.name+" · "+field);
    }
  }
});

test("CAT-04 integra 40 Items marciales y conserva su lote dentro del catálogo runtime",()=>{
  const weapons=coreCatalog().filter((entry)=>entry.type==="weapon");
  assert.ok(weapons.length>=90,"CAT-04: una expansión posterior no debe eliminar armas ya integradas");
  for(const name of Object.keys(APPROVED_MARTIAL_VARIANTS)){
    const item=weapons.find((entry)=>entry.name===name);
    assert.ok(item,name);
    assert.equal(item.system.tags.includes("cat-04"),true,name);
  }
});
