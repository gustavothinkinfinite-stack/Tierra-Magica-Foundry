# RZ-ED-04 — Referencias cruzadas y respiración Teria (B5-I05)

Fecha: 2026-11-20. Autoridad: `main:docs/Tierra_Magica_Manual_Maestro.md`, blob `50c63cc50ac6b3ee14c52e8a0661a2d4fa07c658`. Rama de trabajo: `editorial/auditoria-economia-2026-11-20`. Continuidad: RZ-ED-03. Auditoría documental, no prueba empírica.

## Hallazgos verificables

1. **Glosario «Acción».** Remitía exclusivamente a §8 (Combate). El capítulo §6, «Turno, movimiento y posición», contiene el marco general del turno. Se conserva §8 y se añade §6 como referencia primaria complementaria. No se cambia la economía de acciones.
2. **Terios y B5-I05.** El ejemplo del anexo decía correctamente que nadar no permite respirar y remitía a Anfibio (1 PR), pero omitía la excepción explícita para branquias anatómicamente funcionales compatibles con Linaje/Variedad. Se incorpora esa posibilidad y sus límites: sólo agua ordinaria, sin nado gratuito, respiración aérea no sustentada ni inmunidades ambientales. Se conserva la compra independiente de Anfibio por 1 PR, que no concede nado ni hidratación.
3. **Jerarquía normativa.** Se contrastaron §3 (paquete Terio), B5-I05 y glosario; ninguna de las dos enmiendas introduce costes, bonificaciones o facultades nuevas.

## Cambios y comprobación

- Archivo modificado: `docs/Tierra_Magica_Manual_Maestro.md` **únicamente en rama editorial**, commit `dc1c38f774ddc86f878c3c647318e45382ddf099`.
- Dos sustituciones exactas y únicas en la versión de rama leída previamente. No se tocó código Foundry ni se integró `main`.
- Casos documentales: Terio nadador sin branquias ni Anfibio no respira agua; Terio con branquias compatibles sí respira agua ordinaria sin ganar nado; Anfibio comprado por 1 PR permite respirar aire y agua ordinarios, no inmunidad ni hidratación; glosario dirige tanto a §6 como §8.
- Pruebas empíricas: **0**. Validación de impresión/PDF: **no realizada**.

## Pendientes

Revisar diff completo del PR #112 y su compatibilidad con `main` antes de fusionar; comprobar restantes remisiones del glosario, PNJ/familiares/criaturas y activos visuales; preparar maquetación y exportaciones únicamente con arte autorizado. Si el PR cambia respecto de esta revisión, reauditar antes de integrar.
