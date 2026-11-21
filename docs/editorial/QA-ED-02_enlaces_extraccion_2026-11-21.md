# QA-ED-02 — Auditoría de enlaces internos y extracción de texto del PDF de lectura

**Fecha:** 21-11-2026. **Base `main`:** `93c91b37ea4b215b6b3d85ec94ab4c86ddf816c7`. **Fuente canónica:** `docs/Tierra_Magica_Manual_Maestro.md` (sin modificaciones). **Alcance:** PDF preliminar del artifact de Actions [44904014385](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/44904014385/artifacts/14707700181), no PDF posterior al PR #127.

## Procedimiento reproducible

Se abrió el PDF binario descargado, de 1.703.956 bytes, SHA-256 `5ec3f0197a50b5110f369d41bce671b4fab0aa8c823ea4a4baef2ee5ff2df57d`, con `pypdf.PdfReader`. Se recorrieron todas las páginas y sus anotaciones `/Annots`; para cada `/Link` se comprobó la presencia de destino `/Dest`, acción con `/D` o URL `/URI`. Se inspeccionó además la extracción de texto en páginas 1, 2, 3, 4, 5, 6, 11, 101, 300 y 598.

## Resultado

- **598 páginas**; metadatos: título `Tierra Mágica — Manual Básico`, productor `WeasyPrint 69.0`.
- **424 anotaciones de tipo `/Link`**, todas con destino o URI declarado; **0 enlaces sin destino declarado**. Este control no comprueba que cada destino lleve a la sección semánticamente correcta ni que el índice impreso coincida con la paginación.
- **Hallazgo de accesibilidad/extracción:** en las páginas 1, 3, 11, 300 y 598 aparecen caracteres nulos `\\x00` intercalados en fragmentos de texto extraído. Esto puede perjudicar copia, búsqueda, indexación y lectores de pantalla. No implica por sí solo que los glifos sean invisibles en la página renderizada.
- Páginas 2 y 4 contienen únicamente cabecera/numeración; se mantiene el pendiente de confirmar si son páginas de cortesía deliberadas.

## Límites y próximos controles

1. Regenerar PDF desde `main` posterior al PR #127 y comprobar `pdf_sha256`, `source_sha256`, `pdf_bytes` contra el manifest; la consulta de runs por SHA de commit devuelve sólo runs de PR, por lo que una lista vacía no descarta un run `push`.
2. Auditar enlaces de índice por correspondencia real de títulos y páginas; investigar caracteres nulos con fuentes/CSS, extracción y render visual antes de corregir tipografía.
3. Inspeccionar tablas extensas, páginas de cortesía, cubiertas y doce retratos autorizados, mapa, créditos y preflight de imprenta.

**Dictamen:** navegación estructural sin enlaces huérfanos según el criterio indicado, pero **sin certificación semántica, accesible, ilustrada ni de imprenta**. No se modifica canon ni se declara un nuevo PDF.
