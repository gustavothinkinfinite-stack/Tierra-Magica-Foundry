# B5 — Decisiones operativas únicas para siete bloqueos
**17-11-2026 · VERSIÓN PROPUESTA 0.1 · NO CANÓNICA.** Autoridad: `main:docs/Tierra_Magica_Manual_Maestro.md`, blob `334770e7ed7d2605767aecb169f57da6c1100508`. Releídos tablero, README, plan, matriz `05_matriz_global_y_regresiones.md`, registro individual de 66 parejas, conciliación y anexos PROC/NEX/AMP/Hobgoblin. Estas son **opciones editoriales seleccionadas para que los guiones sean deterministas**, no reglas de `main`. No se ejecutó Foundry ni mesa.

## Decisión B5-D01 — Movimiento multimodal y Retirada (I01)
**Opción seleccionada:** para Movimiento ordinario, un solo presupuesto exacto `Σ(c/V_medio) ≤ 1`, con `c` en espacios equivalentes según terreno, `V_medio` velocidad vigente en ese medio. No reiniciar al entrar en otro medio. Para Retirada en varios medios, `Σ(c/V_medio) ≤ 1/2`; además, **cada tramo homogéneo individual** no puede superar `floor(V_medio/2)` espacios equivalentes. Si un solo medio ocupa toda la Retirada, rige exactamente `floor(V/2)`. Las fracciones se conservan sin redondear hasta verificar el movimiento completo. **Coste:** Movimiento/Acción/Reacción existentes, Correr sólo con su Acción. **Límites:** Carga, apoyo final del vuelo Hada, obstáculos, terreno difícil, distancia legal y caída. No añade desplazamiento ni vuelo sostenido.
- **Aceptación D01-A:** Coralio 2 tierra + 3 agua: `2/5+3/6=0,9`, legal Movimiento normal; 3 tierra + 3 agua = 1,1, ilegal.
- **Aceptación D01-B:** Retirada Coralio 1 tierra + 1 agua: `1/5+1/6=11/30≤1/2`, legal; 2 tierra + 1 agua = `17/30>1/2`, ilegal. Retirada homogénea terrestre MOV5 máximo 2; acuática MOV6 máximo 3.
- **Contraejemplo:** cambiar de medio no reinicia MOV ni evita redondeo homogéneo. Diagonales siguen la métrica general vigente del tablero, no una diagonal gratuita.

## Decisión B5-D02 — Enraizar, Derribar, pérdida de suelo (I02)
**Opción seleccionada:** Acción para Enraizar, 1 MOV para liberar **voluntariamente**, inmovilidad mientras anclado. +1 categoría de Escala efectiva sólo al calcular **resistencia de maniobras de Empujar, Derribar o desplazamiento impuesto**; no convertir esa categoría en Defensa universal ni bonificador numérico inventado. Si una maniobra no ofrece un paso donde la Escala tenga efecto, conservar el procedimiento general sin fabricar +1 al dado. Primero comprobar soporte al declarar resistencia; si el efecto rompe soporte **antes** de la maniobra, anclaje termina antes de resistir; si se rompe **como consecuencia** de la maniobra, resistir con anclaje válido y luego perderlo. **Coste:** Acción inicial; sin MOV por desanclaje forzado. **Límites:** no Escala ofensiva, Carga, daño, inmunidad ni regeneración.
- **Aceptación D02-A:** Verdante en suelo firme resiste Empujar; usa categoría efectiva sólo en el paso del sistema que consulta Escala.
- **Aceptación D02-B:** destrucción del suelo previa a Derribar: no resistencia por Enraizar.
- **Contraejemplo:** impacto que hace daño aunque el anclaje impida desplazamiento: daño no se anula. Si dos efectos son realmente simultáneos sin prioridad explícita, **propuesta de desempate:** aplicar resistencia con estado de soporte inicial y después daño/ruptura/caída; registrar la decisión.

## Decisión B5-D04 — Enlace Micelial (I04)
**Opción seleccionada:** distancia de **12 espacios entre emisor y receptor** medida con la métrica normal de distancia de tablero, incluyendo verticalidad cuando proceda, más continuidad real de **la misma red viva**. No medir longitud sinuosa de hifas, ni permitir retransmisión por tercer Micelio para ampliar radio. Acción para conectar, contacto directo continuo, otro Micelio voluntario; mensajes simples. La reconexión tras ruptura requiere Acción nueva. A 0 Vida no se generan mensajes nuevos voluntarios, aunque haya contacto físico. **Coste:** Acción inicial y condición de contacto; sin Maná gratis. **Límites:** no mapa, telepatía, detección remota ni puente mágico.
- **Aceptación D04-A:** receptores a 12 y 13 espacios sobre red continua: sólo el primero elegible.
- **Aceptación D04-B:** receptor a 5 espacios sin continuidad: no conexión.
- **Contraejemplo:** cadena de 3 Micelios no habilita emisor→receptor a 20 espacios en un mensaje. No inventar alcance de diagonal si el tablero tiene métrica propia.

## Decisión B5-D05 — Anfibio, Terio y Coralio (I05)
**Opción seleccionada:** locomoción de nado Terio no implica respirar agua; Rasgo general **Anfibio cuesta 1 PR** y no da MOV acuático. Un Coralio tiene respiración dual **condicionada a hidratación razonable**. **Propuesta de interpretación elegida:** si un Coralio adquiere legalmente el Rasgo general Anfibio por 1 PR, obtiene la **respiración dual ordinaria del Rasgo por una fuente mecánica independiente**, sin el requisito hídrico específico del paquete Coralio; eso **no** elimina la deshidratación, Fatiga, presión, frío ni contaminación. Esta compra tiene efecto marginal distinto en estado seco, por eso no se considera duplicación íntegra; en estado hidratado no suma nada. La opción de prohibir la compra por redundancia queda descartada **sólo para esta propuesta**.
- **Aceptación D05-A:** Terio con Nado sin Anfibio: MOV6 agua, no respirar agua garantizado.
- **Aceptación D05-B:** Coralio hidratado sin compra: respira ambos; Coralio seco sin compra: no garantizado; Coralio seco con compra de 1 PR: respira aire/agua ordinarios por Rasgo, pero sufre privación ambiental general.
- **Contraejemplo:** compra de Anfibio no produce hidratación ni inmunidad a agua contaminada; no asignar branquias gratuitas por descripción anatómica.

## Decisión B5-D06 — Hobgoblin (I06)
**Opción seleccionada para el texto base:** **no modificar el paquete racial vigente**; reconocer expresamente que Hobgoblin carece de beneficio exclusivo frente a Goblin/Bugbear, sin afirmar equivalencia de poder. La alternativa `Disciplina Preparada` queda **anexo optativo NO CANÓNICO**: **una Acción previa**, máximo **una vez por Escena**, sin acumulación con Ojo; requiere declarar objetivo concreto y preparación verificable, no es liderazgo, competencia ni bono pasivo. Hasta medir la utilidad, **no adjudicar una bonificación numérica adicional** en ficha ni sumar esta alternativa al paquete.
- **Aceptación D06-A:** tres goblinoides con Ojo disponible: mismo +1 cuando la oportunidad real es válida.
- **Aceptación D06-B:** paso por criatura ocupante sólo Goblin; Carga inerte contextual sólo Bugbear.
- **Contraejemplo:** Hobgoblin no obtiene Ventaja, +1 a ataque o Ayuda gratis por cultura militar. **Riesgo residual:** paridad empírica no demostrada; requiere decisión de diseño global, no impide reproducir canon vigente.

## Decisión B5-D08 — Conductor Vivo (I08)
**Opción seleccionada:** conducción sólo mediante **interfaz de dispositivo/proyecto expresamente compatible**, consentimiento afirmativo actual y gasto de los recursos **especificados en el diseño**, nunca por ascendencia. Dos perfiles de aceptación de prueba **ficticios, no objetos canónicos**:
- **Perfil LAB-PULSO:** dispositivo de laboratorio con reserva inicial **3 unidades ficticias de Energía**, activación por Acción del operador, gasto **1 unidad**, Caudal máximo **1 unidad por activación**. Conductor Vivo permite interfaz, no paga ni aumenta reserva. Si consentimiento se retira **antes de la activación**, no se inicia ni gasta; tras pulso resuelto, no se revierte.
- **Perfil LAB-SOSTENIDO:** dispositivo ficticio con reserva inicial **3 unidades**, activación por Acción, gasto **1 unidad inicial + 1 unidad por intervalo de mantenimiento definido por el prototipo** (intervalo de prueba: un turno); Caudal máximo **1 unidad por intervalo**. Retirar cooperación impide el próximo intervalo; un pulso ya pagado y resuelto permanece. Si 0 Vida impide Acción del operador, no inicia nuevo intervalo voluntario; autonomía sólo si el dispositivo la especifica y paga. **Estos números sólo son parámetros de banco de pruebas, no precios de Ingeniería ni valores oficiales de Energía/Caudal.**
- **Aceptación D08-A:** LAB-PULSO reserva 3→2 después de activación consentida; sin interfaz compatible no hay activación.
- **Aceptación D08-B:** LAB-SOSTENIDO 3→2 en activación; mantenimiento consentido 2→1; retirada antes del siguiente intervalo deja 1 y no genera nuevo efecto.
- **Contraejemplo:** coacción no equivale a consentimiento; ni red micelial ni cuerpo Cristálido generan Energía. No deducir coste universal de un proyecto de prueba.

## Decisión B5-D10 — 0 Vida, soporte y persistencia (I10)
**Opción seleccionada:** 0 Vida implica Incapacitado y resolución de Trauma según canon. No nuevas Acciones, Movimiento voluntario ni Reacciones. Rasgos anatómicos pasivos (p. ej. Protección Natural Coralio) persisten mientras exista cuerpo y requisitos. Enraizar físicamente puede permanecer **si el suelo sigue apto**, pero no permite liberación voluntaria ni maniobras nuevas. Enlace Micelial no emite mensajes voluntarios nuevos; Conductor Vivo no inicia ni mantiene aportes voluntarios nuevos; un dispositivo autónomo sólo sigue si su propio diseño lo autoriza y paga. Hada en vuelo sin apoyo cae según regla general; no aterriza gratis. **Desempate propuesto para daño/desplazamiento simultáneos sin prioridad en fuente:** aplicar prueba y daño con estado inicial, luego desplazamiento/soporte, luego Incapacitado y caída; un efecto explícitamente ordenado por su texto prevalece.
- **Aceptación D10-A:** Coralio Protección Natural1 con armadura Protección2 a 0 Vida: Protección efectiva2, no 3 ni 0.
- **Aceptación D10-B:** Hada a 0 Vida sin apoyo: caída normal; si apoyada, no caída retroactiva.
- **Aceptación D10-C:** Verdante a 0 Vida con suelo íntegro: sin Acción ni liberación; si suelo desaparece, no Escala efectiva posterior.
- **Contraejemplo:** dispositivo sin regla de autonomía no continúa gratis tras Incapacitado.

## Tabla de conflictos y control de versiones
| Decisión | Respeta canon sin extensión | Añade arbitraje no canónico | Validación aún pendiente |
|---|---|---|---|
| D01 | velocidades, Retirada homogénea, Correr | presupuesto mixto y límite de tramo | mesa/Foundry, diagonales |
| D02 | Acción, 1 MOV, +1 Escala restringida | desempate de simultaneidad | maniobras con DF concreta |
| D04 | red viva, contacto, radio12, voluntad | métrica directa en 3D | mapas de red |
| D05 | Nado≠Anfibio, PR1, Coralio hidratado | compra Coralio seco como fuente distinta | equilibrio de 1 PR |
| D06 | Ojo común y rasgos exclusivos | alternativa costeada **sin bono numérico** | paridad y diseño de alternativa |
| D08 | interfaz y recursos reales | dos perfiles de laboratorio | diseños oficiales |
| D10 | Incapacitado, Trauma, protección pasiva | prioridad simultánea y persistencia | efectos sostenidos concretos |

**Dictamen:** siete opciones editoriales **seleccionadas y costeadas donde corresponde**, con 15 casos de aceptación/contraejemplo descritos; **no certifican 66 parejas ni sustituyen ejecución**. B5 requiere contrastar los guiones contra las reglas de subsistema en `main`, revisar contradicciones (especialmente D05, D08) y actualizar el acta de puerta C. **No abrir fase C todavía.**


## Adenda 18-11-2026 — precedencia de la hoja normativa única

**Este expediente del 17-11 se conserva como antecedente histórico, no como segundo reglamento alternativo.** La **única candidatura normativa** de esta rama para los siete bloques es [`05_b5_hoja_unica_decisiones_normativas.md`](./05_b5_hoja_unica_decisiones_normativas.md), con matriz [`05_b5_conciliacion_30_casos_12_globales_y_pares.md`](./05_b5_conciliacion_30_casos_12_globales_y_pares.md), contrastada con el blob actual de `main` `aa7105f6ef4d744040cce4763d9e01ee28b87572`.

**Conflictos corregidos en el borrador, NO en canon:**
- **D02 vs DER-R2:** este documento prohibía inventar +1 numérico para Derribar; el nuevo dictamen formula **DER-R2 como cambio propuesto explícito**: +1 Defensa de Maniobra **sólo al resistir Derribar** cuando una facultad aumenta expresamente Escala efectiva en ese contexto. La versión previa sigue registrando la lectura literal **R0**.
- **D05/ANF1:** mantiene Anfibio 1 PR y Coralio seco con fuente independiente; la hoja nueva distingue además **branquias anatómicas funcionales** de Locomoción de nado y de `Anfibio` general, pendiente aprobación y balance.
- **D06:** `Disciplina Preparada` y `Señal de Coordinación` son **alternativas de estudio distintas** y no deben confundirse ni añadirse gratis. La candidatura elegida es **mantener Hobgoblin canónico con Ojo**, reconociendo asimetría sin paridad demostrada.
- **D08:** consentimiento antes de declarar la intervención, pero luego **§2 manda declarar→pagar→comprobar→Reacciones→prueba**. Revocación tras el pago no reembolsa.
- **I01/I04/I10:** nuevo texto especifica interrupción Goblin, reconexión, orden de 0 Vida y costes; es arbitraje propuesto, no normalización oficial.

La presente adenda **no cierra B5 ni abre C**: 30 criterios DOC nuevos, 0 Foundry y 0 mesa; selección editorial y validación pendientes.
