import test from "node:test";
import assert from "node:assert/strict";
import {
  damageTypeRegistry,
  mergeDamageTraits,
  normalizeDamageType,
  parseCustomDamageTypes,
  resolveTypedDamage
} from "../scripts/rules/damage-types.mjs";

test("registro acepta tipos personalizados con IDs estables",()=>{
  assert.equal(normalizeDamageType("Daño Solar"),"dano-solar");
  assert.deepEqual(parseCustomDamageTypes("solar=Solar, vacío=Vacío\nsonico:Sónico"),{
    solar:"Solar",vacio:"Vacío",sonico:"Sónico"
  });
  const registry=damageTypeRegistry("solar=Solar");
  assert.equal(registry.fire,"Fuego");
  assert.equal(registry.solar,"Solar");
});

test("resistencia vulnerabilidad e inmunidad se resuelven por tipo",()=>{
  const traits={resistances:{fire:2},immunities:{toxic:true},vulnerabilities:{cold:3}};
  assert.equal(resolveTypedDamage({damage:7,damageType:"fire",traits}).damage,5);
  assert.equal(resolveTypedDamage({damage:7,damageType:"cold",traits}).damage,10);
  const toxic=resolveTypedDamage({damage:99,damageType:"toxic",traits});
  assert.equal(toxic.damage,0);
  assert.equal(toxic.immune,true);
});

test("fuentes equivalentes usan el valor mayor y no suman resistencias",()=>{
  const merged=mergeDamageTraits(
    {resistances:{fire:1},immunities:{},vulnerabilities:{}},
    {resistances:{fire:3,cold:1},immunities:["divine"],vulnerabilities:{cold:2}}
  );
  assert.deepEqual(merged.resistances,{fire:3,cold:1});
  assert.equal(merged.immunities.includes("divine"),true);
  assert.equal(merged.vulnerabilities.cold,2);
});
