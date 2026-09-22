const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const AUTOMATED = new Set(["Poción Restauradora", "Bálsamo Restaurador", "Poción de Recuperación Arcana"]);

export function installFormulaGuards(ActorClass) {
  const original = ActorClass.prototype.useFormula;
  ActorClass.prototype.useFormula = async function (item) {
    if (!item || item.type !== "formula") return null;
    if (AUTOMATED.has(item.name)) return original.call(this, item);
    const quantity = Math.max(0, number(item.system?.quantity, 1));
    if (quantity <= 0) return ui.notifications.warn("No quedan dosis de " + item.name + ".");
    const family = String(item.system?.family ?? "").trim().toLowerCase();
    const saturated = Array.isArray(this.system.alchemy?.saturatedFamilies) ? [...this.system.alchemy.saturatedFamilies] : [];
    if (item.system?.saturating && family && saturated.includes(family)) return ui.notifications.warn(this.name + " ya está Saturado por la familia " + family + ".");
    await item.update({ "system.quantity": quantity - 1 });
    if (item.system?.saturating && family) await this.update({ "system.alchemy.saturatedFamilies": [...new Set([...saturated, family])] });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>" + foundry.utils.escapeHTML(this.name) + " usa " + foundry.utils.escapeHTML(item.name) + "</strong><p>" + foundry.utils.escapeHTML(item.system?.effect ?? "") + "</p><p>Se consume 1 dosis. El efecto contextual restante se resuelve según la descripción de la fórmula.</p></div>"
    });
  };
}
