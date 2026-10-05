# CAT-SYNC-01 — Auditoría post-CRAFT-13 de PR #53

**Estado:** SINCRONIZADA CON MAIN · VALIDACIÓN INTEGRAL VERDE  
**Fecha:** 2026-10-05

## Base

PR #53 nació sobre `main` en `1f79187d45048bc2596e70666e78a04d31f7a215`.

Antes de esta sincronización:

- PR #53: 93 commits propios;
- desfase: 226 commits por detrás de `main`;
- archivos de PR: 49;
- archivos modificados también por `main`: sólo `docs/Tierra_Magica_Manual_Maestro.md`.

La rama fue integrada con el `main` posterior a v1.2.0 mediante un merge de dos padres, preservando el historial original.

## Hallazgos

### 1. Canon numérico

La documentación ARM-01 todavía fijaba Armadura pesada en **FUE mínima 2**. El canon vigente de v1.2.0 es **FUE mínima 3**.

Las variantes runtime no estaban estructuralmente rotas porque copian `STARTER_CONTENT`; al sincronizar heredan el perfil actual. Se corrigió la documentación y se añadió regresión.

### 2. CRAFT-13 ya no es una dependencia abierta

CRAFT-13A–I está cerrado e integrado.

Las propuestas de Material Especial y Device permanecen bloqueadas, pero por una razón más precisa:

- la infraestructura existe;
- un nombre no selecciona automáticamente un Perfil de Material;
- un nombre arcano-industrial no selecciona automáticamente Host, Módulo, Device, fuente o consumo;
- cada propuesta necesita Perfil explícito y receta/mapeo concreto.

No se promovió automáticamente ninguna de las 44 armas pendientes, 6 armaduras especiales, 6 escudos especiales ni 10 equipos especiales.

### 3. Enrutamiento de arrojadizas

Las 7 armas ligeras arrojadizas siguen bloqueadas por Combate. CRAFT-13 no resuelve un modo de ataque independiente de `system.skill`.

Por ello dejan de contarse como dependencia de coordinación con Crafting.

### 4. Manual Maestro

La reconciliación conserva expresamente el canon posterior a PR #53:

- Potencia N limita FUE añadida;
- Arco largo Pen 1;
- Armadura pesada FUE mínima 3;
- Proyectil Ígneo Daño 6 Pen 2;
- Aguja Gélida Pen 2;
- CRAFT-13 integrado.

Sobre esa base se añaden los 29 perfiles/171 variantes, armaduras, escudos y equipo de PR #53.

También se unifica el nombre **Kit Instrumental Arcano de campo**.

## Estado de la cola

Sigue sin promoción automática:

- 7 arrojadizas ligeras;
- 10 varios cañones/dispersión;
- 2 materiales especiales sin Perfil exacto;
- 25 Weapon/Device sin Perfil exacto;
- 6 armaduras especiales;
- 6 escudos especiales;
- 65 equipos mundanos sin auditoría de precio/uso;
- 10 equipos especiales sin Perfil exacto.

La rama sincronizada superó `Validate` #37342416540 con resultado **success**.
