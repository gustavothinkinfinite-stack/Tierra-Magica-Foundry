import assert from "node:assert/strict";
import test from "node:test";
import { coreCatalog } from "../scripts/catalog/core-catalog.mjs";
import {
  MULTISHOT_SPREAD_DESIGN_PROPOSALS,
  MULTISHOT_SPREAD_POLICY
} from "../scripts/catalog/weapon-multishot-spread-proposals.mjs";
import {
  PENDING_WEAPON_BLOCKERS,
  pendingWeaponBlocker
} from "../scripts/catalog/weapon-catalog-pending.mjs";

test("CAT-11 estructura exactamente las 10 armas multicañón/dispersión",()=>{
  const names=Object.keys(MULTISHOT_SPREAD_DESIGN_PROPOSALS);
  assert.equal(names.length,10);
  assert.deepEqual(
    [...names].sort(),
    [...PENDING_WEAPON_BLOCKERS["multi-shot-or-spread"]].sort()
  );
  assert.equal(MULTISHOT_SPREAD_POLICY.status,"design-only");
  assert.equal(MULTISHOT_SPREAD_POLICY.runtime,false);
});

test("CAT-11 mantiene las diez entradas fuera del Compendio runtime",()=>{
  const runtimeNames=new Set(coreCatalog().filter((entry)=>entry.type==="weapon").map((entry)=>entry.name));
  for(const name of Object.keys(MULTISHOT_SPREAD_DESIGN_PROPOSALS)){
    assert.equal(runtimeNames.has(name),false,name);
    assert.equal(pendingWeaponBlocker(name),"multi-shot-or-spread",name);
  }
});

test("CAT-11 todos los candidatos explicitan decisiones mecánicas pendientes",()=>{
  for(const [name,entry] of Object.entries(MULTISHOT_SPREAD_DESIGN_PROPOSALS)){
    assert.ok(entry.candidate,name);
    assert.equal(entry.candidate.skill,"rangedWeapons",name);
    assert.ok(Number.isFinite(entry.candidate.damage),name);
    assert.ok(Number.isFinite(entry.candidate.rangeOptimal),name);
    assert.ok(Array.isArray(entry.unresolved) && entry.unresolved.length>0,name);
  }
});

test("CAT-11 no convierte varios cañones ni dispersión en ataques o áreas implícitas",()=>{
  const policy=MULTISHOT_SPREAD_POLICY.rules.join(" ");
  assert.match(policy,/nunca obtiene varios ataques/);
  assert.match(policy,/no puede convertirse en área/);
  assert.match(policy,/requieren estado de carga/);
});
