# Tierra Mágica — Plan de producción del Manual Básico
**Estado:** EN EJECUCIÓN · **Fecha de inicio:** 2026-11-19 · **Rama:** `review/auditoria-editorial-integral-2026-11-19`

## Producto objetivo
- **Libro:** Tierra Mágica — Manual Básico.
- **Formato de corte:** Carta, 215,9 × 279,4 mm.
- **Interior:** a todo color, cuatricromía de imprenta según perfil solicitado por el impresor.
- **Encuadernación:** tapa dura cartoné; tipo de lomo, cosido, guardas y cubierta se definirán con el proveedor.
- **Papel:** pendiente de cotizar y probar, sin especificación definitiva.
- **Tirada:** pendiente de definir.
- **Entrega objetivo:** PDF de interior para imprenta + archivo independiente de cubierta calculada según lomo real + PDF de lectura digital opcional + pruebas de preflight y ejemplar físico aprobado.
- **Fuente única normativa:** `docs/Tierra_Magica_Manual_Maestro.md`. El libro maquetado es un derivado; no modifica canon.
- **Regla de control:** jamás declarar completada una tarea sin evidencia y criterio de aceptación; no fusionar rama ni publicar cambios mecánicos por inferencia.

## Fase 1 — Cierre de contenido (bloqueante)
- [ ] P01. Cotejar capítulo por capítulo el texto normativo y eliminar contradicciones demostradas.
- [ ] P02. Unificar términos de Ascendencia/Origen/Trasfondo, recursos, tablas y referencias cruzadas.
- [ ] P03. Cotejar las 12 dobles páginas raciales contra el cierre B5 normativo.
- [x] P04. **Resuelto por DEC-ED-05:** equivalencias de rasgos de Don sin Forma; fundamentadas en el §5 y reflejadas en el Maestro.
- [x] P05. **Selección editorial aprobada:** sólo perfiles canónicos con precio/reglas vigentes; propuestas sin precio y equipo especial sin Perfil fuera de las tablas de compra impresa. **Pendiente dentro del cierre económico:** cotejo ítem por ítem de precios y terminología comercial, que continúa en P01/P02/P08.
- [x] P06. **Selección editorial realizada:** seis perfiles de combate definidos y transcritos desde §23; los otros cinco se identifican expresamente como fichas contextuales o incompletas. Pendientes pruebas de mesa, arte y cotejo final en P08/P14/P22.
- [ ] P07. Distinguir canon de propuestas culturales locales; conservar espacios deliberadamente abiertos.
- [ ] P08. Someter cambios a diff, revisar invariantes y ejecutar pruebas documentales/regresiones disponibles.

**Puerta de salida Fase 1:** no hay discrepancias normativas abiertas en el contenido seleccionado, los bloqueos tienen decisión registrada, y revisión aprobada antes de fusionar a `main`.

## Fase 2 — Arquitectura editorial del volumen
- [ ] P09. Aprobar tabla de contenidos de lectura (no copiar sin filtrar el orden técnico del repositorio).
- [ ] P10. Integrar editorialmente las 12 ascendencias; mantener única regla normativa en §3 y evitar duplicaciones.
- [ ] P11. Separar contenido de libro y documentación de desarrollo (CREA/CRAFT, historial, versiones, estado de implementación).
- [ ] P12. Redactar transiciones, introducciones y referencias cruzadas sin cambiar reglas.
- [ ] P13. Completar glosario e índices de reglas, hechizos, criaturas, equipo y tablas.

**Puerta de salida Fase 2:** manuscrito de lectura completo y cerrado, sin secciones técnicas internas inadecuadas para lector final.

## Fase 3 — Arte, símbolos y mapas
- [ ] P14. Inventariar activos existentes y licencias de uso editorial; distinguir arte aprobado de bocetos.
- [ ] P15. Cerrar fichas y activos de símbolos religiosos 12/12 o decidir qué símbolos se representan sin iconografía oficial.
- [ ] P16. Seleccionar ilustraciones definitivas de portada, ascendencias, criaturas, ambientación, escenas y equipo.
- [ ] P17. Verificar que los mapas canónicos usen versiones ratificadas y tengan calidad para el tamaño de impresión.
- [ ] P18. Preparar activos para flujo de color de la imprenta sin deformaciones, estiramientos ni sustituciones no autorizadas.

**Puerta de salida Fase 3:** inventario aprobado, archivos reproducibles y permisos claros.

## Fase 4 — Diseño y maqueta piloto
- [ ] P19. Definir sistema de diseño: retícula, estilos de títulos, cuerpo, tablas, recuadros, folios y encabezados.
- [ ] P20. Crear maqueta piloto representativa de 8–12 páginas con regla, creación, ascendencia, hechizo, tabla, bestiario e ilustración.
- [ ] P21. Calcular extensión real del manuscrito y solicitar cotización de papel, tipo de encuadernación, pruebas, tirada y lomo.
- [ ] P22. Maquetar el libro íntegro; reparar viudas, huérfanas, tablas partidas, imágenes de baja calidad y referencias inválidas.

**Puerta de salida Fase 4:** paginación estable, artes completos y cubierta dimensionada al bloque real del libro.

## Fase 5 — Control y entrega para imprenta
- [ ] P23. Corrección ortotipográfica definitiva sobre maqueta paginada; incorporar portada, legales, créditos e índices definitivos.
- [ ] P24. Exportar PDF/X según imprenta, fuentes incrustadas y controladas, imágenes y perfiles correctos, sangrados, marcas sólo si se solicitan, interior y cubierta separados.
- [ ] P25. Ejecutar preflight técnico y comprobar extracción visual de páginas, guillotinado, seguridad de márgenes y encuadernación.
- [ ] P26. Revisar y aprobar un ejemplar físico de prueba (especialmente negros, grises, colores, texto, mapas, lomo y apertura).
- [ ] P27. Entregar archivos finales versionados y registro de aprobación, sin sobreescribir fuentes canónicas.

**Puerta de salida final:** conformidad del impresor y aprobación expresa del ejemplar físico.

## Orden operativo inmediato
1. Completar Fase 1 (en curso, evidencia en `docs/reviews/AUDITORIA_EDITORIAL_INTEGRAL_2026-11-19.md`).
2. Mientras no se altere contenido normativo, preparar inventario de símbolos y arquitectura editorial en paralelo.
3. No fabricar cubierta final ni PDF declarado listo para imprenta hasta conocer páginas, papel, lomo y requisitos reales del proveedor.

## Decisiones abiertas de producción
- Tirada y presupuesto objetivo.
- Papel interior y gramaje; tipo de cosido y terminación de cubierta.
- Perfil ICC, norma PDF/X, sangrado y tolerancias, según imprenta elegida.
- Diseño final de portada, créditos y derechos de uso de ilustraciones.
- Contenido que se excluye del Manual Básico por corresponder a compendios avanzados.

## Avance registrado el 2026-11-19
- **P01/P03 en ejecución:** tres discrepancias B5 del anexo racial corregidas y cotejo inicial de las doce ascendencias documentado en `docs/reviews/COTEJO_B5_DOCE_ASCENDENCIAS_2026-11-19.md`.
- **Dos decisiones abiertas:** Don sin Forma (clasificación Significativo/Menor) y equivalencia del coste «1 Movimiento» / «1 punto de Movimiento» de Enraizar. La primera requiere ratificación; la segunda, revisión normativa.
- **Criterio de avance:** ninguno de P01 ni P03 se marca terminado hasta cotejo exhaustivo y cierre de discrepancias.

## Avance registrado — cotejo económico
- **P05 en ejecución:** inventario de 25 equipos ordinarios canónicos, 65 propuestas mundanas y 10 especiales; contraste inicial de armaduras, escudos, moneda, ventas y disponibilidades en `docs/reviews/COTEJO_EQUIPO_ECONOMIA_2026-11-19.md`.
- Se actualizaron dos referencias derivadas en `docs/REFERENCIA_RAPIDA_GLOSARIO_1.0.md`: Compra libre como ruta única de PEI y grimorio canónico de 60 hechizos.
- Continúa pendiente la revisión exhaustiva de cada precio y la decisión sobre equivalencias de disponibilidad/mercado; **P05 no está cerrado**.

## Avance registrado — selección del contenido del libro y bestiario
- **P05 / P06:** aprobadas las decisiones de alcance por delegación del usuario, con criterios del Consejo; respaldo en `docs/reviews/DECISIONES_EDITORIALES_APROBADAS_2026-11-19.md`.
- **Borrador de seis fichas de uso inmediato:** `docs/reviews/BESTIARIO_BASICO_FICHAS_SELECCIONADAS_2026-11-19.md`. No confundir con las 11 fichas completas ni con los 23 Actores empaquetados.
- Persisten como verificaciones obligatorias el control item por item de precios, pruebas de mesa, coherencia con §23, cierre Don sin Forma/Enraizar y preflight de la edición física.

## Avance registrado — resolución de Don sin Forma y Enraizar
- **DEC-ED-05:** cerrado Don sin Forma, sin convertir el Don en PR ni añadir Rasgos compatibles; coste del catálogo §5 1 PR Menor / 2 PR Significativo.
- **DEC-ED-06:** unificado coste de liberar Enraizar a **1 punto de Movimiento**, como ya figuraba en los dos paquetes y sus anexos.
- **P03:** todavía requiere comprobar todas las paráfrasis y casos de interacción, aunque los dos bloqueos mecánicos detectados ya están resueltos.

## Registro de progreso inicial
- [x] Producto objetivo editorial establecido.
- [x] Rama de trabajo independiente y matriz de auditoría ya existentes.
- [x] Revisión inicial de la estructura y las fuentes oficiales.
- [ ] **Todas las puertas de aceptación de fases 1–5 siguen abiertas**.
