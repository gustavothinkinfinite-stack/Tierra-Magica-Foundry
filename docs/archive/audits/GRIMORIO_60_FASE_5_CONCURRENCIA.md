# Grimorio 60 — Auditoría fase 5: concurrencia real

**Estado:** EN DESARROLLO · no canoniza los 42 hechizos nuevos.  
**Base:** fase 4 verde sobre `main`.  
**Objetivo:** reproducir condiciones de carrera sobre las rutas reales del sistema con operaciones asíncronas concurrentes.

## Motivo

El fuzz de fase 4 ejecuta secuencias seriales largas. Esa estrategia encuentra bucles e invariantes rotas, pero no detecta dos operaciones que leen el mismo estado antes de que ninguna escriba.

Esta fase usa `Promise.all` y actualizaciones deliberadamente demoradas para reproducir escrituras concurrentes.

## Hallazgos

### F5-01 — Movimiento reutilizable por carrera

**Contraejemplo:** Movimiento 6; dos solicitudes simultáneas de 4.

Sin serialización, ambas pueden observar 6 disponibles y ambas aceptar. Cada una escribe `movementSpent = 4`, de modo que la ficha registra 4 aunque se hayan ejecutado 8.

**Corrección:** `spendActorMovement` y `resetActorTurnForCombat` comparten una cola por Actor. El segundo desplazamiento recalcula el remanente después del primero; dos hooks de reinicio del mismo turno tampoco pueden conceder la economía dos veces.

### F5-02 — Daño perdido por escrituras simultáneas

**Contraejemplo:** objetivo a 10 Vida; dos impactos simultáneos de 4.

Sin bloqueo, ambos pueden leer 10 y escribir 6. El resultado correcto es 2.

**Corrección:** las mutaciones locales de recursos de un Actor se serializan mediante `withActorResourceLock`.

### F5-03 — Curación concurrente y topes

**Contraejemplo:** 10/16 Vida; dos curaciones simultáneas de 4.

Cada curación debe recalcular el máximo después de la anterior. El resultado auditado es 16, con cantidades efectivas 4 y 2; no dos escrituras paralelas a 14.

`applyBoundedHealing` usa el mismo bloqueo que daño para que daño y curación tampoco compitan por una escritura final.

### F5-04 — Ritualismo paga dos veces la misma reserva

**Contraejemplo:** 7 Maná; dos rituales concurrentes de coste 5.

Sin serialización, ambos pueden leer 7, ambos resolver y ambos escribir 2. Se producen dos rituales pagando una única vez.

**Corrección:** el Maná del Director se valida y descuenta dentro del bloqueo común. El primer ritual deja 2; el segundo se rechaza antes de tirar.

### F5-05 — Sobrecarga/Poción/Descanso

El pago de Maná de hechizos, la Sobrecarga, las fórmulas automatizadas y los descansos comparten el mismo bloqueo de recursos.

Esto impide estados que no corresponden a ningún orden serial legal, por ejemplo:

- Sobrecarga leyendo Maná bajo mientras Descanso rellena simultáneamente la misma reserva;
- Poción Arcana y Descanso escribiendo dos valores absolutos calculados desde el mismo Maná inicial;
- curación de Descanso compitiendo con daño entrante.

## Implementación

Se añade `scripts/rules/resource-mutation.mjs` con una cola local por Actor. La usan:

- `adjustResource`;
- `applyBoundedHealing`;
- pago de Maná de `useSpell`;
- fórmulas automatizadas;
- Maná de Director de `performRitual`;
- `rest`.

Movimiento y reinicio de turno utilizan una cola propia común en `turn-economy.mjs`.

Estas colas son **locales al cliente**. La autoridad multiusuario que ya existe para Energía y defensa cinética sigue separada. La fase no afirma todavía que toda mutación de Vida multi-cliente esté arbitrada por socket; eso requiere una decisión específica de autoridad distribuida.

## Pruebas

`test/grimorio-60-real-concurrency.test.mjs` reproduce:

1. dos desplazamientos simultáneos;
2. dos reinicios simultáneos del mismo turno;
3. dos impactos simultáneos;
4. dos curaciones simultáneas contra tope;
5. daño y curación simultáneos;
6. dos rituales que compiten por Maná;
7. Sobrecarga y Descanso;
8. Poción Arcana y Descanso.

Comando aislado:

`npm run audit:grimorio:concurrency`

## Criterio de salida

La fase queda verde cuando la suite completa pasa y toda operación concurrente termina en un estado equivalente a algún orden serial legal, sin reutilizar Acción, Reacción, Movimiento, Vida, Maná, Energía ni dosis.
