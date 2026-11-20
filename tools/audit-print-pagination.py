#!/usr/bin/env python3
"""Diagnóstico de páginas cortas y continuidad, sin alterar la maquetación.

Distingue finales voluntarios antes de un capítulo o parte nueva de
páginas cortas dentro de una misma sección. Los resultados son indicios.
"""
from pathlib import Path
import json
import re
import fitz
from PIL import Image, ImageDraw

ROOT=Path(__file__).resolve().parent.parent
DIR=ROOT/"docs/edicion_impresa"
PDF=DIR/"Tierra_Magica_Manual_Basico_Prueba_Integral.pdf"
DEST=DIR/"Auditoria_Paginas_Cortas_y_Continuidad.json"
if not PDF.is_file():
    raise SystemExit("Falta PDF integral; ejecutar primero render-print-review.py")
doc=fitz.open(PDF)
chapter_title=re.compile(r"^\s*(?:\d{1,2}\.\s+|PARTE\s+[IVX]+\b|APÉNDICE\s+DE\b)", re.I)
pages=[]
for i,page in enumerate(doc):
    d=page.get_text("dict")
    content=[]
    for block in d["blocks"]:
        if block.get("type")!=0: continue
        for line in block["lines"]:
            t="".join(x.get("text","") for x in line.get("spans",[])).strip()
            if not t: continue
            box=fitz.Rect(line["bbox"])
            # El pie de página ocupa la banda inferior y no cuenta como cuerpo.
            if box.y0 < 745:
                content.append((box,t))
    content.sort(key=lambda x:(x[0].y0,x[0].x0))
    pages.append(content)
short=[]
for i,content in enumerate(pages):
    if i<3 or not content: continue
    bottom=max(b.y1 for b,_ in content)
    if bottom>=395: continue
    next_content=pages[i+1] if i+1<len(pages) else []
    next_lines=[t for _,t in next_content[:9]]
    # El título de capítulo puede seguir a un encabezado de parte.
    expected_break=any(chapter_title.match(t) for t in next_lines[:6])
    next_title=next((t for t in next_lines if chapter_title.match(t)),None)
    category="cierre_antes_de_capitulo" if expected_break else "corta_sin_cambio_claro"
    if i==len(pages)-1:category="ultima_pagina"
    short.append({
        "pagina":i+1,"categoria":category,
        "ultimo_bloque":content[-1][1][:130],
        "altura_ultimo_texto_pt":round(bottom,1),
        "pagina_siguiente":i+2 if next_content else None,
        "primer_texto_siguiente":next_lines[0][:130] if next_lines else "",
        "titulo_siguiente_detectado":next_title
    })
report={
    "estado":"AUDITORIA HEURISTICA; NO PRE-FLIGHT DE IMPRENTA",
    "paginas_pdf":len(doc),
    "candidatas_cortas":len(short),
    "cierre_antes_de_capitulo":sum(x["categoria"]=="cierre_antes_de_capitulo" for x in short),
    "cortas_sin_cambio_claro":sum(x["categoria"]=="corta_sin_cambio_claro" for x in short),
    "ultima_pagina":sum(x["categoria"]=="ultima_pagina" for x in short),
    "incidencias":short,
    "limitaciones":[
        "Los patrones reconocen títulos numerados y de parte, no demuestran por sí solos que el salto sea editorialmente correcto",
        "La clasificación del texto de la página siguiente no evalúa proporción de blancos ni imágenes",
        "Cualquier modificación de tipografía o arte invalida esta paginación y requiere repetir el informe"
    ]
}
# Diagnóstico visual de secuencias particularmente cortas; no implica aprobación.
# Pares contiguos: 32/33 (perfiles), 258-263 (tabla segmentada),
# 309-313 (acumuladores) y 497/498 (glosario).
targets=[31,32,257,258,259,260,261,262,308,309,310,311,312,496,497]
tiles=[]
for pi in targets:
    if pi>=len(doc): continue
    pix=doc[pi].get_pixmap(matrix=fitz.Matrix(.55,.55),alpha=False)
    raw=Image.frombytes("RGB",(pix.width,pix.height),pix.samples)
    tile=Image.new("RGB",(385,485),"#e4e8eb")
    tile.paste(raw,((385-raw.width)//2,10))
    ImageDraw.Draw(tile).text((10,460),"Página "+str(pi+1),fill="#1c3042")
    tiles.append(tile)
if tiles:
    sheet=Image.new("RGB",(385*5,485*((len(tiles)+4)//5)),"#d3d8dd")
    for i,tile in enumerate(tiles):
        sheet.paste(tile,((i%5)*385,(i//5)*485))
    views=DIR/"vistas_revision"
    views.mkdir(parents=True,exist_ok=True)
    sheet.save(views/"contacto_cortas.jpg",quality=77,optimize=True)

DEST.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps({k:v for k,v in report.items() if k!="incidencias"},ensure_ascii=False))
print("PAGINAS_A_REVISAR="+json.dumps([
    {"pagina":v["pagina"],"altura_pt":v["altura_ultimo_texto_pt"],
     "ultimo_texto":v["ultimo_bloque"][:85],
     "pagina_siguiente":v["pagina_siguiente"],
     "inicio_siguiente":v["primer_texto_siguiente"][:85]}
    for v in short if v["categoria"]=="corta_sin_cambio_claro"
],ensure_ascii=False))
print("PAGINAS_ANTES_DE_CAPITULO="+json.dumps([
    v["pagina"] for v in short if v["categoria"]=="cierre_antes_de_capitulo"
]))
