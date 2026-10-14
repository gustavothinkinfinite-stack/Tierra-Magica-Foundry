# PROG-01M — Reacciones y objetivos tácticos cooperativos

**Estado: laboratorio NO CANÓNICO.** Este documento explica el alcance de `test/prog-01m-party-encounter.test.mjs`. No altera el Manual Maestro ni crea reglas de Medicina, Persuasión o Investigación.

## Recuperación correcta de Reacción

El ensayo deja de regenerar Reacciones al inicio de cada ronda. Cada personaje lleva `reactionReady`, que pasa a verdadero **al comenzar su propio turno**. Parada lo consume y no puede repetirse hasta el siguiente turno propio. El registro `reactionEvents` audita cada refresco y gasto, y las pruebas comprueban que no se duplican gastos entre refrescos. Esto evita que una ronda conceda una Reacción nueva antes del turno de quien todavía no la ha recuperado. Las Reacciones de enemigos no forman parte de este ensayo.

## Consecuencias de objetivos (efectos de guion, no habilidades concedidas por canon)

Cada logro necesita una Acción del especialista y una tirada de habilidad contra DF experimental 17. Los efectos sólo existen en el **escenario de referencia** y se anotan en `tacticalEvents`:

| Objetivo superado | Efecto de escenario | Consumo |
|---|---|---|
| Información (Investigación) | Permite seleccionar para el próximo ataque acertado al adversario con menor Vida restante (prioridad de foco) | Una selección acertada |
| Preparación médica (Medicina) | Material defensivo preparado para prevenir hasta 2 de daño en el siguiente golpe recibido, sin curación retroactiva | Un golpe que cause daño |
| Negociación (Persuasión) | Un adversario renuncia a su siguiente Acción ofensiva en este escenario | Una Acción enemiga |

Estas consecuencias **no son bonificaciones generales de habilidad**, técnicas, efectos de conjuros ni reglas oficiales: modelan objetivos del director con repercusiones concretas y acotadas. Los efectos se asignan al alcanzar el objetivo y se registran al aplicarse.

## Criterios y límites

La batería ejecuta escenarios reproducibles en niveles 5, 10, 15 y 20. Controla la economía de Acción de los cuatro personajes, refrescos de Reacción al turno, eventos de objetivos, recursos no negativos y políticas de amenazas. Sigue habiendo posiciones 1D, IA mínima, ataques y hechizos básicos e iniciativa fijada al comienzo del encuentro. El hecho de aprobar tests no permite declarar balance global satisfactorio.

Siguiente medición necesaria: cuantificar de forma pareada la supervivencia/daño/objetivos con y sin efectos tácticos, y validar en Foundry real las Reacciones durante turnos y rondas.
