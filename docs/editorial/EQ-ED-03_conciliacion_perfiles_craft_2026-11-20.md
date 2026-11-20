# EQ-ED-03 — Conciliación catálogo ↔ perfiles ↔ CRAFT-03

**Fecha:** 2026-11-20. **Autoridad consultada:** `main:docs/Tierra_Magica_Manual_Maestro.md`, blob `50c63cc50ac6b3ee14c52e8a0661a2d4fa07c658`. **Antecedente:** EQ-ED-02. Control documental, no prueba de Foundry ni ratificación nueva.

## Alcance y criterio

Se contrastaron las **29 filas** del catálogo monetario (líneas 10374–10404) con los perfiles de armas (3351–3381), armaduras (3474–3480), escudos (3504–3508) y recetas CRAFT-03 (5372–5402, 5428–5446), además de la excepción expresa del Cuchillo (5389). Un perfil no es una receta y el precio de venta no es el coste de materiales. CRAFT-03 conserva las estadísticas del capítulo 9 y remite el CM a CRAFT-02.

| Grupo | Entradas del catálogo | Perfil mecánico | Receta CRAFT-03 | Resultado |
|---|---:|---|---|---|
| Cuchillo | 1 | **No hay perfil propio de combate** | Herramienta utilitaria, Estándar, Artesanía Entrenada · Forja y metal, Adecuada, 3 h | **Excepción expresa**: no atribuir Daño/Penetración por inferencia |
| Armas cuerpo a cuerpo | 12 | Daga, Espada corta, Espada larga, Sable, Hacha, Maza, Martillo de guerra, Lanza, Alabarda, Mandoble, Gran hacha, Gran martillo | 12 recetas individualizadas | Concordancia nominal y de precio |
| Armas a distancia | 8 | Arco corto, Arco largo, Ballesta, Ballesta pesada, Pistola temprana, Rifle temprano, Pistola repetidora, Rifle repetidor | 8 recetas individualizadas | Concordancia nominal y de precio |
| Armaduras | 5 | Ligera, reforzada, Malla, pesada, Placas | 5 recetas individualizadas | Concordancia nominal y de precio |
| Escudos | 3 | Broquel, estándar, pesado | 3 recetas individualizadas | Concordancia nominal y de precio |
| **Total** | **29** | **28 perfiles directos + 1 excepción** | **29 vías documentadas** | **Sin discrepancia de precio detectada** |

La fila «Mandoble / Espadón equivalente» se corresponde con **Mandoble** (Daño 7, Pen 0, FUE mínima 2, 4 o) y la variante **Espadón** del catálogo ampliado, que hereda exactamente su perfil (líneas 3365, 3432). No es una receta adicional ni un segundo precio.

## Restricciones mecánicas que deben conservarse al maquetar

- **Armas:** las 20 entradas del catálogo con perfil directo reproducen el precio de su ancla mecánica; CRAFT-03 no añade Daño, Penetración, Recarga, Potencia, alcance ni ataques. El Cuchillo no es una vigésima primera arma con perfil nuevo.
- **Repetidoras:** Pistola repetidora (Daño 6, Pen 1, 35 o) y Rifle repetidor (Daño 7, Pen 2, 45 o) figuran como **Raras** en economía. Ambas exigen receta **Magistral**, Ingeniería Maestra · Armamento, Artesanía Entrenada · Forja y metal, instalación Especializada, Plano estable, 8 y 12 Jornadas respectivamente. «Repetición» no otorga ráfaga ni munición infinita.
- **Armaduras:** Protección/FUE mínima: ligera 1/0; reforzada 2/0; Malla 3/1; pesada 4/3; Placas 5/3. El ajuste normal está incluido en receta y no elimina penalizaciones de FUE.
- **Escudos:** Broquel +1 Defensa frontal sin Bloqueo especial; estándar +1 frontal/Bloqueo +2; pesado +2 frontal/Bloqueo +2, FUE 2 y Movimiento -1. Fabricar no altera esos valores.
- **Disponibilidad:** sólo se conserva «Rara» donde consta; no derivar disponibilidad general de complejidad de fabricación ni del nivel del mercado.

## Casos de aceptación documental

1. El precio de Mandoble/Espadón se mantiene en 4 o y la variante no crea receta nueva: **conforme**.
2. Cuchillo mantiene precio 3 p, receta utilitaria de 3 h y ningún perfil de combate inventado: **conforme**.
3. Las dos repetidoras mantienen su rareza, requisitos Magistrales y ninguna ráfaga automática: **conforme**.
4. Las cinco armaduras conservan Protección y FUE mínima del capítulo 9: **conforme**.
5. Los tres escudos conservan Defensa frontal, Bloqueo y penalización del pesado: **conforme**.
6. No se infiere CM numérico de cada fila ni disponibilidad individual ausente: **conforme**.

**Método y límite:** cotejo textual de tablas y cláusulas del Manual Maestro; no se ejecutaron pruebas automatizadas, simulaciones, pruebas en Foundry, PDF ni revisión visual. La concordancia se limita a las 29 entradas y a las reglas expresamente citadas.

## Próximos bloques

1. Revisar efectos, activación, Saturación y restricciones de REF-ALQ-01 a REF-ALQ-08 contra CRAFT-11, distinguiendo dosis y unidades.
2. Conciliar 15 Kits y 10 Otros con sus reglas de uso y recetas disponibles, sin inventar recetas faltantes.
3. Auditar la integración editorial del anexo racial B5 y referencias cruzadas antes de la maquetación.
4. Mantener abierta la laguna de cinco grados de Disponibilidad frente a cuatro niveles comerciales hasta definición canónica.
