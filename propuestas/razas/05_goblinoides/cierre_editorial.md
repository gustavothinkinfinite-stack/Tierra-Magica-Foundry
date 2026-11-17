# Goblinoides — Cierre editorial v0.1
**BORRADOR COMPLETO PARA REVISIÓN GLOBAL · NO APROBADO.** Fecha: 16/11/2026.

## Entregables
`auditoria_y_desarrollo.md`: biología y ciclo vital propuestos, cosmología contrastada, tres culturas e instituciones locales, historia, religión y mecánicas. `doble_pagina.md`: dos páginas listas para maquetación, con narrativa y reglas. `brief_arte.md`: composición principal y viñetas, sin imagen generada. `pruebas_balance.md`: **30 casos iniciales, 15 regresiones B2 y 24 B3 (GOB-46–GOB-69), total 69 criterios documentales**; no partidas ni pruebas Foundry ejecutadas.

## Auditoría cruzada
- Varkor/Primera Guerra/Ojo no se equiparan a Mal. **Conforme**.
- Goblin, Hobgoblin y Bugbear son ascendencias jugables separadas; Kobold no se añade. **Conforme**.
- Ojo para la Oportunidad se conserva literalmente en coste, frecuencia, momento y límites. **Conforme**.
- Escurridizo conserva tamaño objetivo, hueco, terreno difícil, Reacciones y prohibición de terminar dentro. **Conforme**.
- Complexión Bugbear se limita a Carga y fuerza contra objetos inertes; no cambia alcance, daño, defensa, armas o maniobras. **Conforme**.
- Hobgoblin carece de competencia adicional, como en canon. **Conforme**.
- Ningún ritual, institución, oficio, idioma o doctrina otorga Habilidades, PR, PD, Ventaja o magia gratuitos. **Conforme**.
- Geografía: se mencionan seis potencias sin adjudicar enclaves o fronteras nuevos. **Conforme**.
- Cronología: 612 C. y era arcano-industrial, sin guerras o fechas históricas inventadas. **Conforme**.
- Biología (talla, masa, edades) y nombres de instituciones son nuevas propuestas, no canon. **Conforme**.
- Reglas nuevas necesarias para jugar: **ninguna**. Registro de Oportunidad es sólo apoyo documental sin efecto mecánico.
- Balance empírico y prueba de maquetación: **pendientes**.

## Decisiones propuestas cerradas dentro del borrador
Adoptar Red de Reparaciones/Mesas de Segunda Solución para ciertas comunidades goblins; Registro de Responsabilidades/Consejos de Turno para hobgoblins; Casas de Paso Seguro para bugbears; Tres Preguntas y tres lecturas del Ojo como prácticas locales, nunca universales. Mantener abierta la naturaleza literal del Primer Desafío y el origen de Kobolds hasta cosmología dracónica.

**Próxima raza:** Terios/Anihombres, con linaje, variedad, presupuesto de adaptaciones y pruebas de vuelo, armas naturales y movilidad. No escribir en `main` ni Foundry.


### Actualización B2 — 17-11-2026
- Se creó `auditorias/02_mecanicas_y_costes.md`: **16 fichas mecánicas, 20 escenarios analizados y 11 incidencias**. Correcciones documentales en `auditoria_y_desarrollo.md` y pruebas GOB-16/GOB-25: no hay techo numérico universal de modificadores circunstanciales, y comprobar salida de Escurridizo antes de cruzar se etiqueta como pauta propuesta, no norma literal.
- **45 criterios documentales sin ejecución empírica**. B3 debe resolver interrupciones durante el tránsito, Retirada/Correr/Exhausto, reuso de oportunidades y legitimidad de combinaciones. B4 comparará utilidad de Hobgoblin (sólo Ojo) frente a Goblin, Bugbear, Humanos y otras razas. No se ha modificado ningún paquete en `main`.


### Actualización B3 — 17-11-2026

- Informe \`auditorias/03_exploits_y_pruebas.md\` creado: **24 cadenas adversariales, 4 secuencias y 12 incidencias**. Pruebas ampliadas a **69 DOC (GOB-01–69)**. Modelo \`auditorias/modelo_auxiliar_b3_goblinoides.js\`: **20 fixtures, 20 expectativas coincidentes**, limitado a elegibilidad de Ojo y costes básicos de Movimiento; **no Foundry**.
- Ojo exige un hecho real, aplicable y declaración previa: la compra/uso de Ayuda conserva condiciones propias y no hay techo numérico universal de modificadores. **Hobgoblin sólo tiene Ojo**; \`Cohesión\`, \`Liderazgo\`, conocimientos técnicos o ventaja profesional no son habilidades raciales gratuitas.
- Escurridizo cuesta **2 por espacio ocupado** y requiere **salida legal** sin terminar Movimiento en ocupado. El prechequeo completo de ruta es sólo **propuesta preventiva GOB-B3-PROP-01**; la interrupción por una Reacción válida dentro de una casilla ocupada queda **abierta GOB-B3-PROP-02/B5**, sin desplazamiento o daño automáticos inventados. **Retirada+Correr+Exhausto** también abierta transversalmente.
- Complexión Bugbear no convierte Escala real en Grande ni aumenta FUE numérica, alcance, daño, maniobras o equipo permitido. Equipo, Origen, PR/PD y supervivencia mantienen límites generales.
- B4 debe comparar rendimiento de Goblin/Hobgoblin/Bugbear, frecuencia de Ojo y posibles oportunidades excepcionales de Iniciativa. **Evidencia:** 69 criterios DOC, 20 MOD auxiliares, **0 Foundry y 0 mesa**. Sin modificación a \`main\`, Foundry ni atlas. **Próximo B3 Terios**.
