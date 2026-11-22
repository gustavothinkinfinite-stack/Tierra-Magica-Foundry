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
