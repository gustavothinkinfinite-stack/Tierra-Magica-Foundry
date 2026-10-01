# Grimorio 60 — Auditoría fase 8: persistencia y recuperación

**Estado:** EN DESARROLLO · no canoniza los 42 hechizos nuevos.  
**Base:** fases 3–7 verdes.  
**Objetivo:** mantener la seguridad de las reservas de Acción/Reacción ante recarga de página, desconexión, cambio de DJ principal o reinicio de Foundry.

## Hallazgo

La fase 7 introdujo reservas distribuidas bajo la autoridad del DJ, pero su primera implementación almacenaba esas reservas en un `Map` de memoria.

Eso deja una carrera de recuperación:

1. un cliente reserva Acción;
2. la operación empieza;
3. el DJ principal recarga o cambia;
4. el nuevo proceso no conoce el `Map` anterior;
5. otro cliente puede reservar la misma Acción mientras la primera operación todavía puede producir efectos.

Por tanto una reserva de economía no puede depender de memoria de proceso.

## Persistencia

Las reservas de `action` y `reaction` se guardan en:

`flags.tierra-magica.turnReservations`

Cada entrada conserva:

- identificador de reserva;
- usuario solicitante;
- instante de creación.

El `Map` local queda únicamente como fallback para stubs/documentos de prueba que no implementan flags.

La autoridad siempre consulta primero el flag persistente. Un módulo recién cargado, un nuevo DJ principal o una nueva sesión ve la reserva previa.

## Política de fallo seguro

Una reserva persistida **no caduca por tiempo**.

No se libera automáticamente al detectar desconexión, inactividad o recarga. Hacerlo permitiría que una operación que sí alcanzó a producir un efecto fuera seguida por una segunda Acción gratuita.

Ante ambigüedad se prioriza:

**bloquear una economía dudosa antes que duplicarla.**

La reserva termina sólo por:

- confirmación tras una operación válida;
- liberación tras operación inválida/cancelada;
- manejo de excepción;
- inicio de un nuevo turno;
- adjudicación explícita del DJ principal.

## Recuperación explícita del DJ

Se añade `adjudicateStaleTurnReservation(actor, resource, resolution)`.

Sólo el DJ activo principal puede usarla en entorno con socket. Sin socket sigue requiriendo un usuario DJ.

Resoluciones:

- **`spend`**: la operación se considera efectuada; Acción/Reacción queda gastada y la reserva desaparece.
- **`release`**: la operación se considera no efectuada; el recurso permanece disponible y la reserva desaparece.

Esto evita inferir automáticamente si un efecto llegó o no a resolverse durante una caída.

## Recarga del jugador

Si el navegador del jugador se recarga después de reservar y pierde el identificador local:

- la nueva página no puede reservar de nuevo;
- la reserva persistida continúa bloqueando el recurso;
- el siguiente turno la limpia automáticamente;
- si debe resolverse antes, el DJ decide `spend` o `release`.

No existe “reanudar automáticamente” una reserva sólo porque el mismo usuario vuelve a conectarse: dos pestañas del mismo usuario podrían usar esa regla para ejecutar dos operaciones bajo una misma reserva.

## Cambio de DJ principal

El DJ nuevo no necesita reconstruir estado desde memoria.

Al consultar el Actor obtiene la reserva desde flags y:

- rechaza una nueva reserva concurrente;
- puede confirmar una reserva si recibe su identificador válido;
- puede adjudicar una reserva huérfana.

La selección de DJ principal sigue usando la autoridad ya existente.

## Reinicio de Foundry

Los flags del Actor sobreviven al reinicio. Una reserva pendiente permanece bloqueante después de levantar nuevamente el mundo.

Esto puede producir una reserva huérfana, pero no una Acción duplicada. La salida segura es adjudicación del DJ o nuevo turno.

## Nuevo turno

`resetActorTurnForCombat` espera ahora la limpieza persistente de reservas antes de conceder:

- nueva Acción;
- nueva Reacción;
- Movimiento renovado.

Así una reserva de la ronda anterior no contamina la siguiente.

## Estados que ya eran persistentes

La auditoría confirma que no requieren el mismo cambio:

- Vida/Maná se persisten en Actor;
- Movimiento gastado se persiste en Actor;
- Parada/Contraataque se materializan inmediatamente en `system.combat`;
- Energía de dispositivos se persiste en el Item;
- daño/curación pendientes se persisten en flags de ChatMessage.

Las colas de autoridad siguen siendo memoria de proceso, pero protegen únicamente operaciones activas; el estado mecánico resultante está persistido.

## Cobertura

`test/grimorio-60-recovery.test.mjs` prueba:

1. reserva creada por una instancia y detectada por otra instancia recién importada;
2. confirmación de una reserva desde un proceso nuevo conservando su ID;
3. cambio de DJ con adjudicación `spend`;
4. reinicio con adjudicación `release`;
5. prohibición de adjudicar reservas por parte de jugadores;
6. limpieza persistente al iniciar un turno nuevo;
7. reserva antigua que sigue bloqueando aunque su timestamp sea remoto.

Comando:

`npm run audit:grimorio:recovery`

## Criterio de salida

La fase queda verde cuando:

1. reiniciar el módulo no borra reservas;
2. cambiar de DJ no permite reutilizar economía;
3. recargar un jugador no concede reanudación insegura;
4. sólo el DJ puede resolver ambigüedad;
5. el inicio de turno limpia reservas antiguas;
6. todas las suites anteriores continúan verdes.
