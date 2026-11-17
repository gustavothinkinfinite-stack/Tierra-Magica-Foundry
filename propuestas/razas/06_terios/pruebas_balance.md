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

**Resultado:** 48 criterios de aceptación documentales; **playtest empírico no ejecutado**. No se identificó necesidad de Habilidad racial nueva. Se identificó una ampliación de Origen cultural, desarrollada en módulo separado para una decisión editorial posterior.
