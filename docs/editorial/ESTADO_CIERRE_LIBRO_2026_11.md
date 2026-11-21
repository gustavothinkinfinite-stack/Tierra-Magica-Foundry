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
