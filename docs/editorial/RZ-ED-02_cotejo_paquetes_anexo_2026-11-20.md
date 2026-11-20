# RZ-ED-02 — Cotejo del anexo racial con paquetes y B5

**Fecha:** 2026-11-20. **Autoridad:** `main:docs/Tierra_Magica_Manual_Maestro.md`, blob `50c63cc50ac6b3ee14c52e8a0661a2d4fa07c658`. **Continuidad:** RZ-ED-01 y PR #112. Auditoría documental, sin prueba empírica.

## Incidencia confirmada — RZ-ED-02-I01 (prioridad alta)

El anexo Enanos, en la línea 13566, afirma literalmente: «No aparece un +1 general a Defensa de Maniobra. Derribar usa sus reglas universales; cualquier corrección numérica nueva permanece fuera del paquete canónico». La primera frase es cierta sólo si se entiende «general» (no universal); la segunda es **incorrecta y desactualizada** frente al cierre normativo aprobado **B5-I02**, línea 447, que concede expresamente **+1 circunstancial a Defensa de Maniobra únicamente contra Derribar** al Enano con Cuerpo de Piedra. También aplica a Dríade/Verdante Enraizados bajo sus requisitos. §3, líneas 269 y 366/404, describe la Escala efectiva pero debe leerse junto a B5-I02.

**Corrección editorial precisa propuesta para sustituir las dos últimas oraciones de la línea 13566, sin alterar la regla:** «No aparece un +1 general a Defensa de Maniobra. Sin embargo, contra Derribar, Cuerpo de Piedra concede +1 circunstancial a Defensa de Maniobra conforme a B5-I02; no se aplica a Empujar, Agarrar ni Desarmar». Mantener el ejemplo de desplazamiento de Empujar sólo si la tabla universal confirma sus cifras; no inferirlas de la regla de Derribar.

**Prueba documental reproducible:** localizar en el mismo archivo `#### Cierre normativo de Ascendencias`, `B5-I02` y `**Ejemplo de Empujar:**`; comparar literalmente ámbitos, destinatario y modificador. **Resultado:** contradicción real, no cambio de balance. **Pendiente:** aplicar sustitución controlada en una rama editorial con diff mínimo y comprobar coherencia posterior en `main` tras revisión/merge.

## Matriz de cotejo de las doce ascendencias

| Ascendencia | §3 | Anexo | Verificación documental focal | Resultado |
|---|---|---|---|---|
| Humanos | 253–261 | 13476–13520 | Don sin Forma, 3 PR y clasificación Significativos/Menores | Coincide con B5 y §5 |
| Enanos | 263–271 | 13524–13575 | Cuerpo de Piedra y Sangre de Metal | **I01: ejemplo de Derribar contradice B5-I02** |
| Élficos | 273–281 | 13579–13627 | Sentidos +1 PER acotado y Resonancia | Sin divergencia identificada en controles focales |
| Orcos | 283–291 | 13630–13676 | Complexión, Voluntad y 1/Escena | Sin divergencia identificada; B5-I07 rige fuentes múltiples |
| Goblinoides | 293–317 | 13680–13728 | Tres variantes, Ojo y Hobgoblin sin segunda facultad | Coincide con B5-I06 |
| Terios | 319–343 | 13732 en adelante | 1 principal + 1 secundaria o dominante; respiración separada de nado | B5-I05 prevalece; revisión exhaustiva aún pendiente |
| Feéricos | 345–372 | 13784 en adelante | Subtipos, Enraizar y vuelo | B5-I02 prevalece; revisión exhaustiva aún pendiente |
| Ankar | 373–381 | 13831 en adelante | Sentido del Umbral y Custodia | B5-I03 prevalece; revisión exhaustiva aún pendiente |
| Cristálidos | 383–394 | 13876 en adelante | Conductor Vivo requiere proyecto compatible | B5-I08 prevalece; revisión exhaustiva aún pendiente |
| Verdantes | 395–406 | 13922 en adelante | Sustento, bioma, Enraizar | B5-I02/I09 prevalecen; revisión exhaustiva aún pendiente |
| Micelios | 408–419 | 13967 en adelante | Red viva continua, 12 espacios, Acción | B5-I04 prevalece; revisión exhaustiva aún pendiente |
| Coralios | 421–433 | 14009 en adelante | Tierra 5, agua 6, hidratación, Protección 1 | B5-I01/I05/I09 prevalecen; revisión exhaustiva aún pendiente |

**Alcance:** matriz de ubicación y controles focales, **no certificación exhaustiva de equivalencia**. Las líneas indicadas corresponden al blob citado y pueden variar tras nuevas ediciones.

## Casos de aceptación

1. Enano resiste Derribar con Cuerpo de Piedra: +1 circunstancial a Defensa de Maniobra, sólo allí (B5-I02).
2. Enano resiste Empujar: Escala efectiva Mediana para cálculo de distancia; no aplicar ese +1.
3. Dríade/Verdante en suelo apropiado, Enraizar activo: +1 contra Derribar; sin anclaje válido, no.
4. Hobgoblin: sólo Ojo, no Señal de Coordinación ni Disciplina Preparada.
5. Coralio recorre tierra y agua: sumar fracciones, no duplicar presupuesto de Movimiento.
6. Humano elige Don sin Forma: 1 Significativo o 2 Menores compatibles, sin transformar elección en PR.

**Estado de pruebas:** seis casos especificados documentalmente; ninguno ejecutado en mesa o Foundry. **Siguiente bloque:** corregir I01 mediante diff acotado; continuar lectura detallada de Terios, Feéricos, Ankar, Cristálidos, Verdantes, Micelios y Coralios, y luego verificar glosario y referencias cruzadas. No declarar cierre del libro ni de auditoría racial.
