# PROG-01M — Encuentro cooperativo de cuatro personajes

**Estado:** escenario experimental, NO CANÓNICO. Fuente ejecutable: `test/prog-01m-party-encounter.test.mjs`.

El ensayo reúne marcial, canalizador, híbrido y especialista contra dos enemigos de la escala moderada de `test/fixtures/prog-01m-calibrated.mjs`, en niveles 5, 10, 15 y 20, con diez semillas para cada nivel (40 encuentros). Se calcula Iniciativa individual 2d10+PER para los seis participantes, orden de actuación estable por ronda, una Acción por personaje vivo y máximo una Reacción por ronda en el control. Los ataques enemigos utilizan una política seleccionable: priorizar al aliado con menos Vida actual o a quien tenga mayor Defensa; ambos enemigos comparten el conjunto de aliados disponibles. Los actores se aproximan sobre un eje posicional 1D.

**Objetivos cooperativos:** información mediante Investigación, triage mediante Medicina y negociación mediante Persuasión, cada uno con DF experimental 17. El especialista usa su Acción para intentar un objetivo pendiente, sin crear bonificadores ficticios al daño ni restaurar Vida fuera de una regla implementada. La elección rota entre los objetivos disponibles. El control sin cooperación abandona estas tareas y sólo intenta combatir. Se registra cuántos objetivos se cumplen, daño, Vida perdida, supervivientes, hechizos, paradas y enemigos incapacitados.

### Limitaciones deliberadas

- No equivale a una partida completa de Foundry: mapa 1D, dos amenazas con IA mínima, sin técnicas avanzadas, cobertura de equipo exhaustiva, casillas 2D, traumas ni controles de línea de visión complejos.
- La Recuperación de Reacción es una aproximación **por ronda**, no una implementación literal de recuperar al inicio de cada turno propio. Esta limitación debe corregirse antes de utilizar el escenario para auditar Reacciones.
- El canalizador prioriza un hechizo básico y el híbrido ataque físico; estos comportamientos no agotan sus repertorios.
- Los objetivos narrativos pueden cumplirse independientemente de la derrota de los enemigos; se evalúan en ejes distintos. Medicina no cura puntos de Vida: representa la resolución de una necesidad del escenario.

### Criterio del control

Se comprueba invariantes de recursos, acción por turno, reproducción de semillas, divergencia por políticas de amenaza y ventaja del grupo que dedica acciones del especialista a objetivos narrativos. Los resultados detallados se publican mediante `PROG01M_PARTY` en salida de la prueba. **No dictaminar equilibrio canónico** por el éxito de estos tests.

Siguiente paso: integración del efecto de objetivos en el estado del encuentro con apoyo real del motor, e iniciativa/Reacción exactas, además de nuevos adversarios y daño de área con aliados.
