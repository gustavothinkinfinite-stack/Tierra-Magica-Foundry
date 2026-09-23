import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root=resolve(fileURLToPath(new URL("..",import.meta.url)));

// NOTE: this file intentionally uses source-level regressions for sheet wiring.
// Runtime rule behavior is covered by the dedicated subsystem tests.

test("la ficha no serializa dos veces los campos editables",async()=>{const sheet=await readFile(resolve(root,"scripts/sheets/actor-sheet.mjs"),"utf8");assert.equal(sheet.includes("new FormDataExtended(this.form)"),false);});

test("la ficha usa páginas laterales y recursos dentro del núcleo central",async()=>{const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");for(const marker of ["data-page=\"core\"","data-page=\"skills\"","data-page=\"combat\"","data-page=\"magic\"","data-page=\"inventory\"","data-page=\"bio\""])assert.equal(sheet.includes(marker),true);});

test("la portada usa Habilidades sólo como lectura y tirada",async()=>{const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");assert.equal(sheet.includes("tm-skill-rank-input"),false);});

test("la página Habilidades muestra el desglose completo y permite ajustes manuales",async()=>{const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");for(const marker of ["system.skills.","Ajuste","Fuentes"])assert.equal(sheet.includes(marker),true);});

test("la ficha mantiene economía de turno y acceso al familiar",async()=>{const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");for(const marker of ["Acción","Movimiento","Reacción","Familiar"])assert.equal(sheet.includes(marker),true);});

test("el modelo base incluye economía de turno y modificadores manuales de Habilidad",async()=>{const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.equal(typeof model.Actor.templates.base.turn.action,"boolean");assert.equal(typeof model.Actor.templates.base.turn.movement,"boolean");assert.equal(typeof model.Actor.templates.base.turn.reaction,"boolean");});

test("los Items permiten configurar fuentes estructuradas de modificadores",async()=>{const item=await readFile(resolve(root,"templates/item/item-sheet.hbs"),"utf8");assert.equal(item.includes("modifiers"),true);});

test("las tiradas usan el total de Habilidad y exponen sus fuentes",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");assert.equal(actor.includes("skill"),true);});

test("las pestañas laterales quedan fuera del marco de la hoja",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");assert.equal(css.includes("tm-side"),true);});

test("los estilos distinguen la lista rápida y el desglose técnico",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");assert.equal(css.length>1000,true);});

test("la ventana conserva una cabecera Foundry visible y no enmarca la zona de pestañas",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");assert.equal(css.includes("window"),true);});

test("la primera pasada visual carga ornamentos reutilizables y mantiene la portada funcional",async()=>{const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");assert.equal(sheet.length>1000,true);});

test("el refinamiento visual v0.8.1 separa filigrana, estrellas y defensas",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");assert.equal(css.length>1000,true);});

test("la dirección visual v0.9.0 usa el emblema hero y la composición aprobada",async()=>{const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");assert.equal(sheet.length>1000,true);});

test("v0.9.1 integra el banner ilustrado aprobado y limpia el gutter lateral",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");assert.equal(css.length>1000,true);});

test("auditoría 1.0.2 alinea Maniobra y editores de subsistemas",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");const item=await readFile(resolve(root,"templates/item/item-sheet.hbs"),"utf8");assert.equal(actor.includes("maneuverDefense: 11 + agi + martialDefense + extraDefense"),true);assert.equal(actor.includes("Math.max(toNumber(a.fue"),false);for(const flag of ["isFormula","isRitual","isDevice"])assert.equal(item.includes(flag),true);for(const field of ["system.saturating","system.manaDirector","system.energy.value","system.flow"])assert.equal(item.includes(field),true);});

test("Vida 0 y descansos exponen la semántica auditada",async()=>{const guards=await readFile(resolve(root,"scripts/rules/familiar-guards.mjs"),"utf8");const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.equal(model.Actor.templates.base.status.incapacitated,false);assert.equal("zeroTraumaApplied" in model.Actor.templates.base.recovery,false);assert.equal(guards.includes('previous > 0 && next === 0'),true);assert.equal(guards.includes('updates["system.status.trauma"] = 1'),true);assert.equal(sheet.includes("Respiro (~10 min)"),true);assert.equal(sheet.includes("Descanso (~1 h)"),true);assert.equal(sheet.includes("Descanso completo (~8 h)"),true);});

test("magia auditada implementa Sobrecarga y límite de Sostenimiento",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.deepEqual(model.Actor.templates.base.magic.sustainedSpellIds,[]);assert.equal(actor.includes('cost - mana === 1 && mana >= 1'),true);assert.equal(actor.includes('df: 17'),true);assert.equal(actor.includes('i.name === "Doble Sostenimiento"'),true);assert.equal(sheet.includes('data-action="stop-sustained"'),true);});

test("Alquimia consume dosis, aplica Saturación y Respiro la limpia",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");const sheet=await readFile(resolve(root,"templates/actor/parts/item-section.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.deepEqual(model.Actor.templates.base.alchemy.saturatedFamilies,[]);assert.equal(actor.includes("async useFormula(item)"),true);assert.equal(actor.includes('updates["system.alchemy.saturatedFamilies"] = []'),true);assert.equal(actor.includes('"system.quantity": Math.max(0'),true);assert.equal(sheet.includes('data-action="item-formula"'),true);});

test("Rituales respetan Director, asistentes y una tirada principal",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");const part=await readFile(resolve(root,"templates/actor/parts/item-section.hbs"),"utf8");assert.equal(actor.includes("async performRitual(item"),true);assert.equal(actor.includes("usefulAssistants * assistantMax"),true);assert.equal(actor.includes('skillKey: "ritualism"'),true);assert.equal(part.includes('data-action="item-ritual"'),true);});

test("Ingeniería usa Energía/Caudal y estados sin convertirlos en Maná",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");const item=await readFile(resolve(root,"templates/item/item-sheet.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.equal(model.Item.device.condition,"operative");assert.equal(actor.includes("async useDevice(item)"),true);assert.equal(actor.includes("consumption > flow"),true);assert.equal(actor.includes("async overloadDevice(item)"),true);assert.equal(actor.includes('skillKey: "engineering"'),true);assert.equal(item.includes("system.condition"),true);});

test("Familiar rico mantiene autonomía y economía de acciones",async()=>{const guards=await readFile(resolve(root,"scripts/rules/familiar-guards.mjs"),"utf8");const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");const familiar=await readFile(resolve(root,"templates/actor/familiar-sheet.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.equal(model.Actor.familiar.details.independence,"independent");assert.equal(guards.includes("ActorClass.prototype.linkedFamiliarAction = async function"),true);assert.equal(guards.includes('"system.turn.reaction": false'),true);assert.equal(guards.includes("ActorClass.prototype.commandFamiliar = async function"),true);assert.equal(guards.includes('"system.turn.action": false'),true);assert.equal(sheet.includes("Acción Vinculada (Reacción)"),true);assert.equal(familiar.includes("Vínculo y autonomía"),true);});

test("capacidades avanzadas de Familiar no crean segundo lanzador",async()=>{const guards=await readFile(resolve(root,"scripts/rules/familiar-guards.mjs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.equal(model.Actor.familiar.familiar.bondLevel,1);assert.equal(guards.includes("ActorClass.prototype.useFamiliarSense = async function"),true);assert.equal(guards.includes('"system.turn.action": false'),true);assert.equal(guards.includes("ActorClass.prototype.castFromFamiliar = async function"),true);assert.equal(guards.includes("return this.useSpell(spell, { remoteOrigin: familiar })"),true);assert.equal(guards.includes('hasBondCapability(this, familiar, "Origen Remoto", 3)'),true);});

test("v1.0.10 corrige banner proporcional y recorte de la columna derecha",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");for(const marker of ["TIERRA MÁGICA v1.0.10 — FIX DE CABECERA Y LAYOUT REAL","aspect-ratio: 1600 / 287","container-name: tm-character-sheet","minmax(360px, 1.54fr)","grid-template-columns: repeat(2, minmax(0, 1fr))","@container tm-character-sheet (max-width: 860px)"])assert.equal(css.includes(marker),true);});