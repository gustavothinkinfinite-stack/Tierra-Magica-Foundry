# PROG-01M — Consolidación numérica y capacidades avanzadas

**Estado:** auditoría experimental NO CANÓNICA. Fuente: `test/prog-01m-reference-encounters.test.mjs`, fixtures en `test/fixtures/prog-01m-encounters.mjs`. Reproducción independiente de la misma recurrencia determinista de 2d10, semillas [17, 71, 2026, 911, 3849, 421, 1543, 3199, 8527, 101] y tres órdenes. Los datos siguientes son **promedios por 30 combates** en cada nivel y perfil; dos adversarios por combate y máximo ocho rondas.

## Daño efectivo medio

| Nivel | Marcial | Canalizador | Híbrido | Especialista |
|---:|---:|---:|---:|---:|
| 5 | 21,53 | 7,40 | 16,07 | 0,60 |
| 10 | 7,00 | 2,83 | 7,00 | 0,00 |
| 15 | 2,67 | 1,47 | 2,67 | 0,00 |
| 20 | 0,70 | 0,30 | 0,70 | 0,00 |

## Otras métricas de control

| Nivel | Perfil | Daño recibido medio (Vida efectiva) | Maná gastado medio | Enemigos a 0 (media) | Supervivencia |
|---:|---|---:|---:|---:|---:|
| 5 | Marcial | 13,80 | 0 | 0,53 | 10 % |
| 5 | Canalizador | 12 | 4,20 | 0 | 0 % |
| 5 | Híbrido | 14 | 0 | 0,27 | 0 % |
| 5 | Especialista | 14 | 0 | 0 | 0 % |
| 10 | Marcial | 14 | 0 | 0 | 0 % |
| 10 | Canalizador | 12 | 2,70 | 0 | 0 % |
| 10 | Híbrido | 14 | 0 | 0 | 0 % |
| 10 | Especialista | 14 | 0 | 0 | 0 % |
| 15 | Marcial | 14 | 0 | 0 | 0 % |
| 15 | Canalizador | 12 | 2,10 | 0 | 0 % |
| 15 | Híbrido | 14 | 0 | 0 | 0 % |
| 15 | Especialista | 14 | 0 | 0 | 0 % |
| 20 | Marcial | 14 | 0 | 0 | 0 % |
| 20 | Canalizador | 12 | 2,00 | 0 | 0 % |
| 20 | Híbrido | 14 | 0 | 0 | 0 % |
| 20 | Especialista | 14 | 0 | 0 | 0 % |

**Lectura:** las reservas máximas de Vida permanecen iguales a nivel 1 porque el proyecto no dispone de aumentos automáticos de Vida y estas construcciones no gastan PD en VIG. En cambio el daño enemigo por golpe del fixture sube de 7 a 13. El colapso en 10–20 revela **sobreexigencia de los fixtures en relación con los personajes y política limitada**, no demuestra un defecto canónico de equilibrio.

## Capacidades avanzadas omitidas del modelo anterior

- **Arco Fulminante**, avanzado, 6 Maná, daño 4, Penetración 1, hasta tres blancos encadenados si están próximos; relevante para encuentros con varios adversarios.
- **Aguja Gélida**, avanzado, 5 Maná, daño 5, Penetración 2, reduce Movimiento 2 si impacta; la IA simplificada no valora control.
- **Onda de Choque**, básica, 4 Maná, daño 4, zona frontal que puede empujar y afectar aliados; la geometría condiciona su valor.
- **Rayo de Ruptura**, maestro, 10 Maná, daño 8, Penetración 4, línea de 8 espacios, aliados incluidos; muy diferente a seguir lanzando Proyectil Ígneo.
- **Pantalla Cinética**, maestro, 8 Maná, Sostenida, +2 Defensa contra ataques a través de ella; no causa daño y requiere estado/posición.
- **Tormenta Arcana**, legendaria, 12 Maná, daño 8, Penetración 2, radio 3 espacios, aliados incluidos; puede alcanzar varios objetivos si lo permite la escena.
- **Golpe Potente:** -2 al ataque, +2 al daño; **Estocada Perforante:** -1 ataque y daño, Penetración +2; **Barrido:** -2 en una tirada contra hasta dos objetivos válidos. Su rendimiento debe medirse con elección táctica real.

La prueba `test/prog-01m-advanced-abilities.test.mjs` verifica existencia, requisitos de rango y **cotas ofensivas condicionadas a dos objetivos**, sin falsificar una geometría favorable como resultado asegurado. No calcula aún el valor de empuje, sostenimiento, control, cobertura ni daño de área con aliados.

## Diagnóstico

La diferencia visible a nivel 5 entre marcial e híbrido proviene aquí de las armaduras y de la política de ataque; a niveles 10–20 los encuentros terminan antes de que pueda apreciarse un diferencial de progresión. Cualquier recomendación de rebalanceo fundada en estas tasas de derrota sería prematura.

**Próximos experimentos:** (1) adversarios calibrados contra reservas y daño real; (2) capacidades avanzadas como acciones con costes, blancos y posiciones; (3) cobertura, reacciones y decisiones defensivas; (4) encuentros de utilidad del especialista. No cambiar costes ni el Manual Maestro todavía.
