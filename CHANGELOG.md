# Historial de cambios

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
