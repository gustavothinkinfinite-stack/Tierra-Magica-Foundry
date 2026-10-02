# CRAFT-06 — Cierre de Trampas y Construcciones

**Estado:** CERRADO · VIGENTE  
**Fuente canónica:** `docs/Tierra_Magica_Manual_Maestro.md`, capítulo 18, CRAFT-06  
**Dependencias:** CRAFT-01 a CRAFT-05 cerrados  
**Siguiente fase:** CRAFT-07 — Runas, piedras y engarces

## Objetivo

Crear trampas útiles, legibles y auditables sin introducir una reserva abstracta de daño, sin romper la economía de Acciones/Reacciones y sin convertir una sola Habilidad en detección + daño + desactivación al mismo tiempo.

## Estructura universal

Toda trampa usa:

**Disparador -> Mecanismo -> Carga/Efecto**

y puede añadir:

**Ocultación -> Desactivación -> Bypass -> Rearme**

La trampa controla la liberación del efecto; la potencia proviene de una carga real o de un peligro físicamente existente.

## Armazones

| Armazón | VR | Tiempo | Precisión | DF Mecanismo |
|---|---:|---:|---:|---:|
| Simple | 2 p | 30 min | +2 | 10 |
| Estándar | 1 o | 2 h | +4 | 12 |
| Complejo | 4 o | 1 Jornada | +6 | 14 |
| Magistral | 12 o | 3 Jornadas | +8 | 16 |
| Extraordinario | 30 o+ variable | etapas | +10 | 18 |

El CM ordinario es 50% de VR según CRAFT-02.

## Separación de funciones

- **Precisión** sirve para ataque/manipulación de la trampa.
- **DF Mecanismo** sirve para desactivar y para escapar de sujeciones compatibles.
- **DF Detección** depende sólo de Ocultación.
- **Daño/Pen/Área** pertenecen a la carga.

Subir uno no sube automáticamente los otros.

## Disparadores cerrados

- Manual.
- Contacto/presión.
- Cable/paso.
- Apertura/manipulación.
- Liberación de peso.
- Retardo mecánico.
- Transmisión remota física.
- Condición física múltiple.

Un mecanismo ordinario no reconoce identidad, intención, especie o aura.

Un disparador manual consume Acción; para usarlo reactivo se aplican Preparar + Reacción salvo regla específica.

## Cargas cerradas

### Alarma
No ataca. Sólo produce una señal perceptible.

### Maniobra
Tira:

**2d10 + Precisión contra Defensa de Maniobra**

Puede Derribar o Agarrar según diseño.

Agarrar usa la DF de Mecanismo como DF de escape.

### Golpe mecánico
Tira:

**2d10 + Precisión contra Defensa**

Usa únicamente Daño y Pen impresos de la carga.

No añade Atributos del constructor.

Límites:

- Simple: sin carga dañina automática.
- Estándar: Daño <=5, Pen <=1.
- Complejo: Daño <=8, Pen <=2.
- Magistral: arma ordinaria compatible.
- Extraordinario: perfil específico auditado.

### Alquimia
Usa exactamente el perfil existente de la Fórmula/carga.

Bomba Incendiaria permanece:

**Área pequeña · Daño 6 · Pen 1.**

### Caída/entorno
Usa la geometría y reglas reales.

Un pozo no obtiene daño adicional por ser trampa.

## Ocultación

| Ocultación | DF |
|---|---:|
| Disimulada | 10 |
| Oculta | 12 |
| Experta | 14 |
| Maestra | 16 |
| Excepcional | 18 |

Ocultación aumenta tiempo y materiales, pero no potencia.

## Detección

Usa normalmente:

**PER + Investigación contra DF Detección.**

No hay prueba automática por cada casilla.

Una búsqueda sistemática puede cubrir una zona significativa.

Detectar no desactiva.

## Desactivación

Usa normalmente:

**AGI/INT + Latrocinio contra DF Mecanismo.**

Un fallo no activa automáticamente la trampa: ese riesgo debe estar declarado antes de tirar.

No existe repetición hasta sacar alto sin cambio de método.

## Desprevenido

Una carga de ataque no percibida puede aplicar Desprevenido conforme a las reglas ya existentes.

No impacta automáticamente.

AGI permanece en Defensa.

## Un disparador, una liberación

Un Armazón no convierte un evento en diez ataques.

Los sistemas enlazados necesitan complejidad apropiada y no multiplican efectos idénticos sobre un mismo objetivo salvo perfil específico.

Esto evita el exploit de colocar varias armas sobre la misma placa de presión y tratarlas como ataques independientes gratuitos.

## Rearme

Toda trampa es de un solo disparo por defecto.

Si el Armazón queda Operativo:

**rearme = 25% tiempo base, mínimo 10 min.**

Se reponen por separado cargas y munición.

No existe rearme automático ordinario en CRAFT-06.

## Construcciones de campaña

Quedan definidas:

- Barricada de cobertura.
- Barrera sólida de campaña.
- Pasarela/puente corto.
- Pozo de trampa.
- Alarma de perímetro.
- Lazo de captura.
- Cable de derribo.
- Golpe oculto Estándar.
- Golpe oculto Complejo.
- Trampa con Bomba Incendiaria.

No se crean HP universales de estructuras.

La cobertura deriva de geometría real:

- cobertura parcial: +2 Defensa;
- cobertura total: sólo cuando la construcción elimina realmente la línea válida.

## Auditoría de ejemplos

### Lazo de captura
Armazón Estándar.

- CM armazón: 5 p.
- Tiempo: 2 h.
- Ataque: +4 vs Defensa de Maniobra.
- Éxito: Agarrado.
- Escape: DF 12.
- Daño: 0.

Es útil para control sin producir daño gratis.

### Golpe oculto Estándar con Lanza
- Armazón Estándar: VR 1 o / CM 5 p.
- Lanza física: debe existir.
- Ataque del mecanismo: +4.
- Daño: 5.
- Pen: 0.
- No suma FUE.
- Tras activar: requiere rearme.

No supera el perfil del arma usada.

### Golpe Complejo con Gran Hacha
- Armazón Complejo.
- Ataque: +6.
- Gran hacha: Daño 8, Pen 0.
- Una carga así no cabe en un Armazón Estándar.
- Sigue siendo de un solo disparo.

### Pozo de 4 espacios
- Excavación base: 3 Jornadas en suelo excavable.
- Daño de caída: 6 antes de mitigaciones compatibles.
- Si se oculta como trampa: añade al menos Armazón Estándar y la Ocultación elegida.
- No obtiene daño extra por clavos imaginarios; cualquier componente dañino adicional debe existir y tener perfil propio.

### Bomba Incendiaria
El armazón no altera:

**Daño 6 · Pen 1 · área pequeña.**

Se consume una Bomba real.

Su precio sigue sin establecer hasta que Alquimia lo ratifique.

## Auditoría de economía de acciones

Se verificó que:

- disparador manual consume Acción;
- uso reactivo manual necesita Preparar/Reacción;
- disparador automático no consume Acción al activarse porque la preparación ocurrió antes;
- cada trampa ordinaria dispara una vez;
- no existe recarga/rearme automático;
- un solo evento no multiplica ataques;
- una trampa no concede Reacciones adicionales al constructor.

Por tanto, la preparación previa sí puede generar una ventaja táctica, pero no una fuente renovable de acciones gratuitas.

## Auditoría de habilidades

CRAFT-06 preserva los roles:

- Investigación encuentra.
- Latrocinio integra/desactiva.
- Artesanía fabrica partes.
- Ingeniería resuelve sistemas.
- Alquimia crea cargas.
- Supervivencia sólo sustituye Latrocinio en alarmas/lazos Simples de campaña.

Ninguna Habilidad sustituye universalmente a las demás.

## Exploits controlados

CRAFT-06 bloquea:

- convertir Ocultación alta en daño alto;
- sumar Atributos del constructor a una carga automática;
- aumentar una Bomba mediante el armazón;
- disparar varias veces sin rearme;
- multiplicar ataques con un único disparador;
- detectar y desactivar con una sola prueba;
- activar automáticamente una trampa por fallar una desactivación no riesgosa;
- crear sensores inteligentes sin dispositivo real;
- declarar cobertura total por precio en vez de geometría;
- cavar un pozo y asignarle daño arbitrario;
- convertir un arma montada en una versión mejor que el arma original.

## Resultado

CRAFT-06 convierte trampas y obras de campaña en una extensión del sistema existente:

**preparación + posición + recursos + efecto físico real**

en lugar de un subsistema de daño separado.

**CRAFT-06 queda cerrado.**
