# Eidolon Manívoro — ficha aprobada para el Bestiario

> **Estado editorial:** retrato, token circular y ficha base aprobados para incorporación al sistema; las capacidades nuevas son diseños originales sujetos a prueba de partida. **No modifica** `docs/Tierra_Magica_Manual_Maestro.md`. **No publicar release** sin nueva autorización.

## Identidad

**Clase:** entidad umbría / depredador arcano. **Tamaño:** Mediano.
**Rol:** infiltrador, acosador, cazador de Maná.
**Amenaza:** Equilibrada cuando es identificada; Peligrosa en una emboscada nocturna (contextual).

El Eidolon no tiene anatomía permanente. Forma pliegues de sombra con membranas
parecidas a alas rasgadas y rasgos faciales humanos incompletos. No es
automáticamente un no muerto ni un fantasma incorpóreo: no atraviesa paredes
ni gana inmunidad física o vuelo libre por su aspecto.

Observa a canalizadores de barrio, aprende voces, copia una identidad de
manera imperfecta y acecha hasta aislar a la víctima. Se alimenta del
**Maná actual**, no del Maná máximo ni del alma. Prefiere talleres arcanos,
estaciones antiguas, hospitales con instrumentos mágicos y barrios donde
aún persisten rastros de viejas investigaciones.

**Pistas:** reflejos desfasados, faroles oscilantes, testigos que vieron a
una misma persona en dos lugares y víctimas con Maná agotado sin heridas.
**Comportamiento:** evita grupos preparados y huye si su suplantación queda al descubierto.

## Perfil base

| Estadística | Valor |
|---|---:|
| Vida | 18 |
| Defensa | 15 |
| Defensa Corporal | 12 |
| Defensa Mental | 16 |
| Defensa de Maniobra | 15 |
| Protección | 1 |
| Movimiento | 8 |
| Iniciativa | +5 |
| Reserva de Maná | 8 |
| Canalización | +3 |

**Ataque — Garra Umbría:** +6, daño 6 Cortante, Penetración 0, modo Letal.
Una Garra Umbría acertada no drena Maná. El poder de drenaje se usa
separadamente y nunca concede una segunda Acción.

### Rostro Prestado

**1 Acción, 1 Maná, propio, duración máxima una Escena.**

Copia imperfectamente la voz, rostro, silueta y apariencia de ropa de un
humanoide observado al menos un minuto. Sólo sostiene una forma prestada a la vez.
No copia recuerdos, habilidades, bienes reales ni poderes.
Un observador con sospechas puede detectar incongruencias mediante
**PER + Investigación DF 15**; contacto y luz intensa continua también
revelan defectos. No concede inmunidad ni manipulación mental.

### Sorbo de Maná

**1 Acción, 0 Maná, alcance 1 espacio, una víctima.**

Resolución original propuesta: **2d10 + PRE 2 + Canalización 3 = 2d10 +5**
contra **Defensa Mental**. Al acertar, sustrae hasta **2 puntos del
Maná actual de la víctima** y recupera hasta **1 punto de su propio Maná**,
nunca por encima de Maná máximo. Sólo recupera si absorbió Maná real.
Un objetivo sin Maná actual no puede ser drenado.

**No produce** daño a Vida, Trauma, pérdida de Acciones, reducción de
Maná máximo ni absorción ilimitada. Las dos reservas se actualizan
**manualmente** por el DJ después de la oposición.

### Susurro Invasivo

**1 Acción, 2 Maná, alcance 4 espacios, una víctima capaz de oír.**

Resolución original propuesta: **2d10 +5 contra Defensa Mental**.
En éxito distorsiona la percepción de una voz, figura o advertencia cercana
hasta el final del siguiente turno del objetivo. El objetivo conserva sus
decisiones y el control de su personaje.

**No** impone órdenes suicidas, Dominación, pérdida de Acción, ataque a
aliados, traición ni borrado permanente de memoria. Requiere
comunicación acústica posible. El DJ describe el engaño y lo aplica
narrativamente sin automatizar efectos.

## Debilidades y respuesta de los aventureros

**Luz intensa sostenida:** el disfraz se quiebra y termina al final del
siguiente turno mientras la iluminación se mantiene; no causa daño
automático por luz.

**Reflejo incongruente:** en un espejo pulido se advierte que la imagen
es incompleta. Es una pista contra esta criatura, no un detector
universal de impostores. Si hay duda: **PER + Investigación DF 15**.

Mantener al grupo reunido, observar reflejos y rastrear interrupciones en
fuentes arcanas permite oponerse a la criatura sin combatirla directamente.

## Plantilla libre editable

Los rangos son opciones de diseño para el DJ, **no equivalencias de nivel**
ni presupuestos de PD o PR. Las estadísticas de esta criatura pueden
modificarse en la ficha NPC de Foundry. La lista de capacidades
sobrenaturales admite agregar, quitar y editar poderes en la ficha.

| Variante | Vida | Defensa | Def. Mental | Protección | Maná |
|---|---:|---:|---:|---:|---:|
| Menor | 10–14 | 13–15 | 14–16 | 0–1 | 4–6 |
| Base | 16–22 | 14–16 | 15–17 | 1–2 | 6–10 |
| Mayor | 24–32 | 15–17 | 16–18 | 2–3 | 10–15 |

Modificar una variante **no otorga automáticamente otros ataques,
hechizos, Acciones, resistencias, vuelo libre o inmunidades**.
Revisar por separado oposición, alcance, gasto de Maná y duración.

El sistema presenta los poderes y sus costes en la ficha, pero **no**
descuenta automáticamente Maná, no ejecuta el drenaje ni impone sugestión.
Son nuevas mecánicas de criatura, no hechizos añadidos al Grimorio.

## Aventura — El aprendiz que volvió dos veces

En un distrito de manufactura arcana, varios aprendices despiertan sin
Maná para sus labores. Un testigo ve al maestro por la noche, pese a que
el auténtico está de viaje. Los personajes siguen los horarios de la
estación, comparan testimonios, revisan espejos y fuentes de iluminación,
y pueden tender una emboscada, negociar, capturar o ahuyentar a la entidad.

## Arte integrado

- Retrato: `assets/bestiary/eidolon-manivoro-retrato.webp`.
- Token circular transparente con marco aprobado:
  `assets/bestiary/eidolon-manivoro-token.webp`.
- Actor `npc` en `Tierra Mágica — Bestiario` con **vinculación automática
  sólo cuando ambos WebP existen**.
- Archivo de origen de variantes:
  `scripts/catalog/eidolon-manivoro.mjs` exporta `EIDOLON_VARIANTS`.

**Estado de distribución:** incorporado para el candidato v1.12.0, 
**sin publicar release ni tag**. La última versión pública no cambia
hasta orden expresa.
