# PROG-01M — Comparación pareada de consecuencias tácticas

**Estado:** prueba automatizada aprobada en CI; resultados cuantitativos reproducibles mediante `PROG01M_PAIRED_TACTICS` en la salida completa de validación. **No canónico.**

## Protocolo

La prueba `test/prog-01m-party-encounter.test.mjs` ejecuta en niveles 5, 10, 15 y 20, con 10 semillas por nivel, la misma partida cooperativa dos veces: (A) objetivos habilitados **con** consecuencias tácticas, (B) mismos objetivos y acciones del especialista **sin** esas consecuencias. Total: **40 pares, 80 ejecuciones**.

La iniciativa permanece igual dentro del par. Los dados se obtienen de flujos deterministas por **turno, actor y tipo de acción**, y por eso omitir una Acción enemiga por Persuasión no desplaza arbitrariamente las tiradas de otros personajes. Se evita el sesgo de consumo de RNG que tenía el simulador original. No obstante, la secuencia de decisiones y la duración del combate **sí pueden cambiar**, como consecuencia legítima del tratamiento.

Se computan las siguientes medias por nivel en cada condición y su diferencia A - B:
- supervivientes del grupo,
- puntos de Vida efectivos perdidos por el grupo,
- objetivos conseguidos por el especialista,
- daño efectivo infligido a adversarios.

Se calculan también eventos de acción omitida por negociación, absorción de daño de triage y prioridad informativa. **No debe imponerse igualdad de objetivos** en el par: la duración cambiante puede impedir o permitir que el especialista cumpla más hitos. Esa observación motivó un ajuste de la prueba, después de una ejecución roja legítima por un supuesto experimental incorrecto.

## Resultados y límites

Los datos numéricos completos se imprimen bajo `PROG01M_PAIRED_TACTICS` durante las pruebas; los registros completos están en el artefacto `validation-log` de GitHub Actions. Este informe no transcribe cifras de los logs que no hayan sido recuperadas y verificadas en esta sesión.

La comparación aísla las **consecuencias guionizadas** de Investigación, Medicina y Persuasión, no el valor intrínseco o canónico de las habilidades. Los objetivos pueden resolverse a distinto ritmo si los encuentros terminan antes. Persisten limitaciones de IA, posicionamiento unidimensional, repertorio incompleto y los enemigos moderados no canónicos.

**Dictamen:** las diferencias de esta prueba sólo valen para este benchmark cooperativo, no justifican cambios en PD, hechizos, economía de turnos ni Manual Maestro.
