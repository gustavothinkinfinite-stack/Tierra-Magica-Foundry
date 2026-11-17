# Tierra Mágica — Taller autónomo de razas
**Estado del conjunto:** BORRADOR PARA REVISIÓN GLOBAL. Ningún contenido de esta carpeta modifica el canon.

## Objetivo
Completar las doce familias raciales jugables en un entorno de producción segregado y versionado. **Tras los doce expedientes, ejecutar varias rondas de auditoría canónica, mecánica, de exploits y comparación entre todas las razas; corregir los borradores; sólo después preparar las doce versiones finales propuestas de contenido para el Manual Básico.** El creador revisará el conjunto al finalizar todas esas fases; sólo lo que apruebe se integrará por una operación posterior y explícita en el Manual Maestro de `main` y, cuando corresponda, en Foundry.

## Jerarquía
1. **Canon vigente:** `main:docs/Tierra_Magica_Manual_Maestro.md`. Es la única fuente activa de reglas y narrativa.
2. **Estilo visual:** `Foundry_TM_Guia_Estilo_Visual_v1.json`, portada de referencia y archivos gráficos entregados por el creador; no reemplazan reglas.
3. **Propuestas autónomas:** solamente esta carpeta, en la rama `propuestas/razas-autonomas-2026`. Dentro de ella se pueden resolver todos los vacíos de forma concreta, pero no se adquiere estatus canónico.
4. **Historia y opiniones:** material histórico no ratificado y variantes descartadas, sólo como investigación claramente identificada.

## Instrucciones de ejecución para cada ciclo de trabajo
1. Abrir el `00_tablero.md`, leer entregables existentes y observar última ejecución.
2. Reabrir la sección canónica en `main`, incluyendo mecánicas transversales, cosmogonía, sociedad y geografía pertinente.
3. Desarrollar el siguiente avance sustantivo con las decisiones nuevas completas, sin solicitar microaprobaciones. Si faltan datos: proponer una solución específica, documentar motivos, consecuencias y compatibilidad.
4. Si se detecta un vacío mecánico que impide jugar, priorizar diseñar y probar la habilidad/regla necesaria con nombre, coste o condición, alcance, límites, no-apilamiento y pruebas de exploits; no introducir gratuitamente beneficios culturales o poderes injustificados.
5. Guardar avances en `propuestas/razas/<NN_racial>/` usando archivos Markdown con nombres estables. Actualizar `00_tablero.md` con estado y siguiente tarea. No repetir ni reemplazar entregables sin registrar revisión.
6. Para cada raza entregar: `auditoria_y_desarrollo.md`, `doble_pagina.md`, `brief_arte.md`, `pruebas_balance.md` cuando esté completo; se permiten etapas intermedias.
7. Identificar en cada documento **[CANON]**, **[PROPUESTA]**, **[MISTERIO NARRATIVO CONSERVADO]** y **[REVISAR]** cuando correspondan. Los textos listos para imprimir pueden omitir etiquetas internas si el expediente asociado registra qué elementos son propuestos.
8. **Al cerrar los doce borradores, NO considerar finalizado el proyecto.** Seguir obligatoriamente `00_plan_auditorias_y_manual.md`: cuatro rondas individuales de auditoría por raza (canon/lore, mecánicas/costes, exploits/pruebas, comparación y mejora), control transversal/regresiones, y sólo al final redacción de 12 textos `manual_final_propuesto.md`, índice y dossier de integración.
9. Cada nueva instrucción «avanzar» ejecuta el **siguiente trabajo sustantivo pendiente**, sin repetir lo completado y sin pedir microautorizaciones. **No detener la automatización al llegar a 12/12**, porque el proyecto sigue abierto hasta terminar auditoría y manual.
10. Si todas las fases y sus entregables están realmente completos, entregar informe global y pausar programación periódica cuando sea posible. A partir de ahí, ante «avanzar», limitarse a informar estado final sin trabajos artificiales o repetidos.

## Plan detallado posterior a los doce expedientes
Ver [`00_plan_auditorias_y_manual.md`](./00_plan_auditorias_y_manual.md), incorporado por instrucción expresa del creador. Las dobles páginas v0.1 constituyen **material preliminar** y no reemplazan la redacción final posterior a auditoría.

## Límites
- **Nunca escribir en `main`**. No alterar `docs/Tierra_Magica_Manual_Maestro.md` ni código de Foundry desde esta producción.
- No editar ni reemplazar el mapa maestro canónico.
- No dar carácter canónico a propuestas, aunque estén editorialmente cerradas.
- No confundir raza con cultura, región, moral, profesión o culto.
- No inventar datos geográficos exactos que colisionen con el mapa.
- No generar imágenes sin petición específica; los briefs quedan listos para un futuro paso ilustrativo.
- Mantener siempre las dos páginas legibles y el paquete de reglas exacto si no se aprueba modificación.
- Registrar fecha y motivo de cambios significativos.

## Fuente primaria
https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/blob/main/docs/Tierra_Magica_Manual_Maestro.md

## Inicio de este taller
16 de noviembre de 2026. Encargo: completar todo lo necesario por cuenta propia, guardar avances en apartado separado y presentar un conjunto final al creador.
