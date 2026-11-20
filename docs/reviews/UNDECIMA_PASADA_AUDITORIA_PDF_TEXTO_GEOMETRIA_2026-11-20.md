# Undécima pasada — auditoría de texto y geometría del PDF integral

**Fecha:** 20-11-2026.  
**Rama:** `review/auditoria-editorial-integral-2026-11-19`.  
**Estado:** auditoría automatizada ejecutada con éxito. **PDF NO aprobado para imprenta.**

## Materiales y ejecución

- Script: `tools/audit-print-review.py`, examen de todas las páginas con PyMuPDF y pypdf.
- Workflow: `.github/workflows/manual-editorial-preview.yml`.
- Ejecución verificada: https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44756252528
- Commit de ejecución: `a50da4eea8763408d5d96f2a6803ce925fd7d866`.
- Resultado GitHub Actions: **completed/success**, incluyendo los pasos `Auditar capa de texto y geometría del PDF` y `Publicar PDF e informe de paginación`.
- Artefacto `Tierra-Magica-Manual-Basico-PDF-Revision`: 3.577.300 bytes comprimidos, contiene PDF integral, informes JSON y vistas de páginas de muestra.
- Se renderizaron muestras de 20 páginas distribuidas por el volumen (aproximadamente páginas 1–4, 6, 11, 21, 36, 51, 76, 101, 131, 161, 201, 233, 251, 301, 351, 401 y 465), disponibles en el artefacto. **No se afirma inspección visual humana de esas muestras.**

## Resultados de la auditoría programática

| Control | Resultado |
|---|---:|
| Páginas totales | **465** |
| Páginas con NUL en extracción pypdf | **461** |
| Cantidad total de caracteres NUL detectados con pypdf | **632.033** |
| Páginas con menos de 15 caracteres según PyMuPDF | **0** |
| Páginas con NUL o U+FFFD según PyMuPDF | **0** |
| Bloques geométricos fuera del rectángulo de página | **0** |
| Longitud mínima de texto extraído en una página por PyMuPDF | **104 caracteres** |
| Longitud mediana de texto extraído por página según PyMuPDF | **1.941 caracteres** |

**Interpretación limitada:** pypdf y PyMuPDF discrepan considerablemente en extracción. La ausencia de NUL en PyMuPDF **no prueba** por sí sola que la búsqueda, la copia al portapapeles, la accesibilidad o la selección funcionen en todos los lectores PDF. La discrepancia debe investigarse mediante un tercer extractor como `pdftotext` y pruebas de copia/búsqueda.

## Qué se puede y no se puede afirmar

- **Sí:** la generación real del PDF y la auditoría automática terminaron sin fallar; no se detectaron páginas vacías según el criterio de texto de PyMuPDF ni bloques geométricos fuera de los límites de página.
- **No:** que todas las tablas estén intactas, que la tipografía sea legible a tamaño real, que no haya líneas superpuestas, que las imágenes estén finalizadas o que el PDF cumpla preflight de imprenta.
- **No:** que el resultado del lector pypdf deba tratarse como texto válido; sus NUL hacen inconveniente basarse únicamente en él para indexar contenido.

## Próxima puerta de cierre

1. Ejecutar tercer extractor de texto y comparar fragmentos de cabecera, índice, inicio y final.
2. Revisar visualmente muestras distribuidas por todo el volumen, especialmente tablas anchas y finales de sección.
3. Evaluar necesidad de corregir capa de texto / codificación de fuentes y regenerar PDF si el defecto se replica.
4. Incorporar ilustraciones autorizadas, ajustar páginas, obtener folios reales y realizar preflight final.

**Canon:** sin modificaciones en `main` ni en `docs/Tierra_Magica_Manual_Maestro.md`.
