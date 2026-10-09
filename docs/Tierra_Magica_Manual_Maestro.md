# Tierra Mágica — Manual Maestro Único de Trabajo

> **FUENTE ÚNICA ACTIVA DE DISEÑO Y EDICIÓN.** Desde esta consolidación, este archivo es la guía operativa única para construir, revisar y preparar el libro de **Tierra Mágica / Foundry T.M.**. Las reglas vigentes, el canon narrativo vigente, el material editorial y el archivo de recuperación se reúnen aquí. Los documentos anteriores permanecen sólo como respaldo histórico en Git/GitHub y no deben volver a usarse como autoridad paralela.

## 0. Cómo usar este documento

### Regla de fuente única

Toda decisión nueva que afecte reglas, creación de personaje, magia, equipo, Familiares, mundo, religiones, pueblos, economía o cualquier otra parte del juego debe incorporarse **primero en este archivo**. Foundry VTT, referencias rápidas, hojas, PDFs, DOCX y futuras maquetas son derivados: implementan o presentan lo definido aquí, pero no crean canon por sí mismos.

Si se descubre una contradicción, no se corrige silenciosamente en otro documento. Se corrige aquí, se registra el motivo en Git y después se propaga a la implementación.

### Anexos técnicos controlados

El Manual Maestro puede delegar **especificaciones técnicas extensas y reproducibles** a anexos especializados cuando duplicarlas aquí perjudicaría su mantenimiento. Esa delegación no crea una segunda autoridad narrativa.

Para símbolos visuales, el registro técnico autorizado es:

`docs/visual/SIMBOLOS_CANONICOS.md`

Ese archivo sólo puede desarrollar entidades y símbolos previamente autorizados por este Manual. Una ficha visual adquiere estado **CANON** únicamente después de aprobación explícita y de que este Manual registre o remita a esa definición. Si ambos documentos entran en contradicción, prevalece el Manual Maestro y la ficha técnica debe marcarse como inconsistente hasta corregirse.

Los activos `SVG/PNG` derivados implementan la ficha técnica; no crean canon por sí mismos.


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
19. Pueblos jugables, herencias, culturas y orígenes
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

No se convierten unas en otras. El **paquete racial jugable** se equilibra aparte y no consume los 25 PD ni los 3 PR generales del personaje.

Procedimiento:

1. definir concepto y registrar exactamente una Ascendencia, un Origen y un Trasfondo; aplicar el paquete racial, elegir sus Facetas y anotar los idiomas iniciales;
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

### Paso 1 — Concepto, Ascendencia, Origen y Trasfondo

Primero define quién es el personaje: qué hace, de dónde viene, qué desea, qué relaciones importantes posee y qué lugar ocupa en Tierra Mágica.

**Pueblo/herencia, cultura, origen, profesión, religión, personalidad y moral son capas distintas.** El pueblo jugable puede conceder un paquete racial innato porque representa anatomía, fisiología, sentidos, movimiento, adaptaciones o relaciones sobrenaturales propias de esa familia. Cultura y Origen no conceden por sí mismos Atributos, Habilidades, PD, PR, Defensa, Vida, Maná, Acciones, Técnicas ni competencias gratuitas.

Los paquetes raciales siguientes forman parte de la creación vigente de playtest. **Se equilibran aparte de los 3 PR generales y de los 25 PD profesionales.** Elegir un paquete racial no reduce esos presupuestos.

Un origen militar, académico, religioso, gremial, criminal, rural o privilegiado puede justificar conocimientos, contactos, licencias o elecciones de equipo, pero esas ventajas deben respetar los presupuestos normales de creación. Un origen religioso no concede automáticamente Vínculo Divino; uno arcano-industrial no concede dispositivos excepcionales gratis.

#### Reglas transversales de los paquetes raciales

- **Raza/pueblo no determina cultura, profesión, religión, personalidad ni moral.**
- Ningún paquete racial concede rangos gratuitos de Habilidad ni aumentos generales de Atributo.
- Una capacidad racial que modifica **Escala efectiva** sólo funciona en las interacciones que enumera; no aumenta alcance, daño, Defensa, espacio ocupado, armas utilizables ni otras magnitudes por inferencia.
- Varias mejoras equivalentes de Escala efectiva **no se acumulan** salvo que una regla lo permita expresamente.
- **Protección Natural y armadura no se suman** por defecto; se usa el valor mayor. Una barrera independiente sólo añade otra capa si su propia regla lo establece.
- Fisiología distinta **no equivale a inmunidad automática**. Todo pueblo jugable puede sufrir Fatiga y necesita alguna forma de sustento, descanso y ambiente viable salvo regla expresa.
- Miembros, alas, colas, trompas u otros apéndices adicionales **no conceden Acciones ni Reacciones adicionales**.
- Un arma natural es un arma disponible del personaje; no se suma a otra arma ni concede ataques adicionales. Puede desarrollarse con Habilidades, Especializaciones y Técnicas físicamente compatibles.
- Los sentidos raciales revelan normalmente **presencia o categoría**, no causa, identidad, intención, funcionamiento ni método de neutralización. No sustituyen Investigación, Naturaleza, Religión, Arcana, Ritualismo ni Visión Arcana.
- Percepción o comunicación remota no crea línea de efecto. Las extensiones de percepción, alcance o punto de origen no se encadenan salvo permiso expreso.
- Una afinidad racial con magia no concede Fuente, Disciplina, Canalización, Hechizos, Reserva, Caudal ni Vínculo Divino salvo regla expresa.
- Las capacidades raciales **no escalan automáticamente con nivel**.
- Una capacidad racial no puede adquirirse de nuevo para acumular el mismo beneficio salvo que posea grados expresos.
- Equipo vestido o empuñado debe ser compatible con la Escala y anatomía del usuario. El equipo inicial y el de mercados razonablemente diversos puede asumirse adaptado; una pieza única, saqueada o histórica puede requerir modificación.
- Volar no elimina costes de Acción, Reacción, Carga, activación de objetos ni otras reglas. Una criatura bajo Carga Pesada o Excesiva no puede usar vuelo racial sostenido salvo regla expresa.

#### Paquetes raciales jugables v0.3

Los siguientes doce paquetes son la lista jugable base actual. Variantes culturales, regionales o de linaje no alteran estas reglas salvo que una entrada lo diga expresamente.

##### Humanos

**Trasfondo.** Las tradiciones de Aster recuerdan a los Humanos como los **Hijos del Camino**, nacidos de la Primera Elección. Aster creó una sola Humanidad y se negó a imponerle una función primordial estrecha; por eso no existen subrazas humanas divinas originales. Las diferencias humanas actuales proceden de migraciones, climas, culturas, mezclas poblacionales, magia, religión, guerras, aislamiento, alimentación, historia y adaptación. El **Don sin Forma** expresa amplitud de posibilidades, no superioridad: un Humano puede seguir casi cualquier profesión, culto o disciplina, pero no recibe por ello fuerza, longevidad, sentidos o resistencia sobrenaturales.

- **Escala:** Mediana.
- **Movimiento:** 6.
- Anatomía y sentidos humanoides ordinarios.
- **Don sin Forma:** durante creación obtiene gratuitamente **1 Rasgo General Significativo** o **2 Rasgos Generales Menores** compatibles, además de sus 3 PR normales. No puede utilizarse para aumentar Atributos, Ataque, Defensa, daño, Protección, Vida o Maná; tampoco para Rasgos raciales, Familiar Mágico, Vínculo Divino, Pactos, Fuentes mágicas especiales, ni Rasgos cuyo acontecimiento de ficción todavía no haya ocurrido. En el catálogo general actual son compatibles por defecto Sentido Agudo, Visión en la Oscuridad, Trepador Natural, Afinidad Sobrenatural y Resistencia Ambiental cuando la ficción concreta lo sostenga. La elección gratuita no paga mejoras posteriores del Rasgo.
- Los Humanos no poseen subrazas divinas originales. Su diversidad procede de migraciones, climas, culturas, mezclas, magia, religión, guerras, aislamiento, alimentación, historia y adaptación.

##### Enanos

**Trasfondo.** Los Enanos son los **Hijos de la Piedra**, la creación más deliberada atribuida a Khorun durante la Primera Forja. Los mitos dicen que el Primer Forjador formó sus huesos con piedra, fortaleció su sangre con metal, les dio voluntad con el fuego profundo y después les entregó herramientas. Por eso la creación material ocupa un lugar central en muchas sociedades enanas, aunque no determina la profesión individual. Las tradiciones distinguen Enanos de Montaña, Profundos, de Forja y Errantes; son historias y culturas distintas, no castas mecánicas obligatorias.

- **Escala:** Pequeña.
- **Movimiento:** 5.
- **Cuerpo de Piedra:** para Carga y para resistir Empujar, Derribar o desplazamiento físico impuesto, el Enano se trata como de Escala Mediana. Esta mejora no se aplica a ataque, daño, alcance, Defensa, espacio ocupado ni equipo sobredimensionado.
- **Sangre de Metal:** +1 a pruebas de VIG para resistir toxinas, enfermedades y agotamiento ambiental apropiado. Si uno de esos efectos ataca expresamente Defensa Corporal, obtiene +1 Defensa Corporal contra ese efecto. No protege de heridas, hambre, sueño insuficiente ni daño general.
- Forja, minería, Ingeniería y Artesanía son conocimientos adquiridos, no competencias raciales gratuitas.

##### Élficos

**Trasfondo.** Los Élficos son los **Hijos de la Savia** de Eïra. El canon describe un único Pueblo Élfico Primordial del que, tras milenios de migraciones, guerras, filosofías, culturas y exposición a distintas formas de magia, surgieron Altos Elfos, Elfos Silvanos, Elfos Oscuros y numerosas poblaciones comunes o mixtas. Los Altos Elfos desarrollaron tradiciones de estudio y transformación deliberada; los Silvanos integraron sus asentamientos con ecosistemas vivos sin rechazar necesariamente la tecnología; los Oscuros descienden de poblaciones adaptadas a las profundidades y su oscuridad no determina moralidad. La identidad élfica no impone profesión, religión ni conducta.

- **Escala:** Mediana.
- **Movimiento:** 6.
- **Sentidos Élficos:** +1 PER únicamente para distinguir detalles naturales sutiles por vista u oído cuando esas señales sean determinantes. No es +1 PER general, no mejora iniciativa ni ataques.
- **Resonancia de la Savia:** advierte una alteración mágica significativa que esté afectando directamente seres vivos, procesos vitales o un ecosistema, siempre que pueda percibir razonablemente el área afectada. Detecta que existe una alteración; no revela automáticamente hechizo, Fuente, responsable, posición exacta ni solución.
- Alto, Silvano, Oscuro o Común describen tradiciones, poblaciones e historias; no conceden INT, AGI, Naturaleza, Sigilo, magia ni moral automática.

##### Orcos

**Trasfondo.** Los Orcos son los **Hijos del Colmillo**, una de las cuatro respuestas de Varkor al conflicto. Representan fuerza dirigida por voluntad: poder físico, disciplina, determinación y capacidad de continuar cuando otros abandonan. Sus sociedades pueden ser imperios militares, confederaciones tribales, pueblos nómadas, guardianes fronterizos, compañías mercenarias, órdenes profesionales o comunidades que consideran la violencia un último recurso porque conocen su coste. Ningún Orco nace moralmente malvado y la herencia de Varkor no obliga a vivir como guerrero.

- **Escala:** Mediana.
- **Movimiento:** 6.
- **Complexión Orca:** +1 FUE efectiva sólo para Carga, levantar, arrastrar o aplicar fuerza bruta contra objetos inertes. No modifica ataque, daño, Agarrar, Empujar, Derribar, Defensa ni Vida.
- **Voluntad del Colmillo:** 1 vez por Escena, antes de una prueba que tenga Desventaja exclusivamente por dolor, miedo o agotamiento físico, puede ignorar esa fuente de Desventaja para esa prueba. No concede Ventaja, no elimina la condición que originó el problema y no retira penalizaciones de Movimiento por Fatiga.
- Un Orco no obtiene Intimidación, competencia marcial ni conducta violenta por nacimiento.

##### Goblinoides

**Trasfondo.** Los Goblinoides son los **Hijos del Ojo** de Varkor. Su mito de origen nace de una idea simple: el más fuerte no siempre vence. Terreno, números, información, emboscada, logística, tecnología, engaño y planificación pueden derrotar a un enemigo físicamente superior. Por eso la familia goblinoide expresa la astucia aplicada al conflicto, sin imponer una moral o profesión concreta.

Todos los Goblinoides jugables comparten:

- **Ojo para la Oportunidad:** 1 vez por Escena, antes de una prueba, obtiene +1 si explota una oportunidad concreta surgida de información recién obtenida, un cambio real de situación o una debilidad concreta ya descubierta. No crea información, no revela debilidades ocultas y no puede reutilizar la misma circunstancia como oportunidades distintas.

**Goblin.** Pequeños, rápidos, sociales y muy adaptables. Históricamente aparecen como exploradores, comerciantes, inventores, saboteadores, mineros, tiradores, mecánicos, alquimistas o espías; esas ocupaciones son posibilidades culturales, no competencias gratuitas.
- **Escala:** Pequeña.
- **Movimiento:** 6.
- **Escurridizo:** puede atravesar el espacio ocupado por una criatura Mediana o mayor cuando exista espacio físico suficiente. Ese tránsito cuenta como terreno difícil y no puede terminar el movimiento dentro del espacio ajeno. No atraviesa barreras ni anula Reacciones que otra regla habilite.

**Hobgoblin.** Su identidad histórica más reconocida es la organización: ejércitos, administraciones, fortificaciones, sistemas logísticos y cadenas de mando. Esa disciplina es principalmente cultural; también pueden formar repúblicas, ligas defensivas, gremios u órdenes profesionales.
- **Escala:** Mediana.
- **Movimiento:** 6.
- Su disciplina organizada es principalmente cultural. No recibe Liderazgo, armas, Ingeniería, logística ni otras competencias gratuitas. Mecánicamente utiliza Ojo para la Oportunidad sin un segundo bono profesional obligatorio.

**Bugbear.** Grandes goblinoides asociados históricamente a la caza, el sigilo, la emboscada y el combate de aproximación. Su combinación de tamaño y discreción contradice la idea de que toda criatura poderosa deba combatir frontalmente, pero esas asociaciones no conceden entrenamiento automático.
- **Escala:** Mediana, en el extremo superior de esa categoría para el paquete básico.
- **Movimiento:** 6.
- **Complexión Bugbear:** se trata como Grande únicamente para Carga y fuerza bruta contra objetos inertes. No obtiene alcance, daño, maniobras, Defensa ni armas de criatura Grande.
- Su asociación histórica con sigilo y emboscada no concede Sigilo gratuito.

Los Kobolds no forman parte del paquete jugable base actual. Su origen permanece deliberadamente abierto hasta cerrar la cosmología dracónica.

##### Terios / Anihombres

**Trasfondo.** Los Terios son los **Hijos de la Sangre** de Eïra: pueblos humanoides de ascendencia animal que nacen como tales y no como humanos transformados. Un Terio lupino, por ejemplo, no es un hombre lobo; licantropía, maldición, transformación o pacto son fenómenos distintos. Su diversidad se organiza como **Terio → Linaje → Variedad**, y la anatomía debe ser funcional: trompas, caparazones, garras, alas, branquias o sentidos existen como partes reales del cuerpo cuando el linaje los posee. La ascendencia animal no determina personalidad, moral, inteligencia, profesión ni cultura.

Los Terios son pueblos nacidos con anatomías animales funcionales; no son humanos transformados y una ascendencia animal no determina personalidad ni profesión.

- **Escala:** normalmente Pequeña o Mediana según linaje.
- **Movimiento:** 6 salvo locomoción específica.
- Cada Terio elige **1 Adaptación Principal + 1 Adaptación Secundaria**, o **1 Adaptación Dominante**. Una Variedad puede reemplazar una adaptación, nunca añadir una tercera.

**Adaptaciones Secundarias**
- **Sentido especializado:** +1 PER sólo cuando un sentido anatómico concreto y estrecho sea determinante.
- **Arma natural:** Daño 3, Penetración 0; no concede ataque adicional.
- **Protección Natural:** Protección 1; no se suma con armadura.
- **Adaptación ambiental:** +1 VIG contra una exposición ambiental específica o eliminación de una dificultad física igualmente específica cuando la anatomía la justifique.
- **Movilidad Adaptada:** ignora una causa muy concreta de terreno difícil asociada a la anatomía.

**Adaptaciones Principales**
- **Complexión poderosa:** +1 FUE efectiva sólo para Carga y fuerza contra objetos inertes.
- **Órgano prensil:** puede sujetar y manipular objetos apropiados; no concede Acción, ataque, escudo ni recarga adicionales.
- **Locomoción Especializada:** Movimiento 6 en un único medio anatómicamente justificado, como nadar o trepar.
- **Excavador:** puede remover con rapidez tierra, arena o sustrato blando y crear paso con tiempo; no obtiene Movimiento subterráneo normal.

**Adaptación Dominante**
- **Vuelo sostenido:** anatomía capaz de volar de forma funcional. Consume todo el presupuesto racial de adaptaciones. No funciona bajo Carga Pesada o Excesiva y no concede acciones adicionales.

##### Feéricos

**Trasfondo.** Los Feéricos son los **Hijos de la Hoja** de Eïra y constituyen una gran familia, no una sola especie. En ellos la separación entre cuerpo, magia y naturaleza nunca llegó a ser completa. El canon incluye Hadas, Sátiros, Dríades, Trents, Náyades, Nereidas, Silfos, duendes del bosque, linajes centáuricos, espíritus florales y ramas estacionales. No todo espíritu natural es Feérico y no todo Feérico es un espíritu; pertenecer a esta familia tampoco obliga a venerar a Eïra ni concede magia entrenada.

**Naturaleza Feérica** es un descriptor sobrenatural compartido: determinados hechizos, rituales, barreras o fenómenos pueden reconocer a una criatura como Feérica. No concede por sí mismo Maná, Fuente, Disciplina, resistencia mágica ni Vínculo con Eïra.

**Hada.** Feéricos pequeños, frecuentemente alados y asociados históricamente a una relación intensa con la magia natural. El paquete básico representa su movilidad corporal sin convertir esa afinidad en hechizos gratuitos.
- **Escala:** Pequeña.
- **Movimiento terrestre:** 5.
- **Movimiento aéreo inicial:** 6. Debe comenzar y terminar cada turno apoyada en una superficie capaz de sostenerla o permitirle posarse. Puede cruzar huecos y desniveles, pero no permanecer suspendida al terminar el turno. Carga Pesada o Excesiva impide usar este Movimiento aéreo.

**Sátiro.** Feéricos de rasgos caprinos presentes en múltiples tradiciones ligadas a bosques, música, emociones, fertilidad o celebración. Esas asociaciones son culturales y míticas: no determinan personalidad ni competencia social.
- **Escala:** Mediana.
- **Movimiento:** 6.
- **Paso de Cabra:** raíces, roca irregular, pendientes naturales pronunciadas y desniveles menores no aumentan el coste de Movimiento cuando sean físicamente transitables. No concede trepa vertical, salto imposible ni equilibrio automático.
- **Cuernos:** arma natural, Daño 3, Penetración 0.

**Dríade.** Feéricos vinculados originalmente a árboles concretos y, en algunos linajes, a arboledas o bosques enteros. Su relación arbórea es distinta de la biología autónoma de los Verdantes.
- **Escala:** Mediana.
- **Movimiento:** 6.
- **Vínculo Arbóreo:** mediante contacto con vegetación significativa perteneciente a su vínculo puede conocer su estado general: saludable, dañada, enferma, ardiendo, muriendo o afectada por magia evidente. No concede sentidos remotos, diálogo, ubicación, historia ni identificación del efecto.
- **Enraizar:** Acción sobre suelo apropiado; mientras permanece enraizada se considera +1 categoría de Escala efectiva sólo para resistir Empujar, Derribar y desplazamiento físico impuesto. Liberarse cuesta 1 punto de Movimiento.

**Silfo.** Feéricos vinculados a vientos, alturas y tormentas. Esa relación natural no equivale por sí sola a dominar Evocación, volar indefinidamente ni poseer una Fuente mágica.
- **Escala:** Mediana.
- **Movimiento:** 6.
- **Cuerpo del Viento:** ignora penalizaciones de desplazamiento causadas únicamente por viento mundano ordinario y se considera +1 categoría de Escala efectiva sólo para resistir Empujar causado por viento. No concede vuelo sostenido ni inmunidad a tormentas o magia.

##### Ankar

**Trasfondo.** Vaelun creó a los Ankar como **Guardianes del Umbral** cuando descubrió que las almas podían perderse, ser retenidas, devoradas o esclavizadas durante el tránsito. Su misión primordial se resume en: «Que ningún alma sea tomada contra su voluntad». Son humanoides altos y esbeltos de rasgos cánidos estilizados y no deben confundirse con un Terio Chacal. Muchas tradiciones Ankar se articulan alrededor de **Recordar, Custodiar y Dejar Partir**, pero conocer la muerte o los espíritus no obliga a ser sacerdote funerario, nigromante ni cazador de No Muertos.

- **Escala:** Mediana.
- **Movimiento:** 6.
- **Sentido del Umbral:** dentro de 6 espacios puede advertir la presencia general de un alma desencarnada manifiesta, un espíritu en tránsito incompleto, un No Muerto sostenido espiritualmente o un efecto activo que retenga, desplace o esclavice un alma. No determina automáticamente ubicación exacta, identidad, intención, poderes, causa ni método de neutralización; un fenómeno sellado u oculto específicamente contra percepción espiritual puede exigir investigación o magia.
- **Custodia del Alma:** +1 Defensa Mental únicamente contra posesión, control directo del alma, expulsión o desplazamiento cuerpo/alma y retención o esclavización espiritual. No protege de miedo, sugestión, ilusión, persuasión ni ataques mentales generales.
- Ser Ankar no concede Religión, Medicina, Ritualismo, Arcana ni magia divina.

##### Cristálidos

**Trasfondo.** Los Cristálidos figuran entre los pueblos posteriores ligados a la **Primera Forja**. Nacieron en regiones con enormes concentraciones de minerales arcanos y pueden ser parcial o completamente cristalinos. Sus cuerpos interactúan de forma natural con determinadas corrientes mágicas, razón por la que aparecen con frecuencia en estudios sobre acumuladores, conducción y materiales arcanos; esa afinidad no los convierte automáticamente en magos, ingenieros o baterías vivientes.

Para el Manual Básico jugable se utiliza la variante **Cristálido de Matriz Mixta**. Los Cristálidos completamente cristalinos siguen existiendo en el mundo, pero su fisiología jugable avanzada queda fuera de este paquete.

- **Escala:** Mediana.
- **Movimiento:** 6.
- **Matriz Mixta:** posee estructuras cristalinas integradas pero suficientes procesos vitales para utilizar normalmente Fatiga, descanso, sustento, Medicina y peligros fisiológicos generales.
- **Resonancia Arcana:** mediante contacto directo puede reconocer si un objeto, cristal, mineral, estructura o dispositivo contiene, recibe, conduce, descarga energía mágica o está inerte. No determina cantidad, Fuente, hechizo, constructor, propósito ni método para desactivarlo.
- **Conductor Vivo:** puede actuar voluntariamente como puente conductor cuando un dispositivo, ritual, proyecto o fenómeno compatible esté diseñado para admitirlo. Esto no genera Maná, no crea Reserva o Caudal, no sustituye materiales, Fuente, Método, Arcana, Ingeniería o Canalización y no concede inmunidad a sobrecarga.

##### Verdantes

**Trasfondo.** Los Verdantes son pueblos naturales posteriores a los Tres Primeros Pueblos de Eïra. Son formas de vida vegetales móviles y conscientes, distintas tanto de las Dríades feéricas como de los Trents. Sus linajes se han adaptado a selvas, desiertos, pantanos, tundras y otros ecosistemas, por lo que no existe una única apariencia ni una cultura verdante universal. Su biología no los obliga a ser guardianes de la naturaleza, sacerdotes de Eïra ni habitantes de regiones salvajes.

Los Verdantes son organismos vegetales móviles y conscientes, distintos de Dríades y Trents.

- **Escala:** Mediana.
- **Movimiento:** 6.
- **Sustento Vegetal:** necesita agua, luz suficiente y nutrientes compatibles; esas necesidades ocupan la misma función de supervivencia que alimento e hidratación para otros pueblos. Puede obtener parte de ellos de un entorno apropiado o transportarlos como provisiones. Sigue necesitando Descanso Completo y puede sufrir Fatiga.
- **Enraizar:** Acción sobre suelo apropiado; mientras permanece inmóvil se considera +1 categoría de Escala efectiva sólo para resistir Empujar, Derribar y desplazamiento físico impuesto. Liberarse cuesta 1 punto de Movimiento. Enraizar no recupera Vida ni Maná.
- **Adaptación de Bioma:** elige un bioma en creación. La adaptación concede una ventaja anatómica estrecha: o +1 VIG contra una exposición ambiental definitoria, o elimina una causa concreta de terreno difícil. Ejemplos: jungla, vegetación ordinaria; pantano, barro o agua somera; tundra, +1 VIG contra frío ambiental; desierto, +1 VIG contra calor o deshidratación ambiental. No concede inmunidad al bioma completo.
- Sangrado puede representar pérdida de savia o fluidos vasculares. Medicina sigue siendo la Habilidad pertinente cuando exista un método aplicable.

##### Micelios

**Trasfondo.** Los Micelios surgieron de grandes redes de hongos y micelio extendidas por distintos ecosistemas. No son plantas ni animales. Algunas comunidades desarrollaron formas de compartir información química, sensorial o incluso mágica mediante redes subterráneas extensas, pero eso no convierte a todos los Micelios en una mente colectiva: individuo, comunidad y red siguen siendo conceptos distintos.

Los Micelios son organismos fúngicos conscientes; no son plantas ni animales.

- **Escala:** Mediana.
- **Movimiento:** 6.
- **Sustento Fúngico:** necesita humedad y nutrientes orgánicos compatibles, obtenidos del entorno o de provisiones apropiadas. Sigue usando las reglas normales de Fatiga y Descanso Completo.
- **Quimiosensibilidad:** +1 PER únicamente para detectar señales químicas cercanas relacionadas con crecimiento fúngico, esporas, descomposición orgánica, contaminación biológica o alteración importante de una colonia. No es +1 PER general ni sustituye Naturaleza, Medicina o Investigación.
- **Enlace Micelial:** Acción para conectarse mediante contacto directo con una red micelial viva, compatible y continua. Mientras mantenga contacto puede comunicarse silenciosamente con otro Micelio voluntario conectado a la misma red dentro de 12 espacios mediante mensajes simples, conceptos o impresiones sensoriales básicas. Termina al romper contacto, interrumpirse la red o por decisión del usuario. No es telepatía, radar, archivo de recuerdos, mapa de la red, línea de efecto ni canal gratuito para Maná o hechizos.
- Redes comunitarias extensas capaces de transmitir información compleja o mágica son infraestructura, no una capacidad gratuita de todo Micelio.

##### Coralios

**Trasfondo.** Los Coralios nacieron de antiguos arrecifes transformados por la **Primera Semilla**. Sus pueblos pueden formar comunidades y ciudades vivientes bajo el mar, vinculadas a ecosistemas coralinos y a la circulación de magia oceánica. Esa procedencia común no implica una sola cultura, religión o modo de vida, y los Coralios que viven en puertos, costas o asentamientos de superficie siguen perteneciendo plenamente a su pueblo.

Los Coralios son pueblos biológicos coralinos y anfibios vinculados históricamente a arrecifes transformados por la Primera Semilla.

- **Escala:** Mediana.
- **Movimiento terrestre:** 5.
- **Movimiento acuático:** 6.
- **Respiración Anfibia:** puede respirar agua y aire mientras se mantenga razonablemente hidratado. No concede inmunidad a presión, temperatura, corrientes, contaminación ni desecación.
- **Esqueleto Coralino:** Protección Natural 1; no se suma con armadura.
- **Sentido de Corriente:** +1 PER cuando corrientes, vibraciones o cambios de presión del agua sean el medio determinante para percibir algo. No es Percepción general.
- La capacidad histórica de ciertos Coralios para relacionarse con magia oceánica no forma parte del paquete base; una futura Resonancia Oceánica debe aparecer como Rasgo, linaje o capacidad específica.

#### Notas de balance y progresión racial

Los paquetes anteriores son una **base estática**. Subir de nivel no aumenta automáticamente sus bonos, alcances, usos, daño, Protección, Movimiento ni capacidades. Una evolución posterior requiere un Rasgo, Técnica, Hechizo, Proyecto, transformación o acontecimiento de ficción con coste y requisitos propios.

Los paquetes raciales no conceden rangos de Habilidad ni rompen el máximo inicial de Atributo. Cuando una capacidad racial y un Rasgo general describan exactamente la misma propiedad, no se acumulan ni se cobra dos veces por la misma característica.

#### Identidad estructurada de creación: Ascendencia, Origen y Trasfondo

Para que la creación del Manual y la ficha de Foundry utilicen el mismo lenguaje, todo PJ de nivel 1 registra **exactamente una Ascendencia, un Origen y un Trasfondo**.

- **Ascendencia** = el paquete racial o variante mecánica elegida. No describe automáticamente cultura ni profesión.
- **Origen** = la sociedad o región donde el personaje se formó principalmente. Entrega Familiaridad Cultural, Perfil Lingüístico y una Faceta de Origen, pero ningún rango de Habilidad.
- **Trasfondo** = la trayectoria práctica anterior a la aventura. Entrega Familiaridad Práctica y dos Facetas de Trasfondo, pero ningún rango de Habilidad.
- **Concepto** = la síntesis libre de quién es el personaje; no sustituye las tres entradas anteriores.

Estas entradas **no consumen PD ni PR**. Tampoco conceden Atributos, Ataque, Defensa, Vida, Maná, Técnicas, Hechizos, dinero ni equipo gratis salvo que una regla lo indique expresamente.

##### Ascendencias registrables

La ficha debe registrar la variante mecánica exacta cuando la familia posea más de una.

**Humano; Enano; Elfo; Orco; Goblin; Hobgoblin; Bugbear; Terio/Anihombre; Hada; Sátiro; Dríade; Silfo; Ankar; Cristálido de Matriz Mixta; Verdante; Micelio; Coralio.**

Para un Terio se anotan además Linaje, Variedad y Adaptaciones elegidas. Para un Verdante se anota su Adaptación de Bioma. Un Humano anota las elecciones concedidas por Don sin Forma en la sección de Rasgos. Estas anotaciones no crean una segunda Ascendencia.

##### Qué significa Familiaridad Cultural

La Familiaridad Cultural de un Origen significa que el personaje conoce la vida cotidiana de esa sociedad: costumbres comunes, instituciones visibles, geografía ordinaria, normas sociales y procedimientos públicos básicos.

Una información que cualquier adulto local razonablemente conocería puede darse por sabida sin tirada. Información oscura, histórica, secreta, profesional o controvertida sigue requiriendo la Habilidad apropiada cuando exista incertidumbre relevante.

Familiaridad Cultural **no concede un bono numérico** y no sustituye Historia, Religión, Persuasión, Investigación u otra Habilidad.

##### Perfiles de Origen

Todo Origen concede **Común de Concordia + la lengua regional indicada**. Además el jugador elige **una** Faceta de la fila y la anota en la ficha. La Faceta amplía la Familiaridad Cultural a ese ámbito, pero no concede un modificador.

| Origen | Lengua regional | Elige una Faceta de Origen |
|---|---|---|
| **Valdoriano** | Valdoriano | Fueros y administración; servicio cívico y milicias; caballería y vida regional |
| **Broncino** | Broncino | Mercados y contratos; industria y talleres; trabajo organizado y gremios |
| **Lysendrino** | Lysendrino | Academias y rivalidades; archivos y bibliotecas; laboratorios y debate técnico |
| **Ereliano** | Ereliano | Autonomía local; ríos y bosques; exploración y gestión del territorio |
| **Solenario** | Solenario | Hospitalidad y peregrinación; caravanas y rutas; contratos y santuarios |
| **Kharumita** | Kharumita | Talleres y genealogías; obras públicas; ingeniería y tradición comunitaria |
| **Libre de Nacariel** | Nacarielense | Navegación y seguros; contratos portuarios; comercio exterior |
| **Vigilia Alta** | Lysendrino | Dirigibles y rutas aéreas; astronomía; islas flotantes y observación |
| **Risco de Ceniza** | Valdoriano | Minería arcana; compañías y concesiones; vida de frontera peligrosa |
| **Puerto Umbral** | Solenario | Expediciones oceánicas; mercenarios y guardias; contrabando y rutas de frontera |

Las lenguas regionales anteriores son suficientes para la creación estándar. Ningún pueblo posee automáticamente una “lengua racial”: un Enano criado en Valdoria puede hablar Valdoriano y un Humano criado en Kharum puede hablar Kharumita.

##### Idiomas iniciales

Todo PJ de nivel 1 conoce:

1. **Común de Concordia**;
2. la **lengua regional de su Origen**.

Si ambas fueran la misma por una circunstancia excepcional de campaña, se elige otra lengua regional coherente con la comunidad de crianza.

Una de las dos Facetas de Trasfondo puede reemplazarse por **Lengua de trabajo**. Esa Faceta concede **una lengua regional adicional** del cuadro anterior, que debe anotarse al adquirirla. Una lengua adicional no concede bonos sociales ni conocimiento cultural automático.

La alfabetización en los idiomas conocidos es habitual para personajes aventureros salvo que el jugador decida expresamente que su personaje no sabe leer o escribir. Una escritura especializada, cifrado, lengua extinta o sistema ritual puede seguir requiriendo Habilidad o conocimiento específico.

##### Qué significa Familiaridad Práctica

El Trasfondo establece qué clase de trabajo o vida cotidiana realizó el personaje antes de comenzar la campaña.

Familiaridad Práctica permite reconocer herramientas, jerga, rutinas y procedimientos ordinarios de ese entorno y realizar tareas **rutinarias y sin presión** que una persona con experiencia básica podría completar.

No concede rangos de Habilidad. Una cirugía, un disparo, una reparación compleja, una investigación técnica, una negociación peligrosa o cualquier tarea incierta sigue usando la Habilidad correspondiente y sus requisitos normales.

##### Trasfondos de creación

Elige exactamente un Trasfondo y después **dos Facetas** de su fila. Una de esas dos puede sustituirse por **Lengua de trabajo**.

| Trasfondo | Familiaridad Práctica | Facetas disponibles |
|---|---|---|
| **Vida de Taller** | trabajo cotidiano en un taller | herramientas y mantenimiento; materiales y proveedores; gremios y encargos |
| **Trabajo Industrial** | planta, fábrica o instalación productiva | vapor y maquinaria; seguridad y turnos; logística de planta |
| **Minería y Prospección** | minas, canteras y campamentos de prospección | vetas y terreno; seguridad de mina; concesiones y campamentos |
| **Comercio y Mercado** | compra, venta y abastecimiento | mercados mayoristas; contratos y crédito; proveedores y rutas |
| **Vida de Mar** | trabajo cotidiano a bordo o en muelles | cubierta y guardias; puertos y mareas; carga y mantenimiento |
| **Servicio Militar o Guardia** | disciplina, patrulla y cadena de mando | guardias y rondas; logística militar; reglamentos y fortificaciones |
| **Expedición y Cartografía** | campamentos, rutas y registro de terreno | mapas y notas de campo; campamentos y suministros; permisos y expediciones |
| **Vida Académica** | instituciones de estudio e investigación | archivos y bibliotecas; laboratorios y seminarios; redes académicas |
| **Servicio Sanitario** | hospitales, clínicas o puestos de socorro | triage y admisión; instrumental y suministros; organización de sala |
| **Administración y Escribanía** | oficinas, registros y documentación | formularios y archivos; permisos y licencias; correspondencia y protocolo |
| **Contratista de Rutas Libres** | contratos de exploración, escolta o recuperación | negociación de contratos; permisos y reclamaciones; logística de misión |
| **Vida Caravanera** | viajes prolongados con convoyes | campamentos y animales; rutas y puestos; mercancías y seguridad |
| **Peregrinación y Hospedería** | santuarios, caminos de peregrinos y alojamiento | hospitalidad; calendarios y rutas sagradas; administración de viajeros |
| **Vida de Frontera** | asentamientos con recursos escasos y amenazas cercanas | reparaciones improvisadas; puestos y alarmas; intercambio entre comunidades |

**Lengua de trabajo:** si reemplaza una Faceta, elige una lengua regional adicional distinta de las ya conocidas. No puede elegirse dos veces.

##### Cómo anotarlo en la ficha

Al terminar este bloque, la ficha debe poder responder sin ambigüedad:

- ¿Cuál es mi Ascendencia exacta?
- ¿Cuál es mi Origen?
- ¿Qué Faceta de Origen elegí?
- ¿Cuál es mi Trasfondo?
- ¿Qué dos Facetas de Trasfondo elegí?
- ¿Qué idiomas conozco?

Si alguna de esas respuestas está vacía, la identidad estructurada de creación todavía no está terminada.

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

Para creación estándar de nivel 1, un Rasgo sólo puede elegirse si su entrada del capítulo **5. Rasgos y Puntos de Rasgo** está marcada como **Disponible en creación**. Toda elección obligatoria del Rasgo debe quedar escrita en la ficha al adquirirlo.

Resumen del catálogo cerrado en CREA-14:

| Rasgo | Coste | Estado |
|---|---:|---|
| Sentido Agudo | 1 PR | Disponible en creación |
| Visión en la Oscuridad | 2 PR | Disponible en creación |
| Anfibio | 1 PR | Disponible en creación |
| Trepador Natural | 1 PR | Disponible en creación |
| Cola Prensil | 1 PR | Disponible en creación |
| Miembros Extra | 2 PR | Disponible en creación |
| Corpulento | 2 PR | Disponible en creación |
| Masivo | 3 PR | Disponible en creación |
| Vínculo Divino | 2 PR | Disponible en creación |
| Prótesis Mayor | 2 PR | Disponible en creación |
| Afinidad Sobrenatural | 1 PR | Disponible en creación |
| Resistencia Ambiental | 1 o 2 PR | Disponible en creación |
| Vuelo Natural | 4 PR | Excepcional; no comprable con los 3 PR estándar |
| Familiar Mágico | 3 PR | Disponible en creación; usa uno de los cuatro perfiles iniciales del Paso 5 |
| Pacto Externo | 2 PR | Disponible sólo en su forma base definida en el capítulo 5; cualquier Don adicional exige un perfil expresamente costeado |

Los 3 PR generales existen **además** del paquete racial. Si el paquete racial ya concede una propiedad equivalente a un Rasgo general, no se compra de nuevo para acumularla. Un Rasgo puede ampliar una capacidad racial sólo cuando su propia regla describa expresamente esa mejora. Una misma propiedad no se cobra dos veces.

### Paso 5 — Familiar, si corresponde

**Familiar Mágico cuesta 3 PR durante creación.** Si se adquiere posteriormente mediante progresión, su coste canónico es **6 PD**. El Familiar es una criatura independiente con voluntad, personalidad y naturaleza propias, no un segundo PJ gratuito.

En nivel 1 el vínculo comienza en **Vínculo I — Compañero** y el jugador elige uno de cuatro **Perfiles Iniciales**. El perfil fija los números necesarios para que la ficha quede terminada; la apariencia, especie o naturaleza no cambia esos valores salvo que el perfil lo diga.

| Perfil | Escala | Movimiento | Vida | Defensa | Prot | Ataque | Daño | PER | RES | VOL | Rasgo del perfil |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| **Compañero** | Pequeña | 6 | 10 | 12 | 0 | +2 | 2 | +2 | +2 | +2 | equilibrado; sin capacidad corporal adicional |
| **Explorador** | Pequeña | ver Locomoción | 8 | 13 | 0 | +1 | 2 | +4 | +1 | +2 | elige una Locomoción de Explorador |
| **Guardián** | Pequeña | 5 | 12 | 12 | 1 | +3 | 3 | +2 | +3 | +2 | cuerpo protector; su Prot 1 no se suma con armadura equivalente |
| **Místico** | Pequeña | 6 | 8 | 12 | 0 | +1 | 2 | +3 | +1 | +4 | Resonancia Sobrenatural estrecha |

**PER** es el bono de Percepción simplificado; **RES** es Resistencia física; **VOL** es Voluntad.

**Locomoción de Explorador:** elige exactamente una:
- **Corredor:** Movimiento terrestre 7.
- **Trepador:** Movimiento terrestre 5 y trepa 6 por superficies físicamente trepables.
- **Nadador:** Movimiento terrestre 4 y nado 6; la naturaleza elegida debe poder sobrevivir razonablemente en ese medio.
- **Volador:** Movimiento terrestre 4 y vuelo 6. Carga que el Director considere incompatible con un cuerpo volador impide ese vuelo; el Familiar no obtiene inmunidad a viento, clima o caída.

**Resonancia Sobrenatural del Místico:** al crear el Familiar elige una categoría estrecha coherente con su naturaleza —por ejemplo espíritus, magia feérica, fuego sobrenatural o corrientes arcanas—. Obtiene +1 a su Percepción sólo para advertir manifestaciones directamente perceptibles de esa categoría. No las identifica ni concede Arcana, Religión, Maná o hechizos.

Para resolver un Familiar:
- una prueba de percepción usa **2d10 + PER**;
- una resistencia física usa **2d10 + RES** cuando corresponda;
- una resistencia de voluntad usa **2d10 + VOL**;
- **Defensa Mental = 11 + VOL**;
- **Defensa Corporal = 11 + RES**;
- un ataque válido usa **2d10 + Ataque contra Defensa** y causa el Daño indicado antes de Protección;
- llegar a 0 Vida lo deja Incapacitado; no utiliza la progresión de Trauma de un PJ orgánico salvo regla específica.

El Familiar **no posee Maná propio por defecto** y no recibe Acción o Reacción independientes para el propietario. Una intervención táctica significativa se resuelve mediante Acción Vinculada y consume normalmente la Reacción del personaje; una orden táctica compleja nueva consume la Acción del personaje conforme al capítulo de Familiares.

Durante creación registra:
- nombre, naturaleza y apariencia;
- Perfil Inicial;
- si es Explorador, su Locomoción;
- si es Místico, su categoría de Resonancia;
- los valores numéricos completos del perfil;
- temperamento y un deseo o prioridad;
- Vínculo I;
- comunicación ordinaria por emociones y conceptos simples;
- modo inicial **Autónomo**.

Las Técnicas de Vínculo posteriores no cambian retroactivamente el coste de 3 PR y no crean un segundo turno gratuito.

### Paso 6 — Equipo inicial, PEI y Reserva

La preparación material utiliza **PEI 20 o = 2.000 c**. El PEI es presupuesto de creación, no dinero del personaje: no puede convertirse en PD, PR, Reserva ni efectivo posterior.

La creación estándar utiliza una única ruta cerrada: **Compra libre** en el catálogo de equipo con precio exacto, hasta un máximo total de **2.000 c**.

Procedimiento:

1. elige objetos físicos del catálogo que el personaje pueda adquirir razonablemente al comenzar la campaña;
2. suma su precio exacto en cobres;
3. comprueba que el total no exceda 2.000 c;
4. comprueba FUE mínima, Escala, anatomía, requisitos y acceso cuando correspondan;
5. anota cantidad, munición y consumibles reales;
6. marca qué armadura, escudo o equipo está preparado/equipado;
7. descarta cualquier PEI no utilizado.

**PEI utiliza el precio terminado de catálogo.** No puede gastarse como CM, VI, materias primas, alquiler de taller, Encargo o «fabricación previa a la campaña» para obtener a mitad de precio un objeto cuyo precio terminado exceda el presupuesto. Si una campaña concede explícitamente tiempo y recursos de fabricación antes de la primera sesión, se registra como concesión de campaña fuera del PEI.

Los antiguos **Paquetes de Preparación** dejan de ser una modalidad mecánica separada durante CREA-14. Un grupo puede publicar listas recomendadas de equipo, pero cada objeto de esas listas se compra y contabiliza con las mismas reglas de Compra libre. Así no existe una segunda economía, descuento oculto ni contenido necesario fuera del Manual.

Después de cerrar el inventario inicial, el personaje recibe una sola vez una **Reserva líquida de 2 o = 200 c**. Esa Reserva ya es dinero de juego y no forma parte del PEI.

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

El **Bono Defensivo** se deriva del rango base más alto entre **Armas Ligeras, Armas Marciales, Armas Pesadas y Armas a Distancia**. No se compra por separado.

| Rango marcial defensivo | Bono Defensivo |
|---|---:|
| Sin Entrenar / Aprendiz | +0 |
| Entrenado | +1 |
| Experto | +2 |
| Maestro | +3 |
| Gran Maestro | +4 |

Foundry calcula automáticamente ese rango a partir de las cuatro Habilidades de armas. Estar **Desprevenido** puede hacer perder el Bono Defensivo según las reglas de combate; no cambia permanentemente el rango.

El **umbral informativo de Daño Grave** es 5 + VIG, equivalente a la mitad de la Vida máxima ordinaria. Alcanzarlo no crea automáticamente una Herida Grave: obliga a evaluar si el impacto y la ficción justifican una lesión concreta.

### Paso 8 — Identidad y datos narrativos

Verifica primero que ya estén registrados los tres elementos estructurados del Paso 1:

- **Ascendencia** exacta y cualquier elección interna requerida;
- **Origen** y su Faceta de Origen;
- **Trasfondo** y sus dos Facetas;
- **Idiomas:** Común de Concordia + lengua regional del Origen + cualquier Lengua de trabajo válida.

Después anota al menos:

- nombre;
- descripción física;
- profesión, oficio o trayectoria actual;
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
- Existe exactamente una Ascendencia, un Origen y un Trasfondo; sus Facetas e idiomas están anotados.
- El paquete racial jugable está registrado y no se duplicó con Rasgos generales; cultura, Origen y Trasfondo no añadieron rangos o bonos ocultos.
- El equipo adquirido por Compra libre no supera PEI 20 o, respeta disponibilidad y acceso, y la Reserva líquida de 2 o permanece separada.
- Vida, Maná y Defensas fueron recalculados después de equipo y Rasgos.
- Familiar, magia y equipo no generan Acciones, Reacciones, Maná o bonos no escritos.
- Todo lo que produzca un efecto mecánico aparece expresamente en la ficha.

### Ejemplo completo de creación de nivel 1

El ejemplo construye a **Iria**, una exploradora arcana. No es un arquetipo obligatorio: sólo demuestra el procedimiento.

#### 1. Concepto

Iria es una **Elfa** exploradora de ruinas capaz de defenderse con armas ligeras y utilizar Evocación básica. Aplica el paquete Élfico —Escala Mediana, Movimiento 6, Sentidos Élficos y Resonancia de la Savia— sin gastar PD ni sus 3 PR generales.

Para cerrar su identidad estructurada elige:
- **Ascendencia:** Elfo;
- **Origen:** Ereliano;
- **Faceta de Origen:** Ríos y bosques;
- **Trasfondo:** Expedición y Cartografía;
- **Facetas de Trasfondo:** Mapas y notas de campo; Campamentos y suministros;
- **Idiomas:** Común de Concordia y Ereliano.

Estas elecciones explican qué conoce por experiencia cotidiana, pero no le conceden rangos de Supervivencia, Naturaleza, Investigación ni otra Habilidad.

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
- Sentido Agudo (vista) — 1 PR.

Total: **3 PR**.

Los PR no reducen ni aumentan sus 25 PD.

#### 7. Equipo inicial

Iria utiliza Compra libre y registra cada objeto:

| Equipo | Precio |
|---|---:|
| Espada corta | 1 o |
| Daga | 6 p |
| Armadura ligera | 1 o 5 p |
| Kit Cartográfico | 1 o |
| Kit de Escalada | 1 o |
| Kit de Campaña | 1 o |
| Kit Instrumental Arcano de campo | 2 o |
| Catalejo | 1 o |
| Gancho de escalada | 3 p |
| Provisiones para 7 días | 2 p |
| Combustible de iluminación para 5 noches | 2 p |
| Estuche impermeable de mapas/documentos | 5 p |
| Materiales de escritura | 2 p |
| **Total** | **10 o 5 p = 1.050 c** |

No supera los **2.000 c** de PEI. Los **950 c** de PEI restantes se descartan al cerrar la creación. Después recibe **2 o = 200 c de Reserva líquida**, que sí se anotan como dinero disponible.

La armadura ligera queda equipada. La espada corta es su arma cuerpo a cuerpo principal y la daga queda como arma de respaldo.

#### 8. Valores derivados y ataques

Armas Ligeras está Entrenada, por lo que el rango marcial defensivo de Iria es Entrenado y su **Bono Defensivo es +1**.

Su ficha final registra:

- Vida máxima **14**;
- Maná máximo **12**;
- Defensa **15** = 11 + AGI 3 + Bono Defensivo 1;
- Defensa de Maniobra **15**;
- Defensa Corporal **13**;
- Defensa Mental **13**;
- Protección **1** por armadura ligera;
- Iniciativa **2d10 + 2**;
- Movimiento **6**;
- umbral informativo de Daño Grave **7**;
- Reserva líquida **2 o**.

Ataques y respuestas preparados:

- **Espada corta:** ataque **2d10 + 5** = AGI 3 + Armas Ligeras 2; Daño **5** = base 4 + FUE 1; Pen 0.
- **Daga:** ataque **2d10 + 5**; Daño **3**; Pen 0.
- **Proyectil Ígneo:** ataque **2d10 + 4** = INT 2 + Canalización 2 contra Defensa; Daño 6, Pen 2, pagando su Maná.
- **Parada:** Reacción contra un ataque cuerpo a cuerpo parable; Defensa **17** contra ese ataque.
- **Barrera Cinética:** Reacción; +2 Defensa contra el ataque declarado según su entrada.
- **Sentido Agudo (vista):** +1 PER sólo cuando distinguir detalles visuales sutiles sea determinante.
- **Visión en la Oscuridad:** funciona hasta 6 espacios conforme al Rasgo.

Con esto no queda ningún valor de combate básico del ejemplo pendiente de “calcular después”.

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
- su equipo cuesta 1.050 c y respeta PEI 2.000 c;
- registró Ascendencia, Origen, Trasfondo, Facetas e idiomas;
- sus Rasgos tienen elecciones completas;
- todos sus valores derivados y ataques preparados están escritos;
- su paquete Élfico está aplicado por separado de PD y PR, y ninguna parte de su cultura, Origen o Trasfondo añadió un bono mecánico oculto.

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

Los Rasgos representan propiedades persistentes del personaje que no encajan como entrenamiento ordinario. En creación se dispone de **3 PR**, separados de los PD y **adicionales al paquete racial jugable**. Los PR y los PD no se convierten entre sí. Un Rasgo puede ser Innato, Adquirido, Vincular o Condicional. Los Rasgos negativos no generan PR adicionales.

### Regla de autosuficiencia

Una opción de Rasgo presentada como **Disponible en creación** debe indicar coste, elección obligatoria, efecto, límites y apilamiento suficientes para escribirla en la ficha sin inventar una regla adicional.

Cuando un Rasgo exige elegir un sentido, peligro, afinidad, deidad, juramento, entidad o forma corporal, esa elección se registra al adquirirlo y no puede cambiarse entre escenas.

Un mismo Rasgo no puede adquirirse dos veces salvo que su entrada diga que posee grados. Un paquete racial y un Rasgo que describan exactamente la misma propiedad no se acumulan.

### Catálogo operativo de Rasgos

#### Sentido Agudo — 1 PR
**Tipo:** Innato. **Disponible en creación.**

Al adquirirlo elige un sentido ordinario que el personaje posea físicamente: vista, oído, olfato u otro sentido concreto aprobado por su anatomía.

**Efecto:** +1 a pruebas de **PER** únicamente cuando distinguir detalles sutiles mediante ese sentido sea determinante para la resolución.

**Límites:** no mejora Iniciativa, ataques, Investigación general ni otros sentidos; no atraviesa barreras ni convierte el sentido en sobrenatural. Varias fuentes equivalentes sobre el mismo sentido no se acumulan: se usa el mejor beneficio.

#### Visión en la Oscuridad — 2 PR
**Tipo:** Innato. **Disponible en creación.**

El personaje puede distinguir formas, movimiento, obstáculos y criaturas mediante visión en **oscuridad mundana completa hasta 6 espacios** como si existiera iluminación tenue suficiente para actuar.

**Límites:** no permite distinguir color ni detalle fino sin luz, no atraviesa humo, niebla, paredes u ocultación física y no vence oscuridad sobrenatural salvo que esa oscuridad lo permita expresamente. No concede un bono a PER: elimina únicamente la imposibilidad o penalización causada por falta de luz dentro de su alcance.

#### Anfibio — 1 PR
**Tipo:** Innato. **Disponible en creación.**

El personaje puede respirar aire y agua ordinarios de forma funcional.

**Límites:** no concede Movimiento de nado, no elimina pruebas de Natación, no protege de presión, temperatura, corrientes, contaminación, toxinas ni deshidratación y no permite respirar en un medio que no contenga una forma compatible de aire o agua.

#### Trepador Natural — 1 PR
**Tipo:** Innato. **Disponible en creación.**

La anatomía del personaje está adaptada a trepar. En una superficie físicamente trepable con apoyos razonables, cada espacio de ascenso o desplazamiento de escalada cuesta **1 punto de Movimiento** en lugar de tratarse por defecto como desplazamiento dificultado.

**Límites:** una pared lisa, techo, hielo, superficie móvil o ascenso peligroso puede seguir exigiendo **Atletismo** y equipo. El Rasgo no concede Movimiento adicional ni permite adherirse a superficies que no ofrecen apoyo físico.

#### Cola Prensil — 1 PR
**Tipo:** Innato. **Disponible en creación.**

El personaje posee una cola u órgano posterior capaz de sujetar y manipular objetos ligeros y físicamente compatibles. Puede transportar un objeto adicional y realizar con ese órgano una manipulación que normalmente sería posible con una mano, usando la **misma Acción** que corresponda.

**Límites:** no concede Acción, Reacción, ataque, recarga ni uso de objeto adicionales. No permite obtener simultáneamente el beneficio mecánico de un escudo mientras se emplea un arma de dos manos, ni satisface por sí sola una exigencia de precisión extraordinaria.

#### Miembros Extra — 2 PR
**Tipo:** Innato. **Disponible en creación.**

El personaje posee **un par adicional de miembros manipuladores funcionales**. Pueden sostener, transportar y manipular objetos apropiados y permiten mantener hasta dos objetos adicionales preparados físicamente.

**Límites:** no conceden Acciones, Reacciones, ataques, Bloqueos, recargas o Sostenimientos adicionales; no aumentan Carga; no permiten sumar varios escudos ni combinar el beneficio de un arma de dos manos con un escudo salvo regla expresa. Una tarea que requiera una Acción sigue consumiendo una sola Acción aunque intervengan varios miembros.

#### Corpulento — 2 PR
**Tipo:** Innato. **Disponible en creación.**

**Efecto:** Vida máxima **+4**.

**Límites:** no aumenta VIG, FUE, Escala, Defensa Corporal, umbral de Daño Grave ni Carga. No se acumula con **Masivo**; si una fuente posterior concede ambos, se usa sólo el mayor aumento de Vida.

#### Masivo — 3 PR
**Tipo:** Innato. **Disponible en creación.**

**Efecto:** Vida máxima **+8**.

**Límites:** no aumenta VIG, FUE, Escala, Defensa Corporal, umbral de Daño Grave ni Carga. No se acumula con **Corpulento**.

#### Vínculo Divino — 2 PR
**Tipo:** Vincular. **Disponible en creación.**

Al adquirirlo registra **una deidad o poder divino reconocido** y **un juramento concreto** coherente con uno de sus dominios o principios descritos en el Panteón del Manual.

**Efecto:** el personaje obtiene acceso a la **Fuente Divina** asociada a ese vínculo y puede satisfacer requisitos que exijan una Fuente Divina apropiada. Esto permite utilizar como Divinos los Hechizos o Rituales que el personaje haya adquirido legalmente y cuya ficción sea compatible con el vínculo.

**Límites:** no concede Habilidades, Disciplina, Hechizos, Maná, milagros, inmunidades ni autoridad religiosa. El juramento debe estar escrito. Una violación deliberada y grave del propio juramento puede **Suspender** el Vínculo: mientras esté Suspendido no puede emplearse como Fuente Divina. Restaurarlo exige una reparación narrativa coherente; no existe una penalización numérica adicional automática.

#### Familiar Mágico — 3 PR
**Tipo:** Vincular. **Disponible en creación.**

Crea un Familiar con **Vínculo I** utilizando uno de los cuatro Perfiles Iniciales cerrados del Paso 5: Compañero, Explorador, Guardián o Místico. El perfil determina sus números y el capítulo **14. Familiares, vínculos e invocaciones** regula autonomía, Acción Vinculada, comunicación y desarrollo.

El Rasgo no concede al personaje Maná, Acción, Reacción, ataque o reserva adicional. El Familiar es una entidad real con voluntad propia. Adquirirlo después de creación cuesta **6 PD** mediante progresión y requiere una justificación narrativa de vínculo.

#### Pacto Externo — 2 PR
**Tipo:** Vincular. **Disponible en creación en forma base.**

Al adquirirlo registra una **entidad externa concreta o categoría inequívoca**, una **Condición** que mantiene el pacto y un **Precio** que el personaje acepta pagar cuando corresponda.

**Efecto base:** concede acceso a la **Fuente Externa** asociada al pacto y permite satisfacer requisitos que exijan una Fuente Externa apropiada.

**Límites:** el Rasgo base no concede Habilidades, Disciplina, Hechizos, Maná, daño, Defensa ni un Don adicional gratuito. Si una campaña quiere que el pacto conceda además un poder específico, ese Don debe existir como Rasgo, Técnica, Hechizo o perfil de Pacto con coste explícito. Incumplir la Condición puede suspender el acceso a la Fuente y activar la Consecuencia definida por el propio pacto; la Consecuencia no puede inventarse después de adquirirlo.

#### Prótesis Mayor — 2 PR
**Tipo:** Adquirido. **Disponible en creación cuando la ficción lo justifica.**

El personaje posee una prótesis integrada que sustituye una extremidad u órgano funcional importante perdido, ausente o incompatible.

**Efecto:** la prótesis permite realizar las funciones ordinarias que esa parte corporal realizaría en un personaje sin lesión, dentro de límites anatómicos razonables.

**Límites:** no concede Atributos, Acción, ataque, Protección, herramientas integradas ni capacidades extraordinarias. Una prótesis con arma, blindaje, motor, almacenamiento, dispositivo arcano u otra función adicional debe pagar y cumplir las reglas de equipo, Proyecto o capacidad correspondiente.

#### Afinidad Sobrenatural — 1 PR
**Tipo:** Innato. **Disponible en creación.**

Al adquirirlo elige una **afinidad sobrenatural estrecha y concreta**, por ejemplo espíritus, fuego mágico, corrientes de Trama, sombras sobrenaturales o una categoría equivalente.

**Efecto:** +1 a pruebas de **PER** destinadas únicamente a advertir manifestaciones directamente perceptibles de esa afinidad.

**Límites:** percibir no equivale a identificar. No concede Arcana, Religión, Fuente, Disciplina, Hechizos, Maná ni información sobre causa, intención o funcionamiento. La afinidad elegida es fija salvo transformación significativa.

#### Resistencia Ambiental — 1 o 2 PR
**Tipo:** Innato. **Disponible en creación. Rasgo con grados.**

Al adquirirlo elige **una exposición ambiental concreta**: frío, calor, gran altitud, humedad extrema, deshidratación u otra amenaza comparable y estrecha.

- **Menor — 1 PR:** +1 a pruebas de **VIG** para resistir esa exposición.
- **Significativo — 2 PR:** en lugar del +1, obtiene **Ventaja** en las pruebas de VIG para resistir esa exposición.

**Límites:** los grados no se acumulan entre sí. No concede inmunidad, no protege de daño mágico o ataques que sólo compartan una descripción temática y no elimina necesidades de alimento, agua, descanso, aire o equipo salvo que otra regla lo diga.

#### Vuelo Natural — 4 PR
**Tipo:** Innato, Excepcional.

El personaje posee anatomía capaz de vuelo sostenido y puede volar hasta su Movimiento normal, usando las reglas ordinarias de Movimiento.

**Límites:** no concede Movimiento adicional, Acción o Reacción extra, maniobrabilidad perfecta ni inmunidad a caídas. Carga Pesada o Excesiva impide utilizarlo. Debe existir anatomía capaz de sostener el vuelo.

**Disponibilidad:** un personaje estándar sólo posee 3 PR en creación, por lo que **no puede comprar Vuelo Natural con su presupuesto ordinario de nivel 1**. Puede existir si un paquete racial, concesión expresa de campaña o futura regla de progresión lo habilita.

### Compatibilidad con Don sin Forma

Don sin Forma puede elegir gratuitamente únicamente Rasgos Generales compatibles con su propia regla. En el catálogo anterior son compatibles por defecto **Sentido Agudo, Visión en la Oscuridad, Trepador Natural, Afinidad Sobrenatural y Resistencia Ambiental**, siempre que el concepto explique la propiedad. No puede utilizarse para Vínculos, Pactos, Familiar Mágico, Prótesis derivada de un acontecimiento todavía inexistente, Corpulento, Masivo, Vuelo Natural ni para duplicar una capacidad racial.

## 6. Turno, movimiento y posición

En su turno una criatura dispone normalmente de **Movimiento + Acción + Reacción**. El Movimiento puede dividirse antes y después de la Acción cuando la situación lo permite. La Reacción se recupera al inicio del turno propio; una Reacción no utilizada se pierde al ser reemplazada por la nueva. Una capacidad que conceda varias Reacciones especifica cuántas pueden utilizarse entre dos turnos propios. La misma Reacción no se repite sobre el mismo disparador salvo regla expresa.

Un humanoide Mediano tiene como referencia Movimiento 6, aproximadamente 9 metros por turno. AGI no aumenta automáticamente el Movimiento. Correr requiere la Acción y añade otro tramo equivalente al Movimiento base. El terreno difícil cuesta 2 puntos de Movimiento por cada espacio recorrido. Levantarse desde Derribado cuesta normalmente 2 puntos.

Las bandas narrativas de distancia son Contacto, Cerca, Media, Lejos y Extrema. Cuando se usa cuadrícula, la geometría concreta prevalece. La cobertura parcial concede normalmente +2 Defensa; una cobertura total impide ser objetivo directo si no existe una línea válida. Tierra Mágica no concede un bono universal por rodear a un enemigo.

### Retirada en combate

Alejarse de un enemigo que te amenaza activamente no permite utilizar toda tu velocidad con libertad. Mientras retrocede, el personaje debe mantener la guardia, controlar la distancia, evitar exponer zonas vulnerables y estar preparado para responder a los movimientos del adversario.

**Regla:** si una criatura comienza un desplazamiento dentro del alcance cuerpo a cuerpo de un enemigo consciente y capaz de combatir, y se aleja voluntariamente de él, dispone para esa retirada de **la mitad de su Movimiento normal, redondeando hacia abajo**.

Ejemplos:

- Movimiento 5 -> retirada máxima 2;
- Movimiento 6 -> retirada máxima 3;
- Movimiento 7 -> retirada máxima 3;
- Movimiento 10 -> retirada máxima 5.

Esta reducción representa el cuidado necesario para abandonar un enfrentamiento sin simplemente darle la espalda al adversario.

**Correr para escapar.** Una criatura puede gastar su Acción en Correr después de iniciar una retirada. El tramo adicional concedido por Correr utiliza su Movimiento normal completo y no vuelve a reducirse a la mitad. De este modo, abandonar realmente un combate sigue siendo posible, pero exige sacrificar la Acción que podría haberse utilizado para atacar.

La reducción no se aplica a:

- desplazamiento forzado;
- teletransporte;
- una criatura Incapacitada o Inconsciente;
- un enemigo que ya no pueda amenazar físicamente al personaje;
- situaciones en las que el personaje no esté realmente abandonando el alcance cuerpo a cuerpo de una amenaza activa.

Salir del alcance cuerpo a cuerpo no provoca por sí mismo un Ataque de Oportunidad universal.

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
| Retirada en combate | al alejarse voluntariamente desde el alcance cuerpo a cuerpo de una amenaza activa, usa como máximo la mitad del Movimiento normal, redondeando hacia abajo; Correr añade después un tramo completo |
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

### Tipos de daño, resistencias y daño no letal

Todo efecto que cause daño posee un **Tipo de Daño** y un **Modo de Daño**. El tipo describe qué clase de agresión recibe el objetivo; el modo determina si esa pérdida de Vida puede producir las consecuencias ordinarias de una lesión letal.

La taxonomía canónica inicial es:

| Tipo | Familia / referencia |
|---|---|
| **Cortante** | filos, tajos y cortes físicos. |
| **Perforante** | puntas, proyectiles, estocadas y penetraciones físicas. |
| **Contundente** | golpes, aplastamiento e impactos físicos. |
| **Fuego** | combustión, llama y calor dañino. |
| **Frío / Hielo** | congelación, frío dañino y efectos gélidos. |
| **Eléctrico** | descarga y efectos fulminantes. |
| **Cinético** | fuerza, choque o impulso energético que no depende de un filo o proyectil material. |
| **Arcano** | energía mágica dañina sin otro tipo más específico. |
| **Divino** | daño expresamente declarado como manifestación divina. |
| **Tóxico** | daño producido por toxinas o venenos cuando una regla lo expresa como pérdida de Vida. |
| **Corrosivo** | ácidos, corrosión y degradación química dañina. |
| **Especial** | categoría de reserva para una fuente que no encaja todavía en otra entrada. |

**Fuente mágica y Tipo de Daño son conceptos distintos.** Utilizar la Fuente Divina no convierte automáticamente un efecto en daño Divino; un milagro de fuego puede causar Fuego y un efecto de Fuente Alma puede causar Arcano, Cinético u otro tipo si su entrada así lo declara.

El orden de mitigación es:

1. calcula el daño bruto;
2. calcula **Protección efectiva = max(0, Protección - Penetración)**;
3. resta la Protección efectiva cuando corresponda;
4. si existe **Inmunidad** al tipo, el daño final es 0;
5. si no existe Inmunidad, aplica **Resistencia** y **Vulnerabilidad** de ese tipo:  
   **Daño final = max(0, daño tras Protección + Vulnerabilidad - Resistencia)**;
6. aplica Vida y consecuencias.

La **Penetración sólo reduce Protección**; no reduce Resistencia. Varias Resistencias del mismo tipo no se suman: se utiliza la mayor. Varias Vulnerabilidades equivalentes tampoco se suman: se utiliza la mayor. La Inmunidad prevalece sobre Resistencia y Vulnerabilidad.

Foundry puede registrar tipos personalizados para una campaña. Esa capacidad es una extensión operativa: **un tipo personalizado no pasa a ser canon de Tierra Mágica hasta quedar definido en este Manual**.

El **Modo No letal** no es un tipo de daño ni puede poseer una Resistencia propia. Un ataque puede ser, por ejemplo, **Contundente + No letal**. El daño no letal reduce Vida normalmente y puede llevar a 0 Vida e Incapacitado, pero esa caída no aumenta Trauma y ese impacto no activa por sí solo el umbral de Daño Grave, una Herida Grave o Sangrado. Una capacidad puede establecer una excepción expresa.

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
| **Flexible** | Describe una construcción articulada o flexible. Puede justificar narrativamente métodos de maniobra cuando la ficción lo permita, pero no concede Alcance, Enganche, Desarmar mejorado, Defensa ni ataques adicionales por sí sola. |
| **Proyectil** | Arma a distancia que impulsa munición física simple según su propio perfil. No concede Recarga, recuperación automática de munición ni un bono adicional por sí sola. |
| **Arrojadiza** | El perfil representa el uso lanzado del arma y se resuelve como ataque a distancia con la Habilidad y Alcance óptimo indicados. No habilita por sí solo un segundo perfil cuerpo a cuerpo ni evita el gasto físico de haber arrojado el objeto. |
| **Alcance** | Cumple requisitos que mencionan arma de Alcance, como Recibir Carga. No añade por sí sola un número universal de espacios de alcance. |
| **Pesada** | Identifica armamento de gran masa/tamaño y normalmente usa Armas Pesadas. Sus requisitos de FUE, manos y otras propiedades siguen aplicándose. |
| **2 manos** | Requiere ambas manos disponibles para utilizar el arma normalmente. Un objeto sostenido con dos manos recibe además la protección contra Desarmar definida en Escala y maniobras. |
| **Potencia N** | En un arco, añade FUE al daño hasta un máximo de N puntos de FUE. Potencia N no es un bono separado: limita cuánto de la FUE del usuario puede añadirse al daño del arco. |
| **Recarga N** | Después de disparar, requiere N Acciones de Recarga antes del siguiente disparo. Recarga Experta puede reducir ese coste en 1 respetando los mínimos físicos. |
| **Repetición** | Describe un mecanismo de repetición. El núcleo actual no concede ataques adicionales, cargador infinito ni una capacidad universal de ráfaga por esta etiqueta. |

Cuando una propiedad descriptiva deba producir un modificador numérico concreto, esa regla debe aparecer en el arma, Técnica o subsistema pertinente.

### Armas canónicas

| Arma | Daño | Pen | FUE mín. | Precio | Propiedades principales |
|---|---:|---:|---:|---:|---|
| Daga | 3 | 0 | 0 | 6 p | Ligera, Ocultable |
| Espada corta | 4 | 0 | 0 | 1 o | Ligera |
| Sable | 4 | 0 | 0 | 1 o 5 p | Ágil |
| Cadena corta de combate | 4 | 0 | 0 | 1 o | Flexible, Impactante |
| Látigo | 2 | 0 | 0 | 5 p | Flexible |
| Látigo reforzado | 3 | 0 | 0 | 1 o | Flexible, Impactante |
| Espada larga | 5 | 0 | 1 | 2 o | Versátil |
| Hacha | 6 | 0 | 2 | 2 o 5 p | Impactante |
| Maza | 5 | 1 | 1 | 1 o | Impactante |
| Martillo de guerra | 6 | 2 | 2 | 3 o | Impactante |
| Lanza | 5 | 0 | 1 | 5 p | Alcance, 2 manos |
| Alabarda | 7 | 1 | 2 | 3 o | Alcance, Pesada, 2 manos |
| Mandoble | 7 | 0 | 2 | 4 o | Pesada, 2 manos |
| Gran hacha | 8 | 0 | 3 | 5 o | Pesada, 2 manos |
| Gran martillo | 7 | 2 | 3 | 5 o | Pesada, 2 manos |
| Honda | 3 | 0 | — | 2 p | Proyectil |
| Honda de guerra | 4 | 0 | — | 5 p | Proyectil, Impactante |
| Fustíbalo | 5 | 0 | — | 8 p | Proyectil, Impactante, 2 manos |
| Azagaya | 3 | 0 | 0 | 2 p | Arrojadiza |
| Jabalina | 4 | 0 | 0 | 3 p | Arrojadiza |
| Jabalina pesada | 5 | 0 | 1 | 5 p | Arrojadiza |
| Arco corto | 4 | 0 | — | 1 o | Potencia 2 |
| Arco largo | 5 | 1 | — | 2 o | Potencia 3, 2 manos |
| Ballesta | 6 | 1 | — | 3 o | Recarga 1 |
| Ballesta pesada | 8 | 2 | — | 5 o | Recarga 2, 2 manos |
| Pistola temprana | 6 | 2 | — | 10 o | Recarga 2 |
| Rifle temprano | 7 | 3 | — | 18 o | Recarga 2, 2 manos |
| Pistola repetidora | 6 | 1 | — | 35 o | Repetición |
| Rifle repetidor | 7 | 2 | — | 45 o | Repetición, 2 manos |

Los arcos con **Potencia N** añaden FUE al daño hasta un máximo de N puntos de FUE. Por ejemplo, un arco largo Potencia 3 utilizado por un personaje con FUE 2 añade +2 al daño; con FUE 4 añade como máximo +3. Potencia N no es un bono adicional separado. Ballestas y armas de fuego no añaden FUE al daño salvo regla expresa.

### Proyectiles convencionales

Los siguientes perfiles utilizan **Armas a Distancia** y **AGI** para la tirada de ataque. En los seis casos se añade **FUE al daño** porque el perfil ya lo establece; esto no crea un bono adicional separado.

| Arma | Alcance óptimo | Uso |
|---|---:|---|
| Honda | 12 espacios | proyectil simple de una mano |
| Honda de guerra | 18 espacios | proyectil de mayor potencia; Impactante sigue siendo descriptiva |
| Fustíbalo | 25 espacios | proyectil de dos manos y gran palanca |
| Azagaya | 12 espacios | arma arrojada ligera |
| Jabalina | 10 espacios | arma arrojada estándar |
| Jabalina pesada | 8 espacios | arma arrojada de mayor masa; FUE mínima 1 |

**Proyectil** no significa munición infinita. Una Honda o Fustíbalo necesita un proyectil físico compatible cuando la munición sea relevante. **Arrojadiza** representa específicamente el uso lanzado: después de arrojar una Azagaya o Jabalina, ese objeto ya no está en la mano hasta que se recupere o se disponga de otro. El núcleo no concede una recuperación automática después del ataque.

Estos perfiles no poseen **Recarga** ni **Repetición** y no producen ataques adicionales. Tampoco convierten una Azagaya o Jabalina en una Lanza cuerpo a cuerpo gratuita: si un objeto se utiliza de otra forma, debe existir un perfil apropiado o resolverse como uso improvisado conforme a la ficción.


### Armas flexibles ligeras

Cadena corta de combate, Látigo y Látigo reforzado usan **Armas Ligeras** y **AGI** para atacar. Los tres perfiles añaden **FUE al daño** porque así lo establece cada entrada.

| Arma | Daño | Pen | FUE mín. | Precio | Propiedades |
|---|---:|---:|---:|---:|---|
| Cadena corta de combate | 4 + FUE | 0 | 0 | 1 o | Flexible, Impactante |
| Látigo | 2 + FUE | 0 | 0 | 5 p | Flexible |
| Látigo reforzado | 3 + FUE | 0 | 0 | 1 o | Flexible, Impactante |

**Flexible no equivale a Alcance.** Estas armas no satisfacen requisitos de arma de Alcance como Recibir Carga y no atacan automáticamente a más espacios que un arma cuerpo a cuerpo ordinaria.

Una cadena o látigo puede ser un método ficcional válido para intentar Desarmar, Derribar, sujetar un objeto u otra maniobra cuando la posición y el objetivo lo permitan. Esa justificación no concede Ventaja, modificadores, alcance extra ni cambia la Defensa de Maniobra. La maniobra sigue usando las reglas universales y el Atributo/Habilidad apropiados.


### Catálogo ampliado aprobado de armas

Además de los **29 perfiles canónicos** de la tabla anterior, el catálogo oficial de Foundry contiene **171 variantes de perfil aprobadas**. Cada variante usa **exactamente** las estadísticas, Habilidad, Atributos, Daño, Penetración, FUE mínima, Alcance, Recarga, Potencia, propiedades y precio de su perfil de referencia, salvo que una regla posterior la convierta explícitamente en un perfil distinto.

El nombre histórico, cultural, regional o funcional **no crea un modificador adicional**. Esta lista forma parte del catálogo oficial del Manual:

- **Daga:** Cuchillo de combate, Cuchillo de monte, Cuchillo de marinero, Puñal ancho, Daga curva, Daga de abordaje, Estilete, Daga de parada, Daga de misericordia, Garra de combate, Katar, Pico de combate corto.
- **Espada corta:** Espada de caza, Gladio, Falcata corta, Kukri, Machete, Seax, Garrote corto, Cachiporra, Porra reforzada, Martillo ligero, Tonfa reforzada, Bastón corto, Hachuela, Hoz de guerra, Hoja de bosque de Erelia.
- **Sable:** Estoque corto, Rapier, Espadín, Espada de duelo, Sable del Camino Real, Sable de Cobravia, Estoque de Lys, Sable solar de Heliara.
- **Espada larga:** Espada bastarda, Espada ancha, Espada de caballería, Espada de infantería, Espada de oficial, Espada de abordaje, Alfanje, Cimitarra, Shamshir, Kilij, Kopis, Falchion, Estoque, Rapiera militar, Montante corto, Hoja de Auraval, Espada de Vigilia, Espada académica de Lys, Alfanje de las Mesetas.
- **Hacha:** Hacha de batalla, Hacha barbada, Hacha de abordaje, Hacha de jinete, Hacha de infantería, Francisca, Hacha del Espinazo, Hacha de abordaje de Bronce, Hacha de guardabosques.
- **Maza:** Maza de armas, Maza con aletas, Mangual, Mangual militar, Bastón de guerra, Bastón ferrado, Bastón de custodio de Lys.
- **Martillo de guerra:** Lucerna corta, Martillo de caballería, Pico de guerra, Bec de corbin corto, Martillo-pico, Martillo de Kar-Dur, Pico de Forjador Kharum.
- **Lanza:** Lanza corta, Lanza de guerra, Lanza de caballería, Partisana, Ranseur, Tridente, Horca militar, Guja corta, Lanza de Guardia Valdoriana, Lanza del Bosque Profundo, Lanza del Sol.
- **Mandoble:** Zweihänder, Espadón, Montante, Claymore, Flamberge, Gran falchion, Gran machete de guerra.
- **Gran hacha:** Hacha danesa, Hacha de verdugo, Hacha doble, Hacha larga de guerra.
- **Gran martillo:** Martillo de asedio, Gran maza, Maza de dos manos, Pico pesado, Mayal de dos manos, Cadena de guerra pesada, Gran martillo de Forja.
- **Alabarda:** Lucerna, Bec de corbin, Alabarda de guerra, Guja, Guja pesada, Bardiche, Voulge, Pollaxe, Martillo de asta, Lanza pesada, Pica, Pica larga, Tridente pesado, Alabarda del Espinazo.
- **Arco corto:** Arco de caza, Arco compuesto, Arco recurvo, Arco corto montado, Arco naval, Arco del Desierto de Vidrio.
- **Arco largo:** Arco de guerra, Arco largo de guerra, Arco de precisión, Arco de Verdelinde, Arco de los Altos Valles.
- **Ballesta:** Ballesta de mano, Ballesta ligera, Ballesta de caza, Ballesta militar, Ballesta de estribo, Ballesta de palanca, Ballesta de abordaje, Ballesta de precisión, Ballesta de Kar-Dur.
- **Ballesta pesada:** Ballesta de torno, Arbalesta, Ballesta de asedio portátil.
- **Pistola temprana:** Pistola de chispa, Pistola de rueda, Pistola de duelo, Pistola militar, Pistola de caballería, Pistola de abordaje, Pistola de bolsillo, Pistola de Cobravia.
- **Pistola repetidora:** Pistola pepperbox, Revólver temprano, Revólver pesado, Revólver de oficial, Pistola de precisión.
- **Rifle temprano:** Mosquete, Arcabuz, Carabina, Carabina de caballería, Fusil de infantería, Rifle de caza, Rifle largo, Rifle de precisión, Rifle pesado, Carabina de Bronce, Rifle de Taller.
- **Rifle repetidor:** Rifle de palanca, Rifle de cerrojo temprano, Carabina repetidora, Rifle repetidor pesado.

Las variantes regionales mantienen su procedencia como dato de catálogo, pero la región no concede por sí sola bonos de ataque, daño, Defensa, Penetración, disponibilidad automática o descuento de precio.

**Estado de expansión no canónica.** Permanecen fuera del Compendio **44 propuestas**: 7 Armas Ligeras arrojadizas que requieren separar modo de ataque y Habilidad; 10 armas de varios cañones o dispersión; 2 armas que necesitan un Perfil de Material explícito; y 25 armas arcano-industriales que necesitan un Perfil explícito de Host/Módulo/Device/arma vinculada. CRAFT-13 ya cerró la infraestructura de Materiales, fabricación y Energía, pero no autoriza inferir esos perfiles por el nombre.

### Munición y Recarga

Un ataque con un arma que utiliza munición consume normalmente **1 unidad de munición** cuando el disparo se realiza, acierte o falle.

Unidades comerciales canónicas:

- 20 flechas = **2 p**;
- 20 virotes = **3 p**;
- 12 disparos ordinarios de arma de fuego = **5 p**.

**Munición perforante.** Flechas y virotes pueden adquirirse en versión perforante. Cada unidad consumida concede **Pen +1** al disparo realizado con ella, hasta **Pen 3** por esta vía. Este aumento se suma a la Penetración base del arma, pero no se acumula con otra munición especial equivalente aplicada al mismo disparo.

- 20 flechas perforantes = **4 p**;
- 20 virotes perforantes = **6 p**.

La munición perforante no aumenta Daño, no modifica la tirada de ataque y se consume normalmente aunque el disparo falle.

La compra cubre esa cantidad física real. Dividir el lote divide también su valor proporcional.

No existe un porcentaje universal de recuperación de flechas o virotes después de un combate. Pueden recuperarse unidades intactas cuando la ficción, el lugar y el tiempo de búsqueda lo permitan; un proyectil roto, perdido o inaccesible se pierde.

**Recarga N** consume Acciones, no Movimiento. Pueden repartirse las Acciones de Recarga entre turnos si el arma y la situación siguen bajo control del personaje. Una interrupción no borra automáticamente una Acción de Recarga ya completada, salvo que físicamente deshaga el proceso.

### Armaduras

| Armadura | Prot | FUE mín. | Precio |
|---|---:|---:|---:|
| Armadura ligera | 1 | 0 | 1 o 5 p |
| Armadura reforzada | 2 | 0 | 4 o |
| Malla | 3 | 1 | 10 o |
| Armadura pesada | 4 | 3 | 16 o |
| Placas | 5 | 3 | 40 o |

Sólo se aplica la **Protección relevante más alta** entre capas equivalentes salvo regla expresa. Vestir varias armaduras no suma toda su Protección.

Con FUE un punto por debajo del mínimo, Movimiento -1, Carga Pesada y Desventaja en acciones físicas relevantes. Con dos o más puntos por debajo, la armadura no puede usarse competentemente en combate sin una capacidad específica, aunque su material siga ofreciendo Protección cuando corresponda. Una armadura ruidosa puede causar Desventaja a Sigilo cuando el ruido sea relevante.

**Armadura y magia.** Llevar armadura no provoca fallo mágico, penalización a Canalización o penalización a Ritualismo por sí solo. Tierra Mágica no usa una restricción universal de “mago sin armadura”. Las penalizaciones por no cumplir FUE mínima se aplican a las acciones físicas para las que sean relevantes, no automáticamente a una tirada mágica. Un escudo, arma o armadura sólo dificulta un hechizo si la entrada concreta exige manipular un foco, componente, objeto o movimiento que ese equipo haga imposible.

### Catálogo ampliado aprobado de armaduras

Los cinco perfiles anteriores son las únicas anclas mecánicas de armadura del catálogo actual. El Compendio añade **89 variantes aprobadas**, todas copias mecánicas exactas de uno de esos cinco perfiles:

- **Armadura ligera:** Gambesón, Aketón, Jubón acolchado, Chaqueta acolchada, Cota de cuero, Chaleco de cuero, Cuero de cazador, Cuero de explorador, Casaca de guardia ligera, Peto de cuero ligero, Armadura de viajero, Armadura de montañés, Cuero de jinete, Vestidura de campaña acolchada, Chaqueta de escaramuzador, Gambesón de galería Kharum, Casaca portuaria de Cobravia, Cuero de Verdelinde, Jubón de campo de Lys, Casaca de caravana solenaria.
- **Armadura reforzada:** Gambesón reforzado, Cuero hervido, Cota de cuero reforzada, Brigantina ligera, Jack de placas, Casaca claveteada, Coselete de láminas, Coraza de escamas ligera, Lamelar ligera, Chaqueta de anillas, Armadura de guardia, Coraza de frontera, Peto segmentado ligero, Casaca de combate reforzada, Armadura de mercenario, Coselete de Auraval, Brigantina de Kar-Dur, Brigantina cobravia, Coraza forestal reforzada, Coselete académico de Lys, Coraza de peregrino de Heliara.
- **Malla:** Cota de malla, Camisa de malla, Haubergeon, Hauberk, Loriga de malla, Malla de caballería, Malla de infantería, Malla de guardia, Malla de campaña, Malla corta, Malla con faldón, Malla de viaje, Malla de Guardia Valdoriana, Malla del Espinazo, Malla de muelle de Bronce, Malla de guardabosques de Erelia, Malla de custodio de Lys, Malla del Sol.
- **Armadura pesada:** Brigantina pesada, Lamelar pesada, Coraza de escamas, Malla con placas, Coraza segmentada, Armadura de placas parciales, Armadura de caballería pesada, Armadura de guardia pesada, Coraza de guerra, Arnés parcial, Armadura de infantería pesada, Armadura de frontera pesada, Armadura de Vigilia, Arnés de Taller de la Liga, Arnés de frontera Ereliana.
- **Placas:** Arnés completo, Armadura de placas completa, Placas de campaña, Placas de caballería, Placas de infantería, Placas de guardia, Arnés de guerra, Arnés de campo, Armadura articulada de placas, Coraza de placas completa, Placas de comandante, Placas del Camino Real, Placas del Bastión Kharum, Placas de Custodia Lysendrina, Placas de Guardia de Heliara.

Dentro de esas variantes hay **24 armaduras regionales**, cuatro por cada región principal: Valdoria, Kharum, Liga de Bronce, Erelia, Lysendra y Solenar. La procedencia regional no modifica Protección, FUE mínima, precio, Sigilo, resistencia elemental ni Capacidad Rúnica.

**No canónicas todavía:** Armadura de cristal, Placas de cristal y Coraza de madera viva necesitan un Perfil de Material explícito; Armadura resonante, Arnés de acumulador y Placas cinéticas necesitan un Perfil Host/Módulo/energético explícito. CRAFT-13 ya cerró esas autoridades, pero los nombres no conceden propiedades por inferencia.

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

### Catálogo ampliado aprobado de escudos

Los tres perfiles anteriores siguen siendo las únicas anclas mecánicas de escudo. El Compendio añade **51 variantes aprobadas**, todas copias exactas de Broquel, Escudo estándar o Escudo pesado:

- **Broquel:** Rodela pequeña, Broquel de duelo, Broquel de infantería, Broquel redondo, Broquel de jinete, Broquel de abordaje, Escudo de antebrazo, Broquel con umbo, Broquel de guardia, Broquel de Auraval, Broquel de Kar-Dur, Broquel de Cobravia, Broquel de Verdelinde, Broquel académico de Lys, Broquel solar de Heliara.
- **Escudo estándar:** Escudo redondo, Escudo cometa, Escudo calefactor, Escudo oval, Escudo de caballería, Escudo de infantería, Escudo de abordaje, Escudo de guardia, Escudo de campaña, Escudo de madera forrada, Escudo de cuero tensado, Rodela de guerra, Escudo del Camino Real, Escudo del Espinazo, Escudo portuario de Bronce, Escudo forestal de Erelia, Escudo de custodio de Lys, Escudo del Sol.
- **Escudo pesado:** Escudo torre, Pavés, Escudo torre de asedio, Escudo de muro, Escudo de legionario pesado, Escudo de guardia pesada, Escudo de brecha, Escudo de fortaleza, Escudo de formación, Escudo rectangular pesado, Escudo de campaña pesado, Pavés de ballestero, Escudo torre valdoriano, Pavés de Kar-Dur, Escudo de muelle pesado de Cobravia, Escudo de frontera Ereliana, Escudo de Guardia Lysendrina, Pavés solar de Heliara.

Hay **18 variantes regionales**, tres por cada región principal. La forma, nombre o procedencia no concede Defensa pasiva adicional, un Bloqueo extra, una Reacción adicional ni cobertura automática.

En particular, **Pavés**, **Escudo torre** y nombres equivalentes usan el perfil de Escudo pesado: no generan cobertura total por el nombre del Item. La cobertura sólo aparece cuando la posición, terreno u otra regla la producen.

**No canónicos todavía:** Escudo de cristal, Escudo de madera viva y Pavés de piedra viva necesitan un Perfil de Material explícito; Escudo resonante, Escudo de acumulador y Escudo cinético necesitan un Perfil Host/Módulo/energético explícito. CRAFT-13 ya cerró esas autoridades, pero los nombres no conceden Defensa, cobertura ni Energía por inferencia.

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
| Kit Artesano | 1 o |
| Kit Ingeniería de campo | 2 o |
| Kit Minería | 1 o |
| Kit Médico | 2 o |
| Kit Alquimia de campo | 2 o |
| Kit Infiltración | 1 o |
| Kit Cartográfico | 1 o |
| Kit Navegación | 2 o |
| Kit Campaña | 1 o |
| Kit Escalada | 1 o |
| Kit Escribanía | 5 p |
| Kit Mercantil | 1 o |
| Kit Académico | 2 o |
| Kit Instrumental Arcano de campo | 2 o |
| Kit Mantenimiento de armas de fuego | 1 o |

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

### Estado del catálogo EQP-01

Los **25 objetos** ya enumerados en las tablas de Equipo, Kits y Suministros de este capítulo son Items canónicos del Compendio y conservan exactamente sus precios y usos publicados.

Además existe una expansión estructurada de **75 propuestas que todavía no son equipo canónico**. Su presencia en el catálogo de diseño no autoriza compra, precio, bono o efecto hasta que la auditoría correspondiente las promueva.

Las **65 propuestas mundanas** pendientes de precio y uso fino son:

- **Campamento:** Mochila de viaje, Saco de dormir, Manta de lana, Tienda individual, Tienda para cuatro, Lona impermeable, Utensilios de cocina, Olla de campaña, Cantimplora, Odre, Pedernal y acero, Mosquitero.
- **Escalada y carga:** Cuerda de cáñamo 10 m, Cuerda de cáñamo 20 m, Arnés de escalada, Pitones, 10, Martillo de pitones, Polea simple, Polea doble, Escalera de cuerda, Red de carga, Correa de aseguramiento.
- **Iluminación y señalización:** Antorcha, Farol cerrado, Farol de mano, Lámpara de aceite, Velas, 10, Mecha de repuesto, Espejo de señales, Brasero portátil.
- **Navegación y cartografía:** Brújula magnética, Astrolabio, Sextante, Regla y compás cartográfico, Cuaderno de campo, Plomada de sondaje, Reloj de arena, Banderines de señal, Silbato de señales, Baliza reflectante.
- **Medicina e higiene:** Vendas limpias, 5 usos, Férulas de campaña, Tijeras médicas, Aguja e hilo quirúrgico, Jabón, Toalla, Mascarilla de tela, Guantes de trabajo.
- **Contenedores y acceso:** Bolsa de cinturón, Saco de lona, Cofre pequeño, Cofre mediano, Tubo portaplanos, Carcaj, Bandolera de herramientas, Estuche de arma corta, Funda impermeable grande.
- **Herramientas:** Martillo, Serrucho, Hacha de leñador, Cincel, Tenazas, Barrena, Lima, Azada.

Las **10 propuestas especiales bloqueadas** son: Lámpara arcana portátil, Visor espectral, Brújula de Trama, Herramienta motorizada de campo, Polea cinética, Mochila de acumulador, Baliza arcana de navegación, Caja de conservación rúnica, Lámpara de cristal resonante, Kit de reparación de cristal vivo.

Las propuestas mundanas anteriores no tienen precio oficial todavía. Las especiales tampoco reciben Energía, Caudal, Estabilidad, capacidad rúnica, propiedades mágicas o efectos de material por inferencia. CRAFT-13 ya aporta la infraestructura necesaria; cada propuesta especial sigue requiriendo un Perfil explícito antes de entrar al runtime.

### Consumibles, pociones y fórmulas

Un consumible existe como **cantidad física**. Conocer una Fórmula no crea dosis.

Reglas generales:

- usar una dosis consume esa dosis;
- si su Activación es Acción, consume la Acción;
- una dosis no puede utilizarse dos veces;
- una misma exposición física resuelve una sola dosis salvo Perfil específico de dosificación; acumular varias dosis en el mismo vehículo no multiplica resoluciones;
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

Sus precios monetarios están **ratificados en CRAFT-11 — Catálogo de proyectos y recetas de referencia**. Un precio histórico no se convierte por inferencia cuando una entrada distinta siga sin valoración vigente.

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

Estados de una Herida Grave: **Activa -> Controlada -> Tratada -> Recuperada**. La naturaleza de la lesión toma como referencia el Tipo de Daño que produjo el impacto. La antigua categoría genérica **Térmico** queda sustituida por los tipos separados **Fuego** y **Frío / Hielo**.

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

**Daño tras Protección = max(0, daño base + bonos permitidos - Protección efectiva).**

Después se aplican Inmunidad, Resistencia y Vulnerabilidad del **Tipo de Daño** exactamente igual que en cualquier otro impacto. El hechizo especifica su Tipo de Daño y Modo; usar magia no crea por sí mismo un tipo universal «Mágico».

El hechizo especifica si añade algún Atributo al daño. No se añade uno por defecto sólo porque la tirada haya usado INT, PRE, PER u otro Atributo.

La Penetración nunca vuelve negativa la Protección ni reduce Resistencia.

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
| Proyectil Ígneo | Básico | 3 | INT + Canalización contra Defensa; alcance Medio; Daño 6, Pen 2. |
| Onda de Choque | Básico | 4 | Área frontal corta; Daño 4, Pen 0; una tirada se compara con la Defensa de cada objetivo. Empuja 1 espacio cuando corresponda; aliados incluidos salvo discriminación expresa. |
| Barrera Cinética | Básico | 3 | Reacción; +2 Defensa normal sólo contra el ataque declarado; se consume al resolverlo. |
| Aguja Gélida | Avanzado | 5 | INT + Canalización contra Defensa; alcance Medio; Daño 5, Pen 2. Si impacta, Movimiento -2 hasta el final del siguiente turno del objetivo, mínimo 1. No se acumula; repetir refresca. |
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

Un Familiar usa un perfil simplificado: Escala, Movimiento, Vida, Defensa, Protección, Ataque, Daño, Percepción, Resistencia, Voluntad, Rasgos y capacidades relevantes. No obtiene por defecto un segundo depósito completo de Maná. Si una criatura concreta posee Maná por su propia naturaleza, esa excepción debe estar expresamente definida.

En Vínculo I se utilizan los cuatro **Perfiles Iniciales del Paso 5**. Para pruebas simplificadas usa PER, RES o VOL directamente como bono; Defensa Mental es 11 + VOL y Defensa Corporal es 11 + RES. Un ataque del Familiar usa 2d10 + Ataque contra Defensa y su Daño listado.

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

Los perfiles **Compañero, Explorador, Guardián y Místico** son las plantillas numéricas iniciales de creación definidas en el Paso 5. No son clases y no progresan automáticamente: fijan el perfil de Vínculo I con el que el Familiar entra en juego. Cambiar de perfil después de comenzar la campaña requiere reconstrucción autorizada o una transformación real, no una elección entre escenas.

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

### Dosis y aplicaciones

Una **dosis** es la unidad mecánica preparada por la Fórmula.

- una aplicación válida consume normalmente una dosis;
- colocar varias dosis de la misma preparación en un único vehículo, arma, recipiente o superficie **no crea varias resoluciones simultáneas**;
- una misma exposición física se resuelve como una sola aplicación salvo que una Fórmula o dispositivo de dosificación defina expresamente otra cosa;
- dosis adicionales deben permanecer separadas o aplicarse mediante exposiciones válidas posteriores;
- mezclar Fórmulas distintas no crea automáticamente una combinación de efectos estable: si la compatibilidad no está catalogada, corresponde CRAFT-10 o una consecuencia contextual.

Esto impide multiplicar resistencias, daño o recuperación apilando físicamente consumibles sobre una única activación.

| Fórmula | Grado | Precio | Familia / vía | Efecto |
|---|---|---:|---|---|
| Bálsamo Restaurador | Común | 5 p | Restaurativa | +4 Vida; no Trauma ni Herida Grave. |
| Poción Restauradora | Común | 8 p | Restaurativa / oral | Acción: +4 Vida hasta máximo y límites de lesión. |
| Poción de Recuperación Arcana | Refinada | 1 o 5 p | Arcana / oral | Acción: +3 Maná hasta máximo; no elimina Fatiga ni Sobrecarga. |
| Tónico de Vigor | Refinada | 8 p | Potenciador | Ventaja en una prueba de VIG por esfuerzo prolongado. |
| Supresor del Dolor | Refinada | 8 p | Analgésica | Ignora una Desventaja causada por dolor compatible; no repara lesión. |
| Neutralizante Común | Refinada | 1 o | Antitóxica | Nueva resistencia con Ventaja contra una toxina compatible. |
| Toxina Debilitante | Compleja | 1 o 5 p | Sangre | VIG DF14; fallo: Desventaja en acciones físicas dependientes de fuerza muscular. |
| Bomba Incendiaria | Compleja | 3 o | — | Área pequeña, Daño 6 de Fuego, Pen 1; requiere colocación válida. |

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

### Fabricar un objeto: paso a paso

Si es la primera vez que utilizas el sistema de fabricación, no necesitas memorizar todo el capítulo antes de empezar. Para fabricar un objeto, sigue este orden.

> **La idea más importante:** si conoces cómo se fabrica el objeto, tienes la competencia necesaria, los materiales, las herramientas, la instalación y el tiempo, **normalmente no haces ninguna tirada**. Fabricar bien algo que sabes fabricar es una tarea rutinaria.

#### Paso 1 — Decide qué quieres fabricar

Elige el objeto exacto que quieres obtener.

Puede ser un arma, una armadura, una herramienta, una fórmula alquímica, un dispositivo, una modificación u otro Proyecto permitido.

Después busca su **receta**. La receta te dice qué necesitas y cuánto tiempo lleva. Las recetas ordinarias de armas, armaduras, escudos, munición, herramientas y Kits están en **CRAFT-03**; otros proyectos preparados para usar aparecen en **CRAFT-11** y en los CRAFT correspondientes.

No empieces calculando tiradas. Empieza por la receta.

#### Paso 2 — Elige la versión que quieres fabricar

Antes de reunir materiales, define qué versión del objeto quieres obtener.

Por ejemplo:

- Común, Superior o Excepcional;
- material ordinario o especial;
- con o sin Modificaciones;
- con runas, encantamientos o componentes especiales cuando la receta lo permita.

La versión elegida puede cambiar el coste, el tiempo, la competencia o la instalación necesaria.

Si sólo quieres el objeto normal del catálogo, utiliza su versión **Común**.

#### Paso 3 — Comprueba si sabes hacerlo

Mira la **Disciplina Principal** de la receta y comprueba:

- la Habilidad necesaria;
- el rango mínimo;
- la Especialización requerida, si existe;
- cualquier Disciplina Auxiliar indispensable.

Si cumples esos requisitos, puedes seguir.

Si no los cumples, una tirada alta no compensa la falta de formación. Necesitas aprender, conseguir ayuda competente o utilizar otro procedimiento permitido.

#### Paso 4 — Comprueba si necesitas Plano, Fórmula o Diseño

Muchas cosas ordinarias forman parte del conocimiento normal de un oficio.

Otras recetas indican que necesitas un **Plano**, **Fórmula**, **Patrón** o procedimiento estable.

Si la receta lo exige, debes poseerlo o conocer de forma estable ese diseño. Tener el Plano no reemplaza la Habilidad necesaria: te enseña qué construir, pero todavía debes saber construirlo.

#### Paso 5 — Reúne los materiales

Calcula el **Coste de Materiales (CM)** de la receta y reúne los materiales o componentes necesarios.

Cuando una receta no tenga un coste propio, la regla general de CRAFT-02 utiliza normalmente:

**CM = 50% del Valor de Referencia (VR), redondeado hacia arriba al cobre.**

El CM representa los materiales ordinarios consumidos durante la fabricación. Componentes especiales, cristales, runas, acumuladores u otras piezas con precio propio se consiguen aparte cuando la receta lo indique.

Pagar el CM no hace aparecer materiales de la nada: debe existir acceso real a ellos.

#### Paso 6 — Consigue herramientas e instalación

Comprueba qué **herramientas** y qué **instalación mínima** exige la receta.

Puedes utilizar recursos propios, prestados o alquilados.

Una forja, laboratorio, taller o instalación necesaria no se reemplaza automáticamente con una tirada. Si falta algo esencial, primero debes conseguirlo.

#### Paso 7 — Calcula cuánto tiempo necesitas

La receta indica el **tiempo base de trabajo efectivo**.

Una **Jornada de Trabajo** equivale aproximadamente a 8 horas de trabajo productivo.

Aplica después cualquier cambio obligatorio por Calidad, material especial, escala u otra regla de la receta.

No necesitas realizar una tirada por cada hora o por cada jornada. El tiempo simplemente se invierte en hacer el trabajo.

#### Paso 8 — Decide si hace falta tirar

Hazte una sola pregunta:

**¿Estoy fabricando normalmente, con todo lo necesario y sin una complicación especial?**

Si la respuesta es **sí**, no tiras. Inviertes los materiales y el tiempo y completas el objeto.

Sólo aparece una prueba cuando existe una incertidumbre real, por ejemplo:

- estás acelerando el trabajo;
- trabajas bajo presión o peligro;
- improvisas;
- utilizas medios peores de los requeridos pero todavía viables;
- adaptas un diseño;
- trabajas con un material inestable;
- reparas un daño extraño;
- construyes un prototipo;
- realizas una etapa experimental.

Cuando exista una prueba, se resuelve con el motor normal:

**2d10 + Atributo + Habilidad + modificadores >= DF**

No se repite la misma tirada una y otra vez hasta obtener un buen resultado.

#### Paso 9 — Termina y registra el objeto

Cuando completas el tiempo requerido y resuelves cualquier incertidumbre pendiente, obtienes exactamente el objeto definido por la receta y por las opciones que pagaste.

Anota sus datos importantes:

- objeto;
- Calidad;
- material especial, si posee uno;
- Modificaciones;
- runas, encantamientos o componentes especiales;
- cualquier propiedad propia de su receta.

Fabricarlo personalmente **no mejora sus estadísticas por sí solo**. Una espada Común fabricada por un personaje sigue siendo una espada Común. Las mejoras deben proceder de Calidad, materiales, Modificaciones, runas, dispositivos u otras reglas expresas.

#### Ejemplo sencillo — Fabricar una espada larga Común

Un personaje quiere fabricar una **Espada larga Común**.

La receta indica:

- **VR:** 2 o;
- **CM:** 1 o;
- **Complejidad:** Complejo;
- **Principal:** Artesanía Experta · Forja y metal;
- **Instalación:** Profesional;
- **Tiempo:** 2 Jornadas.

El personaje posee Artesanía Experta con Forja y metal, conoce el diseño, consigue materiales por valor de 1 o, dispone de una instalación Profesional y puede dedicar 2 Jornadas al trabajo.

No hay peligro, improvisación, aceleración ni otra incertidumbre.

**Resultado:** no realiza ninguna tirada. Consume los materiales, trabaja durante 2 Jornadas y obtiene una **Espada larga Común**.

Eso es el funcionamiento normal del sistema de fabricación.

> **Resumen rápido:** elige la receta → comprueba competencia y diseño → reúne materiales → consigue herramientas e instalación → invierte el tiempo → tira sólo si existe una complicación real → registra el objeto terminado.

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
- varias deficiencias no acumulan múltiples Desventajas, conforme a la regla general, **pero siguen existiendo como condiciones separadas**: pueden aumentar tiempo, restringir métodos, agravar consecuencias o volver el procedimiento materialmente imposible;
- recibir Ventaja de Ayuda técnica puede cancelar la Desventaja en los dados, pero **no convierte herramientas/instalación deficientes en adecuadas ni elimina sus demás consecuencias**;
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

**Fallo:** la etapa no se pierde, pero la prisa genera retrabajo; terminarla requiere tiempo adicional hasta que el tiempo total invertido alcance **125% del TBA** de esa etapa, salvo que una consecuencia física concreta exija otra cosa.

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
- los porcentajes de **materiales de reparación** usan la **BRA de CRAFT-02**: preservar la Calidad incorpora VRQ y las capas posteriores sólo entran cuando la consecuencia afecta realmente esa parte;
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

Ejemplo: una Bomba Incendiaria mantiene **área pequeña, Daño 6 de Fuego, Pen 1**. El Armazón no aumenta Daño, Pen ni área.

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
- **Activación:** Reacción cuando el usuario va a recibir daño de **Fuego** o **Frío / Hielo**.
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
- **Activación:** Reacción cuando el usuario va a recibir daño de **Fuego** o **Frío / Hielo**.
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

**Sólo la criatura con la que el objeto está Sintonizado** puede activar sus Encantamientos que gasten RE o beneficiarse de sus propiedades Pasivas Sintonizadas. Que otra criatura lo sostenga, vista o robe no le transfiere el vínculo ni le permite gastar esa RE. Las propiedades físicas y subsistemas independientes —por ejemplo una Runa de CRAFT-07— siguen sus propias reglas.

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
- **Templado:** mantiene una temperatura de uso confortable en clima ordinario; no protege contra daño de Fuego ni Frío / Hielo.
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
- conserva Daño 5, Pen 2 y Movimiento -2 conforme al hechizo.
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
- **Uso:** 5 RE; ataque 2d10 +6; Daño 5, Pen 2, Movimiento -2 conforme al hechizo.
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

CRAFT-12 se desarrolla a continuación.

### CRAFT-12 — Auditoría integral del sistema de fabricación

> **VIGENTE · CERRADO.** CRAFT-12 audita CRAFT-01 a CRAFT-11 contra economía, progresión, combate, economía de acciones, magia, Energía, reparación, recuperación, trampas, consumibles e Investigación. No añade un motor nuevo: corrige únicamente contradicciones, bypasses o secuencias explotables encontradas durante la auditoría.

#### Objetivo

La auditoría intenta demostrar que el sistema de fabricación no permite, por reglas universales:

- imprimir dinero mediante fabricar -> vender;
- recuperar más materiales que el valor sacrificado;
- convertir PEI en materia prima a mitad de precio;
- comprimir indefinidamente tiempos;
- sustituir competencia/instalación mediante una sola Ventaja;
- multiplicar ataques mediante disparadores simultáneos;
- obtener Acciones/Reacciones adicionales mediante equipo;
- apilar el mismo beneficio desde varias capas;
- convertir Maná, RE y Energía entre sí;
- multiplicar Caudal o Estabilidad conectando fuentes;
- evitar el coste de estado de una Sobrecarga;
- convertir Familiares/autómatas en depósitos gratuitos de Sintonización;
- usar Diseño/Adaptación para saltar CRAFT-10;
- forzar éxito mediante dosis o Neutralizantes repetidos;
- usar una herramienta barata como Kit profesional completo;
- fabricar un Prototipo y tratarlo como Plano estable.

#### Matriz de auditoría

Se revisaron las siguientes fronteras:

1. **CRAFT-01 <-> CRAFT-02:** tiempo, Ayuda, Aceleración, materiales, venta y Encargos.
2. **CRAFT-02 <-> CRAFT-04/05:** Calidad, Material Especial, reparación, desmantelamiento y reventa.
3. **CRAFT-04/05 <-> CRAFT-07/08:** CapM, CRu, Runas, Encantamientos y valor agregado.
4. **CRAFT-06 <-> combate:** disparadores, ataques, Desprevenido, áreas y rearme.
5. **CRAFT-06 <-> CRAFT-08:** Sellos autónomos y trampas mágicas.
6. **CRAFT-07 <-> CRAFT-09:** Improntas, Módulos, Sobrecarga y estado.
7. **CRAFT-08 <-> descanso/progresión:** Sintonización, RE, duplicados y cambio de portador.
8. **CRAFT-09 <-> infraestructura:** acumuladores, Bancos, Acopladores, recarga y múltiples fuentes/receptores.
9. **Alquimia <-> economía de acciones:** dosis, Saturación, toxinas, recuperación y Neutralizantes.
10. **CRAFT-10 <-> CRAFT-01:** Diseño, Adaptación, ingeniería inversa, Prototipo y Plano estable.
11. **CRAFT-11 <-> todos los anteriores:** totales, requisitos, tiempos, precios y referencias.

#### Auditoría económica automatizada

Se comprobaron valores enteros entre **1 c y 1000 o = 100.000 c**.

Para cada VR se cruzaron:

- Calidad Común, Superior y Excepcional;
- Material Especial Especializado, Raro y Excepcional;
- coberturas Componente, Mayor y Dominante;
- venta directa de referencia;
- venta rápida;
- recuperación por estado;
- capas rúnicas integradas;
- Encantamientos I/II/III.

Resultado:

- no existe caso en el rango auditado donde la venta directa ordinaria del objeto recién fabricado supere el coste material total de sus capas;
- no existe caso donde la venta rápida supere lo necesario para producir esas capas;
- la recuperación genérica + material + rúnica + encantada no supera la venta rápida equivalente del mismo objeto en el estado correspondiente;
- los redondeos hacia arriba de costes y hacia abajo de ventas/recuperaciones no crean arbitraje.

#### Rutas de Calidad

Se auditaron:

- Común -> Superior;
- Superior -> Excepcional;
- Común -> Excepcional directa.

En ningún VR entre 1 c y 1000 o una ruta de mejora consume menos materiales que fabricar directamente la Calidad objetivo.

El único desvío posible por redondeo es que una ruta por etapas cueste hasta **1 c más**, nunca menos.

Por tanto no existe una secuencia rentable basada en ascender Calidad por escalones.

#### Restauración de botín

Comprar o recibir un objeto Dañado/Deshabilitado y repararlo puede aumentar legítimamente su valor.

Esto **no se considera exploit** porque exige:

- existencia real del objeto dañado;
- materiales;
- competencia;
- tiempo;
- instalación cuando corresponda;
- comprador real para la venta posterior.

CRAFT-02 no garantiza una oferta infinita de objetos dañados ni compradores.

La restauración es una actividad productiva válida; el sistema sólo evita que se convierta en un bucle sin mercado ni trabajo.

#### Corrección — PEI y fabricación previa

PEI utiliza el **precio de catálogo del equipo terminado**.

No puede convertirse en:

- CM;
- VI;
- materias primas;
- Encargos;
- alquiler de taller;
- fabricación previa implícita.

Esto evita gastar 20 o de PEI como materiales y comenzar con aproximadamente 40 o de equipo terminado.

Una campaña puede conceder recursos de fabricación previa, pero debe registrarlos como concesión explícita separada del PEI.

#### Corrección — Tiempo Base Ajustado

Se formaliza el **Tiempo Base Ajustado (TBA)**:

> tiempo de receta después de aumentos obligatorios por Calidad, Material, escala u otros requisitos, pero antes de reducciones porcentuales.

Salvo excepción expresa:

**ninguna combinación de reducciones porcentuales baja de 25% del TBA.**

Esto incluye:

- Ayuda de trabajo;
- Aceleración;
- Mantenible;
- herramienta motorizada;
- otras reducciones porcentuales futuras.

Un método con tiempo fijo propio —por ejemplo intercambio Modular— no es una reducción porcentual y usa su tiempo escrito.

Una Aceleración fallida exige retrabajo hasta alcanzar **125% del TBA**, no 125% de un tiempo base anterior a Calidad/Material.

#### Corrección — deficiencias y Ayuda

Ventaja/Desventaja siguen cancelándose conforme al motor general.

Sin embargo, cancelar la Desventaja en dados **no elimina las deficiencias materiales**.

Una instalación o herramienta inferior puede seguir:

- aumentando tiempo;
- restringiendo métodos;
- empeorando consecuencias;
- haciendo imposible un procedimiento si el requisito es esencial.

Una Ayuda técnica no transforma una instalación Improvisada en Profesional.

#### Corrección — Base de Reparación Afectada

Se formaliza la **Base de Reparación Afectada (BRA)**.

Sólo entran en el porcentaje de reparación las capas que realmente deben restaurarse:

- Calidad -> VRQ;
- Material Especial -> su valor cuando la parte que sostiene la propiedad fue afectada;
- Matriz/Runa -> valor rúnico integrado cuando esa matriz fue dañada;
- Encantamiento -> valor encantado cuando su matriz fue afectada;
- componente separable sustituido -> se paga como componente y se excluye de BRA para no duplicarlo.

El tiempo de reparación utiliza igualmente la capa profesional más exigente que deba restaurarse.

#### Corrección — disparadores múltiples

Un mismo evento físico indivisible no produce varias resoluciones ordinarias contra el mismo objetivo.

Ejemplos de un solo evento:

- una pisada;
- una apertura;
- retirar un peso;
- cruzar un punto concreto.

Varias trampas sólo encadenan resoluciones si existen disparadores **distintos y secuenciales**.

La misma salvaguarda se aplica a **Sellos de Custodia**.

Un entramado deliberadamente combinado requiere un Perfil propio y se audita como un único efecto.

#### Corrección — ataques emitidos desde un mismo objeto

Una Runa/Módulo vinculados a un ataque con arma modifican por defecto una resolución que utiliza el **perfil del arma anfitriona/Host**.

No se aplican automáticamente sobre:

- Hechizo Vinculado;
- descarga de Encantamiento;
- ataque de dispositivo distinto;
- otro ataque emitido narrativamente desde el mismo objeto.

Una integración híbrida necesita Perfil expreso.

Esto impide construir un único soporte y aplicar simultáneamente todos sus modificadores a una descarga que no usa el arma.

#### Corrección — Sintonización

La Capacidad automática de Sintonización 3 pertenece a **personajes completos**.

Familiares, invocaciones, Autómatas auxiliares, monturas y vehículos no añaden otros 3 puntos salvo Perfil expreso.

Además:

- sólo la criatura Sintonizada puede activar Encantamientos que gasten RE;
- sólo esa criatura recibe Pasivos Sintonizados;
- robar, vestir o sostener el objeto no transfiere el vínculo;
- no pueden mantenerse Sintonizados simultáneamente duplicados funcionales destinados a multiplicar la reserva del mismo efecto;
- cambiar nombre, estética o tipo de soporte no evita la regla de duplicados.

#### Corrección — recarga de RE

Para rellenar RE durante un Descanso Completo:

- el objeto debe estar **ya Sintonizado al comenzar el Descanso**;
- debe permanecer Sintonizado con la misma criatura hasta terminarlo;
- debe permanecer Operativo.

Sintonizar un objeto durante ese mismo Descanso lo deja en RE 0.

Esto impide cambiar la selección al final del descanso y comenzar inmediatamente con una nueva reserva completa.

#### Corrección — Estabilidad y Caudal de Carga

Estabilidad se aplica a la **Energía total recibida por el acumulador durante el intervalo**, sumando todas las fuentes.

El Caudal de Carga de una fuente se aplica a su **entrega total a todos los receptores combinados**.

Por tanto:

- dos estaciones no permiten recibir dos veces Estabilidad;
- una estación C4 no entrega 4 E a cada uno de diez acumuladores;
- repartir la carga no multiplica Energía.

Los canales independientes sólo existen si el Perfil de la infraestructura los declara.

#### Corrección — coste de Sobrecarga

El empeoramiento a Dañado/Deshabilitado causado por:

- Sobrecarga Controlada;
- Carga forzada;
- otra activación que declare ese deterioro como coste;

es un **coste intrínseco del procedimiento**.

No puede mitigarse con:

- Estabilidad Rúnica;
- Tenacidad de material;
- Mantenible;
- protección genérica de estado;

salvo regla que mencione expresamente esa interacción.

Esto impide repetir Sobrecarga pagando sólo Maná o una protección del objeto.

#### Corrección — herramientas y Kits

**Herramienta especializada** satisface una herramienta ordinaria dedicada para una operación estrecha.

No sustituye un **Kit profesional completo** cuando una regla exija ese Kit.

Un Kit Superior sí puede registrar Herramienta especializada dentro de su propia familia.

#### Corrección — dosis alquímicas

Una misma exposición física resuelve normalmente **una dosis**.

Apilar varias dosis en:

- una hoja;
- un proyectil;
- un recipiente;
- una superficie;
- otro mismo vehículo;

no produce varias tiradas o varios efectos simultáneos salvo Perfil de dosificación específico.

Mezclar Fórmulas tampoco crea automáticamente un producto combinado estable.

#### Corrección — Neutralizante Común

Neutralizante Común adquiere Saturación **Antitóxica**.

Después de beneficiarse de una dosis contra una toxina compatible, otra dosis de esa familia no concede una nueva resistencia beneficiosa hasta un Respiro efectivo.

Esto bloquea la secuencia:

> consumir Neutralizantes repetidamente hasta obtener una resistencia exitosa.

#### Corrección — Diseño, Adaptación e Investigación

Una fase genérica de **Diseño** sólo puede documentar un procedimiento que el personaje ya conoce de forma estable.

No:

- descubre tecnología desconocida;
- reconstruye un objeto ajeno;
- estabiliza un Prototipo;
- obtiene un Patrón protegido.

Esas funciones utilizan CRAFT-10.

Asimismo, una **Adaptación** deja de ser adaptación rutinaria cuando intenta crear una propiedad mecánica nueva.

Clasificación mínima:

- conservar propiedades conocidas cambiando ajuste/configuración -> Adaptación;
- integrar subsistemas estables sin receta conjunta -> Combinación;
- crear propiedad nueva -> Innovación;
- intentar excepción a límite canónico/principio desconocido -> Frontera, cuando sea viable.

Renombrar una propiedad no reduce su Clase de novedad.

#### Corrección — catálogo CRAFT-11

REF-EQ-08 se corrige a:

**Kit de Alquimia Superior preparado para campo.**

La propiedad se registra para Bálsamo Restaurador, cuya preparación estable exige normalmente instalación Adecuada.

La versión anterior con Kit de Infiltración y cerraduras no tenía una instalación Adecuada universal que degradar y podía resultar mecánicamente vacía.

También se sincronizan en los capítulos de equipo los precios alquímicos ratificados en CRAFT-11.

#### Auditoría de acciones y Reacciones

Se verificó:

- fabricar/reparar no se convierte en Acción salvo Perfil concreto;
- disparador manual consume Acción;
- uso reactivo manual usa Preparar + Reacción;
- trampa automática paga preparación previa y dispara una vez;
- Runa Vinculada modifica una resolución existente;
- sólo una Impronta Vinculada afecta una resolución;
- Módulo Vinculado modifica una resolución existente;
- Escudo de campo consume Reacción;
- Encantamiento conserva Acción/Reacción del hechizo;
- un objeto Sintonizado no concede Reacciones adicionales;
- Autómata auxiliar no posee turno independiente;
- Familiar no genera un segundo inventario de acciones ni Sintonización;
- un mismo disparador no multiplica ataques ordinarios.

Resultado: **no se encontró una fuente universal de Acción o Reacción adicional mediante crafting**.

#### Auditoría de apilamiento ofensivo

Se verificó:

- Calidad no aumenta Daño universalmente;
- Golpe optimizado no se acumula con mejoras equivalentes del objeto;
- Filo Arcano y Propulsor de Impacto respetan sus grupos;
- Aguja Rúnica/Filo Penetrante no se suman con Cámara de penetración equivalente;
- Cámara estándar no supera Pen 5;
- una Runa/Módulo de arma no se monta sobre un Hechizo Vinculado sin Perfil híbrido;
- una activación no convierte una carga de trampa en una versión superior de su perfil.

Resultado: **no se encontró una cadena universal de fabricación que eleve Daño/Pen sin pagar la fuente correspondiente o ignorando el grupo de apilamiento.**

#### Auditoría defensiva

Se verificó:

- Protección procede de armadura/perfil concreto, no de Calidad universal;
- Barrera Cinética, Barrera Rúnica, Broche de Barrera y Escudo de campo utilizan el mejor efecto equivalente;
- cada Reacción consume la Reacción normal;
- Guardia y cobertura conservan sus costes/condiciones propios;
- Sintonización no concede defensas por sí sola.

Resultado: **no existe una pila universal de Barreras procedentes de múltiples CRAFT.**

#### Auditoría de recursos

Los tres recursos permanecen separados:

**Maná personal / Reserva Encantada / Energía industrial.**

No existe por regla universal:

- Energía -> Maná;
- Energía -> RE;
- RE -> Maná;
- Maná -> Energía;
- reparación -> Energía;
- desmantelamiento -> Energía.

Runas pagan Maná.

Encantamientos pagan RE.

Dispositivos pagan Energía.

Un híbrido necesita Perfil específico.

#### Auditoría de recuperación

Se verificó por estados:

- Operativo;
- Dañado;
- Deshabilitado;
- Arruinado.

Para objetos con Calidad + Material Especial + componentes rúnicos + Encantamiento, la suma máxima de recuperación permitida no supera la venta rápida equivalente en el rango numérico auditado.

Los componentes separables se recuperan como objetos y se excluyen de la base genérica correspondiente para evitar doble conteo.

#### Auditoría del catálogo

CRAFT-11 contiene exactamente **41 códigos REF únicos**:

- 8 EQ;
- 8 ALQ;
- 2 RUN;
- 3 MAG;
- 4 TRP;
- 2 CON;
- 7 ING;
- 5 SRV;
- 2 INV.

No existen códigos duplicados.

Los totales compuestos principales se contrastaron contra sus fórmulas de origen.

#### Estado posterior a correcciones

Después de aplicar las correcciones de CRAFT-12:

- no queda un exploit económico universal reproducible;
- no queda un bypass universal de rango/Plano/Instalación;
- no queda una conversión universal entre Maná, RE y Energía;
- no queda una multiplicación universal de acciones mediante objetos/trampas/autómatas;
- no queda un mecanismo universal para superar CapM, CRu o Sintonización;
- no queda un bucle de recarga energética por fuentes/receptores múltiples;
- no queda un método rutinario para tratar Prototipos como Planos;
- no quedan referencias activas que indiquen que las ocho Fórmulas alquímicas carecen de precio.

Esto no significa que **todo futuro Perfil** esté balanceado. Cada nuevo material, hechizo, Módulo, Encantamiento, criatura o artefacto sigue requiriendo auditoría contra estas fronteras.

#### Resultado de cierre

CRAFT-01 a CRAFT-11 quedan considerados **coherentes entre sí después de las correcciones de CRAFT-12**.

CRAFT-12 queda como auditoría de regresión: cualquier regla futura que afecte crafting debe comprobar al menos:

- coste material;
- valor/reventa;
- recuperación;
- tiempo;
- competencia;
- acciones;
- apilamiento;
- recursos;
- Sintonización;
- compatibilidad con Investigación.

**CRAFT-12 queda cerrado.**

El siguiente bloque es **CRAFT-13 — Implementación Foundry VTT del sistema de fabricación**.


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

La creación estándar usa **PEI 20 o = 2.000 c** como presupuesto material. No es dinero y no puede convertirse en saldo. Durante CREA-14 existe una única modalidad mecánica: **Compra libre** con objetos de precio exacto. Las listas recomendadas de equipo son sólo atajos editoriales y cada objeto conserva su precio normal. Todo PEI no utilizado se pierde al cerrar la preparación.

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

## 20. Pueblos jugables, herencias, culturas y orígenes

### Regla mecánica vigente

Los **12 paquetes raciales jugables v0.3** están definidos de forma completa en **3. Creación de personaje > Paso 1 — Concepto, Ascendencia, Origen y Trasfondo**. Esa es la sección operativa para crear un PJ y contiene, para cada pueblo, un resumen de trasfondo seguido de sus reglas.

Los paquetes raciales se equilibran aparte de los **25 PD** y los **3 PR generales**. Representan anatomía, fisiología, sentidos, movimiento, adaptaciones y relaciones sobrenaturales innatas. No conceden rangos gratuitos de Habilidad ni aumentos generales de Atributo salvo que una regla futura lo diga expresamente.

La lista jugable base actual es: **Humanos, Enanos, Élficos, Orcos, Goblinoides, Terios/Anihombres, Feéricos, Ankar, Cristálidos, Verdantes, Micelios y Coralios**.

### Raza, cultura y origen son capas distintas

Pueblo o raza no equivale a cultura, nación, profesión, religión, personalidad ni moral. Un Enano no tiene que ser herrero; un Orco no tiene que ser soldado; un Elfo no tiene que ser mago; un Ankar no tiene que ser sacerdote funerario; un Verdante no tiene que vivir en un bosque.

La cultura explica educación, costumbres, instituciones, idioma, valores, tradiciones y conocimientos adquiridos. El Origen explica de dónde viene el personaje y qué experiencias formaron su historia. Profesión, Habilidades, Especializaciones, Técnicas, magia y equipo representan lo que aprendió a hacer.

### Diversidad interna

Ninguno de los doce pueblos jugables constituye una cultura única. Las grandes ciudades de Tierra Mágica son diversas, las fronteras cambiaron muchas veces y familias enteras han migrado siguiendo guerras, rutas, minas, oportunidades, persecuciones o alianzas.

Las variantes internas —como Altos Elfos, Silvanos y Oscuros; Enanos de Montaña, Profundos, de Forja y Errantes; Goblins, Hobgoblins y Bugbears; linajes Terios; o las distintas ramas Feéricas— describen historias, anatomías o culturas concretas. Sólo modifican reglas cuando el paquete racial lo indica expresamente.

### Trasfondo ampliado

Los resúmenes incluidos en creación permiten elegir una raza sin tener que abandonar el procedimiento de creación. El trasfondo cosmológico e histórico más amplio se desarrolla en las secciones de la **Primera Semilla, Primera Forja, Primera Guerra, Primera Elección y Primer Tránsito**, además del canon integrado de las Partes II y III.

Ese material narrativo amplía contexto, mitos, linajes y relaciones entre pueblos, pero no crea bonificadores ocultos ni sustituye las reglas del paquete racial de creación.

### Cultura y origen

La creación estándar utiliza los **10 Orígenes** definidos en el Paso 1: Valdoriano, Broncino, Lysendrino, Ereliano, Solenario, Kharumita, Libre de Nacariel, Vigilia Alta, Risco de Ceniza y Puerto Umbral.

Cada Origen concede Familiaridad Cultural, un Perfil Lingüístico cerrado y una Faceta elegida. Esas familiaridades permiten saber lo cotidiano y reconocer procedimientos comunes, pero **no son rangos de Habilidad ni bonificadores numéricos**.

La cultura concreta del personaje puede ser más estrecha que el Origen —un barrio, clan, comunidad religiosa, familia migrante o minoría regional— y se describe libremente mientras no altere el paquete mecánico.

Los detalles operativos y la tabla de idiomas están unificados en **3. Creación de personaje > Paso 1** y no se duplican aquí.

### Profesiones

La profesión u oficio describe la trayectoria del personaje. No constituye una clase. Un soldado, ingeniera, sanador, exploradora, alquimista o canalizador se define principalmente por cómo gasta sus PD, PR y recursos, no por una profesión obligatoria asociada a su raza.

### Herencias mixtas

Una herencia mixta debe ser coherente con la anatomía, biología, magia y ficción establecidas. No sirve para sumar gratuitamente todos los beneficios de dos paquetes. La compatibilidad reproductiva o mágica entre determinados pueblos continúa abierta allí donde el canon no la haya definido; no se asumen automáticamente semielfos, semiorcos u otros linajes hasta que esa compatibilidad sea consolidada.

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

**Eïra, Madre de la Primera Semilla**, es una de las siete deidades Primordiales y encarna el principio de **Vida**. Entre sus títulos tradicionales se encuentran **la Madre Verde, la Primera Raíz, Señora del Ciclo y Aquella que Hace Brotar**. Sus ámbitos comprenden vida, crecimiento, adaptación, bosques, animales, estaciones, fertilidad, depredación, renovación y equilibrio natural. Su símbolo tradicional es una semilla abierta de la que surgen tres raíces entrelazadas.

Una máxima habitual de sus cultos afirma: **«Toda vida cambia para continuar viviendo.»**

Eïra no representa el Bien ni promete una naturaleza segura. Su principio comprende nacimiento y muerte, crecimiento y descomposición, protección y depredación. La naturaleza puede producir sufrimiento sin constituir por ello una acción moral: la responsabilidad moral exige voluntad y capacidad de elección.

### La Primera Semilla

La **Primera Semilla** es el acontecimiento primordial asociado al despertar de la Vida consciente vinculada a Eïra. Las tradiciones religiosas describen una fuente originaria de vida y transformación cuyas raíces alcanzaron tierra, aguas y profundidades. Algunas escuelas consideran este relato literal y otras lo interpretan como representación mítica de un acontecimiento primordial. El canon no obliga a resolver esa diferencia.

La obra de Eïra se expresa mediante tres imágenes: **Hoja, Savia y Sangre**, tres maneras en que la naturaleza aprendió a pensar.

**La Hoja** dio origen a los Feéricos. Feérico es una gran familia de pueblos y no una anatomía única. Entre sus formas conocidas se encuentran Hadas, Sátiros, Dríades, Trents, Náyades, Nereidas, Silfos, Duendes del bosque, linajes Centáuricos, Espíritus florales y Feéricos estacionales. No todo espíritu natural es un Feérico y no todo Feérico es un espíritu.

**La Savia** dio origen a los Élficos. Las tradiciones reconocen Altos Elfos, Elfos Silvanos, Elfos Oscuros y numerosas poblaciones no adscritas necesariamente a esas ramas. Sus diferencias proceden de historia, cultura, migración, adaptación y exposición a distintos ambientes o formas de magia; ninguna rama élfica posee una moral determinada por nacimiento. La causa concreta de la adaptación de los Elfos Oscuros a las profundidades permanece abierta.

**La Sangre** dio origen a los Terios, llamados Anihombres en muchas culturas. Un Terio pertenece a un pueblo de ascendencia animal y no es un humano transformado. Un Terio lupino, por ejemplo, no es un hombre lobo; la licantropía, si existe, constituye un fenómeno diferente. Los Terios se describen mediante **Linaje** y **Variedad**, y sus rasgos anatómicos deben ser funcionales y coherentes con el cuerpo que los posee. Las listas de linajes son abiertas y no convierten cada animal posible en una especie mecánica independiente.

La Primera Semilla también dio origen a otros pueblos naturales. Entre ellos se encuentran los **Micelios**, vinculados a formas de vida fúngica y redes miceliales; los **Verdantes**, pueblos vegetales conscientes y móviles distintos de Dríades y Trents; y los **Coralios**, pueblos vinculados a antiguos ecosistemas coralinos transformados por la influencia de la Primera Semilla. Sus culturas, ciudades, territorios y variantes concretas permanecen sujetos al desarrollo histórico y geográfico.

El origen cosmológico de un pueblo no determina su cultura, profesión, moralidad ni religión. Un hijo de la Primera Semilla puede venerar a Eïra, a otra divinidad o a ninguna.

### Doctrina de Eïra

La doctrina central sostiene que la vida debe poder **nacer, crecer, competir, adaptarse, morir y renovarse**. Proteger la vida no significa impedir toda muerte, sino evitar que el ciclo que permite su continuidad sea destruido.

Entre los principios ampliamente compartidos por sus cultos se encuentran preservar ecosistemas capaces de regenerarse, proteger ciclos vitales amenazados, evitar extinciones deliberadas por mera conveniencia, aceptar la adaptación cuando el entorno la exige, devolver parte de lo tomado a la comunidad viva y reconocer tanto al depredador como a la presa como partes de un mismo ciclo.

Sus tradiciones condenan especialmente la esterilización injustificada de territorios, la destrucción deliberada de especies, la creación de vida únicamente como recurso descartable y las alteraciones que destruyen de manera deliberada la capacidad de una forma de vida o de un ecosistema para continuar formando parte de ciclos sostenibles.

La No Muerte no constituye simplemente una infracción de los principios naturales de Eïra: su origen y tratamiento cosmológico pertenecen principalmente a los principios asociados a Nereth y Vaelun.

### Cultos y sacerdocio

Eïra no posee una iglesia universal. Sus fieles se organizan en círculos, santuarios, comunidades, órdenes regionales y tradiciones dedicadas a ecosistemas, especies, sanación, nacimiento, agricultura, supervivencia o estudio de la vida.

Tres grandes familias sacerdotales reciben nombres derivados de la Primera Semilla:

- **Custodios de la Hoja**, vinculados a ecosistemas, lugares naturales y espíritus.
- **Guardianes de la Savia**, dedicados a conocimiento, sanación, crecimiento y continuidad.
- **Hermanos de la Sangre**, relacionados con fauna, adaptación, supervivencia, depredación y equilibrio entre especies.

Estas denominaciones describen tradiciones extendidas y no tres organizaciones universales sometidas a una autoridad única.

Los santuarios de Eïra tienden a integrar construcción y ecosistema: arboledas, jardines, cuevas fértiles, terrazas agrícolas, reservas, invernaderos arcanos, árboles-templo y edificios levantados alrededor de formaciones vivientes. Sus cultos no rechazan la ciudad, la industria ni la tecnología por principio; juzgan una obra principalmente por su capacidad de coexistir con ciclos vivos sostenibles.

### Festividades

Tres celebraciones aparecen en numerosas tradiciones de Eïra:

- **Primer Brote**, dedicado a comienzos, nacimientos, siembra y aquello que empieza a crecer.
- **Plenitud**, dedicada a madurez, abundancia y responsabilidad sobre aquello que ha prosperado.
- **Retorno a la Tierra**, dedicada a cosecha final, muerte, descomposición y renovación.

Sus fechas y formas concretas varían según región, clima, cultura y calendario.

### Manifestaciones y Vínculo Divino

La imagen canónica conocida de Eïra constituye su principal referencia iconográfica, pero no establece que una deidad primordial posea una única anatomía metafísica. Las tradiciones describen manifestaciones vegetales, animales, humanoides o vinculadas al ecosistema donde su presencia se hace perceptible.

Eïra puede actuar como **Fuente Divina** mediante un Vínculo apropiado. Sus Vínculos pueden relacionarse narrativamente con preservación, sanación orgánica, crecimiento, adaptación, fertilidad, supervivencia, restauración ambiental, afinidad con seres vivos y protección frente a corrupción biológica.

Estos ámbitos no conceden por sí solos efectos mecánicos. Todo milagro o capacidad debe estar definido por las reglas correspondientes y respetar los límites generales del sistema. Eïra no permite por defecto creación ilimitada de vida, resurrección rutinaria ni curación que ignore Medicina, Restauración, Trauma u otros costes establecidos.

## 27. Khorun y la Primera Forja

**Khorun, el Primer Forjador**, es una de las siete deidades Primordiales y encarna el principio de **Materia y Forma**. Entre sus títulos tradicionales se encuentran **Padre de la Montaña, Señor de las Profundidades, Aquel que Dio Forma y Corazón del Mundo**. Sus ámbitos comprenden piedra, metal, fuego interior, montañas, cavernas, minerales, forja, construcción, resistencia, fuerza, creación material y fuerzas elementales.

Su símbolo tradicional es un martillo vertical sobre una montaña partida con una brasa en su centro.

Una máxima atribuida a sus tradiciones más antiguas afirma: **«Lo que tiene forma puede ser transformado. Lo que resiste, perdura.»**

Khorun no es simplemente el dios de los Enanos. Los Enanos son una de sus grandes creaciones, pero su principio comprende la materia del mundo, su estructura y la capacidad de transformarla mediante voluntad, trabajo, presión, calor, tiempo y conocimiento.

### La Primera Forja

La **Primera Forja** es el acontecimiento primordial asociado al despertar de la Materia y la Forma conscientes.

Las tradiciones de Khorun relatan que el Primer Forjador descendió hasta las profundidades, encontró el fuego primordial bajo el mundo, construyó un yunque con la primera piedra y realizó el **Primer Golpe**. El sonido habría atravesado la creación: montañas se elevaron, cavernas se abrieron, volcanes comenzaron a respirar y algunas partes de la materia adquirieron conciencia.

El Primer Golpe forma parte del canon cosmológico. Su descripción física exacta pertenece a la tradición religiosa y no obliga a interpretar literalmente todos sus elementos.

La Primera Forja se expresa mediante tres imágenes: **Piedra, Montaña y Chispa**, tres formas mediante las cuales la materia y las fuerzas del mundo aprendieron a pensar.

### La Piedra — Los Enanos

**La Piedra** dio origen a los Enanos.

Los mitos más antiguos sostienen que Khorun formó sus huesos con piedra, fortaleció su sangre con metal, les concedió voluntad mediante el fuego profundo y finalmente les entregó herramientas. Este relato constituye una tradición fundacional y no una descripción fisiológica literal obligatoria.

Para numerosas culturas enanas, transformar algo mediante conocimiento y trabajo constituye una forma de continuar la obra del Primer Forjador. Esa tradición no obliga a ningún Enano a convertirse en herrero, minero o ingeniero ni concede competencias profesionales por nacimiento.

Las tradiciones distinguen **Enanos de Montaña, Enanos Profundos, Enanos de Forja y Enanos Errantes**. Estas denominaciones expresan historias, ambientes y culturas diferentes, no castas morales ni profesiones obligatorias.

### La Montaña — Los Gigantes

**La Montaña** dio origen a los Gigantes.

Las tradiciones más antiguas describen a los primeros Gigantes como partes del mundo que despertaron lentamente hasta adquirir voluntad y movimiento. Una formulación tradicional resume este origen: **«Un Gigante no nació sobre la montaña. La montaña decidió caminar.»**

El canon reconoce linajes de **Piedra, Montaña, Fuego, Escarcha, Tormenta y Mar**. Estos nombres describen grandes familias históricas y ambientales y no determinan una cultura o moral única.

Los **Titanes** constituyen linajes o individuos extremadamente raros vinculados de manera excepcionalmente próxima a las primeras manifestaciones de la Montaña. No son simplemente Gigantes de mayor tamaño. Su fisiología, longevidad, número actual, culturas y capacidades permanecen abiertos para desarrollo posterior.

### La Chispa — Los Elementales

**La Chispa** dio origen a los Elementales.

Un **Elemental verdadero** es una entidad consciente perteneciente a los linajes originados en la Primera Forja. Una **manifestación elemental** es materia o energía animada temporalmente mediante magia, ritual, artefacto u otro procedimiento. Crear una manifestación elemental no equivale a crear un nuevo Elemental verdadero.

Las cuatro grandes familias son **Tierra, Fuego, Agua y Aire**. Estas familias pueden presentar expresiones derivadas relacionadas con materiales y fenómenos como Metal, Cristal, Magma, Hielo, Vapor, Arena, Ceniza, Tormenta, Humo u otras combinaciones coherentes. Esta enumeración no constituye un catálogo cerrado.

Las tradiciones distinguen tres categorías narrativas amplias:

- **Espíritus Elementales**, consciencias menores o localizadas vinculadas a una manifestación concreta.
- **Elementales**, entidades plenamente conscientes capaces de desarrollar memoria, personalidad, relaciones y sociedades.
- **Elementales Primigenios**, entidades antiquísimas de enorme escala vinculadas a fenómenos como volcanes, océanos, tormentas, glaciares o sistemas montañosos.

Estas categorías no establecen por sí mismas una progresión mecánica ni implican que una entidad deba evolucionar de una a otra. La denominación **Elemental Primigenio** evita confundir estas entidades con los Dioses Primordiales.

Un **Silfo** de la Primera Semilla y un **Elemental de Aire** de la Primera Forja no son la misma clase de ser. El primero pertenece a la familia feérica vinculada a Eïra; el segundo expresa directamente fuerzas elementales asociadas a Khorun.

### Otros hijos de la Primera Forja

La influencia de la Primera Forja produjo también otras familias conscientes vinculadas a materia, minerales y ambientes extremos.

Las **Gárgolas** son seres pétreos capaces de largos periodos de inmovilidad. Sus orígenes permanecen discutidos: algunas tradiciones las consideran descendientes de Elementales que adquirieron cuerpos permanentes y otras sostienen que antiguos pueblos las construyeron antes de que alguna fuerza relacionada con la Primera Forja las despertara.

Los **Cristálidos** son pueblos parcial o completamente cristalinos vinculados a regiones de elevada concentración mineral arcana. Sus cuerpos pueden interactuar naturalmente con ciertas corrientes mágicas, pero esa afinidad no concede automáticamente conocimientos arcanos, Fuente mágica ni capacidad para funcionar como acumuladores. Los Cristálidos de Matriz Mixta constituyen la variante jugable básica actual; otras fisiologías cristalinas permanecen disponibles para desarrollo posterior.

Los **Ígneos** son seres materiales adaptados a temperaturas extraordinarias y poseen cuerpos relativamente estables. No son equivalentes a Elementales de Fuego.

Los **Pétreos** son familias humanoides de naturaleza parcialmente mineral distintas tanto de Enanos como de Elementales. Su origen preciso y sus variantes permanecen abiertos.

### Eïra y Khorun — Vida y Forma

Los principios de Eïra y Khorun no forman dominios cerrados ni incompatibles.

Eïra expresa crecimiento, adaptación y ciclos vivos. Khorun expresa estructura, permanencia y transformación material deliberada. Una misma realidad puede participar de ambos principios.

Una antigua enseñanza afirma: **«Eïra preguntó dónde podría crecer la vida. Khorun levantó las montañas, abrió los valles y respondió: Aquí.»**

Las distintas tradiciones pueden interpretar este relato de forma literal, simbólica o filosófica. El canon no establece a Eïra y Khorun como enemigos ni como pareja divina obligatoria.

Una formulación tradicional de la Primera Forja dice: **«Primero fue la Piedra. La Piedra sostuvo la Montaña. En la Montaña ardió la Chispa. Y cuando cayó el Primer Golpe, el mundo recordó que tenía forma.»** Su interpretación última permanece abierta.

### Khorun y la magia divina

Khorun puede actuar como **Fuente Divina** para personajes que posean un Vínculo apropiado. Sus ámbitos permiten desarrollar Vínculos relacionados con materia, piedra, metal, fuego interior, construcción, resistencia, transformación y fuerzas elementales.

Estos ámbitos no conceden efectos mecánicos por sí mismos. La personalidad divina detallada de Khorun, sus dogmas, iglesias, órdenes sacerdotales, festividades, mandamientos, prohibiciones, manifestaciones, avatares, milagros y Vínculos Divinos específicos permanecen abiertos para desarrollo posterior.

## 28. Varkor y la Primera Guerra

**Varkor, Señor de la Primera Guerra**, es una de las siete deidades Primordiales y encarna el principio de **Conflicto**. Entre sus títulos tradicionales se encuentran **Puño Rojo, Padre de los Fuertes, Rompedor de Cadenas y Aquel que No Retrocede**. Sus ámbitos comprenden guerra, fuerza, valor, conquista, resistencia, furia, competencia, desafío, supervivencia mediante la lucha y victoria.

Su símbolo tradicional es un puño cerrado atravesado por una cicatriz vertical, representado habitualmente en hierro ennegrecido o rojo oscuro.

Una máxima atribuida a numerosas tradiciones varkorianas afirma: **«Nada que no pueda defender su existencia tiene garantizado conservarla.»** La frase posee interpretaciones diferentes y a menudo enfrentadas. Para algunos cultos exige preparación y resistencia; para otros justifica conquista o dominio. El canon no convierte ninguna interpretación religiosa concreta en principio moral universal.

Varkor no representa el Mal ni la violencia irracional. Su principio es el Conflicto: oposición, competencia, resistencia, desafío y confrontación entre fuerzas o voluntades incompatibles. El conflicto puede expresarse mediante violencia, pero también mediante competencia, estrategia, resistencia política, rivalidad económica, confrontación intelectual o lucha contra un entorno hostil.

### La Primera Guerra

Antes de Varkor ya existían depredación, competencia, defensa territorial y violencia. La **Primera Guerra** representa el acontecimiento primordial en que el conflicto dejó de ser solamente una consecuencia de la existencia y adquirió forma consciente como oposición entre voluntades.

Esto no sustituye la posterior **Primera Elección** de Aster. Varkor introdujo la voluntad de resistir y enfrentarse; Aster introdujo la capacidad de reconocer alternativas y escoger deliberadamente un rumbo que no estuviera definido de antemano.

Las tradiciones de Varkor recuerdan un **Primer Desafío**. Según esos relatos, Varkor clavó un arma —o sus propias manos, según la versión— en la tierra y desafió a las criaturas capaces de permanecer frente a él. Aquellas que continuaron resistiendo fueron marcadas con su sangre y de ellas surgieron los primeros pueblos de la Guerra.

El Primer Desafío pertenece al canon tradicional. La forma física exacta del acontecimiento, la naturaleza de la sangre divina y el proceso literal mediante el cual aparecieron esos pueblos no están establecidos como hechos observables.

### Las Cuatro Virtudes de Varkor

Los Hijos de la Primera Guerra expresan cuatro grandes respuestas al conflicto, conocidas tradicionalmente como las **Cuatro Virtudes de Varkor**. “Virtud” describe aquí una capacidad valorada por sus tradiciones y no una virtud moral universal.

**El Colmillo** originó a los Orcos y representa voluntad dirigida, disciplina y capacidad de continuar actuando frente a la oposición.

**La Garra** originó a los Trolls y representa resistencia, adaptación al daño y negativa a desaparecer.

**El Puño** originó a los Ogros y representa potencia directa: la capacidad de alterar una situación mediante aplicación inmediata de fuerza.

**El Ojo** originó a los Goblinoides y representa comprensión del conflicto mediante información, terreno, números, oportunidad, coordinación, engaño, logística y tecnología.

Una formulación tradicional dice: **«El Colmillo avanzó. La Garra resistió. El Puño quebró. El Ojo comprendió. Entonces Varkor derramó su sangre y dijo: Ahora sabéis luchar.»**

### Los Orcos — Hijos del Colmillo

Los Orcos expresan fuerza dirigida mediante voluntad, disciplina y determinación. Su herencia no los obliga a vivir como guerreros ni determina su moralidad.

Sus sociedades pueden adoptar formas extremadamente diferentes, incluidas comunidades agrícolas, confederaciones, estados urbanos, pueblos nómadas, órdenes militares, compañías mercenarias, guardianes fronterizos o sociedades que consideran la violencia un último recurso precisamente porque conocen su coste.

Las tradiciones reconocen **Orcos Comunes, Orcos de Sangre y Orcos Grises**, además de otros linajes históricos todavía no completamente clasificados. Los llamados Orcos de Sangre aparecen en relatos asociados a una resonancia especialmente intensa con el legado de Varkor; las capacidades físicas o mágicas concretas atribuidas a esos linajes permanecen abiertas hasta que existan reglas específicas.

Algunas fuentes antiguas utilizan una denominación provisional para linajes orcos de tamaño y resistencia excepcionales. Su nombre definitivo, origen y relación con guerras o transformaciones antiguas permanecen pendientes de desarrollo.

### Los Trolls — Hijos de la Garra

Los Trolls encarnan la resistencia y la negativa a desaparecer.

Muchos linajes troll poseen capacidades regenerativas, pero **la regeneración no funciona de manera idéntica en todos ellos**. Velocidad, límites, costes, vulnerabilidades, recuperación de miembros y demás efectos pertenecen a las reglas específicas de cada criatura o futuro paquete y no deben deducirse únicamente del lore.

Se reconocen **Trolls de Bosque, Piedra, Pantano, Montaña e Hielo**.

La denominación **Troll de Guerra** aparece aplicada a determinadas poblaciones históricas modificadas, seleccionadas o utilizadas para conflictos armados. No está establecido quién realizó esas modificaciones, mediante qué método, durante qué guerra ni si todos los llamados Trolls de Guerra poseen un origen común.

### Los Ogros — Hijos del Puño

Los Ogros expresan la potencia directa del conflicto. Poseen cuerpos capaces de ejercer gran fuerza física, pero el tamaño no determina inteligencia, profesión, cultura ni moralidad.

Se reconocen **Ogros Comunes, Ogros de las Estepas y Ogros de Montaña**, además de poblaciones históricamente denominadas **Ogros de Guerra**.

“Ogro Mago” es una denominación histórica aplicada a determinadas poblaciones o tradiciones ogra asociadas con una presencia inusual de prácticas arcanas. No constituye por sí misma una especie diferente ni concede capacidad mágica innata a todos sus miembros.

La procedencia exacta de los Ogros de Guerra y de las tradiciones denominadas Ogros Magos permanece abierta.

### Los Goblinoides — Hijos del Ojo

Los Goblinoides expresan una conclusión fundamental atribuida a Varkor: **el más fuerte no siempre vence**.

Terreno, números, información, engaño, oportunidad, logística, tecnología y planificación pueden derrotar a una fuerza superior.

Los **Goblins** aparecen históricamente en numerosas sociedades como poblaciones especialmente adaptables y rápidas para explotar oportunidades. Sus ocupaciones habituales no constituyen competencias raciales.

Los **Hobgoblins** están asociados históricamente con tradiciones de organización, administración, logística y coordinación. Esas tradiciones son culturales y no obligan a formar sociedades militares o imperialistas.

Los **Bugbears** son grandes Goblinoides asociados históricamente con aproximación, caza, sigilo y emboscada. Su denominación actual puede ser revisada posteriormente sin alterar su pertenencia a los Hijos del Ojo.

Algunas tradiciones goblin valoran soluciones rápidas, modificables e iterativas, mientras determinadas tradiciones artesanales enanas priorizan durabilidad y continuidad generacional. Esta oposición constituye un contraste cultural frecuente, no una propiedad universal de ambos pueblos.

Los **Kobolds** permanecen deliberadamente sin origen cosmológico asignado hasta desarrollar la cosmología dracónica.

### Fuerza, conflicto y moralidad

Ningún pueblo nacido de la Primera Guerra es moralmente malvado por naturaleza.

Varkor representa Conflicto, no Mal.

Numerosas tradiciones varkorianas sostienen además que fuerza y crueldad no son equivalentes. Según esas escuelas, destruir a quien no puede ofrecer resistencia demuestra poco sobre la capacidad del vencedor; el verdadero desafío aparece frente a aquello capaz de oponerse. Otras interpretaciones de Varkor son considerablemente más agresivas y justifican conquista, dominio o sometimiento mediante la victoria.

Estas diferencias son disputas religiosas y culturales. El canon no establece una doctrina varkoriana universal sobre honor.

Para Varkor, fuerza tampoco significa tamaño. Puede expresarse mediante resistencia, voluntad, inteligencia, preparación, cooperación o capacidad de preservar una decisión frente a aquello que intenta quebrarla.

El Conflicto puede causar injusticia, destrucción y sufrimiento sin ser por ello idéntico al principio de Mal. La corrupción moral asociada posteriormente a Nereth implica una relación deliberada con el daño, la explotación y la profanación que no define por sí misma todo enfrentamiento o guerra.

### Varkor y la era arcano-industrial

Varkor no exige armas antiguas ni formas tradicionales de combate. Rifles, artillería, fortificaciones, dirigibles militares, alquimia, automatización, magia de guerra, comunicaciones, ingeniería, sabotaje y logística pueden ser expresiones modernas del Conflicto.

Eïra comprende el conflicto como parte de ciclos vivos mayores; Varkor eleva la confrontación misma a principio fundamental. Una enseñanza tradicional afirma: **«Eïra enseña a sobrevivir. Varkor pregunta qué harás después de sobrevivir.»**

Khorun representa estructura, construcción y permanencia; Varkor representa prueba, oposición y ruptura. Esta tensión puede producir rivalidad, cooperación, competición industrial, intercambio tecnológico o guerra, pero no establece enemistades raciales obligatorias entre sus pueblos.

### Varkor y la magia divina

Varkor puede actuar como **Fuente Divina** mediante un Vínculo apropiado. Sus ámbitos pueden dar origen a Vínculos relacionados con resistencia, confrontación, desafío, guerra, voluntad, competencia, fuerza y victoria.

Estos ámbitos no conceden efectos mecánicos por sí mismos. La personalidad divina detallada de Varkor, sus estructuras religiosas, sacerdocios, templos, festividades, mandamientos, prohibiciones formales, avatares, milagros, Vínculos específicos y relación mecánica con la magia de guerra permanecen abiertos.

## 29. Aster y la Primera Elección

**Aster, Señor de las Mil Sendas**, es una de las siete deidades Primordiales y encarna el principio de **Elección**: la capacidad de reconocer alternativas y escoger un rumbo que no esté determinado de antemano.

Entre sus títulos tradicionales se encuentran **el Primer Caminante, Padre de la Humanidad, Aquel que Abrió el Camino, Señor de los Horizontes y el Inconforme**. Sus ámbitos comprenden libertad, voluntad, ambición, descubrimiento, exploración, invención, progreso, civilización, cambio, legado y caminos.

Su símbolo tradicional es un círculo abierto atravesado por varios caminos que parten de un mismo punto.

Una máxima atribuida a sus tradiciones afirma: **«Ningún camino existe hasta que alguien decide recorrerlo.»**

Aster no representa el Bien. Una elección puede construir o destruir; la ambición puede fundar una ciudad o iniciar una guerra; el conocimiento puede curar una enfermedad o permitir fabricar un arma. Su principio puede resumirse en una posibilidad consciente: **«Podría hacer otra cosa.»**

### Elección y voluntad

Los pueblos anteriores a Aster ya poseían voluntad, consciencia y capacidad de actuar. Los Hijos de Eïra podían adaptarse y construir culturas; los de Khorun transformar el mundo; los de Varkor resistir, organizarse y enfrentarse.

La Primera Elección no establece que únicamente los Humanos posean libre albedrío. Aster elevó la **Elección** a principio primordial independiente: reconocer que existen alternativas y escoger entre ellas sin quedar completamente definido por origen, función, instinto o expectativa.

Los Humanos constituyen la expresión primordial de ese principio porque Aster los creó sin imponerles una especialización primordial dominante. Otros pueblos también pueden elegir, cambiar de rumbo, rechazar tradiciones, adoptar nuevas identidades y decidir quiénes desean ser.

**Ascendencia no equivale a destino.**

### La Primera Elección

Las tradiciones cuentan que Aster quiso crear un ser al que no asignaría una función primordial única.

Reunió barro, agua, minerales, fibras vegetales y sangre de criaturas vivientes para formar un cuerpo. Cuando las demás deidades preguntaron qué don concedería a aquella criatura, Aster respondió: **«Ninguno.»**

Despertó entonces al primer Humano. No le explicó qué debía construir, dónde vivir, qué proteger, a quién servir ni cuál sería su lugar en el mundo. Sólo le preguntó qué quería hacer.

El primer Humano miró hacia el horizonte y respondió: **«Quiero saber qué hay allí.»**

Aster contestó: **«Ve y descúbrelo.»**

Ese momento es recordado como la **Primera Elección**.

El acontecimiento y su significado cosmológico forman parte del canon. La composición material literal del primer cuerpo humano y los detalles exactos del diálogo pertenecen a las tradiciones religiosas y pueden recibir interpretaciones literales, simbólicas o arcanas.

### Los Humanos — Hijos del Camino

Aster creó una sola Humanidad.

No existen subrazas humanas divinas originales. La diversidad humana posterior procede de migraciones, climas, culturas, mezclas poblacionales, alimentación, aislamiento, magia, religión, guerras, historia y adaptación.

La Humanidad no posee una cultura universal. Dos Humanos procedentes de sociedades distantes pueden compartir culturalmente menos entre sí que con vecinos Élficos, Enanos, Orcos, Goblinoides u otros pueblos.

Ser Humano describe ascendencia. No determina nación, lengua, religión, profesión, clase social, personalidad ni moralidad.

### El Don sin Forma

Las tradiciones asterianas denominan **Don sin Forma** a la ausencia de una especialización primordial dominante impuesta por Aster a la Humanidad.

No significa ausencia de identidad ni superioridad sobre otros pueblos. Tampoco concede por sí mismo fuerza extraordinaria, longevidad, regeneración, sentidos sobrenaturales, conocimiento, magia o resistencia especial.

Expresa una amplitud inicial de posibilidades y está representado mecánicamente por el paquete racial Humano vigente.

### Brevedad, urgencia y Legado

Comparados con determinados pueblos longevos o sobrenaturalmente resistentes, los Humanos poseen vidas relativamente breves y una fisiología menos especializada.

De esa condición surgió en numerosas sociedades humanas una idea recurrente: **Urgencia**. Construir, descubrir, estudiar, conquistar, enseñar, fundar o transmitir puede convertirse en respuesta a la consciencia de que una vida individual dispone de tiempo limitado. Esta tendencia es cultural, no una personalidad racial obligatoria.

Las tradiciones de Aster relatan que el dios contempló la muerte de un Humano que dejó una obra incompleta y creyó por un momento haber creado un pueblo condenado a no terminar aquello que comenzaba. Otro Humano recogió entonces las herramientas del muerto, consultó sus notas y continuó trabajando.

De ese relato surge el concepto del **Legado**.

Un individuo puede morir mientras aquello que transmite continúa. Una familia, una ciudad, una institución, una técnica, un libro, una tradición, un descubrimiento o una idea pueden atravesar generaciones. El Legado no es necesariamente bueno: también pueden heredarse errores, conflictos, estructuras opresivas, deudas y consecuencias.

### Las Cinco Sendas

Las tradiciones asterianas representan la Elección mediante **Cinco Sendas**. No son castas, profesiones ni destinos obligatorios y una misma persona puede recorrer varias a lo largo de su vida.

- **El Camino — Exploración:** atravesar los límites de lo conocido, viajar, descubrir y abrir rutas.
- **La Mano — Creación:** construir o producir algo que antes no existía.
- **La Voz — Sociedad:** coordinar voluntades y crear mediante lenguaje, acuerdos, enseñanza, organización, política, comercio o cultura aquello que ningún individuo podría realizar por sí solo.
- **La Mirada — Conocimiento:** observar, preguntar, experimentar, registrar y comprender.
- **La Huella — Legado:** aquello que permanece después de quien lo creó: memoria, familia, obras, instituciones, conocimiento y consecuencias.

### Libertad y consecuencias

La doctrina de Aster contiene una contradicción fundamental.

Los seres capaces de elegir también pueden crear estructuras que limitan las elecciones de otros: leyes, contratos, fronteras, gobiernos, ejércitos, prisiones, corporaciones, jerarquías e imperios.

Las tradiciones asterianas discrepan sobre cómo resolver esa tensión. Algunas consideran que debe preservarse la máxima libertad posible. Otras sostienen que determinadas restricciones colectivas son necesarias para que muchas personas puedan ejercer una libertad efectiva. Otras interpretaciones han utilizado el principio de abrir caminos para justificar expansión, colonización o conquista.

El canon no establece una respuesta a esa disputa. Sí establece un principio: **elegir no elimina consecuencias**.

Aster introduce la Elección, no la moralidad completa. Su principio hace posible una responsabilidad más profunda por los actos conscientes, pero la pregunta de qué debería elegirse pertenece especialmente al desarrollo posterior representado por Ilyr, mientras que Nereth encarnará la elección consciente de corrupción y explotación.

### Aster y el mundo

Aster no es el creador exclusivo de la civilización. Otros pueblos construyeron ciudades, estados, leyes, rutas, instituciones y conocimiento. Su ámbito se expresa mejor como la creación consciente de **nuevas posibilidades** mediante aprendizaje, organización y elección.

Eïra expresa adaptación mediante procesos vivos; Aster, adaptación mediante decisión deliberada. Khorun representa Forma y perfeccionamiento material; Aster pregunta qué nuevas posibilidades pueden obtenerse de una forma. Un dicho atribuido a determinadas tradiciones artesanales enanas afirma: **«Un humano ve una herramienta perfecta y pregunta inmediatamente qué ocurre si le cambia tres piezas.»** Es una observación cultural, no una propiedad universal.

Varkor representa la voluntad que encuentra oposición; Aster representa la posibilidad de escoger cómo responder. Para Aster, combatir puede ser una elección cuando existen alternativas; para Varkor, existen conflictos que se impondrán aunque alguien prefiera no enfrentarlos.

La civilización arcano-industrial de Tierra Mágica es resultado del conocimiento acumulado y combinado de numerosos pueblos, estados, instituciones y tradiciones. Ningún pueblo posee en exclusiva ferrocarriles, dirigibles, fábricas, universidades, cartografía, acumuladores ni innovación.

### Compatibilidad entre pueblos y magia divina

La compatibilidad reproductiva, biológica o mágica entre Humanos y otros pueblos permanece deliberadamente abierta. La existencia de pueblos humanoides no permite asumir por sí sola la existencia de Semielfos, Semiorcos u otros linajes mixtos.

Aster puede actuar como **Fuente Divina** mediante un Vínculo apropiado. Sus ámbitos pueden inspirar Vínculos relacionados con libertad, viaje, descubrimiento, conocimiento, creación, fundación, cambio o legado.

Estos ámbitos no conceden efectos mecánicos por sí mismos. La apariencia y manifestaciones detalladas de Aster, sus estructuras religiosas, órdenes sacerdotales, templos, festividades, mandamientos, prohibiciones, avatares, milagros y Vínculos específicos permanecen abiertos.

## 30. Ilyr, la Primera Luz y el Primer Juramento

**Ilyr, Portador de la Primera Luz**, es una de las siete deidades Primordiales y encarna el principio de **Bien**: el reconocimiento consciente de que la dignidad, libertad y bienestar de otros poseen valor y pueden exigir acción, responsabilidad o coste personal.

Entre sus títulos tradicionales se encuentran **Padre Celestial, Guardián del Alba, Aquel que Alzó la Luz, Señor del Juramento y Protector de los Inocentes**. Sus ámbitos comprenden luz, protección, misericordia, justicia, esperanza, sacrificio, sanación, verdad, juramentos y redención.

Su símbolo tradicional es un sol blanco o dorado rodeado por seis alas.

Una máxima atribuida a sus cultos afirma: **«La fuerza encuentra su propósito cuando protege algo además de sí misma.»**

Ilyr no convierte el Bien en obediencia automática. La moralidad exige voluntad, comprensión y capacidad de elección. Una acción no se vuelve justa únicamente porque una institución religiosa afirme realizarla en su nombre.

### Antes de la Primera Luz

Antes de Ilyr ya existían dolor, muerte, guerra, abandono, sometimiento y destrucción. Los pueblos podían enfrentarse, imponerse unos a otros, proteger sus intereses y tomar decisiones que causaran sufrimiento.

Sin embargo, la cosmología sitúa en Ilyr la aparición de una formulación primordial positiva de la responsabilidad moral hacia los demás.

Aster había abierto la posibilidad de reconocer alternativas. Ilyr introdujo una nueva pregunta: **no solamente qué puedo hacer, sino qué debería hacer**.

La aparición posterior de Nereth representará algo distinto: comprender el daño y el valor moral del otro y elegir deliberadamente explotar, corromper o instrumentalizar ese sufrimiento.

### La Primera Luz

Las tradiciones sitúan la **Primera Luz** durante una guerra antiquísima cuyos protagonistas, lugar y fecha exacta permanecen desconocidos.

Un grupo derrotado huía mientras fuerzas vencedoras continuaban persiguiéndolo. Entre quienes escapaban había heridos, agotados y otros seres que ya no participaban del combate.

Ilyr se interpuso. Cuando los perseguidores afirmaron que aquellos seres pertenecían al enemigo, Ilyr respondió que ya no estaban luchando.

Entonces apareció una luz que no quemaba. Protegía, revelaba y podía sanar.

Ese acontecimiento es recordado como la **Primera Luz**, momento en que la misericordia y la protección del otro adquirieron una expresión primordial consciente.

El acontecimiento y su significado forman parte del canon. Los pueblos implicados, el lugar, la fecha y los detalles literales de la manifestación permanecen abiertos.

### El Primer Juramento y los Celestiales

Las tradiciones sostienen que Ilyr tomó parte de la Primera Luz, le otorgó voluntad y forma y pronunció el **Primer Juramento**:

**«Mientras exista alguien que necesite protección, habrá quien pueda elegir defenderlo.»**

De la Primera Luz nacieron los **Celestiales**, conocidos ampliamente como **Ángeles**.

La palabra fundamental del Juramento es *elegir*. Ilyr no creó servidores carentes de voluntad. Una acción moral sólo posee pleno significado cuando existe capacidad real para actuar de otro modo.

Los Celestiales constituyen una familia propia de seres creada por Ilyr. No son almas de mortales virtuosos, héroes muertos ni espíritus humanos ascendidos.

Poseen voluntad, personalidad, memoria y emociones propias. Pueden obedecer, dudar, equivocarse, cambiar de opinión, abandonar una misión o enfrentarse a su creador.

Sus formas pueden contener elementos materiales y divinos cuyo funcionamiento metafísico exacto permanece sin resolver. Cuando se manifiestan físicamente pueden interactuar con el mundo y, según su naturaleza, sufrir cansancio, heridas y muerte. **Ser celestial no significa ser invulnerable.**

### El Juramento de las Seis Alas

La doctrina ilyrana representa seis principios mediante las **Seis Alas**. El símbolo no implica que todos los Celestiales posean literalmente seis alas.

- **Protección:** interponerse frente al daño cuando existe capacidad real para hacerlo.
- **Misericordia:** evitar sufrimiento innecesario y reconocer cuándo una amenaza ha dejado de serlo.
- **Justicia:** exigir que el poder responda por sus decisiones y consecuencias. Justicia no equivale automáticamente a obedecer cualquier ley existente.
- **Verdad:** preservar confianza, testimonio y consentimiento y rechazar especialmente el engaño utilizado para destruir la capacidad de otros de decidir libremente. No establece una prohibición metafísica de toda mentira imaginable.
- **Sacrificio:** aceptar voluntariamente un coste propio cuando proteger algo digno de valor lo exige. El sufrimiento no adquiere valor simplemente por ser sufrimiento.
- **Esperanza:** continuar buscando una posibilidad defendible incluso cuando la derrota parece probable. Esperanza no equivale a negar la realidad ni garantiza un resultado favorable.

Las Seis Alas pueden entrar en tensión. Protección puede exigir silencio cuando Verdad recomendaría revelar; Misericordia y Justicia pueden ofrecer respuestas diferentes ante un enemigo vencido; Sacrificio puede entrar en conflicto con responsabilidades previas. Las tradiciones de Ilyr desarrollan debates morales y no una tabla automática de respuestas.

### Las Órdenes Celestiales

Las grandes categorías celestiales se describen tradicionalmente como **Órdenes** asociadas a funciones y principios. No constituyen necesariamente especies biológicas separadas ni una escala obligatoria de ascenso o poder.

Los **Custodios** están asociados principalmente con Protección. Custodian personas, comunidades, refugios, rutas, reliquias y lugares vulnerables.

Los **Heraldos** están asociados con Verdad y Esperanza. Actúan como mensajeros, testigos y portadores de comunicaciones o revelaciones. Falsificar deliberadamente un mensaje en nombre de Ilyr puede constituir para ellos una ruptura fundamental de juramento.

Los **Clementes** —denominación que sustituye al antiguo término *Luminares* para evitar confusión con las cinco Luminarias del Panteón Central— están asociados con Misericordia, sanación, alivio y purificación. Sus capacidades no eliminan los límites generales de Medicina, Restauración, Trauma, tiempo, energía y conocimiento.

Los **Justicarios** están asociados con Justicia. Intervienen cuando proteger exige detener activamente una amenaza, abuso o transgresión grave. No constituyen agentes automáticos de las leyes de ningún estado mortal y sus tradiciones distinguen justicia de venganza.

La **Orden de las Virtudes** está asociada principalmente con Sacrificio, ejemplo y resistencia moral.

Los **Serafines** son Celestiales extremadamente raros y particularmente próximos al principio de Ilyr. Sus apariciones suelen asociarse con acontecimientos de gran importancia. Su anatomía, poder y funciones exactas no constituyen una categoría mecánica cerrada.

Los **Tronos** son Celestiales antiguos cuyas manifestaciones pueden apartarse notablemente de la forma humanoide, adoptando geometrías, anillos, ojos, estructuras o configuraciones luminosas. Se los asocia con estabilidad, barreras, sellos y custodia de lugares sobrenaturalmente peligrosos.

Los **Querubines** están asociados con la custodia de conocimiento, reliquias, secretos y lugares cuyo uso irresponsable podría producir consecuencias graves. Su función no implica que el conocimiento sea maligno por sí mismo.

También se reconocen categorías de Celestiales menores como **Chispas, Guías, Vigilantes y Portadores**. Estas denominaciones no constituyen un catálogo cerrado.

### Libertad, Caída y Redención

La Elección introducida por Aster alcanza también a los Celestiales. Una enseñanza ilyrana afirma: **«Una criatura incapaz de hacer el mal tampoco puede elegir verdaderamente hacer el bien.»**

Un Celestial puede quebrar un juramento, abandonar una Orden, rechazar una misión, apartarse de Ilyr o actuar deliberadamente contra los principios que anteriormente defendía. Esto hace posible la existencia de **Ángeles Caídos**.

Un **Ángel Caído no es automáticamente un Demonio**. El Caído continúa siendo una entidad de origen celestial. Puede haberse corrompido, haber rechazado a Ilyr, abandonado su juramento, servido a otra potencia o simplemente haberse separado de la función para la que fue creado. Caída tampoco equivale necesariamente a maldad absoluta.

Los Demonios poseen un origen cosmológico independiente asociado a Nereth. Servir a Nereth no transforma automáticamente a un Ángel Caído en Demonio salvo que en el futuro el canon establezca expresamente algún proceso capaz de hacerlo.

Mientras exista capacidad real de elección, las tradiciones de Ilyr mantienen abierta la posibilidad de intentar cambiar. La redención no borra acontecimientos ni equivale a perdón automático. Implica reconocer el daño causado, abandonar la conducta que lo produjo, reparar aquello que todavía pueda repararse y aceptar las consecuencias que correspondan.

### Ilyr y los otros principios

Eïra representa la Vida y sus ciclos; Ilyr introduce valoración moral consciente. Un depredador, una enfermedad o una tormenta pueden causar daño sin poseer intención moral. **La naturaleza no es moralmente malvada por funcionar como naturaleza.**

Una enseñanza tradicional afirma: **«Khorun pregunta si una obra puede sostenerse. Ilyr pregunta a quién protege.»**

Ilyr acepta que existen circunstancias donde combatir puede resultar necesario, pero la victoria no convierte automáticamente una acción en justa. Varkor valora resistencia y capacidad de imponerse; Ilyr introduce responsabilidad, misericordia y proporcionalidad.

Aster abrió la posibilidad de reconocer caminos diferentes; Ilyr introdujo la pregunta acerca de cuáles de esas elecciones deberían realizarse.

### Religión y magia divina

Ilyr no posee por ahora una iglesia universal canónica. Las instituciones que actúan en su nombre pueden interpretar de manera diferente las Seis Alas y pueden equivocarse, dividirse o corromperse. Protección puede degenerar en control; Justicia, en venganza; Verdad, en dogmatismo; Sacrificio, en glorificación del sufrimiento.

Ilyr puede actuar como **Fuente Divina** mediante un Vínculo apropiado. Sus ámbitos pueden inspirar Vínculos relacionados con protección, misericordia, justicia, verdad, sacrificio, esperanza, sanación y redención.

Estos ámbitos no conceden efectos mecánicos por sí mismos. Los milagros, Vínculos específicos, reglas de caída y redención, estadísticas celestiales y capacidades sobrenaturales concretas permanecen sujetos a desarrollo posterior.

## 31. Nereth y la Primera Profanación

**Nereth, Señor de la Primera Profanación**, es una de las siete deidades Primordiales y encarna **Corrupción y Mal**.

No es el dios de la muerte natural.

Entre sus títulos tradicionales se encuentran **el Profanador, Señor de las Cadenas, Padre de los Demonios, Aquel que Niega el Final, el Susurrante y Señor de lo Prohibido**. Sus ámbitos comprenden corrupción, dominación, crueldad, traición, necromancia profanatoria, esclavitud del alma, Demonios, pactos oscuros, No Muerte y transgresión deliberada de límites fundamentales.

Su símbolo tradicional es un círculo negro abierto por una grieta vertical del que descienden tres cadenas.

Una máxima atribuida a sus cultos afirma: **«Si algo puede ser tomado, ¿por qué pedirlo?»**

Nereth representa una relación consciente con los demás en la que voluntad, dignidad, vida, sufrimiento, cuerpo o alma pueden convertirse deliberadamente en instrumentos del propio propósito.

El Mal no consiste simplemente en provocar cualquier daño. Existen situaciones donde una acción dolorosa puede realizarse para proteger, curar o impedir un daño mayor. El principio de Nereth aparece cuando una voluntad comprende el valor y la agencia del otro y decide subordinarlos deliberadamente, explotarlos o convertirlos en recurso.

### La Primera Maldad

La Primera Luz de Ilyr había formulado una responsabilidad moral positiva: el reconocimiento de que el sufrimiento y la dignidad de otro pueden importar incluso cuando protegerlos exige un coste propio.

Las tradiciones narran que Nereth contempló esa revelación y preguntó a Ilyr por qué protegía a quienes ya no podían defenderse. Ilyr respondió que podía impedir su sufrimiento. Nereth observó a los indefensos y contestó: **«Precisamente.»**

Ese momento es recordado como la **Primera Maldad**.

No fue el primer dolor, la primera muerte, la primera violencia ni la primera guerra. Fue la primera gran expresión primordial de una voluntad que comprendió el sufrimiento y el valor del otro y decidió conscientemente utilizarlos, aumentarlos o explotarlos.

### Mal y Corrupción

Mal y Corrupción están relacionados, pero no son conceptos idénticos.

**Mal** describe una relación moral consciente con otros seres y sus intereses.

**Corrupción** describe procesos mediante los cuales un cuerpo, alma, objeto, lugar, vínculo, sistema mágico o relación es deformado, sometido o convertido en instrumento contra su propia integridad, naturaleza o voluntad.

Un objeto corrupto no posee por ello culpabilidad moral. Una persona afectada involuntariamente por Corrupción tampoco se vuelve automáticamente malvada.

La Corrupción no constituye una puntuación moral universal ni una barra que transforme automáticamente el carácter de una criatura. Cuando sea necesario representar mecánicamente un fenómeno de Corrupción, sus efectos deberán definirse de manera específica.

### La Primera Profanación

Después de las primeras muertes conscientes, Nereth intentó demostrar que incluso el final podía ser utilizado.

Las tradiciones sostienen que encontró el cadáver de uno de los primeros mortales. Su vida había terminado y aquello que constituía su identidad comenzaba a separarse de su existencia material.

Nereth intervino. Retuvo y alteró aquello que debía continuar su curso, lo vinculó nuevamente a la materia muerta y ordenó al cadáver levantarse.

El cuerpo abrió los ojos sin haber regresado verdaderamente a la Vida. Había nacido el **Primer No Muerto**.

Ese acontecimiento es conocido como la **Primera Profanación**.

La muerte natural no es malvada. La No Muerte constituye una alteración del proceso que debería seguir a la muerte. La naturaleza exacta de aquello que Nereth retuvo, el procedimiento empleado y la forma concreta del Primer No Muerto permanecen abiertos.

### La No Muerte

Un **No Muerto** es una existencia sostenida después del punto en que el proceso natural de muerte debería haber permitido la separación o finalización de su estado anterior, mediante retención, alteración, sustitución, anclaje o consumo de elementos relacionados con el cadáver, la identidad o el alma.

No toda manifestación relacionada con una persona muerta constituye No Muerte. Un espíritu natural, un eco mágico, una aparición divina, un recuerdo preservado o un cadáver manipulado únicamente como materia pueden poseer naturalezas diferentes.

La No Muerte tiene un origen cosmológico profanatorio, pero **un No Muerto individual no es automáticamente moralmente culpable de su propia condición**. Un individuo puede haber sido convertido contra su voluntad, maldecido o retenido por otro. Cuando un No Muerto conserva consciencia, memoria, voluntad y capacidad real de elección, puede conservar también responsabilidad moral propia.

La profanación que produjo su estado y la moralidad del individuo resultante son cuestiones relacionadas pero distintas.

### Estados de la No Muerte

Las tradiciones y estudios necrológicos reconocen cinco grandes estados narrativos. No constituyen por sí mismos perfiles mecánicos completos.

- **Cascarones:** cadáveres que continúan actuando sin conservar de forma completa a la persona original. Esqueletos y Zombis son ejemplos frecuentes.
- **Atados:** existencias en las que parte significativa de identidad, memoria, alma o voluntad permanece anclada. Revenants, Tumularios y determinados Caballeros Muertos pueden pertenecer a esta categoría.
- **Espectrales:** consciencias o identidades cuya relación con un cuerpo estable ha desaparecido casi por completo pero que permanecen retenidas cuando su tránsito debería haber continuado. **No todo fantasma es un No Muerto.**
- **Hambrientos:** No Muertos cuya continuidad exige consumir algún recurso procedente de otros seres: sangre, energía vital, Maná, emociones, memoria, tiempo vital u otros elementos según la familia concreta. Los **Vampiros** constituyen uno de los ejemplos más conocidos; sus linajes, necesidades y sociedades permanecen abiertos.
- **Soberanos de la Muerte:** individuos que buscan deliberadamente preservar partes fundamentales de su identidad más allá de la muerte mediante procedimientos avanzados de No Muerte. El **Liche** constituye el paradigma tradicional. Sus métodos concretos permanecen fuera del canon hasta desarrollar la Necromancia correspondiente.

### Necromancia y Artes Prohibidas

Estudiar la muerte no constituye por sí mismo una profanación.

Médicos pueden estudiar cadáveres. Sacerdotes pueden realizar funerales. Investigadores pueden examinar residuos espirituales. Canalizadores pueden intentar comunicarse con muertos. Guardianes pueden ayudar a un espíritu perdido.

La **Necromancia prohibida** comienza cuando una práctica necesita retener, esclavizar, alterar, consumir o utilizar aquello que debería haber podido abandonar libremente el estado de muerte.

La existencia de un cadáver tampoco equivale automáticamente a la presencia de un alma. El tratamiento material de restos y la manipulación espiritual son cuestiones diferentes.

**Lo Prohibido no equivale simplemente a lo ilegal.** Las llamadas **Artes Prohibidas** son prácticas cuya propia operación exige una transgresión fundamental de voluntad, alma, vida, muerte o integridad. Entre sus manifestaciones pueden encontrarse esclavización de almas, robo deliberado de vida, creación profanatoria de No Muertos, determinadas formas de control forzado de la voluntad, sacrificios conscientes impuestos y corrupciones corporales o espirituales cuyo funcionamiento dependa de esas violaciones.

Conocer, estudiar o registrar una práctica prohibida no equivale automáticamente a ejecutarla. El conocimiento puede ser necesario precisamente para reconocer, contener o impedir esas prácticas.

### Los Demonios

Después de la Primera Profanación, Nereth creó un linaje propio de seres: los **Demonios**.

No utilizó para ello cadáveres ni Ángeles Caídos.

**Demonio y Ángel Caído no son sinónimos.** Un Ángel Caído fue creado originalmente por Ilyr. Un Demonio pertenece al linaje asociado directamente a Nereth.

Las tradiciones arcanas y religiosas describen a los Demonios como entidades organizadas alrededor de principios de corrupción, parasitismo, apropiación y dominación. La composición metafísica exacta de sus cuerpos y la existencia de una posible sustancia denominada *Esencia Corrupta* permanecen sin resolver.

Muchos Demonios requieren condiciones particulares para manifestarse plenamente en Tierra Mágica, como portales, recipientes, pactos, invocaciones, anclajes o grandes concentraciones de energía. Ninguno de esos métodos constituye una regla universal hasta desarrollar las mecánicas correspondientes.

Las siguientes denominaciones describen grandes tendencias o funciones demoníacas y no necesariamente especies biológicas ni niveles jerárquicos rígidos:

- **Tentadores:** explotan deseo, necesidad, ambición, secretos y pactos.
- **Dominadores:** asociados con coerción, posesión, cadenas espirituales, control y jerarquías absolutas.
- **Devoradores:** reducen cuerpos, magia, energía vital, almas, recuerdos, emociones u otros aspectos de seres conscientes a recursos consumibles.
- **Verdugos:** utilizan sufrimiento como herramienta para quebrar, obtener, transformar o dominar. No necesitan disfrutar del dolor para participar del principio de Nereth.
- **Profanadores:** se especializan en corromper cadáveres, almas, lugares, identidades, sellos y estructuras espirituales.
- **Archidemonios:** Demonios excepcionalmente antiguos y poderosos que han acumulado conocimiento, seguidores o dominio durante eras. No son dioses por definición, aunque algunos puedan ser objeto de culto.

Los Archidemonios concretos, sus dominios, jerarquías y planos permanecen abiertos.

### Pactos y relaciones

Los Demonios pueden establecer Pactos de acuerdo con la arquitectura general de **Fuente Externa** del sistema: **Don + Condición + Precio + Consecuencia**. El precio de un Pacto significativo no debe ser irrelevante.

Un Pacto con un Demonio y un **Vínculo Divino con Nereth** no constituyen necesariamente el mismo tipo de relación. Nereth puede actuar como Fuente Divina; los Demonios pueden operar como entidades de Fuente Externa.

Eïra representa el ciclo de Vida, muerte y renovación; Nereth busca apropiarse de elementos de ese ciclo y convertirlos en recursos sometidos a una voluntad. Khorun representa estructura y transformación material; Nereth no se define por destruir materia, sino por quebrar integridad y límites cuando ello permite apropiación o dominio. Varkor encarna oposición y conflicto; para Nereth, la capacidad de la víctima de defenderse puede ser irrelevante. Aster encarna Elección; Nereth busca explotar, limitar o apropiarse de esa capacidad. Ilyr reconoce valor en dignidad, libertad y bienestar; Nereth convierte esos mismos elementos en puntos de explotación.

La Primera Profanación demuestra que la muerte no garantiza por sí sola que aquello que muere pueda completar su curso sin interferencia. Ese peligro prepara el surgimiento de Vaelun y el Tránsito.

### Nereth y la magia divina

Nereth puede actuar como **Fuente Divina** mediante un Vínculo apropiado y constituye además el origen cosmológico de numerosos Demonios capaces de establecer Pactos como Fuentes Externas.

Estos ámbitos no conceden capacidades mecánicas por sí mismos. La estructura de sus cultos, sus avatares, planos demoníacos, Archidemonios concretos, reglas de posesión, Corrupción, Necromancia, Pactos y destino de las almas permanecen abiertos.

## 32. Vaelun y el Primer Tránsito

**Vaelun, Guardián del Último Umbral**, es una de las siete deidades Primordiales y encarna el principio de **Tránsito**.

Entre sus títulos tradicionales se encuentran **Señor del Último Camino, el Silencioso, Custodio de las Almas** y, en determinadas culturas, **Juez de los Muertos**. Este último título no establece la existencia de un juicio universal, tribunal divino ni destino moral obligatorio después de la muerte.

Sus ámbitos comprenden muerte natural, descanso, almas, funerales, memoria de los muertos, ancestros, protección de tumbas, tránsito espiritual y oposición a la retención o explotación profanatoria de los muertos.

Su símbolo tradicional es una puerta negra abierta sobre un disco blanco, flanqueada por dos ojos dorados.

Una máxima atribuida a sus tradiciones afirma: **«Morir no es desaparecer. Es cruzar.»** Esta máxima expresa una doctrina religiosa sobre la continuidad espiritual. No determina cuál es el destino último de aquello que cruza.

Vaelun no crea la muerte ni decide necesariamente cuándo debe morir alguien. Su función comienza cuando una vida ha terminado y aquello que pertenecía a esa persona debe poder completar su tránsito.

### Muerte y Tránsito

La muerte existía antes de la aparición de Vaelun.

Los ciclos de Eïra ya comprendían nacimiento, crecimiento, envejecimiento, muerte y renovación. Los primeros pueblos mortales podían morir mucho antes de que la naturaleza espiritual de ese final fuera comprendida plenamente.

La **Primera Profanación de Nereth** reveló que aquello que ocurre después de la muerte podía ser interferido. Un alma podía ser retenida, alterada, esclavizada o utilizada antes de completar su curso.

Vaelun apareció como respuesta a esa vulnerabilidad.

El **Primer Tránsito** no fue necesariamente la primera muerte ocurrida en el mundo. Fue el primer paso espiritual conscientemente reconocido, acompañado y protegido por Vaelun.

Las tradiciones relatan que Vaelun se presentó ante un alma vulnerable y no intentó devolverla a la vida, poseerla ni decidir su destino. Le ofreció continuar.

**«Tu camino aquí terminó. Aún queda otro.»**

El alma aceptó y cruzó.

Ese acontecimiento es recordado como el Primer Tránsito. Los detalles literales del encuentro pertenecen a la tradición; su significado cosmológico forma parte del canon.

### El alma

El canon establece la existencia real de una continuidad espiritual reconocida como **alma** en los pueblos mortales conocidos.

El alma puede conservar aspectos de identidad, voluntad, memoria y continuidad después de la muerte y puede ser vulnerable mientras su tránsito permanece incompleto.

Su composición metafísica exacta permanece abierta. No está establecido si puede dividirse, destruirse definitivamente, transformarse, reencarnar, integrarse en otra realidad o conservar indefinidamente todos los aspectos de la personalidad.

Tampoco está establecido que toda forma posible de consciencia posea necesariamente alma. La condición espiritual de determinados seres, incluidas formas excepcionales de existencia y autómatas avanzados, deberá resolverse específicamente cuando el canon los desarrolle.

### Alma, espíritu y eco

**Alma** designa la continuidad espiritual vinculada a la identidad de un ser mortal.

**Espíritu** es una categoría más amplia. Puede designar un alma desencarnada, una entidad natural, una presencia espiritual u otras formas de existencia no necesariamente originadas en un mortal fallecido.

**Eco** designa una impresión residual de memoria, emoción, magia o acontecimiento que no constituye necesariamente una persona completa ni una consciencia independiente.

Por ello una aparición, voz, recuerdo o presencia asociada a un muerto no demuestra automáticamente que su alma permanezca atrapada.

### El Último Umbral

El canon confirma que existe un **tránsito real** después de la muerte para las almas, pero no determina su destino final.

Las religiones pueden enseñar reinos divinos, ciclos espirituales, reencarnación, reunión con ancestros, transformación, disolución u otros destinos. Ninguna interpretación recibe por ahora confirmación cosmológica universal.

Vaelun custodia el paso. El canon no establece qué existe definitivamente más allá de él.

### Los Ankar — Guardianes del Umbral

Después de descubrir que las almas podían perderse, ser retenidas, consumidas, desplazadas o esclavizadas, Vaelun creó a los **Ankar** para ayudar a proteger el tránsito.

Su misión primordial se resume en: **«Que ningún alma sea tomada contra su voluntad.»**

Los Ankar son humanoides altos y esbeltos con rasgos cánidos estilizados.

**Un Ankar no es un Terio Chacal.** El Terio Chacal pertenece a la Sangre de Eïra. El Ankar fue creado directamente por Vaelun y posee un origen cosmológico distinto. La semejanza anatómica no implica parentesco.

### Las Tres Obligaciones

Muchas tradiciones Ankar articulan su filosofía mediante tres obligaciones.

**Recordar.** Preservar nombres, historias, testamentos, genealogías y memoria. La muerte de una persona no obliga a borrar aquello que significó, pero conservar su memoria no significa impedir su tránsito.

**Custodiar.** Proteger muertos, tumbas, cementerios, catacumbas, campos de batalla, lugares espiritualmente vulnerables y almas cuyo tránsito todavía pueda ser interferido. Custodiar no exige considerar intocable todo cadáver. Medicina, autopsia, investigación, exhumación o estudio pueden ser compatibles con estas tradiciones según consentimiento, necesidad, costumbre y riesgo.

**Dejar Partir.** Reconocer que aquello que terminó debe poder terminar. Duelo y memoria son legítimos. Retener desesperadamente a un muerto puede producir precisamente las vulnerabilidades que permiten profanación, manipulación y No Muerte.

Una máxima Ankar resume este principio: **«Recordar no significa retener.»**

Algunas tradiciones extienden esta enseñanza más allá de la muerte: una guerra, un reinado, un juramento, una amistad o una era también pueden producir sufrimiento cuando alguien intenta mantenerlos artificialmente después de que han terminado.

### Voluntad, No Muerte y espíritus

La voluntad de una persona continúa siendo relevante mientras el alma conserva capacidad significativa para expresarla. Retener, desplazar, esclavizar o consumir un alma contra su voluntad constituye una transgresión especialmente grave para las tradiciones de Vaelun.

El consentimiento, sin embargo, no vuelve automáticamente inocua cualquier práctica. Una persona puede aceptar una transformación o retención que continúe alterando de manera profunda el tránsito. La existencia de consentimiento resuelve ciertos problemas de coerción, pero no determina por sí sola la naturaleza cosmológica o moral completa del procedimiento.

Un Ankar no está obligado a destruir automáticamente todo No Muerto. Debe intentar comprender qué permanece y por qué.

Un **Revenant** que permanece voluntariamente para completar una promesa puede recibir ayuda para terminar aquello que lo retiene. Un espíritu perdido puede necesitar orientación. Un **Vampiro** consciente plantea cuestiones relacionadas con voluntad, necesidad, daño y aquello que su existencia requiere de otros. Un **Liche** que utiliza o esclaviza otras almas para prolongar deliberadamente su propia existencia constituye una profanación extrema.

Una presencia espiritual no constituye automáticamente un No Muerto. Puede tratarse de un alma retenida, un espíritu natural, una entidad independiente, un eco mágico, una manifestación divina u otro fenómeno.

### Dignidad de los muertos

Para las tradiciones de Vaelun, un cadáver conserva dignidad aunque la persona ya no habite en él de la misma manera.

Esto no crea una prohibición universal contra autopsias, medicina, investigación, arqueología o prácticas funerarias particulares. La cuestión central es el tratamiento de los restos, el consentimiento cuando resulte aplicable, la finalidad de la práctica y cualquier riesgo de interferencia espiritual.

### Vaelun y Nereth

La oposición entre Vaelun y Nereth no representa Vida contra Muerte.

La muerte natural no pertenece a Nereth.

Su oposición fundamental es **Tránsito contra Apropiación**.

Nereth considera que aquello que todavía puede utilizarse puede ser retenido, alterado o convertido en recurso. Vaelun sostiene que la posibilidad de utilizar algo no concede derecho a poseerlo.

Para Vaelun, un alma pertenece primero a sí misma y aquello que ha terminado debe poder completar su final.

### Vaelun y los otros principios

Eïra representa el ciclo de la Vida. Cuando una vida termina, sus componentes materiales pueden regresar a los procesos del mundo mientras aquello que corresponde a su continuidad espiritual entra en el ámbito del Tránsito.

Ilyr y Vaelun comparten una preocupación por la dignidad: Ilyr protege a quienes viven y pueden sufrir daño; Vaelun protege el derecho de quienes han muerto a no ser apropiados, esclavizados o impedidos de completar su tránsito.

Aster representa la apertura de caminos mediante Elección; Vaelun recuerda que toda existencia material posee límites y que la libertad tampoco garantiza duración infinita.

Varkor representa resistencia frente a aquello que intenta imponerse; Vaelun representa el reconocimiento de que existen finales que no pueden transformarse indefinidamente en nuevos conflictos.

Khorun representa Forma y transformación material; Vaelun recuerda que ninguna forma material individual posee permanencia garantizada.

### Los Ankar como pueblo

La creación de los Ankar para custodiar almas no determina la profesión de cada individuo. Un Ankar puede ser explorador, comerciante, ingeniero, médico, soldado, historiador, investigador, artista, juez, mago o aventurero.

Su herencia tampoco concede automáticamente Religión, Medicina, Ritualismo, Arcana o magia divina. Sus capacidades raciales vigentes representan una sensibilidad limitada ante determinados fenómenos del Umbral y una resistencia concreta frente a manipulación espiritual; no proporcionan conocimiento automático sobre aquello que detectan.

Entre sus fórmulas funerarias tradicionales se encuentran **«Tu nombre permanece. Tu camino continúa.»** y **«Cuando llegue el Umbral, que lo cruces por voluntad propia.»**

### La culminación de los siete principios

La aparición de Vaelun completa la secuencia de los siete Primordiales:

- **Eïra — Vida:** el mundo aprendió a vivir.
- **Khorun — Materia y Forma:** el mundo aprendió a tener estructura.
- **Varkor — Conflicto:** las voluntades aprendieron a resistirse y enfrentarse.
- **Aster — Elección:** la consciencia reconoció que podían existir caminos diferentes.
- **Ilyr — Bien:** la elección adquirió responsabilidad hacia los demás.
- **Nereth — Corrupción y Mal:** esa responsabilidad fue comprendida y deliberadamente transgredida.
- **Vaelun — Tránsito:** aquello que había vivido obtuvo el derecho a completar su final sin convertirse en propiedad de otro.

Una formulación tradicional resume esta última etapa: **«La Vida conocía ya su final. La Corrupción intentó apropiarse de aquello que partía. Entonces Vaelun se presentó ante el Umbral y dijo: Todo camino merece un final.»**

### Vaelun y la magia divina

Vaelun puede actuar como **Fuente Divina** mediante un Vínculo apropiado.

Sus ámbitos pueden inspirar Vínculos relacionados con protección espiritual, funerales, memoria, custodia de almas, detección de interferencias del Umbral y defensa frente a profanaciones.

Estos ámbitos no conceden capacidades mecánicas automáticamente. Los milagros de Vaelun no deben convertir muerte, resurrección o tránsito en recursos triviales ni sustituir las reglas generales de Medicina, Restauración y Trauma.

La apariencia y avatares definitivos de Vaelun, sus cultos, órdenes religiosas, ritos funerarios completos, milagros, Vínculos específicos, estructura del más allá y destino último de las almas permanecen abiertos.

## 33. Aurea, la Llama

**Aurea, la Llama** es una de las Cinco Luminarias, Dioses Menores reales surgidos después de los siete Primordiales. Es una entidad divina independiente y no un aspecto, nombre alternativo ni avatar de Eïra o Ilyr.

Sus ámbitos tradicionales son **vida, hogar, valor, renovación y juramentos de protección**.

Una formulación frecuente de su principio afirma:

**«Una llama permanece mientras alguien decida cuidarla.»**

Aurea no creó la Vida. Ese principio pertenece primordialmente a Eïra. Tampoco creó el Bien ni constituye la autoridad moral universal de la protección, ámbito estrechamente relacionado con Ilyr.

Aurea representa aquello que seres conscientes deciden **mantener vivo, protegido, reunido y capaz de continuar**: un hogar, una familia, una comunidad, una tripulación, un refugio o cualquier vínculo concreto de cuidado asumido voluntariamente.

Su fuego no debe confundirse con el principio elemental de Khorun. La Llama de Aurea es principalmente el **fuego sostenido**: hogar, lámpara, brasero, horno, faro, fogón o fuego de campamento cuya continuidad depende de alguien que lo cuide.

> **Símbolo religioso canónico:** **La Llama Custodiada** (`SYM-DIV-AUREA-001`, CANON v1.0). Su geometría, cromática, versión reducida, escalas, área de protección, materiales y reglas de reproducción están fijadas en `docs/visual/SIMBOLOS_CANONICOS.md`. La versión principal se usa desde 32 px; `REDUCED-01` entre 16 y 31 px; por debajo de 16 px no se reproduce el símbolo completo.

### El Primer Reencendido

Las tradiciones de Aurea recuerdan un acontecimiento posterior a la era primordial conocido como el **Primer Reencendido**.

Según el relato, una comunidad antigua había sido destruida por una catástrofe cuya naturaleza, época y localización exactas permanecen sin fijar.

Entre los supervivientes, una persona conservó una pequeña llama. No podía alimentarla sola.

Otros comenzaron a aportar combustible, alimento, herramientas, refugio, vigilancia y trabajo. La llama permaneció encendida porque muchas personas aceptaron sostener aquello que ninguna podía conservar por sí sola.

Alrededor de ese fuego reconstruyeron un hogar.

Las distintas tradiciones discrepan sobre lo que ocurrió entonces. Algunas afirman que Aurea nació de aquel acto colectivo. Otras sostienen que ya existía y fue reconocida por primera vez. Otras consideran que aquel acontecimiento permitió que una potencia divina todavía difusa adquiriese identidad.

El canon no decide todavía entre estas explicaciones.

Lo canónico es que el **Primer Reencendido** constituye el gran acontecimiento religioso asociado a Aurea y expresa la transición entre supervivencia individual y cuidado consciente de una comunidad compartida.

A diferencia de los acontecimientos Primordiales, el Primer Reencendido no funda una ley cosmológica universal. Pertenece a una etapa posterior de la historia divina.

### El Hogar

Para las tradiciones aureanas, **hogar no equivale necesariamente a propiedad, edificio permanente ni parentesco biológico**.

Un hogar es un lugar o comunidad en el que alguien puede ser recibido, sostenido y reconocido como parte de aquello que se protege.

Una casa puede ser un hogar, pero también pueden serlo un barco, una caravana, un cuartel, un campamento, una posada, un monasterio, un hospital o un refugio improvisado durante una crisis.

El hogar existe por las relaciones que lo sostienen.

Una enseñanza aureana ampliamente difundida afirma:

**«Un hogar deja de proteger cuando se convierte en prisión.»**

Por ello la protección no concede propiedad sobre las personas protegidas. Utilizar cuidado, familia o seguridad como justificación para destruir la voluntad de otro constituye una corrupción de este principio.

### Hospitalidad

Numerosas tradiciones de Aurea consideran la hospitalidad una extensión del Hogar.

Recibir formalmente a alguien bajo un techo, alrededor de una llama o dentro de una comunidad puede generar una responsabilidad temporal de cuidado.

Esta obligación no es absoluta. Quien utiliza deliberadamente la hospitalidad para atacar o traicionar a quienes lo reciben puede quebrar esa relación.

Las leyes, ritos y costumbres concretas de hospitalidad varían entre culturas.

### Valor

El Valor de Aurea no consiste simplemente en buscar conflicto o demostrar superioridad.

Es la capacidad de **permanecer y actuar cuando aquello que depende de uno se encuentra amenazado**.

Puede expresarse en batalla, pero también en un incendio, una epidemia, una evacuación, una tormenta, un accidente industrial o cualquier situación donde abandonar resulte más fácil que cumplir una responsabilidad aceptada.

Una enseñanza tradicional sostiene:

**«El valor no exige no sentir miedo. Exige decidir qué no abandonarás por causa de él.»**

Este principio diferencia el Valor aureano del Conflicto de Varkor. Varkor pregunta si alguien puede resistir una oposición; Aurea pregunta qué está intentando preservar mediante esa resistencia.

### Renovación

La Renovación de Aurea no sustituye los ciclos naturales de Eïra ni permite negar el Tránsito de Vaelun.

Representa principalmente **reconstrucción después de una pérdida**.

Una casa puede reconstruirse. Una comunidad puede reorganizarse. Una familia puede aprender a continuar después de una muerte. Una institución puede recuperarse de una guerra. Una persona puede volver a encontrar un lugar al que llamar hogar.

Renovar no significa reproducir exactamente aquello que existía antes.

En algunas circunstancias, continuar exige cambiar.

Por ello los cultos de Aurea distinguen renovación de negación. Proteger algo no garantiza conservarlo para siempre.

La pregunta aureana después de una pérdida es:

**qué debe ser llorado, qué puede salvarse y qué puede volver a construirse.**

### Los Juramentos de la Llama

Los **Juramentos de la Llama** son compromisos de protección asociados con Aurea.

Un juramento apropiadamente formulado identifica aquello que una persona acepta proteger y, según la tradición concreta, puede establecer límites, duración o condiciones de finalización.

El juramento no concede automáticamente poderes sobrenaturales.

Fracasar pese a haber realizado un esfuerzo genuino no equivale necesariamente a quebrarlo. La transgresión central es abandonar deliberadamente una responsabilidad aceptada cuando todavía existía capacidad razonable para actuar conforme a ella.

Los juramentos tampoco son necesariamente eternos. Pueden concluir al cumplirse, por acuerdo, por vencimiento de sus condiciones o cuando aquello que protegían ha llegado legítimamente a su final.

La fidelidad no exige negar todo final.

### Cultos de Aurea

Aurea no posee una única iglesia mundial.

Su culto es especialmente común en la vida cotidiana y adopta formas domésticas, comunitarias y sacerdotales diferentes.

Las **Llamas Domésticas** son altares, fuegos o rituales familiares y comunitarios que no requieren necesariamente sacerdocio.

Las **Casas de la Llama** son templos o instituciones comunitarias que pueden funcionar también como refugios, cocinas, lugares de reunión, alojamiento de emergencia o centros de ayuda durante crisis.

Los **Guardianes de la Llama** son denominaciones extendidas para sacerdotes, juramentados y servidores dedicados al culto. Pueden actuar como cuidadores, mediadores, rescatistas, administradores de refugios, sanadores o protectores comunitarios. No constituyen necesariamente una orden militar ni una organización mundial única.

La existencia de instituciones civiles o multirreligiosas dedicadas a salud, refugio o emergencias no las convierte automáticamente en organizaciones de Aurea. En particular, el **Círculo de Sanadores de la Lámpara Blanca** mantiene su identidad institucional propia aunque algunos de sus miembros puedan venerarla.

### Celebraciones

El **Reencendido** es una celebración presente en numerosas tradiciones aureanas. Una comunidad apaga o deja extinguir simbólicamente una llama y la vuelve a encender desde un fuego compartido, recordando que continuidad no significa inmovilidad.

Algunas regiones celebran también una **Noche de las Puertas Abiertas**, durante la cual hogares, templos o instituciones reservan alimento, calor o refugio para viajeros y personas sin protección.

Estas celebraciones no poseen todavía fechas universales. Sus calendarios y formas cambian según región y cultura.

### Aurea y los otros principios

Eïra representa la Vida como principio y ciclo natural; Aurea representa el esfuerzo consciente por preservar vidas y comunidades concretas.

Ilyr sostiene que la dignidad de otro puede generar responsabilidad moral incluso sin una relación previa; Aurea se concentra especialmente en responsabilidades concretas que una persona o comunidad ha aceptado. Una responsabilidad de protección tampoco vuelve automáticamente justa a la causa protegida.

Varkor representa resistencia y conflicto. Aurea puede valorar el coraje necesario para proteger aquello que se encuentra bajo cuidado, pero no considera la victoria o el enfrentamiento fines en sí mismos.

Aster abre nuevas posibilidades. Aurea pregunta qué merece conservarse y reconstruirse mientras esas posibilidades transforman el mundo.

Vaelun protege el derecho de aquello que terminó a completar su final. Aurea protege la capacidad de quienes permanecen de continuar después de la pérdida. Una enseñanza compartida por determinadas tradiciones dice: **«Vaelun enseña a dejar partir. Aurea enseña a volver a encender.»**

Nereth puede corromper los principios de Aurea: protección puede convertirse en posesión; hogar, en prisión; lealtad, en sometimiento; juramento, en cadena. Los cultos aureanos que reconocen esta frontera sostienen que cuidar a alguien no concede derecho a destruir su voluntad.

### Aurea en la era arcano-industrial

La presencia de Aurea no se limita a hogares rurales o fogones tradicionales.

Sus símbolos y cultos pueden encontrarse en barrios industriales, estaciones ferroviarias, barcos, dirigibles, hospitales, cuerpos de emergencia, refugios, colonias fronterizas y campamentos de expedición.

La tecnología no es contraria a su principio. Una caldera, horno o lámpara no son sagrados por sí mismos: adquieren significado religioso cuando forman parte de aquello mediante lo cual una comunidad se sostiene y protege.

### Aurea y la magia divina

Aurea puede actuar como **Fuente Divina** mediante un Vínculo apropiado.

Sus ámbitos pueden inspirar Vínculos relacionados con protección de personas bajo cuidado, valor, refugio, calor, preservación comunitaria, reconstrucción y juramentos de protección.

Estos ámbitos no conceden efectos mecánicos por sí mismos.

Aurea no concede por defecto inmunidad al fuego, curación ilimitada, resurrección, barreras invulnerables ni beneficios automáticos por encontrarse dentro de un hogar.

Los milagros, Vínculos específicos, consecuencias de juramentos y demás efectos sobrenaturales concretos permanecen abiertos hasta su desarrollo mecánico.

## 34. Nemor, el Guardián

**Nemor, el Guardián** es una de las Cinco Luminarias, Dioses Menores reales surgidos después de los siete Primordiales.

Sus ámbitos tradicionales son **muerte, memoria, ancestros, límites y custodia de tumbas**.

Nemor no es otro nombre de Vaelun ni un aspecto suyo.

Una formulación habitual de la relación entre ambos afirma:

**«Vaelun protege a quien parte. Nemor protege lo que queda.»**

Vaelun custodia principalmente el tránsito del alma. Nemor se ocupa de la relación que los vivos mantienen con quienes murieron: sus nombres, restos, tumbas, historias, legados y límites.

Una máxima ampliamente extendida entre sus cultos sostiene:

**«Dejar partir no significa olvidar.»**

Esta enseñanza complementa, sin sustituirla, la máxima Ankar **«Recordar no significa retener.»**

> **Símbolo religioso canónico:** **El Umbral de Piedra** (`SYM-DIV-NEMOR-001`, CANON v1.0). Su geometría, cromática, variante `REDUCED-01`, escalas, área de protección, materiales, perspectiva y reglas de deterioro están fijadas en `docs/visual/SIMBOLOS_CANONICOS.md`. La versión principal se usa desde 32 px; `REDUCED-01` entre 16 y 31 px; por debajo de 16 px no se reproduce el símbolo completo.

### Memoria y muerte

Nemor no creó la muerte ni determina el destino último de las almas.

Su dominio sobre la muerte describe principalmente aquello que la muerte produce entre quienes permanecen vivos: ausencia, memoria, herencia, duelo y responsabilidad respecto de los restos y la historia de quien murió.

La existencia de Nemor no resuelve qué existe más allá del Último Umbral.

Tampoco establece que las almas de los ancestros permanezcan bajo su autoridad.

Una comunidad puede venerar la memoria de sus muertos sin que sus almas continúen presentes.

### La Primera Piedra de Memoria

Las tradiciones de Nemor recuerdan un acontecimiento posterior a la era primordial conocido como la **Primera Piedra de Memoria**.

Una comunidad antigua había sufrido una gran pérdida. Sus muertos recibieron sepultura, pero con el paso del tiempo comenzaron a desaparecer sus nombres.

Las tumbas permanecían.

La memoria de quienes descansaban en ellas no.

Según la tradición, una persona comenzó a recuperar los nombres que todavía podían encontrarse y a grabarlos nuevamente sobre piedra.

Cuando le preguntaron por qué importaba recordar a personas que ya habían partido, respondió:

**«Porque morir no significa no haber estado aquí.»**

En ese acontecimiento Nemor apareció, fue reconocido o adquirió una identidad divina definida, según la tradición que narre el relato.

El canon no establece todavía cuál de esas interpretaciones es correcta.

La Primera Piedra de Memoria tampoco fue necesariamente la primera tumba ni el primer funeral. Representa la decisión consciente de que la muerte no concede a los vivos derecho a borrar la existencia de quien murió.

### Los Ancestros

En las tradiciones de Nemor, un **ancestro** no necesita ser exclusivamente un antepasado biológico.

Puede ser una persona cuya vida continúa dando forma a una familia, comunidad, profesión, institución o tradición.

Fundadores, maestras, dirigentes, artesanos, protectores o figuras adoptadas dentro de una genealogía pueden recibir consideración ancestral según la cultura correspondiente.

La veneración ancestral no demuestra que el alma del ancestro habite un altar, objeto o monumento.

Los altares, nombres, retratos, genealogías y reliquias pueden funcionar como actos de memoria sin contener una presencia espiritual literal.

### Los Límites

El dominio de los **Límites** expresa las fronteras que permiten a vivos y muertos conservar dignidad sin apropiarse unos de otros.

Una tumba no se convierte automáticamente en un depósito libre de dueño.

Un cadáver no deja de poseer historia por carecer de vida.

El duelo no concede propiedad sobre un alma.

Una tradición ancestral puede orientar sin gobernar eternamente a quienes nacieron después.

Una máxima nemoriana afirma:

**«Hasta la memoria necesita una frontera.»**

Por ello los cultos de Nemor rechazan tanto el borrado deliberado de los muertos como el intento de obligar a los vivos a reproducir indefinidamente sus vidas.

**Honrar a los muertos no exige vivir sus vidas.**

### Memoria y olvido

Olvidar no constituye automáticamente una transgresión.

La memoria posee límites. Los registros se pierden, los idiomas cambian y las culturas desaparecen.

Los cultos de Nemor distinguen el olvido inevitable del **borrado deliberado**.

Destruir conscientemente nombres, tumbas o registros para negar que una persona o comunidad existió constituye una transgresión especialmente grave para muchas de sus tradiciones.

Nemor tampoco exige preservar toda información acerca de alguien.

Recordar que una persona existió no implica que toda su vida deba hacerse pública.

### Tumbas y restos

Las tumbas son lugares de memoria, tratamiento funerario y relación entre vivos y muertos.

Su custodia constituye uno de los ámbitos principales de Nemor.

Esto no crea una prohibición universal contra exhumación, arqueología, autopsia, investigación o traslado de restos.

La valoración depende de finalidad, consentimiento cuando pueda conocerse, costumbre, necesidad y respeto por aquello que se encuentra.

**Abrir una tumba no es necesariamente profanarla. Tratar a quien yace en ella como si nunca hubiera sido persona puede serlo.**

### Legado

Aster y Nemor comparten aspectos relacionados con aquello que atraviesa generaciones, pero desde perspectivas distintas.

Aster representa el **Legado** desde quien elige crear algo que puede continuar después de su muerte.

Nemor representa la **Memoria** desde quienes reciben aquello que una persona dejó.

Ningún legado obtiene autoridad eterna únicamente porque proceda de un muerto.

Los vivos conservan responsabilidad por aquello que deciden continuar.

### Ritos funerarios

Numerosas tradiciones de Nemor incluyen tres prácticas generales:

- **Nombrar:** pronunciar, escribir o registrar el nombre del muerto y reconocer públicamente su existencia.
- **Marcar:** dejar alguna señal de memoria: piedra, placa, árbol, libro, monumento, símbolo u otro registro apropiado para la cultura.
- **Cerrar:** reconocer que determinadas responsabilidades, derechos o relaciones de la persona han terminado o deben pasar a otros.

Estos ritos no constituyen fórmulas universales y pueden combinarse con prácticas de Vaelun, Eïra, Aurea u otras divinidades.

### Cultos de Nemor

Nemor no posee una única iglesia mundial.

Las **Casas de los Nombres** son templos, archivos o santuarios donde determinadas comunidades preservan nombres, genealogías, epitafios, historias locales y registros de desaparecidos.

Los **Guardianes de Piedra** custodian cementerios, monumentos, tumbas y lugares de memoria. La denominación no implica necesariamente una función militar.

Los **Portadores de Memoria** actúan como oficiantes funerarios, cronistas, genealogistas, cuidadores de archivos familiares o depositarios de historias comunitarias.

Estas denominaciones describen tradiciones extendidas y no tres organizaciones universales sometidas a una autoridad única.

### Desaparecidos

La ausencia de cadáver no elimina el derecho a ser recordado.

Por ello muchas tradiciones de Nemor mantienen registros de desaparecidos, cenotafios y memoriales para personas cuyo destino o lugar de descanso se desconoce.

El recuerdo puede mantenerse aun cuando no sea posible determinar si la persona murió, dónde ocurrió o qué sucedió con sus restos.

### Celebraciones

La **Noche de los Nombres** es una celebración extendida en la que familias y comunidades recuerdan a muertos recientes y antiguos mediante nombres, historias, comida, música o visitas a lugares funerarios.

El **Día de las Piedras** es una tradición presente en determinadas regiones dedicada a reparar cementerios, limpiar monumentos y restaurar lugares de memoria.

Sus fechas y formas concretas dependen de cada cultura y calendario.

### Nemor y los otros principios

Vaelun protege el derecho del alma a completar su tránsito; Nemor protege la responsabilidad de los vivos hacia la memoria, restos e historia de quien murió.

Nereth transforma cuerpo, alma, identidad o memoria en recursos susceptibles de apropiación. Nemor afirma que la muerte no elimina automáticamente la dignidad de una persona ni convierte su identidad histórica en propiedad de otros.

Aster enseña que una persona puede dejar consecuencias que sobrevivan a su vida; Nemor se ocupa de cómo las generaciones posteriores recuerdan, interpretan y reciben esas consecuencias.

Oria protege ley, acuerdos y conocimiento registrado; Nemor protege memoria, especialmente aquella vinculada a personas, muertos y comunidades.

Selene reconoce intimidad y secreto. Recordar a alguien no exige convertir toda su intimidad en conocimiento público.

### No Muertos conscientes

La existencia de un No Muerto consciente puede generar cuestiones funerarias, históricas y jurídicas complejas.

Si conserva identidad y voluntad, Nemor no obliga a tratarlo como simple cadáver.

Sin embargo, una muerte declarada puede haber producido herencias, tumbas, registros y obligaciones que no desaparecen automáticamente si esa persona continúa existiendo de otra manera.

El canon no fija todavía soluciones universales para propiedad, herencia, matrimonio, ciudadanía u otros efectos jurídicos de la No Muerte consciente.

Estas cuestiones pueden involucrar simultáneamente a Nemor, Vaelun y Oria.

### Nemor en la era arcano-industrial

El culto de Nemor no pertenece únicamente a cementerios antiguos.

Puede participar en identificación de cadáveres, registros de víctimas, memoriales ferroviarios o industriales, archivos de guerra, listas de pasajeros, cenotafios, genealogía, conservación histórica y documentación de catástrofes.

La expansión tecnológica produce nuevas formas de registrar a una persona, pero no elimina las preguntas sobre qué merece ser preservado y quién decide cómo será recordado.

### Nemor y la magia divina

Nemor puede actuar como **Fuente Divina** mediante un Vínculo apropiado.

Sus ámbitos pueden inspirar Vínculos relacionados con custodia funeraria, preservación de restos, memoria, identificación, reconocimiento de profanaciones y protección de lugares vinculados a muertos.

Estos ámbitos no conceden capacidades mecánicas por sí mismos.

Un Vínculo con Nemor no permite automáticamente convocar muertos, conocer toda la historia de un cadáver, acceder a recuerdos completos de una persona, detectar cualquier falsedad histórica ni impedir universalmente la No Muerte.

Los milagros, Vínculos específicos, ritos sobrenaturales y demás efectos mecánicos permanecen abiertos hasta su desarrollo posterior.

## 35. Oria, la Balanza

**Oria, la Balanza** es una de las Cinco Luminarias, Dioses Menores reales surgidos después de los siete Primordiales.

Sus ámbitos tradicionales son **ley, intercambio, acuerdos y conocimiento registrado**.

Oria representa la posibilidad de que individuos, comunidades e instituciones establezcan reglas y compromisos suficientemente claros como para permitir cooperación incluso cuando no existe confianza absoluta entre las partes.

Una enseñanza tradicional afirma:

**«La balanza se fija antes de colocar el peso.»**

Oria no representa la Justicia moral. Ese ámbito pertenece especialmente a Ilyr.

Una norma puede existir legítimamente dentro de un sistema jurídico y continuar siendo moralmente injusta. Del mismo modo, una acción moralmente defendible puede violar una ley vigente.

**Legal y justo no son sinónimos.**

> **Símbolo religioso canónico:** **La Medida Acordada** (`SYM-DIV-ORIA-001`, CANON v1.0). Su geometría, cromática, variante `REDUCED-01`, escalas, área de protección, materiales, perspectiva y reglas de deterioro están fijadas en `docs/visual/SIMBOLOS_CANONICOS.md`. La versión principal se usa desde 32 px; `REDUCED-01` entre 16 y 31 px; por debajo de 16 px no se reproduce el símbolo completo.

### La Balanza

La Balanza de Oria no representa igualdad matemática entre todas las partes.

Representa la capacidad de hacer comparables obligaciones diferentes.

Dinero puede intercambiarse por trabajo; acceso por información; protección por contribuciones; derechos por responsabilidades; riesgo por compensación.

Lo importante es que las partes puedan comprender qué se entrega, qué se recibe y qué consecuencias produce el acuerdo.

Por ello muchas tradiciones de Oria se relacionan históricamente con pesos, medidas, monedas, valoración y estándares verificables.

### Ley

Oria no es la diosa exclusiva del Estado.

Una regla puede surgir de un reino, ciudad, gremio, comunidad, universidad, templo, compañía, tripulación o acuerdo privado.

Sus cultos distinguen entre diferentes clases de obligación y no consideran que toda norma posea la misma autoridad en todos los contextos.

Uno de los valores centrales de la ley es la **previsibilidad**.

Quien está sujeto a una norma debería poder conocer razonablemente qué se espera, quién posee autoridad para decidir y qué consecuencias pueden producirse.

Muchas tradiciones orianas consideran especialmente defectuosa una norma utilizada para castigar a alguien que razonablemente no podía conocer su existencia.

### El Primer Acuerdo Registrado

Las tradiciones de Oria recuerdan un acontecimiento posterior a la era primordial conocido como el **Primer Acuerdo Registrado**.

No fue necesariamente el primer intercambio, contrato o texto de la historia.

El relato cuenta que dos comunidades dependían una de otra para obtener recursos que ninguna poseía por sí sola. Habían realizado intercambios anteriormente, pero cada disputa terminaba con versiones diferentes acerca de lo que se había prometido.

Una mediadora reunió a representantes de ambos grupos.

Colocó entre ellos una balanza, estableció pesos que ambas partes aceptaron y pidió que definieran qué entregaría cada comunidad, cuándo debía hacerlo y qué ocurriría si algo impedía cumplir.

Después registró los términos y entregó una copia a cada lado.

Cuando las partes colocaron sus marcas sobre el acuerdo, Oria apareció, fue reconocida o adquirió identidad divina según la tradición que narre el acontecimiento.

Una frase atribuida a aquel episodio afirma:

**«Lo que sólo uno recuerda puede discutirse. Lo que ambos aceptan puede medirse.»**

El canon no determina todavía si Oria nació durante este acontecimiento o si una divinidad anterior fue reconocida entonces por primera vez.

### Acuerdo y consentimiento

Un acuerdo requiere alguna forma significativa de consentimiento.

Las partes deben poseer capacidad suficiente para comprender aquello que aceptan y alguna posibilidad real de ejercer voluntad.

Esto no significa que toda negociación deba ocurrir entre personas igualmente poderosas. Necesidad, desigualdad económica, urgencia y presión forman parte de muchas relaciones sociales.

Sin embargo, existe un punto en el que coerción extrema deja únicamente la apariencia de acuerdo.

La existencia de una firma, sello o testigo no convierte automáticamente una imposición en consentimiento.

Una enseñanza jurídica de algunas tradiciones orianas afirma:

**«Una marca bajo la cadena pesa menos que la cadena.»**

### Fraude y buena fe

El secreto y la negociación no constituyen por sí mismos fraude.

Una persona no está obligada a revelar cada conocimiento, intención o ventaja antes de negociar.

El fraude aparece cuando una parte altera o representa falsamente información fundamental para que la otra comprenda aquello que está aceptando: cantidad, naturaleza, identidad, condiciones, riesgo declarado u otros elementos esenciales del acuerdo.

Muchas tradiciones de Oria valoran además la **buena fe**: actuar de manera compatible con las expectativas que razonablemente se crearon durante el acuerdo.

Un incumplimiento tampoco constituye automáticamente una transgresión.

Fracaso, error, fuerza mayor, fraude descubierto o imposibilidad material pueden justificar revisión o terminación de obligaciones.

La diferencia principal se encuentra entre no poder cumplir y negarse deliberadamente a cumplir después de haber obtenido aquello que la otra parte entregó conforme al acuerdo.

### Modificación y final de los acuerdos

Los acuerdos no son necesariamente eternos.

Pueden ser modificados, renovados, transferidos, rescindidos o concluidos según sus propios términos y las reglas aplicables.

La obligación organizada no debe confundirse con esclavitud.

Una deuda puede generar derecho a reclamar aquello acordado.

No concede automáticamente propiedad sobre la persona del deudor.

### Procedimiento

Las tradiciones de Oria consideran el procedimiento una defensa contra arbitrariedad.

Una acusación, inspección, reclamación o juicio debería determinar con suficiente claridad qué norma se aplica, quién posee autoridad, qué evidencia puede presentarse, cómo puede responder la parte afectada, cómo se registra la decisión y qué mecanismos de revisión existen cuando corresponda.

Esto no garantiza que el resultado sea justo.

Permite, sin embargo, identificar qué ocurrió y quién debe responder por ello.

Cambiar deliberadamente una regla después de conocer a quién perjudicará constituye una transgresión especialmente clara de muchas doctrinas orianas.

### Conocimiento registrado

Oria protege especialmente conocimiento que debe sobrevivir a la memoria individual y permanecer disponible para consulta, comparación o auditoría.

Entre sus ámbitos frecuentes se encuentran contratos, actas, censos, registros de propiedad, tratados, protocolos, manuales, licencias, patentes, sentencias, libros contables y archivos institucionales.

Registrar algo no lo convierte automáticamente en verdadero.

Un documento puede contener error, engaño, información incompleta o propaganda.

El valor del registro reside en permitir conservar afirmaciones, atribuirlas, compararlas con otras fuentes, corregirlas y determinar responsabilidades.

### Pesos, medidas y estándares

Los cultos de Oria participaron históricamente en muchas tradiciones de normalización de pesos, medidas, monedas y procedimientos comerciales.

En la era arcano-industrial, ese mismo principio puede aplicarse a estándares técnicos como presión, tolerancias, capacidad, calibres, señalización, seguridad o certificación.

Esto no convierte al Colegio de Ingenieros, gremios profesionales ni organismos civiles en instituciones religiosas de Oria.

Pueden compartir estándares sin compartir culto.

### Propiedad, patentes y derechos

Oria no establece por sí sola qué cosas deberían poder poseerse.

Las sociedades de Edria discrepan sobre propiedad, monopolios, duración de patentes, derechos de explotación, conocimiento público y secretos comerciales.

Su principio exige principalmente que, cuando una sociedad reconoce uno de esos derechos, pueda definirlo y registrarlo de forma suficientemente clara para saber quién lo posee, qué permite y dónde termina.

### Cultos de Oria

Oria no posee una única iglesia mundial.

Las **Casas de la Balanza** son templos o instituciones religiosas que en numerosas ciudades funcionan también como lugares neutrales para firma, depósito de copias, mediación y arbitraje.

Los **Testigos de Oria** son sacerdotes, juramentados, notarios o mediadores especializados en presenciar acuerdos importantes. Su participación certifica principalmente lo que las partes declararon y aceptaron; no convierte automáticamente el contenido del acuerdo en legal o moralmente justo.

Los **Custodios del Registro** mantienen archivos, copias, índices, sellos y cadenas de custodia. Su formación no les concede conocimiento sobrenatural automático acerca de la verdad de cada documento.

Estas denominaciones describen tradiciones extendidas y no tres organizaciones universales.

### Celebraciones

El **Día de las Cuentas** es una tradición periódica en numerosas comunidades mercantiles. Se revisan libros, se liquidan obligaciones, se renuevan acuerdos, se corrigen errores y se intenta resolver disputas menores antes de iniciar un nuevo ciclo comercial.

La **Feria de las Balanzas** es una celebración regional asociada con mercados, inspección pública de pesos y medidas, intercambio y renovación de instrumentos comerciales.

Las fechas y formas concretas varían según cultura y calendario.

### Oria y los otros principios

Oria pregunta qué regla existe, qué acuerdo fue aceptado y cómo debe aplicarse; Ilyr pregunta si esa regla o acuerdo es moralmente defendible.

Aster representa Elección; Oria representa una de las consecuencias de elegir conjuntamente: la capacidad de crear expectativas y obligaciones entre voluntades independientes.

Nemor preserva memoria porque alguien existió; Oria preserva registros porque algo debe poder verificarse.

Ley, deuda y contrato pueden convertirse en instrumentos de dominación. Una forma jurídica correcta no impide que una relación sea explotadora, coercitiva o corrupta y, en esos casos, puede aproximarse al principio de Nereth.

Registro y secreto no son principios necesariamente opuestos. Una sociedad puede registrar información y limitar legítimamente quién puede consultarla; esa frontera se relaciona especialmente con Selene.

### Oria en la era de la Concordia

Tratados, seguros, bancos, compañías, patentes, gremios, licencias, aduanas y redes comerciales han aumentado enormemente la importancia cotidiana de los ámbitos de Oria.

La **Concordia de Auraval**, la Mesa de Concordia y las instituciones civiles de Edria no son organizaciones religiosas de Oria. Sin embargo, juristas, escribas, negociadores o custodios de documentos vinculados a su culto pueden trabajar dentro de ellas.

Nacariel, con su comercio marítimo y sistemas de seguros, constituye un ejemplo de entorno donde sus principios pueden poseer gran relevancia sin que la ciudad pertenezca a su culto.

Un seguro expresa de manera especialmente clara la relación entre Oria y Vael: Vael representa la incertidumbre del viaje y el riesgo; Oria permite definir por adelantado qué obligaciones surgirán si ese riesgo se materializa.

### Oria y la magia divina

Oria puede actuar como **Fuente Divina** mediante un Vínculo apropiado.

Sus ámbitos pueden inspirar Vínculos relacionados con acuerdos, testimonio, mediación, custodia documental, protección de registros, identificación de alteraciones o verificación limitada de sellos y términos.

Estos ámbitos no conceden capacidades mecánicas por sí mismos.

Un Vínculo con Oria no proporciona automáticamente detección universal de mentiras, lectura de intenciones, conocimiento perfecto de toda ley, compulsión a obedecer contratos ni creación de obligaciones sobrenaturales sin consentimiento.

Los milagros, Vínculos específicos, ritos contractuales y demás efectos mecánicos permanecen abiertos hasta desarrollo posterior.

## 36. Vael, el Navegante

**Vael, el Navegante** es una de las Cinco Luminarias, Dioses Menores reales surgidos después de los siete Primordiales.

Sus ámbitos tradicionales son **viaje, cambio, tormentas, descubrimiento y fortuna incierta**.

Vael representa la experiencia de abandonar aquello conocido y atravesar un mundo cuyo comportamiento, peligros y oportunidades nunca pueden predecirse por completo.

Una enseñanza tradicional afirma:

**«Respeta el mapa. Desconfía de sus bordes.»**

Vael no sustituye a Aster.

Aster representa la capacidad de reconocer caminos diferentes y elegir cuál recorrer.

Vael representa aquello que sucede después de partir: desvío, incertidumbre, transformación, pérdida de referencias, encuentro y descubrimiento.

**Aster abre el camino. Vael gobierna lo que ocurre cuando realmente lo recorres.**

> **Símbolo religioso canónico:** **El Rumbo Desviado** (`SYM-DIV-VAEL-001`, CANON v1.0). Su geometría, cromática, variante `REDUCED-01`, escalas, área de protección, materiales, perspectiva y reglas de deterioro están fijadas en `docs/visual/SIMBOLOS_CANONICOS.md`. La versión principal se usa desde 32 px; `REDUCED-01` entre 16 y 31 px; por debajo de 16 px no se reproduce el símbolo completo.

### Viaje

El Viaje no exige una distancia determinada.

Puede ser cruzar un océano, atravesar una cordillera, trasladarse a otra ciudad, emigrar, seguir una caravana, acompañar una expedición o regresar a un lugar abandonado décadas antes.

Lo fundamental es abandonar una posición conocida y entrar en otra donde no pueden controlarse por completo las condiciones del recorrido.

El viaje tampoco necesita ser voluntario.

Refugiados, desplazados y personas obligadas por las circunstancias a abandonar su hogar pueden reconocer a Vael aunque la decisión inicial de partir no haya sido libre.

### Cambio

El Cambio de Vael se diferencia del principio de Aster.

Aster representa especialmente el cambio escogido: reconocer alternativas y decidir actuar de otra manera.

Vael representa también el cambio producido por aquello que se encuentra durante el recorrido.

Un viajero puede salir con una intención concreta y regresar con conocimientos, heridas, vínculos o perspectivas que nunca había buscado.

Una máxima vaeliana afirma:

**«Nadie regresa por el mismo camino siendo exactamente quien partió.»**

### Fortuna incierta

Vael no garantiza buena suerte.

La **fortuna incierta** expresa la realidad de actuar cuando una parte significativa del resultado permanece fuera del conocimiento o control de quienes actúan.

Clima, corrientes, encuentros, fallos, oportunidades, cambios de ruta y fenómenos mágicos pueden alterar incluso un plan cuidadosamente preparado.

Preparación, conocimiento y habilidad importan.

No eliminan por completo la incertidumbre.

Por ello los cultos de Vael no consideran la prudencia contraria a su principio.

### Tormentas

Vael no es una deidad elemental del Aire o del Agua.

Las tormentas pertenecen a su ámbito porque representan fuerzas que alteran rutas, destruyen previsiones y obligan a reaccionar ante circunstancias no elegidas.

Una tormenta puede destruir una expedición. También puede revelar una isla, abrir un paso o llevar a un viajero hacia algo que nunca habría encontrado siguiendo el plan original.

Su significado religioso reside en esa capacidad de transformar un recorrido.

### La Primera Ruta Perdida

Las tradiciones de Vael recuerdan un acontecimiento posterior a la era primordial conocido como la **Primera Ruta Perdida**.

No fue necesariamente el primer viaje ni la primera exploración.

Una expedición antigua recorría una ruta conocida hacia un destino conocido cuando una tormenta, alteración natural o fenómeno mágico volvió irreconocible el camino.

Ya no podían regresar conforme a sus mapas ni continuar según el plan.

Según el relato, una de las viajeras señaló una dirección que no figuraba en ninguna carta y dijo:

**«Si el camino desapareció, tendremos que encontrar otro.»**

La expedición continuó y encontró una ruta nueva.

Aquello que descubrió permanece deliberadamente sin establecer.

En ese acontecimiento Vael apareció, fue reconocido o adquirió identidad divina según la tradición que narre el mito.

El canon no decide cuál de esas interpretaciones es correcta.

La Primera Ruta Perdida representa el momento en que el viaje dejó de entenderse únicamente como movimiento entre dos puntos conocidos y comenzó a reconocerse también como relación consciente con lo incierto.

### Mapas y rutas

Los cultos de Vael respetan la cartografía.

Un buen mapa puede salvar vidas.

Pero ningún mapa constituye una descripción eterna del mundo.

Costas cambian, pasos se cierran, bosques alteran rutas, islas aparecen y fenómenos mágicos modifican territorios.

Por ello una carta correcta debe entenderse como la mejor descripción disponible para un momento y propósito concretos.

Esta visión no convierte a la **Hermandad de Cartógrafos del Horizonte** en una institución religiosa. Es un gremio profesional independiente cuyos miembros pueden seguir cualquier culto o ninguno.

### Descubrimiento

El Descubrimiento de Vael incluye aquello que se busca y también aquello que aparece de manera inesperada.

Una expedición puede buscar mineral y encontrar ruinas. Un navegante puede perseguir una ruta y descubrir un pueblo. Un viajero puede investigar un fenómeno y revelar un peligro.

Descubrir no significa necesariamente encontrar algo beneficioso.

El mundo contiene conocimientos y lugares cuya existencia puede producir nuevas responsabilidades o amenazas.

### La Ley del Camino

Numerosas tradiciones de Vael comparten costumbres de ayuda entre viajeros conocidas colectivamente como **Ley del Camino**.

No constituyen una ley jurídica universal.

Sus formulaciones regionales varían, pero suelen incluir principios como:

- no destruir deliberadamente una señal de ruta correcta sin necesidad;
- advertir de un peligro mortal conocido cuando otro viajero depende razonablemente de esa información;
- no inutilizar refugios de emergencia sin causa;
- ofrecer auxilio razonable cuando hacerlo no exige condenar al propio grupo.

Estas obligaciones nacen de reconocer que todo viajero puede depender algún día de aquello que otro dejó detrás.

### Partida y regreso

El regreso forma parte del Viaje tanto como la partida.

Volver puede exigir reintegrarse a un lugar que también cambió durante la ausencia.

Las tradiciones de Vael valoran el relato del viajero porque aquello descubierto puede modificar la comprensión colectiva del mundo.

Esto no obliga a revelar todo conocimiento adquirido. Existen secretos, peligros e información cuya custodia puede pertenecer a otros principios, especialmente a Selene.

### Cultos de Vael

Vael no posee una única iglesia mundial.

Las **Casas del Camino** son santuarios, refugios o pequeños templos situados con frecuencia cerca de caminos, puertos, estaciones, pasos montañosos y rutas de navegación.

Los **Navegantes de Vael** son sacerdotes, religiosos itinerantes, guías o pilotos vinculados a su culto. La denominación no implica que toda persona que navegue profesionalmente pertenezca a esta tradición.

Los **Guardianes de Hitos** mantienen mojones, señales, refugios y marcas utilizadas por viajeros. Pueden además conservar registros locales de cambios en rutas o peligros.

Estas denominaciones describen tradiciones extendidas y no una organización religiosa única.

### Viajeros, migrantes y peregrinos

Vael puede ser venerado tanto por exploradores voluntarios como por quienes viajan por necesidad.

Comerciantes, mensajeros, emigrantes, refugiados, pilotos, marineros, caravaneros, peregrinos y aventureros pueden relacionarse con su culto por motivos diferentes.

Ningún oficio o condición obliga a venerarlo.

### Celebraciones

El **Día de la Partida** es una tradición presente en distintas regiones para bendecir viajeros, revisar rutas, intercambiar noticias y recordar a quienes se encuentran lejos.

Muchas comunidades poseen además celebraciones asociadas con el **Regreso**, especialmente después de temporadas marítimas, caravaneras o expedicionarias peligrosas. Sus nombres y fechas varían ampliamente.

No existe por ahora un calendario universal de Vael.

### Vael y los otros principios

Aster representa la elección de un camino; Vael representa la incertidumbre de recorrerlo.

Aurea representa hogar y continuidad; Vael representa partida y transformación. Sus principios no son enemigos.

Oria permite definir acuerdos y responsabilidades frente a aquello que puede ocurrir. Un seguro expresa bien esa relación: el peligro permanece incierto, pero las partes pueden acordar previamente qué ocurrirá si se materializa.

Khorun permite construir caminos, puentes, barcos, locomotoras y dirigibles capaces de resistir viajes; Vael recuerda que ninguna ingeniería elimina completamente clima, distancia, error, accidente o aquello todavía desconocido.

Varkor representa oposición; Vael representa incertidumbre.

Nemor preserva nombres y memoria de quienes murieron o desaparecieron; Vael representa las rutas en las que esas personas partieron.

Selene se relaciona con el límite que separa lo conocido de aquello que permanece fuera de percepción. **Vael atraviesa el límite; Selene pregunta qué significa que ese límite exista.**

### Vael en la era arcano-industrial

La Segunda Forja transformó los medios de viaje sin eliminar la incertidumbre.

Ferrocarriles, dirigibles, barcos industriales, estaciones y nuevas cartas permiten desplazamientos antes imposibles, pero producen también accidentes, dependencias logísticas y riesgos desconocidos.

Los cultos de Vael pueden encontrarse en puertos, estaciones, aeródromos, caravasares, pasos montañosos y centros de expedición.

Regiones como el **Mar de Nacre**, el **Desierto de Vidrio** y el **Cinturón Flotante de Vigilia** poseen condiciones especialmente relevantes para sus tradiciones, pero ningún territorio pertenece religiosamente a Vael por definición.

La desaparición de expediciones durante la **Crisis de Nacre de 598 C.** puede tener importancia religiosa para sus seguidores, pero el canon todavía no establece qué ocurrió ni cómo reaccionaron sus organizaciones.

### Vael y la magia divina

Vael puede actuar como **Fuente Divina** mediante un Vínculo apropiado.

Sus ámbitos pueden inspirar Vínculos relacionados con viaje, orientación, navegación, movimiento, adaptación durante rutas, supervivencia expedicionaria y respuesta ante cambios inesperados.

Estos ámbitos no conceden capacidades mecánicas por sí mismos.

Un Vínculo con Vael no permite automáticamente conocer la ruta correcta, predecir el futuro, ignorar tormentas, teletransportarse sin límites, manipular la fortuna de manera universal ni saber qué existe más allá de un territorio desconocido.

Los milagros, Vínculos específicos, ritos de viaje y efectos relacionados con fortuna permanecen abiertos hasta su desarrollo posterior.

## 37. Selene, la Velada

**Selene, la Velada** es una de las Cinco Luminarias, Dioses Menores reales surgidos después de los siete Primordiales.

Sus ámbitos tradicionales son **sueño, misterio, percepción, secretos y fronteras entre mundos**.

Selene representa los límites entre aquello que una consciencia puede percibir y aquello que permanece fuera de su alcance, así como la responsabilidad de decidir cuándo una frontera de conocimiento, intimidad o realidad debe ser atravesada.

Una enseñanza tradicional afirma:

**«No todo lo oculto está perdido. No todo lo visible está comprendido.»**

El concepto central de sus tradiciones es **el Velo**: aquello que separa sin necesariamente destruir la relación entre ambos lados.

> **Símbolo religioso canónico:** **El Velo Entreabierto** (`SYM-DIV-SELENE-001`, CANON v1.0). Su geometría, cromática, variante `REDUCED-01`, escalas, área de protección, materiales, perspectiva y reglas de deterioro están fijadas en `docs/visual/SIMBOLOS_CANONICOS.md`. La versión principal se usa desde 32 px; `REDUCED-01` entre 16 y 31 px; por debajo de 16 px no se reproduce el símbolo completo.

### Misterio

Selene no representa toda ignorancia.

Desconocer algo por falta de educación, información o experiencia no convierte automáticamente esa cuestión en un misterio religioso.

El Misterio aparece especialmente cuando existe una frontera significativa entre apariencia y realidad, conocimiento y secreto o aquello que puede observarse y aquello que permanece oculto.

Un misterio tampoco está obligado a permanecer irresuelto.

Puede investigarse, revelarse y comprenderse.

Una enseñanza selenita afirma:

**«Un misterio no exige permanecer cerrado. Exige saber qué puerta estás abriendo.»**

### Percepción

Percibir algo y comprenderlo son actos diferentes.

Una imagen puede ser verdadera pero incompleta. Una voz puede ser real sin que su origen sea evidente. Una manifestación mágica puede detectarse sin revelar automáticamente qué la produjo.

Por ello las tradiciones de Selene distinguen entre **señal** e **interpretación**.

La percepción proporciona acceso parcial a la realidad.

No garantiza comprensión.

Este principio no modifica las reglas generales de Percepción, Ilusión o magia sensorial del sistema.

### Selene y las ilusiones

Las ilusiones poseen afinidad temática con Selene porque exploran la diferencia entre percepción y realidad.

Sin embargo, **Selene no es la propietaria divina de la magia de Ilusión**.

La disciplina arcana de Percepción e Ilusión puede practicarse sin Vínculo religioso, y venerar a Selene no concede automáticamente acceso a sus hechizos.

Dominio religioso y Disciplina mágica permanecen separados.

### Sueño

El sueño altera la relación ordinaria entre consciencia, percepción y memoria.

Por ello pertenece a Selene.

La mayoría de los sueños no son necesariamente sobrenaturales.

No constituyen automáticamente profecías, mensajes divinos, viajes planares ni recuerdos verdaderos.

Sin embargo, determinadas entidades y fenómenos mágicos pueden utilizar estados de sueño como vía de comunicación, influencia o manifestación.

El canon no establece todavía la existencia de un único plano universal de los sueños visitado por toda criatura que duerme.

Las diferentes tradiciones pueden proponer cosmologías oníricas incompatibles sin que ninguna haya recibido confirmación definitiva.

### Visiones y profecías

Una visión puede advertir, simbolizar, comunicar o representar información de manera incompleta.

No garantiza por sí sola que un acontecimiento futuro vaya a producirse exactamente como fue percibido.

Los cultos de Selene pueden poseer tradiciones de interpretación de sueños y visiones, pero ninguna obtiene infalibilidad automática.

El futuro continúa permitiendo elección, cambio, error e incertidumbre.

### Secretos

Un secreto no es automáticamente una transgresión.

Determinada información puede ocultarse para proteger intimidad, seguridad, personas vulnerables, rutas, conocimientos peligrosos o derechos legítimos.

El secreto tampoco es automáticamente virtuoso.

Puede utilizarse para ocultar abuso, explotación, fraude o corrupción.

Selene no enseña que todo secreto deba conservarse.

Enseña que **revelar y ocultar son actos con consecuencias**.

### Secreto, silencio y mentira

Guardar información no equivale necesariamente a realizar una afirmación falsa.

Callar, negarse a responder, cifrar un documento o limitar acceso son acciones diferentes de mentir.

Esta distinción permite que las tradiciones de Selene convivan con la Verdad de Ilyr y con los registros de Oria.

La existencia de un secreto tampoco elimina responsabilidad moral por aquello que se mantiene oculto.

### Privacidad y fronteras de la mente

Numerosas tradiciones de Selene reconocen la **privacidad** como una frontera legítima.

Una persona no pierde automáticamente todo derecho a reservar pensamientos, recuerdos, correspondencia o aspectos íntimos de su vida porque otra persona posea medios para descubrirlos.

Una máxima atribuida a estos cultos afirma:

**«Ser visto no concede derecho a mirar más profundamente.»**

La mente también posee límites.

Los cultos selenitas pueden considerar especialmente delicadas las prácticas capaces de acceder, modificar o extraer recuerdos, sueños, emociones o pensamientos sin consentimiento.

Esto no convierte toda magia mental en una Arte Prohibida ni crea por sí solo una regla jurídica universal.

### La Primera Veladura

Las tradiciones de Selene recuerdan un acontecimiento posterior a la era primordial conocido como la **Primera Veladura**.

En una comunidad antigua, varias personas comenzaron a experimentar sueños extraordinariamente similares.

En ellos aparecía un mismo lugar, una abertura y algo que parecía encontrarse al otro lado.

Con el tiempo se descubrió una anomalía real relacionada con aquellas visiones.

Nadie podía determinar con certeza si observaban otro mundo, eran observados desde él, respondían a una entidad o experimentaban algún fenómeno todavía desconocido.

Cuanto más intentaban comprender la abertura, más parecía responder aquello que existía más allá.

Según la tradición, una guardiana decidió finalmente ocultar el método exacto mediante el cual podía abrirse.

No destruyó todo registro.

Preservó la existencia del peligro, sus señales y aquello necesario para vigilarlo, pero separó ese conocimiento de las instrucciones capaces de atravesar la frontera.

Entonces Selene apareció, fue reconocida o adquirió identidad divina, según la tradición que narre el acontecimiento.

El canon no decide todavía cuál de estas interpretaciones es correcta.

Tampoco determina qué existía al otro lado, dónde ocurrió la Primera Veladura ni qué naturaleza poseía la frontera.

### Conservar no significa permitir acceso

La Primera Veladura expresa una enseñanza central de Selene:

**conservar conocimiento no obliga a hacerlo accesible a cualquiera.**

Determinada información puede necesitar ser registrada precisamente para impedir que se pierda, mientras su acceso permanece limitado porque su uso produciría riesgos.

Esto no convierte el conocimiento mismo en maligno.

La cuestión es quién accede a él, para qué y con qué consecuencias.

### Custodia de secretos

Una formulación extendida sostiene que un secreto legítimamente custodiado debería poder responder, al menos para su custodio, dos preguntas:

**qué protege y de quién necesita protección.**

Esto no obliga a publicar las respuestas.

Distingue la custodia consciente del secreto mantenido únicamente por costumbre, ventaja o poder.

Cuando ocultar información sólo permite continuar una transgresión grave, distintas tradiciones selenitas pueden considerar que la obligación de secreto ha terminado.

### Revelación responsable

El opuesto de guardar un secreto no es necesariamente hacerlo público.

Una información puede revelarse únicamente a quien posee necesidad, responsabilidad o derecho de conocerla.

Por ello los cultos de Selene desarrollan conceptos de **acceso limitado**, **custodia** y **revelación responsable**.

Estas prácticas pueden coincidir con las normas de Oria sin confundirse con ellas.

### Fronteras entre mundos

Selene se relaciona con lugares donde realidades, planos, estados de consciencia o espacios normalmente separados pueden aproximarse, solaparse o comunicarse.

No gobierna necesariamente todos los planos ni conoce automáticamente aquello que existe tras cada frontera.

Su principio se concentra en el **Velo** que separa ambos lados y en los riesgos de percibirlo, debilitarlo o atravesarlo.

### Selene y los otros principios

Vaelun custodia el tránsito del alma asociado a la muerte. Selene se relaciona con fronteras espirituales y planares de naturaleza más amplia.

Oria se ocupa de que información, reglas y acuerdos puedan registrarse, conservarse y verificarse; Selene se ocupa especialmente de **quién puede acceder a determinada información y por qué**.

Ilyr valora la Verdad especialmente cuando engaño y manipulación destruyen dignidad, responsabilidad o consentimiento. Selene reconoce que poseer información verdadera no genera automáticamente obligación de revelarla públicamente.

Nemor protege memoria e identidad histórica; Selene reconoce intimidad y secreto.

Vael representa atravesar lo desconocido; Selene representa comprender que existe un límite y considerar qué significa atravesarlo. Una enseñanza comparativa sostiene: **«Vael pregunta qué encontrarás al cruzar. Selene pregunta si comprendes qué estás cruzando.»**

Aster impulsa elección, descubrimiento y apertura de posibilidades. Selene recuerda que la capacidad de descubrir algo no resuelve automáticamente cómo debería utilizarse o divulgarse.

Nereth puede utilizar secreto, percepción y conocimiento para manipular o dominar. Selene no protege automáticamente aquello que permanece oculto.

### Cultos de Selene

Selene no posee una única iglesia mundial.

Las **Casas del Velo** son templos, santuarios o instituciones dedicadas a contemplación, sueño, confidencialidad y custodia de conocimientos sensibles.

Los **Guardianes del Velo** se ocupan de fenómenos relacionados con fronteras espirituales, anomalías planares, sueños sobrenaturales y conocimientos cuyo acceso requiere precaución.

Los **Oyentes del Velo** son sacerdotes o servidores religiosos especializados en recibir información confidencial, testimonios, sueños o confesiones bajo obligaciones estrictas de custodia.

Estas denominaciones describen tradiciones extendidas y no tres organizaciones universales.

La **Orden del Umbral Sereno** no constituye automáticamente una orden religiosa de Selene. Es una institución independiente formada por religiosos, arcanistas y juristas de procedencias diversas, aunque sus funciones puedan coincidir con preocupaciones selenitas.

### Prácticas de sueño

Algunas tradiciones registran sueños recurrentes o compartidos y comparan sus patrones para identificar posibles influencias sobrenaturales.

Estas prácticas distinguen observación de interpretación.

Que varias personas hayan soñado una misma imagen constituye un dato.

Determinar qué significa continúa requiriendo investigación.

No existe una gramática universal e infalible de los sueños.

### Celebraciones

La **Noche del Velo** es una celebración presente en diferentes tradiciones dedicada al silencio, sueño, intimidad, contemplación y aquello que no necesita exposición pública.

La **Vigilia de los Umbrales** aparece especialmente en regiones donde existen sellos, lugares liminales o fenómenos planares. Sus participantes revisan custodias, señales y registros vinculados a esos lugares.

Sus fechas y formas concretas varían según región y cultura.

### Selene en Edria contemporánea

Los principios de Selene poseen especial relevancia en una sociedad donde investigación arcana, archivos, espionaje, magia mental y entidades externas forman parte de la realidad política.

Lysendra, con sus regulaciones sobre conjuración y manipulación de memoria, contiene debates especialmente compatibles con sus dominios, pero el Principado no pertenece por ello al culto de Selene.

El **Problema de los Umbrales** vuelve particularmente relevantes a sus tradiciones en el presente de 612 C., sin demostrar que Selene conozca la causa del debilitamiento entre planos ni que pueda solucionarlo automáticamente.

Fenómenos como las alteraciones perceptivas del **Bosque de las Mil Voces** o las imágenes imposibles del **Desierto de Vidrio** pueden atraer investigadores vinculados a Selene, pero no constituyen por sí mismos manifestaciones de la diosa.

### Selene y la magia divina

Selene puede actuar como **Fuente Divina** mediante un Vínculo apropiado.

Sus ámbitos pueden inspirar Vínculos relacionados con sueño, percepción, custodia de secretos, ocultación limitada, vigilancia, resistencia frente a intrusión mental y reconocimiento de alteraciones en fronteras espirituales.

Estos ámbitos no conceden capacidades mecánicas por sí mismos.

Un Vínculo con Selene no permite automáticamente detectar mentiras, leer pensamientos, conocer secretos, recibir profecías infalibles, volverse perfectamente invisible, atravesar fronteras planares ni conocer aquello que existe detrás de todo Umbral.

**La diosa del Misterio no elimina mecánicamente el misterio.**

Los milagros, Vínculos específicos, ritos oníricos, capacidades de custodia y efectos relacionados con Umbrales permanecen abiertos hasta su desarrollo posterior.

## 38. Relaciones del Panteón y límites de canon

Los siete Primordiales y las cinco Luminarias forman los **Doce del Panteón Central canónico conocido**.

Los siete principios Primordiales forman una secuencia cosmológica: Eïra y Khorun describen Vida y Forma; Varkor introduce Conflicto; Aster, Elección; Ilyr, responsabilidad moral; Nereth, la corrupción deliberada de esos límites; Vaelun, el derecho al final y al tránsito.

Las cinco Luminarias son divinidades posteriores y no extensiones de esa secuencia primordial. Sus ámbitos se concentran en relaciones, instituciones, prácticas y límites desarrollados por sociedades conscientes: **Aurea** en cuidado, hogar y reconstrucción; **Nemor** en memoria de los muertos y límites entre generaciones; **Oria** en acuerdos, ley, intercambio y registro; **Vael** en viaje, incertidumbre y transformación; **Selene** en percepción, secreto, sueño y fronteras veladas.

Los dominios divinos no son propiedades exclusivas. Compartir un ámbito no implica identidad, subordinación ni parentesco necesario entre deidades.

Los cultos no son equivalentes a las deidades. Instituciones religiosas pueden equivocarse, dividirse, corromperse o interpretar de forma diferente un mismo principio. Una deidad no aprueba automáticamente todo lo que una organización realiza en su nombre.

Las deidades pueden actuar como **Fuente Divina** para personajes con un Vínculo apropiado. Esto concede acceso narrativo/mágico según las reglas correspondientes, no autoridad moral automática, inmunidad a consecuencias ni un paquete universal de poderes.

### Estado pendiente de símbolos

Los símbolos religiosos de las Luminarias se desarrollan mediante el estándar común del registro técnico. **Aurea ya posee símbolo completo CANON v1.0 para La Llama Custodiada**, mientras que Nemor posee símbolo completo CANON v1.0 para El Umbral de Piedra; Oria, Vael y Selene continúan sin símbolo doctrinal fijado. La ficha de Aurea está cerrada. Nemor, Oria, Vael y Selene continúan pendientes de definición bajo el mismo estándar.

La estructura obligatoria para diseñarlos y reproducirlos es el **Estándar Universal de Símbolos Canónicos** definido en `docs/visual/SIMBOLOS_CANONICOS.md`. Cada símbolo sólo pasará a CANON cuando su ficha complete geometría, reconocimiento, color, variantes, pruebas y activo maestro conforme a ese estándar.

Permanecen abiertos para desarrollo futuro los elementos que el canon vigente mantiene expresamente sin fijar: símbolos doctrinales pendientes de las Luminarias, avatares y manifestaciones no definidas, estructuras universales de culto, calendarios exactos de festividades, milagros detallados, Vínculos Divinos específicos, planos, destino último de las almas, Archidemonios concretos, mecánicas completas de corrupción/posesión/Necromancia y numerosos paquetes jugables de pueblos primordiales. El Manual Maestro no rellena esos huecos por inferencia.
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
minas, rutas y oportunidades. Los paquetes raciales del sistema **describen** anatomía, sentidos, adaptaciones y relaciones mágicas; sus reglas completas están unificadas en **3. Creación de personaje > Paso 1**. La cultura se define aparte y no altera automáticamente el paquete.
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

# APÉNDICE — PROCEDENCIA DEL ARCHIVO NARRATIVO HISTÓRICO

> **FUERA DEL CIRCUITO EDITORIAL ACTIVO desde 2026-10-06.** El antiguo bloque «PARTE III — ARCHIVO NARRATIVO RECUPERADO DEL MANUAL LARGO v0.2» fue retirado del Manual Maestro después de promover y depurar el material ratificado de los siete Primordiales. Su copia íntegra se conserva únicamente para trazabilidad en:
>
> \`docs/archive/historico/ARCHIVO_NARRATIVO_RECUPERADO_MANUAL_v0.2_2026-10-06.md\`
>
> El archivo histórico no crea canon, no debe consultarse como fuente de trabajo habitual y sólo se recupera cuando sea necesario verificar procedencia o revisar material todavía no promovido. Toda decisión vigente debe estar escrita en este Manual Maestro.
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

El Archivo Narrativo Recuperado ya no forma parte del circuito editorial activo. El trabajo nuevo se realiza directamente en este Manual y cualquier recuperación histórica debe ser explícita.

1. Diseñar mediante una estructura común los **símbolos religiosos de las Cinco Luminarias** y realizar después una pasada única de coherencia sobre los Doce del Panteón Central.
2. Desarrollar la **historia intermedia de Edria** entre los grandes hitos ya canónicos, sin inventar sobre espacios deliberadamente abiertos.
3. Completar ejemplos de juego, ejemplos de creación y ejemplos de combate sin alterar reglas.
4. Revisar tablas de equipo, precios, disponibilidad y contenido de mercado para edición.
5. Resolver cualquier plantilla universal pendiente que todavía obligue a improvisar valores —por ejemplo perfiles concretos de Familiares, PNJ o criaturas— antes de considerarla sección editorialmente cerrada.
6. Añadir glosario e índices al final del proceso.
7. Sólo después de cerrar el contenido se realizará maquetación, selección final de arte, paginación, créditos, pruebas de impresión y exportación PDF/DOCX.

## Regla de trabajo desde esta versión

**No crear un segundo manual maestro.** Toda corrección o ampliación se hace en este archivo y se respalda mediante commits de GitHub. Los documentos históricos, fuentes externas congeladas y archivos de proceso permanecen fuera del circuito editorial habitual y se consultan únicamente para recuperar información o verificar procedencia.



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
