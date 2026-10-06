# Fuentes del proyecto — política de fuente única

Fecha de consolidación: 2026-10-03.

## Fuente activa única

La única fuente activa para **reglas, creación de personaje, canon narrativo, desarrollo editorial y preparación futura del libro** es:

`docs/Tierra_Magica_Manual_Maestro.md`

Toda regla o decisión nueva debe incorporarse primero allí. Foundry VTT, referencias rápidas, auditorías, documentos antiguos y material de diseño son derivados, historial o herramientas de verificación; no crean canon por sí mismos.

## Material histórico y de respaldo

Los Manuales v0.1/v0.2, el Manual Básico mecánico 1.0 separado, los Canon del Mundo v1.1/v1.2 separados y las auditorías se conservan únicamente para trazabilidad, recuperación y comprobación de procedencia. Su contenido útil vigente fue integrado en el Manual Maestro Único. Si un documento histórico contradice el Manual Maestro, prevalece el Manual Maestro.

Git/GitHub conserva el historial de cada modificación. No se debe eliminar una fuente histórica externa por considerarla obsoleta hasta confirmar que el contenido útil fue integrado o archivado dentro del Manual Maestro.\n\nLos documentos de proceso, auditorías históricas, cierres de fase y reportes de release se conservan bajo `docs/archive/`. Esa carpeta existe para trazabilidad y no constituye una fuente paralela de reglas.

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

## Estado de publicación 1.3.1\n\nFoundry T.M. **v1.3.1 está publicada** desde el commit `552ee9879229015eaccd68641c953c4a0c5bc06d`. Es la release pública **Latest** y corrige Compendios, creación guiada y aplicación visible de paquetes raciales. El manifiesto estable de instalación apunta a esta release.

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
