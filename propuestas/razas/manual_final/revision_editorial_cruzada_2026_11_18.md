# Revisión editorial cruzada del manuscrito de las doce ascendencias — ronda 1
**18-11-2026 · Fase C · auditoría documental de edición · NO CANÓNICA**

## Fuentes comprobadas
- `00_tablero.md`, `README.md`, `00_plan_auditorias_y_manual.md`, `13_indice_editorial_y_acta_entrega.md`.
- `manual_final/capitulo_ascendencias_consolidado.md`, `manual_final/tabla_de_razas.md`, `manual_final/registro_de_diferencias_con_main.md`, `manual_final/cotejo_canon_actual_b5.md`.
- `auditorias/05_b5_hoja_unica_decisiones_normativas.md`.
- Canon contrastado en `main:docs/Tierra_Magica_Manual_Maestro.md`, blob **`0c8ddfb0b218bed38cd10962a1ac35bab8821466`**. No se escribe en `main`.

## Hallazgos verificables y decisiones

### ED-01 · Encabezados del manuscrito sin jerarquía de capítulo
**Evidencia:** el consolidado tiene un `#` general y, después, otro `#` para cada raza. Los títulos de página son `##` y sus apartados `###`. En maquetación o exportación automática, las razas aparecen como doce documentos raíz y no como partes del capítulo.

**Corrección editorial:** conservar los archivos fuente individuales sin cambios y generar una versión de lectura con encabezado único `#` para el capítulo, `##` para las razas, `###` para cada página y `####` para apartados. Los rótulos internos y la numeración deben derivarse del índice, no añadirse a mano de forma inconsistente. Evitar cambiar el contenido mecánico durante esta operación.

### ED-02 · Avisos de borrador repetidos dentro del capítulo
**Evidencia:** cada doble página conserva su rótulo de “final propuesta / NO CANÓNICA”; el consolidado tiene su propia advertencia y comentarios de procedencia por blob. Son adecuados para trazabilidad, pero no para la lectura continua de un libro.

**Corrección:** dos artefactos distintos bajo `manual_final/`: (a) **manuscrito técnico**, que conserva las advertencias y comentarios; (b) **copia limpia para lectura editorial**, con un único aviso de estado al inicio y procedencia en anexo, sin alterar reglas ni borrar las fuentes.

### ED-03 · Tabla comparativa con versión de canon desactualizada
**Evidencia:** `tabla_de_razas.md` declara blob `f0f46e85b0d2e9d2449426748d9090c050e0a21e`, mientras que `main` al momento de esta revisión es `0c8ddfb0b218bed38cd10962a1ac35bab8821466`. La matriz B5 posterior demuestra que algunas aclaraciones ya pasaron a canon. No es válido describir la tabla antigua como contrastada con el canon actual.

**Corrección:** etiquetar la tabla como **comparativa histórica**, con enlace al cotejo B5 vigente; efectuar una nueva revisión de las doce filas contra el canon actual antes de llamarla matriz definitiva. No asumir que todas las cifras antiguas son erróneas ni que todas están ratificadas.

### ED-04 · Desfase entre acta de entrega y estado real del capítulo
**Evidencia:** `13_indice_editorial_y_acta_entrega.md` certifica doce textos de 650–850 palabras y B1–B5 documental; el consolidado declara explícitamente que sólo ensambla textos **sin reescritura**. Ambas afirmaciones pueden coexistir, pero **entrega de expedientes** no equivale a **capítulo maquetable y validado contra el último canon**.

**Corrección:** distinguir los hitos: expedientes terminados, manuscrito ensamblado, corrección editorial cruzada, verificación de mecánicas y entrega final del capítulo. La fase C permanece abierta hasta resolver ED-01 a ED-06.

### ED-05 · Estilo tipográfico y taxonomía desigual
**Evidencia:** el consolidado alterna títulos en mayúsculas (“HUMANOS”, “ENANOS”, “ANKAR”), capitalización de título (“Goblinoides”, “Cristálidos”) y rótulos “JUGAR”, “CREAR”, “EN JUEGO”, “UNA ANATOMÍA”. Feéricos y Terios usan estructuras internas diferentes de las restantes.

**Corrección:** normalizar **presentación**, no lore: título `Ascendencia — epíteto`; páginas `Historia y cultura` y `Creación y juego`; subsecciones libres por especie. Respetar los nombres propios, diacríticos y diferencias entre subascendencias. No imponer uniformidad narrativa que borre identidades.

### ED-06 · Regla de Don sin Forma pendiente de decisión editorial
**Evidencia:** el registro conciliado conserva HUM1 como clasificación pendiente; las aclaraciones B5 de otras familias ya figuran en `main`. Reescribir el capítulo sin aislar HUM1 convertiría una interpretación propuesta en canon por accidente.

**Corrección:** mantener texto y opciones humanas tal como aparecen en `main` cuando se redacte el bloque normativo; documentar la clasificación Menor/Significativo como propuesta explícita, con coste, exclusiones y ejemplos verificables, hasta resolverla. Las instituciones culturales no aportan PD, PR ni habilidades gratuitas.

## Matriz de control de entrega
| Componente | Estado comprobado | Pendiente real |
|---|---|---|
| 12 dobles páginas | Presentes y ensambladas | Revisión cruzada de estilo y literalidad |
| Notas individuales | 12 presentes según verificación anterior | Confirmar cambios contra canon actualizado |
| B1–B4 | Documentadas | No confundir pruebas documentales con empíricas |
| B5 | Conciliada en registro posterior | Actualizar matriz comparativa obsoleta |
| Índice | Existe índice técnico | Jerarquía de títulos para libro |
| Manuscrito continuo | Existe compilación íntegra | Copia limpia y control de referencias |
| Informe final | Acta de expedientes disponible | Informe final de capítulo tras cerrar incidencias |

## Secuencia siguiente
1. Construir **copia de lectura editorial** del manuscrito con jerarquía normalizada y un solo aviso de no canon, conservando intacto el compendio técnico.
2. Revalidar la tabla de razas contra el blob actual de `main` y registrar, por fila, concordancias y diferencias literales.
3. Verificar referencias y terminar el informe global de entrega. **No** hacer merge, no modificar Manual Maestro, mapa ni Foundry.
