# CAT-03 — Cierre parcial de Armas Ligeras especiales

**Estado:** 8 APROBADAS · 10 BLOQUEADAS POR FRONTERA MECÁNICA  
**Fecha:** 2026-10-04  
**Dependencia:** CAT-02

## Aprobadas

Estas ocho entradas entran como Items reales usando un perfil canónico exacto:

| Variante | Perfil |
|---|---|
| Estilete | Daga |
| Daga de parada | Daga |
| Daga de misericordia | Daga |
| Garra de combate | Daga |
| Katar | Daga |
| Pico de combate corto | Daga |
| Hachuela | Espada corta |
| Hoz de guerra | Espada corta |

La forma o el nombre no conceden por sí solos Penetración, Parada, Enganche, Desarme, alcance ni bonos ofensivos.

## Bloqueadas

Permanecen fuera del Compendio runtime:

- Daga de lanzamiento
- Kunai de campaña
- Cuchillo arrojadizo
- Hacha de mano
- Tomahawk
- Chakram
- Dardo de guerra
- Cadena corta de combate
- Látigo
- Látigo reforzado

### Motivo

El Manual Maestro define **Armas Ligeras** como armamento ligero de mano **o arrojadizo**, pero la implementación actual identifica los ataques a distancia sólo cuando \`system.skill === "rangedWeapons"\`.

Promover ahora un arma arrojadiza manteniendo \`lightWeapons\` provocaría una clasificación incorrecta en las defensas reactivas: podría tratarse como ataque cuerpo a cuerpo a efectos de Parada.

Corregir esa frontera exige tocar la autoridad de combate, archivo actualmente modificado por CRAFT-13. CAT-03 no invade esa rama.

Las armas flexibles permanecen pendientes porque el núcleo no define todavía una propiedad universal de Enganche o alcance para ellas.

## Resultado acumulado

Armas Ligeras propuestas: 40.

- CAT-02 aprobó 22.
- CAT-03 aprueba 8.
- Total integrado: **30**.
- Pendientes: **10**.
