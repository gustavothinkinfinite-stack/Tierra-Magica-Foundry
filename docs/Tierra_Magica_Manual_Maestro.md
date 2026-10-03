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

Un personaje de nivel 1 se construye con **cuatro economías separadas**:

- **6 aumentos gratuitos de Atributo**: sólo para repartir los siete Atributos iniciales;
- **25 PD**: Habilidades, Especializaciones, Técnicas, Disciplinas y Hechizos;
- **3 PR**: Rasgos de creación;
- **PEI 20 o = 2.000 c**: equipo inicial; al cerrar la preparación se recibe además una **Reserva líquida de 2 o = 200 c**.

No se convierten unas en otras.

Procedimiento:

1. definir concepto, pueblo/herencia, cultura y origen narrativo;
2. repartir los siete Atributos;
3. planificar los 25 PD y comprobar requisitos antes de comprar;
4. comprar Habilidades;
5. comprar Especializaciones y Técnicas;
6. si usa magia, comprar Disciplinas y Hechizos;
7. gastar los 3 PR en Rasgos;
8. si posee Familiar Mágico, definir vínculo y perfil simplificado;
9. seleccionar equipo con PEI 20 o y cerrar la preparación material;
10. calcular valores derivados;
11. completar identidad y datos narrativos;
12. ejecutar la lista final de legalidad antes de comenzar a jugar.

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

#### Cómo gastar los 25 PD

Conviene comprar en este orden porque los requisitos pueden depender de elecciones anteriores:

1. **Habilidades base** que habilitan el concepto.
2. **Especializaciones** de Habilidades ya Entrenadas.
3. **Técnicas** cuyos requisitos ya se cumplen.
4. **Canalización y Disciplinas** si el personaje usa magia.
5. **Hechizos** de las Disciplinas adquiridas.
6. Revisar el total y corregir cualquier compra cuyo requisito haya quedado incompleto.

Los costes de rango de Habilidad son acumulados, pero durante creación se paga simplemente el coste acumulado del rango final. Por ejemplo, dejar una Habilidad en Entrenado cuesta 3 PD en total; dejarla en Experto cuesta 7 PD en total. No se paga 1 + 3 + 7.

Durante creación:

- como máximo una Habilidad puede quedar en Experto;
- ninguna puede quedar en Maestro o Gran Maestro;
- una Especialización exige su Habilidad madre en Entrenado;
- hay como máximo 2 Especializaciones iniciales por Habilidad madre;
- una Disciplina cuesta 2 PD y exige Canalización Entrenada;
- pueden adquirirse como máximo 3 Disciplinas iniciales;
- cada Técnica y Hechizo debe cumplir sus propios requisitos.

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

**Reglas de uso de Habilidades.** Una prueba ordinaria utiliza un solo Atributo y una sola Habilidad principal. El Atributo se decide por el método empleado antes de tirar; los emparejamientos habituales son sugerencias, no vínculos fijos. El **rango base** es el comprado con PD y es el único que satisface requisitos de Aprendiz/Entrenado/Experto/Maestro/Gran Maestro. Equipo, Rasgos, magia, Técnicas y modificadores pueden cambiar el total de la prueba, pero no elevan el rango. Cambiar de Habilidad no permite repetir gratuitamente la misma resolución si no cambian de forma significativa el método, la información, las herramientas, el riesgo o las circunstancias.

A nivel 1 puede existir como máximo una Habilidad Experta y ninguna Maestro o Gran Maestro. Maestro requiere nivel 9+; Gran Maestro, nivel 15+. Una Habilidad Gran Maestro requiere al menos una Especialización coherente **cuando esa Habilidad disponga de Especializaciones en su catálogo**. Canalización y Ritualismo carecen deliberadamente de Especializaciones básicas y están exentas sólo de ese requisito concreto.

| Habilidad | Ámbito | Especializaciones básicas |
|---|---|---|
| Atletismo | Fuerza, resistencia, carrera, escalada y natación. | Escalada; Natación; Carrera y resistencia |
| Acrobacia | Equilibrio, coordinación, caídas y control corporal. | Equilibrio; Caídas y aterrizajes; Maniobras aéreas |
| Sigilo | Evitar detección mediante ocultación y movimiento discreto. | Movimiento silencioso; Infiltración urbana; Camuflaje natural |
| Supervivencia | Subsistencia, orientación y rastreo en entornos hostiles. | Bosque; Montaña; Desierto; Regiones frías |
| Naturaleza | Flora, fauna, ecosistemas y fenómenos naturales. | Botánica; Zoología; Ecosistemas mágicos |
| Investigación | Buscar, contrastar, ordenar y correlacionar evidencias. | Archivística; Investigación forense; Criptoanálisis y correlación |
| Persuasión | Negociación, diplomacia e influencia cooperativa. | Negociación; Diplomacia; Oratoria |
| Engaño | Mentira, suplantación, disfraz y falsedad deliberada. | Suplantación; Disfraz; Coartadas e identidades de cobertura |
| Intimidación | Amenaza, presión, coerción e interrogatorio. | Coacción física; Presión social; Interrogatorio |
| Empatía | Lectura emocional, conducta y dinámica interpersonal. | Lectura emocional; Conducta bajo presión; Dinámicas sociales |
| Historia | Acontecimientos, instituciones, guerras y contextos del pasado. | Historia antigua; Historia política; Historia militar |
| Religión | Teología, cultos, organizaciones, ritos y liturgia. | Teología comparada; Ritos y liturgia; Cultos y organizaciones religiosas |
| Medicina | Diagnóstico, estabilización, tratamiento y cirugía. | Cirugía; Traumatología; Toxicología |
| Arcana | Teoría mágica, Trama, anomalías, entidades y artefactos. | Teoría de la Trama; Anomalías y zonas de saturación; Entidades externas; Artefactos mágicos |
| Artesanía | Fabricación, reparación y técnicas de oficio. | Forja y metal; Carpintería; Cuero y textiles; Vidrio y cristal |
| Ingeniería | Diseño, sistemas, máquinas e infraestructura. | Vapor; Autómatas; Armamento; Acumuladores arcanos |
| Alquimia | Reactivos, formulación y manipulación de sustancias. | Medicinales; Potenciadores; Toxinas; Reactivos; Explosivos |
| Latrocinio | Cerraduras, seguridad física, trampas y sustracción. | Cerraduras y mecanismos; Trampas y seguridad física; Carterismo y sustracción discreta |
| Armas Ligeras | Armamento ligero de mano o arrojadizo. | Cuchillos y dagas; Espadas ligeras; Armas ligeras arrojadizas |
| Armas Marciales | Armamento cuerpo a cuerpo de guerra ordinario. | Espadas; Hachas; Mazas y martillos; Lanzas |
| Armas Pesadas | Armamento de gran masa, tamaño o alcance. | Grandes hojas; Grandes contundentes; Armas de asta pesadas |
| Armas a Distancia | Arcos, ballestas, armas de fuego y proyectiles. | Arcos; Ballestas; Armas de fuego cortas; Armas de fuego largas |
| Canalización | Control mágico directo y lanzamiento por método Directo. | — |
| Ritualismo | Preparación y ejecución del método Ritual. | — |
| Manejo | Monturas, vehículos terrestres y maquinaria móvil de control inmediato. | Monturas; Vehículos terrestres; Maquinaria móvil |
| Pilotaje | Transporte complejo dependiente de instrumental, trayectoria o infraestructura. | Dirigibles; Embarcaciones; Vehículos ferroviarios |

La **guía práctica de cada Habilidad**, con Atributos habituales, usos, oposición, límites y ejemplos de frontera entre competencias, se encuentra en el capítulo **4. Desarrollo y subida de nivel**, apartado **Cómo se usan las Habilidades**.


#### Especializaciones

Una Especialización cuesta **1 PD** y requiere la Habilidad madre en Entrenado. Durante la creación inicial hay un máximo de **2 Especializaciones por Habilidad madre**. Representa dominio profundo dentro de una Habilidad y no concede un bono numérico universal por sí sola. Sirve para justificar conocimiento especializado, procedimientos, prerrequisitos y Técnicas cuando corresponda.

Ejemplos: Espadas, Hachas, Lanzas; Cirugía, Traumatología, Toxicología; Vapor, Autómatas, Armamento; Bosque, Montaña, Desierto; Pociones, Venenos, Explosivos.

#### Técnicas

Costes normales: **Básica 2 PD, Avanzada 3 PD, Maestra 5 PD, Legendaria 8+ PD**. Cada Técnica establece sus propios requisitos. El catálogo vigente se encuentra en el capítulo de Técnicas.

#### Magia, Disciplinas y Hechizos

La magia es opcional. No existe una clase de mago obligatoria.

Las Fuentes son **Alma, Divina, Ambiental y Externa**. Las Disciplinas son **Evocación, Alteración, Restauración, Percepción, Influencia y Conjuración**.

Una Disciplina cuesta normalmente **2 PD**. Los Hechizos cuestan por grado **1 PD Menor, 2 PD Básico, 3 PD Avanzado, 5 PD Maestro y 8+ PD Legendario**. Aprender un hechizo y pagar su Maná al lanzarlo son economías distintas.

El Grimorio canónico contiene **60 hechizos** y se encuentra en el capítulo correspondiente. No se obtienen versiones gratuitas mediante nombres históricos o variantes narrativas.

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
- Familiar Mágico — 3 PR.
- Pacto Externo — 2–3 PR.
- Prótesis Mayor — 2+ PR.
- Afinidad Sobrenatural — 1 PR.
- Resistencia Ambiental — 1–2 PR.

Si el concepto del personaje exige una propiedad fisiológica extraordinaria para existir coherentemente en la ficción, esa propiedad debe quedar representada de forma explícita; el Director puede exigir el Rasgo apropiado. Una misma propiedad no se cobra dos veces.

### Paso 5 — Familiar, si corresponde

**Familiar Mágico cuesta 3 PR durante creación.** Si se adquiere posteriormente mediante progresión, su coste canónico es **6 PD**. El Familiar es una criatura independiente con voluntad, personalidad y naturaleza propias, no un segundo PJ gratuito.

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

**PEI utiliza el precio de catálogo del equipo inicial.** No puede gastarse como CM, VI, materias primas, alquiler de taller, Encargo o «fabricación previa a la campaña» para obtener a mitad de precio un objeto cuyo precio terminado exceda el presupuesto. Si una campaña concede explícitamente tiempo y recursos de fabricación antes de la primera sesión, éstos se registran fuera del PEI como una concesión de campaña.

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

### Ejemplo completo de creación de nivel 1

El ejemplo construye a **Iria**, una exploradora arcana. No es un arquetipo obligatorio: sólo demuestra el procedimiento.

#### 1. Concepto

Iria es una exploradora de ruinas capaz de defenderse con armas ligeras y utilizar Evocación básica. Su pueblo, cultura y origen explican quién es, pero no le conceden rangos o bonos gratuitos.

#### 2. Atributos

Todos comienzan en 1. Iria distribuye exactamente 6 aumentos:

| Atributo | Valor | Aumentos usados |
|---|---:|---:|
| FUE | 1 | 0 |
| AGI | 3 | 2 |
| VIG | 2 | 1 |
| INT | 2 | 1 |
| PER | 2 | 1 |
| VOL | 2 | 1 |
| PRE | 1 | 0 |
| **Total** | **13** | **6** |

Ningún Atributo supera el máximo inicial 3.

#### 3. Habilidades

Iria compra:

| Compra | Coste |
|---|---:|
| Canalización Entrenada | 3 PD |
| Armas Ligeras Entrenada | 3 PD |
| Supervivencia Entrenada | 3 PD |
| Sigilo Entrenada | 3 PD |
| Arcana Aprendiz | 1 PD |
| Investigación Aprendiz | 1 PD |
| **Subtotal** | **14 PD** |

No tiene ninguna Habilidad Experta, por lo que respeta el límite inicial.

#### 4. Especializaciones y Técnica

Compra:

| Compra | Coste |
|---|---:|
| Sigilo — Camuflaje natural | 1 PD |
| Supervivencia — Bosque | 1 PD |
| Parada | 2 PD |
| **Subtotal adicional** | **4 PD** |

Ambas Especializaciones son legales porque sus Habilidades madre están Entrenadas. Parada debe cumplir sus requisitos normales al utilizarse.

PD acumulados hasta aquí: **18**.

#### 5. Disciplina y Hechizos

Como Canalización está Entrenada, Iria puede comprar una Disciplina.

| Compra | Coste |
|---|---:|
| Evocación | 2 PD |
| Luz Arcana — Menor | 1 PD |
| Proyectil Ígneo — Básico | 2 PD |
| Barrera Cinética — Básico | 2 PD |
| **Subtotal mágico** | **7 PD** |

Total final: **18 + 7 = 25 PD**.

Los 25 PD están completamente utilizados y todas las compras mágicas pertenecen a una Disciplina que Iria posee.

#### 6. Rasgos

Iria dispone de 3 PR. Como ejemplo elige:

- Visión en la Oscuridad — 2 PR;
- Sentido Agudo — 1 PR.

Total: **3 PR**.

Los PR no reducen ni aumentan sus 25 PD.

#### 7. Equipo inicial

Iria elige Paquete de Preparación o Compra libre, nunca ambos. Si utiliza Compra libre, el valor total no puede superar **2.000 c**.

Al cerrar la preparación:

- cualquier PEI sobrante se descarta;
- recibe una sola vez **200 c de Reserva líquida**;
- esa Reserva sí es dinero de juego.

#### 8. Valores derivados

Antes de aplicar equipo o modificadores adicionales:

- Vida máxima = 10 + 2×VIG = **14**;
- Maná máximo = 6 + 3×VOL = **12**;
- Defensa Corporal = 11 + VIG = **13**;
- Defensa Mental = 11 + VOL = **13**;
- Iniciativa = **2d10 + 2** antes de otros modificadores;
- Movimiento de referencia = **6**;
- Defensa y Defensa de Maniobra se calculan con AGI, Bono Defensivo aplicable y el equipo correspondiente;
- umbral informativo de Daño Grave = 5 + VIG = **7**.

#### 9. Revisión final

Iria es legal porque:

- usó exactamente 6 aumentos de Atributo;
- ningún Atributo inicial supera 3;
- gastó exactamente 25 PD;
- no posee más de una Habilidad Experta;
- tiene como máximo 2 Especializaciones por Habilidad madre;
- posee Canalización Entrenada antes de adquirir Evocación;
- sólo adquirió una Disciplina;
- gastó exactamente 3 PR;
- su equipo respeta PEI;
- ninguna parte de su identidad narrativa añadió un bono mecánico gratuito.

## 4. Desarrollo y subida de nivel

Tierra Mágica no usa clases. Subir de nivel **no entrega un paquete fijo de clase ni un bono universal a las tiradas**. El personaje crece gastando PD en las capacidades que decide desarrollar.

### Cuántos PD concede cada nivel

El nivel 1 comienza con **25 PD totales**.

Cada nivel del 2 al 20 aumenta ese total en **4 PD**.

**PD totales = 25 + 4 × (nivel - 1).**

Los PD son acumulativos. Si no se gastan inmediatamente, permanecen disponibles dentro del total del personaje y pueden ahorrarse para una compra futura más costosa.

| Nivel | PD totales | Nivel | PD totales |
|---:|---:|---:|---:|
| 1 | 25 | 11 | 65 |
| 2 | 29 | 12 | 69 |
| 3 | 33 | 13 | 73 |
| 4 | 37 | 14 | 77 |
| 5 | 41 | 15 | 81 |
| 6 | 45 | 16 | 85 |
| 7 | 49 | 17 | 89 |
| 8 | 53 | 18 | 93 |
| 9 | 57 | 19 | 97 |
| 10 | 61 | 20 | 101 |

No existe un bono universal por nivel a ataque, Defensa, Vida, Maná, Iniciativa, Movimiento o pruebas.

### Qué ocurre al subir un nivel

Procedimiento:

1. **Aumenta el nivel en 1.**
2. **Aumenta el total de PD disponibles en 4.**
3. Calcula: **PD disponibles = PD totales del nivel - PD ya gastados**.
4. Decide si gastarlos ahora o conservarlos.
5. Antes de comprar, comprueba requisitos y puertas de nivel.
6. Realiza las compras elegidas.
7. Recalcula cualquier valor derivado afectado.
8. Revisa recursos actuales: aumentar un máximo no rellena automáticamente Vida o Maná.
9. Anota las capacidades nuevas y su procedencia.

Subir de nivel no concede automáticamente:

- PR;
- PEI;
- dinero;
- Atributos;
- rangos de Habilidad;
- Especializaciones;
- Técnicas;
- Disciplinas;
- Hechizos;
- Rasgos;
- equipo;
- Vida o Maná actuales.

Todo cambio mecánico debe proceder de una compra o regla explícita.

### Gastar PD en Habilidades

Los costes acumulados son:

| Rango | Bono | Coste acumulado |
|---|---:|---:|
| Sin Entrenar | +0 | 0 PD |
| Aprendiz | +1 | 1 PD |
| Entrenado | +2 | 3 PD |
| Experto | +4 | 7 PD |
| Maestro | +6 | 13 PD |
| Gran Maestro | +8 | 21 PD |

Al mejorar una Habilidad ya comprada se paga **la diferencia entre el coste acumulado nuevo y el coste acumulado anterior**.

Ejemplos:

- Sin Entrenar → Aprendiz: 1 PD;
- Aprendiz → Entrenado: 2 PD;
- Entrenado → Experto: 4 PD;
- Experto → Maestro: 6 PD;
- Maestro → Gran Maestro: 8 PD.

Puertas de nivel:

- nivel 1: como máximo una Habilidad Experta;
- niveles 2–8: Experto es el máximo permitido;
- niveles 9–14: puede alcanzarse Maestro;
- niveles 15–20: puede alcanzarse Gran Maestro.

Una Habilidad Gran Maestro requiere al menos una Especialización coherente cuando esa Habilidad disponga de Especializaciones en su catálogo. Canalización y Ritualismo carecen de Especializaciones básicas y están exentas sólo de ese requisito.

### Cómo se usan las Habilidades

Una Habilidad no es una lista cerrada de botones. Representa entrenamiento en un campo y se combina con el Atributo que describa **cómo** se intenta la acción.

La estructura normal es:

**2d10 + Atributo pertinente + Habilidad + modificadores >= DF**

o una prueba enfrentada cuando dos actores compiten directamente y no existe una Defensa pasiva apropiada.

#### Cuándo tirar

Se tira sólo cuando existen simultáneamente:

- una acción posible;
- incertidumbre real;
- una consecuencia relevante por éxito o fallo.

No se tira para tareas rutinarias que una persona suficientemente competente pueda completar con tiempo, herramientas y condiciones adecuadas.

Tampoco se tira para volver posible una acción que la ficción, la anatomía, el equipo o la falta absoluta de información hacen imposible.

#### Sin Entrenar

**Sin Entrenar** significa rango 0 y bono +0, no incapacidad universal.

Una criatura Sin Entrenar puede intentar usos ordinarios de una Habilidad cuando cualquier persona razonablemente podría intentarlos. Sin embargo, una tarea puede exigir Entrenado o un rango superior cuando:

- una regla lo especifica;
- utiliza conocimiento profesional especializado;
- exige una licencia, procedimiento, lenguaje técnico o método que el personaje no conoce;
- el intento sería físicamente posible pero no inteligible sin formación previa.

No se reemplaza una carencia de formación con una tirada extremadamente alta. Una tirada no concede conocimiento que el personaje no posee.

#### Elegir Atributo

Cada Habilidad tiene un Atributo **sugerido**, que cubre su uso más habitual. No es obligatorio en todos los casos.

Ejemplos:

- FUE + Atletismo para forzar una compuerta;
- VIG + Atletismo para sostener una marcha agotadora;
- PER + Supervivencia para seguir huellas;
- INT + Supervivencia para planificar una ruta con mapas;
- PER + Medicina para detectar síntomas;
- INT + Medicina para diagnosticar su causa;
- PRE + Intimidación para amenazar verbalmente;
- FUE + Intimidación para una demostración física inmediata y creíble.

El método se declara antes de tirar. No se cambia de Atributo después de ver un mal resultado.

#### Grados de resultado

Cuando importe la calidad del éxito:

- **Ajustado, margen 0–4:** consigue el objetivo principal;
- **Claro, margen 5–9:** consigue el objetivo con una ventaja de calidad, tiempo, precisión o información que ya estaba disponible en la situación;
- **Dominante, margen 10+:** obtiene el mejor resultado razonable que esa acción podía producir.

Estos grados no crean capacidades nuevas, información inexistente, daño gratuito ni efectos que pertenecen a otra regla.

#### Herramientas y tiempo

Una Habilidad no sustituye herramientas, materiales, acceso o tiempo.

Una cerradura puede requerir ganzúas; una cirugía necesita instrumental; fabricar una pieza requiere material; analizar un archivo exige acceso al archivo. La ausencia de algo esencial puede hacer la acción imposible en vez de imponer simplemente una DF mayor.

#### Especializaciones

Una Especialización representa dominio focalizado dentro de una Habilidad.

Por sí sola **no concede un bono numérico universal**. Puede:

- satisfacer un requisito que mencione esa Especialización;
- establecer que el personaje posee experiencia concreta;
- permitir tratar como rutinaria una tarea que sería incierta para alguien sin ese foco, cuando la ficción lo justifique;
- recibir un modificador sólo cuando otra regla, objeto o efecto lo conceda expresamente.

No se suma automáticamente +1, Ventaja ni un segundo bono por poseerla.

#### Habilidades sociales y agencia

Persuasión, Engaño e Intimidación no son control mental.

Una prueba social puede modificar disposición, obtener cooperación plausible, sostener una mentira o crear presión, pero no obliga automáticamente a:

- suicidarse;
- traicionar convicciones fundamentales;
- olvidar información;
- entregar algo que el objetivo jamás entregaría sin una razón suficiente;
- aceptar una afirmación físicamente imposible frente a evidencia directa;
- perder Acciones repetidamente.

La posición inicial, los intereses, la evidencia y las consecuencias creíbles importan antes de tirar.

#### Habilidades de conocimiento

Historia, Religión, Naturaleza, Medicina, Arcana, Ingeniería y otras Habilidades de conocimiento sólo revelan información que:

- existe;
- puede inferirse de las pruebas disponibles;
- pertenece razonablemente al campo del personaje.

Un Dominante no vuelve omnisciente al personaje.

### Guía práctica de las 26 Habilidades

#### Atletismo

**Atributo sugerido:** FUE.

Atletismo representa fuerza aplicada, resistencia física y desplazamiento exigente.

Usos frecuentes:

- escalar;
- nadar;
- correr bajo presión;
- saltar cuando distancia o riesgo importan;
- empujar, agarrar o forcejear;
- levantar, arrastrar o sostener cargas dentro de límites físicamente posibles;
- resistir esfuerzo prolongado.

Atributos alternativos habituales:

- **VIG + Atletismo** para resistencia prolongada;
- **AGI + Atletismo** sólo cuando el método dependa más de impulso y coordinación que de fuerza.

Oposición:

- Derribar, Empujar y Agarrar pueden usar Atletismo contra Defensa de Maniobra;
- una competencia física directa puede ser una prueba enfrentada;
- escalar, nadar o saltar usan una DF definida por superficie, distancia, corriente y riesgo.

Atletismo no:

- aumenta Movimiento automáticamente;
- ignora Escala;
- sustituye Acrobacia para equilibrio o aterrizajes;
- convierte una carga físicamente imposible en posible.

**Especializaciones:** Escalada; Natación; Carrera y resistencia.

#### Acrobacia

**Atributo sugerido:** AGI.

Acrobacia representa equilibrio, coordinación, aterrizajes y control corporal preciso.

Usos frecuentes:

- mantener equilibrio;
- atravesar superficies estrechas o inestables;
- aterrizar de forma controlada;
- ejecutar una zancadilla o maniobra corporal cuando AGI sea el método apropiado;
- maniobrar en vuelo cuando una fuente válida ya permite volar;
- pasar por una abertura o postura difícil cuando la anatomía lo permite.

Las caídas usan la regla específica de **Caída controlada** del capítulo de Vida y daño.

Acrobacia no concede:

- una esquiva universal;
- Defensa adicional por tirar cada vez que alguien ataca;
- vuelo;
- Movimiento adicional;
- la capacidad de atravesar físicamente un espacio imposible.

**Especializaciones:** Equilibrio; Caídas y aterrizajes; Maniobras aéreas.

#### Sigilo

**Atributo sugerido:** AGI.

Sigilo representa ocultación, movimiento discreto y evitar ser detectado.

Usos frecuentes:

- moverse sin hacer ruido;
- esconderse cuando existe cobertura u ocultación plausible;
- cruzar una zona vigilada;
- preparar camuflaje personal;
- reducir rastros evidentes cuando el método lo permita.

Cuando otra criatura busca activamente al personaje, la oposición utiliza la competencia apropiada del observador: por ejemplo PER + Investigación para una búsqueda sistemática o PER + Supervivencia para seguir huellas.

La DF aumenta o disminuye según luz, ruido, cobertura, distancia, superficie y atención de los observadores.

Sigilo no permite desaparecer a plena vista sin una explicación física o mágica.

**Especializaciones:** Movimiento silencioso; Infiltración urbana; Camuflaje natural.

#### Supervivencia

**Atributo sugerido:** PER.

Supervivencia representa desenvolverse en entornos hostiles, orientarse y seguir señales naturales.

Usos frecuentes:

- seguir huellas;
- orientarse;
- encontrar refugio;
- localizar agua o recursos ordinarios del entorno;
- anticipar riesgos meteorológicos observables;
- elegir una ruta segura;
- organizar una marcha o campamento.

Atributos alternativos:

- **INT + Supervivencia** para planificación de ruta, mapas o logística;
- **VIG + Supervivencia** cuando la tarea principal sea soportar exposición prolongada aplicando técnicas conocidas.

Rastrear no produce coordenadas perfectas. La calidad y antigüedad de las huellas, terreno, clima y contramedidas determinan la DF.

Supervivencia no sustituye Naturaleza para identificar científicamente una especie ni Medicina para tratar una lesión.

**Especializaciones:** Bosque; Montaña; Desierto; Regiones frías.

#### Naturaleza

**Atributo sugerido:** INT.

Naturaleza cubre flora, fauna, ecosistemas y fenómenos naturales, incluidos los ecosistemas afectados por magia.

Usos frecuentes:

- identificar plantas o animales;
- reconocer hábitos y señales biológicas;
- estimar riesgos naturales;
- interpretar relaciones ecológicas;
- identificar una sustancia natural conocida;
- recordar conocimiento sobre una criatura natural.

**PER + Naturaleza** puede utilizarse cuando el desafío principal sea reconocer una característica observable en el terreno.

Naturaleza no:

- concede automáticamente rastreo;
- sustituye Supervivencia para viajar;
- sustituye Alquimia para formular reactivos;
- revela propiedades mágicas que requieran Arcana.

**Especializaciones:** Botánica; Zoología; Ecosistemas mágicos.

#### Investigación

**Atributo sugerido:** INT.

Investigación representa buscar, ordenar, contrastar y correlacionar evidencias.

Usos frecuentes:

- registrar una habitación de forma sistemática;
- reconstruir una secuencia a partir de indicios;
- comparar testimonios y documentos;
- trabajar con archivos;
- detectar patrones;
- relacionar pruebas;
- analizar códigos, cifras o información fragmentaria.

**PER + Investigación** es apropiado cuando el desafío principal es localizar físicamente un indicio.  
**INT + Investigación** se usa cuando el desafío es comprender cómo se relacionan las pruebas.

Investigar no crea pistas que no existen. Un fallo no borra evidencia; puede significar que no se identifica su importancia, que hace falta más tiempo o que el personaje llega a una conclusión insuficiente según la situación.

**Especializaciones:** Archivística; Investigación forense; Criptoanálisis y correlación.

#### Persuasión

**Atributo sugerido:** PRE.

Persuasión representa negociación, diplomacia e influencia cooperativa.

Usos frecuentes:

- negociar un precio o condición;
- conseguir una audiencia;
- pedir cooperación razonable;
- mediar;
- argumentar una posición;
- pronunciar un discurso;
- mejorar la disposición de alguien cuando existen razones para escuchar.

Una interacción rutinaria con una persona receptiva puede no necesitar tirada.

Cuando hay resistencia, la DF depende de intereses, riesgo, autoridad, relación previa, evidencia y coste de aceptar la propuesta. Una negociación competitiva puede resolverse como prueba enfrentada si ambas partes intentan imponer activamente términos distintos.

Persuasión no convierte una petición imposible en razonable ni elimina la agencia del objetivo.

**Especializaciones:** Negociación; Diplomacia; Oratoria.

#### Engaño

**Atributo sugerido:** PRE.

Engaño cubre mentira deliberada, suplantación, disfraz y construcción de una falsedad creíble.

Usos frecuentes:

- mentir;
- ocultar una intención;
- sostener una identidad falsa;
- improvisar una coartada;
- representar un papel;
- presentar información falsa de forma plausible.

La oposición depende de cómo se compruebe el engaño:

- **PER + Empatía** para leer comportamiento y emoción;
- **INT + Investigación** para contrastar hechos;
- una Habilidad de conocimiento pertinente para verificar el contenido técnico.

Una mentira bien dicha no cambia registros, pruebas físicas ni recuerdos de testigos.

**Especializaciones:** Suplantación; Disfraz; Coartadas e identidades de cobertura.

#### Intimidación

**Atributo sugerido:** PRE.

Intimidación representa amenaza, presión, coerción e interrogatorio.

Usos frecuentes:

- hacer creíble una amenaza;
- quebrar resistencia en una negociación hostil;
- presionar durante un interrogatorio;
- imponer presencia;
- utilizar una demostración de fuerza como advertencia.

**FUE + Intimidación** puede utilizarse cuando la amenaza depende principalmente de una demostración física inmediata.

En combate se aplica la regla específica de **Intimidar o Amenazar**: normalmente PRE + Intimidación contra Defensa Mental.

Fuera de combate, el éxito produce una reacción coherente con lo que el objetivo realmente teme y con las opciones disponibles. No fuerza rendición, confesión verdadera o traición automática.

**Especializaciones:** Coacción física; Presión social; Interrogatorio.

#### Empatía

**Atributo sugerido:** PER.

Empatía representa lectura emocional, conducta y dinámica interpersonal.

Usos frecuentes:

- identificar una emoción dominante observable;
- notar tensión, miedo, hostilidad o incomodidad;
- valorar la dinámica de un grupo;
- detectar que una conducta no coincide con el contexto;
- interpretar reacciones durante una conversación.

Puede oponerse a Engaño cuando el método sea leer a la persona, no comprobar los hechos.

Empatía **no es un detector de mentiras**. Puede indicar que algo resulta extraño, que una persona parece contener información o que una emoción no encaja; no revela automáticamente cuál es la verdad ni lee pensamientos.

**Especializaciones:** Lectura emocional; Conducta bajo presión; Dinámicas sociales.

#### Historia

**Atributo sugerido:** INT.

Historia representa conocimiento sobre acontecimientos, instituciones, guerras y contextos del pasado.

Usos frecuentes:

- recordar fechas o procesos históricos relevantes;
- reconocer un emblema antiguo;
- contextualizar una ruina;
- identificar una institución desaparecida;
- conocer campañas, tratados o conflictos históricos;
- relacionar un objeto con una época.

Historia no revela automáticamente secretos actuales ni sustituye Investigación para descubrir qué ocurrió en una escena concreta.

**Especializaciones:** Historia antigua; Historia política; Historia militar.

#### Religión

**Atributo sugerido:** INT.

Religión cubre teología, cultos, organizaciones, ritos y liturgia.

Usos frecuentes:

- reconocer símbolos religiosos;
- identificar ritos conocidos;
- recordar doctrina;
- conocer estructuras de una iglesia o culto;
- interpretar prácticas litúrgicas;
- distinguir tradiciones religiosas.

Religión puede determinar que un personaje conoce cómo debe realizarse un rito, pero no concede por sí sola:

- autoridad religiosa;
- favor divino;
- Maná;
- magia;
- una Fuente Divina;
- capacidad de completar un Ritual mágico para el que falten otros requisitos.

**Especializaciones:** Teología comparada; Ritos y liturgia; Cultos y organizaciones religiosas.

#### Medicina

**Atributo sugerido:** INT.

Medicina cubre diagnóstico, estabilización, tratamiento y cirugía.

Usos frecuentes:

- diagnosticar una lesión;
- identificar síntomas;
- detener Sangrado ordinario mediante Primeros Auxilios;
- estabilizar;
- planificar tratamiento;
- realizar cirugía con tiempo, instrumental y condiciones apropiadas;
- reconocer toxinas o patologías dentro de su campo.

Atributos alternativos:

- **PER + Medicina** para detectar signos clínicos;
- **AGI + Medicina** cuando la dificultad principal sea una intervención manual de precisión y el conocimiento médico ya esté establecido.

**Primeros Auxilios bajo presión consume una Acción.**

Con tiempo, competencia y equipo adecuados, una tarea médica rutinaria no requiere tirada.

Medicina no:

- devuelve Vida automáticamente;
- reduce Trauma por sí sola;
- regenera miembros;
- sustituye hechizos de Restauración;
- permite cirugía compleja sin instrumental o condiciones mínimas.

Algunos hechizos exigen expresamente Medicina Entrenada o Experta.

**Especializaciones:** Cirugía; Traumatología; Toxicología.

#### Arcana

**Atributo sugerido:** INT.

Arcana representa teoría mágica, la Trama, anomalías, entidades y artefactos.

Usos frecuentes:

- reconocer un fenómeno mágico;
- identificar principios de un ritual o artefacto;
- analizar una anomalía;
- recordar teoría sobre entidades externas;
- interpretar residuos o patrones arcanos;
- examinar una ilusión cuando la naturaleza mágica del fenómeno justifique sustituir Investigación.

**PER + Arcana** puede utilizarse cuando el desafío sea distinguir una manifestación mágica observable y el personaje ya posee la competencia necesaria para interpretarla.

Arcana no concede:

- Canalización;
- Ritualismo;
- una Disciplina;
- Hechizos;
- Maná;
- identificación perfecta de un efecto desconocido sin evidencia.

**Especializaciones:** Teoría de la Trama; Anomalías y zonas de saturación; Entidades externas; Artefactos mágicos.

#### Artesanía

**Atributo sugerido:** AGI.

Artesanía representa manufactura, reparación y técnicas de oficio.

Usos frecuentes:

- fabricar un objeto ordinario dentro del oficio conocido;
- reparar una pieza;
- evaluar calidad de manufactura;
- ajustar una herramienta;
- trabajar metal, madera, cuero, textil, vidrio o cristal.

Atributos alternativos:

- **INT + Artesanía** para planificar un proceso, interpretar un diseño o diagnosticar un defecto;
- **FUE + Artesanía** cuando una fase concreta dependa principalmente de fuerza aplicada y la técnica ya sea conocida.

Fabricar exige materiales, herramientas y tiempo. Una tirada no crea materia ni reemplaza el coste físico de producción.

Artesanía no sustituye Ingeniería cuando el problema principal es diseñar un sistema complejo.

**Especializaciones:** Forja y metal; Carpintería; Cuero y textiles; Vidrio y cristal.

#### Ingeniería

**Atributo sugerido:** INT.

Ingeniería cubre diseño, análisis de sistemas, máquinas e infraestructura.

Usos frecuentes:

- comprender una máquina;
- diagnosticar una avería sistémica;
- diseñar un mecanismo;
- calcular cargas o funcionamiento;
- trabajar con vapor, autómatas, armamento o acumuladores;
- planificar modificaciones de infraestructura.

**PER + Ingeniería** puede servir para inspección técnica cuando el problema sea detectar un defecto visible.

Ingeniería permite saber **qué** debe hacerse; fabricar o reparar físicamente puede requerir además Artesanía, herramientas, piezas, tiempo y el procedimiento de Proyecto correspondiente.

No concede automáticamente dispositivos, Energía, componentes ni planos desconocidos.

**Especializaciones:** Vapor; Autómatas; Armamento; Acumuladores arcanos.

#### Alquimia

**Atributo sugerido:** INT.

Alquimia representa reactivos, formulación y manipulación de sustancias.

Usos frecuentes:

- reconocer un reactivo;
- analizar una mezcla;
- seguir o adaptar una Fórmula conocida cuando el sistema lo permite;
- preparar sustancias;
- identificar riesgos de combinación;
- trabajar con medicinales, potenciadores, toxinas, reactivos o explosivos.

**PER + Alquimia** puede usarse para examinar signos físicos de una sustancia cuando existe conocimiento suficiente para interpretarlos.

Conocer Alquimia o conocer una Fórmula **no significa poseer una dosis preparada**. Preparar una Fórmula sigue exigiendo sus materiales, tiempo, procedimiento y demás requisitos.

Alquimia no sustituye Medicina para diagnosticar un paciente ni Ingeniería para diseñar un dispositivo.

**Especializaciones:** Medicinales; Potenciadores; Toxinas; Reactivos; Explosivos.

#### Latrocinio

**Atributo sugerido:** AGI.

Latrocinio cubre cerraduras, seguridad física, trampas y sustracción discreta.

Usos frecuentes:

- abrir una cerradura con herramientas;
- manipular un mecanismo de seguridad;
- desactivar una trampa conocida;
- hurtar un objeto;
- ocultar una manipulación física;
- reconocer cómo operar un mecanismo ilícito conocido.

Atributos alternativos:

- **PER + Latrocinio** para inspeccionar una cerradura o trampa ya localizada;
- **INT + Latrocinio** para comprender un mecanismo complejo conocido.

Encontrar una trampa oculta suele usar Investigación; desactivarla suele usar Latrocinio. **CRAFT-06 — Trampas y construcciones** fija las DF de Ocultación, Detección y Mecanismo para trampas fabricadas.

La ausencia de herramientas esenciales puede volver imposible una apertura o desactivación.

**Especializaciones:** Cerraduras y mecanismos; Trampas y seguridad física; Carterismo y sustracción discreta.

#### Armas Ligeras

**Atributo sugerido:** AGI.

Armas Ligeras cubre cuchillos, dagas, espadas ligeras y armas ligeras arrojadizas.

Usos frecuentes:

- atacar con un arma de esa categoría;
- realizar maniobras con el arma cuando la maniobra las admita;
- cumplir requisitos de Técnicas compatibles;
- usar Parada cuando se cumplan todos sus requisitos.

Un ataque usa normalmente:

**2d10 + Atributo pertinente + Armas Ligeras + modificadores contra Defensa.**

El arma define su Atributo de ataque cuando corresponde. Poseer rango alto no concede ataques adicionales ni permite ignorar las propiedades del arma.

**Especializaciones:** Cuchillos y dagas; Espadas ligeras; Armas ligeras arrojadizas.

#### Armas Marciales

**Atributo sugerido:** FUE.

Armas Marciales cubre armamento cuerpo a cuerpo de guerra ordinario: espadas, hachas, mazas, martillos y lanzas dentro de esta categoría.

Usos frecuentes:

- ataques;
- maniobras armadas;
- Técnicas compatibles;
- Parada con un arma apropiada.

El ataque se resuelve contra Defensa y el daño sigue la entrada concreta del arma.

Armas Marciales no permite utilizar competentemente un arma clasificada como Pesada sólo porque sea cuerpo a cuerpo.

**Especializaciones:** Espadas; Hachas; Mazas y martillos; Lanzas.

#### Armas Pesadas

**Atributo sugerido:** FUE.

Armas Pesadas cubre grandes hojas, grandes contundentes y armas de asta pesadas.

Usos frecuentes:

- ataques con armamento pesado;
- maniobras que utilicen su masa o alcance;
- Técnicas compatibles.

La FUE mínima, propiedad Pesada, Alcance y demás propiedades del arma siguen aplicándose. El rango de Habilidad no elimina requisitos físicos del equipo.

**Especializaciones:** Grandes hojas; Grandes contundentes; Armas de asta pesadas.

#### Armas a Distancia

**Atributo sugerido:** PER.

Armas a Distancia cubre arcos, ballestas, armas de fuego y proyectiles.

Usos frecuentes:

- disparar;
- realizar ataques preparados;
- usar Técnicas de tiro;
- operar correctamente el arma durante una resolución de ataque.

El arma determina alcance, Recarga, Penetración y demás propiedades.

Estar adyacente a un enemigo no impone por sí solo una penalización universal a todo ataque a distancia; el arma, la línea disponible, la situación física y cualquier regla específica determinan si el disparo es viable o sufre modificadores.

Armas a Distancia no elimina Recarga ni genera munición.

**Especializaciones:** Arcos; Ballestas; Armas de fuego cortas; Armas de fuego largas.

#### Canalización

**Atributo sugerido:** INT, pero el hechizo puede indicar otro.

Canalización representa control mágico directo.

Se usa para:

- lanzar hechizos de Método Directo cuando existe una tirada;
- cumplir competencia operativa por Grado;
- resolver Sobrecarga;
- determinar la DF de Ilusiones persistentes;
- satisfacer requisitos mágicos que indiquen Canalización.

El Atributo del lanzamiento depende del hechizo: INT, PER, PRE u otro cuando la entrada lo establezca.

Canalización por sí sola no concede:

- Disciplinas;
- Hechizos;
- Maná adicional;
- una Fuente;
- efectos mágicos no escritos.

No posee Especializaciones básicas.

#### Ritualismo

**Atributo sugerido:** INT.

Ritualismo representa preparación y ejecución del Método Ritual.

Se usa para:

- dirigir Rituales;
- lanzar hechizos de Método Ritual cuando exista una prueba;
- cumplir competencia operativa ritual por Grado;
- coordinar procedimientos, participantes y condiciones rituales.

Un Ritual puede usar otro Atributo si su naturaleza lo exige, pero la Habilidad operativa sigue siendo Ritualismo.

Ritualismo no convierte un Ritual en una Acción de combate ni elimina su Tiempo, componentes, participantes o requisitos.

No posee Especializaciones básicas.

#### Manejo

**Atributo sugerido:** AGI.

Manejo cubre control inmediato de monturas, vehículos terrestres y maquinaria móvil.

Usos frecuentes:

- controlar una montura bajo presión;
- conducir un carro o vehículo terrestre;
- mantener control durante una maniobra brusca;
- operar maquinaria móvil conocida;
- evitar perder el control ante un obstáculo.

Atributos alternativos:

- **PER + Manejo** cuando el problema principal sea anticipar obstáculos o interpretar la respuesta de una montura;
- **PRE + Manejo** sólo cuando el control dependa principalmente de relación, voz y autoridad sobre una criatura entrenada.

Conducir en condiciones normales puede no requerir tirada.

Manejo no sustituye Pilotaje para navegación instrumental compleja ni Ingeniería para reparar el vehículo.

**Especializaciones:** Monturas; Vehículos terrestres; Maquinaria móvil.

#### Pilotaje

**Atributo sugerido:** AGI.

Pilotaje cubre transporte complejo dependiente de trayectoria, instrumental o infraestructura.

Usos frecuentes:

- pilotar dirigibles;
- gobernar embarcaciones;
- operar vehículos ferroviarios;
- mantener rumbo durante una emergencia;
- ejecutar una maniobra compleja usando controles e instrumentos.

Atributos alternativos:

- **PER + Pilotaje** para navegación basada en observación inmediata;
- **INT + Pilotaje** para interpretar instrumental, calcular ruta o ejecutar un procedimiento técnico de navegación.

Operación rutinaria en condiciones seguras puede no requerir tirada.

Pilotaje no sustituye Ingeniería para reparar el sistema ni Manejo para una montura o vehículo terrestre simple.

**Especializaciones:** Dirigibles; Embarcaciones; Vehículos ferroviarios.

### Elegir entre Habilidades parecidas

Cuando dos Habilidades parecen posibles, se elige la que corresponda al **objetivo inmediato** de la acción.

| Situación | Habilidad habitual |
|---|---|
| Seguir huellas en el terreno | Supervivencia |
| Buscar sistemáticamente una habitación | Investigación |
| Identificar la especie que dejó una huella | Naturaleza |
| Detectar nerviosismo en un sospechoso | Empatía |
| Contrastar la coartada con documentos | Investigación |
| Convencer mediante razones | Persuasión |
| Hacer creíble una mentira | Engaño |
| Presionar mediante una amenaza | Intimidación |
| Encontrar una trampa oculta | Investigación |
| Desactivar la trampa encontrada | Latrocinio |
| Diagnosticar una máquina | Ingeniería |
| Reparar físicamente una pieza ordinaria | Artesanía |
| Reconocer una sustancia alquímica | Alquimia |
| Diagnosticar el efecto de esa sustancia en un paciente | Medicina |
| Comprender un fenómeno mágico | Arcana |
| Producir un hechizo Directo | Canalización |
| Ejecutar un Ritual mágico | Ritualismo |
| Conducir un carro | Manejo |
| Pilotar un dirigible | Pilotaje |

Si cambiar de Habilidad no cambia de verdad el método, la información, las herramientas o el riesgo, no permite repetir gratuitamente una prueba fallida.

### Gastar PD en Especializaciones

Una Especialización cuesta **1 PD** y requiere la Habilidad madre en Entrenado.

El máximo de 2 Especializaciones por Habilidad madre es un límite de **creación inicial**. Después de comenzar la progresión no se aplica ese máximo inicial, pero:

- no puede adquirirse dos veces la misma Especialización;
- sigue exigiéndose la Habilidad madre Entrenada;
- deben cumplirse requisitos particulares si los hubiera.

Una Especialización no concede por sí misma un bono numérico universal.

### Gastar PD en Técnicas

Costes normales:

- Básica: 2 PD;
- Avanzada: 3 PD;
- Maestra: 5 PD;
- Legendaria: 8+ PD.

El coste no reemplaza los requisitos. Si una Técnica exige otra Técnica, un rango de Habilidad, Familiar Mágico, Vínculo u otra condición, debe cumplirse al adquirirla y utilizarla según corresponda.

### Gastar PD en Magia

Una Disciplina cuesta **2 PD** y exige **Canalización Entrenada**.

El máximo de 3 Disciplinas es sólo de creación inicial. Mediante progresión pueden adquirirse Disciplinas adicionales si se cumplen sus requisitos y se paga su coste.

Aprender Hechizos cuesta:

- Menor: 1 PD;
- Básico: 2 PD;
- Avanzado: 3 PD;
- Maestro: 5 PD;
- Legendario: 8+ PD.

Aprender un hechizo no paga su Maná de lanzamiento.

Además, poder lanzar un hechizo sigue sujeto a competencia operativa:

- Truco, Menor y Básico: Entrenado;
- Avanzado: Experto;
- Maestro: Maestro;
- Legendario: Gran Maestro;

usando Canalización para Método Directo y Ritualismo para Método Ritual.

Por tanto, comprar un hechizo de grado alto no permite ignorar el rango operativo que exige.

### Gastar PD en Atributos después de creación

Los 6 aumentos gratuitos sólo existen durante creación. Después, mejorar Atributos cuesta PD por cada paso:

| Mejora | Coste del paso |
|---|---:|
| 0 → 1 | 4 PD |
| 1 → 2 | 6 PD |
| 2 → 3 | 9 PD |
| 3 → 4 | 13 PD |
| 4 → 5 | 18 PD |

Para un personaje ordinario creado con Atributos mínimos 1, los pasos relevantes suelen comenzar en 1→2.

El coste se paga por cada aumento realizado. Por ejemplo:

- subir AGI 3→4 cuesta 13 PD;
- subir AGI 3→5 exige primero 3→4 y después 4→5: **13 + 18 = 31 PD**.

Los valores 6+ son sobrenaturales y no pertenecen a la progresión ordinaria.

### Rasgos después de creación

Los **3 PR no se renuevan al subir de nivel** y no existe una conversión universal de PR a PD.

Un Rasgo adquirido después de creación necesita un coste o regla de progresión explícita. No se puede asumir que “1 PR = cierta cantidad de PD”.

La excepción canónica ya cuantificada es:

**Familiar Mágico: 3 PR en creación o 6 PD mediante progresión posterior.**

Otros Rasgos sólo se compran con PD si su propia entrada o una regla posterior establece expresamente un coste de progresión.

### Equipo y dinero al subir de nivel

El **PEI 20 o** pertenece únicamente a la creación inicial. No se renueva con los niveles.

Después de comenzar el juego, armas, armaduras, herramientas, dispositivos, componentes y otros objetos físicos se adquieren mediante:

- dinero;
- fabricación;
- recompensa;
- acceso narrativo;
- otra fuente explícita del mundo.

Gastar PD en una capacidad no crea automáticamente el objeto físico asociado. Conocer una Fórmula, por ejemplo, no crea dosis preparadas.

### Recalcular la ficha después de una mejora

Tras cualquier compra que modifique Atributos, equipo o efectos persistentes, se recalculan los derivados afectados.

Ejemplos:

- VIG mayor puede aumentar Vida máxima, Defensa Corporal y umbral de Daño Grave;
- VOL mayor puede aumentar Maná máximo y Defensa Mental;
- AGI mayor puede aumentar Defensa y Defensa de Maniobra;
- PER mayor modifica la Iniciativa;
- un rango marcial puede modificar el Bono Defensivo aplicable;
- un Rasgo o equipo puede modificar Vida, Protección, Movimiento u otro derivado si lo indica expresamente.

**Aumentar un máximo no recupera el recurso actual.** Si Vida máxima pasa de 14 a 16, la Vida actual no aumenta sólo por haber subido el máximo. Lo mismo ocurre con Maná. La recuperación se obtiene mediante las reglas normales de curación, descanso u otras fuentes válidas.

Si un máximo disminuye, el valor actual no puede permanecer por encima del nuevo máximo y se reconcilia hacia abajo.

### Lista de comprobación de subida de nivel

Antes de cerrar la progresión:

- el nivel está entre 1 y 20;
- el total de PD corresponde a la fórmula del nivel;
- los PD gastados no superan ese total;
- cada mejora de Habilidad pagó sólo la diferencia correcta;
- ningún rango supera la puerta de nivel;
- Gran Maestro cumple Especialización cuando corresponde;
- Especializaciones poseen Habilidad madre Entrenada;
- Técnicas cumplen requisitos;
- Disciplinas cuestan 2 PD y exigen Canalización Entrenada;
- Hechizos cumplen Disciplina, coste y competencia operativa;
- Atributos pagaron todos los pasos post-creación;
- no se generaron PR, PEI, dinero o equipo gratuitos;
- máximos y Defensas fueron recalculados;
- Vida/Maná actuales no aumentaron sólo por aumentar su máximo.

### Ejemplo de subida de nivel: nivel 1 → nivel 2

Iria terminó nivel 1 con **25 PD gastados de 25**.

Al alcanzar nivel 2:

1. su total de desarrollo pasa a **29 PD**;
2. tiene **4 PD disponibles**;
3. decide mejorar Investigación de Aprendiz a Entrenado;
4. Investigación costaba 1 PD acumulado y Entrenado cuesta 3, por lo que paga **2 PD**;
5. conserva 2 PD;
6. aprende **Onda de Choque**, un hechizo Básico de Evocación, por **2 PD**;
7. ya posee Evocación y Canalización Entrenada, por lo que cumple el marco operativo del hechizo;
8. termina con **29 PD gastados de 29**.

No recibe automáticamente Vida, Maná, PR, dinero ni equipo por haber alcanzado nivel 2.

### Ejemplo de ahorro para un Atributo

Supón que, después de otras compras, Iria decide ahorrar para elevar AGI de 3 a 4.

Ese paso cuesta **13 PD**.

Puede conservar PD no gastados durante varios niveles. El sistema no obliga a consumir los 4 PD recibidos en el mismo nivel.

Cuando finalmente tenga al menos 13 PD disponibles:

1. paga 13 PD;
2. AGI pasa de 3 a 4;
3. recalcula Defensa y Defensa de Maniobra;
4. no recibe Vida o Maná porque AGI no modifica esos máximos;
5. conserva cualquier PD restante.

### Ejemplo de puerta de rango

Una Habilidad Experta cuesta 7 PD acumulados.

Aunque un personaje tenga PD suficientes para pagar Maestro antes, **no puede alcanzar Maestro hasta nivel 9**. En nivel 9, pasar de Experto a Maestro cuesta 6 PD adicionales.

Del mismo modo, Gran Maestro sólo puede alcanzarse desde nivel 15 y cuesta 8 PD adicionales desde Maestro, además de exigir una Especialización cuando la Habilidad tenga catálogo de Especializaciones.

## 5. Rasgos y Puntos de Rasgo

Los Rasgos representan propiedades persistentes del personaje que no encajan como entrenamiento ordinario. En creación se dispone de **3 PR**, separados de los PD. Los PR y los PD no se convierten entre sí. Un Rasgo puede ser Innato, Adquirido, de Vínculo o Condicional. Como referencia, un Rasgo Menor cuesta 1 PR, Significativo 2, Mayor 3 y Excepcional 4+. Los rasgos negativos no generan PR adicionales.

Catálogo de referencia: Sentido Agudo 1 PR; Visión en la Oscuridad 2; Anfibio 1; Trepador Natural 1; Cola Prensil 1; Miembros Extra 2, sin conceder acciones adicionales; Vuelo Natural 4 y de carácter excepcional; Corpulento 2, +4 Vida; Masivo 3, +8 Vida y no acumulable con Corpulento; Vínculo Divino 2, que concede acceso y no poder automático; Familiar Mágico 3; Pacto Externo 2–3; Prótesis Mayor 2+; Afinidad Sobrenatural 1; Resistencia Ambiental 1–2.

## 6. Turno, movimiento y posición

En su turno una criatura dispone normalmente de **Movimiento + Acción + Reacción**. El Movimiento puede dividirse antes y después de la Acción cuando la situación lo permite. La Reacción se recupera al inicio del turno propio; una Reacción no utilizada se pierde al ser reemplazada por la nueva. Una capacidad que conceda varias Reacciones especifica cuántas pueden utilizarse entre dos turnos propios. La misma Reacción no se repite sobre el mismo disparador salvo regla expresa.

Un humanoide Mediano tiene como referencia Movimiento 6, aproximadamente 9 metros por turno. AGI no aumenta automáticamente el Movimiento. Correr requiere la Acción y añade otro tramo equivalente al Movimiento base. El terreno difícil cuesta 2 puntos de Movimiento por cada espacio recorrido. Levantarse desde Derribado cuesta normalmente 2 puntos.

Las bandas narrativas de distancia son Contacto, Cerca, Media, Lejos y Extrema. Cuando se usa cuadrícula, la geometría concreta prevalece. La cobertura parcial concede normalmente +2 Defensa; una cobertura total impide ser objetivo directo si no existe una línea válida. Tierra Mágica no concede un bono universal por rodear a un enemigo.

### Viajes y desplazamiento de larga distancia

El Movimiento de combate no se multiplica directamente para calcular kilómetros por día. Un viaje incluye pausas, orientación, comida, agua, terreno, cuidado de monturas y preparación de campamento.

Una **jornada estándar de viaje** supone aproximadamente **8 horas de desplazamiento efectivo** dentro de un día que todavía permite pausas y preparar un Descanso Completo normal.

#### Distancia base por día

En **camino mantenido**, clima ordinario y ritmo normal:

| Medio | Distancia base |
|---|---:|
| A pie | **24 km/día** |
| Caballo de viaje con un jinete | **40 km/día** |
| Carreta o carro tirado | **24 km/día** |

Estas cifras son referencias de viaje sostenido, no velocidades máximas de carrera.

Un caballo puede desplazarse mucho más rápido durante períodos breves, pero no mantiene esa velocidad durante ocho horas sin consecuencias. Viajar montado tampoco elimina la necesidad de agua, alimento, descanso y cuidado del animal.

La velocidad de un grupo la determina normalmente **el miembro, montura o vehículo más lento que deba permanecer con el grupo**.

#### Caminos, senderos y campo traviesa

La distancia base se multiplica por la condición del terreno:

| Terreno de viaje | Multiplicador | Ejemplos |
|---|---:|---|
| **Camino mantenido** | ×1 | calzada, carretera estable, ruta comercial mantenida |
| **Sendero / terreno abierto** | ×0,75 | senda reconocible, pradera, terreno firme sin calzada |
| **Campo traviesa difícil** | ×0,50 | bosque, colinas rotas, terreno pedregoso, matorral denso |
| **Terreno severo** | ×0,25 | pantano, montaña abrupta, jungla densa, nieve profunda, ruinas muy quebradas |

A ritmo normal esto produce:

| Medio | Camino | Sendero / abierto | Difícil | Severo |
|---|---:|---:|---:|---:|
| A pie | 24 km | 18 km | 12 km | 6 km |
| Caballo | 40 km | 30 km | 20 km | 10 km |
| Carreta | 24 km | 18 km | 12 km | normalmente impracticable |

Una carreta sólo utiliza una distancia de campo traviesa si **las ruedas pueden físicamente atravesar el terreno**. Un bosque sin paso, un lodazal profundo, una pendiente rocosa o un vado imposible pueden detenerla por completo aunque la tabla muestre una referencia numérica.

Un caballo tampoco ignora el terreno: raíces, pendientes, barro, vegetación y necesidad de elegir pasos reducen su ventaja.

#### Efectos de abandonar los caminos

Seguir un camino mantenido normalmente ofrece:

- distancia completa;
- navegación evidente;
- puentes, vados o pasos preparados;
- mayor compatibilidad con carretas;
- más posibilidades de encontrar posadas, puestos, aldeas o ayuda;
- menor exposición a peligros puramente ambientales.

Abandonar el camino puede permitir:

- evitar controles, peajes o rutas vigiladas;
- aproximarse por un lugar inesperado;
- buscar recursos naturales;
- seguir una ruta que ninguna carretera conecta.

Pero normalmente implica:

- menor distancia diaria;
- necesidad de orientación;
- mayor riesgo de perder tiempo o desviarse;
- más exposición a clima, cruces de agua, barrancos, vegetación, fauna o zonas mágicas;
- menor acceso a refugio, reparación, alimento preparado y asistencia;
- posibilidad de que una carreta o vehículo de ruedas no pueda continuar.

Salir del camino **no provoca automáticamente un encuentro hostil**. El peligro puede manifestarse como pérdida de tiempo, clima, terreno, recursos, una lesión, una criatura, una patrulla, bandidos o una anomalía mágica según la región.

#### Ritmo de viaje

Antes de comenzar la jornada el grupo declara un ritmo:

| Ritmo | Distancia | Efecto |
|---|---:|---|
| **Cauteloso** | 75% | Ventaja en la prueba de Viaje; permite observar, explorar y reaccionar con mayor margen |
| **Normal** | 100% | sin modificador |
| **Rápido** | 125% | Desventaja en la prueba de Viaje; aumenta el riesgo de Fatiga |

Ejemplos sobre camino:

- a pie cauteloso: 18 km;
- a pie normal: 24 km;
- a pie rápido: 30 km;
- caballo normal: 40 km;
- caballo rápido: 50 km;
- carreta normal: 24 km;
- carreta rápida: 30 km.

El ritmo se aplica después del modificador de terreno.

#### Fatiga por ritmo Rápido

Al final de una jornada completa a ritmo Rápido:

- quien viaja por su propio esfuerzo realiza **VIG + Atletismo contra DF 14**;
- para una montura o equipo de tiro, si existe un perfil con VIG se utiliza su resistencia apropiada; si no existe perfil detallado, el jinete o conductor realiza **PER o AGI + Manejo contra DF 14** como prueba de administración del esfuerzo.

Con fallo, la criatura o equipo de viaje aumenta su Fatiga un paso: Fresco → Fatigado → Exhausto → Colapsado.

Un resultado Colapsado impide continuar un esfuerzo significativo.

Un Descanso Completo efectivo trata la Fatiga conforme a las reglas normales. El ritmo Rápido es por tanto más peligroso cuando la jornada termina en una situación donde el grupo no puede descansar con seguridad.

#### Marcha forzada

Viajar más de las 8 horas estándar es **marcha forzada**.

Cada bloque adicional de **2 horas** añade aproximadamente **25% de la distancia de una jornada normal ya modificada por terreno**, antes de redondear la llegada real.

Por cada bloque adicional se realiza una prueba de esfuerzo:

- primer bloque: **DF 14**;
- segundo bloque: **DF 16**.

A pie se usa normalmente VIG + Atletismo. Para monturas o equipos de tiro se usa su resistencia o, si no existe perfil detallado, Manejo del jinete/conductor.

Con fallo, aumenta la Fatiga un paso.

El núcleo normal sólo contempla **hasta dos bloques adicionales** —12 horas totales de desplazamiento—. Superar ese límite es una situación excepcional y puede impedir un Descanso Completo, agotar animales o producir consecuencias adicionales según las condiciones.

#### Prueba de Viaje

No se tira todos los kilómetros.

En un camino mantenido, con clima normal, ruta conocida y sin una amenaza especial, **no hace falta prueba de Viaje**.

Cuando existe incertidumbre de navegación, terreno o exposición, el guía del grupo realiza normalmente:

**PER + Supervivencia contra DF de Viaje.**

| Situación | DF base |
|---|---:|
| Sendero, terreno abierto o ruta parcialmente marcada | 12 |
| Bosque, colinas, terreno quebrado o ruta pobre | 14 |
| Pantano, montaña abrupta, jungla, nieve profunda o terreno severo | 17 |
| Distorsión mágica, tormenta extrema o región excepcional | 18+ |

Una jornada utiliza normalmente **una sola prueba de Viaje**, salvo que ocurra un cambio material de situación —por ejemplo entrar en una tormenta, cruzar una frontera mágica o abandonar una ruta para internarse en otra región—.

Ritmo Cauteloso concede Ventaja. Ritmo Rápido impone Desventaja.

Mapas fiables, hitos claros o conocimiento local pueden eliminar la incertidumbre y hacer innecesaria una prueba. No conceden un +X universal.

#### Resultado de la prueba de Viaje

**Ajustado:** el grupo mantiene la ruta prevista y completa la distancia calculada.

**Claro:** además, el guía identifica a tiempo un riesgo ordinario, un buen lugar de campamento o una decisión de ruta útil.

**Dominante:** además, puede encontrar una ruta especialmente eficiente o segura cuando la geografía realmente la permita. Un atajo real puede aumentar hasta aproximadamente 10% el progreso de ese día; no se crea un camino inexistente.

**Fallo:** el Director aplica **una** consecuencia que derive de la situación. Ejemplos:

- perder aproximadamente 25% del progreso del día;
- desviarse hacia una zona vecina o tomar un ramal incorrecto;
- consumir tiempo o suministros adicionales;
- exigir una prueba de Fatiga;
- quedar expuesto a un obstáculo o peligro que podría haberse evitado;
- llegar tarde y perder una oportunidad temporal.

Un fallo no obliga a introducir un combate aleatorio.

Una **Pifia** puede justificar dos consecuencias compatibles o una complicación especialmente grave, pero sigue respetando la geografía y el peligro existente.

La misma jornada no se repite una y otra vez con distintos guías hasta obtener un resultado mejor si no cambian de forma significativa mapa, información, ruta, tiempo o método.

#### Clima y visibilidad

El clima puede empeorar la categoría efectiva del terreno.

Como referencia:

- lluvia fuerte, barro, nieve moderada o visibilidad mala: **empeoran una categoría**;
- tormenta severa, inundación, ventisca o fenómeno mágico importante pueden empeorar más o detener por completo el viaje.

Ejemplo: una carretera embarrada que empeora una categoría se trata como Sendero para distancia y DF.

Viajar de noche sin iluminación o visión adecuada puede empeorar una categoría y hacer necesarias pruebas que durante el día serían rutinarias.

#### Ríos, barrancos y obstáculos

La distancia diaria no permite atravesar automáticamente un obstáculo.

Un río sin puente, un barranco, una muralla natural, una zona de derrumbe o un paso cerrado debe resolverse antes de continuar.

La solución puede requerir:

- encontrar un vado;
- usar Atletismo;
- emplear cuerda o equipo;
- buscar otro camino;
- construir o reparar un paso;
- usar una montura o vehículo apropiado;
- recurrir a magia.

El tiempo utilizado cuenta contra la jornada.

#### Forraje y alimentación durante el viaje

Las provisiones del capítulo de Equipo representan comida preparada para viajeros. Una jornada ordinaria consume **1 ración por persona**.

Buscar alimento en el entorno requiere normalmente **2 horas** y:

**PER + Supervivencia.**

| Disponibilidad | DF |
|---|---:|
| Abundante | 10 |
| Ordinaria | 13 |
| Escasa | 16 |
| Hostil o muy pobre | 19 |

Resultado:

- Ajustado: 1 ración;
- Claro: 2 raciones;
- Dominante: 4 raciones;
- Fallo: ninguna ración útil.

Estas raciones son alimento ordinario, local y normalmente perecedero para la expedición; no se convierten automáticamente en mercancía de mercado.

Si todo el grupo debe detenerse mientras alguien forrajea, esas 2 horas reducen aproximadamente **25%** la distancia disponible de la jornada. Si un explorador puede forrajear sin retrasar realmente al grupo, no se aplica esa reducción.

Las provisiones humanas no incluyen automáticamente alimento para monturas. Un caballo puede pastar donde exista forraje suficiente; en desierto, invierno duro, ciudad o terreno sin pasto debe conseguirse alimento apropiado por otra vía.

#### Agua

El núcleo no fija litros universales por criatura porque Escala, clima y biología varían.

En regiones con agua accesible, el abastecimiento puede ser rutinario. En desierto, alta montaña, invierno severo o zonas contaminadas, encontrar agua es parte de la prueba de Supervivencia y puede convertirse en el principal límite del viaje.

No disponer de agua suficiente puede producir Fatiga, impedir una marcha rápida o volver imposible continuar. No existe un daño fijo universal por día sin agua.

#### Campamento y descanso

La distancia diaria presupone tiempo para detenerse y preparar campamento.

Un campamento ordinario no exige tirada cuando:

- existe un lugar razonablemente seguro;
- hay equipo suficiente;
- las condiciones son normales.

Supervivencia puede ser necesaria para encontrar refugio, protegerse de clima, ocultar el campamento o hacerlo viable en terreno hostil.

El hecho de detenerse ocho horas no garantiza por sí solo un Descanso Completo si ataques, frío extremo, inundación, vigilancia continua u otra circunstancia impiden descansar realmente.

#### Monturas

Una montura de viaje permite aumentar la distancia sostenida, pero no elimina la logística.

Un caballo necesita:

- descanso;
- agua;
- alimento o pasto;
- terreno transitable;
- cuidado básico.

Montar una ruta rutinaria no exige Manejo. Se tira Manejo cuando existe incertidumbre real: pendiente peligrosa, animal asustado, salto, cruce difícil, velocidad excesiva o maniobra bajo presión.

Una montura sobrecargada o con dos jinetes no conserva automáticamente los 40 km/día. Si la carga excede lo razonable para el animal, se utiliza una velocidad menor o la situación puede ser imposible según su capacidad.

#### Carretas y carros

Una carreta es eficiente cuando existe infraestructura adecuada y especialmente útil para transportar carga, pero depende mucho más del terreno.

En camino mantenido puede sostener aproximadamente **24 km/día**.

Fuera del camino:

- terreno abierto o sendero firme: 18 km/día;
- terreno difícil pero físicamente transitable: 12 km/día;
- terreno severo: normalmente no puede avanzar.

Cruzar barro, pendientes fuertes, bosques cerrados, vados o puentes dañados puede exigir Manejo, trabajo físico, reparación o una ruta alternativa.

Una avería no aparece sólo porque se haya hecho una tirada baja de viaje; debe corresponder a un riesgo real de la ruta, carga, vehículo o situación.

#### Caminos también tienen peligros

Viajar por carretera no significa seguridad absoluta.

Un camino puede concentrar:

- peajes;
- guardias;
- fronteras;
- controles de licencia;
- bandidos;
- emboscadas en pasos previsibles;
- tránsito;
- enfermedades en postas;
- vigilancia política.

La diferencia es que estos riesgos proceden principalmente de **personas, infraestructura y lugares conocidos**, mientras que el campo traviesa añade además orientación y peligros ambientales.

#### Ejemplo de viaje

Un grupo necesita recorrer **70 km** hasta una ciudad.

**A pie por camino mantenido:** 24 km/día.  
En dos días recorre 48 km y necesita una tercera jornada para los 22 km restantes.

**A caballo por el mismo camino:** 40 km/día.  
Completa 40 km el primer día y los 30 km restantes durante el segundo.

**En carreta:** 24 km/día.  
También necesita tres jornadas, pero puede transportar mucha más carga.

El grupo descubre un supuesto atajo de **36 km a través de bosque difícil**.

- a pie: 12 km/día → 3 jornadas;
- a caballo: 20 km/día → algo menos de 2 jornadas de desplazamiento;
- carreta: 12 km/día sólo si existe paso real para ruedas.

El atajo es más corto en kilómetros, pero exige prueba de Viaje **PER + Supervivencia contra DF 14**, ofrece menos acceso a refugio y puede ser intransitable para la carreta. Por eso “fuera del camino” no significa automáticamente “más rápido”.

### Guardia, Preparar y Retrasar

**Guardia** es universal: Acción, +2 Defensa hasta el inicio del siguiente turno propio y conserva la Reacción.

**Preparar** consume la Acción para declarar una respuesta y un disparador observable. Cuando el disparador ocurre, se utiliza la Reacción para resolver la respuesta. Preparar un ataque requiere una capacidad que lo habilite, como Tirador Preparado. La preparación expira al inicio del siguiente turno propio. Una respuesta reactiva no dispara otra respuesta ofensiva reactiva salvo regla expresa.

**Retrasar** desplaza el turno a un momento posterior de la ronda. La criatura conserva esa nueva posición de iniciativa y nunca obtiene dos turnos por retrasar.

## 7. Escala y maniobras

Las categorías de Escala son **Diminuta, Pequeña, Mediana, Grande, Enorme y Colosal**. No conceden bonos genéricos a ataque, Defensa o daño. Como referencia espacial: Diminuta ocupa menos de un espacio; Pequeña y Mediana uno; Grande 2x2; Enorme 3x3; Colosal 4x4 o más.

Una diferencia de una categoría permite normalmente interacción física directa, aunque puede reducir cuánto puede desplazarse o controlar al objetivo. Con dos categorías de diferencia, la criatura menor normalmente no puede imponer fuerza corporal directa a la mayor sin palanca, posición, Potencia Sobrenatural o capacidad apropiada. Con tres o más, la fuerza corporal convencional suele ser insuficiente.

La **Defensa de Maniobra** es:

**11 + AGI + Bono Defensivo aplicable.**

Derribar, Empujar, Agarrar y Desarmar son **Acciones universales**. No requieren una Técnica para intentarse, aunque una Técnica o capacidad puede mejorarlas.

El atacante usa el Atributo y Habilidad que correspondan al método declarado. Como referencia:

- fuerza bruta, agarre o empuje: **FUE + Atletismo**;
- barrido, zancadilla o control corporal preciso: **AGI + Acrobacia** cuando la ficción lo justifique;
- Desarmar con el arma propia: **FUE o AGI + Habilidad de arma pertinente**;
- otra combinación sólo cuando el método la sostenga claramente.

### Derribar

Procedimiento:

1. gasta la Acción;
2. declara cómo intentas derribar al objetivo;
3. tira contra su Defensa de Maniobra;
4. con éxito, el objetivo queda **Derribado**.

Una criatura Derribada:

- puede levantarse gastando normalmente **2 puntos de Movimiento**;
- mientras permanezca en el suelo, desplazarse cuesta **2 puntos de Movimiento por espacio**;
- no puede Correr mientras siga Derribada;
- sufre Desventaja en pruebas físicas que requieran apoyo, carrera o postura estable;
- no pierde automáticamente su Defensa ni concede Ventaja universal a todos los ataques.

Una criatura no puede acumular varias instancias de Derribado.

### Empujar

Empujar usa normalmente **FUE + Atletismo contra Defensa de Maniobra**.

Si tiene éxito:

- margen Ajustado 0–4: desplaza **1 espacio**;
- margen Claro 5–9: desplaza **2 espacios**;
- margen Dominante 10+: desplaza **3 espacios**.

El desplazamiento debe ser físicamente coherente y alejar al objetivo del punto de fuerza.

Escala:

- objetivo de Escala igual o menor: distancia completa;
- objetivo una categoría mayor: la distancia se reduce en 1 espacio, mínimo 1 si la maniobra tuvo éxito;
- objetivo dos o más categorías mayor: no puede ser desplazado por fuerza corporal ordinaria sin palanca o capacidad apropiada.

Si un obstáculo sólido impide completar el desplazamiento, el objetivo se detiene; no recibe daño adicional automáticamente. Si el desplazamiento lo lleva fuera de una superficie válida, comienza una caída y se aplican las reglas de Caídas.

### Agarrar

Agarrar usa normalmente **FUE + Atletismo contra Defensa de Maniobra**.

Con éxito, el objetivo queda **Agarrado** y se establece:

**DF de Presa = 11 + FUE del atacante + bono reducido de Atletismo.**

Bono reducido de Atletismo:

- Sin Entrenar / Aprendiz: 0;
- Entrenado: 1;
- Experto: 2;
- Maestro: 3;
- Gran Maestro: 4;
- Presa Entrenada, cuando una capacidad la concede: +1 adicional.

Mientras mantiene la Presa:

- el objetivo tiene Movimiento 0 para alejarse del agarre;
- puede realizar acciones físicamente plausibles;
- una acción que necesite libertad corporal real puede sufrir Desventaja o ser imposible;
- el atacante ocupa al menos una extremidad apropiada para mantener el agarre;
- mantener una Presa no consume una Acción nueva cada turno;
- el atacante puede soltarla voluntariamente sin gastar Acción;
- si el atacante queda Incapacitado, pierde el alcance o ya no puede mantener físicamente la Presa, ésta termina.

Una criatura de la misma Escala o menor puede ser desplazada por quien la agarra aproximadamente a **la mitad del Movimiento** del atacante cuando anatomía, fuerza y posición lo permiten. Contra una criatura mayor se aplican los límites de Escala.

Escapar requiere una Acción y una prueba apropiada, normalmente **FUE + Atletismo** o **AGI + Acrobacia**, contra la DF de Presa.

### Desarmar

Desarmar es una Acción contra **Defensa de Maniobra**.

El método habitual es FUE o AGI + una Habilidad de arma pertinente; Atletismo también puede servir cuando se trata de arrancar, retorcer o separar físicamente un objeto.

Modificadores y límites:

- un objeto sostenido con dos manos concede **+2 Defensa de Maniobra** sólo contra Desarmar;
- un objeto asegurado con correas, bloqueo, cadena, montaje o mecanismo que impida soltarlo no puede retirarse mediante un Desarmar ordinario;
- armas naturales, miembros corporales y objetos integrados no son objetivos de Desarmar;
- la maniobra no causa daño por sí sola.

Resultados:

- éxito Ajustado: el objeto cae en el espacio del objetivo o en el lugar válido más cercano;
- éxito Claro: quien desarma puede hacer que caiga en un espacio adyacente válido dentro de su alcance;
- éxito Dominante: si tiene una mano libre y la ficción lo permite, puede **apoderarse del objeto** en lugar de dejarlo caer.

Recoger del suelo un objeto accesible dentro del propio alcance cuesta normalmente **2 puntos de Movimiento**. Si el objeto está bajo control físico de otra criatura, detrás de un obstáculo o en un espacio inaccesible, recuperarlo puede requerir otra Acción o ser imposible.

### Potencia Sobrenatural y maniobras

**Potencia Sobrenatural** no cambia la Escala real: permite interactuar físicamente como una categoría mayor. No aumenta FUE, tamaño, alcance, Defensa, armas ni resistencias y no se acumula con equivalentes.

Para Derribar, Empujar o Agarrar puede reducir en una categoría la diferencia funcional de Escala cuando el efecto sea compatible. No convierte automáticamente en posible una maniobra contra algo anclado, inmóvil o anatómicamente imposible.

## 8. Combate

El combate usa la misma lógica general del sistema, pero organiza las decisiones en un orden estricto para que todos sepan **cuándo pueden actuar, qué recurso consumen y contra qué valor se resuelve cada acción**.

### Ronda, turno y economía básica

Una **ronda** representa una vuelta completa por el orden de iniciativa. Durante una ronda, cada combatiente obtiene normalmente un **turno**.

En su turno una criatura dispone normalmente de:

- **Movimiento**: una reserva de espacios que puede gastar durante el turno;
- **1 Acción**: el recurso principal para atacar, lanzar la mayoría de hechizos, realizar maniobras, usar objetos complejos y otras intervenciones significativas;
- **1 Reacción**: una respuesta que puede utilizarse cuando aparece un disparador válido, incluso fuera del turno propio.

El Movimiento no es una Acción separada. Puede dividirse antes y después de la Acción cuando la situación lo permite. Una Reacción utilizada queda gastada hasta el inicio del siguiente turno propio. Una Reacción no utilizada se pierde cuando es reemplazada por la nueva al comenzar ese turno.

Una capacidad sólo concede Acciones, Reacciones, ataques o Movimiento adicionales cuando lo dice expresamente. Tener varias armas, varios miembros, un Familiar, un dispositivo o varios hechizos disponibles no crea por sí mismo economía adicional.

### Cómo comienza un combate

Cuando una situación deja de poder resolverse cómodamente en conversación libre y pasa a requerir un orden preciso de acciones, comienza el combate.

Procedimiento:

1. **Fija la situación inicial.** Determina posiciones, distancias, cobertura, armas preparadas, quién puede percibir a quién y cualquier condición ya activa.
2. **Resuelve una iniciación no percibida, si existe.** No hay una ronda universal de sorpresa. Si alguien inicia una acción que un objetivo no pudo percibir, se resuelve el disparador pertinente y se aplican las reglas de Desprevenido cuando corresponda.
3. **Tira Iniciativa.** Cada combatiente realiza **2d10 + PER + modificadores**.
4. **Establece el orden.** Los resultados de Iniciativa determinan el orden de los turnos de la ronda. Un resultado mayor actúa antes. El Manual no establece un modificador universal adicional para empates; si ocurre uno, la mesa o el DJ fija un orden consistente sin conceder turnos extra.
5. **Comienza la primera ronda.** El primer combatiente toma su turno completo; después actúa el siguiente y así sucesivamente.
6. **Comienza una nueva ronda** cuando todos los combatientes que debían actuar completaron su turno. Se mantiene el orden salvo Retrasar u otra regla que lo modifique.

### Estructura de un turno, paso a paso

Al comenzar tu turno:

1. **Recuperas tu Reacción.** La Reacción anterior, usada o no, es reemplazada por la nueva.
2. **Dispones de tu Acción y Movimiento del turno**, salvo que una condición o regla diga lo contrario.
3. **Resuelve efectos de inicio de turno** que indiquen expresamente ese momento.

Durante el turno puedes combinar Movimiento y Acción en el orden permitido por la situación. Por ejemplo:

- mover 2 espacios;
- atacar;
- mover los 4 espacios restantes.

También puedes gastar toda tu Acción antes de moverte o no moverte en absoluto.

La Reacción no necesita usarse durante tu propio turno. Puede quedar disponible para responder a un ataque, un movimiento enemigo, un lanzamiento o cualquier otro disparador válido antes de que vuelva a comenzar tu turno.

Al terminar tu turno:

1. resuelve efectos que indiquen **fin de turno**;
2. aplica Sangrado u otros estados que especifiquen ese momento;
3. conserva cualquier Reacción que no hayas gastado hasta que aparezca un disparador o comience tu próximo turno.

### Movimiento en combate

Un humanoide Mediano tiene como referencia **Movimiento 6**, aproximadamente 9 metros por turno.

El Movimiento puede gastarse en varios tramos. Reglas frecuentes:

| Situación | Coste / efecto |
|---|---|
| Desplazamiento ordinario | 1 punto por espacio |
| Terreno difícil | 2 puntos por espacio |
| Levantarse desde Derribado | normalmente 2 puntos |
| Recoger un objeto accesible del suelo | normalmente 2 puntos |
| Correr | consume la Acción y concede otro tramo equivalente al Movimiento base |
| Agarrado | Movimiento 0 para alejarse de la Presa |
| Exhausto | Movimiento -2, mínimo 1 |

Moverse fuera del alcance de un enemigo **no provoca un Ataque de Oportunidad universal**. Una reacción ofensiva sólo existe si una Técnica, capacidad, preparación o regla concreta la habilita.

### Qué puedes hacer con tu Acción

La Acción representa la intervención principal del turno. Las opciones más frecuentes son:

| Acción | Qué hace |
|---|---|
| **Atacar con un arma** | Realiza un ataque contra un objetivo válido. |
| **Derribar, Empujar o Agarrar** | Maniobra física contra Defensa de Maniobra cuando corresponda. |
| **Desarmar** | Maniobra contra Defensa de Maniobra para hacer soltar un objeto; un agarre a dos manos concede +2 contra esta maniobra. |
| **Escapar de una Presa** | FUE + Atletismo o AGI + Acrobacia contra la DF de Presa, salvo otro método válido. |
| **Intimidar / Amenazar** | Acción social bajo presión: normalmente PRE + Intimidación contra Defensa Mental cuando el objetivo resiste. |
| **Lanzar un hechizo Directo** | La mayoría de los hechizos de combate usan la Acción salvo que indiquen Reacción, ritual u otra activación. |
| **Guardia** | +2 Defensa hasta el inicio del siguiente turno propio y conserva la Reacción. |
| **Preparar** | Declara una respuesta y un disparador observable; la respuesta se resuelve más tarde con la Reacción. |
| **Correr** | Añade otro tramo equivalente al Movimiento base. |
| **Recargar** | Gasta las Acciones de Recarga exigidas por el arma; Recarga Experta puede reducir el coste. |
| **Primeros Auxilios bajo presión** | Puede detener Sangrado ordinario, estabilizar y preparar una lesión para tratamiento. |
| **Usar una fórmula o poción** | Cuando la preparación indique Acción, consume la Acción y la dosis correspondiente. |
| **Activar un dispositivo** | Usa Acción cuando el dispositivo así lo indique; algunos dispositivos defensivos usan Reacción. |
| **Orden táctica compleja a Familiar o invocación** | Consume normalmente la Acción del personaje cuando cambia una orden táctica compleja. |
| **Sentidos Compartidos** | Con la Técnica correspondiente, usa la Acción para percibir mediante los sentidos reales del Familiar. |

Un ritual no se convierte en una Acción de combate sólo porque utilice magia. Los rituales conservan su Tiempo propio.

Esta tabla cubre las opciones universales y los usos de subsistemas que aparecen con frecuencia en combate. Una Técnica, hechizo, Rasgo, dispositivo, montura, Familiar o criatura puede añadir una Acción específica; cuando ocurra, su propia entrada indica activación, coste, objetivo y límites. Esa capacidad especial no crea otras Acciones no escritas.

### Ataque con arma, paso a paso

Un ataque ordinario usa:

**2d10 + Atributo pertinente + Habilidad de arma + modificadores >= Defensa.**

El procedimiento es:

1. **Declara el atacante, arma y objetivo.**
2. **Comprueba alcance, línea válida, posición y requisitos del arma.**
3. **Declara cualquier Técnica o modificador del ataque** que deba decidirse antes de tirar, como Golpe Potente o Estocada Perforante.
4. **Abre la ventana de Reacción defensiva.** El defensor puede usar Parada, Bloqueo, Intercepción, Barrera Cinética, Escudo de campo u otra respuesta válida si cumple su disparador.
5. **Calcula la Defensa aplicable** después de esos modificadores.
6. **Tira el ataque.** Si el total iguala o supera la Defensa, impacta.
7. **Calcula Protección efectiva:**  
   **Protección efectiva = max(0, Protección - Penetración).**
8. **Calcula daño final:**  
   **Daño final = max(0, daño base + un Atributo de daño cuando sea lógico + bonos - Protección efectiva).**
9. **Aplica el daño y efectos del impacto.**
10. **Evalúa consecuencias especiales**, como Sangrado, Derribado, una capacidad de arma o el umbral informativo de Daño Grave.

La Penetración nunca vuelve negativa la Protección. Si la Protección efectiva reduce el daño a 0, el impacto causa 0 daño salvo regla expresa.

### Defensas: qué representan y cuándo se usan

En la mayoría de los ataques el defensor **no hace una tirada defensiva separada**. El atacante tira contra una Defensa estática.

| Defensa | Fórmula / uso principal |
|---|---|
| **Defensa** | 11 + AGI + Bono Defensivo aplicable + equipo/modificadores. Ataques físicos o energéticos ordinarios. |
| **Defensa Corporal** | 11 + VIG. Efectos que alteran directamente el cuerpo cuando corresponda. |
| **Defensa Mental** | 11 + VOL. Influencia y efectos mentales resistidos. |
| **Defensa de Maniobra** | 11 + AGI + Bono Defensivo aplicable. Derribar, Empujar y Agarrar. |

**Defenderse no consume Acción por sí mismo.** La Defensa base está siempre presente mientras la criatura pueda beneficiarse de ella. Lo que consume Reacción son respuestas activas como Parada o Bloqueo.

La cobertura parcial concede normalmente **+2 Defensa**. Cobertura total impide ser objetivo directo cuando no existe una línea válida.

### Reacciones de combate

Una Reacción se gasta sólo cuando existe un disparador válido. Las respuestas más frecuentes son:

| Reacción | Disparador y efecto |
|---|---|
| **Parada** | Ataque cuerpo a cuerpo parable; requiere arma apropiada y Habilidad marcial Entrenada. +2 Defensa contra ese ataque. |
| **Bloqueo con escudo** | Un escudo estándar o pesado puede usar su Bloqueo mediante Reacción para +2 Defensa cuando corresponda; la defensa pasiva frontal del escudo se calcula por separado. |
| **Intercepción** | Un aliado cercano es objetivo de un ataque perceptible. Te desplazas lo mínimo para interponerte y pasas a ser el objetivo. No concede Defensa extra, no excede Movimiento y no funciona contra áreas. |
| **Recibir Carga** | Con arma de Alcance, cuando un enemigo entra voluntariamente en tu alcance mediante un desplazamiento directo hacia ti, realizas el ataque indicado antes de completar su aproximación. |
| **Contraataque** | Si Parada convierte un impacto en fallo y posees la Técnica, realizas un ataque inmediato dentro de esa misma Reacción. No genera una cadena de Reacciones ofensivas. |
| **Tirador Preparado** | Después de Preparar un disparo con la Acción, lo resuelve con la Reacción cuando ocurre el disparador. |
| **Contramagia** | Después de declarar un lanzamiento y antes de resolverlo; requiere compatibilidad narrativa/mágica. No es una cancelación automática universal. |
| **Barrera Cinética** | Hechizo reactivo: +2 Defensa normal contra el ataque declarado y se consume al resolverlo. |
| **Escudo de campo** | Dispositivo reactivo compatible: +2 Defensa cuando corresponda; no se acumula con Barrera Cinética equivalente. |
| **Acción Vinculada / Coordinación Reactiva** | Un Familiar puede intervenir cuando el vínculo y la capacidad concreta lo permiten. No crea una Reacción adicional. |

Una misma Reacción no se utiliza dos veces sobre el mismo disparador salvo regla expresa.

### Parada y Contraataque

Parada y Contraataque forman una secuencia concreta:

1. un enemigo declara un ataque cuerpo a cuerpo parable;
2. antes de resolverlo, el defensor gasta su Reacción en **Parada**;
3. su Defensa aumenta en +2 para ese ataque;
4. se resuelve la tirada enemiga;
5. si el ataque habría impactado la Defensa original pero falla gracias al +2 de Parada, se considera una **Parada exitosa** a efectos de Contraataque;
6. si el defensor posee **Contraataque**, puede realizar inmediatamente un ataque dentro de esa misma Reacción;
7. ese ataque reactivo no abre una cadena de nuevas respuestas ofensivas reactivas salvo regla expresa.

Si el ataque enemigo ya fallaba contra la Defensa original, Parada puede haberse gastado, pero no habilita Contraataque por haber “convertido” el resultado.

### Guardia

Guardia es una opción universal y no requiere Técnica.

- consume la Acción;
- concede **+2 Defensa**;
- dura hasta el inicio del siguiente turno propio;
- conserva la Reacción.

Por tanto, una criatura en Guardia todavía puede usar Parada, Bloqueo u otra Reacción válida durante el intervalo. Los bonos sólo se acumulan cuando las reglas de apilamiento permiten que procedan de fuentes distintas.

### Preparar

Preparar permite cambiar **cuándo** se resuelve una respuesta sin crear una Acción adicional.

1. gastas tu Acción;
2. declaras una respuesta concreta y un disparador observable;
3. esperas;
4. cuando ocurre el disparador, gastas tu Reacción y resuelves la respuesta;
5. si el disparador no ocurre, la preparación expira al inicio de tu siguiente turno.

Preparar un ataque requiere una capacidad que lo habilite, como Tirador Preparado.

### Retrasar

Retrasar no crea una Acción guardada.

La criatura desplaza su turno a un momento posterior de la ronda. A partir de entonces conserva esa nueva posición de iniciativa. Nunca obtiene dos turnos en la misma ronda por Retrasar.

### Maniobras: Derribar, Empujar, Agarrar y Desarmar

Las reglas completas están en **Escala y maniobras**. En combate todas consumen la Acción y se resuelven antes de aplicar su consecuencia.

Resumen:

| Maniobra | Tirada habitual | Éxito |
|---|---|---|
| Derribar | FUE + Atletismo o AGI + Acrobacia vs Defensa de Maniobra | objetivo Derribado |
| Empujar | FUE + Atletismo vs Defensa de Maniobra | 1/2/3 espacios según margen, limitado por Escala |
| Agarrar | FUE + Atletismo vs Defensa de Maniobra | objetivo Agarrado y se establece DF de Presa |
| Desarmar | FUE/AGI + Habilidad de arma o Atletismo vs Defensa de Maniobra | el objeto cae, puede desplazarse o ser tomado según margen |

Una maniobra no causa daño salvo que una regla, el entorno o una capacidad lo indique expresamente.

### Intimidar o Amenazar en combate

**Amenazar** describe la intención. **Intimidación** es la Habilidad usada para imponer presión mediante miedo, coerción o una consecuencia creíble.

En combate consume la **Acción**.

Procedimiento:

1. declara una amenaza concreta que el objetivo pueda percibir y comprender;
2. si existe resistencia real, tira normalmente **PRE + Intimidación contra Defensa Mental**;
3. otro Atributo puede sustituir PRE si el método lo justifica claramente —por ejemplo FUE para una demostración física inmediata—, pero sigue siendo una sola prueba de Intimidación;
4. con éxito, hasta el final del siguiente turno del objetivo, **la próxima prueba hostil que realice directamente contra quien lo intimidó sufre Desventaja**;
5. una vez aplicada esa Desventaja, el efecto termina.

Intimidar no:

- elimina la Acción del objetivo;
- obliga a huir;
- obliga a rendirse;
- fuerza una traición, suicidio o revelación de secretos;
- convierte una amenaza absurda o imposible en creíble.

Si el objetivo no puede percibir la amenaza, no comprende su significado o no tiene motivo posible para temer la consecuencia, la prueba puede ser imposible.

Una criatura que ya fue afectada o resistió una amenaza concreta no puede ser sometida una y otra vez a la misma amenaza durante la misma Escena sin un cambio material de circunstancias.

Fuera del combate, Intimidación usa los mismos principios, pero el éxito produce consecuencias sociales coherentes con la amenaza y la situación en vez de una penalización táctica obligatoria.

### Técnicas ofensivas y defensivas frecuentes

Las Técnicas no conceden economía adicional salvo que lo indiquen.

| Técnica | Uso en combate |
|---|---|
| **Golpe Potente** | Ataque compatible: -2 al ataque, +2 daño si impacta. |
| **Estocada Perforante** | Ataque compatible: -1 ataque, -1 daño, Penetración +2. |
| **Combate Dual** | Una Acción produce dos ataques a -2 con armas compatibles. |
| **Barrido** | Una tirada a -2 contra hasta dos objetivos adyacentes válidos; daño separado. |
| **Parada** | Reacción: +2 Defensa contra un ataque cuerpo a cuerpo parable. |
| **Contraataque** | Si Parada convierte impacto en fallo, ataque inmediato dentro de la misma Reacción. |
| **Intercepción** | Reacción para interponerse entre un aliado cercano y un ataque perceptible. |
| **Recibir Carga** | Reacción con arma de Alcance contra un enemigo que entra voluntariamente en alcance mediante carga directa. |
| **Tirador Preparado** | Habilita preparar un disparo con Acción y resolverlo con Reacción. |
| **Recarga Experta** | Reduce la Recarga en 1 Acción respetando los mínimos físicos. |
| **Contramagia** | Reacción que interfiere un lanzamiento compatible antes de resolverlo. |

### Magia durante el combate

El procedimiento completo está en el capítulo **11. Magia**. En combate se conserva esta secuencia:

1. declara el hechizo, objetivos/área y elecciones previas;
2. valida competencia, requisitos, alcance, línea y economía de Acción/Reacción;
3. paga el Maná o resuelve Sobrecarga cuando sea legal;
4. abre la ventana de Reacciones mágicas, como Contramagia;
5. determina si existe una tirada;
6. resuelve **Atributo + Canalización** contra la Defensa o DF pertinente cuando corresponda;
7. aplica daño, curación, estado, desplazamiento u otro efecto;
8. si el lanzamiento Sostenido tuvo éxito, registra el Sostenimiento respetando su límite.

Un lanzamiento válido que falla consume el recurso de Acción/Reacción y el Maná. Una declaración inválida se detiene antes del pago. Un hechizo conocido, seguro y sin oposición no tira sólo por ser mágico.

### Primeros Auxilios, fórmulas, dispositivos y Familiares

Estas opciones utilizan la misma economía de combate:

- **Primeros Auxilios bajo presión:** Acción. Puede detener Sangrado ordinario, estabilizar y preparar una lesión para tratamiento.
- **Poción Restauradora:** Acción; recupera 4 Vida hasta máximo y límites de lesión.
- **Poción de Recuperación Arcana:** Acción; recupera 3 Maná hasta máximo; no elimina Fatiga ni Sobrecarga.
- **Dispositivos:** consumen Acción o Reacción según su diseño y además deben respetar Energía, Caudal, condición y fuente.
- **Familiar Vinculado:** una intervención táctica significativa usa normalmente la Acción Vinculada y consume la Reacción del personaje.
- **Orden táctica compleja:** cambiarla consume normalmente la Acción del personaje.
- **Coordinación Reactiva:** permite un disparador observable, pero no concede Reacciones extra.

### Desprevenido

Una criatura Desprevenida pierde su Bono Defensivo y cualquier defensa pasiva de escudo que dependa de orientarse frente a la amenaza. También puede perder Reacciones defensivas frente a un ataque que no pudo percibir o al que no pudo reaccionar. No pierde AGI de su Defensa.

No existe una ronda universal de sorpresa. El estado surge de la situación concreta.

### 0 Vida, Daño Grave y final de un combate

Llegar a **0 Vida** causa Incapacitado, no muerte automática. Para un personaje orgánico, la primera caída pertinente desde Vida positiva a 0 mientras tiene Trauma 0 eleva Trauma a 1.

El **umbral de Daño Grave = 5 + VIG** es informativo. Si un impacto alcanza o supera ese daño final, se evalúa si la naturaleza del golpe y la ficción justifican una Herida Grave; no aparece automáticamente por alcanzar el número.

El combate deja de necesitar iniciativa cuando ya no existe oposición activa que requiera resolución secuenciada: por ejemplo, todos los enemigos están Incapacitados, se rindieron, huyeron de forma efectiva o la escena dejó de ser un conflicto táctico. Los estados, Sangrado, Sostenimientos y consecuencias que continúen activos siguen resolviéndose según sus propias reglas.

### Ejemplo completo: tres rondas

Este ejemplo muestra la economía de turno, ataque, Parada, Contraataque y Guardia. Los resultados de dados son ilustrativos.

**Mara**, aventurera:
- Movimiento 6;
- Defensa 14;
- Protección 2;
- FUE 2;
- PER 2;
- Armas Marciales Entrenada (+2);
- espada larga: Daño 5;
- ataque total habitual con esa espada: +4;
- posee Parada, Contraataque y Golpe Potente.

**Bandido**, usando el perfil de referencia:
- Vida 12;
- Defensa 13;
- Protección 1;
- Movimiento 6;
- Iniciativa +2;
- espada corta: ataque +4, daño 6.

#### Inicio del combate

Mara y el Bandido se ven y ambos comprenden que comienza la pelea. Nadie está Desprevenido.

- Mara tira 13 en 2d10 y suma PER 2: **Iniciativa 15**.
- El Bandido obtiene **12** después de su modificador.

Mara actúa primero.

#### Ronda 1 — turno de Mara

Mara está a 3 espacios.

1. Gasta 3 puntos de Movimiento para acercarse.
2. Usa su Acción para atacar con la espada larga.
3. Su ataque es **2d10 + 4**.
4. Obtiene 10 en los dados: total **14**.
5. La Defensa del Bandido es 13: impacta.
6. Daño base 5 + FUE 2 = 7.
7. El Bandido tiene Protección 1 y la espada no tiene Penetración: Protección efectiva 1.
8. Daño final: **7 - 1 = 6**.
9. El Bandido pasa de Vida 12 a **Vida 6**.

Mara todavía conserva su Reacción.

#### Ronda 1 — turno del Bandido

El Bandido ataca a Mara.

1. Declara el ataque.
2. Su total habitual es **2d10 + 4**.
3. Antes de resolverlo, Mara usa su Reacción en **Parada**.
4. La Defensa de Mara pasa de 14 a **16** sólo contra ese ataque.
5. El Bandido obtiene 11 en 2d10: total **15**.
6. Sin Parada, 15 habría superado Defensa 14. Con Parada, 15 no alcanza 16: falla.
7. Como Parada convirtió un impacto en fallo y Mara posee **Contraataque**, puede atacar inmediatamente dentro de esa misma Reacción.
8. Mara contraataca con +4, obtiene 8 en los dados y totaliza **12**.
9. La Defensa del Bandido es 13: el Contraataque falla.

La Reacción de Mara ya está gastada.

#### Ronda 2 — turno de Mara

Al comenzar su turno, Mara recupera su Reacción.

Decide no arriesgar otro intercambio directo:

1. mueve 2 espacios hacia una posición mejor;
2. usa su Acción en **Guardia**;
3. obtiene +2 Defensa hasta el inicio de su siguiente turno;
4. su Defensa pasa temporalmente de 14 a **16**;
5. conserva su Reacción.

#### Ronda 2 — turno del Bandido

El Bandido se acerca y vuelve a atacar.

1. tira su ataque +4;
2. obtiene un total de **14**;
3. Mara tiene Defensa 16 por Guardia;
4. el ataque falla sin necesidad de gastar Parada.

Mara conserva su Reacción porque la Defensa pasiva de Guardia fue suficiente.

#### Ronda 3 — turno de Mara

Al comenzar el turno termina la Guardia anterior y Mara recupera/reemplaza su Reacción. Su Defensa vuelve a 14.

Mara decide terminar el combate con **Golpe Potente**.

1. declara Golpe Potente antes de tirar;
2. su ataque habitual +4 recibe -2: queda en **+2**;
3. tira 11 en 2d10: total **13**;
4. iguala la Defensa 13 del Bandido: impacta;
5. daño de espada larga 5 + FUE 2 + Golpe Potente 2 = **9**;
6. Protección del Bandido 1: daño final **8**;
7. el Bandido tenía Vida 6 y cae a **0 Vida**: queda Incapacitado.

El impacto de 8 también supera el umbral informativo de Daño Grave del Bandido de referencia, por lo que se evalúa si la ficción justifica una Herida Grave. El número por sí solo no la crea automáticamente.

Como ya no existe oposición activa, la escena puede salir de iniciativa. Si quedaran Sangrado, Heridas Graves, Sostenimientos u otros efectos activos, continuarían según sus propias reglas.

### Resumen rápido del flujo

**Inicio del combate:** posición y percepción -> disparador no percibido si existe -> Iniciativa -> orden de turnos.

**Tu turno:** inicio de turno -> recupera Reacción -> Movimiento y Acción en el orden válido -> efectos de fin de turno.

**Ataque:** declarar -> abrir Reacciones -> tirar contra Defensa -> Protección/Penetración -> daño -> consecuencias.

**Entre tus turnos:** puedes gastar tu Reacción cuando aparezca un disparador válido.

**Nueva ronda:** después de que todos hayan actuado, continúa el mismo orden salvo reglas como Retrasar.

## 9. Armas, armaduras, equipo y suministros

Este capítulo explica **qué hace el equipo durante el juego**. Los precios, Disponibilidad y reglas comerciales completas se encuentran en **Economía, disponibilidad y equipo**.

Un objeto sólo concede los beneficios escritos en su entrada. Llevar dos copias del mismo objeto, varias armaduras o varios escudos no multiplica automáticamente sus beneficios.

### Cómo leer un arma

Cada arma puede indicar:

- **Habilidad:** qué Habilidad de armas se utiliza;
- **Atributo de ataque:** el Atributo habitual de la tirada;
- **Daño:** base antes de Atributo de daño y mitigación;
- **Atributo de daño:** sólo se suma cuando la entrada del arma lo posee;
- **Penetración (Pen):** reduce Protección efectiva;
- **FUE mínima:** requisito físico cuando corresponde;
- **Alcance óptimo:** referencia para armas a distancia;
- **Recarga:** Acciones necesarias antes de volver a disparar cuando se indique;
- **Propiedades:** etiquetas y reglas particulares.

Un ataque ordinario sigue el procedimiento del capítulo de Combate:

**2d10 + Atributo pertinente + Habilidad de arma + modificadores contra Defensa.**

El daño se calcula después del impacto. Una Habilidad alta no cambia por sí sola el Daño, la Penetración, el número de ataques ni las propiedades físicas del arma.

### Propiedades de armas

Algunas propiedades poseen una función mecánica expresa; otras describen construcción o compatibilidad y sólo producen un efecto cuando otra regla las menciona.

| Propiedad | Uso canónico |
|---|---|
| **Ligera** | Arma compatible con Armas Ligeras y con Técnicas que exigen armas Ligeras o compatibles, como Combate Dual. No concede por sí sola un ataque adicional. |
| **Ocultable** | Puede ocultarse físicamente en situaciones donde un arma mayor no podría. No concede un bono numérico universal a Sigilo o Engaño. |
| **Ágil** | Describe un arma maniobrable. No concede actualmente un bono universal a ataque, Defensa o Iniciativa. |
| **Versátil** | Describe un arma utilizable de formas distintas según ficción y Técnica. No posee actualmente un modo alternativo universal de daño. |
| **Impactante** | Describe la naturaleza del golpe y puede importar para objetos, lesiones o ficción. No añade daño o Derribo automáticamente. |
| **Alcance** | Cumple requisitos que mencionan arma de Alcance, como Recibir Carga. No añade por sí sola un número universal de espacios de alcance. |
| **Pesada** | Identifica armamento de gran masa/tamaño y normalmente usa Armas Pesadas. Sus requisitos de FUE, manos y otras propiedades siguen aplicándose. |
| **2 manos** | Requiere ambas manos disponibles para utilizar el arma normalmente. Un objeto sostenido con dos manos recibe además la protección contra Desarmar definida en Escala y maniobras. |
| **Potencia N** | Clasifica la potencia física de un arco. No se suma como un +N adicional. El perfil del arma determina si FUE participa en su daño. |
| **Recarga N** | Después de disparar, requiere N Acciones de Recarga antes del siguiente disparo. Recarga Experta puede reducir ese coste en 1 respetando los mínimos físicos. |
| **Repetición** | Describe un mecanismo de repetición. El núcleo actual no concede ataques adicionales, cargador infinito ni una capacidad universal de ráfaga por esta etiqueta. |

Cuando una propiedad descriptiva deba producir un modificador numérico concreto, esa regla debe aparecer en el arma, Técnica o subsistema pertinente.

### Armas canónicas

| Arma | Daño | Pen | FUE mín. | Precio | Propiedades principales |
|---|---:|---:|---:|---:|---|
| Daga | 3 | 0 | 0 | 6 p | Ligera, Ocultable |
| Espada corta | 4 | 0 | 0 | 1 o | Ligera |
| Sable | 4 | 0 | 0 | 1 o 5 p | Ágil |
| Espada larga | 5 | 0 | 1 | 2 o | Versátil |
| Hacha | 6 | 0 | 2 | 2 o 5 p | Impactante |
| Maza | 5 | 1 | 1 | 1 o | Impactante |
| Martillo de guerra | 6 | 2 | 2 | 3 o | Impactante |
| Lanza | 5 | 0 | 1 | 5 p | Alcance, 2 manos |
| Alabarda | 7 | 1 | 2 | 3 o | Alcance, Pesada, 2 manos |
| Mandoble | 7 | 0 | 2 | 4 o | Pesada, 2 manos |
| Gran hacha | 8 | 0 | 3 | 5 o | Pesada, 2 manos |
| Gran martillo | 7 | 2 | 3 | 5 o | Pesada, 2 manos |
| Arco corto | 4 | 0 | — | 1 o | Potencia 2 |
| Arco largo | 5 | 0 | — | 2 o | Potencia 3, 2 manos |
| Ballesta | 6 | 1 | — | 3 o | Recarga 1 |
| Ballesta pesada | 8 | 2 | — | 5 o | Recarga 2, 2 manos |
| Pistola temprana | 6 | 2 | — | 10 o | Recarga 2 |
| Rifle temprano | 7 | 3 | — | 18 o | Recarga 2, 2 manos |
| Pistola repetidora | 6 | 1 | — | 35 o | Repetición |
| Rifle repetidor | 7 | 2 | — | 45 o | Repetición, 2 manos |

Los arcos pueden añadir FUE al daño cuando el perfil del arma lo establece; **Potencia N no es un bono adicional**. Ballestas y armas de fuego no añaden FUE al daño salvo regla expresa.

### Munición y Recarga

Un ataque con un arma que utiliza munición consume normalmente **1 unidad de munición** cuando el disparo se realiza, acierte o falle.

Unidades comerciales canónicas:

- 20 flechas = **2 p**;
- 20 virotes = **3 p**;
- 12 disparos ordinarios de arma de fuego = **5 p**.

La compra cubre esa cantidad física real. Dividir el lote divide también su valor proporcional.

No existe un porcentaje universal de recuperación de flechas o virotes después de un combate. Pueden recuperarse unidades intactas cuando la ficción, el lugar y el tiempo de búsqueda lo permitan; un proyectil roto, perdido o inaccesible se pierde.

**Recarga N** consume Acciones, no Movimiento. Pueden repartirse las Acciones de Recarga entre turnos si el arma y la situación siguen bajo control del personaje. Una interrupción no borra automáticamente una Acción de Recarga ya completada, salvo que físicamente deshaga el proceso.

### Armaduras

| Armadura | Prot | FUE mín. | Precio |
|---|---:|---:|---:|
| Armadura ligera | 1 | 0 | 1 o 5 p |
| Armadura reforzada | 2 | 0 | 4 o |
| Malla | 3 | 1 | 10 o |
| Armadura pesada | 4 | 2 | 16 o |
| Placas | 5 | 3 | 40 o |

Sólo se aplica la **Protección relevante más alta** entre capas equivalentes salvo regla expresa. Vestir varias armaduras no suma toda su Protección.

Con FUE un punto por debajo del mínimo, Movimiento -1, Carga Pesada y Desventaja en acciones físicas relevantes. Con dos o más puntos por debajo, la armadura no puede usarse competentemente en combate sin una capacidad específica, aunque su material siga ofreciendo Protección cuando corresponda. Una armadura ruidosa puede causar Desventaja a Sigilo cuando el ruido sea relevante.

**Armadura y magia.** Llevar armadura no provoca fallo mágico, penalización a Canalización o penalización a Ritualismo por sí solo. Tierra Mágica no usa una restricción universal de “mago sin armadura”. Las penalizaciones por no cumplir FUE mínima se aplican a las acciones físicas para las que sean relevantes, no automáticamente a una tirada mágica. Un escudo, arma o armadura sólo dificulta un hechizo si la entrada concreta exige manipular un foco, componente, objeto o movimiento que ese equipo haga imposible.

### Escudos

| Escudo | Defensa pasiva | Bloqueo | FUE mín. | Precio | Propiedades |
|---|---:|---:|---:|---:|---|
| Broquel | +1 frontal | — | 0 | 5 p | Sin Bloqueo especial |
| Escudo estándar | +1 frontal | +2 | 0 | 1 o 5 p | Bloqueo mediante Reacción |
| Escudo pesado | +2 frontal | +2 | 2 | 3 o | Movimiento -1; Bloqueo mediante Reacción |

La Defensa pasiva de escudo sólo se aplica cuando el ataque entra por un frente que el escudo puede cubrir. **Bloqueo** es una Reacción independiente y se usa conforme al capítulo de Combate.

Un personaje no suma la Defensa pasiva de varios escudos a la vez. Se usa el escudo pertinente.

La calidad Defectuosa/Común/Superior/Excepcional describe fabricación y propiedades concretas; no concede un +1/+2/+3 universal. **CRAFT-04 — Calidad y modificaciones** define sus costes, requisitos, Capacidad de Modificación y propiedades concretas.

**CRAFT-07 — Runas, piedras y engarces** define la Capacidad Rúnica de equipo Superior/Excepcional, las Runas inscritas y las Piedras de Impronta. Sus efectos no aparecen automáticamente por Calidad.

**CRAFT-08 — Objetos mágicos, encantamientos y sintonización** define Encantamientos autónomos, Reserva Encantada, Hechizos Vinculados, accesorios mágicos y el límite universal de Sintonización.

Las recetas de fabricación de armas, armaduras, escudos, munición y herramientas del catálogo vigente se encuentran en **CRAFT-03 — Armas, armaduras y herramientas**, dentro del capítulo 18.

### Equipo de aventura y herramientas

El equipo ordinario permite realizar tareas que de otro modo serían difíciles o imposibles. Poseer la herramienta apropiada **no concede un bono universal**: habilita el método, satisface un requisito o evita una penalización cuando corresponda.

Precios canónicos de referencia:

| Equipo | Precio | Uso habitual |
|---|---:|---|
| Gancho de escalada | 3 p | asegurar cuerda o una ruta de escalada cuando exista punto válido |
| Palanca | 2 p | aplicar fuerza sobre puertas, tapas, cajas o mecanismos |
| Pico o pala | 2 p | excavar, romper terreno o trabajo de campaña |
| Caja pequeña asegurada | 5 p | proteger y transportar objetos pequeños |
| Catalejo | 1 o | observación a distancia cuando exista línea visual |
| Estuche impermeable de documentos/mapas | 5 p | proteger papeles y mapas de humedad ordinaria |
| Materiales de escritura | 2 p | registrar notas, mapas, cuentas o documentos |
| Repuesto médico, 5 usos | 5 p | reponer consumibles de un Kit Médico |

Un objeto no reemplaza la Habilidad pertinente. Una palanca no convierte automáticamente en posible mover una estructura demasiado pesada; un Kit Médico no sustituye Medicina; un Catalejo no permite ver a través de paredes.

### Kits profesionales

Los Kits reúnen herramientas ordinarias para un campo de trabajo.

| Kit | Precio |
|---|---:|
| Artesano | 1 o |
| Ingeniería de campo | 2 o |
| Minería | 1 o |
| Médico | 2 o |
| Alquimia de campo | 2 o |
| Infiltración | 1 o |
| Cartográfico | 1 o |
| Navegación | 2 o |
| Campaña | 1 o |
| Escalada | 1 o |
| Escribanía | 5 p |
| Mercantil | 1 o |
| Académico | 2 o |
| Instrumental Arcano de campo | 2 o |
| Mantenimiento de armas de fuego | 1 o |

Un Kit representa **herramientas reutilizables**, no una reserva infinita de consumibles. Si una tarea consume vendas, reactivos, combustible, munición u otro material, ese recurso debe existir por separado.

Cuando un Kit es esencial para una tarea profesional, carecer de él puede volver la acción imposible o exigir un método alternativo, no simplemente imponer siempre un -1 o -2.

### Raciones, provisiones y combustible

Las distancias diarias, forraje, agua, campamento y efectos de viajar fuera de caminos se explican en **Viajes y desplazamiento de larga distancia**, dentro del capítulo 6.

**Provisiones 7 días — 2 p** representa siete raciones diarias de comida conservable para **un viajero ordinario** durante condiciones normales.

- una jornada ordinaria consume 1 ración;
- compartir provisiones divide los días disponibles entre quienes las consumen;
- no incluye automáticamente agua potable cuando el acceso al agua sea un problema relevante;
- no incluye alimento especial para criaturas con necesidades extraordinarias;
- no recupera Vida, Maná ni Fatiga por sí sola.

El núcleo no utiliza una tabla universal de hambre o sed. Quedarse sin alimento o agua importa cuando la escena, viaje o entorno lo convierten en un riesgo: puede exigir Supervivencia, producir Fatiga u otras consecuencias ambientales coherentes. No causa automáticamente una cantidad fija de daño por día.

**Combustible de iluminación 5 noches — 2 p** representa combustible suficiente para cinco noches de uso personal ordinario de una fuente compatible. No equivale a cinco días continuos de funcionamiento industrial.

Una fuente de luz sólo ilumina si existe un objeto compatible —lámpara, farol u otro dispositivo—; comprar combustible no crea ese objeto.

### Consumibles, pociones y fórmulas

Un consumible existe como **cantidad física**. Conocer una Fórmula no crea dosis.

Reglas generales:

- usar una dosis consume esa dosis;
- si su Activación es Acción, consume la Acción;
- una dosis no puede utilizarse dos veces;
- Saturación se aplica cuando la Fórmula indique familia Saturante;
- un precio **Sin precio establecido** no significa gratis.

Fórmulas de referencia:

| Consumible | Uso |
|---|---|
| Bálsamo Restaurador | recupera 4 Vida; no reduce Trauma ni repara Herida Grave |
| Poción Restauradora | Acción; recupera 4 Vida hasta máximo y límites de lesión |
| Poción de Recuperación Arcana | Acción; recupera 3 Maná hasta máximo; no elimina Fatiga ni Sobrecarga |
| Tónico de Vigor | Ventaja en una prueba de VIG por esfuerzo prolongado |
| Supresor del Dolor | ignora una Desventaja causada por dolor compatible; no cura la lesión |
| Neutralizante Común | nueva resistencia con Ventaja contra una toxina compatible |
| Toxina Debilitante | VIG DF14; con fallo, Desventaja en acciones físicas dependientes de fuerza muscular |
| Bomba Incendiaria | área pequeña; Daño 6, Pen 1; requiere colocación válida |

Sus precios monetarios permanecen **sin establecer** hasta ratificación específica; no se convierten precios históricos por inferencia.

### Dispositivos arcano-industriales

Un dispositivo es equipo físico, no una extensión gratuita del Maná personal.

Para activarlo deben cumplirse:

- Energía disponible suficiente;
- Consumo <= Energía;
- Consumo <= Caudal;
- estado operativo;
- Acción o Reacción requerida;
- cualquier requisito propio del dispositivo.

La activación reduce Energía. Un dispositivo no concede Acciones adicionales salvo regla expresa.

Ejemplos: lámparas arcanas, herramientas motorizadas, visor espectral, estabilizador de tiro, cámara de penetración, propulsor de impacto, prótesis motorizadas, escudo de campo, arnés de carga y autómatas auxiliares. **CRAFT-09 — Ingeniería y dispositivos** completa sus perfiles de fabricación, Energía, Caudal, recarga y módulos; el marco conceptual permanece en **Ingeniería arcano-industrial**.

### Llevar, guardar y acceder al equipo

El núcleo actual **no utiliza una fórmula universal de peso, espacios de inventario o capacidad de carga**.

Se supone que un personaje puede portar un equipo personal razonable para su Escala y FUE. Cuando una carga es evidentemente excesiva:

- puede necesitar transporte, montura, vehículo o ayuda;
- puede requerir Atletismo si la incertidumbre es significativa;
- puede ser físicamente imposible;
- no se resuelve inventando una penalización numérica universal.

La ficción importa también para acceder al equipo. Un arma envainada, una poción dentro de una mochila cerrada o una herramienta guardada no son idénticos a un objeto ya preparado en la mano. Cuando el acceso durante combate sea relevante y ninguna regla específica indique otra cosa, el DJ adjudica el coste a partir de Acción/Movimiento y de la complejidad real de la manipulación, sin crear Acciones gratuitas.

### Comprar y vender equipo

La moneda usa:

- 10 c = 1 p;
- 10 p = 1 o;
- 100 c = 1 o.

Precio, Disponibilidad y acceso son independientes. Tener dinero suficiente no garantiza encontrar un objeto Raro, Restringido o Excepcional.

La **venta rápida** utiliza 25% del Valor Aplicable definido por CRAFT-02. La venta directa no tiene una tasa universal; alrededor de 50% del Valor Aplicable es sólo una referencia posible cuando existe comprador. Estado, reparación, Encargos y desmantelamiento se resuelven en el capítulo 18.

Durante creación, PEI es presupuesto y **no dinero**. Después de comenzar el juego, el equipo se compra con moneda, fabricación, recompensa u otra fuente física válida.

### Ejemplo de preparación para una expedición

Una exploradora compra:

- arco largo: 2 o;
- 20 flechas: 2 p;
- armadura ligera: 1 o 5 p;
- Kit Cartográfico: 1 o;
- Kit de Escalada: 1 o;
- Provisiones para 7 días: 2 p;
- combustible de iluminación para 5 noches: 2 p;
- estuche impermeable de mapas: 5 p.

Total: **6 o 6 p**.

Ese equipo no concede bonos ocultos. El arco usa sus estadísticas; la armadura concede Protección 1; los Kits habilitan sus métodos apropiados; las flechas, provisiones y combustible se consumen físicamente cuando se utilizan.

## 10. Vida, heridas, Trauma y recuperación

La Vida máxima es 10 + 2xVIG. Llegar a 0 Vida causa **Incapacitado**, no muerte automática. Para un personaje orgánico, la primera caída pertinente desde Vida positiva a 0 mientras tiene Trauma 0 eleva Trauma a 1. Golpear repetidamente a una criatura ya en 0 no incrementa Trauma de manera automática. Una lesión deliberadamente grave, una ejecución o una fuerza devastadora pueden producir consecuencias mayores según la ficción.

El **umbral de Daño Grave = 5 + VIG**, exactamente la mitad de la Vida máxima ordinaria. Es una señal para evaluar una lesión, no una orden de crearla automáticamente.

### Caídas

Una caída ordinaria de **1 espacio o menos** no causa daño por sí sola salvo que la superficie sea especialmente peligrosa.

A partir de 2 espacios:

**Daño de caída = 2 × (espacios efectivos de caída - 1).**

Ejemplos antes de mitigaciones especiales:

| Caída | Daño |
|---:|---:|
| 1 espacio | 0 |
| 2 espacios | 2 |
| 3 espacios | 4 |
| 4 espacios | 6 |
| 6 espacios | 10 |
| 8 espacios | 14 |
| 12 espacios | 22 |

#### Caída controlada

Una criatura consciente, capaz de reaccionar y con espacio corporal suficiente puede intentar amortiguar la caída con **AGI + Acrobacia**.

La DF es:

**DF = min(24, 10 + 2 × max(0, espacios de caída - 2)).**

Si tiene éxito, reduce los espacios efectivos antes de calcular daño:

- éxito Ajustado: -1 espacio;
- éxito Claro: -2 espacios;
- éxito Dominante: -3 espacios.

Una caída voluntaria o un salto preparado también puede usar esta regla si existe una forma razonable de aterrizar. Estar Agarrado, inmovilizado, Colapsado o caer de forma totalmente inesperada puede impedir la prueba.

#### Superficie y Protección

Una superficie especialmente favorable —red, nieve profunda, acolchado, vegetación densa u otra amortiguación real— puede reducir normalmente entre 1 y 3 espacios efectivos. Una superficie peligrosa puede añadir una consecuencia separada.

El agua **no elimina automáticamente** el daño de una caída desde gran altura.

La Protección de una armadura ordinaria **no reduce el daño de caída**. Sólo una fuente que proteja de manera pertinente contra impactos, fuerza cinética, caídas o daño físico amplio puede reducirlo cuando su descripción sea compatible.

Después de aplicar el daño:

- se compara normalmente con el umbral de Daño Grave;
- una lesión compatible puede producir una Herida Grave;
- llegar a 0 Vida causa Incapacitado y aplica Trauma según las reglas ordinarias.

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

La magia usa las mismas reglas fundamentales de Acción, Reacción, objetivos y oposición que el resto del sistema, pero añade **Maná, competencia mágica, Método y Sostenimiento**.

No existe un Atributo de Magia separado. Sus Fuentes son **Alma, Divina, Ambiental y Externa**. Sus seis Disciplinas son **Evocación, Alteración, Restauración, Percepción, Influencia y Conjuración**.

**Canalización** representa el dominio práctico del lanzamiento Directo. **Ritualismo** es una Habilidad independiente utilizada por el Método Ritual.

El Maná máximo es:

**6 + 3xVOL.**

Costes de referencia:

| Grado | Maná de referencia |
|---|---:|
| Truco | 0–1 |
| Menor | 2 |
| Básico | 3–4 |
| Avanzado | 5–7 |
| Maestro | 8–11 |
| Legendario | 12+ |

### Competencia operativa

Para lanzar un hechizo no basta con conocerlo: el personaje debe poseer la competencia operativa mínima del Método correspondiente.

| Grado | Rango mínimo |
|---|---|
| Truco | Entrenado |
| Menor | Entrenado |
| Básico | Entrenado |
| Avanzado | Experto |
| Maestro | Maestro |
| Legendario | Gran Maestro |

Método **Directo** → usa Canalización.  
Método **Ritual** → usa Ritualismo.

En forma resumida: **Truco, Menor y Básico requieren Entrenado; Avanzado requiere Experto; Maestro requiere Maestro; Legendario requiere Gran Maestro.**

Los requisitos adicionales del hechizo —por ejemplo Medicina, un Ancla o un vínculo válido— se cumplen además de la competencia operativa.

### Acción, Reacción y Ritual

La mayoría de los hechizos Directos de combate consumen **la Acción**.

Un hechizo que indique **Reacción** consume la Reacción en lugar de la Acción y sólo puede utilizarse cuando ocurre su disparador válido. Barrera Cinética es el ejemplo canónico.

Un hechizo de Método **Ritual** conserva el procedimiento y Tiempo de Ritualismo. No se comprime en una Acción de combate salvo que una regla lo diga expresamente.

Lanzar un hechizo válido y fallar su tirada **consume igualmente la Acción o Reacción utilizada y el Maná pagado**. Una declaración inválida que no supera las comprobaciones previas de objetivo, competencia o requisitos no inicia el lanzamiento y no debe consumir recursos.

### Magia bajo presión: cuerpo a cuerpo, Presas, armadura y daño

**Estar frente a frente con un enemigo no penaliza el lanzamiento por sí solo.** Lanzar un hechizo Directo estando adyacente o en alcance cuerpo a cuerpo:

- no provoca un Ataque de Oportunidad universal;
- no impone Desventaja automática;
- no permite Parada contra el hechizo salvo que una regla diga que ese efecto es parable;
- sigue permitiendo Reacciones mágicas o defensivas que tengan un disparador válido.

Tierra Mágica tampoco posee componentes verbales, somáticos o de mano libre **universales**. Un personaje puede Canalizar llevando arma, escudo o armadura salvo que el hechizo, Ritual, foco, dispositivo o situación exija expresamente una manipulación incompatible.

**Agarrado.** Estar Agarrado no impide automáticamente lanzar magia. El personaje conserva Movimiento 0 para alejarse de la Presa y se aplican las restricciones físicas normales de Agarrado. Si un hechizo exige una manipulación concreta que la Presa hace difícil, puede sufrir Desventaja; si la Presa la vuelve físicamente imposible, el lanzamiento es inválido. La mera existencia de una Presa no añade una penalización mágica universal.

**Armadura.** Llevar armadura, incluso pesada, no produce fallo arcano ni penalización mágica automática. No cumplir la FUE mínima de la armadura afecta las acciones físicas pertinentes, no Canalización o Ritualismo por sí solos.

**Recibir daño.** Recibir daño no exige una tirada universal de “concentración” y no rompe automáticamente un Sostenimiento. Un efecto Sostenido termina por sus reglas normales: duración, abandono, reemplazo, límite de Sostenimiento o una condición que lo haga imposible.

**Incapacitado o Inconsciente.** Una criatura Incapacitada o Inconsciente no puede mantener efectos Sostenidos demandantes. Al entrar en uno de esos estados, sus Sostenimientos demandantes terminan inmediatamente y no reaparecen al recuperarse; deben lanzarse de nuevo.

Si una Reacción o interrupción válida deja al lanzador Incapacitado **antes de que el hechizo Directo termine de resolverse**, el hechizo no produce su efecto; los costes ya comprometidos permanecen gastados.

### Lanzar un hechizo Directo, paso a paso

Éste es el procedimiento general.

#### 1. Declara el hechizo

El jugador indica:

- qué hechizo utiliza;
- qué objetivo, objetivos, área o punto elige;
- desde qué origen se lanza si existe una regla especial;
- cualquier elección que el hechizo exija antes de resolverlo.

No se puede esperar al resultado de la tirada para decidir retrospectivamente el objetivo o una opción que debía declararse antes.

#### 2. Comprueba que el lanzamiento sea válido

Antes de gastar recursos se comprueba:

- que el personaje conoce o posee el hechizo;
- que cumple la competencia operativa mínima;
- que cumple requisitos adicionales;
- que el objetivo o número de objetivos es válido;
- que el alcance y la línea de efecto son posibles;
- que el origen elegido es legal;
- que la criatura puede actuar y no está impedida por una condición;
- que dispone de Acción o Reacción según la activación.

Si cualquiera de estas condiciones invalida el lanzamiento, el intento se detiene antes de pagar Maná.

#### 3. Comprueba y paga el Maná

Si el personaje posee Maná suficiente, paga el coste completo.

El Maná se gasta aunque después:

- la tirada falle;
- el objetivo resista;
- Contramagia interfiera el lanzamiento;
- un ataque mágico no alcance la Defensa;
- el efecto no consiga afectar a ningún objetivo de un área.

No existe devolución universal de Maná por fallo.

Si falta exactamente 1 Maná y se cumplen las condiciones de **Sobrecarga**, se utiliza el procedimiento de Sobrecarga descrito más adelante.

#### 4. Abre la ventana de Reacciones mágicas

Una vez que existe un lanzamiento válido y comprometido, pero antes de resolver su efecto, pueden declararse Reacciones cuyo disparador corresponda.

La principal es **Contramagia**.

Contramagia:

- se declara después de que exista un lanzamiento identificable;
- se resuelve antes del efecto final;
- consume la Reacción del usuario;
- requiere compatibilidad narrativa y mágica;
- no cancela automáticamente cualquier hechizo;
- no devuelve automáticamente el Maná ya comprometido.

El sistema todavía no posee una fórmula universal de tirada/DF para Contramagia. Su interferencia concreta sigue siendo contextual salvo que una capacidad o escenario establezca una resolución específica.

#### 5. Determina si hace falta una tirada

Un hechizo conocido, seguro y rutinario **no tira sólo por ser mágico**.

Se realiza una tirada cuando exista:

- una Defensa que superar;
- una DF indicada por el hechizo;
- oposición relevante;
- incertidumbre significativa;
- una consecuencia que dependa de una prueba.

Cuando no existe ninguna de esas circunstancias, el lanzamiento puede resolverse automáticamente después de pagar sus costes y cumplir sus requisitos.

#### 6. Determina Atributo, Habilidad y oposición

Un hechizo Directo con tirada usa normalmente:

**2d10 + Atributo relevante + Canalización.**

Un Ritual usa:

**2d10 + Atributo relevante + Ritualismo**

cuando el procedimiento ritual exige prueba.

La oposición depende del efecto:

| Tipo de efecto | Oposición habitual |
|---|---|
| Ataque físico o energético | Defensa |
| Influencia o intrusión mental | Defensa Mental |
| Alteración directa del organismo | Defensa Corporal |
| Maniobra espacial, percepción o efecto técnico | DF del hechizo cuando corresponda |
| Uso seguro, conocido y sin oposición | normalmente sin tirada |

Una tirada ofensiva mágica exitosa **no genera una segunda resistencia** salvo que una regla lo diga expresamente.

#### 7. Tira y compara

Si el total iguala o supera la Defensa o DF aplicable, el efecto tiene éxito contra ese objetivo.

Si falla:

- el efecto no afecta a ese objetivo;
- el Maná permanece gastado;
- la Acción/Reacción permanece gastada;
- un hechizo Sostenido nuevo no entra en Sostenimiento;
- una instancia Sostenida anterior del mismo hechizo no desaparece sólo porque el relanzamiento haya fallado.

#### 8. Aplica el efecto

Después del éxito se resuelve lo que el hechizo indique:

- daño;
- curación;
- desplazamiento;
- condición;
- ilusión;
- transformación;
- invocación;
- información;
- protección;
- otro efecto específico.

Un hechizo sólo hace lo que su entrada define. No se añaden automáticamente efectos secundarios por ser de una Disciplina determinada.

#### 9. Si es Sostenido, registra el Sostenimiento

Sólo un lanzamiento exitoso puede iniciar o reemplazar un efecto Sostenido.

El límite normal es **1 efecto Sostenido demandante**. Doble Sostenimiento permite **2**.

Si un nuevo efecto Sostenido entra con éxito y se supera el límite, se abandona el efecto más antiguo necesario para volver al límite.

Si se relanza con éxito el **mismo hechizo Sostenido**, la nueva instancia reemplaza la anterior: no se crean dos copias concurrentes del mismo efecto.

### Hechizos con objetivo único

Un hechizo de objetivo único requiere una criatura u objeto válido cuando su entrada así lo indique.

Procedimiento:

1. declarar el objetivo;
2. comprobar alcance, línea y requisitos;
3. pagar Maná;
4. abrir Reacciones pertinentes;
5. realizar una única tirada si corresponde;
6. comparar contra la Defensa o DF;
7. aplicar el efecto sólo si tiene éxito.

Ejemplo: Proyectil Ígneo usa una tirada de INT + Canalización contra la Defensa del objetivo.

### Hechizos multiobjetivo

Un hechizo con varios objetivos declara todos sus objetivos válidos antes de resolverlo.

No se convierte automáticamente en un área.

Por ejemplo, Arco Fulminante selecciona hasta 3 objetivos y aplica sus requisitos de encadenamiento. La misma resolución del hechizo determina qué objetivos son afectados según sus Defensas.

Si el hechizo establece un máximo de objetivos, no puede superarse pagando Maná adicional salvo regla expresa.

### Hechizos de área

Un área usa **una sola resolución de lanzamiento**.

El total se compara por separado con la Defensa pertinente de cada criatura del área.

Consecuencias:

- algunas criaturas pueden ser afectadas y otras no;
- los aliados también son afectados salvo discriminación explícita;
- un Actor sólo recibe una vez la misma resolución aunque esté representado por varios tokens;
- el Maná se paga una sola vez por el lanzamiento, no por objetivo.

### Daño mágico, Protección y Penetración

Los hechizos con daño utilizan las mismas reglas generales de daño físico cuando corresponda.

**Protección efectiva = max(0, Protección - Penetración).**

**Daño final = max(0, daño base + bonos permitidos - Protección efectiva).**

El hechizo especifica si añade algún Atributo al daño. No se añade uno por defecto sólo porque la tirada haya usado INT, PRE, PER u otro Atributo.

La Penetración nunca vuelve negativa la Protección.

### Curación mágica

La curación respeta:

- Vida máxima;
- límites de lesión;
- Heridas Graves;
- Trauma;
- restricciones específicas del hechizo.

Recuperar Vida no reduce Trauma automáticamente.

Cierre Restaurador, por ejemplo, requiere un objetivo válido, recupera 4 Vida y puede detener Sangrado ordinario compatible, pero no repara automáticamente una Herida Grave ni reduce Trauma.

### Influencia mental

Cuando una criatura puede resistir una influencia, la oposición habitual es:

**PRE + Canalización contra Defensa Mental.**

Un éxito no concede capacidades que el hechizo no describa.

El grimorio ordinario no contiene Dominación total, órdenes suicidas, pérdida repetida de Acción, reescritura arbitraria de personalidad ni borrado arbitrario de memoria.

### Ilusiones

Una ilusión engaña la percepción; no crea materia ni fuerza física salvo regla expresa.

La potencia determinista de una ilusión persistente es:

**DF de Ilusión = 11 + Atributo usado al lanzar + bono de Canalización.**

No se almacena una tirada especialmente alta para volver la ilusión más difícil de detectar.

Una criatura examina una ilusión cuando existe:

- motivo para sospechar;
- contradicción física relevante;
- una capacidad que habilite el examen.

Revelación Sensorial concede Ventaja a ese examen.

### Sostenimiento

El límite normal es **1 efecto Sostenido demandante**.

**Doble Sostenimiento** permite 2.

Reglas:

- un lanzamiento fallido nunca entra en Sostenimiento;
- el Maná de un lanzamiento fallido no se devuelve;
- relanzar con éxito el mismo hechizo reemplaza su instancia anterior;
- relanzarlo y fallar no elimina la instancia anterior;
- un nuevo Sostenido exitoso por encima del límite obliga a abandonar el más antiguo necesario;
- no existe una tirada para exceder el límite.

Abandonar un Sostenimiento termina el efecto cuando su descripción no diga otra cosa.

### Sobrecarga, paso a paso

Sobrecarga sólo existe si:

- al personaje le falta **exactamente 1 Maná** para pagar el hechizo;
- conserva al menos **1 Maná**;
- cumple todos los demás requisitos;
- no está Colapsado.

Procedimiento:

1. declara un lanzamiento válido;
2. comprueba que falta exactamente 1 Maná;
3. gasta **todo el Maná restante**;
4. tira **2d10 + VOL + Canalización contra DF 17**;
5. si falla, el hechizo no se produce;
6. si tiene éxito, el lanzamiento continúa y se resuelve normalmente contra cualquier Defensa/DF propia del hechizo;
7. el personaje queda Exhausto;
8. si ya estaba Exhausto antes de Sobrecargar, queda Colapsado después de resolver.

Si falla la Sobrecarga:

- no se produce el hechizo;
- no se devuelve Maná;
- el personaje queda Exhausto o Colapsado según su estado previo;
- una Pifia puede añadir una consecuencia mágica grave contextual.

Superar la tirada de Sobrecarga **no significa impactar automáticamente** a un objetivo. Sólo permite que el hechizo se produzca pese a la insuficiencia de Maná; si el hechizo es ofensivo, todavía se resuelve su oposición normal.

### Origen Remoto

Origen Remoto permite utilizar la posición de un Familiar válido como **origen geométrico** de un hechizo compatible.

No significa que el personaje se encuentre allí.

Procedimiento:

1. el Familiar debe estar vinculado, operativo y situado válidamente;
2. el personaje declara Origen Remoto antes de resolver el lanzamiento;
3. el hechizo utiliza la posición del Familiar para geometría compatible;
4. el personaje sigue pagando el Maná;
5. el personaje realiza la tirada;
6. el personaje sigue ocupando su posición real;
7. Sostenimiento y demás límites siguen perteneciendo al personaje.

Origen Remoto no concede:

- percepción automática desde el Familiar;
- conocimiento de objetivos que el personaje no posee;
- línea de efecto imposible;
- alcance sensorial gratuito;
- desplazamiento del personaje.

No es compatible con hechizos cuyo efecto principal:

- traslada al propio lanzador;
- utiliza al lanzador como extremo de una conexión espacial;
- abre una conexión espacial,

salvo autorización expresa.

Paso Breve, Trasposición, Salto Vinculado, Umbral, Portal y Gran Traslación no son compatibles con Origen Remoto.

### Hechizos reactivos

Un hechizo con activación **Reacción** sigue pagando Maná y sólo puede utilizarse si su disparador es válido.

Ejemplo: Barrera Cinética.

1. un ataque válido es declarado;
2. antes de resolverlo, el defensor declara Barrera Cinética;
3. gasta su Reacción;
4. paga 3 Maná;
5. obtiene +2 Defensa normal contra ese ataque;
6. el ataque se resuelve;
7. Barrera se consume para esa resolución.

No se guarda el +2 para un ataque posterior.

### Contramagia

Contramagia es una Técnica Avanzada de 3 PD.

Su ventana es:

**después de comprometer un lanzamiento válido y antes de resolver su efecto.**

Contramagia consume la Reacción del usuario.

No existe todavía una fórmula universal de:

- tirada;
- DF;
- modificador;
- cancelación automática.

Por tanto, sólo se utiliza cuando la ficción y la compatibilidad mágica permiten una interferencia adjudicable. Una futura regla más precisa debe incorporarse primero a este Manual.

### Rituales y combate

Los hechizos de Método Ritual utilizan Ritualismo y conservan su Tiempo correspondiente.

No se transforman en hechizos de una Acción por estar dentro de una ronda.

Si un Ritual comienza o continúa durante una escena de combate:

- el tiempo real del Ritual sigue contando;
- interrupciones, peligro y participantes se resuelven según Ritualismo;
- el Director sigue siendo único;
- asistentes no crean tiradas principales adicionales;
- un combate no reduce horas o minutos de Ritual a un turno salvo regla expresa.

### Ejemplo completo: tres turnos de un canalizador

Este ejemplo muestra un ataque mágico, una Reacción mágica, un hechizo Sostenido y Sobrecarga.

Los valores de dados son ilustrativos.

**Nara**, canalizadora:
- INT 3;
- VOL 2;
- Canalización Experta: +4;
- bonificador habitual de lanzamiento Directo con INT: **+7**;
- Maná inicial: **10**;
- conoce Proyectil Ígneo, Piel Alterada y Onda de Choque.

**Rival arcano**:
- Defensa 13;
- Protección 1;
- conoce Barrera Cinética;
- conserva su Reacción al comenzar el ejemplo.

#### Turno 1 — Proyectil Ígneo y Barrera Cinética

Nara declara Proyectil Ígneo contra el Rival.

1. comprueba que el objetivo es válido y está a alcance Medio;
2. posee Canalización suficiente para un hechizo Básico;
3. paga **3 Maná**: pasa de 10 a **7**;
4. el Rival utiliza su Reacción en **Barrera Cinética** y paga sus 3 Maná;
5. Barrera concede +2 Defensa para ese ataque: Defensa 13 pasa a **15**;
6. Nara tira **2d10 + 7**;
7. obtiene 7 en los dados: total **14**;
8. 14 no alcanza Defensa 15: Proyectil Ígneo falla;
9. Nara no recupera los 3 Maná gastados;
10. el Rival ya gastó su Reacción y la Barrera no queda guardada.

El ataque habría alcanzado Defensa 13 sin Barrera, pero la Reacción mágica lo evita.

#### Turno 2 — Piel Alterada y Sostenimiento

Al comenzar su turno siguiente, Nara dispone otra vez de Acción y su Reacción propia.

Declara **Piel Alterada** sobre sí misma para protegerse contra una categoría de daño físico coherente.

1. cumple competencia y requisitos;
2. paga **4 Maná**: pasa de 7 a **3**;
3. no existe oposición ni incertidumbre significativa;
4. no realiza tirada sólo por ser magia;
5. Piel Alterada tiene éxito automáticamente;
6. obtiene Protección 2 contra la categoría declarada;
7. como el hechizo es Sostenido, entra en su único espacio normal de Sostenimiento.

Mientras mantenga Piel Alterada, Nara puede seguir actuando normalmente. Sostener el hechizo no consume automáticamente su Acción cada turno.

#### Turno 3 — Onda de Choque mediante Sobrecarga

Nara conserva sólo **3 Maná**, pero Onda de Choque cuesta 4.

Le falta exactamente 1, conserva al menos 1 y no está Colapsada, por lo que puede intentar Sobrecarga.

1. declara Onda de Choque y su área frontal;
2. comprueba objetivos, geometría y que el lanzamiento es válido;
3. gasta sus **3 Maná restantes**: queda en 0;
4. tira Sobrecarga: **2d10 + VOL 2 + Canalización 4**, total +6, contra DF 17;
5. obtiene 11 en los dados: total **17**;
6. la Sobrecarga tiene éxito y Nara queda Exhausta;
7. Onda de Choque todavía debe resolverse normalmente;
8. Nara tira su lanzamiento ofensivo con su bonificador habitual +7;
9. obtiene 9 en los dados: total **16**;
10. el total se compara por separado con la Defensa de cada criatura del área;
11. una criatura con Defensa 13 es afectada; otra con Defensa 17 no;
12. sobre el objetivo afectado, Onda causa Daño 4, Penetración 0;
13. si tiene Protección 1, el daño final es **3**.

La Sobrecarga permitió producir el hechizo, pero no convirtió automáticamente la tirada ofensiva en éxito.

Piel Alterada continúa Sostenida porque Onda de Choque no es Sostenida. Nara, ahora Exhausta, aplica además los efectos normales de ese estado, incluido Movimiento -2, mínimo 1.

### Resumen rápido del lanzamiento mágico

**Declarar** -> comprobar competencia/requisitos/objetivos/alcance -> **pagar Maná** -> abrir Reacciones como Contramagia -> determinar si hay tirada -> tirar contra Defensa/DF -> aplicar efecto -> registrar Sostenimiento si corresponde.

**Fallo válido:** Acción/Reacción y Maná gastados; no hay efecto nuevo.

**Sin oposición real:** el hechizo puede resolverse sin tirada.

**Área:** una tirada, comparación contra cada Defensa.

**Sostenido:** sólo entra con éxito; límite 1, o 2 con Doble Sostenimiento.

**Sobrecarga:** sólo si falta exactamente 1 Maná; VOL + Canalización DF 17 antes de la resolución normal.

**Ritual:** usa Ritualismo y su Tiempo; no se comprime en una Acción.

## 12. Grimorio canónico

El catálogo mecánico canónico está formado por **60 hechizos**. Nombres históricos, variantes de diseño, trucos no ratificados o entradas antiguas no crean hechizos adicionales ni versiones gratuitas. Un efecto nuevo sólo entra en el catálogo cuando se define aquí con coste, objetivo, alcance, duración, resistencia y límites suficientes.

Los costes de PD por Grado son los definidos en Magia: Menor 1 PD, Básico 2 PD, Avanzado 3 PD, Maestro 5 PD y Legendario 8+ PD. La competencia operativa mínima sigue dependiendo del Método: Directo usa Canalización y Ritual usa Ritualismo.

### Evocación

| Hechizo | Grado | Maná | Resolución canónica |
|---|---:|---:|---|
| Luz Arcana | Menor | 2 | Crea luz arcana real en un punto u objeto a hasta 3 espacios; ilumina aproximadamente 4 espacios durante una Escena. No revela invisibilidad, no ciega y no detecta magia. |
| Proyectil Ígneo | Básico | 3 | INT + Canalización contra Defensa; alcance Medio; Daño 5, Pen 1. |
| Onda de Choque | Básico | 4 | Área frontal corta; Daño 4, Pen 0; una tirada se compara con la Defensa de cada objetivo. Empuja 1 espacio cuando corresponda; aliados incluidos salvo discriminación expresa. |
| Barrera Cinética | Básico | 3 | Reacción; +2 Defensa normal sólo contra el ataque declarado; se consume al resolverlo. |
| Aguja Gélida | Avanzado | 5 | INT + Canalización contra Defensa; alcance Medio; Daño 5, Pen 1. Si impacta, Movimiento -2 hasta el final del siguiente turno del objetivo, mínimo 1. No se acumula; repetir refresca. |
| Arco Fulminante | Avanzado | 6 | INT + Canalización contra Defensa; Daño 4, Pen 1. Cadena selectiva de hasta 3 objetivos; cada objetivo posterior debe estar a 3 espacios o menos del anterior. Un Actor sólo recibe un impacto. |
| Martillo Cinético | Avanzado | 5 | INT + Canalización contra Defensa Corporal; alcance Medio; Daño 3. Desplaza 2 espacios a Escala igual/menor, 1 a una categoría mayor y 0 a dos o más categorías mayor o anclada. |
| Pantalla Cinética | Maestro | 8 | Sostenida, máximo una Escena. Pantalla de hasta 3 espacios que cuenta como cobertura cinética +2 Defensa contra ataques que la atraviesan. No se acumula con cobertura equivalente y no es pared física. |
| Rayo de Ruptura | Maestro | 10 | Línea de 8 espacios; Daño 8, Pen 4. Afecta a todas las criaturas de la línea, aliados incluidos. |
| Tormenta Arcana | Legendario | 12 | Punto a alcance Medio, radio 3 espacios; Daño 8, Pen 2. Una resolución contra la Defensa de cada criatura; aliados incluidos. No deja daño persistente. |

### Alteración

| Hechizo | Grado | Maná | Resolución canónica |
|---|---:|---:|---|
| Respiración Adaptada | Menor | 2 | Sostenido. Adapta la respiración a aire o agua compatible. No protege de toxinas, presión, temperatura u otros peligros ambientales. |
| Potencia Sobrenatural | Básico | 4 | Sostenido. Permite interactuar físicamente como una categoría de Escala mayor; no aumenta FUE, daño, Defensa, tamaño ni alcance. |
| Piel Alterada | Básico | 4 | Sostenido. Protección 2 contra una categoría coherente declarada; no se acumula con armadura equivalente. |
| Adherencia | Básico | 3 | Sostenido. Permite desplazarse por paredes y techos físicamente compatibles sin aumentar Movimiento. Superficies móviles, frágiles o sobrenaturales pueden exigir prueba contextual. |
| Morfología Flexible | Básico | 4 | Sostenido. Permite deformarse para huecos estrechos y facilita escapar de restricciones compatibles. No cambia Escala, ocupación, alcance ni fuerza y no escapa automáticamente de una Presa. |
| Miembro Efímero | Avanzado | 5 | Sostenido. Crea un miembro adicional para sostener o manipular. No concede Acción, Reacción, ataque adicional ni beneficio mecánico extra de escudo. |
| Cuerpo Mineral | Avanzado | 6 | Sostenido. Protección 3 contra daño físico ordinario y Movimiento -2. No se acumula con armadura equivalente ni con Piel Alterada equivalente. |
| Fase Parcial | Avanzado | 7 | Acción. Durante el Movimiento asociado permite cruzar una barrera sólida de hasta 1 espacio de espesor. Debe terminar en espacio válido y libre; no es teletransporte ni permite permanecer dentro de materia. |
| Morfología Alada | Maestro | 8 | Sostenida, máximo una Escena. Permite volar hasta el Movimiento normal. No duplica Movimiento, no concede maniobrabilidad perfecta, inmunidad a caídas ni capacidad de ignorar peso. |
| Transmutación Corpórea | Legendario | 12 | Sostenida, máximo una Escena. Adopta una Morfología Legendaria registrada: Escala +/-1 como máximo y hasta 2 Adaptaciones Mayores predefinidas. No concede conocimientos, Habilidades, hechizos, Maná, Reacciones ni poderes no registrados. |

### Restauración

| Hechizo | Grado | Maná | Resolución canónica |
|---|---:|---:|---|
| Conservación Orgánica | Menor | 2 | Preserva tejido, órganos o un cuerpo frente a degradación natural durante 24 horas. No cura, resucita ni mantiene indefinidamente con vida. |
| Cierre Restaurador | Básico | 3 | Objetivo único. Recupera 4 Vida y detiene Sangrado ordinario compatible; no reduce Trauma ni repara automáticamente Herida Grave. |
| Transferencia Vital | Básico | 4 | Objetivo único. El lanzador pierde hasta 3 Vida y el objetivo recupera exactamente esa cantidad. El lanzador no puede quedar por debajo de 1 Vida; Protección no reduce la pérdida. |
| Regeneración | Avanzado | 6 | Método Ritual; INT + Ritualismo; DF 16 cuando corresponda; requiere Medicina Entrenada. Repara una Herida Grave orgánica compatible. |
| Círculo Restaurador | Avanzado | 6 | Hasta 3 criaturas cercanas recuperan 2 Vida cada una. No detiene Sangrado ni repara Heridas Graves. |
| Restauración Funcional | Avanzado | 7 | Objetivo único; Sostenida, máximo una Escena. Suspende una penalización mecánica compatible de una Herida Grave. No cura la Herida, reduce Trauma, regenera partes ausentes ni vuelve posible una función inexistente. |
| Reconstrucción | Maestro | 10 | INT; DF 20 cuando corresponda; requiere Medicina. Reconstrucción extraordinaria de daño orgánico compatible; no resurrección. |
| Matriz Vital | Maestro | 9 | Objetivo único; Sostenida, máximo 3 rondas. Recupera 2 Vida al final de cada ronda, hasta 3 pulsos. No pulsa al lanzar, no gana pulsos al reaplicar, termina a 0 Vida y no levanta desde 0. |
| Renovación Integral | Legendario | 14 | Método Ritual; INT + Ritualismo; DF 23; requiere Medicina Experta. Recupera 10 Vida y repara hasta 2 Heridas Graves orgánicas compatibles. No reduce Trauma ni resucita. |

### Percepción e Ilusión

Una ilusión engaña la percepción; no modifica físicamente aquello que representa. Una ilusión persistente usa una potencia determinista:

**DF de Ilusión = 11 + Atributo usado al lanzar + bono de Canalización.**

No se almacena una tirada alta como potencia permanente. Sólo se examina una ilusión cuando existe motivo para sospechar, contradicción relevante o una capacidad que habilite el examen. Revelación Sensorial concede Ventaja a ese examen.

| Hechizo | Grado | Maná | Resolución canónica |
|---|---:|---:|---|
| Imagen Menor | Menor | 2 | Sostenida, máximo una Escena. Crea una imagen simple o un sonido simple. Sin sustancia, conversación autónoma, imitación perfecta de persona ni información desconocida. |
| Visión Arcana | Menor | 2 | PER; DF 10 cuando exista incertidumbre; duración Escena. Percibe manifestaciones arcanas compatibles sin conceder conocimiento automático de su naturaleza. |
| Sintonía Emocional | Menor | 2 | Alcance Corta. Percibe la emoción dominante compatible. No lee pensamientos, detecta mentiras ni revela automáticamente su causa. |
| Velo Sensorial | Básico | 3 | Sostenido, máximo una Escena. Oculta o disfraza un detalle sensorial concreto; no concede invisibilidad completa. |
| Espejismo | Básico | 4 | Sostenido, máximo una Escena. Ilusión visual y auditiva en área pequeña; sin inteligencia, sustancia ni información desconocida. |
| Vínculo de Rastreo | Básico | 4 | PER; DF 14. Mediante vínculo válido obtiene dirección o región aproximada; no coordenadas GPS. |
| Revelación Sensorial | Avanzado | 5 | Escena. Ventaja al examinar ilusiones, ocultación mágica, invisibilidad y manipulación sensorial compatibles. No concede omnisciencia ni visión a través de paredes. |
| Duplicado Ilusorio | Avanzado | 6 | Sostenido, máximo una Escena. Tres duplicados cercanos; +2 Defensa contra ataques dependientes de visión mientras quede al menos uno. Cada ataque que falle por ese +2 destruye un duplicado. No ocupan casillas, atacan, bloquean ni flanquean. |
| Visión Remota | Avanzado | 7 | PER; DF 18; requiere lugar conocido o Ancla. |
| Invisibilidad | Maestro | 9 | Objetivo único; Sostenida, máximo una Escena. Imperceptibilidad visual, no indetectabilidad. Sonido, huellas, agua, humo, polvo, olor y sentidos no visuales pueden delatar. Una acción ofensiva termina el efecto después de resolverse, incluso por Origen Remoto. |
| Dominio Fantasmagórico | Legendario | 13 | Sostenido, máximo una Escena; área amplia. Ilusión multisensorial compleja. No produce daño, fuerza, soporte ni obstáculos físicos; contradicción física directa puede revelar la falsedad pertinente. |

### Influencia

Influencia modifica estados emocionales, atención, disposición y decisiones dentro de límites expresos. El grimorio ordinario no incluye Dominación total, órdenes suicidas, pérdida repetida de Acción, reescritura arbitraria de personalidad ni borrado arbitrario de memoria.

**Valor Inspirado** y **Mente Anclada** pertenecen al mismo grupo de protección mental mágica: se usa el mejor beneficio; no se suman para obtener +4.

| Hechizo | Grado | Maná | Resolución canónica |
|---|---:|---:|---|
| Calma | Básico | 3 | PRE + Canalización contra Defensa Mental cuando resiste. Reduce agitación compatible sin borrar voluntad, memoria o razones racionales. |
| Valor Inspirado | Básico | 3 | Objetivo único; Sostenido, máximo una Escena. +2 Defensa Mental sólo contra miedo sobrenatural o intimidación compatible; no se acumula con protección mental mágica equivalente. |
| Fascinación | Básico | 4 | PRE + Canalización contra Defensa Mental; hasta fin del siguiente turno del objetivo. Prioriza atención hacia un foco concreto sin inmovilizar ni negar Acción automáticamente. |
| Temor | Básico | 4 | PRE + Canalización contra Defensa Mental; hasta fin del siguiente turno del objetivo. La fuente designada se percibe como amenaza intensa; el objetivo conserva control de sus acciones. |
| Mente Anclada | Básico | 3 | Reacción; +2 Defensa Mental contra el efecto mental declarado. No se acumula con Valor Inspirado u otra protección mental mágica equivalente. |
| Concordia | Avanzado | 5 | Área social corta; PRE + Canalización contra Defensa Mental de quien resista; duración Escena. Reduce hostilidad inmediata y abre disposición a escuchar sin crear amistad, perdón, acuerdo ni terminar automáticamente un combate. |
| Velo Social | Avanzado | 5 | Sostenido, máximo una Escena. El lanzador resulta mentalmente poco notable mientras actúe ordinariamente, pero sigue físicamente visible. Conductas obviamente relevantes rompen esa irrelevancia. |
| Interdicción | Avanzado | 6 | Objetivo protegido único; Sostenido, máximo una Escena. Las acciones hostiles directas contra el protegido sufren Desventaja tras la oposición mental pertinente. No niega Acciones. Si el protegido daña al afectado, deja de proteger frente a él. |
| Sugestión | Avanzado | 5 | PRE + Canalización contra Defensa Mental. Instrucción plausible y limitada; no Dominación, suicidio, pérdida repetida de Acción ni traición fundamental automática. |
| Aura de Autoridad | Maestro | 9 | Sostenida, máximo una Escena; radio 3 espacios. Las acciones hostiles directas contra el lanzador sufren Desventaja tras la oposición mental pertinente. No niega Acciones; si el lanzador daña a una criatura, deja de protegerlo frente a ella durante la Escena. |

### Conjuración

| Hechizo | Grado | Maná | Resolución canónica |
|---|---:|---:|---|
| Objeto Efímero | Menor | 2 | Sostenido, máximo una Escena. Conjura un objeto simple, pequeño, inerte y de una mano. No crea dinero, munición, consumibles útiles, explosivos, cristales de resonancia, mecanismos complejos ni herramientas que satisfagan por sí solas requisitos especializados. Relanzar reemplaza la instancia. |
| Llamada Menor | Básico | 4 | INT; DF 14; Sostenida. Convoca entidad menor compatible; invocar no equivale a controlar ni garantiza obediencia. |
| Paso Breve | Básico | 4 | INT; DF 12 cuando se requiera prueba. Teletransporta al lanzador hasta 3 espacios a destino visible, válido y desocupado. |
| Trasposición | Avanzado | 6 | INT; DF 14; alcance 8 espacios. Intercambia la posición del lanzador con una criatura voluntaria. Ambas posiciones deben ser válidas; no concede Movimiento adicional ni permite destino inválido o inmediatamente letal. |
| Salto Vinculado | Avanzado | 7 | El lanzador y hasta 2 criaturas voluntarias a 1 espacio o menos se trasladan hasta 6 espacios. Los destinos deben ser visibles, libres, válidos y próximos entre sí. |
| Umbral | Avanzado | 7 | INT; DF 18. Abre un paso local a través de una barrera continua de hasta 2 espacios de espesor. Una criatura voluntaria puede atravesarlo una vez antes de que se cierre. No conecta Anclas ni crea Portal persistente. |
| Jaula Dimensional | Maestro | 9 | Sostenida, máximo una Escena; radio 3 espacios. Todo efecto que cruce su frontera mediante teletransporte, Portal o invocación usa **DF efectiva = max(DF normal, 18)**. No añade segunda resistencia, no bloquea movimiento ordinario/proyectiles y afecta a aliados. |
| Llamada Mayor | Maestro | 10 | Método Ritual; INT + Ritualismo; DF 21; Sostenida; requiere vínculo de invocación válido. Convoca entidad significativa predefinida. Invocar establece presencia, no obediencia; conserva voluntad y usa modos Autónoma, Vinculada o Reactiva sin convertirse en un segundo PJ gratuito. |
| Portal | Maestro | 10 | INT; DF 21; requiere Anclas compatibles y normalmente preparación prolongada. Abre conexión transitable temporal entre las Anclas. |
| Gran Traslación | Legendario | 14 | Método Ritual; INT + Ritualismo; DF 24; requiere dos Anclas compatibles. Traslada al lanzador y hasta 8 criaturas voluntarias cercanas entre Anclas operativas. No admite objetivos hostiles, aparición dentro de materia, Anclas destruidas ni tránsito planar arbitrario. |

### Reglas de interpretación del catálogo

- **Barrera Cinética** aplica su +2 únicamente a Defensa normal contra el ataque que la disparó. No modifica Defensa Mental ni Corporal y no se almacena para turnos futuros.
- **Piel Alterada** no se convierte en +2 Protección universal. La categoría protegida se declara de forma coherente y no se acumula con armadura equivalente.
- **Potencia Sobrenatural** cambia qué magnitud física puede afrontar el personaje, no sus valores de FUE, daño, Defensa, tamaño o alcance.
- **Cierre Restaurador**, Círculo Restaurador, Matriz Vital y Renovación Integral respetan máximo de Vida y límites de lesión. Ninguno reduce Trauma salvo regla posterior expresa.
- **Regeneración**, Reconstrucción, Restauración Funcional y Renovación Integral requieren la adjudicación médica y anatómica descrita; no crean efectos adicionales no escritos.
- El requisito de Medicina de **Reconstrucción** permanece canónico sin rango mínimo cuantificado; Foundry no inventa uno.
- **Pantalla Cinética** comparte grupo de apilamiento con cobertura equivalente.
- **Cuerpo Mineral**, Piel Alterada y armadura equivalente no crean capas acumulativas equivalentes.
- **Valor Inspirado** y **Mente Anclada** comparten grupo de protección mental mágica.
- **Duplicado Ilusorio** modifica Defensa; nunca provoca una segunda tirada para anular un impacto ya resuelto.
- **Objeto Efímero** no tiene valor comercial persistente y desaparece al terminar el efecto.
- **Llamada Menor** y **Llamada Mayor** ocupan Sostenimiento mientras la entidad permanezca como invocación demandante. Las invocaciones no obtienen automáticamente capacidades de Familiar como Acción Vinculada, Coordinación Reactiva u Origen Remoto.
- **Paso Breve, Trasposición, Salto Vinculado, Umbral, Portal y Gran Traslación** no son compatibles con Origen Remoto.
- Teletransporte voluntario exige destinos válidos y libres. Ninguno de estos hechizos ordinarios puede colocar a una criatura involuntaria en un destino inválido o inmediatamente letal.
- Los efectos idénticos no se acumulan salvo regla expresa.
- Las salvaguardas generales de Acción/Reacción, objetivos, Defensas, Protección, Sostenimiento, Sobrecarga, línea de efecto y autoridad multiusuario se aplican a todo el catálogo.

### Archivo de nombres históricos

Nombres como Chispa, Pulso, Descarga, Lanza, Impulso, Paso Ligero, Molde, Ajuste, Adaptación, Alterar Forma, Forma Adaptativa, Alivio, Estabilización, Purificación, Diagnóstico, Realce, Marca, Eco, Lectura de Huella, Matiz, Susurro, Impulso Emocional, Silencio Mental, Señal, Mano, Ancla o Restauración Profunda pertenecen al **archivo de diseño**, no al catálogo mecánico canónico. Si un uso narrativo reproduce un efecto mecánico de uno de los 60 hechizos, debe pagar y respetar el hechizo correspondiente.

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

**Familiar Mágico** es un Rasgo de Vínculo de 3 PR. El Familiar es una criatura independiente vinculada al personaje, no una extensión perfecta del jugador ni un segundo personaje completo gratuito. Tiene personalidad, deseos, conocimiento, criterio y una naturaleza propia. El vínculo no implica obediencia absoluta.

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
| Bálsamo Restaurador | Común | 5 p | Restaurativa | +4 Vida; no Trauma ni Herida Grave. |
| Poción Restauradora | Común | 8 p | Restaurativa / oral | Acción: +4 Vida hasta máximo y límites de lesión. |
| Poción de Recuperación Arcana | Refinada | 1 o 5 p | Arcana / oral | Acción: +3 Maná hasta máximo; no elimina Fatiga ni Sobrecarga. |
| Tónico de Vigor | Refinada | 8 p | Potenciador | Ventaja en una prueba de VIG por esfuerzo prolongado. |
| Supresor del Dolor | Refinada | 8 p | Analgésica | Ignora una Desventaja causada por dolor compatible; no repara lesión. |
| Neutralizante Común | Refinada | 1 o | Antitóxica | Nueva resistencia con Ventaja contra una toxina compatible. |
| Toxina Debilitante | Compleja | 1 o 5 p | Sangre | VIG DF14; fallo: Desventaja en acciones físicas dependientes de fuerza muscular. |
| Bomba Incendiaria | Compleja | 3 o | — | Área pequeña, Daño 6, Pen 1; requiere colocación válida. |

Un veneno define Vía, Latencia, DF, Efecto y Duración. Normalmente concede una resistencia y no exige pruebas repetidas sin cambio. Aplicar veneno a un arma requiere preparación/Acción apropiada y la primera aplicación válida consume la dosis.

Los explosivos usan una prueba de colocación cuando existe incertidumbre, normalmente AGI + Armas a Distancia u otra combinación apropiada; cobertura y posición importan. No añaden una segunda tirada defensiva genérica si la resolución ya establece cómo afecta el área.

**CRAFT-11 — Catálogo de proyectos y recetas de referencia** fija precio, CM, tiempo, competencia y activación completa de estas ocho Fórmulas.

## 17. Ingeniería arcano-industrial

Las máquinas no usan Maná personal por defecto. Un acumulador se define por **Energía**, **Caudal** máximo por activación y **Estabilidad**. Un dispositivo define su **Consumo**. Para activarlo debe cumplirse Consumo <= Energía disponible y Consumo <= Caudal; la activación reduce Energía, no Maná.

**CRAFT-09 — Ingeniería y dispositivos** define Estabilidad como la Energía máxima que un acumulador puede recibir de forma segura por intervalo de carga de 10 minutos y completa las recetas, costes, recarga y módulos.

Acumuladores portátiles de referencia: celda menor **4 E / C2 / Est1**; acumulador estándar **8/3/2**; núcleo pesado **16/5/4**. Transferir Energía nunca crea Energía y conectar acumuladores no suma automáticamente Caudal sin infraestructura diseñada para ello.

Estados de avería: **Operativo -> Dañado -> Deshabilitado**.

### Sobrecarga Controlada

Sólo una construcción compatible puede intentarla. Se realiza **INT + Ingeniería contra DF 16**. Deben existir Energía suficiente y una activación válida. Con éxito, esa activación dispone de Caudal efectivo +1, ejecuta su efecto, consume la Energía correspondiente y el dispositivo queda Dañado. Con fallo no se activa y queda Deshabilitado. Una Pifia puede añadir una consecuencia energética contextual. La Sobrecarga nunca crea Energía.

Dispositivos de referencia incluyen lámparas arcanas, herramientas motorizadas, visor espectral, estabilizador de tiro, cámara de penetración (Consumo/Caudal 2, Pen +2 cuando corresponda), propulsor de impacto (Consumo 2, +2 daño o empuje 1 según diseño), prótesis motorizadas, escudo de campo (Caudal 2, Consumo 2, Reacción +2 Defensa sin acumular con Barrera Cinética equivalente), arnés de carga y autómatas auxiliares. Un autómata auxiliar no concede automáticamente una Acción extra al usuario.

Ingeniería diseña, construye y repara mecanismos; Arcana comprende fenómenos mágicos; Canalización dirige activamente magia personal cuando corresponda. Una Habilidad no reemplaza universalmente a las otras.

## 18. Proyectos, fabricación e investigación

> **CRAFT-01 — VIGENTE · CERRADO.** Este capítulo contiene el motor universal de proyectos y fabricación. Las ampliaciones CRAFT-02 y posteriores cuantifican economía, recetas, calidad, materiales especiales, trampas, runas, objetos mágicos, ingeniería avanzada e investigación sin reemplazar este motor salvo revisión explícita del canon.

### Principio general

Los proyectos siguen el ciclo **Diseño -> Requisitos -> Trabajo -> Complicaciones -> Resultado**.

El mismo motor se utiliza, cuando corresponda, para fabricar, montar, modificar o reparar objetos; construir mecanismos; preparar trampas; integrar componentes arcano-industriales; trabajar soportes rúnicos o mágicos; y desarrollar proyectos multidisciplinarios.

**Complejidad no equivale a tamaño, tiempo, precio, rareza ni poder.** Describe principalmente la competencia, precisión y coordinación técnica necesarias. Un objeto voluminoso pero sencillo puede requerir mucho material y tiempo con baja Complejidad; un mecanismo pequeño y extremadamente preciso puede ser Magistral.

Una Habilidad no sustituye materiales, herramientas, instalaciones, tiempo, planos o competencias auxiliares que sean realmente necesarios. Una tirada alta tampoco vuelve posible un diseño físicamente, técnica o mágicamente imposible.

### Registro mínimo de un Proyecto

Cuando un trabajo necesita seguimiento mecánico, su entrada debe indicar como mínimo:

- **Resultado:** qué objeto, reparación, modificación o estado final se pretende obtener.
- **Complejidad:** Simple, Estándar, Complejo, Magistral o Extraordinario.
- **Disciplina Principal:** Habilidad que gobierna el trabajo.
- **Especialización requerida**, si existe.
- **Disciplinas Auxiliares**, si son indispensables.
- **Diseño/Plano/Fórmula:** si el procedimiento es conocido, requiere un plano estable o necesita una fase previa de diseño.
- **Materiales y componentes** necesarios.
- **Herramientas** necesarias.
- **Instalación** mínima.
- **Tiempo base de trabajo efectivo.**
- **Etapas**, sólo cuando existan cambios de procedimiento, responsables o riesgos que justifiquen separarlas.
- **Riesgo y DF**, únicamente si alguna fase contiene incertidumbre significativa.
- **Resultado mecánico exacto** del objeto o modificación.

Los catálogos posteriores pueden añadir campos, pero no omitir silenciosamente un requisito que sea esencial.

### Complejidad y competencia

| Complejidad | Rango mínimo habitual de la Disciplina Principal | Instalación mínima habitual | Especialización | DF base cuando realmente existe incertidumbre |
|---|---|---|---|---:|
| **Simple** | Aprendiz | Improvisada | Normalmente no | 10 |
| **Estándar** | Entrenado | Adecuada | Según el oficio | 12 |
| **Complejo** | Experto | Profesional | Normalmente requerida | 14 |
| **Magistral** | Maestro | Especializada | Requerida | 16 |
| **Extraordinario** | Gran Maestro | Excepcional | Requerida | 18 |

Estos son mínimos universales de referencia, no una obligación de que todos los proyectos de una categoría posean exactamente la misma infraestructura. Una receta concreta puede exigir una instalación superior por su naturaleza —por ejemplo presión, temperatura, esterilidad o contención arcana— sin cambiar por ello su Complejidad.

Un personaje por debajo del rango mínimo no puede sustituir esa falta de competencia mediante una tirada afortunada. Debe conseguir supervisión competente, aprender lo necesario o utilizar otro procedimiento expresamente habilitado.

Las DF de la tabla **no crean una tirada automática**. Sólo son la referencia inicial cuando el proyecto ya ha entrado en una situación incierta. Si la incertidumbre concreta es distinta, se utiliza la escala general de DF del sistema.

### Tiempo de trabajo

El tiempo se registra como **trabajo efectivo**, no como tiempo de calendario. Una **Jornada de Trabajo** representa aproximadamente 8 horas de trabajo productivo con pausas normales.

Cuando una receta todavía no tenga un tiempo específico, pueden utilizarse estos intervalos de diseño como referencia:

| Complejidad | Intervalo orientativo inicial |
|---|---|
| Simple | 10 minutos a 2 horas |
| Estándar | 2 horas a 1 Jornada |
| Complejo | 2 a 5 Jornadas |
| Magistral | 1 a 3 semanas de trabajo |
| Extraordinario | varias semanas o meses y normalmente varias etapas |

Estos intervalos son una guía de asignación para diseñar recetas, no una conversión automática entre Complejidad y tiempo. Volumen, cantidad de unidades, secado, enfriamiento, transporte, disponibilidad de maquinaria y otros procesos físicos pueden aumentar o reducir el tiempo sin cambiar la dificultad técnica.

Una interrupción no borra automáticamente el trabajo realizado. Las etapas completadas y las piezas físicamente terminadas permanecen, salvo que el proceso sea perecedero, continuo o se deteriore por una causa concreta.

### Fabricación rutinaria: no se tira

Una tarea es **rutinaria** cuando se cumplen simultáneamente estas condiciones:

1. el resultado es conocido y reproducible;
2. el personaje cumple el rango mínimo y cualquier Especialización requerida;
3. posee o comprende el Diseño/Plano/Fórmula necesario;
4. dispone de materiales y componentes suficientes;
5. dispone de herramientas e instalación adecuadas;
6. dispone del tiempo requerido;
7. no trabaja bajo presión, peligro o condiciones extraordinarias;
8. no intenta alterar simultáneamente el diseño, acelerar el proceso o sustituir un requisito crítico.

En esas condiciones **el proyecto se completa sin tirada**. La competencia se expresa precisamente en poder producir resultados fiables.

No se realizan tiradas por cada hora, pieza o jornada para simular trabajo ordinario.

### Cuándo se realiza una prueba

Se realiza una prueba sólo cuando existe incertidumbre significativa. Casos frecuentes:

- trabajar bajo presión o peligro;
- acelerar el proceso;
- utilizar herramientas o una instalación por debajo de lo requerido cuando siga siendo físicamente plausible;
- adaptar un plano a una función diferente;
- integrar componentes cuya compatibilidad no esté resuelta;
- reparar daño atípico o diagnosticar una avería incierta;
- ejecutar una etapa experimental;
- fabricar un prototipo;
- trabajar con materiales inestables;
- improvisar un procedimiento que la ficción permita pero que todavía no sea rutinario.

Una misma incertidumbre se resuelve **una vez**. No se encadenan tiradas repetidas para conseguir finalmente un resultado alto. Si un proyecto tiene varias pruebas, cada una debe corresponder a una etapa con decisión, riesgo o consecuencia propia.

Antes de tirar deben quedar claros la intención, la DF y las consecuencias razonablemente posibles del fallo.

### Requisitos esenciales y condiciones deficientes

Un requisito **esencial** no se reemplaza por una penalización. Si falta el horno capaz de alcanzar la temperatura necesaria, el reactivo indispensable, la pieza estructural, el conocimiento obligatorio o una herramienta sin alternativa funcional, el procedimiento no puede realizarse de esa manera.

Cuando una deficiencia admite un método alternativo plausible:

- una instalación **un grado** por debajo de la requerida puede permitir el intento con **Desventaja**, si el procedimiento puede ejecutarse materialmente;
- una instalación **dos o más grados** por debajo vuelve el procedimiento imposible salvo regla o método específico;
- una herramienta inferior o sustituta puede producir Desventaja cuando siga permitiendo el trabajo;
- varias deficiencias no acumulan múltiples Desventajas, conforme a la regla general;
- la misma causa no aplica simultáneamente Desventaja y un aumento automático de DF.

La sustitución de materiales sólo es válida si el material alternativo puede cumplir físicamente la función. Cuando cambie las propiedades del resultado o exija rediseño, se trata como adaptación y se aplican las reglas específicas de materiales y modificaciones.

### Diseño, Plano y procedimiento conocido

Un diseño ordinario ampliamente conocido puede considerarse parte del oficio y no requiere transportar un plano físico.

Cuando una entrada indique **Plano requerido**, debe cumplirse una de estas condiciones:

- el personaje dispone de un Plano estable y comprensible;
- conoce de forma estable ese diseño por aprendizaje previo expresamente reconocido;
- documenta mediante una fase válida de Diseño un procedimiento que **ya conoce de forma estable** y que sólo necesitaba formalizar.

Una fase genérica de Diseño **no descubre tecnología desconocida, no reconstruye un objeto ajeno y no estabiliza una innovación**. Si el procedimiento no es ya conocimiento estable del personaje —por ser nuevo, incompleto, protegido, experimental o derivado de ingeniería inversa— debe utilizar **CRAFT-10** hasta producir el Plano/Fórmula/Patrón estable correspondiente.

Poseer un Plano no concede el rango de Habilidad, Especialización, materiales, herramientas ni instalaciones exigidos.

Un **Plano estable** convierte en reproducible el procedimiento que describe para quien cumpla todos los demás requisitos. No convierte en rutinario un prototipo, un material desconocido o una modificación no contenida en el Plano.

### Proyectos multidisciplinarios

Un proyecto multidisciplinario posee una **Disciplina Principal** y una o más **Auxiliares**.

La Disciplina Principal:

- determina el rango mínimo principal;
- gobierna la fabricación o integración central;
- realiza la prueba de una etapa incierta cuando esa incertidumbre pertenece al núcleo del proyecto.

Una Disciplina Auxiliar esencial debe ser aportada por el mismo personaje o por un colaborador competente. Su mera presencia no añade un bono numérico a la prueba Principal.

Si una fase auxiliar tiene una incertidumbre y consecuencias propias —por ejemplo diagnosticar una matriz arcana antes de montarla— puede resolverse como una etapa separada con la Habilidad correspondiente. No se crean pruebas auxiliares sólo para aumentar la cantidad de dados lanzados.

### Ayuda técnica y ayuda de trabajo

La ayuda distingue dos funciones.

**Ayuda técnica:** un colaborador competente participa directamente en una resolución incierta. Cuando cumple la regla general de Ayuda, concede **Ventaja**. Más colaboradores no conceden más dados.

**Ayuda de trabajo:** colaboradores capaces realizan partes paralelizables del trabajo. Cuando el proyecto permite dividir el trabajo:

- un colaborador efectivo reduce el tiempo base de esa etapa un **25%**;
- dos o más colaboradores efectivos reducen el tiempo base un **50%**;
- la reducción universal por cantidad de ayudantes no supera el **50%**;
- proyectos de obra, industria, vehículos o gran escala pueden definir expresamente una dotación de trabajadores y otra relación de tiempo.

Para trabajo técnico, un colaborador debe ser capaz de ejecutar realmente la parte asignada; como referencia, posee al menos un rango por debajo del mínimo de la Disciplina Principal o satisface una Disciplina Auxiliar pertinente. Trabajo puramente físico o repetitivo puede admitir ayudantes distintos cuando la ficción lo permita.

Un mismo colaborador no proporciona simultáneamente **Ayuda técnica** y **Ayuda de trabajo** sobre la misma etapa.

### Acelerar un Proyecto

Acelerar es una decisión voluntaria y sólo puede declararse cuando el proceso sea físicamente comprimible.

La aceleración universal:

1. se declara antes de trabajar la etapa;
2. intenta completar esa etapa en **50% de su tiempo base restante**;
3. exige una prueba de la Disciplina Principal a la DF apropiada para la Complejidad, normalmente **DF base +2**;
4. sólo puede aplicarse una vez sobre la misma etapa mediante esta regla universal.

**Éxito:** la etapa se completa en el tiempo reducido.

**Fallo:** la etapa no se pierde, pero la prisa genera retrabajo; terminarla requiere tiempo adicional hasta que el tiempo total invertido alcance **125% del tiempo base original** de esa etapa, salvo que una consecuencia física concreta exija otra cosa.

**Pifia:** además del retrabajo, se aplica una complicación material, técnica o de seguridad que ya fuera plausible para el procedimiento. No destruye automáticamente el proyecto completo.

**Hazaña:** completa la aceleración con éxito, pero no crea Calidad, modificaciones, materiales ni propiedades gratuitas.

Antes de aplicar reducciones se determina el **Tiempo Base Ajustado (TBA)** de la etapa: tiempo de receta después de aumentos obligatorios por Calidad, Material, escala o requisitos equivalentes, pero antes de Ayuda, Aceleración, herramientas motorizadas, Mantenible u otros beneficios porcentuales.

Salvo que una regla diga expresamente que **rompe el piso temporal**, ninguna combinación de reducciones porcentuales —Ayuda de trabajo, Aceleración, Mantenible, maquinaria u otra fuente— reduce una etapa por debajo del **25% de su TBA**. Un procedimiento alternativo con un tiempo fijo propio —por ejemplo intercambiar un módulo mediante Modular— no es una reducción porcentual y usa su tiempo escrito.

### Improvisación y adaptación

**Improvisar** significa resolver un procedimiento válido sin todos los medios ideales, pero nunca ignorar un requisito esencial.

**Adaptar** significa modificar un diseño conocido para una función, anatomía, soporte, componente o condición diferente.

Cuando una improvisación o adaptación tenga incertidumbre:

- se declara qué se está cambiando;
- se determina si sigue siendo viable;
- se identifica qué Habilidad gobierna el cambio;
- se realiza una única prueba para esa incertidumbre o una etapa separada si tiene consecuencias propias;
- el éxito produce exactamente el resultado declarado, no mejoras no solicitadas.

Si la adaptación pretende **crear una propiedad mecánica que no existe ya en un Perfil/receta estable compatible**, deja de ser una adaptación rutinaria y entra en **CRAFT-10** como Combinación, Innovación o Frontera según corresponda.

Una tirada alta no permite añadir una segunda propiedad, aumentar daño, Protección, Caudal, capacidad rúnica u otro parámetro que el proyecto no haya pagado o habilitado por sus reglas específicas.

### Resolución de una prueba de Proyecto

Las pruebas de Proyecto utilizan el motor general **2d10 + Atributo + Habilidad + modificadores >= DF**.

El Atributo depende del método real. INT es frecuente en diseño, diagnóstico e integración; AGI puede dominar trabajos manuales de precisión; FUE puede ser apropiada para una fase cuyo desafío sea fuerza aplicada. La Habilidad sigue representando la competencia técnica.

Cuando importe el margen:

- **Ajustado (0–4):** consigue el objetivo declarado.
- **Claro (5–9):** consigue el objetivo y puede obtener una ventaja que ya estuviera en juego —por ejemplo menor exposición a una consecuencia, mejor control del procedimiento o información adicional—.
- **Dominante (10+):** obtiene un control excepcional dentro del objetivo declarado.

El margen **no mejora automáticamente la Calidad**, no crea materiales, no reduce costes todavía no arriesgados y no incorpora propiedades adicionales.

### Fallos, Pifias y conservación del trabajo

Un fallo de Proyecto no significa automáticamente «el objeto explota» ni reinicia todo el trabajo.

Antes de una prueba deben existir consecuencias plausibles. Según la situación pueden incluir:

- retraso o retrabajo;
- pérdida o daño de un componente;
- deterioro de una pieza intermedia;
- resultado provisional que no cumple todavía la especificación;
- avería de herramienta o instalación;
- exposición a calor, presión, toxinas, energía u otro peligro;
- necesidad de cambiar el método o conseguir información adicional;
- una complicación externa coherente.

Una **Pifia** puede agravar una consecuencia que ya fuera plausible, pero no justifica destruir meses de trabajo, matar automáticamente a un personaje o consumir recursos excepcionales si ese riesgo no existía en la situación.

Las etapas válidamente completadas se conservan. Un fallo posterior sólo las invalida cuando la nueva consecuencia las daña físicamente o demuestra que dependían de una premisa incorrecta.

### Calidad y propiedades

La Calidad vigente continúa siendo **Defectuosa / Común / Superior / Excepcional**.

CRAFT-01 establece estas salvaguardas:

- la Calidad objetivo debe declararse y cumplir los requisitos que defina su subsistema;
- un margen alto o una Hazaña no elevan gratuitamente la Calidad;
- Superior y Excepcional no significan +1/+2/+3 universal;
- una propiedad especial debe proceder de diseño, material, modificación, runa, encantamiento, dispositivo u otra fuente mecánica identificable;
- reparar un objeto restaura lo que ya posee; no añade una mejora gratuita.

La cuantificación completa de Calidad y modificaciones está definida en **CRAFT-04 — Calidad y modificaciones**, dentro de este capítulo.

### Proyectos dentro de combate

El trabajo normal de Proyecto se mide en tiempo de fabricación y **no se convierte automáticamente en una Acción de combate**.

Una reparación, montaje, ajuste, colocación de trampa o activación durante una Escena sólo puede resolverse en Acciones/Reacciones cuando una regla, objeto o procedimiento concreto indique que esa operación cabe físicamente en esa escala temporal.

No existe «fabricación instantánea» por obtener una Hazaña.

### Investigación y prototipos

La investigación conserva el ciclo:

**Concepto -> Viabilidad -> Investigación -> Prototipo -> Fórmula/Plano estable**

La Viabilidad puede ser:

- **Posible**;
- **Posible con condiciones**;
- **Actualmente imposible**.

Una tirada alta no atraviesa una imposibilidad establecida.

Un prototipo no se convierte automáticamente en Plano estable por funcionar una vez. **CRAFT-10 — Investigación, prototipos y estabilización de diseños** define las Preguntas, Prototipo, Validación, Réplica y estabilización.

### Límites de CRAFT-01

CRAFT-01 fija el motor de resolución, pero deliberadamente **no fija todavía**:

- porcentajes monetarios y cantidades de materiales;
- recuperación y reciclaje;
- beneficios de venta o producción comercial;
- recetas concretas de armas, armaduras y herramientas;
- propiedades de Calidad;
- catálogo de materiales especiales;
- construcción detallada de trampas (definida posteriormente en CRAFT-06);
- runas y Piedras de Impronta (definidas en CRAFT-07) y encantamientos (reservados a CRAFT-08);
- límites de sintonización;
- investigación avanzada (definida posteriormente en CRAFT-10).

Esos elementos deben utilizar este motor y se cierran en CRAFT-02 y posteriores.

### CRAFT-02 — Economía de fabricación

> **VIGENTE · CERRADO.** CRAFT-02 fija la economía universal de fabricación ordinaria: valor de referencia, coste material, valor de insumos, trabajo profesional, acceso a instalaciones, reparación, desmantelamiento, recuperación, lotes, venta y encargos. Las recetas concretas y las ampliaciones de Calidad, materiales especiales, runas, objetos mágicos e ingeniería pueden reemplazar un valor universal sólo cuando lo indiquen expresamente.

#### Valor de Referencia y Coste de Materiales

El **Valor de Referencia (VR)** es el precio comercial de una unidad terminada, Común y sin modificaciones del objeto que se intenta producir.

- Si el precio es **Exacto**, ese valor se usa directamente.
- Si es **Variable**, debe fijarse y registrarse para el proyecto antes de adquirir los materiales.
- Si figura **Sin precio establecido**, no puede inferirse un coste de fabricación mediante esta regla: la receta debe definir un presupuesto de materiales antes de comenzar.
- Los costes se calculan siempre en cobres y se presentan después en o/p/c.

Para una fabricación ordinaria que no tenga una receta económica propia:

**Coste de Materiales (CM) = 50% del VR, redondeado hacia arriba al cobre.**

El CM representa materias primas ordinarias, consumibles de proceso, combustible normal de taller, adhesivos, abrasivos, fundentes y merma razonable ya incorporada al procedimiento estable. No incluye:

- herramientas reutilizables;
- compra o construcción de la instalación;
- salarios o trabajo contratado;
- licencias, impuestos, transporte o sobornos;
- componentes especiales identificados cuyo precio o adquisición estén definidos por separado;
- propiedades de Calidad, modificaciones, runas, encantamientos o dispositivos que indiquen un coste adicional.

Cuando una receta defina un **despiece o presupuesto exacto**, ese valor reemplaza el 50% universal para esa receta. No se suman ambas fórmulas.

Pagar el CM no conjura materiales. Sólo puede pagarse como compra abstracta cuando existe acceso real a suministros compatibles. Disponibilidad, legalidad, transporte y rareza siguen siendo límites independientes.

#### Lotes de materiales y Valor de Insumo

Los materiales obtenidos como botín, extracción, recompensa, compra o recuperación pueden registrarse como un **Lote de Materiales**. Debe indicar:

- descripción o familia material;
- categoría de recurso: Común, Especializado, Raro o Excepcional;
- **Valor de Insumo (VI)** en cobres;
- cualquier restricción de compatibilidad relevante.

Un Lote compatible reduce el CM pendiente **uno por uno según su VI**. El VI representa cuánto coste de materiales puede sustituir en un proyecto compatible; no es dinero y no puede gastarse en otra cosa.

Un material incompatible no se convierte en compatible por poseer suficiente valor monetario. **CRAFT-05** define materiales especiales, afinidades y propiedades sin cambiar esta regla económica.

Si un Lote de Materiales se vende como mercancía, se trata como un bien físico y utiliza las reglas normales de venta sobre su propio valor comercial. Su VI no se convierte automáticamente en efectivo.

#### Trabajo profesional

CRAFT-02 usa una tabla de **tarifa de proyecto** para valorar trabajo contratado o remuneración por un encargo. No representa un salario universal para toda Edria ni fija niveles de vida; es una referencia mecánica para servicios de fabricación.

| Nivel de servicio | Tarifa por Jornada de Trabajo de 8 h |
|---|---:|
| Apoyo no técnico | 5 c |
| Aprendiz | 1 p = 10 c |
| Entrenado | 2 p = 20 c |
| Experto | 5 p = 50 c |
| Maestro | 1 o = 100 c |
| Gran Maestro | 2 o = 200 c |

Para valorar el trabajo principal de una receta se usa normalmente el **rango mínimo que exige el proyecto**, no el rango superior que posea voluntariamente el artesano. Contratar deliberadamente a un profesional de mayor prestigio puede costar más si así se acuerda.

La tarifa se prorratea por el tiempo de trabajo efectivo y se redondea una sola vez hacia arriba al cobre. Para encargos independientes, la unidad mínima facturable ordinaria es **1 hora**. Varias unidades idénticas del mismo pedido se agrupan como lote cuando corresponda; no se fracciona artificialmente un único encargo para multiplicar mínimos de facturación.

Un mismo período de trabajo no se cobra dos veces porque una persona cubra dos Habilidades. Cuando el proyecto exige especialistas distintos trabajando horas diferentes, se contabilizan sus horas reales por separado.

La Ayuda de trabajo de CRAFT-01 puede reducir duración, pero un colaborador contratado debe ser pagado por sus horas efectivas. La Ayuda técnica no convierte a un ayudante en trabajo gratuito.

#### Acceso a instalaciones

Poseer, pertenecer legítimamente o recibir acceso gratuito a una instalación no genera un coste abstracto por proyecto.

Cuando se alquila acceso comercial, se usan como referencia:

| Instalación | Tarifa por 8 h de uso |
|---|---:|
| Improvisada | normalmente sin tarifa de instalación |
| Adecuada | 1 p = 10 c |
| Profesional | 2 p = 20 c |
| Especializada | 5 p = 50 c |
| Excepcional | 1 o = 100 c |

La tarifa se prorratea por horas efectivas y se redondea hacia arriba al cobre. El acceso a una instalación no elimina la necesidad de herramientas personales, consumibles o licencias que la receta exija.

Alquilar una herramienta o Kit reutilizable ordinario, cuando el mercado lo permita y no esté incluido en la instalación, cuesta como referencia **10% de su precio de compra por Jornada de Trabajo**, prorrateado por horas y redondeado hacia arriba al cobre. Un equipo extraordinario puede definir otra tarifa.

No existe un impuesto universal de mantenimiento sobre herramientas, armas o talleres. El desgaste sólo se cobra cuando una regla, consecuencia o servicio concreto lo vuelve relevante.

#### Fabricar para uso propio

Un personaje que realiza personalmente todo el trabajo paga:

- CM pendiente después de aplicar materiales propios;
- componentes especiales que correspondan;
- alquileres de herramientas o instalaciones que realmente necesite;
- cualquier coste narrativo o legal explícito.

**No se cobra a sí mismo una tarifa de trabajo.**

Por eso fabricar personalmente un objeto ordinario puede ahorrar de forma real aproximadamente la mitad de su precio comercial si el personaje ya posee competencia, herramientas e instalación. Ese ahorro es el retorno de haber invertido desarrollo, tiempo e infraestructura.

El tiempo utilizado sigue siendo un recurso: fabricar ocupa Jornadas de Trabajo que no pueden emplearse simultáneamente en otra actividad incompatible.

#### Encargos y trabajo remunerado

Un **Encargo** existe cuando hay un comprador o contratante acordado antes de fabricar. No es lo mismo que producir un objeto sin comprador y después intentar venderlo.

Una cotización estándar de Encargo incluye:

**materiales pendientes + componentes especiales + trabajo requerido + alquileres necesarios**

y puede incluir además transporte, permisos, impuestos o condiciones locales cuando existan.

Si el cliente proporciona materiales, componentes, herramientas o instalación, esos elementos no se cobran de nuevo.

En un contrato ordinario a precio cerrado, el trabajo se cotiza según el **tiempo base planificado antes de Ayuda o Aceleración**. Una ejecución eficiente puede mejorar el margen del artesano; una Aceleración fallida puede reducirlo mediante retrabajo. Un contrato por horas puede pactar otra cosa.

El dinero adelantado para comprar materiales es **capital del Encargo**, no beneficio hasta que se cumpla el contrato.

Aceptar Encargos puede proporcionar ingresos durante tiempo de campaña o descanso, pero **no existe una cola infinita de clientes**. Disponibilidad, demanda, reputación, legalidad, localización y tiempo determinan si existe realmente un Encargo. No se realizan tiradas repetidas hasta fabricar dinero.

Cuando un objeto ordinario terminado ya está disponible en mercado y una cotización personalizada resulta igual o superior a su precio comercial, no se presupone que un comprador acepte el Encargo sin una razón: personalización, disponibilidad, urgencia, prestigio, acceso o alguna otra ventaja real.

#### Venta de objetos y estado

El **Valor Aplicable (VA)** para vender un objeto parte de su VR y de su estado físico. Para objetos Superior/Excepcional, CRAFT-04 reemplaza esta base por el **VRQ** correspondiente.

| Estado | VA respecto del VR |
|---|---:|
| Operativo / intacto | 100% |
| Dañado | 60% |
| Deshabilitado / inutilizable reparable | 40% |
| Arruinado pero recuperable | 20% |
| Destruido sin recuperación significativa | 0% |

El VA se redondea hacia abajo al cobre.

Una pieza sin un estado mecánico de daño se considera Operativa mientras ninguna consecuencia establezca lo contrario. CRAFT-02 **no introduce puntos de durabilidad ni desgaste periódico universal**.

Sobre el VA:

- **Venta rápida:** 25% exacto, redondeado hacia abajo al cobre.
- **Venta directa:** no posee tasa obligatoria; **50% del VA** sigue siendo la referencia ordinaria cuando existe comprador.
- Un comprador puede ofrecer más o menos por escasez, demanda, procedencia, legalidad, estado o negociación, pero no existe un mercado automático dispuesto a pagar cualquier cifra.

Para un objeto Común recién fabricado, el CM universal redondea hacia arriba al 50% del VR mientras la venta directa de referencia redondea hacia abajo alrededor del 50%. Por tanto, **fabricar un objeto sin comprador no produce beneficio automático incluso si el artesano ignora el valor de su propio tiempo**.

Una venta preacordada que remunera la fabricación es un Encargo y usa las reglas anteriores, no la tasa de reventa de un objeto ya producido.

#### Reparación

No existe un coste de mantenimiento obligatorio por uso normal. La reparación económica aparece cuando un objeto recibe un estado o una consecuencia concreta que la exige.

Salvo que una receta indique otra cosa:

| Estado a reparar | Materiales de reparación | Tiempo respecto de fabricación base |
|---|---:|---:|
| Dañado -> Operativo | 10% del VR | 25% |
| Deshabilitado -> Operativo | 25% del VR | 50% |
| Arruinado recuperable -> Operativo | 50% del VR | 75% |

Los materiales de reparación se redondean hacia arriba al cobre. El tiempo nunca baja de **10 minutos** cuando la reparación requiere trabajo efectivo.

Para objetos con capas de valor se utiliza la **Base de Reparación Afectada (BRA)**: sólo entran las capas que la consecuencia obliga a restaurar.

- preservar la Calidad usa VRQ;
- si el daño afecta la parte que sostiene un Material Especial, se incorpora su valor conforme a VRT;
- si afecta una Matriz/Runa integrada, se incorpora su valor rúnico;
- si afecta una matriz de Encantamiento, se incorpora su valor encantado;
- un componente separable sustituido y pagado por separado se excluye de la BRA para no cobrarlo dos veces.

El tiempo de reparación utiliza de igual modo el tiempo correspondiente a la capa más exigente que realmente deba restaurarse.

La reparación usa la competencia, herramientas e instalación coherentes con el objeto. La Complejidad puede ser la del proyecto original o una específica de reparación cuando la receta lo indique.

Los estados arcano-industriales **Dañado** y **Deshabilitado** utilizan directamente estas categorías salvo regla específica del dispositivo.

Un componente especial destruido o perdido no reaparece pagando un porcentaje del VR. Si el proyecto identifica un núcleo, cristal, acumulador, runa, gema, mecanismo o componente con adquisición propia, debe repararse o reemplazarse conforme a su regla. Su valor no se cobra simultáneamente dentro del porcentaje genérico si ya está siendo sustituido por separado.

Reparar restaura las propiedades válidas que el objeto ya poseía; no mejora Calidad ni añade modificaciones.

#### Desmantelamiento y recuperación

Desmantelar deliberadamente un objeto permite recuperar materiales compatibles en vez de venderlo. Con herramientas y condiciones adecuadas es trabajo rutinario y no requiere tirada.

La recuperación genérica máxima es:

| Estado antes de desmantelar | VI recuperable respecto del VR |
|---|---:|
| Operativo / intacto | 25% |
| Dañado | 15% |
| Deshabilitado | 10% |
| Arruinado recuperable | 5% |
| Destruido | 0% salvo componentes identificables supervivientes |

El VI recuperado se redondea hacia abajo al cobre. El tiempo ordinario de desmantelamiento es **25% del tiempo base de fabricación**, con un mínimo de 10 minutos, salvo receta específica. La Calidad no multiplica esta recuperación genérica: CRAFT-04 mantiene como base el VR Común.

La recuperación produce **materiales**, no monedas. Desmantelar un objeto intacto y vender después los materiales no debe ser una forma mejor de obtener efectivo que vender el objeto intacto.

Un componente especial explícitamente desmontable e intacto puede recuperarse como componente. En ese caso su valor se excluye de la base utilizada para calcular recuperación genérica, evitando recuperarlo dos veces.

Si se intenta desmantelar bajo presión, sin herramienta adecuada o tratando de preservar un componente especialmente delicado, se aplica CRAFT-01 y sólo se tira cuando existe incertidumbre significativa.

#### Materiales perdidos por complicaciones

Un fallo de Proyecto no consume materiales adicionales automáticamente.

Cuando **pérdida de materiales** haya sido declarada como una consecuencia plausible de una prueba:

- una pérdida ordinaria de referencia equivale al **10% del CM del proyecto o etapa afectada**;
- una Pifia puede elevar esa pérdida de referencia al **25%**;
- se redondea hacia arriba al cobre;
- un componente especial sólo queda en riesgo si se identificó expresamente antes de la prueba o si la consecuencia física lo afecta de manera evidente.

La consecuencia concreta puede ser menor, mayor o distinta cuando el proceso lo justifique, pero no se inventa después de ver el resultado.

#### Lotes, producción repetida y economías de escala

El coste material de varias unidades escala linealmente salvo receta expresa:

**CM total = suma de los CM de las unidades o lotes producidos.**

No existe un descuento universal por fabricar diez, cien o mil unidades. La materia no desaparece por producción en serie.

El tiempo tampoco recibe un descuento universal. Una receta puede definir **Unidad Comercial**, lote, molde, plantilla, línea de montaje, herramienta especializada o instalación industrial que permita producir varias unidades con menor tiempo por unidad.

Cuando un mismo comprador encarga varias unidades idénticas, se trata como un lote a efectos de facturación y organización; no se multiplican artificialmente los mínimos de una hora.

La producción industrial puede mejorar productividad, pero debe hacerlo mediante infraestructura o recetas explícitas, no apilando trabajadores o redondeos.

#### Salvaguardas económicas

CRAFT-02 establece las siguientes restricciones universales:

- PD y PR nunca se convierten directamente en materiales, moneda o valor de reventa.
- Un Plano no crea materiales ni mercado.
- Fabricar para uno mismo puede ahorrar dinero; **revender sin comprador preacordado no genera beneficio automático**.
- Los Encargos remuneran tiempo profesional porque existe un cliente real, no porque el sistema garantice demanda.
- Materiales saqueados o extraídos legítimamente pueden reducir el coste monetario de un proyecto; eso representa una recompensa física obtenida en juego, no creación de valor desde la nada.
- Comprar un objeto, desmantelarlo y revender sus materiales es económicamente desfavorable por defecto.
- Una reparación puede aumentar legítimamente el valor de un objeto dañado porque consume materiales, competencia y tiempo.
- Los redondeos de costes se realizan hacia arriba; recuperaciones y ventas se redondean hacia abajo.
- No se puede dividir artificialmente un proyecto, lote, material o Encargo para beneficiarse repetidamente de redondeos o tarifas mínimas.
- Precio, Disponibilidad y acceso legal/social siguen siendo controles separados.

#### Ejemplos económicos de control

**Espada larga ordinaria.** VR 2 o = 200 c. CM 1 o = 100 c. Una venta rápida intacta produce 50 c; una venta directa ordinaria ronda 100 c. Fabricarla sin Encargo no produce margen automático. Si el artesano la quiere para sí mismo y posee medios de trabajo, ahorra aproximadamente 1 o a cambio de competencia y tiempo.

**Placas ordinarias.** VR 40 o = 4.000 c. CM 20 o = 2.000 c. Su venta directa ordinaria de referencia ronda igualmente 20 o. La fabricación propia puede justificar una inversión importante en Artesanía, instalación y tiempo, pero producir placas sin comprador no duplica dinero.

**Proyecto Estándar hipotético de una Jornada.** Si exige servicio Entrenado, el trabajo de referencia vale 2 p por la jornada. Si además necesita alquilar una instalación Adecuada, añade 1 p. Estos importes remuneran trabajo e infraestructura sin alterar el CM.

**Dispositivo Dañado.** Repararlo consume normalmente 10% de su VR en materiales y 25% de su tiempo base. Esto hace que una Sobrecarga Controlada exitosa, que deja el dispositivo Dañado, tenga un coste material real sin equivaler a reconstruir el dispositivo entero.

**Botín dañado.** Un objeto Dañado puede venderse rápido por 25% de su VA o desmontarse para obtener hasta 15% del VR como VI. Repararlo antes de venderlo puede ser rentable si existen materiales, tiempo y comprador; esa diferencia remunera una actividad real de restauración y no es un bucle sin coste.

#### Límites de CRAFT-02

CRAFT-02 no fija todavía:

- la Complejidad y tiempo exactos de cada arma, armadura y herramienta;
- recetas individuales;
- propiedades y costes de Calidad;
- materiales especiales concretos;
- trampas;
- runas y Piedras de Impronta (definidas en CRAFT-07), encantamientos y sintonización;
- dispositivos específicos adicionales;
- investigación e invención.

Esos elementos comienzan en **CRAFT-03 — Armas, armaduras y herramientas** y deben respetar este marco económico.

### CRAFT-03 — Armas, armaduras y herramientas

> **VIGENTE · CERRADO.** CRAFT-03 convierte el catálogo material ordinario vigente en recetas fabricables mediante CRAFT-01 y CRAFT-02. Salvo indicación expresa, todas las recetas producen una pieza **Común**, con materiales ordinarios y exactamente las estadísticas ya definidas en el capítulo 9; fabricar no altera Daño, Penetración, Protección, Defensa, Recarga ni propiedades.

#### Convenciones de receta

Las tablas de CRAFT-03 usan estas abreviaturas:

- **Comp.**: Complejidad de CRAFT-01.
- **Principal**: Habilidad y Especialización que gobiernan la fabricación.
- **Aux.**: competencia auxiliar mínima cuando sea esencial.
- **Inst.**: instalación mínima.
- **Plano**:
  - **Oficio**: diseño profesional ordinario; quien cumple la competencia puede conocerlo como parte del oficio y no necesita portar un plano físico;
  - **Estable**: requiere Plano estable, aprendizaje equivalente registrado o una fase previa de Diseño válida.
- **Tiempo**: trabajo efectivo de una unidad o Unidad Comercial.
- **CM**: se obtiene por CRAFT-02, normalmente 50% del VR.

Una receta asume materiales preparados para trabajar —madera estacionada, metal utilizable, cuero curtido, vidrio adecuado, etc.—. Obtener, refinar o estabilizar la materia prima puede constituir otro Proyecto y no está incluido en el tiempo de ensamblado.

La fabricación ordinaria de estas recetas es rutinaria y **no requiere tirada** si se cumplen todos los requisitos. Calidad Superior/Excepcional, materiales especiales, modificaciones, runas o encantamientos se resuelven en sus propios CRAFT posteriores.

#### Ajuste y talla

Fabricar una prenda, armadura, empuñadura, arnés o herramienta **desde cero para un usuario conocido incluye el ajuste ordinario de talla** dentro del tiempo y CM de la receta. Tomar medidas normales no es una Adaptación adicional.

La regla de **Adaptación menor +25% / Adaptación mayor +50%** sigue aplicándose cuando:

- se modifica un objeto ya terminado para otro usuario;
- la anatomía, Escala o estructura exige cambios no incluidos en el patrón ordinario;
- se transforma significativamente la configuración física sin crear todavía una modificación de rendimiento de CRAFT-04.

Para una Adaptación realizada como Proyecto, el recargo canónico se trata como **VR del servicio**; CRAFT-02 determina sus materiales y trabajo. Como referencia, una Adaptación menor consume 25% del tiempo base de fabricación y una mayor 50%, con mínimo de 1 hora. Si la adaptación exige rediseño estructural puede elevar la Complejidad conforme a CRAFT-01.

#### Armas cuerpo a cuerpo

Todas las armas metálicas requieren acceso a un **Kit de Artesano** apropiado o herramientas equivalentes. Cuando una receta menciona Forja y metal, el material del mango, asta, remaches o empuñadura se considera parte normal del CM y no exige otra Habilidad salvo que se fabrique mediante un método no ordinario.

| Arma | Comp. | Principal | Inst. | Plano | Tiempo |
|---|---|---|---|---|---:|
| Daga | Estándar | Artesanía Entrenada · Forja y metal | Adecuada | Oficio | 4 h |
| Espada corta | Estándar | Artesanía Entrenada · Forja y metal | Adecuada | Oficio | 1 Jornada |
| Sable | Estándar | Artesanía Entrenada · Forja y metal | Adecuada | Oficio | 1,5 Jornadas |
| Espada larga | Complejo | Artesanía Experta · Forja y metal | Profesional | Oficio | 2 Jornadas |
| Hacha | Estándar | Artesanía Entrenada · Forja y metal | Adecuada | Oficio | 1 Jornada |
| Maza | Estándar | Artesanía Entrenada · Forja y metal | Adecuada | Oficio | 4 h |
| Martillo de guerra | Estándar | Artesanía Entrenada · Forja y metal | Adecuada | Oficio | 1 Jornada |
| Lanza | Estándar | Artesanía Entrenada · Carpintería o Forja y metal | Adecuada | Oficio | 4 h |
| Alabarda | Complejo | Artesanía Experta · Forja y metal | Profesional | Estable | 2 Jornadas |
| Mandoble | Complejo | Artesanía Experta · Forja y metal | Profesional | Estable | 3 Jornadas |
| Gran hacha | Complejo | Artesanía Experta · Forja y metal | Profesional | Oficio | 2 Jornadas |
| Gran martillo | Complejo | Artesanía Experta · Forja y metal | Profesional | Oficio | 2 Jornadas |

La exigencia de Plano estable en Alabarda y Mandoble refleja geometría, balance y unión de componentes; no las convierte en objetos mágicos ni Raros.

El **Cuchillo** del catálogo económico puede fabricarse como herramienta utilitaria Estándar con Artesanía Entrenada · Forja y metal, instalación Adecuada y 3 h de trabajo. CRAFT-03 no le inventa un perfil de combate distinto: si se utiliza como arma, debe existir una entrada mecánica que lo autorice.

#### Armas de proyectil y fuego

| Arma | Comp. | Principal | Auxiliar esencial | Inst. | Plano | Tiempo |
|---|---|---|---|---|---|---:|
| Arco corto | Estándar | Artesanía Entrenada · Carpintería | — | Adecuada | Oficio | 1 Jornada |
| Arco largo | Estándar | Artesanía Entrenada · Carpintería | — | Adecuada | Oficio | 2 Jornadas |
| Ballesta | Complejo | Artesanía Experta · Carpintería **o** Forja y metal | componentes compatibles de la otra fase | Profesional | Estable | 2 Jornadas |
| Ballesta pesada | Complejo | Artesanía Experta · Carpintería **o** Forja y metal | componentes compatibles de la otra fase | Profesional | Estable | 3 Jornadas |
| Pistola temprana | Complejo | Artesanía Experta · Forja y metal | Ingeniería Entrenada · Armamento | Profesional | Estable | 4 Jornadas |
| Rifle temprano | Complejo | Artesanía Experta · Forja y metal | Ingeniería Entrenada · Armamento | Profesional | Estable | 6 Jornadas |
| Pistola repetidora | Magistral | Ingeniería Maestra · Armamento | Artesanía Entrenada · Forja y metal | Especializada | Estable | 8 Jornadas |
| Rifle repetidor | Magistral | Ingeniería Maestra · Armamento | Artesanía Entrenada · Forja y metal | Especializada | Estable | 12 Jornadas |

En una Ballesta, “componentes compatibles de la otra fase” significa que el artesano puede adquirir o reutilizar un arco, mecanismo o herrajes ya fabricados dentro del CM. Fabricar absolutamente todos los componentes desde materia prima puede exigir ambas Especializaciones o colaboración.

Las armas de fuego tempranas son fabricables por un especialista Experto. Las repetidoras permanecen Raras y exigen Ingeniería Maestra, instalación Especializada y Plano estable; su disponibilidad comercial y legal continúa siendo independiente del mero conocimiento técnico.

CRAFT-03 no concede ataques adicionales, cargadores implícitos ni propiedades nuevas a **Repetición**.

#### Munición

La receta cubre exactamente la Unidad Comercial vigente.

| Munición | Unidad | Comp. | Principal | Inst. | Tiempo | Notas |
|---|---:|---|---|---|---:|---|
| Flechas | 20 | Simple | Artesanía Aprendiz | Improvisada | 2 h | método ordinario; Carpintería puede ser pertinente sin ser requisito |
| Virotes | 20 | Simple | Artesanía Aprendiz | Improvisada | 2 h | diseño compatible con ballesta; Carpintería/Forja pueden ser pertinentes sin ser requisito |
| Disparos ordinarios de arma de fuego | 12 | Estándar | Artesanía Entrenada · Forja y metal | Adecuada | 2 h | requiere propelente compatible ya disponible |

Fabricar el **propelente** o una carga alquímica especial no forma parte de esta receta y puede requerir Alquimia. La receta de munición sólo ensambla componentes seguros y conocidos.

No existe descuento material universal por fabricar varias Unidades Comerciales; una prensa, molde o línea de producción futura puede definirlo expresamente.

#### Armaduras

El ajuste ordinario al usuario está incluido. Las recetas producen la Protección y requisitos de FUE ya existentes; no reducen penalizaciones, ruido ni carga por estar “hechas a medida” salvo una propiedad posterior explícita.

| Armadura | Comp. | Principal | Auxiliar | Inst. | Plano | Tiempo |
|---|---|---|---|---|---|---:|
| Armadura ligera | Estándar | Artesanía Entrenada · Cuero y textiles | — | Adecuada | Oficio | 1 Jornada |
| Armadura reforzada | Estándar | Artesanía Entrenada · Cuero y textiles | componentes metálicos ordinarios | Adecuada | Oficio | 2 Jornadas |
| Malla | Estándar | Artesanía Entrenada · Forja y metal | — | Adecuada | Oficio | 5 Jornadas |
| Armadura pesada | Complejo | Artesanía Experta · Forja y metal | Cuero y textiles mediante componentes o colaborador | Profesional | Estable | 5 Jornadas |
| Placas | Complejo | Artesanía Experta · Forja y metal | Cuero y textiles mediante componentes o colaborador | Profesional | Estable | 10 Jornadas |

La **Malla** ilustra que Complejidad y tiempo son independientes: su patrón puede ser un trabajo conocido por un artesano Entrenado, pero requiere muchas horas repetitivas.

Para Armadura pesada y Placas, correas, acolchado y piezas textiles comerciales compatibles pueden adquirirse dentro del CM. Fabricar también esas piezas desde materia prima exige la competencia auxiliar correspondiente, pero no duplica el CM.

#### Escudos

| Escudo | Comp. | Principal | Inst. | Plano | Tiempo |
|---|---|---|---|---|---:|
| Broquel | Estándar | Artesanía Entrenada · Forja y metal | Adecuada | Oficio | 4 h |
| Escudo estándar | Estándar | Artesanía Entrenada · Carpintería o Forja y metal | Adecuada | Oficio | 1 Jornada |
| Escudo pesado | Complejo | Artesanía Experta · Forja y metal | Profesional | Estable | 2 Jornadas |

Fabricar un escudo no modifica sus reglas de frente, Defensa pasiva o Bloqueo.

#### Herramientas y equipo de aventura

| Objeto | Comp. | Principal | Auxiliar | Inst. | Plano | Tiempo |
|---|---|---|---|---|---|---:|
| Gancho de escalada | Simple | Artesanía Aprendiz | — | Improvisada | Oficio | 2 h |
| Palanca | Simple | Artesanía Aprendiz | — | Improvisada | Oficio | 2 h |
| Pico o pala | Estándar | Artesanía Entrenada · Forja y metal | — | Adecuada | Oficio | 4 h |
| Caja pequeña asegurada | Estándar | Artesanía Entrenada · Carpintería | Latrocinio Aprendiz si fabrica también el cierre | Adecuada | Oficio | 6 h |
| Catalejo | Complejo | Artesanía Experta · Vidrio y cristal | Ingeniería Aprendiz | Profesional | Estable | 3 Jornadas |
| Estuche impermeable de documentos/mapas | Estándar | Artesanía Entrenada · Cuero y textiles | — | Adecuada | Oficio | 4 h |

Una Caja pequeña asegurada puede utilizar un cierre comercial compatible dentro del CM; en ese caso no exige Latrocinio. Fabricar el mecanismo de cierre desde cero sí requiere la competencia auxiliar indicada.

Los **Materiales de escritura** son un consumible comercial, no una herramienta reutilizable única. Pueden producirse mediante recetas de oficio locales, pero CRAFT-03 no fija una única técnica universal para tinta, papel, pergamino, carbón y soportes equivalentes.

Los **Repuestos médicos, provisiones y combustible** son consumibles y no pertenecen a las recetas de herramienta reutilizable de CRAFT-03.

#### Kits profesionales

Un Kit profesional representa un **conjunto funcional de herramientas reutilizables**, no un solo objeto. Fabricarlo desde materia prima puede resolverse como un Proyecto de lote. La Habilidad auxiliar garantiza que el fabricante entiende qué instrumentos debe contener y cómo deben quedar calibrados o dispuestos; no sustituye la Habilidad cuando el Kit se usa después.

| Kit | Comp. | Principal | Auxiliar esencial | Inst. | Tiempo |
|---|---|---|---|---|---:|
| Artesano | Estándar | Artesanía Entrenada · especialización coherente | — | Adecuada | 1 Jornada |
| Ingeniería de campo | Estándar | Artesanía Entrenada · Forja y metal | Ingeniería Aprendiz | Adecuada | 2 Jornadas |
| Minería | Estándar | Artesanía Entrenada · Forja y metal | — | Adecuada | 1 Jornada |
| Médico | Estándar | Artesanía Entrenada · Forja y metal o Cuero y textiles | Medicina Aprendiz | Adecuada | 2 Jornadas |
| Alquimia de campo | Estándar | Artesanía Entrenada · Vidrio y cristal | Alquimia Aprendiz | Adecuada | 2 Jornadas |
| Infiltración | Estándar | Artesanía Entrenada · Forja y metal | Latrocinio Aprendiz | Adecuada | 1 Jornada |
| Cartográfico | Estándar | Artesanía Entrenada · Carpintería o Vidrio y cristal | Supervivencia o Investigación Aprendiz | Adecuada | 1 Jornada |
| Navegación | Estándar | Artesanía Entrenada · Vidrio y cristal o Forja y metal | Pilotaje Aprendiz | Adecuada | 2 Jornadas |
| Campaña | Simple | Artesanía Aprendiz | — | Improvisada | 4 h |
| Escalada | Estándar | Artesanía Entrenada · Forja y metal o Cuero y textiles | Atletismo Aprendiz | Adecuada | 1 Jornada |
| Escribanía | Simple | Artesanía Aprendiz | — | Improvisada | 4 h |
| Mercantil | Estándar | Artesanía Entrenada · especialización coherente | Investigación Aprendiz | Adecuada | 1 Jornada |
| Académico | Estándar | Artesanía Entrenada · especialización coherente | Investigación Aprendiz | Adecuada | 2 Jornadas |
| Instrumental Arcano de campo | Complejo | Artesanía Experta · Vidrio y cristal | Arcana Entrenada | Profesional | 3 Jornadas |
| Mantenimiento de armas de fuego | Estándar | Artesanía Entrenada · Forja y metal | Ingeniería Aprendiz; Armamento si Ingeniería está Entrenada | Adecuada | 1 Jornada |

Cuando un Kit contenga una pieza extraordinaria cuya fabricación tenga una receta propia —por ejemplo óptica excepcional, acumulador, instrumental mágico avanzado o explosivo— esa pieza se fabrica o adquiere por separado; el Kit no permite saltarse su requisito.

Un Kit fabricado mediante estas reglas habilita exactamente los mismos métodos que un Kit comercial del mismo tipo. No obtiene bonos adicionales por haber sido fabricado por un PJ.

#### Componentes comerciales y colaboración

CRAFT-03 permite comprar un componente ordinario compatible dentro del CM cuando la receta lo indica. Esto representa una cadena de producción real: un armero puede comprar una culata, una hebilla o un cierre sin dominar necesariamente cada oficio del mundo.

Cuando el personaje decide fabricar él mismo un componente que normalmente podría comprar:

- no paga dos veces el CM;
- debe cumplir la competencia de esa subpieza;
- el tiempo de esa subpieza se añade si no estaba incluido en la receta principal;
- un colaborador puede producirla como Proyecto separado.

Un componente **especial, Raro o Excepcional** nunca queda incluido silenciosamente como “pieza comercial ordinaria”.

#### Reparación por familia

CRAFT-02 fija porcentajes universales. CRAFT-03 identifica quién puede ejecutarlos normalmente:

- armas cuerpo a cuerpo, armaduras, escudos y herramientas ordinarias: **Artesanía** con la Especialización coherente;
- arcos y astas: **Artesanía · Carpintería**;
- ballestas: **Artesanía**, normalmente Carpintería o Forja y metal según la avería;
- armas de fuego tempranas: **Artesanía · Forja y metal**, con Ingeniería cuando la avería sea sistémica;
- repetidoras: **Ingeniería · Armamento**, con Artesanía cuando exista daño físico de piezas;
- óptica: **Artesanía · Vidrio y cristal**, con Ingeniería si falla el mecanismo;
- Kits: la competencia necesaria para reparar la pieza realmente dañada.

Una reparación rutinaria conocida no exige tirada. Diagnósticos inciertos, piezas improvisadas o daño atípico utilizan CRAFT-01.

#### Salvaguardas de CRAFT-03

- Fabricar una entrada existente produce **esa entrada**, no una versión mejor.
- Conocer una receta no concede competencia para usar el objeto en combate.
- Una Habilidad de combate no sustituye Artesanía o Ingeniería para fabricarlo.
- Un arma fabricada por un Maestro no obtiene daño, Penetración o Defensa extra sin CRAFT-04.
- Hacer una armadura a medida no reduce FUE mínima ni Movimiento por sí solo.
- Un Plano de repetidora no convierte su Disponibilidad Rara en Común.
- Comprar componentes ordinarios no permite incluir materiales especiales no pagados.
- Los Kits fabricados no contienen consumibles infinitos.
- Fabricar munición no crea propelente alquímico.
- CRAFT-03 no crea puntos de durabilidad, desgaste diario ni tiradas de mantenimiento.

#### Ejemplos completos

**Espada larga Común.** VR 2 o; CM 1 o. Complejo; Artesanía Experta · Forja y metal; instalación Profesional; 2 Jornadas. Con todos los requisitos se fabrica sin tirada. Si el personaje alquila la instalación durante ambas jornadas, CRAFT-02 añade 4 p de alquiler. No adquiere ningún +1 por ser artesanal.

**Malla Común.** VR 10 o; CM 5 o. Estándar; Artesanía Entrenada · Forja y metal; instalación Adecuada; 5 Jornadas. Su largo tiempo procede del volumen de trabajo, no de una exigencia de rango Experto.

**Placas Comunes.** VR 40 o; CM 20 o. Complejo; Artesanía Experta · Forja y metal; instalación Profesional; Plano estable; 10 Jornadas. El ajuste normal al usuario está incluido.

**Rifle temprano Común.** VR 18 o; CM 9 o. Complejo; Artesanía Experta · Forja y metal + Ingeniería Entrenada · Armamento; instalación Profesional; Plano estable; 6 Jornadas. El proyecto produce el perfil existente y nada más.

**Pistola repetidora Común.** VR 35 o; CM 17 o 5 p. Magistral; Ingeniería Maestra · Armamento + Artesanía Entrenada · Forja y metal; instalación Especializada; Plano estable; 8 Jornadas. Sigue siendo Rara aunque el personaje conozca el Plano.

#### Límites de CRAFT-03

CRAFT-03 no define todavía:

- Calidad Superior y Excepcional;
- propiedades de manufactura;
- materiales especiales;
- modificaciones de rendimiento;
- trampas;
- runas y Piedras de Impronta (definidas en CRAFT-07), encantamientos o sintonización;
- nuevos dispositivos arcano-industriales;
- investigación de diseños nuevos.

CRAFT-04 se desarrolla a continuación.

### CRAFT-04 — Calidad y modificaciones

> **VIGENTE · CERRADO.** CRAFT-04 define la Calidad de manufactura, su coste, requisitos y valor; establece la Capacidad de Modificación de los objetos persistentes; y proporciona un catálogo inicial de modificaciones mundanas. No sustituye CRAFT-05 para materiales especiales ni CRAFT-07/08 para runas, piedras y objetos mágicos.

#### Qué representa la Calidad

La **Calidad** describe la precisión, tolerancias, selección de componentes, acabado funcional y control de manufactura de un objeto. Es independiente de:

- su estado físico actual;
- la rareza o Disponibilidad;
- el material especial del que esté hecho;
- sus runas, encantamientos o componentes mágicos;
- el rango del personaje que lo utiliza.

Un objeto Superior puede estar Dañado y continuar siendo Superior. Reparar su estado no cambia automáticamente su Calidad. Del mismo modo, un objeto Común perfectamente conservado no se vuelve Superior por mantenimiento.

CRAFT-04 se aplica por defecto a **equipo persistente**: armas, armaduras, escudos, herramientas, Kits y otros objetos reutilizables compatibles. Munición, fórmulas alquímicas, cargas, consumibles y objetos de un solo uso no adquieren Calidad Superior/Excepcional mediante esta regla salvo que su receta lo autorice expresamente.

#### Escala de Calidad

| Calidad | Valor de calidad respecto del VR Común | Capacidad de Modificación | Función |
|---|---:|---:|---|
| **Defectuosa** | 50% | 0 | objeto usable con un Defecto de manufactura significativo |
| **Común** | 100% | 0 | perfil normal del catálogo |
| **Superior** | 150% | 1 | manufactura avanzada; admite 1 punto de Modificación |
| **Excepcional** | 250% | 2 | manufactura extraordinaria; admite 2 puntos de Modificación |

La **Capacidad de Modificación (CapM)** es un límite estructural del objeto, no una moneda del personaje. No se compra con PD, PR ni dinero por separado, no se transfiere entre objetos y no se recupera como recurso. Una modificación ocupa 1 o 2 puntos de la CapM mientras forme parte del objeto.

Un objeto no puede superar Calidad Excepcional mediante manufactura mundana ordinaria. Artefactos, materiales sobrenaturales o reliquias pueden romper este límite sólo mediante reglas expresas posteriores.

#### Valor de Referencia de Calidad

El **Valor de Referencia de Calidad (VRQ)** se calcula sobre el VR Común:

- Defectuosa: **VRQ = 50% VR**;
- Común: **VRQ = VR**;
- Superior: **VRQ = 150% VR**;
- Excepcional: **VRQ = 250% VR**.

Para precios y costes se trabaja en cobres. Los costes se redondean hacia arriba; ventas y recuperaciones, hacia abajo conforme a CRAFT-02.

Para fabricar desde cero una pieza de Calidad Superior o Excepcional, el Coste de Materiales sigue siendo 50% de su VRQ:

| Calidad objetivo | CM total respecto del VR Común |
|---|---:|
| Común | 50% |
| Superior | 75% |
| Excepcional | 125% |

El incremento representa selección de materia prima ordinaria de mejor consistencia, descartes, tolerancias, piezas de ajuste y trabajo de preparación. No introduce por sí mismo un material especial de CRAFT-05.

#### Requisitos para Calidad Superior y Excepcional

La Calidad aumenta la exigencia profesional de la receta base.

Para determinar el **rango mínimo de Calidad** se avanza en la escala Aprendiz -> Entrenado -> Experto -> Maestro -> Gran Maestro.

- **Superior:** un rango por encima del mínimo de la receta y nunca menos de **Experto**.
- **Excepcional:** dos rangos por encima del mínimo de la receta y nunca menos de **Maestro**.
- Si el avance excedería Gran Maestro, permanece en **Gran Maestro**; la exigencia adicional se expresa mediante instalación, tiempo, materiales y demás requisitos.

La instalación también aumenta:

- **Superior:** un grado por encima de la instalación mínima de la receta;
- **Excepcional:** dos grados por encima;
- nunca se exige más de instalación **Excepcional**.

El tiempo de fabricación aumenta sobre el tiempo base de CRAFT-03 o la receta correspondiente:

- **Superior:** ×1,5;
- **Excepcional:** ×2.

Estos multiplicadores se aplican antes de Ayuda de trabajo o Aceleración.

Ejemplos de progresión:

- una receta Estándar/Entrenada requiere **Experto** para Superior y **Maestro** para Excepcional;
- una receta Compleja/Experta requiere **Maestro** para Superior y **Gran Maestro** para Excepcional;
- una receta Magistral/Maestra requiere **Gran Maestro** tanto para Superior como para Excepcional, pero Excepcional mantiene mayores costes, tiempo e instalación.

Una tirada alta, Hazaña o margen Dominante nunca sustituye estos requisitos.

#### Calidad Defectuosa

Defectuosa **no es una opción universal para abaratar deliberadamente cualquier receta**. Aparece cuando una regla, consecuencia, improvisación, prototipo o procedencia del objeto establece que el resultado es usable pero posee un defecto de manufactura.

Un objeto Defectuoso:

- conserva su perfil base salvo lo que cambie su Defecto;
- posee **CapM 0**;
- no puede sostener modificaciones positivas de CRAFT-04;
- usa 50% del VR Común como VRQ para mercado y estado;
- requiere corregir su Defecto antes de poder elevarse a Superior o Excepcional.

Un proyecto puede autorizar expresamente producción deliberadamente Defectuosa —por ejemplo equipo de emergencia—, pero debe definir su coste y consecuencia. CRAFT-04 no concede un descuento universal por elegirla.

#### Defectos de manufactura

Un objeto Defectuoso posee normalmente **un Defecto significativo** apropiado a su familia. El Defecto debe registrarse en el Item.

| Defecto | Aplicación | Efecto |
|---|---|---|
| **Pesado** | objeto con FUE mínima | FUE mínima +1 |
| **Ruidoso** | armadura/equipo móvil | puede causar Desventaja a Sigilo por ruido ordinario cuando sea relevante |
| **Desbalanceado** | arma, escudo o herramienta sostenida | -1 a Defensa de Maniobra contra Desarmar mientras se utilice ese objeto |
| **Impreciso** | arma a distancia | -1 a los ataques realizados con esa arma; representa desalineación o tolerancias deficientes del mecanismo |
| **Filo/perfil deficiente** | arma compatible | Daño -1 **o** Pen -1, elegido al registrar el defecto; nunca por debajo de 0 |
| **Recarga torpe** | arma con Recarga | Recarga +1 |
| **Frágil** | objeto físico compatible | si una consecuencia de esfuerzo físico directo lo haría pasar de Operativo a Dañado, pasa a Deshabilitado en su lugar |
| **Mal calibrado** | herramienta o Kit | una operación profesional específica declarada sufre Desventaja cuando dependa de esa calibración |

No todos los Defectos son válidos para todos los objetos. Si ningún Defecto de la tabla representa la falla real, se registra uno específico con impacto comparable antes de utilizar el objeto.

Los Defectos no conceden descuentos, CapM ni beneficios compensatorios.

#### Corregir y elevar Calidad

Una Calidad puede mejorarse sólo cuando la estructura del objeto admite retrabajo. Una receta puede declarar una pieza no actualizable.

Como referencia universal:

| Cambio | Materiales adicionales | Trabajo adicional |
|---|---:|---:|
| Defectuosa -> Común | 25% del VR Común | 50% del tiempo base |
| Común -> Superior | 25% del VR Común | 50% del tiempo base |
| Superior -> Excepcional | 50% del VR Común | 50% del tiempo base |
| Común -> Excepcional directamente | 75% del VR Común | 100% del tiempo base |

Se utilizan los requisitos de rango e instalación de la **Calidad objetivo**.

Defectuosa -> Común elimina el Defecto si éste es físicamente corregible. Un defecto originado por material intrínsecamente inadecuado puede exigir sustituir piezas o hacer imposible la mejora.

Al elevar a Superior puede elegirse hasta 1 punto de Modificación como parte del retrabajo sin pagar además el coste de instalación posterior. Al elevar de Superior a Excepcional puede elegirse el nuevo punto de CapM que queda disponible. Una modificación ya instalada no se cambia gratuitamente durante el ascenso salvo que forme parte del rediseño declarado y se paguen sus costes correspondientes.

Estas proporciones mantienen continuidad económica: mejorar una pieza no crea valor de reventa gratuito sin aportar materiales y trabajo.

#### Modificaciones

Una **Modificación** es una propiedad concreta de manufactura que ocupa CapM. Debe estar físicamente justificada por diseño y ser compatible con el objeto.

Reglas universales:

- una misma Modificación no puede instalarse dos veces en el mismo objeto;
- una propiedad de 2 puntos requiere Calidad Excepcional;
- no puede utilizarse CapM inexistente;
- una Modificación sólo afecta el objeto que la posee;
- si dos propiedades de equipo producen el mismo beneficio mecánico, se utiliza el mayor salvo que una regla diga expresamente que se acumulan;
- reducciones de FUE mínima procedentes de manufactura no se acumulan entre sí;
- CRAFT-04 no puede elevar por sí solo Penetración por encima de **3**;
- CRAFT-04 no puede reducir una Recarga existente por debajo de **1 Acción**;
- ninguna combinación de Modificaciones concede Acciones, Reacciones o ataques adicionales;
- una Modificación no crea Energía, Maná, ranuras rúnicas, encantamientos ni propiedades de material especial.

La CapM de CRAFT-04 es independiente de cualquier capacidad rúnica, energética o de engarce que definan CRAFT posteriores.

#### Instalar o sustituir una Modificación después de fabricar

Si un objeto ya posee CapM libre, una Modificación puede añadirse posteriormente mediante un Proyecto compatible.

Por cada punto de CapM que ocupe la nueva Modificación:

- materiales: **10% del VR Común**;
- trabajo: **25% del tiempo base de fabricación**;
- mínimo de trabajo total: **1 hora**.

El proyecto exige al menos el rango e instalación de la Calidad actual del objeto.

Si la Modificación se definió durante la fabricación inicial Superior/Excepcional o durante el ascenso de Calidad que creó esa CapM, su instalación queda incluida en el coste y tiempo de esa Calidad.

Sustituir una Modificación existente utiliza el mismo coste y tiempo que instalar la nueva. La propiedad anterior deja de funcionar. No existe recuperación monetaria o de materiales automática por retirarla.

Quitar una modificación sin reemplazarla libera su CapM cuando sea físicamente posible; requiere como referencia 10% del tiempo base, mínimo 30 minutos, y no produce VI automático.

#### Catálogo inicial — Modificaciones de 1 punto

| Modificación | Objetos compatibles | Efecto |
|---|---|---|
| **Mantenible** | equipo persistente reparable | el tiempo de reparación de CRAFT-02 se reduce a la mitad; materiales sin cambio; mínimo 10 minutos |
| **Modular** | armas, herramientas, Kits y equipo con componentes separables | se declara una familia de módulo ordinario; con herramientas apropiadas puede intercambiarse en 10 minutos sin Proyecto de Adaptación; el módulo debe existir y no altera estadísticas salvo regla propia |
| **Compacta** | arma o herramienta de una mano que no sea Pesada, de Alcance ni de 2 manos | puede ocultarse donde su versión ordinaria sería evidente; un arma obtiene la propiedad **Ocultable** |
| **Retención segura** | arma o herramienta sostenida | +1 Defensa de Maniobra contra Desarmar mientras ese objeto sea el que se intenta arrebatar |
| **Equilibrada para Parada** | arma válida para Parada | al usar **Parada** con esa arma, su bono es +3 Defensa en vez de +2 |
| **Estabilizada** | arma a distancia no arrojadiza | +1 al ataque si el usuario no gastó Movimiento antes de ese ataque, no está siendo desplazado materialmente y el objetivo se encuentra dentro del alcance óptimo aplicable |
| **Silenciosa** | armadura o equipo corporal compatible | el objeto no causa por sí solo Desventaja a Sigilo por el ruido ordinario de movimiento; correr, golpear superficies u otras fuentes de ruido siguen siendo relevantes |
| **Articulada** | armadura con FUE mínima 1+ | si el usuario está exactamente 1 punto por debajo de la FUE mínima, elimina sólo la Desventaja física causada por esa insuficiencia; Movimiento -1 y Carga Pesada permanecen |
| **Bloqueo afinado** | escudo con Bloqueo | la Reacción Bloqueo concede +3 Defensa en vez de +2 |
| **Herramienta especializada** | herramienta o Kit | elige una operación profesional estrecha y registrada; el objeto satisface el requisito de **una herramienta ordinaria dedicada** para esa operación, pero no sustituye Habilidad, materiales, instalación ni un **Kit completo** cuando la regla exija expresamente ese Kit |
| **Preparada para campo** | herramienta o Kit | elige una operación registrada cuyo mínimo normal sea instalación Adecuada; si físicamente puede ejecutarse en una instalación Improvisada, ignora la Desventaja causada **sólo** por ese déficit de un grado; otros déficits permanecen |

Los modificadores numéricos de esta tabla pertenecen a la fuente **manufactura del objeto**. No se suman con otra propiedad de manufactura que modifique exactamente la misma magnitud en la misma resolución.

**Herramienta especializada y Kits.** Si una operación exige expresamente un Kit profesional —Médico, Alquimia, Ingeniería u otro— una herramienta individual con Herramienta especializada no reemplaza el conjunto. Un Kit Superior sí puede registrar Herramienta especializada para una operación estrecha dentro de su propia familia.

#### Catálogo inicial — Modificaciones de 2 puntos

| Modificación | Objetos compatibles | Efecto |
|---|---|---|
| **Aligerada** | arma, armadura o escudo con FUE mínima 1+ | reduce FUE mínima en 1, mínimo 0; no cambia Daño, Protección ni propiedades; no se acumula con otra reducción de FUE mínima |
| **Golpe optimizado** | arma con perfil de daño propio | Daño +1; es el máximo aumento de Daño que CRAFT-04 puede aportar a ese arma |
| **Perfil penetrante** | arma con Pen 0–2 | Pen +1, máximo Pen 3 mediante CRAFT-04 |
| **Mecanismo de recarga refinado** | arma con Recarga 2+ | Recarga -1; después de todas las reducciones de manufactura y Técnicas, una arma que requiere Recarga no baja de 1 Acción salvo regla expresa posterior |
| **Bastidor móvil** | Escudo pesado | elimina el Movimiento -1 intrínseco del Escudo pesado mientras el usuario cumpla su FUE mínima; no reduce esa FUE mínima |

Una pieza Excepcional puede utilizar dos Modificaciones de 1 punto o una de 2 puntos. No puede tener tres propiedades de 1 punto por pagar dinero adicional: el límite es estructural.

#### Interacción con Técnicas y reglas existentes

**Parada.** Equilibrada para Parada modifica el valor de la Reacción Parada cuando se usa ese arma. No concede una Reacción adicional ni habilita Parada a quien no cumpla sus requisitos.

**Bloqueo.** Bloqueo afinado modifica la Reacción existente del escudo; no concede Bloqueo a un Broquel u objeto que carezca de esa regla.

**Recarga Experta.** Mecanismo de recarga refinado y Recarga Experta pueden reducir una Recarga válida, pero la Recarga final no puede ser inferior a 1 Acción mediante estas fuentes. Ninguna convierte un arma con Recarga en un arma de disparo gratuito.

**Armadura.** Aligerada reduce el requisito de FUE. Articulada sólo suaviza una de las consecuencias de estar exactamente un punto por debajo; no cambia el requisito. Si una armadura posee ambas, primero se calcula su nueva FUE mínima por Aligerada y después se evalúa Articulada.

**Sigilo.** Silenciosa elimina únicamente el ruido ordinario atribuible a la propia construcción. No vuelve invisible al usuario ni cancela terreno, carga, velocidad o ruido producido por otras fuentes.

#### Calidad, estado y reparación

Para un objeto Superior o Excepcional:

- el **VRQ**, no el VR Común, se utiliza para calcular Valor Aplicable y venta;
- los porcentajes de **materiales de reparación** de CRAFT-02 se calculan sobre VRQ mientras no exista un Material Especial; CRAFT-05 utiliza VRT cuando corresponde;
- el tiempo de reparación se calcula sobre el **tiempo de fabricación de esa Calidad**;
- preservar la Calidad y sus Modificaciones exige cumplir los requisitos profesionales de esa Calidad.

Un artesano que sólo cumple los requisitos de la receta Común puede estabilizar, desmontar o realizar tareas simples cuando la ficción lo permita, pero no completa una reparación que certifique nuevamente una pieza Superior/Excepcional sin cumplir sus requisitos.

**Recuperación por desmantelamiento:** la recuperación genérica de CRAFT-02 se calcula sobre el **VR Común**, no sobre VRQ. El valor añadido por precisión y mano de obra de Calidad no se transforma en más metal, cuero o madera al desmontar la pieza. CRAFT-05 añade, cuando corresponda, recuperación separada del Suplemento Material; componentes especiales recuperables siguen tratándose por separado.

La Modificación Mantenible reduce el tiempo, no la competencia ni el coste material de reparar.

#### Interacción con materiales, runas y magia

CRAFT-04 reserva explícitamente espacios de diseño para sistemas posteriores:

- CRAFT-05 otorga propiedades por **material**, separadas de CapM;
- CRAFT-07 define engarces, Piedras de Impronta y Capacidad Rúnica;
- CRAFT-08 define Encantamientos autónomos y Sintonización;
- Ingeniería puede añadir componentes con Energía/Caudal/Consumo.

Esas fuentes no obtienen CapM gratis ni consumen CapM salvo que su propia regla lo indique.

Si una propiedad posterior reproduce exactamente un beneficio de CRAFT-04 —por ejemplo reducir FUE mínima, aumentar Daño o aumentar Pen— **no se acumula por defecto**. Se utiliza el mejor efecto salvo autorización explícita.

#### Ejemplos

**Espada larga Superior.** VR Común 2 o. VRQ 3 o; CM 1 o 5 p. La receta base es Compleja/Experta, por lo que Superior exige Artesanía Maestra · Forja y metal e instalación Especializada. Tiempo: 3 Jornadas. CapM 1. Puede elegirse, por ejemplo, Equilibrada para Parada o Retención segura, pero no Golpe optimizado.

**Espada larga Excepcional.** VRQ 5 o; CM 2 o 5 p. Exige Gran Maestro, instalación Excepcional y 4 Jornadas. CapM 2. Puede tomar Golpe optimizado (+1 Daño), Perfil penetrante (+1 Pen hasta 3) **o** dos modificaciones de 1 punto.

**Malla Superior.** VR Común 10 o; VRQ 15 o; CM 7 o 5 p. Requiere Artesanía Experta · Forja y metal, instalación Profesional y 7,5 Jornadas. CapM 1. Silenciosa es una opción válida; Aligerada no, porque cuesta 2.

**Placas Excepcionales.** VR Común 40 o; VRQ 100 o; CM 50 o. Requieren Artesanía Gran Maestra · Forja y metal, instalación Excepcional y 20 Jornadas. CapM 2. Pueden ser Aligeradas, reduciendo FUE mínima 3 -> 2, o combinar dos propiedades de 1 punto como Silenciosa + Mantenible.

**Rifle temprano Excepcional.** VR Común 18 o; VRQ 45 o; CM 22 o 5 p. Requiere el rango de Calidad correspondiente, instalación Excepcional y 12 Jornadas. Puede usar Golpe optimizado para Daño 8, pero Perfil penetrante no puede aumentar su Pen 3 mediante CRAFT-04.

**Escudo estándar Superior.** VR Común 1 o 5 p; VRQ 2 o 2 p 5 c; CapM 1. Bloqueo afinado eleva Bloqueo +2 -> +3 sin alterar su Defensa pasiva frontal.

#### Salvaguardas de CRAFT-04

- Calidad no es estado ni rareza.
- Superior/Excepcional no entregan un +1/+2 universal.
- CapM es capacidad del objeto, no una nueva economía del personaje.
- No se compra CapM adicional con oro.
- Un Maestro no obtiene Calidad Superior gratis por superar una prueba.
- Un objeto Común no recibe una Modificación positiva sólo por personalización narrativa.
- Daño sólo puede aumentar +1 por CRAFT-04.
- Pen sólo puede aumentar +1 y nunca superar 3 por CRAFT-04.
- Recarga no baja de 1 Acción por manufactura/Técnica ordinaria.
- FUE mínima sólo puede reducirse 1 por manufactura.
- Ninguna Modificación añade acciones, ataques, Reacciones, Maná o Energía.
- Defectos nunca financian mejoras positivas.
- La recuperación de chatarra no multiplica el valor de Calidad.
- Reparar un objeto de Calidad no permite mantener esa Calidad con competencia insuficiente.
- Una propiedad material, rúnica o mágica equivalente no se acumula por defecto.

#### Límites de CRAFT-04

CRAFT-04 no define todavía:

- materiales especiales concretos y sus propiedades;
- extracción/refinado de dichos materiales;
- trampas;
- runas, Piedras de Impronta y engarces (definidos en CRAFT-07), encantamientos y sintonización;
- dispositivos arcano-industriales nuevos;
- investigación de propiedades no catalogadas.

CRAFT-05 se desarrolla a continuación.

### CRAFT-05 — Materiales especiales

> **VIGENTE · CERRADO.** CRAFT-05 define cómo los materiales Especializados, Raros y Excepcionales entran en un Proyecto; separa sus propiedades de Calidad y Modificaciones; fija coste, dificultad de trabajo, recuperación y compatibilidad; y ratifica un primer catálogo material basado en recursos y regiones que ya existen en el canon.

#### Relación con el canon del mundo

El canon previo ya establece, entre otros elementos, que:

- Kharum produce acero, aleaciones y piezas de precisión de alta calidad;
- Erelia comercializa madera tratada, plantas raras y recursos ambientales;
- existen grandes depósitos de cristal arcano y éste se refina para acumuladores, instrumentos y laboratorios;
- el Desierto de Vidrio contiene regiones vitrificadas por un fenómeno mágico antiguo;
- el Bosque de las Mil Voces presenta anomalías acústicas y mágicas;
- existen ruinas y maquinaria de los Fundadores;
- los Cristales de Resonancia son formaciones excepcionalmente raras vinculadas a los Familiares.

CRAFT-05 **añade ahora canon mecánico** sobre esa base. Los nombres normalizados y propiedades de material de las tablas siguientes no implican que toda materia procedente de una región posea esas propiedades. «Acero de Kharum», por ejemplo, designa aquí una calidad material especial certificada o equivalente, no cualquier pieza de acero producida dentro de Kharum.

#### Material ordinario y material especial

Una receta de CRAFT-03 presupone materiales ordinarios adecuados y ya preparados.

Un **Material Especial** posee:

- **Nombre**;
- **Familia**: Metal, Madera, Cristal, Vidrio/Mineral, Orgánico, Técnico u otra;
- **Grado de recurso**: Especializado, Raro o Excepcional;
- **Cobertura mínima** necesaria para obtener su propiedad;
- **Disponibilidad**;
- **Propiedad material**;
- cualquier requisito de preparación o compatibilidad.

La propiedad material es una fuente mecánica distinta de:

- Calidad;
- Modificaciones de CRAFT-04;
- runas o piedras;
- encantamientos;
- dispositivos;
- efectos mágicos temporales.

No consume CapM y tampoco concede CapM.

#### Cobertura material

El material especial debe ocupar una parte físicamente relevante del objeto.

| Cobertura | Coeficiente | Ejemplo conceptual |
|---|---:|---|
| **Componente** | 25% | lente, núcleo, mecanismo, placa funcional concreta |
| **Mayor** | 50% | hoja parcial, arco principal, revestimiento funcional importante |
| **Dominante** | 100% | estructura principal, cuerpo, placas principales, armazón |

La entrada del material indica qué cobertura mínima necesita para conceder su propiedad.

Un objeto puede tener **un Material Dominante**. Puede contener además materiales especiales como Componentes o partes Mayores sólo cuando la receta o el diseño identifique una función física real para ellos. Añadir incrustaciones decorativas no crea una propiedad.

Varios materiales pueden coexistir si ocupan funciones diferentes, pero dos propiedades que modifican exactamente la misma magnitud no se acumulan salvo regla expresa.

#### Suplemento Material

CRAFT-02 ya cubre el material ordinario de una receta. Sustituir una parte por material especial añade un **Suplemento Material (SM)**.

Para una sustitución Dominante:

| Grado | SM respecto del VR Común |
|---|---:|
| **Especializado** | +25% |
| **Raro** | +50% |
| **Excepcional** | +100% |

Para cobertura Mayor o Componente se multiplica por su coeficiente.

**SM = VR Común × porcentaje del Grado × coeficiente de Cobertura**, redondeado hacia arriba al cobre.

El coste material total de fabricación es:

**CM total = CM de la Calidad + suma de SM + componentes especiales separados.**

Un Lote de Material Especial compatible puede pagar su SM mediante su Valor de Insumo. El VI utilizado se consume físicamente en el Proyecto.

#### Valor de Referencia Total

El valor añadido por material especial se calcula sin crear arbitraje:

**Valor Material Añadido = 2 × SM.**

**Valor de Referencia Total (VRT) = VRQ + suma de Valores Materiales Añadidos.**

VRQ procede de CRAFT-04; en un objeto Común, VRQ = VR Común.

El estado físico, venta rápida y venta directa se calculan sobre VRT.

Esta relación es deliberada: una venta directa ordinaria de referencia recupera aproximadamente la mitad de VRT, por lo que el incremento de valor por material nunca supera el SM invertido antes de contar trabajo.

#### Dificultad de trabajar materiales especiales

La dificultad material se acumula con la exigencia de Calidad.

| Grado | Ajuste de Proyecto | Instalación | Tiempo |
|---|---|---|---:|
| **Especializado** | sin subir categoría; mínimo Artesanía/competencia Entrenada cuando corresponda | sin cambio | ×1 |
| **Raro** | +1 categoría efectiva de Complejidad | +1 grado | ×1,25 |
| **Excepcional** | +2 categorías efectivas de Complejidad | +2 grados | ×1,5 |

Los límites siguen siendo Extraordinario, Gran Maestro e instalación Excepcional.

Los ajustes de **Calidad y Material** se aplican ambos. Ejemplo: una receta Compleja/Experta fabricada como Superior con un material Raro exige normalmente el equivalente profesional de Gran Maestro.

Cuando el material sólo es un Componente adquirido ya preparado, su entrada puede declarar que no aumenta la Complejidad de todo el objeto y que sólo exige una fase de integración. Si no lo declara, se aplica la regla general.

La fabricación sigue siendo rutinaria y sin tirada cuando todos los requisitos resultantes se cumplen.

#### Lotes: Bruto y Preparado

Un Lote de Material Especial registra además su estado:

- **Bruto:** extraído, recuperado o hallado, pero todavía no apto para sustituir material de una receta salvo regla expresa.
- **Preparado:** refinado, estabilizado, curado, cortado o procesado hasta ser utilizable.

Preparar un Lote **no aumenta automáticamente su VI**. Cambia su usabilidad, no crea materia ni valor de la nada.

La preparación usa la competencia que corresponda a la naturaleza del material:

- Artesanía para metal, madera, cuero, vidrio y trabajo material ordinario;
- Ingeniería para componentes técnicos o procesos industriales;
- Alquimia para reactivos o estabilización química;
- Arcana cuando el problema principal sea una propiedad mágica;
- Naturaleza/Supervivencia cuando la extracción o conservación dependa principalmente de un recurso vivo o ambiental.

Puede ser un Proyecto multidisciplinario.

#### Extracción y rendimiento

CRAFT-05 no genera una cantidad universal de material por tirada.

La escena, yacimiento, criatura, ruina o recompensa determina cuánto material físicamente existe y cuál es su **VI máximo recuperable**.

Una prueba puede decidir:

- si se localiza una veta utilizable;
- si la extracción preserva una propiedad;
- si se evita contaminación;
- cuánto material físicamente presente se pierde;
- si un componente puede recuperarse intacto.

Un margen alto nunca multiplica una reserva más allá de lo que estaba presente.

Los recursos agotados no reaparecen porque se repita la prueba.

#### Identificación

Un material conocido puede identificarse sin tirada por un personaje competente con tiempo y medios adecuados.

Un material desconocido, adulterado o anómalo puede exigir Investigación, Artesanía, Ingeniería, Arcana, Naturaleza o Alquimia según el problema.

Identificar un material no revela automáticamente una propiedad que todavía no exista como canon. Un material de criatura o Fundador sin perfil estable requiere investigación antes de obtener beneficios mecánicos.

#### Catálogo inicial de Materiales Especiales

##### Acero de Kharum

- **Familia:** Metal.
- **Grado:** Especializado.
- **Cobertura mínima:** Dominante.
- **Disponibilidad:** Profesional; el acceso puede ser más sencillo en Kharum.
- **Compatibilidad habitual:** armas metálicas, armaduras, escudos, herramientas y estructuras.
- **Propiedad — Tenacidad de Kharum:** cuando una sola consecuencia de impacto, torsión o esfuerzo físico directo fuera a empeorar el estado del objeto **dos o más pasos de una vez**, reduce ese empeoramiento en un paso. No reduce daño sufrido por el usuario y no protege automáticamente contra fuego, corrosión, magia o un efecto que destruya material por otra causa.
- **Apilamiento:** no se combina con otra propiedad que reduzca la misma degradación estructural; se usa la mejor.

Esta entrada representa acero producido con estándares y tratamiento capaces de justificar la propiedad, no todo acero originario de Kharum.

##### Madera tratada de Erelia

- **Familia:** Madera.
- **Grado:** Especializado.
- **Cobertura mínima:** Mayor.
- **Disponibilidad:** Profesional.
- **Compatibilidad habitual:** arcos, astas, escudos, herramientas, cajas, componentes de vehículos o estructuras.
- **Propiedad — Estabilidad ambiental:** humedad ordinaria, lluvia, hongos comunes, secado y cambios normales de temperatura no causan por sí solos Desventaja por deformación del objeto ni deterioro de estado. No protege de fuego, congelación extrema, sustancias corrosivas, zonas mágicas hostiles o abandono prolongado.
- **Apilamiento:** una propiedad mágica o material equivalente no añade una segunda inmunidad.

La frase «madera tratada» ya existe en el comercio de Erelia; CRAFT-05 fija ahora esta variante mecánica especial.

##### Cristal arcano refinado

- **Familia:** Cristal / Arcano.
- **Grado:** Especializado.
- **Cobertura mínima:** Componente.
- **Disponibilidad:** Profesional; puede ser Restringida según jurisdicción y uso.
- **Compatibilidad habitual:** acumuladores, instrumentos arcanos, laboratorios, dispositivos y futuros soportes rúnicos compatibles.
- **Propiedad — Conductor arcano:** cuenta como conductor/foco material compatible cuando una receta de dispositivo, instrumento o subsistema arcano exija cristal conductor. No produce Energía, Caudal, Estabilidad, Maná, hechizos, CapM ni ranuras por sí mismo.
- **Integración:** cuando se adquiere ya refinado como Componente, no aumenta por sí solo la Complejidad total; la receta del dispositivo define la fase de integración.
- **Exclusión:** no es un Cristal de Resonancia.

##### Aleación de precisión de Kharum

- **Familia:** Metal.
- **Grado:** Raro.
- **Cobertura mínima:** Mayor.
- **Disponibilidad:** Rara.
- **Compatibilidad habitual:** armas de fuego, ballestas complejas, mecanismos, herramientas de precisión, dispositivos.
- **Propiedad — Mecanizado fino:** no aumenta CapM, pero facilita modificaciones posteriores compatibles con sus piezas metálicas. Instalar o sustituir Modificaciones de CRAFT-04 en la parte fabricada con esta aleación cuesta **5% del VR Común en materiales por punto de CapM** en lugar de 10%, y **15% del tiempo base por punto** en lugar de 25%, con los mismos mínimos y requisitos profesionales.
- **Límite:** no reduce coste/tiempo de una modificación que dependa principalmente de otra parte del objeto ni permite instalar una Modificación incompatible.

Esta aleación es una extensión mecánica de la tradición canónica de acero, aleaciones y piezas de precisión de Kharum.

##### Vidrio del Desierto

- **Familia:** Vidrio / Mineral.
- **Grado:** Raro.
- **Cobertura mínima:** Componente en instrumentos ópticos; Mayor en objetos cuya función dependa del vidrio.
- **Disponibilidad:** Rara.
- **Compatibilidad habitual:** catalejos, visores, instrumentos arcanos, óptica especializada.
- **Propiedad — Refracción liminal:** cuando un instrumento óptico funcional utiliza Vidrio del Desierto en su elemento principal, concede **Ventaja a PER + Arcana** para analizar una distorsión, anomalía o manifestación mágica **visualmente observable a través del instrumento**.
- **Límites:** no detecta magia invisible, no identifica automáticamente un hechizo, no ve a través de obstáculos y no anula por sí sola una ilusión.
- **Preparación:** tallar y estabilizar una pieza funcional utiliza las reglas de material Raro y Artesanía · Vidrio y cristal.

El Desierto de Vidrio y sus anomalías visuales son canónicos; la persistencia útil de esta propiedad en piezas seleccionadas queda ratificada por CRAFT-05.

##### Madera de las Mil Voces

- **Familia:** Madera.
- **Grado:** Raro.
- **Cobertura mínima:** Mayor.
- **Disponibilidad:** Rara y potencialmente regulada por comunidades de Erelia.
- **Compatibilidad habitual:** arcos, astas, instrumentos, herramientas, componentes corporales o estructuras ligeras.
- **Propiedad — Amortiguación acústica:** el objeto no produce por sí mismo el crujido, resonancia o ruido incidental ordinario que normalmente delataría su manipulación. Cuando se aplica a equipo corporal compatible, cuenta como un efecto equivalente a **Silenciosa** de CRAFT-04 y no se acumula con ella.
- **Límites:** no silencia impactos, pasos, voz, disparos, mecanismos explosivos ni ruido producido por otra fuente.

El Bosque de las Mil Voces es canónico; que determinadas piezas tratadas conserven esta propiedad es una ratificación mecánica nueva de CRAFT-05.

##### Material de los Fundadores recuperado

- **Familia:** Técnico / variable.
- **Grado:** Excepcional.
- **Cobertura:** depende del Lote.
- **Disponibilidad:** Excepcional; normalmente procede de ruinas, maquinaria o expediciones.
- **Propiedad universal:** **ninguna**.
- **Regla:** cada Lote debe identificarse y, si se pretende explotar una propiedad no conocida, pasar por Investigación/Prototipo conforme a CRAFT-10. No existe una «aleación Fundadora +X» genérica.
- **Uso:** un Plano estable concreto puede autorizarlo como material Excepcional y definir entonces su propiedad, cobertura y compatibilidad.
- **Salvaguarda:** la procedencia Fundadora no permite copiar automáticamente tecnología ni superar Caudal, Energía, Protección, daño o límites mágicos.

El canon establece maquinaria y complejos de los Fundadores, pero no una composición material universal; CRAFT-05 preserva deliberadamente esa incertidumbre.

#### Materiales de criaturas

Piel, hueso, quitina, escamas, fibras, tejidos mineralizados u otras partes de criaturas pueden existir como Lotes de Material.

Regla universal:

**una parte de criatura no hereda automáticamente las capacidades de la criatura.**

Ejemplos de inferencias prohibidas sin perfil expreso:

- piel de troll no concede Regeneración;
- hueso de criatura voladora no concede vuelo;
- escama de criatura resistente al fuego no concede automáticamente inmunidad al fuego;
- tejido mágico no concede Maná.

Una criatura o Proyecto futuro puede definir un **Perfil de Material** con Grado, Familia, Cobertura, SM y propiedad. Hasta entonces el Lote sólo puede aportar VI como material físicamente compatible y no posee un beneficio extraordinario.

#### Cristales de Resonancia: exclusión expresa

Los **Cristales de Resonancia** no forman parte del catálogo de materiales de equipo de CRAFT-05.

- no se usan como gema de arma o armadura por defecto;
- no conceden ranuras;
- no añaden Maná;
- no actúan como batería;
- no tienen un VI universal para fabricación;
- no pueden triturarse o subdividirse para obtener beneficios de crafting sin una regla futura expresa.

Su función canónica continúa vinculada a la resonancia individual y a los Familiares.

CRAFT-07 utiliza **Piedras de Impronta**, fabricadas a partir de matrices arcanas procesadas, y no reutiliza los Cristales de Resonancia.

#### Reactivos alquímicos

Los reactivos raros exportados por Erelia y archipiélagos existen en el canon, pero **no son automáticamente materiales persistentes de CRAFT-05**.

Cuando un reactivo se consume en una Fórmula, pertenece a Alquimia y a la receta de esa Fórmula. Sólo entra en CRAFT-05 si una entrada concreta establece que permanece como componente físico del objeto terminado.

#### Calidad + Material + Modificación

Las tres fuentes se resuelven en este orden:

1. **Receta base** de CRAFT-03.
2. **Calidad** de CRAFT-04.
3. **Material Especial** de CRAFT-05.
4. **Modificaciones** que ocupe la CapM disponible.

Los requisitos profesionales e instalación se acumulan según sus reglas; los techos permanecen Gran Maestro e instalación Excepcional.

Los multiplicadores de tiempo de Calidad y Material se multiplican entre sí.

Ejemplo: una receta de 4 Jornadas, Superior (×1,5) y con material Raro (×1,25) requiere **7,5 Jornadas** antes de Ayuda o Aceleración.

Las propiedades no se acumulan sólo por proceder de fuentes distintas. Si Material y Modificación producen el mismo beneficio, se aplica el mejor salvo regla expresa.

#### Incorporar material a un objeto existente

Un **Componente** o parte Mayor puede reemplazarse después de fabricar sólo cuando la estructura del objeto lo permita.

Como referencia:

- sustituir un Componente: SM correspondiente + **25% del tiempo base**;
- sustituir una parte Mayor: SM correspondiente + **50% del tiempo base**;
- mínimo 1 hora;
- se aplican los requisitos profesionales del material y de la Calidad actual.

Cambiar el **Material Dominante** no es una modificación menor. Requiere reconstrucción conforme a una receta específica o fabricar nuevamente el objeto; el equipo existente puede aportar VI mediante desmantelamiento y recuperación.

Esto impide convertir una espada de hierro en «espada de material legendario» reemplazando narrativamente una pieza trivial.

#### Reparación de materiales especiales

El VRT reemplaza a VRQ como base de Valor Aplicable. Para reparación, se incorpora el valor del Material Especial a la **BRA de CRAFT-02 sólo cuando la consecuencia afecta la parte que sostiene esa propiedad**.

Si la parte dañada que sostiene la propiedad material debe ser reemplazada, la reparación requiere material especial compatible. Sustituirla por material ordinario puede restaurar el estado Operativo, pero elimina la propiedad material correspondiente y obliga a recalcular VRT.

Un componente especial con precio/adquisición separado sigue la regla de CRAFT-02: si se sustituye explícitamente, no se cobra una segunda vez dentro del porcentaje genérico.

#### Desmantelamiento y recuperación material

La recuperación ordinaria de CRAFT-02 sigue calculándose sobre VR Común. La Calidad no crea materia adicional.

Además puede recuperarse parte del SM como **VI del Material Especial compatible**:

| Estado | VI especial recuperable respecto del SM original |
|---|---:|
| Operativo / intacto | 50% |
| Dañado | 30% |
| Deshabilitado | 20% |
| Arruinado recuperable | 10% |
| Destruido | 0% salvo componente especial físicamente superviviente |

Se redondea hacia abajo al cobre.

Un componente especial identificable recuperado por separado se excluye de esta tabla para no recuperarlo dos veces.

En un objeto intacto, la suma de recuperación ordinaria + especial no supera por defecto la venta rápida equivalente del objeto materialmente mejorado.

#### Ejemplos económicos

**Espada larga Común de Acero de Kharum.** VR Común 2 o. CM ordinario 1 o. SM Dominante Especializado = 5 p. CM total = 1 o 5 p. Valor Material Añadido = 1 o. VRT = 3 o. Su propiedad es Tenacidad de Kharum; no obtiene Daño ni Pen adicionales.

**Arco largo Común de Madera tratada de Erelia.** VR 2 o. Como cobertura Dominante Especializada, SM = 5 p. CM total = 1 o 5 p. VRT = 3 o. La pieza gana Estabilidad ambiental.

**Catalejo Común con Vidrio del Desierto.** VR 1 o. Cobertura Componente Rara: SM = 1 p 3 c. Valor añadido = 2 p 6 c. VRT = 1 o 2 p 6 c. La fase material es Rara y debe cumplir sus requisitos; el instrumento concede su Ventaja sólo para el análisis visual definido.

**Placas Excepcionales de Acero de Kharum.** VR Común 40 o. VRQ Excepcional 100 o. CM de Calidad 50 o. SM Dominante Especializado = 10 o. CM total = 60 o. VRT = 120 o. Conservan Protección 5: el material añade Tenacidad, no Protección.

#### Salvaguardas de CRAFT-05

- un material especial no consume ni concede CapM;
- no toda materia de Kharum, Erelia, el Desierto o el Bosque posee automáticamente la entrada especial;
- una propiedad material equivalente a una Modificación no se acumula por proceder de otra fuente;
- el dinero no garantiza acceso a recursos Raros/Excepcionales;
- un margen alto no crea más mineral, cristal, madera o partes de criatura de los que existen;
- preparar un Lote no aumenta automáticamente su VI;
- un material de criatura no hereda poderes sin Perfil de Material;
- material Fundador no concede tecnología gratuita;
- Cristales de Resonancia no son gemas de crafting;
- cristal arcano refinado no genera Energía ni Maná;
- sustituir el Material Dominante requiere reconstrucción o receta expresa;
- el VRT preserva la economía anti-arbitraje de CRAFT-02;
- la recuperación especial nunca duplica un componente recuperado por separado.

#### Límites de CRAFT-05

CRAFT-05 no define todavía:

- trampas completas (definidas posteriormente en CRAFT-06);
- catálogo de componentes obtenidos de criaturas concretas;
- propiedades específicas de materiales Fundadores todavía desconocidos;
- runas y Piedras de Impronta (definidas en CRAFT-07) o sintonización;
- encantamientos;
- nuevos dispositivos arcano-industriales;
- investigación para crear materiales inéditos.

CRAFT-06 se desarrolla a continuación.

### CRAFT-06 — Trampas y construcciones

> **VIGENTE · CERRADO.** CRAFT-06 define trampas físicas, disparadores, mecanismos, cargas, ocultación, detección, desactivación, rearme y construcciones de campaña. Reutiliza efectos ya cuantificados del sistema en vez de crear una economía paralela de daño. Las runas, encantamientos y dispositivos avanzados permanecen para CRAFT posteriores.

#### Principio de una trampa

Una **Trampa** es un Proyecto que conecta:

**Disparador -> Mecanismo -> Carga/Efecto**

y puede añadir:

**Ocultación -> Método de desactivación -> Bypass -> Rearme**

La trampa determina **cuándo** y **cómo** se libera un efecto. No inventa gratuitamente un efecto más potente que la carga real instalada.

Toda entrada de trampa debe registrar:

- nombre;
- Complejidad;
- disparador;
- mecanismo;
- carga o efecto;
- objetivo/área;
- Precisión de mecanismo cuando corresponda;
- DF de Mecanismo;
- Ocultación y DF de Detección;
- método de Desactivación;
- Bypass, si existe;
- si es de un solo uso o rearmable;
- coste del armazón;
- coste de la carga;
- tiempo de montaje;
- componentes recuperables.

#### Armazón de Trampa

El **Armazón** incluye disparador, fijaciones, transmisiones, resortes, cables, soportes y piezas ordinarias necesarias para que la trampa funcione. La carga se paga por separado.

| Armazón | Comp. | Requisito principal | Instalación | VR del armazón | Tiempo | Precisión | DF de Mecanismo |
|---|---|---|---|---:|---:|---:|---:|
| **Simple** | Simple | Latrocinio Aprendiz | Improvisada | 2 p | 30 min | +2 | 10 |
| **Estándar** | Estándar | Latrocinio Entrenado · Trampas y seguridad física | Adecuada | 1 o | 2 h | +4 | 12 |
| **Complejo** | Complejo | Latrocinio Experto · Trampas y seguridad física | Profesional | 4 o | 1 Jornada | +6 | 14 |
| **Magistral** | Magistral | Latrocinio Maestro · Trampas y seguridad física | Especializada | 12 o | 3 Jornadas | +8 | 16 |
| **Extraordinario** | Extraordinario | Latrocinio Gran Maestro · Trampas y seguridad física | Excepcional | Variable, normalmente 30 o+ | por etapas | +10 | 18 |

El CM del armazón usa CRAFT-02, normalmente 50% de su VR.

**Precisión** sólo se usa cuando el mecanismo debe realizar una tirada de ataque o maniobra. No se suma a una carga que ya posea su propia resolución.

La **DF de Mecanismo** se usa como referencia para Desactivación y, cuando corresponda, para escapar de una sujeción mecánica. Ocultación utiliza una DF separada.

Un Armazón Extraordinario no autoriza por sí mismo daño Extraordinario, identificación inteligente de objetivos, múltiples ataques o magia.

#### Competencias auxiliares

Latrocinio gobierna integración, seguridad, disparadores y desactivación, pero no sustituye otros oficios.

Puede requerirse además:

- **Artesanía** para fabricar piezas, marcos, resortes, carpintería, metal o textiles;
- **Ingeniería** para mecanismos complejos, temporizadores, transmisión, presión o integración técnica;
- **Alquimia** para preparar una carga alquímica;
- **Armas** sólo cuando una acción posterior de una persona, y no el mecanismo, utiliza realmente esa arma;
- **Arcana/Ritualismo** únicamente si un subsistema mágico futuro habilita una carga compatible.

Como referencia:

- Armazón Simple/Estándar puede usar piezas ordinarias adquiridas dentro de su CM.
- Complejo exige **Artesanía o Ingeniería Entrenada** cuando el mecanismo dependa de piezas no comerciales o integración técnica.
- Magistral exige normalmente **Ingeniería Experta** o Artesanía Experta apropiada como Auxiliar.
- Extraordinario define sus Auxiliares por etapas.

Un personaje puede fabricar por separado los componentes con CRAFT-03. No paga dos veces el mismo componente.

#### Excepción: trampa de supervivencia

Una alarma, lazo o trampa de captura **Simple**, construida principalmente con recursos naturales y sin carga dañina de arma, explosivo, veneno o dispositivo, puede usar **Supervivencia Aprendiz** como Principal en lugar de Latrocinio.

Esta excepción no permite fabricar mecanismos Estándar+, ocultación profesional, armas automáticas o seguridad compleja mediante Supervivencia.

#### Disparadores

Un disparador sólo responde a aquello que físicamente puede detectar.

| Disparador | Requisito mínimo | Regla |
|---|---|---|
| **Manual** | Simple | una persona acciona físicamente el mecanismo |
| **Contacto/presión** | Simple | se activa al ejercer la presión o contacto definido |
| **Cable/paso** | Simple | se activa al tensar, cortar o desplazar un elemento físico |
| **Apertura/manipulación** | Estándar | puerta, tapa, cofre, cerradura u objeto mueve el mecanismo |
| **Liberación de peso** | Estándar | se activa al retirar o añadir una carga física definida |
| **Retardo mecánico** | Complejo | temporizador o demora física calibrada |
| **Transmisión remota física** | Complejo | cable, conducto o enlace material hasta un operador/mecanismo |
| **Condición física múltiple** | Magistral | exige una combinación concreta de dos condiciones mecánicas observables |

Un disparador ordinario **no reconoce aliados, enemigos, especie, intención, nombre, aura o identidad**. Para esa selectividad se necesita un sensor/dispositivo/regla que realmente la proporcione.

**Disparador manual en combate:** activarlo consume normalmente la **Acción** del operador. Si desea hacerlo como respuesta a un evento durante la ronda, utiliza las reglas de **Preparar** y su Reacción salvo que una capacidad específica autorice otra economía.

Un disparador automático ya preparado no consume la Acción o Reacción del constructor cuando se activa posteriormente. Esa ventaja ha sido pagada mediante preparación previa, posición, materiales y riesgo de ser detectado.

#### Cargas y efectos

CRAFT-06 clasifica cargas por cómo obtienen su efecto.

##### Alarma

Campana, chasquido, caída de señal, cuerda tensada u otro aviso físico.

- no realiza ataque;
- informa sólo a quien pueda percibir realmente la señal;
- no concede Iniciativa, Acción o conocimiento perfecto de quién activó la trampa;
- si inicia un conflicto, se aplican las reglas normales de percepción e Iniciativa.

##### Maniobra mecánica

Un lazo, red, cable, placa móvil u otro mecanismo puede intentar **Derribar** o **Agarrar**.

Resuelve:

**2d10 + Precisión del Armazón contra Defensa de Maniobra.**

Si el efecto es **Derribar**, un éxito aplica Derribado y no causa daño por sí mismo.

Si es **Agarrar**, un éxito aplica Agarrado por el mecanismo. Escapar requiere una Acción y normalmente **FUE + Atletismo o AGI + Acrobacia contra la DF de Mecanismo**.

La trampa no arrastra, estrangula, causa daño repetido ni inmoviliza extremidades adicionales salvo que una entrada específica lo defina.

##### Golpe mecánico

Una trampa puede liberar un arma, proyectil o pieza de impacto físicamente preparada.

Resuelve:

**2d10 + Precisión del Armazón contra Defensa.**

En un impacto utiliza **el Daño y Pen impresos de la carga instalada**, sin Atributo de daño del constructor, usuario o víctima.

La carga compatible queda limitada por el Armazón:

| Armazón | Límite ordinario de carga de Golpe |
|---|---|
| Simple | no admite carga dañina automática |
| Estándar | Daño impreso hasta 5 y Pen hasta 1 |
| Complejo | Daño impreso hasta 8 y Pen hasta 2 |
| Magistral | cualquier arma ordinaria del catálogo, respetando sus requisitos físicos de montaje |
| Extraordinario | perfil específico auditado; no se infiere poder adicional |

Montar un arma no duplica su precio dentro del armazón: el arma existe como carga y debe comprarse, fabricarse o aportarse físicamente.

Un arma con munición consume munición al activarse. Una carga que requiere recarga queda descargada después del disparo y debe rearmarse conforme a sus requisitos.

##### Carga alquímica

Una preparación alquímica o explosiva puede integrarse si existe físicamente y su forma de activación es compatible.

Al activarse utiliza **exactamente su efecto normal**.

Ejemplo: una Bomba Incendiaria mantiene **área pequeña, Daño 6, Pen 1**. El Armazón no aumenta Daño, Pen ni área.

Si la carga ya define resistencia, ataque, colocación u otra resolución, se utiliza esa regla. No se añade una segunda prueba defensiva genérica sólo porque esté dentro de una trampa.

La dosis/carga se consume normalmente al activarse.

##### Caída o entorno

Una trampa puede retirar soporte, abrir un hueco, soltar un contrapeso o exponer a un peligro que ya existe físicamente.

- una caída utiliza la **profundidad real** y las reglas de Caídas;
- una criatura totalmente sorprendida por la pérdida de apoyo puede no cumplir las condiciones para Caída controlada;
- una criatura que ya detectó el peligro puede evitar el espacio o resolver la maniobra apropiada si todavía existe incertidumbre;
- agua, fuego, presión, derrumbe u otro entorno utiliza sus reglas reales o un perfil previamente definido.

CRAFT-06 no inventa una tabla genérica de «daño de roca», «daño de tronco» o «daño ambiental» para superar los límites existentes.

##### Dispositivo o efecto externo

Una trampa puede accionar un dispositivo existente **sólo si ese dispositivo admite físicamente activación externa o el diseño correspondiente la añade mediante su propio subsistema**.

CRAFT-06 no concede Energía, Caudal, Maná, hechizos, sensores mágicos ni activación remota sobrenatural.

#### Un disparador, una liberación principal

Por defecto, un Armazón tiene **un disparador funcional y una liberación principal**.

No se pueden conectar diez armas al mismo cable y resolver diez ataques independientes mediante un Armazón Estándar.

Un sistema enlazado puede ser Complejo o superior, pero:

- varios elementos idénticos liberados por el mismo evento contra el mismo objetivo se resuelven como **un solo efecto** salvo perfil expreso;
- un arreglo puede cubrir zonas distintas cuando la geometría real lo justifique;
- **un mismo evento físico indivisible** —una misma pisada, apertura, retirada de peso o cruce puntual— no alimenta varias trampas ordinarias contra el mismo objetivo para multiplicar resoluciones;
- múltiples trampas físicamente independientes pueden encadenarse sólo si existen **disparadores distintos que se producen secuencialmente**; se resuelve cada activación y sus consecuencias antes de continuar el movimiento o evento siguiente;
- subdividir narrativamente un único mecanismo no crea múltiples ataques.

Un diseño que pretenda varios impactos separados sobre el mismo objetivo es un perfil específico y debe auditar su economía de acciones y daño.

#### Ocultación

**Ocultación** es independiente de Complejidad y de potencia.

| Grado de ocultación | DF Detección | Requisito | Trabajo adicional | Material adicional sobre VR del armazón |
|---|---:|---|---:|---:|
| **Visible** | — | ninguno | — | — |
| **Disimulada** | 10 | Latrocinio Aprendiz o método ambiental válido | +10 min | 0% |
| **Oculta** | 12 | Latrocinio Entrenado · Trampas y seguridad física | +25% tiempo | +10% |
| **Experta** | 14 | Latrocinio Experto · Trampas y seguridad física | +50% tiempo | +25% |
| **Maestra** | 16 | Latrocinio Maestro · Trampas y seguridad física | +100% tiempo | +50% |
| **Excepcional** | 18 | Latrocinio Gran Maestro · Trampas y seguridad física | +150% tiempo | +100% |

Los materiales adicionales se calculan sobre el VR del Armazón y forman parte del Proyecto; un entorno que proporcione físicamente esos materiales puede aportar VI compatible.

La Ocultación no modifica Precisión, DF de Mecanismo, Daño, Pen, área ni dificultad de escape.

Una trampa no puede ocultarse mejor de lo que permite el lugar. Un cable sobre suelo desnudo y bien iluminado puede ser imposible de volver Excepcional sin reconstruir el entorno.

#### Detectar una trampa

Encontrar una trampa oculta utiliza normalmente:

**PER + Investigación contra DF de Detección.**

Cuando el desafío sea reconocer un mecanismo ya parcialmente localizado, puede usarse **PER + Latrocinio** conforme a las reglas de la Habilidad.

No existe una prueba universal automática por entrar en cada espacio.

- si los personajes buscan sistemáticamente una zona donde puede haber trampas, una prueba puede cubrir esa **zona significativa**;
- repetir la misma búsqueda sin cambio de método, tiempo, herramientas o información no concede nuevas tiradas;
- señales evidentes pueden hacer innecesaria la prueba;
- una trampa Visible se percibe cuando la ficción permita verla.

Grados de resultado en una búsqueda:

- **Ajustado:** localiza la presencia y posición aproximada del peligro;
- **Claro:** además identifica el disparador o la ruta segura evidente;
- **Dominante:** además comprende información accesible sobre mecanismo/carga, pero no desactiva automáticamente la trampa.

Detectar no desactiva.

#### Trampa no percibida y Desprevenido

Si una trampa realiza un ataque contra una criatura que **no pudo percibir la amenaza antes de que se resolviera**, puede aplicarse **Desprevenido** conforme al capítulo de Combate.

Esto no significa que toda trampa oculta impacte automáticamente.

- Golpe mecánico sigue tirando contra Defensa;
- la criatura conserva AGI;
- pierde únicamente lo que Desprevenido ya establece;
- una carga de área o caída usa su propia resolución.

Después de activarse, una trampa normalmente deja de estar oculta para quienes puedan percibir razonablemente su mecanismo o consecuencia.

#### Desactivar

Una trampa localizada se desactiva normalmente con:

**AGI o INT + Latrocinio contra DF de Mecanismo.**

El Atributo depende del método: AGI para manipulación, INT para secuencia o diagnóstico cuando corresponda.

- Simple puede ser intentada sin Especialización si el método es inteligible.
- Estándar+ puede exigir **Trampas y seguridad física** cuando el procedimiento sea profesional.
- Ingeniería puede sustituir Latrocinio sólo cuando el desafío real sea técnico y no de seguridad/contramedida.
- cortar el suministro, retirar la carga o evitar físicamente el disparador puede resolver el problema sin tirada cuando sea seguro y evidente.

Un fallo **no activa automáticamente** la trampa. La activación accidental debe haber sido una consecuencia plausible declarada antes de tirar.

Una Pifia puede activar la trampa, bloquear el mecanismo, dañar una herramienta o empeorar el acceso cuando ese riesgo ya existía.

No se repite la misma desactivación hasta obtener éxito sin un cambio material de enfoque.

#### Bypass

Un Bypass es un procedimiento físico para cruzar, abrir o manipular la instalación sin activar la trampa.

Ejemplos:

- pisar una zona concreta;
- liberar primero una clavija;
- utilizar una llave mecánica;
- aplicar una secuencia de presión;
- desconectar un cable accesible.

Conocer un Bypass válido permite utilizarlo sin tirada cuando las condiciones son normales.

El Bypass:

- no es telepatía ni identificación de aliados;
- puede dejar de funcionar si la trampa fue dañada o alterada;
- debe registrarse cuando se construye;
- no concede al constructor conocimiento remoto del estado de la trampa.

Añadir un Bypass complejo puede aumentar la Complejidad si el diseño lo exige.

#### Rearme y consumo

Una trampa es **de un solo disparo por defecto**.

Después de activarse:

- la carga consumida se repone;
- munición o Fórmulas gastadas deben existir de nuevo;
- piezas dañadas deben repararse;
- el Armazón se rearma.

Si el Armazón quedó Operativo, rearmarlo requiere normalmente **25% del tiempo base del Armazón**, mínimo 10 minutos.

Una trampa mecánica no se rearma automáticamente durante combate.

El **rearme automático** no forma parte de CRAFT-06 ordinario. Requiere un dispositivo, infraestructura o perfil posterior que proporcione energía, almacenamiento, alimentación y control reales.

Esto impide que una trampa preparada sea una fuente infinita de ataques gratuitos.

#### Recuperación

Una trampa no activada puede desmontarse conforme a CRAFT-02.

- el Armazón se trata como objeto físico según su estado;
- una carga intacta y separable puede recuperarse como su propio objeto;
- una carga consumida no se recupera;
- partes del entorno usadas como camuflaje no se convierten automáticamente en VI portátil;
- componentes especiales siguen las reglas de CRAFT-05.

No se contabiliza dos veces el mismo componente dentro del valor del armazón y como objeto separado.

#### Construcciones de campaña

CRAFT-06 también cubre obras temporales o semipermanentes cuya utilidad proviene de la geometría y materiales reales, no de otorgar estadísticas abstractas.

No introduce Vida/HP universal para paredes, puertas, puentes o barricadas. Si una estructura es atacada, su material, grosor, herramientas del atacante y la ficción determinan si hace falta un Proyecto, una prueba o una regla específica.

##### Barricada de cobertura

Una barricada de aproximadamente **1 espacio de frente**:

- **Complejidad:** Simple;
- **Principal:** Artesanía Aprendiz o Supervivencia Aprendiz cuando se construya con material de campaña;
- **tiempo:** 2 h;
- **VR de materiales preparados:** 1 o; CM 5 p;
- recursos locales adecuados pueden aportar VI.

Si bloquea sólo parte de la silueta, concede la cobertura parcial normal: **+2 Defensa** contra ataques que la atraviesen.

Una barricada que bloquee realmente toda línea válida proporciona cobertura total conforme a la regla normal, pero requiere dimensiones, anclaje y posición que físicamente lo justifiquen. No se obtiene cobertura total simplemente pagando más.

##### Barrera sólida de campaña

Segmento de aproximadamente **1 espacio de frente**:

- **Complejidad:** Estándar;
- **Principal:** Artesanía Entrenada · especialización coherente;
- **Auxiliar:** Ingeniería Aprendiz cuando soporte/carga no sean obvios;
- **tiempo:** 1 Jornada;
- **VR:** 3 o; CM 1 o 5 p.

Puede cerrar un paso o crear cobertura total sólo cuando su altura, grosor y colocación eliminan realmente la línea. Puertas, troneras o aberturas cambian esa geometría.

##### Pasarela o puente corto

Para salvar un hueco pequeño y estable de hasta aproximadamente **2 espacios**:

- **Complejidad:** Estándar;
- **Principal:** Artesanía Entrenada · Carpintería o Forja y metal según material;
- **Auxiliar:** Ingeniería Aprendiz si el soporte no es trivial;
- **tiempo:** 4 h;
- **VR:** 2 o; CM 1 o.

Permite cruzar cuando está correctamente apoyado y la carga es razonable. No concede Movimiento adicional.

Aumentar luz, carga, altura, corriente, movimiento o ausencia de apoyos puede convertirlo en Proyecto Complejo+ y exigir Ingeniería.

##### Pozo de trampa

Excavar un pozo para una criatura de Escala ordinaria se trata principalmente como **trabajo físico de sitio**.

Referencia en suelo excavable con herramientas:

- área de aproximadamente 1 espacio;
- **2 espacios de profundidad:** 1 Jornada de trabajo;
- cada espacio adicional de profundidad: +1 Jornada;
- suelo duro, roca, agua, raíces o necesidad de entibado pueden multiplicar el tiempo o exigir Ingeniería/Artesanía.

El pozo abierto es un peligro Visible. **Ocultarlo como trampa de colapso exige al menos un Armazón Estándar**, además del tiempo de excavación, y un soporte que pueda sostener tránsito normal hasta activarse. La DF, tiempo y materiales adicionales de Ocultación se calculan sobre ese Armazón.

Al caer se usa la profundidad real y las reglas de Caída. CRAFT-06 no añade daño por «ser una trampa».

##### Alarma de perímetro

Una línea de aviso Simple que cubra una entrada o tramo razonable:

- Armazón Simple;
- puede usar Latrocinio Aprendiz o Supervivencia Aprendiz;
- carga de Alarma;
- tiempo 30 min antes de Ocultación;
- se detecta y desactiva conforme a sus grados.

Extenderla a un perímetro grande aumenta materiales y tiempo proporcionalmente; una única receta no cubre kilómetros de terreno.

##### Lazo de captura

- Armazón Estándar;
- carga Maniobra mecánica: Agarrar;
- Precisión +4 contra Defensa de Maniobra;
- escape contra DF 12;
- no causa daño por sí mismo;
- puede incorporar Ocultación.

Un lazo que eleve, arrastre o suspenda a una criatura necesita un sistema de fuerza compatible y un perfil específico; no se infiere de esta receta.

##### Cable de derribo

- Armazón Estándar;
- carga Maniobra mecánica: Derribar;
- Precisión +4 contra Defensa de Maniobra;
- no causa daño;
- puede ser Disimulado/Oculto si el terreno lo permite.

##### Golpe oculto Estándar

- Armazón Estándar;
- carga física con Daño impreso máximo 5, Pen máximo 1;
- ataque +4 contra Defensa;
- la carga debe existir;
- un objetivo que no percibió la amenaza puede estar Desprevenido.

##### Golpe oculto Complejo

- Armazón Complejo;
- carga física con Daño impreso máximo 8, Pen máximo 2;
- ataque +6 contra Defensa;
- exige sus Auxiliares y puede integrar armas mecánicamente más exigentes.

##### Trampa con Bomba Incendiaria

- Armazón mínimo Complejo cuando la activación segura exija integración profesional;
- carga: una Bomba Incendiaria físicamente preparada;
- al dispararse: área pequeña, Daño 6, Pen 1;
- la Bomba se consume;
- el Armazón no amplía área, Daño o Pen.

CRAFT-11 fija la Bomba Incendiaria en **3 o** por unidad, con CM **1 o 5 p** y 1 Jornada de preparación estable.

#### Construcciones mayores

Puentes largos, edificios, torres, fortificaciones, túneles, presas, vías, talleres permanentes y obras equivalentes usan CRAFT-01 como **Proyectos por etapas**.

CRAFT-06 no intenta reducir arquitectura e ingeniería civil a una única tabla de coste por espacio.

Una obra mayor debe definir:

- diseño;
- terreno;
- materiales;
- cargas y función;
- etapas;
- dotación de trabajadores;
- Ingeniería y Artesanía necesarias;
- tiempo;
- acceso/logística;
- resultado físico.

La existencia de una construcción grande no concede automáticamente bonificadores tácticos distintos de lo que su geometría y reglas específicas produzcan.

#### Interacción con Calidad y Materiales

Un Armazón portátil o reutilizable puede tener Calidad y Material Especial cuando sea físicamente apropiado.

Sin embargo:

- Calidad no aumenta automáticamente Precisión o DF de Mecanismo;
- las Modificaciones de CRAFT-04 sólo aplican si son compatibles con el objeto real;
- un material especial no aumenta daño de la carga salvo que su perfil lo indique;
- Ocultación no consume CapM;
- una trampa instalada en el terreno no gana valor de Calidad por usar tierra, ramas o piedras locales.

Un perfil futuro puede definir una modificación específica de trampa; no se extrapolan las de armas/herramientas sin compatibilidad.

#### Salvaguardas de CRAFT-06

- detección, desactivación y potencia son valores separados;
- una trampa oculta no impacta automáticamente;
- el constructor no añade sus Atributos al daño;
- un Armazón no aumenta el efecto de una carga alquímica;
- una carga se paga y existe físicamente;
- un disparador automático no crea munición ni rearme;
- un evento no se divide en diez ataques mediante un único mecanismo;
- Desprevenido utiliza exactamente sus reglas existentes;
- una trampa no reconoce identidades sin sensor real;
- detectar no desactiva;
- fallar al desactivar no activa automáticamente salvo riesgo declarado;
- un pozo usa daño real de caída;
- las trampas no crean nuevas excepciones a 0 Vida, Trauma o Heridas Graves;
- no existe HP universal de estructuras;
- construir cobertura sólo concede la cobertura que la geometría real justifique.

#### Límites de CRAFT-06

CRAFT-06 no define todavía:

- runas, Piedras de Impronta y engarces (definidos en CRAFT-07);
- encantamientos persistentes (definidos posteriormente en CRAFT-08);
- sensores o disparadores mágicos (limitados posteriormente por CRAFT-08/09);
- torretas automáticas, alimentación mecánica continua o dispositivos avanzados (requieren Perfil específico conforme a CRAFT-09/10);
- precios alquímicos (ratificados posteriormente en CRAFT-11);
- ingeniería civil completa con HP estructural universal;
- investigación de nuevos mecanismos fuera del catálogo (definida posteriormente en CRAFT-10).

CRAFT-07 se desarrolla a continuación.

### CRAFT-07 — Runas, piedras y engarces

> **VIGENTE · CERRADO.** CRAFT-07 define Capacidad Rúnica, matrices, inscripciones permanentes, Piedras de Impronta intercambiables, activación mediante Maná personal, costes, compatibilidades, extracción, sustitución y un catálogo inicial de Improntas. No define todavía encantamientos autónomos, sintonización mayor ni objetos mágicos completos: esos elementos pertenecen a CRAFT-08.

#### Principio: Impronta, no dos sistemas de poder

Una **Impronta** es un patrón mágico estable con un efecto definido.

Puede estar implementada de dos formas:

1. **Runa inscrita:** el patrón queda integrado de manera estable en el objeto.
2. **Piedra de Impronta:** el patrón queda fijado en una piedra artificial intercambiable que funciona sólo al estar colocada en un Engarce compatible.

Runa y Piedra **no son fuentes acumulativas distintas**. Si contienen la misma Impronta, producen el mismo efecto, usan las mismas reglas de activación y pertenecen al mismo grupo de apilamiento.

La diferencia es logística:

- la Runa es más barata, más difícil de perder y no puede cambiarse rápidamente;
- la Piedra cuesta más, puede extraerse y trasladarse entre objetos compatibles.

#### Capacidad Rúnica

La **Capacidad Rúnica (CRu)** es la cantidad estructural de Impronta que un objeto puede sostener.

| Calidad | CRu máxima |
|---|---:|
| Defectuosa | 0 |
| Común | 0 |
| Superior | 1 |
| Excepcional | 2 |

CRu es independiente de la **CapM** de CRAFT-04.

- CRu no consume CapM.
- CapM no aumenta CRu.
- dinero adicional no permite superar la CRu máxima;
- un material especial no concede CRu salvo regla expresa;
- una runa o piedra no concede una nueva ranura por existir.

CRAFT-07 aplica a equipo persistente con una función real: armas, armaduras, escudos, herramientas, Kits, instrumental y otros objetos con receta equivalente.

No se autoriza utilizar anillos, cuentas, dijes, botones, piedras sueltas u otros objetos triviales como «granjas de ranuras». Los accesorios mágicos dedicados se diseñan como objetos mágicos en CRAFT-08.

#### Preparar una Matriz Rúnica

La CRu máxima no aparece automáticamente por alcanzar Calidad Superior o Excepcional. Cada punto debe prepararse físicamente como una **Matriz Rúnica**.

Cada punto de CRu preparado requiere:

- materiales equivalentes al **20% del VR Común**, mínimo **5 p**;
- **25% del tiempo base de fabricación**, mínimo **2 h**;
- cristal arcano refinado, conductor o componentes equivalentes incluidos dentro de ese coste;
- un Plano estable de matriz compatible.

El valor añadido al objeto por la preparación es el doble del coste material real de esa matriz.

Requisitos mínimos:

| CRu total preparada | Complejidad mínima | Principal físico | Auxiliar arcano | Instalación |
|---|---|---|---|---|
| **1** | Complejo | Artesanía Experta · especialización coherente | Arcana Entrenada · Artefactos mágicos | Profesional |
| **2** | Magistral | Artesanía Maestra · especialización coherente | Arcana Experta · Artefactos mágicos | Especializada |

Si Calidad, Material Especial o receta base exigen requisitos superiores, se usa el requisito superior.

La preparación puede integrarse durante la fabricación inicial o añadirse después mediante Proyecto. No exige tirada si el Plano, competencias, componentes, herramientas, instalación y tiempo son adecuados.

Cada punto preparado debe configurarse como:

- **Canal de Inscripción**, destinado a una Runa; o
- **Engarce**, destinado a una Piedra de Impronta.

Un objeto Excepcional con CRu 2 puede tener:

- dos Canales;
- dos Engarces;
- un Canal y un Engarce;
- o una configuración doble destinada a una Impronta de Grado II.

Reconfigurar un punto ya preparado entre Canal y Engarce cuesta:

- **10% del VR Común**, mínimo 5 p;
- 25% del tiempo base, mínimo 2 h;
- los mismos requisitos profesionales de la CRu total del objeto.

No recupera materiales de la configuración anterior.

#### Grados de Impronta

CRAFT-07 usa sólo dos grados:

| Grado | CRu ocupada | Función |
|---|---:|---|
| **I** | 1 | efecto menor, especializado o de activación limitada |
| **II** | 2 | efecto más potente o combinación controlada de funciones |

Estos grados **no son Grados de hechizo**. Una Impronta II no es automáticamente un hechizo Básico, Avanzado o Maestro y no utiliza sus costes de PD.

Un objeto Superior sólo puede alojar Improntas I.

Un objeto Excepcional puede alojar:

- dos Improntas I; o
- una Impronta II.

No puede albergar una Impronta II y otra I simultáneamente mediante CRAFT-07.

#### Patrón Rúnico estable

Toda Impronta necesita un **Patrón Rúnico estable**.

Un Patrón funciona como Plano:

- permite reproducir una Impronta conocida;
- no concede competencia;
- no crea componentes;
- no proporciona Maná;
- no vuelve común una pieza Rara;
- no revela automáticamente cómo diseñar una Impronta nueva.

Los Patrones de Grado I son normalmente **Profesionales o Restringidos** según la jurisdicción y el efecto.

Los Patrones de Grado II son normalmente **Raros**.

Una Impronta desconocida, una variación nueva o una propiedad fuera del catálogo entra en CRAFT-10.

#### Inscribir una Runa

Una Runa utiliza un Canal de Inscripción preparado.

##### Impronta I inscrita

- **Complejidad:** Complejo.
- **Principal:** Ritualismo Experto.
- **Auxiliares:** Arcana Entrenada · Artefactos mágicos y Artesanía Entrenada con especialización coherente.
- **Instalación:** Profesional.
- **Materiales rúnicos:** **20% del VR Común**, mínimo **1 o**.
- **Tiempo:** 25% del tiempo base del objeto, mínimo 4 h.
- **CRu:** 1.

##### Impronta II inscrita

- **Complejidad:** Magistral.
- **Principal:** Ritualismo Maestro.
- **Auxiliares:** Arcana Experta · Artefactos mágicos y Artesanía Experta con especialización coherente.
- **Instalación:** Especializada.
- **Materiales rúnicos:** **40% del VR Común**, mínimo **2 o**.
- **Tiempo:** 50% del tiempo base del objeto, mínimo 1 Jornada.
- **CRu:** 2.

Si el objeto exige rangos o instalación superiores por Calidad/Material, se mantienen los superiores.

El valor añadido al objeto por una Runa inscrita es **2 × su coste material rúnico**.

La inscripción conocida y estable es rutinaria si se cumplen todos los requisitos.

Una Runa queda vinculada físicamente a ese objeto. No puede retirarse como un componente intacto.

#### Borrar o sustituir una Runa

Borrar una Runa conocida y accesible es un Proyecto rutinario:

- requiere 25% del tiempo de inscripción correspondiente, mínimo 1 h;
- no devuelve VI;
- libera la CRu;
- no convierte la Runa en una Piedra.

Inscribir después otra Impronta paga su coste completo.

Una consecuencia que destruya específicamente la matriz rúnica elimina la Impronta aunque el objeto pueda seguir siendo físicamente utilizable. Restaurarla requiere reparar primero la Matriz y luego reinscribir el patrón perdido cuando corresponda.

#### Piedras de Impronta

Las **Piedras de Impronta** son componentes fabricados a partir de cristal arcano refinado, matriz mineral o vítrea estable y un Patrón Rúnico.

No son formaciones naturales equivalentes a los Cristales de Resonancia.

Una Piedra sólo produce su efecto cuando:

- está Operativa;
- está instalada en un Engarce compatible;
- el objeto posee CRu libre suficiente;
- el usuario realiza una activación válida.

Portarla en un bolsillo no concede el efecto.

##### Piedra de Impronta I

- **VR:** 4 o.
- **CM:** 2 o.
- **Complejidad:** Complejo.
- **Principal:** Ritualismo Experto.
- **Auxiliares:** Artesanía Experta · Vidrio y cristal y Arcana Entrenada · Artefactos mágicos.
- **Instalación:** Profesional.
- **Tiempo:** 1 Jornada.
- **CRu ocupada:** 1.
- **Disponibilidad habitual:** Profesional o Restringida.

##### Piedra de Impronta II

- **VR:** 10 o.
- **CM:** 5 o.
- **Complejidad:** Magistral.
- **Principal:** Ritualismo Maestro.
- **Auxiliares:** Artesanía Maestra · Vidrio y cristal y Arcana Experta · Artefactos mágicos.
- **Instalación:** Especializada.
- **Tiempo:** 3 Jornadas.
- **CRu ocupada:** 2.
- **Disponibilidad habitual:** Rara.

El CM ya incluye la cantidad ordinaria necesaria de cristal arcano refinado. Un Lote compatible puede reducir ese CM mediante VI; no se cobra además un SM por el mismo cristal ya contabilizado.

Una Piedra no utiliza la escala Defectuosa/Común/Superior/Excepcional de CRAFT-04. Su Grado de Impronta define su estructura.

#### Insertar y extraer una Piedra

Con herramientas apropiadas y sin presión:

- insertar una Piedra compatible: **10 min**;
- extraerla intacta: **10 min**;
- no requiere tirada.

No es una Acción de combate.

Forzar la extracción bajo peligro, con Engarce deformado o sin herramientas apropiadas puede requerir CRAFT-01 y poner la Piedra en riesgo.

Retirar una Piedra termina inmediatamente cualquier efecto suyo que dependa de permanecer instalada.

El Engarce queda en el objeto y puede recibir otra Piedra compatible.

#### Activación rúnica

Las Improntas de CRAFT-07 utilizan **Maná personal del usuario**.

La Matriz proporciona la forma mágica estable; el personaje aporta la energía.

Por ello una activación rúnica:

- no exige Canalización;
- no exige conocer una Disciplina;
- no es un hechizo;
- no utiliza el coste de PD de un hechizo;
- no puede usar Sobrecarga;
- no recibe reducciones de coste destinadas a hechizos;
- no puede pagar Maná con Energía de un acumulador;
- no permite que Energía y Maná se sustituyan entre sí.

Si el usuario no dispone del Maná completo, la activación no ocurre y no existe pago parcial.

Una Impronta puede tener uno de estos tiempos:

- **Acción:** consume la Acción.
- **Reacción:** consume la Reacción y necesita un disparador válido.
- **Vinculada:** se declara como parte de una Acción/prueba compatible que ya se estaba realizando con el objeto. No consume una segunda Acción, pero **no crea esa Acción**.

Sólo puede activarse **una Impronta Vinculada por resolución**.

Por ejemplo, un ataque no puede activar simultáneamente Filo Arcano I y Aguja Rúnica I aunque un objeto Excepcional contenga ambas.

Una activación rúnica nunca crea ataques, Acciones o Reacciones adicionales.

#### Control del objeto

Para activar una Impronta el usuario debe estar utilizando realmente su soporte:

- arma: empuñada y empleada en la acción correspondiente;
- armadura: vestida;
- escudo: disponible y controlado;
- herramienta/Kit: utilizado en la operación;
- instrumental: conectado o manipulado conforme a su función.

A efectos de Improntas **Vinculadas a un ataque con arma**, «ataque realizado con el arma» significa una resolución que utiliza el **perfil de ataque del arma anfitriona**. Un Hechizo Vinculado, descarga de dispositivo u otro ataque emitido desde el mismo objeto no cuenta automáticamente como ataque con esa arma. Integrarlos en una única resolución requiere un Perfil híbrido expreso.

Una Impronta no concede beneficios desde una mochila, almacén o colección de objetos no utilizados.

CRAFT-07 no incorpora activación automática, reconocimiento de aliados, sensores mágicos ni disparadores remotos.

Una trampa no puede gastar Maná del constructor a distancia para activar una Runa. Eso requiere un subsistema posterior de dispositivo/encantamiento.

#### Apilamiento rúnico

Reglas universales:

- la misma Impronta no se acumula consigo misma;
- dos Improntas que modifican la misma magnitud usan el mejor efecto salvo regla expresa;
- una propiedad rúnica equivalente a Calidad, Material, dispositivo o hechizo no se acumula por proceder de una fuente distinta;
- varias Ventajas no se acumulan;
- una Reacción sólo permite una respuesta que consuma esa Reacción;
- sólo una Impronta Vinculada puede aplicarse a la misma resolución;
- CRAFT-07 no aumenta Pen por encima de **3**;
- CRAFT-07 no concede por sí solo Protección permanente;
- CRAFT-07 no reduce Recarga;
- CRAFT-07 no aumenta CapM, CRu, Energía, Caudal ni Maná máximo.

#### Catálogo de Improntas — Grado I

##### Lumen I

- **Compatibilidad:** equipo persistente.
- **Activación:** Acción.
- **Coste:** 1 Maná.
- **Duración:** Escena.
- **Efecto:** el objeto emite una iluminación estable comparable a una fuente personal ordinaria de luz.
- **Límites:** no ciega, no causa daño, no revela invisibilidad, no atraviesa oscuridad sobrenatural por inferencia.

##### Brasa I

- **Compatibilidad:** arma, herramienta o instrumental resistente al calor ordinario.
- **Activación:** Acción.
- **Coste:** 1 Maná.
- **Efecto:** calienta un pequeño objeto inerte en contacto o enciende material combustible ordinario preparado.
- **Límites:** no causa daño de combate, no funde metal instantáneamente y no incendia automáticamente equipo portado por otra criatura.

##### Filo Arcano I

- **Compatibilidad:** arma con perfil de daño.
- **Activación:** Vinculada a un ataque realizado con el arma.
- **Coste:** 2 Maná.
- **Efecto:** **+1 Daño** en esa resolución. El impacto cuenta además como mágicamente potenciado cuando una regla concreta distinga entre ataque mundano y mágico.
- **Apilamiento:** no se acumula con Golpe optimizado ni con otra mejora del objeto que aporte el mismo +1 Daño; se usa el mejor beneficio compatible.

##### Aguja Rúnica I

- **Compatibilidad:** arma con Penetración.
- **Activación:** Vinculada a un ataque realizado con el arma.
- **Coste:** 2 Maná.
- **Efecto:** **Pen +1** para esa resolución, máximo Pen 3 por CRAFT-07.
- **Apilamiento:** no se acumula con Perfil penetrante, Cámara de penetración u otro aumento equivalente; se usa el mejor.

##### Guardia Rúnica I

- **Compatibilidad:** armadura, escudo o arma controlada.
- **Activación:** Reacción cuando el usuario es objetivo de un ataque perceptible.
- **Coste:** 2 Maná.
- **Efecto:** **+1 Defensa** contra ese ataque.
- **Límites:** utiliza la Reacción normal. No se acumula con Barrera Cinética, Escudo de campo u otra defensa mágica equivalente.

##### Ancla Rúnica I

- **Compatibilidad:** armadura o escudo.
- **Activación:** Reacción al ser objetivo de Derribar, Empujar o Agarrar.
- **Coste:** 1 Maná.
- **Efecto:** **+2 Defensa de Maniobra** contra esa maniobra.
- **Límites:** no cambia Escala, FUE, masa ni vuelve posible resistir algo físicamente imposible.

##### Resguardo Térmico I

- **Compatibilidad:** armadura, escudo o equipo corporal preparado.
- **Activación:** Reacción cuando el usuario va a recibir daño Térmico.
- **Coste:** 2 Maná.
- **Efecto:** después de la mitigación ordinaria, reduce el daño final en **2**, mínimo 0.
- **Apilamiento:** no se acumula con otra reducción rúnica/mágica equivalente; se aplica la mejor.

##### Silencio de Materia I

- **Compatibilidad:** arma, armadura, herramienta o Kit.
- **Activación:** Acción.
- **Coste:** 1 Maná.
- **Duración:** Escena.
- **Efecto:** el objeto no produce por sí mismo ruido incidental ordinario por roce, crujido o vibración.
- **Apilamiento:** es equivalente a Silenciosa de CRAFT-04 y a la Amortiguación acústica material cuando se aplican a la misma fuente.
- **Límites:** no silencia pasos, voz, disparos, impactos, explosiones ni otras fuentes externas.

##### Claridad de Oficio I

- **Compatibilidad:** herramienta, Kit o instrumental profesional.
- **Activación:** Vinculada a una prueba no ofensiva en la que ese objeto sea realmente pertinente.
- **Coste:** 2 Maná.
- **Efecto:** concede **Ventaja** a esa prueba.
- **Límites:** no sustituye Habilidad, Especialización, materiales, instalación, información ni acceso; no puede aplicarse a tiradas de ataque, Canalización o Ritualismo.

#### Catálogo de Improntas — Grado II

##### Barrera Rúnica II

- **Compatibilidad:** armadura o escudo.
- **Activación:** Reacción contra un ataque perceptible.
- **Coste:** 3 Maná.
- **Efecto:** **+2 Defensa** contra ese ataque.
- **Apilamiento:** pertenece al mismo grupo funcional que Barrera Cinética y Escudo de campo; se usa el mejor, no la suma.
- **Límites:** no modifica Defensa Mental, Corporal o de Maniobra salvo regla expresa.

##### Filo Penetrante II

- **Compatibilidad:** arma con perfil de daño y Penetración.
- **Activación:** Vinculada a un ataque realizado con el arma.
- **Coste:** 3 Maná.
- **Efecto:** **+1 Daño y Pen +1**, con Pen máximo 3 por CRAFT-07. El impacto cuenta como mágicamente potenciado cuando corresponda.
- **Apilamiento:** cada parte del beneficio usa el mejor efecto disponible y no se suma con Golpe optimizado, Perfil penetrante, Cámara de penetración u otros equivalentes.

##### Resguardo Térmico II

- **Compatibilidad:** armadura, escudo o equipo corporal preparado.
- **Activación:** Reacción cuando el usuario va a recibir daño Térmico.
- **Coste:** 3 Maná.
- **Efecto:** después de la mitigación ordinaria, reduce el daño final en **4**, mínimo 0.
- **Apilamiento:** reemplaza, no suma, Resguardo Térmico I u otra reducción equivalente.

##### Estabilidad Rúnica II

- **Compatibilidad:** equipo persistente reparable.
- **Activación:** Reacción cuando una consecuencia va a empeorar el estado físico del propio objeto.
- **Coste:** 2 Maná.
- **Efecto:** reduce en **un paso** ese empeoramiento, si la naturaleza de la consecuencia permite una estabilización mágica del soporte.
- **Límites:** no evita pérdida, desintegración, destrucción causalmente absoluta ni daño al usuario. **Tampoco reduce un empeoramiento de estado que sea el coste explícito de una Sobrecarga Controlada, Carga forzada u otra activación voluntaria que lo declare como precio.**
- **Apilamiento:** no se acumula con Tenacidad de Kharum u otra reducción equivalente; se usa el mejor efecto.

##### Impulso Cinético II

- **Compatibilidad:** arma cuerpo a cuerpo.
- **Activación:** Vinculada a un ataque realizado con el arma.
- **Coste:** 3 Maná.
- **Efecto:** si el ataque impacta, puede desplazar al objetivo **1 espacio** cuando sea de Escala igual o menor y exista trayectoria válida.
- **Límites:** no añade daño; no desplaza una criatura una categoría mayor o más; no mueve objetivos anclados; no se acumula con un Propulsor de impacto o efecto equivalente en la misma resolución.

#### Identificación de Runas y Piedras

Una Impronta conocida puede identificarse sin tirada por un personaje con Arcana apropiada, tiempo y acceso físico suficientes.

Cuando exista incertidumbre real:

- **PER + Arcana** puede examinar signos visibles o flujo;
- **INT + Arcana** puede interpretar función y patrón;
- Artefactos mágicos puede ser requisito para Improntas complejas.

Identificar una Piedra no concede su Patrón Rúnico estable ni permite reproducirla automáticamente. Copiar o reconstruir un patrón desconocido pertenece a CRAFT-10.

#### Runas y lanzamiento de hechizos

Una Impronta activada:

- cuenta como efecto mágico para interacciones que distingan magia de fenómenos mundanos;
- no cuenta como un hechizo conocido;
- no satisface requisitos de Disciplina;
- no puede utilizar Técnicas o reglas que modifiquen un lanzamiento salvo autorización expresa;
- no aumenta la DF, potencia o coste de los hechizos del usuario;
- no ocupa por sí sola un espacio universal de Sostenimiento de hechizos.

Una Impronta no puede almacenar o lanzar un hechizo del catálogo sólo porque su nombre o estética se parezcan a ese hechizo.

Reproducir de forma autónoma un hechizo, mantenerlo sin Maná personal o dotar al objeto de una reserva propia pertenece a CRAFT-08/09.

#### Interacción con trampas

CRAFT-07 no crea trampas rúnicas automáticas.

Una trampa de CRAFT-06 puede contener un objeto rúnico como componente físico, pero:

- el Armazón no puede gastar Maná remoto del constructor;
- no obtiene reconocimiento de objetivos;
- no activa una Impronta Vinculada sin una Acción/prueba compatible;
- no convierte una Runa en sensor.

Un sello mágico automático, mina rúnica, alarma arcana o trampa que se active sola requiere una regla posterior de encantamiento/dispositivo.

#### Valor, venta y reparación

Para una Runa integrada, se calcula:

**Valor rúnico añadido = 2 × coste material real de Matriz + 2 × coste material real de Inscripción.**

Ese valor se suma al valor vigente del objeto después de Calidad y Material Especial.

El resultado puede registrarse como **Valor de Referencia Final (VRF)**.

Una Piedra es un objeto separado con su propio VR y estado. Si se vende instalada junto con el soporte, se suman los valores; no se cuenta dos veces.

Las reparaciones del soporte pueden utilizar VRF cuando la matriz esté integrada en la parte dañada. Si el daño no afecta físicamente el Engarce/Piedra separable, la Piedra continúa siendo un objeto independiente.

Una Piedra Dañada/Deshabilitada usa las reglas de estado de CRAFT-02 sobre su propio VR.

#### Recuperación y desmantelamiento

La precisión ritual de una Runa no se convierte íntegramente en materia recuperable.

Además de las recuperaciones ya permitidas por CRAFT-02/05, los componentes rúnicos integrados pueden aportar como máximo:

| Estado del soporte | VI rúnico recuperable respecto del coste material integrado de Matriz + Inscripción |
|---|---:|
| Operativo | 25% |
| Dañado | 15% |
| Deshabilitado | 10% |
| Arruinado | 5% |
| Destruido | 0% salvo componente superviviente explícito |

Una Piedra intacta debe extraerse y tratarse como Piedra, no como VI rúnico genérico.

Borrar una Runa deliberadamente no produce VI.

#### Ejemplos

**Espada larga Superior con Filo Arcano I inscrito.**

- VR Común: 2 o.
- Calidad Superior: VRQ 3 o.
- CRu máxima: 1.
- Preparar 1 CRu: 5 p de materiales por mínimo; valor añadido 1 o.
- Inscribir Filo Arcano I: 1 o por mínimo; valor añadido 2 o.
- VRF sin Material Especial: **6 o**.
- Al atacar puede pagar 2 Maná como activación Vinculada para +1 Daño en esa resolución.
- Si además posee Golpe optimizado por otra fuente, no obtiene +2: usa el mejor beneficio equivalente.

**Placas Excepcionales con dos Engarces I.**

- CRu máxima: 2.
- pueden alojar dos Piedras I;
- sólo una activación Vinculada puede afectar una misma resolución;
- si ambas Piedras concedieran defensas de Reacción, el usuario sigue teniendo sólo una Reacción;
- retirar una Piedra requiere 10 minutos.

**Escudo Excepcional con Barrera Rúnica II.**

- ocupa CRu 2 completa;
- Reacción, 3 Maná;
- +2 Defensa contra un ataque;
- no se acumula con Barrera Cinética ni Escudo de campo;
- no concede una segunda Reacción.

**Piedra de Lumen I.**

- Piedra I: VR 4 o, CM 2 o;
- necesita un Engarce I;
- en un bolsillo no hace nada;
- instalada puede gastar 1 Maná y una Acción para emitir luz durante una Escena;
- puede trasladarse a otro soporte compatible con 10 minutos de extracción y 10 de inserción.

#### Salvaguardas de CRAFT-07

- Runa y Piedra son dos soportes de Impronta, no dos capas acumulables.
- Calidad limita CRu máxima.
- CRu debe prepararse; no aparece gratis.
- CapM y CRu son independientes.
- accesorios triviales no crean ranuras.
- toda Impronta de CRAFT-07 usa Maná personal.
- Energía no sustituye Maná.
- no existe Sobrecarga rúnica.
- una activación Vinculada no crea una Acción.
- sólo una Impronta Vinculada puede afectar una resolución.
- el mismo beneficio no se acumula por provenir de Runa, Piedra, Calidad, Material, hechizo o dispositivo.
- Pen no supera 3 por CRAFT-07.
- CRAFT-07 no concede Protección permanente.
- no hay reducción de Recarga.
- no hay ataques automáticos ni sensores mágicos.
- una Piedra fuera de un Engarce es inerte.
- intercambiar Piedras no es una Acción de combate.
- Cristales de Resonancia permanecen fuera del sistema.
- identificar una Impronta no concede su Patrón.
- borrar una Runa no recupera valor.
- ninguna Impronta almacena hechizos ni Maná por defecto.

#### Cristales de Resonancia: separación definitiva

Las Piedras de Impronta se fabrican deliberadamente a partir de matrices arcanas procesadas y **no son Cristales de Resonancia**.

Los Cristales de Resonancia conservan exclusivamente su función canónica vinculada a Familiares y resonancia individual.

No existe conversión automática entre ambos sistemas.

#### Límites de CRAFT-07

CRAFT-07 no define todavía:

- encantamientos autónomos;
- objetos que mantengan efectos sin pagar Maná personal (definidos en CRAFT-08);
- objetos con Reserva Encantada propia (definidos en CRAFT-08);
- Sintonización de objetos mágicos mayores (definida en CRAFT-08);
- accesorios mágicos dedicados como anillos, amuletos o capas (definidos en CRAFT-08);
- Hechizos Vinculados desde objetos (definidos en CRAFT-08);
- sensores mágicos automáticos limitados mediante Sellos de Custodia (definidos en CRAFT-08);
- trampas mágicas autónomas limitadas mediante Sellos de Custodia (definidas en CRAFT-08);
- combinación de runas con Energía/Caudal de dispositivos;
- artefactos únicos.

CRAFT-08 se desarrolla a continuación.

### CRAFT-08 — Objetos mágicos, encantamientos y sintonización

> **VIGENTE · CERRADO.** CRAFT-08 define objetos mágicos autónomos, Encantamientos, accesorios mágicos dedicados, Reserva Encantada, vinculación de hechizos, Sintonización y sellos autónomos de custodia. Mantiene separados Maná personal, Energía/Caudal de dispositivos y magia almacenada en un objeto. Los artefactos únicos, maldiciones complejas e investigación de efectos inéditos permanecen para CRAFT-10.

#### Runa frente a Encantamiento

CRAFT-07 y CRAFT-08 cumplen funciones diferentes.

**Impronta rúnica de CRAFT-07:**

- utiliza CRu;
- consume Maná personal al activarse;
- puede existir como Runa o Piedra de Impronta;
- no posee reserva autónoma.

**Encantamiento de CRAFT-08:**

- no consume CRu ni CapM;
- utiliza Sintonización cuando tiene potencia mecánica persistente o activa;
- puede poseer Reserva Encantada propia;
- puede mantener una propiedad pasiva catalogada;
- puede reproducir un hechizo canónico compatible mediante un Patrón estable.

Un objeto ordinario puede contener como máximo **un Encantamiento autónomo de CRAFT-08**, además de las Runas/Piedras que su CRu permita. Un artefacto con varios Encantamientos autónomos es un diseño especial y no se infiere de estas reglas.

#### Grados de Encantamiento

| Grado | Sintonización | Reserva Encantada | Potencia de Encantamiento | Disponibilidad habitual |
|---|---:|---:|---:|---|
| **I** | 1 | 6 | +4 | Restringida |
| **II** | 2 | 10 | +6 | Rara |
| **III** | 3 | 14 | +8 | Excepcional |

La **Reserva Encantada (RE)** es energía mágica estabilizada por el vínculo objeto-usuario.

No es:

- Maná personal;
- Energía de acumulador;
- Caudal;
- Cargas alquímicas;
- PD o PR.

La **Potencia de Encantamiento (PE)** sustituye la competencia de lanzamiento cuando un objeto reproduce un efecto que necesita una tirada.

Los Grados de Encantamiento no son Grados de hechizo. La correspondencia para Hechizos Vinculados se define más adelante.

#### Sintonización

Todo **personaje completo** posee una **Capacidad de Sintonización de 3**, independiente de VOL, nivel, Canalización, especie u origen.

Familiares, invocaciones, Autómatas auxiliares, monturas, vehículos y otras entidades dependientes **no reciben automáticamente otros 3 puntos de Sintonización**. Sólo pueden Sintonizar si su Perfil lo autoriza expresamente; en ese caso el objeto beneficia a esa entidad y no amplía la capacidad del personaje vinculado/controlador.

Sintonizar significa establecer un vínculo temporal y deliberado con un objeto mágico.

Reglas:

- Encantamiento I ocupa 1 punto.
- Encantamiento II ocupa 2 puntos.
- Encantamiento III ocupa 3 puntos.
- no puede superarse el total de 3;
- una criatura no puede mantener Sintonizados simultáneamente dos objetos con el **mismo Patrón de Encantamiento**, el mismo Hechizo Vinculado o perfiles funcionalmente equivalentes cuya única finalidad sea multiplicar la reserva del mismo efecto; cambiar nombre, estética o soporte no evita esta restricción;
- varios Encantamientos del mismo objeto no reducen su coste, aunque el núcleo ordinario sólo permite uno;
- la Sintonización no depende del tipo físico de objeto: espada, anillo, capa y amuleto consumen capacidad según su Encantamiento, no según una ranura anatómica.

**Establecer Sintonización** requiere:

- 1 hora de contacto y uso deliberado;
- que el objeto esté Operativo;
- que el personaje conozca al menos su función general;
- no requiere Canalización ni Ritualismo.

Puede realizarse durante un Descanso compatible.

Romper voluntariamente una Sintonización es inmediato. Volver a establecerla requiere nuevamente 1 hora.

Un objeto no puede estar Sintonizado con varias criaturas a la vez salvo regla expresa.

Mientras no está Sintonizado:

- sus Encantamientos que exijan Sintonización permanecen inactivos;
- no puede gastar RE;
- sus propiedades físicas normales siguen existiendo;
- Runas de CRAFT-07 siguen sus propias reglas y no dependen de Sintonización.

#### Reserva Encantada y recarga

Al completar una nueva Sintonización, la RE del objeto comienza en **0**.

Un **Descanso Completo efectivo** rellena toda la RE de un objeto si:

- el objeto **ya estaba Sintonizado con esa criatura cuando comenzó el Descanso Completo** y permanece así hasta terminarlo;
- el objeto permaneció Operativo;
- no existe una condición que bloquee su recarga.

Establecer una Sintonización durante el propio Descanso no carga RE en ese mismo Descanso; comienza en 0 y deberá mantenerse hasta un Descanso Completo posterior.

Desintonizar el objeto reduce su RE a **0**.

Por tanto no puede utilizarse una mochila llena de objetos cargados, cambiar Sintonización durante el día y obtener múltiples reservas completas.

La RE:

- no puede transferirse a Maná;
- no puede transferirse a otro objeto;
- no se restaura con Poción de Recuperación Arcana;
- no puede usar Sobrecarga;
- no se obtiene conectando un acumulador;
- no aumenta por VOL.

Una regla futura puede definir un método extraordinario de recarga, pero no se infiere.

#### Coste y requisitos del Encantamiento

El **Coste de Encantamiento (CE)** se calcula sobre el VR Común del soporte:

| Grado | CE |
|---|---:|
| **I** | máximo entre **5 o** y **25% del VR Común** |
| **II** | máximo entre **15 o** y **50% del VR Común** |
| **III** | máximo entre **40 o** y **100% del VR Común** |

CE es coste material, en componentes arcanos, catalizadores, estabilización y consumibles rituales.

Un Lote compatible puede reducir CE mediante VI. No se cuenta además como SM si el mismo componente ya está incluido en CE.

El Encantamiento añade al valor del objeto:

**Valor Encantado Añadido = 2 × CE.**

El valor final del objeto es:

**VRF = valor vigente del soporte + Valor Encantado Añadido.**

Si el soporte ya posee Calidad, Material Especial y/o Runa, su valor vigente se calcula primero por sus reglas correspondientes.

Requisitos:

| Grado | Complejidad | Principal | Auxiliares | Instalación | Tiempo |
|---|---|---|---|---|---:|
| **I** | Magistral | Ritualismo Maestro | Arcana Experta · Artefactos mágicos; Artesanía Experta coherente | Especializada | máx. 3 Jornadas o 50% del tiempo base |
| **II** | Extraordinario | Ritualismo Gran Maestro | Arcana Maestra · Artefactos mágicos; Artesanía Maestra coherente | Excepcional | máx. 8 Jornadas o 100% del tiempo base |
| **III** | Extraordinario | Ritualismo Gran Maestro | Arcana Maestra · Artefactos mágicos; Artesanía Maestra coherente | Excepcional | máx. 20 Jornadas o 200% del tiempo base |

En la columna Tiempo, **máx.** significa que se utiliza el mayor de los dos valores.

Un Encantamiento III exige además un Patrón estable específico y al menos un componente arcano **Raro o Excepcional** compatible incluido dentro del CE.

Una tirada alta no sustituye estos requisitos.

#### Soporte existente

Un equipo ordinario puede encantarse si cumple:

- **Encantamiento I:** Calidad Superior o Excepcional.
- **Encantamiento II:** Calidad Excepcional.
- **Encantamiento III:** Calidad Excepcional y soporte físicamente apropiado para el Patrón.

El Encantamiento no consume CapM ni CRu.

Si el soporte es Defectuoso o Común, primero debe mejorarse o utilizarse un Soporte Mágico Dedicado.

#### Soportes Mágicos Dedicados

Anillos, amuletos, capas, broches, brazales, coronas menores, talismanes y accesorios semejantes pueden construirse como **Soportes Mágicos Dedicados**.

No obtienen CapM ni CRu por su mera existencia.

| Soporte | Grado máximo | Comp. física | Principal | Instalación | VR base | CM base | Tiempo |
|---|---:|---|---|---|---:|---:|---:|
| **Dedicado I** | I | Complejo | Artesanía Experta coherente | Profesional | 2 o | 1 o | 1 Jornada |
| **Dedicado II** | II | Magistral | Artesanía Maestra coherente | Especializada | 5 o | 2 o 5 p | 3 Jornadas |
| **Dedicado III** | III | Extraordinario | Artesanía Gran Maestra coherente | Excepcional | 10 o | 5 o | 5 Jornadas |

El soporte no posee beneficio mecánico propio. El Encantamiento se fabrica después o como parte del mismo Proyecto y paga CE completo.

Cambiar la forma narrativa de un Soporte —anillo por medallón, broche por brazal— no modifica su capacidad.

#### Encantamientos utilitarios sin Sintonización

Un objeto puede poseer un **Encantamiento Utilitario** sin Sintonización sólo si el efecto:

- no modifica tiradas;
- no modifica Defensa, Protección, daño, Pen, Movimiento o economía de acciones;
- no recupera Vida, Maná, RE o Energía;
- no concede invisibilidad, vuelo, teletransporte, sensores sobrenaturales o resistencia de combate;
- no sustituye una herramienta profesional;
- no produce un recurso comercial consumible.

Un Encantamiento Utilitario:

- Complejidad Compleja;
- Ritualismo Experto;
- Arcana Entrenada · Artefactos mágicos;
- instalación Profesional;
- CE 1 o;
- tiempo 1 Jornada;
- valor añadido 2 o.

Ejemplos:

- **Seco:** el objeto repele lluvia ordinaria y humedad superficial.
- **Pulcro:** suciedad ordinaria no se adhiere de forma persistente.
- **Templado:** mantiene una temperatura de uso confortable en clima ordinario; no protege contra daño Térmico.
- **Luz de Cortesía:** emite o apaga una luz tenue utilitaria; no equivale a una fuente táctica intensa ni revela magia.
- **Croma:** cambia entre una paleta de colores o motivos predefinidos.

Un objeto sólo puede tener **un** Encantamiento Utilitario mediante esta regla. No ocupa el Encantamiento autónomo principal sólo cuando su efecto permanece estrictamente dentro de estos límites.

#### Encantamiento Pasivo Sintonizado

Un efecto pasivo con beneficio mecánico requiere Sintonización y un perfil catalogado.

No puede obtenerse simplemente declarando que un hechizo Sostenido es «permanente».

Catálogo inicial:

##### Amuleto de Firmeza — Grado I

- **Soporte:** equipo corporal o Soporte Dedicado I+.
- **Sintonización:** 1.
- **Efecto:** +2 Defensa Mental sólo contra miedo sobrenatural o Intimidación compatible.
- **Apilamiento:** mismo grupo que Valor Inspirado, Mente Anclada y protección equivalente; se usa el mejor.

##### Broche de Caída — Grado I

- **Soporte:** equipo corporal o Soporte Dedicado I+.
- **Sintonización:** 1.
- **Efecto:** reduce en 1 los espacios efectivos de una caída antes de calcular daño, mínimo 0.
- **Límite:** no concede vuelo, no evita caer y no se duplica llevando varios Broches.

##### Lentes de Revelación — Grado II

- **Soporte:** óptica o Soporte Dedicado II+.
- **Sintonización:** 2.
- **Efecto:** Ventaja al examinar ilusiones, ocultación mágica, invisibilidad y manipulación sensorial compatibles.
- **Apilamiento:** equivalente a Revelación Sensorial para esta finalidad; varias Ventajas no se acumulan.
- **Límites:** no concede omnisciencia ni visión a través de paredes.

##### Talismán de Estabilidad — Grado II

- **Soporte:** equipo corporal o Soporte Dedicado II+.
- **Sintonización:** 2.
- **Efecto:** una vez por Escena, cuando un efecto mágico intentaría desplazar al portador contra su voluntad, reduce ese desplazamiento en 1 espacio, mínimo 0.
- **Límites:** no cambia Escala, no afecta fuerza mundana y no vuelve posible resistir un efecto que explícitamente ignore estabilidad o anclaje.

No existen Encantamientos Pasivos III universales en CRAFT-08. Un beneficio pasivo de esa magnitud requiere un Perfil específico e Investigación.

#### Hechizo Vinculado

Un objeto puede reproducir **un solo hechizo canónico de Método Directo** mediante un Encantamiento.

Correspondencia:

| Encantamiento | Hechizo máximo |
|---|---|
| **I** | Menor o Básico |
| **II** | Avanzado |
| **III** | Maestro |

Los hechizos Legendarios no pueden vincularse mediante el procedimiento estándar.

Los hechizos de Método Ritual tampoco se comprimen en un objeto estándar de CRAFT-08. Crear un artefacto que ejecute un Ritual pertenece a Investigación y diseño específico.

El Proyecto necesita un **Patrón de Encantamiento estable** para ese hechizo.

El Patrón puede:

- adquirirse como conocimiento protegido;
- haberse desarrollado previamente por CRAFT-10;
- derivarse de una investigación en la que participe alguien que conozca y pueda operar el hechizo correspondiente.

Poseer el Patrón terminado no concede el hechizo al artesano.

#### Activar un Hechizo Vinculado

La activación utiliza:

- la misma Acción o Reacción que el hechizo;
- los mismos objetivos, alcance, área y restricciones;
- el mismo coste numérico indicado en Maná, pero pagado desde **RE**;
- la misma duración;
- las mismas reglas de Sostenimiento;
- los mismos límites de daño, curación, desplazamiento, invocación y apilamiento.

El usuario no paga Maná personal.

Si el hechizo exige una tirada que normalmente usaría Atributo + Canalización, Ritualismo o un Atributo del lanzador, el objeto realiza:

**2d10 + PE**

contra la misma Defensa o DF.

Si el hechizo define una DF derivada de la competencia del lanzador —por ejemplo una ilusión— se utiliza:

**DF de Encantamiento = 11 + PE.**

Una DF fija del hechizo permanece fija.

Si el hechizo no requiere tirada, el objeto tampoco inventa una.

La PE sustituye la competencia; **no se suma INT, PRE, PER, Canalización, Arcana ni otra Habilidad del usuario**.

#### Sostenimiento mediante objeto

Cuando un Hechizo Vinculado produce un efecto **Sostenido demandante**:

- ocupa el límite normal de Sostenimiento de la criatura que lo activó;
- Doble Sostenimiento puede ampliar ese límite exactamente como ya establece su regla general;
- Incapacitado o Inconsciente termina el efecto conforme al sistema;
- el objeto debe continuar Sintonizado y controlado/portado cuando su naturaleza lo requiera.

El objeto paga RE sólo al activar el hechizo salvo que el propio hechizo indique otro coste.

CRAFT-08 no convierte un hechizo Sostenido en permanente.

#### Contramagia

Una activación de Hechizo Vinculado es un fenómeno mágico identificable.

Contramagia u otra interferencia puede afectarla cuando sea compatible con su descripción.

Si la activación es válida y el gasto de RE ya fue comprometido, una interferencia posterior no devuelve RE automáticamente.

#### Catálogo de objetos vinculados de referencia

##### Broche de Barrera

- Encantamiento I.
- Hechizo Vinculado: Barrera Cinética.
- Sintonización 1.
- RE 6.
- cada uso consume 3 RE y una Reacción.
- permite hasta 2 activaciones entre recargas si conserva reserva suficiente.
- no se acumula con Guardia/Barrera Rúnica o Escudo de campo equivalente.

##### Anillo de Paso Breve

- Encantamiento I.
- Hechizo Vinculado: Paso Breve.
- Sintonización 1.
- RE 6.
- cada uso consume 4 RE y la Acción correspondiente.
- el objeto usa PE +4 contra DF 12 cuando la prueba sea necesaria.
- no convierte el movimiento en Reacción ni permite destino inválido.

##### Lentes de Visión Arcana

- Encantamiento I.
- Hechizo Vinculado: Visión Arcana.
- Sintonización 1.
- RE 6.
- cada uso consume 2 RE.
- puede activarse hasta 3 veces entre recargas.
- no identifica automáticamente lo percibido.

##### Brazal de Aguja Gélida

- Encantamiento II.
- Hechizo Vinculado: Aguja Gélida.
- Sintonización 2.
- RE 10.
- ataque: 2d10 +6 contra Defensa.
- coste 5 RE.
- conserva Daño 5, Pen 1 y Movimiento -2 conforme al hechizo.
- permite hasta 2 usos con reserva completa.

##### Capa de Invisibilidad

- Encantamiento III.
- Hechizo Vinculado: Invisibilidad.
- Sintonización 3.
- RE 14.
- coste 9 RE.
- Sostenida, máximo una Escena;
- ocupa Sostenimiento normal;
- una acción ofensiva termina el efecto conforme al hechizo;
- no produce indetectabilidad total.

##### Vara de Ruptura

- Encantamiento III.
- Hechizo Vinculado: Rayo de Ruptura.
- Sintonización 3.
- RE 14.
- coste 10 RE.
- utiliza PE +8 cuando la resolución necesite tirada;
- conserva línea de 8 espacios, Daño 8 y Pen 4;
- normalmente sólo puede utilizarse una vez antes del próximo Descanso Completo.

#### No se compra aprendizaje con un objeto

Usar un Hechizo Vinculado:

- no enseña el hechizo;
- no concede la Disciplina;
- no satisface requisitos de Técnicas mágicas;
- no permite copiar el Patrón sin investigación;
- no convierte PE en Canalización;
- no permite lanzar el mismo hechizo con Maná personal si el personaje no lo conoce.

El poder comprado en un objeto es acceso material limitado, no desarrollo del personaje.

#### Sellos Autónomos de Custodia

CRAFT-08 permite una forma limitada de trampa/seguridad mágica autónoma.

Un **Sello de Custodia**:

- se fija a una estructura, puerta, cofre, umbral o instalación;
- no es equipo portátil utilizable como objeto Sintonizado;
- posee una sola carga autónoma;
- no se recarga mediante Descanso;
- utiliza un Encantamiento I o II;
- sólo puede liberar un efecto instantáneo o de duración no demandante autorizado por su Perfil.

Un Sello III no forma parte del procedimiento estándar.

El Sello necesita:

- el Proyecto de Encantamiento del Grado correspondiente;
- un soporte físico o Armazón de CRAFT-06 cuando el disparador lo exija;
- un disparador definido.

Disparadores mágicos estándar:

- contacto con el soporte;
- apertura/manipulación;
- cruce de un umbral definido;
- presencia de una **marca/llave mágica específica** preparada con el Sello para permitir Bypass.

No puede detectar:

- intención hostil;
- moralidad;
- culpabilidad;
- nombre verdadero;
- afiliación política;
- «enemigos» como categoría abstracta.

Al activarse, el Sello consume su carga autónoma y queda **Descargado**.

Un mismo evento indivisible —una apertura, contacto o cruce concreto— no puede descargar varios Sellos ordinarios contra el mismo objetivo para multiplicar resoluciones. Varios Sellos pueden proteger puntos o condiciones distintas y activarse secuencialmente; un entramado que pretenda una descarga combinada es un Perfil específico y se audita como un único efecto.

Una descarga que requiera tirada utiliza PE del Grado.

Un Sello Descargado conserva su matriz, pero no puede volver a producir el efecto hasta rearmarse. A efectos comerciales, su valor aplicable se reduce respecto del Sello cargado en **dos veces el coste material de rearme**. De ese modo, utilizar la carga y vender después el Sello no conserva artificialmente el valor de una activación ya consumida.

**Rearmar un Sello** requiere:

- 25% del CE original, redondeado hacia arriba;
- 25% del tiempo de Encantamiento original, mínimo 4 h;
- competencia e instalación suficientes;
- restaurar además cualquier carga física o componente consumido.

Al completar el rearme recupera el valor de referencia del Sello cargado.

No existe rearme automático.

Esto permite alarmas, cierres y trampas mágicas preparadas sin crear una torreta infinita.

#### Acciones y objetos mágicos

Un objeto mágico no concede automáticamente economía adicional.

- activar un efecto de Acción consume Acción;
- activar una Reacción consume Reacción;
- un objeto pasivo no crea nuevas acciones;
- poseer tres objetos Sintonizados no concede tres Reacciones;
- un Hechizo Vinculado conserva la economía del hechizo;
- un efecto automático sólo existe en un Sello/Perfil que lo autorice y consume su propia carga.

No se pueden activar simultáneamente varios objetos «porque estaban preparados» salvo que cada efecto tenga una economía válida propia.

#### Apilamiento

Reglas universales:

- efectos equivalentes usan el mejor beneficio salvo autorización expresa;
- varias Ventajas no se acumulan;
- Protección equivalente no se suma;
- Barrera Cinética, Barrera Rúnica, Broche de Barrera, Escudo de campo y defensas mágicas equivalentes no se convierten en una pila de +2;
- una reducción de daño equivalente usa el mejor valor;
- un Encantamiento no aumenta CapM o CRu;
- un Encantamiento no aumenta Maná máximo;
- RE no puede alimentar Runas de CRAFT-07;
- Maná no recarga RE durante una Escena;
- Energía/Caudal no alimentan Encantamientos salvo regla futura específica.

#### Estado, reparación y desmantelamiento

El Encantamiento forma parte del valor del objeto mediante VRF.

Para reparación:

- si el daño afecta sólo una parte física ordinaria, se aplican las reglas normales pertinentes;
- si afecta la matriz de Encantamiento, preservar o restaurar el Encantamiento exige los requisitos profesionales de su Grado;
- un objeto Deshabilitado no puede utilizar su Encantamiento;
- un objeto Dañado puede conservarlo si la matriz no fue afectada, según la consecuencia concreta.

El CE integrado no se recupera íntegramente al desmantelar.

VI máximo recuperable del Encantamiento integrado:

| Estado | VI respecto del CE |
|---|---:|
| Operativo | 25% |
| Dañado | 15% |
| Deshabilitado | 10% |
| Arruinado | 5% |
| Destruido | 0% salvo componente explícitamente superviviente |

No se cuenta dos veces un componente especial recuperado por separado.

Un Soporte Dedicado recupera además sus materiales ordinarios conforme a CRAFT-02.

#### Auditoría económica

El valor añadido por Encantamiento es siempre **2 × CE**.

La venta directa ordinaria de referencia recupera aproximadamente 50% de ese incremento, por lo que no supera el CE invertido antes de trabajo.

Los Soportes Dedicados usan igualmente CM = 50% de su VR base.

El sistema no presupone compradores automáticos para objetos Restringidos, Raros o Excepcionales.

#### Salvaguardas de CRAFT-08

- Sintonización máxima universal = 3.
- VOL no aumenta Sintonización.
- una joya no crea capacidad adicional por ser pequeña.
- un objeto ordinario sólo posee un Encantamiento autónomo.
- desintonizar vacía RE.
- cambiar de objeto durante el día no concede una reserva nueva.
- no pueden apilarse varias reservas Sintonizadas del mismo Patrón o Hechizo Vinculado.
- RE no es Maná ni Energía.
- no existe Sobrecarga de RE.
- PE sustituye, no se suma a, atributos/Habilidades del usuario.
- un objeto no convierte un Ritual en Acción.
- los Hechizos Legendarios no se vinculan por receta estándar.
- un Sostenimiento de objeto ocupa el límite normal de Sostenimiento.
- una propiedad pasiva no se obtiene declarando permanente un hechizo Sostenido.
- usar un objeto no enseña su hechizo.
- no se acumulan defensas mágicas equivalentes.
- un Sello autónomo tiene una carga y no se rearma solo.
- los Encantamientos Utilitarios no producen ventajas mecánicas encubiertas.
- Cristales de Resonancia continúan fuera del sistema de equipo.
- CRAFT-08 no crea acciones, ataques o Reacciones adicionales.

#### Límites de CRAFT-08

CRAFT-08 no define todavía:

- dispositivos híbridos que conviertan Energía en magia de Encantamiento;
- encantamientos alimentados por acumuladores;
- torretas o máquinas mágicas de activación repetida;
- autómatas encantados complejos;
- investigación de nuevos Encantamientos;
- maldiciones;
- artefactos únicos con varias propiedades mayores;
- objetos Legendarios reproducibles;
- excepciones a Sintonización.

La integración entre Encantamiento y maquinaria se define a continuación. El diseño de efectos inéditos y artefactos pertenece a **CRAFT-10 — Investigación**.

### CRAFT-09 — Ingeniería y dispositivos

> **VIGENTE · CERRADO.** CRAFT-09 cuantifica acumuladores, Estabilidad, recarga, transferencia, módulos técnicos, dispositivos portátiles y autómatas auxiliares. Conserva la separación entre Energía, Maná y Reserva Encantada y convierte los dispositivos de referencia del capítulo 17 en equipo fabricable y utilizable.

#### Arquitectura energética

Un sistema arcano-industrial distingue:

- **Energía (E):** cantidad almacenada.
- **Caudal (C):** Energía máxima que una fuente puede entregar a una sola activación.
- **Estabilidad (Est):** Energía máxima que un acumulador puede **recibir de forma segura durante un intervalo de carga de 10 minutos**.
- **Consumo:** Energía que una activación concreta necesita.

Una activación es válida sólo si:

**Consumo <= Energía disponible**  
y  
**Consumo <= Caudal efectivo.**

Una activación válida compromete y gasta su Energía aunque una tirada posterior falle o el objetivo evite el efecto, igual que un hechizo válido gasta Maná.

Una declaración que no puede activarse porque falta Energía, Caudal, estado, objetivo o economía de acciones se detiene antes del gasto.

#### Acumuladores portátiles

Los tres acumuladores ya establecidos quedan cuantificados completamente:

| Acumulador | Energía máx. | Caudal | Estabilidad | VR | Disponibilidad | Fabricación |
|---|---:|---:|---:|---:|---|---|
| **Celda menor** | 4 | 2 | 1 | 2 o | Profesional | Estándar; Ingeniería Entrenada · Acumuladores arcanos; 1 Jornada; Adecuada |
| **Acumulador estándar** | 8 | 3 | 2 | 5 o | Profesional/Restringida | Complejo; Ingeniería Experta · Acumuladores arcanos; 2 Jornadas; Profesional |
| **Núcleo pesado** | 16 | 5 | 4 | 15 o | Rara/Restringida | Magistral; Ingeniería Maestra · Acumuladores arcanos; 5 Jornadas; Especializada |

La fabricación requiere además Artesanía coherente para carcasa, contactos y cristal cuando no se adquieran como componentes preparados. El CM usa CRAFT-02 y ya incluye la cantidad ordinaria de cristal arcano refinado necesaria para la receta; no se cobra además un SM por ese mismo cristal.

Los acumuladores se venden y valoran como **hardware vacío**. Una carga energética presente no aumenta automáticamente su VR ni garantiza mayor oferta de reventa.

Calidad Superior/Excepcional puede aplicarse al objeto físico conforme a CRAFT-04, pero **no aumenta Energía, Caudal ni Estabilidad** sin una propiedad específica.

#### Recarga estable

Una fuente de carga debe definir **Caudal de Carga**.

Durante cada intervalo de 10 minutos:

**Energía total recibida por el acumulador <= min(Caudal de Carga total disponible, Estabilidad del acumulador objetivo, espacio libre de Energía).**

Si varias fuentes intentan cargar el mismo acumulador durante el mismo intervalo, sus aportes se suman **antes** de aplicar Estabilidad. Varias fuentes no permiten recibir varias veces la Estabilidad.

Del mismo modo, el **Caudal de Carga de una fuente es su entrega total por intervalo a todos los receptores combinados**, salvo que su Perfil declare canales independientes. Dividir una Estación de Caudal 4 entre dos acumuladores no permite entregar 4 E a cada uno: reparte un máximo total de 4 E.

La transferencia no crea Energía.

Si otro acumulador actúa como fuente:

- su Caudal funciona como Caudal de Carga;
- pierde exactamente la Energía transferida;
- no puede entregar más de su Energía restante;
- su propio estado debe permitir descarga.

Ejemplos:

- una Celda menor vacía con Estabilidad 1 recibe como máximo 1 E cada 10 minutos;
- un Acumulador estándar vacío recibe hasta 2 E cada 10 minutos;
- un Núcleo pesado vacío recibe hasta 4 E cada 10 minutos.

Con una fuente suficientemente capaz, sus tiempos mínimos de carga completa son por tanto aproximadamente 40, 40 y 40 minutos.

#### Estación de carga de taller

Una **Estación de carga de taller** es infraestructura, no un acumulador.

- **Caudal de Carga:** 4.
- **VR:** 10 o.
- **Complejidad:** Complejo.
- **Principal:** Ingeniería Experta · Acumuladores arcanos.
- **Auxiliar:** Artesanía Entrenada y acceso a fuente energética compatible.
- **Instalación:** Profesional.
- **Tiempo:** 3 Jornadas.

La estación no crea Energía: debe estar conectada a red, generador, reserva ambiental o fuente explícita.

Cuando existe servicio comercial estable, el precio de referencia de una recarga es **1 c por cada E transferida**, sin que ello garantice disponibilidad en todas las regiones. Una fuente propia utiliza su combustible, infraestructura o coste real.

#### Carga forzada

Un acumulador Operativo puede aceptar durante un único intervalo hasta:

**2 × Estabilidad E**

si la fuente puede entregarlas y existe espacio libre.

Esto exige **INT + Ingeniería DF 16**.

- **Éxito:** se transfiere la Energía y el acumulador queda **Dañado**.
- **Fallo:** no se transfiere Energía y el acumulador queda **Deshabilitado**.
- **Pifia:** además puede dañar fuente, conexión o entorno cuando sea causalmente plausible.
- un acumulador Dañado no puede intentar Carga forzada.

Nunca puede superarse su Energía máxima.

#### Estados de dispositivos y acumuladores

Se conservan:

**Operativo -> Dañado -> Deshabilitado.**

Regla universal de CRAFT-09:

- **Operativo:** funcionamiento completo.
- **Dañado:** puede funcionar normalmente si su Perfil no dice otra cosa, pero no puede utilizar Sobrecarga Controlada ni Carga forzada; un nuevo empeoramiento de estado lo lleva a Deshabilitado.
- **Deshabilitado:** no puede activar, descargar ni recibir carga hasta ser reparado cuando corresponda.

CRAFT-09 no introduce puntos de durabilidad.

Las reparaciones utilizan CRAFT-02 y la competencia del dispositivo.

#### Sobrecarga Controlada

Se conserva la regla del capítulo 17:

- sólo una construcción compatible y Operativa;
- debe existir Energía suficiente;
- la activación debe ser válida salvo por necesitar **exactamente +1 de Caudal**;
- **INT + Ingeniería DF 16**.

**Éxito:** Caudal efectivo +1 para esa activación; el efecto se ejecuta, consume Energía y el dispositivo queda Dañado.

**Fallo:** no se activa y queda Deshabilitado.

**Pifia:** puede añadir consecuencia energética contextual.

No crea Energía, no eleva Consumo permitido en más de 1 y no puede repetirse sobre un dispositivo Dañado.

El paso a **Dañado/Deshabilitado** producido por Sobrecarga Controlada o Carga forzada es un **coste/consecuencia intrínseca del procedimiento**. No puede prevenirse, reducirse ni sustituirse mediante Estabilidad Rúnica, Tenacidad de material, Mantenible u otra protección de estado salvo que una regla mencione expresamente esa interacción.

#### Una fuente activa por defecto

Un dispositivo portátil utiliza **un acumulador activo** por defecto. Salvo que un Perfil diga expresamente lo contrario, el **VR y CM del dispositivo o Módulo no incluyen el acumulador ni el Host**: fuente, Host y Módulo se adquieren o fabrican por separado.

Conectar físicamente varias fuentes:

- no suma Energía disponible para la activación;
- no suma Caudal;
- no permite seleccionar retroactivamente de cuál se pagó una activación.

Para combinar reservas hace falta infraestructura diseñada.

Cambiar un acumulador portátil accesible durante combate consume normalmente **una Acción**. Una batería alojada tras carcasa, tornillos, aislamiento o calibración puede requerir más tiempo.

Fuera de presión, cambiar una fuente compatible es rutinario.

#### Banco y Acoplador de Caudal

Un **Banco de Acumuladores** permite usar dos acumuladores compatibles como una sola reserva.

##### Banco simple

- **VR:** 4 o.
- **Complejidad:** Complejo.
- **Principal:** Ingeniería Experta · Acumuladores arcanos.
- **Instalación:** Profesional.
- **Tiempo:** 1 Jornada.
- **Energía disponible:** suma de la Energía actual de ambas fuentes.
- **Caudal de salida:** el mayor Caudal individual instalado, nunca la suma.

La Energía se descuenta de las fuentes según el cableado registrado. Cambiar ese orden fuera de presión es rutinario.

##### Acoplador de Caudal

Una versión Magistral puede coordinar dos acumuladores:

- **VR:** 10 o.
- **Complejidad:** Magistral.
- **Principal:** Ingeniería Maestra · Acumuladores arcanos.
- **Instalación:** Especializada.
- **Tiempo:** 4 Jornadas.
- **Caudal efectivo de salida:** máximo entre los acumuladores +1, con techo **5**.
- cada activación que utilice ese +1 de Caudal consume además **1 E de sobrecoste** del banco.

No permite superar Caudal 5 mediante la receta estándar y nunca crea Energía.

La salida de un Banco o Acoplador **no cuenta como un acumulador individual válido para alimentar otro Acoplador**. Los Acopladores no pueden encadenarse para repetir el +1 de Caudal.

Una infraestructura fija de mayor Caudal requiere un Perfil propio.

#### Dispositivo, Host y Módulo técnico

Un **Dispositivo** debe registrar:

- efecto;
- activación;
- Consumo;
- Caudal mínimo;
- duración;
- fuente compatible;
- si es autónomo, portátil, fijo o Módulo;
- requisitos de fabricación;
- estado.

Un **Módulo técnico** se instala en un Host compatible —arma, herramienta, armadura, visor, arnés u otra plataforma— y utiliza la Energía de una fuente conectada.

Reglas universales:

- un Host ordinario admite **un Módulo técnico activo** mediante CRAFT-09;
- instalar un segundo Módulo simultáneo requiere un Perfil específico; no se obtiene por Calidad;
- un Módulo no consume CapM ni CRu;
- la Modificación **Modular** de CRAFT-04 permite cambiar rápidamente una familia declarada de Módulos compatibles, pero no aumenta el número simultáneo;
- sin Modular, instalar o reemplazar un Módulo requiere normalmente 25% del tiempo base del Host, mínimo 1 h;
- un Módulo no concede una Acción adicional;
- si modifica una Acción o ataque existente, su activación es **Vinculada** a esa resolución;
- un Módulo de arma modifica por defecto sólo una resolución que utilice el **perfil del arma Host**; no mejora automáticamente un Hechizo Vinculado, una descarga de Encantamiento u otro ataque emitido desde el mismo objeto;
- la Energía se compromete antes de la tirada modificada.

Efectos equivalentes de Módulo, Calidad, Material, Runa, Encantamiento o hechizo usan el mejor beneficio salvo autorización expresa.

#### Lámpara arcana

- **VR:** 2 o.
- **Complejidad:** Estándar.
- **Principal:** Ingeniería Entrenada · Acumuladores arcanos.
- **Auxiliar:** Artesanía Entrenada · Vidrio y cristal o componente preparado.
- **Instalación:** Adecuada.
- **Tiempo:** 1 Jornada.
- **Consumo/Caudal:** 1/1.
- **Activación:** Acción.
- **Duración:** Escena.
- **Efecto:** iluminación personal estable equivalente a una fuente ordinaria útil.

No revela invisibilidad ni detecta magia. Apagarla voluntariamente no devuelve Energía.

#### Herramienta motorizada

- **VR:** 4 o.
- **Complejidad:** Complejo.
- **Principal:** Ingeniería Experta; especialización según máquina.
- **Instalación:** Profesional.
- **Tiempo:** 2 Jornadas.
- **Consumo/Caudal:** 1/1 por hora o fracción de trabajo efectivo.
- **Efecto:** se registra una operación física concreta —taladrar, cortar, pulir, prensar u otra—. Para una etapa realmente dominada por esa operación reduce su tiempo base **25%** y cuenta como herramienta adecuada.

No reduce tiempos de secado, espera, investigación o trabajo no mecanizable. No se acumulan varias herramientas motorizadas para reducir indefinidamente una misma etapa y se mantienen los pisos temporales de CRAFT-01.

#### Visor espectral

- **VR:** 6 o.
- **Complejidad:** Complejo.
- **Principal:** Ingeniería Experta · Acumuladores arcanos.
- **Auxiliar:** Arcana Entrenada.
- **Instalación:** Profesional.
- **Tiempo:** 2 Jornadas.
- **Consumo/Caudal:** 1/1.
- **Activación:** Acción.
- **Duración:** Escena.
- **Efecto:** Ventaja a **PER + Arcana** o **PER + Ingeniería** para examinar manifestaciones arcanas activas, flujos energéticos o funcionamiento energético que el sensor pueda captar físicamente.

No ve a través de paredes, no concede Visión Arcana completa, no identifica automáticamente un hechizo y varias Ventajas no se acumulan.

#### Estabilizador de tiro

- **Tipo:** Módulo para arma a distancia no arrojadiza.
- **VR:** 6 o.
- **Complejidad:** Complejo.
- **Principal:** Ingeniería Experta · Armamento.
- **Instalación:** Profesional.
- **Tiempo:** 2 Jornadas.
- **Consumo/Caudal:** 1/1.
- **Activación:** Vinculada a un ataque.
- **Efecto:** +1 al ataque si el usuario no gastó Movimiento antes de ese ataque y no está siendo desplazado materialmente.

Es equivalente a **Estabilizada** de CRAFT-04 para apilamiento.

#### Cámara de penetración

- **Tipo:** Módulo para arma de fuego compatible.
- **VR:** 10 o.
- **Complejidad:** Complejo.
- **Principal:** Ingeniería Experta · Armamento.
- **Auxiliar:** Artesanía Entrenada · Forja y metal.
- **Instalación:** Profesional.
- **Tiempo:** 3 Jornadas.
- **Consumo/Caudal:** 2/2.
- **Activación:** Vinculada a un disparo.
- **Efecto:** **Pen +2** para esa resolución, máximo **Pen 5** mediante CRAFT-09.

No se acumula con Perfil penetrante, Aguja Rúnica, Filo Penetrante u otro aumento equivalente; se usa el mejor.

#### Propulsor de impacto

- **Tipo:** Módulo para arma cuerpo a cuerpo compatible.
- **VR:** 10 o.
- **Complejidad:** Complejo.
- **Principal:** Ingeniería Experta · Armamento.
- **Instalación:** Profesional.
- **Tiempo:** 3 Jornadas.
- **Consumo/Caudal:** 2/2.
- **Activación:** Vinculada a un ataque.
- al fabricar se elige **un** diseño:
  - **Impacto:** +2 Daño para esa resolución; o
  - **Impulso:** si impacta, desplaza 1 espacio a objetivo de Escala igual o menor con trayectoria válida.

El diseño elegido no cambia gratuitamente entre ataques.

Impacto no se acumula con Golpe optimizado, Filo Arcano o equivalente. Impulso no se acumula con Impulso Cinético u otro desplazamiento equivalente.

#### Escudo de campo

- **VR:** 12 o.
- **Complejidad:** Complejo.
- **Principal:** Ingeniería Experta · Acumuladores arcanos.
- **Auxiliar:** Arcana Entrenada.
- **Instalación:** Profesional.
- **Tiempo:** 3 Jornadas.
- **Consumo/Caudal:** 2/2.
- **Activación:** Reacción ante un ataque perceptible.
- **Efecto:** +2 Defensa contra ese ataque.

No se acumula con Barrera Cinética, Barrera Rúnica, Broche de Barrera u otra defensa mágica/energética equivalente. Consume la Reacción normal.

#### Arnés de carga

- **VR:** 8 o.
- **Complejidad:** Complejo.
- **Principal:** Ingeniería Experta · Vapor o Acumuladores arcanos según diseño.
- **Instalación:** Profesional.
- **Tiempo:** 3 Jornadas.
- **Consumo/Caudal:** 1/1.
- **Activación:** Acción para iniciar.
- **Duración:** Escena.
- **Efecto:** para **levantar, sostener, arrastrar o transportar carga**, el usuario interactúa como una categoría de Escala mayor cuando la estructura y el apoyo lo permiten.

No aumenta FUE, daño, Defensa, Movimiento, maniobras contra criaturas ni capacidad de utilizar armas sobredimensionadas.

#### Prótesis motorizada

- **VR:** 12 o.
- **Complejidad:** Complejo.
- **Principal:** Ingeniería Experta.
- **Auxiliares:** Artesanía Entrenada y Medicina Entrenada para ajuste anatómico cuando corresponda.
- **Instalación:** Profesional.
- **Tiempo:** 5 Jornadas.
- **Consumo/Caudal:** 1/1 por Escena de uso exigente.
- **Efecto:** sustituye una función mecánica ordinaria compatible del miembro o articulación para la que fue diseñada.

No concede FUE adicional, Movimiento adicional, ataque adicional, miembro adicional ni elimina por sí sola una Herida Grave o Trauma. Su interacción médica concreta depende de la lesión y ajuste.

Sin Energía puede conservar funciones pasivas que su diseño físico permita, pero no asistencia motorizada.

#### Autómata auxiliar

- **VR:** 20 o.
- **Complejidad:** Magistral.
- **Principal:** Ingeniería Maestra · Autómatas.
- **Auxiliar:** Artesanía Experta coherente.
- **Instalación:** Especializada.
- **Tiempo:** 6 Jornadas.
- **Fuente:** Celda menor o Acumulador estándar compatible.
- **Consumo/Caudal:** 1/1 por hora o fracción de trabajo profesional efectivo.

Un Autómata auxiliar de CRAFT-09 es **equipo**, no un segundo Actor completo.

Al fabricarlo se registra una función profesional estrecha y las herramientas correspondientes.

Fuera de combate puede elegir por etapa:

- contar como **un colaborador efectivo de Ayuda de trabajo** de CRAFT-01; o
- proporcionar **Ayuda técnica** cuando su función realmente contribuya a la incertidumbre.

No proporciona ambas sobre la misma etapa.

El Autómata auxiliar **no satisface por sí solo el rango mínimo, Especialización, Disciplina Principal o Disciplina Auxiliar obligatoria** de un Proyecto. Debe existir un responsable competente cuando la receta lo exija.

En combate:

- no posee Iniciativa, Acción o Reacción independientes;
- no ataca;
- no lanza hechizos;
- no activa objetos por cuenta propia;
- una intervención táctica significativa requiere la Acción del controlador salvo Perfil posterior.

Un autómata verdaderamente independiente utiliza un Perfil de PNJ/constructo y no se obtiene automáticamente a partir de esta receta.

#### Alimentación y duración

Cuando un dispositivo expresa Consumo «por Escena», paga una sola vez al activarse y permanece hasta el final de esa Escena salvo apagado, pérdida de fuente o regla propia.

Cuando expresa Consumo «por hora o fracción», cada bloque iniciado consume nuevamente Energía.

Una duración de Escena no permite mantener gratuitamente un dispositivo durante horas sólo porque nunca se declaró el final narrativo de la escena.

#### Integración con Runas

Un dispositivo puede poseer Calidad y CRu si cumple CRAFT-04/07.

Sin embargo:

- una Runa o Piedra sigue gastando **Maná personal**;
- Energía no paga una Impronta;
- un acumulador no aumenta CRu;
- una Impronta no aumenta Caudal;
- una activación de Módulo y una Impronta Vinculada pueden coexistir en la misma resolución sólo si afectan magnitudes diferentes y ambas economías son válidas;
- efectos equivalentes no se suman.

Ejemplo válido: Cámara de penetración + Filo Arcano I puede aplicar Pen +2 del Módulo y +1 Daño de la Impronta, pagando 2 E y 2 Maná.

Ejemplo inválido: Cámara de penetración + Aguja Rúnica I no suma Pen +3; se utiliza el mejor aumento compatible.

CRAFT-09 **no establece una conversión universal Energía -> Maná**.

#### Integración con Encantamientos

Un dispositivo puede ser soporte de CRAFT-08 si cumple sus requisitos.

La Reserva Encantada permanece separada:

- Energía no recarga RE;
- RE no alimenta un Módulo;
- Sintonización no aumenta Caudal;
- un Hechizo Vinculado conserva su propia Acción/Reacción;
- activar un dispositivo no activa gratis su Encantamiento.

Una combinación que pretenda una única activación híbrida Energía + Encantamiento necesita un Perfil específico o CRAFT-10. No se infiere.

#### Integración con Sellos y automatización

Un Sello de Custodia puede actuar como disparador de un mecanismo cuando ambos Perfiles sean compatibles, pero:

- el Sello consume su propia carga;
- el dispositivo consume su propia Energía;
- no se convierten entre sí;
- el resultado no obtiene dos acciones o dos ataques si ambos describen la misma liberación.

Una máquina autónoma repetitiva, torreta o autómata combatiente requiere un Perfil propio con:

- sensores;
- criterio de objetivo;
- economía de acciones;
- fuente;
- Consumo/Caudal;
- ataque/Defensas;
- estado.

No existe una plantilla universal que convierta un Módulo en una torreta gratuita.

#### Reparación

Competencia habitual:

- acumuladores: Ingeniería · Acumuladores arcanos;
- armamento motorizado: Ingeniería · Armamento y Artesanía cuando haya piezas físicas dañadas;
- autómatas: Ingeniería · Autómatas;
- estructuras de vapor: Ingeniería · Vapor;
- componente arcano desconocido: puede requerir Arcana.

CRAFT-02 fija materiales y tiempo por estado.

La Energía almacenada no reaparece al reparar un acumulador. Un acumulador reparado conserva únicamente la Energía que físicamente hubiera quedado o vuelve vacío si el daño justificó pérdida/descarga.

#### Desmantelamiento

El hardware usa CRAFT-02/05.

La Energía restante puede transferirse antes del desmantelamiento si el acumulador funciona y existe un receptor válido.

Desmantelar no convierte Energía restante en VI.

Cristal arcano o componentes especiales recuperables se cuentan una sola vez.

#### Calidad, Material y Módulos

CRAFT-09 no modifica las escalas anteriores:

- Calidad no aumenta E/C/Est.
- Material Especial no aumenta E/C/Est salvo Perfil expreso.
- CapM no es capacidad energética.
- CRu no es Caudal.
- Encantamiento no es una batería industrial.
- Módulo no es una Modificación de CRAFT-04 aunque pueda ser físicamente intercambiable mediante Modular.

Estas capacidades deben registrarse por separado en la ficha.

#### Ejemplo completo: rifle con Cámara de penetración

Rifle temprano Común:

- Daño 7, Pen 3;
- Cámara de penetración instalada;
- fuente: Acumulador estándar 8 E / C3;
- activación del Módulo: 2 E / C2.

Antes de tirar el disparo se declaran y gastan 2 E.

Ese ataque utiliza **Pen 5**.

Si falla, la Energía ya gastada no se devuelve.

Tras cuatro activaciones completas el acumulador queda sin Energía.

La Cámara no elimina Recarga 2.

#### Ejemplo completo: Escudo de campo

Con Acumulador estándar:

- 8 E;
- cada Reacción cuesta 2;
- máximo teórico de 4 activaciones antes de recarga;
- cada activación consume la Reacción normal;
- no se combina con Barrera Cinética o Barrera Rúnica para obtener +4.

#### Ejemplo completo: banco de dos Celdas menores

Dos Celdas:

- Energía conjunta 8;
- Caudal individual 2.

Con Banco simple:

- Energía disponible 8;
- Caudal 2.

No se convierte en Caudal 4.

Con Acoplador de Caudal:

- Caudal efectivo 3;
- una activación que realmente use ese tercer punto paga además 1 E de sobrecoste.

#### Salvaguardas de CRAFT-09

- Energía, Maná y RE son recursos distintos.
- Estabilidad sólo gobierna recepción segura de Energía.
- conectar acumuladores no suma Caudal automáticamente.
- Banco simple suma reserva, no Caudal.
- Acoplador estándar sólo aumenta Caudal +1 y nunca supera 5.
- los Acopladores no pueden encadenarse para repetir ese +1.
- ninguna recarga supera Energía máxima.
- Carga forzada y Sobrecarga tienen consecuencias de estado.
- un dispositivo Dañado no puede volver a sobrecargarse.
- un Host ordinario admite un Módulo técnico activo.
- Modular permite intercambio, no más Módulos simultáneos.
- Módulos no conceden Acciones.
- efectos equivalentes no se acumulan.
- Cámara de penetración no supera Pen 5.
- un Propulsor no concede simultáneamente daño y empuje.
- Escudo de campo consume Reacción.
- Arnés de carga no aumenta capacidad ofensiva.
- Prótesis motorizada no concede miembro/ataque extra.
- Autómata auxiliar no es un segundo Actor ni sustituye prerrequisitos profesionales.
- Energía no activa Runas ni recarga Encantamientos.
- un Sello y un dispositivo pagan cada recurso por separado.
- reparación no rellena Energía.
- desmantelar no convierte Energía en VI.

#### Límites de CRAFT-09

CRAFT-09 no define todavía:

- generadores portátiles universales;
- redes eléctricas/arcano-industriales completas;
- vehículos específicos;
- artillería;
- torretas con Perfil de combate;
- autómatas independientes;
- conversión Energía <-> Maná o RE;
- dispositivos de Caudal superior a 5 como receta universal;
- prototipos híbridos fuera del catálogo;
- tecnología de los Fundadores.

Esos diseños requieren Perfiles específicos y, cuando sean nuevos, **CRAFT-10 — Investigación, prototipos y estabilización de diseños**.

CRAFT-10 se desarrolla a continuación.

### CRAFT-10 — Investigación, prototipos y estabilización de diseños

> **VIGENTE · CERRADO.** CRAFT-10 define cómo transformar una idea, muestra, efecto desconocido o combinación nueva en conocimiento reproducible. Conserva el ciclo **Concepto -> Viabilidad -> Investigación -> Prototipo -> Fórmula/Plano/Patrón estable**, sin puntos universales de progreso y sin permitir que una tirada alta atraviese límites establecidos por el canon.

#### Principio de investigación

Investigar no significa tirar repetidamente hasta obtener un resultado alto.

Cada Proyecto de Investigación debe responder preguntas distintas y producir cambios verificables de conocimiento.

CRAFT-10 distingue:

- **Concepto:** qué se intenta descubrir o construir.
- **Viabilidad:** si el objetivo puede existir con los principios actuales.
- **Preguntas de Investigación:** incógnitas concretas que deben resolverse.
- **Prototipo:** primera implementación funcional, todavía experimental.
- **Validación:** prueba de que funciona en condiciones declaradas.
- **Plano provisional:** documentación suficiente para intentar reproducirlo.
- **Réplica:** segunda implementación construida desde la documentación.
- **Plano/Fórmula/Patrón estable:** procedimiento reproducible.

No existe una reserva de «puntos de investigación».

#### Ficha de Investigación

Antes de comenzar debe registrarse:

- **Objetivo exacto**.
- **Perfil mecánico pretendido**, cuando corresponda.
- **Análogo canónico más cercano**.
- **Clase de novedad**.
- **Complejidad prevista** del resultado.
- **Disciplina Principal**.
- **Disciplinas Auxiliares**.
- **Condiciones de Viabilidad**.
- **Coste Material Proyectado (CMP)** de una unidad estable.
- **Tiempo Base Proyectado (TBP)** de una unidad estable.
- **Preguntas de Investigación**.
- **Condiciones de Validación**.
- **Riesgos conocidos**.
- **Estado de Desarrollo**.

Si el objetivo todavía es demasiado impreciso para asignar un Perfil, CMP o TBP, sólo puede realizarse investigación exploratoria hasta obtener datos suficientes.

#### Concepto

El Concepto debe declarar qué se quiere conseguir en términos verificables.

No es suficiente:

> «quiero inventar un arma mejor».

Debe expresarse algo como:

> «quiero desarrollar un mecanismo de rifle que acepte un Módulo de estabilización sin aumentar su Recarga ni añadir ataques».

o:

> «quiero identificar si este material Fundador conserva una propiedad energética reproducible».

La investigación sólo puede producir aquello que fue realmente planteado o una conclusión razonablemente derivada de la evidencia. Un margen alto no añade beneficios no declarados.

#### Viabilidad

La Viabilidad se determina **antes** de las pruebas de desarrollo.

Puede ser:

##### Posible

Los principios necesarios existen y el objetivo no contradice límites conocidos.

##### Posible con condiciones

El objetivo puede desarrollarse sólo si primero se cumplen una o más condiciones explícitas, por ejemplo:

- conseguir una muestra;
- disponer de un material Raro/Excepcional;
- conocer un hechizo o Patrón relacionado;
- acceder a una instalación concreta;
- obtener una fuente energética compatible;
- estudiar un fenómeno o ruina;
- resolver una Pregunta de Investigación previa;
- reducir el alcance del objetivo.

Las condiciones son requisitos, no bonificadores.

##### Actualmente imposible

El objetivo contradice una regla o principio actualmente establecido o depende de un fenómeno que el sistema no ha demostrado posible.

Ejemplos estándar:

- energía infinita sin fuente;
- convertir universalmente Energía en Maná por mera Ingeniería;
- Resurrección estándar;
- crear materia comercial permanente mediante Objeto Efímero;
- ignorar una imposibilidad física sólo mediante una tirada alta.

Una Viabilidad Actualmente imposible puede cambiar únicamente cuando el mundo, la campaña o una nueva regla establezcan una premisa nueva. No cambia por repetir la prueba.

#### Investigación exploratoria

Cuando no existe todavía un producto objetivo claro, puede investigarse una **Pregunta Exploratoria**.

Ejemplos:

- «¿qué función cumplía esta pieza Fundadora?»;
- «¿por qué este cristal se desestabiliza al recibir Caudal?»;
- «¿qué propiedad conserva esta escama después de curtirla?».

Una Investigación Exploratoria produce:

- un **Hallazgo documentado**;
- una condición nueva de Viabilidad;
- una hipótesis falsada;
- una propiedad identificada;
- o evidencia suficiente para formular un Concepto.

No produce automáticamente un Plano ni una propiedad de objeto.

Un Hallazgo puede convertirse en requisito/evidencia de un Proyecto posterior.

#### Clase de novedad

La novedad mide cuánto se desconoce del procedimiento; **no mide poder**.

| Clase | Uso | Preguntas mínimas | Ajuste a DF de Investigación | Validaciones |
|---|---|---:|---:|---:|
| **Adaptación** | modificar un diseño estable dentro de principios ya conocidos | 1 | +0 | 1 |
| **Reconstrucción** | recuperar un diseño existente a partir de muestra/documentación incompleta | 2 | +0 | 1 |
| **Combinación** | integrar dos subsistemas estables de forma no catalogada | 2 | +2 | 2 |
| **Innovación** | crear un Perfil nuevo dentro de principios conocidos | 3 | +2 | 2 |
| **Frontera** | trabajar con principio desconocido, límite excepcional o tecnología no estabilizada | 4 | +4 | 3 |

Las Preguntas mínimas deben ser **diferentes**. No pueden escribirse cuatro variantes de «¿funciona?» para cumplir el requisito.

Un proyecto puede necesitar más Preguntas si realmente contiene más incógnitas.

La Clase de novedad no autoriza por sí sola a superar límites de Daño, Pen, Protección, Sintonización, Caudal, acciones u otras reglas. Si el Concepto pretende romper un límite estándar, la Viabilidad debe autorizar expresamente esa excepción como parte del nuevo Perfil.

La Clase tampoco puede rebajarse por redacción:

- **Adaptación** conserva las propiedades mecánicas ya estabilizadas y cambia ajuste, geometría, soporte o configuración dentro de una compatibilidad conocida;
- integrar dos subsistemas estables que todavía no poseen una receta conjunta es como mínimo **Combinación**;
- crear una propiedad mecánica nueva es como mínimo **Innovación**;
- intentar una excepción a un límite canónico, principio desconocido o tecnología no comprendida es **Frontera** cuando sea viable.

Renombrar un beneficio existente o describirlo como «ajuste» no convierte una Innovación en Adaptación.

#### DF de Investigación

Cada Pregunta utiliza como base la DF de la Complejidad prevista del resultado:

| Complejidad | DF base |
|---|---:|
| Simple | 10 |
| Estándar | 12 |
| Complejo | 14 |
| Magistral | 16 |
| Extraordinario | 18 |

Después se aplica el ajuste de Clase de novedad.

Ejemplo:

- diseño Complejo de Innovación: DF 16;
- diseño Magistral de Frontera: DF 20;
- diseño Extraordinario de Frontera: DF 22.

La Habilidad utilizada depende de la Pregunta concreta.

#### Disciplina Principal por familia

Como referencia:

- **Ingeniería:** máquinas, mecanismos, acumuladores, autómatas, armamento, infraestructura.
- **Artesanía:** procesos materiales, manufactura, modificación física y técnicas de oficio.
- **Alquimia:** Fórmulas, reactivos, toxinas, explosivos, estabilización química.
- **Ritualismo:** nuevos Patrones rúnicos, Encantamientos, procedimientos rituales.
- **Arcana:** principios mágicos, artefactos, anomalías, teoría de la Trama.
- **Latrocinio:** seguridad, disparadores, contramedidas y mecanismos de trampa.
- **Medicina:** dispositivos/procedimientos biomédicos cuando el problema principal sea anatómico o clínico.
- **Naturaleza:** propiedades biológicas/ecológicas cuando la investigación sea principalmente natural.

**Investigación** es frecuente como Auxiliar para archivos, correlación, comparación de muestras y evidencia. No sustituye automáticamente la disciplina técnica que debe explicar el fenómeno.

Un Proyecto puede cambiar de Habilidad entre Preguntas si realmente cambia la naturaleza del problema.

#### Tiempo de una Pregunta de Investigación

Tiempo base por Pregunta:

| Complejidad prevista | Tiempo por Pregunta |
|---|---:|
| Simple | 2 h |
| Estándar | 1 Jornada |
| Complejo | 3 Jornadas |
| Magistral | 5 Jornadas |
| Extraordinario | 10 Jornadas |

Es trabajo efectivo.

Una Pregunta puede ser documental y no consumir materiales. Si requiere experimentación física, utiliza como referencia:

**10% del CMP**, mínimo **1 p**, en consumibles/componentes por Pregunta.

El coste debe corresponder a experimentos reales. No se cobra metal o cristal abstracto por una fase puramente archivística.

CRAFT-01 puede reducir tiempo por Ayuda de trabajo sólo cuando la fase sea realmente paralelizable. Más investigadores no convierten una Pregunta conceptual en veinte tiradas simultáneas.

#### Resolver una Pregunta

Cuando existe incertidumbre, se realiza una sola prueba apropiada.

**Éxito:** la Pregunta queda resuelta dentro de la evidencia disponible.

**Fallo:** se identifica un **Bloqueo de Investigación**. Para volver a abordar esa misma Pregunta debe cambiar al menos una condición material:

- nueva muestra;
- nueva fuente documental;
- otra metodología;
- mejor instalación;
- instrumento distinto;
- colaborador con competencia realmente nueva;
- material diferente;
- Concepto revisado.

Gastar simplemente más tiempo y repetir la misma tirada no es un cambio válido.

**Pifia:** además del Bloqueo puede producir una consecuencia plausible declarada: contaminación, daño de muestra, accidente, lectura falsa detectada posteriormente u otra consecuencia física/epistémica coherente.

Una Hazaña no resuelve Preguntas adicionales automáticamente.

#### Coste Material Proyectado

El **CMP** es el coste material estimado de fabricar una unidad estable del resultado pretendido.

Se determina usando CRAFT-02 a 09 siempre que exista un análogo suficiente.

Puede incluir:

- CM;
- SM;
- CapM/Calidad;
- matrices rúnicas;
- CE;
- acumuladores;
- Módulos;
- componentes especiales.

Si el efecto no tiene todavía una economía comparable, la Viabilidad debe fijar un CMP provisional antes de entrar en prototipado material.

El CMP **no fija automáticamente el VR comercial** del futuro objeto.

#### Tiempo Base Proyectado

El **TBP** es el tiempo estimado de fabricación de una unidad estable una vez que exista Plano.

Se deriva de las recetas y subsistemas conocidos.

Si todavía no puede estimarse, el proyecto permanece exploratorio.

#### Prototipo

Cuando todas las Preguntas obligatorias están resueltas, puede construirse un **Prototipo Experimental**.

Coste:

**125% del CMP**, redondeado hacia arriba al cobre.

Tiempo:

**150% del TBP.**

La construcción del Prototipo es una situación incierta y requiere una prueba de la Disciplina Principal.

DF:

**DF base de Complejidad +2.**

Para Clase **Frontera**, utiliza en su lugar:

**DF base +4.**

**Éxito:** el Prototipo funciona con el Perfil declarado bajo las condiciones que después deben validarse.

**Fallo:** no se obtiene un Prototipo funcional del Perfil objetivo y queda identificada al menos una **Falla de Diseño**. Antes de construir otro Prototipo debe resolverse una Pregunta Correctiva específica.

El fallo no destruye automáticamente todos los materiales. El estado físico de lo construido y la recuperación posible se resuelven mediante CRAFT-02/05 y la consecuencia real.

**Pifia:** puede añadir daño de instalación, componente, muestra o peligro contextual cuando ese riesgo existía.

**Hazaña:** produce un Prototipo funcional; no lo convierte en Plano estable, no eleva Calidad y no añade propiedades.

#### Estado Experimental

Un Prototipo funcional lleva el estado **Experimental**.

Esto significa:

- su Perfil declarado funciona en las condiciones ya demostradas;
- todavía no existe procedimiento rutinario reproducible;
- no concede un Plano estable;
- no establece Disponibilidad de mercado;
- no tiene una tasa universal de reventa;
- utilizarlo fuera de su envolvente validada puede volver a introducir incertidumbre conforme a CRAFT-01.

Experimental no es un estado de daño.

Un Prototipo puede ser Operativo y Experimental a la vez.

Mientras siga Experimental:

- fabricar otra unidad usa nuevamente el procedimiento de Prototipo —125% CMP, 150% TBP y su prueba—; no se trata como producción rutinaria;
- reparar o recalibrar **la propiedad experimental** no es rutinario y exige la competencia de investigación apropiada; cuando exista incertidumbre usa la DF base de la Complejidad;
- una reparación puramente física que no afecte la parte experimental puede seguir las reglas normales;
- estabilizar más tarde el diseño elimina estas restricciones para futuras unidades y reparaciones cubiertas por el Plano.

#### Validación

La Validación demuestra que el Prototipo funciona en condiciones distintas y relevantes.

Antes de construirlo deben declararse las condiciones que se validarán.

Ejemplos:

- funcionamiento continuo;
- uso bajo carga máxima;
- precisión después de varios ciclos;
- compatibilidad con otro subsistema;
- conservación de una Fórmula;
- comportamiento con materiales alternativos;
- seguridad de una activación;
- estabilidad rúnica;
- respuesta energética.

Cada condición usa una prueba sólo si realmente existe incertidumbre.

DF normal:

**DF base de Complejidad.**

La Habilidad puede ser la Principal o una Auxiliar si esa condición evalúa otro aspecto.

Tiempo de una condición controlada:

**25% del TBP**, mínimo 1 h.

Si la prueba consume materiales, reactivos, munición, energía o muestras, se pagan físicamente. Como referencia para ensayo destructivo/consumptivo:

**5% del CMP**, mínimo 1 p.

Un uso real durante una aventura puede contar como Validación si:

- la condición estaba declarada;
- el Prototipo fue realmente sometido a ella;
- se pudo observar el resultado;
- se acepta el riesgo normal de esa escena.

**Fallo de Validación:** descubre una Falla de Diseño. No se puede simplemente volver a realizar la misma prueba. Requiere una Pregunta Correctiva y, si la corrección cambia físicamente el Prototipo, el trabajo/material correspondiente.

Una Hazaña no sustituye Validaciones pendientes.

#### Plano provisional

Después de completar las Validaciones se redacta un **Plano provisional**.

Tiempo:

**25% del TBP**, mínimo 2 h.

No exige materiales significativos más allá de soportes/documentación ordinarios.

Un Plano provisional:

- permite intentar una Réplica;
- todavía no convierte la producción en rutinaria;
- no se vende ni licencia como Plano estable por las reglas universales.

#### Réplica de estabilización

La prueba final de reproducibilidad consiste en fabricar una segunda unidad **desde el Plano provisional**.

Coste:

**100% del CMP.**

Tiempo:

**100% del TBP.**

Debe ejecutarla una persona que cumpla los requisitos profesionales previstos para la producción estable. Puede ser el inventor u otro profesional.

Como el procedimiento todavía no está estabilizado, se realiza una única prueba final:

**Disciplina Principal contra DF base de la Complejidad.**

**Éxito:** la Réplica funciona conforme al Perfil y el Plano pasa a estado **Estable**.

**Fallo:** el Plano aún contiene una inconsistencia reproducible. La unidad puede quedar incompleta/Defectuosa según la consecuencia, pero el Prototipo original no deja de funcionar por ello. Debe resolverse una Pregunta Correctiva antes de una nueva Réplica.

**Pifia:** puede añadir una consecuencia física plausible, no borrar automáticamente toda la investigación.

**Hazaña:** estabiliza el diseño, pero no añade Calidad ni reduce sus futuros costes.

A partir del éxito de Réplica, una fabricación posterior con Plano estable y requisitos completos vuelve a ser rutinaria y **no tira**, conforme a CRAFT-01.

#### Resultado estable

El resultado final puede ser:

- **Plano estable** — objeto, mecanismo, arma, herramienta, dispositivo, trampa o construcción.
- **Fórmula estable** — Alquimia.
- **Patrón Rúnico estable** — CRAFT-07.
- **Patrón de Encantamiento estable** — CRAFT-08.
- **Perfil de Material estable** — CRAFT-05.
- **Perfil de Dispositivo estable** — CRAFT-09.
- **Procedimiento Ritual estable** — cuando el diseño corresponda a Ritualismo.
- **Hallazgo documentado** — investigación exploratoria sin receta reproducible.

El documento final debe incluir todos los campos necesarios de su subsistema: costes, tiempo, requisitos, activación, límites, efectos, compatibilidad y consecuencias.

#### Investigación Correctiva

Una Falla de Diseño o Validación crea una nueva Pregunta Correctiva.

La Pregunta:

- debe describir el problema descubierto;
- utiliza la misma DF que correspondería a una Pregunta de su Clase original, salvo que el problema sea objetivamente más simple;
- consume su tiempo y experimentos;
- no aumenta por sí sola el número de beneficios del producto.

Corregir un problema no autoriza rediseñar gratuitamente otra parte.

#### Ingeniería inversa

La **Reconstrucción** recupera conocimiento de un diseño que ya existe.

Requiere:

- muestra física, documentación parcial o evidencia técnica suficiente;
- acceso a los componentes relevantes;
- competencia apropiada.

Identificar un objeto no equivale a reconstruir su Plano.

##### Estudio no destructivo

Conserva la muestra y utiliza normalmente las dos Preguntas mínimas de Reconstrucción sin bonificación automática.

##### Desmontaje reversible

Cuando el objeto puede desmontarse y volver a ensamblarse:

- queda temporalmente Deshabilitado durante el análisis;
- concede **Ventaja a una** Pregunta de Reconstrucción pertinente;
- volver a montarlo requiere como referencia 25% de su tiempo base, mínimo 1 h.

##### Análisis destructivo

Cuando se secciona, consume o destruye una parte relevante:

- la muestra queda Arruinada, Destruida o pierde el componente según corresponda;
- concede **Ventaja a hasta dos Preguntas diferentes** de Reconstrucción cuando el acceso interno realmente ayude.

Ventaja no se acumula consigo misma.

La pérdida de la muestra no garantiza éxito.

#### Tecnología desconocida y Fundadores

Una muestra de los Fundadores no recibe un Plano reproducible sólo porque sea desmontada.

La investigación puede producir:

- función identificada;
- materiales reconocidos;
- principio parcialmente comprendido;
- condición nueva de Viabilidad;
- Perfil limitado;
- o conclusión de que el principio sigue fuera de capacidad actual.

Si una pieza depende de una premisa tecnológica no comprendida, la Viabilidad puede seguir siendo **Posible con condiciones** o **Actualmente imposible**.

CRAFT-10 no convierte «tecnología Fundadora» en un +X genérico.

#### Nuevos materiales de criatura

Para convertir una parte de criatura en **Perfil de Material** deben investigarse al menos:

- conservación/preparación;
- propiedad persistente después del procesado;
- cobertura necesaria;
- compatibilidades;
- límites.

El Perfil sólo conserva propiedades demostradas después de la preparación. No hereda automáticamente poderes de la criatura.

#### Nuevas Fórmulas alquímicas

Una Fórmula nueva utiliza Alquimia como Principal.

La investigación debe fijar:

- Grado;
- Preparación;
- Componentes;
- Herramientas;
- Vía;
- Activación;
- Duración;
- Saturación;
- Efecto;
- Preservación.

Estabilizar una Fórmula produce el documento reproducible, pero **no elimina los costes de desarrollo personal**.

Si el sistema exige PD para conocer esa Fórmula, un personaje debe pagar esos PD normalmente antes de tratarla como conocimiento propio rutinario.

Poseer el documento no convierte automáticamente la Fórmula en una capacidad personal gratuita.

#### Nuevas Improntas y Encantamientos

Un nuevo Patrón Rúnico usa normalmente Ritualismo como Principal y Arcana como Auxiliar.

Un nuevo Encantamiento usa CRAFT-08 y debe declarar:

- Grado;
- Sintonización;
- RE/PE cuando corresponda;
- activación;
- apilamiento;
- coste;
- soporte;
- límites.

CRAFT-10 no permite que un Encantamiento:

- ignore Sintonización porque «es experimental»;
- convierta RE en Maná;
- comprima automáticamente un Ritual en Acción;
- vincule un Hechizo Legendario mediante la receta estándar;
- cree varias Acciones/Reacciones.

Una excepción sólo existe si la Viabilidad del nuevo Perfil la autoriza expresamente como regla nueva.

#### Investigación de hechizos

CRAFT-10 puede utilizarse para desarrollar una **propuesta completa de hechizo o Ritual** cuando la campaña permita creación mágica.

Debe fijar como mínimo:

- Disciplina/Fuente;
- Método;
- Grado;
- coste de Maná;
- objetivo/área;
- alcance;
- duración;
- resistencia;
- efecto;
- límites;
- PD de aprendizaje conforme al sistema.

Completar la investigación **no otorga el hechizo gratis**.

El personaje debe adquirirlo mediante el coste normal de desarrollo que corresponda.

Un efecto que contradiga una prohibición canónica —por ejemplo Resurrección estándar actualmente— permanece Actualmente imposible hasta que el canon cambie.

#### Investigación y PD/PR

CRAFT-10 no convierte:

- dinero en PD;
- materiales en PD;
- una Hazaña en una Técnica;
- una muestra en una Especialización;
- un Plano en un Hechizo conocido;
- un Proyecto en PR.

Si el resultado pertenece a una categoría de desarrollo personal, conserva su coste normal.

#### Copia, propiedad y mercado de conocimiento

Un Plano/Fórmula/Patrón estable es **información**, no materia equivalente al valor del producto.

Puede copiarse, robarse, cifrarse, protegerse, venderse o licenciarse según el mundo.

No utiliza automáticamente:

- 25% de venta rápida;
- 50% de venta directa;
- el VR del objeto fabricado.

No existe un comprador infinito de copias.

Su precio depende de:

- secreto;
- demanda;
- exclusividad;
- legalidad;
- dificultad de acceso;
- monopolio;
- utilidad;
- negociación.

Copiar un documento no crea automáticamente más valor económico, de la misma forma que copiar un Plano no crea los objetos que describe.

Gremios, academias, estados y talleres pueden proteger legal o físicamente sus diseños.

#### Mercado del nuevo producto

Estabilizar un diseño **no fija automáticamente su precio ni Disponibilidad comercial**.

Antes de incorporarlo a un catálogo de mercado debe ratificarse:

- VR;
- Disponibilidad;
- Unidad Comercial si corresponde;
- licencias/restricciones;
- componentes especiales.

El CMP sirve para desarrollo y fabricación, no para declarar unilateralmente cuánto pagará el mercado.

Un objeto puede ser perfectamente fabricable y no tener compradores disponibles.

#### Ejemplo — reconstruir una pistola repetidora

Objetivo: recuperar el Plano estable de una pistola repetidora existente.

- Perfil ya canónico.
- Complejidad: Magistral.
- Clase: Reconstrucción.
- Principal: Ingeniería · Armamento.
- Preguntas mínimas: 2.
- DF de cada Pregunta: 16.
- una muestra desmontada de forma reversible puede dar Ventaja a una de ellas.
- CMP estable: 17 o 5 p.
- TBP estable: 8 Jornadas.
- Prototipo: 125% CMP y 12 Jornadas; prueba DF 18.
- Validación: 1 condición relevante.
- Réplica: CMP normal, 8 Jornadas, prueba DF 16.
- sólo entonces se obtiene un Plano estable reproducible.

Conseguir una pistola no entrega automáticamente el Plano.

#### Ejemplo — Perfil de Material de criatura

El grupo obtiene escamas de una criatura que resistió fuego.

Concepto:

> determinar si esa resistencia persiste después de preparar las escamas como material de armadura.

No se asume que sí.

La investigación puede concluir:

- que la propiedad desaparece al procesar;
- que requiere un tratamiento concreto;
- que sólo reduce una categoría específica de daño;
- o que no existe un beneficio persistente.

Sólo un Perfil de Material estabilizado entra después en CRAFT-05.

#### Ejemplo — híbrido dispositivo/Encantamiento

Concepto:

> un mecanismo cuyo disparador técnico pueda activar un Encantamiento pagando Energía y RE en una única activación.

CRAFT-09 no lo concede automáticamente.

Se clasifica al menos como **Combinación** y debe especificar:

- qué recurso paga cada componente;
- Acción/Reacción;
- Consumo/Caudal;
- gasto de RE;
- orden de resolución;
- apilamiento;
- fallo de una mitad;
- estado.

La investigación puede producir un Perfil híbrido válido sin crear conversión Energía -> RE.

#### Salvaguardas de CRAFT-10

- no existen puntos universales de investigación;
- cada tirada responde una Pregunta distinta;
- un fallo bloquea el método, no invita a repetir;
- Viabilidad se decide antes de tirar;
- Actualmente imposible no se atraviesa con Hazaña;
- Clase de novedad mide incertidumbre, no potencia;
- Investigación no autoriza superar límites sin un Perfil que lo diga expresamente;
- Prototipo funcional no equivale a Plano estable;
- fabricar más prototipos no convierte por cantidad el procedimiento en rutinario;
- Hazaña de Prototipo no estabiliza;
- Validación no se omite por margen;
- Réplica es obligatoria para estabilizar;
- Falla de Diseño exige Pregunta Correctiva;
- una muestra no concede ingeniería inversa automática;
- destruir una muestra da información, no éxito garantizado;
- tecnología Fundadora no crea un +X;
- partes de criatura no heredan poderes;
- investigación no elimina PD/PR;
- estabilizar un producto no crea mercado;
- copiar Planos no imprime dinero;
- un diseño nuevo sigue pagando materiales, tiempo, herramientas e instalación cuando se fabrica.

#### Límites de CRAFT-10

CRAFT-10 no define por sí solo:

- el catálogo futuro de todos los inventos posibles;
- precio comercial automático de una tecnología nueva;
- disponibilidad automática;
- tecnología Fundadora todavía desconocida;
- excepciones gratuitas a los límites de CRAFT anteriores;
- artefactos únicos sin Perfil;
- campañas completas de industria, patentes o producción masiva.

Esos elementos se resuelven mediante Perfiles concretos, mundo y catálogo.

CRAFT-11 se desarrolla a continuación.

### CRAFT-11 — Catálogo de proyectos y recetas de referencia

> **VIGENTE · CERRADO.** CRAFT-11 no añade un motor nuevo. Reúne proyectos listos para usar que aplican CRAFT-01 a CRAFT-10 y completa las ocho Fórmulas alquímicas vigentes con precio y receta de preparación. El catálogo sirve como patrón para crear nuevas entradas sin recalcular cada subsistema durante la partida.

#### Cómo leer el catálogo

Salvo que una ficha diga otra cosa:

- **Materiales** significa desembolso físico de fabricación, ya con los redondeos de CRAFT-02 a CRAFT-10.
- no incluye salario del propio PJ;
- no incluye alquiler de instalación, licencias, transporte, compra del Plano/Patrón ni acceso ilegal/social;
- los tiempos indicados suponen un responsable principal y etapas secuenciales; colaboradores pueden aplicar CRAFT-01 cuando las etapas sean paralelizables;
- poseer componentes como botín o Lotes de Material puede reducir el desembolso mediante VI;
- una receta conocida con todos sus requisitos se completa sin tirada;
- las pruebas sólo aparecen donde la propia ficha o CRAFT-01/10 mantienen incertidumbre;
- un resultado compuesto conserva todas las salvaguardas de apilamiento de sus subsistemas.

El catálogo base de CRAFT-03 ya contiene las recetas ordinarias de armas, armaduras, escudos, munición, herramientas y Kits. CRAFT-11 se concentra en **combinaciones, servicios y proyectos que atraviesan varios CRAFT**.

---

## A. Equipo compuesto

### REF-EQ-01 — Espada de Guardia de Kharum

**Resultado:** Espada larga Superior de Acero de Kharum con **Equilibrada para Parada**.

- VR Común: 2 o.
- Calidad Superior: CM 1 o 5 p; VRQ 3 o.
- Acero de Kharum Dominante: SM 5 p; valor añadido 1 o.
- **Materiales totales:** **2 o**.
- **Valor de Referencia Total:** **4 o**.
- **Tiempo:** **3 Jornadas**.
- **Principal:** Artesanía Maestra · Forja y metal.
- **Instalación:** Especializada.
- **Resultado mecánico:** Daño 5, Pen 0, FUE 1, Tenacidad de Kharum; Parada con esa arma concede +3 Defensa en lugar de +2.

La Tenacidad no aumenta Daño/Pen y Equilibrada no concede una Reacción adicional.

### REF-EQ-02 — Espada Rúnica de Guardia de Kharum

Parte de REF-EQ-01 y añade **CRu 1 + Filo Arcano I inscrito**.

- soporte previo: 2 o de materiales y 3 Jornadas;
- Matriz CRu 1: 5 p; 4 h;
- Filo Arcano I: 1 o; 4 h;
- **Materiales totales desde cero:** **3 o 5 p**;
- **Tiempo total:** **4 Jornadas**;
- **VR final:** **7 o**.
- **Requisitos adicionales:** Ritualismo Experto; Arcana Entrenada · Artefactos mágicos; Patrón Rúnico estable.
- **Activación:** Vinculada, 2 Maná.
- **Efecto:** +1 Daño en ese ataque y cuenta como mágicamente potenciado cuando corresponda.

Filo Arcano no se suma con Golpe optimizado u otro +1 Daño equivalente.

### REF-EQ-03 — Malla Superior Silenciosa

- VR Común: 10 o.
- **Materiales:** **7 o 5 p**.
- **VRQ:** **15 o**.
- **Tiempo:** **7,5 Jornadas**.
- **Principal:** Artesanía Experta · Forja y metal.
- **Instalación:** Profesional.
- **CapM:** 1, ocupada por **Silenciosa**.
- **Resultado:** Protección 3, FUE 1; la malla no causa por sí sola Desventaja a Sigilo por ruido ordinario.

### REF-EQ-04 — Placas Excepcionales de Kharum Aligeradas

- VR Común: 40 o.
- Calidad Excepcional: CM 50 o; VRQ 100 o.
- Acero de Kharum Dominante: SM 10 o; valor añadido 20 o.
- **Materiales totales:** **60 o**.
- **VRT:** **120 o**.
- **Tiempo:** **20 Jornadas**.
- **Principal:** Artesanía Gran Maestra · Forja y metal.
- **Instalación:** Excepcional.
- **CapM 2:** ocupada por **Aligerada**.
- **Resultado:** Protección 5, FUE mínima 2, Tenacidad de Kharum.

No obtiene Protección 6.

### REF-EQ-05 — Placas Excepcionales con Doble Engarce

Placas Excepcionales ordinarias con sus dos puntos de CRu preparados como Engarces I.

- Calidad Excepcional: 50 o de materiales; 20 Jornadas.
- dos Matrices CRu: 8 o cada una.
- **Materiales totales:** **66 o**.
- **Tiempo total:** **25 Jornadas**.
- **VR final antes de Piedras:** **132 o**.
- **Principal físico:** Artesanía Gran Maestra · Forja y metal.
- **Auxiliar:** Arcana Experta · Artefactos mágicos.
- **Instalación:** Excepcional.
- **Resultado:** CRu 2 preparada como dos Engarces; no incluye Piedras de Impronta.

Las Piedras se adquieren/fabrican por separado.

### REF-EQ-06 — Arco Largo de Madera Tratada de Erelia

- VR Común: 2 o.
- CM ordinario: 1 o.
- SM Especializado Dominante: 5 p.
- **Materiales:** **1 o 5 p**.
- **VRT:** **3 o**.
- **Tiempo:** **2 Jornadas**.
- **Principal:** Artesanía Entrenada · Carpintería.
- **Instalación:** Adecuada.
- **Resultado:** perfil normal de Arco largo —Daño 5, Potencia 3, 2 manos— más **Estabilidad ambiental**.

### REF-EQ-07 — Catalejo de Vidrio del Desierto

- VR Común: 1 o.
- CM ordinario: 5 p.
- SM Raro de Componente: 1 p 3 c.
- **Materiales:** **6 p 3 c**.
- **VRT:** **1 o 2 p 6 c**.
- **Tiempo:** **3,75 Jornadas**.
- **Complejidad efectiva:** Magistral.
- **Principal:** Artesanía Maestra · Vidrio y cristal.
- **Auxiliar:** Ingeniería Aprendiz.
- **Instalación:** Especializada.
- **Resultado:** catalejo normal más Refracción liminal: Ventaja a PER + Arcana para analizar distorsiones o manifestaciones mágicas visualmente observables a través del instrumento.

### REF-EQ-08 — Kit de Alquimia Superior preparado para campo

- VR Común: 2 o.
- **Materiales:** **1 o 5 p**.
- **VRQ:** **3 o**.
- **Tiempo:** **3 Jornadas**.
- **Principal:** Artesanía Experta · Vidrio y cristal.
- **Auxiliar:** Alquimia Aprendiz.
- **Instalación:** Profesional.
- **CapM 1:** **Preparada para campo**, registrada para la preparación estable de **Bálsamo Restaurador**.
- **Resultado:** cuando esa Fórmula pueda prepararse físicamente en una instalación Improvisada, el Kit ignora sólo la Desventaja causada por estar un grado por debajo de su instalación Adecuada normal.

No sustituye Alquimia Entrenada · Medicinales, el conocimiento de la Fórmula, sus ingredientes ni cualquier requisito esencial.

---

## B. Fórmulas alquímicas listas para preparar

Las siguientes entradas completan el catálogo vigente de Alquimia. Los componentes se expresan deliberadamente como **categorías ficticias de reactivos**, no como formulaciones reales.

Salvo indicación contraria:

- una dosis es la Unidad Comercial;
- el CM es 50% del precio;
- requiere Kit de Alquimia o instrumental equivalente;
- la preparación estable no tira;
- una dosis sellada permanece utilizable mientras el envase y sus condiciones de conservación sigan intactos; CRAFT-11 no introduce caducidad calendaria universal.

| Código | Fórmula | Precio | CM | Proyecto | Tiempo |
|---|---|---:|---:|---|---:|
| REF-ALQ-01 | Bálsamo Restaurador | 5 p | 2 p 5 c | Estándar · Alquimia Entrenada · Medicinales · Adecuada | 2 h |
| REF-ALQ-02 | Poción Restauradora | 8 p | 4 p | Estándar · Alquimia Entrenada · Medicinales · Adecuada | 2 h |
| REF-ALQ-03 | Poción de Recuperación Arcana | 1 o 5 p | 7 p 5 c | Complejo · Alquimia Experta · Reactivos · Profesional | 4 h |
| REF-ALQ-04 | Tónico de Vigor | 8 p | 4 p | Complejo · Alquimia Experta · Potenciadores · Profesional | 4 h |
| REF-ALQ-05 | Supresor del Dolor | 8 p | 4 p | Complejo · Alquimia Experta · Medicinales · Profesional | 4 h |
| REF-ALQ-06 | Neutralizante Común | 1 o | 5 p | Complejo · Alquimia Experta · Toxinas · Profesional | 4 h |
| REF-ALQ-07 | Toxina Debilitante | 1 o 5 p | 7 p 5 c | Complejo · Alquimia Experta · Toxinas · Profesional | 1 Jornada |
| REF-ALQ-08 | Bomba Incendiaria | 3 o | 1 o 5 p | Complejo · Alquimia Experta · Explosivos · Profesional | 1 Jornada |

### REF-ALQ-01 — Bálsamo Restaurador

- **Grado:** Común; conocimiento 1 PD.
- **Componentes:** reactivos restaurativos comunes y base tópica estable.
- **Vía:** tópica.
- **Activación:** 1 minuto de aplicación; no es una Acción de combate por defecto.
- **Saturación:** Restaurativa.
- **Efecto:** +4 Vida; no repara Trauma ni Herida Grave.

### REF-ALQ-02 — Poción Restauradora

- **Grado:** Común; 1 PD.
- **Vía:** oral.
- **Activación:** Acción.
- **Saturación:** Restaurativa.
- **Efecto:** +4 Vida hasta máximo y límites de lesión.

Bálsamo y Poción comparten Saturación Restaurativa.

### REF-ALQ-03 — Poción de Recuperación Arcana

- **Grado:** Refinada; 1 PD.
- **Componentes:** reactivos arcanos estabilizados.
- **Vía:** oral.
- **Activación:** Acción.
- **Saturación:** Arcana.
- **Efecto:** +3 Maná hasta máximo; no elimina Fatiga ni Sobrecarga.

### REF-ALQ-04 — Tónico de Vigor

- **Grado:** Refinada; 1 PD.
- **Vía:** oral.
- **Activación:** 1 minuto.
- **Saturación:** Potenciador.
- **Duración:** hasta aplicarse a una prueba compatible de VIG por esfuerzo prolongado o hasta terminar la Escena.
- **Efecto:** Ventaja en esa prueba.

### REF-ALQ-05 — Supresor del Dolor

- **Grado:** Refinada; 1 PD.
- **Vía:** oral.
- **Activación:** Acción.
- **Saturación:** Analgésica.
- **Duración:** Escena.
- **Efecto:** ignora una Desventaja causada por dolor compatible; no repara la lesión ni elimina Sangrado.

### REF-ALQ-06 — Neutralizante Común

- **Grado:** Refinada; 1 PD.
- **Vía:** se define al preparar la dosis para una familia de toxina compatible.
- **Activación:** Acción cuando la vía preparada puede administrarse en combate.
- **Duración:** hasta la siguiente resistencia compatible durante la Escena.
- **Efecto:** concede una nueva resistencia con Ventaja contra esa toxina.
- **Saturación:** **Antitóxica**.

No es un antídoto universal. Tras beneficiarse de una dosis, otra aplicación de Neutralizante de la misma familia no concede una nueva resistencia hasta un Respiro efectivo.

### REF-ALQ-07 — Toxina Debilitante

- **Grado:** Compleja; 2 PD.
- **Vía:** Sangre.
- **Latencia:** inmediata tras una aplicación válida.
- **Resistencia:** VIG DF 14.
- **Fallo:** Desventaja en acciones físicas dependientes de fuerza muscular.
- **Duración:** Escena.
- **Saturación:** —.
- la primera aplicación válida consume la dosis.

### REF-ALQ-08 — Bomba Incendiaria

- **Grado:** Compleja; 2 PD.
- **Componentes:** reactivos incendiarios ficticios estabilizados y carcasa compatible.
- **Activación:** colocación/lanzamiento conforme a las reglas de explosivos.
- **Efecto:** área pequeña, Daño 6, Pen 1.
- **Duración:** resolución instantánea del efecto mecánico.
- **Saturación:** —.
- una activación consume la Bomba.

No existe una receta real de explosivos detrás de esta entrada; sus componentes son categorías de ficción del sistema.

---

## C. Runas, Piedras y objetos mágicos

### REF-RUN-01 — Piedra de Lumen I

- **Piedra I:** VR 4 o; CM 2 o.
- **Tiempo:** 1 Jornada.
- **Principal:** Ritualismo Experto.
- **Auxiliares:** Artesanía Experta · Vidrio y cristal; Arcana Entrenada · Artefactos mágicos.
- **Instalación:** Profesional.
- **Requisito:** Patrón Rúnico estable de Lumen I.
- **Uso:** ocupa CRu 1; Acción, 1 Maná; luz durante una Escena.

### REF-RUN-02 — Daga Excepcional de Filo Penetrante II

Daga Excepcional con **Retención segura + Mantenible**, CRu 2 y Filo Penetrante II inscrito.

- VR Común: 6 p.
- Calidad Excepcional: 7 p 5 c de materiales; VRQ 1 o 5 p; 8 h.
- dos Matrices CRu: 1 o; 4 h.
- Filo Penetrante II: 2 o; 1 Jornada.
- **Materiales totales:** **3 o 7 p 5 c**.
- **Tiempo total:** **2,5 Jornadas**.
- **VR final:** **7 o 5 p**.
- **Principal físico:** Artesanía Maestra · Forja y metal.
- **Rúnico:** Ritualismo Maestro; Arcana Experta · Artefactos mágicos.
- **Instalación:** Especializada.
- **Activación:** Vinculada, 3 Maná.
- **Resultado del ataque:** Daño base 3 y Pen 0; al activar, +1 Daño y Pen +1, sujeto a apilamiento normal.

### REF-MAG-01 — Broche de Barrera

Soporte Dedicado I + Encantamiento I de Barrera Cinética.

- soporte: CM 1 o; 1 Jornada.
- CE I: 5 o; 3 Jornadas.
- **Materiales totales:** **6 o**.
- **Tiempo total:** **4 Jornadas**.
- **VR final:** **12 o**.
- **Sintonización:** 1.
- **RE/PE:** 6 / +4.
- **Uso:** Reacción, 3 RE; +2 Defensa según Barrera Cinética; hasta 2 usos con reserva completa.
- **Principal del Encantamiento:** Ritualismo Maestro.
- **Auxiliares:** Arcana Experta · Artefactos mágicos; Artesanía Experta.
- **Instalación:** Especializada.

### REF-MAG-02 — Brazal de Aguja Gélida

Soporte Dedicado II + Encantamiento II.

- soporte: CM 2 o 5 p; 3 Jornadas.
- CE II: 15 o; 8 Jornadas.
- **Materiales:** **17 o 5 p**.
- **Tiempo:** **11 Jornadas**.
- **VR final:** **35 o**.
- **Sintonización:** 2.
- **RE/PE:** 10 / +6.
- **Uso:** 5 RE; ataque 2d10 +6; Daño 5, Pen 1, Movimiento -2 conforme al hechizo.
- **Requisitos:** Ritualismo Gran Maestro; Arcana Maestra · Artefactos mágicos; Artesanía Maestra; instalación Excepcional.

### REF-MAG-03 — Capa de Invisibilidad

Soporte Dedicado III + Encantamiento III de Invisibilidad.

- soporte: CM 5 o; 5 Jornadas.
- CE III: 40 o; 20 Jornadas; incluye un componente arcano Raro/Excepcional compatible.
- **Materiales:** **45 o**.
- **Tiempo:** **25 Jornadas**.
- **VR final:** **90 o**.
- **Sintonización:** 3.
- **RE/PE:** 14 / +8.
- **Uso:** 9 RE; Sostenida, máximo una Escena; ocupa Sostenimiento normal; una acción ofensiva termina el efecto conforme al hechizo.
- **Requisitos:** Ritualismo Gran Maestro; Arcana Maestra · Artefactos mágicos; Artesanía Gran Maestra · Cuero y textiles; instalación Excepcional.

---

## D. Trampas y construcciones

### REF-TRP-01 — Alarma de perímetro Disimulada

- Armazón Simple: CM 1 p.
- Ocultación Disimulada: sin material adicional.
- **Materiales:** **1 p**.
- **Tiempo:** **40 min**.
- **Principal:** Latrocinio Aprendiz o Supervivencia Aprendiz.
- **DF Detección:** 10.
- **Efecto:** señal física perceptible; no ataca.

### REF-TRP-02 — Cable de derribo Oculto

- Armazón Estándar: CM 5 p.
- Ocultación Oculta: +1 p.
- **Materiales:** **6 p**.
- **Tiempo:** **2 h 30 min**.
- **Principal:** Latrocinio Entrenado · Trampas y seguridad física.
- **Instalación:** Adecuada.
- **Ataque:** +4 contra Defensa de Maniobra.
- **Éxito:** Derribado.
- **DF Detección:** 12.
- **DF Mecanismo:** 12.

### REF-TRP-03 — Golpe oculto con Lanza

Incluye fabricar una Lanza Común y montar un Armazón Estándar con Ocultación Oculta.

- Lanza: CM 2 p 5 c; 4 h.
- Armazón: CM 5 p; 2 h.
- Ocultación: +1 p; +30 min.
- **Materiales totales:** **8 p 5 c**.
- **Tiempo total:** **6 h 30 min**.
- **Ataque:** +4 contra Defensa.
- **Impacto:** Daño 5, Pen 0; no suma FUE del constructor.
- **DF Detección:** 12.
- **Uso:** un disparo; después requiere rearme.

### REF-TRP-04 — Pozo oculto de 4 espacios

En suelo excavable y estable.

- excavación: 3 Jornadas;
- Armazón Estándar para soporte de colapso: CM 5 p; 2 h;
- Ocultación Oculta: +1 p; +30 min.
- **Materiales preparados:** **6 p**, además del terreno disponible.
- **Tiempo total:** **3 Jornadas + 2 h 30 min**.
- **DF Detección:** 12.
- **Caída:** 4 espacios; Daño 6 antes de mitigaciones compatibles.

Suelo difícil, roca, agua o entibado modifican el Proyecto.

### REF-CON-01 — Barricada de cobertura

- **Materiales:** **5 p**.
- **Tiempo:** **2 h**.
- **Principal:** Artesanía Aprendiz o Supervivencia Aprendiz con materiales de campaña.
- **Resultado:** aproximadamente 1 espacio de frente; +2 Defensa cuando la geometría realmente proporciona cobertura parcial.

### REF-CON-02 — Pasarela/Puente corto

- **Materiales:** **1 o**.
- **Tiempo:** **4 h**.
- **Principal:** Artesanía Entrenada · Carpintería o Forja y metal.
- **Auxiliar:** Ingeniería Aprendiz cuando el soporte no sea trivial.
- **Resultado:** cruza un hueco estable de hasta aproximadamente 2 espacios bajo carga razonable.

---

## E. Ingeniería y dispositivos

### REF-ING-01 — Acumulador estándar

- **VR:** 5 o.
- **CM:** **2 o 5 p**.
- **Tiempo:** **2 Jornadas**.
- **Principal:** Ingeniería Experta · Acumuladores arcanos.
- **Instalación:** Profesional.
- **Resultado:** 8 E / C3 / Est2.

### REF-ING-02 — Estación de carga de taller

- **VR:** 10 o.
- **CM:** **5 o**.
- **Tiempo:** **3 Jornadas**.
- **Principal:** Ingeniería Experta · Acumuladores arcanos.
- **Auxiliar:** Artesanía Entrenada.
- **Instalación:** Profesional.
- **Resultado:** Caudal de Carga 4; requiere fuente energética real.

### REF-ING-03 — Escudo de campo completo

Escudo de campo + Acumulador estándar.

- dispositivo: CM 6 o; 3 Jornadas.
- acumulador: CM 2 o 5 p; 2 Jornadas.
- **Materiales:** **8 o 5 p**.
- **Tiempo secuencial:** **5 Jornadas**.
- **Valor de hardware:** **17 o**.
- **Uso:** Reacción; 2 E/C2; +2 Defensa.
- **Autonomía:** hasta 4 activaciones con acumulador lleno.
- **Requisitos:** Ingeniería Experta · Acumuladores arcanos; Arcana Entrenada; instalación Profesional.

### REF-ING-04 — Autómata auxiliar de taller

Autómata auxiliar + Acumulador estándar.

- autómata: CM 10 o; 6 Jornadas.
- acumulador: CM 2 o 5 p; 2 Jornadas.
- **Materiales:** **12 o 5 p**.
- **Tiempo:** **8 Jornadas**.
- **Valor de hardware:** **25 o**.
- **Autonomía:** hasta 8 h de trabajo con acumulador lleno.
- **Principal:** Ingeniería Maestra · Autómatas.
- **Auxiliar:** Artesanía Experta.
- **Instalación:** Especializada.
- **Resultado:** Ayuda técnica o Ayuda de trabajo en su función registrada; no sustituye prerrequisitos ni posee turno propio.

### REF-ING-05 — Banco portátil de dos Celdas menores

Incluye Banco simple + dos Celdas menores fabricadas.

- dos Celdas: 2 o de materiales; 2 Jornadas.
- Banco simple: 2 o; 1 Jornada.
- **Materiales:** **4 o**.
- **Tiempo secuencial:** **3 Jornadas**.
- **Valor de hardware:** **8 o**.
- **Resultado:** hasta 8 E totales, Caudal 2.

No se convierte en Caudal 4.

### REF-ING-06 — Acoplador con dos acumuladores estándar

- dos acumuladores estándar: 5 o de materiales; 4 Jornadas.
- Acoplador: 5 o; 4 Jornadas.
- **Materiales:** **10 o**.
- **Tiempo secuencial:** **8 Jornadas**.
- **Valor de hardware:** **20 o**.
- **Principal:** Ingeniería Maestra · Acumuladores arcanos.
- **Instalación:** Especializada.
- **Resultado:** hasta 16 E; Caudal efectivo 4.
- una activación que use C4 paga además +1 E.
- no puede alimentar otro Acoplador para repetir el aumento.

### REF-ING-07 — Rifle perforador de precisión

Rifle temprano de Aleación de precisión de Kharum + Cámara de penetración + Acumulador estándar.

**Host:**
- CM ordinario 9 o.
- SM Raro Mayor 4 o 5 p.
- materiales del rifle: 13 o 5 p.
- VRT del rifle: 27 o.
- tiempo: 7,5 Jornadas.
- Complejidad efectiva Magistral; Artesanía Maestra · Forja y metal; instalación Especializada.

**Módulo:**
- Cámara de penetración: CM 5 o; 3 Jornadas.

**Fuente:**
- Acumulador estándar: CM 2 o 5 p; 2 Jornadas.

**Conjunto:**
- **Materiales:** **21 o**.
- **Tiempo secuencial:** **12,5 Jornadas**.
- **Valor de hardware:** **42 o**.
- **Perfil base:** Daño 7, Pen 3, Recarga 2.
- **Cámara activa:** 2 E/C2; Pen 5 para ese disparo.
- **Autonomía:** 4 activaciones con acumulador lleno.

La Aleación no da Pen adicional; abarata futuras modificaciones compatibles conforme a CRAFT-05.

---

## F. Reparación, mejora y servicio

### REF-SRV-01 — Reparar Placas Comunes Dañadas

- VR: 40 o.
- **Materiales:** 10% = **4 o**.
- **Tiempo:** 25% de 10 Jornadas = **2,5 Jornadas**.
- **Principal:** Artesanía Experta · Forja y metal.
- **Instalación:** Profesional.
- **Resultado:** Operativas; Protección y Calidad originales restauradas.

### REF-SRV-02 — Reparar Acumulador estándar Dañado

- VR: 5 o.
- **Materiales:** **5 p**.
- **Tiempo:** **4 h**.
- **Principal:** Ingeniería Experta · Acumuladores arcanos.
- **Instalación:** Profesional.
- **Resultado:** Operativo.
- la reparación no rellena Energía.

### REF-SRV-03 — Espada larga Común a Superior Equilibrada

Retrabajo de Calidad ya existente.

- **Materiales:** 25% VR = **5 p**.
- **Tiempo:** 50% del tiempo base = **1 Jornada**.
- **Objetivo:** Superior, CapM 1 ocupada por Equilibrada para Parada.
- **Requisito:** Artesanía Maestra · Forja y metal; instalación Especializada.
- **Valor final:** 3 o.
- **Resultado:** perfil normal de Espada larga; Parada +3 con esa arma.

### REF-SRV-04 — Añadir CRu 1 + Filo Arcano I a una Espada larga Superior

El soporte ya existe y no tiene Matriz.

- Matriz: 5 p; 4 h.
- Runa: 1 o; 4 h.
- **Materiales:** **1 o 5 p**.
- **Tiempo:** **1 Jornada**.
- **Valor añadido:** 3 o.
- **Requisitos:** Artesanía Maestra · Forja y metal; Arcana Entrenada · Artefactos mágicos; Ritualismo Experto; Patrón estable; instalación Especializada.
- **Resultado:** CRu 1 ocupada por Filo Arcano I.

### REF-SRV-05 — Recarga comercial de Acumulador estándar vacío

Con Estación de carga suficiente y Energía disponible:

- Energía requerida: 8 E.
- **Precio de servicio de referencia:** **8 c**.
- **Tiempo mínimo:** **40 min**.
- no altera VR del acumulador;
- no repara estados;
- no crea Energía sin una fuente real.

---

## G. Investigación e ingeniería inversa

### REF-INV-01 — Reconstruir el Plano de una Pistola repetidora

Parte de una muestra existente y usa CRAFT-10 Reconstrucción.

- Complejidad: Magistral.
- Principal: Ingeniería · Armamento.
- Preguntas: 2.
- **DF por Pregunta:** 16.
- **Tiempo de Preguntas:** 5 Jornadas cada una.
- desmontaje reversible puede dar Ventaja a una Pregunta.
- CMP estable: 17 o 5 p.
- TBP: 8 Jornadas.

**Prototipo:**
- materiales: **21 o 8 p 8 c**;
- tiempo: **12 Jornadas**;
- prueba: DF 18.

**Validación:**
- 1 condición;
- tiempo: 2 Jornadas;
- ensayo consumptivo, si corresponde: referencia **8 p 8 c**.

**Plano provisional:** 2 Jornadas.

**Réplica:**
- materiales: **17 o 5 p**;
- tiempo: 8 Jornadas;
- prueba: DF 16.

Con éxito de Réplica se obtiene el Plano estable. En una secuencia sin Bloqueos y sin experimentos materiales adicionales en las Preguntas, el trabajo base suma **34 Jornadas**.

### REF-INV-02 — Reconstruir el Patrón de una Piedra de Impronta I

Se parte de una Piedra I identificada cuyo Patrón no se conoce.

- Complejidad: Compleja.
- Clase: Reconstrucción.
- Principal: Ritualismo.
- Auxiliares: Arcana · Artefactos mágicos y Artesanía · Vidrio y cristal.
- Preguntas: 2.
- **DF por Pregunta:** 14.
- **Tiempo:** 3 Jornadas por Pregunta.
- CMP de Piedra estable: 2 o.
- TBP: 1 Jornada.

**Prototipo:**
- materiales: **2 o 5 p**;
- tiempo: 1,5 Jornadas;
- prueba: DF 16.

**Validación:**
- 1 condición;
- tiempo: 2 h;
- si es consumptiva: referencia mínima **1 p**.

**Plano provisional:** 2 h.

**Réplica:**
- materiales: **2 o**;
- tiempo: 1 Jornada;
- prueba: DF 14.

Una secuencia sin Bloqueos requiere aproximadamente **9 Jornadas** de trabajo efectivo, más el coste de cualquier experimento material realizado durante las Preguntas. El resultado estable es el **Patrón de esa Impronta concreta**, no un patrón universal de todas las Piedras.

---

## Índice rápido del catálogo

CRAFT-11 añade **41 fichas de referencia** distribuidas así:

- 8 proyectos de equipo compuesto;
- 8 Fórmulas alquímicas completas;
- 5 proyectos rúnicos/mágicos;
- 6 trampas y construcciones;
- 7 dispositivos o conjuntos de Ingeniería;
- 5 servicios de reparación/mejora/recarga;
- 2 proyectos de investigación.

Junto con las recetas ordinarias de CRAFT-03, estas fichas cubren el recorrido habitual de un PJ artesano desde equipo básico hasta manufactura Excepcional, magia integrada, dispositivos e investigación.

#### Uso como plantilla

Al añadir una nueva receta al catálogo debe copiarse la entrada más cercana y cambiar **sólo** las variables que el nuevo Perfil justifique.

No se debe inferir:

- +Daño porque el objeto sea más caro;
- más CapM/CRu por tener más componentes;
- más Caudal por usar varias fuentes;
- menor Sintonización por miniaturización;
- propiedades monstruosas por procedencia;
- automatización por añadir un disparador;
- producción rutinaria mientras el diseño siga Experimental.

#### Salvaguardas de CRAFT-11

- ninguna ficha reemplaza las reglas de su CRAFT de origen;
- los totales no incluyen costes que la ficha declare externos;
- varios componentes no se cuentan dos veces;
- las recetas compuestas respetan apilamiento;
- una receta avanzada no modifica Disponibilidad por sí sola;
- comprar/fabricar un objeto no concede el Plano si éste es requisito;
- Fórmulas conocidas siguen exigiendo PD cuando corresponda;
- el catálogo no convierte Cristales de Resonancia en recursos de crafting;
- un precio de catálogo no garantiza stock, permiso o comprador;
- las fichas de Investigación no eliminan Bloqueos, Validaciones o Réplica.

#### Resultado de cierre

CRAFT-11 convierte CRAFT-01 a CRAFT-10 en un conjunto directamente utilizable en mesa y elimina la necesidad de reconstruir manualmente los cálculos más frecuentes.

El siguiente cierre es **CRAFT-12 — Auditoría integral del sistema de fabricación**.


## 19. Economía, disponibilidad y equipo

Las reglas de **uso práctico** de armas, armaduras, escudos, munición, Kits, raciones, consumibles y dispositivos están en el capítulo **9. Armas, armaduras y escudos**. Este capítulo define principalmente precio, Disponibilidad, mercado y adquisición.

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

Otros: Gancho de escalada 3 p; Palanca 2 p; Pico o pala 2 p; Caja pequeña asegurada 5 p; Catalejo 1 o; Estuche impermeable de documentos/mapas 5 p; Provisiones personales 7 días (7 raciones) 2 p; Combustible de iluminación personal 5 noches 2 p; Repuesto médico 5 usos 5 p; materiales de escritura 2 p.

Las ocho Fórmulas alquímicas vigentes poseen precio monetario ratificado en **CRAFT-11 — Catálogo de proyectos y recetas de referencia**. Otros bienes cuyo único precio histórico estuviera expresado en Coronas permanecen **sin precio monetario establecido** hasta una ratificación específica; no se convierte ese precio legado por inferencia.

### Compra, venta y fabricación

La **venta rápida** usa exactamente **25% del Valor Aplicable (VA)** definido por CRAFT-02 y redondea hacia abajo al cobre. Una **venta directa** no posee una tasa universal; alrededor de **50% del VA** es la referencia ordinaria cuando existe comprador.

La economía completa de fabricación se encuentra en el capítulo 18, **CRAFT-02 — Economía de fabricación**. Como referencia universal, una fabricación ordinaria sin receta económica propia consume materiales equivalentes al **50% del Valor de Referencia**, redondeados hacia arriba. Fabricar un objeto produce el objeto, no dinero automático.

Los materiales Especializados, Raros y Excepcionales se resuelven mediante **CRAFT-05 — Materiales especiales**. Su valor, propiedades y disponibilidad no se infieren del precio ordinario del objeto.

Un trabajo realizado para un comprador preacordado es un **Encargo** y remunera materiales, trabajo e infraestructura conforme a CRAFT-02. Producir primero y buscar comprador después utiliza las reglas normales de venta.

La rentabilidad exige costes, tiempo y demanda reales. Dinero compra recursos y servicios disponibles; **PD compra desarrollo personal**.

### Adaptación de equipo — REV-CREA-08-001

Adaptación menor: recargo **25%** del precio base. Adaptación mayor: **50%**. El recargo mínimo es **1 p = 10 c**. Si el porcentaje produce fracción de cobre, el recargo se redondea hacia arriba al cobre entero.

CRAFT-03 aclara que fabricar desde cero para un usuario conocido incluye el ajuste ordinario de talla. El recargo de Adaptación se aplica al modificar equipo terminado o cuando anatomía, Escala o estructura exigen un cambio real fuera del patrón ordinario. Cuando la Adaptación se realiza personalmente como Proyecto, el recargo funciona como VR del servicio y CRAFT-02 determina sus costes.

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

Las reglas de distancia diaria para **viaje a pie, caballo y carreta**, así como terreno, ritmo, marcha forzada y navegación, están en el capítulo 6. Ferrocarriles, dirigibles, embarcaciones y otros transportes de infraestructura usan la velocidad y horario de su ruta o perfil concreto; no heredan automáticamente la tabla de viaje terrestre.

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



## Revisiones documentales de decisiones cerradas

- **REV-CREA-02-001 (documental):** se corrige el Manual Maestro para reflejar la decisión ya cerrada de CREA-02: cada Disciplina cuesta **2 PD**, requiere Canalización Entrenada y el máximo inicial es 3. No cambia la regla; corrige una transcripción posterior de 3 PD.
- **REV-CREA-05-001 (documental):** se corrige el Manual Maestro para reflejar la decisión ya cerrada de CREA-05: **Familiar Mágico es un Rasgo Mayor de 3 PR en creación y 6 PD posteriormente**. No cambia la regla; corrige una transcripción posterior de 2 PR.

- **REV-CREA-11-001 (sincronización post-cierre):** sin reabrir CREA-11, Foundry 1.0.18 corrige tres discrepancias detectadas tras el cierre: la creación inicial exige exactamente **6 aumentos gratuitos de Atributo** con máximo inicial **3**, la adquisición inicial admite como máximo **3 Disciplinas**, y los hechizos de área usan **una sola resolución de lanzamiento** comparada contra todas las Defensas pertinentes. La misma revisión corrige documentación residual de Familiar Mágico, tabla de equipo, máximo inicial de Especializaciones y competencia operativa de Hechizos.

## Modelo de datos de creación en Foundry — CREA-11

Foundry representa las elecciones de personaje mediante documentos estructurados en lugar de campos de texto mecánicos. El **Actor** conserva estado intrínseco: Atributos y Habilidades base, nivel, recursos, moneda, estados y datos narrativos. Las elecciones con identidad propia —Ascendencia, Origen, Trasfondo, Disciplina, Especialización, Técnica, Rasgo, Hechizo y equipo— se representan mediante **Items**.

Una elección puede tener coste, requisitos, procedencia y reglas declarativas. El coste normal del catálogo se mantiene separado de lo que realmente pagó esa instancia: una capacidad concedida por otra fuente puede conservar su coste de referencia sin cobrarlo dos veces. Los requisitos mecánicos se almacenan estructuradamente; el texto explicativo no se interpreta para inventar condiciones.

Los modificadores aportados por Items se preparan de forma reversible: el Item es la fuente y el Actor preparado muestra el resultado. Eliminar o desactivar una fuente retira su contribución sin tener que deshacer escrituras permanentes sobre los valores base. Los efectos temporales o persistentes aplicados a un Actor se representan mediante Items de tipo **Effect**, con fuente y ciclo de vida identificables.

Los **Compendios** son la biblioteca de contenido disponible. Al incorporar una opción al personaje, Foundry valida identidad, cardinalidad, requisitos y presupuesto antes de crear la instancia embebida. Ascendencia, Origen y Trasfondo son singulares; las capacidades repetibles siguen sus propias reglas. La identidad mecánica es estable aunque cambie el nombre visible.

La creación utiliza un estado global de construcción. Al completar el personaje, Foundry valida las elecciones obligatorias y los presupuestos profesionales/materiales, descarta el PEI sobrante y concede una única vez la Reserva líquida inicial. La reconstrucción posterior requiere un flujo autorizado y no convierte el borrado de un Item en un reembolso automático.

La migración desde fichas anteriores es conservadora: cuando una procedencia, coste histórico o identidad no puede demostrarse sin ambigüedad, se preserva como legado y se informa; no se inventan compras, conversiones ni equivalencias para hacer cuadrar la ficha.

**Frontera con CREA-12.** CREA-11 define fuentes estructuradas de modificadores y relaciones. CREA-12 determina la sincronización y agregación definitiva de Vida, Maná, Defensa, Defensa de Maniobra, Defensa Mental, Defensa Corporal, Movimiento, Bono Defensivo, Protección, Iniciativa y demás valores derivados.
