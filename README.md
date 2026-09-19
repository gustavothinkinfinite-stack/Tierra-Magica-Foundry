# Tierra Mágica para Foundry VTT

Sistema propio de fantasía heroica para **Foundry VTT v14**, preparado como punto de partida para desarrollar las reglas de Tierra Mágica.

## Estado actual: 0.1.0

Esta primera versión permite:

- Crear personajes y PNJ con una ficha propia.
- Editar Poderío, Agilidad, Intelecto, Voluntad y Presencia.
- Usar Vida, Maná y Aguante como recursos independientes.
- Tirar atributos, habilidades e iniciativa al chat.
- Administrar grados de entrenamiento: sin entrenamiento, entrenado, experto, maestro y legendario.
- Calcular automáticamente modificadores y defensas.
- Crear armas, armaduras, equipo, hechizos y talentos dentro del personaje.
- Tirar ataques, daño y efectos de hechizos desde la ficha.
- Guardar identidad, idiomas, sentidos, historia y notas.
- Vincular automáticamente los tokens de los personajes.

## Reglas provisionales

La versión inicial combina ideas conocidas para poder probar la ficha desde el primer día:

- Modificador de atributo: `piso((atributo - 10) / 2)`.
- Tirada de atributo o habilidad: `1d20 + modificador`.
- Una habilidad entrenada suma nivel + competencia. Cada grado posterior suma +2 adicional.
- Defensa base: 10 + atributo relacionado + modificadores.

Estas fórmulas están aisladas en `scripts/rules.mjs`, por lo que se pueden reemplazar sin reconstruir la interfaz ni perder los datos de los personajes.

## Instalación

Cuando exista una publicación en GitHub, pegá esta URL en **Foundry > Sistemas de juego > Instalar sistema > URL del manifiesto**:

```text
https://raw.githubusercontent.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/main/system.json
```

Para probarlo manualmente, copiá el repositorio en:

```text
FoundryVTT/Data/systems/tierra-magica
```

Reiniciá Foundry y creá un mundo usando el sistema **Tierra Mágica**.

## Desarrollo

Requiere Node.js 20 o posterior solamente para las validaciones locales:

```bash
npm run validate
```

Foundry no necesita Node adicional para ejecutar el sistema.

## Próximos hitos sugeridos

1. Definir creación de personajes paso a paso.
2. Cerrar las reglas de combate, críticos y dificultad.
3. Diseñar linajes, culturas, clases/sendas y progresión.
4. Incorporar estados, descanso, muerte y recuperación.
5. Crear compendios iniciales de armas, armaduras, hechizos y talentos.
6. Automatizar consumo de recursos y efectos activos.
