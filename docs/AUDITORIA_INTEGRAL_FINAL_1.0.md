# Auditoría integral final — Núcleo 1.0

Fecha de cierre: 2026-09-24.

## Resultado

El núcleo mecánico **Tierra Mágica / Foundry T.M. 1.0** queda considerado **completo y jugable**. La auditoría integral no mantiene bloqueos funcionales conocidos para una partida completa.

La fuente activa única para reglas, creación, canon narrativo y desarrollo editorial es `docs/Tierra_Magica_Manual_Maestro.md`, conforme a `docs/FUENTES_CANONICAS.md`. Foundry implementa, valida y presenta esas reglas; no crea canon nuevo.

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

## Sincronización documental posterior — 2026-09-27

Se unificó la jerarquía de fuentes en `docs/FUENTES_CANONICAS.md` y se propagaron al Manual Básico 1.0 y al Manual Maestro los elementos de continuidad ya fijados por **Canon del Mundo v1.2**: Saturación Mágica juvenil, Cristales de Resonancia, naturaleza/permanencia de los Familiares y Panteón Central de siete Primordiales más cinco Luminarias.

También se incorporó al Manual Básico la enumeración explícita de los **18 hechizos** que la auditoría A4 y la implementación 1.0.14 ya trataban como catálogo mecánico estable. Esta sincronización corrige documentación suelta; no abre subsistemas nuevos ni cambia los cierres mecánicos de la auditoría.

Los manuales v0.2, el Canon v1.1 y la auditoría 1.0.11 quedan clasificados como material histórico/sustituido cuando contradicen las fuentes maestras.

## Sincronización post-CREA-13 — 2026-10-01

CREA-12 y CREA-13 fueron integradas posteriormente sin reabrir la declaración de núcleo 1.0 completo y jugable.

- **CREA-12** consolidó derivados, Movimiento cuantificado, equipo/Protección, contexto defensivo y reconciliación de Vida/Maná mediante una única autoridad preparada.
- **CREA-13** validó siete perfiles completos de personaje, secuencias funcionales, daño/recuperación/economía y persistencia/reversibilidad. Su cierre incorporó schema v3 para dispositivos, fuente energética explícita, compra física centralizada, identidad alquímica por `slug` y arbitraje compartido de Energía/defensa cinética.
- La PR #25 terminó con validación verde sobre su head revisado antes del squash e integración en `main`.
- Las limitaciones deliberadas siguen siendo limitaciones de parametrización/canon, no tareas implícitas que deban automatizarse por inferencia.

En el momento de ese cierre no existía una fase **CREA-14** definida. Posteriormente, por decisión explícita de proyecto, CREA-14 se abrió para cerrar la **autosuficiencia de creación de nivel 1** sin reabrir el núcleo de resolución. Su resultado queda documentado en `docs/archive/creacion/CREA-14_CIERRE_AUTOSUFICIENCIA_CREACION.md`.

## Sincronización racial posterior — 2026-10-03

Por decisión explícita de proyecto, la resolución histórica **A5 — Pueblos y Orígenes** fue sustituida por **12 paquetes raciales jugables v0.3** integrados directamente en `docs/Tierra_Magica_Manual_Maestro.md`.

Este cambio no convierte las auditorías históricas en fuente paralela: la autoridad racial vigente está sólo en el Manual Maestro. `docs/archive/audits/A5_PUEBLOS_ORIGENES.md` quedó reducido a marcador histórico y remisión.

La nueva arquitectura mantiene separadas raza, cultura, Origen, profesión, religión, personalidad y moral; los paquetes raciales se equilibran aparte de 25 PD y 3 PR generales y no conceden por defecto rangos de Habilidad ni aumentos generales de Atributo.

## Sincronización post-CREA-14 — 2026-10-04

CREA-14 cierra la autosuficiencia de creación de nivel 1: identidad estructurada, idiomas y Facetas, Rasgos de creación, Perfiles Iniciales de Familiar, PEI mediante Compra libre, derivación automática del Bono Defensivo y ejemplo completo de PJ.

La fase no modifica la arquitectura central de resolución 2d10, economía de Acción/Reacción, Vida/Trauma, magia, Sostenimiento, alquimia o dispositivos. Añade contenido y validaciones de creación donde antes existían huecos editoriales o datos que requerían inferencia externa.

La validación automática de `main` quedó verde después de estas integraciones.

## Sincronización post-CREA-15 — 2026-10-04

CREA-15 cierra la autosuficiencia de progresión ordinaria de personajes entre niveles 2 y 20 sin modificar las reglas ya fijadas por el Manual Maestro.

Foundry deja de tratar nivel y Atributos post-creación como campos de desarrollo editables libremente: el nivel avanza de uno en uno hasta 20, los Atributos usan sus costes canónicos por paso y el gasto de Habilidades se valida contra el presupuesto global de PD después de contar Atributos e Items adquiridos. La reconstrucción autorizada preserva progresión pagada y el PEI descartado no reaparece después de creación.

El cierre queda documentado en `docs/archive/creacion/CREA-15_CIERRE_AUTOSUFICIENCIA_PROGRESION.md` y protegido por regresiones específicas.

## Aclaración de implementación posterior — 2026-10-10

El cierre histórico describe una **autoridad transversal de Acción/Reacción** que, en aquella implementación, bloqueaba usos repetidos. Esa descripción no debe utilizarse como guía de interfaz actual: desde **v1.5.2**, por decisión registrada en `docs/FUENTES_CANONICAS.md`, Foundry muestra **marcadores manuales** de Acción y Reacción y no bloquea automáticamente operaciones por haber marcado esos indicadores como gastados. Los jugadores y el DJ aplican los límites de la economía de turno. Se mantienen las validaciones propias de las operaciones (recursos, objetivos, Incapacitado según la operación, etc.). Esta aclaración no altera las reglas canónicas del Manual Maestro ni reescribe retroactivamente las pruebas del cierre 1.0.

## Estado final

**Núcleo 1.0 completo y jugable.** A1–A9 y CREA-09 a CREA-15 quedan integrados o cerrados según su documentación específica. El trabajo posterior corresponde a mantenimiento, documentación, contenido o futuras versiones explícitamente definidas, no a completar el núcleo 1.0.
