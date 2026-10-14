# PROG-01M — Curvas ofensivas 5, 10, 15 y 20

**Estado:** ensayo de comparación controlado, no dictamen de equilibrio. Fuente ejecutable: `test/prog-01m-offense-curves.test.mjs`. Las puertas de niveles y requisitos están cubiertas por `test/prog-01m-level-gates.test.mjs`.

## Condiciones

Se mantiene la Defensa **13** y Protección **1** del Bandido del ejemplo canónico. Esta criatura **no es un adversario diseñado para nivel 5, 10, 15 ni 20**: usarla sirve para comparar el efecto de aumentar rangos bajo una referencia estable, nunca para demostrar la dificultad de un combate de esos niveles. Los siete Atributos permanecen como al nivel 1, dado que ninguno de los cuatro planes registra mejoras de Atributos. Se calcula de modo exhaustivo la distribución de 2d10; el ataque usa FUE + Armas Marciales y el hechizo usa INT + Canalización. Se compara una lanza y Proyectil Ígneo; no se aplican técnicas, Reacciones, resistencias ni hechizos superiores.

## Interpretación reproducible

| Perfil | Niveles | Evolución del rango central | Capacidad secundaria |
|---|---|---|---|
| Marcial | 5/10/15/20 | Armas Marciales 3/4/5/5 | Parada y técnicas (no simuladas aquí) |
| Canalizador | 5/10/15/20 | Canalización 3/4/5/5 | Hechizos superiores (no simulados aquí) |
| Híbrido | 5/10/15/20 | Armas Marciales 3/4/5/5 | Canalización 3/3/4/4 |
| Especialista | 5/10/15/20 | Investigación 3/4/5/5 | Habilidades de apoyo, no reducibles a daño |

**Predicción falsable:** marcial e híbrido tienen la misma curva con lanza en los cuatro puntos: mismos Atributos relevantes, igual rango comprado y sin equipo diferenciador. El canalizador tiene mayor rango de Canalización desde nivel 10 y el especialista no adquiere rangos en armas; estos contrastes requieren escenarios propios para estimar valor funcional.

## Pendientes de una verdadera simulación por nivel

1. Adversarios pertinentes a esos niveles: el Manual Maestro no define perfiles completos de Bandido escalado para 5–20. No se deben inventar como estadísticas canónicas.
2. Elección y legalidad económica de equipamiento avanzado: el presupuesto inicial PEI no crece automáticamente por nivel.
3. Efectos concretos de hechizos avanzados, maestros, legendarios y técnicas.
4. Movimiento, Reacciones, iniciativa, consecuencias a 0 Vida y varios enemigos activos en combate completo.
5. Exploración y negociación para medir al especialista.

**Nota:** hasta que se diseñen o documenten oponentes de referencia no canónicos y un protocolo de encuentro de alto nivel, estas curvas sólo sirven para verificar magnitudes ofensivas frente al Bandido básico. No se modifica el Manual Maestro.
