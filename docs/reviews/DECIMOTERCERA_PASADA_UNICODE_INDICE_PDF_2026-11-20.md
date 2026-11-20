# Decimotercera pasada — normalización de Unicode y validación del índice PDF

**Fecha:** 20-11-2026. **Rama:** `review/auditoria-editorial-integral-2026-11-19`. **Estado:** automatización exitosa; pendiente inspección visual y preflight de imprenta.

## Corrección de la fuente de lectura

La auditoría Poppler identificó un `U+FFFD` en la página 380 del PDF anterior, junto a la expresión «arcano�industrial». El cotejo directo de `docs/Tierra_Magica_Manual_Maestro.md` y del derivado mostró que ambos contenían un único carácter no permitido `U+FFFE` entre «arcano» e «industrial».

Se corrigió **solamente en la versión editorial derivada** la secuencia `arcano[U+FFFE]industrial` a `arcano-industrial`, y se añadió la normalización específica a `tools/build-print-manuscript.mjs` para que futuras reconstrucciones produzcan el texto correcto. No se modificó el Maestro, ni las reglas o estadísticas de juego.

## Evidencia real de la nueva compilación

GitHub Actions: https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44758916949

**Estado confirmado:** `completed / success`, incluyendo reproducción del manuscrito, HTML, PDF, auditoría de extracción Poppler y publicación de artefactos.

| Control | Resultado verificado |
|---|---:|
| Páginas PDF | **463** |
| Páginas reconocidas por Poppler | **463** |
| Páginas sin texto según Poppler | **0** |
| Caracteres NUL en Poppler | **0** |
| Caracteres de reemplazo U+FFFD en Poppler | **0** |
| Cobertura mínima por tokens frente a PyMuPDF | **100 %** |
| Anotaciones de enlace en todo el documento | **167**, tipo 4 (LINK_NAMED) |
| Enlaces internos en primeras doce páginas | **156** |
| Destinos únicos de los capítulos del índice | **52** |
| Capítulos del índice con destino | **52 de 52** |
| Capítulos faltantes del índice | **0** |
| Folios del índice que difieren del destino | **0** |
| Destinos fuera de rango | **0** |

**Corrección de diagnóstico:** el control anterior buscaba solamente enlaces `LINK_GOTO` y registraba cero enlaces; el PDF utilizaba enlaces `LINK_NAMED`. Tras corregir la auditoría, se confirma la presencia de 52 destinos de capítulos, y sus números de folio coinciden con las páginas de destino.

**Observación:** el resultado actual es de **463 páginas**, frente a 465 de las primeras pruebas. No se infiere la causa exacta de esa reducción sin una comparación de las salidas HTML y PDF; en esta fase la paginación sigue siendo provisional.

## Aún pendiente

1. Revisión visual de las vistas distribuidas y de tablas largas; la ausencia de desbordes y la paridad textual no demuestran ausencia de solapes.
2. Arte definitivo autorizado para ascendencias y otras secciones.
3. Preflight con especificación de impresor: sangrado, color ICC/PDF-X, cubierta, lomo, papel y márgenes definitivos.
4. Prueba de navegación y selección manual en lectores PDF reales.

**No aprobado para imprenta.** `main` y `docs/Tierra_Magica_Manual_Maestro.md` permanecen intactos.
