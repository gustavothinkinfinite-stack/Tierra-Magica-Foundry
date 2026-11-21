#!/usr/bin/env python3
"""Diagnóstico no bloqueante de extracción PDF: pypdf frente a Poppler."""
import argparse
import json
import subprocess
from pathlib import Path
from pypdf import PdfReader

def main():
    p = argparse.ArgumentParser()
    p.add_argument("pdf", type=Path)
    p.add_argument("--output", type=Path, required=True)
    args = p.parse_args()
    reader = PdfReader(str(args.pdf))
    nul_pages = []
    low_poppler = []
    for i, page in enumerate(reader.pages, 1):
        text = page.extract_text() or ""
        if "\x00" in text:
            nul_pages.append({"page": i, "nul_count": text.count("\x00")})
        poppler = subprocess.run(
            ["pdftotext", "-f", str(i), "-l", str(i), "-enc", "UTF-8",
             str(args.pdf), "-"], capture_output=True, check=True
        ).stdout.decode("utf-8", errors="replace")
        if len(poppler.strip()) < 20:
            low_poppler.append({"page": i, "characters": len(poppler.strip())})
    report = {
        "pdf": args.pdf.name,
        "pages": len(reader.pages),
        "pypdf_nul_page_count": len(nul_pages),
        "pypdf_nul_pages": nul_pages,
        "poppler_low_text_page_count": len(low_poppler),
        "poppler_low_text_pages": low_poppler,
        "interpretation": "Diagnóstico de extracción, no certificación de accesibilidad ni defecto visual.",
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Extracción: {len(nul_pages)} páginas con NUL en pypdf; "
          f"{len(low_poppler)} con menos de 20 caracteres en Poppler")

if __name__ == "__main__":
    main()
