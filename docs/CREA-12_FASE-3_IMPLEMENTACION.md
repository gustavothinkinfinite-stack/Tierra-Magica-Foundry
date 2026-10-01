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

## Trabajo todavía pendiente dentro de Fase 3

1. **3C — contexto defensivo:** integrar Guardia, Parada, Barrera Cinética, orientación de escudos y Protección condicional mediante el resolvedor común.
2. **3D — recursos y reconciliación:** limitar Vida/Maná actuales cuando disminuyan máximos sin otorgar recuperación al aumentarlos.
3. **3E — ficha y diagnóstico:** exponer fórmula, contribuciones y valores contextuales.
4. **3F — sincronización cruzada:** pruebas secuenciales de equipo, estados, magia, atributos, guardado y reapertura.

CREA-12 no se considera cerrado hasta completar esas etapas y satisfacer DER-D42/DER-D43.
