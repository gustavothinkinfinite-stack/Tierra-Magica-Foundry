# Release Readiness — Foundry T.M. 1.1.1

**Fecha:** 2026-10-01  
**Estado:** PUBLICADA · v1.1.1 publicada correctamente el 2026-10-01.

## Alcance

1.1.1 es un hotfix de compatibilidad runtime para Foundry VTT v13/v14. No modifica reglas, balance ni canon.

### Correcciones

- `system.json` registra explícitamente todos los subtipos de Actor e Item mediante `documentTypes`.
- Los subtipos del manifiesto coinciden con `template.json`, incluido `discipline`.
- `TierraMagicaActor.prepareDerivedData()` ya no invoca helpers privados `#...` durante la construcción del Documento.
- Se añadieron pruebas de regresión para ambos fallos.
- La identificación de arranque y la versión de paquete quedan en 1.1.1.

## Validación

- Pull request de hotfix: #42.
- Workflow `Validate` completado correctamente.
- Validación de release completada correctamente: construcción de Compendios, chequeo sintáctico, suite de pruebas, staging y verificación del ZIP.
- Workflow de publicación: `Publicar sistema #28`.

## Publicación

- Tag: `v1.1.1`.
- Commit publicado: `aaf12f5667991c291e34c26a038a6383b49ce34f`.
- Release ID: `401439027`.
- Estado: publicada, no prerelease, reconocida como Latest.
- Asset `system.json`: SHA-256 `63683849b1fd14bc706327dd3dee81eff076ead0a97d6968b1a09bb7797b3105`.
- Asset `tierra-magica.zip`: SHA-256 `a175df2772002dfae127ef0cc2edfd7e4bdb02a8a0c55a048e6cddaa8af57333`.
- El canal estable continúa siendo `releases/latest/download/system.json`.
