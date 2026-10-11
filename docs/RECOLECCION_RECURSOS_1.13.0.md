# Recolección y búsqueda de recursos — implementación 1.13.0

**Estado:** funcionalidad de Foundry; reglas de rendimiento de ejemplo no ratificadas como canon del Manual Maestro.

## Flujo del jugador

1. El DJ asigna un bioma a la escena desde **Equipo → Administrar búsquedas (DJ)** de una ficha completa.
2. En **Equipo → Buscar recursos**, el personaje elige un material visible o una exploración abierta.
3. El DJ activo valida escena, permisos, token del personaje, recurso, habilidad y periodo de búsqueda. **La tirada se realiza en el cliente del DJ**, con el mismo generador canónico `2d10 + Atributo + Habilidad`.
4. Se registra el intento y, si hay éxito, se añade un Item físico al inventario. Se anuncia el grado en el chat.

## Configuración del DJ

**Administrar búsquedas (DJ)** permite asignar bioma a la escena; crear, editar o eliminar recursos del catálogo mundial. Cada entrada guarda nombre, descripción, bioma, habilidad canónica (de las 26), atributo, DF, cantidades por grado, visibilidad y UUID opcional de un Item en Mundo o Compendio.

Un recurso **oculto** no figura entre los objetivos visibles: puede encontrarse mediante exploración abierta con su habilidad correspondiente. El DJ no está obligado a vincular un Item preexistente: en ese caso, la entrega crea equipo genérico de recolección sin propiedades alquímicas implícitas.

Los objetos obtenidos preservan su origen mediante flags propios; apilan por identidad de recurso si ya existen en el inventario. El catálogo usa los tipos físicos del sistema y no otorga automáticamente Fórmulas, recetas conocidas, PD, dinero, raciones de viaje ni Valor de Insumo (VI).

## Intervalos, controles y límites

- Se aplica un intervalo técnico inicial de **2 horas de tiempo mundial** entre intentos contra el mismo recurso en la misma escena (para exploración abierta, por habilidad). El DJ debe adelantar el tiempo mundial; no se avanza automáticamente.
- Requiere DJ activo y, para jugadores, un token del personaje en la escena visitada.
- El DJ resuelve los dados y el inventario a través de `state-authority`, con serialización y recibos idempotentes. Un fallo consume el intento. El reenvío no vuelve a conceder objetos.
- Una recompensa se corresponde con Ajustado, Claro o Dominante; sus cantidades son configurables por entrada.
- Las dificultades 10/14/18 y rendimientos de los recursos de ejemplo **son provisionales**, diferentes de la regla canónica existente de forraje/raciones.
- Si una operación de inventario falla, se revierte la reserva de intento. La eliminación posterior de un recurso del catálogo no borra Items que ya se obtuvieron.
- La función no modifica los costes ni ingredientes canónicos de Alquimia ni reescribe reglas de hechizos.

## Verificación previa a publicar

`npm run check`, `npm test`, `npm run audit:crafting`, `npm run validate` y prueba manual de Foundry VTT con DJ y jugador. Las pruebas automatizadas no equivalen a una sesión real de Foundry.
