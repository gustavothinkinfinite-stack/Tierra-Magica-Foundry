#!/usr/bin/env python3
"""Inventario verificable de los 14 activos editoriales autorizados (sin alterar arte)."""
import argparse
import hashlib
import json
import struct
import zlib
from pathlib import Path

EXPECTED = [
    "Tapa delantera del Manual Basico.png",
    "Tapa trasera del Manual Basico.png",
    "Eïra, la Madre de la Primera Semilla.png",
    "Khorun, el Primer Forjador.png",
    "Varkor, el Señor de la Primera Guerra.png",
    "Aster, el Señor de las Mil Sendas.png",
    "Ilyr, el Portador de la Primera Luz.png",
    "Nereth, el Señor de la Primera Profanación.png",
    "Vaelun, el Guardián del Último Umbral.png",
    "Aurea, la Llama.png",
    "Nemor, el Guardián.png",
    "Oria, la Balanza.png",
    "Selene, la Velada.png",
    "Vael, el Navegante.png",
]

def inspect(path):
    if not path.is_file():
        return {"status": "missing"}
    data = path.read_bytes()
    if len(data) < 33 or data[:8] != b"\x89PNG\r\n\x1a\n" or data[12:16] != b"IHDR":
        return {"status": "invalid_png", "bytes": len(data)}
    # La firma PNG y el marcador IHDR por sí solos no garantizan un encabezado íntegro.
    if struct.unpack(">I", data[8:12])[0] != 13:
        return {"status": "invalid_png", "bytes": len(data), "reason": "invalid_ihdr_length"}
    expected_crc = struct.unpack(">I", data[29:33])[0]
    actual_crc = zlib.crc32(data[12:29]) & 0xFFFFFFFF
    if expected_crc != actual_crc:
        return {"status": "invalid_png", "bytes": len(data), "reason": "invalid_ihdr_crc"}
    # Verificar estructura completa: chunks, CRC, IDAT e IEND final.
    # Un IHDR válido no basta si el PNG está truncado o contiene datos corruptos.
    offset = 8
    has_idat = False
    has_iend = False
    while offset < len(data):
        if offset + 12 > len(data):
            return {"status": "invalid_png", "bytes": len(data), "reason": "truncated_chunk"}
        chunk_length = struct.unpack(">I", data[offset:offset + 4])[0]
        end = offset + 12 + chunk_length
        if end > len(data):
            return {"status": "invalid_png", "bytes": len(data), "reason": "truncated_chunk"}
        kind = data[offset + 4:offset + 8]
        crc = struct.unpack(">I", data[end - 4:end])[0]
        if (zlib.crc32(data[offset + 4:end - 4]) & 0xFFFFFFFF) != crc:
            return {"status": "invalid_png", "bytes": len(data), "reason": "invalid_chunk_crc"}
        if kind == b"IDAT":
            has_idat = True
        if kind == b"IEND":
            if chunk_length != 0 or end != len(data):
                return {"status": "invalid_png", "bytes": len(data), "reason": "invalid_iend"}
            has_iend = True
        offset = end
    if not has_idat or not has_iend:
        return {"status": "invalid_png", "bytes": len(data), "reason": "missing_idat_or_iend"}
    width, height = struct.unpack(">II", data[16:24])
    if width == 0 or height == 0:
        return {"status": "invalid_png", "bytes": len(data), "reason": "zero_dimensions"}
    return {
        "status": "present", "bytes": len(data),
        "sha256": hashlib.sha256(data).hexdigest(),
        "width_px": width, "height_px": height,
        "warning": "resolution_under_1800px" if min(width, height) < 1800 else None,
    }

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--assets", type=Path, default=Path("assets/editorial"))
    p.add_argument("--output", type=Path, default=Path("dist/control/activos_editoriales.json"))
    p.add_argument("--require-complete", action="store_true")
    args = p.parse_args()
    entries = [{"filename": name, **inspect(args.assets / name)} for name in EXPECTED]
    report = {
        "purpose": "Inventario técnico; no certifica derechos ni aptitud de imprenta",
        "expected": len(EXPECTED),
        "present": sum(x["status"] == "present" for x in entries),
        "entries": entries,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Activos presentes: {report['present']}/{len(EXPECTED)}; informe: {args.output}")
    if args.require_complete and report["present"] != len(EXPECTED):
        raise SystemExit("Faltan activos editoriales o hay PNG inválidos")

if __name__ == "__main__":
    main()
