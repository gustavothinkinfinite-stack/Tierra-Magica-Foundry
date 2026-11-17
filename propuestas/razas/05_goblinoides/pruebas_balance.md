# Goblinoides — 69 criterios documentales acumulados (45 previos + 24 B3) v0.1
**PROPUESTA NO CANÓNICA.** Son expectativas auditadas contra el Manual Maestro de `main`, no simulaciones ni playtests realizados. Registrar resultados empíricos por separado.

| ID | Situación | Resultado esperado |
|---|---|---|
| GOB-01 | Crear Goblin | Escala Pequeña, Movimiento 6, Ojo y Escurridizo; 25 PD/3 PR intactos |
| GOB-02 | Crear Hobgoblin | Escala Mediana, Movimiento 6, sólo Ojo; presupuestos intactos |
| GOB-03 | Crear Bugbear | Escala Mediana, Movimiento 6, Ojo y Complexión; presupuestos intactos |
| GOB-04 | Goblin con Origen Kharumita | Lenguas Común/Kharumita; sin lengua goblin gratis |
| GOB-05 | Hobgoblin militar | Sin competencia en armas o Liderazgo por nacimiento |
| GOB-06 | Bugbear explorador | Sin Sigilo gratuito |
| GOB-07 | Goblin artesano | Sin Ingeniería ni Artesanía gratis |
| GOB-08 | Cualquier Goblinoide devoto de Varkor | Sin Fuente Divina sin comprar Vínculo y juramento |
| GOB-09 | Se descubre mapa nuevo útil y se declara antes de prueba | Ojo +1 en prueba relacionada, consume uso de Escena |
| GOB-10 | Declarar Ojo después de tirar | Inválido; no retroactivo |
| GOB-11 | Usar Ojo sin oportunidad concreta | Inválido, no +1 por astucia genérica |
| GOB-12 | Reutilizar el mismo mapa como cinco oportunidades | Inválido: misma circunstancia no se divide artificialmente |
| GOB-13 | Nueva información real durante la misma Escena tras gastar Ojo | No hay segundo uso |
| GOB-14 | Nueva Escena, nueva oportunidad concreta | Uso disponible de nuevo |
| GOB-15 | Pretender que Ojo revele una debilidad oculta | No revela información; requiere descubrimiento por otros medios |
| GOB-16 | Ojo junto a otro bono circunstancial o Ayuda válida | No existe techo numérico universal declarado: contrastar requisitos de cada bono y reglas específicas de no acumulación; +1 de Ojo no regala Ayuda ni la bloquea de por sí |
| GOB-17 | Ojo para acción físicamente imposible | No vuelve posible lo imposible |
| GOB-18 | Goblin atraviesa espacio Mediano con hueco | Permitido pagando terreno difícil |
| GOB-19 | Goblin atraviesa 1 espacio ajeno | Coste 2 puntos de Movimiento, no 1 |
| GOB-20 | Goblin termina turno dentro de espacio ajeno | Prohibido |
| GOB-21 | Goblin atraviesa pared o cuerpo sin espacio | Prohibido |
| GOB-22 | Goblin atraviesa espacio de criatura Pequeña | Escurridizo no aplica por requisito Mediana o mayor |
| GOB-23 | Goblin atraviesa criatura Grande | Permitido si hay espacio físico y salida legal; Reacciones siguen vigentes |
| GOB-24 | Goblin pretende evitar Reacción habilitada | No la evita por Escurridizo |
| GOB-25 | Goblin sin Movimiento para terminar fuera de espacio ocupado | El canon prohíbe terminar **Movimiento** dentro; el control preventivo «no iniciar la ruta sin salida» es **adjudicación propuesta**, no texto literal. Resolver interrupciones en B3 |
| GOB-26 | Bugbear carga bulto inerte | Se trata como Grande sólo para Carga |
| GOB-27 | Bugbear arrastra objeto inerte | Escala efectiva Grande sólo para esa fuerza |
| GOB-28 | Bugbear Empuja o Derriba criatura | Sigue Mediano; no obtiene mejora de Complexión |
| GOB-29 | Bugbear usa arma Grande o pretende mayor alcance | Prohibido por Complexión; requiere reglas de equipo compatibles |
| GOB-30 | Bugbear combina Complexión con otra mejora equivalente de Escala | No se acumulan mejoras equivalentes salvo regla expresa |

## Matriz de comparación y explotación
- **Goblin frente a Enano:** ambos Pequeños; Goblin Movimiento 6 y tránsito condicionado; Enano Movimiento 5 y Cuerpo de Piedra/Sangre de Metal. Comparar supervivencia real, no asumir superioridad por movilidad.
- **Hobgoblin frente a Humano:** Ojo 1/Escena frente a Don sin Forma; no agregar Liderazgo gratuito como compensación sin pruebas.
- **Bugbear frente a Orco:** Grande efectiva para Carga y objetos frente a +1 FUE efectiva limitada; comparar con las fórmulas de Carga y no equiparar ambos beneficios numéricamente sin contexto.
- **Ojo + Ayuda:** Ayuda sigue requiriendo aportación real; +1 no produce automáticamente Ventaja ni acción adicional.
- **Escurridizo + correr:** el coste de terreno difícil no desaparece al correr; Reacciones siguen vigentes.
- **Ojo en escenas sociales:** información nueva puede ser un contrato revelado, no una sospecha sin evidencia. Una tirada de Investigación no puede crear la información y cobrar inmediatamente una oportunidad ficticia.
- **Herramienta opcional:** Registro de Oportunidad (hecho, fuente, prueba) no modifica ninguna regla, no añade recursos ni ventajas.

## Playtest propuesto (pendiente)
Tres PJs goblinoides y controles Humano/Enano/Orco durante 10 escenas mixtas: 3 exploración, 3 social, 2 ingeniería, 2 combate. Registrar oportunidades válidas, número de usos de Ojo, intentos inválidos, movimiento gastado por Escurridizo y relevancia efectiva de Complexión Bugbear. Probar tres escenas sin información nueva para detectar si Hobgoblin queda infrautilizado; **no alterar paquete hasta obtener evidencia**.

## B2. Casos de regresión documental ampliados — GOB-31 a GOB-45

**No son pruebas ejecutadas:** resultados esperados al aplicar `main` v0.3. Los supuestos con dos efectos en disputa quedan expresamente para secuencias B3.

| ID | Escenario | Resultado esperado / condición a conservar |
|---|---|---|
| GOB-31 | Un Goblin dispone de Movimiento 6 y atraviesa **un espacio** ocupado por criatura Mediana con salida contigua libre | Ocupado cuesta **2 puntos** (terreno difícil); la salida libre contigua cuesta normalmente **1**, total **3** si ambos desplazamientos son válidos. No gana Acción |
| GOB-32 | Ese Goblin se **retira** desde alcance de una amenaza activa y atraviesa el espacio en ruta de escape | La retirada limita el tramo a **3 puntos** con Movimiento normal 6. La ruta de 2+1 puede agotar ese tramo; se mantienen Reacciones expresamente habilitadas |
| GOB-33 | Goblin con Movimiento 6 realiza Correr al cruzar un espacio ocupado válido | Correr consume su Acción y aporta tramo de Movimiento base **6**; no suprime el coste **2** del espacio difícil ni crea Reacción o invisibilidad |
| GOB-34 | Goblin Exhausto (Movimiento reducido) intenta cruzar por ocupación y terminar libre | Verificar Movimiento **disponible** y la ruta completa; no usar 6 incondicionalmente. Si hay retirada y Fatiga simultánea, **derivar a B3** la base exacta de reducción sin inventar una fórmula universal |
| GOB-35 | Goblin atraviesa a criatura Mediana junto a enemigo con Técnica de Reacción válida | Escurridizo no anula el disparador; tampoco existe **Ataque de Oportunidad universal** por simplemente dejar alcance |
| GOB-36 | Goblin queda detenido por obstáculo al intentar cruzar un espacio ocupado | No puede **terminar Movimiento** dentro de otra criatura. Registrar como adjudicación **propuesta** el requisito preventivo de ruta legal; B3 debe resolver interrupción/costes sin crear regla canónica |
| GOB-37 | Hobgoblin explota mapa recién hallado para atacar a objetivo cuya debilidad se ha descubierto efectivamente | Un **ataque es una prueba**: Ojo puede aportar +1 si oportunidad concreta es real y declaración previa; no prohíbe Ataque en general ni añade ataque extra |
| GOB-38 | Un Goblinoide recibe Ayuda válida y usa Ojo frente a un cambio real | Ayuda concede normalmente **Ventaja** y Ojo **+1** a la prueba válida. No hay techo circunstancial numérico universal; aplicar reglas específicas de fuentes equivalentes y no multiplicar Ayudas |
| GOB-39 | Ojo se declara después de conocer un fallo y se argumenta que hubo una «nueva oportunidad» | No retroactivo. La información posterior puede fundar otra acción legal, pero no reescribir la primera tirada |
| GOB-40 | Se obtiene realmente información nueva después de una primera prueba fallida | Repetir exige un cambio significativo conforme §2 y Acción/tiempo adecuados; Ojo no añade intento ni exime costes. Sólo un uso por Escena |
| GOB-41 | Hobgoblin intenta extraer Ventaja de la «Mesa de Tres Voces» sin contribuyente real | No: cultura no otorga Ayuda, rango, acción o bonificación por título. Confirmar la pertinencia de Ayuda por reglas universales |
| GOB-42 | Bugbear de Escala Mediana carga un objeto inerte al límite de lo plausible | Cuenta **Grande sólo para Carga**; no recibir +FUE, ventaja general, fórmula de kg ni equipo Grande |
| GOB-43 | Bugbear mueve objeto inerte mediante fuerza bruta y luego intenta Empujar una criatura | Escala Grande efectiva en primer caso; **Mediana** en Empujar y demás maniobras contra criaturas |
| GOB-44 | Bugbear compra Corpulento o Masivo con 3 PR normales | Vida adicional según el Rasgo, sin Escala/arma Grande; no añadir «Corpulencia Bugbear» a Vida ni duplicar paquetes |
| GOB-45 | Un Goblin de Escala Pequeña intenta atravesar Goblin también Pequeño, sin otro permiso | Escurridizo no aplica; tampoco puede convertir espacio ocupado en pasaje legal sólo por su anatomía |

**Registros de B3/B4:** medir frecuencia de activación de Ojo por familia, utilidad de Hobgoblin solo con Ojo, ocupación en geometría real, orden de Reacciones, Correr/Retirada/Exhausto e impacto de la diferencia entre Escala efectiva Grande del Bugbear y +1 FUE efectiva de Orco. Ningún escenario de esta sección se ejecutó con Foundry o en mesa.


## B3. Regresiones de exploits y secuencias GOB-46 a GOB-69

**Evidencia:** todos los nuevos casos son **DOC**, hipótesis y resultados por lectura, **no ejecuciones en Foundry ni partidas**. Un modelo auxiliar JS específico clasifica **20 escenarios de oportunidad y costes de cruce** y obtuvo 20 coincidencias con resultados esperados; su valor no es el de una prueba del motor. Ver \`auditorias/modelo_auxiliar_b3_goblinoides.js\`.

| ID | Secuencia adversarial | Resultado previsto / cuestión abierta |
|---|---|---|
| GOB-46 | Gobernante Hobgoblin ordena Ayuda automática de sus subordinados por «Cohesión» | **No existe rasgo racial Cohesión** ni Liderazgo gratuito; Ayuda exige contribución real y circunstancias válidas |
| GOB-47 | Información recién obtenida revela paso; Goblin usa Ojo para una prueba de Sigilo pertinente | Puede conceder **+1 a la prueba concreta**, 1/Escena y antes de tirar; no concede Sigilo, Acción ni el conocimiento que todavía no posee |
| GOB-48 | El mismo mapa se invoca como «cinco decisiones nuevas» en cinco pruebas | No fraccionar la misma circunstancia en oportunidades diferentes, aunque cambie la prueba; registrar la novedad real |
| GOB-49 | El mapa ya usado aparece otra Escena, sin cambio nuevo, y Ojo se recarga | Recargar **uso por Escena** no convierte automáticamente el **mismo hecho** en oportunidad nueva; evaluar si realmente existe cambio/disparador independiente |
| GOB-50 | Atacante descubre debilidad real de adversario y activa Ojo antes de Ataque legítimo | Una **prueba de Ataque** puede recibir +1 si la oportunidad concreta se explota de verdad; no +1 Daño/Penetración, ni nuevo ataque |
| GOB-51 | Declara Ojo al ver que la prueba falló y reinterpreta el fallo como oportunidad | No retroactividad. Repetición exige cambio significativo por §2 y recursos de nueva prueba |
| GOB-52 | Otro personaje aporta Ayuda válida sobre oportunidad documentada; Ojo se aplica | **+1 Ojo** y **Ventaja por Ayuda** pueden coexistir si cada fuente es legítima; no hay techo general de bonificaciones circunstanciales escrito |
| GOB-53 | Dos ayudantes reclaman 4d10, además de Ojo | Varias Ventajas no apilan: Ventaja usa **3d10 conservar dos mayores**; Ojo sigue +1 si corresponde |
| GOB-54 | Ayuda válida + Desventaja por obstáculo + Ojo legítimo | Ventaja y Desventaja se cancelan; la prueba normal mantiene +1 de Ojo cuando el disparador sigue vigente |
| GOB-55 | Ojo usado para deducir de oficio contraseña, Hechizo, debilidad o ruta no observados | No radar, no Identificación, Arcana, Investigación, ingeniería o información gratuita |
| GOB-56 | Jugador activa Ojo en Iniciativa sólo por afirmar «soy oportunista» | No bono racial automático. **B3/B4:** como Iniciativa es tirada 2d10+PER, evaluar si caso excepcional con hecho real explotado cumple «prueba» sin asignar +1 permanente |
| GOB-57 | Goblin MOV6 atraviesa 1 espacio ocupado Mediano con hueco real, luego entra en 1 libre | **2+1=3 puntos de MOV**, quedan 3; ninguna Acción adicional |
| GOB-58 | Dos espacios ocupados sucesivos por criaturas Medianas, después 1 libre, huecos y ruta válidos | **2+2+1=5 MOV**, queda 1 de MOV6; no teletransporte |
| GOB-59 | Goblin inicia **Retirada** bajo amenaza activa, MOV6, transita 1 ocupado +1 libre | Tramo de Retirada **máximo 3** (mitad base), ruta cuesta **3**; Reacciones habilitadas continúan |
| GOB-60 | Goblin Exhausto MOV6→4 quiere ruta 2+2+1 en el mismo tramo | **5 puntos de coste superan 4**; no recuperar MOV por ser pequeño. **B3/B5** orden con Retirada/Correr y Exhausto |
| GOB-61 | Goblin dispone sólo de 2 MOV y propone entrar en Mediano (2) para acabar Movimiento dentro | Canon **prohíbe terminar movimiento** ahí. Comprobar previamente salida y coste es **medida preventiva PROPUESTA**, no regla literal de activación |
| GOB-62 | Reacción legal adversaria interrumpe cruce cuando Goblin está en espacio ocupado | **ABIERTO B3/B5:** resultado físico, devolución o no de MOV y ubicación legal tras interrupción. No crear rebote, daño, ataque o salto gratuitos |
| GOB-63 | Goblin cruza junto a enemigo sin Técnica ni reacción habilitada y DJ aplica Ataque de Oportunidad universal | **No existe Ataque de Oportunidad universal** en el núcleo por abandonar alcance; Escurridizo tampoco cancela reacción que sí esté habilitada |
| GOB-64 | Escurridizo intenta atravesar Goblin Pequeño, muro o Mediano sin hueco físico | Capacidad no lo permite: tamaño objetivo **Mediana o mayor**, paso físico real y sin barreras |
| GOB-65 | Goblin Derribado (levantarse cuesta 2 MOV) y luego intenta tránsito 2+1 con MOV6 | **2+2+1=5 MOV** si puede levantarse y hueco/salida existen; no puede Correr mientras siga Derribado |
| GOB-66 | Goblin Agarrado intenta usar Escurridizo para alejarse sin soltar Presa | **Agarrado MOV0 para alejarse**, por lo que Escurridizo no crea desplazamiento ni permite escapar sin acción válida |
| GOB-67 | Bugbear se declara Grande para usar arma/armadura Grande, aumentar alcance y empujar criatura | **No:** sigue Mediano real; Grande efectiva únicamente para Carga y fuerza contra objetos inertes, no arma, Defensa, Ataque, Maniobras |
| GOB-68 | Bugbear usa fuerza bruta sobre caja abandonada, luego arma activamente sostenida por enemigo | Primer caso puede aplicar Grande efectiva, el segundo es oposición/Desarmar y **no** aplica; tampoco concede +1 FUE numérico |
| GOB-69 | Goblinoide queda a **0 Vida/Incapacitado** y pretende obtener Reacción, Movimiento, curación o Segundo Ojo | Aplican Incapacitado/Trauma/Descanso normalmente. Ojo no es curación ni genera nuevas acciones; ninguna de tres variedades evita Fatiga por raza |

**Total actualizado:** **69 criterios DOC** (\`GOB-01–GOB-45\` originales/B2 y \`GOB-46–GOB-69\` B3). **MOD:** 20 escenarios del modelo auxiliar, 20/20 coincidencias, con dos etiquetas explícitas de procedimiento no ratificado (\`SALIDA_ILEGAL_PROPUESTA_PREVIA\` y \`INTERRUPCION_ABIERTA\`). **ENV Foundry: 0**; **MESA: 0**.

**Transversales abiertos B4/B5:** coste y ubicación ante interrupción de tránsito, precedencia de Retirada+Correr+Exhausto, excepcionalidad de Ojo sobre Iniciativa, reuso de circunstancias en escenas distintas y frecuencia real de oportunidades. La pauta preventiva de comprobar ruta completa se conserva como **propuesta de mesa** y no sustituye la literalidad del paquete.
