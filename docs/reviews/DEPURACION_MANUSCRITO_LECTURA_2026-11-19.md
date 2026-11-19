# Depuración controlada del manuscrito de lectura — 2026-11-19

**Estado:** SEGUNDA ITERACIÓN DE LECTURA GENERADA Y RECUPERADA DE GITHUB; no lista para imprenta.
**Fuente normativa inalterada:** `docs/Tierra_Magica_Manual_Maestro.md`.
**Derivado:** `docs/edicion_impresa/Manual_Basico_Manuscrito_Lectura.md`.
**Generador reproducible actualizado:** `tools/build-print-manuscript.mjs`.

## Operaciones aplicadas
1. Se incorporaron **52 anclas inequívocas** `tm-r01…tm-r38` y `tm-m01…tm-m14`, ubicadas inmediatamente antes de cada encabezado de capítulo. Estas anclas **no renumeran** los títulos ni alteran su texto. El bloque de panteón, movido detrás del canon del mundo, vuelve a la serie de códigos `R25–R38`; se comprobó específicamente la transición entre mundos y panteón.
2. Se excluyeron del **derivado de lectura, no del Manual Maestro** dos bloques íntegramente identificados como informes de implementación:
   - `### Auditoría de disponibilidad en Foundry (pendiente de conciliación)`, desde ese encabezado hasta antes de `### Catálogo monetario de equipo`. **3.898 caracteres**; incluye equivalencias técnicas, estado de código y pruebas de comercio.
   - `### Conciliación documental con el compendio Foundry VTT`, hasta antes de `## 24. Dirección de juego`. **2.818 caracteres**; incluye referencias a scripts, pruebas y compendio de Actores.
3. Las tablas de precios del §19, los perfiles y encuentros de §23, el capítulo §24 de dirección, las doce ascendencias y CRAFT-12 siguen presentes.
4. La exclusión es **de presentación**: los dos bloques técnicos siguen en el Manual Maestro para implementación y auditoría. Sus restricciones de diseño todavía deben revisarse para confirmar que ninguna aclaración normativa útil necesite un resumen para lectores del libro básico.

## Controles ejecutados sobre el archivo guardado
- [x] El derivado existe y se volvió a recuperar desde la rama.
- [x] **52 anclas, 52 IDs distintos**; prefijos R/M correctos después del reordenamiento.
- [x] **12 encabezados de ascendencias** presentes.
- [x] Bloques técnicos excluidos ausentes.
- [x] §19 Catálogo monetario, §23 perfiles, §24 Dirección y CRAFT-12 presentes.
- [x] Manuscrito actual: **836.917 caracteres**.
- [ ] Comparar salida del generador bajo Node con archivo guardado; la nueva versión se reconstruyó a partir del derivado en el conector de GitHub, aplicando exactamente las reglas incorporadas al script.
- [ ] Revisar otras notas técnicas incrustadas párrafo a párrafo; no se ha eliminado el contenido técnico del resto del manual.
- [ ] Confirmar enlace de cada remisión de capítulo a su ancla y corregir citas ambiguas en prosa sin cambiar los números originales.
- [ ] Repetir inspección de las páginas piloto con las anclas y la estructura final.

## Incidencia resuelta del generador
Un primer control detectó sólo **38 anclas**: al reubicar el panteón después de la Parte II, el generador mantenía el prefijo `M` y saltaba los capítulos 25–38. La ejecución se detuvo antes de guardar un derivado incorrecto. Se corrigió el retorno explícito a `R` en `## 25. Cosmología: los Principios Primordiales`; la siguiente construcción produjo **52 anclas únicas**.

**Conclusión:** primera separación técnica no destructiva aplicada; el manuscrito todavía requiere corrección editorial y maquetación completa.
