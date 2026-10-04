# Catálogo Maestro de Armas — v1 borrador

**Estado:** PROPUESTA ESTRUCTURADA · NO CANÓNICA  
**Fecha:** 2026-10-04  
**Fuente canónica de mecánicas:** \`docs/Tierra_Magica_Manual_Maestro.md\` y \`scripts/content.mjs\`  
**Fuente de catálogo:** \`scripts/catalog/weapon-catalog-master.mjs\`

## Objetivo

Construir una biblioteca amplia de armas para Tierra Mágica que pueda convertirse posteriormente en Items reales de Foundry sin inflar el sistema con diferencias mecánicas arbitrarias.

La biblioteca separa deliberadamente:

- **20 armas canónicas vigentes**, ya utilizadas por el sistema;
- **224 armas propuestas**, todavía sin Daño, Penetración, FUE mínima, precio ni propiedades mecánicas propios;
- **244 entradas totales** en el catálogo maestro.

Una propuesta no se convierte en regla por existir en este archivo.

## Principio de perfiles

Las armas propuestas no reciben números nuevos automáticamente.

Cada propuesta referencia una de las 20 armas canónicas como **perfil de referencia**. Ese perfil sirve para ordenar la futura auditoría, no para afirmar que la variante ya comparte todos sus valores.

Ejemplo:

- una variante de espada puede señalar a Espada larga;
- una variante de ballesta puede señalar a Ballesta o Ballesta pesada;
- una variante de arma de fuego puede señalar a Pistola temprana, Pistola repetidora, Rifle temprano o Rifle repetidor.

Antes de entrar al Compendio oficial debe decidirse una de tres salidas:

1. **Variante cosmética:** usa exactamente el perfil canónico de referencia.
2. **Variante mecánica justificada:** recibe una diferencia concreta, auditada y costeada.
3. **Objeto fuera de Weapon:** si su funcionamiento depende de Energía, Caudal u otra autoridad de dispositivo, se modela o vincula como Device en vez de fingir que es un arma mundana.

## Cobertura

| Grupo | Propuestas |
|---|---:|
| Armas ligeras | 40 |
| Armas marciales | 40 |
| Armas pesadas | 30 |
| Arcos y proyectiles | 14 |
| Ballestas | 13 |
| Pistolas | 17 |
| Rifles y armas largas | 20 |
| Armas regionales de Tierra Mágica | 30 |
| Armas arcano-industriales adicionales | 20 |
| **Total propuestas** | **224** |
| Armas canónicas vigentes | **20** |
| **Catálogo total** | **244** |

## Metadatos estructurados

Cada entrada puede registrar:

- nombre;
- estado: \`canonical\` o \`proposal\`;
- tipo Foundry esperado;
- familia;
- Habilidad sugerida;
- Especialización sugerida;
- perfil canónico de referencia;
- tecnología;
- región/procedencia;
- disponibilidad;
- frontera de implementación;
- banderas pendientes de revisión;
- mecánicas, únicamente cuando ya son canónicas.

## Armas regionales

El borrador incorpora 30 nombres ligados a regiones del canon geográfico:

- Valdoria;
- Kharum;
- Liga de Bronce;
- Erelia;
- Lysendra;
- Solenar;
- Desierto de Vidrio.

La procedencia regional **no concede un bono mecánico por sí sola**. Sirve para identidad visual, disponibilidad, descripción, fabricación y futuro contenido de mundo.

## Frontera arcano-industrial

Las armas con tecnología \`arcano-industrial\` quedan marcadas como:

\`review-device-boundary\`

No se les asigna todavía consumo de Energía, Caudal, Estabilidad ni otros valores. Esa decisión debe coordinarse con la implementación de dispositivos y con CRAFT-13 para evitar dos autoridades mecánicas distintas.

## Integración con Foundry

El Compendio oficial de Equipo se genera desde el catálogo runtime mediante \`tools/build-packs.mjs\`.

Este borrador **todavía no se añade a STARTER_CONTENT**, por lo que:

- no cambia las 20 armas que ya aparecen en Foundry;
- no llena el Compendio con entradas sin auditar;
- no modifica \`system.json\`, \`package.json\`, \`template.json\` ni archivos de CRAFT-13;
- puede evolucionar en paralelo al agente de crafting.

## Criterio para promoción a Item real

Una entrada puede pasar de \`proposal\` a Item de Compendio cuando estén cerrados:

1. Habilidad y Especialización correctas;
2. perfil base;
3. Daño y atributo de daño;
4. Penetración;
5. FUE mínima;
6. una o dos manos;
7. Alcance cuando corresponda;
8. munición y Recarga cuando corresponda;
9. propiedades;
10. precio;
11. disponibilidad;
12. región/procedencia;
13. frontera Weapon/Device;
14. descripción final;
15. control de duplicados funcionales.

La siguiente fase del catálogo debe ser la **auditoría mecánica por familias**, empezando por Armas Ligeras y usando Daga, Espada corta y Sable como anclas canónicas.
