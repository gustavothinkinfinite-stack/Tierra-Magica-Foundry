import assert from "node:assert/strict";
import test from "node:test";
import { offensiveSpellNeedsTargets, resolveSpellImpacts, spellImpact, spellAreaKind, uniqueSpellTargets, validateSpellTargets } from "../scripts/rules/spell-impact.mjs";

test("Penetración reduce Protección pero nunca la vuelve negativa", () => {
  assert.deepEqual(spellImpact({damage:8, penetration:3, protection:5, severeThreshold:6}), {base:8,bonus:0,penetration:3,protection:5,effectiveProtection:2,damage:6,severe:true});
  assert.equal(spellImpact({damage:5, penetration:99, protection:2}).damage, 5);
});

test("daño y protección quedan acotados contra valores corruptos o negativos", () => {
  assert.equal(spellImpact({damage:-10, protection:-4, penetration:-2}).damage, 0);
  assert.equal(spellImpact({damage:"x", bonus:-99, protection:3}).damage, 0);
});

test("Daño Grave se evalúa después de Protección y requiere daño real", () => {
  assert.equal(spellImpact({damage:7, protection:2, severeThreshold:6}).severe, false);
  assert.equal(spellImpact({damage:8, protection:2, severeThreshold:6}).severe, true);
  assert.equal(spellImpact({damage:0, severeThreshold:0}).severe, false);
});

test("áreas no golpean dos veces al mismo actor por tokens duplicados", () => {
  const actor={id:"A",uuid:"Actor.A"}; assert.equal(uniqueSpellTargets([{actor},{actor},actor]).length,1);
});

test("resolución múltiple conserva Protección individual de cada objetivo", () => {
  const item={type:"spell",system:{damage:7,penetration:1}};
  const a={id:"A",system:{derived:{protection:0,severeThreshold:9}}}; const b={id:"B",system:{derived:{protection:4,severeThreshold:9}}};
  assert.deepEqual(resolveSpellImpacts(item,[a,b]).map((x)=>x.damage),[7,4]);
});

test("magia ofensiva u opuesta requiere objetivo; utilidad pura no", () => {
  assert.equal(offensiveSpellNeedsTargets({type:"spell",system:{damage:4,defense:"df"}}),true);
  assert.equal(offensiveSpellNeedsTargets({type:"spell",system:{damage:0,defense:"mental"}}),true);
  assert.equal(offensiveSpellNeedsTargets({type:"spell",system:{damage:0,defense:"df"}}),false);
});

test("hechizo ofensivo no puede resolverse sin objetivo", () => {
  assert.equal(validateSpellTargets({type:"spell",system:{damage:4}},[]).reason,"target-required");
});

test("hechizo sin área rechaza selección múltiple", () => {
  const spell={type:"spell",system:{damage:4,area:""}}; const a={id:"A"},b={id:"B"};
  assert.equal(validateSpellTargets(spell,[a,b]).reason,"single-target");
});

test("área permite múltiples actores pero mantiene deduplicación", () => {
  const spell={type:"spell",system:{damage:4,area:"radio 3 m"}}; const a={id:"A"},b={id:"B"};
  const result=validateSpellTargets(spell,[a,a,b]); assert.equal(result.ok,true); assert.equal(result.targets.length,2); assert.equal(spellAreaKind(spell),"area");
});

test("aliados no se excluyen silenciosamente: solo se bloquean cuando la acción lo pide", () => {
  const caster={id:"C",prototypeToken:{disposition:1}}; const ally={id:"A",prototypeToken:{disposition:1}};
  const spell={type:"spell",system:{damage:4}};
  assert.equal(validateSpellTargets(spell,[ally],{caster}).ok,true);
  assert.equal(validateSpellTargets(spell,[ally],{caster,allowFriendly:false}).reason,"friendly-target");
});
