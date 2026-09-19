import { abilityModifier, defense, rankBonus, signed, skillTotal, toNumber } from "../rules.mjs";
import { TM_CONFIG } from "../config.mjs";

export class TierraMagicaActor extends Actor {
  prepareDerivedData() {
    super.prepareDerivedData();

    const system = this.system;
    const level = Math.max(1, toNumber(system.details?.level, 1));
    const proficiency = toNumber(system.combat?.proficiency, 2);

    for (const ability of Object.values(system.attributes ?? {})) {
      ability.mod = abilityModifier(ability.value);
      ability.signed = signed(ability.mod);
    }

    for (const skill of Object.values(system.skills ?? {})) {
      const modifier = system.attributes?.[skill.ability]?.mod ?? 0;
      skill.rankBonus = rankBonus(skill.rank, level, proficiency);
      skill.total = skillTotal({
        modifier,
        rank: skill.rank,
        level,
        proficiency,
        bonus: skill.bonus
      });
      skill.signed = signed(skill.total);
    }

    const equippedArmor = this.items
      .filter((item) => item.type === "armor" && item.system.equipped)
      .reduce((total, item) => total + toNumber(item.system.armor), 0);
    const might = system.attributes?.might?.mod ?? 0;
    const agility = system.attributes?.agility?.mod ?? 0;
    const will = system.attributes?.will?.mod ?? 0;

    system.combat.defenses.armor = defense(10, agility, toNumber(system.combat.armor) + equippedArmor);
    system.combat.defenses.fortitude = defense(10, might, level);
    system.combat.defenses.reflex = defense(10, agility, level);
    system.combat.defenses.will = defense(10, will, level);
    system.combat.initiative = agility + toNumber(system.combat.initiativeBonus);
  }

  async rollAttribute(key) {
    const ability = this.system.attributes?.[key];
    if (!ability) return;
    const label = TM_CONFIG.abilities[key] ?? key;
    return this.#rollD20(ability.mod, `${label} · ${this.name}`);
  }

  async rollSkill(key) {
    const skill = this.system.skills?.[key];
    if (!skill) return;
    const label = TM_CONFIG.skills[key] ?? key;
    return this.#rollD20(skill.total, `${label} · ${this.name}`);
  }

  async rollInitiativeCheck() {
    return this.#rollD20(this.system.combat.initiative, `Iniciativa · ${this.name}`);
  }

  async rollWeapon(item) {
    if (!item || item.type !== "weapon") return;
    const ability = this.system.attributes?.[item.system.ability]?.mod ?? 0;
    const attackBonus = ability + toNumber(this.system.combat.proficiency) + toNumber(item.system.attackBonus);
    return this.#rollD20(attackBonus, `Ataque con ${item.name} · ${this.name}`);
  }

  async rollDamage(item) {
    if (!item || item.type !== "weapon") return;
    const ability = this.system.attributes?.[item.system.ability]?.mod ?? 0;
    const bonus = ability + toNumber(item.system.damageBonus);
    const formula = `${item.system.damage || "1d6"} ${bonus >= 0 ? "+" : "-"} ${Math.abs(bonus)}`;
    return this.#roll(formula, `Daño de ${item.name} · ${this.name}`);
  }

  async rollSpell(item) {
    if (!item || item.type !== "spell") return;
    const formula = item.system.roll?.trim() || "1d6";
    return this.#roll(formula, `${item.name} · ${this.name}`);
  }

  async #rollD20(modifier, flavor) {
    const bonus = toNumber(modifier);
    const formula = `1d20 ${bonus >= 0 ? "+" : "-"} ${Math.abs(bonus)}`;
    return this.#roll(formula, flavor);
  }

  async #roll(formula, flavor) {
    const roll = await new Roll(formula, this.getRollData()).evaluate();
    return roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor,
      rollMode: game.settings.get("core", "rollMode")
    });
  }
}
