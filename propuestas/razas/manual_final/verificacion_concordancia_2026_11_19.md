# Verificación de concordancia editorial — 19-11-2026

**Estado: control documental parcial, NO CANÓNICO.** Autoridad consultada: `main:docs/Tierra_Magica_Manual_Maestro.md`, blob `0c8ddfb0b218bed38cd10962a1ac35bab8821466`. Rama de trabajo: `propuestas/razas-autonomas-2026`.

## Método reproducible y límites

Se recuperaron de GitHub los doce `manual_final_propuesto.md` y el `manual_final/capitulo_ascendencias_lectura_editorial.md` vigente. Se separaron las doce secciones por sus títulos de nivel 2, se contó el texto separado por espacios y se compararon vocablos únicos normalizados (minúsculas, sin tildes, sin marcas Markdown) entre fuente y sección. **Esto no constituye equivalencia literal ni semántica certificada**: omisiones, cambios de negación y puntuación pueden escapar al método. Algunos archivos usan encabezados de página diferentes; por eso la extracción automática de texto imprimible no es válida para las doce fuentes y no debe utilizarse como veredicto global.

## Hallazgos verificables

| Familia | Palabras en sección consolidada (incluye contenido de sección, excluye título de familia) | Control léxico de fuente | Estado |
|---|---:|---|---|
| Humanos | 765 | Ningún vocablo significativo de fuente ausente en sección | Parcial favorable |
| Enanos | 811 | Ningún vocablo significativo ausente | Parcial favorable |
| Élficos | 794 | Ningún vocablo significativo ausente | Parcial favorable |
| Orcos | 761 | Ningún vocablo significativo ausente | Parcial favorable |
| Goblinoides | 793 | Ningún vocablo significativo ausente; fuente recortada ya presente | Parcial favorable |
| Terios | 712 | 24 vocablos de la fuente no presentes; varios pertenecen a notas editoriales (Renkai, branquias, bonificaciones, pendiente) | Requiere cotejo humano de exclusiones |
| Feéricos | 770 | Extracción de fuente no compatible con patrón de páginas usado | Pendiente de control semántico |
| Ankar | 820 | Ningún vocablo significativo ausente | Parcial favorable |
| Cristálidos | 748 | Extracción de fuente no compatible | Pendiente |
| Verdantes | 752 | Extracción de fuente no compatible | Pendiente |
| Micelios | 811 | Extracción de fuente no compatible | Pendiente |
| Coralios | 841 | Extracción de fuente no compatible | Pendiente |

El conteo usa espacios, no un paginador, y no demuestra que el diseño entre en dos páginas. Todos los recuentos de sección están entre 650 y 850; **el cumplimiento de cada fuente individual no queda certificado por esta tabla**. No se debe trasladar el resultado a una declaración de cierre editorial total.

## Próximo bloque sustantivo

1. Cotejar párrafos imprimibles de Terios y los cinco archivos con estructura alternativa, distinguiendo notas técnicas deliberadamente excluidas de contenido jugable omitido.
2. Revisar negaciones, costes, excepciones y remisiones de las doce secciones contra el Manual Maestro, no sólo coincidencias léxicas.
3. Registrar el control de paginación real y producir informe global únicamente cuando estos puntos estén resueltos o expresamente identificados como limitaciones.

**Pruebas:** 12 archivos leídos y 12 secciones inspeccionadas por comparación textual; 0 ejecuciones en Foundry, 0 playtests, 0 maquetas verificadas. Sin cambios de canon ni de mecánicas.
