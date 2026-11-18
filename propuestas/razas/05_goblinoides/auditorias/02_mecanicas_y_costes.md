# B2 — Goblinoides: auditoría mecánica y de costes (Goblin, Hobgoblin, Bugbear)

**ESTADO:** B2 **completada documentalmente**, con correcciones efectivas en el expediente y ampliación de regresiones. **PROPUESTA NO CANÓNICA, NO APROBADA.** Fecha: 17-11-2026. **No hubo partida, prueba automatizada del motor Foundry ni ejecución de los escenarios**: todos los resultados expresados aquí son predicciones derivadas de la fuente escrita.

**Fuente primaria reabierta:** `main:docs/Tierra_Magica_Manual_Maestro.md`, blob SHA `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`: paquete Goblinoide v0.3 (§3, líneas 293–317), reglas de elección y presupuestos de Ascendencia (§3, 221–247), prueba 2d10 y Ventaja/Desventaja/Ayuda/repetición (§2, 106–156), reglas universales de turno y Reacciones (§6, 2315–2348 y 2801–2813), Retirada/Correr/terreno difícil (2852–2870), Acciones y ataque (2871–2919), Defensas y maniobras (2691–2789, 2959–2972), carga/equipo (3636–3647), Vida/Fatiga/Descanso/Trauma (3680–3760), magia/Conjuración, equipo y crafting, Rasgos (§5), Varkor (§28). **Documentos auditados:** `05_goblinoides/auditoria_y_desarrollo.md`, `doble_pagina.md`, `pruebas_balance.md`, `cierre_editorial.md` y auditoría B1. **Cruces de control:** Enanos, Orcos, Terios y Humanos sin ejecutar todavía comparativa cuantitativa B4.

## I. Paquetes exactos de `main` sin modificación

| Ascendencia registrable | Escala | Movimiento | Poderes **gratuitos del paquete** | No concede por inferencia |
|---|---|---:|---|---|
| **Goblin** | **Pequeña** | **6** | **Ojo para la Oportunidad**, **Escurridizo** | Sigilo, Iniciativa, Visión Oscura, inmunidad a terreno difícil, Acción/Reacción extra |
| **Hobgoblin** | **Mediana** | **6** | **Ojo para la Oportunidad** | Liderazgo, Ingeniería, competencia marcial, Ayuda permanente, +INT o planificación infalible |
| **Bugbear** | **Mediana** | **6** | **Ojo para la Oportunidad**, **Complexión Bugbear** | Escala real Grande, alcance, arma Grande, Defensa, Daño, Protección, Sigilo gratuito |

**Ojo para la Oportunidad [CANON]:** **1/Escena**, antes de una prueba, **+1** sólo cuando se aprovecha una oportunidad concreta surgida de **información recién obtenida**, **cambio real de situación** o **debilidad concreta ya descubierta**. No crea información, no revela debilidades ocultas y no permite redefinir una misma circunstancia como oportunidades distintas. Su texto no lo limita a PER ni prohíbe ataques: una prueba marcial o mágica podría cumplirlo si el hecho y la intención realmente justifican la oportunidad, sin aumentar Acción o conocimiento.

**Escurridizo [CANON]:** un Goblin puede atravesar el espacio de una criatura **Mediana o mayor**, **si existe hueco físico**; ese tránsito cuenta como **terreno difícil**. No puede terminar **su Movimiento** en el espacio ajeno, atravesar barreras ni anular una **Reacción habilitada por otra regla**. No está escrita en el rasgo una Acción de activación, una exención de amenaza o una concesión general de movimiento por espacios ocupados Pequeños.

**Complexión Bugbear [CANON]:** considerar la Escala **Grande únicamente para Carga y fuerza bruta contra objetos inertes**. Su Escala sigue siendo Mediana para cualquier otra finalidad. El texto no aumenta FUE efectiva en +1: **cambia sólo la categoría de Escala contextual**, y no modifica alcance, daño, maniobras, Defensa o armas utilizables.

**Economía transversal:** las tres Ascendencias se reciben aparte de **25 PD y 3 PR generales**, sin Idiomas/Habilidades profesionales ni otros Rasgos por oficio o historia. Una biografía que cruza tres culturas no permite combinar paquetes Goblin+Hobgoblin+Bugbear.

## II. Fichas de capacidades, subsistemas y costes

| ID | Capacidad / disparador | Coste y ventana; efecto | Exclusiones/interacción de otros subsistemas | Riesgo y criterio de aceptación |
|---|---|---|---|---|
| GOB-B2-R01 | **Ojo — información recién obtenida** | +1 a **una prueba pertinente**, declarar **antes de tirar**, 1/Escena | La información debe existir y ser nueva para la situación; investigar no inventa pistas | GOB-09/10/15 y GOB-37/39 |
| GOB-B2-R02 | **Ojo — cambio real** | Como anterior, si un cambio realmente altera condiciones de la prueba | No significa «empieza mi turno» o «cambio de intención» sin hecho nuevo | GOB-11/12/13/40 |
| GOB-B2-R03 | **Ojo — debilidad descubierta** | +1 a prueba que explota debilidad concreta *ya descubierta* | No detector de puntos débiles, no modifica Ataque/Daño permanentemente; puede entrar a ataque legítimo porque es una prueba | GOB-15/37 |
| GOB-B2-R04 | **Ojo + Ayuda / otros modificadores** | Ojo +1 por su condición; **Ayuda válida** normalmente Ventaja por reglas universales | No se encontró un **techo numérico universal** de «modificadores circunstanciales». Dos Ayudas no dan dos Ventajas; resolver fuentes equivalentes según textos concretos | GOB-16/38/41; corrección del expediente |
| GOB-B2-R05 | **Ojo — turno/recarga** | 1 uso en una Escena; no consume automáticamente Acción adicional, sólo modifica prueba existente | No reintentar tras observar tirada, no recargar cada ronda/turno, no sumar «un uso por debilidad» | GOB-10–14/39 |
| GOB-B2-R06 | **Ojo — repetición de una prueba** | La tirada original sigue procedimiento 2d10 + Atributo + Habilidad + modificaciones | +1 no permite **reroll** ni segunda Acción; repetición exige cambio significativo, método, herramientas, información o riesgo reales según §2 | GOB-12/40 |
| GOB-B2-R07 | **Escurridizo — paso físico** | 2 **puntos de Movimiento por espacio ocupado** atravesado como terreno difícil, siempre que haya hueco | No teletransporte, intangibilidad ni movimiento por pared/espacio Pequeño por sólo este rasgo | GOB-18–23/31/45 |
| GOB-B2-R08 | **Escurridizo — salida** | No puede finalizar Movimiento dentro de espacio ajeno | **[PROPUESTA DE SEGURIDAD]** Comprobar destino legal y reserva disponible antes de iniciar ruta evita posiciones ilegales; reacción/interrupción no tipificada necesita B3 | GOB-20/25/36 |
| GOB-B2-R09 | **Escurridizo — retirada** | Si empieza el desplazamiento dentro de alcance de amenaza activa y se aleja: máximo **mitad Movimiento normal** en tramo de retirada; con MOV6, 3 | Terreno difícil consume puntos dentro de ese presupuesto; no existe Ataque de Oportunidad universal por salir de alcance | GOB-31/32/35 |
| GOB-B2-R10 | **Escurridizo — Correr** | Gasta Acción, añade tramo completo igual al Movimiento base; sigue pagando terreno difícil | No Acción adicional, no salto de Reacciones, no «correr intangible» | GOB-33; estados de Fatiga B3 |
| GOB-B2-R11 | **Escurridizo — Reacciones concretas** | Se aplican sólo cuando otra Técnica, capacidad, preparación o regla crea un disparador | Escurridizo **no neutraliza** Reacción legal, pero tampoco inventa ataque de oportunidad del que carece el adversario | GOB-24/35 |
| GOB-B2-R12 | **Bugbear — Carga** | Escala efectiva **Grande** al adjudicar bultos razonables, transporte/equipo | El Manual **no tiene fórmula universal kg o ranuras**; no autoriza arma/equipo Grande ni ser físicamente imposible | GOB-26/42 |
| GOB-B2-R13 | **Bugbear — objetos inertes** | Escala efectiva Grande **sólo** para fuerza bruta contra objetos inertes | Un enemigo que sostiene/opone un objeto no se vuelve «objeto inerte» a efectos de maniobra; técnica/herramientas/tiempo no gratis | GOB-27/43 |
| GOB-B2-R14 | **Bugbear — maniobras/equipo** | Mediana real para Agarrar, Empujar, Derribar, Desarmar, Defensa y armas | No sumar alcance, Daño o Vida; talla 2,30 m de lore no altera Escala reglada | GOB-28–30/43–44 |
| GOB-B2-R15 | **Creación, Rasgos, magia, dispositivos y equipo** | 25 PD/3 PR y acceso normal a Fuente/Rasgos/Ingeniería/Alquimia/CRAFT | Ojo no concede Hechizo, Runa, Maná, Reserva, Energia/Caudal ni Habilidad por oficio; Corpulento/Masivo cuestan PR y no cambian Escala | GOB-04–08/44 |
| GOB-B2-R16 | **Vida, Fatiga y descansos** | Mismos 0 Vida, Trauma, Sangrado, recuperación y estados universales | Ojo no evita Incapacitado ni revive. Escurridizo no compensa Movimiento perdido por Exhausto. Complexión no da resistencia a toxinas | GOB-34 y regresiones B3 |

### Alcance de «prueba» en Ojo

**No es +1 a una «tirada de conocimiento goblin»** ni una bonificación permanente a Ingeniería, Sigilo o iniciativa. Pero **tampoco** aparece en `main` la prohibición de aplicarlo a todo Ataque, Rituales o pruebas con Defensa: el texto dice «antes de una prueba». Si alguien descubre *de verdad* un patrón de disparo, un paso de servicio o una debilidad del objetivo y explota esa oportunidad concreta con prueba compatible, la lectura **puede permitir +1 en esa prueba**. Exige escena, información y declaración. No mejora **Daño, Penetración, Protección, Defensa o iniciativa sin prueba**; si Iniciativa se resolviera como prueba elegible, cualquier aplicación necesitaría justificar su relación causal sin inferir un bono constante. Este borde se deriva a B3/B4 para mantener consistencia entre mesas.

**Ayuda:** exige contribución significativa, competencia o método apropiado. Una oportunidad real y una Ayuda real son **disparadores distintos**: el +1 situacional puede coexistir con la **Ventaja** de Ayuda cuando ambos textos se cumplen, sin que eso abra apilamiento indefinido ni otorgue Acción gratis. En `main`, múltiples Ventajas no se acumulan y una Ventaja y Desventaja se cancelan. No afirmar un inexistente «tope +1 de todos los modificadores».

**Incentivos y control de escena:** un Registro de Oportunidad propuesto (hecho, fuente, prueba donde se usa) puede favorecer el arbitraje; no es requisito oficial, no inventa recursos, no altera el reloj de Escena. Cuando Ojo ya gastó su único uso, un segundo dato nuevo **no recarga** el rasgo hasta la siguiente Escena.

## III. Movimiento Goblin: ejemplos y fronteras

### Coste en espacios ocupados

En `main` §6, desplazamiento ordinario = **1 punto/espacio**; terreno difícil = **2 puntos/espacio**. Escurridizo sólo pone a ese coste **el tránsito por el espacio ocupado**; si después se accede a espacio vacío ordinario, ese desplazamiento usa su coste normal.

**Ejemplo reproducible:** Goblin con Movimiento 6: entrar/transitar **1 espacio de criatura Mediana con hueco físico** cuesta **2**, y pasar a **1 espacio libre adyacente** cuesta **1**. Total **3 puntos**; conserva 3 de su reserva si no hay Retirada, Fatiga ni otros costes. No se «termina» el Movimiento dentro de la criatura.

**Retirada:** si la ruta se inicia dentro del alcance de amenaza activa y es una retirada voluntaria, el tramo normal de MOV6 se limita a **3**. El pasaje 2+1 puede gastar el tramo completo. No multiplica gratis 3 para permitir 3 espacios difíciles. **Correr** puede añadir un tramo de Movimiento base completo usando la **Acción**, sujeto a terreno/posiciones reales y a Reacciones válidas.

**Fatiga:** Exhausto reduce Movimiento en **2** (mínimo 1). La fórmula de la Retirada utiliza **Movimiento normal**, mientras la condición reduce Movimiento; el orden exacto de aplicar simultáneamente ambos límites cuando afectan el mismo tramo merece análisis de secuencia B3 (conservadoramente no permitir más movimiento efectivo que el disponible). No declarar ahora universalmente si «mitad de 6» o «mitad de 4» gobierna todos los casos.

**Espacio legal:** el canon no permite **terminar Movimiento** en un espacio ocupado. El desarrollo original decía «si no puede completar el tránsito hasta un espacio legal, no inicia ese movimiento» como si fuera literalmente regla. Se corrigió a **propuesta de adjudicación preventiva**: verificar camino, espacio final y presupuesto antes de comenzar. Si una Reacción válida detiene al Goblin en medio del tránsito, el resultado no está descrito en la entrada racial; resolver en B3 sin inventar daño, empuje, teletransporte, «rebote» ni coste gratis.

**Ataques de oportunidad:** `main` §6 dice que **no hay Ataque de Oportunidad universal** por alejarse del alcance. La frase del paquete «no anula Reacciones» conserva, en cambio, **las reacciones expresamente habilitadas** por una Técnica, preparación, capacidad, magia o equipo compatible. No atribuir universalmente ataques gratuitos a todo adversario cruzado.

### Variantes y límites físicos

- Un paso junto a o a través de **Hobgoblin Mediano** puede beneficiarse de Escurridizo si cabe físicamente; no necesita simpatía del Hobgoblin.
- **Bugbear Mediano** cuenta como Mediano para ocupar espacio a estos efectos; su Complexión Grande efectiva para Carga no lo convierte en criatura Grande a efectos de la ruta.
- A través de un **Goblin Pequeño** el rasgo no aplica; otras reglas de tránsito podrían existir pero deben citarse, no inventarse.
- Barrera, puerta cerrada, pared de piedra, espacio físicamente imposible o área sin salida legal no se atraviesan mediante Escurridizo; no es `Fase Parcial` de Alteración.
- No concede ocultación, cobertura o imposibilidad de ataque automáticamente al estar cerca de una criatura mayor.

## IV. Complexión Bugbear: fuerza, escala, equipo y comparación pertinente

La capacidad cambia **Escala efectiva** en los dos casos enumerados, **no un Atributo numérico**. Un Bugbear **Mediano** que usa fuerza bruta contra un tronco inerte cuenta como Grande en lo que la adjudicación de Escala permita; no obtiene +1 FUE ni +1 de Atletismo por ese motivo. Como el núcleo carece de fórmula universal de Carga, su utilidad se decide por coherencia de equipo/objeto y por textos expresos, no por kilogramos creados solo para la ascendencia.

| Situación | Escala efectiva Grande | Lo que no cambia |
|---|---|---|
| Cargar bulto durante expedición | **Sí** | No +FUE permanente, no capacidad fija en kg, no Movimiento extra |
| Desplazar caja o barril inerte mediante fuerza bruta | **Sí** | No éxito garantizado ni Acción/herramientas gratis |
| Arrastrar carreta sin resistencia activa de criatura | **Potencialmente sí**, si se adjudica como fuerza contra objeto inerte | No equiparar a máquina motorizada ni a Fuerza general |
| Empujar/Derribar/Agarrar enemigo | **No** | Mediana, Defensa/maniobras ordinarias |
| Desarmar espada que enemigo sostiene activamente | **No** | Oposición/acción sobre criatura, no un objeto abandonado |
| Vestir armadura o empuñar arma Grande | **No** | Equipo compatible con Escala real y anatomía, no la efectiva contextual |
| Recibir daño, veneno, 0 Vida/Trauma | **No** | Sin armadura natural ni inmunidades |
| Comprar Corpulento o Masivo | **Escala no cambia** | Vida extra costeada según Rasgo; no acumular dos bonos incompatibles |

**Interacción transversal:** Enano tiene Escala efectiva **Mediana** para Carga y resistencia a empuje/desplazamiento, **no** lo mismo que el Bugbear; Orco usa **+1 FUE efectiva para Carga y objetos inertes**, sin elevar Escala. Terio con adaptación de Complexión tiene su propio texto. Ningún PJ suma Ascendencias para apilar Escalas, y mejoras equivalentes de Escala no se acumulan sin autorización. La comparación real de valor requiere B4, especialmente la distinta cobertura de Hobgoblin y el uso situacional de Ojo.

## V. Matriz de aceptación B2 — 20 escenarios adicionales de análisis (sin ejecución)

Estos son **escenarios metodológicos de la auditoría**, distintos de los 15 casos GOB-31–45 añadidos al archivo de pruebas. No representan 20 resultados experimentales.

| ID | Escena | Resultado previsto de acuerdo con `main` |
|---|---|---|
| GOB-B2-S01 | Goblin de Origen Kharumita con profesión Marcial | MOV6, Pequeña, Ojo/Escurridizo; sin idiomas ni entrenamiento marcial gratis |
| GOB-B2-S02 | Hobgoblin toma profesión Ingeniería | Sólo aprende con PD, no hereda bono por su Consejo de Turno |
| GOB-B2-S03 | Bugbear con 3 PR comprados en Rasgo Masivo | +8 Vida máxima, no Grande real ni Protección |
| GOB-B2-S04 | Goblinoide recibe mapa nuevo con pasaje útil | Puede declarar Ojo antes de prueba vinculada; 1 uso |
| GOB-B2-S05 | Reutiliza exactamente mismo mapa para «otra oportunidad» sin cambio real | No dividir la misma circunstancia ficticiamente |
| GOB-B2-S06 | Declara Ojo una vez visto un fallo | Prohibido activación retroactiva |
| GOB-B2-S07 | Ojo con ayuda experta real que entrega Ventaja | +1 por Ojo si condición; Ventaja por Ayuda si condición; no techo universal inventado |
| GOB-B2-S08 | Ojo aplicado a ataque contra debilidad descubierta | Puede afectar **prueba de Ataque** al estar justificado, no Daño adicional ni ataque extra |
| GOB-B2-S09 | Ojo se usa para pedir ver debilidad sin Investigación | No descubre información |
| GOB-B2-S10 | Ojo usado dos veces en misma Escena por dos cambios distintos | Segundo intento no disponible |
| GOB-B2-S11 | Goblin cruza espacio ocupando 1 casilla Mediana y sale a libre | 2 + 1 = **3 puntos MOV** si factible |
| GOB-B2-S12 | Goblin se retira y cruza casilla Mediana amenazante | MOV6 mitad=3 en retirada; 2 + 1 puede consumirlo |
| GOB-B2-S13 | Goblin corre atravesando casilla Mediana | Acción Correr suma tramo base, terreno difícil sigue costando 2 |
| GOB-B2-S14 | Goblin cruza criatura Pequeña sin otra capacidad | Escurridizo no habilita esa ruta |
| GOB-B2-S15 | Goblin cruza sin permitir Reacción de una Técnica enemiga | Reacción si tiene disparador válido; no ataque de oportunidad universal |
| GOB-B2-S16 | Goblin Exhausto quiere cruzar sin MOV suficiente | No convertir MOV6 racial en reserva disponible; secuencia de retirada a B3 |
| GOB-B2-S17 | Reacción interrumpe Goblin dentro de casilla ocupada | Resultado formal de espacio/posición **pendiente B3**; no crear regla |
| GOB-B2-S18 | Bugbear mueve objeto inerte frente a obstáculo físico | Grande efectiva según adjudicación, sin FUE +1 ni Daño |
| GOB-B2-S19 | Bugbear intenta Empujar a criatura | Mediana, no Grande en maniobra |
| GOB-B2-S20 | Reacción/defensa/0 Vida de Bugbear | Complexión no concede Defensa, Protección, Reacción o inmunidad |

## VI. Incidencias trazadas

| ID | Severidad | Hallazgo | Estado / propuesta de resolución |
|---|---|---|---|
| GOB-INC-B2-01 | **Alta de fuente** | `pruebas_balance.md` GOB-16 afirmaba «límite general de modificadores», inexistente como techo numérico universal | **CORREGIDO**: aplicar condiciones individuales y reglas específicas de apilamiento; Ayuda y Ojo pueden coexistir legítimamente |
| GOB-INC-B2-02 | **Alta de trazabilidad** | `auditoria_y_desarrollo.md` convertía salida legal previa de Escurridizo en requisito canónico literal | **CORREGIDO**: etiquetar pauta preventiva como **[PROPUESTA B2]**, y separar la prohibición canónica de finalizar Movimiento dentro del espacio |
| GOB-INC-B2-03 | **Media/alta de secuencia** | Interrupción por Reacción cuando Goblin atraviesa casilla ocupada | **ABIERTA B3**: posición válida, coste ya pagado y legalidad de fin de Movimiento |
| GOB-INC-B2-04 | **Media/alta de secuencia** | Retirada + Correr + Exhausto + terreno difícil puede crear presupuestos inconsistentes | **ABIERTA B3**: no inventar fórmula a priori; comparar caso con MOV reducido y Retirada |
| GOB-INC-B2-05 | **Media** | Confusión de Reacción real con Ataque de Oportunidad universal | **CONTROLADO POR `main`**, con nuevas pruebas GOB-35 y GOB-B2-S15 |
| GOB-INC-B2-06 | **Media/alta de balance** | Hobgoblin tiene solo Ojo, frente a dos capacidades de Goblin/Bugbear | **ABIERTA B4**: medir valor situacional de Escala Mediana, movilidad, carga y frecuencia Ojo antes de añadir competencias |
| GOB-INC-B2-07 | **Media** | La evaluación de «nueva» información puede favorecer a PJ que repiten en escenas la misma pista | **ABIERTA B3/B4**, Registro de Oportunidad sólo registro documental |
| GOB-INC-B2-08 | **Media** | Conceder +1 de Ojo a Daño o crear «Ataque adicional» | **CONTROLADO**: modifica sólo una prueba legal, incluso Ataque si gatillo real, no valores fijos |
| GOB-INC-B2-09 | **Media** | Complexión Bugbear equiparada a +1 FUE de Orco o armamento Grande | **CONTROLADO**, Escala efectiva limitada a Carga/objeto inerte. Comparar eficacia B4 |
| GOB-INC-B2-10 | **Media** | Fatiga, objetos, Ingeniería, magia o dispositivos usados para generar beneficios raciales encubiertos | **CONTROL DOCUMENTAL**: condiciones propias y 25 PD/3 PR preservados; prueba B3 por sistemas |
| GOB-INC-B2-11 | **Media editorial** | Rango biológico propuesto de Bugbear se convierte en cambio de Escala o Carga, o Kobold se hace cuarta opción jugable | **CONTROLADO**, solo anatomía narrativa y tres paquetes reales |

**Correcciones persistidas:** `auditoria_y_desarrollo.md` y `pruebas_balance.md` (GOB-16 y GOB-25), con **15 pruebas documentales adicionales GOB-31–45**. No se cambiaron valores canónicos ni `doble_pagina.md`; el procedimiento preventivo de salida legal y la casilla bajo interrupción permanecen expresamente **no ratificados**.

## VII. Dictamen y próximo trabajo

**B2 Goblinoides completada documentalmente:** 16 fichas de capacidades y sistemas, 20 escenarios de análisis, 11 incidencias y **45 criterios de prueba documental en el expediente (cero ejecutados)**. Las tres variantes siguen jugables bajo el paquete vigente. Los riesgos residuales más importantes son secuencias de Movimiento y la comparación de valor del **Hobgoblin** sin segunda capacidad.

**Siguiente B2:** `06_terios/` — anatomías, presupuesto Principal+Secundaria/Dominante, reemplazo por Variedad, vuelo sostenido, trepa/nado, branquias y Anfibio (1 PR), órganos prensiles, armas naturales, Carga y equipo anatómicamente compatible, contra reglas de descanso/Movimiento y subsistemas de magia/CRAFT. No iniciar todavía B3/B4/B5 ni `manual_final_propuesto.md` antes de revisar B2 de las doce familias.

**Guardarraíl:** sólo `propuestas/razas/` en `propuestas/razas-autonomas-2026`; no editar `main`, Manual Maestro, Foundry ni atlas.
