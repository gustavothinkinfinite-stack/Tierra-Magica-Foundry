# DIV-ED-02 — Cotejo inicial de registro técnico y activos religiosos (2026-11-21)

## Autoridad y versión
- Fuente canónica única reabierta en `main`: `docs/Tierra_Magica_Manual_Maestro.md`, blob Git `b315dbf5725c203246079048de52542ad23c6e3a`.
- Expediente previo consultado: `docs/editorial/DIV-ED-01_inventario_panteon_2026-11-21.md`, blob `b2ccff3d80e4cb627c03a34dbb6108f6710003eb`.
- Registro técnico subordinado consultado: `docs/visual/SIMBOLOS_CANONICOS.md`, blob `a0e640754c153e737473f143c0df152b0d75a6f2`.
- Auditoría limitada a lectura documental y dos comprobaciones de existencia de archivos en GitHub. No es una validación gráfica integral.

## Resultados comprobados
1. El Manual Maestro reconoce cinco símbolos doctrinales de Luminarias CANON v1.0: Aurea, Nemor, Oria, Vael y Selene. No extender esa aprobación a siete Primordiales ni inventar símbolos.
2. El registro técnico contiene la ficha CANON de Aurea con geometría SVG normativa, variantes cromáticas, tamaños mínimos, área de protección y rutas de activos; la ficha de Nemor también contiene geometría normativa, variantes y PNG definitivo.
3. **Existe en `main`** `assets/symbols/divinities/SYM-DIV-AUREA-001_MASTER.svg`; blob Git `c2bbe7b61ab5a8985be386981944da9ec0f4a991`.
4. **Existe en `main`** `assets/symbols/divinities/SYM-DIV-NEMOR-001_PREVIEW.png`; blob Git `a5bf9bd3b600d4e411e0f7cbce676647eaf19654`.
5. La ficha de Aurea registra SHA-256 del SVG maestro `4fe5845533ad8e0fec40ea28b37897aef6eac743285b7450a84d8c226cd3ff89` y la de Nemor registra SHA-256 del PNG `44f82067c4abea3be28af4f6ab5bf789bd89855fe9709d949e6ac95db88fd3f8`. **No se recalcularon esas huellas**. Los SHA Git de los blobs no son SHA-256 del contenido; no compararlos directamente.

## Criterio editorial operativo
La constatación de existencia de dos archivos corrige la incertidumbre de disponibilidad para esos casos concretos, **pero no certifica** integridad SHA-256, identidad geométrica, resolución, transparencia, derechos, adecuación CMYK, sangrado o aptitud para imprenta. No insertar aún estos recursos como arte final certificado.

## Próximos controles ejecutables
1. Enumerar los archivos maestros y variantes de las otras cuatro Luminarias y contrastarlos con las fichas y SHA-256 declarados.
2. Verificar los SHA-256 de los activos existentes y las variantes de reducción, sin reemplazar geometría aprobada.
3. Revisar siete Primordiales en el Manual Maestro; separar descripciones iconográficas de símbolos formalmente canonizados.
4. Auditar permisos de reproducción y preparar pruebas de escala impresa y monocromía.
5. Inventariar mapas, comprobar remisiones reales entre capítulos y continuar la maquetación sólo con materiales autorizados.

## Pruebas y límites
- Ejecutadas: lecturas GitHub de los tres documentos y consultas de existencia de los dos activos mencionados.
- No ejecutadas: validación visual, hash SHA-256 local, comprobación de licencias, exportación PDF, pruebas de imprenta o Foundry.
- Este expediente no cambia canon, reglas ni precios.
