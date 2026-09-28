# Fuentes del proyecto — política de fuente única

Fecha de consolidación: 2026-09-28.

## Fuente activa única

La única fuente activa para **reglas, creación de personaje, canon narrativo, desarrollo editorial y preparación futura del libro** es:

`docs/Tierra_Magica_Manual_Maestro.md`

Toda regla o decisión nueva debe incorporarse primero allí. Foundry VTT, referencias rápidas, auditorías, documentos antiguos y material de diseño son derivados, historial o herramientas de verificación; no crean canon por sí mismos.

## Material histórico y de respaldo

Los Manuales v0.1/v0.2, el Manual Básico mecánico 1.0 separado, los Canon del Mundo v1.1/v1.2 separados y las auditorías se conservan únicamente para trazabilidad, recuperación y comprobación de procedencia. Su contenido útil vigente fue integrado en el Manual Maestro Único. Si un documento histórico contradice el Manual Maestro, prevalece el Manual Maestro.

Git/GitHub conserva el historial de cada modificación. No se debe eliminar una fuente histórica externa por considerarla obsoleta hasta confirmar que el contenido útil fue integrado o archivado dentro del Manual Maestro.

## Estado de CREA-09

CREA-09 — Moneda está consolidada en el Manual Maestro y su implementación Foundry 1.0.15: c/p/o, PEI 20 o, Reserva 2 o, precios en cobres enteros, Unidad Comercial y migración segura del campo legado `crowns`.

## Implementación

`scripts/*`, `template.json`, datos, UI y pruebas implementan y verifican el Manual Maestro. Si la implementación contradice el Manual, se abre una incidencia y se corrige la discrepancia; el código no modifica la regla por sí mismo.

## Fuentes visuales

La guía visual, portada de referencia e ilustraciones siguen siendo activos visuales separados porque no son texto del manual. Orientan la futura maquetación y arte, pero no sustituyen la fuente textual única.
