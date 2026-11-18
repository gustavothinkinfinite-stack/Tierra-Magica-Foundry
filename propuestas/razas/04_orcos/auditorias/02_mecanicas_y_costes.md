# B2 — Orcos: auditoría mecánica de Complexión, Voluntad y costes

**ESTADO:** ronda B2 **COMPLETADA DOCUMENTALMENTE**, con aclaración en el desarrollo y diez regresiones nuevas. **PROPUESTA NO CANÓNICA, NO APROBADA**. Fecha: 17-11-2026. Ninguna prueba en mesa o Foundry fue ejecutada; los escenarios son **criterios por lectura** del Manual.

**Fuente primaria reabierta y comprobada:** `main:docs/Tierra_Magica_Manual_Maestro.md`, blob SHA `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`: paquete Orco v0.3 (283–291), reglas transversales (231–247), resolución 2d10/Ventaja/Desventaja/Ayuda/orden (106–156), Acción/Movimiento/Reacción (2810–2865), Empujar/Derribar/Agarrar/Desarmar (2691–2789), Carga sin peso universal (3636–3647), Vida/Trauma/Descanso/Fatiga (3680–3760), catálogo Rasgos Corpulento/Masivo, Vínculo Divino y Afinidad Sobrenatural (2234–2255; 2282–2299), miedo y `Valor Inspirado` (4374), `Supresor del Dolor` (3612; 9362–9369), progreso de PR/PD (2073–2083). Material comparado: `04_orcos/auditoria_y_desarrollo.md`, `doble_pagina.md`, `pruebas_balance.md`, `cierre_editorial.md`, B1 `auditorias/01_canon_y_lore.md`; contraste con Enanos, Bugbears, Terios y demás familias.

## I. Paquete v0.3 conservado

- **Escala Mediana, Movimiento 6**, sin alteración por apodo de Bastión ni constitución aparente.
- **Complexión Orca:** **+1 FUE efectiva** únicamente para **Carga, levantar, arrastrar y aplicar fuerza bruta contra objetos inertes**. No es atributo FUE general; excluye **Ataque, Daño, Agarrar, Empujar, Derribar, Defensa y Vida**.
- **Voluntad del Colmillo:** **1 vez por Escena**, **antes de una prueba** con **Desventaja exclusivamente por dolor, miedo o agotamiento físico**, puede **ignorar esa fuente** para la prueba. **No da Ventaja**, no quita condición y no restaura penalizaciones de Movimiento por Fatiga.
- Sin Intimidación, competencia marcial, hechizos, Fuente, Furia, Vínculo, equipos, idiomas ni Rasgos gratuitos por Ascendencia. Los 25 PD/3 PR generales y sus límites permanecen.
- **Bastión** y una sensibilidad específica de **Sangre** son propuestas de caracterización; Masivo/Corpulento/Afinidad/Vínculo requieren compra normal. No hay cuarta opción jugable ni modificación de creación.

## II. Fichas mecánicas por disparador, coste, alcance, duración y límites

| ID | Efecto / interacción | Disparador verificable | Coste, alcance y duración | Exclusiones y posible abuso | Decisión B2 / pruebas |
|---|---|---|---|---|---|
| ORC-B2-R01 | Escala/MOV | Todo combate/viaje | Mediana, Movimiento 6 normal | Talla Bastión no concede Grande, alcances, armas o Carga automática nueva | ORC-T01/T08/T10 |
| ORC-B2-R02 | Complexión — Carga | Equipo y recursos transportados | FUE efectiva +1 **sólo para adjudicar Carga**; sin Acción extra | No inventar capacidad fija en kg/ranuras; núcleo no usa fórmula universal | ORC-T13/T39 |
| ORC-B2-R03 | Complexión — levantar/arrastrar | Esfuerzo físico real pertinente | +1 FUE efectiva **en la interacción**; Atletismo/herramientas/tiempo normales | No incrementa Ataque/Daño; no otorga potencia industrial ilimitada ni Movimiento extra | ORC-T11–12/T18/T39 |
| ORC-B2-R04 | Complexión — objeto inerte | Fuerza bruta ejercida contra objeto que **no está siendo activamente opuesto por criatura** | +1 FUE efectiva para esa prueba/viabilidad | No equiparar «arma de enemigo» con caja inerte al Desarmar; golpear una puerta con arma es Ataque si se resuelve como tal | ORC-T18–20/T40 |
| ORC-B2-R05 | Maniobras físicas | Orco declara Empujar/Derribar/Agarrar/Desarmar contra criatura | Procedimiento universal FUE+Atletismo o método legal, coste Acción | **Sin** +1 racial, ni FUE adicional en DF de Presa; no mejorar Defensa de Maniobra | ORC-T14–17/T19/T40 |
| ORC-B2-R06 | Voluntad — habilitación | Prueba **actual** que tenga Desventaja **exclusivamente** por dolor/miedo/agotamiento físico | **Una activación por Escena**, declaración **antes de tirar**; no Acción/Reacción adicional | Sin activación si sólo hay oscuridad, terreno, humo, cobertura u otro factor ajeno que cause Desventaja | ORC-T21–27/T32 |
| ORC-B2-R07 | Voluntad — efecto | Ignorar **esa fuente** para **esa prueba** | No concede Ventaja, no crea segunda tirada o Reroll; no quita condición | Con **dos fuentes elegibles independientes** ignorar una deja la otra; varias Desventajas no apilan dados | ORC-T28–31 |
| ORC-B2-R08 | Voluntad — Ventaja simultánea | Ayuda, ventaja táctica o magia concede Ventaja además de dolor/miedo | §2: varias Ventajas no apilan; una Ventaja cancela una Desventaja | La secuencia de elegibilidad después de cancelación y el consumo de uso «sin efecto» **no están resueltos específicamente por el paquete** | ORC-T33–34, pendiente B3 |
| ORC-B2-R09 | Voluntad — Fatiga | Fatigado: Desventaja en esfuerzo prolongado si pertinente; Exhausto MOV-2, mín.1; Colapsado sin esfuerzo significativo | Sólo puede ignorar una Desventaja elegible en **prueba válida** | No reduce Fatiga, no recupera Movimiento/Acciones, no vuelve realizable esfuerzo imposible | ORC-T23/T35–37 |
| ORC-B2-R10 | Rasgos Bastión | Compra Corpulento 2 PR o Masivo 3 PR, compatible con ficción | +4 o +8 Vida máxima respectivamente, no acumulables | No +FUE, Protección, umbral Daño Grave, Defensa o Escala; sin descuento por linaje | ORC-T08–10 |
| ORC-B2-R11 | Rasgos de Sangre/Varkor | Compra Afinidad Sobrenatural 1 PR o Vínculo Divino 2 PR | Afinidad +1 PER sólo manifestación estrecha perceptible; Vínculo acceso a Fuente Divina con juramento | No lectura de juramentos/intenciones, moral, mentira, Fuente/Maná/Hechizo gratis | ORC-T05–07; requisito 3 PR |
| ORC-B2-R12 | 0 Vida/Trauma/Recuperación | Lesión, caída a 0, Descansos | Reglas universales; +1 FUE contextual no modifica Vida ni umbral | Voluntad no actúa mientras Incapacitado para restaurar consciencia ni evita Trauma/Herida | Casos B3 |
| ORC-B2-R13 | Equipos, ingeniería, magia | Romper/levantar material, crear dispositivo, lanzar Hechizo | Acción/materiales/PD/Maná/competencia ordinarios | Levantar viga no equivale a fabricar mecanismo, adquirir componente gratis o operar maquinaria sin Habilidad | ORC-T18/T39; CRAFT/Ingeniería |
| ORC-B2-R14 | Origen, profesión y progresión | Crear/sumar nivel | Ascendencia ≠ Origen, 25 PD y 3 PR ordinarios; PR no se renuevan | Sangre/Gris/Bastión no dan paquete acumulable, idioma, habilidades o PR extra por nombre | ORC-T01–10 |

**Temporización:** Complexión no es recurso «1/Escena»; se utiliza cuando la interacción concreta lo permite. Voluntad sí tiene **uso limitado 1/Escena**, pero no dice que cueste Acción ni Reacción; sólo modifica una prueba ya legítima y no crea una Acción nueva para provocar la prueba.

## III. Fuentes simultáneas de Desventaja: frontera canónica y cuestión editorial

### 1. Lectura literal conservadora de Voluntad

El texto `main` exige Desventaja **exclusivamente** por las tres categorías permitidas. Por lo tanto:

1. **Dolor solo** sobre una prueba válida: puede declarar Voluntad antes de tirar. La tirada deja de sufrir esa fuente y sigue usando los dados normales (si no hay otras fuentes).
2. **Dolor + terreno difícil/niebla**, ambos efectivamente producen Desventaja: el requisito de «exclusivamente» no se cumple. **No** transformar esa combinación en una tirada normal ni afirmar que Voluntad neutraliza el terreno.
3. **Dolor + miedo** como causas independientes: ambas son categorías permitidas, pero la capacidad habla de ignorar **esa fuente**, singular. Si se ignora dolor, queda miedo: **persiste Desventaja**. Como múltiples Desventajas no se apilan, el motor nunca tira 4d10/5d10 por causas acumuladas. **Pregunta pendiente B3:** ¿se permite/consume una activación que no cambia los dados, o se debe exigir oportunidad de mejorar realmente una prueba? No crear regla de reembolso o prohibición sin evaluación.
4. **Prueba sin Desventaja**, aunque el personaje esté herido o atemorizado de forma narrativa: no habilita Voluntad para añadir Ventaja o +1. Hace falta la **penalización real** en la prueba.

**ORC-B2-PROP-01 [ACLARACIÓN FUTURA, NO CANON]:** «Antes de tirar, identifica la prueba válida y las fuentes que imponen Desventaja. Voluntad del Colmillo permite dejar de considerar una fuente de dolor, miedo o agotamiento físico que sea la causa elegible de esa Desventaja; no altera ninguna fuente ajena ni concede Ventaja. Si otras fuentes independientes continúan imponiendo Desventaja, la tirada permanece con Desventaja. El uso es una vez por Escena». Se conserva el requisito exclusivo tal como está escrito; antes de ratificar, **decidir consumo en caso sin efecto** y procedimiento con Ventaja simultánea.

### 2. Ventaja, Ayuda y supresión farmacológica del dolor

`main` §2 dice que una Ventaja y una Desventaja se cancelan y que varias de cada una no se acumulan. `Supresor del Dolor` puede ignorar una Desventaja por dolor sin curar, y `Valor Inspirado` concede +2 **Defensa Mental** contra miedo sobrenatural o intimidación, **no** una Ventaja universal de todas las pruebas.

- Si Ayuda válida ya canceló la única Desventaja causada por dolor, **no** usar Voluntad como conversión retrospectiva para recuperar una «Ventaja» extra. La secuencia precisa para preelección de Voluntad con fuentes y cancelación se deriva a B3.
- Si un Supresor ya eliminó el dolor como fuente de Desventaja, Voluntad no genera otro beneficio por el dolor extinguido.
- Un +2 Defensa Mental de `Valor Inspirado` no es Desventaja en tirada propia, y **Voluntad no añade +2 a Defensa Mental** para miedo.
- `Doble Sostenimiento`, fuentes mágicas u otros Hechizos se adquieren y pagan normalmente; Voluntad no reduce Maná, no cancela un Hechizo hostil, no invalida miedo por condición ni interrumpe magia.

### 3. Fatiga, imposibilidad y movimiento

El estado **Fatigado** impone Desventaja en **esfuerzo físico prolongado cuando corresponda**: una prueba que realmente cumpla la condición es candidata para Voluntad. El estado **Exhausto** impone además **MOV−2 (mínimo 1)**, que **permanece** incluso si Voluntad ignora la Desventaja de una prueba concreta. **Colapsado** impide esfuerzos significativos: ninguna tirada «con Voluntad» vuelve posible algo que el motor declara imposible. La condición persiste tras la prueba y tras la Escena hasta recuperación real.

**Secuencia válida:** primero se comprueba si la acción o prueba es posible, se establece si hay Desventaja y cuál es su causa, se declara Voluntad **antes de lanzar los dados**, después se resuelve la prueba por el motor común. No se vuelve a declarar tras observar una Pifia, fallo o Hazaña.

## IV. Complexión, Carga, objetos y economía de Acciones

El núcleo no tiene **capacidad de carga universal en kilogramos**. «+1 FUE efectiva» no es un peso gratuito concreto; sirve para determinar viabilidad y, cuando proceda, la prueba que usa FUE en un esfuerzo permitido. No autoriza alterar permanentemente FUE en ficha, Vida máxima, Ataque o Daño. Un objeto demasiado grande/pesado puede continuar requiriendo palanca, equipo, ayuda, tiempo o ser físicamente imposible.

| Objeto/situación | Complexión +1 FUE efectiva | Por qué |
|---|---|---|
| Viga inerte que se levanta durante rescate | **Sí**, si el esfuerzo requiere FUE | «levantar» objeto es supuesto explícito |
| Caja inerte arrastrada | **Sí** | «arrastrar» es supuesto explícito |
| Equipaje, cuando se resuelve Carga | **Sí** | cláusula de Carga |
| Puerta física inmóvil que se fuerza con esfuerzo bruto | **Sí**, si la resolución es fuerza contra objeto inerte | no gana la prueba automáticamente |
| Objetivo humanoide que se Empuja/Derriba/Agarrar | **No** | exclusiones expresas |
| Arma enemiga que el adversario sostiene y defiende | **No** | Desarmar es oposición activa, no «objeto inerte» pasivo |
| Ataque con espada contra puerta o enemigo | **No por Complexión** | no aumenta Ataque/Daño de armas |
| Reparar motor o construir caldera | **No como competencia técnica** | materiales, Ingeniería/Artesanía y proceso requeridos |
| Arrastrar a una criatura que se resiste | **No por declarar «arrastrar»** | interacción con criatura activa, maniobra propia |
| Llevar cuerpo inerte (carga física, sin oposición activa) | **Potencialmente sí** a la carga/levantar, según escena | no autoriza ignorar Trauma/Medicina ni alterar reglas de rescate |

**Interacciones frente a otras familias:** Cuerpo de Piedra Enano cambia **Escala efectiva para Carga y resistencia a desplazamientos**; Bugbear tiene **Escala efectiva Grande sólo para Carga y objetos inertes**; Terio puede comprar Complexión de adaptación Principal. **Complexión Orca** usa un **+1 FUE efectivo** estrecho. Esos son mecanismos diferentes: no declararlos numéricamente equivalentes ni superponer dos paquetes de Ascendencia. La evaluación de utilidad relativa y frecuencia pertenece a B4.

## V. Regresión B2 — 18 escenarios por lectura (sin ejecución)

| ID | Condición | Resultado esperado |
|---|---|---|
| ORC-B2-S01 | Orco de cualquier rama toma Ascendencia, Origen y Trasfondo | Una sola Ascendencia; mismos PD/PR, MOV6/Mediana |
| ORC-B2-S02 | Bastión compra Masivo 3 PR | +8 Vida máxima, sin incremento de daño/carga/escala |
| ORC-B2-S03 | Sangre compra Vínculo 2 PR y quiere canalizar magia | Fuente sí; hechizo/Maná/Habilidades únicamente por reglas propias |
| ORC-B2-S04 | Levantar viga pesada con Atletismo | +1 FUE efectiva aplicable si el método requiere FUE y es objeto inerte |
| ORC-B2-S05 | Portar equipo de expedición | Carga contextual con FUE efectiva +1, sin fórmula de kg inventada |
| ORC-B2-S06 | Arrancar espada sostenida por oponente | No +1 de Complexión a Desarmar |
| ORC-B2-S07 | Orco utiliza Empujar, Derribar o Agarrar | No +1 de Complexión, no mejora DF de Presa |
| ORC-B2-S08 | Golpea puerta con arma cuerpo a cuerpo | Daño/ataque del arma, sin +1 FUE de Complexión |
| ORC-B2-S09 | Prueba con única Desventaja por miedo | Puede ignorar esa fuente antes de tirar una vez por Escena |
| ORC-B2-S10 | Dolor + miedo independiente | Ignorar uno deja Desventaja; preguntar B3 sobre uso ineficaz |
| ORC-B2-S11 | Dolor + niebla independiente | Falla requisito «exclusivamente»; no neutralizar niebla |
| ORC-B2-S12 | Miedo pero prueba sin Desventaja | No Voluntad para crear Ventaja |
| ORC-B2-S13 | Fatigado y prueba pertinente de esfuerzo prolongado | Puede ignorar la Desventaja por agotamiento físico si cumple condición |
| ORC-B2-S14 | Exhausto MOV6→4 | Voluntad no devuelve MOV6 |
| ORC-B2-S15 | Colapsado pretende correr con Voluntad | No habilita esfuerzo imposible |
| ORC-B2-S16 | Dolor + Ayuda que cancela Desventaja | No crear Ventaja extra; procedimiento preciso B3 |
| ORC-B2-S17 | Supresor del Dolor elimina causa antes de prueba | No duplicar efecto para obtener bonus de dados |
| ORC-B2-S18 | 0 Vida por heridas y miedo | Incapacitado y Trauma por reglas; Voluntad no permite obviar 0 Vida |

El expediente previo contenía **ORC-T01–T30**; se añadieron **ORC-T31–T40** en `pruebas_balance.md`, total **40 criterios documentales no ejecutados**.

## VI. Incidencias e impacto

| ID | Severidad | Hallazgo | Estado y solución |
|---|---|---|---|
| ORC-INC-B2-01 | **Alta** | Requisito **«exclusivamente»** puede leerse como permiso para cancelar otras fuentes | **Corrección documental real** en `auditoria_y_desarrollo.md`; con fuente externa no hay habilitación literal |
| ORC-INC-B2-02 | **Alta** | Dos causas válidas independientes (dolor+miedo) no apilan dados; ignorar una puede no mejorar tirada | B3 decidir si se permite/consume uso sin efecto; mantener resultado de Desventaja por la otra |
| ORC-INC-B2-03 | **Alta** | Ayuda/Ventaja simultánea con Desventaja y Voluntad crea riesgo de «Ventaja por cancelación doble» | B3 diseñar secuencia inequívoca sin dar ventaja gratis |
| ORC-INC-B2-04 | **Media** | Fatigado/Exhausto/Colapsado se confunden y se podría restaurar MOV | Limitaciones canónicas preservadas; regresiones ORC-T35–37 |
| ORC-INC-B2-05 | **Media** | Usar «arrastrar objeto» para aplicar +1 a criatura opuesta o arma sostenida | Se excluyen Agarrar/Desarmar y oposición activa; regresiones ORC-T39–40 |
| ORC-INC-B2-06 | **Media** | Carga sin fórmula global invita a crear kg o capacidad universal oculta | No cuantificar racialmente; si fuera necesario resolver en anexo general, no en Orco |
| ORC-INC-B2-07 | **Media** | Sangre/Bastión podrían regalar Afinidad/Vínculo/Masivo, alterar Vida por tamaño | Compra 1/2/3 PR vigente; no poderes raciales nuevos |
| ORC-INC-B2-08 | **Media** | Supresor del Dolor y Valor Inspirado confunden tipos de protección | Solo elimina Desventaja elegible de prueba, no Defensa Mental ni magia ajena |
| ORC-INC-B2-09 | **Media de balance** | Capacidad 1/Escena quizá demasiado condicionada frente a +1 universal situacional de otras razas | Comparar escenarios emparejados en B4; **sin nerf ni mejora numérica prematura** |

## VII. Salida y siguiente trabajo

**B2 Orcos completada a nivel documental:** 14 fichas de efectos/sistemas, 18 escenarios de aceptación y 9 incidencias registradas. El paquete canónico se mantiene, no aparece necesidad de nuevas Habilidades ni cambios directos de Defensa, Ataque, Vida o Maná. Se corrigió una ambigüedad del borrador sobre causas simultáneas, **sin ratificar** el procedimiento fino de cancelación; regresiones ORC-T27/T28 ajustadas y ORC-T31–T40 añadidas.

**Próximo B2:** Goblinoides — paquetes Goblin/Hobgoblin/Bugbear, Ojo para la Oportunidad 1/Escena, Escurridizo y reglas de terreno difícil, Comple­xión Bugbear, movimiento y equipamiento, interacción de Ojo con Ayuda, información nueva y repetición de pruebas. Después Terios/Anihombres. **B3/B4/B5 y la redacción definitiva del Manual Básico quedan pendientes hasta cerrar B2 de todas las familias.** No editar `main`, sistema Foundry ni cartografía.
