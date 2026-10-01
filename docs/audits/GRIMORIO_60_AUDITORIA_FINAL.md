# Grimorio 60 — Auditoría final de reglas y balance

**Fecha:** 2026-10-01  
**Estado:** CIERRE DE AUDITORÍA · los 42 hechizos nuevos siguen siendo propuestas hasta canonización explícita.  
**Base:** núcleo posterior a fases 3–9, con fuzzing, concurrencia, autoridad multiusuario, recuperación e idempotencia verdes.

## 1. Resultado ejecutivo

El catálogo auditado contiene exactamente **60 hechizos**:

| Disciplina | Total |
|---|---:|
| Evocación | 10 |
| Alteración | 10 |
| Restauración | 9 |
| Percepción | 11 |
| Influencia | 10 |
| Conjuración | 10 |

La asimetría 9/11 entre Restauración y Percepción es deliberada. Sintonía Emocional pertenece a Percepción porque obtiene información; no se inventa un hechizo restaurador redundante sólo para igualar columnas.

Distribución por Grado:

| Grado | Cantidad |
|---|---:|
| Menor | 7 |
| Básico | 19 |
| Avanzado | 19 |
| Maestro | 10 |
| Legendario | 5 |

Los 60 respetan las bandas de Maná del Manual:

- Menor: 2;
- Básico: 3–4;
- Avanzado: 5–7;
- Maestro: 8–11;
- Legendario: 12+.

**Dictamen de reglas:** 57 hechizos quedan internamente coherentes como candidatos finales.  
**Condicionales:** Trasposición, Umbral y Salto Vinculado forman un único paquete espacial que requiere fijar dos definiciones canónicas antes de publicar el tercero.

No queda ningún rojo numérico de daño, curación, Maná o economía de turno.

## 2. Correcciones realizadas durante el cierre

### Contrato de objetivos

Foundry ya no necesita fingir que todo hechizo multiobjetivo es un área.

El schema incorpora:

- `targetMode`: single / multiple / self;
- `maxTargets`;
- `requiresTarget`.

La selección se valida **antes de gastar recursos**.

Esto corrige también una deuda del catálogo 1.0: **Cierre Restaurador** declara ahora objetivo obligatorio y no puede consumir Acción/Maná para descubrir después que no había objetivo.

Candidatos que usan objetivo múltiple:

- Arco Fulminante: hasta 3 objetivos;
- Círculo Restaurador: hasta 3 objetivos;
- Salto Vinculado: hasta 2 objetivos seleccionados **más el lanzador implícito**.

La distinción es importante: `maxTargets:3` en Salto habría permitido transportar lanzador + 3, excediendo el diseño original.

### Martillo Cinético

La versión intermedia del snapshot decía Defensa normal.

Se corrige a **Defensa Corporal**, coherente con su función de desplazar físicamente al objetivo. El daño permanece deliberadamente bajo; su valor principal es control posicional.

### Método Ritual

Renovación Integral, Llamada Mayor y Gran Traslación usan ahora el campo real:

`method:"ritual"`

No un booleano paralelo.

Esto hace que, al canonizarse, el motor aplique automáticamente la competencia operativa del Manual:

- Maestro → Ritualismo Maestro;
- Legendario → Ritualismo Gran Maestro.

Renovación Integral conserva además **Medicina Experta** como requisito adicional.

### Duraciones

Para impedir que magia barata sustituya capacidades permanentes:

- Morfología Alada: máximo una Escena;
- Transmutación Corpórea: máximo una Escena;
- Imagen Menor: máximo una Escena;
- Velo Sensorial: máximo una Escena;
- Espejismo: máximo una Escena;
- Duplicado Ilusorio: máximo una Escena;
- Invisibilidad: máximo una Escena;
- Dominio Fantasmagórico: máximo una Escena;
- Velo Social: máximo una Escena;
- Valor Inspirado: máximo una Escena;
- Interdicción y Aura de Autoridad: máximo una Escena;
- Restauración Funcional: máximo una Escena.

Fascinación y Temor se auditan como presiones breves: hasta el final del siguiente turno del objetivo. Concordia usa una Escena social y no termina automáticamente un combate.

Conservación Orgánica queda propuesta con **24 horas** de preservación. Esta cifra pertenece al candidato final, no al canon 1.0 vigente.

### Ilusiones

La potencia de una ilusión persistente no almacena una tirada.

Propuesta final:

**DF de Ilusión = 11 + Atributo pertinente + bono de Canalización.**

Esto elimina la pesca de una tirada alta fuera de presión.

Una criatura sólo examina una ilusión cuando existe motivo para sospechar o una capacidad lo habilita. Revelación Sensorial concede Ventaja. Una contradicción física directa puede revelar la falsedad pertinente.

Invisibilidad no equivale a indetectabilidad y toda acción ofensiva del objetivo invisible la rompe después de resolverse, acierte o falle, incluso si utiliza Origen Remoto.

### Restauración Funcional

No “apaga una Herida Grave”.

Suspende **una penalización mecánica compatible** mientras se mantiene. No:

- cura la Herida;
- recupera Trauma;
- restaura un miembro ausente;
- vuelve físicamente posible una función inexistente.

### Protección mental

Valor Inspirado y Mente Anclada conceden +2 Defensa Mental en sus ámbitos, pero pertenecen al mismo grupo de apilamiento:

`mental-ward`

Se utiliza el mejor beneficio; no forman +4 contra miedo.

Esto mantiene los modificadores contenidos y evita convertir la defensa reactiva en una escalada numérica.

### Objeto Efímero

Pasa a ser Sostenido, máximo una Escena. Relanzarlo reemplaza la instancia anterior.

No puede crear:

- moneda o mercancía con valor;
- munición;
- consumibles con efecto mecánico;
- explosivos;
- cristales de resonancia;
- herramientas que satisfagan por sí solas un requisito especializado;
- mecanismos complejos o llaves funcionales cuya geometría se desconoce.

### Jaula Dimensional

Se elimina una segunda tirada separada.

La propuesta final establece una **DF espacial mínima 18** al intentar cruzar su frontera. El efecto espacial usa una sola resolución:

**DF efectiva = max(DF normal del efecto, 18).**

No existe una “resistencia extra” después de haber resuelto el lanzamiento.

### Llamada Mayor

Método Ritual, Maestro, Sostenido.

Requiere una conexión válida con la entidad: nombre, símbolo, pacto, reliquia, vínculo u otro enlace definido por la ficción y la mesa.

Invocar establece presencia, no obediencia. La criatura usa los mismos modos conceptuales que Familiar/Invocaciones:

- Autónoma;
- Vinculada;
- Reactiva.

No concede un segundo PJ completo ni acciones tácticas gratuitas ronda tras ronda.

### Gran Traslación

Método Ritual, Legendario.

Requiere dos Anclas compatibles. Traslada al lanzador y hasta **8 criaturas voluntarias seleccionadas**. No admite objetivos hostiles, aparición dentro de materia ni Anclas destruidas.

Se diferencia de Portal porque es una conexión instantánea de una sola resolución, no una abertura persistente.

## 3. Balance ofensivo

Los nuevos hechizos no desplazan al combatiente especializado en daño individual.

Benchmark de nivel 1 contra Soldado de referencia, con atacante/canalizador +7:

| Opción | Daño esperado por Acción |
|---|---:|
| Espada larga | 4,25 |
| Rifle temprano | 5,95 |
| Proyectil Ígneo | 2,55 |
| Aguja Gélida | 2,55 + control |
| Arco Fulminante, por Soldado | 1,70 |
| Martillo Cinético, contra Protección 3 | 0 + desplazamiento |
| Rayo de Ruptura | 6,80 |
| Tormenta Arcana | 5,95 |

Rayo y Tormenta son Maestro/Legendario y pagan 10/12 Maná respectivamente. Su potencia se justifica por grado, coste y geometría; no son equivalentes baratos a un ataque básico.

Onda de Choque y Arco Fulminante conservan prácticamente la misma eficiencia total de daño/Maná sobre tres objetivos de referencia. Arco compra selección de objetivos y Penetración, no una mejora gratuita de eficiencia.

## 4. Balance de Restauración

Cierre Restaurador sigue siendo la referencia eficiente de Vida:

| Hechizo | Vida máxima creada | Maná | Vida/Maná |
|---|---:|---:|---:|
| Cierre Restaurador | 4 | 3 | 1,33 |
| Círculo Restaurador, 3 objetivos | 6 | 6 | 1,00 |
| Matriz Vital | 6 | 9 | 0,67 |
| Renovación Integral | 10 | 14 | 0,71 + Heridas Graves |

Transferencia Vital crea **0 Vida neta**.

Matriz Vital:

- 2 Vida por pulso;
- 3 pulsos;
- no pulsa al lanzar;
- reaplicar no produce pulso extra;
- termina a 0 Vida;
- no levanta al objetivo desde 0;
- sus pulsos desaparecen si pierde el Sostenimiento.

Renovación Integral no reduce Trauma y no resucita.

## 5. Defensa y apilamiento

Grupos de exclusión ya auditados:

- Barrera Cinética / Escudo de campo → cinética;
- Cobertura / Pantalla Cinética → cobertura;
- Piel Alterada / Cuerpo Mineral / armadura equivalente → no se suman como capas equivalentes;
- Valor Inspirado / Mente Anclada → mental-ward;
- varias Ventajas o varias Desventajas → no se acumulan por regla general.

Duplicado Ilusorio concede +2 Defensa sólo contra ataques dependientes de visión. No crea criaturas, casillas ocupadas, flanqueo ni una segunda tirada después del impacto.

La defensa extrema sigue siendo posible sólo combinando preparación, posición, Acción, Reacción, equipo y Sostenimiento. No aparece como bono gratuito.

## 6. Defensa Mental

Éste sigue siendo el punto matemático más sensible del núcleo.

Especialista ofensivo frente a una Defensa Mental alta del mismo tramo:

| Ataque | Defensa Mental | Éxito | Con +2 Defensa Mental |
|---:|---:|---:|---:|
| +7 | 14 | 85% | 72% |
| +10 | 15 | 94% | 85% |
| +13 | 16 | 99% | 94% |

No se modifica la fórmula del núcleo durante esta auditoría porque el catálogo ampliado evita efectos que conviertan esa alta probabilidad en pérdida absoluta de agencia.

Continúan fuera del catálogo ordinario:

- Dominación total;
- órdenes suicidas;
- pérdida repetida de Acción;
- reescritura arbitraria de personalidad;
- borrado arbitrario de memoria;
- final automático de combate.

**Condición futura:** si se diseña hard control, debe reabrirse Defensa Mental antes de incorporarlo.

## 7. Alteración y Rasgos

Miembro Efímero no concede Acción, ataque ni beneficio mecánico adicional de escudo.

Morfología Flexible no escapa automáticamente de Presas.

Potencia Sobrenatural no aumenta Escala real.

Transmutación Corpórea:

- cambia Escala como máximo una categoría;
- utiliza una forma registrada;
- incorpora como máximo dos adaptaciones mayores predefinidas;
- no vuelve a sumar la interacción de Escala de Potencia Sobrenatural;
- no concede conocimiento, Habilidades, hechizos, Maná ni Reacciones;
- máximo una Escena.

Morfología Alada permite vuelo mágico durante una Escena y no sustituye el valor permanente de Vuelo Natural.

## 8. Invocaciones y Familiares

Llamada Menor y Llamada Mayor son Sostenidas.

Relanzar el mismo hechizo reemplaza la instancia anterior. Con Doble Sostenimiento pueden existir como máximo dos invocaciones demandantes compatibles.

Las invocaciones no heredan automáticamente:

- Acción Vinculada;
- Coordinación Reactiva;
- Origen Remoto;
- capacidades de vínculo del Familiar.

Una capacidad debe decir expresamente que se aplica a una invocación.

Esto evita convertir Llamada Mayor en un Familiar Mágico temporal de 10 Maná con todo el árbol de vínculo.

## 9. Paquete espacial pendiente

Las fuentes canónicas actuales no definen Trasposición y Umbral con suficiente precisión para distinguirlos sin inferencia.

Texto vigente:

- Trasposición: “alcance hasta 8 espacios según condiciones del efecto”.
- Umbral: “transición espacial limitada compatible”.

Por tanto la auditoría **no presenta como canon** una definición que la fuente no contiene.

Para cerrar el catálogo se recomienda este paquete:

### Trasposición — propuesta

**Rol:** intercambio táctico.

Acción; INT; DF 14 cuando corresponda; hasta 8 espacios.

Intercambia la posición del lanzador con una criatura voluntaria dentro de alcance. Ambas posiciones deben ser físicamente válidas. No concede Movimiento adicional, no usa objetivos hostiles y no permite destino inválido o inmediatamente letal.

### Umbral — propuesta

**Rol:** paso local a través de barrera.

Acción; INT; DF 18.

Abre un paso espacial local a través de una barrera continua de hasta 2 espacios de espesor. Una criatura voluntaria puede atravesarlo una vez antes de que se cierre. No conecta Anclas y no crea un Portal persistente.

### Salto Vinculado — condicionado a ese cierre

**Rol:** transporte de grupo.

Acción; Avanzado; 7 Maná. El lanzador y hasta 2 criaturas voluntarias adyacentes son trasladados hasta 6 espacios a destinos visibles, libres y válidos, próximos entre sí.

No utiliza Origen Remoto.

Con estas definiciones:

- Paso Breve = movimiento individual corto;
- Trasposición = intercambio de posiciones;
- Umbral = cruce local de barrera;
- Salto Vinculado = movimiento de grupo;
- Portal = conexión persistente por Anclas;
- Gran Traslación = traslado ritual de grupo por Anclas.

No hay dos hechizos haciendo la misma función.

**Estado:** propuesta de cierre, todavía no canonizada.

## 10. Implementación Foundry

### Verde

- bandas de Maná y competencia operativa;
- Acción/Reacción;
- Sobrecarga;
- Sostenimiento;
- Origen Remoto;
- daño, Protección y Penetración;
- áreas;
- autoridad multiusuario;
- objetivos múltiples genéricos;
- objetivos obligatorios;
- daño multiobjetivo con una sola tirada;
- límites de selección;
- método Ritual.

### Puede adjudicarse manualmente sin inventar reglas

- geometría concreta de líneas/radios;
- vuelo/elevación;
- apariencia ilusoria;
- invocaciones como criaturas reales;
- supresión narrativa de Heridas Graves;
- formas registradas de Transmutación.

### Automatización específica pendiente antes de considerar el grimorio “completamente automatizado”

- pulsos de Matriz Vital;
- penalización de Movimiento de Aguja Gélida;
- empuje escalado de Martillo Cinético;
- Pantalla Cinética como cobertura geométrica;
- DF de Ilusión y acciones de examen;
- invisibilidad/detección no visual;
- efectos por objetivo de Interdicción/Aura;
- DF mínima espacial de Jaula Dimensional;
- creación/gestión de entidad de Llamada Mayor;
- plantillas espaciales detalladas.

Estas deudas **no cambian las reglas propuestas**; indican cuánto resolverá Foundry automáticamente y cuánto deberá adjudicar la mesa.

## 11. Estado por disciplina

| Disciplina | Dictamen |
|---|---|
| Evocación | Verde |
| Alteración | Verde |
| Restauración | Verde |
| Percepción | Verde |
| Influencia | Verde bajo la restricción permanente de no hard control |
| Conjuración | Verde excepto paquete Trasposición–Umbral–Salto Vinculado |

## 12. Criterio para canonización

No se recomienda introducir los 42 candidatos en `scripts/content.mjs` todavía.

Orden de cierre:

1. validar esta auditoría completa en CI;
2. aceptar o modificar explícitamente el paquete espacial propuesto;
3. actualizar primero el Manual Maestro con las definiciones aprobadas;
4. convertir los 42 candidatos a datos canónicos de Foundry;
5. añadir automatización específica donde aporte seguridad mecánica;
6. ejecutar de nuevo fases 3–9 contra el catálogo ya canonizado.

Hasta el punto 2, el resultado correcto es **57 verdes + 3 condicionados**, no “60 canonizados”.
