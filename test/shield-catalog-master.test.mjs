import assert from "node:assert/strict";
import test from "node:test";
import { STARTER_CONTENT } from "../scripts/content.mjs";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import {
  APPROVED_SHIELD_VARIANTS,
  approvedShieldVariantSources
} from "../scripts/catalog/shield-variants-approved.mjs";
import {
  SHIELD_CATALOG_COUNTS,
  PENDING_SHIELD_PROPOSALS,
  shieldCatalogMaster
} from "../scripts/catalog/shield-catalog-master.mjs";
import { normalizeSlug } from "../scripts/rules/identity.mjs";

const canonical=new Map(STARTER_CONTENT.shield.map((entry)=>[entry.name,entry]));
const fields=["passiveDefense","block","strengthMin","frontalOnly","movementPenalty","priceCopper","priceQuantity","priceStatus","properties"];

test("ESC-01 crea un catálogo maestro de 60 escudos",()=>{
  assert.deepEqual(SHIELD_CATALOG_COUNTS,{
    canonical:3,
    approvedVariants:51,
    pending:6,
    total:60
  });

  const catalog=shieldCatalogMaster();
  assert.equal(catalog.length,60);
  assert.equal(catalog.filter((entry)=>entry.status==="canonical").length,3);
  assert.equal(catalog.filter((entry)=>entry.promotion==="approved-profile-variant").length,51);
  assert.equal(catalog.filter((entry)=>entry.promotion==="pending-audit").length,6);

  const slugs=catalog.map((entry)=>normalizeSlug(entry.name));
  assert.equal(new Set(slugs).size,60);
});

test("ESC-01 las 51 variantes conservan exactamente el perfil canónico asignado",()=>{
  const variants=approvedShieldVariantSources();
  assert.equal(variants.length,51);

  for(const item of variants){
    const config=APPROVED_SHIELD_VARIANTS[item.name];
    const profile=canonical.get(config.profile);
    assert.ok(profile,item.name+" -> "+config.profile);

    for(const field of fields){
      assert.deepEqual(item.system[field] ?? null,profile.system[field] ?? null,item.name+" · "+field);
    }

    assert.equal(item.system.catalogProfile,config.profile,item.name);
    assert.equal(item.system.tags.includes("shield-catalog"),true,item.name);
  }
});

test("ESC-01 integra 54 escudos runtime y mantiene seis especiales fuera",()=>{
  const shields=coreCatalog().filter((entry)=>entry.type==="shield");
  assert.equal(shields.length,54);

  for(const name of Object.keys(APPROVED_SHIELD_VARIANTS)){
    assert.ok(shields.find((entry)=>entry.name===name),name);
  }

  for(const name of Object.keys(PENDING_SHIELD_PROPOSALS)){
    assert.equal(shields.some((entry)=>entry.name===name),false,name);
  }
});

test("ESC-01 conserva las fronteras de Broquel, estándar y pesado",()=>{
  const sources=new Map(approvedShieldVariantSources().map((entry)=>[entry.name,entry]));

  const buckler=sources.get("Broquel de duelo");
  assert.equal(buckler.system.passiveDefense,1);
  assert.equal(buckler.system.block,0);
  assert.equal(buckler.system.movementPenalty ?? 0,0);

  const standard=sources.get("Escudo cometa");
  assert.equal(standard.system.passiveDefense,1);
  assert.equal(standard.system.block,2);
  assert.equal(standard.system.frontalOnly,true);
  assert.equal(standard.system.movementPenalty ?? 0,0);

  const heavy=sources.get("Pavés");
  assert.equal(heavy.system.passiveDefense,2);
  assert.equal(heavy.system.block,2);
  assert.equal(heavy.system.strengthMin,2);
  assert.equal(heavy.system.frontalOnly,true);
  assert.equal(heavy.system.movementPenalty,-1);

  assert.equal("cover" in heavy.system,false);
  assert.equal("totalCover" in heavy.system,false);
});

test("ESC-01 incorpora 18 variantes regionales, tres por cada región principal",()=>{
  const regional=approvedShieldVariantSources().filter((entry)=>entry.system.catalogRegion!=="general");
  assert.equal(regional.length,18);

  const counts={};
  for(const item of regional) counts[item.system.catalogRegion]=(counts[item.system.catalogRegion] ?? 0)+1;
  assert.deepEqual(counts,{
    Valdoria:3,
    Kharum:3,
    "Liga de Bronce":3,
    Erelia:3,
    Lysendra:3,
    Solenar:3
  });
});

test("ESC-01 reserva materiales y tecnología para CRAFT-13",()=>{
  const pending=shieldCatalogMaster().filter((entry)=>entry.promotion==="pending-audit");
  assert.equal(pending.filter((entry)=>entry.blocker==="special-material").length,3);
  assert.equal(pending.filter((entry)=>entry.blocker==="craft-device-boundary").length,3);
  assert.equal(pending.every((entry)=>entry.mechanics===null),true);
});
