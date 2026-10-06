# DOC-CAT-01 — Sincronización integral del Manual Maestro

**Estado:** CERRADO  
**Fecha:** 2026-10-04  
**Archivo normativo actualizado:** `docs/Tierra_Magica_Manual_Maestro.md`

## Objetivo

Eliminar la divergencia entre el Manual Maestro, los catálogos de equipo y los Items runtime aprobados en la rama de expansión.

## Sincronización realizada

El Manual Maestro contiene ahora:

- los **29 perfiles canónicos de armas**;
- las **171 variantes de arma aprobadas**, agrupadas por perfil;
- el estado explícito de las **44 armas todavía no canónicas**;
- las **89 variantes de armadura aprobadas**, agrupadas por los 5 perfiles canónicos;
- las **6 armaduras especiales** claramente marcadas como no canónicas;
- las **51 variantes de escudo aprobadas**, agrupadas por los 3 perfiles canónicos;
- los límites de Pavés/Escudo torre respecto de cobertura;
- los **6 escudos especiales** claramente marcados como no canónicos;
- los **25 equipos canónicos** de EQP-01;
- las **65 propuestas mundanas** de equipo, identificadas como pendientes de precio/uso;
- las **10 propuestas especiales** de equipo, identificadas como bloqueadas.

Los 15 Kits profesionales usan en el Manual los mismos nombres completos que sus Items runtime.

## Protección contra divergencia futura

`test/manual-catalog-sync.test.mjs` verifica que:

1. toda variante de arma aprobada aparezca en el Manual;
2. toda armadura aprobada aparezca en el Manual;
3. todo escudo aprobado aparezca en el Manual;
4. los 25 equipos canónicos aparezcan con identidad consistente;
5. las propuestas EQP-01 estén presentes pero marcadas como no canónicas;
6. permanezcan expresos los límites contra bonos inferidos.

## Sincronización posterior a CRAFT-13

CRAFT-13 fue integrado en `main` antes de fusionar esta expansión. La rama de PR #53 se sincronizó posteriormente con `main` mediante merge de dos padres y una reconciliación dirigida del Manual Maestro.

De los 49 archivos de PR #53, sólo `docs/Tierra_Magica_Manual_Maestro.md` había cambiado también en `main`. La reconciliación conserva el canon posterior de Potencia N, Arco largo Pen 1, Armadura pesada FUE mínima 3, magia y CRAFT-13, y añade sobre esa base los catálogos aprobados.

## Validación

GitHub Actions histórica **Validate #732: verde**. Tras sincronizar con `main` v1.2.0, **Validate #37342416540: success**.

La sincronización post-CRAFT-13 está preparada en la rama `catalogo-armas-maestro-v1`. PR #53 superó nuevamente la validación integral (`Validate` #37342416540: **success**). `main` recibirá estos cambios únicamente si la PR es revisada y posteriormente fusionada.
