# Auditoría cruzada — Manual Maestro vs 1.0 vs Foundry 1.0.11

Fecha de auditoría: 2026-09-22.

## Alcance y jerarquía

Se contrastaron `docs/Tierra_Magica_Manual_Maestro.md`, `docs/Foundry_TM_Manual_1.0_Playtest.md`, `CHANGELOG.md`, `scripts/content.mjs`, el motor de Actor y las salvaguardas de magia/familiares de la versión declarada 1.0.11.

La jerarquía vigente sigue siendo la del propio repositorio: el Manual 1.0 es fuente mecánica maestra; Foundry implementa y valida, pero no crea canon. El lore extenso de v0.3 permanece canónico sólo porque el Manual 1.0 lo remite expresamente.

## Resultado ejecutivo

El núcleo 1.0 y la implementación 1.0.11 están ampliamente alineados en resolución, derivados, Trauma, descansos, Familiares, Sobrecarga mágica, objetivos/áreas, daño mágico, Alquimia automatizada, Ritualismo y Sobrecarga Controlada.

El Manual Maestro había mezclado tres estados distintos —canon 1.0, implementación 1.0.11 y material de diseño previo— bajo redacción demasiado uniforme. Esta auditoría corrige los casos más peligrosos y deja explícitos los bloques que requieren ratificación antes de que el Maestro pueda sustituir al 1.0.

## Hallazgos que requieren acción

### A1 — Contramagia estaba sobreespecificada en el Maestro — ALTA — CORREGIDO EN DOCUMENTACIÓN

El Manual 1.0 sólo define Contramagia como técnica reactiva contextual y declara que no es una cancelación automática universal. El contenido inicial 1.0.11 repite esa formulación. El Maestro había añadido una fórmula de prueba contra DF efectiva y resultados mecánicos de Desventaja/+2 DF que no están sustentados por 1.0 ni por el motor.

Acción aplicada: se retiró esa fórmula del Maestro. Contramagia queda contextual hasta una decisión canónica explícita.

### A2 — Recibir Carga existía en datos sin definición canónica — ALTA — RESUELTO

`scripts/content.mjs` registra Recibir Carga, Básica 2 PD, Reacción, requisito Arma de Alcance, pero no define su efecto. El Manual 1.0 no la enumera. Por tanto la implementación contiene una entrada que no tiene regla completa canónica.

Resolución posterior a la auditoría: ratificada como Técnica Básica de 2 PD. Reacción con arma de Alcance ante desplazamiento voluntario directo hacia el usuario; ataque inmediato antes de completar la aproximación, daño normal y sin detener automáticamente el movimiento.

### A3 — Intercepción aparecía en el Maestro sin soporte 1.0/1.0.11 — ALTA — RESUELTO

El Maestro conservaba Intercepción como Técnica Básica, pero no existe en el Manual 1.0 ni en el catálogo de Técnicas de `scripts/content.mjs`. Tampoco tiene coste PD canónico.

Resolución posterior a la auditoría: ratificada como Técnica Básica de 2 PD. Reacción para interponerse ante un ataque perceptible contra un aliado cercano mediante el desplazamiento mínimo físicamente válido; el usuario pasa a ser objetivo. No añade Defensa, no teletransporta, no excede Movimiento y no funciona contra áreas.

### A4 — Catálogo extendido de hechizos mezcla implementados y no ratificados — ALTA — CORREGIDO EN DOCUMENTACIÓN / ABIERTO EN DISEÑO

El catálogo inicial 1.0.11 implementa 18 hechizos: Proyectil Ígneo, Onda de Choque, Barrera Cinética, Potencia Sobrenatural, Piel Alterada, Cierre Restaurador, Regeneración, Reconstrucción, Visión Arcana, Vínculo de Rastreo, Visión Remota, Calma, Sugestión, Llamada Menor, Paso Breve, Trasposición, Umbral y Portal.

El Maestro también incluía Chispa, Pulso, Impulso, Descarga, Lanza, Molde, Ajuste, Paso Ligero, Adaptación, Alterar Forma, Forma Adaptativa, Alivio, Diagnóstico, Estabilización, Purificación, Restauración Profunda, Realce, Marca, Eco, Lectura de Huella, Matiz, Susurro, Impulso Emocional, Silencio Mental, Señal, Mano y Ancla. Esas entradas no están enumeradas en el Manual 1.0 ni en el contenido inicial 1.0.11.

Acción aplicada: la sección dejó de llamarse “Grimorio canónico inicial” y ahora separa explícitamente catálogo implementado de material extendido pendiente de ratificación.

### A5 — Paquetes mecánicos de pueblos y Orígenes no están en el Manual 1.0 — ALTA — CORREGIDO EN DOCUMENTACIÓN / ABIERTO EN DISEÑO

El Manual 1.0 sólo fija el Panteón y remite el lore narrativo extenso a v0.3. No ratifica Adaptabilidad humana, capacidades élficas/enanas/orcas/goblin/medianas/Aelari ni el paquete mecánico de Orígenes escrito en el Maestro.

Acción aplicada: toda la sección queda marcada como material mecánico de diseño pendiente de procedencia, balance y ratificación. El lore de pueblos sí puede conservarse cuando esté respaldado por v0.3.

### A6 — Sostenimiento: changelog histórico 1.0.4 quedó obsoleto frente a manual y código actual — MEDIA — RESUELTO

El changelog 1.0.4 dice que el usuario debía abandonar un efecto antes de mantener otro. El Manual 1.0 actual dice que un nuevo lanzamiento exitoso entra y se abandona inmediatamente el Sostenido más antiguo necesario. El código 1.0.11 implementa precisamente esta segunda conducta.

Conclusión: no hay discrepancia actual Manual↔motor. La entrada 1.0.4 es historia y no debe leerse como regla vigente.

### A7 — Broquel y geometría frontal no se automatizan plenamente — MEDIA — ABIERTO/DELIBERADO

Manual 1.0: Broquel +1 frontal. El contenido inicial registra +1 Defensa y no marca `frontalOnly`; el cálculo derivado aplica el mejor escudo equipado sin geometría. El changelog 1.0.2 declara que la geometría frontal permanece deliberadamente manual.

Riesgo: la ficha puede mostrar una Defensa que incorpora el escudo incluso cuando la amenaza no es frontal.

Acción pendiente: mantenerlo como limitación manual claramente visible en interfaz/documentación, o introducir validación geométrica sólo si puede hacerse sin crear reglas nuevas.

### A8 — Código base conserva métodos históricos de Familiar que son sustituidos por salvaguardas — MEDIA — DEUDA TÉCNICA

`actor.mjs` todavía contiene versiones antiguas de Sentidos Compartidos y Origen Remoto basadas en campos históricos. `familiar-guards.mjs` sobrescribe esos métodos al iniciar el sistema y aplica las reglas 1.0.11 por Técnica + nivel de Vínculo. La migración 1.0.11 elimina los campos históricos.

No produce contradicción efectiva mientras las salvaguardas se instalen correctamente, pero duplica lógica obsoleta y aumenta el riesgo de regresión.

Acción pendiente: eliminar o refactorizar los métodos históricos del Actor y conservar una única implementación canónica, con tests de regresión.

### A9 — README declara 1.0.9 como núcleo estable mientras el sistema está en 1.0.11 — BAJA — ABIERTO

`system.json` declara 1.0.11 y el changelog llega a 1.0.11, pero README aún muestra “1.0.9 — núcleo estable para playtest”.

Acción pendiente: actualizar la referencia de estado sin cambiar la política de estabilidad del núcleo.

## Coherencias verificadas estáticamente

- Resolución 2d10, Ventaja/Desventaja y Hazaña/Pifia coinciden entre Manual 1.0 y motor.
- Vida 10+2×VIG, Maná 6+3×VOL y Defensas principales coinciden.
- Umbral Grave 5+VIG coincide con la mitad de Vida máxima y el motor lo trata como informativo.
- Primera caída real a 0 Vida aplica Incapacitado y Trauma 0→1 para PJ; caídas repetidas no escalan automáticamente.
- Respiro, Descanso y Descanso Completo siguen la recuperación 1.0.
- Familiar: Técnicas, niveles de Vínculo, Acción Vinculada, órdenes y Origen Remoto están protegidos por salvaguardas 1.0.11.
- Origen Remoto exige Familiar válido, Vínculo III, Técnica y token activo para origen geométrico.
- Objetivos mágicos se validan antes del gasto; áreas conservan Defensas individuales y deduplican Actores.
- Daño mágico usa Protección/Penetración y no automatiza Herida Grave.
- Sobrecarga mágica y Sobrecarga Controlada respetan sus recursos y estados.
- Alquimia automatizada respeta Saturación y máximos de Vida/Maná.
- Ritualismo limita el aporte declarado de asistentes y no crea recursos ajenos.
- Armas, armaduras, escudos, fórmulas, rituales y dispositivos del contenido inicial coinciden en sus valores principales con el canon 1.0/changelog.

## Material del Maestro que excede el Manual 1.0

Además de los hallazgos anteriores, el Maestro contiene ampliaciones útiles —Escala detallada, agarres, movimiento ampliado, Proyectos, disponibilidad/mercados, vehículos, monturas, autómatas, perfiles extensos de PNJ y dirección de juego— que no están definidas con ese nivel de detalle en el Manual 1.0.

No se eliminan automáticamente: deben rastrearse a una decisión de diseño aprobada o a una fuente histórica compatible. Hasta entonces su presencia en el Maestro no basta para convertirlas en canon, porque la política vigente exige decisión de diseño y consolidación antes de implementación.

## Próxima pasada recomendada

1. A2 Recibir Carga y A3 Intercepción: resueltos y ratificados.
2. Auditar uno por uno los hechizos extendidos y clasificarlos como ratificados, revisados o descartados.
3. Auditar mecánicas de pueblos/Orígenes por balance y procedencia antes de canonizarlas.
4. Limpiar deuda técnica de Familiar y actualizar README.
5. Ejecutar la suite completa de validación después de cualquier cambio de código.
6. Sólo entonces construir referencia rápida, glosario e índices y cambiar la fuente canónica del README al Manual Maestro.

## Estado de esta auditoría

Auditoría documental y estática completada sobre las fuentes indicadas. No se modificó el motor en esta pasada y, por tanto, no se afirma una validación dinámica de Foundry ni una ejecución de la suite de tests. Las correcciones realizadas en esta pasada son editoriales y de clasificación de canon.
