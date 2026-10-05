# CONTENT-01 — Navegador Universal de Contenido

**Estado:** CONTENT-01 CERRADO EN A–B · IMPLEMENTADO Y VALIDADO · PR #60 ABIERTA  
**Fecha:** 2026-10-05

## Objetivo

Dar acceso desde la barra lateral **Objetos / Items** a un navegador único de contenido canónico, sin obligar a recorrer manualmente los cuatro Compendios y sin crear una segunda fuente de datos.

La autoridad del navegador es `coreCatalog()`, la misma que alimenta los Compendios publicados. CONTENT-01A superó `Validate` #37347043795 y CONTENT-01B superó `Validate` #37348114596, ambos con resultado **success**.

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

Implementada en la rama:

- botón **Crear en el mundo** desde la previsualización;
- copia completa del source canónico sin mutar `coreCatalog()`;
- conserva tipo, `slug`, schema y mecánicas;
- la copia de mundo no adquiere estado de compra de Actor: `system.acquisition = null`;
- deduplicación por **tipo + slug**;
- si ya existe el Item, la creación ordinaria se bloquea y se ofrece **Abrir existente**;
- una duplicación intencional requiere la acción separada **Crear otra copia**;
- crear un Item de mundo no lo añade a un Actor ni consume PEI/PD/PR/moneda.

## Límite funcional cerrado

CONTENT-01 **no añade contenido a Actors**.

Quedan fuera de alcance:

- añadir Items directamente a la ficha;
- comprar/adquirir desde el navegador;
- consumir PEI, PD, PR o moneda;
- modificar inventario de personaje;
- automatizar requisitos de creación/progresión desde esta ventana.

El navegador se limita a explorar contenido canónico y crear/abrir Items de mundo en la pestaña **Objetos**.

Los filtros avanzados por disciplina, Habilidad, categoría, disponibilidad o metadatos adicionales podrán evaluarse más adelante como mejora de UX separada, sin cambiar este límite.

## Regla de seguridad

El navegador no inventa contenido ni transforma propuestas no canónicas en Items. Sólo expone entradas que ya pertenecen a `coreCatalog()`.
