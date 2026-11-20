# EQ-ED-01 — Conciliación editorial de equipo, economía y disponibilidad

**Fecha:** 2026-11-20. **Estado:** auditoría documental, sin modificación del canon ni pruebas de juego.
**Autoridad consultada:** `main:docs/Tierra_Magica_Manual_Maestro.md`, blob `50c63cc50ac6b3ee14c52e8a0661a2d4fa07c658`. Este expediente es una herramienta editorial, no una segunda tabla de precios.

## Alcance y cotejo verificable

| Cruce | Regla o dato de autoridad | Resultado |
|---|---|---|
| Cap. 9 «Equipo de aventura y herramientas» ↔ cap. 19 «Catálogo monetario» | Gancho 3 p; palanca 2 p; pico/pala 2 p; caja 5 p; catalejo 1 o; estuche 5 p; escritura 2 p; repuesto médico (5 usos) 5 p | Los ocho precios se repiten sin discrepancia visible. |
| Cap. 9 «Kits profesionales» ↔ cap. 19 | Artesano 1 o; Ingeniería 2 o; Minería 1 o; Médico 2 o; Alquimia 2 o; Infiltración 1 o; Cartográfico 1 o; Navegación 2 o; Campaña 1 o; Escalada 1 o; Escribanía 5 p; Mercantil 1 o; Académico 2 o; Instrumental Arcano 2 o; Mantenimiento de armas de fuego 1 o | Quince precios coincidentes; diferencias de capitalización/nombre abreviado no crean un artículo nuevo. |
| Cap. 19 «Moneda canónica» ↔ «PEI y Reserva» | 10 c = 1 p; 10 p = 1 o; PEI 20 o = 2.000 c; Reserva 2 o = 200 c | Conversiones aritméticamente consistentes. PEI no se convierte en saldo. |
| Cap. 19 «Unidad Comercial» ↔ referencias de munición cap. 9 | Flechas 20/2 p; virotes 20/3 p; disparos ordinarios 12/5 p; perforantes 20/4 p y 20/6 p | No confundir precio de lote con precio unitario. Las recetas CRAFT-03 ordinarias no habilitan fabricar perforantes por inferencia. |
| Cap. 19 «Precio, Unidad Comercial y mercado» ↔ «Auditoría de disponibilidad» | Cinco categorías de disponibilidad frente a cuatro niveles de establecimiento | **Laguna normativa abierta y ya declarada en canon**: no inventar equivalencia automática. |
| Cap. 9 «Catálogo ampliado aprobado de escudos» ↔ cap. 19 | 51 variantes heredan uno de tres perfiles mecánicos | No derivar precios distintos ni cobertura por el nombre regional; verificar la identidad del perfil en el catálogo antes de exportar. |

## Riesgos de publicación y decisiones de producción

1. **Disponibilidad no determinada:** el Manual deja explícito que los 25 objetos de `CANONICAL_EQUIPMENT` no poseen clasificación individual. Una tabla impresa no debe completar esos campos con «Común» ni transformar el nivel mínimo operativo provisional en disponibilidad canónica. Mostrar «No especificada» en la maqueta hasta decisión explícita.
2. **Restringida no es un nivel urbano:** la barrera temporal contra compra automática de artículos restringidos no sustituye licencias ni autorización. Mantener diferenciados **Disponibilidad**, **existencia en mercado** y **derecho de compra** en tablas, leyendas y fichas.
3. **Precio desconocido no es cero:** preservar tres estados, Exacto, Variable y Sin precio establecido. Los bienes históricos tasados únicamente en Coronas no reciben conversión automática. No presentar guiones vacíos como si fueran gratuidad.
4. **Lotes comerciales:** al componer tablas, incluir la cantidad física junto al precio de flechas, virotes, munición y repuestos; el coste de un lote no debe trasladarse a un solo proyectil.
5. **Venta y fabricación:** venta rápida = 25% del Valor Aplicable redondeado hacia abajo; venta directa ~50% es orientación, no tarifa; fabricación ordinaria 50% del Valor de Referencia redondeado hacia arriba cuando no exista receta propia. No usar «precio de catálogo» como sustituto indiscriminado de VA/VR.
6. **Equipo adaptado:** 25% menor y 50% mayor, con mínimo de 1 p y redondeo hacia arriba al cobre. La talla ordinaria de fabricación desde cero para usuario conocido ya está incluida; no aplicar recargo por duplicado.
7. **Calidad y escudos:** la calidad no otorga bonificación numérica universal; las 51 variantes son nombres/perfiles derivados. No atribuir material especial, energía o cobertura por ilustración o denominación.

## Controles para la siguiente pasada editorial

- [x] Lectura del Manual Maestro vigente y de su apartado explícito de trabajo pendiente.
- [x] Cotejo documental de ocho herramientas, quince Kits, moneda, PEI/Reserva y lotes de munición.
- [x] Identificación de lagunas sin inventar reglas, precios ni categorías.
- [ ] Cotejo exhaustivo de los 29 renglones del catálogo monetario con los perfiles mecánicos del capítulo 9 y recetas CRAFT-03; comprobar identificadores, nombres y unidades.
- [ ] Conciliar las ocho fórmulas de CRAFT-11 con sus precios y unidades en una tabla de producción.
- [ ] Definir por autoridad canónica las correspondencias de mercado y permisos antes de cerrar disponibilidad.
- [ ] Comprobar las fichas exportadas y el diseño de tabla en la maqueta; **no hay prueba de maquetación en esta auditoría**.

**Resultado:** sin contradicción numérica detectada en los 23 precios cotejados; quedan pendientes las correspondencias de disponibilidad y la auditoría exhaustiva de catálogo/recetas. No se certifica integridad de Foundry ni PDF.
