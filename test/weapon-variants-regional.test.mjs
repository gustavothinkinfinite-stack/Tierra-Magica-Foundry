import assert from "node:assert/strict";
import test from "node:test";
import { STARTER_CONTENT } from "../scripts/content.mjs";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import {
  APPROVED_REGIONAL_VARIANTS,
  approvedRegionalVariantSources
} from "../scripts/catalog/weapon-variants-regional-approved.mjs";

const canonical=new Map(STARTER_CONTENT.weapon.map((entry)=>[entry.name,entry]));
const fields=["skill","attackAttribute","damageAttribute","damage","penetration","strengthMin","rangeOptimal","reload","power","priceCopper","properties"];

test("CAT-07 aprueba exactamente 27 armas regionales",()=>{
  const variants=approvedRegionalVariantSources();
  assert.equal(variants.length,27);
  assert.equal(Object.keys(APPROVED_REGIONAL_VARIANTS).length,27);

  for(const item of variants){
    const config=APPROVED_REGIONAL_VARIANTS[item.name];
    const profile=canonical.get(config.profile);
    assert.ok(profile,item.name);
    assert.equal(item.system.catalogRegion,config.region,item.name);
    assert.equal(item.system.tags.includes("regional"),true,item.name);
    for(const field of fields){
      assert.deepEqual(item.system[field] ?? null,profile.system[field] ?? null,item.name+" · "+field);
    }
  }
});

test("CAT-07 conserva sus regionales y no promueve las tres bloqueadas",()=>{
  const weapons=coreCatalog().filter((entry)=>entry.type==="weapon");
  assert.ok(weapons.length>=191,"CAT-07: una expansión posterior no debe eliminar armas regionales ya integradas");

  for(const name of Object.keys(APPROVED_REGIONAL_VARIANTS)){
    const item=weapons.find((entry)=>entry.name===name);
    assert.ok(item,name);
    assert.equal(item.system.tags.includes("cat-07"),true,name);
  }

  for(const blocked of ["Trabuco portuario","Cuchillo de Vidrio","Lanza de cristal"]){
    assert.equal(weapons.some((entry)=>entry.name===blocked),false,blocked);
  }
});

test("CAT-07 preserva las siete procedencias regionales del inventario maestro",()=>{
  const regions=new Set(approvedRegionalVariantSources().map((entry)=>entry.system.catalogRegion));
  assert.deepEqual(
    [...regions].sort(),
    ["Erelia","Kharum","Liga de Bronce","Lysendra","Solenar","Valdoria"].sort()
  );
});
