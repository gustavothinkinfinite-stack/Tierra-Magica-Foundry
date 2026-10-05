# CRAFT-13I — Auditoría integral final de Foundry

**Estado:** EN VALIDACIÓN  
**Rama:** `craft-13-foundry-crafting`  
**Fuente canónica:** CRAFT-01 a CRAFT-12 + cierres CREA aplicables  
**Objetivo:** intentar romper la implementación CRAFT-13A–H como sistema integrado.

## Matriz obligatoria

13I audita conjuntamente:

1. economía y redondeos;
2. PEI y separación de economías;
3. TBA, Ayuda, Aceleración y mínimos;
4. Acción / Movimiento / Reacción;
5. apilamiento y equivalencias;
6. Sintonización / RE / descanso;
7. Energía / Caudal / Estabilidad;
8. trampas, disparadores y rearme;
9. Alquimia, dosis y Saturación;
10. Investigación y Bloqueos;
11. concurrencia;
12. doble clic / reintentos / idempotencia;
13. guardado y reapertura;
14. multiusuario;
15. autoridad del DJ.

La auditoría reutiliza las regresiones de A–H y añade `test/craft-13-integral-audit.test.mjs` más casos cruzados en transacciones, Energía, economía de acciones y concurrencia real.

## Hallazgos reales

### I-01 — Preparar no era equivalente entre socket y fallback

La ruta GM de `craft-prepare` estaba duplicada y el fallback local no ejecutaba Preparar.

**Corrección:** una única rama GM y una rama local equivalente.

### I-02 — ventana PEI todavía permitía ejecutar crafting

El ledger prohibía `pei`, pero un personaje con `creation.status=building/rebuilding` todavía podía intentar Preparar/Reservar/Trabajar/Completar un Proyecto.

Esto reabría el exploit CRAFT-12:

**PEI -> equipo terminado -> desmantelar/fabricar antes de cerrar creación -> VI.**

**Corrección:** durante Creación/Reconstrucción el crafting no se ejecuta. Preview lo informa y Preparar, Reservar, Trabajo, Completar e Investigación lo bloquean. Liberar/Cancelar siguen disponibles para no atrapar reservas.

### I-03 — aprobación de Proyecto no era realmente sólo DJ

Ocultar el botón al jugador no impedía invocar la API de `craft-prepare`.

**Corrección:** la autoridad comprueba al solicitante. Sólo DJ puede pasar Borrador -> Preparado, por socket y en fallback local.

### I-04 — Investigación podía auto-adjudicarse

La ficha permitía seleccionar Éxito/Fallo/Pifia/Hazaña y la API aceptaba esa adjudicación de un propietario.

**Corrección:** sólo DJ puede resolver una etapa CRAFT-10. El jugador puede registrar trabajo, pero no elegir el resultado autoritativo ni utilizar `attemptKey` para autoeliminar un Bloqueo.

### I-05 — lectura incorrecta del total real de Foundry

Sobrecarga mágica, Sobrecarga de dispositivo y Carga forzada consultaban `roll.total`. `rollCheck()` devuelve el mensaje de chat y Foundry expone normalmente el total en `rolls[0].total`.

**Corrección:** las tres rutas usan una extracción compatible:

`rolls[0].total -> roll.total -> total`.

Las regresiones usan ahora la forma realista de ChatMessage sin `total` directo.

### I-06 — RE, Sintonización, trampas e Improntas tenían sólo lock local

CRAFT-13E protegía correctamente un cliente, pero dos clientes propietarios podían competir antes de persistir RE, capacidad de Sintonización o reclamación de evento.

**Corrección:** las mutaciones de crafting mágico pasan por una autoridad genérica del DJ:

- Sintonizar / Desintonizar;
- preparar trampa manual;
- insertar / extraer Piedra;
- activar Impronta;
- activar Encantamiento;
- abandonar Sostenimiento de objeto;
- disparar trampa;
- disparar Sello.

La autoridad serializa por Actor y, para trampas/Sellos automáticos, por objetivo del evento físico. Las solicitudes poseen recibos idempotentes.

### I-07 — Alquimia dependía del lock local de dosis

Una dosis contextual podía competir entre dos clientes. Además, la capa de Acción trataba todas las Fórmulas como una Acción, aunque CRAFT-11 contiene activaciones de 1 minuto y aplicaciones contextuales.

**Corrección:**

- consumo de dosis/Saturación se serializa mediante DJ;
- una Fórmula con activación Acción/Reacción usa esa economía;
- una Fórmula de 1 minuto no se comprime a una sola Acción de combate;
- una aplicación contextual no recibe un coste universal inventado;
- Fórmulas legadas sin `activation` conservan Acción como fallback de compatibilidad.

### I-08 — componente separable consumido perdía trazabilidad

El Proyecto podía reservar y consumir un componente físico separable, pero el objeto fabricado no conservaba un snapshot suficiente para devolverlo al desmantelar.

**Corrección:**

- `manufacture.separableComponents` conserva la procedencia física necesaria;
- Modificar/Reparar preservan esa trazabilidad;
- Desmantelar recrea el componente como objeto físico si el soporte no está Destruido;
- ese componente se excluye del VI genérico declarado para evitar doble recuperación;
- preview de Desmantelamiento muestra el componente por separado;
- no se convierte en moneda ni VI.

## Cobertura cruzada añadida

Las regresiones 13I prueban además:

- jugador propietario no puede Preparar;
- jugador propietario no puede adjudicar Investigación;
- DJ sí puede Preparar;
- fallback sin socket puede Preparar si el usuario es DJ;
- dos clientes no superan capacidad de Sintonización;
- dos clientes no gastan la misma Acción/RE de un Encantamiento;
- un evento físico concurrente descarga como máximo una trampa/Sello ordinario;
- una dosis contextual sólo se consume una vez;
- un Proyecto reservado sobrevive a guardado/reapertura y completa exactamente una vez;
- un componente separable vuelve como objeto y no como VI duplicado;
- reparar un acumulador no rellena Energía;
- PEI no entra en crafting durante creación/reconstrucción.

## Cobertura heredada obligatoria

13I mantiene verdes las pruebas anteriores para:

- barrido económico 1 c -> 1000 o;
- redondeos;
- piso 25% TBA;
- BRA;
- Calidad / CapM / Material Especial;
- equivalencias de Improntas/Encantamientos;
- RE 0 al Sintonizar y snapshot de Descanso Completo;
- Banco / Acoplador / Carga forzada / Sobrecarga;
- disparadores únicos;
- Neutralizante Antitóxico;
- Bloqueos y Réplica de Investigación;
- revisión optimista;
- reservas persistentes;
- recibos idempotentes;
- autoridad multiusuario.

## Criterio de cierre

CRAFT-13I sólo pasa a **CERRADA** si:

- `npm run audit:crafting` queda verde;
- `npm run validate` queda verde;
- no queda un hallazgo abierto de esta auditoría;
- la documentación refleja el comportamiento efectivo.

