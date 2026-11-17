# Coralios — Batería de aceptación, balance y exploits v0.1

**Estado:** **48 casos documentales de aceptación**, no playtests reales ni ejecución automática en Foundry. **Fuentes:** Manual Maestro en `main`, blob `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`, paquete Coralio v0.3, reglas transversales, catálogo Rasgo **Anfibio 1 PR**, **Resistencia Ambiental 1/2 PR**, creación, Movimiento, Acción/Reacción, Escala/Protección, Medicina, Magia, Fatiga, descanso, equipamiento, y cronología de Nacre. **Separación:** los casos CHC-01 se refieren exclusivamente al módulo opcional propuesto en `auditoria_y_desarrollo.md`.

## I. Creación y biología (COR-T01–T10)

| ID | Supuesto de prueba | Resultado esperado según canon |
|---|---|---|
| COR-T01 | Crear Coralio de nivel 1 | Una Ascendencia Coralio, Escala Mediana, Movimiento tierra 5/agua 6, Anfibio, Protección 1 y Sentido Corriente; paquete no resta 25 PD ni 3 PR |
| COR-T02 | Elegir perfil «arrecife somero» o «ciudad portuaria» | Son perfiles narrativos propuestos; ninguna subraza, Rasgo o modificador extra |
| COR-T03 | Coralio de Origen Broncino | Idiomas y Faceta Broncinos, no idioma coralino universal ni Ingeniería gratis |
| COR-T04 | Coralio de Origen Libre de Nacariel | Común + Nacarielense y Faceta de Origen; no recibe Pilotaje ni Licencia de buzo automáticamente |
| COR-T05 | Crecer de nivel | Movimiento 5/6, Protección 1, Sentido +1 no escalan sin efecto expresamente comprado |
| COR-T06 | Miembro con crestas y múltiples tentáculos | La apariencia no concede Acciones, Ataques, manipulación ni Reacciones adicionales |
| COR-T07 | Placa coralina herida | Puede sufrir Vida, Trauma, Sangrado y lesión; se aplican reglas existentes de daños y Medicina |
| COR-T08 | Coralio de edad elevada | No gana Protección 2 ni más rangos de Habilidad por crecimiento de placa o memoria |
| COR-T09 | Seguidor de Eïra o Vael | No recibe Vínculo Divino ni magia oceánica sin adquisición legal |
| COR-T10 | Personaje intenta combinar paquete Coralio y Terio semiacuático | No suma paquetes por pertenecer ambos a Primera Semilla; sólo una Ascendencia registrada |

## II. Respiración e hidratación (COR-T11–T20)

| ID | Supuesto de prueba | Resultado esperado según canon |
|---|---|---|
| COR-T11 | Coralio razonablemente hidratado bajo agua respirable | Puede respirar agua; no necesita Rasgo Anfibio adicional |
| COR-T12 | Coralio hidratado en tierra y aire respirable | Puede respirar aire; no obliga a vivir siempre sumergido |
| COR-T13 | Coralio bucea en agua contaminada | Respiración Anfibia no inmuniza contra tóxicos o contaminación |
| COR-T14 | Coralio en profundidad a presión peligrosa | No posee resistencia gratuita a presión ni evita efectos específicos |
| COR-T15 | Coralio bajo corriente marina violenta | Puede respirar, pero corriente todavía arrastra, dificulta o exige prueba según reglas del peligro |
| COR-T16 | Coralio atraviesa agua helada o hirviente | No posee inmunidad a frío/calor; protección respiratoria no cambia exposición térmica |
| COR-T17 | Coralio lleva días sin agua en un entorno árido | No es inmune a deshidratación; usar subsistema de privación y peligros vigente, sin presumir muerte instantánea |
| COR-T18 | Coralio compra Rasgo Anfibio — 1 PR | Capacidad equivalente no se acumula ni duplica respiración. Evaluar gasto inútil/no permitido según regla de no repetición |
| COR-T19 | Coralio compra Resistencia Ambiental (deshidratación) | Sólo recibe el efecto ambiental concreto comprado; no elimina necesidad de hidratación |
| COR-T20 | Coralio entra a líquido no respirable sin oxígeno compatible | Respiración Anfibia no fabrica oxígeno ni neutraliza venenos; resolver como medio hostil |

## III. Protección, equipo y 0 Vida/Trauma (COR-T21–T28)

| ID | Supuesto de prueba | Resultado esperado según canon |
|---|---|---|
| COR-T21 | Esqueleto Coralino 1 sin armadura | Protección Natural 1 |
| COR-T22 | Lleva armadura Protección 2 | Protección aplicable 2, no 3 por acumulación de hueso |
| COR-T23 | Lleva armadura Protección 4 | Protección aplicable 4, no 5 |
| COR-T24 | Lleva barrera mágica independiente | Sólo añade capa si el hechizo/dispositivo dice que añade barrera; no confundir con apilamiento de armadura |
| COR-T25 | Proponer «espinas» de coral como arma natural gratuita | No permitido; no figura Arma natural en paquete, adquirirla solo mediante regla expresa y coste |
| COR-T26 | Intentar reciclar placas corporales como materia prima de crafting | No concede componentes de equipo, monedas ni gemas gratis; se rige por reglas de recursos, lesión y receta |
| COR-T27 | Coralio a 0 Vida en agua | La respiración anfibia no reemplaza condiciones de 0 Vida, Trauma, rescate, tratamiento ni otras exposiciones |
| COR-T28 | Coralio recibe daño de presión o corriente con Protección 1 | Protección sólo se aplica si la fuente de daño y reglas generales lo permiten; no asumir mitigación universal |

## IV. Sentido de Corriente y conocimiento (COR-T29–T36)

| ID | Supuesto de prueba | Resultado esperado según canon |
|---|---|---|
| COR-T29 | Detectar vibración cercana transmitida por agua | +1 PER si señal del agua es determinante, no +1 general |
| COR-T30 | Detectar cambios de corriente por cuerpo grande | Puede obtener pista sensorial; no identidad exacta, tamaño medido ni intención |
| COR-T31 | Investigar mecanismo hidráulico para desactivarlo | Sentido no sustituye Investigación, Ingeniería ni Arcana |
| COR-T32 | Detectar amenaza por vista en aire sin agua como medio | No +1 PER de Sentido de Corriente |
| COR-T33 | Intentar leer hechizo, Fuente o Maná en el agua | No es detector de magia ni Visión Arcana; sin beneficio explícito |
| COR-T34 | Detectar objeto oculto tras muro hermético sin flujo acuático | No atraviesa barrera, no hace radar ni revela posición |
| COR-T35 | Intentar sumar Sentido Agudo 1 PR en «presión acuática» idéntica | Beneficios equivalentes sobre misma señal no acumulan; comparar redacción exacta del Rasgo |
| COR-T36 | Iniciativa o Ataque genérico al oír sonidos de mar | No da +1 a Iniciativa ni Ataque por interpretación de «percepción» |

## V. Movimiento terrestre y acuático, maniobras y acciones (COR-T37–T44)

| ID | Supuesto de prueba | Resultado esperado según canon |
|---|---|---|
| COR-T37 | Coralio corre por muelle | Movimiento terrestre 5, no 6 por poseer segundo medio |
| COR-T38 | Coralio nada en agua favorable | Movimiento acuático 6, sujeto al entorno; no equivale a inmunidad a corrientes |
| COR-T39 | Coralio alterna agua/tierra en un mismo turno | **No sumar reservas completas 5+6 como dos turnos**; resolver transición con regla general de Movimiento, sin inventar conversión fija |
| COR-T40 | Coralio bajo agua intenta usar arma/mecanismo incompatible | Reglas de equipo/Acción siguen; no obtiene competencia o arma anfibia gratis |
| COR-T41 | Coralio con armadura/equipo de Carga Pesada | No ignora restricciones de Carga ni puede atribuirse nado libre ilimitado |
| COR-T42 | Coralio nada junto a un Terio con Locomoción Especializada | Comparar eficacia real del Movimiento 6 con costes de selección Teria; no copiar Adaptaciones entre Ascendencias |
| COR-T43 | Coralio realiza ataque y además detecta corriente | Sentido no concede ataque o Reacción extra; respetar ventanas de Acción/Movimiento/Reacción |
| COR-T44 | Buzo Coralio entra a ruina de gran profundidad | Necesita lidiar con oscuridad, presión, corriente, conservación y logística ordinaria, incluso aunque respire agua |

## VI. Propuesta CHC-01 y cruce con magia (COR-T45–T48)

| ID | Supuesto de prueba | Resultado esperado **sólo en propuesta opcional** |
|---|---|---|
| COR-T45 | Coralio 3 días de viaje terrestre con agua y provisiones apropiadas | Aplicar hidratación y privación ordinaria; no exigir baño obligatorio universal cada 4 horas |
| COR-T46 | Coralio 3 días de sequía sin agua, bajo calor | Aplicar un conjunto coherente de efectos de exposición y carencia según subsistemas generales, no duplicar Fatiga por mismo hecho sin regla |
| COR-T47 | Coralio intenta prolongar respiración por Hechizo o Rasgo | Respetar texto y costes de ese efecto, sin sumar respiración duplicada ni crear Reserva adicional |
| COR-T48 | Coralio «siente magia del océano» por estar bajo agua | No recibe Resonancia Oceánica, Fuente, Hechizos ni ventaja de Arcana; capacidad futura tendría que estar costeada y definida |

## VII. Explotaciones entre subsistemas que requieren prueba posterior
- **Rasgos:** Anfibio 1 PR de catálogo se superpone a Respiración Anfibia racial; verificar que no se cobre por copia ni se convierta en ventaja de resistencia. **Resistencia Ambiental** permite ventaja estrecha pagada, no inmunidad.
- **Protección/0 Vida:** asegurarse de que Esqueleto 1 no neutraliza todo daño ambiental, Sangrado o Trauma; armadura y barrera solo se apilan bajo texto propio.
- **Movimientos mixtos:** la situación de alternar tierra/agua en un turno merece auditoría transversal B2: **no escribir regla universal nueva** en este expediente.
- **Sentidos:** detectar cambio de presión del agua no permite radar, precognición, identidad, magia ni iniciativa extra.
- **Magia/Alquimia/Ingeniería:** habilidades acuáticas, dispositivos resistentes al agua, filtros y salvamento dependen de costes normales, equipo, materiales y rango profesional; no manufactura coralina infinita.
- **Geografía y religión:** Mar de Nacre y la Crisis de 598 C. son canon; no declarar ciudad submarina oficial, ni revelar la causa de las expediciones perdidas.
- **Familiares:** nacidos del arrecife no obtienen Familiar acuático sin condiciones de vínculo; no comprar magia mediante biología.

## VIII. Guion de pruebas futuras (NO ejecutadas)
1. Crear Coralio de Origen Libre de Nacariel, uno Broncino y uno Solenario; comparar movimiento y competencias de origen.
2. Simular cuatro encuentros: muelle, agua somera, corriente violenta y agua profunda. Registrar gasto de Movimiento, Acción, percepción y equipo.
3. Simular protección contra daño físico, barrera, toxina marina, presión y 0 Vida; separar en cada caso causa, mitigación y tratamiento.
4. Ejecutar 6 pruebas PER en agua (tres determinantes y tres irrelevantes), 3 en tierra, 3 con magia oceánica sin detector; contar activaciones reales de +1.
5. Comparar en tres travesías: Coralio, Terio con nado, Micelio y Humano con Rasgo Anfibio 1 PR. Mantener mismo PD, PR y equipo cuando sea posible.
6. Representar cuidado de hidratación durante jornada de calor, viaje seco y regreso a mar; confrontar CHC-01 con reglas existentes sin duplicar castigos.
7. Ensayar consecuencias de construir/romper estructuras de coral vivo, midiendo materiales, herramientas, Ingeniería y tiempo; no producción gratuita por presencia de PJ Coralio.
8. Evaluar críticamente si versatilidad aire/agua y Protección 1 es desbalanceada frente a Terios, Feéricos y demás doce familias; documentar frecuencia de aplicación y no modificar paquete en v0.1.

**Dictamen:** **48 criterios de aceptación escritos; cero partidas ejecutadas en esta entrega**. La mayor incertidumbre a revisar en B2 es la interacción de Movimiento entre medios, falta de cuantificación de hidratación y balance entre Anfibio innato/Protección/Sentido frente a otros paquetes. El paquete existente sigue usable; no se justifica una Habilidad Coralio nueva antes de la auditoría global.
