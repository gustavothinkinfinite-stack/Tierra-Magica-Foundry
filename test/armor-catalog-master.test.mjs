import assert from "node:assert/strict";
import test from "node:test";
import { STARTER_CONTENT } from "../scripts/content.mjs";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import {
  APPROVED_ARMOR_VARIANTS,
  approvedArmorVariantSources
} from "../scripts/catalog/armor-variants-approved.mjs";
import {
  ARMOR_CATALOG_COUNTS,
  PENDING_ARMOR_PROPOSALS,
  armorCatalogMaster
} from "../scripts/catalog/armor-catalog-master.mjs";
import { normalizeSlug } from "../scripts/rules/identity.mjs";

const canonical=new Map(STARTER_CONTENT.armor.map((entry)=>[entry.name,entry]));
const mechanicalFields=["protection","strengthMin","priceCopper","priceQuantity","priceStatus"];

test("ARM-01 crea un catálogo maestro de 100 armaduras",()=>{
  assert.deepEqual(ARMOR_CATALOG_COUNTS,{
    canonical:5,
    approvedVariants:89,
    pending:6,
    total:100
  });

  const catalog=armorCatalogMaster();
  assert.equal(catalog.length,100);
  assert.equal(catalog.filter((entry)=>entry.status==="canonical").length,5);
  assert.equal(catalog.filter((entry)=>entry.promotion==="approved-profile-variant").length,89);
  assert.equal(catalog.filter((entry)=>entry.promotion==="pending-audit").length,6);

  const slugs=catalog.map((entry)=>normalizeSlug(entry.name));
  assert.equal(new Set(slugs).size,100);
});

test("ARM-01 las 89 variantes aprobadas conservan exactamente su perfil canónico",()=>{
  const variants=approvedArmorVariantSources();
  assert.equal(variants.length,89);
  assert.equal(Object.keys(APPROVED_ARMOR_VARIANTS).length,89);

  for(const item of variants){
    const config=APPROVED_ARMOR_VARIANTS[item.name];
    const profile=canonical.get(config.profile);
    assert.ok(profile,item.name+" -> "+config.profile);

    for(const field of mechanicalFields){
      assert.deepEqual(item.system[field] ?? null,profile.system[field] ?? null,item.name+" · "+field);
    }

    assert.equal(item.system.tags.includes("armor-catalog"),true,item.name);
    assert.equal(item.system.catalogProfile,config.profile,item.name);
  }
});

test("ARM-01 integra 94 armaduras runtime y bloquea las seis especiales",()=>{
  const armors=coreCatalog().filter((entry)=>entry.type==="armor");
  assert.equal(armors.length,94);

  for(const name of Object.keys(APPROVED_ARMOR_VARIANTS)){
    assert.ok(armors.find((entry)=>entry.name===name),name);
  }

  for(const name of Object.keys(PENDING_ARMOR_PROPOSALS)){
    assert.equal(armors.some((entry)=>entry.name===name),false,name);
  }
});

test("ARM-01 incorpora 24 variantes regionales, cuatro por cada región principal",()=>{
  const regional=approvedArmorVariantSources().filter((entry)=>entry.system.catalogRegion!=="general");
  assert.equal(regional.length,24);

  const counts={};
  for(const item of regional) counts[item.system.catalogRegion]=(counts[item.system.catalogRegion] ?? 0)+1;
  assert.deepEqual(counts,{
    Valdoria:4,
    Kharum:4,
    "Liga de Bronce":4,
    Erelia:4,
    Lysendra:4,
    Solenar:4
  });
});

test("ARM-01 reserva materiales especiales y tecnología para CRAFT-13",()=>{
  const pending=armorCatalogMaster().filter((entry)=>entry.promotion==="pending-audit");
  assert.equal(pending.filter((entry)=>entry.blocker==="special-material").length,3);
  assert.equal(pending.filter((entry)=>entry.blocker==="craft-device-boundary").length,3);
  assert.equal(pending.every((entry)=>entry.mechanics===null),true);
});
