import { normalizeSlug } from "./identity.mjs";
// Foundry T.M. — economía de reacciones mágicas ya ratificadas.
// Contramagia permanece contextual: Foundry valida propiedad/economía, pero no inventa
// una cancelación universal ni una DF que el Manual no haya definido.
export function installMagicReactionGuards(ActorClass) {
  ActorClass.prototype.useCounterspell = async function () {
    const owns = this.items.some((entry) => entry.type === "technique" && normalizeSlug(entry.system?.slug || entry.name) === "contramagia");
    if (!owns) return ui.notifications.warn(this.name + " no posee la Técnica Contramagia.");
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Contramagia</strong><p>" +
        foundry.utils.escapeHTML(this.name) +
        " declara Contramagia. Requiere Reacción según las reglas (registro manual). Su resolución permanece contextual: no cancela automáticamente el hechizo ni crea una DF universal.</p></div>"
    });
  };
}
