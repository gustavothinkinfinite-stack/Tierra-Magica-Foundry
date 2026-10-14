# PROG-01L — Matriz de balance y puertas hacia niveles superiores

**Estado:** evaluación técnica de diseño, no canónica. Referencias ejecutables: `test/prog-01l-seeded-equipment.test.mjs` y `test/prog-01l-specialized-loadouts.test.mjs`.

## Comparabilidad de experimentos

| Ensayo | Escenarios por arquetipo | Equipamiento | Qué aísla |
|---|---:|---|---|
| PROG-01L-3 | 90 | Lanza y armadura ligera/reforzada/malla | Semillas, orden de turnos, protección con equipo homogéneo |
| PROG-01L-4 | 30 | Marcial: lanza/pesada; canalizador: daga/reforzada; híbrido: lanza/malla; especialista: daga/malla | Efecto de equipo especializado y estrategias mágicas |

**Precaución:** los porcentajes de victoria de estos ensayos no se deben mezclar directamente, porque el equipamiento y el conjunto de escenarios difieren. Las métricas se calculan por ejecución, nunca se toma un promedio de promedios con distintos denominadores.

## Métricas exigidas

- **Supervivencia:** ejecuciones con Vida final positiva / total.
- **Victoria:** ejecuciones donde los dos oponentes llegan a Vida 0 / total.
- **Daño efectivo:** suma de daño que realmente reduce Vida (sin exceso).
- **Daño recibido:** suma de pérdidas de Vida efectivas.
- **Maná usado:** reserva inicial menos reserva final.
- **Enemigos incapacitados:** promedio entre 0 y 2.

Los tests calculan estos valores y comprueban que los agregados coincidan con las ejecuciones subyacentes. Los valores numéricos deben extraerse de ejecución reproducible y conservarse en el informe; **no se incluyen cifras no verificadas**.

## Hallazgos respaldados por los tests

1. **Simetría controlada:** con la política exclusivamente marcial y mismo equipo, el marcial y el híbrido ofrecen los mismos resultados en las 90 escenas del primer ensayo. Esto es una propiedad del modelo, no una prueba de equilibrio general.
2. **Elecciones mágicas:** en el segundo ensayo se contrasta al híbrido físico con el híbrido que prioriza Proyectil Ígneo; el segundo consume Maná, un coste de oportunidad verificable.
3. **Equipamiento:** las opciones diferenciadas respetan el PEI de 2.000 c y las FUE mínimas del catálogo. Cambiar malla por armadura pesada reduce o mantiene daño recibido en el ensayo de referencia.
4. **Límites:** el adversario emplea aproximación simple, no IA táctica integral; se usa orden de turno prefijado en lugar de tirar Iniciativa por personaje. No están incorporados efectos sostenidos, Sobrecarga, descansos, equipo secundario completo ni todas las capacidades de Reacción. La política mágica usa un subconjunto del repertorio.

## Puerta para PROG-01M (niveles 5, 10, 15 y 20)

Antes de extrapolar resultados de nivel 1, crear fichas con:
- Atributos y ascendencia arrastrados, mejoras de habilidades y especializaciones legalmente adquiridas a cada nivel.
- PD acumulados reconciliados y prueba de requisitos por adquisición.
- Armas, armaduras y otros equipos diferenciados conforme a economía de ese nivel; no asumir equipo gratuito ni una inflación artificial del PEI inicial.
- Grados de hechizo y técnicas permitidos; Maná y Vida calculados, no inventados.
- Enemigos y DF específicos para cada tramo, con protocolo de posicionamiento, cobertura e iniciativa.

Sólo tras ello calcular promedios para niveles superiores. **El informe no autoriza ajustes de balance ni altera el Manual Maestro.**
