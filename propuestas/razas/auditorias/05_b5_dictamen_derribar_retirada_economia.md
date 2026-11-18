# B5 — Dictamen de Derribar, Retirada y economía racial
**18-11-2026 · propuesta no canónica · auditoría documental.** Manual Maestro verificado en `main` blob `334770e7ed7d2605767aecb169f57da6c1100508`. Se releyeron tablero, README, plan, revisión XG/0 Vida y decisiones D01–D10. **0 pruebas Foundry/mesa.**

## 1. Derribar frente a Incapacitado — distinguir acción de resistencia
**Canon comprobado:** Derribar cuesta Acción y tira contra Defensa de Maniobra; éxito impone Derribado. Derribado no quita automáticamente Defensa. A 0 Vida se aplica Incapacitado/Trauma según reglas generales. Cuerpo de Piedra enano cambia Escala efectiva para resistir Derribar, pero excluye Defensa general; Enraizar también restringe Escala efectiva a resistencias concretas.

**Propuesta de arbitraje DER-R3 (sustituye R2 sólo en el caso de Incapacitado):** el atacante puede declarar Derribar contra un objetivo Incapacitado sólo si cambiar su postura tiene sentido físico. Se usa su **Defensa de Maniobra vigente** y se resuelve Acción y éxito ordinarios; el defensor no declara Acción ni Reacción nueva. Si el defensor conserva un rasgo **pasivo** de Escala efectiva para resistir Derribar (Enano), la propuesta DER-R2 de +1 circunstancial se aplica **únicamente a esta resistencia**, incluso Incapacitado. Enraizar sólo lo conserva si ya estaba activado y el soporte sigue íntegro al momento de resistir. La bonificación propuesta nunca convierte Incapacitado en inmunidad ni sustituye el estado. Un objetivo ya Derribado no acumula otra instancia. **Advertencia:** el +1 no existe en el procedimiento canónico de Derribar; es la traducción editorial propuesta de la mejora de Escala, no texto vigente.

| ID | Entrada y operación | Salida documental propuesta |
|---|---|---|
| DR3-01 | Enano a 0 Vida, Cuerpo de Piedra; atacante usa Acción Derribar | Resolver contra Defensa Maniobra +1 circunstancial **sólo DER-R2**; ninguna reacción del Enano |
| DR3-02 | Verdante ya Enraizado, suelo intacto, 0 Vida | Misma lectura restringida de DER-R2; no puede desanclarse voluntariamente |
| DR3-03 | Verdante a 0 Vida con suelo destruido antes de ataque | Sin bono de Enraizar; caída/posición por reglas generales |
| DR3-04 | Enano ya Derribado, nuevo Derribar | No segunda instancia de Derribado |
| DR3-05 | Enano 0 Vida sin efecto que altere postura | No declarar Derribar para obtener daño o Acción gratuita de otro tipo |
| DR3-06 | Ataque daña y rompe soporte simultáneamente | Estado de soporte previo si simultaneidad no ordenada; luego ruptura/caída, regla de desempate propuesta |

**Pendiente editorial:** decidir si la conversión DER-R2 es necesaria o si se prefiere eliminarla y dejar la mejora de Escala sin traducción cuantitativa en Derribar. Hasta entonces la puerta B5 no se cierra.

## 2. Retirada y movimiento mixto — aritmética sin velocidad extra
**Canon comprobado:** Retirada al alejarse desde amenaza consciente/capaz de combatir: mitad del Movimiento normal, redondeada abajo (MOV5→2, MOV6→3, MOV7→3). La fracción única para cambios de medio es una propuesta D01, no canon. La métrica diagonal y vertical debe seguir el sistema general de tablero/escena: **no declarar diagonal = 1 ni Euclídea por defecto**.

| ID | Preparación | Cálculo y decisión |
|---|---|---|
| MOV3-01 | Coralio MOV tierra5, agua6; Movimiento normal 2 tierra+3 agua | 2/5+3/6=0,9; legal D01 |
| MOV3-02 | Coralio Retirada 1 tierra+1 agua | 1/5+1/6=11/30; legal D01 |
| MOV3-03 | Coralio Retirada 2 tierra+1 agua | 2/5+1/6=17/30; ilegal D01 |
| MOV3-04 | Coralio Retirada sólo tierra 3 espacios | excede floor(5/2)=2; ilegal |
| MOV3-05 | Coralio Retirada sólo agua 3 espacios | floor(6/2)=3; legal |
| MOV3-06 | Red Micelial con separación vertical 12 en métrica general vigente | dentro del radio si continuidad real y contacto; 13 fuera; **no inventar geometría 3D** |
| MOV3-07 | Diagonal con terreno difícil y coste c no definido en la escena | caso **PENDIENTE**, fijar c por regla general antes de calcular fracción; nunca bonificar movimiento |

**Detección:** D01 puede producir diferentes trayectos que una regla alternativa de «elegir sólo un medio»; se mantiene explícitamente como propuesta. Ninguna prueba de movimiento se ejecutó en tablero.

## 3. Economía Anfibio y Hobgoblin — comparación de coste marginal
**Canon comprobado:** nivel 1 = 25 PD y 3 PR independientes; el paquete racial se equilibra aparte y no consume esos presupuestos. Anfibio figura en catálogo de creación por **1 PR**. No es válido convertir bonificación racial cultural en PD/PR gratis.

| Caso | Ficha y coste | Beneficio y frontera |
|---|---|---|
| ECO-01 | Terio con locomoción Nado, 0 PR en Anfibio | MOV acuático no equivale a respirar agua |
| ECO-02 | Terio con Nado + Anfibio, 1 PR | Respiración dual adquirida, sin MOV adicional; quedan 2 PR |
| ECO-03 | Coralio hidratado, 0 PR en Anfibio | Respiración dual racial condicionada; conserva 3 PR |
| ECO-04 | Coralio compra Anfibio 1 PR, lectura D05 | Fuente general adicional para respirar aire/agua ordinarios aun seco; quedan 2 PR; **no evita privación ni da hidratación** |
| ECO-05 | Coralio compra Anfibio y Rasgo de 3 PR | 1+3>3: creación inválida |
| ECO-06 | Hobgoblin base conserva Ojo | No paga PR por paquete racial; desigualdad con Goblin/Bugbear documentada, no medida |
| ECO-07 | Hobgoblin usa Señal de Coordinación opcional | Sustituye Ojo dentro del paquete racial propuesto; **no consume 1 PR adicional**, pero sí Acción y 1/Escena; no sumar Ojo |
| ECO-08 | Hobgoblin con Señal intenta dar +1 a sí mismo | No: requiere aliado distinto, oportunidad y distancia/percepción de la propuesta |

**Alerta de diseño:** la opción Coralio D05 es una **interpretación ampliatoria**, no garantía canónica; si no se acepta, se debe registrar compra redundante como no recomendada y no atribuir inmunidad. La alternativa Hobgoblin cambia un rasgo racial por otro, no se compra con PR del catálogo cerrado. Ninguna de las dos opciones está validada por balance empírico.

## 4. Estado de salida
**18 casos documentales nuevos** (6 DR3, 7 MOV3, 8 ECO = **21**, cifra correcta: **21 casos**), todos razonados por lectura y **0 ejecutados**. Se deja explícita la rectificación del recuento para evitar un total erróneo. B5 permanece **ABIERTA**, C **BLOQUEADA**: falta dictamen global sobre DER-R2, D05 y Señal, además de validación de reglas generales y acta final. No modificar `main`, Foundry ni mapa.
