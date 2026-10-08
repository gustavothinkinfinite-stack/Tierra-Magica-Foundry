# Tierra Mágica — Foundry T.M.

Sistema para Foundry VTT v14 basado en **Foundry T.M. 1.1**.

La jerarquía completa de fuentes está en `docs/FUENTES_CANONICAS.md`. La fuente activa única para reglas, creación, canon narrativo y desarrollo editorial es `docs/Tierra_Magica_Manual_Maestro.md`. Las versiones históricas, la implementación y los documentos derivados no prevalecen cuando contradicen esa fuente.

Núcleo: 2d10 + Atributo + Habilidad; Ventaja/Desventaja 3d10 mejores/peores 2; 7 Atributos y 26 Habilidades; Vida 10+2×VIG; Maná 6+3×VOL; 1 Acción + Movimiento + Reacción; 25 PD + 3 PR + PEI 20 o + Reserva líquida 2 o en creación; niveles 1–20; Trauma 0–3; magia de cuatro Fuentes y seis Disciplinas; Alquimia; Ritualismo; Energía/Caudal; familiares.

**Estado de desarrollo 1.7.0.** CREA-12 a CREA-15 están cerradas e integradas. El grimorio ampliado está auditado y canonizado en **60 hechizos**, con schema v5 para contratos de objetivos y cierre espacial definido. CREA-14 cerró la autosuficiencia de creación de nivel 1, CREA-15 cierra la autosuficiencia de progresión ordinaria 2–20 y CRAFT-01 a CRAFT-13 cierran el sistema de fabricación, reparación, desmantelamiento, modificaciones, magia de objetos, ingeniería, alquimia, investigación, interfaz y auditoría Foundry. CAT-01…11, ARM-01, ESC-01 y EQP-01 integran los catálogos maestros de armas, armaduras, escudos y equipo sobre esa base.

El núcleo 1.0 permanece **completo y jugable**. Cualquier ampliación mecánica futura debe partir de una decisión explícita incorporada primero al Manual Maestro; una fase nueva no se infiere automáticamente a partir del código.

La próxima release prevista es **v1.7.0**; la última publicada sigue siendo **v1.6.1** hasta completar el workflow. El canal oficial de instalación y actualización usa el manifiesto estable publicado como asset de la última release.

## Instalación

En Foundry VTT, usa esta URL en **Instalar sistema → Manifest URL**:

`https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/releases/latest/download/system.json`

Ese manifiesto apunta siempre al ZIP de su propia versión, evitando que cambios posteriores en `main` adelanten una actualización todavía no publicada.

Índice de documentación: `docs/README.md` · documentación de cierre: `docs/AUDITORIA_INTEGRAL_FINAL_1.0.md` · referencia de mesa: `docs/REFERENCIA_RAPIDA_GLOSARIO_1.0.md` · jerarquía de fuentes: `docs/FUENTES_CANONICAS.md`. Los cierres de fase, auditorías históricas y reportes de release están en `docs/archive/`.

## Recuperación de reservas de fabricación

En v1.6.1 se corrigió un problema de persistencia de la clave de reserva de materiales que impedía finalizar Proyectos ya iniciados. Proyectos existentes en estado «En curso» pueden recuperar automáticamente su reserva al completar, siempre que el libro de materiales comprometidos cuadre, el Lote siga disponible y no haya otro Proyecto activo compitiendo por el mismo material. No se repite el trabajo ni el pago. Los controles de VI, materiales compatibles, idempotencia y concurrencia continúan.

## Fabricación de equipo común

En Desarrollo → Proyectos de fabricación e investigación → Catálogo → Equipo común se pueden crear 21 proyectos CRAFT-03: seis herramientas y los quince Kits profesionales. Sus precios, coste de materiales, tiempo, Habilidad, especialización e instalación provienen del Manual Maestro. Durante la ejecución se deben aportar físicamente los materiales y cumplir los requisitos; el resultado usa el Item canónico del Compendio de Equipo. Los consumibles sin receta técnica propia y las propuestas de EQP-01 sin precio aprobado permanecen pendientes.

## Control de turno en la ficha

Acción y Reacción son indicadores manuales. Los botones de ataque, magia, alquimia, técnicas, dispositivos y familiares ejecutan sus operaciones aunque esos indicadores se hayan marcado como gastados. El jugador o DJ lleva el registro del límite reglamentario. Las restricciones propias de cada operación (objetivos, conocimientos, Maná, Energía, Movimiento aplicable, condiciones, daño y disparadores especiales) no cambian.

## Limitaciones deliberadas de automatización

- **Broquel y efectos frontales:** Foundry muestra el bono del mejor escudo equipado, pero no determina automáticamente si una amenaza está en el arco frontal. El +1 del Broquel sólo se aplica cuando la mesa confirma que el ataque es frontal; ante ataques laterales o traseros debe ignorarse manualmente. Esta limitación evita introducir una geometría de encaramiento que el canon 1.0 no define.

```bash
npm run validate
```

## Bestiario — perfiles de referencia

El sistema incluye el compendio de Actors **Tierra Mágica — Bestiario**.
El generador `npm run build:packs` produce 11 PNJ/criaturas del capítulo 23
del Manual Maestro. Para usarlos, abre el Compendio de Bestiario e importa
el Actor al mundo; desde la pestaña de Actores se puede colocar en una escena.

Los perfiles importados usan sus valores directos de Vida, Defensas,
Protección, Movimiento e Iniciativa; no siguen los 25 PD / 3 PR ni reciben
escalado por nivel. Las tiradas de ataques referenciales muestran el
bonificador, daño y Penetración del Manual, pero **no aplican daño automático**;
el Director resuelve Protección, resistencias, daño y condiciones según
el contexto normal de combate.

**Datos deliberadamente abiertos:** la Defensa Corporal del Centinela de
Bronce es «—» y no se transforma en 0; su Defensa Mental sólo se consulta
ante efectos capaces de afectarlo. La Protección 0–1 del Canalizador hostil
se muestra como rango (se importa con valor operativo 0, editable). Las
capas de hechizos concretos, daños del tipo de arma, vulnerabilidades,
rasgos y acciones opcionales no se inventan al importar. Fuera del Canalizador
hostil el Manual no cuantifica Maná: se inicializa en 0 como
valor operativo, no como nueva regla. El umbral de Daño Grave utiliza
temporalmente la fórmula general 5 + VIG y no figura en los perfiles §23.

Los NPC nuevos que no proceden del compendio siguen utilizando la ficha
habitual salvo que su `npcProfile.enabled` se active explícitamente.
