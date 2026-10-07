import assert from "node:assert/strict";
import test from "node:test";
import { offensiveSpellNeedsTargets, resolveSpellImpacts, spellImpact, spellAreaKind, spellTargetMode, uniqueSpellTargets, validateSpellTargets } from "../scripts/rules/spell-impact.mjs";

test("Penetración reduce Protección pero nunca la vuelve negativa", () => {
  const impact=spellImpact({damage:8, penetration:3, protection:5, severeThreshold:6});
  assert.equal(impact.base,8);
  assert.equal(impact.effectiveProtection,2);
  assert.equal(impact.damage,6);
  assert.equal(impact.damageType,"arcane");
  assert.equal(impact.damageMode,"lethal");
  assert.equal(impact.severe,true);
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


test("impacto mágico aplica Piel Alterada sólo cuando el contexto confirma compatibilidad", () => {
  const spell={type:"spell",system:{damage:5,penetration:0}};
  const target={id:"A",system:{derived:{
    protection:1,
    severeThreshold:9,
    contextual:{protection:[{value:2,context:"alteredSkinCompatible",stacking:"max-with-armor"}]},
    breakdowns:{protection:{contributions:[{value:1,equipmentType:"armor"}]}}
  }}};
  assert.equal(resolveSpellImpacts(spell,[target])[0].protection,1);
  assert.equal(resolveSpellImpacts(spell,[target],{protectionContext:{alteredSkinCompatible:true}})[0].protection,2);
});


test("objetivo múltiple no se convierte en área y respeta maxTargets", () => {
  const spell={type:"spell",system:{damage:0,requiresTarget:true,targetMode:"multiple",maxTargets:3}};
  const a={id:"A"},b={id:"B"},c={id:"C"},d={id:"D"};
  assert.equal(spellTargetMode(spell),"multiple");
  assert.equal(spellAreaKind(spell),"single");
  assert.equal(validateSpellTargets(spell,[a,b,c]).ok,true);
  const tooMany=validateSpellTargets(spell,[a,b,c,d]);
  assert.equal(tooMany.reason,"too-many-targets");
  assert.equal(tooMany.maxTargets,3);
});

test("hechizo beneficioso puede exigir objetivo antes de gastar recursos", () => {
  const spell={type:"spell",system:{damage:0,defense:"df",requiresTarget:true,targetMode:"single"}};
  assert.equal(offensiveSpellNeedsTargets(spell),false);
  assert.equal(validateSpellTargets(spell,[]).reason,"target-required");
});

test("hechizo personal rechaza selección externa", () => {
  const spell={type:"spell",system:{targetMode:"self"}};
  assert.equal(validateSpellTargets(spell,[]).ok,true);
  assert.equal(validateSpellTargets(spell,[{id:"A"}]).reason,"self-target");
});


test("hechizo aplica resistencia del tipo y respeta inmunidad", () => {
  const resistant={id:"R",system:{derived:{protection:1,severeThreshold:9,damageTraits:{resistances:{fire:2},immunities:[],vulnerabilities:{}}}}};
  const immune={id:"I",system:{derived:{protection:1,severeThreshold:9,damageTraits:{resistances:{},immunities:["fire"],vulnerabilities:{}}}}};
  const spell={type:"spell",system:{damage:7,penetration:1,damageType:"fire",damageMode:"lethal"}};
  assert.equal(resolveSpellImpacts(spell,[resistant])[0].damage,5);
  const result=resolveSpellImpacts(spell,[immune])[0];
  assert.equal(result.damage,0);
  assert.equal(result.immune,true);
});
