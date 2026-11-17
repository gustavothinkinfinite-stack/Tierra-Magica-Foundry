# Terios — Pruebas de reglas, balance y explotación v0.1
**Estado:** auditoría estática y guiones de ejecución; **ningún caso se declara probado en partida real**. Fuentes: `main:docs/Tierra_Magica_Manual_Maestro.md`, creación racial v0.3, efectos de Escala, Movimiento/Acción/Reacción, Protección, Habilidades, Rasgos generales y Orígenes. **Solo propuesta**, sin cambiar Foundry.

## I. Integridad de creación
| Caso | Condición | Resultado esperado |
|---|---|---|
| TER-T01 | Crear Terio estándar | Una Ascendencia «Terio», un Linaje y una Variedad; Escala Pequeña o Mediana justificada, Movimiento 6 salvo locomoción específica |
| TER-T02 | Elegir Principal + Secundaria | Exactamente dos adaptaciones, una de cada categoría, nunca dos Principales |
| TER-T03 | Elegir Dominante | Exactamente una Dominante y **cero** Principal/Secundaria |
| TER-T04 | Elegir Dominante y luego Arma natural | Ilegal: vuelo ocupa todo el presupuesto |
| TER-T05 | Dos Variedades sucesivas | No dan dos sustituciones acumuladas ni varios paquetes; registrar Variedad concreta y elección final |
| TER-T06 | Sustitución de Secundaria | Quitar beneficio de Secundaria original; conservar una única Secundaria final |
| TER-T07 | Sustitución de Principal | Quitar Principal original; adquirir otra compatible en su plaza. Equivalencia de plaza es protocolo de propuesta, no regla operativa ratificada |
| TER-T08 | Anatomía incompatible con opción | Rechazar elección o exigir descripción corporal creíble; no autoriza mutación instantánea |
| TER-T09 | Creación en nivel 1 | Paquete racial no consume 25 PD ni 3 PR, no concede Habilidades ni Atributos gratis |
| TER-T10 | Nivel posterior | No aumenta automáticamente alcance, daño, protección, velocidad ni cantidad de adaptaciones |

## II. Órganos, sentidos y armas
| Caso | Condición | Resultado esperado |
|---|---|---|
| TER-T11 | Trompa elegida como Órgano prensil Principal | Puede sostener/manipular objetos físicamente apropiados con costes ordinarios; no da Acción adicional |
| TER-T12 | Trompa usa escudo mientras dos manos portan arma de dos manos | No obtiene escudo operativo adicional ni ataque/recarga gratis |
| TER-T13 | Trompa sin Órgano prensil elegido | La presencia de órgano anatómico no regala la capacidad cuantificada de manipulación extraordinaria; ajustar descripción/equipo |
| TER-T14 | Felino con garras naturales elegidas | Daño 3 Penetración 0 como arma disponible; ataque consume Acción normal, sin sumarse a arma equipada |
| TER-T15 | Felino usa garras y espada en un mismo ataque | No se suma daño de armas ni duplica ataques |
| TER-T16 | Elefantino golpea con colmillos no elegidos como Arma natural | No adquiere daño extra por mera fisonomía; aplicar ataque ordinario o elegir adaptación legal en creación |
| TER-T17 | Quelonio con Protección Natural 1 y armadura Protección 3 | Usar 3, no 4 |
| TER-T18 | Protección Natural 1 con una barrera mágica | Una barrera sólo añade capa si su regla propia lo permite; no apilamiento automático |
| TER-T19 | Sentido especializado olfato, olor realmente determinante | +1 PER únicamente por ese sentido estrecho |
| TER-T20 | Sentido especializado olfato, examen visual de runas | No +1, no concede Arcana ni Investigación |
| TER-T21 | Sonar de quiróptero auditivo | Se resuelve como sentido estrecho, no visión universal ni detección de enemigos detrás de muros |

## III. Carga, terreno, excavación y agua
| Caso | Condición | Resultado esperado |
|---|---|---|
| TER-T22 | Complexión poderosa al levantar objeto inerte | +1 FUE efectiva, no +1 Ataque, Daño o Empujar criatura |
| TER-T23 | Complexión poderosa en Agarrar | No +1 racial contra criatura, ni nueva Escala efectiva |
| TER-T24 | Trepa con Locomoción Especializada | Movimiento 6 en medio válido. No atraviesa piedra lisa sin agarre ni elimina Atletismo peligroso |
| TER-T25 | Nado con Locomoción Especializada | Movimiento 6 nadando en agua plausible; no respirar bajo agua ni resistir presión |
| TER-T26 | Buceo prolongado por tener membranas o branquias en arte | Sin respiración anfibia automática del paquete; requiere regla, Rasgo Anfibio adquirido o fuente explícita |
| TER-T27 | Movilidad Adaptada «arena blanda» | Ignora **esa** causa concreta de terreno difícil, no pantanos, piedras o bosques |
| TER-T28 | Adaptación ambiental «frío» | +1 VIG frente a exposición ambiental concreta, no daño mágico frío sólo por tema |
| TER-T29 | Adaptación ambiental como eliminación de dificultad física | Sólo la dificultad anatómicamente especificada y compatible; no inmunidad general al clima |
| TER-T30 | Excavador abre galería por arena | Requiere tiempo, ventilación/estabilidad adjudicadas y sustrato removible; no túnel instantáneo |
| TER-T31 | Excavador intenta atravesar roca maciza durante combate | No puede emplearlo como Movimiento subterráneo ni teletransporte |

## IV. Vuelo sostenido Dominante
| Caso | Condición | Resultado esperado |
|---|---|---|
| TER-T32 | Terio aviano escoge Vuelo sostenido | Se queda sin Principal y Secundaria, incluso si tiene garras u oído agudo |
| TER-T33 | Criatura voladora con Carga Pesada o Excesiva | No puede mantener vuelo racial sostenido; no importar excepción de equipo |
| TER-T34 | Vuelo y Acción | Volar consume Movimiento normal y no concede Acción/Reacción, ni ataque gratis |
| TER-T35 | Vuelo con alas sin fuerza o con barrera física | Anatomía y entorno importan; no vuelo inmune a clima, cobertura o espacio imposible |
| TER-T36 | Vuelo + compra de Vuelo Natural 4 PR | No acumular vuelo idéntico ni obtener segundo Movimiento; además Vuelo Natural no se compra con los 3 PR ordinarios de nivel 1 |
| TER-T37 | Alzar a compañero mientras vuela | Aplicar Carga y reglas físicas: no superar condición prohibida por Carga Pesada o Excesiva |
| TER-T38 | Volar para ignorar daño de una caída ya resuelta | No hay retroactividad; acciones y disparadores siguen su secuencia ordinaria |

## V. Identidad, cultura y proyecto insular
| Caso | Condición | Resultado esperado |
|---|---|---|
| TER-T39 | Terio chacalino vs. Ankar | Orígenes cosmológicos distintos; no mezclar Custodia del Alma ni Sentido del Umbral |
| TER-T40 | Terio de Origen Kharumita | Habla Común de Concordia/Kharumita, obtiene Faceta Kharumita, no idioma insular ni bono de su animal |
| TER-T41 | Origen Renkaino propuesto | Reemplaza otro Origen, no suma segunda Faceta o idiomas de dos Orígenes; no es selección vigente en Foundry |
| TER-T42 | Faceta Renkaina «Riego» en prueba de Ingeniería | Familiaridad con costumbre local, sin +1 ni rango Habilidad adquirido |
| TER-T43 | Ritual de Eïra en escuela oriental | No concede Fuente Divina sin Vínculo comprado legalmente |
| TER-T44 | Elefantino aprendiz de combate | Su disciplina marcial exige Habilidad/Técnica comprada con PD; la trompa no concede golpe adicional |
| TER-T45 | «Renkai» sobre mapa canónico | Prohibido reemplazar rótulo «Territorio Oriental» sin aprobación de atlas y Manual Maestro |
| TER-T46 | Intentar «cazar como un animal» por linaje | La ficción puede guiar elección de Habilidad; no genera Percepción, Supervivencia, Sigilo o Naturaleza gratis |
| TER-T47 | Dos idiomas «raciales» por linaje mixto | No existen sin perfil de Origen/Trasfondo adecuado y regla; no añadir por cuerpo |
| TER-T48 | Mezclar Terio con otra Ascendencia | Prohibido sumar paquetes sin regla de herencia mixta ratificada |

## VI. Ejecución de pruebas sugeridas (sin afirmar que se ejecutaron)
1. Crear 8 fichas con los ejemplos del expediente, en dos Orígenes distintos, verificar presupuesto exacto y adecuación morfológica.
2. Comparar escena de combate en terreno difícil de arena, troncos, barro y piedra; registrar causas concretas de terreno difícil y qué adaptación realmente aplica.
3. Resolver cuatro maniobras universales y acciones de arma natural, detectando combinaciones indebidas de Acción, Reacción, escudo, garra y trompa.
4. Simular exploración de cueva con fosorial Excavador, felino trepador, quiróptero sensorial y aviano que vuela; registrar diferencias entre sustrato, perceptibilidad, vuelo y técnica.
5. Resolver viaje acuático con semiacuático especializado en nado que necesita aire; añadir Rasgo Anfibio pagado en otro personaje para comprobar diferencia.
6. Simular vuelo con carga liviana, Carga Pesada, una caída y un combate; exigir turno normal y verificar pérdidas de altura/espacio según adjudicación general.
7. Crear Terio de Renkai y Terio de Erelia con same Linaje; verificar que sólo cultura cambia, no Adaptación.
8. Realizar comparación contra Terio con dos adaptaciones y Terio Dominante volador en 10 escenas representativas: exploración, negociación, combate, traslados, rescatismo; observar usos reales, no sólo potencia teórica.

## VII. Riesgos y remedios
**Prioridad crítica:** «anatomía funcional» podría permitir al jugador exigir vuelo, mordisco, nado y escudo de trompa simultáneamente. La regla exige elegir adaptaciones y registra límites; toda nueva propiedad mecánica debe costar Rasgo o recurso legal. La solución no consiste en negar la apariencia del cuerpo, sino diferenciar **descripción** de **beneficio adicional**.

**Prioridad alta:** el sistema no define distancias/velocidad cuantificada para excavación. Conservar «crea paso con tiempo»; el DJ fija tiempo y seguridad según sustrato y herramientas, no «1 espacio por Acción» automático.

**Prioridad alta:** la futura integración de Origen Renkaino afecta tablas y traducciones de creación y la consistencia geográfica, pero **no puede implementarse antes de ratificar nombre e idioma**.

**Prioridad media:** en «Variedad reemplaza adaptación» no consta si puede sustituirse una Principal por Secundaria. Propuesta conservadora: equivalencia de categoría y documento explícito, sometida a aprobación global; no sobrescribir el Manual Maestro.

**Resultado inicial:** 48 criterios documentales; ampliados a **84 (48 iniciales + 12 B2 + 24 B3)**, sin ejecución empírica. No se identificó necesidad de Habilidad racial nueva. Se identificó una ampliación de Origen cultural, desarrollada en módulo separado para una decisión editorial posterior.

## VIII. Casos B2 de regresión documental — TER-T49 a TER-T60

**Son criterios derivados de lectura del Manual Maestro, no tests ejecutados**. La función de branquias y el procedimiento de Variedad tienen decisión pendiente de B3/B4; no convertir la solución propuesta en canon.

| ID | Situación | Resultado esperado / pregunta abierta |
|---|---|---|
| TER-T49 | Terio elefantino elige **Órgano prensil Principal** y compra `Cola Prensil` por PR pretendiendo dos acciones de manipulación | El órgano no da Acción/Reacción/ataque/recarga adicional; beneficios exactamente equivalentes no se acumulan. Diferenciar anatomía y propiedades antes de cobrar dos veces lo mismo |
| TER-T50 | Terio con caparazón elige **Protección Natural 1** y viste armadura Protección 3 | Protección efectiva de fuente corporal/equipo es **3**, no 4; barrera independiente sólo por su propio texto |
| TER-T51 | Terio con garra elige **Arma Natural Daño 3/Pen 0** y ataca además con arma | Una acción de ataque legal y su arma; sin daño sumado ni ataque de regalo |
| TER-T52 | Terio con **Locomoción Especializada (nado 6)** y compra **Anfibio 1 PR** | Combinación plausible con anatomía compatible: nado y respiración resuelven propiedades distintas; no concede presión, corriente, temperatura, higiene ni acciones extra |
| TER-T53 | Terio ilustrado con **branquias físicas** sin Anfibio ni otra capacidad | El texto de origen exige anatomía funcional, pero **no establece coste/efecto explícito** para respirar agua en la lista Teria: decisión pendiente. La restricción de compra Anfibio es **propuesta**, no canon literal |
| TER-T54 | Terio aviano con **Vuelo Dominante** quiere cerrar turno en aire abierto | No importar de Hada el requisito de posarse al inicio/fin; aplicar vuelo sostenido Terio normal y condiciones reales. La altura/maniobras que falten definir pasan B3 |
| TER-T55 | Terio aviano con Vuelo Dominante entra en **Carga Pesada** durante su turno | El vuelo sostenido racial no puede usarse mientras dure la Carga Pesada/Excesiva; resolver pérdida de sustentación, caída y costes en B3 sin generar inmunidad |
| TER-T56 | Terio con Locomoción Especializada trepa 6 y adquiere **Trepador Natural 1 PR** | Trepar 6 en medio anatómico válido no da un segundo tramo ni Acción extra; Trepador Natural puede regular el **coste por espacio** en apoyos válidos según su texto. Determinar si son propiedades diferentes antes de declarar duplicación o beneficio |
| TER-T57 | Terio Excavador crea túnel por arena con una Acción y exige «MOV subterráneo 6» | El texto garantiza remover y crear paso **con tiempo**, no velocidad subterránea normal ni metros/Acción; registrar método, estabilidad y tiempo en B3 |
| TER-T58 | Una **Variedad** pretende reemplazar una Principal por Dominante y conservar la Secundaria | El paquete permite Principal+Secundaria **o** Dominante, nunca ambos. «Misma categoría de sustitución» sigue propuesta editorial conservadora; no oficializar sin decisión |
| TER-T59 | Terio con **Sentido especializado olfato** compra Sentido Agudo en ese olfato | Dos +1 equivalentes sobre mismo sentido/señal no se acumulan; usar efecto mayor. No se anula la opción de compra en un sentido distinto con anatomía compatible |
| TER-T60 | Terio de «Origen Renkaino» junto a otro Origen canónico | La 11.ª entrada Renkaino **no existe todavía en `main` ni Foundry**; sólo si se adoptara, sustituiría un Origen, no sumaría idiomas/Facetas/PD/PR |

**Pruebas adicionales pendientes B3/B4:** carga/caída y vuelo, falta de aire con nado, anatomía real frente a coste de beneficio, órganos prensiles frente a Cola/Miembros Extra, protección frente a Barrera Cinética/Piel Alterada y compatibilidad Variedad con el presupuesto excluyente.


## IX. Regresiones B3 de exploits y secuencias — TER-T61 a TER-T84

**Evidencia:** los 24 casos son criterios `DOC` y no ejecuciones de partida ni Foundry. Se añade un modelo auxiliar ad hoc con **22 comprobaciones `MOD`, 22 salidas coincidentes con expectativas de ese modelo**, incluidas tres respuestas que mantienen un vacío abierto; no confirma el comportamiento del motor ni ratifica opciones de diseño.

| ID | Intento, secuencia o frontera | Resultado esperado por el Manual / pendiente |
|---|---|---|
| TER-T61 | Elegir Principal Órgano prensil + Secundaria Arma natural y agregar Vuelo Dominante por anatomía aviana | **Inválido**: presupuesto **Principal+Secundaria O Dominante**. Vuelo no se suma como tercera capacidad |
| TER-T62 | Una Variedad sustituye Sentido especializado pero mantiene también el +1 PER antiguo | Reemplazar no añade tercera ni mantiene el efecto sustituido; con elección final A/B legítima |
| TER-T63 | Reemplaza Principal por Dominante, mantiene Secundaria como «beneficio residual» | Presupuesto final **Dominante+Secundaria ilegal**. La equivalencia de plaza al reemplazar es propuesta, no regla publicada |
| TER-T64 | Cambia una Principal por una Dominante y pretende además eliminar Secundaria para pasar de rama A a B | **ABIERTA B4** la semántica de reemplazar «una adaptación» y cruzar de rama; **no** ratificar transformación A→B de un solo paso sin regla nueva |
| TER-T65 | Terio de nivel superior solicita otra Principal y nueva Variedad con tercer beneficio | **No** crece el paquete automáticamente al subir de nivel; no crear segunda Ascendencia |
| TER-T66 | Terio Vuelo Dominante en aire recibe **Carga Pesada** al tomar un bulto | No puede mantener **vuelo racial sostenido** bajo Carga Pesada/Excesiva. **ABIERTA B5** pérdida de sustentación, instante y altura |
| TER-T67 | Terio con vuelo activo a 4 espacios de altura sufre interrupción y cae efectivamente 4 espacios | Si no hay rescate/mitigación, daño de caída **2×(4−1)=6** antes de reducciones pertinentes. Volar no da inmunidad |
| TER-T68 | Terio volador intenta no aterrizar al final del turno, y DJ le aplica regla de Hada | **No importar** obligación Hada de empezar/terminar apoyada: no figura en Dominante Terio. Mantener anatomía/medio viables |
| TER-T69 | `Morfología Alada` Sostenida sobre vuelo Dominante permite **MOV12 en aire** y segunda Acción | **No** crea doble reserva de Movimiento ni Acción/Reacción; Hechizo paga Maná/Acción y Sostenimiento propios |
| TER-T70 | Terio con alas funcionales pero presupuesto Principal+Secundaria sin Dominante declara vuelo permanente | La presencia anatómica no concede **vuelo sostenido gratuito**; solo si existe una fuente legal distinta |
| TER-T71 | Terio Locomoción Especializada (nado6) usa MOV6 nadando y después MOV6 caminando dentro del turno | **No sumar dos reservas**. Fórmula de conversión para **tramos de medios distintos** **ABIERTA B5** transversal Hada/Coralios |
| TER-T72 | Terio con branquias ilustradas sin Anfibio intenta respirar agua indefinidamente | **ABIERTA B4:** anatomía «funcional» escrita, pero falta adaptación Teria cuantificada de respiración; compra Anfibio (1 PR) es **contención propuesta**, no mandato canónico literal |
| TER-T73 | Terio con nado6 y `Anfibio` comprado legalmente por 1 PR usa nado y respira agua ordinaria | **Dos propiedades distintas** con costos legales, pero sin inmunidad a corriente, presión, tóxicos o deshidratación |
| TER-T74 | Terio Anfibio en agua contaminada/alta presión sostiene que puede respirar y moverse sin daño | Anfibio **no** elimina contaminación, presión, frío, corriente o pruebas de Natación; resolver exposición por reglas |
| TER-T75 | Elefantino con Órgano prensil sostiene escudo extra, dispara arma de dos manos y recarga con trompa | **No** concede Acción/ataque/escudo mecánico ni recarga adicionales; uso de objetos y anatomía con costes normales |
| TER-T76 | Terio con Órgano prensil compra `Cola Prensil` 1 PR y pide dos manipulaciones o un bloqueo adicional | No doble efecto equivalente ni Acción/Reacción extra; estudiar si ambas capacidades tienen usos realmente distintos antes de declarar compra redundante |
| TER-T77 | Terio con `Miembros Extra` 2 PR y `Miembro Efímero` con Maná intenta 3 ataques, 2 escudos y 2 Sostenimientos | Apéndices, Rasgos y Hechizos **no** conceden Acciones, Reacciones, ataques o Sostenimientos adicionales |
| TER-T78 | Felino con Arma natural (garras) y espada intenta infligir daño 3 de garras **más** daño del arma por una Acción | Arma natural **Daño3 Pen0** es arma disponible, no añadido o ataque extra; usar método/Habilidad y Acción correspondientes |
| TER-T79 | Quelonio con Protección Natural 1 y ataque físico Pen1, sin armadura | Protección efectiva **max(0,1−1)=0** ante ataque susceptible de Protección; no «Resistencia a todo» |
| TER-T80 | Quelonio con Prot Natural1 y armadura Prot3 frente a ataque Pen1 | Usar Prot **3, no 4**; efectiva **max(0,3−1)=2** en categoría aplicable |
| TER-T81 | Terio Sentido especializado (olfato) + `Sentido Agudo` olfato frente a mismo rastro | No sumar dos +1 **equivalentes** sobre la misma percepción; tampoco +1 Iniciativa o diagnóstico de sustancia |
| TER-T82 | Excavador usa Acción para atravesar pared rocosa de 1 espacio como si fuera `Fase Parcial` | Excavador crea paso en suelo **blando con tiempo**, sin MOV subterráneo ni atravesar roca por defecto; `Fase Parcial` requiere Hechizo separado, Maná7 y requisitos |
| TER-T83 | Terio trepador con Locomoción 6 (trepa) compra `Trepador Natural` y quiere 12 MOV o adherencia a pared lisa | No segunda reserva, ni adherencia a superficie sin agarre; evaluar por separado velocidad de medio y coste por espacio sin regalar equivalentes |
| TER-T84 | Terio de «Renkai» toma Origen cultural propuesto y otro Origen oficial, además de idioma regional | `Renkaino` **no está ratificado**; si alguna vez se aprueba, debe **sustituir**, no sumarse a otro Origen; no otorga adaptación, Fuente ni PD gratis |

**Total:** `TER-T01–TER-T60` + `TER-T61–TER-T84` = **84 criterios documentales, 0 ejecuciones Foundry/mesa**. `MOD`: **22 casos auxiliares**, 22/22 resultados previamente previstos; estados abiertos de **Variedad**, **branquias** y **pérdida de sustentación**, no decisiones nuevas. **B4/B5** deben comparar coste de respiración, reemplazo, anatomía/compra de Rasgos, secuencias de caída, carga y Movimiento mixto.
