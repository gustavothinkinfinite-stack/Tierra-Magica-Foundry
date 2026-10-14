# PROG-01E — Requisitos estructurados y secuencia de adquisición

Fecha: 2026-10-13. Estado: diagnóstico técnico no canónico.

## Confirmado

- El commit `ae23ca7` añadió al Item **Contraataque** un requisito tipado `item:technique/parada`, conservando su descripción. La prueba de preflight comprueba rechazo sin Parada y aceptación tras poseerla.
- GitHub Actions para ese commit terminó con éxito (ejecución 38490929355).
- `preflightAcquisition` evalúa `system.requirements` como árbol estructurado, distingue costes y detecta duplicados; el campo `requirementsText` no sustituye esa evaluación.
- La migración `migratedRequirements` conserva requisitos estructurados existentes y convierte `skillRequirements` tipados. No analiza automáticamente frases en `requirements` de legado.

## Vacíos detectados en el catálogo de técnicas

| Item | Requisito canónico descrito | Registro observado en fuente | Criterio pendiente |
|---|---|---|---|
| Recibir Carga | Arma de Alcance apropiada | Texto «Arma de Alcance» | Validar posesión/equipo al activar, no inventar condición permanente de compra |
| Sentidos Compartidos | Familiar Mágico, Vínculo II | Texto «Familiar Mágico; Vínculo II» | Validar Rasgo y grado real del vínculo |
| Comunicación Mejorada | Familiar Mágico, Vínculo II | Texto equivalente | Ídem |
| Origen Remoto | Familiar Mágico, Vínculo III | Texto equivalente | Validar grado, compatibilidad del hechizo y actor del familiar |
| Coordinación Reactiva | Familiar Mágico, Vínculo III | Texto equivalente | Validar grado y activación reactiva |
| Contramagia | Compatibilidad mágica y reacción | Entrada sin requisito tipado universal | Identificar condiciones que deben cumplirse al adquirir frente a las de activación |

## Distinción necesaria

**Adquisición** y **activación** no son el mismo evento. Tener un arma de Alcance puede ser requisito de uso de Recibir Carga sin que el personaje deba poseerla al aprender la técnica. No bloquear compras legítimas por confundir estas dos fases.

Tampoco debe representarse «Vínculo II/III» como un mero nivel del personaje; el Manual define el grado del vínculo de forma independiente.

## Siguiente implementación segura

1. Localizar la fuente autoritativa del grado de Vínculo en el Actor/Familiar y distinguir requisitos de adquisición y uso.
2. Diseñar pruebas negativas y positivas para cada grado y técnica de familiar con estado real.
3. Incorporar guardas tipadas sólo cuando puedan evaluar el grado correcto sin rechazos falsos.
4. Mantener PROG-01 abierto hasta validar cuatro rutas completas de compras con sus Items y balances.
