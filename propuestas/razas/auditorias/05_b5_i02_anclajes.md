# B5-I02 — Enraizar Dríade/Verdante: maniobras, magia y soporte

**17-11-2026. RESOLUCIÓN DOCUMENTAL PROPUESTA; NO CANÓNICA NI APROBADA.** Fuentes: tablero, README, plan, matriz B5, B2/B4 de Feéricos y Verdantes; `main:docs/Tierra_Magica_Manual_Maestro.md` blob `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`, paquetes v0.3, Escala, Derribar, Empujar, Movimiento, `Martillo Cinético`, 0 Vida y Caídas. No hay ejecución de regresiones en Foundry ni mesa.

## 1. Frontera del canon y diagnóstico

| Interfaz | Texto canónico comprobado | Silencio / riesgo |
|---|---|---|
| Dríade | Enraizar: **Acción**, suelo apropiado, +1 categoría de Escala efectiva **sólo para resistir Empujar, Derribar y desplazamiento físico impuesto**; liberarse cuesta **1 Movimiento** | No especifica momento exacto de pérdida de soporte ni 0 Vida |
| Verdante | Mismo efecto de Enraizar; además Sustento Vegetal y Bioma propios | No hereda Vínculo Arbóreo ni otra ventaja Feérica |
| Empujar | Acción, FUE+Atletismo vs Defensa de Maniobra; margen Ajustado 1, Claro 2, Dominante 3 espacios; una categoría mayor reduce 1 (mínimo 1), dos mayores impiden desplazamiento ordinario sin palanca/capacidad | ¿La Escala efectiva afecta sólo distancia o también viabilidad? |
| Derribar | Acción contra Defensa de Maniobra; éxito aplica Derribado, levantarse 2 MOV, sin Defensa perdida automáticamente | No hay regla explícita de inmunidad a Derribar por Enraizar |
| Martillo Cinético | Maná 5; INT+Canalización vs Defensa Corporal, alcance Medio, **Daño 3**; desplaza 2/1/0 según diferencia de Escala, y **0 si el objetivo está anclado** | La palabra «anclada» no define lista exhaustiva de anclajes |
| Movimiento / 0 Vida | Agarrado no puede alejarse; Exhausto MOV −2 mínimo1; 0 Vida implica Incapacitado y Trauma según reglas | No dice que Incapacitado destruya raíces físicas; tampoco permite Acción o Reacción extra |

**Conclusión de auditoría:** Enraizar no es un +1 general a Defensa de Maniobra, ni inmunidad a Derribar, ni reducción de daño. Los dos paquetes comparten literalmente el efecto de anclaje, pero difieren en biología, lore y demás rasgos.

## 2. Propuestas transversales costeadas

### B5-I02-P01 — Estado único de anclaje racial

**Disparador:** Dríade o Verdante usa su Acción de Enraizar sobre suelo físicamente apropiado. **Coste:** Acción completa; liberación voluntaria cuesta **1 punto de Movimiento**, sin Acción extra inventada. **Alcance:** propio cuerpo en suelo apto, sin radio; **duración:** mientras permanece enraizado y el suelo soporta el anclaje. **Límites:** una sola categoría efectiva mayor **sólo** al resistir Empujar, Derribar y desplazamiento físico impuesto. No acumula múltiples Enraizar ni aumenta FUE, Defensa, Daño, Protección, Carga, Alcance, tamaño, capacidad de equipo o iniciativa.

**Adjudicación propuesta:** marcar `enraizado=true` una vez consumida la Acción y verificado el soporte. La categoría efectiva se aplica al **componente de desplazamiento/resistencia física**, sin modificar la tirada contra Defensa de Maniobra salvo regla explícita distinta. La condición de inmovilidad impide desplazamiento voluntario mientras persiste; liberar consume 1 MOV antes de moverse. No conceder liberación gratis por iniciar Retirada, Correr, usar un hechizo o recibir Ayuda. Un anclaje físico de otra fuente debe cumplir su propia regla; no copiar Enraizar racial.

### B5-I02-P02 — Empujar, Derribar y Martillo Cinético

**Disparador:** maniobra física o hechizo de impacto dirigido a un personaje enraizado. **Coste:** Acción del atacante y recursos habituales (Martillo Cinético, **5 Maná**); **alcance/duración:** sólo resolución del efecto concreto.

- **Empujar:** resolver prueba ordinaria contra Defensa de Maniobra, después calcular desplazamiento con categoría efectiva. Ejemplo: atacante Mediano contra Dríade Mediana enraizada → objetivo efectivo Grande, margen Claro 2 pasa a **1 espacio**; margen Ajustado 1 queda **1** por mínimo; atacante Pequeño frente a objetivo efectivo Grande → **0** desplazamiento corporal ordinario sin palanca/capacidad. No se anula éxito ni se añade Defensa.
- **Derribar:** se mantiene la tirada y el estado Derribado con éxito; +1 categoría efectiva **no significa inmunidad**, y el canon no ofrece conversión numérica explícita de Escala para Derribar. **Opción editorial propuesta:** exigir justificación física de palanca/agarre al intentar Derribar anclado; si la ficción lo permite, resolver contra Defensa de Maniobra normal y aplicar Derribado. La aplicación de categoría a viabilidad de Derribar **permanece abierta** para B5 transversal; no inventar +1 Defensa ni anular la maniobra por defecto.
- **Martillo Cinético:** proponer equivalencia explícita entre `enraizado=true` válido y la cláusula canónica «anclada» **sólo para desplazamiento 0**; **Daño 3** se resuelve contra Defensa Corporal y Protección normalmente. No inmunidad a impactos, ni Maná ahorrado, ni rebote. Un personaje que ya perdió soporte no satisface automáticamente «anclado».

### B5-I02-P03 — Ruptura de soporte y desplazamiento legítimo

**Disparador:** suelo se destruye, arranca o deja de ser apropiado, o una fuerza con regla explícita desplaza al objetivo pese al anclaje. **Coste:** ninguno nuevo; no generar Reacción/Acción gratuita. **Alcance:** estado de anclaje del objetivo; **duración:** transición al perder soporte.

**Secuencia propuesta:** (1) resolver primero el evento que altera suelo o posición según reglas de su efecto; (2) registrar casilla, altura, soporte, estado y turno; (3) cuando deje de existir el requisito físico, retirar `enraizado` y su bonificación **antes de la próxima resolución independiente**; (4) aplicar caída/terreno/Trauma conforme a reglas generales, sin daño automático por «arrancar raíces» ni caída suspendida. **Ventana de interrupción dentro de una misma resolución y daño de arrancamiento quedan ABIERTOS** hasta norma transversal; no asumir ataque de oportunidad ni reacción de rescate.

### B5-I02-P04 — 0 Vida, Agarrado y liberación

**Disparador:** enraizado llega a 0 Vida, queda Agarrado o sufre otro estado impeditivo. **Coste:** 1 MOV para liberación **voluntaria cuando legalmente pueda gastar Movimiento**; ninguna Acción extra. **Alcance:** personaje; **duración:** hasta que soporte y estados permitan cambiar posición.

**Opción preferida para contraste:** a 0 Vida el personaje queda Incapacitado; raíces ya fijadas **pueden permanecer físicamente** mientras soporte persista, pero no se inicia ni libera Enraizar voluntariamente ni se usa como curación o defensa universal. El tratamiento de la categoría efectiva en 0 Vida debe compararse con cuerpos inertes, Agarrado y caída; **no decidir como canon**. Si Agarrado y enraizado coinciden, liberarse de raíces no cancela Presa ni su MOV0; resolver ambos impedimentos por separado. Descanso Completo no es una Acción de liberación ni Enraizar cura Vida/Maná.

## 3. Decisiones de compatibilidad y alternativas

| Pregunta | Alternativa descartada | Preferencia no canónica | Reserva |
|---|---|---|---|
| Escala | +1 a toda Defensa, Carga y Daño | Sólo resistencia enumerada | Derribar sin tabla numérica de Escala |
| Martillo | Inmunidad total al hechizo | 0 desplazamiento, Daño3 permanece | Definición transversal de «anclado» |
| Suelo perdido | Conservar ventaja flotando | Cesar al perder soporte | Instante en resolución simultánea |
| 0 Vida | Cura automática o liberación gratis | Mantener estado físico sin Acciones nuevas | Si categoría defensiva persiste |
| Presa | Raíces cancelan Agarrado | Estados independientes, MOV0 manda | Orden de liberaciones |
| Carga/Exhausto | Escala Grande aumenta capacidad | No; liberación 1 MOV disponible sólo si MOV legal | Agarrado/Colapsado |

**Cruces:** X07-10 (Dríade/Verdante), X02-10 (Enano/Verdante), X02-07 (Enano/Dríade), X07-09 (anclaje frente a hechizos) y B5-G04/G05/G11.

## 4. Regresiones B5-I02 — 18 especificaciones DOC, NO ejecutadas

| ID | Escenario | Resultado esperado / cuestión abierta |
|---|---|---|
| B5-I02-T01 | Dríade enraiza sobre tierra apta | Consume Acción; marca estado |
| B5-I02-T02 | Verdante enraiza sobre tierra apta | Mismo coste y beneficio físico |
| B5-I02-T03 | Intento sobre piso sin suelo apto | No se concede estado por apariencia |
| B5-I02-T04 | Enraizar dos veces | No +2 categorías ni beneficios dobles |
| B5-I02-T05 | Enraizado reclama +1 Defensa | No bonificación numérica general |
| B5-I02-T06 | Enraizado reclama Carga Grande | No mejora de Carga |
| B5-I02-T07 | Mediano Empuja margen Claro 2 a enraizado Mediano | 1 espacio por categoría mayor |
| B5-I02-T08 | Mediano Empuja margen Ajustado 1 | 1 espacio mínimo tras éxito |
| B5-I02-T09 | Pequeño Empuja a enraizado Mediano | Dos categorías: 0 sin palanca apropiada |
| B5-I02-T10 | Derribar enraizado | Acción/tirada normal; viabilidad física B5 abierta |
| B5-I02-T11 | Enraizado derribado intenta Correr | No puede Correr mientras Derribado |
| B5-I02-T12 | Martillo Cinético impacta anclado válido | Daño3 normal, desplazamiento0 propuesto |
| B5-I02-T13 | Martillo impacta después de perder suelo | No cláusula de anclaje sin soporte |
| B5-I02-T14 | Destruyen suelo bajo raíces | Registrar caída; cesa estado cuando soporte desaparece |
| B5-I02-T15 | Enraizado decide moverse | Liberar cuesta 1 MOV antes del desplazamiento |
| B5-I02-T16 | Enraizado está Agarrado | Liberar raíces no elimina Presa/MOV0 |
| B5-I02-T17 | Enraizado llega a 0 Vida | Sin Acción ni curación; persistencia física abierta |
| B5-I02-T18 | Enraizado Exhausto (MOV4) se libera | 1 MOV de los 4; no coste de Acción extra |

**Plan de ejecución futura:** repetir T07–T10 con Dríade y Verdante y atacantes Pequeño/Mediano/Grande; T12–T14 con suelo intacto/destruido y hechizo antes/después del evento; T16–T18 con estados simultáneos. Registrar tirada, Defensa, Escala base/efectiva, gasto de Acción/MOV/Maná, resultado, ventana y fuente. **DOC ≠ simulación ≠ Foundry ≠ mesa**.

## 5. Dictamen

**B5-I02 tiene propuesta de resolución documental, no cierre empírico.** La equivalencia de Enraizar Dríade/Verdante se preserva sin convertirlo en inmunidad; los puntos aún abiertos son la viabilidad de Derribar por Escala, interrupción simultánea del soporte y persistencia defensiva a 0 Vida. No editar Manual Maestro ni Foundry. **Siguiente: B5-I03, sentidos y detección entre Élficos, Ankar, Cristálidos, Micelios y Coralios.**
