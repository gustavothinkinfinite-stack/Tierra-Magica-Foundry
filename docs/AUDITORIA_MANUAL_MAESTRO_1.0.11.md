# Auditoría cruzada — Manual Maestro vs 1.0 vs Foundry 1.0.12

Fecha de auditoría inicial: 2026-09-22. Estado reconciliado: 2026-09-23.

## Alcance y jerarquía

Se contrastaron `docs/Tierra_Magica_Manual_Maestro.md`, `docs/Foundry_TM_Manual_1.0_Playtest.md`, `CHANGELOG.md`, `scripts/content.mjs`, el motor de Actor y las salvaguardas de magia/familiares.

La jerarquía vigente sigue siendo la del propio repositorio: el Manual 1.0 es fuente mecánica maestra; Foundry implementa y valida, pero no crea canon. El lore extenso de v0.3 permanece canónico sólo porque el Manual 1.0 lo remite expresamente.

## Resultado ejecutivo

El núcleo 1.0 y la implementación 1.0.12 están ampliamente alineados en resolución, derivados, Trauma, descansos, Familiares, Sobrecarga mágica, objetivos/áreas, daño mágico, Alquimia automatizada, Ritualismo y Sobrecarga Controlada.

Las ampliaciones heredadas del Manual Maestro no se convierten en canon por mera presencia documental. Se ratifican sólo cuando aportan una necesidad mecánica demostrable y superan revisión de coherencia, balance e interacción.

## Hallazgos

### A1 — Contramagia sobreespecificada — ALTA — RESUELTO

El Manual 1.0 define Contramagia como técnica reactiva contextual y no como cancelación automática universal. Se retiró del Maestro la fórmula adicional no sustentada. Contramagia permanece contextual hasta una decisión canónica explícita.

### A2 — Recibir Carga sin definición canónica — ALTA — RESUELTO

Ratificada como Técnica Básica de 2 PD. Reacción con arma de Alcance ante desplazamiento voluntario directo hacia el usuario; ataque inmediato antes de completar la aproximación, daño normal y sin detener automáticamente el movimiento.

### A3 — Intercepción sin soporte 1.0 inicial — ALTA — RESUELTO

Ratificada como Técnica Básica de 2 PD. Reacción para interponerse ante un ataque perceptible contra un aliado cercano mediante el desplazamiento mínimo físicamente válido; el usuario pasa a ser objetivo. No añade Defensa, no teletransporta, no excede Movimiento y no funciona contra áreas.

### A4 — Catálogo extendido de hechizos — ALTA — RESUELTO

Se auditó el catálogo extendido y se decidió mantener como núcleo los 18 hechizos implementados. Las variantes heredadas que duplicaban funciones, introducían apilamiento de bonos, curación escalonada, control mental acumulativo, rastreo gratuito, movimiento gratuito o reetiquetado para eludir resistencias no se incorporan automáticamente. Sólo podrán reaparecer si una necesidad de juego concreta demuestra que no puede resolverse limpiamente con el núcleo existente.

### A5 — Pueblos y Orígenes — ALTA — RESUELTO

Los pueblos, especies, culturas y orígenes no conceden paquetes mecánicos gratuitos. Las diferencias fisiológicas o sobrenaturales se construyen con la economía universal de 3 PR y Rasgos; competencias, Técnicas y Habilidades continúan pagando sus costes normales. Miembros Extra no crea acciones adicionales; Escala no concede bonos genéricos; una cultura marcial no regala competencias; una afinidad mágica no concede Disciplina, hechizos ni Maná; las desventajas raciales no generan PR; una misma propiedad no puede cobrarse dos veces.

### A6 — Sostenimiento — MEDIA — RESUELTO

El changelog 1.0.4 era histórico. La regla vigente y el motor coinciden: un nuevo lanzamiento sostenido entra y se abandona inmediatamente el efecto sostenido más antiguo necesario para respetar el límite.

### A7 — Broquel y geometría frontal — MEDIA — RESUELTO COMO LIMITACIÓN DELIBERADA

Foundry muestra el bono del mejor escudo equipado, pero no determina automáticamente el arco frontal. El +1 del Broquel sólo corresponde cuando la mesa confirma que el ataque es frontal; lateral o trasero debe ignorarlo manualmente. No se introduce un subsistema de encaramiento que el canon 1.0 no define. La limitación está visible en README.

### A8 — Métodos históricos de Familiar en `actor.mjs` — MEDIA — DEUDA TÉCNICA ABIERTA

`actor.mjs` todavía conserva implementaciones históricas de Acción Vinculada, órdenes, Sentidos Compartidos, Origen Remoto y ajuste de recursos. `familiar-guards.mjs` las sustituye al iniciar el sistema y es la autoridad canónica efectiva: valida propietario, estado operativo, Técnica, nivel de Vínculo, economía de Acción/Reacción y tratamiento de Vida 0 del Familiar.

La batería de regresión ya cubre entradas vacías, Familiar ajeno o incapacitado, Vínculo insuficiente, Origen Remoto inválido, no-hechizos, respuestas reactivas vacías, ausencia de Maná/Acción/Reacción propia y Trauma improcedente. La deuda restante es estructural: retirar físicamente las implementaciones históricas del Actor sin alterar la conducta protegida.

### A9 — README desactualizado — BAJA — RESUELTO

README ya declara **1.0.12 — núcleo estable para playtest** y mantiene el Manual 1.0 como fuente mecánica canónica.

## Coherencias verificadas

- Resolución 2d10, Ventaja/Desventaja y Hazaña/Pifia coinciden entre Manual 1.0 y motor.
- Vida 10+2×VIG, Maná 6+3×VOL y Defensas principales coinciden.
- Umbral Grave 5+VIG coincide con la mitad de Vida máxima y el motor lo trata como informativo.
- Primera caída real a 0 Vida aplica Incapacitado y Trauma 0→1 para PJ; caídas repetidas no escalan automáticamente.
- Respiro, Descanso y Descanso Completo siguen la recuperación 1.0.
- Familiar: Técnicas, niveles de Vínculo, Acción Vinculada, órdenes y Origen Remoto están protegidos por salvaguardas canónicas.
- Origen Remoto exige Familiar válido, Vínculo III, Técnica y origen geométrico válido en la capa mágica.
- Objetivos mágicos se validan antes del gasto; áreas conservan Defensas individuales y deduplican Actores.
- Daño mágico usa Protección/Penetración y no automatiza Herida Grave.
- Sobrecarga mágica y Sobrecarga Controlada respetan sus recursos y estados.
- Alquimia automatizada respeta Saturación y máximos de Vida/Maná.
- Ritualismo limita el aporte declarado de asistentes y no crea recursos ajenos.
- Armas, armaduras, escudos, fórmulas, rituales y dispositivos del contenido inicial coinciden en sus valores principales con el canon vigente.

## Material del Maestro que excede el Manual 1.0

El Maestro conserva ampliaciones potenciales —Escala detallada, agarres, movimiento ampliado, Proyectos, disponibilidad/mercados, vehículos, monturas, autómatas, perfiles extensos de PNJ y dirección de juego— que no están definidas con ese nivel de detalle en el Manual 1.0.

No se canonizan por defecto. Antes de implementar cualquiera debe demostrarse una carencia real del juego, comprobar que no puede resolverse con reglas existentes y revisar coste de complejidad, exploits e interacción con el núcleo.

## Próxima pasada recomendada

1. Completar A8 retirando la lógica histórica duplicada de Familiares de `actor.mjs` y ejecutar la suite completa.
2. Revalidar instalación, manifiesto y compatibilidad de Foundry tras la limpieza estructural.
3. Auditar únicamente los huecos funcionales restantes que afecten una partida completa; no expandir subsistemas por catálogo.
4. Cuando no queden bloqueos funcionales ni contradicciones canónicas, ejecutar la auditoría integral final y preparar referencia rápida, glosario e índices.

## Estado

A1–A7 y A9 están resueltos. A8 es la única deuda identificada en esta auditoría que todavía requiere limpieza estructural. El sistema no se declara final mientras esa duplicación permanezca y hasta completar la auditoría integral final.