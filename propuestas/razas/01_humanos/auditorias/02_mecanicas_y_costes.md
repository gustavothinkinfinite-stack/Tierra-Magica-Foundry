# B2 — Humanos: auditoría mecánica, compatibilidad y costes

**ESTADO:** auditoría B2 **documental completada con una aclaración propuesta**, no aprobada ni canónica. Fecha: 17-11-2026. **No se ha ejecutado playtest ni prueba Foundry**. Las verificaciones registradas son lecturas reproducibles y análisis de secuencias, no resultados empíricos.
**Fuentes literales cotejadas en `main`:** `docs/Tierra_Magica_Manual_Maestro.md`, blob `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`; §2 pruebas, Ventaja/Desventaja, Ayuda, repetición (106–154); §3 paquete Humano v0.3 (253–260), transversales (221–247), Ascendencia/Origen/Trasfondo (443–458); §5 Rasgos, regla de autosuficiencia, catálogo y compatibilidad con Don (2176–2312); Movimiento/Acción (2314–2335); Rasgos posteriores a creación (2073–2083); Familiar y vínculos (2248–2271, 4450–4473). **Material comparado:** `01_humanos/auditoria_y_desarrollo.md`, `doble_pagina.md`, `pruebas_balance.md`, `auditorias/01_canon_y_lore.md` y once paquetes raciales vigentes. **Alcance B2:** discrepancias de reglas y costes; B3 comprobará intentos de explotación reproducibles, B4 evaluará utilidad relativa.

## 1. Resultado más importante: Menor/Significativo no equivale formalmente a 1/2 PR

El paquete Humano otorga **1 Rasgo General Significativo O 2 Menores compatibles, además de 3 PR**. El catálogo operativo **no** proporciona una clasificación general Menor/Significativo para cada entrada: sólo **Resistencia Ambiental** usa expresamente ambos grados. Sentido Agudo, Trepador Natural y Afinidad Sobrenatural cuestan 1 PR; Visión en la Oscuridad cuesta 2 PR, **sin etiqueta de grado en su título**. La tabla del expediente propone asociar las opciones según coste **dentro de los cinco Rasgos permitidos**, pero esa asociación **no es una equivalencia universal ratificada**.

### HUM-B2-DEC-01 — Tabla cerrada para aclaración editorial [PROPUESTA NO CANÓNICA]
| Rama excluyente de Don | Opción permitida por defecto para evaluar el borrador | Motivo | Qué NO implica |
|---|---|---|---|
| **1 Significativo** | Visión en la Oscuridad **(2 PR)** | Candidata de mayor entidad en lista elegible | El precio no convierte por sí solo a todo Rasgo de 2 PR en Significativo |
| **1 Significativo** | Resistencia Ambiental **Significativo (2 PR)** | **Grado nombrado literalmente** por canon | No permite añadir +1 VIG del grado Menor |
| **2 Menores** | Dos Rasgos **distintos** entre Sentido Agudo (1 PR), Trepador Natural (1 PR), Afinidad Sobrenatural (1 PR), Resistencia Ambiental **Menor (1 PR)** | Interpretación conservadora del conjunto elegible | No convierte dos elecciones en 2 PR transferibles, ni permite 2 copias de un Rasgo |
| **Fuera del Don ordinario** | Anfibio, Cola Prensil, Miembros Extra | No pertenecen al listado por defecto de §5 compatibilidad | Su eventual inclusión necesitaría una nueva autorización expresa; no es exclusión universal de compra ordinaria |
| **Expresamente vedados al Don** | Corpulento, Masivo, Vuelo Natural, Familiar Mágico, Vínculo Divino, Pacto Externo, Rasgos raciales, Fuente especial, Prótesis dependiente de evento no sucedido | Exclusiones §3 y §5, además de veto a incrementos directos de Vida/Defensa/Daño/etc. | Pueden existir opciones de adquisición legal por **3 PR generales**, con sus requisitos y presupuesto, salvo las que cuestan más |

**Dictamen:** la clasificación provisional HUM-B2-DEC-01 es razonable para mantener el borrador jugable, **pero necesita ratificación antes del `manual_final_propuesto.md`**. No escribir que «el canon define todos los Rasgos de 1 PR como Menores y los de 2 PR como Significativos», porque sería falso. Proponer en el futuro una oración explícita de asignación de **estas cuatro opciones**, no una conversión monetaria general.

## 2. Fichas por capacidad (disparador, coste, duración, exclusiones, interacción, abuso y prueba)

| ID | Rasgo de catálogo | Disparador y ventana | Coste y alcance/efecto | Exclusiones, interacción y abuso probable | Decisión documental + caso |
|---|---|---|---|---|---|
| HUM-B2-R01 | **Don sin Forma** | Sólo al crear Humano | 1 Significativo **o** 2 Menores, **gratuitos**; ficha registra decisión | No PR fungibles, sin Rasgos raciales/Vínculos/Pactos/Familiar, sin sumar Vida/Ataque/Defensa/Daño/etc.; no repetir al nivel | Conservar texto v0.3; validar HUM-T01–T20, HUM-B2-DEC-01 |
| HUM-B2-R02 | **Sentido Agudo** | Una prueba de **PER** donde detalle sutil de un sentido físico elegido determine resultado | 1 PR de catálogo; candidato **Menor** en propuesta. +1 PER; sin límite por Escena | Sin bonus en Iniciativa, Ataque o Investigación general; no atraviesa barreras. Varias fuentes equivalentes sobre mismo sentido no se suman | Registrar sentido concreto; verificar HUM-T21–T22 |
| HUM-B2-R03 | **Visión en la Oscuridad** | Oscuridad **mundana completa** dentro de 6 espacios | 2 PR de catálogo; candidato **Significativo** en propuesta. Funciona como iluminación tenue para actuar, no +PER | No color, detalle fino, humo, niebla, pared, ocultación física, oscuridad sobrenatural salvo texto. No convierte al PJ en detector general de enemigos | HUM-T23–T25; no asignar «+1 PER» por esta vía |
| HUM-B2-R04 | **Trepador Natural** | Ascenso/desplazamiento con apoyos reales y anatomía compatible | 1 PR; candidato **Menor**. Cada espacio de escalada viable cuesta 1 Movimiento en lugar de desplazamiento dificultado | Pared lisa, techo, hielo, superficie móvil o peligro pueden exigir Atletismo/equipo. No Acción adicional, Correr gratis, adhesión o salto imposible | HUM-T26–T27; contrastar Movimiento normal 6/Retirada/Carga |
| HUM-B2-R05 | **Afinidad Sobrenatural** | Prueba de PER ante manifestación directamente perceptible de afinidad **estrecha** elegida y fija | 1 PR; candidato **Menor**. +1 PER bajo condición, sin activación que produzca magia | No reconoce Fuente, Hechizo, autor o causa; no Arcana, Religión, Visión Arcana, Fuente, Disciplina, Maná, Canalización. No radar de rango libre | HUM-T28–T29; cruzar con Sentido Élfico y Ankar en B4 |
| HUM-B2-R06 | **Resistencia Ambiental Menor** | Prueba de VIG contra exposición concreta fijada al adquirir | **Grado Menor 1 PR** nombrado en canon; +1 VIG | No daño mágico meramente temático, inmunidad ni exención de alimento/agua/aire/descanso | HUM-T30; no alterar origen ni sustento ordinario |
| HUM-B2-R07 | **Resistencia Ambiental Significativo** | Misma exposición concreta, grado más alto | **Grado Significativo 2 PR** nombrado en canon; **Ventaja en lugar del +1** | No acumular +1 y Ventaja, ni varias Ventajas; una Desventaja se cancela con una Ventaja por reglas §2 | HUM-T31–T32; revisar duplicación/graduación |
| HUM-B2-R08 | **Compra ordinaria con 3 PR** | Creación; independiente de Don | Conforme a catálogo, p. ej. Familiar 3 PR, Vínculo Divino 2 PR, Pacto Externo 2 PR, Anfibio 1 PR | No usar Don para abaratar; si se compra Vínculo o Pacto no da Hechizos/Maná. Familiar sigue reglas de Acción Vinculada y perfiles cerrados | HUM-T13–T19, fichas A–F de abajo |
| HUM-B2-R09 | **Rasgo y progresión** | Nivel posterior | 3 PR no se renuevan; no conversión PR→PD, salvo Familiar 6 PD como excepción explícita | No reelección de Don, ni compra posterior de cualquier otro Rasgo sin precio de progresión, ni «subida gratuita» de Resistencia | HUM-T06–T07/T32, ficha F |
| HUM-B2-R10 | **Origen/Trasfondo/Profesión** | Creación, formación y progresión normal | Origen + idioma/faceta, Trasfondo + familiaridad/2 facetas; 25 PD profesionales separados | No +Habilidades/bono numérico por profesión/culto/Familiaridad. Ascendencia no concede entrenamiento | HUM-T20, HUM-T33–T40 |

**Acciones y duraciones:** Don se decide al crear, no consume una Acción en combate; las propiedades perceptivas y ambientales se aplican cuando se resuelve su condición, **sin conceder percepción proactiva automática**, Acción/Reacción adicional ni mayor línea de efecto. El catálogo no cuantifica «una activación por Escena» de Sentido Agudo, Afinidad, Visión o Resistencia. **No inventar ese límite.** Trepador modifica el coste de espacios de escalada, no los tramos de Acción/Movimiento fuera de esa situación.

## 3. Costes y combinaciones: fichas legales/no legales

| Caso | Construcción declarada | Resultado por lectura de canon |
|---|---|---|
| HUM-B2-F01 | Don = Visión en la Oscuridad; PR ordinarios = Familiar Mágico 3 | **Legal bajo aclaración Significativo propuesta**, Familiar requiere Vínculo I y perfil inicial; no Fuente/Maná extra por el Don |
| HUM-B2-F02 | Don = Sentido Agudo (vista) + Trepador Natural; 3 PR sin gastar | **Legal bajo aclaración Menor propuesta**, dos opciones distintas, anatomía compatible; sin +PER al trepar si vista no determina la prueba |
| HUM-B2-F03 | Don = Resistencia Ambiental Significativo (calor); compra con PR generales = Vínculo Divino 2 (dios+juramento), 1 PR restante para Rasgo legal | **Legal**; Ventaja sólo contra calor ambiental concreto y Vínculo no concede Hechizos, inmunidad ni Maná |
| HUM-B2-F04 | Don = Sentido Agudo (vista) + Afinidad Sobrenatural (corrientes de Trama); comprar Pacto Externo 2 PR | **Legal bajo aclaración Menor propuesta** si manifestación perceptible y Pacto define entidad, Condición y Precio; sin doble +1 en misma prueba salvo aplicación de textos y límites equivalentes |
| HUM-B2-F05 | Don = Corpulento 2 PR; PR ordinarios = Masivo 3 PR | **Ilegal Don** por exclusión explícita, aunque Corpulento tenga coste 2; Masivo como compra ordinaria es otra operación legal y no se acumula con Corpulento |
| HUM-B2-F06 | Don = 1 Significativo y 1 Menor «porque son 3 PR» | **Ilegal**: ramas excluyentes; Don no es saldo de 3 PR |
| HUM-B2-F07 | Don = Sentido Agudo dos veces (vista y oído) | **Ilegal**: mismo Rasgo no se adquiere dos veces salvo grados, aunque cambie selección |
| HUM-B2-F08 | Don = Resistencia Ambiental Menor; gastar 1 PR para «subir a Significativo» con descuento | **No hay regla de precio incremental de 1 PR**: el grado alto tiene coste propio 2 PR, no se infiere conversión. B2 deja pendiente si se permite reemplazo de grado en creación, siempre sin apilar y sin inventar ahorro |
| HUM-B2-F09 | Don = Trepador Natural + Sentido Agudo; luego 1 nivel compra Visión en la Oscuridad por 2 PD | **Ilegal**: no hay coste PD de esa mejora; los 3 PR no se renuevan |
| HUM-B2-F10 | Don = Visión en la Oscuridad; con 3 PR intenta comprar Vuelo Natural de 4 PR sumando «un PR de Don» | **Ilegal**: Vuelo está vedado al Don y costaría 4 PR; no conversión |
| HUM-B2-F11 | Don = Afinidad Sobrenatural «toda magia»; prueba para saber nombres de hechizos | **Ilegal**: afinidad debe ser estrecha, +1 PER a manifestación perceptible, ninguna identificación |
| HUM-B2-F12 | Don = Resistencia Significativo (frío) y personaje recibe hielo mágico de daño directo | **No aplica por tema**: sólo exposición ambiental especificada, salvo efecto que explícitamente sea esa exposición |

## 4. Interacciones con otros subsistemas: 15 controles

| ID | Subsistema | Lectura y abuso evitado | Próxima verificación |
|---|---|---|---|
| HUM-B2-X01 | Atributos/Daño/Defensa/Vida | Don no financia mejoras directas; Corpulento/Masivo excluidos | B3 combinación de PR/raciales |
| HUM-B2-X02 | Turno Acción/Movimiento/Reacción | Ningún Rasgo gratuito añade Acción o Reacción; Trepador sólo coste de escalada | B3 reacción al trepar, salir de amenaza |
| HUM-B2-X03 | Iniciativa | Sentido Agudo no modifica Iniciativa; Visión Oscuridad no da bonus fijo | B3 percepción previa a emboscada sin bono inventado |
| HUM-B2-X04 | Cobertura/ocultación | Visión Oscuridad no atraviesa humo, pared, niebla ni oscuridad sobrenatural; afinidad no atraviesa barreras | B3 objetivo tras cobertura total |
| HUM-B2-X05 | Investigación/Naturaleza/Religión/Arcana | PER estrecho no reemplaza conocimientos, oficio, identificación o diagnóstico | B3 pista sin información ilegítima |
| HUM-B2-X06 | Escala/Carga/equipo | Mediana/MOV6 constantes, Don no da otro paquete ni permite equipamiento Grande por estatura | B3 armas y barreras físicas |
| HUM-B2-X07 | Ayuda/Ventaja | Ayuda válida normalmente da Ventaja; Resistencia Significativa da Ventaja en su exposición; Ventajas múltiples no se acumulan (§2) | B3 Ayuda + Resistencia + Desventaja |
| HUM-B2-X08 | Protección/0 Vida/Trauma | Don no concede Protección/Vida, no reduce Trauma ni evita sangrado por color de piel o narrativa | B3 a 0 Vida, curación/salvamento |
| HUM-B2-X09 | Fatiga/Descanso/privación | Resistencia Ambiental no evita alimento, hidratación ni descanso; Visión Oscuridad no sustituye sueño | B3 jornadas y calor/frío |
| HUM-B2-X10 | Magia/Fuentes/Hechizos | Afinidad no es Fuente ni Visión Arcana. Comprar Vínculo/Pacto con PR no regala Habilidades ni Maná | B3 Hechizo sostenido, Canalización y fuente |
| HUM-B2-X11 | Familiares | Familiar Mágico 3 PR da Vínculo I y perfil; no aumenta acciones/Maná del humano | B3 Acción Vinculada, comunicaciones y perfil |
| HUM-B2-X12 | Ingeniería/Alquimia/crafting | Cultura de Talleres no concede kits, licencias, proyectos, fórmulas ni equipo | B3 «hábil por tradición» |
| HUM-B2-X13 | Origen/idiomas | Sólo Común+regional y facetas; no «idioma humano universal» adicional ni bono social | B3 Ficha Origen distinto de Ascendencia |
| HUM-B2-X14 | Repetición de pruebas | +1 PER no autoriza repetir tirada sin cambio real de método/información (§2) | B3 cambiar sentido artificialmente para reroll |
| HUM-B2-X15 | Otras 11 razas | Don no copia Enraizar, Sentido Umbral, Enlace Micelial, Esqueleto Coralino, Escala efectiva de Enano, Ojo, etc. | B4 utilidad y nicho vs. otras familias |

## 5. Incidencias abiertas, severidad y solución propuesta

### HUM-INC-B2-01 — Clasificación de cuatro Rasgos en Don
- **Severidad:** **alta editorial / media operativa**.
- **Evidencia:** sólo Resistencia Ambiental identifica Menor/Significativo explícitamente; otros cuatro están entre lista elegible de Don, pero sin etiqueta formal. Si no se clasifica, el jugador no puede distribuir las dos opciones del Don de modo autónomo y reproducible.
- **Propuesta de corrección editorial concreta:** añadir, **sólo al texto futuro de compatibilidad de Don**, una asignación cerrada: *Menores: Sentido Agudo, Trepador Natural, Afinidad Sobrenatural y Resistencia Ambiental Menor. Significativos: Visión en la Oscuridad y Resistencia Ambiental Significativo.* Esto **no cambia** costes individuales y **no afirma** que cualquier rasgo de 1/2 PR deba clasificarse así.
- **Estado:** **propuesta lista para aprobación**, sin edición de `main`; ninguna equivalencia general PR↔categoría habilitada.

### HUM-INC-B2-02 — Graduación de Resistencia obtenida por Don
- **Severidad:** media de explotación.
- **Evidencia:** Resistencia Ambiental tiene grados que **no se acumulan**; regla general autoriza rasgo repetido cuando existe grado expreso, pero no fija un coste incremental de mejora con Don.
- **Contención documentada:** no sumar +1 a Ventaja y no regalar mejora; si existe una compra de grado mayor durante creación, debe satisfacerse **el coste completo vigente** y no aprovechar el Don como descuento salvo texto futuro. La mecánica exacta de conversión/renuncia del grado ya seleccionado **necesita una decisión editorial expresa**.
- **Estado:** **abierta para decisión de versión propuesta y B3**, no alterar economía de PR por analogía.

### HUM-INC-B2-03 — Rasgos fuera del conjunto por defecto
- **Severidad:** media.
- **Evidencia:** §5 dice «compatibles por defecto» cinco Rasgos y prohíbe otros por nombre. Anfibio/Cola/Miembros extra no se consideran opciones ordinarias del Don, pero se podrían comprar con 3 PR normales cuando anatomía y catálogo lo permitan.
- **Contención:** el texto del borrador distingue **no compatible por defecto** de **exclusión categórica**, sin ampliar lista por coste.
- **Estado:** **cerrada en borrador**, revalidar en B3.

### HUM-INC-B2-04 — Reelección o progresión por equivalencia inventada
- **Severidad:** media/alta.
- **Evidencia:** Don sólo en creación; 3 PR no se renuevan; no hay conversión general PR/PD. Familiar 6 PD posterior es **excepción explícita**, no regla extendida a Visión/Trepador.
- **Contención:** ficha registra Don con elecciones fijas; no reseteo entre escenas ni al nivel.
- **Estado:** **cerrada por canon, verificar B3**.

### HUM-INC-B2-05 — Comparación futura de potencia
- **Severidad:** media de balance, no corregible sin B4.
- **Evidencia:** una Visión Oscuridad puede ser muy valiosa en exploración, dos +1 PER estrechos podrían activarse frecuentemente, mientras otras razas reciben capacidades fijas con distinto coste de oportunidad.
- **Recomendación:** en B4 ensayar escenas emparejadas de oscuridad, exploración ambiental, magia, combate, ciudad, agua y Fatiga; medir activaciones pertinentes, **no** proponer un nerf sin evidencia.
- **Estado:** **abierta B4**.

## 6. Salida y decisión

**B2 Humanos documentada y terminada**: 10 fichas de capacidades/sistemas, 12 construcciones evaluadas, 15 interacciones cruzadas y cinco incidencias con estado. La **única aclaración mecánica de texto propuesta** es un listado cerrado para Menor/Significativo en Don, sin presupuesto PR convertible. La mejora de Resistencia Ambiental requiere decisión específica para evitar descuentos no canónicos. Las 42 pruebas iniciales siguen sin ejecución empírica, que corresponde a B3.

**Siguiente B2:** Enanos — revisar Cuerpo de Piedra, Sangre de Metal, escala efectiva, Carga, Empujar/Derribar/Agarrar y VIG/Defensa Corporal contra toxinas, enfermedad y agotamiento ambiental; enfrentar Orco/Bugbear/Terio en B4. **No pasar aún a B3 ni a `manual_final_propuesto.md`**; completar B2 por las doce familias y después seguir el plan.

**Escritura permitida:** sólo `propuestas/razas/` en rama `propuestas/razas-autonomas-2026`. No modificar Manual Maestro operativo, `main`, sistema Foundry o mapa.
