import { applyBoundedHealing, healingAmount, pendingHealingRequest } from "./healing-delivery.mjs";

function number(value, fallback = Number.NaN) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function spellRollTotal(result) {
  return number(result?.rolls?.[0]?.total ?? result?.roll?.total ?? result?.total);
}

export function spellDifficulty(actor, item, target = undefined) {
  const declaredTarget = target === undefined ? [...(globalThis.game?.user?.targets ?? [])][0]?.actor : target;
  if (item?.system?.defense === "mental" && declaredTarget) return number(declaredTarget.system?.derived?.mentalDefense, 12);
  if (item?.system?.defense === "body" && declaredTarget) return number(declaredTarget.system?.derived?.bodyDefense, 12);
  if (item?.system?.defense === "normal" && declaredTarget) return number(declaredTarget.system?.derived?.defense, 12);
  return number(item?.system?.difficulty, 12);
}

export function spellSucceeded(actor, item, result, target = undefined, difficulty = undefined) {
  const total = spellRollTotal(result);
  const df = difficulty === undefined ? spellDifficulty(actor, item, target) : number(difficulty);
  return Number.isFinite(total) && Number.isFinite(df) && total >= df;
}

async function resolveDeterministicSpellEffect(actor, item, target) {
  if (item?.name !== "Cierre Restaurador") return;
  if (!target) {
    globalThis.ui?.notifications?.warn?.("Cierre Restaurador requiere un objetivo declarado.");
    return;
  }

  const amount = healingAmount(target, 4);
  if (amount <= 0) return;
  const canUpdate = target.canUserModify?.(globalThis.game?.user, "update") ?? target.isOwner ?? false;
  if (canUpdate) {
    await applyBoundedHealing(target, amount);
    return;
  }

  const pendingHealing = pendingHealingRequest({
    targetUuid: target.uuid,
    healing: amount,
    source: item.name,
    caster: actor?.name ?? ""
  });
  if (!pendingHealing || !globalThis.ChatMessage?.create) return;
  await globalThis.ChatMessage.create({
    speaker: globalThis.ChatMessage.getSpeaker?.({ actor }),
    flags: { "tierra-magica": { pendingHealing } },
    content: "<div class='tm-chat-card'><strong>Cierre Restaurador</strong><p>" + amount + " Vida pendiente de aprobación del DJ.</p></div>"
  });
}

const WRAPPED = Symbol("tmSpellOutcomeGuard");

export function installSpellOutcomeGuards(ActorClass) {
  const original = ActorClass?.prototype?.useSpell;
  if (typeof original !== "function" || original[WRAPPED]) return;

  async function guardedUseSpell(item, ...args) {
    // Bind outcome-sensitive data before awaiting the casting workflow. This prevents
    // changing targets while a roll dialog is open from changing the DF or recipient.
    const declaredTarget = [...(globalThis.game?.user?.targets ?? [])][0]?.actor;
    const declaredDifficulty = item?.type === "spell" ? spellDifficulty(this, item, declaredTarget) : undefined;
    const result = await original.call(this, item, ...args);
    if (!item || item.type !== "spell" || !result) return result;

    const success = spellSucceeded(this, item, result, declaredTarget, declaredDifficulty);
    if (item.system?.sustained && !success) await this.stopSustainedSpell?.(item.id);
    if (success) await resolveDeterministicSpellEffect(this, item, declaredTarget);
    return result;
  }

  Object.defineProperty(guardedUseSpell, WRAPPED, { value: true });
  ActorClass.prototype.useSpell = guardedUseSpell;
}
