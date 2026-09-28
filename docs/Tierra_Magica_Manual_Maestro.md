# Tierra Mágica — Manual Maestro Único de Trabajo

> **FUENTE ÚNICA ACTIVA DE DISEÑO Y EDICIÓN.** Desde esta consolidación, este archivo es la guía operativa única para construir, revisar y preparar el libro de **Tierra Mágica / Foundry T.M.**. Las reglas vigentes, el canon narrativo vigente, el material editorial y el archivo de recuperación se reúnen aquí. Los documentos anteriores permanecen sólo como respaldo histórico en Git/GitHub y no deben volver a usarse como autoridad paralela.

## 0. Cómo usar este documento

### Regla de fuente única

Toda decisión nueva que afecte reglas, creación de personaje, magia, equipo, Familiares, mundo, religiones, pueblos, economía o cualquier otra parte del juego debe incorporarse **primero en este archivo**. Foundry VTT, referencias rápidas, hojas, PDFs, DOCX y futuras maquetas son derivados: implementan o presentan lo definido aquí, pero no crean canon por sí mismos.

Si se descubre una contradicción, no se corrige silenciosamente en otro documento. Se corrige aquí, se registra el motivo en Git y después se propaga a la implementación.

### Protección contra pérdida de información

Ninguna fuente histórica vuelve a eliminarse por considerarse «vieja» hasta comprobar que su contenido útil está integrado o archivado dentro de este Manual. El historial de Git constituye el respaldo de versiones anteriores.

Este Manual distingue tres clases de contenido:

1. **VIGENTE:** regla o canon que se usa para jugar y desarrollar.
2. **EN DESARROLLO:** material que puede evolucionar, pero está aquí para trabajarse.
3. **ARCHIVO RECUPERADO / NO NORMATIVO:** texto histórico conservado para que ninguna idea se pierda; no prevalece sobre el contenido vigente hasta ser ratificado e integrado.

### Fuentes recuperadas revisadas

| Fuente | Estado dentro de este Manual |
|---|---|
| Manual Básico v0.2 Playtest — Panteón Unificado — Rev. Familiares | Fuente principal de recuperación de redacción extensa, mitología y material histórico. Sus mecánicas incompatibles con 1.0 no se reintroducen. |
| Manual Básico v0.2 Playtest — Panteón Unificado | Sustituido por la revisión de Familiares; no aporta contenido vigente adicional que justifique una segunda fuente. |
| Manual Básico v0.1 Playtest — Panteón Primordial | Antecedente histórico; su contenido útil está contenido o superado por v0.2 Rev. |
| Manual Básico v0.1 Playtest — Actualizado Eïra | Antecedente histórico; su desarrollo útil de Eïra está contenido o superado por v0.2 Rev. |
| Manual Básico v0.1 Playtest | Antecedente histórico; sustituido por versiones posteriores. |
| Canon del Mundo v1.2 — Panteón Unificado | Canon narrativo vigente. Su contenido completo se integra en la Parte II. |
| Canon del Mundo v1.1 — Panteón Unificado | Sustituido por v1.2; no contiene desarrollo sustantivo exclusivo que deba prevalecer. |
| Manual Básico 1.0 + auditorías 1.0.14 de GitHub | Autoridad mecánica usada para corregir y consolidar el núcleo vigente en la Parte I. |

### Estructura de trabajo

- **Parte I:** reglas y procedimientos vigentes para jugar.
- **Parte II:** Canon del Mundo v1.2 integrado íntegramente como referencia narrativa.
- **Parte III:** archivo narrativo recuperado del manual largo v0.2; preserva detalle todavía no ratificado o pendiente de edición.
- **Estado de consolidación:** indica qué está cerrado, qué requiere edición y qué material del archivo recuperado debe decidirse antes de la edición impresa.

---

## Estructura objetivo del libro

1. Qué es Tierra Mágica y principios de diseño
2. Regla fundamental y resolución
3. Creación de personaje paso a paso
4. Desarrollo, niveles, Atributos, Habilidades y Especializaciones
5. Rasgos y PR
6. Turno, acciones y movimiento
7. Escala, maniobras y estados
8. Combate, armas, armaduras y escudos
9. Vida, heridas, Trauma y recuperación
10. Magia: Fuentes, Disciplinas, Maná, Sobrecarga y Sostenimiento
11. Grimorio estable
12. Técnicas
13. Familiares, vínculos e invocaciones
14. Ritualismo
15. Alquimia
16. Ingeniería arcano-industrial
17. Proyectos, fabricación e investigación
18. Equipo, economía y disponibilidad
19. Pueblos, herencias, culturas y orígenes
20. Vehículos, monturas y autómatas
21. PNJ, criaturas y dirección de juego
22. Mundo, historia, geografía, instituciones y conflictos
23. Mitología, Panteón Central y religiones
24. Referencia rápida, glosario e índices

# PARTE I — REGLAS VIGENTES Y GUÍA DE JUEGO

## 1. Qué es Tierra Mágica

Tierra Mágica es un juego de rol de fantasía medieval arcano-industrial. La magia forma parte de la sociedad y convive con tecnología de vapor, ingeniería arcana, armas tradicionales, criaturas fantásticas, dioses, pactos y familiares mágicos.

El sistema busca personajes heroicos sin convertir la progresión en inflación automática de números. Un veterano amplía sus opciones, conocimiento y capacidades, pero una amenaza físicamente seria continúa siendo relevante. Defensa, Protección, posición, Reacciones, preparación, conocimiento y consecuencias importan.

### Principios de diseño

- Consistencia interna antes que simulación exhaustiva.
- Sólo se tira cuando existe incertidumbre significativa.
- La ficción determina primero qué es posible y qué competencia se requiere.
- Las decisiones tácticas ocurren principalmente antes de tirar.
- Los modificadores numéricos se mantienen contenidos; normalmente el total circunstancial queda entre -3 y +3.
- Ventaja y Desventaja expresan cambios importantes sin apilar bonos indefinidamente.
- El nivel no concede un bono universal.
- El dinero compra recursos del mundo; los PD y PR representan desarrollo del personaje según sus reglas propias.
- Una tirada alta no concede conocimiento, competencia ni posibilidad física que el personaje no posee.
- Se reutiliza el mismo motor siempre que sea razonable y se evitan recursos secundarios innecesarios.

## 2. Regla fundamental

Una prueba usa:

**2d10 + Atributo + Habilidad + modificadores >= DF**

Si el total alcanza o supera la Dificultad, la acción tiene éxito. Si queda por debajo, falla. No se tira para una tarea rutinaria que un personaje competente pueda resolver con tiempo, herramientas y condiciones adecuadas. Tampoco se tira para volver posible algo que la ficción establece como imposible.

### Dificultades

| DF | Referencia |
|---:|---|
| 8 | Muy favorable bajo presión |
| 10 | Sencilla |
| 12 | Moderada |
| 14 | Demandante |
| 16 | Difícil |
| 18 | Muy difícil |
| 20 | Extraordinaria |
| 22 | Heroica |
| 24+ | Sobrenatural |

### Ventaja y Desventaja

Con Ventaja se tiran 3d10 y se conservan los dos dados más altos. Con Desventaja se conservan los dos más bajos. Varias fuentes de Ventaja no se acumulan entre sí y lo mismo ocurre con Desventaja. Una Ventaja y una Desventaja se cancelan.

### Hazañas y Pifias

Una **Hazaña** ocurre cuando los dos dados conservados muestran 10 y 10 naturales. Una **Pifia** ocurre cuando muestran 1 y 1 naturales. Con Ventaja o Desventaja sólo cuentan los dados finalmente conservados.

Primero se determina éxito o fallo por el total y después se interpreta el resultado extraordinario. Una Hazaña no convierte automáticamente un fallo en éxito y una Pifia no convierte automáticamente un éxito en fallo.

### Margen y grados de resultado

Cuando una regla necesita medir el margen: Ajustado 0-4; Claro 5-9; Dominante 10+. El margen no tiene que calcularse en todas las pruebas.

### Ayuda

La ayuda requiere un contribuyente significativo, competencia o método apropiado y una situación en la que ayudar sea realmente posible. Normalmente concede Ventaja. Varias personas ayudando no generan dados adicionales indefinidamente.

### Repetición

Una prueba idéntica no se repite hasta que exista un cambio significativo: más tiempo, herramientas distintas, información nueva, ayuda pertinente, otra posición, otro método o aceptación de un riesgo/coste diferente.

### Pruebas enfrentadas

Se reservan para competencia directa entre dos actores cuando no existe una defensa pasiva adecuada. Ambos realizan la prueba pertinente y gana el total mayor. En empate se compara el bono relevante; si persiste, prevalece el statu quo o el defensor según la situación.

### Flujo de resolución

Cuando una acción requiere resolución completa, el orden general es: declarar la intención; pagar costes obligatorios; comprobar requisitos; resolver Reacciones válidas; realizar la prueba si corresponde; determinar éxito/fallo y Hazaña/Pifia; aplicar efectos; aplicar consecuencias. Los costes ya pagados no se reembolsan por fallar salvo regla expresa.

## 3. Creación de personaje paso a paso

La creación de personaje debe poder completarse leyendo únicamente este Manual. La base común es **25 PD + 3 PR + PEI 20 o + Reserva líquida 2 o**, siete Atributos y una identidad narrativa libre de clases obligatorias.

### Resumen del proceso

1. Definir concepto, pueblo/herencia, cultura y origen narrativo.
2. Repartir los siete Atributos.
3. Gastar los 25 PD en Habilidades, Especializaciones, Técnicas, Disciplinas y Hechizos.
4. Gastar los 3 PR en Rasgos.
5. Si posee Familiar Mágico, definir la naturaleza del vínculo y el perfil simplificado del Familiar.
6. Seleccionar equipo con PEI 20 o; al cerrar la preparación material, recibir una Reserva líquida de 2 o.
7. Calcular valores derivados.
8. Revisar límites de creación y anotar capacidades, idiomas, contactos y detalles narrativos.
9. Realizar una comprobación final de coherencia.

### Paso 1 — Concepto, pueblo/herencia y origen

Primero define quién es el personaje: qué hace, de dónde viene, qué desea, qué relaciones importantes posee y qué lugar ocupa en Tierra Mágica.

**Pueblo, herencia, cultura y Origen son identidad narrativa y no entregan paquetes mecánicos gratuitos.** No conceden por sí mismos Atributos, Habilidades, PD, PR, Defensa, Vida, Maná, acciones, Técnicas ni competencias. Si una propiedad física o sobrenatural debe tener efecto mecánico —por ejemplo visión especial, respiración acuática, vuelo natural, corpulencia o resistencia ambiental— se representa con las reglas universales apropiadas, principalmente **Rasgos, Escala, equipo, Habilidades o Técnicas**. No se paga dos veces por una misma propiedad.

Un origen militar, académico, religioso, gremial, criminal, rural o privilegiado puede justificar conocimientos, contactos, licencias o elecciones de equipo, pero esas ventajas deben respetar los presupuestos normales de creación. Un origen religioso no concede automáticamente Vínculo Divino; uno arcano-industrial no concede dispositivos excepcionales gratis.

### Paso 2 — Atributos

Los siete Atributos son:

| Atributo | Significado principal |
|---|---|
| **FUE — Fuerza** | Potencia física, carga, fuerza aplicada, armas que dependen de fuerza, agarres y empujes. |
| **AGI — Agilidad** | Coordinación, precisión corporal, equilibrio, acrobacia, sigilo y parte de la Defensa. |
| **VIG — Vigor** | Resistencia, salud, fatiga, toxinas y capacidad para soportar daño. |
| **INT — Intelecto** | Razonamiento, aprendizaje, conocimientos, ingeniería y comprensión mágica. |
| **PER — Percepción** | Sentidos, atención, observación, iniciativa y usos de precisión cuando el método lo justifica. |
| **VOL — Voluntad** | Resistencia mental/espiritual, concentración, control y reserva de Maná. |
| **PRE — Presencia** | Influencia social, liderazgo, persuasión, engaño e intimidación. |

Todos comienzan en **1**. Distribuye **6 aumentos** entre ellos. El máximo inicial normal es **3**. Como comprobación, un personaje ordinario recién creado suma 13 puntos totales de Atributo antes de efectos extraordinarios: siete puntos de base más seis aumentos.

Escala de referencia: 0 deficiente, 1 adulto normal, 2 notable, 3 excepcional, 4 élite, 5 límite natural y 6+ sobrenatural.

### Paso 3 — Presupuesto profesional: 25 PD

Los **Puntos de Desarrollo (PD)** compran aprendizaje, entrenamiento y capacidades. No compran equipo ni sustituyen PR.

Durante creación se dispone de **25 PD**. Se pueden gastar en:

- Habilidades.
- Especializaciones.
- Técnicas.
- Disciplinas mágicas.
- Hechizos.

Durante la creación puede existir como máximo **una Habilidad en rango Experto**.

#### Habilidades

Las 26 Habilidades son:

**Físicas:** Atletismo, Acrobacia, Sigilo.  
**Exploración:** Supervivencia, Naturaleza, Investigación.  
**Sociales:** Persuasión, Engaño, Intimidación, Empatía.  
**Conocimiento:** Historia, Religión, Medicina, Arcana.  
**Técnicas:** Artesanía, Ingeniería, Alquimia, Latrocinio.  
**Combate:** Armas Ligeras, Armas Marciales, Armas Pesadas, Armas a Distancia.  
**Magia:** Canalización, Ritualismo.  
**Operación:** Manejo, Pilotaje.

| Rango | Bono | Coste del paso | Coste acumulado |
|---|---:|---:|---:|
| Sin Entrenar | +0 | — | 0 PD |
| Aprendiz | +1 | 1 | 1 PD |
| Entrenado | +2 | 2 | 3 PD |
| Experto | +4 | 4 | 7 PD |
| Maestro | +6 | 6 | 13 PD |
| Gran Maestro | +8 | 8 | 21 PD |

Atributo y Habilidad no están emparejados de forma permanente. El Atributo describe **cómo** se intenta algo; la Habilidad, **qué competencia** se aplica. La ficción puede justificar combinaciones diferentes.

#### Especializaciones

Una Especialización cuesta normalmente **2 PD**. Representa dominio profundo dentro de una Habilidad y no concede un bono numérico universal por sí sola. Sirve para justificar conocimiento especializado, procedimientos, prerrequisitos y Técnicas cuando corresponda.

Ejemplos: Espadas, Hachas, Lanzas; Cirugía, Traumatología, Toxicología; Vapor, Autómatas, Armamento; Bosque, Montaña, Desierto; Pociones, Venenos, Explosivos.

#### Técnicas

Costes normales: **Básica 2 PD, Avanzada 3 PD, Maestra 5 PD, Legendaria 8+ PD**. Cada Técnica establece sus propios requisitos. El catálogo vigente se encuentra en el capítulo de Técnicas.

#### Magia, Disciplinas y Hechizos

La magia es opcional. No existe una clase de mago obligatoria.

Las Fuentes son **Alma, Divina, Ambiental y Externa**. Las Disciplinas son **Evocación, Alteración, Restauración, Percepción, Influencia y Conjuración**.

Una Disciplina cuesta normalmente **3 PD**. Los Hechizos cuestan por grado **1 PD Menor, 2 PD Básico, 3 PD Avanzado, 5 PD Maestro y 8+ PD Legendario**. Aprender un hechizo y pagar su Maná al lanzarlo son economías distintas.

El catálogo mecánico estable del núcleo contiene 18 hechizos y se encuentra en el capítulo de Grimorio. No se obtienen versiones gratuitas mediante nombres históricos o variantes narrativas.

### Paso 4 — Rasgos: 3 PR

Los **Puntos de Rasgo (PR)** son una economía separada. En creación se dispone de **3 PR**. PD y PR no se convierten entre sí.

Referencia de costes: Menor 1 PR, Significativo 2 PR, Mayor 3 PR, Excepcional 4+ PR. Los Rasgos negativos no generan PR adicionales.

Catálogo de referencia vigente:

- Sentido Agudo — 1 PR.
- Visión en la Oscuridad — 2 PR.
- Anfibio — 1 PR.
- Trepador Natural — 1 PR.
- Cola Prensil — 1 PR.
- Miembros Extra — 2 PR; no concede acciones adicionales.
- Vuelo Natural — 4 PR; excepcional.
- Corpulento — 2 PR; +4 Vida.
- Masivo — 3 PR; +8 Vida; no acumulable con Corpulento.
- Vínculo Divino — 2 PR; concede acceso, no poder automático.
- Familiar Mágico — 2 PR.
- Pacto Externo — 2–3 PR.
- Prótesis Mayor — 2+ PR.
- Afinidad Sobrenatural — 1 PR.
- Resistencia Ambiental — 1–2 PR.

Si el concepto del personaje exige una propiedad fisiológica extraordinaria para existir coherentemente en la ficción, esa propiedad debe quedar representada de forma explícita; el Director puede exigir el Rasgo apropiado. Una misma propiedad no se cobra dos veces.

### Paso 5 — Familiar, si corresponde

**Familiar Mágico cuesta 2 PR.** El Familiar es una criatura independiente con voluntad, personalidad y naturaleza propias, no un segundo PJ gratuito.

Durante creación debe registrarse al menos:

- nombre y naturaleza;
- apariencia;
- Escala;
- Movimiento;
- Vida;
- Defensa;
- Protección;
- Ataque;
- Percepción;
- Voluntad;
- Rasgos corporales relevantes;
- capacidades de vínculo adquiridas, si las hubiera;
- modo de control aplicable.

El perfil es simplificado y debe corresponder a la naturaleza concreta del Familiar. El Familiar no recibe por defecto una segunda reserva completa de Maná, Acción o Reacción para el propietario. Las capacidades avanzadas del vínculo se adquieren con PD y están descritas en el capítulo de Familiares.

**Nota de desarrollo:** este Manual conserva la estructura de perfil ratificada, pero no fija todavía una plantilla numérica universal para todos los tipos posibles de Familiar. Cuando se diseñe una criatura concreta, sus valores deben quedar escritos en el propio perfil y auditados contra la economía de acciones; no se asumen valores gratuitos por especie o arquetipo.

### Paso 6 — Equipo inicial, PEI y Reserva

La preparación material utiliza **PEI 20 o = 2.000 c**. El PEI es presupuesto de creación, no dinero del personaje: no puede convertirse en PD, PR, Reserva ni efectivo posterior.

Elige **exactamente una** modalidad:
- un **Paquete de Preparación** cerrado; o
- **Compra libre** dentro del catálogo permitido y hasta el máximo de PEI.

Paquete y Compra libre son alternativas excluyentes. Si un Paquete vale menos de 20 o, el sobrante no puede gastarse mediante Compra libre y se pierde al cerrar la preparación. El Equipo Personal Básico y, cuando corresponda, el Vínculo de Equipo del Trasfondo se gestionan conforme a CREA-08 y no se convierten en dinero.

Después de cerrar el inventario inicial se descarta cualquier PEI restante y el personaje recibe una sola vez una **Reserva líquida de 2 o = 200 c**. Esa Reserva ya es dinero y puede gastarse normalmente después de comenzar el juego.

La moneda mecánica usa **10 c = 1 p; 10 p = 1 o; 100 c = 1 o**. c/p/o normaliza valor de juego; no elimina las monedas regionales del canon. Precio, Disponibilidad y acceso social/legal siguen siendo comprobaciones independientes.

### Paso 7 — Valores derivados

Calcula:

| Valor | Fórmula / referencia |
|---|---|
| **Vida** | 10 + 2 × VIG |
| **Maná** | 6 + 3 × VOL |
| **Defensa** | 11 + AGI + Bono Defensivo aplicable + equipo/modificadores |
| **Defensa Corporal** | 11 + VIG |
| **Defensa Mental** | 11 + VOL |
| **Defensa de Maniobra** | 11 + AGI + Bono Defensivo aplicable |
| **Iniciativa** | 2d10 + PER + modificadores |
| **Movimiento** | 6 como referencia para humanoide Mediano, salvo regla corporal concreta |
| **Escala** | Mediana como referencia humana; otra Escala sólo cuando la ficción y reglas del personaje lo establezcan |

El **umbral informativo de Daño Grave** es 5 + VIG, equivalente a la mitad de la Vida máxima ordinaria. Alcanzarlo no crea automáticamente una Herida Grave: obliga a evaluar si el impacto y la ficción justifican una lesión concreta.

### Paso 8 — Identidad y datos narrativos

Anota al menos:

- nombre;
- pueblo/herencia y descripción física;
- lugar/cultura de origen;
- idioma(s) que la ficción establezca;
- profesión, oficio o trayectoria;
- motivación;
- vínculos, contactos y obligaciones relevantes;
- Fuente mágica, juramento, pacto o relación religiosa si corresponde;
- relación con el Familiar si posee uno.

Estos datos pueden abrir o cerrar posibilidades narrativas, pero no entregan bonos ocultos fuera de las reglas.

### Paso 9 — Lista de comprobación final

Antes de dar por terminado el personaje:

- Los siete Atributos comenzaron en 1 y sólo recibieron 6 aumentos.
- Ningún Atributo supera 3 por creación ordinaria.
- Se gastaron como máximo 25 PD.
- Hay como máximo una Habilidad en Experto.
- Técnicas, Disciplinas y Hechizos cumplen sus costes y requisitos.
- Se gastaron como máximo 3 PR.
- Los Rasgos negativos no financiaron PR adicionales.
- Pueblo/Origen no añadió recursos mecánicos gratuitos.
- El equipo respeta el PEI de 20 o, la alternativa Paquete/Compra libre, la disponibilidad y el acceso; la Reserva líquida de 2 o se mantiene separada.
- Vida, Maná y Defensas fueron recalculados después de equipo y Rasgos.
- Familiar, magia y equipo no generan Acciones, Reacciones, Maná o bonos no escritos.
- Todo lo que produzca un efecto mecánico aparece expresamente en la ficha.

### Ejemplo mínimo de flujo

Un jugador decide crear una exploradora arcana. Define primero su identidad y procedencia sin recibir bonos gratuitos. Reparte los 6 aumentos de Atributo, después distribuye sus 25 PD entre Habilidades, una Especialización, una Disciplina y Hechizos del catálogo. Gasta sus 3 PR en propiedades persistentes del personaje, selecciona equipo con PEI 20 o, cierra la preparación material, recibe su Reserva líquida de 2 o y finalmente calcula Vida, Maná, Defensas, Iniciativa y Movimiento. Si una elección no aparece como coste, Rasgo, Técnica, Hechizo, equipo o regla explícita, no se transforma en bono por inferencia.

## 4. Desarrollo

Tierra Mágica no usa clases. La identidad mecánica surge de Atributos, Habilidades, Especializaciones, Técnicas, Hechizos y Rasgos. Los arquetipos, cuando existan, son referencias y no paquetes obligatorios.

El nivel 1 comienza con 25 PD. Cada nivel del 2 al 20 concede 4 PD, para un total acumulado de 101 PD al nivel 20. No existe bono universal por nivel. Maestro requiere normalmente nivel 9+ y Gran Maestro nivel 15+.

Una Especialización cuesta 2 PD. Las Técnicas cuestan normalmente 2 PD Básica, 3 Avanzada, 5 Maestra y 8+ Legendaria. Los Hechizos siguen 1 PD Menor, 2 Básico, 3 Avanzado, 5 Maestro y 8+ Legendario. Una Disciplina cuesta 3 PD. Los aumentos post-creación de Atributo cuestan 4/6/9/13/18 PD para 0->1, 1->2, 2->3, 3->4 y 4->5 respectivamente. Los valores 6+ son sobrenaturales y no pertenecen a la progresión ordinaria.

## 5. Rasgos y Puntos de Rasgo

Los Rasgos representan propiedades persistentes del personaje que no encajan como entrenamiento ordinario. En creación se dispone de **3 PR**, separados de los PD. Los PR y los PD no se convierten entre sí. Un Rasgo puede ser Innato, Adquirido, de Vínculo o Condicional. Como referencia, un Rasgo Menor cuesta 1 PR, Significativo 2, Mayor 3 y Excepcional 4+. Los rasgos negativos no generan PR adicionales.

Catálogo de referencia: Sentido Agudo 1 PR; Visión en la Oscuridad 2; Anfibio 1; Trepador Natural 1; Cola Prensil 1; Miembros Extra 2, sin conceder acciones adicionales; Vuelo Natural 4 y de carácter excepcional; Corpulento 2, +4 Vida; Masivo 3, +8 Vida y no acumulable con Corpulento; Vínculo Divino 2, que concede acceso y no poder automático; Familiar Mágico 2; Pacto Externo 2–3; Prótesis Mayor 2+; Afinidad Sobrenatural 1; Resistencia Ambiental 1–2.

## 6. Turno, movimiento y posición

En su turno una criatura dispone normalmente de **Movimiento + Acción + Reacción**. El Movimiento puede dividirse antes y después de la Acción cuando la situación lo permite. La Reacción se recupera al inicio del turno propio; una Reacción no utilizada se pierde al ser reemplazada por la nueva. Una capacidad que conceda varias Reacciones especifica cuántas pueden utilizarse entre dos turnos propios. La misma Reacción no se repite sobre el mismo disparador salvo regla expresa.

Un humanoide Mediano tiene como referencia Movimiento 6, aproximadamente 9 metros por turno. AGI no aumenta automáticamente el Movimiento. Correr requiere la Acción y añade otro tramo equivalente al Movimiento base. El terreno difícil cuesta 2 puntos de Movimiento por cada espacio recorrido. Levantarse desde Derribado cuesta normalmente 2 puntos.

Las bandas narrativas de distancia son Contacto, Cerca, Media, Lejos y Extrema. Cuando se usa cuadrícula, la geometría concreta prevalece. La cobertura parcial concede normalmente +2 Defensa; una cobertura total impide ser objetivo directo si no existe una línea válida. Tierra Mágica no concede un bono universal por rodear a un enemigo.

### Guardia, Preparar y Retrasar

**Guardia** es universal: Acción, +2 Defensa hasta el inicio del siguiente turno propio y conserva la Reacción.

**Preparar** consume la Acción para declarar una respuesta y un disparador observable. Cuando el disparador ocurre, se utiliza la Reacción para resolver la respuesta. Preparar un ataque requiere una capacidad que lo habilite, como Tirador Preparado. La preparación expira al inicio del siguiente turno propio. Una respuesta reactiva no dispara otra respuesta ofensiva reactiva salvo regla expresa.

**Retrasar** desplaza el turno a un momento posterior de la ronda. La criatura conserva esa nueva posición de iniciativa y nunca obtiene dos turnos por retrasar.

## 7. Escala y maniobras

Las categorías de Escala son **Diminuta, Pequeña, Mediana, Grande, Enorme y Colosal**. No conceden bonos genéricos a ataque, Defensa o daño. Como referencia espacial: Diminuta ocupa menos de un espacio; Pequeña y Mediana uno; Grande 2x2; Enorme 3x3; Colosal 4x4 o más.

Una diferencia de una categoría puede permitir interacción física directa según la ficción. Con dos categorías de diferencia, la criatura menor normalmente no puede imponer fuerza corporal directa a la mayor sin palanca, posición o capacidad apropiada. Con tres o más, la fuerza corporal convencional suele ser insuficiente.

La **Defensa de Maniobra** es 11 + AGI + Bono Defensivo aplicable. Derribar, Empujar y Agarrar inicialmente se resuelven contra ella.

Una Presa establecida tiene una **DF de Presa = 11 + FUE del atacante + bono reducido de Atletismo**. El bono reducido es 0 para Sin Entrenar/Aprendiz, 1 Entrenado, 2 Experto, 3 Maestro y 4 Gran Maestro; Presa Entrenada, si una capacidad la concede, añade +1. Escapar requiere una Acción y una prueba apropiada, normalmente FUE + Atletismo o AGI + Acrobacia, contra la DF de Presa.

Una criatura Agarrada tiene Movimiento 0 para alejarse del agarre. Puede realizar acciones físicamente plausibles, pero las que requieran libertad corporal pueden sufrir Desventaja o resultar imposibles. Una criatura de la misma Escala puede desplazar a una víctima agarrada aproximadamente a la mitad de su Movimiento cuando anatomía, fuerza y posición lo permiten.

**Potencia Sobrenatural** no cambia la Escala real: permite interactuar físicamente como una categoría mayor. No aumenta FUE, tamaño, alcance, Defensa, armas ni resistencias y no se acumula con equivalentes.

## 8. Combate

Un ataque usa **2d10 + Atributo pertinente + Habilidad de arma + modificadores >= Defensa**. El Atributo depende del arma y del método. Las armas de fuego, ballestas y otros mecanismos cuya fuerza no procede del usuario no añaden un Atributo al daño salvo regla expresa.

### Daño, Protección y Penetración

**Protección efectiva = max(0, Protección - Penetración).**

**Daño final = max(0, daño base + un Atributo de daño cuando sea lógico + bonos - Protección efectiva).**

La Penetración nunca vuelve negativa la Protección y su exceso se pierde. Un impacto que queda en 0 daño permanece en 0. Un efecto de lesión normalmente requiere al menos 1 punto de daño después de Protección salvo que su regla diga otra cosa.

### Desprevenido

Una criatura Desprevenida pierde su Bono Defensivo y cualquier defensa pasiva de escudo que dependa de orientarse frente a la amenaza. También puede perder Reacciones defensivas frente a un ataque que no pudo percibir o al que no pudo reaccionar. No pierde AGI de su Defensa.

No existe una ronda universal de sorpresa. Una iniciación no percibida resuelve el disparador pertinente y después se usa la iniciativa normal.

### Técnicas de combate fundamentales

**Parada — Básica, 2 PD.** Reacción; requiere arma apropiada y al menos Entrenado en la Habilidad marcial correspondiente. +2 Defensa contra un ataque cuerpo a cuerpo parable.

**Golpe Potente — Básica, 2 PD.** -2 a la tirada de ataque y +2 al daño si impacta.

**Estocada Perforante — Avanzada, 3 PD.** -1 ataque, -1 daño y Penetración +2.

**Contraataque — Avanzada, 3 PD; requiere Parada.** Si una Parada convierte un impacto en fallo, permite un ataque inmediato dentro de esa misma Reacción. No inicia una cadena de Reacciones ofensivas.

**Intercepción — Básica, 2 PD.** Reacción. Cuando un aliado cercano es objetivo de un ataque que puedes percibir, puedes desplazarte lo mínimo indispensable para interponerte si existe una trayectoria física válida. Pasas a ser el objetivo de ese ataque. No concede Defensa adicional, no teletransporta, no permite exceder el Movimiento disponible y no funciona contra áreas. El desplazamiento realizado cuenta contra el Movimiento disponible del personaje para ese turno cuando corresponda.

**Combate Dual — Avanzada, 3 PD.** Con dos armas Ligeras o compatibles, una Acción produce dos ataques, cada uno con -2. Un modificador que afecte al ataque completo se aplica sólo a uno salvo regla expresa. No permite otra Acción ofensiva adicional.

**Barrido — Avanzada, 3 PD.** Una tirada con -2 contra hasta dos objetivos adyacentes válidos; el daño se resuelve por separado. Una Hazaña puede ampliar a un objetivo adicional sólo cuando la capacidad correspondiente lo indique.

**Tirador Preparado — Básica, 2 PD.** Habilita preparar un disparo y resolverlo con la Reacción al cumplirse el disparador.

**Recarga Experta — Básica, 2 PD.** Reduce la Recarga en una Acción, respetando los mínimos físicos y las limitaciones del arma.

No existe un Ataque de Oportunidad universal. Una retirada a distancia contra un adversario de velocidad equivalente no garantiza ataques gratuitos: posición, persecución y economía de acciones determinan si puede mantenerse la distancia.

## 9. Armas, armaduras y escudos

| Arma | Daño | Pen | FUE | Precio | Propiedades principales |
|---|---:|---:|---:|---:|---|
| Daga | 3 | 6 p | 0 | 5 C | Ligera, Ocultable |
| Espada corta | 4 | 1 o | 0 | 12 C | Ligera |
| Sable | 4 | 1 o 5 p | 0 | 18 C | Ágil |
| Espada larga | 5 | 2 o | 1 | 20 C | Versátil |
| Hacha | 6 | 2 o 5 p | 2 | 18 C | Impactante |
| Maza | 5 | 1 o | 1 | 16 C | Impactante |
| Martillo de guerra | 6 | 3 o | 2 | 24 C | Impactante |
| Lanza | 5 | 5 p | 1 | 12 C | Alcance, 2 manos |
| Alabarda | 7 | 3 o | 2 | 30 C | Alcance, Pesada, 2 manos |
| Mandoble | 7 | 4 o | 2 | 32 C | Pesada, 2 manos |
| Gran hacha | 8 | 5 o | 3 | 34 C | Pesada, 2 manos |
| Gran martillo | 7 | 5 o | 3 | 40 C | Pesada, 2 manos |
| Arco corto | 4 | 1 o | — | 15 C | Potencia 2 |
| Arco largo | 5 | 2 o | — | 25 C | Potencia 3, 2 manos |
| Ballesta | 6 | 3 o | — | 22 C | Recarga 1 |
| Ballesta pesada | 8 | 5 o | — | 35 C | Recarga 2, 2 manos |
| Pistola temprana | 6 | 10 o | — | 30 C | Recarga 2 |
| Rifle temprano | 7 | 18 o | — | 45 C | Recarga 2, 2 manos |
| Pistola repetidora | 6 | 35 o | — | 50 C | Repetición |
| Rifle repetidor | 7 | 45 o | — | 65 C | Repetición, 2 manos |

Los arcos pueden añadir FUE al daño cuando el arma y su Potencia lo permiten; ballestas y armas de fuego no lo hacen normalmente.

| Armadura | Prot | FUE mín. | Precio |
|---|---:|---:|---:|
| Ligera | 1 | 1 o 5 p | 12 C |
| Reforzada | 2 | 4 o | 25 C |
| Malla | 3 | 10 o | 40 C |
| Pesada | 4 | 16 o | 60 C |
| Placas | 5 | 40 o | 85 C |

Con FUE un punto por debajo del mínimo, Movimiento -1, Carga Pesada y Desventaja en acciones físicas relevantes. Con dos o más puntos por debajo, la armadura no puede usarse competentemente en combate sin una capacidad específica, aunque su material siga ofreciendo Protección cuando corresponda. Una armadura ruidosa puede causar Desventaja a Sigilo cuando el ruido sea relevante.

**Broquel, 10 C:** +1 Defensa frontal, sin Bloqueo especial. **Escudo estándar, 18 C:** +1 Defensa frontal y Bloqueo, Reacción +2 Defensa adicional. **Escudo pesado, 30 C, FUE 2:** +2 Defensa frontal, Movimiento -1 y Bloqueo +2.

La calidad Defectuosa/Común/Superior/Excepcional describe fabricación y propiedades concretas; no concede un +1/+2/+3 universal.

## 10. Vida, heridas, Trauma y recuperación

La Vida máxima es 10 + 2xVIG. Llegar a 0 Vida causa **Incapacitado**, no muerte automática. Para un personaje orgánico, la primera caída pertinente desde Vida positiva a 0 mientras tiene Trauma 0 eleva Trauma a 1. Golpear repetidamente a una criatura ya en 0 no incrementa Trauma de manera automática. Una lesión deliberadamente grave, una ejecución o una fuerza devastadora pueden producir consecuencias mayores según la ficción.

El **umbral de Daño Grave = 5 + VIG**, exactamente la mitad de la Vida máxima ordinaria. Es una señal para evaluar una lesión, no una orden de crearla automáticamente.

### Trauma

Trauma 0: Sin Trauma. Trauma 1: Grave. Trauma 2: Crítico. Trauma 3: Terminal. Trauma no impone una espiral universal de penalizadores ni tiradas de muerte. Trauma 3 representa peligro inmediato que exige intervención, no muerte instantánea.

Una **Herida Grave** es una lesión concreta; Trauma representa deterioro sistémico. No son lo mismo. Varias Heridas Graves no aumentan automáticamente Trauma. Una Herida Grave puede surgir por una capacidad explícita, una Hazaña apropiada con daño significativo, un impacto que alcance el umbral cuando la naturaleza del golpe lo justifique o una lesión severa evidente. Un único impacto normalmente produce como máximo una Herida Grave.

Estados de una Herida Grave: **Activa -> Controlada -> Tratada -> Recuperada**. Tipos de daño de referencia: Cortante, Perforante, Contundente, Térmico y Especial.

Sangrado ordinario causa 1 Vida al final del turno. Sangrado Grave 2 sólo aparece cuando una regla o lesión lo establece. Si varias fuentes se solapan, normalmente se aplica la más fuerte y no se suman indefinidamente.

### Medicina

Primeros Auxilios bajo presión requiere una Acción. Puede detener Sangrado ordinario, estabilizar y preparar una lesión para tratamiento, pero no restaura automáticamente Vida, Trauma ni fracturas. Fuera de presión, con competencia, tiempo y equipo adecuados, las tareas médicas rutinarias no requieren tirada.

### Descanso

**Respiro, ~10 minutos:** no recupera Vida ni Maná automáticamente; limpia Saturaciones alquímicas compatibles y permite efectos que indiquen Respiro.

**Descanso, ~1 hora:** recupera simultáneamente VIG+2 Vida y VOL+1 Maná, cada componente una sola vez antes del siguiente Descanso Completo y siempre limitado por máximos y lesiones.

**Descanso Completo, ~8 horas:** recupera todo el Maná, devuelve normalmente la Fatiga a Fresco y recupera Vida ordinaria hasta donde permitan las lesiones. No cura automáticamente Heridas Graves, Trauma, venenos o maldiciones.

Fatiga: **Fresco, Fatigado, Exhausto, Colapsado**. Fatigado sufre Desventaja en esfuerzo físico prolongado cuando sea relevante. Exhausto además reduce Movimiento en 2, mínimo 1. Colapsado impide esfuerzo significativo.

Condiciones universales: Derribado, Agarrado, Desprevenido, Desorientado, Incapacitado e Inconsciente. Estabilizado es un estado positivo. Las duraciones de referencia son Instantánea, hasta el siguiente turno, Escena, Temporal y Sostenida.

## 11. Magia

La magia no usa un Atributo de Magia separado. Sus Fuentes son **Alma, Divina, Ambiental y Externa**. Sus seis Disciplinas son **Evocación, Alteración, Restauración, Percepción, Influencia y Conjuración**. Canalización representa el dominio práctico del lanzamiento activo; Ritualismo es una Habilidad independiente.

El Maná máximo es 6 + 3xVOL y no crece automáticamente por nivel. Costes de referencia: Truco 0-1, Menor 2, Básico 3-4, Avanzado 5-7, Maestro 8-11, Legendario 12+.

Un hechizo conocido, seguro y rutinario no exige tirada sólo por ser mágico. Cuando existe oposición o incertidumbre, se usa **2d10 + Atributo relevante + Canalización** contra DF o Defensa. Los ataques físicos o energéticos usan Defensa; la influencia mental usa Defensa Mental; la alteración directa de un organismo usa Defensa Corporal cuando corresponda. Una tirada mágica ofensiva exitosa no genera una segunda resistencia salvo regla expresa.

### Sostenimiento

El límite normal es un efecto Sostenido demandante. **Doble Sostenimiento** permite dos. Un lanzamiento fallido nunca entra en Sostenimiento y el Maná pagado no se devuelve. Si un nuevo hechizo Sostenido entra con éxito cuando ya se alcanzó el límite, se abandona inmediatamente el efecto existente más antiguo necesario para volver al límite. No existe una tirada para superar ese límite.

### Sobrecarga

Sólo puede intentarse si al personaje le falta exactamente 1 Maná para pagar el hechizo, conserva al menos 1 Maná y cumple los demás requisitos. Gasta todo el Maná restante y realiza **2d10 + VOL + Canalización contra DF 17**. Con éxito, el hechizo se produce y el personaje queda Exhausto; si ya estaba Exhausto, queda Colapsado después de resolver. Con fallo, el hechizo no se produce y queda Exhausto, o Colapsado si ya lo estaba. Una Pifia puede añadir una consecuencia mágica grave contextual. Un personaje Colapsado no puede Sobrecargar.

### Áreas, control y límites

Un área usa una resolución de lanzamiento y compara el resultado con las Defensas pertinentes de cada objetivo. Los aliados también son afectados salvo discriminación explícita. Un Actor sólo recibe una vez la misma resolución aunque esté representado por varios tokens.

La magia no concede armadura fallida, ataques de oportunidad por lanzar ni devolución universal de Maná por Hazaña. Efectos numéricos mágicos idénticos no se acumulan salvo regla. Invisibilidad no equivale a indetectabilidad. Transformaciones deben indicar qué reemplazan y qué conservan. El teletransporte forzado ordinario no puede colocar a un objetivo involuntario en un destino inválido o inmediatamente letal sin una regla ofensiva y resistencia específicas.

**Contramagia — Avanzada, 3 PD.** Reacción después de declarar un lanzamiento y antes de resolverlo. Requiere compatibilidad narrativa/mágica y produce una interferencia contextual. No es una cancelación automática universal. **Auditoría:** el Manual 1.0 y la implementación no fijan todavía una fórmula universal de tirada, DF o modificador para Contramagia; cualquier fórmula más específica queda pendiente de decisión canónica.

## 12. Grimorio estable 1.0

El catálogo mecánico estable del núcleo está formado por **18 hechizos**. Nombres históricos, variantes de diseño, trucos no ratificados o entradas antiguas no crean hechizos adicionales ni versiones gratuitas. Un efecto nuevo sólo entra en el catálogo cuando se define aquí con coste, objetivo, alcance, duración, resistencia y límites suficientes.

| Hechizo | Disciplina | Grado | Maná | Resolución vigente resumida |
|---|---|---:|---:|---|
| Proyectil Ígneo | Evocación | Básico | 3 | INT + Canalización contra Defensa; alcance Medio; Daño 5, Pen 1. |
| Onda de Choque | Evocación | Básico | 4 | Área frontal corta; Daño 4, Pen 0; una tirada se compara con la Defensa de cada objetivo; empuje 1 cuando corresponda. |
| Barrera Cinética | Evocación | Básico | 3 | Reacción; +2 Defensa normal únicamente contra el ataque declarado; se consume al resolverlo. |
| Potencia Sobrenatural | Alteración | Básico | 4 | Sostenido; permite interactuar físicamente como una categoría de Escala mayor; no aumenta FUE, daño ni Defensa. |
| Piel Alterada | Alteración | Básico | 4 | Sostenido; Protección 2 contra una categoría coherente declarada; no se acumula con armadura equivalente. |
| Cierre Restaurador | Restauración | Básico | 3 | Requiere Medicina; recupera 4 Vida y detiene Sangrado ordinario compatible; no reduce Trauma ni repara automáticamente Herida Grave. |
| Regeneración | Restauración | Avanzado | 6 | INT; DF 16 cuando corresponda; requiere Medicina; repara una Herida Grave orgánica compatible. |
| Reconstrucción | Restauración | Maestro | 10 | INT; DF 20 cuando corresponda; requiere Medicina; reconstrucción extraordinaria; no resurrección. |
| Visión Arcana | Percepción | Menor | 2 | PER; DF 10 cuando exista incertidumbre; duración Escena; requiere Arcana. |
| Vínculo de Rastreo | Percepción | Básico | 4 | PER; DF 14; información aproximada, no coordenadas GPS. |
| Visión Remota | Percepción | Avanzado | 7 | PER; DF 18; requiere lugar conocido o Ancla. |
| Calma | Influencia | Básico | 3 | PRE + Canalización contra Defensa Mental cuando el objetivo resiste; reduce agitación compatible sin borrar voluntad o memoria. |
| Sugestión | Influencia | Avanzado | 5 | PRE + Canalización contra Defensa Mental; instrucción plausible y limitada; no Dominación, suicidio ni traición fundamental automática. |
| Llamada Menor | Conjuración | Básico | 4 | INT; DF 14; convoca una entidad menor compatible; invocar no equivale a controlar ni garantiza obediencia. |
| Paso Breve | Conjuración | Básico | 4 | INT; DF 12 cuando se requiera prueba; teletransporta al lanzador hasta 3 espacios a destino visible, válido y desocupado. |
| Trasposición | Conjuración | Avanzado | 6 | INT; DF 14; alcance hasta 8 espacios según condiciones del efecto. |
| Umbral | Conjuración | Avanzado | 7 | INT; DF 18; transición espacial limitada compatible. |
| Portal | Conjuración | Maestro | 10 | INT; DF 21; requiere Anclas compatibles y normalmente preparación prolongada. |

### Reglas de interpretación del catálogo

- **Barrera Cinética** aplica su +2 únicamente a Defensa normal contra el ataque que la disparó. No modifica Defensa Mental ni Corporal y no se almacena para turnos futuros.
- **Piel Alterada** no se convierte en +2 Protección universal. La categoría protegida se declara de forma coherente y no se acumula con armadura equivalente.
- **Potencia Sobrenatural** cambia qué magnitud física puede afrontar el personaje, no sus valores de FUE, daño, Defensa, tamaño o alcance.
- **Cierre Restaurador** recupera Vida hasta el máximo permitido y respeta límites de lesión; no borra Trauma.
- **Onda de Choque** tiene geometría contextual: la mesa determina qué objetivos están realmente dentro del frente corto.
- **Regeneración** y **Reconstrucción** requieren la adjudicación médica y narrativa indicada; no generan cantidades de curación adicionales no escritas.
- Hechizos de información, influencia y teletransporte no conceden conocimiento, control, posición o línea de efecto que no estén definidos.
- Los efectos idénticos no se acumulan salvo regla expresa.
- Las salvaguardas generales de Acción/Reacción, objetivos, Defensas, Protección, Sostenimiento, Sobrecarga y línea de efecto se aplican a todo el catálogo.

### Archivo de nombres históricos

Nombres como Chispa, Pulso, Descarga, Lanza, Impulso, Paso Ligero, Molde, Ajuste, Adaptación, Alterar Forma, Forma Adaptativa, Alivio, Estabilización, Purificación, Diagnóstico, Realce, Marca, Eco, Lectura de Huella, Matiz, Susurro, Impulso Emocional, Silencio Mental, Señal, Mano, Ancla o Restauración Profunda pertenecen al **archivo de diseño**, no al catálogo mecánico 1.0. Si un uso narrativo reproduce un efecto mecánico de los 18 hechizos estables, debe pagar y respetar el hechizo estable correspondiente.

## 13. Técnicas

Las Técnicas representan entrenamiento, maniobras o capacidades aprendidas. Sus grados y costes normales son Básica 2 PD, Avanzada 3 PD, Maestra 5 PD y Legendaria 8+ PD. Una Técnica sólo hace lo que especifica: no crea competencia, acciones, Reacciones, alcance o recursos adicionales salvo que lo indique expresamente.

| Técnica | Grado | Coste | Requisito / activación | Efecto |
|---|---|---:|---|---|
| Parada | Básica | 2 PD | Reacción; arma apropiada; Habilidad marcial Entrenada | +2 Defensa contra un ataque cuerpo a cuerpo parable. |
| Golpe Potente | Básica | 2 PD | Ataque compatible | -2 ataque, +2 daño. |
| Recibir Carga | Básica | 2 PD | Reacción; arma de Alcance | Cuando un enemigo entra voluntariamente en tu alcance mediante un desplazamiento directo hacia ti, realiza inmediatamente un ataque con esa arma antes de completar la aproximación. Daño normal; no detiene automáticamente el movimiento. |
| Intercepción | Básica | 2 PD | Reacción; aliado cercano objetivo de ataque perceptible | Desplázate lo mínimo para interponerte por trayectoria válida y pasa a ser objetivo; sin Defensa extra, sin teletransporte, sin exceder Movimiento y no contra áreas. |
| Tirador Preparado | Básica | 2 PD | Acción + Reacción | Permite preparar un disparo y resolverlo al cumplirse el disparador; expira al inicio del siguiente turno. |
| Recarga Experta | Básica | 2 PD | Arma con Recarga | Reduce la Recarga en 1 Acción respetando límites físicos. |
| Combate Dual | Avanzada | 3 PD | Dos armas Ligeras/compatibles | Una Acción, dos ataques a -2; un modificador de ataque completo sólo afecta uno. |
| Barrido | Avanzada | 3 PD | Objetivos adyacentes válidos | Una tirada a -2 contra hasta dos objetivos; daño separado. |
| Estocada Perforante | Avanzada | 3 PD | Ataque compatible | -1 ataque, -1 daño, Pen +2. |
| Contraataque | Avanzada | 3 PD | Requiere Parada | Si Parada convierte impacto en fallo, ataque inmediato dentro de la misma Reacción; sin cadena reactiva. |
| Contramagia | Avanzada | 3 PD | Reacción; compatibilidad mágica | Interfiere un lanzamiento antes de resolverlo; no es cancelación universal. |
| Doble Sostenimiento | Maestra | 5 PD | Capacidad mágica | Eleva a dos el límite de efectos Sostenidos demandantes. |
| Sentidos Compartidos | Básica | 2 PD | Familiar Mágico; Vínculo II; Acción | Percibe temporalmente mediante los sentidos reales del Familiar. |
| Comunicación Mejorada | Básica | 2 PD | Familiar Mágico; Vínculo II | Permite conceptos complejos dentro del alcance válido del vínculo. |
| Origen Remoto | Avanzada | 3 PD | Familiar Mágico; Vínculo III | Usa la posición del Familiar como origen de un hechizo compatible; recursos y lanzamiento siguen perteneciendo al personaje. |
| Coordinación Reactiva | Avanzada | 3 PD | Familiar Mágico; Vínculo III | Define un disparador simple y observable para una respuesta del Familiar; no crea Reacciones ni cadenas adicionales. |

**Intercepción** está ratificada como Técnica Básica de 2 PD con la resolución indicada en el catálogo anterior.

## 14. Familiares, vínculos e invocaciones

**Familiar Mágico** es un Rasgo de Vínculo de 2 PR. El Familiar es una criatura independiente vinculada al personaje, no una extensión perfecta del jugador ni un segundo personaje completo gratuito. Tiene personalidad, deseos, conocimiento, criterio y una naturaleza propia. El vínculo no implica obediencia absoluta.

Un Familiar usa un perfil simplificado: Escala, Movimiento, Vida, Defensa, Protección, Ataque, Percepción, Voluntad, Rasgos y capacidades relevantes. No obtiene por defecto un segundo depósito completo de Maná. Si una criatura concreta posee Maná por su propia naturaleza, esa excepción debe estar expresamente definida.

### Origen del vínculo y Saturación Mágica juvenil

Durante la Edad de los Pactos se documentaron los primeros Vínculos Familiares. En una minoría de niños y jóvenes puede aparecer **Saturación Mágica juvenil**, una inestabilidad de resonancia durante la maduración arcana. No es una reserva de Maná que excede su máximo, no aumenta recursos y no debe confundirse con la **Saturación alquímica**, que es un bloqueo temporal por familia de preparaciones y se limpia mediante un Respiro apropiado. En humanos se vigila especialmente durante la infancia y antes de los quince años; otros pueblos siguen su propia madurez biológica y mágica.

La presencia de una entidad compatible puede estabilizar ese flujo y permitir que el Vínculo se consolide. Este origen narrativo no concede por sí solo Maná, Acciones, Reacciones, Habilidades, Técnicas, hechizos ni modificadores.

### Cristales de Resonancia

Tras la Fractura del Cielo se identificaron **Cristales de Resonancia**, formaciones arcanas excepcionalmente raras capaces de responder a la resonancia individual. El habla popular puede llamarlos «huevos de familiar», pero **no son huevos y no contienen una criatura gestándose**. El cristal no crea al Familiar: funciona como ancla que facilita el encuentro, la manifestación estable o la consolidación de un vínculo con una entidad compatible.

Los Vínculos Familiares son anteriores a estos cristales. Los yacimientos útiles son escasos, regulados o custodiados y no existe un único yacimiento principal fijado para todo Edria.

### Forma y permanencia

El Familiar es una entidad animada con voluntad propia y puede adoptar naturalezas distintas —animal, espíritu, feérico, elemental u otra forma compatible—. No es un objeto, pieza de equipo ni artefacto intercambiable. El vínculo suele concebirse como duradero o vitalicio; la pérdida, ruptura, sustitución o restauración exige una causa extraordinaria y resolución narrativa coherente.

### Grados de vínculo

Los grados son referencias narrativas y prerrequisitos, no paquetes gratuitos:

| Grado | Nombre | Función |
|---|---|---|
| I | Compañero | Vínculo funcional inicial. |
| II | Afinado | Habilita desarrollo de percepción/comunicación avanzada. |
| III | Profundo | Habilita capacidades tácticas/mágicas avanzadas. |
| IV | Excepcional | Vínculo extraordinario; no concede bonos por sí mismo. |

Los arquetipos **Compañero, Explorador, Guardián y Místico** sirven para describir función y orientar elecciones. No son clases ni conceden beneficios gratuitos.

### Comunicación y llamada

El vínculo ordinario transmite a corta distancia emociones y conceptos simples de forma aproximada. No es GPS, telepatía perfecta ni conocimiento compartido. **Llamar** comunica una llamada compatible con el vínculo; no teletransporta, no revela coordenadas y no obliga a obedecer.

### Modos de control

**Autónomo:** el Familiar actúa según su personalidad, deseos, peligro y órdenes previas. El jugador no obtiene control táctico gratuito de un segundo PJ.

**Vinculado:** una intervención táctica coordinada significativa utiliza normalmente la **Acción Vinculada**, que consume la Reacción del personaje. Cambiar una orden táctica compleja consume la Acción del personaje.

**Reactivo:** sólo existe cuando una capacidad como Coordinación Reactiva lo habilita. El disparador debe ser simple, concreto y observable. No concede Reacciones adicionales.

Una orden simple persistente puede cubrir seguir, moverse, esconderse, vigilar, huir, transportar un objeto, esperar o mantener posición. No autoriza ataques repetidos, magia, maniobras, Ayuda táctica, Intercepción u otra intervención significativa gratuita ronda tras ronda.

### Desarrollo del vínculo

**Sentidos Compartidos, 2 PD, Vínculo II.** El personaje dedica una Acción a percibir temporalmente mediante los sentidos reales del Familiar. No concede omnisciencia ni dos focos perfectos de atención.

**Comunicación Mejorada, 2 PD, Vínculo II.** Permite intercambiar conceptos complejos dentro del alcance válido. El Familiar no comunica conocimientos que no posea ni interpretaciones para las que carezca de comprensión.

**Origen Remoto, 3 PD, Vínculo III.** Un Familiar vinculado, operativo y situado válidamente puede servir como origen de un hechizo compatible. El personaje paga Maná, realiza la tirada y conserva los límites de Sostenimiento. Cambiar el origen no concede conocimiento del objetivo, percepción, alcance sensorial o línea de efecto. Un Familiar Incapacitado no puede servir como Origen Remoto.

**Coordinación Reactiva, 3 PD, Vínculo III.** Permite definir un disparador observable para una respuesta válida del Familiar. No crea acciones o Reacciones adicionales ni permite cadenas reactivas.

Los PD invertidos pertenecen al desarrollo del vínculo del personaje. La muerte, pérdida o sustitución del Familiar no destruye ni devuelve automáticamente esos PD; un nuevo Familiar puede requerir re-vinculación narrativa antes de utilizar las capacidades.

### Cuerpo y capacidades naturales

Vuelo, tamaño Diminuto, sentidos especiales, sigilo o movilidad extraordinaria pertenecen al cuerpo o Rasgos del Familiar y deben estar pagados o justificados por su naturaleza. Vuelo no elimina clima, cobertura, distancia o detección. Diminuto permite atravesar sólo aberturas físicamente válidas. Un explorador remoto informa únicamente lo que puede percibir, comprender y comunicar.

A 0 Vida el Familiar queda Incapacitado o gravemente herido según su naturaleza. La muerte y la ruptura del vínculo son consecuencias narrativas dependientes de esa naturaleza y no borran automáticamente Familiar Mágico.

### Invocaciones

Las criaturas invocadas usan los mismos tres modos conceptuales: Autónoma, Vinculada o Reactiva. Invocar, contener y controlar son funciones distintas. Una invocación Vinculada no concede un segundo turno completo: cambiar una orden táctica compleja consume la Acción del invocador y una orden persistente sólo continúa gratis mientras sea simple y no constituya una intervención táctica significativa repetida. Varias invocaciones demandantes quedan sujetas a los límites de Sostenimiento aplicables.

## 15. Ritualismo

Ritualismo es una Habilidad independiente de Canalización. Un ritual usa **2d10 + Atributo apropiado + Ritualismo** cuando necesita una prueba. Cada ritual define Complejidad, DF, Tiempo, Participantes, Componentes, Fuente, Alcance, Efecto y consecuencias de fallo.

Referencias de complejidad: Menor DF 11–13 y unos 10 minutos; Básico DF 14–16 y 30–60 minutos; Avanzado DF 17–19 y horas; Maestro DF 20–22 y horas o días; Legendario DF 23+ y normalmente días.

Existe un único **Director** y una tirada principal. Los asistentes deben aportar ayuda real y su número útil está limitado por el ritual. No existe +1 por cada participante ni donación ilimitada de Maná. Cuando un ritual permite aportes, especifica el Maná mínimo del Director y el máximo por asistente. El aporte ajeno no sustituye el requisito del Director.

Los componentes habilitan el procedimiento; no son bonos numéricos arbitrarios. Pueden ser Material, Foco, Catalizador o Ancla. Un requisito de Caudal debe proceder de infraestructura real y compatible. Los acumuladores sólo aportan Energía compatible con su Fuente; Energía y Maná personal no son equivalentes universales.

| Ritual | Grado | DF | Tiempo | Director | Asistentes | Efecto |
|---|---|---:|---|---:|---|---|
| Círculo de Protección | Básico | 15 | 30 min | 3 Maná | hasta 2, máx. 1 Maná c/u | Barrera contra una categoría sobrenatural definida. |
| Vínculo de Localización | Avanzado | 18 | 2 h | 5 Maná | hasta 2 útiles | Dirección/región aproximada; no GPS. |
| Portal Estable | Maestro | 21 | 8 h | 8 Maná | hasta 4, máx. 2 Maná c/u; Caudal 3 | Conexión temporal entre dos Anclas compatibles. |

La investigación ritual puede descubrir procedimientos nuevos, pero una tirada no vuelve viable algo que el mundo establece como imposible. No existe Resurrección estándar ni una regla universal de sacrificio convertido en Maná.

## 16. Alquimia

Una Fórmula se describe mediante **Nombre, Grado, Preparación, Componentes, Herramientas, Vía, Activación, Duración, Saturación, Efecto y Preservación**. Preparar una fórmula conocida en laboratorio adecuado, con ingredientes, tiempo y competencia suficientes, es una tarea rutinaria y no exige tirada. La improvisación, presión o investigación sí pueden hacerlo.

Costes de conocimiento actualmente usados: Común 1 PD, Refinada 1 PD, Compleja 2 PD y las fórmulas superiores requieren desarrollo acorde; el coste Maestro de referencia es 3 PD mientras permanezca expresamente definido por el catálogo/proyecto correspondiente.

### Saturación

La Saturación es binaria y contextual. Una preparación Saturante registra su familia y bloquea otra aplicación beneficiosa de esa misma familia hasta un Respiro efectivo. No existe una reserva universal de puntos de Toxicidad. Un Respiro limpia las Saturaciones compatibles, pero no recupera Vida o Maná por sí mismo.

| Fórmula | Grado | Precio | Familia / vía | Efecto |
|---|---|---:|---|---|
| Bálsamo Restaurador | Común | Sin precio establecido | Restaurativa | +4 Vida; no Trauma ni Herida Grave. |
| Poción Restauradora | Común | Sin precio establecido | Restaurativa / oral | Acción: +4 Vida hasta máximo y límites de lesión. |
| Poción de Recuperación Arcana | Refinada | Sin precio establecido | Arcana / oral | Acción: +3 Maná hasta máximo; no elimina Fatiga ni Sobrecarga. |
| Tónico de Vigor | Refinada | Sin precio establecido | Potenciador | Ventaja en una prueba de VIG por esfuerzo prolongado. |
| Supresor del Dolor | Refinada | Sin precio establecido | Analgésica | Ignora una Desventaja causada por dolor compatible; no repara lesión. |
| Neutralizante Común | Refinada | Sin precio establecido | — | Nueva resistencia con Ventaja contra una toxina compatible. |
| Toxina Debilitante | Compleja | Sin precio establecido | Sangre | VIG DF14; fallo: Desventaja en acciones físicas dependientes de fuerza muscular. |
| Bomba Incendiaria | Compleja | Sin precio establecido | — | Área pequeña, Daño 6, Pen 1; requiere colocación válida. |

Un veneno define Vía, Latencia, DF, Efecto y Duración. Normalmente concede una resistencia y no exige pruebas repetidas sin cambio. Aplicar veneno a un arma requiere preparación/Acción apropiada y la primera aplicación válida consume la dosis.

Los explosivos usan una prueba de colocación cuando existe incertidumbre, normalmente AGI + Armas a Distancia u otra combinación apropiada; cobertura y posición importan. No añaden una segunda tirada defensiva genérica si la resolución ya establece cómo afecta el área.

## 17. Ingeniería arcano-industrial

Las máquinas no usan Maná personal por defecto. Un acumulador se define por **Energía**, **Caudal** máximo por activación y **Estabilidad**. Un dispositivo define su **Consumo**. Para activarlo debe cumplirse Consumo <= Energía disponible y Consumo <= Caudal; la activación reduce Energía, no Maná.

Acumuladores portátiles de referencia: celda menor 4 Energía/Caudal 2; acumulador estándar 8/3; núcleo pesado 16/5. Transferir Energía nunca crea Energía y conectar acumuladores no suma automáticamente Caudal sin infraestructura diseñada para ello.

Estados de avería: **Operativo -> Dañado -> Deshabilitado**.

### Sobrecarga Controlada

Sólo una construcción compatible puede intentarla. Se realiza **INT + Ingeniería contra DF 16**. Deben existir Energía suficiente y una activación válida. Con éxito, esa activación dispone de Caudal efectivo +1, ejecuta su efecto, consume la Energía correspondiente y el dispositivo queda Dañado. Con fallo no se activa y queda Deshabilitado. Una Pifia puede añadir una consecuencia energética contextual. La Sobrecarga nunca crea Energía.

Dispositivos de referencia incluyen lámparas arcanas, herramientas motorizadas, visor espectral, estabilizador de tiro, cámara de penetración (Consumo/Caudal 2, Pen +2 cuando corresponda), propulsor de impacto (Consumo 2, +2 daño o empuje 1 según diseño), prótesis motorizadas, escudo de campo (Caudal 2, Consumo 2, Reacción +2 Defensa sin acumular con Barrera Cinética equivalente), arnés de carga y autómatas auxiliares. Un autómata auxiliar no concede automáticamente una Acción extra al usuario.

Ingeniería diseña, construye y repara mecanismos; Arcana comprende fenómenos mágicos; Canalización dirige activamente magia personal cuando corresponda. Una Habilidad no reemplaza universalmente a las otras.

## 18. Proyectos, fabricación e investigación

Los proyectos siguen el ciclo **Diseño -> Requisitos -> Trabajo -> Complicaciones -> Resultado**. Las categorías de complejidad son Simple, Estándar, Complejo, Magistral y Extraordinario; la competencia esperada progresa aproximadamente de Aprendiz a Gran Maestro.

Una tarea reproducible, conocida y realizada con tiempo, herramientas, materiales e instalaciones apropiadas no necesita tirada. Las Especializaciones autorizan, reducen dificultades contextuales o desbloquean trabajo; no conceden un +X universal.

Un proyecto multidisciplinario tiene una disciplina Principal y una o más Auxiliares. Las escalas de tiempo son Minutos, Horas, Días, Semanas y Meses. Acelerar un proyecto puede reducir un grado de tiempo cuando sea plausible, a cambio de riesgo, coste o calidad comprometida. Los recursos se clasifican como Comunes, Especializados, Raros o Excepcionales; las instalaciones como Improvisadas, Adecuadas, Profesionales, Especializadas o Excepcionales.

Un plano estable vuelve reproducible un trabajo rutinario para quien tenga la competencia y medios requeridos. La investigación sigue **Concepto -> Viabilidad -> Investigación -> Prototipo -> Fórmula/Plano estable**. La Viabilidad puede ser Posible, Posible con condiciones o Actualmente imposible. Una tirada alta no atraviesa la imposibilidad establecida.

Los proyectos largos se resuelven por etapas significativas, no mediante una reserva universal de puntos de progreso. Un fallo genera consecuencias, retrasos, costes o necesidad de cambiar el enfoque según la situación; no reinicia automáticamente todo el proyecto.


## 19. Economía, disponibilidad y equipo

### Moneda canónica

La moneda mecánica de referencia usa **cobre (c), plata (p) y oro (o)**:

- **10 c = 1 p**
- **10 p = 1 o**
- **100 c = 1 o**

El cobre es la unidad mínima ordinaria. Oro, plata y cobre son tres formas de presentar un único valor; no son patrimonios independientes. En Foundry la fuente autoritativa se almacena como un entero de cobres.

Las monedas regionales continúan existiendo dentro de Edria. c/p/o es una normalización mecánica del valor y no afirma que todas las potencias acuñen la misma moneda física. Cuando una divisa concreta importe, puede registrarse como un bien separado hasta ser aceptada o cambiada. No existe un tipo de cambio regional universal.

### PEI y Reserva inicial

La creación estándar usa **PEI 20 o = 2.000 c** como presupuesto material. No es dinero y no puede convertirse en saldo. Se elige un Paquete de Preparación o Compra libre; no se combinan. El remanente de un Paquete se pierde.

Tras cerrar la preparación material, un personaje jugador creado mediante el procedimiento estándar recibe una sola vez una **Reserva líquida de 2 o = 200 c**. NPC, Familiares, plantillas, personajes importados o Actors antiguos no reciben esa Reserva automáticamente.

### Precio, Unidad Comercial y mercado

Un precio puede estar **Exacto**, **Variable** o **Sin precio establecido**. 0 c significa gratuito y no equivale a precio desconocido. Un precio exacto se registra en cobres enteros y se presenta de forma legible en o/p/c.

La **Unidad Comercial** indica cuántas unidades físicas cubre el precio. Ejemplos:
- 20 flechas = **2 p**
- 20 virotes = **3 p**
- 12 disparos ordinarios de arma de fuego = **5 p**
- repuesto de Kit Médico, 5 usos = **5 p**

El precio no es el único límite. Un objeto o servicio también puede tener **Disponibilidad** —Común, Profesional, Restringida, Rara o Excepcional— y un régimen de acceso social/legal. Tener suficiente dinero no crea existencias ni elimina licencias, requisitos o logística.

### Catálogo monetario de equipo

| Equipo | Precio |
|---|---:|
| Cuchillo | 3 p |
| Daga | 6 p |
| Espada corta | 1 o |
| Espada larga | 2 o |
| Sable | 1 o 5 p |
| Hacha | 2 o 5 p |
| Maza | 1 o |
| Martillo de guerra | 3 o |
| Lanza | 5 p |
| Alabarda | 3 o |
| Mandoble / Espadón equivalente | 4 o |
| Gran hacha | 5 o |
| Gran martillo | 5 o |
| Arco corto | 1 o |
| Arco largo | 2 o |
| Ballesta | 3 o |
| Ballesta pesada | 5 o |
| Pistola temprana | 10 o |
| Rifle temprano | 18 o |
| Pistola repetidora | 35 o · Rara |
| Rifle repetidor | 45 o · Rara |
| Armadura ligera | 1 o 5 p |
| Armadura reforzada | 4 o |
| Malla | 10 o |
| Armadura pesada | 16 o |
| Placas | 40 o |
| Broquel | 5 p |
| Escudo estándar | 1 o 5 p |
| Escudo pesado | 3 o |

Kits: Artesano 1 o; Ingeniería de campo 2 o; Minería 1 o; Médico 2 o; Alquimia de campo 2 o; Infiltración 1 o; Cartográfico 1 o; Navegación 2 o; Campaña 1 o; Escalada 1 o; Escribanía 5 p; Mercantil 1 o; Académico 2 o; Instrumental Arcano de campo 2 o; mantenimiento de armas de fuego 1 o.

Otros: Gancho de escalada 3 p; Palanca 2 p; Pico o pala 2 p; Caja pequeña asegurada 5 p; Catalejo 1 o; Estuche impermeable de documentos/mapas 5 p; Provisiones 7 días 2 p; Combustible de iluminación 5 noches 2 p; Repuesto médico 5 usos 5 p; materiales de escritura 2 p.

Las fórmulas alquímicas y otros bienes cuyo precio anterior estaba expresado en Coronas históricas quedan **sin precio monetario establecido** hasta que su valoración sea ratificada específicamente. No se convierte ese precio legado por inferencia.

### Compra, venta y fabricación

La **venta rápida** usa una referencia exacta del **25%** del valor aplicable, calculada sobre la cantidad real y redondeada una sola vez hacia abajo al cobre. Una **venta directa** no posee una tasa universal; alrededor del 50% es sólo una referencia posible cuando exista comprador y se acuerde ese valor.

Fabricar un objeto produce el objeto, no dinero automático. La rentabilidad exige costes, tiempo, comprador y precio de venta reales. Dinero compra recursos y servicios disponibles; **PD compra desarrollo personal**.

### Adaptación de equipo — REV-CREA-08-001

Adaptación menor: recargo **25%** del precio base. Adaptación mayor: **50%**. El recargo mínimo es **1 p = 10 c**. Si el porcentaje produce fracción de cobre, el recargo se redondea hacia arriba al cobre entero.

### Migración de crowns

**crowns** es un campo legado obsoleto, no una cuarta moneda canónica. No tiene equivalencia automática. Foundry preserva el valor original y marca el Actor como pendiente hasta que una persona indique explícitamente cuántos cobres vale 1 crown o confirme que debe archivarse sin convertirlo. Nunca se suma crowns silenciosamente a un saldo canónico existente.

## 20. Pueblos, herencias, culturas y orígenes

### Regla mecánica vigente

Tierra Mágica **no utiliza paquetes mecánicos obligatorios ni gratuitos por pueblo, especie, cultura u Origen**. Todos los personajes se construyen sobre la misma economía de **25 PD + 3 PR + PEI 20 o + Reserva líquida 2 o**.

Los pueblos y Orígenes describen identidad, procedencia, idioma, costumbres, anatomía, contactos, posición social, creencias y ficción. No conceden automáticamente Atributos, Habilidades, PD, PR, Defensa, Vida, Maná, acciones, Técnicas, Disciplinas, hechizos ni competencias.

Las diferencias que realmente tengan efecto mecánico se representan mediante las reglas universales existentes:

- **Rasgos** para propiedades persistentes como visión especial, respiración acuática, trepa, corpulencia, miembros extraordinarios, afinidad sobrenatural o resistencia ambiental.
- **Escala** cuando el tamaño corporal sea realmente distinto.
- **Habilidades, Especializaciones y Técnicas** para entrenamiento.
- **Equipo** para recursos materiales.
- **Magia** para capacidades sobrenaturales aprendidas o vinculadas.

Un mismo beneficio no se obtiene gratis por identidad narrativa y se compra otra vez como Rasgo. Tampoco una desventaja racial u originaria genera PR adicionales.

### Cultura y origen

Un Origen puede ser urbano, rural, fronterizo, académico, gremial, militar, nómada, religioso, arcano-industrial u otra procedencia coherente. Es una descripción de historia y acceso narrativo, no un paquete de bonificaciones.

Puede justificar que el personaje compre determinadas Habilidades, Especializaciones, contactos, licencias o equipo dentro de sus presupuestos normales. No crea recursos extra.

### Profesiones

La profesión u oficio describe la trayectoria del personaje. No constituye una clase. Un «soldado», «ingeniera», «sanador», «exploradora», «alquimista» o «canalizador» se define por cómo gasta sus PD, PR y Coronas, no por un paquete obligatorio.

### Pueblos y diversidad

El canon reconoce numerosos pueblos y linajes. Su historia, culturas y relaciones se desarrollan en la Parte II y en la mitología recuperada de la Parte III. Que una tradición atribuya un origen divino a un pueblo no obliga a sus miembros a seguir una religión, moral, profesión o cultura concreta.

Una herencia mixta debe ser coherente en anatomía y ficción. No sirve para sumar gratuitamente todas las ventajas potenciales de dos linajes. Si una propiedad extraordinaria tiene efecto mecánico, se representa mediante la economía universal correspondiente.

## 21. Guía narrativa de Origen y pertenencia

Al crear un personaje conviene registrar:

- pueblo/herencia y fisiología relevante;
- región o ciudad de procedencia;
- cultura principal y posibles culturas secundarias;
- idioma(s);
- profesión u oficio;
- educación o tradición;
- contactos, obligaciones y reputación;
- relación con gremios, órdenes, templos, instituciones o estados;
- actitud hacia magia, tecnología, religión y la Concordia.

Estos datos son importantes porque la ficción establece acceso, conocimiento, leyes, reputación, permisos, información y consecuencias. Sin embargo, no funcionan como bonos numéricos ocultos.

## 22. Vehículos, monturas y autómatas

Vehículos, monturas y autómatas usan perfiles reducidos con **Escala, Movimiento, Vida, Defensa, Protección, Maniobra, Tripulación, Capacidad y Sistemas/Rasgos**. No necesitan reproducir toda la ficha de un PJ.

Conducir o montar en condiciones rutinarias no exige prueba. Una maniobra peligrosa usa **2d10 + Atributo apropiado + Manejo o Pilotaje**. Un vehículo tiene su propia Defensa: la AGI del piloto no se convierte automáticamente en Defensa del vehículo.

### Monturas

El jinete conserva su Acción y la montura proporciona su Movimiento cuando está entrenada y controlada. Una acción táctica significativa de una montura entrenada consume normalmente la Acción del jinete. El movimiento ordinario dirigido de la montura no crea una Reacción táctica independiente gratuita.

### Autómatas

Un autómata puede ser una herramienta automatizada o un actor independiente según su diseño. Automatizar una tarea no concede por sí mismo acciones adicionales al propietario. Un autómata auxiliar sigue las restricciones de su programa, órdenes, Energía/Caudal y perfil; uno verdaderamente independiente se trata como PNJ con criterio y economía propia según corresponda.

El juego no incorpora un subsistema de combate masivo preventivo. Batallas de gran escala se resuelven con las herramientas normales, escenas y objetivos relevantes hasta que una necesidad de juego reproducible justifique reglas adicionales.

## 23. PNJ y criaturas

Los PNJ se construyen directamente para representar su función; no necesitan gastar PD como un personaje jugador. El mundo no escala automáticamente con el nivel del grupo. Una criatura peligrosa conserva su identidad mecánica independientemente de quién la enfrente.

Las categorías de amenaza son **Trivial, Favorable, Equilibrada, Peligrosa y Extrema**. Son una lectura contextual, no una suma de “CR”. Terreno, objetivos, información, número de participantes, preparación y recursos pueden desplazar aproximadamente una categoría o más.

Un enemigo dominante se distingue por presencia táctica, capacidades, posición y opciones, no por inflar Vida arbitrariamente ni por una Resistencia Legendaria universal.

### Perfiles de referencia

| PNJ / criatura | Vida | Def | Corp | Mental | Maniobra | Prot | Mov | Inic. | Ataque principal |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Civil | 12 | 12 | 12 | 12 | 12 | 0 | 6 | +1 | Contextual |
| Bandido | 12 | 13 | 12 | 12 | 13 | 1 | 6 | +2 | Espada corta +4, daño 6; arco corto +4, daño 6 |
| Guardia | 14 | 14 | 13 | 12 | 14 | 2 | 6 | +2 | Lanza +4, daño 7, Pen 1, Alcance |
| Soldado | 14 | 14 | 13 | 13 | 15 | 3 | 6 | +3 | Marcial +5, daño 7–8, Pen 1 |
| Veterano | 16 | 16 | 14 | 14 | 17 | 3 | 6 | +4 | Ataque +7, daño 8, Pen 1 |
| Tirador | 12 | 14 | 12 | 13 | 13 | 1 | 6 | +4 | Rifle +7, daño 7, Pen 3 |
| Canalizador hostil | 12 | 13 | 12 | 15 | 12 | 0–1 | 6 | +3 | Maná 15, Canalización +6 |
| Lobo | 10 | 14 | 13 | 11 | 13 | 0 | 8 | +4 | Mordida +5, daño 5 |
| Ogro | 28 | 11 | 16 | 11 | 17 | 2 | 6 | +1 | Garrote +7, daño 11, Pen 1 |
| Centinela de Bronce | 22 | 12 | — | 12* | 16 | 5 | 4 | +1 | Golpe +6, daño 8, Pen 2 |
| Troll dominante | 32 | 13 | 17 | 13 | 18 | 4 | 6 | +3 | Garra +7, daño 9 Pen 1; martillo +7, daño 11 Pen 2 |

El asterisco de un constructo indica que su “Defensa Mental” representa sólo efectos capaces de afectarlo; no implica biología o mente ordinaria. Un espíritu menor puede tener inmunidad causal frente a ataques físicos ordinarios si su naturaleza lo establece; eso no se convierte en una inmunidad genérica de todos los espíritus.

Un Troll dominante puede incluir Barrido, empuje reactivo, descarga y dos Reacciones entre turnos propios cuando su perfil lo especifique. Esas Reacciones siguen sin poder repetirse sobre el mismo disparador salvo capacidad expresa.

## 24. Dirección de juego

El Director determina primero qué está ocurriendo en la ficción, si una acción es posible y si existe incertidumbre significativa. La tirada resuelve incertidumbre; no sustituye causalidad, competencia o información.

No se pide una prueba para tareas rutinarias de un personaje competente en condiciones adecuadas. Tampoco se permiten intentos repetidos idénticos hasta obtener un resultado alto. Si el enfoque, tiempo, herramientas, posición, información o riesgo cambian de forma significativa, puede existir una nueva prueba.

Los modificadores circunstanciales deberían permanecer normalmente dentro de **-3 a +3 en total**. Cuando una circunstancia sea más decisiva, es preferible usar Ventaja/Desventaja, cambiar la posibilidad de la acción o establecer una consecuencia concreta.

Las Habilidades especializadas pueden exigir entrenamiento real. Un resultado alto de Historia no inventa un texto que el personaje nunca estudió; Persuasión no es control mental; Investigación no crea evidencia; Percepción no implica interpretación. La información obtenida debe corresponder a lo que la acción podía descubrir.

### Conflictos y consecuencias

Antes de una prueba importante conviene establecer intención, riesgo y coste. Un fallo no tiene que significar siempre “no ocurre nada”: puede consumir tiempo, revelar posición, gastar recursos, producir una complicación o forzar una elección, siempre que la consecuencia derive de lo que estaba en juego.

Hazaña y Pifia son capas extraordinarias sobre éxito/fallo. Sus consecuencias deben respetar la naturaleza de la acción. Una Hazaña fallida puede producir una ventaja colateral sin convertir el intento principal en éxito; una Pifia exitosa puede lograr el objetivo con una complicación grave.

### Diseño de encuentros

No existe un número obligatorio de encuentros por día. La recuperación de Vida, Maná, Fatiga, consumibles y Saturación determina el ritmo de desgaste. Un encuentro se evalúa por participantes, posición, objetivos, terreno, información y capacidades, no sólo por Vida o daño.

Los jefes no reciben inmunidades arbitrarias contra control. El catálogo ordinario evita que una única opción barata elimine sostenidamente todas sus acciones; cuando una criatura tenga una inmunidad o resistencia especial, debe proceder de su naturaleza o perfil.

### Reglas antes que excepciones

No se crea un subsistema nuevo para anticipar un problema hipotético. Primero se usa el núcleo, después una propiedad o Técnica concreta y sólo se añade una regla nueva cuando exista una necesidad reproducible que el sistema actual no resuelva bien.


## 25. Cosmología: los Principios Primordiales

Esta sección consolida la cosmología conforme a **Tierra Mágica — Canon del Mundo v1.2** y al material histórico que éste mantiene vigente. Las reglas mecánicas antiguas o no ratificadas no se reintroducen por esta vía.

La cosmología conocida se articula alrededor de siete acontecimientos primordiales: **Primera Semilla, Primera Forja, Primera Guerra, Primera Elección, Primera Luz, Primera Profanación y Primer Tránsito**. Cada uno expresa un principio y está asociado a una deidad primordial. Estos principios no obligan moralmente a los pueblos creados por cada dios: origen, cultura, religión y conducta individual son dimensiones distintas.

| Deidad | Acontecimiento | Principio | Creaciones primordiales |
|---|---|---|---|
| Eïra | Primera Semilla | Vida | Feéricos, Élficos, Terios |
| Khorun | Primera Forja | Materia y Forma | Enanos, Gigantes, Elementales |
| Varkor | Primera Guerra | Conflicto | Orcos, Trolls, Ogros, Goblinoides |
| Aster | Primera Elección | Elección | Humanos |
| Ilyr | Primera Luz / Primer Juramento | Bien | Celestiales o Ángeles |
| Nereth | Primera Profanación | Corrupción / Mal | Demonios; origen de la No Muerte |
| Vaelun | Primer Tránsito | Tránsito | Ankar |

Con Vaelun se cierra el **Panteón Primordial**. El rango primordial describe función cosmológica, no número de fieles, poder político ni exclusividad de dominio.

### Las Cinco Luminarias y el Panteón Central

El Canon del Mundo v1.2 establece además cinco **Dioses Menores reales**, posteriores a los Primordiales y conocidos como las **Cinco Luminarias**. No son nombres alternativos, avatares ni aspectos de los Primordiales, aunque algunos ámbitos puedan solaparse.

| Luminaria | Ámbitos asociados |
|---|---|
| **Aurea, la Llama** | vida, hogar, valor, renovación y juramentos de protección |
| **Nemor, el Guardián** | muerte, memoria, ancestros, límites y custodia de tumbas |
| **Oria, la Balanza** | ley, intercambio, acuerdos y conocimiento registrado |
| **Vael, el Navegante** | viaje, cambio, tormentas, descubrimiento y fortuna incierta |
| **Selene, la Velada** | sueño, misterio, percepción, secretos y fronteras entre mundos |

Los siete Primordiales y las cinco Luminarias forman los **Doce del Panteón Central canónico conocido**. Pueden existir otros dioses, espíritus regionales, santos, ancestros, héroes divinizados y entidades planares, pero su existencia no los incorpora automáticamente al Panteón Central.

Los dominios divinos no son propiedades exclusivas. Eïra y Aurea pueden compartir aspectos de vida; Ilyr y Aurea, protección; Vaelun y Nemor, muerte y memoria; Aster y Vael, viaje y descubrimiento; Ilyr y Oria, justicia y ley; Vaelun y Selene, fronteras espirituales. Estos solapamientos no implican identidad.

## 26. Eïra y la Primera Semilla

**Eïra, Madre de la Primera Semilla**, representa la Vida. Su obra primordial se expresa mediante tres imágenes: **Hoja, Savia y Sangre**, tres formas en que la naturaleza aprendió a pensar.

**La Hoja** dio origen a los Feéricos. El canon histórico incluye Hadas, Sátiros, Dríades, Trents, Náyades, Nereidas, Silfos, Duendes del bosque, linajes Centáuricos, Espíritus florales y Feéricos estacionales. Son familias y pueblos vinculados de maneras distintas con procesos, lugares y manifestaciones naturales; no constituyen una única anatomía.

**La Savia** dio origen a los Élficos. Las tradiciones distinguen Altos Elfos, Elfos Silvanos y Elfos Oscuros, además de poblaciones élficas no adscritas necesariamente a esas ramas.

**La Sangre** dio origen a los Terios, llamados Anihombres en muchas culturas. Son pueblos nacidos como tales, no humanos transformados. Un Terio lupino, por ejemplo, no es un hombre lobo: la licantropía, si existe, es otro fenómeno —maldición, enfermedad, transformación, pacto o magia—.

El canon también reconoce otros hijos de la Primera Semilla, entre ellos Micelios, Verdantes y Coralios. Su existencia no implica todavía paquetes mecánicos jugables completos.

Eïra puede ser Fuente Divina mediante un Vínculo apropiado. Apariencia, manifestaciones, dogma, templos, sacerdocio, festividades, mandamientos, avatares, milagros y detalles de Vínculos Divinos permanecen deliberadamente abiertos allí donde el canon vigente no los ha fijado.

## 27. Khorun y la Primera Forja

**Khorun, el Primer Forjador**, encarna **Materia y Forma**. Sus títulos tradicionales incluyen Padre de la Montaña, Señor de las Profundidades, Aquel que Dio Forma y Corazón del Mundo. Sus dominios abarcan piedra, metal, fuego interior, montañas, cavernas, minerales, forja, construcción, resistencia, fuerza, creación material y fuerzas elementales. Su símbolo tradicional es un martillo vertical sobre una montaña partida con una brasa en el centro.

La Primera Forja se expresa mediante **Piedra, Montaña y Chispa**.

**La Piedra** originó a los Enanos. Las tradiciones históricas distinguen Enanos de Montaña, Profundos, de Forja y Errantes. La creación material ocupa un lugar central en muchas de sus culturas, pero no determina la profesión de cada individuo.

**La Montaña** originó a los Gigantes. El canon reconoce linajes de Piedra, Montaña, Fuego, Escarcha, Tormenta y Mar, además de Titanes.

**La Chispa** originó a los Elementales. Un **Elemental verdadero** es una entidad consciente descendiente de la Primera Forja; una **manifestación elemental** es materia o energía animada temporalmente por magia, ritual, artefacto u otro procedimiento. Las grandes familias abarcan Tierra, Fuego, Agua y Aire. Los grados narrativos distinguen Espíritus Elementales menores, Elementales plenamente conscientes y Primordiales ligados a fenómenos de enorme escala.

También se registran Gárgolas, Cristálidos, Ígneos y Pétreos entre otros hijos de la Primera Forja.

Eïra despertó la Vida; Khorun despertó la Materia y la Forma. El canon no los trata como principios incompatibles: sus creaciones y doctrinas pueden intersectarse.

## 28. Varkor y la Primera Guerra

**Varkor, Señor de la Primera Guerra**, representa el **Conflicto**. Entre sus títulos se encuentran Puño Rojo, Padre de los Fuertes, Rompedor de Cadenas y Aquel que No Retrocede. Sus dominios incluyen guerra, fuerza, valor, conquista, resistencia, furia, competencia, desafío, supervivencia mediante la lucha y victoria.

Su creación se expresa mediante las **Cuatro Virtudes de Varkor**: **Colmillo, Garra, Puño y Ojo**.

**El Colmillo** originó a los Orcos y simboliza fuerza disciplinada y voluntad guerrera. El lore registra Orcos Comunes, de Sangre, Grises y Negros.

**La Garra** originó a los Trolls y simboliza resistencia, supervivencia y ferocidad. Se registran Trolls de Bosque, Piedra, Pantano, Montaña, Hielo y Guerra. La regeneración no es idéntica entre linajes y sus límites mecánicos no deben deducirse del lore.

**El Puño** originó a los Ogros y simboliza poder físico y dominación directa. Se registran Ogros Comunes, de Guerra, de las Estepas, de Montaña y Ogros Magos.

**El Ojo** originó a los Goblinoides y simboliza astucia, número, adaptación y guerra mediante inteligencia. Incluye Goblins, Hobgoblins, Bugbears, variantes goblinoides y Kobolds.

Ningún pueblo creado por Varkor nace moralmente malvado. La herencia divina puede explicar rasgos físicos o símbolos culturales; la moral depende de individuos, sociedades, circunstancias e historia. Para Varkor, fuerza tampoco equivale necesariamente a tamaño: significa capacidad de imponer o preservar la voluntad frente a aquello que intenta quebrarla.

## 29. Aster y la Primera Elección

**Aster, Señor de las Mil Sendas**, introduce el principio de **Elección**: la capacidad de reconocer alternativas y escoger un rumbo no determinado de antemano. Sus dominios incluyen libertad, voluntad, ambición, descubrimiento, exploración, invención, progreso, civilización, cambio, legado y caminos.

Aster no representa bondad automática. La libertad puede crear o destruir; la ambición puede fundar una ciudad o iniciar una guerra. Su principio es la posibilidad consciente de decir: **podría hacer otra cosa**.

Según la tradición, Aster creó al primer Humano sin imponerle un don dominante ni un propósito único. Le mostró el mundo y le preguntó qué quería hacer. El Humano señaló el horizonte y quiso descubrir qué había allí. Ese acto es recordado como la **Primera Elección**.

Los Humanos son los **Hijos del Camino**. No existen subrazas humanas divinas originales: su diversidad posterior procede de migraciones, climas, culturas, mezclas poblacionales, magia, religión, guerras, aislamiento, alimentación, historia y adaptación.

El llamado **Don sin Forma** no concede fuerza, longevidad o resistencia sobrenatural; expresa la ausencia de una función primordial estrecha. La brevedad de la vida humana produce en muchas culturas una urgencia por construir, explorar, investigar, transmitir y dejar **Legado**.

Las **Cinco Sendas** son símbolos, no castas: **Camino** (exploración), **Mano** (creación), **Voz** (sociedad), **Mirada** (conocimiento) y **Huella** (legado).

La doctrina de Aster contiene una contradicción consciente: los mismos seres capaces de elegir pueden construir leyes, fronteras, ejércitos, prisiones e imperios que limiten la elección ajena. Sus cultos pueden discrepar sobre cómo reconciliar libertad y civilización. Elegir no elimina consecuencias.

Raza y culto no son equivalentes. Un miembro de cualquier pueblo puede venerar a Aster, y un Humano puede vincularse religiosamente con otra deidad cuando la ficción lo permita.

## 30. Ilyr y la Primera Luz

**Ilyr, Portador de la Primera Luz**, representa el **Bien** como principio moral consciente. Sus dominios son luz, protección, misericordia, justicia, esperanza, sacrificio, sanación, verdad, juramentos y redención. Su símbolo es un sol blanco o dorado rodeado por seis alas.

La **Primera Luz** introduce la pregunta moral no sólo sobre qué puede hacerse, sino sobre qué debería hacerse. El **Primer Juramento** afirma la posibilidad de elegir proteger a quien lo necesita.

Ilyr creó a los **Celestiales o Ángeles**. Los Ángeles son una familia de seres propia: no son almas de mortales virtuosos ni héroes muertos transformados. Ser celestial tampoco significa ser invulnerable; siguen sometidos a límites, costes y consecuencias.

El **Juramento de las Seis Alas** articula seis principios: Protección, Misericordia, Justicia, Verdad, Sacrificio y Esperanza. Las tradiciones distinguen Custodios, Heraldos, Luminares, Justicarios, Virtudes, Serafines, Tronos y Querubines, además de Celestiales menores como Chispas, Guías, Vigilantes y Portadores.

La libertad moral implica posibilidad de caída. Un Celestial puede quebrar su juramento o actuar contra Ilyr. Un **Ángel Caído no es automáticamente un Demonio**. La tradición ilyrana mantiene además la posibilidad de redención mientras exista capacidad real de elección, sin que redención borre consecuencias o equivalga a perdón automático.

La naturaleza, por sí sola, no es moralmente malvada por funcionar como naturaleza. La moralidad requiere algún grado de voluntad y elección.

## 31. Nereth y la Primera Profanación

**Nereth, Señor de la Primera Profanación**, encarna **Corrupción / Mal**. No es el dios de la muerte natural. Sus dominios incluyen corrupción, dominación, crueldad, traición, necromancia, profanación, esclavitud del alma, conocimiento prohibido, demonios, pactos oscuros y No Muerte.

La **Primera Maldad** se define en las tradiciones no como el primer dolor o acto violento, sino como la primera elección consciente de causar o explotar un sufrimiento comprendido.

La **Primera Profanación** ocurre cuando Nereth viola el final natural de un muerto y produce la primera No Muerte. La muerte no es malvada; la No Muerte es una alteración del orden natural. Su origen es una profanación, aunque un No Muerto consciente puede conservar voluntad, memoria y capacidad moral propias.

El lore distingue estados de No Muerte: **Cascarones, Atados, Espectrales, Hambrientos y Soberanos de la Muerte**. Son categorías narrativas; no constituyen por sí mismas estadísticas completas.

La Necromancia prohibida comienza cuando una práctica exige **retener, esclavizar, alterar, consumir o utilizar aquello que debería haber abandonado el mundo**. No toda interacción con espíritus es automáticamente necromancia prohibida.

Nereth creó además a los **Demonios**, un linaje propio. Demonio y Ángel Caído no son sinónimos. Las castas registradas incluyen Tentadores, Dominadores, Devoradores, Verdugos, Profanadores y Archidemonios, además de demonios menores y entidades asociadas a pactos.

Los planos demoníacos, Archidemonios concretos, posesión, corrupción mecánica, catálogo completo de No Muertos, Necromancia y pactos permanecen pendientes donde el canon histórico los dejó abiertos.

## 32. Vaelun y el Primer Tránsito

**Vaelun, Guardián del Último Umbral**, representa el **Tránsito**. Sus dominios abarcan muerte natural, descanso, almas, funerales, memoria de los muertos, ancestros, equilibrio entre vida y muerte, protección de tumbas y persecución de la No Muerte.

Vaelun no mata ni determina necesariamente cuándo debe morir alguien. Su función comienza cuando la vida termina. Eïra gobierna el ciclo vital; Vaelun custodia el paso de la consciencia después de ese final.

Cuando murió el primer ser plenamente consciente quedó una esencia con identidad, memoria y continuidad: el alma. Vaelun no intentó devolverla a la vida; la guio a cruzar. Ese acontecimiento es el **Primer Tránsito**.

El canon establece que la muerte consciente produce un tránsito real y que las almas pueden ser vulnerables mientras está incompleto. **El destino último de las almas permanece deliberadamente abierto**: no existe todavía una cosmología única y cerrada del más allá.

Vaelun creó a los **Ankar** para impedir que las almas fueran tomadas contra su voluntad. Son humanoides altos y esbeltos de rasgos cánidos estilizados. **Ankar y Terio Chacal no son la misma raza**: el segundo pertenece a la Sangre de Eïra; el primero fue creado directamente por Vaelun.

La filosofía Ankar se resume en tres obligaciones: **Recordar**, preservando nombres, historias y memoria; **Custodiar**, protegiendo tumbas, rutas espirituales y lugares vulnerables; y **Dejar Partir**, distinguiendo memoria y duelo de la retención de un alma.

Un Ankar puede escuchar ecos, detectar presencias, identificar No Muertos, realizar ritos funerarios, investigar muertes o guiar almas sin convertirse por ello en nigromante. Tampoco está obligado a destruir automáticamente todo No Muerto consciente: debe distinguir voluntad, causa y profanación. Un espíritu perdido puede ser guiado; un ser que esclaviza otras almas representa una transgresión mucho más profunda.

La oposición entre Vaelun y Nereth es central: para Vaelun, un cadáver conserva dignidad y un alma pertenece a sí misma; para Nereth, ambos pueden convertirse en recursos.

## 33. Relaciones del Panteón y límites de canon

Los siete principios forman una secuencia cosmológica, no una tabla simple de aliados y enemigos. Eïra y Khorun describen Vida y Forma; Varkor introduce Conflicto; Aster, Elección; Ilyr, responsabilidad moral; Nereth, la corrupción deliberada de esos límites; Vaelun, el derecho al final y al tránsito.

Los cultos no son equivalentes a las deidades. Instituciones religiosas pueden equivocarse, dividirse, corromperse o interpretar de forma diferente un mismo principio. Una deidad no aprueba automáticamente todo lo que una organización realiza en su nombre.

Las deidades pueden actuar como **Fuente Divina** para personajes con un Vínculo apropiado. Esto concede acceso narrativo/mágico según las reglas correspondientes, no autoridad moral automática, inmunidad a consecuencias ni un paquete universal de poderes.

Permanecen abiertos para desarrollo futuro los elementos que el canon vigente y el material histórico mantienen expresamente sin fijar: avatares y apariencias definitivas, dogmas completos, estructuras universales de culto, festividades, milagros detallados, Vínculos Divinos específicos, planos, destino último de las almas, Archidemonios concretos, mecánicas completas de corrupción/posesión/Necromancia y numerosos paquetes jugables de pueblos primordiales. El Manual Maestro no rellena esos huecos por inferencia.

---

# PARTE II — CANON DEL MUNDO v1.2 INTEGRADO

> **VIGENTE — CANON NARRATIVO.** Esta Parte reproduce e integra el contenido del Canon del Mundo v1.2 recuperado de las fuentes del proyecto. Si una sección resumida de la Parte I entra en conflicto con esta Parte en una cuestión puramente narrativa, prevalece esta Parte. Las consecuencias mecánicas, en cambio, deben estar expresamente definidas en la Parte I.

## 1. Los pilares canónicos
• La magia existe en toda persona como potencial, pero el uso competente requiere formación,
conocimiento, Maná, método y acceso. No toda la población es lanzadora de hechizos.
• La civilización combina fantasía medieval tardía, ingeniería de vapor y tecnología arcana.
Ferrocarriles, dirigibles, armas de fuego, autómatas y acumuladores existen junto a castillos,
gremios, órdenes religiosas y criaturas fantásticas.
• La magia no reemplaza la economía ni las profesiones. Los grandes efectos exigen especialistas,
infraestructura, materiales, energía, permisos o pactos.
• El mundo es antiguo y parcialmente conocido. Ruinas, rutas olvidadas y zonas alteradas preceden a
los estados actuales y son fuentes reales de riqueza, peligro y disputa.
• Los dioses, espíritus y entidades externas pueden conceder poder, pero ningún culto posee una
demostración absoluta y completa de la cosmología. La fe convive con evidencia mágica sin eliminar
el misterio.
• La expansión tecnológica no ha producido una modernidad segura. Un rifle, una bestia enorme, una
mala expedición o una guerra industrial siguen siendo amenazas letales.
• Las fronteras importan. Leyes, gremios, licencias, peajes, idiomas de corte, monedas regionales y
derechos de paso afectan el viaje y la aventura.
La región principal de juego
La mayoría de campañas comienzan en el continente de Edria, una masa continental rodeada por
archipiélagos y rutas oceánicas todavía incompletamente cartografiadas. Edria concentra seis grandes
potencias, varias ciudades libres y una red de corredores comerciales construidos sobre calzadas
antiguas. La cartografía común representa bien sus costas y centros poblados, pero las montañas,
bosques profundos, ruinas subterráneas y regiones de alta saturación mágica siguen siendo imprecisas.
Fecha presente
El presente canónico es el año 612 de la Concordia (612 C.). La Concordia no marca el origen del mundo:
fue el tratado que terminó la Guerra de las Coronas Rotas y estableció el calendario diplomático usado
hoy por las principales potencias.
## 2. Historia de Tierra Mágica
Antes de la Concordia: las edades antiguas
Los registros más antiguos hablan de la Edad de los Fundadores, civilizaciones capaces de construir
observatorios, caminos ciclópeos y complejos de canalización ambiental. No se sabe si fueron una única
cultura o varias tradiciones conectadas. Sus obras aparecen en territorios separados por miles de
kilómetros y comparten una obsesión por medir corrientes mágicas, cuerpos celestes y geometrías que
hoy resultan parcialmente incomprensibles.
La Edad de los Pactos siguió a su desaparición. Reinos tempranos, pueblos nómadas, clanes de montaña
y ciudades costeras establecieron vínculos con dioses, espíritus y entidades externas. De esta época
proceden los primeros juramentos divinos reconocibles, muchos linajes de familiares y las
prohibiciones rituales que aún conservan templos y colegios arcanos.
Los primeros vínculos familiares
Durante la Edad de los Pactos también se documentaron los primeros Vínculos Familiares. Algunas
comunidades observaron que ciertos niños y jóvenes con una resonancia mágica especialmente intensa
sufrían episodios de inestabilidad antes de alcanzar su madurez arcana. La presencia de determinadas
criaturas, espíritus o entidades compatibles podía estabilizar ese flujo. De esas prácticas surgieron
tradiciones familiares, rituales de búsqueda y los linajes de familiares mencionados en los registros
antiguos.
Este fenómeno no afecta a toda la población. La mayoría de las personas atraviesa el crecimiento sin
necesitar un Familiar. En quienes presentan riesgo, la Saturación Mágica juvenil describe una
dificultad para estabilizar la resonancia propia durante el desarrollo; no representa una reserva de
Maná que crece por encima de su máximo. En humanos se vigila especialmente durante la infancia y
antes de los quince años; otros pueblos siguen ritmos acordes con su propia madurez biológica y
mágica.
La Fractura del Cielo
Hace aproximadamente novecientos años ocurrió la Fractura del Cielo, el acontecimiento más
importante de la historia conocida. Durante tres noches se observaron auroras a plena luz del día,
cambios de gravedad local, tormentas de energía y el surgimiento de islas flotantes en varias regiones.
Grandes depósitos de cristal arcano aparecieron donde antes no existían y numerosas ruinas antiguas
se activaron o quedaron expuestas.
La Fractura no creó la magia, pero alteró su distribución. Algunas zonas se volvieron ricas en energía
ambiental y otras quedaron inestables. La navegación, la religión y el estudio arcano cambiaron para
siempre. Ninguna explicación es universalmente aceptada: los colegios hablan de una reconfiguración
de corrientes; varios cultos la consideran una herida entre mundos; ciertas tradiciones antiguas
afirman que fue una corrección deliberada de los Fundadores.
Los Cristales de Resonancia
Entre los depósitos arcanos expuestos o formados tras la Fractura aparecieron formaciones
excepcionalmente raras capaces de responder a la resonancia de un individuo. Los estudiosos las
denominan Cristales de Resonancia. En el habla popular también reciben nombres como huevos de
familiar por su forma cerrada y por el proceso de vínculo que puede comenzar a su alrededor, aunque
no son huevos ni contienen una criatura gestándose.
El cristal no crea al Familiar. Actúa como ancla de resonancia que facilita el encuentro, la
manifestación estable o la consolidación del vínculo entre una persona y una entidad compatible. Esta
distinción conserva los linajes de familiares anteriores a la Fractura: los vínculos existían antes que
estos yacimientos, pero la disponibilidad de cristales adecuados permitió que la tradición se volviera
más segura, sistemática y accesible en determinadas regiones.
Los Cristales de Resonancia útiles son escasos. Los yacimientos conocidos se encuentran sometidos a
custodia, regulación o tradición local estricta, y su extracción exige identificar piezas intactas sin
destruir su patrón resonante. No se fija todavía un único yacimiento principal para todo Edria; distintos
estados, órdenes y comunidades pueden proteger fuentes diferentes.
Los siglos de recomposición
Tras la Fractura surgieron nuevas ciudades alrededor de fuentes arcanas, pasos seguros y ruinas
recuperables. Los primeros acumuladores estables fueron desarrollados dos siglos después, al principio
como dispositivos ceremoniales y luego como infraestructura civil. La pólvora llegó mucho más tarde y
fue transformada por la metalurgia y la ingeniería de precisión. La combinación de ambas tradiciones
—energía arcana y máquina— dio origen a la actual tecnología arcano-industrial.
La expansión no fue lineal. Epidemias, guerras sucesorias y crisis de recursos destruyeron varios
reinos. La actual Edria es heredera de esa inestabilidad: casi toda frontera moderna atraviesa
territorios reclamados por estados desaparecidos, linajes extinguidos o ciudades que alguna vez fueron
soberanas.
## 3. La edad moderna y la Concordia
La Guerra de las Coronas Rotas
Entre 0 y 11 C. —fechada retroactivamente por los tratados posteriores— tres casas dinásticas
intentaron dominar el corredor central de Edria y sus minas de cristal. La guerra comenzó como
disputa sucesoria y terminó involucrando a casi todas las potencias vecinas. Se emplearon por primera
vez baterías de artillería coordinadas con barreras arcanas, dirigibles de observación y autómatas de
asedio en cantidades significativas.
El conflicto demostró que ningún reino podía controlar por sí solo las rutas, los centros de producción y
los especialistas necesarios para mantener una guerra prolongada. Ciudades enteras quedaron
endeudadas con gremios de ingenieros y casas mercantiles. Al mismo tiempo, templos y hospitales
civiles desarrollaron redes de ayuda que sobrevivieron a la guerra y hoy son instituciones
permanentes.
El Tratado de Concordia
En el año 12 C. se firmó la Concordia de Auraval. El tratado reconoció seis potencias mayores, estableció
normas mínimas para el tránsito diplomático, prohibió ciertas prácticas de guerra mágica contra
población civil y creó la Mesa de Concordia, una asamblea sin soberanía propia donde enviados
estatales, delegados gremiales y observadores religiosos negocian crisis internacionales.
La Concordia no trajo paz permanente. Redujo las guerras abiertas entre las grandes potencias, pero
trasladó muchas rivalidades hacia comercio, espionaje, expediciones, sabotaje industrial y conflictos
periféricos.
La Segunda Forja
Los últimos ciento cincuenta años reciben el nombre de Segunda Forja. La mejora de calderas,
aleaciones, mecanismos de repetición y acumuladores permitió ferrocarriles, redes de bombeo,
elevadores urbanos y dirigibles mercantes. Las ciudades crecieron con rapidez y aparecieron barrios
fabriles, estaciones fortificadas, academias técnicas y mercados de componentes arcanos.
El presente es una época de expansión y tensión. Las potencias desean nuevas fuentes de cristal, rutas y
conocimiento antiguo. Los gremios reclaman autonomía. Los campesinos y artesanos tradicionales se
adaptan a mercados más amplios. La magia cotidiana es visible, pero la magia de alto nivel continúa
siendo escasa y políticamente sensible.
Cronología esencial
Fecha Hecho
c. -900 C. Fractura del Cielo; aparición de zonas de alta saturación e
islas flotantes.
c. -700 C. Primeros acumuladores ambientales estables.
c. -320 C. Difusión de pólvora refinada y fundiciones de precisión.
-150 a -40 C. Primeras líneas ferroviarias regionales y dirigibles de
carga.
0–11 C. Guerra de las Coronas Rotas.
12 C. Tratado de Concordia de Auraval.
447 C. Apertura de la Línea del Espinazo, primer corredor
ferroviario transcontinental de Edria.
598 C. Crisis de Nacre: desaparición de tres expediciones en un
archipiélago de ruinas emergentes.
612 C. Presente canónico.
## 4. Las seis potencias de Edria
Reino de Valdoria
Valdoria ocupa las tierras fértiles del centro occidental. Es una monarquía de tradición feudal
reformada: la Corona comparte poder con Cortes regionales, ciudades con fueros y colegios
profesionales. Su legitimidad descansa en proteger rutas interiores y mantener un equilibrio entre
nobleza, ejército y gremios.
Su capital, Auraval, aloja la Mesa de Concordia. Valdoria posee la red de caminos más extensa de Edria,
buena caballería, artillería competente y una burocracia obsesionada con licencias. Su debilidad es
política: cada reforma nacional debe negociarse con territorios acostumbrados a privilegios propios.
Liga de Bronce
La Liga de Bronce es una federación de ciudades industriales del litoral sur. No tiene rey. Cada ciudad
conserva sus leyes y envía delegados a un Directorio común responsable de aduanas, moneda
comercial, defensa naval y grandes obras. Las familias mercantes compiten con sindicatos de oficio,
cooperativas de taller y casas bancarias.
La Liga fabrica armas de fuego, calderas, locomotoras y componentes de autómata. Su riqueza depende
de importaciones de alimento, carbón y cristal. Es la región donde más claramente se ve la vida arcano￾industrial: chimeneas, grúas, tranvías de cable, fábricas, puertos y laboratorios conviven con templos
medievales y barrios amurallados.
Principado de Lysendra
Lysendra es un pequeño estado de valles altos y lagos profundos, gobernado por una casa principesca
apoyada por academias arcanas. Posee pocos recursos agrícolas, pero sus observatorios, bibliotecas y
laboratorios son referentes continentales. La ciudadanía valora el estudio formal, los contratos escritos
y la competencia técnica.
El Principado regula con severidad las investigaciones sobre conjuración, entidades externas y
manipulación de memoria. Sus detractores lo consideran arrogante y secreto; sus defensores sostienen
que muchas catástrofes se evitaron gracias a sus protocolos.
Confederación de Erelia
Erelia reúne valles boscosos, pueblos ribereños y ciudades antiguas del nordeste. La Confederación
carece de capital permanente: un Consejo de Rutas se reúne por rotación en distintas ciudades. Cada
comunidad mantiene gran autonomía, pero comparte normas de comercio, cuidado de bosques y
defensa de pasos.
Erelia domina botánica, alquimia medicinal, navegación fluvial y manejo de recursos ambientales. Los
familiares mágicos son socialmente comunes entre exploradores, guardianes y familias dedicadas a
rutas antiguas. Su principal disputa interna enfrenta a quienes desean industrializar más rápido con
quienes temen dañar zonas de saturación estable.
Dominio de Solenar
Solenar ocupa las mesetas orientales y los corredores que conducen al desierto interior. Es una
monarquía sacra limitada por un Sínodo de órdenes religiosas, magistrados y representantes urbanos.
No es una teocracia unificada: varios cultos reconocidos comparten instituciones civiles y compiten por
influencia.
Solenar mantiene la mayor red de hospicios y hospitales de Edria, además de órdenes armadas
especializadas en escolta de peregrinos y contención de amenazas externas. Su fuerza diplomática
procede de sus mediadores, archivos genealógicos y control de rutas hacia santuarios y ruinas del este.
Holdas de Kharum
Kharum es una confederación de ciudades-fortaleza excavadas en el Espinazo del Mundo. Cada Holda
gobierna sus minas y túneles, mientras un Consejo de Martillos coordina defensa, estándares de
ingeniería y comercio exterior. Sus habitantes consideran que una obra pública debe poder
mantenerse durante generaciones, no solo inaugurarse.
Kharum produce acero, piezas de precisión, maquinaria pesada y gran parte del carbón de alta calidad
de Edria. Sus ferrocarriles de montaña son admirados y temidos. La expansión minera ha despertado
criaturas, sellos y complejos de los Fundadores; por eso la frontera subterránea es uno de los mayores
focos de aventura del continente.
Equilibrio continental
Ninguna potencia domina todos los recursos estratégicos. Valdoria controla rutas y agricultura; la Liga,
manufactura y puertos; Lysendra, conocimiento; Erelia, recursos vivos y fluviales; Solenar, corredores
orientales y redes religiosas; Kharum, metales y pasos montañosos. La interdependencia sostiene la paz
tanto como los tratados.
## 5. Ciudades canónicas
Ciudad Estado Identidad y función
Auraval Valdoria Capital diplomática construida en
terrazas sobre dos ríos. Sede de la
Corona, la Mesa de Concordia y
archivos internacionales. Mezcla
palacios antiguos con estaciones,
puentes de hierro y barrios
gremiales.
Cobravia Liga de Bronce Mayor puerto industrial del sur.
Astilleros, fábricas, mercados de
componentes y barrios obreros. Su
cielo está cruzado por grúas,
chimeneas y dirigibles de carga.
Lys Lysendra Ciudad universitaria levantada
alrededor de un lago profundo y un
observatorio de los Fundadores.
Conocida por sus torres arcanas,
bibliotecas y severos distritos de
investigación.
Verdelinde Erelia Centro fluvial edificado entre árboles
monumentales, canales y muelles
escalonados. Mercado de alquimia,
madera tratada, plantas raras y
expediciones al bosque antiguo.
Heliara Solenar Ciudad de plazas de piedra clara,
santuarios, hospitales y caravasares.
Punto de salida hacia el este y sede
del Sínodo de las Luminarias.
Kar-Dur Kharum Ciudad-fortaleza en una garganta del
Espinazo. Sus barrios descienden al
interior de la montaña y conectan
con fundiciones, talleres y líneas
ferroviarias subterráneas.
Nacariel Ciudad Libre Puerto neutral en una isla de bahía
profunda. Centro de seguros,
cartografía y comercio con
expediciones oceánicas. Su
neutralidad es protegida por
contratos y cañones costeros.
Vigilia Alta Ciudad Libre Asentamiento elevado en torno a una
antigua torre astronómica. Principal
centro de rutas de dirigibles y
observación de islas flotantes.
Risco de Ceniza Frontera Ciudad minera nacida tras una
erupción arcana. Oficialmente bajo
Valdoria, pero dominada por
compañías, buscadores y guardias
privados.
Puerto Umbral Frontera oriental Último puerto seguro antes de rutas
hacia archipiélagos y ruinas
emergentes. Lugar de mercenarios,
académicos, religiosos y
contrabandistas.
Principio urbano
Las grandes ciudades de Tierra Mágica no son decorados homogéneos. Tienen barrios con funciones
diferentes: casco amurallado, estación, mercado mayorista, muelles, talleres, templos, viviendas,
depósitos, hospitales y zonas de infraestructura arcana. La tecnología está integrada en el
funcionamiento urbano y no existe como ornamentación gratuita.
Movilidad dentro de las ciudades
Carros, animales de tiro, ascensores de contrapeso, tranvías de cable y pequeños sistemas de vapor
comparten las calles. Los dispositivos arcanos de transporte son caros y especializados. La mayoría de
la población se desplaza por medios mundanos mejorados, no mediante teletransporte cotidiano.
## 6. Gremios, órdenes e instituciones
Colegio de Ingenieros de la Segunda Forja
Organización transnacional que certifica ingenieros, inspectores de calderas y diseñadores de sistemas
arcanos integrados. Sus sellos permiten trabajar en obras públicas de varios estados. El Colegio
defiende estándares comunes, aunque sus delegaciones nacionales compiten ferozmente.
Hermandad de Cartógrafos del Horizonte
Gremio de exploradores, pilotos, topógrafos y astrónomos. Mantiene cartas de rutas terrestres, aéreas y
marítimas. Paga por información verificable y conserva versiones históricas de mapas para detectar
cambios mágicos en el terreno. Sus mapas más precisos son secretos comerciales.
Círculo de Sanadores de la Lámpara Blanca
Red de médicos, restauradores, cirujanos y boticarios nacida durante la Guerra de las Coronas Rotas.
Opera hospitales neutrales en varias ciudades. Su código prohíbe usar pacientes como sujetos de
experimentación sin consentimiento y exige distinguir curación mágica de tratamiento médico real.
Consorcio de Acumuladores
Coalición de fabricantes y refinadores que controla gran parte del mercado de cristales, reguladores y
baterías arcanas. No es una compañía única, sino un cartel legal en algunos estados y sospechoso en
otros. Su influencia política es inmensa porque casi toda infraestructura avanzada depende de piezas
normalizadas.
Orden del Umbral Sereno
Institución especializada en entidades externas, lugares sellados y pactos peligrosos. Sus miembros
incluyen religiosos, arcanistas y juristas. Pueden clausurar temporalmente una zona con autorización
estatal, pero su poder fuera de Solenar depende de convenios locales.
Liga de Maestros Artesanos
Confederación de talleres que protege estándares de calidad, aprendizaje y propiedad de planos.
Rivaliza con fábricas que buscan producción masiva y con inventores que consideran excesivos sus
controles. Una pieza con marca de Maestro conserva prestigio incluso en mercados industriales.
Compañía de Rutas Libres
No es un ejército nacional, sino una red de escoltas, guías y contratistas con cartas de operación en casi
toda Edria. Sus miembros protegen caravanas, trenes, expediciones y convoyes. Aventureros
independientes suelen comenzar aquí porque la Compañía reconoce experiencia de campo aunque
carezca de títulos nobles.
## 7. Magia, religión y cosmología social
La Trama
La palabra “Trama” es el término común para describir el conjunto de relaciones entre alma, ambiente,
divinidad y entidades externas. No es una sustancia única demostrada, sino un modelo compartido por
estudiosos y religiosos para hablar de fenómenos mágicos sin afirmar que todas las fuentes son
idénticas.
La magia personal nace del Alma; la magia Ambiental depende de energía presente en lugares,
materiales y fenómenos; la Divina requiere vínculo, dominio o juramento; la Externa procede de
pactos, espíritus, planos o entidades. Estas cuatro fuentes son conocidas en todo Edria y forman parte
del lenguaje legal y académico.
El Panteón Primordial
El nivel cosmológico superior está formado por siete Dioses Primordiales vinculados a principios
fundacionales de la realidad consciente. Con Vaelun queda cerrado este Panteón Primordial. El rango
primordial describe función cosmológica, no número de fieles, poder político ni exclusividad sobre un
dominio.
Primordial Principio Acontecimiento / creación
asociada
Eïra, la Madre de la Primera
Semilla
Vida / Naturaleza Primera Semilla; Feéricos,
Élficos y Terios
Khorun, el Primer Forjador Materia y Forma Primera Forja; Enanos, Gigantes
y Elementales
Varkor, el Señor de la Primera
Guerra
Conflicto Primer Desafío / Primera
Guerra; Orcos, Trolls, Ogros y
Goblinoides
Aster, el Señor de las Mil Sendas Elección Primera Elección; Humanidad
Ilyr, el Portador de la Primera
Luz
Bien Primera Luz / Primer
Juramento; Celestiales o
Ángeles
Nereth, el Señor de la Primera
Profanación
Corrupción / Mal Primera Profanación; Demonios
y origen de la No Muerte
Vaelun, el Guardián del Último
Umbral
Tránsito Primer Tránsito; Ankar
Las Cinco Luminarias
La religión más extendida en Edria venera a las Cinco Luminarias. A partir de esta versión, las
Luminarias quedan establecidas como cinco Dioses Menores reales, posteriores al Panteón Primordial.
No son nombres alternativos, avatares ni aspectos de los Primordiales, aunque algunos dominios
puedan solaparse. Sus cultos difieren en teología, ritual y organización, y sus Vínculos Divinos
producen magia verificable en seguidores apropiados.
Luminaria Ámbitos asociados
Aurea, la Llama vida, hogar, valor, renovación, juramentos de protección
Nemor, el Guardián muerte, memoria, ancestros, límites, custodia de tumbas
Oria, la Balanza ley, intercambio, acuerdos, conocimiento registrado
Vael, el Navegante viaje, cambio, tormentas, descubrimiento, fortuna incierta
Selene, la Velada sueño, misterio, percepción, secretos, fronteras entre
mundos
Existen otros dioses, espíritus regionales, santos, ancestros, héroes divinizados y cultos fuera del
Panteón Central. Su existencia no contradice la jerarquía establecida: los siete Primordiales son
fundacionales; las Cinco Luminarias son Dioses Menores reales; otras entidades pueden ocupar niveles
posteriores o regionales sin quedar automáticamente incorporadas al Panteón Central.
Los Doce - siete Primordiales y cinco Dioses Menores/Luminarias - forman el Panteón Central canónico
conocido. Pueden existir otras divinidades menores, espíritus regionales, santos, ancestros, héroes
divinizados y entidades planares, pero su incorporación al Panteón Central requiere una ampliación
expresa del canon.
La creación de un pueblo por una deidad expresa origen cosmológico, no obligación religiosa.
Cualquier pueblo puede venerar, rechazar o establecer Vínculos con otras divinidades cuando la ficción
y sus juramentos lo permitan.
Ejemplos canónicos de solapamiento: Eïra y Aurea comparten aspectos de vida; Ilyr y Aurea,
protección; Vaelun y Nemor, muerte y memoria; Aster y Vael, viaje y descubrimiento; Ilyr y Oria,
justicia y ley; Vaelun y Selene, fronteras espirituales. Estos solapamientos no implican identidad.
Los dominios divinos no son propiedades exclusivas. Dos deidades pueden actuar sobre fenómenos
relacionados sin ser la misma entidad. La diferencia se encuentra en el principio que cada una expresa
y en la relación concreta que mantiene con sus fieles.
Reglas de continuidad divina
Límites religiosos
Ninguna iglesia puede crear Maná ilimitado, resucitar de forma rutinaria a los muertos o eliminar
todas las consecuencias de una lesión grave. Los milagros poderosos existen, pero son excepcionales,
condicionados y políticamente significativos. La muerte conserva peso social y narrativo.
## 8. Tecnología, comercio y vida material
Nivel tecnológico
La tecnología civil de Edria corresponde a una industrialización temprana desigual. Hay zonas con
talleres manuales y caminos de tierra a pocas jornadas de ciudades con fábricas, estaciones de vapor y
redes de bombeo. La industria depende de carbón, agua, metal y mano de obra especializada; la magia
mejora sistemas concretos, no reemplaza toda la ingeniería.
Ferrocarril y dirigibles
Las principales potencias están conectadas por corredores ferroviarios, pero la red no cubre el
territorio completo. Montañas, bosques, fronteras y mantenimiento limitan su expansión. Los dirigibles
son útiles para carga de alto valor, correo, reconocimiento y acceso a zonas sin carretera, aunque
siguen siendo vulnerables al clima, sabotaje y criaturas aéreas.
Armas de fuego
Pistolas y rifles tempranos son conocidos en todos los grandes estados. Las armas repetidoras existen,
pero requieren manufactura de precisión y son caras. Ejércitos y fuerzas urbanas mezclan armas
tradicionales con pólvora porque coste, mantenimiento, entrenamiento y situación táctica siguen
importando.
Autómatas
Los autómatas son máquinas especializadas, no personas mecánicas comunes. Se usan en minería
peligrosa, carga, talleres, vigilancia fija y laboratorios. Los modelos autónomos capaces de decisiones
complejas son raros, costosos y objeto de debate legal. Nadie ha demostrado de forma concluyente que
una máquina construida posea Alma.
Economía arcana
Los acumuladores distinguen Capacidad, Caudal y Estabilidad. Una gran reserva no sirve si no puede
entregar energía al ritmo necesario; un sistema potente puede ser inseguro si su estabilidad es baja.
Esta realidad técnica explica por qué la magia industrial requiere infraestructura, inspecciones y
especialistas.
Comercio estratégico
• Cristal arcano: refinado para acumuladores, instrumentos y laboratorios.
• Carbón y coque: base de la industria pesada y el transporte terrestre.
• Acero y aleaciones: Kharum domina la producción de mayor calidad.
• Reactivos alquímicos: Erelia y varios archipiélagos exportan sustancias raras.
• Planos y fórmulas: conocimiento protegido por gremios, academias y estados.
• Cartas de ruta: un mapa fiable puede valer tanto como una carga de mercancías.
## 9. Pueblos, culturas y pertenencia
Tierra Mágica no vincula automáticamente cultura, nación y especie. Las grandes ciudades son
diversas, las fronteras han cambiado muchas veces y familias enteras han migrado siguiendo guerras,
minas, rutas y oportunidades. Los paquetes raciales del sistema describirán anatomía, sentidos,
adaptaciones y relaciones mágicas; la cultura se define aparte.
Identidades culturales frecuentes
Identidad Rasgos culturales
Valdoriana tradición de fueros, servicio cívico, caballería, burocracia
y orgullo regional
Broncina cultura urbana mercantil, oficios industriales,
asociaciones laborales y pragmatismo comercial
Lysendrina prestigio académico, debates formales, archivos,
disciplina de laboratorio y rivalidad entre escuelas
Ereliana autonomía local, navegación fluvial, manejo de bosques,
vínculos familiares extensos y tradición de exploradores
Solenaria hospitalidad reglada, peregrinación, órdenes religiosas,
caravanas y fuerte cultura contractual
Kharumita comunidad de taller, memoria genealógica, ingeniería
conservadora y responsabilidad colectiva sobre obras
públicas
Libre de Nacariel cosmopolitismo portuario, seguros, navegación y lealtades
contractuales más que dinásticas
Idiomas
La lengua franca de comercio y diplomacia se conoce simplemente como Común de Concordia. Cada
región conserva idiomas, dialectos y escrituras propias. Los documentos técnicos importantes suelen
incluir terminología normalizada del Colegio de Ingenieros, mientras que los textos arcanos antiguos
pueden exigir lenguas muertas o notación de los Fundadores.
Clase y movilidad social
El nacimiento todavía importa, sobre todo en Valdoria y Solenar, pero la industrialización ha abierto
nuevas vías de poder: títulos profesionales, patentes, contratos, riqueza mercantil, expediciones y
servicio público. Un maestro ingeniero o sanador puede negociar de igual a igual con nobles menores.
Esa movilidad genera tensión porque las instituciones antiguas no siempre reconocen con rapidez las
nuevas formas de prestigio.
## 10. Conflictos activos del presente
La Guerra Fría del Cobre
La Liga de Bronce y Valdoria compiten por controlar tarifas, patentes y rutas ferroviarias. Ninguna
desea una guerra abierta, pero ambas financian espionaje industrial, compañías privadas y campañas
diplomáticas. Un accidente en una estación fronteriza puede convertirse en crisis internacional.
La Disputa del Espinazo
Kharum ha encontrado complejos de los Fundadores debajo de minas activas. Lysendra exige acceso
académico; empresas de la Liga ofrecen capital; Valdoria reclama derechos por antiguos tratados. Las
Holdas sostienen que todo lo hallado bajo sus montañas pertenece a quienes asumen el riesgo de
abrirlo.
Las Fronteras Verdes
Erelia debate hasta dónde industrializar sus bosques. Nuevas líneas ferroviarias prometen riqueza,
pero atraviesan zonas ambientales estables y territorios vinculados a espíritus. Sabotajes, protestas,
concesiones dudosas y desapariciones de equipos han vuelto la situación explosiva.
El Problema de los Umbrales
La Orden del Umbral Sereno informa de un aumento de pactos externos no autorizados y lugares
donde la frontera entre planos parece debilitada. No está claro si se trata de un fenómeno natural, una
consecuencia tardía de la Fractura o una campaña deliberada de alguna entidad.
La Carrera de Nacre
Nuevas islas y ruinas emergen periódicamente en el archipiélago de Nacre. Estados, universidades,
compañías y cultos envían expediciones. La desaparición de equipos en 598 C. no detuvo la carrera;
solo aumentó el precio de los contratos y la presencia de mercenarios.
La Cuestión de los Autómatas
Un pequeño número de autómatas avanzados ha mostrado conductas que sus constructores no pueden
explicar con facilidad. Los ingenieros hablan de patrones emergentes, algunos religiosos de posible
alma y varios gobiernos de fraude o espionaje. No existe una respuesta canónica definitiva sobre
conciencia artificial.
## 11. Fronteras, ruinas y regiones peligrosas
El Espinazo del Mundo
Cordillera central que divide Edria de norte a sur. Contiene minas, ciudades de Kharum, glaciares,
pasos fortificados y una red de túneles cuya extensión real nadie conoce. En profundidad aparecen
puertas selladas, cámaras gravitatorias y maquinaria de los Fundadores.
Bosque de las Mil Voces
Gran bosque al nordeste de Erelia. Su nombre procede de fenómenos acústicos y mágicos que alteran la
percepción de distancia. Es hogar de fauna extraordinaria, ruinas cubiertas de raíces y comunidades
que siguen rutas invisibles para extranjeros. Los mapas cambian con demasiada frecuencia para ser
completamente fiables.
Mar de Nacre
Archipiélago occidental donde bancos de niebla, corrientes arcanas y islas emergentes dificultan la
navegación. Los restos de estructuras antiguas aparecen bajo el agua y en acantilados recién formados.
Es una de las regiones más lucrativas y letales para expediciones.
Desierto de Vidrio
Al este de Solenar, una antigua región de dunas quedó parcialmente vitrificada por un evento mágico
anterior a la Concordia. Las noches son extremadamente frías, la orientación es difícil y algunas zonas
reflejan imágenes de lugares que no están presentes. Caravanas atraviesan corredores seguros
marcados por santuarios.
Cinturón Flotante de Vigilia
Conjunto de islas suspendidas a distintas alturas al norte de Vigilia Alta. Algunas son estables y poseen
pequeños asentamientos; otras cambian lentamente de posición. Los pilotos de dirigible estudian
corrientes invisibles que pueden levantar o precipitar una nave.
Las Ciudades Hundidas
Bajo varios lagos y estuarios se conocen restos urbanos anteriores a la Fractura. No todas pertenecen a
la misma cultura. Algunas permanecen secas detrás de barreras inexplicables; otras solo son accesibles
durante cambios de marea o fenómenos astronómicos.
## 12. Ley, guerra y diplomacia
Leyes sobre magia
La magia personal ordinaria no es ilegal por sí misma. Los estados regulan efectos, no la mera
capacidad. Influencia mental, conjuración de entidades, explosivos, alteraciones corporales invasivas y
ciertos rituales ambientales requieren licencia o están restringidos. El uso de magia en defensa propia
se juzga con criterios similares al uso de armas, considerando proporcionalidad y consecuencias.
Licencias profesionales
Las grandes ciudades exigen acreditación para cirugía, ingeniería de presión, fabricación de
acumuladores de alta capacidad, manejo de explosivos y algunas prácticas arcanas. Los gremios
pueden certificar competencia, pero la autoridad legal pertenece al estado o ciudad correspondiente.
Guerra contemporánea
Los ejércitos combinan infantería con armas tradicionales y de fuego, caballería o monturas especiales,
ingenieros, sanadores, artillería y pequeños cuerpos de canalizadores. La magia de batalla es poderosa,
pero sufre límites de Maná, entrenamiento, línea de visión, contramedidas y vulnerabilidad del
lanzador.
Las barreras no han vuelto obsoletas las fortificaciones: se integran en ellas. Los castillos modernos
añaden casamatas, depósitos, líneas telegráficas arcanas locales, puestos de observación y defensas
contra dirigibles. La guerra sigue siendo logística antes que espectáculo.
Prohibiciones de Concordia
• Rituales destinados a devastar deliberadamente población civil mediante alteración ambiental de
gran escala.
• Uso de entidades externas sin control en zonas urbanas o campos de prisioneros.
• Destrucción deliberada de hospitales reconocidos por la Lámpara Blanca.
• Sabotaje de acumuladores civiles diseñado para producir reacciones en cadena.
• Experimentos médicos o arcanos forzados sobre prisioneros.
Estas prohibiciones no son una garantía moral; son normas jurídicas que a veces se violan. Su
existencia permite investigaciones, tribunales, encubrimientos y conflictos diplomáticos como parte de
las campañas.
## 13. Cómo se vive en Tierra Mágica
La magia cotidiana
Una persona corriente conoce la existencia de trucos, sanación menor, protección y lectura arcana,
pero no necesariamente puede realizarlos. En una gran ciudad es normal encontrar servicios mágicos
básicos del mismo modo que se encuentran herreros, médicos o escribanos. En una aldea, un único
practicante competente puede servir a varias comunidades.
Noticias y comunicaciones
El correo viaja por tren, diligencia, barco y dirigible. Sistemas de comunicación arcana existen, pero
son caros y dependen de estaciones o especialistas; no forman una red instantánea universal. Por eso
las noticias viajan con retrasos y una campaña puede cambiar la situación local antes de que una
capital reaccione.
Educación
La alfabetización es común en ciudades y centros gremiales, pero desigual en zonas rurales. Aprender
magia avanzada requiere maestros, libros, laboratorios o instituciones. Las academias compiten por
alumnos prometedores y a veces patrocinan expediciones a cambio de derechos sobre los
descubrimientos.
Infancia, resonancia y vínculo familiar
En ciudades, academias y comunidades con tradición arcana es habitual observar a los niños que
muestran signos de resonancia inestable: descargas involuntarias, sensibilidad extrema a zonas
saturadas, alteraciones recurrentes del entorno u otros síntomas compatibles. La evaluación no implica
que el niño vaya a convertirse en lanzador de hechizos ni que necesite obligatoriamente un Familiar.
Cuando existe riesgo real de Saturación Mágica juvenil, un Vínculo Familiar compatible es una de las
formas tradicionales más eficaces de estabilización a largo plazo. Los Cristales de Resonancia pueden
emplearse para iniciar ese proceso bajo supervisión apropiada. El Familiar resultante sigue siendo una
entidad real, con voluntad y personalidad propias; no es una batería, una mascota ni un objeto
encantado.
Los Familiares pueden manifestarse como bestias mágicas, espíritus, seres feéricos, elementales u otras
criaturas animadas coherentes con su naturaleza. No adoptan de forma ordinaria formas de objetos o
piezas de equipo. El vínculo está concebido para durar toda la vida y solo acontecimientos
extraordinarios -como destrucción, corrupción o una Ruptura del Vínculo- pueden quebrarlo.
Aventura como profesión
Los aventureros no forman una clase social única. Son exploradores, escoltas, recuperadores,
cazadores, investigadores, soldados licenciados, emisarios, técnicos de campo o agentes privados. La
Compañía de Rutas Libres y organizaciones similares convierten parte de esa actividad en trabajo
contractual reconocido.
Motivos habituales para una campaña
• Proteger una ruta nueva o investigar por qué ha dejado de ser segura.
• Recuperar un artefacto antes que una potencia rival sin iniciar una guerra abierta.
• Resolver una crisis urbana en la que magia, ley e infraestructura se interfieren.
• Explorar ruinas de los Fundadores y decidir quién puede reclamar sus hallazgos.
• Investigar un pacto externo, culto o fenómeno que las autoridades no comprenden.
• Acompañar una expedición científica, diplomática o comercial más allá de las fronteras
cartografiadas.
• Enfrentarse a conflictos laborales, sucesorios o gremiales donde ninguna facción es automáticamente
enemiga.
## 14. Registro de canon y límites de expansión
Canon fijado por esta versión
• El continente principal de juego se llama Edria y el presente es 612 C.
• La Fractura del Cielo es el gran acontecimiento histórico que reconfiguró la distribución mágica y
produjo parte de las islas flotantes actuales.
• Existen seis potencias mayores: Valdoria, Liga de Bronce, Lysendra, Erelia, Solenar y Kharum.
• La Concordia de Auraval limita la guerra abierta y sostiene la Mesa de Concordia.
• Auraval, Cobravia, Lys, Verdelinde, Heliara, Kar-Dur, Nacariel y Vigilia Alta son ciudades canónicas.
• La tecnología arcano-industrial es real pero desigual; ferrocarriles, dirigibles, autómatas
especializados, armas de fuego y acumuladores existen sin sustituir la infraestructura mundana.
• La Trama es un modelo cultural y académico, no una explicación metafísica definitivamente
probada.
• El Panteón Central canónico está formado por siete Dioses Primordiales y cinco Dioses
Menores/Luminarias. Las Cinco Luminarias son la tradición religiosa más extendida en Edria, pero
no las únicas entidades divinas posibles.
• Compartir un dominio no implica identidad entre deidades; el rango primordial es cosmológico y no
equivale a poder político, popularidad o exclusividad religiosa.
• Los conflictos del Cobre, Espinazo, Fronteras Verdes, Umbrales, Nacre y autómatas están activos en el
presente.
• La Saturación Mágica juvenil afecta solo a una minoría de niños y jóvenes con resonancia inestable;
no es acumulación de Maná por encima de la reserva personal ni convierte el vínculo familiar en una
obligación universal.
• Los Cristales de Resonancia son anclas arcanas raras usadas para facilitar vínculos compatibles. No
son huevos biológicos y no crean al Familiar; los Vínculos Familiares existen desde antes de la Fractura
del Cielo.
• Un Familiar es una entidad animada y consciente o semiconsciente, nunca equipo ordinario. Puede
presentar formas animales, espirituales, feéricas, elementales u otras formas de criatura, pero no
adopta como manifestación estándar la forma de un objeto.
Espacios deliberadamente abiertos
Para preservar capacidad de diseño y exploración, esta versión no fija todavía: la forma completa del
planeta, todos los continentes, el origen último de los Fundadores, la causa definitiva de la Fractura, la
naturaleza final de los dioses, la existencia o no de alma en autómatas avanzados, ni la lista completa
de especies jugables. Estas áreas pueden desarrollarse después sin contradecir el canon mientras
respeten los hechos establecidos.
Regla de continuidad
Una ampliación futura puede añadir ciudades, naciones menores, cultos, gremios, especies, tecnologías,
ruinas o acontecimientos históricos. Si modifica uno de los hechos anteriores, el cambio debe
registrarse expresamente como revisión de canon y no como una simple adición.
Uso en mesa
El canon define una base compartida, no obliga a que todas las campañas recorran los mismos
conflictos. Un director puede concentrarse en intriga urbana, exploración, guerra, investigación,
comercio, religión o frontera. Lo importante es que cada historia se sienta parte del mismo mundo:
antiguo, habitable, tecnológicamente cambiante, mágicamente real y todavía lleno de territorios que
nadie comprende por completo.
Fin del Canon del Mundo v1.2

# PARTE III — ARCHIVO NARRATIVO RECUPERADO DEL MANUAL LARGO v0.2

> **ARCHIVO RECUPERADO / NO NORMATIVO POR DEFECTO.** Se conserva aquí el desarrollo largo de mitología, pueblos, cultos, variantes y religión jugable que estaba en el manual v0.2 revisado. Su presencia evita pérdida de información, pero **no convierte automáticamente cada detalle histórico en canon vigente**. Cuando este archivo contradiga la Parte I o la Parte II, prevalecen las Partes I/II. Cuando un detalle no contradiga nada pero tampoco haya sido ratificado, queda disponible para revisión editorial y decisión explícita.
>
> Este bloque es deliberadamente conservador: antes de borrar cualquier texto durante la futura edición impresa, debe decidirse si se integra, se reescribe o se descarta con motivo registrado en Git.

## 20. Lore e Historia: La Primera Semilla
ESTADO CANÓNICO v0.1: Eïra, la Primera Semilla y el origen de los primeros pueblos naturales
quedan incorporados al canon de Tierra Mágica. Los detalles de culto, avatares, milagros y
paquetes raciales se desarrollarán en módulos posteriores.
Eïra, la Madre de la Primera Semilla
Eïra es la primera deidad desarrollada formalmente para el panteón de Tierra Mágica. Es la creadora de los
primeros pueblos vinculados a la naturaleza y la divinidad asociada a la Semilla Primordial de Naturaleza. Su
posición cronológica respecto de otros dioses queda abierta hasta que el panteón completo sea definido.
Aspecto Definición
Nombre canónico Eïra
Títulos La Madre de la Primera Semilla; La Madre Verde; La Primera
Raíz; Señora del Ciclo; Aquella que Hace Brotar.
Semilla Primordial Naturaleza.
Dominios Vida, crecimiento, adaptación, bosques, animales, estaciones,
fertilidad, depredación, renovación y equilibrio natural.
Símbolo Una semilla abierta de la que surgen tres raíces entrelazadas.
Principio «Toda vida cambia para continuar viviendo.»
Eïra no representa el bien. Representa la vida. En su dominio caben el nacimiento y la muerte, la primavera y
la putrefacción, la madre que protege a sus crías y el depredador que las caza. Para Eïra, la naturaleza no es
una promesa de seguridad: es un ciclo de crecimiento, competencia, muerte, adaptación y renovación.
La Primera Semilla
Antes de las grandes naciones y de las civilizaciones conocidas, Eïra depositó en la Tierra una concentración
primordial del principio de Vida. Las tradiciones más antiguas la llaman la Primera Semilla.
No era necesariamente una semilla vegetal. Era una fuente originaria de vida y transformación. Cuando
germinó, sus raíces alcanzaron tierra, aguas y profundidades. Con el tiempo, sus canales de poder quedaron
ligados a lugares salvajes y a determinadas corrientes de magia ambiental.
De la Primera Semilla surgieron tres grandes ramas de vida consciente:
- La Hoja: origen de los Feéricos.
- La Savia: origen de los Élficos.
- La Sangre: origen de los Terios, llamados también Anihombres en muchas culturas.
Hoja, Savia y Sangre. Tres maneras distintas mediante las cuales la naturaleza aprendió a pensar.
Los Feéricos - Hijos de la Hoja
Los Feéricos fueron los primeros seres conscientes surgidos de la Hoja. No constituyen una única especie:
Feérico es una gran familia de pueblos en los que la separación entre cuerpo, magia y naturaleza nunca llegó a
ser completa.
- Hadas: pueblos diminutos o pequeños, frecuentemente alados, vinculados de manera intensa con la magia
natural.
- Sátiros: humanoides con rasgos caprinos, asociados a bosques, música, emociones, fertilidad y celebración.
- Dríades: seres ligados originalmente a árboles concretos y, en algunos linajes, a arboledas o bosques
enteros.
- Trents: árboles conscientes de gran longevidad, capaces de desarrollar memoria y voluntad propias.
- Náyades: pueblos vinculados a ríos, lagunas, manantiales y cascadas.
- Nereidas: ramas feéricas relacionadas con mares, costas y aguas saladas.
- Silfos: feéricos vinculados a vientos, alturas y tormentas.
- Duendes del bosque: pequeños pueblos adaptados a raíces, madrigueras y comunidades silvestres.
- Centáuricos: linajes antiguos en los que anatomía humanoide y grandes herbívoros forman una única
estructura corporal.
- Espíritus florales: pueblos menores ligados a plantas, flores o ciclos de germinación concretos.
- Feéricos estacionales: linajes cuya naturaleza expresa de forma marcada Primavera, Verano, Otoño o
Invierno.
No todo espíritu natural es un Feérico y no todo Feérico es un espíritu. Los primeros Feéricos descienden de la
Primera Semilla; otros espíritus naturales pueden surgir posteriormente de lugares, fenómenos, magia
ambiental u otras causas.
Los Élficos - Hijos de la Savia
Los Élficos surgieron cuando Eïra creó seres capaces de vincularse profundamente con la naturaleza sin
pertenecer por completo a ella. En su origen existió un único Pueblo Élfico Primordial. Milenios de
migraciones, culturas, guerras, filosofías y exposición a distintas formas de magia dieron lugar a los grandes
pueblos élficos actuales.
Altos Elfos
Descendientes de comunidades que buscaron comprender y perfeccionar conscientemente aquello que Eïra
había creado. Desarrollaron ciudades, academias y sistemas mágicos complejos. Su relación con la naturaleza
persiste, pero suele expresarse mediante estudio, orden y transformación deliberada.
Elfos Silvanos
Conservaron una relación especialmente directa con la Primera Semilla. Sus asentamientos pueden integrarse
alrededor de árboles colosales, ríos, formaciones vivientes y ecosistemas completos. No rechazan por principio
la tecnología: exigen que sus obras convivan con los ciclos naturales en lugar de destruirlos.
Elfos Oscuros
Descienden de pueblos élficos que, durante una antigua catástrofe aún por definir, se refugiaron en las
profundidades. Allí se adaptaron a cavernas, hongos gigantes, lagos subterráneos, minerales arcanos y
ecosistemas sin luz solar. Continúan siendo hijos de Eïra: la oscuridad y la vida subterránea también forman
parte de la naturaleza. Su cultura o moral no están determinadas por su raza.
Elfos
Son los descendientes de comunidades élficas que se extendieron por regiones muy diversas y convivieron
extensamente con otros pueblos. Constituyen el tronco élfico más numeroso y culturalmente variable. A veces
otras culturas los llaman Elfos Comunes, sin que el término implique inferioridad.
Los Terios - Hijos de la Sangre
Los Terios son pueblos humanoides de ascendencia animal. En muchas regiones son conocidos coloquialmente
como Anihombres. Cada linaje conserva adaptaciones corporales reales vinculadas a su ascendencia; no se
conciben como simples humanos con rasgos animales decorativos.
Distinción canónica: un Terio lupino no es un hombre lobo. El Terio nace como miembro de su
pueblo. La licantropía, si existe, será una maldición, enfermedad, transformación, pacto o
fenómeno mágico diferente.
La estructura general de los Terios será: Terio -> Linaje -> Variedad. Esta clasificación permite representar una
gran diversidad de pueblos sin convertir cada animal en una raza mecánica independiente.
Linaje Terio Ejemplos de variedades
Cánidos lobo, perro, zorro, chacal, coyote
Félidos tigre, león, pantera, leopardo, jaguar, lince
Úrsidos oso pardo, oso negro, oso polar
Mustélidos nutria, tejón, comadreja, glotón
Lepóridos conejo, liebre
Roedores ratón, rata, ardilla, castor, capibara
Cérvidos ciervo, alce, reno
Caprinos cabra, íbice, carnero
Bóvidos toro, bisonte, búfalo, yak
Équidos caballo, asno, cebra
Suidos jabalí y otros suidos salvajes
Proboscídeos elefante, mamut
Rinoceróntidos rinoceronte
Hipopotámidos hipopótamo
Primates gorila, orangután, mono, babuino
Pangolinos variedades de pueblos escamados de origen pangolín
Armadillos linajes pequeños o medianos con protección corporal natural
Quelonios tortuga terrestre, tortuga marina
Saurios lagartos, iguanas, varanos
Crocodilianos cocodrilos, caimanes
Serpentinos cobras, víboras, pitones y otras serpientes
Anfibios ranas, sapos, salamandras
Avianos águilas, halcones, búhos, cuervos, loros, aves corredoras
Seláquidos tiburones y rayas
Cetáceos delfines y otros linajes adaptados
Piscinos diversos pueblos de ascendencia pisciforme
Crustáceos cangrejos, langostas y linajes similares
Arácnidos arañas y escorpiones
Insectoides escarabajos, mantis, abejas, mariposas y otros insectos
Principio anatómico. Los rasgos de cada linaje deben ser funcionales. Un Terio elefante necesita una
estructura capaz de sostener su masa y una trompa realmente utilizable; un Terio tigre conserva sentidos,
garras, dentición, cola y musculatura coherentes; un Terio tortuga integra su caparazón en la anatomía; y un
Terio aviano solo puede volar si su estructura corporal puede sostener ese vuelo. Las reglas raciales futuras
deberán representar estas diferencias mediante anatomía, sentidos, movimiento y adaptaciones, no
únicamente con bonificadores numéricos.
Otros hijos de la Primera Semilla
Feéricos, Élficos y Terios son recordados como los Tres Primeros Pueblos. La Primera Semilla continuó, sin
embargo, extendiendo vida y conciencia por distintos ecosistemas. De ese proceso surgieron otros pueblos
naturales, posteriores a la primera generación.
Micelios
Pueblos surgidos de grandes redes de hongos y micelio. No son plantas ni animales. Algunas comunidades
pueden compartir información química, sensorial o mágica mediante redes subterráneas extensas.
Verdantes
Razas biológicas vegetales móviles, distintas de las Dríades y los Trents. Sus linajes pueden haberse adaptado a
selvas, desiertos, pantanos, tundras y otros ecosistemas.
Coralios
Pueblos originados en antiguos arrecifes transformados por la Primera Semilla. Pueden formar comunidades y
ciudades vivientes bajo el mar, ligadas a ecosistemas coralinos y a la circulación de magia oceánica.
El mito de Hoja, Savia y Sangre
«Primero brotó la Hoja. Después corrió la Savia. Finalmente despertó la Sangre. Y la Tierra
comprendió que estaba viva.»
Las religiones y culturas antiguas no necesitan interpretar este relato del mismo modo. Los sacerdotes de Eïra
pueden sostener que describe un acontecimiento literal; estudiosos arcanos pueden tratarlo como una
descripción mítica de un fenómeno mágico primordial. El canon conserva por ahora esa ambigüedad.
Eïra y la magia divina
Dentro del sistema de Foundry T.M., Eïra puede actuar como Fuente Divina para personajes que posean un
Vínculo Divino apropiado. Sus dominios naturales pueden condicionar juramentos, ritos, milagros y
restricciones, pero esas capacidades se definirán cuando se desarrolle el módulo completo de dioses y magia
divina. No se asignan todavía bonos raciales, hechizos exclusivos ni costes mecánicos nuevos en este capítulo.
Religión jugable de Eïra
Dogma central
La vida debe poder nacer, crecer, competir, adaptarse, morir y renovarse. Ninguna de esas etapas debe aislarse
artificialmente del ciclo completo. Proteger la vida no significa impedir toda muerte: significa impedir que el
ciclo sea destruido, esterilizado o explotado hasta dejar de poder renovarse.
Mandamientos
- Preservar ecosistemas capaces de regenerarse.
- Proteger nacimientos y ciclos reproductivos cuando estén amenazados.
- Evitar la destrucción innecesaria de especies o territorios.
- Adaptarse antes que permanecer rígido cuando el entorno exige cambio.
- Devolver a la tierra y a la comunidad viva una parte de aquello que se toma.
- Respetar al depredador y a la presa dentro del equilibrio natural.
Prohibiciones
- Exterminar deliberadamente una especie por mera conveniencia.
- Esterilizar territorios vivos sin una necesidad extrema y proporcionada.
- Alterar organismos de forma que destruyan su capacidad de integrarse en ciclos naturales.
- Crear vida únicamente como recurso descartable.
- Impedir artificialmente todo proceso natural de muerte o renovación.
La No Muerte no se considera una simple transgresión natural de Eïra: su origen y tratamiento cosmológico
corresponden principalmente a Nereth y Vaelun.
Cultos y sacerdocio
Eïra no posee una iglesia universal obligatoria. Sus tradiciones pueden organizarse como círculos de
guardianes, santuarios de estación, comunidades rurales, custodios de bosques, cuidadores de especies,
sanadores, parteras, naturalistas y órdenes dedicadas a ecosistemas concretos.
Tres grandes tradiciones sacerdotales toman sus nombres de las ramas de la Primera Semilla: los Custodios de
la Hoja, vinculados a ecosistemas y espíritus naturales; los Guardianes de la Savia, dedicados a conocimiento,
sanación, crecimiento y continuidad de comunidades; y los Hermanos de la Sangre, vinculados a fauna,
adaptación, supervivencia, depredación y equilibrio entre especies. Ninguna de estas tradiciones constituye
una autoridad universal sobre todas las demás.
Templos y santuarios
Los lugares sagrados de Eïra tienden a integrar construcción y ecosistema: arboledas, jardines amurallados,
cuevas fértiles, terrazas agrícolas, reservas naturales, invernaderos arcanos, árboles-templo y edificios
levantados alrededor de formaciones vivientes. Sus cultos no rechazan por principio ciudades o tecnología;
exigen que las obras puedan coexistir con ciclos naturales sostenibles.
Festividades
- Primer Brote: celebración del comienzo de un nuevo ciclo fértil, nacimientos y proyectos destinados a crecer.
- Plenitud: celebración de la abundancia, madurez, cooperación ecológica y responsabilidad de sostener
aquello que prospera.
- Retorno a la Tierra: rito dedicado a cosecha final, muerte, descomposición y renovación. Recuerda que la
muerte natural forma parte de Eïra y evita reducir su culto a una religión de primavera o fertilidad.
Avatares y manifestaciones
Eïra no posee una única anatomía obligatoria. Puede manifestarse como figura maternal vegetal, gran bestia,
árbol consciente, enjambre coordinado, criatura híbrida o forma adaptada al ecosistema donde aparece. Su
imagen fuente canónica representa su identidad visual principal, no un límite ontológico para sus
manifestaciones.
Vínculo Divino
Un Vínculo con Eïra exige aceptar el ciclo completo de la vida. Los juramentos apropiados pueden girar
alrededor de protección de ecosistemas, preservación de especies, sanación, adaptación, fertilidad,
supervivencia y restauración natural. Romper deliberadamente el ciclo que el propio juramento obliga a
proteger puede debilitar, suspender o quebrar el Vínculo según la gravedad de la transgresión.
Milagros de dominio
Los milagros de Eïra pueden expresarse mediante sanación orgánica, crecimiento vegetal, resistencia
ambiental, afinidad o comunicación con animales, adaptación temporal, purificación de tierras dañadas,
aceleración limitada de ciclos naturales y protección frente a corrupción biológica. No permiten creación
ilimitada de vida, resurrección rutinaria ni anulan los límites generales de Restauración, Trauma o Medicina.
ESTADO CANÓNICO v0.2: el dogma, cultos, sacerdocio, templos, festividades, mandamientos,
prohibiciones, avatares, marco de Vínculo Divino y familias de milagros de Eïra quedan
consolidados. Permanecen pendientes únicamente la calibración mecánica final de
milagros/Vínculos, estadísticas específicas y su integración definitiva con paquetes raciales y
módulos de campaña.
## 21. Lore e Historia: La Primera Forja
ESTADO CANÓNICO v0.1: Khorun, la Primera Forja y el origen de los primeros pueblos vinculados
a la materia y las fuerzas elementales quedan incorporados al canon de Tierra Mágica. Los detalles
de culto, avatares, milagros y organización religiosa permanecen pendientes de desarrollo.
Khorun, el Primer Forjador
Khorun es la segunda deidad desarrollada formalmente para el panteón de Tierra Mágica. Representa la
materia del mundo, su estructura y la voluntad de transformarla. Allí donde Eïra despertó la Vida, Khorun
despertó la Materia y las fuerzas elementales que le dan forma.
- Títulos: El Primer Forjador, Padre de la Montaña, Señor de las Profundidades, Aquel que Dio Forma y el
Corazón del Mundo.
- Principio primordial: Materia y Forma.
- Dominios: piedra, metal, fuego interior, montañas, cavernas, minerales, forja, construcción, resistencia,
fuerza, creación material y fuerzas elementales.
- Símbolo: un martillo vertical sobre una montaña partida, con una brasa encendida en su centro.
- Principio: «Lo que tiene forma puede ser transformado. Lo que resiste, perdura.»
Khorun no es simplemente el dios de los Enanos. Los Enanos son una de sus grandes creaciones. Khorun
representa la materia del mundo y la capacidad de darle forma mediante voluntad, trabajo, presión, calor,
tiempo y conocimiento.
La Primera Forja
Cuando la Primera Semilla comenzó a extender vida por la Tierra, el mundo ya poseía piedra, océanos,
metales, montañas, fuego y profundidades. Aquellas cosas existían, pero todavía no poseían conciencia propia.
Khorun descendió a las profundidades y encontró el fuego primordial que ardía bajo la corteza. Construyó un
yunque con la primera piedra, tomó aquel fuego y realizó el Primer Golpe.
Las tradiciones más antiguas sostienen que el sonido atravesó el mundo. Las montañas se elevaron, la roca se
abrió formando cavernas, los metales despertaron en las profundidades, los volcanes comenzaron a respirar y
ciertos cristales adquirieron una afinidad excepcional para contener y conducir magia. Algunas partes del
propio mundo adquirieron conciencia.
La obra de Eïra fue la Primera Semilla. La obra de Khorun fue la Primera Forja.
Las Tres Formas Primordiales
Del Primer Golpe surgieron tres grandes formas de conciencia:
- La Piedra: origen de los Enanos.
- La Montaña: origen de los Gigantes.
- La Chispa: origen de los Elementales.
Piedra, Montaña y Chispa. Tres maneras distintas mediante las cuales la materia y las fuerzas del
mundo aprendieron a pensar.
Los Enanos - Hijos de la Piedra
Los Enanos fueron la creación más deliberada de Khorun. Mientras los Gigantes nacieron de la magnitud del
mundo y los Elementales de sus fuerzas, los Enanos fueron esculpidos conscientemente.
Según los mitos más antiguos, Khorun tomó piedra, metal y una porción del fuego profundo. Con piedra formó
sus huesos; con metal fortaleció su sangre; con fuego les concedió voluntad. Después les entregó herramientas.
Para muchas culturas enanas, crear es imitar al creador.
La forja, la arquitectura, la minería y la ingeniería poseen por ello una dimensión religiosa en numerosas
sociedades enanas. Esto no significa que todo Enano sea herrero: la idea central es que los Enanos comprenden
la materia. Arquitectos, mineros, escultores, ingenieros, joyeros, alquimistas, artilleros, exploradores,
comerciantes y estudiosos pueden expresar el legado de Khorun de formas distintas.
Enanos de Montaña
Descendientes de las primeras fortalezas levantadas cerca de grandes cordilleras. Muchas de sus culturas
desarrollaron minería, arquitectura monumental, fortificaciones y metalurgia de gran complejidad.
Enanos Profundos
Comunidades que descendieron mucho más allá de las minas comunes. Habitan extensos sistemas cavernarios
y conocen minerales, cristales y fenómenos mágicos poco comprendidos en la superficie. La profundidad no
determina su moral ni su cultura.
Enanos de Forja
Linajes y culturas formados alrededor de regiones volcánicas, fuentes geotérmicas o lugares de intensa
actividad elemental. Algunas de sus ciudades se encuentran entre los grandes centros industriales y
metalúrgicos de Tierra Mágica.
Enanos Errantes
Pueblos que abandonaron las fortalezas ancestrales y se extendieron por rutas, caravanas y ciudades de otras
razas. Son frecuentes como comerciantes, ingenieros itinerantes, constructores, artesanos, exploradores y
fundadores de comunidades nuevas.
Los Gigantes - Hijos de la Montaña
Los Gigantes no fueron esculpidos uno por uno. Cuando ocurrió el Primer Golpe, algunas montañas
despertaron. Las primeras comenzaron a moverse y, con el paso de eras, adquirieron formas cada vez más
semejantes a seres vivos. De ellas surgieron los primeros Gigantes.
«Un Gigante no nació sobre la montaña. La montaña decidió caminar.»
Los Gigantes representan la magnitud de la materia. Mientras los Enanos expresan su transformación
deliberada, los Gigantes representan su masa, resistencia y poder bruto.
Gigantes de Piedra
Son los linajes más próximos a los primeros Gigantes. Poseen cuerpos de gran densidad y, en algunos casos,
piel con rasgos minerales o pétreos. Sus culturas pueden conservar tradiciones de enorme antigüedad.
Gigantes de Montaña
Grandes humanoides adaptados a cordilleras, altiplanos y regiones elevadas. Constituyen uno de los linajes
gigantes más extendidos.
Gigantes de Fuego
Vinculados a volcanes, magma y regiones geotérmicas. Muchas de sus tradiciones consideran el fuego
profundo una manifestación directa del poder de Khorun.
Gigantes de Escarcha
Descendientes de poblaciones adaptadas durante eras a glaciares, tundras y cordilleras heladas. El hielo es
para ellos otra forma de materia sometida a presión, tiempo y cambio.
Gigantes de Tormenta
Linajes surgidos en regiones donde enormes masas de aire, agua y energía elemental interactúan. Su origen se
asocia a las fuerzas físicas del mundo más que a la piedra por sí sola.
Gigantes del Mar
Pueblos adaptados a costas, profundidades y grandes masas oceánicas. Su existencia no contradice a los
pueblos naturales de Eïra: Eïra despertó la vida del océano; Khorun despertó su materia y sus fuerzas.
Titanes
No son simplemente Gigantes de mayor tamaño. Son descendientes extremadamente raros de las primeras
montañas vivientes y conservan una proximidad excepcional con la Primera Forja. Algunos pueden alcanzar
Escala Enorme o Colosal y vivir durante siglos o milenios. No constituyen, por defecto, una raza jugable común.
Los Elementales - Hijos de la Chispa
Cuando Khorun realizó el Primer Golpe, innumerables fragmentos de materia y energía adquirieron
conciencia. No nacieron con carne ni con una anatomía fija. Fueron los Primeros Elementales.
Distinción canónica: un Elemental verdadero es una entidad consciente descendiente de la Primera
Forja. Una manifestación elemental es materia o energía animada temporalmente mediante magia,
ritual, artefacto u otro procedimiento.
Los hechiceros de eras posteriores no crearon a los Elementales originales. Aprendieron a invocarlos,
vincularlos, negociar con ellos, imitarlos o producir manifestaciones artificiales similares.
Grandes familias elementales
- Elementales de Tierra: piedra, arena, barro, minerales y otras formas sólidas.
- Elementales de Fuego: llama, magma, calor y combustión.
- Elementales de Agua: ríos, océanos, hielo, vapor y otras manifestaciones acuáticas.
- Elementales de Aire: viento, presión, niebla y corrientes atmosféricas.
Las cuatro familias principales no agotan todas las posibilidades. La interacción entre materiales, ambientes y
fuerzas puede originar linajes derivados como Metal, Cristal, Magma, Hielo, Vapor, Arena, Ceniza, Tormenta o
Humo. Lugares excepcionales pueden albergar manifestaciones todavía más extrañas.
Grados de conciencia elemental
- Espíritus Elementales: consciencias menores capaces de habitar una llama, una roca, una corriente, una
fuente u otra manifestación concreta. Algunos pueden formar vínculos como familiares.
- Elementales: entidades plenamente conscientes capaces de desarrollar personalidad, memoria, voluntad,
relaciones e incluso sociedades.
- Primordiales: manifestaciones elementales antiquísimas y de enorme magnitud. Un Primordial de Fuego
puede estar ligado a un volcán; uno de Agua, a una región oceánica; uno de Tierra, a una cordillera. Se
comportan más como fenómenos naturales conscientes que como criaturas ordinarias.
Los Silfos feéricos de Eïra y los Elementales de Aire de Khorun no son la misma clase de ser. Un Silfo pertenece
a la familia feérica de la Primera Semilla y expresa la vida natural vinculada al viento; un Elemental de Aire
desciende de la Chispa y expresa directamente una fuerza elemental del mundo.
Otros hijos de la Primera Forja
Enanos, Gigantes y Elementales son recordados como los Tres Primeros Pueblos de Khorun. La influencia de la
Primera Forja produjo con el tiempo otras familias conscientes vinculadas a materiales y ambientes concretos.
Gárgolas
Seres de piedra capaces de entrar en periodos extremadamente largos de inmovilidad. Algunos mitos sostienen
que descienden de Elementales que adoptaron cuerpos permanentes; otros afirman que fueron esculpidos por
antiguos pueblos y despertados por ecos de la Primera Forja.
Cristálidos
Pueblos parcial o completamente cristalinos nacidos en regiones con enormes concentraciones de minerales
arcanos. Sus cuerpos interactúan de forma natural con determinadas corrientes de magia y pueden resultar
importantes para el estudio de acumuladores y conducción arcana.
Ígneos
Criaturas materiales adaptadas a temperaturas extraordinarias. A diferencia de un Elemental de Fuego, poseen
cuerpos físicos relativamente estables y ciclos biológicos o materiales propios.
Pétreos
Familias humanoides de naturaleza parcialmente mineral. Aunque pueden recordar a Enanos o Elementales,
poseen orígenes, anatomías y culturas propias. Su definición exacta queda pendiente del desarrollo racial.
Eïra y Khorun: Vida y Forma
Eïra y Khorun no gobiernan dominios aislados. Sus obras se superponen constantemente. Un árbol pertenece
principalmente al legado de Eïra; una montaña, al de Khorun. Un bosque que crece sobre una cordillera existe
gracias a la interacción de ambos principios.
Eïra despertó la Vida. Khorun despertó la Materia y la Forma.
Las tradiciones antiguas no los presentan necesariamente como enemigos ni como pareja. Son dos fuerzas
fundacionales capaces de colaborar y de entrar en tensión. Eïra simboliza crecimiento, adaptación y cambio
orgánico; Khorun simboliza estructura, resistencia y transformación deliberada.
Una antigua enseñanza atribuida a sus primeros cultos relata: «Eïra preguntó dónde podría crecer la vida.
Khorun levantó las montañas, abrió los valles y respondió: Aquí.» Otras escuelas usan esta historia para
discutir una cuestión filosófica que todavía divide culturas: si el mundo debe crecer libremente o ser trabajado
para alcanzar una forma mejor.
El mito de Piedra, Montaña y Chispa
«Primero fue la Piedra. La Piedra sostuvo la Montaña. En la Montaña ardió la Chispa. Y cuando
cayó el Primer Golpe, el mundo recordó que tenía forma.»
Como ocurre con el mito de Hoja, Savia y Sangre, distintas religiones y escuelas pueden interpretar este relato
de manera literal, simbólica o arcana. El canon establece el mito y sus consecuencias cosmológicas, pero no
obliga a que todas las culturas conozcan la verdad completa de aquellos acontecimientos.
Khorun y la magia divina
Dentro del sistema de Foundry T.M., Khorun puede actuar como Fuente Divina para personajes que posean un
Vínculo Divino apropiado. Sus dominios pueden condicionar juramentos, milagros y restricciones relacionados
con materia, piedra, metal, fuego interior, forja, construcción, resistencia y fuerzas elementales. Los efectos
concretos deberán respetar la arquitectura general de magia y los requisitos de Habilidad o conocimiento
relevantes.
Pendiente de desarrollo de Khorun: apariencia y manifestaciones; personalidad divina; dogma;
templos; sacerdocio; festividades; mandamientos y prohibiciones; avatares; milagros; Vínculo
Divino específico; relación detallada con cultos enanos, gigantes y elementales.
## 22. Lore e Historia: La Primera Guerra
ESTADO CANÓNICO v0.1: Varkor, la Primera Guerra y el origen de los pueblos nacidos del conflicto
quedan incorporados al canon de Tierra Mágica. Los detalles de culto, avatares, milagros y
mecánicas raciales permanecen pendientes de desarrollo específico.
Varkor, el Señor de la Primera Guerra
Varkor es la tercera deidad desarrollada formalmente para el panteón de Tierra Mágica. Allí donde Eïra
despertó la Vida y Khorun despertó la Materia y la Forma, Varkor convirtió el conflicto en voluntad consciente:
desafiar, resistir, conquistar, proteger y vencer.
- Títulos: El Señor de la Primera Guerra, el Puño Rojo, Padre de los Fuertes, el Rompedor de Cadenas y Aquel
que No Retrocede.
- Principio primordial: Conflicto.
- Dominios: guerra, fuerza, valor, conquista, resistencia, furia, competencia, desafío, supervivencia mediante
la lucha y victoria.
- Símbolo: un puño cerrado atravesado por una cicatriz vertical, normalmente representado en hierro
ennegrecido o rojo oscuro.
- Máxima: «Nada que no pueda defender su existencia tiene garantizado conservarla.»
Varkor no es simplemente un dios maligno ni una personificación de la matanza. Es brutal y considera el
conflicto una parte inevitable de la existencia, pero también representa valor, determinación, resistencia ante
la opresión, protección mediante la fuerza, competencia y la voluntad de levantarse después de una derrota.
La Primera Guerra
Cuando Eïra llenó el mundo de vida y Khorun le dio forma, las primeras criaturas conscientes comenzaron a
extenderse. Dos pueblos podían querer la misma tierra; dos criaturas, el mismo alimento; dos voluntades,
futuros incompatibles. La violencia ya existía en los ciclos naturales, pero todavía no existía la Guerra como
decisión consciente y organizada.
Varkor observó a los primeros pueblos discutir, huir o someterse. Tomó una gran arma -las leyendas no
coinciden sobre si era un hacha, una lanza o simplemente sus propias manos- y clavó su desafío en la tierra.
«Si deseas algo, defiéndelo. Si alguien intenta arrebatártelo, resiste. Si tu fuerza no basta, hazte
más fuerte.»
Después desafió a todo ser que quisiera enfrentarlo. Las tradiciones llaman a aquel acontecimiento el Primer
Desafío. Muchas criaturas huyeron y otras fueron destruidas, pero algunas permanecieron en pie incluso
cuando sus cuerpos estaban quebrados. Varkor no vio perfección ni belleza en ellas: vio voluntad de combatir.
Con su propia sangre marcó a los supervivientes y de aquella sangre surgieron sus primeros pueblos.
Las Cuatro Virtudes de Varkor
Los pueblos primordiales de Varkor expresan cuatro maneras distintas de imponerse al conflicto:
- El Colmillo: origen de los Orcos. Representa fuerza disciplinada y voluntad guerrera.
- La Garra: origen de los Trolls. Representa resistencia, supervivencia y ferocidad.
- El Puño: origen de los Ogros. Representa poder físico y dominación directa.
- El Ojo: origen de los Goblinoides. Representa astucia, número, adaptación y guerra mediante inteligencia.
Colmillo, Garra, Puño y Ojo. Cuatro formas mediante las cuales la voluntad aprendió a imponerse
al conflicto.
Los Orcos - Hijos del Colmillo
Los Orcos son la creación más representativa de Varkor. No fueron concebidos como simples salvajes ni como
criaturas de violencia irracional. Representan la fuerza dirigida por voluntad: poder físico, disciplina,
determinación y capacidad de continuar combatiendo cuando otros abandonan.
Las culturas orcas pueden adoptar formas muy diferentes: imperios militares, confederaciones tribales,
sociedades nómadas, guardianes de frontera, compañías mercenarias, órdenes guerreras o comunidades que
consideran la violencia un último recurso porque conocen de primera mano su coste.
Orcos Comunes
La población orca más extendida. Son robustos, resistentes y culturalmente diversos. Constituyen la referencia
básica de la raza sin imponer una organización social única.
Orcos de Sangre
Linajes que conservan una relación especialmente intensa con la herencia de Varkor. En situaciones extremas
pueden manifestar respuestas físicas o mágicas extraordinarias vinculadas a determinación, furia y capacidad
de continuar luchando.
Orcos Grises
Pueblos desarrollados en regiones duras como estepas, montañas, desiertos o territorios devastados por
antiguas guerras. Muchas de sus culturas enfatizan resistencia, austeridad y disciplina.
Orcos Negros
Nombre tradicional y provisional para linajes físicamente enormes y muy resistentes, posiblemente
descendientes de antiguas castas guerreras o poblaciones alteradas durante guerras remotas. El término no
implica moralidad.
Los Trolls - Hijos de la Garra
Los Trolls encarnan la negativa a desaparecer. Durante el Primer Desafío, Varkor vio criaturas destrozadas que
aun intentaban levantarse y les concedió una parte de su obstinación. De esta herencia procede la
regeneración característica de muchos linajes troll.
La regeneración troll no es idéntica en todos los linajes. Su velocidad, límites, costes y
vulnerabilidades quedan pendientes de definición mecánica para el bestiario y los paquetes
raciales.
Trolls de Bosque
Grandes humanoides adaptados a regiones boscosas. Su regeneración suele asociarse a alimentación, descanso
y abundancia de materia orgánica.
Trolls de Piedra
Linajes de enorme resistencia cuyos tejidos pueden mineralizarse parcialmente con la edad. Representan una
intersección especialmente visible entre los legados de Varkor y Khorun.
Trolls de Pantano
Adaptados a toxinas, enfermedades, humedad y ambientes degradados. Numerosos pueblos de este linaje
desarrollaron una resistencia excepcional a condiciones que resultarían letales para otras razas.
Trolls de Montaña
Más grandes y robustos que muchas otras variedades, acostumbrados a grandes desniveles, frío y escasez.
Trolls de Hielo
Poseen metabolismo lento y una resistencia extraordinaria al frío. Algunas comunidades pueden permanecer
inactivas durante largos periodos sin morir.
Trolls de Guerra
No constituyen necesariamente un linaje natural. El término describe antiguas poblaciones modificadas
mediante magia, selección, alquimia o intervención divina durante guerras históricas. Son raros y
potencialmente muy peligrosos.
Los Ogros - Hijos del Puño
Los Ogros representan fuerza sin intermediarios. Varkor comprendió que ninguna estrategia sustituye siempre
la capacidad de derribar aquello que se encuentra enfrente. Son grandes, musculosos y capaces de ejercer una
fuerza física considerable, pero su tamaño no determina su inteligencia ni su cultura.
Un Ogro puede ser guerrero, comerciante, artillero, herrero, marinero, ingeniero, erudito o canalizador. Su
herencia define un cuerpo poderoso, no una personalidad obligatoria.
Ogros Comunes
La población ogra más extendida y la referencia básica de la raza. Muchos adultos pertenecen a Escala Grande,
aunque la definición mecánica final dependerá de los paquetes raciales.
Ogros de Guerra
Linajes o poblaciones seleccionados históricamente para el combate. Pueden poseer mayor masa y tradiciones
marciales intensas, pero no nacen obligados a vivir como soldados.
Ogros de las Estepas
Pueblos nómadas asociados a grandes caravanas, ganadería de animales enormes y desplazamientos por
territorios abiertos.
Ogros de Montaña
Comunidades robustas adaptadas a cordilleras, desfiladeros y regiones elevadas. Algunas mantienen
relaciones de competencia o alianza con Enanos, Gigantes y Orcos.
Ogros Magos
Nombre histórico aplicado a linajes en los que apareció una afinidad mágica excepcional. No implica una
especie diferente: demuestra que los hijos de Varkor también pueden desarrollar tradiciones arcanas
sofisticadas.
Los Goblinoides - Hijos del Ojo
Durante el Primer Desafío, Varkor comprendió que el más fuerte no siempre vence. Un enemigo pequeño
puede derrotar a uno enorme mediante terreno, números, información, emboscadas, logística, tecnología,
engaño y planificación. De esta comprensión surgieron los Goblinoides, representantes de la astucia aplicada al
conflicto.
Goblins
Pequeños, rápidos, sociales y extremadamente adaptables. Históricamente destacan por aprovechar
oportunidades con rapidez y pueden ser excelentes exploradores, comerciantes, inventores, saboteadores,
mineros, tiradores, mecánicos, alquimistas o espías. En sociedades arcano-industriales pueden adquirir una
gran relevancia tecnológica.
Contraste cultural frecuente: algunas tradiciones goblin priorizan «funciona ahora»; muchas
tradiciones enanas prefieren «debe durar generaciones». Ninguna de las dos filosofías implica
incompetencia.
Hobgoblins
Los Hobgoblins expresan disciplina organizada. Su rasgo cultural más reconocido no es simplemente un mayor
tamaño, sino la capacidad de construir estructuras sociales coordinadas: ejércitos, administraciones,
fortificaciones, sistemas logísticos y cadenas de mando. Esto no los obliga a ser imperialistas; también pueden
formar repúblicas, ligas defensivas u órdenes profesionales.
Bugbears
Grandes goblinoides asociados históricamente al sigilo, la emboscada, la caza y el combate de aproximación. Su
tamaño combinado con una sorprendente discreción rompe la idea de que toda criatura poderosa deba
combatir frontalmente. El nombre puede recibir posteriormente una denominación propia de Tierra Mágica.
Variantes goblinoides
Pueden existir Goblins de cavernas, de ciudad o de pantano; Hobgoblins de estepa; y otras poblaciones
adaptadas a regiones concretas sin convertir cada adaptación en una especie independiente.
Los Kobolds
Su origen permanece deliberadamente sin asignar. Podrían vincularse en el futuro a Varkor, a los dragones, a
otra deidad o a un proceso independiente. La decisión queda pendiente hasta desarrollar la cosmología
dracónica.
Los Hijos de la Primera Guerra
Orcos, Trolls, Ogros y Goblinoides son recordados en textos religiosos y cosmológicos como los Hijos de la
Primera Guerra. Cada familia expresa una solución distinta al conflicto: voluntad, resistencia, fuerza o astucia.
Principio canónico: ninguna raza creada por Varkor nace malvada. La herencia divina concede
capacidades y tendencias físicas o simbólicas; la moral depende de individuos, culturas,
circunstancias e historia.
La doctrina de la fuerza
Varkor ama el conflicto, pero no toda violencia demuestra fuerza. Muchas tradiciones de su culto sostienen que
la matanza de quien no puede defenderse, la tortura gratuita y la ruptura cobarde de un desafío aceptado no
prueban poder: prueban incapacidad para vencer bajo condiciones significativas.
Varkor tampoco desprecia automáticamente a quien es físicamente débil. Desprecia la renuncia voluntaria a
actuar cuando todavía existe una posibilidad de resistencia. Un anciano que protege su hogar, un Goblin que
vence a un Ogro mediante inteligencia o una persona aterrorizada que permanece defendiendo a otros pueden
encarnar sus valores.
Para Varkor, fuerza no significa tamaño. Significa capacidad de imponer o preservar la propia
voluntad frente a aquello que intenta quebrarla.
Varkor, Eïra y Khorun
Varkor respeta profundamente a Eïra porque toda vida lucha de alguna manera por continuar existiendo. Sin
embargo, sus doctrinas chocan: Eïra interpreta el conflicto como una herramienta dentro de ciclos mayores;
Varkor lo considera uno de los motores fundamentales del crecimiento y la transformación.
«Eïra enseña a sobrevivir. Varkor pregunta qué harás después de sobrevivir.»
Con Khorun mantiene una rivalidad igualmente profunda. Khorun construye, perfecciona y busca
permanencia; Varkor prueba, desafía y rompe para descubrir qué puede resistir. Una muralla terminada
despierta en Varkor la pregunta de si puede ser derribada, mientras que un arma perfecta de Khorun
demuestra su valor cuando alguien es capaz de utilizarla.
Esta tensión permite una larga historia de guerras, alianzas, duelos, competencia industrial e intercambio
tecnológico entre pueblos asociados a ambos dioses, sin convertir esa relación en un odio racial automático.
Guerra, magia y tecnología
Varkor no exige fidelidad a armas antiguas. Una herramienta capaz de vencer es válida mientras su uso
demuestre competencia y voluntad. Sus seguidores pueden adoptar espadas, artillería, rifles, magia, alquimia,
máquinas de asedio o ingeniería arcana sin contradicción doctrinal. Esto integra a sus pueblos plenamente en
la sociedad arcano-industrial de Tierra Mágica.
El mito de Colmillo, Garra, Puño y Ojo
«El Colmillo avanzó. La Garra resistió. El Puño quebró. El Ojo comprendió. Entonces Varkor
derramó su sangre y dijo: “Ahora sabéis luchar.”»
Como los mitos anteriores, distintas culturas pueden interpretarlo de manera literal, simbólica, religiosa o
arcana. El canon establece el mito y las relaciones fundamentales, pero no obliga a todos los habitantes del
mundo a aceptar una única explicación histórica.
Los tres primeros dioses
- Eïra - La Primera Semilla. Principio: Vida. Pueblos primordiales: Feéricos, Élficos y Terios. Concepto: Hoja,
Savia y Sangre.
- Khorun - La Primera Forja. Principio: Materia y Forma. Pueblos primordiales: Enanos, Gigantes y
Elementales. Concepto: Piedra, Montaña y Chispa.
- Varkor - La Primera Guerra. Principio: Conflicto. Pueblos primordiales: Orcos, Trolls, Ogros y Goblinoides.
Concepto: Colmillo, Garra, Puño y Ojo.
Eïra hizo que el mundo viviera. Khorun hizo que el mundo tuviera forma. Varkor hizo que sus
habitantes aprendieran a luchar por su lugar en él.
Varkor y la magia divina
Dentro del sistema de Foundry T.M., Varkor puede actuar como Fuente Divina para personajes que posean un
Vínculo Divino apropiado. Sus dominios pueden condicionar juramentos, milagros, prohibiciones, estilos de
canalización y consecuencias del vínculo. Los efectos concretos se definirán cuando se diseñe su módulo de
culto.
Pendiente de desarrollo de Varkor: apariencia y manifestaciones; personalidad divina; dogma;
templos; sacerdocio; festividades; mandamientos y prohibiciones; avatares; milagros; Vínculo
Divino; relación formal con la magia de guerra; y mecánicas raciales de Orcos, Trolls, Ogros y
Goblinoides.
## 23. Lore e Historia: La Primera Elección
ESTADO CANÓNICO v0.1: Aster, la Primera Elección y el origen de la Humanidad quedan
incorporados al canon de Tierra Mágica. Los detalles de culto, avatares, milagros, compatibilidad
entre pueblos y mecánicas raciales permanecen pendientes de desarrollo específico.
Aster, el Señor de las Mil Sendas
Aster es la cuarta deidad desarrollada formalmente para el panteón de Tierra Mágica. Allí donde Eïra despertó
la Vida, Khorun la Materia y la Forma, y Varkor convirtió el Conflicto en voluntad consciente, Aster introdujo
un principio diferente: la capacidad de elegir un rumbo que no estaba determinado de antemano.
- Títulos: El Señor de las Mil Sendas, el Primer Caminante, Padre de la Humanidad, Aquel que Abrió el
Camino, Señor de los Horizontes y el Inconforme.
- Principio primordial: Elección.
- Dominios: libertad, voluntad, ambición, descubrimiento, exploración, invención, progreso, civilización,
cambio, legado y caminos.
- Símbolo: un círculo abierto atravesado por tres caminos que parten de un mismo punto.
- Máxima: «Ningún camino existe hasta que alguien decide recorrerlo.»
Aster no representa una bondad automática. La libertad permite crear y también destruir; la ambición puede
levantar una ciudad o iniciar una guerra; el conocimiento puede curar o fabricar un arma. Su principio es la
posibilidad consciente de reconocer alternativas y escoger entre ellas.
Aster representa la capacidad de decir: «Podría hacer otra cosa.»
El problema de los primeros pueblos
Aster observó los pueblos que ya habitaban Tierra Mágica. Los hijos de Eïra poseían vínculos profundos con la
vida y la naturaleza. Los hijos de Khorun expresaban la materia, la magnitud y las fuerzas del mundo. Los hijos
de Varkor habían recibido maneras distintas de imponerse al conflicto.
Todos poseían dones extraordinarios, pero Aster percibió una limitación: cada gran linaje había sido creado
con una respuesta parcial acerca de lo que era. Su naturaleza orientaba parte de su lugar en el mundo. Aster
quiso intentar algo diferente.
La Primera Elección
Aster reunió barro, agua, minerales, fibras vegetales y una pequeña cantidad de sangre de criaturas vivientes.
Con aquello obtuvo un cuerpo, pero no quiso fijar para su creación un propósito único ni un don dominante.
Las tradiciones cuentan que, cuando las demás deidades preguntaron qué don concedería a aquella criatura,
Aster respondió: «Ninguno.» Eïra creyó que todavía no había terminado. Khorun pensó que debía fortalecerla.
Varkor se burló de un ser que parecía frágil frente a muchos de sus hijos.
Aster despertó al primer humano, le mostró el mundo y no le explicó qué debía construir, dónde debía vivir, a
quién debía servir ni qué debía proteger. Solo le preguntó qué quería hacer.
El primer humano señaló el horizonte y respondió: «Quiero saber qué hay allí.» Aster contestó: «Ve
y descúbrelo.»
Ese momento es recordado como la Primera Elección. Para las tradiciones asterianas, la Humanidad quedó
completa precisamente cuando su creador se negó a decidir por ella.
Los Humanos - Hijos del Camino
A diferencia de los pueblos primordiales anteriores, los Humanos no poseen ramas divinas originales. Aster
creó una sola Humanidad. Las diferencias posteriores surgieron de migraciones, climas, culturas, mezclas
poblacionales, magia, religión, guerras, aislamiento, alimentación, historia y adaptación.
Principio canónico: no existen subrazas humanas divinas originales. La diversidad humana es
histórica, cultural, geográfica y biológica, no una división primordial impuesta por Aster.
El Don sin Forma
Los sacerdotes y filósofos de Aster llaman Don sin Forma a la característica fundamental atribuida a la
Humanidad. No concede fuerza extraordinaria, longevidad, regeneración, sentidos sobrenaturales ni
resistencia elemental. Su significado es que los Humanos poseen pocas restricciones innatas sobre aquello en
lo que pueden convertirse mediante aprendizaje, organización, tradición y decisión.
Un Humano no igualará de manera natural la resistencia de muchos Trolls, la longevidad de determinados
Élficos, la fuerza de un Ogro o ciertas afinidades materiales de los Enanos. Sin embargo, puede aparecer de
manera verosímil en prácticamente cualquier profesión, escuela, culto, disciplina o estructura social del
mundo.
Guerreros, magos, ingenieros, alquimistas, exploradores, sacerdotes, comerciantes, navegantes, artistas,
inventores, agricultores y eruditos son expresiones posibles de la misma humanidad, no castas definidas por
creación divina.
El precio de la Humanidad
La amplitud de posibilidades humanas no elimina sus limitaciones. En comparación con varios pueblos
antiguos, los Humanos son relativamente frágiles y breves. No poseen la estabilidad material de numerosos
hijos de Khorun, algunos vínculos naturales profundos de los hijos de Eïra ni la resistencia extraordinaria de
muchas creaciones de Varkor.
De esa brevedad surgió una característica cultural recurrente que Aster no habría previsto completamente: la
urgencia. Los Humanos saben que disponen de poco tiempo individual y por ello tienden a construir, explorar,
investigar, fundar, transmitir y dejar algo detrás.
El Legado
Las tradiciones narran que Aster vio morir a un Humano antes de terminar su obra y creyó por un instante
haber creado un pueblo condenado a dejar todo incompleto. Entonces otro tomó sus herramientas, leyó sus
notas y continuó trabajando.
Aster comprendió que un individuo podía ser efímero mientras sus ideas sobrevivían. Una ciudad, una
institución, una familia, un libro, una técnica o un descubrimiento podían atravesar generaciones. De allí nace
la importancia del Legado dentro de su doctrina.
Un Humano es breve; aquello que enseña, construye o transmite puede durar mucho más que él.
Las Cinco Sendas
Las tradiciones asterianas más antiguas representan su principio mediante cinco caminos. No son castas ni
destinos obligatorios, sino formas simbólicas de ejercer la elección.
El Camino - Exploración
Representa la necesidad de descubrir qué existe más allá de lo conocido. Viajeros, navegantes, exploradores,
cartógrafos y aventureros suelen relacionarse con esta Senda.
La Mano - Creación
Representa construir algo que antes no existía. Artesanos, ingenieros, inventores, arquitectos y artistas pueden
reconocer en ella un aspecto de Aster. Es una de las zonas de contacto más evidentes entre sus doctrinas y las
de Khorun.
La Voz - Sociedad
Representa la capacidad de coordinar voluntades para lograr aquello que sería imposible individualmente: ley,
comercio, diplomacia, política, enseñanza, organización y cultura.
La Mirada - Conocimiento
Representa observar, preguntar, experimentar, registrar y comprender. Escribas, investigadores, médicos,
estudiosos y teóricos arcanos pueden vincularse a esta Senda.
La Huella - Legado
Representa aquello que permanece cuando su creador desaparece: familia, historia, obras, instituciones,
descubrimientos, conocimiento y memoria.
La contradicción central de Aster
Aster defiende la capacidad de elegir, pero sus propios hijos se encuentran entre quienes desarrollaron
grandes estructuras capaces de limitar la elección de otros: reinos, imperios, leyes, fronteras, ejércitos
permanentes, prisiones y jerarquías. La misma facultad que permite construir sociedades puede crear
estructuras opresivas.
Por ello, sus cultos pueden sostener interpretaciones enfrentadas. Algunas corrientes defienden que toda
persona debe poder escoger su camino; otras creen que la civilización establece límites precisamente para que
millones puedan ejercer sus elecciones sin destruirse mutuamente. Tradiciones expansionistas pueden incluso
interpretar que ningún horizonte debe permanecer cerrado.
La doctrina de Aster no elimina las consecuencias: elegir implica aceptar que toda elección
transforma el mundo y cierra otras posibilidades.
Aster y la civilización
Aster no es exclusivamente un dios de la civilización, porque las ciudades élficas, las fortalezas enanas o los
estados hobgoblin también son civilizaciones. Su dominio se aproxima más a la creación consciente de
posibilidades nuevas mediante voluntad, aprendizaje y organización.
Por ello, Aster puede ser venerado por miembros de cualquier pueblo. Un Enano explorador, una Elfa
inventora, un Goblin filósofo o un Orco cartógrafo pueden encontrar valor en sus principios. Del mismo modo,
un Humano puede vincularse religiosamente con Eïra, Khorun, Varkor u otras deidades.
Raza y culto no son equivalentes. Haber sido creado por una deidad no obliga a venerarla ni
impide establecer un Vínculo Divino con otra cuando la ficción y el culto lo permitan.
Aster y Eïra
Eïra representa adaptación mediante la vida; Aster, adaptación mediante decisión. Eïra permite que
organismos y ecosistemas cambien a lo largo del tiempo. Aster enseña a construir refugio, vestimenta o
herramientas antes de esperar que el cuerpo se adapte al invierno.
Sus tensiones aparecen cuando la transformación deliberada del entorno amenaza los ciclos naturales: tala,
desvío de ríos, expansión urbana o explotación intensiva. Los seguidores de Eïra preguntan hasta dónde puede
cambiarse el mundo sin destruir aquello que lo mantiene vivo; las tradiciones de Aster responden que esa
decisión también posee consecuencias.
Aster y Khorun
Khorun enseña a comprender y perfeccionar la materia. Aster pregunta qué nuevas posibilidades pueden
obtenerse de ella. Sus tradiciones son frecuentemente productivas y competitivas: una tecnología
perfeccionada durante generaciones puede ser adoptada por Humanos, modificada, combinada con otras ideas
y utilizada de maneras no previstas por sus creadores.
Dicho tradicional atribuido a artesanos enanos: «Un humano ve una herramienta perfecta y
pregunta inmediatamente qué ocurre si le cambia tres piezas.»
Aster y Varkor
Varkor respeta la voluntad de los Humanos, capaces de combatir aun siendo físicamente inferiores a
numerosos hijos de la Primera Guerra. Aster, sin embargo, rechaza que todo conflicto deba convertirse
automáticamente en combate.
Para Aster, combatir debe ser una elección. Para Varkor, existen conflictos que elegirán por ti.
La tensión entre ambas ideas ha producido escuelas marciales, debates religiosos, doctrinas militares y
tradiciones políticas muy diferentes dentro de sociedades humanas y no humanas.
Humanos y guerra
Los Humanos no necesitan ser los mejores guerreros individuales del mundo para convertirse en adversarios
peligrosos. Su tendencia a adoptar, combinar y transmitir conocimientos les permite aprender de muchas
tradiciones: disciplina orca, logística hobgoblin, metalurgia enana, innovación goblin o teoría mágica élfica,
entre otras.
Al combinar conocimientos de orígenes distintos, algunos estados humanos han podido desarrollar formas de
guerra de enorme complejidad. Esta capacidad no convierte a la Humanidad en una raza guerrera; expresa el
principio asteriano de aprender de opciones diferentes y construir algo nuevo con ellas.
Humanos y tecnología arcano-industrial
En la era arcano-industrial, la influencia de Aster puede reconocerse en ferrocarriles, dirigibles, armas
repetidoras, fábricas, universidades arcanas, expediciones, cartografía, grandes ciudades y acumuladores
mágicos. Los Humanos no necesitan haber inventado todas estas tecnologías para ocupar un lugar central en
su difusión.
Una característica recurrente de muchas sociedades humanas es conectar descubrimientos provenientes de
culturas distintas: un mecanismo enano, una teoría mágica élfica, una solución goblin, un material descubierto
por un Terio y una técnica humana pueden terminar integrados en una misma máquina o institución.
La Humanidad no tiene una cultura única
No existe una única cultura humana. La dispersión, la brevedad generacional y la capacidad de
transformación social han producido reinos, repúblicas, imperios, ciudades libres, tribus, confederaciones,
colonias, pueblos nómadas, estados religiosos, potencias mercantiles, naciones industriales y comunidades
rurales.
Dos Humanos procedentes de regiones muy diferentes pueden compartir culturalmente menos entre sí que
con sus vecinos Enanos, Élficos, Orcos u otros pueblos. La condición humana no sustituye cultura, ciudadanía,
religión, lengua ni historia local.
Mestizaje y linajes mixtos
La compatibilidad reproductiva o mágica entre Humanos y otros pueblos permanece deliberadamente sin
consolidar. Su adaptabilidad podría explicar en el futuro linajes mixtos o ascendencias élficas, orcas, feéricas,
elementales u otras, pero la decisión requiere definir primero la biología y cosmología de las razas implicadas.
PENDIENTE: no se asume todavía la existencia ni las reglas de semielfos, semiorcos u otros linajes
mixtos hasta auditar compatibilidad biológica, mágica y cultural.
Los Caminantes de Aster
La organización religiosa de Aster no tiene por qué adoptar una iglesia única ni una jerarquía universal. Sus
tradiciones pueden incluir Caminantes, Cartógrafos, Cronistas, Maestros, Fundadores, Exploradores y
Guardianes de Caminos.
Sus templos pueden funcionar como bibliotecas, hosterías, escuelas, observatorios, refugios para viajeros,
archivos y centros de intercambio de conocimientos. La forma exacta de sus cultos se desarrollará más
adelante, pero su arquitectura religiosa debería expresar tránsito, aprendizaje y apertura de posibilidades.
El mito del horizonte
«La Vida había despertado. La Materia había tomado forma. La Guerra había enseñado a resistir.
Entonces Aster señaló el horizonte. El primer humano preguntó: “¿Qué hay allí?” Y Aster
respondió: “Ve y descúbrelo.”»
Como los mitos anteriores, distintas culturas pueden considerarlo un acontecimiento literal, una alegoría
religiosa, una reconstrucción arcana o una mezcla de esas interpretaciones. El canon establece el mito y sus
relaciones fundamentales sin obligar a todas las sociedades a compartir una explicación única.
Los cuatro primeros dioses
- Eïra - La Primera Semilla. Principio: Vida. Pueblos primordiales: Feéricos, Élficos y Terios. Concepto: Hoja,
Savia y Sangre.
- Khorun - La Primera Forja. Principio: Materia y Forma. Pueblos primordiales: Enanos, Gigantes y
Elementales. Concepto: Piedra, Montaña y Chispa.
- Varkor - La Primera Guerra. Principio: Conflicto. Pueblos primordiales: Orcos, Trolls, Ogros y Goblinoides.
Concepto: Colmillo, Garra, Puño y Ojo.
- Aster - La Primera Elección. Principio: Elección. Pueblo primordial: Humanos. Conceptos: Don sin Forma,
Cinco Sendas y Legado.
Eïra hizo que el mundo viviera. Khorun hizo que el mundo tuviera forma. Varkor hizo que sus
habitantes aprendieran a luchar por su lugar en él. Aster les mostró que podían escoger qué hacer
con ese mundo.
Aster y la magia divina
Dentro del sistema de Foundry T.M., Aster puede actuar como Fuente Divina para personajes que posean un
Vínculo Divino apropiado. Sus dominios pueden expresarse mediante juramentos ligados a libertad, viaje,
descubrimiento, conocimiento, creación, fundación o legado. Los milagros y restricciones concretos se
definirán cuando se diseñe su módulo de culto.
Pendiente de desarrollo de Aster: apariencia y manifestaciones; personalidad divina; dogma;
templos y variantes de culto; sacerdocio; festividades; mandamientos y prohibiciones; avatares;
milagros; Vínculo Divino; relación con el progreso arcano-industrial; compatibilidad entre
pueblos; y paquete racial mecánico de los Humanos.
## 24. Lore e Historia: La Primera Luz
ESTADO CANÓNICO v0.1: Ilyr, la Primera Luz, el Primer Juramento y el origen de los Celestiales
quedan incorporados al canon de Tierra Mágica. Los detalles mecánicos de cultos, jerarquías
celestiales, milagros y Ángeles Caídos permanecen pendientes de desarrollo específico.
Ilyr, el Portador de la Primera Luz
Ilyr es la quinta deidad desarrollada formalmente para el panteón de Tierra Mágica. A diferencia de Eïra,
Khorun, Varkor y Aster, cuyos principios no poseen por sí mismos una dirección moral, Ilyr introduce una idea
nueva en la creación: el uso consciente del poder para proteger, aliviar y preservar la dignidad de otros.
- Títulos: El Portador de la Primera Luz, el Padre Celestial, el Guardián del Alba, Aquel que Alzó la Luz, Señor
del Juramento y Protector de los Inocentes.
- Principio primordial: Bien.
- Dominios: luz, protección, misericordia, justicia, esperanza, sacrificio, sanación, verdad, juramentos y
redención.
- Símbolo: un sol blanco o dorado rodeado por seis alas.
- Máxima: «La fuerza encuentra su propósito cuando protege algo además de sí misma.»
Para Ilyr, el Bien no es una etiqueta abstracta ni una obediencia automática. Significa proteger aquello que no
puede protegerse, aliviar el sufrimiento evitable, preservar la dignidad, combatir la corrupción, cumplir la
palabra dada y utilizar el poder para elevar en lugar de someter.
Antes de la Primera Luz
A medida que los primeros pueblos poblaron Tierra Mágica aparecieron dolor, abandono, esclavitud, crueldad,
traición y matanza. Eïra reconocía ciclos de vida y muerte; Khorun, causas y consecuencias materiales; Varkor,
conflicto; Aster, elecciones. Ilyr formuló una pregunta distinta: qué ocurriría si quien posee poder decidiera
utilizarlo para proteger a quien no puede defenderse.
La Primera Luz
Las tradiciones sitúan la Primera Luz durante una de las guerras más antiguas. Una ciudad había sido
destruida y los vencedores perseguían a quienes huían: heridos, ancianos, niños y otros seres que ya no
participaban del combate. La identidad de los pueblos implicados permanece deliberadamente sin fijar hasta
establecer la cronología antigua.
Ilyr descendió y se interpuso entre perseguidores y fugitivos. Cuando los guerreros alegaron que aquellos seres
pertenecían al enemigo, Ilyr respondió que ya no estaban luchando. Entonces levantó una mano y apareció
una luz que no quemaba: protegía, revelaba y podía sanar.
Ese acontecimiento fue conocido como la Primera Luz. Con ella, las tradiciones ilyranas afirman
que la misericordia adquirió por primera vez forma consciente en el mundo.
El Primer Juramento
Ilyr comprendió que ninguna deidad podía proteger personalmente a todos los seres que necesitaran ayuda.
Tomó parte de la Primera Luz, le dio voluntad, forma y propósito, y antes de despertar a sus criaturas
pronunció el Primer Juramento.
«Mientras exista alguien que necesite protección, habrá quien pueda elegir defenderlo.»
De la Primera Luz nacieron los Celestiales, conocidos en gran parte del mundo como Ángeles.
Los Celestiales - Hijos de la Primera Luz
Principio canónico: los Ángeles son una familia de seres creada por Ilyr. No son almas de mortales
virtuosos después de la muerte ni espíritus de héroes fallecidos.
Los Celestiales poseen personalidad, voluntad, memoria y emociones propias. Pueden obedecer, dudar,
equivocarse, renunciar a una misión o apartarse de su creador. Esta capacidad de elección es esencial para que
sus actos morales tengan significado.
Esencia Celestial
La naturaleza de los Celestiales no es completamente material. Sus cuerpos se estabilizan mediante una
combinación de materia y energía divina conocida provisionalmente como Esencia Celestial. Cuando se
manifiestan plenamente en Tierra Mágica pueden cansarse, resultar heridos, sangrar e incluso morir según su
naturaleza y Escala.
Ser celestial no equivale a ser invulnerable. Su poder puede ser extraordinario, pero continúa
sometido a límites, costes y consecuencias.
El Juramento de las Seis Alas
La doctrina ilyrana representa seis virtudes fundamentales mediante las Seis Alas. No todo Celestial posee
literalmente seis alas; el motivo es también un símbolo religioso y jerárquico.
- Protección: defender a otros cuando existe capacidad real para hacerlo.
- Misericordia: evitar sufrimiento innecesario y reconocer cuándo un enemigo ha dejado de ser una
amenaza.
- Justicia: impedir que el poder actúe sin responsabilidad ni consecuencia.
- Verdad: proteger la confianza y rechazar el engaño que destruye libertad y consentimiento.
- Sacrificio: aceptar un coste personal cuando proteger algo valioso lo exige.
- Esperanza: continuar actuando cuando la derrota parece inevitable.
Las Órdenes Celestiales
Los Celestiales no forman necesariamente subrazas rígidas. Sus variedades principales se organizan como
Órdenes, ligadas a funciones, virtudes y formas de manifestación. Determinadas entidades pueden cambiar de
función a lo largo de su existencia, aunque las órdenes superiores suelen reflejar naturalezas más profundas.
Custodios - Ángeles Guardianes
Los Custodios representan Protección y son los Celestiales que con mayor frecuencia interactúan directamente
con mortales. Custodian personas, comunidades, templos, reliquias, rutas o lugares vulnerables. Una misión
puede durar desde unas horas hasta siglos. Su imagen habitual es humanoide, con dos o cuatro alas, armadura
y armas defensivas, aunque su función esencial es interponerse entre una amenaza y aquello que deben
proteger.
Heraldos
Los Heraldos representan Verdad y Esperanza. Actúan como mensajeros, diplomáticos, testigos y portadores de
revelaciones. Un verdadero Heraldo no puede falsificar conscientemente un mensaje en nombre de Ilyr sin
quebrar su juramento. Puede guardar silencio, ignorar un dato o equivocarse, pero mentir deliberadamente
como voz divina constituye una transgresión fundamental.
Luminares
Los Luminares representan Misericordia. Se especializan en sanación, purificación, enfermedades, venenos,
Trauma y determinadas formas de corrupción mágica. Sus capacidades no eliminan los límites del sistema de
Restauración: incluso un Celestial necesita conocimiento, energía, tiempo y condiciones apropiadas para tratar
daños graves.
Justicarios
Los Justicarios representan Justicia. Son enviados cuando proteger ya no basta y una amenaza debe ser
detenida. Persiguen criminales extraordinarios, entidades corruptas, violadores de ciertos pactos divinos y
amenazas contra comunidades enteras. La doctrina ilyrana distingue estrictamente justicia de venganza:
disfrutar del castigo por sí mismo puede señalar el inicio de una desviación peligrosa.
Virtudes
Las Virtudes representan Sacrificio y ejemplo. Su función más habitual no es conquistar ni gobernar, sino
sostener a otros durante situaciones extremas: asedios, epidemias, evacuaciones, desastres y guerras contra
amenazas sobrenaturales. Las leyendas describen Virtudes manteniendo barreras, rutas de escape o refugios
durante periodos imposibles para seres ordinarios.
Serafines
Los Serafines son Celestiales excepcionalmente próximos a Ilyr. Son muy raros y suelen representarse con seis
alas físicas o formadas por energía luminosa. Su aparición indica normalmente acontecimientos de
importancia histórica, conflictos divinos, amenazas primordiales o la protección de lugares fundamentales. No
constituyen adversarios ni aliados ordinarios.
Tronos
Los Tronos son Celestiales antiguos cuya forma se ha apartado en gran medida del humanoide. Pueden
manifestarse como estructuras de luz, anillos concéntricos, figuras geométricas, ojos luminosos o arquitecturas
vivientes. Representan Ley y estabilidad divina y suelen mantener barreras, vigilar portales, custodiar
prisiones o estabilizar regiones dañadas por fuerzas sobrenaturales.
Querubines
Los Querubines son guardianes del conocimiento sagrado, peligroso o prohibido. Pueden poseer múltiples ojos,
alas o sentidos sobrenaturales. Custodian bibliotecas divinas, reliquias, secretos, sellos y lugares que contienen
conocimiento capaz de producir consecuencias catastróficas si se utiliza sin restricciones.
Celestiales menores
Existen también manifestaciones celestiales de menor poder. Algunas categorías iniciales son las siguientes:
- Chispas: pequeños espíritus o concentraciones conscientes de luz celestial.
- Guías: protectores de viajeros, peregrinos y rutas concretas.
- Vigilantes: observadores vinculados a lugares, fronteras o amenazas específicas.
- Portadores: mensajeros y servidores encargados de tareas acotadas.
Algunos Celestiales menores podrían establecer vínculos equivalentes a Familiares Divinos mediante Rasgos y
Técnicas apropiadas. Sus reglas se diseñarán al desarrollar los cultos y Familiares de Fuente Divina.
Libre elección y la posibilidad de caer
Aster introdujo la Elección en el mundo, y esa posibilidad alcanza incluso a seres creados posteriormente. Ilyr
podría haber construido servidores incapaces de desobedecer, pero entonces sus actos no constituirían una
elección moral. Por ello los Celestiales poseen libertad suficiente para apartarse de su propósito.
Doctrina ilyrana: «Una criatura incapaz de hacer el mal tampoco puede elegir verdaderamente
hacer el bien.»
Un Celestial puede quebrar su juramento, abandonar su Orden o actuar contra los principios de Ilyr. Esto hace
posible la existencia de Ángeles Caídos.
Ángeles Caídos
Principio canónico: un Ángel Caído no es automáticamente un Demonio.
Un Caído sigue siendo una entidad originalmente creada por Ilyr. Puede haber perdido parte de su naturaleza
celestial, haberse corrompido, rechazado a su creador o incluso buscar posteriormente la redención. Algunos
podrían servir a poderes oscuros, pero su origen continúa siendo distinto del de los futuros Demonios.
Redención
Ilyr sostiene que mientras exista capacidad real de elección existe la posibilidad de intentar regresar. La
redención no elimina las consecuencias ni equivale a perdón automático. Requiere reconocer el daño,
modificar la conducta, reparar lo reparable y aceptar las consecuencias cuando corresponda.
Ilyr y Eïra
Ilyr y Eïra comparten interés por preservar la vida, pero no interpretan todos los procesos del mismo modo. La
depredación natural no constituye maldad para Ilyr: un depredador cazando para alimentarse participa del
ciclo de Eïra. La responsabilidad moral requiere intención, consciencia y capacidad de elección.
Principio cosmológico: la naturaleza no es moralmente malvada por funcionar como naturaleza.
La moralidad exige algún grado de voluntad y elección.
Ilyr y Khorun
Ambos valoran responsabilidad, constancia, juramentos y construcción duradera. Sus cultos pueden cooperar
en fortificaciones, refugios, hospitales, obras públicas y templos. Una formulación tradicional resume su
diferencia: Khorun pregunta si una obra puede sostenerse; Ilyr pregunta a quién protege.
Ilyr y Varkor
Ilyr acepta que existen situaciones donde combatir es necesario, pero rechaza que la victoria convierta
automáticamente una acción en justa. Varkor puede respetar profundamente a quien arriesga su vida para
proteger a otros, pero considera que una misericordia mal aplicada puede permitir que una amenaza vuelva a
levantarse. Esta tensión es una fuente antigua de disputas religiosas y militares.
Ilyr y Aster
Aster abrió la posibilidad de elegir; Ilyr planteó la pregunta acerca de qué elecciones deberían realizarse. Aster
rechaza imponer un único camino vital, mientras Ilyr sostiene que ciertas decisiones deliberadamente crueles
no son moralmente equivalentes a aquellas que protegen la dignidad y la libertad de otros. Su relación
combina cooperación con un debate filosófico permanente.
Cultos de Ilyr
No se consolida todavía una iglesia universal. Las tradiciones de Ilyr pueden formar órdenes independientes o
instituciones regionales dedicadas a aspectos diferentes de las Seis Alas. Entre las formas iniciales se
encuentran la Orden del Escudo, ligada a protección; la Luz Serena, dedicada a sanación; la Orden del
Juramento, orientada a justicia y ley; los Custodios del Alba, especializados en amenazas sobrenaturales; y los
Hermanos del Camino Blanco, dedicados a viajeros, refugiados y comunidades aisladas.
Estas organizaciones pueden equivocarse, dividirse o corromperse. Ilyr no aprueba automáticamente aquello
que cualquier institución realice en su nombre. Justicia puede degenerar en fanatismo; protección, en control;
pureza, en intolerancia; y verdad, en dogmatismo.
La Quinta Gran Máxima
«La Vida aprendió a crecer. La Materia aprendió a tomar forma. La Guerra enseñó a resistir. La
Elección abrió todos los caminos. Entonces apareció la Luz, y por primera vez alguien preguntó:
“No qué puedo hacer, sino qué debo hacer.”»
Los cinco primeros dioses
- Eïra - La Primera Semilla. Principio: Vida. Pueblos primordiales: Feéricos, Élficos y Terios.
- Khorun - La Primera Forja. Principio: Materia y Forma. Pueblos primordiales: Enanos, Gigantes y
Elementales.
- Varkor - El Primer Desafío y la Primera Guerra. Principio: Conflicto. Pueblos primordiales: Orcos, Trolls,
Ogros y Goblinoides.
- Aster - La Primera Elección. Principio: Elección. Pueblo primordial: Humanos.
- Ilyr - La Primera Luz y el Primer Juramento. Principio: Bien. Pueblos primordiales: Celestiales o Ángeles.
La aparición de Ilyr establece por primera vez un principio moral positivo consciente dentro de la
cosmología. También prepara el terreno para que puedan surgir su negación deliberada, la
corrupción, lo prohibido y formas antinaturales de existencia.
Ilyr y la magia divina
Dentro de Foundry T.M., Ilyr puede actuar como Fuente Divina para personajes con un Vínculo Divino
apropiado. Sus dominios pueden expresarse mediante juramentos de protección, misericordia, justicia, verdad,
sacrificio o esperanza. Las capacidades concretas deben respetar la arquitectura mágica general, los requisitos
de conocimiento y los límites de Restauración ya establecidos.
Pendiente de desarrollo de Ilyr: apariencia y avatares; dogma completo; estructura de cultos;
festividades; mandamientos y prohibiciones; milagros; Vínculos Divinos; estadísticas y paquetes de
Celestiales; reglas de caída y redención; y relaciones exactas con el futuro principio de Corrupción.
## 25. Lore e Historia: La Primera Profanación
ESTADO CANÓNICO v0.1: Nereth, la Primera Profanación, el origen de los Demonios y el principio
de la No Muerte quedan incorporados al canon de Tierra Mágica. La muerte natural no pertenece a
Nereth: su dominio es la corrupción consciente y la violación del final natural.
Nereth, el Señor de la Primera Profanación
Nereth es la sexta deidad desarrollada formalmente para el panteón de Tierra Mágica. No es el dios de la
muerte. La muerte natural forma parte del ciclo de Eïra y del tránsito que posteriormente custodiará Vaelun.
Nereth representa el momento en que una voluntad comprende el sufrimiento ajeno, comprende que podría
evitarlo y decide utilizarlo como herramienta, recurso o placer.
- Títulos: El Profanador, Señor de las Cadenas, Padre de los Demonios, Aquel que Niega el Final, el
Susurrante y Señor de lo Prohibido.
- Principio primordial: Corrupción / Mal.
- Dominios: corrupción, dominación, crueldad, traición, necromancia, profanación, esclavitud del alma,
conocimiento prohibido, demonios, pactos oscuros y No Muerte.
- Símbolo: un círculo negro abierto por una grieta vertical, del que descienden tres cadenas.
- Máxima: «Si algo puede ser tomado, ¿por qué pedirlo?»
Para Nereth, la libertad ajena es un obstáculo; la vida puede convertirse en recurso; la muerte es una
limitación que puede forzarse; y cualquier límite impuesto por naturaleza, dioses o moral existe para ser
probado, roto o explotado.
La Primera Maldad
La Primera Luz de Ilyr introdujo en la creación una distinción moral consciente entre aquello que puede
hacerse y aquello que debería hacerse. Nereth formuló la pregunta contraria. Según la tradición, observó a Ilyr
proteger a quienes ya no podían defenderse y preguntó por qué. Ilyr respondió que podía impedir su
sufrimiento. Nereth contempló a los indefensos y contestó: «Precisamente.»
Las tradiciones denominan a este intercambio la Primera Maldad: no porque antes no existieran
dolor, violencia o depredación, sino porque por primera vez una voluntad eligió conscientemente
causar o explotar un sufrimiento que comprendía.
La Primera Profanación
Nereth quiso demostrar que incluso los límites fundamentales de los otros dioses podían quebrarse. Encontró
el cadáver de uno de los primeros mortales. La vida de Eïra había abandonado el cuerpo; la materia de Khorun
comenzaba a regresar al mundo; el conflicto había terminado y sus decisiones habían cesado.
Nereth introdujo energía en el cadáver, ató a la materia aquello que quedaba de su identidad y le ordenó
levantarse. El cuerpo abrió los ojos sin haber vuelto realmente a la vida. Había nacido el Primer No Muerto.
Principio canónico: la muerte no es malvada. La No Muerte es una alteración del orden natural de
la muerte. Su origen es una profanación, aunque un No Muerto consciente puede conservar
voluntad, memoria y capacidad moral propias.
Los estados de la No Muerte
Los No Muertos se clasifican según qué parte del ser permanece y cómo se sostiene su existencia. Esta
clasificación es cosmológica y narrativa; las reglas particulares se diseñarán en el bestiario y los módulos de
magia.
Cascarones
Cadáveres que continúan moviéndose sin que la persona original permanezca de forma completa. Esqueletos y
Zombis son ejemplos típicos. Pueden ser impulsados por energía necromántica, instrucciones mágicas o
entidades menores y constituyen una de las formas más simples de No Muerte.
Atados
Parte de la identidad, alma o eco espiritual del fallecido permanece anclada. Revenants, Tumularios y
determinados Caballeros Muertos pueden pertenecer a esta categoría. Algunos conservan recuerdos extensos;
otros solo una obsesión, juramento, orden o deseo.
Espectrales
Consciencias que han perdido casi toda conexión estable con un cuerpo. Espectros, Apariciones, Sombras,
Ánimas y criaturas semejantes pueden aparecer aquí. No todo fantasma es un No Muerto: un espíritu natural,
una aparición divina o un eco mágico pueden tener otro origen. Un Espectral de Nereth es una consciencia
impedida artificialmente de continuar su destino natural.
Hambrientos
No Muertos cuya existencia exige consumir algo de los vivos: sangre, energía vital, Maná, emociones, memoria
o incluso años de vida. Los Vampiros son el ejemplo más conocido y podrán desarrollarse posteriormente
como una familia completa de linajes y sociedades.
Soberanos de la Muerte
Individuos que alcanzaron deliberadamente una forma avanzada de No Muerte. El paradigma es el Liche:
alguien que separa, ancla o preserva partes fundamentales de su identidad para continuar existiendo cuando
su cuerpo debería haber muerto. La transformación es extraordinaria, peligrosa y prohibida; nunca una
técnica trivial.
La Primera Necromancia
La Primera Profanación demostró que el procedimiento podía estudiarse y enseñarse. De allí nació la
Necromancia prohibida. Sin embargo, estudiar la muerte no es por sí mismo una profanación: un médico
puede estudiar cadáveres, un sacerdote realizar ritos funerarios, un investigador analizar energía espiritual y
un canalizador comunicarse con un muerto sin esclavizarlo.
La Necromancia prohibida comienza cuando la práctica exige retener, esclavizar, alterar,
consumir o utilizar aquello que debería haber abandonado el mundo.
Las Artes Prohibidas
Lo Prohibido no equivale simplemente a lo ilegal. Las leyes mortales cambian. Las verdaderas Artes Prohibidas
son prácticas cuyo funcionamiento exige una violación fundamental: esclavitud del alma, robo de vida, control
forzado de la voluntad, creación deliberada de No Muertos, determinadas corrupciones corporales o
espirituales y pactos que requieren sacrificios conscientes.
Los Demonios
Después de la Primera Profanación, Nereth creó seres que nunca habían pertenecido a otro dios. No utilizó
cadáveres ni Ángeles Caídos: formó nuevas entidades mediante su propio principio. Así nacieron los Demonios.
Principio canónico: Ángel Caído y Demonio no son sinónimos. Un Ángel Caído fue creado
originalmente por Ilyr; un Demonio pertenece al linaje creado por Nereth.
Los Demonios están formados por una Esencia Corrupta: magia organizada alrededor de principios
parasitarios y de dominación. Muchos requieren cuerpo, recipiente, portal, pacto, invocación o una
concentración excepcional de energía para manifestarse plenamente en Tierra Mágica.
Castas demoníacas
Tentadores
Especialistas en deseo, ambición, secretos y pactos. Prefieren conseguir consentimiento, porque una elección
voluntaria puede abrir vínculos más profundos que la coerción directa.
Dominadores
Encarnan control y esclavitud. Se especializan en coerción mental, juramentos forzados, posesión, cadenas
espirituales y jerarquías absolutas.
Devoradores
Representan hambre sin límite. Pueden consumir carne, magia, energía vital, almas o emociones. Algunos son
bestiales; otros son inteligentes y tratan comunidades enteras como reservas de recursos.
Verdugos
Utilizan sufrimiento como herramienta para quebrar voluntad, obtener información, generar energía o
transformar criaturas. No todos disfrutan del dolor: para algunos es simplemente una tecnología de
dominación.
Profanadores
Especialistas en corrupción de cadáveres, almas, lugares sagrados y magia. Muchos de los conocimientos
necrománticos más antiguos se atribuyen a esta casta.
Archidemonios
Demonios excepcionalmente antiguos que acumularon poder, seguidores y conocimiento durante eras. No son
dioses, aunque algunos gobiernan dominios extraplanares o mantienen cultos mortales. Su presencia debe
corresponder a amenazas de escala excepcional.
Demonios menores y pactos
Existen Diablillos, Acechadores, parásitos espirituales, entidades de posesión, bestias demoníacas y otras
formas menores. Algunas fueron creadas por Demonios mayores y no directamente por Nereth.
Los pactos demoníacos siguen la arquitectura de Fuente Externa ya existente en Foundry T.M.: Don +
Condición + Precio + Consecuencia. Un Demonio puede ofrecer poder, conocimiento, riqueza, vida prolongada,
venganza, protección, magia o incluso una forma de retorno de la muerte; el precio nunca debe ser irrelevante.
Corrupción
La Corrupción no se consolida como una barra universal que convierta automáticamente a alguien en
malvado. Puede afectar cuerpo, magia, lugares, objetos, almas o relaciones. Su tratamiento mecánico se
diseñará caso por caso. La voluntad y las decisiones continúan siendo importantes incluso cuando alguien
utiliza poder peligroso.
Nereth y los otros dioses
Eïra acepta nacimiento, crecimiento, muerte y renovación; Nereth interrumpe el ciclo para apropiarse de
aquello que no le pertenece. Khorun transforma materia preservando su lógica; Nereth la fuerza aunque
destruya su integridad. Varkor puede respetar la violencia de un adversario capaz de luchar, mientras Nereth
considera irrelevante que la víctima pueda defenderse. Aster defiende la elección; Nereth persigue el control,
aunque comprende que una elección voluntaria puede corromper más profundamente que una orden. Con
Ilyr mantiene una oposición directa: protección frente a explotación, dignidad frente a utilidad y libertad
frente a dominio.
La Sexta Gran Máxima
«La Luz preguntó: “¿Qué debo hacer?” Nereth respondió: “Lo que puedas.” Tomó al muerto, rompió
su descanso y ordenó: “Levántate.” Y por primera vez, la muerte fue profanada.»
Nereth y la magia divina
Nereth puede actuar como Fuente Divina para personajes o NPC con un Vínculo apropiado, además de ser
origen de numerosos Pactos y Fuentes Externas. Sus cultos pueden relacionarse con dominación, corrupción,
necromancia y transgresión de límites fundamentales. Los detalles de milagros, juramentos, costes y
consecuencias quedan pendientes del módulo religioso.
Pendiente de desarrollo de Nereth: apariencia y avatares; estructura de cultos; planos demoníacos;
Archidemonios concretos; reglas de posesión y corrupción; catálogo de No Muertos; Necromancia;
pactos; y relación completa con el destino de las almas.
## 26. Lore e Historia: El Primer Tránsito
ESTADO CANÓNICO v0.1: Vaelun, el Primer Tránsito y los Ankar quedan incorporados al canon de
Tierra Mágica. Vaelun no representa la destrucción ni la No Muerte: custodia la muerte natural, el
paso del alma y el derecho de los muertos a no ser retenidos o utilizados contra su voluntad.
Vaelun, el Guardián del Último Umbral
Vaelun es la séptima deidad desarrollada formalmente y completa el Panteón Primordial básico de Tierra
Mágica. Su función cosmológica es custodiar aquello que ocurre cuando una vida consciente termina.
- Títulos: El Guardián del Último Umbral, Señor del Último Camino, el Silencioso, Juez de los Muertos y
Custodio de las Almas.
- Principio primordial: Tránsito.
- Dominios: muerte natural, descanso, almas, funerales, memoria de los muertos, ancestros, equilibrio entre
vida y muerte, protección de tumbas y persecución de la No Muerte.
- Símbolo: una puerta negra abierta sobre un disco blanco, flanqueada por dos ojos dorados.
- Máxima: «Morir no es desaparecer. Es cruzar.»
Vaelun no mata ni determina necesariamente cuándo debe morir alguien. Su función comienza cuando la vida
termina. Eïra gobierna el ciclo vital; Vaelun custodia el paso entre aquello que fue y aquello que sigue después.
La Primera Muerte
Cuando murió el primer ser plenamente consciente, los dioses encontraron algo diferente de un cuerpo vacío.
Había quedado una esencia capaz de conservar identidad, memoria y continuidad: el alma. Eïra comprendía
que el cuerpo debía regresar al ciclo; Khorun que su materia volvería al mundo; Aster que sus elecciones en la
vida habían terminado; e Ilyr se negó a considerar irrelevante aquello que la persona había sido.
Vaelun se presentó ante aquella alma. No intentó devolverla a la vida. Extendió una mano y dijo: «Tu camino
aquí terminó. Aún queda otro.» El alma aceptó y cruzó. Ese acontecimiento es recordado como el Primer
Tránsito.
El Primer Tránsito
Desde entonces, Vaelun custodia el límite entre vivos y muertos. No todas las culturas coinciden sobre qué
existe más allá del Umbral, pero el canon establece que la muerte consciente produce un tránsito real y que las
almas pueden ser vulnerables mientras ese proceso está incompleto.
Principio canónico: el destino último de las almas permanece abierto para desarrollo futuro. El
Primer Tránsito confirma la continuidad espiritual, pero no fija todavía una única cosmología del
más allá.
Los Ankar - Guardianes del Umbral
Vaelun descubrió que algunas almas se perdían, se negaban a partir o podían ser atacadas, devoradas,
retenidas o esclavizadas. Creó entonces a los Ankar como guardianes del tránsito. Su misión original fue: «Que
ningún alma sea tomada contra su voluntad.»
Los Ankar son humanoides altos y esbeltos de rasgos cánidos estilizados: hocico alargado, orejas altas, ojos
intensos y pelajes que suelen encontrarse en tonos negros, grises, arena o blancos. Su apariencia recuerda en
muchas culturas a los guardianes funerarios de cabeza de cánido, pero su identidad, biología y tradición
pertenecen de forma propia a Tierra Mágica.
Principio canónico: Ankar y Terio Chacal no son la misma raza. Un Terio Chacal pertenece a los
Hijos de la Sangre de Eïra; un Ankar fue creado directamente por Vaelun para custodiar el tránsito
de las almas.
La filosofía Ankar
La doctrina tradicional Ankar sostiene que la muerte no debe celebrarse de manera frívola, pero tampoco
tratarse como una aberración. Su principio central es que todo debe terminar correctamente. Una vida, una
guerra, un juramento, un reinado, una amistad o una era pueden causar daño cuando alguien se niega a
aceptar que han concluido.
Las Tres Obligaciones
Recordar
Los Ankar preservan nombres, historias, genealogías, testamentos, registros y memoria de quienes murieron.
Para ellos, conservar la memoria no significa impedir el tránsito.
Custodiar
Protegen cementerios, catacumbas, campos de batalla, reliquias funerarias, rutas espirituales y lugares donde
la frontera entre vida y muerte es débil. Profanar tumbas, esclavizar espíritus o crear No Muertos son
transgresiones especialmente graves.
Dejar Partir
Los vivos deben permitir que los muertos se marchen. El duelo y el recuerdo son legítimos; retener
desesperadamente a una persona puede abrir precisamente las puertas que Nereth utiliza. Una máxima Ankar
resume esta obligación: «Recordar no significa retener.»
Los Ankar y la muerte
Los Ankar pueden conocer más sobre espíritus y muerte que casi cualquier otro pueblo sin convertirse por ello
en nigromantes. Pueden escuchar ecos, detectar presencias, identificar No Muertos, realizar ritos funerarios,
investigar muertes y guiar almas. Su frontera moral se encuentra entre escuchar a un muerto y obligarlo a
permanecer.
No Muertos conscientes
Un Ankar no está obligado a destruir automáticamente todo No Muerto consciente. Primero debe comprender
por qué continúa presente. Un Revenant que permanece voluntariamente hasta cumplir una promesa puede
ser ayudado; un espíritu perdido, guiado; un Vampiro que conserva voluntad presenta un problema moral; un
Liche que esclavizó otras almas para prolongar su existencia representa una profanación extrema.
Vaelun y Nereth
La oposición entre ambos es una de las más profundas del panteón. Vaelun sostiene que aquello que terminó
debe poder descansar. Nereth sostiene que, si todavía puede utilizarse, no ha terminado. Para Vaelun, un
cadáver conserva dignidad y un alma pertenece a sí misma; para Nereth, ambos pueden convertirse en
recursos. La No Muerte forzada es una de las mayores profanaciones imaginables para los seguidores de
Vaelun.
Vaelun y los otros dioses
Con Eïra mantiene una relación estrecha: Eïra cuida aquello que vuelve al ciclo material de la vida y Vaelun
aquello que debe abandonar ese ciclo. Con Ilyr comparte la protección de la dignidad: Ilyr acompaña a los
vivos y Vaelun a quienes ya han muerto. Aster recuerda que cada persona elige su camino; Vaelun recuerda
que todo camino termina. Varkor acepta que incluso el guerrero más poderoso encuentra una derrota final;
recurrir a Nereth solo por incapacidad de aceptar la muerte puede ser visto como una negación de esa derrota.
Khorun enseña que toda forma puede transformarse; Vaelun, que ninguna forma material dura para siempre.
Los Ankar como pueblo
Los Ankar son una raza jugable potencial, pero su origen no obliga a cada individuo a servir como sacerdote
funerario. Pueden ser guerreros, exploradores, médicos, jueces, investigadores, arqueólogos, magos,
guardianes, historiadores, ingenieros, comerciantes o aventureros. La tradición del Umbral forma parte de su
historia colectiva, no de una profesión obligatoria.
Una despedida tradicional Ankar puede formularse como: «Tu nombre permanece. Tu camino
continúa.» Entre vivos, una bendición antigua dice: «Cuando llegue el Umbral, que lo cruces por
voluntad propia.»
La Séptima Gran Máxima
«La Vida creó el comienzo. La Materia le dio forma. El Conflicto puso esa forma a prueba. La
Elección abrió sus caminos. La Luz preguntó cómo debían recorrerse. La Corrupción intentó
apropiarse de ellos. Entonces llegó la Muerte, y Vaelun dijo: “Todo camino merece un final.”»
El Panteón Primordial básico
- Eïra - Primera Semilla. Principio: Vida. Creaciones: Feéricos, Élficos y Terios.
- Khorun - Primera Forja. Principio: Materia y Forma. Creaciones: Enanos, Gigantes y Elementales.
- Varkor - Primer Desafío / Primera Guerra. Principio: Conflicto. Creaciones: Orcos, Trolls, Ogros y
Goblinoides.
- Aster - Primera Elección. Principio: Elección. Creación: Humanos.
- Ilyr - Primera Luz / Primer Juramento. Principio: Bien. Creaciones: Celestiales o Ángeles.
- Nereth - Primera Profanación. Principio: Corrupción / Mal. Creaciones: Demonios; origen de la No Muerte.
- Vaelun - Primer Tránsito. Principio: Tránsito. Creación: Ankar.
Con Vaelun queda cerrado el Panteón Primordial básico v0.1. Nuevas divinidades podrán aparecer
posteriormente como dioses menores, descendientes, entidades regionales, héroes divinizados u
otros poderes surgidos durante la historia del mundo.
Vaelun y la magia divina
Vaelun puede actuar como Fuente Divina para personajes con un Vínculo apropiado. Sus dominios pueden
expresarse mediante protección espiritual, ritos funerarios, detección de No Muertos, custodia de almas,
memoria y defensa frente a profanaciones. Sus milagros no deben convertir la muerte en un recurso trivial ni
sustituir automáticamente Medicina, Restauración o las reglas de Trauma.
Pendiente de desarrollo de Vaelun: apariencia y avatares; dogma completo; órdenes Ankar; ritos
funerarios; estructura del más allá; destino de las almas; milagros; Vínculos Divinos; estadísticas y
paquetes raciales de los Ankar.
## 27. Canon unificado del Panteón y religión jugable
ESTADO CANÓNICO v0.2: el Panteón Central de Tierra Mágica queda organizado en siete Dioses
Primordiales y cinco Dioses Menores conocidos como las Cinco Luminarias. Las Luminarias son
entidades divinas independientes y no nombres alternativos, avatares ni aspectos de los
Primordiales.
Jerarquía divina
Los siete Primordiales son Eïra, Khorun, Varkor, Aster, Ilyr, Nereth y Vaelun. Están vinculados a principios
fundacionales: Vida/Naturaleza, Materia y Forma, Conflicto, Elección, Bien, Corrupción/Mal y Tránsito. Con
Vaelun queda cerrado el Panteón Primordial.
Las Cinco Luminarias son Aurea, la Llama; Nemor, el Guardián; Oria, la Balanza; Vael, el Navegante; y Selene,
la Velada. Son Dioses Menores reales surgidos posteriormente en la historia divina, con voluntad, cultos y
Vínculos propios.
Ámbitos de las Cinco Luminarias
- Aurea, la Llama: vida, hogar, valor, renovación y juramentos de protección.
- Nemor, el Guardián: muerte, memoria, ancestros, límites y custodia de tumbas.
- Oria, la Balanza: ley, intercambio, acuerdos y conocimiento registrado.
- Vael, el Navegante: viaje, cambio, tormentas, descubrimiento y fortuna incierta.
- Selene, la Velada: sueño, misterio, percepción, secretos y fronteras entre mundos.
Regla de solapamiento
Los dominios divinos no son propiedades exclusivas. Compartir un ámbito no implica identidad. Eïra y Aurea
pueden actuar sobre la vida; Ilyr y Aurea sobre protección; Vaelun y Nemor sobre muerte y memoria; Aster y
Vael sobre viaje y descubrimiento; Ilyr y Oria sobre justicia y ley; Vaelun y Selene sobre fronteras espirituales.
La diferencia se determina por el principio y la función de cada deidad.
Rango, culto y pueblos
El rango primordial es cosmológico y no equivale a poder político, número de fieles o exclusividad sobre un
dominio. Las Cinco Luminarias pueden poseer iglesias más extendidas que algunos Primordiales. Del mismo
modo, la creación de un pueblo por una deidad expresa origen cosmológico y no obliga a sus individuos a
venerarla.
Otros poderes
Pueden existir dioses menores adicionales, descendientes divinos, espíritus regionales, santos, ancestros,
héroes divinizados y entidades planares. Ninguno se incorpora automáticamente al Panteón Central: hacerlo
requiere una ampliación expresa del canon.
Canon visual
Los doce miembros del Panteón Central poseen una fuente visual canónica establecida. Las futuras
ilustraciones, avatares y escenas religiosas deben tomar esas imágenes como referencia primaria de identidad,
en conjunto con la Guía de Estilo Visual de Tierra Mágica.
## 28. Lore e Historia: Los Primeros Vínculos
Antes de los Cristales
Los Vínculos Familiares no nacieron en las minas de cristal. Los testimonios más antiguos se remontan a la
Edad de los Pactos, cuando comunidades separadas describieron un mismo fenómeno: ciertos niños con una
resonancia mágica excepcional se volvían inestables durante el crecimiento, mientras que la cercanía de
determinadas criaturas o espíritus podía calmarlos y ordenar el flujo que los atravesaba.
Nadie sabe qué comunidad estableció el primer vínculo consciente. Algunas tradiciones atribuyen el
descubrimiento a guardianes de bosques, otras a espíritus elementales y otras a familias que observaron
durante generaciones qué entidades respondían a sus hijos. Lo canónico es que estos vínculos ya existían antes
de la Fractura del Cielo y que de ellos proceden muchos linajes familiares posteriores.
La Fractura y los huevos de cristal
Cuando la Fractura del Cielo alteró la distribución mágica del mundo, aparecieron o quedaron expuestos
grandes depósitos de cristal arcano. Entre ellos se encontraron piezas mucho más raras que reaccionaban ante
determinadas almas: vibraban, emitían luz, cambiaban de temperatura o producían patrones internos cuando
una persona compatible se aproximaba.
Su forma cerrada y el hecho de que, tras un proceso exitoso, un Familiar pudiera manifestarse alrededor de
ellas hicieron que el pueblo comenzara a llamarlas huevos de familiar. El nombre sobrevivió aunque los
estudios arcanos demostraron que no existe criatura gestándose dentro del cristal. El término técnico moderno
es Cristal de Resonancia.
La tradición del vínculo
Con el tiempo, sanadores, arcanistas, guardianes y tradiciones familiares aprendieron a distinguir la
Saturación Mágica juvenil de otros fenómenos. No todo niño con sensibilidad mágica necesita un Familiar y la
mayoría de la población nunca atraviesa este problema. En quienes sí presentan una resonancia inestable, el
vínculo compatible puede convertirse en una relación de toda la vida y en una de las formas más seguras de
alcanzar la madurez arcana sin que esa inestabilidad los dañe.
En humanos la vigilancia suele concentrarse antes de los quince años. Entre pueblos con ciclos de crecimiento
diferentes, la tradición se adapta a su madurez biológica y mágica. Esta diferencia impide tratar una edad
humana como una ley universal del mundo.
Qué nace del cristal
Nada nace literalmente del cristal. El Cristal de Resonancia funciona como una puerta estrecha entre dos
resonancias compatibles: permite que una entidad existente responda, se manifieste o consolide una forma
estable junto al futuro vinculado. El Familiar conserva identidad, voluntad y naturaleza propias. Puede parecer
una criatura animal, un espíritu, un feérico, un elemental u otra entidad animada, pero no es una herramienta
ni adopta como forma ordinaria un objeto.
Custodia y escasez
Los cristales adecuados son demasiado raros para tratarse como mercancía trivial. Los yacimientos capaces de
producirlos suelen estar protegidos por leyes, pactos, comunidades o instituciones que controlan la extracción
y buscan evitar que piezas dañadas o incompatibles se utilicen de manera irresponsable. El canon no fija
todavía una única mina central de Edria: esa localización, sus guardianes y su importancia política quedan
abiertos para desarrollo posterior.
Principio canónico
Un Familiar no existe para aumentar gratuitamente el poder de un niño. Su primera función
histórica fue convertir una resonancia peligrosa en un vínculo estable entre dos seres. Todo poder
posterior depende de quiénes son ambos, de cómo evoluciona su relación y de las capacidades que
desarrollan juntos.

# ESTADO DE CONSOLIDACIÓN Y PRÓXIMO TRABAJO

## Núcleo vigente ya consolidado

- Motor 2d10, Dificultades, Ventaja/Desventaja, Hazañas/Pifias y grados de resultado.
- Creación sobre 25 PD + 3 PR + PEI 20 o + Reserva líquida 2 o, ahora documentada paso a paso.
- Siete Atributos, 26 Habilidades, Especializaciones, progresión y costes.
- Economía de Acción, Movimiento y Reacción.
- Combate, Escala, maniobras, armas, armaduras, escudos y técnicas ratificadas.
- Vida, Trauma, Heridas Graves, Fatiga y descansos.
- Magia, Maná, Sostenimiento, Sobrecarga y catálogo estable de 18 hechizos.
- Alquimia, Ingeniería arcano-industrial, dispositivos, Ritualismo y proyectos.
- Familiares: vínculo, economía de control, desarrollo y canon narrativo v1.2.
- Regla 1.0 de pueblos/orígenes sin paquetes mecánicos gratuitos.
- Canon del Mundo v1.2 completo.
- Panteón Central: siete Primordiales + cinco Luminarias.

## Trabajo editorial pendiente antes de imprenta

El siguiente trabajo no consiste en volver a repartir información entre varios archivos. Se realiza **dentro de este mismo Manual**:

1. Revisar capítulo por capítulo el Archivo Recuperado y promover al cuerpo principal sólo el material que se decida conservar.
2. Eliminar duplicaciones narrativas entre los resúmenes del Panteón, el Canon v1.2 y el Archivo Recuperado una vez que cada detalle esté ratificado.
3. Completar ejemplos de juego, ejemplos de creación y ejemplos de combate sin alterar reglas.
4. Revisar tablas de equipo, precios, disponibilidad y contenido de mercado para edición.
5. Resolver cualquier plantilla universal pendiente que todavía obligue a improvisar valores —por ejemplo perfiles concretos de Familiares, PNJ o criaturas— antes de considerarla sección editorialmente cerrada.
6. Añadir glosario e índices al final del proceso.
7. Sólo después de cerrar el contenido se realizará maquetación, selección final de arte, paginación, créditos, pruebas de impresión y exportación PDF/DOCX.

## Regla de trabajo desde esta versión

**No crear un segundo manual maestro.** Toda corrección o ampliación se hace en este archivo y se respalda mediante commits de GitHub. Los documentos históricos se consultan únicamente para recuperar información o verificar procedencia.

