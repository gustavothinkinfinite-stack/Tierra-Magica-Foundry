# Élficos — Cierre de borrador para aprobación global v0.1

**Estado:** BORRADOR EDITORIAL INTEGRAL COMPLETO, pendiente de aprobación del creador. No es canon. Fecha: 2026-11-16.
**Referencia:** `main:docs/Tierra_Magica_Manual_Maestro.md`, blob revisado `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`.
**Carpeta:** `propuestas/razas/03_elficos/` en la rama `propuestas/razas-autonomas-2026`.

## Entregables versionados
- `auditoria_y_desarrollo.md`: 2.224 palabras aprox. de revisión y propuestas biológicas, históricas, sociales y religiosas.
- `doble_pagina.md`: página izquierda narrativa y página derecha jugable; **835 palabras imprimibles** en la revisión actual (excluidos la nota de edición y el rótulo de estado).
- `brief_arte.md`: dirección artística de escena principal «Acuerdo del río vivo» y cuatro viñetas optativas, sin imagen generada.
- `pruebas_balance.md`: 24 casos iniciales de aceptación documental **más 12 regresiones B2 y 20 B3 (ELF-T37–T56) = 56 casos**, todos con resultados esperados, sin pruebas de campo ejecutadas.

## Auditoría cruzada
1. **Eïra y cosmología:** el Pueblo Élfico nace de la Savia de la Primera Semilla. No se atribuye su origen a otro primordial. Conforme.
2. **Pluralidad:** Altos, Silvanos, Oscuros y poblaciones mixtas son formas sociales e históricas, no cuatro paquetes raciales. Conforme.
3. **Reglas v0.3:** Escala Mediana, Movimiento 6, Sentidos Élficos y Resonancia de la Savia se transcriben con alcance y prohibiciones del manual. Conforme.
4. **Progresión y recursos:** sin Habilidades, INT, AGI, magia o idioma raciales gratuitos; 25 PD y 3 PR intactos. Conforme.
5. **Eïra religiosa:** sus cultos y festividades están anclados en el §26; un Elfo no necesita venerarla. Conforme.
6. **Geografía:** Erelia y Lysendra se citan como destinos posibles, nunca dominios raciales; no inventar asentamientos que alteren el mapa. Conforme.
7. **Oscuros:** no moralización, maldición racial universal, piel obligatoria, Sigilo ni Visión en la Oscuridad automática. Conforme.
8. **Población mixta:** significa principalmente convivencia de ramas y culturas élficas; no ratifica compatibilidad biológica entre pueblos. Conforme.
9. **Biología:** longitud de vida y otros valores antropométricos son datos nuevos del expediente, **propuestas**, no hechos canónicos. No cambian mecánicas ni conceden PD adicionales.
10. **Acotamiento de Resonancia:** no se le asigna distancia universal nueva ni capacidad de detectar toda magia, hechizos exactos o autores. Conforme.
11. **Calidad de la impresión:** texto imprimible 835 palabras; composición definitiva, ilustración y pruebas tipográficas pendientes.

## Resoluciones completas dentro de la propuesta
- Instituciones elegidas: Casas de Foco, Asambleas de Cuenca, Consejos del Umbral y agrupaciones urbanas mixtas.
- Ritos culturales propuestos: Libro de Estaciones, Observancia del Agua Larga, Acuerdo de Sombra y Traspaso de Testimonios; sin efectos mecánicos.
- Motivo histórico propuesto del asentamiento de Oscuros en las profundidades: Descenso de las Raíces Profundas, proceso de movimientos por refugio, acceso a corredores y adaptación; **no** se afirma causa única definitiva de la adaptación fisiológica, que sigue siendo misterio deliberado del canon.
- Un solo paquete Élfico, sin nuevas Habilidades innatas; capacidades culturales se compran con PD y otras reglas generales.
- Diseño de ilustración funcional y multiespecie, sin magia gratuita ni estereotipo de superioridad.

## Antes de aprobación e integración
- Revisión global del creador sobre ciclos vitales, identidades y ritos.
- Prueba empírica en escenas de exploración, magia ambiental y condiciones perceptivas, para estimar frecuencia real de Sentidos Élficos y Resonancia.
- Definir cómo se colocan imagen y cuadros en dos páginas reales sin recortar reglas.
- Sólo después de aprobación explícita trasladar cambios aceptados al Manual Maestro de `main` y adaptar Foundry únicamente si hay cambios mecánicos.

**Dictamen:** expediente listo para formar parte de la revisión global de las doce razas. No modificar el canon ni detener el avance de las demás.


### Actualización 17-11-2026 — Auditoría B2
- Disponible `auditorias/02_mecanicas_y_costes.md`: 12 fichas de subsistemas, 15 escenarios, 8 incidencias. Se aclara que una alteración vital mágica **presente** no depende de la etiqueta técnica Sostenido. No se añade radio, coste, Fuente o Habilidad al paquete.
- Los 36 casos siguen documentales: **cero ejecuciones de Foundry o partidas empíricas**. B3/B4 continúan pendientes; el texto inicial no pasa aún a versión final del manual.


### Actualización 17-11-2026 — Auditoría B3
- Informe creado `auditorias/03_exploits_y_pruebas.md`: **20 intentos de exploit, cuatro secuencias paso a paso y diez incidencias**; `pruebas_balance.md` contiene **56 criterios documentales** (36 anteriores + 20 B3). `modelo_auxiliar_b3_elficos.js` conserva **16 fixtures**, con 16 coincidencias en lógica ad hoc, **no en Foundry**.
- **Control principal:** Sentidos Élficos no acumula +1 con `Sentido Agudo` equivalente ni mejora Iniciativa; Resonancia requiere afección vital mágica directa, significativa, actual y área perceptible. No basta que un Hechizo sea Sostenido, ni se exige esa etiqueta si hay ritual/efecto vital todavía activo.
- **Abiertos a B4/B5:** definición cualitativa de «significativa», perceptibilidad y ocultación (`Velo Sensorial`) y umbral entre magia que afecta directamente ecosistema y consecuencias secundarias de magia industrial/climática. No asignar radio, DF, Maná, Acción o detector de Hechizos nuevo.
- Evidencia: **56 DOC; 16 MOD; 0 pruebas del motor Foundry; 0 sesiones de mesa**. El borrador de doble página no es versión final; se preservaron el paquete canónico y `main`. Siguiente B3 Orcos.
