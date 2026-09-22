# Historial de cambios

## 1.0.11

- Auditoría retrospectiva corregida: el umbral `5+VIG` coincide exactamente con la mitad de Vida máxima; sigue siendo informativo y no crea Herida Grave.
- Capacidades de Familiar registradas como Técnicas con coste PD y requisito de Vínculo; se añade modo de control y Coordinación Reactiva.
- Objetivos mágicos se validan antes de gastar Maná; áreas resuelven cada Defensa por separado y deduplican Actores.
- Origen Remoto entra en la ruta real de lanzamiento y exige un token activo del Familiar; no inventa alcance ni línea de efecto.
- Sobrecarga Controlada de dispositivos valida Energía/Caudal, ejecuta la activación y consume Energía sólo en éxito.
- Se retiran campos históricos de Trauma/capacidades de Familiar mediante migración.
- El daño mágico exitoso aplica Vida por objetivo tras Protección/Penetración; el umbral Grave no automatiza lesiones.


## 1.0.10

- Reemplazado el banner de cabecera comprimido por una copia optimizada de alta calidad, evitando el aspecto borroso de la versión anterior.
- La cabecera ahora conserva la proporción real de la ilustración y elimina la franja oscura vacía que aparecía debajo.
- La grilla principal deja de usar mínimos rígidos que empujaban la columna de Defensas fuera de la hoja.
- Habilidades, núcleo central y panel derecho se reparten el ancho real disponible mediante columnas flexibles.
- Las cuatro Defensas se mantienen dentro de su panel incluso al reducir la ventana.
- Estado, Rasgos, Especializaciones y Técnicas ya no pueden ensanchar accidentalmente la columna derecha por sus controles.
- Añadida adaptación por ancho de la propia ficha para reorganizar la columna derecha cuando la ventana sea realmente estrecha.
- Añadida una prueba que impide volver a publicar por error un banner truncado o excesivamente comprimido.
- Sin cambios en reglas, cálculos, datos o acciones del personaje.


## 1.0.9

- Segunda auditoría de Familiares: grados narrativos de vínculo I–IV y arquetipos Compañero, Explorador, Guardián y Místico sin paquetes gratuitos.
- Sentidos Compartidos consume Acción y usa únicamente los sentidos reales del Familiar.
- Comunicación Mejorada y Origen Remoto se formalizan como capacidades específicas, no beneficios automáticos del vínculo.
- Origen Remoto conserva Maná, tirada y Sostenimiento en el personaje; no crea un segundo lanzador.
- Se documentan pruebas de abuso para vuelo, tamaño Diminuto, exploración remota, combate y combinaciones de capacidades.
- Vuelo, tamaño, sentidos y movilidad extraordinaria requieren rasgos/capacidades compatibles y no equivalen a invisibilidad o acceso universal.


## 1.0.8

- Auditoría profunda de Familiares: se formaliza autonomía, personalidad, deseos, comunicación aproximada y alcance narrativo del vínculo.
- Acción Vinculada consume la Reacción del personaje para una acción táctica coordinada significativa; el Familiar no concede un segundo turno completo gratuito.
- Cambiar una orden táctica compleja consume la Acción del personaje; órdenes simples persistentes pueden continuar mientras sigan siendo válidas.
- Llamar mediante el vínculo no teletransporta ni revela coordenadas y no garantiza obediencia.
- Ficha de Familiar ampliada con perfil simplificado, naturaleza, temperamento, deseos, orden actual, rasgos y habilidades.
- Compartir sentidos, origen remoto de hechizos y comunicación superior requieren capacidades específicas; no se concede un segundo depósito completo de Maná.
- A 0 Vida el Familiar queda Incapacitado/herido; muerte y ruptura dependen de su naturaleza y no eliminan automáticamente el Rasgo.


## 1.0.7

- Auditoría arcano-industrial: dispositivos validan Energía y Caudal antes de activarse y descuentan sólo Energía.
- Estados de dispositivo normalizados: Operativo, Dañado y Deshabilitado.
- Sobrecarga Controlada disponible sólo en construcciones compatibles: INT + Ingeniería DF16.
- Éxito de Sobrecarga habilita Caudal efectivo +1 para esa activación y deja el dispositivo Dañado; fallo lo deja Deshabilitado sin activación.
- Sobrecarga nunca crea Energía ni usa Maná personal; Pifias energéticas permanecen contextuales.
- Transferencias y suma de Caudal continúan manuales cuando dependen de infraestructura real.


## 1.0.6

- Auditoría de Rituales: los rituales aparecen en la ficha y pueden resolverse con una única tirada principal de Ritualismo.
- El Director debe disponer y pagar su Maná mínimo; el aporte declarado de asistentes queda limitado por asistentes útiles × máximo por asistente.
- El Maná de asistentes no sustituye el requisito del Director ni se crea automáticamente.
- Foundry informa Caudal requerido y contribuciones, pero no descuenta recursos de otros actores ni valida fuentes/componentes contextuales sin una relación explícita.
- Se evita el exploit de asistentes ilimitados y el +1 acumulativo por participante.


## 1.0.5

- Auditoría de Alquimia: las Fórmulas aparecen en la ficha y pueden consumirse mediante una acción de uso.
- Poción Restauradora/Bálsamo recuperan 4 Vida respetando Vida máxima y límite de recuperación por lesión; Poción de Recuperación Arcana recupera 3 Maná hasta el máximo.
- Las preparaciones Saturantes registran su familia en el Actor y bloquean una segunda aplicación beneficiosa de esa familia.
- Respiro limpia las Saturaciones compatibles sin recuperar Vida ni Maná.
- Cada uso automatizado consume una dosis. Fórmulas de efecto contextual siguen mostrando su descripción sin inventar automatización.


## 1.0.4

- Auditoría de magia: Sobrecarga disponible sólo cuando falta exactamente 1 Maná, queda al menos 1 y el personaje no está Colapsado.
- Sobrecarga usa VOL + Canalización contra DF17, consume el Maná restante y aplica Exhausto; quien ya estaba Exhausto queda Colapsado tras resolver.
- Los hechizos Sostenidos registran efectos activos. Límite normal 1; Doble Sostenimiento permite 2.
- Foundry no permite superar el límite de Sostenimiento mediante una tirada; el usuario debe abandonar un efecto antes de mantener otro.
- Las consecuencias concretas de una Pifia de Sobrecarga permanecen contextuales en manos del Director.
- Contramagia permanece como técnica reactiva contextual y no se convierte en cancelación automática universal.


## 1.0.3

- Auditoría de Vida/Trauma: la primera caída real de Vida positiva a 0 aplica Incapacitado y, si corresponde, Trauma 0→1; caer repetidamente a 0 no incrementa Trauma automáticamente.
- Se distinguen en ficha Respiro (~10 min), Descanso (~1 h) y Descanso completo (~8 h).
- El umbral de Daño Grave sigue siendo una señal para el Director, no una creación automática de Herida Grave.
- Añadidas Poción Restauradora (+4 Vida, familia restaurativa) y Poción de Recuperación Arcana (+3 Maná, familia arcana), ambas Saturantes y sin curar Trauma/Fatiga/Sobrecarga.
- No se añaden penalizadores universales por Trauma ni automatización narrativa de Heridas Graves.


## 1.0.2

- Auditoría de coherencia manual ↔ motor: Defensa de Maniobra vuelve a **11 + AGI + Bono Defensivo**.
- Restauradas las identidades mecánicas consolidadas de armas; se elimina la inflación accidental de daño/Penetración introducida al consolidar 1.0.
- Fórmulas, Rituales y Dispositivos ya exponen en su ficha los campos definidos por el esquema.
- Reparados tests obsoletos del manifiesto 0.9.1 y el nombre `Placas`; la suite pasa a exigir los once tipos de Item de 1.0.
- Sin automatizar decisiones contextuales del Director: Escala, heridas concretas, geometría frontal y consecuencias narrativas siguen siendo deliberadamente manuales.


## 1.0.1

- Resultado extraordinario canónico restaurado: **10+10 conservado = Hazaña** y **1+1 conservado = Pifia**.
- Hazaña/Pifia se evalúan después del éxito o fallo y no sustituyen ese resultado.
- Ventaja/Desventaja sólo consideran los dos dados conservados.
- Retirados definitivamente los umbrales provisionales 18–20 / 2–4.


## 0.9.1

- La cabecera vectorial de v0.9.0 se reemplaza por la **ilustración panorámica aprobada de Tierra Mágica**, con castillo, montañas, dragón, paisaje fantástico, placa central y el lema **Historias que dejan huella**.
- La ilustración se integra como asset optimizado para Foundry en `assets/ui/tierra-magica-banner-final.jpg`.
- La cabecera aumenta su presencia visual y mantiene recorte controlado para conservar el foco en el emblema central.
- Los paneles principales reciben una segunda capa de ornamentación con doble filete, esquina decorativa y mayor profundidad de marco.
- El núcleo central recibe un borde ceremonial reforzado sin modificar la distribución de retrato, atributos ni recursos.
- Las Defensas se refinan para verse menos facetadas y más cercanas a placas/escudos arcano-industriales.
- Estado, Rasgos, Especializaciones y Técnicas incorporan doble filete y detalles de remache coherentes con la nueva cabecera.
- Eliminado el texto decorativo bajo las pestañas laterales para limpiar el gutter derecho y dejar sólo los señaladores.
- Ajustada la posición vertical de las pestañas para acompañar la nueva altura de la cabecera.
- Sin cambios en reglas, cálculos, datos ni acciones de la ficha.


## 0.9.0

- Rediseño visual amplio de la página **Ficha**, basado en la composición aprobada por referencia.
- **TIERRA MÁGICA** deja de ser texto simple y pasa a un emblema gráfico completo con paisaje, castillo, montañas, dragón, placa oscura, dorado y lema **Historias que dejan huella**.
- Cabecera e identidad adoptan una presentación de documento fantástico premium, con pergamino, bronce envejecido y mayor profundidad.
- Paneles de Habilidades, Defensas, Estado, Rasgos, Especializaciones y Técnicas reciben cabeceras azul petróleo con filigrana y acentos arcanos.
- El núcleo central crece y refuerza la composición de astrolabio, constelaciones y relicario del retrato.
- Los siete Atributos incorporan sigilos propios dentro de sus medallones.
- Las Defensas pasan a placas heráldico-arcanas con iconografía propia, claramente distintas de los Atributos.
- Vida, Maná y Desarrollo se integran como instrumentos de color bajo el retrato.
- Movimiento, Acción y Reacción se consolidan como tablero táctico inferior.
- Añadido el lema **EXPLORA · CREA · ENFRENTA · TRASCIENDE** al núcleo de la ficha.
- Las pestañas laterales se amplían y estilizan como señaladores físicos oscuros con bronce, remaches, iconos y pestaña activa en pergamino dorado.
- El gutter derecho se amplía para que las pestañas no queden recortadas.
- Añadido el recurso reusable `assets/ui/sheet-title-hero.svg`.
- Sin cambios en reglas, cálculos ni estructura de datos.


## 0.8.1

- Refinada la cabecera para que la filigrana acompañe a **TIERRA MÁGICA** sin atravesar el título.
- Reducidos y reubicados los ornamentos de esquina para evitar cortes visuales y mantener mejor simetría.
- Añadida una capa de estrellas y geometría arcana tenue al núcleo central para aprovechar el espacio alrededor del retrato sin recargarlo.
- El retrato recibe una segunda capa de profundidad para sentirse más integrado al relicario.
- Los Atributos incorporan un detalle arcano discreto sin aumentar su tamaño.
- Las Defensas dejan de reutilizar visualmente el mismo medallón de Atributos y pasan a una presentación propia de medidores.
- Vida, Maná y Desarrollo se integran mejor como conjunto de recursos.
- Los paneles de Estado, Rasgos, Especializaciones y Técnicas reciben mayor jerarquía editorial.
- Mejorado el contraste de pestañas laterales entre estado activo, inactivo y hover.
- Sin cambios en reglas, cálculos, datos ni distribución funcional de la ficha.


## 0.8.0

- Primera pasada visual integral de la página **Ficha**, sin alterar su estructura ni lógica.
- Nuevo marco general de pergamino con doble línea de bronce, profundidad interior y ornamentos reutilizables en las esquinas.
- Cabecera **TIERRA MÁGICA** reforzada con filigrana central y jerarquía editorial más marcada.
- Campos de identidad refinados para sentirse como parte del documento y no como controles HTML sueltos.
- Paneles principales de la portada rediseñados con marcos, filetes y profundidad coherentes con el lenguaje visual del sistema.
- Núcleo central enriquecido con fondo arcano más profundo, anillos, detalles geométricos y esquinas ornamentales.
- Retrato convertido visualmente en un relicario arcano con marco metálico estratificado.
- Atributos y Defensas usan nuevos medallones reutilizables de bronce y azul petróleo.
- Vida, Maná y Desarrollo adoptan apariencia de placas/instrumentos integrados al núcleo del personaje.
- Movimiento, Acción y Reacción reciben una presentación más cercana a un tablero táctico.
- Señaladores laterales reciben materialidad de cuero/metal, remaches y una pestaña activa más claramente diferenciada.
- Refinados Familiar, listas laterales, botones de descanso y scrollbar para mantener coherencia visual.
- Añadidos recursos SVG reutilizables: filigrana, esquina ornamental y medallón de atributo.


## 0.7.1

- Restaurado el marco superior de la ventana de Foundry para que el título del Actor y los controles de cabecera permanezcan claramente visibles.
- La cabecera nativa se alinea con el ancho real de la hoja y ya no se extiende por detrás de los señaladores laterales.
- Eliminado el marco y la sombra externos del contenedor de aplicación en la franja reservada a las pestañas.
- La zona a la derecha de la hoja queda transparente: únicamente aparecen las orejas/señaladores, sin un rectángulo de ventana detrás.
- Añadida una pequeña separación entre la cabecera de Foundry y la hoja para distinguir ambas capas visuales.


## 0.7.0

- La página **Habilidades** pasa a mostrar el desglose completo de cada valor final: Rango, Especialización, Equipo, Técnica, Magia, Rasgo, modificador Temporal y Otros.
- Cada Habilidad dispone de un modificador **Temporal** editable y un modificador manual **Otros**, sin contaminar la vista rápida de la página Ficha.
- Añadido botón **Limpiar temporales** para poner en cero todos los modificadores temporales del personaje.
- Armas, armaduras, escudos, equipo, hechizos, técnicas, rasgos y especializaciones pueden aportar modificadores estructurados a Habilidades concretas.
- Los modificadores de equipo sólo se aplican cuando el objeto está equipado; los modificadores mágicos pueden activarse o desactivarse desde la ficha del hechizo.
- Cada fuente automática aparece identificada por nombre, tipo, motivo y valor, y puede abrirse directamente desde la página Habilidades.
- El valor mostrado en la página Ficha, la página Habilidades y las tiradas usa el mismo **TOTAL** calculado.
- El diálogo de tirada y la tarjeta de chat muestran el desglose mecánico aplicado a la Habilidad.
- Añadido editor genérico de **Modificadores de Habilidad** a las fichas de Item.
- No se inventan penalizadores automáticos por Trauma, Fatiga u otros estados mientras esas reglas no estén definidas en el sistema; pueden representarse mediante Temporal/Otros o mediante una fuente estructurada.


## 0.6.0

- Nueva separación entre **Habilidades de uso rápido** y **gestión de Habilidades**.
- La página **Ficha** muestra una lista continua de Habilidades sin categorías, sin desplegables y sin controles de edición; cada fila sirve únicamente para realizar la tirada.
- Aumentado el tamaño y contraste de nombres y bonos en la lista rápida.
- Recuperada la pestaña lateral **Habilidades** como una página independiente.
- La página **Habilidades** muestra todas las categorías abiertas, el rango editable, el bono y un acceso directo a la tirada.
- Especializaciones y Técnicas se muestran también en la página Habilidades como información relacionada con el entrenamiento.
- La edición de rangos queda concentrada en la página Habilidades, evitando controles redundantes en la portada.
- Ajustado el señalador lateral de Habilidades para mantener legible su texto sin alterar el diseño externo de las pestañas.


## 0.5.1

- Las pestañas laterales ahora quedan visualmente **fuera del marco de la hoja**, usando un margen transparente reservado dentro de la ventana.
- La forma de las pestañas se invierte: borde recto junto a la hoja y extremo redondeado hacia afuera.
- La pestaña activa sobresale hacia el exterior en lugar de meterse sobre el contenido.
- Corregidos dos selectores CSS que no podían aplicarse correctamente porque buscaban `.window-content` y `form` como descendientes del propio formulario.
- El fondo de la ventana de la ficha de personaje queda transparente en la zona reservada a los señaladores, evitando que el marco beige parezca extenderse hasta ellos.


## 0.5.0

- Nueva **Ficha de Personaje Tierra Mágica v0.3 — Compacta**.
- Cabecera reducida a **TIERRA MÁGICA** centrado y dorado, sin subtítulos técnicos ni duplicación del Nivel.
- Identidad del personaje comprimida para recuperar espacio vertical.
- Vida, Maná y Desarrollo trasladados al núcleo central bajo el retrato.
- Movimiento, Acción y Reacción quedan visibles dentro del núcleo central y pueden marcarse como gastados.
- Fuerza y Vigor se reposicionan hacia arriba para liberar la zona inferior del retrato.
- Habilidades siempre visibles por categoría, sin acordeones, menús de sección ni contadores de cantidad.
- Pestaña separada de Habilidades eliminada para evitar redundancia: las Habilidades viven en la página Ficha.
- Navegación trasladada al borde derecho mediante pestañas tipo señaladores de libro: Ficha, Combate, Magia, Desarrollo, Equipo e Historia.
- Atributos con mayor contraste y números más legibles.
- El cuerpo de la ficha usa scroll general para que toda la hoja pueda recorrerse sin quedar contenido inaccesible.
- Rasgos, Especializaciones y Técnicas permanecen visibles como paneles compactos en la columna derecha.


## 0.4.0

- Nueva **Ficha de Personaje Tierra Mágica v0.2 — Visual y Usabilidad**.
- Retrato central reforzado con astrolabio arcano, siete Atributos y una composición más cercana a una ficha ilustrada de manual.
- Habilidades agrupadas por Físicas, Exploración, Sociales, Conocimiento, Técnicas, Combate, Magia y Operación.
- Paneles de Rasgos, Especializaciones y Técnicas plegables para aprovechar mejor el espacio.
- Barras visuales de Vida y Maná con controles rápidos.
- Economía de turno interactiva: Movimiento, Acción y Reacción pueden marcarse como disponibles o gastados y restablecerse con un clic.
- Panel de Desarrollo con PD totales, gastados y disponibles.
- Pestaña de Magia rediseñada con las seis Disciplinas y una presentación editorial propia.
- El bloque de Familiar abre el Familiar vinculado cuando existe y evita crear duplicados.
- Nuevo recurso gráfico arcano reutilizable y estilos adaptativos para ventanas de distintos tamaños.


## 0.3.2

- Corregido el guardado de rangos de Habilidad cuando la misma Habilidad aparece en más de una vista de la ficha.
- Corregido el guardado de Nivel y PD gastados entre la cabecera y la pestaña Desarrollo.
- Añadida reparación automática para personajes afectados por v0.3.1 que almacenaron esos valores como listas.
- Los controles repetidos ahora actualizan el Actor directamente y dejan de generar valores duplicados en el formulario.


## 0.3.1

- Integración de **Ficha de Personaje Tierra Mágica v0.1** para actores `character`.
- Nueva vista principal con retrato central, siete Atributos alrededor del personaje, Habilidades compactas, Defensas, Estado, Magia y paneles de desarrollo.
- La ficha reutiliza las rutas de datos y acciones existentes del sistema; PNJ y Familiares conservan su ficha anterior.
- Los estilos de la ficha quedan separados en `styles/character-sheet-v01.css` para permitir iteración visual sin alterar la interfaz base.

## 0.2.0

- Adaptación del sistema a los documentos originales de Tierra Mágica.
- Ocho características y treinta y siete habilidades secundarias.
- Creación guiada con diez razas y cuatro profesiones.
- Actores específicos para Compañeros Familiares.
- Vida, Maná, Destino, Letalidad, resistencia mágica y progresión hasta nivel 10.
- Biblioteca integrada de conjuros, estilos de combate y beneficios de familiar.
- Tiradas configurables con dificultad y grados de éxito.
- Consumo de Maná, descansos y gestión rápida de recursos.
- Migración automática desde la versión 0.1.0.

## 0.1.0

- Primera base instalable para Foundry VTT v14.
- Fichas de personaje y PNJ.
- Cinco atributos y quince habilidades.
- Vida, Maná y Aguante.
- Defensas e iniciativa calculadas.
- Inventario con armas, armaduras, equipo, hechizos y talentos.
- Tiradas de atributos, habilidades, ataques, daño y magia.
- Interfaz en español con estética propia de Tierra Mágica.
- Pruebas automáticas de reglas y estructura del manifiesto.
