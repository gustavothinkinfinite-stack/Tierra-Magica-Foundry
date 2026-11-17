# B5-I08 — Cristálidos: Conductor Vivo, consentimiento, circuitos y 0 Vida

**17-11-2026 · PROPUESTA NO CANÓNICA, NO APROBADA.** Fuentes contrastadas: tablero, README, plan, matriz global, B2–B4 Cristálidos y `main:docs/Tierra_Magica_Manual_Maestro.md` (blob `c2ecb4c82490c92429eed16cf3d2a8957ffb2e7d`). **20 regresiones DOC diseñadas, ninguna ejecutada en Foundry o mesa.** El paquete jugable es exclusivamente Cristálido de Matriz Mixta, Escala Mediana, MOV6, con Fatiga, descanso, Medicina y sustento normales.

## 1. Fronteras del canon

**Resonancia Arcana** requiere contacto directo con objeto, cristal, mineral, estructura o dispositivo y distingue estado cualitativo (contiene, recibe, conduce, descarga energía mágica o inerte); no revela cantidad, Fuente, hechizo, constructor, finalidad ni desactivación. **Conductor Vivo** permite actuar **voluntariamente** como puente sólo si dispositivo, ritual, proyecto o fenómeno compatible **está diseñado para admitirlo**. No genera Maná/Energía, Reserva/Caudal, Fuente, Método, materiales, competencias ni inmunidad a sobrecarga. Dispositivos requieren Energía suficiente, consumo ≤ Energía y ≤ Caudal, estado operativo, Acción/Reacción y requisitos específicos. La Sobrecarga de hechizo es un subsistema **distinto**, sólo si falta exactamente 1 Maná, conserva ≥1, no Colapsado y cumple requisitos; DF17 VOL+Canalización, gasta todo el Maná restante y causa Exhausto/Colapsado conforme a canon. No puede invocarse Conductor Vivo para omitir esos requisitos.

## 2. Resoluciones editoriales

### B5-I08-P01 — Contrato de compatibilidad del puente [PROPUESTA]

**Disparador:** proyecto/dispositivo/ritual compatible pretende usar un Cristálido. **Coste:** el de la operación original (energía, Maná, Acción/Reacción, materiales y pruebas aplicables), **sin** generar recursos ni Acción racial adicional gratuita; la conexión por sí sola no sustituye la activación. **Alcance:** un circuito/proyecto explícito, no una red universal; **duración:** operación/intervalo autorizado.

**Secuencia propuesta:** (1) identificar especificación que admite puente vivo, (2) comprobar circuito y contacto/conexión física efectiva según diseño, (3) identificar emisor, receptor y fuente de energía real, (4) obtener consentimiento actual, (5) pagar costes y verificar límites de Caudal/Energía, (6) resolver Acción/Reacción y prueba normal, (7) aplicar consecuencias y desconexión. Si falta diseño compatible, no funciona aunque el Cristálido toque un cristal energético. **Pendiente:** especificaciones de interfaz no detalladas por equipo en canon; no inventar conectores universales.

### B5-I08-P02 — Consentimiento y pérdida de capacidad [PROPUESTA]

**Disparador:** conexión inicial o intento de continuar tras retirada de voluntad, incapacidad, restricción o cambio de posición. **Coste:** ninguno adicional por ejercer consentimiento; tampoco concede Reacción gratuita de protección. **Alcance:** participación del Cristálido, no control de otros operadores. **Duración:** sólo mientras la voluntad y la aptitud para participar persistan.

**Propuesta:** consentimiento afirmativo y revocable; no se presume por linaje, captura, estar dormido, poseído o Incapacitado. La pérdida de capacidad/voluntad impide **nuevas activaciones** que requieran puente voluntario. Una operación ya resuelta no se deshace retroactivamente; un proceso sostenido requiere adjudicar el punto de corte según su especificación y economía de Sostenimiento. **0 Vida** = Incapacitado, no muerte automática: no activar de nuevo ni asumir «batería pasiva» mientras está Incapacitado. **Reserva:** instante exacto de corte de una descarga en curso y cómo resolver coacción/posesión no están expresamente fijados por el paquete.

### B5-I08-P03 — Sobrecarga y daños no anulados [PROPUESTA]

**Disparador:** energía insuficiente, Caudal excedido, descarga peligrosa o hechizo bajo Sobrecarga. **Coste:** sólo recursos/riesgos del subsistema correspondiente; **alcance:** operación; **duración:** resolución.

**Propuesta:** separar `sobrecarga_hechizo` (procedimiento DF17 y Fatiga) de `sobrecarga_dispositivo` (reglas técnicas propias). Conductor Vivo **no** incrementa Caudal, no permite pagar consumo 5 con Energía 4, no evita avería, exposición o consecuencias del circuito. Si el proyecto prevé riesgo de puente, aplicar la consecuencia prevista, sin crear inmunidad cristalina. No permitir que Resonancia Arcana determine cantidades para eludir inspección/Ingeniería. **Reserva:** efecto de una desconexión en una activación que ya pagó Energía pero no resolvió; requiere orden operativo explícito por dispositivo.

### B5-I08-P04 — Separación de sentidos, crafting y fisiología [PROPUESTA]

**Disparador:** intentar aprovechar Resonancia/Conductor en fabricación, ritual, Familiar, Medicina o descanso. **Coste:** los de la actividad real, sin PR/PD ni materiales gratuitos. **Alcance:** operación concreta. **Duración:** según subsistema.

**Propuesta:** Resonancia informa estado general **sólo al tocar**, no localiza componentes a distancia ni revela fórmula. Conductor no reemplaza Arcana, Ingeniería, Canalización, Fuente, Método, Energía, componentes, tiempos ni pruebas de CRAFT; no autoriza fabricar Cristales de Resonancia o Piedras de Impronta desde el propio cuerpo, según exclusiones CRAFT-05/07. Matriz Mixta mantiene Fatiga, 0 Vida/Trauma, sustento y Medicina normales. Un Familiar no hereda automáticamente Conductor ni actúa como repetidor de Resonancia; Origen Remoto tampoco transmite el sentido.

## 3. Casos de regresión B5-I08-T01–T20 — DOC no ejecutados

| ID | Preparación | Resultado esperado |
|---|---|---|
| T01 | Cristálido toca cristal activo | Resonancia: estado cualitativo, no cantidad |
| T02 | Cristálido mira acumulador a distancia | Sin Resonancia por visión |
| T03 | Toca objeto inerte | Lectura inerte, sin historia |
| T04 | Toca cable unido a aparato remoto | No se presume contacto directo con aparato |
| T05 | Dispositivo diseñado para puente, consentimiento presente | Conductor posible si resto requisitos se cumple |
| T06 | Dispositivo no admite puente vivo | Conductor no habilita |
| T07 | Circuito sin fuente de Energía | No crea Energía |
| T08 | Consumo > Energía | Activación inválida |
| T09 | Consumo > Caudal | Activación inválida |
| T10 | Operación exige Acción y se intenta gratuita | No |
| T11 | Cristálido retira consentimiento antes de activar | No nueva activación |
| T12 | Cristálido es forzado sin consentimiento | No puente voluntario automático |
| T13 | Cristálido cae a 0 Vida antes de activar | Incapacitado; no nueva activación |
| T14 | Descarga ya resuelta y luego cae a 0 Vida | No retroactividad |
| T15 | Descarga sostenida y pierde capacidad | Corte/orden específico pendiente, no suministro infinito |
| T16 | Hechicero sin Maná suficiente pretende usar puente | No crea Maná ni elude Sobrecarga |
| T17 | Sobrecarga de hechizo válida (falta exactamente 1) | DF17 y consecuencias canónicas sin inmunidad |
| T18 | Sobrecarga de dispositivo y Conductor | Aplicar riesgos técnicos; no inmunidad |
| T19 | Fabricar Cristal de Resonancia del propio cuerpo | No, exclusión CRAFT-05/07 |
| T20 | Matriz Mixta descansa/recibe Medicina tras Fatiga | Reglas fisiológicas generales |

**Protocolo futuro:** documentar diseño compatible, estado físico, consentimiento, posición, recursos antes/después, Caudal, ventana de Acción/Reacción, prueba, sobrecarga, interrupción y 0 Vida. Ejecutar T05–T18 en dos dispositivos y un ritual de especificaciones conocidas; los escenarios no equivalen a resultados empíricos.

## 4. Dictamen y cruces

**B5-I08: propuesta documental elaborada, no cierre validado.** Pendientes: interfaces compatibles reales, momento de corte por retirada de consentimiento, secuencia entre gasto de Energía e interrupción, coacción/posesión y riesgo del conductor. Cruces X01-09, X08-09, X09-11, X09-12 y X09-10; B5-G06/G10/G12. **Siguiente B5-I09:** Verdantes, bioma, Sustento Vegetal, Medicina, 0 Vida y desplazamiento por anclaje.
