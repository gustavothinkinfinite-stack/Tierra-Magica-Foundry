# Símbolos Canónicos de Tierra Mágica

> **ANEXO TÉCNICO CONTROLADO POR EL MANUAL MAESTRO.** Este documento registra la construcción reproducible de símbolos visuales ya autorizados por `docs/Tierra_Magica_Manual_Maestro.md`. No crea por sí solo entidades, religiones, ciudades, instituciones ni canon narrativo nuevo. Si una ficha contradice el Manual Maestro, prevalece el Manual y la ficha queda en estado **INCONSISTENTE** hasta corregirse.

## 1. Propósito

Todo símbolo canónico de Tierra Mágica debe quedar definido con suficiente precisión para poder:

- reproducirse sin reinterpretación creativa;
- reconocerse en diferentes materiales y escalas;
- utilizarse en ilustraciones, mapas, banderas, arquitectura, objetos, documentos e interfaces;
- reconstruirse aunque el archivo gráfico original no esté disponible;
- verificarse objetivamente contra su definición canónica.

Este estándar se aplica a símbolos de deidades, ciudades, naciones, casas, órdenes, cultos, gremios, instituciones, facciones, regiones y cualquier otra entidad que reciba una identidad simbólica formal.

## 2. Autoridad y relación con el Manual Maestro

La autoridad narrativa y de diseño continúa siendo:

`docs/Tierra_Magica_Manual_Maestro.md`

Este archivo es un **registro técnico especializado incorporado por referencia**. Una ficha sólo puede pasar a **CANON** cuando:

1. la entidad ya existe o ha sido autorizada por el Manual Maestro;
2. la definición del símbolo fue aprobada explícitamente;
3. el Manual Maestro registra o referencia que dicho símbolo quedó fijado;
4. la ficha cumple este estándar de reproducibilidad.

Los activos gráficos derivados podrán almacenarse en:

`assets/symbols/`

La ficha define conceptualmente y constructivamente el símbolo. El SVG maestro constituye su implementación geométrica exacta. PNG, JPG, renders, bordados, monedas, pinturas y demás representaciones son derivados y no modifican el símbolo por sí mismos.

Si ficha y SVG maestro entran en contradicción, el símbolo queda marcado como **INCONSISTENTE** hasta resolver la discrepancia. No se elige silenciosamente una versión.

## 3. Identificador canónico

Formato:

`SYM-[TIPO]-[ENTIDAD]-[NÚMERO]`

Tipos iniciales:

| Código | Uso |
|---|---|
| `DIV` | Deidad |
| `CITY` | Ciudad |
| `NATION` | Nación o estado |
| `ORG` | Organización o institución |
| `ORDER` | Orden |
| `CULT` | Culto o tradición religiosa |
| `GUILD` | Gremio |
| `FACTION` | Facción |
| `HOUSE` | Casa o linaje |
| `REGION` | Región |
| `OTHER` | Categoría todavía no normalizada |

Ejemplo: `SYM-DIV-AUREA-001`.

El ID permanece estable aunque posteriormente cambie el nombre visible de la entidad.

## 4. Estado del símbolo

Estados permitidos:

- **BORRADOR** — en diseño; no debe reutilizarse como identidad oficial.
- **PROVISIONAL** — apto para pruebas; todavía puede cambiar.
- **CANON** — definición aprobada y obligatoria.
- **REVISIÓN** — símbolo anteriormente canónico sometido a revisión explícita.
- **INCONSISTENTE** — ficha, activo maestro o Manual Maestro discrepan.
- **RETIRADO** — conservado sólo por historia y trazabilidad.

Un símbolo sólo puede considerarse CANON cuando todos sus campos obligatorios estén definidos y supere la prueba de reproducibilidad.

## 5. Identidad básica obligatoria

Cada ficha registra:

- **ID canónico**
- **Entidad**
- **Nombre del símbolo**
- **Tipo**
- **Estado**
- **Versión**
- **Fecha de aprobación**

## 6. Concepto

Antes de definir geometría, la ficha debe responder:

- qué representa;
- qué ideas debe comunicar;
- por qué esos elementos pertenecen a esa entidad;
- qué no pretende representar.

La explicación conceptual nunca sustituye la definición geométrica.

## 7. Núcleo geométrico inmutable

Toda construcción se define sobre:

- **Lienzo maestro:** `1000 × 1000` unidades.
- **Sistema de coordenadas:** `viewBox="0 0 1000 1000"`.

Cada componente debe describirse mediante formas reconstruibles: círculos, elipses, líneas, arcos, rectángulos, polígonos, curvas, formas cerradas y espacios negativos.

Para cada componente se especifican, cuando correspondan:

- posición;
- dimensiones;
- ángulo;
- radio;
- grosor;
- puntos de inicio y fin;
- relación con otros elementos;
- orden de superposición.

Las curvas complejas deben quedar definidas mediante puntos o trayectoria vectorial suficiente.

No son aceptables como definición final expresiones ambiguas como «aproximadamente circular», «parecido a una llama» o «una curva elegante».

## 8. Módulo de construcción

Cada símbolo puede definir una unidad interna **X**.

Ejemplo:

`X = 40 unidades`

A partir de ella pueden expresarse:

- grosor de trazos;
- separaciones;
- márgenes;
- radios;
- área de protección.

Esto permite escalar sin alterar proporciones.

## 9. Ejes y simetría

Debe declararse:

- eje vertical: sí/no;
- eje horizontal: sí/no;
- simetría rotacional: sí/no y ángulo;
- asimetrías deliberadas.

Un símbolo declarado simétrico no admite asimetrías improvisadas.

## 10. Orientación canónica

Debe fijarse:

- arriba;
- abajo;
- izquierda;
- derecha;
- orientación principal;
- rotación permitida o prohibida;
- reflejo horizontal permitido o prohibido;
- reflejo vertical permitido o prohibido.

Un reflejo no se considera automáticamente el mismo símbolo.

## 11. Orden de capas

Cuando existan superposiciones debe fijarse el orden exacto de atrás hacia delante.

Ejemplo:

1. disco posterior;
2. anillo;
3. figura central;
4. trazo frontal.

## 12. Espacio negativo

Los huecos estructurales forman parte de la geometría cuando así se declare.

Debe especificarse:

- espacios negativos obligatorios;
- forma;
- dimensiones;
- separación mínima;
- si pueden rellenarse o no.

## 13. Proporciones

Deben fijarse explícitamente:

- relación ancho/alto;
- proporción entre componentes;
- grosor relativo;
- separaciones;
- distancias al centro;
- tamaño relativo de elementos secundarios.

No se modifican proporciones para «hacerlo quedar mejor».

## 14. Colores canónicos

Cada color canónico registra:

- nombre interno;
- HEX;
- RGB;
- opcionalmente aproximación CMYK.

Los nombres narrativos —por ejemplo «oro antiguo»— no son suficientes sin valores técnicos.

Los efectos de material no modifican el color base salvo variante autorizada.

## 15. Jerarquía cromática

Debe declararse qué color corresponde a:

- elemento principal;
- elemento secundario;
- fondo;
- contorno;
- espacio negativo.

También debe indicarse qué colores pueden intercambiarse y cuáles no.

## 16. Versión monocroma obligatoria

Todo símbolo CANON debe funcionar sin color.

Debe especificarse:

- masas sólidas;
- vacíos;
- trazos que permanecen;
- relación entre positivo y negativo.

Debe funcionar para grabado, sello, talla, estampado, bordado e impresión simple.

## 17. Versión invertida

Debe indicarse expresamente si existe una variante autorizada para fondos oscuros.

Si no existe, no se inventa durante el uso.

## 18. Rasgos de reconocimiento obligatorio

Cada símbolo tendrá entre **2 y 5 rasgos** que constituyen su identidad visual mínima.

Deben seguir siendo reconocibles incluso cuando el símbolo:

- aparece pequeño;
- está parcialmente oculto;
- aparece en perspectiva;
- está erosionado;
- está bordado;
- está tallado;
- aparece sobre una bandera en movimiento.

Si estos rasgos desaparecen, la representación deja de considerarse fiable.

## 19. Elementos obligatorios

Lista exacta de elementos que no pueden desaparecer en la versión principal.

No se añaden ni eliminan elementos por razones decorativas.

## 20. Elementos prohibidos

Cada ficha registra transformaciones que alteran identidad, por ejemplo:

- añadir corona;
- cerrar una apertura;
- invertir orientación;
- añadir texto;
- cambiar número de puntas;
- convertir líneas rectas en llamas;
- añadir alas.

La lista es específica para cada símbolo.

## 21. Variantes autorizadas

Una variante sólo existe si está documentada.

Categorías posibles:

- Principal
- Monocroma
- Invertida
- Reducida
- Sello
- Heráldica
- Cartográfica
- Ceremonial

No todos los símbolos necesitan todas.

Una variante nueva se define antes de utilizarse como canon.

## 22. Versión reducida

Si el símbolo necesita utilizarse a escala muy pequeña, la ficha especificará:

- elementos que desaparecen;
- simplificaciones autorizadas;
- proporciones que se conservan.

No es una simplificación libre.

## 23. Tamaño mínimo

Cada ficha podrá registrar, después de pruebas:

- tamaño mínimo digital principal;
- tamaño mínimo digital reducido;
- tamaño mínimo impreso;
- tamaño mínimo para grabado.

Por debajo del límite se utiliza una variante reducida autorizada o no se reproduce el símbolo.

## 24. Área de protección

Debe establecerse un espacio libre mínimo alrededor del símbolo, preferentemente expresado mediante X.

Ejemplo:

`Área de protección = 2X desde el punto exterior más próximo`.

Dentro de esa zona no se colocan texto, emblemas o elementos gráficos dominantes en usos formales.

## 25. Acabado contextual

Puede variar sin alterar geometría:

- hierro;
- bronce;
- oro;
- piedra;
- madera;
- tela;
- esmalte;
- vitral;
- pintura;
- mosaico;
- luz mágica.

También puede variar el estado físico: nuevo, erosionado, roto, quemado, oxidado, cubierto de polvo.

El deterioro no autoriza rediseño.

## 26. Uso cultural

Cada ficha indicará dónde suele aparecer:

- templos;
- estandartes;
- sellos;
- monedas;
- armaduras;
- edificios;
- altares;
- documentos;
- barcos;
- estaciones;
- tumbas;
- mapas;
- otros usos específicos.

Esto orienta presencia narrativa sin alterar construcción.

## 27. Símbolo e iconografía

Siempre se diferencian:

- **símbolo**
- **iconografía de la entidad**

Vestimenta, herramientas, animales, gestos, colores ambientales o escenarios asociados a una entidad no forman automáticamente parte de su símbolo.

Del mismo modo:

**símbolo de ciudad ≠ escudo ≠ bandera ≠ sello ≠ marca cartográfica**, salvo definición expresa.

## 28. Fidelidad de reproducción

### EXACTA

Geometría sin modificaciones. Preferentemente mediante SVG maestro o derivado directo.

Usos típicos: sello, bandera formal, mapa, documento, interfaz, primer plano.

### FIEL

Admite perspectiva, textura, iluminación, deformación física del soporte y desgaste parcial. Conserva geometría fundamental y rasgos de reconocimiento.

Ejemplos: bandera ondeando, talla, bordado, moneda en perspectiva.

### SUGERIDA

Uso distante, fragmentado o deteriorado donde sólo pueden conservarse rasgos principales.

Debe mantener los rasgos de reconocimiento obligatorio y nunca inventar otra geometría.

## 29. Instrucción técnica de reproducción

Cada ficha debe contener una secuencia reconstruible.

Formato recomendado:

1. crear lienzo 1000 × 1000;
2. trazar componente A con coordenadas exactas;
3. construir componente B;
4. aplicar espacio negativo;
5. aplicar orden de capas;
6. asignar colores;
7. verificar proporciones y orientación.

Debe poder ejecutarse sin decisiones estéticas adicionales.

## 30. Instrucción breve para ilustraciones

Cada ficha incluye una versión resumida destinada a escenas:

- forma obligatoria;
- orientación;
- colores;
- rasgos de reconocimiento;
- prohibiciones.

Si el símbolo ocupa un lugar importante o debe verse con precisión, no se confía sólo en descripción generativa: se usa el activo maestro como referencia o se integra posteriormente sobre la ilustración.

## 31. Activo vectorial maestro

Nombre:

`[ID]_MASTER.svg`

Debe:

- usar `viewBox="0 0 1000 1000"`;
- respetar exactamente la ficha;
- mantener formas vectoriales editables;
- evitar tipografía necesaria salvo que sea parte canónica;
- evitar efectos rasterizados innecesarios.

## 32. Vista de referencia

Nombre:

`[ID]_PREVIEW.png`

Sirve para inspección rápida.

No sustituye la ficha ni el SVG.

## 33. Huella de integridad

Cuando exista SVG maestro aprobado, la ficha registrará su **SHA-256**.

Esto permite detectar reemplazos o modificaciones accidentales.

## 34. Versionado

Formato:

`vMAJOR.MINOR`

Cambio **MAJOR** cuando se modifica:

- geometría;
- proporciones;
- elementos obligatorios;
- orientación;
- identidad cromática fundamental.

Cambio **MINOR** cuando se amplía:

- uso;
- contexto;
- material;
- explicación;
- variante compatible sin alterar identidad principal.

El historial de Git mantiene además trazabilidad editorial.

## 35. Historial

Cada ficha conserva:

- versión;
- fecha;
- cambio;
- motivo.

Nunca se sustituye un símbolo canónico sin trazabilidad.

## 36. Validación antes de canonizar

Un símbolo sólo pasa a CANON cuando puede responder sin ambigüedad:

- qué formas posee;
- dónde están;
- qué tamaño tienen;
- qué orientación tienen;
- qué elementos son obligatorios;
- qué espacios negativos importan;
- qué colores utiliza;
- cómo funciona sin color;
- qué puede modificarse;
- qué no puede modificarse;
- cómo se reconoce a pequeña escala.

Si para reproducirlo todavía hay que decidir algo estético, la ficha no está terminada.

## 37. Prueba de reproducibilidad

Antes de aprobarse debe comprobarse al menos en:

1. símbolo plano;
2. monocromo;
3. grabado o tallado;
4. tela o bandera;
5. aparición pequeña dentro de una escena.

Si alguna prueba exige inventar una solución no definida, se corrige la ficha primero.

## 38. Regla de no improvisación

Una vez que un símbolo está en estado CANON:

**no se rediseña durante la creación de una ilustración.**

El acabado puede adaptarse al contexto.

La geometría no.

Si se necesita una variante nueva, se define y aprueba antes.

## 39. Regla para nuevas entidades

Ninguna ciudad, deidad, estado, organización o facción recibe automáticamente un símbolo porque aparezca en una ilustración.

Proceso obligatorio:

1. crear ficha;
2. diseñar;
3. probar;
4. aprobar;
5. registrar en el Manual Maestro;
6. utilizar como símbolo canónico.

Una ilustración accidental nunca crea canon.

## 40. Plantilla de ficha

### Identidad

**ID canónico:**  
**Entidad:**  
**Nombre del símbolo:**  
**Tipo:**  
**Estado:**  
**Versión:**  
**Fecha de aprobación:**  

### Concepto

**Representa:**  
**Ideas que debe comunicar:**  
**Justificación de sus elementos:**  
**No representa:**  

### Construcción

**Lienzo maestro:** 1000 × 1000  
**Módulo X:**  
**Construcción geométrica:**  
**Ejes y simetría:**  
**Orientación:**  
**Rotación permitida:**  
**Reflejo horizontal permitido:**  
**Reflejo vertical permitido:**  
**Orden de capas:**  
**Espacio negativo:**  
**Proporciones:**  

### Color

**Colores canónicos:**  
**Jerarquía cromática:**  
**Versión monocroma:**  
**Versión invertida:**  

### Reconocimiento

**Rasgos de reconocimiento obligatorio:**  
**Elementos obligatorios:**  
**Elementos prohibidos:**  

### Variantes y escala

**Variantes autorizadas:**  
**Versión reducida:**  
**Tamaño mínimo:**  
**Área de protección:**  

### Contexto

**Materiales y acabados permitidos:**  
**Usos culturales habituales:**  
**Relación con otra iconografía:**  

### Reproducción

**Instrucción técnica completa:**  
**Instrucción breve para ilustraciones:**  
**Nivel de fidelidad requerido por uso:**  

### Activos

**Archivo SVG maestro:**  
**Archivo PNG de referencia:**  
**SHA-256 del SVG maestro:**  

### Historial

**Historial de versiones:**  

## 41. Principio rector

> **Un símbolo canónico de Tierra Mágica debe poder reconstruirse sin decisiones creativas adicionales.**

La creatividad ocurre al diseñarlo.

Después de canonizarlo, la tarea es reproducirlo.

---

# REGISTRO DE SÍMBOLOS

El registro contiene fichas en distintos estados. Sólo las marcadas **CANON** han completado todo el estándar. Una geometría aprobada dentro de una ficha PROVISIONAL no puede modificarse sin revisión explícita.

## SYM-DIV-AUREA-001 — La Llama Custodiada

### Identidad

**ID canónico:** `SYM-DIV-AUREA-001`  
**Entidad:** Aurea, la Llama  
**Nombre del símbolo:** La Llama Custodiada  
**Tipo:** DIV — deidad / símbolo religioso  
**Estado:** **CANON**  
**Versión:** v1.0  
**Fecha de aprobación geométrica:** 2026-10-07  
**Fecha de aprobación cromática:** 2026-10-07  
**Fecha de aprobación de escala:** 2026-10-07  
**Fecha de canonización completa:** 2026-10-07  

La ficha ha completado geometría, cromática, reducción, escala, área de protección y pruebas contextuales/materiales. Desde v1.0 constituye la definición canónica completa de La Llama Custodiada.

### Concepto

**Representa:** la vida concreta que alguien decide mantener encendida y la custodia que la protege sin convertirla en prisión.

**Ideas que debe comunicar:** llama sostenida, cuidado, hogar, protección abierta y capacidad de renovación.

**Justificación de sus elementos:** una única llama expresa continuidad; dos brazos curvos laterales expresan custodia sin cierre; el vacío interior en forma de semilla/gota expresa renovación y posibilidad de recomenzar.

**No representa:** fuego elemental de Khorun, autoridad moral universal de Ilyr, ciclo natural de Eïra, guerra, heráldica estatal ni una casa literal.

### Construcción

**Lienzo maestro:** 1000 × 1000  
**Módulo X:** 40 unidades.

**Caja geométrica principal aproximada:** X 248–752; Y 150–850. La altura estructural es 700 unidades.

**Estructura:** tres masas cerradas: brazo izquierdo, brazo derecho y llama central compuesta con un único vacío interior.

**Trayectorias maestras exactas:**

```svg
<!-- brazo izquierdo -->
<path d="M420 850 C405 815 380 775 340 740 C285 692 255 630 248 565 C242 500 265 425 305 335 C314 315 325 321 322 350 C312 415 300 470 306 520 C314 585 346 635 391 675 C426 706 446 740 440 783 C436 812 430 837 420 850 Z"/>

<!-- brazo derecho -->
<path d="M580 850 C595 815 620 775 660 740 C715 692 745 630 752 565 C758 500 735 425 695 335 C686 315 675 321 678 350 C688 415 700 470 694 520 C686 585 654 635 609 675 C574 706 554 740 560 783 C564 812 570 837 580 850 Z"/>

<!-- llama central + vacío interior; fill-rule="evenodd" -->
<path fill-rule="evenodd" d="M500 775 C478 735 440 700 405 665 C360 620 345 560 365 500 C385 440 430 390 470 340 C510 290 535 245 520 150 C566 181 600 225 610 280 C620 340 590 380 590 410 C590 455 615 470 630 405 C665 455 675 520 655 585 C635 645 585 690 545 730 C525 750 510 770 500 775 Z M500 430 C530 470 538 515 530 565 C523 607 510 635 500 645 C477 628 463 598 460 555 C457 510 470 465 500 430 Z"/>
```

Estas trayectorias son normativas. Una reconstrucción vectorial no debe reinterpretarlas.

**Ejes y simetría:** los dos brazos de custodia son reflejos geométricos respecto de X=500. La llama central posee asimetría deliberada y obligatoria en su zona superior: su punta se desplaza hacia la derecha y contiene una segunda lengua/concavidad en ese lado. El conjunto conserva equilibrio bilateral sin convertir la llama en una figura simétrica.

**Orientación:** vertical, punta de la llama hacia arriba.

**Rotación permitida:** no.  
**Reflejo horizontal permitido:** no.  
**Reflejo vertical permitido:** no.

**Orden de capas:** las tres masas se encuentran en un mismo plano gráfico y no se superponen. El vacío interior se recorta mediante regla par-impar dentro de la llama central.

**Espacio negativo obligatorio:**
- corredor abierto entre brazo izquierdo y llama;
- corredor abierto entre brazo derecho y llama;
- vacío único interior con forma de gota/semilla;
- apertura inferior entre ambos brazos.

Ninguno puede rellenarse en la versión principal.

### Proporciones aprobadas

- altura de la figura: 700 unidades;
- ancho máximo aproximado: 504 unidades;
- punto superior normativo: (520,150);
- punto inferior de la llama central: (500,775);
- extremos inferiores de brazos: (420,850) y (580,850);
- vacío interior: aproximadamente X 460–538 / Y 430–645;
- eje estructural: X=500.

Los valores exactos de contorno están definidos por las trayectorias SVG maestras.

### Color

La cromática formal de **La Llama Custodiada** queda aprobada y no puede alterarse sin revisión explícita.

| Nombre | Función | HEX | RGB |
|---|---|---|---|
| **Oro Aureano** | color principal del símbolo | `#D9A14A` | 217, 161, 74 |
| **Azul Custodio** | campo oscuro principal y alternativa del símbolo | `#202A46` | 32, 42, 70 |
| **Marfil del Reencendido** | campo claro e inversión | `#F3E7CF` | 243, 231, 207 |
| **Ámbar de Resplandor** | iluminación contextual exclusivamente | `#FFD98A` | 255, 217, 138 |

**Jerarquía cromática oficial:**

1. **Principal:** símbolo completo en Oro Aureano sobre Azul Custodio.
2. **Campo claro:** símbolo completo en Azul Custodio sobre Marfil del Reencendido.
3. **Invertida:** símbolo completo en Marfil del Reencendido sobre Azul Custodio.

La llama y los brazos de custodia utilizan siempre el mismo color dentro de una versión formal. Queda prohibida la separación cromática interna entre esos componentes.

**Versión monocroma:** masa sólida negra sobre fondo claro o masa sólida blanca/marfil sobre fondo oscuro. No utiliza grises para diferenciar componentes. Los espacios negativos siguen siendo vacíos reales.

**Versión invertida autorizada:** Marfil del Reencendido sobre Azul Custodio.

**Ámbar de Resplandor:** no forma parte de la geometría ni de la marca plana. Sólo puede usarse como halo o emisión luminosa contextual cuando la representación realmente emite luz. No puede rellenar espacios negativos ni modificar el contorno.

**Gradientes en marca formal:** prohibidos.  
**Sombras en marca formal:** prohibidas.  
**Textura metálica incorporada al SVG formal:** prohibida.  
**Dependencia cromática para reconocimiento:** prohibida.

El color **Oro Aureano** y un material físico de oro, bronce o latón son conceptos distintos. En objetos diegéticos el material puede variar mientras conserve la geometría; los valores HEX/RGB son obligatorios para reproducción gráfica EXACTA.

### Reconocimiento

**Rasgos de reconocimiento obligatorio:**

1. una única llama vertical central;
2. dos brazos curvos laterales, abiertos hacia arriba;
3. los brazos no tocan ni encierran completamente la llama;
4. un único vacío interior en forma de gota/semilla dentro de la llama.

**Elementos obligatorios:** llama central asimétrica, ambos brazos, apertura entre brazos y llama, vacío interior.

**Elementos prohibidos en la versión principal:** círculo exterior, escudo heráldico, techo de casa, manos anatómicas, corazón, espada, alas, rayos solares, corona, texto, runas adicionales, múltiples llamas, antorcha, brasero, árbol o ramas.

### Variantes y escala

**Variantes cromáticas autorizadas:**

- `PRIMARY-01` — Oro Aureano `#D9A14A` sobre Azul Custodio `#202A46`.
- `LIGHT-01` — Azul Custodio `#202A46` sobre Marfil del Reencendido `#F3E7CF`.
- `INVERTED-01` — Marfil del Reencendido `#F3E7CF` sobre Azul Custodio `#202A46`.
- `MONO-GEOMETRY-01` — negro sobre fondo claro, reservado para construcción, reproducción monocroma y pruebas.

No existen otras combinaciones cromáticas oficiales.

#### Versión reducida — REDUCED-01

`REDUCED-01` es la única simplificación geométrica autorizada para tamaños pequeños.

Conserva obligatoriamente:

- ambos brazos de custodia sin modificación;
- llama central;
- apertura entre brazos y llama;
- vacío interior de semilla/gota;
- orientación vertical.

La llama reducida elimina la concavidad secundaria derecha de la versión principal y amplía el vacío interior para conservar legibilidad.

**Trayectoria reducida normativa de la llama:**

```svg
<path fill-rule="evenodd" d="M500 775 C478 735 440 700 405 665 C360 620 345 560 365 500 C385 440 430 390 470 340 C510 290 535 245 520 160 C570 195 605 245 615 300 C625 355 610 410 625 455 C640 500 675 520 660 585 C645 645 590 690 545 730 C525 750 510 770 500 775 Z M500 410 C540 465 548 525 535 580 C528 620 513 650 500 665 C470 642 452 607 448 555 C444 500 462 450 500 410 Z"/>
```

Los brazos permanecen idénticos al SVG maestro principal.

#### Umbrales de escala

| Uso | Regla |
|---|---|
| **32 px o más** | utilizar versión principal |
| **16–31 px** | utilizar `REDUCED-01` |
| **menos de 16 px** | no reproducir el símbolo completo |

**Impresión mínima recomendada de la versión principal:** 8 mm de alto.  
**Grabado o talla mínima recomendada:** 12 mm de alto.  
**Bordado mínimo recomendado:** 20 mm de alto.

No se autoriza una tercera versión «micro». Por debajo de 16 px debe usarse una etiqueta, marcador genérico o composición posterior con activo maestro si la identidad necesita resultar legible.

#### Área de protección

**Área mínima formal:** `2X = 80 unidades` desde el punto exterior más próximo del símbolo.

Tomando como caja geométrica aproximada X 248–752 / Y 150–850, la zona formal protegida resultante es aproximadamente:

- X 168–832;
- Y 70–930.

Texto, otros emblemas, marcos decorativos o elementos gráficos dominantes no deben penetrar esa zona en documentos, interfaces, sellos formales, señalética o identidad editorial.

En representaciones diegéticas —talla arquitectónica, armadura, bordado, ruina, objeto deteriorado— el entorno puede aproximarse más, siempre que los rasgos obligatorios continúen reconocibles.

#### Regla para ilustraciones

Si el símbolo debe aparecer con una altura final inferior a aproximadamente 32 px, utilizar `REDUCED-01`. Si quedará por debajo de 16 px, no exigir al proceso generativo la reproducción detallada: integrar posteriormente el activo apropiado si su identidad necesita ser legible.

### Contexto

#### Materiales y acabados autorizados

La Fase 4 validó el símbolo sin rediseño en documento/sello, bronce grabado, piedra tallada, bordado ceremonial, vitral o señal luminosa y arquitectura en perspectiva.

**Metal:** oro, bronce, latón, hierro y otros metales pueden utilizarse como acabado contextual. No necesitan imitar el valor HEX del Oro Aureano. Si símbolo y soporte comparten material debe existir relieve, incisión, pátina o iluminación suficiente para preservar los rasgos obligatorios.

**Piedra y madera:** se permiten relieve, bajorrelieve, incisión y desgaste natural. No se cierran aperturas ni se compensan partes erosionadas rediseñando la geometría.

**Tela y bordado:** la textura del hilo y pequeñas irregularidades físicas son válidas; no pueden añadir contornos nuevos, cerrar la semilla interior ni unir brazos y llama. Se conserva el mínimo recomendado de 20 mm.

**Vidrio y luz:** se permiten transparencia, translucidez y emisión luminosa. El Ámbar de Resplandor `#FFD98A` puede actuar como halo contextual pero no como relleno de los espacios negativos.

#### Perspectiva y deformación física

La perspectiva, curvatura de tela o geometría física del soporte pueden deformar visualmente el símbolo en una representación **FIEL**. Esa deformación no constituye una variante y nunca puede guardarse como nueva geometría plana.

#### Deterioro

Se permiten desgaste, grietas, oxidación, suciedad y pérdida parcial de pigmento. El deterioro no autoriza modificar intencionalmente número de componentes, orientación, relación llama/brazos, semilla interior ni aperturas obligatorias.

Cuando el daño impida reconocer al menos tres de los cuatro rasgos obligatorios, la imagen deja de considerarse una representación fiable de `SYM-DIV-AUREA-001`.

#### Usos culturales validados

La Llama Custodiada puede utilizarse en:

- Casas de la Llama;
- altares;
- estandartes;
- vestiduras y bordados religiosos;
- sellos y documentos;
- placas;
- arquitectura;
- refugios;
- señalización vinculada al culto;
- medallones y objetos devocionales.

La autorización de un soporte no obliga a que el símbolo aparezca en todos los objetos de esa categoría y no crea variantes nuevas.

**Relación con otra iconografía:** una representación figurativa de Aurea, una llama real, un hogar, un brasero o cualquier escena de cuidado no constituye automáticamente este símbolo.

### Reproducción

**Instrucción técnica completa:**

1. crear un lienzo con `viewBox="0 0 1000 1000"`;
2. reproducir exactamente las tres trayectorias maestras;
3. usar `fill-rule="evenodd"` en la llama central para conservar la semilla/gota negativa;
4. no rotar, reflejar, cerrar aperturas ni añadir elementos;
5. para reproducción gráfica formal utilizar exclusivamente una de las variantes cromáticas autorizadas;
6. para reproducción monocroma conservar todas las masas y espacios negativos sin grises internos.

**Instrucción breve para ilustraciones:** una llama central alta y asimétrica, con vacío interior único de semilla/gota, custodiada por dos brazos curvos simétricos separados de la llama y abiertos arriba y abajo. En presentación formal usar Oro Aureano sobre Azul Custodio, Azul Custodio sobre Marfil o Marfil sobre Azul. No añadir escudo, círculo, manos, texto ni ornamentos al símbolo.

**Nivel de fidelidad actual:** EXACTA cuando el símbolo sea legible o protagonista; FIEL cuando el soporte introduzca perspectiva/desgaste. La modalidad SUGERIDA se definirá junto con la versión reducida.

### Activos

**Archivo SVG maestro geométrico:** `assets/symbols/divinities/SYM-DIV-AUREA-001_MASTER.svg`  
**SHA-256 del SVG maestro geométrico:** `4fe5845533ad8e0fec40ea28b37897aef6eac743285b7450a84d8c226cd3ff89`

**SVG principal:** `assets/symbols/divinities/SYM-DIV-AUREA-001_PRIMARY.svg`  
**SHA-256:** `a2d809f7ef32dc574c121179c47f997e827d8fcd50ac2413b15fb55f2314b181`

**SVG campo claro:** `assets/symbols/divinities/SYM-DIV-AUREA-001_LIGHT.svg`  
**SHA-256:** `d62ecdb115b871db96fbf2189eb73550efbc63ee7402d652c6664236effcb310`

**SVG invertido:** `assets/symbols/divinities/SYM-DIV-AUREA-001_INVERTED.svg`  
**SHA-256:** `e4cec1459a3d3819a60b60bd978ac1cff7c9f28d1f94cfe93e3b92784c4186f7`

**SVG reducido maestro:** `assets/symbols/divinities/SYM-DIV-AUREA-001_REDUCED.svg`  
**SHA-256:** `1dea393d1adbdd0f0a7ef4c8e47a7d50fe97997d05e762b116c00a4f1b45013c`

**SVG reducido principal:** `assets/symbols/divinities/SYM-DIV-AUREA-001_REDUCED_PRIMARY.svg`  
**SHA-256:** `99a94f3d14003166046547c8055a71d33fe2b967aa16bee3669d0660715cbc00`

**SVG reducido campo claro:** `assets/symbols/divinities/SYM-DIV-AUREA-001_REDUCED_LIGHT.svg`  
**SHA-256:** `bcf108fb3907470cc757c9976cb7ce62e52a351ba9cbc8dca97d9426e7b75eb9`

**SVG reducido invertido:** `assets/symbols/divinities/SYM-DIV-AUREA-001_REDUCED_INVERTED.svg`  
**SHA-256:** `b908b50070e03e30f7d5689b9929a666f2d82b15f11e88ab39397e7b3ce00421`

**Archivo PNG de referencia:** `assets/symbols/divinities/SYM-DIV-AUREA-001_PREVIEW.png`  
**SHA-256:** `e61448087cbe5f74fb57494b15c0e9a9fadd8386b92e9941fe0e7b20b4d34179`

### Historial

- **v0.1 — 2026-10-07:** concepto y geometría propuestos.
- **v0.2 — 2026-10-07:** geometría aprobada; trayectorias vectoriales maestras fijadas; color y variantes permanecen pendientes.
- **v0.3 — 2026-10-07:** cromática aprobada; se fijan Oro Aureano, Azul Custodio, Marfil del Reencendido y Ámbar de Resplandor; se autorizan las variantes PRIMARY-01, LIGHT-01 e INVERTED-01.
- **v0.4 — 2026-10-07:** se aprueba REDUCED-01, umbral principal de 32 px, mínimo absoluto de 16 px, mínimos físicos recomendados y área de protección 2X.
- **v1.0 — 2026-10-07:** pruebas contextuales/materiales superadas; se validan soportes, perspectiva, deterioro y usos culturales; se incorpora PNG de referencia y la ficha pasa a CANON.

## SYM-DIV-NEMOR-001 — El Umbral de Piedra

**Entidad:** Nemor, el Guardián  
**Estado:** **CANON**  
**Versión:** v1.0  
**Aprobación geométrica y cromática:** 2026-10-07  
**Aprobación de escala y reducción:** 2026-10-07  
**Canonización completa:** 2026-10-08

### Concepto
El símbolo representa **memoria custodiada, límite respetado y preservación del nombre**. No representa tránsito del alma ni una puerta abierta. Está formado por dos pilares laterales, un dintel superior y una piedra memorial central separada de la estructura. La piedra contiene una única **Marca del Nombre** horizontal en espacio negativo.

### Geometría normativa
Lienzo maestro: `1000 × 1000`. Módulo X: 40.

```svg
<path d="M185 850 L185 810 L205 790 L205 250 L185 230 L185 190 L285 190 L285 230 L265 250 L265 790 L285 810 L285 850 Z"/>
<path d="M715 850 L715 810 L735 790 L735 250 L715 230 L715 190 L815 190 L815 230 L795 250 L795 790 L815 810 L815 850 Z"/>
<path d="M150 150 L850 150 L850 210 L825 230 L175 230 L150 210 Z"/>
<path fill-rule="evenodd" d="M410 850 L410 410 L455 340 L545 340 L590 410 L590 850 Z M445 505 L555 505 L555 545 L445 545 Z"/>
```

Trayectorias inmutables. Eje vertical X=500. Rotación y reflejos prohibidos como transformaciones formales. Deben conservarse separaciones visibles entre piedra, pilares y dintel.

**Rasgos obligatorios:** dos pilares; dintel completo; piedra central separada; Marca del Nombre negativa; separación entre todos los componentes.

### Cromática
| Nombre | HEX | RGB | Uso |
|---|---|---|---|
| **Pizarra Guardiana** | `#2F343B` | 47,52,59 | campo oscuro |
| **Piedra Memorial** | `#A7A196` | 167,161,150 | símbolo principal |
| **Marfil de Inscripción** | `#DDD6C6` | 221,214,198 | campo claro/inversión |
| **Bronce de Vigilia** | `#8A7350` | 138,115,80 | material/acento contextual |

**Principal:** Piedra Memorial sobre Pizarra Guardiana.  
**Claro:** Pizarra Guardiana sobre Marfil de Inscripción.  
**Invertido:** Marfil de Inscripción sobre Pizarra Guardiana.  
Los componentes usan un único color por variante formal. Sin gradientes, sombras ni texturas incorporadas.

### Reducción, escala y área de protección
**REDUCED-01** es la única simplificación autorizada para pequeña escala. Mantiene pilares, dintel, piedra central, Marca del Nombre y separación entre componentes, pero elimina los remates biselados de los pilares, simplifica el dintel y amplía la Marca del Nombre.

```svg
<path d="M190 850 L190 190 L275 190 L275 850 Z"/>
<path d="M725 850 L725 190 L810 190 L810 850 Z"/>
<path d="M150 150 L850 150 L850 235 L150 235 Z"/>
<path fill-rule="evenodd" d="M405 850 L405 405 L455 330 L545 330 L595 405 L595 850 Z M435 495 L565 495 L565 555 L435 555 Z"/>
```

**Umbrales digitales:**
- 32 px o más: versión principal;
- 16–31 px: `REDUCED-01`;
- menos de 16 px: no reproducir el símbolo completo.

**Mínimos físicos recomendados:**
- impresión: 10 mm de alto;
- grabado/talla: 14 mm;
- bordado: 22 mm.

No se autoriza una versión micro.

**Área de protección formal:** `2X = 80 unidades`. Con caja geométrica X 150–850 / Y 150–850, la zona protegida es X 70–930 / Y 70–930.

La versión reducida puede simplificar remates, pero nunca eliminar la relación **pilar + dintel + piedra + Marca del Nombre + separación**.

### Prohibiciones
No convertir la figura en una puerta transitable. No añadir texto literal, runas, calaveras, huesos, guadañas, llamas, alas, ojos, cadenas, animales ni símbolos de otras deidades.

### Activos
- `SYM-DIV-NEMOR-001_MASTER.svg`
- `SYM-DIV-NEMOR-001_PRIMARY.svg`
- `SYM-DIV-NEMOR-001_LIGHT.svg`
- `SYM-DIV-NEMOR-001_INVERTED.svg` — variante invertida oficial.
- `SYM-DIV-NEMOR-001_REDUCED.svg` — maestro reducido.
- `SYM-DIV-NEMOR-001_REDUCED_PRIMARY.svg` — reducido principal.
- `SYM-DIV-NEMOR-001_REDUCED_LIGHT.svg` — reducido claro.
- `SYM-DIV-NEMOR-001_REDUCED_INVERTED.svg` — reducido invertido.

### Materiales, contexto y deterioro

La Fase 4 validó El Umbral de Piedra sin rediseño en documento/archivo memorial, piedra tallada, Bronce de Vigilia, bordado ceremonial, placa memorial y arquitectura en perspectiva.

**Piedra y madera:** se permiten talla, bajorrelieve, incisión, erosión y grietas. La Marca del Nombre debe permanecer reconocible como vacío.

**Metal:** hierro, bronce, latón, plata u otros metales son válidos. Bronce de Vigilia `#8A7350` es referencia contextual, no obligación física.

**Tela:** se permiten trama, costuras y desgaste, siempre que pilares, dintel, piedra y Marca del Nombre sigan separados. Se conserva el mínimo recomendado de 22 mm.

**Documentos:** se recomienda Pizarra Guardiana sobre Marfil de Inscripción. Sin sombras, biseles ni ornamentación dentro de la marca formal.

**Perspectiva:** la deformación aparente causada por perspectiva, curvatura o soporte físico no crea una variante nueva. La geometría aplicada al soporte debe seguir siendo la maestra.

**Deterioro:** puede ocultar parcialmente elementos, pero nunca autoriza una reconstrucción improvisada. Para seguir siendo una representación fiable deben reconocerse ambos pilares y el dintel como estructura, la piedra central separada y la Marca del Nombre. Si la piedra parece tocar la estructura por deterioro o mala reproducción, la representación deja de ser fiable.

**Usos culturales validados:** Casas de los Nombres, cementerios, cenotafios, monumentos, archivos memoriales, placas funerarias, documentos, vestiduras religiosas, estandartes, arquitectura, sellos y objetos devocionales.

### Activo PNG definitivo
**Archivo:** `assets/symbols/divinities/SYM-DIV-NEMOR-001_PREVIEW.png`  
**SHA-256:** `44f82067c4abea3be28af4f6ab5bf789bd89855fe9709d949e6ac95db88fd3f8`

### Historial
- **v0.1:** La Piedra del Nombre, propuesta descartada antes de canonización.
- **v0.2:** El Umbral de Piedra seleccionado y geometría aprobada.
- **v0.3:** cromática aprobada.
- **v0.4:** versión `REDUCED-01`, umbrales digitales, mínimos físicos y área de protección aprobados.
- **v1.0 — 2026-10-08:** pruebas contextuales/materiales aprobadas; materiales, perspectiva, deterioro y usos culturales validados; PNG definitivo incorporado; ficha elevada a CANON.

