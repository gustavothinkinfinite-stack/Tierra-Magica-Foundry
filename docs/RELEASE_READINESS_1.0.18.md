# Preparación de publicación — Foundry T.M. 1.0.18

Fecha de auditoría: 2026-10-01.

## Estado observado

- `system.json` y `package.json` declaran **1.0.18**.
- La última release pública disponible antes de esta preparación es **v1.0.14**.
- No existen tags públicos `v1.0.15`, `v1.0.16`, `v1.0.17` ni `v1.0.18`.
- CREA-12 y CREA-13 ya están cerradas e integradas en `main`.
- El repositorio decidió explícitamente mantener el manifiesto en **1.0.18** durante el cierre post-CREA-13; esta preparación no inventa 1.0.19.

Por lo tanto, la próxima publicación candidata es **v1.0.18**, acumulando los cambios aún no publicados desde v1.0.14.

## Hallazgos de release

### REL-01 — publicación pública desfasada

Antes de publicar v1.0.18, el manifiesto de desarrollo podía anunciar 1.0.18 mientras `releases/latest/download/tierra-magica.zip` seguía resolviendo a v1.0.14.

La nueva ruta de publicación adjunta dos artefactos:

- `system.json`: manifiesto estable de la última release;
- `tierra-magica.zip`: paquete instalable de esa versión.

El manifiesto publicado usa una URL estable para futuras comprobaciones y una URL de descarga fijada a su propia versión.

### REL-02 — ramas de release demasiado permisivas

El workflow aceptaba cualquier rama `release/v*` y derivaba el tag desde `system.json`, incluso si el nombre de la rama no coincidía.

La publicación exige ahora:

- misma versión en `system.json` y `package.json`;
- referencia exacta `v<versión>`;
- rama exacta `release/v<versión>` cuando se publique por rama;
- ausencia previa del tag cuando el disparador sea una rama.

### REL-03 — compendios potencialmente residuales

La construcción escribía sobre `.pack-source/` y `packs/` sin limpiar primero. Una entrada retirada del catálogo podía sobrevivir físicamente en una reconstrucción posterior.

Ambos directorios se eliminan antes de compilar.

### REL-04 — paquete mezclaba runtime y desarrollo

El ZIP anterior copiaba casi todo el repositorio. El staging nuevo incluye sólo:

- assets;
- idioma;
- compendios construidos;
- scripts;
- estilos;
- plantillas;
- `system.json`;
- `template.json`;
- README y CHANGELOG.

No incluye pruebas, herramientas, documentación editorial, dependencias ni fuentes intermedias de compendio.

## Condición de publicación

v1.0.18 puede publicarse cuando esta preparación esté integrada en `main` y su validación sea verde. La publicación debe partir exactamente del commit de `main` validado mediante la rama `release/v1.0.18` o el tag `v1.0.18`.

No se cambia ninguna regla del juego en esta preparación.
