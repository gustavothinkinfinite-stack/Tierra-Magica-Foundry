#!/usr/bin/env python3
"""Prueba aislada del pipeline de ilustraciones del Manual Básico.

Genera un rectángulo PNG puramente técnico en un archivo temporal del runner.
NO genera una ilustración artística ni cambia ningún brief, el Maestro o el
manifiesto versionado. El HTML de lectura se restaura al finalizar.
Requiere Pillow y Node 22 (ya presentes en el workflow).
"""
from pathlib import Path
from PIL import Image
import json
import subprocess

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "docs/edicion_impresa/Manifest_Ilustraciones_Ascendencias.json"
HTML = ROOT / "docs/edicion_impresa/Manual_Basico_Prueba_Integral.html"
SCRIPT = ROOT / "tools/build-print-html.mjs"
ART = ROOT / "assets/ilustraciones/ascendencias/01_humanos.png"
original = MANIFEST.read_bytes()
baseline = HTML.read_bytes()
manifest = json.loads(original)
assert len(manifest["ascendencias"]) == 12
assert all(x["estado"] == "pendiente" and x["archivo"] is None for x in manifest["ascendencias"])
if ART.exists():
    raise SystemExit("El archivo de prueba no debe sobrescribir arte real")
ART.parent.mkdir(parents=True, exist_ok=True)
checks = []
def run(expect_ok):
    p = subprocess.run(["node", str(SCRIPT)], cwd=ROOT, capture_output=True, text=True, timeout=30)
    if (p.returncode == 0) != expect_ok:
        raise AssertionError("Resultado de compilación inesperado: " + (p.stdout + p.stderr)[-1500:])
    return p.stdout + p.stderr
def write(data):
    MANIFEST.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
try:
    first = manifest["ascendencias"][0]
    first.update({
        "estado":"aprobado",
        "archivo":"assets/ilustraciones/ascendencias/01_humanos.png",
        "autor":"Autor técnico ficticio — SOLO PRUEBA",
        "licencia":"TEST ONLY - NO DISTRIBUIR",
        "creditos":"IMAGEN DE PRUEBA; NO ARTE EDITORIAL",
        "alt":"Rectángulo técnico de prueba, sin personajes"
    })
    write(manifest)
    run(False)
    checks.append("Rechaza imagen aprobada cuando falta el PNG")
    Image.new("RGB", (400, 300), (235, 235, 235)).save(ART, format="PNG")
    run(False)
    checks.append("Rechaza PNG de resolución insuficiente")
    Image.new("RGB", (1600, 1000), (235, 235, 235)).save(ART, format="PNG")
    first["licencia"] = None
    write(manifest)
    run(False)
    checks.append("Rechaza imagen sin licencia documentada")
    first["licencia"] = "TEST ONLY - NO DISTRIBUIR"
    write(manifest)
    output = run(True)
    html = HTML.read_text(encoding="utf-8")
    assert 'class="art-approved"' in html
    assert 'assets/ilustraciones/ascendencias/01_humanos.png' in html
    assert 'Rectángulo técnico de prueba, sin personajes' in html
    assert 'IMAGEN DE PRUEBA; NO ARTE EDITORIAL' in html
    assert "illustracionesAprobadas\":1" in output
    assert "ilustracionesPendientes\":11" in output
    checks.append("Acepta un PNG 1600×1000 con autor, licencia, crédito y texto alternativo")
finally:
    MANIFEST.write_bytes(original)
    if ART.exists():
        ART.unlink()
    # Importante: restaurar la edición verdadera SIN ilustraciones aprobadas.
    proc = subprocess.run(["node", str(SCRIPT)], cwd=ROOT, capture_output=True, text=True, timeout=30)
    if proc.returncode != 0:
        raise SystemExit("ERROR: no se pudo restaurar HTML real: " + proc.stderr[-1000:])
    if HTML.read_bytes() != baseline:
        raise SystemExit("ERROR: HTML restaurado no coincide byte a byte con el inicial")
print(json.dumps({"estado":"APROBADO - circuito técnico; sin arte final",
    "pruebas":checks,"manifiesto_restaurado":MANIFEST.read_bytes()==original,
    "html_restaurado":HTML.read_bytes()==baseline,
    "ilustraciones_aprobadas_versionadas":0},ensure_ascii=False))
