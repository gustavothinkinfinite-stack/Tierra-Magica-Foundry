# Release Readiness — Foundry T.M. 1.1.0

**Fecha:** 2026-10-01  
**Estado:** PUBLICADA · v1.1.0 publicada correctamente el 2026-10-01.

## Alcance

1.1.0 es la versión de contenido y schema que canoniza el **Grimorio 60**.

### Reglas

- Manual Maestro actualizado como fuente activa antes de la implementación.
- 60 hechizos canónicos:
  - Evocación 10;
  - Alteración 10;
  - Restauración 9;
  - Percepción 11;
  - Influencia 10;
  - Conjuración 10.
- Trasposición, Umbral y Salto Vinculado dejan de estar condicionados:
  - Trasposición = intercambio táctico voluntario;
  - Umbral = paso local de un uso a través de barrera;
  - Salto Vinculado = lanzador + hasta 2 criaturas voluntarias.
- Se mantienen fuera del grimorio ordinario Dominación total, pérdida repetida de Acción y otros hard controls no auditados.

### Datos

- `TM_SCHEMA_VERSION = 5`.
- Hechizos incorporan:
  - `targetMode`;
  - `maxTargets`;
  - `requiresTarget`.
- Migración v4→v5:
  - Cierre Restaurador obtiene objetivo obligatorio;
  - Trasposición obtiene contrato de objetivo y definición canónica;
  - Umbral obtiene definición canónica;
  - hechizos ordinarios reciben defaults seguros sin reinterpretación temática.
- Templates de Actor/Item quedan marcados como schema v5.

### Foundry

- Compendio de Magia se reconstruye desde catálogo fuente.
- `STARTER_CONTENT.spell` contiene exactamente 60 nombres únicos.
- Objetivos múltiples ya no se modelan como áreas ficticias.
- Interdicción y Aura de Autoridad no atacan mentalmente al protegido durante el lanzamiento; la oposición ocurre frente al atacante cuando aparece la hostilidad.

## Auditoría acumulada

Se conservan verdes:

- balance y probabilidades;
- combinaciones inter-sistema;
- 204.800 secuencias largas;
- concurrencia local;
- autoridad multiusuario;
- Acción/Reacción/Movimiento multiusuario;
- recuperación ante reinicio/cambio de DJ;
- idempotencia del canal de autoridad;
- auditoría final del grimorio;
- regresiones de creación, equipo, magia, familiares, alquimia y dispositivos.

## Automatización contextual pendiente

No bloquea la validez de reglas ni la integración del catálogo:

- pulsos de Matriz Vital;
- ralentización de Aguja Gélida;
- empuje escalado de Martillo Cinético;
- geometría de Pantalla Cinética;
- examen automatizado de Ilusiones;
- detección no visual de Invisibilidad;
- seguimiento por objetivo de Interdicción/Aura;
- DF espacial de Jaula Dimensional;
- creación de entidad de Llamada Mayor;
- plantillas geométricas avanzadas.

Hasta automatizarse, estos efectos se adjudican con el texto canónico del Manual Maestro.

## Publicación

**v1.1.0 fue publicada correctamente** desde el commit `0fc8ffab5c0376533ebb20433d7ff1948d919b08` mediante `Publicar sistema #27`.

- Tag: `v1.1.0`.
- Release ID: `401363638`.
- Estado: publicada, no prerelease, reconocida como Latest.
- Asset `system.json`: SHA-256 `bbd078f33e31336352b3b317a66b00ebb1e56b3953100e790b9b9fb55a938be2`.
- Asset `tierra-magica.zip`: SHA-256 `724b7407c162a48349fcca319005258ca681f148d9c184be63317a647f0827a2`.
- El workflow validó el sistema, reconstruyó los cuatro Compendios, verificó el contenido del ZIP y comprobó que el manifiesto empaquetado apunta al ZIP fijado de v1.1.0.

El canal estable de instalación continúa siendo `releases/latest/download/system.json`, que actualmente resuelve a v1.1.0.
