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
  const start = source.indexOf('data-tab="summary"');
  const end = source.indexOf('data-tab="skills"', start + 1);
  const summary = source.slice(start, end);

  assert.equal(summary.includes("tm-v03-quick-skill-list"), true);
  assert.equal(summary.includes("tm-v03-quick-skill"), true);
  assert.equal(summary.includes("tm-v03-skill-group"), false);
  assert.equal(summary.includes("set-skill-rank"), false);
  assert.equal(summary.includes("<select"), false);
});

test("la página Habilidades contiene categorías, edición de rango y tiradas", async () => {
  const source = await readFile(resolve(root, "templates/actor/character-sheet.hbs"), "utf8");
  const start = source.indexOf('<div class="tab" data-group="primary" data-tab="skills">');
  const end = source.indexOf('<div class="tab" data-group="primary" data-tab="combat">', start);
  const skillsPage = source.slice(start, end);

  assert.equal(skillsPage.includes("tm-v03-skill-category"), true);
  assert.equal(skillsPage.includes("tm-v03-skill-manage-row"), true);
  assert.equal(skillsPage.includes('data-action="set-skill-rank"'), true);
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

test("el modelo base incluye la economía de turno", async () => {
  const templates = JSON.parse(await readFile(resolve(root, "template.json"), "utf8"));
  assert.deepEqual(templates.Actor.templates.base.turn, {
    movement: true,
    action: true,
    reaction: true
  });
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

test("los estilos distinguen la lista rápida de la página de gestión", async () => {
  const css = await readFile(resolve(root, "styles/character-sheet-v03.css"), "utf8");
  assert.equal(css.includes(".tm-v03-quick-skill-list"), true);
  assert.equal(css.includes(".tm-v03-quick-skill"), true);
  assert.equal(css.includes(".tm-v03-skills-page"), true);
  assert.equal(css.includes(".tm-v03-skill-manage-row"), true);
});
