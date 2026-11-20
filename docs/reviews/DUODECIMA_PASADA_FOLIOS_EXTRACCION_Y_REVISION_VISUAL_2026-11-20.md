# Duodécima pasada — folios, capa de texto y revisión visual del PDF integral

**Fecha:** 20-11-2026. **Rama:** `review/auditoria-editorial-integral-2026-11-19`.  
**Estado:** nueva versión PDF generada y verificada; **no aprobada para imprenta**.

## Trabajos incorporados

1. `tools/build-print-html.mjs` pasó las 52 anclas de capítulo a los encabezados de los capítulos y añadió folios automáticos al índice mediante CSS de páginas.
2. El prefacio de gobernanza interna del manuscrito dejó de imprimirse en el cuerpo del libro. **No fue eliminado del Markdown ni del Manual Maestro.** La cubierta de prueba sigue identificando el estado editorial.
3. `tools/audit-print-extraction.py` añadió un tercer lector, Poppler (`pdftotext`), y comparó el texto extraído por página con PyMuPDF.
4. La auditoría detecta anotaciones de enlace `LINK_NAMED` (kind 4) y valida que los **52 folios visibles del índice coincidan con las páginas de destino del PDF**.
5. El workflow instala Poppler en el runner cuando no se encuentra y vuelve a publicar PDF, JSON de auditorías y muestras.

## Ejecución comprobada

**GitHub Actions:** https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44758916949  
**Commit probado:** `b56642080c1d94c3c4ca9b20226019b7e58ae748`  
**Resultado final:** `completed / success`.

| Control | Resultado |
|---|---|
| Páginas del PDF | **463**, anteriormente 465 |
| Tamaño de página | **Carta, 612 × 792 pt** |
| Capítulos de la fuente | **52** |
| Enlaces únicos del índice | **52** |
| Anotaciones navegables dentro del índice | **156** (tres zonas de enlace por capítulo) |
| Anotaciones internas en el PDF completo | **167** |
| Desajustes entre folio impreso y página de destino | **0** |
| Capítulos sin enlace en el índice | **0** |
| Páginas PDF sin texto suficiente según Poppler y PyMuPDF | **0** |
| NUL en Poppler | **0** |
| NUL en pypdf | **0**, en esta versión |
| NUL / caracteres de sustitución según controles registrados | **0** |
| Similitud de tokens Poppler vs. PyMuPDF, mínima y mediana | **1,0** |
| Bloques geométricos fuera de página | **0** |

Los resultados anteriores son los del **archivo PDF generado por el commit indicado**, no una garantía de que futuras compilaciones sean idénticas.

## Inspección visual realizada

Se descargó el PDF real de GitHub Actions y se abrió una hoja de contacto de **20 páginas distribuidas** por reglas, sección racial, fabricación, tablas, canon mundial y tramo final; además, se examinó una ampliación de un pasaje que presentaba un glifo defectuoso en una versión anterior.

**Hallazgos:**
- La versión de 465 páginas contenía dos páginas separadas dedicadas únicamente a metadatos y notas de trabajo. La nueva composición de **463 páginas ya no las imprime**.
- La versión más reciente no contiene en su capa de texto los caracteres `U+FFFD`/`U+FFFE` detectados previamente en el pasaje `arcano-industrial`.
- En las 20 vistas de baja resolución no se observaron colisiones visuales evidentes. Hay folios con poco contenido debido a los saltos de capítulo o de parte; es una **decisión de maquetación todavía revisable**.
- La página de apertura de «PARTE I» utiliza una hoja con mucho espacio vacío. Requiere tratamiento gráfico final, no necesariamente eliminación.
- La inspección a escala de hoja de contacto **no descarta** errores en tablas anchas, líneas cortadas o signos a tamaño real. No se han revisado visualmente las 463 páginas una a una.

## Límites que impiden declarar la impresión final

1. Ilustraciones definitivas de ascendencias y otros elementos: pendientes de integración, permisos y calidad de impresión.
2. Control visual exhaustivo de tablas, jerarquía, fuentes y viudas/huérfanas: pendiente.
3. Índice de consulta alfabético con folios finales: pendiente (el índice de **capítulos** ya presenta folios de esta prueba).
4. Preparación técnica de imprenta: cubierta definitiva, lomo, sangrado, perfil de color y PDF/X, según proveedor.
5. Paginación susceptible de cambiar después de incorporar ilustraciones y ajustes editoriales.

**Garantía de protección:** no se modificaron `main` ni `docs/Tierra_Magica_Manual_Maestro.md`.
