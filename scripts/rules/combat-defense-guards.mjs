const number = (value, fallback = Number.NaN) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const ownsTechnique = (actor, name) => actor.items?.some?.((item) => item.type === "technique" && item.name === name) ?? false;

/**
 * Integra Guardia, Parada y Contraataque sin duplicar la resolución de impacto.
 * El Manual Básico sigue siendo la fuente canónica; este guard sólo hace cumplir
 * la economía de Acción/Reacción y el +2 defensivo ya ratificados.
 */
export function installCombatDefenseGuards(ActorClass) {
  const originalPrepareDerivedData = ActorClass.prototype.prepareDerivedData;
  const originalRollWeapon = ActorClass.prototype.rollWeapon;

  ActorClass.prototype.prepareDerivedData = function (...args) {
    const result = originalPrepareDerivedData.apply(this, args);
    if (this.system?.combat?.guardActive && this.system?.derived) {
      this.system.derived.defense = number(this.system.derived.defense, 0) + 2;
      this.system.derived.guardDefense = 2;
    } else if (this.system?.derived) {
      this.system.derived.guardDefense = 0;
    }
    return result;
  };

  ActorClass.prototype.guard = async function () {
    if (!(this.system.turn?.action ?? true)) return ui.notifications.warn(this.name + " ya gastó su Acción.");
    await this.update({ "system.turn.action": false, "system.combat.guardActive": true });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Guardia</strong><p>" + foundry.utils.escapeHTML(this.name) + " consume su Acción y obtiene +2 Defensa hasta el inicio de su siguiente turno.</p></div>"
    });
  };

  ActorClass.prototype.parry = async function () {
    if (!(this.system.turn?.reaction ?? true)) return ui.notifications.warn(this.name + " ya gastó su Reacción.");
    await this.update({
      "system.turn.reaction": false,
      "system.combat.parryActive": true,
      "system.combat.parrySucceeded": false,
      "system.combat.counterattackUsed": false
    });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Parada</strong><p>" + foundry.utils.escapeHTML(this.name) + " consume su Reacción y obtiene +2 Defensa contra el ataque que está parando.</p></div>"
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
    return originalRollWeapon.call(this, item, { technique: "Contraataque" });
  };

  ActorClass.prototype.rollWeapon = async function (item, options = {}) {
    const selected = [...(game.user.targets ?? [])].map((token) => token?.actor).filter(Boolean);
    const uniqueTargets = [...new Map(selected.map((actor) => [actor.uuid ?? actor.id, actor])).values()];
    const target = uniqueTargets.length === 1 ? uniqueTargets[0] : null;
    const parryActive = Boolean(target?.system?.combat?.parryActive);
    if (!parryActive) return originalRollWeapon.call(this, item, options);

    const baseDefense = number(options.df ?? target.system?.derived?.defense);
    if (!Number.isFinite(baseDefense)) return originalRollWeapon.call(this, item, options);

    // La Parada pertenece sólo a este ataque. Se eleva temporalmente la Defensa
    // que leerá la resolución atómica existente y se restaura siempre al finalizar.
    const originalDefense = target.system.derived.defense;
    target.system.derived.defense = baseDefense + 2;
    let result;
    try {
      result = await originalRollWeapon.call(this, item, { ...options, df: baseDefense + 2 });
    } finally {
      target.system.derived.defense = originalDefense;
    }

    const total = number(result?.rolls?.[0]?.total ?? result?.roll?.total ?? result?.total);
    const parrySucceeded = Number.isFinite(total) && total >= baseDefense && total < baseDefense + 2;
    const canUpdate = target.canUserModify?.(game.user, "update") ?? target.isOwner ?? false;
    if (canUpdate) {
      await target.update({
        "system.combat.parryActive": false,
        "system.combat.parrySucceeded": parrySucceeded,
        "system.combat.counterattackUsed": false
      });
    } else {
      ui.notifications.warn("La Parada se aplicó al ataque, pero un usuario con permisos sobre " + target.name + " debe cerrar su estado.");
    }
    return result;
  };
}
