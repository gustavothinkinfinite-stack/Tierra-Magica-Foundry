# Feéricos — Auditoría técnica y batería de aceptación v0.1
**Estado:** **76 criterios documentales** (36 iniciales + 16 B2 + 24 B3), **0 ejecutados en Foundry o mesa**.
**Fuente operativa:** `main:docs/Tierra_Magica_Manual_Maestro.md`, creación racial v0.3, reglas transversales, Acción/Movimiento/Reacción y Escala; fragmentos comparados con Eïra/Primera Semilla.

## A. Creación, descriptor y compatibilidad general
| Caso | Escenario | Resultado esperado |
|---|---|---|
| FEE-T01 | Crear Hada | Ascendencia Hada, Escala Pequeña, Movimiento tierra 5/aéreo inicial 6, Naturaleza Feérica, sin gastar 25 PD ni 3 PR |
| FEE-T02 | Crear Sátiro | Ascendencia Sátiro, Escala Mediana, Movimiento 6, Paso de Cabra, Cuernos Daño 3/Pen 0, descriptor Feérico |
| FEE-T03 | Crear Dríade | Ascendencia Dríade, Escala Mediana, Movimiento 6, Vínculo Arbóreo/Enraizar, descriptor Feérico |
| FEE-T04 | Crear Silfo | Ascendencia Silfo, Escala Mediana, Movimiento 6, Cuerpo del Viento, descriptor Feérico |
| FEE-T05 | Naturaleza Feérica sin conjuro específico | No concede Maná, Fuente, Disciplina, Hechizo, Vínculo Divino, resistencia mágica ni defensa adicional |
| FEE-T06 | Hechizo que reconoce explícitamente «criatura Feérica» | Aplicar la condición escrita en ese hechizo, no bonus o vulnerabilidad universal |
| FEE-T07 | Hada devota de Eïra | Culto no crea Vínculo Divino ni curación gratis, requiere Rasgo y gastos legales |
| FEE-T08 | PJ que intenta sumar paquete Sátiro+Hada | No son dos opciones acumulables; exactamente una Ascendencia |
| FEE-T09 | Un Silfo adquiere Afinidad Sobrenatural | Coste y límites ordinarios, sin duplicar efecto racial equivalente |
| FEE-T10 | Linaje feérico no incluido (Trent, Náyade, Nereida) | No existe paquete de PJ completo en v0.3; requeriría desarrollo separado, no copiar gratis capacidades de Dríade |

## B. Hada — movilidad apoyada
| Caso | Escenario | Resultado esperado |
|---|---|---|
| FEE-T11 | Hada empieza turno posada, cruza hueco, termina en otra baranda firme | Movimiento aéreo hasta 6, válido con apoyo al inicio y final |
| FEE-T12 | Hada intenta terminar suspendida en vacío | Inválido; debe terminar en superficie apoyada; aplicar adjudicación ordinaria sin otorgar flotación |
| FEE-T13 | Hada comienza turno ya cayendo sin apoyo | El paquete no autoriza iniciar vuelo racial desde suspensión libre, porque exige apoyo al comenzar |
| FEE-T14 | Hada de Carga Pesada | No puede utilizar Movimiento aéreo, conserva Movimiento terrestre legal según condiciones |
| FEE-T15 | Hada de Carga Excesiva | Tampoco puede usar Movimiento aéreo, independientemente de fuerza narrativa |
| FEE-T16 | Hada utiliza Movimiento aéreo y luego ataca | Ataque consume Acción ordinaria; no hay ataque adicional por volar |
| FEE-T17 | Hada atraviesa muro sólido durante vuelo | Vuelo no otorga intangibilidad, línea de efecto ni paso a través de barreras |
| FEE-T18 | Hada se posa en hoja frágil incapaz de sostenerla | Soporte insuficiente: no puede finalizar turno allí sólo por ficción de hadas diminutas |
| FEE-T19 | Hada compra Vuelo Natural (4 PR) | No apilar vuelo sostenido ni suprimir el requisito de apoyo salvo que el Rasgo se adquiera legalmente, tenga compatibilidad expresa y resuelva la mejora; los 3 PR iniciales no alcanzan para 4 PR |

## C. Sátiro — terreno y cuernos
| Caso | Escenario | Resultado esperado |
|---|---|---|
| FEE-T20 | Sendero con raíces transitables | Paso de Cabra elimina el coste extra provocado por raíces |
| FEE-T21 | Ladera natural pronunciada pero físicamente transitable | Paso de Cabra elimina penalización de coste causada por esa pendiente |
| FEE-T22 | Muro vertical, sin apoyos | Paso de Cabra no concede trepa vertical ni inmunidad a Atletismo necesario |
| FEE-T23 | Terreno difícil por aceite industrial o escombros mecánicos | No está dentro de las causas naturales enumeradas; no ignorar automáticamente |
| FEE-T24 | Ataque de cuernos y ataque con espada en una Acción | Cuernos son un arma disponible, no un segundo ataque gratuito ni daño sumado |
| FEE-T25 | Cuernos para Embestida | Sólo Daño 3/Pen 0 con reglas ordinarias de ataques; sin Empujar gratis o daño de carrera inherente |

## D. Dríade — vínculo localizado y enraizar
| Caso | Escenario | Resultado esperado |
|---|---|---|
| FEE-T26 | Tocar árbol perteneciente al vínculo y enfermo | Conoce estado general «enfermo»; no patógeno, historia, responsable ni solución |
| FEE-T27 | Árbol del vínculo a 2 kilómetros, sin contacto | No se activa Vínculo Arbóreo; ausencia de percepción y diálogo remoto |
| FEE-T28 | Contacto con árbol sin vínculo | No obtiene información racial por mera cercanía biológica |
| FEE-T29 | Enraizar en suelo apropiado | Consume Acción; mientras enraizada +1 categoría efectiva de Escala sólo para resistir Empujar/Derribar/desplazamiento físico impuesto |
| FEE-T30 | Enraizar sin suelo apropiado o en vuelo | Inviable; no crea suelo ni anclaje sobrenatural automático |
| FEE-T31 | Enraizada recibe ataque normal | No recibe +1 Defensa, Protección, Vida ni reducción de daño; la escala efectiva es situacional |
| FEE-T32 | Liberarse de Enraizar | Cuesta 1 punto de Movimiento; no Acción adicional ni teletransporte |
| FEE-T33 | Árbol vinculado destruido irreversible | El canon NO define muerte automática o procedimiento nuevo. Propuesta «Continuidad de la Raíz» en expediente aplica sólo si el DJ usa esa regla no canónica; sin ella resolver por reglas generales |
| FEE-T34 | Árbol de vínculo muere y se realiza ritual propuesto | Siete días de cuidado restablecen nuevo anclaje, sin recuperar Vida/Maná, sin rangos extra, sin sumar árboles; esto es **test de propuesta**, no de canon vigente |

## E. Silfo — viento ordinario
| Caso | Escenario | Resultado esperado |
|---|---|---|
| FEE-T35 | Desplazamiento dificultado sólo por viento mundano ordinario | Ignora esa penalización; ante Empujar por ese viento gana +1 categoría efectiva para resistencia, nunca defensa general |
| FEE-T36 | Tormenta mágica, lluvia torrencial, lanzamiento de hechizo o intento de vuelo | No aplica inmunidad ni vuelo sostenido; Cuerpo del Viento no altera magia ni daño general |

## F. Compatibilidad cruzada y explotación secuencial
1. **Enraizar y Movimiento:** después de gastar Acción para enraizar no se puede duplicar Acción usando un Trasfondo o rito. Liberarse cuesta Movimiento y las maniobras ordinarias aún requieren Acciones.
2. **Escala de Dríade y Silfo:** son categorías efectivas situacionales que no cambian espacio, equipo, ataque ni daños; no acumular varias mejoras equivalentes salvo permiso expreso.
3. **Vuelo Hada vs. Terio volador:** Hada tiene aéreo condicionado al apoyo de inicio y final; Terio con Vuelo Dominante tiene vuelo sostenido normal pero cede todas las demás adaptaciones. No copiar ventajas cruzadas.
4. **Sátiro vs. Terio con Movilidad Adaptada:** una es lista concreta de causas naturales; la otra exige una causa muy concreta elegida en ficha. Comparar beneficios reales, no etiquetas «afinidad naturaleza».
5. **Dríade vs. Verdante:** ambos pueden Enraizar en términos similares, pero Vínculo Arbóreo es distinto de Sustento Vegetal; no otorgar fotosíntesis o provisiones gratuitas a Dríade.
6. **Silfo vs. Elemental de Aire:** un Silfo es de Hoja/Eïra y un Elemental de Chispa/Khorun; no asignar inmunidad al aire tóxico, cuerpo gaseoso o control de vientos gratis.
7. **Otras fuentes de viento:** un efecto de magia que cree viento mundano ordinario debe resolverse según redacción del efecto; Cuerpo del Viento no cancela un hechizo automáticamente. Registrar si el DJ considera la penalización solo viento o magia adicional.
8. **Cuerpo/armas:** los Cuernos no crean Acción, como tampoco los apéndices de Terios; equipamiento conserva límites físicos.
9. **Carga:** Hada bajo Carga Pesada/Excesiva no vuela; el control no se anula por poseer Rasgo de Resistencia Ambiental u otra fisiología.
10. **Fe:** cualquier rama puede elegir Origen, Trasfondo o culto libremente; ninguna profesión o iglesia concede Habilidades/PD/PR fuera del presupuesto.

## G. Guion de partida para validar el paquete
- Cuatro PJs de diferentes familias, con los mismos presupuestos y Orígenes variados; comparar ventajas contextuales.
- Prueba de movimiento: 5 turnos Hada con plataformas disponibles y 5 turnos sin apoyos válidos, verificando Inicio/Fin de turno y caídas.
- Prueba de terreno Sátiro en raíces, pendientes, muro vertical, aceite industrial y escaleras.
- Prueba de Dríade con árbol del vínculo sano/enfermo, con otro árbol vecino, a distancia y bajo ataque durante Enraizar.
- Prueba de Silfo en viento ordinario, vendaval de intensidad extraordinaria y fenómeno mágico, con ataques y Empujar.
- Dos sesiones sociales sin habilidades raciales útiles, verificando que las costumbres no generen bonificaciones escondidas.
- Comparación con Terios, Verdantes y Elementales para detectar «préstamo» indebido de habilidades y fisiologías.
- Revisión de la regla propuesta Continuidad de la Raíz en tres escenarios narrativos distintos, sin atribuirle obligatoriedad al sistema actual.

## Dictamen de esta batería
**36 casos documentales, no ejecutados empíricamente.** Los cuatro paquetes vigentes pueden utilizarse sin inventar Habilidades nuevas. Riesgos principales: vuelo Hada usado como suspensión indefinida, Paso de Cabra convertido en inmunidad a terreno, contacto arbóreo interpretado como radar, Cuerpo del Viento convertido en vuelo y Naturaleza Feérica como Fuente mágica gratuita.

La nueva regla opcional «Continuidad de la Raíz» debe revisarse de forma aislada antes de cualquier inclusión en el Manual Maestro.

## H. Regresiones B2 — FEE-T37 a FEE-T52

**Casos de aceptación documentales, no ejecuciones empíricas.** Los resultados `PENDIENTE B3` señalan una ambigüedad que no se puede resolver presentando una invención como regla vigente.

| ID | Escenario | Resultado esperado / límite |
|---|---|---|
| FEE-T37 | Hada inicia apoyada, vuela 4 espacios y quiere caminar otros 5 con «segunda reserva» | El sistema concede un Movimiento por turno, no 6 de vuelo **más** 5 de suelo gratuitos. **Pendiente B3** definir conversión exacta de tramos mixtos si existe una diferencia de velocidades |
| FEE-T38 | Hada comienza apoyada y termina en suelo tras 6 espacios aéreos; intenta otra Acción por «aterrizar» | Si alcanza superficie apta, cumple apoyo; no adquiere segunda Acción ni Movimiento por el aterrizaje |
| FEE-T39 | Hada es empujada de una plataforma **entre turnos** por efecto válido | El requisito de apoyo al iniciar el próximo turno **no concede vuelo libre** desde el aire; resolver desplazamiento/caída y ventana de Reacción aplicable sin inventar suspensión |
| FEE-T40 | Hada cae 3 espacios, consciente y con sitio para aterrizaje | Daño base antes de mitigaciones **4**; `Caída controlada` AGI+Acrobacia puede reducir espacios efectivos según DF y resultado, si procede; las alas no dan inmunidad |
| FEE-T41 | Hada Exhausta o con Carga Pesada quiere cruzar un vacío | Carga Pesada/Excesiva bloquea vuelo aéreo; Exhausto reduce Movimiento por reglas generales. **Pendiente B3** mezcla de velocidades y Fatiga |
| FEE-T42 | Sátiro cruza 3 espacios con raíces naturales transitables que ordinariamente costarían 2 cada uno | Paso de Cabra evita **ese sobrecoste concreto**: coste básico **3 puntos** si ninguna causa independiente de terreno difícil subsiste |
| FEE-T43 | Sátiro en pendiente natural peligrosa usa Paso de Cabra para negar toda prueba de equilibrio | No: anula un coste de desplazamiento especificado, no vuelve seguro ni posible lo que requiere Acrobacia/Atletismo |
| FEE-T44 | Sátiro ataca con Cuernos y simultáneamente pretende Embestida con Empujar | Cuernos Daño 3/Pen 0 son arma, no Acción de Empujar gratuita, segundo ataque ni bonificación de carrera |
| FEE-T45 | Dríade Enraizar frente a Empujar con atacante Pequeño y margen Claro (2 espacios) | Resistente cuenta como **Grande efectiva** si su Escala real es Mediana, para ese componente; un atacante Pequeño está dos categorías por debajo y **no desplaza con fuerza ordinaria** sin palanca/capacidad. No se eleva Defensa de Maniobra |
| FEE-T46 | Dríade ya enraizada sufre intento ordinario de Derribar | El efecto de Escala es canónico, pero la maniobra de Derribar no convierte Escala en bono de Defensa numérica; la viabilidad concreta requiere adjudicación, **pendiente B3/B4** |
| FEE-T47 | Dríade enraizada quiere moverse sin gastar 1 Movimiento de liberación | El canon exige **1 Movimiento** para liberarse. La entrada Dríade no incluye la frase expresa «permanece inmóvil» de Verdante; **pendiente B3** la pérdida de anclaje por desplazamiento o suelo destruido |
| FEE-T48 | Se destruye el único árbol de vínculo y el jugador propone que Dríade muera instantáneamente | No existe tal condición de muerte en `main`; `Continuidad de la Raíz` es módulo propuesto **no automático** |
| FEE-T49 | La mesa ensaya `Continuidad de la Raíz` durante viaje con Descanso Completo | Los **7 días** son plazo **nuevo opcional**, no regla canónica; el módulo no regala Vida/Maná, Acción ni exime del Descanso. Efectos de interrupción requieren B3 |
| FEE-T50 | Silfo camina frente a ráfagas de viento **mundano ordinario** que son la única causa del sobrecoste | Ignora esa penalización concreta al **desplazamiento**; otras causas (hielo, escombros, Exhausto) no desaparecen |
| FEE-T51 | Un hechizo produce **viento físico** que intenta Empujar al Silfo | Primera cláusula sólo cubre viento **mundano ordinario**; la segunda dice Empujar «causado por viento», sin reiterar «mundano». **Pendiente B3** determinar si efecto aplica Escala y es propiamente empuje de viento; no inmunidad al hechizo ni +Defensa |
| FEE-T52 | `Martillo Cinético` desplaza al Silfo como impulso mágico, sin describir viento | No se convierte en Empujar **causado por viento** por su mera naturaleza de desplazamiento. No gana Escala efectiva por Cuerpo del Viento para un golpe cinético no ventoso |

**Pendientes prioritarios:** B3 debe reproducir alternancia suelo/aire, caída entre turnos, interrupción por Reacción, enraizamiento/desanclaje, viento mágico con desplazamiento definido y el plazo de siete días; B4 debe medir importancia real de Hada/Sátiro/Dríade/Silfo frente a otras once familias.


## H. Regresiones B3 de secuencias y exploits — FEE-T53 a FEE-T76

**Evidencia de esta ronda:** 24 casos nuevos **DOC** por lectura, **no ejecutados en el motor Foundry ni en mesa**. Un modelo auxiliar separado comprueba 24 condiciones abstractas con expectativas coincidentes, incluidas **2 salidas deliberadamente abiertas**; no decide el orden de turnos, causalidad del viento, ni qué apoyo sostiene el peso real.

| ID | Cadena adversarial / instante | Resultado esperado o vacío explícito |
|---|---|---|
| FEE-T53 | Hada comienza apoyada, vuela hasta plataforma apta y quiere sumar **5 MOV terrestres** completos | No dos reservas (aire 6 + tierra 5); **conversión exacta de tramos mixtos ABIERTA B5**, no adoptar FEE-PB2-01 sin aprobación |
| FEE-T54 | Hada acaba turno en aire y se declara «flotando» porque no gastó MOV | **Inválido**: necesita apoyo al **inicio y fin de cada turno**; no suspensión gratuita |
| FEE-T55 | Hada inicia turno ya cayendo tras un Empujar entre turnos e intenta activar vuelo racial sin apoyo | Falta apoyo inicial; no activa vuelo como rescate automático. **ABIERTA B5** secuencia de caída y Reacción/posición, sin daño ni caída ficticios |
| FEE-T56 | Hada se posa sobre hoja incapaz de soportarla como «superficie» al final | No satisface apoyo físicamente apto; exige superficie capaz de sostener o permitir posarse realmente, con adjudicación física |
| FEE-T57 | Hada con Carga Pesada intenta una travesía aérea de 2 espacios y soltar carga a mitad | Con carga Pesada/Excesiva **no puede usar MOV aéreo**; soltarse de objeto no crea vuelo retroactivo. **ABIERTA** ventana exacta si carga cambia en medio de turno |
| FEE-T58 | Hada Exhausta usa MOV terrestre5 y aéreo6 íntegros por turnos separados en uno solo | Exhausto reduce Movimiento **2** (terrestre 5→3, aéreo inicial6→4 si modo habilitado), no duplica reservas; mezcla B5 |
| FEE-T59 | Hada cae efectivamente **3 espacios** en terreno normal sin mitigación | Caída base **2×(3−1)=4**. Si consciente y apta, `AGI+Acrobacia` y DF de caída aplican; alas no inmunizan |
| FEE-T60 | Sátiro atraviesa raíces y roca natural transitables, luego **hielo** independiente | Paso de Cabra elimina sólo sobrecoste de las causas listadas; hielo por sí mismo no queda cancelado |
| FEE-T61 | Sátiro atraviesa aceite industrial y declara Paso de Cabra por tener pezuñas | No cubre aceite u obstáculo manufacturado; otras capacidades/terreno siguen |
| FEE-T62 | Sátiro escala muro vertical o atraviesa desnivel imposible con Paso de Cabra | No permite trepa vertical/salto imposible; sigue física y pruebas de Atletismo/Acrobacia si pertinentes |
| FEE-T63 | Sátiro usa Cuernos Daño3/Pen0, espada y **Empujar** en una Acción | Cuernos son **arma natural disponible**, no segundo ataque/Maniobra gratis ni daño sumado |
| FEE-T64 | Sátiro corre por pendiente natural y supone inmunidad a `Retirada`, `Exhausto` y caída | Sólo sobrecoste de terreno enumerado; Correr consume Acción, Retirada limita tramo y Fatiga sigue |
| FEE-T65 | Dríade enraíza usando su Acción y atacante **Pequeño** logra Empujar margen Claro | Cuenta **Grande efectiva** (Mediana +1) al resistir; Pequeño está dos escalas por debajo y no la desplaza por fuerza corporal ordinaria; no +Defensa |
| FEE-T66 | Atacante **Mediano** Empuja Dríade enraizada con margen Claro | Objetivo **Grande efectivo**, una escala mayor: distancia base2→**1 espacio** si maniobra válida, sin +Defensa de Maniobra |
| FEE-T67 | Atacante intenta **Derribar** Dríade enraizada, que exige +1 numérico Defensa de Maniobra | No hay +Defensa cuantificado. Efecto de Escala al resistir existe, pero su viabilidad concreta en Derribar requiere B4/B5 |
| FEE-T68 | Dríade enraizada se desplaza un espacio voluntariamente y conserva +1 Escala efectiva sin liberar | El texto exige **1 MOV para liberarse**; **ABIERTA B4/B5** la formalización de inmovilidad hasta soltarse, pues la frase Verdante «inmóvil» no se repite en Dríade |
| FEE-T69 | El suelo donde Dríade enraizó se rompe mientras enemigo usa desplazamiento | **ABIERTA B5:** cuándo cesa el anclaje y cómo se resuelve caída/empuje; no conservar inmunidad ni imponer daño fijo |
| FEE-T70 | Dríade toca planta vinculada y deduce autor, Hechizo exacto, ubicación y estado de bosque remoto | **No**: sólo estado general de vegetación vinculada tocada; sin alcance remoto, diagnóstico o identidad del causante |
| FEE-T71 | Árbol vinculado muere, jugador pide muerte inmediata de Dríade o reinicio por 7 días sin aprobación | Ninguno es canon. `Continuidad de la Raíz` de **7 días** es módulo **opcional propuesto**, sin cura, telepatía ni segundo vínculo |
| FEE-T72 | Silfo camina por viento mundano ordinario, único sobrecoste de Movimiento | Ignora **esa penalización**, no obtiene MOV adicional ni vuela |
| FEE-T73 | Viento mundano se combina con hielo o escombros: Silfo cancela toda dificultad | Eliminar sólo la **penalización por viento ordinario**, no otras fuentes |
| FEE-T74 | Hechizo realmente causa **Empujar por viento físico**; Silfo exige inmunidad a todo daño y movimiento | La segunda cláusula **no repite «mundano»**: **ABIERTA B4/B5** aplicación de +1 Escala efectiva al componente Empujar por viento mágico. No inmunidad o +Defensa universal |
| FEE-T75 | `Martillo Cinético` o `Onda de Choque` sin viento explícito impacta a Silfo | No es «Empujar causado por viento» sólo por ser cinético/mágico; sin +Escala racial, daños/economía propios del Hechizo |
| FEE-T76 | Silfo aplica Cuerpo del Viento como vuelo de nacimiento, protección climática global y segundo +Escala por Hechizo | **No**: sin vuelo ni inmunidad a tormenta/magia; mejoras **equivalentes** de Escala no se acumulan salvo permiso |

**Cobertura acumulada:** `FEE-T01–FEE-T52` previos + **24** `FEE-T53–FEE-T76` = **76 criterios documentales, 0 ENV, 0 MESA**. Modelo auxiliar `auditorias/modelo_auxiliar_b3_feericos.js`: **24 fixtures con 24 coincidencias con expectativas**, dos salidas de clasificación abiertas (destrucción de anclaje; viento mágico). En casos de caída/ventanas de carga otras incertidumbres están **fuera del alcance del modelo** y siguen abiertas en B5.
