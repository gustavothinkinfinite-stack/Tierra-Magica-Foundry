# B2 — Coralios: auditoría mecánica de dos medios, Protección Natural y respiración

**ESTADO:** B2 **COMPLETADA DOCUMENTALMENTE**; incidencias pendientes B3/B4. **PROPUESTA NO CANÓNICA, NO APROBADA.** Fecha: 17-11-2026. **No hay playtests reales ni ejecuciones de pruebas Foundry**: los 64 criterios del expediente son predicciones derivadas de las reglas escritas.

**Fuente primaria reabierta:** `main:docs/Tierra_Magica_Manual_Maestro.md`, SHA blob `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`, paquete Coralio v0.3 (§3, líneas 421–433), generales de paquetes y protecciones (231–247), Rasgo **Anfibio 1 PR** (2206–2211), Sentido Agudo (2190–2198), Resistencia Ambiental 1/2 PR (2291 ss.), economía Movimiento/Acción/Reacción/Retirada/Correr (2801–2813; 2852–2870), Fatiga (3750–3760), reglas de Caída y 0 Vida/Trauma (3680–3748), Protección y Penetración (`ProtEfectiva = max(0,Prot−Pen)`, 2910–2957), equipo/CRAFT (3454, 3636–3647), magia `Piel Alterada`/`Barrera Cinética`/Sostenimiento y Viaje/Agua/Forraje (2552–2600). **Borradores contrastados:** `12_coralios/auditoria_y_desarrollo.md`, `doble_pagina.md`, `pruebas_balance.md`, `cierre_editorial.md` y B1 `auditorias/01_canon_y_lore.md`. Las comparaciones de alcance con Hadas, Terios, Micelios y Verdantes son **controles de interfaz**, no B4 cuantitativa.

## I. Paquete racial exacto, sin segunda ascendencia ni costes gratuitos

| Capacidad | Resultado canónico | No otorga |
|---|---|---|
| Escala | **Mediana** | Escala Grande por placas o mayor alcance |
| Movimiento | **5 terrestre, 6 acuático** | Dos reservas independientes completas por turno, Correr gratis, inmunidad a corrientes |
| **Respiración Anfibia** | Respirar **aire y agua** mientras permanezca **razonablemente hidratado** | Tolerancia automática a presión, desecación, tóxicos, temperatura, corrientes o líquidos no respirables |
| **Esqueleto Coralino** | **Protección Natural 1**, no acumulable con armadura | Protección general +1 encima de cualquier armadura, Defensa/Resistencia, inmunidad a daño de caída/Trauma |
| **Sentido de Corriente** | **+1 PER** cuando corriente, vibración o cambio de presión **del agua** es el medio **determinante** de percepción | PER general, detección de Hechizos, sonar, visión sin luz, identidad de lo detectado |
| Magia oceánica | Historia de relaciones con fenómenos marítimos; futura **Resonancia Oceánica** requeriría opción definida y costeada | Fuente, Canalización, Ritualismo, Hechizos, Rasgos o afinidad acuática extras por nacimiento |
| Creación | Una Ascendencia, un Origen, un Trasfondo, **25 PD y 3 PR comunes**, equipo por reglas | Idioma, Habilidad, atributos, profesión, componente coralino o Vínculo gratis |

Los cuatro perfiles anatómicos y sociedades costeras del expediente son **[PROPUESTA DE LORE]**; no dan cuatro subrazas o paquetes acumulables. Edad 18–30 y vida 80–150 años se tratan como propuestas abiertas a B4, sin progresión especial.

## II. Matriz B2 de capacidades y cruces con 18 fichas

| ID | Fuente, disparador, ventana y coste | Resultado exacto / restricción | Pruebas / borde |
|---|---|---|---|
| COR-B2-R01 — Movimiento tierra | Movimiento normal en tierra **5** | No reemplazar por 6 de agua ni apilar velocidad acuática | COR-T37/49/50 |
| COR-B2-R02 — Movimiento agua | Nado/Movimiento acuático base **6** por raza | No elimina condiciones de agua peligrosa, corriente, presión, equipo o natación cuando pertinente | COR-T38/51 |
| COR-B2-R03 — Cambio de medio | Un turno tiene **una reserva de Movimiento**, pese a dos velocidades disponibles | No 5+6 automático; algoritmo de conversión/Retirada/Correr/Fatiga **no explicitado**: B3 | COR-T39/49/52 |
| COR-B2-R04 — Respiración aire | Cuerpo **razonablemente hidratado**, aire respirable | No reserva extra de aire, no necesidad de pecera permanente ni inmersión cada turno | COR-T11–12/59 |
| COR-B2-R05 — Respiración agua | Agua respirable, hidratación razonable | No presión, corriente, contaminación, toxina, agua sin oxígeno compatible o inmersión imposible | COR-T13–16/20 |
| COR-B2-R06 — Condición hidratación | «Razonablemente hidratado» **sin reloj/DF/duración escrita** | No inventar daño por hora ni inmunidad universal; CHC-01 es sólo **[PROPUESTA]** | COR-T17/45–46/60 |
| COR-B2-R07 — Rasgo General Anfibio | **1 PR** para otros PJ; respirar aire/agua ordinarios, no nado ni protección | Propiedad respiratoria repetida no se suma ni elimina por sí sola la condición de hidratación Coralio | COR-T18/58 |
| COR-B2-R08 — Resistencia Ambiental | Menor 1 PR +1 VIG o Significativa 2 PR Ventaja en exposición elegida | No inmunidad ni sustento/hidratación gratis; no duplicar grado equivalente | COR-T19/57 |
| COR-B2-R09 — Esqueleto Coralino | Prot Natural **1** permanente según efecto de daño aplicable | No Prot + armadura, no casco de 1 extra o Escala efectiva, no inmunidad | COR-T21–26 |
| COR-B2-R10 — Equipo con Protección | Protección mayor entre armadura y natural en capa equivalente | Prot1 + armadura Prot3 = **3**, nunca 4. Penetración se resta del valor relevante | COR-T22/23/53–54 |
| COR-B2-R11 — Magia/Protección | `Piel Alterada` Prot2 contra categoría elegida, Sostenido, coste propio; `Barrera Cinética` +Defensa por Reacción | No sumar `Piel Alterada` equivalente a armadura y natural; Barrera no es Prot sin texto | COR-T24/55 |
| COR-B2-R12 — Daño ambiental/caída | Proteger sólo cuando efecto de Protección es pertinente; aire/agua respirable no anula impacto | No Proteccion1 contra presión automáticamente; agua no elimina daño de caída grande | COR-T27/28/56–57 |
| COR-B2-R13 — Sentido de Corriente | Prueba de **PER** con corriente/vibración/presión de **agua** decisiva | +1 condicionado, sin radio numérico o sonar; no Iniciativa/ataque general | COR-T29–36/61 |
| COR-B2-R14 — Sentido y Rasgos | `Sentido Agudo` 1 PR para sentido anatómico elegido, +1 PER estrecho | No doble +1 sobre la **misma señal y prueba**; distintas señales pueden coexistir conforme a texto | COR-T35/63 |
| COR-B2-R15 — Acciones/equipo acuático | Una Acción y una Reacción por turno; equipo físicamente compatible con agua | No tridente, Ingeniería/Pilotaje, segundo ataque/acción ni uso automático de dispositivo mojado | COR-T40–44 |
| COR-B2-R16 — Vida/Trauma/Fatiga | A 0 Vida Incapacitado y Trauma por reglas; Sangrado, Medicina, Descanso normal | Respiración anfibia no evita asfixia ambiental/0 Vida ni Cura/crafting corporal | COR-T27/57 |
| COR-B2-R17 — CRAFT/ciudades vivas | Requiere Proyecto, materiales, instalaciones, Herramientas y tiempo | No fabricar arcilla/coral infinito, Familiar oceánico, vivienda, armadura o equipo del cuerpo | COR-T25/26/64 |
| COR-B2-R18 — Biología/cultura/magia | Una ascendencia separada de Origen, Vínculo, profesiones, Religión y tramas de Nacre | `Resonancia Oceánica` futura no se concede; Crisis de Nacre 598 C. permanece misterio | COR-T01–10/48 |

**Temporización:** Esqueleto y respiración no tienen coste de Acción ni recurso 1/Escena escrito; Sentido sólo afecta prueba elegible de percepción; las dos velocidades siguen una reserva de Movimiento normal. `Cuidado de la Humedad` (CHC-01) añade **pauta editorial opcional**, no regla publicada o temporizador racial.

## III. Cambio entre Movimiento terrestre 5 y acuático 6: falta de algoritmo

Las reglas universales (§6) conceden **una reserva de Movimiento por turno** y permiten dividirla con la Acción. `Correr` utiliza Acción para añadir otro tramo equivalente al Movimiento base. La ficha Coralio da **dos velocidades por medio**, pero la norma general no establece procedimiento específico de conversión si el PJ pisa muelle, entra al agua y vuelve a subir en un solo turno. Por eso:

- **Seguro por canon:** si permanece en tierra, Movimiento **5**; si permanece nadando todo el turno, **6** bajo condiciones aplicables.
- **Seguro por economía:** no puede usar «Movimiento tierra 5 **más** agua 6 = 11» como dos reservas completas por cambio de medio.
- **Abierto B3:** cómo gastar, conservar o recalcular puntos con **tramos mixtos** y cómo afecta `Correr`, `Retirada`, `Exhausto` (MOV−2, mínimo 1), Carga y maniobras de agua. No fijar «restar 3 de 6» como regla canónica ni permitir que cambio de medio reinicie la reserva.
- **Transversalidad:** el mismo problema afecta a Hadas (tierra5/aéreo6), Terios con Locomoción especializada y criaturas con vuelos mágicos. B3 debería probarlos juntos y proponer **una** solución coherente, no parches diferentes para cada raza.

**COR-B2-PROP-01 [PROPUESTA METODOLÓGICA]:** antes de tirar, registrar casillas/tramos recorridos, medio, costes de terreno, límite de Retirada, Fatiga y Acción ya usada; si no hay fórmula vigente, solicitar adjudicación explícita conservadora de mesa que **nunca crea una segunda reserva**, guardar resultado para B3 global. Esta plantilla **no es regla** de cálculo numérico.

## IV. Protección Natural, Penetración y daño especial

`main` especifica que natural y armadura **no se suman**; se utiliza el valor mayor en la capa pertinente. Después, para ataques cuya Protección interviene, **Protección efectiva = max(0,Protección − Penetración)**, y daño final se calcula conforme al orden de mitigación, Resistencias/Vulnerabilidades pertinentes y 0 Vida.

| Escenario | Prot previa | Pen | Protección efectiva | Nota |
|---|---:|---:|---:|---|
| Sólo Esqueleto Coralino | 1 | 0 | 1 | Contra ataque físicamente mitigable |
| Sólo Esqueleto Coralino | 1 | 1 | **0** | No queda «resistencia 1» |
| Esqueleto 1 + armadura 2 | **2**, no 3 | 0 | **2** | Usar mayor protección |
| Esqueleto 1 + armadura 3 | **3**, no 4 | 1 | **2** | Valor previo 3, después Pen 1 |
| Esqueleto 1 + `Piel Alterada` 2, categoría pertinente | **2**, no 3 | 0 | **2** | Hechizo paga Maná, Sostenimiento y texto |
| Esqueleto 1 ante tóxico/exposición a presión | **Depende del efecto** | — | **No asumir mitigación** | No inmunidad o Resistencia ambiental |

La Defensa normal, Defensa Corporal, Defensa Mental y umbral de Daño Grave son **otros conceptos**; Esqueleto no otorga +1 a esas defensas, Vida máxima, Ataque, Escala o Resistencia. Una barrera independiente puede actuar como capa sólo si su regla particular lo establece. `Barrera Cinética` no se convierte en Prot2 sino que modifica **Defensa** con Reacción específica.

**Caída al agua:** el núcleo dice expresamente que **el agua no elimina automáticamente el daño de una caída desde gran altura**. La Protección ordinaria no mitiga daño de caída salvo efecto pertinente de impactos; Esqueleto Coralino 1 no es paracaídas ni inmunidad general. Caídas, `AGI+Acrobacia`, Trauma y lesión se aplican normalmente.

## V. Hidratación, Anfibio 1 PR y medio respirable

**Respiración Anfibia Coralio:** respira aire y agua mientras esté **razonablemente hidratado**, sin proteger de presión, temperatura, corrientes, contaminación o desecación. El Rasgo General **Anfibio 1 PR** permite respirar aire/agua ordinarios, pero tampoco proporciona nado, inmunidad a agua mala, presión o deshidratación. Una capacidad equivalente a propiedad racial ya concedida **no se compra de nuevo para acumularla** (§3 y catálogo de Rasgos). **No** inventar que pagar 1 PR convierte respiración en doble función, regeneración o permiso para ignorar la condición específica de hidratación de la raza.

**El canon no fija un medidor de humectación ni un punto de quiebre en horas.** El capítulo Viaje no fija litros universales ni daño fijo diario por no beber. Una Coralio en puerto o en una casa con agua adecuada puede vivir y descansar en superficie: el texto racial no exige tanque permanente. En desierto/ambiente seco, interpretar hidratación y Fatiga con exposición, sustento y riesgos reales de la campaña; no daño adicional automático por cada turno al aire.

**CHC-01 [PROPUESTA OPCIONAL, NO CANON]:** pauta de `Cuidado de la Humedad`, sin cifra de horas ni bonificación gratuita, para evitar tanto inmunidad a desecación como doble castigo por mismo episodio. Requiere B3/B4 decidir cuándo una exposición afecta funcionalidad de respiración y cómo recuperarla sin curación exprés, si realmente hace falta un procedimiento. No adelantar su aprobación al manual ni a Foundry.

**Contexto acuático:** saber respirar agua no confiere protección contra presión de profundidad, corrientes, visibilidad reducida, contaminación, toxinas o temperaturas. Natación, Supervivencia, equipo y métodos siguen existiendo con costes. Una `Respiración Adaptada` mágica tiene su Maná/Sostenimiento normal y no da inmunidad ambiental universal.

## VI. Sentido de Corriente: señal acuática, no sonar ni hechizo

El +1 se aplica **cuando la corriente, vibración o cambio de presión del agua** es el **medio determinante** para detectar algo mediante PER. No significa que toda percepción mientras está nadando reciba +1: ver un cartel sumergido por vista, leer runas, analizar magia o detectar una trampa meramente visual no dependen de esa señal acuática.

Una perturbación físicamente transmitida por agua puede ser perceptible aunque la vista del objeto esté obstruida, siempre que el medio efectivamente comunique la señal; no concede ubicación precisa, tamaño, autor, intención o propósito sin un método de investigación diferente. Una pared hidráulicamente aislada puede impedir la señal y el Rasgo **no crea un sonar que la atraviese**. No se le asigna radio numérico propio, percepción pasiva ilimitada, bonificador de Iniciativa ni Reacción.

`Sentido Agudo` 1 PR añade +1 PER sólo al distinguir detalles sutiles por sentido físico escogido; fuentes equivalentes sobre la misma señal/prueba **no se acumulan** por defecto. Esto no impide elegir otro sentido distinto compatible y recibir su ventaja en las pruebas verdaderamente pertinentes.

## VII. 20 escenarios de análisis B2 (no son resultados de playtest)

| ID | Escenario | Resultado esperado / pendiente |
|---|---|---|
| COR-B2-S01 | Coralio de Nacariel crea ficha | Mediana, tierra5/agua6, 25 PD/3 PR, sin Vínculo gratuito |
| COR-B2-S02 | Coralio sin armadura recibe ataque Pen0 | Prot natural 1 relevante |
| COR-B2-S03 | Coralio con armadura Prot3, ataque Pen1 | Prot efectiva **2**, no valor 3 ni 4 |
| COR-B2-S04 | Coralio con Prot1 natural y Pen1 | Prot efectiva **0** |
| COR-B2-S05 | Coralio en muelle todo turno | MOV5, no agua6 |
| COR-B2-S06 | Coralio nadando todo turno | MOV6 si entorno permite |
| COR-B2-S07 | Coralio gasta tierra3 y quiere nadar6 | No 9 por segunda reserva; conversión precisa B3 |
| COR-B2-S08 | Coralio Exhausto cambia medio | MOV−2 y cambio deben resolverse una vez, no reserva doble |
| COR-B2-S09 | Coralio hidratado en puerto | Respira aire, sin inmersión permanente |
| COR-B2-S10 | Coralio hidratado sumergido en agua respirable | Respira agua, sin inmunidad a corriente |
| COR-B2-S11 | Coralio en agua sin oxígeno adecuado | No genera aire de medio no compatible |
| COR-B2-S12 | Coralio seco en desierto por días | Riesgo de privación, pero sin reloj/dano fijo universal; CHC opcional |
| COR-B2-S13 | Coralio compra Anfibio 1 PR para segunda «respiración» | No duplicar propiedad, coste discutible en B4 |
| COR-B2-S14 | Coralio recibe Piel Alterada categoría pertinente | Prot 2 máx en capa equivalente, no Prot 3 natural+mágica |
| COR-B2-S15 | Coralio cae 8 espacios en agua | No inmunidad de caída; daño base por reglas, amortiguación sólo pertinente |
| COR-B2-S16 | Coralio percibe vibración transmitida por agua | +1 PER si medio determinante, no identificar causa |
| COR-B2-S17 | Coralio ve luz submarina sin presión/flujo determinante | Sin +1 por estar «en el agua» |
| COR-B2-S18 | Coralio intenta percibir energía oceánica mágica | Sin Resonancia Oceánica racial; Arcana o Rasgos propios |
| COR-B2-S19 | Coralio produce placa y quiere vender material + Familiar | No materiales o Familiar por producción corporal |
| COR-B2-S20 | Coralio Incapacitado a 0 Vida bajo agua peligrosa | Trauma/Medicina/rescate/hazards ordinarios, Respiración no evita efectos |

**Expediente total:** **48 casos iniciales COR-T01–COR-T48** más **16 regresiones COR-T49–COR-T64**, **64 criterios documentales no ejecutados**.

## VIII. Registro de incidencias (11)

| ID | Severidad | Problema | Dictamen y siguiente fase |
|---|---|---|---|
| COR-INC-B2-01 | **Alta** | Dos velocidades interpretadas como doble reserva | **CONTROLADO**; cambio de medio/Retirada/Correr/Exhausto pendiente B3 |
| COR-INC-B2-02 | **Alta** | Hidratación razonable sin DF/horas universales, riesgo de daño instantáneo o inmunidad | **ABIERTA B3/B4**: CHC-01 opcional y tabla de eventos |
| COR-INC-B2-03 | **Alta de balance** | Anfibio 1 PR se superpone a Respiración Racial; compra podría intentar eludir hidratación | **CONTROLADO** contra duplicación; **B4** revisar diferencia textual y coste relativo |
| COR-INC-B2-04 | **Alta** | Esqueleto1 sumado a armadura y luego Pen mal aplicada | **CONTROLADO NUMÉRICAMENTE**, fórmulas y ejemplos COR-T53–54 |
| COR-INC-B2-05 | **Media** | Esqueleto declarado Resistencia universal o defensa vs. presión/caída | **CONTROLADO**: no inmunidad/Resistencia, B3 casos ambientales |
| COR-INC-B2-06 | **Media** | Piel Alterada y barreras tratados como Prot acumulable arbitraria | **CONTROLADO**, mayor valor de capa equivalente y texto específico de barrera |
| COR-INC-B2-07 | **Media** | Sentido de Corriente se vuelve sonar mágico/global y detector de autores de magia | **CONTROLADO**, señal física acuática determinante, sin identidad |
| COR-INC-B2-08 | **Media** | Sentido Agudo se suma automáticamente con +1 Corriente idéntico | **CONTROLADO**, no +2 en misma propiedad equivalente |
| COR-INC-B2-09 | **Media** | Respiración usada para neutralizar agua contaminada/oxígeno ausente/corriente | **CONTROLADO**, medio respirable con límites |
| COR-INC-B2-10 | **Media** | Fabricación de materiales coralinos/Familiar/Resonancia Oceánica gratis | **CONTROLADO**, usar CRAFT/Rasgos y magia futura costeada |
| COR-INC-B2-11 | **Media de balance** | Paquete ofrece agua/aire + nado6 + Prot1 + sentido1 frente a otras razas | **ABIERTA B4**, medir uso por campaña, sin nerf antes de comparación |

**Correcciones persistidas:** sección B2 en `auditoria_y_desarrollo.md`, 16 regresiones `COR-T49–COR-T64` en `pruebas_balance.md`. No se editó `doble_pagina.md`; CHC-01 continúa pauta de propuesta y `Resonancia Oceánica` continúa fuera de paquete.

## IX. Dictamen y transición

**B2 Coralios completada documentalmente:** 18 fichas, 20 escenarios de análisis y 11 incidencias; **64 criterios documentales, cero ejecutados**. Se conserva v0.3 sin nuevas Habilidades, Protecciones, resistencias, Maná ni rasgos raciales.

**Con esto, B2 llega a 12/12 familias** (sujeto a verificación final de archivos y tablero): la próxima fase debe ser **B3 — exploits de secuencia por familia**, comenzando por Humanos de acuerdo con el plan, utilizando primero las incidencias B2 como hipótesis reproducibles y clasificando rigurosamente **pruebas documentales** vs. **ejecuciones reales**. Después B4 (comparación por raza), B5 (regresión global), C (12 textos finales propuestos del Manual Básico) y D (cierre). No adelantar ninguna propuesta a `main`, Foundry o mapa.

**Ámbito exclusivo de escritura:** rama `propuestas/razas-autonomas-2026` en `propuestas/razas/`.
