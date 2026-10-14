# PROG-01M — Ablación factorial de efectos cooperativos

**Estado:** experimento no canónico. No altera Manual Maestro, técnicas, hechizos ni costes de PD.

## Diseño

El test `test/prog-01m-party-encounter.test.mjs` ejecuta las ocho combinaciones posibles de tres efectos del escenario: Información (foco), Medicina (prevención de hasta 2 puntos de daño) y Persuasión (omitir una Acción ofensiva enemiga). Los retos narrativos siguen disponibles en las ocho condiciones; sólo se activan o desactivan **sus consecuencias tácticas**. Esto evita confundir cumplir un objetivo con el efecto que el director atribuye a ese objetivo.

Se usan los cuatro niveles 5/10/15/20, diez semillas reproducibles por condición y tres políticas de amenaza: `most-exposed`, `highest-defense` y `random` (selección pseudoaleatoria determinista). **960 ejecuciones de ablación** (4 × 3 × 8 × 10). La salida íntegra se emite como `PROG01M_ABLATION`.

Se capturan medias por nivel, política y máscara de capacidades de supervivientes, daño recibido, objetivos completados y daño infligido. Se registra además el **número de consumos reales** de foco, prevención y negociación para detectar efectos que se habilitan pero no llegan a influir.

## Procedimiento de lectura

Para atribuir un efecto marginal a Medicina, por ejemplo, cotejar cada máscara que la incluye con la misma máscara sin Medicina, manteniendo nivel, política y semillas. Aplicar el mismo método a Investigación y Persuasión. Para buscar sinergias, confrontar la diferencia de «todo activo frente a nada» con la suma de aportes individuales; una divergencia puede proceder de interacciones y de turnos adicionales, no equivale automáticamente a explotación.

## Límites detectados en el modelo

- `random` es una política pseudoaleatoria del ensayo, no una IA genérica; hay que examinar su distribución de objetivos antes de declararla representativa.
- El objetivo de Investigación cambia la selección de un enemigo con menor Vida restante pero **no mejora el ataque**, por lo que puede no producir beneficios mensurables cuando el orden de focos coincide.
- Un objetivo de Medicina logrado puede no prevenir daño si después no ocurre ningún impacto válido.
- Persuasión evita un ataque enemigo hipotético; por su naturaleza su potencia depende del turno en que se activa.
- La tirada de cada actor y turno es determinista; las trayectorias, duración y acciones futuras pueden divergir legítimamente entre máscaras.
- No hay intervalos de confianza ni criterio canónico de balance. Los resultados no justifican tocar PD o reglas sin ampliación experimental.

## Estado

La prueba factorial está incorporada y pasó GitHub Actions (ejecución 38504096480). El registro completo contiene la matriz; **las diferencias numéricas todavía deben extraerse del artefacto `validation-log` antes de fijar conclusiones cuantitativas**.

Próxima tarea: persistir CSV/JSON de la matriz y elaborar comparaciones marginales y sinergias por política.
