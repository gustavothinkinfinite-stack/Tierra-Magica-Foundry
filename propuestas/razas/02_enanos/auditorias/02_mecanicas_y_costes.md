# B2 — Enanos: auditoría mecánica, costes, Escala y resistencias

**ESTADO:** ronda B2 documental completada con **dos dudas sistémicas identificadas**, pendientes de B3/B4 y eventual aclaración aprobada. **PROPUESTA NO CANÓNICA.** Fecha: 17-11-2026. No hubo partidas de mesa ni ejecuciones de Foundry.
**Fuentes primarias reabiertas literalmente:** `main:docs/Tierra_Magica_Manual_Maestro.md`, blob SHA `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`: paquete Enano v0.3 (263–271), reglas raciales transversales (221–247), maniobras Derribar/Empujar/Agarrar (2689–2795), Defensas (2959–2982), carga y acceso al equipo (3636–3647), Vida/Trauma (3680–3697), viaje/marcha forzada y privación (2460–2472; 2552–2600), magia cinética (4305–4310), Rasgos generales y progresión (§5, 2073–2083). **Archivos contrastados**: `02_enanos/auditoria_y_desarrollo.md`, `doble_pagina.md`, `pruebas_balance.md`, `cierre_editorial.md`, `auditorias/01_canon_y_lore.md`; referencias de Orcos, Bugbears, Terios y Dríades/Verdantes para comparativa B4.

## I. Resumen del paquete, preservando la autoridad de `main`

- **Ascendencia:** Enano, Escala real **Pequeña**, Movimiento normal **5**. Cuatro tradiciones Montaña/Profundos/Forja/Errantes son culturales, no cuatro paquetes.
- **Cuerpo de Piedra [CANON]:** se considera de Escala **Mediana** **únicamente** para **Carga** y para **resistir Empujar, Derribar o desplazamiento físico impuesto**. No modifica ataque, daño, alcance, Defensa, espacio ocupado o equipo sobredimensionado; tampoco extiende de suyo el beneficio a **Agarrar**.
- **Sangre de Metal [CANON]:** **+1 a pruebas de VIG** para resistir toxinas, enfermedades y agotamiento **ambiental apropiado**. **Si uno de esos efectos ataca expresamente Defensa Corporal**, obtiene **+1 Defensa Corporal** frente a ese efecto. No protege heridas, hambre, sueño insuficiente ni daño general.
- **Economía:** paquete separado de **25 PD / 3 PR**, ninguna Habilidad de oficio ni Atributo automático, ningún Rasgo por cultura, sin Fuente y sin mejora racial al subir de nivel.

## II. Fichas B2 por capacidad: disparador / coste / efecto / límites / abuso

| ID | Capacidad | Disparador y ventana | Coste / duración / alcance | Exclusiones e interacción | Riesgo y decisión verificable |
|---|---|---|---|---|---|
| ENA-B2-R01 | Escala Pequeña / MOV5 | Todas las escenas | Sin coste adicional; estado basal permanente | Cuerpo de Piedra no la cambia para tamaño ocupado, armas, alcance o Movimiento | No sumar ventajas de Pequeño y Mediano fuera de casos expresos. ENA-B2-S01/S02 |
| ENA-B2-R02 | Cuerpo de Piedra — Carga | Al adjudicar equipo/objeto que se transporta | **Mediano efectivo** en esa adjudicación, sin Acción nueva | No fórmula universal de kg/inventario; tampoco más FUE o armadura Mediana sobredimensionada | Evitar capacidad numérica de kg inventada. ENA-B2-S03/S04 |
| ENA-B2-R03 | Cuerpo de Piedra — Empujar recibido | Al determinar diferencias de Escala del objetivo frente a empuje | Mediano efectivo **sólo al resistir**; no cuesta Reacción/Acción | El ataque sigue contra Defensa de Maniobra; distancias y topes de Escala se aplican en fase de desplazamiento | Ejemplos con agresores Pequeño/Mediano/Grande, ENA-B2-S05/S06 |
| ENA-B2-R04 | Cuerpo de Piedra — Derribar recibido | Al ser objetivo de Derribar | Mediano efectivo, no +1 numérico Defensa de Maniobra | La maniobra usa prueba contra Defensa de Maniobra y en éxito impone Derribado; canon no cuantifica cambio de resultado por Escala en toda tirada | **Vacío de eficacia contextual**: documentar casos donde tamaño vuelve maniobra físicamente imposible/plausible; no +Defensa ficticia |
| ENA-B2-R05 | Cuerpo de Piedra — desplazamiento impuesto | Cuando efecto exige mover físicamente al Enano | Mediano efectivo en componente de desplazamiento, no la totalidad del ataque | No evita el daño, toxicidad o estado que puede acompañarlo; no inmune a fuerza/magia | Martillo Cinético separado en daño + desplazamiento. ENA-B2-S07/S08 |
| ENA-B2-R06 | Cuerpo de Piedra — Agarrar / Desarmar | Cuando participa en otras maniobras | **Sin beneficio racial** para Agarrar como tal ni para Desarmar | Ser arrastrado bajo Presa podría involucrar una cuestión adicional de desplazamiento físico impuesto, pero el capítulo de Agarrar permite traslado con condiciones y usa DF de Presa separada | **Pendiente B2 de interfaz / B3:** no ganar Defensa de Maniobra o escape +1 general |
| ENA-B2-R07 | Sangre de Metal — prueba VIG | Cuando se tira **VIG** para resistir toxina, enfermedad o agotamiento ambiental apropiado | +1 VIG para **esa prueba**, sin gastar Acción; no +VIG permanente | No aplicado a ataque, carga, curación, Fatiga ordinaria, hambre/sueño | ENA-B2-S10/S11/S12 |
| ENA-B2-R08 | Sangre de Metal — Defensa Corporal | Cuando uno de los **tres peligros enumerados** ataca **expresamente** Defensa Corporal | +1 Defensa Corporal contra **ese ataque**, no valor permanente de ficha | En ataques estáticos no hay una segunda defensa activa normal, no sumar automáticamente también «+1 prueba VIG» a la misma resolución | ENA-B2-S13/S14 |
| ENA-B2-R09 | Rasgo general Resistencia Ambiental | Al comprar legalmente exposición estrecha con 1/2 PR | Menor +1 VIG, Significativo Ventaja en lugar de +1; selección y grado fijos | Si mismo peligro coincide con Sangre de Metal, no duplicar la misma propiedad por inferencia; grado Significativo concede Ventaja si corresponde y Sangre sólo su +1 por su texto (evaluar jerarquía de «fuentes equivalentes» caso a caso) | Riesgo de sumar bonificaciones similares; contraste B3/B4 |
| ENA-B2-R10 | Origen/profesión | Crear personaje, usar Habilidades | Idioma y Faceta por Origen, 25 PD profesionales | No Ingeniería, Artesanía, Visión Oscura, casco, máscara filtrante, respiración sin aire ni Vínculo de Khorun gratis | ENA-B2-S15/S16 |
| ENA-B2-R11 | Nivel/descanso/Trauma | Progresión, 0 Vida, viajes, recuperación | Reglas generales aplicables | +1 contextual no altera Vida máxima ni inmunidad a Fatiga, Sangrado, 0 Vida/Trauma; PR no se renuevan | ENA-B2-S17/S18 |

**Notas de tiempo:** Cuerpo de Piedra y Sangre de Metal no tienen activación por Acción ni límite «1/Escena» en `main`; aplican **en las condiciones enumeradas** sin conceder una intervención nueva. No se deben recargar como si fueran recursos consumibles ni permitir que causen efectos adicionales sin la maniobra o evento original.

## III. Auditoría de procedimiento de maniobras

### 1. Empujar — una interacción donde Escala tiene consecuencia cuantificada

`main` define Empujar como **FUE + Atletismo contra Defensa de Maniobra**. Si acierta, desplaza según margen: Ajustado 1, Claro 2, Dominante 3 espacios. Si el objetivo es **una categoría mayor** que el atacante, se reduce 1 espacio (mínimo 1); si es dos o más categorías mayor, no puede desplazarse con fuerza corporal ordinaria sin palanca/capacidad.

**Lectura reproducible:**
- Un **atacante Pequeño** que obtiene margen Claro contra un **Enano Pequeño con Cuerpo de Piedra** compara la Escala efectiva del defensor **Mediano**: en vez de la distancia plena de 2, reduce a **1 espacio**. La **tirada para impactar** no cambió. Lo mismo ante margen Dominante reduciría **3→2** espacios.
- Ante **atacante Mediano**, el Enano ya cuenta como Mediano para resistir, por lo que Empujar opera sin reducción adicional por diferencia (distancia por margen). **No** permite proclamar que la capacidad «siempre reduce 1 espacio».
- Si un atacante fuese **dos o más categorías menor** que Mediano, la maniobra ordinaria no movería al Enano sin palanca/efecto apropiado; revisar la tabla real de Escalas en B3 antes de inventar especies o equivalencias.
- Empujar por efectos mágicos puede tener tabla **propia** (ej. Martillo Cinético). Resolver con texto del efecto y Escala efectiva en su componente físico; no aplicar distancia de Empujar universal a una magia que cuantifica desplazamiento de otro modo.

**Problema detectado:** en textos de ficha abreviados «resistir Empujar» podría ser interpretado como «Defensa +1»; **no existe esa conversión** en la regla racial.

### 2. Derribar — mejora contextual sin bono de tirada definido

Derribar gasta Acción, tira método físico contra Defensa de Maniobra y, si acierta, aplica Derribado. El procedimiento no presenta una tabla universal de distancia/resultado por Escala en ese paso. Por tanto, Cuerpo de Piedra **no da +1 Defensa de Maniobra** ni provoca automáticamente un éxito fallido. Su beneficio al resistir Derribar puede importar a la **viabilidad física** de la maniobra, interacción con una capacidad especial o diferencia funcional de Escala que el efecto exija, pero la magnitud **no está cuantificada** en la maniobra ordinaria.

**HUM-B2-PROP-ENA-01 [PROPUESTA DE ACLARACIÓN, NO CANON]:** mantener el texto racial intacto y añadir un ejemplo transversal en la futura referencia rápida de maniobras: *«Al decidir si un Derribar depende de diferencia de Escala, el Enano cuenta como Mediano; el rasgo no altera la Defensa de Maniobra y no anula por sí solo un éxito.»* Si las pruebas B3/B4 muestran que la cláusula carece siempre de utilidad relevante, evaluar una formulación explícita de efecto o un caso donde importe, **sin crear bonificación automática ahora**.

### 3. Agarrar y desplazamiento desde una Presa

El capítulo establece que Agarrar usa FUE+Atletismo contra Defensa de Maniobra y crea DF de Presa. Un agarrado puede ser desplazado físicamente por quien lo sujeta bajo límites de Escala y a aproximadamente **medio Movimiento del atacante**; la presa termina por condiciones propias.

**Separación necesaria:** Cuerpo de Piedra **no** menciona «resistir Agarrar», **no** mejora Defensa de Maniobra contra el inicio de la Presa, **no** reduce la DF para escapar, **no** elimina Agarrado. Cuando el atacante pretende **mover físicamente** a una presa, surge el problema textual de si «desplazamiento físico impuesto» puede aplicar a la fase de traslado: **posible por literalidad, pendiente de resolución sistémica B3**, sin convertirlo en defensa general al agarre. La regla de movimiento de una presa mayor sigue exigiendo condiciones anatómicas y de Escala.

### 4. Otras defensas físicas y daño

Desarmar: no beneficio automático. Onda de Choque o Martillo Cinético: separar la **tirada de ataque** (contra Defensa o Defensa Corporal del hechizo) del **desplazamiento causado**. Cuerpo de Piedra puede afectar al tramo de Escala si el poder lo usa; **no** eleva la Defensa, no resta Daño y no da Resistencia al tipo físico o arcano. Una caída después de desplazamiento usa reglas ordinarias de Caídas; no se elimina por densidad pétrea.

## IV. Sangre de Metal: condiciones que sí/no funcionan

**Prueba VIG aplicable:** resistir toxina, enfermedad, agotamiento **causado por exposición ambiental** (temperatura, condiciones hostiles identificadas que exijan VIG). La marcha forzada tiene prueba **VIG + Atletismo** pero su causa es **esfuerzo**, no automáticamente «agotamiento ambiental»: no suma Sangre de Metal sin amenaza ambiental real explícita.

**Ataque a Defensa Corporal:** si un veneno, enfermedad o agotamiento ambiental usa una tirada **contra Defensa Corporal** estática (generalmente 11+VIG), el Enano recibe **+1 exclusivamente para ese ataque**. El +1 a «prueba de VIG» no convierte esa Defensa estática en tirada ni se aplica dos veces. Si la resolución del efecto exige además una **prueba de VIG posterior e independiente**, sólo en esa prueba independiente se evalúa su +1 bajo el rasgo.

**Negativos expresos:** hambre, privación de sueño, heridas, ataques físicos ordinarios, enfermedad descrita sólo de forma estética en arma sin efecto clínico definido, intimidación/miedo, magia elemental que sólo comparte color/tema metálico; **no +VIG general, no +Vida/Defensa de Maniobra ni inmunidad**.

**Cruce con Resistencia Ambiental comprada:** un Enano puede adquirir una Resistencia Ambiental contra exposición estrecha por 1/2 PR, pero los efectos idénticos/equivalentes no se acumulan por mera procedencia doble. Tampoco se pierde automáticamente la existencia de **Ventaja** del grado Significativo por tener otra fuente de +1 contextual; las reglas de +1 y de Ventaja son diferentes y requieren resolverlas conforme a textos concretos. **Pendiente de B3** definir ejemplos con ambas fuentes sin declarar que hay +2 automático o que «Ventaja cancela todo otro modificador».

## V. Matriz de 18 casos de aceptación documental (no ejecutados)

| ID | Escena | Lectura esperada y subsistema |
|---|---|---|
| ENA-B2-S01 | Enano camina junto a Humano en camino mantenido | MOV5 vs MOV6, no equiparar por Cuerpo de Piedra |
| ENA-B2-S02 | Enano usa arma diseñada exclusivamente para Grande | Cuerpo de Piedra no concede equipo sobredimensionado |
| ENA-B2-S03 | Enano lleva provisiones y mochila razonable | Carga se adjudica como para Mediano, **sin kg universal** |
| ENA-B2-S04 | Enano intenta llevar un carro entero como si pesara 10 kg | Físicamente imposible salvo otro efecto; Cuerpo de Piedra no crea fuerza |
| ENA-B2-S05 | Atacante Pequeño Empuja margen Claro (2) al Enano | Defender cuenta Mediano, **desplazamiento 1**, ataque sin +Defensa |
| ENA-B2-S06 | Atacante Mediano Empuja margen Claro (2) al Enano | Defender cuenta Mediano, **distancia 2**, sin reducción fija extra |
| ENA-B2-S07 | Martillo Cinético acierta contra Enano | Ataque vs Defensa Corporal normal; Escala efectiva sólo en desplazamiento, daño permanece |
| ENA-B2-S08 | Enano recibe daño por empuje que termina en caída | Reglas de caída/0 Vida normales, no Protección por «piedra» |
| ENA-B2-S09 | Enano objetivo de Derribar convencional | Escala efectiva puede importar a plausibilidad, **no modifica numéricamente Defensa de Maniobra** |
| ENA-B2-S10 | Enano resiste veneno con prueba VIG | +1 VIG en esa prueba, no inmunidad |
| ENA-B2-S11 | Enano enferma y el efecto exige VIG | +1 VIG si es resistencia a enfermedad |
| ENA-B2-S12 | Enano marcha 10 horas en clima ordinario | Fatiga por marcha forzada normal, sin +1 por Sangre de Metal sólo por esfuerzo |
| ENA-B2-S13 | Toxina ataca expresamente Defensa Corporal | +1 Defensa Corporal contra toxina, sin tirar defensa aparte |
| ENA-B2-S14 | Ataque físico causa daño y no administra toxina | Defensa Corporal/Defensa según ataque sin +1 de Sangre |
| ENA-B2-S15 | Enano de Origen Broncino | Idiomas según Broncino, no Kharumita gratis |
| ENA-B2-S16 | Enano de Forja quiere fabricar arma sin Ingeniería | Formación requiere PD y materiales/equipo de fabricación |
| ENA-B2-S17 | Enano a 0 Vida | Incapacitado/Trauma según reglas, no invulnerabilidad por Sangre |
| ENA-B2-S18 | Enano compra Resistencia Ambiental Menor frente al mismo peligro | No sumar dos +1 equivalentes por etiqueta distinta; exactitud de apilamiento a B3 |

## VI. Registro de incidencias con prioridad

1. **ENA-INC-B2-01 — Derribar y Escala efectiva (MEDIA/ALTA):** la fórmula de la maniobra no traduce Escala en una ventaja numérica. **No inventar +1 Defensa**. Documentar casos de plausibilidad, evaluar en B3 frecuencia y, si no tiene valor, proponer corrección transparente en B4.
2. **ENA-INC-B2-02 — Traslado físico de Presa (MEDIA):** Agarrar no está enumerado, pero arrastrar una presa sí puede describirse como desplazamiento impuesto. Separar fases; dejar adjudicación exacta pendiente B3 para evitar ampliación furtiva.
3. **ENA-INC-B2-03 — Agotamiento ambiental (MEDIA):** distinguir prueba de marcha forzada por esfuerzo de agotamiento por clima/exposición; comparar con Fatiga, Resistencia Ambiental, toxinas y enfermedades en B3.
4. **ENA-INC-B2-04 — Simultaneidad de VIG/Defensa Corporal (MEDIA):** no contabilizar +1 dos veces en una sola resolución; se aplica a clase de resolución que el efecto exige.
5. **ENA-INC-B2-05 — Carga sin kg universales (MEDIA):** la Escala efectiva da ventaja adjudicable, pero no autoriza a inventar peso/ranuras. Si se necesitan tablas, deben ser generales a todas las razas y subsistemas, no exclusivo Enano.
6. **ENA-INC-B2-06 — Competencia con resistencias generales (MEDIA):** cuando Resistencia Ambiental elegida se superpone con Sangre de Metal, controlar no-acumulación de efectos equivalentes; evaluar los grados y Ventaja sin inventar regla de conversión.
7. **ENA-INC-B2-07 — Daño ambiental y 0 Vida (BAJA):** respetar mitigación normal de daño, armadura/barrera por textos propios, Sangrado y Trauma. No extrapolar inmunidad mineral.
8. **ENA-INC-B2-08 — Valor relativo vs. otras especies (B4):** Enano Pequeño/MOV5 compensa con Carga/estabilidad y defensas contextuales; comparar activaciones reales contra Orcos/Bugbears/Dríades/Verdantes/Terios, sin cambiar números antes de estudio.

## VII. Dictamen y siguiente unidad

**B2 Enanos terminada a nivel documental**: 11 fichas de capacidades/sistemas, 18 casos de secuencia con resultados esperados y ocho incidencias identificadas. **No** se realizó ejecución empírica, simulación automatizada ni playtest; los cálculos de distancia se deducen del texto canónico de Empujar, no de un motor Foundry. Se preserva paquete vigente; la propuesta de aclaración sobre Derribar queda **no canónica**. No se requiere Habilidad racial nueva.

**Siguiente B2:** Élficos — evaluar Sentidos Élficos y Resonancia de la Savia contra reglas de PER, ocultación, magia sostenida, detección/identificación y efectos que alteran procesos vitales; verificar línea de efecto y casos de varias fuentes de percepción. Después seguir B2 de Orcos y el resto. **B3/B4/B5/C no se adelantan** ni se escriben textos finales antes del cierre global.
