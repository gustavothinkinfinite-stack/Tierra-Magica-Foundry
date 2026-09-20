# Historial de cambios

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
