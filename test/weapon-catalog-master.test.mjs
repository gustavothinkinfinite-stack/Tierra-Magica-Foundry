import assert from "node:assert/strict";
import test from "node:test";
import { STARTER_CONTENT } from "../scripts/content.mjs";
import {
  WEAPON_CATALOG_COUNTS,
  weaponCatalogMaster
} from "../scripts/catalog/weapon-catalog-master.mjs";
import { normalizeSlug } from "../scripts/rules/identity.mjs";

test("catálogo maestro conserva exactamente las 20 armas canónicas",()=>{
  const catalog=weaponCatalogMaster();
  const canonical=catalog.filter((entry)=>entry.status==="canonical");
  assert.equal(canonical.length,20);
  assert.equal(WEAPON_CATALOG_COUNTS.canonical,20);
  assert.deepEqual(
    canonical.map((entry)=>entry.name).sort(),
    STARTER_CONTENT.weapon.map((entry)=>entry.name).sort()
  );

  for(const row of canonical){
    const source=STARTER_CONTENT.weapon.find((entry)=>entry.name===row.name);
    assert.ok(source,row.name);
    assert.equal(row.skillSuggestion,source.system.skill,row.name);
    assert.equal(row.mechanics.damage,source.system.damage,row.name);
    assert.equal(row.mechanics.penetration,source.system.penetration,row.name);
    assert.equal(row.mechanics.priceCopper,source.system.priceCopper,row.name);
    assert.equal(row.mechanics.properties,source.system.properties ?? "",row.name);
  }
});

test("catálogo maestro añade 224 propuestas sin convertirlas en reglas",()=>{
  const catalog=weaponCatalogMaster();
  const proposed=catalog.filter((entry)=>entry.status==="proposal");
  assert.equal(proposed.length,224);
  assert.equal(WEAPON_CATALOG_COUNTS.proposed,224);
  assert.equal(WEAPON_CATALOG_COUNTS.total,244);
  assert.equal(catalog.length,244);
  assert.equal(proposed.every((entry)=>entry.mechanics===null),true);
});

test("todas las propuestas usan identidad única y perfil canónico de referencia",()=>{
  const catalog=weaponCatalogMaster();
  const slugs=catalog.map((entry)=>normalizeSlug(entry.name));
  assert.equal(new Set(slugs).size,catalog.length);

  const canonicalNames=new Set(
    catalog.filter((entry)=>entry.status==="canonical").map((entry)=>entry.name)
  );
  for(const row of catalog.filter((entry)=>entry.status==="proposal")){
    assert.equal(canonicalNames.has(row.referenceProfile),true,row.name+" -> "+row.referenceProfile);
    assert.ok(row.skillSuggestion,row.name);
    assert.ok(row.specializationSuggestion,row.name);
  }
});

test("armas regionales declaran procedencia y las arcano-industriales quedan en frontera de revisión",()=>{
  const catalog=weaponCatalogMaster();
  const regional=catalog.filter((entry)=>entry.status==="proposal" && entry.region!=="general");
  assert.equal(regional.length,30);
  assert.equal(regional.every((entry)=>entry.region && entry.region!=="general"),true);

  const arcano=catalog.filter((entry)=>entry.status==="proposal" && entry.technology==="arcano-industrial");
  assert.ok(arcano.length>=20);
  assert.equal(arcano.every((entry)=>entry.implementation==="review-device-boundary"),true);
  assert.equal(arcano.every((entry)=>entry.reviewFlags.includes("energy-model") || ["Pistola arcano-industrial","Pistola de cristal","Pistola de descarga","Rifle arcano-industrial","Fusil de cristal"].includes(entry.name)),true);
});


test("CAT-02 marca exactamente 22 propuestas como variantes de perfil aprobadas",()=>{
  const catalog=weaponCatalogMaster();
  const approved=catalog.filter((entry)=>entry.promotion==="approved-profile-variant");
  assert.equal(approved.length,22);
  assert.equal(approved.every((entry)=>entry.implementation==="runtime-profile-variant"),true);
  assert.equal(approved.every((entry)=>entry.reviewFlags.length===0),true);
});
