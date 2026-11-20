# C-RES/3 — Reserva HUM1: exclusión editorial sin alterar la fuente

**20-11-2026 · Propuesta no canónica · revisión documental.** Autoridad contrastada: `main:docs/Tierra_Magica_Manual_Maestro.md`, blob `0c8ddfb0b218bed38cd10962a1ac35bab8821466`. Se leyeron tablero, README, plan, B5 v4, C-B5/1, C-RES/1, C-RES/2, control C-NUM/2, manuscrito y expediente Humanos.

## Incidencia real

El manuscrito de lectura, dentro de la sección jugable **Humanos**, todavía imprimía el párrafo «Aclaración editorial propuesta, pendiente de aprobación» que asignaba categorías Menor/Significativo a seis opciones de *Don sin Forma*. Aunque la frase declaraba su carácter propuesto, la ubicación en el cuerpo jugable podía inducir a usarla como regla. La reserva HUM1 en el registro de diferencias exige no convertir esa clasificación interpretativa en norma vigente.

## Corrección aplicada

Se eliminó **sólo del manuscrito de lectura** el párrafo clasificatorio HUM1. La descripción de las opciones y sus costes canónicos, ejemplos de juego, PD/PR y demás texto racial permanecen sin alteraciones. El párrafo se conserva íntegro en `../01_humanos/manual_final_propuesto.md` para revisión global del creador; no se suprime evidencia ni se modifica `main`. El prefacio del manuscrito sigue señalando que Menor/Significativo requiere decisión editorial, pero **no es instrucción de juego**. Esta excepción de producción se añade a las exclusiones ya identificadas en C-RES/1 (reserva C11 y notas NO IMPRIMIR).

## Alcance y consecuencias

El cotejo textual C-RES/2 fue realizado **antes** de esta corrección: desde ahora existe una diferencia intencional adicional entre fuente individual y manuscrito para Humanos. No citar C-RES/2 como igualdad literal vigente sin esa salvedad. El conteo C-NUM/2 es una fotografía previa: sus cifras de fuente no cambian, pero el manuscrito se acorta por el párrafo excluido; recalcular antes de certificar la extensión definitiva del manuscrito. No se ejecutó maqueta, Foundry ni mesa (0/0/0); no se aprobó ninguna alternativa B5.

**Próximo control sustantivo:** recalcular la extensión del manuscrito actualizado, comprobar si otras reservas normativas están dentro de los bloques imprimibles y sólo entonces decidir cierre documental C condicionado. La maquetación física y la aprobación canónica quedan fuera de esta ejecución.


## Seguimiento C-NUM/3 — 20-11-2026

Se recalculó el archivo actual `capitulo_ascendencias_lectura_editorial.md` con separación por espacios (`trim().split(/\s+/)`), delimitando cada bloque por encabezados Markdown `##`. **Archivo completo: 9.637 tokens**, frente a 9.670 del control C-NUM/2 (**−33**). Los doce bloques raciales, en orden C01–C12: **727, 836, 801, 767, 792, 757, 807, 826, 756, 760, 780, 805**; **total 9.466**, frente a 9.499 (**−33**). Las doce secciones continúan entre 650 y 850 tokens; el mínimo es Humanos (727) y el máximo Enanos (836). Los 171 tokens restantes corresponden al contenido y la procedencia editorial fuera de los doce bloques. Estas cifras describen el manuscrito de lectura, **no reemplazan los 9.574 tokens de las fuentes individuales** ni prueban paginación física.

Barrido textual de los doce bloques por expresiones `no canónico`, `pendiente de aprobación`, `reserva editorial`, `propuesta` y `Menor/Significativo`: **no aparecen reservas técnicas explícitas de aprobación ni la clasificación HUM1** en el cuerpo racial. Sí aparecen propuestas **culturales** expresamente calificadas como locales o no universales, sin otorgar beneficios mecánicos; conservarlas no implica ratificación de canon. El barrido por palabras clave no certifica por sí solo ausencia de cualquier regla nueva implícita: permanece necesaria lectura semántica y revisión global del creador. Sin pruebas de mesa, Foundry ni maqueta.
