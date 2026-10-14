# PROG-01M — Calibración experimental y acciones avanzadas

**Estado:** banco de pruebas automatizado, NO canon. El Manual Maestro no se ha modificado.

## Calibración comparada

| Nivel | Defensa moderada | Vida por enemigo | Protección | Ataque | Daño | Defensa estrés anterior | Vida estrés anterior |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 5 | 14 | 12 | 1 | +3 | 5 | 15 | 19 |
| 10 | 16 | 16 | 2 | +4 | 6 | 18 | 28 |
| 15 | 18 | 20 | 3 | +5 | 7 | 21 | 39 |
| 20 | 20 | 24 | 4 | +6 | 8 | 24 | 52 |

Se conservan **ambas escalas** para distinguir un control moderado de la prueba de estrés. Los encuentros NO son criaturas recomendadas para publicación. Los nuevos fixtures están en `test/fixtures/prog-01m-calibrated.mjs`.

## Cobertura ejecutable

`test/prog-01m-calibrated-tactics.test.mjs` ejecuta 960 escenarios reproducibles (2 dificultades × 4 niveles × 4 arquetipos × 3 órdenes × 10 semillas) y comprueba invariantes de Vida, Maná, Acciones y Reacciones. Para el canalizador añade escenarios de control con:
- **Onda de Choque**: daño con el coste de Maná del catálogo y desplazamiento +1 de objetivos alcanzados cuando la geometría lineal lo permite.
- **Aguja Gélida**: reducción temporal de Movimiento 2 sobre un objetivo alcanzado que sobreviva.
- **Arco Fulminante, Rayo de Ruptura y Tormenta Arcana**: resolución multiobjetivo condicionada a posiciones y Maná.
- **Pantalla Cinética**: Acción para establecer un efecto sostenido y gasto inicial de 8 Maná; +2 Defensa sólo para ataques a distancia que atraviesan su pantalla en el escenario geométrico declarado, no para ataques cuerpo a cuerpo.

**Límite importante:** el modelado es de posiciones 1D, con IA rival mínima y resoluciones prefijadas. No sustituye la validación de duración/sostenimientos del motor Foundry, distancias bidimensionales, selección completa de ataques ni colisiones. Tampoco incluye todas las técnicas marciales o decisiones del especialista. La política avanzada aplica hechizos disponibles bajo una heurística declarada; el resultado no demuestra optimalidad de la estrategia.

## Interpretación

El primer banco de estrés hizo caer casi todas las fichas antes de explotar sus opciones. Los valores moderados permiten ensayar sensibilidad, pero **una calibración no queda aprobada simplemente porque suba la supervivencia**. Hay que comparar promedios, distribución de desenlaces, gasto de recursos y calidad de decisiones. La salida de los tests contiene `PROG01M_CALIBRATED` para extraer la matriz por nivel y dificultad.

La batería verifica además que los efectos de empuje y la pantalla puedan llegar a ser efectivos en escenarios preparados. **No concluye aún** que el balance entre arquetipos sea satisfactorio.

Próximos controles: persistir matriz numérica como artefacto, introducir iniciativa tirada y terreno 2D, comprobar reacciones/estados/sostenimientos con el motor Foundry y añadir rutas tácticas no mágicas de alto nivel.
