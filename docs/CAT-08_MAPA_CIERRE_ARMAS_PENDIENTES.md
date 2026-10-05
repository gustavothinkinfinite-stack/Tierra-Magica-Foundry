# CAT-08 — Mapa de cierre de armas pendientes

**Estado:** CLASIFICADO · 9 RESUELTAS POSTERIORMENTE POR CAT-09/10  
**Fecha:** 2026-10-04  
**Dependencia:** CAT-01…07

## Objetivo

Después de CAT-07 quedaban **53 propuestas**. CAT-09 resolvió 6 perfiles de proyectil y CAT-10 resolvió 3 armas flexibles, por lo que la cola vigente queda en **44**.

CAT-08 asigna a cada una un bloqueador explícito para evitar reglas implícitas. Tras el cierre de CRAFT-13, los bloqueadores de Crafting ya no significan “esperar a CRAFT-13”: significan que cada propuesta necesita un Perfil explícito compatible con la autoridad ya cerrada.

## Resumen

| Bloqueador | Cantidad | Autoridad principal |
|---|---:|---|
| Enrutamiento de arrojadizas | 7 | Combate |
| Varios cañones / dispersión | 10 | Combate |
| Material especial | 2 | Crafting |
| Frontera Weapon/Device | 25 | Crafting |
| **Total vigente** | **44** | |

## 1. Arrojadizas — 7

- Daga de lanzamiento
- Kunai de campaña
- Cuchillo arrojadizo
- Hacha de mano
- Tomahawk
- Chakram
- Dardo de guerra

El Manual ubica el armamento ligero arrojadizo dentro de **Armas Ligeras**. La implementación actual decide si un ataque es a distancia mediante \`system.skill === "rangedWeapons"\`.

Por ello, una arrojadiza con \`lightWeapons\` podría ser tratada como cuerpo a cuerpo por la lógica de Parada.

Cerrar esto exige una noción explícita de **modo de ataque** separada de la Habilidad. CRAFT-13 ya está cerrado y no resuelve ese enrutamiento de combate; por tanto estas siete entradas siguen bloqueadas por Combate, no por Crafting.

## 2. Armas flexibles — RESUELTO POR CAT-10

Cadena corta de combate, Látigo y Látigo reforzado ya poseen perfiles canónicos. CAT-10 define **Flexible** como propiedad descriptiva que no concede Alcance, Enganche, Desarmar mejorado ni control gratuito.

## 3. Proyectiles con perfil propio — 6

- Honda
- Honda de guerra
- Fustíbalo
- Jabalina
- Jabalina pesada
- Azagaya

No deben heredar \`Potencia N\` de un arco ni copiar sin justificación el perfil de una ballesta.

Pueden cerrarse más adelante mediante perfiles canónicos nuevos, siempre que se definan Habilidad, Atributo, daño, alcance, precio y propiedades sin contradecir el Manual.

## 4. Varios cañones, repetición física o dispersión — 10

- Ballesta repetidora
- Ballesta doble
- Pistola de dos cañones
- Pistola de cuatro cañones
- Rifle de dos cañones
- Trabuco
- Trabuco de abordaje
- Escopeta temprana
- Escopeta de dos cañones
- Trabuco portuario

El núcleo no dispone de una regla universal de:

- varios disparos por Acción;
- cargadores;
- cañones independientes;
- perdigones;
- cono/dispersión;
- consumo múltiple de munición.

CAT-08 no deduce ninguna de esas mecánicas desde el nombre del Item.

## 5. Material especial — 2

- Cuchillo de Vidrio
- Lanza de cristal

El motor de Materiales Especiales ya existe, pero “Vidrio” o “cristal” no seleccionan automáticamente un Perfil de Material ni conceden fragilidad, dureza, Penetración u otra propiedad. Cada arma necesita material exacto, cobertura y receta explícita antes de promocionarse.

## 6. Weapon/Device arcano-industrial — 25

Incluye las armas arcano-industriales del catálogo: pistolas y rifles especiales, hojas resonantes, armas de acumulador, armas conductoras, proyectores, ballestas asistidas y el cañón portátil experimental.

CRAFT-13 ya cerró Energía, Caudal, Estabilidad, mantenimiento y transacciones. Estas 25 propuestas siguen bloqueadas porque aún no poseen un Perfil explícito que determine si son Host, Módulo, arma vinculada a Device, Device atacante o modificación de un arma base.

La decisión futura debe establecer si cada entrada es:

1. un \`weapon\` autónomo;
2. un \`weapon\` vinculado a un \`device\`;
3. un \`device\` que resuelve un ataque;
4. o una modificación de crafting aplicada a un arma base.

## Estado de la expansión

Catálogo maestro: **244**.

- 29 perfiles canónicos;
- 171 variantes aprobadas;
- **200 armas runtime**;
- 44 propuestas bloqueadas y clasificadas.

CAT-08 convierte el remanente en una cola de trabajo explícita en vez de una lista ambigua.
