# B2 — Verdantes: auditoría de Sustento Vegetal, Enraizar y Adaptación de Bioma

**ESTADO:** B2 **COMPLETADA A NIVEL DOCUMENTAL CON CUESTIONES ABIERTAS**; propuesta **NO CANÓNICA / NO APROBADA**. Fecha: 17-11-2026. **No se ejecutaron partidas de mesa, scripts de regresión Foundry ni pruebas empíricas**. Las tablas representan resultados previstos por las reglas existentes y supuestos nuevos claramente marcados.

**Fuente primaria reabierta y verificada literalmente:** `main:docs/Tierra_Magica_Manual_Maestro.md`, blob SHA `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`. Paquete Verdante v0.3 (§3, líneas 395–406); Dríade/Feéricos (362–371), reglas raciales transversales (231–247), Creación/Origen/PD/PR (§3); Escala, Empujar/Derribar y Defensa de Maniobra (2681–2737); Acción/Movimiento/Retirada/Correr/Fatiga (2801–2813, 2852–2869, 3750–3760), Descanso/Medicina/0 Vida/Sangrado (§10); **Viajes, forraje, agua y campamento** (2425–2473, 2552–2600); `Resistencia Ambiental` 1/2 PR (2291–2300), no-acumulación de Rasgos (2180–2186); `Martillo Cinético`, `Piel Alterada` y `Potencia Sobrenatural` (§10, 4309, 4319–4324); dispositivos/equipo/CRAFT y Alquimia. **Expediente cotejado:** `10_verdantes/auditoria_y_desarrollo.md`, `doble_pagina.md`, `pruebas_balance.md`, `cierre_editorial.md`, `auditorias/01_canon_y_lore.md`. Comparaciones cualitativas de interfaz con Dríades, Terios, Micelios y Coralios; **no** son la medición de balance B4.

## I. Paquete íntegro y economía de creación

- **Ascendencia:** Verdante, **Escala Mediana, Movimiento 6**. Organismo vegetal consciente y móvil, **no** Dríade Feérica, Trent o Micelio.
- **Sustento Vegetal [CANON]:** precisa **agua, luz suficiente y nutrientes compatibles**, funcionalmente en la misma categoría de supervivencia que alimento/hidratación. Parte puede obtenerse del entorno o de provisiones apropiadas. **Sigue necesitando Descanso Completo y puede Fatigarse**. No genera Vida/Maná, inmunidad, energía de dispositivo, raciones para terceros ni reglas de fotosíntesis automática.
- **Enraizar [CANON]:** **Acción** sobre **suelo apropiado**, **mientras permanece inmóvil** gana **+1 categoría de Escala efectiva exclusivamente para resistir Empujar, Derribar y desplazamiento físico impuesto**; liberarse cuesta **1 Movimiento**. **No recupera Vida ni Maná**; no aumenta espacio ocupado, Carga, Defensa, Daño o alcance.
- **Adaptación de Bioma [CANON]:** elegir **un bioma al crear el personaje**, registrar **una** de dos clases de ventaja estrecha: **+1 VIG** para resistir exposición ambiental definitoria **o** eliminar **una causa concreta de terreno difícil**. No elegir ambas ni todas las amenazas de un bioma. Jungla/vegetación, Pantano/barro o agua somera, Tundra/frío, Desierto/calor o deshidratación son ejemplos del Manual. `Llanura/hierba alta` sólo es **ejemplo propuesto** en expediente.
- **Biología y costes:** 25 PD/3 PR aparte del paquete, Origen e idiomas normales, sin Naturaleza/Medicina, armadura de corteza, espinas ofensivas, riego curativo, Fotosíntesis Mágica o Vínculo con Eïra gratuitos.

**Diferenciación de dos Enraizar:** la Dríade posee anclaje similar, **pero el Manual Feérico no contiene literalmente «mientras permanece inmóvil»**; el texto Verdante **sí lo dice**. No importar ni borrar esa distinción al homologar mecánicas en B4.

## II. Fichas B2 de capacidades y subsistemas

| ID | Disparador / ventana | Efecto, coste o duración | Exclusiones e interfaz | Pruebas |
|---|---|---|---|---|
| VER-B2-R01 — Sustento físico | Jornada con agua, luz y nutrientes compatibles | Sustituye tipo de alimentación/hidratación y puede provenir parcialmente del entorno/provisiones | No crea alimento/energía/Maná; no dispensa Descanso Completo ni Fatiga | VER-T11–20, T41–46 |
| VER-B2-R02 — Forraje | Buscar nutrientes/agua en medio apropiado | Viaje: 2 horas y `PER+Supervivencia` cuando proceda; ración normal 1/persona/día | No otorgar forraje exitoso automático por biología ni litros mágicos | VER-T42–43 |
| VER-B2-R03 — Falta de luz | Ausencia de iluminación suficiente durante estancia o jornada | Canon no fija horas ni daño por hora/día sin luz | **CLN-01: 4h/24h es PROPUESTA NUEVA**, no imponer ni duplicar penalizaciones | VER-T39–40, T44–45 |
| VER-B2-R04 — Descanso/Fatiga | Respiro/Descanso/Completo, marchas, condiciones | Descanso Completo y Fatiga normales; no necesita Enraizar para Descansar | Sol/riego no cura Trauma ni Sangrado; no ignorar Fatiga por ser planta | VER-T19–23 |
| VER-B2-R05 — Enraizar: activación | Gastar **Acción** en suelo físicamente apropiado | Queda anclado/inmóvil para la bonificación mientras cumple condiciones | No despliega raíces a distancia ni inicia sobre piso incapaz de sostenerlas | VER-T28–29 |
| VER-B2-R06 — Enraizar: Empujar | Es objetivo de Empujar físico | Escala **Grande efectiva** desde Mediana **sólo en la resistencia**; aplica tabla de diferencias de Escala | No +Defensa de Maniobra, inmunidad a todo desplazamiento o mejora de ataque | VER-T30, T52 |
| VER-B2-R07 — Enraizar: Derribar | Es objetivo de Derribar | Escala efectiva Grande para resistir, **sin número universal extra en fórmula de Defensa de Maniobra** | Viabilidad por tamaño/método a B3, no reescribir éxito en fallo sin regla | VER-T31/T53 |
| VER-B2-R08 — Enraizar: impulso mágico | Desplazamiento físico impuesto y efectos como `Martillo Cinético` | Aplicar escala en componente de desplazamiento si usa categorías; el Hechizo también trata objetivos **«anclados»** como 0 espacios | El paquete no concede +Defensa Corporal ni ignora Daño 3; **B3** precisar qué anclajes cumplen condición | VER-T32/T54 |
| VER-B2-R09 — Enraizar: liberación | Personaje pretende abandonar el estado inmóvil | Liberarse cuesta **1 Movimiento**, sin Acción nueva según texto | No conservar escala tras desanclarse, no «1 Movimiento para teleportar» | VER-T34/T55 |
| VER-B2-R10 — Bioma: selección | En creación, anota bioma + propiedad | Una elección **VIG o terreno** con peligro/causa definida | No recalibrar entre escenas, acumular varias exposiciones o asociarlo a toda región | VER-T01–10 |
| VER-B2-R11 — Bioma: +1 VIG | Una **prueba de VIG** frente a exposición ambiental definitoria registrada | +1 en prueba válida; no +VIG permanente | No Defensa Corporal +1 ni contra ataque de fuego/hielo no ambiental por tema | VER-T47–49 |
| VER-B2-R12 — Bioma: terreno | Tramo físicamente transitable cuya única causa de sobrecoste es la escogida | Elimina **esa causa concreta** del coste de Movimiento | No inmunidad a barro+escombros, terreno imposible, agua profunda, Obstrucción de ruta regional automática | VER-T50–51 |
| VER-B2-R13 — Compra Resistencia Ambiental | PR1 Menor +1 VIG; PR2 Significativo Ventaja | Grados distintos; compra legal con PR y elección fija | Rasgo +1 idéntico al +1 del bioma en misma amenaza no se suma; Ventaja **no equivale a +2** | VER-T47–48 |
| VER-B2-R14 — Protección y armas | Corteza, espinas y magia de armadura/escudo | Según equipo, Rasgos o Hechizos comprados; `Piel Alterada` 4 Maná/protección 2 por categoría | Corteza no arma/Protección libre; Protección equivalente armadura+Hechizo no se suma | VER-T25–27/T56 |
| VER-B2-R15 — 0 Vida, Trauma, Medicina, Alquimia | Herida, savia/sangrado y efectos de tratamiento | Medicina aplicable con método, reglas comunes de Vida/Trauma/Descanso | No autorreparación con Jardinería, pócima gratis o inmunidad a infección | VER-T22–25 |
| VER-B2-R16 — Viaje, ritmo y Movimiento | Viaje/Retirada/Correr bajo terreno/sol/bioma | Viaje tiene Distancia/DF/riesgo propio; Movimiento local cuesta normalmente 1/espacio, difícil 2 | Descuento a barro local no elimina todas las categorías de ruta, ni supera Fatiga/Condición | VER-T41–43/T51 |
| VER-B2-R17 — Propuestas editoriales de linajes | Llanura y cinco perfiles; CLN-01 opcional | Material nuevo sólo para revisión; no sexta/quinta capacidad de ascendencia | No transformar altura, edad, nutrición exacta en bonos ni condición de nueva especie | VER-T39–40/T44–45 |

**Activación y apilamiento:** Sustento y Adaptación de Bioma no tienen Acción ni 1/Escena escrito, no se recargan como si fueran Mano/Hechizos; Enraizar **sí** consume Acción al iniciarse y Movimiento al liberarse. La propiedad de bioma no crea prueba adicional propia; opera en la prueba de exposición o en el coste del tramo. Varias mejoras **equivalentes de Escala efectiva** no se acumulan salvo permiso expreso (§3).

## III. Supervivencia: cuantificación escrita versus CLN-01 propuesto

El Manual de viaje define como referencia **1 ración/persona/jornada** y forraje **2 horas, PER+Supervivencia** con DFs 10 abundante, 13 ordinaria, 16 escasa, 19 hostil/muy pobre, y producción según grado. **Agua no tiene litros universales**, y carecer de ella puede causar Fatiga, impedir marcha o imposibilitar continuación: **no hay daño fijo diario por deshidratación**.

El paquete Verdante afirma que **luz suficiente** forma parte de sustento, pero **no define** ni horas, ni intensidad, ni contador individual, ni falta de luz = una penalización exacta. Es válido establecer que una expedición bajo tierra debe prever iluminación/nutrientes/suministros; **no** es válido afirmar que la regla «4 horas cada 24» ya esté implícita universalmente. No imponer tres contadores consumibles independientes y **doble Fatiga** por una misma escena de falta de sustento.

### CLN-01 [PROPUESTA MECÁNICA NUEVA, NO CANON]

`auditoria_y_desarrollo.md` propone **≥4 horas acumuladas de luz ambiental apta por 24 horas**, además de agua/nutrientes equivalentes a provisiones. Aunque se llame «procedimiento de supervivencia», fija **una cifra restrictiva nueva** que cambia el valor racial en campañas de cueva, nave, mina o noche prolongada. El protocolo alternativo de B2 para **evaluarlo**, no introducirlo, es:

1. Ejecutar conceptualmente una misma expedición **según canon sin reloj horario**: documentar fuentes razonables de luz, agua, nutrientes y efectos generales de falta de sustento.
2. Repetir con `CLN-01` **adoptado explícitamente sólo en prueba de mesa futura**, contando cuatro horas y recursos reales de la lámpara si se necesita.
3. Comparar Fatiga, coste económico/carga, tiempo de viaje, Dependencia de equipos, acceso a Descanso Completo y estados de 0 Vida.
4. Evitar daño nuevo, +Ventaja u otra consecuencia inventada; si una misma falta de sustento agrupa agua+nutrientes+luz, no castigar tres veces salvo que una fuente general distinta realmente lo exija.
5. Someter resultado a B4 frente a Enanos, Micelios, Coralios y otros pueblos antes de ratificar umbral o suprimirlo.

**Propuesta de decisión provisional B2:** **NO incorporar CLN-01** al paquete, doble página ni al manual hasta completar B3/B4. Describir las necesidades canónicas cualitativamente y preparar ejemplos de provisiones/luz **sin cifras nuevas**.

## IV. Enraizar: Defensa, Maniobras, impulso y magia

Un Verdante Mediano en suelo apropiado se ancla gastando **1 Acción** y permanece inmóvil; su Escala efectiva pasa a **Grande exclusivamente para los tres tipos de resistencia enumerados**. No cambia Defensa de Maniobra ni Defensa Corporal. **Liberarse cuesta 1 Movimiento** y deja de reunir condiciones del beneficio.

- **Empujar:** se ataca `FUE+Atletismo` contra Defensa de Maniobra. Si el atacante es **Pequeño** y la Verdante enraizada **Grande efectiva**, la diferencia son **dos categorías**: Empujar con fuerza corporal ordinaria **no desplaza** sin palanca/capacidad. No implica que falle automáticamente la **tirada de ataque** o que cause menos daño asociado. Si atacante Mediano, objetivo Grande efectiva: distancia menor por 1, mínimo 1 si la maniobra tuvo éxito.
- **Derribar:** usa Defensa de Maniobra y su texto no incluye traducción numérica universal de diferencia de Escala. Enraizar sí figura para resistir esta maniobra; B3 debe determinar métodos que se vuelven físicamente inviables o ataques especiales a los que aplique, sin inventar +1 Defensa.
- **Desplazamiento físico mágico:** `Martillo Cinético` (`INT+Canalización` contra **Defensa Corporal**, **Daño 3**, y desplazamiento según Escala/condición) declara **0 espacios cuando objetivo está «anclado»**. Un Verdante que cumple Enraizar es candidato físico a esa cláusula, pero como el hechizo no define qué condiciones formales cuentan «anclado», debe contrastarse en B3 antes de anunciar inmunidad automática: **incluso a 0 espacios sigue aplicando Daño 3 cuando el impacto sea válido** y no hay +Defensa.
- **Retirada y Correr:** estar inmóvil por Enraizar y pasar a retirada requiere **primero liberarse** (coste 1 Movimiento) y luego respetar Movimiento restante, límites de Retirada y Correr. `Exhausto` reduce Movimiento en 2; no convertir el punto de liberación en Acción/Movimiento extra. Si una Reacción/destrucción de suelo corta el anclaje en turno ajeno, B3 debe fijar resolución sin refundir Acción gastada o otorgar Reacción nueva.
- **Protecciones, materiales y Medicina:** Enraizar no produce Protección Natural, armadura ni barrera. `Piel Alterada` es Sostenido con 4 Maná, Protección 2 para categoría; no se acumula con armadura equivalente. `Cuerpo Mineral` tiene Movimiento−2 y requiere magia normal; ninguna de estas cambia el origen vegetal del personaje o convierte el anclaje en curación.

## V. Adaptación de Bioma: selección, límites y coste de Rasgos

**Requisito de ficha:** `Bioma: [uno]`; `beneficio elegido: VIG +1 contra [exposición]` **o** `terreno: sin coste extra por [causa concreta]`. Una etiqueta «Pantano» no permite mezclar +1 VIG frente a humedad + barro + agua somera; la opción se elige al crear y no cambia entre escenas sin regla.

| Caso | Efecto racial válido | Falsa extensión |
|---|---|---|
| Jungla, vegetación ordinaria | Elimina esa causa concreta de terreno difícil si transitable | No supera tronco macizo, jungla en general o cobertura de combate |
| Pantano, barro somero | Evita sobrecoste por barro elegido | No elimina escombros, agua profunda, corriente o venenos |
| Tundra, frío ambiental | **+1 VIG en prueba de exposición** | No +1 Defensa Corporal contra hechizo de hielo ni Resistencia a Frío |
| Desierto, calor ambiental | **+1 VIG en prueba de calor ambiental** | No +1 contra deshidratación por elegir calor; no resiste fuego mágico automáticamente |
| Desierto, deshidratación ambiental | **+1 VIG en exposición elegida** | No evita necesidad de agua ni calor por elección separada |
| Llanura, hierba alta | **[PROPUESTA]** causa concreta local | No es ejemplo textual del Manual ni perfil con poder adicional |

**Rasgo general Resistencia Ambiental:** Menor 1 PR = +1 VIG frente a **una exposición concreta**; Significativo 2 PR = Ventaja en esa prueba **en lugar** de +1. Cuando Menor y la Adaptación Verdante describen **exactamente la misma propiedad** sobre el mismo peligro, no apilar +1+1 para +2 por diversidad de procedencia (§5). El Significativo aporta **Ventaja**, una operación distinta de +1; no declarar ni que se suma +2 ni que se prohíbe toda interacción sin valorar texto de ambos. B3 pondrá escenarios donde la misma exposición es definitoria en una mitad de prueba y otra amenaza afecta el resto.

**A escala de viaje:** una capacidad que ignora una **causa concreta de terreno difícil en Movimiento local** no borra automáticamente todos los efectos de clima, distancias por categoría de ruta, DFs de Viaje y logística grupal. Tampoco concede una velocidad de nado/trepa o inmunidad ambiental que no figuren en el paquete. Comparar con Paso de Cabra del Sátiro y Adaptación Terio en B4.

## VI. Veinte escenarios adicionales de análisis (NO ejecución)

| ID | Situación | Dictamen por texto / pendiente |
|---|---|---|
| VER-B2-S01 | Verdante de Origen Broncino vs. otro Ereliano | Misma Ascendencia; idiomas y Faceta según Origen |
| VER-B2-S02 | Verdante usa raciones de nutrientes y agua | Sustento satisfecho si entorno/Provisiones compatibles; no 3 raciones nuevas |
| VER-B2-S03 | Verdante forrajea en bosque abundante durante viaje | 2 h y PER+Supervivencia DF10 si incertidumbre; no habilidad gratuita |
| VER-B2-S04 | Grupo de cinco exige que un Verdante alimente a todos con luz | No otorga recursos transferibles |
| VER-B2-S05 | Verdante en túnel sin luz solar durante jornada | Necesita luz suficiente, pero no «4 h» canónicas; B3 condiciones |
| VER-B2-S06 | Se adopta CLN-01 en una sesión de comparación | 4 h/24 h es **propuesta**, nunca parte de regla vigente |
| VER-B2-S07 | Verdante sin agua en desierto | Sin litros/daño diario universal; Fatiga, viaje o imposibilidad por caso |
| VER-B2-S08 | Verdante descansa ocho horas en ambiente apto | Descanso Completo si cumple condiciones de descanso real, enraizamiento no requerido |
| VER-B2-S09 | Se regenera tocando suelo o recibiendo luz | No recupera Vida/Maná por Sustento o Enraizar |
| VER-B2-S10 | Verdante enraizado vs. Empujar Pequeño | Grande efectiva, diferencia 2; no mover por fuerza ordinaria sin palanca/capacidad |
| VER-B2-S11 | Verdante enraizado vs. Derribar | Escala efectiva contextual, no +1 Defensa numérico |
| VER-B2-S12 | Verdante enraizado atacado por Martillo Cinético | Daño/Defensa Corporal normal; desplazamiento 0 si anclaje cuenta como «anclado» (B3) |
| VER-B2-S13 | Se libera tras Enraizar y se retira | Coste 1 Movimiento + presupuesto y límite Retirada según escena |
| VER-B2-S14 | Enraizar sobre plataforma metal sin suelo | No automáticamente válido; se necesita suelo apropiado según texto |
| VER-B2-S15 | Pantano: barro somero + escombros | Elimina barro si seleccionado, no escombros |
| VER-B2-S16 | Tundra: +1 VIG frío + Rasgo menor idéntico | No acumula +2 equivalente |
| VER-B2-S17 | Tundra: Rasgo ambiental Significativo comprado | Ventaja en VIG para peligro correspondiente; analizar interacción sin conversión numérica falsa |
| VER-B2-S18 | Desierto: calor escogido; Proyectil Ígneo | No bono contra ataque de fuego sólo por temática |
| VER-B2-S19 | Corteza y armadura/Piel Alterada | No Protección gratuita; usar reglas de armadura/hechizo y no apilamiento |
| VER-B2-S20 | Sangrado de savia, a 0 Vida/Trauma | Mismos estados y Medicina adecuada, no reparación por jardinería gratuita |

**Batería de expediente:** `VER-T01–VER-T40` inicial y **VER-T41–VER-T56** añadida: **56 casos documentales no ejecutados**. Estos veinte son análisis adicionales del informe, no ensayos observados.

## VII. Incidencias y recomendaciones (11)

| ID | Prioridad | Hallazgo | Estado / seguimiento |
|---|---|---|---|
| VER-INC-B2-01 | **Alta** | CLN-01 cuantifica **4h/24h** no presentes en canon y puede castigar campañas subterráneas | **Aislada y sin ratificar**; B3 explorar efectos, B4 comparar valor racial |
| VER-INC-B2-02 | **Media/alta** | Agua/luz/nutrientes tratados como tres medidores con penalizaciones triples | **CONTROLADO**: equivalencia de sustento, sin daño diario universal; B3 varias carencias |
| VER-INC-B2-03 | **Media** | Forrajeo y necesidades vegetales pueden interpretarse como alimentación gratis para grupo | **CONTROLADO**: una ración/persona/día como referencia y 2 h forrajeo, sin fuente ilimitada |
| VER-INC-B2-04 | **Alta** | Enraizar se convierte en +Defensa o inmunidad general a Derribar | **CONTROLADO**: sólo Escala efectiva contextual, Derribar no da +1 numérico |
| VER-INC-B2-05 | **Media/alta** | `Martillo Cinético` dice 0 a objetivo anclado, Enraizar no define etiqueta formal «anclado» | **ABIERTA B3**, no se reduce Daño/Defensa Corporal |
| VER-INC-B2-06 | **Media** | Soltarse y Retirada/Correr con Fatiga podrían duplicar Movimiento | **ABIERTA B3**, coste de 1 Movimiento y presupuesto universal |
| VER-INC-B2-07 | **Media** | Adaptación de Bioma cambiada entre escenas o doble elección VIG+terreno | **CONTROLADO** por elección al crear, una ventaja estrecha |
| VER-INC-B2-08 | **Media** | Resistencia Ambiental Menor se apila con +1 VIG equivalente racial | **CONTROLADO**, no-acumulación si propiedad idéntica; B3 grados y Ventaja |
| VER-INC-B2-09 | **Media** | Protección de corteza/apéndices + armadura + magia sin coste | **CONTROLADO** por no-acumulación/protecciones, evitar armadura racial gratuita |
| VER-INC-B2-10 | **Media** | Efecto de eliminar terreno difícil extrapolado a toda distancia/DF de Viaje | **ABIERTA B3**, no ampliar automáticamente a categoría de ruta |
| VER-INC-B2-11 | **Media de balance** | Llanura/hierba alta nueva, nutrición dependiente y biomas desiguales | **ABIERTA B4**: comparar utilidad entre biomas, Dríades, Terios, resto de familias |

**Cambios reales del expediente:** `auditoria_y_desarrollo.md` amplió notas de B2 con límites de sustento, Martillo Cinético y no acumulación; `pruebas_balance.md` añadió 16 regresiones; cierre editorial se sincronizará. No se cambió `doble_pagina.md` ni el paquete canónico; CLN-01 permanece **separado y no aprobado**.

## VIII. Dictamen y siguiente unidad

**B2 Verdantes completada documentalmente**: **17 fichas de capacidades/subsistemas, 20 escenarios de análisis, 11 incidencias y 56 criterios documentales no ejecutados**. La ejecución real de secuencias y comparación de calidad de vida de distintas ascendencias corresponde a B3/B4. No se introduce una nueva Habilidad, armadura, magia o sistema racial de sustento cuantificado a v0.3.

**Siguiente B2 pendiente:** **Micelios** (`11_micelios/`): Sustento Fúngico y respiración, Quimiosensibilidad PER específica, Enlace Micelial con **Acción**, contacto/red continua, comunicación voluntaria y límites de transmisión; cruces con barreras, familiares, Magia Sostenida, Ingeniería y creación de personajes. Después Coralios. B3/B4/B5 y los 12 capítulos finales propuestos del Manual Básico permanecen posteriores a B2.

**Guardarraíl:** escribir sólo en `propuestas/razas/` de rama `propuestas/razas-autonomas-2026`; `main`, Manual Maestro, Foundry y mapa siguen intocables.
