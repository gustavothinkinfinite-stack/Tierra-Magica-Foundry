# Grimorio 60 — Auditoría fase 3: combinaciones y probabilidades

**Estado:** EN DESARROLLO · no canoniza los 42 hechizos nuevos.  
**Base de trabajo:** núcleo 1.0.18 y Manual Maestro.  
**Objetivo:** auditar el grimorio ampliado como sistema completo, no como hechizos aislados.

## Alcance

Esta fase cruza magia con:

- Atributos y Habilidades;
- Técnicas y economía de Acción/Reacción;
- armas, Protección y Penetración;
- escudos, Guardia, cobertura y defensas reactivas;
- Vida, 0 Vida, Trauma y recuperación;
- Sostenimiento y Doble Sostenimiento;
- Alquimia y dispositivos;
- Familiares y Origen Remoto;
- teletransporte, invocaciones y efectos persistentes.

Las probabilidades de 2d10 se calculan por **enumeración exacta de los 100 resultados posibles**. Ventaja/Desventaja se calculan sobre los **1.000 resultados posibles de 3d10**, conservando respectivamente los dos dados mayores o menores. Monte Carlo queda reservado para secuencias largas o estados combinatorios donde la enumeración exhaustiva resulte menos práctica.

## Correcciones canónicas detectadas

### A3-01 — Origen Remoto no amplifica tránsito espacial

**Problema.** Usar la posición de un Familiar como origen de Paso Breve u otro efecto espacial podía transformar un alcance corto en desplazamiento arbitrariamente largo.

**Regla.** Origen Remoto cambia el punto geométrico de emisión, pero no convierte al Familiar en destino gratuito ni mueve al lanzador hasta él. Los hechizos que trasladan al propio lanzador, lo usan como extremo de una conexión o abren una conexión espacial son incompatibles salvo autorización expresa.

**Aplicación actual:** Paso Breve, Trasposición, Umbral y Portal declaran `remoteOriginCompatible:false`.

### A3-02 — Llamada Menor ocupa Sostenimiento

**Problema.** La versión 1.0 no declaraba Sostenimiento estructurado. Lanzamientos repetidos podían acumular entidades presentes aun cuando cada una conservara autonomía.

**Regla.** Llamada Menor es Sostenida mientras la entidad convocada permanezca como invocación demandante. El límite normal 1/2 impide acumulación por repetición.

### A3-03 — Migración de datos

El schema sube a **v4** para que partidas existentes reciban:

- `remoteOriginCompatible:false` en Paso Breve, Trasposición, Umbral y Portal;
- `sustained:true` y duración Sostenida en Llamada Menor;
- `remoteOriginCompatible:true` por defecto en otros hechizos.

Los cuatro bloqueos espaciales se imponen por identidad canónica durante la migración y no preservan un valor v3 accidental que reabra el exploit.

## Decisiones de diseño para las 42 propuestas

Estas decisiones están registradas en `test/fixtures/grimorio-60-audit.mjs` y siguen siendo **no canónicas** hasta terminar la auditoría.

### Ilusiones

La potencia persistente no guardará una tirada de lanzamiento. Eso permite “pescar” una tirada alta fuera de presión.

Propuesta auditada:

**DF de Ilusión = 11 + Atributo pertinente + bono de Canalización.**

Examinar una ilusión utiliza una prueba apropiada contra esa DF sólo cuando existe motivo para sospechar o una capacidad lo habilita. Revelación Sensorial concede Ventaja para ese examen. Contradicciones físicas directas pueden revelar la falsedad sin repetir intentos idénticos.

Invisibilidad sigue sin equivaler a indetectabilidad.

### Influencia

La progresión ofensiva de Canalización supera con claridad la progresión de Defensa Mental. Por ello la ampliación mantiene fuera del catálogo:

- Dominación total;
- pérdida repetida de Acción;
- órdenes suicidas;
- reescritura arbitraria de personalidad;
- bloqueo automático de combate.

Valor Inspirado se expresa como **+2 Defensa Mental** contra miedo compatible, no como una segunda tirada de resistencia.

Interdicción y Aura de Autoridad usan Desventaja en acciones hostiles compatibles; no cancelan la Acción.

### Efectos periódicos

Matriz Vital:

- 2 Vida por pulso;
- 3 pulsos;
- máximo 6 Vida;
- no pulsa inmediatamente al lanzar;
- reaplicar no concede pulso extra;
- termina si el objetivo llega a 0 Vida;
- no levanta automáticamente desde 0.

### Invocaciones

Toda invocación demandante que permanezca activa debe declarar duración y Sostenimiento o una limitación equivalente. Llamada Mayor se mantiene como propuesta Sostenida y no concede obediencia automática.

### Alteración y equipo

Miembro Efímero no concede:

- Acción adicional;
- ataque adicional;
- beneficio mecánico simultáneo de un escudo adicional.

Morfología Flexible no permite escape automático de Presas.

Morfología Alada se audita con duración máxima de una Escena además de Sostenimiento para no sustituir el valor persistente de Vuelo Natural.

## Resultados probabilísticos de referencia

Con un especialista de nivel 1 de bonificador total **+7**:

- contra Defensa 14: **85%** de éxito;
- contra DF 18: **55%**;
- contra DF 18 con Ventaja: **78,5%**.

Benchmark contra Soldado de referencia (Defensa 14, Protección 3):

| Opción | Daño esperado por Acción |
|---|---:|
| Espada larga, atacante +7/FUE 3 | 4,25 |
| Rifle temprano, atacante +7 | 5,95 |
| Proyectil Ígneo, canalizador +7 | 2,55 |

Esto confirma que el hechizo ofensivo básico no desplaza el daño individual especializado de armas; compra versatilidad mágica, no superioridad gratuita de daño.

### Área/multiobjetivo

Contra Bandido + Guardia + Soldado:

- Onda de Choque: daño esperado total 5,25 / 4 Maná = **1,3125 por Maná**.
- Arco Fulminante propuesto: daño esperado total 7,85 / 6 Maná = **1,3083 por Maná**.

La eficiencia es prácticamente idéntica; Arco paga por selección de objetivos y mayor techo total.

### Riesgo de Defensa Mental

Progresión auditada de un especialista ofensivo frente a una Defensa Mental alta del mismo tramo:

| Ataque | Defensa Mental | Éxito | Con +2 Defensa Mental |
|---:|---:|---:|---:|
| +7 | 14 | 85% | 72% |
| +10 | 15 | 94% | 85% |
| +13 | 16 | 99% | 94% |

**Conclusión:** con la fórmula actual no debe existir hard control ordinario basado sólo en una tirada contra Defensa Mental. El riesgo queda abierto para revisión posterior de progresión, pero no obliga todavía a cambiar la fórmula del núcleo.

## Suite automática

Se añade:

- `test/fixtures/grimorio-60-audit.mjs`: snapshot no canónico de las 42 propuestas.
- `test/grimorio-60-balance-audit.test.mjs`: enumeración exacta y guardrails.
- `npm run audit:grimorio`: ejecución aislada de esta auditoría.

La suite comprueba al menos:

- probabilidades exactas normal/Ventaja/Desventaja;
- benchmark armas vs magia;
- eficiencia Onda/Arco;
- curación neta frente a Cierre Restaurador;
- ausencia de hard control en Influencia;
- riesgo de escalado mental;
- DF estática de Ilusiones;
- incompatibilidad Origen Remoto + tránsito;
- Sostenimiento de invocaciones;
- ausencia de acciones/ataques/escudos gratuitos por Alteración.

## Pendientes de fase 3

1. Ejecutar la validación completa de CI sobre la rama.
2. Añadir fuzzing/secuencias largas de estados legales: Acción/Reacción, Maná, Vida, Sostenimiento y recursos.
3. Auditar apilamiento defensivo con Guardia, escudos, cobertura, Barrera/Pantalla/Duplicado.
4. Precisar Trasposición y Umbral antes de aprobar Salto Vinculado.
5. Auditar Llamada Mayor contra Familiares, Acción Vinculada y entidades múltiples.
6. Sólo después convertir las 42 propuestas en contenido canónico del Manual Maestro y Foundry.
