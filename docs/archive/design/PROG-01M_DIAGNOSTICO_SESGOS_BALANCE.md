# PROG-01M — Diagnóstico de diferencias persistentes y sesgos de los escenarios

**Estado:** evaluación experimental; NO constituye una regla, un bestiario ni una aprobación del equilibrio. Fuentes ejecutables: `test/prog-01m-reference-encounters.test.mjs`, `test/prog-01m-calibrated-tactics.test.mjs` y ambos archivos de fixtures.

## Diseño pareado de comparación

Por cada nivel 5/10/15/20 y por cada uno de los cuatro perfiles se usan las mismas diez semillas y tres órdenes de actuación: **30 escenarios por condición**. Se cotejan (a) estrés contra moderado y (b) política mágica básica contra avanzada sobre el escenario moderado. La prueba `PROG01M_SENSITIVITY` imprime por grupo supervivencia, daño y deltas de estrategia. No se presentan números de esta nueva matriz que no hayan sido extraídos y verificados explícitamente de la ejecución.

## Diferencias estructurales persistentes (con respaldo en la construcción del experimento)

1. **Marcial e híbrido no reciben el mismo equipo:** marcial usa armadura pesada (Protección 4) e híbrido malla (Protección 3). Esto genera una ventaja defensiva por **decisión del fixture**, no por una restricción demostrada de la progresión. Ambos tienen FUE 3, por lo que pueden usar armadura pesada legalmente si se les asigna.
2. **Canalizador:** se le atribuye armadura reforzada (Protección 2) y al resto al menos malla; se le otorga menos Vida (VIG 1). Su vulnerabilidad frente a dos enemigos a corta distancia es atribuible en parte a **atributos/equipo/asignación de amenaza**.
3. **Especialista:** su construcción prioriza Investigación, Medicina y habilidades sociales, pero el ensayo sólo recompensa ataques. Su desventaja en daño no es una prueba de inferioridad global: **sesgo de métrica**.
4. **Vida plana a niveles altos:** ninguna ruta nominal compra VIG adicional y no hay incremento de Vida automático en esos ejemplos. La capacidad ofensiva aumenta por habilidades, mientras el fixture de estrés eleva Ataque, Daño, Vida y Protección enemigos. La supervivencia decreciente es por lo menos parcialmente un efecto de **escalado del benchmark**, no una observación sobre encuentros recomendados.
5. **Decisiones mágicas del simulador:** sólo un subconjunto de conjuros está modelado; la versión avanzada selecciona daños múltiples automáticamente cuando se cumplen posiciones 1D. Omite aliados en línea/área, costes de sostenimiento, disipación e interacciones de terreno 2D. Esto **puede sobreestimar** área/control.
6. **IA y economía:** dos enemigos coordinan ataques sobre un PJ sin un grupo aliado; no se valoran curación del especialista, acción de aliados ni objetivos alternativos. La política de Parada es automática ante el primer ataque compatible y no selecciona la amenaza más peligrosa.

## Cómo separar regla y experimento

- Una diferencia entre marcial e híbrido con idéntica armadura, arma, tiradas y política física sería una señal de **regla/capacidad**. Diferencias provocadas por Protección 4 contra 3 son **equipo del escenario**.
- Una mejora de estrategia avanzada frente a básica, **con igual semilla, orden, equipo y enemigo**, señalaría valor de las capacidades **dentro de este modelo**. No demuestra utilidad general si no incorpora coste de concentración, geometría y aliados.
- Supervivencia cero en ambos niveles de dificultad implica **falta de discriminación del benchmark**; no permite asignar un «ranking» robusto.
- Variar sólo nivel no constituye progresión completa de combate: faltan compras de Atributos, equipo de campaña, enemigos y capacidades no ofensivas.

## Qué queda por implementar

1. Persistir un JSON/CSV de resultados numéricos pareados generado por el test, para auditoría reproducible sin depender de log oculto de CI.
2. Prueba de ablación de equipo: misma armadura para marcial e híbrido, y equipos legales especializados alternativos.
3. Comprobar IA/acciones 2D, dos o más PJs cooperando, reacciones adaptativas, control y sostenimientos con motor Foundry.
4. Añadir escenarios exploratorios y sociales que premien aportes del especialista.
5. Definir métricas de balance con un criterio de aceptación antes de editar los PD o el Manual Maestro.

**Dictamen provisional:** las pruebas muestran diferencias de rendimiento bajo determinadas condiciones, pero no aíslan aún una desventaja/ventaja persistente causada por el canon. No se recomiendan cambios de balance en este punto.
