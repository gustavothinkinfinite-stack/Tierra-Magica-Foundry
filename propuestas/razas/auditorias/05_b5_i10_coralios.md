# B5-I10 — Coralios: hidratación, respiración, presión, Medicina y equipo

**17-11-2026 · PROPUESTA NO CANÓNICA, NO APROBADA.** Contrastados tablero, README, plan, matriz B5, B2–B4 Coralios y `main:docs/Tierra_Magica_Manual_Maestro.md` (blob `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`). **20 regresiones DOC diseñadas; 0 Foundry, 0 mesa.** No se cambian reglas vigentes.

## 1. Canon inalterable

Coralio: Escala Mediana, **MOV terrestre 5, acuático 6**. **Respiración Anfibia** permite respirar aire y agua **mientras esté razonablemente hidratado**; no protege presión, temperatura, corrientes, contaminación ni desecación. **Esqueleto Coralino:** Protección Natural 1; con armadura se aplica **mayor**, no suma. **Sentido de Corriente:** +1 PER sólo si corrientes, vibraciones o cambios de presión **del agua** son determinantes; no sonar ni PER general. El paquete no incluye Resonancia Oceánica, Fuente, magia, habilidad, PR ni equipo gratuito. Anfibio general (1 PR) no duplica una propiedad idéntica. Fatiga, Descanso, Medicina, 0 Vida y Trauma conservan reglas generales.

## 2. Resoluciones propuestas

### B5-I10-P01 — Hidratación operativa sin penalización inventada

**Disparador:** exposición prolongada al aire seco, calor, falta de agua o interrupción de hidratación; **coste:** agua, acceso a medio adecuado, provisiones, tiempo y acciones normales; **alcance:** individuo; **duración:** mientras cambie la condición ambiental. **Propuesta:** registrar `fuente de agua / último mantenimiento / exposición / equipo / criterio de hidratación razonable`; si el estado es incierto, adjudicar mediante subsistema general de supervivencia, viaje y Fatiga. La falta de hidratación **no** activa automáticamente un reloj numérico de asfixia ni una penalización universal inventada: el canon no define umbral de horas ni cantidad de agua. Si ya no está razonablemente hidratado, la respiración anfibia **deja de estar garantizada**; adjudicar efectos concretos con reglas generales, sin inferir muerte inmediata. Una cantimplora, tanque o traje sólo sirve según su funcionamiento y suministro, no por mencionarlo.

### B5-I10-P02 — Respiración, movimiento y presión como ejes separados

**Disparador:** paso tierra/agua, inmersión, buceo, ascenso, corriente fuerte o zona contaminada; **coste:** Movimiento/Acción y recursos del entorno/equipo; **alcance:** medio real; **duración:** exposición. **Propuesta:** registrar separadamente `medio respirable / hidratación / MOV válido / presión / temperatura / corriente / contaminación`. Coralio hidratado puede respirar en ambos medios; **no** elimina pruebas o daño por profundidad, corriente, frío o contaminantes. En cambio de medio usar presupuesto fraccionario de B5-I01 **como propuesta**, nunca sumar MOV5 + MOV6 como dos reservas. Si un traje mantiene hidratación, no supone por ello inmunidad a presión ni mejora MOV; requiere perfil de equipo. La presión del agua no habilita automáticamente Sentido de Corriente: debe ser señal determinante para la percepción concreta.

### B5-I10-P03 — Medicina, Protección y equipamiento

**Disparador:** daño, Sangrado, tratamiento, armadura, equipo de buceo o descanso; **coste:** materiales, Acción, pruebas, Energía y mantenimiento del subsistema correspondiente; **alcance:** personaje y equipo equipado; **duración:** uso o tratamiento. **Propuesta:** Esqueleto Coralino Protección 1 frente a armadura Protección 2 produce **2, no 3**; aplicar Penetración al valor pertinente según reglas generales. Una grieta coralina no es inmunidad a Sangrado, Trauma o Herida Grave. Medicina funciona con método aplicable y no regala curación por contacto con arrecife. Respiradores, depósitos, filtros, trajes de presión y dispositivos arcano-industriales no vienen con la ascendencia: comprobar capacidad, estado, acceso, Energía/Caudal y acciones. Si un Rasgo Anfibio general replica exactamente respiración aire/agua, no duplicar efecto ni cobrar dos veces la misma propiedad; **pendiente** definir si la hidratación condiciona la equivalencia en el caso concreto.

### B5-I10-P04 — Paridad intermedios, señales y 0 Vida

**Disparador:** comparación Coralio/Terio acuático/Feérico acuático/Micelio/Verdante o caída a 0 Vida. **Coste:** ninguno nuevo; **alcance:** paquete base; **duración:** rasgos originales. **Propuesta:** no convertir Sentido de Corriente en detección universal de trampas, invisibilidad o entidades tras muros; B5-I03 mantiene señal física vs localización. Terio con locomoción acuática no obtiene respiración sin rasgo costeado; Coralio ya tiene ambas capacidades, condicionadas por hidratación y MOV distintos. A 0 Vida queda Incapacitado; no puede usar Acción de equipo ni «repararse» automáticamente con agua; Trauma y Medicina generales. **Reserva:** balance comparado de la dependencia hídrica y disponibilidad de equipo, no resolverlo con bono de combate.

## 3. Casos secuenciales

| Situación | Secuencia | Dictamen |
|---|---|---|
| Puerto seco | Viaje largo → revisar agua disponible → descansar | Mantener necesidad de hidratación; sin umbral inventado |
| Costa a mar | MOV terrestre 5 → entrar al agua MOV6 | B5-I01 fraccional propuesto, no 11 espacios |
| Profundidad | Hidratado → bucea con presión extrema | Respiración sí, presión aún amenaza |
| Armadura | Protección Natural1 + armadura2 | Protección 2, no 3 |
| Sentido | Corriente acuática indica movimiento | +1 PER sólo si señal determinante |
| Incapacitado | A 0 Vida, pide usar tanque | Sin Acción ilegal; tratamiento normal |

## 4. Regresiones B5-I10-T01–T20 — DOC no ejecutadas

| ID | Preparación | Resultado esperado |
|---|---|---|
| T01 | Hidratado, respiración aérea | Válida |
| T02 | Hidratado, respiración acuática | Válida |
| T03 | Deshidratado, exige anfibio garantizado | No garantizado; adjudicar consecuencia |
| T04 | Falta de agua por una hora | No inventar daño fijo ni reloj universal |
| T05 | Equipo con depósito sin agua | No suministra hidratación |
| T06 | Equipo con agua y capacidad comprobada | Puede mantener hidratación según perfil |
| T07 | Inmersión profunda | Sin inmunidad a presión |
| T08 | Corriente violenta | Sin inmunidad a arrastre |
| T09 | Agua contaminada | Sin inmunidad a contaminación |
| T10 | Agua fría | Sin inmunidad a frío |
| T11 | Cambio tierra MOV5 → agua MOV6 | No doble reserva; B5-I01 |
| T12 | Protección Natural1 sin armadura | Protección1 |
| T13 | Protección Natural1 + armadura2 | Protección2, no3 |
| T14 | Penetración frente a protección | Fórmula general, sin blindaje extra |
| T15 | Corriente/vibración acuática determinante | +1 PER |
| T16 | Percepción visual en aire sin agua | Sin +1 racial |
| T17 | Invisibilidad sin señal de agua | No detección gratuita |
| T18 | Rasgo Anfibio general idéntico | No apilamiento ni doble cobro |
| T19 | Sangrado/Herida coralina | Medicina aplicable, no inmunidad |
| T20 | Caída a 0 Vida y equipo accionable | Incapacitado; no Acción ilegal |

**Protocolo futuro:** T01–T06 en tres duraciones de exposición, T07–T10 con presión/corriente/contaminación/frío independientes, T11 con coordenadas y Movimiento real, T12–T14 con Penetración, T19–T20 con Medicina y Trauma. Registrar fuentes, recursos, DF, costes y estado; **DOC no es prueba empírica**.

## 5. Dictamen

**B5-I10: solución documental propuesta; validación pendiente.** Abiertos: umbral operativo de «razonablemente hidratado», consumos de equipo, equivalencia de Anfibio con condición hídrica, reglas de presión y recuperación; cruces X06-12, X07-12, X09-12, X10-12, X11-12; B5-G01/G05/G09. **Siguiente B5-I11:** Feéricos, Vuelo Hada, Agarrar/0 Vida, Fuente y cambios de Escala.
