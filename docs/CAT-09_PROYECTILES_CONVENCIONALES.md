# CAT-09 — Proyectiles convencionales

**Estado:** CERRADO · INCORPORADO AL MANUAL MAESTRO  
**Fecha:** 2026-10-04  
**Dependencia:** CAT-01…08

## Alcance

CAT-09 resuelve las seis entradas que CAT-08 había bloqueado por falta de perfil propio:

- Honda
- Honda de guerra
- Fustíbalo
- Azagaya
- Jabalina
- Jabalina pesada

El Manual Maestro no contenía estadísticas previas para estas seis armas. Los valores de CAT-09 son una **ampliación aprobada del catálogo**, balanceada contra Daga, Lanza, Arco corto, Arco largo y Ballesta; no se presentan como recuperación de una regla anterior.

## Perfiles

| Arma | Habilidad | Ataque | Daño | Pen | FUE mín. | Alcance óptimo | Precio | Propiedades |
|---|---|---|---:|---:|---:|---:|---:|---|
| Honda | Armas a Distancia | AGI | 3 + FUE | 0 | — | 12 | 2 p | Proyectil |
| Honda de guerra | Armas a Distancia | AGI | 4 + FUE | 0 | — | 18 | 5 p | Proyectil, Impactante |
| Fustíbalo | Armas a Distancia | AGI | 5 + FUE | 0 | — | 25 | 8 p | Proyectil, Impactante, 2 manos |
| Azagaya | Armas a Distancia | AGI | 3 + FUE | 0 | 0 | 12 | 2 p | Arrojadiza |
| Jabalina | Armas a Distancia | AGI | 4 + FUE | 0 | 0 | 10 | 3 p | Arrojadiza |
| Jabalina pesada | Armas a Distancia | AGI | 5 + FUE | 0 | 1 | 8 | 5 p | Arrojadiza |

## Criterios de balance

- Ninguno posee Penetración.
- Ninguno posee Recarga.
- Ninguno posee Repetición.
- Ninguno concede ataques adicionales.
- Todos usan AGI para atacar.
- Todos añaden FUE al daño porque el propio perfil lo declara.
- El alcance máximo de este bloque queda por debajo del Arco largo y la Ballesta pesada.
- Jabalina pesada alcanza daño base 5, pero lo compensa con alcance óptimo 8 y FUE mínima 1.
- Fustíbalo alcanza daño base 5 y alcance 25, pero requiere dos manos y no posee Potencia ni Penetración.

## Propiedades nuevas

**Proyectil** identifica un arma que impulsa munición física simple. No crea munición infinita, Recarga ni recuperación automática.

**Arrojadiza** identifica que ese perfil representa el uso lanzado del objeto. Se resuelve como ataque a distancia; una vez arrojado, el objeto no continúa en la mano hasta ser recuperado o reemplazado.

Estas propiedades no conceden bonos numéricos.

## Frontera con las Armas Ligeras arrojadizas

CAT-09 no resuelve:

- Daga de lanzamiento;
- Kunai de campaña;
- Cuchillo arrojadizo;
- Hacha de mano;
- Tomahawk;
- Chakram;
- Dardo de guerra.

Esas siete siguen bloqueadas porque el Manual las sitúa conceptualmente dentro de Armas Ligeras y la implementación actual usa la Habilidad del Item para distinguir ataque cuerpo a cuerpo de ataque a distancia. Resolverlas requiere separar **modo de ataque** de **Habilidad**, modificación que se mantiene fuera de esta rama mientras CRAFT-13 toca la autoridad de combate.

## Estado acumulado

Catálogo maestro: **244** entradas.

- **26 perfiles canónicos al cierre de CAT-09**;
- **171 variantes de perfil aprobadas**;
- **197 armas runtime al cierre de CAT-09**;
- **47 propuestas pendientes al cierre de CAT-09**.

CAT-10 amplía posteriormente el estado global a 29 perfiles canónicos, 200 armas runtime y 44 pendientes.

CAT-09 no modifica crafting, Energía, dispositivos, calidad, materiales especiales ni la lógica de combate compartida.
