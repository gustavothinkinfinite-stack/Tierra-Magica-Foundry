import { attackHits, resolveWeaponImpact } from "./combat-impact.mjs";

const number = (value, fallback = Number.NaN) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const ownsTechnique = (actor, name) => actor.items?.some?.((item) => item.type === "technique" && item.name === name) ?? false;
const canUpdate = (actor) => actor.canUserModify?.(game.user, "update") ?? actor.isOwner ?? false;
const rollTotal = (result) => number(result?.rolls?.[0]?.total ?? result?.roll?.total ?? result?.total);

async function closeParry(target, total, baseDefense) {
  if (!target.system?.combat?.parryActive) return false;
  const succeeded = Number.isFinite(total) && total >= baseDefense && total < baseDefense + 2;
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

/** Integra la economía defensiva canónica en todas las rutas físicas de ataque. */
export function installCombatDefenseGuards(ActorClass) {
  const originalPrepareDerivedData = ActorClass.prototype.prepareDerivedData;
  const originalRollWeapon = ActorClass.prototype.rollWeapon;

  ActorClass.prototype.prepareDerivedData = function (...args) {
    const result = originalPrepareDerivedData.apply(this, args);
    if (this.system?.combat?.guardActive && this.system?.derived) {
      this.system.derived.defense = number(this.system.derived.defense, 0) + 2;
      this.system.derived.guardDefense = 2;
    } else if (this.system?.derived) this.system.derived.guardDefense = 0;
    return result;
  };

  ActorClass.prototype.guard = async function () {
    if (!(this.system.turn?.action ?? true)) return ui.notifications.warn(this.name + " ya gastó su Acción.");
    await this.update({ "system.turn.action": false, "system.combat.guardActive": true });
    return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this }), content: "<div class='tm-chat-card'><strong>Guardia</strong><p>" + foundry.utils.escapeHTML(this.name) + " consume su Acción y obtiene +2 Defensa hasta el inicio de su siguiente turno.</p></div>" });
  };

  ActorClass.prototype.parry = async function () {
    if (!ownsTechnique(this, "Parada")) return ui.notifications.warn(this.name + " no posee la Técnica Parada.");
    if (!(this.system.turn?.reaction ?? true)) return ui.notifications.warn(this.name + " ya gastó su Reacción.");
    await this.update({ "system.turn.reaction": false, "system.combat.parryActive": true, "system.combat.parrySucceeded": false, "system.combat.counterattackUsed": false });
    return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this }), content: "<div class='tm-chat-card'><strong>Parada</strong><p>" + foundry.utils.escapeHTML(this.name) + " consume su Reacción y obtiene +2 Defensa contra el siguiente ataque cuerpo a cuerpo parable que la desencadene. No se aplica por defecto a distancia, áreas ni hechizos.</p></div>" });
  };

  ActorClass.prototype.counterattack = async function (item) {
    if (!item || item.type !== "weapon") return null;
    if (!ownsTechnique(this, "Contraataque")) return ui.notifications.warn(this.name + " no posee la Técnica Contraataque.");
    if (!this.system.combat?.parrySucceeded) return ui.notifications.warn("Contraataque requiere una Parada exitosa contra el ataque desencadenante.");
    if (this.system.combat?.counterattackUsed) return ui.notifications.warn("Esta Reacción ya resolvió un Contraataque.");
    await this.update({ "system.combat.parryActive": false, "system.combat.parrySucceeded": false, "system.combat.counterattackUsed": true });
    return originalRollWeapon.call(this, item, { technique: "Contraataque" });
  };

  ActorClass.prototype.rollWeapon = async function (item, options = {}) {
    const selected = [...(game.user.targets ?? [])].map((token) => token?.actor).filter(Boolean);
    const targets = [...new Map(selected.map((actor) => [actor.uuid ?? actor.id, actor])).values()];
    const target = targets.length === 1 ? targets[0] : null;
    if (!target?.system?.combat?.parryActive) return originalRollWeapon.call(this, item, options);
    const baseDefense = number(options.df ?? target.system?.derived?.defense);
    if (!Number.isFinite(baseDefense)) return originalRollWeapon.call(this, item, options);
    const result = await originalRollWeapon.call(this, item, { ...options, df: baseDefense + 2 });
    await closeParry(target, rollTotal(result), baseDefense);
    return result;
  };

  ActorClass.prototype.dualWieldAttack = async function (primary, secondary) {
    if (!primary || !secondary || primary.type !== "weapon" || secondary.type !== "weapon" || primary.id === secondary.id) return ui.notifications.warn("Combate Dual requiere dos armas distintas.");
    if (!ownsTechnique(this, "Combate Dual")) return ui.notifications.warn(this.name + " no posee la Técnica Combate Dual.");
    const compatible = (weapon) => /Ligera/i.test(String(weapon.system?.properties ?? ""));
    if (!compatible(primary) || !compatible(secondary)) return ui.notifications.warn("Combate Dual requiere armas Ligeras o expresamente compatibles.");
    const selected = [...(game.user.targets ?? [])].map((token) => token?.actor).filter(Boolean);
    const targets = [...new Map(selected.map((actor) => [actor.uuid ?? actor.id, actor])).values()];
    if (targets.length !== 1) return ui.notifications.warn("Combate Dual requiere exactamente un objetivo válido.");
    const target = targets[0];
    const baseDefense = number(target.system?.derived?.defense);
    if (!Number.isFinite(baseDefense)) return ui.notifications.warn("El objetivo no tiene una Defensa válida.");
    const results = [];
    for (const [index, weapon] of [primary, secondary].entries()) {
      const parryThisAttack = index === 0 && Boolean(target.system?.combat?.parryActive);
      const defense = baseDefense + (parryThisAttack ? 2 : 0);
      const roll = await this.rollCheck({ label: "Combate Dual " + (index + 1) + ": " + weapon.name, attributeKey: weapon.system.attackAttribute || "agi", skillKey: weapon.system.skill || "lightWeapons", df: defense, modifier: -2 });
      const total = rollTotal(roll);
      const hit = attackHits(total, defense);
      let damage = 0;
      if (hit) {
        const impact = resolveWeaponImpact(weapon, this, target);
        damage = impact.damage;
        if (damage > 0 && canUpdate(target)) await target.adjustResource("health", -damage);
      }
      results.push({ roll, hit, damage });
      if (parryThisAttack) await closeParry(target, total, baseDefense);
    }
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this }), content: "<div class='tm-chat-card'><strong>Combate Dual</strong><p>" + results.map((result, index) => foundry.utils.escapeHTML([primary, secondary][index].name) + ": " + (result.hit ? result.damage + " daño" : "fallo")).join(" · ") + "</p></div>" });
    return results;
  };

  ActorClass.prototype.sweepAttack = async function (item) {
    if (!item || item.type !== "weapon") return null;
    if (!ownsTechnique(this, "Barrido")) return ui.notifications.warn(this.name + " no posee la Técnica Barrido.");
    const selected = [...(game.user.targets ?? [])].map((token) => token?.actor).filter(Boolean);
    const targets = [...new Map(selected.map((actor) => [actor.uuid ?? actor.id, actor])).values()];
    if (targets.length < 1 || targets.length > 2) return ui.notifications.warn("Barrido requiere uno o dos objetivos válidos.");
    const baseDefenses = targets.map((target) => number(target.system?.derived?.defense));
    if (baseDefenses.some((value) => !Number.isFinite(value))) return ui.notifications.warn("Barrido encontró una Defensa no válida.");
    const defenses = targets.map((target, index) => baseDefenses[index] + (target.system?.combat?.parryActive ? 2 : 0));
    // Una sola tirada, sin DF global engañosa: cada objetivo tiene su propia Defensa.
    const roll = await this.rollCheck({ label: "Barrido con " + item.name, attributeKey: item.system.attackAttribute || "agi", skillKey: item.system.skill || "martialWeapons", df: null, modifier: -2 });
    const total = rollTotal(roll);
    const summaries = [];
    for (let i = 0; i < targets.length; i += 1) {
      const target = targets[i];
      const hit = attackHits(total, defenses[i]);
      let damage = 0;
      if (hit) {
        const impact = resolveWeaponImpact(item, this, target);
        damage = impact.damage;
        if (damage > 0 && canUpdate(target)) await target.adjustResource("health", -damage);
      }
      summaries.push(foundry.utils.escapeHTML(target.name) + ": " + (hit ? damage + " daño" : "fallo") + " (Defensa " + defenses[i] + ")");
      if (target.system?.combat?.parryActive) await closeParry(target, total, baseDefenses[i]);
    }
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this }), content: "<div class='tm-chat-card'><strong>Barrido — " + foundry.utils.escapeHTML(item.name) + "</strong><p>" + summaries.join(" · ") + "</p></div>" });
    return roll;
  };
}
