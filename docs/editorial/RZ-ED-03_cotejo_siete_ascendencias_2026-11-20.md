# RZ-ED-03 — Auditoría de siete paquetes y anexos raciales

Fecha: 2026-11-20. Auditoría exclusivamente documental. Autoridad consultada: `main:docs/Tierra_Magica_Manual_Maestro.md`, blob `50c63cc50ac6b3ee14c52e8a0661a2d4fa07c658`. Continuidad: RZ-ED-02. Corrección editorial en rama del PR #112, commit `b6e3091224a6948b870c4122eca669380fbde421`. Sin alteración de valores canónicos.

## Cotejo específico, capítulo 3 ↔ anexo ↔ B5

| Pueblo | Regla de capítulo 3 | Evidencia del anexo | Control |
|---|---|---|---|
| Terios | 1 Principal + 1 Secundaria o 1 Dominante; branquias y nado distintos | 13756–13778 | Concordancia de presupuesto; anexo remite a Anfibio, pero la excepción anatómica de branquias de B5-I05 no está resumida expresamente. No inferir que nado confiere respiración |
| Feéricos | Hada, Sátiro, Dríade, Silfo como variantes; una sola ascendencia | 13807–13825 | Hallazgo editorial I02: título decía «Cuatro ascendencias jugables» aunque el texto dice una ascendencia y cuatro paquetes alternativos. Corregido título a «Cuatro variantes jugables de la ascendencia Feérica» |
| Feéricos/Dríade | Enraizar da Escala efectiva +1 en resistencias delimitadas | 13818–13819 | Hallazgo de omisión de referencia B5-I02: añadido +1 circunstancial a Defensa de Maniobra únicamente contra Derribar bajo anclaje válido; no afecta Empujar/Agarrar/Desarmar |
| Ankar | Sentido 6 espacios; Custodia +1 Defensa Mental contra amenazas al alma | 13854–13869 | Coinciden ámbitos y exclusiones; el anexo aclara que los disparadores no son idénticos |
| Cristálidos | Matriz Mixta, contacto en Resonancia, Conductor compatible y voluntario | 13900–13915 | Coinciden límites; B5-I08 exige especificación completa del dispositivo y consentimiento |
| Verdantes | Sustento, Enraizar, una sola modalidad de bioma | 13946–13960 | Coinciden; +1 contra Derribar ya consignado conforme B5-I02 |
| Micelios | Contacto con red viva, voluntariedad, Acción y 12 espacios | 13991–14005 | Coinciden; B5-I04 precisa distancia real y reconexión con nueva Acción |
| Coralios | Tierra 5/agua 6, respiración condicionada, Protección 1, PER contextual | 14030–14042 | Coinciden; remisión correcta a B5-I01 y prohibición de sumar armadura |

## Cambios editoriales efectivos

1. Encabezado de Feéricos corregido para evitar presentar cuatro paquetes como cuatro ascendencias simultáneas.
2. Descripción de Dríade completada con remisión explícita al modificador vigente de B5-I02, en paralelo con el texto de Verdantes. **No se crea un bono nuevo**.

Archivo modificado: `docs/Tierra_Magica_Manual_Maestro.md` **únicamente en la rama editorial**. No merge a main.

## Casos de aceptación documental

- F-01: crear Hada no habilita Sátiro, Dríade y Silfo a la vez; el encabezado no induce a elegir cuatro ascendencias.
- F-02: Dríade Enraizada en suelo apto recibe +1 circunstancial a Defensa de Maniobra al resistir Derribar; no obtiene +1 contra Empujar.
- F-03: Dríade sin soporte válido no conserva el modificador; liberarse voluntariamente requiere Movimiento.
- T-01: Terio nadador sin branquias ni Anfibio no obtiene respiración acuática.
- M-01: Micelio desconectado requiere nueva Acción de conexión, no recupera enlace automáticamente.
- C-01: Coralio que recorre tierra y agua usa presupuesto fraccional único, no dos reservas.
- K-01: Cristálido sin interfaz especificada no genera energía por sí mismo.

**Resultados:** cotejo documental realizado, 7 casos definidos, 0 casos ejecutados en motor, 0 pruebas de maquetación. No se certifica balance empírico.

## Pendientes

Revisar por separado los matices B5-I05 de Terios en una referencia rápida sin convertirlos en ventaja automática; auditar enlaces del glosario e índices; cerrar el PR tras revisión de su diff total; completar arte autorizado, cartografía, maquetación y PDF de lectura/imprenta. No confundir este expediente con un libro final publicado.
