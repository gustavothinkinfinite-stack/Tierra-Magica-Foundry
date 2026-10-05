import assert from "node:assert/strict";
import test from "node:test";
import { weaponCatalogMaster } from "../scripts/catalog/weapon-catalog-master.mjs";
import {
  PENDING_WEAPON_BLOCKERS,
  PENDING_WEAPON_COUNTS,
  pendingWeaponBlocker,
  pendingWeaponCatalog
} from "../scripts/catalog/weapon-catalog-pending.mjs";

test("CAT-08/09/10 mantiene clasificadas las 44 propuestas todavía pendientes",()=>{
  assert.equal(PENDING_WEAPON_COUNTS.total,44);
  assert.deepEqual(
    {
      thrown:PENDING_WEAPON_COUNTS["thrown-routing"],
      spread:PENDING_WEAPON_COUNTS["multi-shot-or-spread"],
      material:PENDING_WEAPON_COUNTS["special-material"],
      craft:PENDING_WEAPON_COUNTS["craft-device-boundary"]
    },
    { thrown:7, spread:10, material:2, craft:25 }
  );

  const pending=weaponCatalogMaster().filter((entry)=>entry.promotion==="pending-audit");
  assert.equal(pending.length,44);
  assert.equal(pending.every((entry)=>Boolean(entry.blocker)),true);
  assert.equal(new Set(pending.map((entry)=>entry.name)).size,44);
});

test("CAT-08 no clasifica como pendiente ninguna de las 171 variantes aprobadas",()=>{
  const catalog=weaponCatalogMaster();
  const approved=catalog.filter((entry)=>entry.promotion==="approved-profile-variant");
  assert.equal(approved.length,171);
  assert.equal(approved.every((entry)=>entry.blocker===""),true);

  const pendingNames=new Set(pendingWeaponCatalog().map((entry)=>entry.name));
  assert.equal(approved.some((entry)=>pendingNames.has(entry.name)),false);
});

test("CAT-08 registra coordinación con la autoridad de crafting sólo donde corresponde",()=>{
  const pending=pendingWeaponCatalog();
  const craft=pending.filter((entry)=>entry.requiresCraftingCoordination);
  assert.equal(craft.length,27);
  assert.equal(craft.every((entry)=>["special-material","craft-device-boundary"].includes(entry.blocker)),true);

  assert.equal(pendingWeaponBlocker("Pistola de acumulador"),"craft-device-boundary");
  assert.equal(pendingWeaponBlocker("Cuchillo de Vidrio"),"special-material");
  assert.equal(pendingWeaponBlocker("Daga de lanzamiento"),"thrown-routing");
  assert.equal(pendingWeaponBlocker("Honda"),"");
});

test("CAT-08 no duplica un nombre entre bloqueadores",()=>{
  const names=Object.values(PENDING_WEAPON_BLOCKERS).flat();
  assert.equal(names.length,44);
  assert.equal(new Set(names).size,44);
});
