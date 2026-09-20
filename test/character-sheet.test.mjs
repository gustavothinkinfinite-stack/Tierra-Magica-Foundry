import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("la ficha no serializa dos veces los campos editables", async () => {
  const source = await readFile(resolve(root, "templates/actor/character-sheet.hbs"), "utf8");
  assert.equal(source.includes('name="system.details.level"'), false);
  assert.equal(source.includes('name="system.details.pdSpent"'), false);
  assert.equal(source.includes('name="system.skills.{{key}}.rank"'), false);
  assert.equal((source.match(/data-action="set-skill-rank"/g) ?? []).length, 1);
  assert.equal((source.match(/data-field="system.details.level"/g) ?? []).length, 1);
  assert.equal((source.match(/data-field="system.details.pdSpent"/g) ?? []).length, 1);
});

test("la ficha usa páginas laterales y recursos dentro del núcleo central", async () => {
  const source = await readFile(resolve(root, "templates/actor/character-sheet.hbs"), "utf8");
  const manifest = JSON.parse(await readFile(resolve(root, "system.json"), "utf8"));

  assert.equal(source.includes("tm-character-sheet-v03"), true);
  assert.equal(source.includes("tm-v03-page-tabs"), true);
  assert.equal(source.includes("tm-v03-resources"), true);
  assert.equal(source.includes("tm-v03-turn"), true);
  assert.equal(source.includes("<details"), false);
  assert.equal(source.includes("FOUNDRY T.M. · FICHA DE PERSONAJE"), false);
  assert.equal(source.includes("Fantasía medieval arcano-industrial"), false);

  for (const tab of ["summary", "skills", "combat", "magic", "development", "inventory", "biography"]) {
    assert.equal(source.includes(`data-tab="${tab}"`), true);
  }

  assert.equal(manifest.styles.includes("styles/character-sheet-v03.css"), true);
  await Promise.all([
    "styles/character-sheet-v03.css",
    "assets/ui/character-sheet-arcane.svg"
  ].map((file) => access(resolve(root, file))));
});

test("la portada usa Habilidades sólo como lectura y tirada", async () => {
  const source = await readFile(resolve(root, "templates/actor/character-sheet.hbs"), "utf8");
  const start = source.indexOf('<div class="tab" data-group="primary" data-tab="summary">');
  const end = source.indexOf('<div class="tab" data-group="primary" data-tab="skills">', start);
  const summary = source.slice(start, end);

  assert.equal(summary.includes("tm-v03-quick-skill-list"), true);
  assert.equal(summary.includes("tm-v03-quick-skill"), true);
  assert.equal(summary.includes("tm-v03-skill-group"), false);
  assert.equal(summary.includes("set-skill-rank"), false);
  assert.equal(summary.includes("set-skill-temporary"), false);
  assert.equal(summary.includes("set-skill-other"), false);

  const quickStart = summary.indexOf('<div class="tm-v03-quick-skill-list">');
  const quickEnd = summary.indexOf("</div>", quickStart);
  const quickSkills = summary.slice(quickStart, quickEnd);
  assert.equal(quickSkills.includes("<select"), false);
});

test("la página Habilidades muestra el desglose completo y permite ajustes manuales", async () => {
  const source = await readFile(resolve(root, "templates/actor/character-sheet.hbs"), "utf8");
  const start = source.indexOf('<div class="tab" data-group="primary" data-tab="skills">');
  const end = source.indexOf('<div class="tab" data-group="primary" data-tab="combat">', start);
  const skillsPage = source.slice(start, end);

  assert.equal(skillsPage.includes("tm-v03-skill-category"), true);
  assert.equal(skillsPage.includes("tm-v04-skill-detail"), true);
  assert.equal(skillsPage.includes("tm-v04-skill-breakdown"), true);
  assert.equal(skillsPage.includes("tm-v04-skill-sources"), true);
  assert.equal(skillsPage.includes('data-action="set-skill-rank"'), true);
  assert.equal(skillsPage.includes('data-action="set-skill-temporary"'), true);
  assert.equal(skillsPage.includes('data-action="set-skill-other"'), true);
  assert.equal(skillsPage.includes('data-action="clear-skill-temporaries"'), true);
  assert.equal(skillsPage.includes('data-action="skill-source-open"'), true);
  assert.equal(skillsPage.includes('data-action="roll-skill"'), true);
  assert.equal(skillsPage.includes("Especializaciones"), true);
  assert.equal(skillsPage.includes("Técnicas"), true);
});

test("la ficha mantiene economía de turno y acceso al familiar", async () => {
  const source = await readFile(resolve(root, "templates/actor/character-sheet.hbs"), "utf8");
  assert.equal(source.includes('data-action="toggle-turn"'), true);
  assert.equal(source.includes('data-action="reset-turn"'), true);
  assert.equal(source.includes('data-action="open-familiar"'), true);
});

test("el modelo base incluye economía de turno y modificadores manuales de Habilidad", async () => {
  const templates = JSON.parse(await readFile(resolve(root, "template.json"), "utf8"));
  assert.deepEqual(templates.Actor.templates.base.turn, {
    movement: true,
    action: true,
    reaction: true
  });

  for (const skill of Object.values(templates.Actor.templates.base.skills)) {
    assert.equal(skill.temporary, 0);
    assert.equal(skill.other, 0);
  }

  assert.deepEqual(templates.Item.templates.base.skillModifiers, []);
  assert.equal(templates.Item.templates.base.skillModifiersActive, true);
  assert.equal(templates.Item.spell.skillModifiersActive, false);
});

test("los Items permiten configurar fuentes estructuradas de modificadores", async () => {
  const template = await readFile(resolve(root, "templates/item/item-sheet.hbs"), "utf8");
  const sheet = await readFile(resolve(root, "scripts/sheets/item-sheet.mjs"), "utf8");

  assert.equal(template.includes("Modificadores de Habilidad"), true);
  assert.equal(template.includes('name="system.skillModifiersActive"'), true);
  assert.equal(template.includes('data-action="skill-modifier-add"'), true);
  assert.equal(template.includes('data-action="skill-modifier-delete"'), true);
  assert.equal(template.includes('data-action="skill-modifier-field"'), true);

  assert.equal(sheet.includes("#addSkillModifier"), true);
  assert.equal(sheet.includes("#deleteSkillModifier"), true);
  assert.equal(sheet.includes("#updateSkillModifier"), true);
});

test("las tiradas usan el total de Habilidad y exponen sus fuentes", async () => {
  const actor = await readFile(resolve(root, "scripts/documents/actor.mjs"), "utf8");
  assert.equal(actor.includes("skill.breakdown = this.#buildSkillBreakdown"), true);
  assert.equal(actor.includes("skill.bonus = skill.breakdown.total"), true);
  assert.equal(actor.includes("const skill = skillData ? toNumber(skillData.bonus) : 0;"), true);
  assert.equal(actor.includes("#skillModifierItemActive"), true);
  assert.equal(actor.includes("#skillBreakdownHtml"), true);
  assert.equal(actor.includes("skillModifiers"), true);
});

test("las pestañas laterales quedan fuera del marco de la hoja", async () => {
  const css = await readFile(resolve(root, "styles/character-sheet-v03.css"), "utf8");
  assert.equal(css.includes("width: calc(100% - 92px);"), true);
  assert.equal(css.includes("margin-right: 92px;"), true);
  assert.equal(css.includes("right: -82px;"), true);
  assert.equal(css.includes("border-radius: 0 17px 17px 0;"), true);
  assert.equal(css.includes("clip-path: none;"), true);
  assert.equal(css.includes("transform: translateX(8px);"), true);
  assert.equal(css.includes(".window-content:has(form.tm-character-sheet-v03)"), true);
  assert.equal(css.includes("padding-right: 88px;"), false);
});

test("los estilos distinguen la lista rápida y el desglose técnico", async () => {
  const css = await readFile(resolve(root, "styles/character-sheet-v03.css"), "utf8");
  assert.equal(css.includes(".tm-v03-quick-skill-list"), true);
  assert.equal(css.includes(".tm-v03-quick-skill"), true);
  assert.equal(css.includes(".tm-v04-skill-detail"), true);
  assert.equal(css.includes(".tm-v04-skill-breakdown"), true);
  assert.equal(css.includes(".tm-v04-source-list"), true);
});
