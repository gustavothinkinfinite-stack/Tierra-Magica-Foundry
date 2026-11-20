# Octava pasada — depuración conservadora de CRAFT-12

**Fecha:** 20-11-2026. **Rama:** `review/auditoria-editorial-integral-2026-11-19`. **Estado:** cambios editoriales aplicados y cotejo literal del apartado; prueba independiente de Node y PDF integral todavía pendientes.

## Objetivo y alcance

El capítulo 18 incorpora CRAFT-12, un bloque híbrido con auditoría de fabricación y 15 correcciones mecánicas. La depuración retira únicamente afirmaciones históricas de cierre y reformula el aviso de compatibilidad futura para lectura. **No se extrajo el resto de la auditoría ni se suprimieron correcciones normativas.**

## Cambios registrados

Se modificaron el manuscrito derivado y `tools/build-print-manuscript.mjs` de forma coordinada:

| Antes | Después | Motivo |
|---|---|---|
| `#### Resultado de cierre` | `#### Control de compatibilidad futura` | Describir la finalidad para el lector |
| `CRAFT-01 a CRAFT-11 quedan considerados **coherentes entre sí después de las correcciones de CRAFT-12**.` | Frase retirada del derivado | Declaración de estado histórico, no mecánica |
| `CRAFT-12 queda como auditoría de regresión: cualquier regla futura que afecte crafting debe comprobar al menos:` | `Cualquier regla futura que afecte el sistema de fabricación debe comprobar al menos:` | Conservar íntegra la lista de comprobación de compatibilidad |
| `**CRAFT-12 queda cerrado.**` | Frase retirada del derivado | Declaración de estado de proyecto |

El título de CRAFT-12, su texto introductorio, sus objetivos, la matriz de auditoría, las validaciones cuantitativas, la sección «Estado posterior a correcciones» y **las quince subsecciones «Corrección — …»** se conservan. Los tres fragmentos históricos retirados de la edición de lectura se documentan arriba y siguen íntegros en el Manual Maestro.

## Verificación real del bloque

Se reabrieron en GitHub el Maestro, el derivado y el ensamblador después de los commits. La sección CRAFT-12 se extrajo de cada texto y se comparó literalmente tras aplicar **solo** los cuatro cambios documentados, la normalización editorial previa de `VIGENTE · CERRADO` a `Regla vigente` y la exclusión técnica ya prevista del aviso de CRAFT-13.

**Resultado:** coincidencia de todo el texto CRAFT-12 restante, sin diferencias inesperadas.

| Control | Resultado |
|---|---|
| Subsecciones «Corrección — …» | 15 conservadas |
| Anclas del manuscrito | 52, todas únicas |
| Enlaces a anclas | 9, ninguno roto |
| Definiciones de glosario (sin dos líneas de metadatos) | 25 |
| Frase histórica «CRAFT-12 queda cerrado» en el derivado | 0 |
| Afirmación histórica de coherencia CRAFT-01 a CRAFT-11 en el derivado | 0 |
| Presencia de cambios en generador | Sí |
| Comprobación independiente con Node | Pendiente |

## Evaluación del siguiente tramo

**No eliminar automáticamente** «Objetivo», «Matriz de auditoría», «Auditoría económica automatizada», «Estado posterior a correcciones» ni apartados defensivos/ofensivos. Aunque su tono sea técnico, contienen límites y cifras que pueden resultar esenciales para aplicar correctamente las reglas.

Antes de extraerlos del libro es necesario comprobar si cada regla aparece también en otra sección normativa y dejar trazabilidad exacta de su ubicación. El criterio de publicación exige **cobertura completa, no supresión por apariencia editorial**.

La siguiente fase principal es producir un formato imprimible del libro completo, cotejar tablas y paginar un PDF real; la maqueta parcial de ascendencias no sustituye ese control.

**Límite:** `main` y `docs/Tierra_Magica_Manual_Maestro.md` no se modificaron. No se afirma ejecución de Node ni aprobación para imprenta.
