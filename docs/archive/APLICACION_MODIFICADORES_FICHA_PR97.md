# Auditoría de aplicación de modificadores en la ficha — lote de pulido (sin release)

Estado: **PR borrador #97**, pendiente de comprobación interactiva en Foundry. No cambia el Manual Maestro ni los presupuestos de creación.

## Regla central

Una descripción con «+1 PER» no equivale necesariamente a aumentar el Atributo de la ficha. El Manual Maestro distingue:
- **Modificador permanente**: se incorpora a reglas declarativas/derivados y se refleja siempre.
- **Modificador circunstancial**: el Atributo base queda intacto y el jugador debe declarar que se cumple su condición antes de la tirada. El sistema suma el valor y lo identifica en el chat.
- **Facultad narrativa o acción específica**: sigue necesitando aplicación contextual o adjudicación del DJ; no se convierte en un bono numérico universal.

## Comprobaciones y cambios implementados

| Fuente | Situación | Comportamiento del motor |
| --- | --- | --- |
| Elfo · Sentidos Élficos | +1 PER para detalle natural sutil perceptible por vista u oído | Elegible en tirada de PER con casilla de confirmación; no aumenta PER ni Iniciativa siempre |
| Enano · Sangre de Metal | +1 VIG por toxinas/enfermedad/agotamiento ambiental, +1 Defensa Corporal frente a esos mismos efectos | VIG elegible en tirada; Defensa Corporal resoluble con contexto `racialToxins` |
| Orco · Complexión Orca | +1 FUE para Carga y fuerza bruta frente a objetos inertes | Elegible sólo en tirada de FUE declarada |
| Goblin, Hobgoblin, Bugbear · Ojo para la Oportunidad | +1 a una prueba, una vez por Escena bajo su disparador | Elegible en cualquier prueba, bajo confirmación del jugador/DJ. Uso por Escena se lleva manualmente |
| Ankar · Custodia del Alma | +1 Defensa Mental contra posesión o control directo del alma y casos equivalentes | Resuelve +1 sólo con contexto `racialSoul` |
| Verdante · Adaptación de Bioma | +1 VIG contra exposición del bioma elegido, **sólo** si esa fue la opción; la opción de terreno difícil es alternativa | Elegible en tirada de VIG contextual; declaración de bioma y opción requiere DJ |
| Micelio · Quimiosensibilidad | +1 PER para señales químicas cercanas específicas | Elegible en tirada de PER |
| Coralio · Sentido de Corriente | +1 PER para señales acuáticas determinantes | Elegible en tirada de PER |
| Coralio · Esqueleto Coralino | Protección Natural 1 no acumulable con armadura | Derivado de Protección calculado automáticamente; no dobla con armadura |
| Enano, Hada, Coralio | Escala y Movimiento base | Se toman del paquete racial, sin copia manual |
| Rasgo · Corpulento/Masivo | +4/+8 Vida máxima, no acumulables | Aplicación declarativa en máximos y exclusión de doble adquisición; en legado sólo se aplica Masivo y se informa conflicto |
| Rasgos · Sentido Agudo, Afinidad Sobrenatural, Resistencia Ambiental menor | +1 PER/PER/VIG con condición estrecha | Elegibles sólo con confirmación de la condición; no alteran atributo base |
| Rasgo · Resistencia Ambiental significativa | Ventaja, reemplaza a menor, no es +1 | Usa modo Ventaja cuando se da la condición, no convierte a bono numérico; exclusión en adquisición |
| Equipo y efectos | Modificadores declarativos de Habilidad, defensas o recursos | Objeto físico: sólo equipado. Efecto desactivado: no aplica. El desglose de Habilidad conserva fuente y total |
| Origen y Trasfondo | Familiaridades, idiomas y Facetas | No dan rangos de Habilidad ni +1 ocultos: comportamiento canónico |

## Visualización y flujo de tiradas

- Los medallones de Atributo mantienen su valor **base**. Un distintivo `+1*` informa que hay uno o más bonos circunstanciales disponibles; el asterisco significa que **no se aplican automáticamente**.
- Al tirar el Atributo con ventajas disponibles, la ficha abre el diálogo para elegir cuáles se activan. Las Habilidades permiten elegir Atributo y ventaja en la misma ventana.
- `rollCheck` valida los identificadores y el Atributo real de la tirada; sólo suma las ventajas válidas seleccionadas y muestra su nombre y condición en el chat.
- Las Defensas Mental y Corporal conservan el valor habitual en ficha; el cálculo contextual suma +1 sólo cuando el disparador se transmite expresamente. No se activa contra toda agresión Mental/Corporal.

## Límites que todavía requieren mesa o una fase mecánica posterior

No se promete automatización completa de capacidades **no expresadas como un bono permanente o comprobación de tirada**: Don sin Forma y Rasgos gratuitos del Humano, selección de Linaje/Adaptaciones de Terio, vuelo limitado de Hada, anatomía y cuernos del Sátiro, Escurridizo, Enraizar, acciones de comunicación y percepción narrativa o restricciones de bioma. Continúan documentadas en las fichas raciales. Cada una necesita definición de activación en combate/creación y pruebas específicas antes de afirmarse como mecanizada.

Se recomienda verificar manualmente en Foundry un Elfo con PER 2, un Enano bajo veneno, Ankar ante posesión, un Rasgo de +1 situacional, un equipo con `FlatModifier` equipado/desequipado y Corpulento/Masivo. La CI valida la lógica y estructura, pero **no sustituye una prueba visual real de Foundry**.
