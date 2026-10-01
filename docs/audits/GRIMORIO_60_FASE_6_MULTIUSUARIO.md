# Grimorio 60 — Auditoría fase 6: autoridad multiusuario

**Estado:** EN DESARROLLO · no canoniza los 42 hechizos nuevos.  
**Base:** fases 3–5 verdes.  
**Objetivo:** impedir que dos clientes de Foundry puedan reutilizar o perder mutaciones de Vida sobre el mismo Actor por escrituras concurrentes.

## Problema

La fase 5 cerró condiciones de carrera dentro de un único cliente mediante colas locales. Ese mecanismo no puede coordinar dos navegadores distintos: cada cliente mantiene su propia memoria y, por tanto, su propia cola.

Ejemplo crítico:

1. un PNJ tiene 10 Vida;
2. jugador A y jugador B poseen permisos sobre el mismo Actor;
3. ambos aplican 4 daño casi simultáneamente;
4. si cada cliente lee 10 y escribe 6, uno de los impactos desaparece.

El estado correcto debe ser equivalente a un orden serial: 10 → 6 → 2.

## Autoridad de Vida

Se amplía `state-authority.mjs` con dos operaciones:

- `apply-health-damage`;
- `apply-health-healing`.

Cuando el canal de socket está disponible:

1. el cliente envía la solicitud al DJ activo principal;
2. el DJ valida que el solicitante posea permiso de actualización sobre el Actor, salvo que el solicitante sea el propio DJ;
3. la mutación entra en una cola `health:<Actor UUID>`;
4. se vuelve a leer la Vida actual;
5. se aplica daño o curación desde ese estado actualizado;
6. se persisten 0 Vida, Incapacitado y Trauma conforme al núcleo.

La curación vuelve a comprobar el máximo derivado y `healthCap` dentro de la cola. No confía en una cantidad calculada previamente por el cliente.

Sin socket, la misma función usa la serialización local.

## Permisos

La autoridad del DJ **no concede permisos nuevos**.

Una solicitud directa de daño/curación compartida sólo se ejecuta si:

- el solicitante es DJ; o
- `target.canUserModify(requester, "update")` autoriza la modificación.

Un jugador que no posee el objetivo no puede invocar el canal para dañarlo o curarlo arbitrariamente.

Los ataques contra objetivos no poseídos continúan usando solicitudes pendientes de aprobación explícita.

## Aprobaciones pendientes

Las aprobaciones de Chat pasan a ser atómicas.

Antes:

1. dos botones/renderizados podían leer `resolved:false`;
2. ambos modificaban Vida;
3. después ambos escribían `resolved:true`.

Ahora cada mensaje tiene una cola propia:

- `pending-damage:<Message ID>`;
- `pending-healing:<Message ID>`.

La primera aprobación válida aplica la mutación y marca el mensaje resuelto. Una segunda aprobación concurrente relee el flag y devuelve `alreadyResolved:true` sin tocar Vida.

Dos mensajes distintos contra el mismo PNJ sí se acumulan, porque ambos terminan pasando por la cola de Vida del Actor.

## Daño físico

Las rutas de:

- ataque ordinario;
- Combate Dual;
- Barrido;
- integrador de defensas;

usan `applyHealthDamageAuthoritatively` cuando el usuario posee permisos sobre el objetivo.

Si la autoridad no puede completar la mutación, se conserva el flujo de daño pendiente para aprobación del DJ en lugar de perder el impacto.

## Daño mágico

La auditoría detectó una asimetría previa: las armas generaban daño pendiente para un PNJ no poseído, pero la resolución mágica sólo mostraba «permisos insuficientes».

Se corrige:

- daño mágico poseído → autoridad de Vida;
- daño mágico no poseído → mensaje de aprobación pendiente;
- áreas/multiobjetivo → una solicitud de aprobación independiente por Actor no modificable.

Así el resultado no depende de si el daño provino de arma o hechizo.

## Curación mágica

Cierre Restaurador:

- objetivo modificable → `applyHealthHealingAuthoritatively`;
- objetivo no modificable → solicitud pendiente;
- la cantidad final se recalcula al aplicar, no al crear la solicitud.

Esto evita que una curación pendiente antigua sobrepase un límite cambiado entre el lanzamiento y la aprobación.

## Pruebas multiusuario

`test/grimorio-60-multiuser-authority.test.mjs` simula:

1. dos clientes propietarios dañando el mismo Actor simultáneamente;
2. daño y curación de clientes distintos sobre el mismo Actor;
3. un cliente sin permisos intentando abusar del socket;
4. doble aprobación concurrente del mismo daño pendiente;
5. dos mensajes de daño distintos aprobados simultáneamente contra el mismo PNJ;
6. doble aprobación concurrente de una curación con `healthCap`;
7. dos impactos concurrentes llevando a 0 Vida y aplicando Incapacitado/Trauma una sola vez.

Comando aislado:

`npm run audit:grimorio:multiuser`

## Invariantes

La fase exige:

- ninguna mutación de Vida compartida autorizada se pierde;
- ninguna solicitud directa puede escalar permisos;
- una aprobación pendiente se aplica como máximo una vez;
- mensajes distintos se acumulan correctamente;
- curación siempre vuelve a respetar máximo y límite de lesión;
- llegar a 0 Vida mantiene las consecuencias del núcleo;
- el atacante nunca recibe permisos de escritura sobre el PNJ por utilizar el sistema de autoridad.

## Límite restante

Esta fase arbitra Vida compartida y mantiene Energía/defensa cinética bajo la autoridad existente. No convierte todos los documentos de Foundry en transacciones distribuidas.

Estados como Parada, órdenes de Familiar o flags narrativos siguen bajo sus guardas específicas. Sólo deberán pasar a autoridad distribuida si una prueba demuestra una carrera que produzca una ventaja mecánica real.
