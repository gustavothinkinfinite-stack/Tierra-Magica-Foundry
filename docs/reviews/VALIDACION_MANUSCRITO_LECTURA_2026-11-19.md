# Validación del manuscrito de lectura — 2026-11-19

**Estado:** manuscrito Markdown generado y guardado en rama de revisión; **NO es maqueta ni archivo de imprenta**.
**Fuente:** `docs/Tierra_Magica_Manual_Maestro.md`.
**Salida comprobada:** `docs/edicion_impresa/Manual_Basico_Manuscrito_Lectura.md`.
**Generador:** `tools/build-print-manuscript.mjs`.

## Resultados de comprobación real con los archivos de GitHub
| Prueba | Resultado |
|---|---|
| Archivo de salida creado y recuperado posteriormente desde GitHub | **Conforme** |
| Tamaño del texto fuente | 854.740 caracteres |
| Tamaño del derivado de lectura | 842.593 caracteres |
| Longitud aproximada del derivado | 126.303 palabras; 13.930 líneas |
| Encabezados numerados | 52 (24 de reglamento, 14 del canon mundial y 14 del panteón) |
| Ascendencias | 12/12 encabezados conservados y colocados tras §3 |
| Secciones con fuente única | Cinco grandes bloques extraídos **sin modificaciones internas** |
| Integridad de bloques | **5/5 idénticos** al texto origen, y cada bloque aparece exactamente una vez |
| Presencia del grimorio canónico | Conforme: título §12 presente |
| Presencia de CRAFT-12 y capítulo 18 | Conforme: conservados |
| Presencia del bestiario y 38 capítulos del bloque normativo-panteón | Conforme |
| Verificación de salida mediante reapertura de archivo GitHub | Conforme |
| Ejecución independiente de `node tools/build-print-manuscript.mjs` | **Pendiente:** el contenedor local no tiene acceso de red al repositorio; el ensamblado equivalente se ejecutó sobre las cadenas recuperadas mediante el conector de GitHub |
| Revisión tipográfica, enlaces y paginación | **Pendiente** |

## Evidencia de conservación exacta

Se comparó el manuscrito completo contra cinco bloques extraídos de la fuente, **incluyendo contenido interno íntegro y no sólo títulos**:

1. Reglas §§1–3: **82.429 caracteres**, incluido una vez.
2. Anexo canónico de doce ascendencias: **66.400 caracteres**, incluido una vez.
3. Reglas §§4–24, CRAFT incluido: **497.675 caracteres**, incluido una vez.
4. Canon del Mundo v1.2: **61.824 caracteres**, incluido una vez.
5. Cosmología y Panteón §§25–38: **133.418 caracteres**, incluido una vez.

Total exacto de texto conservado en esos bloques: **841.746 caracteres**. La diferencia hasta la longitud del derivado procede del encabezado editorial, nota de integridad, separadores y saltos entre segmentos. Los fragmentos de gobernanza y consolidación excluidos están documentados en el mapa de procedencia; siguen íntegros en el Maestro.

## Problemas detectados tras la reordenación

**VAL-01 · Numeración ambigua (prioridad alta).** El texto contiene dos series de capítulos etiquetadas §§1–14: una de reglas y otra de canon mundial. Se detectaron **14 números de sección repetidos**, aunque los títulos sean distintos. Antes de la maqueta definitiva deben asignarse identificadores editoriales únicos, sin reescribir mecánicas.

**VAL-02 · Contenido técnico incrustado (prioridad alta).** Aún existen referencias a Foundry, runtime, flujo de Compendios y notas CRAFT/CREA dentro de los capítulos. Un recuento de términos focalizados encontró **26 apariciones** de la lista `Foundry|CRAFT-12|runtime|Implementación|CREA-11` en el derivado; es una señal, **no** un inventario exhaustivo de toda la documentación interna. Debe clasificarse párrafo por párrafo; no borrar material normativo por contener una sigla técnica.

**VAL-03 · Duplicación de ascendencias (prioridad media).** §3 conserva paquetes mecánicos completos y las doce dobles páginas vuelven a resumirlos. La proximidad física mejora la lectura, pero exige identificar una sola versión normativa (el §3 y su cierre B5) y evitar dos páginas de reglas visualmente contrapuestas.

**VAL-04 · Paginación e índices (prioridad alta).** La nueva posición de los apartados impide fijar referencias de página hasta diseñar retícula, folios y encabezados. Los enlaces por títulos existentes requieren un mapa de anclas final.

**VAL-05 · Extensión (prioridad alta).** 126.303 palabras no permiten estimar responsablemente el lomo de la tapa dura sin maquetar, elegir gramaje y conocer el soporte de impresión. No prometer número de páginas ni coste de impresión todavía.

## Próximo paso autorizado
- Crear estilos maestros para Carta, formular una **maqueta piloto de 8–12 páginas** y confrontarla con las reglas y tablas verificadas.
- Separar notas técnicas del material de lectura con control de cobertura; conservar fuente única.
- Generar tabla de contenidos con anclas e identificadores únicos después de estabilizar secciones.
- Repetir validación de integridad tras cada nueva revisión del Maestro.

**Conclusión:** se ha producido y cotejado un **manuscrito Markdown completo de lectura, todavía no depurado**, no un PDF final para imprenta. Las comprobaciones realizadas prueban conservación textual de los cinco grandes bloques, no su aptitud tipográfica ni el resultado de ejecutar el script en Node.
