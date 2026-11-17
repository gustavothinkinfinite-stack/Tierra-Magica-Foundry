# B5-I01 — Movimiento multimodal: algoritmo, costes y regresiones

**17-11-2026 — RESOLUCIÓN DOCUMENTAL PROPUESTA, NO CANÓNICA, SIN APROBACIÓN.** Referencia de autoridad: `main:docs/Tierra_Magica_Manual_Maestro.md` (blob `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`), movimiento en combate, Retirada, Correr, terreno difícil, Exhausto, Carga y paquetes v0.3 Terios, Feéricos (Hada) y Coralios. Cotejados B4 de las tres familias y matriz B5 inicial. **No hay pruebas ejecutadas en Foundry ni mesa.**

## 1. Problema real y límites del canon

El Manual Maestro permite gastar Movimiento en tramos, con terreno difícil a 2 puntos por espacio, Retirada a mitad del Movimiento normal redondeada hacia abajo, Correr por Acción y tramo adicional de Movimiento base, y Exhausto con MOV −2 (mínimo 1). No define una **fórmula de conversión** al atravesar medios con velocidades diferentes en un turno. Coralio: tierra5/agua6; Hada: tierra5/aire6 con apoyo real al **comienzo y final de cada turno** y vuelo prohibido bajo Carga Pesada/Excesiva; Terio con Locomoción Especializada: MOV6 en medio elegido, vuelo sostenido Dominante sujeto a Carga. **El vacío no autoriza sumar 5+6, reiniciar movimiento al cambiar de medio ni otorgar Reacciones.**

## 2. B5-I01-P01 — Presupuesto fraccional único [PROPUESTA NO CANÓNICA]

**Disparador:** en un mismo tramo de Movimiento se emplean dos o más velocidades de locomoción legalmente disponibles.

**Coste:** el coste normal de Movimiento de cada espacio o actividad; ningún PR/PD, Maná, Acción o Reacción nuevo. **Correr sigue costando Acción**, con un **segundo tramo separado** sujeto a las mismas reglas. Se registra una **fracción de tramo consumida** `F`, inicialmente 0, y se exige `F ≤ 1`.

**Algoritmo exacto:**
1. Antes de entrar en un espacio, elegir **medio efectivo** y comprobar anatomía, acceso físico, soporte, equipo, Carga y cualquier impedimento. Sin medio legal, **no hay paso**.
2. Determinar la velocidad efectiva `V` **en ese medio en ese instante**, después de modificadores generales aplicables (p. ej. Exhausto −2, mínimo 1); no reutilizar la velocidad del medio anterior.
3. Si un paso tiene coste de Movimiento `c` (normal 1, terreno difícil 2, o el coste explícito aplicable), agregar **`c/V`** a `F`. Sólo se realiza el paso si `F+c/V ≤ 1`; comparar fracciones exactas, **sin redondear**. Para levantarse o recoger objeto, usar la velocidad del medio donde se efectúa la actividad; una actividad que no sea un paso consume la fracción `c/V` correspondiente.
4. El cambio de medio **no reinicia** `F` y no regala pasos. Los puntos no gastados al terminar el tramo se pierden; no se almacenan entre turnos.
5. Al **Correr**, gastar la Acción y abrir **otro tramo** con `F=0`, sin convertirlo en segunda Acción ni reiniciar el tramo ordinario; la Carga y los modificadores se comprueban de nuevo en cada paso. Si una regla específica restringe Correr en un medio, prevalece.

**Duración:** cada tramo de Movimiento del turno. **Alcance:** posición y trayecto legal del personaje. **Exclusiones:** no combina velocidades como suma, no concede vuelo, respiración, trepa, nado, apoyo, salto, Reacción, ataque ni coste de carga reducido. Una velocidad ausente **no se sustituye automáticamente por la terrestre**; se usa el procedimiento general del medio o se señala adjudicación pendiente si falta.

**Motivo:** mantiene el coste relativo de recorrer un espacio en cada medio y es independiente del orden. Alternativa descartada para propuesta: fijar todo el turno a la velocidad máxima, que convertiría 1 paso acuático en aceleración de todos los pasos terrestres. Alternativa pendiente de contraste: velocidad mínima del turno, que penaliza incluso tramos breves en medio lento. **No se atribuye esta fórmula al canon vigente.**

### Cuentas comprobables en papel (sin ejecución)

| Trayecto | Cálculo exacto | Dictamen propuesto |
|---|---|---|
| Coralio tierra 4 espacios y luego agua 1 | `4/5 + 1/6 = 29/30` | Legal, F=29/30 |
| Coralio tierra 4 y agua 2 | `4/5 + 2/6 = 17/15` | Segundo paso acuático ilegal |
| Coralio agua 5 y luego tierra 1 | `5/6 + 1/5 = 31/30` | Paso terrestre ilegal |
| Coralio agua 4 y luego tierra 1 | `4/6 + 1/5 = 13/15` | Legal |
| Hada tierra 2 y aire 3 | `2/5 + 3/6 = 9/10` | Legal **sólo** con apoyo inicial/final y Carga apta |
| Hada tierra 3 y aire 3 | `3/5 + 3/6 = 11/10` | Tercer paso aéreo ilegal |
| Coralio tierra difícil 2 espacios, agua 1 | `4/5 + 1/6 = 29/30` | Legal, si trayecto y medio existen |
| Coralio Exhausto tierra3, agua4: tierra2 y agua1 | `2/3 + 1/4 = 11/12` | Legal; velocidad efectiva 3/4 |
| Coralio Exhausto tierra3, agua4: tierra2 y agua2 | `2/3 + 2/4 = 7/6` | Segundo paso acuático ilegal |
| Coralio Correr tierra4 y agua1 después de tramo ordinario completo | `4/5+1/6=29/30` en **segundo tramo** | Legal sólo si Acción de Correr disponible |

## 3. B5-I01-P02 — Retirada y transición de medios [PROPUESTA NO CANÓNICA]

**Disparador:** criatura se aleja voluntariamente de amenaza activa cuerpo a cuerpo al iniciar desplazamiento. **Coste:** ninguno nuevo; **límite:** la Retirada del canon permite **la mitad del Movimiento normal redondeada hacia abajo**. **Criterio propuesto de implementación multimodal:** para el **tramo de Retirada** usar presupuesto `F ≤ 1/2` de la misma cuenta fraccional, **pero** cuando sólo exista una velocidad homogénea `V`, mantener el límite exacto `⌊V/2⌋` espacios del canon; cuando hay medios mixtos, evitar superar el equivalente de `⌊V_inicial/2⌋/V_inicial` de fracción antes de Correr. Esto toma como referencia **el medio legal en el inicio de Retirada**, sin permitir usar el medio más rápido para eludirla. Terreno difícil consume fracción correspondiente. Correr, si está permitido, se añade **después** y cuesta Acción con tramo completo separado.

**Ejemplo:** Coralio empieza Retirada en tierra5, límite fraccional `2/5`; tierra1 (`1/5`) y agua1 (`1/6`) suman `11/30` y caben; tierra2 (`2/5`) y agua1 (`1/6`) exceden. Si empieza en agua6, límite `3/6`; agua2 (`2/6`) y tierra1 (`1/5`) suman `8/15` y exceden. **B5 debe validar** si el límite se aplica a todo desplazamiento mientras continúa amenaza o sólo al tramo inicial; no permitir escapatoria gratuita por entrar/salir de agua. No sustituye texto canónico.

## 4. B5-I01-P03 — Pérdida de vuelo, caída y apoyos [PROPUESTA NO CANÓNICA]

**Disparador:** Hada o Terio volador adquiere Carga Pesada/Excesiva, pierde la capacidad de volar, queda Incapacitado o pierde apoyo requerido. **Coste:** sin Acción, Movimiento ni Reacción racial adicional. **Alcance:** personaje en posición y altura registradas; **duración:** hasta resolver condición y física del movimiento.

**Protocolo de orden:** (1) terminar el paso/efecto que causó cambio de estado según sus reglas, (2) registrar altura, soporte, carga, turno, medio y fracción `F` consumida, (3) impedir nuevos pasos aéreos raciales mientras condición prohibitiva persista, (4) consultar caída, aterrizaje y Reacciones **con disparador válido**. **No** permitir soltar carga fuera de turno ni aterrizar automáticamente si no hay regla que lo autorice. **Pendiente de canon:** instante exacto de inicio de caída y oportunidad de reacción en interrupción; registrar alternativas, no imponer daño instantáneo ni suspensión en el aire.

**Hada:** si el turno comenzó sin apoyo apto o pretende terminar sin apoyo apto, el trayecto **no satisface** su vuelo racial aunque `F ≤ 1`. No convertir el vuelo en sostenido por haber gastado menos de seis espacios. **Terio Dominante:** no hereda requisito de apoyo Hada; tampoco ignora Carga ni caída.

## 5. Matriz de regresión global B5-I01 — 20 casos documentales

| ID | Escenario | Expectativa y referencia |
|---|---|---|
| B5-I01-T01 | Coralio tierra4/5 → agua1/6 | 29/30, legal propuesto |
| B5-I01-T02 | Coralio tierra4/5 → agua2/6 | Excede, segundo paso ilegal |
| B5-I01-T03 | Coralio agua5/6 → tierra1/5 | Excede, paso terrestre ilegal |
| B5-I01-T04 | Coralio agua4/6 → tierra1/5 | 13/15, legal |
| B5-I01-T05 | Hada tierra2/5 → aire3/6 con apoyos | 9/10, legal |
| B5-I01-T06 | Hada tierra3/5 → aire3/6 | 11/10, último paso ilegal |
| B5-I01-T07 | Hada termina en aire sin apoyo | No permite terminar turno volando por paquete racial |
| B5-I01-T08 | Hada con Carga Pesada intenta vuelo | No puede usar vuelo racial |
| B5-I01-T09 | Terio Dominante bajo Carga Pesada | No puede usar vuelo sostenido |
| B5-I01-T10 | Terio nado6 y tierra6 | No hay reservas dobles ni respiración acuática gratis |
| B5-I01-T11 | Coralio tierra difícil2 y agua1 | 29/30 si 2 pasos terrestres cuestan 2 cada uno |
| B5-I01-T12 | Coralio Exhausto tierra2 + agua1 | 11/12 con V3/V4 |
| B5-I01-T13 | Coralio Exhausto tierra2 + agua2 | 7/6, no |
| B5-I01-T14 | Coralio Correr después de movimiento completo | Acción obligatoria, tramo adicional propio |
| B5-I01-T15 | Coralio Retirada tierra1 + agua1 | 11/30 ≤ 2/5, legal propuesto |
| B5-I01-T16 | Coralio Retirada tierra2 + agua1 | 17/30 > 2/5, no |
| B5-I01-T17 | Coralio Retirada agua2 + tierra1 | 8/15 > 1/2, no |
| B5-I01-T18 | Volador pierde Carga apta en altura4 | Registrar caída/ventana, no Reacción gratis |
| B5-I01-T19 | Hada empujada fuera de apoyo entre turnos | No vuelo de rescate automático |
| B5-I01-T20 | Personaje a 0 Vida pretende iniciar Correr/vuelo | Incapacitado no gana Acción; resolver caída aparte |

**Casos de frontera pendientes de mesa:** casilla diagonal/vertical, cambio de medio en medio de un espacio, movimiento forzado (no gasto voluntario), varias amenazas en Retirada, terreno difícil variable, velocidad cambiada por hechizo a mitad del paso, aterrizaje en plataforma ocupada, carga tomada/soltada por tercero, salto y caída iniciados durante Reacción. El registro distingue **DOC** de **EMP**.

## 6. Dictamen y trazabilidad

**B5-I01: PROPUESTA DE RESOLUCIÓN DOCUMENTAL FORMULADA; VALIDACIÓN PENDIENTE.** La fórmula `Σ(c/V) ≤ 1` resuelve el hueco aritmético sin dos reservas; P02 preserva la Retirada como restricción y P03 evita inmunidad o salvamento gratis. Antes de dar I01 por cerrada se requieren cotejo de casos extremos, decisión editorial transversal y ejecución en mesa/Foundry o aprobación explícita de que el cierre sea documental. **No cambiar el Manual Maestro ni Foundry.** Cruces afectados: **X06-07, X06-12, X07-12**, más X01-07/X01-12 como controles de presupuesto. Siguiente incidencia: **B5-I02 — Enraizar Dríade/Verdante, Derribar, Martillo Cinético y pérdida de suelo**.
