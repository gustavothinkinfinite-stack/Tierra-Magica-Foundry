# Segunda auditoría editorial de referencias y notas técnicas
**Fecha:** 2026-11-19 · **Estado:** ejecutado parcialmente; pendientes identificados sin supresión automática.
**Fuente:** `docs/edicion_impresa/Manual_Basico_Manuscrito_Lectura.md`.

## Cambios efectivamente aplicados
- Se insertaron **nueve** remisiones Markdown que apuntan a anclas de lectura de capítulos (siete destinos únicos: R05, R06, R08, R10, R13, R14 y R18). **Ninguna es enlace roto**: todos esos IDs existen entre las 52 anclas verificadas.
- Se sustituyeron **cuatro pasajes** de historial técnico en creación conservando contenido de las reglas: Ascendencia/Origen/Trasfondo singular, compra de equipo exclusivamente mediante Compra libre, precios exactos, y tablas de Rasgos de creación.
- Las mismas transformaciones se incorporaron en `tools/build-print-manuscript.mjs` para no perderlas al regenerar el derivado.
- El Manual Maestro **no sufrió cambios**, ya que mantiene toda la información de procedencia y autoridad normativa.

## Resto de notas técnicas localizadas
Se encontraron **16 líneas** que todavía contienen, de forma literal, alguno de `Foundry`, `runtime`, `Compendio` o `CREA-<número>`. El recuento detecta pistas textuales, no cualquier asunto técnico que pudiera redactarse de otra manera. **Ninguna se elimina de oficio.**

| ID | Línea aproximada del derivado | Tratamiento recomendado | Comienzo del pasaje |
|---|---:|---|---|
| TEC-01 | 402 | Revisión manual; conservar hasta verificar norma | **Costes profesionales (B5-I12).** Ascendencia, Origen, Trasfondo, cultura y religión no añaden por inferencia… |
| TEC-02 | 769 | Revisión manual; conservar hasta verificar norma | Foundry calcula automáticamente ese rango a partir de las cuatro Habilidades de armas. Estar **Desprevenido** … |
| TEC-03 | 3502 | Conservar restricciones de canon; reformular historial | Foundry puede registrar tipos personalizados para una campaña. Esa capacidad es una extensión operativa: **un … |
| TEC-04 | 3940 | Revisión manual; conservar hasta verificar norma | Además de los **29 perfiles canónicos** de la tabla anterior, el catálogo oficial de Foundry contiene **171 va… |
| TEC-05 | 3967 | Conservar restricciones de canon; reformular historial | **Estado de expansión no canónica.** Permanecen fuera del Compendio **44 propuestas**: 7 Armas Ligeras arrojad… |
| TEC-06 | 4010 | Revisión manual; conservar hasta verificar norma | Los cinco perfiles anteriores son las únicas anclas mecánicas de armadura del catálogo actual. El Compendio añ… |
| TEC-07 | 4044 | Revisión manual; conservar hasta verificar norma | Los tres perfiles anteriores siguen siendo las únicas anclas mecánicas de escudo. El Compendio añade **51 vari… |
| TEC-08 | 4121 | Revisión manual; conservar hasta verificar norma | Los **25 objetos** ya enumerados en las tablas de Equipo, Kits y Suministros de este capítulo son Items canóni… |
| TEC-09 | 4137 | Conservar restricciones de canon; reformular historial | Las propuestas mundanas anteriores no tienen precio oficial todavía. Las especiales tampoco reciben Energía, C… |
| TEC-10 | 4957 | Revisión manual; conservar hasta verificar norma | - El requisito de Medicina de **Reconstrucción** permanece canónico sin rango mínimo cuantificado; Foundry no … |
| TEC-11 | 10846 | Separar tras cotejar efecto sobre economía | El siguiente bloque es **CRAFT-13 — Implementación Foundry VTT del sistema de fabricación**.… |
| TEC-12 | 10862 | Revisión manual; conservar hasta verificar norma | El cobre es la unidad mínima ordinaria. Oro, plata y cobre son tres formas de presentar un único valor; no son… |
| TEC-13 | 10949 | Separar tras cotejar efecto sobre economía | ### Adaptación de equipo — REV-CREA-08-001… |
| TEC-14 | 10957 | Separar tras cotejar efecto sobre economía | **crowns** es un campo legado obsoleto, no una cuarta moneda canónica. No tiene equivalencia automática. Found… |
| TEC-15 | 11208 | Revisión manual; conservar hasta verificar norma | **Resolución de ejemplo:** si la posición y el equipo de la escena permiten ese ataque marcial, tira 2d10 + 5 … |
| TEC-16 | 11226 | Revisión manual; conservar hasta verificar norma | **Alcance del cierre:** hay once **ejemplos de encuentro**, uno por perfil de referencia, pero **no once ficha… |

## Consideraciones y límites
- Una frase puede contener referencias a Foundry y al mismo tiempo una **prohibición normativa importante**. El filtro técnico por palabras clave no se usará para borrar esos párrafos.
- Las notas de catálogo ampliado incluyen cifras y estado de aprobación de 171 variantes de armas, 89 armaduras y 51 escudos. Aunque sean implementaciones en Compendio, su contenido editorial debe conservarse en una forma apta para lectores.
- Las advertencias sobre `crowns` y comercio de objetos no clasificados requieren distinguir la regla de moneda del estado de migración técnica.
- Las referencias históricas a revisión CRAFT pueden señalar un límite mecánico válido y se revisarán con su texto completo.
- No se ha generado una edición totalmente depurada ni una nueva maqueta física en este bloque de trabajo.

## Próximos controles
- [x] Remisiones nuevas válidas: 9/9.
- [x] Anclas únicas conservadas: 52/52.
- [x] Transformaciones reproducidas en generador.
- [ ] Revisar las 16 líneas restantes con contexto y hacer cambios individuales justificados.
- [ ] Revisar referencias de capítulos no numeradas, ambigüedades e índice de páginas cuando haya paginación.
- [ ] Reejecutar generador con Node y comparar exactamente su salida con GitHub.
- [ ] Producir siguiente maqueta paginada con contenido consolidado.

**No equivale a autorización de imprenta.**
