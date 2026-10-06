# CRAFT-02 — Cierre de Economía de Fabricación

**Estado:** CERRADO · VIGENTE  
**Fuente canónica:** `docs/Tierra_Magica_Manual_Maestro.md`, capítulo 18, CRAFT-02  
**Dependencia:** CRAFT-01 cerrado  
**Siguiente fase:** CRAFT-03 — Armas, armaduras y herramientas

## Objetivo

Cerrar una economía de fabricación que cumpla simultáneamente:

- fabricar para uso propio debe ser útil;
- la competencia y el tiempo del personaje deben tener valor;
- producir objetos sin comprador no debe imprimir dinero;
- un artesano sí debe poder ganar dinero mediante trabajo real y demanda real;
- reparar y recuperar objetos debe ser una elección jugable;
- materiales obtenidos en aventura deben importar;
- rareza, legalidad y disponibilidad no pueden resolverse pagando una cifra abstracta;
- no debe añadirse una economía paralela a PD/PR.

## Decisiones cerradas

### 1. Valor de Referencia

El Valor de Referencia (VR) es el precio de una unidad terminada, Común y sin modificaciones.

Precio Exacto usa su valor canónico. Precio Variable se fija para el proyecto antes de comprar materiales. Sin precio establecido no puede inferirse.

### 2. Coste de Materiales

Para una receta ordinaria sin presupuesto propio:

**CM = 50% del VR, redondeado hacia arriba al cobre.**

Una receta económica exacta reemplaza este porcentaje; no se acumulan ambos.

El CM incluye materias ordinarias, consumibles normales de proceso y merma razonable. Herramientas reutilizables, instalaciones, trabajo, permisos y componentes especiales separados no están incluidos.

### 3. Materiales físicos y Valor de Insumo

Los materiales pueden existir como Lotes con descripción, categoría de recurso, compatibilidad y Valor de Insumo (VI).

Un VI compatible reduce uno por uno el CM pendiente.

VI no es moneda y no convierte un material incompatible en compatible.

### 4. Trabajo profesional

Tarifa mecánica de proyecto:

| Nivel | 8 h |
|---|---:|
| Apoyo no técnico | 5 c |
| Aprendiz | 1 p |
| Entrenado | 2 p |
| Experto | 5 p |
| Maestro | 1 o |
| Gran Maestro | 2 o |

Es una tarifa de proyecto, no un salario universal de Edria.

Se prorratea por tiempo y se redondea hacia arriba. Para encargos independientes existe una unidad mínima de facturación de 1 hora. Un pedido de unidades idénticas se agrupa como lote para impedir multiplicar mínimos artificialmente.

### 5. Instalaciones

Referencia de alquiler por 8 h:

| Instalación | 8 h |
|---|---:|
| Improvisada | normalmente 0 |
| Adecuada | 1 p |
| Profesional | 2 p |
| Especializada | 5 p |
| Excepcional | 1 o |

El uso legítimo de una instalación propia o cedida no genera un impuesto abstracto por proyecto.

Herramientas/Kits reutilizables ordinarios pueden alquilarse, cuando exista mercado, por 10% de su precio por Jornada, prorrateado.

### 6. Fabricación propia

El personaje paga materiales, componentes especiales y accesos que realmente necesite.

No se paga a sí mismo salario.

El ahorro aproximado del 50% sobre el objeto ordinario representa la inversión previa en Habilidad, herramientas, instalación y tiempo de juego.

### 7. Encargos

Un Encargo requiere comprador preacordado.

La cotización ordinaria suma:

**materiales + componentes + trabajo + alquileres + costes contextuales explícitos**

El trabajo de un contrato a precio cerrado se cotiza sobre el tiempo base previo a Ayuda/Aceleración. La eficiencia puede beneficiar al artesano; el retrabajo puede perjudicarlo.

No existe una cola infinita de encargos.

### 8. Reventa y estado

Valor Aplicable:

| Estado | VA |
|---|---:|
| Operativo | 100% VR |
| Dañado | 60% VR |
| Deshabilitado | 40% VR |
| Arruinado recuperable | 20% VR |
| Destruido | 0% |

Venta rápida = 25% VA exacto, hacia abajo.  
Venta directa = aproximadamente 50% VA como referencia, no garantía.

Un objeto recién fabricado sin Encargo no genera margen automático: CM redondea hacia arriba al 50% del VR y la venta directa ordinaria redondea hacia abajo alrededor del 50%.

### 9. Reparación

| Estado | Materiales | Tiempo base |
|---|---:|---:|
| Dañado | 10% VR | 25% |
| Deshabilitado | 25% VR | 50% |
| Arruinado recuperable | 50% VR | 75% |

No existe mantenimiento obligatorio por desgaste normal.

Componentes especiales destruidos se reemplazan según su propia regla y no reaparecen mediante el porcentaje genérico.

### 10. Desmantelamiento

| Estado | VI recuperable |
|---|---:|
| Operativo | 25% VR |
| Dañado | 15% VR |
| Deshabilitado | 10% VR |
| Arruinado | 5% VR |
| Destruido | 0% |

Tiempo ordinario: 25% del tiempo de fabricación, mínimo 10 minutos.

Produce materiales, no moneda.

Un componente especial recuperado por separado se excluye del cálculo genérico para evitar doble recuperación.

### 11. Fallos y pérdida material

Un fallo no consume materiales extra por defecto.

Si la pérdida material estaba declarada como consecuencia plausible:

- fallo ordinario: referencia 10% del CM;
- Pifia: referencia 25% del CM.

Los componentes especiales sólo se ponen en riesgo cuando estaba declarado o la consecuencia física los afecta claramente.

### 12. Producción repetida

Los materiales escalan linealmente salvo receta.

No hay descuento temporal o material universal por producción en serie.

Las economías de escala requieren lote, molde, maquinaria, plantilla, línea de montaje o receta específica.

## Auditoría matemática

Se comprobó la relación universal para todos los VR enteros entre **1 c y 10.000 c**:

- `venta directa de referencia <= CM`;
- `venta rápida <= CM`.

No existe ningún valor entero en ese intervalo donde fabricar un objeto Común y revenderlo inmediatamente mediante la referencia ordinaria produzca beneficio por redondeo.

También se comprobó para objetos Dañados, Deshabilitados y Arruinados que comprar al equivalente de una venta rápida, pagar la reparación universal y volver a realizar una venta rápida no produce beneficio por redondeo.

### Ejemplos del catálogo vigente

| Objeto | VR | CM | Venta rápida intacto | Venta directa ref. |
|---|---:|---:|---:|---:|
| Daga | 6 p | 3 p | 1 p 5 c | 3 p |
| Espada larga | 2 o | 1 o | 5 p | 1 o |
| Rifle temprano | 18 o | 9 o | 4 o 5 p | 9 o |
| Malla | 10 o | 5 o | 2 o 5 p | 5 o |
| Placas | 40 o | 20 o | 10 o | 20 o |
| Rifle repetidor | 45 o | 22 o 5 p | 11 o 2 p 5 c | 22 o 5 p |

La igualdad aproximada entre CM y venta directa es intencional: el beneficio económico del artesano aparece mediante un Encargo que remunera trabajo real, no mediante fabricación especulativa ilimitada.

## Exploits controlados

CRAFT-02 bloquea de forma estructural:

- fabricar y vender inmediatamente para duplicar moneda;
- obtener materiales pagando sólo PD/PR;
- convertir VI directamente en efectivo;
- comprar objetos intactos para desmantelarlos con beneficio;
- cobrar varias veces el mínimo de una hora dividiendo un mismo lote;
- recuperar un componente especial y además contar su valor otra vez como chatarra;
- transformar una Pifia en pérdida arbitraria de un componente que nunca estuvo en riesgo;
- utilizar un precio “Sin precio establecido” como si significara 0 c;
- suponer compradores ilimitados;
- suponer acceso ilimitado a recursos Raros/Excepcionales por disponer de dinero.

## Resultado de cierre

CRAFT-02 conserva la utilidad del crafteo para el jugador y separa tres motivos distintos:

1. **fabricar para uno mismo:** ahorro material;
2. **fabricar por Encargo:** ingreso por trabajo;
3. **reparar/recuperar:** convertir competencia y tiempo en conservación de valor.

No introduce una nueva moneda, puntos de progreso, durabilidad universal ni mantenimiento obligatorio.

**CRAFT-02 queda cerrado.**
