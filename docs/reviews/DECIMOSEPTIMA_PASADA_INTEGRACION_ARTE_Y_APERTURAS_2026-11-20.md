# Decimoséptima pasada — integración controlada de arte y revisión de aperturas

**Fecha:** 20-11-2026. **Rama:** `review/auditoria-editorial-integral-2026-11-19`.
**Estado:** mecanismo de arte preparado y prueba de PDF exitosa. **Ilustraciones definitivas integradas: 0 de 12. NO aprobado para imprenta.**

## Aperturas y páginas de separación

La composición actual conserva la regla de que los 52 títulos de capítulo identificados con anclas `tm-*` comienzan sección nueva, con excepción de la introducción inmediata después de un título de Parte. La auditoría precedente detectó **25 páginas cortas** antes de encabezados reconocibles, **0 páginas cortas sin cambio claro** y **0 últimas páginas anormalmente cortas**.

No se debe eliminar todos esos blancos automáticamente: parte de ellos corresponde al inicio deliberado de capítulos, pero el formato definitivo requerirá decidir si la edición impresa usa inicio a página nueva o inicio a página impar y revisar las aperturas estéticas.

## Preparación de las doce ilustraciones

Se añadió `docs/edicion_impresa/Manifest_Ilustraciones_Ascendencias.json` con las doce entradas en el orden del manual: Humanos, Enanos, Élficos, Orcos, Goblinoides, Terios / Anihombres, Feéricos, Ankar, Cristálidos, Verdantes, Micelios, Coralios.

**Se verificó en GitHub que los 12 briefs existentes se pueden abrir**, incluido `propuestas/razas/06_terios/brief_arte.md`. Los briefs son referencias artísticas en borrador; **no constituyen piezas finales ni autorizan su generación automática**.

El generador `tools/build-print-html.mjs` ahora:
- Lee el manifiesto de arte y verifica exactamente doce ascendencias en el orden del texto.
- Para estado `pendiente`, muestra una reserva de imagen claramente identificada, sin simular que hay arte aprobado.
- Para estado `aprobado`, exige archivo PNG en `assets/ilustraciones/ascendencias/<slug>.png`, campos no vacíos de autor, licencia, créditos y descripción alternativa.
- Verifica firma PNG y dimensión mínima **1600 × 1000 píxeles** antes de incluir la imagen.
- Emite una figura con descripción alternativa y crédito para la edición de prueba.
- Detiene la construcción si se declara arte aprobado pero el archivo o los datos son inválidos.

No se añadieron imágenes nuevas ni se atribuyeron licencias inexistentes.

## Compilación real

**GitHub Actions:** https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44769932520

**Estado comprobado:** `completed / success`.

| Control | Resultado |
|---|---:|
| Capítulos | 52 |
| Ascendencias | 12 |
| Tablas del manuscrito | 118 |
| Ilustraciones aprobadas/integradas | **0** |
| Ilustraciones aún pendientes | **12** |
| Extensión del PDF | **469 páginas** |
| Enlaces del índice con destino correcto | **52/52** |
| Folios discrepantes | 0 |
| Páginas cortas sin cambio claro | 0 |
| Páginas cortas antes de un nuevo capítulo | 25 |
| Caracteres NUL o U+FFFD detectados por Poppler | 0/0 |
| Páginas sin texto según Poppler | 0 |
| Concordancia Poppler/PyMuPDF inferior al 85 % | 0 páginas |

La primera ejecución de la nueva implementación falló por una colisión entre el nombre `sep` del detector de tablas y el separador de rutas; se resolvió renombrando este último a `pathSep` y la compilación posterior terminó bien. **No se ha probado todavía la rama de código que renderiza un PNG marcado como aprobado**, porque ninguna pieza final está disponible; el test de esta pasada valida la ruta de espera.

## Siguiente puerta editorial

1. Aprobar o corregir la dirección artística de las doce piezas, con base en sus briefs existentes.
2. Incorporar imágenes realmente finales como PNG, comprobar permisos de reproducción, registrar créditos y aprobar cada entrada en el manifiesto.
3. Ejecutar una primera compilación con una pieza aprobada para comprobar a tamaño real el espacio y el tratamiento tipográfico.
4. Decidir las reglas finales de comienzo de capítulos y revisar la imposición del libro; la introducción de ilustraciones obligará a recalcular la paginación.
5. Realizar el preflight de imprenta (sin sangrado, perfil ICC y PDF/X verificados actualmente).

**Protección:** `main` y `docs/Tierra_Magica_Manual_Maestro.md` no se han modificado.
