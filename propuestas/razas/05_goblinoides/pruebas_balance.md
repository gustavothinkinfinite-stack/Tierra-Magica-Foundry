# Goblinoides — 30 pruebas documentales de aceptación y exploits v0.1
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
