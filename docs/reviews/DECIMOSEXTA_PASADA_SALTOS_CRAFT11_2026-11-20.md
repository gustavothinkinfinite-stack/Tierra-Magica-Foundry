# Decimosexta pasada — saltos de CRAFT-11 y regresión de título de Parte

**Fecha:** 20-11-2026. **Rama:** `review/auditoria-editorial-integral-2026-11-19`.

## Diagnóstico cotejado con el manuscrito

El PDF anterior tenía tres páginas cortas sin cambio claro: 321, 325 y 337. Se localizaron en `docs/edicion_impresa/Manual_Basico_Manuscrito_Lectura.md` los encabezados de continuación **«A. Equipo compuesto»**, **«B. Fórmulas alquímicas listas para preparar»** y **«G. Investigación e ingeniería inversa»**. En la fuente son apartados de nivel 2, pero no capítulos anclados `tm-rXX` ni `tm-mXX`.

El generador aplicaba `break-before:page` a **todo** `h2`. Se corrigió para aplicar el salto solamente a `h2[id^=tm-]`, los 52 títulos principales anclados.

**Primera corrección:** commit `0273d803dc86c6fee8ccea52af153fc0c2f2c309`.

## Regresión visual y segunda corrección

La primera ejecución (GitHub Actions `44767812897`) finalizó correctamente y redujo a cero los casos cortos internos, pero la inspección de su hoja de contacto mostró una regresión: el encabezado **«PARTE I»** quedó de nuevo solo en una página. El selector de salto para los títulos anclados anulaba la excepción para el primer capítulo después de un título de Parte.

Se corrigió la especificidad CSS mediante `.book h1 + h2[id^=tm-]{break-before:auto}`.

**Segunda corrección:** commit `cda9bb38d7d8fea8afb43bad5088715a2c059190`.

## Verificación integral final

GitHub Actions: https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44768190762

**Resultado:** `completed / success`, con renderizado y verificaciones de texto, índice, geometría, estructura y continuidad.

| Control | Resultado |
|---|---:|
| Páginas PDF nuevas | **469** |
| Páginas cortas totales | **25** |
| Cortas antes de un capítulo/parte | **25** |
| **Cortas sin cambio claro de capítulo** | **0** |
| Última página corta | **0** |
| Capítulos con destino en índice | **52 de 52** |
| Folios discrepantes con destinos | **0** |
| Páginas vacías según Poppler | **0** |
| NUL y reemplazos U+FFFD según Poppler | **0** |
| Cobertura textual Poppler / PyMuPDF por debajo de 85 % | **0 páginas** |
| Tablas del manuscrito de origen | **118** |
| Tablas anchas de 7+ columnas | **10** |

Se inspeccionó la hoja de contacto **posterior** y se constató que el título de Parte I vuelve a compartir página con el primer capítulo. El resto de las verificaciones de continuidad se basan en heurísticas programáticas; no sustituyen una revisión visual de las 469 páginas.

## Estado y siguiente fase

La eliminación de los tres saltos innecesarios se confirmó en ejecución real. No se alteraron reglas, estadísticas, canon narrativo ni el Manual Maestro.

Siguiente fase: auditoría visual de las 25 páginas cortas previas a cambios de capítulo/Parte, determinación de criterios de imposición editorial e incorporación de las ilustraciones pendientes de las 12 ascendencias. Posteriormente deberán regenerarse la paginación y el índice de folios.

**No aprobado para imprenta.** `main` y `docs/Tierra_Magica_Manual_Maestro.md` intactos.
