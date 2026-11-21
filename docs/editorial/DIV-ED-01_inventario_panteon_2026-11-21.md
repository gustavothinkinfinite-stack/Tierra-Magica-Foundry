# DIV-ED-01 — Inventario de identidad visual del Panteón Central (2026-11-21)

## Fuente, alcance y límites

Fuente canónica única: `docs/Tierra_Magica_Manual_Maestro.md`, rama `main`, blob leído `b315dbf5725c203246079048de52542ad23c6e3a` (14.164 líneas). Auditoría editorial documental; no es una aprobación de ilustraciones, archivos maestros, licencias ni una prueba de impresión.

## Inventario canónico verificable

El apartado **38. Relaciones del Panteón y límites de canon** distingue **siete Primordiales** (Eïra, Khorun, Varkor, Aster, Ilyr, Nereth, Vaelun) y **cinco Luminarias** (Aurea, Nemor, Oria, Vael, Selene). Son doce divinidades distintas; las Luminarias no son aspectos de los Primordiales.

El apartado **Estado de símbolos religiosos de las Cinco Luminarias** declara cinco símbolos doctrinales CANON v1.0:

| Divinidad | Nombre canónico del símbolo | ID |
|---|---|---|
| Aurea | La Llama Custodiada | `SYM-DIV-AUREA-001` |
| Nemor | El Umbral de Piedra | `SYM-DIV-NEMOR-001` |
| Oria | La Medida Acordada | `SYM-DIV-ORIA-001` |
| Vael | El Rumbo Desviado | `SYM-DIV-VAEL-001` |
| Selene | El Velo Entreabierto | `SYM-DIV-SELENE-001` |

**Importante:** la aprobación doctrinal de un símbolo no demuestra por sí sola que exista un archivo gráfico maestro apto para imprenta, ni licencia de reproducción, ni versión vectorial. El manual remite para geometría, color, variantes, pruebas y activos maestros al registro técnico `docs/visual/SIMBOLOS_CANONICOS.md`; este expediente no lo eleva a autoridad normativa independiente.

## Siete Primordiales: control de lagunas

| Divinidad | Situación editorial |
|---|---|
| Eïra | El manual describe un símbolo tradicional (semilla abierta con tres raíces entrelazadas); **no equivale a constancia de ficha gráfica completa ni archivo autorizado** |
| Khorun | Ficha visual final y archivo de impresión **no comprobados en esta auditoría** |
| Varkor | Ficha visual final y archivo de impresión **no comprobados en esta auditoría** |
| Aster | Ficha visual final y archivo de impresión **no comprobados en esta auditoría** |
| Ilyr | Ficha visual final y archivo de impresión **no comprobados en esta auditoría** |
| Nereth | Ficha visual final y archivo de impresión **no comprobados en esta auditoría** |
| Vaelun | Ficha visual final y archivo de impresión **no comprobados en esta auditoría** |

No afirmar que los siete carecen de símbolos: el propio manual advierte expresamente que no debe suponerse que tengan símbolos religiosos completos. La ausencia de comprobación **no es prueba de inexistencia**.

## Criterios para maquetación

1. No generar ni dibujar como definitivos símbolos faltantes a partir de descripciones narrativas.
2. Separar en el inventario de producción **símbolo doctrinal aprobado**, **arte maestro localizado**, **derechos/autorización comprobados**, **resolución/vector**, **prueba visual** y **apto para imprenta**.
3. Si falta un activo autorizado, reservar espacio editorial sin atribuir una imagen inventada al canon.
4. Verificar correspondencia exacta de nombre e ID antes de colocar cada símbolo; mantener idénticos los doce nombres de las divinidades en títulos, pies e índice.

## Verificaciones efectuadas

- Lectura actual del Manual Maestro de `main` y su SHA de blob.
- Cotejo textual de la lista de doce divinidades y de la tabla de cinco símbolos doctrinales.
- Búsqueda textual de referencias a símbolos en las siete divinidades primordiales; Eïra tiene descripción narrativa explícita.
- **No realizadas:** inspección de los archivos gráficos, verificación de licencias, validación de geometría o color, pruebas de PDF, pruebas de Foundry.

## Próximos pendientes

1. Revisar el registro técnico y los activos reales para las cinco Luminarias; localizar los siete Primordiales sin inferir aprobación.
2. Auditar referencias cruzadas de capítulos y tabla de economía.
3. Inventariar mapas aprobados, fuentes y formatos de impresión; sólo entonces comenzar la maquetación de lectura e imprenta.
4. Registrar SHA de commit y estado de integración en la descripción del PR; no sustituir este expediente por afirmaciones de exportación no ejecutada.
