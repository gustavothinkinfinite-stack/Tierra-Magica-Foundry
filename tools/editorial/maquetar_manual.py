#!/usr/bin/env python3
"""Maqueta de lectura 6x9 generada solo desde el Manual Maestro canónico.

Uso: python tools/editorial/maquetar_manual.py --source docs/Tierra_Magica_Manual_Maestro.md \
     --output dist/Tierra_Magica_Manual_Basico_Lectura.pdf \
     --style tools/editorial/maquetacion.css --assets assets/editorial
"""
from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import unicodedata
from datetime import datetime, timezone
from pathlib import Path

from bs4 import BeautifulSoup
from markdown_it import MarkdownIt
from pypdf import PdfReader
from weasyprint import CSS, HTML


def slug(text: str) -> str:
    normalized = ''.join(c for c in unicodedata.normalize('NFKD', text)
                         if not unicodedata.combining(c))
    return re.sub(r'[^a-z0-9]+', '-', normalized.lower()).strip('-')[:100] or 'seccion'


def reader_text(raw: str) -> str:
    """Descarta APÉNDICE DE PROCEDENCIA y bitácoras técnicas, nunca reglas o mundo."""
    start = raw.find('# PARTE I — REGLAS VIGENTES Y GUÍA DE JUEGO')
    stop = raw.find('# APÉNDICE — PROCEDENCIA DEL ARCHIVO NARRATIVO HISTÓRICO')
    appendix = raw.find('# ANEXO CANÓNICO — DOCE ASCENDENCIAS DEL MANUAL BÁSICO')
    if min(start, stop, appendix) < 0 or not (start < stop < appendix):
        raise ValueError('La estructura de la fuente cambió: revisar manualmente, no truncar')
    primary, races = raw[start:stop].strip(), raw[appendix:].strip()
    if len(primary) < 300000 or len(races) < 15000:
        raise ValueError('El texto no tiene longitud plausible de manual completo')
    # Editorial projection: preserve the canonical source and replace only
    # explicitly identified software-maintenance sections with reader guidance.
    primary = reader_guidance(primary)
    return primary + '\n\n' + races


def reader_guidance(text: str) -> str:
    sections = (
        (
            '### Auditoría de disponibilidad en Foundry (pendiente de conciliación)',
            '### Catálogo monetario de equipo',
            '### Disponibilidad y acceso al mercado\n\n'
            'La Disponibilidad de un bien y el tamaño del mercado son criterios distintos. '
            'No existe una equivalencia universal ratificada entre los cinco grados de '
            'Disponibilidad y los niveles de establecimiento. La ausencia de clasificación '
            'no convierte un bien en Común. Las armas repetidoras indicadas como Raras '
            'conservan esa clasificación; no se extiende a otras armas por semejanza. '
            'Los bienes Restringidos requieren autorización de acceso; la existencia '
            'de stock y dinero no la sustituye. No se asignan disponibilidades por '
            'inferencia a los 25 objetos de EQP-01 ni a otras entradas.\n\n',
        ),
        (
            '### Conciliación documental con el compendio Foundry VTT',
            '## 24. Dirección de juego',
            '### Uso de los perfiles de referencia\n\n'
            'Los once perfiles conservan sus valores y campos abiertos. El Civil no '
            'tiene ataque cuantificado; el Soldado conserva Daño 7–8; el Canalizador '
            'hostil tiene Maná 15, Canalización +6 y Protección posible 0–1, sin '
            'hechizos predeterminados. El Centinela de Bronce no tiene Defensa Corporal '
            'numérica establecida y el Troll dominante no activa capacidades o '
            'Reacciones opcionales por su nombre. Los ejemplos de encuentros 10 y 11 '
            'no modifican automáticamente los perfiles base.\n\n',
        ),
    )
    for start, end, replacement in sections:
        if text.count(start) != 1 or text.count(end) != 1:
            raise ValueError('Cambió una sección editorial: ' + start)
        first, last = text.index(start), text.index(end)
        if first >= last:
            raise ValueError('Límites editoriales invertidos: ' + start)
        text = text[:first] + replacement + text[last:]
    note = '> **Nota técnica para Foundry:** el sistema preserva el valor original del campo legado crowns y marca el Actor como pendiente hasta que una persona confirme la conversión o el archivo sin conversión.'
    if text.count(note) != 1:
        raise ValueError('Cambió la nota técnica de moneda')
    text = text.replace(note, '')
    # Present the CRAFT-12 mechanical reference as reader guidance.
    first = '#### Auditoría de acciones y Reacciones'
    last = '## 19. Economía, disponibilidad y equipo'
    if text.count(first) != 1 or text.count(last) != 1:
        raise ValueError('Cambió el cierre editorial de fabricación')
    a, b = text.index(first), text.index(last)
    block = text[a:b]
    for old, new in (
        ('Auditoría de acciones y Reacciones', 'Acciones y Reacciones de objetos fabricados'),
        ('Auditoría de apilamiento ofensivo', 'Límites de apilamiento ofensivo'),
        ('Auditoría defensiva', 'Límites de protección y defensa'),
        ('Auditoría de recursos', 'Separación de recursos'),
        ('Auditoría de recuperación', 'Recuperación de componentes'),
        ('Auditoría del catálogo', 'Composición del catálogo de referencia'),
    ):
        block = block.replace('#### ' + old, '#### ' + new)
    block = block.replace('Se verificó:', 'Al aplicar estas reglas:')
    block = block.replace('Se verificó por estados:', 'Estados de referencia:')
    closing = '#### Estado posterior a correcciones'
    if block.count(closing) != 1:
        raise ValueError('Cambió el informe de cierre CRAFT-12')
    block = block[:block.index(closing)] + (
        '#### Límites de fabricación e investigación\n\n'
        'Los requisitos de rango, Plano e Instalación siguen vigentes. '
        'Se respetan CapM, CRu, Sintonización y los límites de carga; '
        'un Prototipo no equivale a un Plano. Los perfiles nuevos deben '
        'respetar coste, reventa, recuperación, tiempo, competencia, acciones, '
        'apilamiento, recursos, Sintonización y compatibilidad con Investigación. '
        'Estas restricciones no garantizan el equilibrio de todo perfil futuro.\n\n'
    )
    return text[:a] + block + text[b:]



def cardify_wide_tables(soup: BeautifulSoup) -> int:
    n = 0
    for tab in list(soup.find_all('table')):
        th = tab.find('thead')
        heads = [h.get_text(' ', strip=True) for h in th.find_all('th')] if th else []
        rows = tab.find_all('tr')
        if not heads and rows:
            heads = [c.get_text(' ', strip=True) for c in rows[0].find_all(['th', 'td'])]
            rows = rows[1:]
        else:
            rows = [r for r in rows if not r.find_parent('thead')]
        if len(heads) <= 3:
            tab['class'] = ['table-classic']
            continue
        block = soup.new_tag('div', attrs={'class': 'table-records'})
        for row in rows:
            cols = row.find_all(['th', 'td'], recursive=False)
            if not cols:
                continue
            entry = soup.new_tag('section', attrs={'class': 'table-record'})
            for index, col in enumerate(cols):
                if not col.get_text(' ', strip=True):
                    continue
                field = soup.new_tag('div', attrs={'class': 'record-line'})
                label = soup.new_tag('span', attrs={'class': 'record-label'})
                label.string = heads[index] if index < len(heads) else f'Dato {index+1}'
                value = soup.new_tag('span', attrs={'class': 'record-value'})
                for child in list(col.contents):
                    value.append(child.extract())
                field.append(label)
                field.append(value)
                entry.append(field)
            block.append(entry)
        tab.replace_with(block)
        n += 1
    return n


def headings_and_toc(soup: BeautifulSoup) -> list[tuple[str, str, int]]:
    entries = []
    duplicate = {}
    used_targets = set()
    for heading in soup.find_all(re.compile('^h[1-6]$')):
        title = heading.get_text(' ', strip=True)
        key = slug(title)
        duplicate[key] = duplicate.get(key, 0) + 1
        target = key if duplicate[key] == 1 else f'{key}-{duplicate[key]}'
        while target in used_targets:
            duplicate[key] += 1
            target = f'{key}-{duplicate[key]}'
        used_targets.add(target)
        heading['id'] = target
        level = int(heading.name[1])
        if level <= 2:
            entries.append((title, target, level))
    return entries


def insert_deities(soup: BeautifulSoup, assets: Path) -> int:
    art = {
        'eira': 'Eïra, la Madre de la Primera Semilla.png',
        'khorun': 'Khorun, el Primer Forjador.png',
        'varkor': 'Varkor, el Señor de la Primera Guerra.png',
        'aster': 'Aster, el Señor de las Mil Sendas.png',
        'ilyr': 'Ilyr, el Portador de la Primera Luz.png',
        'nereth': 'Nereth, el Señor de la Primera Profanación.png',
        'vaelun': 'Vaelun, el Guardián del Último Umbral.png',
        'aurea': 'Aurea, la Llama.png',
        'nemor': 'Nemor, el Guardián.png',
        'oria': 'Oria, la Balanza.png',
        'selene': 'Selene, la Velada.png',
        'vael-navegante': 'Vael, el Navegante.png'
    }
    inserted = 0
    inserted_files = set()
    for heading in soup.find_all('h2'):
        name = slug(heading.get_text(' ', strip=True))
        for key, filename in art.items():
            matches = key in name if key != 'vael-navegante' else ('vael-' in name and 'navegante' in name)
            if not matches or (key == 'vaelun' and 'vaelun' not in name):
                continue
            file = assets / filename
            if file.is_file() and filename not in inserted_files:
                inserted_files.add(filename)
                fig = soup.new_tag('figure', attrs={'class': 'deity-figure'})
                fig.append(soup.new_tag('img', src=file.resolve().as_uri(),
                                       alt=heading.get_text(' ', strip=True)))
                caption = soup.new_tag('figcaption')
                caption.string = heading.get_text(' ', strip=True)
                fig.append(caption)
                heading.insert_after(fig)
                inserted += 1
            break
    return inserted


def toc_html(entries: list[tuple[str, str, int]]) -> str:
    links = ''.join(
        f'<li class="{"primary" if level == 1 else "entry"}">'
        f'<a href="#{key}"><span>{html.escape(title)}</span></a></li>'
        for title, key, level in entries
    )
    return '<nav class="toc"><h1>Índice de contenidos</h1>' \
           '<p>Numeración correspondiente a esta edición.</p><ol>' + links + '</ol></nav>'


def cover(assets: Path, front: bool) -> tuple[str, bool]:
    filename = ('Tapa delantera del Manual Basico.png' if front
                else 'Tapa trasera del Manual Basico.png')
    file = assets / filename
    if file.is_file():
        return f'<img class="cover-image" src="{file.resolve().as_uri()}" ' \
               f'alt="{"Portada" if front else "Contraportada"} Tierra Mágica">', True
    if front:
        return '<div class="cover-fallback"><p class="sub">MANUAL BÁSICO</p>' \
               '<h1>TIERRA<br>MÁGICA</h1><p>Un mundo de dioses, magia y ruinas</p></div>', False
    return '<div class="back-fallback"><h1>TIERRA MÁGICA</h1>' \
           '<p>Los caminos de Edria esperan.</p></div>', False


def make_html(content: str, entries: list[tuple[str, str, int]], assets: Path) -> tuple[str, dict]:
    front, front_original = cover(assets, True)
    back, back_original = cover(assets, False)
    body = f'''<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">
<title>Tierra Mágica — Manual Básico</title></head><body>
<section class="front-cover">{front}</section>
<section class="titleleaf">
<div class="ornament">✦</div><div class="eyebrow">EDICIÓN DE LECTURA · 2026</div>
<h1>Tierra Mágica</h1><h2>Manual Básico</h2>
<div class="line"></div><p>Fantasía medieval y arcano-industrial<br>
Reglas, culturas, aventuras y cosmología.</p>
<div class="colophon-note">Procedencia: Manual Maestro Único en GitHub.<br>
Edición de lectura; control de imprenta y créditos gráficos pendientes.</div></section>
{toc_html(entries)}
<main class="content">{content}</main>
<section class="colophon"><h1>Sobre esta edición</h1>
<p>Edición derivada del Manual Maestro Único de Tierra Mágica. La fuente canónica
permanece en el repositorio. Esta salida no cambia reglas.</p>
<p>La validación de imágenes, permisos, perfiles cromáticos, sangrado y pruebas
de imprenta corresponde a una revisión de producción independiente.</p></section>
<section class="back-cover">{back}</section>
</body></html>'''
    return body, {'front_cover_original': front_original, 'back_cover_original': back_original}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--style', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--assets', type=Path, default=Path('assets/editorial'))
    parser.add_argument('--html-output', type=Path)
    parser.add_argument('--manifest', type=Path)
    args = parser.parse_args()
    source = args.source.read_bytes()
    raw = source.decode('utf-8')
    text = reader_text(raw)
    markdown = MarkdownIt('default', {'html': False, 'linkify': False})
    soup = BeautifulSoup(markdown.render(text), 'html.parser')
    cards = cardify_wide_tables(soup)
    chapters = headings_and_toc(soup)
    pictures = insert_deities(soup, args.assets)
    document, covers = make_html(str(soup), chapters, args.assets)
    if args.html_output:
        args.html_output.parent.mkdir(parents=True, exist_ok=True)
        args.html_output.write_text(document, encoding='utf-8')
    args.output.parent.mkdir(parents=True, exist_ok=True)
    HTML(string=document, base_url=str(args.source.parent.resolve())).write_pdf(
        str(args.output), stylesheets=[CSS(filename=str(args.style))],
        optimize_images=True, jpeg_quality=80, dpi=180
    )
    reader = PdfReader(str(args.output))
    pages = len(reader.pages)
    if pages < 150:
        raise ValueError(f'PDF sospechosamente corto para Manual completo: {pages} páginas')
    manifest = {
        'source': str(args.source),
        'source_sha256': hashlib.sha256(source).hexdigest(),
        'generated_utc': datetime.now(timezone.utc).isoformat(),
        'edition': 'lectura; no certificado para imprenta',
        'pages': pages,
        'pdf_bytes': args.output.stat().st_size,
        'pdf_sha256': hashlib.sha256(args.output.read_bytes()).hexdigest(),
        'toc_entries': len(chapters),
        'wide_tables_converted_to_records': cards,
        'deity_illustrations': pictures,
        'original_covers': covers,
        'check': 'PDF renderizado, no revisión visual de todas las páginas'
    }
    target = args.manifest or args.output.with_suffix('.manifest.json')
    target.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding='utf-8')
    print(json.dumps(manifest, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
