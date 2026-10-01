# CREA-13 — Validación global de siete personajes/arquetipos

**Estado:** 13A–13B COMPLETAS · 13C pendiente  
**Base:** main @ 98cb40556826675827eead6161c2ef97103c9315  
**Dependencia:** CREA-12 integrado; P-011 resuelto.

## Mandato heredado

DER-D44 reserva para CREA-13 la prueba completa de siete personajes/arquetipos. El requisito no enumera siete nombres concretos ni crea clases nuevas.

Tierra Mágica no usa clases. Por tanto, los siete casos de CREA-13 son **fixtures de validación**, no paquetes canónicos ni profesiones obligatorias.

## Matriz provisional de cobertura

El Manual Maestro sí enumera como profesiones posibles a soldado, ingeniera, sanador, exploradora, alquimista y canalizador. El núcleo incluye además el Vínculo Familiar como subsistema mecánico independiente. CREA-13 adopta esas siete funciones como matriz provisional de prueba:

| ID | Fixture | Cobertura principal |
|---|---|---|
| C13-01 | Soldado | combate cuerpo a cuerpo, armadura/escudo, Guardia, Parada, Trauma |
| C13-02 | Ingeniera | Ingeniería, equipo, dispositivos, Rule Elements, cambios derivados |
| C13-03 | Sanador | Medicina, curación, Vida máxima, 0 Vida, descansos y reconciliación |
| C13-04 | Exploradora | armas a distancia, Movimiento cuantificado, cobertura/posición y exploración |
| C13-05 | Alquimista | Alquimia, fórmulas, dosis/Saturación y recuperación acotada |
| C13-06 | Canalizador | Maná, Canalización/Ritualismo, hechizos, Sostenimiento y defensas contextuales |
| C13-07 | Vinculado | Familiar, Acción Vinculada, capacidades de vínculo y ausencia de segundo turno/Maná |

Esta selección es de **cobertura de pruebas**. No declara que estas sean las únicas profesiones ni que cada fixture represente una clase.

## Criterios de validez de cada fixture

Cada personaje de prueba deberá:

1. poder construirse con las reglas actuales de creación sin saltarse presupuestos;
2. usar Atributos/Habilidades/Especializaciones/Técnicas/Hechizos/Rasgos sólo cuando proceda;
3. calcular derivados exclusivamente mediante el pipeline integrado en CREA-12;
4. equipar y desequipar sus elementos relevantes sin residuos;
5. ejecutar al menos una secuencia característica de su función;
6. atravesar daño/recuperación o consumo/restauración de recursos cuando el subsistema lo permita;
7. sobrevivir a guardar/reabrir reconstruyendo los mismos derivados;
8. no requerir campos históricos ni autoridades paralelas;
9. dejar explícitas las reglas que siguen siendo contextuales y de mesa.

## Fases

### 13A — Fixtures y legalidad de creación

**Estado: COMPLETA · Validate #231 — SUCCESS**

Los siete fixtures se construyen desde `coreCatalog()` y cada adquisición registra el recurso realmente pagado. La validación combina `validateCreationState()`, `validateSkillProgression()`, requisitos estructurados y una comprobación adicional de legalidad mágica: cada Hechizo debe poseer su Disciplina y la Habilidad operativa mínima correspondiente.

| ID | Fixture | PD | PR | PEI | Experto | Resultado |
|---|---|---:|---:|---:|---|---|
| C13-01 | Soldado | 21/25 | 0/3 | 1350/2000 c | Armas Marciales | válido |
| C13-02 | Ingeniera | 17/25 | 0/3 | 210/2000 c | Ingeniería | válido |
| C13-03 | Sanador | 19/25 | 0/3 | 60/2000 c | Medicina | válido |
| C13-04 | Exploradora | 21/25 | 0/3 | 1950/2000 c | Armas a Distancia | válido |
| C13-05 | Alquimista | 23/25 | 0/3 | 60/2000 c | Alquimia | válido |
| C13-06 | Canalizador | 23/25 | 0/3 | 60/2000 c | Canalización | válido |
| C13-07 | Vinculado | 17/25 | 3/3 | 250/2000 c | — | válido |

Todos usan exactamente siete Atributos, parten de 1, distribuyen seis aumentos y respetan máximo inicial 3. Ningún fixture tiene más de una Habilidad Experta. Canalizador y Vinculado adquieren Disciplinas sólo después de cumplir Canalización Entrenada y poseen la Disciplina de cada Hechizo adquirido.

**Hallazgo 13A-01 — RESUELTO:** los dispositivos de referencia carecen todavía de precio exacto. El flujo de adquisición trataba esa ausencia como `0 PEI`. Esto contradice la regla canónica que distingue “sin precio establecido” de “gratuito”. CREA-13 no inventa precios: Compra libre de objetos físicos sin `priceStatus:"exact"` queda bloqueada. Los dispositivos podrán probarse en fases funcionales como recursos de escenario/concesiones explícitas hasta que exista precio canónico.

El Manual Maestro vigente fija Disciplina en **2 PD**. La mención de 3 PD del documento histórico Playtest no se usa como autoridad.


### 13B — Derivados y equipamiento

**Estado: COMPLETA · Validate #238 — SUCCESS**

Los siete fixtures fueron preparados con el mismo pipeline de CREA-12: `prepareRuleElements()` + `deriveActorState()` + resolución contextual. El equipamiento relevante se activa explícitamente y se comprueba también el estado posterior a desequiparlo.

| ID | Fixture | Vida | Maná | Grave | Def. | Maniobra | Mental | Corporal | Prot. | Mov. | Inic. |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| C13-01 | Soldado | 16 | 9 | 8 | 15 | 15 | 12 | 14 | 3 | 6 | +1 |
| C13-02 | Ingeniera | 14 | 12 | 7 | 13 | 13 | 13 | 13 | 1 | 6 | +2 |
| C13-03 | Sanador | 14 | 15 | 7 | 12 | 12 | 14 | 13 | 0 | 6 | +2 |
| C13-04 | Exploradora | 14 | 9 | 7 | 14 | 14 | 12 | 13 | 1 | 6 | +3 |
| C13-05 | Alquimista | 14 | 12 | 7 | 13 | 13 | 13 | 13 | 0 | 6 | +2 |
| C13-06 | Canalizador | 14 | 15 | 7 | 12 | 12 | 14 | 13 | 0 | 6 | +2 |
| C13-07 | Vinculado | 14 | 12 | 7 | 13 | 13 | 13 | 13 | 1 | 6 | +3 |

El Soldado configura como rango marcial relevante Armas Marciales Experto, por lo que su Bono Defensivo preparado es +2. El Escudo estándar permanece contextual: Defensa universal 15 y Defensa frontal 16. Desequipar escudo y Malla devuelve exactamente a Defensa 15 y Protección 0, sin contribuciones residuales.

Piel Alterada conserva la arquitectura de CREA-12: no aumenta la Protección universal. Con el hechizo sostenido, Protección sigue en 0 y sólo resuelve a 2 cuando el contexto declara una categoría compatible.

**Hallazgo 13B-01 — RESUELTO:** `strengthMin` de armaduras y la penalización de Movimiento del Escudo pesado existían en el catálogo/manual, pero no alimentaban `derived.movement`. Se corrigió sin crear una segunda autoridad:

- armadura equipada por debajo de FUE mínima aporta `-1 Movimiento` con procedencia de Equipo;
- a 1 punto por debajo se informa Carga Pesada + Desventaja física contextual;
- a 2+ puntos por debajo se informa que no puede usarse competentemente en combate sin capacidad específica;
- Escudo pesado declara estructuradamente `movementPenalty:-1`;
- las incidencias de FUE mínima se muestran en el diagnóstico derivado;
- desequipar el objeto elimina de inmediato la penalización y la incidencia.

Las partes no cuantificadas por el Manual —qué acciones físicas concretas sufren Desventaja en cada ficción— permanecen contextuales; 13B no inventa selectores ni penalizadores universales adicionales.


### 13C — Secuencias funcionales por arquetipo
Ejecutar el flujo característico de cada fixture y buscar interacciones rotas entre subsistemas.

### 13D — Daño, recuperación y economía
Cruzar 0 Vida/Trauma, descansos, curación, Maná, Saturación, Acción/Movimiento/Reacción y recursos de Familiar.

### 13E — Persistencia y reversibilidad
Guardar/reabrir, activar/desactivar, equipar/desequipar y volver a preparar sin drift.

### 13F — Auditoría global y cierre
Comparar los siete resultados, registrar hallazgos, corregir defectos reproducibles y cerrar CREA-13 sólo con CI verde.

## Regla de cierre

CREA-13 no se cerrará porque siete fixtures “carguen”. Deben completar sus secuencias principales y demostrar que las reglas compartidas producen resultados consistentes entre perfiles distintos.

Los huecos que dependan de decisiones todavía no parametrizadas se registrarán como limitación contextual; no se rellenarán inventando reglas.
