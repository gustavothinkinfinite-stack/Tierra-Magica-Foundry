# CRAFT-08 — Cierre de Objetos Mágicos, Encantamientos y Sintonización

**Estado:** CERRADO · VIGENTE  
**Fuente canónica:** `docs/Tierra_Magica_Manual_Maestro.md`, capítulo 18, CRAFT-08  
**Dependencias:** CRAFT-01 a CRAFT-07 cerrados  
**Siguiente fase:** CRAFT-09 — Ingeniería y dispositivos

## Objetivo

Definir objetos mágicos autónomos sin convertirlos en:

- Maná gratuito transferible;
- baterías apilables;
- acciones adicionales;
- sustitutos permanentes de hechizos Sostenidos;
- granjas de poder mediante joyas pequeñas;
- dispositivos de Energía/Caudal disfrazados.

## Arquitectura cerrada

### Encantamiento I
- Sintonización 1.
- RE 6.
- PE +4.
- permite Hechizos Vinculados Menor/Básico.
- Disponibilidad habitual Restringida.

### Encantamiento II
- Sintonización 2.
- RE 10.
- PE +6.
- permite Hechizos Vinculados Avanzados.
- Disponibilidad Rara.

### Encantamiento III
- Sintonización 3.
- RE 14.
- PE +8.
- permite Hechizos Vinculados Maestro.
- Disponibilidad Excepcional.

Hechizos Legendarios y Rituales no utilizan el procedimiento estándar.

## Sintonización

Toda criatura posee **3 puntos**, independientemente de VOL o nivel.

Combinaciones posibles:

- I + I + I;
- II + I;
- III.

No existe límite por “slot corporal”.

Una criatura no puede Sintonizar simultáneamente dos objetos con el mismo Patrón, el mismo Hechizo Vinculado o perfiles funcionalmente equivalentes destinados a multiplicar la reserva del mismo efecto.

Establecer Sintonización requiere 1 hora.

Desintonizar es inmediato.

## Reserva Encantada

Al establecer una nueva Sintonización:

**RE = 0.**

Un Descanso Completo rellena RE sólo si el objeto ya estaba Sintonizado con la misma criatura al comenzar el descanso y permanece así hasta terminarlo. Sintonizar durante ese descanso no carga RE.

Desintonizar vuelve RE a 0.

RE:

- no es Maná;
- no es Energía;
- no usa Caudal;
- no admite Sobrecarga;
- no se transfiere;
- no se recupera mediante pociones de Maná.

Esto bloquea el intercambio de una mochila de objetos ya cargados durante una aventura.

## Costes

### Coste de Encantamiento

- I: max(5 o, 25% VR Común).
- II: max(15 o, 50% VR Común).
- III: max(40 o, 100% VR Común).

Valor añadido:

**2 × CE.**

La venta directa ordinaria recupera como máximo el coste material añadido, antes de trabajo.

## Requisitos

### Grado I
- Magistral.
- Ritualismo Maestro.
- Arcana Experta · Artefactos mágicos.
- Artesanía Experta.
- instalación Especializada.
- 3 Jornadas o 50% tiempo base, el mayor.

### Grado II
- Extraordinario.
- Ritualismo Gran Maestro.
- Arcana Maestra · Artefactos mágicos.
- Artesanía Maestra.
- instalación Excepcional.
- 8 Jornadas o 100% tiempo base, el mayor.

### Grado III
- Extraordinario.
- Ritualismo Gran Maestro.
- Arcana Maestra · Artefactos mágicos.
- Artesanía Maestra.
- instalación Excepcional.
- componente Raro/Excepcional compatible.
- 20 Jornadas o 200% tiempo base, el mayor.

## Soportes

Equipo existente:

- I: Superior+.
- II: Excepcional.
- III: Excepcional y soporte apropiado.

Soportes Dedicados:

- I: VR 2 o / CM 1 o.
- II: VR 5 o / CM 2 o 5 p.
- III: VR 10 o / CM 5 o.

No poseen CapM ni CRu gratuitos.

## Encantamientos Utilitarios

Pueden existir sin Sintonización sólo si no producen ventajas mecánicas de combate, pruebas, recursos, Movimiento o sentidos sobrenaturales.

Catálogo inicial:

- Seco.
- Pulcro.
- Templado.
- Luz de Cortesía.
- Croma.

## Pasivos Sintonizados

Catálogo inicial:

### Amuleto de Firmeza I
+2 Defensa Mental contra miedo sobrenatural/Intimidación compatible.

### Broche de Caída I
-1 espacio efectivo de caída.

### Lentes de Revelación II
Ventaja al examinar ilusiones y manipulaciones sensoriales compatibles.

### Talismán de Estabilidad II
Una vez por Escena reduce 1 espacio de desplazamiento mágico involuntario.

No existen Pasivos III universales.

## Hechizos Vinculados

Sólo un hechizo Directo por objeto.

La activación conserva:

- Acción/Reacción;
- objetivo;
- alcance;
- área;
- duración;
- coste;
- Sostenimiento;
- límites.

El coste de Maná original se paga desde RE.

Las tiradas usan:

**2d10 + PE.**

Una DF derivada del lanzador usa:

**11 + PE.**

No se suma Atributo ni Habilidad del usuario.

## Sostenimiento

Un hechizo Sostenido de objeto ocupa el límite normal de Sostenimiento del usuario.

Doble Sostenimiento funciona conforme a su regla general.

El Encantamiento no convierte un Sostenido en permanente.

## Objetos de referencia

- Broche de Barrera I.
- Anillo de Paso Breve I.
- Lentes de Visión Arcana I.
- Brazal de Aguja Gélida II.
- Capa de Invisibilidad III.
- Vara de Ruptura III.

## Sellos Autónomos

Los Sellos de Custodia:

- son fijos;
- no se Sintonizan;
- tienen una única carga;
- aceptan Grado I o II;
- no se recargan con Descanso;
- no reconocen intención/moralidad/enemigos;
- pueden usar contacto, apertura, umbral o llave mágica específica.

Rearme:

- 25% CE;
- 25% tiempo;
- mínimo 4 h.

Al disparar pasan a estado **Descargado**.

Su valor comercial disminuye en **2 × coste material de rearme**, evitando usar el efecto y venderlo como si siguiera cargado.

## Auditoría de economía

Se probaron VR enteros de 1 c a 10.000 c para los tres Grados.

Con:

**valor añadido = 2 × CE**

la venta directa del incremento nunca supera CE.

Los mínimos de 5/15/40 o tampoco producen arbitraje de redondeo.

Los Soportes Dedicados respetan CM = 50% VR.

## Auditoría de recursos

### Grade I
RE 6 frente a costes Menor/Básico 2–4:
aprox. 1–3 usos.

### Grade II
RE 10 frente a costes Avanzados 5–7:
aprox. 1–2 usos.

### Grade III
RE 14 frente a costes Maestro 8–11:
normalmente 1 uso importante.

No existe acceso estándar a Legendarios.

## Auditoría de economía de acciones

Se verificó:

- Acción sigue siendo Acción;
- Reacción sigue siendo Reacción;
- tres objetos no conceden tres Reacciones;
- Sostenimiento mantiene su límite;
- PE no añade una segunda tirada;
- Sellos son de una sola carga;
- los objetos no crean ataques adicionales.

## Exploits controlados

CRAFT-08 bloquea:

- subir Sintonización mediante VOL;
- joyas pequeñas como slots adicionales;
- llevar duplicados del mismo Patrón como baterías;
- desintonizar y acceder a una nueva reserva cargada;
- pasar RE a Maná o Energía;
- usar Sobrecarga con objetos;
- sumar PE + estadísticas del usuario;
- hacer permanente Invisibilidad u otro Sostenido por mera declaración;
- vincular Rituales como Acciones;
- vincular Legendarios de forma estándar;
- aprender hechizos mediante posesión de objetos;
- apilar Barreras equivalentes;
- usar y vender un Sello como si conservara su carga;
- crear sensores morales o de “enemigo” sin definición real;
- recargar Sellos automáticamente.

## Resultado

CRAFT-08 crea tres niveles claros:

1. **Runa/Piedra:** usa Maná personal.
2. **Objeto mágico Sintonizado:** usa RE propia.
3. **Sello fijo:** posee una única carga autónoma.

Cada capa tiene un coste, una economía de acciones y un límite diferente.

**CRAFT-08 queda cerrado.**

## Adenda de auditoría CRAFT-12

CRAFT-12 precisó Sintonización y Sellos:

- los 3 puntos automáticos pertenecen a **personajes completos**; Familiares, invocaciones, Autómatas auxiliares, monturas y vehículos no obtienen otros 3 salvo Perfil expreso;
- no pueden mantenerse Sintonizados simultáneamente duplicados funcionales cuya finalidad sea multiplicar la reserva del mismo efecto, aunque cambien nombre o soporte;
- un objeto debe estar ya Sintonizado al comenzar un Descanso Completo y permanecer así hasta terminarlo para rellenar RE;
- varios Sellos ordinarios no pueden descargarse contra el mismo objetivo por un único evento indivisible;
- sólo la criatura Sintonizada puede activar Encantamientos que gasten RE o beneficiarse de Pasivos Sintonizados; sostener o robar el objeto no transfiere el vínculo.

