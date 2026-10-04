# CAT-08 — Mapa de cierre de las 53 armas pendientes

**Estado:** CLASIFICADO · SIN PROMOCIÓN MECÁNICA  
**Fecha:** 2026-10-04  
**Dependencia:** CAT-01…07

## Objetivo

Después de CAT-07 quedan **53 propuestas** del catálogo maestro que no deben convertirse automáticamente en Items runtime.

CAT-08 asigna a cada una un bloqueador explícito para evitar que una futura expansión introduzca reglas implícitas o colisione con CRAFT-13.

## Resumen

| Bloqueador | Cantidad | Autoridad principal |
|---|---:|---|
| Enrutamiento de arrojadizas | 7 | Combate |
| Control con armas flexibles | 3 | Combate |
| Perfil nuevo de proyectil | 6 | Catálogo |
| Varios cañones / dispersión | 10 | Combate |
| Material especial | 2 | Crafting |
| Frontera Weapon/Device | 25 | Crafting |
| **Total** | **53** | |

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

Cerrar esto exige una noción explícita de **modo de ataque** separada de la Habilidad. El archivo que hoy resuelve esa frontera es también modificado por CRAFT-13, por lo que CAT-08 no lo toca.

## 2. Armas flexibles — 3

- Cadena corta de combate
- Látigo
- Látigo reforzado

No existe una propiedad canónica universal de Enganche. Tampoco debe asumirse Alcance, Desarmar mejorado o control gratuito sólo por la forma.

Estas entradas requieren una decisión de diseño explícita.

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

Requieren coordinación con crafting para decidir qué significa mecánicamente el material: coste, fabricación, reparación, fragilidad, dureza, Penetración u otra propiedad.

## 6. Weapon/Device arcano-industrial — 25

Incluye las armas arcano-industriales del catálogo: pistolas y rifles especiales, hojas resonantes, armas de acumulador, armas conductoras, proyectores, ballestas asistidas y el cañón portátil experimental.

No se promueven mientras CRAFT-13 esté desarrollando Energía, Caudal, Estabilidad, mantenimiento y transacciones de crafting.

La decisión futura debe establecer si cada entrada es:

1. un \`weapon\` autónomo;
2. un \`weapon\` vinculado a un \`device\`;
3. un \`device\` que resuelve un ataque;
4. o una modificación de crafting aplicada a un arma base.

## Estado de la expansión

Catálogo maestro: **244**.

- 20 armas canónicas;
- 171 variantes aprobadas;
- **191 armas runtime**;
- 53 propuestas bloqueadas y clasificadas.

CAT-08 convierte el remanente en una cola de trabajo explícita en vez de una lista ambigua.
