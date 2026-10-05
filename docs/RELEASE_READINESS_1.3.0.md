# Release Readiness — Foundry T.M. 1.3.0

**Fecha:** 2026-10-05  
**Estado:** LISTA PARA PUBLICACIÓN · rama `release/v1.3.0`.

## Base revisada

- Release pública anterior: **v1.2.0** (`9bcd67977851b9520127d990658e322a2862b518`).
- Base de preparación: **main** en `9ed3c2b0d66a6c2c8d1515b8efa491bc6805c69d`.
- Cambios desde v1.2.0: **101 commits**.
- PR #53 fue reconciliada contra `main` v1.2.0, validada y fusionada.
- Validate del merge #53: **success**.

## Alcance de v1.3.0

### Armas

- 29 perfiles canónicos.
- 171 variantes de perfil aprobadas.
- 200 armas runtime.
- Incluye perfiles y variantes de ligeras, marciales, pesadas, a distancia, regionales, proyectiles y flexibles.

### Armaduras

- 5 perfiles canónicos.
- 89 variantes aprobadas.
- 94 armaduras runtime.
- Armadura pesada conserva FUE mínima 3.

### Escudos

- 3 perfiles canónicos.
- 51 variantes aprobadas.
- 54 escudos runtime.

### Equipo

- 25 objetos canónicos runtime.
- Sin promoción automática de propuestas especiales sin Perfil explícito.

### Manual y auditoría

- Manual Maestro sincronizado con los catálogos.
- Se preservan Potencia N, Arco largo Pen 1, Proyectil Ígneo Daño 6/Pen 2 y Aguja Gélida Pen 2.
- CAT-SYNC-01 documenta la reconciliación posterior a CRAFT-13.
- Las propuestas pendientes continúan separadas del catálogo aprobado.

## Compatibilidad

- Foundry VTT mínimo: **13**.
- Verificado: **14**.
- `system.json` y `package.json`: **1.3.0**.
- Canal estable: `releases/latest/download/system.json`.
- El manifiesto empaquetado fijará su descarga a `v1.3.0/tierra-magica.zip`.

## Barreras de publicación

El workflow `Publicar sistema` debe:

1. exigir coincidencia exacta entre rama/tag y versión 1.3.0;
2. ejecutar `npm install --ignore-scripts`;
3. ejecutar `npm run validate`;
4. reconstruir los cuatro Compendios;
5. preparar staging runtime;
6. verificar que el ZIP excluye fuentes de desarrollo;
7. publicar `tierra-magica.zip` y `system.json`.

Además, `Validate` mantiene la barrera `npm run audit:crafting` + `npm run validate`.

## Resultado esperado

Si `release/v1.3.0` termina verde:

- tag `v1.3.0`;
- GitHub Release `v1.3.0`, no prerelease;
- assets `system.json` y `tierra-magica.zip`;
- `releases/latest/download/system.json` pasa a servir v1.3.0.
