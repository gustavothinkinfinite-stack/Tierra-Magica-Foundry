# Plan editorial posterior a las doce familias — Auditoría, balance y manual

**Estado:** PLAN DE TRABAJO AUTÓNOMO — NO CANÓNICO. Fecha de incorporación: 17-11-2026.
**Ámbito único de escritura:** rama `propuestas/razas-autonomas-2026`, carpeta `propuestas/razas/`. **Única autoridad canónica vigente:** `main:docs/Tierra_Magica_Manual_Maestro.md`. No editar ni escribir en `main`, el Manual Maestro operativo, el código de Foundry ni el atlas.

## Instrucción del creador

Al terminar los doce expedientes, **no detener el desarrollo**. Realizar **múltiples procesos de examen y auditoría** sobre **cada raza**, intentar mejorar las propuestas, descubrir desbalances y verificar contra **todas las reglas relacionadas del proyecto**. Sólo **después de completar y cerrar las auditorías**, escribir, revisar y entregar los **textos editoriales finales propuestos** de cada raza destinados al Manual Básico. Cada nuevo mensaje «avanzar» indica **ejecutar la próxima unidad sustantiva pendiente** sin pedir microaprobaciones. Si todas las tareas verificables están acabadas y no queda ningún trabajo sustantivo, informar brevemente estado de finalización y **no generar trabajo artificial ni repetido**.

## Fase A — Completar la materia prima de las doce familias
- Confirmar 5 documentos por familia: `auditoria_y_desarrollo.md`, `doble_pagina.md`, `brief_arte.md`, `pruebas_balance.md`, `cierre_editorial.md`. Conservar anexos especiales (p. ej., origen propuesto) en carpetas respectivas.
- Avanzar según `00_tablero.md`. A la fecha de creación de este plan: **10/12** expedientes integrales, faltan **Coralios** y la consolidación de **Humanos**.
- No confundir la doble página v0.1 con la **versión definitiva propuesta** del manual: esos textos son borradores de partida, sujetas a auditoría.
- Una vez completadas las doce, abrir la Fase B; **no pausar** la automatización por alcanzar el número 12.

## Fase B — Cuatro rondas de auditoría por familia

### B1. Auditoría canónica y narrativa (12 familias)
**Entrada:** `main` vigente y expediente específico. Verificar en fuente real por cada familia el paquete de creación, cosmología, teología, historia, geografía y cultura.
**Evaluar:** origen y cronología compatibles; nomenclatura y topónimos; diferencias de pueblos cercanos; plausibilidad del cuerpo, edad, sustento y descanso; profesiones y culturas no esencializadas; variantes y linajes; religiones sin Vínculos gratuitos; coherencia con era arcano-industrial.
**Salida por familia:** `auditorias/01_canon_y_lore.md` con tabla **canon literal / propuesta vigente / discrepancia / solución editorial / fuente**, y correcciones versionadas en el expediente (sin convertirlas en canon).

### B2. Auditoría mecánica profunda (12 familias)
**Entrada:** paquete de Ascendencia vigente, Rasgos generales, Atributos, Habilidades/PD/PR, Escala, Carga, equipamiento, Movimiento, Acción/Reacción, Iniciativa, Daño, Defensa, Agarrar, Empujar, Derribar, Fatiga, Descanso, 0 Vida/Trauma; y cuando corresponda, Fuentes/Hechizos sostenidos, Canalización, familiares, Ritualismo, Alquimia, Ingeniería, dispositivos y crafting.
**Evaluar:** si cada poder gratuito ofrece utilidad situacional razonable, costes de condiciones, límites y ventanas de Acción; reglas explícitas vs. supuestos; duplicación de efectos o combinaciones que eludan gastos; contradicciones con Rasgos generales y jerarquía de fuentes.
**Salida por familia:** `auditorias/02_mecanicas_y_costes.md` con ficha por habilidad: **disparador / coste / alcance / duración / exclusiones / interacción / abusable / decisión / caso comprobable**. Cuando exista vacío real, diseñar propuesta explícita con nombre, coste, límites, compatibilidad y matriz de prueba. **No** modificar regla transversal furtivamente.

### B3. Auditoría de explotación y pruebas (12 familias)
**Entrada:** todas las matrices de aceptación ya documentadas y subsistemas conexos.
**Explotaciones mínimas:** encadenamiento de Acciones/Movimiento/Reacción; salto de requisitos por fisiología o profesión; telepatía/radar por sentidos o redes; curación gratuita; fabricación y recursos infinitos; apilamiento de Escala o Protección; magia/Maná fuera de presupuesto; combinaciones entre Razas/Rasgos/Trasfondo; inconsistencias de secuencia de turnos y descansos; alcance y línea de efecto; reglas al 0 Vida.
**Salida:** `auditorias/03_exploits_y_pruebas.md` con entradas identificadas y estado: **caso documental**, **verificación por lectura o simulación explícita**, **ejecución en entorno Foundry** o **playtest de mesa**. **No afirmar que un test se ejecutó cuando sólo se escribió.** Si no se dispone de runtime o grupo, dejar prueba empírica pendiente y cerrar razonablemente el control documental.

### B4. Auditoría comparativa y ajuste (12 familias)
**Entrada:** B1–B3 completadas; comparar cada pueblo con **los otros once** en escenas de combate, exploración, negociación, magia, viaje, sustento, descanso y economía.
**Evaluar:** nicho propio, frecuencia de uso, fuerza situacional vs. flexibilidad, coste de oportunidad, superposición funcional entre poderes, diferencia entre descripción y capacidad reglamentada, tratamientos dispares de un mismo efecto.
**Salida:** `auditorias/04_comparativa_y_veredicto.md` con matriz comparativa, mejora concreta seleccionada para el borrador, casos de regresión y veredicto **apto para texto final propuesto** o **revisar**.

### B5. Auditoría de consistencia transversal y regresión global
- Documento `auditorias_globales/01_matriz_de_interacciones.md`: 12 x 12 interacciones (o equivalentes entre capacidades para no duplicar pares), incluidas coincidencias de efectos: Escala, Carga, daño, defensa, curación, comunicación, magia, sustento, equipos.
- `auditorias_globales/02_registro_de_incidencias.md`: identificador, severidad (bloqueante/alto/medio/bajo), reproducibilidad, evidencia, propuesta de corrección, enlace a docs y situación abierta/cerrada.
- `auditorias_globales/03_regresiones_y_cierre.md`: pruebas de lectura y simulación de secuencia, pendientes empíricos no falsamente marcados como aprobados, recomendación de balance general.

**Condición de paso:** 12 carpetas tienen B1–B4 completas; incidentes bloqueantes resueltos **dentro de propuestas**, comparativa global cerrada y regresiones registradas. Si aparece problema, corregir y repetir la ronda pertinente; no avanzar a texto final hasta resolverlo documentalmente o reconocer la limitación material.

## Fase C — Escritura final propuesta para el Manual Básico (después de B)
- Crear por familia `manual_final_propuesto.md` como **texto autónomo, revisado y listo para maquetar**, con unas **650–850 palabras** de doble página de Manual Básico (página de historia/sociedad y página jugable), paquete de reglas **exacto** en relación al canon salvo modificaciones claramente **marcadas como PROPUESTA ALTERNATIVA**, con ejemplos y apartados que la mesa pueda usar directamente.
- Crear `nota_integracion_manual.md` por familia si el resultado exige alterar reglas de creación o anexos. Distinguir texto seguro sin cambios del canon vs. propuestas que requieren aprobación previa.
- Revisar y homogeneizar terminología, tono de español de Argentina, encabezados, densidad, numeración, subtítulos, iconografía/brief, compatibilidad con manual completo, distribución editorial entre dos páginas.
- Crear `manual_final/indice_y_criterios.md`, `manual_final/tabla_de_razas.md`, `manual_final/registro_de_diferencias_con_main.md`, y `manual_final/informe_de_entrega.md` con enlaces estables a los 12 textos.
- Los textos v0.1 anteriores permanecen como versiones editoriales de trabajo, no sustituyen la revisión posterior.

## Fase D — Cierre y decisión de no trabajar más
Sólo declarar terminado cuando:
1. Doce expedientes iniciales persistidos.
2. B1–B4 completadas para las 12 familias y B5 global verificada.
3. Mejoras y correcciones aplicadas **dentro de la rama de propuestas** y controles de regresión cerrados documentalmente.
4. Doce textos `manual_final_propuesto.md` terminados y revisados, índice, tabla, registro de diferencias e informe global.
5. Estado y limitaciones transparentes (sin confundir pruebas documentales con pruebas de mesa).
6. No quedar ningún pendiente sustantivo que pueda resolverse sin permisos o datos externos. La aprobación del creador/merge futuro **no es trabajo autónomo autorizado**: queda fuera de esta rama.

Si ya no hay trabajo sustantivo, no rehacer expedientes para responder a «avanzar», no crear revisiones cosméticas sin motivo y, si la automatización está disponible, **pausarla**. Si el usuario envía «avanzar» tras el cierre, responder sólo con un estado breve de finalización y la necesidad de aprobación global, sin fingir progreso.

## Rutina obligatoria en cada ejecución
1. Leer `00_tablero.md`, `README.md`, este plan y últimos documentos de la fase activa; verificar acciones recientes, evitar duplicados.
2. Consultar `main:docs/Tierra_Magica_Manual_Maestro.md` en las secciones exactas relevantes y comparar versión actual.
3. Ejecutar **una o más unidades sustantivas**, según tiempo y contexto: completar material, auditar una raza/varias, cerrar incidencia o redactar textos finales.
4. Persistir sólo bajo `propuestas/razas/` en la rama de propuestas; actualizar tablero y diario con fase, archivos, cantidad de casos de pruebas **reales vs. documentales** y próximo objetivo.
5. No pedir autorizaciones intermedias, no escribir `main`, Foundry, Manual activo ni atlas. Todo **PROPUESTA PARA APROBACIÓN GLOBAL**.


## Hito de ejecución — 18-11-2026: cierre documental B5

Esta adenda **no modifica los requisitos históricos del plan**. La fase B5 cumplió **sus condiciones de puerta documental** según [`auditorias/05_b5_acta_cierre_documental_condicionado_v4.md`](./auditorias/05_b5_acta_cierre_documental_condicionado_v4.md): siete decisiones candidatas unificadas, cuatro incidencias residuales conciliadas, 66 pares cotejados, 12 escenarios globales revisados por lectura, 30 criterios U y 28 V documentados. Todo sigue **no canónico y no ejecutado empíricamente**. La redacción Fase C se habilita **únicamente en rama de propuestas**, con paquete literal y alternativas explícitamente marcadas y notas de integración cuando correspondan. No autoriza publicación, merge, cambios del motor ni promesas de balance probado.

**Siguiente unidad autónoma:** `01_humanos/manual_final_propuesto.md` y nota de integración si existe diferencia normativa; después otras once familias, índice, tabla, registro de diferencias y entrega documental. Sin pedir microaprobaciones hasta la revisión global.
