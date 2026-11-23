# Tierra Mágica — registro de cierre editorial del Manual Básico

**Fecha:** 20-11-2026. **Autoridad:** `docs/Tierra_Magica_Manual_Maestro.md` en `main` después de integrar los cambios verificados. **Criterio:** autorización global del creador para completar edición, resolver decisiones pendientes con fundamento y producir el libro. No crear otra fuente canónica, alterar datos por intuición ni declarar una prueba/artefacto no realizado.

## Estado consolidado

| Frente de trabajo | Estado comprobado en este ciclo | Próxima condición verificable |
|---|---|---|
| Paquetes raciales y B5 | 12/12 razas canonizadas y normas B5 integradas previamente; **en esta unidad** se sincroniza Don sin Forma, Enraizar/Derribar y Movimiento mixto en capítulos y reglas | Revisión terminológica/tabla de enlaces durante maqueta |
| Culturas y variantes | Ejemplos culturales en anexo identificados como **ejemplos locales no universales** en vez de alternativas de reglas; no conceden habilidades ni lugares nuevos | Revisar estilo y nombres culturales en artes/mapas sin fijar topónimos no ratificados |
| Referencia rápida y glosario | **54 términos** y hoja de consulta de reglas integrados al Manual, junto con índice temático por capítulos | Crear **índice con números de página** sólo después de paginación final |
| Equipo/moneda/mercados | Precios exactos, moneda c/p/o y límites de compra ya existen. Tabla canónica de **25 objetos EQP-01**; otras 65 propuestas mundanas y 10 especiales no son automáticamente canon | Auditar 25 entradas contra catálogo de equipo, resolver `unspecified`, Disponibilidad de cinco grados vs cuatro mercados, restringidas/licencias; diseñar precios/servicios con expediente justificado, sin valores inventados |
| PNJ, criaturas y familiares | 11 perfiles de referencia y 11 ejemplos de encuentro; cinco perfiles tienen campos contextuales que no definen plantilla universal por sí solos | Elegir/normalizar fichas listas para jugar **por encuentro** y verificar costes/acciones sin atribuir poderes no escritos; distinguir contenido experimental |
| Panteón y símbolos | Cinco Luminarias tienen símbolos CANON v1.0. Los siete Primordiales cuentan con historia e imágenes de personaje, pero **no se confunde ilustración de deidad con símbolo doctrinal** | Auditoría de coherencia de los doce; registrar lo que tenga ficha simbólica propia y cerrar diseños faltantes con guía visual, sin inferirlos de retratos |
| Mapa principal | Existe dirección cartográfica canónica y archivos de inventario geográfico; el mapa debe respetar el canon y no introducir fronteras o ciudades por decoración | Preflight geográfico y control de escala/rotulación antes de incluir mapa |
| Arte y cubiertas | Hay portada/contraportada y retratos de dioses aportados en el proyecto. **No se declara una versión final del PDF por existir archivos gráficos** | Inventario visual, identificación de créditos/permisos, calidad de resolución/corte y selección final |
| Texto del libro | Manual Maestro de gran extensión con reglas, cosmos, pueblos, ejemplos y nueva referencia rápida. No existe PDF maquetado verificado en este ciclo | Limpieza estructural, estilos tipográficos, ubicación de ilustraciones, saltos de página, tablas, pies, índices, créditos y exportación con inspección visual |
| Foundry VTT | La automatización de reglas B5 y pruebas reales del módulo son asunto técnico separado | No afirmar versión nueva del módulo por completar el libro |

## Secuencia de trabajo por horas

1. **Economía/equipo:** comparar catálogo canónico, precios, unidades comerciales, mercado/disponibilidad y autorización de restringidos con reglas y pruebas.
2. **Plantillas y ejemplos:** completar únicamente elecciones expresas necesarias para encuentros jugables, con trazabilidad frente a valores del Manual.
3. **Panteón/iconografía:** revisar los Doce y sus símbolos doctrinales, distinguiendo imágenes existentes de fichas simbólicas no ratificadas.
4. **Preflight de diseño:** revisar guía visual Tierra Mágica v1, inventario geográfico, sistema cartográfico, cubiertas y arte aportado antes de generar ilustraciones nuevas.
5. **Producción final:** resolver inconsistencias de título/índice/capítulo, recopilar arte con créditos, montar páginas del libro, exportar y renderizar el PDF para comprobar glifos, recortes, márgenes, tablas y paginación.
6. **Certificación editorial:** repetir comparación de fuentes, registrar el SHA final del Manual y enlaces reales a archivos de distribución; **sólo entonces** marcar «libro listo para lectura/impresión».

## Controles y límites

- El usuario autorizó adoptar **decisiones editoriales** necesarias, pero la aprobación no fabrica datos canónicos inexistentes: precios, disponibilidad individual, fichas de arte y escenas deben justificarse mediante fuente, decisión escrita o diseño aprobado en el Manual.
- Toda actualización del Manual conserva las normas aprobadas B5; no se introducen dos variantes simultáneas de una maniobra.
- No confundir **cierre del contenido**, **libro con diseño completo**, **PDF de imprenta comprobado** y **release de Foundry**.
- Conservar historial mediante rama/PR, referenciar commits y marcar diferencias reales. Si una tarea de la secuencia ya está completada en otra rama, cotejar y evitar duplicación.
- La tarea recurrente **Finalizar libro Tierra Mágica** revisará esta lista cada hora y hará una unidad verificable, actualizando progreso con datos confirmados.

**Último avance de esta unidad:** sincronización editorial de reglas B5 en anexo racial y catálogo del Don, referencia rápida y glosario de 54 términos. Pendientes sustantivos: economía, fichas, símbolos, preflight visual, maqueta, índice de páginas y PDF.


## 21-11-2026 — Infraestructura de maquetación integral

- **PR #124 fusionado** en main, commit 3b5a79693a1f7e658f8aa038766874a489342610: herramientas 'tools/editorial/maquetar_manual.py' y 'maquetacion.css' y workflow '.github/workflows/manual-basico-pdf.yml'.
- Se implementó extracción controlada de **PARTE I + PARTE II + ANEXO CANÓNICO DE LAS DOCE ASCENDENCIAS + REFERENCIA RÁPIDA/GLOSARIO**, sin incluir la bitácora administrativa intermedia en la edición para lectores; no se modifica el contenido del Manual Maestro.
- Formato **6×9 pulgadas** con cubiertas opcionales, página de título, índice con **números de página calculados en composición**, jerarquía de títulos, corrección de tablas anchas a fichas de registro, numeración, encabezados, pies y marcadores de capítulo.
- El script genera **PDF, manifest SHA256/páginas/imágenes incluidas y HTML opcional**. GitHub Actions tiene un pipeline de PDF y artefacto descargable sujeto a ejecución exitosa.
- **Prueba local de motor**, con un manuscrito de humo de 111.419 caracteres (no texto canónico): PDF de **74 páginas** generado, formato verificado y varias páginas inspeccionadas. **No equivale a comprobación del Manual completo**.
- **No hay todavía constancia validada en este registro de ejecución exitosa del workflow ni de PDF completo entregado**. No se afirmará lo contrario hasta comprobar un manifest y archivo real.
- Los **archivos artísticos** aportados por el usuario existen en el contexto del proyecto, pero no se encontraron en el repositorio bajo 'assets/editorial/'. El flujo usa cubiertas tipográficas de reserva y manifiesta la ausencia. **Incorporar imágenes autorizadas** a esa ruta antes de cerrar edición ilustrada.
- **Preflight de imprenta pendiente**: créditos, derechos, sangrado, perfil CMYK/colores, imposición, índice paginado final, mapas y validación de páginas con tablas extensas.

**Próxima tarea horaria prioritaria:** comprobar la ejecución del workflow nuevo y, si falla, corregirlo; después incorporar portada, contraportada y retratos existentes a la ruta de activos (sin transformar iconografía doctrinal) y revisar visualmente una muestra amplia del PDF real. No abrir otra rama paralela de maquetación sin consultar este estado.


## 21-11-2026 — Control CI de activos editoriales

- **Base revisada:** main commit `b4b92446c50441f2e3a674ca5a7b28b9c77a8442`; Manual Maestro blob `b315dbf5725c203246079048de52542ad23c6e3a`. Se releen workflow, maquetador y este registro.
- **Hallazgo reproducible por lectura del YAML:** el workflow sólo se disparaba por cambios de Manual, Python, CSS o propio workflow. Agregar cubiertas/retratos a `assets/editorial/` no disparaba la generación automática, aunque el script sí consume esa ruta.
- **Corrección:** añadir `assets/editorial/**` a los filtros de `push.paths` del workflow; archivo único de CI modificado. Commit de la corrección `aa5fd5bb4efacba46dd753fe03a8789fa8350969`.
- **Límite de verificación:** la lectura de archivos y el diff son comprobables, pero el conector GitHub disponible no expone listado de ejecuciones por workflow y la consulta pública al endpoint de Actions no devolvió datos. **No se confirma ejecución exitosa, artifact, manifest ni PDF completo.** No se descargaron ni inspeccionaron páginas reales.
- **Siguientes controles:** consultar [Actions del manual](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/workflows/manual-basico-pdf.yml), obtener ID de ejecución, conclusión, artifact y manifest, comparar SHA-256 con fuente y PDF, inspeccionar muestras. Incorporar únicamente arte autorizado existente y revisar licencias/créditos. Continuar preflight y economía/PNJ sin confundir PDF de lectura con libro final o imprenta.


## 21-11-2026 — Verificación efectiva del PDF completo (CI-ED-02)

- **Main revisado antes del cambio:** `b4b92446c50441f2e3a674ca5a7b28b9c77a8442`. Se verificó y fusionó PR #125, commit de merge `9bf4873616025a9e63fc6f717a45b9f4f7b41100`; ahora `assets/editorial/**` activa regeneración en push.
- **Workflow de lectura verificado:** ejecución [44904014385](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44904014385), 21-11-2026 12:27 UTC, conclusión **success**, fuente commit `3b5a79693a1f7e658f8aa038766874a489342610`. Se inspeccionaron pasos del job: composición, control de integridad y carga de artifact exitosos.
- **Artifact descargado e inspeccionado:** [artifact 14707700181](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44904014385/artifacts/14707700181), ZIP 1.785.036 bytes, caduca 21-12-2026. Contiene PDF real `Tierra_Magica_Manual_Basico_Lectura.pdf`, manifest JSON y dos PNG de control. Manifest: fuente SHA-256 `c4ebd0cfe26a8d87e1f84ca1764c0e87aa33d68382003c67e9a5e11749f4bb78`; 598 páginas, 69 entradas de índice, 39 tablas anchas convertidas a registros, 0 retratos divinos, 0 cubiertas originales. PDF real: 1.703.956 bytes, SHA-256 independiente `5ec3f0197a50b5110f369d41bce671b4fab0aa8c823ea4a4baef2ee5ff2df57d`, formato 432 × 648 pt (6×9 pulgadas). Se comprobó apertura y extracción de texto de páginas 1, 2, 3, 11, 300 y 598, y se renderizaron muestras.
- **Límite de calidad:** muestra de página 11 legible en inspección visual; **no** se inspeccionaron las 598 páginas ni se certificó el índice, las 39 conversiones de tablas, fuentes, cubiertas o imprenta. El manifest no incluye huella SHA-256 del PDF; la huella anterior es cálculo independiente del archivo descargado. El PDF de lectura existe, pero **no es el libro ilustrado definitivo ni PDF de imprenta**.
- **Siguientes pendientes:** incorporar cubiertas y doce retratos existentes con permisos/créditos comprobados; regenerar PDF y contrastar manifest; muestrear tablas/índice, detectar desbordes; mapa oficial, créditos y preflight de imprenta. Mantener fuente canónica única y no alterar iconografía.


## 21-11-2026 — Integridad del manifiesto PDF (CI-ED-03)

- **Fuente canónica releída en main:** `docs/Tierra_Magica_Manual_Maestro.md`, blob `b315dbf5725c203246079048de52542ad23c6e3a`. Registro editorial y maquetador también releídos antes de editar. No se modificó el canon.
- **Hallazgo:** el manifiesto de la ejecución 44904014385 declara tamaño del PDF, pero no su SHA-256. Esto impide contrastar automáticamente el binario descargado contra una huella publicada por el propio proceso de composición.
- **Cambio trazable:** `tools/editorial/maquetar_manual.py` incorpora `pdf_sha256` calculado sobre los bytes del PDF recién exportado. Commit de código `3f1626d47a03c5253e427ec74ea435c5d4a3b405`; la salida JSON futura tendrá esa huella además de `source_sha256` y `pdf_bytes`.
- **Control independiente sobre artifact anterior:** ZIP local original contiene PDF, manifest y dos PNG de control; SHA-256 del PDF descargado `5ec3f0197a50b5110f369d41bce671b4fab0aa8c823ea4a4baef2ee5ff2df57d` (calculado con `sha256sum`). Este artifact **es anterior a la modificación** y no demuestra que el campo nuevo haya sido ejecutado en CI.
- **Pendiente obligatorio:** fusionar PR, esperar nueva ejecución de Actions, descargar artifact y comprobar `pdf_sha256` contra el PDF real; luego inspección de tablas, índice, arte autorizado, mapa, créditos y preflight. No afirmar nuevo PDF ni aptitud de imprenta hasta verificarlos.


## 21-11-2026 — Control CI-ED-04: contraste de huellas en el workflow

- **Base de `main` consultada:** commit `7ee06a1520557381588a51c0c0e5ed83fd74a32e`; Manual Maestro blob `b315dbf5725c203246079048de52542ad23c6e3a`. Se releen fuente canónica, workflow, maquetador y este expediente antes del cambio.
- **Hallazgo:** el maquetador ya escribe `pdf_sha256`, `source_sha256` y `pdf_bytes` en el manifest, pero el control CI sólo comprobaba páginas, entradas del índice y muestras PNG. No contrastaba las huellas con los archivos reales.
- **Corrección:** en `.github/workflows/manual-basico-pdf.yml`, comprobar SHA-256 del PDF, SHA-256 de la fuente canónica y tamaño del PDF frente al manifest. Los `assert` fallarán antes de subir el artifact si hay divergencias. No se alteran reglas ni imágenes.
- **Evidencia:** cambio de workflow commit `2db57c88694031f3eb555c2d5beba42b4d459b6e`. El control es revisión estática del YAML; **no se afirma ejecución exitosa de CI posterior a este cambio** ni PDF regenerado.
- **Pendientes:** confirmar nueva ejecución y artifact con `pdf_sha256`; inspección de índice y tablas del PDF completo; recuperar únicamente cubiertas y doce retratos autorizados, documentar permisos/créditos; verificar mapa, preflight y exportación de imprenta. La salida de lectura previa de 598 páginas sigue siendo preliminar y no equivale a libro ilustrado o PDF de imprenta.


## 21-11-2026 — QA-ED-01: auditoría estructural del PDF de lectura

- Base `main`: `e0e3afe49c565ee105fe6e971584fe9e2f68c2e8` (PR #127 fusionado). Fuente canónica sin cambios.
- Artifact anterior de Actions #44904014385: PDF SHA-256 `5ec3f0197a50b5110f369d41bce671b4fab0aa8c823ea4a4baef2ee5ff2df57d`. Inspección local real con PyMuPDF: 598 páginas de 432×648 pt; ninguna con menos de 20 caracteres extraídos; 1.012 marcadores PDF, distintos de las 69 entradas del índice impreso; muestras de páginas 1–6, 11, 101, 300 y 598. Páginas 2 y 4 sólo tienen cabecera y número; requiere revisión de cortesía.
- Expediente detallado: [`QA-ED-01_auditoria_pdf_lectura_2026-11-21.md`](QA-ED-01_auditoria_pdf_lectura_2026-11-21.md), commit `8e71cba8ee3ca4a5f8936a8f3a8c8c889a3ea2b8`.
- El conector de runs asociado a commit de merge devuelve lista vacía porque filtra eventos de PR: **no permite descartar un run push**. Nuevo artifact con hashes CI-ED-04 aún sin verificar. No se generó PDF nuevo.
- Siguiente prioridad: comprobar Actions posterior a #127, descargar y contrastar manifest; después incorporar arte autorizado y auditar índice/tablas visualmente. Libro ilustrado e imprenta pendientes.


## 21-11-2026 — QA-ED-01 integrado (seguimiento)

- PR [#128](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/pull/128) fusionado en `main`; SHA de integración `fd460d055739582b6d48955be3cbcb5c5f10104a` (verificado por respuesta de GitHub).
- Expediente `docs/editorial/QA-ED-01_auditoria_pdf_lectura_2026-11-21.md` incorporado. La fuente canónica no fue editada por este PR.
- Se volvió a comprobar localmente la existencia del PDF preliminar del artifact anterior y su SHA-256 `5ec3f0197a50b5110f369d41bce671b4fab0aa8c823ea4a4baef2ee5ff2df57d`. Esta comprobación **no** equivale a validar un artifact generado después de #127.
- Pendiente inmediato: obtener ejecución posterior al merge #127 y su artifact, contrastar `pdf_sha256`, `source_sha256`, `pdf_bytes`; luego inspección visual de índice/tablas, arte autorizado, mapa y preflight de imprenta. Sin certificación de libro ilustrado ni PDF de imprenta.


## 21-11-2026 — QA-ED-02: enlaces y extracción de texto

- Base revisada de `main`: `93c91b37ea4b215b6b3d85ec94ab4c86ddf816c7`. Fuente canónica no modificada.
- PDF binario previo (Actions #44904014385) SHA-256 `5ec3f0197a50b5110f369d41bce671b4fab0aa8c823ea4a4baef2ee5ff2df57d`; `pypdf` confirma 598 páginas y 424 enlaces PDF, ninguno sin destino o URI declarado.
- Hallazgo nuevo: extracción de texto con caracteres nulos intercalados en varias páginas muestreadas (1, 3, 11, 300 y 598); investigar tipografía y accesibilidad sin confundir extracción defectuosa con defecto visual demostrado.
- Expediente: [QA-ED-02](QA-ED-02_enlaces_extraccion_2026-11-21.md); commit de expediente `089d1b8dfa49aa2d3681a332bdc5c392291ba2d7`.
- El conector de runs por SHA `93c91b37ea4b215b6b3d85ec94ab4c86ddf816c7` devolvió cero ejecuciones (filtro de PR); **no prueba ausencia de ejecución push**. Artifact posterior a #127 no validado. Pendientes: manifest nuevo, enlaces semánticos del índice, arte autorizado, tablas y preflight de imprenta.


## 21-11-2026 — QA-ED-02 integrado (seguimiento)

- PR [#129](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/pull/129) fusionado en `main`, SHA de integración `b1761d545badbbcab5042b6511dab555a3650c17`; expediente `docs/editorial/QA-ED-02_enlaces_extraccion_2026-11-21.md` incorporado.
- Verificado en la lectura actual de `main` que el workflow conserva los controles `pdf_sha256`, `source_sha256` y `pdf_bytes`. No se ha descargado ni validado en esta unidad un artifact posterior al PR #127: el PDF de 598 páginas citado en QA-ED-02 sigue siendo el anterior.
- La anomalía de extracción con caracteres nulos es un hallazgo pendiente de diagnóstico, no una corrección aplicada ni un defecto de impresión demostrado.
- Próximos bloqueos: ejecución/artifact nuevo y manifest contrastado; inventario binario de cubiertas y doce retratos autorizados, revisión visual de índice/tablas, créditos, mapa y preflight de imprenta. No se declara libro ilustrado ni PDF de imprenta final.


## 21-11-2026 — QA-ED-03: contraste de extracción PDF

- **Base main comprobada:** commit `63534d46e67db58257a1eba5321c86fb00752f42`; fuente canónica sin cambios. Se releyeron workflow, maquetador y expediente antes de modificar.
- **PDF preliminar anterior:** artifact [14707700181](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44904014385/artifacts/14707700181), procedente de ejecución exitosa [44904014385](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44904014385), anterior a controles de integridad PR #127.
- **Prueba local ejecutada sobre el PDF real de 598 páginas:** `pypdf.PdfReader(...).pages[i].extract_text()` presenta NUL en **557 páginas**; página 11 tiene **1.459 NUL**. En contraste, `pdftotext -f 11 -l 11 -layout` (Poppler) devuelve texto español legible en esa página. **No atribuir automáticamente el problema al PDF ni certificar accesibilidad**: hay discrepancia entre extractores.
- **Cambios propuestos:** `tools/editorial/auditar_extraccion_pdf.py` audita todas las páginas mediante pypdf y Poppler, produce `dist/control/extraccion_texto.json`; workflow lo adjunta al artifact y reacciona a cambios del script. Diagnóstico **no bloqueante**, sin alterar reglas ni canon.
- **Commits de rama:** script `287d32eda2a15356e9473992284999851a2eea6a`; CI `adadd9b51e2a89149f62b720abda464a63e24488`. Falta validación de la nueva ejecución en Actions y del JSON real.
- **Pendientes prioritarios:** obtener artifact posterior a PR #127 y verificar SHA del PDF y fuente contra manifest; inspeccionar anomalías del diagnóstico; incorporar cubiertas y doce retratos autorizados con permisos y resolución comprobados; tablas, índice, cartografía, créditos y preflight de imprenta. PDF de lectura preliminar no equivale a edición ilustrada ni PDF de imprenta.


## 21-11-2026 — QA-ED-03 integrado (control de extracción)

- PR #130 fusionado en `main`, SHA de integración `2ea7b5c714c556b7a3114cbf2ff6f01c0810190e`. Se incorporan el auditor `tools/editorial/auditar_extraccion_pdf.py` y la instrumentación de diagnóstico en el workflow. La fuente canónica `docs/Tierra_Magica_Manual_Maestro.md` no fue editada en esta unidad.
- La auditoría compara extracción de `pypdf` y Poppler y conserva resultados JSON como evidencia, sin interpretar automáticamente diferencias de extracción como fallas de impresión.
- **No se verificó todavía una ejecución de Actions posterior a este merge**, ni se descargó su artifact: el resultado de este cambio en CI queda pendiente de confirmación. El último PDF binario previamente comprobado sigue siendo la edición de lectura de 598 páginas, no el libro ilustrado ni el PDF de imprenta.
- **Próximos bloqueos:** localizar ejecución de Actions por workflow/push, comprobar conclusión y descargar PDF/manifest/diagnóstico; verificar huellas PDF/fuente y conteo de páginas; incorporar cubiertas y doce retratos originales sólo tras identificar los archivos reales y sus créditos; auditar tablas, índice, iconografía, mapa y preflight de imprenta.


## 21-11-2026 — ART-ED-01: inventario reproducible de cubiertas y retratos

- **Base verificada en `main` antes de editar:** `c167d48803d36d74804c8cd1145c3b0381d99100`. Se releen expediente, workflow y maquetador; fuente canónica sin modificaciones.
- **Bloqueo confirmado:** la ruta `assets/editorial/` devuelve 404 en la API de contenidos de GitHub en esta base. No se dispone allí de las dos cubiertas ni de los doce retratos con los nombres exactos que consume el maquetador. No inventar ni sustituir imágenes; se requiere localizar/importar los originales aprobados con créditos y derechos.
- **Mejora implementada:** `tools/editorial/inventariar_activos.py` comprueba los 14 nombres exactos, presencia, firma PNG/IHDR, dimensiones, bytes y SHA-256; genera `dist/control/activos_editoriales.json`. La advertencia de resolución menor a 1800 px es orientativa y **no** certifica impresión. Con `--require-complete` puede usarse como control estricto cuando se integren las imágenes.
- **Workflow actualizado:** ejecuta el inventario antes de componer y adjunta el JSON en el artifact existente mediante `dist/control/*.json`; también se activa al cambiar el script. Commit del script `29633f108615b7695ece11573e36466f39d833c0`; commit del workflow `fd674b2f3b524d64db727f8dea6536898bb3c5a8`.
- **Límite de esta ejecución:** la consulta de lista de runs por workflow a través del conector GitHub fue rechazada por el endpoint permitido; **no** se verificó una nueva ejecución, manifest posterior a CI-ED-04 ni PDF nuevo. El último PDF materialmente comprobado continúa siendo el artifact de la ejecución 44904014385 (598 páginas), anterior a esos controles.
- **Próximos bloqueos:** (1) comprobar nueva ejecución de [Actions](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/workflows/manual-basico-pdf.yml), descargar PDF, manifest e inventario y contrastar hashes; (2) localizar los 14 originales y subirlos a `assets/editorial/`; (3) revisar muestras visuales de índice y tablas, créditos, mapa y preflight de imprenta. La edición ilustrada y el PDF de imprenta **no están certificados**.


## 21-11-2026 — ART-ED-02: consistencia entre inventario y PDF

- **Base consultada:** estado ART-ED-01 en `main`, workflow blob `8411c5d89dc5a8ee673c91e6f46b3dc471c6e7ab`, maquetador blob `e8b0a7ba8a34d938fead449ced3a016dda882fdd`, inventariador blob `1ae4dff12f0f670774416219f169c41324a6a160`. No se editó la fuente canónica.
- **Defecto de control detectado:** el workflow producía `activos_editoriales.json` y manifest PDF pero no comprobaba si las dos cubiertas declaradas en el manifest coincidían con los archivos del inventario. Tampoco cotejaba el conteo de retratos con los PNG disponibles.
- **Cambio verificable:** commit [`a13d07d27a706e586522602167f0cf736a3ae12b`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/a13d07d27a706e586522602167f0cf736a3ae12b) en `.github/workflows/manual-basico-pdf.yml`. El control ahora exige inventario de 14 entradas, conteo coherente, correspondencia de ambas cubiertas y que los retratos incluidos no excedan los disponibles. Se ejecuta antes de publicar el artifact.
- **Límite:** comprobación estática de la modificación en GitHub; no se pudo confirmar ejecución nueva, artifact posterior al PR #127 ni manifiesto contrastado. Este control no demuestra que los retratos disponibles se hayan insertado todos ni verifica derechos de imagen.
- **Próximos bloqueos:** verificar [Actions](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/workflows/manual-basico-pdf.yml) y artifact posterior al cambio; localizar los catorce PNG originales y sus créditos; inspeccionar índice, tablas y muestras de páginas; cerrar mapa, economía/PNJ y preflight de imprenta. PDF de lectura previo de 598 páginas no es libro ilustrado ni PDF de imprenta.


## 21-11-2026 — QA-ED-04: muestras visuales distribuidas del PDF

- **Base de comparación:** último commit de cierre ART-ED-02 `3de375b2715d7e448b53558c3d4dcd9faca9e5aa`. Se releyeron expediente y workflow de `main` antes del cambio; la fuente canónica permanece intacta.
- **Mejora verificable:** commit [`18a7ff78310b495b257aa828f0454b64a56293ee`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/18a7ff78310b495b257aa828f0454b64a56293ee) incorpora una etapa de muestras PNG distribuidas: páginas 1, 3, 5, aproximadamente 1/6, 1/2, 5/6 y última página del PDF. Produce `dist/control/muestras_visuales.json` con páginas exactas y marca explícita `pending_human_visual_review`. Se conservan en el artifact por los patrones `dist/control/*.png` y `*.json` existentes.
- **Alcance real:** el código comprueba la generación y tamaño mínimo de cada muestra, **no** certifica por sí solo la estética, el índice, los recortes o las tablas. La etapa debe ejecutarse en GitHub Actions para disponer de nuevas imágenes reales. El PDF anterior de 598 páginas sigue siendo el último binario previamente verificado.
- **Bloqueo de acceso:** el endpoint de listado de runs por workflow no está admitido por el conector GitHub de esta sesión; no se pudo confirmar ni descargar un artifact posterior al PR #127. El directorio `assets/editorial/` continúa sin archivos comprobados en `main` (última consulta 404).
- **Próximas condiciones:** obtener run/artifact posterior a este commit y contrastar manifest y PDF; abrir muestras PNG y revisar índice/tablas; incorporar las 14 imágenes originales con créditos/permisos; completar mapa, equipo/PNJ y preflight de imprenta. **No se declara PDF ilustrado ni PDF de imprenta.**


## 22-11-2026 — ART-ED-03: impedir omisiones silenciosas de retratos

- **Comparación con `main`:** se releyeron el workflow, maquetador y expediente vigentes; se conservó intacta la fuente canónica `docs/Tierra_Magica_Manual_Maestro.md`.
- **Hallazgo:** el control anterior aceptaba cualquier número de retratos insertados entre cero y el total disponible. Con los 14 PNG presentes podía publicar un PDF con retratos omitidos por una discordancia de encabezados, sin fallar CI.
- **Corrección en `main`:** commit `c36bfe01949e461e3f60f5204a18e6e8300e074e` modifica `.github/workflows/manual-basico-pdf.yml`. Si están los 14 activos, exige exactamente 12 retratos incorporados y ambas cubiertas originales; si no, falla antes de publicar el artifact. Mientras falten originales, el inventario continúa informando el faltante sin inventar imágenes.
- **Verificación alcanzada:** cambio de código confirmado por GitHub. **No se ha confirmado ejecución posterior del workflow ni descargado un artifact nuevo.** La API de runs por SHA del conector sólo cubre eventos PR, no permite certificar ejecuciones `push`.
- **Próximos bloqueos:** obtener ID de ejecución `push` y artifact, contrastar SHA-256 de PDF/fuente con manifest; localizar/importar las 14 imágenes originales y sus créditos, revisar muestras visuales, tablas e índice; cerrar equipo/PNJ/iconografía/mapa y preflight de imprenta. El PDF de lectura previamente comprobado no es la edición ilustrada ni apta para imprenta.


## 22-11-2026 — ART-ED-04: control estricto también con arte parcial

- **Base contrastada:** se releyeron en `main` el expediente, el workflow y el maquetador; se comprobó que ART-ED-03 sólo exigía insertar todos los retratos cuando los 14 PNG estaban presentes. El Manual Maestro no se modificó.
- **Hallazgo:** si había entre 1 y 11 retratos originales disponibles, el workflow admitía un PDF que omitiera alguno; además, un archivo con nombre esperado pero PNG inválido no causaba fallo explícito en el control del inventario.
- **Corrección aplicada:** commit [`4a0837d5b6f60d3bbe8bae195b136d9b7b2c8677`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/4a0837d5b6f60d3bbe8bae195b136d9b7b2c8677) en `.github/workflows/manual-basico-pdf.yml`. Ahora se exige que los retratos efectivamente insertados sean exactamente tantos como los PNG originales presentes, incluso con arte parcial; se rechazan entradas con estado distinto de `present` o `missing`. El control de 14/14 y cubiertas sigue vigente.
- **Límite de evidencia:** cambio confirmado en GitHub, **no ejecutado ni validado en Actions en esta unidad**. El conector no expone listado de runs `push` por workflow; no se descargó un PDF ni un manifest nuevo. Último PDF binario previamente comprobado: 598 páginas, ejecución 44904014385; no es la edición ilustrada ni de imprenta.
- **Próximos bloqueos:** obtener ID de run reciente y artifact PDF/manifest/inventario, contrastar SHA-256; localizar los 14 PNG originales y créditos, revisar muestras, índice y tablas; resolver equipo/PNJ, iconografía, mapa y preflight de imprenta.


## 22-11-2026 — ART-ED-05: deduplicación de retratos

- **Base consultada:** archivos actuales de `main`: maquetador, workflow y registro de cierre. Se comprobó que `insert_deities` recorría todos los encabezados `h2` sin recordar qué retratos había insertado; un nombre divino repetido en distintos encabezados podía duplicar la imagen y provocar un conteo superior al inventario.
- **Corrección aplicada:** se incorpora `inserted_files` al maquetador para insertar cada PNG de deidad **una sola vez**, conservando la primera aparición que coincide con el encabezado. Commit `491e47e2186c436c9b397ed505a655e4bedac33c`. No se modifica el Manual Maestro ni se crean imágenes.
- **Alcance de la comprobación:** lectura del código y confirmación del commit en GitHub; **no se ejecutó el generador ni se descargó un PDF nuevo** en esta unidad. La consulta de workflows disponible por commit sólo cubre ejecuciones de pull request, por lo que no permite verificar los `push` de `main` ni descargar su artifact sin un ID de ejecución. La existencia de PDF posterior al cambio sigue **sin verificar**.
- **Bloqueos siguientes:** obtener ID de ejecución reciente de [Actions](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/workflows/manual-basico-pdf.yml), revisar conclusión, descargar PDF y manifest, comprobar SHA-256 y muestras; localizar e incorporar las 14 imágenes originales en `assets/editorial/` con créditos; inspeccionar índice y tablas; cerrar mapa, equipo/PNJ y preflight de imprenta. El PDF preliminar de 598 páginas verificado previamente no equivale a edición ilustrada ni a PDF de imprenta.


## 22-11-2026 — QA-ED-05: auditoría reproducible de enlaces del índice

- **Comparación previa con main:** se releen workflow, maquetador y expediente. La fuente canónica no se modifica. Se constató que la revisión anterior contabilizaba entradas de índice, pero no producía un inventario de enlaces PDF y sus destinos para la nueva ejecución.
- **Cambio trazable:** commit [`9c111649aa6b993cc0eb49ff8c23bac39bf49cf1`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/9c111649aa6b993cc0eb49ff8c23bac39bf49cf1) añade una etapa al workflow que recorre anotaciones PDF, contabiliza enlaces internos/externos y destinos sin resolver o fuera del rango de páginas; conserva `dist/control/indice_enlaces.json` en el artifact existente. Es un diagnóstico y **no** una certificación de índice correcto; las diferencias se revisarán antes del cierre.
- **Verificación limitada:** modificación confirmada en GitHub; todavía no hay prueba de ejecución de esta etapa ni nuevo artifact descargado. El conector de GitHub de esta sesión permite consultar artifacts sólo con ID de run, y no ofrece listado de runs push por workflow. El último PDF comprobado sigue siendo el preliminar de 598 páginas de la ejecución [44904014385](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44904014385).
- **Bloqueos prioritarios:** identificar un run reciente, comprobar conclusión y descargar PDF/manifest/controles para contrastar huellas y revisar índice/tablas visualmente; recuperar cubiertas y doce retratos originales con permisos y créditos; completar mapa, economía/PNJ y preflight de imprenta. No confundir PDF de lectura con libro ilustrado definitivo o PDF de imprenta.


## 22-11-2026 — QA-ED-06: preflight técnico preliminar del PDF

- **Base contrastada:** `main` en `bb78f164595ae041e11c1b5cf56f35555538f4ab`; se leyeron el expediente y workflow actuales antes de editar. La fuente canónica `docs/Tierra_Magica_Manual_Maestro.md` no fue modificada.
- **Nuevo control:** `tools/editorial/auditar_preflight_pdf.py` recorre todas las páginas con pypdf, exige tamaño 432 × 648 pt (6 × 9 pulgadas), inventaría fuentes y registra cuáles no presentan archivo incrustado en el descriptor, incluyendo fuentes CID/Type0 con descendientes. El informe `dist/control/preflight_pdf.json` se adjuntará al artifact. Código: commits `4c68e4d5a956cd08e0c2f21ad4ad8d1c402e5984` y `e110ffd90977dcab65c39dac3310a6cb867e7bfe`.
- **Integración CI:** workflow actualizado en commit `6d5bdab5883fccaaaa9c897646677aae6668f7ec`; los cambios del auditor disparan el workflow. La ausencia de archivo de fuente se reporta para revisión, no bloquea automáticamente por posibles fuentes estándar. **Este diagnóstico no es un preflight certificado de imprenta**: faltan sangrado, perfiles de color, resolución real de imágenes, derechos y pruebas de impresión.
- **Verificación limitada:** se confirmó escritura en GitHub, pero no se ejecutó localmente el script sobre un PDF actual ni se descargó artifact nuevo. El conector no ofrece listado general de runs `push` por workflow; no se afirma ejecución exitosa posterior. Último PDF binario previamente comprobado: 598 páginas, run 44904014385.
- **Bloqueos siguientes:** verificar run posterior a QA-ED-06, descargar PDF/manifest/JSON, contrastar SHA-256 y revisar fuentes; recuperar las dos cubiertas y doce retratos originales con créditos; inspeccionar índice y tablas; cerrar mapa, equipo/PNJ, iconografía y PDF de imprenta.


## 22-11-2026 — QA-ED-07: bloquear destinos de enlace fuera de rango

- **Comparación con `main`:** se releen workflow, maquetador, auditor de preflight y registro editorial antes del cambio. El control QA-ED-05 ya generaba `indice_enlaces.json`, pero **no impedía publicar** el artifact con enlaces cuyo destino numérico estuviera fuera del PDF.
- **Cambio verificado:** commit [`d7f04bb71839c912283c885c04481b6fccb3ee05`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/d7f04bb71839c912283c885c04481b6fccb3ee05) agrega aserción `invalid_page_targets == 0` después de escribir el informe. Si se detectan destinos fuera de rango, la etapa falla antes de publicar. Los destinos no resueltos se siguen informando, pero no se bloquean automáticamente por la posibilidad de destinos nombrados o formatos no reconocidos por el auditor.
- **Límite de verificación:** cambio de código confirmado mediante commit; **no** se ha demostrado ejecución de este control sobre PDF actualizado ni obtenido un artifact posterior. El último PDF binario comprobado continúa siendo el de 598 páginas del run [44904014385](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44904014385). No se modificó la fuente canónica ni se incorporó arte nuevo.
- **Próximos bloqueos:** verificar nueva ejecución en [Actions](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/workflows/manual-basico-pdf.yml), obtener PDF y manifest, contrastar SHA-256 y revisar los informes y muestras; localizar los 14 PNG originales y créditos, auditar tablas e índice, completar mapa/equipo/PNJ/iconografía y preflight de imprenta. **No se certifica edición ilustrada ni impresión.**


## 22-11-2026 — QA-ED-08: fuentes homónimas en preflight

- **Base contrastada:** último commit visible de `main` antes del cambio `55379000d250415673ff61f06d6b03c8f12212b7`. Se releyeron workflow, maquetador, auditor de preflight y registro antes de editar. La fuente canónica no fue modificada.
- **Hallazgo de código:** `auditar_preflight_pdf.py` agregaba el estado de incrustación por nombre de fuente mediante OR. Si dos objetos PDF compartían `/BaseFont`, bastaba con que uno estuviera incrustado para ocultar otro sin archivo de fuente.
- **Corrección trazable:** se usa AND con valor inicial verdadero: un único objeto no incrustado marca el nombre como pendiente. Commit `8bb52706f623e93166428dba7620da9b681b32e8`.
- **Alcance real:** se verificó el cambio de código en `main`, no una ejecución nueva del auditor sobre PDF. El conector de GitHub accesible permite obtener artifacts de una ejecución por ID, pero no listar directamente todas las ejecuciones por workflow; no se identificó ni descargó un artifact posterior a QA-ED-07 en esta unidad.
- **Bloqueos siguientes:** consultar ejecución actual de Actions, descargar ZIP y contrastar PDF/manifest y `preflight_pdf.json`; inspeccionar muestras y tablas; localizar los 14 PNG autorizados y sus permisos, sin inventarlos; completar créditos, mapa y prueba de imprenta. PDF de lectura verificado previamente (598 páginas) no equivale a edición ilustrada ni PDF certificado.


## 22-11-2026 — QA-ED-09: reparación efectiva del registro de fuentes

- **Base comparada:** `main` en commit `37a0d9ff80164f71a86285e09f508ce0d5b96353`. Se releyeron el workflow y el auditor de preflight antes de cambiar código; no se modificó el Manual Maestro.
- **Defecto confirmado por inspección del archivo:** la corrección QA-ED-08 había escrito secuencias literales `\\n` dentro de un comentario Python, por lo que la asignación `fonts[base] = fonts.get(base, True) and embedded` quedaba comentada. El informe podía declarar cero fuentes aunque hubiera recursos tipográficos. Este fallo era de código fuente, no una medición del PDF.
- **Corrección:** restaurar saltos de línea reales y ejecutar la asignación dentro del bucle de recursos de fuentes. Commit `6aba2830c5116d8b871744ac5dde8a51a4a6cf20` (`tools/editorial/auditar_preflight_pdf.py`). La ejecución del auditor sobre un PDF real queda pendiente de comprobar.
- **GitHub Actions:** la consulta del listado de ejecuciones del workflow por la ruta API de Actions fue rechazada por el conector como endpoint no permitido. No se obtuvo artifact nuevo, manifest ni muestras posteriores a la corrección; el PDF de lectura comprobado anteriormente sigue siendo el de 598 páginas, ejecución 44904014385.
- **Próximos bloqueos:** confirmar ejecución del workflow tras el cambio, descargar artifact y contrastar SHA-256 de PDF/fuente; comprobar que `preflight_pdf.json` enumere las fuentes reales y las no incrustadas; inspeccionar tablas, índice y muestras. Localizar las dos cubiertas y doce retratos originales autorizados para `assets/editorial/`, resolver créditos, mapa y preflight de imprenta. PDF de lectura no equivale a edición ilustrada ni a PDF final de imprenta.


## 22-11-2026 — CI-ED-05: conservar diagnóstico de fallos

- **Base de main comprobada antes del cambio:** commit `9e923231e83af49e295e8ae1e90f0bf88a169801`; workflow releído (blob `01cc9f8e0ad54574e35f94daf3ac6c76db16ea8e`). No se alteró el Manual Maestro.
- **Hallazgo:** si falla una validación previa a `Conservar PDF y evidencia`, el job omite el artifact y pierde los informes JSON/PNG disponibles, dificultando diagnosticar la causa exacta.
- **Cambio:** se agregó un paso `if: failure()` para subir únicamente manifiesto e informes/muestras existentes a `tierra-magica-manual-basico-diagnostico-fallo` (14 días, `if-no-files-found: warn`). No se incluye el PDF en el artifact de fallo; el artifact normal permanece reservado a ejecuciones exitosas. Commit `28161e828a587ca39dc410c658687ec260b4e7ef`.
- **Límite:** revisión estática y commit verificado, no ejecución de Actions posterior ni PDF nuevo comprobado. El conector disponible para runs por commit sólo devuelve eventos PR y no permite comprobar pushes de main.
- **Próximos bloqueos:** comprobar el run de [Actions](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/workflows/manual-basico-pdf.yml), descargar manifest/PDF de una ejecución exitosa, contrastar SHA-256, inspeccionar índice/tablas y muestras; recuperar 14 PNG autorizados, resolver créditos/mapa/PNJ/equipo y preflight de imprenta. PDF de lectura previo de 598 páginas no equivale a libro ilustrado definitivo.


## 22-11-2026 — QA-ED-10: impedir auditoría de fuentes vacía

- Comparación con main: releídos workflow, auditor de preflight y expediente; Manual Maestro sin modificaciones. Se comprobó que el auditor recuperaba el registro de fuentes, pero no rechazaba inventarios vacíos, regresión previamente observada.
- Corrección: commit 82fb5a3a9123992c2f50ed8024791077012865c0 (https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/82fb5a3a9123992c2f50ed8024791077012865c0) exige al preflight fallar cuando no detecta ninguna fuente en el manual de texto. El informe JSON se escribe antes de fallar y puede conservarse en artifact de diagnóstico.
- Límite: commit confirmado en main, sin ejecución nueva del auditor ni PDF posterior comprobado. Consulta de listado de runs rechazada por conector (HTTP 400, endpoint no permitido); directorio assets/editorial no resuelto (404). Último PDF binario verificado: preliminar de 598 páginas, run 44904014385.
- Bloqueos: obtener run y artifact posteriores, contrastar PDF/manifest/SHA-256, revisar preflight_pdf.json, muestras, tablas e índice; localizar 14 PNG autorizados y créditos; cerrar economía/PNJ, mapa, iconografía y certificación de imprenta. PDF de lectura no es libro ilustrado ni PDF listo para imprenta.


## 22-11-2026 — CI-ED-06: procedencia verificable de cada artifact

- **Comparación con main:** workflow leído antes del cambio (blob `1def0934a8276b5cd13271723583bf38e093f6ca`), y registro de cierre consultado. No se modificó `docs/Tierra_Magica_Manual_Maestro.md`.
- **Cambio verificable:** commit [`9fd9695262acc2705ced6479b6011514e6123a8c`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/9fd9695262acc2705ced6479b6011514e6123a8c) incorpora paso `Registrar procedencia de la ejecución` con `if: always()`. Escribe `dist/control/procedencia_ci.json` con repositorio, SHA real de checkout, SHA del evento, run ID, intento, workflow y URL; comprueba que el checkout corresponda al evento. Los artifacts existentes incluyen `dist/control/*.json`, por lo que el reporte se conservará tanto en éxito como en fallo si el runner alcanza ese paso.
- **Finalidad:** vincular inequívocamente cada PDF/manifest a una ejecución y revisión de código, evitando confundir un artifact antiguo con el generado tras una corrección. **No demuestra ejecución exitosa ni PDF nuevo:** el conector accesible sigue sin ofrecer listado general de runs por workflow y no se descargó un artifact posterior.
- **Próximos bloqueos:** obtener run reciente y `procedencia_ci.json`, PDF, manifest e informes; contrastar SHA-256 y revisar muestras/tablas/índice. Recuperar las 14 imágenes autorizadas y créditos, resolver mapa, equipo/PNJ/iconografía y preflight de imprenta. El PDF de lectura de 598 páginas comprobado anteriormente sigue siendo preliminar; no equivale a edición ilustrada ni a archivo listo para imprenta.


## 22-11-2026 — CI-ED-07: inventario criptográfico de entrega

- **Base main comprobada:** `fb6cae7c95d8929779a31ec77ec1f1903ac8df4d`; se releyeron workflow, maquetador y expediente antes de modificar. Fuente canónica sin cambios.
- **Consulta de Actions:** el endpoint de ejecuciones `/actions/workflows/manual-basico-pdf.yml/runs` y el de artifacts continúan rechazando la consulta mediante el conector disponible; no se infiere conclusión, nuevo PDF ni artifact.
- **Mejora trazable:** commit `94be70a334dc4b94910ac2fb289b969bfcc64195` añade al workflow un inventario `dist/control/entrega_sha256.json` con SHA-256 y tamaño de cada archivo entregado (PDF, manifest, informes y muestras), excluyendo el propio inventario para evitar autorreferencia. Verifica que existan PDF, manifest y procedencia antes de publicar.
- **Estado de comprobación:** código integrado en main; ejecución real del nuevo paso aún no verificada. El artifact histórico 44904014385 (598 páginas) es anterior y no prueba este cambio.
- **Próximos bloqueos:** acceder a runs/artifacts y descargar ZIP para comparar SHA-256; revisar muestras de índice y tablas; recuperar dos cubiertas y doce retratos originales con permisos y créditos; completar equipo/PNJ, símbolos y mapa sin inventar canon; preparar sangrado, perfiles de color y preflight de imprenta. No declarar edición ilustrada ni PDF de imprenta.


## 22-11-2026 — CI-ED-08: validación efectiva del inventario antes de publicar

- **Base main verificada antes del cambio:** `64b2cb0f1a2db2c8e97fdf368b86579547d62533`. Se releen workflow, maquetador y registro editorial. Fuente canónica sin modificar.
- **Bloqueo de Actions:** consulta de ejecuciones `/actions/workflows/manual-basico-pdf.yml/runs` y artifacts `/actions/artifacts` rechazada por el conector con HTTP 400 (URL no permitida). No se verifica ejecución nueva, PDF nuevo ni manifest nuevo.
- **Cambio verificable:** el inventario `entrega_sha256.json` antes se escribía sin verificar sus propios valores. Ahora el workflow incluye un paso previo a `upload-artifact` que compara exactamente el conjunto de archivos de `dist` (excluido el propio inventario), sus tamaños y SHA-256. Una divergencia detiene la publicación. Commit de código: `2ed8bcbad04bf0ad0ce4819922d6ad676f2dc377`.
- **Límite:** se confirma edición del YAML en main, no su ejecución. El último artifact descargado y comprobado en este expediente continúa siendo el PDF preliminar de 598 páginas del run 44904014385.
- **Siguiente prioridad:** obtener acceso efectivo a la lista de runs/artifacts, descargar ZIP reciente, validar PDF/manifest/huellas, inspeccionar índice y tablas. Recuperar 2 cubiertas y 12 retratos autorizados en `assets/editorial` con créditos y permisos; continuar mapa, equipo, PNJ y preflight de imprenta. No confundir lectura con edición ilustrada ni imprenta.


## 22-11-2026 — CI-ED-09: diagnóstico también para fallos tardíos

- **Base comparada:** `main` en `a33b6e93176b1395cd6266015bfd84e9edc73d09`; se leyó el workflow completo y el expediente antes del cambio. No se modificó `docs/Tierra_Magica_Manual_Maestro.md`.
- **Defecto comprobado en YAML:** el paso `Conservar diagnóstico si falla la validación` estaba antes de los pasos `Inventario criptográfico de entrega` y `Verificar inventario criptográfico antes de publicar`. Si fallaba cualquiera de esos dos controles, el paso de diagnóstico ya había pasado y no se publicaban sus JSON/PNG de error.
- **Corrección:** se trasladó el paso de diagnóstico `if: failure()` inmediatamente antes de `Conservar PDF y evidencia`, después de las dos validaciones criptográficas. Commit [`087508fb95cf7d0386e0589be5c1914ca945222f`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/087508fb95cf7d0386e0589be5c1914ca945222f). El artifact de lectura sigue exigiendo éxito y el de diagnóstico sigue sin publicar PDF como entrega.
- **Verificación de Actions:** la consulta por commit `a33b6e9` devolvió `workflow_runs: []`, lo que **no demuestra ausencia de ejecuciones push**: el conector sólo devuelve runs asociados a pull requests. Se volvió a consultar el artifact del run histórico [44904014385](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44904014385): artifact [14707700181](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44904014385/artifacts/14707700181) aún disponible, con fuente `3b5a79693a1f7e658f8aa038766874a489342610`. **No se descargó ni validó PDF nuevo de este cambio.**
- **Bloqueos próximos:** identificar run de `main` posterior a CI-ED-09 y descargar artifact, manifest y JSON; contrastar SHA-256, inspeccionar índice, tablas y muestras; recuperar 2 cubiertas y 12 retratos originales con créditos para `assets/editorial/`; cerrar equipo/PNJ/iconografía/mapa, preflight de imprenta y PDF definitivo. El preliminar de 598 páginas previamente verificado no es libro ilustrado definitivo ni archivo de imprenta.


## 22-11-2026 — QA-ED-11: rechazar enlaces internos sin destino resoluble

- **Base contrastada:** workflow en `main` blob `a4f2dd79fdd8678fd7a950a7791d235faf4e7553`, expediente editorial releído. No se modificó la fuente canónica `docs/Tierra_Magica_Manual_Maestro.md`.
- **Hallazgo:** la auditoría de anotaciones PDF contaba `unresolved_destinations` y guardaba ejemplos en `dist/control/indice_enlaces.json`, pero sólo fallaba por `invalid_page_targets`. Un índice con enlaces internos imposibles de resolver podía publicarse como exitoso.
- **Corrección:** commit [`ad3f6b896f52356992873cc2f9120f9d45127999`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/ad3f6b896f52356992873cc2f9120f9d45127999) agrega una aserción de cero destinos irresolubles tras escribir el JSON diagnóstico. El workflow seguirá conservando el reporte de fallo mediante el artifact diagnóstico. El cambio en YAML activa un nuevo push workflow si Actions está habilitado.
- **Evidencia Actions:** se reconsultaron los jobs y artifacts de la ejecución histórica [44904014385](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44904014385): job exitoso y artifact 14707700181 disponible, fuente SHA `3b5a79693a1f7e658f8aa038766874a489342610`. Esa ejecución es anterior a QA-ED-11 y no valida el cambio. No se obtuvo un listado de ejecuciones recientes ni se descargó un PDF nuevo.
- **Bloqueos:** identificar run posterior a QA-ED-11 y verificar artifact, PDF/manifest/SHA-256, `indice_enlaces.json`, `preflight_pdf.json` y muestras visuales; localizar 2 cubiertas y 12 retratos originales con créditos/permisos para `assets/editorial`; revisar tablas, mapa, economía/PNJ/iconografía y certificación de imprenta. No equiparar PDF de lectura, edición ilustrada ni archivo listo para imprenta.


## 22-11-2026 — CI-ED-10: detección de fallo real de enlaces y diagnósticos independientes

- **Base de main comprobada:** commit `a9c1226ce134e8ff436ac167012aa0018ef72198`. La fuente canónica no se modificó.
- **Acceso recuperado a ejecuciones reales:** la colección REST `/actions/runs` permite identificar el workflow por su ruta, aunque el endpoint con filtro por workflow no está autorizado. Ejecución [45048362283](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45048362283), SHA `ad3f6b896f52356992873cc2f9120f9d45127999`, 22-11-2026 17:15 UTC: **failure** en «Auditoría de enlaces internos del índice». El log registra `AssertionError: Índice: enlaces sin destino resoluble`; no está probado si es un enlace roto o una limitación del resolvedor pypdf. Se conservó [artifact de diagnóstico 14764925529](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45048362283/artifacts/14764925529), sin PDF de lectura publicado en esa ejecución.
- **Ejecución anterior comprobada:** [45042973103](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45042973103), SHA `087508fb95cf7d0386e0589be5c1914ca945222f`, **success**. Artifact [14762177029](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45042973103/artifacts/14762177029) disponible (2.520.554 bytes según API), pero su PDF y manifiesto no fueron descargados ni inspeccionados en esta unidad.
- **Cambio de CI verificable:** commit [63a16bfcadd3d68786cf97b623119ceef6ee717b](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/63a16bfcadd3d68786cf97b623119ceef6ee717b) mantiene ejecutándose los pasos de extracción de texto y preflight de páginas/fuentes aun si falla antes la auditoría de enlaces, para conservar evidencia técnica independiente. No se silencia ni rebaja la falla del índice.
- **Bloqueo prioritario:** leer `dist/control/indice_enlaces.json` del artifact de fallo y clasificar los destinos irresolubles; corregir la causa en maquetador o auditor, probar en un nuevo run y contrastar PDF/manifest. Después revisar muestras, integrar 14 activos originales autorizados, créditos, mapa y preflight de imprenta. **No se certifica PDF nuevo ni libro final.**


## 22-11-2026 — QA-ED-12: resolución de destinos de índice

- **Base main comprobada antes del cambio:** `af4fe6a39a3c36c300256aac5515f40fc93065d5`. Se consultó el workflow real y el registro editorial; fuente canónica sin cambios.
- **Evidencia CI:** ejecución [45048362283](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45048362283) con fallo en «Auditoría de enlaces internos del índice», mientras composición, integridad básica y muestras visuales terminaron correctamente. Artifact diagnóstico [14764925529](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45048362283/artifacts/14764925529) presente, **contenido del JSON aún no leído**.
- **Hallazgo de código:** la auditoría pasaba el array PDF `[referencia_página, /XYZ, ...]` a `PdfReader.get_destination_page_number`, función orientada a objetos `Destination`; ello puede producir falsos errores de destino irresoluble. La corrección resuelve arrays mediante el índice de referencias indirectas de las páginas, mantiene soporte de destinos nombrados y conserva el rechazo de referencias realmente inválidas.
- **Cambio trazable:** commit [`ed987a2b8a0edd1e65e03b8af7447189080cbab6`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/ed987a2b8a0edd1e65e03b8af7447189080cbab6), archivo `.github/workflows/manual-basico-pdf.yml`.
- **Pendiente inmediato:** esperar y verificar ejecución del commit nuevo; descargar artifact, leer `indice_enlaces.json`, manifest y PDF real; contrastar huellas y revisar muestras. Si persisten errores, distinguir referencias rotas de defectos de resolución. Incorporar sólo las 14 imágenes originales verificadas, después créditos/mapa y preflight de imprenta. **No se declara PDF nuevo ni libro definitivo.**


## 22-11-2026 — QA-ED-13: artifact reciente descargado, integridad y defecto visual

- **Comparación con main:** se leyó este registro desde main (blob `3809847d1495cd3e40bb6fd3d1207f5eda2a3413`) y se contrastó la ejecución posterior a QA-ED-12. No se modifica la fuente canónica.
- **Workflow comprobado:** [run 45060370330](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45060370330), push de `ed987a2b8a0edd1e65e03b8af7447189080cbab6`, 22-11-2026 19:22 UTC, conclusión **success**. Artifact real [14769406877](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45060370330/artifacts/14769406877), descargado y descomprimido: ZIP con PDF, manifest y 16 controles/muestras adicionales.
- **Integridad verificada independientemente:** `entrega_sha256.json` enumera 17 archivos y **los 17 coinciden** en bytes y SHA-256. PDF `Tierra_Magica_Manual_Basico_Lectura.pdf`: 1.703.968 bytes, SHA-256 `f221a6ee3fcb9605eae31b6d7e5dc0ccc0ea6e6053666ff84991b879b571a096`, coincide con manifest. Fuente declarada SHA-256 `c4ebd0cfe26a8d87e1f84ca1764c0e87aa33d68382003c67e9a5e11749f4bb78`; no se recalculó contra descarga independiente del Markdown en esta unidad.
- **Auditoría del índice:** `indice_enlaces.json` declara 422 enlaces internos, 2 externos, **0 destinos irresolubles y 0 páginas inválidas**. El fallo previo de QA-ED-11 queda superado en este run, sin implicar inspección manual de cada enlace.
- **Preflight técnico:** 598 páginas, todas 432×648 pt (6×9 pulgadas); 9 fuentes detectadas y ninguna sin incrustar. 69 entradas del índice; 39 tablas anchas convertidas a registros. No certifica sangrado, CMYK ni imprenta.
- **Defecto visual real encontrado:** inspección de `control/muestra_p0099.png` muestra **texto cortado en el borde derecho** de varias líneas del capítulo «Turno, movimiento y posición». La muestra de página 299 se observa legible. **No aprobar maqueta final**: revisar reglas de CSS/WeasyPrint, anchos, overflow y partición de párrafos; reproducir en PDF y corregir antes de validar las 598 páginas. La auditoría automática de enlaces/fuentes no detecta este problema.
- **Activos:** `activos_editoriales.json` confirma **0/14** archivos originales (2 cubiertas y 12 retratos) presentes. No sustituirlos por arte inventado. Pendientes además créditos/permisos, mapa, equipo/PNJ/iconografía y certificación de imprenta.
- **Siguiente unidad:** priorizar corrección del recorte de texto en página 99 y buscar otros desbordes; regenerar y contrastar artifact, luego incorporar originales verificados. PDF actual es **sólo lectura preliminar**, no edición ilustrada ni archivo para imprenta.


## 22-11-2026 — QA-ED-14: prevención de desbordamiento horizontal

- **Base comparada:** main contenía QA-ED-13, commit `2c651582f2a1df2bd2d2736e42b665fff5ae98e1`, que documenta recorte de texto en margen derecho de página 99 del PDF de lectura de 598 páginas. Se leyó el CSS actual y el maquetador antes de editar; no se alteró el Manual Maestro ni se duplicó un control ya existente.
- **Cambio aplicado:** `tools/editorial/maquetacion.css` incorpora `overflow-wrap:anywhere` en texto, títulos, índice, celdas y fichas, además de `min-width:0` en componentes de registros y `flex-wrap:wrap` en líneas de ficha para que tokens largos puedan partirse dentro del ancho útil 6×9. Commit de código: `177fd462c353ae41e0359977d5afcb2faeb104dd`.
- **Alcance y límites:** se verificó el cambio en el repositorio, **no** la regeneración del PDF ni la eliminación visual del recorte de página 99. La corrección es preventiva y requiere prueba real; puede cambiar la paginación y los números de índice. No afirmar solución visual hasta renderizar y comparar.
- **Próxima validación obligatoria:** esperar/consultar ejecución de Actions posterior al commit, descargar PDF y manifest, contrastar SHA-256, revisar visualmente página 99 y buscar desbordamientos en otras páginas, tablas e índice. Confirmar que los saltos y la paginación resultantes sean aceptables. Después incorporar únicamente las 2 cubiertas y 12 imágenes originales autorizadas a `assets/editorial/`, comprobar créditos y resolución, y realizar preflight de imprenta.
- **Estado editorial:** PDF de lectura histórico comprobado, libro ilustrado definitivo y PDF de imprenta **pendientes**.


## 22-11-2026 — QA-ED-15: primera ejecución posterior a la corrección CSS

- **Base actual comprobada:** rama `main` en `ef676a4782b6b76f5a20848634ed986125ffc1ba` (registro QA-ED-14); no se duplica la modificación CSS `177fd462c353ae41e0359977d5afcb2faeb104dd`.
- **Ejecución nueva comprobada por API GitHub Actions:** [run 45071502393](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45071502393), disparada 22-11-2026 21:19:59 UTC para SHA `177fd462c353ae41e0359977d5afcb2faeb104dd`, estado `completed`, conclusión `success`. Esto verifica que el pipeline posterior al cambio CSS terminó exitosamente, **no** que el defecto visual esté corregido.
- **Artifact real listado por API:** [14773328202](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45071502393/artifacts/14773328202), nombre `tierra-magica-manual-basico-lectura`, tamaño de archivo publicado 2.520.440 bytes, digest ZIP declarado `sha256:cd82082e082fe3f9be3042735be8c228ced6894fe3b486e9ba9ce96c29c4f407`, vence 22-12-2026 21:21:30 UTC. **No se descargó ni se abrió el ZIP en esta unidad**: no se afirma contenido, páginas, SHA del PDF ni manifest nuevo.
- **Bloqueo de calidad:** aún falta descargar ese artifact, cotejar el manifest con el PDF y renderizar/inspeccionar página 99 y páginas con tablas, títulos e índice. La aprobación automática del workflow no sustituye una inspección geométrica/visual del margen derecho.
- **Activos y cierre:** continúan sin constancia de incorporación las 2 cubiertas y 12 ilustraciones originales en `assets/editorial/`. Pendientes equipo/PNJ/iconografía/mapa, créditos, derechos y preflight de imprenta. No declarar edición ilustrada definitiva ni PDF listo para imprenta.


## 22-11-2026 — QA-ED-16: descarga y control independiente del artifact posterior a CSS

- **Base revisada:** `main` en commit `ed16e97b95e0faccc825161ded7414498ade98ed`; expediente blob `c05fced95a45a434516511edf87ede340741fa83`. No se duplica la corrección CSS QA-ED-14 ni se modifica la fuente canónica.
- **Artifact descargado y abierto:** [run 45071502393](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45071502393), [artifact 14773328202](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45071502393/artifacts/14773328202). ZIP con 18 entradas: PDF, manifest, inventario y controles. La lista de `control/entrega_sha256.json` contiene 17 archivos, **17/17 verificados** independientemente en tamaño y SHA-256.
- **PDF real verificado:** `Tierra_Magica_Manual_Basico_Lectura.pdf` tiene **598 páginas**, **1.703.962 bytes**, SHA-256 `eb9fe177104dd292ce72ac54089c3ea38304cb7f7e637d910571b8d24944091d`, coincidente con el manifest y el inventario. El manifest declara fuente SHA-256 `c4ebd0cfe26a8d87e1f84ca1764c0e87aa33d68382003c67e9a5e11749f4bb78` y commit compilado `177fd462c353ae41e0359977d5afcb2faeb104dd`; no se recalculó la huella de fuente desde un Markdown independiente en esta unidad.
- **Controles automáticos del artifact:** 422 enlaces internos, 2 externos, 0 destinos irresolubles, 0 páginas inválidas; 9 fuentes incrustadas, 69 entradas de índice y 39 tablas anchas convertidas a registros. **Activos editoriales: 0/14**; ninguna cubierta ni retrato original incorporado.
- **Inspección real de página 99:** se abrió `control/muestra_p0099.png` posterior a CSS. El texto ya no aparece amputado por el borde físico de página, pero **las líneas siguen llegando hasta el límite derecho del área sombreada, sin holgura visual suficiente**. La corrección no se considera certificada como diseño final. El barrido geométrico con PyMuPDF de las 598 páginas encontró **0 spans fuera del soporte físico** (432×648 pt); 2 spans superaron x=384 pt, en páginas 30 y 517, ambos signos de puntuación con x=385,51 pt. Deben revisarse visualmente esas páginas y los registros/tablas: no es prueba de ausencia de recorte de glifos ni de aprobación estética.
- **Pendientes prioritarios:** revisar páginas 30, 99 y 517 a resolución de impresión; contrastar índice y tablas en muestra representativa; localizar e incorporar únicamente los 14 originales aportados, con créditos y permisos; resolver mapa, equipo, PNJ, símbolos y preflight de imprenta (sangrado, color, tipografía, márgenes y cubiertas). **Este PDF es edición de lectura preliminar, no libro ilustrado definitivo ni PDF certificado para imprenta.**


## 22-11-2026 — QA-ED-17: holgura del margen derecho

- **Base comparada:** registro actual de `main` hasta QA-ED-16; CSS blob previo `c4b4d8473c9ade9960f2654b4d06b1250dfda3e1`. El Manual Maestro no se modifica.
- **Cambio trazable:** margen derecho de páginas ordinarias en `tools/editorial/maquetacion.css` pasa de **0,68 a 0,78 pulgadas**; los demás márgenes se conservan. Commit [`736b4311d9151b0a013bbe8838c70496589558f2`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/736b4311d9151b0a013bbe8838c70496589558f2). Es una corrección de composición ante la falta de holgura observada en página 99; no se altera contenido ni se fabrican activos.
- **Validación pendiente:** esta unidad sólo confirma la modificación del CSS en `main`, **no** una ejecución posterior ni la solución visual. Descargar el siguiente artifact, cotejar PDF/manifest/huellas y examinar páginas 30, 99 y 517; el aumento de margen puede alterar páginas e índice. Inspeccionar tablas y cortes de registro antes de aceptar la maqueta.
- **Bloqueos:** siguen sin estar integradas las 2 cubiertas y 12 imágenes originales en `assets/editorial/`; recuperar binarios autorizados con procedencia, permisos y créditos. Pendientes cartografía, equipo/PNJ/iconografía, revisión integral, sangrado y perfil de impresión. PDF de lectura ≠ edición ilustrada ≠ PDF de imprenta.


## 22-11-2026 — QA-ED-18: ejecución de maquetación posterior al ajuste de margen

- **Base de `main` consultada:** `a85fcae7323e337e0a47c289f2b9edff7c1b2b70`; expediente blob `cf94a77cd2fc5eb5245ee93a406d732b006fc074`. No se repite QA-ED-17 ni se modifica el Manual Maestro.
- **Workflow comprobado en GitHub Actions:** [run 45087820113](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45087820113), iniciado el 23-11-2026 00:16:44 UTC (22-11 21:16:44 Argentina), `completed/success`, commit compilado `736b4311d9151b0a013bbe8838c70496589558f2`, correspondiente al ajuste CSS QA-ED-17.
- **Artifact real publicado, metadatos verificados:** [14779662589](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45087820113/artifacts/14779662589), nombre `tierra-magica-manual-basico-lectura`, tamaño ZIP 2.547.060 bytes, no expirado, vence 23-12-2026 00:18:19 UTC; digest de artifact informado por GitHub `sha256:89987228910d9ba827d6f1722fbf074f37425251cebf9118fca4a130e738675a`. **Este digest es del artifact, no del PDF interior.**
- **Límite de verificación:** se comprobaron la ejecución y el registro del artifact, pero no se descargó/abrió el ZIP ni se contrastaron PDF, manifest y hashes interiores en esta unidad. No se afirma número de páginas, índice, tablas ni que el margen de página 99 esté visualmente corregido.
- **Hallazgo separado:** las ejecuciones del workflow `Validate` sobre `736b4311` y `a85fcae7` aparecen con conclusión `failure`. No se ha diagnosticado su causa; no confundirlas con el workflow de maquetación exitoso.
- **Próximos bloqueos:** descargar y abrir artifact 14779662589; cotejar manifest, PDF y SHA-256; renderizar y examinar páginas 30, 99 y 517, índice y tablas; localizar e incorporar las 2 cubiertas y 12 ilustraciones originales con procedencia/créditos; completar equipo, PNJ, símbolos, mapa y preflight de imprenta. **No se certifica libro ilustrado ni PDF de imprenta.**


## 22-11-2026 — QA-ED-19: inspección del artifact tras margen QA-ED-17

- **Base comprobada:** expediente blob `738af8a891fde5023a217da052cdf8705088342c` de `main`, posterior a QA-ED-18. Se contrastó el registro previo para no repetir correcciones CSS ni alterar el Manual Maestro.
- **Artifact descargado y abierto realmente:** [run 45087820113](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45087820113), [artifact 14779662589](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45087820113/artifacts/14779662589), ZIP de 18 entradas. Inventario `control/entrega_sha256.json`: **17/17 archivos verificados** contra SHA-256 y tamaño de bytes.
- **PDF real posterior al ajuste:** `Tierra_Magica_Manual_Basico_Lectura.pdf`, **606 páginas** (antes 598), **1.715.714 bytes**, SHA-256 `899ff0f34652cbc2baae44144c27a599b4e75234da40035539ffd0dd42ca891d`, coincidente con manifest y control. Fuente declarada SHA-256 `c4ebd0cfe26a8d87e1f84ca1764c0e87aa33d68382003c67e9a5e11749f4bb78`; no se recalculó desde fuente descargada en esta unidad.
- **Controles de contenido y técnicos:** 69 entradas de índice; 39 tablas convertidas a registros; 422 enlaces internos, 2 externos, 0 destinos irresolubles, 0 páginas inválidas; 9 fuentes incrustadas; 606/606 páginas de 432×648 pt. Inventario: **0/14 activos editoriales originales presentes** (2 cubiertas y 12 retratos ausentes).
- **Inspección independiente con PyMuPDF:** se abrieron páginas **30, 99, 101, 517 y 525**; el valor máximo x de spans de texto de estas páginas fue **375,88 pt**, inferior al límite de referencia x=385 pt utilizado en QA-ED-16; no se repitieron los dos excesos de puntuación anteriormente registrados en páginas 30 y 517. Se renderizaron páginas 30, 99 y 517. **La página 99 muestra texto muy próximo al borde derecho del bloque sombreado**: aunque no rebasa el soporte ni el límite geométrico usado, la calidad tipográfica del bloque requiere una revisión editorial y de glifos, sin afirmar aprobación visual integral. Las páginas 517 y 525 actuales no equivalen necesariamente a los mismos contenidos de las páginas anteriores debido a las 8 páginas añadidas.
- **Bloqueos siguientes:** inspeccionar con detalle palabras y cortes del bloque de página 99 y otras muestras; revisar índice y tablas por contenido, no sólo por auditoría automática; localizar los 14 originales con procedencia y permisos y subirlos a `assets/editorial/`; resolver créditos, mapa, equipo/PNJ/iconografía y preflight de imprenta. **PDF de lectura verificable, no edición ilustrada ni archivo listo para imprenta.**


## 23-11-2026 — QA-ED-20: composición de recuadros sombreados

- **Base cotejada:** `main` en `709b522f9bdc914eef393e5bcb8add6bf6990c1d` (QA-ED-19); se leyó el CSS vigente y el expediente antes de intervenir. No se modifica `docs/Tierra_Magica_Manual_Maestro.md`.
- **Corrección aplicada:** [commit `ad5d9658caa50129740eebc998a8b3328bb76b87`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/ad5d9658caa50129740eebc998a8b3328bb76b87) en `tools/editorial/maquetacion.css`. Los `blockquote` del contenido usan `box-sizing: border-box`, `max-width:100%`, mayor padding derecho y alineación izquierda, incluidos sus párrafos. Objetivo: mejorar la respiración tipográfica del bloque sombreado observado en página 99; se trata de una hipótesis editorial, **no de corrección visual demostrada**.
- **Último PDF materialmente inspeccionado:** [run 45087820113, artifact 14779662589](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45087820113/artifacts/14779662589), **606 páginas**, 17/17 huellas correctas, 422 enlaces internos válidos, 9 fuentes incrustadas, 39 tablas convertidas y **0/14 ilustraciones**. Este artifact precede a QA-ED-20 y no demuestra su efecto.
- **Próximos bloqueos:** esperar y verificar ejecución posterior al commit QA-ED-20; descargar PDF y manifest, contrastar SHA-256, renderizar el bloque de la página 99 y otras muestras comparando contenido (la paginación puede cambiar), revisar índice y tablas. Localizar los 2 archivos de cubierta y 12 retratos originales con permisos/créditos y colocarlos en `assets/editorial/` sin inventar imágenes. Pendientes equipo, PNJ, iconografía, mapa y preflight de imprenta. **No certificar edición ilustrada ni PDF para imprenta.**


## 23-11-2026 — QA-ED-21: saneamiento sintáctico del CSS

- **Hallazgo confirmado leyendo `main`:** después de la regla `a`, el comentario QA-ED-17 contenía tres secuencias literales `\\n` en lugar de saltos de línea. La primera quedaba dentro del comentario y la secuencia posterior al cierre `*/` aparecía antes del comentario QA-ED-14. Esto podía invalidar la interpretación de las reglas posteriores (incluidos los ajustes QA-ED-14 y QA-ED-20) por el parser CSS. No se atribuye a este defecto ningún recorte concreto sin nueva prueba del PDF.
- **Corrección trazable:** sustituir exclusivamente esas tres secuencias por saltos de línea reales en `tools/editorial/maquetacion.css`; commit `1c4d3b0ba6b91d0c7afd7079588e0c8d67195144` en `main`. No se modifica `docs/Tierra_Magica_Manual_Maestro.md` ni el arte.
- **Limitación de esta ejecución:** el endpoint de listado de ejecuciones de Actions no fue admitido por el conector; no se descargó PDF ni manifest nuevo y **no se certifica** la corrección visual. El último PDF previamente inspeccionado sigue siendo el preliminar de 606 páginas anterior a QA-ED-20/21.
- **Siguiente bloqueo prioritario:** comprobar ejecución de [workflow PDF](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/workflows/manual-basico-pdf.yml) posterior a este commit, descargar artifact y contrastar manifest, hashes, índice, tablas y páginas 30/99/517. Incorporar cubiertas y doce retratos originales solamente desde archivos identificados con permisos/créditos; continuar mapa, equipo/PNJ y preflight de imprenta. PDF de lectura, libro ilustrado y PDF de imprenta son hitos distintos.


## 23-11-2026 — QA-ED-22: guardia preventiva de sintaxis CSS en CI

- **Comparación con `main`:** se revisaron el expediente QA-ED-21, `tools/editorial/maquetacion.css` y el workflow vigente antes de modificar. No se repitió el saneamiento CSS ni se alteró `docs/Tierra_Magica_Manual_Maestro.md`.
- **Cambio verificable:** [commit `c30c4584c268d3a2d481abeeacb6c1e7d9e070b5`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/c30c4584c268d3a2d481abeeacb6c1e7d9e070b5) añade un paso previo a la composición del PDF para detectar secuencias literales `\\n`, comentarios CSS sin cerrar, llaves desequilibradas y ausencia de selectores esenciales. Es una comprobación sintáctica básica, no un parser CSS integral ni una aprobación visual.
- **Límite de evidencia:** el endpoint de listado de ejecuciones Actions sigue sin estar disponible a través del conector GitHub consultado; no se comprobó una ejecución posterior a QA-ED-21 ni se descargó artifact nuevo. El commit del workflow debe pasar por CI antes de afirmar que la guardia funciona. El último PDF inspeccionado materialmente es el de 606 páginas de QA-ED-19.
- **Próximos bloqueos:** revisar [workflow de lectura](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/workflows/manual-basico-pdf.yml) tras este cambio, descargar artifact y contrastar PDF/manifest/SHA; inspeccionar el bloque sombreado, índice y tablas; recuperar 2 cubiertas y 12 retratos originales autorizados, con créditos; continuar mapa, equipo/PNJ/iconografía y preflight. **No certificar libro ilustrado ni PDF de imprenta.**


## 23-11-2026 — QA-ED-23: corregir guardia CSS de CI

- **Base cotejada:** `main` en `6aa322470dfdebd199e4aba1a88a8deb0523dd11`; se leyó el workflow y el CSS actuales antes de intervenir.
- **Defecto confirmado por inspección:** el control incorporado en QA-ED-22 buscaba `r'\\\\n'` (dos barras invertidas seguidas de `n`), mientras que el defecto de QA-ED-21 consistía en `r'\\n'` (una barra invertida seguida de `n`). La aserción anterior no detectaba el caso real.
- **Cambio verificable:** se corrigió la expresión en `.github/workflows/manual-basico-pdf.yml` para buscar la secuencia literal correcta `r'\\n'`. Commit `891f574d4641b3006f6c14714d9a08578d51c73d`. No se modificó el Manual Maestro ni el CSS.
- **Verificación limitada:** la lectura del archivo y la actualización de GitHub están confirmadas; la consulta del listado de ejecuciones por endpoint de Actions fue rechazada por el conector. No se descargó PDF nuevo ni manifest en esta unidad. La corrección de CI aún requiere una ejecución exitosa.
- **Próximos bloqueos:** confirmar run y artifact posteriores al commit; verificar manifest, PDF y página 99; recuperar 14 archivos gráficos originales autorizados y comprobar créditos; continuar auditoría visual, preflight e imprenta. **PDF de lectura no equivale a edición ilustrada definitiva.**


## 23-11-2026 — QA-ED-24: muestras de regresión tipográfica en CI

- **Base cotejada:** `main` en `e33dc7af946cb002541cddf616306e3d5f2dedbc` (QA-ED-23); se leyeron workflow, CSS y expediente antes de intervenir. La fuente canónica no se alteró.
- **Cambio trazable:** [commit `18a3a9e9b10e20c32a549e75ac9c2a1c3a9b2d71`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/18a3a9e9b10e20c32a549e75ac9c2a1c3a9b2d71) añade páginas 30, 99 y 517 (si existen) a las muestras PNG de CI, conservando muestras distribuidas y el inventario `muestras_visuales.json`. Evita perder las páginas históricamente observadas en las siguientes compilaciones. Los números de página **no garantizan igual contenido** tras repaginación; sigue siendo necesaria inspección visual.
- **Validación limitada:** se verificó la escritura del workflow en `main`, no una ejecución posterior ni el contenido del nuevo artifact. No se afirma que el CSS QA-ED-20/21 esté visualmente validado. Último PDF inspeccionado según QA-ED-19: 606 páginas, anterior a las correcciones recientes.
- **Bloqueos inmediatos:** verificar Actions posterior a QA-ED-24, descargar artifact y manifest, comprobar SHA-256 y abrir PNG de páginas 30/99/517, índice y tablas. Recuperar 2 cubiertas y 12 retratos originales con procedencia y créditos, sin generar reemplazos; después equipo/PNJ/iconografía/mapa y preflight de imprenta. **PDF de lectura ≠ libro ilustrado definitivo ≠ PDF para imprenta.**


## 23-11-2026 — QA-ED-25: análisis sintáctico CSS con tinycss2

- **Base cotejada:** `main` en `bdb08923b3d5fd52d1047494cbe778330c359b39` (QA-ED-24). Se leyeron el workflow y este expediente antes del cambio; no se alteró el Manual Maestro.
- **Cambio verificable:** [commit `68648d02486e430df1bb9dbc69f169a82c75be7b`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/68648d02486e430df1bb9dbc69f169a82c75be7b) añade análisis del CSS con `tinycss2` (dependencia de WeasyPrint) después de la guardia textual. Se inspeccionan errores de parseo a nivel de hoja y declaraciones de reglas ordinarias. Es una protección adicional, **no** certificación de compatibilidad CSS completa ni revisión visual.
- **Limitación comprobada:** el endpoint de listado de runs de Actions fue rechazado por el conector y no se obtuvo PDF ni manifest posteriores a QA-ED-24. No se afirma que el nuevo control haya ejecutado exitosamente en CI. El último PDF descargado y examinado continúa siendo el de 606 páginas de QA-ED-19.
- **Bloqueos inmediatos:** confirmar la ejecución del workflow tras este commit y descargar PDF, manifest y PNG; verificar huellas y revisar visualmente recuadros, índice y tablas. Recuperar cubiertas y doce retratos originales con derechos y créditos comprobables; continuar equipo, PNJ, iconografía, mapa y preflight de imprenta. **PDF de lectura no equivale a edición ilustrada ni PDF listo para imprenta.**


## 23-11-2026 — QA-ED-26: ampliar análisis de declaraciones CSS en CI

- **Base consultada:** `main` en `c7d07f6b787da2e9ab17c8b8db97ca3905c19f55`; se leyeron el workflow y el expediente antes de editar. No se modificó `docs/Tierra_Magica_Manual_Maestro.md`.
- **Hallazgo de código:** la comprobación `tinycss2` de QA-ED-25 analizaba declaraciones únicamente dentro de reglas CSS ordinarias (`qualified-rule`). Omitía las declaraciones de reglas `@page` y los bloques internos `@top-*` / `@bottom-*` usados para cabeceras y pies.
- **Corrección:** el workflow ahora inspecciona declaraciones de reglas ordinarias y reglas `at-rule` con contenido, recorriendo bloques anidados `at-rule` de margin-box. Commit [`9e58d35fe538ea297524d01e92c1bc7ac32a0df3`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/9e58d35fe538ea297524d01e92c1bc7ac32a0df3). Es validación de parseo, no garantía de soporte CSS en WeasyPrint.
- **Estado de ejecución:** el endpoint de listado de runs de Actions volvió a rechazar la consulta por el conector (HTTP 400: endpoint no admitido); tampoco se obtuvo nuevo artifact ni manifest. No se atribuye a esta corrección ninguna mejora visual comprobada. Último PDF materialmente inspeccionado: 606 páginas, QA-ED-19.
- **Próximos bloqueos:** comprobar run de [Actions](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/workflows/manual-basico-pdf.yml) posterior a QA-ED-26, verificar PDF/manifest/hashes y muestras de páginas, índice y tablas. Recuperar 2 cubiertas y 12 retratos originales con créditos/permisos y ubicarlos en `assets/editorial/`; seguir con equipo, PNJ, símbolos, mapa y preflight de imprenta. **PDF de lectura no equivale a libro ilustrado definitivo ni PDF de imprenta.**


## 23-11-2026 — QA-ED-27: verificar muestras PNG antes de publicar

- **Base cotejada:** `main` en `82ea585b6b2ab346957d885f0a44129f3d7fdda2`; se leyeron workflow y expediente. La fuente canónica no fue modificada.
- **Hallazgo:** el paso que inventaría hashes y publica el artifact no comprobaba que todas las páginas listadas en `muestras_visuales.json` tuvieran realmente un PNG correspondiente. El control de generación comprobaba cada PNG en su propio paso, pero faltaba una validación cruzada final del paquete.
- **Corrección verificable:** [commit `87192a2dba227d7d8ea3b53f3a3184ef9b5b1b2a`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/87192a2dba227d7d8ea3b53f3a3184ef9b5b1b2a) exige muestras únicas, ordenadas, dentro del rango de páginas y PNG mayores a 10 KB presentes en el inventario criptográfico. La revisión visual humana sigue pendiente.
- **Límite de verificación:** el conector GitHub sólo ofrece consulta de runs filtrada a eventos PR por SHA, no listado general de ejecuciones push; la API pública tampoco fue accesible desde el entorno de comprobación. No se verificó nueva ejecución, PDF, manifest ni resultado del control QA-ED-27.
- **Bloqueos:** obtener run reciente y artifact; contrastar `pdf_sha256`, `source_sha256`, tamaño y muestras 30/99/517; localizar cubiertas y doce retratos autorizados, documentar créditos y derechos; continuar índice/tablas, equipo/PNJ, mapa, preflight e imprenta. Último PDF inspeccionado según el expediente: 606 páginas de QA-ED-19. **PDF preliminar de lectura ≠ libro ilustrado ≠ PDF listo para imprenta.**


## 23-11-2026 — QA-ED-28: integridad de encabezados PNG del arte editorial

- **Base cotejada:** `main` en `5e8062213ff22092e8dd7f42de6882337f880f24`; se revisaron el inventario de activos, el workflow y este registro. Se consultó el artifact histórico 14779662589 de la ejecución 45087820113, todavía disponible, asociado al commit `736b4311d9151b0a013bbe8838c70496589558f2`. Esto **no** verifica una ejecución reciente posterior a QA-ED-27.
- **Defecto identificado:** `inventariar_activos.py` aceptaba como PNG presente cualquier archivo de al menos 33 bytes con firma y etiqueta IHDR, sin validar longitud del bloque, CRC del encabezado ni dimensiones positivas. Podía contabilizar un archivo corrupto como arte disponible y provocar errores de composición posteriores.
- **Cambio:** commit [`eb7344d27b13d69bee7c86abc8623d1f5392dbab`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/eb7344d27b13d69bee7c86abc8623d1f5392dbab) añade validación de longitud IHDR (13 bytes), CRC-32 y dimensiones mayores que cero, con estado `invalid_png` y causa explícita. No sustituye decodificación integral de PNG ni control de permisos/créditos.
- **Limitaciones:** se verificó la escritura del código, pero no se ejecutó todavía el nuevo control en GitHub Actions. No se descargó ni inspeccionó un PDF posterior al cambio. No se incorporaron imágenes no localizadas. El último PDF inspeccionado según expediente sigue siendo el preliminar de 606 páginas.
- **Próximos bloqueos:** obtener run posterior al commit y su artifact, contrastar manifest y PDF, abrir muestras 30/99/517, verificar tablas e índice; localizar e incorporar las 2 cubiertas y 12 ilustraciones originales con procedencia y créditos; completar mapa, equipo/PNJ/iconografía y preflight de imprenta. **PDF de lectura ≠ edición ilustrada ≠ PDF certificado de imprenta.**


## 23-11-2026 — QA-ED-29: validar estructura PNG completa

- **Base consultada:** main `6c3fb2d82f9b0fe5a0a5ac917e27a65a66e1938b`; se inspeccionaron workflow, inventario de activos y expediente. El endpoint de listado de ejecuciones de Actions fue rechazado por el conector (HTTP 400), aunque el endpoint individual de la ejecución histórica 45087820113 respondió con `conclusion: success`, fuente `736b4311d9151b0a013bbe8838c70496589558f2`. No demuestra una compilación posterior a QA-ED-28.
- **Hallazgo:** el inventario sólo comprobaba firma e IHDR; un PNG truncado después del encabezado podía figurar como `present`.
- **Cambio trazable:** [commit `d398077dbcd468226770ddf71cf3f1e65e22c6e0`](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/commit/d398077dbcd468226770ddf71cf3f1e65e22c6e0) verifica límites y CRC de todos los chunks PNG, exige IDAT y IEND final sin datos sobrantes, e identifica archivos truncados. No sustituye decodificación integral de imagen ni control de permisos. La fuente canónica no fue alterada.
- **Estado:** escritura del código confirmada; ejecución CI y PDF posterior aún sin comprobar. `assets/editorial/` devolvió 404 en consulta del repositorio; no se incorporaron imágenes ni se infiere que estén disponibles. Último PDF materialmente inspeccionado según expediente: 606 páginas, anterior a estas correcciones.
- **Próximos bloqueos:** verificar ejecución de Actions posterior al commit, descargar PDF/manifest/PNG y contrastar hashes; revisar muestras 30, 99, 517, tablas e índice; recuperar dos cubiertas y doce retratos originales con créditos; continuar mapa, equipo, PNJ, iconografía y preflight de imprenta. **PDF de lectura ≠ libro ilustrado definitivo ≠ PDF de imprenta.**


## 23-11-2026 — QA-ED-30: cotejo de artifact histórico y estado de `main`

- **Base consultada:** último commit de `main` identificado mediante búsqueda de commits: `f5e8ed1eee3061b3ed911226af5a00ef778f73b4` (QA-ED-29). Se releyeron este expediente y `.github/workflows/manual-basico-pdf.yml`; la fuente canónica no fue modificada.
- **Evidencia positiva de entrega histórica:** consulta directa de artifacts de la ejecución [45087820113](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45087820113) devuelve el artifact [14779662589](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45087820113/artifacts/14779662589), nombre `tierra-magica-manual-basico-lectura`, 2.547.060 bytes, `expired=false`, creado 2026-11-23 00:18:20 UTC, caducidad 2026-12-23 00:18:19 UTC, digest del ZIP `sha256:89987228910d9ba827d6f1722fbf074f37425251cebf9118fca4a130e738675a`. Corresponde a `head_sha=736b4311d9151b0a013bbe8838c70496589558f2`, **anterior** a QA-ED-29; el digest del ZIP **no es** la huella del PDF interior.
- **Límite de esta revisión:** no se descargaron los bytes del ZIP/PDF ni se abrió el manifest en esta ejecución. La consulta de artifact confirma metadatos y disponibilidad declarada por GitHub, no validez visual ni compilación de las correcciones posteriores. No se afirma nueva generación de PDF.
- **Bloqueo prioritario:** obtener una ejecución del workflow para un SHA de `main` posterior a `d398077dbcd468226770ddf71cf3f1e65e22c6e0`, descargar PDF y manifest, contrastar `pdf_sha256`/`source_sha256`, y revisar muestras 30/99/517, tablas e índice. Recuperar 2 cubiertas y 12 retratos originales con procedencia y créditos antes de edición ilustrada; continuar equipo, PNJ, símbolos, mapa y preflight de imprenta. **PDF de lectura ≠ edición ilustrada ≠ PDF listo para imprenta.**


## 23-11-2026 — QA-ED-31: descarga e inspección material del artifact histórico

- **Base cotejada:** registro de main tras QA-ED-30 (commit `23b5819116e1058caeb5797c1fbceafe0c073ea5`). Se revisaron workflow y maquetador; el Manual Maestro no se modificó.
- **Archivo realmente descargado:** artifact [14779662589](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45087820113/artifacts/14779662589), de la ejecución histórica [45087820113](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/45087820113), fuente de CI `736b4311d9151b0a013bbe8838c70496589558f2`. Se abrió el ZIP y se extrajeron 18 entradas: PDF, manifest, 7 PNG de muestra y controles JSON. No es una ejecución posterior a QA-ED-29.
- **Integridad comprobada sobre bytes reales:** PDF `Tierra_Magica_Manual_Basico_Lectura.pdf`, 1.715.714 bytes, SHA-256 `899ff0f34652cbc2baae44144c27a599b4e75234da40035539ffd0dd42ca891d`, coincidente con manifest. Inventario `control/entrega_sha256.json`: 17/17 archivos declarados existentes con tamaños y SHA-256 correctos. Manifest: 606 páginas, fuente SHA-256 `c4ebd0cfe26a8d87e1f84ca1764c0e87aa33d68382003c67e9a5e11749f4bb78`, 69 entradas de índice, 39 tablas convertidas, 0/12 retratos y 0/2 cubiertas originales.
- **Controles internos leídos:** preflight registra 606/606 páginas de 432×648 pt (6×9 pulgadas), 9 fuentes incrustadas y ninguna sin archivo embebido; auditoría de enlaces informa 422 enlaces internos, 2 externos, 0 destinos no resueltos y 0 fuera de rango. Estos son resultados del artifact histórico, no pruebas de imprenta ni auditoría visual integral.
- **Inspección visual efectiva:** se abrió un mosaico de las siete muestras PNG incluidas (páginas 1, 3, 5, 101, 303, 505 y 606). Portada y contraportada son sustitutos tipográficos, la página 5 contiene índice paginado, las interiores examinadas tienen texto visible y cabeceras/pies; no se observó recorte manifiesto en esas muestras a escala reducida. No se inspeccionaron las páginas 30, 99 y 517 porque **no están incluidas** en este artifact anterior a QA-ED-24. La página 303 contiene un bloque destacado que requiere control a escala de lectura. No se extrapola a las 606 páginas.
- **Bloqueo prioritario:** verificar un run de main posterior a QA-ED-29 y descargar sus bytes; cotejar SHA de checkout, PDF, manifest, inventario y muestras 30/99/517; revisar índice y tablas a escala de página. Recuperar e incorporar 14 imágenes originales con créditos y derechos, sin inventar arte; continuar equipo, PNJ, símbolos, mapa y preflight de imprenta. **PDF de lectura verificado históricamente ≠ edición ilustrada definitiva ≠ PDF certificado para imprenta.**
