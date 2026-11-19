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

Estas modificaciones sólo sincronizan documentación: **no alteran costes, capacidades, atributos, estadísticas, canon ni programación**.

## Matriz de hallazgos

| ID | Prioridad | Evidencia reproducible | Estado | Acción recomendada |
|---|---|---|---|---|
| ED-01 | Alta | Sección «Estado de consolidación», anterior a la edición: recuento histórico 18 frente al grimorio actual de 60 | **Corregido en rama** | Confirmar que ningún índice derivado repita 18 como total vigente |
| ED-02 | Alta | «Estado de consolidación» describía pueblos sin paquetes, mientras el §3 y el anexo incorporan 12 paquetes | **Corregido en rama** | Conservar separación entre Ascendencia, Origen y Trasfondo |
| ED-03 | Media | «Estructura de trabajo» mencionaba Parte III aunque el archivo histórico ya está fuera del circuito activo | **Corregido en rama** | Mantener el archivo sólo para trazabilidad |
| ED-04 | Alta / decisión | En el anexo canónico de Humanos, bajo «Opciones compatibles y límites», permanece una **«Aclaración editorial propuesta, pendiente de aprobación»** sobre categorías Significativo/Menor de Don sin Forma | **Bloqueado: requiere aprobación expresa** | Decidir equivalencias de Rasgos; no reetiquetar como aprobado sin ratificación |
| ED-05 | Media | El cierre B5 del §3 ya presenta aclaraciones vigentes de Movimiento entre medios, Escala/Enraizar/Derribar, Enlace Micelial y demás interacciones; el anexo incluye detalles de traslado entre medios y Derribar | **Requiere cotejo línea a línea** | Verificar que toda paráfrasis racial respete el cierre B5; eliminar sólo etiquetas obsoletas, no texto normativo válido |
| ED-06 | Alta / publicación | Capítulo 9 identifica **65 propuestas mundanas** de equipo todavía pendientes de precio y uso fino | **Pendiente de selección editorial** | Decidir si se excluyen del Manual Básico o se resuelven con aprobación; no inventar precios |
| ED-07 | Alta / publicación | Capítulo 23 separa 11 perfiles de referencia de fichas exhaustivas; algunos campos permanecen contextuales (Civil, Soldado, Canalizador, Troll, Centinela) | **Parcial** | Seleccionar fichas realmente «listas para mesa» y verificar que no necesiten inferir capacidades |
| ED-08 | Media | Símbolos de los siete Primordiales y cinco Luminarias deben tener un inventario visual de cobertura; el registro técnico está delegado a `docs/visual/SIMBOLOS_CANONICOS.md` | **No cerrado en esta pasada** | Comprobar 12/12 por entidad, versión y aprobación explícita |
| ED-09 | Media | `docs/REFERENCIA_RAPIDA_GLOSARIO_1.0.md` existe, pero el Manual Maestro aún marca glosario e índices editoriales como pendientes | **Pendiente** | Generar índice temático, índice de hechizos/tablas y glosario del libro final; sincronizar referencia rápida con los 60 hechizos |
| ED-10 | Media | El anexo «DOCE ASCENDENCIAS» aparece después del bloque de estado de consolidación y del material técnico CREA-11, no integrado físicamente en §3 | **Decisión de organización pendiente** | Definir inserción y referencias cruzadas para la maquetación sin duplicar ni perder contenido |
| ED-11 | Media | Apartados técnicos CRAFT-01…12 y catálogos extensos ocupan una proporción importante del documento fuente | **Riesgo editorial** | Distinguir texto de lectura básico de anexos de consulta; preservar el canon único aunque se generen volúmenes derivados |
| ED-12 | Alta / certificación | Las auditorías técnicas de Foundry constan en documentación, pero esta pasada **no ejecutó** pruebas ni observó partidas de mesa | **No verificado** | Ejecutar regresiones y playtests por separado antes de declarar calidad operativa completa |

## Criterios de tratamiento

- **Corrección editorial segura:** referencias desactualizadas o descripciones históricas cuyo estado vigente ya está respaldado inequívocamente en el Manual.
- **Decisión pendiente:** conservar la marca de propuesta y solicitar ratificación; nunca inventar aprobación.
- **Hueco de ficha:** identificarlo, no conceder ataques, estadísticas, capacidades ni precios imaginados.
- **Canon deliberadamente abierto:** no tratar un misterio narrativo como defecto editorial.
- **Fuente única:** toda regla nueva debe entrar primero en el Manual Maestro. Los documentos de apoyo no crean autoridad paralela.

## Estado de las seis áreas de cierre

1. **Coherencia:** en curso, tres correcciones seguras aplicadas; falta cotejo semántico sección por sección y resolución de ED-04.
2. **Equipo/economía:** en revisión; no se cambiaron valores por falta de aprobación.
3. **PNJ/criaturas:** parcial; perfiles de referencia y encuentros ya existen, pero no equivalen todos a fichas autónomas completas.
4. **Iconografía:** pendiente inventario verificable 12/12.
5. **Glosario/índices:** pendiente de cierre de contenido; existe referencia rápida separada.
6. **Producción editorial:** aún no iniciada en esta rama; sin PDF o maqueta final.

## Verificación antes de fusionar
- [ ] Revisar diff completo y confirmar cero cambios normativos involuntarios.
- [ ] Resolver o excluir expresamente de alcance editorial ED-04, ED-06 y ED-07.
- [ ] Completar cotejo racial B5 y registro iconográfico.
- [ ] Ejecutar pruebas de documentos y regresión pertinentes sobre el head de la rama.
- [ ] Comprobar que `main` no cambió por estas operaciones.
- [ ] Aprobar formalmente la integración antes de fusionar.

**Conclusión:** este registro constituye la **primera pasada integral de hallazgos y correcciones seguras**, no una certificación final ni una declaración de que la auditoría editorial quedó cerrada.
