# PROG-01L — Ensayo multienemigo controlado y comparación acumulada

**Estado:** ensayo automatizado aprobado en CI, **no** balance canónico ni combate íntegro de Foundry. Fuente ejecutable: `test/prog-01l-multi-enemy.test.mjs`. Corrida: https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/38496523215.

## Configuración

Dos bandidos con Vida 12, Defensa 13, Protección 1, ataque +4 y daño 6 (referencia del Manual Maestro). Seis rondas **máximas**, orden fijo enemigo A → PJ → enemigo B, 2d10 representados por secuencias de sumas fijas. El atacante usa lanza o Proyectil Ígneo si lo conoce; Parada y Barrera Cinética pueden emplear una única Reacción por ronda. Un escenario adicional **bloquea la línea de visión de los hechizos directos** hasta alcanzar la posición de despeje (x >= 2); no pretende definir una regla universal de cobertura. Distancias y aproximación están simplificadas. **No se ha modelado un auténtico desempate de Iniciativa, la IA rival, la geometría completa, daños críticos ni exploración de todas las decisiones.** Los datos del obstáculo son una hipótesis de escenario, no una regla del Manual.

## Resultados deterministas — estrategia predeterminada

| Perfil | Escenario | Rondas | Acciones del PJ | Daño infligido total (incluye exceso de daño) | Daño recibido nominal | Maná gastado | Vida final | Bandidos a 0 |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Marcial | Abierto | 4 | 4 | 28 | 6 | 0 | 8 | 2 |
| Canalizador | Abierto | 1 | 1 | 6 | 12 | 6 | 0 | 0 |
| Híbrido | Abierto | 4 | 4 | 28 | 6 | 0 | 8 | 2 |
| Especialista | Abierto | 2 | 1 | 0 | 18 | 0 | 0 | 0 |
| Marcial | Obstáculo | 4 | 4 | 28 | 6 | 0 | 8 | 2 |
| Canalizador | Obstáculo | 1 | 1 | 0 | 12 | 3 | 0 | 0 |
| Híbrido | Obstáculo | 4 | 4 | 28 | 6 | 0 | 8 | 2 |
| Especialista | Obstáculo | 2 | 1 | 0 | 18 | 0 | 0 | 0 |

**Nota:** daño recibido nominal puede exceder la Vida previa al impacto; el contador de Vida sí está limitado a 0. Daño infligido puede exceder Vida restante; por tanto, no debe interpretarse como daño efectivo sin desperdicio.

**Variante del híbrido obligando hechizos cuando hay Maná:** 5 rondas, 5 acciones, 25 daño infligido, 12 recibido, 12 Maná gastado, 2 Vida final, dos bandidos incapacitados. Contrasta con la estrategia de lanza: cuatro rondas, 28 daño nominal, 6 daño recibido y 0 Maná gastado.

## Interpretación

En este control, el marcial y el híbrido obtienen resultados idénticos cuando priorizan la lanza. El híbrido no supera al marcial simplemente por conocer magia; en la variante lanzadora **gasta todos sus 12 puntos de Maná y recibe más daño**. El canalizador es vulnerable a dos atacantes que alcanzan distancia cuerpo a cuerpo; la dependencia de línea de visión y el coste reactivo de Barrera Cinética reducen todavía más su eficiencia. El especialista no está construido para combatir con lanza y no debe clasificarse por esta escena como inferior en su función general.

Este resultado **no prueba** la superioridad general del marcial/híbrido ni una falla del sistema: usa orden de iniciativa fijo deliberadamente desfavorable para parte de los perfiles, enemigos con comportamiento limitado, equipamiento homogéneo no óptimo y una sola secuencia de dados.

## Siguientes requisitos antes de balance

1. Ejecutar múltiples secuencias y órdenes de iniciativa sin inventar una bonificación de empate.
2. Simular cobertura, posición y alcance con el motor real o reglas canónicas completamente traducidas.
3. Incorporar equipo y protección elegidos legalmente y política de Reacciones por amenazas.
4. Repetir en niveles 5/10/15/20 con criaturas pertinentes, y casos de utilidad no combativa.
5. Integrar medición de exceso de daño versus daño efectivo.

**Canon intacto:** este informe no introduce cambios al Manual Maestro.
