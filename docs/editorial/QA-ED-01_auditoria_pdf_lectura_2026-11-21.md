# QA-ED-01 — Auditoría estructural del PDF de lectura (21-11-2026)

## Alcance y trazabilidad
- Base `main` consultada: `e0e3afe49c565ee105fe6e971584fe9e2f68c2e8` (merge PR #127).
- Fuente canónica: `docs/Tierra_Magica_Manual_Maestro.md`; **sin cambios en esta auditoría**.
- Archivo realmente examinado: artifact de [Actions 44904014385](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44904014385/artifacts/14707700181), generado sobre commit `3b5a79693a1f7e658f8aa038766874a489342610`, **anterior a PR #127**.
- PDF: `Tierra_Magica_Manual_Basico_Lectura.pdf`; SHA-256 independiente `5ec3f0197a50b5110f369d41bce671b4fab0aa8c823ea4a4baef2ee5ff2df57d`.
- Inspección local reproducible con PyMuPDF (`fitz`), lectura binaria del PDF existente, no regeneración.

## Resultados ejecutados
- 598 páginas; **todas** con tamaño 432 × 648 pt (6 × 9 pulgadas).
- Ninguna página con menos de 20 caracteres extraíbles en la extracción automática; esto **no demuestra** ausencia de páginas visualmente vacías, desbordes ni errores de glifos.
- 1.012 marcadores de navegación PDF reportados por `get_toc()`. Este número **no equivale** a las 69 entradas del índice impreso del manifest; revisar jerarquía y utilidad de los marcadores antes del cierre.
- Muestras de extracción textual comprobadas en páginas 1, 2, 3, 4, 5, 6, 11, 101, 300 y 598. Las páginas 2 y 4 contienen sólo cabecera y número (30 caracteres); comprobar si son versos intencionales y si corresponde mostrar cabecera en blancos de cortesía.
- El índice comienza en página 5 y continúa en la 6. Su exactitud de destinos **no fue contrastada entrada por entrada**.
- El PDF de lectura anterior declara cero cubiertas originales y cero retratos divinos integrados. No se certifica edición ilustrada ni imprenta.

## Bloqueos y siguiente trabajo verificable
1. No se encontró por consulta de ejecuciones asociadas al commit `e0e3afe...` una ejecución posterior: el endpoint del conector filtra ejecuciones disparadas por PR, de modo que **un resultado vacío no prueba que no exista** una ejecución push. Consultar Actions directamente y descargar nuevo artifact antes de dar por probado el control de hashes CI-ED-04.
2. Recuperar archivos artísticos **efectivamente autorizados**, con origen, crédito y permisos; incorporarlos en `assets/editorial/` sólo tras verificar bytes y correspondencia, sin crear retratos sustitutos.
3. Auditar visualmente índice, tablas convertidas, cortes, tipografías y páginas de cortesía, incluyendo una muestra de cada tabla problemática.
4. Verificar mapa oficial, créditos, resolución, sangrado, perfiles y requisitos de imprenta. PDF lectura ≠ PDF ilustrado definitivo ≠ PDF listo para imprenta.

Esta auditoría no modifica reglas, canon, símbolos, arte ni release Foundry.
