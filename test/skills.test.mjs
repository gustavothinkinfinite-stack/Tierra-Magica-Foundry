import assert from "node:assert/strict";
import test from "node:test";
import { TM_CONFIG } from "../scripts/config.mjs";
import {
  minimumSpellRank,
  meetsSkillRequirements,
  skillRankCost,
  skillsPdCost,
  spellOperationalSkill,
  validateSkillProgression
} from "../scripts/rules/skills.mjs";

test("CREA-10 fija 26 Habilidades en 8 categorías", () => {
  assert.equal(Object.keys(TM_CONFIG.skills).length, 26);
  assert.equal(new Set(Object.values(TM_CONFIG.skills).map((skill) => skill.group)).size, 8);
  assert.deepEqual(TM_CONFIG.skillGroupOrder, [
    "Físicas", "Exploración", "Sociales", "Conocimiento",
    "Técnicas", "Combate", "Magia", "Operación"
  ]);
});

test("costes y bonos de rango son únicos y deterministas", () => {
  assert.deepEqual(TM_CONFIG.rankBonuses, [0, 1, 2, 4, 6, 8]);
  assert.deepEqual(TM_CONFIG.rankCosts, [0, 1, 3, 7, 13, 21]);
  assert.deepEqual([0,1,2,3,4,5].map(skillRankCost), [0,1,3,7,13,21]);
  assert.equal(skillsPdCost({ athletics:{rank:3}, medicine:{rank:2} }, ["athletics","medicine"]), 10);
});

test("nivel 1 no admite dos Expertas ni Maestro", () => {
  const skills = Object.fromEntries(Object.keys(TM_CONFIG.skills).map((key) => [key, { rank: 0 }]));
  skills.athletics.rank = 3;
  skills.medicine.rank = 3;
  const result = validateSkillProgression({
    skills, skillDefinitions: TM_CONFIG.skills, level: 1, pdSpent: 14, pdTotal: 25
  });
  assert.ok(result.issues.some((issue) => issue.code === "level-one-expert-limit"));
  skills.medicine.rank = 4;
  const master = validateSkillProgression({
    skills, skillDefinitions: TM_CONFIG.skills, level: 1, pdSpent: 20, pdTotal: 25
  });
  assert.ok(master.issues.some((issue) => issue.code === "rank-level"));
});

test("Gran Maestro exige Especialización salvo Habilidades sin catálogo", () => {
  const skills = Object.fromEntries(Object.keys(TM_CONFIG.skills).map((key) => [key, { rank: 0 }]));
  skills.medicine.rank = 5;
  let result = validateSkillProgression({
    skills, skillDefinitions: TM_CONFIG.skills, level: 15, pdSpent: 21, pdTotal: 81
  });
  assert.ok(result.issues.some((issue) => issue.code === "grand-master-specialization"));

  result = validateSkillProgression({
    skills, skillDefinitions: TM_CONFIG.skills, level: 15, pdSpent: 22, pdTotal: 81,
    specializations: [{ skill: "medicine", name: "Cirugía" }]
  });
  assert.equal(result.issues.some((issue) => issue.code === "grand-master-specialization"), false);

  skills.medicine.rank = 0;
  skills.channeling.rank = 5;
  result = validateSkillProgression({
    skills, skillDefinitions: TM_CONFIG.skills, level: 15, pdSpent: 21, pdTotal: 81
  });
  assert.equal(result.issues.some((issue) => issue.code === "grand-master-specialization"), false);
});

test("Especializaciones requieren Entrenado, no se duplican y tienen máximo inicial 2", () => {
  const skills = Object.fromEntries(Object.keys(TM_CONFIG.skills).map((key) => [key, { rank: 0 }]));
  skills.medicine.rank = 1;
  let result = validateSkillProgression({
    skills, skillDefinitions: TM_CONFIG.skills, level: 1, pdSpent: 1, pdTotal: 25,
    specializations: [{ skill: "medicine", name: "Cirugía" }], creationActive: true
  });
  assert.ok(result.issues.some((issue) => issue.code === "specialization-parent-rank"));

  skills.medicine.rank = 2;
  result = validateSkillProgression({
    skills, skillDefinitions: TM_CONFIG.skills, level: 1, pdSpent: 6, pdTotal: 25,
    specializations: [
      { skill: "medicine", name: "Cirugía" },
      { skill: "medicine", name: "Toxicología" },
      { skill: "medicine", name: "Cirugía" }
    ], creationActive: true
  });
  assert.ok(result.issues.some((issue) => issue.code === "specialization-creation-limit"));
  assert.ok(result.issues.some((issue) => issue.code === "specialization-duplicate"));
});

test("requisitos usan rango base y Método decide Canalización o Ritualismo", () => {
  const skills = { medicine:{rank:1}, channeling:{rank:5}, ritualism:{rank:3} };
  assert.equal(meetsSkillRequirements(skills, [{skill:"medicine",minRank:2}]), false);
  skills.medicine.rank = 2;
  assert.equal(meetsSkillRequirements(skills, [{skill:"medicine",minRank:2}]), true);
  assert.equal(spellOperationalSkill("direct"), "channeling");
  assert.equal(spellOperationalSkill("ritual"), "ritualism");
  assert.equal(minimumSpellRank("basic"), 2);
  assert.equal(minimumSpellRank("advanced"), 3);
  assert.equal(minimumSpellRank("master"), 4);
  assert.equal(minimumSpellRank("legendary"), 5);
});
