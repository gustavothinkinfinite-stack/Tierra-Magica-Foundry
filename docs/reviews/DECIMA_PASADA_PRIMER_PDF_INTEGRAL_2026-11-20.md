# Décima pasada — primer PDF integral del Manual Básico

**Fecha:** 20-11-2026.  
**Rama:** `review/auditoria-editorial-integral-2026-11-19`.  
**Estado:** PDF de revisión **generado y comprobado técnicamente**, **NO aprobado para imprenta**.

## Producción real

Se incorporaron:

- `tools/render-print-review.py`: conversión del HTML completo a PDF mediante WeasyPrint y análisis del resultado con pypdf.
- `.github/workflows/manual-editorial-preview.yml`: genera y publica HTML, PDF, control JSON y vistas PNG de páginas iniciales.
- Se conservaron el control Node del manuscrito y la generación del HTML integral.

**GitHub Actions:** https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44754678760  
**Commit de ejecución:** `3096ef08c48c3330a56f4e4da5f6125a3d74c25e`.  
**Resultado:** `completed / success`. Se inspeccionaron los pasos del job y su registro de ejecución, no solo el estado general.

## Datos verificados de la ejecución

| Control | Resultado |
|---|---|
| Comparación independiente del Markdown reconstruido con el versionado (Node) | success |
| Construcción HTML integral | success |
| Instalación de conversor WeasyPrint y lector pypdf | success |
| Renderizado PDF | success |
| Extensión real del PDF | **465 páginas** |
| Formato solicitado | **Carta / US Letter, 612 × 792 pt** |
| Páginas con dimensiones incorrectas | **0** |
| Páginas con menos de 15 caracteres extraíbles, según pypdf | **0** |
| Generación de vistas de páginas iniciales | success |
| Publicación de PDF, JSON y vistas | success |

Artefacto ZIP `Tierra-Magica-Manual-Basico-PDF-Revision`: **1.196.063 bytes comprimidos**, ID de GitHub Actions `14636793554` al verificar, disponible en la página de ejecución. El artefacto HTML también se publicó correctamente.

## Límites de calidad observados

- **No se inspeccionaron visualmente las 465 páginas.** El workflow genera imágenes de las páginas iniciales, pero la inspección visual y el control de desbordamientos, viudas, líneas cortadas y tablas requieren una pasada adicional.
- Los fragmentos textuales extraídos del PDF mediante pypdf presentan en el registro del workflow **caracteres NUL intercalados** en parte del texto. Esto no significa automáticamente que el texto visible esté dañado, pero es una señal concreta que requiere verificar copia/selección y accesibilidad/búsqueda antes de publicar.
- La validación de página no demuestra que las tablas extensas sean legibles o que no haya cortes inapropiados.
- No existen ilustraciones definitivas integradas; los huecos de arte son provisionales.
- El PDF no implementa PDF/X, perfil ICC, sangrado ni cubierta/lomo de producción. Las especificaciones deben cotejarse con la imprenta.
- Se mantienen los 52 capítulos y el índice navegable, pero **no hay índice de folios definitivos verificado**.

## Próxima puerta de revisión

1. Auditar una muestra estratificada de páginas de portada, índices, reglas, ascendencias, capítulos con tablas largas, mundo y panteón.
2. Investigar los NUL observados en la extracción para decidir si el PDF requiere corrección de fuentes o un método de conversión diferente.
3. Corregir desbordamientos visuales y puntos de corte con pruebas sucesivas de PDF.
4. Integrar ilustraciones con permisos/dimensiones suficientes, comprobar la nueva paginación y construir los índices definitivos.
5. Realizar la auditoría del texto integral respecto al Maestro y el preflight de imprenta.

**Garantías:** no se ha modificado `main` ni `docs/Tierra_Magica_Manual_Maestro.md`. No se declara el libro listo para imprimir.
