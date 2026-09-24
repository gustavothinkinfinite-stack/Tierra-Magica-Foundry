# Tierra Mágica — Foundry T.M.

Sistema para Foundry VTT v14 basado en **Foundry T.M. 1.0 Playtest**.

La fuente mecánica canónica es `docs/Foundry_TM_Manual_1.0_Playtest.md`. Las versiones históricas no prevalecen cuando la contradicen.

Núcleo: 2d10 + Atributo + Habilidad; Ventaja/Desventaja 3d10 mejores/peores 2; 7 Atributos y 26 Habilidades; Vida 10+2×VIG; Maná 6+3×VOL; 1 Acción + Movimiento + Reacción; 25 PD + 3 PR + 100 C en creación; niveles 1–20; Trauma 0–3; magia de cuatro Fuentes y seis Disciplinas; Alquimia; Ritualismo; Energía/Caudal; familiares.

**1.0.14 — núcleo 1.0 completo y jugable.** La auditoría cruzada A1–A9 y la auditoría integral final están cerradas. Los cambios del motor requieren un defecto reproducible, una contradicción canónica, un hueco funcional demostrado o una decisión de diseño consolidada primero en el Manual.

Documentación de cierre: `docs/AUDITORIA_INTEGRAL_FINAL_1.0.md` · referencia de mesa: `docs/REFERENCIA_RAPIDA_GLOSARIO_1.0.md`.

## Limitaciones deliberadas de automatización

- **Broquel y efectos frontales:** Foundry muestra el bono del mejor escudo equipado, pero no determina automáticamente si una amenaza está en el arco frontal. El +1 del Broquel sólo se aplica cuando la mesa confirma que el ataque es frontal; ante ataques laterales o traseros debe ignorarse manualmente. Esta limitación evita introducir una geometría de encaramiento que el canon 1.0 no define.

```bash
npm run validate
```
