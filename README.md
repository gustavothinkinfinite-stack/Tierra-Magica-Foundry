# Tierra Mágica — Foundry T.M.

Sistema para Foundry VTT v14 basado en **Foundry T.M. 1.1**.

La jerarquía completa de fuentes está en `docs/FUENTES_CANONICAS.md`. La fuente activa única para reglas, creación, canon narrativo y desarrollo editorial es `docs/Tierra_Magica_Manual_Maestro.md`. Las versiones históricas, la implementación y los documentos derivados no prevalecen cuando contradicen esa fuente.

Núcleo: 2d10 + Atributo + Habilidad; Ventaja/Desventaja 3d10 mejores/peores 2; 7 Atributos y 26 Habilidades; Vida 10+2×VIG; Maná 6+3×VOL; 1 Acción + Movimiento + Reacción; 25 PD + 3 PR + PEI 20 o + Reserva líquida 2 o en creación; niveles 1–20; Trauma 0–3; magia de cuatro Fuentes y seis Disciplinas; Alquimia; Ritualismo; Energía/Caudal; familiares.

**Estado de desarrollo 1.11.0.** CREA-12 a CREA-15 están cerradas e integradas. El grimorio ampliado está auditado y canonizado en **60 hechizos**, con schema v5 para contratos de objetivos y cierre espacial definido. CREA-14 cerró la autosuficiencia de creación de nivel 1, CREA-15 cierra la autosuficiencia de progresión ordinaria 2–20 y CRAFT-01 a CRAFT-13 cierran el sistema de fabricación, reparación, desmantelamiento, modificaciones, magia de objetos, ingeniería, alquimia, investigación, interfaz y auditoría Foundry. CAT-01…11, ARM-01, ESC-01 y EQP-01 integran los catálogos maestros de armas, armaduras, escudos y equipo sobre esa base.

El núcleo 1.0 permanece **completo y jugable**. Cualquier ampliación mecánica futura debe partir de una decisión explícita incorporada primero al Manual Maestro; una fase nueva no se infiere automáticamente a partir del código.

La release pública actual es **v1.11.0**. La versión incorpora orientación para jugadores nuevos en los ocho pasos de creación, con descripciones de Ascendencias, Orígenes, Trasfondos y decisiones de PD, PR y Equipo. El canal oficial de instalación y actualización usa el manifiesto estable publicado como asset de la última release.

## Creación guiada para jugadores nuevos

Al crear un personaje, la solapa Desarrollo presenta ocho pasos obligatorios y una explicación de qué está eligiendo el jugador, cuál es su presupuesto y qué falta para avanzar. Las opciones se abren en un navegador de tarjetas con descripción narrativa, capacidades canónicas, costes y requisitos. Los Ankar, Goblins, Dríades y todas las Ascendencias jugables cuentan con introducciones tomadas del Manual Maestro. La identidad elegida se explica también en la ficha. El flujo no concede ni cambia poderes, PD, PR, PEI o equipo automáticamente más allá de las reglas existentes.

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

## Arte del Bestiario — retratos y tokens integrados

Desde **v1.8.0** el sistema distribuye retratos y tokens; la **v1.12.0 preparada, no publicada**, reúne **16 parejas** de WebP directamente
en `assets/bestiary/`: Civil, Bandido, Guardia, Soldado, Veterano,
Canalizador hostil, Lobo, Ogro, Centinela de Bronce, Troll dominante y
**Lobo del Eco Muerto**, y las cinco criaturas nuevas **Ciervo Astral**, **Araña de Campanario**, **Jabalí Ígneo**, **Garza de Cristal** y **Sabueso Espectral**. Cada pareja contiene:

- Retrato del Actor: `<slug>-retrato.webp`.
- Token circular: `<slug>-token.webp`.

Foundry las resuelve desde `systems/tierra-magica/assets/bestiary/` al generar
el compendio `Tierra Mágica — Bestiario`. No requiere instalar imágenes ni
ejecutar macros adicionales. El constructor verifica que todos los WebP sean
válidos y que cada pareja esté completa.

El **Tirador** mantiene el icono genérico: su imagen debe mostrar un rifle
temprano según el Manual Maestro, no el arco de un boceto descartado.

La versión preparada del compendio contiene **17 Actores**. El **Lobo del Eco Muerto** permanece
separado del Lobo canónico y está señalado como propuesta original pendiente de
aprobación. Su documentación editorial está en
`docs/visual/Lobo_del_Eco_Muerto_Bestiario_Original.md`; no modifica las
reglas del Manual Maestro.



## Fabricación: Lotes de Materiales y recuperación de reservas (v1.10.0)

**Compra de lotes:** en una ficha de personaje, abrir **Equipo → + Equipo**,
elegir uno de los 13 ítems **Lote de materiales** del compendio **Tierra Mágica — Equipo**
y adquirirlo por el flujo normal. Paquetes ordinarios: 1 plata (10 c de VI),
5 platas (50 c de VI) o 1 oro (100 c de VI). También hay familias
(metal, madera, cuero, vidrio, alquimia, construcción, ingeniería) y grados
especializados/raros/excepcionales para asignación por el DJ.

El **VI no es moneda**: el lote precisa acceso a materiales realmente disponibles
y compatibilidad de oficio con el Proyecto. Los precios de lotes ordinarios
son provisiones de prueba operativa, no precios universales canónicos.
Para materiales raros y excepcionales **no se inventan precios**; el DJ
adjudica adquisición y valor comercial. Los lotes no crean materiales
especiales ni reactivos mágicos sin una regla específica.

**Reparación de un mundo afectado por proyectos borrados:**

1. Abrir la ficha del personaje con permisos de **DJ**.
2. Ir a **Desarrollo → Proyectos de fabricación e investigación**.
3. En **Diagnóstico de materiales**, seleccionar **Recuperar reservas huérfanas**.
4. Revisar la cantidad que muestra el diálogo y confirmar.

La reparación sólo libera reservas que mencionan un Proyecto eliminado.
No borra materiales, no resta VI, no aumenta dinero y no toca reservas
de Proyectos que todavía existen, incluso los activos. Las referencias
que no pueden identificarse con seguridad quedan intactas para revisión manual.
Se puede ejecutar de nuevo sin duplicar recursos.

**Prevención:** no borrar directamente Proyectos activos o con materiales
comprometidos. Primero usar su acción **Liberar / Cancelar Proyecto**.

## Cinco criaturas originales (versión en preparación)

Ciervo Astral, Araña de Campanario, Jabalí Ígneo, Garza de Cristal y Sabueso Espectral disponen de fichas NPC completas y arte propio. Consulta `docs/visual/Bestiario_Original_Cinco_Criaturas_Tanda_1.md` para su ecología, estadísticas, capacidades y aventuras. La versión 1.12.0 queda preparada en GitHub, **no publicada**; la instalación de Foundry no se actualiza hasta autorización explícita para crear release.
