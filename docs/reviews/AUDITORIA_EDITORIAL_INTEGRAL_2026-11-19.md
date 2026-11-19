# AUD-EDIT-2026-11-19 — Auditoría editorial integral del Manual Básico (primera pasada)

**Estado:** revisión en rama; **NO APROBADA para fusionar**.
**Rama:** `review/auditoria-editorial-integral-2026-11-19`
**Base original de main:** `de6880919fd6c515c669f0163783886afab3331f`.
**Fuente normativa:** `docs/Tierra_Magica_Manual_Maestro.md`.
**Alcance:** inspección estructural transversal del Manual Maestro (aprox. 14.046 líneas en esta revisión), contraste con `README.md`, `docs/FUENTES_CANONICAS.md`, `docs/REFERENCIA_RAPIDA_GLOSARIO_1.0.md` y `docs/AUDITORIA_INTEGRAL_FINAL_1.0.md`; búsquedas de fórmulas de estado obsoletas, decisiones pendientes, bloques editoriales y cobertura de capítulos. No se sustituyen decisiones canónicas por inferencia.

## Correcciones realizadas en la rama
1. **Resumen final de magia:** sustituido «catálogo estable de 18 hechizos» por «grimorio canónico de 60 hechizos», coherente con el capítulo 12 y `docs/FUENTES_CANONICAS.md`.
2. **Resumen final de ascendencias:** sustituida la afirmación histórica «sin paquetes mecánicos gratuitos» por la situación actual de doce paquetes vigentes, separados de los presupuestos profesionales generales.
3. **Estructura de trabajo inicial:** actualizada la antigua referencia a «Parte III» para identificar el archivo narrativo histórico como almacenamiento externo no normativo, de acuerdo con la disposición final y la política de fuente única.

4. **Cotejo racial B5 (segunda pasada):** corregidas tres referencias de anexo que describían como propuestas las reglas ya aprobadas de Derribar/Enraizar (Enanos y Verdantes) y Movimiento mixto (Coralios). Registro de alcance y decisiones abiertas en `docs/reviews/COTEJO_B5_DOCE_ASCENDENCIAS_2026-11-19.md`.

5. **Economía y guía derivada:** actualizada la referencia rápida para eliminar la modalidad histórica de Paquetes de Preparación y presentar los 60 hechizos vigentes; ver `docs/reviews/COTEJO_EQUIPO_ECONOMIA_2026-11-19.md`.

Estas modificaciones sólo sincronizan documentación: **no alteran costes, capacidades, atributos, estadísticas, canon ni programación**.

## Matriz de hallazgos

| ID | Prioridad | Evidencia reproducible | Estado | Acción recomendada |
|---|---|---|---|---|
| ED-01 | Alta | Sección «Estado de consolidación», anterior a la edición: recuento histórico 18 frente al grimorio actual de 60 | **Corregido en rama** | Confirmar que ningún índice derivado repita 18 como total vigente |
| ED-02 | Alta | «Estado de consolidación» describía pueblos sin paquetes, mientras el §3 y el anexo incorporan 12 paquetes | **Corregido en rama** | Conservar separación entre Ascendencia, Origen y Trasfondo |
| ED-03 | Media | «Estructura de trabajo» mencionaba Parte III aunque el archivo histórico ya está fuera del circuito activo | **Corregido en rama** | Mantener el archivo sólo para trazabilidad |
| ED-04 | Alta / decisión | La doble página Humana dejaba la clasificación de Rasgos Significativo/Menor como propuesta, aunque el catálogo del §5 ya fija costes y grados | **Resuelto en rama (DEC-ED-05)** | Clasificación aprobada con base en 1 PR Menor / 2 PR Significativo, sólo para Rasgos expresamente compatibles |
| ED-05 | Media | B5 vigente en §3 frente a etiquetas de propuesta en páginas de Enanos, Verdantes y Coralios | **Tres contradicciones corregidas en rama; cotejo restante abierto** | Resolver discrepancia de términos «1 Movimiento» / «1 punto de Movimiento» y verificar demás paráfrasis raciales en registro B5 |
| ED-06 | Alta / publicación | Catálogo EQP-01: 65 propuestas mundanas y 10 especiales sin precio/Perfil; Disponibilidad y mercado aún sin equivalencia universal | **Alcance editorial aprobado; auditoría económica detallada pendiente** | No imprimir como bienes comprables propuestas sin precio/perfil. Conservar categorías vigentes sin asignar rarezas por inferencia. Ver `DECISIONES_EDITORIALES_APROBADAS_2026-11-19.md` |
| ED-07 | Alta / publicación | Once perfiles de referencia, varios con campos contextuales; seis perfiles poseen ataques numéricos y defensas publicadas | **Seis perfiles seleccionados para edición; prueba práctica pendiente** | Cotejar `BESTIARIO_BASICO_FICHAS_SELECCIONADAS_2026-11-19.md`; mantener otros cinco como referencia, no como fichas autónomas definitivas |
| ED-08 | Media | Símbolos de los siete Primordiales y cinco Luminarias deben tener un inventario visual de cobertura; el registro técnico está delegado a `docs/visual/SIMBOLOS_CANONICOS.md` | **No cerrado en esta pasada** | Comprobar 12/12 por entidad, versión y aprobación explícita |
| ED-09 | Media | `docs/REFERENCIA_RAPIDA_GLOSARIO_1.0.md` existe, pero el Manual Maestro aún marca glosario e índices editoriales como pendientes | **Pendiente** | Generar índice temático, índice de hechizos/tablas y glosario del libro final; sincronizar referencia rápida con los 60 hechizos |
| ED-10 | Media | El anexo «DOCE ASCENDENCIAS» aparece después del bloque de estado de consolidación y del material técnico CREA-11, no integrado físicamente en §3 | **Decisión de organización pendiente** | Definir inserción y referencias cruzadas para la maquetación sin duplicar ni perder contenido |
| ED-11 | Media | Apartados técnicos CRAFT-01…12 y catálogos extensos ocupan una proporción importante del documento fuente | **Riesgo editorial** | Distinguir texto de lectura básico de anexos de consulta; preservar el canon único aunque se generen volúmenes derivados |
| ED-12 | Alta / certificación | Las auditorías técnicas de Foundry constan en documentación, pero esta pasada **no ejecutó** pruebas ni observó partidas de mesa | **No verificado** | Ejecutar regresiones y playtests por separado antes de declarar calidad operativa completa |

## Decisiones posteriores ratificadas

- **DEC-ED-05** clasifica los Rasgos compatibles de Don sin Forma mediante costes ya canónicos de §5: Visión en la Oscuridad y Resistencia Ambiental Significativa como Significativos; Sentido Agudo, Trepador Natural, Afinidad Sobrenatural y Resistencia Ambiental Menor como Menores.
- **DEC-ED-06** unifica la liberación de Enraizar en **1 punto de Movimiento**, sin consumir todo el recurso. Ambas se reflejan en el Manual Maestro de la rama y tienen fundamento en `docs/reviews/DECISIONES_EDITORIALES_APROBADAS_2026-11-19.md`.

## Avance en armamento
- Se sincronizó la tabla de precios del §19 con **nueve perfiles** que ya estaban correctamente valorados en §9; Mandoble conserva su fila bajo nombre equivalente. Se prepararon tablas para edición impresa (29 armas, 5 armaduras, 3 escudos, 5 lotes de munición) y se registraron límites en `docs/reviews/COTEJO_ARMAMENTO_2026-11-19.md`.
- **Nuevo punto pendiente:** prorrateo de lotes con fracciones de cobre; el Maestro establece cobre como unidad mínima y permite dividir lotes proporcionalmente, sin explicitar redondeo de compra de unidades indivisibles.

## Cierre de revisión de armamento — decisión DEC-ED-07
- Catálogo base §9: **29 armas, 5 armaduras, 3 escudos**; los valores se trasladaron a tablas derivadas para maquetación.
- §19 recibió **nueve** filas de precios previamente aprobados en §9, conservando el alias de Mandoble.
- Se aprobó **DEC-ED-07**: compras de unidades separadas del lote se prorratean por cantidad total de producto de la operación y se redondean una sola vez hacia arriba a cobre; ventas/recuperaciones siguen redondeo hacia abajo. El Manual §§9 y 19 ya contienen esta regla.
- Registro: `docs/reviews/COTEJO_ARMAMENTO_2026-11-19.md` y `docs/reviews/TABLAS_EDITORIALES_ARMAS_ARMADURAS_ESCUDOS_MUNICION_2026-11-19.md`.
- Pendientes: cotejo total de variantes individualizadas y pruebas funcionales.

## Avance — Alquimia y ocho fórmulas (2026-11-19)
- Verificación **8/8** de nombre y precio entre §16 y la tabla de CRAFT-11; no se cambiaron valores ni recetas.
- Las ocho fichas editoriales con activación, Saturación, vías, efectos, CM, tiempos y requisitos se encuentran en `docs/reviews/FICHAS_EDITORIALES_OCHO_FORMULAS_ALQUIMICAS_2026-11-19.md`.
- Se aclaró en el §9 que su tabla de consumibles es **un resumen**, y que §16 y CRAFT-11 fijan los detalles completos. Se destacan Bálsamo vs Poción Restauradora y la Saturación Antitóxica de Neutralizante.
- Pendientes: pruebas de uso y corrección de maqueta. **No está terminada la auditoría integral.**

## Avance en estructura impresa
- Se registró el mapa de procedencia y un generador no destructivo de manuscrito de lectura: `tools/build-print-manuscript.mjs`.
- La segmentación sobre la fuente recuperada detectó límites únicos, 24 capítulos de reglas, 14 de mundo, 14 de cosmología/panteón y 12 ascendencias, sin excluir CRAFT-12.
- Se preparó la reubicación del anexo racial detrás de creación, pero **no se ejecutó ni evaluó todavía la compilación real bajo Node.js**, ni está lista para imprenta.
- Documento: `docs/reviews/MAPA_PROCEDENCIA_MANUSCRITO_IMPRESO_2026-11-19.md`.

## Manuscrito de lectura producido y auditado
- Se creó en la rama `docs/edicion_impresa/Manual_Basico_Manuscrito_Lectura.md` y se recuperó de GitHub para comprobar su existencia.
- Cinco bloques completos del Maestro conservados exactamente una vez, doce ascendencias trasladadas y 52 capítulos identificados.
- Se registraron VAL-01 (numeración repetida 1–14), VAL-02 (contenido técnico intercalado), VAL-03 (repeticiones raciales), VAL-04 (anclas y paginación) y VAL-05 (extensión) en `docs/reviews/VALIDACION_MANUSCRITO_LECTURA_2026-11-19.md`.
- Sigue pendiente prueba independiente de Node.js y una maqueta piloto real; la integridad textual **no equivale a preparación para imprenta**.

## Avance — primera maqueta piloto Carta e identificadores de capítulos
- Se generó y renderizó un **PDF de prueba de 10 páginas US Letter**, con introducción, reglas 2d10, creación, doble página Humana y tablas de armaduras/escudos. El PDF se entregó como archivo en la conversación; **no se incorporó el binario a GitHub**.
- Diseño y validaciones registradas en `docs/reviews/MAQUETA_PILOTO_CARTA_10P_2026-11-19.md`.
- Se asignaron **52 identificadores únicos** (`R01–R38`, `M01–M14`) para resolver la duplicación de números de capítulos; `docs/reviews/INDICE_IDS_CAPITULOS_UNICOS_2026-11-19.md`.
- Pendientes: aplicar anclas y referencias al manuscrito definitivo, revisión tipográfica de tamaño real, tratamiento de notas internas, arte, sangrado, imprenta y PDF/X. La maqueta es **prototipo**, no validación editorial final.

## Criterios de tratamiento

- **Corrección editorial segura:** referencias desactualizadas o descripciones históricas cuyo estado vigente ya está respaldado inequívocamente en el Manual.
- **Decisión pendiente:** conservar la marca de propuesta y solicitar ratificación; nunca inventar aprobación.
- **Hueco de ficha:** identificarlo, no conceder ataques, estadísticas, capacidades ni precios imaginados.
- **Canon deliberadamente abierto:** no tratar un misterio narrativo como defecto editorial.
- **Fuente única:** toda regla nueva debe entrar primero en el Manual Maestro. Los documentos de apoyo no crean autoridad paralela.

## Estado de las seis áreas de cierre

1. **Coherencia:** en curso, ocho correcciones documentales seguras aplicadas (tres históricas y tres raciales B5); falta cotejo semántico sección por sección; ED-04 y B5-D02 están resueltos editorialmente.
2. **Equipo/economía:** alcance del catálogo de compra aprobado sin cambios de precio; cotejo final de valores y mercado pendiente.
3. **PNJ/criaturas:** seis fichas de referencia seleccionadas para el libro; el resto sigue contextual o incompleto. Prueba de mesa y cotejo final pendientes.
4. **Iconografía:** pendiente inventario verificable 12/12.
5. **Glosario/índices:** pendiente de cierre de contenido; existe referencia rápida separada.
6. **Producción editorial:** aún no iniciada en esta rama; sin PDF o maqueta final.

## Verificación antes de fusionar
- [ ] Revisar diff completo y confirmar cero cambios normativos involuntarios.
- [x] Resolver ED-04 mediante DEC-ED-05; B5-D02 mediante DEC-ED-06. Alcance de ED-06/ED-07 aprobado en `DECISIONES_EDITORIALES_APROBADAS_2026-11-19.md`, con verificaciones económicas y de bestiario aún abiertas.
- [ ] Completar cotejo racial B5 y registro iconográfico.
- [ ] Ejecutar pruebas de documentos y regresión pertinentes sobre el head de la rama.
- [ ] Comprobar que `main` no cambió por estas operaciones.
- [ ] Aprobar formalmente la integración antes de fusionar.

**Conclusión:** este registro constituye la **primera pasada integral de hallazgos y correcciones seguras**, no una certificación final ni una declaración de que la auditoría editorial quedó cerrada.
