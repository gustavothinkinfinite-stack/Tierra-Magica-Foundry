// Foundry T.M. — salvaguardas e integración del núcleo mágico.
import { offensiveSpellNeedsTargets, resolveSpellImpacts, spellAreaKind, validateSpellTargets } from "./spell-impact.mjs";

const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const rollTotal = (message) => number(message?.rolls?.[0]?.total ?? message?.roll?.total ?? message?.total, Number.NaN);

function spellDfFor(item, target = null) {
  let df = number(item.system.difficulty, 12);
  if (item.system.defense === "mental" && target) df = number(target.system.derived?.mentalDefense);
  if (item.system.defense === "body" && target) df = number(target.system.derived?.bodyDefense);
  if (item.system.defense === "normal" && target) df = number(target.system.derived?.defense);
  return df;
}

export function spellNeedsCheck(item) {
  const defense = String(item?.system?.defense ?? "");
  // Una Defensa siempre representa oposición: ni siquiera checkMode=automatic la omite.
  if (["normal", "mental", "body"].includes(defense)) return true;
  const mode = String(item?.system?.checkMode ?? "contextual");
  if (mode === "automatic") return false;
  if (mode === "required") return true;
  return false;
}

export function installMagicGuards(ActorClass) {
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
  ActorClass.prototype.useSpell = async function (item, options = {}) {
    if (!item || item.type !== "spell") return null;

    const selectedTokens = [...(game.user.targets ?? [])];
    const targetValidation = validateSpellTargets(item, selectedTokens, { caster: this });
    if (!targetValidation.ok) {
      if (targetValidation.reason === "target-required") return ui.notifications.warn(item.name + " requiere al menos un objetivo válido.");
      if (targetValidation.reason === "single-target") return ui.notifications.warn(item.name + " es de objetivo único: selecciona sólo un objetivo.");
      return ui.notifications.warn("La selección de objetivos de " + item.name + " no es válida.");
    }
    const targets = targetValidation.targets;

    if (options.remoteOrigin) {
      const familiar = options.remoteOrigin;
      const activeToken = familiar.getActiveTokens?.()[0] ?? null;
      if (!activeToken) return ui.notifications.warn("Origen Remoto requiere un token activo del Familiar para fijar el origen geométrico.");
      // El rango del catálogo todavía usa descriptores narrativos (Medio, Área corta, etc.).
      // No inventamos una conversión numérica: el origen se fija aquí y alcance/línea de efecto
      // siguen requiriendo validación de mesa cuando el hechizo no aporta una distancia numérica.
      options.originToken = activeToken;
    }

    const before = Array.isArray(this.system.magic?.sustainedSpellIds)
      ? [...this.system.magic.sustainedSpellIds]
      : [];
    const needsCheck = spellNeedsCheck(item);

    let intercepted = false;
    const actorRollCheck = this.rollCheck;
    if (!needsCheck) {
      this.rollCheck = async (rollOptions = {}) => {
        if (String(rollOptions?.label ?? "").startsWith("Hechizo:")) {
          intercepted = true;
          return { total: Number.POSITIVE_INFINITY, rolls: [{ total: Number.POSITIVE_INFINITY }], tmAutomaticSpell: true };
        }
        return actorRollCheck.call(this, rollOptions);
      };
    }

    let result;
    try {
      result = await originalUseSpell.call(this, item);
    } finally {
      if (!needsCheck) this.rollCheck = actorRollCheck;
    }
    if (!result) return result;

    const outcomes = [];
    const automatic = !needsCheck && intercepted;
    if (targets.length) {
      const firstTotal = automatic ? Number.POSITIVE_INFINITY : rollTotal(result);
      outcomes.push({ actor: targets[0], total: firstTotal, df: spellDfFor(item, targets[0]),
        success: automatic || (Number.isFinite(firstTotal) && firstTotal >= spellDfFor(item, targets[0])) });
      if (spellAreaKind(item) === "area" && needsCheck) {
        for (const target of targets.slice(1)) {
          const df = spellDfFor(item, target);
          const message = await actorRollCheck.call(this, {
            label: "Hechizo: " + item.name + " · objetivo " + target.name,
            attributeKey: item.system.attribute || "int",
            skillKey: "channeling",
            df
          });
          const total = rollTotal(message);
          outcomes.push({ actor: target, total, df, success: Number.isFinite(total) && total >= df });
        }
      } else if (spellAreaKind(item) === "area" && automatic) {
        for (const target of targets.slice(1)) outcomes.push({ actor: target, total: Number.POSITIVE_INFINITY, df: spellDfFor(item, target), success: true });
      }
    } else {
      outcomes.push({ actor: null, total: automatic ? Number.POSITIVE_INFINITY : rollTotal(result),
        df: spellDfFor(item), success: automatic || rollTotal(result) >= spellDfFor(item) });
    }

    const castSuccess = outcomes.some((entry) => entry.success);
    const after = Array.isArray(this.system.magic?.sustainedSpellIds)
      ? [...this.system.magic.sustainedSpellIds]
      : [];

    if (item.system.sustained) {
      if (!castSuccess) {
        if (after.includes(item.id) && !before.includes(item.id)) {
          await this.update({ "system.magic.sustainedSpellIds": after.filter((id) => id !== item.id) });
        }
      } else {
        const hasDouble = this.items.some((entry) => entry.type === "technique" && entry.name === "Doble Sostenimiento");
        const limit = hasDouble ? 2 : 1;
        const validBefore = before.filter((id) => this.items.get(id)?.type === "spell" && id !== item.id);
        const retained = validBefore.slice(Math.max(0, validBefore.length - (limit - 1)));
        const desired = [...retained, item.id];
        if (JSON.stringify(after) !== JSON.stringify(desired)) await this.update({ "system.magic.sustainedSpellIds": desired });
        if (validBefore.length >= limit) ui.notifications.info(item.name + " queda Sostenido; se abandona el efecto sostenido más antiguo para respetar el límite.");
      }
    }

    if (number(item.system.damage) > 0 && targets.length) {
      const hitTargets = outcomes.filter((entry) => entry.success).map((entry) => entry.actor);
      const impacts = resolveSpellImpacts(item, hitTargets);
      const rows = impacts.map((impact) =>
        "<p><strong>" + foundry.utils.escapeHTML(impact.actor.name) + "</strong>: " + impact.damage +
        " daño (Protección " + impact.protection + ", efectiva " + impact.effectiveProtection + ")" +
        (impact.severe ? " · <span class='tm-danger-text'>umbral de Daño Grave</span>" : "") + "</p>"
      ).join("");
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: "<div class='tm-chat-card'><strong>Impactos — " + foundry.utils.escapeHTML(item.name) +
          "</strong>" + (rows || "<p>Ningún objetivo fue impactado.</p>") +
          "<p>Vista previa: todavía no modifica Vida automáticamente.</p></div>"
      });
    }

    if (options.remoteOrigin) {
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: "<div class='tm-chat-card'><strong>Origen Remoto</strong><p>Origen geométrico: " +
          foundry.utils.escapeHTML(options.remoteOrigin.name) +
          ". El personaje conserva Maná, tiradas y Sostenimiento. El origen remoto no concede percepción, conocimiento del objetivo ni línea de efecto.</p></div>"
      });
    }

    if (automatic) {
      return ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: "<div class='tm-chat-card'><strong>Hechizo: " + foundry.utils.escapeHTML(item.name) +
          "</strong><p>Lanzamiento sin tirada: no existe incertidumbre significativa en esta resolución.</p></div>"
      });
    }
    return result;
  };
}
