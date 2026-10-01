# CREA-12 — Fase 3: Implementación

**Estado:** FASE 3 COMPLETA · LISTA PARA INTEGRACIÓN  
**Fase 1:** CERRADA — DER-D01 a DER-D44  
**Fase 2:** APROBADA — DER-A01 a DER-A30  
**P-011:** RESUELTO

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

## Fase 3D — Recursos y reconciliación

**Estado: IMPLEMENTADA · CI VERDE (Validate #209)**

- `derived.healthMax` y `derived.manaMax` son la autoridad de máximos.
- `resources.health.max` y `resources.mana.max` permanecen sólo como espejos preparados para compatibilidad con Foundry; no son autoridad persistente.
- Si un máximo disminuye por Atributo, Item, Rule Element u otra fuente, el valor actual se reconcilia con `min(actual, nuevoMáximo)`.
- Si un máximo aumenta, el valor actual no cambia: aumentar capacidad no cura ni restaura Maná.
- La reconciliación se ejecuta fuera de `prepareDerivedData()` mediante hooks de Actor/Items y una pasada controlada al cargar el mundo.
- Las escrituras de reconciliación llevan `tmResourceReconcile` y están protegidas contra recursión.
- Cambios encadenados durante una reconciliación se serializan y vuelven a comprobar para no dejar recursos por encima del último máximo.
- Curación, alquimia, descansos y `adjustResource()` consultan `resourceMaximum()`, no el `.max` guardado.
- Los máximos nunca pueden quedar por debajo de 0.
- Familiares usan el mismo motor derivado, pero su política de tipo fija `manaMax = 0`; el Maná persistente legado se reconcilia a 0.
- Si una reducción legítima de máximo lleva Vida a 0, se mantienen las consecuencias canónicas de Incapacitado y Trauma de personaje.

## Fase 3E — Ficha y diagnóstico

**Estado: IMPLEMENTADA · CI VERDE (Validate #220)**

- Personajes, PNJ y Familiares exponen un panel común de diagnóstico de derivados.
- El panel es estrictamente de sólo lectura: no contiene campos `system.*` editables ni acciones que puedan convertirse en una segunda autoridad.
- Cada derivado muestra total, fórmula, base y suma de modificadores.
- Las contribuciones aplicadas muestran etiqueta, valor y procedencia: Base, Rule Element, Manual, Equipo, Estado o Hechizo.
- Las contribuciones contextuales se muestran separadas y explícitamente fuera del total universal.
- Escudo frontal, Parada, Barrera Cinética y Piel Alterada explican la condición requerida para aplicarse.
- Piel Alterada informa además que usa el mayor valor frente a armadura y no se acumula con ella.
- Las incidencias de Rule Elements se muestran en el mismo diagnóstico con código, mensaje y fuente.
- Si Vida/Maná actual superan temporalmente el máximo derivado, la ficha señala que existe una reconciliación pendiente.
- Daño Grave incorpora breakdown propio con fórmula `5 + VIG`.
- La ficha genérica deja de mostrar `martialDefense` como si fuera todo el Bono Defensivo y usa `derived.defensiveBonus`.
- El panel es colapsable para mantener baja la carga visual; la ficha v0.3 usa una variante compacta.

## Fase 3F — Sincronización cruzada

**Estado: IMPLEMENTADA · CI VERDE (Validate #224)**

- Se añadió una prueba secuencial completa que combina Atributos, equipo, estados, Items, Effects, magia sostenida y máximos en una misma evolución del Actor.
- Equipar/desequipar armadura y escudo recalcula Protección/Defensa sin residuos.
- Escudo frontal sigue siendo contextual después de múltiples preparaciones.
- Activar/desactivar Effects modifica y revierte Defensa, Movimiento y máximos usando Rule Elements.
- Aumentar un máximo no concede recurso actual; reducirlo recorta el actual mediante reconciliación.
- Cambiar VIG durante la secuencia recalcula Vida máxima y conserva la política de reconciliación.
- Guardia, Parada y Barrera Cinética pueden activarse y retirarse sin dejar bonos persistentes fuera del motor.
- Activar/desactivar Piel Alterada conserva su carácter contextual y su regla de no acumulación con armadura.
- Añadir/quitar Items con modificadores reconstruye máximos sin depender de valores derivados previos.
- Guardar/reabrir se simula descartando `system.derived`, conservando sólo fuentes persistentes y ejecutando nuevamente migración/preparación.
- La reapertura con schema v2 es idempotente: no reinterpreta ni inventa procedencia.
- Espejos `resources.*.max` obsoletos son reemplazados por los máximos derivados al preparar.
- Desactivar y reactivar Effects después de reapertura produce exactamente los mismos resultados que antes del guardado.
- Se añadieron invariantes estáticos que fallan si una ruta de juego vuelve a:
  - mutar campos `system.derived.*` individuales;
  - usar Movimiento binario fuera de migración;
  - usar `resources.health.max` / `resources.mana.max` fuera del espejo preparado;
  - reintroducir los antiguos `combat.*Bonus` fuera de migración/compatibilidad.

### Cierre de CREA-12

DER-D42 y DER-D43 quedan satisfechos en la rama `crea-12-derived-architecture`.

**P-011: RESUELTO.**

CREA-12 queda técnicamente completo en la PR #24 y listo para integración. La validación global de siete personajes/arquetipos continúa fuera de este alcance, en **CREA-13**, según DER-D44.
