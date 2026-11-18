# B5 — Tres correcciones operativas: Derribar, Hobgoblin y costes de interrupción
**17-11-2026 · PROPUESTA NO CANÓNICA v0.1.** Contrastado con `main:docs/Tierra_Magica_Manual_Maestro.md` blob `334770e7ed7d2605767aecb169f57da6c1100508`, apartados `Derribar`, `Empujar`, `Defensa de Maniobra`, `Flujo de resolución`, paquetes Dríade/Verdante/Goblinoide/Cristálido. Se consultaron `00_tablero.md`, `README.md`, `00_plan_auditorias_y_manual.md`, anexos B5 D01–D10 y CAN-01–CAN-07. **0 ejecuciones Foundry/mesa.**

## 1. B5-D02-R1 — Enraizar frente a Derribar: traducción mecánica explícita
**Problema comprobado:** Enraizar declara +1 categoría de Escala efectiva para resistir Derribar, pero el procedimiento canónico de Derribar únicamente enfrenta una prueba a **Defensa de Maniobra**; no consulta Escala. En cambio Empujar sí usa Escala para reducir distancia. El canon no define un número de Defensa derivado de una categoría de Escala.

**Solución seleccionada [PROPUESTA]:** al resolver **únicamente un intento de Derribar** contra Dríade o Verdante actualmente Enraizado sobre suelo apropiado, el defensor obtiene **+1 circunstancial a Defensa de Maniobra para esa prueba**. Es una **traducción propuesta del beneficio ya pagado por la Acción de Enraizar**, no un +1 de Escala general. No se concede si el suelo se perdió **antes** de comprobar requisitos, si no está Enraizado o si el efecto no es Derribar. No afecta Defensa normal, Defensa Corporal, Agarrar, daño, ataques ni resistencia a Empujar; para Empujar se mantiene **exclusivamente** la reducción por Escala del canon, sin este +1. No se suma con otra instancia del mismo Enraizar, ni se duplica por varios efectos que concedan la misma categoría efectiva. No cambia el estado Derribado tras éxito ni permite levantarse sin gastar Movimiento.

**Coste/alcance/duración:** Acción para Enraizar según canon; inmovilidad voluntaria mientras anclado; liberación voluntaria cuesta 1 MOV. Bonificación +1 a Defensa de Maniobra **sólo durante la resolución de Derribar y mientras persista apoyo**, no tiene usos adicionales ni coste PR. Es una propuesta de corrección de un vacío de procedimiento, **no regla vigente**.

| Caso | Defensa Maniobra inicial | Condición | Umbral propuesto | Resultado de control |
|---|---:|---|---:|---|
| DER-01 | 13 | Dríade enraizada, suelo intacto | 14 | Tirada total 13 falla, 14 acierta |
| DER-02 | 13 | Verdante enraizado, suelo destruido antes de declarar | 13 | Tirada 13 acierta; no beneficio |
| DER-03 | 13 | Verdante enraizado, Empujar | 13 | No +1 a Defensa; usar reducción por Escala si éxito |
| DER-04 | 13 | Dríade enraizada, dos fuentes de anclaje nominal idénticas | 14 | No +2 |
| DER-05 | 13 | Dríade enraizada, Derribar acierta 14 | 14 | Derribado normal; no inmunidad |
| DER-06 | 13 | Dríade a 0 Vida, raíces físicamente intactas | **Pendiente de persistencia pasiva** | No otorgar defensa voluntaria ni acciones; resolver por D10 y texto de efecto |

**Alternativas descartadas:** +1 Escala = +1 Defensa universal; inmunidad a Derribar; ventaja automática a todo Agarrar/Empujar; bonificación sin suelo. **Riesgo:** el +1 numérico no está autorizado por `main`, por lo que DER-01–05 son **resultados de la propuesta**, no certificación canónica.

## 2. B5-D06-R1 — Hobgoblin: alternativa real y costeada, no bonificación cultural
**Problema:** Hobgoblin tiene Ojo pero carece de beneficio exclusivo. Una supuesta `Disciplina Preparada` que consume Acción sin efecto cuantificable no es jugable.

**Alternativa mecánica opcional [PROPUESTA]: `Señal de Coordinación`.** En creación, **sustituye completamente Ojo para la Oportunidad** del Hobgoblin; no se suma al paquete ni a Ojo. Una vez por Escena, emplea **una Acción** para señalar a un aliado consciente, a **6 espacios o menos**, que pueda percibir la señal. El aliado recibe **+1 circunstancial a una única prueba propia declarada antes de su próximo turno completo**, siempre que la prueba use una oportunidad concreta y verificable comunicada en la señal. El bono expira al terminar ese turno, aunque no se use; no puede almacenarse, transferirse ni aplicarse retroactivamente. El aliado debe poder actuar y aprovechar el dato. El mismo personaje no puede recibir más de una Señal activa, y no se apila con Ojo ni con otra Señal en la misma prueba (se usa sólo un +1). No concede Acción, Ventaja, competencia, habilidad de Liderazgo, acceso a equipo ni conocimiento inexistente. La capacidad se adquiere **por reemplazo de Ojo**, no por cultura, profesión, jerarquía ni compra de un bono gratuito.

**Coste:** pérdida completa del +1 personal de Ojo una vez por Escena **más** una Acción y requisito de aliado/alcance/visibilidad o audición; **beneficio:** desplazar ese +1 a prueba del aliado. **Balance esperado (hipótesis):** flexibilidad grupal frente a oportunidad personal, con coste de economía de Acciones. No afirmar paridad hasta comparación de frecuencia y resultados de encuentros.

| Caso | Entrada | Resultado propuesto |
|---|---|---|
| HOB-01 | Hobgoblin reemplazó Ojo; aliado a 5 espacios escucha y actúa antes del límite | +1 a una prueba elegible del aliado |
| HOB-02 | Aliado a 7 espacios | Señal no elegible; no declarar Acción ni gastar uso |
| HOB-03 | Aliado a 5 espacios no puede percibir la señal | No elegible |
| HOB-04 | Hobgoblin con Señal solicita +1 de Ojo para sí | Rechazar: Ojo fue reemplazado |
| HOB-05 | Dos Señales sobre mismo aliado y prueba | Máximo +1; no +2 |
| HOB-06 | Señal al final de turno; aliado no actúa antes de terminar su próximo turno | Expira, sin reserva |
| HOB-07 | Información comunicada es falsa o no constituye oportunidad aprovechable | No bono; registrar que la condición no se cumplió |
| HOB-08 | Hobgoblin Incapacitado intenta emitir Señal | No Acción disponible |

**Nota de diseño:** no introducir la alternativa en `main` ni en la doble página base sin aprobación global. Su precio no es 1 PR adicional porque reemplaza un beneficio existente; si se decidiera conservar Ojo **y** Señal, requeriría valoración PR independiente y nueva auditoría. No se atribuye a toda una cultura la misma formación.

## 3. B5-D08-R1 — Conductor Vivo: ventanas de coste, interrupción y consentimiento
**Canon aplicable:** declarar intención → pagar costes obligatorios → comprobar requisitos → resolver Reacciones válidas → prueba → efectos → consecuencias. **Los costes pagados no se reembolsan por fallo salvo regla expresa.** Conductor Vivo no genera recursos; requiere diseño compatible y cooperación voluntaria.

**Protocolo editorial único:**
1. **Antes de declaración:** sin activación ni gasto. Comprobar consentimiento actual y diseño compatible para decidir si se intenta activar.
2. **Declaración y pago:** registrar reserva, Caudal, Acción, coste y compromiso. Si el coste no puede pagarse, la activación no es legal. No inventar reembolso.
3. **Comprobación y Reacciones:** si se interrumpe **después del pago**, conservar el gasto salvo regla del diseño que explícitamente lo devuelva. No exigir que el Cristálido coopere con nuevas activaciones tras retirar consentimiento.
4. **Resolución:** el efecto ya resuelto no se deshace retroactivamente. Si era sostenido, cada nuevo intervalo requiere requisitos, coste y consentimiento vigentes según diseño; no continuar por ascendencia.
5. **0 Vida:** el Cristálido Incapacitado no aporta nuevas Acciones. El dispositivo autónomo sólo continúa si su ficha lo autoriza, con sus recursos propios. No presumir corte seguro ni devolución de costes.

**Banco ficticio, no regla oficial:** LAB-PULSO, Energía inicial 3, coste 1, Caudal1; LAB-SOSTENIDO, Energía3, coste inicial1 y mantenimiento1 por turno, Caudal1 por intervalo. Estos números **no** son valores canónicos de Ingeniería.

| Caso | Secuencia | Reserva final | Efecto |
|---|---|---:|---|
| CON-01 | LAB-PULSO, consentimiento retirado antes de declarar | 3 | No activación |
| CON-02 | LAB-PULSO, paga 1; Reacción interrumpe antes de prueba | 2 | Sin reembolso; efecto según Reacción/diseño |
| CON-03 | LAB-PULSO, paga 1; falla prueba | 2 | Sin reembolso por fallo |
| CON-04 | LAB-PULSO, paga 1; pulso resuelto; retira consentimiento | 2 | Pulso no se revierte |
| CON-05 | LAB-SOSTENIDO, paga inicio1, mantenimiento1, luego retira consentimiento | 1 | No nuevo mantenimiento voluntario |
| CON-06 | LAB-SOSTENIDO, reserva1, operador a 0 Vida antes de próximo intervalo | 1 | No aporta nueva Acción; autonomía no supuesta |
| CON-07 | Dispositivo sin interfaz para Cristálido | 3 | No activación mediante Conductor Vivo |
| CON-08 | Coacción sin consentimiento voluntario | 3 si no se declara | No se habilita puente por ascendencia |

## 4. Resultado y puerta B5
**Tres reglas editoriales propuestas, 22 guiones de aceptación definidos y revisados por lectura** (DER 6 + HOB 8 + CON 8); **0 ensayos Foundry, 0 partidas, 0 mediciones empíricas de balance**. DER-06 y persistencia a 0 Vida requieren contraste adicional; HOB necesita calibración; LAB no equivale a equipo oficial. No sumar 22 a «tests ejecutados».

**Siguiente trabajo:** revisión documental comparativa de DER/HOB/CON frente a paquetes de Enanos, Feéricos, Verdantes, Goblinoides, Orcos y Cristálidos; corregir la acta de puerta editorial y comprobar regresiones globales. **B5 abierta; fase C bloqueada.**
