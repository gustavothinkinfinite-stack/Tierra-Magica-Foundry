# PROG-01N — Expedición de tres escenas y costes persistentes

Estado: **banco experimental no canónico**. No se modifican reglas, PD ni Manual Maestro. Prueba ejecutable: `test/prog-01n-expedition-chain.test.mjs`; CI aprobada: https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/38505372971.

## Escenas encadenadas

Camino (paso y rastro), Ruinas (sello y documentos), Enclave (acuerdo y salida). Se usan 2d10 + atributo + bonificación de habilidad nominal. La dificultad experimental es 17 más una penalización de hasta 2 por obstáculos que quedaron pendientes en escenas anteriores. Se conservan estado, tiempo, suministros, complicaciones, oportunidades perdidas y contribución individual. Dos intentos por desafío, con personaje alternativo disponible en el segundo.

El grupo comienza con cinco suministros experimentales. Al gastarse uno en un segundo intento, puede evitarse el tiempo extra provocado por fallar ese intento; nunca otorga un bono canónico. Cada intento consume una unidad temporal y cada fallo sin protección consume otra. Un obstáculo no superado después de los dos intentos equivale aquí a una oportunidad perdida, no a un bloqueo obligatorio de la campaña.

## Resultados verificados

Fuente: artefacto `validation-log` de ejecución 38505372971, marcador `PROG01N_EXPEDITION`. Diez semillas por nivel y política.

| Nivel | Política | Tiempo | Suministros restantes | Complicaciones | Obstáculos pendientes | Completados |
|---:|---|---:|---:|---:|---:|---:|
| 5 | Adaptativa | 11,2 | 2,4 | 3,9 | 1,3 | 4,7 |
| 5 | Fija | 12,6 | 2,0 | 4,6 | 1,4 | 4,6 |
| 10 | Adaptativa | 10,2 | 2,9 | 3,0 | 0,9 | 5,1 |
| 10 | Fija | 10,6 | 2,7 | 3,3 | 1,0 | 5,0 |
| 15 | Adaptativa | 8,2 | 3,9 | 1,6 | 0,5 | 5,5 |
| 15 | Fija | 9,6 | 3,2 | 2,6 | 0,8 | 5,2 |
| 20 | Adaptativa | 7,6 | 4,2 | 0,9 | 0,1 | 5,9 |
| 20 | Fija | 8,2 | 3,9 | 1,4 | 0,3 | 5,7 |

## Contribuciones y límites

En el ensayo adaptativo de nivel 15, el especialista realiza 6,0 acciones y consigue 4,9 éxitos medios; el marcial realiza 0,5 acciones y consigue 0,5 éxitos; la participación es muy desigual porque los desafíos favorecen las competencias del especialista y la política selecciona siempre el modificador más alto. **Esto mide la utilidad en esta expedición, no el equilibrio universal entre arquetipos.** En nivel 20, el marcial participa más (3,0 acciones, 2,5 éxitos), y el especialista alcanza 3,5 acciones y 3,2 éxitos.

El reloj se expresa en unidades ficticias de ensayo, no horas del canon. Los suministros no son ítems del inventario canónico, y la penalización por pendientes tampoco es una regla. No se modela equipo real, cooperación simultánea, escenas bidimensionales ni resolución de conflictos sociales complejos.

## Dictamen provisional

Las estrategias adaptativas muestran menores costes temporales en todos los niveles y menos oportunidades perdidas en promedio. La mejora **no** justifica modificar habilidades ni PD: está condicionada por la selección de desafíos y la política de asignación. Próxima prueba: medir el valor marginal de cada arquetipo mediante retirada de un integrante y sustituir el selector que siempre elige el mayor bono por decisiones con costes de oportunidad.
