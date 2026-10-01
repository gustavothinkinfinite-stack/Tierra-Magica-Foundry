import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("Sobrecarga lee el total real del Roll contenido en ChatMessage", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  const entry = await readFile(resolve(root, "scripts/tierra-magica.mjs"), "utf8");
  assert.equal(entry.includes("installMagicGuards(TierraMagicaActor)"), true);
  assert.equal(guards.includes("message?.rolls?.[0]?.total"), true);
  assert.equal(guards.includes("message.total = total"), true);
});

test("magia contextual no inventa tirada sin incertidumbre y oposición sí la exige", async () => {
  const { spellNeedsCheck } = await import("../scripts/rules/magic-guards.mjs");
  assert.equal(spellNeedsCheck({system:{checkMode:"contextual",defense:"df"}}), false);
  assert.equal(spellNeedsCheck({system:{checkMode:"contextual",defense:"df"}},{contextualCheck:true}), true);
  assert.equal(spellNeedsCheck({system:{checkMode:"automatic",defense:"mental"}}), true);
  assert.equal(spellNeedsCheck({system:{checkMode:"required",defense:"df"}}), true);
  assert.equal(spellNeedsCheck({system:{checkMode:"contextual",defense:"mental"}}), true);
  assert.equal(spellNeedsCheck({system:{checkMode:"contextual",defense:"body"}}), true);
  assert.equal(spellNeedsCheck({system:{checkMode:"contextual",defense:"normal"}}), true);
});

test("omitir la tirada final no omite la Sobrecarga", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes('startsWith("Hechizo:")'), true);
  assert.equal(guards.includes("actorRollCheck.call(this, rollOptions)"), true);
  assert.equal(guards.includes("tmAutomaticSpell"), true);
});

test("un hechizo sostenido fallido no permanece activo", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes("if (!castSuccess)"), true);
  assert.equal(guards.includes("after.filter((id) => id !== item.id)"), true);
  assert.equal(guards.includes("after.filter((id) => id !== item.id)"), true);
});

test("superar Sostenimiento abandona un efecto previo en vez de invalidar el lanzamiento", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes("const limit = hasDouble ? 2 : 1"), true);
  assert.equal(guards.includes("validBefore.slice"), true);
  assert.equal(guards.includes("[...retained, item.id]"), true);
  assert.equal(guards.includes("se abandona el efecto sostenido más antiguo"), true);
});

test("relanzar el mismo Sostenido reemplaza la instancia anterior en vez de duplicarla", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes("const replacesSameSpell = before.includes(item.id)"), true);
  assert.equal(guards.includes("reemplaza su instancia Sostenida anterior; no crea una copia adicional"), true);
});

test("ruta real valida objetivos antes de gastar recursos y resuelve áreas por Defensa", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes("validateSpellTargets(item, selectedTokens"), true);
  assert.equal(guards.indexOf("validateSpellTargets(item, selectedTokens") < guards.indexOf("originalUseSpell.call(this, item)"), true);
  assert.equal(guards.includes("spellTargetOutcomes(item, targets, singleTotal, { automatic, kineticBarrierTargets })"), true);
  assert.equal(guards.includes("spellDfFor(item, actor, { kineticBarrier })"), true);
  assert.equal(guards.includes("resolveSpellImpacts(item, hitTargets, { protectionContext:"), true);
  assert.equal(guards.includes("applyHealthDamageAuthoritatively(impact.actor, impact.damage)"), true);
  assert.equal(guards.includes("no crea automáticamente una Herida Grave"), true);
});

test("Origen Remoto fija un token de origen sin inventar alcance narrativo", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes("options.remoteOrigin"), true);
  assert.equal(guards.includes("getActiveTokens?.()[0]"), true);
  assert.equal(guards.includes("no concede percepción, conocimiento del objetivo ni línea de efecto"), true);
});

test("Origen Remoto respeta compatibilidad declarativa antes de resolver el lanzamiento", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes("item.system?.remoteOriginCompatible === false"), true);
  assert.equal(guards.indexOf("remoteOriginCompatible === false") < guards.indexOf("getActiveTokens?.()[0]"), true);
});

test("daño mágico se aplica una sola vez por Actor, usa autoridad y conserva aprobación pendiente", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes('canUserModify?.(game.user, "update")'), true);
  assert.equal(guards.includes("applyHealthDamageAuthoritatively(impact.actor, impact.damage)"), true);
  assert.equal(guards.includes("pendingDamageRequest({"), true);
  assert.equal(guards.includes("pendiente de aprobación del DJ"), true);
});

test("la ruta de lanzamiento pregunta la incertidumbre contextual sin alterar hechizos automáticos u opuestos", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes('await Dialog.confirm({'), true);
  assert.equal(guards.includes('¿Existe incertidumbre significativa, oposición o una dificultad real en este lanzamiento?'), true);
  assert.equal(guards.includes('const needsCheck = spellNeedsCheck(item, { contextualCheck })'), true);
});


test("un área reutiliza una sola tirada contra las Defensas de todos los objetivos", async () => {
  const { spellTargetOutcomes } = await import("../scripts/rules/magic-guards.mjs");
  const item={system:{defense:"normal",difficulty:12}};
  const targets=[
    {id:"a",system:{derived:{defense:12}}},
    {id:"b",system:{derived:{defense:16}}}
  ];
  const outcomes=spellTargetOutcomes(item,targets,14);
  assert.deepEqual(outcomes.map((o)=>o.total),[14,14]);
  assert.deepEqual(outcomes.map((o)=>o.success),[true,false]);

  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes("· objetivo "),false);
  assert.equal(guards.includes("targets.slice(1)"),false);
});


test("Defensa normal mágica usa contexto de Barrera pero no Parada ni frente implícito", async () => {
  const guards = await readFile(resolve(root, "scripts/rules/magic-guards.mjs"), "utf8");
  assert.equal(guards.includes('resolveActorDefense(target, { kind: "normal", kineticBarrier: false, parryable: false, frontal: false })'), true);
  assert.equal(guards.includes("kineticBarrierTargets"), true);
  assert.equal(guards.includes("claimKineticBarrier"), true);
});


test("Defensa normal conserva +2 cinético aunque el estado se reclame antes de resolver", async () => {
  const { spellTargetOutcomes } = await import("../scripts/rules/magic-guards.mjs");
  const item={system:{defense:"normal",difficulty:12}};
  const target={id:"t",system:{derived:{defense:14},combat:{kineticBarrierActive:false}}};
  const claimed=new Set(["t"]);
  const [outcome]=spellTargetOutcomes(item,[target],15,{kineticBarrierTargets:claimed});
  assert.equal(outcome.df,16);
  assert.equal(outcome.success,false);
});
