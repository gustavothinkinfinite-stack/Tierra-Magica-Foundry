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
  for (const tab of ["summary", "skills", "combat", "magic", "development", "inventory", "biography"]) assert.equal(source.includes(`data-tab="${tab}"`), true);
  assert.equal(manifest.styles.includes("styles/character-sheet-v03.css"), true);
  await Promise.all(["styles/character-sheet-v03.css", "assets/ui/character-sheet-arcane.svg"].map((file) => access(resolve(root, file))));
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
  assert.equal(summary.slice(quickStart, quickEnd).includes("<select"), false);
});

test("la página Habilidades muestra el desglose completo y permite ajustes manuales", async () => {
  const source = await readFile(resolve(root, "templates/actor/character-sheet.hbs"), "utf8");
  const start = source.indexOf('<div class="tab" data-group="primary" data-tab="skills">');
  const end = source.indexOf('<div class="tab" data-group="primary" data-tab="combat">', start);
  const skillsPage = source.slice(start, end);
  for (const marker of ["tm-v03-skill-category","tm-v04-skill-detail","tm-v04-skill-breakdown","tm-v04-skill-sources",'data-action="set-skill-rank"','data-action="set-skill-temporary"','data-action="set-skill-other"','data-action="clear-skill-temporaries"','data-action="skill-source-open"','data-action="roll-skill"',"Especializaciones","Técnicas"]) assert.equal(skillsPage.includes(marker), true);
});

test("la ficha mantiene economía de turno y acceso al familiar", async () => { const source=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8"); for(const marker of ['data-action="toggle-turn"','data-action="reset-turn"','data-action="open-familiar"']) assert.equal(source.includes(marker),true); });

test("el modelo base incluye economía de turno y modificadores manuales de Habilidad", async () => { const templates=JSON.parse(await readFile(resolve(root,"template.json"),"utf8")); assert.deepEqual(templates.Actor.templates.base.turn,{movement:true,action:true,reaction:true}); for(const skill of Object.values(templates.Actor.templates.base.skills)){assert.equal(skill.temporary,0);assert.equal(skill.other,0);} assert.deepEqual(templates.Item.templates.base.skillModifiers,[]); assert.equal(templates.Item.templates.base.skillModifiersActive,true); assert.equal(templates.Item.spell.skillModifiersActive,false); });

test("los Items permiten configurar fuentes estructuradas de modificadores",async()=>{const template=await readFile(resolve(root,"templates/item/item-sheet.hbs"),"utf8");const sheet=await readFile(resolve(root,"scripts/sheets/item-sheet.mjs"),"utf8");for(const marker of ["Modificadores de Habilidad",'name="system.skillModifiersActive"','data-action="skill-modifier-add"','data-action="skill-modifier-delete"','data-action="skill-modifier-field"'])assert.equal(template.includes(marker),true);for(const marker of ["#addSkillModifier","#deleteSkillModifier","#updateSkillModifier"])assert.equal(sheet.includes(marker),true);});

test("las tiradas usan el total de Habilidad y exponen sus fuentes",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");for(const marker of ["skill.breakdown = this.#buildSkillBreakdown","skill.bonus = skill.breakdown.total","const skill = skillData ? toNumber(skillData.bonus) : 0;","#skillModifierItemActive","#skillBreakdownHtml","skillModifiers"])assert.equal(actor.includes(marker),true);});

test("las pestañas laterales quedan fuera del marco de la hoja",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");for(const marker of ["width: calc(100% - 92px);","margin-right: 92px;","right: -82px;","border-radius: 0 17px 17px 0;","clip-path: none;","transform: translateX(8px);",".tierra-magica:has(form.tm-character-sheet-v03) > .window-content"])assert.equal(css.includes(marker),true);assert.equal(css.includes("padding-right: 88px;"),false);});

test("los estilos distinguen la lista rápida y el desglose técnico",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");for(const marker of [".tm-v03-quick-skill-list",".tm-v03-quick-skill",".tm-v04-skill-detail",".tm-v04-skill-breakdown",".tm-v04-source-list"])assert.equal(css.includes(marker),true);});

test("la ventana conserva una cabecera Foundry visible y no enmarca la zona de pestañas",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");for(const marker of [".tierra-magica:has(form.tm-character-sheet-v03) > .window-header","width: calc(100% - 92px);","margin-right: 92px;","border: 0 !important;","box-shadow: none !important;","padding: 6px 0 0;","border-radius: 6px 6px 0 0;"])assert.equal(css.includes(marker),true);});

test("la primera pasada visual carga ornamentos reutilizables y mantiene la portada funcional",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");for(const marker of ["TIERRA MÁGICA v0.8 — PRIMERA PASADA VISUAL",'url("../assets/ui/sheet-filigree.svg")','url("../assets/ui/sheet-corner.svg")','url("../assets/ui/attribute-medallion.svg")','.tab[data-tab="summary"] .tm-v03-panel',".tm-v03-character-stage",".tm-v03-resource",".tm-v03-page-tabs .item.active"])assert.equal(css.includes(marker),true);await Promise.all(["assets/ui/sheet-filigree.svg","assets/ui/sheet-corner.svg","assets/ui/attribute-medallion.svg"].map(file=>access(resolve(root,file))));});

test("el refinamiento visual v0.8.1 separa filigrana, estrellas y defensas",async()=>{const source=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");assert.equal(source.includes('class="tm-v03-stage-stars"'),true);for(const marker of ["TIERRA MÁGICA v0.8.1 — REFINAMIENTO VISUAL DE FICHA",".tm-v03-header::after",".tm-v03-stage-stars",".tm-v03-stage-ring::before",".tm-v03-defense-grid > div","border-radius: 999px;",".tm-v03-right-rail .tm-v03-panel-heading h2::before"])assert.equal(css.includes(marker),true);});

test("la dirección visual v0.9.0 usa el emblema hero y la composición aprobada",async()=>{const source=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");for(const marker of ['class="tm-v03-header tm-v09-header"',"tm-v09-title-art",'class="tm-v09-motto"','class="tm-v09-defense','fa-book-open','fa-shield-halved'])assert.equal(source.includes(marker),true);for(const marker of ["TIERRA MÁGICA v0.9.0 — DIRECCIÓN VISUAL MAYOR",".tm-v09-title-art",".tm-v09-motto",".tm-v09-defense","width: calc(100% - 112px);","right: -102px;","grid-template-columns: 290px minmax(500px,1fr) 302px;"])assert.equal(css.includes(marker),true);await access(resolve(root,"assets/ui/sheet-title-hero.svg"));});

test("v0.9.1 integra el banner ilustrado aprobado y limpia el gutter lateral",async()=>{const source=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");for(const marker of ["assets/ui/tierra-magica-banner-final.jpg","tm-v091-title-art"])assert.equal(source.includes(marker),true);for(const marker of ["TIERRA MÁGICA v0.9.1 — BANNER ILUSTRADO Y ORNAMENTACIÓN",".tm-v091-title-art",".tm-v03-page-tabs::after","content: none !important;",".tm-v03-defense-grid .tm-v09-defense"])assert.equal(css.includes(marker),true);await access(resolve(root,"assets/ui/tierra-magica-banner-final.jpg"));});

test("auditoría 1.0.2 alinea Maniobra y editores de subsistemas",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");const item=await readFile(resolve(root,"templates/item/item-sheet.hbs"),"utf8");assert.equal(actor.includes("maneuverDefense: 11 + agi + martialDefense + extraDefense"),true);assert.equal(actor.includes("Math.max(toNumber(a.fue"),false);for(const flag of ["isFormula","isRitual","isDevice"])assert.equal(item.includes(flag),true);for(const field of ["system.saturating","system.manaDirector","system.energy.value","system.flow"])assert.equal(item.includes(field),true);});

test("Vida 0 y descansos exponen la semántica auditada",async()=>{const guards=await readFile(resolve(root,"scripts/rules/familiar-guards.mjs"),"utf8");const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.equal(model.Actor.templates.base.status.incapacitated,false);assert.equal("zeroTraumaApplied" in model.Actor.templates.base.recovery,false);assert.equal(guards.includes('previous > 0 && next === 0'),true);assert.equal(guards.includes('updates["system.status.trauma"] = 1'),true);assert.equal(sheet.includes("Respiro (~10 min)"),true);assert.equal(sheet.includes("Descanso (~1 h)"),true);assert.equal(sheet.includes("Descanso completo (~8 h)"),true);});

test("magia auditada implementa Sobrecarga y límite de Sostenimiento",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.deepEqual(model.Actor.templates.base.magic.sustainedSpellIds,[]);assert.equal(actor.includes('cost - mana === 1 && mana >= 1'),true);assert.equal(actor.includes('df: 17'),true);assert.equal(actor.includes('i.name === "Doble Sostenimiento"'),true);assert.equal(sheet.includes('data-action="stop-sustained"'),true);});

test("Alquimia consume dosis, aplica Saturación y Respiro la limpia",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");const sheet=await readFile(resolve(root,"templates/actor/parts/item-section.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.deepEqual(model.Actor.templates.base.alchemy.saturatedFamilies,[]);assert.equal(actor.includes("async useFormula(item)"),true);assert.equal(actor.includes('updates["system.alchemy.saturatedFamilies"] = []'),true);assert.equal(actor.includes('"system.quantity": Math.max(0'),true);assert.equal(sheet.includes('data-action="item-formula"'),true);});

test("Rituales respetan Director, asistentes y una tirada principal",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");const part=await readFile(resolve(root,"templates/actor/parts/item-section.hbs"),"utf8");assert.equal(actor.includes("async performRitual(item"),true);assert.equal(actor.includes("usefulAssistants * assistantMax"),true);assert.equal(actor.includes('skillKey: "ritualism"'),true);assert.equal(part.includes('data-action="item-ritual"'),true);});

test("Ingeniería usa Energía/Caudal y estados sin convertirlos en Maná",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");const item=await readFile(resolve(root,"templates/item/item-sheet.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.equal(model.Item.device.condition,"operative");assert.equal(actor.includes("async useDevice(item)"),true);assert.equal(actor.includes("consumption > flow"),true);assert.equal(actor.includes("async overloadDevice(item)"),true);assert.equal(actor.includes('skillKey: "engineering"'),true);assert.equal(item.includes("system.condition"),true);});

test("Familiar rico mantiene autonomía y economía de acciones",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");const familiar=await readFile(resolve(root,"templates/actor/familiar-sheet.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.equal(model.Actor.familiar.details.independence,"independent");assert.equal(actor.includes("async linkedFamiliarAction"),true);assert.equal(actor.includes('"system.turn.reaction": false'),true);assert.equal(actor.includes("async commandFamiliar"),true);assert.equal(actor.includes('"system.turn.action": false'),true);assert.equal(sheet.includes("Acción Vinculada (Reacción)"),true);assert.equal(familiar.includes("Vínculo y autonomía"),true);});

test("capacidades avanzadas de Familiar no crean segundo lanzador",async()=>{const guards=await readFile(resolve(root,"scripts/rules/familiar-guards.mjs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.equal(model.Actor.familiar.familiar.bondLevel,1);assert.equal(guards.includes("ActorClass.prototype.useFamiliarSense = async function"),true);assert.equal(guards.includes('"system.turn.action": false'),true);assert.equal(guards.includes("ActorClass.prototype.castFromFamiliar = async function"),true);assert.equal(guards.includes("return this.useSpell(spell, { remoteOrigin: familiar })"),true);assert.equal(guards.includes('hasBondCapability(this, familiar, "Origen Remoto", 3)'),true);});

test("v1.0.10 corrige banner proporcional y recorte de la columna derecha",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");for(const marker of ["TIERRA MÁGICA v1.0.10 — FIX DE CABECERA Y LAYOUT REAL","aspect-ratio: 1600 / 287","container-name: tm-character-sheet","minmax(360px, 1.54fr)","grid-template-columns: repeat(2, minmax(0, 1fr))","@container tm-character-sheet (max-width: 860px)"])assert.equal(css.includes(marker),true);});
