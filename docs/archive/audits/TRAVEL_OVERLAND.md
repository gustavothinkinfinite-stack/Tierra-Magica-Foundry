# Auditoría — viaje y desplazamiento de larga distancia

**Fecha:** 2026-10-02  
**Estado:** cierre propuesto para integración canónica.

## Objetivo

Cerrar una regla reproducible para viajes a pie, caballo y carreta, incluyendo caminos, campo traviesa, terreno, clima, navegación, marcha forzada, forraje, campamento y consecuencias de abandonar rutas.

## Distancias base

Jornada estándar: 8 horas de desplazamiento efectivo.

- a pie: 24 km/día;
- caballo con un jinete: 40 km/día;
- carreta/carro tirado: 24 km/día.

Las distancias son sostenidas, no velocidades máximas.

## Terreno

- camino mantenido ×1;
- sendero/abierto ×0,75;
- difícil ×0,50;
- severo ×0,25.

Carreta en terreno severo: normalmente impracticable.

## Ritmo

- Cauteloso 75%, Ventaja en Viaje;
- Normal 100%;
- Rápido 125%, Desventaja en Viaje y riesgo de Fatiga.

La marcha forzada añade bloques de 2 horas, cada uno equivalente a 25% de la jornada normal, con DF 14 y 16 para los dos bloques ordinarios admitidos.

## Viaje fuera de caminos

Una sola prueba diaria de PER + Supervivencia cuando exista incertidumbre:

- sendero/abierto DF12;
- difícil DF14;
- severo DF17;
- excepcional/mágico 18+.

Un fallo produce una consecuencia contextual, no combate automático. Posibles consecuencias: perder progreso, desviarse, gastar suministros, Fatiga o quedar expuesto a un peligro real.

## Suministros

Forraje: 2 horas, PER + Supervivencia.

- abundante DF10;
- ordinario DF13;
- escaso DF16;
- hostil DF19.

Ajustado/Claro/Dominante: 1/2/4 raciones.

Las raciones forrajeadas son sustento de expedición, no mercancía automática. Provisiones humanas no alimentan automáticamente monturas.

## Principios

- el Movimiento de combate no se extrapola linealmente a kilómetros;
- seguir un camino es más rápido y más fácil de navegar, pero no necesariamente seguro frente a personas;
- campo traviesa añade peligros ambientales y logísticos, no un porcentaje fijo de encuentros;
- carreta depende de infraestructura y transitabilidad física;
- caballo no ignora terreno ni logística;
- no se crea una tabla universal de litros de agua, hambre o daño por sed;
- trenes, dirigibles y barcos usan perfiles/rutas concretos, no esta tabla terrestre.

## Implementación

Se añade `scripts/rules/travel.mjs` con distancias, multiplicadores de terreno/ritmo, DF de Viaje, marcha forzada y forraje, más regresiones numéricas y documentales.
