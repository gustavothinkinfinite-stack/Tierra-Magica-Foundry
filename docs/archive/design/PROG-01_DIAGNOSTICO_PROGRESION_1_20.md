# PROG-01 — Diagnóstico de progresión 1–20 (propuesta, NO CANÓNICA)

Fecha de revisión: 2026-10-13.
Estado: diagnóstico abierto; sin cambios mecánicos aprobados.

## Fuente y límite de autoridad

La fuente canónica única sigue siendo `docs/Tierra_Magica_Manual_Maestro.md`, capítulo 4; véase `docs/FUENTES_CANONICAS.md`. Este documento identifica observaciones y decisiones pendientes. No añade reglas, recompensas, costes ni autorizaciones al juego.

## Hechos comprobados

1. **Economía por nivel.** Nivel 1: 25 PD; niveles 2–20: 4 PD adicionales por nivel, con 101 PD totales a nivel 20. Se pueden ahorrar PD. No hay bonificación universal de ataque, defensas ni recursos por subir.
2. **Adquisiciones.** Habilidades pagan diferencias de coste acumulado; Atributos post-creación pagan costes por paso 4/6/9/13/18 PD para 0→1…4→5. Disciplinas: 2 PD; hechizos: 1/2/3/5/8+ PD por grado; las técnicas y adquisiciones conservan puertas y requisitos.
3. **Rasgos.** Los 3 PR iniciales no se renuevan. No existe conversión general PR↔PD. Familiar Mágico posee coste post-creación de 6 PD; otros Rasgos necesitan coste explícito antes de comprarse.
4. **Recursos.** Ganar un nivel o aumentar el máximo no recarga Vida ni Maná. El PEI sólo corresponde a creación.
5. **Implementación.** `scripts/documents/actor.mjs` expone `advanceLevel()`, que verifica tipo Character, creación cerrada y nivel menor a 20 y después ejecuta `this.update({ "system.details.level": current + 1 })`. El botón aparece en `templates/actor/character-sheet.hbs`. `scripts/rules/creation.mjs` calcula PD y gastos; `test/crea-15-progression.test.mjs` y `test/manual-character-progression.test.mjs` validan la progresión cuantificada.
6. **Límite identificado.** El procedimiento de «Qué ocurre al subir un nivel» explica cómo realizar la progresión, pero no define allí cuándo se obtiene el siguiente nivel. El método `advanceLevel()` no comprueba una adjudicación del DJ, hito, experiencia, confirmación ni registro de motivo. Esto es una laguna de gobierno del avance, no una acusación de error en el cálculo de PD.

## Hallazgos y riesgos para someter a diseño

### PROG-01-A — Otorgamiento del nivel: decisión pendiente (alta prioridad)

Definir cuándo y quién concede un nivel. Opciones de estudio: hitos adjudicados por DJ; progreso de objetivos con umbrales publicados; modelo híbrido. No seleccionar todavía una de ellas. Comparar cargas para DJ, incentivos de combate versus exploración, previsibilidad y facilidad de auditoría.

### PROG-01-B — Permisos y trazabilidad en Foundry (alta prioridad)

El método actual no incluye autorización explícita de DJ ni una confirmación o bitácora de avance. Decidir quién puede pulsar «Subir de nivel», si requiere solicitud/aprobación y cómo registrar nivel anterior, nuevo nivel, PD disponibles y responsable. Respetar permisos normales de Foundry hasta que exista decisión canónica o de UX.

### PROG-01-C — Competencia entre inversiones en PD (alta prioridad)

Un paso Atributo 3→4 cuesta 13 PD, equivalente a más de tres incrementos de nivel (4 PD cada uno). Un paso 4→5 cuesta 18 PD. Contrastar esta inversión contra mejoras de Habilidad, adquisiciones mágicas y técnicas. No reducir costes sin prueba comparativa.

### PROG-01-D — Rasgos después de crear (media-alta)

Inventariar cada Rasgo y clasificar: exclusivo de creación, adquirible post-creación con coste explícito o pendiente de decisión. No inventar conversión PR/PD.

### PROG-01-E — Caminos viables por tramo (media-alta)

Construir personajes comparables de nivel 1, 5, 10, 15 y 20: marcial, canalizador, híbrido y especialista no combatiente. Calcular coste, puertas por rango y alternativas de inversión. Identificar elecciones dominantes o bloqueos, diferenciando hipótesis de desequilibrios verificados.

### PROG-01-F — Flujo visible de mejora (media)

La ficha ya muestra nivel, PD totales/gastados/disponibles, botón de nivel y mejoras de atributos. Evaluar un resumen previo/posterior, explicación de requisitos, historial de gastos y confirmación de acciones costosas. No describir la progresión como ausente en Foundry: la base funcional ya existe.

## Matriz de criterios para cerrar la fase

| Requisito | Evidencia necesaria | Estado |
|---|---|---|
| Criterio de nivel | Regla de adjudicación aprobada en Manual Maestro | Pendiente de decisión |
| Control de avance | Política de permisos y registro aprobada; pruebas | Pendiente de decisión |
| Economía de PD | Simulaciones comparadas nivel 1/5/10/15/20 | Pendiente de simulación |
| Rasgos | Inventario de costes y restricciones de progresión | Pendiente de inventario |
| UX de progreso | Flujo probado con DJ y jugador sin bypass | Pendiente de diseño |
| Coherencia | Manual Maestro → Foundry → pruebas automatizadas | Pendiente de implementación tras decisiones |

## Próximo incremento propuesto

1. Levantar el inventario de todos los Rasgos y elaborar cuatro personajes modelo de cinco niveles cada uno.
2. Proponer dos modelos completos de adjudicación (hitos y objetivos), con ejemplos y análisis de incentivos.
3. Presentar a aprobación las decisiones canónicas antes de tocar el Manual Maestro.
4. Recién después actualizar la fuente canónica, Foundry, tests y referencia rápida en ese orden.

**No se altera aquí ninguna regla del núcleo 1.0.**
