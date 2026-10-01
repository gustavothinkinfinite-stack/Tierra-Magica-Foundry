# CREA-13 — Validación global de siete personajes/arquetipos

**Estado:** INICIADA · Fase 1 en curso  
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
Construir los siete personajes como datos reproducibles y verificar PD, PR, PEI, límites de Atributos, Habilidades, Disciplinas y requisitos.

### 13B — Derivados y equipamiento
Validar Vida, Maná, Defensas, Protección, Movimiento, Iniciativa, umbral Grave y procedencia de contribuciones.

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
