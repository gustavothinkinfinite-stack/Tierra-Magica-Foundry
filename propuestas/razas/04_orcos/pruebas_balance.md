# Orcos — Auditoría mecánica y pruebas de balance v0.1
**Estado:** **64 criterios documentales** (40 previos + 24 B3), ningún caso ejecutado en mesa o Foundry. Modelo auxiliar de clasificación separado, no motor.
**Referencia:** Manual Maestro en `main`: creación racial v0.3, reglas transversales, Escala, Rasgos (costes), Acción/Movimiento/Reacción, ventajas y desventajas. Sin cambios a Foundry.

## A. Creación y cultura
| ID | Prueba | Resultado correcto |
|---|---|---|
| ORC-T01 | Crear Orco de nivel 1 | Ascendencia Orco, Escala Mediana, Movimiento 6 y los dos rasgos base; conserva 6 aumentos de Atributo, 25 PD y 3 PR |
| ORC-T02 | Marcar Común, Sangre, Gris o Bastión | Ninguna etiqueta concede bono, idioma, Habilidad, PR ni segunda Ascendencia |
| ORC-T03 | Orco con Origen Broncino | Común de Concordia y Broncino, Faceta correspondiente; sin idioma racial automático |
| ORC-T04 | Orco sin profesión marcial | Legal; no recibe Intimidación, armas o furia de forma innata |
| ORC-T05 | Orco creyente de Varkor | Religión no da Vínculo Divino gratis; requiere 2 PR para Rasgo Vínculo Divino con juramento |
| ORC-T06 | Orco de Sangre sin Rasgo sobrenatural | Legal; la genealogía sola no concede detección, magia ni poderes |
| ORC-T07 | Orco de Sangre que compra Afinidad Sobrenatural | Gasta 1 PR; +1 a PER sólo ante manifestaciones de categoría estrecha directamente perceptibles; no leer intenciones |
| ORC-T08 | Orco de Bastión que compra Masivo | Gasta 3 PR, +8 Vida. No obtiene +FUE, Alcance, Escala, Protección ni ataques extras |
| ORC-T09 | Orco de Bastión con Corpulento | 2 PR, +4 Vida; no se suma con Masivo si lo recibe después |
| ORC-T10 | Mezclar Sangre y Gris o Común y Bastión | Etiquetas culturales pueden coexistir; sólo un paquete racial, sin apilar poderes |

## B. Complexión Orca — fuerza efectiva limitada
| ID | Prueba | Resultado correcto |
|---|---|---|
| ORC-T11 | Alzar una viga inmóvil durante rescate | +1 FUE efectiva si se resuelve como levantar objeto inerte; no duplica Acción |
| ORC-T12 | Arrastrar una caja metálica pesada | +1 FUE efectiva sólo para ese esfuerzo contra objeto inerte |
| ORC-T13 | Portar equipaje personal | +1 FUE efectiva para Carga, compatible con adjudicación narrativa sin fórmula universal de peso |
| ORC-T14 | Golpear con martillo | Ningún +1 al Ataque o Daño por Complexión Orca |
| ORC-T15 | Empujar enemigo para retirarlo de un paso | No +1, aunque utilice FUE: la regla excluye Empujar contra criaturas |
| ORC-T16 | Derribar enemigo con hombro | No +1, aunque la descripción narre fuerza bruta |
| ORC-T17 | Agarrar o mantener una Presa | No +1, no cambia DF de Presa |
| ORC-T18 | Romper una puerta de metal inmóvil | Puede activar +1 para fuerza bruta contra objeto inerte; no implica éxito automático, inmunidad de la puerta o daño extra |
| ORC-T19 | Arrebatar un arma a criatura | No +1 de Complexión por tratarse de Desarmar/interacción corporal con criatura; impedir atajo de «objeto inerte» cuando está activamente sostenido |
| ORC-T20 | Responder a escombros que caen sobre el cuerpo | No Defensa, Protección, Vida ni resistencia a daño general por Complexión; puede sostener un apoyo si realmente se trata de levantar/objeto |

## C. Voluntad del Colmillo — momento, escenas y causas
| ID | Prueba | Resultado correcto |
|---|---|---|
| ORC-T21 | Test con Desventaja por dolor exclusivamente | Antes de tirar puede gastar 1 uso de la Escena para ignorar esa fuente durante esa prueba |
| ORC-T22 | Test con Desventaja por miedo exclusivamente | Igual; la condición de Miedo continúa |
| ORC-T23 | Test con Desventaja por agotamiento físico exclusivamente | Igual; Fatiga y reducción de Movimiento continúan |
| ORC-T24 | Declaración después de ver resultado | Prohibido: debe activarse antes de la prueba |
| ORC-T25 | Segundo intento en la misma Escena | No disponible, aunque cambie la fuente de Desventaja |
| ORC-T26 | Desventaja únicamente por niebla, oscuridad o terreno | No elegible; no corresponde al conjunto dolor/miedo/agotamiento físico |
| ORC-T27 | Dolor y niebla simultáneos, ambos causan Desventaja independiente | **No cumple el requisito «exclusivamente» de Voluntad**, por existir causa ajena; no activar como si anulase todas las fuentes. La niebla nunca se elimina por Voluntad |
| ORC-T28 | Dolor y miedo como dos fuentes elegibles e independientes | Puede ignorarse **una fuente** antes de la prueba según lectura literal conservadora; persiste Desventaja por la otra (las fuentes no apilan dados). **Pendiente B3:** si debe consumirse el uso cuando no cambia la tirada |
| ORC-T29 | Test sin Desventaja actual | No activa el rasgo para generar Ventaja, +1, repetir tirada ni ignorar condiciones futuras |
| ORC-T30 | Nueva Escena y personaje sigue dolorido | Se recupera el uso por Escena, pero la condición persiste y sigue sometido a límites de activación |

## D. Comparaciones y exploits transversales

**Con Humanos:** Don sin Forma otorga un Rasgo elegible adicional; el Orco obtiene estabilidad al manejar objetos inertes y un rescate puntual frente a Desventaja restringida. No son equivalentes numéricos simples; contar uso real por escena.

**Con Enanos:** Cuerpo de Piedra trata al Enano como Mediano para Carga y defensa frente a desplazamientos determinados; Complexión Orca modifica FUE efectiva para Carga y objetos, pero no convierte Escala, tamaño ni fuerza en maniobras. No conceder bonificación enana a un Orco por equiparse como tal.

**Con Bugbears:** la mejora de Escala efectiva Bugbear para Carga y objetos no es el +1 FUE efectivo de Orcos; no mezclar sin una regla expresa sobre paquetes mixtos. La compatibilidad reproductiva entre pueblos continúa abierta en canon.

**Con cultos:** un Vínculo Divino de Varkor, Ilyr u otro requiere costes; el Orco no obtiene Fuentes por sangre o cultura. Los «juramentos» sociales del expediente son narrativos salvo Rasgo Vínculo formalmente adquirido.

**Con acciones:** levantar un gran objeto puede requerir Acción, herramientas y ayuda. Complexión Orca no permite cargar una piedra gigante como arma sin adaptar Escala ni materiales. Voluntad no concede Acción/Reacción.

**Con heridas/Fatiga:** ignorar temporalmente una fuente de Desventaja no cura, no retira Trauma o estado Derribado ni convierte Fatiga en un recurso gratuito de resistencia.

**Con rasgos generales:** Corpulento/Masivo son mutualmente no acumulables; Afinidad sobrenatural nunca se usa para detectar toda intención hostil, adivinar un juramento incumplido o localizar automáticamente a Varkor. Tampoco el coste PR se reduce por sangre, genealogía o culto.

## E. Guion de simulación de partida recomendado
1. Crear cuatro personajes Orcos con los mismos presupuestos pero identidad cultural diferente y una quinta persona de otra ascendencia para cotejar igualdad.
2. Escena de carga: una grúa falla, caen vigas y se exige distinguir levantar un objeto de resistir daño o empujar una criatura.
3. Escena diplomática: Orco de Sangre sin Rasgo debe negociar juramento sin lectura de mentiras; otro con Afinidad sólo identifica una manifestación sobrenatural visible y estrecha.
4. Escena de miedo: desencadenar Desventaja por una sola fuente y luego por dos fuentes simultáneas; anotar el momento de activación y agotamiento por Escena.
5. Escena de fatiga: continuar marcha difícil con reducción real de Movimiento; Voluntad no restaura velocidad.
6. Escena marcial: intento de Agarrar/Empujar/Derribar sin el +1 de Complexión.
7. Escena de disciplina cívica: una comunidad Gris busca evacuación antes de combate; no existe un bono de Persuasión por su cultura.
8. Comparación de frecuencia: 8–12 escenas combinadas de exploración, social y combate con Orcos, Humanos y Enanos; registrar usos de rasgos, pérdidas de oportunidad, decisiones de DJ.

## F. Hallazgos y dictamen
- **No falta una Habilidad racial para crear un Orco jugable.** Inventar «Furia +Daño» o «Honor +Intimidación» sería un beneficio no costeado y contrario al principio de no atribuir moral o formación.
- **Punto que requiere decisión editorial si se desea precisión total:** resolución exacta de dos causas simultáneas de Desventaja permitidas por Voluntad. Propuesta conservadora arriba, para evitar conversión indiscriminada de Desventaja en normalidad.
- **Punto de adjudicación universal:** capacidad de Carga no usa peso cuantificado en el núcleo; Complexión exige mirar la escala física de objeto, método y ayuda. No crear un sistema de kilogramos sólo para Orcos.
- **Prueba de balance real:** **NO EJECUTADA**. Los 30 criterios se basan en inspección de reglas y deben verificarse en mesa o en pruebas automatizables antes de ratificación.

**Estado técnico:** matriz de 30 casos preparada, sin cambio de paquete ni de Foundry. Se puede cerrar la versión editorial propuesta y avanzar a Goblinoides.

## G. Regresiones adicionales B2 — Voluntad, fuentes y equipos (ORC-T31–ORC-T40)

**Casos documentales, no pruebas reales.** El resultado esperado sólo amplía cobertura de lectura; la simultaneidad de Ventaja/Desventaja requiere control B3.

| ID | Situación | Resultado esperado / cuestión abierta |
|---|---|---|
| ORC-T31 | Dolor y miedo independientes producen Desventaja; Voluntad elige sólo dolor | Permanece Desventaja por miedo; no pasar automáticamente de 3d10 bajos a 2d10, y mucho menos a Ventaja. Resolver consumo del uso en B3 |
| ORC-T32 | Dolor más terreno inestable provocan dos Desventajas | El requisito «exclusivamente por dolor, miedo o agotamiento» no se cumple: terreno es ajeno. El rasgo no borra esa fuente |
| ORC-T33 | Dolor produce Desventaja, Ayuda válida aporta Ventaja | En §2 Ventaja y Desventaja se cancelan. Verificar orden de elegibilidad de Voluntad **antes de tirar**, sin regalar Ventaja al suprimir una Desventaja ya cancelada; pendiente B3 |
| ORC-T34 | Dos fuentes de Ventaja y miedo provocan una Desventaja | Ventajas no se acumulan; tras cancelación se aplican 2d10. No gastar Voluntad para crear segundo estado de Ventaja sin regla expresa |
| ORC-T35 | Orco Fatigado por esfuerzo prolongado usa Voluntad una vez | Si prueba tiene Desventaja sólo por agotamiento físico, ignora esa fuente **en esa prueba**. No cambia estado Fatigado |
| ORC-T36 | Orco Exhausto con MOV normal 6 reducido a 4 | Voluntad no restaura los 2 puntos; ninguna Acción de movimiento adicional |
| ORC-T37 | Orco Colapsado intenta tarea físicamente imposible | Voluntad no vuelve posible un esfuerzo prohibido por estado; primero se comprueba viabilidad |
| ORC-T38 | Supresor del Dolor elimina Desventaja por dolor antes de la prueba | No se duplica con Voluntad para obtener Ventaja; verificar si queda otra fuente válida y sus requisitos |
| ORC-T39 | Orco quiere desmontar una viga anclada con herramientas o arrastrar caja inerte | +1 FUE efectiva sólo en esfuerzo pertinente; no genera herramientas, tiempo gratis, Habilidad o éxito sin prueba cuando sea necesaria |
| ORC-T40 | Orco usa una correa para arrancar objeto que otra criatura sujeta y se opone | Interacción activa con criatura / Desarmar no hereda +1 de Complexión por declarar al objeto «inerte» |


## H. Regresiones B3 de secuencia — ORC-T41 a ORC-T64

**Clasificación:** estos 24 casos son **DOC (criterios documentales, no ejecutados en Foundry ni en mesa)**. Un **modelo auxiliar** independiente, `auditorias/modelo_auxiliar_b3_orcos.js`, comprobó **20 fixtures y 20 coincidencias con expectativas de clasificación**, incluidas **6 salidas marcadas como pendientes** por cancelación/consumo; no decidió esas lagunas. No equiparar la simulación con pruebas del motor.

| ID | Cadena de explotación / precondiciones | Resultado esperado de canon o incertidumbre abierta |
|---|---|---|
| **ORC-T41** | Orco tiene Desventaja **únicamente por dolor**; declara Voluntad **antes** de lanzar la prueba | Elegible para ignorar la fuente **en esta prueba** una vez por Escena. Tirada normal si no hay otra fuente/ventaja; la lesión persiste |
| **ORC-T42** | Desventaja por **miedo** solo, con escena en curso y uso disponible | Mismo alcance: no borra miedo, no suma Defensa Mental, no cura ni concede Ventaja |
| **ORC-T43** | **Fatigado** hace esfuerzo prolongado que realmente provoca Desventaja por **agotamiento físico** | Puede ignorar esa fuente **sólo en esa prueba**; la Fatiga y recursos reales persisten |
| **ORC-T44** | Jugador espera resultado 1,1 conservado y activa Voluntad para repetir | No: declaración **antes de tirar**, no reroll retroactivo ni Hazaña/Pifia anulada |
| **ORC-T45** | Ya gastó Voluntad, recibe otro miedo en la **misma Escena** | No segundo uso; recupera disponibilidad al comenzar **otra Escena**, sin sanar condiciones |
| **ORC-T46** | Desventaja por **dolor y miedo independientes**, ambos elegibles; ignora dolor | Queda miedo y **persiste Desventaja**. **ABIERTO:** permitir/consumir uso que no mejora dados; no inventar devolución |
| **ORC-T47** | Desventaja por **miedo y agotamiento físico independientes** | Ignorar una fuente deja la otra; no 4d10 de Desventaja ni tirada normal por borrar ambas |
| **ORC-T48** | Desventaja por **dolor y niebla** (dos causas reales) | No cumple **«exclusivamente»**; Voluntad no se declara legalmente para borrar niebla, ni se activará tras tirar |
| **ORC-T49** | Desventaja por dolor; **Ayuda válida** concede Ventaja antes de resolver | §2 cancela una Ventaja con una Desventaja. **ABIERTO B4/B5:** elegibilidad/consumo de Voluntad en pre-cancelación. No convertirla en **Ventaja residual gratuita** mediante orden elegido por jugador |
| **ORC-T50** | Dos fuentes independientes de Ventaja y miedo dan Desventaja | Ventajas no apilan entre sí. Una Ventaja cancela una Desventaja: **2d10 normal** por regla básica. Voluntad no genera un tercer estado de Ventaja |
| **ORC-T51** | Dolor+miedo y Ayuda válida; jugador ignora dolor y reclama Ventaja «sobrante» | **ABIERTO:** orden de cancelación e imputación de consumo; al menos miedo subsiste como Desventaja de fuente antes de cancelación. Prohibido doble descuento y bonificación no autorizada |
| **ORC-T52** | `Supresor del Dolor` elimina la **única** fuente de Desventaja antes de prueba; se intenta Voluntad después | Sin Desventaja causal, no activación para generar Ventaja; Supresor no cura lesión ni concede segundo uso |
| **ORC-T53** | `Tónico de Vigor` da Ventaja en VIG por esfuerzo prolongado, Fatigado da Desventaja | Se cancela Ventaja/Desventaja según §2. Interacción con Voluntad se registra como misma **laguna de orden** que Ayuda, no se obtiene beneficio extra sin regla |
| **ORC-T54** | `Valor Inspirado` protege contra miedo sobrenatural y jugador trata +2 Defensa Mental como Ventaja/Desventaja en propia prueba | No: +2 **Defensa Mental** por Hechizo específico no equivale a Ventaja en todas las pruebas ni permite recargar Voluntad |
| **ORC-T55** | Orco **Exhausto** MOV6→MOV4 ignora una Desventaja válida por Voluntad | MOV **4** sigue; Fatiga no desaparece y no se generan Movimiento, Acción o Reacción extras |
| **ORC-T56** | Orco **Colapsado** intenta acción física significativa imposible, alega «Voluntad» para poder tirar | No hay prueba válida; incapacidad del estado primero. Voluntad no concede recuperación ni evade límites de Colapsado |
| **ORC-T57** | Orco usa fuerza contra **espada sostenida activamente por adversario**; llama al arma «inerte» | No +1 FUE de Complexión: es **Desarmar/interacción opuesta con criatura**, exclusión escrita |
| **ORC-T58** | Adversario suelta espada; queda en suelo sin oposición y Orco la levanta de una carga verdaderamente exigente | +1 FUE efectiva **sólo si** levantar objeto inerte requiere FUE. No altera Acción/acceso, no garantiza que exista tirada si es trivial |
| **ORC-T59** | Orco rompe puerta mediante **Ataque de arma** y transforma +1 fuerza en Ataque/Daño, luego repite como FUE+Atletismo | No +1 al Ataque/Daño. Una prueba distinta de **fuerza bruta contra objeto inerte** puede tener +1 si método/tiempo adecuados; no da tirada adicional gratis ni repetición sin cambio significativo |
| **ORC-T60** | Arrastra **criatura consciente que se opone** con cuerda y reclama «arrastrar» como objeto inerte | No +1 para Agarrar/Empujar/arrastre opuesto de criatura. **ABIERTO en borde**: cuerpo inconsciente ya sin oposición tratado como carga inerte según escena, sin curación ni acción adicional |
| **ORC-T61** | Compra `Masivo` 3 PR y también intenta `Corpulento` para +12 Vida por ser Bastión | No apila: se utiliza sólo **+8 Vida máximo** por mayor Rasgo y compras dentro del presupuesto real; no obtiene Escala Grande ni FUE global |
| **ORC-T62** | Orcos de Sangre quieren `Vínculo Divino` de Varkor 2 PR gratis por herencia, más `Afinidad Sobrenatural` y hechizos | Todas las compras requieren PR/PD/Maná aplicables; Vínculo permite Fuente con juramento, **no** concede Disciplina, Habilidad ni Hechizo gratis |
| **ORC-T63** | Orco en 0 Vida/Incapacitado pretende usar Voluntad como Reacción para ignorar daño, trauma o recuperar Acción | Voluntad modifica **una prueba posible** predeclarada, no una Reacción, un salvamento universal gratis ni curación de 0 Vida |
| **ORC-T64** | Voluntad ignoró miedo en una Escena; en la siguiente prueba de otra Escena recupera uso, pero mantiene miedo | Recarga 1/Escena **sin** curar la condición; cada nueva prueba requiere Desventaja elegible actual y declaración antes de tirar |

**Totales de cobertura:** 40 anteriores `ORC-T01–ORC-T40` + **24 `ORC-T41–ORC-T64`** = **64 criterios documentales; ninguno ejecutado en Foundry ni mesa**. El modelo auxiliar (`MOD`) tiene 20 escenarios de clasificación con **20 coincidencias**, pero **seis resultados describen de forma deliberada un asunto abierto**; no cuentan como seis decisiones mecánicas resueltas. **B4/B5:** cierre del orden de cancelación de fuentes/ventajas, gasto de uso ineficaz, clasificación del arrastre sin oposición y comparación de efectividad del poder 1/Escena.
