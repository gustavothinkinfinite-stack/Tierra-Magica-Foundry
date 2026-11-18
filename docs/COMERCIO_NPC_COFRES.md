# Comercio de NPC y cofres — Tierra Mágica

**Estado:** funcionalidad propuesta, incorporada en rama de desarrollo. No cambia el canon de precios, rarezas ni la economía del Manual Maestro. Se aplica a Foundry VTT 13/14 y al sistema `tierra-magica`.

## Objetivo

Un NPC puede actuar como **comerciante** (venta por monedas), **cofre** (retirada gratuita) o NPC normal (sin comercio). El DJ decide la lista exacta de objetos; no se generan objetos ni recompensas automáticamente. Los objetos se seleccionan desde documentos `Item` existentes del mundo o compendios; un `JournalEntry` o una página de Diario no es un Item y no puede entregarse directamente.

## Cinco modelos iniciales y cofre

El DJ puede usar el siguiente comando en una macro de script, tras cargar el mundo:

```js
await game.tierraMagica.commerce.createStarterActors();
```

Importa al mundo hasta **seis actores de tipo NPC sin objetos** desde el Compendio:

1. Herrero de pueblo — herrería, nivel Aldea/pueblo.
2. Mercader de caminos — general, nivel Villa/mercado regional.
3. Alquimista de ciudad — alquimia, nivel Ciudad.
4. Ingeniero de la Liga de Bronce — ingeniería, nivel Ciudad.
5. Mercader arcano metropolitano — comercio arcano, nivel Metrópolis.
6. Cofre de botín — retirada gratuita.

Los nombres son ejemplos operativos, no personajes narrativos canonizados. Los actores quedan con permiso general de **Observador** y token de prototipo **vinculado**. Los seis documentos sí existen en el Compendio desde la instalación; importarlos al mundo es una acción explícita y no ocurre automáticamente.

## Compendio integrado (v1.14.0 de prueba)

Los seis modelos aparecen como **Actores** en `Compendium Packs → Tierra Mágica — Comerciantes y Cofres`, al instalar la compilación 1.14.0 de prueba (la versión pública anterior no incluye este compendio).

Para utilizarlos: abrir el Compendio, importar un NPC al directorio de Actores y arrastrar ese Actor al mapa. Los seis modelos tienen su `prototypeToken.actorLink = true`, disposición neutral y permiso Observador de forma predeterminada. Un token colocado antes de actualizar no recibe automáticamente estos ajustes: importá los modelos nuevos y reemplazá el token antiguo, o activá manualmente **Link Actor Data**.

Los objetos todavía no están precargados: **Configurar establecimiento** permite escoger explícitamente qué ofertas existen y cuánto stock tiene cada tienda. Se puede importar desde el compendio sin ejecutar ninguna macro. La macro opcional importa los seis modelos, sin crear duplicados por identificador de plantilla.

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
| Metrópolis / enclave excepcional | 4 | Ofertas excepcionales; las Restringidas no se venden automáticamente |

Estas categorías son **controles de interfaz/comercio**, no tablas nuevas de disponibilidad del mundo ni promesas de que un bien exista en una ciudad. La especialidad puede ser general, herrería, alquimia, ingeniería o arcana. Una oferta debe coincidir con la especialidad del establecimiento y cumplir su nivel mínimo; el DJ puede asignar un nivel mayor o menor manualmente a un objeto concreto.

Al agregar un Item se propone un nivel mínimo en función de `system.physical.availability` y, en su caso, los indicadores estructurados de magia, runas, improntas o encantamiento. La disponibilidad **no especificada** se conserva como `unspecified` y se muestra en el editor, sin declararla canónicamente Común. Por compatibilidad con establecimientos existentes, su mínimo comercial provisional permanece en nivel 1; el DJ puede elevarlo por oferta. Los valores desconocidos **explícitos** siguen siendo restrictivos (nivel 4). Las entradas `professional` se interpretan provisionalmente como nivel de mercado 2, sin ratificar equivalencias canónicas. Las mercancías `restricted` no pueden comprarse automáticamente, incluso en una metrópolis: el motor coteja tanto el Item real como el registro de oferta y no existe todavía flujo aprobado de licencias. Los cofres conservan la entrega gratuita como modalidad distinta de compraventa. Las ofertas **no** se cargan automáticamente por especialidad, ni siquiera en una metrópolis.

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

La transacción se ejecuta en el cliente del **DJ activo principal**; éste valida personaje, permiso de propietario, cantidad, stock, precio y categoría. El DJ registra un recibo idempotente por solicitud en el Actor comerciante antes de mutar dinero o inventario, de modo que repetir la misma solicitud no entregue dos veces un objeto. Las operaciones se serializan; en caso de fallo se intenta revertir la entrega y el cobro **únicamente cuando hay evidencia local de que se completaron esas escrituras**. Una promesa de actualización puede fallar **después de que el documento ya haya cambiado**, por lo que no es seguro afirmar que el rollback dejó todo exactamente igual. Ante una excepción durante dinero, creación del Item o existencias, el identificador de la operación permanece como **`pending` y exige revisión manual del DJ**, incluso si parte de la reversión aparente tuvo éxito; un reintento con el mismo identificador no vuelve a cobrar o entregar. Esto puede dejar monedas, Items o stock en estado parcial hasta conciliar, pero evita declarar falsamente que la compra se canceló. Si una caída interrumpe la operación, el recibo también puede quedar pendiente; no se hace una segunda entrega silenciosa. Las pruebas `test/commerce-runtime.test.mjs` simulan errores que ocurren después de persistir un débito, un objeto o el descuento de stock.

**Retención y prevención de repeticiones (implementación):** se conservan todos los recibos `pending` para revisión y los **128 recibos completados más recientes** con su resultado. Los más antiguos pasan a `archived`, manteniendo identificador y huella de solicitud: repetir su `requestId` se rechaza, no vuelve a pagar ni a entregar, aunque ya no pueda recuperarse el recibo detallado. Esto **no restaura identificadores descartados por versiones anteriores**. Los marcadores archivados no se eliminan automáticamente: su acumulación requiere seguimiento del tamaño de datos y un futuro mecanismo persistente de archivo/retención auditado, sin sacrificar la prevención de duplicados. **Diagnóstico actual del DJ:** al abrir **Configurar establecimiento**, la ventana muestra la cantidad de recibos recientes, pendientes y archivados, así como el tamaño serializado aproximado del registro en caracteres; el cálculo es de sólo lectura y no modifica ni reconcilia transacciones. Se puede consultar mediante `commerceReceiptLedgerStats(actor)` desde el módulo, pero no constituye almacenamiento externo ni reduce el crecimiento indefinido del registro.

**Respaldo local de recibos (fase preparatoria):** el DJ dispone de **Exportar copia de recibos (JSON)** al abrir `Configurar establecimiento`. El archivo contiene el identificador persistente del Actor, la versión de formato, los recibos pendientes, completados y archivados, y una suma de control sencilla para detectar **alteraciones accidentales**. El contenido se verifica antes de solicitar su descarga mediante la utilidad de Foundry. **No es una firma criptográfica ni verifica autenticidad frente a manipulación intencional.** La operación es de solo lectura: no elimina, mueve, importa ni marca como conciliado ningún recibo. El DJ debe conservar la copia en almacenamiento seguro, sin publicarla porque contiene identificadores y metadatos de operaciones. En esta fase **no existe restauración automática**, ni segmentación persistente, ni reducción del tamaño del flag; no se debe borrar nada del Actor tras exportar. La descarga requiere la función `saveDataToFile` del cliente Foundry.

**Previsualización de conciliación (sin restaurar):** la función técnica `previewCommerceReceiptReconciliation(actor, json)` valida la estructura y suma de control de la copia, exige que el UUID del respaldo coincida con el Actor y compara cada identificador con sus recibos actuales. Devuelve cantidades y claves **coincidentes**, **faltantes en el Actor**, **en conflicto** y **presentes únicamente en el Actor**. Un recibo `completed` y su marcador `archived` son compatibles sólo si conservan la misma huella de solicitud; una diferencia de huella o el cambio de estado `pending` se considera conflicto. El resultado incluye `safeToMergeAutomatically: false` en todos los casos; **no importa, restaura, borra ni fusiona datos**. No se ofrece todavía un botón de importación, porque incluso un respaldo íntegro no prueba por sí solo si una entrega o cobro ya ocurrió fuera del registro. El análisis sirve para diseñar una recuperación posterior con intervención del DJ.

**Recuperación controlada de identificadores (API y asistente del DJ):** `recoverCommerceReceiptMarkers(actor, json, { confirm: true })` sólo puede ejecutarse por el **DJ activo principal**. La operación se serializa con las compras y vuelve a comprobar integridad, UUID del Actor, conflictos y tamaño del flag bajo la misma cola de transacciones. Si hay cualquier conflicto, respaldo de otro Actor, falta de confirmación o insuficiencia de capacidad, **no modifica nada**. Si la conciliación es compatible, agrega **sólo los identificadores ausentes**: los recibos históricos completados o archivados se conservan únicamente como `archived` (veto a repetir compras), y los `pending` se mantienen pendientes para conciliación manual. **Nunca repone monedas, stock ni Items, ni sobrescribe recibos existentes.** El Director debe revisar previamente el origen y la confiabilidad del archivo: la suma de control **no autentica** al autor. El editor **Configurar establecimiento** ofrece una entrada para seleccionar el JSON y un botón **Comparar respaldo y recuperar marcadores faltantes**. Lee el archivo local (máximo 2 MB), verifica el respaldo y muestra al DJ el balance de coincidencias, faltantes, conflictos y registros exclusivos del Actor. **Si existen conflictos, se impide la recuperación; si no hay faltantes, no se escribe.** Para faltantes y cero conflictos, el DJ debe aceptar una segunda ventana de confirmación; el motor vuelve a validar dentro de su cola exclusiva. La operación está limitada a la recuperación de marcadores, no realiza restauración completa del historial, resolución automática de conflictos ni migración a almacenamiento externo. El JSON no se envía a servicios externos por esta función. El flujo de selección, inspección, cancelación y confirmación se separó de las llamadas directas al DOM para cubrirlo mediante `test/commerce-recovery-ui.test.mjs` (conflictos, rechazo de archivos inválidos o demasiado grandes, permisos del DJ, ausencia de cambios ante cancelación y recuperación solamente de identificadores). Estas son **pruebas automatizadas con dobles de Foundry**; no sustituyen el ensayo gráfico con un DJ y un jugador en una instalación real. No borrar recibos tras importar marcadores.

**Control de actualización de flags de NPC:** el cliente Foundry de un jugador rechaza modificaciones directas a `flags.tierra-magica.commerce` y `flags.tierra-magica.commerceReceipts` en `preUpdateActor`, incluidos campos anidados, variantes aplanadas y operaciones de borrado `-=`. El control procura no afectar flags de otros módulos ni otros datos del Actor. **Alcance de seguridad:** esta validación es un hook del cliente, **no** una autorización del servidor de Foundry; un cliente manipulado puede omitir hooks locales. Para mundos con jugadores propietarios de NPC, la seguridad efectiva requiere verificar también permisos del documento y no otorgar propiedad innecesaria de comerciantes; las transacciones ordinarias siguen siendo verificadas por el DJ principal. Pruebas automatizadas: `test/commerce-flag-authorization.test.mjs`.

**Identidad de mensajes multijugador:** las solicitudes por `system.tierra-magica` se validan contra el identificador del usuario emisor proporcionado por Foundry al callback de socket, no contra un `requesterId` declarado unilateralmente en el cuerpo del mensaje. En ausencia del identificador del emisor, o si difiere del solicitante declarado, **se rechaza el mensaje sin comprar ni entregar**. Una compra remota no puede declarar que fue solicitada por un DJ; las compras propias del DJ siguen el camino local. Las respuestas sólo se aceptan desde el DJ activo principal y para el jugador destinatario. La comprobación protege el protocolo en instalaciones donde Foundry facilita el identificador del emisor como segundo argumento del callback, **requisito que debe verificarse interactivamente en las versiones 13/14 soportadas** para evitar rechazar mensajes legítimos si cambia la API. Pruebas con dobles en `test/commerce-socket-authority.test.mjs` y `test/commerce-socket-client-response.test.mjs`: este segundo caso ejecuta el camino del cliente comprador, intenta resolver su solicitud con respuestas falsificadas o sin remitente, y comprueba que sólo una respuesta atribuida al DJ principal cierra la espera. La documentación comunitaria sobre sockets explica que Foundry retransmite los argumentos y que no existen permisos implícitos en sockets directos; la integración debe confirmar la presencia del identificador de usuario emitido por servidor. No constituye una prueba de penetración contra un servidor Foundry real.

**Prueba manual multicliente obligatoria antes de declarar comercio listo:** iniciar mundo 13 y después 14 con DJ y jugador independientes; confirmar en el callback del socket que el segundo argumento de un mensaje del jugador es su ID autenticado, y que la respuesta del DJ tiene como emisor al DJ real; efectuar compra legítima, repetición de ID, mensaje con `requesterId` de otro usuario, respuesta impostora, cancelación por cierre de sesión, y reconexión. Registrar evidencia de dinero, objeto, stock y recibos antes y después. Si falta el ID del emisor, el protocolo debe seguir rechazando mensajes remotos y el comercio quedará no validado para esa versión; no eliminar esta condición de seguridad como solución de compatibilidad.

**Protección preventiva por capacidad:** mientras no exista un almacenamiento histórico segmentado y recuperable, el motor calcula antes de cada compra nueva el tamaño serializado del registro y reserva un margen operativo para el recibo. Si proyecta superar **1.000.000 de caracteres**, **rechaza la compra antes de tocar dinero, existencias o inventario**. El editor informa del límite y avisa al DJ si se aproxima. Los marcadores `archived` y recibos `pending` no se eliminan automáticamente para recuperar espacio. Esta protección prioriza la idempotencia sobre la disponibilidad temporal del comercio; el DJ debe revisar y respaldar los datos. El umbral es una barrera operacional, **no** una solución definitiva de almacenamiento escalable ni un permiso para borrar identificadores. La comprobación previa reserva margen para operaciones ordinarias; no es una cuota de persistencia garantizada por la base de datos.

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
