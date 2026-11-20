# Decimocuarta pasada — auditoría visual y rediseño de tablas anchas

**Fecha:** 20-11-2026. **Rama:** `review/auditoria-editorial-integral-2026-11-19`.  
**Estado:** nueva composición generada y auditada automáticamente. **NO aprobada para imprenta.**

## Evidencia de inspección visual

Se abrió y examinó el PDF integral anterior de **463 páginas**, recuperado en el entorno de revisión. En imágenes reales de las páginas **32, 169 y 354** se observaron errores de legibilidad en tablas:

- **Página 32, Familiares:** tabla de 12 columnas con encabezados y nombres quebrados a mitad de palabra («Movimien/to», «Defe/nsa», «Compa/ñero»).
- **Página 169, Grimorio:** tabla de cuatro columnas donde se partían palabras en «Hechizo», «Grado», «Maná» y nombres de hechizos porque las tres primeras columnas tenían ancho insuficiente.
- **Página 354, PNJ y criaturas:** tabla de diez columnas con encabezados partidos («Vid/a», «Menta/l», «Maniobr/a»).
- Se abrió también una muestra legible de la página 203 para verificar el aspecto general de párrafos, tablas de tres columnas y folio.

**Dictamen:** las pruebas de geometría no captaban ese problema porque las palabras quebradas permanecían dentro de los límites físicos de la página. Por tanto, la afirmación «0 desbordes» no equivalía a calidad visual aprobada.

## Cambios aplicados al generador

Se modificó `tools/build-print-html.mjs`:

1. Las tablas con **siete o más columnas** se componen como **fichas de atributos**: cada fila conserva su título y todos los pares de encabezado/valor, distribuidos en una retícula de lectura. No se crean valores ni se descartan columnas.
2. Las tablas de cuatro columnas del Grimorio con encabezado «Hechizo» y «Resolución canónica» tienen anchos definidos: **24 % / 12 % / 9 % / 55 %**.
3. El texto de las tablas utiliza quiebres de palabra más conservadores y separación silábica cuando es compatible con el motor de composición.
4. Se preserva la fuente normativa y se siguen usando las mismas 52 anclas del manuscrito.

**El rediseño todavía necesita inspección visual ampliada de todas las tablas convertidas**, no solamente de una hoja de contacto.

## Auditoría automatizada incorporada

Se creó `tools/audit-print-layout.py` y se integró en `.github/workflows/manual-editorial-preview.yml`. El auditor inspecciona el PDF con PyMuPDF y genera:

- `Auditoria_Composicion_Visual.json` con señales de contenido corto, tamaños de fuente, títulos aislados, límites laterales y tablas de alto riesgo.
- `vistas_revision/contacto_general.jpg` con muestras de cubierta, índice, reglas, mundo y final.
- Capturas más grandes de páginas identificadas mediante términos de las tablas.

## Ejecución real tras los cambios

**GitHub Actions:** https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44762523845  
**Commit de composición:** `642849fa1915eca36b394119cdf6efc00431be83`  
**Estado:** `completed / success`.

| Control | Resultado |
|---|---:|
| Páginas del nuevo PDF | **500** |
| Tablas detectadas en el Markdown | **118** |
| Tablas de 7 o más columnas | **10** |
| Páginas cortas candidatas a revisión | **45** |
| Títulos aparentemente huérfanos en borde inferior | **0** |
| Líneas de texto inferiores a 7 pt detectadas | **0** |
| Texto fuera del área lateral conservadora | **0** |
| Páginas sin texto por Poppler | **0** |
| Caracteres NUL o U+FFFD según Poppler | **0** |
| Coincidencia mínima de tokens Poppler / PyMuPDF | **94,59 %** |
| Destinos de capítulos del índice | **52 de 52** |
| Folios del índice erróneos | **0** |

**Advertencia de extensión:** el libro pasó de 463 a **500 páginas** tras hacer más legibles las tablas anchas. Es una paginación provisional; deberá optimizarse con controles visuales para no aumentar innecesariamente coste y lomo de impresión.

Se consultó la hoja de contacto real de la nueva composición. Las fichas de familiares aparecen reorganizadas respecto al formato tabular antiguo, pero una miniatura no sustituye una inspección ampliada de cada ficha. El informe automatizado señala 45 páginas con baja ocupación vertical; algunas corresponden a aperturas o finales legítimos de capítulo y otras podrían admitir mejoras.

**Artefactos publicados:** `Tierra-Magica-Manual-Basico-PDF-Revision` y `Tierra-Magica-Manual-Basico-Prueba-HTML`, disponibles en la ejecución citada.

## Prioridades siguientes

1. Inspeccionar a tamaño de página completo las fichas transformadas y su separación entre páginas.
2. Revisar las 45 páginas cortas y distinguir portadillas/aperturas intencionales de pérdidas de espacio.
3. Optimizar la densidad de las fichas para acercar la paginación a una extensión de imprenta razonable sin volver a quebrar palabras.
4. Incorporar arte final con autorización, revisar tablas, generar folios definitivos y producir preflight según especificaciones de imprenta.

**Canon:** `main` y `docs/Tierra_Magica_Manual_Maestro.md` no fueron modificados. No afirmar que el Manual esté listo para imprenta.
