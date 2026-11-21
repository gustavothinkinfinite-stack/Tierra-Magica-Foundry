# Maquetación del Manual Básico de Tierra Mágica

**Estado: generación reproducible de una edición de lectura, no certificación de imprenta.**

La fuente única de contenido es docs/Tierra_Magica_Manual_Maestro.md. No se copia el canon a documentos alternativos. El generador produce un PDF de **6 × 9 pulgadas** con cubierta, página de título, índice con enlaces y número de página, capítulos, tablas (registros verticales para tablas con cuatro columnas o más), numeración y colofón.

## Compilar en una computadora

Con Python 3.11+ y fuentes Noto Serif/Lato instaladas:

    python -m pip install weasyprint markdown-it-py beautifulsoup4 pypdf

    python tools/editorial/maquetar_manual.py \
      --source docs/Tierra_Magica_Manual_Maestro.md \
      --style tools/editorial/maquetacion.css \
      --assets assets/editorial \
      --output dist/Tierra_Magica_Manual_Basico_Lectura.pdf \
      --manifest dist/Tierra_Magica_Manual_Basico_Lectura.manifest.json

El mismo comando se ejecuta desde .github/workflows/manual-basico-pdf.yml y adjunta **PDF, manifest y renders de muestra** como artefacto de GitHub Actions.

### Arte autorizado

El script utiliza los siguientes archivos si están presentes en assets/editorial/:
- Tapa delantera del Manual Basico.png
- Tapa trasera del Manual Basico.png
- Eïra, la Madre de la Primera Semilla.png
- Khorun, el Primer Forjador.png
- Varkor, el Señor de la Primera Guerra.png
- Aster, el Señor de las Mil Sendas.png
- Ilyr, el Portador de la Primera Luz.png
- Nereth, el Señor de la Primera Profanación.png
- Vaelun, el Guardián del Último Umbral.png
- Aurea, la Llama.png
- Nemor, el Guardián.png
- Oria, la Balanza.png
- Vael, el Navegante.png
- Selene, la Velada.png

Estos archivos visuales ya fueron aportados al proyecto en conversación. **Todavía deben incorporarse como archivos de arte al repositorio o suministrarse al ejecutor**. En GitHub Actions, si faltan las imágenes, se emplean tapas tipográficas de reemplazo y el manifest lo indica explícitamente. **No corresponde llamar a ese PDF edición ilustrada definitiva.** Está prohibido sustituir retratos por símbolos doctrinales no ratificados o inventar un mapa. Toda inserción de arte debe respetar la guía visual y el sistema cartográfico canónico.

## Alcance editorial

Se incluye desde **PARTE I** y **PARTE II** del Manual Maestro, seguido del **ANEXO CANÓNICO DE DOCE ASCENDENCIAS** y la **REFERENCIA RÁPIDA/GLOSARIO**. Se excluyen del PDF de lectura exclusivamente las secciones de bitácora administrativa de procedencia, estado de consolidación, recordatorios editoriales y modelo técnico CREA-11 que aparecen ENTRE el fin de Parte II y el anexo canónico. **No se modifica ni elimina ese contenido del archivo fuente**. El lector sigue encontrándolo en GitHub.

La paginación del índice se calcula durante la composición, no se inventan números anticipados. Los archivos derivados de dist/ no son fuentes de reglas.

## Checklist antes de aprobar la edición de imprenta

- [ ] PDF de lectura generado íntegramente en CI y revisado visualmente en portada, índice, cinco páginas elegidas al azar, tablas extensas y cierre.
- [ ] Cubiertas reales e ilustraciones dentro del repositorio; créditos y licencias.
- [ ] Material para mapa geográfico principal ratificado, legibilidad y ubicación editorial.
- [ ] Tabla de fuentes y símbolos del Panteón coherente con fichas canónicas.
- [ ] Sangrías, márgenes interiores, colofón, índice y zonas de corte comprobados.
- [ ] Sangrado exterior y perfiles cromáticos adecuados a la imprenta elegida (NO los establece la edición de lectura).
- [ ] Prueba de impresión física o digital con compensación de encuadernación.
- [ ] Dudas sustantivas de equipo/economía y fichas de PNJ resueltas en el Manual Maestro antes de declarar el contenido totalmente cerrado.

## Regla de honestidad del estado

**PDF de lectura generado** no equivale a **PDF con todas las ilustraciones** ni a **PDF apto para imprenta**. El workflow registra la huella SHA256 de fuente, número de páginas, qué cubiertas se encontraron y cuántos retratos se insertaron. Un workflow que falla no se considera PDF entregado.
