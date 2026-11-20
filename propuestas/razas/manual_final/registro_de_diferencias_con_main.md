# Tierra Mágica — Registro de diferencias con el Manual Maestro
**18-11-2026 · Fase C · Manuscrito de revisión, NO CANÓNICO · sólo rama de propuestas**

## Autoridad y control de versión
Se releyeron `00_tablero.md`, `README.md`, `00_plan_auditorias_y_manual.md`, la [tabla comparativa](./tabla_de_razas.md), la [hoja B5 de decisiones](../auditorias/05_b5_hoja_unica_decisiones_normativas.md), la [conciliación residual](../auditorias/05_b5_conciliacion_4_residuales_y_28_regresiones.md) y el Manual Maestro de `main`. **Blob actual de `main`: `0c8ddfb0b218bed38cd10962a1ac35bab8821466`**, distinto del `f0f46e85b0d2e9d2449426748d9090c050e0a21e` citado en la tabla previa. **La divergencia exige una comprobación diferencial completa de la versión reciente antes de afirmar compatibilidad final**. El material de B5 procede de blobs históricos distintos: no trasladar conclusiones como si fueran auditoría de la versión actual.

## Convención de decisión
- **C**: regla base de `main`, conservar y comprobar literalidad contra el blob actual.
- **E**: ampliación editorial narrativa sin efecto mecánico, incorporable en el libro si no fija geografía, teología o historia contradictoria.
- **N**: norma nueva propuesta; sólo entra en el manuscrito como cambio explícito, con coste/condiciones y regresiones.
- **P**: interpretación pendiente; no presentarla como norma ya vigente.
- **H**: alternativa histórica descartada para la propuesta actual, no co-vigente.

## Matriz de cambios de la edición propuesta

| ID | Área | Línea base / problema | Texto candidato y límites | Estado | Evidencia documental |
|---|---|---|---|---|---|
| MOV1 | Hada, Coralio y locomoción mixta | Velocidades por medio sin presupuesto mixto explícito | En un tramo, sumar coste de espacios / MOV efectivo de cada medio ≤1; Retirada ≤1/2 y límites enteros por tramo; Correr conserva Acción | **C vigente (B5-I01)** | B5 U01–U03 |
| MOV2 | Goblin, ocupación, Reacciones | Interrupción dentro de tránsito por casilla ocupada | Registrar último espacio legal y coste consumido; no devolver MOV ni teletransportar; ninguna reacción universal | **C vigente (B5-I01)** | B5 U04 |
| DER-R2 | Enanos, Dríades, Verdantes | Escala efectiva para resistir Derribar no se convierte por sí sola en Defensa de Maniobra | +1 circunstancial a Defensa de Maniobra sólo contra Derribar si facultad expresa eleva Escala efectiva al resistirlo; no apila ni afecta Empujar/Agarrar | **C vigente (B5-I02)** | B5 U05–U09; R0 histórico **H** |
| ANC1 | Enraizar | Ambigüedad de inmovilidad y pérdida de soporte | Dríade/Verdante no se desplazan voluntariamente enraizados; Acción inicial, suelo apto y 1 MOV para soltar; perder soporte extingue el anclaje | **C vigente (B5-I02)** | B5 I02 |
| MIC1–2 | Enlace Micelial | Distancia de 12 espacios y red viva continua | Distancia geométrica emisor–receptor ≤12, red física continua, Acción para cada reconexión; sin relé automático, telepatía ni sensor compartido | **C vigente (B5-I04)** | B5 U10–U13 |
| ANF1 | Terio con branquias | «Funcionales» no cuantifica respiración acuática | Branquias anatómicas realmente funcionales permiten respirar agua ordinaria compatible, sin otorgar Anfibio completo, nado ni inmunidad; no las adquiere cualquier Terio | **C vigente (B5-I05)** | B5 I05; cotejo B4 pendiente |
| ANF2 | Coralio y Anfibio 1 PR | Respiración racial condicionada a hidratación | Compra de Anfibio por 1 PR como fuente respiratoria independiente en deshidratación; no cura privación ni acumula efecto en hidratación normal | **C vigente (B5-I05)** | B5 I05, equivalencias I11 |
| SENS1 | Élficos, Ankar, Cristálidos, Micelios, Coralios | Detección situacional susceptible de sobregeneralización | Contrato estímulo/medio/acceso/alcance/dato máximo; sin radar, identificación o radio nuevos; barreras según fenómeno, sin universalizar | **C vigente (B5-I03)** | B5 residual I03 |
| VOL1 | Orcos | Voluntad del Colmillo dice «esa fuente» | Declarar antes de prueba, retirar una fuente elegible de Desventaja, no todas; luego resolver Ventaja/Desventaja y Ayuda; sin reembolso del uso | **C vigente (B5-I07)** | B5 residual I07; variante «todas» **H** |
| OJO1 | Goblinoides | Ojo +1 situacional, no Ventaja | +1 a prueba propia con oportunidad concreta; no transferir por Ayuda, ni bono universal a Iniciativa; Hobgoblin conserva Ojo sin segundo poder | **C vigente (B5-I06/I07)** | B5 I07 / I06 |
| SUS1 | Verdantes, Micelios, Coralios | Sustento y exposición carecen de reloj universal | Separar nutrición, hidratación, respiración y descanso; aplicar Fatiga/Exposición generales por situación, sin inventar intervalos de daño | **C vigente (B5-I09)** | B5 residual I09 |
| EQ1 | Todas las familias | Rasgo racial y comprado pueden describir mismo efecto | Comparar disparador, medio, objetivo, coste, alcance, resultado y límite; propiedad exactamente igual no apila ni se cobra doble; funciones distintas sí se costean | **C vigente (B5-I11)** | B5 residual I11 |
| COND1 | Cristálidos | Conductor Vivo sin catálogo de dispositivos | Sólo interfaz voluntaria con dispositivo diseñado compatible y recursos propios; sin batería, maná o autonomía gratuitos; no fijar energía sin diseño | **C vigente (B5-I08)** | B5 I08 |
| VIDA1 | Todas | Riesgo de acciones raciales a 0 Vida | Incapacitado impide activaciones voluntarias nuevas; pasivos sólo mientras persistan requisitos físicos y reglas generales | **C vigente (B5-I10)** | B5 I10 |
| HUM1 | Humanos | Clasificación Menor/Significativo de Don sin Forma incompleta | Tabla limitada de opciones elegibles; 1 Significativo o 2 Menores compatibles, sin PR extra; validar exclusiones y no crear nuevos Rasgos | **P editorial (canon contiene propuesta pendiente)** | Nota C01 HUM-B2-DEC-01 |
| CULT1 | Doce familias | Lore cultural nuevo no está en Manual Maestro | Incorporar instituciones, costumbres y conflictos como ejemplos plurales sin bonos, ciudades nuevas ni universalidad cultural | **E** | Doce dobles páginas y notas C01–C12 |

## Conciliación de estado efectivo — verificación del 18-11-2026

**Fuente leída:** `main:docs/Tierra_Magica_Manual_Maestro.md`, blob `0c8ddfb0b218bed38cd10962a1ac35bab8821466`. El apartado «Cierre normativo de Ascendencias — integración editorial aprobada (18-11-2026)» declara explícitamente vigentes las aclaraciones B5. Se cotejó el texto completo de los apartados B5-I01, I02, I03, I04, I05, I06, I07, I08, I09, I10 e I11. **Catorce filas** del registro (MOV1, MOV2, DER-R2, ANC1, MIC1–2, ANF1, ANF2, SENS1, VOL1, OJO1, SUS1, EQ1, COND1, VIDA1) ya están normadas por `main`; **no son novedades a aprobar**. HUM1 sigue siendo una clasificación editorial pendiente explícita en el texto humano de `main`. CULT1 es ampliación cultural narrativa, sin mecánicas.

### Criterios corregidos para el libro
1. **Reproducir fielmente**, sin alterar costes ni límites, el cierre B5 vigente. El movimiento mixto usa fracciones exactas y Retirada ≤1/2; Escala efectiva concede +1 circunstancial sólo contra Derribar, no defensa general; Enraizar requiere Acción y libera con 1 Movimiento.
2. **Enlace Micelial** conserva Acción de conexión/reconexión, red viva continua, contacto y límite geométrico de 12 espacios. No añadir relés ni canales mágicos.
3. **Anfibio** cuesta 1 PR, puede ser una fuente independiente para Coralios deshidratados, pero no cura deshidratación. No cobrar dos veces una función exactamente igual.
4. **Voluntad del Colmillo** elimina una sola fuente elegible de Desventaja y consume uso aun si otra persiste. **Ojo** no transfiere Ayuda ni da Iniciativa automática. **Conductor Vivo** requiere especificación compatible y consentimiento.
5. **HUM1 (criterio actualizado C-RES/3):** conservar en el manuscrito el catálogo y los límites canónicos de Don sin Forma, **sin imprimir la clasificación Menor/Significativo no ratificada**. La clasificación candidata queda sólo en `01_humanos/manual_final_propuesto.md` y su expediente, pendiente de revisión global. Esta decisión sustituye la instrucción histórica de mantener la clasificación en el manuscrito.
6. **CULT1:** incorporar el lore plural como ejemplos, sin transformar instituciones en ciudades oficiales, poderes, habilidades, PR o PD gratuitos.
7. La tabla anterior se conserva para **trazabilidad histórica**, pero prevalece esta conciliación frente a frases antiguas que llamaban «norma nueva» a reglas ya aprobadas.

### Control de versión
El cierre normativo está en el `main` leído en esta ejecución. Si cambia el blob, reabrir este cotejo antes de cerrar la edición. Esta auditoría es documental; no prueba Foundry ni partidas.

## Regresiones mínimas para revisión posterior
- Tierra2/agua3 Coralio: 2/5+3/6=0,9 permitido por MOV1; tierra3/agua3=1,1 prohibido.
- Enano DM13 frente a Derribar: canon sin traducción numérica 13; candidato DER-R2 14. Empujar conserva DM13 y modifica sólo distancia por Escala.
- Micelio conectado por red continua a 13 espacios directos: no transmite, aunque filamento sea más corto; a 8 sí si requisitos restantes se cumplen.
- Dos Desventajas elegibles Orcas: VOL1 quita sólo una; una ajena impide activación.
- Terio nadador sin branquias ni Anfibio no respira bajo agua por velocidad.
- Cristálido sin dispositivo compatible no recibe recursos; a 0 Vida no activa Conductor Vivo voluntariamente.
- Cultura elegida no modifica PD, PR, habilidades, dinero, iniciativa ni combate.

**Evidencia:** escenarios documentales, **0 ejecución Foundry, 0 prueba de mesa**. No se ha hecho merge ni se ha modificado `main`, mapa o código operativo.

**Siguiente unidad:** cotejo de cambios del blob vigente de `main` contra B5 y luego ensamblaje de las doce páginas en manuscrito continuo, incorporando sólo candidatas normativas resueltas y marcando las restantes.


## Conciliación editorial posterior — C-RES/4 (20-11-2026)

La redacción anterior de HUM1 en este registro contradecía la corrección C-RES/3 aplicada al manuscrito de lectura: **no se debe imprimir una etiqueta de clasificación todavía no ratificada**, aunque se señale como propuesta. Se ha corregido el criterio de integración en el punto 5 anterior, conservando el registro histórico y la fuente individual. La omisión de ese párrafo en el manuscrito es una **diferencia editorial deliberada**, no una pérdida accidental de canon ni una modificación del Manual Maestro.

Control de alcance: se releyeron tablero, README, plan, C-B5/1, C-RES/3, fuente Humanos, fuente Micelios, manuscrito y autoridad `main` (`0c8ddfb0b218bed38cd10962a1ac35bab8821466`). La reserva técnica de Micelios también permanece sólo en su fuente y no se debe trasladar a imprenta. Las cifras vigentes para el manuscrito posterior a HUM1 son **9.637 tokens completos, 9.466 en los doce bloques, 12/12 dentro de 650–850** (C-NUM/3); las fuentes individuales conservan el cómputo independiente de **9.574**. Estas cifras son recuentos por espacios, no páginas físicas.

**Puerta pendiente:** cotejo semántico de cada cláusula restante frente a `main`, revisión global del creador y maquetación física. No hay aprobación normativa, prueba de mesa ni ejecución Foundry. No se autoriza merge.
