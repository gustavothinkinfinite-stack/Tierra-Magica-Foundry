# Tierra Mágica — Foundry T.M.

Sistema para Foundry VTT v14 basado en **Foundry T.M. 1.0 Playtest**.

La jerarquía completa de fuentes está en `docs/FUENTES_CANONICAS.md`. La fuente mecánica canónica es `docs/Foundry_TM_Manual_1.0_Playtest.md`; la fuente narrativa y de continuidad es **Tierra Mágica — Canon del Mundo v1.2**. Las versiones históricas, la implementación y los documentos derivados no prevalecen cuando contradicen la fuente maestra de su dominio.

Núcleo: 2d10 + Atributo + Habilidad; Ventaja/Desventaja 3d10 mejores/peores 2; 7 Atributos y 26 Habilidades; Vida 10+2×VIG; Maná 6+3×VOL; 1 Acción + Movimiento + Reacción; 25 PD + 3 PR + PEI 20 o + Reserva líquida 2 o en creación; niveles 1–20; Trauma 0–3; magia de cuatro Fuentes y seis Disciplinas; Alquimia; Ritualismo; Energía/Caudal; familiares.

**1.0.17 — CREA-11 Modelo de datos de creación cerrada.** Ascendencia, Origen, Trasfondo y Disciplina pasan a Items estructurados; las demás elecciones adquiribles comparten identidad estable, costes, requisitos, adquisición y reglas declarativas. El Actor conserva estado intrínseco; los Compendios son catálogo; los efectos activos son Items `effect`; la migración preserva legado sin inventar compras históricas. CREA-12 conserva la responsabilidad de las fórmulas y agregación final de valores derivados.

CREA-11 está formalmente cerrada e integrada en `main`; sus decisiones DAT-D01 a DAT-D666 son canónicas. CREA-12 queda como próxima tarea prevista.

Documentación de cierre: `docs/AUDITORIA_INTEGRAL_FINAL_1.0.md` · referencia de mesa: `docs/REFERENCIA_RAPIDA_GLOSARIO_1.0.md` · jerarquía de fuentes: `docs/FUENTES_CANONICAS.md`.

## Limitaciones deliberadas de automatización

- **Broquel y efectos frontales:** Foundry muestra el bono del mejor escudo equipado, pero no determina automáticamente si una amenaza está en el arco frontal. El +1 del Broquel sólo se aplica cuando la mesa confirma que el ataque es frontal; ante ataques laterales o traseros debe ignorarse manualmente. Esta limitación evita introducir una geometría de encaramiento que el canon 1.0 no define.

```bash
npm run validate
```
