#!/usr/bin/env python3
"""Auditoría visual asistida del Manual Básico; no aprueba la edición impresa.
Genera señales reproducibles y vistas para inspección visual humana.
Uso: python tools/audit-print-layout.py
"""
from pathlib import Path
import collections
import json
import re
import statistics
import unicodedata

import fitz
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parent.parent
DIR=ROOT/"docs/edicion_impresa"
PDF=DIR/"Tierra_Magica_Manual_Basico_Prueba_Integral.pdf"
MARKDOWN=DIR/"Manual_Basico_Manuscrito_Lectura.md"
OUT=DIR/"Auditoria_Composicion_Visual.json"
VIEWS=DIR/"vistas_revision"
VIEWS.mkdir(parents=True,exist_ok=True)

doc=fitz.open(PDF)
source=MARKDOWN.read_text(encoding="utf-8").splitlines()
chapter="sin capitulo"
tables=[]
def cells(row):
    row=row.strip().strip("|")
    return re.split(r"(?<!\\)\|",row)
for i in range(len(source)-1):
    line=source[i]
    found=re.match(r'<a id="(tm-[rm]\d+)"></a>',line)
    if found:
        chapter=found.group(1)
    if line.strip().startswith("|") and re.match(r"^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$",source[i+1]):
        header=cells(line)
        count=0
        widths=[]
        j=i+2
        while j<len(source) and source[j].strip().startswith("|"):
            v=cells(source[j])
            widths.extend(len(x) for x in v)
            count+=1
            j+=1
        tables.append({"chapter":chapter,"line":i+1,"columns":len(header),
                       "rows":count,"max_cell":max(widths or [0]),
                       "header":" / ".join(x.strip() for x in header)[:200]})
risk=sorted(tables,key=lambda t:(t["columns"]>=7,t["columns"],t["max_cell"],t["rows"]),reverse=True)
line_summaries=[]
body_insets=[]
short=[]
heading_last=[]
small_fonts=[]
block_outside_safe=[]
chapter_titles=set(re.sub(r"^\d+\.\s*","",x[3:].strip()).casefold() for x in source if x.startswith("## "))
for pi,page in enumerate(doc):
    text=page.get_text("text",sort=True)
    d=page.get_text("dict")
    boxes=[]
    for block in d["blocks"]:
        if block.get("type")!=0:
            continue
        for line in block["lines"]:
            spanlist=line["spans"]
            if not spanlist: continue
            textline="".join(s["text"] for s in spanlist).strip()
            if not textline: continue
            rect=fitz.Rect(line["bbox"])
            size=min(s.get("size",10) for s in spanlist if s["text"].strip())
            boxes.append((rect,textline,size))
            if pi>2 and size<7.0 and rect.y0<745:
                small_fonts.append({"pagina":pi+1,"text":textline[:80],"pt":round(size,2)})
            if pi>2 and (rect.x0<34 or rect.x1>582 or rect.y0<0 or rect.y1>792):
                if len(block_outside_safe)<150:
                    block_outside_safe.append({"pagina":pi+1,"bbox":[round(x,1) for x in rect],"text":textline[:70]})
    content=[(r,t,z) for (r,t,z) in boxes if r.y0<745]
    if pi>2 and content:
        bottom=max(r.y1 for r,_,_ in content)
        if bottom<395:
            short.append({"pagina":pi+1,"ultimo_texto":content[-1][1][:110],
                          "ocupacion_vertical_pt":round(bottom,1)})
        # Un título cerca del final sin texto posterior es candidato a huérfano.
        last=sorted(content,key=lambda x:x[0].y1)[-1]
        last_text=re.sub(r"^\d+\.\s*","",last[1]).casefold()
        if last[0].y0>600 and (last[2]>=11.0 or last_text in chapter_titles):
            heading_last.append({"pagina":pi+1,"texto":last[1][:140],
                                 "y0":round(last[0].y0,1),"size_pt":round(last[2],1)})
    if pi in (0,1,2,3,50,100,200,len(doc)-1):
        line_summaries.append({"pagina":pi+1,"cantidad_lineas":len(boxes),
            "primera_linea":content[0][1][:80] if content else "",
            "ultima_linea":content[-1][1][:80] if content else ""})

# Muestras distribuidas y páginas de tablas que exigen retícula cuidadosa.
sample=[0,1,2,3,5,10,20,50,75,100,150,200,250,300,350,400,len(doc)-1]
target_words=["Rasgo del perfil","PNJ / criatura","Resolución canónica","Base de Reparación Afectada"]
located={}
for pi,page in enumerate(doc):
    content=page.get_text("text")
    for phrase in target_words:
        if phrase not in located and phrase.casefold() in content.casefold():
            located[phrase]=pi+1
            sample.append(pi)
sample=sorted(set(i for i in sample if 0<=i<len(doc)))
# Miniaturas para control visual: no se confunden con revisión de cada página.
thumbs=[]
for pi in sample[:23]:
    pix=doc[pi].get_pixmap(matrix=fitz.Matrix(.62,.62),alpha=False)
    im=Image.frombytes("RGB",(pix.width,pix.height),pix.samples)
    tile=Image.new("RGB",(430,535),"#e8e9ec")
    tile.paste(im,((430-pix.width)//2,20))
    ImageDraw.Draw(tile).text((8,515),"Página "+str(pi+1),fill="#223344")
    thumbs.append(tile)
width=4*430
rows=(len(thumbs)+3)//4
sheet=Image.new("RGB",(width,rows*535),"#ced4d8")
for i,tile in enumerate(thumbs):
    sheet.paste(tile,((i%4)*430,(i//4)*535))
sheet.save(VIEWS/"contacto_general.jpg",quality=77,optimize=True)
for phrase in target_words:
    p=located.get(phrase)
    if p:
        pix=doc[p-1].get_pixmap(matrix=fitz.Matrix(1.45,1.45),alpha=False)
        safe=re.sub(r"[^a-z0-9]+","_",unicodedata.normalize("NFKD",phrase).encode("ascii","ignore").decode("ascii").lower()).strip("_")
        img=Image.frombytes("RGB",(pix.width,pix.height),pix.samples)
        img.save(VIEWS/("tabla_"+safe+"_p"+str(p)+".jpg"),quality=83,optimize=True)

report={
 "estado":"REVISION AUTOMATICA: NO APROBADO PARA IMPRENTA",
 "paginas":len(doc),"tablas_markdown":len(tables),
 "tablas_7_columnas_o_mas":sum(t["columns"]>=7 for t in tables),
 "tablas_de_riesgo":risk[:20],
 "paginas_cortas_candidatas":short[:45],"total_paginas_cortas":len(short),
 "titulos_aparentemente_huerfanos":heading_last[:45],"total_titulos_huerfanos":len(heading_last),
 "texto_menor_7pt_casos":small_fonts[:35],"total_texto_menor_7pt":len(small_fonts),
 "contenido_fuera_del_area_lateral_conservadora":block_outside_safe[:60],
 "total_contenido_fuera_del_area_lateral_conservadora":len(block_outside_safe),
 "paginas_muestreadas":[pi+1 for pi in sample[:23]],"paginas_de_tablas_localizadas":located,
 "inspeccion":"Se generó hoja de contacto y vistas detalladas; sus imágenes requieren inspección visual real."
}
OUT.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps({k:v for k,v in report.items() if k not in (
 "tablas_de_riesgo","paginas_cortas_candidatas","titulos_aparentemente_huerfanos",
 "texto_menor_7pt_casos","contenido_fuera_del_area_lateral_conservadora")},
 ensure_ascii=False))
