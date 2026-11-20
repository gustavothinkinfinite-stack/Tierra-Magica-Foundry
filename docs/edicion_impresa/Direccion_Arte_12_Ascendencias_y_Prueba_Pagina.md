# Dirección de arte coordinada — doce ascendencias del Manual Básico

**Estado:** documento editorial **no canónico**, para revisión y encargo posterior. **No autoriza generar imágenes**; se respetan las restricciones de los briefs originales y su estado pendiente.

## Principio editorial

Las doce escenas principales muestran **personajes adultos con oficios, decisiones y relaciones sociales**, no «representantes puros» de una especie, ni poderes gratuitos. Se priorizan escalas corporales correctas, materiales físicos verosímiles, tecnología arcano-industrial funcional y diferencias anatómicas según cada fuente. La cohesión visual se obtiene con una pintura digital de fantasía realista/cinematográfica, luz material, arquitectura habitada y detalles legibles; **no** con fondos idénticos ni símbolos raciales inventados. No incorporar letras, rótulos ni títulos dentro de las pinturas.

Los documentos enumerados abajo contienen el detalle completo y las restricciones; **esta matriz no los sustituye**. Antes del encargo se requiere revisión de cada brief a la luz del canon consolidado y los datos de producción vigentes.

| Ascendencia | Escena principal indicada por su brief | Énfasis distintivo | Referencia vinculante |
|---|---|---|---|
| Humanos | «La herramienta que continúa» | Puente urbano en reparación, herencia compartida, ingeniera humana y colaboradores | `propuestas/razas/01_humanos/brief_arte.md` |
| Enanos | «El puente que debe sostenerse» | Inspección estructural de viaducto en Kar-Dur, responsabilidad técnica | `propuestas/razas/02_enanos/brief_arte.md` |
| Élficos | «Acuerdo del río vivo» | Ribera de Erelia, decisiones sobre canal y puente, observación sin hechizo gratuito | `propuestas/razas/03_elficos/brief_arte.md` |
| Orcos | «La fuerza que decide proteger» | Compuerta dañada, rescate cooperativo y soportes mecánicos, sin brutalidad estereotipada | `propuestas/razas/04_orcos/brief_arte.md` |
| Goblinoides | «Tres maneras de ver el puente» | Goblin, hobgoblin y bugbear cooperando en infraestructura ferroviaria | `propuestas/razas/05_goblinoides/brief_arte.md` |
| Terios/Anihombres | «El maestro de las terrazas» | Maestro elefantino de Escala Mediana en una escuela, otras morfologías en aprendizaje | `propuestas/razas/06_terios/brief_arte.md` |
| Feéricos | «El acuerdo de las cuatro formas» | Dríade, hada, sátiro y silfo dialogan sobre cuidado del árbol y puente | `propuestas/razas/07_feericos/brief_arte.md` |
| Ankar | «La última carta» | Archivo funerario público, escucha y decisión sin fantasma visible | `propuestas/razas/08_ankar/brief_arte.md` |
| Cristálidos | «La conexión consentida» | Taller, interfaz cobre-cristal, decisión antes de conectar, tejidos orgánicos reales | `propuestas/razas/09_cristalidos/brief_arte.md` |
| Verdantes | «El agua que se comparte» | Reparación hidráulica y negociación cívica; anatomía vegetal viva, manos funcionales | `propuestas/razas/10_verdantes/brief_arte.md` |
| Micelios | «El mensaje bajo el puente» | Red micelial continua y vulnerable en huerto comunitario, comunicación limitada | `propuestas/razas/11_micelios/brief_arte.md` |
| Coralios | «El pacto de las dos orillas» | Esclusa de barrio costero y patio sumergido, anfibiedad sin magia constructiva instantánea | `propuestas/razas/12_coralios/brief_arte.md` |

## Riesgo de monotonía y corrección de encuadre

Varias propuestas comparten puentes, canales, instalaciones o reparaciones. El motivo de **cooperación e ingeniería** es coherente, pero podría hacer indistinguibles las doce aperturas si se utiliza siempre el mismo plano. Por ello la composición, con aprobación específica del brief, debe variar por escena:

- Humanos, Enanos y Goblinoides: diferenciar **puente urbano**, **viaducto de garganta** y **puente ferroviario**, sin inventar asentamientos.
- Élficos, Verdantes y Coralios: separar **ribera de Erelia**, **canal de irrigación urbano** y **esclusa anfibia** mediante ecosistema y arquitectura.
- Terios, Ankar y Cristálidos: explotar **escuela**, **archivo público** y **taller/laboratorio**, con foco en sujetos distintos.
- Feéricos y Micelios: distinguir **discusión de obra junto a árbol** de **mensajería a través de red micelial**.
- Orcos: mantener la **compuerta de emergencia** como escena de acción colaborativa; no asignarle una fuerza sobrenatural nueva.

## Entregable mínimo por ilustración aprobada

**Pieza principal:** PNG con dimensiones mínimas 1600 × 1000 px (mínimo técnico del generador; no es garantía de resolución de imprenta), preferentemente encuadre vertical 4:5 si el brief lo indica. El arte debe llegar sin texto incrustado, con un sujeto y una acción claramente legibles. Deben registrarse nombre del autor, licencia de reproducción, crédito editorial y descripción alternativa. Se debe inspeccionar **manual y visualmente** la anatomía, la coherencia canónica y la integración en tamaño Carta.

**Ruta exacta:** `assets/ilustraciones/ascendencias/<slug>.png`, declarada en `docs/edicion_impresa/Manifest_Ilustraciones_Ascendencias.json`. Cambiar a estado `aprobado` solo con archivo, permisos y revisión artística; las doce entradas permanecen actualmente en `pendiente`.

**Validación técnica:** `tools/test-print-art-integration.py` prueba el circuito con un PNG de relleno generado temporalmente en el ejecutor, nunca la calidad visual ni los derechos de una ilustración real. Ese PNG no se publica ni debe conservarse en Git.

## Primera página ilustrada de prueba — protocolo

Usar **Humanos**, cuyo brief se encuentra en `propuestas/razas/01_humanos/brief_arte.md`. Una vez autorizada la pieza, colocar su PNG aprobado, registrar autor/licencia/crédito y compilar. Revisar la transición de título de nivel 5, figura, pie, texto racial contiguo, escala del personaje y ausencia de salto innecesario. Comparar folios y la cantidad de páginas, ya que el PDF de **469 páginas** es solo la línea base sin arte. Si el resultado revela exceso de espacio, ajustar únicamente estilos de la figura y regenerar, no recortar reglas.

**Reserva:** cada brief sigue siendo propuesta editorial; ningún motivo de esta matriz se incorpora automáticamente al canon de Tierra Mágica.
