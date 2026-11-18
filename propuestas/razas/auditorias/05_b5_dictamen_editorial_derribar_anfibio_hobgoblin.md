# B5 — Dictamen editorial comparado: Derribar, Anfibio y paridad Hobgoblin

**18-11-2026 · NUEVA UNIDAD DOCUMENTAL · NO CANÓNICA · FASE C TODAVÍA BLOQUEADA.**

**Fuente vigente comprobada directamente:** `main:docs/Tierra_Magica_Manual_Maestro.md`, blob **`334770e7ed7d2605767aecb169f57da6c1100508`**. Relectura de §3 Enanos (267–270), Goblinoides (293–315), Terios (319–343), Feéricos/Dríade (362–366), Verdantes (401–406), Coralios (421–433), compatibilidad racial (435–439), Rasgo Anfibio (2206–2212), maniobras (2681–2737), Defensas (2959–2970), Vida y Trauma (3680–3684), y flujo (154–156). Entradas: acta B5, `05_b5_decisiones_operativas_siete_bloqueos.md`, `05_b5_control_canon_costes_maniobras_y_estados.md`, `05_b5_resolucion_derribar_hobgoblin_interrupciones.md`, `05_b5_comparativa_enraizar_hobgoblin_conductor.md`, `05_b5_revision_xg_cero_vida_y_puerta_v2.md` y `05_b5_dictamen_derribar_retirada_economia.md`.

**Objeto:** revisar las tres decisiones incompatibles o insuficientemente cerradas: DER-R2 (Escala contra Derribar), D05 (Coralio + Anfibio 1 PR) y D06/Señal de Coordinación (paridad Hobgoblin). **18 casos DOC nuevos** con resultados y exclusiones; **0 casos ejecutados en Foundry, 0 mesa, 0 ensayos probabilísticos de balance**. No contar estos 18 como pruebas reales ni sumarlos a las 238 regresiones originales sin etiquetar la ampliación.

## 1. Dictamen sobre DER-R2: convertir una categoría de Escala en resistencia a Derribar

**Canon literal:** `Derribar` gasta una Acción y compara prueba con **Defensa de Maniobra = 11+AGI+bono defensivo aplicable**; no hay cálculo de Escala en su procedimiento (líneas 2700–2717). `Empujar` sí usa Escala para reducir distancia al desplazar (2729–2735). **Cuerpo de Piedra** del Enano expresa «resistir Derribar» tratándolo como Mediano efectivo **sin mejorar Defensa general**. Dríade y Verdante Enraizados elevan su categoría efectiva sólo para resistencias definidas; requieren **Acción** y suelo y se liberan por 1 MOV. **No es canónico** asignar +1 numérico a Defensa de Maniobra por el mero aumento de categoría.

**Opciones enfrentadas:**
- **R0, lectura estricta sin cambio:** conservar Defensa de Maniobra normal y la Escala efectiva declarada, pero el beneficio no tiene efecto definido en la prueba de Derribar. **Ventaja:** cero reglas nuevas; **coste:** efecto racial declarado queda inoperante en una maniobra.
- **R1, sólo Enraizar:** +1 circunstancial a Defensa de Maniobra de Dríade/Verdante, **sin Enano**. **Problema:** misma expresión «resistir Derribar» deja sin tratamiento el Enano y aumenta asimetría.
- **R2, propuesta preferida:** +1 circunstancial a Defensa de Maniobra **sólo frente a Derribar** si una regla racial **explícita** eleva Escala efectiva al resistirlo y la condición está vigente. Abarca Enano, Dríade y Verdante; no +Defensa universal, no Agarrar/Desarmar, no Carga, no ataque, no multiplicación por dos fuentes idénticas. La reducción de distancia de Empujar sigue su procedimiento, **sin el +1**. **Costo:** añade un modificador que debe aprobarse como regla transversal; no inferir aprobación.

**Persistencia propuesta a 0 Vida:** Incapacitado no crea una Reacción ni destruye automáticamente un rasgo anatómico pasivo. Enano conserva el requisito pasivo para resistir si existe una maniobra válida; Dríade/Verdante sólo si **ya** estaban anclados y el suelo sigue apto. Se evalúan legalidad y utilidad física de Derribar sobre el cuerpo incapacitado antes de comparar Defensa; si está ya Derribado, no acumula ese estado. Para ruptura simultánea sin prioridad expresa, conservar orden propuesto **estado inicial → resolución → ruptura**, señalándolo como arbitraje, nunca como regla vigente.

| Caso DOC | Entrada | Salida bajo R2 **NO CANÓNICA** | Contraste |
|---|---|---|---|
| B5-EDH-DER01 | Enano Pequeño, base Defensa Maniobra 13, Derribar | **14** para esa prueba | R0 seguiría **13**; dos propuestas diferentes |
| B5-EDH-DER02 | Enano base 13, Empujar | **13** para oposición; categoría efectiva en **distancia** | Prohibir +1 de Defensa en Empujar |
| B5-EDH-DER03 | Dríade ya Enraizada, suelo apto, base 13 | **14** ante Derribar | No +1 ante Desarmar |
| B5-EDH-DER04 | Dríade perdió suelo **antes** de ser derribada | **13** | Estado de anclaje deja de existir |
| B5-EDH-DER05 | Verdante ya anclado a 0 Vida, suelo estable | **14 sólo si** existe Derribar físico legal que consulte Defensa; sin Acción/Reacción del defensor | No habilitar una tirada adicional |
| B5-EDH-DER06 | Orco Complexión Orca o Bugbear Grande para Carga, base 13 | **13** | No hay rasgo que eleve Escala para resistir Derribar |

**Juicio editorial:** retener **R2 como candidata única de corrección** porque traduce tres textos explícitos con la misma operación y evita parchear sólo Enraizar. **NO declarar I02 cerrado** hasta reconciliar defensa estática para Incapacitado, daño y soporte simultáneos y confirmar el cambio numérico con aprobación global. Si se prefiere R0, debe anotarse expresamente en el texto final que la parte de «resistir Derribar» carece de traducción y puede ser objeto de corrección, no simular beneficio.

## 2. D05: respiración Coralio condicionada y Anfibio independiente

**Canon literal:** Terio `Locomoción Especializada (nado6)` proporciona MOV en un medio, **no** garantía respiratoria (339). La anatomía branquial es funcional según linaje (321), pero sin entrada cuantificada equivalente, asunto independiente aún abierto. `Anfibio` es **Rasgo Innato de 1 PR**: respirar aire/agua ordinarios; no Movimiento acuático ni inmunidad a corriente, presión, contaminación, frío o **deshidratación** (2206–2212). Coralio **Respiración Anfibia** funciona mientras esté «razonablemente hidratado» (430); privación no tiene cronómetro racial universal fijado.

**Opciones:**
- **A, prohibir compra Coralio+Anfibio por redundancia:** evita doble pago pero impide una elección de Rasgo que podría aportar un ámbito diferente cuando el Coralio está seco. La regla universal sólo prohíbe acumular/cobrar dos veces por la **misma propiedad**.
- **B, compra permitida con fuente independiente [D05 candidata]:** el Coralio conserva su facultad fisiológica condicionada y, **si legalmente compró Anfibio 1 PR**, la capacidad respiratoria general del Rasgo puede seguir aplicando a aire/agua ordinarios aun cuando la modalidad racial esté limitada por sequedad. Sigue padeciendo falta de hidratación y sus efectos normales: **respirar ≠ estar hidratado, ≠ curar desecación**. En ambiente hidratado las dos fuentes no suman, por ser equivalente la función inmediata. Esta independencia **no se declara canónica**.
- **C, Anfibio se somete también a hidratación racial:** la compra sería normalmente funcionalmente redundante. Si se elige esta alternativa, no recomendarla como mejora de balance ni insinuar protección inexistente.

| Caso DOC | Configuración | Lectura literal o decisión D05 | Exclusión |
|---|---|---|---|
| B5-EDH-ANF01 | Terio Nado6, sin Rasgo | **MOV6 agua** no implica respirar agua por locomoción | Branquias concretas se debaten aparte |
| B5-EDH-ANF02 | Terio Nado6 + Anfibio 1 PR | Nado6 más respiración funcional aire/agua ordinarios; **quedan 2 PR** | No nadar12 ni protección de presión |
| B5-EDH-ANF03 | Coralio hidratado, sin compra | Respira aire/agua por capacidad racial sin pagar PR | Sigue MOV tierra5/agua6 |
| B5-EDH-ANF04 | Coralio seco, sin compra | El canon **no garantiza** respiración racial sin hidratación razonable | No inventar muerte/daño por ronda |
| B5-EDH-ANF05 | Coralio seco + Anfibio comprado 1 PR | **Según propuesta D05-B**, respirar aire/agua ordinarios por Rasgo general, **pero sin reparar sequedad** | Requiere decisión global, no dato vigente |
| B5-EDH-ANF06 | Coralio con Anfibio1 PR intenta también Rasgo3 PR en creación | **Inválido:** 1+3 > 3 PR disponibles | No adelanto de PR por raza |

**Juicio editorial:** recomendar **D05-B como interpretación candidata acotada**, porque conserva diferenciación entre hidratación fisiológica y función respiratoria comprada sin inventar protección ambiental. **Bloqueo I05 continúa** hasta decidir cómo tratar branquias de Terios y establecer ejemplos de consecuencias por privación compatibles con reglas generales sin reloj racial arbitrario. No introducir ambas alternativas en el texto final.

## 3. D06: valor de Hobgoblin frente a Goblin/Bugbear

**Canon literal:** tres Goblinoides comparten `Ojo para la Oportunidad` **1/Escena y +1 antes de una prueba propia con oportunidad concreta**. Goblin añade `Escurridizo`; Bugbear añade `Complexión Bugbear` restringida a Carga/objeto inerte; Hobgoblin **no añade segunda prestación mecánica** por ser culturalmente organizado (299–315). 25 PD/3 PR de creación son independientes. El diferencial de utilidad es **real en catálogo**, pero no hay medición de potencia/valor durante partida.

**Candidata de diseño B5-D06-R1, no canónica:** `Señal de Coordinación` **sustituye completamente Ojo** (sin sumarse ni pagarse con PR del catálogo), usa **Acción** y 1/Escena, aliado distinto consciente y capaz de percibir señal a ≤6 espacios, oportunidad concreta comunicable, +1 circunstancial a **una prueba propia del aliado** declarada antes de su próximo turno completo y que aproveche esa oportunidad. Caduca si no se usa; no puede transferirse, repetirla tras fallo, conceder Ventaja ni generar información. Señal/Ojo/Señal sobre idéntica prueba no apilan por la misma propiedad.

**Problema de paridad:** Señal desplaza el +1 de la prueba propia a un aliado pero **cobra una Acción**, mientras Ojo no gasta Acción adicional. Por tanto **no es una compensación de potencia garantizada** por la falta de una segunda facultad del Hobgoblin: puede ser inferior en escenas solitarias o cuando el aliado no alcanza a aprovecharla; ocasionalmente la prueba del aliado puede ser más determinante, pero no existe evaluación cuantitativa del peso de Acción, objetivo ni frecuencia. No presentar `Señal` como «Hobgoblin equilibrado».

**Cinco escenas emparejadas — criterios cualitativos, no playtests:**

| Caso DOC | Escena igual para todos | Goblin | Bugbear | Hobgoblin base / Señal candidata |
|---|---|---|---|---|
| B5-EDH-HOB01 | Solitario, mapa nuevo, prueba propia pertinente | Ojo +1; movilidad situacional adicional | Ojo +1; Carga situacional adicional | Ojo +1; **Señal inútil sin aliado** |
| B5-EDH-HOB02 | Grupo, aliado hace prueba crítica, Hob tiene Acción libre | Ojo propio si hay prueba propia | Ojo propio si hay prueba propia | Base no transfiere; **Señal** permite +1 del aliado **pagando Acción y renunciando Ojo** |
| B5-EDH-HOB03 | Grupo, aliado a 7 espacios o sin percepción de señal | Ojo propio normal | Ojo propio normal | Base Ojo propio; **Señal no elegible** |
| B5-EDH-HOB04 | Dos Señales al mismo aliado; aliado ya tiene Ojo sobre misma oportunidad | No apilar modificadores equivalentes | Igual | Bajo variante, **máximo +1**, nunca +2/+3 |
| B5-EDH-HOB05 | Combate bajo presión, Hob usa Acción para ataque propio o Señal | Ojo aplicable a su ataque propio si oportunidad | Ojo propio + beneficio físico contextual | Con Ojo mantiene Acción para atacar; con Señal **sacrifica Acción**, el beneficio grupal no equivale a ataque adicional |
| B5-EDH-HOB06 | Hob Incapacitado tras recibir ataque | Rasgos pasivos/condiciones propios | Ídem | Sin Acción nueva para Señal; Ojo no concede Acción nueva |

**Juicio editorial:** **mantener Hobgoblin canónico con Ojo** como texto base hasta una decisión explícita del autor. Conservar Señal sólo como **variante de diseño opcional**, no como reparación ratificada de paridad. **I06 sigue bloqueada como conclusión de balance**: elegir uno de dos criterios honestos, (i) aceptar una asimetría deliberada y documentar que no se afirma paridad; o (ii) diseñar/medir una segunda prestación con costo comparable, sin regalársela por cultura. La opción (ii) requiere pruebas emparejadas y nueva B4, no una etiqueta de «equilibrado».

## 4. Matriz de la puerta editorial B5 — estado tras este dictamen

| Incidencia | Resultado documental obtenido | Estado real |
|---|---|---|
| **I02 Derribar** | R2 seleccionada como única corrección candidata coherente entre Enano/Dríade/Verdante; seis controles numéricos y un caso a 0 Vida condicional | **ABIERTA** por regla numérica nueva pendiente |
| **I05 Anfibio** | B como opción acotada de dos fuentes de respiración, seis casos y frontera de privación | **ABIERTA** por Terios/branquias y aprobación |
| **I06 Hobgoblin** | Comparación emparejada muestra que Señal no garantiza paridad; preferible no cambiar paquete base | **ABIERTA** por decisión deliberada de asimetría o rediseño |
| **I01/I04/I08/I10** | Sin cambios: seguir protocolos D01/D04/D08/D10 y sus propuestas, pruebas y puertas pendientes | **ABIERTAS** |
| **I03/I07/I09/I11** | Propuestas parciales, cierres editoriales aún por hacer | **ABIERTAS** |
| **I12** | Restricciones canónicas de economía/oficios y presupuestos delimitadas | **CONTROL DOCUMENTAL, no prueba de ejecución** |

**Conteo exclusivo de este documento:** **18 nuevos criterios DOC (6 DER, 6 ANF, 6 HOB), 0 ejecutados**. No reemplazan ensayos XG/G01–G12, no prueban paridad, no autorizan manual final. No contar 18 como regresiones ejecutadas. **B5 permanece abierta, Fase C bloqueada**, sin introducir ninguna modificación en `main`, Foundry ni cartografía.

## 5. Próxima unidad concreta y condición de cierre

1. Preparar **acta de puerta editorial v3** que registre explícitamente R2/D05-B/Señal como candidatas y los **siete bloqueos aún abiertos**, sin marcar I02/I05/I06 cerradas ni prometer homologación.
2. Revisar **12 escenarios globales G01–G12** bajo dichas candidatas en términos de entradas/salidas/contraejemplos y marcar `DOC revisado` sólo cuando exista comprobación específica; mantener `EJECUTADO=NO`.
3. Decidir en el expediente si el proyecto admite **cierre documental condicional** con opciones identificadas, pero **no avanzar a fase C** hasta seleccionar un texto sin contradicción para cada bloqueo.

**Guardián de cambios:** exclusivamente `propuestas/razas/` de la rama `propuestas/razas-autonomas-2026`. Ni `main`, Manual Maestro, código Foundry, mapa ni ratificación del creador se modifican mediante esta auditoría.
