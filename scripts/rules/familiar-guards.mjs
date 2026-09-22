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

export function installFamiliarGuards(ActorClass) {
  const originalPrepare = ActorClass.prototype.prepareDerivedData;
  ActorClass.prototype.prepareDerivedData = function () {
    originalPrepare.call(this);
    if (this.type !== "familiar") return;

    // Un Familiar no obtiene una segunda reserva personal de Maná ni una economía
    // completa de Acción/Reacción por heredar la plantilla base.
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
        // Regla canónica: sólo un PJ orgánico recibe automáticamente Trauma 1
        // la primera vez que cae a 0 Vida mientras está en Trauma 0. No existe una
        // bandera vitalicia: si se recuperó de Trauma, una caída futura puede volver
        // a producir Trauma 1.
        if (this.type === "character" && number(this.system.status?.trauma) === 0) {
          updates["system.status.trauma"] = 1;
        }
      } else if (next > 0) {
        updates["system.status.incapacitated"] = false;
        if (this.type === "familiar") updates["system.familiar.incapacitated"] = false;
      }
    }
    return this.update(updates);
  };

  ActorClass.prototype.useFamiliarSense = async function (familiar) {
    if (!validFamiliar(this, familiar)) return ui.notifications.warn("No hay un Familiar vinculado válido.");
    if (!hasBondCapability(this, familiar, "Sentidos Compartidos", 2)) {
      return ui.notifications.warn("Sentidos Compartidos requiere su Técnica y Vínculo II o superior.");
    }
    if (familiar.system.familiar?.incapacitated || number(familiar.system.resources?.health?.value) <= 0) {
      return ui.notifications.warn(familiar.name + " está Incapacitado.");
    }
    if (!(this.system.turn?.action ?? true)) return ui.notifications.warn(this.name + " ya gastó su Acción.");
    await this.update({ "system.turn.action": false });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Sentidos Compartidos</strong><p>" +
        foundry.utils.escapeHTML(this.name) + " percibe temporalmente mediante los sentidos reales de " +
        foundry.utils.escapeHTML(familiar.name) + ". No obtiene sentidos, conocimiento ni atención adicional.</p></div>"
    });
  };

  ActorClass.prototype.setFamiliarReactiveTrigger = async function (familiar, trigger = "") {
    if (!validFamiliar(this, familiar)) return ui.notifications.warn("No hay un Familiar vinculado válido.");
    if (!hasBondCapability(this, familiar, "Coordinación Reactiva", 3)) {
      return ui.notifications.warn("Coordinación Reactiva requiere su Técnica y Vínculo III o superior.");
    }
    const text = String(trigger ?? "").trim();
    if (!text) return ui.notifications.warn("El disparador reactivo debe ser concreto y observable.");
    await familiar.update({
      "system.familiar.controlMode": "reactive",
      "system.familiar.reactiveTrigger": text
    });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Coordinación Reactiva — " +
        foundry.utils.escapeHTML(familiar.name) + "</strong><p>" + foundry.utils.escapeHTML(text) +
        "</p><p>El disparador no crea Reacciones adicionales ni puede encadenar respuestas reactivas.</p></div>"
    });
  };

  ActorClass.prototype.commandFamiliar = async function (familiar, order = "") {
    if (!validFamiliar(this, familiar)) return ui.notifications.warn("No hay un Familiar vinculado válido.");
    if (familiar.system.familiar?.incapacitated || number(familiar.system.resources?.health?.value) <= 0) {
      return ui.notifications.warn(familiar.name + " está Incapacitado y no puede recibir una nueva orden.");
    }
    if (!(this.system.turn?.action ?? true)) return ui.notifications.warn(this.name + " ya gastó su Acción.");

    const text = String(order ?? "").trim();
    await this.update({ "system.turn.action": false });
    await familiar.update({
      "system.familiar.currentOrder": text,
      "system.familiar.orderType": "persistent",
      "system.familiar.controlMode": "linked"
    });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Nueva orden — " + foundry.utils.escapeHTML(familiar.name) +
        "</strong><p>" + foundry.utils.escapeHTML(text || "Orden persistente simple") +
        "</p><p>Consume la Acción del personaje. Una orden persistente permite conducta rutinaria (moverse, vigilar, huir, seguir o esperar), pero <strong>no concede ataques repetidos, Ayuda táctica ni otra intervención significativa gratuita cada asalto</strong>. Esas intervenciones requieren Acción Vinculada u otra capacidad expresa.</p></div>"
    });
  };

  ActorClass.prototype.castFromFamiliar = async function (familiar, spell) {
    if (!validFamiliar(this, familiar)) return ui.notifications.warn("No hay un Familiar vinculado válido.");
    if (familiar.system.familiar?.incapacitated || number(familiar.system.resources?.health?.value) <= 0) {
      return ui.notifications.warn(familiar.name + " está Incapacitado y no puede servir como Origen Remoto.");
    }
    if (!hasBondCapability(this, familiar, "Origen Remoto", 3)) {
      return ui.notifications.warn("Origen Remoto requiere su Técnica y Vínculo III o superior.");
    }
    if (!spell || spell.type !== "spell") return null;

    const result = await this.useSpell(spell, { remoteOrigin: familiar });
    if (!result) return result;
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Origen Remoto</strong><p>El hechizo usa la posición de " +
        foundry.utils.escapeHTML(familiar.name) + " como origen. El personaje conserva Maná, tirada y Sostenimiento. La posición remota <strong>no concede conocimiento, percepción ni línea de efecto por sí sola</strong>; el objetivo debe ser válido según los sentidos, alcance y obstáculos aplicables.</p></div>"
    });
    return result;
  };
}
