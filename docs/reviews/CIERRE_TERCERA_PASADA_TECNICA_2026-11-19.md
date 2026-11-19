# Tercera pasada editorial — cierre de 16 referencias técnicas de lectura
**Fecha:** 2026-11-19 · **Estado:** cierre de la lista literal de términos de implementación, NO cierre general del manual.
**Fuente única conservada:** `docs/Tierra_Magica_Manual_Maestro.md`
**Derivado revisado:** `docs/edicion_impresa/Manual_Basico_Manuscrito_Lectura.md`
**Generador sincronizado:** `tools/build-print-manuscript.mjs`

## Resultado
Se resolvieron los **16 pasajes** pendientes señalados en la segunda pasada mediante **18 sustituciones puntuales**, incluyendo un párrafo con dos expresiones técnicas y otro con tres. Se mantuvieron en el texto de lectura las reglas y límites de juego, con redacción orientada al lector:

- **Creación:** Ascendencia, Origen y Trasfondo siguen sin conceder rangos de competencia gratis; Bono Defensivo sigue derivado de las Habilidades de armas.
- **Daño:** tipos propios de campaña no pasan a ser canon universal sin definición en el Manual.
- **Armas y equipo:** se conserva la equivalencia de las **171 variantes de armas**, **89 de armaduras** y **51 de escudos**, más las **44 propuestas de armas** y otras propuestas sin perfil. No se inventan sus estadísticas.
- **Magia:** Reconstrucción no recibe requisito numérico adicional de Medicina.
- **Economía:** el cobre continúa como unidad de cálculo íntegra; la Adaptación conserva precio, porcentajes y redondeos; la migración de `crowns` quedó fuera del **derivado de lectura**, pero permanece en el Manual Maestro como política de migración.
- **Brevísima transición CRAFT-13:** se eliminó del libro la frase «El siguiente bloque es implementación Foundry», que no describe una regla.
- **PNJ:** Soldado sigue sin ficha definitiva, y los once encuentros siguen presentándose como ejemplos y no once fichas completas nuevas.

## Verificación del derivado recuperado de GitHub
| Control | Resultado |
|---|---:|
| Capítulos con encabezado numérico | 52 |
| Anclas | 52 |
| Identificadores de ancla distintos | 52 |
| Remisiones Markdown a capítulos | 9 |
| Remisiones Markdown sin destino | **0** |
| Ascendencias | **12** |
| Líneas con patrón literal `Foundry / runtime / Compendio / CREA-[0-9]` | **0** |
| Longitud del derivado | 836.256 caracteres |
| Palabras aproximadas | 125.408 |
| Generador con sustituciones sincronizadas | Sí |

El Manual Maestro aún contiene su terminología técnica; su documentación de implementación **no se ha borrado**.

## Limitaciones
- El recuento de cero corresponde **exclusivamente al patrón literal auditado**. Todavía pueden aparecer referencias técnicas con otras palabras, instrucciones editoriales o informes insertados dentro del contenido CRAFT; no declarar «cero información técnica» en sentido amplio.
- Las 18 sustituciones incluyen redacción editorial deliberadamente breve; deben pasar lectura integral para evitar pérdida de matices ante un cambio futuro del Maestro.
- No se ejecutó el generador bajo Node de forma independiente ni se comprobó equivalencia byte por byte contra una compilación local.
- No existe todavía revisión global ortotipográfica, índice paginado, aprobación de arte, prueba de impresión ni PDF definitivo.

## Siguiente bloque
1. Revisar los marcadores editoriales restantes (`VIGENTE · CERRADO`, `pendiente`, `auditoría`, `propuestas`) para diferenciar narración de desarrollo.
2. Preparar un glosario general del reglamento y un índice de términos para la edición impresa.
3. Construir una maqueta piloto extendida con las doce ascendencias y la nueva redacción.
