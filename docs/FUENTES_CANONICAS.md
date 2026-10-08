# Fuentes del proyecto — política de fuente única

Fecha de consolidación: 2026-10-06.

## Fuente activa única

La única fuente activa para **reglas, creación de personaje, canon narrativo, desarrollo editorial y preparación futura del libro** es:

`docs/Tierra_Magica_Manual_Maestro.md`

Toda regla o decisión nueva debe incorporarse primero allí. Foundry VTT, referencias rápidas, auditorías, documentos antiguos y material de diseño son derivados, historial o herramientas de verificación; no crean canon por sí mismos.

## Material histórico y de respaldo

Los Manuales v0.1/v0.2, el Manual Básico mecánico 1.0 separado, los Canon del Mundo v1.1/v1.2 separados, el antiguo Archivo Narrativo Recuperado y las auditorías se conservan únicamente para trazabilidad, recuperación y comprobación de procedencia. Su contenido útil vigente debe promoverse expresamente al Manual Maestro Único antes de considerarse canon. Si un documento histórico contradice el Manual Maestro, prevalece el Manual Maestro.

Git/GitHub conserva el historial de cada modificación. No se debe eliminar una fuente histórica externa por considerarla obsoleta hasta confirmar que el contenido útil fue integrado o archivado dentro del Manual Maestro.

Los documentos de proceso, auditorías históricas, cierres de fase, reportes de release, snapshots externos y material narrativo sustituido se conservan bajo `docs/archive/`. Esa carpeta es almacenamiento frío de trazabilidad: **no debe consultarse de forma habitual, no crea canon y no constituye una fuente paralela de reglas o ambientación**.

## Estado de pueblos y paquetes raciales

Desde el **2026-10-03**, los **12 paquetes raciales jugables v0.3** están integrados directamente en `docs/Tierra_Magica_Manual_Maestro.md`, dentro de **3. Creación de personaje > Paso 1**.

La lista jugable base vigente es: Humanos, Enanos, Élficos, Orcos, Goblinoides, Terios/Anihombres, Feéricos, Ankar, Cristálidos, Verdantes, Micelios y Coralios. Sus reglas mecánicas, variantes jugables y salvaguardas transversales existen únicamente en el Manual Maestro. No debe crearse un documento racial paralelo como nueva fuente de autoridad.

La antigua resolución A5 que descartaba paquetes raciales queda archivada y sustituida. `docs/archive/audits/A5_PUEBLOS_ORIGENES.md` es ahora sólo un marcador histórico que remite al Manual Maestro.

Los paquetes raciales se equilibran aparte de los **25 PD** y los **3 PR** generales; cultura, Origen, profesión, religión, personalidad y moral siguen siendo capas separadas y no otorgan competencias gratuitas por sí mismas.

## Estado de CREA-09

CREA-09 — Moneda está consolidada en el Manual Maestro y su implementación Foundry 1.0.15: c/p/o, PEI 20 o, Reserva 2 o, precios en cobres enteros, Unidad Comercial y migración segura del campo legado `crowns`.

## Estado de CREA-10

CREA-10 — Lista definitiva de Habilidades está **CERRADA** e integrada en Foundry **1.0.16**: **26 Habilidades**, ocho categorías, rangos +0/+1/+2/+4/+6/+8, costes 0/1/3/7/13/21 PD, requisitos por rango base, Especializaciones a 1 PD y Método Directo/Ritual vinculado a Canalización/Ritualismo.

## Estado de CREA-11

CREA-11 — Modelo de datos de creación está **CERRADA v1.0** e integrada en Foundry **1.0.17**. El modelo separa Actor base, Items adquiribles, requisitos tipados, Rule Elements declarativos, adquisición/procedencia, Effects y Compendios. La migración conserva información histórica ambigua como legado y no reconstruye compras por inferencia.

Sus decisiones DAT-D01 a DAT-D666 son CANÓNICAS. La reserva histórica de valores derivados para CREA-12 quedó satisfecha posteriormente por su integración en `main`.

## REV-CREA-11-001 — Sincronización post-cierre

CREA-11 permanece **CERRADA v1.0**. **REV-CREA-11-001 está CERRADA E INTEGRADA** en Foundry **1.0.18** mediante PR #22 (`52317ae7105a63ced869b152486ada0b7597fca1`). La revisión corrige divergencias sin reabrir el diseño: Atributos iniciales (6 aumentos, máximo 3), máximo inicial de 3 Disciplinas, una única tirada para magia de área y sincronización documental de decisiones ya ratificadas de CREA-10/11.

La reserva histórica de Protección derivada, FUE mínima/equipo y Movimiento cuantificado fue absorbida por CREA-12. Las reglas que continúan deliberadamente contextuales no se consideran pendientes sólo por no estar automatizadas.

## Estado de CREA-12

CREA-12 — Valores derivados y sincronización está **CERRADA E INTEGRADA** mediante PR #24, cuyo squash en `main` es `98cb40556826675827eead6161c2ef97103c9315`. Consolidó una autoridad común para Vida, Maná, Defensa, Protección, Movimiento e Iniciativa; Movimiento cuantificado; contexto defensivo; equipo/FUE mínima; reconciliación de recursos y diagnóstico de procedencia.

## Estado de CREA-13

CREA-13 — Validación global de siete personajes/arquetipos está **CERRADA E INTEGRADA** mediante PR #25, cuyo squash en `main` es `59883673c3b9d215b7b108f7078e9bbff1f5505f`.

La validación cubre Soldado, Ingeniera, Sanador, Exploradora, Alquimista, Canalizador y Vinculado. El cierre incluye schema v3 para dispositivos, fuente energética explícita, compra física centralizada, identidad alquímica estable por `slug` y autoridad compartida para consumo de Energía y defensa cinética. La limitación 13C-L01 queda resuelta.

## Estado de CREA-14

CREA-14 — Autosuficiencia de creación de nivel 1 está **CERRADA**. Consolidó identidad estructurada, Facetas e idiomas, Rasgos iniciales, Perfiles Iniciales de Familiar, Compra libre con PEI, Bono Defensivo derivado y el ejemplo completo de Iria. Su cierre formal está en `docs/archive/creacion/CREA-14_CIERRE_AUTOSUFICIENCIA_CREACION.md`.

CREA-14 no sustituyó las reglas de progresión del Manual; cerró exclusivamente la entrada al juego y su representación en Foundry.

## Estado de CREA-15

CREA-15 — Autosuficiencia de progresión está **CERRADA** sobre las reglas ya presentes en el Manual Maestro. Foundry controla el avance de nivel 2–20, el presupuesto global de PD, las mejoras post-creación de Atributos, la preservación de progresión durante reconstrucción y el cierre definitivo del PEI.

Su cierre formal está en `docs/archive/creacion/CREA-15_CIERRE_AUTOSUFICIENCIA_PROGRESION.md`. CREA-15 no crea costes ni puertas nuevas: implementa y protege los ya definidos por la fuente canónica.

Una fase posterior sólo debe declararse mediante una decisión explícita de proyecto y, si introduce reglas, incorporarse primero al Manual Maestro.

## Estado del Grimorio 60

La ampliación del grimorio está **CERRADA Y CANONIZADA**. El Manual Maestro define 60 hechizos: 10 Evocación, 10 Alteración, 9 Restauración, 11 Percepción, 10 Influencia y 10 Conjuración. El cierre espacial fija Trasposición como intercambio táctico, Umbral como paso local a través de barrera y Salto Vinculado como transporte de grupo. Las auditorías previas conservan trazabilidad, pero no sustituyen estas definiciones.

Foundry adopta schema v5 para contratos de objetivos mágicos y migración del cierre espacial.

## Estado de publicación 1.6.1

El hotfix objetivo **v1.6.1** corrige exclusivamente las claves y recuperación segura de reservas de Lotes CRAFT-13 para proyectos ya iniciados. No altera tiempos, costes ni el Manual Maestro. Se registrará la publicación oficial al completar la release.

## Estado de publicación 1.6.0

Foundry T.M. **v1.6.0 está publicada** desde el commit `078c1e5f77dc7df3ab68a6ef3ea68fb4b8062dfa`, con 21 recetas ordinarias CRAFT-03 para objetos canónicos EQP-01. Los costes, requisitos y tiempos provienen del Manual Maestro; no se crean nuevas reglas ni precios.

## Estado de publicación 1.5.2

La versión **v1.5.2 está publicada** como release estable desde el commit `c264143991479a627364e71aacbde5de6998f1c3` e introduce control de turno manual en Foundry. La ejecución de ataques, magia, técnicas, dispositivos y familiares es independiente del indicador de Acción o Reacción. Los costes mecánicos y las reglas canónicas continúan vigentes; el DJ y los jugadores verifican el límite de actuaciones por turno.

## Estado de publicación 1.5.1

Foundry T.M. **v1.5.1 está publicada** desde el commit `558372be4adf6abddd9cd5985cfb065e406127c3`. Es la release pública **Latest** y corrige reservas de Acción/Reacción ante validaciones fallidas, además de añadir recuperación segura de reservas huérfanas dentro de la sesión. **No modifica reglas, costes, canon ni presupuestos**; corrige exclusivamente la interpretación y persistencia del estado runtime.

## Estado de publicación 1.3.2

Foundry T.M. **v1.3.2 está publicada** desde el commit `4d0c9e8c423e696f2b8f5835a262c50dee0b0bc4`. Es la release pública **Latest** e integra el asistente secuencial obligatorio en Desarrollo, el bloqueo de pestañas durante la creación inicial y la cabecera compacta una vez completado el personaje. No modifica el canon ni los presupuestos de creación. El manifiesto estable de instalación apunta a esta release.

## Estado de catálogos maestros para 1.3.0

CAT-01…11, ARM-01, ESC-01 y EQP-01 están integrados en `main` mediante PR #53. El runtime incorpora 200 armas, 94 armaduras, 54 escudos y 25 equipos canónicos. Las propuestas pendientes continúan explícitamente fuera del runtime hasta recibir Perfil mecánico completo; los nombres no crean Materiales Especiales, Device, Energía ni propiedades por inferencia.

## Estado de publicación 1.2.0

Foundry T.M. **v1.2.0 fue publicada** desde el commit `9bcd67977851b9520127d990658e322a2862b518`. Fue la release estable anterior a v1.3.0 y consolida CREA-14/15, CRAFT-01 a CRAFT-13, el catálogo de 41 referencias, la autoridad multiusuario y la auditoría integral final de fabricación. El manifiesto estable de instalación apunta a esta release.

## Estado de publicación 1.1.0

Foundry T.M. **v1.1.0 fue publicada** desde el commit `0fc8ffab5c0376533ebb20433d7ff1948d919b08`. Es una release histórica que contiene el Grimorio 60 y schema v5. El manifiesto estable de instalación apunta a la última release publicada.

## Implementación

`scripts/*`, `template.json`, datos, UI y pruebas implementan y verifican el Manual Maestro. Si la implementación contradice el Manual, se abre una incidencia y se corrige la discrepancia; el código no modifica la regla por sí mismo.

## Fuentes visuales

La guía visual, portada de referencia e ilustraciones siguen siendo activos visuales separados porque no son texto del manual. Orientan la futura maquetación y arte, pero no sustituyen la fuente textual única.

### Registro técnico de símbolos

`docs/visual/SIMBOLOS_CANONICOS.md` es un **anexo técnico controlado** autorizado por el Manual Maestro para almacenar especificaciones geométricas, cromáticas y de reproducción que serían imprácticas de duplicar dentro del cuerpo principal.

No es una segunda fuente narrativa: no puede crear entidades, dominios, religiones, ciudades ni decisiones de mundo. Una ficha de símbolo sólo se vuelve CANON después de aprobación explícita y referencia correspondiente en el Manual Maestro. Ante contradicción, prevalece el Manual Maestro y la ficha se considera inconsistente hasta su corrección.

Los SVG/PNG bajo `assets/symbols/` serán implementaciones del registro y no autoridades independientes.


## Depuración narrativa del 2026-10-06

Los capítulos canónicos de **Eïra, Khorun, Varkor, Aster, Ilyr, Nereth y Vaelun** fueron depurados e integrados directamente en la Parte I del Manual Maestro.

El antiguo bloque interno **«PARTE III — ARCHIVO NARRATIVO RECUPERADO DEL MANUAL LARGO v0.2»** fue retirado del circuito editorial activo y congelado íntegramente en:

\`docs/archive/historico/ARCHIVO_NARRATIVO_RECUPERADO_MANUAL_v0.2_2026-10-06.md\`

Sus antiguos rótulos «ESTADO CANÓNICO v0.1/v0.2» son históricos y no recuperan autoridad por estar archivados. Un detalle de ese archivo sólo vuelve al canon cuando se incorpora expresamente al Manual Maestro mediante una decisión posterior.

Las fuentes externas de trabajo usadas para recuperar estilo, geografía, cartografía y principios de diseño quedan registradas en \`docs/archive/fuentes_externas/REGISTRO_FUENTES_EXTERNAS_2026-10-06.md\`. Son material de respaldo y no una segunda autoridad textual.
