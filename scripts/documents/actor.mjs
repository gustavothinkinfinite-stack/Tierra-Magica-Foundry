import { TM_CONFIG } from "../config.mjs";
import {
  toNumber, clamp, rankBonus, defenseBonus, rollFormula,
  classifyResult, extraordinaryTag, finalDamage, severeThreshold
} from "../rules.mjs";

export class TierraMagicaActor extends Actor {
  prepareDerivedData() {
    super.prepareDerivedData();
    const s = this.system;
    const a = s.attributes ?? {};
    const vig = toNumber(a.vig?.value, 1);
    const agi = toNumber(a.agi?.value, 1);
    const vol = toNumber(a.vol?.value, 1);

    for (const attribute of Object.values(a)) attribute.value = clamp(attribute.value, 0, 99);
    for (const [key, skill] of Object.entries(s.skills ?? {})) {
      skill.rank = clamp(Math.floor(toNumber(skill.rank)), 0, 5);
      skill.rankBonus = rankBonus(skill.rank, TM_CONFIG.rankBonuses);
      skill.temporary = toNumber(skill.temporary);
      skill.other = toNumber(skill.other);
      skill.label = TM_CONFIG.skills[key]?.label ?? key;
      skill.rankLabel = TM_CONFIG.rankLabels[skill.rank] ?? "";
      skill.breakdown = this.#buildSkillBreakdown(key, skill);
      skill.bonus = skill.breakdown.total;
    }

    const armor = this.items
      .filter((i) => i.type === "armor" && i.system.equipped)
      .reduce((max, i) => Math.max(max, toNumber(i.system.protection)), 0);
    const shield = this.items
      .filter((i) => i.type === "shield" && i.system.equipped)
      .reduce((max, i) => Math.max(max, toNumber(i.system.passiveDefense)), 0);

    const martialRank = clamp(Math.floor(toNumber(s.combat?.defensiveRank)), 0, 5);
    const martialDefense = defenseBonus(martialRank, TM_CONFIG.defensiveRankBonuses);
    const extraDefense = toNumber(s.combat?.defenseBonus);

    s.derived = {
      healthMax: 10 + vig * 2,
      manaMax: 6 + vol * 3,
      severeThreshold: severeThreshold(vig),
      defense: 11 + agi + martialDefense + shield + extraDefense,
      maneuverDefense: 11 + agi + martialDefense + extraDefense,
      mentalDefense: 11 + vol,
      bodyDefense: 11 + vig,
      protection: armor + toNumber(s.combat?.protectionBonus),
      movement: Math.max(1, 6 + toNumber(s.combat?.movementBonus)),
      initiative: toNumber(a.per?.value, 1) + toNumber(s.combat?.initiativeBonus),
      martialDefense,
      equippedShield: shield
    };

    if (s.resources?.health) s.resources.health.max = s.derived.healthMax;
    if (s.resources?.mana) s.resources.mana.max = s.derived.manaMax;
  }

  async rollAttribute(key, options = {}) {
    return this.rollCheck({
      label: TM_CONFIG.attributes[key] ?? key,
      attributeKey: key,
      skillKey: null,
      ...options
    });
  }

  async rollSkill(key, options = {}) {
    const skill = this.system.skills?.[key];
    if (!skill) return null;
    const attributeKey = options.attributeKey ?? await this.#chooseAttribute(key);
    if (!attributeKey) return null;
    return this.rollCheck({
      label: TM_CONFIG.skills[key]?.label ?? key,
      attributeKey,
      skillKey: key,
      ...options
    });
  }

  async rollCheck({ label, attributeKey, skillKey = null, df = null, mode = "normal", modifier = 0 } = {}) {
    const attribute = toNumber(this.system.attributes?.[attributeKey]?.value);
    const skillData = skillKey ? this.system.skills?.[skillKey] : null;
    const skill = skillData ? toNumber(skillData.bonus) : 0;
    const totalModifier = attribute + skill + toNumber(modifier);
    const roll = await new Roll(rollFormula(mode, totalModifier), this.getRollData()).evaluate();

    let tag = "";
    let resultText = "";
    if (df !== null && df !== undefined && df !== "") {
      const result = classifyResult(roll.total, df);
      tag = extraordinaryTag(roll);
      resultText = "<p><strong>" + result.degree + "</strong> · DF " + toNumber(df) + " · margen " + result.margin + "</p>";
      if (tag === "Hazaña") resultText += result.success
        ? "<p class='tm-extraordinary'>Hazaña: éxito excepcional.</p>"
        : "<p class='tm-extraordinary'>Hazaña en fallo: surge una ventaja, descubrimiento u oportunidad coherente.</p>";
      if (tag === "Pifia") resultText += result.success
        ? "<p class='tm-extraordinary'>Pifia en éxito: el objetivo se logra con una complicación coherente.</p>"
        : "<p class='tm-extraordinary'>Pifia: fallo con una complicación seria y contextual.</p>";
    } else {
      tag = extraordinaryTag(roll);
      if (tag) resultText = "<p class='tm-extraordinary'><strong>" + tag + "</strong></p>";
    }

    const skillBreakdown = skillKey ? this.#skillBreakdownHtml(skillKey, attribute, modifier) : "";
    const flavor = "<div class='tm-chat-card'><strong>" + foundry.utils.escapeHTML(label) + " · " +
      foundry.utils.escapeHTML(this.name) + "</strong><p>" +
      foundry.utils.escapeHTML(TM_CONFIG.attributes[attributeKey] ?? attributeKey) +
      (skillKey ? " + " + foundry.utils.escapeHTML(TM_CONFIG.skills[skillKey]?.label ?? skillKey) : "") +
      " · " + (mode === "advantage" ? "Ventaja" : mode === "disadvantage" ? "Desventaja" : "Normal") +
      "</p>" + skillBreakdown + resultText + "</div>";

    return roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor,
      rollMode: game.settings.get("core", "rollMode")
    });
  }

  async configureAndRollSkill(key) {
    const skill = this.system.skills?.[key];
    if (!skill) return null;
    const options = Object.entries(TM_CONFIG.attributes)
      .map(([k, v]) => "<option value='" + k + "'>" + v + "</option>").join("");
    const breakdown = skill.breakdown ?? this.#buildSkillBreakdown(key, skill);
    const result = await Dialog.prompt({
      title: "Tirada de " + (TM_CONFIG.skills[key]?.label ?? key),
      content:
        this.#skillDialogSummary(breakdown) +
        "<div class='form-group'><label>Atributo</label><select name='attribute'>" + options + "</select></div>" +
        "<div class='form-group'><label>Modo</label><select name='mode'><option value='normal'>Normal</option><option value='advantage'>Ventaja</option><option value='disadvantage'>Desventaja</option></select></div>" +
        "<div class='form-group'><label>DF</label><input name='df' type='number' placeholder='Sin DF'/></div>" +
        "<div class='form-group'><label>Modificador de tirada</label><input name='modifier' type='number' value='0'/></div>",
      label: "Tirar",
      callback: (html) => ({
        attributeKey: html.find("[name='attribute']").val(),
        mode: html.find("[name='mode']").val(),
        df: html.find("[name='df']").val(),
        modifier: html.find("[name='modifier']").val()
      }),
      rejectClose: false
    });
    if (!result) return null;
    return this.rollSkill(key, result);
  }

  async rollInitiativeCheck() {
    return this.rollCheck({
      label: "Iniciativa",
      attributeKey: "per",
      modifier: toNumber(this.system.combat?.initiativeBonus)
    });
  }

  async rollWeapon(item, { df = null, mode = "normal", modifier = 0 } = {}) {
    if (!item || item.type !== "weapon") return null;
    const target = [...(game.user.targets ?? [])][0]?.actor;
    const targetDf = df ?? target?.system?.derived?.defense ?? null;
    return this.rollCheck({
      label: "Ataque con " + item.name,
      attributeKey: item.system.attackAttribute || "agi",
      skillKey: item.system.skill || "martialWeapons",
      df: targetDf,
      mode,
      modifier
    });
  }

  async rollDamage(item) {
    if (!item || item.type !== "weapon") return null;
    const target = [...(game.user.targets ?? [])][0]?.actor;
    const damageAttribute = item.system.damageAttribute
      ? toNumber(this.system.attributes?.[item.system.damageAttribute]?.value)
      : 0;
    const protection = toNumber(target?.system?.derived?.protection);
    const damage = finalDamage(
      item.system.damage,
      damageAttribute,
      0,
      protection,
      item.system.penetration
    );
    const grave = target && damage >= toNumber(target.system.derived?.severeThreshold);
    const content = "<div class='tm-chat-card'><strong>Daño · " + foundry.utils.escapeHTML(item.name) +
      "</strong><p>Base " + toNumber(item.system.damage) +
      (damageAttribute ? " + atributo " + damageAttribute : "") +
      " · Pen " + toNumber(item.system.penetration) +
      (target ? " · Protección objetivo " + protection : "") +
      "</p><p><strong>Daño final: " + damage + "</strong>" +
      (grave ? " · <span class='tm-danger-text'>Daño Grave</span>" : "") + "</p></div>";
    return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this }), content });
  }

  async useSpell(item) {
    if (!item || item.type !== "spell") return null;
    const cost = Math.max(0, toNumber(item.system.manaCost));
    const mana = toNumber(this.system.resources?.mana?.value);
    const requirements = String(item.system.requirements ?? "").trim();
    if (requirements && !this.#meetsSkillRequirement(requirements)) {
      return ui.notifications.warn("No se cumplen los requisitos de " + item.name + ": " + requirements);
    }

    const overload = mana < cost;
    if (overload && !(cost - mana === 1 && mana >= 1)) {
      return ui.notifications.warn(this.name + " no tiene Maná suficiente y no cumple las condiciones de Sobrecarga.");
    }
    if (overload && toNumber(this.system.status?.fatigue) >= 3) {
      return ui.notifications.warn(this.name + " está Colapsado y no puede usar Sobrecarga.");
    }

    if (overload) {
      await this.update({ "system.resources.mana.value": 0 });
      const roll = await this.rollCheck({
        label: "Sobrecarga: " + item.name,
        attributeKey: "vol",
        skillKey: "channeling",
        df: 17
      });
      const success = toNumber(roll?.total) >= 17;
      const previousFatigue = toNumber(this.system.status?.fatigue);
      await this.update({ "system.status.fatigue": previousFatigue >= 2 ? 3 : 2 });
      if (!success) return ui.notifications.warn("La Sobrecarga falla: el hechizo no se produce. La Pifia, si aparece, requiere una consecuencia mágica contextual.");
    } else if (cost) {
      await this.update({ "system.resources.mana.value": mana - cost });
    }

    const target = [...(game.user.targets ?? [])][0]?.actor;
    let df = toNumber(item.system.difficulty, 12);
    if (item.system.defense === "mental" && target) df = toNumber(target.system.derived?.mentalDefense);
    if (item.system.defense === "body" && target) df = toNumber(target.system.derived?.bodyDefense);
    if (item.system.defense === "normal" && target) df = toNumber(target.system.derived?.defense);

    const result = await this.rollCheck({
      label: "Hechizo: " + item.name + " · " + (TM_CONFIG.disciplines[item.system.discipline] ?? item.system.discipline),
      attributeKey: item.system.attribute || "int",
      skillKey: "channeling",
      df
    });

    if (item.system.sustained) await this.#beginSustainedSpell(item);
    return result;
  }

  async stopSustainedSpell(itemId) {
    const current = Array.isArray(this.system.magic?.sustainedSpellIds) ? [...this.system.magic.sustainedSpellIds] : [];
    if (!current.includes(itemId)) return;
    return this.update({ "system.magic.sustainedSpellIds": current.filter((id) => id !== itemId) });
  }

  async #beginSustainedSpell(item) {
    const current = Array.isArray(this.system.magic?.sustainedSpellIds)
      ? this.system.magic.sustainedSpellIds.filter((id) => this.items.get(id)?.type === "spell")
      : [];
    const hasDouble = this.items.some((i) => i.type === "technique" && i.name === "Doble Sostenimiento");
    const limit = hasDouble ? 2 : 1;
    if (current.includes(item.id)) return;
    if (current.length >= limit) {
      return ui.notifications.warn("Límite de Sostenimiento alcanzado. Abandona un efecto sostenido antes de mantener " + item.name + ".");
    }
    await this.update({ "system.magic.sustainedSpellIds": [...current, item.id] });
  }

  async useFormula(item) {
    if (!item || item.type !== "formula") return null;
    if (toNumber(item.system.quantity, 1) <= 0) return ui.notifications.warn("No quedan dosis de " + item.name + ".");

    const family = String(item.system.family ?? "").trim().toLowerCase();
    const saturated = Array.isArray(this.system.alchemy?.saturatedFamilies) ? [...this.system.alchemy.saturatedFamilies] : [];
    if (item.system.saturating && family && saturated.includes(family)) {
      return ui.notifications.warn(this.name + " ya está Saturado por la familia " + family + ".");
    }

    const updates = {};
    if (item.name === "Poción Restauradora" || item.name === "Bálsamo Restaurador") {
      const hp = this.system.resources.health;
      const cap = Math.max(0, Math.min(toNumber(hp.max), toNumber(this.system.recovery?.healthCap, hp.max)));
      updates["system.resources.health.value"] = Math.min(cap, toNumber(hp.value) + 4);
    } else if (item.name === "Poción de Recuperación Arcana") {
      const mp = this.system.resources.mana;
      updates["system.resources.mana.value"] = Math.min(toNumber(mp.max), toNumber(mp.value) + 3);
    } else {
      return ui.notifications.info(item.name + ": efecto contextual. Aplica la fórmula según su descripción.");
    }

    if (item.system.saturating && family) {
      updates["system.alchemy.saturatedFamilies"] = [...new Set([...saturated, family])];
    }
    await this.update(updates);
    await item.update({ "system.quantity": Math.max(0, toNumber(item.system.quantity, 1) - 1) });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>" + foundry.utils.escapeHTML(this.name) + " usa " + foundry.utils.escapeHTML(item.name) + "</strong><p>" + foundry.utils.escapeHTML(item.system.effect ?? "") + "</p></div>"
    });
  }

  async performRitual(item, { assistantMana = 0 } = {}) {
    if (!item || item.type !== "ritual") return null;
    const directorCost = Math.max(0, toNumber(item.system.manaDirector));
    const mana = toNumber(this.system.resources?.mana?.value);
    if (mana < directorCost) return ui.notifications.warn(this.name + " no tiene el Maná de Director requerido para " + item.name + ".");

    const usefulAssistants = Math.max(0, Math.floor(toNumber(item.system.usefulAssistants)));
    const assistantMax = Math.max(0, toNumber(item.system.manaAssistantMax));
    const requestedAssistantMana = Math.max(0, toNumber(assistantMana));
    const assistantCap = usefulAssistants * assistantMax;
    if (requestedAssistantMana > assistantCap) {
      return ui.notifications.warn("El aporte de asistentes excede el máximo definido por el ritual (" + assistantCap + " Maná).");
    }

    if (directorCost) await this.update({ "system.resources.mana.value": mana - directorCost });
    const roll = await this.rollCheck({
      label: "Ritual: " + item.name,
      attributeKey: item.system.attribute || "int",
      skillKey: "ritualism",
      df: toNumber(item.system.difficulty, 15)
    });
    const content = "<div class='tm-chat-card'><strong>" + foundry.utils.escapeHTML(item.name) +
      "</strong><p>Director: " + directorCost + " Maná · Asistentes declarados: " + requestedAssistantMana +
      " / " + assistantCap + " · Caudal requerido: " + Math.max(0, toNumber(item.system.flowRequired)) +
      "</p><p>El aporte de asistentes y el Caudal deben provenir de participantes/fuentes válidos; Foundry no crea ni descuenta esos recursos automáticamente.</p></div>";
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this }), content });
    return roll;
  }

  async useDevice(item) {
    if (!item || item.type !== "device") return null;
    const condition = String(item.system.condition ?? "operative");
    if (condition === "disabled") return ui.notifications.warn(item.name + " está Deshabilitado.");
    const consumption = Math.max(0, toNumber(item.system.consumption));
    const energy = Math.max(0, toNumber(item.system.energy?.value));
    const flow = Math.max(0, toNumber(item.system.flow));
    if (consumption > flow) return ui.notifications.warn(item.name + " requiere más Caudal del que puede entregar.");
    if (consumption > energy) return ui.notifications.warn(item.name + " no tiene Energía suficiente.");
    if (consumption) await item.update({ "system.energy.value": energy - consumption });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>" + foundry.utils.escapeHTML(item.name) + "</strong><p>Consumo " + consumption + " Energía · Caudal " + flow + "</p><p>" + foundry.utils.escapeHTML(item.system.effect ?? "") + "</p></div>"
    });
  }

  async overloadDevice(item) {
    if (!item || item.type !== "device") return null;
    if (!item.system.overloadAllowed) return ui.notifications.warn(item.name + " no admite Sobrecarga Controlada.");
    if (String(item.system.condition ?? "operative") === "disabled") return ui.notifications.warn(item.name + " está Deshabilitado.");
    const roll = await this.rollCheck({
      label: "Sobrecarga Controlada: " + item.name,
      attributeKey: "int",
      skillKey: "engineering",
      df: 16
    });
    const success = toNumber(roll?.total) >= 16;
    await item.update({ "system.condition": success ? "damaged" : "disabled" });
    const outcome = success
      ? "Funciona esta activación con Caudal efectivo +1 y queda Dañado."
      : "No funciona y queda Deshabilitado.";
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this }), content: "<div class='tm-chat-card'><strong>Sobrecarga Controlada</strong><p>" + outcome + "</p><p>La Pifia puede añadir una consecuencia energética contextual.</p></div>" });
    return roll;
  }

  async linkedFamiliarAction(familiar, order = "") {
    if (!familiar || familiar.type !== "familiar" || familiar.system.details?.ownerUuid !== this.uuid) {
      return ui.notifications.warn("No hay un Familiar vinculado válido.");
    }
    if (!(this.system.turn?.reaction ?? true)) return ui.notifications.warn(this.name + " ya gastó su Reacción.");
    if (familiar.system.familiar?.incapacitated || toNumber(familiar.system.resources?.health?.value) <= 0) {
      return ui.notifications.warn(familiar.name + " está Incapacitado y no puede ejecutar una Acción Vinculada.");
    }
    await this.update({ "system.turn.reaction": false });
    await familiar.update({
      "system.familiar.currentOrder": String(order ?? "").trim(),
      "system.familiar.orderType": "linked"
    });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Acción Vinculada — " + foundry.utils.escapeHTML(familiar.name) + "</strong><p>" +
        foundry.utils.escapeHTML(String(order ?? "").trim() || "Acción táctica coordinada") +
        "</p><p>Consume la Reacción de " + foundry.utils.escapeHTML(this.name) + ".</p></div>"
    });
  }

  async commandFamiliar(familiar, order = "") {
    if (!familiar || familiar.type !== "familiar" || familiar.system.details?.ownerUuid !== this.uuid) {
      return ui.notifications.warn("No hay un Familiar vinculado válido.");
    }
    if (!(this.system.turn?.action ?? true)) return ui.notifications.warn(this.name + " ya gastó su Acción.");
    await this.update({ "system.turn.action": false });
    await familiar.update({
      "system.familiar.currentOrder": String(order ?? "").trim(),
      "system.familiar.orderType": "persistent"
    });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Nueva orden — " + foundry.utils.escapeHTML(familiar.name) + "</strong><p>" +
        foundry.utils.escapeHTML(String(order ?? "").trim() || "Orden persistente simple") +
        "</p><p>Cambiar una orden táctica compleja consume la Acción del personaje. Una orden simple puede continuar hasta que la ficción la invalide.</p></div>"
    });
  }

  async callFamiliar(familiar) {
    if (!familiar || familiar.type !== "familiar" || familiar.system.details?.ownerUuid !== this.uuid) return null;
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Llamada del Vínculo</strong><p>" + foundry.utils.escapeHTML(this.name) +
        " llama a " + foundry.utils.escapeHTML(familiar.name) + " mediante el vínculo aproximado. No teletransporta, no revela coordenadas y no garantiza obediencia.</p></div>"
    });
  }

  async adjustResource(resource, amount) {
    const data = this.system.resources?.[resource];
    if (!data) return null;
    const previous = toNumber(data.value);
    const next = Math.min(toNumber(data.max), Math.max(0, previous + toNumber(amount)));
    const updates = { ["system.resources." + resource + ".value"]: next };

    if (resource === "health") {
      if (previous > 0 && next === 0) {
        updates["system.status.incapacitated"] = true;
        if (toNumber(this.system.status?.trauma) === 0 && !this.system.recovery?.zeroTraumaApplied) {
          updates["system.status.trauma"] = 1;
          updates["system.recovery.zeroTraumaApplied"] = true;
        }
      } else if (next > 0) {
        updates["system.status.incapacitated"] = false;
      }
    }
    return this.update(updates);
  }

  async rest(kind = "rest") {
    const updates = {};
    const hp = this.system.resources.health;
    const mp = this.system.resources.mana;
    const recovery = this.system.recovery ?? {};
    if (kind === "breather") {
      updates["system.alchemy.saturatedFamilies"] = [];
      await this.update(updates);
      return ui.notifications.info(this.name + ": Respiro completado. No recupera Vida ni Maná; limpia Saturación de preparaciones compatibles.");
    } else if (kind === "rest") {
      if (!recovery.healthUsed) {
        updates["system.resources.health.value"] = Math.min(toNumber(hp.max), toNumber(hp.value) + toNumber(this.system.attributes.vig.value) + 2);
        updates["system.recovery.healthUsed"] = true;
      }
      if (!recovery.manaUsed) {
        updates["system.resources.mana.value"] = Math.min(toNumber(mp.max), toNumber(mp.value) + toNumber(this.system.attributes.vol.value) + 1);
        updates["system.recovery.manaUsed"] = true;
      }
    } else if (kind === "full") {
      const cap = Math.max(0, Math.min(toNumber(hp.max), toNumber(recovery.healthCap, hp.max)));
      updates["system.resources.health.value"] = cap;
      updates["system.resources.mana.value"] = toNumber(mp.max);
      updates["system.recovery.healthUsed"] = false;
      updates["system.recovery.manaUsed"] = false;
      updates["system.status.fatigue"] = 0;
    }
    await this.update(updates);
  }

  #buildSkillBreakdown(skillKey, skill) {
    const rank = toNumber(skill.rankBonus ?? rankBonus(skill.rank, TM_CONFIG.rankBonuses));
    const temporary = toNumber(skill.temporary);
    const other = toNumber(skill.other);
    const sources = [];

    for (const item of this.items) {
      if (!this.#skillModifierItemActive(item)) continue;
      const modifiers = Array.isArray(item.system?.skillModifiers) ? item.system.skillModifiers : [];
      for (const modifier of modifiers) {
        if (modifier?.skill !== skillKey) continue;
        const value = toNumber(modifier.value);
        if (!value) continue;
        const category = this.#skillSourceCategory(item.type);
        sources.push({
          itemId: item.id,
          name: item.name,
          itemType: item.type,
          category,
          categoryLabel: this.#skillSourceCategoryLabel(category),
          label: String(modifier.label ?? "").trim(),
          value
        });
      }
    }

    const totalFor = (category) => sources
      .filter((source) => source.category === category)
      .reduce((sum, source) => sum + toNumber(source.value), 0);

    const specialization = totalFor("specialization");
    const equipment = totalFor("equipment");
    const technique = totalFor("technique");
    const magic = totalFor("magic");
    const trait = totalFor("trait");
    const itemOther = totalFor("other");
    const sourceTotal = specialization + equipment + technique + magic + trait + itemOther;

    return {
      rank,
      specialization,
      equipment,
      technique,
      magic,
      trait,
      itemOther,
      temporary,
      other,
      sourceTotal,
      total: rank + sourceTotal + temporary + other,
      sources
    };
  }

  #skillModifierItemActive(item) {
    if (!item?.system) return false;
    const enabled = item.system.skillModifiersActive !== false;
    if (!enabled) return false;

    if (["weapon", "armor", "shield", "equipment"].includes(item.type)) {
      return Boolean(item.system.equipped);
    }

    if (item.type === "spell") {
      return item.system.skillModifiersActive === true;
    }

    return true;
  }

  #skillSourceCategory(type) {
    if (type === "specialization") return "specialization";
    if (["weapon", "armor", "shield", "equipment"].includes(type)) return "equipment";
    if (type === "technique") return "technique";
    if (type === "spell") return "magic";
    if (type === "trait") return "trait";
    return "other";
  }

  #skillSourceCategoryLabel(category) {
    return {
      specialization: "Especialización",
      equipment: "Equipo",
      technique: "Técnica",
      magic: "Magia",
      trait: "Rasgo",
      other: "Otro"
    }[category] ?? "Otro";
  }

  #skillDialogSummary(breakdown) {
    const rows = [
      ["Rango", breakdown.rank],
      ["Especialización", breakdown.specialization],
      ["Equipo", breakdown.equipment],
      ["Técnica", breakdown.technique],
      ["Magia", breakdown.magic],
      ["Rasgo", breakdown.trait],
      ["Temporal", breakdown.temporary],
      ["Otros", breakdown.other + breakdown.itemOther]
    ];
    const rowHtml = rows.map(([label, value]) =>
      "<span>" + label + " <strong>" + this.#signed(value) + "</strong></span>"
    ).join("");
    return "<div class='tm-roll-breakdown tm-roll-breakdown-dialog'>" +
      "<div>" + rowHtml + "</div><p>Total de Habilidad <strong>" + this.#signed(breakdown.total) + "</strong></p></div>";
  }

  #skillBreakdownHtml(skillKey, attribute, rollModifier) {
    const skill = this.system.skills?.[skillKey];
    const breakdown = skill?.breakdown;
    if (!breakdown) return "";
    const rows = [
      ["Atributo", attribute],
      ["Rango", breakdown.rank],
      ["Especialización", breakdown.specialization],
      ["Equipo", breakdown.equipment],
      ["Técnica", breakdown.technique],
      ["Magia", breakdown.magic],
      ["Rasgo", breakdown.trait],
      ["Temporal", breakdown.temporary],
      ["Otros", breakdown.other + breakdown.itemOther]
    ];
    if (toNumber(rollModifier)) rows.push(["Mod. tirada", toNumber(rollModifier)]);

    const sourceHtml = breakdown.sources.length
      ? "<ul>" + breakdown.sources.map((source) =>
          "<li>" + foundry.utils.escapeHTML(source.name) +
          (source.label ? " · " + foundry.utils.escapeHTML(source.label) : "") +
          " <strong>" + this.#signed(source.value) + "</strong></li>"
        ).join("") + "</ul>"
      : "";

    return "<div class='tm-roll-breakdown'><div>" +
      rows.map(([label, value]) => "<span>" + label + " <strong>" + this.#signed(value) + "</strong></span>").join("") +
      "</div>" + sourceHtml + "</div>";
  }

  #signed(value) {
    const number = toNumber(value);
    return (number >= 0 ? "+" : "") + number;
  }

  async #chooseAttribute(skillKey) {
    const defaultMap = {
      athletics: "fue", acrobatics: "agi", stealth: "agi", survival: "per", nature: "int",
      investigation: "int", persuasion: "pre", deception: "pre", intimidation: "pre", empathy: "per",
      history: "int", religion: "int", medicine: "int", arcana: "int", crafting: "int",
      engineering: "int", alchemy: "int", thievery: "agi", lightWeapons: "agi", martialWeapons: "fue",
      heavyWeapons: "fue", rangedWeapons: "per", channeling: "int", ritualism: "int", handling: "agi", piloting: "agi"
    };
    return defaultMap[skillKey] ?? "int";
  }

  #meetsSkillRequirement(text) {
    const lower = text.toLowerCase();
    const pairs = [
      ["medicina", "medicine"], ["arcana", "arcana"], ["canalización", "channeling"],
      ["ritualismo", "ritualism"], ["alquimia", "alchemy"], ["ingeniería", "engineering"]
    ];
    for (const [label, key] of pairs) {
      if (!lower.includes(label)) continue;
      const rank = toNumber(this.system.skills?.[key]?.rank);
      if (rank < 1) return false;
    }
    return true;
  }
}
