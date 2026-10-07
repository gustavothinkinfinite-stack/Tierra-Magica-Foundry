import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root=resolve(fileURLToPath(new URL("..",import.meta.url)));

// NOTE: this file intentionally uses source-level regressions for sheet wiring.
// Runtime rule behavior is covered by the dedicated subsystem tests.

test("la ficha no serializa dos veces los campos editables",async()=>{const sheet=await readFile(resolve(root,"scripts/sheets/actor-sheet.mjs"),"utf8");assert.equal(sheet.includes("new FormDataExtended(this.form)"),false);});

test("la ficha usa páginas laterales y recursos dentro del núcleo central",async()=>{const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");for(const marker of ["data-tab=\"summary\"","data-tab=\"skills\"","data-tab=\"combat\"","data-tab=\"magic\"","data-tab=\"inventory\"","data-tab=\"biography\"","tm-v03-resources"])assert.equal(sheet.includes(marker),true);});

test("la portada usa Habilidades sólo como lectura y tirada",async()=>{const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");assert.equal(sheet.includes("tm-skill-rank-input"),false);});

test("la página Habilidades muestra el desglose completo y permite ajustes manuales",async()=>{const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");for(const marker of ["system.skills.","Ajuste","Fuentes"])assert.equal(sheet.includes(marker),true);});

test("la ficha mantiene economía de turno y acceso al familiar",async()=>{const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");for(const marker of ["Acción","Movimiento","Reacción","Familiar"])assert.equal(sheet.includes(marker),true);});

test("el modelo base incluye economía de turno cuantificada y modificadores manuales estructurados",async()=>{const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));const base=model.Actor.templates.base;assert.equal(typeof base.turn.action,"boolean");assert.equal(typeof base.turn.movementSpent,"number");assert.equal(typeof base.turn.extraMovement,"number");assert.equal(typeof base.turn.reaction,"boolean");assert.equal(base.movement.base,6);assert.equal(base.modifiers.manual.movement.selector,"movement");assert.equal(base.modifiers.manual.initiativeModifier.selector,"initiativeModifier");});

test("los Items permiten configurar fuentes estructuradas de modificadores",async()=>{const item=await readFile(resolve(root,"templates/item/item-sheet.hbs"),"utf8");assert.equal(item.includes("modifiers"),true);});

test("las tiradas usan el total de Habilidad y exponen sus fuentes",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");assert.equal(actor.includes("skill"),true);});

test("las pestañas laterales quedan fuera del marco de la hoja",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");assert.equal(css.includes(".tm-v03-page-tabs"),true);assert.equal(css.includes("margin-right: 92px"),true);assert.equal(css.includes("overflow: visible"),true);});

test("los estilos distinguen la lista rápida y el desglose técnico",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");assert.equal(css.length>1000,true);});

test("la ventana conserva una cabecera Foundry visible y no enmarca la zona de pestañas",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");assert.equal(css.includes("window"),true);});

test("la primera pasada visual carga ornamentos reutilizables y mantiene la portada funcional",async()=>{const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");assert.equal(sheet.length>1000,true);});

test("el refinamiento visual v0.8.1 separa filigrana, estrellas y defensas",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");assert.equal(css.length>1000,true);});

test("la dirección visual v0.9.0 usa el emblema hero y la composición aprobada",async()=>{const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");assert.equal(sheet.length>1000,true);});

test("v0.9.1 integra el banner ilustrado aprobado y limpia el gutter lateral",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");assert.equal(css.length>1000,true);});

test("auditoría 1.0.2 alinea Maniobra y editores de subsistemas",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");const item=await readFile(resolve(root,"templates/item/item-sheet.hbs"),"utf8");assert.equal(actor.includes("deriveActorState({"),true);assert.equal(actor.includes("Math.max(toNumber(a.fue"),false);for(const flag of ["isFormula","isRitual","isDevice"])assert.equal(item.includes(flag),true);for(const field of ["system.saturating","system.manaDirector","system.energy.value","system.flow"])assert.equal(item.includes(field),true);});

test("Vida 0 y descansos exponen la semántica auditada",async()=>{const guards=await readFile(resolve(root,"scripts/rules/familiar-guards.mjs"),"utf8");const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.equal(model.Actor.templates.base.status.incapacitated,false);assert.equal("zeroTraumaApplied" in model.Actor.templates.base.recovery,false);assert.equal(guards.includes('previous > 0 && next === 0'),true);assert.equal(guards.includes('updates["system.status.trauma"] = 1'),true);assert.equal(sheet.includes("Respiro (~10 min)"),true);assert.equal(sheet.includes("Descanso (~1 h)"),true);assert.equal(sheet.includes("Descanso completo (~8 h)"),true);});

test("magia auditada implementa Sobrecarga y límite de Sostenimiento",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.deepEqual(model.Actor.templates.base.magic.sustainedSpellIds,[]);assert.equal(actor.includes('cost - mana === 1 && mana >= 1'),true);assert.equal(actor.includes('df: 17'),true);assert.equal(actor.includes('"doble-sostenimiento"'),true);assert.equal(sheet.includes('data-action="stop-sustained"'),true);});

test("Alquimia consume dosis, aplica Saturación y Respiro la limpia",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");const sheet=await readFile(resolve(root,"templates/actor/parts/item-section.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.deepEqual(model.Actor.templates.base.alchemy.saturatedFamilies,[]);assert.equal(actor.includes("async useFormula(item)"),true);assert.equal(actor.includes('updates["system.alchemy.saturatedFamilies"] = []'),true);assert.equal(actor.includes('"system.quantity": Math.max(0'),true);assert.equal(sheet.includes('data-action="item-formula"'),true);});

test("Rituales respetan Director, asistentes y una tirada principal",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");const part=await readFile(resolve(root,"templates/actor/parts/item-section.hbs"),"utf8");assert.equal(actor.includes("async performRitual(item"),true);assert.equal(actor.includes("usefulAssistants * assistantMax"),true);assert.equal(actor.includes('skillKey: "ritualism"'),true);assert.equal(part.includes('data-action="item-ritual"'),true);});

test("Ingeniería usa fuente explícita de Energía/Caudal y estados sin convertirlos en Maná",async()=>{const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");const item=await readFile(resolve(root,"templates/item/item-sheet.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.equal(model.Item.device.condition,"operative");assert.equal(model.Item.device.energySourceItemId,"");assert.equal(model.Item.device.activation,"Acción");assert.equal(actor.includes("resolveDeviceEnergySupply(this, item)"),true);assert.equal(actor.includes("withDeviceEnergyLock"),true);assert.equal(actor.includes("async overloadDevice(item)"),true);assert.equal(actor.includes('skillKey: "engineering"'),true);assert.equal(item.includes("system.energySourceItemId"),true);assert.equal(item.includes("system.activation"),true);});

test("Familiar rico mantiene autonomía y economía de acciones",async()=>{const guards=await readFile(resolve(root,"scripts/rules/familiar-guards.mjs"),"utf8");const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");const familiar=await readFile(resolve(root,"templates/actor/familiar-sheet.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.equal(model.Actor.familiar.details.independence,"independent");assert.equal(guards.includes("ActorClass.prototype.linkedFamiliarAction = async function"),true);assert.equal(guards.includes('"system.turn.reaction": false'),true);assert.equal(guards.includes("ActorClass.prototype.commandFamiliar = async function"),true);assert.equal(guards.includes('"system.turn.action": false'),true);assert.equal(sheet.includes("Acción Vinculada (Reacción)"),true);assert.equal(familiar.includes("Vínculo y autonomía"),true);});

test("capacidades avanzadas de Familiar no crean segundo lanzador",async()=>{const guards=await readFile(resolve(root,"scripts/rules/familiar-guards.mjs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.equal(model.Actor.familiar.familiar.bondLevel,1);assert.equal(guards.includes("ActorClass.prototype.useFamiliarSense = async function"),true);assert.equal(guards.includes('"system.turn.action": false'),true);assert.equal(guards.includes("ActorClass.prototype.castFromFamiliar = async function"),true);assert.equal(guards.includes("return this.useSpell(spell, { remoteOrigin: familiar })"),true);assert.equal(guards.includes('hasBondCapability(this, familiar, "Origen Remoto", 3)'),true);});

test("v1.0.10 corrige banner proporcional y recorte de la columna derecha",async()=>{const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");for(const marker of ["TIERRA MÁGICA v1.0.10 — FIX DE CABECERA Y LAYOUT REAL","aspect-ratio: 1600 / 287","container-name: tm-character-sheet","minmax(360px, 1.54fr)","grid-template-columns: repeat(2, minmax(0, 1fr))","@container tm-character-sheet (max-width: 860px)"])assert.equal(css.includes(marker),true);});

test("CREA-09 usa saldo único en cobres y no persiste oro/plata/cobre independientes",async()=>{const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));assert.equal(model.Actor.templates.base.currency.totalCopper,0);assert.equal("crowns" in model.Actor.templates.base.currency,false);assert.equal(sheet.includes('name="system.currency.gold"'),false);assert.equal(sheet.includes('data-denomination="gold"'),true);assert.equal(sheet.includes("Reserva inicial: 2 o"),true);});

test("CREA-09 representa precios con cobre y Unidad Comercial",async()=>{const item=await readFile(resolve(root,"templates/item/item-sheet.hbs"),"utf8");const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));for(const field of ["priceCopper","priceQuantity","priceStatus"])assert.equal(field in model.Item.templates.physical,true);assert.equal("price" in model.Item.templates.base,false);for(const field of ["system.priceCopper","system.priceQuantity","system.priceStatus"])assert.equal(item.includes(field),true);});

test("CREA-10 sincroniza modelo, ficha y Actor con la lista canónica",async()=>{
  const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");
  const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");
  const item=await readFile(resolve(root,"templates/item/item-sheet.hbs"),"utf8");
  const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));
  assert.equal(Object.keys(model.Actor.templates.base.skills).length,26);
  assert.equal("pdCost" in model.Item.specialization,false);
  assert.deepEqual(model.Item.templates.base.rules,[]);
  assert.equal(model.Item.templates.base.requirements,null);
  assert.equal(model.Item.spell.method,"direct");
  assert.equal(actor.includes("#meetsSkillRequirement"),false);
  assert.equal(actor.includes("async setSkillRank"),true);
  assert.equal(actor.includes("spellOperationalSkill(method)"),true);
  assert.equal(sheet.includes("PD en Habilidades"),true);
  assert.equal(item.includes("Requisitos de Habilidad"),true);
  assert.equal(item.includes("system.method"),true);
});

test("CREA-11 itemiza identidad y unifica adquisición/reglas",async()=>{
  const actor=await readFile(resolve(root,"scripts/documents/actor.mjs"),"utf8");
  const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");
  const item=await readFile(resolve(root,"templates/item/item-sheet.hbs"),"utf8");
  const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));
  for(const type of ["ancestry","origin","background","discipline","effect"])assert.equal(model.Item.types.includes(type),true);
  assert.equal(model.Actor.character.creation.status,"building");
  assert.equal(sheet.includes("Elegir Ascendencia"),true);
  assert.equal(sheet.includes('data-action="complete-creation"'),true);
  assert.equal(sheet.includes('data-action="set-creation-attribute"'),true);
  assert.equal(sheet.includes('max="3"'),true);
  assert.equal(sheet.includes("system.details.ancestry"),false);
  assert.equal(actor.includes("async acquireItem"),true);
  assert.equal(actor.includes("async completeCreation"),true);
  assert.equal(item.includes("Costes de catálogo"),true);
  assert.equal(item.includes("system.skillModifiersActive"),false);
});


test("CREA-12 retira controles binarios y campos manuales legados de la ficha",async()=>{
  const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");
  assert.equal(sheet.includes('data-key="movement"'),false);
  assert.equal(sheet.includes('data-action="spend-movement"'),true);
  for(const legacy of ["system.combat.defenseBonus","system.combat.protectionBonus","system.combat.movementBonus","system.combat.initiativeBonus"]) {
    assert.equal(sheet.includes(legacy),false,legacy);
  }
  assert.equal(sheet.includes("system.modifiers.manual.defensiveBonus.value"),true);
  assert.equal(sheet.includes("system.modifiers.manual.initiativeModifier.value"),true);
});


test("CREA-12 3E expone diagnóstico derivado de sólo lectura en todas las fichas",async()=>{
  const logic=await readFile(resolve(root,"scripts/sheets/actor-sheet.mjs"),"utf8");
  const character=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");
  const shared=await readFile(resolve(root,"templates/actor/parts/actor-sheet.hbs"),"utf8");
  const diagnostics=await readFile(resolve(root,"templates/actor/parts/derived-diagnostics.hbs"),"utf8");
  const entry=await readFile(resolve(root,"scripts/tierra-magica.mjs"),"utf8");

  assert.equal(logic.includes("context.derivedDiagnostics = this.#buildDerivedDiagnostics()"),true);
  assert.equal(logic.includes('"Sólo con frente confirmado"'),true);
  assert.equal(logic.includes('"Sólo contra ataque parable"'),true);
  assert.equal(logic.includes('"Sólo si la categoría es coherente con Piel Alterada"'),true);
  assert.equal(character.includes('parts/derived-diagnostics.hbs'),true);
  assert.equal(shared.includes('parts/derived-diagnostics.hbs'),true);
  assert.equal(entry.includes('parts/derived-diagnostics.hbs'),true);
  assert.equal(diagnostics.includes("Fuentes aplicadas"),true);
  assert.equal(diagnostics.includes("Condicionales no incluidos en el total universal"),true);
  assert.equal(diagnostics.includes("Incidencias"),true);
  assert.equal(diagnostics.includes('name="system.'),false);
  assert.equal(diagnostics.includes("data-action="),false);
});

test("CREA-12 3E muestra el Bono Defensivo total y no sólo el tramo marcial",async()=>{
  const shared=await readFile(resolve(root,"templates/actor/parts/actor-sheet.hbs"),"utf8");
  assert.equal(shared.includes("system.derived.defensiveBonus"),true);
  assert.equal(shared.includes("system.derived.martialDefense}}</strong></div>"),false);
});


test("creación guiada evita facetas de texto libre y muestra bloqueos antes de cerrar",async()=>{
  const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");
  const logic=await readFile(resolve(root,"scripts/sheets/actor-sheet.mjs"),"utf8");
  for(const marker of ["Creación guiada","set-origin-facet","set-background-facet","Todavía falta resolver","Paquete racial"]) {
    assert.equal(sheet.includes(marker),true,marker);
  }
  assert.equal(sheet.includes('name="system.details.originFacet"'),false);
  assert.equal(sheet.includes('name="system.details.backgroundFacets"'),false);
  assert.equal(logic.includes("validateCreationState(this.actor"),true);
  assert.equal(logic.includes("#requiredCreationLanguages"),true);
});

test("seleccionar identidad no abre la ficha técnica y aplica valores guiados",async()=>{
  const logic=await readFile(resolve(root,"scripts/sheets/actor-sheet.mjs"),"utf8");
  assert.equal(logic.includes('!singular && this.actor.system.creation?.status !== "building"'),true);
  assert.equal(logic.includes('"system.details.originFacet"] = ""'),true);
  assert.equal(logic.includes('"system.traits.languages"] = this.#requiredCreationLanguages'),true);
});


test("la portada muestra las capacidades raciales activas y sus cambios derivados",async()=>{
  const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");
  assert.equal(sheet.includes("Ascendencia · {{creationGuide.ancestryProfile.name}}"),true);
  assert.equal(sheet.includes("Movimiento especial"),true);
  assert.equal(sheet.includes("Protección Natural"),true);
  assert.equal(sheet.includes("creationGuide.ancestryProfile.features"),true);
});


test("personajes nuevos usan un asistente secuencial obligatorio en Desarrollo",async()=>{
  const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");
  const logic=await readFile(resolve(root,"scripts/sheets/actor-sheet.mjs"),"utf8");
  const model=JSON.parse(await readFile(resolve(root,"template.json"),"utf8"));
  assert.equal(model.Actor.character.creation.wizardStep,1);
  for(const marker of [
    "Creación de personaje",
    "Paso {{creationWizard.step}} de {{creationWizard.total}}",
    "creation-next-step",
    "creation-prev-step",
    "tm-v10-tab-locked",
    "Elegí tu Ascendencia",
    "Elegí tu Origen",
    "Elegí tu Trasfondo",
    "Repartí tus Atributos",
    "Gastá tus PD",
    "Elegí Rasgos",
    "Comprá Equipo inicial",
    "Revisá y completá"
  ]) assert.equal(sheet.includes(marker),true,marker);
  assert.equal(logic.includes('this.options.tabs[0].initial = "development"'),true);
  assert.equal(logic.includes("#advanceCreationWizard"),true);
});

test("la cabecera de juego no repite Nombre, Concepto ni identidad fuera del retrato",async()=>{
  const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");
  const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");
  const headerEnd=sheet.indexOf('<nav class="tm-tabs');
  const header=sheet.slice(0,headerEnd);
  assert.equal(header.includes("tm-v10-identity-strip"),false);
  assert.equal(header.includes('name="system.details.concept"'),false);
  assert.equal(sheet.includes("tm-v11-character-name"),true);
  assert.equal(sheet.includes("identityItems.ancestry"),true);
  assert.equal(sheet.includes("identityItems.origin"),true);
  assert.equal(sheet.includes("identityItems.background"),true);
  assert.equal(css.includes(".tm-v11-portrait-identity"),true);
});

test("durante creación las compras de catálogo no abren fichas técnicas automáticamente",async()=>{
  const logic=await readFile(resolve(root,"scripts/sheets/actor-sheet.mjs"),"utf8");
  assert.equal(logic.includes('!singular && this.actor.system.creation?.status !== "building"'),true);
});


test("rediseño de juego separa controles técnicos de la experiencia del jugador",async()=>{
  const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");
  const logic=await readFile(resolve(root,"scripts/sheets/actor-sheet.mjs"),"utf8");
  assert.equal(logic.includes("context.isGM = Boolean(game.user?.isGM)"),true);
  assert.equal(sheet.includes("tm-v11-combat-overview"),true);
  assert.equal(sheet.includes("tm-v11-defense-action-grid"),true);
  assert.equal(sheet.includes("tm-v11-advanced-panel"),true);
  assert.equal(sheet.includes("Configuración avanzada de combate"),true);
  assert.equal(sheet.includes("tm-v11-diagnostics-details"),true);
  assert.equal(sheet.includes("Diagnóstico técnico de derivados"),true);
});

test("Habilidades elimina el cartel permanente de creación cerrada y destaca temporales",async()=>{
  const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");
  const css=await readFile(resolve(root,"styles/character-sheet-v03.css"),"utf8");
  assert.equal(sheet.includes("Creación cerrada: reducir rangos requiere una reconstrucción autorizada."),false);
  assert.equal(sheet.includes("tm-v11-skill-build-status"),true);
  assert.equal(css.includes(".tm-character-sheet-v03 .tm-v03-skills-hero .tm-v04-clear-temporaries"),true);
  assert.equal(css.includes(".tm-character-sheet-v03 .tm-v04-skill-detail"),true);
});

test("Magia prioriza Maná, competencias, Disciplinas y Grimorio",async()=>{
  const sheet=await readFile(resolve(root,"templates/actor/character-sheet.hbs"),"utf8");
  for(const marker of [
    "tm-v11-magic-overview",
    "tm-v11-magic-skills",
    "tm-v11-discipline-list",
    "tm-v11-grimoire",
    "tm-v11-spell-card",
    "tm-v11-cast-button",
    "Otras artes y recursos"
  ]) assert.equal(sheet.includes(marker),true,marker);
  assert.equal(sheet.includes("Sin efectos sostenidos demandantes."),true);
});
