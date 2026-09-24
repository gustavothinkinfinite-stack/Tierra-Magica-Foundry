# Auditoría de efectos mágicos sostenidos y cuantificados — 1.0.14

Fecha: 2026-09-24.

## Alcance

Se revisaron los 18 hechizos del núcleo, la economía de Acción/Reacción, Sostenimiento, Defensas, Protección, daño, curación y los efectos que contienen valores mecánicos explícitos. El Manual 1.0 continúa siendo la fuente mecánica canónica.

## Hallazgos y resolución

### Barrera Cinética — corregido

Es Reacción, cuesta 3 Maná y concede +2 Defensa únicamente contra el ataque declarado. La implementación consumía Reacción y Maná pero no aplicaba el +2.

Ahora un lanzamiento válido activa una defensa cinética de +2. Se incorpora sólo a Defensa normal, no a Defensa Mental ni Corporal, y se consume al resolver el ataque físico o hechizo enfrentado a Defensa que la desencadena. Combate Dual sólo recibe el bono en el primer ataque; no en ambos. Un estado que no llegue a consumirse se limpia al inicio del siguiente turno para impedir almacenamiento entre turnos.

### Lanzamientos automáticos — corregido

La capa de magia convertía correctamente un lanzamiento sin incertidumbre en automático, pero al devolver el mensaje de chat se perdía la señal de éxito para capas posteriores. Esto podía impedir efectos deterministas como Cierre Restaurador y la propia Barrera Cinética. La señal de lanzamiento automático exitoso se conserva explícitamente.

### Proyectil Ígneo — corregido

Existían dos rutas capaces de aplicar su daño: la resolución ofensiva general y una resolución específica posterior. Se eliminó la segunda autoridad. El daño mágico queda bajo una sola ruta, evitando doble daño.

### Piel Alterada — deliberadamente contextual

El efecto canónico es “Protección 2 contra categoría coherente; no acumula con armadura”. La categoría protegida no está parametrizada en el hechizo. Aplicar +2 a Protección derivada convertiría el efecto en protección universal y además lo acumularía incorrectamente con armadura.

Por tanto, Foundry mantiene el Sostenimiento y la mesa aplica Protección 2 sólo frente a la categoría coherente declarada. No se añade un selector de categorías ni un subsistema de tipos de daño mientras el canon no lo requiera.

### Potencia Sobrenatural — deliberadamente contextual

Interactúa como una categoría de Escala mayor y declara expresamente que no aumenta FUE, daño ni Defensa. El sistema no transforma este hechizo en bonos numéricos. Su efecto se resuelve donde la Escala sea relevante.

### Cierre Restaurador — consolidado

Recupera 4 Vida con límite de Vida máxima y límite de recuperación por lesión. Los objetivos sin permiso de actualización generan solicitud segura al DJ. No reduce Trauma ni repara automáticamente Heridas Graves.

### Onda de Choque — parcialmente automatizada, geometría contextual

Daño 4, Penetración 0 y las Defensas individuales se resuelven por objetivo seleccionado. La geometría “Frontal corta” no se inventa: la mesa determina qué tokens están realmente dentro del área.

### Otros hechizos

Regeneración y Reconstrucción no poseen una cantidad de curación numérica y permanecen contextuales. Visión Arcana, Vínculo de Rastreo, Visión Remota, Calma, Sugestión, Llamada Menor, Paso Breve, Trasposición, Umbral y Portal no reciben bonos, movimiento, control o posicionamiento automáticos que el catálogo no defina suficientemente.

## Sostenimiento

El límite sigue siendo 1 efecto; Doble Sostenimiento permite 2. Un fallo no entra en Sostenimiento. Un nuevo éxito que supera el límite conserva el nuevo efecto y abandona los más antiguos necesarios. Piel Alterada y Potencia Sobrenatural usan esta misma autoridad; no crean depósitos, turnos ni acciones adicionales.

## Resultado

No se añade un motor genérico de Active Effects ni un subsistema de categorías de daño. Los efectos numéricos inequívocos se automatizan; los que requieren categoría, geometría o adjudicación permanecen contextuales. Esta decisión evita apilamientos accidentales y reglas no presentes en el canon.
