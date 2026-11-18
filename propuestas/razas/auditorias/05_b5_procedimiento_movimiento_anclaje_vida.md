# B5 — Procedimiento transversal I01/I02/I10: movimiento, anclaje, interrupción, caída y 0 Vida

**17-11-2026 — PROPUESTA NO CANÓNICA; NO APROBADA.** Fuentes revisadas: `main:docs/Tierra_Magica_Manual_Maestro.md` blob `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`; B5-I01, B5-I02, B5-I11, B5-I09 y acta global. **No se han ejecutado tests en Foundry ni mesa**. Las secuencias siguientes son criterios de revisión documental y procedimientos reproducibles, no resultados de un motor.

## 1. Orden de resolución propuesto (I01 + I02 + I10)

**Regla editorial propuesta B5-PROC-P01.** Para cada gasto o efecto que afecte a la posición: (1) fijar posición, altura, medio, soporte, Escala real, estados, Carga, Vida y recursos al inicio; (2) comprobar que el personaje puede declarar la Acción/Movimiento/Reacción y pagar el coste; (3) seleccionar medio y velocidad efectiva en el instante, o Escala efectiva **sólo** para la resistencia expresamente autorizada; (4) comprobar distancia, línea, objetivo y legalidad del efecto; (5) resolver prueba y daño/Trauma; (6) aplicar desplazamiento, estados y pérdida de soporte; (7) comprobar si el personaje queda a 0 Vida, Incapacitado, o sin apoyo; (8) resolver caída por reglas generales cuando corresponda; (9) conservar únicamente efectos pasivos que no exijan activación, soporte o gasto continuo inexistente; (10) registrar el estado final. **No permite una Acción nueva tras 0 Vida.**

La prioridad del paso (5) frente a (6) en impactos simultáneos, y la aplicación del daño de caída cuando el mismo efecto causa 0 Vida, **son propuestas editoriales**, no secuencia explícita del canon. Si la fuente del efecto fija orden propio, prevalece.

## 2. Movimiento multimodal y Retirada (I01)

**B5-PROC-P02.** Se mantiene la propuesta de B5-I01: cada tramo usa presupuesto fraccional exacto `F = Σ(c/V_medio) ≤ 1`; se valida medio/Carga antes de cada paso. **Retirada:** el manual establece mitad del MOV normal redondeada hacia abajo en un medio homogéneo; para varios medios se propone presupuesto fraccional `F ≤ 1/2` y se exige que reproduzca el límite canónico en cada tramo homogéneo (cuando el redondeo de espacios lo requiera, usar el menor resultado permitido). **Correr** cuesta Acción y abre tramo adicional con presupuesto independiente, nunca duplica el mismo tramo sin Acción. Ejemplo Coralio 2 suelo + 3 agua: `2/5 + 3/6 = 9/10` legal como Movimiento ordinario; 3 suelo + 3 agua `3/5 + 3/6 = 11/10` ilegal. Ejemplo Hada 2 suelo + 3 aire `2/5+3/6=9/10`, legal **sólo** si el turno empieza y termina apoyado y Carga no es Pesada/Excesiva. La validación de apoyo final no se sustituye por una caída elegida como «aterrizaje».

**Reserva de implementación:** el caso Retirada multimodal con `F≤1/2` puede divergir del redondeo del canon cuando MOV impar y cambio de medio; se etiqueta **bloqueo para automatización**, no norma ratificada.

## 3. Enraizar y pérdida de suelo (I02)

**B5-PROC-P03.** Dríade y Verdante pagan **una Acción** para Enraizar en suelo apropiado; no se desplazan voluntariamente mientras sigan enraizados; liberación voluntaria cuesta **1 MOV**. Escala efectiva +1 categoría se usa **sólo** para resistir Empujar, Derribar y desplazamiento físico impuesto; no altera Daño, Defensa general, Carga ni Escala real. Para Empujar: resolver prueba normal y después modificar desplazamiento por Escala efectiva, según reglas generales. Para Martillo Cinético, el daño **3** se resuelve aunque el desplazamiento sea **0** por anclaje; cuesta **5 Maná** al lanzador conforme a canon. Para Derribar: no otorgar inmunidad ni +1 universal a Defensa; registrar explícitamente que la equivalencia numérica de Escala en Derribar **no está definida** y requiere adjudicación editorial.

**Pérdida de soporte propuesta:** si el suelo deja de existir, marcar `enraizado=false` antes de aplicar cualquier beneficio de resistencia posterior, resolver posición/caída con el sistema general; no cobrar 1 MOV por una **ruptura forzada** del soporte, porque no es liberación voluntaria. Si suelo y Empujar se destruyen simultáneamente, registrar el orden de efectos y no duplicar resistencia. A 0 Vida, el cuerpo puede conservar raíces físicamente si el suelo persiste, pero no puede gastar Acción/MOV ni ganar nuevas resistencias fuera de las que el estado ya concede; persistencia exacta de la bonificación **queda pendiente de ratificación**.

## 4. Incapacitación, efectos sostenidos y caída (I10)

**B5-PROC-P04.** Distinguir (a) rasgo pasivo anatómico, (b) efecto activo con coste/sostenimiento, (c) vínculo o dispositivo con requisito de contacto, (d) apoyo físico, (e) movimiento voluntario. **A 0 Vida:** Incapacitado, aplicar Trauma general, sin nuevas Acciones/Reacciones/MOV voluntarios. Un rasgo anatómico (Protección Natural Coralio) no desaparece por estar incapacitado. Un efecto que exige Acción, concentración, consentimiento continuado o Energía no se mantiene gratuitamente por ascendencia; consultar texto específico del subsistema. El contacto de una interfaz o red puede seguir físicamente presente, pero no autoriza transmisiones activas nuevas. En vuelo Hada sin apoyo tras interrupción, aplicar caída general, sin teletransporte a apoyo seguro ni inmunidad por alas. Un Hada ya posada no cae retrospectivamente.

## 5. Guiones de aceptación reproducibles — DOC, no ejecutados

| ID | Estado inicial | Acción/interrupción | Resultado documental esperado |
|---|---|---|---|
| PROC-T01 | Coralio suelo MOV5, agua MOV6 | 2 suelo + 3 agua | F=9/10; no dos reservas |
| PROC-T02 | Coralio mismo | 3 suelo + 3 agua | F=11/10; último paso no legal |
| PROC-T03 | Hada Pequeña apoyada, Carga ligera | 2 suelo + 3 aire, final apoyado | F=9/10, permitido |
| PROC-T04 | Hada igual, sin apoyo final | termina suspendida | No permitido |
| PROC-T05 | Hada pasa a Carga Pesada | intenta tramo aéreo | Vuelo no disponible |
| PROC-T06 | Hada en aire | queda Agarrada y sin desplazamiento | No evade Agarrar; revisar caída |
| PROC-T07 | Hada en aire Vida 1 | impacto a 0 Vida | Incapacitado, sin aterrizaje activo, resolver caída |
| PROC-T08 | Hada apoyada Vida 1 | impacto a 0 Vida | No caída aérea retroactiva |
| PROC-T09 | Dríade Mediana suelo apto | Enraizar | Acción, inmóvil, Escala efectiva Grande sólo resistencia |
| PROC-T10 | Dríade enraizada | Empujar margen Claro, atacante Mediano | Aplicar reducción de desplazamiento por Escala, no Defensa universal |
| PROC-T11 | Verdante enraizado | Martillo Cinético | Maná5, Daño3, desplazamiento0 por anclaje |
| PROC-T12 | Verdante enraizado | Derribar | Sin inmunidad; equivalencia numérica pendiente |
| PROC-T13 | Verdante enraizado | suelo destruido | Anclaje cesa, caída si procede, sin 1 MOV voluntario |
| PROC-T14 | Dríade enraizada a 0 Vida | intenta liberar y caminar | No Movimiento voluntario |
| PROC-T15 | Coralio con armadura Protección2 a 0 Vida | recibe impacto | Protección2, no 3 ni 0 por inconsciencia |
| PROC-T16 | Cristálido interfaz activa a 0 Vida | solicita nueva activación | No Acción; persistencia según dispositivo |
| PROC-T17 | Micelio Enlace activo a 0 Vida | solicita nueva transmisión | No Acción; revisar enlace pasivo según fuente |
| PROC-T18 | Hada usa Retirada con MOV impar | cruza suelo/aire | Marcar diferencia de redondeo como pendiente |
| PROC-T19 | Terio volador con Carga Pesada | Correr por aire | No vuelo ni Correr aéreo por Carga |
| PROC-T20 | Dríade enraizada sin suelo | nuevo Empujar | No bonificación de anclaje |

**Reproducibilidad:** registrar por caso `turno, medio, c, V, F, Acción, Reacción, Carga, Vida, Trauma, apoyo, altura, estado anclaje, resultado de tirada, daño, desplazamiento y posición final`. Repetir con una prueba de fallo y una de éxito para maniobras. La tabla **no certifica resultados de Foundry**.

## 6. Decisiones y pendientes

**Alternativas descartadas para la propuesta:** sumar velocidades, reiniciar MOV al cambiar medio, inmunidad a Derribar, recuperar Vida por Enraizar, aterrizaje gratuito al incapacitarse y mantener interfaces activas sin gasto. **Bloqueos restantes:** Retirada con MOV impar y varios medios; secuencia exacta de daño/desplazamiento/caída en impactos simultáneos; categoría efectiva en Derribar; persistencia de anclaje y de sostenimientos a 0 Vida. El presente anexo **resuelve editorialmente el orden propuesto** y ofrece 20 casos concretos, pero no convierte I01/I02/I10 en reglas canónicas ni certifica cierre global B5. Siguiente unidad: red micelial I04 y Conductor Vivo I08, con contrato de consentimiento y desconexión.
