# B5-I06 — Goblinoides: Ojo, Escurridizo y paridad Hobgoblin

**17-11-2026 · PROPUESTA NO CANÓNICA · NO APROBADA.** Verificados tablero, README, plan, matriz B5, B2–B4 Goblinoides y `main:docs/Tierra_Magica_Manual_Maestro.md` (blob `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`). Se diseñan casos documentales; **0 pruebas nuevas ejecutadas en Foundry o mesa**.

## 1. Canon y límites

| Paquete | Escala/MOV | Beneficios canónicos | Exclusiones |
|---|---|---|---|
| Goblin | Pequeña / 6 | Ojo para la Oportunidad; Escurridizo | No Sigilo, inmunidad a Reacciones ni paso por barreras |
| Hobgoblin | Mediana / 6 | Ojo para la Oportunidad | No Liderazgo, Ayuda automática, armas ni Ingeniería gratis |
| Bugbear | Mediana / 6 | Ojo para la Oportunidad; Complexión Bugbear | Grande efectiva sólo Carga/fuerza bruta contra **objetos inertes**, no Daño, Alcance, maniobras, Defensa ni armas Grandes |

**Ojo para la Oportunidad:** **1/Escena**, declarar **antes de una prueba**, +1 si explota una oportunidad concreta originada en información recién obtenida, cambio real de situación o debilidad concreta ya descubierta. No crea información ni permite reutilizar la misma circunstancia con otro nombre. No se limita a PER: puede afectar prueba marcial o mágica si la oportunidad es real. **Escurridizo:** sólo Goblin, atraviesa espacio de criatura Mediana o mayor **si existe hueco físico**, con coste de terreno difícil, sin terminar dentro y sin anular Reacciones válidas. Motor: 2d10 + atributo + habilidad + modificadores; Ayuda requiere contribución significativa; Iniciativa y Reacciones siguen sus propios disparadores.

## 2. Resoluciones propuestas y coste

### B5-I06-P01 — Registro verificable de oportunidad [PROPUESTA]

**Disparador:** hecho concreto conocido y aprovechable antes de la tirada. **Coste:** consume único uso de Ojo de la Escena al declararlo legalmente; no Acción, Reacción, PR o información adicional. **Alcance:** una prueba propia que aproveche ese hecho; **duración:** esa prueba. **Límites:** registro `hecho / momento de descubrimiento / método de aprovechamiento / prueba / uso consumido`; el mismo hecho no vuelve a habilitar Ojo al repetir la prueba o en otra formulación. Una nueva Escena restablece el uso, pero **no transforma un dato viejo en información recién obtenida**; sólo una nueva oportunidad realmente distinta lo habilita.

**Iniciativa:** si la Iniciativa es una prueba y el Goblinoide puede señalar una oportunidad concreta **conocida antes de tirar** que afecta a su respuesta inmediata, proponer elegibilidad condicional de +1; no convertir Ojo en +1 permanente a Iniciativa. Un adversario descubierto *después* de determinar el orden no retroactiva la tirada. **Reserva editorial:** precisar cuándo se considera conocida una oportunidad al comenzar combate y cómo distinguir percepción de iniciativa.

### B5-I06-P02 — Tránsito Escurridizo, coste e interrupción [PROPUESTA]

**Disparador:** Goblin inicia paso voluntario hacia espacio ocupado por criatura Mediana o mayor. **Coste:** terreno difícil: **2 puntos de Movimiento por espacio transitado**, salvo coste superior explícito; sin Acción/Reacción extra. **Alcance:** espacio de criatura con hueco físico suficiente; **duración:** durante el tránsito, no concede ocupación final.

**Secuencia:** (1) verificar Escala del ocupante y hueco físico real, (2) comprobar MOV disponible y restricciones (Agarrado, Derribado, Incapacitado, Carga), (3) identificar Reacciones **con disparador válido** y resolverlas en su ventana canónica, (4) pagar el coste aplicable al espacio atravesado y actualizar posición si la resolución permite seguir, (5) exigir **destino final libre** al terminar Movimiento. Si una Reacción detiene desplazamiento, no teletransportar al Goblin a la salida; registrar posición y resolver la **ocupación ilegal** por regla general o adjudicación explícita de interrupción. **No inventar expulsión gratuita**.

**Caso límite abierto:** el canon no especifica ocupación cuando el Movimiento termina involuntariamente en la casilla ajena; preferencia documental: **no iniciar tránsito si no hay suficiente MOV para llegar a una salida legal**, salvo que el sistema tenga regla explícita para interrupciones. No extender Escurridizo a Pequeños, objetos, paredes, barrotes cerrados o casillas sin hueco. Correr conserva coste de Acción y terreno difícil.

### B5-I06-P03 — Paridad Hobgoblin sin talento cultural gratuito [PROPUESTA]

**Disparador:** evaluación comparativa de los tres paquetes en creación. **Coste:** **ninguno nuevo en la versión preferida**, porque no se añade rasgo. **Alcance:** identidad racial y presupuesto de 25 PD/3 PR comunes; **duración:** permanente como criterio editorial, no poder jugable.

**Diagnóstico:** Goblin tiene Ojo + movilidad situacional; Bugbear Ojo + carga/fuerza inerte; Hobgoblin sólo Ojo, MOV6 y Escala Mediana. **Asimetría verificable de cantidad de beneficios**, pero no equivalencia automática de valor: Pequeña puede implicar límites y la movilidad del Goblin es condicional; la ventaja del Bugbear tampoco es general. **Resolución preferida:** conservar paquete canónico en esta fase, marcar `PARIDAD PENDIENTE DE MEDICIÓN`, contrastar frecuencia y valor en escenarios idénticos. **Alternativa explícita, NO APROBADA:** `Disciplina Preparada`, **1/Escena**, antes de una prueba propia de coordinación táctica, elegir **+1 sólo si** el personaje gastó previamente una **Acción completa** en preparar una orden/plan concreto con aliado presente y éste aceptó; la preparación debe producir un hecho útil distinto del mero entrenamiento cultural. No se acumula con Ojo en la misma prueba; no da Ayuda, Acción ni Reacción adicional. **Coste real: Acción previa + uso por Escena; no implantar sin balance y aprobación.** Alternativa descartada: +1 permanente a Liderazgo/Iniciativa o Ayuda gratuita por ser Hobgoblin.

### B5-I06-P04 — Compatibilidad de Complexión Bugbear [PROPUESTA]

**Disparador:** Carga, levantar o fuerza bruta contra objeto inerte. **Coste:** ninguno nuevo. **Alcance:** sólo esos cálculos; **duración:** tarea. **Exclusiones:** Grande efectiva no significa Escala Grande real, no suma +1 FUE Orca, no mejora Empujar, Derribar, Agarrar, Daño, Alcance, armas, Defensa ni tamaño de espacio. Arrastrar enemigo o cadáver debe clasificarse según reglas de Carga/maniobras sin convertir al objetivo en objeto inerte de forma oportunista. Registrar comparación X02-05 y X04-05 sin copiar resistencias enanas ni Complexión Orca.

## 3. Secuencias reproducibles

| Caso | Estado inicial | Secuencia | Resultado documental propuesto |
|---|---|---|---|
| Ojo e Iniciativa | Hobgoblin oye alarma auténtica antes de Iniciativa, uso libre | Registrar alarma → declarar Ojo → tirar Iniciativa | +1 **condicional**, no bono universal; interpretación editorial abierta |
| Ojo tardío | Goblin ya tiró Iniciativa | Descubre enemigo → pide +1 retroactivo | Denegar |
| Ojo y ataque | Bugbear descubre punto débil real, uso libre | Declarar ataque aprovechando dato → Ojo antes de dados | +1 a prueba pertinente, no Daño |
| Ojo repetido | Mismo punto débil, segundo intento | Renombrar «flanco» como «brecha» | No nueva oportunidad por cambio de nombre |
| Escurridizo | Goblin MOV6, ocupante Mediano con hueco, salida libre | Entrar espacio ocupado (2 MOV) → salir (coste normal si no es difícil) | Tránsito legal si coste y Reacciones permiten |
| Escurridizo bloqueado | Goblin MOV1 y espacio ocupado exige 2 | Intentar entrar | No entrar sin MOV suficiente |
| Reacción | Enemigo dispone de reacción con disparador válido | Declarar tránsito → resolver Reacción → continuar si legal | Escurridizo no anula Reacción |
| Bugbear | Intenta Empujar enemigo | Reclama Grande efectiva | Rechazar: no maniobras |

## 4. Regresiones B5-I06-T01–T20 — DOC no ejecutadas

| ID | Entrada | Resultado esperado |
|---|---|---|
| T01 | Información recién obtenida y prueba que la aprovecha | Ojo +1, uso consumido antes de tirar |
| T02 | Dato viejo sin cambio real | Ojo no habilitado |
| T03 | Debilidad oculta aún no descubierta | Ojo no revela ni bonifica |
| T04 | Cambio real de terreno antes de prueba | Ojo elegible si aprovechado |
| T05 | Misma circunstancia renombrada | No reutilización |
| T06 | Segunda declaración en Escena | No |
| T07 | Nueva Escena con oportunidad genuina | Uso disponible |
| T08 | Declaración después de dados | Inválida |
| T09 | Alarma conocida antes de Iniciativa | +1 sólo bajo criterio condicional P01 |
| T10 | Enemigo visto después de Iniciativa | No retroactividad |
| T11 | Ojo en ataque con punto débil conocido | +1 prueba, no Daño |
| T12 | Ojo en hechizo sin información nueva | No por ser magia |
| T13 | Goblin cruza Mediano con hueco y MOV suficiente | 2 MOV por espacio difícil, salida legal |
| T14 | Goblin cruza criatura Pequeña | Escurridizo no aplica |
| T15 | Goblin cruza Mediano sin hueco físico | No |
| T16 | Goblin intenta terminar en casilla ocupada | No ocupación final voluntaria |
| T17 | Reacción válida durante tránsito | Se resuelve; no inmunidad |
| T18 | Reacción interrumpe y deja casilla ocupada | Registrar bloqueo; adjudicación de salida pendiente |
| T19 | Hobgoblin pide Ayuda/Liderazgo racial gratis | No |
| T20 | Bugbear pide Grande para Derribar o arma Grande | No |

**Plan de validación:** repetir T09/T10 con Iniciativa por sorpresa, T13–T18 con MOV 1/2/6, Correr, terreno doble, Reacciones y ocupación forzada; comparar Hobgoblin/Goblin/Bugbear en 12 encuentros equivalentes (exploración, logística, negociación, combate y trampas), contabilizando usos reales de Ojo, Escurridizo y Complexión; no confundir escenarios diseñados con resultados observados.

## 5. Dictamen y trazabilidad

**B5-I06: propuesta documental desarrollada; NO cerrada empíricamente.** Abiertos: oportunidad previa a Iniciativa, interrupción dentro de casilla ajena, balance real del Hobgoblin y clasificación de cuerpos para Carga. Cruces X01-05, X02-05, X04-05, X05-06, X05-07; escenarios globales B5-G02/G03/G08. **Siguiente B5-I07:** Terios, elección Linaje/Variedad, sustitución de adaptaciones, branquias/Anfibio y economía de PR.
