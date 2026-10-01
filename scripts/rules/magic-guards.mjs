// Foundry T.M. — salvaguardas e integración del núcleo mágico.
import { offensiveSpellNeedsTargets, resolveSpellImpacts, validateSpellTargets } from "./spell-impact.mjs";
import { normalizeSlug } from "./identity.mjs";
import { resolveActorDefense } from "./defense-context.mjs";
import { claimKineticBarrier, canResolveSharedMutation } from "./state-authority.mjs";

const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const rollTotal = (message) => number(message?.rolls?.[0]?.total ?? message?.roll?.total ?? message?.total, Number.NaN);

function spellDfFor(item, target = null, { kineticBarrier = null } = {}) {
  let df = number(item.system.difficulty, 12);
  if (item.system.defense === "mental" && target) df = resolveActorDefense(target, { kind: "mental" }).total;
  if (item.system.defense === "body" && target) df = resolveActorDefense(target, { kind: "body" }).total;
  if (item.system.defense === "normal" && target) {
    const useKinetic = kineticBarrier === null
      ? Boolean(target.system?.combat?.kineticBarrierActive)
      : kineticBarrier === true;
    df = resolveActorDefense(target, { kind: "normal", kineticBarrier: false, parryable: false, frontal: false }).total + (useKinetic ? 2 : 0);
  }
  return df;
}

export function spellTargetOutcomes(item, targets = [], total = Number.NaN, { automatic = false, kineticBarrierTargets = null } = {}) {
  return targets.map((actor) => {
    const key = actor?.uuid ?? actor?.id;
    const kineticBarrier = kineticBarrierTargets instanceof Set ? kineticBarrierTargets.has(key) : null;
    const df = spellDfFor(item, actor, { kineticBarrier });
    return {
      actor,
      total: automatic ? Number.POSITIVE_INFINITY : total,
      df,
      success: automatic || (Number.isFinite(total) && total >= df)
    };
  });
}

export function spellNeedsCheck(item, { contextualCheck = false } = {}) {
  const defense = String(item?.system?.defense ?? "");
  // Una Defensa siempre representa oposición: ni siquiera checkMode=automatic la omite.
  if (["normal", "mental", "body"].includes(defense)) return true;
  const mode = String(item?.system?.checkMode ?? "contextual");
  if (mode === "automatic") return false;
  if (mode === "required") return true;
  return mode === "contextual" && Boolean(contextualCheck);
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
    const defenseKind = String(item.system?.defense ?? "");
    if (defenseKind === "normal" && targets.some((target) =>
      target.system?.combat?.kineticBarrierActive && !canResolveSharedMutation(target)
    )) {
      return ui.notifications.warn("No hay una autoridad activa capaz de consumir la defensa cinética de todos los objetivos.");
    }

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
    let contextualCheck = false;
    const defense = String(item.system?.defense ?? "");
    if (String(item.system?.checkMode ?? "contextual") === "contextual" && !["normal", "mental", "body"].includes(defense)) {
      contextualCheck = await Dialog.confirm({
        title: "Prueba contextual — " + item.name,
        content: "<p>¿Existe incertidumbre significativa, oposición o una dificultad real en este lanzamiento?</p><p><strong>Sí</strong>: realiza la prueba. <strong>No</strong>: resuelve el lanzamiento sin tirada.</p>",
        yes: () => true,
        no: () => false,
        defaultYes: false
      });
    }
    const needsCheck = spellNeedsCheck(item, { contextualCheck });

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
    if (result.tmSpellAborted === true) return result;

    const kineticBarrierTargets = new Set();
    if (defenseKind === "normal") {
      for (const target of targets) {
        const claim = await claimKineticBarrier(target);
        if (!claim.ok) {
          ui.notifications.warn(claim.error);
          return result;
        }
        if (claim.claimed) kineticBarrierTargets.add(target.uuid ?? target.id);
      }
    }

    const outcomes = [];
    const automatic = !needsCheck && intercepted;
    if (targets.length) {
      const singleTotal = automatic ? Number.POSITIVE_INFINITY : rollTotal(result);
      outcomes.push(...spellTargetOutcomes(item, targets, singleTotal, { automatic, kineticBarrierTargets }));
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
        const hasDouble = this.items.some((entry) => entry.type === "technique" && normalizeSlug(entry.system?.slug || entry.name) === "doble-sostenimiento");
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
      const impacts = resolveSpellImpacts(item, hitTargets, { protectionContext: options.tmProtectionContext ?? {} });
      const applied = [];
      for (const impact of impacts) {
        if (impact.damage <= 0) {
          applied.push({ ...impact, applied: true });
          continue;
        }
        const canUpdate = impact.actor.canUserModify?.(game.user, "update") ?? impact.actor.isOwner ?? false;
        if (!canUpdate) {
          applied.push({ ...impact, applied: false });
          continue;
        }
        await impact.actor.adjustResource("health", -impact.damage);
        applied.push({ ...impact, applied: true });
      }
      const rows = applied.map((impact) =>
        "<p><strong>" + foundry.utils.escapeHTML(impact.actor.name) + "</strong>: " + impact.damage +
        " daño (Protección " + impact.protection + ", efectiva " + impact.effectiveProtection + ")" +
        (impact.severe ? " · <span class='tm-danger-text'>umbral de Daño Grave</span>" : "") +
        (impact.applied ? "" : " · <em>sin aplicar: permisos insuficientes</em>") + "</p>"
      ).join("");
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: "<div class='tm-chat-card'><strong>Impactos — " + foundry.utils.escapeHTML(item.name) +
          "</strong>" + (rows || "<p>Ningún objetivo fue impactado.</p>") +
          "<p>El umbral de Daño Grave es informativo: no crea automáticamente una Herida Grave.</p></div>"
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
      const message = await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: "<div class='tm-chat-card'><strong>Hechizo: " + foundry.utils.escapeHTML(item.name) +
          "</strong><p>Lanzamiento sin tirada: no existe incertidumbre significativa en esta resolución.</p></div>"
      });
      // Conserva una señal explícita para las capas posteriores: un lanzamiento
      // automático válido es éxito aunque no exista un total numérico de tirada.
      message.tmAutomaticSpell = true;
      return message;
    }
    return result;
  };
}
