# EXT-02/06/07/12 — Recuento de texto imprimible (19-11-2026)

**Alcance:** control documental de cuatro fuentes finales propuestas en la rama aislada. Referencia canónica consultada: `main:docs/Tierra_Magica_Manual_Maestro.md`; esta medición no modifica mecánicas ni ratifica propuestas.

## Método reproducible
Contar tokens separados por espacios (equivalente a `trim().split(/\s+/)`) en el texto de la doble página. Se incluyen título, subtítulos y listas imprimibles. Se excluye la línea de metadatos editoriales que sigue al título y, cuando exista, el bloque explícito «NO IMPRIMIR», «Nota de producción — no imprimir» o «Reserva editorial no canónica». No se descuenta texto jugable ni ejemplos; no se aplica una estimación visual de páginas.

| Expediente | Archivo íntegro | Imprimible con encabezados | Diferencia excluida | Dictamen |
|---|---:|---:|---:|---|
| 02 Enanos | 851 | **839** | 12 metadatos | Cumple |
| 06 Terios | 857 | **772** | 85 metadatos y nota | Cumple |
| 07 Feéricos | 877 | **824** | 53 metadatos y nota | Cumple |
| 12 Coralios | 893 | **819** | 74 metadatos y reserva | Cumple |

**Resultado:** las cuatro incidencias de exceso por conteo de archivo completo se cierran **sólo como falsos positivos de extensión**. Ninguna requiere recortar reglas, negaciones, costes o ejemplos. Las doce fuentes tenían ya recuentos completos de archivo en el control anterior; este acta verifica únicamente estas cuatro excepciones.

## Límites y regresiones
- La delimitación en Coralios depende del encabezado `**Reserva editorial no canónica:**`; debe mantenerse inequívocamente fuera de la página de imprenta. Para las otras dos notas se utiliza el separador `---` previo.
- Se conservaron intactos los archivos raciales; por tanto no se introdujeron regresiones textuales por esta auditoría. No se ha verificado aún equivalencia semántica completa con el capítulo consolidado.
- **0** pruebas Foundry, **0** pruebas de mesa, **0** pruebas reales de maquetación. Cumplir el rango de palabras no garantiza que el contenido quepa físicamente en dos páginas.
- No modificar canon ni asumir aprobadas las alternativas B5.

**Próxima unidad:** cotejo exhaustivo de las doce fuentes contra el consolidado, con énfasis en listas, costes, negaciones y excepciones; registrar divergencias exactas y corregirlas sólo en la rama de propuestas.