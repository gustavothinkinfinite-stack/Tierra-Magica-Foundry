# CAT-02 — Auditoría inicial de Armas Ligeras

**Estado:** PRIMER LOTE APROBADO COMO VARIANTE DE PERFIL  
**Fecha:** 2026-10-04  
**Dependencia:** CAT-01  
**Regla de seguridad:** ninguna variante de esta fase obtiene una mecánica que no exista ya en Daga, Espada corta o Sable.

## Resultado

De las 40 propuestas iniciales de Armas Ligeras:

- **22** pueden entrar al Compendio como variantes exactas de un perfil canónico;
- **18** permanecen pendientes porque su forma sugiere una diferencia mecánica real que debe auditarse;
- no se crea ninguna propiedad nueva;
- no se modifica Daño, Penetración, FUE mínima, precio, Habilidad ni economía de acciones del núcleo.

Las 22 aprobadas se generan como Items reales mediante \`coreCatalog()\` y por tanto entrarán en el Compendio **Tierra Mágica — Equipo** cuando esta rama se integre y se construyan los packs.

## Variantes aprobadas

### Perfil Daga

Mantienen exactamente el perfil de **Daga**.

- Cuchillo de combate
- Cuchillo de monte
- Cuchillo de marinero
- Puñal ancho
- Daga curva
- Daga de abordaje

No reciben Penetración adicional, bono a ocultación ni ataque extra.

### Perfil Espada corta — hojas

Mantienen exactamente el perfil de **Espada corta**.

- Espada de caza
- Gladio
- Falcata corta
- Kukri
- Machete
- Seax

La forma histórica o cultural no crea una propiedad especial.

### Perfil Sable

Mantienen exactamente el perfil de **Sable**.

- Estoque corto
- Rapier
- Espadín
- Espada de duelo

\`Ágil\` continúa siendo descriptiva: no concede un bono universal.

### Perfil Espada corta — contundentes ligeras

Mantienen exactamente el perfil de **Espada corta** como ancla de equilibrio de arma ligera de una mano.

- Garrote corto
- Cachiporra
- Porra reforzada
- Martillo ligero
- Tonfa reforzada
- Bastón corto

En esta fase no reciben \`Impactante\` automáticamente, porque esa etiqueta puede interactuar con reglas presentes o futuras. Si se decide añadirla, debe auditarse como diferencia explícita.

## Propuestas pendientes

Estas 18 no se promueven todavía.

### Posible Penetración o función defensiva

- Estilete
- Daga de parada
- Daga de misericordia
- Garra de combate
- Katar
- Pico de combate corto

Motivo: su identidad podría justificar Penetración, interacción defensiva o compatibilidad específica. Clonarlas sin revisar sería engañoso; mejor mantenerlas pendientes.

### Armas arrojadizas

- Daga de lanzamiento
- Kunai de campaña
- Cuchillo arrojadizo
- Hacha de mano
- Tomahawk
- Chakram
- Dardo de guerra

Motivo: el sistema necesita cerrar de forma consistente alcance, atributo de ataque y frontera entre **Armas Ligeras** y **Armas a Distancia** para armas arrojadas.

### Enganche, flexible o alcance

- Hachuela
- Hoz de guerra
- Cadena corta de combate
- Látigo
- Látigo reforzado

Motivo: no se debe inventar Enganche, Alcance o control gratuito sólo por la forma del arma.

## Implementación Foundry

Archivo de variantes aprobadas:

- \`scripts/catalog/weapon-variants-approved.mjs\`

Integración:

- \`scripts/catalog/core-catalog.mjs\`

Regresiones:

- \`test/weapon-variants-approved.test.mjs\`
- \`test/weapon-catalog-master.test.mjs\`

Cada Item aprobado lleva:

- etiqueta \`catalog-expanded\`;
- etiqueta \`profile-variant\`;
- descripción explícita indicando qué perfil canónico usa;
- estadísticas clonadas del perfil, no recalculadas a mano.

Esto hace que una futura corrección del perfil base pueda auditarse sin convertir cada nombre cosmético en una nueva mini-regla.

## Siguiente fase

CAT-03 debe resolver las 18 Armas Ligeras pendientes, especialmente:

1. armas arrojadizas;
2. Penetración en hojas/picos de estocada;
3. armas de parada;
4. armas flexibles y de control;
5. si \`Impactante\` debe aplicarse a ciertos contundentes ligeros sin crear un bono numérico nuevo.
