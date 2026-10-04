# Catálogo Maestro de Armas — v1 borrador

**Estado:** CATÁLOGO ESTRUCTURADO · EXPANSIÓN PARCIALMENTE CANÓNICA  
**Fecha:** 2026-10-04  
**Fuente canónica de mecánicas:** \`docs/Tierra_Magica_Manual_Maestro.md\` y \`scripts/content.mjs\`  
**Fuente de catálogo:** \`scripts/catalog/weapon-catalog-master.mjs\`

## Objetivo

Construir una biblioteca amplia de armas para Tierra Mágica que pueda convertirse posteriormente en Items reales de Foundry sin inflar el sistema con diferencias mecánicas arbitrarias.

La biblioteca separa deliberadamente:

- **26 perfiles canónicos vigentes**: los 20 originales más 6 perfiles CAT-09;
- **218 entradas propuestas**, de las cuales 171 ya están aprobadas como variantes de perfil y 47 siguen pendientes;
- **244 entradas totales** en el catálogo maestro.

Una propuesta no se convierte en regla por existir en este archivo.

## Principio de perfiles

Las armas propuestas no reciben números nuevos automáticamente.

Las variantes aprobadas referencian uno de los perfiles canónicos como **perfil de referencia**. Ese perfil sirve para ordenar la futura auditoría, no para afirmar que la variante ya comparte todos sus valores.

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
| Arcos y proyectiles todavía propuestos | 8 |
| Ballestas | 13 |
| Pistolas | 17 |
| Rifles y armas largas | 20 |
| Armas regionales de Tierra Mágica | 30 |
| Armas arcano-industriales adicionales | 20 |
| **Total propuestas** | **218** |
| Perfiles canónicos vigentes | **26** |
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

La expansión se integra mediante `coreCatalog()` sin inflar `STARTER_CONTENT` con variantes cosméticas. En el estado actual:

- los 20 perfiles originales permanecen intactos;
- CAT-09 añade 6 perfiles canónicos nuevos;
- 171 variantes auditadas entran al Compendio;
- las 47 pendientes no se materializan como Items;
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

CAT-02…09 ya promovieron 171 variantes y 6 perfiles nuevos. Las fases siguientes deben resolver únicamente los bloqueadores explícitos de la cola pendiente, sin reabrir perfiles cerrados salvo evidencia de desequilibrio.
