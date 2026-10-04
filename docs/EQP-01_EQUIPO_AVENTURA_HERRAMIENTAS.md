# EQP-01 — Equipo de aventura y herramientas

**Estado:** 25 CANÓNICOS IMPLEMENTADOS · 75 PROPUESTAS ESTRUCTURADAS  
**Fecha:** 2026-10-04  
**Fuente mecánica:** Manual Maestro, capítulo de Equipo

## Objetivo

Llevar al Compendio el equipo ordinario que ya estaba definido en el Manual y construir una biblioteca amplia para futuras expansiones sin inventar bonos ni precios mientras CRAFT-13 continúa abierto.

## Estado del catálogo

El catálogo maestro contiene **100 entradas**:

- **25 objetos canónicos** con precio ya fijado por el Manual;
- **65 propuestas mundanas** sin precio todavía;
- **10 propuestas especiales** bloqueadas por materiales, magia o frontera Device;
- **25 Items runtime** en Tierra Mágica — Equipo.

## Objetos canónicos implementados

### Herramientas y equipo de aventura — 8

| Equipo | Precio |
|---|---:|
| Gancho de escalada | 3 p |
| Palanca | 2 p |
| Pico o pala | 2 p |
| Caja pequeña asegurada | 5 p |
| Catalejo | 1 o |
| Estuche impermeable de documentos/mapas | 5 p |
| Materiales de escritura | 2 p |
| Repuesto médico, 5 usos | 5 p |

### Kits profesionales — 15

| Kit | Precio |
|---|---:|
| Kit Artesano | 1 o |
| Kit Ingeniería de campo | 2 o |
| Kit Minería | 1 o |
| Kit Médico | 2 o |
| Kit Alquimia de campo | 2 o |
| Kit Infiltración | 1 o |
| Kit Cartográfico | 1 o |
| Kit Navegación | 2 o |
| Kit Campaña | 1 o |
| Kit Escalada | 1 o |
| Kit Escribanía | 5 p |
| Kit Mercantil | 1 o |
| Kit Académico | 2 o |
| Kit Instrumental Arcano de campo | 2 o |
| Kit Mantenimiento de armas de fuego | 1 o |

### Suministros — 2

- Provisiones 7 días — 2 p.
- Combustible de iluminación 5 noches — 2 p.

## Regla de seguridad

Un objeto ordinario:

- habilita un método físicamente posible;
- puede satisfacer un requisito;
- puede evitar una penalización causada por carecer de la herramienta necesaria;
- **no concede un +1/+2 universal**.

Un Kit sigue siendo instrumental reutilizable. No contiene vendas, reactivos, combustible, munición o comida infinitos.

## 65 propuestas mundanas

Se estructuran para auditoría posterior en siete grupos:

- campamento — 12;
- escalada y carga — 10;
- iluminación y señalización — 8;
- navegación y cartografía — 10;
- medicina e higiene — 8;
- contenedores y acceso — 9;
- herramientas — 8.

Entre ellas se encuentran mochilas, tiendas, cuerdas, arneses, poleas, faroles, brújulas, astrolabios, sextantes, vendas, cofres, carcajes y herramientas manuales.

Todas quedan con **precio sin fijar** hasta una auditoría económica específica. No se deduce su precio desde objetos parecidos.

## 10 propuestas especiales bloqueadas

### Frontera Device / CRAFT-13 — 7

- Lámpara arcana portátil
- Visor espectral
- Brújula de Trama
- Herramienta motorizada de campo
- Polea cinética
- Mochila de acumulador
- Baliza arcana de navegación

### Material especial o magia — 3

- Caja de conservación rúnica
- Lámpara de cristal resonante
- Kit de reparación de cristal vivo

Estas diez entradas no se convierten en Items runtime ni reciben precio, Energía, Caudal, Estabilidad o propiedades mágicas desde EQP-01.

## Implementación

Archivos principales:

- `scripts/catalog/equipment-canonical.mjs`
- `scripts/catalog/equipment-catalog-master.mjs`
- `test/equipment-catalog-master.test.mjs`

La integración se realiza mediante `coreCatalog()`, sin modificar `STARTER_CONTENT`, `template.json`, `system.json`, `package.json` ni los módulos de CRAFT-13.
