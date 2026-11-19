# Corrección editorial de Enanos — B5-I02 (19-11-2026)

**Estado:** cotejo documental de norma vigente, no nueva propuesta mecánica. Autoridad: `main:docs/Tierra_Magica_Manual_Maestro.md`, blob `0c8ddfb0b218bed38cd10962a1ac35bab8821466`.

## Hallazgo
El capítulo individual de Enanos remitía genéricamente Derribar a las reglas universales y afirmaba que cualquier corrección numérica permanecía fuera del paquete. Esa formulación omitía **B5-I02 ya vigente en main**: una facultad que eleva Escala efectiva para resistir Derribar concede **+1 circunstancial a Defensa de Maniobra sólo contra Derribar**, una sola vez por mejora equivalente. Se aplica a Cuerpo de Piedra. No altera Empujar, Agarrar, Defensa general, ataque ni daño.

## Contraste del ejemplo Empujar
La regla universal de Empujar en main establece: margen Claro = 2 espacios; contra objetivo una categoría mayor que el atacante, restar 1 espacio (mínimo 1 si hay éxito). Un atacante Pequeño contra Enano Pequeño que **resiste como Mediano** desplaza 1 espacio, siempre que el terreno lo permita. El ejemplo existente es válido **para ese escenario** y no debe extrapolarse a otras escalas, obstáculos ni fuentes de empuje.

## Cambios y regresiones
Se corrigió la frase de Derribar en `02_enanos/manual_final_propuesto.md` y `manual_final/capitulo_ascendencias_lectura_editorial.md`; el ejemplo Empujar permanece intacto.

- ENA-R01: atacante Pequeño, margen Claro, Enano defensor: 2 − 1 = 1 espacio (lectura normativa).
- ENA-R02: atacante Mediano, margen Claro, Enano defensor: 2 espacios; no reducir por tratar al Enano como Mediano.
- ENA-R03: atacante Pequeño intenta Derribar Enano: +1 circunstancial a Defensa de Maniobra del Enano, sin aplicarlo a Empujar.
- ENA-R04: ninguna acumulación repetida de la misma mejora equivalente.
- ENA-R05: la bonificación no se extiende a Agarrar, Desarmar ni Defensa general.

**Pruebas:** cinco casos documentados, cero ejecutados en Foundry, cero en mesa. La equivalencia de paginación física sigue pendiente. Sin cambios a `main`, mapa ni código operativo.
