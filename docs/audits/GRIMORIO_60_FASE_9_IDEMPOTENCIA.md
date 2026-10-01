# Grimorio 60 — Auditoría fase 9: idempotencia del canal de autoridad

**Estado:** EN DESARROLLO · no canoniza los 42 hechizos nuevos.  
**Base:** fases 3–8 verdes.  
**Objetivo:** impedir que retransmisiones, paquetes duplicados o respuestas perdidas apliquen dos veces una misma mutación compartida.

## Hallazgo

La autoridad del DJ serializaba operaciones concurrentes, pero una serialización no equivale a idempotencia.

Contraejemplo:

1. un cliente envía `requestId = X` para aplicar 5 daño;
2. el transporte duplica el mismo paquete;
3. el DJ procesa primero X y aplica 5;
4. después procesa la segunda copia de X;
5. sin memoria idempotente, vuelve a aplicar 5.

El mismo problema puede afectar Movimiento, Energía, reservas y otros consumos autoritativos.

## Clave idempotente

Una petición se identifica por:

`<requesterId>:<requestId>`

El `requesterId` forma parte de la identidad para que dos usuarios distintos puedan generar accidentalmente el mismo ID sin colisionar.

Además se calcula una huella canónica de:

- usuario solicitante;
- acción;
- payload.

Si se reutiliza el mismo `requestId` del mismo usuario con un payload distinto, la autoridad devuelve error de colisión y no ejecuta la segunda operación.

## Dos capas

### Duplicados simultáneos

`authorityRequestInflight` conserva la promesa activa de cada petición.

Dos copias concurrentes del mismo request comparten la misma promesa y reciben el mismo resultado. La mutación ocurre una sola vez.

### Duplicados posteriores y reinicios

Cada Actor/Item afectado conserva recibos recientes en:

`flags.tierra-magica.authorityReceipts`

El recibo terminado guarda:

- huella de la solicitud;
- resultado;
- instante de finalización.

Una instancia nueva del módulo puede leer ese recibo después de recargar o cambiar de DJ y devolver exactamente el resultado anterior sin repetir la mutación.

Se conservan hasta **128 recibos recientes por documento**. Esta bitácora protege duplicados y retransmisiones operativas; no pretende ser una barrera antitrampas contra un cliente que genere deliberadamente solicitudes nuevas con IDs nuevos.

## Journal previo a la mutación

Guardar el recibo sólo después de ejecutar deja una ventana de fallo:

1. el DJ aplica la mutación;
2. cae antes de persistir el resultado;
3. el request se retransmite;
4. otro DJ no sabe que ya se ejecutó.

Por ello el flujo es de dos fases:

1. persistir recibo `state: pending`;
2. ejecutar la mutación;
3. reemplazar por `state: completed` y guardar el resultado.

Si una nueva autoridad encuentra un recibo `pending`, **no repite automáticamente la operación**.

Devuelve un estado de recuperación pendiente. Se prefiere bloquear una solicitud ambigua antes que duplicar daño, Movimiento o gasto de recurso.

## Documentos de recibo

El recibo se guarda junto al estado afectado:

- economía/Movimiento/Vida/defensas → Actor;
- consumo de Energía → Item de dispositivo;
- otras operaciones sólo pueden entrar al dispatcher idempotente si poseen un documento persistente identificable.

Las aprobaciones pendientes de Chat ya poseen su propia idempotencia mediante el flag `resolved` y no dependen de este journal.

## Colisiones

La autoridad no confía sólo en el ID.

Ejemplo rechazado:

- `player:req-1` → daño 3;
- `player:req-1` → daño 8.

El segundo mensaje no puede reutilizar el recibo del primero ni ejecutar una mutación nueva.

## Cobertura

`test/grimorio-60-idempotency.test.mjs` prueba:

1. dos paquetes socket idénticos concurrentes de daño;
2. reenvío posterior del mismo daño;
3. replay después de importar una nueva instancia de autoridad;
4. mismo requestId con payload alterado;
5. journal `pending` recuperado después de una caída;
6. Movimiento duplicado;
7. Energía duplicada;
8. reserva de Acción duplicada que devuelve el mismo `reservationId`;
9. mismo requestId utilizado por usuarios diferentes.

Comando:

`npm run audit:grimorio:idempotency`

## Criterio de salida

La fase queda verde cuando:

1. el mismo request exacto produce como máximo una mutación;
2. duplicados concurrentes comparten resultado;
3. duplicados posteriores devuelven el recibo;
4. el comportamiento sobrevive a recarga/cambio de autoridad;
5. un journal ambiguo nunca se reejecuta automáticamente;
6. reutilizar el ID con otro payload se rechaza;
7. todas las suites previas continúan verdes.
