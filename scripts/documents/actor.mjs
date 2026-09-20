import {
  characteristicPoints, degreeOfSuccess, defense, experienceForNextLevel,
  inventoryLoad, signed, skillTotal, toNumber
} from "../rules.mjs";
import { TM_CONFIG } from "../config.mjs";

export class TierraMagicaActor extends Actor {
  prepareDerivedData() {
    super.prepareDerivedData();
    const system = this.system;
    const level = Math.max(1, toNumber(system.details?.level, 1));

    for (const attribute of Object.values(system.attributes ?? {})) {
      attribute.value = toNumber(attribute.value);
      attribute.signed = signed(attribute.value);
    }

    for (const [key, skill] of Object.entries(system.skills ?? {})) {
      const defaultAbility = TM_CONFIG.skills[key]?.ability;
      skill.ability ||= defaultAbility;
      const ability = system.attributes?.[skill.ability]?.value ?? 0;
      skill.total = skillTotal({ ability, value: skill.value, bonus: skill.bonus });
      skill.signed = signed(skill.total);
    }

    const ancestry = TM_CONFIG.ancestries[system.details?.ancestry] ?? null;
    const actorClass = TM_CONFIG.classes[system.details?.class] ?? null;
    const equippedArmor = this.items
      .filter((item) => item.type === "armor" && item.system.equipped)
      .sort((a, b) => toNumber(b.system.armor) - toNumber(a.system.armor))[0];
    const armor = toNumber(equippedArmor?.system.armor) + toNumber(system.combat?.armor);
    const magicResistance = toNumber(equippedArmor?.system.magicResistance) + toNumber(system.combat?.magicResistance);
    const agility = system.attributes?.agility?.value ?? 0;
    const dexterity = system.attributes?.dexterity?.value ?? 0;
    const fortitude = system.attributes?.fortitude?.value ?? 0;
    const perception = system.attributes?.perception?.value ?? 0;
    const willpower = system.attributes?.willpower?.value ?? 0;

    system.derived = {
      ancestry,
      actorClass,
      movement: agility + dexterity + toNumber(ancestry?.movement),
      initiative: agility + perception + toNumber(system.combat?.initiativeBonus),
      magicResistance,
      skillPointsPerLevel: toNumber(system.attributes?.intelligence?.value) + toNumber(system.attributes?.power?.value),
      characteristicPoints: characteristicPoints(system.attributes),
      characteristicBudget: 30,
      load: inventoryLoad(this.items),
      loadMax: Math.max(1, toNumber(system.attributes?.strength?.value) * 5),
      perkEvery: ancestry?.perkEvery ?? 0
    };

    system.combat.defenses.armor = defense(10, agility, armor);
    system.combat.defenses.fortitude = defense(10, fortitude, level);
    system.combat.defenses.willpower = defense(10, willpower, level);
    system.details.experience.max = experienceForNextLevel(level, TM_CONFIG.xpThresholds);
  }

  async rollAttribute(key, { configure = false } = {}) {
    const attribute = this.system.attributes?.[key];
    if (!attribute) return;
    return this.#rollD20(attribute.value, `${TM_CONFIG.abilities[key] ?? key} · ${this.name}`, configure);
  }

  async rollSkill(key, { configure = false } = {}) {
    const skill = this.system.skills?.[key];
    if (!skill) return;
    return this.#rollD20(skill.total, `${TM_CONFIG.skills[key]?.label ?? key} · ${this.name}`, configure);
  }

  async rollInitiativeCheck({ configure = false } = {}) {
    return this.#rollD20(this.system.derived.initiative, `Iniciativa · ${this.name}`, configure);
  }

  async rollWeapon(item, { configure = false } = {}) {
    if (!item || item.type !== "weapon") return;
    const ability = this.system.attributes?.[item.system.attackAbility]?.value ?? 0;
    const attackBonus = ability + toNumber(this.system.combat.attackBonus) + toNumber(item.system.attackBonus);
    return this.#rollD20(attackBonus, `Ataque con ${item.name} · ${this.name}`, configure);
  }

  async rollDamage(item) {
    if (!item || item.type !== "weapon") return;
    const ability = this.system.attributes?.[item.system.damageAbility]?.value ?? 0;
    const bonus = ability + toNumber(this.system.combat.damageBonus) + toNumber(item.system.damageBonus);
    const formula = `${item.system.damage || "1d6"} ${bonus >= 0 ? "+" : "-"} ${Math.abs(bonus)}`;
    const lethality = toNumber(this.system.combat.lethality);
    const suffix = lethality ? ` · Letalidad ${signed(lethality)}` : "";
    return this.#roll(formula, `Daño de ${item.name}${suffix} · ${this.name}`);
  }

  async useSpell(item) {
    if (!item || item.type !== "spell") return;
    const cost = Math.max(0, toNumber(item.system.cost));
    const currentMana = toNumber(this.system.resources.mana.value);
    if (item.system.consumeOnUse && currentMana < cost) {
      return ui.notifications.warn(`${this.name} no tiene Maná suficiente para lanzar ${item.name}.`);
    }

    if (item.system.consumeOnUse && cost > 0) {
      await this.update({ "system.resources.mana.value": currentMana - cost });
    }

    const details = `<div class="tm-chat-card"><strong>${foundry.utils.escapeHTML(item.name)}</strong>`
      + `<p>Coste: ${cost} Maná · Salvación: ${foundry.utils.escapeHTML(item.system.saving || "Ninguna")}</p>`
      + `${item.system.requirements ? `<p>Requisitos: ${foundry.utils.escapeHTML(item.system.requirements)}</p>` : ""}</div>`;
    if (item.system.roll?.trim()) return this.#roll(item.system.roll.trim(), details);
    return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this }), content: details });
  }

  async adjustResource(resource, amount) {
    const data = this.system.resources?.[resource];
    if (!data) return;
    const next = Math.min(toNumber(data.max), Math.max(0, toNumber(data.value) + toNumber(amount)));
    return this.update({ [`system.resources.${resource}.value`]: next });
  }

  async rest(complete = false) {
    const updates = {};
    const health = this.system.resources.health;
    updates["system.resources.health.value"] = complete
      ? toNumber(health.max)
      : Math.min(toNumber(health.max), toNumber(health.value) + Math.max(1, toNumber(this.system.attributes.fortitude.value)));
    if (complete) {
      updates["system.resources.mana.value"] = toNumber(this.system.resources.mana.max);
      updates["system.status.fatigue"] = 0;
    }
    await this.update(updates);
    ui.notifications.info(`${this.name} completó un descanso ${complete ? "completo" : "breve"}.`);
  }

  async applyCharacterCreation({ ancestryKey, classKey, generation = "points" }) {
    const ancestry = TM_CONFIG.ancestries[ancestryKey] ?? TM_CONFIG.ancestries.human;
    const actorClass = TM_CONFIG.classes[classKey] ?? TM_CONFIG.classes.unclassed;
    const attributeKeys = Object.keys(TM_CONFIG.abilities);
    let values;

    if (generation === "roll") {
      values = [];
      for (let i = 0; i < attributeKeys.length; i += 1) {
        const roll = await new Roll("2d6kh1").evaluate();
        values.push(roll.total);
      }
    } else {
      values = [4, 4, 4, 4, 4, 4, 3, 3];
    }

    const attributes = Object.fromEntries(attributeKeys.map((key, index) => [key, { value: values[index] }]));
    const fortitude = attributes.fortitude.value;
    const intelligence = attributes.intelligence.value;
    const healthMax = actorClass.hitDieAverage + ancestry.health + fortitude;
    const manaMax = ancestry.mana + intelligence;
    const destiny = await new Roll("1d6").evaluate();

    return this.update({
      "system.details.ancestry": ancestryKey,
      "system.details.class": classKey,
      "system.details.level": 1,
      "system.details.experience.value": 0,
      "system.attributes": attributes,
      "system.resources.health": { value: healthMax, max: healthMax },
      "system.resources.mana": { value: manaMax, max: manaMax },
      "system.resources.destiny": { value: destiny.total, max: 6 },
      "system.traits.racial": ancestry.traits,
      "system.traits.languages": ancestry.traits.includes("común") ? ancestry.traits : "Común",
      "system.traits.size": ancestryKey === "minotaur" ? "Grande" : "Mediano",
      "system.currency.gold": 50
    });
  }

  async #rollD20(baseModifier, flavor, configure) {
    let modifier = toNumber(baseModifier);
    let dc = null;
    if (configure) {
      const configuration = await Dialog.prompt({
        title: `Configurar ${flavor}`,
        content: `<div class="form-group"><label>Modificador circunstancial</label><input name="bonus" type="number" value="0"></div>`
          + `<div class="form-group"><label>Dificultad opcional</label><input name="dc" type="number" placeholder="Sin dificultad"></div>`,
        label: "Tirar",
        callback: (html) => ({
          bonus: toNumber(html.find("[name='bonus']").val()),
          dc: html.find("[name='dc']").val()
        }),
        rejectClose: false
      });
      if (!configuration) return null;
      modifier += configuration.bonus;
      dc = configuration.dc === "" ? null : toNumber(configuration.dc);
    }

    const roll = await new Roll(`1d20 ${modifier >= 0 ? "+" : "-"} ${Math.abs(modifier)}`, this.getRollData()).evaluate();
    if (dc !== null) {
      const natural = roll.dice?.[0]?.results?.[0]?.result ?? 0;
      const result = degreeOfSuccess(roll.total, dc, natural);
      flavor += ` · CD ${dc} · <strong>${result}</strong>`;
    }
    return roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }), flavor,
      rollMode: game.settings.get("core", "rollMode")
    });
  }

  async #roll(formula, flavor) {
    const roll = await new Roll(formula, this.getRollData()).evaluate();
    return roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }), flavor,
      rollMode: game.settings.get("core", "rollMode")
    });
  }
}
