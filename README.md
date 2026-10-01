# Tierra Mágica — Foundry T.M.

Sistema para Foundry VTT v14 basado en **Foundry T.M. 1.0 Playtest**.

La jerarquía completa de fuentes está en `docs/FUENTES_CANONICAS.md`. La fuente activa única para reglas, creación, canon narrativo y desarrollo editorial es `docs/Tierra_Magica_Manual_Maestro.md`. Las versiones históricas, la implementación y los documentos derivados no prevalecen cuando contradicen esa fuente.

Núcleo: 2d10 + Atributo + Habilidad; Ventaja/Desventaja 3d10 mejores/peores 2; 7 Atributos y 26 Habilidades; Vida 10+2×VIG; Maná 6+3×VOL; 1 Acción + Movimiento + Reacción; 25 PD + 3 PR + PEI 20 o + Reserva líquida 2 o en creación; niveles 1–20; Trauma 0–3; magia de cuatro Fuentes y seis Disciplinas; Alquimia; Ritualismo; Energía/Caudal; familiares.

**1.0.18 — REV-CREA-11-001 Sincronización post-cierre.** Corrige el constructor de Atributos iniciales, aplica el máximo de 3 Disciplinas de creación, hace que la magia de área reutilice una única tirada y sincroniza Manual/Referencia con decisiones ya cerradas de CREA-10/11. CREA-11 permanece cerrada; CREA-12 conserva la responsabilidad de derivados, Movimiento cuantificado, equipo/Protección y estados pendientes.

CREA-11 está formalmente cerrada e integrada en `main`; sus decisiones DAT-D01 a DAT-D666 son canónicas. CREA-12 queda como próxima tarea prevista.

Documentación de cierre: `docs/AUDITORIA_INTEGRAL_FINAL_1.0.md` · referencia de mesa: `docs/REFERENCIA_RAPIDA_GLOSARIO_1.0.md` · jerarquía de fuentes: `docs/FUENTES_CANONICAS.md`.

## Limitaciones deliberadas de automatización

- **Broquel y efectos frontales:** Foundry muestra el bono del mejor escudo equipado, pero no determina automáticamente si una amenaza está en el arco frontal. El +1 del Broquel sólo se aplica cuando la mesa confirma que el ataque es frontal; ante ataques laterales o traseros debe ignorarse manualmente. Esta limitación evita introducir una geometría de encaramiento que el canon 1.0 no define.

```bash
npm run validate
```
