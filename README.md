# Tierra Mágica — Foundry T.M.

Sistema para Foundry VTT v14 basado en **Foundry T.M. 1.1**.

La jerarquía completa de fuentes está en `docs/FUENTES_CANONICAS.md`. La fuente activa única para reglas, creación, canon narrativo y desarrollo editorial es `docs/Tierra_Magica_Manual_Maestro.md`. Las versiones históricas, la implementación y los documentos derivados no prevalecen cuando contradicen esa fuente.

Núcleo: 2d10 + Atributo + Habilidad; Ventaja/Desventaja 3d10 mejores/peores 2; 7 Atributos y 26 Habilidades; Vida 10+2×VIG; Maná 6+3×VOL; 1 Acción + Movimiento + Reacción; 25 PD + 3 PR + PEI 20 o + Reserva líquida 2 o en creación; niveles 1–20; Trauma 0–3; magia de cuatro Fuentes y seis Disciplinas; Alquimia; Ritualismo; Energía/Caudal; familiares.

**Estado de desarrollo 1.5.1.** CREA-12 a CREA-15 están cerradas e integradas. El grimorio ampliado está auditado y canonizado en **60 hechizos**, con schema v5 para contratos de objetivos y cierre espacial definido. CREA-14 cerró la autosuficiencia de creación de nivel 1, CREA-15 cierra la autosuficiencia de progresión ordinaria 2–20 y CRAFT-01 a CRAFT-13 cierran el sistema de fabricación, reparación, desmantelamiento, modificaciones, magia de objetos, ingeniería, alquimia, investigación, interfaz y auditoría Foundry. CAT-01…11, ARM-01, ESC-01 y EQP-01 integran los catálogos maestros de armas, armaduras, escudos y equipo sobre esa base.

El núcleo 1.0 permanece **completo y jugable**. Cualquier ampliación mecánica futura debe partir de una decisión explícita incorporada primero al Manual Maestro; una fase nueva no se infiere automáticamente a partir del código.

La release pública actual es **v1.5.1**. El canal oficial de instalación y actualización usa el manifiesto estable publicado como asset de la última release.

## Instalación

En Foundry VTT, usa esta URL en **Instalar sistema → Manifest URL**:

`https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/releases/latest/download/system.json`

Ese manifiesto apunta siempre al ZIP de su propia versión, evitando que cambios posteriores en `main` adelanten una actualización todavía no publicada.

Índice de documentación: `docs/README.md` · documentación de cierre: `docs/AUDITORIA_INTEGRAL_FINAL_1.0.md` · referencia de mesa: `docs/REFERENCIA_RAPIDA_GLOSARIO_1.0.md` · jerarquía de fuentes: `docs/FUENTES_CANONICAS.md`. Los cierres de fase, auditorías históricas y reportes de release están en `docs/archive/`.

## Limitaciones deliberadas de automatización

- **Broquel y efectos frontales:** Foundry muestra el bono del mejor escudo equipado, pero no determina automáticamente si una amenaza está en el arco frontal. El +1 del Broquel sólo se aplica cuando la mesa confirma que el ataque es frontal; ante ataques laterales o traseros debe ignorarse manualmente. Esta limitación evita introducir una geometría de encaramiento que el canon 1.0 no define.

```bash
npm run validate
```
