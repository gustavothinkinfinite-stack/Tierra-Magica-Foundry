# CREA-15 — Cierre de autosuficiencia de progresión

**Estado:** CERRADO · VIGENTE  
**Fecha:** 2026-10-04  
**Fuente canónica:** `docs/Tierra_Magica_Manual_Maestro.md`  
**Objetivo:** que un PJ ya creado pueda avanzar de nivel 2 a 20 en Foundry sin edición libre de valores, contabilidad paralela ni gasto de PD que ignore otras compras.

## Alcance cerrado

CREA-15 implementa en Foundry las reglas de progresión ya fijadas por el Manual Maestro. No introduce una economía nueva ni modifica costes canónicos.

Quedan bajo una misma autoridad operativa:

- nivel 1–20;
- total de PD por nivel;
- gasto conjunto de PD entre Habilidades, Atributos e Items adquiribles;
- puertas de rango de Habilidad;
- mejoras post-creación de Atributos;
- adquisiciones de progresión;
- reconstrucción autorizada de una ficha ya avanzada;
- cierre definitivo del PEI una vez completada la creación.

## Nivel y PD

El nivel deja de ser un campo de progresión editable libremente.

Con creación cerrada, Foundry permite avanzar de **un nivel por vez** hasta nivel 20. El total de PD se deriva de la fórmula canónica:

**PD totales = 25 + 4 × (nivel - 1).**

Subir de nivel no concede PR, PEI, dinero, equipo, Atributos, rangos, Vida actual ni Maná actual de forma automática.

## Presupuesto global de PD

El presupuesto de desarrollo es único.

Una mejora de Habilidad ya no puede validarse sólo contra el coste de Habilidades. Antes de aceptar el aumento, Foundry comprueba el PD restante después de contar conjuntamente:

- rangos base de Habilidad;
- mejoras post-creación de Atributos;
- Técnicas, Especializaciones, Disciplinas, Hechizos, Rasgos u otros Items cuyo coste de progresión sea PD.

Esto impide gastar los mismos PD dos veces entre subsistemas.

## Atributos

Después de creación, los Atributos dejan de ser campos base editables libremente.

Cada mejora ordinaria se realiza de un paso por vez y usa el coste canónico:

- 0 → 1: 4 PD;
- 1 → 2: 6 PD;
- 2 → 3: 9 PD;
- 3 → 4: 13 PD;
- 4 → 5: 18 PD.

El máximo ordinario es **5**. Los valores 6+ requieren una fuente sobrenatural explícita y no se obtienen mediante el control ordinario de progresión.

Aumentar un Atributo recalcula sus derivados, pero no rellena Vida o Maná actuales.

## Reconstrucción autorizada

Una reconstrucción puede volver a editar los valores de creación, pero no debe borrar silenciosamente progresión ya pagada.

Si un Atributo tiene `baseValue > creationValue`, Foundry conserva ese valor progresado mientras se reconstruye el reparto inicial. El coste de progresión se vuelve a derivar desde el nuevo valor de creación y el presupuesto global debe seguir siendo legal antes del cierre.

Las validaciones de creación distinguen por tanto entre:

- creación inicial: `baseValue` debe coincidir con `creationValue`;
- reconstrucción: puede existir progresión legítima por encima de `creationValue`, nunca por debajo.

## PEI después de creación

PEI sigue siendo exclusivamente un presupuesto de creación.

Al completar la creación, cualquier sobrante deja de aparecer como disponible. Una adquisición física posterior utiliza moneda u otra fuente explícita del mundo; no puede reutilizar PEI descartado.

## Compatibilidad

CREA-15 no modifica:

- resolución 2d10;
- combate ni economía de Acción/Movimiento/Reacción;
- Vida/Trauma;
- magia, Sostenimiento o Ritualismo;
- Alquimia;
- dispositivos;
- costes o puertas de progresión definidos por el Manual.

La fase convierte esas reglas de desarrollo ya existentes en un flujo de Foundry coherente y no explotable.

## Validación de cierre

El cierre exige:

1. nivel sin edición libre y avance unitario hasta 20;
2. total de PD derivado del nivel;
3. Habilidades comprobadas contra el presupuesto PD global;
4. Atributos comprados por paso y coste canónico;
5. máximo ordinario 5;
6. reconstrucción compatible con mejoras ya pagadas;
7. PEI disponible igual a 0 tras creación;
8. regresiones específicas;
9. `npm run validate` verde en la rama de cierre.

## Resultado

CREA-15 elimina los huecos conocidos de contabilidad y edición libre en la progresión ordinaria de personajes.

**CREA-15 queda cerrado.**
