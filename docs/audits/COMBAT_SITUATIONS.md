# Auditoría — situaciones y maniobras de combate

**Fecha:** 2026-10-02  
**Estado:** cierre propuesto para integración canónica.

## Huecos cerrados

La revisión del Manual detectó reglas ausentes o incompletas para:

- lanzar magia en contacto/cuerpo a cuerpo;
- lanzar magia estando Agarrado;
- usar magia con armadura, escudo o arma en mano;
- recibir daño mientras se mantiene Sostenimiento;
- Derribar;
- Empujar;
- Agarrar;
- Desarmar;
- Intimidar/Amenazar durante combate;
- daño por caída y aterrizajes controlados.

## Principios aplicados

1. No importar ataques de oportunidad, fallo arcano por armadura ni componentes universales que Tierra Mágica no posee.
2. Mantener una sola Acción por maniobra.
3. Usar Defensa de Maniobra y Defensa Mental existentes en vez de crear nuevas Defensas.
4. Reutilizar los grados Ajustado/Claro/Dominante para efectos escalados.
5. Evitar hard control social: Intimidar impone presión, no secuestra la Acción ni la voluntad.
6. Hacer que Escala importe sin convertirla en bonos genéricos.
7. Hacer peligrosas las caídas sin crear una tabla arbitraria desconectada del mapa.
8. No introducir una tirada de concentración universal.
9. Incapacitado/Inconsciente termina Sostenimientos demandantes para evitar efectos mantenidos por una criatura fuera de combate.

## Reglas cuantificadas

### Empujar

Éxito contra Defensa de Maniobra:

- Ajustado: 1 espacio;
- Claro: 2;
- Dominante: 3.

Una categoría mayor reduce la distancia en 1, mínimo 1. Dos o más categorías mayores bloquean el desplazamiento ordinario sin palanca/capacidad.

### Desarmar

- Acción contra Defensa de Maniobra.
- Dos manos: +2 Defensa sólo contra Desarmar.
- Asegurado/integrado: no se retira con la maniobra ordinaria.
- Ajustado: cae.
- Claro: puede caer adyacente.
- Dominante + mano libre: puede tomarse.
- Recoger un objeto accesible cuesta normalmente 2 Movimiento.

### Intimidar

PRE + Intimidación contra Defensa Mental cuando existe resistencia.

Éxito: la próxima prueba hostil directa del objetivo contra quien lo intimidó sufre Desventaja hasta el final de su siguiente turno. No fuerza huida, rendición, traición ni pérdida de Acción. La misma amenaza no se repite indefinidamente sin cambio material.

### Caídas

- 1 espacio o menos: 0 daño ordinario.
- Daño = 2 × (espacios efectivos - 1).
- Aterrizaje controlado: AGI + Acrobacia.
- DF = min(24, 10 + 2 × max(0, espacios - 2)).
- Ajustado/Claro/Dominante reducen 1/2/3 espacios efectivos.
- Armadura ordinaria no mitiga caída; protección explícitamente compatible sí.

## Magia bajo presión

- Adyacencia enemiga no crea penalización ni Ataque de Oportunidad universal.
- No existen componentes verbales/somáticos/mano libre universales.
- Armadura no causa fallo mágico.
- Agarrado sólo limita magia cuando la acción concreta requiere libertad física real.
- Recibir daño no exige concentración ni rompe Sostenimiento.
- Incapacitado/Inconsciente termina Sostenimientos demandantes.
- Si una interrupción válida incapacita antes de terminar un lanzamiento, el efecto no se produce y los costes comprometidos permanecen gastados.

## Implementación

Se añade `scripts/rules/combat-situations.mjs` como núcleo puro para:

- grados de maniobra;
- distancia de Empujar;
- resistencia y resultado de Desarmar;
- DF y reducción de caída;
- daño de caída;
- resolución básica de Intimidación.

La caída a 0 Vida limpia `system.magic.sustainedSpellIds` tanto en la ruta local de recursos como en la autoridad compartida multiusuario.

## Automatización pendiente no bloqueante

Foundry todavía no presenta botones dedicados para Derribar, Empujar, Agarrar, Desarmar o Intimidar ni aplica automáticamente daño de caída desde medición de altura. Hasta automatizarlos, las reglas son plenamente adjudicables desde el Manual y las pruebas genéricas del Actor.
