import assert from "node:assert/strict";
import test from "node:test";
import { STARTER_CONTENT } from "../scripts/content.mjs";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import {
  APPROVED_RANGED_VARIANTS,
  approvedRangedVariantSources
} from "../scripts/catalog/weapon-variants-ranged-approved.mjs";

const canonical=new Map(STARTER_CONTENT.weapon.map((entry)=>[entry.name,entry]));
const fields=["skill","attackAttribute","damageAttribute","damage","penetration","strengthMin","rangeOptimal","reload","power","priceCopper","properties"];

test("CAT-06 aprueba exactamente 44 variantes a distancia",()=>{
  const variants=approvedRangedVariantSources();
  assert.equal(variants.length,44);
  assert.equal(Object.keys(APPROVED_RANGED_VARIANTS).length,44);

  for(const item of variants){
    const profile=canonical.get(APPROVED_RANGED_VARIANTS[item.name]);
    assert.ok(profile,item.name);
    for(const field of fields){
      assert.deepEqual(item.system[field] ?? null,profile.system[field] ?? null,item.name+" · "+field);
    }
  }
});

test("CAT-06 conserva sus 44 variantes dentro del catálogo runtime",()=>{
  const weapons=coreCatalog().filter((entry)=>entry.type==="weapon");
  assert.ok(weapons.length>=164,"CAT-06: una expansión posterior no debe eliminar armas ya integradas");

  for(const name of Object.keys(APPROVED_RANGED_VARIANTS)){
    const item=weapons.find((entry)=>entry.name===name);
    assert.ok(item,name);
    assert.equal(item.system.tags.includes("cat-06"),true,name);
  }
});

test("CAT-06 mantiene bloqueadas sólo las variantes a distancia cuya mecánica sigue inexistente",()=>{
  const weapons=new Set(coreCatalog().filter((entry)=>entry.type==="weapon").map((entry)=>entry.name));
  for(const name of [
    "Ballesta repetidora","Ballesta doble",
    "Pistola de dos cañones","Pistola de cuatro cañones",
    "Rifle de dos cañones","Trabuco","Trabuco de abordaje","Escopeta temprana","Escopeta de dos cañones"
  ]){
    assert.equal(weapons.has(name),false,name);
  }
});
