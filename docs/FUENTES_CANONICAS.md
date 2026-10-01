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

## Estado de CREA-10

CREA-10 — Lista definitiva de Habilidades queda preparada para cierre en Foundry 1.0.16: **26 Habilidades**, ocho categorías, rangos +0/+1/+2/+4/+6/+8, costes 0/1/3/7/13/21 PD, requisitos por rango base, Especializaciones a 1 PD y Método Directo/Ritual vinculado a Canalización/Ritualismo.

## Estado de CREA-11

CREA-11 — Modelo de datos de creación está **CERRADA v1.0** e integrada en Foundry **1.0.17**. El modelo separa Actor base, Items adquiribles, requisitos tipados, Rule Elements declarativos, adquisición/procedencia, Effects y Compendios. La migración conserva información histórica ambigua como legado y no reconstruye compras por inferencia.

Sus decisiones DAT-D01 a DAT-D666 son CANÓNICAS. CREA-11 no cambia las fórmulas definitivas de valores derivados: esa responsabilidad permanece en CREA-12, próxima tarea prevista.

## REV-CREA-11-001 — Sincronización post-cierre

CREA-11 permanece **CERRADA v1.0**. Foundry **1.0.18** aplica una revisión controlada posterior al cierre para corregir divergencias sin reabrir el diseño: Atributos iniciales (6 aumentos, máximo 3), máximo inicial de 3 Disciplinas, una única tirada para magia de área y sincronización documental de decisiones ya ratificadas de CREA-10/11.

Protección derivada, FUE mínima y penalizaciones de equipo, Bloqueo/orientación, Movimiento cuantificado y automatización de Sangrado continúan reservados para CREA-12 o su integración correspondiente.

## Implementación

`scripts/*`, `template.json`, datos, UI y pruebas implementan y verifican el Manual Maestro. Si la implementación contradice el Manual, se abre una incidencia y se corrige la discrepancia; el código no modifica la regla por sí mismo.

## Fuentes visuales

La guía visual, portada de referencia e ilustraciones siguen siendo activos visuales separados porque no son texto del manual. Orientan la futura maquetación y arte, pero no sustituyen la fuente textual única.
