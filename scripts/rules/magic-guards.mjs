// Foundry T.M. — salvaguardas del núcleo mágico.
// Corrige la integración entre mensajes de tirada, Sobrecarga y Sostenimiento
// sin crear una segunda economía de lanzamiento.

const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const rollTotal = (message) => number(message?.rolls?.[0]?.total ?? message?.roll?.total ?? message?.total, Number.NaN);

function spellDf(actor, item) {
  const target = [...(game.user.targets ?? [])][0]?.actor;
  let df = number(item.system.difficulty, 12);
  if (item.system.defense === "mental" && target) df = number(target.system.derived?.mentalDefense);
  if (item.system.defense === "body" && target) df = number(target.system.derived?.bodyDefense);
  if (item.system.defense === "normal" && target) df = number(target.system.derived?.defense);
  return df;
}

export function installMagicGuards(ActorClass) {
  // rollCheck devuelve un ChatMessage. El núcleo anterior consultaba .total directamente,
  // haciendo que la prueba de Sobrecarga se leyera como 0 en Foundry. Exponemos el total
  // real del Roll en el mensaje para mantener compatibilidad con los consumidores existentes.
  const originalRollCheck = ActorClass.prototype.rollCheck;
  ActorClass.prototype.rollCheck = async function (...args) {
    const message = await originalRollCheck.apply(this, args);
    if (message && !Number.isFinite(Number(message.total))) {
      const total = rollTotal(message);
      if (Number.isFinite(total)) message.total = total;
    }
    return message;
  };

  const originalUseSpell = ActorClass.prototype.useSpell;
  ActorClass.prototype.useSpell = async function (item) {
    if (!item || item.type !== "spell") return null;
    const before = Array.isArray(this.system.magic?.sustainedSpellIds)
      ? [...this.system.magic.sustainedSpellIds]
      : [];

    const result = await originalUseSpell.call(this, item);
    if (!result || !item.system.sustained) return result;

    const total = rollTotal(result);
    const success = Number.isFinite(total) && total >= spellDf(this, item);
    const after = Array.isArray(this.system.magic?.sustainedSpellIds)
      ? [...this.system.magic.sustainedSpellIds]
      : [];

    // Un hechizo que falla nunca pasa a Sostenimiento, aunque el método base lo haya
    // registrado. El Maná ya pagado no se devuelve.
    if (!success) {
      if (after.includes(item.id) && !before.includes(item.id)) {
        await this.update({ "system.magic.sustainedSpellIds": after.filter((id) => id !== item.id) });
      }
      return result;
    }

    if (after.includes(item.id)) return result;

    const hasDouble = this.items.some((entry) => entry.type === "technique" && entry.name === "Doble Sostenimiento");
    const limit = hasDouble ? 2 : 1;
    const validBefore = before.filter((id) => this.items.get(id)?.type === "spell" && id !== item.id);

    // Regla canónica: comenzar un nuevo efecto por encima del límite no cancela el
    // lanzamiento. Obliga a abandonar inmediatamente un efecto previo. Para que la
    // automatización nunca deje un estado ilegal, se abandona el más antiguo.
    const retained = validBefore.slice(Math.max(0, validBefore.length - (limit - 1)));
    await this.update({ "system.magic.sustainedSpellIds": [...retained, item.id] });
    ui.notifications.info(item.name + " queda Sostenido; se abandona el efecto sostenido más antiguo para respetar el límite.");
    return result;
  };
}
