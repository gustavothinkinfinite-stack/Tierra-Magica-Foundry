# Novena pasada — composición integral HTML y validación en GitHub Actions

**Fecha:** 20-11-2026.  
**Rama:** `review/auditoria-editorial-integral-2026-11-19`  
**Estado:** generación automatizada real **conforme**; revisión visual del resultado paginado y PDF de imprenta pendientes.

## Implementación

- Nuevo generador: `tools/build-print-html.mjs`, sin dependencias externas.
- Entrada: `docs/edicion_impresa/Manual_Basico_Manuscrito_Lectura.md`.
- Salida temporal de la ejecución: `docs/edicion_impresa/Manual_Basico_Prueba_Integral.html`.
- Incluye cubierta de prueba, índice navegable de 52 capítulos, estilos Carta, jerarquía tipográfica, tablas, listas, referencias internas y reservas de arte para las 12 ascendencias.
- El archivo HTML generado se publica como artefacto de GitHub Actions; **no se añade el HTML de salida al repositorio**.

## Ejecución independiente real

Workflow: `.github/workflows/manual-editorial-preview.yml`  
Ejecución: https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44753735342  
Commit: `ae3d86f28e601cb0b773c7433612667999c00271`  
**Estado GitHub Actions: completed / success.**

Se confirmó en los pasos del job:

| Paso | Estado |
|---|---|
| Preparar Node 22 | success |
| Verificar reproducibilidad del manuscrito byte a byte | success |
| Generar HTML integral | success |
| Comprobar que la salida existe e incluye los marcadores esenciales | success |
| Publicar artefacto HTML | success |

**Artefacto:** `Tierra-Magica-Manual-Basico-Prueba-HTML` (282.033 bytes de archivo comprimido, disponible en la ejecución de Actions; no expirado al verificar).

## Limitaciones de la validación

1. Los controles ejecutados confirman creación del HTML y reproducibilidad del Markdown; **no comprueban calidad visual** de cada tabla o la integridad semántica de toda la conversión Markdown a HTML.
2. El formato de impresión está configurado en Carta mediante CSS, pero **no se generó ni inspeccionó un PDF real de todas las páginas**.
3. Los espacios de ilustración siguen siendo provisionales.
4. Falta fijar folios, revisar retícula y obtener el PDF final con especificaciones de imprenta (sangrado, ICC, PDF/X según proveedor).

**Protección del canon:** no se modificaron `main` ni el `docs/Tierra_Magica_Manual_Maestro.md` normativo.
