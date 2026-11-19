# Cotejo editorial de equipo y economía — primera pasada
**Fecha:** 2026-11-19 · **Estado:** revisión parcial en rama, sin cambios de precios ni de reglas.
**Fuentes contrastadas:** Manual Maestro §§3, 9, 19; `EQP-01_EQUIPO_AVENTURA_HERRAMIENTAS.md`, `CATALOGO_MAESTRO_ARMAS_v1.md`, `ARM-01_CATALOGO_MAESTRO_ARMADURAS.md`, `ESC-01_CATALOGO_MAESTRO_ESCUDOS.md`, `REFERENCIA_RAPIDA_GLOSARIO_1.0.md`.

## Hallazgos verificados

| ID | Tema | Evidencia | Estado / tratamiento |
|---|---|---|---|
| ECO-01 | Preparación inicial | Manual §3 Paso 6 y §19: **única ruta mecánica Compra libre** por PEI de 20 o = 2.000 c. Referencia rápida anterior todavía ofrecía «Paquete de Preparación o Compra libre». | **Corregido en rama:** referencia rápida usa Compra libre y listas orientativas pagadas al precio normal. |
| ECO-02 | Recuento de hechizos en guía derivada | Referencia rápida decía «Catálogo nuclear: 18 hechizos» sin distinguir ese antecedente de los 60 actuales. | **Corregido en rama:** 60 hechizos canónicos; no se alteraron costes ni fichas de hechizos. |
| ECO-03 | Equipo ordinario | Manual §9 y EQP-01 registran **25 objetos canónicos**, desglosados en 8 herramientas/equipos, 15 kits y 2 suministros, con precio exacto. | **25/25 coincidencias de precio y denominación/cobertura verificadas** en Manual §9 y EQP-01; pendiente sólo revisión gráfica y de referencias §19. |
| ECO-04 | Propuestas no canónicas | EQP-01 y Manual §9 registran **65 propuestas mundanas sin precio** y **10 especiales bloqueadas** por ausencia de perfil. | **No aprobar por inferencia.** Recomendación editorial: excluir sus fichas de compra del volumen básico hasta decisión expresa; conservar en fuente y anexos de diseño. |
| ECO-05 | Moneda | Manual §§3, 9, 19: 10 c = 1 p, 10 p = 1 o, 100 c = 1 o; PEI de 20 o y Reserva posterior de 2 o. | Coherente en secciones muestreadas; no debe confundirse presupuesto con dinero personal. |
| ECO-06 | Armaduras | Manual §9 y ARM-01 reconocen cinco perfiles base (Protección 1–5) y **89 variantes aprobadas**, sin efecto adicional por nombre. | Consistencia de totales y perfiles base verificada por lectura; falta verificación mecánica item a item. |
| ECO-07 | Escudos | Manual §9 y ESC-01: tres perfiles base (Broquel, estándar, pesado), **51 variantes aprobadas**, 18 regionales. | Coherencia de cantidad constatada; mantener reglas de arco frontal y Bloqueo separadas. |
| ECO-08 | Armamento ampliado | Manual §9 y catálogo maestro separan los perfiles canónicos y **44 propuestas de armas** sin perfil ratificado. | No incluir propuestas como objetos comprables del Manual Básico. |
| ECO-09 | Disponibilidad | Manual §19: **Común, Profesional, Restringida, Rara, Excepcional**; los niveles de mercado Foundry son **village/town/city/metropolis**. El propio §19 reconoce equivalencia no ratificada. | **Pendiente de decisión**, sin asignar rareza automática a objetos no clasificados. No confundir regla editorial de mundo con implementación de comercios. |
| ECO-10 | Acceso y ventas | §19: venta rápida 25 % del Valor Aplicable, venta directa ~50 % orientativo, restricción legal/social independiente de existencia y precio. | Consistente en revisión; tratamiento de bienes restringidos en Foundry sigue siendo problema técnico separado. |
| ECO-11 | Adaptación de equipo | §19 REV-CREA-08-001: +25 % menor, +50 % mayor, mínimo 1 p y redondeo a cobre. | Preservado; falta ejemplo editorial reproducible para lectura final. |
| ECO-12 | Diferencia entre precio y disponibilidad | §19: precios **Exacto, Variable y Sin precio establecido**; «0 c» es gratis, no desconocido. | Preservar distinción en tablas impresas: usar indicación «sin precio establecido» cuando proceda, no «0». |

## Tabla editorial mínima verificada (sin sustitución del Manual)

| Grupo | Catálogo aprobado | Propuestas en espera |
|---|---:|---|
| Equipo ordinario y kits | 25 objetos | 65 mundanas + 10 especiales |
| Armaduras | 5 perfiles + 89 variantes | 6 especiales |
| Escudos | 3 perfiles + 51 variantes | 6 especiales |
| Armas | consultar perfiles/catálogo maestro del capítulo 9 | 44 propuestas bloqueadas |

Los números anteriores describen **categorías documentales**, no precios ni una nueva selección cerrada de contenido del libro. Las variantes mecánicamente equivalentes pueden agruparse tipográficamente sin eliminarlas del canon.

## Verificación adicional — tabla ordinaria lista para maqueta

El cotejo por pares comparó **8 herramientas + 15 kits** en el orden y con precios del Manual Maestro (§9) y EQP-01 y encontró **0 diferencias**. También coincidieron el precio y las unidades de los **2 suministros**. Se preparó la tabla derivada en `docs/reviews/TABLA_EDITORIAL_EQUIPO_25_2026-11-19.md`, con notas de suministro, PEI y sin disponibilidades inferidas. Esto **no cierra** aún armas, consumibles, clasificación comercial ni precios de fabricación.

## Recomendaciones de cierre de libro
1. Preparar una **tabla única de compra** de equipo aprobado con moneda, precio, unidad comercial, peso físico si existe una regla aprobada (no inventarlo), FUE mínima cuando corresponda, disponibilidad sólo si fue ratificada y requisitos de acceso.
2. Imprimir por separado las reglas de **creación con PEI** y las de compra ordinaria. No reintroducir Paquetes de Preparación como modalidad mecánica.
3. Descartar de la sección de compra del Manual Básico las 65+10 propuestas de EQP-01 y las propuestas especiales no canónicas de armas/armaduras/escudos, salvo aprobación expresa posterior. No borrar propuestas ni archivos del repositorio.
4. Retirar de la edición para lectores finales las notas de depuración de la implementación Foundry §19, conservándolas para mantenimiento técnico.
5. Cerrar la política de Disponibilidad o declarar explícitamente que ciertas categorías de mercado y licencias son adjudicación contextual del Director; no inventar correspondencias.
6. Revisar línea a línea las tablas y los precios de munición especial, armas y consumibles antes de marcar P05 completada.

## Criterio de aceptación
- [ ] Todas las entradas comerciales impresas son canónicas y poseen precio o una marca de precio variable explícitamente ratificada.
- [ ] La compra inicial usa sólo Compra libre y conserva intacto el presupuesto.
- [x] Las **25 entradas ordinarias EQP-01** se cotejaron ítem por ítem con el Manual Maestro.
- [ ] Queda el cotejo ítem por ítem de **armas, munición, consumibles, armaduras y escudos**.
- [ ] La relación disponibilidad / mercado / acceso legal recibió decisión explícita o instrucciones de adjudicación aprobadas.
- [ ] El ejemplo de compra, venta y adaptación pasa revisión de costes y redondeos.
- [ ] No se modificó contenido mecánico, precio o capacidad sin aprobación.

**Conclusión:** el subbloque económico está inventariado, se corrigieron dos referencias derivadas obsoletas, y quedan pendientes las decisiones comerciales y la verificación exhaustiva de entradas. No se certifica cierre.
