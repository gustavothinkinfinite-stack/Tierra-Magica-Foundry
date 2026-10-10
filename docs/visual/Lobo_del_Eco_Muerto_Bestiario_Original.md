# Lobo del Eco Muerto — Bestiario original (propuesta de revisión)

> **Estado editorial:** propuesta de criatura original; no pertenece aún al canon del Manual Maestro. Fase 2 aprobada como entrada de diseño para llevar a prueba, no como cambio de reglas generales.

## Identidad

**Categoría:** Bestia mágica menor. **Tamaño:** Mediano. **Actividad:** nocturna.
**Hábitat:** bosques templados, márgenes agrícolas y ruinas rurales.
**Organización:** solitario; puede coexistir con lobos ordinarios.
**Amenaza orientativa:** Favorable ante un grupo preparado; potencialmente Equilibrada cuando consigue aislar una presa mediante engaño acústico.

Cánido grande y delgado, de pelaje gris ceniza con reflejos azulados y ojos pálidos.
La garganta presenta un brillo tenue al reproducir sonidos. Es un ser vivo, no
un demonio, un espíritu ni un no muerto. Su origen mágico no se da por demostrado:
se sospechan resonancias ambientales o una adaptación hereditaria.

Caza mediante observación. Aprende silbidos, balidos y llamadas de los pastores;
los reproduce para separar presas y atacar rápidamente. Evita enfrentamientos
prolongados y suele huir si pierde la ventaja. Una amenaza común para ganado,
pastores aislados y agricultores, pero no un jefe de gran poder.

## Estadísticas del Actor de Foundry

| Estadística | Valor |
|---|---:|
| Vida | 10 |
| Defensa | 14 |
| Defensa Corporal | 13 |
| Defensa Mental | 11 |
| Defensa de Maniobra | 13 |
| Protección | 0 |
| Movimiento | 8 |
| Iniciativa | +4 |
| Mordida | +5, daño 5, Penetración 0 |

Los valores numéricos se copian del **Lobo**, Manual Maestro §23. Para
Mordida se propone **daño Perforante, modo Letal**, a aplicar manualmente.

## Eco Robado

**Naturaleza:** capacidad innata sobrenatural, no un hechizo.
**Coste:** 1 Acción, 0 Maná. **Alcance del origen aparente:** hasta 4 espacios
desde el lobo. **Duración:** un sonido breve, unos segundos.

El lobo reproduce un balido, silbido, golpe o llamada corta que haya oído durante
las **últimas 24 horas**. El ruido puede aparentar proceder de otro punto dentro
del alcance, siempre que haya un recorrido acústico viable.

Un personaje que tenga motivos para sospechar puede identificar la anomalía
mediante **PER + Investigación** o **PER + Supervivencia contra DF 14**.
Reconocer que es un engaño no revela la posición exacta del lobo.

**Límites estrictos:** no inventa frases ni sonidos, no conversa, no combina
imitaciones simultáneas, no atraviesa barreras acústicas, no controla voluntades,
no impone miedo, Desventaja ni movimiento forzado, y no genera ataques o acciones
adicionales. Si el sonido no puede producir un resultado plausible por la ficción,
no se fuerza una tirada.

## Señales y contramedidas

Señales: huellas y mordidas de cánido, pelos gris azulados, llamados desde
lugares incompatibles con la ubicación de su verdadero emisor, ganado inquieto.

Contramedidas: nuevas señales de pastoreo, vigilancia coordinada, terreno
despejado, buena iluminación y rastreo persistente. No conceden bonos
numéricos automáticos: el DJ aplica la ficción y el núcleo de resolución.

La garganta puede interesar a estudiosos y alquimistas, pero **no existe**
una receta ni precio canónico; su obtención no crea nuevos consumibles.

## Aventura: La voz detrás del corral

Una aldea pierde ovejas y terneros. Un pastor escucha su propio silbido desde un
bosque donde no se encuentra nadie; una campesina escucha a su hijo llamando desde
un establo vacío. Los personajes interrogan, inspeccionan huellas y vigilan los
corrales. Los rastros llegan a una antigua conducción de piedra. El desenlace
puede ser la caza, captura o alejamiento de la criatura. Ninguna solución se
impone moralmente.

## Implementación en Foundry

- Actor: `npc` en `Tierra Mágica — Bestiario`, separado del Lobo ordinario.
- Ataque: botón ordinario Mordida +5, daño 5; **no aplica daño automáticamente**.
- Rasgo: Eco Robado aparece como texto estructurado en la ficha. Su coste de
  Acción y efectos son manuales, sin automatización de condiciones ni controles.
- Retrato: `assets/bestiary/lobo-del-eco-muerto-retrato.webp`.
- Token: `assets/bestiary/lobo-del-eco-muerto-token.webp`.
- Los archivos se vinculan automáticamente **solamente cuando ambos estén
  presentes en el sistema instalado**. El icono genérico evita rutas rotas.
- Ambos archivos WebP ya están incorporados al repositorio y se incluyen en el ZIP preparado de v1.12.0. La criatura sigue pendiente de aprobación **canónica**; la disponibilidad de su arte no cambia ese estado.

## Puntos a revisar antes de declararlo canónico

Validar en mesa el rango de 4 espacios, memoria de 24 horas y DF 14 de
identificación; evaluar posibles dificultades sin otorgar efectos de
control mental ni economía adicional. Mantener inalteradas las reglas
generales del Manual Maestro salvo aprobación expresa.
