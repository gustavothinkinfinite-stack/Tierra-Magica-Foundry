# Release Readiness — Foundry T.M. 1.3.0

**Fecha:** 2026-10-05  
**Estado:** PUBLICADA · v1.3.0 publicada correctamente el 2026-10-05.

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

## Publicación

- Tag: `v1.3.0`.
- Commit publicado: `4dcf08f5924f68f9373bda7bdfb8034415cefe2b`.
- Release ID: `403937046`.
- Estado: publicada, no prerelease, reconocida como **Latest**.
- Workflow `Publicar sistema` #37344445970: **success**.
- Asset `system.json`: SHA-256 `021084d6230b262ed5af40cfe961a6a024e7a54cd920dfa6973cb154ed7e2880`.
- Asset `tierra-magica.zip`: SHA-256 `982e1c69044a3b53d9bcc96c35e77670a02d57263daf7ffd79be545eed8d4d5e`.
- El canal estable `releases/latest/download/system.json` sirve v1.3.0.
