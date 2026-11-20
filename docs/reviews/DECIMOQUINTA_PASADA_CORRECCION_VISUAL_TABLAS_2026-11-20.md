# Decimoquinta pasada — corrección visual de tablas anchas y saltos editoriales

**Fecha:** 20-11-2026. **Rama:** `review/auditoria-editorial-integral-2026-11-19`. **Estado:** corregido, compilado y probado en GitHub Actions; pendiente revisión integral para imprenta.

## Problema observado directamente

Al inspeccionar la hoja de contacto de la ejecución `44765157883`, se verificaron defectos de composición reproducibles:

- Página 33: el perfil de Guardián tenía valores fragmentados casi letra por letra.
- Páginas 258–263: perfiles de armazones con campos absurdamente angostos y páginas de contenido mínimo entre fichas.
- Páginas 309–313: perfiles de acumuladores con columnas verticales y saltos adicionales.
- Página 497: un encabezado de glosario aislado en una página, seguido del glosario en la siguiente.

No se trataba de un problema de reglas; era el uso de una cuadrícula CSS de cuatro columnas para presentar datos originalmente procedentes de tablas de 7 a 12 columnas.

## Corrección aplicada

Se modificó únicamente `tools/build-print-html.mjs`:

1. Para las tablas con **7 o más columnas**, sustituir la cuadrícula de cuatro columnas por una **ficha de atributos con un campo completo por párrafo**: encabezado + valor de cada columna original. Se mantienen los nombres, el orden y los datos del Markdown.
2. Eliminar las dependencias visuales de `grid-template-columns:repeat(4,minmax(0,1fr))` y el ajuste que permitía dividir palabras en tiras de un carácter.
3. Conservar fichas indivisibles, pero con una presentación de ancho normal.
4. Permitir que el segundo título principal del glosario siga al primero sin forzar una página adicional.
5. Se mantiene el ajuste previo para que el primer capítulo siga al título de su Parte.

**Commit del arreglo principal:** `02c3b70e91441c87725f5932eb461754c8cab2c7`.

## Auditoría real posterior

Ejecución: https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44765771971  
**Resultado:** `completed / success`, con generación PDF y todas las comprobaciones editoriales configuradas aprobadas.

| Control | Antes (PDF defectuoso) | Después |
|---|---:|---:|
| Extensión del PDF | 500 páginas | **472 páginas** |
| Páginas cortas detectadas | 45 | **28** |
| Páginas cortas sin separación clara | 19 | **3** |
| Páginas cortas antes de capítulo/parte | 25 | 25 |
| Última página corta | 1 | 0 |
| Tablas de origen | 118 | **118** |
| Tablas con 7 o más columnas | 10 | **10** |
| Encabezados huérfanos detectados | 0 | **0** |
| Texto menor de 7 pt detectado | 0 | **0** |
| Contenido fuera de margen conservador | 0 | **0** |
| Enlaces de capítulo válidos en índice | 52/52 | **52/52** |
| Folios del índice discrepantes | 0 | **0** |
| Páginas Poppler sin texto | 0 | **0** |
| Caracteres NUL o U+FFFD en Poppler | 0 | **0** |
| Páginas con concordancia Poppler–PyMuPDF bajo 85 % | 0 | **0** |

La mejora elimina **17 páginas cortas** y reduce el PDF en **28 páginas** mediante maquetación, sin editar el Manual Maestro ni el manuscrito normativo.

## Inspección visual posterior

Se volvieron a visualizar las hojas `contacto_general.jpg` y `contacto_cortas.jpg` generadas en la ejecución nueva. Los perfiles de Explorador, Guardián y Magistral se leen como atributos en líneas completas; los tramos antes ilegibles de armazones y acumuladores muestran párrafos normales. El glosario deja de mostrar una página separada solo con su primer título en las muestras seleccionadas.

**Alcance real:** es una inspección de los ejemplos identificados y muestras distribuidas, no de las 472 páginas una por una ni de la fidelidad de cada celda por comparación visual. El control del índice y los extractores de texto siguen siendo automáticos.

## Tres candidatos restantes

La auditoría marcó tres páginas cortas sin cambio claro de sección:

| Página | Texto final | Página siguiente |
|---:|---|---|
| 321 | «servicios y proyectos que atraviesan varios CRAFT.» | 322, «A. Equipo compuesto» |
| 325 | «ingredientes ni cualquier requisito esencial.» | 326, «B. Fórmulas alquímicas listas para» |
| 337 | «no crea Energía sin una fuente real.» | 338, «G. Investigación e ingeniería inversa» |

Estos tres casos son **candidatos de revisión**, no errores confirmados; tienen aspecto de cortes frente a subsecciones del catálogo CRAFT-11, que deberán cotejarse con la estructura del capítulo 18 antes de modificar saltos.

## Próxima fase

Revisar las tres páginas concretas y los cortes de las fichas más extensas; después producir arte definitivo para las ascendencias y realizar el preflight de imprenta. Cada incorporación de imágenes invalidará la paginación actual y exigirá reconstruir los índices.

**Protección:** `main` y `docs/Tierra_Magica_Manual_Maestro.md` permanecen sin cambios. **NO APROBADO PARA IMPRENTA.**
