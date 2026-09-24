# Auditoría integral final — Núcleo 1.0

Fecha de cierre: 2026-09-24.

## Resultado

El núcleo mecánico **Tierra Mágica / Foundry T.M. 1.0** queda considerado **completo y jugable**. La auditoría integral no mantiene bloqueos funcionales conocidos para una partida completa.

La fuente mecánica canónica continúa siendo `docs/Foundry_TM_Manual_1.0_Playtest.md`. Foundry implementa, valida y presenta esas reglas; no crea canon nuevo.

## Alcance verificado

La revisión final cruzó creación y progresión, derivados, iniciativa y turnos, Acción/Movimiento/Reacción, combate, defensas reactivas, Vida 0/Trauma, magia, Sostenimiento, Alquimia, dispositivos, Ritualismo, Familiares, descansos y recuperación.

También se probaron interacciones entre subsistemas y secuencias abusivas: doble activación concurrente, ataque+magia, Guardia+magia, fórmulas/dispositivos concurrentes, reacciones simultáneas, hechizos reactivos, Familiar+propietario, rebobinado/duplicación de turno, caída a 0 Vida y recuperación posterior.

## Cierres de la auditoría integral

- Acción usa una autoridad transversal para ataques, Guardia, magia no reactiva, fórmulas, dispositivos y órdenes/capacidades de Familiar que la consumen.
- Reacción usa una autoridad transversal para Parada, Contramagia, Recibir Carga, Intercepción, magia reactiva y respuestas del Familiar.
- Un Actor Incapacitado o a 0 Vida no puede iniciar Acción/Reacción ni recibe economía nueva al comenzar turno.
- La primera caída real de un PJ desde Vida positiva a 0 aplica Incapacitado y Trauma 0→1; caídas posteriores no escalan Trauma automáticamente.
- Recuperar Vida por encima de 0 retira Incapacitado mediante la autoridad de recursos, sin borrar Trauma.
- Respiro, Descanso y Descanso Completo respetan los límites canónicos y no convierten estados narrativos en curaciones adicionales.
- Maná, dosis/Saturación y Energía quedan protegidos por la economía y bloqueos de resolución correspondientes.
- Sostenimiento, objetivos mágicos, daño, Barrera Cinética y lanzamientos automáticos tienen una única autoridad funcional.
- Familiares no reciben un segundo turno, Acción/Reacción o reserva de Maná.
- Rebobinar turno o duplicar Combatants no permite cultivar Acciones/Reacciones adicionales dentro de la misma ronda.

## Limitaciones deliberadas

No se automatizan reglas que el canon no parametriza suficientemente: geometría frontal, ciertas áreas/alcances narrativos, consecuencias concretas de Heridas Graves/Pifias, categorías contextuales de Piel Alterada, Potencia Sobrenatural, aportes físicos reales de asistentes/fuentes rituales y otros efectos narrativos. Son límites conscientes, no deuda funcional.

Tampoco forman parte del núcleo 1.0 ampliaciones potenciales como vehículos, mercados, proyectos, monturas, autómatas, agarres avanzados o un subsistema completo de encaramiento.

## Validación

La batería automatizada cubre reglas unitarias, integración y regresiones de exploits. El cierre se apoya en una ejecución verde del flujo de validación posterior a las correcciones de recuperación/0 Vida, además de las regresiones consolidadas en el repositorio.

## Criterio de mantenimiento

Desde este cierre, un cambio del núcleo requiere al menos uno de estos motivos:

1. defecto reproducible;
2. contradicción con el Manual 1.0;
3. hueco funcional demostrado durante una partida;
4. decisión explícita de diseño consolidada primero en el Manual.

Las ampliaciones de catálogo o subsistemas no se incorporan preventivamente.

## Estado final

**Núcleo 1.0 completo y jugable.** A1–A9 y la auditoría integral quedan cerrados. El trabajo posterior corresponde a mantenimiento, documentación, contenido o futuras versiones, no a completar el núcleo 1.0.
