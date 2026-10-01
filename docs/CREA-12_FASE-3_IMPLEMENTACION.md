# CREA-12 — Fase 3: Implementación

**Estado:** EN DESARROLLO  
**Fase 1:** CERRADA — DER-D01 a DER-D44  
**Fase 2:** APROBADA — DER-A01 a DER-A30  
**P-011:** ABIERTO

## Fase 3A — Motor común de derivados

**Estado: IMPLEMENTADA · CI VERDE**

Objetivo: reemplazar el bloque monolítico de derivados por un motor puro, auditable y reutilizable sin alterar todavía todas las rutas contextuales de combate.

Implementación inicial:

- `scripts/rules/derived-state.mjs` concentra fórmulas, contribuciones y breakdowns.
- `FlatModifier` alimenta Vida máxima, Maná máximo, Bono Defensivo, Defensas, Protección, Movimiento e Iniciativa.
- `initiativeModifier` es el nombre canónico; `initiative` queda como alias transitorio.
- Armadura y escudo se convierten en contribuciones con procedencia.
- Escudos `frontalOnly` quedan como contribuciones contextuales y no inflan la Defensa preparada.
- Los campos manuales legados siguen siendo leídos temporalmente, pero aparecen identificados como `legacy-manual`.
- `resources.health.max` y `resources.mana.max` siguen expuestos como espejos preparados para compatibilidad con Foundry.
- Se añade `resolveDerivedSelector()` como base para la resolución contextual de Fase 3C.

## Fase 3B — Movimiento y migración

**Estado: IMPLEMENTADA · CI VERDE (Validate #179)**

- `system.movement.base` es la autoridad persistente del Movimiento base.
- `system.turn.movementSpent` reemplaza el interruptor binario `turn.movement`.
- `system.turn.extraMovement` conserva incrementos propios de la economía del turno sin contaminar el Movimiento base.
- La ficha muestra Movimiento restante / disponible y permite gastarlo por partes.
- Intercepción consume la misma reserva cuantificada y su Reacción en una única actualización.
- Esquema de datos elevado a v2.
- Migración v1 → v2 preserva creación/reconstrucción existente y transforma los cuatro bonos manuales legados en `system.modifiers.manual`.
- `defenseBonus`, `protectionBonus`, `movementBonus` e `initiativeBonus` dejan de ser autoridades paralelas.
- Familiares transfieren su antiguo `familiar.movement` a `movement.base` y eliminan la segunda autoridad.
- La migración `movement:false` conserva semántica histórica convirtiéndola en Movimiento gastado equivalente.
- Controles manuales de Acción/Reacción continúan respetando Incapacitado/0 Vida.

## Fase 3C — Contexto defensivo

**Estado: IMPLEMENTADA · CI VERDE (Validate #192 antes del cierre documental)**

- Guardia ya no muta `system.derived.defense` desde una envoltura: se prepara como contribución de estado.
- Parada es una contribución contextual `parryable`; sólo entra contra el ataque cuerpo a cuerpo que realmente puede pararse.
- Barrera Cinética es una contribución contextual `kineticBarrier`; afecta únicamente la Defensa normal del ataque declarado y se consume después de resolverlo.
- Combate Dual conserva Barrera sólo para el primer ataque de la secuencia y Parada para el primer ataque realmente parable.
- Barrido resuelve Defensa individual por objetivo usando el mismo motor.
- Los hechizos contra Defensa normal usan el mismo resolvedor; Defensas Mental y Corporal no consumen Barrera ni Parada.
- Los escudos `frontalOnly` permanecen fuera de la Defensa preparada y sólo se aplican con contexto `frontal:true`.
- Piel Alterada queda registrada como Protección contextual 2 con `alteredSkinCompatible:true`; no se presume compatibilidad porque el canon no define una taxonomía automatizable.
- Piel Alterada usa `max-with-armor`: sustituye una armadura inferior cuando corresponde, pero nunca suma sus 2 puntos a la Protección de armadura.
- Daño físico y mágico aceptan el mismo contexto de Protección sin convertir efectos condicionales en Protección universal.
- `resolveActorDefense()` y `resolveActorProtection()` son las autoridades de resolución contextual.

## Trabajo todavía pendiente dentro de Fase 3

1. **3D — recursos y reconciliación:** limitar Vida/Maná actuales cuando disminuyan máximos sin otorgar recuperación al aumentarlos.
2. **3E — ficha y diagnóstico:** exponer fórmula, contribuciones y valores contextuales.
3. **3F — sincronización cruzada:** pruebas secuenciales de equipo, estados, magia, atributos, guardado y reapertura.

CREA-12 no se considera cerrado hasta completar esas etapas y satisfacer DER-D42/DER-D43.
