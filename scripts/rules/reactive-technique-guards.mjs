import { normalizeSlug } from "./identity.mjs";
import { movementRemaining, spendActorMovement } from "./turn-economy.mjs";
const ownsTechnique = (actor, name) => { const slug=normalizeSlug(name); return actor.items?.some?.((item) => item.type === "technique" && normalizeSlug(item.system?.slug || item.name) === slug) ?? false; };

const requireTechnique = (actor, technique) => {
  if (ownsTechnique(actor, technique)) return true;
  ui.notifications.warn(actor.name + " no posee la Técnica " + technique + ".");
  return false;
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
    if (!requireTechnique(this, "Recibir Carga")) return null;
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Recibir Carga</strong><p>" + foundry.utils.escapeHTML(this.name) + " declara Recibir Carga. La Reacción se registra manualmente. Resuelve ahora un ataque con " + foundry.utils.escapeHTML(weapon.name) + " antes de completar la aproximación. El impacto no detiene automáticamente el movimiento.</p></div>"
    });
    return this.rollWeapon(weapon, { technique: "Recibir Carga", tmReactionAttack: true });
  };

  ActorClass.prototype.interceptAttack = async function ({ ally = null, attacker = null, movementCost = 0, area = false } = {}) {
    if (area) return ui.notifications.warn("Intercepción no funciona contra áreas.");
    if (!ownsTechnique(this, "Intercepción")) return ui.notifications.warn(this.name + " no posee la Técnica Intercepción.");
    const cost = Number(movementCost);
    if (!Number.isFinite(cost) || cost < 0) return ui.notifications.warn("Intercepción requiere un coste de Movimiento válido.");
    const available = movementRemaining(this);
    if (cost > available) return ui.notifications.warn("Intercepción excede el Movimiento disponible.");
    if (!(await spendActorMovement(this, cost))) {
      return ui.notifications.warn("No se pudo consumir de forma válida el Movimiento de Intercepción.");
    }
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Intercepción</strong><p>" + foundry.utils.escapeHTML(this.name) + " declara Intercepción y consume " + cost + " de Movimiento para interponerse; la Reacción se registra manualmente" + (ally?.name ? " por " + foundry.utils.escapeHTML(ally.name) : "") + ". El ataque debe cambiar su objetivo a este personaje; no obtiene Defensa adicional. La trayectoria, percepción y validez física deben estar confirmadas en la escena.</p></div>"
    });
  };
}
