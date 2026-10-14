# PROG-01J — Comparación cuantitativa de arquetipos (primera pasada)

**Estado:** auditoría de diseño no canónica, 2026-10-13. **Autoridad:** `docs/Tierra_Magica_Manual_Maestro.md`, capítulos 3–4, 6 y 12–13. Se comparan las rutas NOMINALES de `test/prog-01g-nominal-catalog.test.mjs` y `docs/archive/design/PROG-01C_COMPRAS_NOMINALES_Y_PUERTAS.md`. Las rutas todavía no fijan atributos iniciales, ascendencia, equipo, acciones típicas y oponentes.

## Método

Usar exclusivamente bonos de rango verificables, **sin asumir ningún Atributo ni equipo no seleccionado**. Fórmula de prueba: 2d10 + Atributo pertinente + Habilidad + modificadores ≥ DF. Rango Entrenado +2, Experto +4, Maestro +6, Gran Maestro +8. Bono Defensivo por mejor rango de Armas: Entrenado +1, Experto +2, Maestro +3, Gran Maestro +4. Defensa = 11 + AGI + Bono Defensivo aplicable + equipo/modificadores.

| Nivel | Marcial: Armas Marciales | Marcial: Bono Defensivo | Canalizador: Canalización | Canalizador: Bono Defensivo | Híbrido: Armas Marciales / Canalización | Híbrido: Bono Defensivo | Especialista: Investigación | Especialista: Bono Defensivo |
|---:|---:|---:|---:|---:|---|---:|---:|---:|
| 1 | +4 | +2 | +4 | +0 | +4 / +2 | +2 | +4 | +0 |
| 5 | +4 | +2 | +4 | +0 | +4 / +4 | +2 | +4 | +0 |
| 10 | +6 | +3 | +6 | +0 | +6 / +4 | +3 | +6 | +0 |
| 15 | +8 | +4 | +8 | +0 | +8 / +6 | +4 | +8 | +0 |
| 20 | +8 | +4 | +8 | +0 | +8 / +6 | +4 | +8 | +0 |

**Precisión:** la tabla sólo contiene incrementos por Habilidades. No representa ataque final ni Defensa final. En particular, +0 en Bono Defensivo sólo significa que el plan no compró una Habilidad de armas: un canalizador puede adquirir armas o protegerse de otras formas. La reducción de Defensa por Desprevenido también debe tenerse en cuenta en un encuentro real.

## Comparaciones contrastables

1. **Marcial e híbrido:** en ambos, Armas Marciales escala de Experto a Gran Maestro (bono +4→+8); el híbrido también compra Canalización y varios hechizos con el mismo presupuesto total. A este nivel de comparación **no aparece una pérdida en la Habilidad principal de armas** por tomar magia. Esto es una **señal de posible dominancia del híbrido**, no una conclusión: faltan coste de oportunidad en otras Habilidades, recursos, equipo, Reacciones, daño sostenido, exposición y diversidad de encuentros.
2. **Canalizador e híbrido:** el canalizador alcanza Canalización Gran Maestro (+8) en nivel 15; el híbrido se detiene en Maestro (+6), diferencia de **2 al bono de Habilidad** en niveles 15 y 20, además de posible acceso a hechizos legendarios. Esa divergencia constituye una diferencia real de especialización, pero su valor en escena no está cuantificado.
3. **Especialista:** Investigación escala al mismo bono máximo +8 desde nivel 15. Su distribución complementaria cubre Medicina, Historia, Naturaleza, Persuasión, Supervivencia y Arcana; debe medirse mediante desafíos no combatientes y no con DPR, porque el perfil no prioriza armas.
4. **Supervivencia defensiva:** dado el presupuesto y la elección de rangos, marcial e híbrido tienen ventaja defensiva de armas de +2 a +4 sobre los otros dos **si** AGI, equipo, cobertura y situación son iguales. A nivel 20 la brecha por ese componente es exactamente +4, no una diferencia probada de probabilidad de sobrevivir.
5. **Recursos:** Vida depende de VIG y Maná de VOL; sin los siete Atributos de cada ficha es imposible atribuir una ventaja de reservas o de eficacia total a un arquetipo. Ninguno de los cuatro planes compra mejoras de Atributo post-creación.

## Lo que NO se ha medido

- Probabilidades de impacto: faltan los Atributos, los valores de Defensa/DF, cobertura y bonificaciones circunstanciales.
- Daño por ronda, absorción y penetración: faltan armas, armaduras, resistencias y escena de combate concreta; «más hechizos» no implica mayor daño.
- Duración del Maná: faltan VOL inicial, número de encuentros, descansos y decisiones de gasto.
- Exploración e interacción: faltan DF de retos, distribución de roles y coste narrativo de fallo.
- Balance racial: los paquetes raciales no se han asignado.
- Legalidad de todo el personaje: las rutas PROG-01I aún no verifican por separado equipamiento ni grados de adquisición particulares.

## Prioridades de PROG-01K

1. Construir **cuatro fichas completas de nivel 1** con siete Atributos según creación (base 1, seis incrementos, máximo 3), mismo criterio de equipamiento y opciones de ascendencia bien documentadas.
2. Arrastrar esa base a niveles 5/10/15/20 sin mejoras de Atributo salvo compra expresa de PD.
3. Simular dos encuentros repetibles con un enemigo equivalente y uno de control de área; medir aciertos, daño neto, supervivencia y Maná gastado con reglas reales.
4. Diseñar al menos dos desafíos de exploración y dos de interacción social, registrando tanto oportunidades como costes.
5. Comparar una alternativa por arquetipo y el efecto de variar la ascendencia antes de proponer nuevos hechizos o costes.

**Dictamen provisional:** no hay evidencia para afirmar que los cuatro arquetipos están equilibrados. Sí se identifica una hipótesis prioritariamente comprobable: híbrido y marcial alcanzan el mismo rango de armas, mientras el híbrido conserva un repertorio mágico; corresponde probar sus costes de oportunidad en lugar de rebalancear por intuición.
