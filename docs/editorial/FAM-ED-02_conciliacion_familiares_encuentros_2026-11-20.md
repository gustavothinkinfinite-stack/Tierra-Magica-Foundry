# FAM-ED-02 — Conciliación numérica de familiares y encuentros 10–11

**Fecha:** 2026-11-20. **Estado:** auditoría documental; no es una prueba de ejecución en Foundry.
**Fuente canónica:** `docs/Tierra_Magica_Manual_Maestro.md`, rama `main`, blob SHA `94d254fb2d607ed181821437e58d6539fc6aa422`.
**Alcance:** Paso 5 de creación, capítulo 14 y capítulo 23 del Manual Maestro. No se introducen reglas nuevas.

## Matriz de cuatro perfiles iniciales

Los valores siguientes se transcriben del Paso 5. Las defensas derivadas se calculan exclusivamente mediante las fórmulas allí publicadas: Defensa Corporal = 11 + RES y Defensa Mental = 11 + VOL.

| Perfil | Escala | Mov. | Vida | Defensa | Prot. | Ataque | Daño | PER | RES | VOL | Corporal derivada | Mental derivada |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Compañero | Pequeña | 6 | 10 | 12 | 0 | +2 | 2 | +2 | +2 | +2 | 13 | 13 |
| Explorador | Pequeña | Locomoción | 8 | 13 | 0 | +1 | 2 | +4 | +1 | +2 | 12 | 13 |
| Guardián | Pequeña | 5 | 12 | 12 | 1 | +3 | 3 | +2 | +3 | +2 | 14 | 13 |
| Místico | Pequeña | 6 | 8 | 12 | 0 | +1 | 2 | +3 | +1 | +4 | 12 | 15 |

**Explorador, cuatro elecciones excluyentes:** Corredor (tierra 7); Trepador (tierra 5, trepa 6); Nadador (tierra 4, nado 6); Volador (tierra 4, vuelo 6). No sumar velocidades de opciones diferentes. Nadador exige naturaleza viable en el medio; Volador conserva límites de carga, clima y caída.

**Místico:** la Resonancia Sobrenatural da +1 a Percepción únicamente para advertir manifestaciones directamente perceptibles de la categoría estrecha elegida. No se incorpora como +1 permanente al PER de la tabla ni a las Defensas; tampoco identifica fenómenos.

**Guardián:** Protección 1 no se suma a una armadura equivalente. Ningún perfil trae Maná propio, un turno adicional ni Reacción gratuita. Vínculo I es el grado inicial, no una quinta plantilla.

## Cotejo con capítulo 14

El capítulo 14 remite expresamente a los cuatro Perfiles Iniciales del Paso 5 y reutiliza las fórmulas 11 + VOL / 11 + RES. No publica una segunda tabla con números incompatibles. Los modos Autónomo, Vinculado y Reactivo regulan la intervención; una Acción Vinculada significativa consume normalmente la Reacción del propietario. El desarrollo del vínculo no mejora automáticamente las cifras de la matriz.

**Resultado:** 4/4 perfiles cotejados sin contradicción numérica entre las dos ubicaciones. La matriz de defensas derivadas es una ayuda editorial, no una modificación canónica.

## Encuentro 10 — Soldado

El capítulo 23 conserva `Marcial +5; Daño 7–8; Pen 1` como perfil general. El encuentro de barricada elige **Daño 7** únicamente como caso de ejemplo, con Vida 14, Defensas 14/13/13/15, Protección 3, Movimiento 6 e Iniciativa +3. No fija arma, alcance, recarga o técnica. **Laguna deliberada:** falta identificar arma y equipo para una ficha completamente equipada; no convertir la elección ejemplificativa en perfil universal.

## Encuentro 11 — Canalizador hostil

El capítulo 23 conserva Maná 15, Canalización +6 y Protección 0–1. El encuentro elige **Protección 0** y propone Evocación con **Luz Arcana** (Menor, 2 Maná) y **Barrera Cinética** (Básico, 3 Maná). Ambas entradas aparecen en el catálogo de Evocación del capítulo 11. La Barrera usa Reacción y suma +2 sólo a Defensa normal contra el ataque disparador: 13 → 15 para ese ataque. Si ambos efectos se activan válidamente, 15 − 2 − 3 = **10 Maná**. La selección es del ejemplo, no del arquetipo universal.

**Lagunas deliberadas:** Fuente, Atributo de lanzamiento para pruebas que lo exijan, adquisición y repertorio completo no quedan fijados para el PNJ genérico. No adjudicar ataque ofensivo ni bonificaciones implícitas.

## Controles realizados y límites

1. Lectura de `main` en esta ejecución; SHA de blob anotado arriba.
2. Comparación textual de Paso 5 con capítulo 14: cuatro perfiles y reglas de defensa coincidentes.
3. Cálculo aritmético de ocho Defensas derivadas con 11 + RES/VOL.
4. Comparación de los encuentros 10 y 11 con sus perfiles generales del capítulo 23 y con las entradas de Evocación del capítulo 11.
5. No se ejecutó Foundry ni se inspeccionó una exportación PDF. No se modificó el Manual Maestro porque no se encontró una contradicción normativa que justificara hacerlo.

## Próximos pendientes

- Revisar las referencias cruzadas e índices de los perfiles para la versión maquetada.
- Resolver únicamente con autorización canónica los campos abiertos de Soldado y Canalizador si se requieren fichas técnicas completas.
- Auditar la identidad visual y autorización de arte de los doce dioses, luego cartografía y maquetación.
- Verificar el estado y la integración de los PR editoriales abiertos antes de la publicación.
