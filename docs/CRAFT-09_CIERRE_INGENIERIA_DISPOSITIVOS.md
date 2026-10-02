# CRAFT-09 — Cierre de Ingeniería y Dispositivos

**Estado:** CERRADO · VIGENTE  
**Fuente canónica:** `docs/Tierra_Magica_Manual_Maestro.md`, capítulo 18, CRAFT-09  
**Dependencias:** CRAFT-01 a CRAFT-08 cerrados  
**Siguiente fase:** CRAFT-10 — Investigación, prototipos y estabilización de diseños

## Objetivo

Cerrar la economía y fabricación de tecnología arcano-industrial ya presente en el canon sin convertir:

- Energía en Maná;
- varias baterías en Caudal infinito;
- módulos en Acciones adicionales;
- autómatas auxiliares en segundos personajes;
- Calidad/Runas/Encantamientos en mejoras energéticas gratuitas.

## Parámetros energéticos

### Energía
Reserva almacenada.

### Caudal
Máximo que la fuente puede entregar a una activación.

### Estabilidad
Máximo que un acumulador puede recibir de forma segura por intervalo de carga de 10 minutos.

### Consumo
Energía exigida por una activación.

Activación válida:

**Consumo <= Energía disponible**  
**Consumo <= Caudal efectivo**

Una activación válida gasta Energía aunque la resolución posterior falle.

## Acumuladores

| Acumulador | E | C | Est | VR | CM |
|---|---:|---:|---:|---:|---:|
| Celda menor | 4 | 2 | 1 | 2 o | 1 o |
| Estándar | 8 | 3 | 2 | 5 o | 2 o 5 p |
| Núcleo pesado | 16 | 5 | 4 | 15 o | 7 o 5 p |

Tiempos mínimos de carga completa con una fuente suficientemente capaz:

- Celda: 40 min.
- Estándar: 40 min.
- Núcleo: 40 min.

El hardware se valora vacío.

## Recarga

Cada 10 minutos:

**transferencia <= min(Caudal de Carga, Estabilidad objetivo, espacio libre).**

Transferir entre acumuladores conserva Energía uno por uno.

Servicio comercial de referencia:

**1 c por E transferida**

cuando existe infraestructura.

## Carga forzada

Hasta:

**2 × Estabilidad**

en un intervalo, siempre limitada por la fuente.

INT + Ingeniería DF16.

Éxito:
- transfiere;
- acumulador Dañado.

Fallo:
- no transfiere;
- acumulador Deshabilitado.

Con fuente suficiente puede reducir una carga completa de referencia de 40 a 30 minutos, a cambio de daño seguro incluso con éxito.

## Estados

- Operativo: normal.
- Dañado: funciona salvo Perfil; no puede Sobrecarga/Carga forzada.
- Deshabilitado: no activa, descarga ni carga.

No se crean HP de dispositivos.

## Sobrecarga Controlada

Sólo si falta exactamente 1 Caudal.

INT + Ingeniería DF16.

Éxito:
- Caudal +1 esa activación;
- consume Energía;
- dispositivo Dañado.

Fallo:
- sin activación;
- Deshabilitado.

No puede repetirse Dañado.

## Varias baterías

Por defecto se usa una fuente activa.

### Banco simple
Dos acumuladores:

- Energía = suma.
- Caudal = mayor Caudal individual.

### Acoplador
- dos fuentes;
- Caudal = mayor +1;
- techo 5;
- usar ese +1 cuesta +1 E;
- no se encadena con otro Acoplador.

Esto bloquea baterías en cascada.

## Módulos

Un Host ordinario admite un Módulo técnico activo.

Un segundo simultáneo requiere Perfil específico.

CRAFT-04 Modular permite intercambio rápido, no ranuras adicionales.

Host, Módulo y acumulador se pagan por separado salvo Perfil expreso.

## Dispositivos cerrados

### Lámpara arcana
- VR 2 o.
- 1 E / C1.
- Acción.
- luz durante Escena.

### Herramienta motorizada
- VR 4 o.
- 1 E/h.
- reduce 25% tiempo de una operación física registrada.
- no reduce espera/secado/investigación.

### Visor espectral
- VR 6 o.
- 1 E / Escena.
- Ventaja PER+Arcana o PER+Ingeniería para flujos/manifestaciones captables.

### Estabilizador de tiro
- VR 6 o.
- 1 E por ataque.
- +1 ataque si no hubo Movimiento.
- no se acumula con Estabilizada.

### Cámara de penetración
- VR 10 o.
- 2 E / C2.
- Pen +2.
- máximo Pen 5.
- no se acumula con aumentos equivalentes.

### Propulsor de impacto
- VR 10 o.
- 2 E / C2.
- diseño fijo:
  - +2 Daño; o
  - empuje 1.
- no ambos.

### Escudo de campo
- VR 12 o.
- 2 E / C2.
- Reacción.
- +2 Defensa.
- no se acumula con Barrera equivalente.

### Arnés de carga
- VR 8 o.
- 1 E / Escena.
- una categoría funcional de Escala mayor sólo para carga/levantamiento.

### Prótesis motorizada
- VR 12 o.
- 1 E / Escena exigente.
- restaura función mecánica compatible.
- no añade FUE, Movimiento o ataque.

### Autómata auxiliar
- VR 20 o.
- 1 E/h.
- Ingeniería Maestra · Autómatas.
- puede ser Ayuda técnica o Ayuda de trabajo, no ambas.
- no satisface prerrequisitos profesionales.
- no posee turno, Acción ni Reacción propios.

## Autonomía con acumulador estándar

Con 8 E:

- herramienta motorizada: hasta 8 h;
- autómata auxiliar: hasta 8 h;
- estabilizador: hasta 8 activaciones;
- Cámara de penetración: hasta 4;
- Escudo de campo: hasta 4;
- Propulsor de impacto: hasta 4.

Estos máximos suponen que no existen otros consumos.

## Integración rúnica

Runas siguen pagando Maná.

Energía no paga Improntas.

Puede coexistir un Módulo y una Impronta Vinculada sólo si:

- ambas activaciones son válidas;
- afectan magnitudes distintas o la regla permite interacción;
- se pagan ambos recursos.

Ejemplo:
**Cámara + Filo Arcano I** = Pen +2 + Daño +1, pagando 2 E + 2 Maná.

No:
**Cámara + Aguja I** como Pen +3 adicional.

## Encantamientos

RE continúa separada.

- Energía no recarga RE.
- RE no alimenta dispositivos.
- Sintonización no da Caudal.
- Encantamiento no se activa gratis al activar el dispositivo.

Híbridos de activación única requieren Perfil/CRAFT-10.

## Sellos

Sello y dispositivo pueden combinarse como disparador/mecanismo si ambos perfiles son compatibles.

Cada sistema paga su propio recurso.

No se duplican ataques por una única liberación.

## Auditoría económica

Todos los perfiles ordinarios utilizan CRAFT-02:

**CM = 50% VR**

salvo componente específico.

Por tanto la venta directa ordinaria de hardware recién fabricado no supera materiales antes de trabajo.

La carga energética:
- no forma parte del VR del hardware;
- cuesta mediante servicio/fuente;
- no tiene reventa garantizada.

Transferir, cargar o reparar nunca genera Energía.

## Auditoría de acción

Se verificó:

- cambio de batería accesible en combate consume Acción;
- módulo Vinculado modifica una acción existente;
- Escudo de campo consume Reacción;
- autómata auxiliar no actúa como segundo Actor;
- Banco/Acoplador no genera activaciones;
- ninguna fuente de Energía concede Acciones.

## Auditoría de apilamiento

- Estabilizador no suma con Estabilizada.
- Cámara no suma con Perfil penetrante/Aguja/Filo Penetrante.
- Propulsor Impacto no suma con Golpe optimizado/Filo Arcano.
- Propulsor Impulso no suma con Impulso Cinético.
- Escudo de campo no suma con Barreras equivalentes.
- Calidad no sube E/C/Est.
- Material no sube E/C/Est sin Perfil.
- CRu no es Caudal.
- CapM no es capacidad energética.

## Exploits controlados

CRAFT-09 bloquea:

- sumar Caudal conectando baterías sin infraestructura;
- encadenar Acopladores;
- batería gratis incluida en cada dispositivo;
- energía gratuita al reparar;
- convertir Energía en VI;
- cambiar batería sin coste de Acción en combate;
- instalar varios Módulos activos universalmente;
- obtener módulos extra por Calidad;
- usar Modular como “+1 slot”;
- usar autómatas para saltar rangos;
- convertir autómata auxiliar en segundo turno;
- cargar Runas con Energía;
- recargar RE con Energía;
- obtener Pen >5 mediante Cámara estándar;
- usar Propulsor con daño y empuje simultáneos;
- sobrecargar repetidamente un dispositivo ya Dañado.

## Resultado

CRAFT-09 completa el circuito arcano-industrial:

**fuente -> Energía/Caudal -> dispositivo/Módulo -> activación -> consumo -> recarga/reparación**

y mantiene separadas las tres economías sobrenaturales:

**Maná personal / Reserva Encantada / Energía industrial.**

**CRAFT-09 queda cerrado.**
