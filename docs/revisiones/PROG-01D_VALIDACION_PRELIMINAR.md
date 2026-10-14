# PROG-01D — Validación preliminar de rutas de progresión

Fecha: 2026-10-13. Estado: análisis no canónico, sin modificación de mecánicas.

## Verificaciones contra el repositorio

Las rutas de PROG-01C se contrastaron con los costes del Manual Maestro (capítulos 4, 12 y 13) y con las funciones de presupuesto y puertas de `scripts/rules/creation.mjs`, `scripts/rules/skills.mjs` y `scripts/rules/acquisition.mjs`.

| Perfil | Niveles 1/5/10/15/20: PD gastados | PD totales |
|---|---|---|
| Marcial | 25 / 41 / 60 / 80 / 100 | 25 / 41 / 61 / 81 / 101 |
| Canalizador | 25 / 38 / 57 / 77 / 96 | Igual |
| Híbrido | 25 / 40 / 59 / 78 / 95 | Igual |
| Especialista | 25 / 41 / 59 / 79 / 97 | Igual |

Todos los puntos de control quedan dentro del presupuesto, pero eso **no demuestra** legalidad de los Items reales.

## Riesgos y hallazgos concretos

1. El cálculo de PD de `deriveDevelopmentBudget` suma coste de rangos, mejoras de Atributo e historial de adquisiciones. Este control cuantifica presupuesto, no sustituye `preflightAcquisition`.
2. `validateSkillProgression` controla nivel mínimo de Maestro/Gran Maestro, máximo una Habilidad Experta en nivel 1 y exigencia de Especialización para Gran Maestro cuando corresponda.
3. `preflightAcquisition` puede rechazar compras por requisitos, duplicados, elecciones pendientes o falta de coste de progresión. Por eso las rutas nominales deben probarse Item por Item en el compendio.
4. La ruta canalizadora de PROG-01C incluye **Contramagia**: antes de considerarla válida se debe comprobar el requisito concreto de compatibilidad mágica en la ficha técnica y en Foundry.
5. La ruta marcial incluye **Recibir Carga**, cuyo uso depende de poseer un arma de Alcance, y **Contraataque**, que exige Parada. El cumplimiento de equipo físico no ha sido ensayado.
6. Las rutas asignan Especialización a Investigación o Armas Marciales: hay que comprobar los Items exactos disponibles y la identidad nominal de cada Especialización.
7. El gasto en una Técnica o hechizo no garantiza que exista el Item comprado ni que pase su contrato de requisitos. El grado Legendario, métodos rituales y adquisiciones de progresión necesitan pruebas con documentos reales.

## Criterio para el siguiente incremento

Crear fixtures basados en los Items realmente construidos por `tools/build-packs.mjs`, registrar las operaciones `preflightAcquisition` para cada paso y medir rechazos con sus códigos. Después comparar desempeño real de las rutas, no solamente gastos. No tocar el canon hasta resolver estos rechazos y definir la política de adjudicación de niveles.

**Estado de PROG-01:** abierto. No se afirma validación en Foundry ni aprobación de equilibrio.
