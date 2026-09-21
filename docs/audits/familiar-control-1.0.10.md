# Auditoría 1.0.10 — Familiares: progresión, control y límites

Estado: **regla candidata auditada; pendiente de automatización en Foundry**. Este documento no reemplaza el manual canónico hasta integrar implementación y pruebas.

## Objetivo
Cerrar el bloque de Familiares sin convertir el rasgo **Familiar Mágico (2 PR)** en un segundo personaje gratuito, una reserva adicional de Maná ni una fuente de acciones tácticas sin coste.

## Decisiones de diseño

### 1. El nivel de vínculo no compra poder
El vínculo usa cuatro estados narrativos: I Compañero, II Sintonizado, III Profundo y IV Excepcional. El nivel habilita prerrequisitos, pero **no concede por sí mismo bonos numéricos, acciones, Reacciones, Maná ni capacidades**. Esto evita una progresión paralela gratuita y mantiene PD como economía universal de desarrollo.

### 2. Capacidades de vínculo se compran con PD
Las capacidades aprendidas pertenecen al vínculo del personaje, no al cuerpo concreto del Familiar. Si el Familiar muere o es reemplazado, los PD no se pierden; el nuevo Familiar requiere re-vinculación narrativa antes de usar esas capacidades.

Catálogo inicial auditado:

| Capacidad | Coste | Vínculo | Efecto |
|---|---:|---:|---|
| Sentidos Compartidos | 2 PD | II | Acción del personaje. Percibe temporalmente mediante los sentidos reales del Familiar. No concede sentidos que éste no posea. |
| Comunicación Afinada | 2 PD | II | Permite transmitir conceptos complejos dentro del alcance válido del vínculo. No transmite conocimiento que ninguna de las partes posea. |
| Origen Remoto | 3 PD | III | Un hechizo del personaje puede originarse desde la posición del Familiar cuando existe percepción/dirección válida. Maná, tirada, Sostenimiento y límites siguen siendo del personaje. |
| Coordinación Reactiva | 3 PD | III | Permite definir un disparador simple y observable para una respuesta del Familiar. No genera Reacciones adicionales ni cadenas reactivas. |

No se añaden más capacidades hasta probar estas cuatro en mesa. Los arquetipos Compañero/Explorador/Guardián/Místico son etiquetas orientativas y **no otorgan paquetes gratuitos**.

### 3. Modos de control
**Autónomo:** el Familiar actúa según personalidad, deseos, peligro y órdenes previas. El jugador no obtiene control táctico gratuito sobre él.

**Vinculado:** una acción táctica significativa coordinada se resuelve mediante **Acción Vinculada**, consumiendo la Reacción del personaje. Cambiar una orden táctica compleja consume la Acción del personaje.

**Reactivo:** sólo con una capacidad que lo habilite. Se define un disparador concreto y perceptible. Una respuesta no puede disparar otra respuesta reactiva salvo regla expresa.

### 4. Cierre del exploit de orden persistente
Una orden persistente simple puede sostener movimiento rutinario, seguir, esconderse, vigilar, huir, transportar un objeto o mantener una posición cuando la ficción lo permita.

Una orden persistente **no puede automatizar ataques, lanzamiento de magia, maniobras, Ayuda táctica repetida, Intercepción u otra intervención significativa ronda tras ronda**. Ejemplos inválidos: «ataca al enemigo más cercano cada turno», «ayúdame siempre que ataque», «intercepta cualquier golpe».

Cuando una orden pasa de comportamiento rutinario a intervención táctica significativa, requiere la economía correspondiente del vínculo. Con esto se elimina el segundo turno gratuito sin eliminar la autonomía narrativa del Familiar.

## Rasgos corporales del Familiar
Vuelo, tamaño Diminuto, visión especial, respiración acuática, trepar u otras propiedades físicas dependen de la naturaleza/cuerpo del Familiar y de capacidades pagadas o justificadas. No aparecen automáticamente por elegir un arquetipo.

- Vuelo permite alcanzar lugares físicamente alcanzables; no vuelve invisible ni indetectable al Familiar.
- Diminuto permite usar aberturas realmente transitables; no atraviesa barreras selladas.
- La exploración remota sólo devuelve aquello que el Familiar pudo percibir, comprender y comunicar.
- Cobertura, clima, distancia, ruido, iluminación y detección siguen aplicando.

## Origen Remoto — límites auditados
Origen Remoto cambia el punto geométrico de origen, no el lanzador.

1. El personaje paga todo el Maná.
2. El personaje realiza la tirada de Canalización.
3. El efecto cuenta contra el Sostenimiento del personaje.
4. El Familiar no obtiene reserva de Maná por esta capacidad.
5. Debe existir una forma válida de dirigir el hechizo. Para objetivos que el personaje no puede percibir/conocer por otros medios, normalmente requiere Sentidos Compartidos u otra percepción válida.
6. No permite ignorar línea de efecto, barreras o requisitos propios del hechizo.
7. El Familiar no puede lanzar otro hechizo simultáneo por ser el origen.

## Economía y hoja de Familiar
El actor Familiar hereda actualmente campos base de Acción/Reacción/Maná. Esos campos **no deben interpretarse como economía completa de PJ**. En la implementación siguiente deben ocultarse o neutralizarse en la ficha de Familiar salvo que una regla concreta los necesite. El Maná de un Familiar será 0 por defecto y sólo existirá si una fuente explícita se lo concede.

## Trauma y 0 Vida
Se detectó una interacción incorrecta: la automatización genérica de 0 Vida puede aplicar Trauma a cualquier tipo de Actor. La regla canónica de Trauma automático 0→1 al caer por primera vez a 0 Vida corresponde a **PJ orgánicos**, no a Familiares, constructos o PNJ genéricos. La corrección debe separar Incapacitación universal de Trauma orgánico de PJ y eliminar el bloqueo permanente `zeroTraumaApplied`, que impide futuras aplicaciones legítimas tras recuperación.

## Pruebas de abuso superadas por diseño
- Familiar volador + orden «ataca siempre»: falla; ataques repetidos son intervención táctica significativa.
- Familiar diminuto + exploración: no atraviesa cerramientos ni obtiene información no percibida.
- Origen Remoto + Familiar fuera de vista: no habilita blancos desconocidos sin percepción/dirección válida.
- Origen Remoto + Maná del Familiar: inválido; paga el personaje.
- Familiar muerto/reemplazado: no destruye PD invertidos, pero exige re-vinculación narrativa.
- Arquetipo Místico: no concede hechizos, Maná ni Canalización gratis.
- Sentidos Compartidos: cuesta Acción y no produce omnisciencia.
- Comunicación Afinada: transmite conceptos, no conocimientos inexistentes.
- Vínculo IV: no concede acciones extra por sí solo.

## Implementación pendiente antes de declarar cerrado el bloque
1. Añadir `controlMode` explícito: autonomous / linked / reactive.
2. Impedir que `persistent` se describa en UI como autorización de intervención táctica gratuita.
3. Registrar las cuatro capacidades como Técnicas de vínculo con coste PD y prerrequisito de vínculo.
4. Validar Origen Remoto contra propietario correcto e incapacidad del Familiar; exponerlo en UI sólo cuando sea utilizable.
5. Neutralizar Maná/economía completa heredada por Familiar salvo fuente expresa.
6. Corregir Trauma automático por tipo de Actor.
7. Añadir pruebas automatizadas para los casos anteriores.

No se amplía el catálogo hasta completar estos siete puntos y pasar validación.