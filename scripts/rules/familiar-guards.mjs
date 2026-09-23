// Foundry T.M. — salvaguardas de Familiares y Trauma.
// Mantiene estas reglas separadas del documento base para que puedan auditarse sin
// convertir al Familiar en un segundo PJ ni extender Trauma a actores no orgánicos.

const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const validFamiliar = (owner, familiar) => Boolean(
  familiar && familiar.type === "familiar" && familiar.system?.details?.ownerUuid === owner.uuid
);
const hasTechnique = (owner, name) => owner.items?.some?.((item) => item.type === "technique" && item.name === name) ?? false;
const hasBondCapability = (owner, familiar, name, minimumBond) =>
  validFamiliar(owner, familiar) && number(familiar.system?.familiar?.bondLevel, 1) >= minimumBond && hasTechnique(owner, name);
const familiarOperational = (familiar) => !familiar.system?.familiar?.incapacitated && number(familiar.system?.resources?.health?.value) > 0;

export function installFamiliarGuards(ActorClass) {
  const originalPrepare = ActorClass.prototype.prepareDerivedData;
  ActorClass.prototype.prepareDerivedData = function () {
    originalPrepare.call(this);
    if (this.type !== "familiar") return;
    if (this.system.resources?.mana) {
      this.system.resources.mana.value = 0;
      this.system.resources.mana.max = 0;
    }
    if (this.system.turn) {
      this.system.turn.action = false;
      this.system.turn.reaction = false;
    }
  };

  ActorClass.prototype.adjustResource = async function (resource, amount) {
    const data = this.system.resources?.[resource];
    if (!data) return null;
    const previous = number(data.value);
    const next = Math.min(number(data.max), Math.max(0, previous + number(amount)));
    const updates = { [`system.resources.${resource}.value`]: next };
    if (resource === "health") {
      if (previous > 0 && next === 0) {
        updates["system.status.incapacitated"] = true;
        if (this.type === "familiar") updates["system.familiar.incapacitated"] = true;
        if (this.type === "character" && number(this.system.status?.trauma) === 0) updates["system.status.trauma"] = 1;
      } else if (next > 0) {
        updates["system.status.incapacitated"] = false;
        if (this.type === "familiar") updates["system.familiar.incapacitated"] = false;
      }
    }
    return this.update(updates);
  };

  ActorClass.prototype.linkedFamiliarAction = async function (familiar, order = "") {
    if (!validFamiliar(this, familiar)) return ui.notifications.warn("No hay un Familiar vinculado válido.");
    if (!familiarOperational(familiar)) return ui.notifications.warn(familiar.name + " está Incapacitado y no puede ejecutar una Acción Vinculada.");
    if (!(this.system.turn?.reaction ?? true)) return ui.notifications.warn(this.name + " ya gastó su Reacción.");
    const text = String(order ?? "").trim();
    if (!text) return ui.notifications.warn("La Acción Vinculada debe indicar una intervención táctica concreta.");
    await this.update({ "system.turn.reaction": false });
    await familiar.update({
      "system.familiar.currentOrder": text,
      "system.familiar.orderType": "linked",
      "system.familiar.controlMode": "linked"
    });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Acción Vinculada — " + foundry.utils.escapeHTML(familiar.name) +
        "</strong><p>" + foundry.utils.escapeHTML(text) + "</p><p>Consume la Reacción de " +
        foundry.utils.escapeHTML(this.name) + ". No concede un segundo turno ni una Reacción adicional.</p></div>"
    });
  };

  ActorClass.prototype.useFamiliarSense = async function (familiar) {
    if (!validFamiliar(this, familiar)) return ui.notifications.warn("No hay un Familiar vinculado válido.");
    if (!hasBondCapability(this, familiar, "Sentidos Compartidos", 2)) return ui.notifications.warn("Sentidos Compartidos requiere su Técnica y Vínculo II o superior.");
    if (!familiarOperational(familiar)) return ui.notifications.warn(familiar.name + " está Incapacitado.");
    if (!(this.system.turn?.action ?? true)) return ui.notifications.warn(this.name + " ya gastó su Acción.");
    await this.update({ "system.turn.action": false });
    return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this }), content: "<div class='tm-chat-card'><strong>Sentidos Compartidos</strong><p>" + foundry.utils.escapeHTML(this.name) + " percibe temporalmente mediante los sentidos reales de " + foundry.utils.escapeHTML(familiar.name) + ". No obtiene sentidos, conocimiento ni atención adicional.</p></div>" });
  };

  ActorClass.prototype.setFamiliarReactiveTrigger = async function (familiar, trigger = "") {
    if (!validFamiliar(this, familiar)) return ui.notifications.warn("No hay un Familiar vinculado válido.");
    if (!hasBondCapability(this, familiar, "Coordinación Reactiva", 3)) return ui.notifications.warn("Coordinación Reactiva requiere su Técnica y Vínculo III o superior.");
    if (!familiarOperational(familiar)) return ui.notifications.warn(familiar.name + " está Incapacitado.");
    const text = String(trigger ?? "").trim();
    if (!text) return ui.notifications.warn("El disparador reactivo debe ser concreto y observable.");
    await familiar.update({ "system.familiar.controlMode": "reactive", "system.familiar.reactiveTrigger": text });
    return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this }), content: "<div class='tm-chat-card'><strong>Coordinación Reactiva — " + foundry.utils.escapeHTML(familiar.name) + "</strong><p>" + foundry.utils.escapeHTML(text) + "</p><p>El disparador no crea Reacciones adicionales ni puede encadenar respuestas reactivas.</p></div>" });
  };

  ActorClass.prototype.triggerFamiliarReaction = async function (familiar, response = "") {
    if (!validFamiliar(this, familiar)) return ui.notifications.warn("No hay un Familiar vinculado válido.");
    if (!hasBondCapability(this, familiar, "Coordinación Reactiva", 3)) return ui.notifications.warn("Coordinación Reactiva requiere su Técnica y Vínculo III o superior.");
    if (!familiarOperational(familiar)) return ui.notifications.warn(familiar.name + " está Incapacitado.");
    if (familiar.system.familiar?.controlMode !== "reactive" || !String(familiar.system.familiar?.reactiveTrigger ?? "").trim()) return ui.notifications.warn("El Familiar no tiene un disparador reactivo válido configurado.");
    if (!(this.system.turn?.reaction ?? true)) return ui.notifications.warn(this.name + " ya gastó su Reacción.");
    const text = String(response ?? "").trim();
    if (!text) return ui.notifications.warn("La respuesta reactiva debe indicar una acción concreta.");
    await this.update({ "system.turn.reaction": false });
    return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this }), content: "<div class='tm-chat-card'><strong>Coordinación Reactiva — " + foundry.utils.escapeHTML(familiar.name) + "</strong><p>Disparador: " + foundry.utils.escapeHTML(String(familiar.system.familiar.reactiveTrigger)) + "</p><p>Respuesta: " + foundry.utils.escapeHTML(text) + "</p><p>Consume la Reacción de " + foundry.utils.escapeHTML(this.name) + "; no puede encadenar otra respuesta reactiva.</p></div>" });
  };

  ActorClass.prototype.commandFamiliar = async function (familiar, order = "") {
    if (!validFamiliar(this, familiar)) return ui.notifications.warn("No hay un Familiar vinculado válido.");
    if (!familiarOperational(familiar)) return ui.notifications.warn(familiar.name + " está Incapacitado y no puede recibir una nueva orden.");
    if (!(this.system.turn?.action ?? true)) return ui.notifications.warn(this.name + " ya gastó su Acción.");
    const text = String(order ?? "").trim();
    if (!text) return ui.notifications.warn("La nueva orden debe indicar una conducta concreta.");
    await this.update({ "system.turn.action": false });
    await familiar.update({ "system.familiar.currentOrder": text, "system.familiar.orderType": "persistent", "system.familiar.controlMode": "linked" });
    return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this }), content: "<div class='tm-chat-card'><strong>Nueva orden — " + foundry.utils.escapeHTML(familiar.name) + "</strong><p>" + foundry.utils.escapeHTML(text) + "</p><p>Consume la Acción del personaje. Una orden persistente permite conducta rutinaria, pero no concede ataques repetidos, Ayuda táctica ni otra intervención significativa gratuita cada asalto. Esas intervenciones requieren Acción Vinculada u otra capacidad expresa.</p></div>" });
  };

  ActorClass.prototype.castFromFamiliar = async function (familiar, spell) {
    if (!validFamiliar(this, familiar)) return ui.notifications.warn("No hay un Familiar vinculado válido.");
    if (!familiarOperational(familiar)) return ui.notifications.warn(familiar.name + " está Incapacitado y no puede servir como Origen Remoto.");
    if (!hasBondCapability(this, familiar, "Origen Remoto", 3)) return ui.notifications.warn("Origen Remoto requiere su Técnica y Vínculo III o superior.");
    if (!spell || spell.type !== "spell") return null;
    // La capa mágica es la única autoridad que resuelve y anuncia Origen Remoto.
    // Evita doble mensaje y mantiene en un solo punto la validación de token/origen.
    return this.useSpell(spell, { remoteOrigin: familiar });
  };
}
