# PROG-01C — Rutas nominales de desarrollo y puertas 1–20

**Fecha:** 2026-10-13. **Estado:** revisión técnica no canónica. **Alcance:** presupuestos, compras por nombre y puertas explícitas; **NO** es todavía una prueba de rendimiento ni un test de integración en Foundry.

## Fuentes verificadas

- `docs/Tierra_Magica_Manual_Maestro.md` capítulos 3, 4, 12 y 13.
- `scripts/rules/creation.mjs`: `pdTotalForLevel`, `deriveDevelopmentBudget` y `canAffordDevelopmentPd`.
- `test/crea-15-progression.test.mjs` y `test/manual-character-progression.test.mjs`.

Coste acumulado de habilidad: Aprendiz 1, Entrenado 3, Experto 7, Maestro 13 y Gran Maestro 21 PD; incrementos 1/2/4/6/8 PD. Nivel inicial: como máximo una Habilidad Experta; Maestro disponible desde nivel 9 y Gran Maestro desde 15. Disciplina 2 PD (requiere Canalización Entrenada); hechizos Menor 1, Básico 2, Avanzado 3, Maestro 5 y Legendario 8+ PD, sujetos a competencia. Técnicas Básicas 2, Avanzadas 3 y Maestras 5 PD, con requisitos propios.

**Regla de lectura:** cada fila de la tabla es la *compra nueva durante el intervalo*, no el inventario completo. Los PD no gastados se conservan. Las cuatro rutas son ejemplos de análisis, no arquetipos obligatorios, ni sustituyen la decisión de Ascendencia, Origen, Trasfondo, seis aumentos de Atributo, 3 PR y equipo de creación.

## A. Marcial defensivo

| Nivel | Compras nominales del tramo | Gasto nuevo | Gasto acumulado | PD total | Saldo |
|---|---|---:|---:|---:|---:|
| 1 | Armas Marciales Experto (7); Atletismo, Acrobacia, Supervivencia y Sigilo Entrenado (4×3=12); Parada, Golpe Potente y Recibir Carga (3×2=6) | 25 | 25 | 25 | 0 |
| 5 | Armas Pesadas Entrenado (3); Armas a Distancia Entrenado (3); Intercepción (2); Barrido (3); Contraataque (3); Especialización de Armas Marciales (1); Manejo Aprendiz (1) | 16 | 41 | 41 | 0 |
| 10 | Armas Marciales Experto→Maestro (6); Atletismo Entrenado→Experto (4); Supervivencia Entrenado→Experto (4); Estocada Perforante (3); Manejo Aprendiz→Entrenado (2) | 19 | 60 | 61 | 1 |
| 15 | Armas Marciales Maestro→Gran Maestro (8); Acrobacia Entrenado→Experto (4); Sigilo Entrenado→Experto (4); Manejo Entrenado→Experto (4) | 20 | 80 | 81 | 1 |
| 20 | Atletismo Experto→Maestro (6); Supervivencia Experto→Maestro (6); Armas a Distancia Entrenado→Experto (4); Armas Pesadas Entrenado→Experto (4) | 20 | 100 | 101 | 1 |

**Requisitos específicos:** Recibir Carga exige un arma con Alcance y sólo funciona si existe el equipo físico correspondiente. Contraataque exige Parada, adquirida anteriormente. Gran Maestro requiere la Especialización marcial previa.

## B. Canalizador de Evocación

| Nivel | Compras nuevas | Gasto nuevo | Acumulado | Tope | Saldo |
|---|---|---:|---:|---:|---:|
| 1 | Canalización Experto (7); Arcana, Investigación, Naturaleza Entrenado (9); Evocación (2); Proyectil Ígneo (2), Luz Arcana (1), Barrera Cinética (2); una Especialización de Investigación (1); Supervivencia Aprendiz (1) | 25 | 25 | 25 | 0 |
| 5 | Arco Fulminante (3), Aguja Gélida (3), Martillo Cinético (3), Onda de Choque (2), Supervivencia Aprendiz→Entrenado (2) | 13 | 38 | 41 | 3 |
| 10 | Compra Canalización Experto→Maestro (6), Pantalla Cinética (5), Rayo de Ruptura (5), Contramagia (3) | 19 | 57 | 61 | 4 |
| 15 | Canalización Maestro→Gran Maestro (8); Tormenta Arcana (8 PD como mínimo, comprobar valor del perfil legendario); Naturaleza Entrenado→Experto (4) | 20 | 77 | 81 | 4 |
| 20 | Doble Sostenimiento (5); Arcana Entrenado→Experto (4); Investigación Entrenado→Experto (4); Naturaleza Experto→Maestro (6) | 19 | 96 | 101 | 5 |

**Advertencias:** la compra de un hechizo de grado Avanzado exige Canalización Experto (se cumple desde nivel 1); Maestro exige Canalización Maestro (desde el nivel 10), Legendario Gran Maestro (desde el nivel 15). **La Técnica Doble Sostenimiento se adquiere a nivel 20**, evitando su compra temprana sin validar otras capacidades. La disponibilidad del grado Legendario y coste exacto de Tormenta Arcana deben contrastarse con los Items y su configuración de adquisición; la fila es preliminar.

## C. Híbrido marcial-mágico

| Nivel | Compras nuevas | Gasto nuevo | Acumulado | Tope | Saldo |
|---|---|---:|---:|---:|---:|
| 1 | Armas Marciales Experto (7); Canalización, Atletismo y Supervivencia Entrenado (9); Evocación (2); Proyectil Ígneo (2); Parada (2); Golpe Potente (2); Sigilo Aprendiz (1) | 25 | 25 | 25 | 0 |
| 5 | Canalización Entrenado→Experto (4); Barrera Cinética (2); Luz Arcana (1); Acrobacia Entrenado (3); Estocada Perforante (3); Sigilo Aprendiz→Entrenado (2) | 15 | 40 | 41 | 1 |
| 10 | Armas Marciales Experto→Maestro (6); Arco Fulminante (3); Aguja Gélida (3); Atletismo Entrenado→Experto (4); Especialización Armas Marciales (1); Onda de Choque (2) | 19 | 59 | 61 | 2 |
| 15 | Armas Marciales Maestro→Gran Maestro (8); Canalización Experto→Maestro (6); Pantalla Cinética (5) | 19 | 78 | 81 | 3 |
| 20 | Barrido (3); Contraataque (3); Supervivencia Entrenado→Experto (4); Acrobacia Entrenado→Experto (4); Naturaleza Entrenado (3) | 17 | 95 | 101 | 6 |

**Advertencias:** la compra de Pantalla Cinética presupone Evocación y Canalización Maestro, que ya se satisfacen. Contraataque exige Parada. La especialización marcial precede al rango Gran Maestro.

## D. Especialista de investigación, medicina y exploración

| Nivel | Compras nuevas | Gasto nuevo | Acumulado | Tope | Saldo |
|---|---|---:|---:|---:|---:|
| 1 | Investigación Experto (7); Medicina, Historia, Naturaleza, Persuasión, Supervivencia y Arcana Entrenado (6×3=18) | 25 | 25 | 25 | 0 |
| 5 | Medicina Entrenado→Experto (4); Supervivencia Entrenado→Experto (4); Investigación: Especialización coherente (1); Percepción no es Habilidad independiente: comprar **Empatía Entrenado (3)**; Historia Entrenado→Experto (4) | 16 | 41 | 41 | 0 |
| 10 | Investigación Experto→Maestro (6); Arcana Entrenado→Experto (4); Naturaleza Entrenado→Experto (4); Persuasión Entrenado→Experto (4) | 18 | 59 | 61 | 2 |
| 15 | Investigación Maestro→Gran Maestro (8); Medicina Experto→Maestro (6); Supervivencia Experto→Maestro (6) | 20 | 79 | 81 | 2 |
| 20 | Historia Experto→Maestro (6); Arcana Experto→Maestro (6); Naturaleza Experto→Maestro (6) | 18 | 97 | 101 | 4 |

## Estado de validación y límites

- **Comprobación aritmética:** los topes son 25/41/61/81/101. Las cuatro rutas nominales respetan los topes aritméticos de PD en los cinco puntos de control; aún falta validar cada requisito de Item y su adquisición real.
- **Comprobación de fuente:** los nombres y costes proceden del capítulo 4, el grimorio del capítulo 12 y las técnicas del capítulo 13. La Especialización cuesta 1 PD y requiere habilidad madre Entrenada.
- **NO comprobado:** ejecución en Foundry VTT con actores/Items reales, adquisición de cada Item del compendio, progreso del familiar, requisitos tipados de los documentos, equipamiento físico, tiradas y daño. «Ruta nominal» no significa «personaje jugable verificado».
- **Cuestiones para PROG-01D:** ¿qué combinación de compras es competitiva?, ¿las rutas mágicas disponen de amplitud útil?, ¿cuántas opciones de Rasgos resultan realmente accesibles después de crear?, ¿debe el DJ autorizar explícitamente ascensos? Ninguna respuesta se ha canonizado.

**Próximo paso técnico correcto:** convertir estos planes en fixtures importables y pruebas de adquisiciones contra Items reales; registrar rechazos reproducibles antes de tocar las reglas.
