# Orcos — Auditoría mecánica y pruebas de balance v0.1
**Estado:** 30 casos de aceptación documental. Estas pruebas **definen comportamientos esperados**: no se ha ejecutado una partida ni se certifica balance empírico.
**Referencia:** Manual Maestro en `main`: creación racial v0.3, reglas transversales, Escala, Rasgos (costes), Acción/Movimiento/Reacción, ventajas y desventajas. Sin cambios a Foundry.

## A. Creación y cultura
| ID | Prueba | Resultado correcto |
|---|---|---|
| ORC-T01 | Crear Orco de nivel 1 | Ascendencia Orco, Escala Mediana, Movimiento 6 y los dos rasgos base; conserva 6 aumentos de Atributo, 25 PD y 3 PR |
| ORC-T02 | Marcar Común, Sangre, Gris o Bastión | Ninguna etiqueta concede bono, idioma, Habilidad, PR ni segunda Ascendencia |
| ORC-T03 | Orco con Origen Broncino | Común de Concordia y Broncino, Faceta correspondiente; sin idioma racial automático |
| ORC-T04 | Orco sin profesión marcial | Legal; no recibe Intimidación, armas o furia de forma innata |
| ORC-T05 | Orco creyente de Varkor | Religión no da Vínculo Divino gratis; requiere 2 PR para Rasgo Vínculo Divino con juramento |
| ORC-T06 | Orco de Sangre sin Rasgo sobrenatural | Legal; la genealogía sola no concede detección, magia ni poderes |
| ORC-T07 | Orco de Sangre que compra Afinidad Sobrenatural | Gasta 1 PR; +1 a PER sólo ante manifestaciones de categoría estrecha directamente perceptibles; no leer intenciones |
| ORC-T08 | Orco de Bastión que compra Masivo | Gasta 3 PR, +8 Vida. No obtiene +FUE, Alcance, Escala, Protección ni ataques extras |
| ORC-T09 | Orco de Bastión con Corpulento | 2 PR, +4 Vida; no se suma con Masivo si lo recibe después |
| ORC-T10 | Mezclar Sangre y Gris o Común y Bastión | Etiquetas culturales pueden coexistir; sólo un paquete racial, sin apilar poderes |

## B. Complexión Orca — fuerza efectiva limitada
| ID | Prueba | Resultado correcto |
|---|---|---|
| ORC-T11 | Alzar una viga inmóvil durante rescate | +1 FUE efectiva si se resuelve como levantar objeto inerte; no duplica Acción |
| ORC-T12 | Arrastrar una caja metálica pesada | +1 FUE efectiva sólo para ese esfuerzo contra objeto inerte |
| ORC-T13 | Portar equipaje personal | +1 FUE efectiva para Carga, compatible con adjudicación narrativa sin fórmula universal de peso |
| ORC-T14 | Golpear con martillo | Ningún +1 al Ataque o Daño por Complexión Orca |
| ORC-T15 | Empujar enemigo para retirarlo de un paso | No +1, aunque utilice FUE: la regla excluye Empujar contra criaturas |
| ORC-T16 | Derribar enemigo con hombro | No +1, aunque la descripción narre fuerza bruta |
| ORC-T17 | Agarrar o mantener una Presa | No +1, no cambia DF de Presa |
| ORC-T18 | Romper una puerta de metal inmóvil | Puede activar +1 para fuerza bruta contra objeto inerte; no implica éxito automático, inmunidad de la puerta o daño extra |
| ORC-T19 | Arrebatar un arma a criatura | No +1 de Complexión por tratarse de Desarmar/interacción corporal con criatura; impedir atajo de «objeto inerte» cuando está activamente sostenido |
| ORC-T20 | Responder a escombros que caen sobre el cuerpo | No Defensa, Protección, Vida ni resistencia a daño general por Complexión; puede sostener un apoyo si realmente se trata de levantar/objeto |

## C. Voluntad del Colmillo — momento, escenas y causas
| ID | Prueba | Resultado correcto |
|---|---|---|
| ORC-T21 | Test con Desventaja por dolor exclusivamente | Antes de tirar puede gastar 1 uso de la Escena para ignorar esa fuente durante esa prueba |
| ORC-T22 | Test con Desventaja por miedo exclusivamente | Igual; la condición de Miedo continúa |
| ORC-T23 | Test con Desventaja por agotamiento físico exclusivamente | Igual; Fatiga y reducción de Movimiento continúan |
| ORC-T24 | Declaración después de ver resultado | Prohibido: debe activarse antes de la prueba |
| ORC-T25 | Segundo intento en la misma Escena | No disponible, aunque cambie la fuente de Desventaja |
| ORC-T26 | Desventaja únicamente por niebla, oscuridad o terreno | No elegible; no corresponde al conjunto dolor/miedo/agotamiento físico |
| ORC-T27 | Dolor y niebla simultáneos | No se puede anular fuente ajena; nunca se convierte en ventaja ni en eliminación automática de todas las causas |
| ORC-T28 | Dolor y miedo como causas separadas | La lectura conservadora es ignorar **una fuente** para esa prueba; si queda otra causa independiente, persiste Desventaja. Este caso requiere prueba editorial de interpretación; no declarar cancelación universal |
| ORC-T29 | Test sin Desventaja actual | No activa el rasgo para generar Ventaja, +1, repetir tirada ni ignorar condiciones futuras |
| ORC-T30 | Nueva Escena y personaje sigue dolorido | Se recupera el uso por Escena, pero la condición persiste y sigue sometido a límites de activación |

## D. Comparaciones y exploits transversales

**Con Humanos:** Don sin Forma otorga un Rasgo elegible adicional; el Orco obtiene estabilidad al manejar objetos inertes y un rescate puntual frente a Desventaja restringida. No son equivalentes numéricos simples; contar uso real por escena.

**Con Enanos:** Cuerpo de Piedra trata al Enano como Mediano para Carga y defensa frente a desplazamientos determinados; Complexión Orca modifica FUE efectiva para Carga y objetos, pero no convierte Escala, tamaño ni fuerza en maniobras. No conceder bonificación enana a un Orco por equiparse como tal.

**Con Bugbears:** la mejora de Escala efectiva Bugbear para Carga y objetos no es el +1 FUE efectivo de Orcos; no mezclar sin una regla expresa sobre paquetes mixtos. La compatibilidad reproductiva entre pueblos continúa abierta en canon.

**Con cultos:** un Vínculo Divino de Varkor, Ilyr u otro requiere costes; el Orco no obtiene Fuentes por sangre o cultura. Los «juramentos» sociales del expediente son narrativos salvo Rasgo Vínculo formalmente adquirido.

**Con acciones:** levantar un gran objeto puede requerir Acción, herramientas y ayuda. Complexión Orca no permite cargar una piedra gigante como arma sin adaptar Escala ni materiales. Voluntad no concede Acción/Reacción.

**Con heridas/Fatiga:** ignorar temporalmente una fuente de Desventaja no cura, no retira Trauma o estado Derribado ni convierte Fatiga en un recurso gratuito de resistencia.

**Con rasgos generales:** Corpulento/Masivo son mutualmente no acumulables; Afinidad sobrenatural nunca se usa para detectar toda intención hostil, adivinar un juramento incumplido o localizar automáticamente a Varkor. Tampoco el coste PR se reduce por sangre, genealogía o culto.

## E. Guion de simulación de partida recomendado
1. Crear cuatro personajes Orcos con los mismos presupuestos pero identidad cultural diferente y una quinta persona de otra ascendencia para cotejar igualdad.
2. Escena de carga: una grúa falla, caen vigas y se exige distinguir levantar un objeto de resistir daño o empujar una criatura.
3. Escena diplomática: Orco de Sangre sin Rasgo debe negociar juramento sin lectura de mentiras; otro con Afinidad sólo identifica una manifestación sobrenatural visible y estrecha.
4. Escena de miedo: desencadenar Desventaja por una sola fuente y luego por dos fuentes simultáneas; anotar el momento de activación y agotamiento por Escena.
5. Escena de fatiga: continuar marcha difícil con reducción real de Movimiento; Voluntad no restaura velocidad.
6. Escena marcial: intento de Agarrar/Empujar/Derribar sin el +1 de Complexión.
7. Escena de disciplina cívica: una comunidad Gris busca evacuación antes de combate; no existe un bono de Persuasión por su cultura.
8. Comparación de frecuencia: 8–12 escenas combinadas de exploración, social y combate con Orcos, Humanos y Enanos; registrar usos de rasgos, pérdidas de oportunidad, decisiones de DJ.

## F. Hallazgos y dictamen
- **No falta una Habilidad racial para crear un Orco jugable.** Inventar «Furia +Daño» o «Honor +Intimidación» sería un beneficio no costeado y contrario al principio de no atribuir moral o formación.
- **Punto que requiere decisión editorial si se desea precisión total:** resolución exacta de dos causas simultáneas de Desventaja permitidas por Voluntad. Propuesta conservadora arriba, para evitar conversión indiscriminada de Desventaja en normalidad.
- **Punto de adjudicación universal:** capacidad de Carga no usa peso cuantificado en el núcleo; Complexión exige mirar la escala física de objeto, método y ayuda. No crear un sistema de kilogramos sólo para Orcos.
- **Prueba de balance real:** **NO EJECUTADA**. Los 30 criterios se basan en inspección de reglas y deben verificarse en mesa o en pruebas automatizables antes de ratificación.

**Estado técnico:** matriz de 30 casos preparada, sin cambio de paquete ni de Foundry. Se puede cerrar la versión editorial propuesta y avanzar a Goblinoides.
