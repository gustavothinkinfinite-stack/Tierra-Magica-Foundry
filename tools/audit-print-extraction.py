#!/usr/bin/env python3
"""Tercera vía de extracción para el Manual Básico, con control del índice PDF.

Ejecutar después de render-print-review.py:
    python tools/audit-print-extraction.py

Usa pdftotext (Poppler) y PyMuPDF; compara por página sin asumir que el
orden de lectura o la división de líneas sea idéntico entre motores.
No sustituye una inspección visual de impresión.
"""
from collections import Counter
from pathlib import Path
import json
import re
import shutil
import subprocess
import unicodedata

import fitz

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "docs/edicion_impresa"
PDF = BASE / "Tierra_Magica_Manual_Basico_Prueba_Integral.pdf"
REPORT = BASE / "Auditoria_Tercer_Extractor_e_Indice.json"
SOURCE = BASE / "Manual_Basico_Manuscrito_Lectura.md"

if not shutil.which("pdftotext"):
    raise SystemExit("ERROR: falta pdftotext (poppler-utils) en el runner")

command = ["pdftotext", "-enc", "UTF-8", "-layout", str(PDF), "-"]
result = subprocess.run(command, capture_output=True, timeout=180)
if result.returncode != 0:
    raise SystemExit("ERROR pdftotext: " + result.stderr.decode("utf-8", "replace")[:600])
poppler = result.stdout.decode("utf-8", "replace")
doc = fitz.open(PDF)
parts = poppler.split("\f")
if parts and not parts[-1].strip():
    parts.pop()
if len(parts) != len(doc):
    raise SystemExit("ERROR: Poppler extrajo " + str(len(parts)) +
                     " páginas, PDF tiene " + str(len(doc)))

def tokens(txt):
    normalized = unicodedata.normalize("NFKC", txt).casefold()
    return Counter(w for w in re.findall(r"[^\W_]{2,}", normalized)
                   if len(w) >= 2)

ratios = []
low = []
poppler_nul_pages = []
poppler_replacement_pages = []
poppler_empty = []
fitz_empty = []
sizes = []
for i, page in enumerate(doc):
    pp = parts[i]
    ft = page.get_text("text", sort=True)
    if "\x00" in pp:
        poppler_nul_pages.append(i + 1)
    if "\ufffd" in pp:
        poppler_replacement_pages.append(i + 1)
    if len(pp.strip()) < 15:
        poppler_empty.append(i + 1)
    if len(ft.strip()) < 15:
        fitz_empty.append(i + 1)
    a, b = tokens(pp), tokens(ft)
    # Similitud bidireccional por tokens con multiplicidad, sin depender
    # de encabezados, folios, saltos de renglón o posición de columnas.
    shared = sum((a & b).values())
    recall = round(shared / max(1, sum(b.values())), 4)
    precision = round(shared / max(1, sum(a.values())), 4)
    ratios.append(recall)
    sizes.append(len(pp))
    if recall < 0.85 or precision < 0.85:
        low.append({"pagina": i + 1, "cobertura_fitz": recall,
                    "precision_poppler": precision,
                    "tokens_poppler": sum(a.values()),
                    "tokens_fitz": sum(b.values())})

# La columna de enlaces del índice debe apuntar a páginas PDF válidas.
links = []
for i in range(min(len(doc), 12)):
    page = doc[i]
    for link in page.get_links():
        target = link.get("page", -1)
        if link.get("kind") == fitz.LINK_GOTO:
            links.append({"origen": i + 1, "destino": target + 1})
invalid_links = [x for x in links if not (1 <= x["destino"] <= len(doc))]
src = SOURCE.read_text(encoding="utf-8")
chapter_ids = re.findall(r'<a id="(tm-[rm]\d+)"></a>\n##', src)
if len(chapter_ids) != 52 or len(set(chapter_ids)) != 52:
    raise SystemExit("ERROR: se requieren 52 capítulos en la fuente")

# Contenido visible de primeras páginas: evidencia para verificar si
# aparecieron folios y nombres de capítulos al renderizar el índice.
intro = " ".join(p.replace("\n", " ").strip() for p in parts[:min(10, len(parts))])
sample_tokens = ["1. Qué es Tierra Mágica", "2. Regla fundamental",
                 "3. Creación de personaje paso a paso"]
report = {
    "estado": "AUDITORIA AUTOMATICA; NO PRE-FLIGHT DE IMPRENTA",
    "paginas_pdf": len(doc),
    "paginas_poppler": len(parts),
    "poppler_nul_paginas": len(poppler_nul_pages),
    "poppler_reemplazos_paginas": len(poppler_replacement_pages),
    "poppler_paginas_sin_texto": poppler_empty[:60],
    "fitz_paginas_sin_texto": fitz_empty[:60],
    "solapamiento_mediana_poppler_fitz": sorted(ratios)[len(ratios) // 2],
    "solapamiento_minimo_poppler_fitz": min(ratios),
    "paginas_con_solapamiento_menor_a_85": len(low),
    "paginas_de_bajo_solapamiento_ejemplos": low[:30],
    "enlaces_internos_detectados_en_12_paginas_iniciales": len(links),
    "destinos_unicos_del_indice": len(set(x["destino"] for x in links)),
    "enlaces_fuera_de_rango": invalid_links,
    "capitulos_fuente": len(chapter_ids),
    "muestras_titulos_en_primeras_paginas": {
        title: title in intro for title in sample_tokens
    },
    "caracteres_poppler": len(poppler),
    "caracteres_nul_poppler": poppler.count("\x00"),
    "caracteres_reemplazo_poppler": poppler.count("\ufffd"),
    "advertencias": [
        "Similitud por tokens no garantiza fidelidad tipografica ni accesibilidad",
        "Los enlaces internos pueden existir fuera de las primeras doce paginas",
        "Una fuente sin NUL en Poppler no implica compatibilidad con todo lector"
    ]
}
REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(report, ensure_ascii=False))
if invalid_links or poppler_nul_pages or poppler_empty:
    raise SystemExit("ERROR: enlaces fuera de rango, NUL o páginas sin texto en Poppler")
