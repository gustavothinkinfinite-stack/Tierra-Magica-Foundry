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
    if (mana < cost) return ui.notifications.warn(this.name + " no tiene Maná suficiente.");

    const requirements = String(item.system.requirements ?? "").trim();
    if (requirements && !this.#meetsSkillRequirement(requirements)) {
      return ui.notifications.warn("No se cumplen los requisitos de " + item.name + ": " + requirements);
    }

    if (cost) await this.update({ "system.resources.mana.value": mana - cost });

    const target = [...(game.user.targets ?? [])][0]?.actor;
    let df = toNumber(item.system.difficulty, 12);
    if (item.system.defense === "mental" && target) df = toNumber(target.system.derived?.mentalDefense);
    if (item.system.defense === "body" && target) df = toNumber(target.system.derived?.bodyDefense);
    if (item.system.defense === "normal" && target) df = toNumber(target.system.derived?.defense);

    return this.rollCheck({
      label: "Hechizo: " + item.name + " · " + (TM_CONFIG.disciplines[item.system.discipline] ?? item.system.discipline),
      attributeKey: item.system.attribute || "int",
      skillKey: "channeling",
      df
    });
  }

  async adjustResource(resource, amount) {
    const data = this.system.resources?.[resource];
    if (!data) return null;
    const next = Math.min(toNumber(data.max), Math.max(0, toNumber(data.value) + toNumber(amount)));
    return this.update({ ["system.resources." + resource + ".value"]: next });
  }

  async rest(kind = "rest") {
    const updates = {};
    const hp = this.system.resources.health;
    const mp = this.system.resources.mana;
    const recovery = this.system.recovery ?? {};
    if (kind === "rest") {
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
