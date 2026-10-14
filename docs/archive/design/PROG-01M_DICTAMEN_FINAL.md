# PROG-01M — Dictamen final de balance táctico experimental

**Fecha de análisis:** 14 de octubre de 2026. **Estatus:** PROG-01M cerrado como auditoría de banco experimental, NO como certificación de balance canónico. **Reglas y Manual Maestro: intactos**.

## Evidencia

Se recuperó el artefacto `validation-log` de [GitHub Actions 38504096480](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/38504096480), prueba `PROG01M_ABLATION`: cuatro niveles (5, 10, 15, 20), ocho máscaras de efectos (sin efectos, individuales, pares, todos), tres políticas enemigas y diez semillas: **960 encuentros simulados**. Los retos narrativos del especialista permanecen en todas las condiciones; sólo cambian las consecuencias tácticas guionizadas.

### Efectos individuales: daño medio evitado al activar sólo cada efecto respecto de la máscara cero

| Nivel | Política | Investigación | Medicina | Persuasión |
|---|---|---:|---:|---:|
| 5 | Más expuesto | 0 | 0 | 0 |
| 5 | Mayor Defensa | 0 | 0 | 0 |
| 5 | Aleatoria experimental | 0 | 0 | 0 |
| 10 | Más expuesto | 0 | 0 | 2,0 |
| 10 | Mayor Defensa | 0 | 0 | 0 |
| 10 | Aleatoria experimental | 0 | 0 | 1,5 |
| 15 | Más expuesto | 0 | 1,6 | 3,4 |
| 15 | Mayor Defensa | 0 | 0,4 | 0,8 |
| 15 | Aleatoria experimental | 0 | 0,8 | 3,4 |
| 20 | Más expuesto | 0 | 2,6 | 3,4 |
| 20 | Mayor Defensa | 0 | 2,9 | 3,8 |
| 20 | Aleatoria experimental | 0 | 2,5 | 2,9 |

### Efectos combinados: daño recibido sin / con tres efectos

| Nivel | Más expuesto | Mayor Defensa | Aleatoria experimental |
|---|---|---|---|
| 5 | 5,4 / 5,4 | 2,0 / 2,0 | 4,8 / 4,8 |
| 10 | 10,3 / 8,3 | 3,0 / 3,0 | 8,1 / 6,6 |
| 15 | 18,4 / 14,0 | 6,8 / 5,6 | 15,4 / 11,8 |
| 20 | 39,4 / 34,1 | 25,0 / 17,4 | 41,7 / 36,5 |

En nivel 20, supervivientes medios sin/con todas las consecuencias: **más expuesto 1,5 / 1,8; Mayor Defensa 2,6 / 3,2; aleatoria experimental 1,5 / 1,7**.

## Marginalidad e interacciones

El contraste factorial permite comparar la contribución marginal de un efecto al añadirlo a cada una de las cuatro configuraciones que no lo contienen, manteniendo nivel, política y semillas. **Investigación presenta marginal cero en daño recibido en toda la matriz**, aunque el registro puede informar `focused-hit`: la activación no equivale a impacto táctico cuantificable. **Medicina y Persuasión tienen eficacia positiva en múltiples escenarios**. Sus aportes no son siempre aditivos porque evitar una Acción enemiga puede cambiar el daño que después podría prevenir Medicina, además de los turnos disponibles y los objetivos logrados. Ejemplo: nivel 20, «más expuesto»: Medicina sola evita 2,6, Persuasión sola 3,4 (suma 6,0) y las tres juntas 5,3; diferencia **-0,7** frente a esa suma. Nivel 20 «Mayor Defensa»: 2,9 + 3,8 = 6,7 mientras todas evitan 7,6; diferencia **+0,9**. Son interacciones moderadas y dependientes de política, **no evidencia de una combinación explotable**.

## Hallazgos y cautelas

1. En esta muestra, la consecuencia experimental de **Persuasión** (omitir un ataque) es la que más daño previene. No implica que la habilidad canónica otorgue esa posibilidad.
2. **Medicina** aporta prevención directa y limitada; puede no activarse si no hay daño posterior.
3. **Investigación** puede seleccionarse y consumirse sin alterar cifras de supervivencia o daño; esto identifica una limitación del diseño del escenario o de la utilidad de foco, no una debilidad canónica de Investigación.
4. La política `random` es una función determinista muy simplificada (y su selección debe auditarse para descartar correlaciones de nombre); no representa una IA táctica general.
5. Las medias provienen de **diez semillas por celda**, adversarios moderados no canónicos, mapa 1D, IA simple y repertorio incompleto; no se estiman intervalos de confianza ni se establece umbral oficial de aceptación.
6. Las consecuencias de objetivos fueron inventadas como **recompensas propias del encuentro de prueba**, nunca como reglas oficiales. No permiten evaluar balance económico de PD directamente.

## Dictamen final

**PROG-01M: cierre de la fase de auditoría experimental con pruebas automatizadas aprobadas y matriz de ablación consolidada.** **No se detectó evidencia suficiente de un desequilibrio canónico que justifique cambiar reglas**, costes de PD, requisitos o Manual Maestro. Tampoco está demostrada la equivalencia de poder entre arquetipos: persisten limitaciones importantes del banco de pruebas.

**Siguiente fase propuesta:** PROG-01N para exploración, investigación, escenas sociales, economía de acciones de apoyo y encuentros cooperativos en Foundry con terreno 2D, adversarios más variados y reacciones verificadas sobre el motor real. Corregir o enriquecer la política pseudoaleatoria antes de tratarla como modelo de selección imparcial. Las reglas canónicas continúan congeladas.
