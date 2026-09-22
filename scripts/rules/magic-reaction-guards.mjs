// Foundry T.M. — economía de reacciones mágicas ya ratificadas.
// Contramagia permanece contextual: Foundry valida propiedad/economía, pero no inventa
// una cancelación universal ni una DF que el Manual no haya definido.
export function installMagicReactionGuards(ActorClass) {
  ActorClass.prototype.useCounterspell = async function () {
    const owns = this.items.some((entry) => entry.type === "technique" && entry.name === "Contramagia");
    if (!owns) return ui.notifications.warn(this.name + " no posee la Técnica Contramagia.");
    if (!(this.system.turn?.reaction ?? true)) return ui.notifications.warn(this.name + " ya gastó su Reacción.");
    await this.update({ "system.turn.reaction": false });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Contramagia</strong><p>" +
        foundry.utils.escapeHTML(this.name) +
        " consume su Reacción y declara Contramagia. Su resolución permanece contextual: no cancela automáticamente el hechizo, no concede una segunda Reacción y no crea una DF universal.</p></div>"
    });
  };
}
