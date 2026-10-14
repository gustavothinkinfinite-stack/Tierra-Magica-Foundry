# PROG-01M — Control pareado de equipamiento y escenarios cooperativos

**Estado: ensayo de diseño no canónico.** Fuente: `test/prog-01m-paired-cooperation.test.mjs`. No modifica las reglas, el Manual Maestro ni los costes de PD.

## Aislamiento marcial contra híbrido

Ambos emplean la misma **Lanza + Malla**, legal con FUE 3 y coste 1.050 cobres dentro del PEI inicial. En niveles 5, 10, 15 y 20 ambos conservan idénticos FUE, AGI, VIG, rango de Armas Marciales y Parada. Se enfrentan a un adversario moderado, con diez semillas compartidas por nivel. La prueba exige igualdad exacta de Vida final, daño, Maná, victoria y supervivencia cuando usan la ruta de arma. Así se elimina la falsa ventaja de Protección que daba el fixture anterior al marcial.

La ruta alternativa del híbrido sustituye la Acción de lanza por **Proyectil Ígneo** cuando dispone de Maná. La comparación mide daño y coste de oportunidad sobre semillas idénticas, no presume que usar hechizos sea siempre óptimo. El programa imprime `PROG01M_PAIRED` con agregados por nivel.

## Objetivos de apoyo del especialista

Se comparan tres retos de escenario con DF 17: investigación, medicina y persuasión. Las tiradas usan 2d10 + Atributo de control + bono de rango adquirido. Es una prueba **pareada de aptitud frente a un personaje sin entrenamiento**, no una nueva regla de sanación, negociación ni acción de combate. No se concede Vida, daño extra, estados ni modificadores gratuitos al equipo. El resultado mide objetivos cumplidos, no daño.

Los controles mantienen los rangos adquiridos del especialista a cada nivel y diez semillas compartidas. Se espera más objetivos resueltos que por personajes sin entrenamiento. El programa imprime `PROG01M_COOP` con el total de éxitos sobre 120 desafíos.

## Límites y siguiente integración

- La cooperación aún es **una secuencia de desafíos adjunta**, no un combate simultáneo con cuatro miembros de equipo, economías de Acción separadas o contribuciones de objetivos que modifiquen el estado del encuentro.
- Medicina e investigación utilizan INT 3 y Persuasión PRE 3 como atributos declarados de control; la comparación usa un control sin entrenamiento con atributo 1. No pretende definir una DF universal ni determinar combinaciones obligatorias para todas las mesas.
- Faltan iniciativa rodada, terreno 2D, decisiones adaptativas, recursos compartidos, aliados alcanzados por áreas y contrapartidas de magia compleja.

**Criterio de conclusión:** igualdad física de ambos perfiles con recursos y equipo idénticos demuestra sólo que el diferencial marcial anterior era experimental. La superioridad del especialista en objetivos no ofensivos demuestra valor de ese eje de habilidades, no equivalencia integral de poder.
