// Foundry T.M. — salvaguardas del núcleo mágico.
// Mantiene Sobrecarga/Sostenimiento coherentes y evita tiradas sin incertidumbre.

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

export function spellNeedsCheck(item) {
  const mode = String(item?.system?.checkMode ?? "contextual");
  if (mode === "automatic") return false;
  if (mode === "required") return true;
  // Una defensa activa siempre representa oposición significativa.
  if (["normal", "mental", "body"].includes(String(item?.system?.defense ?? ""))) return true;
  // En modo contextual la ficha no inventa incertidumbre: el DJ puede marcar Required
  // cuando presión, oposición o una dificultad real hagan necesaria la prueba.
  return false;
}

export function installMagicGuards(ActorClass) {
  // rollCheck devuelve un ChatMessage. Exponemos el total real para consumidores internos.
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
    const needsCheck = spellNeedsCheck(item);

    // El método base resuelve correctamente costes, requisitos y Sobrecarga. Para un
    // lanzamiento sin incertidumbre sólo interceptamos SU tirada final de hechizo;
    // la tirada de Sobrecarga, si existe, continúa siendo obligatoria.
    let intercepted = false;
    const actorRollCheck = this.rollCheck;
    if (!needsCheck) {
      this.rollCheck = async (options = {}) => {
        if (String(options?.label ?? "").startsWith("Hechizo:")) {
          intercepted = true;
          return { total: Number.POSITIVE_INFINITY, rolls: [{ total: Number.POSITIVE_INFINITY }], tmAutomaticSpell: true };
        }
        return actorRollCheck.call(this, options);
      };
    }

    let result;
    try {
      result = await originalUseSpell.call(this, item);
    } finally {
      if (!needsCheck) this.rollCheck = actorRollCheck;
    }
    if (!result) return result;

    const automatic = !needsCheck && intercepted;
    const total = automatic ? Number.POSITIVE_INFINITY : rollTotal(result);
    const success = automatic || (Number.isFinite(total) && total >= spellDf(this, item));
    const after = Array.isArray(this.system.magic?.sustainedSpellIds)
      ? [...this.system.magic.sustainedSpellIds]
      : [];

    if (item.system.sustained) {
      // Un hechizo que falla nunca pasa a Sostenimiento; el Maná ya pagado no se devuelve.
      if (!success) {
        if (after.includes(item.id) && !before.includes(item.id)) {
          await this.update({ "system.magic.sustainedSpellIds": after.filter((id) => id !== item.id) });
        }
      } else if (!after.includes(item.id)) {
        const hasDouble = this.items.some((entry) => entry.type === "technique" && entry.name === "Doble Sostenimiento");
        const limit = hasDouble ? 2 : 1;
        const validBefore = before.filter((id) => this.items.get(id)?.type === "spell" && id !== item.id);
        const retained = validBefore.slice(Math.max(0, validBefore.length - (limit - 1)));
        await this.update({ "system.magic.sustainedSpellIds": [...retained, item.id] });
        if (validBefore.length >= limit) {
          ui.notifications.info(item.name + " queda Sostenido; se abandona el efecto sostenido más antiguo para respetar el límite.");
        }
      }
    }

    if (automatic) {
      return ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: "<div class='tm-chat-card'><strong>Hechizo: " + foundry.utils.escapeHTML(item.name) + "</strong><p>Lanzamiento sin tirada: no existe incertidumbre significativa en esta resolución.</p></div>"
      });
    }
    return result;
  };
}
