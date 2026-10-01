# CREA-12 — Fase 3: Implementación

**Estado:** EN DESARROLLO  
**Fase 1:** CERRADA — DER-D01 a DER-D44  
**Fase 2:** APROBADA — DER-A01 a DER-A30  
**P-011:** ABIERTO

## Fase 3A — Motor común de derivados

Objetivo: reemplazar el bloque monolítico de derivados por un motor puro, auditable y reutilizable sin alterar todavía todas las rutas contextuales de combate.

Implementación inicial:

- `scripts/rules/derived-state.mjs` concentra fórmulas, contribuciones y breakdowns.
- `FlatModifier` alimenta Vida máxima, Maná máximo, Bono Defensivo, Defensas, Protección, Movimiento e Iniciativa.
- `initiativeModifier` es el nombre canónico; `initiative` queda como alias transitorio.
- Armadura y escudo se convierten en contribuciones con procedencia.
- Escudos `frontalOnly` quedan como contribuciones contextuales y no inflan la Defensa preparada.
- Los campos manuales legados siguen siendo leídos temporalmente, pero aparecen identificados como `legacy-manual`.
- `resources.health.max` y `resources.mana.max` siguen expuestos como espejos preparados para compatibilidad con Foundry.
- Se añade `resolveDerivedSelector()` como base para la resolución contextual de Fase 3C.

## Trabajo todavía pendiente dentro de Fase 3

1. **3B — Movimiento y migración:** sustituir `turn.movement` booleano por gasto cuantificado y migrar bonos manuales a fuentes estructuradas.
2. **3C — contexto defensivo:** integrar Guardia, Parada, Barrera Cinética, orientación de escudos y Protección condicional mediante el resolvedor común.
3. **3D — recursos y reconciliación:** limitar Vida/Maná actuales cuando disminuyan máximos sin otorgar recuperación al aumentarlos.
4. **3E — ficha y diagnóstico:** exponer fórmula, contribuciones y valores contextuales.
5. **3F — sincronización cruzada:** pruebas secuenciales de equipo, estados, magia, atributos, guardado y reapertura.

CREA-12 no se considera cerrado hasta completar esas etapas y satisfacer DER-D42/DER-D43.
