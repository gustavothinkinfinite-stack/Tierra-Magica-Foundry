# CRAFT-13 — Implementación Foundry VTT del sistema de fabricación

**Estado:** EN CURSO  
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

**Estado: PENDIENTE**

Debe respetar:

- disparadores únicos y secuenciales;
- rearme;
- CRu;
- Engarces;
- Runas inscritas;
- una Impronta Vinculada por resolución;
- Sintonización 3 sólo donde el Perfil lo autorice;
- duplicados funcionales;
- RE 0 al Sintonizar;
- recarga sólo si estaba Sintonizado al comienzo del Descanso Completo.

### CRAFT-13F — Ingeniería y Energía

**Estado: PENDIENTE**

Integrará el crafting con la implementación existente de dispositivos:

- Energía;
- Caudal;
- Estabilidad;
- Caudal de Carga;
- Bancos/Acopladores;
- Sobrecarga;
- deterioro intrínseco no mitigable por protecciones ordinarias.

No duplicará `scripts/rules/device-energy.mjs`; CRAFT-13 debe reutilizarlo.

### CRAFT-13G — Alquimia e Investigación

**Estado: PENDIENTE**

Automatizará:

- Fórmulas conocidas;
- dosis;
- Saturación;
- Neutralizante Antitóxico;
- Concepto -> Viabilidad -> Preguntas -> Prototipo -> Validación -> Réplica;
- bloqueo de repetición sin cambio real;
- clasificación Adaptación / Reconstrucción / Combinación / Innovación / Frontera.

Foundry no decidirá Viabilidad narrativa por sí solo.

### CRAFT-13H — Interfaz y catálogo

**Estado: PENDIENTE**

Objetivos:

- iniciar Proyecto desde receta;
- ver requisitos antes de comprometer recursos;
- mostrar coste, tiempo, instalación y faltantes;
- seleccionar capas afectadas al reparar;
- mostrar recuperación antes de desmantelar;
- exponer las 41 referencias CRAFT-11 sin recalcularlas manualmente.

### CRAFT-13I — Auditoría integral Foundry

**Estado: PENDIENTE**

Regresión final obligatoria contra CRAFT-12:

- economía;
- redondeos;
- PEI;
- tiempo;
- acciones;
- apilamiento;
- Sintonización/RE;
- Energía/Caudal;
- trampas;
- alquimia;
- Investigación;
- concurrencia;
- doble clic/reintentos;
- guardado/reapertura;
- multiusuario/autoridad GM.

## Criterio de cierre

CRAFT-13 se considera cerrado sólo cuando:

1. las operaciones principales pueden ejecutarse desde Foundry sin cálculos manuales estructurales;
2. el resultado persistente coincide con el Manual Maestro;
3. no existe una segunda autoridad de datos o fórmulas;
4. las regresiones de CRAFT-12 permanecen verdes;
5. las operaciones económicas y de recursos son seguras ante repetición/concurrencia;
6. `npm run validate` queda verde;
7. la documentación de implementación refleja exactamente el comportamiento publicado.
