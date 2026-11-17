# B5-I11 — Feéricos: Vuelo Hada, Agarrar, 0 Vida, Fuente y Escala

**17-11-2026 · PROPUESTA NO CANÓNICA, NO APROBADA.** Verificados tablero, README, plan, matriz B5, B2–B4 Feéricos y `main:docs/Tierra_Magica_Manual_Maestro.md` (blob `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`). **20 regresiones documentales diseñadas; 0 Foundry, 0 mesa.** B3 registra 24 comprobaciones auxiliares anteriores: no son pruebas de motor ni se repiten aquí.

## 1. Canon y fronteras

**Naturaleza Feérica** es descriptor, no Fuente, Disciplina, Maná, magia, Vínculo Divino, inmunidad o vulnerabilidad automática. Cuatro **ascendencias excluyentes**:
- **Hada:** Pequeña, MOV tierra5, aéreo inicial6; **debe comenzar y terminar cada turno apoyada** en superficie que la sostenga o permita posarse; sin vuelo bajo Carga Pesada/Excesiva ni suspensión final.
- **Sátiro:** Mediana MOV6; Paso de Cabra sólo evita sobrecostes enumerados de terreno natural físicamente transitable; Cuernos Daño3/Pen0 con ataque normal.
- **Dríade:** Mediana MOV6; Vínculo Arbóreo exige contacto con vegetación significativa de su vínculo y sólo informa estado general; Enraizar Acción en suelo apto, +1 categoría de Escala efectiva únicamente para resistir Empujar/Derribar/desplazamiento físico; liberar 1 MOV.
- **Silfo:** Mediana MOV6; Cuerpo del Viento ignora penalizaciones de desplazamiento por viento **mundano ordinario** y +1 categoría efectiva sólo ante Empujar por viento; no vuelo.
No se suman dos paquetes, Acciones, Reacciones, rangos ni PR por anatomía.

## 2. Propuestas de resolución

### B5-I11-P01 — Tránsito aéreo Hada y aterrizaje obligatorio

**Disparador:** turno de Hada que intenta usar MOV aéreo. **Coste:** Movimiento del turno, Acción adicional sólo si maniobra general la exige; **alcance:** MOV6 aéreo en trayecto con origen y destino de apoyo válidos; **duración:** ese turno. **Límites:** comprobar apoyo inicial, Carga, trayecto, coste de movimiento y apoyo final; no permitir terminar en aire, «mantener altura» entre turnos ni alternar MOV tierra5 + aire6 como dos reservas. Para combinación de medios, aplicar **como propuesta** el presupuesto fraccionario B5-I01, sin alterar canon.

**Interrupciones:** Agarrar, Empujar, pérdida de apoyo, caída a 0 Vida o agotamiento del MOV pueden impedir aterrizaje; no crear teletransporte gratuito hasta superficie segura. Resolver posición, caída y Reacciones según reglas generales. **Vacío abierto:** ventana exacta de caída cuando se pierde apoyo en mitad de desplazamiento y cómo asignar posición si el efecto interruptor deja el cuerpo en aire.

### B5-I11-P02 — Agarrar, Escala y Carga del Hada

**Disparador:** Agarrar, traslado de criatura, sujeción a objeto o desplazamiento forzado en vuelo. **Coste:** Acción/maniobra, MOV y Carga normales; **alcance:** cuerpos y objetos físicos; **duración:** estado/turno según regla general. **Propuesta:** Escala Pequeña sigue siendo real; alas no aumentan FUE, tamaño de presa, alcance ni carga transportable. Una criatura agarrada no se convierte en «equipo ligero» para eludir Carga Pesada/Excesiva; valorar la capacidad de transporte real antes de volar. Si la Hada queda Agarrada y no puede desplazarse, no ignora el estado por volar; la condición de terminar apoyada sigue vigente, con adjudicación de caída si se interrumpe. **Pendiente:** equivalencia de peso de criatura y Carga, pues no existe fórmula universal de inventario.

### B5-I11-P03 — 0 Vida, caída, estados y persistencia

**Disparador:** daño o efecto que deja a Hada en 0 Vida durante trayecto aéreo, o anula sustentación por Carga/estado. **Coste:** ninguno nuevo; **alcance:** personaje, trayecto y daño por caída; **duración:** hasta resolución del estado. **Propuesta:** 0 Vida = Incapacitado, no muerte automática; no puede gastar Acción/MOV para elegir aterrizaje después de incapacitarse. Resolver caída y consecuencias mediante reglas generales, no inmunidad por alas ni daño fijo inventado. Una Hada que ya aterrizó antes de 0 Vida no cae por estar alada; no retrotraer el daño a posición anterior. Para Dríade Enraizada, remitirse a B5-I02/B5-I09: no gana Acciones a 0 Vida ni mantiene bonificación flotando sin suelo. **Vacío:** orden de caída y daño si golpe y movimiento se resuelven simultáneamente.

### B5-I11-P04 — Descriptor, Fuente, vientos y no duplicación

**Disparador:** hechizo/ritual que menciona «Feérico», elección de Fuente, Rasgo de vuelo, Vínculo Arbóreo o terreno del Sátiro/Silfo. **Coste:** los del efecto externo o compra de Rasgo, sin beneficios raciales gratuitos; **alcance:** texto específico de cada rasgo; **duración:** según efecto. **Propuesta:** descriptor Naturaleza Feérica sólo activa reglas que lo reconozcan; no concede Fuente ni acceso a hechizos. Vuelo Natural general (coste PR aplicable) no apila dos reservas aéreas ni transforma automáticamente vuelo inicial Hada en vuelo sostenido; si el Rasgo mejora la capacidad, exigir lectura y coste explícitos. Silfo ignora viento mundano ordinario, no tormenta/magia ni Empujar de cualquier origen; Sátiro no atraviesa paredes ni hielo por Paso de Cabra. Vínculo Arbóreo no da cartografía, diálogo, detección a distancia ni información sobre magia no evidente.

## 3. Secuencias de prueba

| Caso | Estado y acciones | Resultado documental propuesto |
|---|---|---|
| Vuelo básico | Hada apoyada, Carga ligera → MOV aéreo6 → apoyo válido | Trayecto permitido |
| Vuelo sin salida | Hada apoyada → MOV aéreo hacia vacío → no hay apoyo final | No planificar final suspendido; resolver caída si interrumpido |
| Agarrar | Hada en vuelo → enemigo la agarra y detiene | No inmunidad; resolver Agarrado, posición y caída |
| Carga | Hada carga criatura y pasa a Carga Pesada | MOV aéreo impedido; no presa «sin peso» |
| 0 Vida | Hada aérea recibe daño → Incapacitada | Sin aterrizaje activo posterior; caída general |
| Fuente | Dríade pide hechizo gratis por Eïra | No Fuente/Maná gratis |
| Silfo | Viento mundano vs Empujar mágico | Protección estrecha sólo al primero |
| Dríade | Enraizar, suelo destruido | Sin anclaje sobre vacío, remitir B5-I02 |

## 4. Regresiones B5-I11-T01–T20 — DOC no ejecutadas

| ID | Preparación | Resultado esperado |
|---|---|---|
| T01 | Hada empieza y termina apoyada | Vuelo inicial MOV6 válido |
| T02 | Hada quiere terminar suspendida | No |
| T03 | Hada sin apoyo inicial quiere despegar | No habilitación automática |
| T04 | Hada Carga Pesada quiere volar | No |
| T05 | Hada suma MOV5 terrestre + MOV6 aéreo | No dos reservas; B5-I01 |
| T06 | Hada interrumpida por Agarrar | No inmunidad, ventana abierta |
| T07 | Hada transporta criatura de Carga excesiva | No elude Carga |
| T08 | Hada cae a 0 Vida en aire | Incapacitado, resolver caída |
| T09 | Hada aterriza y luego cae a 0 Vida | No caída aérea retroactiva |
| T10 | Hada solicita vuelo sostenido por alas | No |
| T11 | Naturaleza Feérica pide Maná/Fuente | No |
| T12 | Ritual reconoce descriptor Feérico | Sólo efecto que lo mencione |
| T13 | Sátiro cruza raíces transitables | Sin sobrecoste por esa causa |
| T14 | Sátiro trepa pared vertical | Paso de Cabra no habilita |
| T15 | Sátiro ataca con Cuernos | Daño3/Pen0, sin ataque adicional |
| T16 | Dríade usa Vínculo sin contacto | No |
| T17 | Dríade Enraiza y resiste Empujar | Acción, +1 Escala efectiva específica |
| T18 | Dríade pierde suelo bajo raíces | No anclaje suspendido |
| T19 | Silfo se desplaza con viento mundano ordinario | Ignora penalización de viento solamente |
| T20 | Silfo reclama resistencia contra Empujar mágico no eólico | No +1 automático |

**Validación futura:** ejecutar T01–T10 con mapa vertical, estados, Reacciones, Carga y caída; T11–T12 con dos efectos que mencionen/no mencionen Feérico; T13–T20 con terreno, Empujar y soporte. Registrar posición, MOV, Acción, condición, DF y daño. **Las expectativas no equivalen a pruebas ejecutadas.**

## 5. Dictamen

**B5-I11: propuesta documental desarrollada, validación pendiente.** Abiertos: pérdida de apoyo y caída a mitad de turno, transporte de criaturas y Carga, sincronía de 0 Vida, coste/compatibilidad de Vuelo Natural. Cruces X02-07, X05-07, X06-07, X07-10, X07-12; B5-G01/G02/G04/G09. **Siguiente B5-I12:** cierre de incidencias residuales y matriz transversal de aceptación/rechazo antes de fase C.
