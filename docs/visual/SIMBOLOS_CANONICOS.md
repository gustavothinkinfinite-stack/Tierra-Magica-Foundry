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

Todavía no existen fichas CANON bajo este estándar. El primer símbolo piloto será definido de forma explícita y aprobado antes de incorporarse aquí.
