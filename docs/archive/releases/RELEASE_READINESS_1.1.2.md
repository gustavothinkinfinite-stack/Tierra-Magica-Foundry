# Release Readiness — Foundry T.M. 1.1.2

**Fecha:** 2026-10-02  
**Estado:** PUBLICADA · v1.1.2 publicada correctamente el 2026-10-02.

## Alcance

1.1.2 es un hotfix de reconstrucción y compatibilidad para Foundry VTT v14. No modifica reglas, balance ni canon.

### Correcciones

- La adquisición durante `rebuilding` resuelve explícitamente el contexto de costes de creación.
- `initialReserveGranted` queda centralizado en `system.creation`.
- Los borrados de migración usan `foundry.data.operators.ForcedDeletion` en lugar de la sintaxis legacy `-=`.
- ActorSheet, ItemSheet, TextEditor, loadTemplates y las colecciones Actors/Items usan namespaces v13+.
- Los hooks propios de chat usan `renderChatMessageHTML`.
- La iniciativa de sistema usa `@derived.initiativeModifier`.

## Validación

- Pull request de hotfix: #44.
- Workflow `Validate` #386 completado correctamente.
- Workflow de publicación `Publicar sistema #29` completado correctamente.
- Se reconstruyeron los cuatro Compendios, se ejecutó la validación completa, se preparó y verificó el paquete runtime y se publicó la release.

## Publicación

- Tag: `v1.1.2`.
- Commit publicado: `f9c8aa21beccd81c76bc03ee68cfbb1b4054a1ce`.
- Release ID: `401445559`.
- Estado: publicada, no prerelease, reconocida como Latest.
- Asset `system.json`: SHA-256 `882ef5ccf011ceb85d269bc1c0eebdac1634fe1d27b8ecdb776b6792b9a5f812`.
- Asset `tierra-magica.zip`: SHA-256 `1a73a4d7e3ead6200e015d507b2f5383ec1d469491d65527330d0b301f8a3dae`.
- El canal estable continúa siendo `releases/latest/download/system.json`.
