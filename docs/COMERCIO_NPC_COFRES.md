# Comercio de NPC y cofres — Tierra Mágica

**Estado:** funcionalidad propuesta, incorporada en rama de desarrollo. No cambia el canon de precios, rarezas ni la economía del Manual Maestro. Se aplica a Foundry VTT 13/14 y al sistema `tierra-magica`.

## Objetivo

Un NPC puede actuar como **comerciante** (venta por monedas), **cofre** (retirada gratuita) o NPC normal (sin comercio). El DJ decide la lista exacta de objetos; no se generan objetos ni recompensas automáticamente. Los objetos se seleccionan desde documentos `Item` existentes del mundo o compendios; un `JournalEntry` o una página de Diario no es un Item y no puede entregarse directamente.

## Cinco modelos iniciales y cofre

El DJ puede usar el siguiente comando en una macro de script, tras cargar el mundo:

```js
await game.tierraMagica.commerce.createStarterActors();
```

Crea **seis actores de tipo NPC sin objetos**:

1. Herrero de pueblo — herrería, nivel Aldea/pueblo.
2. Mercader de caminos — general, nivel Villa/mercado regional.
3. Alquimista de ciudad — alquimia, nivel Ciudad.
4. Ingeniero de la Liga de Bronce — ingeniería, nivel Ciudad.
5. Mercader arcano metropolitano — comercio arcano, nivel Metrópolis.
6. Cofre de botín — retirada gratuita.

Los nombres son ejemplos operativos, no personajes narrativos canonizados. Los actores quedan con permiso general de **Observador** y token de prototipo **vinculado**, para facilitar interacción compartida desde el mapa. Crear los modelos es una acción explícita y no ocurre automáticamente al instalar el sistema.

## Configuración

1. Abrir la pestaña **Actores** y crear un actor de tipo **NPC** o abrir uno de los modelos.
2. En su ficha pulsar **Configurar establecimiento** (visible solamente para DJ).
3. Elegir **Comerciante**, **Cofre / botín** o **NPC sin comercio**.
4. En caso de comerciante elegir especialidad y nivel comercial.
5. **Arrastrar objetos Item** desde el directorio o compendios sobre el editor, o pegar el UUID de un Item y pulsar **Agregar**.
6. Ajustar stock, precio expresado en cobres, unidades correspondientes a ese precio, nivel mínimo y familia comercial de cada oferta. Pulsar **Guardar establecimiento**.
7. Colocar el NPC como token en una Escena (preferentemente **vinculado** al Actor para conservar stock común en todas las Escenas).

**Jugadores:** hacen doble clic en el token comercial para abrir el establecimiento; eligen uno de los personajes terminados que controlan, establecen cantidad y pulsan **Comprar** o **Tomar**. Los DJs también pueden abrir la tienda desde la ficha y administrar el establecimiento. Un DJ puede mantener Mayús mientras hace doble clic para abrir la ficha normalmente.

## Clasificación y control de objetos

Las dos dimensiones son independientes:

| Nivel de mercado | Nivel numérico | Ejemplo de acceso |
| --- | ---: | --- |
| Aldea / pueblo | 1 | Bienes corrientes |
| Villa / mercado regional | 2 | Bienes poco habituales |
| Ciudad | 3 | Bienes raros, equipo arcano configurado |
| Metrópolis / enclave excepcional | 4 | Ofertas excepcionales o restringidas asignadas por DJ |

Estas categorías son **controles de interfaz/comercio**, no tablas nuevas de disponibilidad del mundo ni promesas de que un bien exista en una ciudad. La especialidad puede ser general, herrería, alquimia, ingeniería o arcana. Una oferta debe coincidir con la especialidad del establecimiento y cumplir su nivel mínimo; el DJ puede asignar un nivel mayor o menor manualmente a un objeto concreto.

Al agregar un Item se propone un nivel mínimo en función de `system.physical.availability` y, en su caso, los indicadores estructurados de magia, runas, improntas o encantamiento. La disponibilidad desconocida parte del nivel 4 para no convertir errores de datos en mercancía común. Las ofertas **no** se cargan automáticamente por especialidad, ni siquiera en una metrópolis.

Ejemplo: dos herreros pueden incluir la misma armadura encantada en sus catálogos, pero una oferta de nivel mínimo 3 no aparecerá como comprable en un herrero rural de nivel 1. Si el DJ necesita justificar una excepción, puede cambiar expresamente el nivel mínimo de **esa oferta**, sin cambiar el Item canónico.

## Precios, monedas y existencias

- Los importes se expresan en **cobres**. El editor fija por defecto el precio definido en el Item al agregarlo; queda guardado en la oferta y puede modificarse **sólo para ese comerciante**, sin reescribir el Item canónico.
- Los Items sin precio exacto siguen sin precio y no pueden comprarse salvo que el DJ establezca un importe concreto en esa oferta.
- Los precios por lote usan el campo `priceQuantity`. El importe total de una compra se **redondea hacia arriba al cobre**; así dividir la compra de una flecha en múltiples transacciones no la convierte en gratuita.
- Los cofres siempre entregan gratis; no requieren precio ni clasifican por nivel comercial.
- El **stock es finito** y se descuenta por operación. No hay reposición automática.
- La moneda se resta de `system.currency.totalCopper` del comprador. El objeto se crea en su inventario con procedencia y metadatos de adquisición, conservando su precio canónico de Item.
- No se permiten transacciones de Items de tipo hechizo, técnica, rasgo ni fórmula de conocimiento; sólo `weapon`, `armor`, `shield`, `equipment` y `device`. El DJ prepara dosis u otros consumibles como Items físicos compatibles antes de comercializarlos.

## Autoridad y fallos

La transacción se ejecuta en el cliente del **DJ activo principal**; éste valida personaje, permiso de propietario, cantidad, stock, precio y categoría. El DJ registra un recibo idempotente por solicitud en el Actor comerciante antes de mutar dinero o inventario, de modo que repetir la misma solicitud no entregue dos veces un objeto. Las operaciones se serializan; en caso de fallo se intenta revertir entrega y cobro. Si una caída interrumpe la operación, el recibo puede quedar pendiente y el DJ debe revisar el estado; no se hace una segunda entrega silenciosa.

**Limitaciones presentes:** la funcionalidad requiere un DJ conectado; no aplica distancias de interacción, horarios, regateo, venta del jugador al NPC, reposición automática ni restricciones narrativas sobre posesión o uso posterior de un objeto. Un comercio por token no vinculado puede tener stock independiente. Los objetos deben existir en el mundo o compendios; no se convierten automáticamente las páginas del Diario.

**Pruebas técnicas:** `node --test test/commerce.test.mjs`, `npm run check` y `npm run validate` antes de integrar. Requiere prueba manual en Foundry con DJ y jugador separados, NPC en mapa, dos compras simultáneas, importación desde compendio, agotamiento de stock y caída/reconexión de red. No confundir tests unitarios con una partida real verificada.

## API de apoyo para macros

```js
// Abrir comercio configurado:
game.tierraMagica.commerce.open(game.actors.getName("Herrero de pueblo"));

// Abrir editor como DJ:
game.tierraMagica.commerce.configure(game.actors.getName("Herrero de pueblo"));
```

No crear tag, release, ni actualizar el manifiesto `latest` hasta contar con autorización del creador.
