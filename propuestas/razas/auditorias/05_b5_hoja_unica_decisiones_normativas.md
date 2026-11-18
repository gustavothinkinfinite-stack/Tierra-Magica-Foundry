# B5 — Hoja normativa única v1: siete bloqueos y puerta editorial

**Fecha:** 18-11-2026. **Estado:** **SIETE CANDIDATAS PROPUESTAS, CERO APROBADAS COMO CANON.** Auditoría documental, no ejecución Foundry ni partida. Documento de conciliación **prevalente sólo dentro de esta rama de propuestas**, **no** reemplaza `main` ni borra evidencias de decisiones previas.

**Fuente primaria reabierta en esta unidad:** `main:docs/Tierra_Magica_Manual_Maestro.md` (blob **`aa7105f6ef4d744040cce4763d9e01ee28b87572`**), en particular §2 Flujo de resolución; §3 Enanos, Goblinoides, Terios, Dríade, Verdantes, Cristálidos, Micelios, Coralios; §5 Anfibio; §7 Derribar/Empujar; §10 0 Vida/Caídas. Referencias de propuesta contrastadas: `05_b5_decisiones_operativas_siete_bloqueos.md` (D01/D02/D04/D05/D06/D08/D10), `05_b5_acta_puerta_v3_y_12_escenarios_globales.md`, `05_b5_dictamen_editorial_derribar_anfibio_hobgoblin.md`, `05_b5_procedimiento_movimiento_anclaje_vida.md`, y el tablero. **Las alternativas incompatibles quedan HISTÓRICAS, no co-vigentes dentro de esta propuesta.**

## Regla de interpretación

- **[CANON]**: sólo una regla ya presente en `main`.
- **[PROPUESTA ÚNICA B5]**: redacción concreta de trabajo, con un resultado reproducible, pendiente de aprobación del autor.
- **[NO SE DEFINE]**: asunto que requiere diseño específico (p. ej., energía de un dispositivo) y que no se rellena con cifras inventadas.
- **[EVIDENCIA DOC]**: caso leído con salida prevista. **No significa test ejecutado.**
- Si una tabla anterior difiere de esta hoja, citar la contradicción y **usar la presente hoja exclusivamente al evaluar el BORRADOR PROPUESTO**, nunca para afirmar que ya cambió el canon.

## I01 — Movimiento entre medios, Retirada e interrupciones

**[CANON]** Cada ascendencia usa sus velocidades de medio; no obtiene dos reservas de Movimiento por tener dos velocidades. Correr requiere Acción. Hada inicia y termina apoyada; Terio con Vuelo Dominante no vuela bajo Carga Pesada/Excesiva. Las Reacciones concretas siguen su propio disparador.

**[PROPUESTA ÚNICA B5-MOV1]** En un **mismo tramo de Movimiento normal**, sumar `coste_espacios / MOV_efectivo_del_medio` y exigir total **≤ 1**, conservando fracciones exactas. Terreno difícil multiplica el coste del espacio antes de dividir; ninguna velocidad se reinicia al cambiar medio. En Retirada exigir suma **≤ 1/2** y, si es de un solo medio, respetar también `floor(MOV_efectivo/2)` espacios equivalentes. Por consistencia, cada tramo homogéneo de una Retirada mixta se limita igualmente a `floor(MOV_efectivo_del_medio/2)`, aunque la suma global sea menor. Correr tiene coste de Acción y su tramo propio, no recrea una segunda reserva de medios.

**[PROPUESTA MOV2 — interrupción]** Registrar por cada espacio consumido el **coste acumulado y la casilla válida alcanzada**. Una Reacción con texto propio se resuelve en su ventana; no reembolsa desplazamiento ya consumido sin regla expresa. Si el siguiente paso se vuelve imposible, cesa el tramo sin crear teletransporte, daño de colisión o Acción gratis. En tránsito Goblin por ocupante, comprobar preventivamente hueco y **salida legal**; si una Reacción interrumpe dentro de ocupación, resolver primero su efecto y colocar/retener al Goblin en la **última casilla legal desocupada alcanzada** si no puede concluir el tránsito; **sin devolver costes**. Esta regla de corrección de posición es una **propuesta** y no existe literalmente en `main`. No se habilita Ataque de Oportunidad universal.

**Costo y límite:** Movimiento real, Acción de Correr/maniobras, estados de Fatiga y Carga. Las diagonales/verticales siguen la métrica de tablero definida en el núcleo o la convención de mesa, **no** se inventa diagonal gratuita. Una caída sólo se calcula si hay altura efectiva determinada.

**Pruebas DOC propuestas:** `U01` Coralio tierra2/agua3: 2/5+3/6=0,9 legal; `U02` tierra3/agua3=1,1 ilegal; `U03` Retirada tierra2/agua1 = 17/30 > 1/2, ilegal; `U04` Goblin con 2 MOV no puede entrar y terminar dentro de Mediano; si interrumpido, último punto legal no se convierte en escape gratuito.

## I02 — Enraizar, Derribar y soporte físico

**[CANON]** Enano Pequeño cuenta como Mediano al resistir Empujar/Derribar/desplazamiento impuesto, sin +Defensa general. Dríade/Verdante usan Acción para Enraizar, +1 categoría efectiva sólo al resistir esas maniobras; liberarse cuesta 1 MOV. Verdante tiene inmovilidad expresa; el texto de Dríade no repite literalmente esa palabra. Empujar sí calcula desplazamiento por diferencias de Escala; Derribar usa Acción y Defensa de Maniobra sin traducción de Escala.

**[PROPUESTA ÚNICA B5-DER-R2]** Si una **facultad expresa** aumenta la Escala efectiva **al resistir Derribar**, añadir **+1 circunstancial a Defensa de Maniobra sólo para esa prueba**. Aplica a Enano, Dríade Enraizada y Verdante Enraizado cuando sus condiciones vigentes lo permiten. Es **una corrección numérica nueva**, no derivable automáticamente de `main`. No se suma por dos fuentes equivalentes, no afecta Empujar, Agarrar, Desarmar, Defensa general o ataque. Para Empujar se usa exclusivamente la Escala efectiva en la distancia, sin ese +1.

**[PROPUESTA ÚNICA B5-ANC1]** Tanto Dríade como Verdante **no se desplazan voluntariamente mientras están Enraizados**; liberar requiere 1 MOV si la criatura está capacitada. Ante pérdida física de suelo **anterior** a la resistencia, el anclaje acaba antes de efectuarla. Si daño/rotura de suelo ocurren **como consecuencia del mismo efecto**, consultar soporte inicial para la maniobra, resolver efecto y luego retirar anclaje cuando el suelo deje de sostenerlo; una caída posterior aplica sólo altura real. Sin Acción/Reacción nueva.

**Costo y límite:** Acción inicial, suelo apto, 1 MOV al soltar voluntariamente. +1 a Defensa exclusivamente por R2 y no en canon. Mantener cuerpo Incapacitado como anclado sólo con soporte íntegro, sin emitir maniobras voluntarias.

**Pruebas DOC:** `U05` Enano DM13 contra Derribar → **14 propuesto** (en canon sigue 13); `U06` Enano contra Empujar DM13 → sigue **13**, distancia por Escala; `U07` Dríade Enraizada DM13 →14 contra Derribar si suelo apto; `U08` suelo perdido antes →13, sin bono; `U09` Verdante anclado a 0 Vida sólo conserva capacidad pasiva si soporte sigue apto y hay Derribar legal.

**Conflicto resuelto EN LA PROPUESTA:** D02 de 17-11 prohibía +1 numérico; el dictamen DER-R2 posterior lo recomienda. **Se elige R2 para el borrador**; D02 subsiste sólo como antecedente R0, **no como segunda norma del borrador**. No declarar «I02 canónicamente cerrado».

## I04 — Enlace Micelial: red, alcance, corte, reconexión

**[CANON]** Acción para enlazarse por contacto directo con red viva, compatible y continua; emisor y receptor Micelios voluntarios, también conectados a la **misma red**, y distancia **12 espacios**. Sólo mensajes simples; enlace termina si contacto o red se interrumpe o usuario decide; no relé, radar, telepatía, hechizos ni Fuente.

**[PROPUESTA ÚNICA B5-MIC1]** Medir el **radio de 12 espacios emisor↔receptor** con métrica de tablero normal, incluida verticalidad cuando el mapa la represente. La longitud sinuosa del filamento **no** sustituye esa medición; la continuidad física real de la **misma red viva** es un requisito adicional indispensable. Si la escena usa altura sin métrica representable, el Director debe fijar la distancia física de casillas antes de declarar la Acción (sin beneficio automático por ignorar vertical). Cada nuevo par/reconexión requiere Acción de quien conecta y receptor voluntario. Un tercero no retransmite automáticamente el mensaje.

**[PROPUESTA MIC2 — eventos]** Al perder cualquiera de los contactos requeridos, consentimiento o continuidad de red, la sesión de comunicación **cesa antes del mensaje siguiente**. Recuperar contacto exige **nueva Acción de enlace**; no reanudar mensajes gratuitamente. Si el emisor alcanza 0 Vida, no puede crear ni emitir mensajes voluntarios nuevos; el mero contacto físico no es acto comunicativo.

**Costo y límite:** Acción inicial para cada enlace pertinente, contacto y consentimiento continuos, radio12 y red viva. No Maná, Fuente ni transmisión de rituales.

**Pruebas DOC:** `U10` 8 espacios directos/25 por hifas, red continua → dentro del radio propuesto; `U11` 13 directos/5 por hifas → fuera; `U12` 5 directos sin continuidad → no enlace; `U13` corte y recontacto sin Acción → no mensaje.

## I05 — Branquias Terio, Coralio y Anfibio 1 PR

**[CANON]** `Anfibio` (Rasgo de creación 1 PR) permite respirar aire/agua ordinarios, sin nadar ni evitar deshidratación/presión/contaminación. `Locomoción Especializada (nado 6)` da velocidad, no respiración explícita. Coralio puede respirar aire/agua mientras esté razonablemente hidratado. El texto Terio llama a las branquias existentes **«funcionales»**, sin una entrada racial que precise la mecánica de respirar agua sin gasto.

**[PROPUESTA ÚNICA B5-ANF1]** Regla de **funcionalidad mínima, sin inventar protección**: si un Terio posee **branquias efectivamente funcionales en su anatomía y medio compatibles**, puede **respirar agua ordinaria por ellas**, pero no por ello respirar aire fuera de su anatomía/órganos pertinentes, obtener Movimiento de nado, presión/inmunidad, ni recibir el **paquete completo de Anfibio**. **Anfibio 1 PR** sigue siendo la opción completa explícita de respirar ambos medios cuando falta otro soporte anatómico. Esta propuesta **reconoce la palabra funcional del canon** y evita negarla, pero añade adjudicación mecánica concreta que debe aprobarse; no concede branquias nuevas a cualquier Terio por ilustración o por nado. Elegir branquias anatómicas es un hecho del linaje, no una Adaptación gratuita adicional. **B4 debe revisar la valoración frente a Coralios** antes de aprobación.

**[PROPUESTA ÚNICA B5-ANF2 / D05-B]** Coralio hidratado conserva respiración racial; si compra Anfibio 1 PR, se permite usar **esa fuente independiente** para respirar aire/agua ordinarios aunque la fisiología racial esté limitada por falta de hidratación. **No remedia la deshidratación ni su Fatiga/efectos**, y en hidratación normal la función no se acumula. No aplicar un cronómetro universal de daño por sequedad inexistente en el Manual.

**Costo y límite:** 1 PR de Anfibio, sin convertibilidad PR/PD. Recursos fisiológicos y exposición como resto del sistema. **Prohibido vender dos veces exactamente el mismo efecto sin beneficio residual distinguible**; si se comprueba que ANF2 no genera beneficio situacional real, reconsiderar compra/reembolso antes de aprobación.

**Pruebas DOC:** `U14` Terio con nado6 sin branquias ni Anfibio: no se presume respirar agua; `U15` Terio con branquias anatómicas funcionales en agua ordinaria: respira sólo por condición anatómica propuesta, sin MOV acuático otorgado; `U16` Terio con Anfibio 1 PR: ambos medios y quedan 2 PR; `U17` Coralio seco sin Anfibio: respiración racial no garantizada; `U18` Coralio seco con Anfibio: respira por fuente general propuesta, **no se hidrata**.

## I06 — Hobgoblin: diferencia aceptada, sin poder de compensación ficticio

**[CANON]** Goblin, Hobgoblin y Bugbear reciben Ojo para la Oportunidad +1 antes de prueba válida 1/Escena; Goblin añade Escurridizo; Bugbear añade Complexión situacional; Hobgoblin no tiene segunda capacidad racial. Profesión, Liderazgo y tecnología no se regalan.

**[PROPUESTA ÚNICA B5-HOB1]** **Mantener exactamente el paquete Hobgoblin de `main` sin cambiar números** y documentar la **asimetría de catálogo como decisión editorial explícita y no equivalencia de potencia demostrada**. La opción Señal de Coordinación y la antigua Disciplina Preparada se conservan **como variantes de estudio**, no como facultades simultáneas ni alternativas oficiales de creación. El uso de Ayuda, Liderazgo o acciones grupales sigue reglas generales.

**Costo y límite:** Ojo 1/Escena, +1 sólo prueba propia con oportunidad verdadera; ningún +1/Ayuda/Acción por herencia.

**Pruebas DOC:** `U19` Hobgoblin solo y con oportunidad real: Ojo propio +1; `U20` no transfiere por Señal ni recibe bono de escuadrón de manera gratuita; `U21` en escenas emparejadas, Goblin tiene Escurridizo y Bugbear Complexión, Hob sólo Ojo: **diferencia reconocida, no paridad fingida**.

**Puerta editorial:** aceptar esa asimetría exige **conformidad de diseño explícita**; no etiquetar «balance final comprobado» sin sesiones emparejadas. No fabricar un poder adicional en B5 para obtener simetría superficial.

## I08 — Conductor Vivo: interfaz y fuente de coste

**[CANON]** Cristálido puede servir **voluntariamente** como puente sólo para dispositivo, ritual, proyecto o fenómeno **diseñado como compatible**. No genera Maná, Energía, Reserva/Caudal, materiales ni competencias; no es inmune a sobrecarga. §2: declarar, pagar recursos, comprobar requisitos, resolver Reacciones y efectuar prueba; costes ya pagados no se reembolsan por fallo salvo texto.

**[PROPUESTA ÚNICA B5-CON1 — contrato mínimo de diseño]** No existe un «poder de activar dispositivo» general. Para usar Conductor Vivo, la **ficha individual del proyecto o efecto** debe definir antes de la declaración: `compatible sí/no`, `operador y Acción`, `recurso aportado y propietario`, `coste/activación`, `capacidad o Caudal máximo`, `ventana de consentimiento`, `efecto de corte`, `condiciones de mantenimiento` y `sobrecarga/daño` si existe. **Si falta un campo necesario para resolver la interacción, se suspende el uso de Conductor, no se improvisa batería infinita.**

**[PROPUESTA CON2 — secuencia]** Obtener consentimiento afirmativo, informado y vigente **antes de declarar la intervención**, como condición previa para decidir si el operador intenta usar Conductor. Una vez declarada la acción, respetar el **orden canónico de §2: declarar → pagar costes → comprobar requisitos → resolver Reacciones → prueba → efectos y consecuencias**. Si el Cristálido no consiente **antes de declarar**, no se inicia y no se paga. Si revoca **después de pagar**, el recurso ya pagado **no se devuelve** salvo texto expreso, el efecto por resolver puede fallar según requisitos, y cesan los **aportes futuros voluntarios**. El contrato de cada dispositivo define cuándo se consulta la cooperación en intervalos posteriores. Cada intervalo sostenido requiere recursos y consentimiento vigentes. A 0 Vida no hay nueva cooperación voluntaria; la autonomía previamente definida de un dispositivo sigue sólo con sus propios recursos.

**Costo y límite:** Acción, Maná/Energía, materiales, CRAFT, competencias y reservas **de la ficha concreta**, nunca por especie. Los números de `LAB-PULSO` y `LAB-SOSTENIDO` de D08 son **fixtures ficticios, no objetos aprobados**.

**Pruebas DOC:** `U22` sin interfaz compatible: no activación; `U23` revoca antes del compromiso: sin gasto; `U24` revoca tras consumo declarado: sin reembolso y sin siguiente pulso; `U25` a 0 Vida: ningún mantenimiento voluntario nuevo, autonomía sólo por ficha explícita.

## I10 — 0 Vida, soporte, red y secuencia de efectos

**[CANON]** Llegar a 0 Vida causa **Incapacitado**, no muerte automática. La primera caída pertinente puede elevar Trauma según regla, heridas no se curan por Ascendencia. Caídas usa `2 × (espacios efectivos−1)`; un jugador Incapacitado no obtiene Acciones o Reacciones nuevas.

**[PROPUESTA ÚNICA B5-ZERO1 — secuencia del mismo efecto]** 1) Registrar estado y soporte **antes de la oposición**; 2) declarar/pagar/comprobar requisitos/Reacciones según §2; 3) resolver prueba y efecto, **aplicar daño y marcar 0 Vida inmediatamente cuando corresponda**; 4) aplicar el desplazamiento o alteración de soporte dictados por ese efecto respetando su texto especial; 5) terminar anclaje/enlace si desaparece requisito físico y resolver caída **sólo si la posición la causa**; 6) procesar consecuencias persistentes/Trauma según canon. **No posponer Incapacitado para permitir una Acción adicional, ni invertir el orden especial escrito por un Hechizo**. Si efectos **realmente simultáneos** carecen de precedencia expresa, usar la fotografía de soporte inicial para el cálculo de resistencia y luego pérdida/caída, registrando este desempate como propuesta.

**[PROPUESTA ZERO2 — pasivos y voluntarios]** Protección Natural y anatomía física pasiva permanecen mientras tengan cuerpo/requisitos; un anclaje **ya establecido** puede conservar estado físico con suelo íntegro, pero el incapacitado no libera voluntariamente ni emite nueva Acción. Enlace Micelial no manda nuevos mensajes voluntarios desde 0 Vida; Conductor no aporta nueva cooperación voluntaria. Los sostenimientos mágicos terminan o continúan **según su regla propia**, no según ser racial. Un dispositivo autónomo sólo sigue si tiene modo y reservas reales especificados.

**Costo y límite:** sin curación, Reacción, movimiento o recuperación de estado gratuita.

**Pruebas DOC:** `U26` Coralio a 0 Vida Prot natural1 y armadura2: usar **Prot2**, no 3/0; `U27` Verdante Enraizado a 0, suelo íntegro: anclaje físico posible, sin Acción voluntaria; `U28` suelo destruido antes de la oposición: no anclaje al resistir; `U29` Hada a 0 en aire sin sustento: caída sólo con altura real, ninguna reacción inventada; `U30` dispositivo sin autonomía a 0 Vida: deja de recibir aportes voluntarios.

## Puerta B5: resumen controlado de diferencias y evidencia

| Código | Decisión única para BORRADOR | Cambio frente a `main` | Condición de cierre |
|---|---|---|---|
| I01 | MOV1/MOV2 | Fracciones multi-medio, mitad en Retirada mixta e interrupción | Revisar geometría, rutas alternativas y Correr |
| I02 | DER-R2 + ANC1 | +1 DM para Derribar, inmovilidad Dríade explícita y orden soporte | Aprobación del modificador numérico y caso 0 Vida |
| I04 | MIC1/MIC2 | Métrica directa, corte/reconexión y contacto al 0 Vida | Red real, alcance vertical, consentimiento |
| I05 | ANF1/ANF2 | Alcance respiratorio branquias funcionales, compra independiente de Coralio | Balance de 1 PR y decisión de linajes |
| I06 | HOB1 | Sin cambio de paquete; aceptación expresa de asimetría | Aprobación editorial de diseño y revisión comparativa |
| I08 | CON1/CON2 | Contrato mínimo de interfaz de dispositivo, corte/recurso | Ficha concreta de dispositivo o prueba negativa verificada |
| I10 | ZERO1/ZERO2 | Precedencia de simultaneidad y persistencia física voluntaria | Casos cruzados y ningún doble coste |

**Registro DOC:** U01–U30 son **30 criterios de aceptación escritos**, no ejecutados en mesa ni Foundry, y no se agregan como 30 pruebas empíricas. Los 12 G preexistentes y 66 pares cuentan como **lectura documentada**, no ejecución. Las siete candidatas están **UNIFICADAS EN PROPUESTA**, no **APROBADAS**, y **B5 aún no tiene cierre editorial definitivo**. `I03/I07/I09/I11` exigen integración adicional antes de C; `I12` queda controlado por texto canónico sin ensayo en vivo.

**Orden siguiente:** producir una matriz de reconciliación de U01–U30 contra G01–G12 y pares críticos, documentar excepciones/supuestos de cada caso, ajustar propuestas contradichas y después emitir acta **B5 DOC cierre condicionado** o **bloqueo fundamentado**. No fabricar pruebas ni alterar canon. Solo `propuestas/razas/` de `propuestas/razas-autonomas-2026`.
