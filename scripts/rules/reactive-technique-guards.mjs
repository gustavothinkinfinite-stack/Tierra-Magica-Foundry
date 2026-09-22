const ownsTechnique = (actor, name) => actor.items?.some?.((item) => item.type === "technique" && item.name === name) ?? false;

const spendReaction = async (actor, technique) => {
  if (!ownsTechnique(actor, technique)) {
    ui.notifications.warn(actor.name + " no posee la Técnica " + technique + ".");
    return false;
  }
  if (!(actor.system.turn?.reaction ?? true)) {
    ui.notifications.warn(actor.name + " ya gastó su Reacción.");
    return false;
  }
  await actor.update({ "system.turn.reaction": false });
  return true;
};

/**
 * Guardas de economía para Técnicas reactivas ratificadas.
 * La geometría y el disparador siguen siendo decisiones de escena: Foundry no inventa
 * alcance, trayectoria, percepción ni Movimiento que el tablero no pueda demostrar.
 */
export function installReactiveTechniqueGuards(ActorClass) {
  ActorClass.prototype.receiveCharge = async function (weapon) {
    if (!weapon || weapon.type !== "weapon") return ui.notifications.warn("Recibir Carga requiere un arma válida.");
    if (!/Alcance/i.test(String(weapon.system?.properties ?? ""))) return ui.notifications.warn("Recibir Carga requiere un arma con Alcance.");
    if (!(await spendReaction(this, "Recibir Carga"))) return null;
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Recibir Carga</strong><p>" + foundry.utils.escapeHTML(this.name) + " consume su Reacción. Resuelve ahora un ataque con " + foundry.utils.escapeHTML(weapon.name) + " antes de completar la aproximación. El impacto no detiene automáticamente el movimiento.</p></div>"
    });
    return this.rollWeapon(weapon, { technique: "Recibir Carga" });
  };

  ActorClass.prototype.interceptAttack = async function ({ ally = null, attacker = null, movementCost = 0, area = false } = {}) {
    if (area) return ui.notifications.warn("Intercepción no funciona contra áreas.");
    const cost = Number(movementCost);
    if (!Number.isFinite(cost) || cost < 0) return ui.notifications.warn("Intercepción requiere un coste de Movimiento válido.");
    const available = Number(this.system.turn?.movementRemaining ?? this.system.derived?.movement ?? 0);
    if (cost > available) return ui.notifications.warn("Intercepción excede el Movimiento disponible.");
    if (!(await spendReaction(this, "Intercepción"))) return null;
    const updates = {};
    if (Object.prototype.hasOwnProperty.call(this.system.turn ?? {}, "movementRemaining")) updates["system.turn.movementRemaining"] = Math.max(0, available - cost);
    if (Object.keys(updates).length) await this.update(updates);
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Intercepción</strong><p>" + foundry.utils.escapeHTML(this.name) + " consume su Reacción y " + cost + " de Movimiento para interponerse" + (ally?.name ? " por " + foundry.utils.escapeHTML(ally.name) : "") + ". El ataque debe cambiar su objetivo a este personaje; no obtiene Defensa adicional. La trayectoria, percepción y validez física deben estar confirmadas en la escena.</p></div>"
    });
  };
}
