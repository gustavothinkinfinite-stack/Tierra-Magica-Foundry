# Grimorio 60 — Auditoría fase 7: economía de turno multiusuario

**Estado:** EN DESARROLLO · no canoniza los 42 hechizos nuevos.  
**Base:** fases 3–6 verdes.  
**Objetivo:** impedir que dos clientes que controlan el mismo Actor reutilicen Acción, Reacción o Movimiento antes de recibir la actualización del otro cliente.

## Hallazgo

Las fases anteriores tenían protección local mediante `WeakSet` y colas por objeto JavaScript. Esa protección funciona dentro de un navegador, pero no coordina dos clientes diferentes.

Contraejemplo:

1. un Actor tiene Acción disponible;
2. dos usuarios con permisos sobre ese Actor pulsan dos activaciones casi al mismo tiempo;
3. ambos clientes leen `system.turn.action = true`;
4. cada navegador posee su propio bloqueo local;
5. sin autoridad compartida, ambas operaciones pueden ejecutarse antes de que llegue la escritura `action=false`.

La misma clase de carrera existe para Reacción y para Movimiento cuantificado.

## Reservas distribuidas

La autoridad del DJ incorpora reservas para:

- `action`;
- `reaction`.

Una reserva:

1. valida permisos del solicitante;
2. valida que el Actor no esté Incapacitado;
3. valida que el recurso siga disponible en el estado del DJ;
4. comprueba que ningún otro cliente lo haya reservado;
5. devuelve un identificador de reserva.

La operación se ejecuta **después** de obtener la reserva.

- Si la operación es inválida o se cancela, la reserva se libera y no gasta el recurso.
- Si la operación produce un resultado válido, se confirma la reserva y el DJ persiste el recurso como gastado.
- Si la operación lanza una excepción, la reserva también se libera antes de propagar el error.

Esto conserva la regla existente: una validación fallida no quema Acción/Reacción.

## Reservas sin vencimiento temporal

Las reservas no expiran automáticamente por reloj.

Una expiración permitiría:

1. abrir una acción;
2. mantenerla pendiente hasta que venza la reserva;
3. ejecutar otra acción desde otro cliente;
4. completar después la primera.

Por ello la reserva sólo termina por:

- confirmación;
- cancelación/fallo;
- excepción;
- inicio de un nuevo turno.

El reinicio de turno limpia cualquier reserva anterior antes de conceder la nueva economía.

## Movimiento compartido

`spendActorMovement` delega en la autoridad del DJ.

El DJ vuelve a leer:

- Movimiento derivado;
- Movimiento adicional;
- Movimiento ya gastado;
- estado Incapacitado.

Dos solicitudes simultáneas quedan serializadas sobre `turn-state:<Actor>`.

Ejemplo auditado:

**Movimiento 6 + dos solicitudes simultáneas de 4** → sólo una puede gastar 4.

Dos solicitudes de 3 sí pueden ejecutarse sucesivamente y terminar en 6/6, porque corresponden a un orden serial legal.

## Intercepción: Reacción + Movimiento

Intercepción combina Reacción y Movimiento.

Una solicitud de Movimiento que pretende consumir Reacción:

- falla si la Reacción ya está gastada;
- falla si otro usuario posee una reserva activa de esa Reacción;
- puede continuar si la reserva pertenece al mismo solicitante.

Así una Intercepción no puede apropiarse de una Reacción ya reservada para Parada, Contramagia, Acción Vinculada u otra respuesta.

## Independencia Acción/Reacción

Acción y Reacción mantienen reservas separadas.

Un cliente puede reservar Acción mientras otro reserva Reacción sobre el mismo Actor si ambas siguen disponibles. Esto evita convertir el arbitraje en un bloqueo global que reduzca indebidamente la economía canónica.

## Seguridad

La autoridad vuelve a validar permisos en el DJ.

Un usuario sin permiso de actualización sobre el Actor no puede:

- reservar Acción;
- reservar Reacción;
- gastar Movimiento.

El socket no amplía permisos.

## Cobertura

La auditoría añade casos para:

1. dos clientes compitiendo por la misma Acción;
2. liberación de una Acción tras una resolución inválida;
3. independencia entre Acción y Reacción;
4. dos movimientos de 4 contra Movimiento 6;
5. dos movimientos de 3 contra Movimiento 6;
6. Intercepción intentando consumir una Reacción reservada por otro cliente;
7. rechazo de reservas y Movimiento para un usuario sin permisos;
8. regresiones que exigen que `runAction` y `runReaction` sigan usando la autoridad distribuida.

Comando aislado:

`npm run audit:grimorio:economy-multiuser`

## Arquitectura resultante

La economía queda en dos capas:

- **bloqueo local**: evita doble clic y reentrada dentro del mismo cliente;
- **reserva del DJ**: evita reutilización del mismo recurso entre clientes diferentes.

Movimiento y reinicio de turno comparten además la misma cola autoritativa de estado de turno.

## Criterio de salida

La fase queda verde cuando:

1. dos clientes nunca obtienen la misma Acción o Reacción;
2. una operación inválida libera su reserva sin consumir economía;
3. el Movimiento final corresponde a algún orden serial legal;
4. Intercepción no puede robar una Reacción reservada;
5. permisos siguen siendo respetados;
6. todas las suites previas permanecen verdes.
