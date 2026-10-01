import { attackHits, resolveWeaponImpact } from "./combat-impact.mjs";
import { resolveActorDefense } from "./defense-context.mjs";
import { pendingDamageRequest } from "./damage-delivery.mjs";
import { normalizeSlug } from "./identity.mjs";
import { applyHealthDamageAuthoritatively, claimKineticBarrier, canResolveSharedMutation } from "./state-authority.mjs";

const number = (value, fallback = Number.NaN) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const ownsTechnique = (actor, name) => {
  const slug = normalizeSlug(name);
  return actor.items?.some?.((item) => item.type === "technique" && normalizeSlug(item.system?.slug || item.name) === slug) ?? false;
};
const canUpdate = (actor) => actor.canUserModify?.(game.user, "update") ?? actor.isOwner ?? false;
const rollTotal = (result) => number(result?.rolls?.[0]?.total ?? result?.roll?.total ?? result?.total);
const isRangedWeapon = (weapon) => String(weapon?.system?.skill ?? "") === "rangedWeapons";

async function spendAction(actor) {
  if (!(actor.system.turn?.action ?? true)) {
    ui.notifications.warn(actor.name + " ya gastó su Acción.");
    return false;
  }
  await actor.update({ "system.turn.action": false });
  return true;
}

async function closeParry(target, total, baseDefense, parryDefense) {
  if (!target.system?.combat?.parryActive) return false;
  const succeeded = Number.isFinite(total) &&
    Number.isFinite(baseDefense) &&
    Number.isFinite(parryDefense) &&
    total >= baseDefense &&
    total < parryDefense;
  if (canUpdate(target)) {
    await target.update({
      "system.combat.parryActive": false,
      "system.combat.parrySucceeded": succeeded,
      "system.combat.counterattackUsed": false
    });
  } else {
    ui.notifications.warn("La Parada se aplicó al ataque, pero un usuario con permisos sobre " + target.name + " debe cerrar su estado.");
  }
  return succeeded;
}

function attackDefense(target, weapon, {
  frontal = false,
  parryable = false,
  kineticBarrier = true
} = {}) {
  return resolveActorDefense(target, {
    kind: "normal",
    frontal,
    parryable: parryable && !isRangedWeapon(weapon),
    kineticBarrier
  });
}

/** Integra la economía defensiva canónica en todas las rutas físicas de ataque. */
export function installCombatDefenseGuards(ActorClass) {
  const originalRollWeapon = ActorClass.prototype.rollWeapon;

  ActorClass.prototype.guard = async function () {
    if (!(this.system.turn?.action ?? true)) return ui.notifications.warn(this.name + " ya gastó su Acción.");
    await this.update({ "system.turn.action": false, "system.combat.guardActive": true });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Guardia</strong><p>" +
        foundry.utils.escapeHTML(this.name) +
        " consume su Acción y obtiene +2 Defensa hasta el inicio de su siguiente turno.</p></div>"
    });
  };

  ActorClass.prototype.parry = async function () {
    if (!ownsTechnique(this, "Parada")) return ui.notifications.warn(this.name + " no posee la Técnica Parada.");
    if (!(this.system.turn?.reaction ?? true)) return ui.notifications.warn(this.name + " ya gastó su Reacción.");
    await this.update({
      "system.turn.reaction": false,
      "system.combat.parryActive": true,
      "system.combat.parrySucceeded": false,
      "system.combat.counterattackUsed": false
    });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Parada</strong><p>" +
        foundry.utils.escapeHTML(this.name) +
        " consume su Reacción y obtiene +2 Defensa contra el siguiente ataque cuerpo a cuerpo parable que la desencadene. No se aplica por defecto a distancia, áreas ni hechizos.</p></div>"
    });
  };

  ActorClass.prototype.counterattack = async function (item) {
    if (!item || item.type !== "weapon") return null;
    if (!ownsTechnique(this, "Contraataque")) return ui.notifications.warn(this.name + " no posee la Técnica Contraataque.");
    if (!this.system.combat?.parrySucceeded) return ui.notifications.warn("Contraataque requiere una Parada exitosa contra el ataque desencadenante.");
    if (this.system.combat?.counterattackUsed) return ui.notifications.warn("Esta Reacción ya resolvió un Contraataque.");
    await this.update({
      "system.combat.parryActive": false,
      "system.combat.parrySucceeded": false,
      "system.combat.counterattackUsed": true
    });
    return this.rollWeapon(item, { technique: "Contraataque", tmReactionAttack: true });
  };

  ActorClass.prototype.rollWeapon = async function (item, options = {}) {
    if (!item || item.type !== "weapon") return null;
    const selected = [...(game.user.targets ?? [])].map((token) => token?.actor).filter(Boolean);
    const targets = [...new Map(selected.map((actor) => [actor.uuid ?? actor.id, actor])).values()];
    if (targets.length !== 1) return ui.notifications.warn("El ataque requiere exactamente un objetivo válido.");

    const target = targets[0];
    if (target.system?.combat?.kineticBarrierActive && !canResolveSharedMutation(target)) {
      return ui.notifications.warn("No hay una autoridad activa capaz de consumir la defensa cinética del objetivo.");
    }
    if (!options.tmReactionAttack && !(await spendAction(this))) return null;

    const kineticClaim = await claimKineticBarrier(target);
    if (!kineticClaim.ok) return ui.notifications.warn(kineticClaim.error);
    const frontal = options.tmFrontal === true;
    const kineticPending = kineticClaim.claimed === true;
    const parryPending = Boolean(target.system?.combat?.parryActive) && !isRangedWeapon(item);
    const baseResolved = attackDefense(target, item, {
      frontal,
      parryable: false,
      kineticBarrier: false
    });
    const fullResolved = attackDefense(target, item, {
      frontal,
      parryable: parryPending,
      kineticBarrier: false
    });
    const explicitDf = number(options.df);
    const kineticBonus = kineticPending ? 2 : 0;
    const baseDefense = (Number.isFinite(explicitDf) ? explicitDf : baseResolved.total) + kineticBonus;
    const parryDelta = parryPending ? fullResolved.total - baseResolved.total : 0;
    const defense = baseDefense + parryDelta;

    const result = await originalRollWeapon.call(this, item, {
      ...options,
      df: defense,
      protectionContext: options.tmProtectionContext ?? {}
    });

    if (parryPending) await closeParry(target, rollTotal(result), baseDefense, defense);
    return result;
  };

  ActorClass.prototype.dualWieldAttack = async function (primary, secondary, options = {}) {
    if (!primary || !secondary || primary.type !== "weapon" || secondary.type !== "weapon" || primary.id === secondary.id) {
      return ui.notifications.warn("Combate Dual requiere dos armas distintas.");
    }
    if (!ownsTechnique(this, "Combate Dual")) return ui.notifications.warn(this.name + " no posee la Técnica Combate Dual.");
    const compatible = (weapon) => /Ligera/i.test(String(weapon.system?.properties ?? ""));
    if (!compatible(primary) || !compatible(secondary)) return ui.notifications.warn("Combate Dual requiere armas Ligeras o expresamente compatibles.");

    const selected = [...(game.user.targets ?? [])].map((token) => token?.actor).filter(Boolean);
    const targets = [...new Map(selected.map((actor) => [actor.uuid ?? actor.id, actor])).values()];
    if (targets.length !== 1) return ui.notifications.warn("Combate Dual requiere exactamente un objetivo válido.");
    const target = targets[0];
    if (target.system?.combat?.kineticBarrierActive && !canResolveSharedMutation(target)) {
      return ui.notifications.warn("No hay una autoridad activa capaz de consumir la defensa cinética del objetivo.");
    }
    if (!(await spendAction(this))) return null;
    const kineticClaim = await claimKineticBarrier(target);
    if (!kineticClaim.ok) return ui.notifications.warn(kineticClaim.error);

    const results = [];
    let pendingTotal = 0;
    let parryPending = Boolean(target.system?.combat?.parryActive);
    const kineticPending = kineticClaim.claimed === true;
    const frontal = options.tmFrontal === true;

    for (const [index, weapon] of [primary, secondary].entries()) {
      const parryThisAttack = parryPending && !isRangedWeapon(weapon);
      const kineticThisAttack = kineticPending && index === 0;
      const kineticBonus = kineticThisAttack ? 2 : 0;
      const baseDefense = attackDefense(target, weapon, {
        frontal,
        parryable: false,
        kineticBarrier: false
      }).total + kineticBonus;
      const defense = attackDefense(target, weapon, {
        frontal,
        parryable: parryThisAttack,
        kineticBarrier: false
      }).total + kineticBonus;

      const roll = await this.rollCheck({
        label: "Combate Dual " + (index + 1) + ": " + weapon.name,
        attributeKey: weapon.system.attackAttribute || "agi",
        skillKey: weapon.system.skill || "lightWeapons",
        df: defense,
        modifier: -2
      });
      const total = rollTotal(roll);
      const hit = attackHits(total, defense);
      let damage = 0;
      if (hit) {
        const impact = resolveWeaponImpact(weapon, this, target, {
          protectionContext: options.tmProtectionContext ?? {}
        });
        damage = impact.damage;
        if (damage > 0 && canUpdate(target)) {
          const delivery = await applyHealthDamageAuthoritatively(target, damage);
          if (!delivery.ok) {
            ui.notifications.warn(delivery.error);
            pendingTotal += damage;
          }
        } else if (damage > 0) pendingTotal += damage;
      }
      results.push({ roll, hit, damage });

      if (parryThisAttack) {
        await closeParry(target, total, baseDefense, defense);
        parryPending = false;
      }
    }

    const pendingDamage = pendingDamageRequest({
      targetUuid: target.uuid,
      damage: pendingTotal,
      source: "Combate Dual",
      attacker: this.name
    });
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flags: pendingDamage ? { "tierra-magica": { pendingDamage } } : {},
      content: "<div class='tm-chat-card'><strong>Combate Dual</strong><p>" +
        results.map((result, index) => foundry.utils.escapeHTML([primary, secondary][index].name) + ": " +
          (result.hit ? result.damage + " daño" : "fallo")).join(" · ") +
        (pendingDamage ? "</p><p><em>Daño pendiente de aprobación del DJ.</em>" : "") + "</p></div>"
    });
    return results;
  };

  ActorClass.prototype.sweepAttack = async function (item, options = {}) {
    if (!item || item.type !== "weapon") return null;
    if (!ownsTechnique(this, "Barrido")) return ui.notifications.warn(this.name + " no posee la Técnica Barrido.");
    const selected = [...(game.user.targets ?? [])].map((token) => token?.actor).filter(Boolean);
    const targets = [...new Map(selected.map((actor) => [actor.uuid ?? actor.id, actor])).values()];
    if (targets.length < 1 || targets.length > 2) return ui.notifications.warn("Barrido requiere uno o dos objetivos válidos.");
    if (targets.some((target) => target.system?.combat?.kineticBarrierActive && !canResolveSharedMutation(target))) {
      return ui.notifications.warn("No hay una autoridad activa capaz de consumir todas las defensas cinéticas de Barrido.");
    }
    if (!(await spendAction(this))) return null;

    const claims = new Map();
    for (const target of targets) {
      const claim = await claimKineticBarrier(target);
      if (!claim.ok) return ui.notifications.warn(claim.error);
      claims.set(target.uuid ?? target.id, claim.claimed === true);
    }

    const parryable = !isRangedWeapon(item);
    const frontal = options.tmFrontal === true;
    const resolutions = targets.map((target) => {
      const kinetic = claims.get(target.uuid ?? target.id) === true;
      const parry = parryable && Boolean(target.system?.combat?.parryActive);
      const kineticBonus = kinetic ? 2 : 0;
      const base = attackDefense(target, item, { frontal, parryable: false, kineticBarrier: false }).total + kineticBonus;
      const defense = attackDefense(target, item, { frontal, parryable: parry, kineticBarrier: false }).total + kineticBonus;
      return { target, kinetic, parry, base, defense };
    });
    if (resolutions.some((entry) => !Number.isFinite(entry.defense))) {
      return ui.notifications.warn("Barrido encontró una Defensa no válida.");
    }

    const roll = await this.rollCheck({
      label: "Barrido con " + item.name,
      attributeKey: item.system.attackAttribute || "agi",
      skillKey: item.system.skill || "martialWeapons",
      df: null,
      modifier: -2
    });
    const total = rollTotal(roll);
    const summaries = [];

    for (const resolved of resolutions) {
      const { target } = resolved;
      const hit = attackHits(total, resolved.defense);
      let damage = 0;
      if (hit) {
        const impact = resolveWeaponImpact(item, this, target, {
          protectionContext: options.tmProtectionContext ?? {}
        });
        damage = impact.damage;
        if (damage > 0 && canUpdate(target)) {
          const delivery = await applyHealthDamageAuthoritatively(target, damage);
          if (!delivery.ok) ui.notifications.warn(delivery.error);
        }
      }
      const pendingDamage = damage > 0 && !canUpdate(target) ? pendingDamageRequest({
        targetUuid: target.uuid,
        damage,
        source: "Barrido — " + item.name,
        attacker: this.name
      }) : null;
      summaries.push(
        foundry.utils.escapeHTML(target.name) + ": " +
        (hit ? damage + " daño" : "fallo") +
        " (Defensa " + resolved.defense + ")" +
        (pendingDamage ? " · pendiente de DJ" : "")
      );
      if (pendingDamage) {
        await ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ actor: this }),
          flags: { "tierra-magica": { pendingDamage } },
          content: "<div class='tm-chat-card'><strong>Barrido — aprobación de daño</strong><p>" +
            foundry.utils.escapeHTML(target.name) + ": " + damage +
            " daño pendiente de aprobación del DJ.</p></div>"
        });
      }
      if (resolved.parry) await closeParry(target, total, resolved.base, resolved.defense);
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Barrido — " +
        foundry.utils.escapeHTML(item.name) + "</strong><p>" + summaries.join(" · ") + "</p></div>"
    });
    return roll;
  };
}
