# PROG-01N — Ablación pareada de integrantes

**Estado:** prueba experimental no canónica, validada en GitHub Actions 38505584759. Fuente: `test/prog-01n-expedition-chain.test.mjs` y artefacto `validation-log` del mismo run.

Se compararon 400 expediciones: cuatro niveles, dos políticas (adaptativa y fija), diez semillas, y cinco composiciones (cuatro perfiles completos y cuatro variantes sin un personaje). Los dados por desafío e intento se conservan en cada par. Las rutas alternativas sólo pueden elegir participantes presentes. Métricas: tiempo ficticio, suministros, desafíos completados y oportunidades perdidas.

## Aporte medido como reducción de oportunidades perdidas

Valor positivo = más obstáculos quedan pendientes cuando se retira el perfil. Cada cifra es una media de diez misiones.

| Nivel | Política | Marcial | Canalizador | Híbrido | Especialista |
|---:|---|---:|---:|---:|---:|
| 5 | Adaptativa | +0,2 | +0,7 | 0,0 | +1,2 |
| 5 | Fija | +0,2 | +0,8 | 0,0 | +1,1 |
| 10 | Adaptativa | +0,4 | +0,4 | 0,0 | +1,3 |
| 10 | Fija | +0,4 | +0,3 | 0,0 | +1,2 |
| 15 | Adaptativa | +0,4 | +0,1 | 0,0 | +1,7 |
| 15 | Fija | +0,5 | 0,0 | 0,0 | +1,4 |
| 20 | Adaptativa | +0,4 | +0,2 | 0,0 | +1,6 |
| 20 | Fija | +0,4 | 0,0 | 0,0 | +1,4 |

## Lectura crítica

El especialista tiene el mayor aporte marginal en **estos seis desafíos**, especialmente en investigación, sellos y negociación. El marcial ofrece una contribución positiva constante, aunque menor. El canalizador pierde exclusividad a niveles altos porque el especialista posee Arcana creciente. El híbrido exhibe contribución marginal cero bajo ambas políticas de selección: es una señal de **redundancia inducida por el diseño de retos y la elección determinista del modificador más alto**, no evidencia de inutilidad general de esa construcción.

**Advertencia sobre tiempo y suministros:** retirar un integrante puede *reducir* tiempo y conservar más suministros, incluso cuando aumenta la cantidad de obstáculos pendientes, porque los desafíos sin alternativas simplemente dejan de producir intentos. Por ejemplo en nivel 5 adaptativo, quitar canalizador disminuye tiempo medio 11,2 → 9,8 y suministros finales aumentan 2,4 → 3,8, pero oportunidades perdidas aumentan 1,3 → 2,0. Por eso no debe interpretarse «menos tiempo» como mejor resultado sin incluir objetivos cumplidos.

La batería **no** modela nuevos desafíos físicos donde el híbrido destaque, prohibición o limitación de acceso a habilidades, costes reales de equipo, negociación ramificada, ayuda simultánea, ni combinaciones completas de habilidades. El reparto de tareas favorece a quien tenga el mejor modificador; la ausencia de un perfil no equivale a una prueba de equilibrio general.

## Dictamen provisional y siguientes controles

La falta del especialista es la que más compromete completar esta expedición, mientras la del híbrido no cambia los resultados. **No modificar habilidades, PD, técnicas ni Manual Maestro.** Antes de emitir un dictamen de balance, añadir escenarios alternativos que recompensen movilidad, magia mixta, supervivencia bajo presión y versatilidad, comparar asignación con fatiga/coste de oportunidad, y penalizar explícitamente abandonar obstáculos sin intentarlos.
