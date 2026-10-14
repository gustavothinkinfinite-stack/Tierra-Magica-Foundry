# PROG-01N — Dictamen consolidado de auditoría no bélica

**Fecha:** 14 de octubre de 2026. **Estado:** fase experimental cerrada con limitaciones explícitas; **no es certificación de equilibrio canónico**. Reglas, PD y Manual Maestro permanecen sin modificaciones.

## Cobertura efectivamente ejecutada

Pruebas de PROG-01N: `test/prog-01n-noncombat-missions.test.mjs`, `test/prog-01n-persistent-missions.test.mjs`, `test/prog-01n-expedition-chain.test.mjs`, `test/prog-01n-versatility-expedition.test.mjs`. Se validaron rangos nominales contra PROG-01G, continuidad de escenas, costes de fracaso/abandono, variaciones de política de asignación, ablaciones de personajes, rutas de dos comprobaciones y dificultad. La última batería pasó en [GitHub Actions 38506475761](https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/38506475761); datos en su artefacto `validation-log`, marcadores `PROG01N_VERSATILITY`, `PROG01N_SENSITIVITY` y `PROG01N_COVERAGE`.

## Corrección de métricas

La salida antigua `PROG01N_VERSATILITY.full.completed` etiquetaba incorrectamente `lostOpportunities`; se corrigió para exponer por separado `full.lost` y `full.completed` real. **Los datos anteriores no deben interpretarse como desafíos completados.**

## Aporte marginal de retirar al híbrido

Diferencia en obstáculos abandonados contra grupo completo, política de selección de **máxima probabilidad conjunta** (dificultades hipotéticas 13, 16, 19):

| DF | Nivel 5 | Nivel 10 | Nivel 15 | Nivel 20 |
|---:|---:|---:|---:|---:|
| 13 | 0 | 0 | 0 | 0 |
| 16 | 0 | 0 | 0 | 0 |
| 19 | 0 | 0 | 0 | 0 |

Para comparación, la retirada del especialista incrementa abandonos en +0,2/+0,2/+0,2/+0,1 con DF13; +1,2/+0,6/+0,6/+0,3 con DF16; y +1,7/+1,8/+2,0/+1,2 con DF19, en orden de niveles 5, 10, 15, 20. La sensibilidad de la prueba de dificultad identifica diferencias reales entre perfiles en esta expedición, pero NO significa que estos efectos sean propios del canon.

## Cobertura efectiva y problema crítico del banco

**El híbrido ejecuta exactamente 0 acciones en las 120 expediciones de equipo completo del control de probabilidad conjunta** (3 DF × 4 niveles × 10 semillas). Los contadores `PROG01N_COVERAGE` verifican ese resultado. No es una tasa de fallo del híbrido: **nunca es seleccionado**. Las rutas mixtas requieren dos éxitos y, cuando se permite una ruta física o mágica de chequeo único, ésta tiene más probabilidad de superar el obstáculo. Por tanto, este fixture **no mide la eficacia ni el poder del híbrido** y no sustenta ajustes de PD o de clases.

En DF 16 y nivel 5, la política probabilística completa abandona 0,2 desafíos de promedio contra 0,3 de la política original por modificador medio. En DF 19, nivel 10: 0,4 contra 0,7. Son mejoras de política experimental, no cambios en los personajes.

## Resultados del coste de abandono

Cada abandono cobra dos unidades ficticias de tiempo, una oportunidad perdida y hasta un suministro disponible. La batería comprueba que `abandonmentTime = 2 * lostOpportunities`, que `supplies + abandonmentSupplies = 5`, que los recursos nunca son negativos y que ningún actor excluido ejecuta una acción. En DF 19 los abandonos medios del grupo completo son 1,3 / 0,4 / 0,2 / 0,0 en niveles 5/10/15/20; se concentran en mediación y, en nivel 5, también aparecen en pasarela y puerta energizada.

## Dictamen

1. Las pruebas verifican la continuidad logística y contabilización de consecuencias entre escenas.
2. La gestión del riesgo y la composición de grupo cambian el coste de expedición.
3. Las tareas diseñadas favorecen al especialista, mientras el híbrido queda **no evaluado** porque nunca recibe Acciones en el control más exigente.
4. **No se detectó evidencia suficiente de desequilibrio canónico**. No equivale a demostrar equilibrio.
5. **PROG-01N se cierra como auditoría experimental, con una reserva técnica expresamente registrada**. Queda abierta una prueba futura en Foundry real que incluya rutas donde el uso combinado de capacidades sea justificadamente necesario por la ficción, sin imponer doble chequeo asimétrico y sin fabricar un beneficio gratuito para el híbrido.

### Exclusiones

No se han validado viajes/relojes/suministros en el motor real, mapas bidimensionales, retos sociales ramificados, economía canónica de equipo, ayudas entre compañeros ni consecuencias largas de campaña. Los umbrales DF 13/16/19, la penalización por abandono y la reserva de suministros son parámetros del ensayo, no canon.
