#!/usr/bin/env python3
"""Auditoría de extracción y geometría del PDF integral; no aprueba imprenta."""
from pathlib import Path
from collections import Counter
import json
import re
import fitz
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "docs/edicion_impresa"
PDF = BASE / "Tierra_Magica_Manual_Basico_Prueba_Integral.pdf"
OUT = BASE / "Auditoria_Texto_Geometria_PDF.json"
IMAGES = BASE / "vistas_revision"
IMAGES.mkdir(parents=True, exist_ok=True)

doc = fitz.open(PDF)
reader = PdfReader(str(PDF))
if len(doc) != len(reader.pages):
    raise SystemExit("Desacuerdo en páginas PyMuPDF / pypdf")
total = len(doc)
sample_pages = sorted(set([0,1,2,3,5,10,20,35,50,75,100,130,160,200,250,300,350,400,total-1, total//2]))
pages_nul = []
pages_no_text = []
outside_blocks = []
bad_character_pages = []
lengths = []
sample_details = {}
nul_counts = 0
for i, page in enumerate(doc):
    native = page.get_text("text",sort=True)
    extracted = reader.pages[i].extract_text() or ""
    nul = extracted.count(chr(0))
    nul_counts += nul
    if nul: pages_nul.append(i+1)
    if len(native.strip()) < 15: pages_no_text.append(i+1)
    if chr(0) in native or "\ufffd" in native: bad_character_pages.append(i+1)
    lengths.append(len(native.strip()))
    for b in page.get_text("blocks"):
        x0,y0,x1,y1,*_ = b
        # pequeños excesos de redondeo son normales; márgenes y páginas reales en pt
        if min(x0,y0)<-1 or x1>page.rect.width+1 or y1>page.rect.height+1:
            outside_blocks.append({"pagina":i+1,"rect":[round(x0,1),round(y0,1),round(x1,1),round(y1,1)]})
            if len(outside_blocks)>50: break
    if i in sample_pages:
        sample_details[str(i+1)] = {
            "pypdf_chars":len(extracted),"pypdf_nul":nul,
            "fitz_chars":len(native),
            "fitz_first_100":native[:100],
            "text_blocks":len(page.get_text("blocks"))
        }
        # muestras distribuidas; 120 DPI para revisión humana del diseño
        pix=page.get_pixmap(matrix=fitz.Matrix(1.5,1.5),alpha=False)
        pix.save(str(IMAGES / ("revision_%03d.png"%(i+1))))
report={
    "estado":"AUDITORIA AUTOMATICA, NO APROBADA PARA IMPRENTA",
    "paginas":total,
    "paginas_con_nul_en_pypdf":len(pages_nul),
    "nul_totales_en_pypdf":nul_counts,
    "paginas_con_nul_en_pypdf_ejemplos":pages_nul[:40],
    "paginas_con_texto_fitz_insuficiente":pages_no_text[:100],
    "paginas_con_caracter_sospechoso_fitz":bad_character_pages[:100],
    "bloques_fuera_de_pagina":outside_blocks,
    "longitud_minima_texto_fitz":min(lengths),
    "longitud_mediana_texto_fitz":sorted(lengths)[len(lengths)//2],
    "muestras":sample_details,
    "advertencias":[
        "Los NUL de pypdf pueden deberse a la capa de texto o a extracción; contrastar con PyMuPDF y pdftotext",
        "Bloques dentro de límites no garantiza ausencia de solapes, tablas cortadas ni calidad tipográfica",
        "Se exige inspección visual de vistas distribuidas antes de aprobación"
    ]
}
OUT.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps({k:v for k,v in report.items() if k!="muestras"},ensure_ascii=False))
# Esta auditoría informa, no silencia anomalías ni declara PDF aprobado.
