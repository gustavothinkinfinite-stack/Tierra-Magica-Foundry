# Release Readiness — Foundry T.M. 1.2.0

**Fecha:** 2026-10-05  
**Estado:** PUBLICADA · v1.2.0 publicada correctamente el 2026-10-05.

## Base revisada

- Release pública anterior: **v1.1.2** (`f9c8aa21beccd81c76bc03ee68cfbb1b4054a1ce`).
- Base de preparación: **main** en `c5bbd857ca7b6d26795aff11e5781310518696db`.
- Cambios desde v1.1.2: **346 commits**.
- CRAFT-13 fue integrado por PR #52 y su merge quedó en `c5bbd857ca7b6d26795aff11e5781310518696db`.
- El workflow `Validate` del merge de CRAFT-13 terminó correctamente.

## Alcance de v1.2.0

### Fabricación

CRAFT-01 a CRAFT-12 quedan cerrados como diseño y auditoría del sistema de fabricación.

CRAFT-13A–I queda implementado en Foundry:

- motor de economía/tiempo/requisitos;
- Item Proyecto;
- reservas y transacciones;
- Calidad, Modificaciones y Materiales Especiales;
- trampas, Runas, Piedras, Engarces y Encantamientos;
- Ingeniería, Energía y Caudal;
- Alquimia e Investigación;
- interfaz y catálogo de 41 referencias;
- auditoría integral multiusuario.

La auditoría final no deja hallazgos abiertos.

### Creación y progresión

- CREA-14 cierra creación autosuficiente de nivel 1.
- CREA-15 cierra progresión ordinaria 2–20.
- PEI, PD, Atributos, identidad, Facetas, idiomas y Familiares quedan protegidos por reglas estructuradas y regresiones.

### Manual y reglas auxiliares

- 12 paquetes raciales jugables integrados en el Manual Maestro.
- Guía práctica de 26 Habilidades.
- Viajes y movimiento terrestre.
- Equipo y suministros.
- Maniobras/situaciones de combate.
- Retirada en combate.
- Potencia N y ajustes sincronizados de Penetración/FUE mínima.

## Compatibilidad

- Foundry VTT mínimo: **13**.
- Verificado: **14**.
- `system.json` y `package.json`: **1.2.0**.
- Canal estable: `releases/latest/download/system.json`.
- El manifiesto empaquetado fijará su descarga a `v1.2.0/tierra-magica.zip`.

## Barreras de publicación

El workflow `Publicar sistema` debe:

1. verificar que tag/rama y versión sean exactamente `v1.2.0`;
2. ejecutar `npm install --ignore-scripts`;
3. ejecutar `npm run validate`;
4. reconstruir Compendios;
5. preparar el staging runtime;
6. comprobar que el ZIP no contiene fuentes de desarrollo;
7. publicar `tierra-magica.zip` y `system.json`.

Además, `Validate` mantiene la barrera explícita `npm run audit:crafting` + `npm run validate`.

## Publicación

- Tag: `v1.2.0`.
- Commit publicado: `9bcd67977851b9520127d990658e322a2862b518`.
- Release ID: `403865308`.
- Estado: publicada, no prerelease, reconocida como **Latest**.
- Workflow `Publicar sistema` #37332788328: **success**.
- Asset `system.json`: SHA-256 `fdf5d4b9b77a983a9ed617865e6354b2bdc13655e7974cbd7e6d57dd601fc7fa`.
- Asset `tierra-magica.zip`: SHA-256 `06a04a1f8060b0366c750817d3c27d4077eb37434eb254e7bdce7cdfb651be99`.
- El canal estable `releases/latest/download/system.json` sirve v1.2.0.
