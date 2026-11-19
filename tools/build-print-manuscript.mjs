#!/usr/bin/env node
/**
 * Tierra Mágica — ensamblado no destructivo de manuscrito de lectura.
 * Fuente: docs/Tierra_Magica_Manual_Maestro.md
 * Salida: docs/edicion_impresa/Manual_Basico_Manuscrito_Lectura.md
 *
 * Conserva todos los capítulos normativos y de mundo; reubica las doce
 * ascendencias detrás del capítulo 3. Excluye sólo prólogo y registros
 * internos delimitados. CRAFT-12 se conserva para no perder correcciones
 * mecánicas cuya extracción editorial aún se audita.
 */
import {readFile,writeFile,mkdir} from "node:fs/promises";
import {resolve,dirname} from "node:path";
const root=resolve(import.meta.dirname,"..");
const source=resolve(root,"docs/Tierra_Magica_Manual_Maestro.md");
const dest=resolve(root,"docs/edicion_impresa/Manual_Basico_Manuscrito_Lectura.md");
const raw=(await readFile(source,"utf8")).replace(/\r\n/g,"\n");
const required=[
"# PARTE I — REGLAS VIGENTES Y GUÍA DE JUEGO",
"## 3. Creación de personaje paso a paso",
"## 4. Desarrollo y subida de nivel",
"## 25. Cosmología: los Principios Primordiales",
"# PARTE II — CANON DEL MUNDO v1.2 INTEGRADO",
"# APÉNDICE — PROCEDENCIA DEL ARCHIVO NARRATIVO HISTÓRICO",
"# ANEXO CANÓNICO — DOCE ASCENDENCIAS DEL MANUAL BÁSICO (18-11-2026)"
];
for(const h of required){
  if(raw.split("\n").filter(x=>x===h).length!==1)throw Error("Límite ausente o duplicado: "+h);
}
function sliceBetween(start,end){
  const a=raw.indexOf(start+"\n");
  const z=end?raw.indexOf(end+"\n",a+start.length):-1;
  if(a<0||(end&&z<0))throw Error("No se halló sección "+start+" -> "+end);
  return raw.slice(a,z<0?undefined:z).trim();
}
const main=sliceBetween(required[0],required[5]);
const annex=sliceBetween(required[6],null);
const part1=main.slice(0,main.indexOf("## 25. Cosmología: los Principios Primordiales\n")).trim();
const panteon=main.slice(main.indexOf("## 25. Cosmología: los Principios Primordiales\n"),main.indexOf("# PARTE II — CANON DEL MUNDO v1.2 INTEGRADO\n")).trim();
const world=main.slice(main.indexOf("# PARTE II — CANON DEL MUNDO v1.2 INTEGRADO\n")).trim();
const split=part1.indexOf("## 4. Desarrollo y subida de nivel\n");
const first=part1.slice(0,split).trim(),rest=part1.slice(split).trim();
const intro=[
"# Tierra Mágica — Manual Básico",
"> **Manuscrito de lectura generado. No aprobado para imprenta.**",
"> Fuente normativa: `docs/Tierra_Magica_Manual_Maestro.md`.",
"> Las doce ascendencias se sitúan tras creación de personajes; los capítulos de",
"> reglas y el canon narrativo se mantienen íntegros. Los números de sección y",
"> referencias internas no se han renumerado en este borrador.",
"",
"## Nota editorial sobre integridad",
"Se excluyen del flujo de lectura el prólogo de gobernanza del archivo fuente,",
"el apéndice histórico de procedencia y el seguimiento interno de consolidación.",
"CRAFT-12, que incluye correcciones y reglas relacionadas, se conserva sin recorte:",
"su traslado a apéndice de diseño sólo podrá hacerse tras una revisión de cobertura.",
"Este documento es derivado y debe reconstruirse cuando cambie el Maestro."
].join("\n");
let assembled=[intro,first,annex,rest,world,panteon].join("\n\n---\n\n")+"\n";

// Se eliminan sólo apartados técnicos delimitados por encabezado y revisados.
// Los apartados siguen intactos en el Manual Maestro. Las notas normativas
// anteriores y siguientes quedan dentro del libro.
const editorialExclusions=[
  ["### Auditoría de disponibilidad en Foundry (pendiente de conciliación)",
   "### Catálogo monetario de equipo"],
  ["### Conciliación documental con el compendio Foundry VTT",
   "## 24. Dirección de juego"]
];
for(const [start,end] of editorialExclusions){
  const ai=assembled.indexOf(start+"\n"),bi=assembled.indexOf(end+"\n",ai+start.length);
  if(ai<0||bi<0||assembled.split(start+"\n").length!==2)throw Error("Delimitador editorial ausente o repetido: "+start);
  assembled=assembled.slice(0,ai)+assembled.slice(bi);
}

// Anclas inequívocas para ambas series de capítulos. Las anclas no cambian
// el título fuente y pueden utilizarse para PDF, índice y referencias.
let part="R",ids=[];
assembled=assembled.split("\n").map((line)=>{
  if(line==="# PARTE II — CANON DEL MUNDO v1.2 INTEGRADO")part="M";
  const hit=line.match(/^## (\d+)\. (.+)$/);
  if(!hit)return line;
  const n=Number(hit[1]);
  if(n<1||(part==="M"&&n>14)||(part==="R"&&n>38))return line;
  const id="tm-"+part.toLowerCase()+String(n).padStart(2,"0");
  if(ids.includes(id))throw Error("Ancla duplicada: "+id);
  ids.push(id);
  return '<a id="'+id+'"></a>\n'+line;
}).join("\n");
if(ids.length!==52)throw Error("Se esperaban 52 IDs de capítulos, encontrados "+ids.length);

const numbers=(assembled.match(/^### (?:HUMANOS|ENANOS|ÉLFICOS|Orcos|Goblinoides|Terios \/ Anihombres|Feéricos|ANKAR|Cristálidos|Verdantes|Micelios|Coralios) —/gm)||[]).length;
if(numbers!==12)throw Error("Se esperaban doce dobles páginas: "+numbers);
for(const marker of required.slice(0,5)){
  if(!assembled.includes(marker))throw Error("Sección normativa omitida: "+marker);
}
const allFromSource=[first,annex,rest,world,panteon].join("\n");
for(const term of ["## 12. Grimorio canónico","### CRAFT-12 — Auditoría integral del sistema de fabricación","## 16. Alquimia","## 23. PNJ y criaturas","## 38. Relaciones del Panteón y límites de canon"]){
 if(!allFromSource.includes(term))throw Error("Falta contenido: "+term);
}
await mkdir(dirname(dest),{recursive:true});
await writeFile(dest,assembled);
console.log(JSON.stringify({source,output:dest,ascendencias:12,characters:assembled.length,words:assembled.trim().split(/\s+/).length,notes:"NO aprobado para imprenta"}));
