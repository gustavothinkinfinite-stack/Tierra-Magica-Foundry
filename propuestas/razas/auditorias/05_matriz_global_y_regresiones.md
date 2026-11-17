# B5 — Matriz global de 12 familias, incidencias y plan de regresión

**17-11-2026 — FASE B5 INICIADA, NO CERRADA. PROPUESTA NO CANÓNICA.** Se verificaron tablero, README, plan, las doce B4 registradas y el Manual Maestro de `main` (blob `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`). Las B4 son auditorías documentales, no resultados empíricos. **Este archivo inicia el control global, no autoriza la fase C todavía.**

## 1. Cobertura 12×12

Cada celda no diagonal identifica **un cruce bidireccional**. La matriz tiene 144 celdas, 12 diagonales de autocontrol y **66 pares únicos**, enumerados debajo. No equivale a 66 pruebas ejecutadas.

| ↕ | HUM | ENA | ELF | ORC | GOB | TER | FEE | ANK | CRI | VER | MIC | COR |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| HUM | — | X01-02 | X01-03 | X01-04 | X01-05 | X01-06 | X01-07 | X01-08 | X01-09 | X01-10 | X01-11 | X01-12 |
| ENA | X01-02 | — | X02-03 | X02-04 | X02-05 | X02-06 | X02-07 | X02-08 | X02-09 | X02-10 | X02-11 | X02-12 |
| ELF | X01-03 | X02-03 | — | X03-04 | X03-05 | X03-06 | X03-07 | X03-08 | X03-09 | X03-10 | X03-11 | X03-12 |
| ORC | X01-04 | X02-04 | X03-04 | — | X04-05 | X04-06 | X04-07 | X04-08 | X04-09 | X04-10 | X04-11 | X04-12 |
| GOB | X01-05 | X02-05 | X03-05 | X04-05 | — | X05-06 | X05-07 | X05-08 | X05-09 | X05-10 | X05-11 | X05-12 |
| TER | X01-06 | X02-06 | X03-06 | X04-06 | X05-06 | — | X06-07 | X06-08 | X06-09 | X06-10 | X06-11 | X06-12 |
| FEE | X01-07 | X02-07 | X03-07 | X04-07 | X05-07 | X06-07 | — | X07-08 | X07-09 | X07-10 | X07-11 | X07-12 |
| ANK | X01-08 | X02-08 | X03-08 | X04-08 | X05-08 | X06-08 | X07-08 | — | X08-09 | X08-10 | X08-11 | X08-12 |
| CRI | X01-09 | X02-09 | X03-09 | X04-09 | X05-09 | X06-09 | X07-09 | X08-09 | — | X09-10 | X09-11 | X09-12 |
| VER | X01-10 | X02-10 | X03-10 | X04-10 | X05-10 | X06-10 | X07-10 | X08-10 | X09-10 | — | X10-11 | X10-12 |
| MIC | X01-11 | X02-11 | X03-11 | X04-11 | X05-11 | X06-11 | X07-11 | X08-11 | X09-11 | X10-11 | — | X11-12 |
| COR | X01-12 | X02-12 | X03-12 | X04-12 | X05-12 | X06-12 | X07-12 | X08-12 | X09-12 | X10-12 | X11-12 | — |


## 2. Registro de 66 pares y criterios de regresión documental

| ID | Par | Riesgo dominante a controlar | Criterio de aceptación (pendiente de ejecución) |
|---|---|---|---|
| X01-02 | Humanos / Enanos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X01-03 | Humanos / Élficos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X01-04 | Humanos / Orcos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X01-05 | Humanos / Goblinoides | Don humano vs Ojo: oportunidad no gratuita | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X01-06 | Humanos / Terios | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X01-07 | Humanos / Feéricos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X01-08 | Humanos / Ankar | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X01-09 | Humanos / Cristálidos | Afinidad sobrenatural no copia Resonancia | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X01-10 | Humanos / Verdantes | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X01-11 | Humanos / Micelios | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X01-12 | Humanos / Coralios | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X02-03 | Enanos / Élficos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X02-04 | Enanos / Orcos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X02-05 | Enanos / Goblinoides | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X02-06 | Enanos / Terios | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X02-07 | Enanos / Feéricos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X02-08 | Enanos / Ankar | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X02-09 | Enanos / Cristálidos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X02-10 | Enanos / Verdantes | Escala defensiva y Enraizar | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X02-11 | Enanos / Micelios | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X02-12 | Enanos / Coralios | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X03-04 | Élficos / Orcos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X03-05 | Élficos / Goblinoides | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X03-06 | Élficos / Terios | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X03-07 | Élficos / Feéricos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X03-08 | Élficos / Ankar | Magia vital no equivale a almas | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X03-09 | Élficos / Cristálidos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X03-10 | Élficos / Verdantes | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X03-11 | Élficos / Micelios | Resonancia vital frente a química cercana | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X03-12 | Élficos / Coralios | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X04-05 | Orcos / Goblinoides | Información, Voluntad y ventaja | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X04-06 | Orcos / Terios | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X04-07 | Orcos / Feéricos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X04-08 | Orcos / Ankar | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X04-09 | Orcos / Cristálidos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X04-10 | Orcos / Verdantes | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X04-11 | Orcos / Micelios | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X04-12 | Orcos / Coralios | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X05-06 | Goblinoides / Terios | Escurridizo y espacios de cuerpos Terios | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X05-07 | Goblinoides / Feéricos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X05-08 | Goblinoides / Ankar | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X05-09 | Goblinoides / Cristálidos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X05-10 | Goblinoides / Verdantes | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X05-11 | Goblinoides / Micelios | Información de red no activa Ojo sin recepción legal | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X05-12 | Goblinoides / Coralios | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X06-07 | Terios / Feéricos | Vuelo Terio/Hada, carga y apoyos | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X06-08 | Terios / Ankar | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X06-09 | Terios / Cristálidos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X06-10 | Terios / Verdantes | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X06-11 | Terios / Micelios | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X06-12 | Terios / Coralios | Nado Terio/Coralio y cambio de medio | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X07-08 | Feéricos / Ankar | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X07-09 | Feéricos / Cristálidos | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X07-10 | Feéricos / Verdantes | Anclaje Dríade/Verdante, pérdida de soporte | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X07-11 | Feéricos / Micelios | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X07-12 | Feéricos / Coralios | Vuelo Hada frente a agua/respiración | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X08-09 | Ankar / Cristálidos | Sentido espiritual frente a Resonancia por contacto | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X08-10 | Ankar / Verdantes | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X08-11 | Ankar / Micelios | Sentido espiritual no se retransmite por Enlace | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X08-12 | Ankar / Coralios | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X09-10 | Cristálidos / Verdantes | Presupuestos separados; no heredar poder, coste ni inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X09-11 | Cristálidos / Micelios | Circuito frente a red micelial: no canal mágico | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X09-12 | Cristálidos / Coralios | Cristal no crea fuente de energía acuática | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X10-11 | Verdantes / Micelios | Sustento vegetal frente a fúngico | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X10-12 | Verdantes / Coralios | Hidratación y bioma sin inmunidad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |
| X11-12 | Micelios / Coralios | Humedad no equivale a anfibiedad | DOC: cotejar disparador, Acción, radio y coste; sin rasgos prestados |

## 3. Incidencias transversales priorizadas

| ID | Severidad | Cruces | Vacío y resolución propuesta NO CANÓNICA | Coste/limitación | Estado |
|---|---|---|---|---|---|
| B5-I01 | Alta | TER–FEE–COR | Definir conversión de MOV entre suelo, agua y aire en un turno; **propuesta:** un solo presupuesto de MOV, cada tramo consume su distancia en unidades de movimiento y se comprueba capacidad por medio, sin sumar reservas; documentar velocidad aplicable al tramo y restricciones de vuelo | Sin Acción extra; Hada debe terminar apoyada; Terio vuelo sin Carga Pesada; Coralio MOV5/6 | ABIERTA, contrastar reglas generales |
| B5-I02 | Alta | FEE–VER–ENA | Unificar secuencia Enraizar, Derribar, Empujar, Martillo Cinético, caída y pérdida de suelo; **propuesta:** +1 Escala efectiva sólo para resistencia indicada, Acción de enraizar y 1 MOV de liberación; caída/ruptura requieren ventana común | Sin Defensa, Protección ni Reacción adicional | PROPUESTA DOC; VALIDACIÓN PENDIENTE |
| B5-I03 | Alta | ELF–ANK–CRI–MIC–COR | Tabla de fronteras sensoriales: vital significativo perceptible; espíritu 6; circuito tocado; química cercana; corriente acuática; no convertir ninguna en radar general | Sin +1 PER general ni diagnóstico | PROPUESTA DOC; VALIDACIÓN PENDIENTE |
| B5-I04 | Alta | MIC–ANK–CRI | Red micelial 12: métrica geométrica vs longitud; continuidad, voluntad, reconexión y 0 Vida; **propuesta:** distancia geométrica, Acción nueva tras ruptura | Sin cadena instantánea, telepatía ni Fuente | PROPUESTA DOC; VALIDACIÓN PENDIENTE |
| B5-I05 | Alta | TER–COR | Adaptación anfibia Terio vs Coralio racial vs Rasgo General Anfibio 1 PR; comparar presupuesto y condiciones de hidratación, no regalar un segundo beneficio | Mantener costes y límites existentes | PROPUESTA DOC; VALIDACIÓN PENDIENTE |
| B5-I06 | Media | GOB–HUM–ORC | Hobgoblin sólo Ojo vs variantes con segundo rasgo; medir paridad de escenas sin otorgar Liderazgo gratuito | Cualquier rasgo nuevo exige coste o sustitución explícita | PROPUESTA DOC; VALIDACIÓN PENDIENTE |
| B5-I07 | Media | ORC–GOB–HUM | Ojo, Voluntad, Ayuda, Ventaja/Desventaja e Iniciativa; orden de declaración y una oportunidad real | 1/Escena; no duplicar circunstancia | PROPUESTA DOC; VALIDACIÓN PENDIENTE |
| B5-I08 | Alta | CRI–MIC | Conductor Vivo, consentimiento/desconexión, Energía/Caudal/Sobrecarga; red micelial no sustituye interfaz | Acción y recursos del dispositivo; no Maná ni Energía gratis | PROPUESTA DOC; VALIDACIÓN PENDIENTE |
| B5-I09 | Media | VER–MIC–COR | Hidratación, nutrientes, luz, Fatiga, Descanso y viaje; evitar contadores arbitrarios como CLN-01 | Provisiones y procedimientos generales | PROPUESTA DOC; VALIDACIÓN PENDIENTE |
| B5-I10 | Alta | TODAS | Estados a 0 Vida, Trauma, poderes mantenidos, contacto, raíces, vuelo, reacción y dispositivos | No hay cura/Acción extra ni inmunidad por biología | PROPUESTA DOC; VALIDACIÓN PENDIENTE |
| B5-I11 | Media | TODAS | Rasgos generales adquiridos y poderes equivalentes; impedir apilamiento de la misma propiedad y no impedir compras distintas | 25 PD/3 PR, salvo Don humano canónico | PROPUESTA DOC; VALIDACIÓN PENDIENTE |
| B5-I12 | Media | TODAS | Crafting, Alquimia, Ingeniería, Familiares, rituales y cultura: no recursos ni competencias gratuitas | Materiales, tiempo, recursos y requisitos de sistema | PROPUESTA DOC; VALIDACIÓN PENDIENTE |

## 4. Doce escenarios globales G01–G12 (diseño de regresión; NO ejecutados)

| ID | Preparación | Resultado esperado / conflicto a resolver |
|---|---|---|
| B5-G01 | Hada cruza 3 espacios terrestres y 3 aéreos, termina sin apoyo | Propuesta presupuesto único; fin sin apoyo inválido |
| B5-G02 | Coralio recorre 3 suelo + 3 agua | No suma MOV5+MOV6; adjudicar cambio de medio I01 |
| B5-G03 | Terio volador con Carga Pesada | No vuelo, aunque tramo previo sea terrestre |
| B5-G04 | Dríade y Verdante enraizados, Martillo Cinético | Daño se mantiene; equivalencia anclaje/desplazamiento I02 |
| B5-G05 | Enano resiste Empujar; Verdante anclado resiste igual | Escala efectiva sólo resistencia; Acción/soporte diferencian |
| B5-G06 | Espíritu detrás de muro, artefacto tocado y esporas herméticas | Separar Sentido del Umbral, Resonancia Arcana y Quimiosensibilidad |
| B5-G07 | A–B Micelios a 8 rectos y 25 por red | Ambigüedad real; resolver I04 sin afirmar canon |
| B5-G08 | Hobgoblin y Goblin en 5 escenas de oportunidad iguales | Ojo 1/Escena igual; medir valor diferencial de Escurridizo I06 |
| B5-G09 | Cristálido retira consentimiento de interfaz activa | Sin corte gratuito inventado; definir protocolo de diseño I08 |
| B5-G10 | Coralio seco, Verdante sin luz y Micelio sin humedad | Fatiga/descanso generales; no daño fijo racial inventado |
| B5-G11 | Red micelial, anclaje y conductor caen a 0 Vida | Incapacitado, Trauma y mantenimiento por reglas aplicables; huecos I10 |
| B5-G12 | PJ reclama Familiar, Ingeniería y material infinito por ascendencia | Sin ventajas ni crafting gratuito; 25 PD/3 PR y recursos |

## 5. Protocolo de cierre B5

1. Releer texto canónico de cada subsistema citado y registrar **norma literal vs. silencio**; si hay silencio, mantener propuesta versionada y no presentarla como decisión vigente.
2. Resolver I01–I12 con matriz de decisión, alternativas descartadas, compatibilidad y pruebas de regresión. **No basta** con haber listado los 66 pares.
3. Completar tabla de ejecución: DOC por lectura, SIM si realmente se ejecuta simulador, FOUNDRY y MESA sólo con evidencia. Por ahora **todos los B5-G01–G12 están pendientes de ejecución**.
4. Ejecutar revisión cruzada de regresiones contra B1–B4; cuando el cierre documental sea consistente y no haya incidencias bloqueantes de edición, marcar B5 **cerrada documentalmente** y autorizar recién entonces C. Pruebas empíricas pueden quedar expresamente pendientes.
5. No tocar `main`, Manual Maestro, atlas ni código Foundry. Toda resolución sigue siendo **propuesta** hasta aprobación del creador.

**Siguiente bloque sustantivo:** resolver **B5-I01 movimiento multimodal** con tabla de secuencias, alternativas, costes y casos límite; después I02 anclaje y I03 sentidos.

## Avance 17-11-2026 — B5-I01 movimiento multimodal

- **Estado:** propuesta documental desarrollada, **no canonizada ni validada empíricamente**. Ver [`05_b5_i01_movimiento_multimodal.md`](./05_b5_i01_movimiento_multimodal.md).
- **B5-I01-P01:** presupuesto fraccional único `Σ(c/V_medio) ≤ 1` por tramo, sin sumar velocidades ni reiniciar al cambiar medio; Correr consume Acción y abre tramo nuevo.
- **B5-I01-P02:** Retirada conserva límite reducido; propuesta de fracción equivalente al medio inicial y redondeo canónico en medio homogéneo.
- **B5-I01-P03:** registrar altura, apoyo, Carga, ventana y caída; no regalar Reacciones ni aterrizaje.
- **20 regresiones DOC B5-I01-T01–T20**, no ejecutadas; cruces prioritarios **X06-07, X06-12 y X07-12**. Pendientes: orden de caída/interrupción, diagonal/vertical, Retirada con múltiples amenazas y ejecución de pruebas.
- **Siguiente incidencia: B5-I02**, anclaje Dríade/Verdante, Derribar, Martillo Cinético y pérdida de soporte.

## Avance 17-11-2026 — B5-I02 anclajes
- **Propuesta documental, no canonizada:** [`05_b5_i02_anclajes.md`](./05_b5_i02_anclajes.md). Enraizar Dríade/Verdante mantiene Acción, suelo apropiado, +1 Escala efectiva sólo para resistencia enumerada y liberación 1 MOV.
- **B5-I02-P01–P04:** estado único, Empujar/Derribar/Martillo Cinético, pérdida de soporte y 0 Vida/Presa; 18 regresiones **B5-I02-T01–T18 DOC no ejecutadas**.
- Martillo Cinético: propuesta de 0 desplazamiento si anclado válido, pero Daño 3 permanece. **Reservas abiertas:** viabilidad exacta de Derribar, orden de soporte destruido y persistencia defensiva a 0 Vida.
- Cruces X07-10, X02-10, X02-07, X07-09; escenarios B5-G04/G05/G11. **Siguiente B5-I03: sentidos y percepción.**

## Avance 17-11-2026 — B5-I03 sentidos y detección
- Propuesta no canónica: [`05_b5_i03_sentidos.md`](./05_b5_i03_sentidos.md); cuatro propuestas B5-I03-P01–P04 y 20 regresiones **DOC no ejecutadas** B5-I03-T01–T20.
- Separa evidencia, medio, barreras, radio/contacto y nivel informativo; no equipara advertencia a identificación o neutralización. Cruces X03-08, X03-09, X03-11, X03-12, X08-09, X08-11, X08-12, X09-11, X09-12 y X11-12; B5-G06.
- Reservas: geometría y ocultación espiritual, «cerca» micelial, combinación de sentidos adquiridos y efectos mágicos; **0 Foundry, 0 mesa**. Siguiente **B5-I04 Enlace Micelial**.

## Avance 17-11-2026 — B5-I04 Enlace Micelial
- Propuesta documental **no canónica**: [`05_b5_i04_enlace_micelial.md`](./05_b5_i04_enlace_micelial.md). Cuatro propuestas B5-I04-P01–P04 y **20 regresiones DOC no ejecutadas** B5-I04-T01–T20.
- Alcance propuesto geométrico ≤12 espacios entre participantes (no longitud de red), continuidad real viva/compatible, Acción del iniciador, voluntad/contacto del receptor, corte inmediato y reconexión con nueva Acción; no relé, telepatía ni transferencia de Maná.
- Reservas: coste de conexión del receptor, geometría vertical, interrupción simultánea y estado a 0 Vida. Cruces X08-11/X09-11/X10-11/X11-12 y B5-G07/G11; **0 Foundry, 0 mesa**. Siguiente **B5-I05 Voluntad Orca y Ayuda/Ventaja**.

## Avance 17-11-2026 — B5-I05 Voluntad Orca y Complexión
- [`05_b5_i05_orcos.md`](./05_b5_i05_orcos.md): cuatro propuestas no canónicas B5-I05-P01–P04 y 20 regresiones **DOC no ejecutadas** B5-I05-T01–T20.
- Propuesta: registrar causas de Desventaja antes de cancelar Ayuda/Ventaja; gastar Voluntad 1/Escena antes de tirar sólo si todas las fuentes de Desventaja son elegibles; no elimina estados ni otorga Ventaja propia. Complexión +1 FUE sólo Carga/objetos inertes, no maniobras.
- Abiertos: orden alternativo de cancelación, múltiples fuentes elegibles y cuerpos inconscientes en Carga. Cruces Orcos/Humanos/Enanos/Goblinoides/Terios; **0 Foundry, 0 mesa**. Siguiente **B5-I06 Goblinoides**.

## Avance 17-11-2026 — B5-I06 Goblinoides
- [`05_b5_i06_goblinoides.md`](./05_b5_i06_goblinoides.md): cuatro propuestas no canónicas B5-I06-P01–P04 y 20 regresiones **DOC no ejecutadas** B5-I06-T01–T20.
- Ojo requiere oportunidad real registrada antes de la prueba; Iniciativa es interpretación condicional no canónica. Escurridizo paga terreno difícil y no anula Reacciones ni ocupación final; Complexión Bugbear sólo Carga/objetos inertes.
- Paridad Hobgoblin pendiente de medición; alternativa Disciplina Preparada con Acción previa y 1/Escena **no aprobada**. Abiertos interrupción de casilla, Iniciativa y cuerpos en Carga. Cruces X01-05, X02-05, X04-05, X05-06, X05-07; B5-G02/G03/G08; **0 Foundry, 0 mesa**. Siguiente **B5-I07 Terios**.

## Avance 17-11-2026 — B5-I07 Terios
- [`05_b5_i07_terios.md`](./05_b5_i07_terios.md): cuatro propuestas B5-I07-P01–P04 no canónicas y 20 regresiones **DOC no ejecutadas** B5-I07-T01–T20.
- Presupuesto excluyente Principal+Secundaria o Dominante; Variedad sustituye, no agrega. Natación ≠ respiración/Anfibio 1 PR; vuelo Dominante no funciona con Carga Pesada/Excesiva; movimiento mixto remite a B5-I01.
- Abiertos: branquias y respiración costeada, equivalencias de Rasgos, cambio de Carga en vuelo y cambios de ruta. Cruces X05-06/X06-07/X06-11/X06-12, B5-G01/G02/G09; **0 Foundry, 0 mesa**. Siguiente **B5-I08 Cristálidos**.

## Avance 17-11-2026 — B5-I08 Cristálidos
- [`05_b5_i08_cristalidos.md`](./05_b5_i08_cristalidos.md): cuatro propuestas B5-I08-P01–P04 no canónicas y 20 regresiones **DOC no ejecutadas** B5-I08-T01–T20.
- Conductor Vivo exige diseño compatible, consentimiento y recursos existentes; no crea Maná/Energía/Caudal ni inmunidad a sobrecarga. Matriz Mixta mantiene fisiología y 0 Vida; Resonancia sólo lectura cualitativa por contacto.
- Pendientes interfaces, corte por retirada, interrupción tras gasto, coacción y riesgos. Cruces X01-09/X08-09/X09-10/X09-11/X09-12, B5-G06/G10/G12; **0 Foundry, 0 mesa**. Siguiente **B5-I09 Verdantes**.

## Avance 17-11-2026 — B5-I09 Verdantes
- [`05_b5_i09_verdantes.md`](./05_b5_i09_verdantes.md): cuatro propuestas no canónicas B5-I09-P01–P04 y 20 regresiones **DOC no ejecutadas** B5-I09-T01–T20.
- Bioma concede una modalidad estrecha; Sustento requiere agua/luz/nutrientes y descanso normal; Medicina/Sangrado/0 Vida no admiten inmunidad vegetal gratuita; Enraizar remite a B5-I02.
- Abiertos privación temporal, barro/agua somera, Trauma y pérdida de soporte. Cruces X07-10/X08-10/X10-11/X10-12, B5-G04/G05/G09; **0 Foundry, 0 mesa**. Siguiente **B5-I10 Coralios**.

## Avance 17-11-2026 — B5-I10 Coralios
- [`05_b5_i10_coralios.md`](./05_b5_i10_coralios.md): cuatro propuestas no canónicas B5-I10-P01–P04 y 20 regresiones **DOC no ejecutadas** B5-I10-T01–T20.
- Hidratación condiciona respiración anfibia sin reloj inventado; presión/corriente/contaminación/frío siguen amenazas; MOV tierra5/agua6 remite a B5-I01; Protección Natural1 no suma con armadura.
- Abiertos umbral de hidratación, equipos y consumos, equivalencia Anfibio y presión. Cruces X06-12/X07-12/X09-12/X10-12/X11-12; B5-G01/G05/G09; **0 Foundry, 0 mesa**. Siguiente **B5-I11 Feéricos**.

## Avance 17-11-2026 — B5-I11 Feéricos
- [`05_b5_i11_feericos.md`](./05_b5_i11_feericos.md): cuatro propuestas no canónicas B5-I11-P01–P04 y 20 regresiones **DOC no ejecutadas** B5-I11-T01–T20.
- Hada debe empezar/terminar apoyada, MOV tierra5/aire6 sin reservas acumulables, no vuelo con Carga Pesada/Excesiva; Agarrar/0 Vida/caída sin inmunidad; Naturaleza Feérica no concede Fuente/Maná; Sátiro/Dríade/Silfo conservan límites.
- Abiertos interrupción y caída, carga de criaturas, Vuelo Natural y orden a 0 Vida. Cruces X02-07/X05-07/X06-07/X07-10/X07-12, B5-G01/G02/G04/G09; **0 Foundry, 0 mesa**. Siguiente **B5-I12 cierre de incidencias residuales**.

## Avance 17-11-2026 — B5-I12 Oficios y conciliación
- [`05_b5_i12_oficios_y_conciliacion.md`](./05_b5_i12_oficios_y_conciliacion.md): cuatro propuestas no canónicas B5-I12-P01–P04, 20 regresiones **DOC no ejecutadas** B5-I12-T01–T20 y conciliación explícita de las doce filas temáticas originales con anexos existentes.
- Crafting/Alquimia/Ingeniería/Familiares/rituales no heredan recursos, Habilidades, Fórmulas, Maná, Energía, Acción ni materiales gratuitos de Ascendencia/Origen/Trasfondo; Rasgos idénticos no apilan ni cobran doble.
- **Advertencia de integridad:** números de anexos B5-I05–I11 y filas originales no son isomorfos; la conciliación es temática, no cierre de todas las cuestiones. Siguen abiertos movimiento/caída, conexión sostenida, Anfibio, paridad Hobgoblin, 0 Vida y ejecución de pruebas. **0 Foundry, 0 mesa**. **Siguiente: acta global de cierre documental B5 y decisión de bloqueantes editoriales; fase C aún no autorizada**.

## Acta de conciliación global — 17-11-2026
- [`05_b5_acta_conciliacion_y_puerta_editorial.md`](./05_b5_acta_conciliacion_y_puerta_editorial.md): auditadas las doce filas temáticas originales y la discrepancia de numeración de anexos.
- **7 bloqueantes editoriales:** I01, I02, I04, I05, I06, I08, I10; **4 pendientes de cierre editorial:** I03, I07, I09, I11; **1 frontera canónica delimitada:** I12. Ninguno implica aprobación ni prueba de motor.
- **0/12 escenarios globales ejecutados, 0/66 pares certificados empíricamente, 0 Foundry/mesa.** No cerrar B5 ni habilitar fase C hasta resolver bloqueantes y revisar guiones. Siguiente: procedimiento común I01/I02/I10 (movimiento, anclaje y 0 Vida).
