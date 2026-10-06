# Publicación — Foundry T.M. 1.0.18

Fecha de auditoría y publicación: 2026-10-01.

## Resultado

**v1.0.18 está PUBLICADA.**

La release se generó desde el commit validado de `main`:

`23d26ebee32065f422e71938707ceb1a7c005d47`

Workflow: **Publicar sistema #26 — SUCCESS**.

La publicación adjunta:

- `system.json` — 1.955 bytes — SHA-256 `b7c6152ba7eaa2888c70d74a8a4bfe5d970792c881b6022ed2a5447fcc60c329`;
- `tierra-magica.zip` — 226.149 bytes — SHA-256 `d02c8b955544de2d002bc7b74c9b24ac25bda5b85928557986b3e723be24668a`.

## Situación previa

Antes de esta publicación:

- `system.json` y `package.json` ya declaraban **1.0.18**;
- la última release pública seguía siendo **v1.0.14**;
- no existían tags públicos v1.0.15–v1.0.18;
- CREA-12 y CREA-13 ya estaban cerradas e integradas.

Se conservó **1.0.18** porque era la versión explícita vigente del proyecto; no se inventó 1.0.19 para resolver un problema de publicación.

## Hallazgos cerrados

### REL-01 — publicación pública desfasada — RESUELTO

La release `latest` ya es v1.0.18. El paquete publicado contiene un manifiesto cuya URL de actualización es estable:

`https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/releases/latest/download/system.json`

y cuya descarga queda fijada a su propia versión:

`https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/releases/download/v1.0.18/tierra-magica.zip`

### REL-02 — ramas de release demasiado permisivas — RESUELTO

El workflow exige:

- misma versión en `system.json` y `package.json`;
- referencia exacta `v<versión>`;
- rama exacta `release/v<versión>` cuando el disparador sea una rama;
- ausencia previa del tag para impedir republicación mutable desde una rama.

### REL-03 — compendios potencialmente residuales — RESUELTO

`.pack-source/` y `packs/` se eliminan antes de cada compilación. Un Item retirado del catálogo no puede sobrevivir por residuo de una compilación anterior.

### REL-04 — paquete mezclaba runtime y desarrollo — RESUELTO

El staging de release contiene únicamente runtime y documentación operativa mínima:

- assets;
- idioma;
- Compendios compilados;
- scripts;
- estilos;
- plantillas;
- `system.json`;
- `template.json`;
- README y CHANGELOG.

El workflow verificó que el ZIP no incluyera `docs/`, `test/`, `tools/`, `node_modules/`, `.pack-source/` ni `package.json`.

## Canal oficial

El `system.json` de desarrollo y el README apuntan al manifiesto estable de la última release. Las futuras modificaciones de `main` no deben considerarse publicadas hasta que exista una nueva release con su propio tag.

No se modificó ninguna regla de juego durante este cierre.
