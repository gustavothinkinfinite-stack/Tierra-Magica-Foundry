#!/usr/bin/env node
// Composición de prueba del manuscrito completo; fuente normativa inalterada.
import {readFile,writeFile,mkdir} from "node:fs/promises";
import {resolve,dirname} from "node:path";
import {fileURLToPath} from "node:url";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const input=resolve(root,"docs/edicion_impresa/Manual_Basico_Manuscrito_Lectura.md");
const output=resolve(root,"docs/edicion_impresa/Manual_Basico_Prueba_Integral.html");
const raw=(await readFile(input,"utf8")).replace(/\r\n/g,"\n");
// El prefacio de gobernanza se conserva en Markdown, pero no se imprime.
// La cubierta de prueba ya informa expresamente el estado editorial.
const partMarker="# PARTE I — REGLAS VIGENTES Y GUÍA DE JUEGO";
const partStart=raw.indexOf(partMarker);
if(partStart<0)throw Error("Inicio de contenido del Manual Básico no encontrado");
const s=raw.slice(partStart);
const esc=x=>String(x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
function inline(x){return esc(x).replace(/\[([^\]]+)\]\((#[a-z0-9-]+)\)/gi,'<a href="$2">$1</a>').replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g,"<em>$1</em>").replace(/\x60([^\x60]+)\x60/g,"<code>$1</code>");}
const headings=[...s.matchAll(/^<a id="(tm-[rm]\d+)"><\/a>\n## (.+)$/gm)].map(m=>({id:m[1],title:m[2]}));
if(headings.length!==52||new Set(headings.map(x=>x.id)).size!==52)throw Error("Estructura de 52 capítulos no verificada");
const links=[...s.matchAll(/\]\(#(tm-[rm]\d+)\)/g)].map(m=>m[1]);if(links.some(id=>!headings.some(x=>x.id===id)))throw Error("Enlace interno sin destino");
const raceNames=["Humanos","Enanos","Élficos","Orcos","Goblinoides","Terios / Anihombres","Feéricos","Ankar","Cristálidos","Verdantes","Micelios","Coralios"];
const begin=s.indexOf("##### Humanos"),end=s.indexOf("#### Notas de balance y progresión racial",begin);
if(begin<0||end<0||JSON.stringify([...s.slice(begin,end).matchAll(/^##### ([^\n]+)$/gm)].map(m=>m[1]))!==JSON.stringify(raceNames))throw Error("Ascendencias incompletas");
const lines=s.split("\n"),out=[];let chapter="",pendingAnchor=null,races=0,tables=0;
function cells(line){let x=line.trim();if(x.startsWith("|"))x=x.slice(1);if(x.endsWith("|"))x=x.slice(0,-1);return x.split(/(?<!\\)\|/).map(t=>t.trim().replace(/\\\|/g,"|"));}
function sep(line){return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);}
function special(line){return /^\s*(?:#{1,6} |>|[-*+] |\d+[.)] |---+$|\x60{3}|<a id="tm-)/.test(line);}
for(let i=0;i<lines.length;){
 const line=lines[i].trim();if(!line){i++;continue;}
 const a=line.match(/^<a id="(tm-[rm]\d+)"><\/a>$/);
 if(a){if(pendingAnchor)throw Error("Ancla sin encabezado: "+pendingAnchor);chapter=a[1];pendingAnchor=chapter;i++;continue;}
 const h=line.match(/^(#{1,6}) (.+)$/);
 if(h){let n=h[1].length,label=h[2];if(pendingAnchor&&n!==2)throw Error("Ancla anterior a título que no es capítulo: "+pendingAnchor);if(n===5&&chapter==="tm-r03"&&raceNames.includes(label)){races++;out.push('<div class="art">ESPACIO PARA ILUSTRACIÓN PENDIENTE · '+esc(label)+'</div>');}const attr=pendingAnchor?' id="'+pendingAnchor+'"':"";out.push("<h"+n+attr+">"+inline(label)+"</h"+n+">");pendingAnchor=null;i++;continue;}
 if(/^---+$/.test(line)){out.push("<hr>");i++;continue;}
 if(line.startsWith("\x60\x60\x60")){let data=[];i++;while(i<lines.length&&!lines[i].trim().startsWith("\x60\x60\x60"))data.push(lines[i++]);i++;out.push("<pre>"+esc(data.join("\n"))+"</pre>");continue;}
 if(line.startsWith("|")&&i+1<lines.length&&sep(lines[i+1])){
  let th=cells(lines[i]),rows=['<div class="table"><table><thead><tr>'+th.map(c=>"<th>"+inline(c)+"</th>").join("")+"</tr></thead><tbody>"];i+=2;
  while(i<lines.length&&lines[i].trim().startsWith("|")){let td=cells(lines[i++]);rows.push("<tr>"+th.map((_,k)=>"<td>"+inline(td[k]||"")+"</td>").join("")+"</tr>");}
  rows.push("</tbody></table></div>");out.push(rows.join("\n"));tables++;continue;
 }
 if(line.startsWith(">")){let q=[];while(i<lines.length&&lines[i].trim().startsWith(">"))q.push(inline(lines[i++].trim().replace(/^>\s?/,"")));out.push("<blockquote>"+q.join("<br>")+"</blockquote>");continue;}
 const item=line.match(/^([-*+]|\d+[.)]) (.+)$/);
 if(item){let ordered=/^\d/.test(item[1]),tag=ordered?"ol":"ul",items=[];while(i<lines.length){let m=lines[i].trim().match(/^([-*+]|\d+[.)]) (.+)$/);if(!m||/^\d/.test(m[1])!==ordered)break;items.push("<li>"+inline(m[2])+"</li>");i++;}out.push("<"+tag+">"+items.join("")+"</"+tag+">");continue;}
 let p=[line];i++;while(i<lines.length&&lines[i].trim()&&!special(lines[i])&&!(lines[i].trim().startsWith("|")&&i+1<lines.length&&sep(lines[i+1])))p.push(lines[i++].trim());out.push("<p>"+inline(p.join(" "))+"</p>");
}
if(pendingAnchor)throw Error("Ancla final sin título: "+pendingAnchor);
if(races!==12)throw Error("No se compusieron las doce ascendencias");
const css=[
"@page{size:letter;margin:21mm 17mm 20mm 20mm}",
"@page{@bottom-center{content:'TIERRA MÁGICA · PRUEBA · ' counter(page);font:8pt Arial,sans-serif}}",
"*{box-sizing:border-box}body{font:10.5pt/1.45 Georgia,serif;color:#20303d;background:#e6e8e8;margin:0}",
".cover{background:#173b55;color:white;padding:30mm 20mm;min-height:235mm;break-after:page}.cover h1{color:white;border:0;font-size:40pt}",
".toc{break-after:page}.toc ul{columns:2;list-style:none;padding:0}.toc li{font:9pt/1.4 Arial,sans-serif;break-inside:avoid;margin:0 0 2mm}.toc a{text-decoration:none;color:#173b55;display:block}.toc a::after{content:leader('.') target-counter(attr(href),page);color:#617483;font-variant-numeric:tabular-nums}",
".book{max-width:216mm;margin:auto;padding:17mm;background:#fffdf7}h1,h2,h3,h4,h5{color:#173b55;break-after:avoid;line-height:1.2}",
"h1{break-before:page;font-size:25pt;border-bottom:2px solid #b58b45}h2{break-before:page;font-size:21pt;border-bottom:1px solid #b58b45}",
"h3{font-size:15pt}h4{font-size:12pt}h5{font-size:11pt}p{margin:0 0 3.5mm;orphans:3;widows:3}",
"ul,ol{padding-left:6mm;margin:2mm 0 4mm}li{break-inside:avoid;margin:0 0 1mm}blockquote{border-left:3px solid #b58b45;background:#f6f1e7;padding:3mm 4mm}",
".table{overflow-x:auto;margin:4mm 0 6mm}table{width:100%;border-collapse:collapse;font:8.2pt/1.24 Arial,sans-serif}",
"th,td{padding:1.5mm 2mm;border:.4pt solid #b6c2c7;overflow-wrap:anywhere;vertical-align:top}th{background:#244860;color:white;text-align:left}",
"thead{display:table-header-group}tr{break-inside:avoid}.art{border:1px dashed #b58b45;background:#f7f2e7;padding:7mm 3mm;text-align:center;font:9pt Arial,sans-serif}",
"pre{white-space:pre-wrap;overflow-wrap:anywhere;font:8pt monospace}hr{border:0;border-top:1px solid #d5c2a1}",
"@media print{body{background:white}.book{padding:0;max-width:none}.cover{margin:-21mm -17mm -20mm -20mm}.table{overflow:visible}}",
"@media screen{.cover,.toc,.book{max-width:216mm;margin:10mm auto;box-shadow:0 4px 15px #b8c0c0}.toc{padding:17mm}}"
].join("\n");
const toc=headings.map(h=>'<li><a href="#'+h.id+'">'+esc(h.title)+"</a></li>").join("");
const html='<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Tierra Mágica · Prueba integral</title><style>'+css+'</style></head><body>'+
'<section class="cover"><h1>Tierra Mágica</h1><p>Manual Básico · Prueba editorial integral en formato Carta.</p><p>NO APROBADO PARA IMPRENTA. Sin ilustraciones definitivas, paginación validada, sangrado, ICC ni PDF/X.</p></section>'+
'<nav class="toc"><h2>Contenido</h2><p>52 capítulos con remisiones a la paginación de esta prueba. Los folios pueden cambiar en la edición final.</p><ul>'+toc+'</ul></nav>'+
'<main class="book">'+out.join("\n")+"</main></body></html>";
await mkdir(dirname(output),{recursive:true});await writeFile(output,html,"utf8");
console.log(JSON.stringify({output,chapters:headings.length,links:links.length,races,tables,sourceChars:s.length,htmlChars:html.length,approved:false}));
