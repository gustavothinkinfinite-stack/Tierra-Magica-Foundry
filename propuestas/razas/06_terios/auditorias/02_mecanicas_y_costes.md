# B2 — Terios/Anihombres: auditoría mecánica de adaptaciones, anatomía, Movimiento y costes

**ESTADO:** ronda B2 **COMPLETADA DOCUMENTALMENTE** con dos aclaraciones conservadoras de fuente, dos conflictos de diseño pendientes y doce regresiones nuevas. **PROPUESTA NO CANÓNICA — NO APROBADA.** Fecha: 17-11-2026. Ningún caso fue ejecutado en Foundry o en mesa.

**Fuente canónica reabierta:** `main:docs/Tierra_Magica_Manual_Maestro.md`, SHA blob `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`, paquete Terio v0.3 (§3, líneas 319–344), reglas transversales de Ascendencia (231–247), modelo 2d10/Acción/Movimiento/Reacción (106–156; 2315–2348; 2801–2895), terreno difícil y Fatiga (2852–2870; 3752–3759), catálogo **Anfibio 1 PR**, **Trepador Natural 1 PR**, **Cola Prensil 1 PR**, **Miembros Extra 2 PR** y **Vuelo Natural 4 PR** (2206–2230, 2301–2309), regla de no acumulación entre Rasgo y paquete (2180–2186), magia `Miembro Efímero`/`Morfología Alada`/`Fase Parcial` (4323–4327), armas/protección/defensas/0 Vida, creador de equipo y Orígenes (443–470). Se revisaron `06_terios/auditoria_y_desarrollo.md`, `doble_pagina.md`, `pruebas_balance.md`, `cierre_editorial.md`, módulo separado `modulo_origen_renkaino.md` y B1 `auditorias/01_canon_y_lore.md`.

## I. Paquete vigente y presupuesto excluyente

**[CANON]** Cada PJ de **Ascendencia Terio** registra **Linaje + Variedad**, una Escala normalmente **Pequeña o Mediana**, Movimiento **6** salvo locomoción específica y exactamente **una de dos elecciones**:

| Modo | Presupuesto racial gratuito | Ejemplos legales | Errores a bloquear |
|---|---|---|---|
| **A** | **Una Adaptación Principal + una Secundaria** | Órgano prensil + Sentido; Locomoción (nado) + Adaptación Ambiental; Excavador + Sentido; Complexión + Protección | 2 Principales, 2 Secundarias o 1 Principal + 2 Secundarias |
| **B** | **Una Adaptación Dominante** | Vuelo sostenido con cuerpo aerodinámico realmente capaz | Dominante + garras, sonar, protección o cualquier Principal/Secundaria gratis |

**[CANON]** Una Variedad puede **reemplazar** una adaptación, no agregar una tercera. La regla **NO define equivalencia obligatoria de categoría** para el reemplazo. El borrador adopta **[PROPUESTA]** un cambio **Principal→Principal / Secundaria→Secundaria / Dominante→Dominante**, con registro de beneficio que sale, para que el presupuesto final siga válido. Esa equivalencia de categoría **no es canon hasta aprobación**; se prohíbe presentar este protocolo como si ya limitara todas las Variedades existentes.

**[CANON]** Los 25 PD y 3 PR ordinarios permanecen intactos, el Origen/Trasfondo no da rangos, una sola Ascendencia por ficha; ninguna adaptación escala automáticamente con nivel. Los ocho perfiles morfofuncionales (lupino/felino/elefantino/aviano/quelonio/semiacuático/fosorial/quiróptero) son **ejemplos propuestos**, no ocho subpaquetes con poderes fijos.

## II. Fichas de 18 capacidades y cruces de subsistemas

| ID | Capacidad / disparador | Efecto, coste, alcance o duración | Exclusiones e interacción | Riesgo y control documental |
|---|---|---|---|---|
| TER-B2-R01 | Presupuesto de Adaptaciones | Selección **A o B** al crear; sin PR adicional | Nada de 1 Principal+1 Secundaria+Vuelo Dominante, ni segunda rama por edad | TER-T01–10, T32/36 |
| TER-B2-R02 | Variedad — reemplazo | Una adaptación **sale** y otra ocupa su lugar cuando el Linaje lo justifica | «Misma categoría» es propuesta; no permitir presupuesto A+B | TER-T05–08/T58; decisión B3/B4 |
| TER-B2-R03 | Escala/MOV básico | Pequeña o Mediana según Linaje, MOV6 salvo caso específico | Talla narrativa de elefantino no da Escala Grande, alcance, armas o daño gratis | TER-T01/T44, equipo compatible |
| TER-B2-R04 | Secundaria **Sentido especializado** | **+1 PER** al ser determinante un sentido anatómico concreto y estrecho | No +PER general, Visión Arcana, Iniciativa, Sigilo o radar; no sumar fuente equivalente `Sentido Agudo` sobre misma señal | TER-T19–21/T59 |
| TER-B2-R05 | Secundaria **Arma natural** | **Daño 3, Pen 0**, arma disponible; se ataca por Acción normal con método/Habilidad pertinente | No golpe adicional, combinar 3 daño con arma, atacar con trompa/colmillo gratis | TER-T14–16/T51 |
| TER-B2-R06 | Secundaria **Protección Natural** | **Protección 1** para daño donde corresponda | No suma armadura; escoger valor mayor. Barrera separada sólo si su texto permite capa | TER-T17–18/T50 |
| TER-B2-R07 | Secundaria **Adaptación ambiental** | Una exposición concreta: +1 VIG **o** eliminación de dificultad física específica cuando anatomía la permite | No ambos por misma elección; no inmunidad, no evitar agua/aire/descanso; evitar convertir VIG ambiental en Defensa Corporal universal | TER-T28–29 |
| TER-B2-R08 | Secundaria **Movilidad Adaptada** | Ignora **una causa muy concreta** de terreno difícil justificada físicamente | No atravesar muro, vacío, roca o todo un bioma; diferencia de Locomoción | TER-T27/T56 |
| TER-B2-R09 | Principal **Complexión poderosa** | **+1 FUE efectiva** para Carga/fuerza contra objetos inertes | No FUE en ataques, daño, Agarrar, Empujar, Derribar; no Escala efectiva Grande | TER-T22–23 |
| TER-B2-R10 | Principal **Órgano prensil** | Sujetar/manipular objeto apropiado durante acción que ya fuese legal | No Acción/Reacción/ataque/escudo/recarga adicionales, no negar costes de acceso a equipo | TER-T11–13/T49 |
| TER-B2-R11 | Principal **Locomoción Especializada** | **MOV6 en un único medio** anatómico elegido, p. ej. trepar **o** nadar | No dos medios, +6 Movimiento terrestre, respiración bajo agua, atravesar paredes o nadar sin corrientes | TER-T24–26/T52/T56 |
| TER-B2-R12 | Principal **Excavador** | Remueve con rapidez tierra/arena/sustrato blando; crea paso **con tiempo** | Sin MOV subterráneo normal, ni velocidad por Acción fijada, ni roca maciza/teletransporte; estudiar seguridad y costes B3 | TER-T30–31/T57 |
| TER-B2-R13 | Dominante **Vuelo sostenido** | Anatomía real compatible; consume todo presupuesto racial, usa MOV normal | No Acción/Reacción extra, vuelo bajo Carga Pesada/Excesiva, maniobrabilidad perfecta ni inmunidad a caída | TER-T32–38/T54–55 |
| TER-B2-R14 | **Anfibio** general (1 PR) | Respiración funcional de aire y agua ordinarios cuando se compra legalmente | No nado, presión, toxicidad, deshidratación, defensa acuática; debate de branquias reales pendiente | TER-T25–26/T52–53 |
| TER-B2-R15 | Rasgos `Trepador Natural`/`Cola Prensil`/`Miembros Extra` | 1/1/2 PR respectivamente, efectos precisos propios | No duplicar propiedad exacta de paquete, ni conceder miembros/actions adicionales; no declarar equivalencia cuando beneficios realmente distintos | TER-T49/T56 |
| TER-B2-R16 | Magia y dispositivos | Si PJ adquiere Fuente/Disciplinas/Técnicas/equipo, paga PD/PR/Maná/Acción/Proyecto | `Morfología Alada` no duplica movimiento racial; `Miembro Efímero` no concede acción/escudo; `Fase Parcial` no modifica Excavador retroactivamente | Regresión B3 para Hechizos sostenidos y CRAFT |
| TER-B2-R17 | Vida/Trauma/Fatiga/0 Vida/Descanso | Reglas generales, con equipo/fisiología viable | Caparazón sin Protección escogida no blinda; alas no evitan caer a 0; manipulación de trompa no cura Trauma | TER-T35/T38/T50/T55 |
| TER-B2-R18 | **Origen Renkaino** de propuesta | Si se aprueba **futuro**: reemplazar un Origen, 0 PD/0 PR, idioma y Faceta cultural | **No está en los diez Orígenes vigentes**; no mezclar idioma regional, origen automático ni equipo «samurái» gratis | TER-T40–43/T60; REN-01–08 |

**Acumulación:** cuando Rasgo comprado y paquete racial describen **exactamente la misma propiedad**, `main` prohíbe acumular o cobrar dos veces por ella. Dos propiedades distintas pueden coexistir si son legítimas: nado MOV6 por Locomoción y respiración por Anfibio no son iguales, por ejemplo. Dos mejoras equivalentes de percepción sobre el **mismo sentido y prueba** usan el mayor beneficio; sin +2 automático.

## III. Dos puntos de diseño que B2 no debe disfrazar de canon

### TER-INC-B2-01 — Anatomía funcional vs. beneficio respiratorio cuantificado (prioridad ALTA)

El trasfondo `main` dice que trompas, alas, garras, caparazones, **branquias** o sentidos son **partes reales y funcionales cuando el Linaje los posee**. Sin embargo, la tabla de adaptaciones Terias **no incluye «Respiración Anfibia»**, y `Locomoción Especializada (nado)` sólo indica MOV6 en un medio. El catálogo general sí ofrece **Anfibio — 1 PR** con límites de aire/agua. Hay tensión textual real entre la descripción de órganos funcionales y la economía de beneficios.

**Alternativas editoriales reales, NO CANÓNICAS:**
- **A. Contención costeada (la actual del borrador):** si la ficha requiere respirar aire y agua de forma útil, registrar `Anfibio (1 PR)` u otra capacidad específica compatible; no asumir gratis por apariencia. Si se dibujan branquias, justificar qué función tienen sin presentarlas como respiración acuática plenamente reglada hasta que exista compra; el diseño de imagen debe ser consistente con la ficha.
- **B. Excepción explícita por Linaje:** admitir que ciertos órganos funcionales conceden respiración de agua por ascendencia, **pero debe definirse y equilibrarse como regla racial nueva** y compararse contra Coralios y Terio semiacuático; no se deduce inequívocamente del listado de adaptaciones.
- **C. Adaptación específica futura:** proponer una Secundaria/Dominante «Respiración» con valor comparado, en lugar de asumir que todo cuerpo con branquias obtiene beneficio gratis.

**Dictamen B2:** mantener de forma provisional la **opción A** del expediente, **identificándola expresamente como propuesta**, no como canon literal ratificado. B3/B4 deben determinar viabilidad física y coste relativo, y evitar que una imagen cree un poder no adquirido.

### TER-INC-B2-02 — Variedad y sustitución (prioridad ALTA)

`main` autoriza reemplazar una adaptación y prohíbe añadir tercera, pero no fija equivalencia de categoría. La propuesta editorial B1 conserva la misma plaza **para evitar transformar 1 Principal +1 Secundaria en Dominante + Secundaria**. Esto es un **protocolo nuevo**, no una ley ya incluida en la entrada. El resultado final **debe ser un presupuesto A o B legal** y retirarse todos los efectos de la adaptación reemplazada. B3 probará secuencias de cambios de Variedad, poderes persistentes, compra repetida y si sería admisible cambiar de A a B eliminando ambas elecciones; esa transición no está resuelta por el canon.

**Propuesta concreta de redacción futura:** «Una Variedad puede reemplazar una Adaptación, pero la selección resultante siempre debe cumplir A (una Principal + una Secundaria) o B (una Dominante). En los ejemplos de este borrador sólo se permite reemplazar por otra de la misma categoría». Las dos oraciones son **propuestas**. La primera enfatiza coherencia con el presupuesto final, la segunda especifica contención editorial.

## IV. Mecánicas de locomoción y equipo

### 1. Vuelo Terio vs. Hada y Hechizos

**Vuelo Dominante Terio:** ocupa **las dos plazas normales** mediante un solo Dominante, requiere alas o cuerpo realmente volador, usa Movimiento normal, no aporta Acción/Reacción adicional y se bloquea con Carga Pesada/Excesiva. **No se debe importar** el requisito **«comenzar y terminar cada turno apoyada»** que sí es texto específico del vuelo Hada. Tampoco existe una regla racial de vuelo estacionario perfecto, acción independiente de vuelo o inmunidad a caída para Terios.

**Comparación con `Morfología Alada`** (Hechizo Maestro Sostenido): consume su Maná/Acción/Sostenimiento cuando se lanza legalmente y permite volar hasta Movimiento normal. Si un Terio ya vuela de forma Dominante, lanzarlo **no concede segunda reserva de MOV** ni doble vuelo. Cuando vuelo se interrumpe por lesión, carga, oposición física o pérdida de sustentación, la secuencia de reacción/caída necesita B3 y el texto de efectos relevantes; no afirmar que cada Terio sufre un daño fijo de aterrizaje sin consultar distancias.

**Carga:** movimiento bajo Carga Pesada/Excesiva es prohibición expresa. Llevar a una persona puede constituir Carga; evaluarla con Escala, FUE, equipamiento y medios físicos, no inventar «un aliado gratis por ala». Si se produce una caída, aplicar Caídas y eventual `AGI+Acrobacia`, y luego Vida/Trauma del núcleo; no convertir vuelo en paracaídas racial universal.

### 2. Locomoción Especializada, Movilidad Adaptada y Trepador Natural

- **Locomoción (nado):** MOV6 en **agua compatible con su anatomía**; no respira agua por ese rasgo. Corrientes, presión, frío, contaminación y pruebas de Natación siguen existiendo cuando el texto de escena los exige.
- **Locomoción (trepa):** MOV6 **en ese medio** físicamente trepable. No significa desplazamiento por superficies sin apoyos, ni elimina automáticamente pruebas de Atletismo o riesgo.
- **Movilidad Adaptada:** elige **una causa muy concreta** de terreno difícil (arena blanda, ramas bajas transitables, etc.), la ignora donde el cuerpo lo permita; no le da MOV6 en otro medio ni ignora todo terreno adverso.
- **Trepador Natural (1 PR):** en superficies trepables con apoyo, cada espacio cuesta **1 Movimiento** en vez de terreno dificultado por defecto. Puede ser complementario con Locomoción de trepa, pero **no duplica tramos** ni apila propiedades exactamente iguales. B3 debe precisar cuándo hay redundancia total o beneficio diferenciado sin cobrar dos veces el mismo efecto.

### 3. Órgano prensil, Cola Prensil y Miembros Extra

Una trompa, cola o mano adicional **puede estar dibujada y ser físicamente real** en el Linaje. La adaptación `Órgano prensil` permite la capacidad mecánica de sujetar/manipular **sin conceder una Acción, ataque, escudo ni recarga extra**. El catálogo de Cola Prensil y Miembros Extra también restringe la economía de acciones. No se puede atacar con arma de dos manos, usar escudo completo con trompa y efectuar recarga simultánea porque tenga tres apéndices; cada manipulación debe cumplir acceso, Acción, Reacción y compatibilidad.

**Conflicto editorial abierto:** si un Linaje tiene trompa funcional pero **no escoge** Órgano prensil, no debería describirse como un adorno inútil. El canon, sin embargo, tampoco promete una «mano extra reglada» gratuita. Propuesta para decidir en B3/B4: distinguir **uso anatómico cotidiano narrativo sin ventaja adicional** de **capacidad mecánica manipuladora de combate/equipo** reservada a la adaptación o Rasgo legal. Aceptar gestos corporales comunes sin permitir eludir recursos cuantificados; no cuantificar velocidad, carga/escudos sin decisión explícita.

### 4. Armas y protección naturales

**Arma natural** Daño **3/Pen 0** es arma disponible y funciona con Acción/Habilidad normales, no ataque adicional ni combinación con una espada por suma de Daño. Un pico, colmillo o garra dibujado en un Terio no concede automáticamente esta entrada si no fue elegido. **Protección Natural 1** sólo pertenece a quien la elige y no se suma a armadura: con armadura de Protección 3, prevalece 3; si un hechizo genera otra barrera, la suma o capa depende de su propio texto. Un caparazón narrativo no habilita protección contra todo tipo de Daño, inmunidad o 0 Vida diferente.

## V. Subsistemas complementarios y riesgos

| Subsistema | Resultado conforme al Manual | Caso de abuso B3 |
|---|---|---|
| **Atributos y costes** | 25 PD, 3 PR, máximos iniciales y una única Ascendencia; las Adaptaciones son paquete aparte | «tengo ocho especies: elijo 8 opciones» |
| **Escala y equipo** | Escala Pequeña/Mediana; piezas iniciales pueden adaptarse a anatomía, piezas únicas pueden requerir modificación | armadura de talla no compatible o «trompa = escudo sin coste» |
| **Iniciativa/combate** | Sin bonificaciones por orejas, garras o cola salvo prueba PER estrecha legal | +1 Iniciativa por sentido aunque el paquete no lo dice |
| **Defensa y Maniobras** | Complexión poderosa sólo FUE efectiva sobre objetos/Carga; arma natural no suma Daño ni Defensa | usar trompa para 2 Agarrar por una Acción |
| **Fatiga/descanso/0 Vida** | fisiología viva; estados generales, Sangrado/Trauma y Descanso según reglas | regeneración por caparazón/sangre animal/raza |
| **Agua/exposición** | Anfibio comprado permite respirar aire/agua pero no da natación/inmunidad | branquias y membranas ilustradas como «respiración+MOV6 gratis» |
| **Magia sostenida** | Morfología Alada/Miembro Efímero/Fase Parcial exigen magia, coste, requisitos y límite de Sostenimiento | vuelo x2, órgano extra x2, excavación = fase |
| **Alquimia** | Dosis, Saturación, activación y componentes siguen la Fórmula | «saliva venenosa», antídoto o curación gratuitas por especie |
| **Ingeniería/CRAFT** | herramental, taller, Proyecto/Material y tiempo; no descuentos inventados por forma animal | «excavar = minar material raro sin coste» |
| **Familiares** | una criatura con Familiar aplica sus reglas de órdenes y Acción Vinculada | «mi animal interno es Familiar de nacimiento» |
| **Origen Renkaino** | no forma parte de 10 Orígenes vigentes; el módulo es propuesta aislada | doble idioma y Faceta, herencia por Linaje, acceso a Foundry sin ratificar |

## VI. Matriz de 20 escenarios de aceptación B2 (documentales)

| ID | Escenario | Resultado esperado / pendiente |
|---|---|---|
| TER-B2-S01 | Terio Lupino con Principal+Secundaria | Un presupuesto A, no tercera adaptación por Linaje |
| TER-B2-S02 | Terio Aviano con Dominante Vuelo y garras visuales | Vuelo legal, **sin Arma natural de Daño 3** salvo compra/regla ajena costeada |
| TER-B2-S03 | Variedad cambia Secundaria sin perder la original | Inválido duplicar; elegir resultado final A/B legal |
| TER-B2-S04 | Variedad pretende Dominante más Secundaria | Incompatible con presupuesto canónico; equivalencia de plaza propuesta aún no ratificada |
| TER-B2-S05 | Elefantino con órgano prensil recarga arma mientras ataca | No recarga ni Acción extra |
| TER-B2-S06 | Elefantino con trompa no elegida como Principal | Anatomía narrativamente real; beneficio cuantificado/función fuera de ficha **pendiente decisión** |
| TER-B2-S07 | Felino usa garras Daño 3/Pen 0 más espada en único ataque | No sumar daños ni dobles ataques |
| TER-B2-S08 | Quelonio con Protección 1 y armadura 3 | Valor mayor 3, no 4 |
| TER-B2-S09 | Terio compra Anfibio 1 PR junto a nado MOV6 | Propiedades distintas, posibilidad legal si anatomía lo sustenta |
| TER-B2-S10 | Terio con branquias físicas sin rasgo acuático | Requiere decisión sobre anatomía funcional y respiración; contención costeada es propuesta |
| TER-B2-S11 | Terio con Vuelo Dominante en aire abierto al fin de turno | No importar obligación de apoyo de Hada; reglas reales de vuelo y entorno |
| TER-B2-S12 | Terio con Vuelo Dominante adquiere Carga Pesada | No utilizar vuelo sostenido mientras dure carga; trayectoria/caída B3 |
| TER-B2-S13 | Terio con vuelo pretende segunda Acción por maniobra aérea | No |
| TER-B2-S14 | Terio con Excavador atraviesa roca sólida 6 espacios/turno | No, removible sólo sustrato blando y con tiempo |
| TER-B2-S15 | Terio con trepa MOV6 en pared sin agarres | No volver físicamente posible una trepa imposible |
| TER-B2-S16 | Movilidad Adaptada ignora arena específica y luego barro | Sólo terreno elegido, no todo lo difícil |
| TER-B2-S17 | Sentido especializado olfato + Sentido Agudo olfato | No +2 equivalente sobre misma prueba |
| TER-B2-S18 | Terio compra Miembros Extra o Cola Prensil con 3 PR | Sigue economía universal; no duplicar propiedad exacta de órgano elegida |
| TER-B2-S19 | Terio Exhausto o a 0 Vida quiere activar vuelo/garra | Fatiga y estados generales siguen sin ser superados por anatomía |
| TER-B2-S20 | Personaje Terio de cultura Renkai quiere 11.ª entrada en Foundry actual | No está disponible, sólo propuesta de módulo externo; origen alternativo de campaña debe explicitarse |

## VII. Registro de incidencias (10)

| ID | Severidad | Hallazgo | Corrección/seguimiento |
|---|---|---|---|
| TER-INC-B2-01 | **ALTA** | Branquias reales funcionales frente a ausencia de efecto racial expreso de respiración acuática | **Aclarado en desarrollo como tensión abierta**; retener compra Anfibio de propuesta, **B3/B4 deben decidir** |
| TER-INC-B2-02 | **ALTA** | Variedad permite reemplazar, pero no fija categorías de sustitución | Protocolo «misma plaza» sigue **propuesta**, B3 decidir transiciones de presupuesto |
| TER-INC-B2-03 | **ALTA** | Anatomía de trompa/garras funcional vs. precio de beneficios de ficha | B3 precisar nivel narrativo y función mecánica, no órgano puramente decorativo ni acción gratis |
| TER-INC-B2-04 | **ALTA** | Vuelo Terio se confunde con Hada o vuelo mágico, y con caída/carga | **Corrección documental de distinción** en `auditoria_y_desarrollo.md`; secuencias B3 |
| TER-INC-B2-05 | **MEDIA** | Órgano prensil + Cola Prensil/Miembros Extra/Miembro Efímero | No apilar efecto igual ni regalar Acción/escudo; B3 inventariar manos y equipo |
| TER-INC-B2-06 | **MEDIA** | Protección Natural/armadura/Piel Alterada/barreras | Mantener regla del mayor y texto específico de cada barrera; B3 ataques mixtos |
| TER-INC-B2-07 | **MEDIA** | Movilidad Adaptada, Locomoción trepa y Trepador Natural pueden tener solapes o redundancia | B3 aclarar costes sin dar doble MOV, no penalizar compras de efecto realmente distinto |
| TER-INC-B2-08 | **MEDIA** | Excavador «con tiempo» sin duración cuantificada | B3 fijar ejemplos físicos como propuestas, no «1 espacio/Acción» canónico |
| TER-INC-B2-09 | **MEDIA** | Origen Renkaino puede entrar en fichas/atlas antes de aprobación | Módulo aislado, no habilitado; B4 y aprobación geográfica/lingüística |
| TER-INC-B2-10 | **MEDIA** | Vuelo Dominante frente a 1 Principal+1 Secundaria puede quedar infra/sobrevalorado según escenas | B4 comparar uso, coste de oportunidad y límites de carga con Hada/otros once pueblos |

## VIII. Dictamen y siguiente unidad

**B2 Terios completada documentalmente**: 18 fichas de subsistemas, 20 escenarios de análisis y 10 incidencias registradas; se añadieron **TER-T49–T60** para totalizar **60 criterios documentales, cero ejecuciones**. Se preservan todas las adaptaciones del paquete v0.3 y la diferencia explícita entre **regla canónica** y **propuesta editorial** de respiración/Variedad. Ninguna fisiología, magia o habilidad nueva se ha incorporado a `main`.

**Próxima auditoría B2:** **Feéricos** — vuelo Hada con apoyo inicio/fin, Paso de Cabra, arma Cuernos, Vínculo Arbóreo/Enraizar, Silfo/Corporalidad del Viento y su cruce con Verdantes, Magia Sostenida y regla opcional de Continuidad de la Raíz. Tras completar B2 por las doce familias, comenzar B3, luego B4/B5 y sólo después los doce textos finales propuestos.

**Guardarraíl:** escribir exclusivamente en `propuestas/razas/` de rama `propuestas/razas-autonomas-2026`; no tocar `main`, Manual Maestro, Foundry ni mapa.
