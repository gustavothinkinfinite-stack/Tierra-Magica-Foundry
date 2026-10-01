# Tierra Mágica — Foundry T.M.

Sistema para Foundry VTT v14 basado en **Foundry T.M. 1.0 Playtest**.

La jerarquía completa de fuentes está en `docs/FUENTES_CANONICAS.md`. La fuente activa única para reglas, creación, canon narrativo y desarrollo editorial es `docs/Tierra_Magica_Manual_Maestro.md`. Las versiones históricas, la implementación y los documentos derivados no prevalecen cuando contradicen esa fuente.

Núcleo: 2d10 + Atributo + Habilidad; Ventaja/Desventaja 3d10 mejores/peores 2; 7 Atributos y 26 Habilidades; Vida 10+2×VIG; Maná 6+3×VOL; 1 Acción + Movimiento + Reacción; 25 PD + 3 PR + PEI 20 o + Reserva líquida 2 o en creación; niveles 1–20; Trauma 0–3; magia de cuatro Fuentes y seis Disciplinas; Alquimia; Ritualismo; Energía/Caudal; familiares.

**Estado de desarrollo post-1.0.18.** CREA-12 y CREA-13 están cerradas e integradas en `main`. CREA-12 consolidó derivados, Movimiento cuantificado, equipo/Protección y reconciliación de recursos. CREA-13 validó siete perfiles completos, persistencia/reversibilidad y endureció compra física, Alquimia, Energía/Caudal y defensa cinética concurrente.

El núcleo 1.0 permanece **completo y jugable**. No existe una fase **CREA-14** definida en el repositorio. Cualquier ampliación mecánica futura debe partir de una decisión explícita incorporada primero al Manual Maestro; no se infiere una fase nueva a partir del código.

La release pública actual es **v1.0.18**. El canal oficial de instalación y actualización usa el manifiesto estable publicado como asset de la última release.

## Instalación

En Foundry VTT, usa esta URL en **Instalar sistema → Manifest URL**:

`https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/releases/latest/download/system.json`

Ese manifiesto apunta siempre al ZIP de su propia versión, evitando que cambios posteriores en `main` adelanten una actualización todavía no publicada.

Documentación de cierre: `docs/AUDITORIA_INTEGRAL_FINAL_1.0.md` · referencia de mesa: `docs/REFERENCIA_RAPIDA_GLOSARIO_1.0.md` · jerarquía de fuentes: `docs/FUENTES_CANONICAS.md`.

## Limitaciones deliberadas de automatización

- **Broquel y efectos frontales:** Foundry muestra el bono del mejor escudo equipado, pero no determina automáticamente si una amenaza está en el arco frontal. El +1 del Broquel sólo se aplica cuando la mesa confirma que el ataque es frontal; ante ataques laterales o traseros debe ignorarse manualmente. Esta limitación evita introducir una geometría de encaramiento que el canon 1.0 no define.

```bash
npm run validate
```
