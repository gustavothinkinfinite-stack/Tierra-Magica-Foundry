import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  CREATION_ANCESTRY_LORE,
  CREATION_ATTRIBUTE_HELP,
  CREATION_STEP_GUIDES,
  creationStepGuide,
  creationChoicePresentation,
  creationChoiceBrowserHtml
} from "../scripts/rules/creation-onboarding.mjs";
import { constructionCatalog } from "../scripts/catalog/core-catalog.mjs";

test("los ocho pasos tienen orientación propia, comprensible y sin referencias a tickets internos",()=>{
  assert.equal(CREATION_STEP_GUIDES.length,8);
  for(let index=1;index<=8;index++){
    const guide=creationStepGuide(index);
    assert.equal(guide.number,index);
    for(const key of ["title","description","tip"]){
      assert.ok(guide[key].length>=20 || (key==="title"&&guide[key].length>=7));
      assert.doesNotMatch(guide[key],/CREA-11|CRAFT-13|REF-COM/);
    }
  }
  assert.match(creationStepGuide(5).description,/25 Puntos de Desarrollo/);
  assert.match(creationStepGuide(6).description,/3 Puntos de Rasgo/);
  assert.match(creationStepGuide(7).description,/20 oros/);
});

test("las 17 Ascendencias canónicas tienen descripción narrativa antes de elegir",()=>{
  const entries=constructionCatalog().filter(entry=>entry.type==="ancestry");
  assert.equal(entries.length,17);
  for(const entry of entries){
    const guide=creationChoicePresentation(entry);
    assert.ok(CREATION_ANCESTRY_LORE[entry.name],entry.name);
    assert.ok(guide.introduction.length>65,entry.name);
    assert.ok(guide.details.some(detail=>detail.startsWith("Escala:")),entry.name);
    assert.ok(guide.details.some(detail=>detail.startsWith("Movimiento:")),entry.name);
    assert.ok(guide.details.some(detail=>detail.includes(entry.system.racialFeatures[0]?.split(":")[0]??"---")),entry.name);
  }
  const ankar=creationChoicePresentation(entries.find(entry=>entry.name==="Ankar"));
  assert.match(ankar.introduction,/Vaelun/);
  assert.match(ankar.introduction,/Terio Chacal/);
  const goblin=creationChoicePresentation(entries.find(entry=>entry.name==="Goblin"));
  assert.match(goblin.introduction,/pequeño/);
  const driade=creationChoicePresentation(entries.find(entry=>entry.name==="Dríade"));
  assert.match(driade.introduction,/árboles/);
});

test("Origen y Trasfondo presentan familiaridad, facetas e idiomas sin inventar bonos",()=>{
  const catalog=constructionCatalog();
  const origin=creationChoicePresentation(catalog.find(entry=>entry.type==="origin"));
  assert.match(origin.introduction,/procedencia cultural/i);
  assert.ok(origin.details.some(detail=>detail.includes("Común de Concordia")));
  assert.ok(origin.details.some(detail=>detail.includes("Faceta")));
  const background=creationChoicePresentation(catalog.find(entry=>entry.type==="background"));
  assert.ok(background.details.some(detail=>detail.includes("Facetas")));
  assert.match(background.hint,/dos Facetas distintas/);
  const trait=creationChoicePresentation(catalog.find(entry=>entry.type==="trait"&&entry.name==="Sentido Agudo"));
  assert.ok(trait.details.includes("Coste de creación: 1 PR"));
});

test("el navegador muestra opciones sin siglas de desarrollo y escapa datos hostiles",()=>{
  const catalog=constructionCatalog();
  const html=creationChoiceBrowserHtml(catalog.filter(e=>e.type==="ancestry"),"ancestry");
  assert.match(html,/Ankar/);
  assert.match(html,/Custodia del Alma/);
  assert.match(html,/input type='radio'/);
  assert.doesNotMatch(html,/CREA-11|Catálogo canónico/);
  const hostile=creationChoiceBrowserHtml([{name:"<script>alert(1)</script>",type:"background",
    system:{familiarity:'texto "relevante"',facetOptions:"Uno; Dos"}}],"background");
  assert.doesNotMatch(hostile,/<script>/);
  assert.match(hostile,/&lt;script&gt;/);
});

test("el formulario de personaje enlaza lector de opciones y las ocho ayudas",async()=>{
  const sheet=await readFile(new URL("../scripts/sheets/actor-sheet.mjs",import.meta.url),"utf8");
  const template=await readFile(new URL("../templates/actor/character-sheet.hbs",import.meta.url),"utf8");
  assert.match(sheet,/creationChoiceBrowserHtml\(entries,type\)/);
  assert.match(sheet,/new Dialog\(/);
  assert.match(sheet,/creationStepGuide\(wizardStep\)/);
  assert.doesNotMatch(sheet,/Catálogo canónico CREA-11/);
  assert.match(template,/creationWizard\.help\.description/);
  assert.match(template,/creationWizard\.help\.tip/);
  assert.match(template,/creationWizard\.attributeDescriptions/);
  for(let step=1;step<=8;step++)assert.ok(template.includes("creationWizard.isStep"+step),"paso "+step);
});
