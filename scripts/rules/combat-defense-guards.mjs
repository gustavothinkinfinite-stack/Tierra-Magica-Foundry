import { attackHits, resolveWeaponImpact } from "./combat-impact.mjs";
import { resolveActorDefense } from "./defense-context.mjs";
import { pendingDamageRequest } from "./damage-delivery.mjs";
import { normalizeSlug } from "./identity.mjs";
import {
  applyHealthDamageAuthoritatively,
  claimKineticBarrier,
  claimCounterattackAuthoritatively,
  claimParryAuthoritatively,
  resolveParryAuthoritatively,
  canResolveSharedMutation
} from "./state-authority.mjs";

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
const parryBonusForWeapon = (weapon) => {
  if (!weapon || weapon.type !== "weapon" || isRangedWeapon(weapon)) return 2;
  const configured = Number(weapon.system?.manufacture?.effects?.parryDefenseBonus ?? 2);
  return Math.max(2, Math.min(3, Number.isFinite(configured) ? configured : 2));
};

async function spendAction(actor) {
  if (!(actor.system.turn?.action ?? true)) {
    ui.notifications.warn(actor.name + " ya gastó su Acción.");
    return false;
  }
  await actor.update({ "system.turn.action": false });
  return true;
}

function parrySucceeded(total, baseDefense, parryDefense) {
  return Number.isFinite(total) &&
    Number.isFinite(baseDefense) &&
    Number.isFinite(parryDefense) &&
    total >= baseDefense &&
    total < parryDefense;
}

async function closeClaimedParry(target, total, baseDefense, parryDefense) {
  const succeeded = parrySucceeded(total, baseDefense, parryDefense);
  const closed = await resolveParryAuthoritatively(target, succeeded);
  if (!closed.ok) ui.notifications.warn(closed.error);
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

  ActorClass.prototype.parry = async function (weapon = null) {
    if (!ownsTechnique(this, "Parada")) return ui.notifications.warn(this.name + " no posee la Técnica Parada.");
    if (!(this.system.turn?.reaction ?? true)) return ui.notifications.warn(this.name + " ya gastó su Reacción.");
    if (weapon && (weapon.type !== "weapon" || weapon.parent !== this || isRangedWeapon(weapon))) {
      return ui.notifications.warn("Parada debe declararse con un arma cuerpo a cuerpo válida del Actor.");
    }
    const bonus = parryBonusForWeapon(weapon);
    await this.update({
      "system.turn.reaction": false,
      "system.combat.parryActive": true,
      "system.combat.parrySucceeded": false,
      "system.combat.counterattackUsed": false,
      "system.combat.parryBonus": bonus,
      "system.combat.parrySourceItemId": weapon?.id ?? ""
    });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Parada</strong><p>" +
        foundry.utils.escapeHTML(this.name) +
        " consume su Reacción y obtiene +" + bonus + " Defensa contra el siguiente ataque cuerpo a cuerpo parable que la desencadene." +
        (weapon ? " Fuente: " + foundry.utils.escapeHTML(weapon.name) + "." : "") +
        " No se aplica por defecto a distancia, áreas ni hechizos.</p></div>"
    });
  };

  ActorClass.prototype.counterattack = async function (item) {
    if (!item || item.type !== "weapon") return null;
    if (!ownsTechnique(this, "Contraataque")) return ui.notifications.warn(this.name + " no posee la Técnica Contraataque.");
    if (!this.system.combat?.parrySucceeded) return ui.notifications.warn("Contraataque requiere una Parada exitosa contra el ataque desencadenante.");
    if (this.system.combat?.counterattackUsed) return ui.notifications.warn("Esta Reacción ya resolvió un Contraataque.");

    const claim = await claimCounterattackAuthoritatively(this);
    if (!claim.ok) return ui.notifications.warn(claim.error);
    if (!claim.claimed) {
      return ui.notifications.warn(claim.reason === "used"
        ? "Esta Reacción ya resolvió un Contraataque."
        : "Contraataque requiere una Parada exitosa contra el ataque desencadenante.");
    }
    return this.rollWeapon(item, { technique: "Contraataque", tmReactionAttack: true });
  };

  ActorClass.prototype.rollWeapon = async function (item, options = {}) {
    if (!item || item.type !== "weapon") return null;
    const selected = [...(game.user.targets ?? [])].map((token) => token?.actor).filter(Boolean);
    const targets = [...new Map(selected.map((actor) => [actor.uuid ?? actor.id, actor])).values()];
    if (targets.length !== 1) return ui.notifications.warn("El ataque requiere exactamente un objetivo válido.");

    const target = targets[0];
    const parryableAttack = !isRangedWeapon(item);
    if (target.system?.combat?.kineticBarrierActive && !canResolveSharedMutation(target)) {
      return ui.notifications.warn("No hay una autoridad activa capaz de consumir la defensa cinética del objetivo.");
    }
    if (parryableAttack && target.system?.combat?.parryActive && !canResolveSharedMutation(target)) {
      return ui.notifications.warn("No hay una autoridad activa capaz de consumir la Parada del objetivo.");
    }
    if (!options.tmReactionAttack && !(await spendAction(this))) return null;

    const kineticClaim = await claimKineticBarrier(target);
    if (!kineticClaim.ok) return ui.notifications.warn(kineticClaim.error);
    const parryClaim = parryableAttack ? await claimParryAuthoritatively(target) : { ok:true, claimed:false };
    if (!parryClaim.ok) return ui.notifications.warn(parryClaim.error);

    const frontal = options.tmFrontal === true;
    const kineticPending = kineticClaim.claimed === true;
    const parryPending = parryClaim.claimed === true;
    const baseResolved = attackDefense(target, item, {
      frontal,
      parryable: false,
      kineticBarrier: false
    });
    const explicitDf = number(options.df);
    const kineticBonus = kineticPending ? 2 : 0;
    const parryBonus = parryPending ? Number(parryClaim.bonus ?? 2) : 0;
    const baseDefense = (Number.isFinite(explicitDf) ? explicitDf : baseResolved.total) + kineticBonus;
    const defense = baseDefense + parryBonus;

    const result = await originalRollWeapon.call(this, item, {
      ...options,
      df: defense,
      protectionContext: options.tmProtectionContext ?? {}
    });

    if (parryPending) await closeClaimedParry(target, rollTotal(result), baseDefense, defense);
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
    const hasParryableAttack = [primary, secondary].some((weapon) => !isRangedWeapon(weapon));
    if (target.system?.combat?.kineticBarrierActive && !canResolveSharedMutation(target)) {
      return ui.notifications.warn("No hay una autoridad activa capaz de consumir la defensa cinética del objetivo.");
    }
    if (hasParryableAttack && target.system?.combat?.parryActive && !canResolveSharedMutation(target)) {
      return ui.notifications.warn("No hay una autoridad activa capaz de consumir la Parada del objetivo.");
    }
    if (!(await spendAction(this))) return null;
    const kineticClaim = await claimKineticBarrier(target);
    if (!kineticClaim.ok) return ui.notifications.warn(kineticClaim.error);
    const parryClaim = hasParryableAttack ? await claimParryAuthoritatively(target) : { ok:true, claimed:false };
    if (!parryClaim.ok) return ui.notifications.warn(parryClaim.error);

    const results = [];
    let pendingTotal = 0;
    let parryPending = parryClaim.claimed === true;
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
      const defense = baseDefense + (parryThisAttack ? Number(parryClaim.bonus ?? 2) : 0);

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
        await closeClaimedParry(target, total, baseDefense, defense);
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
    const parryable = !isRangedWeapon(item);
    if (targets.some((target) => target.system?.combat?.kineticBarrierActive && !canResolveSharedMutation(target))) {
      return ui.notifications.warn("No hay una autoridad activa capaz de consumir todas las defensas cinéticas de Barrido.");
    }
    if (parryable && targets.some((target) => target.system?.combat?.parryActive && !canResolveSharedMutation(target))) {
      return ui.notifications.warn("No hay una autoridad activa capaz de consumir todas las Paradas de Barrido.");
    }
    if (!(await spendAction(this))) return null;

    const claims = new Map();
    const parryClaims = new Map();
    for (const target of targets) {
      const claim = await claimKineticBarrier(target);
      if (!claim.ok) return ui.notifications.warn(claim.error);
      claims.set(target.uuid ?? target.id, claim.claimed === true);

      const parryClaim = parryable ? await claimParryAuthoritatively(target) : { ok:true, claimed:false };
      if (!parryClaim.ok) return ui.notifications.warn(parryClaim.error);
      parryClaims.set(target.uuid ?? target.id, parryClaim);
    }

    const frontal = options.tmFrontal === true;
    const resolutions = targets.map((target) => {
      const key = target.uuid ?? target.id;
      const kinetic = claims.get(key) === true;
      const parryClaim = parryClaims.get(key) ?? { claimed:false, bonus:2 };
      const parry = parryClaim.claimed === true;
      const kineticBonus = kinetic ? 2 : 0;
      const base = attackDefense(target, item, { frontal, parryable: false, kineticBarrier: false }).total + kineticBonus;
      const defense = base + (parry ? Number(parryClaim.bonus ?? 2) : 0);
      return { target, kinetic, parry, parryBonus:Number(parryClaim.bonus ?? 2), base, defense };
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
      let appliedDamage = false;
      if (hit) {
        const impact = resolveWeaponImpact(item, this, target, {
          protectionContext: options.tmProtectionContext ?? {}
        });
        damage = impact.damage;
        if (damage > 0 && canUpdate(target)) {
          const delivery = await applyHealthDamageAuthoritatively(target, damage);
          appliedDamage = delivery.ok;
          if (!delivery.ok) ui.notifications.warn(delivery.error);
        }
      }
      const pendingDamage = damage > 0 && !appliedDamage ? pendingDamageRequest({
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
      if (resolved.parry) await closeClaimedParry(target, total, resolved.base, resolved.defense);
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Barrido — " +
        foundry.utils.escapeHTML(item.name) + "</strong><p>" + summaries.join(" · ") + "</p></div>"
    });
    return roll;
  };
}
