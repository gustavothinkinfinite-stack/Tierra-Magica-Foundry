# CONTENT-01 — Navegador Universal de Contenido

**Estado:** CONTENT-01A IMPLEMENTADA EN RAMA · PENDIENTE DE VALIDACIÓN  
**Fecha:** 2026-10-05

## Objetivo

Dar acceso desde la barra lateral **Objetos / Items** a un navegador único de contenido canónico, sin obligar a recorrer manualmente los cuatro Compendios y sin crear una segunda fuente de datos.

La autoridad del navegador es `coreCatalog()`, la misma que alimenta los Compendios publicados.

## Fases

### CONTENT-01A — Navegación universal

- botón **Catálogo Tierra Mágica** en la barra lateral de Objetos;
- ventana propia;
- búsqueda por nombre y metadatos;
- filtro por tipo;
- contador de resultados;
- previsualización mecánica;
- lectura de todo el contenido actualmente presente en `coreCatalog()`;
- sin escritura de Actor ni creación de Items.

### CONTENT-01B — Crear en el mundo

Permitirá copiar una entrada canónica como Item de mundo conservando identidad, schema y datos mecánicos. Debe impedir duplicados accidentales o hacer explícita la copia.

### CONTENT-01C — Añadir a Actor

Usará las autoridades existentes de adquisición. No podrá saltar PEI, PD, PR, moneda, requisitos, límites de creación/progresión ni revisiones.

### CONTENT-01D — UX avanzada

Filtros específicos por disciplina, Habilidad, categoría, disponibilidad, región/tecnología cuando esos metadatos formen parte del source runtime; ordenación y acciones rápidas.

## Regla de seguridad

El navegador no inventa contenido ni transforma propuestas no canónicas en Items. Sólo expone entradas que ya pertenecen a `coreCatalog()`.
