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

**Estado: PENDIENTE**

Debe cubrir:

- reservar/consumir materiales;
- producir el resultado;
- reparar sólo capas afectadas;
- devolver VI/material recuperado;
- impedir doble recuperación de componentes;
- impedir reejecución de una misma operación confirmada;
- conservar etapas completadas cuando corresponda.

### CRAFT-13D — Calidad, modificaciones y Materiales Especiales

**Estado: PENDIENTE**

Automatizará:

- CapM;
- ascensos de Calidad;
- modificaciones posteriores;
- Material Dominante;
- requisitos acumulados;
- propiedades incompatibles/equivalentes;
- valores compuestos.

No automatizará propiedades narrativas sin Perfil mecánico.

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
