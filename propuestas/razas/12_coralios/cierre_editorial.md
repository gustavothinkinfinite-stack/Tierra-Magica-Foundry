# Coralios — Cierre editorial del expediente inicial v0.1

**Estado:** expediente **completo como borrador**, no aprobado ni canónico. 17-11-2026. **Rondas B1 y B2 documentales completadas; B3–B5 pendientes**: este cierre NO constituye auditoría global ni versión final de Manual Básico.

## Archivos persistidos
1. [Auditoría y desarrollo](./auditoria_y_desarrollo.md): canon del paquete v0.3, biología, ciclo vital, cuatro tradiciones culturales, instituciones, infraestructura, religión y propuestas identificadas COR-01 a COR-10.
2. [Doble página](./doble_pagina.md): 709 palabras imprimibles, página narrativa y jugable, sin nuevos beneficios raciales.
3. [Brief de arte](./brief_arte.md): escena «El pacto de las dos orillas», cuatro viñetas, guía visual y prohibición de alterar mapa.
4. [Pruebas de balance](./pruebas_balance.md): **48 casos iniciales + 16 regresiones B2 (COR-T49–COR-T64), total 64 casos documentales**; **cero** ejecuciones de Foundry o playtests empíricos.
5. Este cierre editorial.

## Verificación del canon
- Manual Maestro `main` blob `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`, líneas 421–433: Coralio Mediano, Movimiento terrestre 5/acuático 6, Respiración Anfibia con hidratación, Esqueleto Coralino Protección Natural 1 sin suma a armadura, Sentido de Corriente +1 PER condicionado al agua.
- Reglas transversales (líneas 229–250), Rasgo Anfibio (2206–2211), Resistencia Ambiental (2294 ss.), Ascendencia/Origen/Trasfondo (441–490).
- Eïra y Primera Semilla (§26), Nacariel, Cobravia, Puerto Umbral, Mar y Crisis de Nacre de 598 C. sin causa resuelta.
- Sin Fuente, Vínculo, magia oceánica, Habilidad, Protección adicional, Acción o inmunidad gratuitos.

## Decisiones propuestas cerradas **sólo dentro del borrador**
- Fisiología coralina viva, con matriz calcificada interna, tejidos flexibles, nutrición e hidratación, madurez orientativa 18–30 años y longevidad 80–150 años; **no** otorga inmunidad ni recursos infinitos.
- Cuatro perfiles anatómicos/ambientales sin diferencia de reglas.
- Cuatro tradiciones no obligatorias: Consejos de Marea, Casas de Crecimiento, Ligaduras de Sal y Archivistas del Fondo.
- Tres tipologías arquitectónicas: barrios de cresta, patios sumergidos, dársenas de transición. No son localizaciones ratificadas.
- Ceremonia plural Vigilia de la Sal Clara, sin Vínculo gratuito.
- **CHC-01 Cuidado de la Humedad**: pauta interpretativa opcional **no canónica**, sin gasto de PD/PR, que evita doble castigo por la misma privación y daño instantáneo al salir del agua. Auditado documentalmente en B2; aún requiere pruebas B3 y comparación B4 antes de cualquier integración.
- No añadir Resonancia Oceánica al paquete: sería un Rasgo o subsistema independiente que necesitaría coste y reglas completas.

## Incidencias pendientes de auditoría
| ID | Severidad preliminar | Problema | Ronda |
|---|---|---|---|
| COR-R1 | Media | Condición «razonablemente hidratado» sin reloj racial | B2, B3 |
| COR-R2 | Media | Lecturas expansivas del Sentido de Corriente como radar | B2, B3, B4 |
| COR-R3 | Media | Movimiento mixto 5/6 sin doble reserva por turno | B2, B3 |
| COR-R4 | Alta si se interpreta mal | Acumular Protección 1 con armadura o fabricar recursos de placas | B2, B3 |
| COR-R5 | Media | Comparación de Respiración Anfibia + nado 6 frente a Anfibio 1 PR | B4 |
| COR-R6 | Baja | Falta de especificación de edades y hábitat en canon | B1 |

## Control editorial
**La doble página v0.1 NO es el texto final**. Una vez que las 12 familias terminen su fase A, corresponde ejecutar B1 (canon), B2 (mecánica), B3 (exploits), B4 (comparación por raza), B5 (regresiones globales) y sólo después C (doce textos `manual_final_propuesto.md`).

**Resultado actualizado al 17-11-2026:** los **12/12 expedientes iniciales y sus auditorías B1/B2 documentales están completados**. Humanos también cuenta con expediente y B1/B2; B3/B4/B5, las versiones editoriales definitivas propuestas y las ejecuciones reales siguen pendientes. No se modificó `main`, el Manual Maestro, el atlas ni Foundry.

**Próximo bloque sustantivo:** iniciar **B3 de Humanos** (exploits/secuencias de Don sin Forma, 25 PD/3 PR, creación, usos simultáneos y progresión), después B3 de Enanos y las otras diez familias. No repetir fase A o B1 ya completadas.

## Actualización de mecánicas B2 — 17-11-2026

- Creado `auditorias/02_mecanicas_y_costes.md` con **18 fichas de subsistemas, 20 escenarios analizados, 11 incidencias**. `pruebas_balance.md` contiene **64 criterios documentales (48 iniciales + 16 B2), cero ejecutados**.
- Movimiento terrestre **5** y acuático **6** no habilitan reservas simultáneas; conversión al alternar tierra/agua, Retirada/Correr/Exhausto quedan para B3 transversal con Hada y Terios.
- **Esqueleto Coralino** Prot1 y armadura Prot3 dan **3**, no 4. Ante Pen1 la Protección efectiva es **2**. No se traslada Proteccion 1 a Resistencia automática a presión, toxinas, daños de caída o Trauma.
- **Respiración Anfibia** exige hidratación razonable y no inmuniza a agua peligrosa; el Rasgo General **Anfibio 1 PR** no se vuelve segundo sistema respiratorio ni borra automáticamente la condición racial. `CHC-01` sigue procedimiento **opcional no canónico**, sin reloj de horas ni daño fijo nuevo.
- **Sentido de Corriente** +1 PER sólo sobre señales acuáticas determinantes; nada de sonar, magia oceánica, identidad del causante o +1 a Iniciativa. `Resonancia Oceánica` sigue fuera del paquete.
- B2 de las **12/12 familias** completada documentalmente; se requieren B3/B4/B5 antes de textos finales. No se editaron `main`, Foundry ni mapa.
