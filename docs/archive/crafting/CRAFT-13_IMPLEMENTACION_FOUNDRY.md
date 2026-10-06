# CRAFT-13 — Implementación Foundry VTT del sistema de fabricación

**Estado:** CERRADO · IMPLEMENTADO Y AUDITADO  
**Fuente canónica:** `docs/Tierra_Magica_Manual_Maestro.md`, capítulo 18, CRAFT-01 a CRAFT-12  
**Dependencia:** CRAFT-12 cerrado  
**Rama de trabajo:** `craft-13-foundry-crafting`

## Objetivo

Implementar en Foundry VTT el sistema de fabricación ya cerrado sin rediseñarlo.

CRAFT-13 debe convertir las reglas canónicas de CRAFT-01 a CRAFT-12 en:

- datos estructurados;
- cálculos puros y auditables;
- validaciones de requisitos;
- operaciones transaccionales;
- interfaz de Proyecto;
- y pruebas de regresión que impidan reabrir exploits ya cerrados.

La implementación no puede crear una segunda autoridad mecánica paralela al Manual Maestro.

## Principios de implementación

1. Los cálculos universales viven en módulos puros de `scripts/rules`.
2. La ficha muestra y solicita operaciones; no contiene fórmulas canónicas duplicadas.
3. Un Item físico sigue siendo el resultado persistente. Un Proyecto es estado de trabajo, no una moneda nueva.
4. Costes y recursos se validan antes de mutar Actor/Items.
5. Las operaciones que consuman o creen recursos deben ser atómicas e idempotentes cuando corresponda.
6. PEI permanece fuera del crafting.
7. Maná, RE y Energía permanecen separados.
8. Foundry no infiere Planos, compradores, disponibilidad, materiales compatibles ni propiedades nuevas.
9. Defectuosa no se ofrece como descuento universal de fabricación.
10. Toda corrección que cambie una regla canónica detiene CRAFT-13 y vuelve a auditoría; una corrección puramente técnica permanece dentro de CRAFT-13.

## Fases

### CRAFT-13A — Motor puro de economía, tiempo y requisitos

**Estado: IMPLEMENTADA EN RAMA**

Archivo principal:

- `scripts/rules/crafting.mjs`

Pruebas:

- `test/craft-13-core.test.mjs`

Implementa:

- CM de Calidad con redondeo hacia arriba;
- VRQ;
- SM por grado y cobertura;
- VRT para Material Especial;
- venta rápida y referencia de venta directa con redondeo hacia abajo;
- TBA;
- Ayuda de trabajo;
- Aceleración;
- piso universal de 25% TBA;
- fallo de Aceleración a 125% TBA;
- BRA para reparación;
- desmantelamiento ordinario y recuperación de Material Especial;
- escalado de rango e instalación por Calidad/Material;
- validación explícita de rango, instalación, procedimiento estable, materiales y herramienta/Kit esencial.

Regresiones automatizadas:

- barrido de 1 c a 1000 o para fabricar -> vender;
- barrido de recuperación por estado;
- casos de redondeo;
- piso temporal;
- BRA;
- requisitos acumulados.

### CRAFT-13B — Modelo estructurado de Proyecto

**Estado: IMPLEMENTADA EN RAMA**

Se incorpora `project` como tipo de Item persistente de Foundry.

El Proyecto registra:

- receta/Item fuente, REF/Perfil y revisión;
- operación: fabricar, reparar, desmantelar, modificar o investigar;
- objeto objetivo o tipo/nombre del resultado;
- VR Común, estado de precio, precio fijado cuando proceda y Calidad;
- grado de Material que gobierna el trabajo;
- BRA/valor afectado cuando corresponda;
- Materiales Especiales y componentes separados como registros identificables;
- tiempo base, TBA, tiempo requerido y minutos de trabajo realmente completados;
- modo temporal derivado o tiempo fijo de procedimiento;
- Habilidad principal, Especialización, rango e instalación base/requeridos;
- disponibilidad declarada de procedimiento, materiales y herramienta/Kit esencial;
- Ayuda de trabajo y Ayuda técnica como datos separados;
- Aceleración y factores temporales;
- consecuencias declaradas;
- ledger de materiales estimados, comprometidos y recuperados;
- revisión transaccional, compromiso y token de cierre reservados para CRAFT-13C.

Salvaguardas estructurales:

- no existen «puntos de progreso» universales: el progreso se registra en minutos de trabajo;
- Defectuosa no puede seleccionarse como Calidad normal de Proyecto;
- PEI no puede entrar en el ledger;
- un componente recuperado por separado no puede contarse también en recuperación genérica;
- un Proyecto con tiempo derivado no puede registrar menos de 25% de su TBA;
- un Proyecto completado exige token de cierre;
- Completado y Cancelado son estados terminales;
- crear/eliminar un Proyecto no pasa por adquisición ni altera el presupuesto de creación del PJ;
- los editores genéricos de costes/requisitos/Rule Elements quedan ocultos para Proyecto para evitar una segunda autoridad mecánica.

Archivos principales:

- `scripts/rules/crafting.mjs`;
- `template.json`;
- `scripts/config.mjs`;
- `scripts/sheets/item-sheet.mjs`;
- `templates/item/item-sheet.hbs`;
- `test/craft-13-project.test.mjs`.

CRAFT-13B todavía no reserva, consume ni devuelve recursos. Esa frontera queda deliberadamente para CRAFT-13C.

### CRAFT-13C — Transacciones de fabricación, reparación y desmantelamiento

**Estado: IMPLEMENTADA EN RAMA · CI VERDE**

Se añade una capa transaccional separada de la ficha:

- `scripts/rules/crafting-transactions.mjs`;
- integración con `scripts/rules/state-authority.mjs`;
- API expuesta en `game.tierraMagica.crafting`;
- regresiones en `test/craft-13-transactions.test.mjs`.

#### Lotes y Valor de Insumo

Los Items físicos pueden registrar `craftingLot` con:

- categoría;
- compatibilidades;
- VI disponible;
- reservas por Proyecto.

El VI:

- sigue siendo material y nunca moneda;
- sólo reduce CM uno por uno cuando el Lote declara la compatibilidad exigida;
- no puede editarse ni reservarse directamente por un jugador;
- se reserva al comprometer el Proyecto;
- se consume únicamente al completar con éxito;
- se libera intacto al liberar/cancelar el Proyecto.

Dos Proyectos del mismo Actor se serializan mediante la autoridad compartida y no pueden reservar el mismo VI más de una vez.

#### Componentes separados

Los componentes especiales/separados no se convierten en VI numérico.

Cada componente de Fabricar/Reparar:

- debe señalar un Item físico del mismo Actor;
- se reserva por cantidad mediante `craftingReservations`;
- no se suma al CM ordinario/VI requerido;
- no puede reservarse simultáneamente por encima de su cantidad disponible;
- se consume por cantidad sólo al cierre;
- se libera sin pérdida al cancelar;
- no puede eliminarse ni reducirse manualmente mientras permanezca reservado.

Esto evita pagar un componente como VI y volver a consumirlo como componente, o utilizar la misma unidad en dos Proyectos.

#### Coste y requisitos recalculados

Antes de reservar recursos, Foundry vuelve a comprobar:

- CM canónico de fabricación;
- SM;
- BRA de reparación;
- Calidad;
- Material de trabajo;
- TBA;
- mínimo temporal;
- rango real de la Habilidad principal;
- instalación disponible;
- procedimiento estable;
- materiales;
- herramienta/Kit esencial.

Un Proyecto no puede aprobar un CM inferior al calculado ni sustituir el rango real del Actor por un número escrito en el propio Proyecto.

Los factores porcentuales libres de reducción temporal se rechazan en 13C hasta disponer de una fuente mecánica estructurada.

#### Aceleración

El Proyecto registra por separado:

- si existe Aceleración;
- su resultado: pendiente, éxito, fallo o Pifia.

Una Aceleración pendiente no permite comprometer el Proyecto.

- éxito: aplica la reducción y conserva el piso universal de 25% TBA;
- fallo/Pifia: el trabajo total mínimo pasa a 125% TBA;
- una Pifia conserva además su consecuencia declarada/contextual.

#### Flujo transaccional

El ciclo implementado es:

**Borrador -> Preparado -> En curso -> Completado**

También existen Liberar y Cancelar.

- un Proyecto creado por flujo ordinario comienza siempre en Borrador;
- pasar a Preparado requiere autoridad de DJ;
- Preparado puede reservar recursos;
- En curso registra minutos reales de trabajo;
- los minutos nunca superan el total requerido;
- Completado y Cancelado son terminales;
- un Proyecto con reservas no puede eliminarse directamente.

Cada cambio usa una revisión optimista. Una operación basada en una revisión obsoleta se rechaza sin consumir recursos.

#### Fabricación

Al completar Fabricar:

1. se validan nuevamente reservas y trabajo;
2. se consume el VI reservado;
3. se consumen los componentes físicos reservados;
4. se crea exactamente un Item físico desde el snapshot estructurado del resultado;
5. se registra procedencia hacia el Proyecto;
6. se fija un token de cierre.

Repetir la finalización de un Proyecto ya cerrado no crea otro objeto ni vuelve a consumir recursos.

#### Reparación

Reparar:

- utiliza BRA;
- cobra sólo el porcentaje correspondiente al estado real;
- consume componentes sustituidos como componentes separados;
- devuelve el mismo Item a Operativo;
- no reconstruye un objeto Destruido mediante la regla universal.

#### Desmantelamiento

Desmantelar:

- exige su tiempo de trabajo;
- elimina el objeto original sólo al cierre exitoso;
- crea un Lote de material recuperado con VI;
- no crea moneda;
- calcula recuperación ordinaria sobre VR Común;
- calcula Material Especial por su propia tasa;
- no vuelve a contar componentes recuperados separadamente.

El Lote recuperado no recibe compatibilidad universal por inferencia: debe clasificarse antes de poder pagar otro CM.

#### Autoridad, concurrencia e idempotencia

Las mutaciones compartidas utilizan el mismo arbitraje de DJ activo ya empleado por Vida, economía de turno y Energía.

Se combinan:

- serialización por Actor;
- revisión del Proyecto;
- recibos idempotentes de autoridad;
- reservas persistentes;
- token de cierre;
- rollback técnico ante fallos parciales.

Las regresiones cubren doble clic/reintento, dos Proyectos compitiendo por el mismo VI, componentes únicos, revisión obsoleta, liberación/cancelación, fabricación, reparación y desmantelamiento.

#### Frontera de 13C

CRAFT-13C ejecuta materialmente:

- Fabricar;
- Reparar;
- Desmantelar.

Modificar e Investigar ya existen como tipos de operación del modelo Proyecto, pero su ejecución se mantiene bloqueada hasta CRAFT-13D y CRAFT-13G respectivamente.

### CRAFT-13D — Calidad, modificaciones y Materiales Especiales

**Estado: IMPLEMENTADA EN RAMA · CI VERDE**

Se añade `scripts/rules/crafting-enhancements.mjs` como autoridad pura de CRAFT-04/05 y se integra con las transacciones de Proyecto.

#### Capa persistente de manufactura

Cada objeto físico manufacturado puede conservar:

- VR Común original;
- tiempo base de receta;
- rango e instalación base;
- perfil estadístico base;
- Calidad;
- Modificaciones instaladas;
- Materiales Especiales instalados;
- Material Dominante;
- CapM usada;
- VRT;
- efectos mecánicos/contextuales derivados.

Las estadísticas se recalculan desde el perfil base. Volver a ejecutar una mejora nunca suma otra vez un `+1` sobre un valor ya modificado.

#### Calidad y CapM

Foundry aplica la tabla canónica:

- Común: CapM 0;
- Superior: CapM 1;
- Excepcional: CapM 2.

Defectuosa permanece fuera del menú universal de fabricación: puede existir como estado/resultado, pero no como fabricación barata.

Los ascensos admitidos son únicamente:

- Defectuosa -> Común;
- Común -> Superior;
- Superior -> Excepcional;
- Común -> Excepcional.

Cada ascenso recalcula materiales, tiempo y requisitos. La CapM que nace por el ascenso puede ocuparse dentro del mismo Proyecto sin volver a pagar una instalación posterior.

#### Modificaciones

El catálogo estructurado cubre las Modificaciones canónicas de 1 y 2 CapM.

Se controla:

- compatibilidad por tipo de objeto;
- CapM disponible;
- duplicados;
- propiedades equivalentes;
- Penetración máxima 3;
- Recarga mínima 1;
- reducción máxima universal de FUE mínima;
- requisitos particulares de Bloqueo, arma a distancia, herramienta, armadura y escudo.

Una Modificación posterior cuesta 10% del VR Común y 25% del tiempo base por punto de CapM, mínimo 1 hora.

También se admite sustitución estructurada de una Modificación existente: la CapM anterior se libera antes de validar la combinación final, pero la nueva instalación paga su coste normal.

#### Efectos integrados

Se aplican directamente donde el sistema ya posee una autoridad mecánica compatible:

- Golpe optimizado -> Daño +1;
- Perfil penetrante -> Penetración +1, máximo 3;
- Mecanismo de recarga refinado -> Recarga -1, mínimo 1;
- Aligerada -> FUE mínima -1, mínimo 0;
- Bastidor móvil -> elimina Movimiento -1 propio del escudo;
- Bloqueo afinado -> valor de Bloqueo manufacturado +3 cuando existe ese perfil;
- Mantenible -> reduce a la mitad el tiempo de reparación, manteniendo materiales y mínimo canónico;
- Equilibrada para Parada -> Parada +3 cuando se declara con esa arma; sin arma fuente conserva +2.

Los efectos dependientes de contexto no estructurado se persisten sin inventar tiradas o bonos automáticos. Esto incluye Modular, Retención segura, Estabilizada, Silenciosa, Articulada, Herramienta especializada, Preparada para campo y propiedades materiales que necesitan una situación concreta que el flujo actual todavía no declara.

#### Materiales Especiales

Los Materiales Especiales usan Perfil identificable, grado, cobertura y Lote físico.

Foundry controla:

- un único Material Dominante;
- cobertura mínima del Perfil;
- SM recalculado desde VR Común;
- acumulación de requisitos de Calidad + Material;
- incompatibilidades/equivalencias;
- Lote preparado;
- coincidencia entre Perfil del Lote y Perfil instalado;
- VI suficiente para cubrir SM;
- prohibición de inferir poderes desde un nombre narrativo.

Perfiles mecánicos estructurados incluidos:

- Acero de Kharum;
- Madera tratada de Erelia;
- Cristal arcano refinado;
- Aleación de precisión de Kharum;
- Vidrio del Desierto;
- Madera de las Mil Voces;
- Material de los Fundadores recuperado sin propiedad universal automática.

Un Perfil desconocido pero identificable puede conservarse como dato; no genera ninguna propiedad mecánica hasta que exista una regla explícita.

#### Mecanizado fino

La Aleación de precisión de Kharum, instalada como parte Mayor o Dominante, puede reducir una Modificación posterior compatible sobre esa parte metálica a:

- 5% VR Común por CapM;
- 15% del tiempo base por CapM.

No concede CapM y no reduce requisitos profesionales.

#### Incorporación posterior de Material

Una parte material posterior usa:

- Componente: SM + 25% tiempo base;
- Mayor: SM + 50% tiempo base;
- mínimo 1 hora.

Cambiar el Material Dominante continúa bloqueado como modificación menor: requiere reconstrucción o receta específica.

#### Valor compuesto y recuperación

El objeto persiste:

**VRT = VRQ + 2 × suma de SM**

Desmantelar:

- calcula recuperación ordinaria sólo sobre VR Común;
- nunca recicla el sobreprecio de Calidad como materia;
- recupera Material Especial por separado desde su SM y según estado;
- conserva el Perfil del material recuperado;
- no transforma VI en moneda.

#### Reparación

Para objetos con historial de manufactura, Reparar deja de confiar en cifras escritas manualmente:

- usa VR Común y Calidad reales;
- BRA parte como mínimo del VRQ;
- no supera el VRT;
- usa el tiempo base persistido;
- aplica Material/Calidad reales;
- aplica Mantenible cuando corresponde.

El coste y el tiempo se revalidan al cierre. Si el estado del objeto cambia después de reservar —por ejemplo Dañado -> Deshabilitado— no se completa con el precio antiguo.

#### Integridad transaccional

Un jugador no puede editar directamente VI, reservas ni estadísticas derivadas de un objeto manufacturado. Tampoco puede eliminar un objeto que sea objetivo de un Proyecto activo.

CRAFT-13D reutiliza la serialización, revisión optimista, reservas, recibos idempotentes, rollback y token de cierre de CRAFT-13C.

Las regresiones cubren CapM, ascensos, sustitución de Modificaciones, Mecanizado fino, Material Dominante, Lotes preparados, perfiles desconocidos sin poder automático, VRT, desmantelamiento separado, Mantenible, Parada +3, fabricación Defectuosa y cambio de estado durante reparación.

#### Auditoría destructiva posterior de 13D

La revisión contra el texto canónico de CRAFT-04/05 encontró tres huecos de implementación aunque CI estuviera verde:

1. **Ascenso de Calidad:** se había añadido por error un mínimo general de 1 hora. CRAFT-04 no establece ese mínimo para ascensos; se eliminó. El mínimo de 1 hora permanece únicamente donde el canon sí lo fija, como Modificación posterior e incorporación posterior de Material.
2. **Retirada pura de Modificación:** ahora puede retirarse una Modificación sin reemplazo cuando el Proyecto lo declara. Libera CapM, exige 10% del tiempo base con mínimo 30 minutos y no genera VI ni recuperación automática.
3. **Reparación de Material Especial:** la BRA ya no acepta un valor material arbitrario entre VRQ y VRT. Se deriva como **VRQ + valor de las capas especiales realmente afectadas**. Si una parte especial se sustituye:
   - un Lote preparado del mismo Perfil preserva la propiedad;
   - un reemplazo ordinario restaura el estado pero elimina esa propiedad y recalcula VRT;
   - una parte no afectada no puede inflar BRA ni exigir material especial.

Además, todo Material Especial no Dominante debe identificar la **parte funcional** que ocupa; una incrustación decorativa no puede activar una propiedad.

Estas correcciones son de implementación: no modifican CRAFT-04/05. Tras incorporarlas, la validación completa de la rama volvió a quedar verde.

### CRAFT-13E — Trampas, Runas, Piedras y Encantamientos

**Estado: IMPLEMENTADA EN RAMA · AUDITORÍA DESTRUCTIVA VERDE**

Archivos principales:

- `scripts/rules/crafting-magic.mjs`;
- `scripts/rules/crafting-magic-runtime.mjs`;
- integración con `scripts/rules/crafting-transactions.mjs`;
- integración con descanso/turno en `scripts/documents/actor.mjs` y `scripts/rules/turn-economy.mjs`;
- regresiones en `test/craft-13-magic.test.mjs`, `test/craft-13-magic-runtime.test.mjs` y `test/craft-13-transactions.test.mjs`.

#### Trampas

El Armazón conserva por separado:

- Complejidad;
- requisito principal de Latrocinio e instalación;
- Precisión;
- DF de Mecanismo;
- disparador;
- carga;
- Ocultación y DF de Detección;
- método de Desactivación;
- Bypass;
- estado Armado/Descargado.

La Ocultación usa su tabla canónica independiente:

- Visible;
- Disimulada;
- Oculta;
- Experta;
- Maestra;
- Excepcional.

Foundry deriva su DF, material adicional y trabajo adicional sin modificar Precisión, DF de Mecanismo ni potencia de la carga.

La excepción de Supervivencia sólo funciona en Armazón Simple compatible de campaña. Un Armazón Estándar+ vuelve a exigir Latrocinio.

Las cargas pertenecen a un catálogo cerrado:

- Alarma;
- Maniobra: Derribar/Agarrar;
- Golpe mecánico;
- Alquimia;
- entorno/caída.

Un Golpe mecánico debe señalar una carga física real reservada y copia exactamente su Daño/Pen. Alquimia debe señalar una dosis/Fórmula física y no recibe Daño/Pen inline del Armazón. Entorno/caída señala geometría real y tampoco recibe potencia impresa gratuita.

Los disparadores automáticos registran evento físico + objetivo para impedir que el mismo evento indivisible alimente varias trampas/Sellos ordinarios contra el mismo objetivo.

El disparo manual reactivo implementa la economía completa de **Preparar + Reacción**:

1. Preparar consume Acción;
2. registra trampa y disparador observable;
3. expira al comienzo del siguiente turno;
4. la activación posterior exige coincidencia del disparador;
5. consume Reacción;
6. no crea una segunda respuesta ofensiva.

Un Bypass físico registrado puede evitar la activación automática sin convertir el mecanismo en sensor de aliados o intención.

Rearmar el Armazón usa 25% de su tiempo base, mínimo 10 min. Una carga alquímica consumida exige además otra dosis física; el rearme no crea munición/Fórmulas.

#### CRu, Runas y Piedras de Impronta

La CRu permanece separada de CapM y limitada por Calidad:

- Defectuosa/Común: 0;
- Superior: 1;
- Excepcional: 2.

Se estructuran Canales de Inscripción y Engarces por separado.

Las Runas:

- pagan inscripción completa;
- ocupan Canal compatible;
- usan sólo Improntas catalogadas;
- pueden borrarse mediante Proyecto rutinario al 25% del tiempo de inscripción, mínimo 1 h;
- borrar devuelve 0 VI, libera CRu y no convierte la Runa en Piedra.

Las Piedras:

- sólo existen como Grado I o II;
- usan receta fija, no Calidad/CapM;
- exigen Ritualismo, Arcana, Artesanía e instalación canónicos;
- sólo aceptan VI compatible con su matriz;
- se insertan y extraen intactas en 10 min, sin presión y con herramientas apropiadas;
- una Piedra fuera de Engarce es inerte;
- una Piedra insertada debe extraerse antes de desmantelar el Host.

Las Improntas respetan:

- Maná personal, nunca Energía/Sobrecarga;
- Acción/Reacción/Vinculada escrita;
- disparador válido para Reacción;
- una sola Impronta Vinculada por resolución;
- la resolución debe usar realmente el arma Host cuando corresponda;
- equivalencias y límites de apilamiento;
- ausencia de Pen >3, Protección permanente o Recarga gratuita no autorizada.

#### Encantamientos y Sintonización

Se implementan Encantamiento I/II/III con:

- CE;
- tiempo;
- PE;
- RE;
- capacidad de Sintonización;
- soporte físico mínimo;
- requisitos de Ritualismo/Arcana/Artesanía;
- componente Raro/Excepcional compatible para Grado III.

Los Soportes Mágicos Dedicados I/II/III usan sus VR, CM, tiempos, Artesanía e instalación propios y no generan CapM/CRu gratis.

Un Encantamiento Utilitario:

- usa catálogo cerrado;
- no requiere Sintonización;
- sólo admite una utilidad por esta regla;
- puede coexistir con el Encantamiento autónomo principal porque no ocupa ese hueco cuando sigue siendo estrictamente utilitario.

Los Pasivos Sintonizados se exponen como efectos estructurados únicamente cuando el objeto está Operativo y realmente Sintonizado por ese Actor. La aplicación contextual específica permanece en el consumidor apropiado de la regla; no se convierten en bonos universales.

Sintonización:

- capacidad 3 sólo para personaje completo o Perfil que lo autorice expresamente;
- Familiares, invocaciones, autómatas auxiliares, monturas y vehículos no reciben 3 por defecto;
- duplicados por Patrón, hechizo vinculado o equivalencia funcional se bloquean;
- Sintonizar requiere 1 h y objeto Operativo;
- el objeto entra con RE 0;
- Desintonizar vacía RE.

Descanso Completo toma la instantánea de objetos Sintonizados **al comienzo** y sólo recarga aquellos que continúan Sintonizados por la misma criatura y Operativos al terminar. Sintonizar durante el propio descanso no obtiene recarga retroactiva.

Hechizo Vinculado:

- paga RE, no Maná;
- conserva Acción/Reacción, objetivo, alcance, área, duración y Sostenimiento;
- usa PE del Encantamiento;
- los Sostenidos de objeto compiten con el límite normal del Actor.

Sellos de Custodia:

- son fijos y no Sintonizados;
- tienen una sola carga;
- usan contacto/apertura/umbral;
- la llave o marca mágica es Bypass, no sensor moral/identitario;
- un evento indivisible no multiplica Sellos ordinarios contra el mismo objetivo;
- no recargan en Descanso Completo;
- rearme paga 25% CE y 25% tiempo, mínimo 4 h.

#### Frontera hacia CRAFT-13H

El canon permite fabricar un Soporte Mágico Dedicado y Encantarlo dentro del mismo Proyecto multietapa. El motor ya valida ambos procedimientos y sus costes completos, pero la representación de **una sola ficha de Proyecto con varias etapas encadenadas** queda para CRAFT-13H. Hasta entonces se ejecutan como dos transacciones consecutivas sin descuento ni alteración del resultado final.

Esta frontera es de orquestación/interfaz; no habilita materiales, tiempo, CE o propiedades gratuitas.

### CRAFT-13F — Ingeniería y Energía

**Estado: IMPLEMENTADA EN RAMA**

CRAFT-13F amplía, sin duplicar, `scripts/rules/device-energy.mjs`.

Queda estructurado:

- **Energía** como reserva consumible;
- **Caudal** como máximo de salida por activación;
- **Estabilidad** numérica como recepción segura por intervalo de 10 minutos;
- **Caudal de Carga** separado del Caudal de activación;
- fuente individual, **Banco simple** y **Acoplador de Caudal**;
- recarga estable y **Carga forzada**;
- Sobrecarga Controlada;
- deterioro intrínseco de Sobrecarga/Carga forzada.

#### Fuente activa, Banco y Acoplador

Una activación ordinaria utiliza una fuente activa explícita.

Un Banco simple:

- exige exactamente dos acumuladores individuales;
- suma la Energía actual;
- usa sólo el mayor Caudal individual.

Un Acoplador:

- exige exactamente dos acumuladores individuales;
- suma la Energía actual;
- usa `max(Caudal)+1`, con techo 5;
- cuando una activación utiliza realmente ese +1, paga además **+1 E**;
- no puede usar como fuente otro Banco/Acoplador.

El consumo agregado se descuenta de los acumuladores siguiendo el orden de cableado registrado y nunca crea Energía.

#### Recarga estable

`chargeDeviceEnergyInterval` representa un intervalo de 10 minutos.

En una sola resolución:

- varias fuentes suman su entrega antes de aplicar Estabilidad;
- un receptor no recibe más de su Estabilidad;
- una fuente reparte su Caudal de Carga entre todos los receptores;
- otro acumulador usa su Caudal como Caudal de Carga;
- una estación con Caudal de Carga necesita una fuente energética real vinculada;
- la Energía transferida sale 1:1 de la fuente;
- no se supera la Energía máxima.

Los acumuladores canónicos quedan expresados como:

- Celda menor: **4 E / C2 / Est1**;
- Acumulador estándar: **8 / 3 / 2**;
- Núcleo pesado: **16 / 5 / 4**.

#### Carga forzada

Sólo un acumulador **Operativo** puede recibir Carga forzada.

- máximo recibido: **2 × Estabilidad** durante el intervalo;
- INT + Ingeniería DF16;
- éxito: transfiere y el receptor queda **Dañado**;
- fallo: no transfiere y queda **Deshabilitado**;
- un acumulador Dañado no puede repetirla.

El deterioro usa una mutación marcada como coste intrínseco del procedimiento y no pasa por mitigación ordinaria de estado.

#### Sobrecarga Controlada

La implementación existente queda endurecida:

- el dispositivo debe estar **Operativo**;
- la activación debe ser válida salvo por necesitar **exactamente +1 Caudal**;
- éxito: consume Energía y deja el dispositivo Dañado;
- fallo: no consume Energía y lo deja Deshabilitado;
- no puede repetirse Dañado.

#### Autoridad y concurrencia

Consumo y transferencia de Energía se serializan por Actor mediante la autoridad compartida.

La autoridad vuelve a calcular fuente, Caudal, reserva, Estabilidad y transferencia sobre el estado actual antes de mutar documentos. Las operaciones multiacumulador realizan rollback técnico si una actualización intermedia falla.

#### Salvaguardas

- Energía no paga Maná ni RE;
- Calidad/Material no aumentan E/C/Est por sí solos;
- varias fuentes no multiplican Estabilidad;
- una fuente no multiplica Caudal de Carga al dividir receptores;
- Banco no suma Caudal;
- Acoplador no se encadena;
- ninguna recarga crea Energía;
- Deshabilitado no descarga ni recibe carga.

La interfaz de selección/cableado y los perfiles completos de catálogo siguen perteneciendo a CRAFT-13H; 13F cierra el motor y la transacción energética.

### CRAFT-13G — Alquimia e Investigación

**Estado: IMPLEMENTADA EN RAMA**

Archivos principales:

- `scripts/rules/alchemy.mjs`;
- `scripts/rules/crafting-research.mjs`;
- integración con `crafting.mjs`, `crafting-transactions.mjs`, autoridad compartida y Actor;
- regresiones `craft-13-alchemy.test.mjs` y `craft-13-research.test.mjs`.

#### Alquimia

Las ocho Fórmulas estables de CRAFT-11 quedan cuantificadas con:

- precio;
- CM;
- tiempo de preparación;
- rango de Alquimia;
- Especialización;
- instalación;
- activación/vía/duración;
- Saturación.

Se separan dos estados:

- **`known: true`** = conocimiento personal de la Fórmula, adquirido mediante su coste normal de PD;
- **`quantity`** = dosis físicas preparadas.

Comprar, encontrar o fabricar una dosis no concede conocimiento. Aprender una Fórmula por adquisición de desarrollo marca `known: true` y no crea dosis.

Preparar rutinariamente una Fórmula catalogada exige:

- conocimiento personal;
- rango suficiente;
- Especialización correcta;
- instalación suficiente;
- receta estable.

Usar una dosis no exige conocer la Fórmula.

Toda aplicación válida consume exactamente una dosis. Las Fórmulas contextuales también consumen su dosis aunque Foundry no automatice el efecto restante.

**Neutralizante Común** utiliza Saturación **Antitóxica**; una segunda dosis beneficiosa de esa familia queda bloqueada hasta un Respiro.

Un Respiro limpia Saturación y no recupera Vida/Maná por sí mismo.

Las Fórmulas conocidas quedan protegidas contra eliminación directa después de creación para que borrar el Item no libere PD. Las dosis físicas no conocidas siguen siendo consumibles normales.

#### Investigación CRAFT-10

El Item `project` conserva `operation: research` y añade estado estructurado de Investigación:

- Concepto;
- Perfil pretendido;
- análogo;
- Viabilidad y condiciones;
- Clase de novedad;
- Complejidad;
- Disciplina Principal/Auxiliares;
- CMP;
- TBP;
- Preguntas;
- Validaciones;
- riesgos;
- historial autorizado;
- estado de Prototipo, Plano provisional y Réplica.

No existen puntos universales de investigación.

Etapas automatizadas:

**Preguntas -> Prototipo -> Validación -> Plano provisional -> Réplica -> Estable**

Cada etapa usa el mismo ledger, VI, reserva, minutos y autoridad transaccional de CRAFT-13C.

CRAFT-10 queda cuantificado en motor:

- Pregunta: DF base + ajuste de novedad; tiempo por Complejidad; experimento físico 10% CMP, mínimo 1 p;
- Prototipo: 125% CMP, 150% TBP, DF base +2; Frontera +4;
- Validación: 25% TBP, mínimo 1 h; ensayo consumptivo 5% CMP, mínimo 1 p; DF base;
- Plano provisional: 25% TBP, mínimo 2 h;
- Réplica: 100% CMP, 100% TBP, DF base.

#### Bloqueos y anti-spam

Un fallo de Pregunta registra Bloqueo con la identidad del intento.

La misma Pregunta no puede repetirse con la misma evidencia/muestra/método/instalación/instrumento/colaborador/material/Concepto. El nuevo intento debe declarar una condición material distinta.

Fallo de Prototipo, Validación o Réplica exige declarar una **Pregunta Correctiva específica** antes de repetir esa etapa.

Hazaña cuenta como éxito de la etapa presente, pero:

- no resuelve Preguntas adicionales;
- no salta Validaciones;
- no convierte Prototipo en Plano;
- no añade Calidad;
- no estabiliza sin Réplica.

Los estados `resolved`, Experimental, Validación superada, Plano provisional y Estable deben estar respaldados por el historial autorizado; editar campos no puede fabricar progreso.

#### Clasificación mínima

La implementación impide rebajar la Clase mediante redacción:

- reconstruir diseño existente -> mínimo Reconstrucción;
- integrar subsistemas estables sin receta -> mínimo Combinación;
- crear propiedad nueva -> mínimo Innovación;
- intentar excepción a límite/principio desconocido -> Frontera cuando sea viable.

#### Fronteras deliberadas

Foundry **no decide Viabilidad narrativa**. El DJ fija Posible / Posible con condiciones / Actualmente imposible.

Una Viabilidad Actualmente imposible no se supera mediante tiradas.

La Investigación Exploratoria sigue siendo adjudicada por el DJ cuando aún no existen CMP/TBP/Perfil suficientes: CRAFT-10 no establece una fórmula universal de tiempo o coste para esa fase, por lo que 13G no inventa una.

Estabilizar una Fórmula, hechizo, Técnica o conocimiento sujeto a desarrollo personal **no concede PD/PR ni aprendizaje gratuito**.

### CRAFT-13H — Interfaz y catálogo

**Estado: IMPLEMENTADA EN RAMA**

Archivos principales:

- `scripts/rules/crafting-catalog.mjs`;
- integración de preview/Preparado en `crafting-transactions.mjs`;
- catálogo de Proyecto en `actor-sheet.mjs`;
- interfaz operativa en `item-sheet.mjs` + `item-sheet.hbs`;
- regresiones `craft-13-ui-catalog.test.mjs`.

#### Catálogo CRAFT-11

Foundry expone exactamente las **41 referencias**:

- 8 Equipo compuesto;
- 8 Alquimia;
- 5 Runas/objetos mágicos;
- 6 Trampas/construcciones;
- 7 Ingeniería;
- 5 Servicios;
- 2 Investigación.

Cada entrada conserva como datos de referencia:

- código REF;
- nombre/categoría;
- materiales canónicos;
- tiempo;
- valor final cuando está fijado;
- Habilidad/rango/Especialización/instalación;
- resumen mecánico.

La UI no recalcula esas cifras desde texto.

#### Inicio de Proyecto

Desde la ficha del Actor se puede abrir **Catálogo** en la sección Proyectos y crear un Borrador desde cualquiera de las 41 referencias.

Las referencias se clasifican por modo de ejecución:

- **Fórmula:** las 8 Fórmulas crean un snapshot físico de 1 dosis, sin conceder `known`;
- **Investigación:** las 2 referencias crean el ciclo CRAFT-10 con Preguntas, CMP/TBP y primera etapa;
- **Guiada:** proyectos compuestos, trampas, magia, Ingeniería y servicios cargan la referencia y cifras de guía, pero exigen vincular objetivo/componentes/capas reales;
- **Sólo referencia:** Recarga comercial no se finge como modificación material; se ejecuta mediante el motor energético.

En referencias guiadas el **valor final jamás se copia como VR Común**. El VR mecánico permanece sin declarar hasta configurar el objeto real.

#### Previsualización

La ficha de Proyecto muestra antes de comprometer:

- CM/VI estimado;
- VI asignado;
- faltante;
- rango real del Actor;
- instalación disponible/requerida;
- procedimiento estable;
- materiales/herramienta esencial;
- incidencias estructurales;
- vínculos de componentes pendientes.

La previsualización llama al mismo cálculo transaccional utilizado al reservar; no duplica fórmulas.

#### Asignaciones de VI

La ficha permite seleccionar un Lote real del Actor, introducir VI y compatibilidad.

La UI escribe únicamente entradas `material-allocation` ya definidas por CRAFT-13C.

Reservar continúa revalidando:

- VI libre;
- compatibilidad;
- Perfil de Material;
- preparación;
- coste exacto;
- concurrencia.

#### Borrador -> Preparado

Se añade una operación autorizada **Preparar**.

Sólo un Borrador con preview completamente válido puede pasar a Preparado.

El botón se expone al DJ y la mutación pasa por la autoridad compartida; no se edita `system.state` desde la ficha.

#### Reparación

Al vincular un objeto manufacturado, la ficha enumera las capas de Material Especial instaladas y permite marcar:

- capa afectada;
- reemplazo ordinario;
- matriz rúnica afectada;
- matriz de Encantamiento afectada.

La selección alimenta directamente `repair.*`; BRA y sustituciones siguen calculándose en CRAFT-13D.

#### Desmantelamiento

Antes de completar Desmantelar se muestra:

- VI ordinario previsto;
- recuperación por Material Especial;
- recuperación rúnica;
- recuperación de Encantamiento;
- total previsto;
- tiempo de trabajo.

La preview usa `salvageQuote` e `integratedMagicRecoveryCopper`; no crea moneda ni ejecuta el desmantelamiento.

#### Flujo desde ficha

La ficha expone según estado:

- DJ · Preparar;
- Comprometer recursos;
- Liberar;
- Cancelar;
- registrar minutos;
- Completar;
- resolver etapa CRAFT-10.

Todas las mutaciones transaccionales usan `game.tierraMagica.crafting`.

#### Fronteras deliberadas

13H no convierte una referencia compuesta en una receta monolítica falsa.

Si CRAFT-11 exige varias capas/Hosts/Módulos/Piedras/Patrones, la referencia sirve de guía y Foundry exige configurar/vincular esos elementos reales antes de Preparar.

La interfaz no decide:

- compatibilidad narrativa no estructurada;
- Viabilidad;
- compradores/disponibilidad;
- propiedades mecánicas nuevas;
- contenido de un componente que no existe físicamente.

### CRAFT-13I — Auditoría integral Foundry

**Estado: IMPLEMENTADA · CERRADA**

La auditoría destructiva integral está implementada en `docs/archive/crafting/CRAFT-13I_AUDITORIA_INTEGRAL_FOUNDRY.md` y `test/craft-13-integral-audit.test.mjs`.

La matriz cubre:

- economía y redondeos;
- PEI;
- tiempo;
- Acción/Movimiento/Reacción;
- apilamiento;
- Sintonización/RE;
- Energía/Caudal;
- trampas;
- Alquimia;
- Investigación;
- concurrencia;
- doble clic/reintentos;
- guardado/reapertura;
- multiusuario/autoridad GM.

Hallazgos de implementación corregidos en 13I:

- equivalencia de `craft-prepare` entre socket y fallback;
- bloqueo real de crafting durante Creación/Reconstrucción para no convertir PEI;
- Preparado e Investigación adjudicados sólo por DJ;
- lectura correcta del total de tiradas devuelto por Foundry;
- autoridad multiusuario para RE/Sintonización/Improntas/trampas/Sellos;
- autoridad multiusuario para dosis/Saturación;
- activaciones alquímicas sin convertir 1 minuto/contexto en una Acción universal;
- trazabilidad y recuperación física de componentes separables.

El workflow ejecuta explícitamente `npm run audit:crafting` y `npm run validate`. La matriz integral queda como barrera permanente de regresión.

## Criterio de cierre

CRAFT-13 se considera cerrado sólo cuando:

1. las operaciones principales pueden ejecutarse desde Foundry sin cálculos manuales estructurales;
2. el resultado persistente coincide con el Manual Maestro;
3. no existe una segunda autoridad de datos o fórmulas;
4. las regresiones de CRAFT-12 permanecen verdes;
5. las operaciones económicas y de recursos son seguras ante repetición/concurrencia;
6. `npm run validate` queda verde;
7. la documentación de implementación refleja exactamente el comportamiento publicado.
