# CART-ED-01 — Autoridad cartográfica y preparación de imprenta (2026-11-21)

## Alcance y fuentes leídas en main
- Fuente canónica única: `docs/Tierra_Magica_Manual_Maestro.md`, blob Git `b315dbf5725c203246079048de52542ad23c6e3a`, apartados de cartografía en líneas aproximadas 12885–12920.
- Guía subordinada de integridad: `docs/cartografia/README.md`, blob Git `edc30b574e2302fa3b85cf136bf602f2a255d0e6`.
- Antecedente editorial leído: `docs/editorial/DIV-ED-04_control_estructural_svg_2026-11-21.md`, blob `cbdf5884c29cf025ca5cf47bc6e363f76736de1e`.
- No se cambió el Manual Maestro ni el archivo de mapa.

## Resolución de precedencia visual
La ratificación inicial de macroformas de `Tierra_Magica_Mapa_Fisico_Maestro_Borrador_V1.png` es **histórica**. El propio Manual Maestro establece después la **ratificación final** del mapa general único, que prevalece para la edición:
- Archivo original autorizado: `docs/cartografia/Tierra_Magica_Mapa_Maestro.png`.
- SHA-256 declarado por el canon: `e1d27cae1979c44c8cd6d11ac77e37056f522658d8967816f543ed867d57a34a`.
- Git blob SHA-1 declarado: `0ace3abfbb358041568da03fe54d54bbf53e3eb9`.
- Metadatos declarados: RGB, **1448 × 1086 píxeles**, **3.641.728 bytes**.
- No se han recalculado esas huellas a partir de bytes binarios en esta auditoría. Son valores documentados, no pruebas independientes.

## Criterios obligatorios para el libro
1. Usar exclusivamente el PNG final anterior como fuente visual del mapa general; no usar bocetos C1/C2, borradores ni versiones generadas como originales.
2. No alterar, regenerar, recomprimir, reescalar ni reemplazar el maestro. Toda adaptación de impresión será un **derivado identificado**, separado del original y sujeto a revisión.
3. No añadir fronteras políticas, rutas terrestres, ferroviarias, marítimas o aéreas ni leyendas de esas capas. Los nombres regionales se tratan como rótulos geográficos.
4. Preservar la distinción entre Vigilia Alta (asentamiento terrestre) y Cinturón Flotante de Vigilia, además del Territorio Oriental, el archipiélago de Nacariel y las macroformas aprobadas.
5. No derivar distancias, coordenadas, proyecciones o fronteras precisas de los píxeles como si fueran canon mecánico.

## Evaluación de resolución (aritmética, no prueba de imprenta)
A 300 píxeles por pulgada, la imagen nativa permitiría **12,26 × 9,19 cm** (1448/300 × 2,54 y 1086/300 × 2,54). A 150 ppp permitiría **24,52 × 18,39 cm**. Estas cifras son dimensiones aritméticas, no aprobación de calidad visual, legibilidad ni sangrado. El mapa no puede declararse apto para una doble página sin una prueba física o revisión de preprensa.

## Bloqueos y próximos controles
- Obtener los bytes binarios reales del PNG y verificar SHA-256, Git blob, tamaño, dimensiones, modo y apertura visual.
- Definir tamaño final de reproducción y sangrado con la maqueta; examinar topónimos a tamaño real, contrastes, recortes y pliegue central.
- Conservar trazabilidad entre original y cada derivado de imprenta, con su propio hash.
- Completar inventario de artes, derechos, maquetación y exportación de PDF de lectura e imprenta.
- Mantener independientes la edición textual, el libro maquetado y el release Foundry.

## Pruebas y cambios efectuados
Lectura directa en GitHub de Manual Maestro y README cartográfico en `main`; cotejo textual de precedencia y especificaciones; cálculo aritmético de tamaños a 300 y 150 ppp. **No** se descargó ni inspeccionó el PNG binario, no se creó PDF, no se hizo prueba de imprenta ni de Foundry. Único archivo nuevo: este expediente. El SHA de commit y PR constan en GitHub.
