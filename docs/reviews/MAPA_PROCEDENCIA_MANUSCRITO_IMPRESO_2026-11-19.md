# Tierra Mágica — Mapa de procedencia del manuscrito impreso
**Fecha:** 2026-11-19 · **Estado:** ARCHITECTURA EDITORIAL APROBADA PARA PROTOTIPO, NO PARA IMPRENTA.
**Fuente única:** `docs/Tierra_Magica_Manual_Maestro.md` de la rama de revisión.
**Generador:** `tools/build-print-manuscript.mjs`.
**Salida reproducible:** `docs/edicion_impresa/Manual_Basico_Manuscrito_Lectura.md` al ejecutar `node tools/build-print-manuscript.mjs` en una copia local del repositorio.

## Principio de conservación
No se modifica el Maestro para obtener la edición de lectura. El generador toma texto de bloques vigentes, los **reordena** sin editar su contenido y escribe un derivado. La arquitectura se aprueba como **prototipo editorial**; los bloques deben pasar después corrección ortotipográfica, índices, paginación y revisión de redundancias. No sustituye aún la maqueta definitiva.

## Recorrido actual del derivado

| Bloque de lectura | Origen del Maestro | Tratamiento |
|---|---|---|
| Reglas fundamentales y creación | Parte I, §§1–3 | Incluido íntegro |
| Las doce ascendencias | Anexo canónico de 18-11-2026 | **Reubicado inmediatamente después de §3** para acompañar la creación |
| Desarrollo, Rasgos, combate, magia, artes y equipo | Parte I, §§4–24 | Incluido íntegro |
| Canon geográfico, histórico, social y político | Parte II, §§1–14 | Incluido íntegro, **antes del Panteón** |
| Cosmología y Panteón Central | Parte I, §§25–38 | Incluido íntegro, **después del canon geográfico** |

Se mantienen los títulos y la numeración originales (la **Parte II** tiene §§1–14, distinta de Parte I §§1–38). La renumeración e índices finales **no están aprobados todavía**; deben generarse cuando se estabilice el orden de lectura y el contenido.

## Material que queda fuera del derivado inicial por ser gestión interna
- Prólogo operativo del archivo fuente: «Cómo usar este documento», fuente única, recuperación histórica y «Estructura objetivo del libro».
- «APÉNDICE — PROCEDENCIA DEL ARCHIVO NARRATIVO HISTÓRICO».
- «ESTADO DE CONSOLIDACIÓN Y PRÓXIMO TRABAJO», revisiones del flujo CREA, especificaciones del modelo de datos de Foundry y seguimiento técnico situado después del canon mundial y antes del anexo de ascendencias.

**Advertencia de auditoría:** existen también notas de implementación, pruebas y seguimiento dentro de los capítulos, especialmente en §18 CRAFT-12 y §§19/23. Se **conservan temporalmente** en el derivado para evitar eliminar por error una corrección normativa. Hay que separarlas mediante una segunda pasada por párrafo, no por borrado masivo.

## Comprobaciones estructurales realizadas con texto recuperado del repositorio
- [x] Siete marcadores de inicio/separación localizados en forma única (Parte I, §3, §4, §25, Parte II, apéndice histórico y anexo de ascendencias).
- [x] 24 capítulos numerados de reglas (§§1–24) presentes.
- [x] 14 capítulos narrativos de Parte II (§§1–14) presentes.
- [x] 14 capítulos de cosmología y panteón (§§25–38) presentes.
- [x] Doce encabezados de ascendencias identificados.
- [x] La zona extensa de CRAFT permanece incluida sin truncamiento.
- [ ] Ejecutar `node tools/build-print-manuscript.mjs` y controlar la salida real en Node.js (hasta aquí se inspeccionó la estructura in situ y se probó la lógica de segmentación sobre el texto recuperado).
- [ ] Detectar duplicaciones y referencias cruzadas inválidas tras el movimiento.
- [ ] Completar selección de 60 hechizos, catálogos, PNJ y cartografía para el volumen único.
- [ ] Convertir a manuscrito legible tipográficamente sin los reportes internos incrustados.
- [ ] Revisar el resultado antes de llevarlo a maquetación Carta.

## Riesgos detectados
1. **Duplicación racial:** §3 incluye los paquetes mecánicos y el anexo incluye dobles páginas con su resumen. La edición puede situarlos juntos, pero deberá evitar repetición o dos versiones divergentes; **la autoridad mecánica permanece en §3/B5**.
2. **CRAFT-12:** contiene auditoría y correcciones con efectos vigentes. No se debe excluir por completo sin comprobar la integración normativa de cada ajuste.
3. **Mundo y panteón:** reordenar la cosmología detrás del mundo ayuda a lectura, pero sus referencias temáticas deberán mantenerse inteligibles.
4. **Numeración repetida:** Parte I y Parte II comparten §§1–14; para la edición impresa se necesitarán identificadores estructurales únicos y marcadores de capítulo distintos.
5. **Extensión física:** el material vigente resulta muy extenso; no es serio prometer una paginación o lomo hasta medirlo después de la composición y del papel elegido.

## Próxima secuencia
1. Ejecutar el ensamblador e inspeccionar el Markdown emitido.
2. Generar inventario de referencias cruzadas por sección, detectar referencias a encabezados no únicos y remediar.
3. Probar una maqueta editorial de 8–12 páginas Carta con estilos de texto, tabla y doble página racial.
4. Determinar los bloques de CRAFT de consulta en volumen básico frente a apéndices, **sin pérdida de reglas**.
5. Aplicar corrección final, paginar, diseñar cubierta y producir archivos de imprenta según el proveedor.

**Límite:** el mapa documenta un método reproducible; no afirma que se haya producido ni inspeccionado un PDF maquetado o ejemplar físico.
