# Séptima pasada — limpieza de dos menciones históricas de CRAFT-13

**Fecha:** 20-11-2026. **Rama:** `review/auditoria-editorial-integral-2026-11-19`.  
**Estado:** dos cambios textuales localizados en manuscrito derivado y generador; inspección de estructura realizada. **La prueba Node del generador sigue pendiente.**

## Cambios aplicados

Se identificaron en `docs/Tierra_Magica_Manual_Maestro.md` dos frases editoriales sobre CRAFT-13 en los párrafos de **armaduras** y **escudos** del capítulo 9. La fuente normativa permanece intacta.

| Ubicación | Texto histórico reemplazado | Redacción de lectura |
|---|---|---|
| §9 Armaduras | `CRAFT-13 ya cerró esas autoridades, pero los nombres no conceden propiedades por inferencia.` | `Sin un Perfil aprobado y explícito, estos nombres no conceden propiedades adicionales por inferencia.` |
| §9 Escudos | `CRAFT-13 ya cerró esas autoridades, pero los nombres no conceden Defensa, cobertura ni Energía por inferencia.` | `Sin un Perfil aprobado y explícito, estos nombres no conceden Defensa, cobertura ni Energía por inferencia.` |

Se añadieron ambas sustituciones a `tools/build-print-manuscript.mjs` (lista de redacciones editoriales) y se actualizaron las frases idénticas en `docs/edicion_impresa/Manual_Basico_Manuscrito_Lectura.md`. No se alteraron estadísticas, costes, restricciones, perfiles o reglas de uso. La redacción de las familias de objetos no canónicas que antecede a cada frase permanece igual.

## Verificación posterior desde GitHub

| Control | Resultado |
|---|---:|
| Anclas de capítulos | 52, únicas |
| Enlaces internos a esas anclas | 9, ninguno roto |
| Ascendencias del apartado de paquetes raciales | 12 |
| Definiciones del apéndice (sin dos líneas de metadatos) | 25 |
| Menciones CRAFT-13 restantes en manuscrito de lectura | 0 |
| Frases nuevas en manuscrito derivado | 2 |
| Frases nuevas en reglas de sustitución del generador | 2 |
| Longitud del manuscrito derivado | 838848 caracteres |

**Verificador automático:** se corrigió `tools/verify-print-manuscript.mjs` para que el recuento de entradas de glosario no incluya las dos etiquetas `**Estado editorial:**` y `**Procedencia:**`. Antes de corregirlo contaba 27 entradas en el apéndice; el glosario de reglas tiene 25.

## Controles no cerrados

- El generador **no ha sido ejecutado en Node** en esta sesión; no se certifica igualdad byte a byte hasta ejecutar `node tools/verify-print-manuscript.mjs` sobre una copia del repositorio.
- CRAFT-12 continúa con su contenido normativo y de auditoría intacto. Debe cotejarse para separar relatos de validación de límites aplicables en mesa sin pérdida de reglas.
- Falta generar y revisar un PDF paginado integral.

**Protecciones:** la rama `main` y `docs/Tierra_Magica_Manual_Maestro.md` no fueron modificados.
