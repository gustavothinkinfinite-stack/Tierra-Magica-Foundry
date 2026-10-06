# REV-CREA-11-001 — Sincronización post-cierre

Estado: **CERRADA E INTEGRADA** en Foundry T.M. 1.0.18 mediante PR #22. Commit de integración en `main`: `52317ae7105a63ced869b152486ada0b7597fca1`. Validación de `main`: GitHub Actions Validate #158 — SUCCESS.

## Motivo

Auditoría posterior al cierre de CREA-11 detectó divergencias entre Manual Maestro y Foundry. Esta revisión no reabre CREA-11 ni modifica su arquitectura; corrige implementación/documentación para que decisiones ya cerradas vuelvan a coincidir.

## Correcciones mecánicas

1. **Atributos iniciales**
   - Los siete Atributos parten de 1.
   - Se distribuyen exactamente 6 aumentos gratuitos.
   - Máximo inicial normal 3.
   - Durante `creation.status = building`, editar Atributos actualiza conjuntamente `creationValue` y `baseValue`, por lo que los aumentos gratuitos no se cobran como progresión PD.
   - Completar creación valida el reparto y bloquea progresión pagada de Atributo antes del cierre.

2. **Disciplinas**
   - Se mantiene coste 2 PD y requisito Canalización Entrenada.
   - Máximo inicial: 3 Disciplinas.
   - Se valida al adquirir y al completar creación.
   - El límite es de adquisición inicial; no prohíbe Disciplinas posteriores por progresión.

3. **Magia de área**
   - Una única resolución de lanzamiento.
   - El mismo total se compara contra la Defensa pertinente de cada objetivo.
   - No se vuelve a tirar por objetivos adicionales.

## Sincronización documental

- Familiar Mágico: se elimina la aparición residual de 2 PR; canon vigente 3 PR en creación / 6 PD posterior.
- Especializaciones: máximo inicial 2 por Habilidad madre, ya cerrado en CREA-10.
- Hechizos: se documenta competencia operativa por grado y Método Directo→Canalización / Ritual→Ritualismo.
- Cierre Restaurador y Visión Arcana: se retiran requisitos temáticos implícitos que CREA-10 ya había descartado.
- Regeneración: Método Ritual y Medicina Entrenada.
- Reconstrucción: conserva requisito de Medicina, pero su rango mínimo no está cuantificado; Foundry no infiere uno.
- Armas, armaduras y escudos: tablas reparadas según catálogo canónico en cobres/o-p-c.
- README: Manual Maestro único restaurado como fuente activa.

## Fuera de alcance

Continúan en CREA-12 o integración posterior:
- agregación definitiva de Protección y Piel Alterada;
- FUE mínima y penalizaciones automáticas de armaduras;
- frontalidad/Bloqueo de escudos;
- Movimiento cuantificado/dividido;
- automatización de Sangrado y retirada por Cierre Restaurador;
- demás valores derivados.

## Criterio de cierre

- Tests de Atributos iniciales.
- Tests de máximo inicial de Disciplinas.
- Test funcional de una sola tirada para múltiples objetivos de área.
- Tests documentales anti-regresión.
- `npm run validate` verde.
- PR fusionada a `main`.
