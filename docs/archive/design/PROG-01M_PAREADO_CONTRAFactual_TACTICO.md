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


## Matriz numérica recuperada de la ejecución aprobada

**Origen:** artefacto `validation-log` de GitHub Actions [38503414215](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/38503414215), salida `PROG01M_PAIRED_TACTICS`. Diez pares por nivel. Cada cifra es la media por ejecución para los escenarios de ese nivel.

| Nivel | Supervivientes con/sin | Diferencia supervivientes | Daño recibido con/sin | Daño evitado medio | Objetivos con/sin | Daño infligido con/sin |
|---:|---:|---:|---:|---:|---:|---:|
| 5 | 4,0 / 4,0 | 0,0 | 5,4 / 5,4 | 0,0 | 1,3 / 1,3 | 24,0 / 24,0 |
| 10 | 3,8 / 3,5 | +0,3 | 8,3 / 10,3 | 2,0 | 1,8 / 1,9 | 32,0 / 32,0 |
| 15 | 3,3 / 3,0 | +0,3 | 14,0 / 18,4 | 4,4 | 2,9 / 2,9 | 40,0 / 40,0 |
| 20 | 1,8 / 1,5 | +0,3 | 34,1 / 39,4 | 5,3 | 2,6 / 2,4 | 46,8 / 45,6 |

Los promedios permiten afirmar que hay una reducción del daño recibido en niveles 10–20 para estas diez semillas. No se publican intervalos de confianza ni se afirma significación estadística: la muestra es pequeña, determinista, y los parámetros fueron diseñados como control de laboratorio.

**Lectura:** en nivel 5 el encuentro termina sin que las consecuencias produzcan una mejora visible. En niveles 10–20 la mejora observable está concentrada en supervivencia y mitigación, no en daño causado. En nivel 10 los objetivos completados bajan de 1,9 a 1,8 por cambios en la duración y oportunidades de turno; no es un error de RNG. La Vida y el daño enemigos, los retos DF 17 y los efectos de preparación/negociación son hipótesis del fixture, no canon.

### Próxima auditoría

Comprobar para cada objetivo las activaciones, consumos y daño efectivamente evitado; separar aportes de Investigación, Medicina y Persuasión, y aumentar la variedad de escenarios. La presente matriz no justifica alterar reglas canónicas.

## Resultados y límites

Los datos numéricos completos se imprimen bajo `PROG01M_PAIRED_TACTICS` durante las pruebas; los registros completos están en el artefacto `validation-log` de GitHub Actions. La matriz anterior transcribe las cifras ya recuperadas y verificadas del artefacto de CI.

La comparación aísla las **consecuencias guionizadas** de Investigación, Medicina y Persuasión, no el valor intrínseco o canónico de las habilidades. Los objetivos pueden resolverse a distinto ritmo si los encuentros terminan antes. Persisten limitaciones de IA, posicionamiento unidimensional, repertorio incompleto y los enemigos moderados no canónicos.

**Dictamen:** las diferencias de esta prueba sólo valen para este benchmark cooperativo, no justifican cambios en PD, hechizos, economía de turnos ni Manual Maestro.
