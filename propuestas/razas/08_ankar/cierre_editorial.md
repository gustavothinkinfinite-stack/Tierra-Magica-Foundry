# Ankar — Cierre editorial v0.1
**ESTADO: BORRADOR INTEGRAL COMPLETO PARA REVISIÓN GLOBAL; NO APROBADO.** 16-11-2026.
**Canon leído:** `main:docs/Tierra_Magica_Manual_Maestro.md` SHA `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`; reglas raciales 373–381, cosmología 10523–10555, Vaelun/Primer Tránsito 11169–11327, creación 219–251 y 443–490, geografía 12650–12710.
## Entregables
- `auditoria_y_desarrollo.md`: biología, ciclo vital, sociedades, historia, cuatro tradiciones, religión, ejemplos mecánicos y matriz de diferencias.
- `doble_pagina.md`: página narrativa y página jugable, cuatro ejemplos de adjudicación y tres aventuras.
- `brief_arte.md`: «La última carta» y cuatro viñetas, sin imagen generada.
- `pruebas_balance.md`: **30 casos iniciales + 14 regresiones B2 (ANK-31–ANK-44), total 44 casos documentales**, **no ejecutados en mesa ni Foundry**.
## Control cruzado
1. **Ankar ≠ Terio Chacal:** Vaelun/Tránsito frente a Eïra/Sangre; la morfología no fusiona paquetes.
2. **Tránsito ≠ muerte original:** la muerte precede a Vaelun; el destino último de las almas no está fijado.
3. **Sentido del Umbral:** 6 espacios, presencia general, sin identificación/ubicación exacta, no detecta ecos vacíos ni espíritus naturales sin condiciones del rasgo.
4. **Custodia del Alma:** +1 Defensa Mental sólo contra cuatro categorías de intervención espiritual; no miedo, sugestión, ilusión ni ataque mental genérico.
5. **Vida material:** mortal, necesita descanso y sustento; no hay inmunidades ni conocimiento o magia gratis.
6. **Cultura:** las Tres Obligaciones son extendidas, no universales; nuevas instituciones no conceden PD/PR, Habilidades o recursos.
7. **Geografía:** no se añaden estados, rutas, costas o asentamientos canónicos.
8. **Religión:** Vaelun no es Nemor; un Ankar puede venerar otra divinidad o ninguna.
9. **Diferencias respecto del canon:** fisiología flexible, cuatro instituciones, ritos, dos escuelas éticas, referencias a Fractura/Guerra como historias propuestas y ejemplos de resolución.
10. **Nuevas reglas:** ninguna necesaria; la pauta para efectos mentales compuestos es guía editorial no canónica, sin alterar fórmulas.
11. **Misterios conservados:** destino del alma, reencarnación/división, autómatas conscientes, manifestaciones divinas definitivas.
12. **Pendientes:** playtest, revisión global del creador, maquetación y arte definitivo. No hacer merge ni escribir en `main`.
**Próximo bloque:** Cristálidos — Matriz Mixta, contraste con formas cristalinas no jugables.


### Actualización de auditoría B2 — 17-11-2026
- Creado `auditorias/02_mecanicas_y_costes.md` con **16 fichas de subsistemas, 18 escenarios de análisis y 10 incidencias**. **44 pruebas documentales, cero ejecuciones reales**.
- Distinción mecánica importante: `Sentido del Umbral` detecta cuatro tipos de fenómenos espirituales en radio 6, mientras `Custodia del Alma` otorga +1 Defensa Mental contra una lista parcialmente diferente (incluye posesión). No inferir detección automática de toda posesión.
- Abiertos B3/B4: frecuencia de percepción y muros, sellos especializados, grupo de apilamiento entre `Mente Anclada` y Custodia, ataque mixto miedo/posesión y comparación de utilidad con otras razas. Las reglas completas de posesión/Nigromancia no están ratificadas.
- No se modificaron `main`, Foundry, mapa ni doble página. Ninguna propuesta está aprobada.

### Actualización B3 — 17-11-2026

- `auditorias/03_exploits_y_pruebas.md` completada con **24 casos nuevos**, cuatro secuencias, 10 incidencias y cuatro propuestas de procedimiento **NO CANÓNICAS**. `pruebas_balance.md` contiene ahora **68 criterios documentales** (30 iniciales + 14 B2 + 24 B3). **0 Foundry, 0 mesa; 28 comprobaciones de un modelo auxiliar independiente añadidas posteriormente, 4 con estado abierto**.
- La presencia general de Sentido no revela número, dirección, identidad, objetivo o método de exorcismo. Posesión sola activa el ámbito de Custodia, no necesariamente el de Sentido. Barreras y frecuencia siguen B5.
- Defensa Mental estática 11+VOL; Custodia +1 sólo ante posesión/control/expulsión/retención espiritual. `Mente Anclada` +2 requiere Reacción y 3 Maná; combinar con +1 racial es **propuesta ANK-PB3-03**, no cifra vigente. Miedo/Sugestión sin Custodia; `Valor Inspirado` y `Mente Anclada` no se apilan entre sí.
- El procedimiento de efecto mental compuesto `ANK-PB3-02` permanece propuesta no ratificada. No se añaden Fuente, Vínculo Divino, Habilidades ni inmunidades.
- **B3 documental terminada, B4/B5 y texto `manual_final_propuesto.md` pendientes. Siguiente B3: Cristálidos.**


### Anexo B3 — evidencia auxiliar

El modelo `auditorias/modelo_auxiliar_b3_ankar.js` aporta **28 fixtures de condiciones de Sentido y Custodia**, con 28 coincidencias de salida prevista y **4 resultados explícitamente abiertos**. No simula hechizos/turnos ni verifica Foundry. La evidencia acumulada pasa a **68 DOC + 28 MOD auxiliares, ENV 0 y MESA 0**, sin cambiar los 24 nuevos casos documentales, las 10 incidencias ni el dictamen B3. Todas las propuestas siguen no canónicas.
