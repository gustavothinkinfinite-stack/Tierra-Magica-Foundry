# Duodécima pasada — tercer extractor PDF y navegación

**Fecha:** 20-11-2026. **Rama:** `review/auditoria-editorial-integral-2026-11-19`.  
**Ejecución de referencia:** https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44757863913  
**Estado:** tercera extracción ejecutada con éxito; incidencias de navegación y de carácter pendientes de diagnóstico. **No aprobado para imprenta**.

## Incidencia de infraestructura resuelta

La ejecución anterior `44757475844` falló en `command -v pdftotext`: el ejecutor no disponía del binario de Poppler. Se modificó `.github/workflows/manual-editorial-preview.yml` para instalar `poppler-utils` y confirmar `pdftotext -v` antes del test. El commit de corrección fue `c8ff7c0c2f03ae9ed53af4200e672a817b5338c3`.

## Resultados reales del tercer extractor

Métricas recuperadas directamente del registro del paso `Comparar extracción con Poppler e inspeccionar índice`:

| Verificación | Resultado |
|---|---:|
| Páginas del PDF | **465** |
| Páginas reconocidas por Poppler | **465** |
| Páginas Poppler con NUL | **0** |
| Caracteres NUL totales en Poppler | **0** |
| Páginas Poppler con carácter U+FFFD | **1** |
| Caracteres U+FFFD totales en Poppler | **1** |
| Páginas Poppler sin texto detectable | **0** |
| Páginas PyMuPDF sin texto detectable | **0** |
| Mediana de coincidencia de tokens Poppler / PyMuPDF | **1.0** |
| Coincidencia mínima de tokens | **1.0** |
| Páginas con coincidencia inferior a 85 % | **0** |
| Capítulos estructurales de la fuente | **52** |
| Enlaces internos detectados en primeras 12 páginas | **0** |
| Destinos únicos detectados en ese tramo | **0** |
| Enlaces con destino fuera de rango | **0**, pero sin enlaces detectados |

La coincidencia de tokens es un test de contenido en cada página, no una comprobación de orden de lectura, diacríticos, accesibilidad o indexación en todos los visores.

**Interpretación:** la gran cantidad de NUL observados con `pypdf` no se reproduce con `pdftotext` ni con PyMuPDF. Es probable que sea una incompatibilidad particular de extracción. **No está demostrado que haya una capa de texto defectuosa para todos los lectores.**

## Incidencias abiertas

**NAV-01 · Enlaces del índice.** El HTML generado incluye 52 enlaces `href="#tm-…"`, pero la auditoría no encontró enlaces PDF en las primeras doce páginas. Como ese tramo incluye el índice, es una incidencia de publicación verificable; requiere inspeccionar anotaciones PDF y comprobar si WeasyPrint omitió los enlaces, o si el criterio de `page.get_links()` no los reconoce. No afirmar que el índice del PDF ya es clicable.

**TXT-01 · Carácter de reemplazo.** Poppler detectó un único `U+FFFD` en una página. Registrar página, contexto y origen antes de intentar cualquier sustitución; **no modificar el contenido normativo por una anomalía de extracción sin localizar**.

**VIS-01 · Maquetación.** Siguen pendientes el examen visual humano de vistas PNG, las tablas extensas, dobles páginas, márgenes, huérfanas y viudas.

## Próximos controles

1. Ampliar la auditoría de enlaces a las 465 páginas y reportar tipo de anotación (`LINK_GOTO`, `LINK_NAMED` o URI) sin asumir que la ausencia implica un destino inválido.
2. Localizar el carácter de reemplazo de Poppler por página y contexto; cotejar con PyMuPDF y fuente.
3. Si la ausencia de enlaces persiste, corregir la producción del índice PDF con destinos efectivos y exigir una prueba automatizada de mínimo 52 remisiones al índice.
4. Revisar visualmente muestras y corregir cuadros/tablas antes de integrar arte definitivo.

No se modifica `main` ni el Manual Maestro. El PDF de 465 páginas es una **prueba editorial**, no un preflight de imprenta.
