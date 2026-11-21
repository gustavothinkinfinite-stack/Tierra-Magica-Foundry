# DIV-ED-04 — Control estructural de SVG de Luminarias (2026-11-21)

## Autoridad y alcance
Fuente única: `docs/Tierra_Magica_Manual_Maestro.md`, blob Git `b315dbf5725c203246079048de52542ad23c6e3a`, releído en `main`. Anexo subordinado: `docs/visual/SIMBOLOS_CANONICOS.md`, blob `a0e640754c153e737473f143c0df152b0d75a6f2`. Antecedente DIV-ED-03 integrado mediante PR #121, commit `bb0f2c9c10cc7d520441c6c2a8b53f1f719cedd8`.

## Inspección directa de cinco maestros SVG en main

| Divinidad | Blob Git | Caracteres de texto SVG | viewBox | Título con ID | Indicadores simples de script |
|---|---|---:|---|---|---|
| Aurea | `c2bbe7b61ab5a8985be386981944da9ec0f4a991` | 1134 | 0 0 1000 1000 | Sí | No |
| Nemor | `e6e15903cceeaa333a08bc10102dd5db18fa80dc` | 594 | 0 0 1000 1000 | Sí | No |
| Oria | `f5982fb4634f9d1c986200fc80585285598b976a` | 661 | 0 0 1000 1000 | Sí | No |
| Vael | `7f1df1b9f89c191a82ce32e4745a52486b1c94c4` | 426 | 0 0 1000 1000 | Sí | No |
| Selene | `d2d862276dd020d8d420ce11a4cc34540c0c5e22` | 615 | 0 0 1000 1000 | Sí | No |

Se comprobó en cada archivo la presencia literal del `viewBox="0 0 1000 1000"`, título identificable y ausencia de coincidencias textuales con `<script`, `onload=` o `foreignObject` (búsqueda insensible a mayúsculas). **Esto es un control estático superficial, no una auditoría de seguridad SVG ni validación XML.** La longitud indicada es de caracteres de contenido textual recibido, no tamaño de archivo en bytes.

## Resultado y límites
Los cinco maestros satisfacen el lienzo básico exigido por el anexo técnico. No se recalcularon SHA-256; los SHA mostrados son identificadores de blob Git, no hashes SHA-256. Tampoco se ejecutaron parser XML, rasterización, comparación geométrica contra fichas, revisión de licencias, inspección visual, pruebas de legibilidad, exportación PDF ni impresión. Por tanto **no están certificados para imprenta**.

## Próximos trabajos
1. Obtener bytes completos y recalcular SHA-256, cotejando contra huellas oficiales si están registradas.
2. Validar XML y geometría de cada SVG frente a ficha CANON; comprobar variantes monocromas y cromáticas.
3. Revisar derechos de reproducción y prueba de reducción en tamaño final de página.
4. Inventariar cartografía y arte autorizado; preparar prueba de maquetación y PDF de lectura e imprenta sin introducir canon.

## Archivos y trazabilidad
Este expediente es el único archivo nuevo de este bloque; no modifica reglas, manual ni activos gráficos. Se leyó `main`, registro técnico y los cinco SVG mediante GitHub. El SHA del commit y la integración se obtienen del PR asociado.
