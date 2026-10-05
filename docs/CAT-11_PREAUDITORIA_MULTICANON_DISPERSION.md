# CAT-11 — Preauditoría de multicañón y dispersión

**Estado:** DISEÑO PREPARADO · NO CANÓNICO · NO RUNTIME  
**Fecha:** 2026-10-04  
**Dependencia:** CAT-01…10

## Objetivo

Preparar las 10 armas bloqueadas por varios cañones, mecanismos repetidores físicos o dispersión sin introducir una mecánica falsa mientras CRAFT-13 sigue abierto.

CAT-11 no promueve ninguna entrada al Compendio. Los valores de este documento y de `weapon-multishot-spread-proposals.mjs` son **candidatos de balance**, no reglas vigentes.

## Candidatos

| Arma | Daño candidato | Pen | Alcance óptimo | Precio candidato | Propiedades candidatas |
|---|---:|---:|---:|---:|---|
| Ballesta repetidora | 5 | 1 | 20 | 8 o | Repetición, 2 manos |
| Ballesta doble | 6 | 1 | 20 | 5 o | Doble mecanismo, 2 manos |
| Pistola de dos cañones | 6 | 2 | 12 | 14 o | Doble mecanismo |
| Pistola de cuatro cañones | 6 | 1 | 12 | 20 o | Repetición |
| Rifle de dos cañones | 7 | 3 | 30 | 25 o | Doble mecanismo, 2 manos |
| Trabuco | 7 | 0 | 6 | 8 o | Dispersión |
| Trabuco de abordaje | 7 | 0 | 5 | 8 o | Dispersión |
| Escopeta temprana | 7 | 1 | 10 | 12 o | Dispersión, 2 manos |
| Escopeta de dos cañones | 7 | 1 | 10 | 18 o | Dispersión, Doble mecanismo, 2 manos |
| Trabuco portuario | 7 | 0 | 6 | 9 o | Dispersión |

El Trabuco portuario conserva procedencia **Liga de Bronce**.

## Reglas que CAT-11 no inventa

Tener dos o cuatro cañones no concede varias Acciones de ataque. Una sola Acción no produce dos impactos sólo por la geometría del arma.

**Dispersión** tampoco se convierte automáticamente en:

- cono;
- área;
- varios objetivos;
- Ventaja a corta distancia;
- daño adicional;
- ignorar cobertura.

Para que un mecanismo doble o repetidor tenga una ventaja real hace falta representar el **estado de carga**: qué cañón está cargado, cuántas cargas quedan y cuándo debe recargarse cada mecanismo o conjunto.

Foundry todavía no tiene esa autoridad de estado en el perfil de arma actual. Introducir sólo el nombre sin el estado permitiría inconsistencias y exploits.

## Decisión preparada

Cuando pueda cerrarse la autoridad de carga, CAT-11 propone separar tres conceptos:

1. **Repetición:** varias cargas preparadas, pero una Acción sigue resolviendo un ataque salvo capacidad expresa.
2. **Doble mecanismo:** dos cámaras/cañones independientes cuyo estado debe persistirse.
3. **Dispersión:** patrón físico de proyectiles. Por defecto debe seguir resolviendo un objetivo único hasta que exista una regla explícita de área o múltiples objetivos.

## Criterio de promoción

Una de estas diez armas sólo puede entrar al runtime cuando exista una respuesta verificable para:

- estado de munición/carga;
- consumo por disparo;
- cuándo aparece Recarga;
- comportamiento de doble mecanismo;
- comportamiento de Repetición;
- significado mecánico —si alguno— de Dispersión;
- interacción con Acción, Parada, cobertura y múltiples objetivos.

## Estado global

CAT-10 deja el catálogo en:

- 244 entradas;
- 29 perfiles canónicos;
- 171 variantes aprobadas;
- 200 armas runtime;
- 44 pendientes.

CAT-11 prepara 10 de esas 44 sin retirarlas de la cola pendiente. Continúan bloqueadas hasta que exista soporte real.
