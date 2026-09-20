# Tierra Mágica — Foundry T.M.

Sistema para **Foundry VTT v14** basado en el **Manual Básico v0.1 Playtest** de Foundry T.M.

## Rama de reconstrucción

Esta versión reemplaza la adaptación anterior (d20, clases, 8 características y perks) por el núcleo actual del manual:

- Motor **2d10 + Atributo + Habilidad + modificadores ≥ DF**.
- Ventaja/Desventaja mediante **3d10 conservando los dos mejores/peores**.
- Hazañas (10/10) y Pifias (1/1) interpretadas después de determinar éxito o fallo.
- Siete Atributos: FUE, AGI, VIG, INT, PER, VOL y PRE.
- 26 Habilidades con rangos Sin entrenamiento, Aprendiz, Entrenado, Experto, Maestro y Gran Maestro.
- Atributo y Habilidad desacoplados: el atributo se elige al realizar cada prueba.
- Vida, Maná, Defensa, Defensa de Maniobra, Mental y Corporal automáticas.
- Protección, Penetración, Daño Grave y estados de Trauma/Fatiga.
- Armas, armaduras y escudos del manual como contenido de referencia.
- Magia con Fuentes, Disciplinas, Maná, Canalización y requisitos de conocimiento.
- Hechizos de calibración del Manual v0.1.
- Técnicas, Rasgos y Especializaciones como tipos de objeto independientes.
- Familiares como Actor propio vinculado al personaje.
- Estética visual ajustada a la guía canónica arcano-industrial de Tierra Mágica.

## Estado

**0.3.0 — reconstrucción estructural para playtest.**

El sistema implementa el núcleo que el manual declara consolidado y deja editables los módulos que el propio documento marca como provisionales o pendientes. No inventa razas, bestiario, economía definitiva ni grimorio completo.

## Instalación de desarrollo

Para probar esta reconstrucción antes de fusionarla, usar la rama:

`foundry-tm-manual-v01`

Al fusionarse a `main`, la URL normal del manifiesto vuelve a ser:

`https://raw.githubusercontent.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/main/system.json`

## Desarrollo

```bash
npm run validate
```

La validación comprueba sintaxis del núcleo y reglas matemáticas básicas.
