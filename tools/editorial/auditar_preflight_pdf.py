#!/usr/bin/env python3
"""Auditoría técnica no certificante de dimensiones y fuentes del PDF."""
import argparse
import json
from collections import Counter
from pathlib import Path
from pypdf import PdfReader

def main():
    p = argparse.ArgumentParser()
    p.add_argument("pdf", type=Path)
    p.add_argument("--output", type=Path, required=True)
    a = p.parse_args()
    reader = PdfReader(str(a.pdf))
    sizes = Counter()
    fonts = {}
    missing_fonts = []
    rotated_pages = []
    for number, page in enumerate(reader.pages, 1):
        rotation = int(page.get("/Rotate", 0) or 0) % 360
        if rotation:
            rotated_pages.append({"page": number, "rotation_degrees": rotation})
        box = page.mediabox
        width = round(float(box.width), 2)
        height = round(float(box.height), 2)
        sizes[f"{width}x{height}"] += 1
        resources = page.get("/Resources")
        resources = resources.get_object() if resources else {}
        font_map = resources.get("/Font")
        font_map = font_map.get_object() if font_map else {}
        for name, ref in font_map.items():
            font = ref.get_object()
            base = str(font.get("/BaseFont", name))
            descendants = font.get("/DescendantFonts")
            if descendants:
                descendants = descendants.get_object()
                if descendants:
                    font = descendants[0].get_object()
            descriptor = font.get("/FontDescriptor")
            descriptor = descriptor.get_object() if descriptor else {}
            embedded = any(key in descriptor for key in ("/FontFile", "/FontFile2", "/FontFile3"))
            # Un solo uso no incrustado basta para marcar la fuente como pendiente.
            # OR ocultaba usos sin incrustar si otro objeto homónimo sí la tenía.
            fonts[base] = fonts.get(base, True) and embedded
    for name, embedded in sorted(fonts.items()):
        if not embedded:
            missing_fonts.append(name)
    result = {
        "pdf": a.pdf.name,
        "pages": len(reader.pages),
        "page_sizes_pt": dict(sizes),
        "expected_trim_pt": [432, 648],
        "all_pages_6x9": sizes == Counter({"432.0x648.0": len(reader.pages)}),
        "fonts": [{"name": k, "embedded": v} for k, v in sorted(fonts.items())],
        "fonts_without_embedded_file": missing_fonts,
        "rotated_pages": rotated_pages,
        "review_status": "technical_screening_not_print_certification",
    }
    a.output.parent.mkdir(parents=True, exist_ok=True)
    a.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    if not fonts:
        raise SystemExit("ERROR: no se detectaron fuentes en un manual con texto; revisar auditor y recursos PDF")
    if not result["all_pages_6x9"]:
        raise SystemExit("ERROR: dimensiones de página distintas de 6x9 pulgadas")
    if rotated_pages:
        raise SystemExit("ERROR: páginas rotadas detectadas: " + str(rotated_pages[:20]))
    if missing_fonts:
        raise SystemExit("ERROR: fuentes sin incrustar: " + ", ".join(missing_fonts))
    print(f"Preflight preliminar: {len(reader.pages)} páginas, {len(fonts)} fuentes, {len(missing_fonts)} sin archivo incrustado")

if __name__ == "__main__":
    main()
