#!/usr/bin/env python3
"""Prueba PDF de Tierra Mágica: conversión HTML integral, sin alterar el Maestro.

Dependencias: python -m pip install weasyprint pypdf
Uso desde la raíz: python tools/render-print-review.py
La salida NO es archivo de imprenta, PDF/X ni validación de arte final.
"""
from pathlib import Path
import json
from weasyprint import HTML
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent.parent
HTML_FILE = ROOT / "docs/edicion_impresa/Manual_Basico_Prueba_Integral.html"
PDF_FILE = ROOT / "docs/edicion_impresa/Tierra_Magica_Manual_Basico_Prueba_Integral.pdf"
REPORT_FILE = ROOT / "docs/edicion_impresa/Control_Paginacion_Prueba_Integral.json"

if not HTML_FILE.is_file():
    raise SystemExit("ERROR: generar antes el HTML con node tools/build-print-html.mjs")
html = HTML_FILE.read_text(encoding="utf-8")
if len(html) < 500000:
    raise SystemExit("ERROR: el HTML parece incompleto (< 500.000 caracteres)")
for marker in ("tm-r01", "tm-r38", "tm-m01", "tm-m14", "NO APROBADO PARA IMPRENTA"):
    if marker not in html:
        raise SystemExit("ERROR: falta marcador " + marker)

HTML(filename=str(HTML_FILE), base_url=str(ROOT)).write_pdf(str(PDF_FILE))
reader = PdfReader(str(PDF_FILE))
pages = len(reader.pages)
if pages < 52:
    raise SystemExit(f"ERROR: páginas inesperadamente escasas: {pages}")
size_errors = []
blank_pages = []
samples = {}
for i, page in enumerate(reader.pages):
    w, h = float(page.mediabox.width), float(page.mediabox.height)
    if abs(w - 612) > 1 or abs(h - 792) > 1:
        size_errors.append({"pagina": i + 1, "ancho_pt": w, "alto_pt": h})
    content = page.extract_text() or ""
    if len(content.strip()) < 15:
        blank_pages.append(i + 1)
    if i in {0, 1, 2, pages // 2, pages - 1}:
        samples[str(i + 1)] = content[:250]
report = {
    "estado": "PDF DE REVISION, NO APROBADO PARA IMPRENTA",
    "formato_esperado": "US Letter 612x792 pt",
    "paginas": pages,
    "errores_formato": size_errors[:50],
    "paginas_con_menos_de_15_caracteres_extraibles": blank_pages[:100],
    "muestras_textuales": samples,
    "pdf_bytes": PDF_FILE.stat().st_size,
    "advertencias": [
        "No se certifica fidelidad semantica Markdown->HTML",
        "Sin inspeccion de todas las tablas o paginas",
        "Ilustraciones pendientes",
        "No PDF/X ni ICC, sangrado o especificacion de imprenta"
    ]
}
REPORT_FILE.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(report, ensure_ascii=False, indent=2))
if size_errors:
    raise SystemExit("ERROR: formato de página distinto de Carta")
