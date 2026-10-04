import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { APPROVED_WEAPON_PROFILE_VARIANTS } from "../scripts/catalog/weapon-variants-approved.mjs";
import { APPROVED_SPECIAL_LIGHT_VARIANTS } from "../scripts/catalog/weapon-variants-special-light-approved.mjs";
import { APPROVED_MARTIAL_VARIANTS } from "../scripts/catalog/weapon-variants-martial-approved.mjs";
import { APPROVED_HEAVY_VARIANTS } from "../scripts/catalog/weapon-variants-heavy-approved.mjs";
import { APPROVED_RANGED_VARIANTS } from "../scripts/catalog/weapon-variants-ranged-approved.mjs";
import { APPROVED_REGIONAL_VARIANTS } from "../scripts/catalog/weapon-variants-regional-approved.mjs";
import { APPROVED_ARMOR_VARIANTS } from "../scripts/catalog/armor-variants-approved.mjs";
import { PENDING_ARMOR_PROPOSALS } from "../scripts/catalog/armor-catalog-master.mjs";
import { APPROVED_SHIELD_VARIANTS } from "../scripts/catalog/shield-variants-approved.mjs";
import { PENDING_SHIELD_PROPOSALS } from "../scripts/catalog/shield-catalog-master.mjs";
import { CANONICAL_EQUIPMENT } from "../scripts/catalog/equipment-canonical.mjs";
import {
  EQUIPMENT_MUNDANE_GROUPS,
  PENDING_EQUIPMENT_SPECIAL
} from "../scripts/catalog/equipment-catalog-master.mjs";

const manual=fs.readFileSync(new URL("../docs/Tierra_Magica_Manual_Maestro.md",import.meta.url),"utf8");

const approvedWeapons={
  ...APPROVED_WEAPON_PROFILE_VARIANTS,
  ...APPROVED_SPECIAL_LIGHT_VARIANTS,
  ...APPROVED_MARTIAL_VARIANTS,
  ...APPROVED_HEAVY_VARIANTS,
  ...APPROVED_RANGED_VARIANTS,
  ...Object.fromEntries(Object.entries(APPROVED_REGIONAL_VARIANTS).map(([name,value])=>[name,value.profile]))
};

test("DOC-CAT-01 el Manual lista las 171 variantes de arma aprobadas",()=>{
  assert.equal(Object.keys(approvedWeapons).length,171);
  assert.match(manual,/### Catálogo ampliado aprobado de armas/);
  assert.match(manual,/\*\*171 variantes de perfil aprobadas\*\*/);
  for(const name of Object.keys(approvedWeapons)){
    assert.equal(manual.includes(name),true,name);
  }
});

test("DOC-CAT-01 el Manual lista las 89 armaduras aprobadas y separa las seis pendientes",()=>{
  assert.equal(Object.keys(APPROVED_ARMOR_VARIANTS).length,89);
  assert.match(manual,/### Catálogo ampliado aprobado de armaduras/);
  assert.match(manual,/\*\*89 variantes aprobadas\*\*/);
  for(const name of Object.keys(APPROVED_ARMOR_VARIANTS)) assert.equal(manual.includes(name),true,name);
  for(const name of Object.keys(PENDING_ARMOR_PROPOSALS)) assert.equal(manual.includes(name),true,name);
  assert.match(manual,/\*\*No canónicas todavía:\*\*/);
});

test("DOC-CAT-01 el Manual lista los 51 escudos aprobados y sus seis reservas",()=>{
  assert.equal(Object.keys(APPROVED_SHIELD_VARIANTS).length,51);
  assert.match(manual,/### Catálogo ampliado aprobado de escudos/);
  assert.match(manual,/\*\*51 variantes aprobadas\*\*/);
  for(const name of Object.keys(APPROVED_SHIELD_VARIANTS)) assert.equal(manual.includes(name),true,name);
  for(const name of Object.keys(PENDING_SHIELD_PROPOSALS)) assert.equal(manual.includes(name),true,name);
  assert.match(manual,/Pavés.*Escudo torre/s);
  assert.match(manual,/no generan cobertura total por el nombre del Item/);
});

test("DOC-CAT-01 el Manual refleja EQP-01 sin canonizar las 75 propuestas",()=>{
  assert.equal(CANONICAL_EQUIPMENT.length,25);
  const mundane=EQUIPMENT_MUNDANE_GROUPS.flatMap((group)=>group.names);
  assert.equal(mundane.length,65);
  assert.equal(Object.keys(PENDING_EQUIPMENT_SPECIAL).length,10);

  assert.match(manual,/### Estado del catálogo EQP-01/);
  assert.match(manual,/\*\*25 objetos\*\*/);
  assert.match(manual,/\*\*75 propuestas que todavía no son equipo canónico\*\*/);

  for(const item of CANONICAL_EQUIPMENT) assert.equal(manual.includes(item.name),true,item.name);
  for(const name of mundane) assert.equal(manual.includes(name),true,name);
  for(const name of Object.keys(PENDING_EQUIPMENT_SPECIAL)) assert.equal(manual.includes(name),true,name);
});

test("DOC-CAT-01 conserva explícitos los límites contra bonos inferidos",()=>{
  assert.match(manual,/El nombre histórico, cultural, regional o funcional \*\*no crea un modificador adicional\*\*/);
  assert.match(manual,/La procedencia regional no modifica Protección/);
  assert.match(manual,/La forma, nombre o procedencia no concede Defensa pasiva adicional/);
  assert.match(manual,/Las propuestas mundanas anteriores no tienen precio oficial todavía/);
});
