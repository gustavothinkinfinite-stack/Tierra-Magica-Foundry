# Decimocuarta pasada — auditoría de páginas cortas y continuidad

**Fecha:** 20-11-2026. **Rama:** `review/auditoria-editorial-integral-2026-11-19`.

## Ejecución real

**GitHub Actions:** https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44762930474  
**Commit ejecutado:** `f8d8d5cffc514104a3ec7a815e891192d8fd910c`.  
**Resultado:** `completed / success`.

El script nuevo `tools/audit-print-pagination.py` examina el contenido extraíble de cada página e identifica páginas con última línea del cuerpo antes de los 395 puntos verticales. Consulta después las primeras líneas de la página siguiente para distinguir cambios de capítulo/parte de cortes que merecen inspección.

## Resultados

| Control | Resultado |
|---|---:|
| **Extensión del PDF actual** | **500 páginas** |
| Páginas reconocidas por Poppler | 500 |
| Candidatas cortas | **45** |
| Cortas inmediatamente antes de encabezado reconocible | **25** |
| Cortas sin cambio claro | **19** |
| Última página corta | **1** |
| Tablas en Markdown | 118 |
| Tablas de 7 columnas o más | 10 |
| Posibles encabezados huérfanos detectados | 0 |
| Líneas de texto menores de 7 pt según el detector | 0 |
| Bloques fuera de margen conservador | 0 |
| Caracteres NUL / U+FFFD detectados por Poppler | 0 / 0 |
| Capítulos con enlaces desde índice | 52/52 |
| Folios discrepantes con páginas de destino | 0 |
| Páginas con coincidencia textual Poppler / PyMuPDF inferior al 85 % | 0 |

## Advertencia de versión

En una ejecución anterior, el documento tenía **463 páginas**. El PDF actual tiene **500**. La composición HTML y su CSS evolucionaron entre ambas versiones, incluyendo tratamientos especiales para tablas anchas. **No debe tratarse la variación de 37 páginas como una pérdida o incorporación de reglas sin un cotejo específico de texto.** Los controles actuales verifican la reproducibilidad del Markdown y el índice; falta contrastar cambios de paginación y densidad.

## Prioridad de intervención

1. **19 páginas cortas sin cambio claro:** abrir sus números exactos desde el artefacto `Auditoria_Paginas_Cortas_y_Continuidad.json`; evaluar si el espacio vacío corresponde a tablas/cards mantenidas indivisibles, capítulos o saltos tipográficos y decidir ajustes localizados.
2. **25 cierres antes de encabezado:** revisar la intención estética, pero no forzar relleno ni mover reglas arbitrariamente.
3. **10 tablas anchas:** inspeccionar sus tarjetas de atributos en tamaño Carta; comparar cada par de encabezado-valor contra la fuente, ya que el cambio de formato no debe alterar datos.
4. **Control visual:** descargar y revisar las hojas de contacto y vistas de tablas del artefacto de la ejecución. Los scripts han producido imágenes, pero el informe no equivale a una revisión humana de todas ellas.

## Estado

**Generación automatizada conforme; revisión visual e imprenta pendientes.** El informe clasifica señales, no acredita que las 19 páginas sean defectuosas. No se modificaron `main` ni `docs/Tierra_Magica_Manual_Maestro.md`.
