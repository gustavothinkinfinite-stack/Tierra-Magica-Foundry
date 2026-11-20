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
const glossarySource=resolve(root,"docs/REFERENCIA_RAPIDA_GLOSARIO_1.0.md");
const glossaryRaw=(await readFile(glossarySource,"utf8")).replace(/\r\n/g,"\n");
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
  if(line==="## 25. Cosmología: los Principios Primordiales")part="R";
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
// Remisiones editoriales no ambiguas; no cambia reglas ni la numeración fuente.
const readerCrossReferences=[
  [
    "El catálogo vigente se encuentra en el capítulo de Técnicas.",
    "El catálogo vigente se encuentra en el [capítulo de Técnicas](#tm-r13)."
  ],
  [
    "Disponible sólo en su forma base definida en el capítulo 5; cualquier Don adicional exige un perfil expresamente costeado",
    "Disponible sólo en su forma base definida en el [capítulo 5](#tm-r05); cualquier Don adicional exige un perfil expresamente costeado"
  ],
  [
    "conforme al capítulo de Familiares.",
    "conforme al [capítulo de Familiares](#tm-r14)."
  ],
  [
    "del capítulo de Vida y daño.",
    "del [capítulo de Vida, heridas y recuperación](#tm-r10)."
  ],
  [
    "del capítulo de Combate:",
    "del [capítulo de Combate](#tm-r08):"
  ],
  [
    "dentro del capítulo 18.",
    "dentro del [capítulo 18](#tm-r18)."
  ],
  [
    "dentro del capítulo 6.",
    "dentro del [capítulo 6](#tm-r06)."
  ],
  [
    "en el capítulo 18.",
    "en el [capítulo 18](#tm-r18)."
  ]
];
for(const [original,linked] of readerCrossReferences){
  if(!assembled.includes(original))throw Error("Remisión no encontrada: "+original);
  assembled=assembled.split(original).join(linked);
}


// Redacción de lectura: se conserva la norma y se omite su historial técnico.
const readerCopyedits=[
  [
    "Para que la creación del Manual y la ficha de Foundry utilicen el mismo lenguaje, todo PJ de nivel 1 registra **exactamente una Ascendencia, un Origen y un Trasfondo**.",
    "Todo personaje jugador de nivel 1 registra **exactamente una Ascendencia, un Origen y un Trasfondo**."
  ],
  [
    "Resumen del catálogo cerrado en CREA-14:",
    "Resumen del catálogo vigente para creación:"
  ],
  [
    "Los antiguos **Paquetes de Preparación** dejan de ser una modalidad mecánica separada durante CREA-14. Un grupo puede publicar listas recomendadas de equipo, pero cada objeto de esas listas se compra y contabiliza con las mismas reglas de Compra libre.",
    "Los antiguos **Paquetes de Preparación** no constituyen una modalidad mecánica separada. Un grupo puede publicar listas recomendadas de equipo, pero cada objeto de esas listas se compra y contabiliza con las mismas reglas de Compra libre."
  ],
  [
    "La creación estándar usa **PEI 20 o = 2.000 c** como presupuesto material. No es dinero y no puede convertirse en saldo. Durante CREA-14 existe una única modalidad mecánica: **Compra libre** con objetos de precio exacto.",
    "La creación estándar usa **PEI 20 o = 2.000 c** como presupuesto material. No es dinero y no puede convertirse en saldo. Existe una única modalidad mecánica: **Compra libre** con objetos de precio exacto."
  ]
];
for(const [original,clean] of readerCopyedits){
  if(assembled.split(original).length!==2)throw Error("Redacción no única: "+original);
  assembled=assembled.replace(original,clean);
}
// Redacción de lectura adicional aprobada, separada de la fuente canónica.
const technicalCopyedits=[
  [
    "Estas decisiones fueron aprobadas editorialmente; su implementación Foundry y su equilibrio empírico son verificaciones técnicas independientes, no efectos automáticos de esta redacción.",
    "Estas restricciones no conceden beneficios adicionales fuera de los indicados."
  ],
  [
    "Foundry calcula automáticamente ese rango a partir de las cuatro Habilidades de armas.",
    "El rango se calcula a partir de las cuatro Habilidades de armas."
  ],
  [
    "Foundry puede registrar tipos personalizados para una campaña. Esa capacidad es una extensión operativa: **un tipo personalizado no pasa a ser canon de Tierra Mágica hasta quedar definido en este Manual**.",
    "Una campaña puede utilizar tipos personalizados de daño, pero **ninguno pasa a formar parte del canon general de Tierra Mágica hasta quedar definido en el Manual**."
  ],
  [
    "el catálogo oficial de Foundry contiene **171 variantes de perfil aprobadas**",
    "el catálogo aprobado incluye **171 variantes de perfil**"
  ],
  [
    "Permanecen fuera del Compendio **44 propuestas**",
    "Permanecen sin perfil canónico completo **44 propuestas**"
  ],
  [
    "CRAFT-13 ya cerró la infraestructura de Materiales, fabricación y Energía, pero no autoriza inferir esos perfiles por el nombre.",
    "La existencia de reglas generales sobre materiales, fabricación y Energía no autoriza inferir perfiles nuevos por su nombre."
  ],
  [
    "El Compendio añade **89 variantes aprobadas**",
    "El catálogo añade **89 variantes aprobadas**"
  ],
  [
    "El Compendio añade **51 variantes aprobadas**",
    "El catálogo añade **51 variantes aprobadas**"
  ],
  [
    "son Items canónicos del Compendio y conservan",
    "son objetos canónicos del catálogo y conservan"
  ],
  [
    "CRAFT-13 ya aporta la infraestructura necesaria; cada propuesta especial sigue requiriendo un Perfil explícito antes de entrar al runtime.",
    "Las reglas generales no bastan para aprobar las propuestas: cada objeto especial requiere un Perfil explícito antes de poder usarse con estadísticas propias."
  ],
  [
    "- El requisito de Medicina de **Reconstrucción** permanece canónico sin rango mínimo cuantificado; Foundry no inventa uno.",
    "- El requisito de Medicina de **Reconstrucción** permanece vigente sin rango mínimo cuantificado; no debe suponerse uno."
  ],
  [
    "El siguiente bloque es **CRAFT-13 — Implementación Foundry VTT del sistema de fabricación**.\n\n",
    ""
  ],
  [
    "En Foundry la fuente autoritativa se almacena como un entero de cobres.",
    "Para los cálculos monetarios se utiliza un único valor expresado en cobres enteros."
  ],
  [
    "### Adaptación de equipo — REV-CREA-08-001",
    "### Adaptación de equipo"
  ],
  [
    "### Migración de crowns\n\n**crowns** es un campo legado obsoleto, no una cuarta moneda canónica. No tiene equivalencia automática. Foundry preserva el valor original y marca el Actor como pendiente hasta que una persona indique explícitamente cuántos cobres vale 1 crown o confirme que debe archivarse sin convertirlo. Nunca se suma crowns silenciosamente a un saldo canónico existente.\n\n",
    ""
  ],
  [
    "CRAFT-13 ya cerró esas autoridades, pero los nombres no conceden propiedades por inferencia.",
    "Sin un Perfil aprobado y explícito, estos nombres no conceden propiedades adicionales por inferencia."
  ],
  [
    "CRAFT-13 ya cerró esas autoridades, pero los nombres no conceden Defensa, cobertura ni Energía por inferencia.",
    "Sin un Perfil aprobado y explícito, estos nombres no conceden Defensa, cobertura ni Energía por inferencia."
  ],
  [
    "**Bloqueo de ficha definitiva:** concretar arma y equipo antes de incorporar una variante de Soldado al Compendio.",
    "**Límite de este ejemplo:** concretar el arma y equipo antes de usar una ficha definitiva de Soldado."
  ],
  [
    "**Alcance del cierre:** hay once **ejemplos de encuentro**, uno por perfil de referencia, pero **no once fichas técnicas completas ni once entradas nuevas de Compendio**.",
    "**Alcance de esta sección:** hay once **ejemplos de encuentro**, uno por perfil de referencia, pero **no once fichas técnicas completas ni once criaturas nuevas**."
  ],
  [
    "Cada adaptación al runtime requiere resolver esos campos de forma explícita, no por inferencia.",
    "Toda ficha definitiva necesita resolver esos campos de forma explícita, no por inferencia."
  ]
];
for(const [original,clean] of technicalCopyedits){
  if(assembled.split(original).length!==2)throw Error('Redacción técnica ausente o repetida: '+original.slice(0,70));
  assembled=assembled.replace(original,clean);
}

const numbers=(assembled.match(/^### (?:HUMANOS|ENANOS|ÉLFICOS|Orcos|Goblinoides|Terios \/ Anihombres|Feéricos|ANKAR|Cristálidos|Verdantes|Micelios|Coralios) —/gm)||[]).length;
if(numbers!==12)throw Error("Se esperaban doce dobles páginas: "+numbers);
for(const marker of required.slice(0,5)){
  if(!assembled.includes(marker))throw Error("Sección normativa omitida: "+marker);
}
const allFromSource=[first,annex,rest,world,panteon].join("\n");
for(const term of ["## 12. Grimorio canónico","### CRAFT-12 — Auditoría integral del sistema de fabricación","## 16. Alquimia","## 23. PNJ y criaturas","## 38. Relaciones del Panteón y límites de canon"]){
 if(!allFromSource.includes(term))throw Error("Falta contenido: "+term);
}
// Rótulos de estado CRAFT para lectura: el contenido normativo se conserva.
if(assembled.split("> **CRAFT-01 — VIGENTE · CERRADO.**").length!==2)throw Error("Falta rótulo CRAFT-01");
if(assembled.split("> **VIGENTE · CERRADO.**").length!==12)throw Error("Se esperaban 11 rótulos CRAFT de estado");
assembled=assembled.replace("> **CRAFT-01 — VIGENTE · CERRADO.**","> **CRAFT-01 — Regla vigente.**");
assembled=assembled.split("> **VIGENTE · CERRADO.**").join("> **Regla vigente.**");

// Apéndice de consulta derivado literalmente de la referencia rápida oficial.
const glossarySection=glossaryRaw.split("\n## Glosario\n");
if(glossarySection.length!==2)throw Error("Sección Glosario ausente o duplicada");
const glossaryEntries=glossarySection[1].split("\n").filter(x=>x.startsWith("**")&&x.includes(":**")&&!x.startsWith("**Fuente activa única:"));
if(glossaryEntries.length!==25)throw Error("Se esperaban 25 entradas de glosario: "+glossaryEntries.length);
const glossaryAppendix=[
"# Glosario de consulta — Manual Básico",
"",
"**Estado editorial:** derivado literal de la referencia rápida oficial, preparado para revisión de lectura. No añade reglas.",
"",
"**Procedencia:** \`docs/REFERENCIA_RAPIDA_GLOSARIO_1.0.md\`, sección «Glosario». Las definiciones se conservaron textualmente y se omitió la instrucción de gestión sobre «Fuente activa única».",
"",
glossaryEntries.map(x=>x.trim()).join("\n\n"),
"",
"Las definiciones completas y las excepciones se encuentran en los capítulos normativos del Manual Básico. Este glosario no sustituye las reglas."
].join("\n");
assembled=assembled.trimEnd()+"\n\n---\n\n# APÉNDICE DE CONSULTA — GLOSARIO\n\n"+glossaryAppendix+"\n";
await mkdir(dirname(dest),{recursive:true});
await writeFile(dest,assembled);
console.log(JSON.stringify({source,output:dest,ascendencias:12,characters:assembled.length,words:assembled.trim().split(/\s+/).length,notes:"NO aprobado para imprenta"}));
