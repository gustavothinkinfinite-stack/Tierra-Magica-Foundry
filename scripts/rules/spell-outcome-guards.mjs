import { applyBoundedHealing, healingAmount, pendingHealingRequest } from "./healing-delivery.mjs";
import { normalizeSlug } from "./identity.mjs";
import { resolveActorDefense } from "./defense-context.mjs";

function number(value, fallback = Number.NaN) { const parsed = Number(value); return Number.isFinite(parsed) ? parsed : fallback; }
export function spellRollTotal(result) { return number(result?.rolls?.[0]?.total ?? result?.roll?.total ?? result?.total); }
export function spellDifficulty(actor, item, target = undefined) {
  const declaredTarget = target === undefined ? [...(globalThis.game?.user?.targets ?? [])][0]?.actor : target;
  if (item?.system?.defense === "mental" && declaredTarget) return resolveActorDefense(declaredTarget, { kind: "mental" }).total;
  if (item?.system?.defense === "body" && declaredTarget) return resolveActorDefense(declaredTarget, { kind: "body" }).total;
  if (item?.system?.defense === "normal" && declaredTarget) {
    return resolveActorDefense(declaredTarget, { kind: "normal", kineticBarrier: true, parryable: false, frontal: false }).total;
  }
  return number(item?.system?.difficulty, 12);
}
export function spellSucceeded(actor, item, result, target = undefined, difficulty = undefined) {
  if (result?.tmAutomaticSpell === true) return true;
  const total = spellRollTotal(result); const df = difficulty === undefined ? spellDifficulty(actor, item, target) : number(difficulty);
  return Number.isFinite(total) && Number.isFinite(df) && total >= df;
}
async function resolveDeterministicSpellEffect(actor, item, target) {
  const slug = normalizeSlug(item?.system?.slug || item?.name);
  if (slug === "barrera-cinetica") {
    await actor.update?.({ "system.combat.kineticBarrierActive": true });
    return;
  }
  if (slug !== "cierre-restaurador") return;
  if (!target) { globalThis.ui?.notifications?.warn?.("Cierre Restaurador requiere un objetivo declarado."); return; }
  const amount = healingAmount(target, 4); if (amount <= 0) return;
  const canUpdate = target.canUserModify?.(globalThis.game?.user, "update") ?? target.isOwner ?? false;
  if (canUpdate) { await applyBoundedHealing(target, amount); return; }
  const pendingHealing = pendingHealingRequest({ targetUuid: target.uuid, healing: amount, source: item.name, caster: actor?.name ?? "" });
  if (!pendingHealing || !globalThis.ChatMessage?.create) return;
  await globalThis.ChatMessage.create({ speaker: globalThis.ChatMessage.getSpeaker?.({ actor }), flags: { "tierra-magica": { pendingHealing } }, content: "<div class='tm-chat-card'><strong>Cierre Restaurador</strong><p>" + amount + " Vida pendiente de aprobación del DJ.</p></div>" });
}
const WRAPPED = Symbol("tmSpellOutcomeGuard");
export function installSpellOutcomeGuards(ActorClass) {
  const original = ActorClass?.prototype?.useSpell; if (typeof original !== "function" || original[WRAPPED]) return;
  async function guardedUseSpell(item, ...args) {
    const declaredActors = [...(globalThis.game?.user?.targets ?? [])].map((token) => token?.actor).filter(Boolean);
    const uniqueTargets = [...new Map(declaredActors.map((actor) => [actor.uuid ?? actor.id, actor])).values()];
    if (normalizeSlug(item?.system?.slug || item?.name) === "proyectil-igneo" && uniqueTargets.length !== 1) return globalThis.ui?.notifications?.warn?.("Proyectil Ígneo requiere exactamente un objetivo válido.");
    const declaredTarget = uniqueTargets[0];
    const declaredDifficulty = item?.type === "spell" ? spellDifficulty(this, item, declaredTarget) : undefined;
    const result = await original.call(this, item, ...args); if (!item || item.type !== "spell" || !result) return result;
    const success = spellSucceeded(this, item, result, declaredTarget, declaredDifficulty);
    if (item.system?.sustained && !success) await this.stopSustainedSpell?.(item.id);
    if (success) await resolveDeterministicSpellEffect(this, item, declaredTarget);
    return result;
  }
  Object.defineProperty(guardedUseSpell, WRAPPED, { value: true }); ActorClass.prototype.useSpell = guardedUseSpell;
}
