export const SKILL_RANK_COSTS = Object.freeze([0, 1, 3, 7, 13, 21]);
export const SKILL_RANK_BONUSES = Object.freeze([0, 1, 2, 4, 6, 8]);

export function normalizeSkillRank(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.min(5, Math.floor(number)));
}

export function skillRankCost(rank) {
  return SKILL_RANK_COSTS[normalizeSkillRank(rank)] ?? 0;
}

export function skillsPdCost(skills = {}, skillKeys = []) {
  return skillKeys.reduce((total, key) => total + skillRankCost(skills?.[key]?.rank), 0);
}

export function spellOperationalSkill(method = "direct") {
  return String(method).toLowerCase() === "ritual" ? "ritualism" : "channeling";
}

export function minimumSpellRank(grade = "basic") {
  return ({
    trick: 2,
    minor: 2,
    basic: 2,
    advanced: 3,
    master: 4,
    legendary: 5
  })[String(grade).toLowerCase()] ?? 2;
}

export function meetsSkillRequirements(skills = {}, requirements = []) {
  if (!Array.isArray(requirements)) return true;
  return requirements.every((requirement) => {
    const key = String(requirement?.skill ?? "");
    const minRank = normalizeSkillRank(requirement?.minRank ?? 0);
    return key && normalizeSkillRank(skills?.[key]?.rank) >= minRank;
  });
}

export function validateSkillProgression({
  skills = {},
  skillDefinitions = {},
  level = 1,
  pdSpent = 0,
  pdTotal = 25,
  specializationSkillKeys = []
} = {}) {
  const issues = [];
  const keys = Object.keys(skillDefinitions);
  const normalizedLevel = Math.max(1, Math.floor(Number(level) || 1));
  const expertOrHigher = keys.filter((key) => normalizeSkillRank(skills?.[key]?.rank) >= 3);

  for (const key of keys) {
    const rank = normalizeSkillRank(skills?.[key]?.rank);
    if (normalizedLevel <= 8 && rank > 3) issues.push({ code: "rank-level", skill: key, rank });
    if (normalizedLevel >= 9 && normalizedLevel <= 14 && rank > 4) issues.push({ code: "rank-level", skill: key, rank });
    if (rank === 5 && skillDefinitions[key]?.hasSpecializations !== false && !specializationSkillKeys.includes(key)) {
      issues.push({ code: "grand-master-specialization", skill: key, rank });
    }
  }

  if (normalizedLevel === 1 && expertOrHigher.length > 1) {
    issues.push({ code: "level-one-expert-limit", skills: expertOrHigher });
  }

  const cost = skillsPdCost(skills, keys);
  if (cost > Math.max(0, Number(pdTotal) || 0)) issues.push({ code: "skills-over-budget", cost, pdTotal });
  if (Math.max(0, Number(pdSpent) || 0) < cost) issues.push({ code: "pd-spent-below-skills", cost, pdSpent });

  return { cost, issues, valid: issues.length === 0 };
}

export async function migrateWorldSkills(skillDefinitions = {}) {
  if (!globalThis.game?.user?.isGM) return { actors: 0, items: 0, legacy: 0 };
  const canonicalKeys = new Set(Object.keys(skillDefinitions));
  let actors = 0;
  let items = 0;
  let legacy = 0;

  for (const actor of game.actors ?? []) {
    const source = actor.toObject().system ?? {};
    const storedSkills = source.skills ?? {};
    const updates = {};
    const legacySkills = { ...(source.legacySkills ?? {}) };
    let changed = false;

    for (const key of canonicalKeys) {
      if (Object.prototype.hasOwnProperty.call(storedSkills, key)) continue;
      updates["system.skills." + key] = { rank: 0, temporary: 0, other: 0 };
      changed = true;
    }
    for (const [key, value] of Object.entries(storedSkills)) {
      if (canonicalKeys.has(key)) continue;
      if (!Object.prototype.hasOwnProperty.call(legacySkills, key)) legacySkills[key] = value;
      updates["system.skills.-=" + key] = null;
      legacy += 1;
      changed = true;
    }
    if (Object.keys(legacySkills).length && JSON.stringify(legacySkills) !== JSON.stringify(source.legacySkills ?? {})) {
      updates["system.legacySkills"] = legacySkills;
      changed = true;
    }
    if (changed) {
      await actor.update(updates);
      actors += 1;
    }

    for (const item of actor.items ?? []) {
      if (await migrateSkillItem(item)) items += 1;
    }
  }

  for (const item of game.items ?? []) {
    if (await migrateSkillItem(item)) items += 1;
  }

  return { actors, items, legacy };
}

async function migrateSkillItem(item) {
  const updates = {};
  if (item.type === "specialization" && Number(item.system?.pdCost) === 2) {
    updates["system.pdCost"] = 1;
  }
  if (item.type === "spell") {
    const requirements = String(item.system?.requirements ?? "").trim();
    if (item.name === "Cierre Restaurador" && requirements === "Medicina") {
      updates["system.requirements"] = "";
    }
    if (item.name === "Visión Arcana" && requirements === "Arcana") {
      updates["system.requirements"] = "";
    }
    if (item.name === "Regeneración") {
      if (!item.system?.method || item.system.method === "direct") updates["system.method"] = "ritual";
      if (requirements === "Medicina") updates["system.requirements"] = "Medicina Entrenada";
      const skillRequirements = Array.isArray(item.system?.skillRequirements) ? item.system.skillRequirements : [];
      if (!skillRequirements.some((entry) => entry?.skill === "medicine" && Number(entry?.minRank) === 2)) {
        updates["system.skillRequirements"] = [{ skill: "medicine", minRank: 2 }];
      }
    }
  }
  if (!Object.keys(updates).length) return false;
  await item.update(updates);
  return true;
}
