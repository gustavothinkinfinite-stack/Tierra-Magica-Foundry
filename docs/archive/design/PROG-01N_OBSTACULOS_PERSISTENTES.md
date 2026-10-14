# PROG-01N: obstáculos persistentes y recursos de grupo

Ensayo no canónico. Fuente: `test/prog-01n-persistent-missions.test.mjs`.

La misión incluye cuatro etapas, dos oportunidades por etapa, reserva compartida inicial de cuatro suministros, complicaciones y retrasos acumulados. El fracaso conserva la etapa pendiente y abre la intervención de otro personaje cuando existe alternativa. Los suministros sólo pueden evitar retrasos asociados a un segundo fallo; no proporcionan bonos de dados.

Se ejecutan 80 misiones pareadas, niveles 5, 10, 15 y 20, diez semillas, y políticas de elección adaptativa o fija. La prueba comprueba que las etapas no se duplican, que los recursos no son negativos, que toda complicación corresponde a un fallo y que el segundo intento no utiliza el mismo personaje. Ejecución aprobada: https://github.com/gustavothinkinfinite-stack/Tierra-Magica-Foundry/actions/runs/38505176379

Limitaciones: el escenario no recrea viajes, inventario real, consecuencias económicas canónicas, ayudas, mecanismos de Foundry o bifurcaciones narrativas completas. Las DF, las consecuencias y el suministro común son parámetros experimentales. Próximo paso: analizar métricas comparadas y conectar efectos persistentes entre escenas.
