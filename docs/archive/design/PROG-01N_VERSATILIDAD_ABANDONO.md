# PROG-01N — Versatilidad y coste de abandono

**Estado:** banco experimental no canónico. Validado en GitHub Actions 38506123132. Archivo de prueba: `test/prog-01n-versatility-expedition.test.mjs`.

Se añadieron cinco retos encadenados: pasarela (movilidad), puerta energizada (competencias físicas y mágicas), emboscada ambiental (supervivencia bajo presión), registro de archivo (investigación) y mediación (interacción social). Algunas rutas requieren **dos chequeos exitosos**, representando combinaciones de capacidades. Es una hipótesis de escenario, no una nueva mecánica del Manual Maestro.

La prueba ejecuta 200 expediciones: cuatro niveles, diez semillas y cinco composiciones (equipo completo más cuatro exclusiones). Los desafíos mantienen sus semillas por etapa e intento. Se atribuyen acciones por personaje, suministros y oportunidades perdidas.

**Coste explícito de abandonar:** dos unidades ficticias de tiempo, una oportunidad perdida y hasta un suministro disponible. Los fracasos en chequeos generan complicaciones y una unidad adicional de tiempo. Así una retirada de personaje no puede parecer ventajosa sólo porque ya no exista alguien que intente superar la etapa. Las cifras se registran por nivel en `PROG01N_VERSATILITY`.

**Limitación:** la puerta energizada admite una ruta exclusivamente marcial y otra exclusivamente mágica como alternativas de diseño; el ensayo no acredita que una mezcla física-mágica sea obligatoria por reglas canónicas. Las competencias y recompensas son hipotéticas. Haber incorporado rutas del híbrido tampoco prueba que tenga ventaja marginal: se necesita comprobar la matriz numérica, variaciones en el coste por intento y otras composiciones.

No se han cambiado reglas, costes de PD ni Manual Maestro. Próximo control: extraer la matriz por nivel y comprobar si el híbrido sigue mostrando marginal nulo; después aumentar la variedad de escenarios sin fabricar ventajas por diseño.
