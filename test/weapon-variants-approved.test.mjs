import assert from "node:assert/strict";
import test from "node:test";
import { STARTER_CONTENT } from "../scripts/content.mjs";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import {
  APPROVED_WEAPON_PROFILE_VARIANTS,
  approvedWeaponVariantSources
} from "../scripts/catalog/weapon-variants-approved.mjs";

const mechanicalFields=[
  "skill","attackAttribute","damageAttribute","damage","penetration","strengthMin",
  "rangeOptimal","reload","power","priceCopper","priceQuantity","priceStatus",
  "availability","properties"
];

test("CAT-02 integra 22 variantes ligeras como Items reales de Compendio",()=>{
  const variants=approvedWeaponVariantSources();
  assert.equal(variants.length,22);
  assert.equal(Object.keys(APPROVED_WEAPON_PROFILE_VARIANTS).length,22);

  const weapons=coreCatalog().filter((entry)=>entry.type==="weapon");
  assert.equal(weapons.length,42);

  for(const variant of variants){
    const compiled=weapons.find((entry)=>entry.name===variant.name);
    assert.ok(compiled,variant.name);
    assert.equal(compiled.system.tags.includes("catalog-expanded"),true,variant.name);
    assert.equal(compiled.system.tags.includes("profile-variant"),true,variant.name);
    assert.match(compiled.system.description,/Variante de catálogo/);
  }
});

test("CAT-02 cada variante conserva exactamente el perfil mecánico canónico asignado",()=>{
  for(const variant of approvedWeaponVariantSources()){
    const profileName=APPROVED_WEAPON_PROFILE_VARIANTS[variant.name];
    const profile=STARTER_CONTENT.weapon.find((entry)=>entry.name===profileName);
    assert.ok(profile,variant.name+" -> "+profileName);

    for(const field of mechanicalFields){
      assert.deepEqual(
        variant.system[field] ?? null,
        profile.system[field] ?? null,
        variant.name+" · "+field
      );
    }
  }
});

test("CAT-02 no duplica nombres canónicos ni nombres entre variantes",()=>{
  const canonical=new Set(STARTER_CONTENT.weapon.map((entry)=>entry.name));
  const names=approvedWeaponVariantSources().map((entry)=>entry.name);
  assert.equal(new Set(names).size,names.length);
  assert.equal(names.some((name)=>canonical.has(name)),false);
});
