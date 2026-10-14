# PROG-01K — Escenarios reproducibles de nivel 1

Fecha: 2026-10-13. **Análisis no canónico**; no modifica el Manual Maestro. Cuatro perfiles de prueba: `test/prog-01k-character-baselines.test.mjs`. GitHub Actions de ese commit terminó **success**: https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/38492732470.

## Método y alcance

Se enumeran las **100 combinaciones equiprobables de 2d10** para estimar `P(2d10 + Atributo + bono de Habilidad >= Defensa/DF)`. No se usa simulación aleatoria ni se inventa un enemigo: «Defensa 15» y «DF 15/17» son escenarios de control hipotéticos, NO estadísticas de una criatura canónica. Sin ventajas, desventajas, cobertura, críticos, reacciones, armadura, resistencias, posición ni consecuencias narrativas. Las especializaciones no agregan bono universal. El equipo de control es una lanza, incluso para perfiles no entrenados; esto **no** implica que sea una buena elección táctica para ellos.

| Perfil | Lanza FUE + Armas Marciales vs Defensa 15 | Proyectil Ígneo INT + Canalización vs Defensa 15 | Supervivencia PER vs DF 15 | Investigación INT vs DF 17 | Persuasión PRE vs DF 15 |
|---|---:|---:|---:|---:|---:|
| Marcial | 79 % | sin hechizo | 45 % | 15 % | 36 % |
| Canalizador | 28 % | 79 % | 45 % | 45 % | 28 % |
| Híbrido | 79 % | 55 % | 45 % | 21 % | 28 % |
| Especialista | 28 % | sin hechizo | 55 % | 64 % | 64 % |

## Encuentros de control

### Encuentro A — objetivo estático a Defensa 15

Tres turnos, **una Acción ofensiva por turno**, sin desplazamiento ni Reacciones, contra un blanco abstracto que no actúa. Métrica: **impactos esperados**, no daño esperado y no un combate completo.

| Perfil / elección | Probabilidad por Acción | Impactos esperados en 3 Acciones | Coste nominal de Maná en 3 lanzamientos |
|---|---:|---:|---:|
| Marcial, lanza | 79 % | 2,37 | 0 |
| Híbrido, lanza | 79 % | 2,37 | 0 |
| Canalizador, Proyectil Ígneo | 79 % | 2,37 | 9 |
| Híbrido, Proyectil Ígneo | 55 % | 1,65 | 9 |
| Especialista, lanza sin entrenamiento | 28 % | 0,84 | 0 |

El Proyectil Ígneo del catálogo cuesta 3 Maná por uso. La reserva inicial del canalizador es 15 y la del híbrido 12; después de tres lanzamientos quedarían nominalmente 6 y 3 respectivamente, siempre que no existan otros costes o interrupciones. El efecto sobre daños y 0 Vida requiere modelar Protección, Ataque y objetivo concreto.

### Encuentro B — prueba de adaptación táctica

**No ejecutado como combate:** escoger entre lanza, hechizo, cobertura, movimiento y Reacción requiere un mapa/posiciones, un enemigo con acciones, armadura, prioridades y reglas de turno. No existe base para asignar una puntuación de supervivencia u obtener un ganador a partir de este control; se deja como protocolo pendiente.

## Exploración e interacción

Se utiliza una sola prueba por personaje y actividad (no se presuponen intentos repetidos gratuitos).

- **Orientación o rastreo:** PER + Supervivencia, DF 15. Marcial 45 %, Canalizador 45 %, Híbrido 45 %, Especialista 55 %.
- **Análisis de indicios:** INT + Investigación, DF 17. Marcial 15 %, Canalizador 45 %, Híbrido 21 %, Especialista 64 %.
- **Negociación:** PRE + Persuasión, DF 15. Marcial 36 %, Canalizador 28 %, Híbrido 28 %, Especialista 64 %.
- **Beneficio de rol:** el especialista lidera Investigación y Persuasión en estos controles; el perfil no debe evaluarse solamente por ataques con lanza.

## Conclusiones y límites

1. **Precisión marcial igual:** marcial e híbrido tienen 79 % con la misma lanza y contra la misma Defensa a nivel 1. Esa igualdad no implica equivalencia en daño total, protección o economía de turnos.
2. **Costo mágico:** el híbrido obtiene otra opción ofensiva (55 % con Proyectil Ígneo), pero si hace tres lanzamientos consume 75 % de su reserva inicial; el canalizador consume 60 % y es más preciso en magia.
3. **Especialista no combatiente:** es superior en ambos controles de Investigación/Persuasión. Las probabilidades de éxito son métricas puntuales, no puntajes globales de utilidad.
4. **Falta medir:** distribución de daños, armadura, caídas a 0 Vida, dos tipos de enemigo, control de áreas, duración de descansos, adversarios activos y mejoras en niveles 5/10/15/20.
5. **Sin balance concluyente:** los escenarios son comparativos controlados y no prueban que un arquetipo deba ser reforzado o debilitado.

## Próximo ensayo reproducible

Fijar una plantilla de oponente canon existente, un mapa y reglas de equipo. Ejecutar combate con las decisiones disponibles, registrar tiradas y consecuencias, y repetirlo en los cinco puntos de control; después comparar alternativas raciales/equipamiento.
