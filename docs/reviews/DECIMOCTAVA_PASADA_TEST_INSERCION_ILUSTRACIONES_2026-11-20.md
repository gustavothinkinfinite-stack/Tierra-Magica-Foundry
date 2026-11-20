# Decimoctava pasada — pruebas de inserción ilustrada y dirección de arte

**Fecha:** 20-11-2026. **Rama:** `review/auditoria-editorial-integral-2026-11-19`.
**Estado:** pruebas reales aprobadas, sin ilustraciones artísticas generadas ni incorporadas. **No aprobado para imprenta**.

## Trabajo aplicado

- Se revisaron los doce briefs originales de `propuestas/razas/01_humanos` a `12_coralios`, verificando la existencia de los documentos `brief_arte.md` en la rama editorial.
- Se creó `docs/edicion_impresa/Direccion_Arte_12_Ascendencias_y_Prueba_Pagina.md`, matriz de escenas principales y restricciones específicas que respeta el carácter de **propuesta no canónica** y la prohibición expresa de generar imágenes todavía.
- Se añadió `tools/test-print-art-integration.py`, una prueba técnica que modifica temporalmente en el ejecutor un manifiesto de ilustraciones, crea un PNG **de prueba**, verifica aceptación/rechazo y restaura el manifiesto y el HTML de origen.
- Se amplió `.github/workflows/manual-editorial-preview.yml` para ejecutar el test antes de renderizar el PDF editorial.

## Verificación real

**Ejecución GitHub Actions:** https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44771492284

**Estado:** `completed / success`. El paso `Verificar incorporación de ilustración técnica y rechazo de arte no válido` finalizó `success`, y el registro confirmó:

| Comprobación de arte | Resultado |
|---|---|
| Rechazar arte declarado aprobado sin archivo PNG | Pasa |
| Rechazar PNG de 400 × 300 por resolución insuficiente | Pasa |
| Rechazar arte declarado aprobado sin licencia | Pasa |
| Aceptar PNG de prueba 1600 × 1000 con autoría, licencia, créditos y descripción alternativa | Pasa |
| Restaurar manifiesto original tras la prueba | Pasa |
| Restaurar HTML original idéntico byte a byte | Pasa |
| Arte final aprobado en versión real | **0/12** |
| Ilustraciones pendientes | **12/12** |

El PNG de prueba fue generado por Pillow, exclusivamente como patrón técnico de aceptación del pipeline. **No es una propuesta gráfica de Tierra Mágica y no se versionó.**

El renderizado editorial posterior al test conservó:
- 469 páginas, 52 capítulos y 118 tablas de origen.
- 52 destinos de capítulos correctos en el índice, sin folios discrepantes.
- 0 páginas sin texto o con NUL/U+FFFD detectados por Poppler.
- 0 páginas cortas sin cambio claro de sección y 25 antes de aperturas de capítulo.

## Riesgos y límites

**Primera página ilustrada real:** sigue pendiente por falta de un PNG autorizado. La prueba técnica demuestra que el canal de inserción funciona cuando se aporta un archivo válido, pero **no demuestra que la ilustración de Humanos respete la anatomía, estilo, canon o dimensiones de composición**.

**Autorización:** los doce briefs indican estado de propuesta y varios prohíben expresamente generar imágenes en esa etapa. El manifiesto deja todas las piezas en `pendiente`; ninguna debe marcarse `aprobado` sin revisión visual y permisos de reproducción.

**Imprenta:** una vez ingresado arte real, deben recalcularse paginación, índices, legibilidad, retícula y especificaciones de imprenta. El PDF de 469 páginas continúa siendo una prueba.

**Protección:** `main` y el Manual Maestro no se modificaron.
