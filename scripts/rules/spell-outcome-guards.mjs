function number(value, fallback = Number.NaN) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function spellRollTotal(result) {
  return number(result?.rolls?.[0]?.total ?? result?.roll?.total ?? result?.total);
}

export function spellDifficulty(actor, item) {
  const target = [...(globalThis.game?.user?.targets ?? [])][0]?.actor;
  if (item?.system?.defense === "mental" && target) return number(target.system?.derived?.mentalDefense, 12);
  if (item?.system?.defense === "body" && target) return number(target.system?.derived?.bodyDefense, 12);
  if (item?.system?.defense === "normal" && target) return number(target.system?.derived?.defense, 12);
  return number(item?.system?.difficulty, 12);
}

export function spellSucceeded(actor, item, result) {
  const total = spellRollTotal(result);
  return Number.isFinite(total) && total >= spellDifficulty(actor, item);
}

const WRAPPED = Symbol("tmSpellOutcomeGuard");

export function installSpellOutcomeGuards(ActorClass) {
  const original = ActorClass?.prototype?.useSpell;
  if (typeof original !== "function" || original[WRAPPED]) return;

  async function guardedUseSpell(item, ...args) {
    const result = await original.call(this, item, ...args);
    if (!item || item.type !== "spell" || !item.system?.sustained || !result) return result;

    // useSpell historically began Sostenimiento immediately after the casting roll.
    // A failed casting must never leave that state active.  Undo only that invalid
    // state here; Mana/Fatiga remain spent according to the normal casting rules.
    if (!spellSucceeded(this, item, result)) await this.stopSustainedSpell?.(item.id);
    return result;
  }

  Object.defineProperty(guardedUseSpell, WRAPPED, { value: true });
  ActorClass.prototype.useSpell = guardedUseSpell;
}
