# Grimorio 60 — Auditoría fase 4: fuzzing de secuencias

**Estado:** EN DESARROLLO · no canoniza los 42 hechizos nuevos.  
**Base:** núcleo posterior a la fase 3, schema v4.  
**Objetivo:** buscar exploits emergentes al encadenar subsistemas durante muchas decisiones consecutivas.

## Método

La fase 3 evaluó probabilidades exactas y combinaciones puntuales. Esta fase añade un modelo de estado reproducible que mezcla:

- Acción y Reacción;
- Movimiento;
- Vida, 0 Vida y Trauma;
- Maná y Sobrecarga;
- Sostenimiento y Doble Sostenimiento;
- curación inmediata y periódica;
- Saturación alquímica;
- Energía de dispositivos;
- Familiares;
- Origen Remoto;
- Invisibilidad;
- invocaciones;
- Descanso y Descanso Completo.

El fuzzer usa un generador pseudoaleatorio con semilla explícita. Por tanto un fallo puede reproducirse exactamente.

La suite principal ejecuta **256 semillas × 800 pasos = 204.800 transiciones**. Además incorpora secuencias dirigidas para exploits particularmente peligrosos.

## Invariantes comprobados después de cada transición

1. Vida propia y del aliado permanecen dentro de sus máximos.
2. Maná permanece entre 0 y su máximo.
3. Energía de dispositivos nunca aparece sin una fuente autorizada.
4. Fatiga permanece entre 0 y 3.
5. Trauma no disminuye por curaciones, descansos ordinarios o magia no autorizada.
6. Movimiento gastado nunca excede el Movimiento disponible.
7. Un efecto Sostenido no aparece dos veces.
8. Sostenimiento no supera 1, o 2 con Doble Sostenimiento.
9. Saturaciones alquímicas no se duplican.
10. 0 Vida implica Incapacitado.
11. Matriz Vital no puede conservar pulsos si el objetivo está a 0 Vida o si el hechizo dejó de estar Sostenido.
12. Invocaciones demandantes existen sólo mientras su hechizo fuente permanece Sostenido.
13. Invisibilidad existe sólo mientras su efecto fuente permanece Sostenido.
14. Una operación rechazada no gasta Acción, Reacción, Maná, Energía, dosis ni cambia el estado.
15. Acción/Reacción sólo reaparecen al comenzar un turno válido.
16. Movimiento gastado sólo se reinicia al comenzar un turno válido.
17. Fatiga sólo disminuye mediante Descanso Completo en este modelo.
18. Dosis preparadas nunca se crean mediante uso.
19. Vida sólo aumenta por rutas de recuperación declaradas.
20. Maná sólo aumenta por recuperación arcana o descanso declarado.

El modelo es deliberadamente conservador y no sustituye la implementación Foundry. Su función es generar secuencias adversariales y fijar invariantes que después deben corresponder con las guardas reales.

## Secuencias dirigidas

### F4-01 — Matriz Vital y 0 Vida

Secuencia:

1. activar Matriz Vital;
2. conservar pulsos pendientes;
3. recibir daño hasta 0 Vida;
4. intentar resolver un pulso.

Resultado exigido: Matriz Vital termina al llegar a 0 y el pulso posterior no puede levantar al objetivo.

### F4-02 — Pérdida de Sostenimiento y estado periódico

Hallazgo durante la construcción del fuzz:

si Matriz Vital conserva un contador de pulsos separado y otro Sostenimiento la expulsa, el contador no puede sobrevivir por su cuenta.

**Regla de auditoría:** todo estado periódico o auxiliar ligado a un Sostenimiento termina cuando desaparece su fuente.

Esta regla deberá aplicarse a futuros efectos persistentes, no sólo a Matriz Vital.

### F4-03 — Invisibilidad y ofensiva fallida

La redacción aprobada indica que una acción ofensiva rompe Invisibilidad **después de resolverse**. Por tanto no depende de acertar.

Resultado exigido: atacar o lanzar una ofensiva rompe Invisibilidad tanto con éxito como con fallo, incluso mediante Origen Remoto. Un intento bloqueado antes de convertirse en acción —por ejemplo Paso Breve incompatible con Origen Remoto— no la rompe.

### F4-04 — Invocaciones sucesivas

- Sin Doble Sostenimiento, relanzar Llamada Menor reemplaza la instancia anterior.
- Con Doble Sostenimiento pueden coexistir como máximo dos invocaciones demandantes compatibles.
- Relanzar el mismo hechizo no crea una tercera entidad.

### F4-05 — Saturación alquímica

Dos Pociones de Recuperación Arcana de la misma familia no pueden encadenarse antes de un Respiro. La segunda tentativa es rechazada sin gastar Acción ni dosis. Tras un Respiro, una nueva dosis vuelve a ser válida y Maná sigue limitado por su máximo.

### F4-06 — Transferencia Vital

La propuesta conserva Vida neta entre lanzador y objetivo. El lanzador no puede caer por debajo de 1 Vida como coste de la transferencia.

### F4-07 — Economía cruzada

Una Acción gastada por magia impide utilizar después en el mismo turno:

- dispositivo de Acción;
- Guardia;
- nueva orden al Familiar.

La Reacción sigue siendo independiente hasta gastarse. Un Escudo de campo reactivo consume esa Reacción e impide después una Acción Vinculada en el mismo turno.

## Limitaciones deliberadas

Esta fase no simula todavía:

- geometría completa de mapas;
- cobertura derivada de paredes/tokens reales;
- perfiles concretos de entidades invocadas;
- Heridas Graves específicas y sus topes individuales de curación;
- decisiones narrativas del DJ;
- fabricación o tiempos económicos de campaña;
- efectos aún no suficientemente definidos de Trasposición y Umbral.

Esas áreas requieren datos más concretos antes de ser fuzzadas sin inventar reglas.

## Archivos

- `test/helpers/grimorio-fuzz-model.mjs`: modelo de estado y transiciones.
- `test/grimorio-60-sequence-fuzz.test.mjs`: 204.800 transiciones reproducibles y secuencias dirigidas.
- `npm run audit:grimorio:fuzz`: ejecución aislada.

## Criterio de salida

La fase se considera verde cuando:

1. la suite completa del repositorio pasa;
2. las 204.800 transiciones no violan invariantes;
3. toda secuencia dirigida queda cubierta por regresión;
4. los hallazgos que afecten al núcleo vigente se corrigen antes de canonizar nuevos hechizos;
5. los hallazgos exclusivos de los 42 candidatos se fijan en el snapshot de auditoría y no se publican aún como catálogo estable.
