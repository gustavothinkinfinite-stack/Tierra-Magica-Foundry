# Tierra Mágica para Foundry VTT

Sistema propio de fantasía para **Foundry VTT v14**, basado en los documentos originales de Tierra Mágica.

## Estado actual 0.2.0

La versión 0.2.0 reemplaza la base genérica inicial por las reglas y conceptos del libro:

- Personajes, PNJ y Compañeros Familiares con fichas propias.
- Fuerza, Destreza, Agilidad, Fortaleza, Inteligencia, Percepción, Voluntad y Poder.
- Creación guiada por puntos o tiradas de `2d6` conservando el dado mayor.
- Diez razas con sus valores de Vida, Maná, frecuencia de Perks y rasgos.
- Cuatro ramas profesionales: Combatiente, Místico, Técnico y Sin clase.
- Treinta y siete habilidades secundarias configurables.
- Tiradas `1d20 + característica + habilidad + bono`.
- Configuración opcional de dificultad y modificadores manteniendo Mayús al tirar.
- Grados de resultado: fallo crítico, fallo, éxito y éxito crítico.
- Vida, Maná y Destino con controles rápidos.
- Clase de armadura, Fortaleza, Voluntad, resistencia mágica, iniciativa, movimiento, carga y Letalidad.
- Progresión de experiencia hasta nivel 10 según la tabla del libro.
- Armas, armaduras, equipo, hechizos, Perks, estilos y beneficios de familiar.
- Biblioteca integrada con 17 conjuros, 17 Perks o estilos y 12 beneficios de familiar extraídos del material original.
- Consumo automático de Maná al lanzar conjuros.
- Creación de un Familiar directamente vinculado desde la ficha del personaje.
- Migración automática de fichas creadas con la versión 0.1.0.

## Instalación

En **Foundry > Sistemas de juego > Instalar sistema**, usá esta URL:

```text
https://raw.githubusercontent.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/main/system.json
```

## Uso básico

1. Creá un Actor de tipo **Personaje**.
2. Abrí su ficha y presioná **Crear** para elegir raza, profesión y método de características.
3. Ajustá los valores y distribuí puntos de habilidad según Inteligencia + Poder.
4. En Magia, Perks o Beneficios del Familiar, usá **Del libro** para añadir contenido preparado.
5. Hacé clic sobre una característica o habilidad para tirar. Mantené **Mayús** para agregar dificultad y modificadores circunstanciales.

## Criterio de adaptación

Los borradores originales contienen variantes y contradicciones entre características, creación y progresión. La implementación prioriza el documento más completo y conserva los valores numéricos explícitos de razas, profesiones, experiencia, conjuros y familiares. Los cálculos que no estaban cerrados permanecen editables en la ficha para facilitar las pruebas de mesa.

## Desarrollo

```bash
npm run validate
```

Las validaciones comprueban sintaxis, manifiesto, plantillas, progresión, habilidades, defensas, carga y grados de éxito.
