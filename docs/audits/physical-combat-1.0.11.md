# Auditoría de combate físico — posterior a 1.0.11

Fecha: 2026-09-22

## Hallazgo prioritario

La regla canónica de daño físico está definida, pero la interfaz actual separa `rollWeapon` y `rollDamage`. Esa separación permite solicitar daño sin demostrar dentro del motor que el ataque anterior impactó. No se cambia la regla de mesa, pero sí se identifica una brecha de automatización que puede producir daño accidental o explotable si en una iteración futura se aplica Vida automáticamente desde el botón de daño.

## Consolidación realizada

Se añadió `scripts/rules/combat-impact.mjs` como núcleo puro y testeable para la futura ruta integrada ataque → impacto → daño. La función:

- exige arma, atacante y objetivo válidos;
- aplica como máximo un Atributo de daño configurado;
- normaliza daño base, Protección y Penetración para impedir valores negativos beneficiosos;
- limita Protección efectiva a `max(0, Protección − Penetración)`;
- impide que Penetración excesiva aumente el daño por encima del caso Protección 0;
- comprueba el umbral de Daño Grave después de mitigación y sólo como señal;
- considera impacto cuando el total iguala o supera Defensa;
- rechaza totales o Defensas no numéricos.

## Casos límite probados

1. Atributo + base + Protección/Penetración ordinarias.
2. Penetración muy superior a Protección.
3. Daño, atributo y Penetración negativos.
4. Umbral Grave antes/después de mitigación.
5. Igualdad ataque/Defensa.
6. Totales ausentes o inválidos.
7. Documentos que no son armas o Actores válidos.

## Decisión de diseño

No se aplica todavía daño físico automático a Vida. Antes debe existir una única acción integrada que conserve de forma inequívoca el objetivo y el resultado del ataque que autoriza ese daño. Reutilizar simplemente el objetivo seleccionado en un segundo clic sería vulnerable a cambiar de objetivo entre tirada y daño.

El siguiente bloque debe integrar esa resolución en la ficha mediante una acción atómica de ataque, o mediante una tarjeta de chat cuyo botón de daño lleve una referencia inmutable al atacante, arma, objetivo y resultado autorizado. Debe cubrir también Golpe Potente, Estocada Perforante, Combate Dual y Barrido sin crear acciones adicionales ni duplicar modificadores.

No se añaden reglas nuevas: este bloque sólo endurece la implementación de la regla de combate ya consolidada.
